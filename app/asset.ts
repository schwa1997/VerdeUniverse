// GitHub Pages serves this site from /verdeUniverse, and Next only prefixes its own links,
// so every file from public/ goes through here. Locally the prefix is empty.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
