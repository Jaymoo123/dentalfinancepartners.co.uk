# Track 2 brief: cgt-property-transfer-spouse

**Site:** property
**Brief type:** Legacy rewrite (Track 2A, Batch 1 Sub-bucket C, page B1-C3)
**Source markdown path:** `Property/web/content/blog/cgt-property-transfer-spouse.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-property-transfer-spouse
**Stage 1 priority:** **H** (page is the THINNEST of the 3 Sub-bucket C pages — only ~1,000 words, 2 FAQs — AND has stale non-dom framing post-FA-2025 long-term-resident shift AND is missing every operational mechanic that Wave 5 just shipped depth on (Form 17, declaration-of-trust, SDLT-on-assumed-debt trap, joint-tenancy bar); this is the highest-uplift opportunity of the 3 in the sub-bucket)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE (clean against Wave 5 C7 + C2 + C1 which the rewrite forward-links INTO heavily; intra-batch boundary against B1-C1 explicit per cannib table below)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-property-transfer-spouse`. Slug carries the dominant query intent (CGT + property transfer + spouse) and matches the source page's H1. No redirect proposed.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `STRUCTURE` (primary — 1,000 words, 2 FAQs, missing every operational mechanic that Wave 5 shipped) + `DEPTH` (secondary — body is sub-pillar quality; lacks worked examples; no statute citations in body except a single s.58 by name) + `VOICE-FRESHNESS` (tertiary — non-dom framing uses pre-FA-2025 terminology; gives consumer-grade rather than practitioner-grade framing).
- **"Why this rewrite" angle:** the source page predates Wave 5's Form-17 + joint-ownership shipping (2026-05-23) and predates the FA-2025 domicile-reform shift to a long-term-resident regime (6 April 2025 per §17.6). It is the THINNEST of the 3 Sub-bucket C pages by every structural measure — 1,000 body words vs B1-C1's 1,500 vs B1-C2's 1,500; 2 FAQs vs B1-C1's 4 vs B1-C2's 4; "cgt property transfer spouse" used as `<strong>` 7 times in body (keyword-stuffing pattern). The page also opens the door to the BIG operational traps but never walks through them: it mentions "non-resident spouse" without the FA-2025 long-term-resident framework, it never mentions Form 17 / declaration-of-trust / the SDLT-on-assumed-debt trap (the most common implementation error per §24.3), and it never threads the Wave 5 C7 PRR-on-joint-ownership mechanic (the s.222(6) one-residence rule) that interacts with every spouse transfer. Rewrite must (a) become the **operational mechanics page** for spouse transfers in NORMAL married life (the "happily-married portfolio rebalancing" use case, as distinct from B1-C1's divorce use case), (b) thread the SDLT-on-assumed-debt trap from §24.3 verbatim (THE most common implementation error per HMRC manuals + every practitioner page), (c) refresh non-dom framing to the FA-2025 long-term-resident regime per §17.6, (d) forward-link to Wave 5 C7 + Wave 5 C2 + Wave 5 C1 prominently (operational mechanics live in the Wave 5 pillars; this page should be the gateway).

---

## Current page snapshot (Stage 2 — source markdown + frontmatter read)

**Filesystem source read (2026-05-23):**
- Frontmatter `date`: 2026-03-31
- `dateModified`: not present (missing)
- `reviewedBy` / `reviewerCredentials` / `reviewedAt`: NONE (missing)
- `metaTitle`: "CGT Property Transfer Spouse: Tax Exemption Rules 2026" (54 chars; OK)
- `metaDescription`: "Is CGT on property transfer to spouse exempt? Complete guide to spousal transfers, no gain no loss rules, and key exceptions UK landlords must know." (146 chars; under 158 limit, OK)
- `faqs`: **only 2 entries** (target 12-14 — the structural gap is large)
- `h1`: "CGT on Property Transfer to Spouse: Is It Exempt?" (good — question form matches a common query)
- Body word count: **~1,000** (target 2,800-3,200 — the depth gap is large)
- H2 sections: 7 (the rule; key exceptions with 3 H3s; tax + financial planning with 2 H3s; documentation with 2 H3s; strategic planning with 2 H3s; common mistakes with 3 H3s; when to seek advice)
- Internal links: 4 (CGT property pillar, BTL ltdco complete guide, reduce CGT, principal residence relief)
- Outbound authority links: 0
- Worked examples: 1 (£200k → £280k spouse transfer at no CGT)
- Statute cites in body: **TCGA 1992 s.58 named once** (at line 26 "found in Section 58 of the Taxation of Chargeable Gains Act 1992") — better than B1-C1 and B1-C2 on this dimension but still single-cite.
- **Substantive content gaps + 1 stale framing:**
  - **Gap 1: missing Form 17 + declaration-of-trust + SDLT-on-assumed-debt trap entirely.** This is the most consequential operational point in the cluster (per §24.3). Wave 5 C1 (Form 17 pillar) + Wave 5 C3 (declaration of trust pillar) shipped 2026-05-23 with the depth; this page should be the gateway entry point routing readers to them.
  - **Gap 2: missing the joint-tenancy bar entirely** (§24.2 + Wave 5 C2). The page never tells a reader who holds as JT that they cannot use Form 17 without severing; the Wave 5 C2 sibling has the depth.
  - **Gap 3: missing the s.222(6) one-residence rule entirely** (§24.5 + Wave 5 C7). A spouse transfer can interact with the couple's PRR coverage in unexpected ways; the page never mentions it.
  - **Gap 4: missing the F(No.2)A 2023 s.58(1A)-(1D) extension entirely.** The page says "transfers in subsequent tax years while separated will trigger CGT charges" (line 40) — incomplete; the actual rule post-6-April-2023 is 3 tax years AND unlimited under court order/agreement (s.58(1C)-(1D)).
  - **Stale framing 1 (lines 39 + 42): non-resident spouse framing.** "If your spouse is not UK resident for tax purposes, the normal exemption doesn't apply" — incorrect post-FA-2025. The s.18 IHTA 1984 long-term-resident framework (§17.6 + §15.6 + §24.5) is the current language; the s.58 TCGA exemption itself is not residence-dependent (s.58 turns on "living together" not on residence). The page conflates two different rules. The actual mechanic per §15.6 + §22.5: s.18 IHTA 1984 spouse exemption is residence-conditional for transfers TO a non-long-term-resident spouse (£325k lifetime cap or elect under s.267ZA); but s.58 TCGA is not residence-conditional (turns on "living together" definition in s.288). The source page conflation could mislead readers into thinking inter-spouse property transfers between living-together UK-resident-spouse + non-UK-resident-spouse trigger CGT — they do not, by default, under s.58.
  - **Stale framing 2 (line 134 of B1-C1 source, mirrored here): "Mixed Use Properties" subsection** at lines 44-45 says "the exemption may only apply to the residential portion, with the commercial element potentially chargeable to CGT" — this is wrong. s.58 applies to any asset disposal between cohabiting spouses; there is no residential-vs-commercial carve-out. Mixed-use considerations affect rate (commercial vs residential CGT rate) and AEA, but not the no-gain-no-loss treatment.
  - **Keyword stuffing pattern:** "cgt property transfer spouse" appears as `<strong>` 7 times in body (lines 22, 23, 26, 37, 48, 56, 74, 82) — exceeds reasonable density; rewrite should normalise.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 PM via `python -m optimisation_engine.track2.pull_page_data --slug cgt-property-transfer-spouse --days 90`.**

**Aggregate:** **ZERO GSC rows** in 90-day window. ZERO `competitor_serps`; ZERO `page_content_map`; ZERO `competitor_gap_reports`.

**Pattern read:** TAIL-SIGNAL case, same as B1-C1 and B1-C2. The 3 Sub-bucket C pages are all sub-floor on daily GSC reporting.

**Strategic conclusion:** rewrite proceeds on (a) Wave 5 cluster-positioning reasoning (Wave 5 C-bucket shipped 10 operational mechanic pages 2026-05-23; this page should become their gateway), (b) content-correctness reasoning (the 6 gaps + 2 stale framings above), (c) competitor coverage gap (no competitor has a clean Form-17 + SDLT-trap gateway page; everyone overlaps with the mechanic). Post-rewrite, monitor via `monitored_pages` + watch for tail-signal lift as Wave 5 C-cluster traffic compounds.

### GA4 engagement signal (real data from `ga4_page_data`)

- ZERO rows. Same as B1-C1 and B1-C2.

**Implication for the brief:** no engagement signal to triangulate. The strategic case for this rewrite rests on (i) the Wave 5 cluster pairing opportunity (the page should now be the natural gateway to Wave 5 C1/C2/C7) and (ii) the substantive content fixes (6 gaps + 2 stale framings).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source-page review)

**Primary: STRUCTURE (acute — page is sub-pillar quality).** The page is 1,000 words with 2 FAQs. The Wave 5 C-cluster siblings ship 2,500-3,500 words with 12-14 FAQs each. This page is the natural gateway into the Wave 5 C-cluster but currently looks like an undeveloped consumer page next to it. The structural fix is large (rewrite to ~2,800-3,200 words + 12-14 FAQs + worked examples + statute anchors) but the cluster gain compounds (every Wave 5 C-page can forward-link back to this gateway).

**Secondary: DEPTH (acute, with Wave 5 C-cluster providing the depth pillars).** The page should NOT re-walk the Form 17 mechanic, the declaration-of-trust mechanic, the joint-tenancy severance mechanic, or the PRR one-residence rule — Wave 5 C1 / C3 / C2 / C7 are the pillars for those. The page SHOULD provide the **gateway depth** — the decision tree that routes a reader to the right pillar based on what they want to achieve (rebalance income? then Form 17 + deed-of-trust; restructure base cost before sale? then s.58; move beneficial interest in a JT? then sever first; planning around PRR? then s.222(6) Wave 5 C7). This is the "diagram in words" job — distinct from the pillar-page job.

**Tertiary: VOICE-FRESHNESS — stale non-dom + mixed-use framings.** Two specific stale framings (above) need refresh against the FA-2025 long-term-resident regime per §17.6 + against the correct s.58 reading per §24.4 (mixed-use doesn't break the exemption).

**Load-bearing fix sequence (ordered by reader-impact ROI):**

1. **Rewrite the page to the gateway role** — explicit "what do you want to achieve?" decision tree at the top routing to Wave 5 C-cluster pillars. This is the structural fix that compounds across the cluster.
2. **Add the SDLT-on-assumed-debt trap (§24.3)** as the load-bearing operational warning. THE most common implementation error in the cluster; missing entirely from the source.
3. **Add the joint-tenancy bar warning + Wave 5 C2 forward-link** for readers who hold as JT and don't yet know they need to sever.
4. **Add the s.222(6) one-residence rule sidebar + Wave 5 C7 forward-link** for the PRR-conscious reader.
5. **Refresh the non-dom framing to the FA-2025 long-term-resident regime** per §17.6; correctly distinguish the s.18 IHTA 1984 residence-conditionality from the s.58 TCGA non-residence-conditionality.
6. **Fix the mixed-use error** — clarify that s.58 applies to any asset disposal between cohabiting spouses regardless of residential / commercial use; the residential/commercial distinction affects rates + AEA only.
7. **Add the F(No.2)A 2023 s.58(1A)-(1D) extension** for the separation context (then forward-link to B1-C1 for the divorce-specific depth).
8. **Body lift to 2,800-3,200 words** with the 6 fixes above + 4-5 worked examples (rebalancing portfolio across spouses; preparing a property for sale using both AEAs; transferring a mortgaged property between spouses with the SDLT-debt trap demo; spouse-resident-abroad transfer with FA-2025 framing; PRR-conscious transfer of a former main residence).
9. **Authority links: 5-7 verified citations** (s.58 legislation.gov.uk; s.288 TCGA "living together" definition; ITA 2007 s.836 cross-ref for Form 17; HMRC TSEM9810 series; HMRC HS281; gov.uk/capital-gains-tax/gifts).
10. **Frontmatter hygiene:** add `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`. Strengthen FAQs from 2 to 12-14.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch where accessible)

| URL | Status | Word count | FAQs | Statute cites | What to borrow / differentiate |
|---|---|---|---|---|---|
| https://www.gov.uk/government/publications/husband-and-wife-civil-partners-divorce-dissolution-and-separation-hs281-self-assessment-helpsheet/hs281-capital-gains-tax-civil-partners-and-spouses-2024 | 200 OK; verified 2026-05-23 (also used in B1-C1) | ~2,500 | 0 | s.58 + s.225B explicitly | **Borrow:** the 2024-tax-year framing discipline; the "living together" definition language. **Differentiate:** add Form 17 + SDLT-trap + decision-tree gateway HS281 entirely omits. |
| https://www.gov.uk/capital-gains-tax/gifts | 200 OK; verified 2026-05-23 (also used in B1-C1) | ~600 | 0 | None (consumer page) | **Borrow:** the gov.uk-baseline "give or sell to your husband, wife or civil partner" language. **Differentiate:** add practitioner depth + post-6-April-2023 statutory framework gov.uk's consumer page still doesn't reflect. |
| https://library.croneri.co.uk/cch_uk/btr/504-050 | Practitioner paywall (gov.uk surfaces the title in SERP) | Unknown | Unknown | Strong (Croner is practitioner-grade) | Defer — can't access without practitioner login. Use as a "if you can access Croner" execution-side reference. |
| https://www.propertypassport.uk/guides/transferring-property-spouse-reduce-cgt | 200 OK (surface signal from SERP; not deep-fetched) | ~2,000 (est) | Unknown | Unknown | **Borrow:** consumer-grade "reduce CGT" angle. **Differentiate:** add the SDLT-trap + Form 17 gateway competitive advantage. |
| https://www.taxadvisermagazine.com/article/calculating-capital-gains-tax-property-cases-separation-or-divorce | **403 Forbidden** 2026-05-23 (also blocked in B1-C1) | Unknown | Unknown | Unknown (expected strong) | Flag execution-session re-fetch. |
| https://www.weightmans.com/media-centre/news/changes-to-capital-gains-tax-rules-on-divorce-and-dissolution/ | 200 OK; verified 2026-05-23 (also used in B1-C1) | ~2,200 | 0 | s.58 + s.225B | Largely divorce-focused; this page should defer to B1-C1 for divorce depth and stay in the living-together-spouse lane. |

**Competitor depth ceiling:** ~600 (gov.uk) to ~2,500 (HS281) words; FAQs uniformly 0 across practitioner pages; statute citations selective. Our 2,800-3,200 word target with 12-14 FAQs + 5-7 statute citations + decision-tree gateway puts us best-in-class. The decision-tree gateway is the structural differentiator no competitor has.

**What to differentiate against:** no competitor sets itself up as a decision-tree gateway routing readers to depth pages on each specific mechanic. The Wave 5 C-cluster pillars give us the depth substrate; this page becomes the gateway. Single highest-leverage differentiation move in the brief.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (PM refresh, post-Wave-5 merge).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (self) | cgt-property-transfer-spouse | REWRITE | self |
| Excluded (**Wave 5 C7 SHIPPED 2026-05-23 — MANDATORY cross-link per launch prompt**) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics | PRR + s.222(5) nomination + s.222(6) one-residence rule + s.225B post-separation extension; covers F(No.2)A 2023 + s.58(1A)-(1D) | **NOT a collision — intentional sibling pair.** Wave 5 C7 owns PRR + s.222(6); this page owns the s.58 spouse-transfer mechanic. Forward-link from §"PRR and spouse transfers: the one-residence rule" sidebar; Wave 5 C7 already covers s.58 once (line 33 of its body), so reciprocal back-link from Wave 5 C7 is sensible (recommend a future-batch back-patch to add explicit Wave 5 C7 → this page forward-link). |
| Excluded (**Wave 5 C2 SHIPPED 2026-05-23 — MANDATORY cross-link per launch prompt**) | joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords | JT vs TIC foundational; severance route under LPA 1925 s.36(2) | **NOT a collision — intentional sibling pair.** Wave 5 C2 owns the JT vs TIC structural decision + severance route. This page forward-links from §"Joint tenancy bar: if you hold as JT" warning sidebar. C2 already covers Form 17 + s.836 by reference; sensible reciprocal back-link from C2 (recommend future-batch back-patch). |
| Excluded (Wave 5 C1 SHIPPED 2026-05-23) | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation | Form 17 pillar | NOT a collision — sibling pair. This page forward-links from §"Want to rebalance the income split too?" + decision tree. |
| Excluded (Wave 5 C3 SHIPPED 2026-05-23) | declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 | Declaration of trust pillar | NOT a collision — sibling pair. This page forward-links from §"Mortgaged property: the SDLT-on-assumed-debt trap" warning. |
| Excluded (Wave 5 C4 SHIPPED 2026-05-23) | unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision | Decision page Form 17 vs default | NOT a collision — sibling pair. Forward-link from decision tree. |
| Excluded (Wave 5 C6 SHIPPED 2026-05-23) | unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share | Unmarried co-owner page | NOT a collision — sibling pair. Forward-link from §"What about unmarried cohabitees? s.58 does not apply." disambiguation. |
| Excluded (Wave 5 C8 SHIPPED 2026-05-23) | iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt | IHT joint ownership + spouse exemption | NOT a collision — adjacent sibling. Forward-link from §"IHT spouse exemption: s.18 IHTA 1984" sidebar (refreshed per FA-2025). |
| Excluded (Wave 5 C9 SHIPPED 2026-05-23) | second-home-sdlt-3-percent-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules | SDLT joint-buyer aggregation | NOT a collision — sibling. Forward-link from §"SDLT-on-assumed-debt trap" sidebar (different trap but related cluster). |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar | No collision; back-link from intro to pillar. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk | Gifting reliefs | Adjacent; gifting page covers s.165 + s.260 holdover for gifts to non-spouses; this page covers the simpler s.58 spouse case. Forward-link from §"Gifts to children vs transfers to spouse" comparison. |
| Residual (intra-Batch-1) | **B1-C1 cgt-divorce-property-transfer-tax-implications** | Sub-bucket C sibling | **Critical adjacency — define boundary explicitly.** B1-C1 owns the separation / divorce case (s.58(1C)-(1D) + s.225B + Mesher + BTL portfolio split under court order). This page (B1-C3) owns the living-together case (s.58(1A)-(1B) + Form 17 gateway + SDLT trap + portfolio rebalancing). The boundary explicitly stated in body: "Looking for spouse transfers in separation / divorce? See [B1-C1]. Looking for transfers between living-together spouses? You are here." |
| Residual (intra-Batch-1) | B1-C2 cgt-inherited-rental-property-calculation-uk | Sub-bucket C sibling | No collision (different life event); brief mention in §"Inheriting then transferring to spouse" + forward-link. |
| Wave 6 (in-flight) | Bucket B trusts (settlements legislation, GROB, settlor-interested) | — | No collision in CGT-spouse-transfer; passing mention in §"Trust route as an alternative" sidebar with forward-link to Wave 6 Bucket B pillar once it ships. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. **The Wave 5 C-cluster cross-link saturation is the entire structural case for this rewrite** — the page becomes the gateway into Wave 5 C-cluster depth.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page after rewrite):

**Wave 5 C-cluster forward-links (the load-bearing structural set):**
- **Wave 5 C7** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — forward-link from §"PRR and spouse transfers: the one-residence rule" sidebar (MANDATORY per launch prompt)
- **Wave 5 C2** `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` — forward-link from §"Joint tenancy bar: if you hold as JT" warning sidebar (MANDATORY per launch prompt)
- **Wave 5 C1** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` — forward-link from §"Want to rebalance the income split too?" decision tree
- **Wave 5 C3** `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` — forward-link from §"Mortgaged property: the SDLT-on-assumed-debt trap" warning
- **Wave 5 C4** `unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision` — forward-link from decision tree
- **Wave 5 C6** `unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share` — forward-link from §"What about unmarried cohabitees? s.58 does not apply." disambiguation
- **Wave 5 C8** `iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt` — forward-link from §"IHT spouse exemption: s.18 IHTA 1984" sidebar
- **Wave 5 C9** `second-home-sdlt-3-percent-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` — forward-link from §"SDLT joint-buyer aggregation: the FA 2003 Sch 4ZA trigger" sidebar
- **Wave 5 C5** `civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality` — forward-link from §"Civil partners: s.58 applies equally" disambiguation (Civil Partnership Act 2004)

**Sub-bucket C intra-batch forward-links:**
- **B1-C1 sibling** `cgt-divorce-property-transfer-tax-implications` — bidirectional with explicit boundary line
- **B1-C2 sibling** `cgt-inherited-rental-property-calculation-uk` — one-way mention in "related life events"

**CGT cluster forward-links:**
- **CGT pillar (rewritten 2026-05-21)** `capital-gains-tax-property-complete-guide-uk` — back-link from intro
- **CGT gifting (rewritten 2026-05-21)** `cgt-gifting-property-family-members-uk` — forward-link from "gifts to children vs transfers to spouse" comparison
- **CGT rates (Track 2 trial gold reference)** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from rates table at top + from the "your spouse's CGT rate after transfer depends on their other income" FAQ
- **AEA depth (rewritten 2026-05-21)** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from §"Using both AEAs"

**Other cluster forward-links:**
- **PRR landlords (residual)** `principal-private-residence-relief-landlords` — forward-link from §"Transferring a former main residence" sidebar
- **NRL guide (existing)** — forward-link only IF the FA-2025 long-term-resident sidebar warrants it (probably yes for the non-UK-spouse case)

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified gov.uk 2026-05-23]: 18% basic, 24% higher, £3,000 AEA. The receiving spouse's downstream CGT runs at their own rate + AEA + band capacity — the gateway argument for spouse transfer planning.
- **§5 60-day reporting rule** [LOCKED — verified 2026-05-23]: not directly applicable to the s.58 transfer itself (no chargeable disposal) but applicable to the post-transfer sale; mention in sidebar.
- **§7 April 2027 property income tax surcharge** [LOCKED — applies to INCOME not CGT]: does NOT affect this brief; the receiving spouse's post-transfer rental income WOULD attract the §7 surcharge if/when enacted, but that is income-tax not CGT. Confirm at execution no drift.
- **§13 do-not-write list** [LOCKED]: no em-dashes; no real client names; no pricing; no specific law firm or conveyancer names.
- **§15 IHT — Wave 2 extension** [LOCKED 2026-05-22]: s.18 spouse exemption (s.18(2) limited where one spouse is not long-term-resident under FA-2025 reform). **Refreshes the source page's stale "non-resident spouse" framing.**
- **§17.6 Domicile reform and the residence-based regime (April 2025+)** [LOCKED 2026-05-22, F-correction-logged 2026-05-22]: **the load-bearing fix for the source page's stale non-dom framing.** Long-term-resident test: 10 consecutive tax years OR 10 of preceding 20 tax years. The s.18(2) IHTA limited spouse exemption now turns on long-term-resident status, NOT on domicile.
- **§22.5 Spouse exemption + transferable allowances** [LOCKED 2026-05-23]: s.18 IHTA 1984 spouse exemption; £325k cap where one spouse not long-term-resident; s.267ZA election available.
- **§24.1 Default 50/50 split for spouses + civil partners** [LOCKED 2026-05-23]: ITA 2007 s.836 (note the F-4 correction logged 2026-05-23: NOT ITTOIA 2005 s.282). Forward-link to Wave 5 C1 for depth.
- **§24.2 Form 17 mechanics** [LOCKED 2026-05-23]: joint-tenancy bar; 60-day filing window; persistence rule. Forward-link to Wave 5 C1 for depth.
- **§24.3 Declaration of trust + SDLT-on-assumed-debt trap** [LOCKED 2026-05-23]: **THE most important operational gap in the source page.** FA 2003 Sch 4 para 8 chargeable consideration where receiving spouse assumes mortgage debt. The CRITICAL implementation error per house position. Forward-link to Wave 5 C3 for depth.
- **§24.4 TCGA 1992 s.58 no-gain-no-loss spouse transfer** [LOCKED 2026-05-23]: anchor for this rewrite. Same F-9 drift catch as B1-C1 (cite verbatim from legislation.gov.uk = F(No.2)A 2023 c.30 s.41, not "FA 2023").
- **§24.5 Cross-mechanism interactions** [LOCKED 2026-05-23]: s.24 finance-cost restriction follows the income-and-property-correspondence rule; s.222(6) one-residence rule (Wave 5 C7); SDLT joint-buyer trigger.
- **§24.10 Do not write** [LOCKED 2026-05-23]: 13 items — particularly relevant to this brief: "Spouses can file Form 17 to split rental income any way they choose" (false; must match underlying beneficial ownership), "Inter-spouse property transfer triggers CGT at market value" (false; s.58 no-gain-no-loss), "Declaration of trust between spouses always triggers SDLT" (false; only where receiving spouse assumes mortgage debt).

---

## House-position conflict flag (Stage 2)

**No new house-position conflict.** Carries F-18 from B1-C1 (s.58 cite drift in §24.4 / §24.9). The source page has stale non-dom framing but the rewrite uses §17.6 + §22.5 framing which IS the locked position — no house-position-vs-source conflict. **Raises F-20 (NEW)** — stale "non-resident spouse" framing on this page is pre-FA-2025 vintage; likely site-wide across spouse-transfer + IHT-spouse-exemption + inter-spouse pages; recommend cross-residual cluster audit (logged in flags).

**Source-page-vs-house-position conflicts (separate from house-position conflicts) — to fix at rewrite:**
- Source line 39-40: "If your spouse is not UK resident for tax purposes, the normal exemption doesn't apply" — conflicts with §17.6 + §24.4 (s.58 turns on "living together" not residence). **Fix at rewrite.**
- Source line 44-45 mixed-use framing: "the exemption may only apply to the residential portion" — conflicts with §24.4 (s.58 applies to any asset disposal between cohabiting spouses). **Fix at rewrite.**
- Source line 40 "subsequent tax years while separated will trigger CGT charges" — incomplete per §24.4 (s.58(1A)-(1D) extension). **Fix at rewrite (defer depth to B1-C1).**

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | 200 OK + content verified 2026-05-23 (subsections 1A-1D verified; F(No.2)A 2023 c.30 s.41(2)(6) in amendment history) | s.58 statute anchor — primary load-bearing cite |
| https://www.legislation.gov.uk/ukpga/1992/12/section/288 | Verify at execution — defines "living together" for s.58 purposes | s.288 living-together definition — cite once for the "what counts as 'living together'" sidebar |
| https://www.legislation.gov.uk/ukpga/2007/3/section/836 | Verify at execution — F-4 correction confirmed by §24.1 | ITA 2007 s.836 — Form 17 50/50 cross-ref (depth in Wave 5 C1) |
| https://www.legislation.gov.uk/ukpga/2003/14 | Verify exact Sch 4 para 8 URL at execution | FA 2003 Sch 4 para 8 SDLT chargeable-consideration including assumed debt (depth in Wave 5 C3 / C9) |
| https://www.legislation.gov.uk/ukpga/1984/51/section/18 | Verify at execution | IHTA 1984 s.18 spouse exemption (s.18(2) limited spouse exemption + s.267ZA election per §22.5) |
| https://www.gov.uk/capital-gains-tax/gifts | 200 OK + content verified 2026-05-23 | gov.uk consumer baseline on spouse / civil partner transfers (NOTE: this page does NOT yet reflect F(No.2)A 2023 — cite for basic spouse-exemption authority only) |
| https://www.gov.uk/government/publications/husband-and-wife-civil-partners-divorce-dissolution-and-separation-hs281-self-assessment-helpsheet/hs281-capital-gains-tax-civil-partners-and-spouses-2024 | 200 OK + content verified 2026-05-23 (s.58 + s.225B language) | HMRC helpsheet — primary consumer-facing authority |
| https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9810 | Verify at execution (per §24.9 citation list) | TSEM9810 et seq. — Form 17 mechanics depth (Wave 5 C1 forward-link suffices) |

**(Execution session selects 5-7 to actually cite in body. s.58 + s.288 + s.18 IHTA + HS281 + gov.uk/gifts are the load-bearing 5; ITA s.836 + FA 2003 Sch 4 are forward-link supports.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: see B1-C1 brief for the full pointer block. Identical inheritance.

**Brief-specific reminders within those universals:**
- The 18%/24% rates + £3,000 AEA are the §16.35 type of figures requiring gov.uk verification at write time.
- The s.58 + s.288 + s.18 IHTA citations are the §16.36 type that need legislation.gov.uk verification at write time (brief gives verified anchors but writer should independently re-verify per §16.40 pattern).
- The Wave 5 C-cluster forward-links must resolve at execution; verify the slugs match production (e.g. that the canonical at `/blog/.../joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` resolves; the Wave 5 C2 page lives under `/blog/landlord-tax-essentials/...` not `/blog/capital-gains-tax/...` per frontmatter).
- The 13-item §24.10 do-not-write list is the per-page checklist for this brief — every one applies somewhere in the body and the writer should sweep against it at step 11.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: see B1-C1 brief for the full pointer + delta block.

**Brief-specific call-outs within those workflow steps:**
- **Step 4 (pre-rewrite verification):** re-WebFetch s.58 + s.288 + s.18 IHTA + HS281 + the 9 Wave 5 C-cluster slug URLs (verify each lives at the canonical path the brief lists; the Wave 5 C2 + C8 + C9 pages are categorised under `landlord-tax-essentials` not `capital-gains-tax` per their frontmatter).
- **Step 7 (read closest existing):** re-read **Wave 5 C7 + C2 + C1 + C3 in full** before drafting (the cross-link discipline + boundary policing requires the writer to know the depth pages' framings + scope to avoid duplication).
- **Step 9 (rewrite):** preserve frontmatter `slug` + `canonical`. Add `dateModified` + `reviewedBy` + `reviewerCredentials` + `reviewedAt` (mirror Wave 5 C-cluster frontmatter pattern). De-stuff the "cgt property transfer spouse" `<strong>` repetitions (current 7; target 1-2 in body for natural reading).
- **Step 11 (six checks):** explicit check that the non-dom framing has been refreshed (§17.6 + §22.5); explicit check that mixed-use error is gone; explicit check that the SDLT-on-assumed-debt trap is present and prominent (the brief's headline operational fix). Also: meta title test, meta description ≤158 chars, em-dash count = 0, FAQ schema count = `faqs:` array length (target 12-14), all internal links resolve (especially the 9 Wave 5 C-cluster forward-links).
- **Step 13 (monitored_pages):** this slug is likely NOT yet in `monitored_pages`. Insert new row with `rewrite_date = today`, `monitoring_window_days = 90`, `expected_lift = "STRUCTURE acute fix + Wave 5 C-cluster gateway positioning; expect first 90-day GSC visibility from tail-signal floor leveraging Wave 5 C-cluster cross-link traffic"`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA): __
- §13 do-not-write (no em-dashes, no pricing, no firm names): __
- §15 IHT spouse exemption + FA-2025 long-term-resident shift: __
- §17.6 long-term-resident regime applied to non-UK-spouse framing: __
- §22.5 s.18 + s.267ZA election cross-link: __
- §24.1 ITA 2007 s.836 (NOT ITTOIA 2005 s.282 per F-4): __
- §24.3 SDLT-on-assumed-debt trap (FA 2003 Sch 4 para 8): __
- §24.4 s.58 — verified Act = F(No.2)A 2023 c.30 s.41: __
- §24.5 cross-mechanism interactions (PRR + SDLT + S24 + MTD): __
- §24.10 do-not-write list — every item swept at step 11: __

### Comparison: before vs after
- Word count: ~1,000 → __ (target 2,800-3,200; biggest lift of the 3 Sub-bucket C briefs)
- H2 count: 7 (with 13 H3) → __
- FAQ count: 2 → __ (target 12-14; biggest lift)
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __ (target 4-5)
- `<strong>cgt property transfer spouse</strong>` keyword-stuffing count: 7 → __ (target 1-2)
- Frontmatter `dateModified` / `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent → __

### Content-error / stale-framing removal verification
- Stale framing 1: non-resident-spouse "exemption doesn't apply" (s.58 vs s.18 conflation): __ REPLACED with FA-2025 long-term-resident framework per §17.6
- Stale framing 2: mixed-use "exemption may only apply to the residential portion": __ REMOVED — s.58 applies to any asset
- Gap 1: SDLT-on-assumed-debt trap (§24.3): __ ADDED prominently
- Gap 2: joint-tenancy bar warning + Wave 5 C2 forward-link: __ ADDED
- Gap 3: s.222(6) one-residence rule + Wave 5 C7 forward-link: __ ADDED
- Gap 4: F(No.2)A 2023 s.58(1A)-(1D) extension (defer divorce depth to B1-C1): __ ADDED with B1-C1 forward-link

### Statute-cite verification at write time (per §16.35)
- TCGA 1992 s.58 — verified at write time: __ DATE / source URL
- TCGA 1992 s.288 (living together) — verified at write time: __ DATE / source URL
- IHTA 1984 s.18 + s.267ZA — verified at write time: __ DATE / source URL
- ITA 2007 s.836 (not ITTOIA s.282) — verified at write time: __ DATE / source URL
- FA 2003 Sch 4 para 8 — verified at write time: __ DATE / source URL
- 18%/24% rates + £3,000 AEA — verified gov.uk at write time: __ DATE / source URL
- F(No.2)A 2023 c.30 s.41 — verified at write time: __ DATE / source URL

### Cross-link verification at write time (9 mandatory Wave 5 C-cluster forward-links + 4 B1 + 4 CGT cluster)
- **MANDATORY Wave 5 C7** (PRR + joint ownership) forward-link added: __
- **MANDATORY Wave 5 C2** (JT vs TIC) forward-link added: __
- Wave 5 C1 (Form 17 pillar) forward-link added: __
- Wave 5 C3 (declaration of trust) forward-link added: __
- Wave 5 C4 (Form 17 vs default decision) forward-link added: __
- Wave 5 C5 (civil partnerships) forward-link added: __
- Wave 5 C6 (unmarried co-owners) forward-link added: __
- Wave 5 C8 (IHT joint ownership) forward-link added: __
- Wave 5 C9 (SDLT joint-buyer aggregation) forward-link added: __
- B1-C1 sibling forward-link with boundary line: __
- B1-C2 sibling mention in "related life events": __
- CGT pillar back-link: __
- CGT rates trial brief forward-link from rates table: __
- CGT gifting forward-link from "gifts to children vs transfers to spouse" comparison: __
- PRR landlords forward-link from "former main residence" sidebar: __

### Flags raised at execution
- F-18 (carried from B1-C1 brief): house-position §24.4 cite drift — apply F(No.2)A 2023 c.30 s.41 verbatim: __
- F-20 (raised at this brief): stale non-dom framing cluster audit — likely site-wide across spouse-transfer + IHT pages: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
