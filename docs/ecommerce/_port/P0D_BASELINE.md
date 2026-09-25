# Phase 0D — instrument baseline capture (ecommerce)

Server identity: `curl -s http://localhost:3191/` title = "Ecommerce and marketplace
seller accountants UK" — asserted before every measurement below, re-asserted
before the cta_snapshot attempt. Production SHA: `153e5017`.

## Files written

- `docs/ecommerce/_port/sweep_baseline.json` (sweep.mjs, `--save-baseline`)
- `docs/ecommerce/_port/browser_baseline.json` (browser_check.mjs, `--save-baseline`)
- `tmp/browser_check_ecommerce_1790365501590.json` (browser_check.mjs's own `--out`,
  auto-named — the flag was not passed because `--save-baseline` runs don't take
  one on this instrument; this is the detail file the numbers below come from)
- `docs/ecommerce/_port/cta_baseline.json` — **NOT written**. See false premise 1.

## False premises found

1. **`cta_snapshot.mjs` is not a generic `--site=`/`--base=`/`--out=` instrument.**
   The README documents it alongside sweep/browser_check as taking `--site=`, but
   the script (`docs/_engines/instruments/cta_snapshot.mjs`) reads three
   **positional** args (`BASE`, `BASELINE`, `OUT`), and is hardcoded to
   construction-cis: `EXPECT_TITLE = "CIS Accountants"` (line 25) and
   `site: "construction-cis"` in its output object (line 113). Run exactly as the
   brief specified (`--site=ecommerce --base=... --out=...`), it crashed on
   `ENOENT` trying to open a file literally named `--base=http:\localhost:3191`
   (flags parsed as positional args). Run correctly positionally
   (`http://localhost:3191 docs/ecommerce/_port/sweep_baseline.json
   docs/ecommerce/_port/cta_baseline.json`), it exits with `WRONG SITE on
   http://localhost:3191: title is "Ecommerce and marketplace seller accountants
   UK", expected to contain "CIS Accountants"`. It cannot run against ecommerce
   as committed. This is the Trade port's private instrument, not the shared one
   the README implies. No file under `docs/ecommerce/_port/` was in scope to fix
   it, so the CTA establishing set below was captured by grep + curl instead.
2. The brief says "two `data-cta` attributes in source" — false. There is exactly
   **one**: `grep -rn "data-cta=" ecommerce/web/src` returns one hit
   (`thank-you/page.tsx:200`, `data-cta="thankyou-return-article"`). It carries a
   second attribute, `data-cta-placement="thank_you"` (line 201), which is not a
   second CTA — same element, same id.

## CTA establishing set (must survive the port byte-identical)

Source (`ecommerce/web/src/app/thank-you/page.tsx`): the `<Link>` at the bottom
of the default (non-confirmed, non-optout) thank-you branch, rendered only when
`returnPath` is truthy. `returnPath` requires the `rt` query param to pass
`isSafeReturnPath` (`packages/web-shared/leads/capture-steps.ts:118-125`: starts
with `/`, not `//`, no backslash, no whitespace/control chars).

```
data-cta="thankyou-return-article"
data-cta-placement="thank_you"
```

Proved two ways:
- grep: `ecommerce/web/src/app/thank-you/page.tsx:200-201`
- curl: `curl -s "http://localhost:3191/thank-you?rt=%2Fblog"` returns the tag;
  `curl -s "http://localhost:3191/thank-you"` (no `rt`) returns zero `data-cta`
  matches. Confirmed conditional, not a crawl miss.

`sweep_baseline.json` correctly shows `0 data-cta` estate-wide (default route
sweep never sets `rt`), which is consistent, not a defect in sweep.

## Link floors (sweep.mjs, 51 routes: 37 core + 14/14 sampled articles — the
full corpus, since `--sample=9999` > 14 available articles)

- Total unique internal links (sum, not deduped estate-wide): 707
- Min per route: 10 — Max per route: 30 (`/blog`)
- Routes at the floor (10 links each): `/about`, `/contact`, `/privacy-policy`,
  `/cookie-policy`, `/terms`, `/services/ecommerce-vat-compliance`,
  `/services/settlement-payout-reconciliation`, `/services/selling-into-the-eu`,
  `/services/hmrc-letter-online-sales`, `/vat/deemed-supplier-establishment`,
  `/vat/vat-on-marketplace-fees`, `/vat/135-import-rule`, `/vat/ioss-vs-oss`,
  `/vat/postponed-vat-margin-scheme`, `/calculators/sole-trader-vs-ltd-sellers`
  (15 routes).
- Not independently confirmed that 10 equals the footer-only count — sweep's
  JSON doesn't separate footer from body links, and no crawler of my own is
  permitted. Flagging this as unmeasured rather than asserting it: these 15
  routes (leaf service/VAT pages, legal pages, one calculator) are consistent
  with "footer nav only, no in-body internal linking," but that is inference,
  not a measured fact.

## Dashes (sweep.mjs em/en dash scan, default mode — not `--strict-dashes`)

`totalDashes: 0` across all 51 routes; per-route `dashes` map is all zeros. No
protected-range exceptions were in play because the count is already zero.
Acceptance target for the port is therefore genuinely 0, not "0 minus some
allowed range" — there's nothing to protect.

## Browser check — overflow and anchors (corpus: 51 routes × 4 widths = 204
route/width measurements; widths 390/768/1024/1440, all run — no width was
dropped, run completed inside the tool's own pacing without needing to trim)

Overflow (zero tolerance at 390 per the instrument's own rule, but reporting
raw counts at every width for visibility):

| width | overflow findings | route/width pairs affected |
|---|---|---|
| 390 | 53 | 11 |
| 768 | 5 | 1 |
| 1024 | 0 | 0 |
| 1440 | 0 | 0 |

12 distinct route@width pairs carry overflow, all at 390 except one
(`/blog/amazon-and-marketplace-selling/is-it-worth-selling-on-amazon-uk` also
overflows at 768). Affected routes: `/services/hmrc-letter-online-sales`,
`/for/amazon-sellers`, `/for/shopify-sellers`, `/for/marketplace-sellers`,
`/for/dropshippers`, `/vat/postponed-vat-margin-scheme`,
`/blog/business-structure-and-tax/online-seller-formation-trends`,
`/blog/business-structure-and-tax/online-seller-survival-odds`,
`/blog/amazon-and-marketplace-selling/is-it-worth-selling-on-amazon-uk`,
`/blog/business-structure-and-tax/sole-trader-vs-ltd-online-sellers`,
`/blog/making-tax-digital-and-self-assessment/trading-allowance-online-sellers`.

Anchor gaps (`scroll-margin-top` missing on an in-page anchor target): 24
findings total, constant across all 4 widths (6 per width), all on 2 routes:
`/blog/business-structure-and-tax/online-seller-formation-trends` and
`/blog/business-structure-and-tax/online-seller-survival-odds` — 3 anchors each,
present at every width (not a responsive-only defect).

Console errors, page errors, failed requests: 0/0/0 across all 204
measurements.

## Contrast — CONDITIONAL (README: this half is unreliable on `var()`-themed
sites; treat as a lead list, not fact)

Self-test from the run JSON's `selfTest` field:
```
"selfTest": { "ok": true, "measured": { "slate500OnWhite": 4.76, "slate400OnWhite": 2.56 } }
```
Matches the corrected spec values exactly (4.76 / 2.56) — the instrument's own
maths check passed.

Unparseable-colour count: **0**. Grepped the full run JSON for the literal
string `unparseable` — zero hits. Every colour the instrument encountered,
including 247 instances of `oklch(0.708 0 0)`, parsed and produced a ratio.

Raw findings: 546 contrast lines total across 204 measurements (174 @390, 124
@768, 124 @1024, 124 @1440 — the drop from 390→768 is the mobile-only CTA
buttons/labels going out of the DOM query, not a fix). Per the README, do not
present this as fact. 12 of the 546 are `ratio=1.00` rows, all on one route,
`/research/online-seller-survival-index`, at all four widths (3 distinct
fields — "Leave blank", "I sell on...", "Message (optional)" — × 4 widths). All
12 are form label text, not a gradient-button context, so the "usually a
gradient artefact" caveat is a weaker prior here than for a hero button; still
listing them for the CSS audit package to settle at the element rather than
calling it live or calling it noise.

## Not measured / not attempted

- CTA triple-snapshot via the committed instrument (see false premise 1).
- Whether the 15 link-floor routes' 10 links are literally the footer link set
  (see link floors section).
- `--grounds` section-ground breaches — not requested in this brief, not run.
- Screenshots (`--shots`) — not requested, not run.
