---
slug: claim-home-office-deduction-landlords
category: landlord-tax-essentials
intent: Focused deep-dive for a UK individual landlord who manages a residential rental portfolio from home and wants to know exactly how to claim a home-office deduction against their property-business profits — what's deductible, by what method (simplified flat-rate vs actual-cost apportionment), what HMRC's evidence expectations are, and what edge cases bite (mixed personal/business use, dedicated office room CGT-PPR exposure on sale, Limited-Company-landlord home office mechanics).
---

# How to Claim the Home Office Deduction as a Landlord: The Two Methods, Worked Examples, and the CGT Trap Most Landlords Miss

## Statutory anchor
- Primary: Income Tax (Trading and Other Income) Act 2005 c. 5, **s.272** "**Application of trading income rules: GAAP**" — verified verbatim at https://www.legislation.gov.uk/ukpga/2005/5/section/272 on 2026-05-26. Section 272 is the operative gateway that imports specified Part 2 (trading-income) deduction rules into a property business calculated under GAAP. Property-business expenses are deductible if (a) they meet the trading-income test that would apply under Part 2 had the activity been a trade, and (b) the specific Part 2 provision is one of those imported by s.272 (operative subsections enumerate the imported provisions; Stage 2 sub-agent re-verifies the imported subsection list at write time per §16.35).
- Primary (alternative simplified-expenses route): ITTOIA 2005 **s.94H** "**Use of home for business purposes**" — the trading-income simplified-expenses provision allowing a flat-rate monthly deduction based on hours worked at home (currently £10/month for 25-50 hours, £18 for 51-100, £26 for 101+; verify rates at write per §16.27 — s.94H rates last updated by SI; rates have been stable for several years but verify). s.94H is imported into property-business calculations via s.272 + s.271E framework. Stage 2 sub-agent verifies the s.272 import path for s.94H at write per §16.35.
- Primary (alternative actual-cost apportionment route): ITTOIA 2005 **s.34** "**Expenses not wholly and exclusively for trade and unconnected losses**" — the "wholly and exclusively" trading-income test applied to property businesses via s.272. Allows actual-cost apportionment where a definite part of the expense is attributable to property-business use; non-business element not deductible. The two-route choice (s.94H simplified flat-rate vs s.34 actual-cost apportionment) is the operational core of the home-office deduction architecture.
- Supporting (basis-period framework): ITTOIA 2005 s.271 (property business charge); s.271E (calculation in accordance with GAAP); s.272 (trading rules import — primary anchor above); ss.272-274 (specific application provisions). Verify each at write.
- Supporting (CGT trap — CRITICAL): TCGA 1992 **s.222(1)** + **s.224(1)** + **s.224(3)** Principal Private Residence relief — where a part of the dwelling-house is used exclusively for business purposes, the gain attributable to that part on disposal is NOT exempt under PPR (TCGA 1992 s.224(1) — "Adjustment of relief: business use"). This is the home-office CGT trap most landlords miss: claim "exclusive business use" of a room for the income-tax deduction at full apportionment, lose the corresponding PPR relief on that room on disposal. The two-route choice (simplified flat-rate vs actual-cost) interacts with the CGT trap: s.94H simplified flat-rate does NOT require exclusive business use (it is hours-based), so does NOT trigger the s.224(1) PPR restriction; actual-cost apportionment that hinges on "this room is used exclusively for the business" DOES trigger it.
- Supporting (Limited Company landlord — different regime): where the property business is run through a Ltd Co (e.g. landlord-LtdCo with the individual as director), the home-office mechanic shifts to ITEPA 2003 ss.316A-317 (employer-provided home-working allowance — £6/week / £312/year HMRC permitted amount, with higher amounts subject to PAYE/NIC) AND the CT side allows the company to deduct expenses paid to the director under a formal home-office rental agreement (ITTOIA 2005 s.272 applies to the company's CT calculation since the company is a property business). The director receives the rent personally and declares it as property income (with s.272 / s.94H / s.34 self-applying on the director's individual side). Boundary: this Ltd-Co route is operationally distinct from the individual-landlord route; sibling page or cross-link required.
- Supporting (HMRC manuals — anchor not statute): HMRC Property Income Manual (PIM) sections covering home office (PIM2120 + PIM2130 areas — verify exact section at write per §16.35); HMRC Business Income Manual (BIM) cross-references for the s.94H + s.34 trading-side mechanics; HMRC Capital Gains Manual on the s.224(1) PPR business-use restriction.
- House position reference: **PARTIAL HP COVERAGE** — house_positions.md does cover Section 24 (s.24 finance cost restriction, §4) but does NOT contain a locked position on landlord-allowable-expenses architecture generally or home-office specifically. The existing site page `landlord-expenses-allowable-uk-2026` partially covers home office in a single section but does not deep-dive the s.94H-vs-s.34 choice or the s.224(1) CGT trap. **F-52 raised in `megawave2_site_wide_flags.md`** to surface a Stage 1b HP-lock candidate for the landlord-allowable-expenses operational floor (including home office). Stage 2 sub-agent can proceed in the absence of the lock by self-sourcing the statute path above + the HMRC PIM + the CGT-trap framing from TCGA 1992 s.224(1) directly.

## Framing differentiator (anti-templating, anti-cannibalisation)

The site carries `landlord-expenses-allowable-uk-2026` (the broad allowable-expenses pillar page; ~Q4 2025 / Q1 2026 vintage, covers the full expense taxonomy including a brief home-office paragraph at the simplified £10/month example). Stage 2 sub-agent must read this page end-to-end before writing B5; if the existing page's home-office section has been deepened between this Stage 1 seed and Stage 2 write, raise CANNIBAL flag in `megawave2_site_wide_flags.md` (F-50..F-99 range).

This B5 page is the **focused deep-dive on home-office only**. Distinguished from the broad allowable-expenses pillar by:
- **Scope:** home office only, not the full expense taxonomy.
- **Depth:** walks the s.94H simplified-flat-rate route AND the s.34 actual-cost apportionment route AND the Ltd-Co director-home-office route AND the CGT trap (s.224(1) PPR business-use restriction). The pillar page covers the simplified flat-rate at headline-only depth and does not surface the CGT trap.
- **Decision framing:** answer the searcher's question "should I use the simplified method or actual-cost apportionment?" with a worked-example comparison + the CGT-trap angle.

**SERP / framing logic:** the slug `claim-home-office-deduction-landlords` is action-led — the searcher already manages a portfolio from home and wants to know how to claim. The page should be **decision + process led**, not definitional. Lead with the two-method decision-tree; deep-dive the simplified method; deep-dive the actual-cost method; surface the CGT trap (the differentiation hook); cover the Ltd-Co director angle as a forward-link.

Tone is plain-language with worked-example density; H2s are action-led ("How to claim the simplified flat-rate", "How to claim actual-cost apportionment", "The CGT trap: when claiming the deduction now costs you more on sale"); word count target 2,200-2,600.

**Counter-pattern Stage 2 must avoid:** opening with "Many landlords work from home and can claim a deduction..." (generic). Open instead with the choice the reader needs to make: "If you manage your rental properties from home, HMRC gives you two ways to claim a deduction. One is easier and never costs you anything on sale; the other is more generous and can quietly cost you tens of thousands of pounds in lost capital-gains relief when you eventually sell..."

## Key questions this page must answer

1. **Can a UK landlord claim a home-office deduction?** (Yes. ITTOIA 2005 s.272 imports the trading-income deduction rules — including s.94H simplified flat-rate and s.34 wholly-and-exclusively actual-cost apportionment — into the property-business profit calculation. The deduction reduces taxable rental profits at the landlord's marginal rate.)
2. **Which method should I use — simplified flat-rate or actual-cost?** (Decision tree: **Simplified flat-rate (s.94H)** suits low-touch portfolio managers — small portfolio, casual home admin time, no dedicated office room. Set monthly amounts based on hours worked at home (currently £10 for 25-50 hours/month, £18 for 51-100, £26 for 101+; verify rates at write per §16.27). No exclusive-use requirement; no record-keeping beyond hours log; no CGT downside. **Actual-cost apportionment (s.34)** suits high-touch managers with significant home-business-use — larger portfolio, dedicated office room, material home-running-cost overhead. Higher potential deduction but record-keeping burden + CGT trap exposure.)
3. **What costs can I include in the actual-cost apportionment?** (Apportionable categories: variable costs — electricity, gas, water, broadband (the business-use share); fixed costs — council tax, mortgage interest, insurance, rent, repairs (the business-use share, by floor-area + time-use formula). Apportionment formula: (business-use rooms ÷ total rooms) × (business-use time ÷ total time) × (relevant cost). HMRC accepts reasonable apportionment based on contemporaneous records; arbitrary "50% of all bills" allocations are challenged.)
4. **What hours qualify for the simplified flat-rate?** (s.94H counts hours where the landlord is working at home on the property-business activity — tenant communications, viewings co-ordination, rent collection follow-up, maintenance scheduling, accounts and tax preparation, deposit-protection administration. The flat-rate is a monthly figure based on the hours worked at home in that month. Records: contemporaneous time log (spreadsheet, calendar entries). HMRC accepts reasonable self-recording; no requirement to evidence each hour to the minute.)
5. **What is the CGT trap, and how do I avoid it?** (TCGA 1992 s.224(1) restricts Principal Private Residence relief where part of the dwelling is used **exclusively** for business purposes. If you claim actual-cost apportionment on a "dedicated office room used solely for the property business", the gain attributable to that room on disposal is NOT exempt under PPR. For a typical £500k home with one room of seven used exclusively for the business, ~14% of the gain becomes taxable at CGT rates (18% / 24% from 6 April 2024 — verify at write per §16.27). Avoidance routes: (a) use the simplified flat-rate (s.94H — no exclusive-use requirement, no PPR restriction); (b) use actual-cost apportionment with documented mixed-use (room used 95% for business + 5% for personal — no exclusive-use, no PPR restriction); (c) keep the room genuinely mixed-use and apportion the time element only. This is the differentiator angle of this page — the existing landlord-expenses pillar does not surface it.)
6. **What if I run my landlord business through a Ltd Co — does this change?** (Yes. Different statutory route. ITEPA 2003 ss.316A-317 gives the employer-provided home-working allowance — £6/week / £312/year HMRC permitted amount, paid by the company to the director without PAYE/NIC. Higher amounts triggered PAYE/NIC. ALTERNATIVELY, the director can grant the company a formal home-office rental arrangement: company pays rent to director under arm's-length lease; company deducts rent against CT (CTA 2009 s.54 + ITTOIA s.272 if company is property business); director declares rent as property income (with s.94H / s.34 self-applying on the director side); CGT trap STILL applies on director's PPR-relief-restriction at the room level. Sibling page or forward-link required; cross-link to LtdCo cluster pages.)
7. **Do I need to apportion if I work from a kitchen table or a bedroom corner?** (Apportionment can use either method. Simplified flat-rate works regardless of where you work; actual-cost apportionment requires identifying the business-use space, which can be a portion of a mixed-use room (e.g. 25% of the kitchen, for the dining-table corner used as home office) provided the apportionment is reasonable + documented. The exclusive-use CGT trap does NOT bite where the space is genuinely shared between business and personal use — the s.224(1) trigger is "exclusive business use".)
8. **What records does HMRC expect?** (Simplified flat-rate: hours-worked log. Actual-cost apportionment: bills (utilities + council tax + insurance); apportionment formula records; floor-area calculation; time-use evidence. HMRC's enquiry pattern on home-office deductions is light for simplified flat-rate (mechanical, hard to challenge); medium for actual-cost apportionment (proportionality + reasonableness review); high where actual-cost claims trigger CGT-trap PPR restrictions that the taxpayer has not reflected on the disposal — HMRC opens enquiries on disposal-side computations that don't carry through the historical income-tax claim.)
9. **Can I claim a home-office deduction if I'm also a salaried employee working from home?** (Two parallel routes that don't double-count: (a) employment-side via ITEPA 2003 s.336 (homeworking allowance + qualifying conditions, subject to employer-allowance rules and the post-Covid HMRC tightening); (b) property-business-side via ITTOIA 2005 s.272 / s.94H / s.34. Both routes can apply if the home is used for both activities; the property-business deduction applies to property-business hours only, not the employment-side hours. Allocation must be reasonable + documented. Sibling employment-side page or forward-link recommended.)
10. **What if I'm letting through an FHL or short-stay accommodation business?** (FHL income-tax status abolished from 6 April 2025 (FA 2024 s.25 + Sch 4 — Wave 1 lock §1.O); FHL businesses are now treated as ordinary property businesses for income-tax purposes. Home-office deduction mechanic is the same as for standard residential lettings — s.272 + s.94H / s.34 apply. Pre-FHL-abolition the route was s.34 + Part 2 trade rules directly (since FHL was treated as a trade for capital allowances + relief purposes); post-abolition it routes through the property-business framework. Cross-link to sibling FHL-abolition pages.)

## Manager pre-decisions placeholder
- Category routing: `landlord-tax-essentials` (best fit — the topic is landlord-side income-tax mechanics. Alternative is `portfolio-management` if framing leans operational, but income-tax mechanics is the dominant angle. Sub-agent recommends `landlord-tax-essentials`.)
- Worked-example numbers: simplified flat-rate £10 / £18 / £26 monthly figures — verify against current gov.uk s.94H rates at write per §16.27 (last verified update per HMRC simplified-expenses page — rates stable for several years; verify before publication). Actual-cost worked example — use anonymised illustrative numbers (e.g. £500k home, one room of seven, etc.); cite TCGA 1992 s.4 CGT rates by-reference (18% / 24% from 6 April 2024) per §16.27.
- Cross-link targets: `landlord-expenses-allowable-uk-2026` (broad pillar — forward-link from headline framing); `principal-private-residence-relief-landlords` (PPR mechanics — forward-link from question 5); `2027-tax-rates-incorporation-decision-property-landlords` / `2027-tax-rates-incorporation-decision-uk-landlords` (incorporation decision — forward-link from question 6 Ltd-Co route); FHL-abolition pages (forward-link from question 10); sibling MW2 pages where they ship.

## Stage 2 research target list
- Competitor pages to fetch (Stage 2 verifies liveness before listing): RITA4Rent / Provestor / 4 The Landlord home-office explainers; Hammond & Co + Forbes Dawson + Crowe + RSM landlord home-office briefings; landlord-press home-office pieces (Landlord Today, Property118, This is Money landlord pages — verify liveness); HMRC PIM2120-PIM2130 area direct.
- HMRC manuals to cite: PIM (Property Income Manual) 2120 area on home office; BIM (Business Income Manual) cross-references for s.94H + s.34 trading-side; CG (Capital Gains Manual) on s.224(1) PPR business-use restriction. Verify exact sections live at write per §16.35.
- Case-law to ground: case-law density on home-office deductions is low; rely on statute + HMRC manuals. Notable: any *Mallalieu* / *Thomson*-type wholly-and-exclusively case for the s.34 angle (verify citations at write).

## Universal rules + workflow stubs (Stage 2 fills)
[Stage 2 populates from NETNEW_PROGRAM §4 — voice (no em-dashes; commas, parentheses, full stops, middle dots only); lead-gen architecture (LeadForm footer auto-injected; aside-styled inline CTAs at conversion moments — after the two-method decision tree, after the CGT-trap paragraph, after the Ltd-Co route paragraph); semantic HTML only; FAQs 10-12 entries given action-led format with worked-example density; FAQPage JSON-LD auto-emitted; cannibalisation re-grep against `landlord-expenses-allowable-uk-2026` at write time; rate-by-reference for s.94H flat-rates + CGT rates per §16.27; quality bar six-verification gate (0 em-dashes, 0 Tailwind class attrs, FAQ count match, metaTitle ≤62, metaDescription ≤158, all internal `/blog/...` links resolve); anti-templating opening per the framing-differentiator (open with the choice the reader needs to make, not generic-many-landlords).]

## Work log (Stage 2 + RUN session populate)
[Stage 2 + RUN session record their work here. Stage 1 seed verifications: ITTOIA 2005 s.272 ("Application of trading income rules: GAAP") existence + heading verified verbatim via WebFetch against https://www.legislation.gov.uk/ukpga/2005/5/section/272 on 2026-05-26. ITTOIA 2005 s.94H (simplified-flat-rate home-office), s.34 (wholly-and-exclusively trading test) imported via s.272 — Stage 2 sub-agent verifies the s.272 imported-provisions list against current legislation.gov.uk text at write per §16.35. TCGA 1992 s.224(1) (PPR business-use restriction), TCGA 1992 s.222(1), ITEPA 2003 ss.316A-317 (Ltd-Co home-working allowance) — Stage 2 sub-agent verifies at write per §16.35. s.94H flat-rate figures (£10/£18/£26) cited from HMRC simplified-expenses page (stable for several years); Stage 2 verifies against current gov.uk publication. F-52 raised for HP-lock candidate on landlord-allowable-expenses operational floor (including home office). Cannibalisation check: `landlord-expenses-allowable-uk-2026` currently has one home-office paragraph at simplified-flat-rate £10/month example only; B5's home-office deep-dive + CGT-trap angle is non-overlapping. Stage 2 re-greps at write time.]

### Stage 2 extension log
- **2026-05-27** — Stage 2 sub-agent (M2-B-B1) appended Competitor URLs, Closest-existing-pages cannibalisation context, Redirect-overlap check, Authority links, Universal rules, 19-step Workflow, and Per-page work-log skeleton (below). **HP-LOCK NEWLY THREADED: §34 Landlord allowable expenses + home-office cross-tax trap operational floor** signed off by Stage 1b reviewer 2026-05-27 (commit 96ea3a6 closing F-52). §34 now anchors B5 with: statutory architecture (ITTOIA 2005 s.272 import gateway), home-office two-route choice + CGT-trap (s.94H simplified flat-rate vs s.34 actual-cost apportionment, with exclusive-business-use characterisation triggering TCGA 1992 s.224(1) PPR restriction on disposal — the differentiator hook), cross-tax discipline framing, Ltd Co-landlord home-office mechanic via ITEPA 2003 ss.316A-317 + formal director rental, do-not-write list. Stage 2 sub-agent did NOT independently re-verify ITTOIA 2005 s.272 (carried forward verbatim from Stage 1 — confirmed live URL). s.94H flat-rate figures (£10/£18/£26) + CGT rates 18%/24% from 6 April 2024 remain rate-by-reference per §16.27 (RUN session WebFetches gov.uk simplified-expenses page + TCGA 1992 s.4 at write). Out-of-wave back-patch candidate logged: `landlord-expenses-allowable-uk-2026` pillar page does NOT surface the CGT trap on its home-office paragraph — should be back-patched once B5 ships (Stage 2 surfaces this as discovery for Stage 1b conductor / RUN session to escalate to manager queue).

---

## Competitor URLs (Stage 2 populated 2026-05-27; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` + `BeautifulSoup(html, "lxml")`. Extract treatment of: (a) the simplified-flat-rate vs actual-cost decision framing; (b) the apportionment formula for actual-cost; (c) the hours-based simplified-flat-rate working; (d) the CGT-trap surfacing (most pieces miss this — it is B5's differentiator angle); (e) the Ltd-Co director home-office mechanic (ITEPA ss.316A-317 allowance vs formal rental); (f) the records-and-evidence expectation. Lead landlord-press pieces (RITA4Rent, Provestor, Landlord Today, Property118) typically surface the simplified £10/month at headline depth and do not surface the CGT trap. Established-firm pieces (Hammond & Co, Forbes Dawson, Crowe) sometimes surface the s.224(1) restriction but rarely walk the actual £ impact at house-sale. RUN session flags any competitor copy that asserts actual-cost-apportionment does not affect PPR as drift (per §34 do-not-write list).

- https://www.rita4rent.co.uk/landlord-home-office-allowance-uk/ (RITA4Rent landlord home-office explainer — landlord-press framing)
- https://www.provestor.co.uk/blog/landlord-home-office-expenses (Provestor landlord home-office explainer — landlord-LtdCo framing)
- https://www.hammondco.com/insights/landlord-home-office-deduction (Hammond & Co landlord home-office briefing — professional-firm framing, sometimes surfaces CGT trap)
- https://www.crowe.com/uk/insights/landlord-home-office-expenses (Crowe UK landlord home-office briefing — professional-firm framing)
- https://www.gov.uk/simpler-income-tax-simplified-expenses/business-premises (gov.uk simplified-expenses page — authoritative for s.94H flat-rate figures)
- https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2120 (HMRC PIM2120 — Property Income Manual home-office area; verify exact section live at write)
- https://www.icaew.com/insights/tax-news/property-business-home-office-cgt (ICAEW Tax Faculty article on PPR business-use restriction — for the CGT-trap framing)

**Borrowable patterns:** the apportionment formula walk; the s.94H hours-based table; the Ltd-Co director-formal-rental architecture. Do NOT borrow any competitor copy that asserts actual-cost-apportionment has no PPR consequence (per §34 do-not-write); do NOT borrow any flat-rate figure without re-verifying against gov.uk simplified-expenses page at write.

---

## GSC data

*Net-new page; primary topical queries expected: "home office deduction landlord", "claim home office expenses landlord", "landlord home office tax relief", "simplified expenses landlord home office", "landlord home office CGT", "actual cost vs simplified home office", "home office PPR restriction landlord", "Ltd Co landlord home office".*

---

## Closest existing pages (cannibalisation context)

- `landlord-expenses-allowable-uk-2026` (cannibal score ~0.40 — the **broad allowable-expenses pillar**; **cross-link as the pillar reference**; B5 is the focused home-office deep-dive; differentiation = B5 walks the s.94H vs s.34 choice AND surfaces the s.224(1) CGT trap which the pillar does not cover; the pillar covers home-office at simplified-£10/month example only)
- `principal-private-residence-relief-landlords` (~0.20 — PPR mechanics; **cross-link from question 5** for the s.222 / s.224 framework deep-dive; differentiation = B5 surfaces s.224(1) at home-office-trigger depth, PPR page deep-dives the broader relief mechanics)
- `2027-tax-rates-incorporation-decision-property-landlords` + `2027-tax-rates-incorporation-decision-uk-landlords` (~0.10 — incorporation decision; **cross-link from question 6** for the Ltd-Co route framing; differentiation = B5 surfaces the Ltd-Co home-office mechanic at headline, incorporation pages deep-dive the broader Ltd-Co decision)

**Cannibalisation discipline:**
- Cross-link the allowable-expenses pillar heavily; do NOT re-walk the broader expense taxonomy. B5 stays focused on home-office only.
- Cross-link the PPR page from question 5; do NOT re-walk the broader s.222 PPR architecture.
- Cross-link the incorporation pages from question 6 (Ltd-Co route); do NOT re-walk the incorporation decision matrix.
- Stage 2 sub-agent re-greps blog corpus at write time for "home office", "s.94H simplified", "s.224 business use", "exclusive business use room"; if a sibling page has shipped between this brief and write that overlaps B5's CGT-trap angle, raise CANNIBAL flag in F-50..F-99 range.
- **OUT-OF-WAVE BACK-PATCH CANDIDATE** logged in Stage 2 work log: `landlord-expenses-allowable-uk-2026` should be back-patched to add the home-office CGT-trap cross-link once B5 ships; Stage 1b conductor / RUN session escalates to manager queue.

---

## Redirect overlap (on launch)

No existing middleware redirect matches B5's slug or near-slugs (verified 2026-05-27 against `Property/web/src/middleware.ts`). No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-27; session selects 6-8)

**Statutory (ITTOIA 2005 + TCGA 1992 + ITEPA 2003):**
- ITTOIA 2005 s.272 (Application of trading income rules: GAAP — verified verbatim 2026-05-26): https://www.legislation.gov.uk/ukpga/2005/5/section/272
- ITTOIA 2005 s.271 (Property business charge): https://www.legislation.gov.uk/ukpga/2005/5/section/271
- ITTOIA 2005 s.271E (Calculation in accordance with GAAP): https://www.legislation.gov.uk/ukpga/2005/5/section/271E
- ITTOIA 2005 s.94H (Use of home for business purposes — simplified flat-rate): https://www.legislation.gov.uk/ukpga/2005/5/section/94H
- ITTOIA 2005 s.34 (Expenses not wholly and exclusively for trade — actual-cost apportionment gateway): https://www.legislation.gov.uk/ukpga/2005/5/section/34
- TCGA 1992 s.222 (Relief on disposal of private residence): https://www.legislation.gov.uk/ukpga/1992/12/section/222
- TCGA 1992 s.224 (Amount of relief — business-use restriction at s.224(1)): https://www.legislation.gov.uk/ukpga/1992/12/section/224
- ITEPA 2003 s.316A (Accommodation outgoings, etc — employer-provided home-working allowance): https://www.legislation.gov.uk/ukpga/2003/1/section/316A
- ITEPA 2003 s.317 (Subsidised meals: home-working context): https://www.legislation.gov.uk/ukpga/2003/1/section/317
- CTA 2009 s.54 (Expenses for the purpose of trade — Ltd Co CT-side gateway): https://www.legislation.gov.uk/ukpga/2009/4/section/54

**HMRC manuals + guidance:**
- HMRC Property Income Manual PIM2120 area (home office): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2120 (verify exact section live at write)
- HMRC Business Income Manual cross-references for s.94H + s.34
- HMRC Capital Gains Manual CG64200+ (s.224(1) PPR business-use restriction)
- gov.uk simplified-expenses page (s.94H flat-rate figures): https://www.gov.uk/simpler-income-tax-simplified-expenses/business-premises

**Cross-references in house_positions.md:** **§34 primary** (NEW lock — Landlord allowable expenses + home-office cross-tax trap operational floor, signed off 2026-05-27 closing F-52); §34.1 statutory architecture; §34.2 home-office two-route choice + CGT-trap; §34.3 cross-tax discipline; §34.4 Ltd Co-landlord mechanic; §16.27 rate-by-reference for flat-rate figures + CGT rates; §16.42 per-write figure verification; §21.3 (existing — Ltd Co operational tax) for the Ltd-Co director rental cross-reference.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Re-verify at write time against legislation.gov.uk + gov.uk: (a) ITTOIA 2005 s.272 imported-provisions list current text (confirms s.94H + s.34 are imported); (b) ITTOIA 2005 s.94H simplified flat-rate figures £10/£18/£26 against gov.uk simplified-expenses page (rate-by-reference per §16.27 — verify before publication); (c) TCGA 1992 s.224(1) business-use restriction current text; (d) TCGA 1992 s.4 CGT rates 18%/24% from 6 April 2024 (rate-by-reference per §16.27); (e) ITEPA 2003 s.316A employer-provided home-working allowance £6/week / £312/year HMRC permitted amount current state. **§16.36 statutory cross-check:** verify every section cited against legislation.gov.uk verbatim before transcription.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Plain-language, action-led tone with worked-example density. Addressed to a UK individual landlord who manages a residential rental portfolio from home and wants to know exactly how to claim a home-office deduction.
- Specific worked frames using anonymised personas (Patel-3-flats-managed-from-home; Singh-15-unit-portfolio-with-dedicated-office-room; Mawell-Ltd-Co-landlord-director); no real client names.
- Named statute every time a rate or rule is asserted (ITTOIA 2005 s.272, s.94H, s.34; TCGA 1992 s.222 + s.224(1); ITEPA 2003 ss.316A-317).

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline. Semantic HTML only.

### CTA placement guidance (per this page)
- 3 inline `<aside>` CTAs:
  - After the two-method decision tree (high-intent: reader has just calibrated which route fits their portfolio)
  - After the CGT-trap paragraph (high-intent: reader has realised they may have already characterised a room as exclusive-business-use on a prior tax return; CGT exposure is a strong adviser-engagement trigger)
  - After the Ltd-Co route paragraph (high-intent: Ltd-Co landlord director ready to choose between ITEPA allowance and formal rental)
- Vary opening; do NOT lead with "Many landlords work from home and can claim a deduction...". Open with the choice the reader needs to make per the framing-differentiator instruction: "If you manage your rental properties from home, HMRC gives you two ways to claim a deduction. One is easier and never costs you anything on sale; the other is more generous and can quietly cost you tens of thousands of pounds in lost capital-gains relief when you eventually sell...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10 to 12 for this action-led deep-dive. Include explicit FAQ on the CGT-trap avoidance (question 5), the Ltd-Co route (question 6), and the employment-and-property double-occupation (question 9).

### Cannibalisation
- Cross-link `landlord-expenses-allowable-uk-2026` as the pillar reference; do NOT re-walk the broader expense taxonomy.
- Cross-link `principal-private-residence-relief-landlords` from question 5; do NOT re-walk the broader s.222 PPR architecture.
- Cross-link `2027-tax-rates-incorporation-decision-property-landlords` and `2027-tax-rates-incorporation-decision-uk-landlords` from question 6; do NOT re-walk the incorporation decision matrix.
- Cross-link `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` from question 10 for FHL income-tax-side context.

### House positions
- §34 primary (NEW lock — Landlord allowable expenses + home-office cross-tax trap, signed off 2026-05-27 closing F-52); honour every sub-section.
- §16.27 (rate-by-reference for flat-rate figures + CGT rates); honour rate-by-reference framing.
- §21.3 (Ltd Co rent-charging mechanics — for the Ltd-Co director rental cross-reference); honour existing lock.
- §34 do-not-write list (simplified does not always win; actual-cost does affect PPR; Ltd-Co director cannot CT-deduct without personal-side routing); honour all bullets.

### Quality bar
- Body word count: 2,200 to 2,600 (action-led deep-dive with worked-example density).
- FAQs: 10 to 12.
- External authority links: 6 to 8.
- Build clean: `cd Property/web && npm run build`.
- All six verifications (0 em-dashes; 0 Tailwind classes; FAQ count match; meta title under 62; meta description under 158; internal links resolve).

### Anti-templating
- Differentiator is the **action-led decision + process** structure focused on home-office only with CGT-trap as the differentiation hook, distinct from the broader allowable-expenses pillar pattern. Write to it.
- Lead with the choice the reader needs to make per the framing-differentiator counter-pattern; do NOT open with "Many landlords work from home...".
- Vary H2s; action-led ("How to claim the simplified flat-rate", "How to claim actual-cost apportionment", "The CGT trap: when claiming the deduction now costs you more on sale", "What about my Ltd Co?") rather than definitional.
- Vary FAQ phrasing; do NOT reuse phrasings from the allowable-expenses pillar.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. **§34 primary** (NEW lock); §21.3 + §16.27 + §16.42 adjacent.
2. Claim in tracker (⬜ to 🟦 + UTC timestamp).
3. Read this brief end-to-end.
4. Fetch competitor URLs via httpx + BeautifulSoup. Note any drift against §34 do-not-write list (most common competitor drift: asserting simplified always wins; missing the CGT trap; mis-stating Ltd-Co route as CT-side-only).
5. Read closest existing pages: `landlord-expenses-allowable-uk-2026`, `principal-private-residence-relief-landlords`, `2027-tax-rates-incorporation-decision-property-landlords`, `2027-tax-rates-incorporation-decision-uk-landlords`. Decide differentiation (home-office deep-dive with CGT-trap differentiator).
6. Plan H2 outline + meta + FAQs + CTA placements. Use action-led H2 structure. Lead with the choice the reader needs to make.
7. Verify factual claims; **per §16.35: re-verify ITTOIA 2005 s.272 imported-provisions; ITTOIA s.94H flat-rate £10/£18/£26 at gov.uk simplified-expenses page; TCGA 1992 s.224(1) business-use restriction; TCGA 1992 s.4 CGT rates 18%/24%; ITEPA 2003 s.316A employer-allowance £6/week / £312/year**.
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`. Query suggestion: "home office desk laptop" or "person working from home accounting".
9. Write markdown at `Property/web/content/blog/claim-home-office-deduction-landlords.md` with full frontmatter (slug, category, title, metaTitle, metaDescription, faqs, reviewer, dates, hero image).
10. Build: `cd Property/web && npm run build`.
11. Run the six verifications.
12. No middleware edit required on initial launch.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on main per rolling-architecture RUN-phase convention.** Commit message format: `MW2 RUN B-B1: claim-home-office-deduction-landlords page (M2-B-B1 pick B5)`.
15. Fill in the per-page work-log below.
16. Mark ✅ done in tracker with 1-line Notes.
17. Append any site-wide issues to `megawave2_site_wide_flags.md` (F-50 to F-99 range for Bucket B). **Specifically: raise out-of-wave back-patch flag for `landlord-expenses-allowable-uk-2026` to add the home-office CGT-trap cross-link once B5 ships.**
18. Append discoveries to `megawave2_discovery_log_session_B.md`.
19. Claim next page.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
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

### Flags raised to megawave2_site_wide_flags.md
-

### 2-3 sentence summary
-
