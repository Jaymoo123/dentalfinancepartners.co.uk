# R2: independent adversarial CONTENT and INTEGRITY review, crypto design port

Reviewer: R2 (did not build any of it). Scope: published content truth, not design.
Date: 2026-09-14. Build under review: commit `666ab0a2`, served at `http://localhost:3174`.

---

## 0. Server identity and age proof

```
curl -s http://localhost:3174/ | grep -o '<title>[^<]*</title>'
  -> <title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>   PASS
grep -c '<header' home.html      -> 1    PASS (the port's chrome is present)
grep -c 'within 24 hours' home.html -> 0 PASS
grep -l 'within 24 hours' pages/*.html | wc -l -> 0 across all 54 fetched pages
```

Corpus enumerated programmatically:

```
curl -s http://localhost:3174/sitemap.xml | grep -o '<loc>[^<]*</loc>'   -> 51 URLs
find crypto/web/src/app -name page.tsx                                    -> 24 route families
```
51 sitemap URLs + 3 served-but-unlisted routes (`/book`, `/complete`, `/thank-you`) = **54 pages
saved** to the session scratchpad (`pages/*.html`). `/embed/[slug]` and `/admin/*` excluded.
Source corpus: 19 `.md` under `crypto/web/content/` (frontmatter included), all `.ts`/`.tsx`
under `crypto/web/src/` except tests, and `crypto/niche.config.json`.

**Counting method.** All rendered findings are reported as **per-page presence**
(`grep -l … pages/*.html | wc -l`, counting files), never `grep -c`, because Next.js
serialises DOM text a second time into the RSC flight payload and `grep -c` overcounts.

---

## FINDINGS

### BLOCKING

#### C1. A worked example publishes £2,136 of CGT on a £2,400 gain (89% effective rate)

- URL: `/blog/defi-and-complex-transactions/crypto-backed-loans-collateral-disposals` — **1 of 54 pages**
- File: `crypto/web/content/blog/crypto-backed-loans-collateral-disposals.md:153`
- Published verbatim (table row):

  > **Taxable gain (if AEA already used, basic-rate taxpayer with £10,000 remaining band)**
  > £2,400 · £10,000 at 18% = £1,800 · £1,400 at 24% = £336 · total CGT = £2,136 approx.

- The table above it derives: proceeds £3,200, allowable cost £800, **gross gain £2,400**.
  The row then taxes £10,000 at 18% and £1,400 at 24% — the split for an £11,400 gain that
  does not exist anywhere in the example. With a £10,000 remaining basic-rate band the whole
  £2,400 sits inside the band: **correct answer is £2,400 × 18% = £432**. The page publishes
  **£2,136, five times the true figure**, on the copy a reader trusts most.
- MEASURED. Deriving command:
  `grep -n "2,136" crypto/web/content/blog/crypto-backed-loans-collateral-disposals.md`
  `grep -l "2,136" pages/*.html`
- This is the same defect class phase 0 fixed on the staking and swaps posts; the sweep did
  not reach this file.

#### C2. The staking worked example measures the basic-rate band against GROSS salary — the exact error phase 0 fixed in the CGT tool

- URL: `/blog/staking-mining-and-airdrops/staking-rewards-tax-two-step` — **1 of 54 pages**
- File: `crypto/web/content/blog/staking-rewards-tax-two-step.md:97` (and :169 downstream)
- Published verbatim:

  > She is a basic-rate taxpayer with **£25,000 of salary, leaving £12,700 of her basic-rate
  > band unused (£37,700 band ceiling minus £25,000 salary)**.

- `rates_ledger.json` key `basic_rate_band_ceiling` is explicit: *"**taxable income** ceiling
  of the basic-rate band"*. £25,000 salary minus the £12,570 personal allowance = £12,430 of
  taxable income, so the remaining band is **£25,270, not £12,700** — understated by £12,570.
- The site's own calculator contradicts the blog on identical inputs. The CGT estimator's
  default render (income £25,000) prints **"Basic-rate band remaining £25,270"**:
  `grep -o '£25,270' pages/calculators_crypto-cgt-estimator.html`
- Downstream at line 169 the article publishes *"her remaining basic-rate band, £10,350 once
  the £2,350 of taxable staking income has used part of it"* — internally consistent with
  £12,700, therefore also wrong.
- MEASURED. Deriving command:
  `grep -rnoE '.{160}37,700.{160}' crypto/web/content crypto/web/src` — every other one of the
  six occurrences correctly says "taxable income"; this file is the only "salary".

---

### MAJOR

#### C3. "No sign-up, no data stored" is published beside four pages that store name, phone and email

- URL: `/` — **1 of 54 pages** (the claim); the pages it describes: 4 calculator URLs
- File: `crypto/web/src/app/page.tsx` (Free tools section)
- Published verbatim: *"They never produce a filing-ready figure. **No sign-up, no data stored.**"*
- Every calculator page carries **two** lead-capture forms (`MiniCapture` after the result and
  a second panel after the FAQs) which POST name / phone / email / message to Supabase via
  `/api/leads/submit`, and every page also fires first-party analytics events to `/api/track`.
- MEASURED:
  `grep -l "no data stored" pages/*.html` -> 1 (index.html)
  `grep -l 'name="email"' pages/calculators_*.html` -> 4 of 4
- Defect: a categorical privacy claim that the site's own privacy policy (§2 "Enquiry forms")
  and cookie policy (§1 "First-party analytics") both contradict.

#### C4. The homepage advertises a penalty estimator; the tool deliberately refuses to estimate penalties

- URLs: `/` and `/blog/hmrc-disclosure-and-compliance/hmrc-crypto-nudge-letter-what-to-do` — **2 of 54 pages**
- Files: `crypto/web/src/app/page.tsx` (calculators card);
  `crypto/web/content/blog/hmrc-crypto-nudge-letter-what-to-do.md` (two link texts)
- Published verbatim: *"**Crypto disclosure and penalty estimator** — Estimate the tax and
  **potential penalty exposure** from unreported crypto gains, by behaviour band."*
- The tool is named **"Crypto Disclosure Scope Estimator"** everywhere else (page H1, nav,
  footer, `<title>`, JSON-LD `WebApplication.name`) and, per house position 31 and the phase 0
  fix, now asserts **no penalty percentages at all**:
  `crypto/web/src/lib/calculators/tools/crypto-disclosure-estimator.ts:9` — *"this tool states
  the penalty position in words and links out. It does not compute a penalty figure."*
- MEASURED: `grep -l "disclosure and penalty estimator" pages/*.html` -> 2.
  Two defects in one: a promised output that does not exist, and a tool name that disagrees
  with itself across the site.

#### C5. "Read by a specialist" is contradicted by the site's own privacy policy (PORT-INTRODUCED)

- URL: `/` — **1 of 54 pages**. Sibling wording on `/services` — **1 of 54**.
- Files: `crypto/web/src/app/page.tsx:736`; `crypto/web/src/app/services/page.tsx:63`
- Published verbatim:
  > **Read by a specialist** — Your enquiry goes to someone who works on crypto tax, not a call centre
  > **Reviewed by a crypto tax specialist, not a generalist**
- I traced the machinery rather than grepping `crypto/web` (per the wrongful-deletion rule).
  The mechanism is ESTATE-CENTRAL and real: `Property/web/src/lib/leads/offer-send.ts` is
  DB-driven and source-agnostic, grading runs through Anthropic on the Vercel AI Gateway, and
  Companies House enrichment is Property-side. A site-local grep proves nothing, and I am not
  calling the pool absent.
- The defect is that **crypto's own `/privacy-policy` §5 says the opposite of the proof point**:
  - *"up to **three** firms in **related professions, such as mortgage and finance brokers,
    independent financial advisers, solicitors and specialist consultants**, may also take it up"*
  - *"**If no firm in the profession your enquiry concerns takes it up within 48 hours**, we may
    offer it instead to firms in the related professions above"*
  - *"your enquiry may be passed **after seven days to a single firm as part of a batch**"*
  - and the first thing that reads the enquiry is an LLM, not a person
- So "goes to someone who works on crypto tax" is a claim the site itself documents as not
  guaranteed. This copy replaced a "24-hour response" proof point in this port and has never
  been reviewed. **Answer to the brief's direct question: no, it is not defensible as written.**
- INFERRED on partner-network composition (I cannot read the buyers table read-only); MEASURED
  on the privacy-policy contradiction.

#### C6. "We confirm your exact figures" promises a deliverable on four calculator pages

- URLs: all four `/calculators/*` — **4 of 54 pages**
- Files: `crypto/web/src/components/calculators/CalcResultCta.tsx:21`;
  `crypto/web/src/app/calculators/[slug]/page.tsx:159`
- Published verbatim: *"A calculator gives you the shape of the answer. **We confirm your exact
  figures, the reliefs you can claim, and what you need to file.** No obligation."*
- Three problems: "exact" is an unqualified accuracy promise on a site whose `/terms` §3
  disclaims all warranty of accuracy; "we" performs work the site does not perform (a partner
  firm does); and `/terms` §2 states *"No accountant-client relationship is created by your use
  of this Site **or submission of an enquiry form**"*, which this sentence contradicts at the
  moment of the enquiry form. PORT-INTRODUCED (`CalcResultCta.tsx` rewritten in this port).
- MEASURED: `grep -l "We confirm your exact figures" pages/*.html` -> 4.

#### C7. Negligible-value backdating is repeatedly published as a "four-year window"

- URL: `/blog/crypto-cgt-and-disposals/lost-crypto-exchange-collapse-negligible-value` — **1 of 54 pages**
- File: `crypto/web/content/blog/lost-crypto-exchange-collapse-negligible-value.md`, lines
  36, 38, 105, 141, 176, 180 — and it is also asserted inside the `HowTo` JSON-LD, so it is
  machine-readable:

  > *"A negligible value claim can be **backdated** to an earlier date if the asset was already
  > worthless then, **within the four-year claim window**."* (HowTo step 2)
  > *"…or **backdated within the four-year window**."* (HowTo step 3)
  > *"if a rug pull happened in the 2022/23 tax year but you are only now getting your tax
  > affairs in order, you may be able to backdate the claim…"* (line 105, operational advice)

- The ledger's `capital_loss_claim_window` = 4 years is the **loss-claim** time limit. The
  **negligible-value backdating** limit is a different statutory rule (TCGA 1992 s.24(2):
  the claim may specify a time no earlier than two years before the start of the tax year of
  claim). The article conflates the two and turns the conflation into dated advice.
- **INFERRED, not measured**: `house_positions.md` positions 19-21 and the ledger are silent on
  backdating, so the claim is asserted beyond this site's ground truth and cannot be derived
  from it. Re-verify at HMRC CG13131 / s.24(2) before the gap-fix wave edits it, and add the
  answer to the ledger either way.
- Deriving command: `grep -n "backdated\|four-year" crypto/web/content/blog/lost-crypto-exchange-collapse-negligible-value.md`

#### C8. A named third party's product defaults are asserted as fact and as a client quotation

- URL: `/` — **1 of 54 pages** each
- Files: `crypto/web/src/app/page.tsx:105` and `:204`
- Published verbatim:
  > *"FIFO, LIFO, and specific-identification (**defaults in Koinly, CTC and other US-built
  > tools**) are wrong for UK purposes."*
  > *"…**Koinly had used FIFO** for a large ETH disposal in a year I had been buying frequently."*
- This is a specific, checkable claim about a named commercial product's default behaviour,
  made in our own voice and repeated inside a testimonial. Koinly ships a UK/HMRC cost-basis
  setting that applies s104 with same-day and 30-day matching. The rest of the site is careful
  here (`crypto-same-day-30-day-rules-worked-example.md`: *"Even software that advertises UK
  support **may** implement the 30-day rule with known gaps"*), so this is the outlier.
- INFERRED on Koinly's current default (not verifiable offline); MEASURED that the site
  contradicts itself on how strongly to put it. Commercial-disparagement exposure on a page
  whose service is literally named "Koinly and Recap Reconciliation".
- **Pre-dates the port** (`git blame` -> `a516e497e`, 2026-07-14 launch core), not port copy.

---

### MINOR

#### C9. `metaDescription` says CARF reporting runs "from 2026"; every body on the site says 2027

- URL: `/blog/crypto-cgt-and-disposals/how-crypto-is-taxed-uk` (search-results copy, `<meta name="description">`)
- File: `crypto/web/content/blog/how-crypto-is-taxed-uk.md:8`
- Verbatim: *"CGT on disposals, income tax on earned tokens, **CARF reporting from 2026**."*
- Ledger: collection from 1 Jan 2026, **first report** between 1 Jan and 31 May **2027**. The
  same file's body (line 152) and keyTakeaway (line 15) both state it correctly. House position
  24 requires the dates be stated precisely. Same quantity, two values.

#### C10. The research data file still asserts an annual update cadence

- File: `crypto/web/src/data/uk-crypto-tax-gap-index.json`, `meta.description`:
  *"**Updated annually on FCA wave publication.**"*
- Phase 0 removed the false cadence from the rendered page and the fix **held**
  (`grep -li "updated annually" pages/*.html` -> **0 of 54**), but the string survives in the
  data file, one render binding away from republishing a promise nobody keeps. Latent, not live.

#### C11. An expired worked deadline is published as live guidance

- File: `crypto/web/content/blog/lost-crypto-exchange-collapse-negligible-value.md:29` (FAQ, and
  therefore also in the `FAQPage` JSON-LD)
- Verbatim: *"a loss that arose in the 2021/22 tax year (ending 5 April 2022) **must normally be
  claimed by 5 April 2026**."* Arithmetic correct; the date passed five months ago, so a reader
  today is handed a window that has already closed as if it were open.

#### C12. "from 2018-19 onwards" understates exposure for the deliberate band

- Files: `crypto/web/content/blog/carf-crypto-reporting-2026-explained.md:36` (HowTo JSON-LD
  step) and `:124`
- Verbatim: *"Determine which tax years **from 2018-19 onwards** involved disposals… that were
  not reported."* The same site publishes a 20-year deliberate look-back (house position 31),
  which from 2026/27 reaches 2006/07. The year floor should be behaviour-driven, not fixed.

#### C13. `/privacy-policy` §3 has a grammatical antecedent error introduced by the crypto rewrite

- File: `crypto/web/src/app/privacy-policy/page.tsx:97`
- Verbatim: *"to pass it to regulated firms in our specialist partner network so that **it** can
  provide the advice you have requested."* Should be "they". Property's equivalent line reads
  *"so that you can be connected with the specialist property tax help you have asked for"*.
  Legal-copy hygiene on the page a regulator reads first.

#### C14. Ground-truth gap: the cETN / ISA claims sit outside `house_positions.md` and the ledger

- File: `crypto/web/content/blog/crypto-isa-etn-uk-tax.md`, lines 10, 13, 15, 23, 27
- Two dated regulatory claims are load-bearing on that page and are in none of the ground-truth
  documents: *"FCA-approved crypto Exchange Traded Notes became available to UK retail investors
  **on 8 October 2025**"* and *"**From 6 April 2026**, cETNs are reclassified as qualifying
  investments within the **Innovative Finance ISA**"*. Both match my own knowledge, so I am not
  calling them false — but the site cannot check itself against them. Add ledger keys.

---

## OWNER DECISIONS, not defects

#### O1. "We are specialist tax accountants" vs `/terms` §2
`/about` publishes, in the first person: *"**We are specialist tax accountants** for UK
cryptoasset holders"* (`crypto/web/src/app/about/page.tsx:66`), while `/terms` §2 publishes
*"No accountant-client relationship is created by your use of this Site or submission of an
enquiry form"* and `/privacy-policy` describes the actual model (enquiries routed to third-party
firms). The `<title>` on every page carries "Specialist UK Crypto Tax Accountants" and the
JSON-LD claims `@type: ["ProfessionalService","AccountingService"]` — **54 of 54 pages carry an
"accountants" string** (`grep -li "tax accountants" pages/*.html | wc -l` -> 54).
`house_positions.md` "Presentation rules" says *"No credential claims… authority comes from cited
HMRC sources… never from claimed qualifications"*. This is estate-wide framing (Property's own
`niche.config.json` description reads "Specialist property accountants"), so it is an estate
positioning decision, not a crypto-port regression. Flagging the `/about` first-person form as
the sharpest instance.

#### O2. Testimonials on a site that has never been live
`/` publishes three quotes under **"Real outcomes / What clients say"** with the disclaimer
*"**Composite accounts based on patterns across our client base.** Names, amounts and specific
details anonymised. **The compliance situations described are real.**"*
(`crypto/web/src/app/page.tsx:654-659`, **1 of 54 pages**). This is estate house style — Property
runs `TestimonialsSection` with *"Anonymised feedback from landlords and investors we have worked
with"* — and crypto's disclosure is actually the more honest of the two. It pre-dates the port
(`a516e497e`). The open question is only whether "our client base" and "the compliance situations
described are real" can be stood behind on a site that has not launched.

#### O3. The three homepage behaviour claims the port flagged
All three confirmed present, all three **pre-date the port** (`git blame` -> `a516e497e`):
- *"Many DIY returns omit hundreds of swap events entirely"* (**1 of 54**) — unsourced, not
  falsifiable; the directional half is HP3/HP6 territory, "hundreds" is not.
- *"The four errors most DIY crypto returns contain"* (**1 of 54**) — a frequency ranking with no
  source. "most" is doing work no cited document supports.
- *"We work with them every week"* (**1 of 54**) — the only one of the three that is a claim about
  **our own trading volume**, and the site has never been deployed. This is the one I would call
  not merely unsourced but unable to be true today.
My own sweep (`grep -rnoE '\b(most|many|usually|typically|often|always|never|widens|grows|rises|
every week|the majority)\b' src/app/page.tsx src/data/*.ts src/components`) found no fourth of
this class: everything else resolves to a house position (HP3, HP14, HP15, HP16) or is ordinary
hedging. Two further unsourced behaviourals worth an owner glance:
`src/data/crypto-services.ts:38` and `:82` *"Many holders with undeclared gains never converted to
fiat"*, and `src/data/crypto-hubs.ts:228` *"is the most common error"*.

#### O4. "Free" call copy
`/contact`, `/book`, `/complete`, `/services` and the nurture emails publish *"Book your free
review call"*, *"No obligation, free initial reply"*, *"The call takes about 20 minutes"*. "Free"
is a £0 price assertion for our own service, and the call is made by a partner firm, not by us.
This is exact estate parity — `Property/web/src/app/book/page.tsx:37` and
`Property/web/src/components/forms/BookingPicker.tsx:94/162` carry the identical strings — so it
is an estate decision, not a crypto finding.

---

## VERIFIED CORRECT — do not churn these

| # | Checked | Command | Result |
|---|---------|---------|--------|
| V1 | Every JSON-LD block parses | `python ld2.py` over 54 pages | **147 blocks, 0 unparseable**. No `[object Object]` payload anywhere. |
| V2 | Every `FAQPage` answer has a verbatim on-page counterpart | `ld2.py` (alphanumeric-only normalisation, so tag boundaries cannot fake a miss) | **222 answers, 0 missing**. The phase 0 fix of 132 orphaned answers held in full. My first pass reported 4 misses; all 4 were artefacts of my own whitespace normalisation (`<strong>` inserts a space before a comma) and are false positives, not findings. |
| V3 | `BreadcrumbList` names appear on the page | `ld.py` | **0 of 49 breadcrumb lists** have an off-page name. |
| V4 | No `@id` claimed by two different nodes | per-page conflict scan | **0 conflicts across 54 pages.** Exactly one `#organization` node per page; no duplicate Organization. |
| V5 | No `priceRange` | `ProfessionalService` node dump | absent. `WebApplication` offers are `price: "0"` on free tools, which is correct and not a service fee. |
| V6 | Em-dashes in user-facing copy | `grep -l $'—' pages/*.html \| wc -l` | **0 of 54 rendered pages.** Source: 20 em-dashes, **all 20 in code comments** (`checkAuth.ts`, `offer-send`-adjacent lead libs, `BookingPicker.tsx`), which the estate rule exempts. Metric: per-page presence for rendered, per-line `grep -rn` for source. |
| V7 | En-dashes | `grep -l $'–' pages/*.html \| wc -l` and `grep -rno '–' crypto/web/{content,src}` | **0 rendered, 0 in source.** Reported separately from em-dashes as asked. |
| V8 | Turnaround promises, any form | 14-pattern rule sweep over all 54 pages | **0.** The only `N hours` hit is `/privacy-policy`'s 48-hour lead-pool fallback (a mechanism description, estate-frozen) and the only "respond within" is the statutory *"We will respond within one month"* for data-subject rights. The phase 0 removal across 21 source locations / 38 URLs held. |
| V9 | Any fee or price for our own services | rule sweep (`fee\|price\|quote\|per hour\|from just\|£[0-9]\|&pound;[0-9]\|GBP ?[0-9]`) over content, `src/data`, `niche.config.json`, then over all 54 rendered pages | **0.** `"Fixed fee quote if you decide to proceed"` is in the SHARED contact-page default list and crypto **deliberately overrides it** (`src/app/contact/page.tsx:20-23`); `grep -li "fixed fee" pages/*.html` -> **0 of 54**. The override held. The `/` FAQ *"How much does a crypto tax accountant cost?"* correctly declines to publish a figure. |
| V10 | The banned flat-18% presentation (HP2) | `grep -rnoE '.{80}18\s?%.{120}' … \| grep -v 'within\|remaining basic\|basic-rate band\|above it\|24'` | **1 hit, and it is the explicit correction** (*"A common presentation error is to state that basic-rate taxpayers pay a flat 18%… That is wrong."*). Every other one of 27 pages pairs 18% with the band boundary. |
| V11 | Stale-rate probes: `13.8`, `£9,100`, `£12,300`, `£6,000` AEA, `28%`, `20% CGT`, `10% CGT`, `£37,500` | targeted grep over content + `src/data` | **0 stale uses.** The two `13.8% / £9,100` hits are both explicit "this is stale, do not use" corrections (`paying-staff-in-crypto-paye-nic.md:14,76`; `crypto-hubs.ts:385,421`). |
| V12 | CGT estimator band logic | read `src/lib/calculators/tools/crypto-cgt-estimator.ts` + default render | **Correct.** Personal allowance deducted, tapered £1-per-£2 above £100,000, band measured on taxable income. Default render: income £25,000 -> band remaining **£25,270**, gain £10,000 -> £7,000 taxable -> **£1,260** at 18%. Phase 0 fix held. |
| V13 | Staking/mining estimator | read tool + render | **Correct.** 45% starts at £125,140 of taxable income (not £12,570 too low), PA taper modelled, the ~60% taper marginal rate is stated and is arithmetically right (40% + 40%×½). Phase 0 fix held. |
| V14 | Disclosure estimator penalty position (HP31) | read tool | **Correct.** Zero percentages asserted; penalty stated in words with a link to HMRC guidance; years 4 / 6 / 20 correct. Phase 0 fix held. |
| V15 | Investor-vs-trader checker Class 4 NIC | read tool | **Present and correct**: 6% on £12,570–£50,270, 2% above £50,270, in both the result note and the explainer. Phase 0 fix held. |
| V16 | Same-day / 30-day worked example | full arithmetic re-derivation | **Every figure correct.** Same-day 2 ETH @£1,500, 30-day 3 ETH @£1,800, pool 3 ETH @£1,200; gains £1,000 + £600 + £2,400 = £4,000; proceeds £16,000 − cost £12,000 = £4,000; AEA leaves £1,000; £37,700 − £30,000 *taxable* income = £7,700 room; 18% = £180; 24% = £240. The band is correctly framed as taxable income here. |
| V17 | Swaps worked example (phase 0's £1,400 -> £1,200) | re-derivation | **Held and correct.** AEA table 900/1,200/700/600/800 -> £4,200 gains, £1,200 chargeable after £3,000. Rate split: £28,000 taxable income -> £9,700 room; £14,000 − £3,000 = £11,000; £9,700 @18% = £1,746; £1,300 @24% = £312; total **£2,058**. |
| V18 | Staking example income-tax leg (phase 0's £670 -> £470) | re-derivation | **Held.** £2,000 + £1,350 = £3,350; less £1,000 allowance = £2,350 @20% = **£470**. (Only the *band* framing in the same file is wrong — C2.) |
| V19 | Employer NIC example | re-derivation | **Correct.** 15% × (£60,000 − £5,000) = **£8,250**. |
| V20 | Mining example | re-derivation | **Correct.** 0.05 BTC @£40,000 = £2,000 income; @£60,000 = £3,000 proceeds; £1,000 gain; 0.01 BTC @£50,000 = £500; £5,000 − £800 = £4,200. |
| V21 | NFT and DeFi-lending examples | re-derivation | **Correct.** £5,000 − £3,000 = £2,000 @18% = **£360**. (The *other* DeFi post is C1.) |
| V22 | Corporation Tax figures | `grep` + ledger | **Correct** on `/` and `company-crypto-treasury-accounting`: 25% above £250,000, 19% to £50,000, Marginal Relief between, no AEA for companies. |
| V23 | CARF dates estate-wide | figure sweep + research page | **Consistent** everywhere in body copy: collection 1 Jan 2026 – 31 Dec 2026, first report window 1 Jan 2027 – 31 May 2027, annually by 31 May. Only the one `metaDescription` drifts (C9). |
| V24 | Research page vs its data file | line-by-line against `src/data/uk-crypto-tax-gap-index.json` | **Every rendered figure matches the JSON**: 12% / ~7 million / 93% / YouGov n=2,199 / Wave 5 Nov 2024, corrected Mar 2025 / Wave 6 caveat present / £3,000 / £37,700 / 18%/24% / 4-6-20. The *"HMRC does not publish a crypto-specific tax gap, so we do not invent one"* note is published on the page, which is the right call. |
| V25 | Cookie policy "no Google Analytics" | `grep -n google_analytics_id crypto/niche.config.json` -> `""`; `grep -l "googletagmanager\|gtag(" pages/*.html` -> 0; `curl -sI` -> 0 `Set-Cookie` | **True.** Phase 0's removal of the GA opt-out section was right and the claim that replaced it is accurate. |
| V26 | Cookie policy "no cookies, two identifiers in local/session storage" | `layout.tsx:66` `AnalyticsProvider … storagePrefix="datp" posture="opt-out"`, `api/track/route.ts` (`SEC-08: no raw IP is stored`) | **True.** The provider is mounted and real; identifiers are set client-side after hydration, which is why they do not appear in server HTML. |
| V27 | No duplicated published section in the cookie policy | full text read | **Held** — phase 0's de-duplication survived; the rendered policy has five sections, none repeated. |
| V28 | Privacy-policy technical sentences vs code | traced before judging, per the wrongful-deletion rule | **All estate-central and all real, none deleted.** The multi-firm pool, the 3+3 caps, the 48-hour and seven-day fallbacks, the Anthropic-via-AI-Gateway grading and the Companies House lookup are **byte-identical to `Property/web/src/app/privacy-policy/page.tsx`** (lines 116, 146, 160, 168, 170, 188, 191). A site-local grep finds nothing and proves nothing; I did not treat that as evidence. |
| V29 | Lead consent wording | `Property/web/src/tests/consent-anchor-drift.test.ts:25-40` | `"crypto"` **is** in `IN_SCOPE_SITES`. The rendered consent text on the calculator and contact forms carries the offer-gate anchors. **Reported, not touched, no rewording proposed.** |
| V30 | Gov.uk citations render as links, not escaped markup | rendered service pages | **Held** — the phase 0 fix of 17+ escaped citations per service page survived; anchors render as anchors throughout. |
| V31 | Hub canonicals | sitemap + rendered heads | **Held** — the two hubs that canonicalised to the homepage now self-canonicalise. |

---

## FALSE PREMISES IN THE BRIEF

1. **"£ is stored literally here and as `&pound;` in one file, and the ASCII `GBP` also appears."**
   Partly wrong. `&pound;` is used in **two** content files, not one
   (`crypto-to-crypto-swaps-are-disposals.md` and `crypto-mining-tax-1000-allowance.md`), and the
   only `GBP` occurrences are `priceCurrency: "GBP"` inside four `WebApplication` JSON-LD offers
   with `price: "0"` — not prose, and not a service fee. A sweep that trusted "one file" would
   have missed the second. My sweep was by rule and covers both.

2. **"A sibling site carries 43 answers asserted in wording that does not match the page" — implied as a thing to expect here.**
   Not reproduced on crypto: **222 of 222** FAQ answers match the server HTML verbatim. My first
   automated pass reported 4 misses and **all four were artefacts of my own normalisation**, not
   defects. Recording this so the gap-fix wave does not go looking for a problem that is not there.

3. **"A wrong staking worked example (£670 where £470 is due) and its downstream band figure" — implied fully fixed.**
   The £470 fix held, but the **band figure in the same file is still wrong** and is a different
   error from the one phase 0 named: it is the *gross-vs-taxable* error that phase 0 fixed in the
   *CGT tool*, sitting untouched in prose four lines above (C2). The phase 0 list was right about
   what it fixed and wrong to imply the file was clean.

4. **"A CGT tool measuring the basic-rate band against GROSS income" — described as a tool-only defect.**
   The same defect exists in published prose (C2), and the phase 0 sweep was scoped to the tool.
   This is the "sweep by RULE not by the list you were handed" failure mode, recurring.

5. **The brief's three homepage owner items are presented as "the port left three".**
   All three pre-date the port by two months (`git blame` -> `a516e497e`, 2026-07-14 launch core).
   The port introduced neither. Attribution matters for who signs them off.

6. **"One package replaced a '24-hour response' proof point with 'Read by a specialist'".**
   Correct as to the replacement, and the replacement is **not defensible** (C5) — the brief asks
   the question neutrally; the answer is no, and the contradiction is with the site's own
   `/privacy-policy`, not with anything external.

7. **"Every `.md` under `crypto/web/content/`".**
   Minor: there are 19, all under `content/blog/`; there is no non-blog `.md` content directory,
   so "every `.md` under content" and "every blog post" are the same set here.

8. **Not a false premise but a correction to scope:** the sitemap lists 51 URLs, but **54 pages are
   served** — `/book`, `/complete` and `/thank-you` are live, carry published claims (including the
   "free review call" copy in O4), and are absent from the sitemap. Any sweep driven purely by
   `sitemap.xml` misses three pages of user-facing copy.

---

## SUMMARY

- **2 blocking** (C1 a £2,136 CGT figure on a £2,400 gain; C2 the gross-vs-taxable band error
  surviving in prose after being fixed in code)
- **6 major** (C3 "no data stored" beside four lead forms; C4 a promised penalty output that does
  not exist; C5 "Read by a specialist" contradicted by our own privacy policy; C6 "we confirm your
  exact figures" against our own terms; C7 four-year NVC backdating; C8 named-product claims)
- **6 minor** (C9-C14)
- **4 owner decisions** (O1-O4), three of which are estate-wide and pre-date the port
- **31 verified-correct checks** (V1-V31), including every phase 0 fix I could re-derive

Two of the eight blocking/major findings are in copy this port wrote (C5, C6). The rest are
launch-core content the port's own packages and verification lists did not re-read.
