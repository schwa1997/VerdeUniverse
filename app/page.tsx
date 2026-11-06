import { asset } from "./asset";
import { Atlas } from "./components/Atlas";
import { Gallery } from "./components/Gallery";
import { Reveal } from "./components/Reveal";
import { SnapVideo } from "./components/SnapVideo";
import {
  GITHUB_PROFILE,
  INSTAGRAM,
  VERDESNAP_RELEASE,
  VERDESNAP_REPO,
  journey,
  ribbon,
} from "./content";

const solid =
  "inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-on-pine transition-transform hover:-translate-y-0.5";
const outline =
  "inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:bg-sprout";

const features = [
  ["Alt + A", "Snip anything, the same shortcut as WeChat"],
  ["Mark", "Draw on it before you share it"],
  ["Read", "Pull the text out of any screenshot"],
  ["Translate", "With any AI you point it to"],
];

function Ribbon() {
  const words = [...ribbon, ...ribbon];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-sprout py-3">
      <div className="ribbon-track flex w-max">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="display px-5 text-lg text-pine">
            {word} <span className="pl-8 text-leaf">✧</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/badges/verde.svg")} alt="" className="h-8 w-8" />
          <span className="display text-lg text-pine">VerdeUniverse</span>
        </a>
        <nav className="flex items-center gap-4 text-sm font-medium text-ink-soft sm:gap-6">
          <a href="#toolkit" className="hover:text-pine">Tools</a>
          <a href="#art" className="hover:text-pine">Art</a>
          <a href="#self" className="hover:text-pine">Self</a>
        </nav>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-14 pt-4 md:px-8 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1fr_1.05fr] lg:pb-8"
      >
        <div>
          <p className="plate rise whitespace-nowrap" style={{ "--i": 0 } as React.CSSProperties}>
            你好 · hola · hi
          </p>
          <h1 className="display mt-4 text-[clamp(2.9rem,7.4vw,5.6rem)] font-semibold leading-[0.98] text-pine">
            <span className="rise block" style={{ "--i": 1 } as React.CSSProperties}>A small green</span>
            <span className="rise block" style={{ "--i": 2 } as React.CSSProperties}>universe,</span>
            <span className="rise block italic text-forest" style={{ "--i": 3 } as React.CSSProperties}>grown by me.</span>
          </h1>
          <p className="rise mt-6 max-w-md text-lg leading-relaxed text-ink-soft" style={{ "--i": 4 } as React.CSSProperties}>
            I&apos;m Verde. I make tools, AI art and ideas, and I plant them all here to see what grows.
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3" style={{ "--i": 5 } as React.CSSProperties}>
            <a href={VERDESNAP_REPO} target="_blank" rel="noreferrer" className={solid}>
              VerdeSnap on GitHub →
            </a>
            <a href="#art" className={outline}>See my art</a>
          </div>
        </div>
        <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          <Atlas />
        </div>
      </section>

      <Ribbon />

      <section id="toolkit" className="mx-auto grid max-w-6xl scroll-mt-6 items-center gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
        <Reveal>
          <p className="plate">Plate I · VerdeToolKit</p>
          <h2 className="display mt-3 text-4xl font-semibold leading-tight text-pine md:text-5xl">
            VerdeSnap
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
            My first tool. A Windows screenshot app that snips, marks up, reads the text and translates it.
          </p>
          <dl className="mt-6 max-w-md divide-y divide-line border-y border-line">
            {features.map(([name, text]) => (
              <div key={name} className="flex gap-4 py-2.5 text-sm">
                <dt className="w-20 shrink-0 font-semibold text-pine">{name}</dt>
                <dd className="text-ink-soft">{text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={VERDESNAP_REPO} target="_blank" rel="noreferrer" className={solid}>
              View on GitHub →
            </a>
            <a href={VERDESNAP_RELEASE} target="_blank" rel="noreferrer" className={outline}>
              Download v0.1.0
            </a>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            For Windows. To translate, connect any OpenAI-compatible AI.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <SnapVideo />
        </Reveal>
      </section>

      <section id="art" className="scroll-mt-6 border-t border-line bg-sprout/40">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="plate">Plate II · VerdeArt</p>
            <h2 className="display mt-3 max-w-2xl text-4xl font-semibold leading-tight text-pine md:text-5xl">
              Little stories, made with AI and a lot of feeling.
            </h2>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className={`${solid} mt-6`}>
              Follow @arty.verde on Instagram →
            </a>
          </Reveal>
          <Gallery />
        </div>
      </section>

      <section id="self" className="mx-auto grid max-w-6xl scroll-mt-6 gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <Reveal>
          <p className="plate">Plate III · VerdeSelf</p>
          <h2 className="display mt-3 text-4xl font-semibold leading-tight text-pine md:text-5xl">
            Still a seed.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
            A future home for my ideas, blogs and creative thoughts. It will grow when it&apos;s ready.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="plate">The journey so far</p>
          <ol className="ml-1 mt-4 space-y-5 border-l-2 border-lime">
            {journey.map((step) => (
              <li key={step.date} className="relative pl-5">
                <span aria-hidden="true" className="absolute -left-[6px] top-1.5 h-2.5 w-2.5 rounded-full bg-forest" />
                <p className="text-xs tabular-nums text-ink-soft">{step.date}</p>
                <p className="display text-xl leading-snug text-ink">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <Reveal>
            <p className="display max-w-3xl text-3xl leading-snug text-pine md:text-4xl">
              目的不是变得厉害，就是表达自己
            </p>
            <p className="mt-2 text-ink-soft">The point isn&apos;t to be impressive, it&apos;s to express myself.</p>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
            <span>Made by me, Verde ✧</span>
            <span className="flex gap-5">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="font-semibold text-forest hover:underline">
                Instagram
              </a>
              <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" className="font-semibold text-forest hover:underline">
                GitHub
              </a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
