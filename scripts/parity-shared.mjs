import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const ORIG = process.env.ORIG || "http://localhost:4801/openfutures-v90";
export const NEW = process.env.NEW || "http://localhost:4802/";
export const OUT = process.env.OUT || ".parity";
export const START = new Date("2026-10-05T12:00:00Z");

const CACHE = path.join(OUT, "cache");
fs.mkdirSync(CACHE, { recursive: true });
const sha = (s) => crypto.createHash("sha1").update(s).digest("hex");

/** Serves fonts and CDN scripts from disk after the first fetch, so runs do not depend on the network. */
export async function cacheExternal(context, { allow = /^https:\/\/(fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net)\// } = {}) {
  await context.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (!allow.test(url)) return route.abort();
    const file = path.join(CACHE, sha(url));
    if (fs.existsSync(file + ".json")) {
      const meta = JSON.parse(fs.readFileSync(file + ".json", "utf8"));
      return route.fulfill({ status: meta.status, headers: meta.headers, body: fs.readFileSync(file) });
    }
    try {
      const res = await route.fetch();
      const body = await res.body();
      if (res.ok()) {
        fs.writeFileSync(file, body);
        fs.writeFileSync(file + ".json", JSON.stringify({ status: res.status(), headers: res.headers() }));
      }
      return route.fulfill({ response: res, body });
    } catch {
      return route.abort();
    }
  });
}

export const seedRandom = () => {
  let s = 1234567;
  Math.random = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
};

/** CSS animations run on the compositor clock, which the paused page clock does not control. */
export const FREEZE_CSS = "*,*::before,*::after{animation:none!important;transition:none!important}";

// The same image can be inlined as base64 or as a percent-encoded SVG; compare by content.
function imageFingerprint(uri) {
  const comma = uri.indexOf(",");
  const head = uri.slice(0, comma);
  const data = uri.slice(comma + 1);
  if (!/svg/.test(head)) return sha(Buffer.from(data, "base64"));
  let svg;
  try {
    svg = /;base64/.test(head) ? Buffer.from(data, "base64").toString("utf8") : decodeURIComponent(data);
  } catch {
    svg = data;
  }
  return sha(svg.replace(/"/g, "'").replace(/>\s+</g, "><").replace(/\s+/g, " ").trim());
}

export function normaliseHtml(html) {
  return html
    // the chart library stamps the page URL into its attribution link
    .replace(/utm_source=[^"]*/g, "utm_source=")
    .replace(/"(data:image\/[^"]*)"/g, (_, uri) => `"image:${imageFingerprint(uri.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"))}"`);
}
