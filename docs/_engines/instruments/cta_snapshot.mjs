/**
 * PRE-PORT CTA TRIPLE SNAPSHOT. Site-agnostic: pass --site=<repo dir name>.
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
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

// GENERALISED 2026-09-25 (ecommerce port, phase 0). This file was hardcoded to
// construction-cis -- positional args, EXPECT_TITLE "CIS Accountants" and a literal
// site key in its own output -- while the README and the playbook both document it
// as `--site=<key>`. Every gate that named it on another site could not run, and a
// gate whose command does not run is a FAILED gate. Flags now match sweep.mjs and
// browser_check.mjs; the positional form still works so older recipes do not break.
const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : dflt;
};
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "../../..");
const positional = args.filter((a) => !a.startsWith("--"));

const SITE = flag("site", "");
if (!SITE) {
  console.error("usage: node cta_snapshot.mjs --site=<key> [--base=URL] [--baseline=PATH] [--out=PATH]");
  process.exit(2);
}
const BASE = flag("base", positional[0] || "http://localhost:3000");
const BASELINE = flag("baseline", positional[1] || `docs/${SITE.toLowerCase()}/_port/sweep_baseline.json`);
const OUT = flag("out", positional[2] || `tmp/cta_${SITE}_${Date.now()}.json`);

const routes = Object.keys(JSON.parse(await readFile(BASELINE, "utf8")).links);

// Assert we are measuring the right site before trusting anything (field notes s5).
// Identity comes from the site's own niche.config.json, exactly as sweep.mjs resolves
// it, because a served <title> is page copy and differs from the brand on most sites.
const dirs = await readdir(REPO, { withFileTypes: true });
const siteDir = dirs.find((d) => d.isDirectory() && d.name.toLowerCase() === SITE.toLowerCase())?.name;
if (!siteDir) {
  console.error(`no directory named '${SITE}' in ${REPO}`);
  process.exit(2);
}
const cfg = JSON.parse(await readFile(path.join(REPO, siteDir, "niche.config.json"), "utf8"));
const EXPECT = cfg.display_name || cfg.legal_name;
if (!EXPECT) {
  console.error(`${siteDir}/niche.config.json has no display_name`);
  process.exit(2);
}
const home = await (await fetch(BASE + "/")).text();
const title = (home.match(/<title>([^<]*)<\/title>/) || [, ""])[1];
if (!home.includes(EXPECT)) {
  console.error(`WRONG SITE on ${BASE}: title is "${title}", expected the page to carry "${EXPECT}"`);
  process.exit(2);
}
console.log(`identity asserted on ${BASE}: "${EXPECT}" present, title "${title}"`);

// One tag can carry the triple in any attribute order, so capture the whole tag
// and pick the attributes out of it rather than assuming order.
//
// DEFECT FIXED 2026-09-12 (Trade phase 5 re-review, G3). This was
// `/<(?:a|button)\b.../`, anchors and buttons only, so a `data-cta` on a <div>
// was INVISIBLE to the estate's trap-22 instrument. Live on Trade: sweep counted
// 816 data-cta attributes, this file counted 814, and the two missing ones were
// `cis_refund_book_panel` and `gps_book_panel` on wrapper <div>s. Someone could
// have flipped either one's goal or placement and the T22 diff would have shown
// nothing. Any element can carry the attribute now, and the element's tag name is
// recorded so the diff can see a move between element types too.
const TAG = /<([a-z][a-z0-9-]*)\b[^>]*\bdata-cta(?:-id)?=[^>]*>/gi;
// A div-level data-cta is USUALLY ITSELF A DEFECT, not just a reporting gap, which
// is why these are listed separately at the end of the run rather than folded in
// silently. autoCapture resolves every click through `closest("[data-cta]")` and
// returns, so a wrapper div around a form claims the click of every field inside
// it: on Trade that was 11 form controls plus 3 pre-existing links per route, all
// emitting `cta_click` for the panel. The panel then reads as the best-converting
// surface on the site by construction, and the three links' previous events are
// silently SUBSTITUTED rather than added to. Panel-level attribution belongs on
// the submit <button>, which is what every other id in this estate is.
const INTERACTIVE = new Set(["a", "button"]);
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : null;
};

const perRoute = {};
const triples = new Map(); // canonical id|placement|goal -> {routes, href samples}
const nonInteractive = []; // data-cta on something that is not <a>/<button>; see the note on TAG
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
      const el = tag.slice(1).match(/^[a-z0-9-]+/i)[0].toLowerCase();
      const rec = {
        tag: el,
        id: attr(tag, "data-cta") ?? attr(tag, "data-cta-id"),
        attrName: attr(tag, "data-cta") !== null ? "data-cta" : "data-cta-id",
        placement: attr(tag, "data-cta-placement"),
        goal: attr(tag, "data-cta-goal"),
        href: attr(tag, "href"),
      };
      found.push(rec);
      if (!INTERACTIVE.has(el)) nonInteractive.push({ route: r, tag: el, id: rec.id, placement: rec.placement, goal: rec.goal });
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
  site: SITE,
  base: BASE,
  sha: JSON.parse(await readFile(BASELINE, "utf8")).sha,
  served_title: title,
  purpose:
    "Pre-port data-cta TRIPLE snapshot. sweep_baseline.json records counts; a count cannot " +
    "detect trap 22, where the same button keeps its count but flips its goal or placement on " +
    "cutover and splits the live funnel. Diff this file after every phase touching chrome or CTAs.",
  routes: routes.length,
  scanned,
  // Reported, not hidden. See the note above INTERACTIVE: a data-cta on a wrapper
  // element is usually a real analytics defect, not merely an unusual placement.
  non_interactive_ctas: nonInteractive,
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
if (nonInteractive.length) {
  const ids = [...new Set(nonInteractive.map((n) => `${n.tag} ${n.id}`))];
  console.log(
    `
${nonInteractive.length} data-cta on a NON-INTERACTIVE element, ${ids.length} distinct: ${ids.join(", ")}`,
  );
  console.log(
    "  These are usually a defect in themselves, not just an unusual placement. autoCapture resolves",
  );
  console.log(
    "  every click through closest(\"[data-cta]\"), so a wrapper around a form claims the click of every",
  );
  console.log(
    "  field inside it and SUBSTITUTES the events of any link inside it. Put the id on the submit button.",
  );
  nonInteractive.slice(0, 10).forEach((n) => console.log(`  ${n.route}: <${n.tag}> ${n.id} | ${n.placement} | ${n.goal}`));
}

const errs = Object.entries(perRoute).filter(([, v]) => v.error);
if (errs.length) {
  console.log(`\n${errs.length} route(s) errored:`);
  errs.slice(0, 10).forEach(([r, v]) => console.log(`  ${r}: ${v.error}`));
}
