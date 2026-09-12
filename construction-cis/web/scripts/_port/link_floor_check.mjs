/**
 * LINK FLOOR CHECK for the Trade (construction-cis) design port, phase 6 (T14).
 *
 * Why this exists as its own instrument. `docs/_engines/instruments/sweep.mjs`
 * already measures a link floor, but it measures nine other things with it and
 * fails as one unit, so a package that needs the answer to the single question
 * "did any route lose an internal link" has to run the whole sweep and read the
 * floor lines out of the middle of it. This is that question on its own, run
 * before and after each of the six phase-6 packages.
 *
 * THE METRIC IS sweep.mjs's, deliberately and character for character: the count
 * of UNIQUE same-site `<a href="/...">` targets in the served HTML, hash and
 * query stripped. A different metric would produce a different number against
 * the same page and the baseline would be meaningless. Anything that is not an
 * `<a>` is not a link here: `<link rel=...>` and stylesheet hrefs inflated an
 * earlier version of that regex and it was narrowed for that reason.
 *
 * EXCLUSIONS, BY NAME, never silently (PHASE6_PLAN section 11b):
 *   /book, /complete, /thank-you   robots index:false, absent from sitemap.ts,
 *                                  /thank-you additionally disallowed at
 *                                  robots.ts:88. Never crawled by the baseline,
 *                                  so they have NO floor. Do not invent one.
 *   /admin/*                       PHASE6_PLAN section 1h, exempt surface.
 * Every exclusion is printed in the run header, so a route that stops being
 * measured is visible rather than absent.
 *
 * ARGUMENTS ARE POSITIONAL, matching docs/_engines/instruments/cta_snapshot.mjs:
 *
 *   node scripts/_port/link_floor_check.mjs [BASE] [BASELINE] [OUT]
 *
 *   BASE      default http://localhost:3177
 *   BASELINE  default docs/construction-cis/_port/link_baseline.json
 *   OUT       optional. A JSON report is written here if given.
 *
 * Run against `next start`, never `next dev`: a dev server renders links a
 * production build does not, and the baseline was taken from a production build.
 *
 * WHY IT ASSERTS THE TITLE FIRST. Three times on this estate a port has measured
 * a SIBLING site because a dev server was already holding the port it was told
 * to use, and every number in the run was real, internally consistent and about
 * the wrong site. Nothing below is trusted until the served homepage title says
 * this is Trade.
 *
 * Exit codes: 0 clean, 1 one or more routes below floor (or a route errored),
 * 2 wrong site / unusable baseline.
 */
import { readFile, writeFile } from "node:fs/promises";

const BASE = (process.argv[2] || "http://localhost:3177").replace(/\/$/, "");
const BASELINE =
  process.argv[3] || "../../docs/construction-cis/_port/link_baseline.json";
const OUT = process.argv[4];
const EXPECT_TITLE = "CIS Accountants";

/** Excluded BY NAME. See the header: these have no floor, they are not "skipped". */
const EXCLUDED_ROUTES = new Set(["/book", "/complete", "/thank-you"]);
const EXCLUDED_PREFIXES = ["/admin/", "/admin"];
const isExcluded = (r) =>
  EXCLUDED_ROUTES.has(r) || EXCLUDED_PREFIXES.some((p) => r === p || r.startsWith(p));

const baseline = JSON.parse(await readFile(BASELINE, "utf8"));
const floors = baseline.links;
if (!floors || typeof floors !== "object" || !Object.keys(floors).length) {
  console.error(`UNUSABLE BASELINE ${BASELINE}: no "links" map`);
  process.exit(2);
}

// Assert we are measuring the right site before trusting anything.
let title = "";
try {
  const home = await (await fetch(BASE + "/")).text();
  title = (home.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].trim();
} catch (e) {
  console.error(`NO SERVER on ${BASE}: ${e.message || e}`);
  process.exit(2);
}
if (!title.includes(EXPECT_TITLE)) {
  console.error(`WRONG SITE on ${BASE}: title is "${title}", expected to contain "${EXPECT_TITLE}"`);
  process.exit(2);
}
console.log(`title asserted: "${title}"`);
console.log(`baseline: ${BASELINE} (sha ${baseline.sha}, ${Object.keys(floors).length} routes)`);

const excluded = Object.keys(floors).filter(isExcluded);
console.log(
  `excluded by name: ${excluded.length ? excluded.join(", ") : "none present in the baseline"}` +
    ` (plus any /admin/* route, which is exempt and unbaselined)`,
);

const targets = Object.keys(floors).filter((r) => !isExcluded(r));

/** sweep.mjs's metric, unchanged: unique same-site <a href> targets. */
function countLinks(html) {
  const links = [...html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/gi)].map(
    (m) => m[1].replace(/\/$/, "") || "/",
  );
  return new Set(links).size;
}

const results = {};
const queue = [...targets];
let scanned = 0;
async function worker() {
  while (queue.length) {
    const r = queue.shift();
    try {
      const res = await fetch(BASE + r);
      if (!res.ok) {
        results[r] = { error: `HTTP ${res.status}` };
      } else {
        results[r] = { count: countLinks(await res.text()), floor: floors[r] };
      }
    } catch (e) {
      results[r] = { error: String(e.message || e) };
    }
    if (++scanned % 50 === 0) console.log(`  ${scanned}/${targets.length}`);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

const errored = Object.entries(results).filter(([, v]) => v.error);
const breaches = Object.entries(results)
  .filter(([, v]) => !v.error && v.count < v.floor)
  .map(([r, v]) => ({ route: r, floor: v.floor, live: v.count, lost: v.floor - v.count }))
  .sort((a, b) => b.lost - a.lost);

const total = Object.values(results).reduce((a, v) => a + (v.count || 0), 0);
console.log(
  `\n${scanned} routes measured, ${total} unique internal links, ` +
    `${breaches.length} below floor, ${errored.length} errored`,
);

for (const b of breaches) {
  console.log(`  [FLOOR] ${b.route}: ${b.floor} -> ${b.live} (lost ${b.lost})`);
}
for (const [r, v] of errored.slice(0, 10)) console.log(`  [ERROR] ${r}: ${v.error}`);

if (OUT) {
  await writeFile(
    OUT,
    JSON.stringify(
      {
        ts: new Date().toISOString(),
        site: "construction-cis",
        base: BASE,
        served_title: title,
        baseline: BASELINE,
        baseline_sha: baseline.sha,
        excluded_by_name: excluded,
        measured: scanned,
        total_unique_internal_links: total,
        breaches,
        errors: Object.fromEntries(errored),
        per_route: results,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`\nwritten: ${OUT}`);
}

process.exit(breaches.length || errored.length ? 1 : 0);
