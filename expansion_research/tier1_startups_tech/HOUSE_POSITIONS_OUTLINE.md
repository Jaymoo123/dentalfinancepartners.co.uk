# House positions outline — Startups & tech/SaaS site (R3, Tier-1 #4)

Date: 2026-07-11. Status: OUTLINE. Every citation URL below was fetched 2026-07-11 and returned
HTTP 200 with the expected phrases present (evidence: `raw/citation_checks.json`, 32 checked,
0 failing). Final `house_positions.md` gets a second figure-by-figure verification pass at build.

Jurisdiction: UK-wide (corporation tax / venture-capital schemes are UK-wide; no devolved split
needed except Scottish income tax on founder salary, flagged at position 20).

## A. R&D tax relief (the revenue anchor for this audience)

1. **Merged scheme (RDEC-style)**: one R&D expenditure credit at **20%** (above the line, taxable)
   for accounting periods beginning on or after **1 April 2024**; replaces the old SME
   super-deduction and RDEC for those periods.
   — https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies (200; "merged scheme", "20%", "1 April 2024" confirmed)
2. **ERIS (enhanced R&D intensive support)**: loss-making SMEs whose qualifying R&D spend is
   ≥30% of total expenditure keep the SME route — **86% additional deduction + payable credit at
   14.5%**.
   — https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises (200; "merged scheme", "intensive", "14.5" confirmed)
3. **Claim notification**: first-time claimants (or those who haven't claimed in the prior 3 years)
   must notify HMRC within **6 months of the end of the accounting period** or the claim is invalid.
   — https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief (200; "claim notification", "6 months" confirmed)
4. **Additional Information Form**: mandatory detailed AIF before the CT600 claim; claims without
   it are removed.
   — https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief (200; "additional information" confirmed)
5. **R&D advance assurance** exists for small first-time claimants — a trust-building content page,
   not a default recommendation.
   — https://www.gov.uk/guidance/research-and-development-tax-relief-advance-assurance (200)
6. **Software R&D boundary**: qualifying R&D must seek an advance in science or technology
   (CIRD manual is the citation anchor for "routine development ≠ R&D" — the honest-positioning
   moat vs volume R&D mills).
   — https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000 (200)
   — hub page: https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief (200)

## B. SEIS / EIS

7. **SEIS company limits**: raise up to **£250,000**, gross assets ≤ £350,000, fewer than 25
   employees, within 3 years of starting to trade.
   — https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme (200; "250,000", "advance assurance" confirmed)
8. **SEIS investor side**: **50% income tax relief** on up to **£200,000** invested per tax year;
   50% CGT reinvestment exemption; CGT-free disposal after 3 years.
   — https://www.gov.uk/guidance/seed-enterprise-investment-scheme-background (200; "50%", "200,000" confirmed)
9. **EIS company limits**: up to **£5m per year / £12m lifetime** venture-capital-scheme funding
   (higher for knowledge-intensive companies); gross-asset and age tests apply.
   — https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme (200; "5 million", "12 million" confirmed)
10. **EIS investor side**: **30% income tax relief**, £1m per-year cap (£2m where the excess is in
    knowledge-intensive companies); 3-year holding for relief retention.
    — https://www.gov.uk/guidance/venture-capital-schemes-tax-relief-for-investors (200; "30%" confirmed)
11. **Advance assurance**: HMRC pre-clearance for SEIS/EIS/VCT rounds — the single highest-intent
    service query in this niche ("seis advance assurance" 480/mo, KD 2, CPC £27).
    — https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance (200)

## C. Share schemes

12. **EMI limits**: up to **£250,000** of unexercised option value per employee (3-year window),
    **£3m** company total; qualifying company: gross assets ≤ £30m, fewer than 250 FTE employees,
    excluded activities list; employee working-time requirement.
    — https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis (200; "250,000" confirmed)
    — gross assets test: https://www.gov.uk/hmrc-internal-manuals/employee-tax-advantaged-share-scheme-user-manual/etassum52030 (200; "30", "gross assets" confirmed)
13. **ERS compliance**: schemes must be registered and annual employment-related-securities
    returns (including nil returns) filed by **6 July** after tax year end; EMI grant notification
    now runs on the same 6-July deadline.
    — https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return (200; "6 July" confirmed)
14. **EMI valuations**: agree an option-grant valuation with HMRC Shares & Assets Valuation
    (VAL231 route) — verify the current form link at build; cite the ERS/EMI pages above meanwhile
    (the standalone VAL231 guidance URL used previously now 404s — see open questions).
15. **CSOP**: **£60,000** per-employee option limit — the fallback once EMI limits/qualifying
    tests are breached (scale-up content).
    — https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan (200; "60,000" confirmed)
16. **Section 431 elections**: 14-day joint election on restricted securities (founder/employee
    shares at funding rounds) — a classic funded-startup trap.
    — https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450 (200; "431", "election" confirmed)
17. **Growth shares / unapproved options** are taxed under general ERS rules (income tax + NIC on
    acquisition/exercise value vs market value) — comparison content anchored to the ERS manual.
    — same ERS manual family as position 16

## D. Founder capital taxes

18. **BADR**: Business Asset Disposal Relief rate is **14% for 2025/26 and 18% from 6 April 2026**
    (£1m lifetime limit); EMI shares qualify with the 2-year rule and without the 5% personal-company
    tests.
    — https://www.gov.uk/business-asset-disposal-relief (200; "14%" confirmed; 18% figure re-verify figure-by-figure at build)
19. **CGT main rates 18% / 24%** for disposals from 30 Oct 2024 onward (shares).
    — https://www.gov.uk/capital-gains-tax/rates (200; "24%" confirmed)
20. **Share-for-share exchanges (s.135 TCGA)**: no disposal on a qualifying exchange (group
    reorganisations, flips) — but beware s.137 anti-avoidance and clearances. Scottish income tax
    divergence flagged for founder salary content, not for CGT/CT.
    — https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg52521 (200; "135", "exchange" confirmed)

## E. Corporation tax, extraction and payroll

21. **CT rates**: 19% small profits rate (≤£50,000), 25% main rate (≥£250,000), marginal relief
    between — limits divided by associated companies (multi-entity founder groups).
    — https://www.gov.uk/corporation-tax-rates (200; "25%", "19%", "Marginal Relief" confirmed)
    — https://www.gov.uk/guidance/corporation-tax-marginal-relief (200; "250,000" confirmed)
22. **Dividend rates 2026/27**: **10.75% / 35.75% / 39.35%** (FA 2026 s.4, estate ground truth);
    dividend allowance **£500**.
    — https://www.gov.uk/tax-on-dividends (200; "500" confirmed; rate figures per estate ground truth `dividend_rates_2026_ground_truth`, figure-by-figure re-verify at build)
23. **Employer NIC 15% above a £5,000 secondary threshold** (estate ground truth, live-confirmed);
    **Employment Allowance up to £10,500** — but companies where the only employee paid above the
    threshold is a director are ineligible (solo-founder trap).
    — https://www.gov.uk/national-insurance-rates-letters (200; "15%" confirmed) and https://www.gov.uk/claim-employment-allowance (200; "10,500" confirmed)
24. **Pre-trading expenditure**: allowable if incurred within **7 years** before trade starts,
    treated as incurred on day one (classic pre-revenue founder question).
    — https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351 (200; "seven years", "pre-trading" confirmed)
25. **Loss relief**: trading losses carry forward against future profits (relevant-maximum rules at
    scale); startups burning cash pre-profit should still file to bank losses.
    — https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss (200; "carry forward" confirmed)
26. **VAT registration**: mandatory at **£90,000** rolling 12-month taxable turnover or on a
    30-day forward expectation; SaaS nuance = B2B reverse charge / place-of-supply means overseas
    revenue may not count toward the threshold (build-stage verify with Notice 741A).
    — https://www.gov.uk/register-for-vat (200; "90,000" confirmed)

## F. Boundary positions (estate collisions)

27. **IR35 / off-payroll**: the site states the boundary only and defers all contractor-side
    IR35 depth to the sibling Contractor Tax Accountants site (estate rule: no cannibalisation).
    — https://www.gov.uk/guidance/understanding-off-payroll-working-ir35 (200; "off-payroll" confirmed)
28. **Agencies excluded**: creative/marketing agency finance content belongs to the estate agency
    site; this site scopes to product/tech companies (SIC 62/63 core) — an /for/* architecture
    note, not a tax position.
29. **Data-asset source**: Companies House bulk products (free basic company data snapshot + API)
    are live and downloadable — feasibility anchor for the flagship index.
    — https://download.companieshouse.gov.uk/en_output.html (200), https://developer.company-information.service.gov.uk/ (200), SIC codes: https://resources.companieshouse.gov.uk/sic/ (200; "62" confirmed)
