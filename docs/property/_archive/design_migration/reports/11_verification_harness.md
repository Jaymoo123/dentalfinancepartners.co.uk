# Report 11 - Verification harness for the Property redesign port

Written 2026-08-22. Everything marked **verified** was run on this machine today against
`Accounting/Property/web/` at `expansion/new-sites-2026-08` @ `d39b393a`, working tree clean
before and after. Inferences are labelled.

**This report is the verification contract.** Later agents cite section numbers from it.

---

## 0. The one-line summary

Almost everything needed already exists in the repo: `tsc`, `eslint`, `vitest`,
`scripts/check_dependency_closure.py`, `scripts/predeploy_gate.py` (which already wraps the
link audit, frontmatter lint, em-dash and brand checks) and
`scripts/property_health_sweep.mjs`. Two gaps were real and are now filled by two new local
scripts in `tmp/design_migration/scripts/`. Nothing in this harness emails, alerts, schedules
or deploys anything (§8).

The full per-phase gate costs **about 4 minutes** of wall clock, plus a 2.5 minute build when
the phase touched anything the build could break.

---

## 1. Measured baselines (verified, today)

Every number below was produced by running the command. These are the "pre-existing noise"
figures. A later agent's job is to keep them at these values or lower, never higher.

| # | Check | Command (from `Accounting/Property/web/` unless noted) | Time | Baseline today |
|---|---|---|---|---|
| 1 | Typecheck | `npx tsc --noEmit` | **1m31s** | **0 errors, no output** |
| 2 | Lint | `npx eslint .` | **1m02s** | **0 errors, 32 warnings** across 22 files (§1.1) |
| 3 | Unit tests | `npx vitest run` | **11s** | **49 files, 1484 tests, all pass** |
| 4 | Calculator goldens | `npx vitest run src/tests/calculator-goldens.test.ts` | 6s | **241 tests pass** |
| 5 | Production build | `npx next build` | **2m34s** | **exit 0**, 902 static pages, 0 errors |
| 6 | Dependency closure | `python scripts/check_dependency_closure.py --verbose` (repo root) | **2s** | **OK across 19 sites** |
| 7 | Pre-deploy gate | `python scripts/predeploy_gate.py --site property` (repo root) | **20s** | **PASS**, 0 hard failures, 48 pricing warnings (§1.2) |
| 8 | Route sweep (new) | `node tmp/design_migration/scripts/sweep.mjs` | **13s** | **98/98 URLs clean, 0/712 internal links dead** |
| 9 | Browser gate (new) | `node tmp/design_migration/scripts/browser_check.mjs` | **1m46s** | **28 page-loads, 0 new problems**; 0 horizontal overflow |

There is **no `typecheck` npm script**; `package.json` (`Property/web/package.json:5-12`) has
only `dev`, `build`, `start`, `lint`, `test`, `resources:xlsx`. Use `npx tsc --noEmit`.
`vitest` is a **root** devDependency (`Accounting/package.json:34-37`), not a Property one, so
it resolves through the workspace. Any script that imports `puppeteer-core` must live **inside
the repo tree** to resolve it; scripts written to the OS temp dir fail with
`ERR_MODULE_NOT_FOUND` (verified).

### 1.1 The 32 lint warnings, by file (verified)

0 errors. All 32 are `@typescript-eslint/no-unused-vars` or unused `eslint-disable`
directives, plus one `@next/next/no-img-element`.

```
1w scripts/resources/builders/landlord-essentials.ts   1w src/app/book/page.tsx
1w src/app/complete/page.tsx                           2w src/components/blog/BlogListWithSearch.tsx
1w src/components/blog/BlogPostRenderer.tsx  (<img>)   1w src/components/forms/BookingPicker.tsx
1w src/components/resources/CalculatorPageResources.tsx 1w src/lib/ai/anthropic.ts
1w src/lib/ai/qa-gate.ts                               1w src/lib/calculators/premium/tools/capital-gains.ts
1w src/lib/landlordTax.ts                              1w src/lib/leads/enquiry-message.ts
20w across 10 files in src/tests/
```

Note for the porters: `src/components/blog/BlogListWithSearch.tsx` (2w) and
`BlogPostRenderer.tsx` (1w `<img>`) are exactly the three warnings the designer recorded as
pre-existing at their session 11 close. They are the same warnings. Do not "fix" them as part
of the port; that is a separate, attributable change.

**Important divergence from the designer's baseline:** session 9 §0 tells the reader
`npx tsc --noEmit` has **325 pre-existing errors** and to grep for their own file. That is true
of `Property_zip` (it was built against stub shared modules), and **false here**. The monorepo
typechecks to **zero**. Any ported file that does not typecheck is a defect to fix, not noise
to filter. This is the single most valuable gate in the whole harness and later agents must not
inherit the designer's "grep for my file" habit.

### 1.2 Pre-deploy gate detail (verified)

```
[ok]   internal links: 0 HARD 404s
[ok]   frontmatter: all blog YAML valid
[ok]   em-dashes: none          <- blog .md corpus only, NOT tsx and NOT rendered HTML
[warn] service pricing: 48 match(es)
[ok]   brand (property): 'Property Tax Partners' / www.propertytaxpartners.co.uk wired
[ok]   brand (property): no cross-brand literals (47 deny-list terms)
[ok]   brand (property): no template placeholders in content
[ok]   QA verdicts: no known-bad live pages
RESULT: PASS (no HARD gate failures)
```

The 48 pricing warnings are pre-existing market-rate mentions in blog copy (estate agent fees,
fire-risk assessment costs). They are **not** a port concern; do not let them grow, do not
sweep them here.

`predeploy_gate.py:197-213` is the em-dash check. It reads `Property/web/content/blog/*.md`
**only**. It cannot see a `.tsx` string, a component, or rendered output, which is exactly
where a design port puts new copy. That gap is why §3.2 exists.

`predeploy_gate.py:128-143` shells out to `scripts/track2_link_audit.py`, which is the
authoritative blog-link auditor and understands `dynamicParams=false` (a correct slug under the
wrong category 404s). Reuse it; do not write a second one.

---

## 2. What already exists, and what it does and does not cover

| Existing asset | Covers | Does not cover |
|---|---|---|
| `npx tsc --noEmit` | designer components typed against the **real** `@accounting-network/web-shared` (CONTEXT §5 corollary) | anything runtime |
| `npx eslint .` | unused imports, `<img>`, hooks rules via `next/core-web-vitals` | style, copy, layout |
| `npx vitest run` (49 files) | calculators (241 goldens), lead pipeline, nurture, intent engine, call briefs, niche config | **zero React component rendering.** `vitest.config.ts:13-16` runs `environment: "node"` and only `src/**/*.test.ts` (no `.tsx`). There is no jsdom, no testing-library, no component test anywhere |
| `src/tests/qa-gate.test.ts` (962 lines) | the **AI nurture message** QA gate (`@/lib/ai/qa-gate`), 1 warning | nothing to do with design, pages or HTML. Do not mistake it for a design gate |
| `scripts/check_dependency_closure.py` | every site's imports resolve under the Vercel `npm ci --workspace` install | runtime, rendering |
| `scripts/predeploy_gate.py` | blog links, frontmatter YAML, blog em-dashes, pricing, brand contamination, QA verdict cache | `.tsx` copy, rendered HTML, layout, contrast, analytics attributes |
| `scripts/property_health_sweep.mjs` | 200 + complete doc + layout shell + title + canonical + JSON-LD validity, over the **live** sitemap | only works against production, because `sitemap.ts` emits absolute `siteConfig.url` URLs and the script filters `u.startsWith(base)` (`property_health_sweep.mjs:33`). Useless against localhost as written |
| `scripts/btn_contrast_probe.mjs`, `an01_browser_pass.mjs`, 10 more `*.mjs` probes | the house pattern for browser work: `puppeteer-core` + Edge at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` | one-off, single-purpose, none reusable as a gate |

### 2.1 On `Property_zip/web/scripts/shots.mjs` - port the ideas, not the file

**Verdict: do not port the file. Port four of its ideas into the new browser gate.**

It is a good script (211 lines, well commented) but it imports **playwright**, which is not
installed anywhere in this monorepo (verified: no `playwright` in `node_modules`). The repo's
browser dependency is `puppeteer-core` (root devDependency, `Accounting/package.json:35`) driven
against installed Edge. Adding playwright to satisfy one screenshot script fails the reuse rule
and adds a ~200MB browser download to the estate.

The four ideas worth keeping, and where they now live:

1. **Route discovery by walking `src/app` for `page.tsx`** - replaced by something better: our
   sitemap already enumerates every real URL including dynamic ones (`sitemap.ts` covers
   locations, calculators, blog hubs, 780 articles), so `sweep.mjs` reads that instead. The
   designer's walker deliberately skipped `[slug]` routes, which is most of our site.
2. **Scroll-the-whole-page-before-measuring**, with `scroll-behavior: auto` forced. This is a
   genuine trap and it is ported verbatim in reasoning into `browser_check.mjs`: half the new
   design is IntersectionObserver driven and an unscrolled page measures the pre-reveal state.
3. **Console errors / pageerror / requestfailed capture.** Ported. Nothing else in this repo
   watches those.
4. **Section-crop screenshots instead of a 25,000px strip.** Not ported (§3.9); it is a human
   review aid, not a gate.

Their `dismissWidget()` is not ported: the widget auto-opens **in dev**, and the gate here runs
against `next start` (production build), where it is once-per-session. If the widget turns out
to cover measurements, re-add it (`Property_zip/web/scripts/shots.mjs:63-70`).

---

## 3. The new checks, each judged on its own merits

Two new files, both in `tmp/design_migration/scripts/`, neither touching the repo proper:

- **`sweep.mjs`** - no dependencies, plain `fetch`. Route 200s, JSON-LD, title, canonical,
  layout shell, rendered-HTML dashes, `data-cta` counts, internal-link integrity. 13s.
- **`browser_check.mjs`** - `puppeteer-core` + Edge. Horizontal overflow, text/surface contrast,
  heading computed styles, console noise, optional screenshots. 1m46s.

Both use the same **regression-baseline** pattern: record the current state once
(`--save-baseline`), then fail only on things that got *worse*. That is the only design that
works here, because the site already carries pre-existing findings and a zero-gate would be red
from minute one and would therefore be ignored.

Baselines already recorded, from the production build served on `localhost:3002`:
`tmp/design_migration/data/sweep_baseline.json`, `tmp/design_migration/data/browser_baseline.json`.

### 3.1 Route 200 sweep across all core routes plus sampled articles - **WORTH IT**

**Verified result: 98 URLs (68 core + 30 of 780 articles sampled), 98/98 clean, 13 seconds.**

68 core URLs = 28 static paths + 5 locations + 21 calculators + 9 blog hubs + embeds. That is
the "~55 routes" of the brief, measured. Articles are sampled by a deterministic stride, never
randomly: a sample that changes between runs cannot be compared to a baseline.

It also asserts, per URL, everything `property_health_sweep.mjs` asserts (title, canonical,
JSON-LD parses, layout shell rendered, complete `</html>`), so §3.7 costs nothing extra.

```bash
cd Property/web && npx next build && npx next start -p 3002 &   # 2m34s + ~3s to boot
node tmp/design_migration/scripts/sweep.mjs                     # 13s
```

Run it against `next start`, not `next dev`: dev compiles each route on demand and the sweep
takes minutes instead of seconds, and dev-only warnings pollute the result.

### 3.2 Em-dash detector - **WORTH IT, over rendered HTML; source grep as a cheap pre-check**

Folded into `sweep.mjs` (one fetch, many assertions) rather than a second script.

**This check found a real, live defect on its first run.** Every single page on the site renders
one em-dash, from the brand wordmark's screen-reader label:

- `src/components/brand/BrandWordmarkHomeLink.tsx:35` - `<span className="sr-only"> - {siteConfig.tagline}</span>`
- `src/components/brand/BrandLogoHero.tsx:24` - same construction

It is invisible to sighted users and read aloud to screen-reader users. Measured total across
the 98 swept URLs: **103 em/en dashes**, i.e. one per page plus about five page-specific ones
(`/blog/portfolio-management` and `/calculators/lbtt-calculator-scotland` carry 3 each).

Source-level baseline (verified, `Property/web/src`): 224 lines containing `-` in `.ts`/`.tsx`,
of which **102 are outside `//`, `/*` and `*` comment lines** - and a sample of those 102 shows
both false positives (`{/* JSX comments */}`) and true user-facing copy
(`components/property/TestimonialSlider.tsx:8,32`, `ProblemSolutionSplit.tsx:28`). En-dashes:
48 lines. The source grep is therefore a **warning**, not a gate; the rendered check is the gate.

Cheap pre-check for a porter who has just edited a file, no server needed:

```bash
grep -n "-" Property/web/src/path/to/File.tsx | grep -vE ":\s*(//|\*|/\*|\{/\*)"
```

Gate behaviour: `sweep.mjs` fails if any route's rendered dash count **exceeds its baseline**.
Clearing the existing 103 is a separate, owner-visible workstream, not port scope.

### 3.3 Horizontal overflow at 390px - **WORTH IT**

**Verified: zero overflow findings today, at 390 and 1440, across 14 routes.** That is a clean
line in the sand, so this one is gated at **zero, never baselined**. The designer's sessions 10
and 11 both close on "zero horizontal overflow"; the monorepo independently matches. Any port
that introduces overflow fails loudly.

The check reports the offending nodes, not just the boolean: it walks `body *` and names up to
five elements whose bounding rect breaches the viewport, with tag, class prefix and right edge.

### 3.4 Heading computed-style check - **WORTH IT, and it confirms CONTEXT §6.2 empirically**

`browser_check.mjs` records `getComputedStyle` for the first six `h1..h3` per route into
`tmp/design_migration/data/browser_check.json`.

**Verified on the homepage today:**

| tag | font-size | font-weight | line-height | letter-spacing |
|---|---|---|---|---|
| h1 | 30px | 700 | 36px (= 1.2) | -0.6px (= -0.02em) |
| h2 | 24px | 700 | 28.8px (= 1.2) | -0.48px (= -0.02em) |
| h3 | 16px | 700 | 19.2px (= 1.2) | -0.32px (= -0.02em) |

Every heading, every size: weight exactly 700, line-height exactly 1.2x, letter-spacing exactly
-0.02em. That is the unlayered `globals.css` `h1..h6` rule winning site-wide, confirmed by
measurement rather than by reading the CSS. The designer's warning is correct and it applies to
the monorepo unchanged.

This makes the check load-bearing in **both** directions:
- while the override stands, a ported heading utility without `!` is a silent no-op;
- the moment someone moves that rule into `@layer base`, every one of these numbers changes at
  once, and this is the only thing in the repo that would notice.

It is recorded, not asserted. Diff the JSON across a phase and eyeball the changed rows. A
hardcoded expectation would be wrong the day the fix lands, which is the opposite of useful.

### 3.5 Form-label / text-on-same-surface contrast - **WORTH IT. It reproduced CONTEXT §6.1.**

Generalised as briefed: **any** text element whose colour is within 3:1 of its own effective
background, not just labels.

**Verified: the invisible-label bug is live in the monorepo today.** On
`/blog/section-24-and-tax-relief/can-section-24-push-higher-rate-tax`:

```
label "I am a..."                    ratio=1.00  color=oklch(0.208 0.042 265.755)
label "Full name"                    ratio=1.00  color=oklch(0.208 0.042 265.755)
label "Email"                        ratio=1.00  color=oklch(0.208 0.042 265.755)
label "Phone"                        ratio=1.00  color=oklch(0.208 0.042 265.755)
label "Your situation"               ratio=1.00  color=oklch(0.208 0.042 265.755)
label "What's prompted this now?"    ratio=1.00  color=oklch(0.208 0.042 265.755)
label "What do you want from the call?" ratio=1.00 color=oklch(0.208 0.042 265.755)
```

Ratio 1.00 means the text and its surface are the *same colour*. Seven labels, on the primary
conversion point of every blog article. This is CONTEXT §6.1, independently confirmed on our
side. **Recommend fixing it now, ahead of and independently of the port** - it is a live
revenue defect, the fix is one surface colour, and bundling it into the port destroys
attribution.

Two implementation notes that cost real time to get right, so later agents do not redo them:

1. **Colours must be resolved by painting, not by parsing.** Tailwind v4 emits `oklch()`, which
   `getComputedStyle` returns verbatim; the obvious `match(/[\d.]+/g)` gives `[0.208, 0.042,
   265.755]` and every contrast number is garbage. `canvas.fillStyle` does **not** normalise
   oklch either (verified). Painting one pixel and reading it back with `getImageData` is exact
   for every CSS colour syntax, and is what the script does.
2. **Known false-positive class, baselined not fixed:** hero sections paint their dark surface
   with a gradient or an absolutely-positioned overlay sibling, so an ancestor walk over
   `background-color` finds white and scores white hero text at 1.00. The walk bails out on any
   `background-image` ancestor, which removes most of them; the survivors (`/blog` h1,
   `/locations` h1) sit in the baseline as stable strings. Total baselined findings across 28
   page-loads: **106**. `ponytail:` upgrade path is a CDP pixel sample, if a real case ever
   turns on it.

### 3.6 `data-cta` presence - **WORTH IT, as a count regression**

47 source sites of `data-cta` in `Property/web/src` (verified grep). Rendered across the 98
swept URLs: **295 occurrences**, recorded per route in the sweep baseline. A phase that drops a
`data-cta` fails with the route and the delta. This is the cheapest possible protection for
analytics continuity through a port that rewrites nearly every CTA-bearing component. Report 07
owns what those events feed; this only guards the count.

### 3.7 JSON-LD presence and validity - **WORTH IT, already free**

36 source files emit `application/ld+json` (verified). Every swept URL has each block
`JSON.parse`d. This is `property_health_sweep.mjs:36-40, 62-71` logic reused verbatim, so it
costs nothing on top of §3.1. **Verified: 0 invalid blocks, 0 pages missing JSON-LD today.**

Deliberately not gated on **schema semantics** (correct `@type`, required properties). That
needs a validator, a schema corpus and a per-page expectation table, and the port does not
change what schema a page claims to be - it changes how the page looks.

### 3.8 Internal-link integrity - **WORTH IT, in two halves, both already paid for**

- **Blog corpus links:** `scripts/track2_link_audit.py`, already a HARD gate inside
  `predeploy_gate.py`. **Verified: 0 HARD 404s.** Do not rewrite it.
- **Rendered nav/hub/footer links:** `sweep.mjs` extracts every same-origin `href` from all 98
  swept pages, subtracts the ones already swept, and fetches the remainder.
  **Verified: 712 additional internal link targets, 0 dead.**

"No orphaned hub" is deliberately **not** automated. An orphan is a hub with no inbound link,
and asserting that needs a whole-site crawl plus a definition of which hubs must be reachable
from where. Cheaper and more honest: report 05 owns the blog hub inventory, and a porter
touching navigation states in their phase note which hubs they can reach from `/blog` in a
browser. Automate it only if a hub actually goes orphaned.

### 3.9 Visual regression via screenshots - **PARTIALLY WORTH IT. Automated pixel diff: NO.**

An automated before/after pixel diff over a **redesign** is a machine that outputs "100% of
pixels changed" on every route. That is not a signal, it is a bill.

What is worth it: `browser_check.mjs --shots=<dir>` writes full-page PNGs at both widths, as a
**human review artifact**, for a bounded set:

```bash
node tmp/design_migration/scripts/browser_check.mjs --shots=tmp/design_migration/shots/before
# ... phase ...
node tmp/design_migration/scripts/browser_check.mjs --shots=tmp/design_migration/shots/after-p3
```

Take them for the 8 forked core pages (CONTEXT §4), the homepage, `/services`, `/blog` and one
article, before the port starts and at each phase close. They are for the owner's final review
and for arguing about a specific page, not for a gate. Nothing fails on a screenshot.

### 3.10 Rejected outright

- **A React component test suite.** There is no jsdom, no testing-library and not one component
  test in 49 test files. Standing one up to guard a design port is a new framework for a
  one-off migration, and the browser gate already exercises the real render.
- **Lighthouse / Core Web Vitals per phase.** Real concern, wrong instrument mid-port: scores
  swing on network conditions and would produce argument, not defects. Do it once, at the end,
  against a preview deploy, if the owner asks.
- **Axe / full WCAG audit.** Bigger than this migration and it would flood the port with
  pre-existing findings. The one accessibility failure that actually matters here (invisible
  labels, §3.5) is caught by a 40-line probe.

---

## 4. The per-phase gate

Two tiers. Tier 1 is what you run constantly; Tier 2 is what makes a phase *done*.

### Tier 1 - every commit (about 75 seconds, no server, no build)

Run in this order, stop at the first failure:

```bash
cd Property/web
npx tsc --noEmit                                    # 1m31s  MUST be zero output
npx eslint <the files you touched>                  # ~5s    MUST be clean
npx vitest run                                      # 11s    MUST be 1484/1484
grep -n "-" <the files you touched> | grep -vE ":\s*(//|\*|/\*|\{/\*)"   # SHOULD be empty
```

Yes, `tsc` is the slow one. Run it anyway: it is the gate that catches the CONTEXT §5 corollary
(designer components authored against stub shared APIs), and it is zero-baseline so it never
needs interpretation.

### Tier 2 - before a phase is called done (about 4m30s, needs a build)

```bash
# 1. everything in Tier 1, full lint
cd Property/web && npx eslint .                     # 1m02s  0 errors, exactly 32 warnings

# 2. it must actually build
npx next build                                      # 2m34s  exit 0

# 3. deployability and corpus gates (repo root)
cd ../.. && python scripts/check_dependency_closure.py   # 2s   OK across 19 sites
python scripts/predeploy_gate.py --site property         # 20s  RESULT: PASS

# 4. serve the production build and sweep it
cd Property/web && npx next start -p 3002 &
cd ../.. && node tmp/design_migration/scripts/sweep.mjs  # 13s  98/98, 0 dead links, 0 regressions
node tmp/design_migration/scripts/browser_check.mjs      # 1m46s 0 NEW problems, 0 overflow

# 5. kill the server
```

**A phase is done when all nine numbered checks in §1 are at or better than their baseline, and
not before.** "Better" is allowed and welcome: fewer lint warnings, fewer dashes, fewer contrast
findings. Worse is a defect, and worse-by-design (a component intentionally removed, so its
`data-cta` count drops) is a line in the phase note plus a re-baseline, never a silent pass.

### Re-baselining, and the rule against it

`--save-baseline` on either script overwrites the recorded state. It is a **deliberate,
declared act**, not a way to make a red gate green. Rule: a re-baseline requires a line in the
phase's report saying which findings moved and why. If a later agent cannot explain a delta,
that delta is the bug.

### Which phases need which

| Phase kind | Tier 1 | Build | Dep closure | Pre-deploy gate | Sweep | Browser |
|---|---|---|---|---|---|---|
| Design tokens / `globals.css` | yes | yes | no | no | yes | **yes, mandatory** (§3.4) |
| New component, not yet used | yes | yes | **yes** (new imports) | no | no | no |
| Page ported to new design | yes | yes | yes | no | yes | yes |
| Blog subsystem | yes | yes | yes | **yes** (link audit) | yes | yes |
| Forms / lead capture | yes | yes | yes | no | yes | **yes** (§3.5) |
| `web-shared` touched (`Field.tsx`, CONTEXT §5) | yes | **all 19 sites** | **yes** | no | yes | yes |
| Anything at all, before the owner sees it | yes | yes | yes | yes | yes | yes |

---

## 5. Rollback, per phase

The whole harness is worthless without a cheap undo, and the undo here is git, not a script.

**Preconditions, set once before the port starts:**
1. Work on a dedicated branch off `expansion/new-sites-2026-08`. Never on `main`.
2. **One commit per phase, minimum.** A phase that lands as five commits is fine; a phase spread
   across a commit that also contains the next phase is not, because it cannot be reverted alone.
3. Tag each phase close: `git tag port-p3-done`. Cheap, local, and it makes §5 a one-liner.
4. Record the baselines (already done today) before the first port commit.

**Rollback procedure, any phase:**

```bash
git log --oneline port-p<N-1>-done..HEAD     # what this phase actually contains
git revert --no-commit port-p<N-1>-done..HEAD && git commit -m "revert: port phase N"
# or, if nothing after it depends on it and it is unpushed:
git reset --hard port-p<N-1>-done
```

Then re-run Tier 2 and confirm every number is back to baseline. **A rollback is not complete
until the gate is green again**; a revert that leaves `tsc` red means the phase was entangled
with the next one and the entanglement is the real problem.

**Per-phase specifics:**

| Phase | Blast radius | Extra rollback step |
|---|---|---|
| Design tokens / `globals.css` | site-wide, silent, every page | Re-run browser gate and diff the heading table (§3.4). A token revert that leaves headings changed means a second change rode along |
| New components (unused) | zero until imported | `git revert` only. Also revert any `package.json` dependency added, then `npm install`, then re-run dep closure |
| A ported page | that URL, its internal links, its `data-cta` | Re-run sweep: the route must return to its baseline `data-cta` count, not merely 200 |
| Blog subsystem | 780 articles, 9 hubs, middleware redirects | `predeploy_gate.py` must return to 0 HARD 404s. Middleware changes revert with the phase; check `src/middleware.ts` has no orphaned map entry left behind (CONTEXT §6.3) |
| Forms / lead capture | revenue | Revert, then re-run the browser gate and confirm the label contrast findings are back to baseline and no worse. If a lead flow was touched, `npx vitest run` covers the pipeline (49 files) |
| `web-shared` | **all 19 sites** | Revert, then `python scripts/check_dependency_closure.py`, then build at least Property and one other site. This is the only phase whose blast radius leaves Property |
| Anything already deployed | production | Out of scope for this harness: deploy is owner-triggered (§8) and rollback is a Vercel promotion of the previous deployment, done by the owner or on his explicit instruction |

---

## 6. Explicit rule: these gates are local, silent and manual

**None of the checks in this report may email, alert, notify, post, page, webhook, or run on a
schedule. None may be added to a cron, a GitHub Actions workflow, a Vercel build hook, a
`postinstall`, or a git hook. They are run by a human or by an agent in a turn, on a local
machine, and their only output is stdout and files under `tmp/design_migration/`.**

The reasons are in `standard_terms` §7 and CONTEXT §2.4, and they are not negotiable here:

- The owner decides what is allowed to interrupt him. Every monitor, digest and tripwire needs
  his yes, in advance, every time.
- A red CI run **is** a notification: it lands in his inbox. Adding these to CI would mail him
  every time a mid-port working tree is briefly inconsistent, which is most of the day.
- The scripts are in `tmp/design_migration/scripts/`, which is gitignored via `/tmp/`. They
  cannot be picked up by CI even by accident, and that is deliberate. **Do not "promote" them
  into `scripts/` to make them permanent.** If the harness proves worth keeping after the port,
  that is a proposal to put to the owner with its cost, not a thing to do quietly.
- `sweep.mjs` fires pure GETs with no JS execution, so it emits zero analytics events.
  `browser_check.mjs` does execute JS and therefore **would** fire GA against a real property;
  it is pointed at `localhost` only, and the GA requests are visibly blocked there (they show up
  as suppressed console noise, verified). **Never point `browser_check.mjs` at
  `www.propertytaxpartners.co.uk`** - it would pollute production analytics.

---

## 7. Reference: exact commands, copy-paste

```bash
# --- Tier 1, from Accounting/Property/web -------------------------------------
npx tsc --noEmit                                   # 1m31s   expect: no output
npx eslint .                                       # 1m02s   expect: 32 warnings, 0 errors
npx eslint src/components/foo/Bar.tsx              # ~5s     expect: clean
npx vitest run                                     # 11s     expect: 49 files, 1484 tests pass
npx vitest run src/tests/calculator-goldens.test.ts # 6s     expect: 241 pass

# --- Tier 2, from Accounting ---------------------------------------------------
python scripts/check_dependency_closure.py --verbose   # 2s   expect: OK across 19 sites
python scripts/predeploy_gate.py --site property       # 20s  expect: RESULT: PASS
(cd Property/web && npx next build)                    # 2m34s expect: exit 0, 902 pages

# serve the production build, then:
(cd Property/web && npx next start -p 3002 &)
node tmp/design_migration/scripts/sweep.mjs                 # 13s    expect: 98/98 clean
node tmp/design_migration/scripts/browser_check.mjs         # 1m46s  expect: 0 NEW problems

# baselines (deliberate act, see §4)
node tmp/design_migration/scripts/sweep.mjs --save-baseline
node tmp/design_migration/scripts/browser_check.mjs --save-baseline

# screenshots for human review (§3.9)
node tmp/design_migration/scripts/browser_check.mjs --shots=tmp/design_migration/shots/before

# ad-hoc: one route, mobile only
node tmp/design_migration/scripts/browser_check.mjs --widths=390 /section-24
node tmp/design_migration/scripts/sweep.mjs --sample=80        # deeper article sample
```

Artifacts produced: `tmp/design_migration/data/sweep_baseline.json`,
`tmp/design_migration/data/browser_baseline.json`,
`tmp/design_migration/data/browser_check.json` (per-run detail, includes the heading table).

---

## 8. Defects this harness found while being built (not port scope, but real)

Both were found by running the checks, not by reading code. Both are live in the monorepo today
and both were independently found by the designer first.

1. **Seven invisible form labels on every blog article** (§3.5). CONTEXT §6.1 confirmed on our
   side, measured at contrast ratio 1.00. Recommend fixing ahead of the port, as its own commit.
2. **A site-wide em-dash in the brand wordmark's screen-reader text** (§3.2),
   `BrandWordmarkHomeLink.tsx:35` and `BrandLogoHero.tsx:24`. One line each. It is user-facing
   copy under the house rule, it is just only audible.

Neither is a decision for a porter. They are one-line fixes that belong to the owner's list.
