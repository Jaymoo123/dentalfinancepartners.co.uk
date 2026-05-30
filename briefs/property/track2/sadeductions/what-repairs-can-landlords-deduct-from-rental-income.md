# Track 2 brief: what-repairs-can-landlords-deduct-from-rental-income

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; INVISIBLE + THIN_DEPTH + STALE_FACTS + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/what-repairs-can-landlords-deduct-from-rental-income.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/what-repairs-can-landlords-deduct-from-rental-income
**Stage 1 priority:** H, narrow, high-volume "what repairs can I deduct / repairs vs improvements" intent with table-stakes coverage gaps the page currently fails (RDI relief, nearest-modern-equivalent test, initial-repairs case-law line) plus three statute-grade stale facts to fix.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source markdown read in full + sibling slugs/categories verified on `main` + house positions §7/§29.8/§34/§38 confirmed)
**Cannibalisation status:** **REWRITE** (no collapse, see §"Cannibalisation universe check"; the equity guard would reject a collapse in this direction).

> Match-target: this brief is drafted to the depth of the gold-reference `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. Execution session produces a ~2,800-word rewrite at this brief's specificity, not a meta-only tweak.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `what-repairs-can-landlords-deduct-from-rental-income`. The slug is the exact-match anchor for the high-volume "what repairs can landlords deduct" / "repairs vs improvements for landlords" intent. No redirect proposed, this page is the intentional narrow-intent spoke of a hub-and-spoke cluster (the three siblings each own a distinct intent; none is a stronger canonical to 301 into).
- **Category:** `Landlord Tax Essentials` (kept, canonical path `/blog/landlord-tax-essentials/`). Do NOT move category; the canonical URL must be preserved at rewrite.
- **Gap-mode tag:** `INVISIBLE` (primary) + `THIN_DEPTH` (secondary) + `STALE_FACTS` (tertiary, statute-grade) + `STRUCTURE` (quaternary).
- **"Why this rewrite" angle:** The page is 1,125 words, published 2026-04-10 (~7 weeks live), and is INVISIBLE on both engines (GSC 0/0, Bing 0/0). The zero signal is explained by youth, NOT by a quality verdict, so the lever is a depth + freshness + authority rewrite that earns the page the right to rank as it ages, not a meta tweak on a page with nothing to surface. Three competitor table-stakes are missing entirely (Replacement of Domestic Items Relief; the "nearest modern equivalent" test by name; the initial-repairs case-law line). Three facts are stale to a statute-grade degree (VAT threshold £85k → £90k; cash-basis framing fully inverted; April 2027 framing asserted loosely). The rewrite leads on a **repair-qualification decision tree** so the page is the best answer to the narrow query, while forward-linking to the framework / omnibus / timing siblings so the cluster reads as hub-and-spoke rather than four near-duplicates.

---

## Current page snapshot (Stage 2, source markdown read in full 2026-05-30)

**Frontmatter:**
- `title`: "What Repairs Can Landlords Deduct From Rental Income in 2025/26?", **year-stamp drift** (2025/26; rewrite moves to 2026/27 framing or year-neutral)
- `slug`: `what-repairs-can-landlords-deduct-from-rental-income` (keep)
- `canonical`: `/blog/landlord-tax-essentials/what-repairs-can-landlords-deduct-from-rental-income` (keep)
- `date`: 2026-04-10 (update `dateModified` to execution date; keep `date`)
- `metaTitle`: "Landlord Repairs Tax Deduction: What Can You Claim 2025/26?" (57 chars; year-stamp drift)
- `metaDescription`: "Guide to landlord repairs tax deduction rules. Learn which repairs qualify as allowable expenses and the repairs vs improvements distinction." (140 chars; generic, no differentiator hook)
- `h1`: "What Repairs Can Landlords Deduct From Rental Income in 2025/26?" (year-stamp drift)
- `faqs:` array, **4 entries** (target 12-14). One FAQ (#1 repairs-vs-improvements) is fine; FAQ #2 (initial repairs) understates the case-law nuance; FAQ #4 (Section 24) framing is fine but cross-check the reducer figure stays consistent with §4/§7.

**Body:**
- **Word count: ~1,125** (target ~2,800).
- **8 H2 sections + 2 H3** (`What Qualifies as an Allowable Repair?`; `Allowable Repair Expenses for Landlords`; `The Critical Repairs vs Improvements Distinction` with H3 `Examples of Improvements` + H3 `Borderline Cases: The 50% Rule`; `Initial Property Condition and Pre-Letting Expenses`; `Professional Services, Labour Costs and VAT`; `Tax Treatment and Timing of Deductions`; `Record Keeping and Common Mistakes`; `Planning and Strategy`; `Commercial Property and Future Changes`).
- **Worked examples: 0 numerical.** (Two prose vignettes, Victorian sash windows, storm-damaged roof, but no figures.)
- **Outbound authority links: 0** (no gov.uk / legislation.gov.uk / HMRC manual citations anywhere).
- **Internal links: 3** (Section 24 guide; MTD landlords; how-to-choose-a-property-accountant; one cross-link to property-investment-tax pillar). Under-linked for a cluster spoke.
- **Inline CTAs: 0.** (LeadForm auto-injected by `BlogPostRenderer.tsx`; rewrite should add 1-2 inline `<aside>` CTAs at conversion moments per §13 pointer.)
- **No em-dashes present in current body**, preserve this at rewrite (do not introduce any).
- **No pricing leak present**, page is clean on fees. Preserve (do NOT introduce any fee figures, including soft "general-market" comparisons per Decision E).
- Last meaningful edit: 2026-04-10 (frontmatter `date`).

---

## GSC + Bing angle (last 90 days)

**Diagnosis-supplied signal (no fresh pull needed, page is INVISIBLE):**
- **GSC:** 0 impressions / 0 clicks. No query rows.
- **Bing:** 0 impressions / 0 clicks.
- **Published 2026-04-10 (~7 weeks live at diagnosis).** The zero signal is a **youth artefact, not a quality verdict** (per §16.42 / Track 2 INVISIBLE gap-mode). Two of the three revenue-vs-capital siblings are also INVISIBLE (capital-vs-revenue weak on both; pre-letting no measurable signal), which is *why* a collapse would be the wrong direction (see cannibalisation section).

**Implication for the rewrite:** there is no live query distribution to optimise meta against. The lever is to make the page the **deepest, best-cited answer to the narrow intent** so it earns ranking as it ages. Target the primary + secondary queries below by building answer-shaped FAQ + decision-tree coverage, not by chasing a current impression cluster. Execution session SHOULD do a fresh `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90` + `bing_query_client property` pull at write time in case the page has begun to accrue impressions in the interim, but should NOT block the rewrite on signal that may still be absent.

**Monitoring window:** because the baseline is INVISIBLE, set the `monitored_pages` window to **180 days** from rewrite date (per F-11 INVISIBLE-baseline convention), not the standard 90.

---

## Primary + secondary query targets

- **Primary query:** `what repairs can landlords deduct from rental income`
- **Secondary queries (build answer-shaped coverage for each):**
  - `repairs vs improvements landlord` / `repairs vs improvements for landlords uk`
  - `are landlord repairs tax deductible`
  - `replacement of domestic items relief` (RDI, currently absent; high table-stakes)
  - `like for like replacement landlord tax` / `nearest modern equivalent repair`
  - `initial repairs landlord tax deductible` / `repairs when you first buy a rental property`
  - `is a new boiler tax deductible landlord` / `new kitchen repair or improvement`
  - `can landlords claim VAT on repairs`
  - `cash basis vs accruals landlord repairs` (timing, reframe to cash-basis-default)

These map to FAQ #1-#10 verbatim where possible (the highest-intent secondary queries become the lead FAQs).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INVISIBLE.** 0/0 on both engines. Not a quality verdict, the page is 7 weeks old. The rewrite's job is to earn future ranking by becoming the best answer, then let the 180-day monitored window observe accrual.

**Secondary: THIN_DEPTH.** 1,125 words against a competitor field that runs 1,500-2,500 words with decision frameworks, worked apportionments, and named case law. The page is a list of bullet examples with no decision tree, no figures, and no statutory spine. It reads as serviceable-but-shallow; against Finistry (which covers RDI relief, the modern-equivalent test, and the initial-repairs line) it is below table-stakes.

**Tertiary: STALE_FACTS (statute-grade, three confirmed, load-bearing fixes):**
1. **VAT registration threshold** stated as **"£85,000"** (body line 95). It is **£90,000 from 1 April 2024** per house_positions §29.8 (rate-by-reference; verify against gov.uk at write time). Fix the number AND keep the residential-letting VAT-exempt point intact (residential rent is exempt; the threshold rarely binds for pure-residential landlords, frame accordingly).
2. **Cash-basis framing fully INVERTED** (body line 100). The page presents accruals as the norm and cash basis as an opt-in "many smaller landlords prefer", and asserts "£150,000 accruals mandatory". Since **6 April 2024 the cash basis is the DEFAULT for unincorporated property businesses**, you elect OUT to GAAP/accruals, and the old **£150,000 cash-basis entry cap was removed**. Reframe to **cash-basis-default**, note that **repair-deduction timing differs** accordingly (cash basis: deduct when **paid**; accruals: deduct when **incurred**), and state the election-out mechanic. **No locked house position governs cash-basis-default specifically**, execution session MUST verify the default + the £150k-cap removal + the election-out at legislation.gov.uk / gov.uk at write time (ITTOIA 2005 s.271D area / the cash-basis-for-property-businesses provisions; verify the exact section, do not invent).
3. **April 2027 property income tax framing** (body line 130) asserted loosely as "separate property income tax rates will apply". Per house_positions **§7 [LOCKED 2026-05-27]**: FA 2026 (c.11) ss.6-8 is **ENACTED (Royal Assent 18 March 2026)**, effective **6 April 2027**, England + NI only. The change is that property income is taxed at **22% basic / 42% higher / 47% additional**, and the **Section 24 reducer RISES to 22%** (the new property basic rate), so **no new basic-rate wedge opens**. **Do NOT** assert a vague "different rates" line and **do NOT** imply repairs "become more valuable" in a way that smuggles in a wedge-widening claim. State it as enacted law with the §7 framing, verify the §7 lock status against legislation.gov.uk at write time per the F-37 Bill-vs-enacted discipline (FA 2026 had Royal Assent, assert as law, do not hedge as "proposed").

**Quaternary: STRUCTURE + COVERAGE GAP.** Zero authority links; 4 FAQs; 0 worked examples; no decision tree. Three competitor table-stakes are missing **entirely**:
- **Replacement of Domestic Items Relief (RDI)**, ITTOIA 2005 **s.311A** area (verify exact section at write time; the diagnosis named s.311ZA, that may be the wear-and-tear repeal vehicle, NOT RDI; do not transcribe s.311ZA for RDI without verifying). This is the successor to the abolished wear-and-tear allowance and is the correct route for replacing a free-standing cooker / fridge / sofa / carpet in a let dwelling. The site already has a dedicated RDI page (`replacement-domestic-items-relief-uk-landlords-guide`), this page covers RDI **briefly + forward-links** to that page, not in full.
- **The "nearest modern equivalent" test by name**, HMRC's stated position (PIM2020 area) that replacing a part with the nearest modern equivalent is still a repair even if the new part is technically superior (single-glazed → double-glazed windows are HMRC's own worked example of repair, not improvement, where it is the modern standard like-for-like). The current page's "Examples of Improvements" list **wrongly** lists "converting single-glazed to double-glazing" as a non-deductible improvement, that contradicts HMRC PIM2030 / the modern-equivalent line and MUST be corrected at rewrite.
- **The initial-repairs case-law line**, *Law Shipping Co Ltd v IRC* (1923, 12 TC 621: repairs to remedy defects present at acquisition that prevented profitable use are **capital**) vs *Odeon Associated Theatres Ltd v Jones* (1971, 48 TC 257: deferred repairs to an already-usable asset acquired in a dilapidated-but-usable state can be **revenue**). The current page gestures at "initial property condition" but never names the test or the cases. Verify both citations + the principle at HMRC PIM2020 + a secondary source at write time.

**Load-bearing fix sequence (ordered by ROI):**
1. **Lead with a repair-qualification decision tree** (new top section), "Is it a repair or an improvement?" 4-5 step flow (restoration vs enhancement → like-for-like / nearest-modern-equivalent → entirety test → initial-repairs Law Shipping/Odeon → RDI route for domestic items). This is the snippet-bait + the differentiator vs the bullet-list competitors.
2. **Correct the three stale facts** (VAT £90k; cash-basis-default + timing; April 2027 §7 enacted framing), these are statute-grade and reader-misleading; first job after the decision tree.
3. **Correct the double-glazing error** in the improvements list per the nearest-modern-equivalent test (PIM2030).
4. **Add the three missing table-stakes** (RDI brief + forward-link; nearest-modern-equivalent test by name; Law Shipping / Odeon initial-repairs line).
5. **Add 2-3 worked numerical examples** (e.g. £6,000 roof repair with incidental upgrade; £2,400 boiler replacement like-for-like vs upgrade; RDI £900 sofa replacement netting off proceeds of the old one), competitors have at most one.
6. **Body lift to ~2,800 words**; FAQ 4 → 12-14 (each targeting a secondary query verbatim).
7. **Add the statute spine as 5-7 verified legislation.gov.uk / HMRC-manual hyperlinks** (see statute spine section).
8. **Add 1-2 inline `<aside>` CTAs** at conversion moments; expand internal links to the full cluster (framework / omnibus / timing / RDI siblings) so the hub-and-spoke reads cleanly.
9. **metaTitle / metaDescription / h1 rewrite** (year-stamp drift + differentiator hook, see meta plan).

---

## Competitor URLs (Stage 2, VERIFY LIVE at execution per §16.31)

Fetch each (httpx with a proper User-Agent), confirm 200, date-stamp, and replace any non-200 before relying on it. These are diagnosis-supplied targets, none was WebFetched at brief time (WebFetch deferred to execution per trial discipline).

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://finistry.co.uk/learn/landlords/guides/income-expenses/repairs-vs-improvements | Decision framing + the three table-stakes (RDI, modern-equivalent, initial-repairs), this is the depth ceiling to match | Likely no statute hyperlinks, no worked figures, no cash-basis-default correction, beat on citations + worked examples + freshness |
| https://uklandlordtax.co.uk/allowable-expenses-against-rental-income/ | Breadth of allowable-expense categories (confirms our omnibus-sibling boundary) | This is an omnibus list, NOT a repairs-specific page, we own the narrow intent; do not let our page drift into an omnibus dupe |
| https://www.streets.uk/about-us/news/landlords-claiming-maintenance-and-repairs-costs/ | Plain-English repair-vs-maintenance framing | Likely news-post depth (short); beat on structure + FAQ + decision tree |
| https://fhpaccounting.co.uk/deductible-expenses-for-landlords-understanding-repairs-vs-improvements-and-apportionment-rules/ | Apportionment rules (the 50% / incidental-upgrade mechanic), sharpen our worked example here | Confirm their apportionment framing against HMRC PIM before borrowing; do not transcribe a rule-of-thumb as statute |

**Competitor depth ceiling for this query class:** ~1,500-2,500 words, 0-1 worked examples, few or no statute hyperlinks, RDI + modern-equivalent + initial-repairs covered by the strongest (Finistry). Our ~2,800-word target with a decision tree + 2-3 worked examples + 5-7 verified statute/manual hyperlinks + 12-14 FAQs + the three stale-fact corrections puts us decisively best-in-class, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the latest refresh at execution).

**Decision: REWRITE, no collapse.** Three sibling pages touch the revenue-vs-capital theme; each owns a DISTINCT intent and none is a stronger canonical to 301 into.

| Sibling (live slug) | Live category / path | Intent it owns | Signal | Relationship to this page |
|---|---|---|---|---|
| `capital-vs-revenue-expenditure-landlord-uk` | Landlord Tax Essentials | The classification FRAMEWORK (the abstract revenue-vs-capital test) | GSC 6 impr / pos 38 / 0 clk; Bing 8 impr / pos 4.3 / 0 clk, weak | **Forward-link** as the framework hub. This page is the applied "which repairs qualify" spoke. |
| `landlord-tax-deductions-uk-2026-complete-list` | Section 24 & Tax Relief | The OMNIBUS allowable-expenses list (every category) | GSC 84 impr / pos 51 / 0 clk; Bing 47 impr / pos 5.9 / 4 clk, owns broad "allowable expenses list" intent | **Forward-link** as the omnibus. This page is the narrow "repairs" deep-dive, NOT the list. Do not let our page sprawl into the omnibus's territory. |
| `pre-letting-expenses-landlord-claim-before-first-tenant` | Landlord Tax Essentials | TIMING-specific (costs before first tenant) | No measurable signal | **Forward-link** for the initial-repairs / pre-letting timing handoff. This page covers the initial-repairs *qualification* (Law Shipping/Odeon); that page covers the *timing* mechanics. |
| `replacement-domestic-items-relief-uk-landlords-guide` | Section 24 & Tax Relief | RDI relief in full (s.311A area) | (not in diagnosis) | **Forward-link**, this page covers RDI *briefly* (one paragraph + the netting-off mechanic) and points to the dedicated guide for the full treatment. |

**Collapse-direction guard (why no REDIRECT):** THIS page is INVISIBLE (0/0 on both engines) and so are two of the three siblings. Collapsing it away would point an invisible page at a same-or-weaker page, destroying the distinct keyword target ("what repairs can I deduct") for zero equity gain. That is the wrong direction and the data-gated equity guard (`scripts/track2_collapse_guard.py`, R6) would reject it (you cannot collapse into a non-stronger target). **Conclusion: REWRITE in place.** Distinctness is maintained by leading on the repair-qualification decision tree + like-for-like / nearest-modern-equivalent test + initial-repairs (Law Shipping / Odeon) line + RDI route, while forward-linking the framework / omnibus / timing / RDI siblings so the cluster reads as hub-and-spoke.

---

## Closest existing pages (Stage 2, verified live on `main` 2026-05-30)

Internal-link partners (to and from this page), all canonical paths confirmed by reading frontmatter:

- **Framework hub:** `/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk`, forward-link from the decision-tree intro ("for the abstract test, see ...").
- **Omnibus list:** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list`, forward-link from the intro / "where repairs sit among all allowable expenses".
- **Timing sibling:** `/blog/landlord-tax-essentials/pre-letting-expenses-landlord-claim-before-first-tenant`, forward-link from the initial-repairs section.
- **RDI relief:** `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide`, forward-link from the RDI paragraph.
- **Section 24 (kept link, fix anchor):** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` (the current page links to `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`, verify this resolves; the live guide slug is `section-24-tax-relief-complete-guide`). Use for the "Section 24 does not restrict repair deductions" line.
- **MTD (kept link):** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`, keep for the digital-record-keeping line.
- **April 2027 framing:** `/blog/landlord-tax-essentials/property-investment-tax-uk-complete-guide-2026` (current target), keep, but ensure the linking sentence states the §7 enacted framing correctly (22/42/47 + reducer rises to 22%).
- **Capital allowances boundary (NEW link opportunity):** `/blog/property-types-and-specialist-tax/capital-allowances-on-property` and/or `/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`, forward-link from the "Commercial Property" section where the page notes capital allowances on plant in non-dwelling areas (per §38 s.35 dwelling-house bar; correct the current page's loose "capital allowances on commercial property improvements" line to the s.35 / common-parts / integral-features framing).
- **HMO licensing fees (cross-link):** `/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords`, optional forward-link from the HMO-common-area-repairs paragraph.

---

## House-position references (Stage 1)

- **§7 April 2027 property income tax** [LOCKED 2026-05-27, VERIFY lock status at write time per F-37 discipline]: FA 2026 (c.11) ss.6-8 ENACTED, RA 18 March 2026, effective 6 April 2027, England + NI. Rates 22/42/47; **Section 24 reducer rises to 22%, no new wedge**. State as enacted law. **Do-not-write:** "the reducer stays at 20% in 2027/28"; "a new basic-rate wedge opens"; "FA 2026 is draft/proposed"; "announced at Autumn Budget 2024" (it was Autumn Budget 2025).
- **§29.8 VAT registration threshold** [LOCKED, rate-by-reference]: **£90,000 from 1 April 2024** (not £85,000). Verify against gov.uk at write time per §16.27. Keep the residential-rent-is-exempt point.
- **§34 Landlord allowable expenses architecture** [LOCKED 2026-05-27]: ITTOIA 2005 **s.272** is the operative import gateway (trading-income deduction rules apply to property business GAAP); **s.34** wholly-and-exclusively (imported); **s.94H** simplified expenses (imported). HMRC PIM anchors. §34 is **revenue** deductions, the revenue-vs-capital line is the gateway to §38.
- **§38 Capital allowances (CAA 2001), FA 2026 floor** [LOCKED 2026-05-30]: the **revenue-vs-capital line** is the boundary between §34 (this page's repairs = revenue) and §38 (capital allowances). For the commercial-property section: **s.35 dwelling-house bar** (no plant-and-machinery allowances for plant in a dwelling within a property business; common parts + integral features in non-dwelling areas can still qualify). Correct the current page's loose "capital allowances on commercial property improvements" line to this framing. Main-pool **WDA is 14%** (not 18%) from April 2026 if WDA is mentioned at all.
- **No locked house position on cash-basis-default specifically.** The cash-basis-default reframe (6 April 2024; £150k cap removed; elect OUT to GAAP) MUST be verified at legislation.gov.uk / gov.uk at write time, do not cite a section number for it without verifying. Candidate to flag to `track2_site_wide_flags.md` for a future HP lock (the inverted framing on this page suggests it may be a corpus-wide stale pattern worth a cluster audit).
- **§13 Do-not-write list** [LOCKED]: NO pricing (including soft general-market fee comparisons per Decision E); NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts, three statute-grade stale facts + one HMRC-position error.** Raise as Track 2 flags:

- **F-xx | STALE_FACTS | VAT threshold £85,000 (body line 95).** Conflicts with §29.8 (£90,000 from 1 April 2024). HIGH (reader-misleading on a compliance figure).
- **F-xx | STALE_FACTS | cash-basis framing INVERTED + £150k cap asserted (body line 100).** No locked HP governs this; the page contradicts the post-6-April-2024 cash-basis-default rule. HIGH. Recommend a cluster audit + future HP lock (likely a corpus-wide pattern).
- **F-xx | STALE_FACTS / Bill-vs-enacted | April 2027 framing asserted loosely (body line 130).** Now resolvable as ENACTED per §7 (FA 2026 RA 18 March 2026), reframe to enacted 22/42/47 + reducer-rises-to-22% rather than the current vague "different rates / more valuable" line. MEDIUM.
- **F-xx | HMRC_POSITION_ERROR | double-glazing wrongly listed as a non-deductible improvement (body line 66).** Contradicts the nearest-modern-equivalent test (HMRC PIM2030: single→double glazing is repair where it is the modern like-for-like standard). MEDIUM (reader-misleading, causes landlords to NOT claim a legitimate repair).

These four are the rewrite's first jobs after the decision tree.

---

## Statute spine (every section with its Act, VERIFY each against legislation.gov.uk + HMRC manual at write time)

The execution session selects 5-7 of these to render as live legislation.gov.uk / gov.uk hyperlinks. **Verify each section number AND that the operative wording is still in force (the F-8 TCGA-s.4-substituted lesson) AND that no PIM number is invented.**

| Citation | Act / manual | Use on page | Verification note |
|---|---|---|---|
| **ITTOIA 2005 s.272** | Income Tax (Trading and Other Income) Act 2005 | The import gateway: trading-income deduction rules apply to the property business (the statutory basis for "repairs are deductible") | §34.1 lock; https://www.legislation.gov.uk/ukpga/2005/5/section/272 |
| **ITTOIA 2005 s.34** | ITTOIA 2005 (imported into property business via s.272) | The **wholly and exclusively** test the page already references | §34 lock; https://www.legislation.gov.uk/ukpga/2005/5/section/34, confirm it is the s.34 imported by s.272, not the unrelated s.34 of another Act |
| **ITTOIA 2005 s.311A** (RDI) | ITTOIA 2005 | Replacement of Domestic Items Relief, the route for free-standing domestic items in a let dwelling | **VERIFY exact section**, diagnosis named s.311ZA; s.311A is the more likely RDI provision; s.311ZA may be the wear-and-tear repeal. Do NOT transcribe without confirming at legislation.gov.uk + cross-checking the dedicated RDI page |
| **PIM2020** | HMRC Property Income Manual | Repairs vs capital; "nearest modern equivalent" test; entirety test | Verify the PIM number resolves and covers the modern-equivalent point (no invented PIM numbers, the F-7 PIM4101 hallucination lesson) |
| **PIM2030** | HMRC Property Income Manual | Repairs vs improvements worked HMRC examples (incl. single→double glazing as repair) | Verify number + that it carries the double-glazing example before citing it to correct the page's error |
| **Law Shipping Co Ltd v IRC** (1923) 12 TC 621 | Case law (Court of Session) | Initial repairs to remedy pre-acquisition defects preventing profitable use = capital | Verify citation + principle against PIM2020 + a secondary source; do not assert the year/TC ref without checking |
| **Odeon Associated Theatres Ltd v Jones** (1971) 48 TC 257 | Case law (CA) | Deferred repairs to an already-usable, dilapidated-but-usable asset = revenue | Verify citation + principle; this is the counter-authority to Law Shipping |
| **FA 2026 (c.11) ss.6-8** | Finance Act 2026 | April 2027 property income rates (22/42/47) + reducer at 22% | §7 lock; RA 18 March 2026, assert as enacted; verify lock status at write time |
| **CAA 2001 s.35** | Capital Allowances Act 2001 | Dwelling-house bar (commercial-section correction) | §38 lock; only if the commercial section is retained |
| **Cash-basis-default provision** | ITTOIA 2005 (cash basis for property businesses, post-6-April-2024) | The cash-basis-default reframe + timing | **VERIFY exact section + the £150k-cap-removal + elect-out mechanic at legislation.gov.uk / gov.uk**, no locked HP; do not cite a number unverified |

---

## Competitor depth benchmark

| Dimension | Current page | Competitor ceiling (Finistry et al.) | This rewrite target |
|---|---|---:|---:|
| Word count | ~1,125 | ~1,500-2,500 | ~2,800 |
| Decision tree | none | partial (Finistry) | full 4-5 step (lead section) |
| Worked numerical examples | 0 | 0-1 | 2-3 |
| RDI relief covered | no | yes (Finistry) | yes (brief + forward-link) |
| Nearest-modern-equivalent test named | no | yes (Finistry) | yes + corrects the double-glazing error |
| Initial-repairs case law (Law Shipping/Odeon) | no | yes (Finistry) | yes (named + verified) |
| Statute/manual hyperlinks | 0 | ~0-1 | 5-7 verified |
| FAQs | 4 | 0-6 | 12-14 |
| Stale facts | 3 (VAT, cash basis, April 2027) | n/a | 0 (all corrected) |
| Inline CTAs | 0 | n/a | 1-2 |

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤ 62 chars):** lead with the differentiator + drop the year-stamp drift. Candidates (execution picks one):
  - "Repairs vs Improvements: What Landlords Can Deduct (UK)" (54)
  - "Landlord Repairs Tax Deduction: Repairs vs Improvements" (54)
  - "What Repairs Can Landlords Deduct? UK Tax Rules + Examples" (57)
- **metaDescription (≤ 158 chars):** named mechanic + worked-example promise + soft hook (no pricing). Candidate:
  - "Which repairs are tax-deductible for UK landlords? The repairs-vs-improvements test, the nearest-modern-equivalent rule, initial repairs and RDI relief, with worked examples." (trim to ≤158)
- **h1:** "What Repairs Can Landlords Deduct From Rental Income?" (drop "in 2025/26" year-stamp; keep the exact-match primary-query phrasing). Year-specific figures live in body, not the h1.

---

## Universal rules, inherited from parent program (do not restate)

See `TRACK2_PROGRAM.md §4` section 13 pointer block: voice rules (`NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5` "Universal site rules"); lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, 1-2 inline `<aside>` CTAs only); CSS-in-markdown (semantic HTML only, no Tailwind classes in body); FAQs and schema (`faqs:` frontmatter array, `buildBlogPostingJsonLd` auto-emits FAQPage, never hand-add FAQ schema in body); anti-templating discipline; six-check verification (`competitor_rewrite_playbook.md §4.3`); statute-citation discipline (F-8, live URL ≠ live wording; verify operative text).

**Brief-critical reminders:** NO em-dashes (none present now, keep it that way). NO pricing, including soft general-market fee comparisons (Decision E). Anonymised social proof only. Every statute citation verified at write time, including the FA 2026 §7 Royal Assent date (F-37 pattern).

## 19-step workflow, inherited (Wave 5) with Track 2 deltas

See `TRACK2_PROGRAM.md §4` section 14 pointer block (full 19-step workflow in `NETNEW_PROGRAM.md §7`). Track 2 deltas: Step 9 = rewrite markdown at existing path (preserve slug + canonical + category + `date`; update `dateModified`); Step 12 = confirm no redirect needed (none, REWRITE in place); Step 13 = insert/update `monitored_pages` row with a **180-day** window (INVISIBLE baseline). Pre-rewrite load-bearing verification steps for THIS page:

1. Read house_positions §7, §29.8, §34, §38 at session start.
2. **Verify §7 lock status** against legislation.gov.uk (FA 2026 ss.6-8 enacted, assert as law).
3. **Verify the VAT threshold** (£90,000) against gov.uk.
4. **Verify the cash-basis-default + £150k-cap-removal + elect-out** at legislation.gov.uk / gov.uk (no locked HP, verify before writing).
5. **Verify the RDI section number** (s.311A vs s.311ZA) + the PIM numbers (PIM2020/PIM2030) + the two case citations (Law Shipping 12 TC 621; Odeon 48 TC 257), no invented references.
6. Re-fetch the 4 competitor URLs (confirm 200; replace dead).
7. Read the 4 sibling pages (capital-vs-revenue framework; omnibus list; pre-letting timing; RDI guide) so forward-links and boundaries are precise.
8. Plan outline: lead decision-tree section + 9-11 H2s + ~2,800 words + 12-14 FAQs + 2-3 worked examples + 5-7 authority links.
9. Rewrite at existing path; correct the four conflicts (VAT, cash basis, April 2027, double-glazing); add the three table-stakes (RDI, modern-equivalent, Law Shipping/Odeon).
10. `cd Property/web && npm run build`, must pass.
11. Six checks: FAQ schema count = frontmatter length; em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62; metaDescription ≤ 158; all internal links resolve; **pricing grep returns 0 fee lines**.
12-19. Per §4 deltas (no redirect; 180-day monitored row; commit on main; tracker → ✅ executed; flags + heartbeat + discovery log).

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §7 April 2027 (22/42/47 + reducer 22%, enacted), lock status at write: __ enacted (assert) / __ still verify
- §29.8 VAT threshold £90,000, corrected: __
- §34 s.272 / s.34 spine threaded: __
- §38 s.35 dwelling-house bar (commercial section corrected): __
- Cash-basis-default (verified, not from HP): __

### Comparison: before vs after
- Word count: 1,125 → __
- H2 count: 8 (+2 H3) → __
- FAQ count: 4 → __
- Worked numerical examples: 0 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Decision tree: 0 → __ (1 expected)
- Stale facts corrected: __ /3 (VAT, cash basis, April 2027) + double-glazing error

### Flags raised
- F-xx VAT £85k→£90k: __
- F-xx cash-basis inversion (+ cluster-audit / HP-lock recommendation): __
- F-xx April 2027 reframe to enacted §7: __
- F-xx double-glazing modern-equivalent correction: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
