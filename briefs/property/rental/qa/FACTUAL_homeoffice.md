# FACTUAL QA (adversarial, REFUTE): `claim-home-office-deduction-landlords`

Reviewed 2026-08-21 against the file on disk (full rewrite, uncommitted). Read-only pass, no edits made.
Core claim (s.94H flat rates do not reach a property business) treated as settled per
`qa/FACTUAL_rentalbatch.md` §34.2 adjudication and not re-litigated. Everything built on it was tested.

## VERDICT claim-home-office-deduction-landlords: all_clear

No blocker found. Every figure re-derived independently and reconciles to the last penny. All seven
on-page external sources fetched live and support the sentences they are attached to. Six internal
links resolve with the correct category segment. Statute count in body prose is 4 provisions, at the cap.
Seven advisories below, none of which changes a reader's number or decision.

---

## 1. Arithmetic re-derivation

Every figure recomputed from the stated inputs, not from the coverage note. 29 figures, 29 agree.

| Page figure | Re-derived | Status |
|---|---|---|
| Bills total £5,040 | 960+840+420+336+288+2,196 = 5,040 | OK |
| Room fraction 14.29% | 1/7 = 14.2857% | OK |
| Time fraction 28.57% | 10/35 = 28.5714% | OK |
| Business fraction 4.08% (10/245) | (1/7)(10/35) = 10/245 = 4.08163% | OK |
| Deduction £205.71 | 5,040 x 10/245 = 205.7142 | OK |
| Worth £82.29 at 40% / £41.14 at 20% | 205.7142 x 0.4 = 82.2857; x 0.2 = 41.1428 | OK (the coverage note's £82.28 -> £82.29 correction is right) |
| "about 43 hours a month" | 10 x 52/12 = 43.33, inside "25 or more", below "51 or more" | OK, correct band |
| Flat rate £120, £85.71 less | 10 x 12 = 120; 205.71 - 120 = 85.71 | OK |
| Tenant variant £793.47 | (5,040 + 14,400) x 10/245 = 793.4693 | OK |
| Exclusive-room claim £720 | 5,040 / 7 = 720.00 | OK |
| Extra £514.29 / £205.71 pa / £2,057 over 10 yrs | 720 - 205.7142 = 514.2857; x 0.4 = 205.7142; x 10 = 2,057.14 | OK |
| Gain £270,000 | 565,000 - 295,000 | OK |
| Restricted fraction 1/14, 7.14% | (1/7) x (10/20) = 10/140 = 1/14 = 7.1428% | OK |
| Chargeable £19,285.71 | 270,000 / 14 = 19,285.714 | OK |
| Taxable £16,285.71 | 19,285.714 - 3,000 | OK |
| CGT £3,908.57 at 24% | 16,285.714 x 0.24 = 3,908.571 | OK |
| Net "£1,851 down" | 2,057.14 - 3,908.57 = -1,851.43 | OK |
| AEA-already-used: £4,628.57, "£2,571 down" | 19,285.714 x 0.24 = 4,628.57; less 2,057.14 = -2,571.43 | OK |
| Company saves £450 at 25% / £342 at 19% | 1,800 x 0.25 / x 0.19 | OK |
| Director pays £432 at 40% / £216 at 20% | (1,800 - 720) x 0.4 / x 0.2 | OK |
| Net £18 / £126 a year | 450 - 432 = 18; 342 - 216 = 126 | OK |
| £312 a year, £6/week | 6 x 52 = 312 | OK |
| AEA £3,000; rates 18% / 24% | gov.uk CGT rates, 2026 to 2027 (fetched) | OK |
| £10 / £18 / £26 bands at 25 / 51 / 101 hours | ITTOIA 2005 s.94H table (fetched) | OK |

The apportionment basis is internally consistent throughout: the same 10/245 is applied to the
owner pot (£5,040) and the tenant pot (£19,440), and the CGT fraction correctly compounds the same
1/7 room share with 10/20 years rather than reusing the 4.08% income-tax fraction. No cross-
contamination between the two fractions, which is the usual failure mode on this page shape.

**ARITHMETIC: 29 figures re-derived, 29 reconcile, 0 discrepancies.**

## 2. Source verification (live fetches, 2026-08-21)

All seven external links on the page were fetched, not five. One extra (`s.272B`) was fetched to
test a fallback claim the page makes. All support their sentences.

| Source | Sentence it carries | Result |
|---|---|---|
| PIM2100 (updated 21 May 2026) | Both limbs, "fair and reasonable" standard, home-loan-interest scoping | **Supports.** Verbatim on page matches: *"Where a landlord genuinely runs the property business from home they may claim the extra business costs that they incur - such as the cost of extra lighting and heating"*; *"a proportion of all fixed expenses referable to that room may be deducted"*; examples *"rent they pay to their own landlord for their home, repairs, property insurance - as well as lighting and heating"*; *"It is impossible to lay down hard and fast rules... in a fair and reasonable way."* No flat rate, no simplified expenses, no £10/£18/£26 anywhere on the page. |
| ITTOIA 2005 s.272 | The import table, two Chapter 5A rows only | **Supports.** s.272(2) opens *"In relation to a property business whose profits are calculated in accordance with GAAP, the provisions of Part 2 (trading income) which apply as a result of section 271E(1) are limited to the following"*. Chapter 5A rows are exactly s.94C (corporate-partner exclusion) and *"sections 94D to 94G expenditure on vehicles"*. s.94H appears nowhere. s.272(1) omitted by F(No.2)A 2017 from 16.11.2017. |
| ITTOIA 2005 s.94H | "opens by saying it applies... a trade"; the three bands | **Supports.** Part 2 Chapter 5A, heading "Use of home for business purposes". Subsection (1) verbatim as quoted on the page. Table: 25 or more £10.00, 51 or more £18.00, 101 or more £26.00. |
| TCGA 1992 s.224 | The PRR restriction quote | **Supports as to subsection (1).** *"the gain shall be apportioned and sections 223 and 223B shall apply in relation to the part of the gain apportioned to the part which is not exclusively used for those purposes."* See advisory A1 on the time element. |
| EIM01476 (updated 12 Aug 2026) | £6/week, £26/month, no records, above-rate evidence | **Supports.** *"£6 per week or £26 per month for monthly paid employees"* from 6 April 2020; *"the employee does not have to keep any records to demonstrate the additional expenditure"*; *"Greater amounts can be paid where the employer provides evidence to justify them."* |
| gov.uk simplified expenses | Eligibility wording, landlords absent | **Supports.** *"sole traders, business partnerships that have no companies as partners"*; cannot be used by limited companies or partnerships with a corporate partner. Landlords and property businesses are not mentioned anywhere on the page. |
| gov.uk CGT rates | 18% / 24% and £3,000 AEA for 2026/27 | **Supports.** Page states tax year 2026 to 2027, allowance £3,000, 24% from 6 April 2026 above the basic-rate band. |
| ITTOIA 2005 s.272B (extra, not cited on page) | Tests the "20% reducer in any event" fallback | **Partially undercuts.** See advisory A3. |

**SOURCE: 8 fetched, 7 of 7 on-page externals verified as supporting, 0 dead links, 0 misquotes.**

## 3. Cross-page and cross-lock consistency

- **`docs/property/house_positions.md` §34 (as corrected 2026-08-21).** Agrees. §34.2's "ONLY route
  = ITTOIA s.34 actual-cost apportionment on a reasonable basis (PIM2100)" is exactly what the page
  writes. §34.2's do-not-write ("any flat-rate/simplified-expenses home-office claim for an
  unincorporated property business") is not breached; the flat rate appears only as the thing the
  reader is told they cannot use. §34.3 cross-tax discipline is satisfied and then some: the page
  prices the CGT consequence rather than merely flagging it. §34.4's Ltd Co mechanic is present in
  substance (£312 allowance vs formal rental, both with personal-side consequences), and the §34
  do-not-write "Ltd Co director can claim home-office on the corporation tax side directly without
  involving the director's personal tax" is not breached.
- **`landlord-tax-deductions-uk-2026-complete-list.md`.** Agrees on every material point. Its FAQ
  ("No. The simplified flat-rate amounts... are a trading-business relief under ITTOIA 2005 s.94H,
  and the property-business cash-basis rules in s.272ZA apply only the vehicle flat rates") and its
  body H3 both state the corrected position, and it already links here as the dedicated guide. The
  home-office page is broader (covers the GAAP table at s.272 as well as the cash-basis one), so it
  is a superset rather than a contradiction. No back-patch needed. One low-grade wrinkle at A6.
- **Mileage.** Both pages say 55p, consistent with the held ground truth and with the s.272 row the
  home-office page uses as its proof that the import list is real and selective.

## 4. Internal and external link resolution

All six internal `/blog/<category>/<slug>` hrefs resolve on disk and every category segment matches
the target file's own canonical:

| href | target canonical category | Status |
|---|---|---|
| `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` | capital-gains-tax | OK |
| `/blog/incorporation-and-company-structures/2027-tax-rates-incorporation-decision-property-landlords` | incorporation-and-company-structures | OK |
| `/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide` | landlord-tax-essentials | OK |
| `/blog/making-tax-digital-mtd/mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence` | making-tax-digital-mtd | OK |
| `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` | section-24-and-tax-relief | OK |
| `/blog/section-24-and-tax-relief/rental-income-tax-uk-complete-guide-landlords` | section-24-and-tax-relief | OK |

Seven external links, all `rel="nofollow noopener" target="_blank"`, all gov.uk or legislation.gov.uk,
all fetched successfully above.

## 5. Statute count

Body prose (tables excluded per `_language_spec.md`, source list excluded, `editorialNote` not
rendered by `BlogPostRenderer.tsx`): **4 provisions named** — ITTOIA 2005 s.94H, section 272,
ITTOIA 2005 s.34, TCGA 1992 s.224(1). At the cap, not over. `s.272ZA` correctly held out of prose.
The fifth string, "sections 94D to 94G", sits inside a verbatim quotation of the s.272 table row and
is part of that citation rather than a separate one. See A5 on density.

---

## Findings

**A1 [ADVISORY] "TCGA 1992 s.224(1) deals with a dwelling-house where part is used exclusively for
the purposes of a trade or business" (body H2 4) and "TCGA 1992 s.224(1) apportions the gain...
one room in seven used exclusively for 10 of 20 years of ownership makes £19,285.71 chargeable"
(FAQ 6).**
Why: s.224(1) apportions by the exclusive-use share only. It contains no time element. Applied
alone it would make 1/7 of the £270,000 gain chargeable, i.e. £38,571.43, not £19,285.71. The 10-of-
20-years halving comes from s.224(2): *"there have been changes as regards the use of part of the
dwelling-house for the purpose of a trade or business... the relief given by sections 223 and 223B
may be adjusted in a manner which is just and reasonable."* The page's headline number is therefore
derived under a subsection it never names, while the subsection it does name would, on its own,
produce a number twice as large. The outcome is right and matches HMRC practice; the attribution is
not. Not a blocker: no reader reaches a wrong figure or a wrong decision.
Drop-in fix: delete the subsection number in both places. Write "TCGA 1992 s.224" instead of
"TCGA 1992 s.224(1)" (three occurrences in body prose and FAQs 6 and 9). This is correct for both
limbs, needs no new citation, and holds the statute count at four.

**A2 [ADVISORY] "The second level is a share of what your home costs you anyway. Where a room is set
aside for the business, 'a proportion of all fixed expenses referable to that room may be deducted'"
(body H2 3), repeated as "a proportion of the fixed costs of a room you set aside" in `summary` and
FAQ 1.**
Why: HMRC's actual condition is *"Where a specific part of their home is used **exclusively** for
running the property business for a significant amount of time, **whether continuously or at
particular times**"*. The page's paraphrase "set aside" drops both halves. Dropping "exclusively"
understates what the reader must be able to evidence. Dropping "whether continuously or at
particular times" costs the page its own best argument: that clause is what authorises Helen's
£205.71, which applies a fraction to all six fixed costs rather than to extra lighting and heating
alone. As written, the page's stated two-level framework does not authorise its own worked example
(level one is extra light and heat; level two is presented as requiring a set-aside room), while
HMRC's full sentence does. Substantively the page lands in the right place; the omission is what
makes it look like it has not.
Drop-in fix: in H2 3, replace "Where a room is set aside for the business," with: "Where a specific
part of your home is used exclusively for the business for a significant amount of time, 'whether
continuously or at particular times',". Then in H2 4, "Set the room aside properly" becomes "Make
that use continuous rather than at particular times", which is the actual line between the £205.71
and the £720 and the actual trigger for the CGT restriction.

**A3 [ADVISORY] "for an individual landlord residential finance costs give a 20% tax reducer rather
than a deduction in any event" (body H2 3 and FAQ 5).**
Why: the primary reason given for the "no" is correct and verified — PIM2100's interest-splitting
paragraph sits under the express sub-heading *"Interest on a loan on landlord's own home that is
partly let"*, so FAQ 5's statement of why the provision was dropped is accurate as to the provision's
target (check 4: PASS). The fallback is shakier. ITTOIA 2005 s.272B defines a dwelling-related loan
as *"so much of an amount borrowed **for purposes of the business**"* referable to generating income
from a dwelling-house. A mortgage taken out to buy your own home was not borrowed for purposes of the
property business, so it is not obvious that s.272A catches it, and if it does not, the "20% reducer
rather than a deduction" characterisation does not hold. The page does not need this limb: the
"not a cost of the lettings business" reason is sufficient and sourced. Two counterweights keep this
below blocker: the conclusion is a "no", so a reader who follows it cannot over-claim, and PIM2100's
own "exceptionally heavy expenses" passage speaks of *"the let **or office** part of the home"*,
which is the strongest available argument the other way and is itself an argument the page's flat
"no" would have to answer.
Drop-in fix: cut "in any event" and the reducer clause from FAQ 5, leaving "Interest on the loan
secured on the home you live in is not a cost of the lettings business. HMRC's provision for
splitting home loan interest is aimed at a different case, where part of your home is genuinely let
out to a tenant." Keep the reducer sentence in the body list, where it is describing buy-to-let
finance costs generally and is unambiguously right.

**A4 [ADVISORY] H2 4 heading: "that room costs £3,908 on sale".**
Why: the figure is £3,908.57 everywhere else on the page (`summary`, FAQ 6, FAQ 7, the table, the
CTA). £3,908 is a truncation, not a rounding; rounded it is £3,909. A heading that disagrees with
the table underneath it by 57p is the kind of thing a hostile reader screenshots.
Drop-in fix: "that room costs £3,909 on sale" in the H2, or carry the full £3,908.57.

**A5 [ADVISORY] Coverage note §4.1: "counting the external-sources link list at the foot of the page
as well it is 12, or 4.0 per 1,000, still at the cap."**
Why: the count is 13, not 12 (the note misses "sections 94D to 94G" in the s.272 quotation), against
2,931 body prose words, which is 4.43 per 1,000 and marginally **over** the `_language_spec.md`
rule 1 cap of 4.0, not at it. Body prose excluding the source list is 8 references, 2.73 per 1,000,
comfortably inside. So the page passes on any reading that treats a foot-of-page source list as
apparatus rather than prose, which is the reasonable reading, but the coverage note's arithmetic
should not be relied on. The QA gate as set (4 provisions in prose) is met either way.
Drop-in fix: none needed on the page. Correct the coverage note's figure to 13 / 4.43 and record the
apparatus-not-prose call explicitly, so the next reviewer is not re-deriving it.

**A6 [ADVISORY] Cross-page: `landlord-tax-deductions-uk-2026-complete-list.md` line 402, "Home
office (apportioned share of household running costs): £120".**
Why: no contradiction in substance, but £120 is exactly £10 x 12, the flat-rate figure the home-
office page spends a section telling readers they may not use, and the two pages link to each other.
A reader who arrives from the deductions page sees £120 labelled as an apportioned share and then
reads "£120 a year. The rule that does not apply to her". The collision is cosmetic and avoidable.
Drop-in fix: change the sibling page's worked-example line to £118 or £135. One-character-class edit,
no arithmetic elsewhere on that page depends on it (its £620 aggregate and £124 payoff would need the
same shift, so £120 -> £118 with £618 and the payoff re-derived, or simply leave it and accept the
optics).

**A7 [ADVISORY] Opening paragraph: "Those flat rates belong to sole traders", and H3: "the sole
trader flat rate".**
Why: s.94H(1)(b) extends to *"where the person is a firm, the use of a partner's home"*, and the
page's own quoted gov.uk eligibility wording three paragraphs later says "sole traders, business
partnerships that have no companies as partners". The shorthand contradicts the page's own quote.
Immaterial to the reader, who is a landlord either way.
Drop-in fix: "Those flat rates belong to traders" in the opener, "the trader flat rate" in the H3.

---

## What was tested and found clean

- The two PIM2100 limbs are quoted verbatim and accurately (subject to A2's paraphrase of the
  condition attached to the second).
- The "fair and reasonable" standard is quoted in full and correctly framed as a standard rather
  than a formula.
- s.272's import table is characterised exactly right, including that it is a closed list of two
  Chapter 5A entries and that the vehicle rates coming across is what makes the s.94H omission
  deliberate rather than accidental.
- The £26 collision between s.94H's top band and EIM01476's monthly-paid equivalent is real and is
  correctly identified as the likely origin of the estate-wide error.
- The £312 / £6-week employer allowance, its no-records feature and the above-rate evidence
  requirement all match EIM01476 as at 12 August 2026.
- AEA £3,000 and 18%/24% match gov.uk for 2026 to 2027.
- FAQ 5's account of why the mortgage-interest claim was dropped is accurate as to the provision's
  target (PIM2100's sub-heading names "partly let" explicitly). Check 4: PASS.
- No PropertyTaxPartners pricing on page. Zero em-dashes. `editorialNote` confirmed non-rendering,
  so its dense statute references do not count against the page.
