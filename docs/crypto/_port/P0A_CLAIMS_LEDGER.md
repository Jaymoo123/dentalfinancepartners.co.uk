# P0-A claims and ground-truth ledger, crypto design port

Read-only audit, 2026-09-14. Nothing edited. Corpus enumerated programmatically:
19 `.md` under `crypto/web/content/blog/` (frontmatter included), every `.ts`/`.tsx`
under `crypto/web/src/` except `*.test.ts`, `crypto/niche.config.json`. Ground truth:
`docs/crypto/house_positions.md` (33 positions), `docs/crypto/rates_ledger.json` (17 keys).
Rendered checks against the manager's server on `http://localhost:3171`, built from the
current working tree.

**Metric declarations.** Rendered-HTML claims are reported as **per-page presence**
(`grep -ql` per fetched file, count of files), never as a match count, because Next.js
serialises DOM text a second time into the RSC flight payload. Source-file counts are
plain `grep -rn` line counts. Dash counts use `grep -rno CHAR | wc -l`.

---

## Findings

| id | file:line | published (verbatim, short) | why it is a defect | deriving command | severity | proposed verdict |
|---|---|---|---|---|---|---|
| S1 | `crypto/web/content/blog/staking-rewards-tax-two-step.md:130` | "The staking income is above the £1,000 allowance, so the full £3,350 is taxable at 20% (basic rate): an income tax charge of £670." | Wrong figure. The £1,000 trading and miscellaneous income allowance is deducted, it is not an all-or-nothing threshold (house position 12; `rates_ledger.json` key `trading_misc_income_allowance`). Taxable is £2,350, tax £470, not £670. The same site's own calculator does it correctly (`staking-mining-income-estimator.ts:40` `stakingIncome - MISC_ALLOWANCE`) and the sibling post does it correctly (`crypto-mining-tax-1000-allowance.md:131-132` "£1,000 allowance reduces taxable income"). Worked example, i.e. the copy readers trust most. | `sed -n '95,135p' crypto/web/content/blog/staking-rewards-tax-two-step.md` then `grep -n '1,000 allowance' crypto/web/content/blog/crypto-mining-tax-1000-allowance.md` | serious | unsourced and remove (recompute to £2,350 / £470, or drop the sentence) |
| S2 | `crypto/web/src/lib/calculators/tools/crypto-cgt-estimator.ts:71` | "If proceeds in the year exceed four times the AEA you must also report, even if the gain is below £3,000." | Stale and unsourced. The four-times-AEA proceeds test was superseded for 2023/24 onward. House position 27 states the rule with **no** number, and every one of the other 18 places this obligation is published on this site says "the reporting threshold" with no figure. This calculator FAQ is the only place on the site that puts a number on it, and the number it implies (4 × £3,000 = £12,000) is wrong. | `grep -rniE 'four times\|reporting threshold' crypto/web/content/ crypto/web/src/` (1 numeric statement vs 18 unnumbered) | serious | unsourced and remove (match the other 18: "the reporting threshold", no number) |
| S3 | `crypto/web/src/lib/calculators/tools/crypto-disclosure-estimator.ts:5` and `.test.ts:6-15` | `{ value: "reasonable", label: "Reasonable care (non-deliberate)", years: 4, penaltyMin: 0, penaltyMax: 0.3 }` renders as "Penalty range (max) £1,200" on £1,000/yr | Wrong figure and a direct breach of house position 31, which says: "do NOT assert an exact penalty percentage without re-verifying it at build time". Reasonable care attracts **no** penalty; 0-30% is the *careless* band. The tool tells a reasonable-care user they face up to 30% of four years' tax. A unit test pins the wrong value (`expect(penaltyMax?.value).toBe("£1,200"); // 4000 * 0.3`), so it is evidence the figure has not changed, not that it is right. | `sed -n '1,10p' crypto/web/src/lib/calculators/tools/crypto-disclosure-estimator.ts; sed -n '5,16p' crypto/web/src/lib/calculators/tools/crypto-disclosure-estimator.test.ts; grep -n 'do NOT assert an exact penalty' docs/crypto/house_positions.md` | serious | owner decision (set reasonable-care penalty to 0, or drop the penalty rows entirely per position 31; the test must move with it) |
| S4 | `crypto/web/content/blog/crypto-to-crypto-swaps-are-disposals.md:156` | "By Swap 4, the AEA is exhausted. Swaps 4 and 5 produce &pound;1,400 of gains that are fully exposed to CGT." | The arithmetic in the table immediately above contradicts the sentence. Running gains £900 / £2,100 / £2,800 / £3,400 / £4,200; AEA remaining after Swap 3 is stated as **£200**. So £200 of Swap 4's £600 is sheltered and the exposed amount is £4,200 − £3,000 = **£1,200**, not £1,400. A file contradicting itself inside one section. | `sed -n '110,158p' crypto/web/content/blog/crypto-to-crypto-swaps-are-disposals.md` | serious | unsourced and remove (£1,200, or reword to "Swaps 4 and 5 push total gains to £4,200, of which £1,200 is exposed") |
| S5 | `crypto/web/src/app/cookie-policy/page.tsx:141-153` | `<h3>Google Analytics opt-out</h3>` … "You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on." | Compliance copy describing code that does not run, and it contradicts the same page at line 72: "This Site does not use Google Analytics or any other third-party analytics cookies." Verified site-local, not estate-central: `crypto/niche.config.json` `seo.google_analytics_id` is `""`, `ConsentedScripts` renders nothing for an empty id (`packages/web-shared/analytics/react/ConsentedScripts.tsx`, its own header comment says so), and no fetched page emits a `googletagmanager` script. Property legitimately carries this section because Property has `G-B5MCP5NGMY`; crypto inherited the section and dropped the GA. | `grep -n 'google_analytics_id' crypto/niche.config.json` → `""`; `for f in /tmp/p_*.html; do grep -ql googletagmanager $f && echo $f; done` → none; `grep -n 'Google Analytics' crypto/web/src/app/cookie-policy/page.tsx` → lines 72 and 141-150 | serious | unsourced and remove (delete the opt-out section; keep line 72) |
| S6 | 12 source sites, rendered on 5 of 14 pages sampled | "We reply within 24 hours" / "we will come back within 24 hours" / "Response within 24 hours" / "reply within one working day" / "We'll be in touch within one working day" | Turnaround promise for our own service, banned class. Source sites: `src/app/about/page.tsx:25`, `src/app/blog/[category]/[slug]/page.tsx:111`, `src/app/contact/page.tsx:6` and `:13`, `src/app/for/[slug]/page.tsx:95`, `src/app/llms-full.txt/route.ts:98`, `src/app/services/page.tsx:54`, `:58`, `:63`, `src/app/services/[slug]/page.tsx:95`, `src/components/calculators/MiniCapture.tsx:20`, `src/components/forms/LeadForm.tsx:412` and `:439`, plus `crypto/niche.config.json` `cta.sticky_secondary` and `blog.cta_body`. | `grep -rniE 'within 24 hours\|within one working day' crypto/web/src crypto/niche.config.json`; per-page presence: `for u in / /about /contact /services /calculators /for /book /complete /thank-you /blog /llms-full.txt /services/crypto-self-assessment /for/investors /blog/hmrc-disclosure-and-compliance/can-hmrc-track-crypto-wallets; do curl -s -o /tmp/t.html localhost:3171$u; grep -ql '24 hours' /tmp/t.html && echo $u; done` → `/contact`, `/services`, `/llms-full.txt`, `/services/crypto-self-assessment`, `/for/investors`, and blog posts; `/about` carries "one working day" | serious | unsourced and remove (estate-standard replacement wording, manager's call) |
| S7 | `crypto/web/src/app/research/crypto-tax-gap-index/page.tsx:120` and `:66` | "The FCA runs this survey annually; this page is updated on each new wave." / "Verified figures on UK cryptoasset ownership" | False statement about our own process, contradicted by our own data file: `crypto/web/src/data/uk-crypto-tax-gap-index.json` `ownership.note` says "Wave 6 (2025) published; see source for latest figure" while the page publishes Wave 5 (Aug 2024) figures under a "Verified" banner. The claim to update on each wave is demonstrably not true as at build. | `grep -n 'Wave 6' crypto/web/src/data/uk-crypto-tax-gap-index.json; grep -n 'updated on each new wave' crypto/web/src/app/research/crypto-tax-gap-index/page.tsx` | serious | owner decision (refresh to Wave 6, or delete the "updated on each new wave" sentence) |
| M1 | `crypto/web/src/app/about/page.tsx:25` | "We work on a fixed-fee basis and reply within one working day." | Pricing-model claim for our own services. No published number, so not a fee, but it is a commercial commitment with no source and no engagement-letter backing (`terms/page.tsx` §2 says fees are set in separate engagement letters). Second half is S6. | `grep -n 'fixed-fee' crypto/web/src/app/about/page.tsx` | minor | owner decision |
| M2 | `crypto/web/src/app/page.tsx:202-219`, rendered `:650-680` | "Real outcomes" / "What clients say" / "Composite accounts based on patterns across our client base… The compliance situations described are real." + 3 attributed quotes | Not a crypto-specific defect: this is the estate pattern (`construction-cis/web/src/app/page.tsx:548` carries the near-identical disclosure, Property carries an anonymised social-proof band, and the model memory permits anonymised social proof only). Recorded so the fix wave does not delete it as an invented testimonial. The one crypto-specific stretch is "our client base" plus "Real outcomes" on a site whose first client is not evidenced. | `grep -rn 'Composite accounts' */web/src/app/page.tsx` → crypto + construction-cis only | minor | correct in place (owner decision on the "Real outcomes" label) |
| M3 | `crypto/web/src/lib/calculators/tools/crypto-cgt-estimator.ts:23` | field `otherTaxableIncome`, help: "Salary, self-employment income etc. Used to determine how much basic-rate band remains." | The band boundary is £37,700 of **taxable** income (after the personal allowance), which is how house position 2 and every blog on the site state it. The help text invites gross salary, which shrinks the remaining band by up to £12,570 and overstates CGT by up to £754 (12,570 × 6pp). Mis-labelled input, not a wrong constant. Note the sibling `staking-mining-income-estimator.ts:8` gets this right by applying `PERSONAL_ALLOWANCE` explicitly. | `sed -n '3,24p' crypto/web/src/lib/calculators/tools/crypto-cgt-estimator.ts` | minor | correct in place (reword help to "taxable income after your personal allowance") |
| M4 | `crypto/web/src/lib/calculators/tools/investor-vs-trader-checker.ts:46,55` | "income tax rates up to 45% rather than CGT at 18%/24%" | Omits Class 4 NIC, which house position 32 names as "the extra cost that makes a trading-income outcome worse than CGT for most people" and which `crypto-services.ts:328,377` does publish (6% / 2%). The calculator understates the site's own flagship comparison. Not false, incomplete. | `grep -n 'Class 4' crypto/web/src/lib/calculators/tools/*.ts` → none; `grep -c 'Class 4' crypto/web/src/data/crypto-services.ts` → present | minor | correct in place |
| M5 | `crypto/web/src/lib/calculators/tools/crypto-disclosure-estimator.ts:8` | deliberate band `penaltyMax: 0.7` | Deliberate-and-concealed reaches 100% of the tax, not 70%. 70% is deliberate-not-concealed. Same house-position-31 objection as S3, lower stakes because it understates rather than overstates. Pinned by `.test.ts:24`. | `sed -n '4,9p' crypto/web/src/lib/calculators/tools/crypto-disclosure-estimator.ts` | minor | owner decision (rides with S3) |
| M6 | `crypto/web/src/lib/calculators/tools/staking-mining-income-estimator.ts:6,13` | `PERSONAL_ALLOWANCE = 12570` applied flat | No personal-allowance taper above £100,000, so the 60% effective band is invisible and the tool understates tax for that cohort. Edge case for a scenario tool that already says "Speak to a specialist". | `grep -n '100000\|125140' crypto/web/src/lib/calculators/tools/staking-mining-income-estimator.ts` → only 125140 | minor | correct in place |
| M7 | `crypto/web/src/app/page.tsx:90` | "Many DIY returns omit hundreds of swap events entirely." | Behaviour claim about a population, no source, above the fold on the homepage. "Many" and "hundreds" are both unevidenced. Distinct from the sourced swaps-are-disposals claim it sits beside. | `sed -n '80,92p' crypto/web/src/app/page.tsx` | minor | owner decision (soften or source) |
| M8 | `crypto/web/src/app/about/page.tsx:1` | file begins `﻿import type { Metadata }` | UTF-8 BOM on a source file. Not user-facing copy; flagged here only because it was found while reading the file and it is the sort of thing that survives a port. | `head -c 3 crypto/web/src/app/about/page.tsx \| xxd` → `efbbbf` | minor | correct in place |

---

## (a) Summary count by severity

- **Serious: 7** (S1-S7)
- **Minor: 8** (M1-M8)

Of the serious rows, 4 are wrong or stale figures (S1, S2, S3, S4), 1 is compliance copy
describing code that does not run (S5), 1 is a banned turnaround promise across 12 source
sites (S6), and 1 is a false claim about our own update process (S7).

## (b) False premises in the brief

1. **"every `.md` … frontmatter included (`faqs`, `keyTakeaways`, `metaTitle`,
   `metaDescription`, `summary`, `schema:`)".** There is **no `schema:` key in any
   frontmatter on this site**: `grep -c 'schema:' crypto/web/content/blog/*.md` returns 0 for
   all 19 files. All JSON-LD on crypto is built in code (`src/lib/schema.ts`,
   `src/lib/calculators/schema.ts`) from the same objects that render the visible page, so
   defect class 3's "`schema:` frontmatter disagreeing with the page" has no corpus here and
   the machine-readable output cannot drift from the page by construction. Verified on the
   rendered homepage: the `FAQPage` block is emitted from the same `faqs` array the
   `<details>` list renders (`src/app/page.tsx:219-266`, `:271`).
2. **"check whether £ is stored literally or as a unicode escape or an entity on THIS
   site".** On crypto it is stored **literally** in 15 of 19 posts and as the HTML entity
   `&pound;` in exactly one file (`crypto-to-crypto-swaps-are-disposals.md`). There is **no
   unicode-escape storage anywhere** (`grep -rl 'u00a3' crypto/web/content crypto/web/src`
   returns only that entity file, matched on the `&pound;`-adjacent search, not on an
   escape). The generalist trap does not apply here. The ASCII form `GBP` appears 5 times,
   all as a currency name in prose plus one JSON-LD `priceCurrency`, never as a price for our
   services.
3. **Implied risk that crypto's consent wording is unpinned.** It is pinned. `"crypto"` is
   in `IN_SCOPE_SITES` at `Property/web/src/tests/consent-anchor-drift.test.ts:34`, and
   `crypto/web/src/config/site.ts:15` contains the anchor phrase "a firm from our specialist
   partner network" verbatim, so `consentAllowsSharing` matches. Nothing to flag, and nothing
   to change.
4. **Not false, but worth confirming for the fix wave:** the brief's warning about wrongly
   deleting estate-central privacy sentences holds exactly. All three named mechanisms are
   present on crypto's privacy page in wording that matches Property byte for byte
   (multi-firm pool "at most six firms", Anthropic through the Vercel AI Gateway, Companies
   House enrichment), and crypto's `leadConsentText` is character-identical to Property's.
   **None of section 5 of `privacy-policy/page.tsx` should be touched.**

## (c) Checked and CLEAN, with the command, so the next reader does not redo them

- **Annual exempt amount £3,000** across all 26 published locations, no drift, no stale
  £12,300 or £6,000. `grep -rno 'annual exempt amount[^<.]\{0,80\}' crypto/web/content crypto/web/src`
- **CGT rates 18%/24% with the band-boundary split** (house position 2's "single most common
  presentation error"). No bare "18% basic rate" anywhere; 117 occurrences of 24% and 81 of
  18%, all paired with the band language. No stale 10%/20%/28%.
  `grep -rnoE '(10|20|18|24|28)% *(CGT|capital gains)' crypto/web/content crypto/web/src`
- **Basic-rate band ceiling £37,700** consistent in prose, data file and both band-aware
  calculators. `grep -rc '37,700\|37700' ...` → 20 prose + `crypto-cgt-estimator.ts:6` + `uk-crypto-tax-gap-index.json`.
- **The flagship s104 / same-day / 30-day worked example is arithmetically correct end to
  end.** 8 ETH at £2,000 = £16,000 proceeds; costs £3,000 + £5,400 + £3,600 = £12,000;
  gain £4,000; the article's own cross-check line confirms it; pool math 10 ETH @ £1,200 →
  7 ETH @ £8,400 holds; 5 Mar is inside the 30-day window from 20 Feb; the downstream CGT
  (£1,000 taxable, £180 at 18% / £240 at 24% with £30,000 other income and a £7,700 remaining
  band) is right. `sed -n '70,232p' crypto/web/content/blog/crypto-same-day-30-day-rules-worked-example.md`
- **The CGT band-split worked example in the swaps post** (income £28,000, band £37,700,
  room £9,700, gain £14,000 − £3,000 = £11,000, 18% on £9,700 = £1,746 + 24% on £1,300 =
  £312 = £2,058) is correct. Only the £1,400 sentence (S4) is wrong in that file.
- **CARF dates**: 41 occurrences of "1 January 2026", 39 of "31 May 2027", 20 of "1 January
  2027", 5 of "31 December 2026", zero contradicting dates, zero exaggeration. Matches
  house position 24 and `rates_ledger.json` exactly.
  `grep -rnoE '(1 January 2026|31 December 2026|1 January 2027|31 May 2027)' crypto/web/content crypto/web/src | sed 's/.*://' | sort | uniq -c`
- **Disclosure look-back 4 / 6 / 20 years** consistent everywhere including the calculator
  and the research data file. Only the *penalty percentages* are the problem (S3, M5).
- **Employer NIC**: 15% / £5,000 used; the old 13.8% / £9,100 appears 4 times and is each
  time explicitly labelled stale ("The old rate … is stale", "no longer current"). Correct
  in place, do not "fix". `grep -rn '9,100\|13.8%' crypto/web/content crypto/web/src`
- **Class 4 NIC 6% / 2% at £12,570 / £50,270** and **Corporation Tax 25% / 19% / Marginal
  Relief at £50,000-£250,000** consistent across services data, homepage, llms-full.txt and
  the company blog post. Matches positions 32 and 33.
- **Em-dashes in user-facing copy: ZERO.** 20 em-dashes exist, all 20 in code comments or
  JSDoc across 9 `src/**` files (checkAuth, analytics page, events route, twilio route,
  BookingPicker comment, booking.ts, contactability.ts, reply-intent.ts, verify.ts). Nothing
  in `content/`, nothing in any `metaTitle` or `metaDescription`, nothing in any rendered
  string. **En-dashes: 0 occurrences anywhere.** Metric: total occurrence count via
  `grep -rno '—' crypto/web/content crypto/web/src | wc -l` (20) and
  `grep -rno '–' … | wc -l` (0), then each of the 20 read in context.
- **No published fee or price for our own services.** No "from £X", no hourly or monthly
  rate, no comparative price claim ("cheaper than" returns nothing). The only price in
  JSON-LD is `price: "0", priceCurrency: "GBP"` on the free calculators
  (`src/lib/calculators/schema.ts:22`), which is correct. "Free call" / "no obligation" stays
  per the positioning ruling. `grep -rniE 'from £|£[0-9]+ ?(per|/) ?(month|hour|year|return)|cheaper than|price(s)? start' crypto/web/content crypto/web/src`
- **No claim to a qualification, a regulator, PI insurance, or regulated work by us.** Zero
  hits for chartered/ACCA/ICAEW/ATT/CIOT/AAT/"professional indemnity"/"regulated by"/AML
  supervision as a claim about us. Every FCA mention is a third-party fact about cETNs or the
  FCA consumer survey. The only "Chartered Tax Advisers" references are to **Aswatax**
  (`thank-you/page.tsx:71,82`, `LeadForm.tsx:415`), which is the real referral partner per
  the signed pack, framed as "we work closely with" and never as our own status.
  `terms/page.tsx` claims nothing: §2 disclaims advice and states no accountant-client
  relationship is created. `grep -rniE 'chartered|ACCA|ICAEW|CIOT|professional indemnity|regulated by' crypto/web/content crypto/web/src`
- **No fake phone number published.** `niche.config.json` carries the placeholder
  `+44 20 0000 0000`, but `siteConfig.contact` is never rendered and no JSON-LD emits a
  `telephone` property. `grep -rn 'contact.phone\|telephone' crypto/web/src` → 1 hit, in
  privacy prose about the user's own number.
- **Lead consent wording passes the estate gate** (see false premise 3).
- **Privacy policy sentences about the multi-firm pool, Anthropic via the Vercel AI Gateway,
  and Companies House enrichment are all estate-central and true.** Byte-matched against
  Property. Do not delete.
- **Cookie policy's first-party analytics description is accurate**: identifiers are stored
  in `localStorage`/`sessionStorage` by `packages/web-shared/analytics/`, and the page says
  "we store two random identifiers in your browser", not "cookies". Only the orphaned GA
  section (S5) is wrong.
- **`investor-vs-trader-checker`, `staking-mining-income-estimator` and
  `crypto-cgt-estimator` band arithmetic** all recomputed by hand against their tests; the
  three CGT test cases (£1,260 / £3,618 / £2,880) and the three staking cases (£0 / £800 /
  £1,346) are each correct for the stated scenario. The only test pinning a value I believe
  wrong is the disclosure penalty test (S3, M5).
- **`crypto-backed-loans-collateral-disposals.md:118-145`** liquidation worked example
  (£3,200 − £800 = £2,400, covered by the £3,000 AEA) is correct and properly labelled
  "illustrative figures only".
- **`crypto-mining-tax-1000-allowance.md`** applies the £1,000 allowance as a deduction
  correctly throughout, which is what makes S1 an isolated outlier rather than a pattern.

## (d) Owner decisions rather than defects

1. **S3 / M5, the disclosure penalty percentages.** House position 31 says present penalties
   as *ranges with a link*, and explicitly forbids asserting an exact percentage without
   re-verification at build time. I cannot re-verify against gov.uk from a read-only offline
   pass. The lazy correct fix is to delete the two penalty rows and link HMRC's penalty
   guidance, which satisfies position 31 without needing a number. Owner should pick between
   that and a re-verified set.
2. **S7, the research page's staleness.** Refreshing to FCA Wave 6 is a content job with a
   live source fetch; deleting the "updated on each new wave" sentence is a one-line honesty
   fix. Owner's call which.
3. **M1, "fixed-fee basis".** Whether a pricing *model* claim (no number) is inside or
   outside the no-published-fee rule is a positioning question, not a factual one.
4. **M2, the testimonial band.** Estate-wide pattern, not a crypto defect. If "Real outcomes"
   and "our client base" are to go, they should go across the estate, not on this site alone.
5. **M7, "Many DIY returns omit hundreds of swap events entirely."** Soften or source; either
   way it is a tone decision above the fold on the homepage.

## Could not settle

- **The current numeric Self Assessment CGT reporting threshold.** S2's claim is
  demonstrably stale, but I cannot state the replacement figure without fetching gov.uk,
  which a read-only offline pass cannot do. The recommendation stands regardless: remove the
  number and use "the reporting threshold", matching the other 18 locations on this site and
  house position 27, which also declines to state a figure.
- **Whether the `cta.sticky_secondary` string "Free, no-obligation reply within 24 hours" in
  `niche.config.json` reaches any rendered page.** It did not appear in any of the 14 pages
  I fetched, and the homepage carries no "24 hours" text at all. Either the sticky CTA is not
  rendering or it is client-gated. That is P0-E's structural territory; the string still
  needs fixing at source under S6 either way.
