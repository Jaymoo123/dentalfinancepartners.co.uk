/**
 * PRE-PORT CTA TRIPLE SNAPSHOT for the Trade (construction-cis) design port.
 *
 * Why this exists: sweep_baseline.json records the COUNT of data-cta attributes
 * per route, which is enough to catch a CTA disappearing but NOT enough to catch
 * trap 22 -- adopting kit chrome silently flips data-cta-goal (contact -> form)
 * and data-cta-placement (header_mobile -> mobile_menu) for the SAME button and
 * the SAME destination. The count is identical before and after, so the count
 * proves nothing. What splits the live funnel is the triple.
 *
 * So: record the full (id, placement, goal, href) set per route from the
 * pre-port production build, and diff it after every phase that touches chrome
 * or CTAs.
 *
 * Also records data-cta-id, the misspelling on StickyCTA that the estate's
 * autoCapture does not match, so its disposition can be verified either way.
 *
 * Run against `next start`, never `next dev`, and assert the served title first.
 */
import { readFile, writeFile } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:3177";
const BASELINE = process.argv[3];
const OUT = process.argv[4];
const EXPECT_TITLE = "CIS Accountants";

const routes = Object.keys(JSON.parse(await readFile(BASELINE, "utf8")).links);

// Assert we are measuring the right site before trusting anything (field notes s5).
const home = await (await fetch(BASE + "/")).text();
const title = (home.match(/<title>([^<]*)<\/title>/) || [, ""])[1];
if (!title.includes(EXPECT_TITLE)) {
  console.error(`WRONG SITE on ${BASE}: title is "${title}", expected to contain "${EXPECT_TITLE}"`);
  process.exit(2);
}
console.log(`title asserted: "${title}"`);

// One <a>/<button> tag can carry the triple in any attribute order, so capture
// the whole tag and pick the attributes out of it rather than assuming order.
const TAG = /<(?:a|button)\b[^>]*\bdata-cta(?:-id)?=[^>]*>/gi;
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : null;
};

const perRoute = {};
const triples = new Map(); // canonical id|placement|goal -> {routes, href samples}
let scanned = 0;

const queue = [...routes];
async function worker() {
  while (queue.length) {
    const r = queue.shift();
    let html;
    try {
      const res = await fetch(BASE + r);
      if (!res.ok) { perRoute[r] = { error: `HTTP ${res.status}` }; continue; }
      html = await res.text();
    } catch (e) {
      perRoute[r] = { error: String(e.message || e) };
      continue;
    }
    const found = [];
    for (const tag of html.match(TAG) || []) {
      const rec = {
        id: attr(tag, "data-cta") ?? attr(tag, "data-cta-id"),
        attrName: attr(tag, "data-cta") !== null ? "data-cta" : "data-cta-id",
        placement: attr(tag, "data-cta-placement"),
        goal: attr(tag, "data-cta-goal"),
        href: attr(tag, "href"),
      };
      found.push(rec);
      const key = `${rec.id}|${rec.placement}|${rec.goal}|${rec.attrName}`;
      if (!triples.has(key)) triples.set(key, { count: 0, routes: [], hrefs: new Set() });
      const t = triples.get(key);
      t.count++;
      if (t.routes.length < 5) t.routes.push(r);
      if (rec.href) t.hrefs.add(rec.href);
    }
    // stable order so a diff is readable
    found.sort((a, b) => `${a.id}${a.placement}${a.goal}`.localeCompare(`${b.id}${b.placement}${b.goal}`));
    perRoute[r] = { count: found.length, ctas: found };
    if (++scanned % 50 === 0) console.log(`  ${scanned}/${routes.length}`);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

const out = {
  ts: new Date().toISOString(),
  site: "construction-cis",
  base: BASE,
  sha: JSON.parse(await readFile(BASELINE, "utf8")).sha,
  served_title: title,
  purpose:
    "Pre-port data-cta TRIPLE snapshot. sweep_baseline.json records counts; a count cannot " +
    "detect trap 22, where the same button keeps its count but flips its goal or placement on " +
    "cutover and splits the live funnel. Diff this file after every phase touching chrome or CTAs.",
  routes: routes.length,
  scanned,
  distinct_triples: Object.fromEntries(
    [...triples.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([k, v]) => [k, { count: v.count, example_routes: v.routes, hrefs: [...v.hrefs].slice(0, 4) }]),
  ),
  per_route: perRoute,
};
await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");

console.log(`\nwritten: ${OUT}`);
console.log(`${scanned} routes, ${[...triples.values()].reduce((a, t) => a + t.count, 0)} cta tags, ${triples.size} distinct triples\n`);
console.log("id | placement | goal | attr -> count");
for (const [k, v] of [...triples.entries()].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  ${k} -> ${v.count}`);
}
const errs = Object.entries(perRoute).filter(([, v]) => v.error);
if (errs.length) {
  console.log(`\n${errs.length} route(s) errored:`);
  errs.slice(0, 10).forEach(([r, v]) => console.log(`  ${r}: ${v.error}`));
}
