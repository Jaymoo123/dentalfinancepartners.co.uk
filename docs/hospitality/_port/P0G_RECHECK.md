# P0G — hospitality, deterministic re-check of the F1/F2/F3 fix wave

Run 2026-09-29 against `http://localhost:3202` (`next start`, rebuilt from the working tree with
the fix wave). Identity asserted: `<title>Specialist Hospitality Accountants UK</title>` — present,
contains "Hospitality". No server started/stopped/restarted, no `next build`, no edits, no git
write. Instruments run without `--save-baseline`; the P0D baselines are untouched.

---

## Instrument before/after

| instrument | metric | before (P0D) | after (P0G) | verdict |
|---|---|---|---|---|
| sweep.mjs | URLs clean | 59/59 | 59/59 | PASS |
| sweep.mjs | dead internal links | 3 | 0 | **PASS (fixed)** |
| sweep.mjs | link-floor breaches | n/a (first capture) | 0 (all 22 families identical to baseline min/median/max) | PASS |
| sweep.mjs | total internal links | 667 | 667 | PASS |
| sweep.mjs | em/en dashes | 0 | 0 | PASS |
| sweep.mjs | pipeline artefacts | 0 | 0 | PASS |
| sweep.mjs | data-cta total | 59 | 59 | PASS |
| browser_check.mjs | contrast failures (total) | 235 | 222 | PASS (reduction; see breakdown) |
| browser_check.mjs | — header CTA "Get in touch" (ratio 1.00) | 74 | 74 | unchanged, deferred (chrome, phase 1) |
| browser_check.mjs | — consent "Do not track me" (ratio 2.47) | 145 | 148 | unchanged within noise (chrome, phase 1) |
| browser_check.mjs | — LeadForm ("Step 1 of 2" / "(optional)") | 16 | 0 | **PASS (F3 fixed)** |
| browser_check.mjs | overflow at 390 | 0 | 0 | PASS |
| browser_check.mjs | anchor gaps | 0 | 0 | PASS |
| browser_check.mjs | console/page errors — CSP frame-src (AdSense) | 164 | 152 | unchanged/expected, NOT fixed (by design) |
| browser_check.mjs | console/page errors — dead-link 404s | 12 | 0 | **PASS (fixed)** |
| browser_check.mjs | console/page errors — nav timeouts (transient) | 7 | 4 | within transient-noise tolerance |
| browser_check.mjs | console/page errors — new: gstatic csi connect (1) | 0 | 1 | new, harmless, AdSense telemetry, not scored |
| cta_snapshot.mjs | totalCtas | 59 | 59 | PASS |
| cta_snapshot.mjs | distinct triples | 1 (`header_book|header|form`) | 1 (same) | PASS |

## Link-floor delta list

All 22 URL families reproduced the exact P0D min/median/max (`/` 21, `/about` 6, `/contact` 6,
`/privacy-policy` 6, `/cookie-policy` 6, `/terms` 6, `/services` 11, `/services/*` 11-13,
`/for` 12, `/for/*` 13, `/calculators` 9, `/calculators/*` 7, `/research` 9, `/research/*` 7,
`/blog` 37, and all 8 blog-category families identical). **Zero families dropped below baseline.**

## Curl proof table

| fix | command (decisive check) | decisive line | verdict |
|---|---|---|---|
| (a) B3/legal wording gone | `grep -c 'several times over\|every week across' /` | `0` | PASS |
| (b) calculator hrefs fixed on `/`, short slugs 404 | curl the 3 links + 3 short slugs | `/calculators/food-drink-vat-rate-checker`, `/calculators/staff-cost-rota-margin-calculator`, `/calculators/tronc-tips-paye-nic-calculator` all on `/`; `tronc-tips-paye-nic`→404, `food-drink-vat-checker`→404, `staff-cost-rota-margin`→404 | PASS |
| (c) no literal `&lt;a href` text on `/services/tronc-scheme-setup` | `grep -c '&lt;a href'` | `0` | PASS |
| (d) Organization `@type` counts | grep `"@type":"Organization"` on `/` and `/services/tronc-scheme-setup` | `/` = 1 (the `parentOrganization` "Ashfield Trading Ltd" node — the site's own org node uses an array type `["ProfessionalService","AccountingService"]`, so it does not match this literal string); `/services/tronc-scheme-setup` = 2 (same parentOrganization occurrence, plus a `provider` stub `{"@type":"Organization","@id":"...#organization","name":...,"url":...}` referencing the homepage's `#organization` node by `@id`, not a duplicate full node) | PASS (no duplicate full Organization node; the second hit is a small `provider` reference stub) |
| (e) `priceRange` removed | `grep -c priceRange` on `/`, `/about`, `/services/tronc-scheme-setup`, one blog post | `0` on all 4 | PASS |
| (f) Country present, City absent | grep `"@type":"Country"` / `"@type":"City"` on `/` | `Country`=1, `City`=0 | PASS |
| (g) blog FAQ rendered visibly | `/blog/licensed-trade/alcohol-duty` | first 40 chars of `acceptedAnswer.text`: `"Alcohol duty is a UK excise duty charged"` — found 4 times in the HTML: once inside the `FAQPage` JSON-LD, once in a **visible `<p>`** (`border-t ... px-4 py-4 ...`), and twice inside the RSC flight-data payload (not visible, expected duplication). `BlogPosting`=0, `Article`(as `@type`)=... `BreadcrumbList`=1 | PASS — FAQ text is visible outside JSON-LD |
| (h) single `<main>` per route | `/contact`, `/calculators`, `/blog`, `/thank-you`, `/research/hospitality-openings-closures-index` | `1` on all 5 (was 2 on 4 of these per P0E) | **PASS (fixed)** |
| (i) og:image present | `/cookie-policy`, `/privacy-policy`, `/terms`, `/blog/licensed-trade`, one calculator, 3 research pages | `1` on all 8 sampled (was absent on cookie/privacy/terms/blog-hub/calculators/research per P0B) | PASS |
| (j) research canonical/form/title | `/research/hospitality-openings-closures-index` | canonical = `https://www.hospitalitytax.co.uk/research/...` (no `example.com`), `<form`=1, title = `...\| Hospitality Tax` (brand once); other two research pages: title also carries the suffix exactly once | PASS (was doubled title + example.com canonical per P0B) |
| (k) Tips Act commencement wording | `llms.txt` and `/blog/payroll-and-employment/casual-staff-employment-status` | llms.txt: "the main duties have applied since 1 October 2..."; post: "Since the main duties of the Employment (Allocation of Tips) Act 2023 have applied from 1 October 202..."; `came into force on 1 October 2024` = 0 in both | PASS |
| (l) VAT Notice 709/1 cited | `/calculators/food-drink-vat-rate-checker` | `grep -c 'VAT Notice 709/1'` = `1` | PASS |
| (m) admin login `outline-none` | `/admin/analytics/login` | status `200` (no redirect), `outline-none` count = `0` | PASS |
| (n) heading order h1→h2 on a calculator page | `/calculators/tronc-tips-paye-nic-calculator` (and the other two) | `<h1>, <h3>, <h3>, <h2>, <h2>...` on all 3 calculator pages | **FAIL — unfixed** (P0E minor finding #11 / row "heading order gap", not part of the F1/F2/F3 fix wave scope; not claimed fixed anywhere) |

**14 of 15 curl proofs PASS. 1 FAIL** (heading order on the 3 calculator pages — a pre-existing minor defect, never claimed as fixed by F1/F2/F3, explicitly listed as deferred/minor in P0E).

## tsc / tests

- `npx tsc --noEmit`: clean, 0 errors.
- `npm test` (vitest): 6 files, **43/43 tests passed**.

## Residual, deferred to phase 1

Header CTA "Get in touch" white-on-white (74, ratio 1.00) and cookie-consent "Do not track me"
(148, ratio 2.47) contrast failures (site-wide chrome); CSP frame-src refusals for AdSense (152,
expected/by design, not a defect); no skip-to-content link; undefined `primary-*` Tailwind ramp
step (not separately re-measured this pass, carried from P0E/P0C).

## False premises in this brief

1. None of substance. The brief's shape (instrument commands, flag quirks, compare targets)
   matched P0D exactly. `browser_check.mjs` was moved to the background by the Bash tool's own
   default window despite the 600000 ms timeout param, same tool-level behaviour P0D already
   recorded as not fixable by following the brief more carefully — it completed cleanly (exit 0)
   and the `--out` file landed correctly; no baseline was touched, and no concurrent second run was
   started (waited for the first to finish).
2. The brief's proof (n) implicitly reads as something the fix wave should have addressed; P0E
   already filed the h1→h2 gap as its own minor row (#11), separate from F1/F2/F3's scope, so
   grading it FAIL here is a report of an already-known, already-filed, still-open defect, not a
   newly discovered regression.
