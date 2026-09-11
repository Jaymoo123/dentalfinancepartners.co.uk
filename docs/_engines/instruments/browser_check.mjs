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
// Section grounds (DESIGN_SYSTEM section 9): consecutive bands must not share a ground and
// navy must never touch navy. Added 2026-09-11 because a port recorded a BLOCKING gate that
// said "re-run the section-grounds scan" when no committed instrument performed one: the
// scan behind both of its counts was a throwaway script, and the first count was wrong by 23
// routes because it parsed colours textually and oklch() defeated it. The browser resolves
// colour; a parser guesses. This mode only reports, and it is reported alongside the rest.
const GROUNDS = has("grounds");
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
    // DEFECT FIXED 2026-09-11: this fired at `sm < 24` while PRINTING "want >= 96px".
    // A target at 32px passed silently under a message claiming a 96px floor, and
    // every port read the output as though 96 were enforced. The contract says
    // scroll-mt-24, and 24 on the Tailwind scale is 96px, so the PRINTED rule was the
    // right one and the test was the typo: 24 was the class number, not a pixel count.
    // Enforce what is printed.
    const sm = parseFloat(getComputedStyle(t).scrollMarginTop) || 0;
    if (sm < 96) anchorGaps.push(`#${id} scroll-margin-top=${sm}px (want >= 96px / scroll-mt-24)`);
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

  // --- section grounds -------------------------------------------------------
  // Every opaque band in document order, then the footer, so the caller can see
  // both "two bands share a ground" and "the page tail runs into the footer".
  //
  // DEFECT FIXED 2026-09-11, the SAME class of bug this mode was written to
  // replace. The first version ran its own `c.match(/\d+(\.\d+)?/g)` over the
  // computed string and treated the captures as 0-255 sRGB channels. That is
  // right for rgb(23, 23, 23) and catastrophically wrong for oklch(): from
  // oklch(0.984 0.003 247.858), a near-WHITE stone, it captured 0.984, divided
  // by 255 and scored it DARK. EVERY oklch() ground classified dark, and
  // Tailwind v4 emits oklch() throughout this estate, so a raw run reported 81
  // dark-on-dark breaches where the truth is 29. Colour is never parsed here
  // now: it is PAINTED onto the 1x1 canvas above and read back, the same path
  // the contrast findings already use, which is exact for rgb/rgba/hex/named/
  // oklch/lab/color() and anything else the browser can parse, because the
  // browser does the conversion. `rgb()` also returns the resolved ALPHA, which
  // is how opacity is judged below.
  //
  // Second defect, same date: the selector was `:scope > section, :scope >
  // div[class*='bg-']`, so an <article> was invisible to it. A page whose tail
  // is <article class="bg-white"> reported only its navy hero as a band and was
  // scored on that; all 50 glossary term pages were false positives. Every
  // element that can be a full-width band is matched now. BOUNDING: direct
  // children of <main> ONLY, and a plain <div> still has to carry a `bg-` class.
  // The semantic tags are safe to take unconditionally because a direct child of
  // <main> that is a <section>/<article>/<aside>/<header>/<footer> IS a band by
  // construction. Trade-off: a band whose ground arrives by some route other
  // than a `bg-` utility on a direct-child <div> is still missed, which is the
  // conservative direction (a miss under-reports, it does not invent a breach),
  // and loosening the div rule would start counting inline wrappers as bands.
  //
  // Transparency, honestly: a band at alpha < 1 is not an opaque ground. The old
  // `opaque()` only string-matched the single literal rgba(0, 0, 0, 0), so any
  // other partially transparent ground, rgba(15, 23, 42, 0.5) included, sailed
  // through as solid. The painted alpha is checked instead, on the same >= 250
  // threshold the contrast paint stack uses.
  //
  // THIRD defect, 2026-09-11, found on Trade phase 5 and the same failure mode as
  // the first two: the mode could not SEE what it was asked to judge, and reported
  // zero. `:scope >` bound it to direct children of <main>, and Trade wraps its
  // three closing bands in a plain <div id="book">, so none of them was ever
  // examined. "adjacent bands sharing a ground: 0" was not a measurement.
  // NEW RULE, stated plainly: candidates are matched at ANY depth under <main>
  // (semantic band tags unconditionally, a plain <div> still only with a `bg-`
  // class), then filtered twice so wrappers and cards do not become "bands":
  //   1. it must span >= 90% of <main>'s width - a band is full-bleed by
  //      definition, a card or a column is not;
  //   2. any candidate that CONTAINS another candidate is dropped - so a wrapper
  //      like <div id="book"> yields its three real bands instead of itself, and
  //      no band is ever counted twice at two depths.
  // That keeps the conservative direction of the old rule (a ground arriving by
  // some route other than a bg- utility is still missed, which under-reports
  // rather than inventing a breach) while ending the fixed-depth blindness.
  const groundOf = (el) => {
    const p = rgb(getComputedStyle(el).backgroundColor);
    return p && p[3] >= 250 ? p : null;
  };
  const key = (p) => `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
  const BAND_SEL = "section, article, aside, header, footer, div[class*='bg-']";
  const bandEls = (root) => {
    if (!root) return [];
    const full = root.clientWidth * 0.9;
    const cand = Array.from(root.querySelectorAll(BAND_SEL)).filter(
      (el) => el.getBoundingClientRect().width >= full,
    );
    return cand.filter((el) => !cand.some((o) => o !== el && el.contains(o)));
  };

  // PERCEPTUAL ground comparison, 2026-09-11. Grounds were compared by STRING
  // EQUALITY, so rgb(250, 250, 247) and rgb(250, 250, 249) counted as two
  // different grounds. They differ by a lightness of about 0.001, no eye can
  // separate them, and on Trade they render as one continuous slab: the check
  // exists to catch exactly that and was structurally unable to. Distance is the
  // cheap "redmean" weighted sRGB metric (no dependency, no colour-space code),
  // whose ~2.3 units is the usual just-noticeable-difference figure. THRESHOLD 3:
  // marginally above that JND, and the estate's real grounds are nowhere near it -
  // white vs stone-50 rgb(250, 250, 249) measures 15.7, five times the threshold,
  // so genuinely distinct bands stay distinct while a 2.8-unit rounding difference
  // merges. Self-tested below on one pair that must merge and one that must not.
  const dist = (a, b) => {
    const rm = (a[0] + b[0]) / 2;
    const [dr, dg, db] = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db);
  };
  const SAME_GROUND = 3;
  const sameGround = (a, b) => dist(a, b) <= SAME_GROUND;

  const mainEl = document.querySelector("main");
  const bandPaints = bandEls(mainEl).map(groundOf).filter(Boolean);
  const bands = bandPaints.map(key);
  const footerEl = document.querySelector("footer");
  const footerPaint = footerEl ? groundOf(footerEl) : null;
  const footerGround = footerPaint ? key(footerPaint) : null;

  // A ground counts as dark if its REAL relative luminance is low, `lum()` above,
  // fed by the painted pixel. Threshold 0.18, unchanged in intent and value:
  // every dark ground in this estate sits an order of magnitude below it
  // (slate-900 #0f172a = 0.0088, #1e293b = 0.0218, neutral-900 #171717 = 0.0086)
  // and every light one sits five times above it (white = 1.0000, #fafaf9 =
  // stone-50 = 0.9553, #fafaf7 = 0.9541). The nearest ground to the line is
  // 0.158 away on the dark side and 0.775 away on the light side, so the exact
  // figure is not load-bearing; it only has to separate two clusters that are
  // already separated by a factor of 44.
  const isDarkPaint = (p) => !!p && lum(p.slice(0, 3)) < 0.18;
  const darkKeys = new Set();
  for (const p of bandPaints) if (isDarkPaint(p)) darkKeys.add(key(p));
  if (isDarkPaint(footerPaint)) darkKeys.add(footerGround);
  const isDark = (k) => darkKeys.has(k);

  // GROUNDS SELF-TEST. Same discipline as the contrast pairs: a classifier that
  // has not proved itself does not get to fail a phase. A known light and a known
  // dark value in BOTH rgb() and oklch() form, because oklch() is exactly what
  // broke the first version, and the oklch values are the real Tailwind v4
  // emissions for slate-900 and stone-50.
  const groundsSelfTest = (() => {
    const cases = [
      ["rgb(15, 23, 42)", true],
      ["rgb(255, 255, 255)", false],
      ["oklch(0.208 0.042 265.755)", true],
      ["oklch(0.985 0.001 106.423)", false],
    ];
    const measured = cases.map(([c, want]) => {
      const p = rgb(c);
      const got = isDarkPaint(p);
      return { value: c, want, got, luminance: p ? +lum(p.slice(0, 3)).toFixed(4) : null, pass: got === want };
    });
    // The perceptual comparison gets the same discipline: one pair that MUST merge
    // (the real Trade pair the string test split) and one that MUST stay apart
    // (white vs stone-50, the two grounds a real alternation is built from). A
    // threshold nobody checked is how this mode was wrong the first two times.
    const pairs = [
      ["rgb(250, 250, 247)", "rgb(250, 250, 249)", true],
      ["rgb(255, 255, 255)", "rgb(250, 250, 249)", false],
    ].map(([x, y, want]) => {
      const [a, b] = [rgb(x), rgb(y)];
      const d = a && b ? dist(a, b) : null;
      const got = !!(a && b) && sameGround(a, b);
      return { a: x, b: y, want, got, distance: d === null ? null : +d.toFixed(2), pass: got === want };
    });
    return {
      ok: measured.every((m) => m.pass) && pairs.every((p) => p.pass),
      measured,
      threshold: SAME_GROUND,
      pairs,
    };
  })();

  const adjacentSame = [];
  for (let i = 1; i < bandPaints.length; i++) {
    if (sameGround(bandPaints[i], bandPaints[i - 1]))
      adjacentSame.push({
        index: i,
        ground: bands[i],
        previous: bands[i - 1],
        distance: +dist(bandPaints[i], bandPaints[i - 1]).toFixed(2),
      });
  }
  const lastBand = bands.length ? bands[bands.length - 1] : null;
  const darkOnDark = !!(lastBand && footerGround && isDark(lastBand) && isDark(footerGround));

  const grounds = { bands, footerGround, lastBand, adjacentSame, darkOnDark, selfTest: groundsSelfTest };

  return { overflow, contrast, anchorGaps, headings, unrendered, unparsed, selfTest, grounds, height: doc.scrollHeight };
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
let groundsSelfTestResult = null;
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
      if (probe.grounds?.selfTest && !groundsSelfTestResult) groundsSelfTestResult = probe.grounds.selfTest;
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
    if (GROUNDS && probe.grounds) {
      const g = probe.grounds;
      if (g.darkOnDark)
        console.log(`      [grounds]  dark band touches dark footer: last=${g.lastBand} footer=${g.footerGround}`);
      for (const a of g.adjacentSame)
        console.log(
          `      [grounds]  bands ${a.index - 1} and ${a.index} share a ground: ${a.previous} / ${a.ground} (distance ${a.distance})`,
        );
    }
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

// ---------------------------------------------------------------------------
// Section grounds summary (only with --grounds). DESIGN_SYSTEM section 9:
// consecutive bands must not share a ground, and navy must never touch navy.
// Reported, never exit-code: a red run is a notification, and this mode exists
// to answer "has the breach closed yet", which is a question, not a defect.
if (GROUNDS) {
  // The classifier proves itself before it is allowed to fail a phase, exactly as
  // the contrast maths does above. Gated inside --grounds so a run without the
  // flag is byte-for-byte the run it always was.
  if (!groundsSelfTestResult || !groundsSelfTestResult.ok) {
    console.error(
      `
GROUNDS SELF-TEST FAILED: ${JSON.stringify(groundsSelfTestResult)}. ` +
        `Expected rgb(15, 23, 42) and oklch(0.208 0.042 265.755) dark, ` +
        `rgb(255, 255, 255) and oklch(0.985 0.001 106.423) light, ` +
        `rgb(250, 250, 247) vs rgb(250, 250, 249) the SAME ground and ` +
        `rgb(255, 255, 255) vs rgb(250, 250, 249) DIFFERENT grounds. ` +
        `Every grounds figure below would be noise; fix the instrument before reporting.`,
    );
    process.exit(2);
  }
  console.log(
    `
grounds self-test OK: ` +
      groundsSelfTestResult.measured.map((m) => `${m.value} lum=${m.luminance} ${m.got ? "dark" : "light"}`).join("; ") +
      `; same-ground threshold ${groundsSelfTestResult.threshold} -> ` +
      groundsSelfTestResult.pairs
        .map((p) => `${p.a} vs ${p.b} d=${p.distance} ${p.got ? "SAME" : "DIFFERENT"}`)
        .join("; "),
  );
  const byRoute = {};
  for (const r of report) {
    if (!r.grounds) continue;
    // One entry per route; widths do not change a ground.
    byRoute[r.route] ||= r.grounds;
  }
  const darkOnDark = Object.entries(byRoute).filter(([, g]) => g.darkOnDark).map(([r]) => r);
  const adjacent = Object.entries(byRoute).filter(([, g]) => g.adjacentSame.length).map(([r]) => r);
  const family = (r) => {
    const seg = r.split("/").filter(Boolean)[0];
    return seg ? "/" + seg : "/";
  };
  const tally = (list) => {
    const t = {};
    for (const r of list) t[family(r)] = (t[family(r)] || 0) + 1;
    return Object.entries(t).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", ");
  };
  console.log(`\nSECTION GROUNDS, ${Object.keys(byRoute).length} route(s) measured`);
  console.log(`  dark band touching the footer: ${darkOnDark.length}${darkOnDark.length ? "  [" + tally(darkOnDark) + "]" : ""}`);
  console.log(`  adjacent bands sharing a ground: ${adjacent.length}${adjacent.length ? "  [" + tally(adjacent) + "]" : ""}`);
  if (darkOnDark.length) {
    console.log(`  first 10: ${darkOnDark.slice(0, 10).join(" ")}`);
  }
}

process.exit(failures ? 1 : 0);
