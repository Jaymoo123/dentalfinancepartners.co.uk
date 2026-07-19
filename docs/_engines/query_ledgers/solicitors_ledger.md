# Query ledger review: solicitors (accountsforlawyers.co.uk)

- Site: solicitors (Accounts for Lawyers)
- Date: 2026-07-17
- Data window: 90 days of GSC to 2026-07-15 (2-day lag)
- Sampling loss: 78.9% of impressions have no query-level rows, so page-level totals are far larger than the sum of visible queries. Treat per-query tables as directional, not exhaustive.
- CTR curve note: the site-level expected-CTR curve is near zero everywhere (best band 0.46% at positions 1 to 5, effectively 0% beyond position 15, and 33,508 of the 46,960 curve impressions sit in the 21+ band). CTR-gap arithmetic therefore carries almost no signal on this site. Position, not snippet, is the binding constraint, which matches the estate audit verdict (impressions up 20x in 10 weeks, money queries at position 34 to 61 with 0 clicks).
- Routing note that matters for reading this ledger: legacy URL variants (flat `/blog/<slug>`, the old `practice-sale-succession` category, and `-and-` category spellings) all 301 to their canonical categorised URLs via middleware, `next.config.ts` redirects, and the wrong-category `permanentRedirect` in the post route. Several "pages" in the JSON are therefore redirect shadows of a single canonical page, and I have classified them as such rather than as pages needing work.

## Section 1: HOLD pages (81)

81 pages are held (19 SERP-meta batch-2 pages under 28-day outcome watch closing 2026-08-05, plus ranking-maturation watches for pages first impressed 2026-06-19 to 2026-07-15). No changes are proposed to any of them; window-close dates below.

| Page | Hold reason | Window closes |
|---|---|---|
| `/blog/practice-accounting/billing-discipline-end-of-quarter-uk-law-firms` | first GSC impression 2026-06-19 - ranking-maturation watch | 2026-07-31 |
| `/blog/sra-accounts-rules/when-is-an-sra-accountants-report-required` | first GSC impression 2026-06-19 - ranking-maturation watch | 2026-07-31 |
| `/blog/partnership-llp-structure/parental-leave-pay-for-uk-solicitors-partners` | first GSC impression 2026-06-20 - ranking-maturation watch | 2026-08-01 |
| `/blog/partnership-llp-structure/partnership-pension-contributions-tax-relief` | first GSC impression 2026-06-20 - ranking-maturation watch | 2026-08-01 |
| `/calculators/law-firm-valuation` | first GSC impression 2026-06-20 - ranking-maturation watch | 2026-08-01 |
| `/blog/conveyancing-compliance/fee-structure-for-uk-residential-conveyancing-firms` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/conveyancing-compliance/ltt-vs-sdlt-comparison-welsh-conveyancing` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/firm-acquisition-merger/how-much-does-it-cost-to-buy-a-uk-law-firm` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/partnership-llp-structure/spouse-employment-in-law-firm-tax` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/practice-sale-succession/merging-two-uk-law-firms-tax-and-sra` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/professional-indemnity/minimum-terms-and-conditions-pii-explained` | first GSC impression 2026-06-21 - ranking-maturation watch | 2026-08-02 |
| `/blog/locum-solicitor-tax/locum-solicitor-expenses-allowable-uk-2025` | first GSC impression 2026-06-22 - ranking-maturation watch | 2026-08-03 |
| `/blog/partnership-llp-structure/how-much-does-it-cost-to-buy-into-uk-law-firm-partnership` | first GSC impression 2026-06-22 - ranking-maturation watch | 2026-08-03 |
| `/blog/partnership-llp-structure/uk-llp-tax-non-resident-members` | first GSC impression 2026-06-22 - ranking-maturation watch | 2026-08-03 |
| `/blog/compliance-risk-colp-cofa/cofa-monthly-checklist-uk-law-firms` | first GSC impression 2026-06-23 - ranking-maturation watch | 2026-08-04 |
| `/blog/conveyancing-compliance/sdlt-calculation-uk-conveyancing-solicitors` | first GSC impression 2026-06-23 - ranking-maturation watch | 2026-08-04 |
| `/blog/partnership-llp-structure/solicitor-mortgage-affordability-self-employed` | first GSC impression 2026-06-23 - ranking-maturation watch | 2026-08-04 |
| `/blog/compliance-risk-colp-cofa/cofa-responsibilities-uk-law-firms` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/compliance-risk-colp-cofa/sra-breach-notification-when-and-how` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/conveyancing-compliance/abortive-conveyancing-transactions-vat-and-wip` | SERP meta batch-2 page under 28d outcome watch; first GSC impression 2026-06-24 - ranking-maturation watch | 2026-08-05 |
| `/blog/fee-earner-tax-compensation/associate-solicitor-bonus-structures-tax` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/firm-acquisition-merger/can-a-non-lawyer-buy-a-uk-law-firm-abs-explained` | SERP meta batch-2 page under 28d outcome watch; first GSC impression 2026-06-20 - ranking-maturation watch | 2026-08-05 |
| `/blog/firm-acquisition-merger/how-much-does-it-cost-to-start-a-law-firm-uk` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/partnership-llp-structure/difference-between-llp-and-partnership-uk-solicitors` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/partnership-llp-structure/how-llp-members-are-taxed-uk-2025-26` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/sra-accounts-rules/common-sra-accounts-rules-breaches-and-how-to-fix` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/sra-accounts-rules/how-to-prepare-for-sra-accountants-report` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/sra-accounts-rules/office-account-vs-client-account-differences` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/sra-accounts-rules/sra-accountants-report-exemption-thresholds` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/sra-accounts-rules/what-counts-as-client-money-uk-solicitors` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/vat-compliance/conveyancing-vat-rules-uk-2025-26` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/vat-compliance/disbursements-vs-recharges-conveyancing-vat` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/vat-compliance/do-uk-solicitors-charge-vat` | SERP meta batch-2 page under 28d outcome watch | 2026-08-05 |
| `/blog/fee-earner-tax-compensation/solicitor-cpd-tax-deductible-uk-2025-26` | first GSC impression 2026-06-25 - ranking-maturation watch | 2026-08-06 |
| `/blog/partnership-llp-structure/salaried-member-rules-uk-llps-explained` | first GSC impression 2026-06-25 - ranking-maturation watch | 2026-08-06 |
| `/blog/professional-indemnity/pii-renewal-cycle-uk-law-firms` | first GSC impression 2026-06-25 - ranking-maturation watch | 2026-08-06 |
| `/blog/vat-compliance/mtd-for-vat-law-firm-compliance` | first GSC impression 2026-06-25 - ranking-maturation watch | 2026-08-06 |
| `/calculators/indemnity-premium-estimator` | first GSC impression 2026-06-25 - ranking-maturation watch | 2026-08-06 |
| `/blog/conveyancing-compliance/sdlt-refund-and-overpayment-claims-conveyancers` | first GSC impression 2026-06-26 - ranking-maturation watch | 2026-08-07 |
| `/locations/leeds` | first GSC impression 2026-06-26 - ranking-maturation watch | 2026-08-07 |
| `/blog/practice-finance-cash-flow/apprenticeship-levy-and-solicitor-apprenticeships-law-firms` | SERP meta batch-2 page under 28d outcome watch; first GSC impression 2026-06-27 - ranking-maturation watch | 2026-08-08 |
| `/blog/practice-succession-sale/law-firm-valuation-guide-uk-solicitors` | first GSC impression 2026-06-27 - ranking-maturation watch | 2026-08-08 |
| `/blog/sra-compliance-trust-accounting/attorney-and-deputyship-receipts-accounting-solicitors` | first GSC impression 2026-06-27 - ranking-maturation watch | 2026-08-08 |
| `/blog/structure-incorporation/converting-law-firm-to-limited-company-abs-tax` | first GSC impression 2026-06-27 - ranking-maturation watch | 2026-08-08 |
| `/blog/vat-compliance/disbursement-and-litigation-funding-cash-flow-tax` | first GSC impression 2026-06-27 - ranking-maturation watch | 2026-08-08 |
| `/locations/manchester` | first GSC impression 2026-06-27 - ranking-maturation watch | 2026-08-08 |
| `/blog/sra-compliance-trust-accounting/probate-estate-administration-client-account-sra` | first GSC impression 2026-06-28 - ranking-maturation watch | 2026-08-09 |
| `/blog/conveyancing-compliance/conveyancing-firm-financial-control-strategies` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/conveyancing-compliance/conveyancing-referral-fees-sra-transparency-and-vat` | SERP meta batch-2 page under 28d outcome watch; first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/conveyancing-compliance/non-resident-and-corporate-buyer-sdlt-for-conveyancers` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/firm-acquisition-merger/due-diligence-checklist-buying-uk-conveyancing-firm` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/sra-compliance-trust-accounting/dormant-and-suspense-client-ledger-balances-management` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/sra-compliance-trust-accounting/running-a-law-firm-without-a-client-account-model` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/vat-compliance/conditional-fee-agreement-cfa-success-fee-accounting-tax` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/locations/birmingham` | first GSC impression 2026-06-29 - ranking-maturation watch | 2026-08-10 |
| `/blog/partnership-llp-accounting/fixed-share-to-equity-partner-promotion-tax-law-firm` | first GSC impression 2026-06-30 - ranking-maturation watch | 2026-08-11 |
| `/blog/sra-compliance-trust-accounting/vat-on-probate-and-estate-administration-fees` | first GSC impression 2026-06-30 - ranking-maturation watch | 2026-08-11 |
| `/calculators/fa-2014-salaried-member` | first GSC impression 2026-06-30 - ranking-maturation watch | 2026-08-11 |
| `/blog/partnership-llp-accounting` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/practice-finance-cash-flow/secondment-of-solicitors-vat-and-tax-treatment` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/sra-compliance-trust-accounting/solicitor-acting-as-executor-or-trustee-fees-tax` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/sra-compliance-trust-accounting/third-party-managed-accounts-tpma-for-law-firms` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/structure-incorporation/corporate-member-llp-law-firm-mixed-membership-rules` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/vat-compliance/option-to-tax-law-firm-premises-capital-goods-scheme` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/vat-compliance/vat-tax-point-time-of-supply-law-firm-billing` | first GSC impression 2026-07-01 - ranking-maturation watch | 2026-08-12 |
| `/blog/partnership-llp-accounting/law-firm-partner-tax-reserving-payments-on-account` | first GSC impression 2026-07-02 - ranking-maturation watch | 2026-08-13 |
| `/blog/vat-compliance/inter-partes-costs-recovery-vat-treatment-law-firms` | first GSC impression 2026-07-02 - ranking-maturation watch | 2026-08-13 |
| `/blog/sra-compliance-trust-accounting` | first GSC impression 2026-07-03 - ranking-maturation watch | 2026-08-14 |
| `/blog/vat-compliance/legal-aid-laa-work-vat-and-cash-flow` | first GSC impression 2026-07-03 - ranking-maturation watch | 2026-08-14 |
| `/blog/partnership-llp-accounting/law-firm-partner-capital-accounts-tax-treatment` | first GSC impression 2026-07-05 - ranking-maturation watch | 2026-08-16 |
| `/blog/sra-compliance-trust-accounting/residual-client-balances-clearing-unclaimed-money-sra` | first GSC impression 2026-07-06 - ranking-maturation watch | 2026-08-17 |
| `/blog/vat-compliance/law-firm-partial-exemption-vat-client-account-interest` | first GSC impression 2026-07-06 - ranking-maturation watch | 2026-08-17 |
| `/blog/compliance-risk-colp-cofa/colp-decision-log-best-practice-uk-firms` | first GSC impression 2026-07-07 - ranking-maturation watch | 2026-08-18 |
| `/blog/fee-earner-tax-compensation/cilex-route-to-qualification-tax-treatment` | first GSC impression 2026-07-07 - ranking-maturation watch | 2026-08-18 |
| `/blog/practice-finance-cash-flow/tax-loans-for-law-firm-partners-funding-the-bill` | first GSC impression 2026-07-07 - ranking-maturation watch | 2026-08-18 |
| `/locations/london` | first GSC impression 2026-07-07 - ranking-maturation watch | 2026-08-18 |
| `/blog/practice-finance-cash-flow/financing-pii-premiums-tax-treatment-of-premium-finance` | first GSC impression 2026-07-09 - ranking-maturation watch | 2026-08-20 |
| `/blog/practice-succession-sale/law-firm-ebitda-multiples-uk-2025-26` | first GSC impression 2026-07-11 - ranking-maturation watch | 2026-08-22 |
| `/specialist-vs-generalist-accountant` | first GSC impression 2026-07-11 - ranking-maturation watch | 2026-08-22 |
| `/blog/practice-succession-sale/goodwill-tax-treatment-law-firm-sale` | first GSC impression 2026-07-15 - ranking-maturation watch | 2026-08-26 |

All 81 pages are no-touch until their windows close (earliest 2026-07-31, latest 2026-08-26).

One observation recorded for later, not an action now: `/blog/practice-succession-sale/law-firm-ebitda-multiples-uk-2025-26` (held to 2026-08-16) has em-dash characters in several H2 headings, which breaches the no-em-dash rule; queue for the next pass after the hold lifts.

## Section 2: Actions grouped by type

### meta_fix (1)

**`/blog/compliance-risk-colp-cofa/common-causes-of-sra-investigations-2026`** (ambiguous resolved, action_source=llm)

| Metric | Value |
|---|---|
| Impressions 90d | 53 |
| Clicks 90d | 0 |
| Query data | none surfaced (query_data_thin, sampling loss) |
| First seen | 2026-06-13 |

The page content is sound (1,883 words, well-structured, clear COLP/COFA triggers), but the meta description ("Discover the top triggers...") is the weakest, most generic element on the page and reads templated. A meta rewrite to the site's evidence-led formula is cheap, safe, and the only lever available while query data is thin. Do not touch the body.

### expand (2)

**`/blog/partnership-llp-structure/llp-vs-traditional-partnership-uk-law-firms`** (deterministic; GSC reports it under the legacy `-and-` category spelling, which 301s to this canonical URL)

| Query | 90d impr | Clicks | Position | CTR | Expected CTR |
|---|---|---|---|---|---|
| (page-level) | 81 | 0 | 49.2 | 0% | ~0% at this position |

Agree with the deterministic expand, with one caveat: `/blog/partnership-llp-structure/difference-between-llp-and-partnership-uk-solicitors` (currently HELD) covers near-identical ground. The expansion brief must differentiate the two (this page owns the law-firm-specific structural comparison and conversion angle; the held page owns the general definitional query), otherwise expansion will deepen cannibalisation. Draft the brief now; the differentiation check completes when the sibling's hold lifts.

**`/blog/sra-compliance-trust-accounting/solicitor-client-account-reconciliation`** (ambiguous resolved, action_source=llm)

| Metric | Value |
|---|---|
| Impressions 90d | 200 (highest of any non-hold ambiguous blog page) |
| Clicks 90d | 2 |
| Query data | none surfaced (query_data_thin) |
| Word count / date | 1,129 words, dated 2026-04-01 |

This is the site's core SRA compliance topic (five-weekly three-way reconciliation) yet it is the thinnest page in the SRA cluster at 1,129 words, roughly half the depth of its siblings (disbursements 2,399, client money interest 2,911, conveyancing client account 2,438). It attracts 200 impressions despite that. Expand to the cluster's A* depth: worked three-way reconciliation example, breach and reporting pathway, software-specific walk-throughs, accountant's report linkage.

### refresh (1)

**`/services`** (ambiguous resolved, action_source=llm)

| Query | 90d impr | Clicks | Position | CTR | Expected CTR |
|---|---|---|---|---|---|
| accounting for solicitors | 320 | 0 | 66.0 | 0% | ~0% |
| accountants for solicitors | 43 | 0 | 57.1 | 0% | ~0% |
| accounting services for law firms | 33 | 0 | 58.2 | 0% | ~0% |
| accountants for legal firms | 20 | 0 | 40.9 | 0% | ~0% |
| accountant for solicitors | 19 | 0 | 54.0 | 0% | ~0% |

538 impressions of pure money queries at position 61 with 0 clicks. This is the estate-audit finding ("homepage pos ~51, services pos ~60, money queries 0 clicks") made concrete. Meta work is pointless at position 61; the page needs the core-page engine treatment: a data-led rewrite targeting the "accountants for solicitors / accounting for solicitors" head family, plus internal-link consolidation so `/contact`, `/blog` and `/locations/leeds` stop splitting the same queries (nine head queries currently split across up to five URLs). This is the single highest-value action on the site and should run through `optimisation_engine/corepage/` with an Opus brief.

### consolidate_candidate (5, all owner-approval-required, all subject to the rewrite-only/data-gated-consolidation rules)

**`/` (homepage)** (deterministic)

| Query | 90d impr | Partners splitting the query |
|---|---|---|
| accounting for solicitors | 212 (page total) | `/blog`, `/services` |

Agree there is query overlap, but see Disagreements: the homepage cannot be a consolidation target or source. Treat this as an input to the `/services` core-page run (decide which of homepage and `/services` owns the head family, then align titles, H1s and internal anchors), not as a page merge.

**`/contact`** (ambiguous resolved, action_source=llm)

| Query | 90d impr | Clicks | Position | CTR | Expected CTR |
|---|---|---|---|---|---|
| accountants for lawyers | 143 | 0 | 21.7 | 0% | ~0% |
| accountant for lawyers | 89 | 0 | 18.2 | 0% | ~0% |
| accounting services for law firms | 84 | 0 | 62.9 | 0% | ~0% |
| accountants for legal firms | 66 | 0 | 35.7 | 0% | ~0% |
| law firm accounting services | 33 | 0 | 48.6 | 0% | ~0% |

The contact page is the site's best-ranking URL for "accountant(s) for lawyers" at position 18 to 22, striking distance, while `/services` sits at 41 to 63 for the same family. Google has picked the wrong page. The fix is query consolidation, not a contact-page rewrite: run it inside the `/services` core-page work (strengthen `/services` for the head family, keep `/contact` conversion-only, adjust internal anchors). Not a URL merge, so no redirect; still flagged owner-approval-required because it deliberately moves a striking-distance ranking between pages.

**`/blog/practice-succession-sale/how-to-value-a-uk-law-firm-2026`** (deterministic)

| Query | 90d impr (site) | Partners splitting the query |
|---|---|---|
| law firm valuation formula uk | (sampled) | wip-valuation-method, law-firm-valuation-guide-uk-solicitors (HELD), /calculators/law-firm-valuation (HELD) |
| how to value a partnership interest in a law firm | (sampled) | law-firm-valuation-guide-uk-solicitors (HELD), solicitor-practice-valuation-guide (already 301s) |

Agree this is a real valuation-cluster cannibalisation, but two of the four partners are held to 2026-08-05/2026-08-13 and one partner is already redirected (see Disagreements). Park the whole cluster decision until the valuation-guide hold lifts, then run the data-gated consolidation protocol (fresh GSC+Bing, Bing veto, Opus reasoning, per-cluster owner approval) on the trio: how-to-value-2026, goodwill-valuation, valuation-guide.

**`/blog/practice-accounting/wip-valuation-method-uk-law-firms`** (deterministic)

| Metric | Value |
|---|---|
| Impressions 90d | 11 |
| Overlap | one query ("law firm valuation formula uk") shared with the valuation cluster |

Agree it belongs in the same cluster review, but my lean is differentiate rather than merge: WIP valuation methodology is a distinct sub-topic that should be sharpened to own its own queries, per the rewrite-only rule. Include it in the post-2026-08-05 cluster review.

**`/blog/sra-compliance-trust-accounting/cofa-responsibilities-accounting`** (ambiguous resolved, action_source=llm; GSC reports the legacy flat URL `/blog/cofa-responsibilities-accounting`, 31 impressions, which 301s here)

| Metric | Value |
|---|---|
| Impressions 90d (legacy URL) | 31, 0 clicks |
| Word count / date | 1,539 words, 2026-04-01 |
| Overlap | `/blog/compliance-risk-colp-cofa/cofa-responsibilities-uk-law-firms` (HELD to ~2026-08) covers near-identical COFA-responsibilities ground |

Two live pages target "COFA responsibilities". Candidate for the data-gated consolidation protocol once the sibling's hold lifts; until then, no action.

### new_page_target

See Section 6. The head-family queries (accounting for solicitors, solicitor accountants, and variants) should NOT get a new page; they belong to the `/services` and homepage core-page run above, and a new page would add a sixth URL to an already five-way split. Genuine new-page targets from the unowned list: "client money in business account" (97 impr; informational, no owning page), "barrister accountants near me" (42 impr; the site has a barrister chambers post but no barrister service/landing page), and "partnerships and llp lawyers" (42 impr; likely misaligned intent, verify before building).

## Section 3: Ambiguous resolutions (19 pages at or above 30 impressions, action_source=llm)

| Page | Impr 90d | Clicks | Resolution | Justification |
|---|---|---|---|---|
| `/services` | 538 | 0 | refresh | Money queries at position 61; core-page engine rewrite is the only lever that moves position. |
| `/contact` | 489 | 0 | consolidate_candidate | Best-ranking URL for "accountant for lawyers" (pos 18) is the wrong page; move the query family to `/services` via the core-page run, owner approval required. |
| `/blog/sra-compliance-trust-accounting/solicitor-client-account-reconciliation` | 200 | 2 | expand | Core SRA topic at half the cluster's depth (1,129 words) yet the top non-hold impression earner in the blog. |
| `/blog` | 199 | 0 | healthy | Blog index leaking head-term impressions at position 78; no index-page action, resolves as a by-product of the `/services` core-page run. |
| `/blog/sra-accounts-rules/handling-client-disbursements-properly-uk` | 186 | 9 | healthy | Best click-earner on the site, deep (2,399 words), well-structured; leave alone. |
| `/blog/vat-compliance/damages-based-agreement-dba-accounting-tax-law-firms` | 174 | 2 | healthy | 4,460-word A* piece shipped 2026-06-03, earning clicks; still maturing. |
| `/blog/practice-accounting/how-to-set-fee-earner-targets-uk-law-firms` | 129 | 4 | healthy | Deep (2,866 words), earning clicks with thin query data; no defensible intervention. |
| `/blog/sra-accounts-rules/handling-client-money-interest-sra-rules` | 107 | 1 | healthy | 2,911 words, strong Rule 7 coverage; maturing normally. |
| `/blog/professional-indemnity/top-up-pii-when-is-it-needed-uk-solicitors` | 66 | 0 | healthy | Adequate depth and clean intent match; zero query rows means no evidence for any specific change; re-check next ledger run. |
| `/blog/sra-accounts-rules/client-account-handling-residential-conveyancing` | 59 | 1 | healthy | 2,438 words, practical, worked example; maturing. |
| `/blog/compliance-risk-colp-cofa/common-causes-of-sra-investigations-2026` | 53 | 0 | meta_fix | Sound body, weakest-on-page templated meta description; cheap safe lever while query data is thin. |
| `/blog/fee-earner-tax-and-compensation/sqe-training-costs-tax-deductible-trainees` | 49 | 2 | healthy | Legacy `-and-` category URL; 301s to the canonical `fee-earner-tax-compensation` URL, which is fine (2,319 words, correct s.34 CTA 2009 treatment). Redirect shadow, no action. |
| `/blog/partnership-llp-structure/how-to-reward-equity-partners-tax-efficiently` | 48 | 3 | healthy | 2,796 words, earning clicks; leave alone. |
| `/blog/disbursements-vat-treatment-uk-law-firms` | 45 | 0 | healthy | Legacy flat URL; middleware 301s to the categorised URL, which the deterministic pass already rates healthy. Redirect shadow. |
| `/blog/practice-accounting/llp-tax-return-deadline-uk-2025-26` | 44 | 1 | healthy | Recent (2026-05-19), correct deadlines, adequate depth; maturing. |
| `/blog/law-firm-goodwill-valuation` | 40 | 1 | healthy | Legacy flat URL, 301s to `/blog/practice-succession-sale/law-firm-goodwill-valuation`; redirect shadow. The canonical page joins the valuation-cluster review in Section 2. |
| `/blog/practice-sale-succession/law-firm-ebitda-multiples-uk-2025-26` | 38 | 0 | healthy | Old category spelling, 301s via next.config to the canonical URL, which is HELD to 2026-08-16. Redirect shadow, no action. |
| `/blog/cofa-responsibilities-accounting` | 31 | 0 | consolidate_candidate | Legacy flat URL 301s to the canonical; the canonical near-duplicates a held COFA page. Cluster review after the hold lifts, owner approval required. |
| `/blog/practice-succession-sale/solicitor-practice-sale-guide` | 30 | 3 | healthy | 2,355 words, BADR figure already correct at 18%, earning clicks; leave alone. |

### Thin ambiguous pages (below 30 impressions): no action yet

| Count | Total impressions 90d | Total clicks 90d | Classification |
|---|---|---|---|
| 52 | 430 | 7 | thin, no action yet; re-evaluate at the next ledger run |

## Section 4: Disagreements with deterministic calls

1. **`/` homepage as consolidate_candidate: disagree with the framing.** The homepage cannot be merged into anything and nothing should be merged into it. The underlying signal (head-query split with `/services` and `/blog`) is real, but the correct action is the `/services`/homepage core-page engine run deciding a single owner for the head family. Recorded here; JSON left unchanged.
2. **`/blog/practice-succession-sale/solicitor-practice-valuation-guide` as consolidate_candidate: already done.** `src/middleware.ts` already 301s this slug to `/blog/practice-succession-sale/law-firm-valuation-guide-uk-solicitors`. The JSON entry (64 impressions) is a redirect shadow of an executed consolidation; no further action exists to take.
3. **Minor: `/blog/conveyancing-compliance/how-much-do-uk-conveyancing-solicitors-charge` rated healthy at 424 impressions, 0 clicks, position 74.** Healthy is defensible today (position is the constraint sitewide), but the estate audit flags a conveyancing-fee blog versus fee-page cannibalisation, and three unowned conveyancing-fee queries (Section 6) sit adjacent. When the conveyancing hold pages clear, this page should anchor a conveyancing-fee cluster review rather than being left indefinitely as healthy.

## Section 5: Healthy pages (deterministic)

- `/blog/conveyancing-compliance/how-much-do-uk-conveyancing-solicitors-charge`: 424 impressions, position 74; see Disagreements item 3.
- `/blog/sra-accounts-rules/sra-accounts-rules-explained-for-uk-solicitors`: 87 impressions, position 47, declining but no query-level evidence for a change.
- `/blog/vat-compliance/disbursements-vat-treatment-uk-law-firms`: 38 impressions, the canonical Eight Conditions page; strong.
- `/blog/practice-accounting/uk-law-firm-cash-flow-management`: 37 impressions, stable.
- `/blog/vat-compliance/solicitor-cyber-insurance-tax-treatment`: 37 impressions, position 42.
- `/blog/vat-compliance/flat-rate-scheme-for-uk-solicitors`: 28 impressions, position 27.
- `/blog/firm-acquisition-merger/sra-consent-on-firm-acquisition`: 27 impressions, position 15.
- `/blog/compliance-risk-colp-cofa/colp-and-cofa-roles-explained-uk-law-firms`: 21 impressions.
- `/blog/practice-sale-and-succession/buying-a-uk-law-firm-financial-due-diligence`: 20 impressions; legacy `-and-` URL, 301s to the canonical, no action.
- `/blog/fee-earner-tax-compensation/newly-qualified-solicitor-salary-uk-2025-26`: 19 impressions at position 2.2, the site's best position.
- `/blog/practice-sale-succession/sole-practitioner-succession-planning-uk`: 14 impressions, position 13 (old category URL, 301s to canonical).
- `/blog/conveyancing-compliance/client-due-diligence-for-uk-conveyancers`: 13 impressions.
- `/blog/practice-finance-cash-flow/leap-accounting-integration-guide`: 13 impressions, position 9.5.
- `/blog/partnership-llp-accounting/law-firm-profit-extraction`: 11 impressions, 1 click, position 12.

## Section 6: Unowned queries (new_page_target inputs)

| Query | Impr 90d | Best position | Recommended disposition |
|---|---|---|---|
| accounting for solicitors | 603 | 47.4 | Do NOT build a new page; assign to `/services` core-page run (head family). |
| accounting services for law firms | 117 | 57.9 | Same: `/services` head family. |
| client money in business account | 97 | 64.9 | Genuine new-page target (informational; no owning page despite the client-money cluster). |
| accountants for legal firms | 87 | 34.0 | `/services` head family. |
| solicitor accountants | 73 | 35.2 | `/services` head family. |
| how much should solicitors charge for conveyancing | 66 | 62.2 | Fold into the conveyancing-fee cluster review (Section 4, item 3), not a new page. |
| solicitor accountant | 66 | 34.6 | `/services` head family. |
| accountants for solicitors | 58 | 57.1 | `/services` head family. |
| partnerships and llp lawyers | 42 | 37.2 | Verify intent first; likely searchers wanting lawyers, not accountants. Probably skip. |
| barrister accountants near me | 42 | 57.4 | New-page target: barrister service/landing page (only a chambers blog post exists today). |
| law firm cashflow management | 36 | 47.5 | Owned in practice by `/blog/practice-accounting/uk-law-firm-cash-flow-management`; internal-linking and title alignment, not a new page. |
| law firm accounting services | 35 | 38.0 | `/services` head family. |
| how much does it cost for conveyancing by solicitor | 34 | 63.5 | Conveyancing-fee cluster review. |
| residential conveyancing fees | 33 | 68.1 | Conveyancing-fee cluster review. |

---

Prepared read-only from `solicitors_ledger.json` (2026-07-17) plus live source inspection under `Solicitors/web`. No site files, config, git state or Supabase were touched.
