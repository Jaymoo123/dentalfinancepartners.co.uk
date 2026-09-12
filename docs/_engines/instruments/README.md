# Verification instruments (Property Standard rollout, appendix N)

The ONE committed reference implementation of the two port instruments, built
2026-08-25 in rollout session 1. Every port and every appendix M fidelity
reviewer uses these, so two reviewers never build two different instruments and
then disagree about what the site does.

Spec: `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` appendix N. Gates that consume
them: §4.5.

## Standing rules (non-negotiable)

- **Never scheduled. Never wired to CI. Never pointed at production.** A
  scheduled probe is a notification, and notifications need the owner's yes
  first (standard terms §7, rollout trap 9). These read a local server only.
- **Run against `next start`, never `next dev`.** The dev server produces false
  CSP errors that read as defects.
- **Pass `--out` per run** or two concurrent runs clobber each other. This
  happened twice during the Property port.
- **Build in an isolated worktree** if any other dev server may be running. A
  foreign `next dev` clobbered a phase build mid-measurement on Property.
- These live in `docs/_engines/` on purpose. The Property port's own instruments
  were written to gitignored `tmp/`, which is why they nearly did not survive and
  why the rollout doc exists at all.

## Before you start: the preflight

```bash
python scripts/port_preflight.py --site <key>     # add --skip-slow to omit the fixture test
```

Run this first, every port session. It fails on the four things that sank the
first five ports: a stray `next start` on 3000-3999 that would make an
instrument crawl the wrong site, a STATE.md pickup block that contradicts the
`port-<site>-phase*` tags, an uncommitted file under `docs/*/_port/`, and a
failing `grounds_fixture_test.mjs`. Manual gate only. Never scheduled, never in
CI, never pointed at production.

## Usage

Both take `--site=<key>`, where the key is the repo directory name
(`crypto`, `Property`, `construction-cis`, `Medical`, ...). The site's
`niche.config.json` supplies the display name used for the layout-shell
assertion, so nothing is hardcoded to Property.

```bash
# 0. serve the site locally
npm run build --workspace=crypto/web && npm run start --workspace=crypto/web   # port 3000

# 1. capture the baseline BEFORE the first port commit, at the production SHA
node docs/_engines/instruments/sweep.mjs --site=crypto --base=http://localhost:3000 \
     --sha=435cc12e --save-baseline
node docs/_engines/instruments/browser_check.mjs --site=crypto --base=http://localhost:3000 \
     --save-baseline

# 2. run per phase thereafter
node docs/_engines/instruments/sweep.mjs --site=crypto --base=http://localhost:3000 \
     --out=tmp/sweep_crypto_phase3.json
node docs/_engines/instruments/browser_check.mjs --site=crypto --base=http://localhost:3000 \
     --out=tmp/bc_crypto_phase3.json
```

Baselines default to `docs/<site>/_port/`, which is the rollout's programme
artifact home (§3). They are small text files and they are meant to be committed.

### Flags worth knowing

| Flag | Both | Meaning |
|---|---|---|
| `--site=<key>` | yes | required; repo directory name |
| `--base=<url>` | yes | local server, default `http://localhost:3000` |
| `--out=<path>` | yes | per-run detail JSON; always pass it |
| `--save-baseline` | yes | record current state instead of comparing |
| `--article-depth=N` | yes | blog article path depth. Default 3 (`/blog/<cat>/<slug>`). **Medical is FLAT: pass 2.** |
| `--sha=<sha>` | sweep | production SHA to embed in the baseline (§4.7 requires it) |
| `--strict-dashes` | sweep | fail on ANY em/en dash rather than on a regression |
| `--widths=390,768,1024,1440` | browser | the §0.8 review widths; this is the default |
| `--shots=<dir>` | browser | full-page screenshots per route per width |

## What each one asserts

**`sweep.mjs`** (no browser, no dependencies) per URL: HTTP 200 with any 3xx
recorded and its target named; complete document and layout shell; non-empty
`<title>` and a canonical; every JSON-LD block parses; **the link floor** (count
of unique same-site `<a href>` targets, any per-URL decrease is a blocker);
`data-cta` count vs baseline; em/en dashes in body text; pipeline artefacts
(`verify at build`, `(HP12)` codes, stray TODOs); and that every same-origin href
resolves 200.

**`browser_check.mjs`** (puppeteer-core + the installed Edge; playwright is
deliberately not a dependency) per route per width: horizontal overflow with the
offending nodes named, zero tolerance at 390; contrast of every text node against
its **painted** background, floor 4.5:1 for small and fine-print text and 3:1
otherwise; `scroll-margin-top` on every element addressed by an in-page anchor;
computed heading typography for h1-h3 (the unlayered `line-height` rule beats
every Tailwind utility and only `getComputedStyle` sees it, trap 1); and console
errors, page errors and failed requests. With `--grounds` it also reports the
section-ground breaches of DESIGN_SYSTEM section 9.

**`cta_snapshot.mjs`** records the full `(id, placement, goal, href)` set per
route so trap 22 (a button keeping its count while its goal or placement flips)
is visible. **It now reads `data-cta` off ANY element, not just `<a>` and
`<button>`.** It was anchors and buttons only until 2026-09-12, which on Trade
meant two live wrapper-`<div>` ids were invisible to the estate's trap-22
instrument: sweep counted 816 attributes, this file counted 814.

**A `data-cta` on a non-interactive element is usually a defect in itself**, so
the run lists them separately and the JSON carries them as
`non_interactive_ctas`. `autoCapture` resolves every click through
`closest("[data-cta]")` and then returns, so a wrapper `<div>` around a form
claims the click of every field inside it (11 form controls per route on Trade)
and SUBSTITUTES the existing events of any link inside it. The panel then reads
as the best-converting surface on the site by construction. Panel-level
attribution belongs on the submit `<button>`.

## The grounds fixture test, and why it exists

```bash
node docs/_engines/instruments/grounds_fixture_test.mjs
```

That is the whole command. **No site, no site build and no server of your own**:
it starts its own http server on a free port, serves six hand-written pages,
runs the shipped `browser_check.mjs --grounds` against them as a child process
at 390 and 1440, reads the answers out of the `--out` JSON and stops the server.
It needs what the instrument needs, puppeteer-core and the installed Edge, and
nothing else. Exit 0 = every case correct, exit 1 = the grounds logic has
regressed.

**Run it after any edit to `bandEls`, `groundOf`, `sameGround` or
`SAME_GROUND`.** The `--grounds` mode was repaired three times in one day and
each repair introduced the next defect, because every repair was verified
against a live site whose correct answer nobody independently knew. The six
cases are the defects that actually shipped:

| Case | The defect it pins |
|---|---|
| `/near-identical` | two grounds 2/255 apart on one channel must read as ONE ground. String equality scored `rgb(250,250,249)` vs `rgb(250,250,247)` (luminance delta 0.0012, redmean distance 2.84) as a legitimate change of band |
| `/wrapped-in-div` | a band inside `<div id="book" class="scroll-mt-24">` must be measured. The walker was `main > section` and reported 0 over three bands it never looked at |
| `/transparent-wrapper` | a transparent full-width wrapper must not swallow the grounded child that is the real band |
| `/dark-on-dark` | a genuinely dark band running into a dark footer must still be reported |
| `/genuine-oscillation` | a healthy light/dark/light alternation, each band holding full-width inner cards, must report NOTHING. The inverted containment filter replaced bands with their children and invented white-on-white runs below 1440 |
| `/single-band` | a one-band page says nothing |

Both layers were proven to bite by mutation, not asserted: flipping the
comparison back to string equality, the walker back to `main > section`, the
containment filter back to `el.contains(o)`, or removing the grounded-candidate
guard each turns the run red.

`browser_check.mjs` also keeps its own in-page discovery self-test on a fixture
it builds inside the probe, at two widths, and refuses to report any grounds
figure if it fails. The two are deliberately separate: the in-page one is edited
by whoever is editing the logic, this one is not.

## The self-test, and the spec bug it caught

`browser_check.mjs` verifies its own contrast maths on every launch against two
known pairs and **exits 2 without reporting** if it fails. An instrument that has
not proved itself does not get to fail a phase. This matters because the Property
port's contrast checker was materially wrong three times, always on the same two
operations: alpha compositing, and colour parsing of Tailwind v4's `oklch()`.

Appendix N specified the pairs as slate-500 on white = 4.76 and slate-400 on
white = **2.51**. The first is right. **The second was wrong**, and the self-test
caught it on the day this file was written:

```
slate-500  #64748b  on white = 4.7588   <- matches the spec
slate-400  #94a3b8  on white = 2.5640   <- spec said 2.51
gray-400   #9ca3af  on white = 2.5388
zinc-400   #a1a1aa  on white = 2.5629
```

Confirmed two independent ways that agree to four decimals: the instrument's
canvas path in real Edge, and a standalone Python recompute of WCAG relative
luminance. No Tailwind 400-step neutral yields 2.51. Appendix N was corrected to
2.56 the same session.

The trap this illustrates is the one worth keeping: had the instrument been
"fixed" until it matched the doc, every contrast finding in the whole programme
would have been quietly skewed. Ratio is
`(L1 + 0.05) / (L2 + 0.05)` on WCAG relative luminance; when instrument and doc
disagree, recompute by hand and correct whichever is wrong.
