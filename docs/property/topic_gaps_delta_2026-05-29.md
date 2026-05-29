# Property -- topic gaps delta (MW4 prep, 2026-05-29)

Sitemap re-sweep against the data-driven competitor universe v2 (see `competitor_universe_v2.md`). Compared the top competitor domains by SERP frequency against:
- 376 existing Property pages (`Property/web/content/blog/*.md`)
- 395 slugs in the user-narrowed candidate pool (`docs/property/topic_gaps_final.md`)

**Domains crawled:** 55 (of 55 target).
**Domains with no topical data after filter (Cloudflare-blocked or no property-content):** 10
- `accountingweb.co.uk`, `atsonbuckle.co.uk`, `dnsassociates.co.uk`, `everestandco.co.uk`, `hich.co.uk`, `rentpost.com`, `rossmartin.co.uk`, `simplybusiness.co.uk`, `taxationweb.co.uk`, `thp.co.uk`

**Topical URLs after tightened filter:** 4252
**Net-new candidates (Jaccard < 0.30):** 1127 (excluding `Other` cluster, see JSON for full dump)
**Partial-overlap (Jaccard 0.30-0.55, flagged for manager review):** 828 (excluding `Other`)

Filter (`is_property_topical`): slug has 3-25 tokens AND 2+ property/tax topic tokens (or 1 token + strong URL-path indicator). Excludes `/news/` paths, foreign-language slugs, date-prefixed slugs, politician-name slugs, news-verb slugs (`rises|reveals|warns|...`), staff/event-marketing slugs, marketing-text-as-slug.

Token-similarity threshold per NETNEW_PROGRAM section 11.1: Jaccard < 0.30 = net-new; 0.30-0.55 = partial overlap (manager review); >= 0.55 = covered (dropped).

**Charter:** NETNEW_PROGRAM section 16.21. DO NOT merge into `topic_gaps_final.md` without manager review.

---

## Cluster summary (excluding `Other`)

| Cluster | Net-new | Partial overlap |
|---|---:|---:|
| VAT | 290 | 70 |
| CGT | 66 | 148 |
| MTD | 79 | 119 |
| LtdCo_Incorporation | 109 | 79 |
| IHT | 90 | 97 |
| SDLT | 86 | 69 |
| Mortgage_BTL | 75 | 31 |
| IR35 | 71 | 11 |
| NonResident_Expat | 41 | 40 |
| FHL | 49 | 23 |
| CapitalAllowances | 12 | 25 |
| RRA_2025 | 25 | 11 |
| SelfAssessment | 5 | 29 |
| PropertyDev_Trading | 20 | 14 |
| ATED | 21 | 10 |
| Trusts_Estates | 23 | 3 |
| Lease_Freehold | 13 | 4 |
| AccountantByCity | 5 | 10 |
| LBTT_Scottish | 11 | 3 |
| S24_MortgageInterest | 2 | 12 |
| Partnership_LLP | 7 | 6 |
| CompaniesHouse_ECCTA | 8 | 3 |
| Penalties_HMRC | 7 | 4 |
| LTT_Welsh | 8 | 2 |
| HMO | 4 | 2 |
| RentARoom | 0 | 3 |
| *(Other, JSON-only)* | 1218 | 665 |

---

## Net-new candidates by cluster (Jaccard < 0.30)

### VAT (290 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `hmrcs-vat-investigations-yield-11-4bn-uncovering-unpaid-taxes-surge` | https://www.ukpropertyaccountants.co.uk/hmrcs-vat-investigations-yield-11-4bn-uncoverin... | 0.09 | 0.09 | tokens: 11, 4bn, hmrcs, investigations, surge, taxes |
| `vat-debt-relief-british-telecom-plc-vs-hmrc` | https://www.taxaccountant.co.uk/vat-debt-relief-british-telecom-plc-vs-hmrc/ | 0.12 | 0.11 | tokens: british, debt, hmrc, plc, relief, telecom |
| `online-agent-authorisation-hmrc-stops-service-for-vat-clients` | https://www.ukpropertyaccountants.co.uk/online-agent-authorisation-hmrc-stops-service-f... | 0.14 | 0.14 | tokens: agent, authorisation, clients, for, hmrc, online |
| `overpaid-vat-refunds-hmrc-may-block-refunds` | https://www.taxaccountant.co.uk/overpaid-vat-refunds-hmrc-may-block-refunds/ | 0.14 | 0.14 | tokens: block, hmrc, may, overpaid, refunds, vat |
| `solicitor-client-account-interest-and-hidden-vat-issues` | https://www.geraldedelman.com/insights/solicitor-client-account-interest-and-hidden-vat... | 0.14 | 0.14 | tokens: account, and, client, hidden, interest, issues |
| `court-of-appeal-sides-with-hmrc-in-75k-vat-dispute` | https://www.ukpropertyaccountants.co.uk/court-of-appeal-sides-with-hmrc-in-75k-vat-disp... | 0.15 | 0.15 | tokens: 75k, appeal, court, dispute, hmrc, in |
| `gerald-edelman-helps-childcare-business-defeat-hmrc-at-vat-tribunal` | https://www.geraldedelman.com/insights/gerald-edelman-helps-childcare-business-defeat-h... | 0.15 | 0.13 | tokens: at, business, childcare, defeat, edelman, gerald |
| `hmrc-pursues-uber-for-386m-vat-bill` | https://www.ukpropertyaccountants.co.uk/hmrc-pursues-uber-for-386m-vat-bill/ | 0.12 | 0.15 | tokens: 386m, bill, for, hmrc, pursues, uber |
| `hmrc-updates-a-new-vat-penalty-regime-changing-policy-for-museums-and-galleries-and-new-legislation-to-energy-support-schemes` | https://hwfisher.co.uk/hmrc-updates-a-new-vat-penalty-regime-changing-policy-for-museum... | 0.16 | 0.16 | tokens: a, and, changing, energy, for, galleries |
| `the-isle-of-wight-nhs-trust-locum-doctors-vat-case-what-it-means-for-gp-practices` | https://bhp.co.uk/news-events/blog/the-isle-of-wight-nhs-trust-locum-doctors-vat-case-w... | 0.12 | 0.16 | tokens: case, doctors, for, gp, isle, it |
| `ubers-1-3bn-vat-victory-travel-tax-rules-now-apply-to-ride-apps` | https://www.ukpropertyaccountants.co.uk/ubers-1-3bn-vat-victory-travel-tax-rules-now-ap... | 0.16 | 0.12 | tokens: 1, 3bn, apply, apps, now, ride |
| `help-hmrc-has-started-a-vat-inspection` | https://www.geraldedelman.com/insights/help-hmrc-has-started-a-vat-inspection/ | 0.12 | 0.17 | tokens: a, has, help, hmrc, inspection, started |
| `leased-apartments-sub-let-on-airbnb-vat-toms-or-not` | https://uklandlordtax.co.uk/leased-apartments-sub-let-on-airbnb-vat-toms-or-not/ | 0.17 | 0.14 | tokens: airbnb, apartments, leased, let, not, on |
| `vat-and-fundraising-some-good-news` | https://bhp.co.uk/news-events/charity/vat-and-fundraising-some-good-news/ | 0.17 | 0.17 | tokens: and, fundraising, good, news, some, vat |
| `vat-threshold-vehicle-leasing-companies-uk` | https://www.business-accounting.co.uk/blog/vat-threshold-vehicle-leasing-companies-uk | 0.17 | 0.14 | tokens: companies, leasing, threshold, uk, vat, vehicle |
| `why-hmrc-rejects-vat-registrations` | https://www.ukpropertyaccountants.co.uk/why-hmrc-rejects-vat-registrations/ | 0.17 | 0.17 | tokens: hmrc, registrations, rejects, vat, why |
| `can-hmrc-audit-my-vat-returns` | https://www.towerstone.co.uk/can-hmrc-audit-my-vat-returns | 0.18 | 0.14 | tokens: audit, can, hmrc, my, returns, vat |
| `can-i-reclaim-vat-on-company-cars-or-vans` | https://www.towerstone.co.uk/can-i-reclaim-vat-on-company-cars-or-vans | 0.18 | 0.15 | tokens: can, cars, company, i, on, or |
| `golf-holidays-worldwide-ltd-s-vat-toms-treatment-revision` | https://www.ukpropertyaccountants.co.uk/golf-holidays-worldwide-ltd-s-vat-toms-treatmen... | 0.18 | 0.13 | tokens: golf, holidays, ltd, revision, s, toms |
| `non-refundable-deposits-and-vat` | https://www.geraldedelman.com/insights/non-refundable-deposits-and-vat/ | 0.18 | 0.18 | tokens: and, deposits, non, refundable, vat |
| `vat-advice-and-support-for-academy-trusts` | https://www.djh.co.uk/specialisms/education/vat-advice-and-support-for-academy-trusts/ | 0.18 | 0.18 | tokens: academy, advice, and, for, support, trusts |
| `vat-and-charging-electric-vehicles` | https://www.geraldedelman.com/insights/vat-and-charging-electric-vehicles/ | 0.18 | 0.18 | tokens: and, charging, electric, vat, vehicles |
| `vat-flat-rate-scheme-is-it-really-worth-it` | https://www.taxaccountant.co.uk/vat-flat-rate-scheme-is-it-really-worth-it/ | 0.18 | 0.17 | tokens: flat, is, it, rate, really, scheme |
| `vat-return-deadline-still-applies-on-weekends-bank-holidays-reminds-hmrc` | https://www.ukpropertyaccountants.co.uk/vat-return-deadline-still-applies-on-weekends-b... | 0.14 | 0.18 | tokens: applies, bank, deadline, hmrc, holidays, on |
| `vat-revolution-in-private-education` | https://www.taxaccountant.co.uk/vat-revolution-in-private-education/ | 0.17 | 0.18 | tokens: education, in, private, revolution, vat |
| `vat-schemes-best-for-agencies` | https://www.business-accounting.co.uk/blog/vat-schemes-best-for-agencies | 0.17 | 0.18 | tokens: agencies, best, for, schemes, vat |
| `vat-schemes-best-for-contractors` | https://www.business-accounting.co.uk/blog/vat-schemes-best-for-contractors | 0.17 | 0.18 | tokens: best, contractors, for, schemes, vat |
| `vat-surprises-payback-and-clawback-rules` | https://www.taxaccountant.co.uk/vat-surprises-payback-and-clawback-rules/ | 0.18 | 0.18 | tokens: and, clawback, payback, rules, surprises, vat |
| `vat-threshold-amazon-sellers-uk` | https://www.business-accounting.co.uk/blog/vat-threshold-amazon-sellers-uk | 0.18 | 0.17 | tokens: amazon, sellers, threshold, uk, vat |
| `vat-threshold-beauty-salons-uk` | https://www.business-accounting.co.uk/blog/vat-threshold-beauty-salons-uk | 0.18 | 0.17 | tokens: beauty, salons, threshold, uk, vat |
| *(+260 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### CGT (66 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `ir35-decisions-blanket-approach` | https://www.qaccounting.com/ir35-decisions-blanket-approach/ | 0.12 | 0.1 | tokens: approach, blanket, decisions, ir35 |
| `hmrc-vat-approach-cosmetic-medical-sector` | https://www.shipleystax.com/2023/10/hmrc-vat-approach-cosmetic-medical-sector/ | 0.14 | 0.14 | tokens: approach, cosmetic, hmrc, medical, sector, vat |
| `when-do-i-owe-cgt-if-i-sell-my-house` | https://taxfix.com/en-uk/landlord-tax-returns/when-do-i-owe-cgt-if-i-sell-my-house/ | 0.14 | 0.14 | tokens: cgt, do, house, i, if, my |
| `stamp-of-approval-does-your-company-name-need-it` | https://gorillaaccounting.com/blog/stamp-of-approval-does-your-company-name-need-it/ | 0.15 | 0.15 | tokens: approval, company, does, it, name, need |
| `secure-hmrc-advance-approval-and-avoid-costly-tax-surprises` | https://www.taxaccountant.co.uk/secure-hmrc-advance-approval-and-avoid-costly-tax-surpr... | 0.17 | 0.17 | tokens: advance, and, approval, avoid, costly, hmrc |
| `support-for-hmrc-cgt-60-day-reporting` | https://www.ukpropertyaccountants.co.uk/services/support-for-hmrc-cgt-60-day-reporting/ | 0.17 | 0.11 | tokens: 60, cgt, day, for, hmrc, reporting |
| `save-thousands-using-your-cgt-allowance` | https://www.saltus.co.uk/the-financial-planning-blog/save-thousands-using-your-cgt-allo... | 0.17 | 0.18 | tokens: allowance, cgt, save, thousands, using, your |
| `unlocking-capital-gains-tax-success-how-we-protect-your-wealth-every-step-of-the-way` | https://capitalgainstax.co.uk/unlocking-capital-gains-tax-success-how-we-protect-your-w... | 0.18 | 0.16 | tokens: capital, every, gains, how, of, protect |
| `not-all-profits-are-the-same-the-risk-of-aligning-capital-gains-tax-to-income-tax` | https://hwfisher.co.uk/not-all-profits-are-the-same-the-risk-of-aligning-capital-gains-... | 0.19 | 0.17 | tokens: aligning, all, are, capital, gains, income |
| `ots-publish-initial-capital-gains-tax-review-findings-what-does-this-mean-for-you` | https://bhp.co.uk/news-events/blog/ots-publish-initial-capital-gains-tax-review-finding... | 0.19 | 0.17 | tokens: capital, does, findings, for, gains, initial |
| `cgt-and-foreign-exchange-fluctuations` | https://www.taxaccountant.co.uk/cgt-and-foreign-exchange-fluctuations/ | 0.14 | 0.2 | tokens: and, cgt, exchange, fluctuations, foreign |
| `cgt-return-60-days` | https://www.ukpropertyaccountants.co.uk/cgt-return-60-days/ | 0.14 | 0.2 | tokens: 60, cgt, days, return |
| `difference-between-crypto-income-and-capital-gains` | https://www.towerstone.co.uk/difference-between-crypto-income-and-capital-gains | 0.2 | 0.17 | tokens: and, between, capital, crypto, difference, gains |
| `gift-holdover-relief-defer-cgt-on-gifted-assets` | https://www.ukpropertyaccountants.co.uk/gift-holdover-relief-defer-cgt-on-gifted-assets/ | 0.2 | 0.14 | tokens: assets, cgt, defer, gift, gifted, holdover |
| `list-of-hmrc-approved-mtd-compatible-software` | https://rentalbux.com/blogs/list-of-hmrc-approved-mtd-compatible-software | 0.2 | 0.11 | tokens: approved, compatible, hmrc, list, mtd, of |
| `penalties-for-missing-60-day-property-cgt-deadline` | https://www.towerstone.co.uk/penalties-for-missing-60-day-property-cgt-deadline | 0.2 | 0.18 | tokens: 60, cgt, day, deadline, for, missing |
| `what-changes-could-we-see-to-capital-gains-tax-in-the-next-budget` | https://hwfisher.co.uk/what-changes-could-we-see-to-capital-gains-tax-in-the-next-budget/ | 0.2 | 0.18 | tokens: budget, capital, changes, could, gains, in |
| `capital-gains-tax-vs-income-tax-the-difference-that-costs-people-thousands-copy` | https://capitalgainstax.co.uk/capital-gains-tax-vs-income-tax-the-difference-that-costs... | 0.21 | 0.19 | tokens: capital, copy, costs, difference, gains, income |
| `hmrc-v-gerald-and-sarah-lee-a-case-for-private-residence-relief` | https://www.ukpropertyaccountants.co.uk/hmrc-v-gerald-and-sarah-lee-a-case-for-private-... | 0.21 | 0.21 | tokens: a, and, case, for, gerald, hmrc |
| `how-can-an-accountant-help-me-plan-ahead-for-capital-gains-tax` | https://www.towerstone.co.uk/how-can-an-accountant-help-me-plan-ahead-for-capital-gains... | 0.21 | 0.19 | tokens: accountant, ahead, an, can, capital, for |
| `spotlight-69-hmrcs-crackdown-on-llp-liquidations-to-avoid-capital-gains-tax` | https://uklandlordtax.co.uk/spotlight-69-hmrcs-crackdown-on-llp-liquidations-to-avoid-c... | 0.21 | 0.18 | tokens: 69, avoid, capital, crackdown, gains, hmrcs |
| `what-if-my-profit-is-less-than-the-capital-gains-tax-allowance` | https://taxfix.com/en-uk/investor-capital-gains-tax-returns/what-if-my-profit-is-less-t... | 0.21 | 0.2 | tokens: allowance, capital, gains, if, is, less |
| `hmrc-tax-fraud-approach` | https://www.taxaccountant.co.uk/hmrc-tax-fraud-approach/ | 0.22 | 0.14 | tokens: approach, fraud, hmrc, tax |
| `tax-during-estate-administration-income-tax-cgt-advice` | https://www.taxaccountant.co.uk/tax-during-estate-administration-income-tax-cgt-advice/ | 0.22 | 0.1 | tokens: administration, advice, cgt, during, estate, income |
| `account-for-capital-gains-tax-rate-changes-properly-or-face-penalties` | https://www.ukpropertyaccountants.co.uk/account-for-capital-gains-tax-rate-changes-prop... | 0.23 | 0.23 | tokens: account, capital, changes, face, for, gains |
| `can-capital-gains-tax-be-changed-and-still-be-pro-business-and-pro-entrepreneurs` | https://bhp.co.uk/news-events/blog/can-capital-gains-tax-be-changed-and-still-be-pro-bu... | 0.23 | 0.19 | tokens: and, be, business, can, capital, changed |
| `do-you-pay-capital-gains-or-income-tax-when-you-sell-cryptocurrency` | https://www.taxaccountant.co.uk/do-you-pay-capital-gains-or-income-tax-when-you-sell-cr... | 0.23 | 0.2 | tokens: capital, cryptocurrency, do, gains, income, or |
| `how-do-i-handle-capital-gains-within-a-limited-company` | https://www.towerstone.co.uk/how-do-i-handle-capital-gains-within-a-limited-company | 0.2 | 0.23 | tokens: a, capital, company, do, gains, handle |
| `how-to-do-a-cgt-tax-return-for-crypto-shares` | https://taxfix.com/en-uk/investor-capital-gains-tax-returns/how-to-do-a-cgt-tax-return-... | 0.23 | 0.23 | tokens: a, cgt, crypto, do, for, how |
| `introducing-the-tax-faculty-expert-guidance-in-the-complex-world-of-capital-gains-tax` | https://capitalgainstax.co.uk/introducing-the-tax-faculty-expert-guidance-in-the-comple... | 0.21 | 0.23 | tokens: capital, complex, expert, faculty, gains, guidance |
| *(+36 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### MTD (79 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `ots-latest-findings-recommend-hmrc-block-implementing-mtd` | https://uklandlordtax.co.uk/ots-latest-findings-recommend-hmrc-block-implementing-mtd/ | 0.13 | 0.09 | tokens: block, findings, hmrc, implementing, latest, mtd |
| `mtd-peer-discussion-groups` | https://ciot-att.lndo.site/news-events/events/mtd-peer-discussion-groups | 0.12 | 0.14 | tokens: discussion, groups, mtd, peer |
| `mtd-soft-landing-period` | https://rentalbux.com/blogs/mtd-soft-landing-period | 0.12 | 0.14 | tokens: landing, mtd, period, soft |
| `list-of-mtd-benefits-beyond-just-hmrc-compliance` | https://www.ukpropertyaccountants.co.uk/list-of-mtd-benefits-beyond-just-hmrc-compliance/ | 0.14 | 0.15 | tokens: benefits, beyond, compliance, hmrc, just, list |
| `mtd-and-office-rentals-how-businesses-must-comply` | https://rentalbux.com/blogs/mtd-and-office-rentals-how-businesses-must-comply | 0.15 | 0.15 | tokens: and, businesses, comply, how, mtd, must |
| `fundamentals-of-mtd-every-landlord-should-be-aware-of` | https://www.ukpropertyaccountants.co.uk/fundamentals-of-mtd-every-landlord-should-be-aw... | 0.14 | 0.17 | tokens: aware, be, every, fundamentals, landlord, mtd |
| `mtd-am-i-in` | https://www.provestor.co.uk/guides/mtd-am-i-in | 0.17 | 0.14 | tokens: am, i, in, mtd |
| `mtd-essential-kit` | https://rentalbux.com/mtd-essential-kit | 0.14 | 0.17 | tokens: essential, kit, mtd |
| `mtd-support-how-accountants-simplify-tax-compliance` | https://rentalbux.com/blogs/mtd-support-how-accountants-simplify-tax-compliance | 0.17 | 0.17 | tokens: accountants, compliance, how, mtd, simplify, support |
| `pension-funds-with-rental-portfolios-are-they-caught-by-making-tax-digital` | https://rentalbux.com/blogs/pension-funds-with-rental-portfolios-are-they-caught-by-mak... | 0.19 | 0.19 | tokens: are, by, caught, digital, funds, making |
| `250000-sign-up-for-mtd-but-most-landlords-still-arent-ready` | https://www.ukpropertyaccountants.co.uk/250000-sign-up-for-mtd-but-most-landlords-still... | 0.18 | 0.2 | tokens: 250000, arent, but, for, landlords, most |
| `do-i-need-making-tax-digital-if-i-use-a-letting-agent` | https://www.ukpropertyaccountants.co.uk/do-i-need-making-tax-digital-if-i-use-a-letting... | 0.2 | 0.2 | tokens: a, agent, digital, do, i, if |
| `government-makes-u-turn-on-dividend-allowance-and-making-tax-digital` | https://gorillaaccounting.com/blog/government-makes-u-turn-on-dividend-allowance-and-ma... | 0.2 | 0.2 | tokens: allowance, and, digital, dividend, government, makes |
| `how-do-i-sign-up-for-mtd-with-hmrc` | https://taxfix.com/en-uk/tax-changes/how-do-i-sign-up-for-mtd-with-hmrc/ | 0.2 | 0.2 | tokens: do, for, hmrc, how, i, mtd |
| `mtd-for-joint-owners-how-separate-filings-work` | https://rentalbux.com/guides/mtd-for-joint-owners-how-separate-filings-work | 0.2 | 0.17 | tokens: filings, for, how, joint, mtd, owners |
| `how-landlords-can-easily-calculate-taxes-under-mtd-for-itsa` | https://rentalbux.com/blogs/how-landlords-can-easily-calculate-taxes-under-mtd-for-itsa | 0.21 | 0.21 | tokens: calculate, can, easily, for, how, itsa |
| `top-5-mtd-questions-every-landlord-has-answered` | https://rentalbux.com/blogs/top-5-mtd-questions-every-landlord-has-answered | 0.15 | 0.21 | tokens: 5, answered, every, has, landlord, mtd |
| `what-software-can-i-use-for-making-tax-digital-vat-returns` | https://www.towerstone.co.uk/what-software-can-i-use-for-making-tax-digital-vat-returns | 0.2 | 0.21 | tokens: can, digital, for, i, making, returns |
| `making-tax-digital-search-interest-for-term-hits-record-high-ahead-of-april-start-date` | https://www.ukpropertyaccountants.co.uk/making-tax-digital-search-interest-for-term-hit... | 0.22 | 0.21 | tokens: ahead, april, date, digital, for, high |
| `mtd-and-vat-integration` | https://www.mytaxaccountant.co.uk/post/mtd-and-vat-integration | 0.22 | 0.22 | tokens: and, integration, mtd, vat |
| `mtd-cycle-explained` | https://www.provestor.co.uk/help/mtd/what-is-mtd/mtd-cycle-explained | 0.22 | 0.2 | tokens: cycle, explained, mtd |
| `mtd-for-construction-workers-cis-subcontractor-guide` | https://rentalbux.com/blogs/mtd-for-construction-workers-cis-subcontractor-guide | 0.18 | 0.22 | tokens: cis, construction, for, guide, mtd, subcontractor |
| `mtd-self-employment` | https://perrysaccountants.co.uk/mtd-self-employment | 0.22 | 0.17 | tokens: employment, mtd, self |
| `mtd-software-for-accountants-manage-clients` | https://rentalbux.com/blogs/mtd-software-for-accountants-manage-clients | 0.22 | 0.2 | tokens: accountants, clients, for, manage, mtd, software |
| `why-must-property-accounting-mtd-go-together` | https://rentalbux.com/blogs/why-must-property-accounting-mtd-go-together | 0.22 | 0.15 | tokens: accounting, go, mtd, must, property, together |
| `agent-and-business-access-digital-mtd-vat-services` | https://ciot-att.lndo.site/agent-and-business-access-digital-mtd-vat-services | 0.23 | 0.15 | tokens: access, agent, and, business, digital, mtd |
| `hmrc-sends-mtd-letters-to-landlords-and-sole-traders` | https://rentalbux.com/blogs/hmrc-sends-mtd-letters-to-landlords-and-sole-traders | 0.23 | 0.23 | tokens: and, hmrc, landlords, letters, mtd, sends |
| `holiday-lets-mtd-key-tax-compliance-tips-for-investors` | https://rentalbux.com/blogs/holiday-lets-mtd-key-tax-compliance-tips-for-investors | 0.23 | 0.23 | tokens: compliance, for, holiday, investors, key, lets |
| `mtd-digital-readiness-agent-services-accounts-tips-agents` | https://ciot-att.lndo.site/mtd-digital-readiness-agent-services-accounts-tips-agents | 0.23 | 0.14 | tokens: accounts, agent, agents, digital, mtd, readiness |
| `understanding-rentalbux-your-complete-landlord-software-mtd` | https://rentalbux.com/guides/understanding-rentalbux-your-complete-landlord-software-mtd | 0.23 | 0.18 | tokens: complete, landlord, mtd, rentalbux, software, understanding |
| *(+49 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### LtdCo_Incorporation (109 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `tenants-tales-fictitious-characters-legal-aspects-leasehold` | https://www.boltburdon.co.uk/blogs/tenants-tales-fictitious-characters-legal-aspects-le... | 0.09 | 0.09 | tokens: aspects, characters, fictitious, leasehold, legal, tales |
| `5-reasons-become-ltd-company-contractor` | https://www.qaccounting.com/5-reasons-become-ltd-company-contractor/ | 0.11 | 0.12 | tokens: 5, become, company, contractor, ltd, reasons |
| `building-brand-ltd-company-contractors` | https://www.qaccounting.com/building-brand-ltd-company-contractors/ | 0.12 | 0.14 | tokens: brand, building, company, contractors, ltd |
| `why-working-capital-can-have-a-significant-impact-on-final-sale-proceeds` | https://bhp.co.uk/news-events/blog/why-working-capital-can-have-a-significant-impact-on... | 0.14 | 0.12 | tokens: a, can, capital, final, have, impact |
| `landlord-growth-playbook-spvs-refinancing-and-portfolio-performance-metrics` | https://fhpaccounting.co.uk/landlord-growth-playbook-spvs-refinancing-and-portfolio-per... | 0.15 | 0.1 | tokens: and, growth, landlord, metrics, performance, playbook |
| `landlord-mistakes-setting-up-ltd-company` | https://www.provestor.co.uk/propertytaxshow/landlord-mistakes-setting-up-ltd-company | 0.15 | 0.14 | tokens: company, landlord, ltd, mistakes, setting, up |
| `persons-with-significant-control-how-the-new-rules-on-corporate-transparency-will-affect-your-company` | https://www.boltburdon.co.uk/blogs/persons-with-significant-control-how-the-new-rules-o... | 0.12 | 0.15 | tokens: affect, company, control, corporate, how, new |
| `were-expanding-our-rd-tax-reliefs-support-new-office-sheffield` | https://www.djh.co.uk/latest-news/news-insights/were-expanding-our-rd-tax-reliefs-suppo... | 0.15 | 0.15 | tokens: expanding, new, office, our, rd, reliefs |
| `hmrc-v-bluecrest-capital-management-uk-llp-court-of-appeal-rules-on-significant-influence-for-llp-members` | https://hwfisher.co.uk/hmrc-v-bluecrest-capital-management-uk-llp-court-of-appeal-rules... | 0.12 | 0.16 | tokens: appeal, bluecrest, capital, court, for, hmrc |
| `locum-dentists-incorporate-overseas` | https://www.business-accounting.co.uk/blog/locum-dentists-incorporate-overseas | 0.12 | 0.17 | tokens: dentists, incorporate, locum, overseas |
| `locum-doctors-incorporate-overseas` | https://www.business-accounting.co.uk/blog/locum-doctors-incorporate-overseas | 0.12 | 0.17 | tokens: doctors, incorporate, locum, overseas |
| `navigating-ltd-company-setup` | https://gorillaaccounting.com/blog/navigating-ltd-company-setup/ | 0.14 | 0.17 | tokens: company, ltd, navigating, setup |
| `shopify-stores-incorporate-overseas` | https://www.business-accounting.co.uk/blog/shopify-stores-incorporate-overseas | 0.12 | 0.17 | tokens: incorporate, overseas, shopify, stores |
| `sweet-deal-corporate-wrappers-property-investors-structuring-investments-spv` | https://www.boltburdon.co.uk/blogs/sweet-deal-corporate-wrappers-property-investors-str... | 0.17 | 0.09 | tokens: corporate, deal, investments, investors, property, spv |
| `unlocking-significant-tax-benefits-through-expert-capital-allowance-guidance` | https://www.djh.co.uk/latest-news/client-stories/unlocking-significant-tax-benefits-thr... | 0.17 | 0.14 | tokens: allowance, benefits, capital, expert, guidance, significant |
| `bm-solutions-now-offering-limited-company-mortgages` | https://www.thebuytoletbroker.co.uk/mortgages/bm-solutions-now-offering-limited-company... | 0.18 | 0.18 | tokens: bm, company, limited, mortgages, now, offering |
| `do-i-legally-need-an-accountant-for-my-limited-company` | https://www.qaccounting.com/do-i-legally-need-an-accountant-for-my-limited-company/ | 0.18 | 0.18 | tokens: accountant, an, company, do, for, i |
| `promoting-your-limited-company-helps-with-ir35` | https://www.qaccounting.com/promoting-your-limited-company-helps-with-ir35/ | 0.18 | 0.18 | tokens: company, helps, ir35, limited, promoting, with |
| `rental-income-bookkeeping-systems-software-and-audit-ready-records-for-efficient-property-management` | https://fhpaccounting.co.uk/rental-income-bookkeeping-systems-software-and-audit-ready-... | 0.18 | 0.12 | tokens: and, audit, bookkeeping, efficient, for, income |
| `tenant-survey-energy-efficiency` | https://www.nrla.org.uk/research/deep-insight/tenant-survey-energy-efficiency | 0.18 | 0.14 | tokens: efficiency, energy, survey, tenant |
| `trust-gains-court-rules-on-badr-for-beneficiaries-with-interests` | https://www.taxaccountant.co.uk/trust-gains-court-rules-on-badr-for-beneficiaries-with-... | 0.18 | 0.18 | tokens: badr, beneficiaries, court, for, gains, interests |
| `do-i-need-an-accountant-for-my-limited-company` | https://www.qaccounting.com/do-i-need-an-accountant-for-my-limited-company/ | 0.19 | 0.19 | tokens: accountant, an, company, do, for, i |
| `is-company-incorporation-of-your-dental-practice-the-right-financial-choice` | https://www.djh.co.uk/latest-news/specialisms/is-company-incorporation-of-your-dental-p... | 0.19 | 0.19 | tokens: choice, company, dental, financial, incorporation, is |
| `9-steps-to-ltd-company-setup` | https://gorillaaccounting.com/blog/9-steps-to-ltd-company-setup/ | 0.2 | 0.15 | tokens: 9, company, ltd, setup, steps, to |
| `agencies-incorporate-overseas` | https://www.business-accounting.co.uk/blog/agencies-incorporate-overseas | 0.14 | 0.2 | tokens: agencies, incorporate, overseas |
| `consultants-incorporate-overseas` | https://www.business-accounting.co.uk/blog/consultants-incorporate-overseas | 0.14 | 0.2 | tokens: consultants, incorporate, overseas |
| `fic-family-business-succession` | https://www.tlpi.co.uk/insights/fic-family-business-succession | 0.2 | 0.2 | tokens: business, family, fic, succession |
| `fic-frequently-asked-questions` | https://www.tlpi.co.uk/fic-frequently-asked-questions | 0.2 | 0.2 | tokens: asked, fic, frequently, questions |
| `freelancers-incorporate-overseas` | https://www.business-accounting.co.uk/blog/freelancers-incorporate-overseas | 0.14 | 0.2 | tokens: freelancers, incorporate, overseas |
| `incorporation-or-transfer-to-an-spv` | https://fhpaccounting.co.uk/incorporation-or-transfer-to-an-spv/ | 0.2 | 0.19 | tokens: an, incorporation, or, spv, to, transfer |
| *(+79 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### IHT (90 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `att-budget-representation-iht-reliefs-shares-which-have-lost-value-0` | https://ciot-att.lndo.site/technical/submissions/att-budget-representation-iht-reliefs-... | 0.11 | 0.11 | tokens: 0, att, budget, have, iht, lost |
| `att-budget-representation-iht-reliefs-shares-which-have-lost-value` | https://ciot-att.lndo.site/technical/submissions/att-budget-representation-iht-reliefs-... | 0.12 | 0.12 | tokens: att, budget, have, iht, lost, reliefs |
| `home-loan-iht-ruling-hmrc` | https://www.mytaxaccountant.co.uk/post/home-loan-iht-ruling-hmrc | 0.12 | 0.11 | tokens: hmrc, home, iht, loan, ruling |
| `iht-probable-without-will` | https://www.mytaxaccountant.co.uk/post/iht-probable-without-will | 0.12 | 0.1 | tokens: iht, probable, will, without |
| `iht-reference-number` | https://www.mytaxaccountant.co.uk/post/iht-reference-number | 0.14 | 0.11 | tokens: iht, number, reference |
| `inheritance-tax-on-inherited-pensions-planning-today-can-avoid-future-tax-charges` | https://hwfisher.co.uk/inheritance-tax-on-inherited-pensions-planning-today-can-avoid-f... | 0.14 | 0.14 | tokens: avoid, can, charges, future, inheritance, inherited |
| `farm-inheritance-tax-how-many-farms-will-be-affected` | https://www.ukpropertyaccountants.co.uk/farm-inheritance-tax-how-many-farms-will-be-aff... | 0.17 | 0.17 | tokens: affected, be, farm, farms, how, inheritance |
| `how-can-an-accountant-help-me-with-inheritance-tax-planning` | https://www.towerstone.co.uk/how-can-an-accountant-help-me-with-inheritance-tax-planning | 0.17 | 0.15 | tokens: accountant, an, can, help, how, inheritance |
| `iht-changes-draft-legislation` | https://www.rpgcrouchchapman.co.uk/resources/blog/iht-changes-draft-legislation/ | 0.17 | 0.17 | tokens: changes, draft, iht, legislation |
| `iht-on-farms` | https://www.rpgcrouchchapman.co.uk/resources/blog/iht-on-farms/ | 0.17 | 0.17 | tokens: farms, iht, on |
| `iht-planning-review-protecting-your-business-assets-with-br` | https://www.djh.co.uk/latest-news/news-insights/iht-planning-review-protecting-your-bus... | 0.17 | 0.14 | tokens: assets, br, business, iht, planning, protecting |
| `inheritance-tax-mitigation-under-10-year-tailing-rule` | https://www.mytaxaccountant.co.uk/post/inheritance-tax-mitigation-under-10-year-tailing... | 0.18 | 0.18 | tokens: 10, inheritance, mitigation, rule, tailing, tax |
| `inheritance-tax-on-pensions-could-inheritance-tax-insurance-protect-your-legacy` | https://www.boltburdon.co.uk/blogs/inheritance-tax-on-pensions-could-inheritance-tax-in... | 0.18 | 0.17 | tokens: could, inheritance, insurance, legacy, on, pensions |
| `inheritance-tax-receipts-up-1bn-on-previous-tax-year-your-top-10-questions-answered` | https://hwfisher.co.uk/inheritance-tax-receipts-up-1bn-on-previous-tax-year-your-top-10... | 0.18 | 0.18 | tokens: 10, 1bn, answered, inheritance, on, previous |
| `does-iht-allowance-pass-to-spouse` | https://www.mytaxaccountant.co.uk/post/does-iht-allowance-pass-to-spouse | 0.15 | 0.19 | tokens: allowance, does, iht, pass, spouse, to |
| `can-i-give-money-to-my-children-without-paying-inheritance-tax` | https://www.towerstone.co.uk/can-i-give-money-to-my-children-without-paying-inheritance... | 0.2 | 0.2 | tokens: can, children, give, i, inheritance, money |
| `chargeable-lifetime-transfer-for-iht` | https://www.mytaxaccountant.co.uk/post/chargeable-lifetime-transfer-for-iht | 0.18 | 0.2 | tokens: chargeable, for, iht, lifetime, transfer |
| `charity-begins-at-home-how-including-a-charitable-gift-in-your-will-can-reduce-inheritance-tax` | https://www.boltburdon.co.uk/blogs/charity-begins-at-home-how-including-a-charitable-gi... | 0.2 | 0.2 | tokens: a, at, begins, can, charitable, charity |
| `how-do-life-insurance-policies-affect-inheritance-tax` | https://www.towerstone.co.uk/how-do-life-insurance-policies-affect-inheritance-tax | 0.2 | 0.18 | tokens: affect, do, how, inheritance, insurance, life |
| `how-farmers-can-avoid-high-inheritance-tax` | https://www.taxaccountant.co.uk/how-farmers-can-avoid-high-inheritance-tax/ | 0.2 | 0.2 | tokens: avoid, can, farmers, high, how, inheritance |
| `keir-starmers-inheritance-tax-case-understanding-what-happened-why-it-matters` | https://www.ukpropertyaccountants.co.uk/keir-starmers-inheritance-tax-case-understandin... | 0.14 | 0.2 | tokens: case, happened, inheritance, it, keir, matters |
| `reclaiming-inheritance-tax-after-stock-market-crashes` | https://www.taxaccountant.co.uk/reclaiming-inheritance-tax-after-stock-market-crashes/ | 0.2 | 0.2 | tokens: after, crashes, inheritance, market, reclaiming, stock |
| `reducing-inheritance-tax-by-investing-in-risky-but-rewarding-aim-shares` | https://www.taxaccountant.co.uk/reducing-inheritance-tax-by-investing-in-risky-but-rewa... | 0.14 | 0.2 | tokens: aim, but, by, in, inheritance, investing |
| `5-ways-a-financial-adviser-can-help-build-your-inheritance-tax-strategy` | https://www.rpgcrouchchapman.co.uk/resources/blog/5-ways-a-financial-adviser-can-help-b... | 0.21 | 0.21 | tokens: 5, a, adviser, build, can, financial |
| `how-much-can-i-leave-before-inheritance-tax-is-charged` | https://www.towerstone.co.uk/how-much-can-i-leave-before-inheritance-tax-is-charged | 0.21 | 0.15 | tokens: before, can, charged, how, i, inheritance |
| `a-t-p-avoid-the-pitfall-i-want-to-transfer-my-house-to-my-children-to-avoid-inheritance-tax` | https://www.boltburdon.co.uk/blogs/a-t-p-avoid-the-pitfall-i-want-to-transfer-my-house-... | 0.18 | 0.22 | tokens: a, avoid, children, house, i, inheritance |
| `do-pensions-count-towards-inheritance-tax` | https://www.towerstone.co.uk/do-pensions-count-towards-inheritance-tax | 0.22 | 0.22 | tokens: count, do, inheritance, pensions, tax, towards |
| `elimination-of-iht-relief-on-pensions` | https://www.tlpi.co.uk/insights/elimination-of-iht-relief-on-pensions | 0.22 | 0.22 | tokens: elimination, iht, of, on, pensions, relief |
| `excepted-estate-for-iht` | https://www.mytaxaccountant.co.uk/post/excepted-estate-for-iht | 0.22 | 0.14 | tokens: estate, excepted, for, iht |
| `inheritance-tax-overhaul-potential-changes-explained` | https://www.djh.co.uk/latest-news/autumn-budget/inheritance-tax-overhaul-potential-chan... | 0.22 | 0.22 | tokens: changes, explained, inheritance, overhaul, potential, tax |
| *(+60 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### SDLT (86 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `mdr-application-in-properties-with-unique-features-nicholas-rowe-v-hmrc-case` | https://www.ukpropertyaccountants.co.uk/mdr-application-in-properties-with-unique-featu... | 0.11 | 0.11 | tokens: application, case, features, hmrc, in, mdr |
| `cleared-by-hmrc-reflections-on-angela-rayners-sdlt-position-the-reasonable-care-standard` | https://www.ukpropertyaccountants.co.uk/cleared-by-hmrc-reflections-on-angela-rayners-s... | 0.12 | 0.13 | tokens: angela, by, care, cleared, hmrc, on |
| `sdlt-defined-by-physical-structure-not-occupancy-readiness-patel-v-hmrc` | https://www.ukpropertyaccountants.co.uk/sdlt-defined-by-physical-structure-not-occupanc... | 0.13 | 0.09 | tokens: by, defined, hmrc, not, occupancy, patel |
| `house-prices-rising-slowly-but-stamp-duty-cut-may-spark-surge` | https://www.ukpropertyaccountants.co.uk/house-prices-rising-slowly-but-stamp-duty-cut-m... | 0.14 | 0.13 | tokens: but, cut, duty, house, may, prices |
| `i-own-our-current-home-my-wife-has-never-owned-a-property-can-we-get-a-first-time-buyer-mortgage-6995` | https://www.charcol.co.uk/ask-the-mortgage-experts/i-own-our-current-home-my-wife-has-n... | 0.14 | 0.14 | tokens: 6995, a, buyer, can, current, first |
| `understanding-sdlt-when-buying-a-home-with-your-partner` | https://www.ukpropertyaccountants.co.uk/understanding-sdlt-when-buying-a-home-with-your... | 0.14 | 0.14 | tokens: a, buying, home, partner, sdlt, understanding |
| `navigating-sdlt-reliefs-proceed-with-caution` | https://www.property-tax-advice.co.uk/knowledge-centre/navigating-sdlt-reliefs-proceed-... | 0.14 | 0.15 | tokens: caution, navigating, proceed, reliefs, sdlt, with |
| `sdlt-reduced-rates-is-there-a-way-to-still-benefit-on-post-30-june-completions` | https://bhp.co.uk/news-events/blog/sdlt-reduced-rates-is-there-a-way-to-still-benefit-o... | 0.15 | 0.14 | tokens: 30, a, benefit, completions, is, june |
| `applicability-of-sdlt-refund-in-smith-homes-9-ltd-v-hmrc` | https://www.ukpropertyaccountants.co.uk/applicability-of-sdlt-refund-in-smith-homes-9-l... | 0.13 | 0.16 | tokens: 9, applicability, hmrc, homes, in, ltd |
| `avoiding-extra-stamp-duty-when-changing-your-main-home` | https://www.taxaccountant.co.uk/avoiding-extra-stamp-duty-when-changing-your-main-home/ | 0.17 | 0.15 | tokens: avoiding, changing, duty, extra, home, main |
| `btl-landlords-anticipate-17-stamp-duty-increase-in-budget` | https://www.ukpropertyaccountants.co.uk/btl-landlords-anticipate-17-stamp-duty-increase... | 0.17 | 0.15 | tokens: 17, anticipate, btl, budget, duty, in |
| `july-sees-1-2-billion-collected-in-stamp-duty` | https://www.ukpropertyaccountants.co.uk/july-sees-1-2-billion-collected-in-stamp-duty/ | 0.17 | 0.15 | tokens: 1, 2, billion, collected, duty, in |
| `possible-property-tax-shake-up-stamp-duty-could-be-on-the-way-out` | https://www.ukpropertyaccountants.co.uk/possible-property-tax-shake-up-stamp-duty-could... | 0.16 | 0.17 | tokens: be, could, duty, on, out, possible |
| `sdlt-higher-rate-relief-denied-where-connected-person-occupies-property` | https://www.ukpropertyaccountants.co.uk/sdlt-higher-rate-relief-denied-where-connected-... | 0.17 | 0.17 | tokens: connected, denied, higher, occupies, person, property |
| `stamp-duty-abolition-would-hit-older-wealthier-homeowners-hardest` | https://www.ukpropertyaccountants.co.uk/stamp-duty-abolition-would-hit-older-wealthier-... | 0.17 | 0.15 | tokens: abolition, duty, hardest, hit, homeowners, older |
| `stamp-duty-receipts-jump-400-million-after-threshold-cut` | https://www.ukpropertyaccountants.co.uk/stamp-duty-receipts-jump-400-million-after-thre... | 0.17 | 0.15 | tokens: 400, after, cut, duty, jump, million |
| `less-than-a-year-until-higher-stamp-duty-comes-knocking-at-your-door` | https://hwfisher.co.uk/less-than-a-year-until-higher-stamp-duty-comes-knocking-at-your-... | 0.18 | 0.18 | tokens: a, at, comes, door, duty, higher |
| `sdlt-subsale-relief-section-75a-robinson-v-hmrc-insights` | https://www.ukpropertyaccountants.co.uk/sdlt-subsale-relief-section-75a-robinson-v-hmrc... | 0.17 | 0.18 | tokens: 75a, hmrc, insights, relief, robinson, sdlt |
| `should-property-investors-be-happy-or-sad-about-possible-stamp-duty-abolition` | https://www.ukpropertyaccountants.co.uk/should-property-investors-be-happy-or-sad-about... | 0.18 | 0.17 | tokens: abolition, about, be, duty, happy, investors |
| `angela-rayners-stamp-duty-scandal-how-underpayment-sparks-political-firestorm` | https://www.ukpropertyaccountants.co.uk/angela-rayners-stamp-duty-scandal-how-underpaym... | 0.19 | 0.19 | tokens: angela, duty, firestorm, how, political, rayners |
| `ive-inherited-a-property-could-i-raise-a-first-time-buyer-mortgage-on-it-9149` | https://www.charcol.co.uk/ask-the-mortgage-experts/ive-inherited-a-property-could-i-rai... | 0.19 | 0.19 | tokens: 9149, a, buyer, could, first, i |
| `woodland-as-residential-property-for-sdlt-mihalakis-michael-v-hmrc` | https://www.ukpropertyaccountants.co.uk/woodland-as-residential-property-for-sdlt-mihal... | 0.19 | 0.18 | tokens: as, for, hmrc, michael, mihalakis, property |
| `brzezicki-v-hmrc-sdlt-carrier-stream-in-commercial-vs-residential` | https://www.ukpropertyaccountants.co.uk/brzezicki-v-hmrc-sdlt-carrier-stream-in-commerc... | 0.2 | 0.2 | tokens: brzezicki, carrier, commercial, hmrc, in, residential |
| `henderson-acquisitions-ltd-v-hmrc-sdlt-property-suitability-case` | https://www.ukpropertyaccountants.co.uk/henderson-acquisitions-ltd-v-hmrc-sdlt-property... | 0.17 | 0.2 | tokens: acquisitions, case, henderson, hmrc, ltd, property |
| `how-are-uk-homebuyers-missing-out-on-thousands-in-stamp-duty-refunds` | https://www.ukpropertyaccountants.co.uk/how-are-uk-homebuyers-missing-out-on-thousands-... | 0.18 | 0.2 | tokens: are, duty, homebuyers, how, in, missing |
| `ltt-relief-for-mdr-wales` | https://www.ukpropertyaccountants.co.uk/services/ltt-relief-for-mdr-wales/ | 0.2 | 0.2 | tokens: for, ltt, mdr, relief, wales |
| `misapplication-of-the-15-17-sdlt-rate-a-source-of-potential-revenue-loss-to-hmrc` | https://www.ukpropertyaccountants.co.uk/misapplication-of-the-15-17-sdlt-rate-a-source-... | 0.17 | 0.2 | tokens: 15, 17, a, hmrc, loss, misapplication |
| `sdlt-when-buying-from-family-members` | https://www.ukpropertyaccountants.co.uk/sdlt-when-buying-from-family-members/ | 0.2 | 0.17 | tokens: buying, family, from, members, sdlt, when |
| `the-stamp-duty-cut-who-actually-benefits` | https://www.shipleystax.com/2020/08/the-stamp-duty-cut-who-actually-benefits/ | 0.2 | 0.18 | tokens: actually, benefits, cut, duty, stamp, the |
| `benjamin-cohen-vs-hmrc-higher-sdlt-rate-residence-dispute` | https://www.ukpropertyaccountants.co.uk/benjamin-cohen-vs-hmrc-higher-sdlt-rate-residen... | 0.21 | 0.21 | tokens: benjamin, cohen, dispute, higher, hmrc, rate |
| *(+56 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### Mortgage_BTL (75 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `can-i-remortgage-within-6-months-of-purchase-4910` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-remortgage-within-6-months-of-... | 0.1 | 0.12 | tokens: 4910, 6, can, i, months, of |
| `im-buying-a-house-with-my-mother-can-we-get-a-mortgage-10601` | https://www.charcol.co.uk/ask-the-mortgage-experts/im-buying-a-house-with-my-mother-can... | 0.12 | 0.12 | tokens: 10601, a, buying, can, get, house |
| `joint-mortgage-sole-proprietor-mortgages-1st-step-onto-the-property-ladder` | https://buytolettaxaccountants.co.uk/joint-mortgage-sole-proprietor-mortgages-1st-step-... | 0.12 | 0.12 | tokens: 1st, joint, ladder, mortgage, mortgages, onto |
| `are-there-any-mortgage-lenders-for-section-106-properties-4751` | https://www.charcol.co.uk/ask-the-mortgage-experts/are-there-any-mortgage-lenders-for-s... | 0.14 | 0.14 | tokens: 106, 4751, any, are, for, lenders |
| `can-i-get-a-mortgage-after-a-debt-relief-order` | https://www.charcol.co.uk/mortgages/bad-credit-mortgages/can-i-get-a-mortgage-after-a-d... | 0.14 | 0.13 | tokens: a, after, can, debt, get, i |
| `can-i-get-a-mortgage-for-a-property-without-a-water-supply-6687` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-get-a-mortgage-for-a-property-... | 0.14 | 0.14 | tokens: 6687, a, can, for, get, i |
| `can-i-take-my-brother-and-sister-in-law-off-the-mortgage-so-i-dont-have-to-sell-6266` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-take-my-brother-and-sister-in-... | 0.14 | 0.14 | tokens: 6266, and, brother, can, dont, have |
| `i-want-a-house-to-do-up-sell-on-i-cant-get-a-mortgage-over-a-short-period-what-can-i-do-13877` | https://www.charcol.co.uk/ask-the-mortgage-experts/i-want-a-house-to-do-up-sell-on-i-ca... | 0.14 | 0.14 | tokens: 13877, a, can, cant, do, get |
| `transfer-of-title-mortgage-from-joint-to-sole-name-4515` | https://www.charcol.co.uk/ask-the-mortgage-experts/transfer-of-title-mortgage-from-join... | 0.14 | 0.15 | tokens: 4515, from, joint, mortgage, name, of |
| `we-live-in-tied-accommodation-but-have-a-flat-with-a-repayment-mortgage-for-when-we-retire-do-we-pay-tax-on-the-rental-income-received-9040` | https://www.charcol.co.uk/ask-the-mortgage-experts/we-live-in-tied-accommodation-but-ha... | 0.15 | 0.15 | tokens: 9040, a, accommodation, but, do, flat |
| `ai-companies-mortgage-irregular-income` | https://www.business-accounting.co.uk/blog/ai-companies-mortgage-irregular-income | 0.17 | 0.17 | tokens: ai, companies, income, irregular, mortgage |
| `can-i-expense-my-mortgage` | https://taxfix.com/en-uk/expenses/can-i-expense-my-mortgage/ | 0.17 | 0.09 | tokens: can, expense, i, mortgage, my |
| `can-i-remortgage-an-unencumbered-property-6928` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-remortgage-an-unencumbered-pro... | 0.17 | 0.11 | tokens: 6928, an, can, i, property, remortgage |
| `can-i-remortgage-my-parents-property-4377` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-remortgage-my-parents-property... | 0.17 | 0.11 | tokens: 4377, can, i, my, parents, property |
| `can-i-sell-part-of-my-land-if-i-have-a-mortgage-5948` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-sell-part-of-my-land-if-i-have... | 0.17 | 0.17 | tokens: 5948, a, can, have, i, if |
| `hmrc-improve-documents-supporting-mortgages` | https://gorillaaccounting.com/blog/hmrc-improve-documents-supporting-mortgages/ | 0.1 | 0.17 | tokens: documents, hmrc, improve, mortgages, supporting |
| `mortgage-irregular-income-small-business` | https://www.business-accounting.co.uk/blog/mortgage-irregular-income-small-business | 0.17 | 0.11 | tokens: business, income, irregular, mortgage, small |
| `mortgage-lenders-accepting-an-sa302-tax-calculation` | https://www.shipleystax.com/2019/09/mortgage-lenders-accepting-an-sa302-tax-calculation/ | 0.17 | 0.15 | tokens: accepting, an, calculation, lenders, mortgage, sa302 |
| `shopify-store-mortgage-irregular-income` | https://www.business-accounting.co.uk/blog/shopify-store-mortgage-irregular-income | 0.17 | 0.1 | tokens: income, irregular, mortgage, shopify, store |
| `shopify-stores-mortgage-irregular-income` | https://www.business-accounting.co.uk/blog/shopify-stores-mortgage-irregular-income | 0.17 | 0.1 | tokens: income, irregular, mortgage, shopify, stores |
| `tech-companies-mortgage-irregular-income` | https://www.business-accounting.co.uk/blog/tech-companies-mortgage-irregular-income | 0.17 | 0.17 | tokens: companies, income, irregular, mortgage, tech |
| `where-can-my-mortgage-deposit-come-from` | https://www.charcol.co.uk/guides/where-can-my-mortgage-deposit-come-from/ | 0.17 | 0.09 | tokens: can, come, deposit, from, mortgage, my |
| `can-i-sell-a-house-with-a-mortgage` | https://www.towerstone.co.uk/can-i-sell-a-house-with-a-mortgage | 0.18 | 0.18 | tokens: a, can, house, i, mortgage, sell |
| `mortgage-product-transfer-vs-remortgaging` | https://www.charcol.co.uk/mortgages/best-buys/remortgage/mortgage-product-transfer-vs-r... | 0.18 | 0.18 | tokens: mortgage, product, remortgaging, transfer, vs |
| `should-we-use-our-property-as-collateral-for-our-sons-mortgage-5802` | https://www.charcol.co.uk/ask-the-mortgage-experts/should-we-use-our-property-as-collat... | 0.14 | 0.19 | tokens: 5802, as, collateral, for, mortgage, our |
| `agencies-mortgage-irregular-income` | https://www.business-accounting.co.uk/blog/agencies-mortgage-irregular-income | 0.2 | 0.11 | tokens: agencies, income, irregular, mortgage |
| `concessionary-purchase-mortgages-uk` | https://www.charcol.co.uk/guides/mortgage-deposit-guide/concessionary-purchase-mortgage... | 0.14 | 0.2 | tokens: concessionary, mortgages, purchase, uk |
| `family-springboard-mortgage-or-family-deposit-mortgage` | https://www.charcol.co.uk/guides/family-springboard-mortgage-or-family-deposit-mortgage/ | 0.2 | 0.14 | tokens: deposit, family, mortgage, or, springboard |
| `freelancer-mortgage-irregular-income` | https://www.business-accounting.co.uk/blog/freelancer-mortgage-irregular-income | 0.2 | 0.11 | tokens: freelancer, income, irregular, mortgage |
| `getting-a-mortgage-on-a-single-brick-construction-property` | https://www.charcol.co.uk/mortgages/specialist-property-mortgages/getting-a-mortgage-on... | 0.2 | 0.18 | tokens: a, brick, construction, getting, mortgage, on |
| *(+45 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### IR35 (71 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `ir35-would-batman-pass-or-fail-the-business-entity-test` | https://www.qaccounting.com/ir35-would-batman-pass-or-fail-the-business-entity-test/ | 0.08 | 0.08 | tokens: batman, business, entity, fail, ir35, or |
| `ir35-tip-compile-your-evidence` | https://www.qaccounting.com/ir35-tip-compile-your-evidence/ | 0.09 | 0.09 | tokens: compile, evidence, ir35, tip, your |
| `ir35-enquiry-carried` | https://www.qaccounting.com/ir35-enquiry-carried/ | 0.0 | 0.1 | tokens: carried, enquiry, ir35 |
| `ir35-increasing-enquiries` | https://www.qaccounting.com/ir35-increasing-enquiries/ | 0.1 | 0.1 | tokens: enquiries, increasing, ir35 |
| `ir35-look-contract` | https://www.qaccounting.com/ir35-look-contract/ | 0.0 | 0.1 | tokens: contract, ir35, look |
| `ir35-reform-challenges-public-sector-contractors` | https://gorillaaccounting.com/blog/ir35-reform-challenges-public-sector-contractors/ | 0.1 | 0.1 | tokens: challenges, contractors, ir35, public, reform, sector |
| `eamonn-holmes-in-hmrc-ir35-dispute` | https://gorillaaccounting.com/blog/eamonn-holmes-in-hmrc-ir35-dispute/ | 0.11 | 0.11 | tokens: dispute, eamonn, hmrc, holmes, in, ir35 |
| `hmrc-ir35-tool-cause-for-concern` | https://www.qaccounting.com/hmrc-ir35-tool-cause-for-concern/ | 0.1 | 0.11 | tokens: cause, concern, for, hmrc, ir35, tool |
| `ir35-compliant-contract` | https://gorillaaccounting.com/blog/ir35-compliant-contract/ | 0.11 | 0.1 | tokens: compliant, contract, ir35 |
| `ir35-increasing-enquiries-need-increased-protection` | https://www.qaccounting.com/ir35-increasing-enquiries-need-increased-protection/ | 0.09 | 0.11 | tokens: enquiries, increased, increasing, ir35, need, protection |
| `ir35-public-sector-reform-contractors` | https://gorillaaccounting.com/blog/ir35-public-sector-reform-contractors/ | 0.11 | 0.11 | tokens: contractors, ir35, public, reform, sector |
| `hmrc-guidance-on-ir35-reform` | https://www.qaccounting.com/hmrc-guidance-on-ir35-reform/ | 0.12 | 0.12 | tokens: guidance, hmrc, ir35, on, reform |
| `how-will-ir35-changes-affect-me` | https://taxfix.com/en-uk/tax-changes/ir35/how-will-ir35-changes-affect-me/ | 0.12 | 0.12 | tokens: affect, changes, how, ir35, me, will |
| `ir35-challenger-campaign-details-road-to-possible-hmrc-legal-action` | https://gorillaaccounting.com/blog/ir35-challenger-campaign-details-road-to-possible-hm... | 0.12 | 0.12 | tokens: action, campaign, challenger, details, hmrc, ir35 |
| `ir35-clients-and-recruiters-must-act` | https://www.qaccounting.com/ir35-clients-and-recruiters-must-act/ | 0.12 | 0.12 | tokens: act, and, clients, ir35, must, recruiters |
| `ir35-enquiries-risk` | https://www.qaccounting.com/ir35-enquiries-risk/ | 0.12 | 0.12 | tokens: enquiries, ir35, risk |
| `ir35-independent-contractors-and-small-businesses` | https://www.taxaccountant.co.uk/ir35-independent-contractors-and-small-businesses/ | 0.12 | 0.12 | tokens: and, businesses, contractors, independent, ir35, small |
| `ir35-reform-plans-revealed` | https://www.qaccounting.com/ir35-reform-plans-revealed/ | 0.12 | 0.12 | tokens: ir35, plans, reform, revealed |
| `locum-doctors-ir35-dangers-advice-accountant` | https://gorillaaccounting.com/blog/locum-doctors-ir35-dangers-advice-accountant/ | 0.12 | 0.09 | tokens: accountant, advice, dangers, doctors, ir35, locum |
| `s-l-barnes-ltd-v-hmrc-ir35-case-law` | https://www.taxaccountant.co.uk/s-l-barnes-ltd-v-hmrc-ir35-case-law/ | 0.13 | 0.11 | tokens: barnes, case, hmrc, ir35, l, law |
| `ir35-business-entity-testhave-taken` | https://www.qaccounting.com/ir35-business-entity-testhave-taken/ | 0.11 | 0.14 | tokens: business, entity, ir35, taken, testhave |
| `ir35-business-entity-tests-withdrawn` | https://www.qaccounting.com/ir35-business-entity-tests-withdrawn/ | 0.11 | 0.14 | tokens: business, entity, ir35, tests, withdrawn |
| `ir35-company-size-threshold` | https://www.mytaxaccountant.co.uk/post/ir35-company-size-threshold | 0.14 | 0.12 | tokens: company, ir35, size, threshold |
| `ir35-compliance-review-img` | https://www.taxpartnersuk.com/contractor-accountants/ir35-compliance-review-img/ | 0.14 | 0.14 | tokens: compliance, img, ir35, review |
| `ir35-financial-implications` | https://www.qaccounting.com/ir35-financial-implications/ | 0.12 | 0.14 | tokens: financial, implications, ir35 |
| `ir35-flowchart-for-contractors` | https://www.geraldedelman.com/insights/ir35-flowchart-for-contractors/ | 0.12 | 0.14 | tokens: contractors, flowchart, for, ir35 |
| `ir35-for-small-businesses` | https://www.business-accounting.co.uk/blog/ir35-for-small-businesses | 0.12 | 0.14 | tokens: businesses, for, ir35, small |
| `ir35-government-ups-ante-contractors-working-public-sector` | https://hwfisher.co.uk/ir35-government-ups-ante-contractors-working-public-sector/ | 0.07 | 0.14 | tokens: ante, contractors, government, ir35, public, sector |
| `ir35-myths-busted-what-every-contractor-should-know` | https://gorillaaccounting.com/blog/ir35-myths-busted-what-every-contractor-should-know/ | 0.14 | 0.14 | tokens: busted, contractor, every, ir35, know, myths |
| `ir35-private-sector` | https://www.taxaccountant.co.uk/tag/ir35-private-sector/ | 0.14 | 0.1 | tokens: ir35, private, sector |
| *(+41 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### NonResident_Expat (41 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `in-receipt-of-overseas-dividends-you-may-have-paid-too-much-tax` | https://bhp.co.uk/news-events/blog/in-receipt-of-overseas-dividends-you-may-have-paid-t... | 0.13 | 0.14 | tokens: dividends, have, in, may, much, of |
| `can-i-manage-my-uk-company-overseas` | https://www.qaccounting.com/can-i-manage-my-uk-company-overseas/ | 0.17 | 0.17 | tokens: can, company, i, manage, my, overseas |
| `five-things-to-consider-before-buying-property-overseas-2` | https://www.geraldedelman.com/insights/five-things-to-consider-before-buying-property-o... | 0.17 | 0.14 | tokens: 2, before, buying, consider, five, overseas |
| `overseas-income-hmrcs-new-requirement-to-correct-rtc-rules-are-coming` | https://bhp.co.uk/news-events/blog/overseas-income-hmrcs-new-requirement-to-correct-rtc... | 0.12 | 0.17 | tokens: are, coming, correct, hmrcs, income, new |
| `overseas-income-may-be-taxable-why-hmrcs-nudge-letters-and-disclosure-facility-matter` | https://www.ukpropertyaccountants.co.uk/overseas-income-may-be-taxable-why-hmrcs-nudge-... | 0.17 | 0.17 | tokens: and, be, disclosure, facility, hmrcs, income |
| `reporting-overseas-income-under-fig-regime` | https://www.mytaxaccountant.co.uk/post/reporting-overseas-income-under-fig-regime | 0.17 | 0.12 | tokens: fig, income, overseas, regime, reporting, under |
| `changes-to-vat-assessments-for-overseas-online-marketplace-traders` | https://hwfisher.co.uk/changes-to-vat-assessments-for-overseas-online-marketplace-traders/ | 0.18 | 0.17 | tokens: assessments, changes, for, marketplace, online, overseas |
| `hmrc-cop9-case-study-overseas-properties` | https://www.taxaccountant.co.uk/hmrc-cop9-case-study-overseas-properties/ | 0.18 | 0.14 | tokens: case, cop9, hmrc, overseas, properties, study |
| `hmrc-overseas-bank-accounts-reporting-and-tax-implications` | https://www.ukpropertyaccountants.co.uk/hmrc-overseas-bank-accounts-reporting-and-tax-i... | 0.18 | 0.18 | tokens: accounts, and, bank, hmrc, implications, overseas |
| `how-do-i-reclaim-import-vat-on-overseas-goods` | https://www.towerstone.co.uk/how-do-i-reclaim-import-vat-on-overseas-goods | 0.18 | 0.15 | tokens: do, goods, how, i, import, on |
| `managing-overseas-foreign-properties-in-rentalbux` | https://rentalbux.com/guides/managing-overseas-foreign-properties-in-rentalbux | 0.18 | 0.18 | tokens: foreign, in, managing, overseas, properties, rentalbux |
| `overseas-property-registration-surpasses-30000-registrations` | https://www.ukpropertyaccountants.co.uk/overseas-property-registration-surpasses-30000-... | 0.18 | 0.18 | tokens: 30000, overseas, property, registration, registrations, surpasses |
| `rd-tax-reliefs-new-contracting-out-rules-and-overseas-restrictions-draft` | https://ciot-att.lndo.site/technical/submissions/rd-tax-reliefs-new-contracting-out-rul... | 0.14 | 0.19 | tokens: and, contracting, draft, new, out, overseas |
| `court-of-appeal-ruling-highlights-risks-of-uk-tax-residence-overseas-subsidiaries` | https://www.taxaccountant.co.uk/court-of-appeal-ruling-highlights-risks-of-uk-tax-resid... | 0.2 | 0.18 | tokens: appeal, court, highlights, of, overseas, residence |
| `expat-tax-advisor` | https://www.mytaxaccountant.co.uk/post/expat-tax-advisor | 0.2 | 0.17 | tokens: advisor, expat, tax |
| `hmrc-overseas-bank-accounts` | https://www.ukpropertyaccountants.co.uk/category/hmrc-overseas-bank-accounts/ | 0.2 | 0.2 | tokens: accounts, bank, hmrc, overseas |
| `overseas-workday-relief` | https://www.mytaxaccountant.co.uk/post/overseas-workday-relief | 0.2 | 0.2 | tokens: overseas, relief, workday |
| `overseas-workday-relief-the-new-regime` | https://hwfisher.co.uk/overseas-workday-relief-the-new-regime/ | 0.18 | 0.2 | tokens: new, overseas, regime, relief, the, workday |
| `protecting-your-uk-property-investment-why-overseas-buyers-need-a-process-agent` | https://www.property-tax-advice.co.uk/knowledge-centre/protecting-your-uk-property-inve... | 0.2 | 0.18 | tokens: a, agent, buyers, investment, need, overseas |
| `setting-up-an-overseas-company-lending-funds` | https://www.taxaccountant.co.uk/setting-up-an-overseas-company-lending-funds/ | 0.14 | 0.2 | tokens: an, company, funds, lending, overseas, setting |
| `why-letting-agents-need-to-be-careful-when-working-with-non-resident-landlords` | https://www.property-tax-advice.co.uk/knowledge-centre/why-letting-agents-need-to-be-ca... | 0.19 | 0.2 | tokens: agents, be, careful, landlords, letting, need |
| `over-200000-uk-homes-now-owned-by-overseas-buyers-what-this-means-for-the-property-market` | https://www.ukpropertyaccountants.co.uk/over-200000-uk-homes-now-owned-by-overseas-buye... | 0.15 | 0.21 | tokens: 200000, buyers, by, for, homes, market |
| `overseas-workday-relief-still-a-perk-for-global-talent` | https://www.geraldedelman.com/insights/overseas-workday-relief-still-a-perk-for-global-... | 0.19 | 0.21 | tokens: a, for, global, overseas, perk, relief |
| `tax-returns-and-your-responsibilities-as-a-non-resident-landlord` | https://uklandlordtax.co.uk/tax-guide/tax-returns-and-your-responsibilities-as-a-non-re... | 0.21 | 0.23 | tokens: a, and, as, landlord, non, resident |
| `uk-property-market-attracting-strong-interest-from-overseas-buyers` | https://www.ukpropertyaccountants.co.uk/uk-property-market-attracting-strong-interest-f... | 0.23 | 0.17 | tokens: attracting, buyers, from, interest, market, overseas |
| `why-the-uk-leads-the-investment-table-for-overseas-companies` | https://hwfisher.co.uk/why-the-uk-leads-the-investment-table-for-overseas-companies/ | 0.23 | 0.23 | tokens: companies, for, investment, leads, overseas, table |
| `can-i-transfer-an-overseas-pension-to-the-uk` | https://taxfix.com/en-uk/the-tax-basics/can-i-transfer-an-overseas-pension-to-the-uk/ | 0.23 | 0.25 | tokens: an, can, i, overseas, pension, the |
| `disclosure-of-overseas-income-or-gains` | https://www.rpgcrouchchapman.co.uk/resources/blog/disclosure-of-overseas-income-or-gains/ | 0.15 | 0.25 | tokens: disclosure, gains, income, of, or, overseas |
| `expat-mortgage-calculator` | https://www.charcol.co.uk/mortgage-calculators/expat-mortgage-calculator/ | 0.25 | 0.25 | tokens: calculator, expat, mortgage |
| `expat-mortgages-uk` | https://www.charcol.co.uk/mortgages/specialist-mortgages/expat-mortgages-uk/ | 0.17 | 0.25 | tokens: expat, mortgages, uk |
| *(+11 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### FHL (49 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `hmrc-rejects-icaews-brightline-test-for-fhl` | https://www.ukpropertyaccountants.co.uk/hmrc-rejects-icaews-brightline-test-for-fhl/ | 0.09 | 0.1 | tokens: brightline, fhl, for, hmrc, icaews, rejects |
| `thinking-about-diversifying-into-holiday-lets` | https://www.alanboswell.com/resources/thinking-about-diversifying-into-holiday-lets/ | 0.1 | 0.1 | tokens: about, diversifying, holiday, into, lets, thinking |
| `holiday-lets-pay-employees-hmrc` | https://www.business-accounting.co.uk/blog/holiday-lets-pay-employees-hmrc | 0.1 | 0.11 | tokens: employees, hmrc, holiday, lets, pay |
| `epc-requirements-in-holiday-lets` | https://www.alanboswell.com/resources/epc-requirements-in-holiday-lets/ | 0.12 | 0.12 | tokens: epc, holiday, in, lets, requirements |
| `holiday-lets-paye-director-registration` | https://www.business-accounting.co.uk/blog/holiday-lets-paye-director-registration | 0.12 | 0.11 | tokens: director, holiday, lets, paye, registration |
| `national-insurance-employers-holiday-lets` | https://www.business-accounting.co.uk/blog/national-insurance-employers-holiday-lets | 0.12 | 0.11 | tokens: employers, holiday, insurance, lets, national |
| `bookkeeping-vs-accounting-holiday-lets` | https://www.business-accounting.co.uk/blog/bookkeeping-vs-accounting-holiday-lets | 0.14 | 0.14 | tokens: accounting, bookkeeping, holiday, lets, vs |
| `furnished-holiday-lets-are-ending-how-will-this-impact-you` | https://www.ukpropertyaccountants.co.uk/furnished-holiday-lets-are-ending-how-will-this... | 0.14 | 0.14 | tokens: are, ending, furnished, holiday, how, impact |
| `lockdown-holiday-lets` | https://www.thebuytoletbroker.co.uk/mortgages/lockdown-holiday-lets/ | 0.12 | 0.14 | tokens: holiday, lets, lockdown |
| `management-account-holiday-lets` | https://www.business-accounting.co.uk/blog/management-account-holiday-lets | 0.14 | 0.12 | tokens: account, holiday, lets, management |
| `paye-holiday-lets` | https://www.business-accounting.co.uk/blog/paye-holiday-lets | 0.12 | 0.14 | tokens: holiday, lets, paye |
| `7-reasons-landlords-are-switching-to-holiday-lets` | https://taxfix.com/en-uk/blog/7-reasons-landlords-are-switching-to-holiday-lets/ | 0.15 | 0.15 | tokens: 7, are, holiday, landlords, lets, reasons |
| `tax-hikes-hit-fhl-owners-will-you-be-affected` | https://www.ukpropertyaccountants.co.uk/tax-hikes-hit-fhl-owners-will-you-be-affected/ | 0.15 | 0.12 | tokens: affected, be, fhl, hikes, hit, owners |
| `holiday-lets-switch-accountants` | https://www.business-accounting.co.uk/blog/holiday-lets-switch-accountants | 0.17 | 0.17 | tokens: accountants, holiday, lets, switch |
| `holiday-lets-avoid-payroll-mistakes` | https://www.business-accounting.co.uk/blog/holiday-lets-avoid-payroll-mistakes | 0.14 | 0.18 | tokens: avoid, holiday, lets, mistakes, payroll |
| `legal-requirements-for-holiday-lets` | https://www.alanboswell.com/resources/legal-requirements-for-holiday-lets/ | 0.18 | 0.18 | tokens: for, holiday, legal, lets, requirements |
| `payroll-year-end-process-holiday-lets` | https://www.business-accounting.co.uk/blog/payroll-year-end-process-holiday-lets | 0.18 | 0.18 | tokens: end, holiday, lets, payroll, process, year |
| `public-liability-insurance-for-a-holiday-let` | https://www.alanboswell.com/resources/public-liability-insurance-for-a-holiday-let/ | 0.18 | 0.18 | tokens: a, for, holiday, insurance, let, liability |
| `unlock-fhl-tax-savings-before-this-key-deadline` | https://www.taxaccountant.co.uk/unlock-fhl-tax-savings-before-this-key-deadline/ | 0.19 | 0.19 | tokens: before, deadline, fhl, key, savings, tax |
| `holiday-lets-accountant` | https://www.business-accounting.co.uk/blog/holiday-lets-accountant | 0.2 | 0.14 | tokens: accountant, holiday, lets |
| `how-holiday-lets-sell-business` | https://www.business-accounting.co.uk/blog/how-holiday-lets-sell-business | 0.2 | 0.11 | tokens: business, holiday, how, lets, sell |
| `minimum-wage-uk-holiday-lets` | https://www.business-accounting.co.uk/blog/minimum-wage-uk-holiday-lets | 0.2 | 0.14 | tokens: holiday, lets, minimum, uk, wage |
| `accountant-cost-holiday-lets` | https://www.business-accounting.co.uk/blog/accountant-cost-holiday-lets | 0.22 | 0.17 | tokens: accountant, cost, holiday, lets |
| `holiday-let-business-growth-planning` | https://www.business-accounting.co.uk/blog/holiday-let-business-growth-planning | 0.22 | 0.11 | tokens: business, growth, holiday, let, planning |
| `holiday-let-cash-flow-improvement` | https://www.business-accounting.co.uk/blog/holiday-let-cash-flow-improvement | 0.22 | 0.14 | tokens: cash, flow, holiday, improvement, let |
| `holiday-let-choose-right-accountant` | https://www.business-accounting.co.uk/blog/holiday-let-choose-right-accountant | 0.22 | 0.11 | tokens: accountant, choose, holiday, let, right |
| `holiday-let-cloud-bookkeeping-setup` | https://www.business-accounting.co.uk/blog/holiday-let-cloud-bookkeeping-setup | 0.22 | 0.11 | tokens: bookkeeping, cloud, holiday, let, setup |
| `holiday-let-year-end-accounts` | https://www.business-accounting.co.uk/blog/holiday-let-year-end-accounts | 0.22 | 0.2 | tokens: accounts, end, holiday, let, year |
| `holiday-letting-agents-faqs` | https://www.alanboswell.com/resources/holiday-letting-agents-faqs/ | 0.22 | 0.22 | tokens: agents, faqs, holiday, letting |
| `holiday-let-market-sees-dwindling-bookings-amidst-market-shifts` | https://www.ukpropertyaccountants.co.uk/holiday-let-market-sees-dwindling-bookings-amid... | 0.23 | 0.23 | tokens: amidst, bookings, dwindling, holiday, let, market |
| *(+19 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### CapitalAllowances (12 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `capital-allowances-the-step-buyers-shouldnt-leave-until-later` | https://www.djh.co.uk/latest-news/client-stories/capital-allowances-the-step-buyers-sho... | 0.2 | 0.14 | tokens: allowances, buyers, capital, later, leave, shouldnt |
| `how-the-spring-statement-has-affected-capital-allowances` | https://www.djh.co.uk/latest-news/news-insights/how-the-spring-statement-has-affected-c... | 0.22 | 0.15 | tokens: affected, allowances, capital, has, how, spring |
| `three-commercial-property-projects-three-unique-solutions-a-look-at-our-capital-allowances-case-studies` | https://www.djh.co.uk/latest-news/client-stories/three-commercial-property-projects-thr... | 0.24 | 0.12 | tokens: a, allowances, at, capital, case, commercial |
| `capital-allowances-and-section-198-elections-a-crucial-step-in-commercial-property-transactions` | https://bhp.co.uk/news-events/blog/capital-allowances-and-section-198-elections-a-cruci... | 0.25 | 0.13 | tokens: 198, a, allowances, and, capital, commercial |
| `capital-allowances-make-your-money-go-further` | https://www.djh.co.uk/latest-news/news-insights/capital-allowances-make-your-money-go-f... | 0.25 | 0.1 | tokens: allowances, capital, further, go, make, money |
| `the-importance-of-capital-allowances-in-the-hospitality-industry` | https://www.djh.co.uk/latest-news/client-stories/the-importance-of-capital-allowances-i... | 0.23 | 0.25 | tokens: allowances, capital, hospitality, importance, in, industry |
| `understanding-section-198-election-in-capital-allowances` | https://www.ukpropertyaccountants.co.uk/understanding-section-198-election-in-capital-a... | 0.25 | 0.2 | tokens: 198, allowances, capital, election, in, section |
| `untapped-capital-allowances-provide-resource-for-growth` | https://www.djh.co.uk/latest-news/client-stories/untapped-capital-allowances-provide-re... | 0.25 | 0.17 | tokens: allowances, capital, for, growth, provide, resource |
| `uncovering-over-300k-in-hidden-tax-relief-a-30-year-capital-allowances-success-story` | https://www.djh.co.uk/latest-news/client-stories/uncovering-over-300k-in-hidden-tax-rel... | 0.27 | 0.17 | tokens: 30, 300k, a, allowances, capital, hidden |
| `capital-allowances-advisers-and-aml-supervision` | https://ciot-att.lndo.site/capital-allowances-advisers-and-aml-supervision | 0.29 | 0.25 | tokens: advisers, allowances, aml, and, capital, supervision |
| `complexities-of-depreciation-and-capital-allowances` | https://www.taxaccountant.co.uk/complexities-of-depreciation-and-capital-allowances/ | 0.29 | 0.25 | tokens: allowances, and, capital, complexities, depreciation, of |
| `qualifying-plant-and-machinery-capital-allowances` | https://www.taxaccountant.co.uk/qualifying-plant-and-machinery-capital-allowances/ | 0.29 | 0.25 | tokens: allowances, and, capital, machinery, plant, qualifying |

### RRA_2025 (25 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `gorilla-accounting-react-to-lorraine-kelly-ir35-ruling` | https://gorillaaccounting.com/blog/gorilla-accounting-react-to-lorraine-kelly-ir35-ruling/ | 0.1 | 0.08 | tokens: accounting, gorilla, ir35, kelly, lorraine, react |
| `tenant-possessions-after-tenancy-tort` | https://www.nrla.org.uk/resources/ending-your-tenancy/tenant-possessions-after-tenancy-... | 0.1 | 0.1 | tokens: after, possessions, tenancy, tenant, tort |
| `landlords-want-eviction-reform-can-it-supercharge-btl-profits` | https://www.ukpropertyaccountants.co.uk/landlords-want-eviction-reform-can-it-superchar... | 0.13 | 0.14 | tokens: btl, can, eviction, it, landlords, profits |
| `update-changes-requirements-relating-tenancy-deposit-schemes-assured-shorthold-tenancies` | https://www.boltburdon.co.uk/blogs/update-changes-requirements-relating-tenancy-deposit... | 0.14 | 0.14 | tokens: assured, changes, deposit, relating, requirements, schemes |
| `tenancy-deposit-scheme` | https://www.nrla.org.uk/events/landlord-conference-2024/exhibitors/tenancy-deposit-scheme | 0.14 | 0.17 | tokens: deposit, scheme, tenancy |
| `the-end-of-no-fault-evictions-inches-closer-but-landlords-tenants-are-still-waiting` | https://www.ukpropertyaccountants.co.uk/the-end-of-no-fault-evictions-inches-closer-but... | 0.17 | 0.17 | tokens: are, but, closer, end, evictions, fault |
| `how-can-a-tenant-end-a-tenancy` | https://www.nrla.org.uk/resources/ending-your-tenancy/how-can-a-tenant-end-a-tenancy | 0.2 | 0.2 | tokens: a, can, end, how, tenancy, tenant |
| `landlords-and-sparing-use-of-section-21` | https://www.nrla.org.uk/research/deep-insight/landlords-and-sparing-use-of-section-21 | 0.18 | 0.2 | tokens: 21, and, landlords, of, section, sparing |
| `renters-rights-act-takes-effect-in-may-ending-no-fault-evictions` | https://www.ukpropertyaccountants.co.uk/renters-rights-act-takes-effect-in-may-ending-n... | 0.2 | 0.19 | tokens: act, effect, ending, evictions, fault, in |
| `renters-rights-bill-is-now-law-find-out-what-changes-in-uk-rentals` | https://www.ukpropertyaccountants.co.uk/renters-rights-bill-is-now-law-find-out-what-ch... | 0.2 | 0.19 | tokens: bill, changes, find, in, is, law |
| `renters-rights-bill-raises-concerns-over-council-incentives-rather-than-tenant-security` | https://www.ukpropertyaccountants.co.uk/renters-rights-bill-raises-concerns-over-counci... | 0.12 | 0.2 | tokens: bill, concerns, council, incentives, over, raises |
| `tenants-section-21-notices` | https://www.boltburdon.co.uk/blogs/tenants-section-21-notices/ | 0.2 | 0.09 | tokens: 21, notices, section, tenants |
| `accessing-the-property-during-a-tenancy` | https://www.nrla.org.uk/resources/managing-your-tenancy/accessing-the-property-during-a... | 0.2 | 0.22 | tokens: a, accessing, during, property, tenancy, the |
| `renters-rights-act-compliance-fines-millions-of-landlords-could-miss-information-sheet-serving-deadline` | https://www.ukpropertyaccountants.co.uk/renters-rights-act-compliance-fines-millions-of... | 0.24 | 0.16 | tokens: act, compliance, could, deadline, fines, information |
| `the-end-of-no-fault-evictions-and-what-it-means-for-landlords` | https://www.alanboswell.com/resources/the-end-of-no-fault-evictions-and-what-it-means-f... | 0.19 | 0.24 | tokens: and, end, evictions, fault, for, it |
| `renters-rights-act-impact-on-rental-property-held-in-trusts-and-estates` | https://www.boltburdon.co.uk/blogs/renters-rights-act-impact-on-rental-property-held-in... | 0.24 | 0.25 | tokens: act, and, estates, held, impact, in |
| `renters-rights-act-new-government-guidelines-on-what-tenancy-agreements-must-include` | https://www.ukpropertyaccountants.co.uk/renters-rights-act-new-government-guidelines-on... | 0.25 | 0.24 | tokens: act, agreements, government, guidelines, include, must |
| `vat-deferral-new-payment-scheme` | https://www.taxaccountant.co.uk/vat-deferral-new-payment-scheme/ | 0.25 | 0.22 | tokens: deferral, new, payment, scheme, vat |
| `countdown-to-renters-rights-act-top-3-things-landlords-must-do-now` | https://www.ukpropertyaccountants.co.uk/countdown-to-renters-rights-act-top-3-things-la... | 0.27 | 0.24 | tokens: 3, act, countdown, do, landlords, must |
| `rent-payments-and-renters-rights` | https://www.nrla.org.uk/resources/renters-rights/rent-payments-and-renters-rights | 0.27 | 0.27 | tokens: and, payments, rent, renters, rights |
| `renters-rights-bill-nears-royal-assent-what-landlords-must-do-now` | https://www.ukpropertyaccountants.co.uk/renters-rights-bill-nears-royal-assent-what-lan... | 0.2 | 0.27 | tokens: assent, bill, do, landlords, must, nears |
| `update-landlords-agents-tenancy-deposit-protection-schemes` | https://www.boltburdon.co.uk/blogs/update-landlords-agents-tenancy-deposit-protection-s... | 0.15 | 0.27 | tokens: agents, deposit, landlords, protection, schemes, tenancy |
| `renters-rights-act-information-sheet-what-landlords-need-to-know-about-this-new-requirement` | https://www.ukpropertyaccountants.co.uk/renters-rights-act-information-sheet-what-landl... | 0.24 | 0.28 | tokens: about, act, information, know, landlords, need |
| `uk-landlords-looking-to-sell-ahead-of-the-renters-rights-bill-what-you-need-to-know` | https://www.ukpropertyaccountants.co.uk/uk-landlords-looking-to-sell-ahead-of-the-rente... | 0.19 | 0.28 | tokens: ahead, bill, know, landlords, looking, need |
| `renters-rights-act-tougher-penalties-expanded-rent-repayment-orders-for-landlords` | https://www.ukpropertyaccountants.co.uk/renters-rights-act-tougher-penalties-expanded-r... | 0.29 | 0.27 | tokens: act, expanded, for, landlords, orders, penalties |

### SelfAssessment (5 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `income-expense-tracker-sa-105-for-landlords` | https://rentalbux.com/income-expense-tracker-sa-105-for-landlords | 0.18 | 0.2 | tokens: 105, expense, for, income, landlords, sa |
| `why-did-my-self-assessment-not-include-pension-tax-relief` | https://www.towerstone.co.uk/why-did-my-self-assessment-not-include-pension-tax-relief | 0.23 | 0.2 | tokens: assessment, did, include, my, not, pension |
| `inaccurate-self-assessment-tax-returns-leaves-property-owner-with-100k-penalties` | https://www.ukpropertyaccountants.co.uk/inaccurate-self-assessment-tax-returns-leaves-p... | 0.27 | 0.27 | tokens: 100k, assessment, inaccurate, leaves, owner, penalties |
| `hmrc-notifies-wealthy-taxpayers-to-submit-self-assessment-tax-returns` | https://www.ukpropertyaccountants.co.uk/hmrc-notifies-wealthy-taxpayers-to-submit-self-... | 0.29 | 0.29 | tokens: assessment, hmrc, notifies, returns, self, submit |
| `reasons-to-use-an-online-accountant-for-your-self-assessment-tax-return` | https://www.qaccounting.com/reasons-to-use-an-online-accountant-for-your-self-assessmen... | 0.29 | 0.25 | tokens: accountant, an, assessment, for, online, reasons |

### PropertyDev_Trading (20 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `accounting-business-development-ltd` | https://www.ukaccountingfirms.co.uk/3292/accounting-business-development-ltd | 0.17 | 0.17 | tokens: accounting, business, development, ltd |
| `property-developer-sentenced-to-prison-for-295000-invoice-fraud` | https://www.ukpropertyaccountants.co.uk/property-developer-sentenced-to-prison-for-2950... | 0.17 | 0.14 | tokens: 295000, developer, for, fraud, invoice, prison |
| `draft-guidance-research-and-development-rd-tax-reliefs` | https://ciot-att.lndo.site/technical/submissions/draft-guidance-research-and-developmen... | 0.18 | 0.18 | tokens: and, development, draft, guidance, rd, reliefs |
| `how-will-research-and-development-tax-relief-be-affected-by-the-upcoming-finance-bill` | https://bhp.co.uk/news-events/blog/how-will-research-and-development-tax-relief-be-affe... | 0.18 | 0.18 | tokens: affected, and, be, bill, by, development |
| `rd-tax-reliefs-for-innovative-software-development-businesses` | https://www.djh.co.uk/latest-news/news-insights/rd-tax-reliefs-for-innovative-software-... | 0.18 | 0.18 | tokens: businesses, development, for, innovative, rd, reliefs |
| `covid19-property-mortgage-rents-development` | https://www.boltburdon.co.uk/blogs/covid19-property-mortgage-rents-development/ | 0.2 | 0.2 | tokens: covid19, development, mortgage, property, rents |
| `purpose-of-acquisition-v-purpose-of-holding-tax-relief-requirements-for-property-development-interests` | https://www.ukpropertyaccountants.co.uk/purpose-of-acquisition-v-purpose-of-holding-tax... | 0.2 | 0.19 | tokens: acquisition, development, for, holding, interests, of |
| `stability-in-research-and-development-rd-tax-reliefs-following-the-budget-speech` | https://bhp.co.uk/news-events/blog/stability-in-research-and-development-rd-tax-reliefs... | 0.2 | 0.2 | tokens: and, budget, development, following, in, rd |
| `how-are-property-developers-taxed-differently-from-landlords` | https://www.towerstone.co.uk/how-are-property-developers-taxed-differently-from-landlords | 0.2 | 0.22 | tokens: are, developers, differently, from, how, landlords |
| `property-management-developments-you-must-not-miss` | https://rentalbux.com/blogs/property-management-developments-you-must-not-miss | 0.22 | 0.17 | tokens: developments, management, miss, must, not, property |
| `property-developer-year-end-accounts` | https://www.business-accounting.co.uk/blog/property-developer-year-end-accounts | 0.25 | 0.2 | tokens: accounts, developer, end, property, year |
| `property-development-buckinghamshire` | https://www.thebuytoletbroker.co.uk/case-studies/property-development-buckinghamshire/ | 0.25 | 0.25 | tokens: buckinghamshire, development, property |
| `filing-annual-accounts-and-corporation-tax-for-development-companies` | https://www.ukpropertyaccountants.co.uk/filing-annual-accounts-and-corporation-tax-for-... | 0.27 | 0.27 | tokens: accounts, and, annual, companies, corporation, development |
| `research-and-development-rd-tax-relief` | https://www.taxaccountant.co.uk/research-and-development-rd-tax-relief/ | 0.27 | 0.27 | tokens: and, development, rd, relief, research, tax |
| `a-landlords-guide-to-the-trading-property-allowances` | https://uklandlordtax.co.uk/a-landlords-guide-to-the-trading-property-allowances/ | 0.27 | 0.29 | tokens: a, allowances, guide, landlords, property, the |
| `llp-for-property-development` | https://www.ukpropertyaccountants.co.uk/llp-for-property-development/ | 0.29 | 0.22 | tokens: development, for, llp, property |
| `property-developer-budgeting-guide` | https://www.business-accounting.co.uk/blog/property-developer-budgeting-guide | 0.29 | 0.22 | tokens: budgeting, developer, guide, property |
| `property-developer-business-expenses` | https://www.business-accounting.co.uk/blog/property-developer-business-expenses | 0.29 | 0.22 | tokens: business, developer, expenses, property |
| `property-developer-funding-options` | https://www.business-accounting.co.uk/blog/property-developer-funding-options | 0.29 | 0.22 | tokens: developer, funding, options, property |
| `property-development-feasibility-calculator` | https://www.ukpropertyaccountants.co.uk/calculators/property-development-feasibility-ca... | 0.29 | 0.29 | tokens: calculator, development, feasibility, property |

### ATED (21 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `are-your-employees-claiming-tax-relief-their-work-related-expenses` | https://ciot-att.lndo.site/employers/welcome-employer-focus/are-your-employees-claiming... | 0.15 | 0.14 | tokens: are, claiming, employees, expenses, related, relief |
| `dedicated-hmrc-support-during-rollout-mtd` | https://ciot-att.lndo.site/dedicated-hmrc-support-during-rollout-mtd | 0.15 | 0.11 | tokens: dedicated, during, hmrc, mtd, rollout, support |
| `hmrc-ated-online-service-explained` | https://www.ukpropertyaccountants.co.uk/hmrc-ated-online-service-explained/ | 0.17 | 0.17 | tokens: ated, explained, hmrc, online, service |
| `hmrc-battles-sophisticated-vat-fraud` | https://www.ukpropertyaccountants.co.uk/hmrc-battles-sophisticated-vat-fraud/ | 0.17 | 0.17 | tokens: battles, fraud, hmrc, sophisticated, vat |
| `hmrc-defeated-recent-ir35-case` | https://www.qaccounting.com/hmrc-defeated-recent-ir35-case/ | 0.17 | 0.17 | tokens: case, defeated, hmrc, ir35, recent |
| `advising-on-all-property-related-vat-matters-including-new-dwellings-mixed-use-developments-conversions-student-accommodation-domestic-reverse-charge-etc` | https://hwfisher.co.uk/services/advising-on-all-property-related-vat-matters-including-... | 0.18 | 0.15 | tokens: accommodation, advising, all, charge, conversions, developments |
| `hmrc-letters-to-offshore-corporates-ated` | https://www.ukpropertyaccountants.co.uk/hmrc-letters-to-offshore-corporates-ated/ | 0.18 | 0.17 | tokens: ated, corporates, hmrc, letters, offshore, to |
| `what-is-ated-why-so-many-property-companies-get-caught-out` | https://www.property-tax-advice.co.uk/knowledge-centre/what-is-ated-why-so-many-propert... | 0.18 | 0.14 | tokens: ated, caught, companies, get, is, many |
| `15700-in-penalties-for-a-missed-ated-filing-could-your-company-be-next` | https://www.ukpropertyaccountants.co.uk/15700-in-penalties-for-a-missed-ated-filing-cou... | 0.2 | 0.18 | tokens: 15700, a, ated, be, company, could |
| `how-are-crypto-transactions-treated-for-company-tax` | https://www.towerstone.co.uk/how-are-crypto-transactions-treated-for-company-tax | 0.2 | 0.18 | tokens: are, company, crypto, for, how, tax |
| `the-uk-real-estate-market-and-its-related-taxes` | https://www.ukpropertyaccountants.co.uk/the-uk-real-estate-market-and-its-related-taxes/ | 0.21 | 0.21 | tokens: and, estate, its, market, real, related |
| `updated-covid-19-rules-on-evictions-for-residential-and-commercial-property` | https://www.boltburdon.co.uk/blogs/updated-covid-19-rules-on-evictions-for-residential-... | 0.23 | 0.18 | tokens: 19, and, commercial, covid, evictions, for |
| `buying-luxury-property-in-the-uk-through-the-company-understand-ated-and-the-tax-costs` | https://www.ukpropertyaccountants.co.uk/buying-luxury-property-in-the-uk-through-the-co... | 0.24 | 0.24 | tokens: and, ated, buying, company, costs, in |
| `residential-property-in-a-company-beware-the-ated-tax-rules%ef%bf%bc` | https://www.shipleystax.com/2022/05/residential-property-in-a-company-beware-the-ated-t... | 0.24 | 0.24 | tokens: a, ated, bc, beware, bf, company |
| `ated-penalty-appeal-hawthorn-properties-unlimited-v-hmrc` | https://www.ukpropertyaccountants.co.uk/ated-penalty-appeal-hawthorn-properties-unlimit... | 0.25 | 0.19 | tokens: appeal, ated, hawthorn, hmrc, penalty, properties |
| `from-snails-to-tax-scales-do-not-underestimated-the-voas-role-in-inheritance-tax` | https://www.boltburdon.co.uk/blogs/from-snails-to-tax-scales-do-not-underestimated-the-... | 0.19 | 0.25 | tokens: do, from, in, inheritance, not, role |
| `high-value-uk-property-held-by-offshore-companies-ated-tax-risks` | https://www.ukpropertyaccountants.co.uk/high-value-uk-property-held-by-offshore-compani... | 0.25 | 0.14 | tokens: ated, by, companies, held, high, offshore |
| `how-is-corporation-tax-calculated` | https://www.geraldedelman.com/insights/how-is-corporation-tax-calculated/ | 0.25 | 0.25 | tokens: calculated, corporation, how, is, tax |
| `hmrc-letters-on-ated-relief-for-corporate-rental-businesses` | https://www.ukpropertyaccountants.co.uk/hmrc-letters-on-ated-relief-for-corporate-renta... | 0.27 | 0.21 | tokens: ated, businesses, corporate, for, hmrc, letters |
| `how-do-i-value-a-property-for-ated` | https://www.property-tax-advice.co.uk/knowledge-centre/how-do-i-value-a-property-for-ated/ | 0.27 | 0.23 | tokens: a, ated, do, for, how, i |
| `uk-tax-compliance-to-get-more-complicated-for-some-non-resident-companies` | https://www.landlordstax.co.uk/uk-tax-compliance-to-get-more-complicated-for-some-non-r... | 0.21 | 0.29 | tokens: companies, compliance, complicated, for, get, more |

### Trusts_Estates (23 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `alexander-devine-childrens-cancer-trust-v-housing-solutions-ltd` | https://www.boltburdon.co.uk/blogs/alexander-devine-childrens-cancer-trust-v-housing-so... | 0.09 | 0.11 | tokens: alexander, cancer, childrens, devine, housing, ltd |
| `high-court-trust-dispute-over-dna-involving-14-5-million-estate` | https://www.boltburdon.co.uk/blogs/high-court-trust-dispute-over-dna-involving-14-5-mil... | 0.08 | 0.12 | tokens: 14, 5, court, dispute, dna, estate |
| `beis-consultation-restoring-trust-audit-and-corporate-governance` | https://ciot-att.lndo.site/technical/submissions/beis-consultation-restoring-trust-audi... | 0.14 | 0.12 | tokens: and, audit, beis, consultation, corporate, governance |
| `when-trust-is-gone-dealing-with-trusts-in-financial-remedy-proceedings` | https://www.boltburdon.co.uk/blogs/when-trust-is-gone-dealing-with-trusts-in-financial-... | 0.14 | 0.14 | tokens: dealing, financial, gone, in, is, proceedings |
| `business-relief-how-it-could-benefit-your-estate-planning` | https://www.saltus.co.uk/the-financial-planning-blog/business-relief-how-it-could-benef... | 0.17 | 0.14 | tokens: benefit, business, could, estate, how, it |
| `trust-tax-charges-dont-miss-the-10-year-anniversary-charges` | https://bhp.co.uk/news-events/blog/trust-tax-charges-dont-miss-the-10-year-anniversary-... | 0.17 | 0.15 | tokens: 10, anniversary, charges, dont, miss, tax |
| `venture-capital-trust-vct` | https://taxfix.com/en-uk/glossary/venture-capital-trust-vct/ | 0.17 | 0.17 | tokens: capital, trust, vct, venture |
| `why-you-can-trust-gorilla-accounting` | https://gorillaaccounting.com/blog/why-you-can-trust-gorilla-accounting/ | 0.17 | 0.15 | tokens: accounting, can, gorilla, trust, why, you |
| `estate-planning-guide-wills-trusts-and-lpas` | https://www.saltus.co.uk/the-financial-planning-blog/estate-planning-guide-wills-trusts... | 0.18 | 0.18 | tokens: and, estate, guide, lpas, planning, trusts |
| `trust-and-estates` | https://bhp.co.uk/news-events/category/service-insights/trust-and-estates/ | 0.2 | 0.2 | tokens: and, estates, trust |
| `trust-registration-service-opens-for-non-taxable-trusts` | https://www.geraldedelman.com/insights/trust-registration-service-opens-for-non-taxable... | 0.21 | 0.18 | tokens: for, non, opens, registration, service, taxable |
| `holiday-pay-implications-of-harpur-trust-v-brazel` | https://www.taxaccountant.co.uk/holiday-pay-implications-of-harpur-trust-v-brazel/ | 0.22 | 0.22 | tokens: brazel, harpur, holiday, implications, of, pay |
| `life-interest-trust-tax-implications` | https://www.mytaxaccountant.co.uk/post/life-interest-trust-tax-implications | 0.22 | 0.22 | tokens: implications, interest, life, tax, trust |
| `premium-estate-planning-service-uk-property-accountants` | https://www.ukpropertyaccountants.co.uk/services/premium-estate-planning-service-uk-pro... | 0.22 | 0.17 | tokens: accountants, estate, planning, premium, property, service |
| `additional-guidance-on-registering-non-uk-trusts-on-the-trust-registration-service` | https://www.geraldedelman.com/insights/additional-guidance-on-registering-non-uk-trusts... | 0.2 | 0.23 | tokens: additional, guidance, non, on, registering, registration |
| `is-national-trust-membership-tax-deductible` | https://www.towerstone.co.uk/is-national-trust-membership-tax-deductible | 0.25 | 0.2 | tokens: deductible, is, membership, national, tax, trust |
| `trusts-and-estate-planning` | https://hwfisher.co.uk/services/tax-advisory/trusts-and-estate-planning/ | 0.25 | 0.25 | tokens: and, estate, planning, trusts |
| `trusts-estate-planning` | https://hwfisher.co.uk/service-category/trusts-estate-planning/ | 0.25 | 0.17 | tokens: estate, planning, trusts |
| `hmrc-helpsheets-trust-registration-service` | https://ciot-att.lndo.site/technical/hmrc-helpsheets-trust-registration-service | 0.27 | 0.14 | tokens: helpsheets, hmrc, registration, service, trust |
| `academy-trust-corporation-tax` | https://www.djh.co.uk/specialisms/education/academy-trust-corporation-tax/ | 0.29 | 0.29 | tokens: academy, corporation, tax, trust |
| `council-tax-discretionary-relief` | https://www.mytaxaccountant.co.uk/post/council-tax-discretionary-relief | 0.29 | 0.29 | tokens: council, discretionary, relief, tax |
| `estate-planning-for-landlords` | https://uklandlordtax.co.uk/what-we-do/estate-planning-for-landlords/ | 0.22 | 0.29 | tokens: estate, for, landlords, planning |
| `transferring-property-into-a-trust-as-a-gift-or-to-children-tax-implications` | https://buytolettaxaccountants.co.uk/transferring-property-into-a-trust-as-a-gift-or-to... | 0.29 | 0.29 | tokens: a, as, children, gift, implications, into |

### Lease_Freehold (13 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `leasehold-reforms-could-transform-flat-ownership-as-government-confirms-broadband-rights-ground-rent-cap` | https://www.ukpropertyaccountants.co.uk/leasehold-reforms-could-transform-flat-ownershi... | 0.1 | 0.1 | tokens: as, broadband, cap, confirms, could, flat |
| `ground-rent-demands` | https://www.boltburdon.co.uk/blogs/ground-rent-demands/ | 0.11 | 0.11 | tokens: demands, ground, rent |
| `how-do-i-handle-service-charges-and-ground-rent-in-my-accounts` | https://www.towerstone.co.uk/how-do-i-handle-service-charges-and-ground-rent-in-my-acco... | 0.12 | 0.12 | tokens: accounts, and, charges, do, ground, handle |
| `how-can-i-get-a-mortgage-on-a-freehold-flat-13325` | https://www.charcol.co.uk/ask-the-mortgage-experts/how-can-i-get-a-mortgage-on-a-freeho... | 0.14 | 0.13 | tokens: 13325, a, can, flat, freehold, get |
| `manage-freehold-management-company` | https://www.boltburdon.co.uk/blogs/manage-freehold-management-company/ | 0.14 | 0.12 | tokens: company, freehold, manage, management |
| `ground-rent-pay-landlords-costs-seeking-payment` | https://www.boltburdon.co.uk/blogs/ground-rent-pay-landlords-costs-seeking-payment/ | 0.17 | 0.17 | tokens: costs, ground, landlords, pay, payment, rent |
| `multi-unit-freehold-block-mortgages` | https://www.thebuytoletbroker.co.uk/multi-unit-freehold-block-mortgages/ | 0.11 | 0.17 | tokens: block, freehold, mortgages, multi, unit |
| `is-it-worth-buying-the-freehold-of-my-house` | https://www.towerstone.co.uk/is-it-worth-buying-the-freehold-of-my-house | 0.15 | 0.18 | tokens: buying, freehold, house, is, it, my |
| `kaye-oxford-house-directors-freehold-leasehold-company` | https://www.boltburdon.co.uk/blogs/kaye-oxford-house-directors-freehold-leasehold-company/ | 0.18 | 0.17 | tokens: company, directors, freehold, house, kaye, leasehold |
| `two-flats-within-a-freehold-property-5368` | https://www.charcol.co.uk/ask-the-mortgage-experts/two-flats-within-a-freehold-property... | 0.18 | 0.2 | tokens: 5368, a, flats, freehold, property, two |
| `fri-leases-service-charges-streamline-property-accounting` | https://rentalbux.com/blogs/fri-leases-service-charges-streamline-property-accounting | 0.22 | 0.17 | tokens: accounting, charges, fri, leases, property, service |
| `flying-freehold-mortgages` | https://www.charcol.co.uk/mortgages/specialist-property-mortgages/flying-freehold-mortg... | 0.14 | 0.25 | tokens: flying, freehold, mortgages |
| `freehold-purchase-leasehold-reform-act` | https://www.boltburdon.co.uk/blogs/freehold-purchase-leasehold-reform-act/ | 0.25 | 0.25 | tokens: act, freehold, leasehold, purchase, reform |

### AccountantByCity (5 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `uk-property-accountants-your-authorised-corporate-service-provider-acsp` | https://www.ukpropertyaccountants.co.uk/uk-property-accountants-your-authorised-corpora... | 0.18 | 0.14 | tokens: accountants, acsp, authorised, corporate, property, provider |
| `7-essentials-when-looking-for-property-accountants-for-landlords` | https://www.ukpropertyaccountants.co.uk/7-essentials-when-looking-for-property-accounta... | 0.23 | 0.21 | tokens: 7, accountants, essentials, for, landlords, looking |
| `unlocking-the-value-of-property-accountants-in-real-estate-finance-a-detailed-exploration` | https://www.ukpropertyaccountants.co.uk/unlocking-the-value-of-property-accountants-in-... | 0.24 | 0.24 | tokens: a, accountants, detailed, estate, exploration, finance |
| `why-choose-uk-property-accountants-over-other-accounting-firms` | https://www.ukpropertyaccountants.co.uk/why-choose-uk-property-accountants-over-other-a... | 0.27 | 0.13 | tokens: accountants, accounting, choose, firms, other, over |
| `the-role-of-property-accountants-in-maximising-real-estate-investments` | https://www.djh.co.uk/latest-news/news-insights/the-role-of-property-accountants-in-max... | 0.29 | 0.29 | tokens: accountants, estate, in, investments, maximising, of |

### LBTT_Scottish (11 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `growing-importance-scottish-tax-codes` | https://ciot-att.lndo.site/employers/welcome-employer-focus/growing-importance-scottish... | 0.14 | 0.12 | tokens: codes, growing, importance, scottish, tax |
| `scottish-tenancy-reform` | https://www.nrla.org.uk/research/deep-insight/scottish-tenancy-reform | 0.14 | 0.14 | tokens: reform, scottish, tenancy |
| `assignation-of-leases-and-lbtt-getting-the-rent-and-premium-calculations-right` | https://www.ukpropertyaccountants.co.uk/assignation-of-leases-and-lbtt-getting-the-rent... | 0.13 | 0.19 | tokens: and, assignation, calculations, getting, lbtt, leases |
| `possible-scottish-tax-reform-to-attract-property-investment-can-reserved-investor-funds-deliver` | https://www.ukpropertyaccountants.co.uk/possible-scottish-tax-reform-to-attract-propert... | 0.19 | 0.16 | tokens: attract, can, deliver, funds, investment, investor |
| `scotlands-property-tax-revenue-raises-questions-over-long-term-strategy` | https://www.ukpropertyaccountants.co.uk/scotlands-property-tax-revenue-raises-questions... | 0.19 | 0.08 | tokens: long, over, property, questions, raises, revenue |
| `is-hmrc-cracking-down-on-scottish-property-investors` | https://www.ukpropertyaccountants.co.uk/is-hmrc-cracking-down-on-scottish-property-inve... | 0.2 | 0.12 | tokens: cracking, down, hmrc, investors, is, on |
| `ads-key-facts-for-buying-additional-property-in-scotland` | https://www.ukpropertyaccountants.co.uk/ads-key-facts-for-buying-additional-property-in... | 0.21 | 0.21 | tokens: additional, ads, buying, facts, for, in |
| `scottish-landlords-pay-millions-more-into-government-coffers-why` | https://www.ukpropertyaccountants.co.uk/scottish-landlords-pay-millions-more-into-gover... | 0.15 | 0.23 | tokens: coffers, government, into, landlords, millions, more |
| `buying-multiple-properties-in-scotland-the-key-to-saving-on-lbtt` | https://www.ukpropertyaccountants.co.uk/buying-multiple-properties-in-scotland-the-key-... | 0.25 | 0.25 | tokens: buying, in, key, lbtt, multiple, on |
| `is-scotlands-699-million-property-tax-take-helping-or-hurting-the-market` | https://www.ukpropertyaccountants.co.uk/is-scotlands-699-million-property-tax-take-help... | 0.25 | 0.25 | tokens: 699, helping, hurting, is, market, million |
| `urgent-registration-required-for-short-term-let-landlords-in-scotland` | https://www.ukpropertyaccountants.co.uk/urgent-registration-required-for-short-term-let... | 0.2 | 0.25 | tokens: for, in, landlords, let, registration, required |

### S24_MortgageInterest (2 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `mortgage-interest-and-costs` | https://www.provestor.co.uk/help/mtd/key-concepts-rules/mortgage-interest-and-costs | 0.25 | 0.2 | tokens: and, costs, interest, mortgage |
| `landlords-grapple-with-dual-challenges-rising-interest-rates-and-section-24` | https://www.ukpropertyaccountants.co.uk/landlords-grapple-with-dual-challenges-rising-i... | 0.29 | 0.12 | tokens: 24, and, challenges, dual, grapple, interest |

### Partnership_LLP (7 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `cooke-sc-properties-ltd-vs-hmrc-taxation-partnership-dispute` | https://www.ukpropertyaccountants.co.uk/cooke-sc-properties-ltd-vs-hmrc-taxation-partne... | 0.18 | 0.18 | tokens: cooke, dispute, hmrc, ltd, partnership, properties |
| `hybrid-llp-tax-structures` | https://www.ukpropertyaccountants.co.uk/services/hybrid-llp-tax-structures/ | 0.2 | 0.2 | tokens: hybrid, llp, structures, tax |
| `hmrc-attacks-hybrid-business-property-llp-model-spotlight-63` | https://www.ukpropertyaccountants.co.uk/hmrc-attacks-hybrid-business-property-llp-model... | 0.21 | 0.13 | tokens: 63, attacks, business, hmrc, hybrid, llp |
| `buxton-accounting-llp` | https://www.ukaccountingfirms.co.uk/3916/buxton-accounting-llp | 0.25 | 0.25 | tokens: accounting, buxton, llp |
| `the-tax-faculty-llp` | https://www.ukaccountingfirms.co.uk/4620/the-tax-faculty-llp | 0.25 | 0.25 | tokens: faculty, llp, tax, the |
| `does-an-llp-pay-corporation-tax` | https://www.towerstone.co.uk/does-an-llp-pay-corporation-tax | 0.27 | 0.27 | tokens: an, corporation, does, llp, pay, tax |
| `hybrid-llp-scheme-risks-and-compliance-for-property-owners` | https://www.ukpropertyaccountants.co.uk/hybrid-llp-scheme-risks-and-compliance-for-prop... | 0.27 | 0.18 | tokens: and, compliance, for, hybrid, llp, owners |

### CompaniesHouse_ECCTA (8 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `company-strike-off-can-you-just-let-a-company-be-struck-off-by-not-filing-at-companies-house` | https://uklandlordtax.co.uk/company-strike-off-can-you-just-let-a-company-be-struck-off... | 0.12 | 0.12 | tokens: a, at, be, by, can, companies |
| `insights-on-companies-houses-new-powers-on-company-names` | https://www.ukpropertyaccountants.co.uk/insights-on-companies-houses-new-powers-on-comp... | 0.17 | 0.15 | tokens: companies, company, houses, insights, names, new |
| `what-are-all-my-first-year-deadlines-with-hmrc-and-companies-house` | https://www.towerstone.co.uk/what-are-all-my-first-year-deadlines-with-hmrc-and-compani... | 0.17 | 0.17 | tokens: all, and, are, companies, deadlines, first |
| `companies-house-security-glitch-what-happened-and-what-your-company-needs-to-review` | https://www.boltburdon.co.uk/blogs/companies-house-security-glitch-what-happened-and-wh... | 0.19 | 0.19 | tokens: and, companies, company, glitch, happened, house |
| `how-do-i-close-a-company-at-companies-house` | https://www.towerstone.co.uk/how-do-i-close-a-company-at-companies-house | 0.2 | 0.2 | tokens: a, at, close, companies, company, do |
| `how-to-change-your-company-name-on-companies-house` | https://taxfix.com/en-uk/limited-companies/how-to-change-your-company-name-on-companies... | 0.21 | 0.2 | tokens: change, companies, company, house, how, name |
| `how-to-change-company-name-on-companies-house` | https://www.towerstone.co.uk/how-to-change-company-name-on-companies-house | 0.23 | 0.22 | tokens: change, companies, company, house, how, name |
| `how-to-make-a-company-dormant-on-companies-house` | https://www.towerstone.co.uk/how-to-make-a-company-dormant-on-companies-house | 0.25 | 0.21 | tokens: a, companies, company, dormant, house, how |

### Penalties_HMRC (7 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `automatic-corporation-tax-penalty-notices-temporarily-paused-hmrc-updates-systems` | https://ciot-att.lndo.site/technical/automatic-corporation-tax-penalty-notices-temporar... | 0.15 | 0.15 | tokens: automatic, corporation, hmrc, notices, paused, penalty |
| `analysis-of-marano-v-hmrc-tax-penalty-appeal` | https://www.taxaccountant.co.uk/analysis-of-marano-v-hmrc-tax-penalty-appeal/ | 0.15 | 0.17 | tokens: analysis, appeal, hmrc, marano, of, penalty |
| `warning-dont-incur-late-tax-penalties-as-7-75-interest-rate-looms` | https://www.ukpropertyaccountants.co.uk/warning-dont-incur-late-tax-penalties-as-7-75-i... | 0.19 | 0.13 | tokens: 7, 75, as, dont, incur, interest |
| `hmrc-enquiry-support-for-airbnb-short-term-letting-hosts` | https://www.ukpropertyaccountants.co.uk/services/hmrc-enquiry-support-for-airbnb-short-... | 0.21 | 0.17 | tokens: airbnb, enquiry, for, hmrc, hosts, letting |
| `early-redemption-penalties-are-they-tax-deductible-for-uk-property-investors` | https://www.property-tax-advice.co.uk/knowledge-centre/early-redemption-penalties-are-t... | 0.23 | 0.23 | tokens: are, deductible, early, for, investors, penalties |
| `hmrc-favouring-new-rules-for-the-tax-penalty-system` | https://www.ukpropertyaccountants.co.uk/hmrc-favouring-new-rules-for-the-tax-penalty-sy... | 0.27 | 0.27 | tokens: favouring, for, hmrc, new, penalty, rules |
| `high-value-properties-in-the-uk-tax-liabilities-penalty-risks` | https://www.ukpropertyaccountants.co.uk/high-value-properties-in-the-uk-tax-liabilities... | 0.29 | 0.29 | tokens: high, in, liabilities, penalty, properties, risks |

### LTT_Welsh (8 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `tenant-fee-ban-toolkit-wales` | https://www.nrla.org.uk/resources/pre-tenancy/tenant-fee-ban-toolkit-wales | 0.09 | 0.07 | tokens: ban, fee, tenant, toolkit, wales |
| `rental-yields-across-england-and-wales` | https://www.ukpropertyaccountants.co.uk/rental-yields-across-england-and-wales/ | 0.12 | 0.12 | tokens: across, and, england, rental, wales, yields |
| `what-property-buying-in-wales-looks-like-latest-stats` | https://www.ukpropertyaccountants.co.uk/what-property-buying-in-wales-looks-like-latest... | 0.17 | 0.19 | tokens: buying, in, latest, like, looks, property |
| `property-inspections-wales` | https://www.nrla.org.uk/resources/licensing-and-local-gov/property-inspections-wales | 0.2 | 0.2 | tokens: inspections, property, wales |
| `why-wales-rent-changes-should-concern-englands-landlords` | https://www.ukpropertyaccountants.co.uk/why-wales-rent-changes-should-concern-englands-... | 0.18 | 0.2 | tokens: changes, concern, englands, landlords, rent, should |
| `new-welsh-ltt-refund-for-properties-leased-to-local-authorities` | https://www.ukpropertyaccountants.co.uk/new-welsh-ltt-refund-for-properties-leased-to-l... | 0.21 | 0.21 | tokens: authorities, for, leased, local, ltt, new |
| `understanding-land-transaction-tax-ltt-and-the-subsidiary-dwelling-exception-sde` | https://www.ukpropertyaccountants.co.uk/understanding-land-transaction-tax-ltt-and-the-... | 0.27 | 0.27 | tokens: and, dwelling, exception, land, ltt, sde |
| `thousands-of-welsh-property-buyers-could-be-owed-land-transaction-tax-refunds` | https://www.ukpropertyaccountants.co.uk/thousands-of-welsh-property-buyers-could-be-owe... | 0.28 | 0.24 | tokens: be, buyers, could, land, of, owed |

### HMO (4 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |
|---|---|---:|---:|---|
| `do-hmo-owners-need-a-rental-management-software` | https://rentalbux.com/blogs/do-hmo-owners-need-a-rental-management-software | 0.17 | 0.17 | tokens: a, do, hmo, management, need, owners |
| `hmo-room-by-room-accounting-strategy-maximise-profits` | https://rentalbux.com/blogs/hmo-room-by-room-accounting-strategy-maximise-profits | 0.17 | 0.09 | tokens: accounting, by, hmo, maximise, profits, room |
| `hora-tevfik-v-hmrc-implications-for-hmo-owners` | https://www.ukpropertyaccountants.co.uk/hora-tevfik-v-hmrc-implications-for-hmo-owners/ | 0.18 | 0.17 | tokens: for, hmo, hmrc, hora, implications, owners |
| `hmo-mortgages-for-vulnerable-tenants` | https://www.thebuytoletbroker.co.uk/hmo-mortgages-for-vulnerable-tenants/ | 0.11 | 0.22 | tokens: for, hmo, mortgages, tenants, vulnerable |

---

## Partial-overlap candidates (Jaccard 0.30-0.55, manager arbitration needed)

These slugs partly overlap existing content or candidate-pool slugs. Manager review decides: expand existing page, redirect, or write new.

### VAT (70 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `what-is-postponed-vat-accounting-and-how-does-it-work` | https://www.towerstone.co.uk/what-is-postponed-vat-accounting-and-how-does-it-work | 0.19 | 0.54 | accounting, and, does, how, is, it |
| `option-to-tax-on-commercial-property` | https://fhpaccounting.co.uk/option-to-tax-on-commercial-property/ | 0.5 | 0.27 | commercial, on, option, property, tax, to |
| `understanding-vat-on-residential-property-refurbishment` | https://www.ukpropertyaccountants.co.uk/understanding-vat-on-residential-property-refur... | 0.5 | 0.2 | on, property, refurbishment, residential, understanding, vat |
| `vat-accountant-birmingham` | https://www.business-accounting.co.uk/blog/vat-accountant-birmingham | 0.5 | 0.25 | accountant, birmingham, vat |
| `vat-accountant-bristol` | https://www.business-accounting.co.uk/blog/vat-accountant-bristol | 0.5 | 0.25 | accountant, bristol, vat |
| `vat-accountant-coventry` | https://www.business-accounting.co.uk/blog/vat-accountant-coventry | 0.5 | 0.25 | accountant, coventry, vat |
| `vat-accountant-leicester` | https://www.business-accounting.co.uk/blog/vat-accountant-leicester | 0.5 | 0.25 | accountant, leicester, vat |
| `vat-accountant-london` | https://www.business-accounting.co.uk/blog/vat-accountant-london | 0.5 | 0.25 | accountant, london, vat |
| `vat-accountant-manchester` | https://www.business-accounting.co.uk/blog/vat-accountant-manchester | 0.5 | 0.25 | accountant, manchester, vat |
| `vat-on-property` | https://www.ukpropertyaccountants.co.uk/category/vat-on-property/ | 0.5 | 0.29 | on, property, vat |
| `vat-reverse-charge` | https://www.taxaccountant.co.uk/tag/vat-reverse-charge/ | 0.5 | 0.5 | charge, reverse, vat |
| `vat-reverse-charge-for-construction-services` | https://bhp.co.uk/news-events/blog/vat-reverse-charge-for-construction-services/ | 0.5 | 0.29 | charge, construction, for, reverse, services, vat |
| `vat-the-capital-goods-scheme-for-property-businesses` | https://www.taxaccountant.co.uk/vat-the-capital-goods-scheme-for-property-businesses/ | 0.5 | 0.25 | businesses, capital, for, goods, property, scheme |
| `vat-on-uk-residential-commercial-property-a-complete-guide` | https://www.ukpropertyaccountants.co.uk/vat-on-uk-residential-commercial-property-a-com... | 0.42 | 0.45 | a, commercial, complete, guide, on, property |
| `how-to-pay-vat-to-hmrc.htm` | https://www.alexander-ene.co.uk/how-to-pay-vat-to-hmrc.htm | 0.43 | 0.18 | hmrc, how, htm, pay, to, vat |
| `vat-accountant-milton-keynes` | https://www.business-accounting.co.uk/blog/vat-accountant-milton-keynes | 0.43 | 0.2 | accountant, keynes, milton, vat |
| `vat-on-property-conversion` | https://www.ukpropertyaccountants.co.uk/vat-on-property-conversion/ | 0.43 | 0.25 | conversion, on, property, vat |
| `vat-on-property-guide` | https://www.ukpropertyaccountants.co.uk/vat-on-property-guide/ | 0.43 | 0.38 | guide, on, property, vat |
| `vat-refunds-for-diy-housebuilders` | https://www.taxaccountant.co.uk/vat-refunds-for-diy-housebuilders/ | 0.43 | 0.2 | diy, for, housebuilders, refunds, vat |
| `vat-on-commercial-property-what-you-need-to-know` | https://www.ukpropertyaccountants.co.uk/vat-on-commercial-property-what-you-need-to-know/ | 0.29 | 0.42 | commercial, know, need, on, property, to |
| `vat-on-long-term-hotel-stays` | https://www.geraldedelman.com/insights/vat-on-long-term-hotel-stays/ | 0.42 | 0.2 | hotel, long, on, stays, term, vat |
| `vat-repayments-fraud-what-you-need-to-know` | https://www.djh.co.uk/latest-news/news-insights/vat-repayments-fraud-what-you-need-to-k... | 0.29 | 0.42 | fraud, know, need, repayments, to, vat |
| `vat-accountant-nottingham` | https://www.business-accounting.co.uk/blog/vat-accountant-nottingham | 0.4 | 0.25 | accountant, nottingham, vat |
| `vat-on-residential-property-insights-for-owners-investors` | https://www.ukpropertyaccountants.co.uk/vat-on-residential-property-insights-for-owners... | 0.4 | 0.17 | for, insights, investors, on, owners, property |
| `vat-schemes-property-developers` | https://www.business-accounting.co.uk/blog/vat-schemes-property-developers | 0.29 | 0.4 | developers, property, schemes, vat |
| `new-penalties-and-interest-for-late-payment-and-submission-of-vat-returns` | https://www.geraldedelman.com/insights/new-penalties-and-interest-for-late-payment-and-... | 0.38 | 0.38 | and, for, interest, late, new, of |
| `vat-group-registration` | https://www.mytaxaccountant.co.uk/post/vat-group-registration | 0.38 | 0.25 | group, registration, vat |
| `vat-on-property-service-charge` | https://www.ukpropertyaccountants.co.uk/category/vat-on-property-service-charge/ | 0.38 | 0.3 | charge, on, property, service, vat |
| `vat-reverse-charge-for-builders` | https://www.taxaccountant.co.uk/vat-reverse-charge-for-builders/ | 0.38 | 0.33 | builders, charge, for, reverse, vat |
| `vat-treatment-on-property-conversions` | https://uklandlordtax.co.uk/vat-treatment-on-property-conversions/ | 0.38 | 0.22 | conversions, on, property, treatment, vat |
| *(+40 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### CGT (148 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `capital-gains-tax-a-guide-for-uk-investors` | https://www.saltus.co.uk/the-financial-planning-blog/capital-gains-tax-a-guide-for-uk-i... | 0.5 | 0.42 | a, capital, for, gains, guide, investors |
| `capital-gains-tax-account` | https://www.towerstone.co.uk/capital-gains-tax-account | 0.5 | 0.22 | account, capital, gains, tax |
| `capital-gains-tax-accountant` | https://www.mytaxaccountant.co.uk/post/capital-gains-tax-accountant | 0.5 | 0.22 | accountant, capital, gains, tax |
| `capital-gains-tax-advice` | https://buytolettaxaccountants.co.uk/service/capital-gains-tax-advice/ | 0.5 | 0.22 | advice, capital, gains, tax |
| `capital-gains-tax-allowance` | https://taxfix.com/en-uk/glossary/capital-gains-tax-allowance/ | 0.5 | 0.22 | allowance, capital, gains, tax |
| `capital-gains-tax-business` | https://www.taxaccountant.co.uk/business-tax-services/capital-gains-tax-business/ | 0.5 | 0.22 | business, capital, gains, tax |
| `capital-gains-tax-cgt` | https://taxfix.com/en-uk/glossary/capital-gains-tax-cgt/ | 0.5 | 0.22 | capital, cgt, gains, tax |
| `capital-gains-tax-for-uk-residents` | https://uklandlordtax.co.uk/what-we-do/capital-gains-tax/capital-gains-tax-for-uk-resid... | 0.44 | 0.5 | capital, for, gains, residents, tax, uk |
| `capital-gains-tax-guides` | https://uklandlordtax.co.uk/tax-guide-category/capital-gains-tax-guides/ | 0.5 | 0.22 | capital, gains, guides, tax |
| `capital-gains-tax-incurred-on-commercial-property` | https://www.ukpropertyaccountants.co.uk/capital-gains-tax-incurred-on-commercial-property/ | 0.5 | 0.2 | capital, commercial, gains, incurred, on, property |
| `capital-gains-tax-incurred-on-rental-property` | https://www.ukpropertyaccountants.co.uk/capital-gains-tax-incurred-on-rental-property/ | 0.5 | 0.2 | capital, gains, incurred, on, property, rental |
| `capital-gains-tax-indigestion` | https://bhp.co.uk/news-events/blog/capital-gains-tax-indigestion/ | 0.5 | 0.22 | capital, gains, indigestion, tax |
| `capital-gains-tax-on-jointly-owned-property` | https://www.ukpropertyaccountants.co.uk/capital-gains-tax-on-jointly-owned-property/ | 0.5 | 0.43 | capital, gains, jointly, on, owned, property |
| `capital-gains-tax-planning-guide` | https://www.taxaccountant.co.uk/capital-gains-tax-planning-guide/ | 0.5 | 0.22 | capital, gains, guide, planning, tax |
| `capital-gains-tax-reliefs` | https://capitalgainstax.co.uk/capital-gains-tax-reliefs | 0.5 | 0.22 | capital, gains, reliefs, tax |
| `capital-gains-tax-reporting` | https://uklandlordtax.co.uk/capital-gains-tax-reporting/ | 0.5 | 0.22 | capital, gains, reporting, tax |
| `capital-gains-tax-reporting-after-selling-uk-property` | https://www.ukpropertyaccountants.co.uk/capital-gains-tax-reporting-after-selling-uk-pr... | 0.5 | 0.18 | after, capital, gains, property, reporting, selling |
| `capital-gains-tax-service` | https://www.alexander-ene.co.uk/services/capital-gains-tax-service | 0.5 | 0.22 | capital, gains, service, tax |
| `capital-gains-tax-valuation` | https://www.mytaxaccountant.co.uk/post/capital-gains-tax-valuation | 0.5 | 0.22 | capital, gains, tax, valuation |
| `capital-gains-tax.htm` | https://www.alexander-ene.co.uk/capital-gains-tax.htm | 0.5 | 0.22 | capital, gains, htm, tax |
| `cgt-late-filing-penalties` | https://www.ukpropertyaccountants.co.uk/cgt-late-filing-penalties/ | 0.5 | 0.5 | cgt, filing, late, penalties |
| `cgt-on-commercial-property` | https://www.mytaxaccountant.co.uk/post/cgt-on-commercial-property | 0.5 | 0.2 | cgt, commercial, on, property |
| `cgt-on-residential-property` | https://uklandlordtax.co.uk/cgt-on-residential-property/ | 0.5 | 0.17 | cgt, on, property, residential |
| `cgt-private-residence-relief` | https://www.mytaxaccountant.co.uk/post/cgt-private-residence-relief | 0.5 | 0.2 | cgt, private, relief, residence |
| `do-i-have-to-pay-capital-gains-tax-on-classic-cars` | https://taxfix.com/en-uk/investor-capital-gains-tax-returns/do-i-have-to-pay-capital-ga... | 0.5 | 0.5 | capital, cars, classic, do, gains, have |
| `do-i-have-to-pay-capital-gains-tax-on-inherited-property` | https://www.towerstone.co.uk/do-i-have-to-pay-capital-gains-tax-on-inherited-property | 0.5 | 0.5 | capital, do, gains, have, i, inherited |
| `ots-capital-gains-tax` | https://www.nrla.org.uk/research/deep-insight/ots-capital-gains-tax | 0.5 | 0.22 | capital, gains, ots, tax |
| `property-capital-gains-tax-changes-for-investors` | https://www.taxaccountant.co.uk/property-capital-gains-tax-changes-for-investors/ | 0.5 | 0.27 | capital, changes, for, gains, investors, property |
| `tax-free-capital-gains` | https://www.taxaccountant.co.uk/tax-free-capital-gains/ | 0.5 | 0.22 | capital, free, gains, tax |
| `understanding-capital-gains-tax-on-property-sales` | https://www.taxaccountant.co.uk/understanding-capital-gains-tax-on-property-sales/ | 0.5 | 0.2 | capital, gains, on, property, sales, tax |
| *(+118 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### MTD (119 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `complete-guide-on-making-tax-digital-for-income-tax-for-landlords` | https://rentalbux.com/blogs/complete-guide-on-making-tax-digital-for-income-tax-for-lan... | 0.55 | 0.29 | complete, digital, for, guide, income, landlords |
| `mtd-deadlines-penalties-what-you-need-to-know` | https://rentalbux.com/guides/mtd-deadlines-penalties-what-you-need-to-know | 0.36 | 0.55 | deadlines, know, mtd, need, penalties, to |
| `excel-making-tax-digital-complete-guide-uk-landlords` | https://rentalbux.com/blogs/excel-making-tax-digital-complete-guide-uk-landlords | 0.5 | 0.27 | complete, digital, excel, guide, landlords, making |
| `making-tax-digital-ai-companies` | https://www.business-accounting.co.uk/blog/making-tax-digital-ai-companies | 0.5 | 0.5 | ai, companies, digital, making, tax |
| `making-tax-digital-for-income-tax-self-assessment` | https://rentalbux.com/blogs/making-tax-digital-for-income-tax-self-assessment | 0.5 | 0.5 | assessment, digital, for, income, making, self |
| `making-tax-digital-for-landlords` | https://fhpaccounting.co.uk/making-tax-digital-for-landlords/ | 0.5 | 0.38 | digital, for, landlords, making, tax |
| `making-tax-digital-income-tax` | https://ciot-att.lndo.site/making-tax-digital-income-tax | 0.5 | 0.38 | digital, income, making, tax |
| `making-tax-digital-jointly-owned-property` | https://fhpaccounting.co.uk/making-tax-digital-jointly-owned-property/ | 0.5 | 0.5 | digital, jointly, making, owned, property, tax |
| `making-tax-digital-landlords-guide` | https://uklandlordtax.co.uk/making-tax-digital-landlords-guide/ | 0.5 | 0.33 | digital, guide, landlords, making, tax |
| `making-tax-digital-mtd` | https://www.business-accounting.co.uk/glossary/making-tax-digital-mtd | 0.38 | 0.5 | digital, making, mtd, tax |
| `making-tax-digital-tech-companies` | https://www.business-accounting.co.uk/blog/making-tax-digital-tech-companies | 0.5 | 0.5 | companies, digital, making, tax, tech |
| `mtd-software-for-landlords` | https://rentalbux.com/mtd-software-for-landlords | 0.5 | 0.38 | for, landlords, mtd, software |
| `the-lowdown-on-making-tax-digital-mtd` | https://gorillaaccounting.com/blog/the-lowdown-on-making-tax-digital-mtd/ | 0.27 | 0.5 | digital, lowdown, making, mtd, on, tax |
| `how-to-make-tax-digital-mtd-self-assessment` | https://taxfix.com/en-uk/tax-changes/how-to-make-tax-digital-mtd-self-assessment/ | 0.45 | 0.33 | assessment, digital, how, make, mtd, self |
| `making-tax-digital-mtd-for-income-tax-self-assessment` | https://www.geraldedelman.com/insights/making-tax-digital-mtd-for-income-tax-self-asses... | 0.45 | 0.45 | assessment, digital, for, income, making, mtd |
| `making-tax-digital-mtd-for-jointly-owned-properties` | https://rentalbux.com/blogs/making-tax-digital-mtd-for-jointly-owned-properties | 0.42 | 0.45 | digital, for, jointly, making, mtd, owned |
| `making-tax-digital-for-income-tax` | https://hwfisher.co.uk/making-tax-digital-for-income-tax/ | 0.44 | 0.33 | digital, for, income, making, tax |
| `making-tax-digital-for-landlords-delayed` | https://uklandlordtax.co.uk/making-tax-digital-for-landlords-delayed/ | 0.44 | 0.33 | delayed, digital, for, landlords, making, tax |
| `making-tax-digital-for-overseas-landlords` | https://rentalbux.com/blogs/making-tax-digital-for-overseas-landlords | 0.44 | 0.38 | digital, for, landlords, making, overseas, tax |
| `making-tax-digital-for-property-landlords` | https://www.business-accounting.co.uk/blog/making-tax-digital-for-property-landlords | 0.44 | 0.33 | digital, for, landlords, making, property, tax |
| `making-tax-digital-landlords-mtd-ebook` | https://rentalbux.com/making-tax-digital-landlords-mtd-ebook | 0.44 | 0.4 | digital, ebook, landlords, making, mtd, tax |
| `mtd-for-income-tax-guide-for-landlords` | https://rentalbux.com/blogs/mtd-for-income-tax-guide-for-landlords | 0.44 | 0.33 | for, guide, income, landlords, mtd, tax |
| `mtd-software-uk-landlords-uk-property-income` | https://rentalbux.com/mtd-software-uk-landlords-uk-property-income | 0.44 | 0.2 | income, landlords, mtd, property, software, uk |
| `what-is-making-tax-digital-for-income-tax` | https://taxfix.com/en-uk/tax-changes/what-is-making-tax-digital-for-income-tax/ | 0.44 | 0.44 | digital, for, income, is, making, tax |
| `making-tax-digital-for-income-tax-everything-you-need-to-know` | https://rentalbux.com/blogs/making-tax-digital-for-income-tax-everything-you-need-to-know | 0.43 | 0.27 | digital, everything, for, income, know, making |
| `mtd-for-income-tax` | https://rentalbux.com/blogs/mtd-for-income-tax | 0.43 | 0.43 | for, income, mtd, tax |
| `mtd-for-landlords` | https://www.djh.co.uk/mtd-for-landlords/ | 0.33 | 0.43 | for, landlords, mtd |
| `mtd-quarterly-reporting` | https://fhpaccounting.co.uk/mtd-quarterly-reporting/ | 0.43 | 0.17 | mtd, quarterly, reporting |
| `mtd-software-for-commercial-landlords` | https://rentalbux.com/mtd-software-for-commercial-landlords | 0.43 | 0.33 | commercial, for, landlords, mtd, software |
| `mtd-software-for-residential-landlords` | https://rentalbux.com/mtd-software-for-residential-landlords | 0.43 | 0.4 | for, landlords, mtd, residential, software |
| *(+89 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### LtdCo_Incorporation (79 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `how-much-does-an-accountant-cost-for-a-limited-company` | https://www.towerstone.co.uk/how-much-does-an-accountant-cost-for-a-limited-company | 0.55 | 0.25 | a, accountant, an, company, cost, does |
| `buying-hmo-property-through-a-limited-company-pros-and-cons` | https://www.ukpropertyaccountants.co.uk/buying-hmo-property-through-a-limited-company-p... | 0.54 | 0.54 | a, and, buying, company, cons, hmo |
| `incorporate-property-portfolio-uk` | https://www.shipleystax.com/2025/10/incorporate-property-portfolio-uk/ | 0.5 | 0.17 | incorporate, portfolio, property, uk |
| `incorporating-buy-to-let-property-into-limited-company` | https://www.ukpropertyaccountants.co.uk/incorporating-buy-to-let-property-into-limited-... | 0.5 | 0.4 | buy, company, incorporating, into, let, limited |
| `property-limited-company` | https://fhpaccounting.co.uk/property-limited-company/ | 0.5 | 0.29 | company, limited, property |
| `property-tax-accountant-tax-efficient` | https://www.jamestoddandco.co.uk/property-tax-accountant-tax-efficient/ | 0.5 | 0.17 | accountant, efficient, property, tax |
| `tax-efficient-property-investment-for-directors` | https://www.tlpi.co.uk/tax-efficient-property-investment-for-directors | 0.5 | 0.22 | directors, efficient, for, investment, property, tax |
| `transferring-property-to-a-limited-company` | https://www.taxaccountant.co.uk/transferring-property-to-a-limited-company/ | 0.5 | 0.5 | a, company, limited, property, to, transferring |
| `uk-corporation-tax-why-transfer-property-to-a-limited-company` | https://www.ukpropertyaccountants.co.uk/uk-corporation-tax-why-transfer-property-to-a-l... | 0.5 | 0.28 | a, company, corporation, limited, property, tax |
| `the-tax-pros-and-cons-for-transferring-property-into-a-limited-company` | https://buytolettaxaccountants.co.uk/the-tax-pros-and-cons-for-transferring-property-in... | 0.47 | 0.47 | a, and, company, cons, for, into |
| `buy-to-let-limited-company-what-you-need-to-know` | https://www.ukpropertyaccountants.co.uk/buy-to-let-limited-company-what-you-need-to-know/ | 0.45 | 0.38 | buy, company, know, let, limited, need |
| `incorporate-your-hmo-into-a-limited-company` | https://www.ukpropertyaccountants.co.uk/services/incorporate-your-hmo-into-a-limited-co... | 0.42 | 0.44 | a, company, hmo, incorporate, into, limited |
| `limited-company-guide-to-expenses` | https://gorillaaccounting.com/blog/limited-company-guide-to-expenses/ | 0.44 | 0.27 | company, expenses, guide, limited, to |
| `ltd-company-buy-to-let-mortgages` | https://www.charcol.co.uk/mortgages/best-buys/ltd-company-buy-to-let-mortgages/ | 0.44 | 0.33 | buy, company, let, ltd, mortgages, to |
| `family-investment-company-tax-planning` | https://www.taxaccountant.co.uk/family-investment-company-tax-planning/ | 0.43 | 0.23 | company, family, investment, planning, tax |
| `furnished-holiday-lettings-incorporation` | https://www.ukpropertyaccountants.co.uk/services/furnished-holiday-lettings-incorporation/ | 0.43 | 0.43 | furnished, holiday, incorporation, lettings |
| `landlord-sole-trader-vs-limited-company` | https://www.business-accounting.co.uk/blog/landlord-sole-trader-vs-limited-company | 0.43 | 0.43 | company, landlord, limited, sole, trader, vs |
| `property-portfolio-incorporation` | https://www.thebuytoletbroker.co.uk/property-portfolio-incorporation/ | 0.43 | 0.25 | incorporation, portfolio, property |
| `purchase-property-limited-company` | https://www.qaccounting.com/purchase-property-limited-company/ | 0.43 | 0.25 | company, limited, property, purchase |
| `sole-trader-vs-limited-company-tax` | https://taxfix.com/en-uk/self-assessment-basics/sole-trader-vs-limited-company-tax/ | 0.43 | 0.43 | company, limited, sole, tax, trader, vs |
| `what-is-limited-company-dividend-tax` | https://taxfix.com/en-uk/limited-companies/what-is-limited-company-dividend-tax/ | 0.43 | 0.38 | company, dividend, is, limited, tax, what |
| `considerations-for-transferring-property-to-a-limited-company` | https://uklandlordtax.co.uk/considerations-for-transferring-property-to-a-limited-company/ | 0.4 | 0.42 | a, company, considerations, for, limited, property |
| `how-to-register-a-limited-company-as-a-uk-landlord` | https://www.ukpropertyaccountants.co.uk/how-to-register-a-limited-company-as-a-uk-landl... | 0.42 | 0.29 | a, as, company, how, landlord, limited |
| `benefits-of-hiring-a-limited-company-accountant` | https://www.qaccounting.com/benefits-of-hiring-a-limited-company-accountant/ | 0.3 | 0.4 | a, accountant, benefits, company, hiring, limited |
| `cleaning-companies-register-limited-company` | https://www.business-accounting.co.uk/blog/cleaning-companies-register-limited-company | 0.4 | 0.4 | cleaning, companies, company, limited, register |
| `courier-companies-register-limited-company` | https://www.business-accounting.co.uk/blog/courier-companies-register-limited-company | 0.4 | 0.4 | companies, company, courier, limited, register |
| `pension-schemes-limited-company-ir35` | https://gorillaaccounting.com/blog/pension-schemes-limited-company-ir35/ | 0.22 | 0.4 | company, ir35, limited, pension, schemes |
| `removal-companies-register-limited-company` | https://www.business-accounting.co.uk/blog/removal-companies-register-limited-company | 0.4 | 0.4 | companies, company, limited, register, removal |
| `shipping-companies-register-limited-company` | https://www.business-accounting.co.uk/blog/shipping-companies-register-limited-company | 0.4 | 0.4 | companies, company, limited, register, shipping |
| `choosing-a-limited-company-accountant` | https://www.qaccounting.com/choosing-a-limited-company-accountant/ | 0.25 | 0.38 | a, accountant, choosing, company, limited |
| *(+49 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### IHT (97 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `inheritance-tax-calculator` | https://www.ukpropertyaccountants.co.uk/calculators/inheritance-tax-calculator/ | 0.5 | 0.33 | calculator, inheritance, tax |
| `inheritance-tax-guide` | https://perrysaccountants.co.uk/literature/inheritance-tax-guide | 0.5 | 0.33 | guide, inheritance, tax |
| `inheritance-tax-on-jointly-owned-property` | https://www.mytaxaccountant.co.uk/post/inheritance-tax-on-jointly-owned-property | 0.5 | 0.5 | inheritance, jointly, on, owned, property, tax |
| `what-is-inheritance-tax` | https://www.towerstone.co.uk/what-is-inheritance-tax | 0.5 | 0.29 | inheritance, is, tax, what |
| `do-you-have-to-pay-inheritance-tax-before-probate` | https://www.ukpropertyaccountants.co.uk/do-you-have-to-pay-inheritance-tax-before-probate/ | 0.45 | 0.45 | before, do, have, inheritance, pay, probate |
| `inheritance-tax-what-business-owners-need-to-know` | https://www.tlpi.co.uk/inheritance-tax-what-business-owners-need-to-know | 0.36 | 0.45 | business, inheritance, know, need, owners, tax |
| `property-portfolio-inheritance-tax-how-to-protect-it` | https://www.ukpropertyaccountants.co.uk/property-portfolio-inheritance-tax-how-to-prote... | 0.45 | 0.25 | how, inheritance, it, portfolio, property, protect |
| `business-property-relief-transfer-your-business-without-paying-iht` | https://www.ukpropertyaccountants.co.uk/business-property-relief-transfer-your-business... | 0.44 | 0.15 | business, iht, paying, property, relief, transfer |
| `do-expats-pay-uk-inheritance-tax` | https://www.boltburdon.co.uk/tag/do-expats-pay-uk-inheritance-tax/ | 0.44 | 0.44 | do, expats, inheritance, pay, tax, uk |
| `how-to-reduce-your-inheritance-tax` | https://www.shipleystax.com/2020/03/how-to-reduce-your-inheritance-tax/ | 0.44 | 0.44 | how, inheritance, reduce, tax, to, your |
| `navigating-the-new-inheritance-tax-landscape` | https://www.djh.co.uk/latest-news/news-insights/navigating-the-new-inheritance-tax-land... | 0.44 | 0.44 | inheritance, landscape, navigating, new, tax, the |
| `property-family-investment-company-and-inheritance-tax` | https://uklandlordtax.co.uk/tax-guide/property-family-investment-company-and-inheritanc... | 0.44 | 0.44 | and, company, family, inheritance, investment, property |
| `understanding-uk-inheritance-tax-on-overseas-property` | https://www.ukpropertyaccountants.co.uk/understanding-uk-inheritance-tax-on-overseas-pr... | 0.44 | 0.3 | inheritance, on, overseas, property, tax, uk |
| `iht-transferable-nil-rate-band` | https://www.taxaccountant.co.uk/iht-transferable-nil-rate-band/ | 0.43 | 0.43 | band, iht, nil, rate, transferable |
| `isas-and-inheritance-tax` | https://www.mytaxaccountant.co.uk/post/isas-and-inheritance-tax | 0.43 | 0.43 | and, inheritance, isas, tax |
| `property-investment-company-and-inheritance-tax` | https://uklandlordtax.co.uk/property-investment-company-and-inheritance-tax/ | 0.43 | 0.33 | and, company, inheritance, investment, property, tax |
| `spouse-and-inheritance-tax` | https://www.mytaxaccountant.co.uk/post/spouse-and-inheritance-tax | 0.43 | 0.43 | and, inheritance, spouse, tax |
| `uk-inheritance-tax-expats` | https://www.boltburdon.co.uk/tag/uk-inheritance-tax-expats/ | 0.43 | 0.43 | expats, inheritance, tax, uk |
| `understanding-uk-inheritance-tax` | https://www.saltus.co.uk/the-financial-planning-blog/understanding-uk-inheritance-tax | 0.43 | 0.43 | inheritance, tax, uk, understanding |
| `a-beginner-s-guide-to-inheritance-tax-what-you-need-to-know` | https://www.property-tax-advice.co.uk/knowledge-centre/a-beginner-s-guide-to-inheritanc... | 0.4 | 0.33 | a, beginner, guide, inheritance, know, need |
| `business-and-agricultural-property-relief-reduce-your-iht-liability` | https://www.ukpropertyaccountants.co.uk/services/business-and-agricultural-property-rel... | 0.4 | 0.23 | agricultural, and, business, iht, liability, property |
| `deed-of-variation-inheritance-tax` | https://www.mytaxaccountant.co.uk/post/deed-of-variation-inheritance-tax | 0.4 | 0.25 | deed, inheritance, of, tax, variation |
| `family-investment-company-inheritance-tax-and-freezing-value` | https://uklandlordtax.co.uk/family-investment-company-inheritance-tax-and-freezing-value/ | 0.4 | 0.4 | and, company, family, freezing, inheritance, investment |
| `inheritance-tax-hmrc-and-the-7-year-rule` | https://hwfisher.co.uk/inheritance-tax-hmrc-and-the-7-year-rule/ | 0.4 | 0.4 | 7, and, hmrc, inheritance, rule, tax |
| `inheritance-tax-reforms-future-planning-uk-property-accountants` | https://www.ukpropertyaccountants.co.uk/services/inheritance-tax-reforms-future-plannin... | 0.4 | 0.27 | accountants, future, inheritance, planning, property, reforms |
| `smart-gifting-strategies-for-inheritance-tax-planning` | https://www.saltus.co.uk/the-financial-planning-blog/smart-gifting-strategies-for-inher... | 0.4 | 0.4 | for, gifting, inheritance, planning, smart, strategies |
| `uk-guide-to-pensions-and-inheritance-tax-changes` | https://www.alanboswell.com/resources/uk-guide-to-pensions-and-inheritance-tax-changes/ | 0.4 | 0.31 | and, changes, guide, inheritance, pensions, tax |
| `accountants-charges-for-inheritance-tax` | https://www.mytaxaccountant.co.uk/post/accountants-charges-for-inheritance-tax | 0.33 | 0.38 | accountants, charges, for, inheritance, tax |
| `blended-families-and-inheritance-tax` | https://hwfisher.co.uk/blended-families-and-inheritance-tax/ | 0.38 | 0.38 | and, blended, families, inheritance, tax |
| `changes-to-pension-inheritance-tax-what-you-need-to-know` | https://bhp.co.uk/news-events/service-insights/financial-planning/changes-to-pension-in... | 0.36 | 0.38 | changes, inheritance, know, need, pension, tax |
| *(+67 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### SDLT (69 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `a-complete-guide-to-sdlt-probate-property-relief-for-property-traders` | https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-sdlt-probate-property-relie... | 0.54 | 0.54 | a, complete, for, guide, probate, property |
| `cladding-crisis-and-sdlt-relief-what-affected-property-owners-need-to-know` | https://www.ukpropertyaccountants.co.uk/cladding-crisis-and-sdlt-relief-what-affected-p... | 0.2 | 0.54 | affected, and, cladding, crisis, know, need |
| `do-limited-companies-pay-stamp-duty` | https://www.towerstone.co.uk/do-limited-companies-pay-stamp-duty | 0.33 | 0.5 | companies, do, duty, limited, pay, stamp |
| `linked-transactions-and-sdlt-what-property-investors-need-to-know` | https://www.property-tax-advice.co.uk/knowledge-centre/linked-transactions-and-sdlt-wha... | 0.21 | 0.5 | and, investors, know, linked, need, property |
| `sdlt-and-first-time-buyers` | https://www.taxaccountant.co.uk/sdlt-and-first-time-buyers/ | 0.5 | 0.5 | and, buyers, first, sdlt, time |
| `sdlt-first-time-buyers-relief` | https://www.ukpropertyaccountants.co.uk/services/sdlt-first-time-buyers-relief/ | 0.5 | 0.5 | buyers, first, relief, sdlt, time |
| `stamp-duty-calculator-sdlt` | https://www.charcol.co.uk/mortgage-calculators/stamp-duty-calculator-sdlt/ | 0.5 | 0.25 | calculator, duty, sdlt, stamp |
| `stamp-duty-land-tax` | https://www.geraldedelman.com/services/stamp-duty-land-tax/ | 0.29 | 0.5 | duty, land, stamp, tax |
| `stamp-duty-land-tax-for-property-developers` | https://www.ukpropertyaccountants.co.uk/stamp-duty-land-tax-for-property-developers/ | 0.25 | 0.5 | developers, duty, for, land, property, stamp |
| `stamp-duty-rates` | https://www.ukpropertyaccountants.co.uk/stamp-duty-rates/ | 0.33 | 0.5 | duty, rates, stamp |
| `stamp-duty-land-tax-mixed-property-purchases-and-multiple-dwellings-relief` | https://ciot-att.lndo.site/technical/submissions/stamp-duty-land-tax-mixed-property-pur... | 0.46 | 0.46 | and, duty, dwellings, land, mixed, multiple |
| `new-stamp-duty-surcharge-for-overseas-property-buyers` | https://www.provestor.co.uk/blog/new-stamp-duty-surcharge-for-overseas-property-buyers | 0.45 | 0.45 | buyers, duty, for, new, overseas, property |
| `sdlt-advice-for-landlords-and-property-investors` | https://www.geraldedelman.com/insights/sdlt-advice-for-landlords-and-property-investors/ | 0.23 | 0.45 | advice, and, for, investors, landlords, property |
| `stamp-duty-for-first-time-buyers` | https://www.charcol.co.uk/mortgages/best-buys/first-time-buyer/stamp-duty-for-first-tim... | 0.44 | 0.44 | buyers, duty, first, for, stamp, time |
| `stamp-duty-land-tax-1` | https://www.mytaxaccountant.co.uk/post/stamp-duty-land-tax-1 | 0.25 | 0.44 | 1, duty, land, stamp, tax |
| `stamp-duty-land-tax-calculator` | https://perrysaccountants.co.uk/calculators/stamp-duty-land-tax-calculator | 0.33 | 0.44 | calculator, duty, land, stamp, tax |
| `stamp-duty-land-tax-holiday` | https://bhp.co.uk/news-events/blog/stamp-duty-land-tax-holiday/ | 0.25 | 0.44 | duty, holiday, land, stamp, tax |
| `stamp-duty-land-tax-sdlt` | https://www.ukpropertyaccountants.co.uk/stamp-duty-land-tax-sdlt/ | 0.43 | 0.44 | duty, land, sdlt, stamp, tax |
| `multiple-dwellings-relief-scrapped-for-property-investors` | https://www.taxaccountant.co.uk/multiple-dwellings-relief-scrapped-for-property-investors/ | 0.43 | 0.43 | dwellings, for, investors, multiple, property, relief |
| `non-uk-resident-sdlt-surcharge-for-residential-properties-complete-guide` | https://www.ukpropertyaccountants.co.uk/non-uk-resident-sdlt-surcharge-for-residential-... | 0.42 | 0.27 | complete, for, guide, non, properties, resident |
| `scottish-lbtt-consultation-changes-additional-dwelling-supplement` | https://ciot-att.lndo.site/technical/submissions/scottish-lbtt-consultation-changes-add... | 0.42 | 0.11 | additional, changes, consultation, dwelling, lbtt, scottish |
| `stamp-duty-land-tax-relief-for-first-time-buyers` | https://www.ukpropertyaccountants.co.uk/stamp-duty-land-tax-relief-for-first-time-buyers/ | 0.33 | 0.42 | buyers, duty, first, for, land, relief |
| `the-complete-guide-to-overpayment-relief-in-sdlt` | https://www.ukpropertyaccountants.co.uk/the-complete-guide-to-overpayment-relief-in-sdlt/ | 0.33 | 0.42 | complete, guide, in, overpayment, relief, sdlt |
| `six-or-more-dwellings-and-sdlt-when-residential-property-is-taxed-at-commercial-rates` | https://www.property-tax-advice.co.uk/knowledge-centre/six-or-more-dwellings-and-sdlt-w... | 0.25 | 0.41 | and, at, commercial, dwellings, is, more |
| `complete-guide-stamp-duty-on-uninhabitable-property` | https://www.ukpropertyaccountants.co.uk/complete-guide-stamp-duty-on-uninhabitable-prop... | 0.4 | 0.4 | complete, duty, guide, on, property, stamp |
| `important-–-sdlt-on-mixed-use-property-with-multiple-dwellings` | https://www.property-tax-advice.co.uk/knowledge-centre/important-–-sdlt-on-mixed-use-pr... | 0.4 | 0.21 | dwellings, important, mixed, multiple, on, property |
| `sangeeta-modha-v-hmrc-mixed-use-property-in-sdlt` | https://www.ukpropertyaccountants.co.uk/sangeeta-modha-v-hmrc-mixed-use-property-in-sdlt/ | 0.4 | 0.14 | hmrc, in, mixed, modha, property, sangeeta |
| `stamp-duty-land-tax-group-relief` | https://www.mytaxaccountant.co.uk/post/stamp-duty-land-tax-group-relief | 0.33 | 0.4 | duty, group, land, relief, stamp, tax |
| `stamp-duty-land-tax-reliefs.htm` | https://www.alexander-ene.co.uk/stamp-duty-land-tax-reliefs.htm | 0.22 | 0.4 | duty, htm, land, reliefs, stamp, tax |
| `5-stamp-duty-surcharge-refund` | https://www.ukpropertyaccountants.co.uk/services/5-stamp-duty-surcharge-refund/ | 0.38 | 0.33 | 5, duty, refund, stamp, surcharge |
| *(+39 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### Mortgage_BTL (31 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `buy-to-let-mortgage-calculator` | https://www.charcol.co.uk/mortgage-calculators/buy-to-let-mortgage-calculator/ | 0.5 | 0.38 | buy, calculator, let, mortgage, to |
| `buy-to-let-mortgage-deposit-how-much-is-it` | https://www.charcol.co.uk/guides/buy-to-let-mortgage-deposit-how-much-is-it/ | 0.45 | 0.25 | buy, deposit, how, is, it, let |
| `buy-to-let-mortgage-eligibility-criteria` | https://www.charcol.co.uk/mortgages/mortgage-affordability/buy-to-let-mortgage-eligibil... | 0.44 | 0.33 | buy, criteria, eligibility, let, mortgage, to |
| `second-charge-mortgage-buy-to-let` | https://www.charcol.co.uk/mortgages/specialist-mortgages/second-charge-mortgages/second... | 0.44 | 0.33 | buy, charge, let, mortgage, second, to |
| `buy-to-let-mortgages` | https://www.thebuytoletbroker.co.uk/buy-to-let-mortgages/ | 0.43 | 0.43 | buy, let, mortgages, to |
| `buy-to-let-remortgages` | https://www.charcol.co.uk/mortgages/best-buys/buy-to-let-remortgages/ | 0.43 | 0.43 | buy, let, remortgages, to |
| `let-to-buy-mortgages` | https://www.thebuytoletbroker.co.uk/let-to-buy-mortgages/ | 0.43 | 0.43 | buy, let, mortgages, to |
| `buy-to-let-mortgage-calculator-interest-only` | https://uklandlordtax.co.uk/calculators/buy-to-let-mortgage-calculator-interest-only/ | 0.4 | 0.3 | buy, calculator, interest, let, mortgage, only |
| `how-to-get-a-mortgage-on-a-thatched-property` | https://www.charcol.co.uk/mortgages/specialist-property-mortgages/how-to-get-a-mortgage... | 0.4 | 0.21 | a, get, how, mortgage, on, property |
| `specialist-property-mortgages` | https://www.charcol.co.uk/mortgages/specialist-property-mortgages/ | 0.4 | 0.25 | mortgages, property, specialist |
| `how-to-remortgage-to-buy-another-property` | https://www.charcol.co.uk/mortgages/best-buys/remortgage/how-to-remortgage-to-buy-anoth... | 0.38 | 0.2 | another, buy, how, property, remortgage, to |
| `interest-only-mortgage-calculator` | https://uklandlordtax.co.uk/interest-only-mortgage-calculator/ | 0.38 | 0.2 | calculator, interest, mortgage, only |
| `more-buy-to-let-lenders-reducing-mortgage-rates` | https://www.ukpropertyaccountants.co.uk/more-buy-to-let-lenders-reducing-mortgage-rates/ | 0.38 | 0.27 | buy, lenders, let, more, mortgage, rates |
| `what-is-an-interest-only-mortgage` | https://www.towerstone.co.uk/what-is-an-interest-only-mortgage | 0.3 | 0.38 | an, interest, is, mortgage, only, what |
| `buy-to-let-mortgage-on-an-auction-property` | https://www.thebuytoletbroker.co.uk/case-studies/buy-to-let-mortgage-on-an-auction-prop... | 0.36 | 0.27 | an, auction, buy, let, mortgage, on |
| `buy-to-let-large-loan-mortgages` | https://www.thebuytoletbroker.co.uk/buy-to-let-large-loan-mortgages/ | 0.33 | 0.33 | buy, large, let, loan, mortgages, to |
| `can-i-convert-my-mortgage-to-buy-to-let-4177` | https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-convert-my-mortgage-to-buy-to-... | 0.33 | 0.25 | 4177, buy, can, convert, i, let |
| `interest-only-mortgage-repayment-calculator` | https://www.ukpropertyaccountants.co.uk/calculators/interest-only-mortgage-repayment-ca... | 0.33 | 0.17 | calculator, interest, mortgage, only, repayment |
| `is-mortgage-loan-interest-tax-deductible` | https://www.towerstone.co.uk/is-mortgage-loan-interest-tax-deductible | 0.33 | 0.17 | deductible, interest, is, loan, mortgage, tax |
| `let-to-buy-for-new-property-purchase-16456` | https://www.charcol.co.uk/ask-the-mortgage-experts/let-to-buy-for-new-property-purchase... | 0.33 | 0.27 | 16456, buy, for, let, new, property |
| `mortgages-on-uninhabitable-property` | https://www.charcol.co.uk/mortgages/specialist-property-mortgages/mortgages-on-uninhabi... | 0.33 | 0.2 | mortgages, on, property, uninhabitable |
| `tax-implications-of-paying-off-mortgage` | https://www.mytaxaccountant.co.uk/post/tax-implications-of-paying-off-mortgage | 0.2 | 0.33 | implications, mortgage, of, off, paying, tax |
| `buy-to-let-mortgage-rates-surge-what-it-means-for-landlords` | https://www.ukpropertyaccountants.co.uk/buy-to-let-mortgage-rates-surge-what-it-means-f... | 0.31 | 0.29 | buy, for, it, landlords, let, means |
| `buy-to-let-mortgage-tax-relief-changes-for-landlords-explained` | https://buytolettaxaccountants.co.uk/buy-to-let-mortgage-tax-relief-changes-for-landlor... | 0.31 | 0.31 | buy, changes, explained, for, landlords, let |
| `buy-to-let-mortgages-on-inherited-properties-6001` | https://www.charcol.co.uk/ask-the-mortgage-experts/buy-to-let-mortgages-on-inherited-pr... | 0.31 | 0.27 | 6001, buy, inherited, let, mortgages, on |
| `rent-to-buy-and-other-low-deposit-mortgage-schemes-uk` | https://www.charcol.co.uk/guides/rent-to-buy-and-other-low-deposit-mortgage-schemes-uk/ | 0.31 | 0.17 | and, buy, deposit, low, mortgage, other |
| `what-the-uk-interest-rate-cut-means-for-your-mortgage` | https://www.ukpropertyaccountants.co.uk/what-the-uk-interest-rate-cut-means-for-your-mo... | 0.23 | 0.31 | cut, for, interest, means, mortgage, rate |
| `buy-to-let-remortgage-in-19-days` | https://www.thebuytoletbroker.co.uk/case-studies/buy-to-let-remortgage-in-19-days/ | 0.3 | 0.3 | 19, buy, days, in, let, remortgage |
| `mortgages-next-to-commercial-property` | https://www.charcol.co.uk/mortgages/specialist-property-mortgages/mortgages-next-to-com... | 0.3 | 0.3 | commercial, mortgages, next, property, to |
| `navigating-the-world-of-family-buy-to-let-mortgages` | https://www.ukpropertyaccountants.co.uk/navigating-the-world-of-family-buy-to-let-mortg... | 0.25 | 0.3 | buy, family, let, mortgages, navigating, of |
| *(+1 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### IR35 (11 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `ir35-off-payroll-working` | https://www.taxaccountant.co.uk/glossary/ir35-off-payroll-working/ | 0.17 | 0.5 | ir35, off, payroll, working |
| `ir35-what-you-need-to-know` | https://www.rpgcrouchchapman.co.uk/resources/blog/ir35-what-you-need-to-know/ | 0.33 | 0.5 | ir35, know, need, to, what, you |
| `what-does-an-ir35-accountant-do` | https://www.qaccounting.com/what-does-an-ir35-accountant-do/ | 0.5 | 0.22 | accountant, an, do, does, ir35, what |
| `hmrc-ir35-investigation-everything-you-need-to-know` | https://gorillaaccounting.com/blog/hmrc-ir35-investigation-everything-you-need-to-know/ | 0.38 | 0.31 | everything, hmrc, investigation, ir35, know, need |
| `ir35-explained-what-contractors-need-to-know-about-the-rules` | https://gorillaaccounting.com/blog/ir35-explained-what-contractors-need-to-know-about-t... | 0.18 | 0.36 | about, contractors, explained, ir35, know, need |
| `ir35-10-things-you-need-to-know` | https://hwfisher.co.uk/ir35-10-things-you-need-to-know/ | 0.31 | 0.33 | 10, ir35, know, need, things, to |
| `ir35-in-the-private-sector-what-do-you-need-to-know` | https://gorillaaccounting.com/blog/ir35-in-the-private-sector-what-do-you-need-to-know/ | 0.24 | 0.33 | do, in, ir35, know, need, private |
| `ir35-meaning-the-off-payroll-working-rules-explained` | https://gorillaaccounting.com/blog/ir35-meaning-the-off-payroll-working-rules-explained/ | 0.1 | 0.33 | explained, ir35, meaning, off, payroll, rules |
| `ir35-off-payroll-workers` | https://www.shipleystax.com/2019/10/ir35-off-payroll-workers/ | 0.17 | 0.33 | ir35, off, payroll, workers |
| `ir35-countdown-off-payroll-rules` | https://www.qaccounting.com/ir35-countdown-off-payroll-rules/ | 0.14 | 0.3 | countdown, ir35, off, payroll, rules |
| `ir35-letter-from-hmrc` | https://www.qaccounting.com/ir35-letter-from-hmrc/ | 0.3 | 0.12 | from, hmrc, ir35, letter |

### NonResident_Expat (40 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `non-resident-company-landlords` | https://www.landlordstax.co.uk/resources/guide-for-non-resident-landlords/non-resident-... | 0.25 | 0.5 | company, landlords, non, resident |
| `overseas-company-directors-face-new-uk-identity-checks-what-you-need-to-know` | https://www.ukpropertyaccountants.co.uk/overseas-company-directors-face-new-uk-identity... | 0.21 | 0.5 | checks, company, directors, face, identity, know |
| `uk-tax-obligations-for-overseas-landlords-renting-property` | https://www.ukpropertyaccountants.co.uk/uk-tax-obligations-for-overseas-landlords-renti... | 0.5 | 0.4 | for, landlords, obligations, overseas, property, renting |
| `understanding-the-uk-non-resident-landlord-nrl-scheme` | https://www.property-tax-advice.co.uk/knowledge-centre/understanding-the-uk-non-residen... | 0.5 | 0.3 | landlord, non, nrl, resident, scheme, the |
| `understanding-the-uk-non-resident-landlord-scheme-a-guide-for-landlords` | https://www.geraldedelman.com/insights/understanding-the-uk-non-resident-landlord-schem... | 0.5 | 0.38 | a, for, guide, landlord, landlords, non |
| `a-guide-to-tax-on-overseas-property` | https://www.ukpropertyaccountants.co.uk/a-guide-to-tax-on-overseas-property/ | 0.3 | 0.45 | a, guide, on, overseas, property, tax |
| `what-are-the-tax-implications-for-non-resident-uk-landlords` | https://bhp.co.uk/news-events/blog/what-are-the-tax-implications-for-non-resident-uk-la... | 0.31 | 0.45 | are, for, implications, landlords, non, resident |
| `non-resident-uk-company-tax-return` | https://uklandlordtax.co.uk/non-resident-uk-company-tax-return/ | 0.31 | 0.44 | company, non, resident, return, tax, uk |
| `self-assessment-tax-return-for-expats-living-overseas` | https://www.ukpropertyaccountants.co.uk/self-assessment-tax-return-for-expats-living-ov... | 0.4 | 0.44 | assessment, expats, for, living, overseas, return |
| `the-non-resident-landlord-scheme-for-overseas-landlords` | https://rentalbux.com/blogs/the-non-resident-landlord-scheme-for-overseas-landlords | 0.36 | 0.44 | for, landlord, landlords, non, overseas, resident |
| `non-resident-landlord-tax-return` | https://uklandlordtax.co.uk/non-resident-landlord-tax-return/ | 0.43 | 0.38 | landlord, non, resident, return, tax |
| `a-complete-guide-on-non-resident-company-tax-return` | https://www.ukpropertyaccountants.co.uk/a-complete-guide-on-non-resident-company-tax-re... | 0.42 | 0.42 | a, company, complete, guide, non, on |
| `expat-guide-uk-tax-on-rental-income-via-self-assessment` | https://www.ukpropertyaccountants.co.uk/expat-guide-uk-tax-on-rental-income-via-self-as... | 0.42 | 0.23 | assessment, expat, guide, income, on, rental |
| `key-issues-for-a-uk-resident-selling-overseas-property` | https://www.geraldedelman.com/insights/key-issues-for-a-uk-resident-selling-overseas-pr... | 0.42 | 0.25 | a, for, issues, key, overseas, property |
| `tax-rules-for-uk-and-overseas-property-businesses` | https://www.taxaccountant.co.uk/tax-rules-for-uk-and-overseas-property-businesses/ | 0.36 | 0.42 | and, businesses, for, overseas, property, rules |
| `property-tax-guide-for-uk-expats-and-foreigners` | https://www.ukpropertyaccountants.co.uk/property-tax-guide-for-uk-expats-and-foreigners/ | 0.4 | 0.31 | and, expats, for, foreigners, guide, property |
| `the-register-of-overseas-entities-and-the-impact-on-property-transactions` | https://www.geraldedelman.com/insights/the-register-of-overseas-entities-and-the-impact... | 0.35 | 0.4 | and, entities, impact, of, on, overseas |
| `uk-residential-property-tax-summary-for-overseas-investors-2` | https://hwfisher.co.uk/publications/uk-residential-property-tax-summary-for-overseas-in... | 0.4 | 0.27 | 2, for, investors, overseas, property, residential |
| `corporation-tax-guide-for-overseas-traders` | https://www.taxaccountant.co.uk/corporation-tax-guide-for-overseas-traders/ | 0.38 | 0.38 | corporation, for, guide, overseas, tax, traders |
| `non-resident-company-tax-return` | https://www.ukpropertyaccountants.co.uk/services/non-resident-company-tax-return/ | 0.29 | 0.38 | company, non, resident, return, tax |
| `what-are-the-new-reporting-rules-for-overseas-entities-owning-uk-property` | https://www.ukpropertyaccountants.co.uk/what-are-the-new-reporting-rules-for-overseas-e... | 0.2 | 0.38 | are, entities, for, new, overseas, owning |
| `sarah-sydney-living-overseas-selling-uk-property` | https://capitalgainstax.co.uk/sarah-sydney-living-overseas-selling-uk-property | 0.36 | 0.15 | living, overseas, property, sarah, selling, sydney |
| `tax-considerations-for-overseas-investors-in-uk-property` | https://hwfisher.co.uk/tax-considerations-for-overseas-investors-in-uk-property/ | 0.36 | 0.36 | considerations, for, in, investors, overseas, property |
| `the-ultimate-guide-on-non-resident-landlord-tax` | https://www.ukpropertyaccountants.co.uk/the-ultimate-guide-on-non-resident-landlord-tax/ | 0.36 | 0.27 | guide, landlord, non, on, resident, tax |
| `uk-non-resident-companies-rental-income-tax-changes` | https://www.shipleystax.com/2023/09/uk-non-resident-companies-rental-income-tax-changes/ | 0.36 | 0.27 | changes, companies, income, non, rental, resident |
| `a-guide-to-tax-for-non-resident-landlords-tenants-or-those-managing-a-landlords-uk-properties` | https://buytolettaxaccountants.co.uk/a-guide-to-tax-for-non-resident-landlords-tenants-... | 0.26 | 0.33 | a, for, guide, landlords, managing, non |
| `considerations-for-expats-buying-rental-property-in-the-uk` | https://www.charcol.co.uk/blog/considerations-for-expats-buying-rental-property-in-the-uk/ | 0.33 | 0.33 | buying, considerations, expats, for, in, property |
| `hmrc-compliance-with-overseas-entities` | https://www.ukpropertyaccountants.co.uk/hmrc-compliance-with-overseas-entities/ | 0.2 | 0.33 | compliance, entities, hmrc, overseas, with |
| `overseas-entities-owning-uk-property` | https://www.ukpropertyaccountants.co.uk/overseas-entities-owning-uk-property/ | 0.33 | 0.29 | entities, overseas, owning, property, uk |
| `overseas-expat-landlord-insurance` | https://www.alanboswell.com/landlord-insurance/overseas-expat-landlord-insurance/ | 0.33 | 0.2 | expat, insurance, landlord, overseas |
| *(+10 more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |

### FHL (23 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `end-of-furnished-holiday-lettings` | https://www.taxaccountant.co.uk/end-of-furnished-holiday-lettings/ | 0.5 | 0.5 | end, furnished, holiday, lettings, of |
| `furnished-holiday-let` | https://www.taxaccountant.co.uk/tag/furnished-holiday-let/ | 0.5 | 0.29 | furnished, holiday, let |
| `furnished-holiday-lettings` | https://uklandlordtax.co.uk/tax-guide/furnished-holiday-lettings/ | 0.5 | 0.5 | furnished, holiday, lettings |
| `holiday-lets-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/holiday-lets-self-assessment-tax-return | 0.5 | 0.27 | assessment, holiday, lets, return, self, tax |
| `impact-of-fhl-tax-abolition-transition-to-company-structure-key-insights` | https://www.ukpropertyaccountants.co.uk/impact-of-fhl-tax-abolition-transition-to-compa... | 0.47 | 0.47 | abolition, company, fhl, impact, insights, key |
| `abolition-furnished-holiday-lettings-tax` | https://uklandlordtax.co.uk/abolition-furnished-holiday-lettings-tax/ | 0.44 | 0.44 | abolition, furnished, holiday, lettings, tax |
| `abolition-of-furnished-holiday-let-fhl-regime` | https://bhp.co.uk/news-events/blog/abolition-of-furnished-holiday-let-fhl-regime/ | 0.44 | 0.4 | abolition, fhl, furnished, holiday, let, of |
| `abolition-of-furnished-holiday-lets-regime` | https://www.rpgcrouchchapman.co.uk/resources/blog/abolition-of-furnished-holiday-lets-r... | 0.44 | 0.44 | abolition, furnished, holiday, lets, of, regime |
| `009-fhl-tax-changes` | https://www.provestor.co.uk/propertytaxshow/009-fhl-tax-changes | 0.43 | 0.2 | 009, changes, fhl, tax |
| `furnished-holiday-letting` | https://www.landlordstax.co.uk/resources/guide-for-non-resident-landlords/furnished-hol... | 0.43 | 0.43 | furnished, holiday, letting |
| `furnished-holiday-lettings-accountants` | https://uklandlordtax.co.uk/furnished-holiday-lettings-accountants/ | 0.43 | 0.43 | accountants, furnished, holiday, lettings |
| `holiday-let-tax-return-deadline` | https://www.business-accounting.co.uk/blog/holiday-let-tax-return-deadline | 0.43 | 0.22 | deadline, holiday, let, return, tax |
| `furnished-holiday-lets-what-you-need-to-know-about-the-tax-advantages` | https://www.ukpropertyaccountants.co.uk/furnished-holiday-lets-what-you-need-to-know-ab... | 0.29 | 0.4 | about, advantages, furnished, holiday, know, lets |
| `holiday-let-development-finance` | https://www.thebuytoletbroker.co.uk/case-studies/holiday-let-development-finance/ | 0.4 | 0.17 | development, finance, holiday, let |
| `tax-shake-up-for-furnished-holiday-let-owners` | https://www.ukpropertyaccountants.co.uk/tax-shake-up-for-furnished-holiday-let-owners/ | 0.4 | 0.33 | for, furnished, holiday, let, owners, shake |
| `furnished-holiday-lettings-regime-abolished` | https://fhpaccounting.co.uk/furnished-holiday-lettings-regime-abolished/ | 0.38 | 0.38 | abolished, furnished, holiday, lettings, regime |
| `furnished-holiday-lets-here-is-what-you-need-to-know` | https://hwfisher.co.uk/furnished-holiday-lets-here-is-what-you-need-to-know/ | 0.29 | 0.36 | furnished, here, holiday, is, know, lets |
| `best-accounting-software-holiday-lets` | https://www.business-accounting.co.uk/blog/best-accounting-software-holiday-lets | 0.33 | 0.11 | accounting, best, holiday, lets, software |
| `uk-governments-new-tax-rules-for-furnished-holiday-lets-fhl` | https://www.ukpropertyaccountants.co.uk/uk-governments-new-tax-rules-for-furnished-holi... | 0.33 | 0.29 | fhl, for, furnished, governments, holiday, lets |
| `what-you-need-to-know-when-running-a-furnished-holiday-let` | https://hwfisher.co.uk/what-you-need-to-know-when-running-a-furnished-holiday-let/ | 0.28 | 0.33 | a, furnished, holiday, know, let, need |
| `how-do-i-pay-tax-on-airbnb-or-holiday-lets` | https://www.towerstone.co.uk/how-do-i-pay-tax-on-airbnb-or-holiday-lets | 0.31 | 0.31 | airbnb, do, holiday, how, i, lets |
| `att-responds-abolition-furnished-holiday-lettings-regime` | https://ciot-att.lndo.site/technical/submissions/att-responds-abolition-furnished-holid... | 0.3 | 0.3 | abolition, att, furnished, holiday, lettings, regime |
| `guide-to-renting-out-a-holiday-let` | https://www.alanboswell.com/resources/guide-to-renting-out-a-holiday-let/ | 0.3 | 0.3 | a, guide, holiday, let, out, renting |

### CapitalAllowances (25 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `agencies-capital-allowances` | https://www.business-accounting.co.uk/blog/agencies-capital-allowances | 0.5 | 0.17 | agencies, allowances, capital |
| `capital-allowances-on-preparatory-costs` | https://www.taxaccountant.co.uk/capital-allowances-on-preparatory-costs/ | 0.5 | 0.12 | allowances, capital, costs, on, preparatory |
| `capital-allowances-reformed` | https://www.taxaccountant.co.uk/capital-allowances-reformed/ | 0.5 | 0.17 | allowances, capital, reformed |
| `complete-guide-on-capital-allowances-for-property-business` | https://www.ukpropertyaccountants.co.uk/complete-guide-on-capital-allowances-for-proper... | 0.5 | 0.25 | allowances, business, capital, complete, for, guide |
| `contractors-capital-allowances` | https://www.business-accounting.co.uk/blog/contractors-capital-allowances | 0.5 | 0.17 | allowances, capital, contractors |
| `freelancers-capital-allowances` | https://www.business-accounting.co.uk/blog/freelancers-capital-allowances | 0.5 | 0.17 | allowances, capital, freelancers |
| `capital-allowance-tax-calculator-uk` | https://www.ukpropertyaccountants.co.uk/calculators/capital-allowance-tax-calculator-uk/ | 0.43 | 0.25 | allowance, calculator, capital, tax, uk |
| `capital-allowances-on-dental-practice-purchase` | https://www.djh.co.uk/latest-news/specialisms/dental/capital-allowances-on-dental-pract... | 0.43 | 0.11 | allowances, capital, dental, on, practice, purchase |
| `a-step-by-step-guide-to-claiming-capital-allowances-on-property` | https://www.ukpropertyaccountants.co.uk/a-step-by-step-guide-to-claiming-capital-allowa... | 0.4 | 0.27 | a, allowances, by, capital, claiming, guide |
| `ai-companies-capital-allowances` | https://www.business-accounting.co.uk/blog/ai-companies-capital-allowances | 0.4 | 0.2 | ai, allowances, capital, companies |
| `capital-allowances-consultation-announced` | https://bhp.co.uk/news-events/blog/capital-allowances-consultation-announced/ | 0.4 | 0.14 | allowances, announced, capital, consultation |
| `capital-allowances-healthcare-equipment` | https://www.business-accounting.co.uk/blog/capital-allowances-healthcare-equipment | 0.4 | 0.14 | allowances, capital, equipment, healthcare |
| `capital-allowances-whats-changed` | https://www.djh.co.uk/latest-news/industry-news/capital-allowances-whats-changed/ | 0.4 | 0.14 | allowances, capital, changed, whats |
| `content-creators-capital-allowances` | https://www.business-accounting.co.uk/blog/content-creators-capital-allowances | 0.4 | 0.14 | allowances, capital, content, creators |
| `locum-doctors-capital-allowances` | https://www.business-accounting.co.uk/blog/locum-doctors-capital-allowances | 0.4 | 0.14 | allowances, capital, doctors, locum |
| `shopify-stores-capital-allowances` | https://www.business-accounting.co.uk/blog/shopify-stores-capital-allowances | 0.4 | 0.14 | allowances, capital, shopify, stores |
| `tech-companies-capital-allowances` | https://www.business-accounting.co.uk/blog/tech-companies-capital-allowances | 0.4 | 0.2 | allowances, capital, companies, tech |
| `commercial-property-standard-enquiries-on-capital-allowance` | https://www.ukpropertyaccountants.co.uk/commercial-property-standard-enquiries-on-capit... | 0.38 | 0.15 | allowance, capital, commercial, enquiries, on, property |
| `capital-allowance-team` | https://www.djh.co.uk/team-category/capital-allowance-team/ | 0.33 | 0.14 | allowance, capital, team |
| `capital-allowances-a-guide-for-authors` | https://hwfisher.co.uk/capital-allowances-a-guide-for-authors/ | 0.3 | 0.33 | a, allowances, authors, capital, for, guide |
| `capital-allowances-exploring-new-incentives` | https://hwfisher.co.uk/capital-allowances-exploring-new-incentives/ | 0.33 | 0.17 | allowances, capital, exploring, incentives, new |
| `capital-allowances-on-preparatory-costs-offshore-projects-ruling` | https://www.taxaccountant.co.uk/capital-allowances-on-preparatory-costs-offshore-projec... | 0.33 | 0.09 | allowances, capital, costs, offshore, on, preparatory |
| `potential-reforms-capital-allowances-regime` | https://ciot-att.lndo.site/technical/submissions/potential-reforms-capital-allowances-r... | 0.33 | 0.14 | allowances, capital, potential, reforms, regime |
| `types-of-capital-allowance-for-property-investors` | https://www.ukpropertyaccountants.co.uk/types-of-capital-allowance-for-property-investors/ | 0.33 | 0.25 | allowance, capital, for, investors, of, property |
| `dont-miss-out-expert-tips-on-identifying-capital-allowances` | https://www.djh.co.uk/latest-news/news-insights/dont-miss-out-expert-tips-on-identifyin... | 0.3 | 0.08 | allowances, capital, dont, expert, identifying, miss |

### RRA_2025 (11 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `renters-rights-bill-whats-its-status-how-will-it-impact-landlords-tenants` | https://www.ukpropertyaccountants.co.uk/renters-rights-bill-whats-its-status-how-will-i... | 0.19 | 0.43 | bill, how, impact, it, its, landlords |
| `government-releases-new-guidance-on-eviction-process-under-the-renters-rights-act` | https://www.ukpropertyaccountants.co.uk/government-releases-new-guidance-on-eviction-pr... | 0.19 | 0.4 | act, eviction, government, guidance, new, on |
| `renters-rights-act-what-landlords-should-prioritise` | https://www.ukpropertyaccountants.co.uk/renters-rights-act-what-landlords-should-priori... | 0.4 | 0.25 | act, landlords, prioritise, renters, rights, should |
| `are-landlords-prepared-for-the-renters-rights-act` | https://www.ukpropertyaccountants.co.uk/are-landlords-prepared-for-the-renters-rights-act/ | 0.36 | 0.33 | act, are, for, landlords, prepared, renters |
| `how-will-the-renters-rights-act-affect-landlords` | https://www.boltburdon.co.uk/tag/how-will-the-renters-rights-act-affect-landlords/ | 0.36 | 0.31 | act, affect, how, landlords, renters, rights |
| `the-renters-rights-bill-a-new-era-for-tenants-and-landlords` | https://www.ukpropertyaccountants.co.uk/the-renters-rights-bill-a-new-era-for-tenants-a... | 0.2 | 0.36 | a, and, bill, era, for, landlords |
| `existing-tenancies-renters-rights-act` | https://www.nrla.org.uk/resources/renters-rights/existing-tenancies-renters-rights-act | 0.33 | 0.3 | act, existing, renters, rights, tenancies |
| `how-to-sell-a-tenanted-property-under-the-renters-rights-act` | https://rentalbux.com/blogs/how-to-sell-a-tenanted-property-under-the-renters-rights-act | 0.31 | 0.33 | a, act, how, property, renters, rights |
| `how-will-the-renters-rights-act-impact-professional-landlords` | https://www.ukpropertyaccountants.co.uk/how-will-the-renters-rights-act-impact-professi... | 0.33 | 0.31 | act, how, impact, landlords, professional, renters |
| `landlord-amnesty-change-tenancy-deposits` | https://www.boltburdon.co.uk/blogs/landlord-amnesty-change-tenancy-deposits/ | 0.33 | 0.33 | amnesty, change, deposits, landlord, tenancy |
| `most-landlords-are-unprepared-for-the-renters-rights-act-are-you` | https://www.ukpropertyaccountants.co.uk/most-landlords-are-unprepared-for-the-renters-r... | 0.31 | 0.29 | act, are, for, landlords, most, renters |

### SelfAssessment (29 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `ai-companies-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/ai-companies-self-assessment-tax-return | 0.5 | 0.27 | ai, assessment, companies, return, self, tax |
| `cleaning-company-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/cleaning-company-self-assessment-tax-return | 0.5 | 0.27 | assessment, cleaning, company, return, self, tax |
| `courier-companies-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/courier-companies-self-assessment-tax-return | 0.5 | 0.27 | assessment, companies, courier, return, self, tax |
| `estate-agents-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/estate-agents-self-assessment-tax-return | 0.5 | 0.27 | agents, assessment, estate, return, self, tax |
| `letting-agents-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/letting-agents-self-assessment-tax-return | 0.5 | 0.27 | agents, assessment, letting, return, self, tax |
| `non-profits-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/non-profits-self-assessment-tax-return | 0.5 | 0.27 | assessment, non, profits, return, self, tax |
| `property-management-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/property-management-self-assessment-tax-return | 0.5 | 0.27 | assessment, management, property, return, self, tax |
| `removal-companies-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/removal-companies-self-assessment-tax-return | 0.5 | 0.27 | assessment, companies, removal, return, self, tax |
| `saas-companies-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/saas-companies-self-assessment-tax-return | 0.5 | 0.27 | assessment, companies, return, saas, self, tax |
| `self-assessment-tax-returns-and-rental-income` | https://www.provestor.co.uk/help/property-taxes/self-assessment-tax-returns-and-rental-... | 0.5 | 0.5 | and, assessment, income, rental, returns, self |
| `shipping-company-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/shipping-company-self-assessment-tax-return | 0.5 | 0.27 | assessment, company, return, self, shipping, tax |
| `tech-companies-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/tech-companies-self-assessment-tax-return | 0.5 | 0.27 | assessment, companies, return, self, tax, tech |
| `self-assessment-income-tax-returns` | https://www.taxaccountant.co.uk/self-assessment-income-tax-returns/ | 0.44 | 0.44 | assessment, income, returns, self, tax |
| `vehicle-leasing-companies-self-assessment-tax-return` | https://www.business-accounting.co.uk/blog/vehicle-leasing-companies-self-assessment-ta... | 0.44 | 0.25 | assessment, companies, leasing, return, self, tax |
| `income-tax-self-assessment` | https://www.elsbyandco.co.uk/services/business-hub/cloud-accounting/making-tax-digital/... | 0.43 | 0.33 | assessment, income, self, tax |
| `landlord-self-assessment` | https://buytolettaxaccountants.co.uk/service/landlord-self-assessment/ | 0.43 | 0.33 | assessment, landlord, self |
| `introduction-to-self-assessment-tax-returns` | https://www.provestor.co.uk/help/property-taxes/introduction-to-self-assessment-tax-ret... | 0.4 | 0.4 | assessment, introduction, returns, self, tax, to |
| `self-assessment-tax-payments-and-payments-on-account` | https://www.provestor.co.uk/help/property-taxes/self-assessment-tax-payments-and-paymen... | 0.36 | 0.36 | account, and, assessment, on, payments, self |
| `self-assessment-tax-returns-for-company-directors` | https://www.qaccounting.com/self-assessment-tax-returns-for-company-directors/ | 0.36 | 0.36 | assessment, company, directors, for, returns, self |
| `understanding-self-assessment-tax-faqs-for-landlords-in-the-uk` | https://www.ukpropertyaccountants.co.uk/understanding-self-assessment-tax-faqs-for-land... | 0.31 | 0.36 | assessment, faqs, for, in, landlords, self |
| `what-is-included-on-a-self-assessment-tax-return` | https://www.provestor.co.uk/help/property-taxes/what-is-included-on-a-self-assessment-t... | 0.36 | 0.25 | a, assessment, included, is, on, return |
| `a-complete-guide-on-self-assessment-tax-return-for-holding-the-uk-property` | https://www.ukpropertyaccountants.co.uk/a-complete-guide-on-self-assessment-tax-return-... | 0.33 | 0.33 | a, assessment, complete, for, guide, holding |
| `hmrc-tax-return-deadline-who-must-file-for-self-assessment` | https://www.ukpropertyaccountants.co.uk/hmrc-tax-return-deadline-who-must-file-for-self... | 0.33 | 0.25 | assessment, deadline, file, for, hmrc, must |
| `income-tax-self-assessment-registration-self-employed-and-landlords` | https://ciot-att.lndo.site/technical/submissions/income-tax-self-assessment-registratio... | 0.33 | 0.33 | and, assessment, employed, income, landlords, registration |
| `pay-hmrc-self-assessment-tax.htm` | https://www.alexander-ene.co.uk/pay-hmrc-self-assessment-tax.htm | 0.33 | 0.27 | assessment, hmrc, htm, pay, self, tax |
| `self-assessment-tax-for-multiple-income-sources` | https://www.mytaxaccountant.co.uk/post/self-assessment-tax-for-multiple-income-sources | 0.3 | 0.33 | assessment, for, income, multiple, self, sources |
| `what-is-a-corporation-tax-self-assessment` | https://taxfix.com/en-uk/limited-companies/what-is-a-corporation-tax-self-assessment/ | 0.33 | 0.3 | a, assessment, corporation, is, self, tax |
| `can-my-accountant-file-my-self-assessment-and-company-tax-return-together` | https://www.towerstone.co.uk/can-my-accountant-file-my-self-assessment-and-company-tax-... | 0.31 | 0.27 | accountant, and, assessment, can, company, file |
| `over-40000-file-self-assessment-tax-returns-during-holiday` | https://www.ukpropertyaccountants.co.uk/over-40000-file-self-assessment-tax-returns-dur... | 0.31 | 0.31 | 40000, assessment, during, file, holiday, over |

### PropertyDev_Trading (14 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `top-15-tax-planning-strategies-for-uk-property-developers` | https://www.ukpropertyaccountants.co.uk/top-15-tax-planning-strategies-for-uk-property-... | 0.45 | 0.45 | 15, developers, for, planning, property, strategies |
| `a-complete-guide-on-residential-property-developer-tax` | https://www.ukpropertyaccountants.co.uk/a-complete-guide-on-residential-property-develo... | 0.44 | 0.42 | a, complete, developer, guide, on, property |
| `best-accounting-software-property-developers` | https://www.business-accounting.co.uk/blog/best-accounting-software-property-developers | 0.43 | 0.33 | accounting, best, developers, property, software |
| `property-developers-reduce-corporation-tax` | https://www.business-accounting.co.uk/blog/property-developers-reduce-corporation-tax | 0.43 | 0.33 | corporation, developers, property, reduce, tax |
| `accountant-cost-property-developers` | https://www.business-accounting.co.uk/blog/accountant-cost-property-developers | 0.4 | 0.4 | accountant, cost, developers, property |
| `details-on-the-proposed-residential-property-developer-tax-announced` | https://bhp.co.uk/news-events/blog/details-on-the-proposed-residential-property-develop... | 0.4 | 0.17 | announced, details, developer, on, property, proposed |
| `property-accountants-for-developers` | https://fhpaccounting.co.uk/property-accountants-for-developers/ | 0.29 | 0.4 | accountants, developers, for, property |
| `property-developer-choose-right-accountant` | https://www.business-accounting.co.uk/blog/property-developer-choose-right-accountant | 0.38 | 0.2 | accountant, choose, developer, property, right |
| `tax-differences-property-investor-and-property-developer` | https://www.ukpropertyaccountants.co.uk/tax-differences-property-investor-and-property-... | 0.38 | 0.3 | and, developer, differences, investor, property, tax |
| `what-developers-need-to-know-about-the-residential-property-developer-tax` | https://www.ukpropertyaccountants.co.uk/what-developers-need-to-know-about-the-resident... | 0.33 | 0.36 | about, developer, developers, know, need, property |
| `how-property-developers-sell-business` | https://www.business-accounting.co.uk/blog/how-property-developers-sell-business | 0.25 | 0.33 | business, developers, how, property, sell |
| `property-conversion-developer` | https://www.ukpropertyaccountants.co.uk/sectors/property-conversion-developer/ | 0.33 | 0.25 | conversion, developer, property |
| `the-new-residential-property-development-tax-heres-what-you-need-to-know` | https://www.boltburdon.co.uk/blogs/the-new-residential-property-development-tax-heres-w... | 0.29 | 0.33 | development, heres, know, need, new, property |
| `how-to-stay-compliant-with-hmrc-as-a-property-developer-uk` | https://www.ukpropertyaccountants.co.uk/how-to-stay-compliant-with-hmrc-as-a-property-d... | 0.31 | 0.2 | a, as, compliant, developer, hmrc, how |

### ATED (10 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `what-landlords-need-to-know-about-annual-tax-on-enveloped-dwellings-ated` | https://www.provestor.co.uk/blog/what-landlords-need-to-know-about-annual-tax-on-envelo... | 0.33 | 0.5 | about, annual, ated, dwellings, enveloped, know |
| `reminder-annual-tax-on-enveloped-dwellings-calculate-the-value-of-your-property` | https://hwfisher.co.uk/reminder-annual-tax-on-enveloped-dwellings-calculate-the-value-o... | 0.33 | 0.42 | annual, calculate, dwellings, enveloped, of, on |
| `ated-tax-range-calculator` | https://www.ukpropertyaccountants.co.uk/calculators/ated-tax-range-calculator/ | 0.4 | 0.25 | ated, calculator, range, tax |
| `corporation-tax-rates-and-associated-companies-faqs` | https://ciot-att.lndo.site/corporation-tax-rates-and-associated-companies-faqs | 0.4 | 0.33 | and, associated, companies, corporation, faqs, rates |
| `associated-companies-rules-for-corporation-tax` | https://www.geraldedelman.com/insights/associated-companies-rules-for-corporation-tax/ | 0.38 | 0.38 | associated, companies, corporation, for, rules, tax |
| `how-is-inheritance-tax-calculated-in-the-uk` | https://www.towerstone.co.uk/how-is-inheritance-tax-calculated-in-the-uk | 0.33 | 0.36 | calculated, how, in, inheritance, is, tax |
| `ated-property-revaluation` | https://www.rpgcrouchchapman.co.uk/resources/blog/ated-property-revaluation/ | 0.33 | 0.25 | ated, property, revaluation |
| `ated-return-accountant` | https://fhpaccounting.co.uk/ated-return-accountant/ | 0.33 | 0.25 | accountant, ated, return |
| `how-much-is-the-ated-tax` | https://www.property-tax-advice.co.uk/knowledge-centre/how-much-is-the-ated-tax/ | 0.3 | 0.27 | ated, how, is, much, tax, the |
| `tax-relief-for-work-related-expenses` | https://www.taxaccountant.co.uk/tax-relief-for-work-related-expenses/ | 0.3 | 0.3 | expenses, for, related, relief, tax, work |

### Trusts_Estates (3 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `form-17-and-deed-of-trust-uk-property-ownership-tax-planning-guide` | https://www.ukpropertyaccountants.co.uk/form-17-and-deed-of-trust-uk-property-ownership... | 0.38 | 0.2 | 17, and, deed, form, guide, of |
| `using-a-trust-for-tax-planning` | https://www.shipleystax.com/2023/03/using-a-trust-for-tax-planning/ | 0.3 | 0.3 | a, for, planning, tax, trust, using |
| `why-global-investors-can-still-trust-uk-property` | https://www.ukpropertyaccountants.co.uk/why-global-investors-can-still-trust-uk-property/ | 0.3 | 0.21 | can, global, investors, property, still, trust |

### Lease_Freehold (4 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `a-case-study-tax-implications-on-the-lease-extensions-in-the-uk` | https://www.ukpropertyaccountants.co.uk/a-case-study-tax-implications-on-the-lease-exte... | 0.36 | 0.36 | a, case, extensions, implications, in, lease |
| `freehold-and-leasehold` | https://www.charcol.co.uk/guides/freehold-and-leasehold/ | 0.33 | 0.33 | and, freehold, leasehold |
| `lease-extensions-property-management` | https://www.boltburdon.co.uk/service/lease-extensions-property-management/ | 0.33 | 0.2 | extensions, lease, management, property |
| `buying-the-freehold-what-do-i-need-to-know` | https://www.charcol.co.uk/blog/buying-the-freehold-what-do-i-need-to-know/ | 0.27 | 0.31 | buying, do, freehold, i, know, need |

### AccountantByCity (10 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `tax-accountant-bristol` | https://www.business-accounting.co.uk/blog/tax-accountant-bristol | 0.5 | 0.17 | accountant, bristol, tax |
| `tax-accountant-glasgow` | https://www.business-accounting.co.uk/blog/tax-accountant-glasgow | 0.5 | 0.17 | accountant, glasgow, tax |
| `tax-accountant-leeds` | https://www.business-accounting.co.uk/blog/tax-accountant-leeds | 0.5 | 0.17 | accountant, leeds, tax |
| `tax-accountant-london` | https://www.business-accounting.co.uk/blog/tax-accountant-london | 0.5 | 0.17 | accountant, london, tax |
| `tax-accountant-manchester` | https://www.business-accounting.co.uk/blog/tax-accountant-manchester | 0.5 | 0.17 | accountant, manchester, tax |
| `why-do-i-need-a-specialist-property-accountant` | https://www.qaccounting.com/why-do-i-need-a-specialist-property-accountant/ | 0.45 | 0.23 | a, accountant, do, i, need, property |
| `why-landlords-need-an-expert-property-accountant-to-navigate-new-epc-regulations` | https://gorillaaccounting.com/blog/why-landlords-need-an-expert-property-accountant-to-... | 0.38 | 0.18 | accountant, an, epc, expert, landlords, navigate |
| `your-next-buy-to-let-working-with-a-property-accountant` | https://gorillaaccounting.com/blog/your-next-buy-to-let-working-with-a-property-account... | 0.33 | 0.23 | a, accountant, buy, let, next, property |
| `buy-to-let-property-accountants-inflation-rates-your-next-investment` | https://gorillaaccounting.com/blog/buy-to-let-property-accountants-inflation-rates-your... | 0.31 | 0.23 | accountants, buy, inflation, investment, let, next |
| `how-can-a-property-accountant-help-reduce-my-overall-tax-bill` | https://www.towerstone.co.uk/how-can-a-property-accountant-help-reduce-my-overall-tax-bill | 0.31 | 0.19 | a, accountant, bill, can, help, how |

### LBTT_Scottish (3 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `second-property-tax-in-scotland-what-you-need-to-know` | https://www.ukpropertyaccountants.co.uk/second-property-tax-in-scotland-what-you-need-t... | 0.33 | 0.38 | in, know, need, property, scotland, second |
| `land-building-transaction-tax-lbtt-calculator` | https://www.ukpropertyaccountants.co.uk/calculators/land-building-transaction-tax-lbtt-... | 0.33 | 0.33 | building, calculator, land, lbtt, tax, transaction |
| `sub-sale-development-relief-in-lbtt-a-practical-guide-for-property-transactions` | https://www.ukpropertyaccountants.co.uk/sub-sale-development-relief-in-lbtt-a-practical... | 0.27 | 0.31 | a, development, for, guide, in, lbtt |

### S24_MortgageInterest (12 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `changing-mortgage-interest-tax-relief` | https://www.taxaccountant.co.uk/changing-mortgage-interest-tax-relief/ | 0.5 | 0.22 | changing, interest, mortgage, relief, tax |
| `section-24-and-mortgage-interest` | https://fhpaccounting.co.uk/section-24-and-mortgage-interest/ | 0.5 | 0.18 | 24, and, interest, mortgage, section |
| `tax-relief-on-mortgage-interest` | https://www.mytaxaccountant.co.uk/post/tax-relief-on-mortgage-interest | 0.5 | 0.25 | interest, mortgage, on, relief, tax |
| `restriction-of-tax-relief-on-mortgage-interest-section-24` | https://uklandlordtax.co.uk/tax-guide/restriction-of-tax-relief-on-mortgage-interest-se... | 0.45 | 0.18 | 24, interest, mortgage, of, on, relief |
| `mortgage-interest-tax-relief-for-landlords` | https://www.mytaxaccountant.co.uk/post/mortgage-interest-tax-relief-for-landlords | 0.44 | 0.33 | for, interest, landlords, mortgage, relief, tax |
| `tax-relief-on-mortgage-interest-explained` | https://taxfix.com/en-uk/landlord-tax-returns/tax-relief-on-mortgage-interest-explained/ | 0.44 | 0.22 | explained, interest, mortgage, on, relief, tax |
| `landlords-and-mortgage-interest` | https://www.djh.co.uk/latest-news/news-insights/landlords-and-mortgage-interest/ | 0.43 | 0.22 | and, interest, landlords, mortgage |
| `mortgage-interest-restriction` | https://taxfix.com/en-uk/glossary/mortgage-interest-restriction/ | 0.43 | 0.1 | interest, mortgage, restriction |
| `mortgage-interest-tax-deduction` | https://www.mytaxaccountant.co.uk/post/mortgage-interest-tax-deduction | 0.38 | 0.14 | deduction, interest, mortgage, tax |
| `mortgage-interest-tax-relief-implications-of-the-change` | https://www.ukpropertyaccountants.co.uk/mortgage-interest-tax-relief-implications-of-th... | 0.36 | 0.27 | change, implications, interest, mortgage, of, relief |
| `landlord-mortgage-interest-tax-calculations` | https://taxfix.com/en-uk/landlord-tax-returns/landlord-mortgage-interest-tax-calculations/ | 0.33 | 0.17 | calculations, interest, landlord, mortgage, tax |
| `how-do-mortgage-interest-rules-affect-landlords` | https://www.towerstone.co.uk/how-do-mortgage-interest-rules-affect-landlords | 0.3 | 0.18 | affect, do, how, interest, landlords, mortgage |

### Partnership_LLP (6 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `transfer-property-partnership-into-company` | https://www.ukpropertyaccountants.co.uk/services/transfer-property-partnership-into-com... | 0.44 | 0.22 | company, into, partnership, property, transfer |
| `file-llp-accounts-tax-return` | https://www.ukpropertyaccountants.co.uk/services/file-llp-accounts-tax-return/ | 0.4 | 0.4 | accounts, file, llp, return, tax |
| `partnership-income-tax` | https://www.taxaccountant.co.uk/personal-tax-services/partnership-income-tax/ | 0.4 | 0.29 | income, partnership, tax |
| `transferring-property-from-partnership-to-company` | https://www.ukpropertyaccountants.co.uk/transferring-property-from-partnership-to-company/ | 0.33 | 0.25 | company, from, partnership, property, to, transferring |
| `taxation-of-property-partnerships-and-joint-ownership` | https://www.taxinsider.co.uk/tax-reports/taxation-of-property-partnerships-and-joint-ow... | 0.31 | 0.3 | and, joint, of, ownership, partnerships, property |
| `tax-advantages-of-using-a-property-llp` | https://www.shipleystax.com/2021/01/tax-advantages-of-using-a-property-llp/ | 0.3 | 0.23 | a, advantages, llp, of, property, tax |

### CompaniesHouse_ECCTA (3 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `companies-house-cracks-down-on-shell-companies-what-property-investors-need-to-know` | https://www.property-tax-advice.co.uk/knowledge-centre/companies-house-cracks-down-on-s... | 0.18 | 0.33 | companies, cracks, down, house, investors, know |
| `when-do-i-need-to-file-company-accounts-with-companies-house` | https://www.towerstone.co.uk/when-do-i-need-to-file-company-accounts-with-companies-house | 0.31 | 0.24 | accounts, companies, company, do, file, house |
| `what-is-a-dormant-company-on-companies-house` | https://www.towerstone.co.uk/what-is-a-dormant-company-on-companies-house | 0.23 | 0.3 | a, companies, company, dormant, house, is |

### Penalties_HMRC (4 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `corporation-tax-compliance-avoiding-penalties` | https://www.taxaccountant.co.uk/corporation-tax-compliance-avoiding-penalties/ | 0.43 | 0.43 | avoiding, compliance, corporation, penalties, tax |
| `corporation-tax-guidelines-to-avoid-penalties` | https://www.taxaccountant.co.uk/corporation-tax-guidelines-to-avoid-penalties/ | 0.38 | 0.38 | avoid, corporation, guidelines, penalties, tax, to |
| `penalties-for-late-corporation-tax-payment` | https://www.towerstone.co.uk/penalties-for-late-corporation-tax-payment | 0.38 | 0.38 | corporation, for, late, payment, penalties, tax |
| `the-real-cost-of-late-tax-returns-more-than-just-hmrc-penalties` | https://gorillaaccounting.com/blog/the-real-cost-of-late-tax-returns-more-than-just-hmr... | 0.36 | 0.14 | cost, hmrc, just, late, more, of |

### LTT_Welsh (2 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `capital-gains-tax-on-buy-to-let-property-wales` | https://www.ukpropertyaccountants.co.uk/capital-gains-tax-on-buy-to-let-property-wales/ | 0.4 | 0.25 | buy, capital, gains, let, on, property |
| `welsh-rates-of-income-tax` | https://taxfix.com/en-uk/glossary/welsh-rates-of-income-tax/ | 0.33 | 0.27 | income, of, rates, tax, welsh |

### HMO (2 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `short-term-lets-and-hmos-accounting` | https://fhpaccounting.co.uk/short-term-lets-and-hmos-accounting/ | 0.17 | 0.38 | accounting, and, hmos, lets, short, term |
| `hmo-rental-income-accounts-and-tax-return-for-landlords` | https://www.ukpropertyaccountants.co.uk/hmo-rental-income-accounts-and-tax-return-for-l... | 0.33 | 0.36 | accounts, and, for, hmo, income, landlords |

### RentARoom (3 candidates)

| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |
|---|---|---:|---:|---|
| `rent-a-room-relief` | https://bhp.co.uk/news-events/blog/rent-a-room-relief/ | 0.5 | 0.25 | a, relief, rent, room |
| `rent-a-room-relief-in-the-uk-a-comprehensive-overview` | https://www.ukpropertyaccountants.co.uk/rent-a-room-relief-in-the-uk-a-comprehensive-ov... | 0.42 | 0.38 | a, comprehensive, in, overview, relief, rent |
| `government-rent-a-room-scheme` | https://taxfix.com/en-uk/landlord-tax-returns/government-rent-a-room-scheme/ | 0.3 | 0.18 | a, government, rent, room, scheme |
