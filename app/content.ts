// Everything the site says lives here, so changing a word never means touching a layout.
// This site is public: only finished work and my own words about it, nothing private.

export const VERDESNAP_REPO = "https://github.com/schwa1997/verdeSnap";
export const VERDESNAP_RELEASE = `${VERDESNAP_REPO}/releases/tag/v0.1.0`;
export const GITHUB_PROFILE = "https://github.com/schwa1997";
export const INSTAGRAM = "https://www.instagram.com/arty.verde/";

export type Work = {
  title: string;
  kind: "MV" | "Video" | "Painting";
  caption: string;
  poster: string;
  video?: string;
  /** the MV gets the wide spot */
  wide?: boolean;
};

export const works: Work[] = [
  {
    title: "行走的鱼 ✧",
    kind: "MV",
    caption:
      "My first MV! A little fish shadow walking on land, in its mask and its too-big coat.",
    poster: "/art/fish-on-land.jpg",
    video: "/art/fish-on-land.mp4",
    wide: true,
  },
  {
    title: "dentro de mí vive una pequeña yo ✧",
    kind: "Video",
    caption: "A little nature elf inside me always finds me and leads me to the sunshine.",
    poster: "/art/little-me.jpg",
  },
  {
    title: "Reading on a bench ✧",
    kind: "Video",
    caption: "手帐 style: golden leaves falling, a book and this view.",
    poster: "/art/bench-journal.jpg",
    video: "/art/bench-journal.mp4",
  },
  {
    title: "It's MAGIC ✧",
    kind: "Video",
    caption: "The website won't work. I breathe, I manifest, and leaves burst out. hehe",
    poster: "/art/magic.jpg",
    video: "/art/magic.mp4",
  },
  {
    title: "cambiando de look ✧",
    kind: "Video",
    caption: "4 outfits, 1 pose, 1 me. Every look changes on the beat.",
    poster: "/art/looks.jpg",
    video: "/art/looks.mp4",
  },
  {
    title: "mis pasos ✧",
    kind: "Painting",
    caption: "Every day the same view down at my feet, like a cozy naive oil painting.",
    poster: "/art/mis-pasos.jpg",
  },
  {
    title: "trucha y aguacate ✧",
    kind: "Painting",
    caption: "A cozy dinner of mine, painted in the same naive style.",
    poster: "/art/trucha.jpg",
  },
];

export const journey = [
  { date: "3 Nov 2026", text: "VerdeUniverse begins" },
  { date: "5 Nov 2026", text: "My first MV: 行走的鱼" },
  { date: "6 Nov 2026", text: "My first tool is out: VerdeSnap v0.1.0" },
];

export const ribbon = [
  "tools",
  "arte",
  "想法",
  "made by me",
  "hecho con calma",
  "慢慢长大",
  "new day new me",
  "verde",
];
