# VERIFY: Wave 11 compliance cluster (final read after fix rounds)

Date: 2026-08-21. Scope: 5 pages, five named checks, light pass, no rewriting.
Authority used: deletion-only residual fixes. Everything needing new words is a finding, not an edit.

## Verdicts

- VERDICT eicr-certificate-cost-landlords: clean
- VERDICT landlord-electrical-safety-certificate: clean
- VERDICT gas-safety-certificate-cost: residuals_fixed
- VERDICT how-to-book-an-epc: clean
- VERDICT epc-certificate-cost-uk: clean

## Deletions made (2, both on gas-safety-certificate-cost.md)

1. `metaDescription` was 157 chars, over the CI 155 limit. Deleted the word "typically":
   now "A landlord CP12 costs £60 to £120 for one boiler in 2026. Full price table, what
   moves a quote by a factor of two, and when a bundle saves money." = 147 chars. The hedge
   survives in the H1 lead paragraph, the summary and the FAQ, all of which say "typically costs".
2. H2 "What you are paying for, in one paragraph" -> "What you are paying for". The section
   carries two paragraphs after the fix round (what the fee buys, then verifying Gas Safe
   registration), so the heading was promising a shape the section no longer has. Deleted the
   orphaned clause only. No in-repo anchor links to the old heading (grepped).

No other edits. No new words added anywhere.

## Check 1 - structural integrity

Pass on all five. Specifics verified rather than assumed:

- **eicr-cost**: "diverge on five things" is followed by exactly five bullets. The refilled
  fixed-price section and the two worked examples read in the same voice as the surrounding copy.
  Back-references resolve: "the code table in our EICR obligations guide" - the sibling does carry
  a C1/C2/C3/FI table; "the remedial section below" resolves to the consumer-unit/rewire material
  in the price-includes section; "the ranges in the table above" resolves in both worked examples.
- **electrical-cert**: 8 exclusion bullets against "there are eight classes", with the removed
  ninth explained immediately after. The de-triplicated 28-day rule now appears once as a full
  statement (unsatisfactory-reports H2), once as a signpost ("covered below") and once applied in
  the Marcus timeline. No restatement drift.
- **gas-cost**: the drivers listicle is now a 5-row table; "Two rows need more than a cell" is
  followed by exactly two expanded rows (appliance count, who books it). "the reasons that justify
  one are set out below" resolves to that table. Summary promises a cost table, a driver table,
  the no-CP12 case, bundling, the agent markup and tax; all six are present as sections.
- **how-to-book-an-epc**: absorbed driver material all lands somewhere the closing line can point
  at. "Everything that moves a quote ... has already come up in the booking steps" names four
  things (route/margins, express fee, travel charge, floor area) and all four do appear earlier.
  Counted promises hold: four pre-booking questions = 4 bullets, three timeline stretchers = 3,
  three timing traps = 3.
- **epc-cost**: drivers now run as narrative (property, address, margin, timing, VAT) with no
  surviving "the N drivers" phrasing. "£30 to £80 above the direct price" checks out against the
  table's own agent-vs-direct columns (+£30 to +£80 across all four rows).

## Check 2 - internal consistency

Pass on all five. Arithmetic and figure agreement spot-checked:

- eicr-cost: £100/£180/£250/£350/£450 bands agree across summary, intro, table, FAQs and close.
  Yusuf 6 x £200 = £1,200 / cycle = £240/yr = £40 per property; +£150/property/cycle contingency
  = £420/yr; x0.6 = "about £250" after higher-rate relief. All correct. Tom £150 + £600 + £60 = £810.
- electrical-cert: Marcus timeline is internally exact. Inspection Tue 3 March (3 Mar 2026 really
  is a Tuesday), reg 3(4) 28 days counting the inspection date = Mon 30 March, reg 3(3)(b) 28 days
  of the inspection = Tue 31 March, work done 20 March + 28 days = 17 April. £5,000 penalty costing
  "over £8,000 of pre-tax profit" is right (£8,333 at 40%).
- gas-cost: £60-£120 base, £15-£35 per extra appliance, £75-£150 two-appliance, £90-£190 three,
  £100-£200 HMO, £110-£160 combined - identical in summary, intro, table, FAQs and the closing
  budget paragraph. Saoirse: £95x3 = £285, £65x3 = £195, £90 gross gap, £171 after tax, £54 net
  saving. All correct.
- how-to-book: 10-year validity, 7-day/further-21-day reg 7 backstop, 2-5 working day visit,
  1-2 working day lodgement, 30 min to 1.5 hr visit - each stated identically in FAQ and body.
- epc-cost: £200 penalty, 10 years, reg 9(2)(a)/(b) split, table ranges and the Gwen/Emyr example
  all agree. Gwen's £65 sits inside the direct terrace band (£50-£80); band D lodged 7 years ago
  leaves 3 years, consistent.

## Check 3 - pair consistency

**eicr-cost vs electrical-cert: pass.** Lane separation holds - the cost page carries no duty
detail it does not immediately hand back to the sibling, and the rules page carries no price
figures at all. Shared figures agree: £100 floor (cost page only, correctly), £40,000 per breach
with the £30,000 predecessor and the 1 November 2025 switch on both, SI 2025/1043 on both, 28-day
remedial clock counted from the inspection date on both, 7-day council deadline on both. Scotland
2015 / Wales Renting Homes / NI 1 December 2025 agree on both. The Housing Act 2004 s.249A
£40,000 cap and its 1 May 2026 rise also match landlord-licensing-explained.md (SI 2026/319),
which both pages link to.

**epc-cost vs how-to-book-an-epc: pass, with one note.** Register scope is "England, Wales and
Northern Ireland, Scotland separate" on both, in FAQ and body on both. Visit durations are
compatible ("30 minutes to an hour and a half" vs "between half an hour and an hour and a half").
Price ranges are compatible (£35-£120, agent-arranged higher). The reg 22 / reg 9(2) split works
as intended: the booking page keeps the detail (what an approved scheme must do - vetting, code
of conduct, complaints, indemnity, lodging; and the two practical consequences of reg 9(2) plus
the supersession trap), and the cost page states the bare rule and points across in both places.

Note (finding, no edit): a 10-word shingle scan across the two pages returns no verbatim twin
sentences, but the reg 9(2) test and the reg 22 membership clause are close paraphrases of each
other because both are paraphrasing the same statutory wording. Longest shared run is
"be a member of an accreditation scheme approved by the Secretary of State" (statutory language)
and the "entered on the register no more than [10/ten] years" clause, which then diverges
("before the date it is made available" vs "before the date you make it available";
"no newer certificate ... has since been lodged" vs "no later certificate ... has been registered
since"). I judged this acceptable - both pages need the test stated once - but if the standard is
zero near-twins, the cost page's is the one to compress further, since the booking page owns the detail.

## Check 4 - frontmatter sync

All five pass. No body FAQ section exists on any of the five, so no count to match against.

| page | faqs | metaTitle | metaDesc | generator | reviewedBy | reviewerCredentials | reviewedAt |
|---|---|---|---|---|---|---|---|
| eicr-certificate-cost-landlords | 11 | 56 | 151 | yes | yes | yes | yes |
| landlord-electrical-safety-certificate | 12 | 57 | 153 | yes | yes | yes | yes |
| gas-safety-certificate-cost | 12 | 57 | 147 (was 157) | yes | yes | yes | yes |
| how-to-book-an-epc | 12 | 59 | 155 | yes | yes | yes | yes |
| epc-certificate-cost-uk | 12 | 54 | 152 | yes | yes | yes | yes |

how-to-book-an-epc sits exactly on the 155 ceiling. Legal, but it has no headroom, so any later
touch to that string needs re-measuring.

## Check 5 - artefact sweep

Zero em-dashes (U+2014) and zero en-dashes (U+2013) across all five. Zero mid-sentence double
spaces. No severity tags, no "drop-in", no bracketed editor notes, no TODO/FIXME, no template
placeholders. A regex scan for repeated sentences (>45 chars, tags stripped) found no duplicated
sentences inside any body. Line endings are mixed across the set (gas-cost and how-to-book use
CRLF, the other three LF) - pre-existing, not introduced by the fix rounds, and harmless to the
renderer, so left alone.

## Findings not fixed (need new words or a judgement call, none blocking)

1. **electrical-cert, H2 "The four supply deadlines" over a five-row table.** The framing is
   deliberately reconciled in three places ("four separate deadlines plus a fifth once remedial
   work is finished" in the lead-in, the same phrasing in the FAQ, and the table header reading
   "Who must receive the report" so the fifth row is the confirmation rather than the report).
   It is coherent as written, so I did not delete "four" from the heading or from the
   metaDescription. Flagging because a reader skimming headings sees four and counts five.
2. **eicr-cost, illustrative report fee differs between FAQ and body.** FAQ 11 contrasts
   "a £150 report" with the £40,000 penalty; the body's tax section uses "£200 report" for the
   same contrast. Both sit inside the page's stated range and neither is a factual claim, but
   picking one figure would make the asymmetry line land harder.
3. **how-to-book-an-epc, "Step 0" is the only numbered heading.** The remaining sections are
   unnumbered, so the step language stops after step zero. Reads as a rhetorical device rather
   than a break, but it is the one place the page's structure does not do what its own label implies.
4. **epc-cost, FAQ CGT answer quotes "At £60 to £120"** where the page headline range is £35-£120.
   Defensible (seller-side, agent-arranged sales rarely hit the £35 floor) but it is the only
   figure on the page that does not start at £35.
5. **epc-cost / how-to-book near-twin statutory clauses** - see the note under check 3.
