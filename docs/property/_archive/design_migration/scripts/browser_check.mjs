/**
 * Browser-side gate for the design migration. One page load, four assertions.
 *
 * Uses puppeteer-core + the installed Edge, which is the established pattern in
 * this repo (scripts/btn_contrast_probe.mjs, scripts/an01_browser_pass.mjs).
 * The designer's Property_zip/web/scripts/shots.mjs used playwright, which is
 * NOT installed here; its ideas are ported, its dependency is not.
 *
 * Per route, per width:
 *   1. horizontal overflow  - scrollWidth > clientWidth, plus the offending nodes
 *   2. low-contrast text    - any text node whose colour is within 3:1 of its own
 *                             effective background (generalises the designer's
 *                             "text-slate-900 label on bg-slate-900" find)
 *   3. heading typography   - computed font-weight / line-height / letter-spacing
 *                             for h1..h3, because the unlayered globals.css rule
 *                             silently beats Tailwind utilities (SESSION11 §6)
 *   4. console errors, page errors and failed requests
 *
 * ROUTE COVERAGE. The default set is DERIVED from the local sitemap, not typed
 * out here. It used to be a hand-kept list of 14 and it was never extended, so
 * Phase 5 shipped six pages that the standing gate did not look at (fidelity_5
 * note 1). A list that has to be edited to stay honest will not be edited.
 * Deriving it means a page cannot be shipped outside the gate: if it is in the
 * sitemap, it is checked. Same article/hub split sweep.mjs uses, so the two
 * scripts agree on what "a page" is.
 *
 * Usage:
 *   node tmp/design_migration/scripts/browser_check.mjs                 # every sitemap page (~70 routes)
 *   node tmp/design_migration/scripts/browser_check.mjs --fast          # 14-route smoke set, for iterating
 *   node tmp/design_migration/scripts/browser_check.mjs / /contact
 *   node tmp/design_migration/scripts/browser_check.mjs --widths=390
 *   node tmp/design_migration/scripts/browser_check.mjs --shots=tmp/design_migration/shots/before
 *
 * Exit 0 = clean, 1 = at least one failure.
 */
import puppeteer from "puppeteer-core";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (n, d) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};
const BASE = flag("base", "http://localhost:3002").replace(/\/$/, "");
const WIDTHS = flag("widths", "390,1440").split(",").map(Number);
const SHOTS = flag("shots", "");
const EDGE =
  flag("edge", "") ||
  process.env.EDGE_PATH ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// --fast: one of each template. For iterating on a single change, never for a
// phase gate. The phase gate runs the derived set below.
const FAST_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/property-accountant",
  "/contact",
  "/section-24",
  "/landlord-tax",
  "/incorporation",
  "/calculators",
  "/calculators/stamp-duty-calculator",
  "/blog",
  "/blog/section-24-and-tax-relief",
  "/blog/section-24-and-tax-relief/can-section-24-push-higher-rate-tax",
  "/locations",
];

/**
 * Every page in the sitemap, minus the blog long tail. Blog articles are
 * /blog/<category>/<slug> (three segments); hubs and everything else are kept in
 * full. `articles` is the only sampled part, deterministically, so the set is
 * stable between runs and comparable to a baseline.
 */
async function sitemapRoutes(sample) {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status} - is the server up on ${BASE}?`);
  const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1].trim()).pathname)
    .filter((p, i, a) => a.indexOf(p) === i);
  const isArticle = (p) => p.startsWith("/blog/") && p.split("/").filter(Boolean).length === 3;
  const articles = paths.filter(isArticle);
  const step = Math.max(1, Math.floor(articles.length / sample));
  return [...paths.filter((p) => !isArticle(p)), ...articles.filter((_, i) => i % step === 0).slice(0, sample)];
}

const routes = args.filter((a) => !a.startsWith("--"));
const TARGETS = routes.length
  ? routes
  : args.includes("--fast")
    ? FAST_ROUTES
    : await sitemapRoutes(Number(flag("sample", "2")));

// In-page probe. Kept in one evaluate() so it is one round trip per page.
const PROBE = () => {
  // Colour resolution by painting, not parsing. Tailwind v4 emits oklch(), which
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
  // Effective background: walk up the paint stack, COMPOSITING each partially
  // transparent layer onto the one beneath it. Phase 5's navy testimonial cards
  // are `bg-white/5` on `bg-slate-900`; taking the first layer with any alpha at
  // face value reported them as white-on-white at 1.00:1, which is the opposite
  // of what paints. Background IMAGES are still not sampled: a gradient or photo
  // returns null and the node is skipped, same as before.
  // Returns null when the nearest painted ancestor is a gradient or image: the
  // contrast is real but not computable this way, and guessing produced pure
  // false positives (white hero text scored 1.00 against the body's white).
  // The paint stack, not the ancestor chain. Property's image heroes tint with a
  // SIBLING `<div class="absolute inset-0 bg-slate-900/85">` over an `<Image fill>`,
  // which an ancestor walk never sees: it sailed past both and reported the body's
  // white, scoring slate-300-on-navy at 1.49 and slate-600-on-navy at 4.62 (i.e.
  // inverted, flagging the readable case and clearing the invisible one). Verified
  // against painted pixels on 33 routes, 2026-08-22, item 0.11.
  // Falls back to the ancestor walk when the element is outside the viewport, where
  // elementsFromPoint cannot answer.
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
    // Bottom-up composite. If the stack never reached an opaque layer, the page
    // ground is white.
    let out = layers.length && layers[layers.length - 1][3] >= 250 ? layers.pop().slice(0, 3) : [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i -= 1) {
      const [r, g, b, a] = layers[i];
      const k = a / 255;
      out = [r * k + out[0] * (1 - k), g * k + out[1] * (1 - k), b * k + out[2] * (1 - k)];
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

  const contrast = [];
  for (const el of document.querySelectorAll(
    "label, p, span, li, a, button, h1, h2, h3, h4, h5, h6, td, th, dt, dd",
  )) {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own) continue;
    // checkVisibility, not the element's own computed style: a descendant of a
    // `display:none` ancestor reports its OWN display (usually "block"), so the
    // old own-style test measured unrendered nodes against whatever happened to
    // sit under (0,0). Native, and it answers for the whole ancestor chain.
    if (!el.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true }))
      continue;
    const cs = getComputedStyle(el);
    const fg = rgb(cs.color);
    if (!fg || fg[3] < 8) continue; // fully transparent text is a different bug class
    const bg = bgOf(el);
    if (!bg) continue;
    const r = ratio(fg.slice(0, 3), bg);
    if (r < 3) {
      contrast.push(
        `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 40)}" ratio=${r.toFixed(2)} color=${cs.color}`,
      );
      if (contrast.length >= 12) break;
    }
  }

  // Coverage, not a finding. A `hidden sm:block` subtree renders at no width below
  // its breakpoint, so at 390px every assertion above simply never sees it. Record
  // the roots of every unrendered subtree that CONTAINS text, so the runner can say
  // which ones were never measured at ANY width in the run.
  const unrendered = [];
  for (const el of document.querySelectorAll("body *")) {
    if (getComputedStyle(el).display !== "none") continue;
    const n = el.querySelectorAll(
      "label, p, span, li, a, button, h1, h2, h3, h4, h5, h6, td, th, dt, dd",
    ).length;
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

  return { overflow, contrast, headings, unrendered, unparsed, height: doc.scrollHeight };
};

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-first-run", "--disable-gpu"],
});
if (SHOTS) await mkdir(path.resolve(SHOTS), { recursive: true });

// The site already carries pre-existing contrast findings (report 11 §2.7), so
// this gate is regression-based: only findings absent from the baseline fail.
const SAVE = args.includes("--save-baseline");
const BASELINE = path.resolve(flag("baseline", "tmp/design_migration/data/browser_baseline.json"));
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
const coverage = {}; // route -> label -> unrendered subtree roots

for (const width of WIDTHS) {
  const label = width < 768 ? "mobile" : "desktop";
  const page = await browser.newPage();
  await page.setViewport({ width, height: width < 768 ? 844 : 900, deviceScaleFactor: 1 });
  const noise = [];
  // Local-only noise, not defects: Vercel Speed Insights and GA both fail
  // against a local server by design. Everything else is reported.
  const IGNORE = /_vercel\/speed-insights|google-analytics\.com|googletagmanager\.com|region\d+\.google/;
  const add = (s) => !IGNORE.test(s) && noise.push(s);
  // Next.js mints a fresh `_rsc=` hash on every prefetch, so an unnormalised URL
  // can never match a baseline entry and every run reports it as new. Phase 5
  // diagnosed this and left it; it is one line and it is what makes the wider
  // route set readable.
  const stable = (u) => u.replace(/([?&]_rsc=)[^&]*/, "$1<hash>").slice(0, 120);
  // A resource-load console error reads "Failed to load resource: ... 404" with
  // NO url in the text, so IGNORE could never match it and the local-only
  // speed-insights 404 leaked in on 114 of 140 page-loads. The url is on
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
    // whole page (firing Next's viewport prefetch of every link, `/book` among
    // them) and then navigates away, which aborts them mid-flight. `/book`
    // returns 200 to a direct fetch and sweep.mjs independently asserts every
    // same-origin href resolves 200, so nothing is being hidden. A resource that
    // genuinely fails reports ERR_FAILED / ERR_CONNECTION_* and still lands here;
    // a 4xx/5xx is a response, not a failure, and arrives as a console error.
    if (why === "net::ERR_ABORTED") return;
    add(`requestfailed: ${stable(r.url())} ${why}`);
  });

  for (const route of TARGETS) {
    noise.length = 0;
    let status = 0;
    let probe = { overflow: [], contrast: [], headings: [], unrendered: [], unparsed: 0 };
    try {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 60000 });
      status = res?.status() ?? 0;
      // Scroll-triggered reveals: half the new design is IntersectionObserver
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
    const newNoise = [...new Set(noise)].filter((n) => !known.has(n));
    // 304 is a normal repeat load against `next start` with a warm browser cache.
    // Overflow is never baselined: the designer left the site at zero.
    const bad =
      ![200, 304].includes(status) || probe.overflow.length || newContrast.length || newNoise.length;
    if (bad) failures += 1;
    report.push({ route, label, status, ...probe, noise: [...new Set(noise)] });
    (coverage[route] ||= {})[label] = probe.unrendered || [];
    baseline[key] = SAVE ? [...probe.contrast, ...new Set(noise)] : baseline[key];
    console.log(`${bad ? "!" : " "} ${String(status).padEnd(3)} ${label.padEnd(7)} ${route}`);
    for (const o of probe.overflow) console.log(`      [overflow] ${o}`);
    for (const c of newContrast) console.log(`      [contrast] ${c}`);
    for (const n of newNoise) console.log(`      [noise]    ${n}`);
  }
  await page.close();
}
await browser.close();

const out = path.resolve(flag("out", "tmp/design_migration/data/browser_check.json"));
await writeFile(out, JSON.stringify(report, null, 2));
if (SAVE) {
  await writeFile(BASELINE, JSON.stringify(baseline, null, 2));
  console.log(`\nbaseline written: ${BASELINE}`);
  process.exit(0);
}
// Coverage report. A subtree unrendered at EVERY width in this run was asserted
// against by nothing at all, which is a hole in the gate rather than a finding on
// the page. Reported, never failed: the fix is to widen --widths, not to edit a page.
const blind = [];
for (const [route, byLabel] of Object.entries(coverage)) {
  const sets = Object.values(byLabel);
  if (sets.length < 1) continue;
  for (const root of sets[0]) if (sets.every((s) => s.includes(root))) blind.push(`${route}  ${root}`);
}
const unparsedTotal = report.reduce((n, r) => n + (r.unparsed || 0), 0);
console.log(
  `\n${report.length} page-loads, ${failures} with NEW problems. Detail (incl. heading computed styles): ${out}`,
);
console.log(
  `coverage: ${blind.length} subtree(s) unrendered at every width tested (${WIDTHS.join("/")}), so unchecked; ${unparsedTotal} unparseable colour(s)`,
);
for (const b of blind.slice(0, 20)) console.log(`      [unchecked] ${b}`);
process.exit(failures ? 1 : 0);
