# Track 2 brief: landlord-insurance-tax-deductible

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; STALE_FACTS + INVISIBLE + CTR_FAIL + THIN_DEPTH + STRUCTURE; load-bearing wrong-citation + wrong-rule corrections)
**Source markdown path:** `Property/web/content/blog/landlord-insurance-tax-deductible.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/landlord-insurance-tax-deductible
**Stage 1 priority:** **H** — strongest cumulative intent signal of the insurance-tax cluster (~46 cumulative impressions for the intent across current slug + historical slug variant) AND carries three substantive factual errors live in production (one wrong HMRC manual cited three times, one flatly wrong cash-basis rule, one imprecise wholly-and-exclusively cite). The factual corrections are the load-bearing reason this is H not M.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (data from diagnosis payload + filesystem source read + house_positions cross-check + corpus internal-link verification; competitor URL liveness deferred to execution per §16.31)
**Cannibalisation status:** **REWRITE** (this page is the stronger of a DIRECT PAIR; the weaker sibling `landlord-insurance-guide-types-costs-tax-deductible` is FLAGGED to manager for a later weaker→stronger 301 collapse INTO this page; not actioned here)

> This brief is drafted to the gold-reference depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-rewrite reference `briefs/property/track2/trial/birmingham-property-accountant.md`. Unlike the CTR-fail gold reference (where the dominant lever was meta + snippet repositioning), THIS page's dominant lever is **factual remediation** — there is wrong advice live in production that misroutes the reader's tax treatment. The rewrite's first job is correctness, second is depth, third is meta.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `landlord-insurance-tax-deductible`. The slug owns the cluster head term "is landlord insurance tax deductible uk" and already carries the only inbound internal link in the pair (from `landlord-tax-deductions-uk-2026-complete-list` line 137). No redirect of THIS slug. The historical slug variant `landlord-insurance-tax-deductible-what-can-you-claim` (which holds ~37 of the cumulative impressions) is presumed already 301'd to this slug or retired; execution verifies whether a redirect from the historical variant exists and, if not, adds one so the historical impression equity flows here.
- **Category:** `Section 24 & Tax Relief` (kept; canonical path segment `/blog/section-24-and-tax-relief/`). The page is correctly categorised: it is fundamentally about which property-business expenses get relief and how receipts are taxed, which is the deductions/relief family, not a buyer's guide.
- **Gap-mode tag:** `STALE_FACTS` (PRIMARY — load-bearing wrong advice live) + `INVISIBLE` (very low absolute impressions despite a clean canonical intent) + `CTR_FAIL` (impressions, ~0 clicks) + `THIN_DEPTH` (2,099 words vs 3,200 target) + `STRUCTURE` (no top-of-page snippet table aimed at the head question; rates/treatment buried below the premium table).
- **"Why this rewrite" angle:** This is the definitive TAX page for landlord insurance: it is the only page in the corpus (and, per the diagnosis, the only page among competitor targets) that properly covers **both** sides — premium deductibility **and** the taxability of payouts (income vs capital). That dual coverage is the moat. But the live page undermines its own authority with three errors (see Risk / Gap-mode below). The rewrite remediates the errors, deepens the payout-taxation material (which no competitor covers), lifts to ~3,200 words, adds a top-of-page answer-shaped summary table, and brings the FAQ count and authority-link count up to the gold-reference floor. The distinctiveness vs the weaker sibling is sharpened so the later 301 collapse is clean.

---

## Current page snapshot (Stage 2 — filesystem source read 2026-05-30)

**Frontmatter:**
- `metaTitle`: "Income Tax on Landlord Insurance Claims & Premiums (UK 2026/27)" (62 chars — at limit)
- `metaDescription`: "How HMRC treats landlord insurance premiums and claim payouts: which premiums are deductible, when payouts are taxable, and how to record both for MTD." (150 chars)
- Has `metaTitle_prev` + `metaDescription_prev` — evidence of a prior meta-rewrite that did not lift the page out of invisibility (same pattern as the CGT gold reference; confirms meta-only is not the fix here).
- `h1`: "Landlord Insurance and Income Tax: Deductible Premiums and Taxable Payouts"
- `category`: "Section 24 & Tax Relief"
- `faqs`: **13 entries** (already at the gold-reference floor of 12-14 — do NOT cut; correct in place).
- `reviewedBy` / `reviewerCredentials` present (ICAEW Qualified Senior Reviewer / ACA). Keep the anonymised reviewer block; do not add a named individual.
- `editorialNote`: "Full rewrite to include insurance claim payout treatment (income vs capital), aligned to **PIM2068** and current MTD framing." — **this editorial note itself names the wrong manual (PIM2068) and must be corrected to PIM2110.**

**Body:**
- Word count: **2,099** (diagnosis) → target **3,200**.
- H2 outline (9 H2s): Which premiums are deductible (with deductibility table) / How insurance claim payouts are taxed (with payout-treatment table) / Worked example 1 rent guarantee / Worked example 2 revenue repair reimbursement / Worked example 3 capital payout following a major fire / Section 24 and insurance: not restricted / Apportionment for mixed-use and multi-property policies / Filing mechanics: SA105 and MTD / Limited company landlords / Timing of the deduction / Common landlord mistakes / What this means in practice.
- Worked examples present: **3** (rent guarantee, revenue repair reimbursement, capital fire rebuild). All three are good and structurally sound — preserve and tighten, do not discard.
- Inline `<aside>` CTAs: **2** (after payout-treatment table; in the MTD section). Keep both; they sit at genuine conversion moments. Do not duplicate the auto-injected LeadForm.
- Outbound authority links: **2** in body (PIM2068 — WRONG; ITTOIA 2005 top-level; TCGA 1992 top-level). The PIM2068 link is live but points to a contents/index page, not the operative authority. Replace with PIM2110.
- Internal links: 2 (Section 24 pillar; BTL ltd-co pillar) plus 1 MTD deadline page. Under the cross-link floor; add forward-links per "Closest existing pages".
- `dateModified`: 2026-05-21 (update to write date).

---

## GSC angle (cluster intent) — from diagnosis payload

- **Current slug GSC:** ~9 impressions in window.
- **Historical slug variant** `landlord-insurance-tax-deductible-what-can-you-claim`: ~37 impressions. **Cumulative intent ≈ 46 impressions.** Bing: sibling = 0; this page is the only one with any signal.
- **Sibling** `landlord-insurance-guide-types-costs-tax-deductible`: **0 GSC, 0 Bing** — fully invisible. This is the equity differential that points the collapse weaker→stronger (sibling→this), per §16.T2 collapse-guard logic. Collapsing this into the sibling would bury the only page with any equity and would be auto-flipped to REWRITE by `track2_collapse_guard.py`. The diagnosis already reasoned this correctly.
- **Primary query (cluster):** "income tax on landlord insurance claims" / "is landlord insurance tax deductible uk" / "are insurance payouts taxable for a landlord".
- **Read:** classic INVISIBLE page — clean canonical intent, almost no impressions, near-zero clicks. The lever is not a meta tweak (already tried, per `metaTitle_prev`); it is (a) becoming demonstrably the most correct + deepest answer to the dual question so the page earns impressions on the long tail, and (b) absorbing the historical-variant + sibling equity via the redirect housekeeping. Realistic post-rewrite target is modest in absolute terms (this is a low-volume intent), so frame success as cluster consolidation + correctness, not a CTR multiple.

**GA4:** not separately pulled at brief time; expected near-zero sessions given the impression floor. Execution pulls `ga4_page_data` for the current slug to confirm.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS (wrong advice live in production — three distinct errors; this is the load-bearing fix).**

1. **WRONG HMRC MANUAL CITED (three places).** The page cites **PIM2068** as the authority for insurance-receipt treatment: the intro paragraph (body), the "Authority" column of the payout-treatment table (two rows), the FAQ "Are insurance payouts taxable for a landlord?", the FAQ "How are insurance receipts handled for limited company landlords?", and the `editorialNote` frontmatter. **PIM2068 is a contents/index page ("Deductions: main types of expense: contents"), not the operative authority.** The correct specific authority is **PIM2110 ("Insurance premiums and recoveries")**, which expressly distinguishes (a) recoveries that reimburse a revenue repair (offset against the deductible repair) from (b) loss-of-rent recoveries (taxable as receipts of the property business). **Every PIM2068 reference must be replaced with PIM2110**, including the frontmatter editorialNote and the live hyperlink (current href `.../property-income-manual/pim2068` → `.../property-income-manual/pim2110`). Verify both PIM2110 content and the live URL at write time per §16.31.

2. **WRONG CASH-BASIS RULE (the "Timing of the deduction" H2).** The page states cash basis is "the default for landlords with rental receipts below **£150,000** unless they elect out" and that accruals is "**mandatory above the £150,000 threshold**". This is **out of date from 2024/25 onwards**: the £150,000 cash-basis **entry** threshold (and the £300,000 **exit** threshold) were removed; **cash basis is now the DEFAULT for ALL unincorporated property businesses regardless of turnover**, with an **opt-out election to the accruals basis**. The rewrite must (a) delete the £150,000 figure entirely, (b) state cash basis as the universal default for unincorporated landlords, (c) describe accruals as available by election (opt-out), and (d) verify the operative ITTOIA 2005 election section at write time (the cash-basis-for-property-businesses regime sits in ITTOIA 2005 Part 3 Chapter 7A, ss.271A-271E; the election OUT of the cash basis is ss.271C/271D — confirm exact section + currency on legislation.gov.uk before citing a number; do not assert a section you have not verified). The worked timing logic (premium paid March 2026 deductible 2025/26 on cash basis; spread over policy period on accruals) is still correct and should be preserved once the threshold framing is removed.

3. **CITATION IMPRECISION on the wholly-and-exclusively test.** The page cites **s.34 ITTOIA 2005 directly** as the rule for the property rental business. Strictly, s.34 is the **trade** wholly-and-exclusively rule **applied to property businesses via s.272 ITTOIA 2005** (the import gateway; house_positions §34.1). Tighten every reference to "**s.34 ITTOIA 2005, as applied to property businesses by s.272**" (or the equivalent phrasing). This is the same architecture locked in house_positions §34 (statutory hooks: s.271 charge, s.272 import gateway, s.34 imported wholly-and-exclusively, s.94H imported simplified expenses).

**Secondary: INVISIBLE.** ~9 impressions on the live slug; the page is not surfacing for its own head term despite a clean canonical intent and an inbound internal link. Becoming the most correct + deepest dual-coverage answer is the route to earning long-tail impressions; the redirect housekeeping consolidates the historical-variant + sibling equity.

**Tertiary: CTR_FAIL + THIN_DEPTH + STRUCTURE.** Impressions, essentially no clicks; 2,099 words vs the 3,200 floor; no top-of-page answer-shaped summary table for the head question ("is it deductible / are payouts taxable"). The premium table is good but the *first thing a reader needs* (yes-premiums-deductible / it-depends-on-payouts) is not in answer-shape at the top.

**Load-bearing fix sequence (ordered by ROI):**

1. **Correct the three factual errors** (PIM2068→PIM2110 everywhere incl. frontmatter editorialNote + live href; cash-basis universal-default rewrite; s.34-via-s.272 tightening). This is non-negotiable and comes first; a brief that lifts depth on top of wrong advice is worse than no rewrite.
2. **Add a top-of-page answer-shaped summary** (2-line plain-English answer + a compact "what's taxable / what's not" treatment table) so the head question is satisfied in answer-shape immediately — snippet-bait for the head term.
3. **Deepen the payout-taxation material** (the moat no competitor covers): expand the income-vs-capital framework, add the contents/replacement-of-domestic-items interaction (s.311A ITTOIA 2005 — verify), expand the part-disposal / s.23 TCGA 1992 capital-sum-application mechanics, and add a fourth worked example (payout exceeding repair cost, or a contents-replacement payout) to take the page to ~3,200 words.
4. **Confirm / correct the April 2027 framing.** The current Section-24 section already asserts 22/42/47 from 6 April 2027. Per house_positions §7 [LOCKED 2026-05-30] this is now CORRECT and safe to assert as enacted law (FA 2026 Royal Assent 18 March 2026, ss.6-7; reducer rises to 22%, no new wedge). **No Bill-vs-enacted hedge is needed on this page** — but verify §7 lock + FA 2026 Royal Assent date at write time per the F-37 discipline, and do NOT write "England + NI only" (Wales is in scope for 2027/28; only Scotland is carved out).
5. **Add forward internal links** to the deduction/relief and CGT/MTD partners (see "Closest existing pages") to raise the cross-link count to the floor and pass equity to/from the cluster.
6. **Meta:** the metaTitle is already strong and at the 62-char limit; a third rewrite is low-ROI. Keep it, or trim 1-2 chars to land a planning hook. The real lift is correctness + depth, not meta.

**Anti-templating note:** unlike the CGT gold reference (CTR-fail where meta/snippet was the lever) and unlike birmingham (CTR-fail + pricing-leak removal), THIS page is dominated by *wrong-advice remediation*. The diagnosis spine is correctness-first. No pricing leak exists on THIS page (it is clean) — the pricing problem lives entirely on the collapse-target sibling.

---

## Competitor URLs (Stage 2 — liveness deferred to execution per §16.31)

From the diagnosis `competitor_targets`. Execution re-fetches each (httpx, proper User-Agent), confirms 200, date-stamps, and rejects/replaces any non-200.

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2110 | **Operative authority** (replaces PIM2068) | The express damage-recovery-vs-loss-of-rent distinction — quote/paraphrase its logic precisely | n/a (this is our source of truth, not a competitor) |
| https://www.axa.co.uk/landlord-insurance/landlord-allowable-expenses/ | Insurer content | Cover-type breadth for the deductibility table | Insurer page is premium-side only; it does NOT cover payout taxability — our moat |
| https://www.landlordstudio.com/uk-blog/allowable-expenses-for-landlords | Software/blog | Plain-English framing of allowable expenses | Generic allowable-expenses list; shallow on insurance specifically; no income-vs-capital payout treatment |
| https://arb.accountants/allowable-expenses-for-landlords/ | Accountant blog | Accountant-voice framing | Same gap: premium-side only, no payout taxation, no PIM2110 distinction |

**Competitor depth ceiling for this query class:** premium-deductibility lists, no payout-taxation treatment, no income-vs-capital framework, generally no specific PIM citation. Our ~3,200-word dual-coverage page with PIM2110, the s.22/s.23 TCGA capital-sum mechanics, s.311A contents interaction, 4 worked examples, and 13 FAQs is **decisively best-in-class, not catch-up**. The differentiator is the entire payout-taxation half of the page.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (read at brief time; refresh at execution if MW/Wave work has shipped since).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | landlord-insurance-tax-deductible | self | **REWRITE in place** |
| **DIRECT PAIR** | landlord-insurance-guide-types-costs-tax-deductible | Both rank for "is landlord insurance tax deductible" head term | **FLAG-MANAGER for later weaker→stronger 301 collapse INTO this page.** Sibling = 0 GSC / 0 Bing (fully invisible), ~1,309 words, pricing-saturated buyer's guide, no inbound internal link found. This page = the tax canonical with the only inbound link + the cumulative ~46 impressions. Collapse direction is unambiguous (sibling→this). Before the 301, lift the sibling's few unique buyer's-guide snippets (HMO higher liability limits £5-10m, commercial/serviced-accommodation cover types) into a short "cover types in brief" sub-section here so nothing unique is lost. **Not actioned in this brief** — recommend manager-flag only. |
| Excluded / pillar | section-24-tax-relief-complete-guide | Section 24 finance-cost restriction | No collision (forward-link partner). This page's "insurance is NOT a finance cost / not S24-restricted" point references the pillar. |
| Excluded / pillar | landlord-tax-deductions-uk-2026-complete-list | Allowable-deductions master list | No collision (forward-link partner + the inbound link source). The list page links here for the insurance line item (line 137); this page back-links to the master list. |
| Existing | replacement-domestic-items-relief-uk-landlords-guide | s.311A contents relief | No collision (forward-link partner). The contents-payout interaction here references that page for the relief mechanics rather than re-walking them. |
| Existing | cgt-selling-buy-to-let-property-calculation-guide | CGT computation on disposal | No collision (forward-link partner). The capital-payout / base-cost-adjustment material forward-links here for the eventual-disposal computation. |
| Existing | buy-to-let-limited-company-complete-guide-uk | Incorporation / company structures | No collision (forward-link partner). The "Limited company landlords" section references the incorporation pillar. |
| Existing | making-tax-digital-landlords-april-2026-deadline | MTD ITSA mechanics | No collision (forward-link partner). The MTD filing section references the deadline page. |

**Conclusion:** REWRITE this page in place. **FLAG-MANAGER** for the later 301 collapse of the invisible sibling INTO this page (weaker→stronger; lift unique snippets first). No collision with the Section 24 pillar or the deductions master list (both forward-link partners). The collapse is a separate, manager-gated action — not part of this rewrite.

---

## Closest existing pages (Stage 2 — internal-link partners, all category paths verified in corpus)

To and from this page (use the slugified category-path link format already used in the corpus):

- **Deductions master list (inbound source + reciprocal):** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — back-link the source that already links here (line 137); add a reciprocal forward-link from the premium-deductibility section.
- **Section 24 pillar:** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` — already linked; keep. The "insurance is not a finance cost, not S24-restricted" point forward-links here.
- **Replacement of domestic items relief:** `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide` — NEW forward-link from the contents-payout interaction (s.311A).
- **CGT calculation walkthrough:** `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide` — NEW forward-link from the capital-payout / base-cost-adjustment material (eventual disposal computation).
- **Incorporation pillar:** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — already linked from "Limited company landlords"; keep.
- **MTD deadline page:** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — already linked from the filing section; keep (confirm the live category-path segment resolves; the file slug is `making-tax-digital-landlords-april-2026-deadline`, category "Making Tax Digital (MTD)").

(Execution confirms each href resolves at build; the six-check internal-link gate catches any broken path.)

---

## House-position references (Stage 1)

- **§34 Landlord allowable expenses architecture** [LOCKED 2026-05-27]: the import-gateway spine. s.272 ITTOIA 2005 imports the trading deduction rules into the property business; s.34 (wholly-and-exclusively) and s.94H (simplified expenses) are *imported* via s.272. This is the basis for the citation-precision fix (s.34 **as applied by s.272**). §34.1 statutory architecture is the controlling reference.
- **§4 Section 24 finance-cost restriction** [LOCKED]: 20% basic-rate credit for 2026/27; insurance is NOT a finance cost and is unrestricted. The page's S24 section must match.
- **§7 April 2027 property income tax** [LOCKED 2026-05-30]: 22/42/47 from 6 April 2027, reducer rises to 22% (no new wedge), England + Wales + NI in scope, only Scotland carved out, FA 2026 ss.6-7 (Royal Assent 18 March 2026). **Assert as enacted law** — no Bill-vs-enacted hedge. Verify §7 + Royal Assent at write per F-37 discipline; do NOT write "England + NI only".
- **§5 CGT on UK residential property 2026/27** [LOCKED]: 18%/24%, £3,000 AEA; underpins the capital-payout / base-cost / part-disposal material. s.222-226 PRR, s.58 spouse no-gain-no-loss for context only.
- **§6 FHL abolition** [LOCKED]: FHL abolished from 6 April 2025 — do NOT frame any insurance/cover advice as FHL-specific or imply FHL capital allowances/BADR survive. (The page does not currently err here; keep it that way.)

---

## House-position conflict flag (Stage 2)

**No house-position contradiction**, BUT three statute/authority-precision corrections (all caught by the diagnosis, none of which conflict with a LOCKED house position; two are corrections the live page makes against current law, one is a citation tightening that §34 already prescribes):

1. **PIM2068 → PIM2110** (wrong authority cited; corpus-correctness, not a house-position conflict). Replace all five occurrences + the live href + the frontmatter editorialNote.
2. **Cash-basis £150,000 threshold (abolished from 2024/25)** — wrong rule live. Rewrite to universal-default-for-unincorporated + opt-out election; verify the ITTOIA 2005 election section (ss.271A-271E regime; election out ss.271C/271D) on legislation.gov.uk before citing any number.
3. **s.34 ITTOIA 2005 → s.34 as applied by s.272 ITTOIA 2005** — citation precision, exactly as house_positions §34.1 prescribes.

**Flag to `track2_site_wide_flags.md`** (next available F-number at execution):
- `<F-n> | 2026-05-30 | HIGH | landlord-insurance-tax-deductible | STALE_FACTS | PIM2068 cited as insurance-receipt authority in 5 places (body intro + payout table 2 rows + 2 FAQs + frontmatter editorialNote) — PIM2068 is a contents/index page; correct authority is PIM2110 (Insurance premiums and recoveries). Replace all + the live href. Audit candidate: scan corpus for other PIM2068 insurance-receipt citations (possible cluster).`
- `<F-n+1> | 2026-05-30 | HIGH | landlord-insurance-tax-deductible | STALE_FACTS | Cash-basis £150,000 entry threshold asserted in "Timing of the deduction" — abolished from 2024/25; cash basis now universal default for unincorporated property businesses, accruals by opt-out election. Corpus audit candidate: any page citing the £150,000 / £300,000 cash-basis thresholds for property businesses is stale (mechanical-ish sweep, but verify per-page because the figure also appears for other regimes).`
- `<F-n+2> | 2026-05-30 | LOW | landlord-insurance-tax-deductible | CITATION-PRECISION | s.34 ITTOIA 2005 cited directly for property business; tighten to "s.34 as applied by s.272" per house_positions §34.1.`

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31)

Execution selects ~5-6 to actually cite as legislation.gov.uk / gov.uk hyperlinks; verify 200 status AND operative-wording currency (the F-8 lesson: a live URL can have its operative text removed by amendment).

| URL | Verification at write | Use case |
|---|---|---|
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2110 | Confirm title "Insurance premiums and recoveries" + the damage-recovery-vs-loss-of-rent distinction | **The operative authority** (replaces PIM2068 everywhere) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/34 | Confirm in force; cite as "s.34 ITTOIA 2005" | Wholly-and-exclusively (imported) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | Confirm in force | The import gateway (s.272 — trading rules into property business) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/22 | Confirm in force | Capital sum derived from an asset (capital payouts) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/23 | Confirm in force | Receipts applied in restoring an asset (capital-payout application / no-immediate-charge route) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | Confirm in force + exact section | Replacement of domestic items relief (contents payouts) |
| ITTOIA 2005 cash-basis election section (ss.271A-271E; election out ss.271C/271D) | **VERIFY exact section + post-FA-2024 currency before citing a number** | The cash-basis-default + opt-out correction |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4101 (cash basis) | Verify path + content (do NOT guess the manual number — historical PIM4101 hallucination caught in trial; confirm before citing) | Cash-basis-for-property HMRC guidance cross-reference |
| https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-and-dividend-income (or current gov.uk measure page) | Verify at execution | April 2027 22/42/47 source if a citation is wanted in the S24 section |

**Do NOT cite PIM2068 as the receipt authority** (the whole point of correction #1). Do NOT cite a cash-basis election section number you have not verified on legislation.gov.uk at write time.

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM §4 section 13: voice rules (NETNEW_PROGRAM §4 + competitor_rewrite_playbook §5), lead-gen architecture, CSS-in-markdown, FAQs-and-schema, anti-templating, quality bar, statute-citation discipline (F-8 live-URL-but-removed-wording), and all §16 lessons (esp. §16.18 reasoning-first, §16.31 URL liveness, §16.27/§16.35/F-37 Bill-vs-enacted + rate-by-reference + verify-at-write).

**Critical for THIS brief:**
- **NO em-dashes** anywhere in user-facing copy (commas, parentheses, full stops, middle dots). The current page is already clean here; keep it clean.
- **NO pricing / fees** in body or FAQs. THIS page is currently clean (no fee quotes) — keep it clean; do NOT import the sibling's pricing (£150-£400 buildings, 2-6% rent guarantee, etc.) when lifting the sibling's cover-type snippets. Lift cover *types* only, strip every number.
- **NO real client names.** Anonymised illustrative landlords only in worked examples (the existing examples are already anonymous and figure-led — keep that style).
- **LeadForm auto-injected** by `BlogPostRenderer.tsx`; never duplicate. The 2 inline `<aside>` CTAs stay (genuine conversion moments); do not add a third without a conversion reason.
- **Correctness-first:** the three STALE_FACTS corrections take priority over the depth lift. Do not ship depth on top of wrong advice.

---

## 19-step workflow — inherited from parent program with Track 2 deltas (do not restate)

Per TRACK2_PROGRAM §4 section 14: inherits the full 19-step workflow from NETNEW_PROGRAM §7 / Wave-N, with Track 2 deltas (Step 9 rewrite-in-place at existing path; Step 12 confirm-no-redirect-or-propose-one; Step 13 update-or-insert monitored_pages row).

**THIS-brief-specific deltas / emphasis:**
- **Pre-rewrite verification step (load-bearing, do FIRST):** verify (a) PIM2110 is the correct manual + live URL; (b) the post-FA-2024 cash-basis universal-default rule + the operative ITTOIA election section; (c) §7 April 2027 lock + FA 2026 Royal Assent date. Do not draft body until all three are verified.
- **Step 9:** rewrite at the existing path; preserve frontmatter slug + canonical + category + the anonymised `reviewedBy` block; **correct the `editorialNote` (PIM2068→PIM2110)**; update `dateModified` to write date. Keep `metaTitle` (already at limit + strong) unless a 1-2 char planning trim is found.
- **Step 11 six-checks, plus this brief's extras:** FAQ schema count = frontmatter `faqs:` length (currently 13 — keep, do not cut); em-dash count = 0; Tailwind class count = 0; metaTitle <= 62; metaDescription <= 158; all internal links resolve; **PIM2068 count in file = 0** (grep `pim2068` and `PIM2068`, both must be 0); **£150,000 cash-basis-threshold count = 0**; **no fee/£ pricing line introduced** (the page should still contain £ figures in worked examples — those are illustrative tax computations, not fee quotes; the gate is "no *fee/cost-of-service* pricing", consistent with birmingham Step 11).
- **Step 12:** confirm no redirect of THIS slug; **propose (manager-gated) the sibling→this 301** in the work-log + flags, not actioned here. Confirm whether the historical variant `landlord-insurance-tax-deductible-what-can-you-claim` already 301s here; if not, recommend adding it.
- **Step 13:** check `monitored_pages` for an existing row (this page was in the 2026-05-21 rewrite cohort per `date: 2026-05-21`); if present, update `rewrite_date` + extend window; if absent, insert (consider the F-11 longer window for an INVISIBLE-baseline page).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-rewrite verification
- PIM2110 confirmed correct manual + live URL: __
- Cash-basis universal-default rule + operative ITTOIA election section verified on legislation.gov.uk: __
- §7 April 2027 lock + FA 2026 Royal Assent (18 March 2026) re-verified: __

### House-position alignment
- §34 (s.272 import gateway; s.34 as applied by s.272): __
- §4 Section 24 (insurance not a finance cost): __
- §7 April 2027 (22/42/47 asserted as enacted; not "England + NI only"): __
- §5 CGT (capital-payout base-cost / part-disposal): __
- §6 FHL (no FHL-specific insurance framing): __

### Factual corrections (load-bearing)
- PIM2068 → PIM2110: __ occurrences replaced (target: all of them; grep count 0)
- Cash-basis £150,000 threshold removed; universal-default + opt-out election written: __
- s.34 → "s.34 as applied by s.272": __

### Comparison: before vs after
- Word count: 2,099 → __ (target 3,200)
- H2 count: ~12 → __
- FAQ count: 13 → __ (keep 12-14; correct in place)
- Authority links: 2 (1 wrong) → __ (target 5-6, all verified)
- Top-of-page answer-shaped summary table: 0 → 1
- Worked examples: 3 → __ (target 4)
- Internal links: 3 → __ (target 6-7)

### Flags raised
- F-n PIM2068→PIM2110 (HIGH): __
- F-n+1 cash-basis £150,000 abolished (HIGH): __
- F-n+2 s.34/s.272 precision (LOW): __
- Sibling 301-collapse manager-flag recorded: __
- Historical-variant redirect confirmed/recommended: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
