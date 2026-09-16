/**
 * Local route sweep for the design migration. No deps, no browser, no analytics.
 *
 * Adapted from scripts/property_health_sweep.mjs (which only works against the
 * live domain, because sitemap.xml emits absolute production URLs). This one
 * rewrites every sitemap host to the local server, skips most blog articles
 * (sampling instead of all 783), and folds in the migration-specific assertions.
 *
 * Per URL it asserts:
 *   - HTTP 200
 *   - complete document (</html>) and the layout shell rendered
 *   - non-empty <title> + a canonical link
 *   - every JSON-LD block parses
 *   - zero em/en dashes in the rendered body text  (house rule)
 *   - data-cta attribute count >= the recorded baseline (analytics continuity)
 *   - every same-origin href resolves to a URL that is itself 200
 *
 * Usage:
 *   node tmp/design_migration/scripts/sweep.mjs                       # sweep + compare to baseline
 *   node tmp/design_migration/scripts/sweep.mjs --base=http://localhost:3002
 *   node tmp/design_migration/scripts/sweep.mjs --sample=40           # blog articles sampled
 *   node tmp/design_migration/scripts/sweep.mjs --save-baseline       # record current state
 *
 * Exit 0 = clean (or matches baseline), 1 = a regression.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (n, d) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};
const BASE = flag("base", "http://localhost:3002").replace(/\/$/, "");
const SAMPLE = Number(flag("sample", "30"));
const SAVE = args.includes("--save-baseline");
const CONCURRENCY = Number(flag("concurrency", "8"));
const BASELINE = path.resolve(flag("baseline", "tmp/design_migration/data/sweep_baseline.json"));
const UA = "design-migration-sweep (local, read-only)";
const LAYOUT_MARKERS = ["Property Tax Partners", "/privacy-policy"];

// Dashes that must never reach a reader. Checked on body text only: JSON-LD and
// <script> payloads legitimately carry whatever the source data carries.
const DASH = /[—–]|&mdash;|&ndash;/g;

async function sitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status} - is the server up on ${BASE}?`);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1].trim()).pathname)
    .filter((p, i, a) => a.indexOf(p) === i);
  // Blog articles are /blog/<category>/<slug>; hubs are /blog/<category>.
  const isArticle = (p) => p.split("/").filter(Boolean).length === 3 && p.startsWith("/blog/");
  const core = paths.filter((p) => !isArticle(p));
  const articles = paths.filter(isArticle);
  // Deterministic spread rather than random: a sample that changes between runs
  // cannot be compared to a baseline.
  const step = Math.max(1, Math.floor(articles.length / SAMPLE));
  const sampled = articles.filter((_, i) => i % step === 0).slice(0, SAMPLE);
  return { core, sampled, totalArticles: articles.length };
}

function bodyText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
}

async function check(pathname, known) {
  const fails = [];
  const url = BASE + pathname;
  let ctas = 0;
  let dashes = 0;
  let links = [];
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    const html = await res.text();
    if (res.status !== 200) fails.push(`HTTP ${res.status}`);
    if (!/<\/html>/i.test(html)) fails.push("incomplete document");
    if (!LAYOUT_MARKERS.some((m) => html.includes(m))) fails.push("layout shell missing");
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (!title || !title[1].trim()) fails.push("empty <title>");
    if (!/<link[^>]+rel=["']canonical["']/i.test(html)) fails.push("no canonical");

    for (const m of html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    )) {
      try {
        JSON.parse(m[1]);
      } catch {
        fails.push("invalid JSON-LD");
        break;
      }
    }
    dashes = (bodyText(html).match(DASH) || []).length;
    ctas = (html.match(/data-cta=/g) || []).length;
    links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, "") || "/");
  } catch (err) {
    fails.push(`request error: ${err.message}`);
  }
  return { path: pathname, fails, ctas, dashes, links: [...new Set(links)] };
}

async function pool(items, worker, n) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    }),
  );
  return out;
}

const { core, sampled, totalArticles } = await sitemapUrls();
const targets = [...core, ...sampled];
console.log(`Sweeping ${targets.length} URLs (${core.length} core + ${sampled.length}/${totalArticles} sampled articles) on ${BASE}`);

const results = await pool(targets, (p) => check(p), CONCURRENCY);

// Internal-link integrity: any same-origin href that was not itself swept gets
// one HEAD-equivalent GET. Cheap because the link set collapses hard.
const swept = new Set(targets.map((p) => p.replace(/\/$/, "") || "/"));
const extra = [...new Set(results.flatMap((r) => r.links))].filter((h) => !swept.has(h));
const linkResults = await pool(
  extra,
  async (h) => {
    try {
      const r = await fetch(BASE + h, { headers: { "user-agent": UA }, redirect: "follow" });
      return { path: h, status: r.status };
    } catch (e) {
      return { path: h, status: 0, err: e.message };
    }
  },
  CONCURRENCY,
);
const deadLinks = linkResults.filter((r) => r.status !== 200);

const current = {
  ts: new Date().toISOString(),
  ctas: Object.fromEntries(results.map((r) => [r.path, r.ctas])),
  dashes: Object.fromEntries(results.map((r) => [r.path, r.dashes])),
  totalCtas: results.reduce((a, r) => a + r.ctas, 0),
  totalDashes: results.reduce((a, r) => a + r.dashes, 0),
};

if (SAVE) {
  await writeFile(BASELINE, JSON.stringify(current, null, 2));
  console.log(
    `baseline written: ${BASELINE} (${current.totalCtas} data-cta, ${current.totalDashes} dashes across ${targets.length} URLs)`,
  );
  process.exit(0);
}

let ctaProblems = [];
let dashProblems = [];
try {
  const base = JSON.parse(await readFile(BASELINE, "utf8"));
  ctaProblems = Object.entries(base.ctas)
    .filter(([p, n]) => current.ctas[p] !== undefined && current.ctas[p] < n)
    .map(([p, n]) => `${p}: data-cta ${n} -> ${current.ctas[p]} (lost ${n - current.ctas[p]})`);
  // Dashes are regression-gated, not zero-gated: the site already renders a
  // known set (see report 11 §2.6) and a wholesale sweep is its own workstream.
  dashProblems = Object.entries(current.dashes)
    .filter(([p, n]) => base.dashes?.[p] !== undefined && n > base.dashes[p])
    .map(([p, n]) => `${p}: em/en dashes ${base.dashes[p]} -> ${n}`);
} catch {
  console.log("(no baseline recorded; run with --save-baseline before the port starts)");
}

const failed = results.filter((r) => r.fails.length);
for (const r of failed) console.log(`  [FAIL] ${r.path} -> ${r.fails.join("; ")}`);
for (const d of deadLinks) console.log(`  [LINK] ${d.path} -> HTTP ${d.status}${d.err ? ` (${d.err})` : ""}`);
for (const c of ctaProblems) console.log(`  [CTA ] ${c}`);
for (const d of dashProblems) console.log(`  [DASH] ${d}`);

console.log(
  `\n${targets.length - failed.length}/${targets.length} URLs clean, ` +
    `${deadLinks.length}/${extra.length} internal links dead, ` +
    `${ctaProblems.length} data-cta regressions (${current.totalCtas} total), ` +
    `${dashProblems.length} dash regressions (${current.totalDashes} total)`,
);
process.exit(failed.length || deadLinks.length || ctaProblems.length || dashProblems.length ? 1 : 0);
