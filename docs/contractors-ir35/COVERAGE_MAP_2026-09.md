# contractors-ir35 coverage map (2026-09-27)

Research only. Built to spec `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S3,
with the selection rules in `docs/_engines/NETNEW_PROGRAM.md` section 8. Ground truth is
`docs/contractors-ir35/house_positions.md` (locked 2026-06-12). Machine copy:
`coverage_map_2026-09.json`, one row per cell. No content written, nothing committed,
nothing deployed.

---

## One page

**12 buyer situations. 60 cells: 19 COVERED, 14 PARTIAL, 27 MISSING.** 15 cells are Wave 1;
2 cells are marked not eligible and stay in the map with the reason.

The site is well covered on IR35 mechanics and badly covered on the moment a contractor
decides to hire someone. All 8 leads in 90 days are the same shape: a professional with a
confirmed outside-IR35 contract who needs a company set up and run. There are 62 posts about
the rules and one page that sells the service.

Three things the data says:

1. **The buying moment has no page.** The single most common lead is "I have an outside-IR35
   contract starting, set me up". No page is the subject of that. The nearest is a blog
   checklist. That is the first Wave 1 row.
2. **Demand is genuinely small, so demand cannot be the gate.** Of 60 keywords priced at
   DataForSEO, only 4 clear the NETNEW rule-3 floor of 100 a month, and all 4 are calculators
   we already have. Every commercial contractor-accountant phrase measures 10 to 480 a month.
   Most Wave 1 rows therefore carry a recorded rule-3 failure. This matches the programme's
   own decision: coverage for the assistant channel, not head-term rank.
3. **The topic pool is spent.** 1,257 rows, 1,117 used. The 140 unused rows are off-payroll
   jargon with zero volume plus CIS-subcontractor keywords that belong to construction-cis.
   **No Wave 1 row has a pool row behind it. Every brief has to be written fresh.**

Evidence: 8 leads (90 days, test rows out), 111 UK humans, 2,462 GSC impressions and **0 GSC
clicks** in 90 days, 310 Bing queries (all IR35 mechanics, positions 5 to 9, 0 clicks),
1,257 pool rows, 10 live SERPs and 60 priced keywords. DataForSEO spend **$0.122**.

### Top 10 MISSING cells by demand

| # | Cell | Target query | Demand/mo | Peer ranks |
|---|---|---|---:|---|
| 1 | IR35 insurance: what the policies cover | ir35 insurance | 390 | unchecked |
| 2 | Alphabet shares in a contractor company | alphabet shares limited company | 30 | yes |
| 3 | What s.455 costs and when you get it back | s455 tax calculator | 20 | unchecked |
| 4 | Company formation, bank account, VAT and PAYE order | contractor company formation | 10 | yes |
| 5 | Moving from umbrella to limited: the setup service | umbrella to limited company accountant | 10 | yes |
| 6 | IR35 contract review service | ir35 contract review service | 10 | yes |
| 7 | Putting your spouse on the payroll or share register | spouse shareholder limited company | 10 | yes |
| 8 | Accountants for your first contract outside IR35 | accountant for first contract outside ir35 | 0 | unchecked |
| 9 | Is contracting worth it on your salary | going contracting from permanent employment | 0 | **no** |
| 10 | What contractors pay for accountancy: a benchmark | how much does a contractor accountant cost | 0 | yes |

Rows 8 to 10 have no measured volume. They are in the map because the lead messages and the
AI baseline put buyers there, not because a keyword tool does. Row 9 fails the peer rule as
well (the SERP is recruiters and forums, no specialist accountant) and is marked not eligible.

### Segment pages proposed (Workstream A3)

Ten profession hubs already exist at `/for/*`. Six are COVERED. The gap is situation pages,
not more professions:

| Proposed | Why |
|---|---|
| For your first contract outside IR35 | 5 of 8 leads |
| Moving from umbrella to your own limited company | peers rank, no page of ours |
| For contractors caught inside IR35 | 3,600/mo on the calculator, no service page |
| IR35 contract review service | four peer specialists hold top-20 slots |
| Accountants for IT contractors (extend `/for/it-contractors`) | ChatGPT did not name us for this prompt |
| `/services` rebuilt as the entity and offer page | 480/mo parent query, 5 UK humans in 90 days |
| For two-director contractor companies | later |
| For contractors with a high-profit year | later |
| For contractors working for overseas clients | later |
| For employees going contracting | not eligible, peer rule fails |

### Wave 1, 15 rows, in order

| # | Type | Working title | Status | Demand | Words |
|---|---|---|---|---:|---|
| 1 | segment_page | Accountants for your first contract outside IR35 | MISSING | 0 | 800-1,200 |
| 2 | segment_page | Moving from umbrella to your own limited company: the setup service | MISSING | 10 | 800-1,200 |
| 3 | segment_page | For contractors caught inside IR35 | MISSING | not measured | 800-1,200 |
| 4 | segment_page | IR35 contract review service | MISSING | 10 | 800-1,200 |
| 5 | segment_page | Accountants for IT contractors (extend) | PARTIAL | 50 | 800-1,200 |
| 6 | segment_page | What the contractor service covers and what it costs (extend `/services`) | PARTIAL | 480 | 800-1,200 |
| 7 | decision | Inside IR35: keep the company, close it, or go umbrella | MISSING | not measured | 800-1,200 |
| 8 | decision | Alphabet shares in a contractor company: when they work | MISSING | 30 | 1,200-1,600 |
| 9 | decision | What a contractor accountant should cost in 2026/27 (extend) | PARTIAL | 10 | 800-1,200 |
| 10 | question | Putting your spouse on the payroll or the share register | MISSING | 10 | 800-1,200 |
| 11 | question | What to do in the first 30 days after you incorporate (extend) | PARTIAL | 70 | 800-1,200 |
| 12 | question | An overdrawn director's loan account and the s.455 charge | MISSING | 0 | 800-1,200 |
| 13 | number | What s.455 costs and when you get it back | MISSING | 20 | new calculator |
| 14 | number | How much your PSC can put in this year, with carry forward | PARTIAL | 10 | new calculator |
| 15 | question | The winding-up TAAR: the two-year trap if you keep contracting | PARTIAL | 10 | 800-1,200 |

Two new calculators fall out of rows 13 and 14: an s.455 director's loan calculator and a
pension annual allowance and carry-forward calculator. Both are build items, not writing
items, and are not counted in the wave's page total.

### Two things in the spec that the site contradicts

- Section 8 of the programme says contractors "missed entirely for IT contractors, **which has
  no page**". `/for/it-contractors` exists and has since launch. The page is there; ChatGPT
  still did not name us for it. The map treats that cell as PARTIAL (extend), not MISSING.
- Section 3, task B0 lists contractors-ir35 as having `/for` and `/services` canonical to the
  homepage. In the working tree both are already self-canonical (`for/page.tsx`,
  `for/[slug]/page.tsx`, `services/page.tsx`), committed before the 2026-09-16 deploy of
  `90fbea9c`. The defect appears already fixed on this site. The other five small sites were
  not checked here.

Reported, not resolved. The programme document wins on both until the owner rules.

---

## The full map

### How to read it

- **Status.** COVERED = a page is the subject. PARTIAL = a page touches it, extend that page.
  MISSING = no page. Judged on subject, not slug tokens (NETNEW section 8.2 rule 4).
- **Eligibility.** NETNEW section 8.2 needs all four: we are absent, a peer specialist ranks
  top 20, demand 100 to 5,000 a month, no page of ours is already the subject. Failures are
  recorded, never dropped.
- **Demand.** DataForSEO Google Ads UK volume, pulled 2026-09-27. "not measured" means no
  volume was pulled for that phrase; it is not a zero.
- **Peer ranks.** From 10 live UK Google top-20 pulls, 2026-09-27. "unchecked" means no SERP
  was pulled for that query.

### What exists today

- 62 blog posts across 8 categories: IR35 Status (17), Umbrella vs Limited Company (12),
  MTD and Compliance (7), Limited Company Tax (5), Expenses and Deductions (5),
  Contractor Accounting Basics (5), Pension and Dividends (5), plus hub posts.
- 10 profession hubs at `/for/*`: it-contractors, engineering-contractors, finance-contractors,
  management-consultants, project-managers, nhs-locum-doctors, oil-gas-contractors,
  legal-contractors, marketing-contractors, construction-contractors.
- 1 services page, 10 city pages at `/locations/*`, a glossary, an `/ir35-status` hub.
- 10 calculators: contractor-day-rate, contractor-salary-dividend, corporation-tax,
  dividend-tax, inside-ir35-take-home, outside-ir35-take-home, umbrella-take-home,
  umbrella-vs-limited, ir35-status-indicator, managed-service-company-risk-checker.
- 3 research pages: uk-contractor-index, uk-contractor-insolvency-index,
  uk-contractor-survival-index.

### The 12 buyer situations

Drawn from the 8 real lead messages (read for meaning, nothing quoted), the `/for` hubs, the
services page, and the two AI baseline prompts in programme section 8.

| # | Situation | Evidence | Cells | Missing |
|---|---|---|---:|---:|
| 1 | First-time contractor going limited for a confirmed outside-IR35 engagement | 5 of 8 leads: mechanical design engineer, water-sector engineer, engineering contract, a solicitor, a generic PSC setup | 6 | 3 |
| 2 | Permanent employee deciding whether to go contracting at all | one lead, the upstream of situation 1 | 4 | 3 |
| 3 | Umbrella worker moving to a limited company | 12 umbrella posts, peers rank on the service query | 5 | 2 |
| 4 | Inside-IR35 contractor deciding what to do with the company | 3,600/mo on the inside calculator, 8 UK humans on the inside-IR35 post | 5 | 3 |
| 5 | Contractor who thinks the client's determination is wrong | 109 GSC impressions on "ir35 contract review", peers rank | 5 | 2 |
| 6 | Contractor choosing, or leaving, an accountant | 480/mo parent query, 345 GSC impressions on accountant-cost queries | 5 | 1 |
| 7 | Contractor restructuring shares with a spouse or partner director | one lead, an alphabet-share restructure with a spouse co-director | 5 | 4 |
| 8 | Contractor putting company profit into a pension | 4 pension posts, 61 GSC impressions on contractor pension queries | 4 | 1 |
| 9 | Contractor taking money out of, or closing, the company | 46 GSC impressions on "members voluntary liquidation contractors" | 5 | 2 |
| 10 | Contractor in a named profession looking for a specialist | 10 `/for` hubs; 2 of 8 leads entered on one | 8 | 2 |
| 11 | Contractor with an overseas client, or a client too small for Chapter 10 | the site's largest blog surface is the deemed-payment post (18 humans) | 4 | 2 |
| 12 | Contractor under HMRC enquiry, or worried about one | 390/mo on "ir35 insurance" | 4 | 2 |

Cell-by-cell detail, including the target query, the existing page, the eligibility failure
and the house-position anchors each brief needs, is in `coverage_map_2026-09.json`.

### What the search data says

**Google Search Console, sc-domain property, 90 days to 2026-09-27:** 335 queries, 2,462
impressions, **0 clicks**. Average positions on the commercial queries run 10 to 80. The
segment hubs already earn impressions without clicks: engineering contractor accountants 54
at position 19.1, oil and gas contractor accountant 26 at 22.3, legal contractors 5 at 19.8.
The largest single query is "contractor accounting cost" at 212 impressions, position 38.6.
We hold a first-page position on almost nothing commercial.

**Bing Webmaster, 310 queries:** every one is IR35 mechanics, mostly CEST. Positions are good
(5 to 9) and clicks are zero. Nothing in the Bing set is a buyer query. Since Bing is the
index ChatGPT searches, the absence of buyer-shaped pages is the finding.

**Peer check, 10 live UK Google top-20 pulls, 2026-09-27:**

| Query | Peer specialists in the top 20 |
|---|---|
| accountant for it contractors | gorillaaccounting, icsuk, dolanaccountancy, crunch, accrueaccounting |
| umbrella to limited company accountant | sg-accounting, dnsassociates, goforma, freestyleaccounting |
| contractor accountant fees | sg-accounting, churchill-knight, morethanaccountants, cruseburke |
| ir35 contract review service | whitefieldtax, ir35verdict, goqdos, ir35shield, cleartaxgroup |
| alphabet shares contractor company | agileaccountants, tinytax, accountsandlegal |
| contractor pension employer contribution accountant | inniaccounts, sg-accounting, caroola, churchill-knight |
| contractor accountant for engineers | **we hold position 1**, then provenseaccountants, inniaccounts, cleerly |
| going contracting from permanent employment | none; recruiters, forums and gov.uk |
| closing a contractor limited company | no organic results returned |
| accountant for first contract outside ir35 | no organic results returned |

Rule 2 holds on 6 of 10. It fails on "going contracting from permanent employment" and is
unproven on the two queries that returned nothing.

### The topic pool

1,257 rows, 1,117 used, 140 unused. Of the 140: 88 are "off payroll working ..." variants with
zero volume and no distinct subject, 11 are CIS subcontractor keywords belonging to
construction-cis, 11 are deemed-payment calculator variants, and the rest are one-line
informational fragments at 0 to 10 a month. **Nothing in the unused pool maps to a Wave 1
cell.** Every `pool_row_id` in the JSON is null. The pool needs refilling with
decision-stage briefs before it is useful again, the same finding the programme recorded for
Property (task C5).

### Ground truth the briefs will lean on

House positions most cited across the map, by section:

- §1 and §1.A, Chapter 8 against Chapter 10, and the small-client exemption with the
  6 April 2027 earliest timing, on 14 cells.
- §8, profit extraction with the Employment Allowance fork, on 11 cells.
- §5 and §6, 2026/27 personal tax and NIC, on 10 cells.
- §11, the employer pension contribution, on 5 cells.
- §14 and §15, s.455, the winding-up TAAR and BADR, on 6 cells.
- §12, the umbrella joint and several liability from 6 April 2026, on 5 cells.
- §13 and §17, the MSC boundary and the grey-area stances, on 8 cells.

No figure is asserted anywhere in this map that is not already in house positions. No claim
is made about the firm.

### Cells kept but not eligible

| Cell | Rule failed |
|---|---|
| Is contracting worth it on your salary: the 2026/27 comparison | rule 2, no specialist accountant in the top 20; rule 3, volume 0 |
| For employees going contracting for the first time | rule 2 and rule 3, both on the parent decision |

Both are real buyer moments and both would need the authority the site does not have. They
stay in the map so a later read can reopen them.
