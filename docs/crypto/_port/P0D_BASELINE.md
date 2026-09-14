# P0-D: crypto pre-port baseline, captured with the committed instruments

Date 2026-09-14. Package P0-D of the crypto design port, phase 0.
Instruments: `docs/_engines/instruments/{sweep,browser_check,cta_snapshot}.mjs`, unmodified.
Nothing outside `docs/crypto/_port/` was written. No git write, no build, no server started.

## 0. Identity assertions before any number was trusted

```
$ curl -s http://localhost:3171/ | grep -o '<title>[^<]*</title>'
<title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>

$ git rev-parse --short origin/main
7b5c0ce8
$ git rev-parse --short HEAD
e25412d7
```

Server identity: correct. Brief's production SHA `7b5c0ce8`: correct as
`origin/main`. **But see D0 below: it is not the SHA the served bytes were built
from, and for crypto the difference is material.**

## 1. Route inventory

Derived, never typed.

```
$ curl -s http://localhost:3171/sitemap.xml | grep -c '<loc>'
51
```

| slice | count | note |
|---|---|---|
| sitemap total | 51 | |
| blog articles `/blog/<cat>/<slug>` (depth 3) | 19 | matches 19 `.md` files in `crypto/web/content/blog/` exactly |
| blog category indexes | 6 | |
| core pages | 26 | `/`, `/about`, `/blog`, `/contact`, `/services` + 5, `/for` + 6, `/calculators` + 4, `/research/crypto-tax-gap-index`, `/privacy-policy`, `/cookie-policy`, `/terms` |

Cross-check against `find crypto/web/src/app -name page.tsx` (24 page files,
dynamic segments expanding to the above). Route families present on disk but
**absent from the sitemap**, and my disposition:

| family | in sitemap | included in this baseline | why |
|---|---|---|---|
| `/admin/*` (5) | no | **excluded** | auth-gated console, `Disallow: /admin` in robots.txt, `noTrackPrefixes={["/admin"]}`. Not a marketing surface; a design port does not touch it. |
| `/embed/[slug]` | no | **excluded** | iframe fragment for calculator embedding. Verified 200, 22,110 bytes. *Observation D6: it inherits the root-layout `SiteFooter`, so an embedded iframe ships the whole site footer.* |
| `/book`, `/complete`, `/thank-you` | no | **excluded from the instrument baselines, measured separately** | funnel pages. `/thank-you` is `Disallow:`-ed. All three were fetched for the CTA and dash capture (section 4/5) because `/thank-you` carries the site's only authored `data-cta`. |

So: **51 routes measured by both instruments; 54 fetched for the CTA/dash
capture; 5 admin routes and 1 embed family deliberately unmeasured.**

## 2. `sweep.mjs` -- the link floor

```
$ node docs/_engines/instruments/sweep.mjs --site=crypto --base=http://localhost:3171 \
    --sample=9999 --sha=7b5c0ce8 --save-baseline \
    --baseline=docs/crypto/_port/link_baseline.json --out=docs/crypto/_port/p0d_sweep_run.json
[crypto -> crypto] sweeping 51 URLs (32 core + 19/19 sampled articles) on http://localhost:3171
baseline written: ...\docs\crypto\_port\link_baseline.json (608 internal links, 0 data-cta, 0 dashes across 51 URLs)
```

`--sample=9999` was passed deliberately: sweep's `--sample` default is 30 and
crypto has 19 articles, so 30 would in fact have covered the whole corpus here
anyway. **19/19 articles measured. This is the whole corpus, not a sample.**

Metric: *unique same-site `<a href>` targets per URL.* Total 608 across 51 routes.

| unique internal links | routes |
|---|---|
| 8 | 10 |
| 9 | 11 |
| 10 | 5 |
| 11 | 3 |
| 12 | 7 |
| 13 | 5 |
| 14 | 2 |
| 15 | 3 |
| 16 | 1 |
| 18 | 1 |
| 24 | 1 (`/`) |
| 33 | 2 (`/blog`, `/blog/crypto-cgt-and-disposals/how-crypto-is-taxed-uk`) |

**The floor of 8 is exactly the footer.** `/about` renders these 8 and nothing
else: `/about /blog /calculators /contact /cookie-policy /privacy-policy
/services /terms`. Ten routes have footer-only internal linking. This is the
direct consequence of D1.

Any per-route decrease against `link_baseline.json` in a later phase is a blocker.

## 3. `browser_check.mjs` -- 390/768/1024/1440 over all 51 routes

```
$ MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs --site=crypto \
    --base=http://localhost:3171 --sample=9999 --widths=390,768,1024,1440 --grounds \
    --save-baseline --baseline=docs/crypto/_port/browser_baseline.json \
    --out=docs/crypto/_port/p0d_browser_run.json
...
baseline written: ...\docs\crypto\_port\browser_baseline.json
```

204 page-loads (51 routes x 4 widths). Statuses: 51x200, 153x304. Exit 0.

### 3a. Instrument self-test verdicts

**A `--save-baseline` run never prints them.** `browser_check.mjs` line 726
`process.exit(0)` fires immediately after writing the baseline, which is *before*
the `self-test OK (...)` line (739), the unparseable-colour count (745) and the
whole `--grounds` summary block (758+). This is instrument behaviour, not a
failure, and it is the reason the verdicts below are quoted from the run JSON
rather than from stdout. **The gates themselves still ran**: the contrast
self-test is checked at line 709 and the run would have exited 2 without
reporting had it failed.

Contrast self-test, verbatim from `p0d_browser_run.json`:

```json
"selfTest": {"ok": true, "measured": {"slate500OnWhite": 4.76, "slate400OnWhite": 2.56}}
```

Grounds self-test, from every one of the 204 report rows (`grounds.selfTest.ok`):
`{True}` -- true on all 204, no exceptions. Its measured set:
`rgb(15,23,42)` lum 0.0088 dark; `rgb(255,255,255)` lum 1 light;
`oklch(0.208 0.042 265.755)` lum 0.0089 dark; `oklch(0.985 0.001 106.423)` lum
0.9553 light; threshold 3. So the grounds half is proven per route even though
the top-level summary gate was skipped by the early exit.

**Unparseable colours: 0** (`sum(r.unparsed)` over all 204 rows).
**`ratio=1.00` rows: 0.** No white-on-white artefacts and no white-on-white
defects; the byte-order settlement against the served stylesheet was therefore
not needed and was not performed.

**Contrast-usability verdict: the contrast half of this capture is fully
usable.** Zero unparseable colours over 204 page-loads, and every failing row
carries a resolved `oklch()` colour with a plausible ratio. crypto's
`--brand-*` custom properties are plain hex
(`--brand-primary:#0e1a3a; --brand-primary-strong:#0e1a3a; --brand-on-primary:#fff`
in the served stylesheet), so the `var()` resolution trouble the brief warned
about did not arise here.

### 3b. Horizontal overflow (rule: `scrollWidth <= clientWidth + 1` at 390)

11 page-loads, **all at 390 only**, 5 nodes each (`table`/`thead`/`tr`/`th`/`tbody`).
Zero at 768, 1024 and 1440. Eleven blog articles:

`crypto-same-day-30-day-rules-worked-example`, `crypto-to-crypto-swaps-are-disposals`,
`how-crypto-is-taxed-uk`, `lost-crypto-exchange-collapse-negligible-value`,
`when-do-i-pay-tax-on-crypto-uk`, `crypto-backed-loans-collateral-disposals`,
`defi-lending-liquidity-pool-disposals`, `hmrc-crypto-crackdown-2026`,
`hmrc-crypto-nudge-letter-what-to-do`, `staking-rewards-tax-two-step`,
`day-trader-forex-spread-betting-tax-uk`.

Worst `right=467` against a 390 viewport (`how-crypto-is-taxed-uk`). Cause: article
tables have no `overflow-x` wrapper. **D2.**

### 3c. Anchor scroll offsets (gate wants >= 96px / `scroll-mt-24`)

**0 findings. This zero means "there is nothing to measure", not "everything passes."**
Independently verified: an all-51-route fetch for `href="#..."` returns
`routes scanned: 51 | routes with in-page anchors: 0 | total distinct anchor hrefs: 0`.
crypto ships no table of contents, no jump links and no in-page anchors anywhere.
The only `scroll-mt-*` in the whole site is in `calculators/[slug]/page.tsx`, with
no anchor pointing at it. The anchor gate is vacuous pre-port. **D3** (structural
gap, P0-E's territory; recorded here so the zero is not later read as a pass).

### 3d. Contrast (floor 4.5 small/fine print, 3.0 otherwise)

7 distinct failing rows, 228 occurrences.

| occurrences | element | text | ratio | size | colour |
|---|---|---|---|---|---|
| 204 (= every route x every width) | `p` | "Crypto Tax Partners is a trading name of..." | **3.61** | 12px | `oklch(0.556 0 0)` |
| 4 | `p` | "Source: FCA Cryptoassets Consumer Resear..." | 2.48 | 12px | `oklch(0.708 0 0)` |
| 4 | `a` | "FCA Cryptoassets Consumer Research 2024..." | 2.48 | 12px | `oklch(0.708 0 0)` |
| 4 | `p` | "Note: HMRC does not publish a crypto-spe..." | 2.48 | 12px | `oklch(0.708 0 0)` |
| 4 | `p` | "Sources: HMRC guidance: collecting crypt..." | 2.48 | 12px | `oklch(0.708 0 0)` |
| 4 | `a` | "HMRC guidance: collecting cryptoasset da..." | 2.48 | 12px | `oklch(0.708 0 0)` |
| 4 | `a` | "HMRC guidance: reporting cryptoasset dat..." | 2.48 | 12px | `oklch(0.708 0 0)` |

The 204-row is the footer trading-name disclaimer: it fails AA on **every page of
the site at every width**. **D4.** The 24 remaining occurrences are 6 rows x 4
widths on `/research/crypto-tax-gap-index` only: source citations and their links
at 2.48. **D5.**

### 3e. Section grounds (`--grounds`)

Band counts per route, so the zeros are interpretable:

| bands (max across widths) | routes |
|---|---|
| 7 | 1 (`/research/crypto-tax-gap-index`) |
| 3 | 4 (the four `/calculators/<slug>`) |
| 1 | 19 (every blog article) |
| **0** | **27** (`/`, `/about`, `/contact`, all 6 `/for/*` + `/for`, all 5 `/services/*` + `/services`, `/blog` + its 6 categories, `/calculators`, `/privacy-policy`, `/cookie-policy`, `/terms`) |

- **adjacent bands sharing a ground: 0 routes.** On 27 routes this zero is vacuous
  -- the scan found no bands at all to compare. On the 19 single-band articles it is
  vacuous by definition. It is a real pass only on the 5 multi-band routes.
- **dark band touching the footer: 1 route**, `/research/crypto-tax-gap-index`:
  `last=rgb(23, 23, 23) footer=rgb(14, 26, 58)`. **D7.**
- Footer ground is `rgb(14, 26, 58)` on all 51 routes (= `--brand-primary #0e1a3a`).

The headline read: **the site has no section-ground rhythm to preserve.** 27 of 51
routes, the homepage and every commercial page among them, are a flat white run
from header to footer. That is the port's starting point, not a regression risk.

### 3f. Console errors, page errors, failed requests

**0 across all 204 page-loads** (`report[].noise` empty on every row). 0 unrendered
subtrees, so there are no blind spots in the 4-width coverage.

## 4. CTAs -- the most important number in this package

### `cta_snapshot.mjs` does not run on crypto

```
$ node docs/_engines/instruments/cta_snapshot.mjs http://localhost:3171 \
    docs/crypto/_port/link_baseline.json docs/crypto/_port/cta_snapshot.json
WRONG SITE on http://localhost:3171: title is "Crypto Tax Partners | Specialist UK Crypto Tax Accountants",
expected to contain "CIS Accountants"
```

`EXPECT_TITLE` is hardcoded to `"CIS Accountants"` at line 25. The instrument is
Trade-only as committed and I was told not to edit it. **D8.**

Substitute: `docs/crypto/_port/cta_snapshot.json` was produced by a script using
the instrument's own `TAG` regex, `attr()` helper and `INTERACTIVE` set copied
verbatim, over the 51 sitemap routes **plus** `/book`, `/complete`, `/thank-you`.
The script is scratch and has been deleted.

### The answer

```
title asserted: "Crypto Tax Partners | Specialist UK Crypto Tax Accountants"
routes=54 (sitemap 51 + off-sitemap 3)
TOTAL data-cta attributes: 0
non-interactive: 0
```

| route | id | placement | goal | href | element |
|---|---|---|---|---|---|
| all 51 sitemap routes | -- | -- | -- | -- | none |
| `/book`, `/complete`, `/thank-you` (default render) | -- | -- | -- | -- | none |
| `/thank-you?rt=<safe path>` | `thankyou-return-article` | `thank_you` | **absent** | the `rt` value | `a` |

Verified three independent ways, because a zero from an instrument that never
looked is indistinguishable from a real zero:

1. sweep's own count: `0 data-cta ... across 51 URLs`.
2. `curl -s http://localhost:3171/ | grep -o 'data-cta[a-z-]*="[^"]*"'` -> nothing.
   Same on `/contact`.
3. `grep -rn 'data-cta' crypto/web/src --include=*.tsx -l` -> **one file**,
   `crypto/web/src/app/thank-you/page.tsx`, lines 104-105. The only `data-cta`
   strings in the shipped client bundle are in
   `.next/static/chunks/app/layout-*.js` and belong to the shared `autoCapture`
   reader (`closest("[data-cta]")`), not to any authored element.

The `/thank-you` attribute is conditional on a safe `rt` query param
(`page.tsx:23, 101`), which is why the plain fetch saw nothing. Rendered on demand:

```
$ curl -s "http://localhost:3171/thank-you?rt=%2Fblog%2Fcrypto-cgt-and-disposals%2Fhow-crypto-is-taxed-uk" | grep -o '<a[^>]*data-cta[^>]*>'
<a data-cta="thankyou-return-article" data-cta-placement="thank_you" class="font-medium underline" href="/blog/...">
```

### The drawer CTA the brief asked for does not exist

**There is no drawer. There is no mobile menu. There is no header and there is no
nav.** `crypto/web/src/app/layout.tsx` renders `ConsentProvider >
AnalyticsProvider > {children} + SiteFooter` and nothing else;
`crypto/web/src/components/` contains only `calculators/`, `forms/` and
`ui/{SiteFooter.tsx, layout-utils.ts}`. Confirmed rendered:

```
/ header=0 nav=0     /contact header=0 nav=0     /services header=0 nav=0
/blog header=0 nav=0 /for/investors header=0 nav=0
```

`grep -rlo 'mobile_menu' crypto/web/.next/static/chunks` -> nothing. crypto also
has no `PageShell`, and `ctaContactGoal` / `ctaMobilePlacement` appear in seven
files across the estate, **none of them crypto's**.

**So the phase-1 value is: there is no pre-port drawer CTA goal or placement to
preserve.** The port is not at risk of *flipping* crypto's literals; it is at risk
of *inventing* them. Two consequences for phase 1:

- Every `data-cta` the kit chrome introduces is net-new analytics on this site.
  There is no funnel history to split, but there is also no baseline to compare
  against, so the phase-1 CTA set must be recorded as a deliberate decision rather
  than validated against a pre-port set.
- The single pre-existing id `thankyou-return-article` / `thank_you` (no goal) must
  survive the port byte-identical. It is the only continuity obligation here.

**D1: crypto ships no site header and no navigation on any of 51 routes.** Every
page's internal linking is the 8-link footer plus whatever the body copy contains.
This is simultaneously the largest live defect on the site and the reason the
port's chrome adoption is the highest-value change available.

## 5. Dashes -- four metrics, named separately

| # | metric | value | how measured |
|---|---|---|---|
| 1 | **raw source** (`[—–]`, `&mdash;`, `&ndash;`, `–/4`) across `crypto/web/src`, `crypto/web/content`, `crypto/niche.config.json` | **20** | Node scan with a UTF-8-correct regex |
| 2 | **user-facing source** (metric 1 minus code comments, JSDoc and log strings) | **0** | every one of the 20 lines read individually |
| 3 | **rendered body** (served HTML minus `<script>`/`<style>`/tags, 54 routes incl. the 3 off-sitemap funnel pages) | **0** | independent fetch using sweep's own `bodyText()` |
| 4 | **sweep's own count** (51 sitemap routes, em AND en) | **0** | `0 dashes across 51 URLs` |

A raw `grep -rIo $'[—–]'` returns 8305 here and is wrong: outside a UTF-8 locale
grep treats the bracket as six individual bytes. Numbers 1-3 are from Node.

All 20 source occurrences are in backend lead-plumbing and admin files
(`api/leads/inbound/twilio/route.ts` x5, `lib/leads/reply-intent.ts` x5,
`api/leads/events/route.ts` x2, `lib/leads/booking.ts` x2, `lib/leads/verify.ts` x2,
`admin/analytics/checkAuth.ts`, `admin/analytics/page.tsx`,
`components/forms/BookingPicker.tsx`, `lib/leads/contactability.ts`) and every one
is a `//` comment, a JSDoc line or a `console.error` string. CLAUDE.md exempts code
comments.

**Protected set: empty.** There are no legitimate en-dashes in rendered numeric
money ranges on this site, because there are no rendered dashes at all.

**Phase-1 acceptance target: 0.** Justification: metrics 3 and 4 are already 0, so
the target is "no regression from a clean sheet", and `--strict-dashes` can be run
zero-tolerance on crypto from phase 1 onward without a protected-set carve-out.
Any dash appearing in a later phase is introduced by the port.

## 6. `monitored_pages`

Queried Supabase REST with `SUPABASE_URL`/`SUPABASE_KEY` from the repo-root `.env`.

```
monitored_pages?select=site_key,status&limit=5000
-> 1000 rows across 18 (site_key, status) pairs:
   property active 311 / expired 180 / flagged 87; generalist flagged 109 / active 100;
   solicitors active 52 / flagged 24; dentists active 43 / flagged 10; agency active 28 / flagged 8;
   medical active 16 / flagged 3; construction-cis active 8 / flagged 7; hospitality active 6;
   contractors-ir35 active 4 / flagged 4
monitored_pages?site_key=eq.crypto -> 0 rows
```

`site_key` for crypto is `crypto` (`crypto/niche.config.json` ->
`content_strategy.site_key`), and the 5000-row scan enumerated the site keys that
do exist, so **this zero is a scan that looked and found nothing, not a scan that
never ran.** The database was reachable.

**No crypto page is armed in `monitored_pages`.** A cutover therefore re-baselines
nothing and breaks no monitoring window. It also means crypto has no rewrite-decay
detector at all, which is a question for the owner (arm rows at cutover?) rather
than a finding of this package.

## 7. Defects

| id | severity | defect |
|---|---|---|
| **D0** | **blocker (integrity)** | The baseline is labelled `sha=7b5c0ce8` but the served build is `e25412d7`, and for crypto the two differ. `git diff 7b5c0ce8 e25412d7 -- crypto` = `crypto/web/src/app/globals.css \| 4 ++++`: commit `51acda3b` added `@source "../../../../packages/web-shared"` and `@import ".../site-styles/prose-standard.css"`. The served stylesheet carries `.prose`, `.prose h2`, `.prose p` etc., and article bodies carry `class="prose prose-neutral ..."`. **In production (7b5c0ce8) crypto's article bodies are unstyled; in the bytes I measured they are styled.** Every typography, contrast and grounds number above describes `e25412d7`, not production. The baseline's `sha` field should read `e25412d7` (and `sha_deriving_command` is a hardcoded Vercel-API string, though the value came from `git rev-parse`). |
| **D1** | **serious** | No site header, no `<nav>`, no mobile drawer on any of 51 routes. 10 routes have footer-only internal linking (8 links). |
| **D2** | serious | Article tables overflow horizontally at 390 on 11 of 19 posts, worst `right=467` vs a 390 viewport. No `overflow-x` wrapper. |
| **D3** | moderate | No in-page anchors anywhere (0 across 51 routes). No article TOC. The anchor scroll-offset gate is vacuous pre-port. |
| **D4** | serious | Footer trading-name disclaimer fails WCAG AA on **every** page at **every** width: 3.61 at 12px, `oklch(0.556 0 0)`. 204/204 page-loads. |
| **D5** | moderate | `/research/crypto-tax-gap-index` source citations and their links at 2.48 (12px, `oklch(0.708 0 0)`), 6 elements, all 4 widths. |
| **D6** | low | `/embed/[slug]` inherits the root-layout `SiteFooter`, so an embedded calculator iframe ships the entire site footer. |
| **D7** | low | `/research/crypto-tax-gap-index` ends on a dark band `rgb(23,23,23)` running straight into the dark footer `rgb(14,26,58)`. Only route in the estate scan with this breach. |
| **D8** | moderate (tooling) | `cta_snapshot.mjs` hardcodes `EXPECT_TITLE = "CIS Accountants"` (line 25). It exits 2 on every site but Trade. The estate's trap-22 instrument is single-site as committed. |
| **D9** | low | `crypto/web/src/app/layout.tsx` sets `storagePrefix="datp"`. Every other site's prefix is derived from its brand (`ptp`, `dfp`, `ma`, `afl`, `cnp`, `cfp`, `ectp`, `hd`...). `datp` matches no crypto brand string and appears to be inherited. Property's is annotated FROZEN for returning-visitor continuity, so changing crypto's is a decision, not a cleanup. |
| **D10** | low (tooling) | `browser_check.mjs --save-baseline` exits at line 726 before printing the self-test verdict, the unparseable-colour count and the entire `--grounds` summary. The gates run, but a baseline run's operator is never shown the evidence that they passed. |

## 8. False premises in the P0-D brief

1. **"The production SHA to pass is `7b5c0ce8`."** Correct as `origin/main`, wrong as
   a description of what is being measured. See D0. The served build is `e25412d7`
   and crypto's CSS differs between them.
2. **"`--sample` defaults to 30."** True of `sweep.mjs`. `browser_check.mjs`'s
   `--sample` default is **2**, not 30 (line 121). Passing 9999 mattered much more
   there than it did for sweep, where 30 would already have covered all 19 posts.
3. **"On Tailwind v4 the correct self-test values are `#62748e` = 4.77 and `#90a1b9`
   = 2.63."** No. The instrument self-tests two **hardcoded hex literals**,
   `#64748b` and `#94a3b8` (lines 165-166), with `ok = |a-4.76|<0.02 && |b-2.56|<0.02`.
   The measured result was 4.76 / 2.56. A value of 2.63 would **fail** this
   instrument's own gate. The figures are not Tailwind-version-dependent.
4. **"Report the self-test line verbatim."** Not obtainable from a `--save-baseline`
   run; the instrument exits first. Quoted from the run JSON instead. See D10.
5. **"crypto themes partly through `var(--brand-*)` custom properties, so expect
   trouble."** It does define three, but they are plain hex and the painting-based
   resolver had no trouble with any of them. 0 unparseable colours in 204 page-loads.
6. **"Read the shipped client bundle and record what crypto's pre-port drawer CTA
   placement and goal actually are."** There is no drawer, no mobile menu, no header
   and no nav on this site. The values do not exist. See D1 and section 4.
7. **"`cta_snapshot.mjs` if it applies"** -- it does not, and not for a crypto-specific
   reason: it is hardcoded to Trade. See D8.
8. **"`ratio=1.00` with white ... settle each against the served stylesheet's byte
   order."** There were no `ratio=1.00` rows. Nothing to settle.
9. The brief's `MSYS_NO_PATHCONV=1` / `"//"` guidance is sound but was not needed:
   route coverage was derived from the sitemap in both instruments, so no argument
   starting with `/` was ever passed. `MSYS_NO_PATHCONV=1` was set anyway.

## 9. Artefacts

| file | what it is |
|---|---|
| `link_baseline.json` | sweep link-floor baseline, 51 routes, 608 links, `sha` field says `7b5c0ce8` -- read it as `e25412d7`, see D0 |
| `browser_baseline.json` | browser_check baseline, 51 routes x 4 widths |
| `p0d_sweep_run.json` | sweep per-run detail |
| `p0d_browser_run.json` | browser_check per-run detail, carries `selfTest` and per-route `grounds` |
| `p0d_browser_log.txt` | the browser_check run's full stdout |
| `cta_snapshot.json` | CTA triples + per-route rendered dash counts, 54 routes |
| `P0D_BASELINE.md` | this file |
