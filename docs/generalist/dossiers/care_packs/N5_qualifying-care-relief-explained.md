# PACK N5: net-new — qualifying care relief, year-tagged (HS236 shape)

Derived 2026-08-25 from the FROZEN dossier `../care_education_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **dated-answer-block-led**, every H2 a question). Explainer
half of the foster pair (N4 service and return -> N5 relief depth). **CONFIRMED at D1**, having
been provisional and at risk of folding into N4 in the first dossier pass.

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug: `qualifying-care-relief-explained-uk`
  (writer may refine; must resolve via `slug_resolver`).
- Grade: **NO-PAGE -> NET-NEW**, everything writable.
- Revert path: delete pre-deploy. Post-deploy it enters `monitored_pages` as a new surface.
- Shape: dated explainer, question H2s throughout, HS236-shaped.
- C1 gate: **C2 row 27 CLEAR**, with the standing benefits-claim-referral fence. **Not blocked.**
- **Why this page survived the fold test (delta D4, now closed).** The first pass parked N5 because
  gov.uk HS236 and LITRG appeared to own the informational head end to end, which would have made a
  peer page unwinnable. D1 disproved it: `accountaxzone.com` holds **p8** on
  `qualifying care relief 2025/26`. A commercial peer sits in the top ten on the head. The
  gov.uk-owned exclusion code is retired.

## 2. Equity register

None (net-new). Nothing frozen.

**Must NOT poach:** "should I hire an accountant", the tax-return walkthrough and the service
framing are N4's ground. N5 explains the relief and links.

## 3. Market keyword slice (ledger, 5 rows, 410/mo raw, all year-tagged)

| Keyword | Vol/mo | Ranking domains (D1) | Best peer |
|---|---|---|---|
| qualifying care relief 2024 25 | 90 | 1 | accountaxzone p28 |
| qualifying care relief 2024-25 | 90 | 2 | accountaxzone p27, tax-wise p104 |
| qualifying care relief 2024/25 | 90 | 2 | accountaxzone p31, tax-wise p104 |
| qualifying care relief 2025/26 | 70 | 2 | accountaxzone **p8**, caservices p89 |
| qualifying care relief 2025 26 | 70 | 1 | accountaxzone **p8** |

**Every single row carries a tax year in the query text.** That is the defining fact of this
surface and it dictates the lead structure. Readers are not asking what the relief is. They are
asking what this year's numbers are, and which year applies to the return in front of them.

The 2024/25 rows are more searched than the 2025/26 rows, which is exactly what you would expect
from people filing a return for a year that has ended. A page that answers only the current year
loses them.

## 4. Competitor teardown (head-term top ranker, fetched 2026-08-25)

`accountaxzone.com/qualifying-care-relief-scheme-uk/` holds **p8** on `qualifying care relief
2025/26` and `qualifying care relief 2025 26`, plus p27 to p31 across the three 2024/25 phrasings.
Title "Qualifying Care Relief Scheme UK (2025/26 Guide)". H1 "How Qualifying Care Relief Works
(2025/26 UK Rules) and Why Many Foster Carers Miss Out". **~3,200 words.**

It is, structurally, a good page and we should say so honestly. It puts the year in the title and
the H1. It runs a four-step calculation walkthrough (work out total fostering income, calculate the
allowance, compare the two, choose a method) with the simplified and actual-expenses options as
Option A and Option B. It carries a worked example, a "Most Foster Carers Do Not Pay Tax Under QCR"
section, a common-mistakes block, a how-to-fix-previous-years block, and a nine-question FAQ. That
structure is why it is at p8.

**Then it states the figures wrong.** Measured: it gives the fixed annual allowance as **£10,000**
and the weekly allowances as **£200 and £250**, presented as 2025/26. Those are pre-April-2023
figures. The current position is **£20,440 fixed plus £435 and £515 weekly**. Its worked example (a
child aged 12, 52 weeks) computes on the wrong numbers and reaches a wrong answer, on the page
ranking eighth for the query.

It also runs a "Strategic Tax Planning Opportunities for Foster Carers" section whose subheadings
include **"3. Spouse or household considerations"** and **"4. Interaction with benefits"**. That is
precisely the C1 row 27 fence. We do not follow it there, whatever it costs in coverage.

Em-dashes throughout. The page refused a direct fetch (403 bot wall) and was read through a
rendering fetcher; its headings and figures are real, the raw HTML was not held.

**Secondary: `tax-wise.co.uk`** at p104, which states **£18,140 / £375 / £450** untagged. Those are
2023/24. **`caservices.org.uk`** foster page at p89, 281 words, describes the relief in general
terms and states no amounts at all.

**Summary of the field, measured:** of the three pages ranking for a year-tagged query, one has
pre-2023 figures labelled 2025/26, one has 2023/24 figures labelled nothing, and one has no figures.
Not one page in the SERP correctly answers the question its query literally asks.

## 5. Whitespace (what §19.1 lets us own)

- **A dated figures block, at the top, covering both years.** Current per gov.uk foster-parent tax
  guidance: **£20,440 fixed per household for 2025/26, plus £435 a week per child under 11, £515 a
  week per child 11 or over, and £515 a week per adult.** HS236 (2025 edition) carries **£19,360 /
  £405 / £485 for 2024/25.** Both sets on the page, each labelled, plus one sentence telling the
  reader which set applies to the return they are filing. This alone beats the entire field.
- **The CPI-indexation point, said out loud.** These figures move each year and the gov.uk page and
  HS236 lag each other. Telling the reader that is why the field is full of stale numbers is both
  true and useful, and it can be said without naming anyone.
- **The election explained as an annual choice.** Simplified method (total receipts minus the
  qualifying amount, no expense records needed) versus profit method (receipts minus actual expenses
  and capital allowances), chosen each year, not locked in. The p8 page frames it as Option A and
  Option B and does not make the yearly nature clear.
- **Both worked, on one set of numbers.** The same carer's year computed both ways so the reader can
  see when each method wins. Nobody has this.
- **The full scope of qualifying care:** foster care, shared lives care, kinship and
  friends-and-family placements, staying put, and parent-and-child arrangements placed by a local
  authority, Health and Social Care Trust, fostering service provider or Shared Lives scheme. The
  field writes only about fostering and the relief is wider.
- **"You may still need to file even if you owe nothing."** The p8 page gets this right and it is
  worth matching, in our own words.

## 6. Fences (binding)

- **The C1 row 27 benefits fence is absolute, and this page is where the temptation is greatest**
  because the top-ranking competitor has a benefits section. No benefits-eligibility content, no
  interaction-with-benefits analysis, no help with a claim, no onward referral of a claimant. The
  ceiling is silence on the topic.
- **No household or spouse structuring content.** The p8 page's "Spouse or household considerations"
  is planning content on an audience doing care work. Not our shape.
- **Never mix tax years inside one worked example.** One year per example, labelled in the sentence.
  This is the rule the entire competing field breaks.
- **Never call fostering income "tax-free" without the qualifying-amount arithmetic shown.**
- **Write-time verification, mandatory before publish:** fetch the current HS236 helpsheet and the
  gov.uk foster-parent tax page and **pin the tax-year label on every figure** before publishing.
  The house position records this as an open question precisely because gov.uk states the amounts
  without a year tag. On a page whose entire proposition is dated accuracy, publishing an unpinned
  figure would be self-defeating.
- **No published house-position citations in reader copy.** Writer cites **§19.1**, **§2** and the
  C1 row 27 fence **in the build report only**. The reader sees gov.uk, HS236 and the relevant HMRC
  manual references.
- **No em-dashes.**
- **Rates date-tagged in the sentence**; the 2025/26-locked set (Class 4 6%, £12,570, £50,270)
  carries the natural-language **"still current when checked in August 2026"** tag in 2026/27 copy.
- **No competitor swipes.** The field's stale figures are our advantage, not our subject.
- **Intra-cluster:** no service-selling H2s, no accountant-choosing content, no tax-return
  walkthrough (all N4).

## 7. Acceptance criteria (deterministic)

1. **Queries answerable:** all five §3 year-tagged phrasings, in their year-tagged form; "what is
   qualifying care relief"; "how much can a foster carer earn before paying tax"; "simplified method
   or profit method"; "does qualifying care relief cover shared lives".
2. **Figures, recomputable and dated:** the fixed amount, the under-11 weekly rate, the 11-or-over
   weekly rate and the adult weekly rate, **for both 2025/26 and 2024/25, each labelled in the
   sentence**; the source named for each set (gov.uk guidance and HS236 respectively).
3. **Two worked examples on one set of receipts**, in a single stated tax year: the simplified
   method and the profit method side by side, with the difference stated and the point at which the
   answer flips. Persona **Petra**, city **Bangor**.
4. **Every H2 is a question.** Single H1 carrying the relief name.
5. **A dated figures block within the first screen**, before any prose about mechanics.
6. **Zero benefits content, zero household-structuring content.** QA greps for "benefit", "universal
   credit", "spouse" and "household" before sign-off and reviews every hit.
7. **Links:** N4 linked from body prose; resolver-clean; all house content floors and the coverage
   pass.
8. **No H2 duplicating an N1, N2, N3, N4 or E1 H2 phrasing.**
9. **Zero house-position section codes** in the published body.

## 8. Expectation

**Winnable, and unusually so for an informational surface, because the entire ranking field has the
figures wrong.** The p8 incumbent publishes pre-April-2023 amounts under a 2025/26 label. The p104
page publishes 2023/24 amounts with no label. The p89 page publishes none. A page that simply states
the correct amounts, for both relevant years, with their sources, is doing something no competitor
currently does.

Realistic: Google top-10 on at least two of the five year-tagged phrasings within a quarter of
indexing, with the three 2024/25 phrasings (best incumbent p27) the softer targets and
`qualifying care relief 2025/26` (incumbent p8) the harder one. Bing earlier. Maturity caveat
applies.

Volume caveat: the five rows are the same question asked with five date formats and will share
intent almost entirely, so 410/mo raw badly overstates distinct demand. Treat roughly 90/mo as the
honest figure. The surface stands: coverage over selection, and this is a page where being correct
is a durable advantage rather than a temporary one.

Maintenance note, and it is a real cost to accept up front: **this page goes stale by design every
April.** Its whole proposition is dated accuracy, so it needs the new CPI-indexed figures added each
tax year. That is a known, scheduled content cost, not a defect. Building a page whose competitors
all fail at exactly this task means committing to not failing at it.

Failure trigger: zero impressions on all five §3 phrasings at 90 days post-index.
