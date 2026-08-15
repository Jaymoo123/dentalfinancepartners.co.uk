---
slug: epc-certificate-cost-uk
category: "Landlord Tax Essentials"
intent: "Someone searching `epc certificate cost` (3,600/mo plus 6 variants, KD 16) wants a price: what a domestic EPC costs, why quotes range so widely, whether cheap online bookings are legitimate, and (for landlords) whether the fee and any improvement spend are deductible. They may be a landlord, a seller, or a remortgager; the page serves the price question for all three but the tax layer is written for the landlord."
---
# EPC certificate cost UK: what you will pay, why quotes vary, and the tax treatment for landlords

## Statutory anchor
- Primary: Energy Performance of Buildings (England and Wales) Regulations 2012 (SI 2012/3118): reg 6 (energy performance certificates on sale and rent), reg 7 (marketing), reg 7A (construction), reg 36 (penalty charge notices), reg 38 (penalty amount). WebFetch-VERIFIED at legislation.gov.uk/uksi/2012/3118/contents on 2026-08-15. Stage 2 verifies the 10-year validity provision (likely reg 9 or the certificate provisions, not visible from contents fetch) and the domestic penalty figure under reg 38 before either enters the page.
- Supporting: accredited domestic energy assessor requirement (reg 22/accreditation provisions, Stage 2 verifies section numbers); SI 2015/962 (MEES) only as the consequence layer, anchored at §26.3.
- House position reference: NEW LOCK NEEDED: §26.x mini-lock "EPC regime, SI 2012/3118 (trigger events, 10-year validity, assessor accreditation, penalty amounts)". §26.3 locks MEES but nothing locks the underlying EPC machinery; A6, A7, A17 and A18 all anchor on the same proposed lock.

## Framing differentiator (anti-templating, anti-cannibalisation)
PARTIAL-overlap pick (manager audit table): adjacent existing page `energy-performance-certificates-epc` is the GENERAL GUIDE (what an EPC is, SAP/RdSAP methodology, bands, when you need one, MEES floor, exemptions, penalties, EPC C trajectory, grants, tax) and contains a short "How an EPC Is Obtained, and What It Costs" section. THIS page is COST-SPECIFIC: (1) a cost TABLE by property size and route (flat, terrace, semi, detached; direct-to-assessor vs online broker vs agent-arranged), ranges Stage 2 verified and dated; (2) why quotes vary (floor area, location, access, broker margin, speed); (3) the cheap-EPC trade-off: £35 online bookings vs local assessors, what a rushed assessment costs a LANDLORD later (a marginal D/E band result feeds straight into MEES exposure, the angle no EPC-booking site will write because their product is the cheap booking); (4) when you actually need to pay for a new one at all (10-year validity, no automatic re-test on re-let, sale/re-mortgage triggers, voluntary early re-assessment after improvement works to bank a better band). Methodology, bands, exemptions and the 2030 trajectory are NOT restated: one-line pointers forward-link to `energy-performance-certificates-epc` (general guide) and to A8 `mees-regulations-landlords` (consequence layer). The existing page keeps the what/why; this page owns the how-much.

THE ACCOUNTANT'S ANGLE: EPC fee = deductible revenue expense for a landlord (ITTOIA 2005 s.272), including a pre-letting EPC under pre-trading rules; improvement spend the EPC motivates splits capital vs revenue exactly per §26.7 (insulation/glazing/heating upgrades = capital to CGT base cost; like-for-like boiler = revenue); grant receipts (ECO4/GBIS/BUS) reduce CGT base cost; for a SELLER the EPC is a cost of sale deductible in the CGT computation (TCGA 1992 s.38(1)(c) incidental costs, Stage 2 verifies subsection), a cross-audience hook the booking sites cannot write.

## Key questions this page must answer
1. How much does an EPC cost in the UK right now? (headline range first screen; table by property type below, Stage 2 verified)
2. Why do quotes range from ~£35 to £120+ for the same certificate?
3. Are cheap online EPC brokers legitimate, and what do you give up vs a local accredited assessor?
4. When do I legally need an EPC and when do I NOT need to buy a new one (10-year validity, re-lets, existing certificate lookup on the register)?
5. Who can produce one (accredited domestic energy assessor) and how do I check accreditation?
6. What happens at the assessment and how long does it take? (compressed; process detail belongs to A7)
7. What is the penalty for marketing or letting without one (reg 36/38 penalty charge notices, figure Stage 2 verified)?
8. Is the EPC fee tax-deductible for a landlord? For a seller?
9. Why should a landlord near a band boundary care about assessment quality (MEES consequence, forward-link A8)?
10. Jurisdiction: SI 2012/3118 covers England and Wales; Scotland and NI have separate EPC regimes (first-screen statement per §5.3).

## Manager pre-decisions placeholder
- Category routing: Landlord Tax Essentials.
- Worked-example numbers: cost TABLE mandatory. Stage 2 verifies price ranges (dated sources), the reg 38 domestic penalty amount, the 10-year validity regulation number, and the TCGA 1992 s.38 subsection for costs of sale.
- Cross-link targets: existing `energy-performance-certificates-epc` (mandatory early forward-link, canonical general guide), A7 how-to-book-an-epc (process sibling, links INTO this page per §5.4), A8 MEES (consequence layer), existing `epc-improvement-grant-schemes-landlords-eco4-bus-gbis`, existing `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`, A18 commercial EPC cost (commercial sibling, one-line cross-link only, different cluster), forthcoming /landlord-compliance pillar.

## Stage 2 research target list
- Competitor pages: <!-- competitor pack pending; Stage 2 merges -->
- HMRC manuals / gov.uk guidance to cite: gov.uk "Buying or selling your home / Energy Performance Certificates" guidance; the EPC register (find-energy-certificate.service.gov.uk) as the free-lookup workflow; PIM2020; CG15250 (incidental costs of sale, verify manual ref); ITTOIA 2005 s.272.
- Case-law: none expected.

## Universal rules + workflow stubs (Stage 2 fills)
- Writer spec `_WRITER_SPEC_WAVE11.md` applies in full: category `Landlord Tax Essentials`, body 2,800-3,500 words raw HTML, 10-14 FAQs, metaTitle ≤62, metaDescription ≤158, 0 em-dashes, first-screen jurisdiction statement (England and Wales SI), cost-page opener = the headline range.
- Ledger: house_positions.md §26.13 (EPC machinery lock) + §26.3 (MEES consequence, one paragraph max). Lock wins.

## Stage 2 extensions (2026-08-15, cluster B session)

### 1. Verify-at-write resolutions

- **SI 2012/3118 reg 38 penalty amounts: RESOLVED (this was the 504-blocked item gating A6/A17/A18; resolved for lock §26.13).** Fetched https://www.legislation.gov.uk/uksi/2012/3118/regulation/38 on 2026-08-15:
  - **Dwellings: £200 fixed** (reg 38(1)(a)(i)) for breaches of reg 6(2), 6(5), 7(2)-(5), 7A(2)-(3).
  - **Non-dwellings: 12.5% of the rateable value of the hereditament, minimum £500, maximum £5,000** (reg 38(1)(a)(ii) with reg 38(3)); **default £750 where the rateable value cannot be determined** (reg 38(2)(d)). [This is the A17/A18 gating formula; noted here for the conductor's Stage 2b lock patch.]
  - Supporting amounts: £1,000 for reg 14(3)(a) (DEC display), £500 for reg 10(2)/14(3)(b), £300 for regs 18(1)/20(1)-(2)/21 (air conditioning), **£200 for reg 11(2)/35(5)** (35(5) = failure to provide a copy to an enforcement officer) (reg 38(1)(b)-(e)).
- **10-year validity regulation: RESOLVED (resolved for lock §26.13).** It is **reg 9(2)**, fetched https://www.legislation.gov.uk/uksi/2012/3118/regulation/9 on 2026-08-15: an EPC is only valid if "(a) it was entered on the register no more than 10 years before the date on which it is made available; and (b) no other energy performance certificate for the building has since been entered on the register." Note limb (b): a newer EPC SUPERSEDES the old one even inside 10 years, which matters after improvement works (a voluntary re-assessment replaces the old band) and is a nuance no competitor states.
- **Assessor accreditation: RESOLVED (resolved for lock §26.13).** **reg 22** ("Accreditation schemes"), fetched https://www.legislation.gov.uk/uksi/2012/3118/regulation/22 on 2026-08-15: reg 22(1) "An energy assessor must be a member of an accreditation scheme approved by the Secretary of State"; reg 22(2) approval may be limited by building category; reg 22(3) scheme conditions (independence, fit-and-proper, standard forms, code of conduct, indemnity, complaints, register entry).
- **TCGA 1992 s.38 subsection for a seller's EPC: RESOLVED.** Fetched https://www.legislation.gov.uk/ukpga/1992/12/section/38 on 2026-08-15. s.38(1)(c) allows "the incidental costs to him of making the disposal"; s.38(2) defines incidental costs to include fees for the professional services of any surveyor or valuer and advertising costs. A seller's EPC (statutorily required to market, produced by an accredited assessor) sits in the s.38(1)(c)/s.38(2) incidental-costs frame; HMRC manual gloss = CG15250 area, writer confirms the manual page at write before citing the CG reference.
- **Price-table figures:** pack figures verified 2026-08-15 (below); writer presents as dated verified ranges or re-pulls live.

### 2. Competitor exploitation plan

Spot-recheck 2026-08-15: https://hoa.org.uk/advice/guides-for-homeowners/i-am-selling/how-much-does-an-epc-cost/ returns HTTP 200. Pack stands.

Beat-them elements:
1. **The verified penalty figures with the two-statute boundary** (£200 dwelling PCN under SI 2012/3118 reg 38, verified above, vs the entirely separate MEES penalty regime under SI 2015/962). The SERP repeatedly merges "EPC fines" into one blob; hoa and homesafetyuk quote no enforcement numbers at all. One tight paragraph in the penalty H2 + the §26.13 one-paragraph MEES boundary.
2. **The when-you-do-NOT-need-to-pay section** (reg 9(2) verified: 10-year validity, register check first, supersession nuance). Booking-adjacent competitors bury it because it kills conversion. Sits early, H2 no. 3.
3. **The cheap-EPC trade-off written for landlords** (a rushed £35 assessment that lands a marginal D/E feeds straight into MEES exposure). hoa is seller-skewed; falconenergy sells assessments. Sits mid-page.
4. **The tax layer, both audiences**: landlord fee deductible (ITTOIA 2005 s.272, pre-letting included); seller's EPC = incidental cost of disposal (s.38(1)(c), verified above). Pack: no competitor has any tax angle. Sits as the closing substantive H2.
5. **A worked example with real numbers** (hoa gap line: "no worked example"). Sits inside the tax H2.

### 3. Query coverage map

| Query | Served at |
|---|---|
| `epc certificate cost` + 6 variants (3,600/mo, primary) | H1 + headline range + cost table H2 |
| `how much is an epc` / `epc cost uk` | first-screen answer |
| `cheap epc certificate` / `£35 epc` | cheap-EPC trade-off H2 |
| `do i need a new epc` / `how long does an epc last` | validity/register-check H2 |
| `epc penalty` / `fine for no epc` | penalty H2 |
| `is an epc tax deductible` | tax H2 |

### 4. Structure, tables, examples, FAQs, links

**H2 skeleton (9):**
1. What an EPC costs right now (headline range; England-and-Wales jurisdiction line; early forward-link to the canonical general guide)
2. Cost table by property type and route (spec below)
3. Check the register before you pay (reg 9(2) validity, find-energy-certificate.service.gov.uk lookup, supersession nuance)
4. Why quotes range from about £35 to £120+ (floor area, location, access, broker margin, speed)
5. The cheap-EPC trade-off for landlords (band-boundary risk feeding MEES; forward-link A8)
6. Who can produce one and how to check them (reg 22 accreditation, verified)
7. What happens at the assessment (compressed, one paragraph; process detail forward-links A7)
8. Penalties for marketing or letting without one (£200 dwelling PCN per verified reg 38; MEES boundary paragraph per §26.13)
9. The tax treatment: landlord, seller, improver (s.272 revenue; s.38(1)(c) cost of sale; improvement spend per §26.7; grants reduce base cost)

**Cost-table spec:** rows = flat, terraced, semi-detached, detached/large. Columns = direct-to-assessor range, online broker range, agent-arranged range, note. Sources: hoa £60-£120 (verified 2026-08-15), homesafetyuk £45-£200+ by type AND region (verified 2026-08-15), falconenergy £60-£120 domestic (verified 2026-08-15). Regional variance folded into the note column or a second compact table. Label interpolations illustrative-range.

**Worked examples (1-2):** (a) Gwen, landlord re-letting a terrace: register check shows a 7-year-old EPC at band D, no purchase needed this re-let; contrast the £60 voluntary re-assessment AFTER loft insulation to bank a C (and the supersession point). Fee deductible; insulation capital per §26.7. (b) seller example, two lines: EPC bought to market a sale enters the CGT computation as an incidental cost of disposal (s.38(1)(c)).

**FAQ list (12):** How much does an EPC cost? · Why are some EPCs £35 and others £120? · Are cheap online EPC brokers legitimate? · Do I need a new EPC to re-let? · How long does an EPC last? · Does a new EPC replace my old one? · Who can carry out an EPC? · How do I check an existing EPC for free? · What is the penalty for having no EPC? · Is the EPC fee tax-deductible for a landlord? · Can a seller deduct the EPC cost from capital gains? · Is the EPC regime different in Scotland?

**Internal links (exact paths):**
- /blog/landlord-tax-essentials/energy-performance-certificates-epc (MANDATORY early forward-link, canonical general guide)
- /blog/landlord-tax-essentials/how-to-book-an-epc (A7, process sibling; A7 links INTO this page per §5.4, reciprocate once)
- /blog/landlord-tax-essentials/mees-regulations-landlords (A8, consequence layer)
- /blog/landlord-tax-essentials/epc-improvement-grant-schemes-landlords-eco4-bus-gbis
- /blog/landlord-tax-essentials/epc-c-2030-minimum-energy-efficiency-landlord-spending-cap
- /blog/property-types-and-specialist-tax/commercial-energy-performance-certificate-cost (A18, one-line cross-link only)
- /calculators/capital-gains-tax-calculator (cost-of-sale + base-cost context)

### 5. Statutory cross-check (§16.36)

Seed vs §26.13: regs 5/6/7/7A framing, enforcement chain (34/36/38), MEES one-paragraph boundary, jurisdiction, do-not-writes (no re-let re-test myth, conditional listed-building exemption): aligned. Seed guessed validity "likely reg 9"; confirmed reg 9(2). All four §26.13 verify-at-write items (reg 38 amounts domestic + non-domestic formula, validity reg number, accreditation reg number) are RESOLVED above; conductor patches §26.13 at Stage 2b and can unblock A17/A18 with the same figures. CG15250 manual gloss remains writer-confirm-at-write. No drift, no F-flag.

## Work log (Stage 2 + RUN populate)
- 2026-08-15 Stage 2: reg 38 amounts (dwelling £200; non-dwelling 12.5% RV min £500 max £5,000 default £750), reg 9(2) validity, reg 22 accreditation, TCGA s.38(1)(c) all source-verified (resolved for lock §26.13, incl. the A17/A18 gating formula); pack URL 200; extensions appended. No blockers, no flags.
