import { hashString, seededRandom } from "@/lib/random";

const AVATAR_PALETTES = [
  ["#1f2a44", "#7ea0ff"],
  ["#2a1f44", "#b49cff"],
  ["#13332f", "#4fd1b8"],
  ["#3a2412", "#f0a35a"],
  ["#3a1626", "#f27aa8"],
  ["#26303a", "#a9c1d6"],
  ["#332b10", "#e6c34a"],
  ["#1d3320", "#7bd389"],
];
const avatarCache: Record<string, string> = {};
/** Deterministic 5x5 symmetric avatar, returned as an SVG data URI. */
export function identicon(seedText: string): string {
  if (avatarCache[seedText]) {
    return avatarCache[seedText];
  }
  const rng = seededRandom(hashString("av" + seedText));
  const palette = AVATAR_PALETTES[Math.floor(rng() * AVATAR_PALETTES.length)];
  let cells = "";
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      if (!(rng() < 0.5)) {
        const opacity = (0.55 + rng() * 0.45).toFixed(2);
        cells +=
          '<rect x="' +
          (2 + col * 4) +
          '" y="' +
          (2 + row * 4) +
          '" width="4" height="4" fill="' +
          palette[1] +
          '" fill-opacity="' +
          opacity +
          '"/>';
        if (col < 2) {
          cells +=
            '<rect x="' +
            (2 + (4 - col) * 4) +
            '" y="' +
            (2 + row * 4) +
            '" width="4" height="4" fill="' +
            palette[1] +
            '" fill-opacity="' +
            opacity +
            '"/>';
        }
      }
    }
  }
  const svgMarkup =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="' +
    palette[0] +
    '"/>' +
    cells +
    "</svg>";
  return (avatarCache[seedText] =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgMarkup));
}
