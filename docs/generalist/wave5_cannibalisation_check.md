# Generalist (Holloway Davies) Wave 5 — cannibalisation check

Date: 2026-09-11
Scope: 24 picks with `decision == "build"` in `expansion_research/highstreet_2026-09-10/picks/generalist.jsonl`
Corpus audited: `generalist/web/content/blog/*.md` (457 files), plus `containment.json` from research leg 6.

Method note: the NETNEW_PROGRAM.md section 4 token-Jaccard gate was deliberately NOT used as the decision.
The new pages are named by tax mechanic while the 457 existing posts are named by trade ("accountant for X")
and by topic, so shared tokens are near-zero even where the intent is identical — and conversely the word
"vat" alone pulls 20 false neighbours. Jaccard was triage only. Every verdict is a reasoned read of existing
frontmatter, with bodies opened where the call was close (noted inline).

## Verdicts

| Pick slug | Verdict | Evidence | Action |
|---|---|---|---|
| `insurance-premium-tax` | NET-NEW | No existing page targets IPT. `can-i-claim-home-insurance-on-my-taxes.md` is a deductibility page, not an IPT page | Build. IPT (12% standard / 20% higher) is not VAT and no page on the estate says so. Link to `can-i-claim-home-insurance-on-my-taxes.md` and to the new `zero-rated-vat`. See CONFLICT note on the "is insurance vat exempt or zero-rated" phrasing. |
| `vat-exemption` | LINK | No dedicated exemption page exists; `when-to-register-for-vat-zero-rated-goods.md` and `vat-threshold-2025-26.md` are adjacent | Build as the exempt-vs-zero-rated-vs-outside-scope hub. Must link down to every exemption child page (education, health, membership, funeral, insurance) and up to `vat-threshold-2025-26.md` (exempt supplies do not count toward the £90,000 test — that is the page's commercial point). See CONFLICT note. |
| `nanny-tax` | NET-NEW | Nothing in the corpus covers household employment. `accountant-for-childminders-uk.md` is the childminder's own self-employment, the opposite side of the relationship | Build. Link to `how-to-register-for-paye-uk-employers.md` and `payroll-for-one-employee-uk-director-guide.md`. |
| `cash-basis` | NET-NEW | Existing cash-basis pages are all sole-trader-scoped: `cash-basis-vs-accruals-sole-trader.md`, `sole-trader-accountant-cash-accounting.md`, `cash-basis-sole-trader-loss.md` | Build as the bare head-term hub ("cash basis") that routes to the three existing children. This only survives if `cash-vs-accrual-basis-of-accounting` is dropped — see CONFLICT. |
| `vat-on-second-hand-cars` | LINK | `generalist/web/content/blog/vat-margin-scheme-used-cars.md` (the mechanic), plus `car-dealership-accounting-uk.md` and `accountant-for-car-dealers-uk.md` | Build. The margin-scheme page is a dealer-side calculation page; this pick is the buyer-side head term ("vat on cars", "vat on new cars"). Link both ways. See CONFLICT on `reclaiming vat on cars`. |
| `zero-rated-vat` | LINK | `generalist/web/content/blog/when-to-register-for-vat-zero-rated-goods.md` | Build. The existing page answers only the registration question for a zero-rated seller; this pick is the rate definition and the exempt-vs-zero-rated distinction. Bidirectional link. See CONFLICT with `vat-exemption`. |
| `cash-vs-accrual-basis-of-accounting` | DEEPEN | `generalist/web/content/blog/cash-basis-vs-accruals-sole-trader.md` | Same intent, same comparison, near-identical slug. The existing page already carries "cash basis is now the default", who must use accruals, a worked example and the election-out mechanism. Extend it (add the limited-company/accruals-mandatory angle that the pick's broader framing implies) rather than publishing. Human decision required. |
| `vat-cash-basis-threshold` | NET-NEW | No page covers the VAT cash accounting scheme's £1.35m entry / £1.6m exit thresholds. `vat-threshold-2025-26.md` is the £90,000 registration threshold — a different number for a different scheme | Build. Trap to flag to the writer: the pick's `cash-business` mechanic label groups this with income-tax cash basis, but they are unrelated regimes. The page must open by separating them. Link to `cash-basis`, `vat-threshold-2025-26.md` and `retail-vat-schemes-uk.md`. |
| `vat-on-company-cars` | LINK | `limited-company-car-tax-relief-2025-26.md` (already carries the 50% VAT block), `p11d-company-car-fuel-paid-by-director.md`, `writing-down-allowance-cars.md` | Build. The existing car pages are capital-allowances and benefit-in-kind pages that mention the VAT block in passing; none targets the VAT query. Link both ways to all three. This pick owns the input-tax block and the reclaim question — see CONFLICT. |
| `vat-on-membership-fees` | NET-NEW | Nothing in the corpus covers the sports-club / trade-body membership exemption | Build. Link to `vat-exemption`. |
| `vat-on-electric-cars` | LINK | `enhanced-capital-allowances-ev-charging-points-2025-26.md`, `limited-company-car-tax-relief-2025-26.md` | Build. Existing EV pages are capital-allowances pages; neither answers the VAT question (including the domestic-charging 5% vs 20% split). Link both ways, and to `vat-on-company-cars`. |
| `vat-on-leased-cars` | LINK | `limited-company-car-tax-relief-2025-26.md` (buy-vs-lease) | Build. The 50% lease block is a distinct mechanic from the outright-purchase block and carries its own query. Link to `vat-on-company-cars` and the existing buy-vs-lease page. |
| `funeral-costs` | NET-NEW | Nothing in the corpus. `trust-accountant-uk-inheritance-tax-planning.md` is adjacent only via IHT deductibility | Build. Note: weakest commercial fit of the 24 — a consumer query on a B2B accountancy site. Recommend it is written as the VAT exemption plus the IHT-deductibility angle, not as a consumer price guide, and linked to the IHT page. |
| `vat-on-printing` | NET-NEW | No page covers printed matter | Build. The zero-rated-vs-standard boundary (leaflets vs letterheads) is a genuine recurring SME question. Link to `zero-rated-vat`. |
| `retail-scheme` | DEEPEN | `generalist/web/content/blog/retail-vat-schemes-uk.md` | The existing page is exactly this: point of sale, apportionment, direct calculation, the £1m and £130m gates, worked over one shop's quarter. The pick adds nothing but a shorter slug. Extend the existing page to also rank for the bare term "retail scheme" rather than publishing a competitor to it. Human decision required. |
| `vat-on-education` | LINK | No existing education-VAT page; `accountant-for-schools-uk.md`, `accountants-for-nurseries-uk.md` and `accountant-for-tutors-uk.md` each touch it in passing | Build, and make it the single owner of education VAT (see CONFLICT). Must cover the January 2025 removal of the private-school exemption — none of the three trade pages does. Link to all three trade pages; all three link back. |
| `cash-basis-capital-allowances` | DEEPEN | `generalist/web/content/blog/sole-trader-capital-allowances.md` — body checked, it already carries the cash-basis treatment (no AIA, direct deduction, proceeds as receipts, the cars exception and the 55p mileage alternative) | The pick's entire scope is already written inside a live page. Extend that section and give it its own anchor rather than publishing a page that would cannibalise it. Human decision required. |
| `vat-exemption-education` | CONFLICT | Competes with pick `vat-on-education` | Same intent, and the pick is also mislabelled with the `health-exemption` mechanic rather than `education-exemption`. Drop it; move "vat exemption education" into `vat-on-education`'s `covers`. Human decision required. |
| `vat-retail-export-scheme` | NET-NEW | No existing page. Distinct from `retail-vat-schemes-uk.md` despite the name similarity | Build. Factual trap for the writer: the VAT Retail Export Scheme was withdrawn in Great Britain on 1 January 2021 and survives only for Northern Ireland; the page must lead with that or it will be wrong on arrival. Link to `northern-ireland-retail-movement-scheme`. |
| `cash-basis-allowable-expenses` | LINK | `generalist/web/content/blog/allowable-expenses-sole-trader-checklist.md` — body checked, it mentions cash basis once as context and is otherwise a general checklist | Build, but borderline. The distinct content is what cash basis changes: no accruals, the interest restriction, capital items deducted as revenue. If the writer cannot fill a page beyond that delta, convert to DEEPEN on the checklist. Bidirectional link required either way. |
| `northern-ireland-retail-movement-scheme` | NET-NEW | Nothing in the corpus covers the Windsor Framework green/red lane | Build. Link to `vat-retail-export-scheme` and `vat-accountant-importing-goods-uk.md`. |
| `vat-on-transport` | LINK | `generalist/web/content/blog/vat-on-taxi-fares-uk.md` | Build. The taxi page is one vehicle class and is dominated by the July 2025 Supreme Court private-hire ruling; this pick is the passenger-transport zero rate (the 10-or-more-passenger rule) across rail, coach, air and ferry. Distinct. Link both ways. |
| `rent-a-chair` | DEEPEN | `generalist/web/content/blog/rent-a-chair-salon-tax-uk.md` | The existing page is this page: chair rent standard rated, the £90,000 threshold interaction, employment status, both sides of the deal, 2026/27 figures. The pick's single `covers` term is the existing page's own head term. Extend, do not publish. Human decision required. |
| `agent-or-principal` | NET-NEW | No page covers the agent-vs-principal VAT and turnover test | Build. High value: it determines whether a marketplace or booking business counts gross or net toward the VAT threshold. Link to `vat-threshold-2025-26.md` and `accountant-for-ecommerce-sellers.md`. |

## Decisions a human must make

### DEEPEN (4) — existing pages already own the intent

1. **`cash-vs-accrual-basis-of-accounting` → `cash-basis-vs-accruals-sole-trader.md`.** Recommend extend, do not publish. Publishing would put two near-identically-slugged comparison pages on the same site.
2. **`retail-scheme` → `retail-vat-schemes-uk.md`.** Recommend extend. The existing page is more complete than the pick's brief.
3. **`cash-basis-capital-allowances` → `sole-trader-capital-allowances.md`.** Recommend extend the existing cash-basis section. Verified in the body, not just the frontmatter.
4. **`rent-a-chair` → `rent-a-chair-salon-tax-uk.md`.** Recommend extend. Same head term, same page.

### CONFLICT (4) — two new picks competing with each other

1. **`vat-exemption-education` vs `vat-on-education`.** Recommend `vat-on-education` owns the intent (broader head term, correct mechanic label). Drop `vat-exemption-education` and move its `covers` phrasing across. The third member of the group, `vat-exemption`, survives as the parent hub provided it stays generic and does not work education examples.
2. **`vat-on-company-cars` vs `vat-on-second-hand-cars` over the reclaim phrasings.** "reclaiming vat on cars" (on `vat-on-second-hand-cars`) and "vat reclaim on company cars" (on `vat-on-company-cars`) are one intent split across two pages. Recommend `vat-on-company-cars` owns all reclaim/input-tax-block phrasings; `vat-on-second-hand-cars` drops "reclaiming vat on cars" and keeps the margin-scheme and new-vs-used purchase angle.
3. **`zero-rated-vat` vs `vat-exemption` vs `insurance-premium-tax` over "is insurance vat exempt or zero-rated".** All three pages will want to answer it. Recommend `zero-rated-vat` owns the phrasing (the query is a zero-rated-vs-exempt definition question and the phrase contains the term); `vat-exemption` links to it; `insurance-premium-tax` answers only the IPT-is-not-VAT point.
4. **`cash-basis` vs `cash-vs-accrual-basis-of-accounting`.** Both target the cash-basis head term and the four-pick `cash-business` group is over-built for the demand behind it. Recommend `cash-basis` survives as the hub, `cash-vs-accrual-basis-of-accounting` is resolved as the DEEPEN above, and the group ships as two new pages (`cash-basis`, `vat-cash-basis-threshold`) plus two extensions.

Net effect if all recommendations are accepted: 24 picks become 18 builds plus 4 extensions of live pages
(two picks, `cash-vs-accrual-basis-of-accounting` and `vat-exemption-education`, are dropped; `retail-scheme`,
`cash-basis-capital-allowances` and `rent-a-chair` become extensions).

## Counts

| Verdict | Count |
|---|---|
| NET-NEW | 8 |
| LINK | 8 |
| DEEPEN | 4 |
| CONFLICT | 4 |
| Total | 24 |
