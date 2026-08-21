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

## F-174 · BRIEF_DRIFT + HOUSE_POSITION_EXTENSION · §1.Q mis-numbers the FA 2003 Sch 6A paragraphs, and the permitted-area question is now answered

**Raised:** 2026-08-21, Stage 2 session A, batch A10-A13 (page: `part-exchange-house-uk`; the para 3 point also reaches `selling-a-probate-property`). **Status:** open.

**1. Paragraph numbering is wrong in §1.Q and in the A12 Stage 1 seed.** Both say "para 2 (property trader, assisted move) and para 3 (chain-break)". Para 3 is not the chain-break case. Verified twice on 2026-08-21: paragraph headings at `https://www.legislation.gov.uk/ukpga/2003/14/schedule/6A`, and HMRC's own contents page **SDLTM21000** (`https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm21000`, last updated **26 May 2026**, HTTP 200), which gives the statutory gateway as **FA03/S58A and FA03/SCH6A**:

| Para | Subject | HMRC leaf |
|---|---|---|
| 1 | Acquisition by house-building company from individual acquiring new dwelling | SDLTM21020 |
| 2 | Acquisition by property trader from individual acquiring new dwelling | SDLTM21030 |
| **3** | **Acquisition by property trader from personal representatives** | SDLTM21040 |
| **4** | **Acquisition by property trader from individual where chain of transactions breaks down** | SDLTM21050 |
| 5 | Acquisition by employer in case of relocation of employment | SDLTM21060 |
| 6 | Acquisition by property trader in case of relocation of employment | SDLTM21070 |
| 7 | Meaning of "dwelling", "new dwelling" and "the permitted area" | - |
| 8 | Meaning of "property trader" and "principal" | - |

Overview at **SDLTM21010**. Relief code 28 on the return (per SDLTM21040). **Requested patch to §1.Q:** correct chain-break to **para 4**; add **para 3 (property trader acquiring from personal representatives)** as a named route, because it is the statutory explanation of the probate cash-buyer model and is directly load-bearing for A13; add the **FA 2003 s.58A** gateway and the SDLTM leaf references. Para 3 conditions verified verbatim at SDLTM21040: "the deceased individual occupied the dwelling as his main or only residence at some time in the two years ending with the date of his death"; "the area of land acquired does not exceed the permitted area"; withdrawal if the trader "spends more than the permitted amount on refurbishment of the dwelling", "grants a lease or licence of the dwelling", or "permits any of its principals or employees, or any person connected with any of its principals or employees, to occupy the dwelling".

**2. §1.Q's Stage 2 permitted-area question is ANSWERED: the two tests are NOT drafted identically.** Both verified verbatim on 2026-08-21 (latest revised, 21 Aug 2026). **FA 2003 Sch 6A para 7(3)**: "land occupied and enjoyed with the dwelling as its garden or grounds that does not exceed - (a) an area (inclusive of the site of the dwelling) of 0.5 of a hectare, or (b) such larger area as is required for the reasonable enjoyment of the dwelling". **TCGA 1992 s.222(2)**: "an area (inclusive of the site of the dwelling-house) of 0.5 of a hectare"; **s.222(3)**: "Where the area required for the reasonable enjoyment of the dwelling-house (or of the part in question) **as a residence, having regard to the size and character of the dwelling-house**, is larger than 0.5 of a hectare, that larger area shall be the permitted area." Same 0.5 hectare baseline; the CGT extension limb is expressly tied to enjoyment **as a residence** and to the **size and character** of the house, the SDLT one is not. **Requested patch:** replace the "Stage 2 must confirm" line with the answer, and add a do-not-write: "a permitted-area agreement under one tax binds the other".

**3. Still open, folded in here rather than raised separately.** The §26.15 Stage 2 item (does the Consumer Code for Home Builders still operate alongside the NHQB code) is **not fully closed**: `consumercode.co.uk` returned **HTTP 403** to automated fetch on 2026-08-21, so the primary source is unverified and must not be quoted. Secondary sources (LABC Warranty, NHBC and two law-firm comparisons) consistently describe two voluntary codes coexisting, with warranty providers accepting adherence to either, and the Consumer Code applying to developers registered with NHBC, Premier Guarantee, LABC Warranty and Checkmate. NHQB itself re-verified live: **Code V2 (March 2026)** for reservations from 2 March 2026, V1 (October 2023) before, redress via the New Homes Ombudsman Service for **registered** developers only. A session with browser access should close this properly before either code is named on a page.

---

## F-175 · HOUSE_POSITION_EXTENSION · §39.A can be upgraded from "figures NOT locked" to the actual SP2/04 scale, and the PR annual exempt amount now has a section

**Raised:** 2026-08-21, Stage 2 session A, batch A10-A13 (page: `selling-a-probate-property`). **Status:** open (manager patches §39.A).

Both of §39.A's explicit "not locked" items are now resolved at primary sources fetched on 2026-08-21.

**1. SP2/04 is live and quotable.** The gov.uk Statement of Practice page that 404'd at seed time was found: **`https://www.gov.uk/government/publications/statement-of-practice-2-2004--2/statement-of-practice-2-2004--4`**, "Statement of Practice 2 (2004)", published **20 August 2004**, HTTP 200. HMRC's own statutory reference on the face of it is **TCGA 1992 s 38(1)(b)**. The scale, for deaths on or after 6 April 2004:

| Gross estate value | Allowable expenditure |
|---|---|
| Not exceeding £50,000 | 1.8% of the probate value of the assets sold |
| Over £50,000 but not exceeding £90,000 | £900 fixed, divided between all estate assets in proportion to probate values |
| Over £90,000 but not exceeding £400,000 | 1% of the probate value of the assets sold |
| Over £400,000 but not exceeding £500,000 | £4,000 fixed, divided as above |
| Over £500,000 but not exceeding £1,000,000 | 0.8% of the probate value of the assets sold |
| Over £1,000,000 but not exceeding £5,000,000 | £8,000 fixed, divided as above |
| Over £5,000,000 | 0.16% of the probate value of the assets sold, subject to a maximum of £10,000 |

HMRC "will accept computations based either on this scale or on the actual allowable expenditure incurred", so the scale is an election, not a cap.

**LIMB CORRECTION, and it applies to F-161 and to this brief's own Stage 1 text.** The personal representatives' **cost of establishing title is s.38(1)(b)**, not s.38(1)(c). s.38(1)(b) is the limb containing "any expenditure wholly and exclusively incurred by him in establishing, preserving or defending his title to, or to a right over, the asset" (verified verbatim at `https://www.legislation.gov.uk/ukpga/1992/12/section/38`, latest revised 20 Aug 2026). The **selling** costs stay in s.38(1)(c) with the exhaustive s.38(2) list. §5.B is about the (1)(c) limb and is unaffected; §39.A should name (1)(b) explicitly so no page merges the two.

**2. The PR annual exempt amount has a statutory home: TCGA 1992 s.1K(7).** Verified verbatim at `https://www.legislation.gov.uk/ukpga/1992/12/section/1K`: section heading "Annual exempt amount"; **s.1K(7)**: "For the tax year in which an individual dies and for the next two tax years, this section applies to the individual's personal representatives as if references to the individual were to those personal representatives." §39.A's "statutory basis for the PR AEA not yet pinned" line can be replaced with the section. §39's own bullet ("PRs get the annual exempt amount for the year of death + two following tax years") should carry the same citation.

**3. The §39 PR-rate verify-at-write instruction is satisfied for 2026/27 only.** gov.uk "Capital Gains Tax rates" (`https://www.gov.uk/capital-gains-tax/rates`, fetched 2026-08-21) states verbatim: **"Trustees or personal representatives of someone who's died pay tax at 24% from 6 April 2026."** So 24% is correct and citable for a 2026/27 disposal. The §39 caution should be kept for any earlier year rather than deleted.

**Manual chain for the lock:** s.38(1)(b) → **CG30540** (last updated 21 Aug 2026, "it is necessary to decide what amount of incidental expenses is allowable", directs to "procedures set out in CG30560+") → **CG30560** (records the professional-bodies agreement, cites SP7/81, SP8/94 and SP02/04, **does not reproduce the scale**) → **SP2/04** at the gov.uk URL above.

---

## F-176 · EXISTING_PAGE_STALE · two live pages cite the repealed TCGA 1992 s.3(7) for the personal representatives' annual exempt amount

**Raised:** 2026-08-21, Stage 2 session A, batch A10-A13. **Status:** open (delta-queue; one is an armed cgt1 page).

`Property/web/content/blog/cgt-inherited-rental-property-calculation-uk.md` carries, verbatim: "The personal representatives' AEA is available for the tax year of death and the two following tax years (**TCGA 1992 s.3(7)**)." `Property/web/content/blog/inheriting-uk-rental-property-executors-step-by-step.md` carries the same citation. No other Property page does (repo-wide grep, 2026-08-21).

**The citation is dead.** TCGA 1992 s.3 no longer concerns the annual exempt amount at all: its heading is now "**Gains attributed to UK resident individuals etc**" and the annotation records "Pt. 1 substituted (with effect in accordance with Sch. 1 paras. 120, 123 of the amending Act) by **Finance Act 2019 (c. 1), Sch. 1 para. 2**" (verified `https://www.legislation.gov.uk/ukpga/1992/12/section/3`, 2026-08-21). The live provision is **s.1K**, with the personal-representative extension at **s.1K(7)** (verbatim text in F-175).

The substance on both pages is right; only the section number is stale. Same failure mode as the §17.4 NRCGT ss.14B-14H note: a pre-FA-2019 Part 1 section number that still resolves on legislation.gov.uk but no longer supports the claim. Requested fix: swap `s.3(7)` for `s.1K(7)` on both pages at the next touch. Wave 12 pages must cite s.1K(7) from the start.

---

## F-177 · BRIEF_DRIFT · two citation precision points, one in §5.B and one in §39

**Raised:** 2026-08-21, Stage 2 session A, batch A10-A13. **Status:** open (manager closes at Stage 2b).

**1. §5.B's modern-method reservation-fee note needs a conditional.** The lock currently reads: "**s.22(1)(c)**: capital sums for forfeiture/surrender of rights are a disposal timed at receipt (forfeited buyer's deposit; **a retained modern-method reservation fee needs this analysis**)". The A11 Stage 1 seed went further and assumed the fee is "forfeited **to the seller**". The market-leading platform's own published terms say the opposite. iamsold FAQ, verbatim, fetched 2026-08-21: **"Any retained Reservation Fee is used to cover auction, marketing and associated costs and is not paid to the seller."** Its buyer-fees page corroborates: the fee "is later used to cover the auction costs for the seller, including the listing agent and Auctioneer fees". **s.22(1)** only bites where "any capital sum is **derived from assets**" by the owner, and **s.22(2)** dates it to receipt by that person, so where the platform retains the fee the seller derives nothing and there is no s.22 event for the seller at all.

Requested patch: make the note conditional. Something to the effect of "a forfeited **buyer's deposit at a traditional auction** is a s.22(1)(c) capital sum in the seller's hands; a **modern-method reservation fee is usually retained by the auction platform and not paid to the seller** (iamsold's own terms), in which case there is no s.22 disposal for the seller and the fee is simply a real selling cost charged to the other side and therefore outside the seller's exhaustive s.38(2) list. Read the reservation agreement before asserting either way."

**Related, and worth a line in the same patch.** HMRC has **no published statement** on whether a modern-method reservation fee is chargeable consideration for SDLT. The applicable authority is the general test at **SDLTM03720** ("Guidance - Chargeable Consideration and Fees", gov.uk, **last updated 26 May 2026**, HTTP 200): a fee in addition to the purchase price is chargeable consideration where "it is a condition of the contract that the fee is paid", or "completion of the property transaction is conditional upon the fee being paid", or it is only payable once the transaction proceeds; a fee for a separate matter, "such as a purchaser's own legal costs", is not. The page **does not mention auction reservation fees or buyer's premiums**. HomeOwners Alliance asserts flatly and without citation that "HMRC will charge stamp duty on the final price agreed plus the reservation fee". Our pages state the test and its limits, never the flat assertion.

**2. §39's "Manual: CG30540" is attached to the wrong proposition.** §39 says "PRs (and beneficiaries) selling UK residential property file the 60-day return (Sch 2 FA 2019). **Manual: CG30540**". CG30540 is "Death and Personal Representatives: Personal representatives and their liabilities: Personal representatives: computing gains: normal rules apply" (gov.uk, last updated 21 Aug 2026, fetched 2026-08-21) and on its fetched text says nothing about the 60-day or 30-day return; it is the parent of the incidental-expenses chain that leads to CG30560. Requested patch: cite **FA 2019 Sch 2 para 3(1)(b)** for the obligation, and keep CG30540/CG30560 for the incidental-expenses point where they actually belong.

---

## F-166 · HOUSE_POSITION_EXTENSION · the sales-agent redress PENALTY is £1,000, and gov.uk's own page states it wrongly

**Raised:** 2026-08-21, Stage 2 session A, batch A1-A5 (pages: `cheapest-estate-agent-fees-uk`, `online-estate-agents-uk`). **Status:** open (proposed patch to §26.14).

§26.14 locks the redress **duty** (EAA 1979 s.23A + SI 2008/1712 art 2) but carries no penalty figure, and the obvious place a writer would look for one states it incorrectly.

- **SI 2008/1712 contains only articles 1 and 2** (contents fetched https://www.legislation.gov.uk/uksi/2008/1712/contents/made, 2026-08-21). The penalty is not in the redress Order.
- The figure is in **The Estate Agents (Redress Scheme) (Penalty Charge) Regulations 2008, SI 2008/1713, reg 2**, verbatim: **"The amount of the penalty charge specified in a notice given to a person under section 23B(1) of the Estate Agents Act 1979 shall be £1000."** In force 1 October 2008; legislation.gov.uk shows the original version with no amendments (fetched https://www.legislation.gov.uk/uksi/2008/1713/made, 2026-08-21).
- **gov.uk https://www.gov.uk/redress-scheme-estate-agencies (fetched 2026-08-21) says: "You may be fined up to £5,000 and have your licence revoked if you do not join a redress scheme."** That page covers estate agents and letting agents together. **£5,000 is the lettings-side figure and estate agents have never held a licence to revoke.** A session writing a sales page from gov.uk will publish both errors.
- The same page is still the authority for **which schemes are approved**, naming **"The Property Ombudsman Limited"** and **"Property Redress Scheme"**. Naming trap for the lock: the second scheme now trades as **"Property Redress"** (https://www.propertyredress.co.uk/ live 2026-08-21), so gov.uk carries the pre-rebrand name. `tpos.co.uk` returns **HTTP 403** to automated fetching; cite gov.uk for TPO, not the scheme's own site.

Proposed §26.14 additions: the £1,000 figure with its instrument and the s.23B(1) hook; the two approved sales schemes with both names for the second; and a do-not-write line, **"estate agents can be fined up to £5,000 and lose their licence"** (wrong on both limbs, and sourced from gov.uk itself). Cross-reference: the three-scheme error on `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` is the frozen sibling already delta-queued at §26.5 and is not re-flagged here.

---

## F-167 · HOUSE_POSITION_EXTENSION · the VAT rule for incidental costs of disposal lives at CG14300, and every Wave 12 seed pointed at the wrong manual page

**Raised:** 2026-08-21, Stage 2 session A, batch A1-A5 (all five pages). **Status:** open (proposed patch to §5.B).

§5.B locks the exhaustive s.38(2) list but says nothing about VAT, and half of this cluster's cost figures are quoted plus VAT while the other half are quoted inclusive. The A1 seed sent Stage 2 to **CG15250 / CG15260** for it. Both were fetched on 2026-08-21 and **neither mentions VAT**: CG15250 gives the exhaustiveness sentence and the four categories, CG15260 gives transfer and valuation examples and liquidator expenditure. CG15160 (also fetched) gives only the s.38(1) category headings.

The rule is in **CG14300**, "Computation: interaction with other taxes: income tax" (https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg14300, fetched 2026-08-21), verbatim:

- **"If VAT is suffered on the expenses of disposal and this is available for set-off in the vendor's VAT account, the expense exclusive of VAT is to be deducted"**
- **"If no set-off is available, the expense inclusive of VAT is to be allowed"**
- plus the two companion limbs: "the gain is to be computed by reference to the proceeds of disposal exclusive of VAT" and "the cost of the asset for capital gains purposes should be the cost exclusive of VAT".

**Consequence for the cluster:** an individual seller who cannot recover VAT deducts the **gross** agent's fee, so on a £300,000 sale at 1.42% including VAT the s.38(1)(c) deduction is £4,260, not £3,550. Every cost-of-selling page in Wave 12 needs this, and A1, A2, A4 and A5 have been written to cite CG14300 and to drop CG15260. HMRC's general position on irrecoverable VAT as an ingredient of expenditure is consistent (**BIM31535**: "the capital expenditure on any assets ranking for capital allowances is inclusive of the irrecoverable VAT"), but CG14300 is the direct authority and the only one that should be cited.

Proposed §5.B addition: the CG14300 rule in one line, plus a do-not-write, **"cite CG15250 or CG15260 for the VAT treatment"** (they are silent on it).

---

## F-168 · HOUSE_POSITION_EXTENSION · the §26.14 DIY-conveyancing caution can be closed: the limit is inside LSA 2007 Sch 3 para 3(3)(d), and HMLR PG67 is the practice guidance

**Raised:** 2026-08-21, Stage 2 session A, batch A1-A5 (pages: `sell-house-without-estate-agent`, `can-you-sell-a-house-without-an-estate-agent`). **Status:** open (proposed patch to §26.14; gating item now RESOLVED).

§26.14 currently says Sch 3 "has no express self-representation carve-out" and tells Stage 2 not to inflate para 3(10) without checking HM Land Registry practice guidance. Both halves are now settled.

**The statute supplies its own ceiling.** Sch 3 para 3 fetched in full (https://www.legislation.gov.uk/ukpga/2007/29/schedule/3, 2026-08-21). **para 3(10): "The person is exempt if the person is an individual who carries on the activity otherwise than for, or in expectation of, any fee, gain or reward."** **para 3(3)(d)** then makes a supervised individual exempt only where the supervisor "is entitled to carry on the activity, otherwise than by virtue of sub-paragraph (10)". So Parliament expressly contemplated the unpaid-individual exemption and expressly denied it any supervisory reach. Other limbs of para 3 for completeness: (2) public officers, (5) to (6) accredited CAAV or RICS members for farm business tenancies, (9) persons employed merely to engross, (11) Scottish solicitors.

**The practice guidance exists and is current.** **HM Land Registry practice guide 67, evidence of identity, conveyancers** (https://www.gov.uk/government/publications/evidence-of-identity-conveyancers/practice-guide-67-evidence-of-identity-conveyancers), **last updated 2 March 2026**, and **gov.uk "Completing forms ID1 and ID2"** (https://www.gov.uk/guidance/completing-forms-id1-and-id2), published 19 August 2014, **updated 5 February 2024**. Both fetched 2026-08-21. Key wording: **"Private individuals must complete form ID1"**; "You must provide evidence of identity for any party (and the person lodging the application if different) who is not legally represented"; section B completed by a conveyancer, Chartered Legal Executive or CLC-regulated Licensed Probate Practitioner; form ID3 verifiers include a "Chartered or certified accountant"; and the low-value carve-out, **"An ID form in respect of an unrepresented party is not required where the true value of the land which is the subject of the disposal, discharge or release is £6,000 or less"**, on a valuation certificate from "an estate agent, a surveyor, a land and property valuer or auctioneer".

Proposed §26.14 replacement wording for the caution: **you may prepare the transfer of your own property because you are not acting for fee, gain or reward (Sch 3 para 3(10)); you may not do it for another person for payment, and para 3(3)(d) denies the unpaid exemption any supervisory standing; HM Land Registry has a documented route for an unrepresented party (PG67, ID1/ID2) which still requires identity verification by a conveyancer or a listed professional.** Do-not-write stays as it is: **"anyone may do conveyancing for anyone unpaid"**.

Also worth adding to §26.14 while it is open: **EAA 1979 s.1(4) is a 2013 substitution** (revised text current to 20 August 2026, re-fetched 2026-08-21), so pre-2013 commentary on the portal boundary is unreliable, and the boundary now has a clean factual companion. Rightmove's own seller guide (fetched 2026-08-21) states that **"sellers and landlords aren't allowed to list properties themselves on Rightmove as a private seller"** and that "we only list homes from registered estate and letting agents". **The consequence, which three pages in this wave use: a route that reaches Rightmove runs through a business doing estate agency work and therefore inside the SI 2008/1712 art 2 redress duty; a route genuinely outside the Act under s.1(4) cannot reach Rightmove. The two are mutually exclusive.**

---

## F-169 · AUTHORITY_GAP · the seller's property information form is on its 6th edition since 30 March 2026 and appears nowhere in the corpus

**Raised:** 2026-08-21, Stage 2 session A, batch A1-A5 (pages: `sell-house-without-estate-agent`, `can-you-sell-a-house-without-an-estate-agent`). **Status:** open (FYI plus a currency risk; manager decides whether it needs a lock).

Grep 2026-08-21: **"TA6" appears on zero Property blog pages**, as do "sole selling rights" and "online estate agent". The TA6 is the document that carries a seller's **Misrepresentation Act 1967 s.2(1)** exposure, and any page in this wave that lists selling paperwork will name it.

The Law Society's own page (https://www.lawsociety.org.uk/topics/property/ta6-6th-edition) returned **HTTP 403** to automated fetching, so the currency fact is sourced from HomeOwners Alliance's TA6 guide (https://hoa.org.uk/advice/guides-for-homeowners/i-am-selling/ta6-form/, fetched 2026-08-21), verbatim: **"This guide relates to the latest TA6 property information form (6th edition) published by The Law Society and which came into force on 30 March 2026."** The 4th and 5th editions are superseded, and the controversial "material information" content that sat in the 5th edition is not in the 6th.

**Two cautions for writers.** First, a DIY seller who downloads a form from a search result will very often get a withdrawn edition, which is a genuinely useful thing for our pages to say and nobody else says it. Second, **do not publish a section count**: HOA's guide lists 13 sections and trade coverage says 15, and the Law Society page could not be reached to settle it. If a lock is wanted, it needs one manager-side fetch of the Law Society page from a browser rather than an automated fetcher.

---

## Conductor note on F-numbering (2026-08-21, Stage 1b)

All three Stage 1 batches were dispatched with the same F-150 to F-179 range (conductor error). Batch A1-A5 took F-150 to F-152; batch A6-A9's separate F-150 to F-153 entries lost the file race, but their substance is covered: s.38 lock proposal → F-162 (locked as §5.B), estate-agency lock → F-150 (locked as §26.14), CPUTR stale page → F-151, Land Registry gap → restored above as F-165. Batch A10-A13 self-rebased to F-160 to F-164. Next dispatch: allocate non-overlapping sub-ranges per batch.

---

## F-170 · AUTHORITY_GAP · the gov.uk Tenant Fees Act guidance every session reaches for was WITHDRAWN on 8 May 2026

**Raised:** 2026-08-21, Stage 2 session A, batch A6-A9 (page: `estate-agent-fees-for-renting`). **Status:** open. **Severity:** MEDIUM.

`https://www.gov.uk/government/publications/tenant-fees-act-2019-guidance` ("Tenant Fees Act 2019: guidance", published 1 April 2019, last updated 30 September 2020) is **marked withdrawn, 8 May 2026** (fetched 2026-08-21). It carries the three PDFs every landlord page cites: statutory guidance for enforcement authorities, guidance for landlords and letting agents, guidance for tenants. The A6 Stage 1 seed names it as a Stage 2 source. **No existing Property page links it** (grep of all 770 blog files for `tenant-fees-act-2019-guidance` returns nothing, 2026-08-21), so this is a forward-looking gap rather than a stale page, but seven pages mention the Tenant Fees Act and any of them being refreshed will reach for the dead URL.

**Live replacements, both fetched 2026-08-21:**
- `https://www.gov.uk/guidance/fees-you-can-charge-as-part-of-a-tenancy` (published 1 May 2026, last updated 7 July 2026). The landlord-facing page.
- `https://www.gov.uk/government/publications/tenant-fees-act-amended-by-the-renters-rights-act-2025` (updated 1 May 2026). Carries the re-issued statutory guidance for enforcement authorities.

**Substantive change folded in, worth a §26.5 line.** TFA 2019 Sch 1 has been amended by the RRA 2025: **paragraph 1(1A) and (1B) were inserted on 1 May 2026** prohibiting pre-tenancy rent for assured tenancies, and gov.uk states the rule verbatim as "From 1 May 2026, you cannot ask for a tenant to pay rent before the tenancy agreement is signed", with "a maximum of 1 month's rent in advance after you and your tenant have signed".

**Statute-versus-guidance divergence sessions must handle.** Sch 1 para 2 caps the tenancy deposit at "the amount of five weeks' rent, where the annual rent ... is less than £50,000, or the amount of six weeks' rent, where the annual rent ... is £50,000 or more". gov.uk instead says six weeks applies "For tenancies with an annual rent of between £50,000 and £100,000". **The statute has no upper bound. Quote the statute, not the gov.uk phrasing.** Holding deposit cap is one week's rent; default late-rent interest is "an annual percentage rate of 3% above the Bank of England base rate" after 14 days (Sch 1 para 4(5)).

Also confirmed on the same pass, for the record: **CRA 2015 s.83 is NOT amended by the RRA 2025** (page current to 20 August 2026; last amendments are the TFA 2019 changes of 1 June 2019 and Renting Homes (Wales) Act 2016 consequentials of 1 December 2022). The three-channel publication duty (premises, own website, third-party site or a link on it), the per-dwelling-or-per-tenant indication and "the amount of each fee inclusive of any applicable tax" all stand as the seed states them.

---

## F-171 · HOUSE_POSITION_EXTENSION · §5.B attributes two s.38(2) limbs to CG15250 that are on the face of the statute, and flattens the acquisition/disposal split

**Raised:** 2026-08-21, Stage 2 session A, batch A6-A9 (pages: A7, A9; applies wave-wide). **Status:** open (precision patch, manager closes at Stage 2b). **Severity:** LOW, but it touches every page in the wave.

§5.B currently reads: "fees, commission or remuneration for the professional services of any surveyor, valuer, auctioneer, accountant, agent or legal adviser; costs of transfer or conveyance including stamp duty or SDLT; **plus (per CG15250) advertising to find a buyer and costs of valuation/apportionment required for the CGT computation**".

**Those two limbs are in the Act, not only in the manual**, and they are direction-specific. TCGA 1992 s.38(2) re-fetched verbatim at `https://www.legislation.gov.uk/ukpga/1992/12/section/38` on 2026-08-21 (page states it is current to 20 August 2026), closing words:

> "... and costs of transfer or conveyance (including stamp duty or stamp duty land tax) together **(a) in the case of the acquisition of an asset, with costs of advertising to find a seller, and (b) in the case of a disposal, with costs of advertising to find a buyer and costs reasonably incurred in making any valuation or apportionment required for the purposes of the computation of the gain, including in particular expenses reasonably incurred in ascertaining market value where required by this Act.**"

**Proposed patch to §5.B:** cite s.38(2)(a) and s.38(2)(b) directly for the advertising and valuation limbs, and reserve CG15250 for what it actually supplies, the "the definition is exhaustive" characterisation. Add the direction split, because A9 is a both-ends-of-the-chain page and the distinction is live there: advertising to find a **seller** is an acquisition cost banked into base cost under s.38(1)(a); advertising to find a **buyer** is a disposal cost under s.38(1)(c).

Second limb worth adding while the section is open: **s.38(1)(b) also allows "any expenditure wholly and exclusively incurred by him in establishing, preserving or defending his title to, or to a right over, the asset"**. §5.B currently summarises s.38(1)(b) as enhancement expenditure only. The title limb is the argument a vendor facing a contested dual-fee claim would put (A8), and it is the same limb §39.A relies on for PRs' cost of establishing title, so the two locks should read consistently.

---

## F-172 · BRIEF_DRIFT · the Stage 1 seed for A8 states the ratio of Foxtons v Pelkey Bicknell backwards

**Raised:** 2026-08-21, Stage 2 session A, batch A6-A9 (page: `estate-agent-contract-tie-in-periods`). **Status:** corrected in the brief at Stage 2; logged here because the same error is near-universal on the consumer SERP and will be re-imported by any future session that checks a competitor rather than the judgment. **Severity:** MEDIUM (a page asserting it would be publishing a wrong statement of law).

The A8 seed says: "Lord Neuberger held that 'a purchaser introduced by us' means a person who becomes a purchaser as a result of that introduction, and that **an agent whose commission depends on a successful transaction must normally be the effective cause of that transaction**."

The first half is right. **The second half is the opposite of what the judgment says about that contract.** BAILII returned HTTP 403 on 2026-08-21; the judgment was read at `https://caselaw.nationalarchives.gov.uk/ewca/civ/2008/419` (Court of Appeal (Civil Division), 23 April 2008, Waller LJ, Rix LJ, Lord Neuberger of Abbotsbury). Verbatim:

- **Para 36 (the holding, reached by construction):** "in order to be entitled to a commission under the Terms for having introduced a purchaser, Foxtons have to show that they introduced the person concerned as the (eventual) purchaser, or, to put the point in Nourse LJ's words, that they introduced the purchaser to the purchase, and not merely to the property."
- **Para 37 (the limb the seed inverts):** "It appears to follow that there can be no question of implying into the Terms a requirement that Foxtons must have been the, or an, effective cause of the purchase in question."
- **Para 20 (the general principle the seed was reaching for, which is separate):** "the term identified in Article 57 of Bowstead is 'very readily' implied, especially in a residential consumer context, unless the provisions of the particular contract or the facts of the particular case negative it."
- **Para 24 (directly useful for any dual-fee section):** "While I accept that there could be circumstances in which more than one commission could be payable, it would far rarer an occurrence than on Foxtons' interpretation."
- **Para 22** sets out the two rival constructions. **Outcome: appeal allowed**, judgment for Mrs Bicknell.

**Writing rule for any page citing this case:** the construction point with para 36, the no-implied-term point with para 37, and the Bowstead Article 57 effective-cause principle with para 20 as a separate proposition. **Never "Lord Neuberger held the agent must be the effective cause."**

---

## F-173 · BRIEF_DRIFT + amendment to F-165 · Land Registry Scale 1 is not "electronic versus otherwise"; the reduced fee is whole-title portal transfers only

**Raised:** 2026-08-21, Stage 2 session A, batch A6-A9 (page: `cost-of-moving-house-uk`; gating item for the batch). **Status:** open. **Severity:** MEDIUM (a published fee table would be wrong for part transfers and new leases).

F-165 and the A9 seed both render SI 2024/931 Sch 1 Scale 1 as two columns, "£X electronic / £Y otherwise". HM Land Registry's own restatement (`https://www.gov.uk/guidance/hm-land-registry-registration-services-fees`, fetched 2026-08-21) shows four:

| Value or amount | By post | Portal or gateway, **whole-title** transfer or surrender | Portal or gateway, **part** transfer or new lease | Voluntary first registration |
|---|---|---|---|---|
| £0 to £80,000 | £45 | £20 | £45 | £30 |
| £80,001 to £100,000 | £95 | £40 | £95 | £70 |
| £100,001 to £200,000 | £230 | £100 | £230 | £170 |
| £200,001 to £500,000 | £330 | £150 | £330 | £250 |
| £500,001 to £1,000,000 | £655 | £295 | £655 | £495 |
| £1,000,001 and over | £1,105 | £500 | £1,105 | £830 |

**The reduced fee is not a discount for filing online. It is a discount for a portal or gateway application to transfer or surrender a WHOLE registered title.** A transfer of part, or a new lease, lodged electronically pays the full fee. On an ordinary whole-house sale the reduced column is correct, which is why the error is easy to miss and easy to publish.

Two further rules from the same sources, both worth carrying on any page that prints the scale: **"Where the amount or value is a figure which includes pence, it must be rounded down to the nearest £1"** (SI 2024/931 Sch 1), and **"When assessing fees under Scale 1, fees must be paid on the VAT-inclusive consideration or rent"** (HM Land Registry).

**Revocation of the 2021 Order confirmed** (the gating item), verbatim from `https://www.legislation.gov.uk/uksi/2021/1226`, fetched 2026-08-21: the instrument is titled "The Land Registration Fee Order 2021 (revoked)" and annotated "Order revoked (9.12.2024) by The Land Registration Fee Order 2024 (S.I. 2024/931), arts. 1(1), 14". **SI 2024/931 came into force 9 December 2024.** Any page citing registration fees cites the 2024 Order.

**Requested action:** amend F-165 in place to the four-column form, and if the conductor adds the one-line house-position anchor F-165 proposes, add it in the four-column form rather than the two-column one.

---




## F-178 · INTERNAL_LINK · the bridging-finance auction page explains the modern method in two places and links nowhere

**Raised:** 2026-08-21, RUN Session A (page: `modern-method-of-auction-explained`). **Status:** open. **Severity:** LOW.

`Property/web/content/blog/bridging-finance-for-auction-purchases.md` (live, Property Finance route) carries a full paragraph distinguishing the modern method from a traditional auction (body para beginning "Note the distinction from the modern method of auction") and an FAQ answer on the same question ("What is the difference between a traditional auction and the modern method of auction?"). Both are accurate against the Wave 12 locks and neither links out, because until this wave there was nowhere to send the reader.

**Requested action at wave merge:** back-patch one link in that body paragraph to `/blog/capital-gains-tax/modern-method-of-auction-explained`. The new page links forward to the bridging page already, so this closes the pair. No text change needed beyond the anchor.

---

## F-179 · AUTHORITY_GAP · SDLTM03720 (chargeable consideration and fees) appears nowhere in the corpus

**Raised:** 2026-08-21, RUN Session A (page: `modern-method-of-auction-explained`). **Status:** open. **Severity:** LOW.

`https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm03720` ("Chargeable Consideration and Fees", gov.uk, page last updated 26 May 2026) is cited for the first time on the site by this page, and it is the only published HMRC authority on whether a fee charged on top of a purchase price is chargeable consideration. Its three indicators (payment is a condition of the contract, completion is conditional on payment, the fee is payable only if the transaction proceeds) answer a recurring question well beyond auctions: developer admin fees, reservation deposits on new builds, and "buyer premium" charges generally.

**Requested action:** manager to consider whether the SDLT pages and the A12 part-exchange page should carry the same three indicators, and whether §1 warrants a one-line anchor to it. Note the limit found at Stage 2 and restated on the page: HMRC has published nothing that names modern-method reservation fees, so the manual supports an applied analysis, never a settled answer.

---

## F-180 · BRIEF_DRIFT · the Stage 2 table specs are wider than the language spec's hard rule 8 allows

**Raised:** 2026-08-21, RUN Session A (page: `can-you-sell-a-house-without-an-estate-agent`). **Status:** open. **Severity:** MEDIUM (affects any Wave 12 pick whose brief specs a wide table).

The A4 brief §4 specs a saving-versus-risk table with six columns (commission avoided · DIY costs · net saving · net saving after CGT at 18% · net saving after CGT at 24% · the sale-price gap that wipes the saving out). `_language_spec.md` hard rule 8 says cost tables are "two or three columns and carry a total row. Never five columns", measured from the winner set where W4's model tables are two columns and the winner median is zero tables. The two instructions cannot both be followed.

**Resolved on this page as:** two three-column tables. One comparison/cost table (`The job | With an agent | On your own`) with a total row, which also satisfies the route-page "pitch versus reality" shape; one decision table (`Sale price | Net cash saving | The lower price that cancels it out`) carrying the brief's differentiator column. The 18% and 24% figures moved into the CGT block as prose, which hard rule 13 wants anyway (one block, plain words, one pound figure, one link out).

**Requested action:** manager to confirm the precedence order for the remaining picks. Suggested: the language spec's hard rules win on FORM, the brief wins on CONTENT, and a brief table spec wider than three columns is split rather than trimmed.

---

## F-181 · BRIEF_DRIFT · the A4 worked-example figures are not reproducible from the brief's own sourced inputs, and the break-even claim is arithmetically wrong

**Raised:** 2026-08-21, RUN Session A (page: `can-you-sell-a-house-without-an-estate-agent`). **Status:** open. **Severity:** MEDIUM (the same fork is specced on A1, A3, A5, A9 and the pillar).

Two points, both found while building the table from the brief's Stage 2 sources.

1. **The £3,181 is not derivable.** The brief's worked example (a) states that a £300,000 private sale "saves about £3,181 of commission net of your own costs". The sourced inputs are commission at 1.42% including VAT (£4,260 on £300,000, HomeOwners Alliance 2026) and a private-sale listing package of £0 to £400 (MoneySavingExpert, 1 July 2026). Those give £3,860 to £4,260, not £3,181, and no combination of the brief's other sourced figures (conveyancing £800 to £1,500 or £610 to £950; EPC £50 to £120 or £60 to £120; DIY all-in £900 to £3,250) reaches £3,181. The dependent figures £2,418 and "a sale price £3,300 lower" inherit the error. This page therefore recomputed from the named sources and labelled the result as calculated, per the brief's own rule.

2. **The tax position does not move the break-even sale price.** The brief frames the taxable case as one where a smaller price gap wipes the saving out. It does not. If the saving is S and the price gap is G, a taxable seller keeps 0.76S and loses 0.76G, so the break-even is G = S at any rate. What the tax position changes is the size of the prize, not the price you have to match: £3,860 tax free becomes about £2,934 at 24%. The seed's headline ("if the sale is chargeable, the agent is cheaper than it looks and a weaker sale price is dearer than it looks") survives intact, because the agent's net-of-relief cost genuinely falls from £4,260 to about £3,238. Only the break-even limb is wrong.

**Requested action:** manager to correct the fork arithmetic in any brief that carries it before those pages are written, and to treat "the taxable seller has a tighter break-even" as a do-not-write.

---

## F-178 · BRIEF_DRIFT · the "1.5% really costs 1.14%" net-of-tax line applies the relief to the fee EXCLUDING VAT, which contradicts the locked CG14300 rule

**Raised:** 2026-08-21, RUN session A, pick A7 (`average-london-estate-agent-fees`). **Status:** open. **Severity:** MEDIUM (an understated saving printed as the wave's headline differentiator; the same line is drafted into more than one seed).

The A7 seed and its Stage 2 extension both carry the effect line "at the higher residential rate every £10,000 of commission is £2,400 of CGT you do not pay, so a 1.5% London fee on a let property really costs about 1.14%". The £10,000 example is right. The percentage conversion is not, because it applies the 24% relief to the fee **excluding** VAT while the seller actually pays, and deducts, the fee **including** VAT.

House position §5.B (F-167, CG14300 verified twice on 2026-08-21) is explicit: where the VAT is not available for set-off in the vendor's VAT account, "the expense inclusive of VAT is to be allowed", so a private seller deducts the gross fee. A quoted 1.5% plus VAT is 1.8% of the sale price, and 1.8% less 24% relief is **about 1.37% of the sale price**, not 1.14%. The 1.14% figure is what you get by relieving the net-of-VAT fee and then comparing it to a net-of-VAT headline, which is not the number any seller experiences.

A7 was written to the lock rather than to the brief: the page states the deduction is taken including VAT and prints the pound figures (£9,970 commission, £2,393 relief, £7,577 net at the London average) rather than the percentage conversion.

**Requested action:** correct the effect line in any remaining Wave 12 brief that carries it (A1, A2, A6 and A9 all price commission and all cite §5.B), so no sibling page publishes 1.14%. The safe house form is the pound version, or "1.8% including VAT costs about 1.37% after relief at 24%".

---

## F-182 · BRIEF_DRIFT · the beat-them plans instruct writers to NAME statutes in prose, which hard rule 4 forbids

**Raised:** 2026-08-21, RUN Session A (page: `part-exchange-house-uk`). **Status:** open. **Severity:** MEDIUM (the same instruction sits in most Wave 12 beat-them plans, and it is the stated differentiator on several of them).

Companion to F-180: same collision, different axis. F-180 is about table FORM; this one is about whether a statutory citation may appear in body prose at all.

The A12 brief's beat-them plan, element 2, reads: "**FA 2003 s.58A + Sch 6A para 1, named.** The builder's acquisition of your old house is exempt from SDLT if the conditions are met... Not one competitor names the relief." `_language_spec.md` hard rule 4 says: "**Zero hard statutory references in body prose.** No section numbers, no SI numbers, no Act names, no `legislation.gov.uk` in a sentence... The statutory anchors in each pack are for the writer's accuracy and for the fact-check trail, not for the page." The dispatch prompt restates it as "hard statute at effectively zero in prose". The two instructions cannot both be followed, and the brief calls the citation the page's structural differentiator.

**Resolved on this page as: zero hard statutory references, measured.** The differentiator survives without the citation, because what beats the competitor set is the FACT (the builder pays no stamp duty on the old house, which is why the offer exists) and the CONDITIONS (two-year main-residence occupation, intention to occupy the new dwelling, each acquisition entered into in consideration of the other, permitted area), not the reference. Both are on the page in plain words, together with the §1.Q framing rule that it is the developer's relief and never the seller's. HMRC's manual is named as a soft authority in one place only, which the winner set does 32 times across 35,385 words.

The same conflict is live on at least A1, A2, A3, A5, A8, A10 and A11, whose beat-them plans all name Acts or sections as the differentiator.

**Requested action:** manager to confirm the rule for the rest of the wave. Suggested, and consistent with F-180's proposed precedence: hard rule 4 wins on FORM (no citation in the sentence), the brief wins on CONTENT (the rule itself, stated in plain words, with the citation living in the pack and the work log). If instead the manager wants one named citation per page, say so explicitly, because the register spec as written reads as an absolute bar and every writer will resolve it the way this page did.

---

## F-183 · BRIEF_DRIFT · the three "disagreeing" fee sources agree exactly on the RANGE once VAT is handled, and two of them are the same numbers

**Raised:** 2026-08-21, RUN Session A, pick A1 (`how-much-do-estate-agents-charge-to-sell-a-house`). **Status:** open. **Severity:** LOW (no page is wrong yet; the risk is sibling pages publishing two ranges that are secretly identical and presenting it as a spread).

The A1 Stage 2 table spec instructs the writer that "the three sources disagree, and the page should say so rather than average them". On the AVERAGE they do disagree, and usefully: HomeOwners Alliance 1.42% including VAT against Which?/Rightmove roughly 1.3% including VAT. On the RANGE they do not disagree at all.

- HomeOwners Alliance, fetched 2026-08-21: overall range **0.9% to 3.6%**, quoted including VAT.
- MoneySavingExpert, updated 1 July 2026, fetched 2026-08-21: **0.75% to 3% plus VAT**, with its own cash conversion "£2,700 to £10,800" on a £300,000 property.

0.75% and 3% grossed up at the standard rate are 0.9% and 3.6%. MSE's own cash range confirms it: £2,700 is 0.9% of £300,000 and £10,800 is 3.6%. **The two sources publish one range in two presentations.** HOA's sole-agency (1.2% to 1.8% inc VAT) and multi-agency (3% to 3.6% inc VAT) bands are the same range split by model. Which?'s "less than 1% to as much as 3.5%" is the only genuinely independent range, and it is narrower at the top.

Two consequences for the rest of the cluster. First, a page that prints "0.9% to 3.6% (HOA)" and "0.75% to 3% plus VAT (MSE)" as two data points is double-counting one data point, which is the citation theatre hard rule 4 and the W13 do-not-copy row both warn against. Second, the agreement is itself the stronger claim: two independent guides land on the same bounds, so the range can be stated with more confidence than the brief's "they disagree" framing suggests.

**Resolved on A1 as:** the disagreement is stated on the AVERAGE only (1.3% to 1.42% including VAT as the central estimate). The range is given once, as "0.75% to 3% plus VAT", with the sourced cash conversion attached, and the table carries HOA's per-model split rather than repeating HOA's overall range as a separate line.

**Requested action:** manager to carry the same treatment into A2, A7, A9 and the pillar, all of which price commission from the same three sources. Suggested do-not-write: presenting HOA's 0.9% to 3.6% and MSE's 0.75% to 3% plus VAT as two different findings.

---

## F-184 · BRIEF_DRIFT · every Wave 12 table spec is wider than the language spec's hard rule allows, and A5's is the widest

**Raised:** 2026-08-21, RUN session A (page: `online-estate-agents-uk`). **Status:** open. **Severity:** LOW (writer-resolvable, but it will recur on at least four more pages this wave).

The A5 Stage 2 brief specifies a fee table of six columns: what you pay and when · cash cost at £200,000 / £300,000 / £450,000 · what you owe if the sale falls through · what is excluded from the headline price · source. `_language_spec.md` hard rule 8 says cost tables are "two or three columns" and "**never five columns**", and the route-page row in §3 prescribes "comparison table, three columns". The two documents cannot both be followed.

Resolved on the page in favour of the language spec, which the RUN prompt makes the authority on shape: the table runs three columns (fee shape · what it costs on a £300,000 sale · what you owe if the sale falls through), and the £200,000 and £450,000 conversions, the excluded £80 fee, and the per-figure sourcing moved into the prose immediately around it. Nothing from the brief's table spec was dropped, only relocated.

The same collision is visible in the A1, A2, A7 and A9 briefs, all of which specify four or more columns while the spec's measured winner median is **zero tables**. **Requested action:** conductor to state one rule for the wave, so QA does not read five identically-shaped deviations as five separate errors.

---

## F-185 · HOUSE_POSITION_EXTENSION · §39.A answers "who signs" but not "whose authority exists yet", and it is silent on a personal representative who dies

**Raised:** 2026-08-21, RUN session A (page: `selling-a-probate-property`). **Status:** open. **Severity:** MEDIUM (it changes the answer to the cluster's highest-volume question).

§39.A locks three things well: the house devolves on the personal representatives at death, a contract or conveyance needs ALL of them to concur unless the grant issued to only some of the named executors, and there is no statutory pre-grant sale bar. Two adjacent points that a probate-selling page reaches for on every draft are not in the lock and were therefore left off the page.

**1. Executors versus administrators before the grant.** An executor's appointment comes from the will and the grant confirms it; an administrator has no appointment at all until letters of administration issue. That distinction is the real answer to "can I accept an offer / exchange before the grant", because the two cases are not the same, and it is exactly the question that carries the volume in this cluster (`can you sell a house before probate is granted`, `can you put a house on the market before probate`). Nothing in §39 or §39.A says which side of that line the reader is on. Neither verified competitor states it either, so it is unclaimed ground rather than a correction. The page as shipped answers procedurally on gov.uk's words and does **not** assert the distinction, per the "no figure and no rule from memory" rule.

**2. Death of a personal representative mid-sale.** The seed for this page asks it directly ("What if one of the executors ... has died?") and the lock has no position. Whether the survivors can continue alone turns on whether the deceased PR had already proved, and there is a further rule where a sole proving executor dies. The page answers this in one sentence that routes the reader to the probate solicitor rather than stating law the lock does not carry.

**Requested action:** manager to extend §39.A with (a) the source of an executor's authority versus an administrator's, verified at legislation.gov.uk, and (b) the survivorship position when a PR dies before completion. Both are re-usable across the three existing probate-tax posts and `how-long-does-probate-take-in-the-uk`, none of which carry either point.

---

## F-186 · BRIEF_DRIFT · the A2 worked example nets the fee saving for tax but not the price loss, and the £2,582 headline is the result

**Raised:** 2026-08-21, RUN session A (page: `cheapest-estate-agent-fees-uk`). **Status:** open. **Severity:** MEDIUM (the number was specified for publication and it is not defensible).

The A2 Stage 2 brief's worked example (b) is correct up to its own punchline. It computes the after-tax fee saving properly: choosing a £1,079 fixed fee over a £4,260 commission on a £300,000 sale saves £3,181 of cash, the lost s.38(1)(c) deduction costs £763 at 24%, and the real saving is **£2,418**. It then writes: "if the cheaper route achieves £5,000 less on the price, you are **£2,582** worse off before you count anything else." £2,582 is £2,418 minus £5,000, which sets an **after-tax** fee saving against a **pre-tax** price loss.

A £5,000 lower sale price on a chargeable disposal reduces the gain by £5,000, so the tax falls by £1,200 at 24% and the loss after tax is **£3,800**. On one consistent basis the reader is **£1,382 worse off**, not £2,582. The page publishes £1,382 and shows the £1,200 tax reduction in the same sentence so the arithmetic is checkable. The rhetorical point the brief was reaching for ("the fee is the small number, the price is the big one") survives intact and is still comfortably won at £1,382.

**Requested action:** correct the A2 brief in place before any reuse, and check the same pattern in the A1 and A9 briefs, which both pair an after-tax fee figure with a gross price or cost figure in the same comparison. This is the second arithmetic-consistency flag on the wave's after-tax lines (see F-178 on the VAT base), which suggests the after-tax column needs one stated convention for the whole cluster: net everything, or net nothing, and say which in the sentence.

---

## F-187 · HOUSE_POSITION_EXTENSION · §26 locks the SALES-agent fee regime (§26.14) but nothing locks the LETTING-agent fee regime

**Raised:** 2026-08-21, RUN session A (page: `estate-agent-fees-for-renting`). **Status:** open. **Severity:** MEDIUM.

§26.14 was added this wave for selling agents: fee information before contract, prescribed wording, redress instrument, penalty. There is no mirror for letting agents. §26.5 covers letting-agent REDRESS only; §26.7 covers deductibility. Nothing in house_positions carries (a) the letting agent's fee-publication duty or (b) the tenant fee ban. F-170 recorded the dead gov.uk URL and the 1 May 2026 Sch 1 amendments but proposed only "a §26.5 line", not a lock. Every future landlord-facing fees, deposits or agent-selection page needs this, and the drift risk is the same one §26.14 exists to stop: writers reaching for the sales-agent instrument, or for gov.uk's wrong figures.

**Both write-time verify items in the A6 brief are now RESOLVED, verbatim, and belong in the lock:**
- **CRA 2015 s.87(7): "must not exceed £5,000"** (local weights and measures authority penalty for breach of the s.83 publication duty). Fetched `https://www.legislation.gov.uk/ukpga/2015/15/section/87` on 2026-08-21; page current to 20 August 2026.
- **TFA 2019 s.8: "must not exceed £5,000"**, rising to **"must not exceed £30,000"** where the authority is satisfied the breach is a s.12 offence. Fetched `https://www.legislation.gov.uk/ukpga/2019/4/section/8` on 2026-08-21; s.8 in force 1 June 2019, textual amendments applied 1 May 2026 by the RRA 2025.

**Requested action:** add a §26.16 letting-agent fee mini-lock carrying: the CRA 2015 s.83 three-channel publication duty (premises, own website, third-party site or link), the "inclusive of any applicable tax" and per-dwelling-or-per-tenant limbs, **s.85(1) putting LANDLORD-side fees inside the duty**, the s.87(7) £5,000 penalty; and on the tenant side the s.1/s.2 prohibition, Sch 1 permitted payments with the **statutory** deposit caps (five weeks under £50,000, six weeks at £50,000 or more, **no upper bound**, never gov.uk's £100,000 phrasing), one week's holding deposit, the 1 May 2026 para 1(1A)/(1B) pre-signature rent ban with one month maximum in advance, the two surviving default fees, and the s.8 £5,000/£30,000 penalties. Do-not-write list should carry: "letting agents and estate agents share one fee-disclosure regime" and "six weeks' deposit applies between £50,000 and £100,000".

---

---

## Conductor reconciliation note 2 (2026-08-21, post-RUN)

Duplicate F-178 resolved: the INTERNAL_LINK entry (bridging-finance page should
link A10/A11, raised by the A11 writer) is renumbered **F-188**; the BRIEF_DRIFT
entry (the 1.14 percent net-of-relief line applying relief to the ex-VAT fee,
raised by the A7 writer) is renumbered **F-189**. Writers' in-page references to
"F-178" in work logs map accordingly by content. Live flag register after RUN:
F-179 (SDLTM03720 authority note), F-180/F-184 (brief table-width vs spec rule 8;
RULED: spec wins, applied by all writers), F-181/F-186/F-189 (after-tax
arithmetic class; adjudication delegated to the factual QA round as the named
top item), F-182 (statute-in-prose vs spec rule 4; RULED: spec wins, applied by
all writers), F-183 (HOA/MSE range presentation), F-185 (executor-vs-administrator
authority lock, FUTURE, no page blocked), F-187 (letting-agent fee mini-lock
proposal, FUTURE), F-188 (merge back-patch), F-176 (s.3(7) stale citations on two
live pages, one armed: post-window back-patches).

## F-188 · BRIEF_DRIFT (F-178 family) · the Propelr borough ranges are PLUS VAT, and every brief that carries them drops the qualifier

**Raised:** 2026-08-21, QA fix round, pick A7 (`average-london-estate-agent-fees`), from BLK-A7-1. **Status:** open. **Severity:** MEDIUM (a wrong VAT basis printed next to an inc-VAT norm, on the page's own evidence for its outer-London argument).

The A7 brief §S2.2 records Propelr's borough table as "Kensington and Chelsea at 1.2% to 1.5% down to Barking and Dagenham at 1.5% to 2.0%" with no VAT basis. Propelr publishes those bands **plus VAT**, and its own cash conversions settle it: Kensington and Chelsea, average value £1,300,000, "1.2% - 1.5% + VAT", "£18,720 - £23,400", which is 1.44% to 1.8% inclusive; Barking and Dagenham, average value £320,000, "1.5% - 2.0% + VAT", "£5,760 - £7,680", which is 1.8% to 2.4% inclusive.

Two consequences. The bare percentages sat next to a stated London norm of 1.8% **including** VAT, so prime central read 20% cheaper than it is. And the page's outer-London argument inverted: on the true basis outer London is 1.8% to 2.4% inclusive, at or above the London norm, not below it.

This is the same failure as F-178, one layer down: the relief and the fee were both being taken on the wrong VAT basis because the brief did not carry one.

**Fixed on A7** at the fix round: all three instances now state "plus VAT" with the inclusive conversion, the borough prose now works from Propelr's own cash figures, and the outer-London paragraph states that the outer quote sits at or above the norm.

**Requested action:** patch §S2.2 in the A7 brief to carry the "+ VAT" basis and the two cash conversions, and check any sibling brief that inherited the same borough line before it reaches a page.

---
