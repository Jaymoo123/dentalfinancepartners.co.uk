---
slug: profit-extraction-buy-to-let-limited-company-salary-dividends
category: incorporation-and-company-structures
intent: Director-shareholders of buy-to-let limited companies searching for a detailed decision tool to choose between salary, dividends, director's loan repayment, and pension as profit extraction routes, with worked maths by profit band. This is a planning and optimisation intent, not a compliance how-to.
---
# Profit Extraction from a Buy-to-Let Limited Company: Salary vs Dividends vs Pension (2026/27)

## Statutory anchor

- **Primary:** ITEPA 2003 Pt 2 (employment income / salary taxation); ITA 2007 Pt 2 (income tax rates on dividends); CTA 2010 s.455 (close-company loan charge on overdrawn DLA); FA 2004 Pt 4 + s.229 (pension annual allowance); Social Security Contributions and Benefits Act 1992 (NIC framework); SI 2001/1004 (National Insurance Contributions Regulations -- NIC thresholds).
- **Supporting:** ITTOIA 2005 s.397 + s.399 (dividend tax credit / allowance); CTA 2009 s.54 (company deductibility of salary + employer pension contributions); ITA 2007 s.8 as substituted by FA 2026 s.4 (dividend upper rate 35.75% from 2026/27); FA 2026 ss.6-7 (property income surcharge 2027/28 -- affects personal-side income stacking analysis).
- **House position reference:** §21.4 (salary vs dividends in property SPV 2026/27 -- marginal-rate framework, DLA repayment order, PA + NI floor, pension lever); §21.1 (DLA mechanics, exhaustion trap, HMRC official rate); §21.A (CT three-figure framework -- effective CT rate matters for comparing gross-to-net retention); §7 (2027/28 property income rates 22/42/47% -- affects personal-side stacking from 2027/28 onwards); memory lock: employer NIC 15%/£5,000 secondary threshold from April 2025; dividend rates 2026/27: 8.75% basic / 33.75% higher / 39.35% additional -- VERIFY against FA 2026 s.4 (FA 2026 s.4 substitutes 10.75%/35.75%/39.35% per memory lock dividend_rates_2026_ground_truth.md).

**Rate verification flag (CRITICAL -- Stage 2 must resolve before writing numbers):** The memory lock file `dividend_rates_2026_ground_truth.md` records FA 2026 s.4 rates as 10.75%/35.75%/39.35% for 2026/27. This differs from the prior-year locked rates (8.75%/33.75%/39.35%). Stage 2 sub-agent must WebFetch legislation.gov.uk for FA 2026 s.4 and gov.uk "Tax on dividends" page and confirm the correct 2026/27 figures before populating any worked examples.

## Framing differentiator (anti-cannibalisation)

- **Closest existing pages (cannibalisation check):**
  - `property-company-profit-extraction-salary-vs-dividends` (Jaccard 0.19): general salary-vs-dividends comparison for property companies; check depth of worked maths -- if it already has profit-band tables, Stage 2 must narrow this page's angle to the decision-tree + director's loan + pension dimensions it lacks.
  - `extracting-money-from-property-limited-company` (0.17): general overview of extraction methods; likely lighter-touch than a full decision tool.
  - `buy-to-let-limited-company-complete-guide-uk` (0.15): one h2 on extraction within a broad guide; this page is the dedicated 1,200+ word deep-dive.
- **Stage 2 check required:** Read `property-company-profit-extraction-salary-vs-dividends` + `extracting-money-from-property-limited-company` before writing. Confirm those pages do NOT already contain: (a) worked maths at three profit bands, (b) director's loan exhaustion trap narrative, (c) pension-lever comparison. If any do exist, narrow this page to the gap (e.g. pension dimension + 2027/28 forward planning) and flag BRIEF_DRIFT.
- **Angle this page takes that adjacent pages do NOT:** This is a standalone decision tool with worked maths by profit level -- the extraction equivalent of a tax calculator in prose form. It answers "at my profit level, what combination of salary / dividend / DLA / pension gives the best net cash?" with actual numbers.

## Key questions this page must answer

1. What is the optimal salary level for a single-director BTL company in 2026/27 -- is it the NI secondary threshold (£5,000) or the personal allowance (£12,570), and why does Employment Allowance availability change the answer?
2. How do dividends interact with the £500 dividend allowance (2026/27) and when does the effective marginal rate on dividends tip above what salary would cost?
3. What is the net cash position at three profit bands (approximately £30,000, £60,000, £100,000) after CT + salary + dividends under each extraction strategy?
4. How does the director's loan repayment route work, when does it run dry, and what is the DLA exhaustion trap for founders who incorporated via s.162?
5. What is the s.455 charge (35.75% from 2026/27 per FA 2026 s.4) on overdrawn DLA, when does it apply, and how is it reclaimed on repayment?
6. How do employer pension contributions alter the CT deduction and the personal annual-allowance limit -- when does the pension lever beat a dividend extraction?
7. How will the 2027/28 property income surcharge (22/42/47%) affect the personal-side income stacking analysis for director-shareholders who also have personal letting income?
8. What is the settlements legislation risk for dividend declarations to spouse-shareholder (alphabet-share SPVs) and how does the Arctic Systems carve-out apply?
9. Should profit be extracted now or retained in the company -- what is the retained-vs-extracted CT rate comparison (small profits 19%, marginal 26.5%, full 25%)?
10. What cross-link should the reader follow for whole-portfolio strategy context (links to A1 pillar) vs FIC-specific mechanics (links to A10)?

## Manager pre-decisions placeholder

- **Category routing:** `incorporation-and-company-structures` -- correct cluster for SPV extraction decisions; confirms against live route dirs.
- **Dividend rate lock:** Stage 2 must verify FA 2026 s.4 rates via legislation.gov.uk before finalising any number. Per memory: 10.75% / 35.75% / 39.35% for 2026/27. If confirmed, use those; flag discrepancy vs prior-wave assumptions if any.
- **Employer NIC threshold 2026/27:** 15% above £5,000 secondary threshold (memory lock: employer_nic_15pc_2025_ground_truth.md). Verify current-year secondary threshold at gov.uk at write time.
- **s.455 rate 2026/27:** 35.75% for loans made on or after 6 April 2026 (per §21.1 F-9 lock); verify at write time against gov.uk "directors' loans" page.
- **Worked-example profit bands:** use £30k / £60k / £100k as the three anchor bands (matching §21.4 framework).
- **Cross-link INTO A1 pillar:** this page must include a signposted link to `portfolio-landlord-tax-planning-strategy-guide` for whole-portfolio strategy context (conductor ruling).
- **Employment Allowance note:** EA is not available for single-director companies with no other employees from 2014-15 onwards (FA 2014 + NICA 2015); confirm this remains the position at write time.

## Stage 2 research target list

- Competitor pages to fetch and verify live (Stage 2 confirms HTTP 200 + on-topic):
  1. `https://www.landlordvision.co.uk/blog/salary-vs-dividends-property-company/` -- likely has a worked comparison; check for profit-band tables and pension dimension.
  2. `https://www.taxinsider.co.uk/property-tax/extracting-money-property-company` -- specialist publisher; check depth.
  3. `https://www.propertytaxinsider.co.uk/profit-extraction` -- niche site; check if they have the director's loan angle.
- HMRC manual anchors:
  - CTM61500+ (close-company loan charge s.455 mechanics, rate, reclaim on repayment).
  - EIM02500+ (benefits in kind / deemed salary for director-shareholders).
  - PAYE guidance: "Pay As You Earn for directors" gov.uk page -- salary filing obligations.
  - PTM044100+ (pension annual allowance for company directors).

## Universal rules + workflow stubs

- No em-dashes anywhere in the body.
- No named experts or quoted individuals.
- Lead form auto-injected at footer; no duplicate in body.
- Semantic HTML only in body.
- All statutory citations verified against legislation.gov.uk at write time.
- Rate-verification flag above (dividend rates) must be resolved by Stage 2 before populating any worked numbers.
- Stage 2 fills: competitor URL live-check, profit-band worked examples, HMRC manual cross-check, settlements-legislation note on alphabet shares.

## Work log

(Stage 2 + RUN populate.)
