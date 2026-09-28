# P0D — instrument baseline, startups-tech

Captured 2026-09-29 against `http://localhost:3201` (next start, title
"Founder Tax Partners | Accountants for Funded and Scaling UK Startups",
asserted before every run). Production SHA `eeb3dbef` = `origin/main`. Local
HEAD (`2f829bcd`) is **77 commits ahead** of `eeb3dbef`, not 79 as the brief
stated — see false premises.

## Commands run and exit codes

1. `node docs/_engines/instruments/sweep.mjs --site=startups-tech --base=http://localhost:3201 --sha=eeb3dbef --article-depth=3 --save-baseline --out=<scratch>/sweep_out.json`
   Exit 0. First save-baseline pass wrote the baseline but its own `--out`
   detail file did not land (Git-Bash/MSYS path translation of the
   `/c/Users/...` scratch path collided with Node's `path.resolve`, see false
   premises); rerun without `--save-baseline` re-derived the same numbers into
   `<scratch>/sweep_out.json` for the detail read. Baseline content unaffected
   (baseline write and detail write are independent in the script and the
   baseline write succeeded both times with identical output).
2. `node docs/_engines/instruments/browser_check.mjs --site=startups-tech --base=http://localhost:3201 --save-baseline --shots=<scratch>/shots --grounds --out=<scratch>/browser_out.json`
   Ran once in the background per the original plan; it had not produced its
   `--out` file after several minutes, so it was re-run in the **foreground**
   with a 600000 ms timeout per the coordinator's correction. Exit 0. Self-test
   passed (`slate500OnWhite=4.76`, `slate400OnWhite=2.56`, matches the README's
   corrected figures).
3. `node docs/_engines/instruments/cta_snapshot.mjs --site=startups-tech --base=http://localhost:3201 --out=<scratch>/cta_out.json`
   Exit 0. **No `--save-baseline` flag exists on this instrument** (see false
   premises) — its only baseline mechanism is `--out`; the `--out` file was
   copied to `docs/startups-tech/_port/cta_baseline.json` to match the
   filename the brief specified.

## sweep.mjs — 66 URLs (36 core + 30/32 sampled articles)

Link floor per URL family (unique same-site `<a href>` count; min / median / max):

| family | n | min | median | max |
|---|---|---|---|---|
| `/` | 1 | 18 | 18 | 18 |
| `/about` | 1 | 0 | 0 | 0 |
| `/contact` | 1 | 0 | 0 | 0 |
| `/cookie-policy` | 1 | 1 | 1 | 1 |
| `/terms` | 1 | 1 | 1 | 1 |
| `/privacy-policy` | 1 | 2 | 2 | 2 |
| `/services` (7) | 7 | 2 | 3 | 7 |
| `/for` (6) | 6 | 2 | 2 | 5 |
| `/calculators` (5) | 5 | 3 | 3 | 4 |
| `/research` (6) | 6 | 4 | 5 | 6 |
| `/blog` (index) | 1 | 37 | 37 | 37 |
| `/blog/share-schemes-and-emi` | 11 | 8 | 10 | 13 |
| `/blog/research-and-development` | 8 | 8 | 10 | 13 |
| `/blog/seis-and-eis` | 7 | 7 | 9 | 13 |
| `/blog/saas-and-tech-finance` | 5 | 5 | 8 | 12 |
| `/blog/startup-compliance` | 4 | 4 | 10 | 12 |

**Five lowest-floor URLs**: `/about` (0), `/contact` (0), `/cookie-policy` (1),
`/terms` (1), `/services/rd-tax-claims` (2). `/about` and `/contact` at 0 is
expected for legal/contact-shaped pages with no body links, not a defect on
its own — flag for phase 1 parity check against Property's own `/about`.

**Non-200 / redirects**: none among the 66 crawled URLs.
**JSON-LD parse failures**: none (`fails` would carry "invalid JSON-LD"; zero found).
**Em/en dashes (body text)**: 0 across all 66 URLs, all families.
**Pipeline artefacts**: **1** — `/calculators/rd-relief-estimator` fails
`pipeline artefact: /\(HP\d+\)/` (an HP-code-shaped string, e.g. `(HP12)`,
present in rendered body copy).
**Same-origin hrefs that don't resolve**: **1** — `/blog/uk-startup-grants-landscape`
returns HTTP 404 (linked from elsewhere on the site; 1 of 7 sampled internal
link targets dead). Total internal links swept: 476, 0 link-floor regressions
(first capture, so nothing to regress against), 0 data-cta regressions, 0 dash
regressions.

## browser_check.mjs — widths 390/768/1024/1440, 38 distinct routes, `--grounds` on

Self-test: passed (contrast maths verified against the two known pairs).

**Horizontal overflow at 390**: **0** offenders, any width.

**Contrast failures below floor**: **200** individual node failures across
**24** (route, width) pairs, all on the six `/research*` routes (index +
5 index detail pages), all four widths — the failures are not
viewport-dependent. Two repeating patterns:
- Fine-print/percentage labels: `oklch(0.708 0 0)` on white, ratio **2.48–2.58**
  against a 4.5 floor (e.g. `/research/uk-tech-funding-reliefs-index`: 12 spans
  at ratio 2.58, one paragraph "Amounts rounded by HMRC..." at 2.48).
- A lead-capture form embedded on the research pages: labels "I am a...",
  "Message (optional)" at `oklch(0.205 0 0)` size 14px ratio **1.12** (floor
  4.5) — a near-invisible label-on-label collision, not just a shade-too-light
  issue — plus "Leave blank" at ratio 1.12 (floor 3), "Step 1 of 2 · About you"
  and "(optional)" at ratio 3.37 (floor 4.5, `oklch(0.556 0 0)`).
  Worst-affected: `/research/uk-tech-funding-reliefs-index` and
  `/research/rd-tax-relief-index` (12 failures each).

**Missing `scroll-margin-top`**: **32** anchor targets across 4 widths on 2
routes — `/research/startup-formation-survival-index#methodology` (1 anchor)
and `/blog/saas-and-tech-finance/founder-salary-vs-dividends-2026-27`
(`#ref-1`..`#ref-7`, 7 anchors) — all report `scroll-margin-top=0px`, want
`>= 96px` / `scroll-mt-24`.

**Homepage computed typography (1440 desktop)**: h1 60px/66px line-height,
weight 700, letter-spacing -1.5px; two h2s at 36px/40px (one -0.9px tracking,
one normal); h3 (service cards) at 16px/24px, weight 700, normal tracking. At
390 mobile: h1 drops to 36px/39.6px, h2s to 30px/36px, h3 unchanged at 16px/24px.

**Grounds** (`--grounds`, section-ground breaches): none reported — no
adjacent-same-ground pairs, no dark-on-dark, across all routes/widths.

**Console/page errors and failed requests**: **13** noise entries, two kinds:
- `pageerror: Minified React error #418` (hydration mismatch) on all three
  widths (390/768/1024/1440 minus one gap) for `/research/uk-tech-funding-reliefs-index`,
  `/research/rd-tax-relief-index`, `/research/uk-tech-formations-index` — 9 of
  the 13 entries, all on the same three research pages carrying the worst
  contrast failures above. Same feature (the embedded lead-capture widget) is
  the likely common cause.
- `navigation: Navigation timeout of 60000 ms exceeded` on `/blog` at 390 only
  — a single occurrence; not reproduced at any other width for `/blog`, so
  record but do not treat as a confirmed defect without a rerun (other agents
  were auditing this same local server concurrently, which can cause transient
  slowness under `next start`).

No `failedRequests` (network-level 4xx/5xx on subresources) were reported by
the instrument beyond the above.

## cta_snapshot.mjs

66 routes scanned, **0 `data-cta` attributes found**, 0 distinct triples,
`non_interactive_ctas: []`. This is a real finding, not an instrument miss:
`grep -r "data-cta" startups-tech/web/src` finds exactly two occurrences,
both on `/thank-you` (`data-cta="thankyou-return-article"`,
`data-cta-placement="thank_you"`), and `/thank-you` is not in the 66-URL
crawl set (not linked from nav or sitemap). **The site has no CTA
instrumentation anywhere in its crawlable surface, and no header at all**
(confirmed: no header CTAs exist to record pre-port values for). Phase 1's
header/drawer/footer CTAs will need `data-cta-goal`/`data-cta-placement`
values invented fresh, not ported from an existing pattern — the only
existing precedent on the site is the single `/thank-you` return-link, whose
placement value (`thank_you`) is not reusable for header/footer.

## Ranked findings

**Serious**
1. 200 contrast failures on all 6 `/research*` routes, all 4 widths — the
   embedded lead-capture form's labels are effectively invisible (ratio 1.12
   against floors of 3–4.5) and the percentage/fine-print spans sit at 2.48–2.58
   against a 4.5 floor. Live defect on the current build, not a porting
   artefact.
2. React hydration error (#418) firing on the same three `/research/*-index`
   pages at every width — a real client-side error on the live build.
3. Dead internal link: `/blog/uk-startup-grants-landscape` returns 404 from a
   same-site href elsewhere on the site.
4. Pipeline artefact `(HP\d+)`-shaped code left in rendered body copy on
   `/calculators/rd-relief-estimator`.
5. 32 anchor targets across 2 routes missing `scroll-margin-top` — jump-to
   links land under the sticky header.

**Minor**
6. Zero CTA instrumentation anywhere in the crawlable site and no header —
   phase 1 has no pre-port CTA values to port for header/drawer/footer and
   must originate them.
7. One `Navigation timeout` on `/blog` at 390 only, not reproduced elsewhere —
   record, do not treat as confirmed without a clean rerun.
8. `/about` and `/contact` at a 0-link floor (expected shape, flag for parity
   check only).

## False premises in this brief

1. The brief states local build is "79 commits ahead of production." Verified
   `git log --oneline eeb3dbef..HEAD | wc -l` = **77**, not 79.
2. The brief tells this agent to pass `--grounds` "if the flag exists" — it
   exists and was used; no issue, noted only because the brief hedged on it.
3. The brief's list of expected baseline filenames includes `cta_baseline.json`
   as something `--save-baseline` on `cta_snapshot.mjs` would write. **That
   flag does not exist on `cta_snapshot.mjs`** — it only accepts `--out`. The
   file was created by copying the `--out` result to that filename by hand;
   this is a manual step, not something the instrument does, and a future
   rerun must repeat the copy rather than expect `--save-baseline` to work.
4. Minor tooling snag, not a brief error: the first `sweep.mjs --out=<scratch
   path in /c/Users/... form>` run did not produce its detail file — Git Bash's
   MSYS path translation of a `/c/...` argument disagreed with Node's
   `path.resolve` on Windows in one of the two runs; using the same syntax a
   second time worked. Root cause not fully isolated; noted so the next agent
   doesn't assume the instrument itself is flaky.
