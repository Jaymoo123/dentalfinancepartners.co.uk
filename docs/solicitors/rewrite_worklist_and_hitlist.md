# Solicitors Track-2 rewrite — worklist + staleness hit-list

Built 2026-06-03 by the rewrite session. Drives the in-place de-stale batches.
Targets are the **150 git-tracked legacy blog pages** (net-new pages arrive as new
untracked slugs and are NOT touched here). Every "correct value" cites
`house_positions.md` by section. NOT committed.

## A. Demand-ranked worklist (page-level GSC + Bing, combined impressions, excl. monitored_pages = 0)

Thin, as expected (Bing carries the demand; Google is deep-ranked). Blog rewrite targets only (homepage/contact excluded):

| slug | comb impr | comb clk | Google pos | Bing q | stale? |
|---|---|---|---|---|---|
| sra-accounts-rules-compliance-guide | 220 | 5 | 59 | 48 | check (SRA cluster) |
| solicitor-trust-accounting-guide | 95 | 4 | - | 51 | check |
| vat-on-legal-services | 44 | 7 | - | 39 | check (disbursements) |
| counsel-fees-vat-guide-uk-law-firms | 25 | 1 | - | 15 | check |
| llp-vs-partnership-tax | 12 | 2 | - | 9 | YES (Class 2 £3.45/wk) |
| law-firm-profit-extraction | 10 | 1 | 7 | - | YES (BADR 10%, CGT 10/20, div untagged) |
| law-firm-payroll-services | 4 | - | 54 | - | check |
| solicitor-client-account-reconciliation | 4 | - | 46 | - | check |
| llp-employer-ni-2026 | 2 | 1 | - | 2 | YES (speculative employer-NI page) |

(Full ranked set in `.cache/solicitors_onboard/worklist.json`.) Demand is low across the board, so staleness (Section B) is the primary driver; demand only sets batch order within a cluster.

## B. Staleness hit-list (stale token -> current value -> HP section -> pages)

### B1. SRA accountant's-report exemption "£250" (WRONG, systematic) -> §5
Pages state "held no more than £10,000 at any time AND average balance did not exceed **£250**". BOTH limbs are wrong. Correct (§5, SRA Rule 12.2): exempt if balances do not exceed **an average of £10,000 AND a maximum of £250,000**. The "£10,000 at any time" should be the £250,000 maximum; the "average £250" should be the £10,000 average.
Pages: `sra-accounts-rules-explained-for-uk-solicitors`, `sra-accountants-report-exemption-thresholds` (whole page + worked example built on £250), `when-is-an-sra-accountants-report-required`, `how-to-prepare-for-sra-accountants-report`, `sra-accountants-report`, `sra-client-account-reconciliation-frequency`, `what-counts-as-client-money-uk-solicitors`, `handling-client-money-interest-sra-rules`, `common-sra-accounts-rules-breaches-and-how-to-fix`, `cofa-responsibilities-uk-law-firms`, `colp-and-cofa-roles-explained-uk-law-firms`, `llp-accounts-and-filing-requirements-uk`.

### B2. SDLT nil-rate band + FTB (stale temporary thresholds) -> §7
`sdlt-calculation-uk-conveyancing-solicitors` states nil-rate **£250,000** + FTB **£425,000 up to £625,000** "from 1 April 2025". Correct (§7): from 1 Apr 2025 nil-rate **£125,000** (2% £125k-£250k), FTB **£300,000** (to £500,000). (Its 5% additional-dwelling surcharge IS already correct.)

### B3. Conveyancing devolved-tax staleness -> §7
- `ltt-vs-sdlt-comparison-welsh-conveyancing`: England SDLT shown with £250k nil-band + **3% surcharge** (£6,000 example); both "slab" mislabelled; Welsh ADS 4%. Correct: SDLT nil £125k + **5% surcharge** (31 Oct 2024); LTT/SDLT are **progressive**; Welsh higher-rate tables open **5% from 11 Dec 2024**.
- `lbtt-rates-scottish-conveyancing-firms`: calls LBTT a **slab** system; ADS **6%**. Correct: LBTT is **progressive**; ADS **8% from 5 Dec 2024**.

### B4. Conveyancing/disbursement VAT predates Brabners -> §6 / §6.A
`disbursements-vat-treatment-uk-law-firms`, `conveyancing-vat-rules-uk-2025-26`: treat search fees as automatic VAT-free disbursements; no Brabners / R&C Brief 6 (2020). Correct (§6.A): a search fee used/interpreted in the firm's advice is part of the firm's standard-rated supply; postal concession withdrawn 1 Dec 2020.

### B5. BADR / CGT at "10%" (and main CGT "10%/20%") -> §9
- `law-firm-goodwill-valuation` (BADR "reducing CGT to 10%")
- `solicitor-practice-sale-guide` ("BADR at 10%")
- `law-firm-profit-extraction` ("CGT rates 10% or 20% for 2025/26" + BADR 10%)
Correct (§9): BADR **14%** (to 5 Apr 2026) then **18%** (from 6 Apr 2026), £1m lifetime; standard CGT **18%/24%** on all assets from 30 Oct 2024; AEA **£3,000**. Also check `goodwill-tax-treatment-law-firm-sale`, `asset-sale-vs-share-sale-uk-law-firm`, `wip-treatment-on-law-firm-sale`, `how-llp-members-are-taxed-uk-2025-26` for AEA/standard-rate currency.

### B6. Class 2 NIC stated as still payable (£3.45/week) -> §3 / §8
Correct (§3): Class 2 liability **removed from 6 April 2024**; Class 4 6%/2%.
Stale pages: `law-firm-partnership-tax-guide` ("£3.45 per week"), `llp-member-taxation-guide-uk-law-firms` ("£3.45 per week (2024/25)"), `llp-vs-partnership-tax` ("£3.45 per week"), `sole-practitioner-solicitor-tax-guide` ("£3.45 per week"), `law-firm-drawings-vs-profit`, `solicitor-expenses-claims-tax-relief-guide`.
(Already correct, leave: `locum-solicitor-tax-uk-2025-26`, `partnership-accounts-preparation-uk-2025-26`, `salary-vs-profit-share-tax-uk-partner-solicitor`.)

### B7. Dividend rates without FA-2026 forward rate -> §3
State 2025/26 8.75%/33.75% with no 6 Apr 2026 -> 10.75%/35.75% (FA 2026 s.4): `can-a-non-lawyer-buy-a-uk-law-firm-abs-explained`, `consultant-solicitor-structures-uk`, `law-firm-profit-extraction`, `merging-two-uk-law-firms-tax-and-sra`.

### B8. VAT registration £85,000 stated as current -> §6
`making-tax-digital-solicitors` ("over £85,000"), `solicitor-self-assessment-uk-tax-guide` ("turnover over £85,000"). Correct: **£90,000** (from 1 Apr 2024). (`do-uk-solicitors-charge-vat` correctly says "rose from £85,000" — leave.)

### B9. Speculative "LLP employer NI from 2026" -> §2.A / §3
`llp-employer-ni-2026` (whole page on a "proposed" change), `partner-profit-allocation-uk-law-firms`, `solicitor-expenses-claims-tax-relief-guide`. Correct: LLP members are self-employed; employer NIC only arises where the **salaried member rules (§2.A)** catch a member. FA 2026 did NOT introduce employer NIC on member profit shares. Reframe to the salaried-member position; drop the speculation.

### B10. PII £2m/£3m reversed -> §10
`professional-indemnity-insurance-tax-treatment-uk` states "£2m (or £3m for sole practitioners/partnerships)". Reversed: **£3m** for LLPs/companies/ABSs, **£2m** for sole practitioners/partnerships. Also states cash basis "under £150,000" (abolished 6 Apr 2024; LLPs excluded, §4).

### B11. Basis-period meta wrong year -> §4
`basis-period-reform-law-firms` meta says tax-year basis "from 2026/27"; correct is **2024/25** (transition 2023/24). Body is right; fix the meta.

### B12. Pricing / hourly rates (lead-gen site = no agency pricing) -> locked rule
Clear violations (the accountancy service's own fees): `solicitor-accountant-fees` ("most solicitor accountants charge £150-£400/hr"), `solicitor-accountant-cost`. Remove agency pricing.
Judgment-call (informational pricing about SOLICITORS' own businesses, not the agency's, arguably legitimate SEO content): `how-much-do-uk-solicitors-charge-per-hour`, `how-much-do-uk-conveyancing-solicitors-charge`, `how-much-does-it-cost-to-start-a-law-firm-uk`, `how-much-does-it-cost-to-buy-into-uk-law-firm-partnership`. FLAG for the human: keep as informational or strip? (Default: keep, since they describe the client's market, not the agency's fees.)

### B13. Em-dashes (U+2014) -> locked rule (0 em-dashes)
195 occurrences across 32 files. Strip on every page touched (commas/parentheses/full stops/middle dots). Non-blocking warning today, but no rewrite should re-emit one.

## C. Prioritised batch plan (~10-13 distinct-intent pages each, near-dupes split across batches)
- **Batch 1 - SRA accounts cluster (B1):** the 12 £250-error pages. Highest correctness value + the top-demand page (sra-accounts-rules-compliance-guide) sits here. Split the near-dupe SRA-report pages across 1A/1B so each differentiates against an already-fixed sibling.
- **Batch 2 - Conveyancing taxes + VAT (B2,B3,B4,B8):** sdlt-calculation, ltt-vs-sdlt, lbtt-rates, disbursements-vat, conveyancing-vat-rules, vat-on-legal-services, counsel-fees, making-tax-digital, solicitor-self-assessment.
- **Batch 3 - Sale / CGT / BADR (B5):** goodwill-valuation, practice-sale-guide, profit-extraction, goodwill-tax-treatment, asset-sale-vs-share-sale, wip-treatment, how-llp-members-are-taxed.
- **Batch 4 - Structure / NIC / dividend (B6,B7,B9):** partnership-tax-guide, llp-member-taxation-guide, llp-vs-partnership-tax, sole-practitioner-tax-guide, drawings-vs-profit, expenses-claims, abs-explained, consultant-structures, merging-two-firms, llp-employer-ni-2026, partner-profit-allocation.
- **Batch 5 - PII / basis-period / pricing / em-dash tail (B10,B11,B12,B13):** professional-indemnity-insurance, basis-period-reform, solicitor-accountant-fees, solicitor-accountant-cost, + opportunistic em-dash sweep on any remaining demand pages.
