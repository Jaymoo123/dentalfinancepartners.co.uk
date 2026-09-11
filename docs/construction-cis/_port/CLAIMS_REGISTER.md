# Trade (construction-cis): banned-claim register

Site-wide, rule-first enumeration. 2026-09-11. Scope swept in one pass:
`construction-cis/web/src/**`, `construction-cis/web/content/**`,
`construction-cis/web/scripts/**`, `construction-cis/niche.config.json`.
Ground truth: `docs/construction-cis/house_positions.md` (HP-LOCKED 2026-06-12, corrected 2026-06-13).
Prior ledger: `docs/construction-cis/_port/LIVE_DEFECTS.md` (TD-01 to TD-35).

`.test.ts` / `.test.tsx` excluded from the banned-claim rules (not user-facing), reported separately
where a guard test is the thing at fault.

**Representation facts, re-verified this pass, not assumed:**

| representation | probe | result |
|---|---|---|
| literal `£` (U+00A3) | `grep -rn '£'` over the scope | present, the only glyph form |
| `&pound;` HTML entity | `grep -rn '&pound;'` | 0 |
| `£` JSON/TS unicode escape | `grep -rn '\\u00a3'` | 0 |
| mojibake `Â£` | `grep -rn 'Â£'` | 0 (console artefact only) |
| ASCII `GBP <digits>` | `grep -rnE 'GBP [0-9]'` | **20 lines across 4 files**, invisible to any `£` grep |

The `GBP` form is NOT confined to `ExcelPreview.tsx`. It also covers
`scripts/resources/builders/cis-refund.ts`, `cis-vs-paye.ts` and `gps-readiness.ts`, which
generate the **downloadable spreadsheets** the site hands to visitors. Those are user-facing
artefacts a `£` sweep never sees. One of them, `cis-refund.ts:264`/`:316`, publishes the §13
refund band.

Verdict vocabulary: **breach** / **owner-gated** (commercial decision, not a correctness failure) /
**licensed** (house positions permits it, clause quoted) / **permitted-but-unsourced** (§13 framing
met, attribution missing) / **third-party or statutory** / **internal/operator-only** /
**code comment** / **dormant**.

---

## Rule 1: our own advisory pricing, published anywhere

### 1a. Numeric fee figures for our own service

| file:line | verbatim | verdict | owner | rendered? |
|---|---|---|---|---|
| `niche.config.json:301` | `"label": "Plans from £24/mo"` | **dormant** (`cta.variant` = `"leadgen"`; `isPackagesMode()` false) | owner-gated (TD-02) | no |
| `niche.config.json:305` | `"primary": "Fixed monthly plans from £24"` | dormant | owner-gated (TD-02) | no |
| `niche.config.json:312` | `"Plans start at £24 a month for subbies, £49 for CIS contractors and £79 for trade limited companies... no surprises on the bill."` | dormant | owner-gated (TD-02) | no |
| `niche.config.json:296-298` | `"label": "See pricing", "href": "/pricing"` (x3 in the variant) | dormant | owner-gated | no |
| `niche.config.json` `packages.home_cta` | `"Pick a plan today. No fixed term."` / `"Fixed monthly fees for subbies, contractors and trade limited companies, agreed up front."` / `"See plans and pricing"` | dormant | owner-gated | no |
| `src/app/contact/page.tsx:29` | `"Our fixed monthly plans start at £24 a month for subbies"` | dormant (inside `isPackagesMode(niche)` ternary at `:27`) | owner-gated (TD-02) | no |

Dormant-branch evidence, verified not assumed: `niche.config.json` `cta.variant` = `"leadgen"`;
`isPackagesMode()` is the guard at `contact/page.tsx:27`, `page.tsx:33`, `StickyCTA.tsx:37`.
Flipping one string publishes **11 pricing strings** across header, hero, sticky bar, every blog
CTA, the homepage closer and `/contact`.

**`priceRange` is now clean site-side.** `grep -rn priceRange src` = **0**; `/locations/leeds`
rendered JSON-LD carries no `priceRange`. TD-01's per-site half is CLOSED. The shared-kit copy
`packages/web-shared/schema/local-business.ts:127` `priceRange: "££"` is **still live** and is not
Trade's to fix (TD-K1, estate-wide).

### 1b. Non-numeric claims about our own commercial terms (the TD-18 class)

TD-18 lists three. There are **ten**, plus one in structured data. All rendered.

| file:line | verbatim | verdict | rendered? |
|---|---|---|---|
| `niche.config.json:24` (site `description`) | `"...We claim it back, then keep you compliant. Fixed fees, plain English."` | **breach** (TD-18 class). Feeds `metadata.description` AND the `Organization` + `WebSite` JSON-LD `description` (confirmed in rendered `/` HTML). Never listed in any TD entry. | **yes, site-wide + SERP + schema** |
| `src/app/about/page.tsx:39` | `"We work on a fixed-fee basis. You know what you are paying before we start."` | breach (TD-18) | yes |
| `src/config/service-tiers.ts:35` | `"Fixed fee, quoted before we start"` | breach (TD-18) | yes |
| `src/app/cis-refund/page.tsx:231` | `"Fixed fees, quoted before we start"` | breach (TD-18) | yes |
| `src/app/gross-payment-status/page.tsx:241` | `"Fixed fees, quoted before we start"` | **breach, not in TD-18** | yes |
| `src/app/blog/page.tsx:158-159` | `title: "Fixed fees, no surprises"` / `detail: "Quoted before we start, so you see the number first."` | **breach, not in TD-18** (the `/blog` closing panel the brief predicted) | yes |
| `src/app/glossary/page.tsx:149-150` | same pair | **breach, not in TD-18** | yes |
| `src/app/glossary/[slug]/page.tsx:172-173` | same pair | **breach, not in TD-18**, renders on every glossary term page | yes |
| `src/app/page.tsx:214` | `"Fixed fees. Plain English. No hard sell."` | **breach, not in TD-18** | yes (homepage) |
| `src/app/page.tsx:355` | `"Start with our free calculators or speak to us directly. Fixed fees, no surprises."` | **breach, not in TD-18** | yes |
| `src/app/page.tsx:532` | `{ title: "Fixed fees, no surprises", sub: "Quoted before we start" }` | **breach, not in TD-18** | yes |
| `src/app/services/page.tsx:176` | `"Start with our free calculators or speak to us directly. Fixed fees, no surprises."` | **breach, not in TD-18** | yes |

Why these are breaches and not merely stylistic: `privacy-policy/page.tsx:107-136` discloses that
the enquiry is passed to up to six independent firms, each an independent controller, who set
their own terms. We do not quote, so "quoted before we start, so you see the number first" is a
commercial promise made by a party that is not in the transaction. **Fix is owner-gated** per the
brief (commercial decision).

### 1c. Zero-price offers for our own service (adjacent class, previously unnamed)

`grep -rniE 'free (call|review|consultation|quote|15)|no.obligation'` = **80 lines across 22
files**, including `niche.config.json` (8), `src/lib/assistant/opener.ts` (9),
`src/config/lead-nurture.ts` (5, outbound SMS/email), `src/components/forms/BookingPicker.tsx`,
`ResourceGate.tsx`, `ResultGateModal.tsx`, `LeadCTAPanel.tsx` ("Free consultation"),
`page-summaries.ts:52`, `service-tiers.ts`, `StickyCTA.tsx`.

"Free call" / "free review" / "free 15-minute call" is a **price for our own advisory service
(zero)**, and under the pool model we are not the party who makes the call. This is the same
logical defect as 1b with the number set to zero. **Verdict: owner-gated, one decision for the
whole class of 80.** Recorded because no TD entry names it and a future "strip our pricing" sweep
will otherwise miss 80 lines.

### 1d. §13 fee benchmark bands published on-site

| file:line | verbatim (abridged) | verdict |
|---|---|---|
| `content/blog/what-is-a-cis-accountant.md:23, :31, :126, :130-131` | `"Monthly fee benchmarks: CIS-return-only sole trader from £20 to £50 per month; full-service sole trader £80 to £150; limited company full service £150 to £250 or more."` | **licensed**, §13 locks exactly these bands, and `:126` carries "These are market benchmarks" | |
| `content/blog/what-is-a-cis-accountant.md:117` | `"the cost of a specialist (who charges £80 to £150 a month...)"` | **permitted-but-unsourced**: stated flatly inside the sentence, the caveat sits nine lines below at `:126` | |
| `content/blog/cis-for-limited-companies-eps-reclaim.md:187` | `"Trade-reported market ranges put full-service limited-company fees at roughly £150 to £250 a month...; that is a market range rather than a published rate"` | **TD-03 IS ALREADY FIXED.** The caveat is present. LIVE_DEFECTS still lists TD-03 as open; that entry is stale. | |
| `content/blog/bookkeeper-cost-self-employed-tradesperson.md:18,21,29,51,62,63,162` | `"Trade-reported... These are market observations, not quoted prices"` | licensed (§13 caveat present) | |

### 1e. Cleared

`src/lib/calculator-schema.ts:29` `offers: { price: "0", priceCurrency: "GBP" }` = the free-tool
exemption, correct. All 221 `£N a month|year` hits other than those above are third-party software
pricing (QuickBooks, Xero, Sage, FreeAgent, BrightPay, Nomi, Clear Books), NICEIC/NAPIT scheme
fees, trade-pricing guides for the reader's own quoting (rewires, EICRs, consumer units), or
worked CIS tax examples. `aggregateRating|reviewCount|ratingValue` = **0**.

---

## Rule 2: turnaround, response-time or speed promises

**Answer to the brief's question: NO non-email instance survives on a web surface. But one of the
four "email" instances is misclassified and is a live promise.**

| file:line | verbatim | verdict |
|---|---|---|
| `src/lib/leads/reply-ack.ts:48` | `"Great, thank you{name}. A specialist will call you shortly. Nothing to prepare. Speak soon."` | **BREACH.** The file header at `:1-2` says this is the **"Post-YES SMS/WhatsApp ack"** (comment at `:45`: "Under 160 chars"). It is **not an email valediction**: it is an outbound SMS, and "a specialist will call you shortly" is the same substantive timing promise closed as TD-14b on two web pages the same day. The "email valediction is not a promise" judgement does not reach it. Highest-severity open rule-2 item. |
| `src/lib/leads/reply-ack.ts:181` | `signoff: "Speak soon, the team at Trade Tax Specialists"` | out of scope by the standing judgement (email valediction) |
| `src/lib/leads/aux-cron.ts:164` | `` SIGNOFF = `Speak soon, the team at ${COMPANY}` `` | out of scope (email valediction) |
| `src/lib/leads/reply-ack.ts:7` | `"...confirming a human will call shortly"` | **code comment** |

All 20 hits of the hard pattern were read in context. None is a web-surface promise:

- statutory / third-party: `privacy-policy:186` ("respond within one month" = the UK GDPR DSAR
  deadline); `privacy-policy:136` (48-hour pool re-offer, a disclosure, not a promise);
  `glossary/[slug]/data.ts:739` (HMRC's 25-working-day EPS repayment target, locked in §11a);
  `how-long-does-cis-refund-take.md:58` ("Same day" = HMRC's SA filing step);
  `landlord-electrical-safety-checks-pricing.md:84` (advice to the reader about quoting).
- internal/operator-only: `lib/leads/handoff.ts:149` ("Response time" row in the operator handoff
  email); `lib/leads/nurture-health.ts:12,114,151`; `config/lead-nurture.ts:280` and
  `aux-cron.ts:308` ("same-day SMS" = send-window naming); `admin/analytics/trends/page.tsx:84`;
  `api/cron/lead-nurture-digest/route.ts:3`; `api/leads/booking-viewed/route.ts:3`.
- code comments recording the fix: `InlineMiniLeadForm.tsx:11,13`; `service-tiers.ts:69`;
  `blog-cta-map.ts:15`.

**Guard gap:** there is no test asserting the class stays closed. `src/tests/design/` has
`penalty-figures.test.ts` (TD-08 only). A regression of TD-13/14/14b/14c would ship silently.

---

## Rule 3: contingent-fee / no-win-no-fee idioms

**Clean. 0 breaches, 0 dormant, 0 licensed.** Pattern over the full scope returned 0 after the
false positives were read: `cost-to-qualify-electrician-self-employment.md:21` ("almost no fee
cost" = apprenticeship training), `pricing-house-rewire-electrician.md:88` ("contingency for what
the floorboards are hiding"), `self-employed-electrician-rates.md:45` ("Fixed price" = the
reader's own quoting). Consistent with §12.B, which positions the site against the RIFT
rebate-factory model.

---

## Rule 4: client-behaviour, client-count or aggregate-outcome claims

| file:line | verbatim | verdict | rendered? |
|---|---|---|---|
| `src/app/page.tsx:411` | `"...these are things a generalist accountant handles occasionally. We deal with them every week across a large CIS client base."` | **BREACH, in no TD entry.** An aggregate claim about our own client base, on the homepage. Confirmed rendered (`curl localhost:3261/` returns `large CIS client base`). Per `PROPERTY_STANDARD_ROLLOUT.md` §I: "No claims of clients/customers/served/advised (no client records exist anywhere in the estate)". | **yes, homepage** |
| `src/data/trade-types.ts:252` | `"For most groundworkers, the refund covers our fee many times over in the first year."` | **BREACH, in no TD entry.** Two rules at once: an aggregate client-outcome claim ("for most groundworkers") and a fee/value claim about our own service ("our fee"). Identical shape to TD-04, which listed only the blog instance. Confirmed rendered on `/for/groundworkers`. | **yes** |
| `src/config/lead-nurture.ts:342` | `"Most trades we speak to had a question just like yours..."` | breach (TD-12, still open), outbound SMS | yes (outbound) |
| `content/blog/allowable-expenses-cis-subcontractor.md:285` | `"For most clients the refund more than covers the cost of the accountant."` | breach (TD-04, still open) | yes |
| `src/app/locations/[slug]/data.ts` (13 lines: `:72`, `:225`, `:377`, `:1461`, `:1531`, `:1609`, `:1844`, + 6) | `"We act for London subcontractors from an entirely remote service: you send us your CIS300 deduction statements, we do the rest."` | **owner-gated, new class.** Not a client-count or outcome claim, so not a rule-4 breach on its face; it is a service-delivery claim that the pool model contradicts (we do not act for anyone; the enquiry goes to independent firms). Same defect family as TD-18. **Scale: 64 lines** matching `we act for\|we do the rest\|you send us\|we file your\|we submit\|we handle\|we manage\|we review your` across `trade-types.ts` (~55 of them), `locations/[slug]/data.ts`, `page.tsx`, `services/page.tsx`, `gross-payment-status/page.tsx`, `service-tiers.ts`, `page-summaries.ts`, `blog-cta-map.ts`. Recorded as one aggregated row, not 64, because it is one positioning decision. | yes |

**Client counts: 0.** `[0-9]{2,}\+? (clients|subcontractors|contractors|customers|trades)` returns
only third-party descriptions of a reader's own business.

**"most businesses qualify" shape: 0.** Pattern
`most [a-z ]{0,20}qualify|you will probably qualify|most [a-z ]{0,20}are eligible` = **0 hits**.

**Licensed, do not re-file (≈14 surfaces).** "Most subcontractors are owed a refund" and its
variants at `src/app/page.tsx:70`, `src/data/trade-types.ts:24` and `:97`
("Most plumbers/electricians are owed money back", `metaDescription`),
`cis-refund/page.tsx:91`, `content/blog/what-is-cis.md:176`, `mtd-income-tax-cis.md:147`,
`how-long-does-cis-refund-take.md:44`, `cis-back-years-refund-guide.md:21,180`,
`eicr-certificates-pricing-guide.md:49`, `trade-take-home-calculator.ts:208`,
`niche.config.json` sticky copy. Licensed by **house_positions §9**, verbatim:

> "registered subcontractors very commonly **overpay** across the year and are due a **refund**"

and its writing rule: *"explain that over-deduction arises because CIS is taken on labour (§1)
before expenses and allowances, so most registered subcontractors are owed money."* It is a
statement about scheme mechanics, not about our clients. Correct as published.

Also cleared: `content/blog/what-is-cis.md:47` and `does-tradesperson-need-bookkeeper.md:39`
("pays for itself") describe accountants generally, not our fee against our clients' refunds.

---

## Rule 5: statistics not re-derivable from house_positions.md (accuracy and expiry)

### 5a. Expiry / stale-rate re-check, re-run this pass

`grep -rniE '8\.75%|33\.75%|13\.8%|£9,100|45p|£85,000|116\.75|super.deduction|RDEC'` = **22 lines,
0 breaches.** Every hit is explicitly framed as superseded, and
`cis-national-insurance-guide.md:187` actively warns the writer off the old figures. §11 / §11a
figures (dividend 10.75/35.75/39.35, AMAP 55p/25p, employer NIC 15% above £5,000, Class 4 6%/2%,
VAT £90,000, SSP £123.25, MTD £50,000/£30,000, CIS 0/20/30, GPS £30,000/£100,000) all correct.
BADR, super-deduction, RDEC, 12.5% hospitality VAT: 0 hits each, deliberately omitted per the
house positions Source index.

### 5b. The §13 refund figure

159 lines carry `£2,000`; 20 more carry `GBP 2,000`. The overwhelming majority are **worked CIS
examples** (a £2,000 invoice, £2,000 of deductions, a £2,000 capital-goods VAT limit) and are not
claims at all.

- **Breaches: 0 remaining.** TD-10 (10 city pages), TD-11 (7 surfaces), TD-33 (33 `/for/` stat
  tiles) and TD-35 (4) are all verified closed by re-grep: no surviving `our clients` /
  `client base` / `we see` / `first-year clients` framing of the figure.
- **Permitted-but-unsourced (§13 framing met, attribution missing) - the TD-34 tier, confirmed
  and line-corrected:** `src/lib/support/faq.ts:54`; `src/app/glossary/[slug]/data.ts:68`;
  `src/app/page.tsx:149` ("This is a typical illustrative figure, not a guarantee for any
  individual"); `src/app/locations/[slug]/data.ts:910`, `:1062`, `:1140`, `:1218`, `:1754`
  ("typical", unattributed); `content/blog/how-much-cis-refund-will-i-get.md:20`, `:29`;
  `content/blog/what-is-a-cis-accountant.md:20`; `content/blog/cis-mistakes-that-cost-subcontractors.md:108`;
  and ~10 further blog lines. **TD-34's line numbers have drifted by 8 in
  `locations/[slug]/data.ts`** (it lists `:918, :1070, :1148, :1226, :1762`; the instances are now
  `:910, :1062, :1140, :1218, :1754`). Same instances, edited file. **TD-34's second list
  (`:84, :163, :237, :311, :389, :1457, :1531`, described as the "illustrative" set) does not
  resolve at all**: those lines are mileage-expense answers. The genuine "illustrative, not
  guaranteed" lines in that file (`:464, :608, :765, :840, :992, :1296, :1523, :1675`) all carry a
  market/third-party attribution and are therefore licensed, not part of the residual tier.
  Licensed framing, §13: *"present every figure here as typical / illustrative, not guaranteed"*.
  Missing half: *"and attribute the refund average appropriately"*.
- **Licensed and fully attributed:** `content/blog/how-much-cis-refund-will-i-get.md:435, :479`
  (names Dearne Accountancy); `cis-vs-paye.md:185` ("industry figures, not a guarantee");
  `cis-mistakes-that-cost-subcontractors.md:42, :90`; `niche.config.json:24, :345`;
  `page.tsx:38, :187`; `cis-refund/page.tsx:10, :88`; `page-summaries.ts:30, :34`;
  `cis-refund-estimator.ts:130, :138`; 10 `locations` answers; 33 `/for/` tiles.
- **The GBP-representation instance:** `scripts/resources/builders/cis-refund.ts:264` and `:316`,
  `"Typical CIS refund is GBP 2,000 to GBP 3,000 for registered subbies"` inside the **generated
  downloadable spreadsheet**. It IS caveated at `:317` ("This is for content purposes only and is
  not guaranteed"). **Verdict: permitted-but-unsourced.** Recorded because it is a user-facing
  artefact that no `£` sweep and no `src/` sweep reaches.

### 5c. Statutory figures still wrong on-site (rule 5, accuracy)

| file:line | claim | house position | verdict |
|---|---|---|---|
| `src/app/glossary/[slug]/data.ts:518` | s.62B at "20% of the sums treated as paid on a return" | §3: *"The two quanta differ: s.62A = 20% of the payment; s.62B = the full sum returned. Never write '20%' for s.62B."* | **breach, TD-08 still open.** Note `:549` of the same file states it correctly ("100% of those sums"), so the file contradicts itself. |
| `src/app/glossary/[slug]/data.ts:359`, `:377`, `:432` | CIS300 12-month tier as "£300 or 100% of the CIS liability" | §4: 12-month tier is £300 or **5%**; the 100% layer applies only to deliberate withholding | **breach, TD-09 still open**, 3 surfaces |

---

## Rule 6: the fabricated "30% of the tax lost" director penalty and the "Finance Bill 2026" misattribution

Every location, verified. There are **four** copy locations plus one guard test, not more:

| file:line | status |
|---|---|
| `src/app/gross-payment-status/page.tsx:47-49` | **FIXED this pass** |
| `src/app/gross-payment-status/page.tsx:198` ("Finance Bill 2026") | **FIXED this pass** |
| `src/app/services/page.tsx:46` | **FIXED this pass** |
| `src/lib/calculators/tools/cis-gps-eligibility-checker.ts:157` | **open, deliberately untouched** (Phase 4 planner owns this file) |
| `src/lib/calculators/tools/cis-gps-eligibility-checker.ts:169` | **open, deliberately untouched** (Phase 4 planner owns this file) |
| `src/tests/assistant-journey-opener.test.ts:706` | guard test, watches the WRONG surface (TD-07, open) |

No other instance exists. `grep -rniE '30% of the tax|30 per cent of the tax|tax HMRC considers lost'`
over the full scope = 2 remaining (both the checker). `grep -rn 'Finance Bill'` = 0 outside the
test. `src/app/glossary/[slug]/data.ts:549` mentions "not a percentage of any tax HMRC considers
lost" and is a **correct negation**, not an instance.

### The fix

**Old** (`gross-payment-status/page.tsx:47-49`):
> title: "Director liability up to 30%"
> body: "Finance Bill 2026 ss.62A/62B allow individual directors to face penalties of up to 30% of the tax HMRC considers lost due to fraudulent transactions. The liability reaches the individual, not just the company."

**New:**
> title: "Knowledge-based penalties and officer liability"
> body: "Finance Act 2026 inserts FA 2004 ss.62A and 62B. A person who makes a payment under a construction contract knowing, or having reason to know, that a connected party has deliberately failed to comply with CIS faces a penalty of 20% of that payment (s.62A). Where a return is made in that same knowledge, the liability is an amount equal to the whole sum the return treats as paid (s.62B). Where a company is penalised, HMRC can pursue an officer personally under the officer-liability rules, including a decision notice under FA 2004 s.72B requiring an officer to pay up to 100% of the company's s.72A penalty."

**Old** (`gross-payment-status/page.tsx:198`): "Finance Bill 2026 introduced a tougher GPS regime"
**New:** "Finance Act 2026 introduced a tougher GPS regime"

**Old** (`services/page.tsx:46`): "Director liability under Finance Bill 2026 ss.62A/62B reaches up to 30% of the tax lost."
**New:** "Finance Act 2026 inserts FA 2004 ss.62A/62B: a payment made in the knowledge of a deliberate CIS failure carries a penalty of 20% of that payment, and a return made in that knowledge carries a liability equal to the whole sum the return treats as paid."

**Justification, quoted verbatim from `house_positions.md` §3:**

> "**NEVER state a '30% of tax lost' director penalty under ss.62A/62B** - no 30% figure appears in
> either section. Where a company's deliberate behaviour produces penalties, HMRC can pursue
> **officers personally under the existing officer-liability rules**; keep general director-liability
> framing percentage-free. **Exception (added 2026-06-12):** a page MAY cite a precise statutory
> officer-liability mechanism where it names the section and states it accurately - e.g. FA 2004
> **s.72B** (inserted by FA 2026) allows HMRC to issue a decision notice requiring a company officer
> to pay **up to 100% of the company's s.72A penalty** (verified at legislation.gov.uk)."

and, for the two quanta:

> "A person who **makes a payment under a construction contract** knowing, or having reason to know,
> that a connected party has **deliberately failed to comply** with CIS obligations is liable to a
> penalty of **20% of the payment** (s.62A)... For **returns** made in the knowledge of deliberate
> failures, the liability is **an amount EQUAL TO the sum the return treats as deducted and paid**...
> **The two quanta differ: s.62A = 20% of the payment; s.62B = the full sum returned.**"

and, for the Bill/Act correction:

> "**Finance Act 2026 (c. 11, Royal Assent 18 March 2026)**... Write 'Finance Act 2026' everywhere;
> never 'Finance Bill 2026' or 'direction of travel' hedging."

No statute research beyond house positions was needed: §3 settles both the ban and the permitted
replacement, and both replacements use only mechanisms §3 verifies at legislation.gov.uk.

---

## Per-rule pattern and hit-count proof

Scope for every count: `src content ../niche.config.json scripts`, `.test.*` excluded, run from
`construction-cis/web`.

| rule | pattern | hits | breaches | owner-gated | licensed / third-party / internal | dormant |
|---|---|---|---|---|---|---|
| 1 | `priceRange` | 0 (src) / 1 (shared kit) | 0 site-side | 0 | 0 | 0 |
| 1 | `fixed[- ]fee\|fixed fees\|quoted before we start\|no surprises on the bill\|Fixed fees, plain English` | 16 | 12 | 12 | 4 (§13-caveated blog bands) | 0 |
| 1 | `£[0-9,]+ ?(a \|per \|/)(month\|mo\|year\|annum)` | 221 | 0 | 0 | 215 (3rd-party software, scheme fees, reader pricing, §13 bands, worked examples) | 6 |
| 1 | `(from\|starting at\|starts at\|as little as) £[0-9]` | 36 | 0 | 0 | 34 | 2 |
| 1 | `free (call\|review\|consultation\|quote\|15)\|no.obligation` | 80 | 0 | **80** | 0 | 0 |
| 1 | `GBP [0-9]` | 20 | 0 | 0 | 18 worked examples | 0 (2 are §13, see rule 5) |
| 1 | `aggregateRating\|reviewCount\|ratingValue` | 0 | 0 | 0 | 0 | 0 |
| 2 | `same[- ]day\|within (24\|48\|72) ?hours\|24[- ]hour\|next working day\|respond within\|reply within\|get back to you within\|response time\|response guarantee\|one working day` | 20 | 0 | 0 | 20 (statutory, HMRC targets, internal, comments) | 0 |
| 2 | `be in touch shortly\|call you shortly\|in touch soon\|contact you shortly\|reply shortly` | 1 | **1** (`reply-ack.ts:48`, outbound SMS) | 0 | 0 | 0 |
| 3 | `no win\|no[- ]win[- ]no[- ]fee\|success fee\|only pay if\|contingency fee\|percentage of your refund\|cut of your refund\|we only get paid` | 0 | 0 | 0 | 0 | 0 |
| 4 | `our clients\|client base\|most (of our )?clients\|we have (helped\|saved)\|trusted by\|covers our fee\|most [a-z]+ we speak to` | 11 | **4** (`page.tsx:411`, `trade-types.ts:252`, TD-12, TD-04) | 0 | 7 (reader's clients, research prose) | 0 |
| 4 | `most [a-z ]{0,20}qualify\|you will probably qualify\|most [a-z ]{0,20}are eligible` | 0 | 0 | 0 | 0 | 0 |
| 4 | `we act for\|we do the rest\|you send us\|we file your\|we submit\|we handle\|we manage\|we review your` | 64 | 0 | **64** | 0 | 0 |
| 5 | `£2,000\|GBP 2,000` | 179 | 0 | 0 | ~46 attributed, ~110 worked examples | 0; **~23 permitted-but-unsourced** |
| 5 | `8\.75%\|33\.75%\|13\.8%\|£9,100\|45p\|£85,000\|116\.75\|super.deduction\|RDEC` | 22 | 0 | 0 | 22 (all framed historic) | 0 |
| 5 | statutory accuracy (TD-08, TD-09) | 4 | **4** | 0 | 0 | 0 |
| 6 | `30% of the tax\|tax HMRC considers lost` | 2 (after fix) | 2 (Phase 4 owns) | 0 | 0 | 0 |
| 6 | `Finance Bill 2026` | 0 (after fix) | 0 | 0 | 1 test title | 0 |

**Headline totals.** Breaches **11**: rule 2 x1 (`reply-ack.ts:48`), rule 4 x4, rule 5 x4
(TD-08 x1, TD-09 x3), rule 6 x2 (both owned by the Phase 4 planner). Owner-gated **156**:
rule 1b x12, rule 1c x80, rule 4 service-delivery x64. Licensed **~14** (§9 population claim) plus
the §13 fee bands and every historic-rate mention. Permitted-but-unsourced **~23** (TD-34 tier
plus the spreadsheet). Dormant **11** (the `packages` CTA variant plus `contact/page.tsx:29`).

---

## What a future sweep should search, established here

1. **Sweep by rule, in every representation, before looking at any file.** Money on this site
   exists in two encodings: literal `£` and ASCII `GBP <n>`. The `GBP` form is not only
   `ExcelPreview.tsx`; it is also `scripts/resources/builders/*.ts`, which **generate the
   downloadable spreadsheets**. `scripts/**` is a user-facing surface and belongs in every sweep
   scope.
2. **Search claim SHAPES, not tokens.** "Fixed fees, no surprises" has no number and no word from
   any pricing pattern, yet it is the same claim as "£24/mo". The productive patterns were
   `quoted before we start`, `no surprises`, `covers our fee`, `client base`, `we act for`,
   `will call you shortly`. Every one of them found an instance no prior TD entry listed.
3. **The same string is duplicated in a paired `title`/`detail` panel across four route files.**
   `blog/page.tsx`, `glossary/page.tsx`, `glossary/[slug]/page.tsx` and `page.tsx:532` carry a
   byte-identical trust panel. Fixing one fixes nothing. Grep the `title:` string, not the file.
4. **`niche.config.json:24` (`description`) is a claim surface.** It feeds `metadata.description`
   AND the `Organization` / `WebSite` JSON-LD `description`. Confirm by grepping the rendered HTML,
   not the TSX.
5. **`src/data/trade-types.ts` and `src/app/locations/[slug]/data.ts` are where claims hide.**
   They are hand-maintained, thousands of lines, per-city and per-trade, and carry the same claim
   in 13 to 64 slightly different wordings. Every count in this port that was later corrected
   upward (6->20->23; 3->13->46) was corrected because one of these two files was swept by token
   rather than read by rule.
6. **Outbound SMS/email copy is in scope and is classified wrongly by default.** `reply-ack.ts`,
   `lead-nurture.ts` and `aux-cron.ts` are not "email valedictions" as a class: read each string
   and ask whether it makes a promise. One of the four "out of scope" rule-2 survivors was an SMS
   making a substantive promise.
7. **Check whether a guard test watches the surface it names.** TD-07 is a green test over the
   wrong array. There is still **no guard at all** for the rule-2 class (23 closed instances) or
   the rule-6 class, so both can regress silently.
8. **Line numbers in the ledger drift.** `service-tiers.ts` fixed-fee is `:35`, not `:38`;
   `locations/[slug]/data.ts` TD-34 lines have moved by 8. Re-derive locations, never trust them.
9. **Re-verify "open" TD entries before acting.** TD-01 (site-side) and TD-03 are already fixed and
   still listed as open.
