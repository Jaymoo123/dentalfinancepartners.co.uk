# Track 2 brief: first-time-landlord-tax-guide-everything-you-need-to-know

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (new-landlord lifecycle hub)
**Source markdown path:** `Property/web/content/blog/first-time-landlord-tax-guide-everything-you-need-to-know.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know
**Stage 1 priority:** **H** — high-intent evergreen hub query ("first time landlord tax guide uk" / "new landlord tax" / "buy-to-let tax for beginners"); INVISIBLE on both engines so the rewrite is also a re-launch, not just a lift; and it carries TWO blocking wrong-advice defects that have already shipped into FAQ rich results.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source read in full; house positions §1/§3/§4/§5/§7/§38 verified against `house_positions.md`; internal-link category paths verified against the live corpus)
**Cannibalisation status:** **REWRITE** (confirmed — no internal page targets the first-time/new-landlord lifecycle hub intent; no COLLAPSE is possible because the page is INVISIBLE on both engines and every candidate canonical either ranks page 7+ with zero clicks or is itself invisible, so there is no stronger page to 301 into. Equity-direction check fails the collapse guard's weaker→stronger rule in both directions; keep distinct.)

> **This is a gold-reference brief.** It is populated to the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The defining feature of this page is that it is the END-TO-END new-landlord decision sequence: each sibling drills exactly one stage, and this hub sequences all of them and links out. The load-bearing rewrite jobs are (1) correcting two shipped wrong-advice defects, (2) replacing a wrong relief, (3) repairing a truncated body, and (4) bringing the 2027 framing into line with the locked house position.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `first-time-landlord-tax-guide-everything-you-need-to-know`. The slug is a clean match for the head term ("first time landlord tax guide") and the long-tail "everything you need to know" hub framing. No redirect proposed in either direction.
- **Category:** `Landlord Tax Essentials` (kept; URL path `/blog/landlord-tax-essentials/`).
- **Gap-mode tag:** `INVISIBLE` (primary — 0 GSC / 0 Bing impressions; the page has never surfaced) + `STALE_FACTS` (secondary — 3% SDLT in FAQs, wrong capital-allowances relief, missing FA-2026 reducer framing) + `THIN_DEPTH` (tertiary — 1,950 words vs a 3,400 target; competitors are wider) + `STRUCTURE` (the body is truncated mid-sentence and lacks snippet-bait elements and sufficient FAQs).
- **"Why this rewrite" angle:** This is not a CTR-fail (there is no traffic to fail). It is an INVISIBLE evergreen hub that should be the natural entry point for the "I'm about to become a landlord, what do I owe" searcher, and three structural problems are keeping it invisible and unsafe: it ships **internally-contradictory FAQ rich results** (FAQ schema says 3% SDLT surcharge while the body says 5%), it teaches a **wrong relief** (capital allowances on residential furnishings, which do not exist post-FHL-abolition), and the **body is cut off mid-sentence**. The rewrite must (a) make the page internally consistent and correct, (b) reposition it as the lifecycle hub that sequences every stage and links each sibling page that owns the deep dive, and (c) lift to ~3,400 words with worked numbers, the FA-2026-correct 2027 framing, and 12-14 FAQs. The distinctness lever versus every sibling is breadth-of-sequence: buy structure → SDLT 5% surcharge → rental income + Section 24 → allowable expenses + the correct furnishings relief → CGT-on-exit → MTD onboarding → Self Assessment registration → first-year mistakes.

---

## Current page snapshot (Stage 2 — source read in full from filesystem)

**Filesystem source read (`first-time-landlord-tax-guide-everything-you-need-to-know.md`, 236 lines):**
- **Body word count:** ~1,950 words.
- **H2 outline (8 H2s + 9 H3s):**
  1. *Immediate Tax Considerations When Buying Your First BTL* (H3 SDLT Surcharge; H3 Individual vs Limited Company)
  2. *Understanding Rental Income Tax and Section 24* (H3 How Rental Income Is Calculated; H3 Section 24 Impact)
  3. *Allowable Expenses for New Landlords* (H3 Revenue vs Capital; H3 Pre-Trading Expenses)
  4. *Capital Gains Tax Planning* (H3 CGT Rates; H3 PPR; H3 Lettings Relief Now Abolished)
  5. *Record-Keeping and Compliance* (H3 Essential Documents; H3 MTD)
  6. *Self-Assessment and Payment Dates* (H3 Key Annual Deadlines; H3 Registering for Self Assessment)
  7. *Professional Support and Ongoing Tax Planning* (H3 When to Seek Help)
  8. *Common Tax Mistakes New Landlords Make* (H3 Structural; H3 Compliance/Calculation) + *Tax Planning for Portfolio Growth* (H3 Income Tax Rate Progression)
- **metaTitle:** "First-Time Landlord Tax Guide 2026 | UK BTL Tax Guide" (52 chars).
- **metaDescription:** "Complete first time landlord tax guide covering rental income tax, CGT, Section 24, SDLT surcharge, and new landlord tax obligations for 2026." (140 chars).
- **FAQ count (frontmatter `faqs:`):** 4 (target 12-14).
- **Worked examples present:** 3 (SDLT £200k surcharge example; Section 24 £10k interest 40%-taxpayer example; PPR 2-of-10-years example).
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations anywhere).
- **Internal links:** 5 (BTL Ltd Co guide; Section 24 guide; landlord tax deductions list; PPR relief; MTD guide; "what a property accountant does").
- **Schema present:** Y (FAQPage auto-emitted from the 4 frontmatter FAQs — which is exactly why the wrong 3% figure is the most dangerous defect: it is in the rich result, not just the body).
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).

**Defect inventory (the spine of this rewrite — all confirmed by reading the source):**
1. **BLOCKING wrong-advice in FAQ schema (lines 17 and 23):** both FAQs state "3% surcharge" / "3% Stamp Duty Land Tax surcharge". The body (line 36) correctly says 5% from October 2024. The page therefore ships a self-contradiction directly into FAQPage rich results. Per `house_positions.md §1` the additional-dwellings surcharge is **5% from 31 October 2024 (Finance (No.2) Act 2024)** and "the additional dwellings surcharge is 3%" is on the §1 do-not-write list. **Both FAQs must be corrected to 5%.**
2. **WRONG-ADVICE — capital allowances on residential furnishings (lines 61 and 99-102):** the body lists "capital allowances on furniture and equipment" as a rental deduction and "Furniture and appliances (may qualify for capital allowances)" as a capital item. Per `house_positions.md §38` (and §25.7) the **CAA 2001 s.35 dwelling-house bar** means there are NO plant-and-machinery allowances for plant in an ordinary residential dwelling. The correct relief for replacing furnishings in a residential let is **Replacement of Domestic Items Relief (ITTOIA 2005 s.311ZA)**. §38 do-not-write: "Landlords can claim AIA on furnishings/boilers inside a let dwelling". **Strip the capital-allowances framing; replace with RDIR.**
3. **BROKEN COPY (line 235):** the body ends mid-sentence — "With proper preparation, you". The rewrite completes the page and closes with a conversion-moment CTA.
4. **2027 FRAMING wrong / FA-2026 wrong-advice pattern (lines 28, 64, 227):** the page repeatedly frames April 2027 property rates (22/42/47) as "higher than general income tax" and as opening a new wedge. Per `house_positions.md §7` and §4, FA 2026 (Royal Assent 18 March 2026) also raises the **Section 24 finance-cost reducer to 22%**, so for a basic-rate landlord the reducer matches the 22% rate and **no new basic-rate wedge opens**; for higher/additional-rate landlords the wedge does NOT widen. The "higher than general income tax" framing is misleading and must be reframed.
5. **EM-DASH violations (lines 28, 64, 227):** memory-locked no-em-dash rule. Strip all three (replace with commas / parentheses / full stops).

---

## GSC angle (last 90 days)

**Diagnosis input (carried from the DIAGNOSE stage):** the page is **INVISIBLE — 0 GSC impressions and 0 Bing impressions in the 90-day window.** There are no queries, no positions, no CTR to report. This is the defining datum: there is nothing to "lift", so the rewrite is effectively a re-launch on a corrected, deeper, internally-consistent page.

**Why INVISIBLE rather than CTR-FAIL:** the gold-reference cgt-rates page had 895 impressions / 1 click (a true CTR-fail). This page has never surfaced at all. The likely causes are (a) the page is a generic "everything you need to know" hub competing against established consumer sites for a broad head term, and (b) it carries internal contradictions and a truncated body that suppress quality signals. The realistic post-rewrite target is therefore framed as **first impressions, not CTR multiples**: get the page indexed cleanly, earn long-tail "first time landlord tax" / "new landlord what tax do I pay" impressions, and convert the hub role into internal-link equity for the deep-dive siblings.

**Monitoring window guidance:** because the baseline is INVISIBLE, set the `monitored_pages` window to **180 days** from rewrite date (per the F-11 INVISIBLE-baseline recommendation), not 90, so the detector does not read a slow organic ramp as a regression.

**GA4 engagement signal:** no meaningful GA4 sessions to report (page is invisible). Engagement is not the limiter here; correctness, depth, and indexability are.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: INVISIBLE.** Zero impressions on both Google and Bing. No internal page owns the first-time/new-landlord lifecycle hub intent, so this page should own it, but it has never surfaced. The rewrite's first job is to make the page safe and indexable; its second is to make it the best single answer to "I'm about to become a landlord, what tax do I owe and in what order."

**Secondary: STALE_FACTS (high consequence).** Two of these are shipped wrong-advice, not merely outdated framing: the 3% SDLT figure is live in FAQ rich results, and the capital-allowances-on-furnishings advice teaches a relief that does not exist for residential lets. The 2027 framing is the third FA-2026 pattern instance. These are the load-bearing corrections; they take priority over any depth or structure work.

**Tertiary: THIN_DEPTH.** 1,950 words against a 3,400 target. The competitor set (taxd, totallandlordinsurance, simplybusiness, moneyfactscompare) runs 2,000-3,500 words across the full landlord-tax lifecycle but with 0 statute citations and few or no worked examples. Our differentiator is depth-with-citation plus the sequence-hub framing.

**Quaternary: STRUCTURE.** The body is truncated mid-sentence; there is no rates/at-a-glance table for snippet capture; only 4 FAQs; 0 authority links. The rewrite adds an at-a-glance "first-year tax checklist" table, completes the body, expands FAQs to 12-14 (each targeting a discrete new-landlord question), and adds 5 verified authority links.

**Load-bearing fix sequence (ordered by consequence, not by ROI — the first three are correctness gates):**

1. **Correct both FAQ SDLT figures 3% → 5%** (FAQPage rich-result safety; `house_positions.md §1`). This is the single highest-consequence change.
2. **Strip capital-allowances-on-furnishings; replace with Replacement of Domestic Items Relief** (`house_positions.md §38` s.35 dwelling-house bar; ITTOIA 2005 s.311ZA). Update BOTH the "rental income calculated" list (line 61) and the "capital expenses" list (lines 99-102), and add a short H3 explaining RDIR with a worked example and a forward-link to the dedicated RDIR page.
3. **Complete the truncated body** (line 235) and add a closing conversion section.
4. **Reframe April 2027** per `house_positions.md §7` / §4: state 22/42/47 as enacted law (FA 2026, Royal Assent 18 March 2026, effective 6 April 2027, England + Wales + NI; Scotland carved out), state the reducer rises to 22%, and state explicitly that **no new basic-rate wedge opens** and the higher-rate wedge does NOT widen. Remove the "higher than general income tax" framing.
5. **Strip all em-dashes** (lines 28, 64, 227 and any introduced in the rewrite).
6. **Add the lifecycle-hub scaffolding:** an at-a-glance first-year checklist table near the top, a clear stage sequence, and a forward-link from each stage to the sibling that owns the deep dive (see Closest existing pages).
7. **Lift to ~3,400 words; 12-14 FAQs; 2 inline `<aside>` CTAs; 5 authority links.**
8. **Re-verify every statute cite against legislation.gov.uk at write time**, including FA 2026 Royal Assent (18 March 2026) for the 2027 rates and the reducer (the F-37 Bill-vs-enacted pattern).

---

## Competitor URLs (Stage 2 — to verify live at execution per §16.31)

These are the DIAGNOSE-supplied competitor targets. The execution session MUST WebFetch each, confirm 200 status, and date-stamp; replace any non-200 before citing.

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.taxd.co.uk/blog/landlord-tax-guide-buying-selling-and-letting-property | Buying / letting / selling lifecycle spine (matches our stage sequence) | No statute citations; no worked numbers; no FA-2026 2027 framing; no MTD threshold schedule |
| https://www.totallandlordinsurance.co.uk/knowledge-centre/taxes-for-uk-landlords | Plain-English "taxes a landlord faces" enumeration; good for FAQ seed-mining | Insurer angle, not a tax specialist; thin on Section 24 mechanics, CGT reliefs, and incorporation |
| https://www.simplybusiness.co.uk/knowledge/landlord-tax/buy-to-let-tax-changes/ | "What changed" framing useful for the SDLT-5% / CGT-18-24 / FHL-abolition / 2027 timeline | Change-log framing not a beginner sequence; verify they have NOT yet updated to FA-2026 2027 reducer framing (likely stale — our differentiator) |
| https://moneyfactscompare.co.uk/mortgages/guides/tax-on-buy-to-let-property-and-rental-income/ | Rental-income-tax + Section 24 worked numbers; snippet-bait table structure | Mortgage-comparison site; no CGT-on-exit depth, no MTD onboarding, no Self Assessment registration deadlines |

**Competitor depth ceiling for this query class:** ~2,000-3,500 words, 0 statute citations, 0-1 worked examples, no FA-2026-correct 2027 framing, no MTD threshold schedule with dates. Our 3,400-word target with 12-14 FAQs, 4-5 worked examples, 5 verified statute citations, the full MTD £50k/£30k/£20k schedule, and the correct 2027 reducer framing puts us decisively best-in-class for this hub, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the latest in-flight snapshot at execution).

| Source | Slug | Intent owned | Resolution |
|---|---|---|---|
| Residual (own) | first-time-landlord-tax-guide-everything-you-need-to-know | New-landlord END-TO-END lifecycle hub | REWRITE in place — this page owns the sequence |
| Sibling (same category) | how-much-tax-rental-income-uk-complete-guide | Narrow "tax on rental income" (positions 70-86, 0 clicks) | NO collision — this is a sub-topic the hub links DOWN to, not a page to collapse into. The sibling is itself weak (page 7+), so collapsing the hub into it would be a reversed-equity 301 (weaker target). |
| Sibling (same category) | how-to-complete-landlord-self-assessment-filing-step-by-step-guide | SA filing mechanics step-by-step | NO collision — hub links DOWN to it from the Self Assessment registration stage |
| Sibling (same category) | landlord-tax-changes-2026-complete-guide | "What changed in 2026" change-log | NO collision — change-log intent, not a beginner sequence; cross-link |
| SDLT first-time-BUYER pages | first-time-buyer-relief-*, applicable-sdlt-rates-for-first-time-buyers, scottish/welsh FTB relief | Purchaser SDLT relief (wholly distinct intent) | NO collision — these are first-time-BUYER (purchaser relief) pages, not first-time-LANDLORD lifecycle. The only "first-time" Grep hits; confirmed distinct intent. |
| Deep-dive siblings (link-down targets) | section-24-tax-relief-complete-guide; buy-to-let-limited-company-complete-guide-uk; landlord-tax-deductions-uk-2026-complete-list; replacement-domestic-items-relief-uk-landlords-guide; principal-private-residence-relief-landlords; cgt-rates-property-2026-27-current-rates-explained; making-tax-digital-landlords-april-2026-deadline; 2027-property-income-tax-rates-landlords-uk | Each owns one stage in depth | NO collision — these are the deep dives the hub sequences and links to. The hub summarises each stage in 2-4 paragraphs and forward-links. |

**Equity-direction check (collapse guard logic, §16.T2):** the page is INVISIBLE on both engines (0/0). Every candidate canonical to collapse INTO is either page 7+ with zero clicks (`how-much-tax-rental-income`) or itself invisible. A 301 in either direction therefore gains nothing and risks burying a distinct hub intent. **No COLLAPSE; keep distinct.**

**Conclusion:** **REWRITE in place.** No REDIRECT-PROPOSED. No FLAG-MANAGER (no pricing leak found on-page; Decision E clean — keep it that way).

---

## Closest existing pages (Stage 2 — internal-link paths VERIFIED against the live corpus)

The hub summarises each stage briefly and forward-links to the sibling that owns the deep dive. All paths below were confirmed by grepping live `href=` values in the corpus, so the execution session can use them verbatim (Step 11 "all internal links resolve" check should pass on these):

- **SDLT 5% surcharge depth / incorporation decision →** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (already on page; keep)
- **Section 24 deep dive →** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` (already on page; keep)
- **Allowable expenses full list →** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` (already on page; keep)
- **Replacement of Domestic Items Relief (NEW — replaces the wrong capital-allowances framing) →** `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide`
- **PPR relief on exit →** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (already on page; keep)
- **CGT rates on exit →** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (NEW forward-link from the CGT stage)
- **CGT annual exempt amount →** `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27` (NEW forward-link)
- **MTD onboarding →** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` (already on page; keep)
- **2027 property income rates pillar →** `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk` (NEW forward-link from the 2027 stage)
- **Rental income tax sub-topic →** `/blog/landlord-tax-essentials/how-much-tax-rental-income-uk-complete-guide` (NEW link-down; per diagnosis, link to it, do not collapse)
- **Self Assessment filing step-by-step →** `/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide` (NEW link-down from the SA registration stage)
- **What a property accountant does →** `/blog/property-accountant-services/what-does-a-property-accountant-do` (already on page; keep)

---

## House-position references (Stage 1)

- **§1 SDLT rates and surcharges (2026/27)** [LOCKED]: additional-dwellings surcharge **5% from 31 October 2024** (Finance (No.2) Act 2024); FA 2003 Sch 4ZA. Both FAQ corrections (3% → 5%) anchor here. §1 do-not-write: "the additional dwellings surcharge is 3%".
- **§3 MTD for ITSA** [LOCKED + §19 extensions]: thresholds **£50,000 from 6 April 2026 / £30,000 from 6 April 2027 / £20,000 from 6 April 2028**; limited companies outside MTD; joint owners test against their share. Current page is already correct here (lines 160-162); preserve and keep the dates.
- **§4 Section 24** [LOCKED]: 20% basic-rate credit for 2026/27; **rises to 22% from 2027/28** (FA 2026 Sch 1 amending ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B); reducer is NOT frozen at 20%. Three-part cap.
- **§5 CGT on UK residential property 2026/27** [LOCKED]: **18% / 24%** from 30 October 2024; **£3,000 AEA** per individual; PRR s.222-226 TCGA 1992; Letting Relief restricted to shared-occupation since 6 April 2020; s.58 spouse no-gain-no-loss. The page's CGT section (lines 123-137) is broadly correct; verify the £6,000 "married couples" framing reads as 2 × £3,000 AEAs, not a £6,000 joint allowance.
- **§6 FHL abolition** [LOCKED]: FHL abolished 6 April 2025; FHL-specific reliefs (including the old capital-allowances route) no longer available. This underpins why the furnishings-capital-allowances advice is now wrong.
- **§7 April 2027 property income surcharge** [LOCKED — but VERIFY FA 2026 Royal Assent (18 March 2026) at write time per F-37]: 22/42/47 for England + Wales + NI, Scotland carved out; reducer at 22%; **no new basic-rate wedge**; higher-rate wedge does NOT widen. §7 do-not-write: "higher than general income tax" implication of a new wedge; "FA 2026 is draft / a proposal"; "England and NI only" (Wales is in for 2027/28).
- **§38 Capital allowances (CAA 2001) — FA 2026 reform floor** [LOCKED 2026-05-30]: **s.35 dwelling-house bar** — no plant-and-machinery allowances for plant in a residential dwelling. §38 do-not-write: "Landlords can claim AIA on furnishings/boilers inside a let dwelling". This is the lock that makes the line-61 / line-99-102 advice wrong; the correct relief is RDIR (ITTOIA 2005 s.311ZA, verify section at write time).
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; NO FHL/BADR on residential furnishings as if alive.

---

## House-position conflict flag (Stage 2)

**Three confirmed conflicts — all must be fixed as the first job of the rewrite:**

1. **F-flag (HIGH) — SDLT 3% in FAQ schema.** Frontmatter FAQs at lines 17 and 23 state 3% / "3% Stamp Duty Land Tax surcharge" against `house_positions.md §1` (5% from 31 Oct 2024). This is shipped wrong-advice in FAQPage rich results. Correct both to 5%.
2. **F-flag (HIGH) — capital allowances on residential furnishings.** Lines 61 and 99-102 imply furniture/appliances "may qualify for capital allowances" against `house_positions.md §38` (s.35 dwelling-house bar) and §6 (FHL abolition removed the route). Replace with Replacement of Domestic Items Relief (ITTOIA 2005 s.311ZA).
3. **F-flag (MEDIUM) — FA-2026 2027 reducer / wedge framing.** Lines 28, 64, 227 frame 22/42/47 as "higher than general income tax" and imply a new wedge, against `house_positions.md §7` and §4. Reframe to state the reducer rises to 22% and no new basic-rate wedge opens.

Plus a BROKEN-COPY repair (line 235 truncation) and EM-DASH strips (lines 28, 64, 227). Log to `track2_site_wide_flags.md` at execution with the next free F-number, noting the SDLT-3%-in-FAQ-schema and capital-allowances-on-furnishings patterns as candidates for a cross-residual sweep (both are likely to recur on other beginner/expenses pages).

---

## Authority links worth considering (Stage 2 — verify all at execution time per §16.31)

The execution session selects 5 to actually cite. Verify each returns 200 AND that the operative wording is current (the F-8 "URL live but content amended" trap — e.g., TCGA 1992 s.4 was substituted by FA 2019, so cite the current charging provision, not s.4).

| URL | Use case | Verification note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA | SDLT 5% additional-dwellings surcharge (FA 2003 Sch 4ZA) | Confirm Sch 4ZA wording; cross-check 5% figure against §1 |
| https://www.legislation.gov.uk/ukpga/2007/3/section/272A | Section 24 finance-cost restriction (ITA 2007 s.272A / ITTOIA 2005 ss.272A-274; tax reducer at ITA 2007 ss.399A-399B) | Verify the reducer sections; FA 2026 Sch 1 amends ss.274AA/274C + ITA 2007 s.399B for the 22% reducer |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311ZA | Replacement of Domestic Items Relief (ITTOIA 2005 s.311ZA) | Confirm the section number for RDIR at write time; this REPLACES the wrong capital-allowances cite |
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | PRR (TCGA 1992 s.222-226) | Confirm PRR wording; final 9 months deemed occupation per §5 |
| https://www.gov.uk/guidance/self-assessment-tax-returns | Self Assessment registration deadline (5 October following the first tax year) + £1,000 property allowance | Confirm the 5 October registration deadline and the £1,000 property-allowance trading threshold |
| https://www.gov.uk/guidance/check-if-you-need-to-sign-up-for-making-tax-digital-for-income-tax | MTD-for-ITSA threshold schedule (£50k/£30k/£20k) | Cross-check against §3; confirm April 2026/2027/2028 dates |
| https://www.legislation.gov.uk/ukpga/2026/11/section/7 | FA 2026 c.11 s.7 — 2027 property income rates (Royal Assent 18 March 2026) | **F-37 mandatory** — confirm Royal Assent date AND that the rates are enacted, not Bill-form, at write time |

---

## Universal rules (do not skip)

(Pointer block per `TRACK2_PROGRAM.md §4 section 13` — inherited from `NETNEW_PROGRAM.md §4` voice block + `competitor_rewrite_playbook.md §5`. Critical for THIS brief: NO em-dashes anywhere (strip lines 28/64/227). NO pricing or fee figures (Decision E: even soft "£800-£1,500 general-market" comparisons are a leak — the current line-199 "typical costs involved" pointer must NOT acquire a number). NO real client names; anonymised proof only. LeadForm auto-injected by `BlogPostRenderer.tsx` — do not duplicate; use 1-2 inline `<aside>` CTAs at conversion moments. FAQs in frontmatter `faqs:` array (target 12-14); `buildBlogPostingJsonLd` auto-emits FAQPage — never hand-add FAQ schema in body. Semantic HTML only, no Tailwind utility classes in markdown body. House positions §1/§3/§4/§5/§7/§38 are the contract — cite by section, never paraphrase the figures loosely.)

---

## 19-step workflow (legacy-rewrite adaptation — inherits `TRACK2_PROGRAM.md §4 section 14` + `NETNEW_PROGRAM.md §7`, Track 2 deltas applied)

1. Read `docs/property/house_positions.md` §1, §3, §4, §5, §6, §7, §38 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / 🔵 in_progress per the execution-phase legend).
3. Read this brief end-to-end.
4. **Verify the three correctness gates first:** (a) SDLT 5% per §1; (b) RDIR / s.35 dwelling-house bar per §38; (c) FA 2026 §7 Royal Assent (18 March 2026) and the 22% reducer per §4/§7 against legislation.gov.uk. These are the load-bearing pre-rewrite verifications.
5. WebFetch the 4 competitor URLs to confirm liveness at execution; replace any non-200.
6. Read the current source file in full (already summarised above).
7. Read the deep-dive sibling pages this hub links to (at minimum: Section 24 guide, BTL Ltd Co guide, deductions list, RDIR page, PPR, CGT rates, MTD guide, 2027 rates pillar) for accurate one-paragraph summaries and correct anchor text.
8. Plan rewrite outline: ~10-12 H2s, ~3,400 body words, 12-14 FAQs, an at-a-glance first-year checklist table near the top, 2 inline `<aside>` CTAs, 5 authority links.
9. **Rewrite markdown at the existing path** (NOT a new file). Preserve frontmatter slug + canonical + category; update `date`/`dateModified` to today. Correct BOTH FAQs to 5%. Replace the capital-allowances furnishings advice with RDIR. Complete the truncated body. Reframe 2027 per §7. Strip em-dashes. Rewrite metaTitle/metaDescription/h1 per the plan below.
10. Run the site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length (12-14); em-dash count = 0 (`grep -c "—"` returns 0); Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve (use the verified paths above); plus a defect-specific check: `grep -E '3%|capital allowance' Property/web/content/blog/first-time-landlord-tax-guide-everything-you-need-to-know.md` returns no surviving wrong-advice instances (3% surcharge / furnishings capital allowances).
12. Confirm no redirect needed (none — slug kept; this is the intentional lifecycle hub).
13. Insert/update the `monitored_pages` Supabase row: `rewrite_type='rewrite'`, **180-day window** from today (INVISIBLE baseline, per F-11).
14. Commit on `main`: `Track 2: rewrite first-time-landlord-tax-guide (INVISIBLE re-launch + SDLT-3% FAQ fix + capital-allowances→RDIR fix + 2027 reducer reframe + body repair)`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the three confirmed conflicts + the cross-residual sweep candidates.
17. Update `TRACK2_PROGRAM.md §3 heartbeat.
18. Log discoveries for inter-batch awareness (SDLT-3%-in-FAQ-schema pattern; capital-allowances-on-furnishings pattern).
19. Next page in batch (or end batch).

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (test against the head term "first time landlord tax guide uk"):** primary candidate **"First-Time Landlord Tax Guide UK 2026 | What You Owe"** (52 chars). Alternative: **"New Landlord Tax UK: First-Year Guide + Checklist"** (50 chars). Lead with the head term word order; keep "UK" and a year/benefit hook. Must be ≤ 62 chars.
- **metaDescription:** **"Your first buy-to-let, decoded: SDLT 5% surcharge, rental income tax, Section 24, CGT on exit, MTD and Self Assessment, in the order a new UK landlord needs them."** (≈158 chars). Lead with the sequence promise (the distinctness lever), name the load-bearing mechanics, and keep it specific. Must be ≤ 158 chars. NO em-dashes, NO pricing.
- **h1:** keep close to the title but fuller: **"First-Time Landlord Tax Guide: Everything a New UK Landlord Needs to Know, in Order"** (the "in order" reinforces the sequence-hub distinctness against the deep-dive siblings).

---

## Section-by-section content plan (~3,400 words)

| H2 | ~Words | Content + house-position thread | Forward-links |
|---|---:|---|---|
| Intro + first-year tax at-a-glance table | 250 | One-paragraph framing of the lifecycle, then a snippet-bait table: row per stage (SDLT on purchase, income tax on rent, Section 24, expenses + RDIR, CGT on exit, MTD, Self Assessment) with the headline figure/date per stage. Remove the em-dash + "higher than general income tax" framing from the current intro. | — |
| 1. Buying: ownership structure (personal vs company) | 420 | §4 (S24 applies to individuals not companies) + §5 (CGT on personal exit) + corporation tax framing (19% small-profits / 25% main / £250k marginal). Frame as the permanent, expensive-to-change decision. | BTL Ltd Co guide; 2027 rates pillar |
| 2. Buying: the SDLT 5% additional-dwellings surcharge | 360 | §1: 5% from 31 Oct 2024 (FA (No.2) Act 2024); £200k worked example (£10k surcharge + standard bands). Note Scotland (ADS 8%) / Wales (LTT higher rates) differ. **FAQ-side 3% must be fixed too.** | — (authority: FA 2003 Sch 4ZA) |
| 3. Renting: how rental income is taxed + Section 24 | 480 | §4: 20% credit 2026/27; how profit = rent − allowable expenses; £10k-interest 40%-taxpayer worked example. Remove the wrong "capital allowances" line from the profit list. | Section 24 guide; how-much-tax-rental-income (link-down) |
| 4. Renting: allowable expenses + Replacement of Domestic Items Relief | 460 | §38 (s.35 dwelling-house bar — NO capital allowances on furnishings); §34 revenue-vs-capital; repair-vs-improvement; pre-trading expenses; **RDIR (ITTOIA 2005 s.311ZA) replaces the capital-allowances framing** with a worked replacement-sofa example. Inline `<aside>` CTA #1 here. | Deductions list; RDIR guide |
| 5. The £1,000 property allowance + when you must declare | 220 | gov.uk SA guidance: rental income over £1,000 means Self Assessment; the property allowance as a small-income simplification. | SA filing step-by-step (link-down) |
| 6. Selling: CGT on exit | 460 | §5: 18%/24%; £3,000 AEA (state married couples = 2 × £3,000, not a £6,000 joint allowance); PRR s.222-226 (final 9 months); Letting Relief shared-occupation only since 6 April 2020 (keep the "now abolished for most" framing, make it precise); s.58 spouse no-gain-no-loss for pre-sale planning. | CGT rates; CGT AEA; PPR |
| 7. Compliance: MTD for Income Tax onboarding | 320 | §3: £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028); joint owners test their share; companies outside MTD; points-based penalties. Keep the current correct dates. | MTD guide |
| 8. Compliance: Self Assessment registration + payment dates | 320 | Register by 5 October following the first tax year; 31 Jan online + payment; 31 Jul payment on account; £1,000+ bill triggers payments on account; £100 late-registration penalty. | SA filing step-by-step |
| 9. April 2027: what actually changes | 300 | §7: 22/42/47 enacted by FA 2026 (RA 18 March 2026), effective 6 April 2027, England + Wales + NI, Scotland carved out; §4 reducer rises to 22%; **state explicitly: no new basic-rate wedge opens; the higher-rate wedge does NOT widen.** Remove "higher than general income tax". | 2027 rates pillar; Section 24 guide |
| 10. First-year mistakes new landlords make | 300 | Wrong structure; ignoring spouse allowances; late SA registration; misclassifying repairs vs improvements; assuming furnishings get capital allowances (tie back to RDIR); missing the SDLT surcharge in purchase budgeting. | — |
| 11. Getting professional support + next steps (closes the truncated body) | 230 | Complete the cut-off sentence; when to seek help; NO pricing (Decision E). Inline `<aside>` CTA #2 (discovery call). | What a property accountant does |

**FAQ plan (12-14, frontmatter `faqs:` — each a discrete new-landlord question; correct the two existing wrong ones):**
1. What tax do I pay as a first-time landlord? (rewrite the existing FAQ; **SDLT 5%, not 3%**)
2. How does the Stamp Duty surcharge work for landlords? (rewrite the existing FAQ; **5% from 31 Oct 2024, not 3%**)
3. What expenses can I claim against rental income? (keep; ensure no capital-allowances-on-furnishings)
4. Can I claim capital allowances on furniture in my rental? (NEW — explicitly: no for an ordinary residential dwelling; use Replacement of Domestic Items Relief instead)
5. Do I need to file a tax return as a landlord? (keep; £1,000 property allowance)
6. When do I have to register for Self Assessment? (NEW — 5 October following the first tax year)
7. Should I buy my first BTL personally or through a company?
8. How does Section 24 affect a new landlord?
9. Will the April 2027 rates make my tax bill go up? (NEW — reducer rises to 22%, no new basic-rate wedge)
10. Do I have to use Making Tax Digital? (threshold schedule)
11. How much CGT will I pay when I sell? (18%/24%, £3,000 AEA)
12. What records do I need to keep, and for how long?
13. What are payments on account and will I owe them?
14. (Optional) Do the SDLT and CGT rules differ in Scotland and Wales?

---

## Per-page work-log (for execution session — empty template)

### Correctness gates (verify FIRST)
- §1 SDLT 5% (both FAQs corrected from 3%): __
- §38 s.35 dwelling-house bar — capital-allowances furnishings stripped; RDIR (ITTOIA 2005 s.311ZA) cite verified: __
- §7 FA 2026 c.11 Royal Assent 18 March 2026 confirmed at write time (F-37); 22% reducer per §4: __ enacted-with-citation / __ (if not) hedge
- Truncated body (line 235) completed: __ (Y/N)
- Em-dashes stripped (lines 28/64/227): __ (count after = 0)

### Comparison: before vs after
- Word count: 1,950 → __
- H2 count: 8 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 3 → __
- At-a-glance table: 0 → __ (1 expected)

### Re-launch hypothesis test (INVISIBLE baseline)
- Pre-rewrite GSC/Bing: 0 / 0 impressions
- Post-rewrite target: first long-tail "first time landlord tax" impressions; hub link-equity to siblings
- Monitor at +60 / +120 / +180 days via monitored_pages (180-day window per F-11)

### Flags raised
- HIGH: SDLT 3% in FAQ schema (confirmed; corrected): __
- HIGH: capital-allowances-on-furnishings (confirmed; replaced with RDIR): __
- MEDIUM: FA-2026 2027 reducer/wedge framing (confirmed; reframed): __
- Cross-residual sweep candidates logged: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
