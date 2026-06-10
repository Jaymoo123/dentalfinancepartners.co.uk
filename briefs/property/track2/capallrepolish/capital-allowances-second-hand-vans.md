# Track 2 brief (REPOLISH): capital-allowances-second-hand-vans

**Site:** property
**Brief type:** Legacy rewrite — REPOLISH pass (the page is already a recent, FA-2026-correct rewrite; this is a Google-visibility + CTR + snippet-structure lift, NOT a fact correction)
**Source markdown path:** `Property/web/content/blog/capital-allowances-second-hand-vans.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/capital-allowances-second-hand-vans
**Stage 1 priority:** H — this page is the STRONGEST node in the second-hand-van / AIA neighbourhood on Bing (18 impr / 2 clk / pos 3.8) and the only page in the cluster converting clicks; a repolish compounds an already-ranking asset rather than starting cold. Collapse-direction rule forbids folding it away.
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (diagnosis carried; current source markdown + frontmatter read in full; 9 sibling canonical paths verified on disk; six statute citations re-confirmed against the prior 2026-05-30 live-verification per §38; reviewer-credential convention verified from the live corpus frontmatter + `schema.ts` emit logic)
**Cannibalisation status:** REWRITE with sharp differentiation (collapse would be wrong-direction — equity check below)

> **Gold-reference depth target:** match `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` for data-completeness and the 15-section structure, and `briefs/property/track2/trial/birmingham-property-accountant.md` for the meta-led CTR-fix template. **This is a different pass from the 2026-05-30 fact-correction rewrite already on disk.** The diagnosis re-verified the page as clean: no stale facts, no pricing leak, zero em-dashes, all six statute cites in force. The job here is to (1) widen the body from ~2,702 to ~3,500 words by OWNING the sibling-distinct long-tail queries the page does not yet answer in answer-shaped form, (2) sharpen the snippet/CTR surface for Google, and (3) lock the hub-and-spoke so the three van/used-asset pages stop competing. Do NOT regress any of the already-correct law.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowances-second-hand-vans`. It is the exact-match anchor for the used-van query universe the page already wins on Bing ("capital allowances on second hand van", "writing down allowance on second hand van", "can i claim 100% capital allowances on second hand van"). No redirect either way (see cannibalisation + equity check). Category `Landlord Tax Essentials` kept; canonical kept.
- **Gap-mode tag (from diagnosis):** `INVISIBLE` (primary — Google near-invisible at pos 9/50 despite Bing page-1) + `CTR_FAIL` (secondary — Bing pos 3.8 converting only 2 clicks on 18 impressions; metaTitle/snippet surface can be sharpened) + `STRUCTURE` (tertiary — the body does not yet serve the sibling-distinct long-tail in answer-shaped, snippet-grab form).
- **"Why this repolish" angle:** the page is trustworthy and current (dateModified 2026-05-30, FA-2026-correct, six verified cites, reviewer block in place). What it lacks is REACH on Google and a wider on-page answer surface for the queries the two siblings do not own. The 2026-05-30 rewrite fixed the law and reframed the spine; this pass extends the body to gold-reference length by deepening the four sibling-distinct pillars (used-van WDA fallback, connected-party purchase via own company/relative, cash-basis van trap, balancing charge on sale, used-van-vs-used-car), adds a second snippet-bait reference table, and tightens the metaTitle/description/H1 for click-through. **No fact changes** beyond optional clarity polish. This is the gold-reference depth target applied to a page that is already best-in-class on freshness, so the differentiator is reach + structure, not correction.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter 2026-06-02)

**Filesystem source read (`capital-allowances-second-hand-vans.md`):**
- **Word count:** **2,691 body words** (frontmatter-stripped, tag-stripped count; diagnosis logged 2,702 — same page). Target ~3,500.
- **H2 outline (8 H2 + intro + table + Sources):**
  1. (intro, 2 paras — reframing spine already in first 120 words: "the word that changes everything is 'second hand'")
  2. Why "second hand" changes the answer (carries the 4-route comparison TABLE)
  3. The Annual Investment Allowance on a used van: 100% in year one (Worked example 1)
  4. If you do not use the AIA: the 14% writing-down route (Worked examples 2 + 3 straddling hybrid)
  5. The cash basis trap: when you cannot claim capital allowances at all
  6. Buying a used van from a relative or your own company (Worked example 4)
  7. Selling or scrapping the van later: balancing charges (Worked example 5)
  8. Vans versus cars for a used vehicle
  9. Sole trader, partnership or limited company: which route for a used van (inline `<aside>` CTA #1)
  10. Apportioning for private use and record-keeping
  11. Common mistakes landlords make
  12. How a property accountant helps, and final thoughts (inline `<aside>` CTA #2)
  13. Sources (numbered `<ol>`, 6 citations)
- **metaTitle:** "Capital Allowances on a Used Van: AIA, Not Full Expensing" (56 chars — already strong, leads with the load-bearing distinction; candidate to A/B against a "second hand" word-order variant for the exact-match Bing query).
- **metaDescription:** "A used van is excluded from full expensing and the new 40% first-year allowance, but you can still claim 100% through the AIA. FA 2026 rules, worked examples." (155 chars — good; minor sharpen possible to front-load "second hand van" for the exact query).
- **h1:** "Can Landlords Claim Capital Allowances on Second Hand Vans?" (question form — mirrors the Bing query "can i claim 100% capital allowances on second hand van"; keep).
- **FAQ count (frontmatter `faqs:`):** **14** (already at the top of the 12-14 band; Bing terms already verbatim as #1-#4). No new FAQs strictly required; one or two of the adjacent target queries can be folded in to widen coverage if word budget allows without exceeding the band.
- **Outbound authority links:** **6** numbered citations (`legislation.gov.uk` x5 + `gov.uk` x1), rendered as `<sup><a>` matching the corpus Sources `<ol>` pattern. `sourceDomains: [legislation.gov.uk, gov.uk]`.
- **Internal links:** 6 in body (capital-allowances-on-vans sibling; annual-investment-allowance-uk; annual-investment-allowance-landlords-uk; writing-down-allowance-rates; writing-down-allowance-cars; buy-to-let-limited-company-complete-guide-uk; capital-allowances-on-property). **MISSING the link UP to `can-you-claim-aia-on-second-hand-assets`** (the broad used-plant boundary page) — the diagnosis hub-and-spoke plan requires this link; add it.
- **Reviewer block:** present per corpus convention.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter; Article/BlogPosting auto via `buildBlogPostingJsonLd`).
- **Last meaningful edit:** `dateModified: 2026-05-30`; `sourcesVerifiedAt: 2026-05-30`.

**Already correct — do NOT regress:** WDA 14% (FA 2026 s.28) stated correctly in three places + the straddling hybrid worked; full expensing framed as companies-only + new-and-unused (s.45S); 40% FYA framed as new-and-unused, excludes cars (FA 2026 s.29 inserting s.45U, from 1 Jan 2026); AIA £1m permanent (s.51A); connected-party = s.217 buyer-side AIA/FYA denial → 14% pool (NOT "market value on purchase"); cash-basis bar (s.1A, car-only carve-out at s.1A(4)); balancing charge on disposal (s.55/s.61); s.35 non-application to a van used to visit/maintain properties stated explicitly. The 2026-05-30 rewrite already executed the entire fact-correction hit-list from the earlier `capallowances/` brief.

---

## GSC / Bing angle (last 90 days) — data from the diagnosis snapshot

**Bing (the page's strength — the equity lives here):**
- THIS page leads the cluster: **18 impr / 2 clk / pos 3.8** across the used-van query universe.
  - "capital allowances on second hand vans" — pos 2 (4 impr)
  - "writing down allowance on second hand van" — pos 2
  - "can i claim 100% capital allowances on second hand van" — pos 2
  - "can you claim reduced capital allowance on van" — pos 2
  - "caital allowance on used van purchase hhmrc" (sic) — pos 5
  - "capital allowances on second hand van" — pos 4
  - "capital allowances on vans" / "van capital allowances" — pos 4
  - "aia on van" — pos 6
- Sibling `capital-allowances-on-vans`: 10 impr / 0 clk / pos 3.4 (new-van + full-expensing intent; no second-hand-specific terms).
- Sibling `can-you-claim-aia-on-second-hand-assets`: 10 impr / 1 clk / pos 2.9 (broad used-plant intent).

**Google (the gap — INVISIBLE):**
- THIS page: "capital allowances on second hand vans" — 2 impr, pos 9; "capital allowances on vans" — 1 impr, pos 50. Effectively unranked.
- The Bing page-1 cluster proves the content is fundamentally relevant; the Google invisibility is a depth-of-coverage + answer-surface + trust-signal gap, not a relevance gap (and the law is already current and cited).

**Read:** the page has demonstrated the intent and converts on Bing. The repolish job is (1) widen the answer surface to the sibling-distinct long-tail in snippet-grab form so Google has more matchable, answer-shaped content; (2) sharpen the metaTitle/description for click-through on both engines; (3) lock the hub-and-spoke so the cluster reads as three distinct answers, not three overlapping ones. **Realistic post-repolish target: defend/extend the Bing page-1 cluster, and move Google from pos 9/50 toward page 1-2 on the narrow used-van terms over the 90-180 day monitored window (INVISIBLE baseline → 180-day window per F-11).**

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary — INVISIBLE (Google).** Page-1 on Bing, near-invisible on Google (pos 9/50). The relevance is proven; the missing ingredient is a wider, answer-shaped body that gives Google more long-tail surface to match plus the snippet structure to capture it. The two siblings are even weaker on Google, so there is no internal competitor to beat — the ceiling is external.

**Secondary — CTR_FAIL (Bing).** Pos 3.8 converting only 2 of 18 impressions. The metaTitle already leads with the load-bearing "AIA, Not Full Expensing" distinction (good), but the exact-match Bing queries use the words "second hand van" / "used van" and "100%". The snippet surface can be tightened: front-load "second hand van" and the "100%" hook, and ensure the first 150 words are snippet-clean for the "can I claim 100%" question.

**Tertiary — STRUCTURE.** The page is solid (one comparison table, 5 worked examples, 14 FAQs, 6 cites) but the body does not yet serve several sibling-distinct adjacent queries in dedicated, scannable, answer-shaped blocks: "second hand van full expensing eligibility", "balancing charge selling van capital allowances", "connected person buying van from own company aia", "cash basis capital allowances van". These are exactly the queries the diagnosis says THIS page should OWN versus the siblings. Deepen each into a snippet-grab sub-block (short lead sentence + a reference table or tight list) and add one decision/reference table.

**NOT in scope (diagnosis-confirmed clean):** no stale facts, no statute risk, no pricing leak, no em-dashes. Do not "fix" what is already correct. The earlier `capallowances/` brief's STALE_FACTS hit-list is fully executed on the live page.

**Load-bearing fix sequence (ordered by ROI):**

1. **metaTitle / metaDescription / H1 micro-sharpen** (highest ROI, smallest change) — front-load "second hand van" + the "100%" hook for the exact-match queries on both engines, while keeping the "not full expensing" differentiator. See Meta plan.
2. **Add the link UP to `can-you-claim-aia-on-second-hand-assets`** (the broad used-plant boundary page) and confirm the reciprocal link DOWN to THIS page from the sibling — completes the hub-and-spoke the diagnosis requires.
3. **Add a second snippet-bait reference table** — the "used van vs used car" four-row comparison (currently prose) and/or a "which route by accounting basis + structure" decision table. Tables are snippet-grab assets Google lifts directly.
4. **Body lift ~2,700 → ~3,500 words** by deepening the four sibling-distinct pillars into answer-shaped sub-blocks (connected-party via own company/relative; cash-basis van trap; balancing charge on sale; used-van-vs-used-car), each opening with a one-sentence direct answer to the verbatim adjacent query.
5. **Tighten the first-150-words snippet surface** so the "can I claim 100% capital allowances on a second hand van?" answer is clean and liftable.
6. **Keep all six citations; re-verify operative wording at write time** (F-8 — a live 200 is not proof the wording survived amendment).

---

## Competitor URLs (Stage 2 — re-verify live at execution per §16.31)

Carried from the diagnosis `competitor_targets`. All are AIA-on-used-van pieces; the diagnosis confirms every one is STALE on the WDA rate (still cites 18%) and omits the cash-basis trap, connected-party mechanics, and the balancing charge — so the freshness/depth edge already sits with us. The repolish job is reach + structure, not catch-up.

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://cruseburke.co.uk/second-hand-van-qualify-aia/ | Plain-English "yes, AIA applies to a used van" eligibility framing | STALE 18% WDA; no cash-basis bar; no connected-party depth; no balancing charge |
| https://accotax.co.uk/second-hand-van-qualifies-for-aia/ | Reassurance tone for the "can I really get 100%?" reader | No FA 2026 currency; no full-expensing/40%-FYA exclusion; no straddling hybrid |
| https://accofirm.co.uk/does-a-second-hand-van-qualify-for-aia/ | The new-vs-used distinction headline | STALE 18% WDA; no company-vs-unincorporated split; no disposal mechanics |
| https://www.pie.tax/tax-pible/capital-allowances-on-vans-tax-a-simple-guide | Broad "vans" overview structure (for the new-van sibling, not this page) | STALE 18% WDA; treats vans generically; no second-hand pivot; no connected-party / cash-basis / balancing-charge detail |

**Competitor depth ceiling for the used-van query class:** ~800-1,400 words, 0 verified statute citations, AIA-only coverage, STALE 18% WDA, no FA 2026 40% FYA exclusion, no straddling hybrid, no connected-party correction, no cash-basis bar, no balancing charge. Our ~3,500-word target with 14 FAQs + 6 verified citations + 5 worked examples + 2 reference tables, all current on FA 2026, is decisively best-in-class — the edge is reach + structure, not fact correction.

**Execution note:** WebFetch every URL fresh, reject non-200, replace any dead one with a sibling from `briefs/property/_sitemap_cache_v2/`. Per F-36, manager re-checks a 5% sample at quality-gate close.

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index snapshot:** Track 2 capall cluster, current. Three pages sit in the second-hand-van / AIA neighbourhood, each owning a distinct primary intent. THIS page is the strongest node on Bing, so it cannot be collapsed (collapse-direction rule).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | capital-allowances-second-hand-vans | REWRITE (repolish) | self — OWNS the exact "capital allowances on a second-hand / used van" intent; the only page page-1 Bing for "capital allowances on second hand van(s)" (pos 2-4); cited verbatim by the other two as "our second-hand vans guide" |
| Sibling (NEW-van companion) | capital-allowances-on-vans (`landlord-tax-essentials/`) | DISTINCT-KEEP | Owns full expensing (s.45S) + 40% FYA (s.45U) + double-cab-pickup trap for a BRAND-NEW van; already reciprocally cross-linked from THIS page's intro. Link UP for the new-van decision. |
| Sibling (broad used-PLANT boundary) | can-you-claim-aia-on-second-hand-assets (`property-accountant-services/`) | DISTINCT-KEEP | Owns previously-owned / gifts / General Exclusions 4-5 / dwelling-house s.35 / common-parts for used plant generally; explicitly defers van detail to THIS page. **ADD the missing link UP** for the general used-plant boundary. |
| Cluster (AIA depth) | annual-investment-allowance-uk, annual-investment-allowance-landlords-uk | AIA pillars | No collision — forward-link for the £1m-cap / group-sharing depth (already linked). |
| Cluster (WDA depth) | writing-down-allowance-rates, writing-down-allowance-cars | WDA pillars | No collision — forward-link for the rate/straddling depth and the cars contrast (already linked). |
| Cluster (pillar) | capital-allowances-on-property | Pillar (light equity) | Light forward-link only (already present). |

**EQUITY DIRECTION CHECK (collapse would be wrong, per the collapse-direction rule):** on Bing THIS page LEADS (18 impr / 2 clk / pos 3.8) vs `capital-allowances-on-vans` (10 / 0 / 3.4) and `can-you-claim-aia-on-second-hand-assets` (10 / 1 / 2.9); on Google all three are near-invisible single-digit impressions. A 301 collapse points the weaker page into the stronger; pointing THIS page into either sibling would reverse equity and `scripts/track2_collapse_guard.py` would auto-flip the verdict back to REWRITE. **Decision: REWRITE all three standalone; NO 301 either way.**

**Differentiation plan for the repolish (hub-and-spoke, not three overlapping answers):**
- Keep the laser-tight "used van, AIA-not-full-expensing" framing in title / H1 / lede.
- OWN the queries the siblings do NOT: used-van WDA fallback, connected-party van purchase via own company/relative, cash-basis van trap, balancing charge on selling the van, used-van-vs-used-car. Deepen each into an answer-shaped sub-block.
- Link UP to `capital-allowances-on-vans` for the NEW-van / full-expensing decision (present — keep).
- Link UP to `can-you-claim-aia-on-second-hand-assets` for the general used-plant boundary (**ADD** — currently missing).
- Recommend (do not edit here) the two siblings each carry a one-line pointer DOWN to THIS page for used-van detail; flag for the cluster sweep.

**Conclusion:** REWRITE (repolish) in place. No REDIRECT-PROPOSED. No FLAG-MANAGER (no pricing leak, no stale facts).

---

## Closest existing pages — internal-link targets within the live corpus (Stage 2, canonical paths verified on disk 2026-06-02)

- **Sibling (new-van companion):** `capital-allowances-on-vans` → `/blog/landlord-tax-essentials/capital-allowances-on-vans` — bidirectional; link UP from intro for the new-van / full-expensing / 40% FYA route (present — keep). Recommend reciprocal pointer DOWN (flag for sweep).
- **Sibling (broad used-plant boundary):** `can-you-claim-aia-on-second-hand-assets` → `/blog/property-accountant-services/can-you-claim-aia-on-second-hand-assets` — **ADD link UP** from the AIA section or the "previously used in another business" content, for the general used-plant / gifts / General-Exclusions boundary. (This is the one diagnosis-required link currently missing.)
- **AIA pillars:** `annual-investment-allowance-uk` → `/blog/section-24-and-tax-relief/annual-investment-allowance-uk`; `annual-investment-allowance-landlords-uk` → `/blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk` — forward-link from the AIA section for £1m-cap / group-sharing depth (present — keep).
- **WDA pillars:** `writing-down-allowance-rates` → `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` (rate + straddling depth); `writing-down-allowance-cars` → `/blog/section-24-and-tax-relief/writing-down-allowance-cars` (cars contrast) — forward-link from the WDA section and the vans-vs-cars section (present — keep).
- **Capital allowances pillar:** `capital-allowances-on-property` → `/blog/property-types-and-specialist-tax/capital-allowances-on-property` — light forward-link only (present — keep; do not over-weight).
- **Incorporation:** `buy-to-let-limited-company-complete-guide-uk` → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — forward-link from the structure section (present — keep).
- **Landlord deductions list:** `landlord-tax-deductions-uk-2026-complete-list` — optional forward-link from the record-keeping or common-mistakes section to widen internal coverage (not currently linked; add only if it reads naturally).
- **/services + /incorporation + /contact** — CTA anchors; LeadForm auto-injected by `BlogPostRenderer.tsx`, do not duplicate.

(Survey actual link presence + add reciprocal links at execution; flag, do not edit, sibling pages.)

---

## House-position references (Stage 1)

All from `house_positions.md`. §38 is the FA 2026 capital-allowances reform floor and is the spine; the page already complies — these references are for verify-don't-regress, not re-fix.

- **§38 Capital allowances (CAA 2001) — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified]: 14% main-pool WDA (s.28, from 1 Apr 2026 CT / 6 Apr 2026 IT, straddling hybrid s.28(2)-(6)); special-rate pool 6% unchanged; new 40% FYA (s.29 inserting CAA s.45U, new-and-unused, excludes cars + second-hand + overseas-leasing, from 1 Jan 2026); AIA £1m permanent (s.51A(5), F(No.2)A 2023 s.8); full expensing 100% companies-only (s.45S, new-and-unused); s.35 dwelling-house bar nuance. **FA 2026 (c.11) ENACTED, Royal Assent 18 March 2026 — state s.28/s.29 as current law, never "Bill"/"proposed".** Do-not-write list applies verbatim (no pricing; no real client names; never "WDA 18%"; never "cars qualify for AIA / the 40% FYA"; never "full expensing for individual landlords").
- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23]: £1m permanent; AIA covers new OR second-hand plant (the route that rescues a used van); cars excluded (General Exclusion 2); single AIA for related companies (s.51E/s.51G).
- **§25.5 First-Year Allowances (CAA 2001 ss.39-51)** [LOCKED 2026-05-23]: s.45S full expensing company-only AND new-and-unused (used vans excluded); FYA gateway s.39; EV-only car FYA (s.45D, 0 g/km new unused) for the cars contrast.
- **§25.6 Disposal mechanics (CAA 2001 ss.55-67 + s.61)** [LOCKED 2026-05-23]: s.61 disposal-value rule (item 2 = market value on connected-party sale); balancing charge where TDR exceeds AQE (s.55(3)); main pool 14%.
- **§13 / §38 "Do not write" lists** [LOCKED]: no pricing; no real client names; do NOT write "full expensing is available to individual landlords" (companies only); do NOT write "WDA is 18%" (14% from April 2026); do NOT write "cars qualify for AIA or the 40% FYA"; do NOT imply furnishings inside a let dwelling are claimable (s.35) — but DO say a van used to visit/maintain properties is NOT barred by s.35 (the page already does this; keep).
- **Connected-persons definition — CTA 2010 s.1122** [referenced in §1 / §10 / §17 contexts]: used as the cross-reference for "connected person" in the buying-from-a-relative section (spouse, civil partner, lineal ascendants/descendants, siblings, controlled-company chains). Cross-reference only; do not restate the full definition.

---

## House-position conflict flag (Stage 2)

**NONE.** The diagnosis re-verified the page clean: no stale facts, no statute risk, no pricing leak (the only £ figures are worked-example asset costs, e.g. the £14,000 van — legitimate illustrations, not fee disclosure), zero em-dashes. The earlier `capallowances/` STALE_FACTS hit-list (Section 24 conflation, connected-party mis-statement, missing full-expensing/40%-FYA exclusion, missing cash-basis bar) is fully executed on the live page.

**One LOW-severity cross-page consistency note (NOT a risk on this page, do NOT edit the sibling here):** the sibling `capital-allowances-on-vans` FAQ frames connected-party purchase as "treated as taking place at market value", whereas THIS page (correctly) frames it as ss.214/217 denial of AIA/FYA forcing the 14% pool route. **Keep THIS page's ss.214/217 framing as canonical.** Flag the sibling for a future alignment sweep — do not touch it in this brief's execution.

**Flag to `track2_site_wide_flags.md`** (low severity, informational): `LOW | capital-allowances-on-vans | CROSS_PAGE_CONSISTENCY | sibling FAQ frames connected-party as "market value on purchase"; canonical framing is ss.214/217 AIA/FYA denial → 14% pool (held by capital-allowances-second-hand-vans). Align sibling in a future sweep.`

---

## metaTitle / metaDescription / h1 plan (Stage 2)

(See the Meta plan section below for the canonical, character-counted version. Summary of the repolish logic: the current meta is already strong; sharpen for the exact-match Bing/Google queries that use "second hand van" + "100%" while keeping the "not full expensing" differentiator. The current metaTitle leads with "Used Van"; A/B a "Second Hand Van" word-order variant against the highest-impression query "capital allowances on second hand vans".)

---

## Section-by-section content plan to ~3,500 words

Target 12-13 H2s, ~3,500 body words, 14 FAQs (already at band; do not exceed), 2 inline `<aside>` CTAs (keep existing), 6 numbered authority citations (keep), 5+ worked examples (keep + sharpen), **2 reference/comparison tables** (1 existing 4-route table + 1 NEW table — see below). All HTML body (`<p>`, `<h2>`, `<table>`, `<ul>`), never markdown headings (per `blog_page_rendering_html_in_frontmatter` memory). The plan KEEPS the existing structure and DEEPENS the sibling-distinct pillars; it does not rebuild from scratch.

1. **Intro (~200 words; current ~180)** — keep the reframing spine in the first 120 words ("the word that changes everything is 'second hand'"). Tighten the first 150 words so the "can I claim 100% capital allowances on a second hand van?" answer is snippet-clean and liftable. Keep the link UP to the new-van sibling + the s.35-non-application sentence. Add a one-line pointer to the used-plant-boundary sibling here or in §3.
2. **H2: Why "second hand" changes the answer (~340 words; current ~320)** — THE spine. Keep the existing 4-route comparison **TABLE #1** (Relief | New-and-unused required? | Available to a used van? | Who can use it; rows: Full expensing s.45S / 40% FYA s.45U / AIA s.51A / WDA s.56). This already serves "second hand van full expensing eligibility". Add one sentence explicitly answering "is a second hand van eligible for full expensing?" (No) to capture that adjacent query verbatim.
3. **H2: The Annual Investment Allowance on a used van — 100% in year one (~320 words; current ~300)** — keep Worked example 1 (£14,000 used Transit, full AIA). Keep £1m-permanent framing + AIA pillar forward-links. **ADD the link UP to `can-you-claim-aia-on-second-hand-assets`** here ("for used plant generally, beyond vans, see ...") — completes the hub-and-spoke. Keep the s.35-non-application clarifier.
4. **H2: If you do not use the AIA — the 14% writing-down route (~340 words; current ~300)** — keep Worked examples 2 (£15,000, 14% reducing balance) + 3 (straddling-period hybrid, ~14.99% transitional). Keep the WDA-rates forward-link. Sharpen the lead sentence to answer "what writing down allowance applies to a second hand van?" in the first line (snippet-grab).
5. **H2: The cash basis trap — when you cannot claim capital allowances at all (~320 words; current ~260)** — DEEPEN. Open with a one-sentence direct answer to "cash basis capital allowances van" ("On the cash basis you do not claim capital allowances on a van at all"). Keep s.1A + s.1A(4) car carve-out + the van-vs-car counter-intuition. ADD a short worked illustration: a cash-basis landlord buys a £10,000 used van and deducts the cost in the cash computation rather than as a capital allowance, and note the consequence at the £150,000 cash-basis entry threshold context (keep light, no new statute beyond s.1A / ITTOIA s.33A which the page can optionally cite).
6. **H2: Buying a used van from a relative or your own company (~380 words; current ~340)** — DEEPEN. Open with a one-sentence direct answer to "connected person buying van from own company aia" ("Buy a used van from a connected person and the AIA and first-year allowances are denied; the van falls to the 14% pool"). Keep Worked example 4 (van from controlled company → AIA denied → 14% WDA). Keep the s.214/s.217 buyer-side framing as canonical (NOT "market value on purchase"). ADD a short "connected person" scope list cross-referencing CTA 2010 s.1122 (spouse, civil partner, relatives, business partner, controlled company) — already partly present; tighten into a scannable list. Optionally note the seller-side s.61 market-value-on-disposal rule as the separate, later-sale mechanic to pre-empt confusion.
7. **H2: Selling or scrapping the van later — balancing charges (~320 words; current ~280)** — DEEPEN. Open with a one-sentence direct answer to "balancing charge selling van capital allowances" ("If you claimed 100% through the AIA and later sell the van, the proceeds can trigger a taxable balancing charge"). Keep Worked example 5 (fully-relieved van sold for £4,000 → ~£4,000 balancing charge). Keep the s.55/s.61 framing + the disposal-value-capped-at-cost point. ADD a one-line replacement-planning note (part-exchange disposal value; new van's own relief route).
8. **NEW or upgraded TABLE #2 — used van vs used car (decision/comparison table).** Convert the existing prose comparison in the vans-vs-cars section into a scannable side-by-side table (snippet-bait). Columns + rows:
   - **Columns:** Vehicle type | AIA (100%)? | 40% FYA / full expensing? | Pool & WDA rate | Net first-year outcome
   - **Rows:**
     - Used van | Yes | No (new-and-unused only) | Main pool 14% if no AIA | 100% via AIA in year one
     - Used car ≤50 g/km | No (cars excluded) | No | Main pool 14% | Slow write-down only
     - Used car >50 g/km | No | No | Special-rate pool 6% | Slowest write-down
     - New zero-emission car (0 g/km) | No (cars excluded from AIA) | 100% FYA (s.45D) | n/a | 100% in year one (cars exception)
     - New van | Yes | Yes (full expensing if company / 40% FYA if unincorporated) | n/a | 100% (or 40%) in year one
   - Plain HTML, no pricing. This is the comparison TABLE the page's "vs" intent requires and is the strongest snippet-grab asset to add.
9. **H2: Vans versus cars for a used vehicle (~260 words; current ~240)** — keep the prose but anchor it to TABLE #2; keep the dual-purpose-vehicle (crew-cab / SUV) classification trap; keep the writing-down-allowance-cars forward-link. Open with a direct answer to "is a used van better than a used car for tax?".
10. **H2: Sole trader, partnership or limited company — which route for a used van (~280 words; current ~260)** — keep. Keep the inline `<aside>` CTA #1 + the incorporation forward-link + the group-AIA-sharing note (s.51E). Optionally add a tight 3-row "by structure" reference mini-table (Structure | AIA on used van | WDA fallback | Full expensing / 40% FYA) only if it does not duplicate TABLE #1 — manager preference is the new vans-vs-cars table (TABLE #2) over a third table; keep this section prose + the existing bullets.
11. **H2: Apportioning for private use and record-keeping (~240 words; current ~220)** — keep; minor expansion on the mileage-log evidence standard + the "wholly and exclusively" test. Optional forward-link to `landlord-tax-deductions-uk-2026-complete-list` if natural.
12. **H2: Common mistakes landlords make (~220 words; current ~200)** — keep the bullets (full expensing on a used van; cash-basis claim; connected-party-as-MV mis-statement; forgetting the balancing charge; 18% instead of 14%; confusing Section 24 with capital allowances). These already pre-empt the old conflations; keep verbatim-ish.
13. **H2: How a property accountant helps, and final thoughts (~180 words; current ~160)** — keep CTA framing, no pricing. Keep inline `<aside>` CTA #2 + the capital-allowances-on-property pillar forward-link.
14. **H2: Sources (numbered `<ol>`)** — keep the 6 verified citations; re-verify operative wording at write time (F-8). Add a 7th only if the cash-basis deepening cites ITTOIA 2005 s.33A in body (optional).

**Word-budget math:** current ~2,691 + the deepenings above (cash-basis +60, connected-party +40, balancing charge +40, intro/spine +40, vans-vs-cars table prose +30, misc tightening +30) ≈ ~2,930 from prose deepening; the remaining ~570 to reach ~3,500 comes from the NEW TABLE #2 content + the answer-shaped lead sentences + the structure-by-row table material + widened worked-illustration in §5. Target floor 3,400, ceiling 3,600.

**FAQ block (KEEP at 14 — already at band; Bing terms already verbatim #1-#4):**
The live page already carries the 14 FAQs the earlier brief specified (100% AIA; reduced/WDA; WDA rate; full expensing no; 40% FYA no; sole-trader cash-basis; bought from relative s.217; balancing charge on sale; mileage log; van-vs-car; Section 24 irrelevance; £1m AIA limit; company on used van; previously used in another business). **Do not exceed 14.** If folding in an adjacent query improves match, swap (not add): e.g. ensure FAQ wording for the balancing-charge and connected-party FAQs uses the verbatim adjacent query phrasing ("balancing charge selling van", "buying van from own company") to maximise FAQ-snippet match. FAQ schema count must equal frontmatter `faqs:` length (six-check).

---

## Statute spine (every section number with its Act — re-verify each against legislation.gov.uk at write time, including FA Royal Assent per F-37)

All six body citations were live-verified 2026-05-30 (per the diagnosis risk_notes) and again referenced from §38. Re-confirm operative wording at write time (F-8): a 200 status is not proof the wording survived amendment.

- **CAA 2001 s.45S** — full expensing; companies within the charge to CT only; "unused and not second-hand" (so a used van is excluded). [§25.5; verified 2026-05-30] — body cite [2].
- **CAA 2001 s.51A** (incl. s.51A(5) £1m permanent cap) — AIA; covers new OR second-hand plant (the route that rescues a used van). [§25.3; verified 2026-05-30] — body cite [4].
- **CAA 2001 s.56** — main-pool WDA, now 14% (substituted by FA 2026 s.28; straddling hybrid via s.28(2)-(6)). [§38; verified 2026-05-30 via the FA 2026 s.28 annotation] — body cite [5] (and the FA 2026 s.28 enacting cite).
- **CAA 2001 s.55 + s.61** — disposal values / balancing events; s.61 item 2 = market value on connected-party sale (seller-side). [§25.6] — supports the balancing-charge section (the page cites the s.217 anchor for the connected-party section; s.55/s.61 underpin the disposal section in body prose).
- **CAA 2001 ss.214-218 (esp. s.217)** — connected-persons anti-avoidance: no AIA and no first-year allowance on B's expenditure under the relevant transaction where buyer and seller are connected (buyer-side → fall to 14% WDA pool). [verified in force 2026-05-30] — body cite [6].
- **CAA 2001 s.1A** (incl. s.1A(4) car carve-out) — cash basis disapplies capital allowances except for cars (so a van's cost is cash-deducted instead). [verified 2026-05-30] — body prose cite (cash-basis section).
- **CAA 2001 s.35** — dwelling-house bar (and its NON-application to a van used to visit/maintain let properties — plant used in the business, not plant for use inside a dwelling). [§38 / §25] — body prose.
- **CAA 2001 s.38B** — General Exclusion 2: cars excluded from AIA (cars contrast in TABLE #2 / vans-vs-cars section). [verified 2026-05-30] — body prose (cars contrast).
- **CAA 2001 s.45D** — 100% FYA for new, unused 0 g/km cars only (the cars exception in TABLE #2). [§25.5] — body prose (cars contrast).
- **CAA 2001 s.104D** — special-rate pool 6% (used car >50 g/km row of TABLE #2). [§38] — body prose.
- **CTA 2010 s.1122** — "connected persons" definition (cross-reference for the buying-from-a-relative section). [house_positions referenced] — body cross-reference, no restatement.
- **ITTOIA 2005 s.33A** — cash-basis capital expenditure; s.33A(4)(c) carves cars out (so the van's cost is cash-deducted; the car stays in the allowances regime). [verified 2026-05-30] — optional body cite if the cash-basis section is deepened with the deduction mechanic.
- **FA 2026 (c.11) s.28** — substitutes 14% main-pool WDA into CAA s.56; straddling hybrid s.28(2)-(6); **ENACTED, Royal Assent 18 March 2026 — state as current law.** [§38 LOCKED; F-37] — body cite [5].
- **FA 2026 (c.11) s.29** — new 40% FYA inserting **CAA 2001 s.45U**; new-and-unused, excludes cars + second-hand + overseas-leasing; from 1 January 2026. **ENACTED, RA 18 March 2026.** [§38 LOCKED; F-37] — body cite [3]. (The page already cites the s.45U inserted-section number correctly; verify it survives at write time, otherwise cite FA 2026 s.29 directly. Never invent a section number.)
- **F(No.2)A 2023 (c.30) s.8** — AIA £1m made permanent (RA 11 July 2023). [§38 / §25.3] — supports the £1m-permanent assertion (optional cite).

**(Execution keeps the existing 6 numbered body citations; the additional sections above underpin body prose and the tables. Add a 7th numbered cite only if the cash-basis or cars content is deepened with a new in-body statutory reference.)**

---

## Competitor depth benchmark (Stage 2 — verify live at execution)

| Dimension | cruseburke / accotax / accofirm (used-van AIA pieces) | pie.tax (vans simple guide) | THIS repolish target |
|---|---|---|---|
| Word count | ~800-1,400 | ~1,000 | ~3,500 |
| WDA rate currency | STALE 18% | STALE 18% | Correct 14% (FA 2026 s.28) + straddling hybrid |
| Full expensing / 40% FYA exclusion on used | None | None | Full (s.45S + s.45U, new-and-unused) — TABLE #1 |
| Cash-basis bar | None | None | Full (s.1A + s.1A(4) + ITTOIA s.33A) |
| Connected-party mechanic | None (or "market value" myth) | None | Correct ss.214/217 buyer-side denial → 14% pool |
| Balancing charge on sale | None | None | Full (s.55/s.61 + worked example) |
| Used-van-vs-used-car comparison | None / prose | None | Side-by-side TABLE #2 (snippet-bait) |
| Statute citations | 0 verified | 0 verified | 6+ verified legislation.gov.uk cites |
| FAQs / FAQ schema | None | None | 14, verbatim queries, FAQPage schema |

**Decisively best-in-class, not catch-up:** no competitor combines current FA-2026 law + the used-van exclusion table + the cash-basis bar + the corrected connected-party mechanic + the balancing charge + a used-van-vs-used-car comparison table + 14 query-matched FAQs + verified citations. The repolish extends an already-winning page; the competitors are a generation behind on the WDA rate alone.

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis; each assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| capital allowances on second hand vans | gsc | 2 | 9 | metaTitle |
| capital allowances on vans | gsc | 1 | 50 | H1 |
| capital allowances on second hand vans | bing | 4 | 2 | metaDescription |
| caital allowance on used van purchase hhmrc | bing | 2 | 5 | body§ intro (snippet-clean first-150-words answer to "can I claim on a used van purchase") |
| writing down allowance onsecond hand van | bing | 2 | 2 | H2#4 (If you do not use the AIA: the 14% writing-down route) |
| capital allowances on second hand van | bing | 2 | 4 | FAQ#3 "What writing down allowance applies to a second hand van?" / FAQ#1 "Can I claim 100% capital allowances on a second hand van?" |
| capital allowances on vans | bing | 2 | 4 | H2#2 (Why "second hand" changes the answer) |
| van capital allowances | bing | 2 | 4 | summary (frontmatter) |
| aia on van | bing | 1 | 6 | H2#3 (The Annual Investment Allowance on a used van) |
| can you claim reduced capital allowance on van | bing | 1 | 2 | FAQ#2 "Can you claim a reduced capital allowance on a van?" |
| can i claim 100% capital allowances on second hand van | bing | 1 | 2 | FAQ#1 "Can I claim 100% capital allowances on a second hand van?" |
| second hand van full expensing eligibility | adjacent | 0 | 0 | H2#2 table row (Full expensing s.45S → "No" for a used van) + FAQ#4 "Does full expensing apply to a second hand van?" |
| balancing charge selling van capital allowances | adjacent | 0 | 0 | H2#7 (Selling or scrapping the van later: balancing charges) |
| connected person buying van from own company aia | adjacent | 0 | 0 | H2#6 (Buying a used van from a relative or your own company) |
| cash basis capital allowances van | adjacent | 0 | 0 | H2#5 (The cash basis trap) |

(Note: the duplicate primary query "capital allowances on second hand vans" appears under both gsc and bing sources in the diagnosis; assigned to metaTitle for the gsc instance and metaDescription for the bing instance so each row maps to a distinct serving slot.)

---

## Meta plan

- **metaTitle (≤ 62 chars; front-load "second hand van" + the 100% hook, keep the differentiator):**
  - "Capital Allowances on Second Hand Vans: 100% via AIA" (51) — **lead candidate.** Front-loads the exact-match query "capital allowances on second hand vans" (gsc pos 9 / bing pos 2) and carries the 100%/AIA hook.
  - "Second Hand Van Capital Allowances: AIA, Not Full Expensing" (58) — keeps the load-bearing distinction; A/B alternate.
  - (Current live: "Capital Allowances on a Used Van: AIA, Not Full Expensing" (56) — strong but leads with "Used Van" not the exact "second hand vans" query word order; the repolish front-loads the exact match.)
- **metaDescription (≤ 158 chars; exact query phrase + 100% hook + currency + worked-example promise; no pricing):**
  - "Can you claim capital allowances on a second hand van? Yes, 100% through the AIA, though full expensing and the 40% FYA are out. FA 2026 rules, worked examples." (157)
  - (Current live, 155 chars, is fine; the variant above front-loads the verbatim question for the "can i claim 100% capital allowances on second hand van" query.)
- **h1:** keep "Can Landlords Claim Capital Allowances on Second Hand Vans?" (question form mirrors the highest-intent Bing query "can i claim 100% capital allowances on second hand van"; serves the "capital allowances on vans" gsc query inside the same H1).
- **summary (frontmatter):** keep / lightly sharpen the existing summary, leading with "van capital allowances" near the front: "A practical guide for UK landlords on van capital allowances when the van is second hand. We explain why a used van is shut out of full expensing and the new 40% first-year allowance, how the Annual Investment Allowance still gives 100% relief, the 14% writing-down fallback, the cash basis trap, connected-party purchases and the balancing charge on a later sale."

---

## Schema plan

- **Reviewer (REAL convention from the live corpus + `Property/web/src/lib/schema.ts` emit logic — anonymised role-title per the lead-gen handoff model, no personal name; already present on the live page, keep):**
  - `reviewedBy: "ICAEW Qualified Senior Reviewer"`
  - `reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"`
  - `reviewedAt: "2026-05-30"`
  (This is the established corpus reviewer convention; `schema.ts` emits it as a `reviewedBy` Person with `jobTitle` = credentials inside the BlogPosting. Confirm it is present and unchanged; do not invent a personal name.)
- **howTo:** **false.** This is a decision / comparison + reference page (used-van eligibility, AIA-vs-WDA fork, connected-party + cash-basis + balancing-charge mechanics), not a numbered step-by-step procedure. Do NOT populate `howToSteps`; no HowTo JSON-LD.
- **dateModified:** `2026-05-30` (per the task spec — keep the existing dateModified; the repolish does not need to bump it unless execution changes body facts, which it should not).
- **JSON-LD blocks emitted:** **Article** (BlogPosting via `buildBlogPostingJsonLd`, carrying `reviewedBy`) + **FAQPage** (auto-emitted from the frontmatter `faqs:` array of 14; never hand-add FAQ schema in body). **No HowTo block** (howTo: false).

---

## Universal rules (do not skip)

(Inherited — see `docs/property/_archive/TRACK2_PROGRAM.md` §4 section 13 pointer block + `docs/competitor_rewrite_playbook.md` §5.) **Critical for this brief:** NO em-dashes anywhere (use commas, parentheses, full stops, middle dots) — the page is currently clean at 0; keep it clean. NO pricing / fees (Decision E — including no soft "general-market £800-£1,500 accountant fee" comparisons; worked-example asset costs such as the £14,000 van are legitimate tax illustrations, NOT fee disclosure). NO real client names; anonymised personas only (the page already uses Aisha / Ben / Carol / Dan — keep the anonymised-first-name pattern). LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; keep the 2 existing inline `<aside>` CTAs at conversion moments only. Body is raw HTML (`<p>`, `<h2>`, `<table>`), never markdown `##`. FAQs in frontmatter `faqs:` array only (14; do not exceed); FAQPage schema auto-emitted; never hand-add FAQ schema in body. NO Tailwind utility classes in markdown body; semantic HTML only. Every statute citation re-verified against legislation.gov.uk at write time, including the Royal Assent date of FA 2026 (18 March 2026 — F-37 Bill-vs-enacted discipline; FA 2026 is ENACTED, state s.28/s.29 as current law, never "Bill"). **This is a REPOLISH: do not regress any already-correct fact (WDA 14%; full expensing companies-only + new-only; 40% FYA new-only excludes cars; AIA £1m permanent; connected-party ss.214/217 buyer-side; cash-basis s.1A; s.35 non-application to a working van).**

---

## 19-step workflow (legacy-rewrite REPOLISH adaptation — inherits NETNEW §7 with Track 2 deltas)

1. Read `house_positions.md` §38 + §25.3 + §25.5 + §25.6 + §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution).
3. Read this brief end-to-end.
4. **Re-verify the statute spine against legislation.gov.uk** — the six body cites (s.45S, s.51A, s.56/FA 2026 s.28, s.217, plus s.45U via FA 2026 s.29, and the gov.uk overview) + the FA 2026 Royal Assent date (18 March 2026). F-8: verify operative wording, not just a 200. Load-bearing pre-rewrite step even on a repolish (a section can be amended between 2026-05-30 and execution).
5. Re-fetch the 4 competitor URLs (cruseburke, accotax, accofirm, pie.tax); reject non-200; replace any dead one with a sibling from `briefs/property/_sitemap_cache_v2/`.
6. Read the current `capital-allowances-second-hand-vans.md` source in full (it is already a good rewrite; you are EXTENDING it, not rebuilding).
7. Read the two siblings to differentiate AWAY, not duplicate: `capital-allowances-on-vans` (new-van) and `can-you-claim-aia-on-second-hand-assets` (broad used-plant boundary). Confirm the hub-and-spoke link plan.
8. Plan the deepenings: extend to ~3,500 words by widening the four sibling-distinct pillars into answer-shaped sub-blocks; add TABLE #2 (used van vs used car); add the link UP to `can-you-claim-aia-on-second-hand-assets`.
9. **Rewrite markdown at existing path** (NOT a new file). Keep slug + canonical + category + image + the 14 FAQs (do not exceed) + the reviewer block + `dateModified: 2026-05-30`. Sharpen metaTitle + metaDescription + (optionally) summary per the Meta plan; keep h1. Add the missing internal link + TABLE #2 + the prose deepenings + the answer-shaped lead sentences. Re-confirm `sourceDomains` unchanged (legislation.gov.uk, gov.uk).
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks PLUS repolish-specific: FAQ schema count = frontmatter `faqs:` length (14); em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62; metaDescription ≤ 158; all internal links resolve (including the new `can-you-claim-aia-on-second-hand-assets` link). Plus: grep for "£[0-9]" returns only worked-example asset costs, no fee-quote lines; grep "18%" returns only the historical-context / straddling references, never a current-rate assertion; grep "full expensing" never attaches to the used van as available; word count ≥ 3,400.
12. Confirm no redirect for THIS page (none — slug kept). Do NOT 301 any sibling here (collapse-direction rule forbids it; the cross-page consistency note is a future sweep, not this execution).
13. Update / insert `monitored_pages` Supabase row: 180-day window from write date (INVISIBLE Google baseline → longer window per F-11; the Bing page-1 cluster is the defend-target).
14. Commit on `main`: `git commit -m "Track 2A: repolish capital-allowances-second-hand-vans (INVISIBLE Google lift + CTR + snippet structure; hub-and-spoke lock; no fact change)"`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the LOW cross-page consistency note (sibling connected-party framing) if not already logged.
17. Update the program heartbeat.
18. Log discoveries for inter-batch awareness (the sibling-alignment sweep recommendation).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment (verify-don't-regress)
- §38 FA 2026 s.28 (14% WDA) + s.29 (40% FYA s.45U, new-only): __ confirmed unchanged
- §25.3 AIA (s.51A, new-or-used, £1m permanent): __ confirmed unchanged
- §25.5 full expensing (s.45S, company-only, new-only): __ confirmed unchanged
- §25.6 disposal mechanics (s.55 + s.61) + connected-party s.217 buyer-side: __ confirmed unchanged
- Cash basis s.1A (+ s.1A(4) car carve-out): __ confirmed unchanged
- s.35 NON-application to a working van: __ confirmed unchanged

### Comparison: before vs after (repolish metrics)
- Word count: 2,691 → __ (3,400-3,600 target)
- H2 count: 8 (+ intro + Sources) → __ (12-13 incl. new structure)
- FAQ count: 14 → __ (keep 14, do not exceed)
- Authority links: 6 → __ (keep 6, +1 only if cash-basis cite added)
- Internal links: 6 → __ (+1: can-you-claim-aia-on-second-hand-assets)
- Inline CTAs: 2 → __ (keep 2)
- Worked examples: 5 → __ (keep 5, +1 optional cash-basis illustration)
- Reference/comparison tables: 1 → __ (2: 4-route table + used-van-vs-used-car table)
- metaTitle: "Capital Allowances on a Used Van: AIA, Not Full Expensing" → __
- metaDescription: (current) → __
- Hub-and-spoke link UP to can-you-claim-aia-on-second-hand-assets added: __ (Y/N)
- Any fact regressed: __ (must be N)

### Visibility hypothesis test
- Pre-repolish Bing: 18 impr / 2 clk / pos 3.8 (defend/extend); Google: pos 9/50 (lift target)
- Post-repolish target: defend/extend Bing page-1 cluster; move Google toward page 1-2 on used-van terms over 90-180d
- Verify at +30 / +90 / +180 days via monitored_pages detector (INVISIBLE-baseline → 180-day window)

### Flags raised
- LOW cross-page consistency note (sibling capital-allowances-on-vans connected-party framing): __ logged for future sweep
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
