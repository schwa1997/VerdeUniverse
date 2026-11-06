"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "../asset";

/** The VerdeSnap film: loops quietly, or waits for a tap if I've asked for less motion. */
export function SnapVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setCalm(true);
    else video.current?.play().catch(() => setCalm(true));
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-sheet shadow-[0_24px_50px_-30px_rgb(31_107_69_/_0.6)]">
      <video
        ref={video}
        src={asset("/snap/verdesnap.mp4")}
        poster={asset("/snap/verdesnap-poster.jpg")}
        aria-label="VerdeSnap snipping a Spanish sentence, marking it, reading the text and translating it"
        muted
        loop
        playsInline
        preload="metadata"
        controls={calm}
        className="block aspect-video w-full"
      />
    </div>
  );
}
