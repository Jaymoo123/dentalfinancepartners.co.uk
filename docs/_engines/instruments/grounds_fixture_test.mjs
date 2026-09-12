/**
 * FIXTURE TEST for `browser_check.mjs --grounds`.
 *
 * WHY THIS FILE EXISTS. The grounds mode was repaired three times in one day and
 * each repair introduced the next defect. Commit 4431cf4d put it plainly: three
 * repairs of one function is evidence the function needed a test, not a fourth
 * fix. browser_check.mjs carries an in-page self-test, but it proves the mode
 * against a fixture it builds inside its own probe, in the same file, edited by
 * whoever is editing the logic. This runs the SHIPPED instrument, as a child
 * process, end to end, over pages it does not control, and reads the answer back
 * out of the --out JSON, which is the artefact every port actually consumes.
 *
 * It needs NO site and NO site build: it starts its own http server on a free
 * port, serves six hand-written pages, and stops it again. It does need
 * puppeteer-core and the installed Edge, which is what the instrument needs.
 *
 * RUN:  node docs/_engines/instruments/grounds_fixture_test.mjs
 * Exit 0 = every case correct. Exit 1 = the grounds logic has regressed.
 *
 * Each case is one of the defects this mode has actually shipped. If you change
 * bandEls, sameGround, SAME_GROUND or groundOf, this file is the thing that has
 * to stay green, and flipping any of those back turns it red (proven by doing
 * exactly that: see the commit message).
 */
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

// A band needs a real ground and a real width, nothing else. No stylesheet, so
// nothing here depends on a site's Tailwind build: every colour is literal, which
// is the whole point of a fixture.
const page = (body, footer = "#ffffff") =>
  `<!doctype html><html><head><meta charset="utf-8"><title>fixture</title>
<style>body{margin:0}main>*,main *{box-sizing:border-box}section,div,article{min-height:40px}</style>
</head><body><main>${body}</main><footer style="background:${footer};min-height:40px"></footer></body></html>`;

const CASES = {
  // DEFECT 1 (f5313a68): compared by STRING EQUALITY, so a 2/255 delta on one
  // channel read as a change of ground. These two render as one slab and the
  // check exists to catch exactly that, so it must REPORT them as sharing.
  "/near-identical": {
    html: page(
      '<section style="background:rgb(250,250,249)"></section>' +
        '<section style="background:rgb(250,250,247)"></section>',
    ),
    want: { bands: 2, adjacentSame: 1, darkOnDark: false },
  },
  // DEFECT 2 (f5313a68): the walker was `main > section`, so Trade's three closing
  // bands inside `<div id="book" class="scroll-mt-24">` were never measured and the
  // mode reported 0 over them. The wrapper carries no ground of its own.
  "/wrapped-in-div": {
    html: page(
      '<section style="background:#ffffff"></section>' +
        '<div id="book" class="scroll-mt-24">' +
        '<section style="background:#0f172a"></section>' +
        '<section style="background:#fafaf9"></section>' +
        "</div>",
    ),
    want: { bands: 3, adjacentSame: 0, darkOnDark: false },
  },
  // DEFECT 5 (this change): a TRANSPARENT full-width wrapper whose ground lives on
  // a full-width child. Outermost-wins picked the wrapper, groundOf returned null,
  // and the real band was dropped - so the two white bands either side of it became
  // adjacent to each other and neither count was computed over the real page.
  "/transparent-wrapper": {
    html: page(
      '<section style="background:#ffffff"></section>' +
        '<section style="background:transparent">' +
        '<div class="bg-stone-50" style="width:100%;background:#fafaf9"></div>' +
        "</section>" +
        '<section style="background:#ffffff"></section>',
    ),
    want: { bands: 3, adjacentSame: 0, darkOnDark: false },
  },
  // The genuine breach the mode is FOR: a dark band running into a dark footer.
  "/dark-on-dark": {
    html: page('<section style="background:#ffffff"></section><section style="background:#0f172a"></section>', "#0f172a"),
    want: { bands: 2, adjacentSame: 0, darkOnDark: true },
  },
  // DEFECT 4 (4431cf4d): the inverted containment filter dropped the OUTER band in
  // favour of its full-width descendants, and below 1440 most inner elements are
  // full width, so it INVENTED white-on-white runs at distance 0 on seven routes.
  // The shape that catches it must be TWO full-width grounded children stacked
  // inside ONE band - a card list at 390 - because a single child of the same
  // colour reproduces the parent's sequence exactly and reads as correct. That is
  // how this fixture first passed under the inverted rule; it is the same "the
  // check could not see what it was asked to judge" mistake in the test itself.
  // A healthy light/dark/light alternation must report nothing at any width.
  "/genuine-oscillation": {
    html: page(
      '<section style="background:#ffffff">' +
        '<div class="bg-white" style="width:100%;background:#ffffff"></div>' +
        '<div class="bg-white" style="width:100%;background:#ffffff"></div>' +
        "</section>" +
        '<section style="background:#0f172a"><div class="bg-slate-900" style="width:100%;background:#0f172a"></div></section>' +
        '<section style="background:#ffffff"></section>',
    ),
    want: { bands: 3, adjacentSame: 0, darkOnDark: false },
  },
  // Nothing to say about a single band, at any width.
  "/single-band": {
    html: page('<section style="background:#ffffff"></section>'),
    want: { bands: 1, adjacentSame: 0, darkOnDark: false },
  },
};

const server = createServer((req, res) => {
  const hit = CASES[req.url.replace(/\?.*$/, "")];
  res.writeHead(hit ? 200 : 404, { "content-type": "text/html; charset=utf-8" });
  res.end(hit ? hit.html : "not found");
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const out = path.join(tmpdir(), `grounds_fixture_${process.pid}.json`);
const instrument = path.join(import.meta.dirname, "browser_check.mjs");
// Two widths deliberately. The fourth defect was width-dependent and accidentally
// CORRECT at 1440; a single-width test would have passed straight through it.
const child = spawn(
  process.execPath,
  [instrument, "--site=fixture", `--base=${base}`, "--grounds", "--widths=390,1440", `--out=${out}`, `--baseline=${out}.nobaseline`, ...Object.keys(CASES)],
  { stdio: ["ignore", "pipe", "pipe"] },
);
let log = "";
child.stdout.on("data", (d) => (log += d));
child.stderr.on("data", (d) => (log += d));
const code = await new Promise((r) => child.on("close", r));
server.close();

// Exit 2 is the instrument refusing to report because its OWN self-test failed.
// That is a pass for the refusal and a fail for the logic, and the reason to keep
// it separate is that a refusal produces no figures to compare at all.
if (code === 2) {
  console.error(log);
  console.error("FAIL: the instrument refused to report (self-test failed). Nothing below was measured.");
  process.exit(1);
}
// Exit 1 just means "new problems vs a baseline", and there is no fixture
// baseline, so it is expected and carries no information here.

const detail = JSON.parse(await readFile(out, "utf8"));
await rm(out, { force: true });

let bad = 0;
for (const [route, { want }] of Object.entries(CASES)) {
  for (const row of detail.report.filter((r) => r.route === route)) {
    const g = row.grounds;
    const got = { bands: g.bands.length, adjacentSame: g.adjacentSame.length, darkOnDark: g.darkOnDark };
    const ok = Object.keys(want).every((k) => got[k] === want[k]);
    if (!ok) bad += 1;
    console.log(
      `${ok ? "ok  " : "FAIL"} ${String(row.width).padEnd(5)} ${route.padEnd(22)} ` +
        `bands=${got.bands} adjacentSame=${got.adjacentSame} darkOnDark=${got.darkOnDark}` +
        (ok ? "" : `   WANT bands=${want.bands} adjacentSame=${want.adjacentSame} darkOnDark=${want.darkOnDark}`) +
        `   [${g.bands.join(" | ")}]`,
    );
  }
}
// A silent pass over zero rows is the exact failure this whole mode is about.
const expected = Object.keys(CASES).length * 2;
const seen = detail.report.filter((r) => r.grounds).length;
if (seen !== expected) {
  console.error(`FAIL: expected ${expected} measured page-loads, got ${seen}. The run did not happen.`);
  process.exit(1);
}
console.log(`\n${seen} page-loads, ${bad} wrong.`);
process.exit(bad ? 1 : 0);
