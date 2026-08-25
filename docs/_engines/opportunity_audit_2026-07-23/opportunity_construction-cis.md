# construction-cis opportunity analysis (2026-07-23)

Data: GSC to 2026-07-20 (aggregated 2026-06-20 onward), Bing snapshot fresh 2026-07-23 (637 rows), blog_topics pool (299 clusters seeded 2026-07-14, ~unused shown), cross-site GSC (property/generalist), inventory 65 posts + 45 /for/ trade pages + 8 calculators + 4 research pages.

## A. High-impression uncaptured queries (site's own data)

1. **Roofers cluster is the biggest single signal.** "accountant for roofers" 126 imp pos 17.4, "roofers accountant" 124 imp pos 20.4, "accountants for roofers" 111 imp pos 15.1. Total 360+ imp, zero clicks, page 2. /for/roofers already exists → this is DEEPEN, not new: expand /for/roofers to full A* depth (roofer-specific expenses, scaffold hire vs materials in CIS split, working-at-height kit, weather downtime cash flow) plus one supporting blog post "Roofer tax guide 2026/27" interlinked to it. Same play smaller for joiners ("accounting for joiners" 24 imp pos 51.8) and bricklayers (8 imp pos 16.4 + "tax laws for bricklayers small businesses").
2. **CIS penalty appeals.** Bing shows a dense long-tail: "appeal cis penalty" 16 imp pos 8.5, "cis appeal a penalty", "appeal cis late filing penalty", "can i appeal a penalty for submitting a cis nil return late", "hmrc online appeal cis", "cis fixed penalty", "resubmit a cis return after error, will I get a penalty". cis-penalties-and-appeals exists but the long-tail is procedural appeal + amendment questions. NEW post: "How to appeal a CIS penalty online: step-by-step (incl. nil return and amended return cases)". Cannibalisation risk vs cis-penalties-and-appeals → position as procedural how-to child, interlink, distinct title angle "appeal ... online step by step".
3. **CIS return dates/periods.** Bing top query "cis returns period dates" 84 imp pos 5, "cis return dates 2026-27" 13 imp 6 CLICKS, "cis deadline dates". cis-deadline-calendar-2026-27 is capturing; deepen it (add tax-month period table 6th-5th, payment references) rather than new. Do NOT write a new "CIS return dates" post (would cannibalise).
4. **QuickBooks CIS variants.** "what is cis in qbo" 11 imp pos 10.6 (GSC) + Bing "what is cis in quickbooks"/"quickbooks cis"/"vat categories quickbooks cis" (4 clicks). quickbooks-cis-guide exists → deepen with a "CIS VAT codes in QuickBooks" section + FAQ targeting qbo/quick books variants. No new post.
5. **Local intent** (cis accountant bristol/cannock/cornwall/norfolk/leeds/stoke/peterborough, "near me", "west midlands"): recurring but positions 40-90 and thin per-town volume. Recommend ONE "CIS accountant near me: what to look for + remote vs local" post, not town pages (no physical presence, credential-risk rules).
6. **CIS + retention.** Bing "cis payment applications is retention deducted before tax?" 24 imp pos 2 → already winning via cis-retention-payments-guide; deepen with payment-application worked example.

## B. Brand-breadth gaps (beyond CIS)

7. **Vans, tools and capital allowances for trades (FA 2026).** Nothing in the 65 posts covers capital allowances. NEW pillar: "Vans, tools and equipment: capital allowances for construction trades 2026/27" with FA 2026 facts (WDA 18%→14% s.28, new 40% FYA s.29, special rate 6%, AIA £1m) + AMAP 55p first 10k miles for sole-trader mileage vs actual-cost van. Supporting GSC evidence: "drainage capital allowances" 11 imp pos 12.2 (near page 1 with zero content!). Second NEW post: "Mileage vs van costs for CIS subcontractors: 55p AMAP from April 2026".
8. **Reverse charge VAT edge cases.** 3 DRC posts exist, but Bing long-tail shows unanswered chain scenarios: "chain of reverse vat when subcontractor works for someone who also is a subcontractor", "does drc apply to a builder with £1m turnover", "can a subcontractor charge vat if outside CIS", "if a subcontractor charges vat on drc what amount does the 20% cis come off". Pool also has "cis reverse charge vat return example" + "sage reverse charge vat construction tax code". NEW: "Domestic reverse charge VAT: worked examples and edge cases (chains, end users, CIS interaction, VAT return boxes)". Cannibalisation guard: frame as worked-examples companion to vat-reverse-charge-construction, link all three existing posts to it.
9. **CIS umbrella / payroll models.** Pool: "cis umbrella payroll", "cis payroll contracts", brand queries (Hudson, EEBS, Indigo, Riddingtons). NEW: "CIS umbrella vs agency PAYE vs sole trader: how construction payroll models compare" (also serves labour-agency audience; interlink cis-for-labour-agencies + cis-vs-paye, distinct angle = payroll model chooser).
10. **Construction accounting software (cross-site piggyback).** Generalist/property GSC shows 1,400+ imp across "construction accounting software" variants at pos 24-35 with zero clicks estate-wide. best-cis-accounting-software exists but targets CIS software. NEW: "Construction accounting software (beyond CIS): job costing, retentions, applications for payment, WIP" targeting the broader head. Cannibalisation guard: explicit scope split (CIS compliance tools vs construction job-costing suites), cross-link.
11. **R&D tax credits for construction** ("r&d tax credits for construction" 18 imp on generalist, zero estate coverage for trades). Candidate NEW post; moderate priority, aligns with agency R&D wave (R1).
12. **CIS + gross payment status**: well covered (3 posts + checker). No new GPS content; avoid.

## C. Cannibalisation flags (existing 65)

- cis-vs-paye AND cis-vs-paye-complete-comparison both live → same head term. Recommend query-ledger check; likely consolidate signals via canonical interlink hierarchy (rewrite-only rule, no collapse without data gate).
- 3x vat-reverse-charge-* posts: acceptable (contractor/subcontractor/general split) but any new DRC post MUST be worked-examples angle only (see B8).
- cis-tax-refund-how-to-claim / how-much-cis-refund-will-i-get / how-long-does-cis-refund-take / cis-back-years-refund-guide: dense refund cluster, do not add more refund posts.
- Pool topic "cis end of year return" (used=false) duplicates live post cis-end-of-year-return → mark used in blog_topics.
- Pool "cis return login" (SV 140, priority 1): navigational HMRC-login intent; thin/flaggable risk. If written, only as "CIS online: filing, login and troubleshooting" utility page; otherwise skip per A* bar.

## D. Deepen-not-new list (priority order)

1. /for/roofers expansion (360 imp waiting, page 2).
2. cis-deadline-calendar-2026-27: tax-month period table + payment references ("cis returns period dates" pos 5 Bing, "cis payment ref" queries).
3. quickbooks-cis-guide: QBO/VAT-codes section.
4. cis-penalties-and-appeals: add amendment/resubmission penalty FAQ (or fold into new appeals how-to, pick one).
5. cis-retention-payments-guide: payment-application + retention-before-tax worked example (already pos 2 Bing).
6. /for/joiners, /for/bricklayers, /for/drainage-contractors light expansions (drainage: add capital-allowances section, links to new CA pillar).

## Recommended new-post shortlist (7)

| # | Working title | Type | Source signal |
|---|---|---|---|
| 1 | Vans, tools and equipment: capital allowances for trades 2026/27 (WDA 14%, 40% FYA) | Pillar | Brand-breadth + FA 2026 + drainage CA query |
| 2 | DRC VAT worked examples and edge cases | Cluster | Bing long-tail chains/thresholds |
| 3 | How to appeal a CIS penalty online (incl. nil + amended returns) | Cluster | Bing appeals long-tail |
| 4 | CIS umbrella vs agency PAYE vs sole trader | Cluster | Pool + brand queries |
| 5 | Mileage vs van costs: AMAP 55p from April 2026 | Cluster | FA 2026 ground truth |
| 6 | Construction accounting software beyond CIS (job costing, WIP, retentions) | Pillar | 1,400+ imp cross-site |
| 7 | Roofer tax guide 2026/27 | Cluster | 360 imp roofers cluster |

Housekeeping: mark "cis end of year return" used in blog_topics; deprioritise brand-name payroll topics (Riddingtons/Hudson/EEBS etc, thin/flaggable).
