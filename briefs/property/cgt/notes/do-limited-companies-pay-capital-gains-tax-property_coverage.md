# Coverage note: do-limited-companies-pay-capital-gains-tax-property

Written 2026-08-20. Brief: `briefs/property/cgt/netnew/BRIEF_do-limited-companies-pay-capital-gains-tax-property.md`.
File: `Property/web/content/blog/do-limited-companies-pay-capital-gains-tax-property.md`. NOT committed, NOT deployed.

**Revised 2026-08-20 after QA.** Factual (`qa/FACTUAL_netnew-calculator.md`): **all_clear**, 0 blockers, 3 advisories, all 3 now fixed.
Editorial (`qa/EDITORIAL_batch3.md`): **must_fix**, 5 blockers + 2 advisories on this target plus a share of cross-page
BLOCKER X.1, all now fixed. See "QA remediation" below.

## Six-check floor

| Check | Target | Result |
|---|---|---|
| Body words (raw HTML, excl. frontmatter) | 2,800-3,500 | **3,471** |
| FAQs | 10-14 | **14** |
| metaTitle | <= 62 chars | **55** |
| metaDescription | <= 158 chars | **156** |
| Em-dashes (whole file) | 0 | **0** (en-dashes 0; the U+2212 in the marginal-relief formula is a minus sign, confirmed correct by both QA tracks) |
| Internal links resolve | all | **6 of 6** (files verified present in `content/blog/`, canonical category paths matched) |

## Gate results (run after remediation)

```
python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD
EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)

python scripts/voice_scan.py --slug do-limited-companies-pay-capital-gains-tax-property
robot_score : 27.8   band: MINOR
S1 abstract-noun voice : 13 (2.74/1k)  ['buyer', 'individual', 'owner']
S2 meta-commentary     : 2
S3 structural/SEO talk : 0
S4 em-dashes           : 0
S5 signposting         : 0 (0.0/1k)
S6 length              : 3125 body words (ideal 2200, pillar=False, over=42%)
S7 americanisms (UK)   : 0
```

Both gates pass at the required standard (equity gate green, voice scan MINOR). Three scanner notes, none actionable:

- **S3 = 0 and S7 = 0** are the two that moved. S3 was the SEO-plumbing sentence (editorial 3.4) and S7 was "real estate" (editorial 3.5); both are now gone.
- **S1** counts "individual", "owner" and "buyer". All 13 uses are the load-bearing comparison this page exists to draw (company versus individual). Replacing them with second person would make the comparison unstateable.
- **S6** measures against a 2,200-word house ideal; the brief for this page mandates 2,800-3,500, so the flag is a scanner default rather than a brief breach. Flagging the divergence rather than acting on it.
- **S2** is the two "This page sets out / This page covers" sentences in the summary and intro. Both are standard corpus signposting rather than meta-commentary about the writing process; left in place, noted for the owner if the house line on that changes.

## Language spec (DOSSIER.md section 6)

| Measure | Target | Result |
|---|---|---|
| Question-form H2s | raise above 31.5% | **14 of 15 (93%)** |
| "you/your" per 1,000 words | 25+ | **27.9** (97 instances) |
| Statute refs | near zero, late | **1** (TCGA 1992 s.1A, in the non-resident section, 12th H2 of 15) |
| Current year | one only | **2026/27** only |
| Tables | keep ours | **3** (rate table, worked example, company-vs-individual comparison) |
| External links | gov.uk / legislation.gov.uk only if used | **none used** |
| Counted-list openers (cross-page BLOCKER X.1) | <= 2 | **2** ("Two layers." / "One layer.") |

Answer-first discipline: H1 is the question, first word of the first paragraph is "No.", every H2 is answered in its first sentence.

## QA remediation

### Editorial blockers (all fixed)

| # | Finding | Fix applied |
|---|---|---|
| 3.1 | Visible keyword list in prose ("Search corporation tax capital gains, corporate tax on capital gains...") | Sentence deleted. The preceding sentence already makes the point. |
| 3.2 | Ungrammatical keyword string as a term of art ("no capital gains tax limited company regime") | Rewritten to "There is no separate capital gains tax for companies and no corporate capital gains tax rate." |
| 3.3 | One keyword in three variants in the business-sale section | Opener rewritten to "'selling the business' describes two completely different transactions, and the capital gains tax follows the seller"; the "business sale capital gains tax" compound noun removed. One natural carrier kept ("Capital gains tax on selling a business therefore has no single rate, because..."). |
| 3.4 | SEO plumbing visible to the reader ("People search for how to avoid...") | Rewritten to address the reader: "There is no exotic answer to avoiding capital gains tax on a limited company's property..." |
| 3.5 | US register ("real estate") + keyword-only restatement + "if you are researching" | "real estate" to "commercial property"; restatement replaced with "What decides the tax on a commercial property gain is who owns it, not what it is"; "If you are researching..." to "If you own the commercial property personally...". |

### Editorial advisories

| # | Finding | Action |
|---|---|---|
| 3.6 | Land-section carriers ("The CGT land position", "capital gains tax on selling land with planning consent attached") | Both fixed to the suggested wording ("Land follows the same rule as buildings"; "land sold with planning consent is no different"). |
| 3.7 | Fourteen FAQs, most mirroring a body H2 | **NOT actioned.** QA marks this "optional for release but recommended" and the coordinator's fix list did not include it. Left at 14. Recommend pruning to 6-7 in the next edit window on this page; the keepers QA names are the asset-versus-share price-discount point, the trading-stock fork, ATED-CGT abolition and the SPV divided-limits arithmetic. |
| 3.8 | CTA and "The short version" closer | No change requested; QA confirmed both are house-conforming. Owner question flagged by QA (whether a named closing section becomes a house pattern) is passed up, not decided here. |

### Cross-page BLOCKER X.1 (counted-list openers)

This page carried nine of the batch's sixteen. Now two.

| Original | Now |
|---|---|
| "Three consequences follow immediately, and they are the ones that catch directors out:" | "That single mechanism has consequences directors routinely get caught by:" |
| "Three figures matter, and they are set by the framework that has applied since 1 April 2023." | "The framework has applied since 1 April 2023 and turns on a lower limit, an upper limit and the relief between them." |
| "Two traps sit underneath that table and both are common in property structures." | "The table hides two traps, both common in property structures." |
| "Two practical readings." | "So check the computation two ways." |
| "Two deadlines run on different tracks, and the earlier one is the one people miss:" | "The payment date and the filing date are not the same day, and the earlier one is the one people miss:" |
| "Two layers." | **kept** (1 of the 2 allowed) |
| "One layer." | **kept** (2 of the 2 allowed) |
| "One exception: a non-UK resident selling shares..." | "A non-UK resident selling shares in a property-rich company is the exception: the indirect disposal rules catch it and the 60-day clock applies." |
| "One correction if you have been reading older material:" | "If you have been reading older material, correct this before you act on it." |

The kept pair is the punchline of the asset-sale versus share-sale fork, which is where the device earns its place.

### Factual advisories (all 3 fixed)

| # | Finding | Fix applied |
|---|---|---|
| 1 | metaDescription said "19% to 25%", which excludes the 26.5% effective marginal rate | Rewritten to "19%, 25% or an effective 26.5% in the marginal band" (156 chars). The closing section was also corrected from "the marginal relief rate" to "the effective 26.5% marginal rate". |
| 2 | "before April 2018" is three months too generous as the indexation qualifying-expenditure cut-off | All five occurrences (summary, two FAQs, the calculation bullet, the indexation H2) changed to "up to December 2017". The indexation FAQ and the H2 body now state explicitly that January to March 2018 spend attracts nil indexation, not a partial amount. |
| 3 | £1.5m quarterly-instalment threshold is itself divided among associated companies | Added to both the body bullet and the reporting FAQ: "divided by the number of associated companies, the same as the small profits limits, so a five-SPV portfolio hits instalments at £300,000 per company." |

**Marginal relief presentation left exactly as written** per the coordinator's instruction: the formula (U − A) × (N ÷ A) × 3/200 is shown in full, 26.5% is stated as "a result rather than an input", and the worked example carries the calculation. Both QA tracks praised this and it clears all four §21.A.2 rate-drift patterns.

### Also fixed (not on either fix list, one-word house-rule compliance)

`SDLT` was used without expansion at first use, which the factual report flags against house positions §13 while reviewing the sibling second-home page ("Same issue on the companies page (line 95)"). Now "the Stamp Duty Land Tax (SDLT) your company paid on purchase".

## Internal links used (all resolve)

1. `/blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate` (cannibalisation guard: transfer INTO the company)
2. `/blog/incorporation-and-company-structures/corporation-tax-vs-income-tax-landlords-2027` (guard: ownership-years comparison)
3. `/blog/incorporation-and-company-structures/accountant-corporation-tax-property-companies` (CT600 filing cycle depth)
4. `/blog/capital-gains-tax/cgt-commercial-property-different-residential` (guard: individual commercial vs residential)
5. `/blog/capital-gains-tax/business-asset-disposal-relief-residential-property-qualification` (forward-link, BADR depth not restated)
6. `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` (guard: the individual's guide)

All four brief-named cannibalisation guards are linked, none restated. BADR gets one paragraph plus one FAQ, both pointing out rather than duplicating.

## Facts verified against house_positions.md

| Fact | Source |
|---|---|
| Companies pay CT on chargeable gains, not CGT | section 21.A.2 (explicit "do not write" entry) |
| 19% SPR at/below £50,000 lower limit, 25% main rate at/above £250,000 upper limit, 2026/27 | section 21.A |
| Marginal relief formula (U - A) x (N/A) x 3/200, 26.5% is an emergent effective rate not an input | section 21.A + 21.A.2 (requires the worked calculation, not a flat assertion) |
| Associated companies divide both limits by (1 + N); 5 SPVs = £10k / £50k each | section 21.A |
| CIHC pays 25% at all levels; "let commercially" exclusion reaches connected persons, their spouses/civil partners, relatives and relatives' spouses | section 21.A + section 39-area CIHC note (s.18N(3) full statutory exclusion) |
| AEA £3,000 individuals, £1,500 most trusts; no company equivalent | section 5 |
| 18% / 24% individual rates from 30 Oct 2024, residential AND non-residential aligned | section 5 |
| Indexation frozen at Dec 2017, applies to companies' pre-2018 base costs, not to individuals | section 5 |
| 60-day return is a CGT obligation; UK residents file only where tax is due | section 5 |
| Non-resident: every UK land disposal reported within 60 days regardless of tax due, incl. indirect disposals of property-rich entities; no AEA for non-resident companies | section 17.4 |
| Non-resident companies within TCGA 1992 s.1A, typically pay CT on the gain | sections 17.4 + 18.5 |
| ATED-CGT abolished 6 April 2019; old 28% rate is stale | section 18.5 + 18.8 |
| BADR needs a trading company; property investment fails | section 5 + the linked BADR page |
| Dividend rates from 6 Apr 2026: 10.75% / 35.75% / 39.35% | section 40-area lock (ITA 2007 s.8 as in force; 39.35% predates FA 2026, not attributed to it) |
| £500 dividend allowance | section 21.5-area FIC note |
| CT payable 9 months + 1 day after period end; CT600 due 12 months; instalments over £1.5m | verified on existing corpus page `accountant-corporation-tax-property-companies.md` (FAQ + body), consistent with section 11.C.Z.8 filing-window framework |

## Figures deliberately omitted (could not verify)

1. **Indexation allowance factor / RPI multiplier for any specific acquisition month.** No indexation factor table exists in `house_positions.md` and none was verifiable on the linked pages. Consequence: the worked example was deliberately built on a **June 2019** acquisition so indexation is nil and no factor needs quoting. Indexation is handled qualitatively in its own H2 (mechanic, cut-off, who benefits) with no numeric factor stated anywhere on the page.
2. **A £ figure for the extraction cost on the worked example.** The dividend rates are stated (verified) but no attempted allocation of corporation tax to the gain slice for a net-in-hand figure, because that allocation is not a house position and would be an invented number.
3. **No pricing, no client names, no fee figures** anywhere (house rule).

## Keywords placed

62 unique keywords in the two `do-limited-companies-pay-capital-gains-tax-property` sections of
`_newpage_keywords.txt`, all at volume >= 50.

**Position changed materially at QA.** The first draft carried 24 verbatim, but editorial blockers
3.1, 3.2, 3.3, 3.5 and advisory 3.6 were *specifically* about those carriers: a keyword list with a
verb in front of it, three ungrammatical query strings used as terms of art, and two restatements
that existed only to place a phrase. Removing them was the fix. The page now carries
**11 verbatim and 51 as natural variants**, and that is the intended end state, not a regression:
every one of the 51 is a word-order permutation of a phrase the page states in plain English.

### Verbatim (11)

| Keyword | Vol | Where |
|---|---|---|
| do companies pay cgt | 320 | H2 2 ("Do companies pay CGT, or corporation tax on capital gains?") |
| do companies pay capital gains tax | 320 | H2 2 body, FAQ 1 |
| capital gains tax on commercial property | 210 | H2 7, body, FAQ 6 |
| capital gains tax for companies | 170 | H2 2 opening ("no separate capital gains tax for companies") |
| capital gains tax on the sale of land | 170 | H2 8 body |
| capital gains tax on selling a business | 170 | H2 9 close |
| do limited companies pay capital gains tax | 110 | H1, title, FAQ 1 |
| cgt on commercial property | 90 | H2 7 body |
| corporation tax on capital gains | 70 | H2 2 heading, body |
| corporate capital gains tax | 70 | H2 2 opening ("no corporate capital gains tax rate") |
| corporate capital gains | 70 | same sentence (substring) |

### Removed at QA, intent re-placed in plain English (14)

These were verbatim in the first draft and were cut by name in the editorial report. Each row records
what replaced it, so the intent stays covered even though the string does not.

| Keyword | Vol | Was | Now covered by |
|---|---|---|---|
| capital gains tax limited company | 110 | "no capital gains tax limited company regime" (3.2, not English) | "There is no separate capital gains tax for companies" + H1 |
| capital gains tax for limited companies | 110 | keyword list (3.1) | H1, summary, H2 2 |
| corporation tax capital gains | 70 | keyword list (3.1) | H2 2 heading "corporation tax on capital gains" |
| corporate tax on capital gains | 70 | keyword list (3.1) | as above; "corporate tax" is also US register for a UK brand |
| company capital gains tax | 170 | keyword list (3.1) | H2 2, FAQ 1 |
| capital gains tax company | 170 | "no capital gains tax company charge" (not English) | "Your limited company does not pay capital gains tax" |
| commercial property capital gains tax | 210 | restatement sentence (3.5) | "What decides the tax on a commercial property gain is who owns it, not what it is" |
| commercial property capital gains | 90 | same sentence | as above |
| capital gains tax commercial real estate | 210 | "commercial real estate held in a company" (3.5, US register) | "commercial property held in a company" |
| cgt land | 260 | "The CGT land position" (3.6) | H2 8 "What about CGT on land sales held in a company?" |
| capital gains tax on selling land | 70 | "...with planning consent attached" (3.6) | "land sold with planning consent is no different" |
| capital gains tax on the sale of a business | n/a | opener (3.3, duplicated next sentence) | "'selling the business' describes two completely different transactions" |
| business sale capital gains tax | 70 | compound noun (3.3) | "Capital gains tax on selling a business therefore has no single rate" |
| business sale capital gains | 70 | same sentence | as above |

### Natural variants (37)

Word-order or article permutations of a phrase already on the page in plain English. Placing each
literally is what produced the editorial blockers, so they stay as variants. Grouped by anchor:

- **Commercial (anchor: "capital gains tax on commercial property", H2 7 + FAQ 6):** capital gains tax commercial property (210), capital gains tax for commercial property (210), capital gains on commercial property (90), capital gains commercial property (90), capital gain commercial property (90).
- **Land (anchor: "capital gains tax on the sale of land" + H2 8):** capital gains tax for land sale (170), capital gains tax land sale (170), capital gains tax on sale of land (170), selling land capital gains tax (70).
- **Business sale (anchor: "capital gains tax on selling a business", H2 9):** capital gains tax on business sale (210), capital gains tax on sale of business (210), capital gains on sale of business (210), capital gains tax sale of business (210), capital gain on sale of business (210), selling business capital gains (170), selling a business capital gains (170), capital gains tax selling a business (170), selling a business capital gains tax (170), selling business capital gains tax (170), capital gains on selling a business (170), capital gains tax for business (70), business capital gains (70), business capital gains tax (70), capital gains tax for businesses (70), capital gains tax business (70), capital gain on business sale (70), capital gains tax on businesses (70), business capital gain (70).
- **Company (anchor: H1 + "no separate capital gains tax for companies" + "no corporate capital gains tax rate"):** capital gains tax companies (170), capital gain tax company (170), capital gain company (70), cgt company (70), capital gains tax on corporations (70), capital gains tax corporation (70), capital gain corporation tax (70), corporate tax capital gains (70).

### Declined (1)

| Keyword | Vol | Reason |
|---|---|---|
| how to avoid capital gains tax on commercial property uk | 50 | The trailing "uk" is a SERP qualifier that cannot be written into UK-audience prose without reading as machine copy. Intent is served by H2 13 (which now opens "There is no exotic answer to avoiding capital gains tax on a limited company's property" and names commercial property in the next sentence) plus H2 7. |

Note: "how to avoid limited company capital gains tax on property" (70) was verbatim in the first
draft inside the sentence editorial 3.4 flagged as visible SEO plumbing. The rewrite keeps the
intent ("avoiding capital gains tax on a limited company's property") and drops the string.

## Scope discipline

- ATED-CGT **not** resurrected: the page states the 6 April 2019 abolition and warns off the stale 28% figure (brief instruction + section 18.5).
- Non-resident companies **flagged, not deep-dived**: one H2, three facts, no NRCGT mechanics, no rebasing dates.
- BADR **not restated**: one paragraph and one FAQ, both forward-linking.
- Transfer INTO a company **not restated**: one sentence in the intro, forward-linked.
- No pricing, no client names, no em-dashes, no second current-year figure.

## Not done (by instruction)

No commit, no push, no deploy, no IndexNow, no `monitored_pages` / `blog_optimizations` row.
