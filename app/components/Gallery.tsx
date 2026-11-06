"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "../asset";
import { works, type Work } from "../content";
import { Reveal } from "./Reveal";

/** My work, framed like plates in a book. A video opens big and plays. */
export function Gallery() {
  const [open, setOpen] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        {works.map((work, i) => (
          <Reveal
            key={work.title}
            delay={(i % 3) * 90}
            className={work.wide ? "col-span-2 md:col-span-3" : ""}
          >
            <button
              type="button"
              onClick={() => setOpen(work)}
              className="group block h-full w-full rounded-2xl border border-line bg-sheet p-2.5 text-left transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-[-0.6deg]"
            >
              <span
                className={`block overflow-hidden rounded-xl bg-sprout ${work.wide ? "aspect-[21/9]" : "aspect-[3/4]"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(work.poster)}
                  alt={work.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="mt-2.5 flex items-baseline justify-between gap-2 px-1">
                <span className="display min-w-0 text-base leading-tight text-ink md:text-lg">
                  {work.title}
                </span>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest">
                  {work.kind}
                </span>
              </span>
              <span className="mt-1 block px-1 pb-1 text-[13px] leading-snug text-ink-soft">
                {work.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto max-h-[92vh] w-[min(92vw,960px)] rounded-2xl bg-sheet p-3 text-ink backdrop:bg-[#0e1a17]/70"
      >
        {open && (
          <>
            {open.video ? (
              <video
                src={asset(open.video)}
                poster={asset(open.poster)}
                controls
                autoPlay
                muted
                playsInline
                className="max-h-[76vh] w-full rounded-xl bg-[#0e1a17] object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(open.poster)}
                alt={open.title}
                className="max-h-[76vh] w-full rounded-xl object-contain"
              />
            )}
            <div className="flex items-start justify-between gap-4 px-1 pt-3">
              <div className="min-w-0">
                <p className="display text-xl">{open.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{open.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="shrink-0 rounded-full border border-line px-3 py-1 text-sm font-semibold text-forest"
              >
                Close
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
