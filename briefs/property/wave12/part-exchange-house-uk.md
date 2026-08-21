---
slug: part-exchange-house-uk
category: "Capital Gains Tax"
intent: "Someone buying a new-build has been offered part-exchange by the developer, or is searching whether part-exchange is worth it. They want to know how the valuation is set, how big the discount is, whether they can negotiate, and what the alternatives are (assisted move, chain-break). The answer they are missing is that the two transactions are legally linked, which triggers a specific SDLT relief on the developer's side and reshapes the CGT arithmetic on theirs."
---
# Part-exchange on a house in the UK: what the developer really pays, and what it costs you

## Statutory anchor
- Primary: **Finance Act 2003 Schedule 6A** (SDLT relief for certain acquisitions of residential property). **Para 1** exempts from charge the acquisition of "the old dwelling" by a **house-building company** from an individual, where the individual acquires a new dwelling from that company, occupied the old dwelling as their only or main residence within the previous two years, intends to occupy the new dwelling as their only or main residence, **"both acquisitions are entered into in consideration of each other"**, and the land does not exceed the permitted area. **Para 2** gives the parallel relief where a **property trader** (not the builder) takes the old dwelling in a chain-break or assisted-move arrangement, subject to conditions on refurbishment spend, not granting leases or licences, and not letting principals or employees occupy. **Para 3** covers the chain-transaction case where the individual's own arranged sale falls through. WebFetch-VERIFIED at https://www.legislation.gov.uk/ukpga/2003/14/schedule/6A on 2026-08-21 (latest revised, 21 Aug 2026).
- Primary (tax): **TCGA 1992 s.38(1)(c) + s.38(2)**: exhaustive list of deductible incidental costs of disposal (professional fees of surveyor, valuer, auctioneer, accountant, agent or legal adviser; costs of transfer or conveyance including SDLT). VERIFIED at https://www.legislation.gov.uk/ukpga/1992/12/section/38 on 2026-08-21.
- Primary (valuation rule): **TCGA 1992 s.17(1)**: a disposal is deemed to be for market value where it is made "otherwise than by way of a bargain made at arm's length" or the consideration cannot be valued. VERIFIED at https://www.legislation.gov.uk/ukpga/1992/12/section/17 on 2026-08-21. A developer part-exchange between unconnected parties is an arm's-length bargain, so **s.17 does not substitute market value** and the disposal proceeds are the part-exchange figure actually agreed, low as it is.
- Supporting: **TCGA 1992 s.222(2)-(3)**: the private residence relief "permitted area" is "an area (inclusive of the site of the dwelling-house) of **0.5 of a hectare**", extended under s.222(3) only where a larger area is required for the reasonable enjoyment of the dwelling-house having regard to its size and character. VERIFIED at https://www.legislation.gov.uk/ukpga/1992/12/section/222 on 2026-08-21. **FA 2003 Sch 6A** uses its own "permitted area" condition, so a large garden can threaten the SDLT relief and full PRR at the same time. **Building Safety Act 2022 ss.136-138** (new homes ombudsman scheme, the scheme conditions, and the definitions of "relevant owner", "new build home" and "developer"): **NOT IN FORCE**; the commencement annotation reads "S. 136 not in force at Royal Assent, see s. 170(5)" and no commencement SI has been made. VERIFIED at https://www.legislation.gov.uk/ukpga/2022/30/section/136 on 2026-08-21. **FA 2019 Sch 2 para 3(1)(b)** (60-day return; "60th" substituted by FA 2022 s.23(2)), VERIFIED 2026-08-21.
- House position reference: §5 (CGT rates 18%/24%, £3,000 AEA, PRR, 60-day rule where tax is due), §1 (SDLT rates and surcharges). **NEW LOCK NEEDED**: the §1 family carries no position on **FA 2003 Sch 6A** part-exchange and chain-break reliefs, and this is a recurring new-build query. Proposal: §1.Q "SDLT Sch 6A: part-exchange, property-trader and chain-break reliefs (house-building company relief is the DEVELOPER's relief, not the seller's)". Raised as **F-160** (HOUSE_POSITION_EXTENSION) in `wave12_site_wide_flags.md`. Two further flags apply to this page: **F-164** (new-build consumer redress is non-statutory; BSA 2022 ss.136-138 never commenced, NHQB code is the live voluntary floor) and **F-162** (§5.B disposal-date and incidental-costs floor, which carries the s.17 arm's-length point this page turns on).

## CGT hook (mandatory, the wave's organising rule)
Part-exchange is a **disposal**, and the fact that the consideration arrives as a credit against a new house rather than as cash changes nothing. Where the old home has been the seller's only or main residence throughout, private residence relief covers the gain and the tax question closes in a sentence. It does not close for the three cases that bring people to this page with a real bill: a property let out for part of the ownership period, a second home or holiday property being part-exchanged, and a permitted area over the **0.5 hectare** line in **TCGA 1992 s.222(2)** where the excess land is outside relief. In all three, the deductible costs are the s.38(1)(c) incidental costs of the disposal, and part-exchange strips most of them out because there is no agent and usually no marketing spend, so the deduction is thin and the gain correspondingly larger than on an open-market sale of the same house. The point no builder's brochure makes: because a part-exchange is an arm's-length bargain, **s.17** does not push proceeds back up to market value, so the developer's discount genuinely reduces the taxable gain, but it reduces it by at most 18% or 24% of the discount while costing the seller 100% of it. That arithmetic is the page's central answer, and it is the reason a tax firm is answering a new-build question. Forward-link `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` for the mechanics, `/blog/capital-gains-tax/principal-private-residence-relief-landlords` for the relief, and `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` for the deadline; do not restate any of them.

## Framing differentiator (anti-templating, anti-cannibalisation)
Net-new: the cannibalisation check returned a top Jaccard of 0.13 against `a-complete-guide-to-identity-verification-in-uk`, which is noise, and the closest genuinely related page is `vat-on-new-builds-residential-property`, which is a developer-side VAT page and shares no query surface with a consumer asking whether part-exchange is worth it. Within Wave 12 the lane is clean: A10 and A11 are auction routes, A3 and A4 are the DIY-sale routes, and this is the **developer-route** disposal.

The accountant's angle is the house differentiator, and here it is unusually strong because the statute is on the other side of the table. Every consumer guide (HomeOwners Alliance, the housebuilders' own pages, Which?, the mortgage comparison sites) explains part-exchange as a convenience trade and argues about the discount percentage. None of them mentions **FA 2003 Sch 6A**, which is a real, named, conditional SDLT relief that the **developer** gets on taking your old house, and which is precisely why part-exchange is commercially viable for them at all. Explaining that the builder is not doing you a favour but running a relieved transaction, and setting out the conditions it depends on (two-year main-residence test, intention to occupy the new dwelling, both acquisitions in consideration of each other, permitted area), reframes the whole negotiation. The second differentiator is the ladder of alternatives, which the search intent conflates and Sch 6A distinguishes for you: **part-exchange** (para 1, builder takes the house), **assisted move** (para 2, a property trader takes it, builder subsidises the agent), and **chain-break** (para 3, the trader steps in when your own buyer collapses). Third: the consumer-protection floor is **non-statutory here**, and the page says so plainly, because BSA 2022 ss.136-138 would have created a statutory new homes ombudsman and have never been commenced. What exists instead is the New Homes Quality Board's New Homes Quality Code and the New Homes Ombudsman Service, which bind only developers who have registered. Lane guards: no new-build snagging content, no SDLT rate table (link the calculator), no PRR walkthrough beyond the permitted-area point.

## Key questions this page must answer
1. What is part-exchange on a house, and which developers offer it?
2. How does the developer set the part-exchange valuation, and how far below market value is it typically?
3. What are the qualifying conditions, in practice and in law? (Value cap relative to the new home, main-residence occupation, intention to occupy the new dwelling, land area.)
4. Is part-exchange worth it, and how do I compare the discount against agent fees, months of carrying costs, and the risk of a chain collapsing?
5. Can I negotiate the part-exchange figure, and what evidence moves it?
6. What is assisted move, what is a chain-break scheme, and when is each better than part-exchange? (FA 2003 Sch 6A paras 2 and 3.)
7. Does the developer pay SDLT on my old house? (No, if the Sch 6A para 1 conditions are met, and that is why the offer exists.)
8. Do I pay SDLT on the new house, and on what figure?
9. Do I pay CGT on the part-exchange? (Usually no, PRR; the three exceptions that mean yes.)
10. What protection do I have if the new build is not what was promised? (Non-statutory: NHQB code and ombudsman; BSA 2022 ss.136-138 never commenced.)
11. What happens to my mortgage and my moving date in a part-exchange?

## Manager pre-decisions placeholder
- Category routing: "Capital Gains Tax" (route `capital-gains-tax`, live).
- Worked-example numbers: the typical part-exchange discount (commonly cited around 10% below market) and the usual value cap on the old home relative to the new home **both require a named, dated source at Stage 2** and must not be written from memory. CGT rates and AEA per §5; permitted area 0.5 hectare per s.222(2), verified above. SDLT figures: link the calculator rather than tabling rates.
- Cross-link targets: `/cost-of-selling-a-property` (pillar, build with this wave, link as if live), `/calculators/cost-of-selling-calculator` (same), `/calculators/stamp-duty-calculator`, `/calculators/capital-gains-tax-calculator`, `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`, `/blog/capital-gains-tax/principal-private-residence-relief-landlords`, `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`, existing `vat-on-new-builds-residential-property` (developer-side counterpart), Wave 12 siblings A11 `modern-method-of-auction-explained`, A9 `cost-of-moving-house-uk`, A1 `how-much-do-estate-agents-charge-to-sell-a-house`.
- No named worked-example personas (wave rule). No pricing for our own services. No shared CTA shape with the agents1 batch.

## Stage 2 research target list
- Competitor pages (UNVERIFIED at seed stage, verify live at Stage 2): HomeOwners Alliance part-exchange guide; Which? new-build guides; the major housebuilders' own part-exchange pages (useful as primary sources for the conditions they actually impose, cited as such); mortgage-comparison editorial. None expected to mention FA 2003 Sch 6A.
- HMRC manuals / gov.uk guidance to cite: **CG15250** (VERIFIED 2026-08-21, incidental costs, exhaustive list); **SDLTM21000-onwards** (Sch 6A reliefs; locate the exact leaf pages for house-building company relief and property-trader relief and cite by reference, verifying each is live); CG64800-onwards (PRR and permitted area); gov.uk "Tax when you sell your home"; gov.uk "Stamp Duty Land Tax relief for land or property transactions".
- Non-statutory bodies (VERIFIED live 2026-08-21, re-verify at write): New Homes Quality Board, operating the **New Homes Quality Code**, current version **Code V2 (March 2026)** applying to homes reserved from 2 March 2026, with V1 (October 2023) for earlier reservations, and the New Homes Ombudsman Service available to buyers of registered developers. Registration is a developer commitment, not a statutory duty, and the page must say so.
- Case-law: none load-bearing at seed stage.
- Stage 2 verification item: whether the **Consumer Code for Home Builders** still operates alongside the NHQB code and for which developers, before either is named on the page.

## Universal rules + workflow stubs (Stage 2 fills)

## Stage 2 extensions (2026-08-21, batch A10-A13)

### 1. Verify-at-write items that gated this page

**RESOLVED - Sch 6A permitted area versus TCGA 1992 s.222(2). The two tests are NOT identically drafted, and the page must not say they are.** Both fetched verbatim at legislation.gov.uk on 2026-08-21 (latest revised, 21 August 2026).

- **FA 2003 Sch 6A para 7(3)** defines "the permitted area" as "land occupied and enjoyed with the dwelling as its garden or grounds that does not exceed - (a) an area (inclusive of the site of the dwelling) of 0.5 of a hectare, or (b) such larger area as is required for the reasonable enjoyment of the dwelling".
- **TCGA 1992 s.222(2)**: "an area (inclusive of the site of the dwelling-house) of 0.5 of a hectare". **s.222(3)**: "Where the area required for the reasonable enjoyment of the dwelling-house (or of the part in question) **as a residence, having regard to the size and character of the dwelling-house**, is larger than 0.5 of a hectare, that larger area shall be the permitted area."

**The decisive difference:** the 0.5 hectare baseline is identical, but the extension limb is not. s.222(3) qualifies "reasonable enjoyment" with "**as a residence, having regard to the size and character of the dwelling-house**"; Sch 6A para 7(3)(b) carries no such qualifier. **Writer rule:** say the baseline is the same 0.5 hectare in both, note that the CGT extension test is expressly tied to enjoyment as a residence and to the size and character of the house while the SDLT one is not, and stop there. Do not assert that a decision or concession under one test binds the other. Resolved for lock **§1.Q**, whose Stage 2 question ("confirm whether the two tests are drafted identically before any page asserts they are") is now answered: **no**.

**RESOLVED, AND IT CORRECTS BOTH THE SEED AND §1.Q - the Sch 6A paragraph numbering is wrong.** The Stage 1 seed and HP §1.Q both say para 3 is the chain-break case. It is not. Verified at legislation.gov.uk (paragraph headings, 2026-08-21) and corroborated by HMRC's own contents page **SDLTM21000** (gov.uk, last updated **26 May 2026**, statutory reference given as **FA03/S58A and FA03/SCH6A**):

| Para | Actual subject | HMRC leaf page |
|---|---|---|
| 1 | Acquisition by house-building company from individual acquiring new dwelling | SDLTM21020 |
| 2 | Acquisition by property trader from individual acquiring new dwelling (assisted move) | SDLTM21030 |
| **3** | **Acquisition by property trader from personal representatives** | SDLTM21040 |
| **4** | **Acquisition by property trader from individual where chain of transactions breaks down** | SDLTM21050 |
| 5 | Acquisition by employer in case of relocation of employment | SDLTM21060 |
| 6 | Acquisition by property trader in case of relocation of employment | SDLTM21070 |
| 7 | Meaning of "dwelling", "new dwelling" and "the permitted area" | - |
| 8 | Meaning of "property trader" and "principal" | - |

Overview page: **SDLTM21010**, "General overview and definitions FA03/S58A and FA03/SCH6A". All leaf references above taken from the live contents page, which was fetched and returned HTTP 200. **Writer rule:** cite **FA 2003 s.58A + Sch 6A** as the gateway, then the correct paragraph. Chain-break is **para 4**. Raised to the manager as **F-174** so §1.Q can be patched; do not edit house_positions.md.

**RESOLVED - the discount and the eligibility cap, from the developers' own published terms (primary sources, not commentary).** All fetched HTTP 200 on 2026-08-21:

| Item | Figure as published | Source |
|---|---|---|
| Eligibility cap (Taylor Wimpey) | "Your existing home must be 70% or less than the value of the new home you are considering purchasing." | `https://www.taylorwimpey.co.uk/ways-to-buy/terms-and-conditions/part-exchange-and-easymover-terms-and-conditions` (no version date shown on page) |
| Eligibility cap (Barratt) | "Your current home shouldn't be more than 80% of the price of the home you want to buy", applying to properties "up to a maximum value of £500,000" | `https://www.barratthomes.co.uk/offers/part-exchange/` |
| Valuation basis (Barratt) | "we'll run two independent evaluations of your home", and the offer is "based on the premise that the house will sell between 8 and 10 weeks" | Barratt, as above |
| Valuation basis (Taylor Wimpey) | England and Wales: "our initial offer will be subject to the RICS survey and valuation"; Scotland: "based on the Home Report value" | Taylor Wimpey, as above |
| Agent fees | Taylor Wimpey: "if the complete transaction proceeds to mutual legal completion any fees and commissions for the appointed agents will be met by Taylor Wimpey"; but if either side withdraws and you continue with an introduced buyer, "you will be responsible for the agents' fees and commission (plus VAT)". Barratt: "No estate agent fees and no chain" | Both, as above |
| Exclusions | "Leasehold properties with less than 85 years remaining on the lease or those that include any commercially onerous terms cannot be considered"; properties unsuitable by "method of construction or unusual characteristics" | Taylor Wimpey, as above |
| Discount | "Typically a developer might get your old home for **80% to 90%** of the price it might have achieved on the open market" | Zoopla, `https://www.zoopla.co.uk/discover/selling/part-exchange-your-home-a-full-guide-to-exchanging-homes/`, published and last modified **16 September 2024** |

**Writer rule:** the caps differ by developer (70% Taylor Wimpey, 80% Barratt with a £500,000 ceiling), so present them as **per-developer published terms with the developer named**, never as an industry rule. The Zoopla 80-90% figure is the only dated, named discount source located and is **commentary, not a developer's own statement**: attribute it explicitly and label the range as such. The developers' own valuation bases (an 8-to-10-week sale premise, an RICS valuation) are the honest explanation of where the discount comes from and are stronger material than any percentage.

**PARTIALLY RESOLVED - Consumer Code for Home Builders alongside the NHQB code.** `consumercode.co.uk` returned **HTTP 403** to automated fetch on 2026-08-21, so the primary source is **not verified** and the page must not quote it. What is verified: the **New Homes Quality Board** site (`https://www.nhqb.org.uk/`, HTTP 200, 2026-08-21) confirms **Code V2 (March 2026)** applying to homes reserved **from 2 March 2026**, with **V1 (October 2023)** for earlier reservations, and states verbatim that "Customers of developers who commit to the Code are provided with access to the independent New Homes Ombudsman Service" and that customers "who reserved a home after a developer's NHQB registration" can complain to the Ombudsman. That is the voluntary, registration-gated regime §26.15 locks. Secondary sources (LABC Warranty, NHBC, Brodies, Boyes Turner, HomeOwners Alliance) consistently describe **two codes coexisting**, with warranty providers accepting adherence to either, and the Consumer Code applying to developers registered with NHBC, Premier Guarantee, LABC Warranty and Checkmate. **Writer rule:** the page may say two voluntary codes currently operate and a buyer should check which one their developer signed up to, sourced to the warranty providers' own pages, and must **not** quote the Consumer Code's own site until it is fetched successfully. It must still say plainly that neither is statutory: **BSA 2022 ss.136-138 have never been commenced** (§26.15). Still-open item recorded in **F-174**.

### 2. Competitor verification and the beat-them plan

Verified live 2026-08-21 (HTTP 200, on-topic):

- `https://www.zoopla.co.uk/discover/selling/part-exchange-your-home-a-full-guide-to-exchanging-homes/` - Zoopla, published 16 September 2024. Gives the 80-90% discount and a 70% cap. **Confirmed by fetch: does not mention capital gains tax, SDLT by name, FA 2003 Schedule 6A, or any statute.** Mentions "stamp duty" only as a generic cost.
- `https://hoa.org.uk/advice/guides-for-homeowners/i-am-buying/part-exchange-house/` - HomeOwners Alliance, buying-side. **Confirmed by fetch: no discount figure, no eligibility cap, no capital gains tax, no SDLT by name, no FA 2003 Sch 6A, no New Homes Quality Code, no statute at all.** Its useful line is the warning that developers quote a "selling price" that "could be much lower than you are expecting".
- `https://www.taylorwimpey.co.uk/ways-to-buy/terms-and-conditions/part-exchange-and-easymover-terms-and-conditions` - cited as a **primary source** for the conditions a developer actually imposes.
- `https://www.barratthomes.co.uk/offers/part-exchange/` - same, primary source.

**Beat-them plan, five elements:**
1. **The tax layer.** Part-exchange is a disposal. Where PRR does not cover it (let for part of the period, second home, garden over the 0.5 hectare permitted area), the s.38(2) deductions are unusually thin because there is no agent and no marketing spend, so the gain is larger than on an open-market sale of the same house at the same net proceeds.
2. **FA 2003 s.58A + Sch 6A para 1, named.** The builder's acquisition of your old house is exempt from SDLT if the conditions are met. That is why the offer exists at all. Not one competitor names the relief. The framing rule from §1.Q is absolute: **this is the developer's relief, never yours** (you would pay no SDLT on a disposal in any event), and it is a negotiating fact, not a benefit.
3. **s.17(1) does not apply.** A part-exchange between unconnected parties is an arm's-length bargain, so market value is not substituted and the discount genuinely reduces the taxable gain. But it reduces it by at most 18% or 24% of the discount while costing you 100% of it. That single arithmetic line is the page's answer to "is part-exchange worth it" and it exists nowhere in the SERP.
4. **The three-route ladder the statute distinguishes and the search intent conflates:** part-exchange (para 1, builder takes the house), assisted move (para 2, property trader takes it, builder subsidises the agent), chain-break (**para 4**, trader steps in when your own buyer collapses). Naming them from the statute is the structural differentiator.
5. **The redress floor stated honestly.** BSA 2022 ss.136-138 never commenced; the live regime is voluntary, registration-gated and split across two codes. Competitors either imply a statutory ombudsman exists or say nothing.

### 3. Query coverage map

Primary: `part exchange house uk` (2,900/mo, KD 13, £4.12 CPC), plus `part ex house` and `new build part exchange` (1,300/mo) per PROPERTY_PAGE_PLAN A14. Secondaries at H2 level:

| Query family | H2 that owns it |
|---|---|
| what is part exchange on a house / how does it work | H2 1 |
| part exchange valuation / how much do developers offer | H2 2 |
| is part exchange worth it / part exchange pros and cons | H2 3 |
| part exchange criteria / do I qualify | H2 4 |
| can you negotiate part exchange | H2 5 |
| assisted move vs part exchange vs chain break | H2 6 |
| part exchange stamp duty | H2 7 |
| capital gains tax on part exchange | H2 8 |
| new build ombudsman / what if the new build is wrong | H2 9 |

Lane guards: no snagging content, no SDLT rate table (link `/calculators/stamp-duty-calculator`), no PRR walkthrough beyond the permitted-area point, no auction content (A10/A11).

### 4. Structure

H2 skeleton (9):
1. What part-exchange is, and which developers offer it
2. How the developer arrives at your valuation, and where the discount comes from
3. Is part-exchange worth it? The comparison that actually matters
4. Do you qualify? The published conditions, developer by developer
5. Can you negotiate, and what evidence moves the number
6. Part-exchange, assisted move and chain-break: the three routes the statute separates
7. Stamp duty: why the developer pays none on your old house, and what you pay on the new one
8. Capital gains tax on a part-exchange: usually nothing, and the three cases where it is not
9. What protection you have if the new build is not what was promised

**Cost table spec.** Columns: Item | What part-exchange costs you | What an open-market sale would have cost | Deductible against CGT? | Source. Rows: the discount itself (the real cost, sourced to Zoopla and labelled as commentary); estate agent commission avoided (cross-reference A1, do not re-derive); marketing and EPC; conveyancing (still payable); carrying costs of the months you avoid; removals (**not** deductible, per §5.B). The point the table makes is that part-exchange converts a deductible cost into a non-deductible price reduction.

**Worked examples (second person only).**
- *Example 1, the discount arithmetic.* Your old home, an open-market figure, the part-exchange offer at the sourced discount range, against the agent commission and the carrying cost you avoid. Then the tax line: the discount reduces your proceeds pound for pound and therefore reduces the gain, but at 18% or 24% you recover only that fraction of it, and you have given up 100%. Label all inputs illustrative.
- *Example 2, when PRR does not cover it.* A house let for part of the ownership period, part-exchanged. One line showing the s.38(1)(c) deductions that exist (conveyancing, valuation for the computation) and the one that does not (no agent commission, because there was no agent), then link out to the CGT pillar. No full computation.

**FAQ list (12):** How much below market value is a part-exchange offer? Which developers offer part-exchange? Do I need my home to be worth less than the new one, and by how much? Who pays the estate agent? Can I part-exchange a leasehold flat? Can I negotiate the offer? What is assisted move and how is it different? What is a chain-break scheme? Does the developer pay stamp duty on my old house? Do I pay capital gains tax on a part-exchange? What happens to my existing mortgage? Who do I complain to if the new build is defective?

**Internal links (exact paths, targets confirmed to exist 2026-08-21):**
`/cost-of-selling-a-property` (as if live) · `/calculators/cost-of-selling-calculator` (as if live) · `/calculators/stamp-duty-calculator` · `/calculators/capital-gains-tax-calculator` · `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` · `/blog/capital-gains-tax/principal-private-residence-relief-landlords` · `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` · `/blog/property-types-and-specialist-tax/vat-on-new-builds-residential-property` (developer-side counterpart; route segment is **property-types-and-specialist-tax**) · Wave 12 siblings `/blog/capital-gains-tax/modern-method-of-auction-explained`, `/blog/capital-gains-tax/cost-of-moving-house-uk`, `/blog/capital-gains-tax/how-much-do-estate-agents-charge-to-sell-a-house`.

### 5. Statutory cross-check against the new locks (§16.36)

Re-read against §1.Q, §5.B and §26.15. **One mismatch, material:** §1.Q's paragraph mapping ("para 2 assisted move and para 3 chain-break") is wrong at para 3, which is the property-trader-from-personal-representatives case; chain-break is para 4. Corrected in the table above, raised as **F-174**, and the lock wins on everything else. §1.Q's Stage 2 permitted-area question is answered above: the two tests share the 0.5 hectare baseline but the extension limbs are drafted differently, so no page may assert they are identical. §26.15 confirmed unchanged: NHQB Code V2 (March 2026) from 2 March 2026, registration-gated, BSA 2022 ss.136-138 uncommenced.

## Work log (Stage 2 + RUN populate)
- 2026-08-21 Stage 1 seed written (Wave 12 bucket A, batch A10-A13). Statutory anchors WebFetch-verified same day: FA 2003 Sch 6A paras 1-3, TCGA 1992 ss.17/38/222(2)-(3), BSA 2022 s.136 (confirmed NOT in force, "see s. 170(5)"), FA 2019 Sch 2 para 3(1)(b), CG15250, NHQB code V2. Flags raised: **F-160** (HOUSE_POSITION_EXTENSION, SDLT Sch 6A lock proposal §1.Q), **F-164** (HOUSE_POSITION_EXTENSION, new-build redress is non-statutory), plus **F-162** shared with the batch. Stage 2 gating items: sourced discount percentage and value cap; SDLTM leaf-page references; Consumer Code for Home Builders status.
- 2026-08-21 Stage 2 extension written (batch A10-A13). **Permitted-area gating item CLOSED: the two tests are NOT drafted identically.** Both share the 0.5 hectare baseline, but TCGA 1992 s.222(3) qualifies the extension with "as a residence, having regard to the size and character of the dwelling-house" while FA 2003 Sch 6A para 7(3)(b) does not. No page may assert they are the same test. **Sch 6A paragraph numbering CORRECTED against §1.Q and the seed:** para 3 is "Acquisition by property trader from personal representatives" and para 4 is the chain-break case; verified at legislation.gov.uk and against HMRC SDLTM21000 (last updated 26 May 2026), leaf pages SDLTM21010/21020/21030/21040/21050/21060/21070, statutory gateway FA03/S58A. Raised **F-174**. Discount and caps sourced from the developers' own terms (Taylor Wimpey 70%, Barratt 80% with a £500,000 ceiling, Barratt's "sell between 8 and 10 weeks" valuation premise) plus Zoopla (16 Sep 2024) for the 80-90% discount range, labelled as commentary. Consumer Code for Home Builders **PARTIALLY resolved only**: consumercode.co.uk returned 403 to automated fetch, so its own site must not be quoted; NHQB Code V2 (March 2026) re-verified live. Competitor URLs verified live: Zoopla, HomeOwners Alliance part-exchange guide, Taylor Wimpey and Barratt terms.
- 2026-08-21 RUN written (`Property/web/content/blog/part-exchange-house-uk.md`). **Page type = ROUTE page** per `_language_spec.md` §3 (A12 is listed in the route-page row and named as "A12 part exchange" in §6), so the route band governs, not the total-cost band.

  **Self-measured register (prose only; table cells, frontmatter and FAQ block excluded; Flesch by the spec's own formula, sentences of 5+ words):**

  | Metric | Route-page target | Measured | Verdict |
  |---|---|---|---|
  | Body words | 1,600 to 3,400 | **2,494** (2,612 incl. table cells) | inside |
  | Mean sentence | 13 to 17 | **16.19** | inside |
  | Flesch | 68 or above | **78.5** | inside |
  | "you"/1k | 28 to 50 | **48.1** (120 hits) | inside, near ceiling |
  | "we"/1k | winner median 4.2 | 1.2 | inside |
  | Hard statute/1k | 0 | **0** | clean (see F-182) |
  | Question H2s | 40% or more | **9 of 10 (90%)** | inside |
  | Em-dashes / en-dashes | 0 / 0 | **0 / 0** | clean |
  | FAQ entries | 10 to 14 | **12** | inside |
  | metaTitle / metaDescription | 60 / 155 | **48 / 146** | inside |

  Verdict lands in the first 88 words with the pound haircut (£30,000 to £60,000 on a stated £300,000 home), per hard rule 11. `frontmatter_lint.py --check` and `validate_blog_content.py` both pass.

- 2026-08-21 RUN, **two brief-versus-spec conflicts, both resolved for the spec, both logged.**
  1. **Cost-table spec (5 columns) versus hard rule 8 (never five).** Already raised wave-wide as **F-180**; its proposed precedence (spec wins on form, brief wins on content) applied here. Built as ONE three-column table, `Item | Part exchange | Open market sale`, with a bold total row, which also satisfies the route-page "pitch versus reality" shape. The brief's "Deductible against CGT?" column moved into the CGT block as prose (hard rule 13 wants that block to be prose anyway) and the "Source" column moved into prose attribution.
  2. **Beat-them element 2 ("FA 2003 s.58A + Sch 6A para 1, named") versus hard rule 4 (zero hard statutory references in body prose).** Resolved as zero citations; the relief is on the page in plain words with all four para 1 conditions and the §1.Q framing rule. Raised as **F-182** because the same instruction sits in most of the wave's beat-them plans.

- 2026-08-21 RUN, **one figure sourced from outside this brief.** The estate-agent comparison needed a commission figure and this brief carries none (the brief says cross-reference A1, do not re-derive). Used the HomeOwners Alliance 2026 average sole-agency high-street fee of **1.42% including VAT**, quoted verbatim in `_language_spec.md` P1/P4 from the 2026-08-21 harvest of `hoa.org.uk`, attributed on the page by name and converted to £4,260 on the stated £300,000 (hard rule 5). Same source and same figure as the sibling A4 page (see F-181), so the wave is consistent.

- 2026-08-21 RUN, **one fact verified at write, because the brief did not resolve it.** Brief key-question 8 ("Do I pay SDLT on the new house, and on what figure?") had no Stage 2 answer. `https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm04020` ("Scope: How much is chargeable: Non-cash consideration: Exchanges", gov.uk, last updated **26 May 2026**) fetched HTTP 200 on 2026-08-21: on an exchange of major interests the chargeable consideration for each acquisition is **the greater of the market value of the subject matter of that acquisition and the consideration otherwise calculated**. So the buyer's bill is worked out on the value of the new home, not on the cash equalisation paid on top. Written on the page in plain words with HMRC named as a soft authority; no section cited. `SDLTM21020` re-fetched the same day (last updated 26 May 2026) and its four para 1 conditions transcribed verbatim into the page's plain-word list.

- 2026-08-21 RUN, **figures DECLINED for want of a source** (brief rule: no figure from memory): EPC cost, conveyancing cost, removals cost, and any monthly carrying-cost figure. All four appear in the comparison table as "Paid by you" / "Two to three months of your own running costs" with no number. The brief's own sourced set (Zoopla 80-90% of 16 Sep 2024, Taylor Wimpey 70% cap and 85-year lease floor, Barratt 80% cap with £500,000 ceiling and the 8-to-10-week valuation premise, Taylor Wimpey RICS/Home Report basis and easyMover fee terms) is used in full and attributed by name on the page. Statutory figures (half hectare, 24%) come from the locks; NHQB Code V2/V1 dates and the uncommenced 2022 ombudsman power from §26.15.

- 2026-08-21 RUN, **lock conformance checked line by line.** §1.Q framing rule carried verbatim in substance ("It is theirs, not yours... You would have paid no stamp duty on selling your house in any event"). §1.Q permitted-area resolution respected: the page states the half-hectare baseline once, for the SDLT condition only, and never asserts the two tests are the same. Chain break is described as the collapsed-buyer case (F-174 numbering, not the seed's). §5.B carried: removals and mortgage interest both stated as non-deductible, thin s.38(2) deductions on a no-agent route, and the arm's-length point (no market-value substitution, so the discount genuinely cuts the gain). §26.15 carried: no statutory ombudsman, power passed in 2022 and never commenced, NHQB registration is voluntary, second voluntary code named without quoting its own site (still 403 per Stage 2). Internal links all verified on disk except the pillar, the calculator and the three Wave 12 siblings, which are linked as spelled per the dispatch prompt.
