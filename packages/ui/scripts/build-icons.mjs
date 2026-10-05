// Draws the app icons from the logo mark: a vector tile, a multi-size favicon.ico and an
// apple-touch-icon. Run with `pnpm --filter @openfutures/ui icons`. No dependencies: the mark is
// made of straight segments, so it is filled here directly and written out as PNG.

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from "../src/logo/mark.ts";

const TILE = [0xf5, 0xf5, 0xf4];
const INK = [0x0b, 0x0b, 0x0b];
// Proportions of the brand tile in the apps: a 26px mark in a 32px square with 4px corners.
const MARK_RATIO = 26 / 32;
const RADIUS_RATIO = 4 / 32;
const SAMPLES = 8;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [viewX, viewY, viewSize] = LOGO_MARK_VIEWBOX.split(" ").map(Number);

// "M x y L x y ... Z" repeated: one closed polygon per subpath.
const polygons = LOGO_MARK_PATH.split("Z")
  .map((subpath) => subpath.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [])
  .filter((numbers) => numbers.length)
  .map((numbers) =>
    numbers.reduce((points, n, i) => (i % 2 ? points : [...points, [n, numbers[i + 1]]]), []),
  );

// Even-odd fill, so the inner square stays open.
function insideMark(x, y) {
  let inside = false;
  for (const points of polygons) {
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

function insideRoundedSquare(x, y, size, radius) {
  const dx = Math.max(radius - x, x - (size - radius), 0);
  const dy = Math.max(radius - y, y - (size - radius), 0);
  return dx * dx + dy * dy <= radius * radius;
}

/** RGBA pixels of the tile at `size`, with square corners when `rounded` is false. */
function drawTile(size, { rounded = true } = {}) {
  const pixels = Buffer.alloc(size * size * 4);
  const radius = rounded ? size * RADIUS_RATIO : 0;
  const markSize = size * MARK_RATIO;
  const scale = viewSize / markSize;
  const offset = (size - markSize) / 2;
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let tile = 0;
      let ink = 0;
      for (let sy = 0; sy < SAMPLES; sy++) {
        for (let sx = 0; sx < SAMPLES; sx++) {
          const x = px + (sx + 0.5) / SAMPLES;
          const y = py + (sy + 0.5) / SAMPLES;
          if (!insideRoundedSquare(x, y, size, radius)) continue;
          tile++;
          if (insideMark((x - offset) * scale + viewX, (y - offset) * scale + viewY)) ink++;
        }
      }
      const i = (py * size + px) * 4;
      const inkShare = tile ? ink / tile : 0;
      for (let c = 0; c < 3; c++)
        pixels[i + c] = Math.round(TILE[c] + (INK[c] - TILE[c]) * inkShare);
      pixels[i + 3] = Math.round((tile / (SAMPLES * SAMPLES)) * 255);
    }
  }
  return pixels;
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buffer) => {
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const out = Buffer.alloc(body.length + 8);
  out.writeUInt32BE(data.length, 0);
  body.copy(out, 4);
  out.writeUInt32BE(crc32(body), body.length + 4);
  return out;
}

function png(size, pixels) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header.set([8, 6, 0, 0, 0], 8); // 8-bit RGBA
  const rows = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++)
    pixels.copy(rows, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** An .ico holding one PNG per size. */
function ico(sizes) {
  const images = sizes.map((size) => png(size, drawTile(size)));
  const directory = Buffer.alloc(6 + 16 * sizes.length);
  directory.writeUInt16LE(1, 2); // icon
  directory.writeUInt16LE(sizes.length, 4);
  let offset = directory.length;
  sizes.forEach((size, i) => {
    const entry = 6 + 16 * i;
    directory.set([size, size, 0, 0], entry);
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(images[i].length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += images[i].length;
  });
  return Buffer.concat([directory, ...images]);
}

const hex = (rgb) => "#" + rgb.map((n) => n.toString(16).padStart(2, "0")).join("");
const markBox = 32 * MARK_RATIO;
const tileSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
  `<rect width="32" height="32" rx="${32 * RADIUS_RATIO}" fill="${hex(TILE)}"/>` +
  `<svg x="${(32 - markBox) / 2}" y="${(32 - markBox) / 2}" width="${markBox}" height="${markBox}" viewBox="${LOGO_MARK_VIEWBOX}">` +
  `<path fill="${hex(INK)}" fill-rule="evenodd" d="${LOGO_MARK_PATH}"/></svg></svg>\n`;

const files = {
  "favicon.svg": tileSvg,
  "favicon.ico": ico([16, 32, 48]),
  // iOS rounds the corners itself and shows transparency as black, so this one is a full square.
  "apple-touch-icon.png": png(180, drawTile(180, { rounded: false })),
};

// The icons live with the logo and are copied to every app, since a favicon has to be served
// from the app's own root.
const targets = ["assets/icons", "../../apps/trading/public", "../../apps/website/public"];
for (const target of targets) {
  mkdirSync(join(root, target), { recursive: true });
  for (const [name, contents] of Object.entries(files))
    writeFileSync(join(root, target, name), contents);
}
console.log(
  Object.entries(files)
    .map(([name, c]) => `${name} ${c.length}b`)
    .join(", "),
  "→",
  targets.join(", "),
);
