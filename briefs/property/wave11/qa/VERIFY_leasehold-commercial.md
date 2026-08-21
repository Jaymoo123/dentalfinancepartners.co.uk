# VERIFY: Wave 11 leasehold + commercial (final read after fix rounds)

Reader: final verification pass, 5 named checks, no rewriting.
Run: 2026-08-21. Authority used: deletion-only residual fixes.

Checks applied per page:
1. Structural integrity (headings, orphaned references, seams, table HTML)
2. Internal consistency (every repeated figure re-added)
3. Cross-page consistency (sibling pages, calculator, house_positions §31.3a)
4. Frontmatter sync (faq count, meta lengths, required fields)
5. Artefact sweep (em-dashes, QA tags, double spaces, splice duplicates)

---

## VERDICT lease-extension-cost-uk: residuals_fixed

**Deletion applied.** The tax H2 opened `Everything above, premium and fee stack
alike, is capital expenditure. That has four consequences, one disappointing and
three you can act on.` The section now carries FIVE bold consequence paragraphs
(no deduction / CGT base cost / company-held flats / the £40,000 line / keep the
paperwork). The tax-lane expansion added the company-held paragraph and left the
count stale. Deleted the counting sentence; the paragraph now reads
`Everything above, premium and fee stack alike, is capital expenditure.` and the
five bold paragraphs follow unannounced. If a counted signpost is wanted back,
that needs new words (five / one disappointing and four you can act on) and is
outside deletion authority.

**Arithmetic re-added, all clean:**

- Fee table: 800+600+600+600+150 = **2,750**; 1,300+900+1,300+900+300 = **4,700**.
  Headline £2,750-£4,700 agrees.
- Bridge to £3,600-£6,600: professional lines 2,600-4,400 (the four professional
  rows, disbursements excluded), VAT 520-880, negotiation £150-£200/hr x 2-5h,
  disbursements 150-300. Low ~3,630, high ~6,780 before rounding. The two bases
  ARE clearly distinguished on the page: line reads `Budget £2,750 to £4,700 for
  the stack as a whole, excluding VAT and any valuer negotiation time... Add both
  and the same stack becomes roughly £3,600 to £6,600, which is the VAT-inclusive
  basis used in our guide to what a lease extension solicitor does.` No finding.
- Priya, 84 years, £300k, £150 rent: term 150 x 14.24 = £2,136 ("around £2,100"),
  reversion 300,000/1.05^84 = £4,977 ("around £5,000"), sum £7,113 inside the
  stated £6,500-£7,500. At 79 years: reversion £6,353 ("around £6,400"),
  marriage value at 93% relativity = (300,000 x 0.07) - 8,486 = £12,514 uplift,
  half = £6,257, inside the stated £5,000-£7,000; premium £13,500-£15,500 inside
  the stated £13,000-£16,000. FAQ 2 repeats £5,000-£7,000 of £13,000-£16,000: agrees.
- Nadia derivation, £450k / 72 years / £200 rent: term 200 x 14.176 = **£2,835**
  (page says "around £2,800"), reversion 450,000/1.05^72 = **£13,417** (page says
  "around £13,400"). Marriage value at 88-91% relativity gives an uplift of
  £24,200-£37,700 (page: "roughly £25,000 to £37,000"), half = £12,100-£18,900.
  Premium range computes to £28,400-£35,100; page states "near £29,000" and
  "somewhere between £28,000 and £35,000". Both bracket the computation. Fees
  "roughly £4,400": midpoint professional lines 3,500 + VAT 700 + disbursements
  225 = £4,425. Agrees.
- The £40,000 pivot: same flat at 60 years, reversion 450,000/1.05^60 = **£24,090**
  (page: £24,100), term £2,808, marriage-value share £20,300, total £47,198
  (page: "roughly £47,000"). Agrees, and £29,000 correctly sits below £40,000.
- FAQ 1 all-in: 6,000+2,750 = **8,750**; 8,000+4,700 = **12,700**. Agrees, and
  the intro paragraph carries the identical pair.
- Band table: every all-in cell = premium + 2,750 / premium + 4,700. All six rows
  re-added and correct (5,750-10,200; 6,750-11,200; 7,750-12,700; 9,250-14,700;
  14,750-22,700; 20,750-44,700+).
- FAQ 1's £350k flat at 85 years gives premium £6,000-£8,000 vs the band table's
  £5,000-£8,000 for a £300k flat at 85-90 years. Higher value, narrower band:
  consistent, not a conflict.
- CGT sting: 24% x £15,000 = £3,600. Agrees.

**Structure:** H2 flow intact. All counted signposts other than the one deleted
verify (two layers, three premium components, two adjustments, capped twice over,
one route missing). Tables well-formed (3-col and 5-col, no row mismatch).

**Cross-page:** every shared fee figure matches the solicitor page; each page
names the other's basis. Calculator
`src/lib/calculators/tools/lease-extension-premium-calculator.ts` carries
`FEES_LOW = 2_750` / `FEES_HIGH = 4_700` described as "excluding VAT", which is
the blog's stated ex-VAT basis. Consistent.

**Frontmatter:** faqs 12; metaTitle 59; metaDescription 149; generator,
reviewedBy, reviewerCredentials, reviewedAt all present. dateModified 2026-08-21.

**Artefacts:** zero em-dashes, zero QA tags, zero double spaces, no splice dupes.

---

## VERDICT lease-extension-solicitor-what-they-do: clean

**Rebuilt tax H2.** "Where the fees land in your records" opens `Three
instructions to give your solicitor at the start` and delivers exactly three bold
instructions, then a fourth paragraph correctly flagged as `One point of timing
sits outside the solicitor's remit.` Seam reads as one voice.

**Ayesha fee stack re-added:** 950 + 700 + 525 + 900 + 750 + 180 + 435 = **£4,440**,
matching the stated total. VAT £435 = 20% of her own professionals only
(950+700+525 = 2,175), which the sentence explicitly says. Negotiation £525 = 3h
x £175, inside the £150-£200 band. Freeholder's legal £900 after a £250 reduction
implies an initial £1,150, inside the £600-£1,300 row. Later text calls it a
`seven-line statement`: seven lines present. All clean.

**Trimmed fee table:** 8 rows, 5 columns, no mismatch. Freeholder rows
600-1,300 + 600-900 = **£1,200-£2,200**, matching the intro and FAQ 4's combined
figure and the cost page's FAQ 4. VAT illustration `on £4,000 of aggregate fees
it is £800` correct.

**Bridge basis:** stated twice and correctly attributed both times. Intro: `£3,600
to £6,600 of professional costs before the premium... our guide to what a lease
extension costs prices the identical stack at £2,750 to £4,700 because it quotes
the fee lines alone, before VAT and negotiation time.` FAQ 3 repeats it as `the
same money on a narrower basis`. The two bases are distinguished on both pages.

**LOW NOTE (no edit, needs words):** the worked-stack paragraph ends `Every pound
of it is capital expenditure, which is where the tax section comes in.` The H2 it
points forward to is now titled "Where the fees land in your records", so "the tax
section" is a loose rather than wrong pointer. Left alone: the section genuinely
carries the capital/CGT lane, and deleting the clause removes a working bridge.

**Frontmatter:** faqs 11; metaTitle 52; metaDescription 152; all four required
fields present. dateModified 2026-08-21.

**Artefacts:** zero em-dashes, zero QA tags, zero double spaces.

---

## VERDICT leasehold-reform-act-2024-what-is-in-force: clean

**Regrouped table renders sanely.** 4 header cells. Three group-label rows, each
`<tr><td colspan="4"><strong>...</strong></td></tr>` — colspan matches the column
count exactly. All 16 data rows carry exactly 4 `<td>`. Programmatic column-count
check across every table on the page: zero mismatches.

**The 5 new rows all verify as not-in-force and none contradicts §31.3a:**

| New row | Basis cited on page | §31.3a |
|---|---|---|
| Ban on new leasehold houses (Part 1, ss.1-26) | no commencement SI; s.1 note "not in force at Royal Assent, see s. 124(3)" | not listed; no conflict |
| Insurance cost limitation + information duty (ss.59-60, inserting LTA 1985 ss.20G-20I) | no SI; s.59 s.124(3) note | not listed; no conflict |
| Estate management package (Part 5, ss.72-99) | no SI; s.72 s.124(3) note | not listed; no conflict |
| Redress schemes (Part 6, ss.100-111) | no SI; s.100 marked prospective | not listed; no conflict |
| Rentcharges (Part 7, ss.112-113) | no SI; s.112 s.124(3) note | not listed; no conflict |

**The 11 rows that overlap §31.3a match exactly:** s.27 IN FORCE 31 Jan 2025
SI 2025/57; RTM ss.49, 50, 51-52 + s.64 as regards RTM IN FORCE 3 Mar 2025
SI 2025/131; building safety ss.114-116 + s.120 in part IN FORCE 31 Oct 2024
SI 2024/1018; marriage value (s.36 + Sch 4) NOT IN FORCE with the "yet to be
applied" annotation; 990-year (s.33) NOT; prescribed rates (s.37 + Sch 4) NOT,
consultation closes 23 Sep 2026; costs reform ss.38-39 / 1993 Act s.60 repeal NOT,
"changes yet to be applied"; Part 4 service charges NOT, SI 2024/1018 commenced
nothing from Part 4; £250 cap DRAFT ONLY, Commonhold and Leasehold Reform Bill,
May 2026 King's Speech. "Exactly three commencement SIs, no Commencement No. 4"
matches §31.3a's 2026-08-15 re-verification. ARC Time citation, Divisional Court,
dismissal 24 Oct 2025 and pending Court of Appeal permission all match.

**LOW NOTE (no edit, needs words):** the Part 4 row is labelled `(Part 4, ss.53
onward)`. §31.3a scopes it to ss.53-58, and the page's own next row separately
claims ss.59-60 for insurance. "ss.53 onward" therefore overlaps the following
row. Not a wrong claim (both rows are NOT IN FORCE), but "ss.53-58" would be
tighter. Fixing needs new words.

**Structure:** the post-table prose references survive the regrouping. `Three
states, then... That last row` maps to the single row under "Not in this Act at
all". `Two rows deserve a note` maps to the Part 1 and Part 5 rows, both present.
The s.60/s.60 numbering-trap paragraph matches the insurance row. FAQ 3's
in-force summary matches the table's In force group exactly. No orphans.

**Frontmatter:** faqs **14** (12→14 confirmed); metaTitle 59; metaDescription 154;
all four required fields present. dateModified 2026-08-21, matching the page's own
"as at 21 August 2026" and "Last verified: 21 August 2026" claims.

**Artefacts:** zero em-dashes, zero QA tags, zero double spaces.

---

## VERDICT right-to-manage-explained: residuals_fixed

**Deletion applied.** Double blank line left by the costs-section splice, between
the s.87A undertaking paragraph and `<h3>A worked go or no-go`. Collapsed to one.
Cosmetic only.

**Costs section cut to pointer reads clean.** The freeholder-costs lane is now
one paragraph ending `The mechanics, and where that residual risk sits, are set
out in our RTM process guide`, then the own-side cost table. No orphaned
references to removed costs detail anywhere on the page.

**s.74 row split verified.** The two-column gain/keep table has 5 rows on each
side, no s.74 row. The split-out point sits immediately after as prose:
`One thing does change in the freeholder's favour, and it belongs in neither
column.` The seam is deliberate and reads as one voice.

**Internal consistency:** formation £100 (£124 on paper); solicitor £1,500-£3,500
in the cost table, the FAQ and the alternatives table — three occurrences, all
agree. Worked example 100 + 2,500 = **£2,600** split four ways = **£650** each,
quoted twice in the paragraph and both times £650. 40% non-residential under the
50% cap and over the old 25% limit: correct. Six of six qualifying tenants clears
two-thirds; four of six clears half. All counted signposts verify (three s.72
conditions, four Sch 6 exclusions, three numbers, four responses in the
alternatives table, tax splits three ways).

**Cross-page vs the RTM trio:** £100 digital / £124 paper matches
`right-to-manage-company-setup.md`. The closing pointer `cannot lawfully complete
in under about four and a half months from the first notice, and commonly takes
four to six, while a disputed one adds a tribunal stage and often runs past a
year` matches `right-to-manage-process-steps.md` (14 days + 1 month + 3 months
floor; four to six uncontested; a year or more contested). Section 50 / ss.87A-87B
and the 3 Mar 2025 SI 2025/131 date match the LAFRA ledger page.

**Frontmatter:** faqs 12; metaTitle 54; metaDescription 151; all four required
fields present.

**MINOR NOTE:** dateModified and reviewedAt are still 2026-08-15 while the body
was edited in the fix rounds today. Not a check-4 failure (fields are present),
but the other lease pages carry 2026-08-21.

**Artefacts:** zero em-dashes, zero QA tags, zero double spaces.

---

## VERDICT commercial-epc-requirements: clean

**DEC penalty table split verified.** The two DEC rows now read
`Failure to hold a valid advisory report (reg 14(3)(a)) | £1,000` and
`Failure to display a required DEC (reg 14(3)(b)) | £500`. The sub-paragraph
letters were checked against legislation.gov.uk (SI 2012/3118 reg 14(3)):
(a) is the possession-of-a-valid-report duty, (b) is the display duty. **The
page's letters are correct**, and the "opposite way round to intuition" framing
holds. Body prose (`£1,000 for failing to hold a valid advisory report, a breach
of regulation 14(3)(a), and £500 for failing to display the DEC itself, a breach
of regulation 14(3)(b)`) and the rewritten DEC FAQ (`breaches of regulation
14(3)(a) and 14(3)(b) respectively`) both agree with the table. Three statements
of the same fact, all aligned.

**Penalty formula re-added:** £22,000 x 12.5% = **£2,750**; £3,000 x 12.5% =
**£375**, below the £500 floor so lifted to £500; £750 no-rating-list default.
2,750 + 500 + 750 = **£4,000**, matching "£4,000 in total". The "what is the fine"
FAQ repeats £2,750 / £375 lifted to £500: agrees. The £500 minimum / £5,000
maximum / 12.5% triplet is stated four times across summary, intro, table and FAQ
and is identical each time.

**Two rewritten FAQs** (the DEC comparison and the penalty FAQ) both track the
body without duplicating its sentences. No splice residue.

**Other repeated figures:** reg 35 production penalty £200 (body + FAQ, agree);
air-conditioning £300 and the 12kW threshold (body twice, agree); dwelling EPC
breach £200 fixed; 10-year validity from registration under reg 9(2) (summary,
FAQ, body, all agree); 50 sq m stand-alone exemption; 7-day then 21-day marketing
windows; 28 days to pay or request review, 28 days to appeal to the county court
under reg 40. Callum's VAT worked example: £450 + 20% = £540, £90 irrecoverable,
opted-to-tax neighbour's true cost £450. Correct.

**Structure:** three tables, all well-formed (3, 4 and 2 columns, no row
mismatches). No orphaned references to the pre-split single DEC row. Counted
signposts verify (three trigger points, three certificate regimes, three
exemption categories in the FAQ against reg 5's fuller list, three buildings in
the worked example).

**Frontmatter:** faqs 12; metaTitle 54; metaDescription 148; all four required
fields present.

**MINOR NOTE:** dateModified / reviewedAt still 2026-08-15 despite today's edits.

**Artefacts:** zero em-dashes, zero QA tags, zero double spaces.

---

## Cross-cutting

**CONCURRENT EDITS IN FLIGHT.** Files changed underneath this read during the
pass. `right-to-manage-explained.md` renamed its worked-example persona Nadia to
Sunita, and `commercial-epc-requirements.md` renamed Nadia to Renata, between the
first read and the verification greps. A persona-dedupe pass appears to be
running across the wave (18 blog files are modified in git status). Every rename
was checked for completeness afterwards: cost page Nadia x2, solicitor page
Ayesha x2 / Tom x2, LAFRA Dev x2, RTM Sunita x2 + Mark + Elena, EPC Callum x2 +
Renata x1. No half-renamed personas, no orphaned old names, and no persona now
collides across the five pages. Verdicts are true as at the end of this pass; if
the dedupe pass continues, re-run the persona grep before sign-off.

**Em-dash sweep (U+2014):** 0 hits across all five pages.

**Calculator basis:** `FEES_LOW = 2_750` / `FEES_HIGH = 4_700`, commented
"excluding VAT", plus a caveat string that reproduces the s.60 and
repeal-not-in-force framing. Consistent with both lease pages.

## Deletions applied (2)

1. `Property/web/content/blog/lease-extension-cost-uk.md` — deleted the sentence
   `That has four consequences, one disappointing and three you can act on.`
   (stale count: five consequence paragraphs now follow).
2. `Property/web/content/blog/right-to-manage-explained.md` — deleted one of two
   consecutive blank lines before `<h3>A worked go or no-go`.

## Findings for the caller (3, all need words, none blocking)

1. cost page: the deleted signpost can be restored as "five consequences, one
   disappointing and four you can act on" if a counted lead-in is wanted.
2. solicitor page: `which is where the tax section comes in` points forward to an
   H2 now titled "Where the fees land in your records". Loose, not wrong.
3. LAFRA page: Part 4 row scoped `ss.53 onward` overlaps the ss.59-60 insurance
   row below it; §31.3a scopes Part 4 transparency to ss.53-58.
