/**
 * REFERENCE BROWSER CHECK for the Property Standard rollout (appendix N).
 *
 * ONE committed implementation, reused by every port and every fidelity reviewer.
 * Derived from the Property port's tmp/design_migration/scripts/browser_check.mjs
 * (gitignored, would not survive a machine change). Every comment marked with an
 * incident is kept: the Property contrast checker was materially wrong THREE
 * times, always on the same two operations (alpha compositing and colour
 * parsing), and the comments are what stopped it happening a fourth.
 *
 * STANDING RULES (PROPERTY_STANDARD_ROLLOUT.md §4.5, trap 9):
 *   - NEVER scheduled, never in CI, never pointed at production.
 *   - Run against `next start`, never `next dev` (dev gives false CSP reds).
 *   - Pass --out per run or concurrent runs clobber each other (happened twice).
 *   - Build in an isolated worktree if another dev server may be running: a
 *     foreign `next dev` clobbered a phase build mid-measurement.
 *
 * Uses puppeteer-core + the installed Edge, the established pattern in this repo
 * (scripts/btn_contrast_probe.mjs, scripts/an01_browser_pass.mjs). Playwright is
 * deliberately NOT a dependency here.
 *
 * PER ROUTE, PER WIDTH:
 *   1. horizontal overflow   - scrollWidth > clientWidth, plus the offending nodes.
 *                              Zero tolerance at 390 (§0.8).
 *   2. contrast              - every text node against its PAINTED background.
 *                              Floor 4.5:1 for small text (<15px) and for any
 *                              text carrying a fine-print/slate class; 3:1
 *                              otherwise. §0.7 / A.8.
 *   3. anchor targets        - every element addressed by an in-page #anchor must
 *                              carry scroll-mt-24 (or equivalent computed
 *                              scroll-margin-top), or the sticky header eats the
 *                              heading on jump.
 *   4. heading typography    - computed weight / line-height / letter-spacing for
 *                              h1..h3. The unlayered globals.css line-height rule
 *                              silently beats every Tailwind utility (trap 1), and
 *                              only getComputedStyle sees it. Never screenshots,
 *                              never class names.
 *   5. console errors, page errors, failed requests.
 *
 * SELF-TEST. Appendix N: "verify the instrument against two known pairs before
 * trusting it". This script runs that check on every launch and REFUSES to report
 * if the maths is wrong. An instrument that has not proved itself does not get to
 * fail a phase.
 *
 * The pairs are slate-500 on white = 4.76 and slate-400 on white = 2.56.
 * NOTE, 2026-08-25: appendix N originally specified 2.51 for the second pair.
 * That figure is WRONG and was corrected in the doc the day this file was written.
 * slate-400 is #94a3b8; its WCAG relative luminance is 0.359547, so the ratio
 * against white is 1.05 / 0.409547 = 2.5640. Confirmed two independent ways (this
 * instrument's canvas path in Edge, and a standalone Python recompute) which agree
 * to four decimals. No Tailwind 400-step neutral yields 2.51: gray-400 is 2.5388,
 * zinc-400 is 2.5629. Had the instrument been "fixed" to match the doc, every
 * contrast finding in the programme would have been skewed.
 *
 * USAGE:
 *   node docs/_engines/instruments/browser_check.mjs --site=crypto --base=http://localhost:3000 --save-baseline
 *   node docs/_engines/instruments/browser_check.mjs --site=crypto --base=http://localhost:3000 --out=tmp/bc_phase3.json
 *   node docs/_engines/instruments/browser_check.mjs --site=crypto --widths=390 / /contact
 *
 * Exit 0 = clean, 1 = at least one NEW failure, 2 = the instrument failed its own
 * self-test and reported nothing.
 */
import puppeteer from "puppeteer-core";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (n, d) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};
const has = (n) => args.includes(`--${n}`);

const SITE = flag("site", "");
if (!SITE) {
  console.error("--site=<key> is required (the repo directory name, e.g. crypto, Property)");
  process.exit(2);
}
const BASE = flag("base", "http://localhost:3000").replace(/\/$/, "");
const WIDTHS = flag("widths", "390,768,1024,1440").split(",").map(Number);
const SHOTS = flag("shots", "");
const SAVE = has("save-baseline");
const ARTICLE_DEPTH = Number(flag("article-depth", "3"));
const BASELINE = path.resolve(flag("baseline", `docs/${SITE.toLowerCase()}/_port/browser_baseline.json`));
const OUT = path.resolve(flag("out", `tmp/browser_check_${SITE}_${Date.now()}.json`));
const EDGE =
  flag("edge", "") ||
  process.env.EDGE_PATH ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

/** Every page in the sitemap, minus the blog long tail (deterministically sampled). */
async function sitemapRoutes(sample) {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status} - is the server up on ${BASE}?`);
  const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1].trim()).pathname)
    .filter((p, i, a) => a.indexOf(p) === i);
  const isArticle = (p) => p.startsWith("/blog/") && p.split("/").filter(Boolean).length === ARTICLE_DEPTH;
  const articles = paths.filter(isArticle);
  const step = Math.max(1, Math.floor(articles.length / sample));
  return [
    ...paths.filter((p) => !isArticle(p)),
    ...articles.filter((_, i) => i % step === 0).slice(0, sample),
  ];
}

// ROUTE COVERAGE IS DERIVED, NEVER TYPED. The Property port kept a hand-written
// list of 14 routes, never extended it, and shipped six pages the standing gate
// never looked at. A list that must be edited to stay honest will not be edited.
const routes = args.filter((a) => !a.startsWith("--"));
const TARGETS = routes.length ? routes : await sitemapRoutes(Number(flag("sample", "2")));

// ---------------------------------------------------------------------------
// In-page probe. One evaluate() so it is one round trip per page.
// ---------------------------------------------------------------------------
const PROBE = () => {
  // Colour resolution by PAINTING, not parsing. Tailwind v4 emits oklch(), which
  // getComputedStyle returns verbatim and no regex turns into sRGB; painting one
  // pixel and reading it back is exact for every CSS colour syntax.
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  // An invalid fillStyle is IGNORED by the canvas spec, it does not throw, so the
  // previous colour stays and the read-back is silently somebody else's colour.
  // Paint a sentinel first and refuse the answer if the assignment did nothing.
  let unparsed = 0;
  const rgb = (s) => {
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = "#00ff01";
    try {
      cx.fillStyle = s;
    } catch {
      unparsed += 1;
      return null;
    }
    if (cx.fillStyle === "#00ff01" && !/^#00ff01$/i.test(String(s).trim())) {
      unparsed += 1;
      return null;
    }
    cx.fillRect(0, 0, 1, 1);
    return [...cx.getImageData(0, 0, 1, 1).data];
  };
  const lum = ([r, g, b]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };

  // SELF-TEST (appendix N). Two known pairs, checked in the page, in the same code
  // path the findings use. If this is wrong every finding below is noise.
  const selfTest = (() => {
    const white = rgb("#ffffff");
    const s500 = rgb("#64748b"); // slate-500
    const s400 = rgb("#94a3b8"); // slate-400
    if (!white || !s500 || !s400) return { ok: false, why: "colour parsing failed" };
    const a = ratio(s500.slice(0, 3), white.slice(0, 3));
    const b = ratio(s400.slice(0, 3), white.slice(0, 3));
    // 4.7588 and 2.5640 to four decimals; see the header note on the doc's 2.51.
    const ok = Math.abs(a - 4.76) < 0.02 && Math.abs(b - 2.56) < 0.02;
    return { ok, measured: { slate500OnWhite: +a.toFixed(2), slate400OnWhite: +b.toFixed(2) } };
  })();

  // Effective background: walk the PAINT STACK, COMPOSITING each partially
  // transparent layer onto the one beneath it.
  // Incident 1: navy testimonial cards are `bg-white/5` on `bg-slate-900`; taking
  // the first layer with any alpha at face value reported white-on-white at 1.00:1.
  // Incident 2: image heroes tint with a SIBLING `<div class="absolute inset-0
  // bg-slate-900/85">` over an `<Image fill>`, which an ancestor walk never sees.
  // It sailed past both and scored slate-300-on-navy at 1.49 and slate-600-on-navy
  // at 4.62, i.e. exactly inverted: flagging the readable case, clearing the
  // invisible one. Verified against painted pixels on 33 routes, 2026-08-22.
  // Background IMAGES still return null and the node is skipped: the contrast is
  // real but not computable this way, and guessing produced pure false positives.
  const bgOf = (el) => {
    const r = el.getBoundingClientRect();
    const px = r.left + r.width / 2;
    const py = r.top + r.height / 2;
    const inView = px >= 0 && py >= 0 && px < innerWidth && py < innerHeight;
    const stack = inView ? document.elementsFromPoint(px, py) : [];
    const at = stack.indexOf(el);
    const chain = at >= 0 ? stack.slice(at) : null;
    const walk = chain ?? [...(function* (n) { while (n) { yield n; n = n.parentElement; } })(el)];
    const layers = []; // top-most first
    for (const n of walk) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return null;
      const p = rgb(cs.backgroundColor);
      if (!p) return null;
      if (p[3] <= 8) continue; // effectively transparent, paints nothing
      layers.push(p);
      if (p[3] >= 250) break; // opaque: nothing below it shows through
    }
    let out =
      layers.length && layers[layers.length - 1][3] >= 250
        ? layers.pop().slice(0, 3)
        : [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i -= 1) {
      const [r2, g2, b2, a] = layers[i];
      const k = a / 255;
      out = [r2 * k + out[0] * (1 - k), g2 * k + out[1] * (1 - k), b2 * k + out[2] * (1 - k)];
    }
    return out.map(Math.round);
  };

  const doc = document.documentElement;
  const overflow = [];
  if (doc.scrollWidth > doc.clientWidth + 1) {
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > doc.clientWidth + 1 || r.left < -1) {
        overflow.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`,
        );
        if (overflow.length >= 5) break;
      }
    }
  }

  const TEXTISH = "label, p, span, li, a, button, h1, h2, h3, h4, h5, h6, td, th, dt, dd, small, figcaption";
  const contrast = [];
  for (const el of document.querySelectorAll(TEXTISH)) {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own) continue;
    // checkVisibility, not the element's own computed style: a descendant of a
    // `display:none` ancestor reports its OWN display (usually "block"), so an
    // own-style test measures unrendered nodes against whatever sits under (0,0).
    if (
      !el.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true })
    )
      continue;
    const cs = getComputedStyle(el);
    const fg = rgb(cs.color);
    if (!fg || fg[3] < 8) continue; // fully transparent text is a different bug class
    const bg = bgOf(el);
    if (!bg) continue;
    const r = ratio(fg.slice(0, 3), bg);
    // §0.7 / A.8: 4.5:1 for all text INCLUDING 11px fine print. Small text and
    // anything wearing a muted slate class is held to the full floor; the 3:1
    // band below it is for large display type, where WCAG large-text applies.
    const size = parseFloat(cs.fontSize) || 16;
    const cls = String(el.className);
    const fine = size < 15 || /text-slate-[45]00|text-xs|text-\[11px\]|fine-print/.test(cls);
    const floor = fine ? 4.5 : 3;
    if (r < floor) {
      contrast.push(
        `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 40)}" ` +
          `ratio=${r.toFixed(2)} floor=${floor} size=${size}px color=${cs.color}`,
      );
      if (contrast.length >= 12) break;
    }
  }

  // Anchor targets must clear the sticky header on jump (§0.8: scroll-mt-24 on
  // every anchor target). Derived from the page's own in-page links, so a new
  // anchor cannot be added outside the check.
  const anchorGaps = [];
  const ids = new Set(
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href").slice(1))
      .filter(Boolean),
  );
  for (const id of ids) {
    const t = document.getElementById(id);
    if (!t) {
      anchorGaps.push(`#${id} -> no such element`);
      continue;
    }
    const sm = parseFloat(getComputedStyle(t).scrollMarginTop) || 0;
    if (sm < 24) anchorGaps.push(`#${id} scroll-margin-top=${sm}px (want >= 96px / scroll-mt-24)`);
  }

  // Coverage, not a finding. A `hidden sm:block` subtree renders at no width below
  // its breakpoint, so at 390px every assertion above simply never sees it.
  const unrendered = [];
  for (const el of document.querySelectorAll("body *")) {
    if (getComputedStyle(el).display !== "none") continue;
    const n = el.querySelectorAll(TEXTISH).length;
    if (!n) continue;
    let anc = el.parentElement;
    let nested = false;
    while (anc && !nested) {
      if (getComputedStyle(anc).display === "none") nested = true;
      anc = anc.parentElement;
    }
    if (nested) continue; // roots only
    unrendered.push(
      `${el.tagName.toLowerCase()}.${String(el.className).trim().split(/\s+/).slice(0, 4).join(".").slice(0, 60)} (+${n})`,
    );
  }

  const headings = [...document.querySelectorAll("h1, h2, h3")].slice(0, 6).map((h) => {
    const cs = getComputedStyle(h);
    return {
      tag: h.tagName.toLowerCase(),
      text: h.textContent.trim().slice(0, 40),
      weight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      fontSize: cs.fontSize,
      family: cs.fontFamily.split(",")[0],
    };
  });

  return { overflow, contrast, anchorGaps, headings, unrendered, unparsed, selfTest, height: doc.scrollHeight };
};

// ---------------------------------------------------------------------------

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-first-run", "--disable-gpu"],
});
if (SHOTS) await mkdir(path.resolve(SHOTS), { recursive: true });

let baseline = {};
if (!SAVE) {
  try {
    baseline = JSON.parse(await readFile(BASELINE, "utf8"));
  } catch {
    console.log("(no browser baseline recorded; run with --save-baseline before the port starts)");
  }
}

const report = [];
let failures = 0;
let selfTestResult = null;
const coverage = {}; // route -> label -> unrendered subtree roots

for (const width of WIDTHS) {
  const label = width < 768 ? "mobile" : width < 1024 ? "tablet" : width < 1440 ? "laptop" : "desktop";
  const page = await browser.newPage();
  await page.setViewport({ width, height: width < 768 ? 844 : 900, deviceScaleFactor: 1 });
  const noise = [];
  // Local-only noise, not defects: Vercel Speed Insights and GA both fail against
  // a local server by design. Everything else is reported.
  const IGNORE = /_vercel\/speed-insights|google-analytics\.com|googletagmanager\.com|region\d+\.google/;
  const add = (s) => !IGNORE.test(s) && noise.push(s);
  // Next.js mints a fresh `_rsc=` hash on every prefetch, so an unnormalised URL
  // can never match a baseline entry and every run reports it as new.
  const stable = (u) => u.replace(/([?&]_rsc=)[^&]*/, "$1<hash>").slice(0, 120);
  // A resource-load console error reads "Failed to load resource: ... 404" with NO
  // url in the text, so IGNORE could never match it and the local-only
  // speed-insights 404 leaked into 114 of 140 page-loads. The url is on
  // location(), so stamp it into the message and let IGNORE do its job.
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const url = m.location()?.url || "";
    add(`console: ${m.text().slice(0, 160)}${url ? ` [${stable(url)}]` : ""}`);
  });
  page.on("pageerror", (e) => add(`pageerror: ${e.message.slice(0, 160)}`));
  page.on("requestfailed", (r) => {
    const why = r.failure()?.errorText || "";
    // net::ERR_ABORTED is a CANCELLATION, not a failure. This harness scrolls the
    // whole page (firing Next's viewport prefetch of every link) and then navigates
    // away, aborting them mid-flight. sweep.mjs independently asserts every
    // same-origin href resolves 200, so nothing is hidden. A genuine failure
    // reports ERR_FAILED / ERR_CONNECTION_* and still lands here; a 4xx/5xx is a
    // response, not a failure, and arrives as a console error.
    if (why === "net::ERR_ABORTED") return;
    add(`requestfailed: ${stable(r.url())} ${why}`);
  });

  for (const route of TARGETS) {
    noise.length = 0;
    let status = 0;
    let probe = { overflow: [], contrast: [], anchorGaps: [], headings: [], unrendered: [], unparsed: 0 };
    try {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 60000 });
      status = res?.status() ?? 0;
      // Scroll-triggered reveals: much of the standard is IntersectionObserver
      // driven, and an unscrolled page measures the pre-reveal state.
      await page.evaluate(async () => {
        const html = document.documentElement;
        const prev = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        for (let y = 0; y < html.scrollHeight; y += window.innerHeight * 0.8) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
        html.style.scrollBehavior = prev;
      });
      await new Promise((r) => setTimeout(r, 1200));
      probe = await page.evaluate(PROBE);
      if (probe.selfTest && !selfTestResult) selfTestResult = probe.selfTest;
      if (SHOTS) {
        const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "_");
        await page.screenshot({
          path: path.join(path.resolve(SHOTS), `${slug}__${label}.png`),
          fullPage: true,
        });
      }
    } catch (err) {
      noise.push(`navigation: ${err.message.slice(0, 160)}`);
    }
    const key = `${route}|${label}`;
    const known = new Set(baseline[key] || []);
    const newContrast = probe.contrast.filter((c) => !known.has(c));
    const newAnchors = (probe.anchorGaps || []).filter((a) => !known.has(a));
    const newNoise = [...new Set(noise)].filter((n) => !known.has(n));
    // 304 is a normal repeat load against `next start` with a warm browser cache.
    // Overflow is NEVER baselined: the standard's floor is zero at every width.
    const bad =
      ![200, 304].includes(status) ||
      probe.overflow.length ||
      newContrast.length ||
      newAnchors.length ||
      newNoise.length;
    if (bad) failures += 1;
    report.push({ route, label, width, status, ...probe, noise: [...new Set(noise)] });
    (coverage[route] ||= {})[label] = probe.unrendered || [];
    if (SAVE) baseline[key] = [...probe.contrast, ...(probe.anchorGaps || []), ...new Set(noise)];
    console.log(`${bad ? "!" : " "} ${String(status).padEnd(3)} ${label.padEnd(7)} ${route}`);
    for (const o of probe.overflow) console.log(`      [overflow] ${o}`);
    for (const c of newContrast) console.log(`      [contrast] ${c}`);
    for (const a of newAnchors) console.log(`      [anchor]   ${a}`);
    for (const n of newNoise) console.log(`      [noise]    ${n}`);
  }
  await page.close();
}
await browser.close();

// The instrument proves itself before it is allowed to fail a phase.
if (!selfTestResult || !selfTestResult.ok) {
  console.error(
    `\nINSTRUMENT SELF-TEST FAILED: ${JSON.stringify(selfTestResult)}. ` +
      `Expected slate-500-on-white 4.76 and slate-400-on-white 2.56. ` +
      `Every contrast finding above is untrustworthy; fix the instrument before reporting.`,
  );
  process.exit(2);
}

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify({ site: SITE, base: BASE, widths: WIDTHS, selfTest: selfTestResult, report }, null, 2));
if (SAVE) {
  await mkdir(path.dirname(BASELINE), { recursive: true });
  await writeFile(BASELINE, JSON.stringify(baseline, null, 2));
  console.log(`\nbaseline written: ${BASELINE}`);
  process.exit(0);
}

// Coverage report. A subtree unrendered at EVERY width in this run was asserted
// against by nothing at all: a hole in the gate, not a finding on the page.
// Reported, never failed; the fix is to widen --widths, not to edit a page.
const blind = [];
for (const [route, byLabel] of Object.entries(coverage)) {
  const sets = Object.values(byLabel);
  if (sets.length < 1) continue;
  for (const root of sets[0]) if (sets.every((s) => s.includes(root))) blind.push(`${route}  ${root}`);
}
const unparsedTotal = report.reduce((n, r) => n + (r.unparsed || 0), 0);
console.log(
  `\nself-test OK (slate-500/white ${selfTestResult.measured.slate500OnWhite}, ` +
    `slate-400/white ${selfTestResult.measured.slate400OnWhite})`,
);
console.log(`${report.length} page-loads, ${failures} with NEW problems. Detail: ${OUT}`);
console.log(
  `coverage: ${blind.length} subtree(s) unrendered at every width tested (${WIDTHS.join("/")}), so unchecked; ` +
    `${unparsedTotal} unparseable colour(s)`,
);
for (const b of blind.slice(0, 20)) console.log(`      [unchecked] ${b}`);
process.exit(failures ? 1 : 0);
