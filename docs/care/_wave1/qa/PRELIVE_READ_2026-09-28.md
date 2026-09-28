# Care, pre-live sceptical read (Wave 1)

Date: 2026-09-28. Site: care (Care Home Tax). Read against section 1 and 2 of
`docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md`, `docs/care/house_positions.md`,
`care/web/src/app/terms/page.tsx` and the `entity` key in `care/niche.config.json`.
Read-only pass. Nothing was edited. 15 pieces: 2 segment pages, 13 posts.

**READY 13 / FIX-FIRST 2 / NOT-READY 0. Banned-string hits in the pieces: zero.**

## Per piece

Changed since QA = the file changed after both Track A and Track B passed.
All 13 posts landed in one commit, `99389fb6`, and nothing has touched them since.
Both segment-page rows landed in `d774ad28`; the later live-copy fix `25a7470e`
("fifteen advice-giving self-claims") touched only the five older hub rows, not these two.
I re-verified both new rows field by field against the writer JSON in
`docs/care/_wave1/*.json`: every intro, card body, FAQ answer, title and meta is
byte-identical to the QA'd text.

| Piece | Type | Changed since QA | Grade | The decider's question this answers | Specific | Banned hits | Reason |
|---|---|---|---|---|---|---|---|
| self-employed-carers-and-personal-assistants | segment page | n | READY | "I am a self-employed carer or PA. Do I need CQC registration, do I charge VAT, and should I go limited?" | yes | none | Answers all three in the first 150 words, and gets the counter-intuitive part right: the carve-out that keeps you out of registration also keeps you out of the exemption. Every figure traces (HP 3, 7, 8, 27, 28). |
| care-franchisees | segment page | n | READY | "I am about to sign a home care franchise agreement. What is the fee treated as, who holds the registration, and what does year one cost?" | yes | none | The strongest piece in the wave. The "two positions at once" frame is not reusable on another site, the BIM57620 and CIRD11500 split is the real answer, and the cash-trough point is a decision rather than a rule. |
| business-asset-disposal-relief-selling-a-care-business | post | n | READY | "I am selling my care business. What will the tax be, and what could remove the relief?" | yes | none | Carries the correct £140,000-versus-£60,000 comparison including the house-positions caveat about the standard rate in the 10% era. Names the three sector-specific eligibility breaks. |
| care-personal-assistant-vat-registration | post | n | READY | "Do I have to register for VAT, and what counts towards the £90,000?" | yes | none | The "client money you hold versus travel you recharge" distinction is the answer a PA actually needs, and the inversion on hiring a second carer is the decision behind it. |
| care-structure-before-cqc | post | n | READY | "Which structure do I register with CQC as, before I apply?" | yes | none | The load-bearing fact, that a change of business type means a fresh provider application, is sourced to CQC's own change-of-business-type guidance. Correctly owns the corporation tax recital for the wave. |
| cost-to-set-up-a-care-agency | post | n | FIX-FIRST | "How much capital do I need before I can raise the first invoice?" | yes | none | Content is right and the CQC fee figures verify, but the intro states the cap without the hedge its sibling carries, and the 2024/25 scheme label sits unqualified in the opening paragraph of a 2026 post. One sentence. |
| cqc-registration-domiciliary-care-finance | post | n | READY | "What will CQC charge my agency, and what financial evidence must I produce with no premises?" | yes | none | The "formula and a gap" frame is specific to domiciliary. Explicitly hedges the scheme year and points to CQC's invoice as governing. |
| how-to-start-a-domiciliary-care-agency-money-decisions | post | n | READY | "I am starting an agency. In what order do I take the money decisions?" | yes | none | Ordering is the value, and each of the six steps genuinely narrows the next. Highest-intent piece in the wave. |
| nhs-continuing-healthcare-accounts | post | n | FIX-FIRST | "A resident has moved to CHC. What changes in my accounts?" | partly | none | The only piece written for a reader rather than a decider. The facts are right and the FNC-versus-CHC table is good, but the opening frames a bookkeeping consequence, not a decision. One sentence. |
| opening-a-childrens-home-finance | post | n | READY | "I am opening a children's home. What will Ofsted test on the money?" | yes | none | Regulation 47 as a continuing duty with no CQC-style template is the finding, and the Ofsted-equals-state-regulated VAT point is sourced to Notice 701/2. Independent of the CQC track. |
| supported-accommodation-registration-and-tax | post | n | READY | "I supply housing and support but no personal care. Who registers me, and is my support charge exempt?" | yes | none | Three routes, three VAT answers, with the 2023 transitional concession correctly described as spent rather than current. |
| supported-living-company-structure-before-framework-bid | post | n | READY | "How do I structure the company before I bid for a framework place?" | yes | none | Section 22 of the Procurement Act 2023 as a cap on what a portal may demand is a genuinely useful answer nobody else gives. RCB 2/2025 carries the "where it judges refusal necessary" qualifier in all four places. |
| supported-living-contract-forecast | post | n | READY | "What does a forecast a lender will accept have to contain?" | yes | none | Hours-upward, monthly for 24 to 36 months, per-head NIC rather than a blanket percentage. The example table is labelled as illustrative, which it has to be. |
| vat-grouping-care-brief-2-2025 | post | n | READY | "Does the brief hit my group, and if it does, what do I decide now?" | yes | none | The best analytical piece here: the section 43C two-route point, and that only one route reaches backwards, is the decision the brief itself does not make explicit. |
| vat-on-domiciliary-care | post | n | READY | "Do I put VAT on my care invoices, and what does the answer cost me?" | yes | none | Answers in the first clause, then earns the rest with the approval-date point and the supply-of-staff boundary. |

### Figures re-checked, not just re-read

Spot-checked against `house_positions.md` and the 2026-09-27 addenda: BADR 18% and the
£1,000,000 lifetime limit at TCGA 1992 s.169N, CGT annual exempt amount £3,000, NLW £12.71
and £10.85, employer NIC 15% above £5,000 (£96 a week), Employment Allowance £10,500, AMAP
55p to 10,000 miles, holiday accrual 12.07%, corporation tax 19%/£50,000/25%/£250,000,
dividends 10.75%/35.75%/39.35% above £500, MTD-IT £50,000 then £30,000 then £20,000, VAT
threshold £90,000, partial-exemption de minimis £625 and the under-half limb, FNC £267.68 and
£368.24, CQC community fee £239 plus £54.305 to £92,558, WDA 14% and the 40% FYA, AIA
£1,000,000, SBA 3%, reg 47, CSA 2000 s.11, SI 2023/416. Every one traces. No figure looked
wrong to me, and none has moved since the Track A reports.

### Template and open owner calls, graded as open rather than as defects

- `care/web/src/app/blog/[category]/[slug]/page.tsx:175` renders
  `<h2>Need specialist care sector finance advice?</h2>` on all 13 posts. Heading-class item
  under the 2026-09-12 ruling. **Open owner call, not a defect of any piece.**
- `care/web/src/data/care-services.ts:299` card title "Advise on acquisition structure with
  the CT and BADR consequences modelled", and the `metaDescription` at line 255
  ("acquisition-structure advice"). Same class. Not on the routes in this wave.
- `care/web/src/app/page.tsx:106` homepage H1 "Accountants for UK care providers." Title-class
  item under the same ruling. Noted, not graded.
- No `CtaBand` exists on care, so that one of the four is a charities surface only.

### Positioning against the terms page

The entity block says Care Home Tax "is not an accountancy practice and does not give advice",
and that a partner firm does the work. The terms page never says that. Its section 1 gives the
Ashfield Trading Ltd identity correctly, but section 2 says "Formal engagements for
professional services are subject to separate written engagement letters" and "No
accountant-client relationship is created", which reads as though this site could be engaged
for professional services. That is a mismatch between the two surfaces, not a defect in any
Wave 1 piece, and it is the kind of gap that a machine reading both pages resolves in the
wrong direction. Flagged for the owner, ranked below the piece-level fixes.

## Cross-piece: does it read as one site or fifteen fills of one template?

**Verdict: one site by one voice on the openings, one visible mould on the closings.**

Openings are genuinely varied, and several of them commit to an answer in the first clause,
which is the shape the programme's theory wants:

- "No, in almost every case you do not." (`vat-on-domiciliary-care`)
- "Only once your taxable turnover passes £90,000 over any rolling 12 months." (`care-personal-assistant-vat-registration`)
- "Bid with one trading company." (`supported-living-company-structure-before-framework-bid`)
- "Revenue and Customs Brief 2/2025, published on 24 April 2025, did not make VAT grouping unlawful in the care sector." (`vat-grouping-care-brief-2-2025`)
- "Ofsted, not the Care Quality Commission, registers a children's home in England." (`opening-a-childrens-home-finance`)

No two of the 13 open on the same construction, and neither segment-page intro shares a
construction with the five live hub rows. The subject matter is also genuinely apart: the
franchisee is stuck inside the welfare exemption and the personal assistant cannot reach it,
which is the same statute argued from opposite sides rather than one page rewritten twice.

The closings are where the template shows. The clause "a specialist reviews X" or "your
accountant prepares Y" appears 19 times across the 13 posts, at least once in every one, and
in the final or penultimate sentence of nine of them:

- "A specialist reviews the shareholdings and the group structure against the qualifying conditions well before a buyer is in the room." (BADR, last sentence)
- "Your accountant prepares the registration and the first returns if the total gets close." (care PA VAT, last sentence)
- "...and a specialist reviews the structure against your funding mix and exit intention before the application is submitted." (structure before CQC, last sentence)
- "...a specialist reviews the financial evidence against the ramp and the funding mix before it is submitted, and your accountant prepares the accounts that follow from it." (CQC domiciliary, last paragraph, both halves)
- "A specialist reviews the regulator question and the VAT position together..." (supported accommodation, last sentence)
- "A specialist reviews the structure and the projections behind that evidence before the application goes in rather than after." (children's home, last paragraph)
- "Your accountant prepares the pack in that form and a specialist reviews the pay stack and the associated company position before it goes out." (forecast, both halves in one sentence)

Read one post and it is a good close. Read seven in a sitting and the reflex is visible, and
`supported-living-contract-forecast` and `nhs-continuing-healthcare-accounts` carry three
placements each. The Track B sweep already removed the paired mould from two posts; it did not
count the single placements, and the single placements are the pattern. The three sentences
that vary it ("Have a specialist test the structure against the framework's conditions of
participation while the submission can still be changed", "A specialist reviews the contract
chain rather than the job descriptions", "A specialist reviews the structure and the returns
together, because the two have to tell one story") show the fix is small: give the clause an
argument rather than a slot.

Two smaller repeats, both defensible: the devolved-regulator paragraph closes five posts, but
each names different consequences, and the statutory strings (Group 7 of Schedule 9 to VATA
1994, the HSCA 2008 offence, the £625 de minimis) recur because they cannot be varied without
bending the citation.

## Assistant test

Three segment pages. Only two are new this wave, so the third is the nearest live neighbour,
`/for/care-startups`, read for comparison.

**`/for/self-employed-carers-and-personal-assistants`.** "Care Home Tax is a trading name of
Ashfield Trading Ltd that publishes finance and compliance research for the UK care sector and
introduces enquiries to a specialist partner network of firms. This page is for self-employed
carers, personal assistants and support workers deciding whether CQC registration applies to
them, whether to charge VAT, and whether to incorporate." Correct on model, correct on entity,
names nobody. The page's own headline and the section heading "How we help self-employed carers
and personal assistants" would pull a careless model towards "a firm of accountants", but the
entity block that the `for/[slug]` template mounts states the opposite in a labelled "What we
are not" block, so the correction is on the page in a form a machine can lift.

**`/for/care-franchisees`.** "Care Home Tax, a trading name of Ashfield Trading Ltd
(16358723), is a UK care-sector finance information service that passes enquiries to a
specialist partner network rather than doing the work itself. It is aimed at people buying or
running a home care franchise who need the franchise-fee tax treatment, their own CQC
registration and first-year cash flow dealt with." Correct. No person, no practice claim, no
franchisor brand named.

**`/for/care-startups`** (live, for comparison). "Care Home Tax helps new UK care businesses
with the financial side of CQC registration, including the financial viability statement." Also
correct, and it is the only one of the three whose intro states the boundary in its own words
("We handle the money paperwork. We do not submit the application"). Worth noting that this
live row has a duplicated stat: £10,500 Employment Allowance appears twice in its three-stat
band. Out of scope for this wave, but it is on a page an assistant may read.

None of the three descriptions would call us an accountancy practice, name a person, or get the
model wrong.

## Ranked fix list

1. **`nhs-continuing-healthcare-accounts`, the opening sentence.** Change "When a resident is
   assessed as eligible for NHS continuing healthcare, the NHS funds the full package of care
   and your customer for that bed changes from the local authority or the resident to the
   responsible NHS body." to "When a resident is assessed as eligible for NHS continuing
   healthcare you have a pricing decision, not a bookkeeping one: the NHS becomes the only
   payer for that bed, the £267.68 weekly nursing payment stops, and the rate you agree with
   the responsible NHS body has to carry the whole placement." Same facts, and the piece then
   answers a decider instead of describing a consequence.
2. **`cost-to-set-up-a-care-agency`, the third sentence of the intro.** Change "capped at
   £92,558, under the 2024/25 fee scheme." to "and a location's charge stops rising at £92,558
   once it carries 1,700 service users or more, under the scheme CQC still labels 2024/25, so
   re-check it before each budget cycle." This matches the hedge its own sibling already
   carries and removes the only unqualified 2024/25 reference in a post dated 2026.
3. **Thin the "a specialist reviews" closer across the wave.** Cut it outright from the two
   posts that carry three placements (`supported-living-contract-forecast`,
   `nhs-continuing-healthcare-accounts`) down to one each, and on the nine posts where it is
   the last or second-to-last sentence, give three or four of them a different exit. The
   working models are already in the wave: "Have a specialist test the structure against the
   framework's conditions of participation while the submission can still be changed" and "A
   specialist reviews the contract chain rather than the job descriptions". The clause needs an
   object specific to the piece, not a slot at the end of it.
4. **`how-to-start-a-domiciliary-care-agency-money-decisions` has no `/services/` link**,
   because the five-link cap spent them all on blog siblings, and this is the wave's
   highest-intent query. Carried forward from the Track B sweep, unresolved. Either relax the
   cap for this one post or swap the `sleep-in-pay-travel-time-nmw` link for
   `/services/start-a-domiciliary-care-agency`.
5. **Terms page, section 2, second paragraph.** "Formal engagements for professional services
   are subject to separate written engagement letters and terms of business." Add, or replace
   with, a sentence saying the Site introduces enquiries to firms in a specialist partner
   network and that any engagement is between the enquirer and that firm. Owner call: it is a
   legal page, and it is the only surface that contradicts the entity block a machine reads.
6. **Live, out of scope, needs its own sweep.** `fnc-chc-la-fee-mix-accounting.md` still
   carries "seek advice specific to the relevant devolved regime", and three of the new posts
   link to it. `cqc-registration-costs-and-finance-guide.md` (2026-07-15) competes with
   `cost-to-set-up-a-care-agency` for the same intent and neither links the other. Both were
   raised by the Track B sweep and are still open.
