/**
 * REFERENCE ROUTE SWEEP for the Property Standard rollout (appendix N).
 *
 * ONE committed implementation, reused by every port and every fidelity reviewer,
 * so two reviewers never build two different instruments and disagree about what
 * the site does. Derived from the Property port's tmp/design_migration/scripts/
 * sweep.mjs, which is gitignored and would not survive a machine change; the
 * scar tissue in its comments is preserved because each line of it was an
 * incident.
 *
 * STANDING RULES (docs/_engines/PROPERTY_STANDARD_ROLLOUT.md §4.5, trap 9):
 *   - NEVER scheduled, never wired to CI, never pointed at production.
 *     It reads a local `next start` only. A scheduled probe is a notification,
 *     and notifications need the owner's yes.
 *   - Run against `next start`, not `next dev` (dev gives false CSP reds).
 *   - Pass --out per run or concurrent runs clobber each other (this happened
 *     twice during the Property port).
 *
 * WHAT IT ASSERTS, per URL:
 *   - HTTP 200 (any 3xx is recorded with its target rather than silently followed)
 *   - complete document (</html>) and the site's layout shell rendered
 *   - non-empty <title> and a canonical link
 *   - every JSON-LD block parses
 *   - THE LINK FLOOR: count of unique same-site <a href> targets. Any DECREASE
 *     against the baseline is a blocker. This is the §4.1 rule "never delete a
 *     crawlable internal link for layout" made mechanical.
 *   - data-cta count vs baseline (analytics continuity, trap 6)
 *   - em/en dashes in rendered body text (house rule)
 *   - pipeline artefacts leaking into copy ("verify at build", "(HP12)" codes)
 *   - every same-origin href resolves to a URL that is itself 200
 *
 * USAGE:
 *   node docs/_engines/instruments/sweep.mjs --site=crypto --base=http://localhost:3000 --save-baseline
 *   node docs/_engines/instruments/sweep.mjs --site=crypto --base=http://localhost:3000 --out=tmp/sweep_phase3.json
 *
 * The baseline is captured BEFORE the first port commit, from the SHA currently
 * deployed to production (§4.5). Re-baselining requires a written reason in the
 * phase log.
 *
 * Exit 0 = clean / matches baseline. Exit 1 = a regression.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (n, d) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};
const has = (n) => args.includes(`--${n}`);

const SITE = flag("site", "");
if (!SITE) {
  console.error("--site=<key> is required (the repo directory name, e.g. crypto, Property, construction-cis)");
  process.exit(2);
}
const BASE = flag("base", "http://localhost:3000").replace(/\/$/, "");
const SAMPLE = Number(flag("sample", "30"));
// Blog article depth: /blog/<category>/<slug> is 3 segments on most sites.
// Medical is FLAT (/blog/<slug> = 2). Pass --article-depth=2 there.
const ARTICLE_DEPTH = Number(flag("article-depth", "3"));
const CONCURRENCY = Number(flag("concurrency", "8"));
const SAVE = has("save-baseline");
const STRICT_DASHES = has("strict-dashes");
const REPO = path.resolve(flag("repo", process.cwd()));
const BASELINE = path.resolve(flag("baseline", `docs/${SITE.toLowerCase()}/_port/sweep_baseline.json`));
const OUT = path.resolve(flag("out", `tmp/sweep_${SITE}_${Date.now()}.json`));
const UA = "rollout-sweep (local, read-only, never production)";

// Dashes that must never reach a reader. Body text only: JSON-LD and <script>
// payloads legitimately carry whatever the source data carries.
const DASH = /[—–]|&mdash;|&ndash;/g;
// Pipeline artefacts that leaked into published copy during the content waves.
const ARTEFACTS = [/verify at build/i, /\(HP\d+\)/, /\bTODO\b/, /\bLOREM IPSUM\b/i];

/** Resolve the site's display name so the layout-shell assertion is not hardcoded to Property. */
async function layoutMarkers() {
  const dirs = await readdir(REPO, { withFileTypes: true });
  const dir = dirs.find((d) => d.isDirectory() && d.name.toLowerCase() === SITE.toLowerCase())?.name;
  if (!dir) throw new Error(`no directory named '${SITE}' in ${REPO}`);
  const cfg = JSON.parse(await readFile(path.join(REPO, dir, "niche.config.json"), "utf8"));
  const name = cfg.display_name || cfg.legal_name;
  if (!name) throw new Error(`${dir}/niche.config.json has no display_name`);
  // Two markers, either satisfies: the brand name in the chrome, and the privacy
  // link every footer carries. A page that renders neither did not render a shell.
  return { dir, markers: [name, "/privacy-policy"] };
}

async function sitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status} - is the server up on ${BASE}?`);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1].trim()).pathname)
    .filter((p, i, a) => a.indexOf(p) === i);
  const isArticle = (p) => p.startsWith("/blog/") && p.split("/").filter(Boolean).length === ARTICLE_DEPTH;
  const core = paths.filter((p) => !isArticle(p));
  const articles = paths.filter(isArticle);
  // Deterministic spread, never random: a sample that changes between runs cannot
  // be compared to a baseline.
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

async function check(pathname, markers) {
  const fails = [];
  const url = BASE + pathname;
  let ctas = 0;
  let dashes = 0;
  let artefacts = [];
  let links = [];
  try {
    // manual redirect: a 3xx is RECORDED with its target, not silently followed,
    // because a route that started redirecting is a finding even when the target is 200.
    const head = await fetch(url, { headers: { "user-agent": UA }, redirect: "manual" });
    if (head.status >= 300 && head.status < 400) {
      fails.push(`HTTP ${head.status} -> ${head.headers.get("location") || "?"}`);
    }
    const res = head.status >= 300 && head.status < 400
      ? await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" })
      : head;
    const html = await res.text();
    if (res.status !== 200) fails.push(`HTTP ${res.status}`);
    if (!/<\/html>/i.test(html)) fails.push("incomplete document");
    if (!markers.some((m) => html.includes(m))) fails.push("layout shell missing");
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
    const text = bodyText(html);
    dashes = (text.match(DASH) || []).length;
    if (STRICT_DASHES && dashes) fails.push(`${dashes} em/en dash(es)`);
    artefacts = ARTEFACTS.filter((re) => re.test(text)).map((re) => String(re));
    if (artefacts.length) fails.push(`pipeline artefact: ${artefacts.join(", ")}`);
    ctas = (html.match(/data-cta=/g) || []).length;
    // <a href> only. The old version matched every href= attribute, which counted
    // <link rel=...> and stylesheet hrefs as crawlable links and inflated the floor.
    links = [...html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/gi)].map(
      (m) => m[1].replace(/\/$/, "") || "/",
    );
  } catch (err) {
    fails.push(`request error: ${err.message}`);
  }
  const uniq = [...new Set(links)];
  return { path: pathname, fails, ctas, dashes, artefacts, links: uniq, linkCount: uniq.length };
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

const { dir, markers } = await layoutMarkers();
const { core, sampled, totalArticles } = await sitemapUrls();
const targets = [...core, ...sampled];
console.log(
  `[${SITE} -> ${dir}] sweeping ${targets.length} URLs ` +
    `(${core.length} core + ${sampled.length}/${totalArticles} sampled articles) on ${BASE}`,
);

const results = await pool(targets, (p) => check(p, markers), CONCURRENCY);

// Internal-link integrity: any same-origin href that was not itself swept gets one
// GET. Cheap because the link set collapses hard.
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
  site: SITE,
  base: BASE,
  // §4.7: a baseline without its SHA and the command that derived it is invalid.
  sha: flag("sha", null),
  sha_deriving_command:
    flag("sha", null) &&
    "GET https://api.vercel.com/v9/projects -> targets.production.meta.gitCommitSha",
  links: Object.fromEntries(results.map((r) => [r.path, r.linkCount])),
  ctas: Object.fromEntries(results.map((r) => [r.path, r.ctas])),
  dashes: Object.fromEntries(results.map((r) => [r.path, r.dashes])),
  totalLinks: results.reduce((a, r) => a + r.linkCount, 0),
  totalCtas: results.reduce((a, r) => a + r.ctas, 0),
  totalDashes: results.reduce((a, r) => a + r.dashes, 0),
};

if (SAVE) {
  await mkdir(path.dirname(BASELINE), { recursive: true });
  if (!current.sha) {
    console.log(
      "WARNING: no --sha given. §4.7 requires the baseline to embed the production SHA " +
        "and its deriving command; a baseline without them is invalid for link-floor purposes.",
    );
  }
  await writeFile(BASELINE, JSON.stringify(current, null, 2));
  console.log(
    `baseline written: ${BASELINE} ` +
      `(${current.totalLinks} internal links, ${current.totalCtas} data-cta, ` +
      `${current.totalDashes} dashes across ${targets.length} URLs)`,
  );
  process.exit(0);
}

let linkProblems = [];
let ctaProblems = [];
let dashProblems = [];
try {
  const base = JSON.parse(await readFile(BASELINE, "utf8"));
  // THE LINK FLOOR. Any per-URL decrease is a blocker, not a warning.
  linkProblems = Object.entries(base.links || {})
    .filter(([p, n]) => current.links[p] !== undefined && current.links[p] < n)
    .map(([p, n]) => `${p}: internal links ${n} -> ${current.links[p]} (lost ${n - current.links[p]})`);
  ctaProblems = Object.entries(base.ctas || {})
    .filter(([p, n]) => current.ctas[p] !== undefined && current.ctas[p] < n)
    .map(([p, n]) => `${p}: data-cta ${n} -> ${current.ctas[p]} (lost ${n - current.ctas[p]})`);
  // Dashes are regression-gated by default rather than zero-gated: a live site
  // usually already renders a known set, and a wholesale sweep is its own
  // workstream. --strict-dashes makes it zero-tolerance for a new build.
  dashProblems = Object.entries(current.dashes)
    .filter(([p, n]) => base.dashes?.[p] !== undefined && n > base.dashes[p])
    .map(([p, n]) => `${p}: em/en dashes ${base.dashes[p]} -> ${n}`);
} catch {
  console.log("(no baseline recorded; run with --save-baseline before the first port commit)");
}

const failed = results.filter((r) => r.fails.length);
for (const r of failed) console.log(`  [FAIL] ${r.path} -> ${r.fails.join("; ")}`);
for (const d of deadLinks) console.log(`  [LINK] ${d.path} -> HTTP ${d.status}${d.err ? ` (${d.err})` : ""}`);
for (const l of linkProblems) console.log(`  [FLOOR] ${l}`);
for (const c of ctaProblems) console.log(`  [CTA ] ${c}`);
for (const d of dashProblems) console.log(`  [DASH] ${d}`);

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify({ ...current, results, deadLinks }, null, 2));

console.log(
  `\n${targets.length - failed.length}/${targets.length} URLs clean, ` +
    `${deadLinks.length}/${extra.length} internal links dead, ` +
    `${linkProblems.length} LINK-FLOOR breaches (${current.totalLinks} links total), ` +
    `${ctaProblems.length} data-cta regressions (${current.totalCtas} total), ` +
    `${dashProblems.length} dash regressions (${current.totalDashes} total)`,
);
console.log(`detail: ${OUT}`);
process.exit(
  failed.length || deadLinks.length || linkProblems.length || ctaProblems.length || dashProblems.length
    ? 1
    : 0,
);
