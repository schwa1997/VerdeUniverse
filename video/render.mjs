// Renders video/verdesnap.html to public/snap/verdesnap.mp4, one exact frame at a time.
// Needs Chrome and ffmpeg. Usage: node video/render.mjs [frame-folder]
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const FPS = 30;
const SECONDS = 14;
const PORT = 9333;
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const frames = process.argv[2] ?? fs.mkdtempSync(path.join(os.tmpdir(), "verdesnap-"));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "verdesnap-chrome-"));
fs.mkdirSync(frames, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  "--window-size=1280,720",
  "about:blank",
]);

async function pageSocket() {
  for (let i = 0; i < 60; i++) {
    try {
      const pages = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = pages.find((p) => p.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Chrome did not start");
}

const ws = new WebSocket(await pageSocket());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 0;
const waiting = new Map();
ws.addEventListener("message", (e) => {
  const reply = JSON.parse(e.data);
  if (!reply.id) return;
  const { resolve, reject } = waiting.get(reply.id);
  waiting.delete(reply.id);
  reply.error ? reject(new Error(reply.error.message)) : resolve(reply.result);
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    waiting.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const run = (expression) => send("Runtime.evaluate", { expression, awaitPromise: true });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: pathToFileURL(path.join(here, "verdesnap.html")).href });
for (let i = 0; i < 80; i++) {
  const r = await run("typeof window.ready");
  if (r.result.value === "object") break;
  await new Promise((r) => setTimeout(r, 200));
}
await run("window.ready");

const total = FPS * SECONDS;
for (let i = 0; i < total; i++) {
  await run(`renderFrame(${i / FPS})`);
  const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 96 });
  fs.writeFileSync(path.join(frames, `f${String(i).padStart(4, "0")}.jpg`), Buffer.from(data, "base64"));
}
ws.close();
chrome.kill();

const out = path.join(here, "..", "public", "snap");
fs.mkdirSync(out, { recursive: true });
const ffmpeg = spawnSync("ffmpeg", [
  "-y", "-framerate", String(FPS), "-i", path.join(frames, "f%04d.jpg"),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "22", "-preset", "slow", "-movflags", "+faststart",
  path.join(out, "verdesnap.mp4"),
], { stdio: "inherit" });
if (ffmpeg.status !== 0) process.exit(ffmpeg.status ?? 1);
fs.copyFileSync(path.join(frames, "f0300.jpg"), path.join(out, "verdesnap-poster.jpg"));
console.log("frames:", frames);
