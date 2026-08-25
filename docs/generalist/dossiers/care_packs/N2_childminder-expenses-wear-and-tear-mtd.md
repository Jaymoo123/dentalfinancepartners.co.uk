# PACK N2: net-new — childminder expenses, the 10% wear and tear deduction, and MTD

Derived 2026-08-25 from the FROZEN dossier `../care_education_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **regime-fork-led**). Depth page of the childminder pair
(N1 service -> N2 depth). **CONFIRMED at D1**, having been provisional in the first dossier pass.

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug:
  `childminder-expenses-wear-and-tear-mtd-uk` (writer may refine; must resolve via `slug_resolver`).
- Grade: **NO-PAGE -> NET-NEW**, everything writable.
- Revert path: delete pre-deploy. Post-deploy it enters `monitored_pages` as a new surface.
- Shape: explainer, question H2s throughout.
- C1 gate: **C2 row 26 CLEAR**, no carried-forward gate. **Not blocked.**
- **Why this page exists rather than folding into N1:** the D1 harvest returned four separate
  expenses phrasings totalling **340/mo raw**, the largest single demand block in the family, and a
  dedicated incumbent page holds p8 and p13 across all of them. Four ranking phrasings and a
  dedicated incumbent is a page, not an H2.

## 2. Equity register

None (net-new). Nothing frozen.

**Must NOT poach:** the "should I hire an accountant" and registration-timeline framing belongs to
N1. Nursery cost structures (staff payroll, premises, funding reconciliation) belong to N3.

## 3. Market keyword slice (ledger, 340/mo raw across four phrasings)

| Keyword | Vol/mo | Ranking domains (D1) | Best peer |
|---|---|---|---|
| childminders expenses | 90 | 1 | caservices **p8** |
| childminding expenses | 90 | 1 | caservices **p8** |
| expenses for childminders | 90 | 1 | caservices **p8** |
| childminder expenses list | 70 | 1 | caservices p13 |

One domain owns all four rows, from one page, and it sits at p8. That is not a defended position.

## 4. Competitor teardown (fetched 2026-08-25)

`caservices.org.uk/what-expenses-can-i-claim` holds **p8** on three phrasings and p13 on the
fourth. **1,226 words.** Structure: a simplified-expenses section (motor, working from home, living
at business premises) then a general expenses list (mobile phone, subsistence, travel and business
mileage, accountancy fees, entertaining, training, clothing and uniform). It contains the
hours-based apportionment percentages table and a wear-and-tear mention. Zero em-dashes.

**The disqualifying flaw, measured:** the page tags its own mileage rates **"(June 2016)"** and
states them as 45p / 25p / 24p. It also carries the simplified home-use bands (£10 / £18 / £26) and
the living-at-business-premises adjustments (£350 / £500 / £650) with no year tag at all. A p8 page
in 2026 quoting rates it labels as June 2016 is the definition of an undefended SERP.

**The second flaw:** the page carries **three H1s**. Heading hierarchy is broken.

**The third flaw, and the one that matters most:** it is a generic self-employed expenses page with
childminder keywords on it. It never once addresses the childminder-specific position, which is the
whole reason this query exists.

The far better page in the field is not a ranked row at all: `caservices`' blog post of
**13 January 2026**, "HMRC confirmation: Childminder 10% wear and tear and Making Tax Digital
(MTD ITSA)", **653 words**, by Jenny Clarke. It reports that they wrote to HMRC and got
confirmation on what happens to the deduction under MTD, and its H2s are exactly right: the current
10% deduction under the PACEY agreement, what HMRC have now confirmed, when MTD ITSA starts, what
claiming actual costs means for childminders, and a note on cash basis. It is the best content in
the niche and it is 653 words on a blog with no ranking rows. **That is the opportunity: the right
content exists in the field but not on a page built to rank.**

`swan-books.co.uk` (p5-p6 on the service terms) carries the 33% / 10% table and a wear-and-tear
mention inside a "What Can Childminders Expense?" H2, split into six H3 buckets. Directionally
right, buried inside a sales page, 3 em-dashes.

## 5. Whitespace (what §19.2 lets us own)

- **The MTD fork, stated as the page's organising principle rather than a footnote.** Outside MTD
  for Income Tax the long-standing HMRC and PACEY agreed simplifications apply: a 10% of
  childminding income deduction for wear and tear on household items and furniture, plus
  hours-based apportionment of household running costs (at 40 or more hours a week, 33% of running
  costs and 10% of fixed costs, pro-rated below 40 hours). **Inside MTD the agreed percentages fall
  away** and the childminder claims the actual business proportion instead. No ranking page in the
  field presents this as a fork. This is the page.
- **The pro-rating arithmetic shown, not just stated.** hours divided by 40, times 33%, for running
  costs; hours divided by 4 for the fixed-cost percentage. Show it with numbers.
- **Which regime you are in, resolved by a date and a turnover figure**, using the MTD phasing
  timetable, so the reader can answer it for themselves rather than being told to ask an accountant.
- **Current mileage rates with their from-date and the per-vehicle stick rule**, against an
  incumbent quoting June 2016.
- **Ofsted or devolved-inspectorate registration and inspection fees, DBS checks, training, toys
  and equipment**, with the capital versus revenue line drawn on equipment.
- **A side-by-side worked example**: the same childminder's year computed both ways, agreed
  percentages versus actual proportion. Nobody has this.

## 6. Fences (binding)

- **No published house-position citations in reader copy.** Writer cites **§19.2** (the whole
  position), **§2**, **§8** (equipment), **§9** (the MTD timetable), **§12** (mileage), **§17**
  (trading allowance) **in the build report only**.
- **No em-dashes.**
- **Never present the 10% wear-and-tear deduction as surviving MTD.** This is the hard rule of the
  page. Every mention of the percentages must be inside the outside-MTD branch.
- **Rates date-tagged in the sentence**; the 2025/26-locked set (Class 4 6%, £12,570, £50,270)
  carries the natural-language **"still current when checked in August 2026"** tag in 2026/27 copy.
- **Write-time verification, mandatory before publish:** the childminder-agreement percentages and
  their MTD status must be re-read on the current gov.uk childminder expenses guidance page. The
  house position records an open question here (the BIM paragraph for the agreement moved in 2026,
  so cite the gov.uk page, not a stale BIM reference). Do not publish a percentage that has not been
  re-read that week.
- **No competitor swipes.** We do not say other pages are out of date. We date our own figures and
  let that do the work.
- **Intra-cluster:** no service-selling H2s (N1), no nursery content (N3).

## 7. Acceptance criteria (deterministic)

1. **Queries answerable:** all four §3 phrasings; "can childminders still claim 10% wear and tear";
   "what expenses can a childminder claim"; "does MTD change childminder expenses"; "how do I work
   out my childminding share of household bills".
2. **Figures, recomputable and dated:** the 10% wear-and-tear deduction; the 33% running-cost and
   10% fixed-cost percentages at 40 or more hours a week, with the pro-rating formula shown for a
   sub-40-hour week; the MTD ITSA start date and the turnover threshold that applies to this reader;
   the current AMAP first-10,000-miles rate with its from-date; Class 4 at 6% with the currency tag.
3. **Two worked examples on one set of numbers**, recomputable on 2026/27 figures: the same
   childminder's household-cost claim under the agreed percentages and under actual proportion,
   with the difference stated. Persona **Colette**, city **Shrewsbury**.
4. **Every percentage appears inside an explicitly labelled MTD branch.** QA fails the page if a
   percentage appears in unbranched prose.
5. **Single H1.** Question-form H2s throughout.
6. **Links:** N1 linked from body prose; resolver-clean; all house content floors and the coverage
   pass.
7. **No H2 duplicating an N1, N3, N4, N5 or E1 H2 phrasing.**
8. **Zero house-position section codes** in the published body.

## 8. Expectation

**Winnable, and the highest-confidence surface in the cluster on SERP evidence.** One incumbent
page holds all four rows at p8 and p13, it is generic rather than childminder-specific, and it
labels its own rates June 2016. There is no second competitor on these rows at all.

Realistic: Google top-10 on at least two of the four phrasings within a quarter of indexing; a
realistic shot at p1-p3 on `childminder expenses list` given a single p13 incumbent. Bing earlier.
Maturity caveat applies: poor position at 28 days is immaturity, not a gap.

Volume caveat: the four phrasings are near-synonyms and almost certainly share intent, so 340/mo
raw is an overstatement of distinct demand. Expect less traffic than the raw figure implies. The
surface stands regardless: coverage over selection.

Failure trigger: zero impressions on all four §3 phrasings at 90 days post-index.
