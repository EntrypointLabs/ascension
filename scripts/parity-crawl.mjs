// Drives the original and the remake through the same sequence of clicks and keystrokes,
// comparing the DOM after every step. Complements parity.mjs, which compares fixed states.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

import { ORIG, NEW, OUT, START, FREEZE_CSS, cacheExternal, normaliseHtml, seedRandom } from "./parity-shared.mjs";

const STEPS = Number(process.env.STEPS || 250);
const only = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };
const runs = [
  ["crawl-d-trade", desktop, {}, 1],
  ["crawl-d-trade-b", desktop, {}, 7],
  ["crawl-d-watch", desktop, { initialScreen: "watch" }, 3],
  ["crawl-d-watch-b", desktop, { initialScreen: "watch", initialWatchOpen: "BTC" }, 11],
  ["crawl-d-prop", desktop, { initialAccount: "prop", initialScreen: "prop" }, 5],
  ["crawl-m-home", mobile, {}, 1],
  ["crawl-m-detail", mobile, { initialScreen: "detail" }, 7],
  ["crawl-m-watch", mobile, { initialScreen: "watch" }, 3],
  ["crawl-m-prop", mobile, { initialAccount: "prop", initialScreen: "prop" }, 5],
].filter((r) => !only || r[0].startsWith(only));

const stubBrowserApis = () => {
  window.open = () => null;
  // Fullscreen and image export resolve on real time, outside the paused clock; parity.mjs
  // covers the full-screen chart as a fixed state instead.
  Element.prototype.requestFullscreen = () => Promise.resolve();
  Document.prototype.exitFullscreen = () => Promise.resolve();
  navigator.share = undefined;
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest?.("a[href]");
      if (a) e.preventDefault();
    },
    true,
  );
};

async function openOnce(browser, url, viewport, props) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  await cacheExternal(ctx);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  await page.clock.install({ time: START });
  await page.clock.pauseAt(START);
  await page.addInitScript(seedRandom);
  await page.addInitScript(stubBrowserApis);
  const hash = Object.keys(props).length ? "#" + encodeURIComponent(JSON.stringify(props)) : "";
  try {
    await page.goto(url + hash, { waitUntil: "networkidle" });
  } catch (e) {
    await ctx.close();
    throw e;
  }
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.clock.runFor(2000);
  return { ctx, page, errors };
}

async function open(...args) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await openOnce(...args);
    } catch (e) {
      if (attempt === 3) throw e;
    }
  }
}

// Picks the n-th currently visible control and acts on it; returns a description of what it did.
const act = (n) => {
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.pointerEvents === "none") return false;
    const x = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1);
    const y = Math.min(Math.max(r.top + r.height / 2, 0), innerHeight - 1);
    const top = document.elementFromPoint(x, y);
    return !!top && (el === top || el.contains(top) || top.contains(el));
  };
  const all = [
    ...document
      .getElementById("root")
      .querySelectorAll("button:not(:disabled), [role=tab], [role=button], a[href], input, select, summary"),
  ]
    .filter(visible)
    .filter((el) => !/Save image|Copy image|Saving/.test(el.textContent || "") && !/\b(snap-btn|fs-btn|fs-close)\b/.test(el.className));
  if (!all.length) return "nothing visible";
  const describe = (el) =>
    `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").slice(0, 40)} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30)}"`;
  // Prefer a control this walk has not used yet, so it keeps reaching new states.
  const seen = (window.__crawlSeen ||= new Set());
  const start = n % all.length;
  let el = all[start];
  for (let i = 0; i < all.length; i++) {
    const candidate = all[(start + i) % all.length];
    if (!seen.has(describe(candidate))) {
      el = candidate;
      break;
    }
  }
  const label = describe(el);
  seen.add(label);
  if (el.tagName === "INPUT" && el.type === "file") return "skip " + label;
  if (el.tagName === "INPUT" && !["checkbox", "radio", "range", "button", "submit"].includes(el.type)) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(el, el.type === "number" || el.inputMode === "decimal" ? "250" : "bt");
    el.dispatchEvent(new Event("input", { bubbles: true }));
    return "type " + label;
  }
  el.click();
  return "click " + label;
};

// The chart library sizes its own canvases from a real-time ResizeObserver, so its internals
// are not deterministic between two runs of the same build. parity.mjs covers them when settled.
const snapshot = (page) =>
  page
    .evaluate(() => {
      const root = document.getElementById("root").cloneNode(true);
      for (const chart of root.querySelectorAll(".tv-lightweight-charts")) {
        chart.replaceChildren();
        chart.removeAttribute("style");
      }
      return root.innerHTML;
    })
    .then(normaliseHtml);

const browser = await chromium.launch({ channel: "chrome" });
let fail = 0;
for (const [name, viewport, props, stride] of runs) {
  const a = await open(browser, ORIG, viewport, props);
  const b = await open(browser, NEW, viewport, props);
  let result = "match";
  let step = 0;
  const trail = [];
  for (; step < STEPS; step++) {
    const n = step * stride + step;
    const [da, db] = await Promise.all([a.page.evaluate(act, n), b.page.evaluate(act, n)]);
    trail.push(`${step}: ${da}`);
    await Promise.all([a.page.clock.runFor(400), b.page.clock.runFor(400)]);
    if (step % 9 === 8) await Promise.all([a.page.keyboard.press("Escape"), b.page.keyboard.press("Escape")]);
    const [ha, hb] = await Promise.all([snapshot(a.page), snapshot(b.page)]);
    if (da !== db || ha !== hb || a.errors.join() !== b.errors.join()) {
      result = `MISMATCH at step ${step} (${da} / ${db}) errs=${a.errors.length}/${b.errors.length} ${b.errors.at(-1) || ""}`;
      fs.writeFileSync(path.join(OUT, name + ".orig.html"), ha);
      fs.writeFileSync(path.join(OUT, name + ".new.html"), hb);
      fs.writeFileSync(path.join(OUT, name + ".trail.txt"), trail.join("\n"));
      fail++;
      break;
    }
  }
  const kinds = new Set(trail.map((t) => t.replace(/^\d+: /, "")));
  console.log(`${name.padEnd(18)} steps=${step} distinct=${kinds.size} origErrors=${a.errors.length} ${result}`);
  await a.ctx.close();
  await b.ctx.close();
}
await browser.close();
console.log(fail ? `FAIL ${fail}/${runs.length}` : `ALL ${runs.length} CRAWLS MATCH`);
process.exit(fail ? 1 : 0);
