# Wave 12 site-wide flags

**Created:** 2026-08-21. **Status:** Pre-launch (no flags yet).

Sessions raise flags here when they surface site-wide issues during their work — existing-page stale figures, brief drift catches, cross-bucket forward-link needs, house-position extensions, etc. Flags do NOT block; sessions continue work after flagging.

**Discipline reminder (§16.15, §16.37):** session-time flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave12_site_wide_flags.md`. NEVER commit flag edits on a worktree branch.

Flag types per NETNEW_PROGRAM §13.2:
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)
- BRIEF_DRIFT — Stage 1a / Stage 2 brief contains a statutory or factual error caught at write time per §16.35 / §16.36
- INTERNAL_LINK — existing page should back-link to new Wave 12 page
- CROSS_BUCKET — forward-link from your bucket to another's pages (hyperlinks needing back-patch at wave merge per §16.32)
- REDIRECT — legacy slug should repoint to your new page
- HOUSE_POSITION_EXTENSION — house position needs new sub-section or clarification (manager closes)
- AUTHORITY_GAP — HMRC manual / legislation page never cited on our site, manager should consider adding

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step 4.)

---

## [F-150] HOUSE_POSITION_EXTENSION — no lock exists for TCGA 1992 s.38 allowable expenditure

**Raised:** 2026-08-21, Stage 1 Session A (batch A6-A9). **Status:** open. **Severity:** HIGH (blocks nothing, but all 13 Wave 12 pages depend on it).

house_positions §5 locks CGT rates (18%/24%), the £3,000 AEA, PRR, letting relief, s.58, s.162 and the 60-day regime. **It locks nothing about what expenditure is allowable.** The entire organising rule of Wave 12 rests on TCGA 1992 s.38(1)(c), and there is no house position for a writer to check against. The only s.38 references in the doc are incidental: §26.7 and the RRA/EICR tax hooks cite s.38(1)(b) for capital improvements, §25.4 cites the CAA s.270BG land-acquisition exclusion. A writer looking for the disposal-cost rule finds nothing.

**Proposed §5.A mini-lock (all WebFetch-verified 2026-08-21 at `https://www.legislation.gov.uk/ukpga/1992/12/section/38`):**
- s.38(1)(a): acquisition consideration "wholly and exclusively for the acquisition of the asset, together with the incidental costs to him of the acquisition".
- s.38(1)(b): enhancement expenditure "reflected in the state or nature of the asset at the time of the disposal", plus costs of establishing, preserving or defending title.
- s.38(1)(c): "the incidental costs to him of making the disposal".
- s.38(2): the definition of incidental costs, **exhaustive** per HMRC CG15250 ("TCGA92/S38 defines the incidental costs of acquisition and disposal. The definition is exhaustive.", verified gov.uk 2026-08-21). Four categories: professional fees (surveyor, valuer, auctioneer, accountant, agent, legal adviser); transfer or conveyancing costs including stamp duty / SDLT; advertising to find a buyer or seller; valuation or apportionment costs reasonably incurred for the CGT computation.
- s.38(3): "Except as provided by section 40, no payment of interest shall be allowable under this section."
- **Do not write:** "all the costs of selling are deductible" (the s.38(2) list is exhaustive); "mortgage interest / early redemption charges reduce the gain" (s.38(3)); "removal costs are deductible" (not in the list); "the letting agent's management fee reduces the gain" (revenue against rental income under ITTOIA 2005 s.272 applying s.34, not base cost).

---

## [F-151] HOUSE_POSITION_EXTENSION — no lock exists for estate-agency consumer law

**Raised:** 2026-08-21, Stage 1 Session A (batch A6-A9). **Status:** open. **Severity:** MEDIUM.

§26 locks the landlord-side regulatory framework (RRA 2025, BSA 2022, MEES, DHS, HMO/selective licensing, agent redress under SI 2014/2359). **Nothing in house_positions covers estate agency**, which A1-A8 all touch. Proposed mini-lock, all WebFetch-verified 2026-08-21:
- **Estate Agents Act 1979 s.18**: pre-contract disclosure of when remuneration is payable, the amount or method of calculation, and other payments; on failure "the contract or, as the case may be, the variation of it shall not be enforceable by him" except on court order, and the court may reduce or discharge the sum for the client's prejudice.
- **SI 1991/859 reg 5 + Schedule**: prescribed explanations of "sole selling rights", "sole agency" and "ready, willing and able purchaser". Sole selling rights is the wider liability (payable "even if the purchaser was not found by us but by another agent or by any other person, including yourself"); sole agency is narrower.
- **SI 2013/3134 regs 29, 30, 36**: 14-day cancellation right for distance and off-premises contracts (most agency agreements are signed in the home); reg 36(2) loss of the right on full performance after an express request; reg 36(4) proportionate payment on cancellation after early supply; reg 36(6) nothing payable where the trader failed to give the cancellation information.
- **DMCCA 2024 Pt 4 Ch 1** ss.225-230 (unfair commercial practices, misleading actions, misleading omissions incl. "material information", material information in an invitation to purchase).
- **Do not write:** "the Consumer Protection from Unfair Trading Regulations 2008" as live law (see F-152); the Property Misdescriptions Act 1991 as live (repealed); "there is a legal cap on estate agent commission" (there is none in England and Wales).
- Note for the manager: §26.5's [08-21] correction (TWO approved redress schemes, TPO + Property Redress) is the **letting/management** regime under SI 2014/2359 and must not be conflated with sale-side estate agency redress; the seed for A6 states the distinction.

---

## [F-152] EXISTING_PAGE_STALE — `sdlt-refund-scams-how-to-avoid` cites the revoked CPRs 2008 as live law

**Raised:** 2026-08-21, Stage 1 Session A (batch A6-A9). **Status:** open. **Severity:** MEDIUM.

`Property/web/content/blog/sdlt-refund-scams-how-to-avoid.md` line 149 reads: "... where the engagement was procured through high-pressure cold-call sales tactics that **breached the Consumer Protection from Unfair Trading Regulations 2008**, a civil claim or trading-standards complaint may be available".

**The CPRs 2008 are revoked.** legislation.gov.uk annotation, verified 2026-08-21: "Regulations revoked (6.4.2025 with transitional provisions and savings in relation to Pt. 4A, which is continued until regulations are made under s. 233 of the revoking Act) by Digital Markets, Competition and Consumers Act 2024 (c. 13), ss. 251(1), 339(1)". The replacement is DMCCA 2024 Part 4 Chapter 1 (ss.225-230), in force 6 April 2025.

The sentence is not flatly wrong for pre-6-April-2025 conduct (the savings preserve it), but it reads as current law and a reader acting on it today would cite a dead instrument. **Proposed back-patch:** reframe to DMCCA 2024 Pt 4 Ch 1 with a parenthetical that the CPRs still govern conduct before 6 April 2025. **Check monitored_pages for an armed window on this slug before editing** (the SDLT set is armed to the ~09-15 Bing read); if frozen, queue as a delta rather than patching in place. Not edited by this session (Stage 1 does not touch existing pages).

---

## [F-153] AUTHORITY_GAP — Land Registry Scale 1 fees cited on-site without the governing Order, and the 2021 Order is revoked

**Raised:** 2026-08-21, Stage 1 Session A (batch A6-A9). **Status:** open. **Severity:** LOW.

`lease-extension-solicitor-what-they-do.md` refers to "the Scale 1 registration fee" inside a disbursements row with no citation. The site has never cited the governing instrument. Any writer reaching for it from memory will land on **The Land Registration Fee Order 2021 (SI 2021/1226), which is revoked**. The live instrument is **The Land Registration Fee Order 2024 (SI 2024/931)**; Schedule 1 (Scale 1) verified at legislation.gov.uk/uksi/2024/931/schedule/1/made on 2026-08-21, bands: £0-80,000 £20 electronic / £45 otherwise; £80,001-100,000 £40 / £95; £100,001-200,000 £100 / £230; £200,001-500,000 £150 / £330; £500,001-1,000,000 £295 / £655; £1,000,001+ £500 / £1,105 (plus a reduced scale for voluntary first registration).

Worth adding to house_positions as a one-line citable anchor: it is one of very few property transaction costs fixed by statute rather than by market, and A9 (`cost-of-moving-house-uk`) makes it a table.

---

## F-150 · HOUSE_POSITION_EXTENSION · no house position covers SALES-agent regulation (blocks nothing, but 5+ Wave 12 pages depend on it)

**Raised:** 2026-08-21, Stage 1 session A, batch A1-A5. **Status:** open (manager closes at Stage 1b).

`house_positions.md` §26.5 locks the **lettings** agent redress regime (SI 2014/2359, two approved schemes: TPO and Property Redress) and the RRA 2025 **landlord** scheme. **Nothing locks the regime that governs an agent selling a house**, which is what every page in this wave's fees family is about. The phrase "Estate Agents Act 1979" appears on **zero of the 770 existing Property pages** (grep 2026-08-21).

Proposed §26.x "Sales-agent regulation", all limbs WebFetch-verified at legislation.gov.uk on 2026-08-21:

- **EAA 1979 s.1(1)**: "estate agency work" = things done **in the course of a business**, pursuant to **instructions received from another person** who wants to dispose of or acquire an interest in land, to introduce a third person or, after introduction, to secure the disposal. A private seller of their own home is outside it. (https://www.legislation.gov.uk/ukpga/1979/38/section/1)
- **EAA 1979 s.1(4)**: a person whose ONLY activities are publishing advertisements, disseminating information, or providing a means of direct buyer-to-seller communication is **outside the Act**. This is the portal-listing-intermediary boundary and the single most drift-prone fact in the cluster.
- **EAA 1979 s.1(2)**: excludes work done by a practising solicitor in the course of the profession, credit brokerage within the CCA 1974 meaning, distinct survey/valuation contracts, and planning/environmental matters.
- **EAA 1979 s.18**: fee information to the client **before contract** (when remuneration is payable, amount or method of calculation, additional payments with amount or estimate). **s.18(5)**: breach makes the contract unenforceable by the agent except by court order. **s.18(6)**: the court may dismiss the application or reduce/discharge the sum. (https://www.legislation.gov.uk/ukpga/1979/38/section/18)
- **SI 1991/859** (Estate Agents (Provision of Information) Regulations 1991) reg 5 + the Schedule "Explanation of certain terms": prescribed explanations of **sole selling rights**, **sole agency**, **ready, willing and able purchaser**; reg 6 prominence.
- **EAA 1979 s.23A + SI 2008/1712 art 2** (Estate Agents (Redress Scheme) Order 2008): "Every person who engages in relevant estate agency work shall be required to be a member of an approved redress scheme." Preamble confirms the power is s.23A EAA 1979 (s.23A + Sch 3 inserted by the Consumers, Estate Agents and Redress Act 2007). **DRIFT WATCH: this is a DIFFERENT instrument from SI 2014/2359 in §26.5. A future session reading §26.5 and writing about a selling agent will cite the wrong SI.** The lock must say so explicitly.
- **DMCCA 2024 Part 4 Ch.1**: s.225 (unfair commercial practices prohibited; **"trader" defined at s.225(3)** = a person acting for purposes relating to their business, or in that person's name or on their behalf), s.226 misleading actions, s.227 misleading omissions, **s.230** omission of material information from an invitation to purchase incl. **s.230(2)(b) total price**, "invitation to purchase" defined at s.230(10). **In force 6 April 2025 by SI 2025/272 reg 2(1)(3).**
- **CPUTR 2008 (SI 2008/1277) is REVOKED** by **DMCCA 2024 s.251(1)** ("The Consumer Protection from Unfair Trading Regulations 2008 (S.I. 2008/1277) are revoked"), in force 6 April 2025. Note: the legislation.gov.uk **contents page for SI 2008/1277 still shows "no known outstanding effects"**, so a session checking only that page will wrongly conclude it is live. The revocation is on the DMCCA side. **Do not write list: "CPUTR 2008 applies", "Property Misdescriptions Act 1991" (repealed), "letting agents and estate agents share one redress instrument".**
- **LSA 2007 s.12(1)(c) + Sch 2 para 5(1)(a)** (reserved instrument activities: "preparing any instrument of transfer or charge for the purposes of the Land Registration Act 2002 (c. 9)"), **s.13** (authorised or exempt only), **Sch 3 para 3(10)** ("The person is exempt if the person is an individual who carries on the activity otherwise than for, or in expectation of, any fee, gain or reward"). This is the DIY-conveyancing route for A3/A4. **Caution for the lock: Sch 3 has no express self-representation carve-out; para 3(10) is a no-fee-or-reward exemption. Stage 2 must not inflate it into "anyone may do conveyancing for anyone unpaid" without a further check against HM Land Registry practice guidance.**
- **SI 2013/3134** (Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013) **reg 30**: for a service contract the cancellation period "ends at the end of **14 days** after the day on which the contract is entered into"; **reg 31** extension for breach of the information requirement; **reg 36** supply of a service in the cancellation period. Relevant to any online/hybrid agency contract signed at distance (A5).

---

## F-151 · EXISTING_PAGE_STALE · `sdlt-refund-scams-how-to-avoid` cites CPUTR 2008 as live law

**Raised:** 2026-08-21, Stage 1 session A. **Status:** open.

`Property/web/content/blog/sdlt-refund-scams-how-to-avoid.md` line 149: "...high-pressure cold-call sales tactics that **breached the Consumer Protection from Unfair Trading Regulations 2008**, a civil claim or trading-standards complaint may be available".

The 2008 Regulations were **revoked by DMCCA 2024 s.251(1) with effect from 6 April 2025** (verified at https://www.legislation.gov.uk/ukpga/2024/13/section/251 on 2026-08-21; commencement SI 2025/272 reg 2(1)(3)). The replacement is **DMCCA 2024 Part 4 Chapter 1**, ss.225-227 (prohibition, misleading actions, misleading omissions). The sentence is not wrong about historic conduct, but as written it describes a revoked instrument as the current route. Back-patch: swap the citation to DMCCA 2024 Part 4 Ch.1 ss.225-227, or make the CPUTR reference expressly historic ("engagements entered into before 6 April 2025").

Only occurrence across the 770-page corpus (grep 2026-08-21). Single-line fix, no other page affected.

---

## F-152 · AUTHORITY_GAP · the entire estate-agency statutory framework is uncited across the corpus

**Raised:** 2026-08-21, Stage 1 session A. **Status:** open (FYI, manager decides whether it needs action beyond this wave).

Zero of 770 Property pages cite the **Estate Agents Act 1979**, **SI 1991/859**, **SI 2008/1712**, **SI 2013/3134**, or **DMCCA 2024 Part 4 Ch.1**. Wave 12's fees family will be the first, which is the authority opportunity: the consumer SERP for these keywords (HomeOwners Alliance, GetAgent, TheAdvisory, Which?, MSE) runs almost entirely on market convention with no primary-law citation at all. Worth the conductor noting for the pillar's own citation set.

---

## F-160 · HOUSE_POSITION_EXTENSION · no SDLT position covers FA 2003 Sch 6A part-exchange / chain-break reliefs

**Raised:** 2026-08-21, Stage 1 session A, batch A10-A13 (page: `part-exchange-house-uk`). **Status:** open (manager closes at Stage 1b).

The §1 SDLT family in `house_positions.md` has no position on **Finance Act 2003 Schedule 6A**, which is the statutory reason developer part-exchange exists as a commercial product. Proposed **§1.Q "SDLT Sch 6A: part-exchange, property-trader and chain-break reliefs"**, all limbs WebFetch-verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/6A on 2026-08-21 (latest revised, 21 Aug 2026):

- **Para 1, acquisition by a house-building company in case of part-exchange.** The company's acquisition of "the old dwelling" from an individual is **exempt from charge** where: the individual acquires a new dwelling from that company; the individual occupied the old dwelling as their only or main residence within the previous two years; the individual intends to occupy the new dwelling as their only or main residence; **"both acquisitions are entered into in consideration of each other"**; and the land acquired does not exceed the permitted area.
- **Para 2, acquisition by a property trader from an individual acquiring a new dwelling** (the "assisted move" case). Parallel relief, with extra conditions: the acquisition is made in the course of the trader's business of acquiring dwellings from individuals buying new properties; the trader does not intend to spend more than the permitted amount on refurbishment, grant a lease or licence, or permit occupation by principals or employees.
- **Para 3, chain transactions.** Relief where a property trader acquires the dwelling after the individual's own arranged sale-and-purchase fails, so the individual's purchase can proceed. Comparable refurbishment and permitted-area conditions.
- **The critical framing limb for sessions: this is the DEVELOPER's relief, not the seller's.** A consumer part-exchanging their home pays no SDLT on the disposal in any event. Writing "you get SDLT relief on part-exchange" would be wrong. The relief is why the offer is economically viable for the builder, which is a negotiating fact, not a taxpayer benefit.
- **Permitted-area collision worth locking alongside:** **TCGA 1992 s.222(2)** sets the private residence relief permitted area at "an area (inclusive of the site of the dwelling-house) of **0.5 of a hectare**", extended under s.222(3) only where a larger area is required for the reasonable enjoyment of the dwelling-house having regard to its size and character (verified https://www.legislation.gov.uk/ukpga/1992/12/section/222, 2026-08-21). Sch 6A carries its own permitted-area condition, so a large plot can break the developer's SDLT relief and the seller's full PRR at the same time. Stage 2 should confirm whether the two permitted-area tests are drafted identically before any page asserts they are.

---

## F-161 · HOUSE_POSITION_EXTENSION · §39 covers the TAX of a probate disposal but nothing covers the CONVEYANCING CAPACITY that governs the sale

**Raised:** 2026-08-21, Stage 1 session A, batch A10-A13 (page: `selling-a-probate-property`). **Status:** open (manager closes at Stage 1b).

§39 locks probate base cost (TCGA 1992 s.62), the s.274 ascertained-value rule and IHTA 1984 s.191 loss-on-sale relief. None of it answers the questions that actually stall a probate sale: who owns the house before the grant, who has to sign, and whether it can be marketed. Proposed **§39.A "Probate property selling-process floor"**, verified at legislation.gov.uk and gov.uk on 2026-08-21:

- **AEA 1925 s.1(1)** (https://www.legislation.gov.uk/ukpga/1925/23/section/1): real estate to which the deceased was entitled for an interest not ceasing on death "shall on his death ... devolve ... on the personal representative of the deceased, in like manner as before the commencement of this Act chattels real devolved on the personal representative". **s.1(3)** makes the PRs the representative of the deceased in regard to that real estate. The beneficiaries do not own the house.
- **AEA 1925 s.2** (https://www.legislation.gov.uk/ukpga/1925/23/section/2, revised text, amendments from 1 July 1995). **s.2(1)** applies the probate / letters of administration / administration-of-personal-estate law to PRs dealing with real estate and gives them the same powers of disposition. **s.2(2)** is the operative rule: where there is more than one PR, **a conveyance of real estate, or a contract for a conveyance, requires the concurrence of all of them or an order of the court**, EXCEPT that where probate has been granted to one or some of the executors named, that executor or those executors may convey without a court order and the conveyance is as effective as if all had concurred. This is the single most common cause of a collapsed probate sale and it is not written anywhere on our site.
- **The pre-grant marketing position is PROCEDURAL, not statutory.** There is no section of the 1925 Act prohibiting a pre-grant sale; the constraint is registrational and practical. gov.uk "Applying for probate" (verified 2026-08-21) says, verbatim: **"You should not make any financial plans or put property on the market until you've got probate"** and **"You'll normally have to start paying Inheritance Tax before probate is granted."** The lock must instruct sessions to **quote gov.uk rather than invent a statutory bar** (this is the framing the batch A10-A13 dispatch prompt required for the A13 probate anchor).
- **PRs' cost of establishing title: HMRC Statement of Practice SP2/04**, the agreed scale of allowable incidental expenditure for deaths after 5 April 2004 (superseding SP8/94 and SP7/81). Existence and coverage verified via **CG30560** (https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg30560, 2026-08-21). **CAUTION FOR THE LOCK: CG30560 does NOT reproduce the scale, and the gov.uk Statement of Practice page 404'd at seed time.** Do not lock figures until the current published scale is located; lock the existence and the manual reference only.
- **The PR-versus-beneficiary annual-exempt-amount fork.** §39 states PRs get the £3,000 AEA for the year of death plus the two following tax years, then nil, and that PRs pay the residential rate with a §39 instruction to **verify the PR rate at write time**. It does not state the statutory basis for the PR AEA. Gating item for the lock: find the section (or lock it on HMRC manual authority and say so). The practical consequence, which is a selling decision made before listing, is that assenting to beneficiaries first gives each beneficiary their own AEA and possibly the 18% band, whereas selling as PRs uses one estate AEA at the PR rate.

Related **AUTHORITY_GAP** folded in here rather than raised separately: **CG30560 and SP2/04 are cited on zero of the 770 existing Property pages**, and **CG15250** (incidental costs of acquisition and disposal, exhaustive s.38(2) list) appears on exactly one (`epc-certificate-cost-uk`). Both are core Wave 12 authorities.

---

## F-162 · HOUSE_POSITION_EXTENSION · §5 has no disposal-DATE or incidental-COSTS floor, and the whole of Wave 12 rests on both

**Raised:** 2026-08-21, Stage 1 session A, batch A10-A13 (all four pages; applies wave-wide). **Status:** open (manager closes at Stage 1b).

§5 locks CGT rates, the AEA, the 60-day rule and the reliefs. It locks nothing about **what a selling cost is** or **when a disposal happens**, which are the two facts every page in this wave depends on. Proposed **§5.B "Disposal date and incidental costs of disposal"**, all verified at legislation.gov.uk on 2026-08-21:

- **TCGA 1992 s.38(1)(c) + s.38(2)** (https://www.legislation.gov.uk/ukpga/1992/12/section/38, latest revised 20 Aug 2026). s.38(1)(c) allows "the incidental costs to him of making the disposal". **s.38(2) is EXHAUSTIVE** (HMRC CG15250: "The definition is exhaustive"): fees, commission or remuneration paid for the professional services of any **surveyor, valuer, auctioneer, accountant, agent or legal adviser**; costs of transfer or conveyance **including stamp duty or stamp duty land tax** (SDLT inserted by FA 2003 with effect 10 July 2003); plus, per CG15250, **costs of advertising to find a buyer** and **costs reasonably incurred in making any valuation or apportionment required for the CGT computation**. Nothing outside that list is deductible as an incidental cost. Removals, mortgage redemption fees and storage are NOT in it, which is the single most useful correction the wave can make.
- **TCGA 1992 s.28(1)** (https://www.legislation.gov.uk/ukpga/1992/12/section/28): "Where an asset is disposed of and acquired under a contract the time at which the disposal and acquisition is made is the time the contract is made (and not, if different, the time at which the asset is conveyed or transferred)." **s.28(2)**: a conditional contract is dated at the time the condition is satisfied. **The trap: the s.28 disposal date (exchange) and the FA 2019 Sch 2 para 3(1)(b) 60-day reporting trigger (completion) are DIFFERENT DATES.** At a traditional auction the contract is made on the fall of the hammer, so a spring auction can put the disposal in the earlier tax year while the 60-day clock starts weeks later.
- **FA 2019 Sch 2 para 3(1)(b)** (https://www.legislation.gov.uk/ukpga/2019/1/schedule/2): return due "on or before the **60th** day following the day of the completion of the disposal"; "60th" substituted for "30th" by **FA 2022 s.23(2)**. Note for the lock: §17.4 attributes the extension to the 27 October 2021 announcement, which is right on timing but the **enacting provision is FA 2022 s.23(2)** and that is what should be cited.
- **TCGA 1992 s.17(1)** (https://www.legislation.gov.uk/ukpga/1992/12/section/17): market value is substituted only where the disposal is "otherwise than by way of a bargain made at arm's length" or the consideration cannot be valued. Consequence for this wave: a below-market developer part-exchange or auction hammer price between unconnected parties is **not** re-based to market value, so a discount genuinely reduces the gain.
- **TCGA 1992 s.22(1)(c) + s.22(2)** (https://www.legislation.gov.uk/ukpga/1992/12/section/22): capital sums received "in return for forfeiture or surrender of rights" are a disposal, timed at receipt. Relevant to a forfeited deposit or a retained modern-method reservation fee.

---

## F-163 · INTERNAL_LINK · `bridging-finance-for-auction-purchases` should back-link the two Wave 12 auction pages

**Raised:** 2026-08-21, Stage 1 session A, batch A10-A13. **Status:** open (back-patch at wave merge per §16.32).

`Property/web/content/blog/bridging-finance-for-auction-purchases.md` is the **buyer-side** auction page and currently has no seller-side counterpart to point at. Once A10 `selling-a-house-at-auction-uk` and A11 `modern-method-of-auction-explained` are live, it should link both: the seller page for what the other side of the room is doing, and the modern-method page because a conditional-auction purchase has a materially different finance timetable from a traditional one (28 days from an unconditional contract versus a reservation period ending in an exchange that has not happened yet).

---

## F-164 · HOUSE_POSITION_EXTENSION · new-build consumer redress is NON-STATUTORY, and the drift risk is high

**Raised:** 2026-08-21, Stage 1 session A, batch A10-A13 (page: `part-exchange-house-uk`). **Status:** open (manager closes at Stage 1b).

**Building Safety Act 2022 ss.136-138** would create a statutory **new homes ombudsman scheme** (s.136 establishment duty, s.137 scheme conditions, s.138 definitions of "relevant owner", "new build home" and "developer"). **They have never been commenced.** The commencement annotation on s.136 reads verbatim: **"S. 136 not in force at Royal Assent, see s. 170(5)"**, and no commencement SI has been made (verified https://www.legislation.gov.uk/ukpga/2022/30/section/136, 2026-08-21).

What actually exists is voluntary: the **New Homes Quality Board**, a non-profit operating the **New Homes Quality Code**, current version **Code V2 (March 2026)** for homes reserved from 2 March 2026 (V1, October 2023, for earlier reservations), with redress through the **New Homes Ombudsman Service** available only to buyers of **registered** developers (verified https://www.nhqb.org.uk/, 2026-08-21).

**Do not write:** "the New Homes Ombudsman is a statutory scheme", "all developers must belong to the New Homes Ombudsman", or "BSA 2022 gives new-build buyers a statutory right of redress". This mirrors the §26.5 landlord-redress pattern exactly (an enacted-but-uncommenced redress chapter sitting next to a live voluntary regime), and it will drift the same way. Stage 2 item folded in: confirm whether the **Consumer Code for Home Builders** still operates alongside the NHQB code, and for which developers, before either is named on a page.

---

## F-165 · AUTHORITY_GAP · Land Registry Scale 1 fees cited on-site with no governing instrument (restored by conductor)

**Raised:** 2026-08-21, Stage 1 session A, batch A6-A9 (raised as F-153; that entry was lost to a concurrent flags-file write and is restored here by the conductor from the batch report). **Status:** open.

Land Registry Scale 1 fees are referenced on-site with no governing instrument, and the Order a writer would reach for from memory (**SI 2021/1226**) is **revoked**. The live instrument is **SI 2024/931** (HM Land Registry fee order), Sch 1 Scale 1 bands verified by the A9 seed on 2026-08-21; the A9 seed (`cost-of-moving-house-uk`) carries the band table for Stage 2. Any page citing registration fees cites SI 2024/931, never the 2021 Order.

---

## Conductor note on F-numbering (2026-08-21, Stage 1b)

All three Stage 1 batches were dispatched with the same F-150 to F-179 range (conductor error). Batch A1-A5 took F-150 to F-152; batch A6-A9's separate F-150 to F-153 entries lost the file race, but their substance is covered: s.38 lock proposal → F-162 (locked as §5.B), estate-agency lock → F-150 (locked as §26.14), CPUTR stale page → F-151, Land Registry gap → restored above as F-165. Batch A10-A13 self-rebased to F-160 to F-164. Next dispatch: allocate non-overlapping sub-ranges per batch.

---




