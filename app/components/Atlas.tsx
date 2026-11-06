"use client";

import { useEffect, useRef } from "react";
import { asset } from "../asset";

// The hero: my universe drawn like an old star chart. The V is the sun, each project is a planet
// on its own orbit, and the whole chart leans gently towards the mouse.

const C = 320;
const planets = [
  { label: "VerdeToolKit", href: "#toolkit", badge: "/badges/verde-toolkit.svg", r: 122, start: 24, spin: "54s", size: 62 },
  { label: "VerdeArt", href: "#art", badge: "/badges/verde-art.svg", r: 194, start: 205, spin: "84s", size: 70 },
  { label: "VerdeSelf", href: "#self", badge: "/badges/verde-self.svg", r: 268, start: 318, spin: "130s", size: 54 },
];

const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [(C + r * Math.cos(a)).toFixed(2), (C + r * Math.sin(a)).toFixed(2)];
};

const ticks = Array.from({ length: 72 }, (_, i) => {
  const deg = i * 5;
  const [x1, y1] = at(304, deg);
  const [x2, y2] = at(i % 6 === 0 ? 316 : 310, deg);
  return { x1, y1, x2, y2 };
});

// Fixed places, so the server and the browser draw the same sky
const stars = [
  [150, 96, 5], [502, 118, 7], [86, 300, 4], [566, 372, 5], [214, 540, 6],
  [452, 548, 4], [258, 176, 4], [420, 214, 3], [176, 402, 3], [470, 430, 4],
];

const Star = ({ x, y, s, i }: { x: number; y: number; s: number; i: number }) => (
  <path
    className="twinkle"
    style={{ animationDelay: `${(i % 5) * 0.8}s` }}
    fill="var(--leaf)"
    d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`}
  />
);

export function Atlas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lean = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--px", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
      el.style.setProperty("--py", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
    };
    window.addEventListener("pointermove", lean);
    return () => window.removeEventListener("pointermove", lean);
  }, []);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[640px]">
      <svg viewBox="0 0 640 640" className="h-full w-full overflow-visible" role="img" aria-label="A star chart of my projects">
        <g className="atlas-far" fill="none" stroke="var(--line)">
          <circle cx={C} cy={C} r="304" />
          <circle cx={C} cy={C} r="316" />
          {ticks.map((t, i) => (
            <line key={i} {...t} />
          ))}
          <path d={`M${C} 4 V636 M4 ${C} H636`} strokeDasharray="1 7" />
          {planets.map((p) => (
            <circle key={p.label} cx={C} cy={C} r={p.r} strokeDasharray="3 6" />
          ))}
        </g>

        <g className="atlas-far">
          {stars.map(([x, y, s], i) => (
            <Star key={i} x={x} y={y} s={s} i={i} />
          ))}
        </g>

        <g className="atlas-near">
          <circle cx={C} cy={C} r="62" fill="var(--sprout)" />
          <image href={asset("/badges/verde.svg")} x={C - 46} y={C - 46} width="92" height="92" />

          {planets.map((p) => (
            <g key={p.label} className="orbit" style={{ animationDuration: p.spin }}>
              <g transform={`rotate(${p.start} ${C} ${C})`}>
                <a href={p.href} className="planet">
                  <g transform={`translate(${C + p.r} ${C})`}>
                    <g transform={`rotate(${-p.start})`}>
                      <g className="counter" style={{ animationDuration: p.spin }}>
                        <circle r={p.size / 2 + 5} fill="var(--paper)" stroke="var(--line)" />
                        <image href={asset(p.badge)} x={-p.size / 2} y={-p.size / 2} width={p.size} height={p.size} />
                        <text
                          y={p.size / 2 + 22}
                          textAnchor="middle"
                          fill="var(--ink)"
                          fontSize="15"
                          fontWeight="600"
                          stroke="var(--paper)"
                          strokeWidth="5"
                          paintOrder="stroke"
                        >
                          {p.label}
                        </text>
                      </g>
                    </g>
                  </g>
                </a>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
