---
slug: understanding-the-taxation-of-fhls-in-a-company
category: incorporation-and-company-structures
intent: Corporate-side reference page for a director or adviser of a UK limited company that currently holds (or is considering holding) former-FHL stock. Covers what changed for the company at FA 2025 Sch 5 Part 2 commencement, what the live CT regime looks like (Section 24 inapplicability, full mortgage interest deductibility, ATED gates at £500k SDLT, residential-rate CT-side CGT, capital allowances grandfathered pool mechanics within a company, NRL implications for non-UK parent groups). Sits parallel to the personal-side incorporation page.
---

# MegaWave 1 Stage 2 brief: understanding-the-taxation-of-fhls-in-a-company

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents + FHL — abolition and transitional rules)
**Session:** B
**Brief type:** Net-new page (no existing site page on company-side steady-state FHL taxation; `transferring-fhl-portfolio-to-limited-company` is the parallel incorporation-route page)
**Source markdown path on launch:** `Property/web/content/blog/understanding-the-taxation-of-fhls-in-a-company.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/understanding-the-taxation-of-fhls-in-a-company

---

## Manager pre-decisions

- **Suggested slug:** `understanding-the-taxation-of-fhls-in-a-company`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (FHL — abolition and transitional rules)
- **Framing differentiator (Stage 2 extended, 2026-05-26):**

> Corporate-side steady-state tax position for former-FHL stock held in a UK Ltd company. **Finance Act 2025 Schedule 5 Part 2** omits the company-side ITTOIA-equivalent FHL overrides via the Schedule's amendments to CTA 2009 ss.202, 250A, 252, 748 + Sch 4 and CTA 2010 ss.65, 67A, 188DD, 188ED, 269ZF (verified at https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 on 2026-05-26 — latest revision 20 March 2025). Commencement: accounting periods beginning on or after **1 April 2025** per Part 5 paragraph 12. Page leads with the **relative-attractiveness flip**: pre-abolition the personal-side regime carried full mortgage interest deduction + BADR + pension-relevant-UK-earnings + capital allowances, so the company-side advantage was modest; post-abolition the personal-side reliefs collapse but the company-side full mortgage interest deductibility (Section 24 at ITA 2007 s.272A applies only to individuals and partnerships of individuals) remains intact, flipping the relative comparison. Body walks: (1) commencement mechanics and the CTA 2009 + CTA 2010 omissions; (2) live CT rate architecture (19% small profits / 25% main / 26.5% marginal with associated-companies divisor under CTA 2010 ss.18D-18M, NOT s.18N as the Stage 1 seed mis-stated — corrected at Stage 2); (3) full mortgage interest deductibility under CTA 2009 s.272 subject only to TIOPA 2010 Part 10 CIR de minimis £2m; (4) ATED architecture under FA 2013 Part 3 with reliefs at FA 2013 ss.132-152 for arm's-length commercial lets; (5) grandfathered capital allowances pool mechanics under FA 2025 Sch 5 Part 3 + CA20025 transitional manual; (6) CGT on disposal as chargeable gain within CT (residential-rate equivalent for residential property; no BADR/Investors' Relief at company level — those are personal-side reliefs); (7) NRL scheme interaction for non-UK-parent group structures under ITA 2007 Part 13 Chapter 3 + FA 2019 Sch 2 corporate-side architecture; (8) the FA(No.2) 2024 anti-forestalling provisions did NOT bind companies because companies were never eligible for BADR (CGT-side personal-only relief). Sister page to `transferring-fhl-portfolio-to-limited-company` (incorporation transfer mechanic — different lane) and B14 (pension-impact decision tree, cross-links here for the company-route headroom restoration). Slug spelling note: "FHLs" plural is mildly unusual but mirrors the SERP form; body uses "former FHL property held in a company" throughout.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Cross-link discipline tight: B15 owns steady-state company tax position; `transferring-fhl-portfolio-to-limited-company` owns the incorporation-transfer mechanic; B14 owns pension headroom; this page links OUT for incorporation route, links OUT for pension mechanics, OWNS the corporate steady-state architecture.

**Drift-catch carryover:** (i) Cite **FA 2025 Sch 5 Part 2** (NOT FA 2024 Sch 5). (ii) Associated-companies divisor is CTA 2010 ss.18D-18M (the Stage 1 seed mis-attributed to "s.18N+" — corrected). (iii) Full expensing under CAA 2001 s.45S applies to companies on new P&M unused not second-hand; does NOT save the dwelling-house s.35 restriction (residential stock is excluded regardless of corporate vs individual ownership). Confirm at write time per §16.35.

---

## Competitor URLs (Stage 2 verified live 2026-05-26 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Competitor coverage of company-side FHL taxation is thin; most firm pages focus on personal-side incorporation decision. Extract any reader-friendly framings of the ATED reliefs catalogue and the corporate-interest-restriction de minimis.

- https://www.uklandlordtax.co.uk/furnished-holiday-lets/ — verified live 2026-05-26 (200). Broad FHL abolition coverage; explicitly predicts "increased limited company purchases for FHL operations, similar to buy-to-let trends, since corporations retain full mortgage interest deductions." Useful tone reference; does NOT cover ATED, grandfathered CA pool inside a company, or NRL implications.

**Stage 2 catch:** 8 firm URL candidates tried (BDO, RSM, Saffery, Crowe, Mishcon, Stevens & Bolton, Maples, ICAEW Tax Faculty) — all 403 / 404 / redirect-decay. Same pattern as Pick 1 (16 URLs tested across batch; only uklandlordtax.co.uk survives for FHL-cluster coverage).

<!-- competitor section: only 1 live URL surfaced at Stage 2; session-side WebSearch mandatory at write time per §16.31 -->

---

## GSC data

*Net-new page; primary topical queries expected: "FHL in a limited company tax", "furnished holiday let company corporation tax", "FHL company mortgage interest", "ATED holiday let", "FHL company capital allowances 2025". No existing site coverage in this lane; GSC will populate after launch.*

---

## Closest existing pages (cannibalisation context)

- `transferring-fhl-portfolio-to-limited-company` (Wave 1 B5; category: `incorporation-and-company-structures`) — incorporation-route page (s.162 incorporation relief, SDLT-on-transfer, ATED commencement on incorporation, FA(No.2) 2024 anti-forestalling provisions). **Cannib discipline:** sister page; this page is the STEADY-STATE position (post-incorporation tax architecture); the existing page is the TRANSFER mechanic (getting personal stock INTO the company). Mirror-link as canonical companion pair.
- `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` (Wave 6 C8) — capital allowances depth; this page references CA architecture but does NOT re-walk it. **Cannib discipline:** cross-link as deep-CA reference.
- `serviced-accommodation-tax-fhl-abolition-april-2025` (Wave 3) — abolition overview; cross-link.
- `furnished-holiday-let-tax-rules-exemptions` (rules overview) — broad FHL position; cross-link.
- B13 `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` — sister checklist page (PERSONAL side); cross-link as the personal-side counterpart.
- B14 `impact-of-fhl-tax-abolition-on-pension-contributions-key-insights-strategies` (this MegaWave) — sister; B14 references B15 for the salary + employer-contribution route.
- B17 `big-tax-changes-ahead-for-furnished-holiday-lettings` — timeline survey; cross-link.

**Cannibalisation decision:** This page OWNS the steady-state company tax architecture for former-FHL stock. The closest overlap is with `transferring-fhl-portfolio-to-limited-company` (Wave 1) — different lane (transfer vs steady-state), no overlap that requires de-scoping. The page is the canonical companion to that page; both should be cross-linked in both directions when this page deploys.

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap with the existing 429 middleware redirects. No middleware edit required.

---

## Authority links worth considering (Stage 2 verified live 2026-05-26, session selects 6-8)

**Statutory:**
- **Finance Act 2025 Schedule 5 Part 2** (FHL corporation-tax omissions; commencement Part 5 para 12 — 1 April 2025 CT): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 — verified live 2026-05-26; latest revision 20 March 2025.
  - **CRITICAL: confirm FA 2025 Sch 5 (not FA 2024 Sch 5).**
- **CTA 2009 s.272** (deductions for interest and finance costs — full corporate deductibility for property businesses; the headline mechanic that distinguishes companies from individuals post-FHL-abolition): https://www.legislation.gov.uk/ukpga/2009/4/section/272
- **CTA 2009 s.250A** (replacement of domestic items relief — company-side mirror of ITTOIA s.311A): https://www.legislation.gov.uk/ukpga/2009/4/section/250A
- **CTA 2010 ss.18D-18M** (corporation tax small profits rate and marginal relief; associated-companies divisor — corrected at Stage 2 from seed's "s.18N+" mis-citation): https://www.legislation.gov.uk/ukpga/2010/4/part/3A
- **TIOPA 2010 Part 10** (corporate interest restriction — £2m de minimis floor below which the restriction does not bite; relevant where multiple group companies leverage FHL stock): https://www.legislation.gov.uk/ukpga/2010/8/part/10
- **FA 2013 Part 3** (ATED — Annual Tax on Enveloped Dwellings; £500,000 single-dwelling-value gate; bands 2026/27 per HP §18.1; reliefs at ss.132-152 for arm's-length commercial lets): https://www.legislation.gov.uk/ukpga/2013/29/part/3
- **FA 2003 Sch 4A** (15% SDLT super-charge on company-held single-dwelling acquisitions over £500k — relevant for new acquisitions by the company): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4A
- **CAA 2001 s.15** (qualifying activities; s.15(1)(c) and (da) OMITTED by FA 2025 Sch 5 Part 3 with effect from 1 April 2025 CT / 6 April 2025 IT; verified at legislation.gov.uk on 2026-05-26 — latest amendment 20 March 2025): https://www.legislation.gov.uk/ukpga/2001/2/section/15
- **CAA 2001 s.35** (dwelling-house exclusion — bites in full on new post-2025 P&M spend on former-FHL stock regardless of ownership form): https://www.legislation.gov.uk/ukpga/2001/2/section/35
- **CAA 2001 s.45S** (full expensing for companies only; post-1-April-2023 permanent; UNUSED + not second-hand; does NOT override s.35 dwelling-house exclusion): https://www.legislation.gov.uk/ukpga/2001/2/section/45S
- **ITA 2007 s.272A** (Section 24 — applies to individuals, partnerships of individuals, and trusts ONLY; companies are NOT within scope): https://www.legislation.gov.uk/ukpga/2007/3/section/272A
- **ITA 2007 Part 13 Chapter 3** (NRL scheme — Non-Resident Landlord; for non-UK companies pre-April-2020; companies now within UK CT scheme under FA 2019 Sch 2 but ITA Part 13 may still apply transitionally for some structures)
- **TCGA 1992 s.152** (rollover relief — narrow availability for company-held property investment activity, which is NOT a trade; the former-FHL holding company is a property investment company, not a trading company)

**HMRC manuals:**
- **PIM4160** (FHL repeal contents): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4160 — verified live 2026-05-26.
- **PIM4170** (FHL commencement & qualifying tests; 1 April 2025 CT / 6 April 2025 IT): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4170 — verified live 2026-05-26.
- **PIM4180** (FHL capital allowances post-abolition; cross-refs CA20025): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4180 — verified live 2026-05-26.
- **CA20025** (FHL capital allowances transitional rules — verbatim Bob's worked example, £50k FHL pool merges with £12k residential pool = £62k main pool): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca20025 — verified live 2026-05-26.
- **CG73505** (CGT treatment post-FHL-abolition — BADR / rollover / loans-to-traders; anti-forestalling at FA 2025 Sch 5 para 14): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg73505 — verified live 2026-05-26.
- BIM45000+ (interest deductibility for businesses including companies)
- CTM02100+ (small profits rate and marginal relief mechanics)
- ATED1000+ (ATED bands, valuation, reliefs)
- PIM4810+ (NRL scheme)

**Cross-references in house_positions.md:** §6 (FHL abolition macro position); §25.7 (FA 2025 Sch 5 vs FA 2024 Sch 5 do-not-write); §3 (Section 24 carve-out for companies — the company-side advantage abolition does NOT remove); §18 (ATED — Wave 3 extension including 2026/27 bands + the relief catalogue); §21.5 (FIC mechanics — relevant where former-FHL company sits within a family-investment-company structure); §11 (RoE / ECCTA — for non-UK-parent groups).

---

## Worked-example data (RUN-phase to render in prose + table)

**Worked example 1 — 3-property former-FHL SPV: pre- vs post-abolition profile:**

- *Profile:* UK Ltd company, single-purpose vehicle, holds 3 properties (all formerly qualifying FHLs in Cornwall/Lake District). Total gross rent 2024-25: £180,000. Mortgage interest cost: £42,000. Operating costs (cleaning, utilities, agent commissions): £38,000. Pre-abolition pool TWDV at 31 March 2025: £35,000 main pool + £12,000 special-rate pool.
- *Pre-abolition (accounting period to 31 March 2025):* CT profit before allowances = £180,000 − £42,000 − £38,000 = £100,000. WDA on main pool 18% × £35,000 = £6,300; special-rate 6% × £12,000 = £720. CT taxable profit = £100,000 − £7,020 = £92,980. CT at marginal rate (£50,000-£250,000 band, no associated companies) = roughly £20,840 (verify exact rate at write time per F-19). After-tax retention = ~£72,140.
- *Post-abolition (accounting period beginning 1 April 2025):* CT profit before allowances unchanged at £100,000 (interest still fully deductible — Section 24 does not bite companies). Grandfathered pools continue under FA 2025 Sch 5 Part 3 + CA20025; WDA on main pool 18% × £35,000 = £6,300; special-rate 6% × £12,000 = £720 (unchanged). CT taxable profit = £92,980. CT charge unchanged at ~£20,840. **Post-abolition CT position essentially unchanged for the company.** New post-2025 plant spend (e.g. new boiler £4,000) is barred from P&M allowances by s.35 dwelling-house restriction; deductible as revenue replacement-of-domestic-items under CTA 2009 s.250A if eligible.

**Worked example 2 — ATED exposure on a £750,000 luxury holiday-let property:**

- *Profile:* Same Ltd company acquires a £750,000 freehold cottage in Cornwall in 2026 for letting on commercial holiday-let terms to unconnected parties.
- *Acquisition SDLT:* FA 2003 Sch 4A 15% super-charge applies because acquisition is by a non-natural person of a single dwelling >£500k. SDLT = £750,000 × 15% = £112,500. (Standard residential rates are NOT applied; the 15% flat charge supersedes the rate ladder above £500k for company acquisitions of single dwellings.)
- *ATED annual charge 2026/27 (HP §18.1):* Property value falls in the £500k-£1m band → ATED £4,500 per year (verify exact 2026/27 band at write time).
- *ATED relief at FA 2013 ss.132-152:* Property let on commercial holiday-let terms to unconnected parties is eligible for "commercial property let to a third party" relief (verify exact relief at write time — formerly s.133 commercial-let relief, may have been renumbered). Company files an ATED return claiming relief; relief reduces charge to nil but does NOT eliminate the filing obligation. Annual return due by 30 April for the year ahead; relief claim must be made on the return.
- *Post-acquisition CT position:* Rental income inside the company's ordinary property business; full interest deductibility; grandfathered pool inapplicable (new acquisition, no inherited pool); new fixture/fitting spend caught by s.35 dwelling-house restriction unless qualifying for common-parts exception.

**Worked example 3 — disposal of former-FHL company-held property:**

- *Profile:* Same Ltd company sells one of the three Cornwall cottages in 2027 for £600,000. Original cost £450,000 (acquired 2018). Indexation allowance frozen at December 2017 (Indexation Allowance Order 2018) — minimal post-freeze uplift, ignore for this worked example.
- *Chargeable gain computation:* £600,000 − £450,000 = £150,000 chargeable gain. Brought into CT charge under TCGA 1992 + CTA 2010 architecture; CT applied at the company's marginal rate (here marginal at 26.5% in the £50,000-£250,000 band, again no associated companies). CT on gain = £150,000 × 26.5% = £39,750.
- *BADR: NOT available.* BADR is a personal-side relief under TCGA 1992 Sch 7ZA; companies were never eligible. Post-abolition CGT treatment for the company is unchanged — no relief to lose.
- *Rollover relief (TCGA 1992 s.152):* Narrow availability. Requires disposal of business assets in a TRADE; a former-FHL holding company is a property investment company, not a trading company. Rollover unavailable for reinvestment into other property investment assets. Exception: if the company has a genuine trading branch (e.g. an associated serviced-accommodation operation with daily housekeeping and breakfast), rollover into trading-branch assets may be available — fact-specific; advise consult.
- *Anti-forestalling (FA 2025 Sch 5 para 14):* Targeted personal-side disposals during the announcement-to-abolition window seeking to lock in BADR. Did NOT bind companies (no BADR exposure to anti-forestall). For the company, the regime change is unconditional from 1 April 2025; no transitional CGT planning was available.

**Worked example 4 — non-UK-parent group structure (compliance overlay):**

- *Profile:* UK Ltd subsidiary holds 5 former-FHL properties; immediate parent is a Jersey company; ultimate beneficial owner is a UK-resident individual.
- *NRL scheme (ITA 2007 Part 13 Chapter 3):* The UK Ltd subsidiary is UK tax resident; income is reported in UK CT, not via the NRL agent/tenant-withholding chain. NRL scheme does NOT apply at the subsidiary level. NRL only applies where the immediate landlord is non-UK-resident; here the Jersey parent is NOT the landlord.
- *RoE (Register of Overseas Entities, ECCTA 2022):* Jersey parent must register the Jersey entity on Companies House RoE under ECCTA 2022 + ECTEA 2022 architecture (HP §11). Annual update + verifiable beneficial-ownership disclosure required. Failure to register prevents the Jersey parent from completing UK land transactions through the subsidiary chain — practical SDLT/conveyancing block.
- *ATED:* Each former-FHL property valued above £500k is in scope at the SUBSIDIARY level (the chargeable person is the company holding the dwelling, not the parent). Same FA 2013 ss.132-152 reliefs available.
- *Beneficial-ownership reporting:* PSC register at Companies House for the UK subsidiary; RoE for the Jersey parent; Trust Registration Service if any trust sits in the chain. Three separate compliance gates; non-aligned filing dates.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** **Single most-important verifications on this brief:** (1) confirm FA 2025 Sch 5 Part 2 (NOT FA 2024 Sch 5) for company-side CTA 2009 + CTA 2010 omissions; (2) confirm 1 April 2025 CT commencement under Part 5 para 12; (3) confirm CT rate architecture (small profits 19% / main 25% / marginal 26.5%) against current tax year; (4) confirm associated-companies divisor cite is **CTA 2010 ss.18D-18M** (Stage 1 seed had "s.18N+" — Stage 2 correction); (5) confirm ATED bands 2026/27 from HP §18.1; (6) confirm ATED reliefs section numbers FA 2013 ss.132-152 (verify against current re-numbering if any).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind classes.
- Lead-form role segments emphasise Limited company director + Portfolio owner + Adviser.

### CTA placement guidance (per this page)
- 3 inline `<aside>` CTAs:
  - After the relative-attractiveness-flip explanation (director realising the company-side advantage is now significant)
  - After the ATED architecture section (director with £500k+ stock realising the compliance gate)
  - After the disposal section (director planning sale needs the CT-on-gain modelled)
- Vary opening; do NOT lead with "Limited companies are taxed at corporation tax rates...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted.
- **Target: 10-12 FAQs** for this corporate-depth tier.

### Cannibalisation
- Read `transferring-fhl-portfolio-to-limited-company` + B13 + B14 + existing capital allowances pages BEFORE writing.
- Vary worked figures from `transferring-fhl-portfolio-to-limited-company` (which uses incorporation-transfer figures).
- Link OUT for incorporation route; link OUT for pension; this page OWNS the steady-state corporate position.

### House positions
- §6 (FHL abolition macro) primary; §3 (Section 24 carve-out for companies); §18 (ATED bands + reliefs); §25.7 (FA 2025 Sch 5 vs FA 2024 do-not-write); §11 (ECCTA for non-UK-parent groups).

### Quality bar
- Word count: 2,600-3,200 (corporate-architecture tier — longer than personal-side checklist).
- FAQs: 10-12.
- External authority links: 6-8.
- Build clean.
- All six verifications pass.

### Anti-templating
- Differentiator: corporate steady-state architecture + relative-attractiveness flip + ATED architecture. Write to it.
- Lead with the relative-attractiveness flip ("Pre-abolition the company-side advantage was modest; post-abolition the flip is structural..."), NOT with a definitional intro to corporation tax.
- Vary H2s from `transferring-fhl-portfolio-to-limited-company` by using STEADY-STATE H2s ("Live CT rate architecture", "Mortgage interest deductibility in the company", "ATED at £500k") rather than TRANSFER H2s ("Incorporation relief", "SDLT on transfer", "Anti-forestalling").
- **Anti-templating cross-check (this batch):** do NOT open with "From 6 April 2025..." or "Following abolition..." — owned by sister pages. Open with the relative-attractiveness flip specifically.

---

## FAQ draft (Stage 2 — RUN polishes prose; no further research needed)

1. **Q: What changed for a UK limited company holding FHL stock at 1 April 2025?** A: Finance Act 2025 Schedule 5 Part 2 omitted the company-side FHL overrides via amendments to CTA 2009 ss.202, 250A, 252, 748 + Schedule 4 and CTA 2010 ss.65, 67A, 188DD, 188ED, 269ZF. The company's qualifying-FHL business ceased to be a separate property business and folded into the ordinary UK or overseas property business. Commencement: accounting periods beginning on or after 1 April 2025. Companies with a December year-end therefore had the calendar 2025 period transition mid-year per FA 2025 Sch 5 Part 5 paragraph 12. Capital allowances pools grandfather under Part 3 + the HMRC CA20025 transitional manual.

2. **Q: Why is a limited company more attractive for former FHL stock now than it was pre-abolition?** A: Two-step answer. Pre-abolition: personal-side FHL operators had the full mortgage interest deduction AND Business Asset Disposal Relief on disposal AND pension-relevant-UK-earnings treatment, so the personal-side regime was already tax-efficient and the company-side advantage was modest. Post-abolition: those personal advantages collapse, but the company-side full mortgage interest deductibility (Section 24 at ITA 2007 s.272A applies only to individuals, partnerships of individuals, and trusts) remains intact. The relative attractiveness flips. The incorporation decision is now driven primarily by leverage gearing, extraction strategy, and ATED-band exposure rather than by ongoing-rental headline tax-rate.

3. **Q: What is the corporation tax rate on former-FHL rental profit?** A: Standard corporation tax architecture applies: 19% on profit up to £50,000; 25% on profit from £250,000; marginal rate of 26.5% on profit between the two bounds. The "associated companies" rule at CTA 2010 ss.18D-18M divides the £50,000 and £250,000 thresholds across the group, which is important for landlord SPV structures where one beneficial owner controls multiple companies (each company gets a proportional share of the bounds, not the full bounds independently).

4. **Q: Are mortgage interest costs fully deductible in the company?** A: Yes. Section 24 (ITA 2007 s.272A) applies only to individuals, partnerships of individuals, and trusts. Companies deduct interest in full under CTA 2009 s.272 + s.298. The only further restriction is the corporate interest restriction at TIOPA 2010 Part 10, which only bites groups with net interest expense exceeding £2 million per year. A typical single-SPV landlord company is well below the de minimis and is unaffected. For large portfolios consolidated under one umbrella company or a group structure with associated companies, the CIR computation needs to be run.

5. **Q: Does ATED apply to my company-held former FHL?** A: Yes, for any single dwelling held by a UK or non-UK company at a value over £500,000 at the 2022 revaluation date or acquisition date if later. The 2026/27 ATED bands run from £500,000-£1m at £4,500 charge through to £20m+ at £294,250 (verify exact 2026/27 figures from HP §18.1 at write time). Relief is available under FA 2013 ss.132-152 for genuine commercial-let property to unconnected parties on arm's-length terms, which is the relief most former-FHL operators rely on. Relief must be claimed annually on the ATED return (due by 30 April for the year ahead); the filing obligation persists even where relief reduces the charge to nil.

6. **Q: What about capital allowances on plant inside the property?** A: The grandfathered pool from pre-1-April-2025 plant claims continues writing down at 18% main-pool rate / 6% special-rate. The transitional carve-out under FA 2025 Sch 5 Part 3 is set out in HMRC CA20025 with a worked example (£50,000 FHL pool merges with a £12,000 residential pool to form a £62,000 combined main pool). New post-commencement plant spend on the former-FHL property is barred from plant-and-machinery allowances by CAA 2001 s.35 dwelling-house restriction in the same way as for personal-owner-side stock; the restriction bites regardless of corporate vs individual ownership. Revenue replacement of domestic items remains deductible under CTA 2009 s.250A (the company-side mirror of ITTOIA 2005 s.311A) where the replaced item meets the like-for-like criteria.

7. **Q: Does full expensing under CAA 2001 s.45S help my company?** A: Only for qualifying main-pool expenditure on UNUSED plant and machinery in a NON-residential context. CAA 2001 s.45S full expensing was made permanent from 1 April 2023 and is restricted to companies (individuals cannot claim it). However, it does NOT override the s.35 dwelling-house restriction. New plant in a former-FHL property remains barred from any P&M allowance (including full expensing) because the property is a dwelling. Common-parts of an HMO are a narrow exception. A trading-side activity (e.g. an associated serviced-accommodation operation with daily housekeeping that genuinely meets the trade test) may allow some claims; fact-specific.

8. **Q: CGT on disposal of a former-FHL property held in my company — what rate?** A: The disposal generates a chargeable gain inside corporation tax (not capital gains tax — companies do not pay CGT; they pay CT on chargeable gains via the TCGA 1992 + CTA 2010 architecture). The gain is brought into the company's CT computation at the prevailing marginal rate (19% / 25% / 26.5% per the small-profits architecture). No Business Asset Disposal Relief or Investors' Relief is available; both are personal-side reliefs at TCGA 1992 Sch 7ZA / Sch 7ZB. Rollover relief under TCGA 1992 s.152 is narrowly available only for reinvestment into trading-business assets; a former-FHL holding company is a property investment company (not a trading company), so rollover into other investment properties is generally unavailable.

9. **Q: I have a non-UK parent company holding the UK FHL stock through a UK subsidiary — what is the architecture?** A: The UK subsidiary is UK tax resident; rental income is reported in UK CT at the subsidiary level. The Non-Resident Landlord scheme (ITA 2007 Part 13 Chapter 3) does NOT apply at the subsidiary level (NRL only binds non-UK-resident landlords; here the subsidiary is UK resident). The non-UK parent must register on the Register of Overseas Entities at Companies House under ECCTA 2022 + ECTEA 2022 architecture (HP §11), with annual updates and verifiable beneficial-ownership disclosure. ATED applies at the subsidiary level for each dwelling above £500,000; reliefs apply on the standard basis. Three compliance gates run in parallel: PSC register (UK subsidiary), RoE (overseas parent), Trust Registration Service (if any trust sits in the chain). Filing-date alignment is not automatic; calendar the deadlines separately.

10. **Q: Did the FHL anti-forestalling provisions affect my company?** A: No. The anti-forestalling provisions at FA 2025 Sch 5 paragraph 14 (per HMRC CG73505) targeted pre-abolition disposals between announcement (6 March 2024) and abolition (5 April 2025) where the seller wanted to lock in Business Asset Disposal Relief. Companies were never eligible for BADR (personal-side relief only), so the anti-forestalling pattern had no direct company-side application. The provisions affected personal owners trying to crystallise gains before abolition. For your company, the regime change is unconditional from 1 April 2025 with no transitional CGT planning opportunity to either capture or lose.

11. **Q: Can I change my company's accounting reference date to optimise the abolition commencement?** A: Technically yes via Companies House CH AP01, but the optimisation is limited. FA 2025 Sch 5 Part 5 paragraph 12 sets commencement at "accounting periods beginning on or after 1 April 2025". A company with a 31 December year-end has the calendar 2025 period as the first post-abolition period (no transitional accounting period is created), with the corresponding 31 March 2025 deemed-cessation treatment per Part 5 transitional provisions. Shifting the ARD does not avoid commencement; it only moves the boundary date for the deemed cessation. Materially relevant only where the company holds inventory of furniture or trading stock that benefits from a particular cut-off date for inventory valuation.

12. **Q: How does this page differ from the existing `transferring-fhl-portfolio-to-limited-company` page?** A: The existing page is the INCORPORATION TRANSFER mechanic — it covers the steps for moving a personally-owned FHL portfolio into a Ltd company (s.162 incorporation relief, SDLT-on-transfer charge, ATED commencement at the moment of transfer, the FA(No.2) 2024 anti-forestalling provisions for personal-side disposals during the announcement window). This page is the STEADY-STATE position — written for the director or adviser who ALREADY holds (or is going to hold) former-FHL stock inside a Ltd company and wants the post-incorporation tax architecture rather than the transfer mechanics. The two pages are an intentional pair on the site: transfer page for the move-in route, this page for the steady-state position. Cross-link both directions.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §6 + §3 + §18 + §25.7 primary; §11 + §21.5 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs (this brief: only 1 surfaced at Stage 2; session-side WebSearch mandatory).
5. Read closest existing pages: `transferring-fhl-portfolio-to-limited-company`, `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`, B13, B14.
6. Plan H2 outline + meta + FAQ ordering + CTA placements.
7. Verify factual claims; **per §16.35: re-verify FA 2025 Sch 5 Part 2 + commencement + CT rates + associated-companies divisor cite (ss.18D-18M not 18N+) + ATED bands + reliefs section numbers on legislation.gov.uk and HMRC manuals at write time.**
8. Fetch Pexels image (search: "office boardroom calculator" or "limited company directors").
9. Write markdown with full frontmatter.
10. Build clean.
11. Six verifications.
12. No middleware edit on launch.
13. Register in `monitored_pages`.
14. **Commit on session's branch** (per-page commit).
15. Fill work-log.
16. Mark done.
17. Append flags (F-50..F-99 range).
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard MegaWave 1 Bucket B Q&A pattern; absolute path to main's `megawave1_questions_session_B.md`. Bracketed `## [Q-N]`.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review
- 

### Citations added
- 

### Internal links added
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to megawave1_site_wide_flags.md
- 

### 2-3 sentence summary
- 
