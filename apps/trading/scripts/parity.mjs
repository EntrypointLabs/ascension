import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

import {
  ORIG,
  NEW,
  OUT,
  START,
  FREEZE_CSS,
  cacheExternal,
  normaliseHtml,
  seedRandom,
} from "./parity-shared.mjs";

const only = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const desktop = { width: 1440, height: 900 };
const laptop = { width: 1280, height: 720 };
const tablet = { width: 900, height: 1100 };
const mobile = { width: 390, height: 844 };
const scenarios = [
  ["d-detail", desktop, {}],
  ["d-detail-light", desktop, { initialTheme: "light" }],
  ["d-watch", desktop, { initialScreen: "watch" }],
  ["d-watch-open", desktop, { initialScreen: "watch", initialWatchOpen: "BTC" }],
  ["d-prop", desktop, { initialAccount: "prop", initialScreen: "prop" }],
  [
    "d-prop-light",
    desktop,
    { initialAccount: "prop", initialScreen: "prop", initialTheme: "light" },
  ],
  ["d-profile", desktop, { initialProfile: "open" }],
  ["d-drawer", desktop, { initialDrawer: "open" }],
  ["d-venues", desktop, { initialVenuePanel: "open" }],
  ["d-settings", desktop, { initialState: { stOpen: true } }],
  ["d-onboarding", desktop, { initialState: { obOpen: true } }],
  ["d-ai", desktop, { initialState: { aiOpen: true } }],
  ["d-search", desktop, { initialState: { srch: true } }],
  ["d-orders", desktop, { initialTab: "orders" }],
  ["d-line", desktop, { initialChart: "line" }],
  ["l-detail", laptop, {}],
  ["t-detail", tablet, {}],
  ["t-watch", tablet, { initialScreen: "watch" }],
  ["m-home", mobile, {}],
  ["m-detail", mobile, { initialScreen: "detail" }],
  ["m-watch", mobile, { initialScreen: "watch" }],
  ["m-prop", mobile, { initialAccount: "prop", initialScreen: "prop" }],
  ["m-sheet", mobile, { initialScreen: "detail", initialSheet: "long" }],
  ["m-light", mobile, { initialTheme: "light" }],
  ["m-profile", mobile, { initialProfile: "open" }],
  ["m-settings", mobile, { initialState: { stOpen: true } }],
  ["m-onboarding", mobile, { initialState: { obOpen: true } }],
  ["m-chart-fs", mobile, { initialScreen: "detail", initialState: { chartFs: true } }],
  ["d-chart-fs", desktop, { initialState: { chartFs: true } }],
  ["m-watch-open", mobile, { initialScreen: "watch", initialWatchOpen: "BTC" }],
].filter((s) => !only || s[0].startsWith(only));

async function captureOnce(browser, url, viewport, props, file) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  await cacheExternal(ctx);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  // Paused from the first frame so both builds see the same number of simulated ticks.
  await page.clock.install({ time: START });
  await page.clock.pauseAt(START);
  await page.addInitScript(seedRandom);
  const hash = Object.keys(props).length ? "#" + encodeURIComponent(JSON.stringify(props)) : "";
  try {
    await page.goto(url + hash, { waitUntil: "networkidle" });
  } catch (e) {
    await ctx.close();
    throw e;
  }
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.clock.runFor(3000);
  await page.waitForTimeout(300);
  const html = normaliseHtml(await page.evaluate(() => document.getElementById("root").innerHTML));
  // The price chart intentionally differs from the prototype (bundled library, longer history),
  // so it is compared by DOM and styles only.
  await page.screenshot({ path: file, animations: "disabled", mask: [page.locator("#tv-host")] });
  const styles = await page.evaluate(() => {
    const out = [];
    for (const el of document.getElementById("root").querySelectorAll("*")) {
      for (const pseudo of [null, "::before", "::after"]) {
        const cs = getComputedStyle(el, pseudo);
        if (pseudo && cs.content === "none") continue;
        const o = {};
        for (const k of cs) if (!k.startsWith("--")) o[k] = cs.getPropertyValue(k);
        out.push([
          `${el.tagName.toLowerCase()}.${el.getAttribute("class") || ""}${pseudo || ""}`,
          o,
        ]);
      }
    }
    return out;
  });
  await ctx.close();
  return { html, errors, styles };
}

async function capture(...args) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await captureOnce(...args);
    } catch (e) {
      if (attempt === 3) throw e;
    }
  }
}

// The CSS minifier rewrites some values into equivalent notations.
const DIRECTIONS = {
  "to top": "0deg",
  "to right": "90deg",
  "to bottom": "180deg",
  "to left": "270deg",
};
const normalise = (prop, value) => {
  let v = value.replace(/to (top|right|bottom|left)(?=,)/g, (m) => DIRECTIONS[m]);
  if (prop.startsWith("background-position")) v = v.replace(/\b0%/g, "0px");
  return v;
};

// Text measurement jitters by 1/64px between otherwise identical runs.
const NUMBER = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
function sameValue(a, b) {
  if (a === b) return true;
  if (a.replace(NUMBER, "#") !== b.replace(NUMBER, "#")) return false;
  const na = a.match(NUMBER) ?? [];
  const nb = b.match(NUMBER) ?? [];
  return na.every((n, i) => Math.abs(Number(n) - Number(nb[i])) <= 0.05);
}

function diffStyles(a, b) {
  const diffs = [];
  if (a.length !== b.length) return [`element count ${a.length} vs ${b.length}`];
  for (let i = 0; i < a.length; i++) {
    const [key, sa] = a[i];
    const sb = b[i][1];
    for (const prop of Object.keys(sa)) {
      if (!sameValue(normalise(prop, sa[prop]), normalise(prop, sb[prop] ?? ""))) {
        diffs.push(
          `${key} { ${prop}: ${sa[prop].slice(0, 80)} => ${(sb[prop] ?? "").slice(0, 80)} }`,
        );
      }
    }
  }
  return diffs;
}

function comparePixels(origPng, newPng) {
  const pa = PNG.sync.read(fs.readFileSync(origPng));
  const pb = PNG.sync.read(fs.readFileSync(newPng));
  const diff = new PNG({ width: pa.width, height: pa.height });
  const px = pixelmatch(pa.data, pb.data, diff.data, pa.width, pa.height, {
    threshold: 0.1,
    // without this, small real differences on curved edges are dismissed as anti-aliasing
    includeAA: true,
  });
  return { px, diff };
}

const browser = await chromium.launch({ channel: "chrome" });
let fail = 0;
for (const [name, viewport, props] of scenarios) {
  const origPng = path.join(OUT, name + ".orig.png");
  const newPng = path.join(OUT, name + ".new.png");
  let a = await capture(browser, ORIG, viewport, props, origPng);
  let b = await capture(browser, NEW, viewport, props, newPng);
  // The chart library sizes its canvases from a real-time ResizeObserver, which can race the capture.
  if (a.html !== b.html) {
    a = await capture(browser, ORIG, viewport, props, origPng);
    b = await capture(browser, NEW, viewport, props, newPng);
  }
  let { px, diff } = comparePixels(origPng, newPng);
  if (px && a.html === b.html) {
    a = await capture(browser, ORIG, viewport, props, origPng);
    b = await capture(browser, NEW, viewport, props, newPng);
    ({ px, diff } = comparePixels(origPng, newPng));
  }
  if (px) fs.writeFileSync(path.join(OUT, name + ".diff.png"), PNG.sync.write(diff));
  const domEq = a.html === b.html;
  fs.writeFileSync(path.join(OUT, name + ".orig.html"), a.html);
  fs.writeFileSync(path.join(OUT, name + ".new.html"), b.html);
  const css = domEq ? diffStyles(a.styles, b.styles) : [];
  if (css.length) fs.writeFileSync(path.join(OUT, name + ".css-diff.txt"), css.join("\n"));
  if (px || !domEq || css.length || a.errors.length || b.errors.length) fail++;
  console.log(
    `${name.padEnd(16)} dom=${domEq ? "same" : "DIFF"} css=${domEq ? css.length : "?"} px=${px} errs=${a.errors.length}/${b.errors.length} ${b.errors[0] || ""}`,
  );
}
await browser.close();
console.log(fail ? `FAIL ${fail}/${scenarios.length}` : `ALL ${scenarios.length} MATCH`);
process.exit(fail ? 1 : 0);
