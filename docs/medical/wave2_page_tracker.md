# Medical Wave 2 — page tracker

18 pages, 6 clusters. Cannib GREEN (18 net-new). FLAT routing (post `/blog/<slug>`).
Stacks on Wave 1 (uncommitted). Six-check floor per page; flat-link audit via
scripts/medical_flat_link_audit.py.

| id | slug | category | HP anchor | status | words | FAQs |
|----|------|----------|-----------|--------|-------|------|
| A1 | how-gms-funding-works-global-sum-carr-hill-explained | GP Practice Management | §3 | done | 3119 | 14 |
| A2 | qof-income-gp-practice-accounting-explained | GP Practice Management | §3 | done | 2885 | 14 |
| A3 | enhanced-services-gp-practice-income-tax | GP Practice Management | §3 | done | 2881 | 14 |
| B1 | pcn-funding-network-contract-des-explained | GP Practice Management | §3 | done | 2867 | 14 |
| B2 | arrs-reimbursement-employing-pcn-staff-tax | GP Practice Management | §3, §8 | done | 2862 | 14 |
| B3 | pcn-clinical-director-payments-tax | GP Practice Management | §3, §2.C | done | 2811 | 14 |
| C1 | dispensing-practice-income-accounts-tax | GP Practice Management | §3, §6.A | done | 2991 | 14 |
| C2 | gp-practice-private-non-nhs-income-streams | GP Practice Management | §3, §6 | done | 2834 | 14 |
| C3 | gp-practice-income-pcse-statement-reconciliation | GP Practice Management | §3 | done | 2805 | 14 |
| D1 | reading-gp-partnership-accounts-current-capital-accounts | GP Tax & Accounts | §1 | done | 2872 | 14 |
| D2 | gp-partner-drawings-vs-profit-tax-reserving | GP Tax & Accounts | §1, §8 | done | 2803 | 14 |
| D3 | gp-partnership-basis-period-reform-explained | GP Tax & Accounts | §1, §9 | done | 2835 | 14 |
| E1 | buying-into-gp-partnership-capital-parity-explained | GP Tax & Accounts | §1, §4 | done | 2870 | 14 |
| E2 | gp-partnership-mutual-assessment-period-what-to-check | GP Tax & Accounts | §1, §4 | done | 2878 | 14 |
| E3 | financing-gp-partnership-buy-in-tax-relief | GP Tax & Accounts | §1 (ITA 2007 s.398) | done | 2853 | 14 |
| F1 | retiring-from-gp-partnership-tax-capital-account | GP Tax & Accounts | §1, §4, §9 | done | 2850 | 14 |
| F2 | gp-practice-merger-accounts-tax-explained | GP Tax & Accounts | §1, §4 | done | 3012 | 14 |
| F3 | gp-expense-sharing-vs-full-partnership | GP Tax & Accounts | §1 | done | 2900 | 14 |

## Wave 2 close (2026-06-03)
- 18 pages WRITTEN + VERIFIED. Six-check passed all 18 (body 2,803-3,425; 14 FAQs each; metaTitle <=58; metaDescription <=158; 0 em-dashes; 0 class/id/style; £ not "pounds"). Flat-link audit 0 HARD 404 corpus-wide (73 posts). Frontmatter 73/73 valid. Build exit 0.
- COMMITTED fa8400ab (main) + DEPLOYED to https://www.medicalaccounts.co.uk (live, 200s) + IndexNow 73 URLs (202).
- HP-lock gate adds this wave: §6.A dispensing-drug VAT zero-rating (Sch 8 Group 12). Deferred future HP locks: basis-period reform (BIM81201/BIM81310), qualifying-loan-interest-relief (ITA 2007 s.398/s.24A).

## HP-lock gate log
- Cluster A (PASSED 2026-06-03): GMS funding structure verified (SI 2015/1862, SFE, Carr-Hill, QOF aspiration/achievement, DES/LES) at NHS England/BMA/PCSE. Global Sum/QOF figures hedged per §3 VERIFY flag. No HP gap.
- Cluster B (PASSED 2026-06-03): Network Contract DES, ARRS reimbursement, joint-employment VAT trap, Employment Allowance verified at NHS England/BMA. B3 PCN clinical-director pensionability correctly hedged (route-dependent; never via PSC, §2.C). Figures hedged 2025/26. No HP gap. (£ normalised in B1/B2 post-write.)
- Cluster C (PASSED 2026-06-03): dispensing-drug VAT verified at primary source (HMRC RCB 2 (2020)/VAT Notice 701/57): dispensed NHS drugs ZERO-RATED under VATA 1994 Sch 8 Group 12 (input VAT recoverable), administered exempt, private standard-rated. LOCKED as new HP §6.A. C2 VAT carve-outs (VATHLT2130) match §6. C2 differentiated from private-practice-tax-nhs-and-private-income (practice income streams vs individual split).
- Cluster D (PASSED 2026-06-03): basis-period reform verified at HMRC BIM81201 (tax-year basis from 2024/25), BIM81310 (5-year spread 20%/yr 2023/24-2027/28), gov.uk transition-profit (overlap relief in 2023/24); SA800/SA104 confirmed. D1/D2/D3 explicitly differentiated from the 4 existing partnership pages. FUTURE HP LOCK candidate: basis-period reform note to §8/§9 (deferred; page cites anchors directly).
- Cluster E (PASSED 2026-06-03): qualifying loan interest relief on a partnership buy-in loan verified at ITA 2007 s.398 (loan to invest in partnership), s.383(4) (relief at Step 2 net income), s.399 (limited partner / investment LLP excluded), s.24A cap (greater of £50k or 25% adjusted total income), HMRC HS340. E1 explicitly differentiated from becoming-gp-partner-financial-implications. FUTURE HP LOCK candidate: qualifying-loan-interest-relief note (deferred; page cites anchors directly).
