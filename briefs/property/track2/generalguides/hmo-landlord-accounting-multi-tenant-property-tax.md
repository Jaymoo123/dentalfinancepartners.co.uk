# Track 2 brief: hmo-landlord-accounting-multi-tenant-property-tax

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (REWRITE-only mode; sharp intent split, NOT a 301)
**Source markdown path:** `Property/web/content/blog/hmo-landlord-accounting-multi-tenant-property-tax.md`
**Live URL (canonical-of-record):** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/hmo-landlord-accounting-multi-tenant-property-tax
**Live URL (GSC-indexed, bare):** https://www.propertytaxpartners.co.uk/blog/hmo-landlord-accounting-multi-tenant-property-tax
**Stage 1 priority:** M-H (low absolute impressions but a clean, winnable distinct-intent owner; outranks its cannibalising sibling on the contested term)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (sharp intent split away from sibling `hmo-tax-guide-rental-income-deductions-multi-tenant`; NO redirect, equity supports keeping this page distinct, see Cannibalisation block)

> Repositioning thesis in one line: this page stops being a second, weaker "HMO tax" explainer and becomes **the operational accounting / bookkeeping-systems / MTD-ITSA record-keeping playbook for multi-tenant property**, "how do I actually run the books for an HMO", leaving the deductions / what-is-taxable intent to the sibling.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `hmo-landlord-accounting-multi-tenant-property-tax`. The slug already carries "accounting", the rewrite leans INTO that word to claim the operational-bookkeeping intent the slug promises but the thin body does not currently deliver. No redirect proposed (REWRITE-only mode enforced; equity check supports a distinct page, see below).
- **Category:** `Landlord Tax Essentials` (kept). This is deliberately a DIFFERENT category from the cannibalising sibling, which sits in `Property Types & Specialist Tax`. The cross-category split reinforces the intent separation at the routing level.
- **Gap-mode tag:** `THIN_DEPTH` (primary, 783 words vs ~3,000 target) + `INVISIBLE` (secondary, pos 21.1 / single-digit impressions) + `STRUCTURE` (4 FAQs, 0 authority links, 0 inline CTAs, 1 trivial worked example) + `PRICING_LEAK` (HARD-RULE conflict, two on-page fee figures) + `STALE_FACTS` (omits post-Dec-2023 council-tax owner-liability framing; under-specifies MTD-ITSA mechanics the slug promises).
- **"Why this rewrite" angle:** the page and its sibling `hmo-tax-guide-rental-income-deductions-multi-tenant` are textbook cannibalisation, both rank for "hmo landlord tax planning" (this page pos 21.1 vs sibling pos 47.3), both invisible, both covering room-by-room income, expense allocation, licensing deductibility, Section 24 and capital allowances. REWRITE-only mode means the fix is an intent split, not a collapse. This page is the STRONGER page on the shared term (21.1 vs 47.3 on half the impressions), so it must NOT be redirected away; instead it is re-pointed at the distinct, currently-unowned intent "how do I run the books for an HMO" (chart of accounts, room-level ledgers, a documented and consistently applied expense-allocation methodology with worked allocation tables, void/arrears tracking, MTD-ITSA quarterly-submission mechanics per §19, software-feature requirements, an audit-ready records pack). The four adjacent intents are forward-linked OUT to four siblings that already own them, so this page does not re-cover deductions, yield/incorporation comparison, licensing deductibility, or the s.35 communal-parts capital-allowances claim.

---

## Current page snapshot (Stage 2, read source markdown + frontmatter)

**Filesystem source read (2026-05-30):**
- **Body word count:** 783 (well below the ~1,800-2,000 competitor floor and the ~3,000 gold-reference target).
- **H2 / H3 outline (13 headings):** Understanding HMO Rental Income · HMO Expense Allocation Methods (H3 Room-Specific Expenses, H3 Shared Area Expenses) · Key Expenses in Multi-Tenant Properties (H3 Licensing and Compliance Costs, H3 Higher Maintenance and Management) · Section 24 Impact on HMO Portfolios · Record-Keeping for HMO Properties (H3 Tenancy Records, H3 Expense Documentation) · Making Tax Digital Compliance for HMOs · Professional Support for HMO Accounting · Related Reading.
- **metaTitle:** "HMO Landlord Accounting: Multi-Tenant Tax Guide" (47 chars).
- **metaDescription:** "HMOs need room-by-room income tracking and shared expense allocation across tenants. Accounting rules and MTD compliance for UK landlords." (137 chars).
- **h1:** "HMO Landlord Accounting: Multi-Tenant Property Tax Guide".
- **FAQ count (frontmatter `faqs:`):** 4 (expense allocation between rooms; separate accounts per room; Section 24 effect; records to keep). Target 12-14.
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations).
- **Internal links:** 2 only (`rental-yield-calculator-guide-uk-landlords`; a bare `/incorporation` route, verify it resolves at execution, current page also references `/incorporation` not a blog slug).
- **Worked examples:** 1 trivial (a 5-room Manchester rent list £400/£450/£425/£475/£500); no allocation table, no quarterly-submission walk-through.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter via `buildBlogPostingJsonLd`).
- **Last meaningful edit:** frontmatter `date: 2026-03-29`.
- **`author`:** "Property Tax Partners Editorial Team" (no `reviewedBy` / `reviewerCredentials` fields present, rewrite must ADD them).

**Confirmed defects on the live page:**
- **PRICING LEAK #1 (line ~77 of body / "Licensing and Compliance Costs"):** "Most HMOs require local authority licensing, with fees ranging from **£500-£1,500** depending on the council." On-page fee figure, strip per HARD RULE / Decision E.
- **PRICING LEAK #2 ("Higher Maintenance and Management"):** "Professional management becomes more common with HMOs, with fees typically **10-15% of gross rental income**." On-page fee figure, strip / reframe per HARD RULE.
- **MTD paragraph (Making Tax Digital Compliance for HMOs):** "From 6 April 2026, most landlords with qualifying income over £50,000 ... falling to £30,000 from 6 April 2027 and £20,000 from 6 April 2028", thresholds CORRECT, match §19.1. Preserve the figures; the rewrite must ADD the §19.2 gross-test, §19.16 digital-link definition, and quarterly-update mechanics the thin page lacks.
- **OMISSION:** no post-1-December-2023 council-tax owner-liability framing for HMOs (the genuine HMO-accounting point that void-period council tax is now a landlord cost). Add per §30.5.
- **No April-2027 income-tax-rate assertion present** → no F-37 Bill-vs-enacted hazard currently on this page (verify still absent at write time; do NOT introduce one).

---

## GSC angle (last 90 days)

**Pulled from the diagnosis payload (this page is low-volume / near-invisible, typical of a cannibalised second page):**

| query | source | impr | avg pos | clk |
|---|---|---:|---:|---:|
| hmo landlord tax planning | gsc | 7 | 21.1 | 0 |
| tax advice for hmo landlords | gsc | 3 | 42.0 | 0 |
| hmo landlord tax planning (page-level agg, alt window) | adjacent | 10 | 24.1 | 0 |

**Read:** the page is INVISIBLE (page 2-4, no clicks) and the only queries it surfaces for are the SAME "hmo landlord tax planning" term its sibling also chases, the cannibalisation signature. It does, however, OUTRANK the sibling on that shared term (21.1 vs 47.3), which is the equity basis for keeping it (see Cannibalisation block + §16.T2 collapse-guard logic). The realistic post-rewrite win is NOT recapturing "hmo landlord tax planning" (the sibling and pillars contest it); it is owning a distinct, currently-unclaimed query family the sibling does not target: "hmo bookkeeping", "hmo accounting software", "hmo expense allocation method", "hmo record keeping mtd", "room-by-room rental ledger". That family is low-competition, high operational-intent, and matches the slug, a clean intent-acquisition play rather than a head-term fight.

**GA4 engagement signal:** not separately pulled (negligible sessions expected at this impression volume). Engagement is not the limiter; visibility + distinct-intent ownership is.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: THIN_DEPTH.** 783 words against a ~1,800-2,000 competitor floor and a ~3,000 gold-reference target. The page gestures at every HMO accounting topic but develops none to operational usefulness, no worked allocation table, no chart-of-accounts model, no quarterly-submission walk-through, no void/arrears ledger pattern. This is the load-bearing fix: depth in the OPERATIONAL direction (how the books are run), not breadth across tax topics (which the siblings own).

**Secondary: INVISIBLE.** Position 21.1 / single-digit impressions / 0 clicks. The page is on page 2-4 of Google for the only term it surfaces for. Depth + distinct-intent repositioning is the route to visibility on a query family that is not already contested by stronger siblings.

**Tertiary: STRUCTURE.** 4 FAQs (target 12-14), 0 authority links (target 5-7), 0 inline CTAs (target 2), 1 trivial worked example (target 3-4 including a full allocation table and a quarterly-update walk-through). All below the Track-2 rewrite floor.

**HARD-RULE conflict: PRICING_LEAK.** Two on-page fee figures (£500-£1,500 licensing; 10-15% management). Both violate the lead-gen handoff model (Decision E: even soft fee comparisons are leaks). Strip/reframe to qualitative language pointing to a discovery call. Likely cluster-wide (the £500-£1,500 figure also appears on the `hmo-vs-standard-buy-to-let` sibling FAQ, raise as a separate site-wide flag).

**STALE_FACTS (incompleteness, not contradiction):** the page omits the post-Dec-2023 council-tax owner-liability framing for HMOs (§30.5) and under-specifies MTD-ITSA mechanics (§19.2 gross-test, §19.16 digital link, quarterly updates) that the slug ("accounting") promises.

**Load-bearing fix sequence (ordered by ROI):**
1. **Reposition** from "another HMO tax explainer" to "the HMO bookkeeping / accounting-systems / MTD-ITSA record-keeping playbook". This is the cannibalisation fix AND the visibility fix in one move.
2. **Strip both pricing leaks** (HARD RULE). Reframe licensing/management cost discussion as "what's deductible and how to record it" without quoting figures; point to a discovery call.
3. **Body lift to ~3,000 words** built around the operational workflow: chart of accounts for an HMO, room-level income ledger, a documented and consistently applied expense-allocation methodology with worked allocation tables, void/arrears tracking, MTD-ITSA quarterly-submission mechanics, software-feature checklist, audit-ready records pack.
4. **Add the council-tax owner-liability point** (§30.5) as a genuine HMO-accounting cost line (void-period council tax now a deductible landlord cost in most aggregated HMOs).
5. **FAQ count 4 → 12-14**, each targeting a distinct operational-intent query verbatim (bookkeeping, allocation method, software, MTD record-keeping, void tracking, audit/enquiry).
6. **Authority links: 5-7 verified citations** (legislation.gov.uk + gov.uk + HMRC manual + the MTD compatible-software finder).
7. **Forward-link OUT to the four siblings** that own adjacent intents so this page does not re-cover them (see Closest existing pages).
8. **metaTitle / metaDescription / h1 rewrite** to lead with "bookkeeping / accounting systems / MTD records", not generic "tax guide".

**Anti-templating note:** unlike the gold-reference CGT-rates brief (CTR-FAIL + INTENT-MISMATCH where the head-term is irrecoverable), this brief's spine is CANNIBALISATION-via-intent-split + THIN_DEPTH. The fix is not a meta tweak (the term is contested by stronger siblings) but a genuine repositioning of the page onto an unowned operational-intent query family. Distinct gap-mode, distinct fix.

---

## Competitor URLs (Stage 2, VERIFY LIVE at execution per §16.31)

| URL | Expected coverage | Borrow / differentiate |
|---|---|---|
| https://www.agenthmo.co.uk/hmo-accountants | HMO-accountant service framing; operational pain-points (room-level income, multi-tenancy records) | Borrow the operational vocabulary (room-level ledgers, occupancy tracking). Differentiate by depth: add the documented allocation methodology + MTD quarterly mechanics they will not have. |
| https://wearegolding.com/what-uk-landlords-must-know-about-hmo-rentals/ | General HMO-landlord overview; licensing + tax mix | Differentiate hard, this is a breadth piece; our angle is operational accounting depth, not overview. Do NOT mirror its tax-explainer breadth (that is the sibling's job). |
| https://www.thefriendlyaccountants.co.uk/tax-treatment-of-hmos-and-multi-lets/ | Tax treatment of HMOs / multi-lets; expense allocation commentary | Borrow the expense-allocation clarity; beat it with a worked allocation TABLE + consistency-of-method discipline + audit-ready records pack. |

**Execution session MUST:** WebFetch each URL, confirm 200, date-stamp, capture actual word count / FAQ count / whether they carry MTD-ITSA quarterly mechanics or a worked allocation table. Replace any non-200. **Competitor depth ceiling for this query class is ~1,800-2,000 words, 0-few FAQs, prose-only allocation discussion.** Our ~3,000-word target with 12-14 FAQs, worked allocation tables, a chart-of-accounts model, MTD quarterly mechanics, and 5-7 verified statute/HMRC citations is decisively best-in-class, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult at execution; refresh §4 per batch).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | hmo-landlord-accounting-multi-tenant-property-tax | self | **REWRITE in place**, reposition to operational-accounting intent |
| Residual sibling (DIRECT OVERLAP) | hmo-tax-guide-rental-income-deductions-multi-tenant | Both rank for "hmo landlord tax planning"; both cover room income + allocation + licensing + S24 + capital allowances | **Intent split (NOT 301).** This page → operational bookkeeping / MTD records. Sibling → tax-computation / what-is-deductible (taxable income definition, allowable-expense list, Section 24 mechanics). Forward-link to sibling for the deductions list. Equity supports keeping this page distinct: it OUTRANKS the sibling on the shared term (21.1 vs 47.3) on half the impressions, so it is the stronger page and must not be redirected away (§16.T2 weaker→stronger-only collapse rule; collapsing the stronger into the weaker would bury equity). |
| Sibling (adjacent intent) | hmo-vs-standard-buy-to-let-tax-comparison | Yield / incorporation comparison | No overlap once this page drops comparison framing. Forward-link OUT. (Also carries the £500-£1,500 pricing leak, flag.) |
| Sibling (adjacent intent) | hmo-licensing-fees-tax-deductible-uk-landlords | Licensing-fee deductibility | No overlap once this page stops re-covering licensing deductibility. Forward-link OUT. |
| Sibling (adjacent intent) | hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | CAA 2001 s.35 communal-parts capital-allowances claim (§25.7) | No overlap. This page references the communal-parts P&M point only in passing (one sentence) and forward-links OUT for the claim mechanics. |
| Pillars / MTD | mtd-itsa-qualifying-income-test-gross-vs-net + MTD pillar pages | MTD threshold + gross test | No cannibal, those are the general MTD pages; this page applies MTD specifically to multi-tenant record-keeping. Cross-link. |

**Conclusion:** REWRITE in place. NO REDIRECT-PROPOSED (REWRITE-only mode + equity favours this page on the contested term). The fix is a sharp intent split achieved by repositioning + four forward-links OUT. **NEW-RISK NOTE (raise as separate site-wide flag, out of scope for this brief):** the sibling `hmo-tax-guide-rental-income-deductions-multi-tenant` carries STALE facts (abolished 10% wear-and-tear allowance still framed as live; £85,000 VAT threshold, now £90,000 from 1 April 2024), documents why the sibling is NOT a clean canonical to defer a 301 to, and flags a later sibling-rewrite/back-patch.

---

## Closest existing pages (Stage 2, internal-link plan)

**Forward-link OUT to the four intent-siblings (so this page does not re-cover them, load-bearing for the intent split):**
- `hmo-tax-guide-rental-income-deductions-multi-tenant`, for the allowable-deductions list + Section 24 mechanics. Link from the income-recording and Section-24-touch sections with explicit "for the full deductions list, see ...".
- `hmo-vs-standard-buy-to-let-tax-comparison`, for yield / incorporation comparison. Link from any cash-flow/structure aside.
- `hmo-licensing-fees-tax-deductible-uk-landlords`, for licensing-fee deductibility detail. Link from the cost-recording section (REPLACES the stripped pricing line).
- `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`, for the CAA 2001 s.35 communal-parts P&M claim. Link from the one-sentence capital-allowances mention.

**Cross-category internal links (to and from):**
- `claim-mortgage-interest-rental-property-uk-section-24` (rewritten), Section 24 applied page, one-line forward-link.
- `buy-to-let-limited-company-complete-guide-uk` (rewritten), incorporation pillar, for the structure aside.
- `mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3 B1), for the §19.2 gross-test detail; forward-link from the MTD section.
- An MTD-software / digital-records page if one exists in corpus (verify at execution), for the §19.16 digital-link detail.
- `rental-yield-calculator-guide-uk-landlords`, keep the existing link (relevant to HMO economics).

**Routing flag (verify at execution):** the existing `/incorporation` link is a bare route, not a blog slug, confirm it resolves or repoint to `buy-to-let-limited-company-complete-guide-uk`. Confirm the internal-link survey points to whichever of the two HMO URLs (bare vs `/landlord-tax-essentials/` category-segmented) is the resolved canonical, see Routing/canonical flag below.

---

## House-position references (Stage 1)

- **§19 MTD for ITSA** [LOCKED 2026-05-22, Wave 3; Wave 4 extensions §19.10-§19.17 LOCKED 2026-05-23], the spine of the repositioned page.
  - **§19.1** mandate timeline: £50,000 (6 Apr 2026) / £30,000 (6 Apr 2027) / £20,000 (6 Apr 2028). Page figures already correct; preserve.
  - **§19.2** qualifying income is GROSS (before deductions); HMO inclusive rents counted gross. Load-bearing for HMOs (a gross-high / net-low HMO landlord can be in scope at the £52k-gross / £12k-net example). MUST add.
  - **§19.6 / §19.16** digital link definition: data transfer with no manual transcription/copy-paste; spreadsheet + bridging acceptable; spreadsheet must categorise into SA105 categories (gross rental, agent fees, repairs, insurance, council tax, finance costs, other). MUST add, this is the operational core.
  - **§19.10** agent statement categorisation: landlord (not agent) is the MTD filer; categorise into gross rental income (gross collected, not net of agent fees), agent commission, management fees, other deductions. The "report net of agent fees" trap (§19.10) is a perfect HMO worked-example. MUST add.
  - **§19.3** limited companies outside MTD ITSA (CT600 route); general partnerships deferred (no confirmed date). Note for HMO landlords who incorporate.
- **§30.5 Council tax, HMO and owner-liability mechanics** [LOCKED 2026-05-26, MW1 extension], HMO occupancy can shift council-tax liability from residents to the OWNER (whole-property single bill). Void-period council tax becomes a deductible landlord cost. **CRITICAL CAVEAT:** §30.5 itself notes "Government plans to change this, verify current status at Stage 2." The execution session MUST verify the live status of the post-Dec-2023 aggregation rule (the Council Tax (Chargeable Dwellings) (Amendment) (England) Regulations 2023) against legislation.gov.uk before asserting; frame as the current rule with date-stamp. SI hook: SI 1992/612 (Council Tax (Liability of Owners) Regulations 1992) per §30.2.
- **§25.7 + §25.1 CAA 2001 s.35 dwelling-house restriction** [LOCKED 2026-05-23, Wave 6], P&M allowances barred for plant IN a dwelling-house; narrow exception for plant in communal common parts of a multi-let property (HMO halls/landings). One-sentence mention only on this page; forward-link OUT to the dedicated s.35 sibling. Do NOT write "plant in a residential dwelling is claimable under AIA" (false per §25.10 do-not-write).
- **§13 Do-not-write list** [LOCKED], NO pricing; NO real client names; anonymised social proof only.
- **§26.9 HMO licensing (Housing Act 2004 Pt 2 + 3)** [LOCKED 2026-05-24, Wave 7], s.254 HMO definition; s.61 + SI 2018/221 mandatory 5-person test; civil penalty up to £40,000 per offence under s.249A from 1 May 2026 (SI 2026/319). Reference only for context framing (licensing fees deductible, penalties not); the deductibility detail is the licensing sibling's job. Do NOT write the £30,000 figure as current (now £40,000).

---

## House-position conflict flag (Stage 2)

**No direct contradiction of a locked house position** (unlike the F-29 commercial-rate or F-9 Lettings cases). The current page's MTD thresholds and Section 24 framing are correct. The defects are HARD-RULE (pricing) + incompleteness (omitted council-tax owner-liability; under-specified MTD mechanics), not stale-figure contradiction.

**Flags to raise at execution (to `track2_site_wide_flags.md`):**
- **HIGH, PRICING_LEAK** | hmo-landlord-accounting-multi-tenant-property-tax | two on-page fee figures (£500-£1,500 licensing; 10-15% management). Strip per HARD RULE / Decision E. Likely cluster-wide: the £500-£1,500 figure also appears on `hmo-vs-standard-buy-to-let-tax-comparison` FAQ, recommend a cluster pricing-leak audit across the HMO cluster.
- **MEDIUM, STALE_FACTS (sibling, out of scope here)** | hmo-tax-guide-rental-income-deductions-multi-tenant | abolished 10% wear-and-tear allowance framed as live; £85,000 VAT threshold (now £90,000 from 1 Apr 2024). Raise for a later sibling-rewrite/back-patch; documents why the sibling is not a clean 301 canonical.
- **LOW, ROUTING** | hmo-landlord-accounting-multi-tenant-property-tax | GSC indexes the bare `/blog/<slug>` URL while frontmatter canonical is `/blog/landlord-tax-essentials/<slug>`. Verify live route + self-canonical resolve to ONE URL; ensure the internal-link survey targets the canonical. (Mirrors §16.T6 parked duplicate flat/nested URL hygiene risk.)

---

## Authority links worth considering (Stage 2, VERIFY all at execution)

| URL | Use case | Verify note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | ITTOIA 2005 s.272, UK property business / expense deductibility | 200-check; confirm operative text not substituted |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | ITTOIA 2005 s.311A, replacement of domestic items relief (do NOT write "10% wear and tear") | Confirm s.311A is the current relief; verify against legislation.gov.uk |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | CAA 2001 s.35, dwelling-house restriction (communal parts only) | One-sentence cite; forward-link to sibling for mechanics |
| https://www.legislation.gov.uk/ukpga/2004/34/section/254 | Housing Act 2004 s.254, HMO definition (context) | Pair with s.61 mandatory-licensing for context only |
| https://www.legislation.gov.uk/ukpga/2004/34/section/61 | Housing Act 2004 s.61, HMO licensing | Context only |
| https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax | HMRC compatible-software finder (do NOT hard-code product names per §19.4) | Confirm live path |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual | HMRC PIM, property income / expense allocation | Verify exact sub-page only if cited (avoid hallucinated CG/PIM numbers per §16.31) |
| https://www.legislation.gov.uk/uksi/2026/336 | SI 2026/336 (Income Tax (Digital Obligations) Regs 2026), the live MTD ITSA instrument (SI 2021/1076 REVOKED 1 Apr 2026 per §19) | If citing the operative MTD instrument, use SI 2026/336, NOT SI 2021/1076 |

**(Execution session selects 5-7 to actually cite in body.)** Council-tax aggregation SI (SI 1992/612 + the 2023 amendment regs), verify exact citation + current status at execution before asserting (per §30.5 caveat).

---

## Section-by-section content plan (~3,000 words)

Target: 11-13 H2s, ~3,000 body words, 12-14 FAQs, 1 rates/threshold reference, 2 inline `<aside>` CTAs, 3-4 worked examples including a full allocation TABLE, 5-7 authority links.

1. **Intro (~150 words)**, frame the distinct intent explicitly: this is the operational accounting / bookkeeping guide for HMOs (running the books), distinct from "what's taxable" (forward-link to the deductions sibling in the first 2 paragraphs). Name the reader: the HMO landlord who needs a system, not a tax explainer.
2. **H2 Setting up a chart of accounts for an HMO (~300 words)**, the account structure: income accounts per room (or per tenancy), shared-cost accounts, finance-cost account (kept separate for Section 24), capital vs revenue separation. NEW operational content the siblings do not carry.
3. **H2 Recording HMO rental income room-by-room (~300 words)**, gross received (not accrued) basis; per-room occupancy + rate + arrears; deposit handling (not income); the §19.10 agent-statement categorisation (gross collected, NOT net of agent fees) with the §19.10 trap. **Worked Example 1: a room-level income ledger** for a 5-room HMO across a quarter with two void weeks.
4. **H2 A documented expense-allocation methodology (~400 words)**, the load-bearing operational section. Room-specific vs shared-area costs; choosing a consistent basis (equal per room / floor-area / rental-value); applying it consistently year-on-year; documenting the basis. **Worked Example 2: a full allocation TABLE**, a shared £X cost split three ways under each basis, showing the chosen method and why consistency matters in an enquiry. (Use illustrative cost figures only; NO fee/pricing language.)
5. **H2 Void periods, arrears and the council-tax cost line (~300 words)**, void-room tracking; arrears as a record (not a deduction); and the §30.5 point: in most aggregated HMOs the OWNER is liable for council tax, so void-period council tax is a genuine deductible landlord cost (verify current aggregation-rule status at write time; date-stamp). NEW content; a real HMO-accounting differentiator.
6. **H2 Capital vs revenue, and the communal-parts capital-allowances point (~200 words)**, capital vs revenue split in the books; ONE sentence on CAA 2001 s.35 (P&M barred in dwellings, narrow communal-parts exception) then forward-link OUT to the s.35 sibling. Do not re-cover the claim.
7. **H2 MTD for ITSA: what multi-tenant record-keeping actually requires (~450 words)**, the second load-bearing section. §19.1 thresholds (preserve); §19.2 GROSS qualifying-income test (HMO inclusive rents counted gross, worked: £52k gross / £12k net still in scope); quarterly-update mechanics; §19.16 digital-link definition (no copy-paste/manual re-keying; cell refs/API/CSV-import acceptable); spreadsheet column discipline into SA105 categories. **Worked Example 3: an HMO landlord at £52k gross / £12k net is in scope** despite low profit.
8. **H2 Choosing software for HMO bookkeeping (~250 words)**, feature checklist (room/property tagging, digital-link export, SA105 category mapping, MTD-compatible API submission); point to the HMRC compatible-software finder; do NOT hard-code product names (§19.4). Spreadsheet + bridging is acceptable (§19.6).
9. **H2 The audit-ready records pack (~250 words)**, what to retain and for how long: per-room tenancy agreements, occupancy/arrears log, allocation-method documentation (floor plans / area measurements), receipts mapped to room/shared area, deposit-protection records, licensing documentation, finance-cost statements. Frame as enquiry-resilience.
10. **H2 Section 24 in the HMO books (~150 words)**, brief: finance costs kept in a separate account, 20% basic-rate credit, why higher HMO yields can amplify the Section 24 effect. ONE paragraph then forward-link OUT to the Section 24 applied page + the deductions sibling. Do not re-cover the mechanics.
11. **H2 When to bring in a specialist (~150 words)**, qualitative (NO fees): the operational complexity (multi-tenancy, allocation consistency, MTD setup) at which a specialist saves time/risk; discovery-call CTA. This is where the stripped pricing lines are replaced by qualitative framing.
12. **Inline `<aside>` CTAs (2):** one after the allocation table (Worked Example 2), one after the MTD section (Worked Example 3). `<aside><p>Headline</p><p>Body</p></aside>`, no classes, scroll-to-form, no duplicate LeadForm.
13. **FAQ block (12-14)**, see Query-coverage + below. Each FAQ targets a distinct operational-intent query.

**FAQ set (target 12-14):** (1) How do I do the bookkeeping for an HMO? (2) What accounting software is best for HMO landlords / what features do I need? (3) What expense-allocation method should I use for an HMO, and can I change it? (4) Do I track income per room or per property? (5) What records does MTD for Income Tax require for a multi-tenant property? (6) Is my HMO income tested gross or net for the MTD threshold? (7) How do I record void periods and arrears? (8) Who is liable for council tax on an HMO, and is it deductible? (9) How do I categorise a letting-agent statement for MTD? (10) Do I need a separate bank account or separate ledger per room? (11) Can I use a spreadsheet for HMO MTD, or do I need software? (12) What is a digital link and why does it matter for HMO records? (13) How long must I keep HMO accounting records? (14) When should an HMO landlord use a specialist accountant? Preserve/upgrade the 4 existing FAQs into this set; strip any pricing.

---

## Statute spine (every section number with its Act, VERIFY each at write time)

- **ITTOIA 2005 s.272**, UK property business; expense deductibility basis. (legislation.gov.uk)
- **ITTOIA 2005 s.311A**, replacement of domestic items relief (the correct relief; NOT "10% wear and tear", abolished). (legislation.gov.uk)
- **CAA 2001 s.35**, dwelling-house restriction on plant & machinery allowances; communal-parts exception (one-sentence cite; §25.7). (legislation.gov.uk)
- **CAA 2001 s.15**, qualifying activities (context for the s.35 exception). (legislation.gov.uk)
- **Housing Act 2004 s.254**, HMO definition (§26.9). (legislation.gov.uk)
- **Housing Act 2004 s.61**, mandatory HMO licensing (§26.9; pair with SI 2018/221 5-person test). (legislation.gov.uk)
- **SI 2026/336**, Income Tax (Digital Obligations) Regulations 2026 (the LIVE MTD ITSA instrument; SI 2021/1076 revoked 1 Apr 2026 per §19). Cite the new instrument if citing the operative MTD reg. (legislation.gov.uk)
- **SI 1992/612**, Council Tax (Liability of Owners) Regulations 1992 (owner-liability for HMOs, §30.2/§30.5). Plus the Council Tax (Chargeable Dwellings) (Amendment) (England) Regulations 2023, VERIFY exact citation + current status before asserting the aggregation rule (§30.5 caveat). (legislation.gov.uk)
- **TMA 1970** record-keeping / enquiry context (general, for the records-pack section), optional; verify if cited.

**Verify-at-write discipline (HARD RULE):** every statute cite checked against legislation.gov.uk at write time, including the Royal Assent / commencement / revocation status (the SI 2021/1076 → SI 2026/336 revocation is the live example for this page). No April-2027 income-tax-rate assertion is present on the page, do NOT introduce one (no F-37 hazard here; keep it that way).

---

## Competitor depth benchmark

| Dimension | Competitor ceiling (3 URLs) | This rewrite target |
|---|---|---|
| Word count | ~1,800-2,000 | ~3,000 |
| FAQs | 0-few | 12-14 |
| Statute citations | 0-1 | 5-7 verified |
| Worked examples | 0-1 (prose) | 3-4 incl. a full allocation TABLE + a room-level ledger + an MTD gross-test worked example |
| MTD-ITSA quarterly mechanics | absent | present (§19.2/§19.6/§19.10/§19.16) |
| Chart-of-accounts / records-pack model | absent | present |
| Inline CTAs | varies | 2 (scroll-to-form) |

Result: decisively best-in-class on the operational-accounting intent, not catch-up.

---

## Query-coverage plan

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| hmo landlord tax planning | gsc | 7 | 21.1 | body§ (Section 24 in the HMO books H2, light touch; sibling owns the head-term, this page surfaces via operational depth + forward-link) |
| tax advice for hmo landlords | gsc | 3 | 42.0 | FAQ#14 (When should an HMO landlord use a specialist accountant?) |
| hmo landlord tax planning (page-level agg, alt window) | adjacent | 10 | 24.1 | H1 (HMO bookkeeping + MTD records framing captures the planning-adjacent operational intent without contesting the sibling's head-term) |

Each target_queries[] item assigned exactly once. (The repositioned page additionally targets the unowned operational query family, "hmo bookkeeping", "hmo accounting software", "hmo expense allocation method", "hmo record keeping mtd", "room-by-room rental ledger", via H1/H2s and FAQs #1/#2/#3/#5/#12; those are the realistic visibility wins, separate from the three measured rows above.)

---

## Meta plan

- **metaTitle (<=62):** `HMO Bookkeeping & MTD Records: Multi-Tenant Accounting` (53 chars), leads with "Bookkeeping & MTD Records" to claim the operational intent and separate from the sibling's tax-explainer.
- **metaDescription (<=158):** `How to run the books for an HMO: room-by-room ledgers, a consistent expense-allocation method, void tracking and MTD-for-Income-Tax record-keeping.` (146 chars), names the operational deliverables; no pricing; no em-dash.
- **h1:** `HMO Bookkeeping and Accounting: Multi-Tenant Record-Keeping and MTD`, operational, distinct from sibling.
- **summary (frontmatter):** `A practical accounting playbook for HMO landlords: setting up a chart of accounts, recording room-by-room income, documenting a consistent expense-allocation method, tracking voids and arrears, and meeting MTD for Income Tax record-keeping requirements for multi-tenant property.`

---

## Schema plan

- **Reviewer name:** `ICAEW Qualified Senior Reviewer` (anonymised, consistent with the lead-gen handoff model and the dominant corpus convention, used on 355 pages; NO named individual, NO real client names).
- **Reviewer credentials (`reviewerCredentials`):** `Chartered Accountant (ACA, ICAEW), MTD and Compliance Specialist` (matches the corpus convention for MTD/record-keeping-led pages; fits this page's operational/MTD focus).
- **howTo:** `false`. The page is a structured accounting guide with worked examples and FAQs, but it is not a single linear step-by-step procedure that warrants HowTo JSON-LD; keep it as Article + FAQPage to avoid schema-spam and mismatch. (If execution decides the chart-of-accounts setup reads as a genuine ordered procedure, HowTo MAY be reconsidered, but default is false.)
- **dateModified:** `2026-05-30`.
- **JSON-LD blocks emitted:** `BlogPosting` (Article) + `FAQPage` (auto-emitted from the frontmatter `faqs:` array via `buildBlogPostingJsonLd`; do NOT hand-add FAQ schema in body) + `BreadcrumbList` + `Organization` + `Person` (author/reviewer) per the standard template. NO HowTo block.

---

## Universal rules (do not skip)

Inherited from parent program (`NETNEW_PROGRAM.md §4` voice + `competitor_rewrite_playbook.md §5`). **Critical for this brief:** NO pricing/fees anywhere (strip both leaks; Decision E covers soft comparisons too). NO em-dashes (commas, parentheses, full stops, middle dots). Anonymised social proof only; NO real client names. LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 2 inline `<aside>` CTAs only. No Tailwind classes in markdown body; semantic HTML; FAQs in frontmatter only. Every statute cite verified at write time against legislation.gov.uk including commencement/revocation status.

---

## 19-step workflow (legacy-rewrite adaptation, Track 2 deltas per §4 sections 13-14)

1. Read `docs/property/house_positions.md` §19 (esp. §19.1/§19.2/§19.6/§19.10/§19.16), §25.7, §30.5, §26.9, §13 in full.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status).
3. Read this brief end-to-end.
4. **Verify-at-write statute pass:** ITTOIA 2005 s.272 + s.311A; CAA 2001 s.35; Housing Act 2004 s.254/s.61; SI 2026/336 (confirm SI 2021/1076 revoked); council-tax aggregation SI + current status (§30.5 caveat). Confirm NO April-2027 rate assertion is introduced.
5. WebFetch the 3 competitor URLs; confirm 200; date-stamp; replace any non-200.
6. Read the current source file in full + the four forward-link siblings (to set link anchors + confirm intent split holds).
7. Plan outline: 11-13 H2s, ~3,000 words, 12-14 FAQs, 2 inline CTAs, 3-4 worked examples incl. allocation table.
8. **Rewrite markdown at existing path** (NOT new file). Preserve slug + canonical (resolve the bare-vs-category routing flag) + category `Landlord Tax Essentials`. Update `dateModified` to 2026-05-30. ADD `reviewedBy` + `reviewerCredentials`. New metaTitle/metaDescription/h1/summary per Meta plan.
9. Strip both pricing leaks; replace with qualitative framing + discovery-call CTA.
10. Build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle <=62; metaDescription <=158; all internal links resolve; PRICING check `grep -E '£[0-9]|[0-9]+%' body` returns no fee/percentage-of-rent lines (threshold figures like £50,000 and 20% Section 24 credit are statutory, not pricing).
12. Confirm no redirect (REWRITE-only; equity favours this page, see Cannibalisation block).
13. Update / insert `monitored_pages` Supabase row (rewrite_type=`rewrite`; 180-day window given INVISIBLE baseline per F-11 recommendation).
14. Commit on `main`. Tracker edits via absolute paths only.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Raise the PRICING_LEAK + sibling-STALE + ROUTING flags in `track2_site_wide_flags.md`.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (cluster pricing-leak audit; sibling back-patch candidate).
19. Next page / end batch.

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §19.1 thresholds (preserve): __
- §19.2 gross test added: __
- §19.6/§19.16 digital link + spreadsheet discipline added: __
- §19.10 agent-statement categorisation + trap added: __
- §30.5 council-tax owner-liability (current status verified): __
- §25.7 s.35 communal-parts one-line + forward-link: __
- §13 do-not-write (pricing stripped): __ confirmed

### Comparison: before vs after
- Word count: 783 → __
- H2 count: 9 (+ 4 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __ (allocation table present? __)
- Pricing leaks removed: __ (Y/N, both)
- reviewedBy / reviewerCredentials added: __

### Flags raised
- PRICING_LEAK (confirmed stripped): __
- Sibling STALE (wear-and-tear / £90k VAT) raised: __
- ROUTING (bare vs category canonical) resolved: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
