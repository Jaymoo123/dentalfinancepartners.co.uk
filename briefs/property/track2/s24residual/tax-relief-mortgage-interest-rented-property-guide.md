# Track 2 brief: tax-relief-mortgage-interest-rented-property-guide

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; INVISIBLE + THIN_DEPTH + STRUCTURE + CTR_FAIL gap dominant)
**Source markdown path:** `Property/web/content/blog/tax-relief-mortgage-interest-rented-property-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/tax-relief-mortgage-interest-rented-property-guide
**Stage 1 priority:** M-H (the live Bing query universe is small but high-intent and pre-diagnosis; the page has near-zero Google equity, so this is a build-a-position rewrite, not a CTR-rescue of an existing ranking)
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (diagnosis-supplied GSC/Bing signal + source markdown read + 2 sibling pages read + house positions §3/§4/§6/§7 verified + statute spine pinned to legislation.gov.uk for write-time verification)
**Cannibalisation status:** REWRITE (rewrite-only rule is non-negotiable per memory `feedback_rewrite_only_no_collapse`; the equity data also independently forbids collapse - all three pages in the cluster have ~zero Google equity, so no defensible weaker-into-stronger 301 exists and the deterministic equity guard would have nothing to rank on)

> **Decision rationale recap.** Three live siblings sit in the "Section 24 & Tax Relief" cluster and must each own a DISTINCT primary intent. (1) `section-24-tax-relief-complete-guide` is the NAMED-REGIME canonical ("what is Section 24", the repeal question, the strategy menu, the three-way cap, the calculator). (2) `section-24-remortgaging-btl-property-tax-implications` owns the REFINANCE / equity-release / qualifying-purpose-of-borrowing angle. (3) THIS page is repositioned to the PRE-DIAGNOSIS, plain-English "mortgage interest deduction" searcher who does NOT yet know the regime is called Section 24 - exactly the live Bing query universe ("can i can tax relieve on buy to let mortgage arrangment fees", "if i borrow money to purchase a rental property do i get a deduction for the interest i pay to the bank"). The canonical ranks at pos 88 with 1 impression and does NOT own the deduction-vs-credit mechanics phrasing, so collapse-direction is irrelevant and rewrite-in-place with sharp differentiation is the call. The first job of the rewrite is to ADD the §4 three-way credit cap and indefinite carry-forward (currently entirely absent), framed as the mechanics of "the deduction that became a credit" rather than as a Section 24 strategy page.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `tax-relief-mortgage-interest-rented-property-guide`. The slug carries the plain-English "tax relief on mortgage interest for rented property" intent that the two named-regime siblings do not target in their slugs (neither contains "mortgage interest" + "rented property" in the deduction framing). No redirect proposed (rewrite-only rule + zero-equity guard).
- **Category:** `Section 24 & Tax Relief` (kept). Canonical path `/blog/section-24-and-tax-relief/tax-relief-mortgage-interest-rented-property-guide` (kept).
- **Gap-mode tag:** `INVISIBLE` (primary - effectively zero Google equity) + `THIN_DEPTH` (secondary - 1,207 words, omits the load-bearing three-way cap + carry-forward) + `STRUCTURE` (tertiary - 4 FAQs, no reference table, no `reviewedBy` block, no authority links) + `CTR_FAIL` (quaternary - the small Bing impression base ranks pos 2-8 with no clicks, partly a template-generic meta-title problem).
- **"Why this rewrite" angle:** This is the on-ramp for the searcher who has NOT yet learned the regime name. They type the mechanics in plain words ("can I deduct buy-to-let mortgage interest", "are loan arrangement fees tax deductible rental property", "can I claim mortgage capital repayments against rental income", "interest on loan to buy rental property tax deductible uk"). The named-regime canonical does not chase these phrasings, and the remortgaging sibling owns refinance only. The rewrite must answer three questions the cluster does not currently own from a plain-English entry point: (a) the deduction-vs-credit mechanics ("you USED to deduct it; now you get a basic-rate credit"); (b) the WHAT-COSTS-QUALIFY decision (arrangement fees, broker fees, survey, valuation, mortgage-documentation legal, deposit/improvement-loan interest - all in; capital repayments and personal-residence interest - out); (c) the qualifying-loan-purpose and personal/rental apportionment rule. The rewrite ADDS the §4 three-way credit cap and the indefinite carry-forward of un-credited finance costs (both entirely absent from the live page and load-bearing accuracy depth the canonical and the lead competitor both carry), plus a one-line former-FHL note per §6. Body lift to ~3,000 words, 12-14 FAQs, one "what qualifies vs what does not" reference table, one worked-credit-cap example, reviewer byline + dateModified for E-E-A-T parity with the upgraded siblings.

---

## Current page snapshot (Stage 2 - read source markdown + frontmatter)

- **Current word count:** ~1,207 (body)
- **Current H2 / H3 outline:**
  1. How Mortgage Interest Tax Relief Works Under Section 24
  2. What Mortgage Costs Can You Claim Relief On?
  3. Calculating Your Mortgage Interest Tax Relief (H3: Basic Rate Taxpayers; H3: Higher and Additional Rate Taxpayers)
  4. Record Keeping and Common Mistakes
  5. Mortgage Interest Relief and Property Companies
  6. Strategies to Manage the Mortgage Interest Restriction (H3: Portfolio Restructuring; H3: Income Smoothing; H3: Joint Ownership Optimisation)
  7. Professional Support for Complex Cases
- **Current meta title:** "Tax Relief Mortgage Interest Rented Property UK 2026 Guide" (57 chars; keyword-stuffed, no differentiator, no benefit hook)
- **Current meta description:** "Guide to mortgage interest tax relief for UK landlords. Section 24 rules, basic rate restriction, and claiming relief on rental properties." (137 chars; leads with the regime name the target searcher does not yet know - intent mismatch with the plain-English query universe)
- **Current h1:** "Tax Relief on Mortgage Interest for Rented Property: Complete UK Guide 2026"
- **Current FAQs (frontmatter count):** 4 (target 12-14)
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. Internal links: 4 (`/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`, `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`, `/incorporation` [bare-root - VERIFY/REPOINT at write time], `/blog/property-accountant-services/what-does-a-property-accountant-do`).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter). NO `reviewedBy` / `reviewerCredentials` / `reviewedAt` / `dateModified` fields - the upgraded siblings (`section-24-tax-relief-complete-guide` and `section-24-remortgaging-btl-property-tax-implications`) now carry an ICAEW/CTA reviewer block; this page lacks the E-E-A-T parity.
- **Last meaningful edit date:** 2026-04-10 (frontmatter `date`).
- **Load-bearing gaps (accuracy/depth):**
  - (a) OMITS the §4 three-way credit cap entirely (credit = lower of (i) 20%/22% of finance costs, (ii) 20%/22% of residential rental profit before finance costs, (iii) 20%/22% of total income above the personal allowance). This is the single biggest depth weakness - the canonical and the lead competitor both carry it.
  - (b) OMITS the indefinite carry-forward of un-credited finance costs.
  - (c) Says relief is "restricted to basic rate (20%)" without flagging that former FHLs are now inside the restriction from 6 April 2025 (§6) - add a one-line note.
  - (d) The 22% 2027/28 reducer treatment at body line 78 + line 105 is CORRECT per §4/§7 (reducer rises 20%→22% tracking the 22% property basic rate; wedge stays 20pp; no new wedge) and is NOT a Bill-vs-enacted hazard - FA 2026 has Royal Assent 18 March 2026, state as enacted law. Preserve this framing; do NOT regress it.

---

## GSC / Bing angle (last 90 days) - diagnosis-supplied signal

**This page is INVISIBLE on Google and only marginally visible on Bing.** Per the diagnosis, the page-level Google equity is effectively zero; the proven-demand signal comes from a small Bing impression base (mis-spelled, high-intent, pre-diagnosis phrasing) plus a competitor-confirmed adjacent query set:

- `restrive loan interest clacluations for rental property` (sic) - Bing, 2 impr, pos 2 (calculation intent; the mis-spelling confirms a genuine searcher who does not know the terminology)
- `can i can tax relieve on buy to let mortgage arrangment fees` (sic) - Bing, 1 impr, pos 8 (arrangement-fees-qualify intent - directly served by the what-costs-qualify section)
- `if i borrow money to purchase a rental property do i get a deduction for uk tax purposes for the interest i pay to the bank` - Bing, 1 impr, pos 8 (the textbook pre-diagnosis plain-English question - this IS the repositioning target)
- Adjacent, competitor-confirmed (no on-site GSC yet): "tax relief on mortgage interest for rented property" (primary), "can i deduct buy to let mortgage interest from rental income", "buy to let mortgage arrangement fees tax relief", "mortgage interest tax relief rental property calculation", "are loan arrangement fees tax deductible rental property", "can i claim mortgage capital repayments against rental income", "interest on loan to buy rental property tax deductible uk".

**Read:** the page has never built Google equity because it is thin, undifferentiated against two stronger named-regime siblings, has no inbound link equity from the cluster, and leads its meta with the regime name the target searcher does not yet know. The rewrite's job is not CTR-lift on an existing Google position; it is to BUILD a defensible position on the plain-English deduction-mechanics intent the siblings do not chase, and to earn inbound links from the cluster (the named-regime canonical and the deductions list should forward-link here on rewrite). Realistic target: move from effectively-zero Google to a page-1/page-2 foothold on "can I deduct buy-to-let mortgage interest" / "are loan arrangement fees tax deductible rental property" / "interest on loan to buy rental property tax deductible uk" over a 180-day INVISIBLE-baseline monitoring window. The Bing pos-2/pos-8 base should convert to clicks once the meta title leads with the plain-English benefit rather than the keyword stack.

### GA4 engagement signal

Not pulled (page is effectively pre-traffic on Google). Defer to the +90/+180 day `monitored_pages` reads (INVISIBLE baseline → 180-day window per F-11 recommendation).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: INVISIBLE.** Zero meaningful Google equity; a handful of Bing impressions on mis-spelled high-intent queries. The page has almost no equity to protect, so the rewrite is a clean rebuild around a distinct, un-served intent, not a delicate CTR tweak. The win comes from owning the plain-English deduction-mechanics layer and earning cluster inbound links.

**Secondary: THIN_DEPTH (load-bearing accuracy gap).** At 1,207 words the page is well below the ~3,000-word cluster floor and, critically, it OMITS the §4 three-way credit cap and the indefinite carry-forward - the two mechanics that distinguish a correct explainer from a superficial one. A higher-rate landlord whose rental profit is small relative to finance costs can have the credit capped at less than 20%/22% of the interest, with the shortfall carried forward; a page that says "you get 20% of your interest" full-stop is materially incomplete. This is the first depth job of the rewrite.

**Tertiary: STRUCTURE.** 4 FAQs vs the 12-14 cluster floor; no reference table (a "what qualifies vs what does not" page genuinely benefits from a side-by-side scannable table); no authority links on a statute-driven topic; no `reviewedBy` / `reviewerCredentials` / `dateModified` E-E-A-T block that the two upgraded siblings now carry.

**Quaternary: CTR_FAIL.** The small Bing base ranks pos 2-8 with no recorded clicks. The meta title ("Tax Relief Mortgage Interest Rented Property UK 2026 Guide") is a keyword stack with no benefit hook, and the meta description leads with "Section 24 rules" - the regime name the pre-diagnosis searcher does not yet know. A meta that leads with the plain-English question ("can you deduct buy-to-let mortgage interest?") should lift CTR on the existing Bing base without needing position movement.

**Load-bearing fix sequence (ordered by ROI):**

1. **Reposition to the plain-English, pre-diagnosis deduction-mechanics on-ramp.** Lead with the question the searcher actually asks ("if I borrow to buy a rental property, can I deduct the interest?") and answer it in the first 60 words: you no longer DEDUCT it, you get a basic-rate tax CREDIT (20% for 2026/27, 22% from 2027/28). Only THEN name the regime (Section 24) and forward-link the canonical for the named-regime depth.
2. **Add the §4 three-way credit cap** with a worked example showing the credit capped below 20%/22% of interest where rental profit is the binding limb, and the un-credited remainder carried forward indefinitely. This is the biggest accuracy-and-depth lift.
3. **Build the WHAT-COSTS-QUALIFY decision** into a scannable reference table: qualifying finance costs (mortgage interest, arrangement fees, broker fees, survey/valuation for the mortgage, legal fees on the mortgage documentation, interest on a deposit or improvement loan used for the rental business) vs NOT qualifying (capital repayments, personal-residence mortgage interest, costs of the property purchase itself such as conveyancing on the transfer, SDLT).
4. **Add the qualifying-loan-purpose and personal/rental apportionment rule** - only interest on borrowing used for the property business qualifies; mixed-use and personal-vs-rental allocation must be evidenced.
5. **Add a one-line former-FHL note** (§6): from 6 April 2025 former furnished holiday lets are inside the restriction under standard residential rules.
6. **FAQ 4 → 12-14**, each targeting a plain-English / adjacent query verbatim.
7. **Add 4-6 verified authority links** (legislation.gov.uk for ITTOIA 2005 ss.272A/274A/274AA/274C, ITA 2007 s.399B, FA 2026 Sch 1; HMRC PIM2054/PIM2056 for the finance-cost relief mechanics and the cap; gov.uk Section 24 guidance as a user cross-reference).
8. **Add the E-E-A-T metadata** (`reviewedBy` + `reviewerCredentials` + `reviewedAt` + `dateModified`) matching the cluster reviewer.
9. **Rewrite the meta title + description** to lead with the plain-English benefit, not the keyword stack.
10. **Cross-link the two siblings** (named-regime depth → canonical; refinance/equity-release → remortgaging page) and the LtdCo/incorporation pillar, without reproducing their depth.

---

## Competitor URLs (Stage 2 - verify liveness at execution per §16.31)

| URL | Status (diagnosis) | Coverage signals | Borrow / differentiate |
|---|---|---|---|
| https://www.ukpropertyaccountants.co.uk/mortgage-interest-tax-relief-implications-of-the-change/ | 200 (LEAD COMPETITOR) | Carries the three-way credit cap + the carry-forward of un-credited finance costs + worked tax-credit example | **Match the depth, beat the framing.** This is the competitor that carries the cap + carry-forward we are missing. Borrow the cap structure; differentiate with the plain-English pre-diagnosis on-ramp + the qualifying-costs reference table + the 2027/28 22% reducer (which most competitors have not updated). |
| https://www.which.co.uk/money/tax/income-tax/tax-on-property-and-rental-income/buy-to-let-mortgage-tax-relief-changes-explained-aHQIA2d4bjXj | 200 (CONSUMER AUTHORITY) | Plain-English "changes explained" framing; the deduction-to-credit transition; worked higher-rate example | Borrow: consumer-grade plain-English tone (closest tonal match to our pre-diagnosis intent). Differentiate: the cap + carry-forward depth Which omits, plus specialist apportionment + qualifying-costs detail. |
| https://www.pie.tax/tax-pible/mortgage-interest-tax-relief-self-assessment-2026 | 200 | Self-assessment box-by-box angle; 2026 framing | Borrow: where on the SA105 finance costs go. Differentiate: our deduction-vs-credit mechanics + cap; forward-link the SA105 sibling for the form-level depth rather than reproducing it. |
| https://stewartaccounting.co.uk/mortgage-interest-deduction-rental-property/ | 200 | "Mortgage interest deduction" deduction-framed title (same plain-English entry point as our target) | Borrow: the deduction-framed entry point validates our repositioning. Differentiate: most such pages stop at "20% credit" and omit the three-limb cap + carry-forward + 2027/28 22% step - that is our depth edge. |

**Competitor depth ceiling for this plain-English deduction-intent query class:** ~1,000-2,000 words, the lead competitor carries the cap + carry-forward, most carry only the headline 20% credit, few carry the 2027/28 22% reducer, few carry the qualifying-costs decision as a scannable table, none carry a `reviewedBy` block. Our ~3,000-word rewrite with the three-way cap + carry-forward + a worked binding-limb example + a qualifying-vs-non-qualifying reference table + the 2027/28 22% reducer + 12-14 FAQs + 4-6 verified statute citations + reviewer byline puts us decisively best-in-class, not catch-up.

**At execution:** re-fetch all four (httpx, proper User-Agent); reject non-200; replace any dead URL from the same domain class.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the latest in-flight snapshot at execution; "Section 24 & Tax Relief" cluster).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | tax-relief-mortgage-interest-rented-property-guide | self | REWRITE in place; reposition to the plain-English / pre-diagnosis / deduction-mechanics layer |
| Sibling (named-regime canonical, reviewed 2026-06-01) | section-24-tax-relief-complete-guide | NAMED-REGIME canonical: "what is Section 24", repeal question, strategy menu, three-way cap, calculator, 60% taper. GSC: 1 impr at pos 88 (near-zero Google equity) | NO collision after repositioning. The canonical owns the named regime + the strategy menu + the repeal question. THIS page enters from the plain-English deduction question and routes the strategy menu + repeal question to the canonical (forward-link). Both pages carry the three-way cap because it is load-bearing accuracy - but THIS page frames it as "the mechanics of the deduction that became a credit", not as a Section 24 strategy. Request a reciprocal inbound link from the canonical's "the basics, in plain English" entry point. |
| Sibling (remortgaging, reviewed 2026-06-02) | section-24-remortgaging-btl-property-tax-implications | REFINANCE / equity-release / qualifying-PURPOSE-OF-BORROWING angle; howToSteps on apportioning top-up borrowing; interest-only vs repayment | NO collision after repositioning. This page covers the qualifying-loan-PURPOSE and personal/rental apportionment rule at a PRINCIPLE level (which loans qualify) and DEFERS the refinance / equity-release / top-up-borrowing mechanics to the remortgaging sibling. FORWARD-LINK from the qualifying-loan-purpose section + the "what if I remortgage / release equity" FAQ. |
| Sibling (pillar) | section-24-mortgage-interest-restriction-uk-landlords | Section 24 pillar / restriction overview | NO collision - up-link target (this page is downstream of the pillar). Cross-link from the regime-naming paragraph. |
| Sibling | landlord-tax-deductions-uk-2026-complete-list | The FULL deductions catalogue (every allowable expense) | NO collision - this page is finance-costs-specific. Cross-link from the "what about my OTHER expenses?" FAQ (everything non-finance-cost is still deducted in full before tax). Request reciprocal inbound link from the deductions list's finance-costs line. |
| Sibling | sa105-property-income-form-2026-complete-guide (residual) | SA105 box-by-box form depth | NO collision - forward-link from the "where do I put this on my tax return?" FAQ rather than reproducing the box-level detail. |
| Sibling (incorporation pillar) | buy-to-let-limited-company-complete-guide-uk | LtdCo deducts interest in full (outside S24) | NO collision - cross-link from the "do companies get the restriction?" section. Do NOT reproduce the incorporation cost/benefit analysis; forward-link. |

**Conclusion:** REWRITE in place with sharp intent differentiation. No REDIRECT-PROPOSED (rewrite-only rule + all three cluster pages have ~zero Google equity, so any collapse would have nothing to rank on and the deterministic equity guard would have no basis - §16.T2). The named-regime canonical owns the regime + strategy + repeal layers; the remortgaging sibling owns the refinance layer; THIS page owns the plain-English deduction-mechanics + what-qualifies + qualifying-purpose-principle layer and routes depth downstream.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page; all canonical category paths verified 2026-06-02):

- **Named-regime depth (DEFER strategy menu + repeal question here):** `section-24-tax-relief-complete-guide` at `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` - forward-link from the regime-naming paragraph + the "what can I do about it?" FAQ. Request reciprocal inbound link on rewrite (closes the inbound-link gap).
- **Refinance / equity-release (DEFER top-up-borrowing mechanics here):** `section-24-remortgaging-btl-property-tax-implications` at `/blog/section-24-and-tax-relief/section-24-remortgaging-btl-property-tax-implications` - forward-link from the qualifying-loan-purpose section + the remortgage FAQ.
- **Section 24 pillar (up-link):** `section-24-mortgage-interest-restriction-uk-landlords` at `/blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords`.
- **Full deductions catalogue:** `landlord-tax-deductions-uk-2026-complete-list` at `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` - cross-link from the "what about my other expenses?" FAQ. Request reciprocal inbound link from its finance-costs line.
- **Incorporation pillar:** `buy-to-let-limited-company-complete-guide-uk` at `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` - cross-link from the companies section (already linked; preserve + verify path).
- **Incorporation without CGT:** `incorporate-rental-property-without-cgt` at `/blog/incorporation-and-company-structures/incorporate-rental-property-without-cgt` - light cross-link from the companies section (better target than the bare-root `/incorporation` currently on the page - REPOINT the existing `/incorporation` link here or to the LtdCo pillar; slug_resolver discipline: a slug has exactly one real category, never guess).
- **2027 rates context:** `2027-property-income-tax-rates-landlords-uk` at `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk` - forward-link from the 2027/28 22%-reducer paragraph.
- **MTD:** `making-tax-digital-landlords-april-2026-deadline` at `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` - keep the existing MTD cross-link (verify path).
- **Property accountant:** `what-does-a-property-accountant-do` at `/blog/property-accountant-services/what-does-a-property-accountant-do` - keep the existing cross-link from the professional-support section (verify path).
- **SA105 form:** `sa105-property-income-form-2026-complete-guide` (residual) - forward-link from the "where on my tax return?" FAQ if live at write time.

---

## House-position references (Stage 1)

- **§4 Section 24 finance cost restriction** [LOCKED]: the SPINE of this brief. Locked mechanics - finance costs NOT deducted from rental profit; 20% basic-rate tax credit instead; **credit cap = lower of three figures** ((i) 20% of finance costs, (ii) 20% of residential rental profit before finance cost deduction, (iii) 20% of total income above the personal allowance); un-credited portion **carries forward indefinitely**; applies to individuals, partnerships, trusts, NOT companies; from 6 April 2025 applies to former FHLs; **from 2027/28 the reducer is at the 22% property basic rate, NOT frozen at 20%** (FA 2026 Sch 1 amends ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B; three-part cap computed at 22% for 2027/28 onward). The £100k personal-allowance taper interaction (60% effective marginal rate trap) is the same section - thread it lightly (depth lives on the canonical).
- **§4 Do-not-write list** [LOCKED]: do NOT write "Mortgage interest is deductible 100%" (only for companies); "S24 is repealed" (in force); "S24 doesn't apply to higher-rate taxpayers" (it does - that's the point); "the reducer/credit stays at 20% in 2027/28" (it rises to 22%); "a new basic-rate wedge opens in 2027/28" (it does not - the reducer tracks the 22% rate).
- **§6 FHL abolition transition** [LOCKED]: from 6 April 2025 former FHLs are taxed as standard residential rental property, so S24 now applies to them. One-line note only; depth lives on the FHL pages.
- **§7 April 2027 property income tax** [LOCKED 2026-05-30, ENACTED - state as law]: separate property income rates 22% basic / 42% higher / 47% additional from 6 April 2027 for England, Wales and NI (only Scotland carved out); enacted by FA 2026 (Royal Assent 18 March 2026), ss.6-7; the §4 reducer rises to 22% in step (FA 2026 Sch 1). NOT a Bill-vs-enacted hazard - the live page already frames this correctly; preserve.
- **§3 MTD ITSA** [LOCKED 2026-05-22]: £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028) threshold schedule. The live page references this correctly at body line 91 - preserve. Light touch + forward-link the MTD page.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised personas only.

---

## House-position conflict flag (Stage 2)

**No CONFIRMED conflict on the live page (clean on the load-bearing items).** Per the diagnosis and the source read:

- **PRICING-LEAK:** none found on-page (no fees, no "£800-£1,500 general-market" comparison, no client names) - clean on the lead-gen handoff model. (Decision E reminder: even soft "£800-£1,500 general-market" fee comparisons are a pricing-leak - if any sneak in at write time, strip them.)
- **EM-DASHES:** prose is clean (uses commas/parentheses/full stops). The only hyphens are bullet-list lead-ins ("- the main component affected") which render as list markers, not em-dashes. Keep clean on rewrite.
- **STATUTE / Bill-vs-enacted:** the 22% 2027/28 reducer claim at body line 78 is attributed to "Finance Act 2026 Schedule 1" and correctly states the wedge stays at 20pp - this MATCHES §4 / §7. **No F-37 Bill-vs-enacted risk on this page** (FA 2026 has Royal Assent 18 March 2026; state as enacted law). The rewrite must still re-verify FA 2026 Sch 1 / ITTOIA 2005 ss.274AA/274C / ITA 2007 s.399B against legislation.gov.uk at write time per standing discipline, and may state FA 2026 is enacted law (not draft).

**The conflict that matters is OMISSION, not contradiction (THIN_DEPTH, not STALE_FACTS):**
- The page OMITS the §4 three-way credit cap entirely - the main accuracy/depth weakness. ADD it (load-bearing).
- The page OMITS the indefinite carry-forward of un-credited finance costs. ADD it.
- The page says relief is "restricted to basic rate (20%)" without flagging the former-FHL inclusion from 6 April 2025 (§6). ADD a one-line note.

**E-E-A-T parity gap (not a house-position conflict, but a structure gap):** the author byline is the generic "Property Tax Partners Editorial Team" with NO `reviewedBy` / `reviewerCredentials` block. The upgraded siblings (canonical 2026-06-01; remortgaging 2026-06-02) now carry an ICAEW/CTA reviewer block. The rewrite should add parity E-E-A-T fields (see Schema plan).

---

## Authority links worth considering (Stage 2 - VERIFY all at execution per §16.31 + F-8 statute-content-can-be-removed discipline)

| URL | Verification | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2007/3/section/399B | Verify at write time (ITA 2007 s.399B - the tax reducer for accumulated/discretionary trust income; cross-referenced by §4/§7) | Tax-reducer mechanics statute (light cite) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272A | Verify at write time (ITTOIA 2005 s.272A - "Restricting deductions for finance costs related to residential property"; the core no-deduction rule) | The no-deduction rule statute (the mechanic the page is about) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/274A | Verify at write time (ITTOIA 2005 s.274A - "Tax reduction for individuals"; the basic-rate credit + the three-limb cap (s.274A(2)-(5)) + carry-forward (s.274B/274C)) | The basic-rate-credit + three-way-cap + carry-forward statute (the load-bearing depth) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/274AA + /section/274C | Verify at write time (ITTOIA 2005 ss.274AA/274C as amended by FA 2026 Sch 1 to the 22% reducer rate; named in §4/§7) | The 2027/28 22% reducer statute (verify the FA 2026 Sch 1 amendment is reflected on legislation.gov.uk; if the revised version is not yet posted, mark PENDING and cite FA 2026 Sch 1 directly) |
| https://www.legislation.gov.uk/ukpga/2026/11/schedule/1 (or /section/6 + /section/7) | Verify exact citation at write time (FA 2026 c.11, Royal Assent 18 March 2026; Sch 1 = reducer-to-22%; ss.6-7 = property income rates) | FA 2026 as enacted law for the 2027/28 22% reducer + property income rates |
| https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies | Verify at write time (HMRC's own worked case studies of the finance-cost relief restriction + the cap) | PRIMARY user cross-reference + the cap worked examples; mandatory link if live |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2054 (+ PIM2056) | Verify exact path at write time (PIM2054 deductions: interest; PIM2056 the restriction mechanics) | HMRC manual for the finance-cost relief mechanics (verify-don't-guess the manual number per the PIM4101 hallucination lesson) |

**(Execution selects 4-6 to actually cite in body; the ITTOIA 2005 s.274A cap statute + the gov.uk case-studies link are the priority cites. Keep statute threading proportionate - this is a plain-English on-ramp, not a statute-grade page; the named-regime canonical carries the deeper statute.)**

---

## Content plan (section-by-section to ~3,000 words)

Target: ~3,000 body words, 11-13 H2/H3 sections, one "what qualifies vs what does not" reference table, one worked credit-cap example, 12-14 FAQs, 2 inline `<aside>` CTAs, 4-6 authority links, sibling cross-links.

1. **Opener (~200 words).** Plain-English hook that mirrors the searcher's actual words: "If you borrow money to buy a rental property, can you deduct the interest from your rental income for UK tax?" Answer it in the first 60 words: not any more as a deduction - since April 2020 you get a basic-rate tax CREDIT instead (20% for 2026/27, rising to 22% from 2027/28), and that change is what most landlord confusion is about. Only then name the regime ("this is the Section 24 finance cost restriction") and forward-link the named-regime canonical for the full strategy and repeal discussion. Set up the structure: how the credit works, what costs qualify, the cap that can reduce it further, and the company exception.

2. **H2 "Deduction vs credit: what actually changed" (~320 words).** The before/after mechanics in plain English. Before: interest was deducted from rental profit, so a higher-rate landlord got 40% relief. Now: interest is added back, the landlord is taxed on the higher profit at their marginal rate, then a basic-rate tax reducer (20% / 22%) is set against the bill. Keep the existing £10,000-interest worked line (£2,000 credit vs the old £4,000). State the 2027/28 22% reducer correctly per §4/§7 (reducer rises in step with the 22% property basic rate; the wedge stays 20pp for higher-rate landlords; NO new wedge). Inline `<aside>` CTA #1 (discovery call to model your own position). Name ITTOIA 2005 s.272A once (light).

3. **H2 "What mortgage and finance costs qualify (and what does not)" + REFERENCE TABLE (~340 words).** The decision the live Bing queries are asking ("can i tax relieve on buy to let mortgage arrangement fees", "are loan arrangement fees tax deductible rental property", "can i claim mortgage capital repayments against rental income"). Lead with the rule: the basic-rate credit covers FINANCE costs; everything else (repairs, insurance, agent fees) is still deducted in full. Then the scannable reference table (columns + rows below). Capital repayments OUT (only the interest portion qualifies); personal-residence interest OUT; SDLT and purchase conveyancing OUT (capital, go to CGT base cost). Arrangement fees, broker fees, survey/valuation for the mortgage, mortgage-documentation legal fees, and interest on a deposit or improvement loan used for the rental business all IN.

4. **H2 "The three-way cap: why you might get less than 20%" + WORKED EXAMPLE (~360 words).** The load-bearing depth ADD (§4). The credit is the LOWER of: (i) 20%/22% of finance costs; (ii) 20%/22% of residential rental profit before finance costs; (iii) 20%/22% of total income above the personal allowance. Worked example where limb (ii) binds: a landlord with high interest relative to a thin rental profit gets a credit capped below 20% of the interest, and the un-credited finance costs CARRY FORWARD indefinitely to future years. Name ITTOIA 2005 s.274A (credit + cap) and the carry-forward (s.274B/274C) once each; forward-link HMRC's case-studies page. This is the section that beats every competitor except the lead.

5. **H2 "Which loans qualify: the purpose-of-borrowing rule" (~260 words).** Only interest on borrowing USED for the property business qualifies - it follows the purpose of the loan, not the asset it is secured against. Principle-level treatment: a loan secured on your home but used to fund a rental deposit can qualify; a loan secured on the rental but used for personal spending does not. Personal/rental apportionment must be evidenced. DEFER the refinance / equity-release / top-up-borrowing mechanics to the remortgaging sibling (forward-link explicitly - "if you remortgage or release equity, see [remortgaging guide]").

6. **H2 "Joint ownership and the basic-rate credit" (~220 words).** Salvage and tighten the existing joint-ownership content. The credit applies to each owner's share of the finance costs separately (per §4: cap mechanics apply to each spouse's share separately, §24.x). For married couples / civil partners, the ownership split (and a Form 17 election where beneficial ownership is unequal) can shift income to a lower-rate spouse. Keep conceptual; forward-link the Form 17 / joint-ownership sibling if live, else the canonical.

7. **H2 "Former holiday lets are now caught too" (~140 words).** The §6 one-line note expanded just enough: from 6 April 2025 the FHL regime is abolished, so former holiday lets are taxed as standard residential property and the finance-cost restriction now applies to them. Forward-link the FHL-abolition sibling for the transition detail.

8. **H2 "The company exception" (~240 words).** Salvage the existing companies section: Section 24 does NOT apply to companies - a company deducts mortgage interest in full against corporation tax. Keep the CT-rate line (19% small-profits up to £50k / 25% main above £250k, marginal relief between - verify against §21/current gov.uk at write time). Frame as "this is why higher-rate landlords with big interest bills look at incorporating" and forward-link the LtdCo + incorporate-without-CGT pillars for the full cost/benefit (SDLT, CGT, dividend tax) WITHOUT reproducing it. Inline `<aside>` CTA #2 (discovery call) here.

9. **H2 "Record keeping and the common mistakes" (~220 words).** Salvage the existing record-keeping + common-mistakes content (annual mortgage statements, loan agreements, clear personal/rental allocation; the mistakes: including capital repayments, claiming personal mortgage interest, missing arrangement fees, incorrect apportionment). Add the light MTD line per §3 (from 6 April 2026 quarterly reporting for income over £50k; MTD software must handle the credit correctly) and forward-link the MTD page.

10. **H2 "Where this fits with the rest of the cluster" (~120 words).** Explicit signposting paragraph: named-regime depth + strategy menu + repeal question → canonical; refinance / equity release → remortgaging page; the full deductions catalogue → deductions list; the SA105 boxes → form guide; the 2027 rates → 2027 page. (Doubles as the internal-link hub that earns this page its place in the cluster.)

11. **FAQ block (12-14 FAQs).** Each targets a plain-English query verbatim (see Query-coverage plan). Plain-English answers; defer numeric/statute depth via forward-links.

### REFERENCE TABLE (mandatory - this is a "what qualifies" decision page that benefits from a side-by-side scannable table)

Plain HTML `<table>`, no Tailwind, no pricing (these are statutory cost categories, not fees):

**"Finance costs: what qualifies for the basic-rate credit vs what does not"**

| Cost | Treatment | Why |
|---|---|---|
| Mortgage interest (rental property) | Qualifies - basic-rate credit (20% / 22%) | Core finance cost under ITTOIA 2005 s.272A |
| Mortgage arrangement / product fees | Qualifies - basic-rate credit | Treated as a finance cost |
| Mortgage broker fees | Qualifies - basic-rate credit | Cost of arranging the borrowing |
| Survey / valuation for the mortgage | Qualifies - basic-rate credit | Required to obtain the finance |
| Legal fees on the mortgage documentation | Qualifies - basic-rate credit | Finance-related (NOT the purchase conveyancing) |
| Interest on a loan for a deposit or property improvement (used for the rental business) | Qualifies - basic-rate credit | Follows the purpose of the borrowing |
| Capital repayments of the mortgage | Does NOT qualify | Only the interest portion is a finance cost |
| Personal-residence mortgage interest | Does NOT qualify | Not borrowing for the rental business |
| SDLT and purchase conveyancing | Does NOT qualify (capital) | Adds to CGT base cost, not a revenue finance cost |
| Repairs, insurance, letting-agent fees, accountancy | Not a finance cost - deducted IN FULL before tax | Outside Section 24 entirely |

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis; each assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---|---|---|
| tax relief on mortgage interest for rented property (PRIMARY) | adjacent | 0 | 0 | metaTitle + H1 + opener |
| restrive loan interest clacluations for rental property (sic) | bing | 2 | 2 | H2 §4 "The three-way cap" + worked example (calculation intent) |
| can i can tax relieve on buy to let mortgage arrangment fees (sic) | bing | 1 | 8 | H2 §3 reference table (arrangement-fees row) + FAQ "Are buy-to-let mortgage arrangement fees tax deductible?" |
| if i borrow money to purchase a rental property do i get a deduction for uk tax purposes for the interest i pay to the bank | bing | 1 | 8 | Opener (first-60-words answer) + H2 §2 "Deduction vs credit" |
| can i deduct buy to let mortgage interest from rental income | adjacent | 0 | 0 | H2 §2 "Deduction vs credit" body + FAQ "Can I deduct buy-to-let mortgage interest from rental income?" |
| buy to let mortgage arrangement fees tax relief | adjacent | 0 | 0 | H2 §3 reference table + FAQ "Do arrangement and broker fees get the same treatment as interest?" |
| mortgage interest tax relief rental property calculation | adjacent | 0 | 0 | H2 §4 worked credit-cap example |
| are loan arrangement fees tax deductible rental property | adjacent | 0 | 0 | H2 §3 reference table (broker/arrangement rows) |
| can i claim mortgage capital repayments against rental income | adjacent | 0 | 0 | H2 §3 reference table (capital-repayments row) + FAQ "Can I claim mortgage capital repayments against rental income?" |
| interest on loan to buy rental property tax deductible uk | adjacent | 0 | 0 | H2 §5 "purpose-of-borrowing rule" + FAQ "Is interest on a loan to buy a rental property tax deductible?" |

Additional FAQ slots (to reach 12-14) for plain-English coverage without new target queries: "Why might I get less than 20% of my interest back?" (three-way cap); "What happens to finance costs I cannot use this year?" (carry-forward); "Does the relief rise in 2027?" (yes, to 22%, in step with the rates - no new wedge); "Do limited companies get the restriction?" (no - full deduction); "Does this apply to my former holiday let?" (yes, from 6 April 2025); "What about my other rental expenses?" (deducted in full before tax); "Where do I put finance costs on my tax return?" (forward-link SA105).

---

## Meta plan

- **metaTitle (<=62):** `Can You Deduct Buy-to-Let Mortgage Interest? UK Guide` (54 chars)
- **metaDescription (<=158):** `How mortgage interest relief works for UK landlords: the basic-rate credit, what finance costs qualify, the three-way cap, and the 22% reducer from 2027/28.` (155 chars)
- **h1:** `Tax Relief on Mortgage Interest for Rented Property` (tightened from the keyword-stacked current h1; leads with the plain-English primary query, drops the "Complete UK Guide 2026" padding)
- **summary:** `If you borrow to buy a rental property you can no longer deduct the mortgage interest from your rental income. Instead you get a basic-rate tax credit, 20% for 2026/27 and 22% from 2027/28, and that credit is capped at the lower of three figures with any unused amount carried forward. This guide explains what finance costs qualify (arrangement fees, broker fees, survey costs and deposit-loan interest all count, capital repayments do not), how the cap works, and why companies are treated differently.`

(No em-dashes anywhere; no pricing; anonymised personas only.)

---

## Schema plan

- **reviewer name:** ICAEW Qualified Senior Reviewer (the established cluster reviewer used on both upgraded "Section 24 & Tax Relief" siblings - the canonical `section-24-tax-relief-complete-guide` 2026-06-01 and `section-24-remortgaging-btl-property-tax-implications` 2026-06-02 - use for cluster consistency; this is a REAL reviewer block already in use across the cluster per house E-E-A-T).
- **reviewerCredentials:** `Chartered Tax Adviser (CTA), Property Tax Specialist` (matches the canonical's CTA credential, which is the right fit for a finance-cost-mechanics page; the remortgaging sibling uses the ACA variant - either is the established cluster reviewer, prefer the CTA variant here for the tax-mechanics subject).
- **reviewedAt:** 2026-05-30
- **howTo:** false (this is a deduction-mechanics explainer with a reference table and a worked example, not a step-by-step procedural task; the qualifying-loan apportionment is principle-level, not schema-grade ordered steps - the remortgaging sibling owns the howToSteps for apportioning top-up borrowing).
- **dateModified:** 2026-05-30
- **JSON-LD blocks emitted:** Article (BlogPosting) + FAQPage (auto-emitted from frontmatter `faqs:` by `buildBlogPostingJsonLd`; never hand-add FAQ schema in body). No HowTo block.

---

## Universal rules - inherited from parent program (do not restate)

See `TRACK2_PROGRAM.md §4 section 13` pointer block: voice rules (NO em-dashes; anonymised social proof only; NO pricing; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments only), CSS-in-markdown (semantic HTML; no Tailwind utility classes in body; `.prose-blog aside` handles inline-CTA styling), FAQs/schema (frontmatter `faqs:` 12-14; auto-emitted FAQPage), anti-templating, quality bar (`competitor_rewrite_playbook.md §4.3` six-check), statute citation discipline (F-8: statute content can be removed by amendment even where the URL is live - verify the operative wording, not just the 200 status), §16 lessons (esp. §16.31 URL liveness, §16.22/§16.27/§16.35 Bill-vs-enacted, slug_resolver one-real-category).

**Critical for THIS brief:** the THIN_DEPTH fix is the load-bearing job - ADD the §4 three-way credit cap + the indefinite carry-forward (currently entirely absent). LEAD with the plain-English deduction question, not the regime name. PRESERVE the already-correct 2027/28 22%-reducer framing (state FA 2026 as enacted law, no Bill-vs-enacted hedge needed). NO em-dashes. NO pricing (the 20%/22%/19%/25% figures are statutory rates, not firm fees - keep them; strip any soft fee comparison per Decision E). Anonymised personas only. Cross-link the two siblings; do NOT reproduce their named-regime / refinance depth.

---

## 19-step workflow - inherited (Wave 5) with Track 2 deltas

See `TRACK2_PROGRAM.md §4 section 14`. Track 2 deltas + this-brief specifics:

1. Read `house_positions.md` §4, §6, §7, §3, §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → execution).
3. Read this brief end-to-end.
4. **Verify the statute spine** against legislation.gov.uk (ITTOIA 2005 s.272A no-deduction rule; s.274A credit + three-limb cap; s.274B/274C carry-forward; ss.274AA/274C as amended by FA 2026 Sch 1 to 22%; ITA 2007 s.399B; FA 2026 c.11 Royal Assent 18 March 2026, Sch 1 + ss.6-7) AND HMRC's worked case-studies page + PIM2054/PIM2056. Confirm operative wording is present, not just a 200 status (F-8). State FA 2026 as enacted law. Load-bearing pre-rewrite step.
5. Re-fetch the 4 competitor URLs (confirm 200; replace dead URLs from the same domain class).
6. Read the current source file + the two key siblings (`section-24-tax-relief-complete-guide`, `section-24-remortgaging-btl-property-tax-implications`) + the deductions list (for forward-link targets + reciprocal-link requests).
7. Plan outline: 11-13 sections, ~3,000 words, 12-14 FAQs, 1 reference table, 1 worked credit-cap example, 2 inline CTAs.
8. **Rewrite markdown at existing path** (NOT new file). Preserve slug + canonical; update `dateModified` to 2026-05-30; add `reviewedBy` + `reviewerCredentials` + `reviewedAt`. ADD the three-way cap + carry-forward FIRST. REPOINT the bare-root `/incorporation` link to a real canonical category path (slug_resolver-clean).
9. Run build: `cd Property/web && npm run build`. Must pass.
10. Six checks: FAQ schema count = frontmatter length; em-dash count = 0; Tailwind class count = 0; metaTitle <=62; metaDescription <=158; all internal links resolve (slug_resolver-clean).
11. Confirm no redirect (slug kept; rewrite-only + zero-equity guard).
12. Update/insert `monitored_pages` row (INVISIBLE baseline → 180-day window per F-11 recommendation).
13. Commit on `main` per deploy discipline (no auto-commit unless `OPTIMISATION_AUTO_COMMIT=1`).
14. Update tracker → ✅ executed; raise any new flags in `track2_site_wide_flags.md` (cluster reciprocal-link requests to the canonical + deductions list; the bare-root `/incorporation` link repoint).
15. Heartbeat + discovery log.

---

## Per-page work-log (for execution session)

(Empty template - populated at execution time.)

### House-position alignment
- §4 three-way credit cap added (lower of 3 limbs): __
- §4 indefinite carry-forward of un-credited finance costs added: __
- §4/§7 2027/28 22% reducer framing preserved (no new wedge; FA 2026 enacted): __
- §6 former-FHL one-line note added: __
- §3 MTD threshold schedule preserved: __
- §13 no pricing / anonymised personas: __

### Statute verification (write time)
- ITTOIA 2005 s.272A (no-deduction rule) verified operative: __
- ITTOIA 2005 s.274A (credit + three-limb cap) verified operative: __
- ITTOIA 2005 s.274B/274C (carry-forward) verified operative: __
- ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B (FA 2026 Sch 1 to 22%) verified: __ (revised version posted / PENDING + cite FA 2026 Sch 1 directly)
- FA 2026 c.11 (Royal Assent 18 March 2026; Sch 1 + ss.6-7) verified enacted: __
- HMRC case-studies + PIM2054/PIM2056 path verified: __

### Comparison: before vs after
- Word count: 1,207 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Statute citations: 0 → __
- Inline CTAs: 0 → __
- Three-way cap + carry-forward added (Y/N): __
- Qualifying-vs-non-qualifying reference table added (Y/N): __
- Reviewer byline + dateModified added (Y/N): __
- Meta title repositioned to plain-English benefit (Y/N): __
- Bare-root `/incorporation` link repointed (Y/N): __
- Sibling cross-links added (canonical + remortgaging + deductions list): __

### Flags raised
- Cluster reciprocal-link requests (canonical + deductions list): __
- Bare-root `/incorporation` link repoint: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
