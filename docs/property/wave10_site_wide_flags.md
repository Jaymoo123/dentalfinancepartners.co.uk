# Wave 10 site-wide flags

**Created:** 2026-07-08. **Status:** Pre-launch (no flags yet).

Sessions raise flags here when they surface site-wide issues during their work — existing-page stale figures, brief drift catches, cross-bucket forward-link needs, house-position extensions, etc. Flags do NOT block; sessions continue work after flagging.

**Discipline reminder (§16.15, §16.37):** session-time flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave10_site_wide_flags.md`. NEVER commit flag edits on a worktree branch.

Flag types per NETNEW_PROGRAM §13.2:
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)
- BRIEF_DRIFT — Stage 1a / Stage 2 brief contains a statutory or factual error caught at write time per §16.35 / §16.36
- INTERNAL_LINK — existing page should back-link to new Wave 10 page
- CROSS_BUCKET — forward-link from your bucket to another's pages (hyperlinks needing back-patch at wave merge per §16.32)
- REDIRECT — legacy slug should repoint to your new page
- HOUSE_POSITION_EXTENSION — house position needs new sub-section or clarification (manager closes)
- AUTHORITY_GAP — HMRC manual / legislation page never cited on our site, manager should consider adding

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step 4.)

---

## F-11 — HOUSE_POSITION_EXTENSION — SDLT on mortgage assumption in gifted-property transaction (NEW LOCK NEEDED)

**CLOSED 2026-07-08 Stage 1b: locked as HP §1.P (Sch 4 para 8 verified verbatim; s.53 clarified as charging rule not relief).**

**Raised by:** Stage 1 sub-agent Session A, 2026-07-08, during A11 seed brief (gifting-property-and-deed-of-gift-tax-implications).

**Issue:** No existing house position explicitly covers the SDLT treatment where a gifted property carries an outstanding mortgage and the donee assumes that mortgage. Under FA 2003 Sch 4 para 8, the outstanding mortgage balance constitutes chargeable consideration for SDLT; SDLT is therefore payable at standard residential rates on the debt assumed (including the 5% SDLT surcharge on additional dwellings where applicable). A pure gift with zero mortgage = zero consideration = no SDLT. This mechanics point is a frequent reader misconception ("gifts are free of SDLT").

**Required action (manager at Stage 1b):** Add a sub-section to §1 (or §1.F) locking: (a) FA 2003 Sch 4 para 8 as the statutory anchor; (b) chargeable consideration = mortgage balance assumed; (c) SDLT at standard residential rates on that amount; (d) additional dwellings 5% surcharge applies where the donee already owns property.

**Blocking:** Does not block A11 Stage 2; Stage 2 writer should reference "mortgage assumption = SDLT on debt assumed under FA 2003 Sch 4 para 8" with a note to verify verbatim wording at legislation.gov.uk.

**Status:** CLOSED (Stage 1b 2026-07-08)

---

## F-12 — HOUSE_POSITION_EXTENSION — TCGA 1992 s.62(1) probate base cost (CGT on inherited property) — no dedicated HP lock

**CLOSED 2026-07-08 Stage 1b: locked as HP §39 (s.62(1)/(4) verified; PR 24% rate commencement flagged verify-at-write).**

**Raised by:** Stage 1 sub-agent Session A, 2026-07-08, during A8 seed brief (cgt-on-inherited-property-uk-probate-base-cost).

**Issue:** §5 covers CGT rates, 60-day reporting, and personal representative rate (24%) but contains no locked position on s.62(1) itself: the rule that a legatee's CGT acquisition cost is the market value at the date of death (probate/IHT value), NOT the original purchase price. The IHT/CGT interaction (IHT probate value = CGT base cost; no double-charge on the same uplift) is also unanchored.

**Required action (manager at Stage 1b):** Add a §5.A (CGT on inherited property — s.62 mechanics) covering: (a) s.62(1) statutory bright-line: base cost = market value at date of death; (b) personal representative vs. legatee disposal paths; (c) PR rate 24% vs. beneficiary rates 18%/24%; (d) 60-day return: applies only where UK land sold and tax is due — not automatically from the estate, only once the legatee has disposed; (e) deed of variation cross-reference (§22.2 already locked).

**Blocking:** Does not block A8 Stage 2; Stage 2 writer to verify s.62(1) verbatim at legislation.gov.uk.

**Status:** CLOSED (Stage 1b 2026-07-08)

---

## F-13 — HOUSE_POSITION_EXTENSION — CGT FX base-cost conversion and 60-day non-application to overseas property (NEW LOCK NEEDED)

**CLOSED 2026-07-08 Stage 1b: locked as HP §39. s.252 attribution was WRONG — corrected to Bentley v Pike / Capcount Trading per CG78310; 60-day return confirmed UK-land-only; A9 Stage 2 must strip s.252 from the brief.**

**Raised by:** Stage 1 sub-agent Session A, 2026-07-08, during A9 seed brief (cgt-overseas-property-uk-residents-foreign-disposals).

**Issue:** §10 covers the DTA framework and foreign tax credit at a general level; §16 covers DTA article map. Neither locks the operational mechanics for a UK resident computing CGT on an overseas property disposal: (a) TCGA 1992 s.252 foreign-currency conversion rule (acquisition cost converted at acquisition-date spot rate; disposal proceeds at disposal-date spot rate — creating an embedded FX component in the gain); (b) explicit confirmation that the 60-day UK property return does NOT apply to overseas disposals (overseas gains go on the annual SA return only); (c) SA108 + foreign supplementary pages as the correct reporting path.

**Required action (manager at Stage 1b):** Add §10.A (or extend §16) locking the three mechanics above, with s.252 TCGA 1992 as the primary citation for FX conversion. Also lock: treaty credit relief for foreign CGT is credit (not exemption) under TIOPA 2010 s.18 — this is already implied by §16.3 but should be made explicit for the overseas-disposal context.

**Blocking:** Does not block A9 Stage 2; Stage 2 writer to WebFetch s.252 TCGA 1992 and TIOPA 2010 s.18 verbatim.

**Status:** CLOSED (Stage 1b 2026-07-08)

---

## F-21 — HOUSE_POSITION_EXTENSION — Serviced accommodation trading test for BADR (NEW LOCK NEEDED)

**CLOSED 2026-07-08 Stage 1b: locked as HP §5.A (s.169S trade test, no post-FHL deeming, BPR analogy caveat, FA 2025 s.8 rate path verified verbatim).**

**Raised by:** sub-agent S1-NRL-MISC, 2026-07-08, during A2 seed brief (business-asset-disposal-relief-residential-property-qualification).

**Issue:** House positions §5 and §6 lock BADR rates and FHL abolition but contain no locked position on whether serviced accommodation operations (non-FHL short-lets with substantial services) can meet the TCGA 1992 s.169S "trading company" / s.169I trading test for BADR purposes post-FHL abolition (6 April 2025). This is the primary edge-case readers of the A2 page will search for.

**Required action (manager at Stage 1b):** Establish and lock the house position on the trading/investment distinction for short-let property operations post-FHL abolition. If the position cannot be cleanly locked (fact-dependent), lock the framing: "depends on level of services rendered; cite HMRC BIM22000+ indicators; advise specialist review."

**Blocking:** Does not block A2 seed or Stage 2; Stage 2 writer should use cautious framing pending this lock.

**Status:** CLOSED (Stage 1b 2026-07-08)

---

## F-22 — HOUSE_POSITION_EXTENSION — FA 2024 lump-sum allowance architecture for SIPP in-specie contributions (NEW LOCK NEEDED)

**CLOSED 2026-07-08 Stage 1b: locked as HP §40 (LSA £268,275 s.637P / LSDBA £1,073,100 s.637R verified verbatim; s.182 borrowing formula; Sch 29A + ss.208-209 charges).**

**Raised by:** sub-agent S1-NRL-MISC, 2026-07-08, during A12 seed brief (buying-commercial-property-through-a-sipp).

**Issue:** House position §22.21 (SIPP/SSAS commercial property lock) references the lifetime allowance abolition and instructs sessions to use the FA 2024 lump-sum allowance (LSA) and lump-sum-and-death-benefit allowance (LSDBA) architecture. However, §22.21 does not itself lock the FA 2024 provision numbers, the quantum of LSA/LSDBA, or the interaction with in-specie commercial property contributions. This gap means Stage 2 writers lack a house-position anchor for the in-specie contribution mechanics at the allowance level.

**Required action (manager at Stage 1b):** Extend §22.21 (or add §22.21A) locking: (a) FA 2024 provision numbers for LSA and LSDBA; (b) LSA quantum (£268,275) and LSDBA quantum (£1,073,100) — verify at legislation.gov.uk; (c) how in-specie contribution of commercial property interacts with the annual allowance (£60,000 per §8) vs the lump-sum allowances (which govern tax-free cash / death benefits, not contribution limits).

**Blocking:** Does not block A12 Stage 2; Stage 2 writer should note "in-specie contributions are subject to the annual allowance of £60,000 (§8); the FA 2024 lump-sum allowances govern tax-free cash and death-benefit mechanics, not the contribution itself" and flag this for HP lock.

**Status:** CLOSED (Stage 1b 2026-07-08)

---

## F-61 — AUTHORITY_GAP — HMRC IHT manual (IHTM13000 series) not yet updated for FA 2025 LTR architecture

**Raised by:** S2-NRL-MISC, 2026-07-08. Brief: non-resident-landlords-uk-inheritance-tax-exposure.
**Issue:** IHTM13000 domicile series was written for the pre-FA-2025 domicile regime and still references "deemed domicile" (s.267) language, which was abolished from 6 April 2025. Writer must use legislation.gov.uk ss.6A-6C IHTA 1984 as primary authority for the LTR test; not cite IHTM13024 as current operative guidance.
**Required action:** When HMRC updates IHTM13000 series to reflect FA 2025, update the NRL IHT page's authority references accordingly. Until then, cite statute directly.
**Blocking:** No. HP §22.X is the operative lock.
**Status:** open

---

## F-62 — AUTHORITY_GAP — HMRC BADR guidance page URL returning HTTP 404

**Raised by:** S2-NRL-MISC, 2026-07-08. Brief: business-asset-disposal-relief-residential-property-qualification.
**Issue:** https://www.gov.uk/guidance/business-asset-disposal-relief returned HTTP 404 at Stage 2. URL may have moved. Writer must WebFetch at write time to locate current HMRC BADR guidance and confirm 18% rate from 6 April 2026 matches HP §5.A (FA 2025 s.8).
**Required action:** Writer locates current HMRC BADR guidance URL and verifies rate figure. If HMRC publishes a rate inconsistent with HP §5.A, raise a fresh HP drift flag immediately.
**Blocking:** No. HP §5.A (manager-sourced from FA 2025 s.8 legislation.gov.uk) is the operative lock.
**Status:** open -- both gov.uk URLs confirmed 404 again at write time 2026-07-09; rate written as 18% from 6 April 2026 per HP §5.A

---

## F-31 — HOUSE_POSITION_EXTENSION — VAT Sch 8 Grp 5 conversion-sale zero-rate + s.35 DIY Builders Scheme not in §29

**CLOSED 2026-07-08 Stage 1b: locked as HP §29.13 (Grp 6 vs Grp 7 boundary fixed — 2-year-empty belongs to Grp 7; Sch 8 Grp 5 Item 1(b) verbatim; s.35 DIY).**

**Raised by:** Stage1-A (seed brief A4)
**Date:** 2026-07-08
**Status:** open

§29 (VAT architectural anchor, house_positions) covers the 5% reduced rate on conversion services (Sch 7A Grp 6) and the OTT framework (Sch 10) but does NOT yet extend to:

1. **VATA 1994 Sch 8 Grp 5 Item 1** — zero-rate first grant of a major interest in a dwelling arising from a non-residential-to-residential conversion (the developer-sale zero-rate). §29.1 lists Sch 8 Grp 5 as "construction of dwellings" generically but the conversion-sale sub-condition (Item 1 + relevant Notes) is not locked.
2. **VATA 1994 s.35 + SI 1995/2518 reg 201** — DIY Builders Scheme VAT refund for self-converters (non-residential conversion to dwelling). Not referenced anywhere in §29.

Stage 2 for A4 must WebFetch both provisions verbatim and should NOT write body content on these points until manager confirms HP extension or grants per-write-verify authority.

**Manager action needed:** extend §29 with a §29.13 covering Sch 8 Grp 5 conversion-sale zero-rate mechanics and §29.14 covering s.35 DIY scheme, OR grant Stage 2 per-write-verify authority on these two sub-topics with a flag-back instruction.

---

## F-32 — HOUSE_POSITION_EXTENSION — ITTOIA 2005 Part 6A property allowance (ss.783B-783BQ) not in house_positions

**CLOSED 2026-07-08 Stage 1b: locked as HP §41 (exclusions are ss.783BN/BO/BP, NOT s.783BM; A5 Stage 2 must use corrected sections).**

**Raised by:** Stage1-A (seed brief A5)
**Date:** 2026-07-08
**Status:** open

No §-ref in house_positions covers the £1,000 property income allowance (ITTOIA 2005 Part 6A ss.783B-783BQ, inserted by FA 2017 s.17). Key points that need locking before Stage 2 body write:

1. Whether the allowance applies to FHL income post-abolition of the FHL regime (April 2025). If former FHL income now falls under property business income, it may qualify.
2. The s.24 / partial-relief interaction: under partial relief (s.783BE/BF), the landlord deducts £1,000 instead of actual expenses. Whether the s.24 basic-rate credit is still claimable on top of the partial-relief deduction is not obvious from the statute.
3. The "blocked cases" employer/own-company payer condition (ss.783BJ-783BK) — exact scope.

**Manager action needed:** add §29.X (or a new standalone §-ref, e.g. §30) covering the property allowance mechanics, or grant Stage 2 per-write-verify authority with a flag-back on the two ambiguous interaction points above.

---

## F-41 -- INTERNAL_LINK -- fic-estate-planning page should back-link to A1 pillar (portfolio-landlord-tax-planning-strategy-guide)

**Raised by:** Stage 2 sub-agent Session A (S2-ENTITY), 2026-07-09, during A1 full-brief extension.

**Issue:** The existing page `fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics` covers IHT value-freeze mechanics for a FIC. It has no internal link to the new Wave 10 pillar `portfolio-landlord-tax-planning-strategy-guide`, which is the integrating strategy page for the whole portfolio cluster. The pillar needs back-links from existing adjacent pages to signal cluster authority.

**Required action (back-patch at wave-close):** Add a one-line cross-link signpost to `portfolio-landlord-tax-planning-strategy-guide` in the existing fic-estate-planning page -- e.g. in the intro or a "see also" section.

**Blocking:** Does not block. Back-patch at step 6 of WRAP.

---

## F-42 -- BRIEF_DRIFT -- CA 2006 s.629 cited as "variation of class rights" in Stage 1 A10 seed brief -- WRONG

**Raised by:** Stage 2 sub-agent Session A (S2-ENTITY), 2026-07-09, during A10 (family-investment-company-mechanics-share-classes-property) brief extension.

**Issue:** The Stage 1 seed brief for A10 (family-investment-company-mechanics-share-classes-property) cited CA 2006 s.629 as the provision governing variation of class rights. WebFetch of legislation.gov.uk/ukpga/2006/46/section/629 (confirmed HTTP 200 2026-07-09) shows s.629 is headed "Classes of shares" -- a definitional provision (shares are of one class if rights are in all respects uniform). The variation-of-class-rights provision is CA 2006 **s.630** ("Variation of class rights: companies having a share capital" -- confirmed HTTP 200: requires 75% written consent or special resolution of the class). The Stage 2 brief for A10 has been corrected throughout to cite s.630.

**Required action:** No action needed on the Stage 1 seed brief (Stage 2 correction sufficient). RUN-phase writer for A10 must cite s.630 (not s.629) for variation of class rights.

**Blocking:** Does not block; corrected in Stage 2 brief.

---

## F-51 — INTERNAL_LINK — non-resident CGT reverse-flow page returned 404

**CLOSED 2026-07-09 Stage 2b: NOT a dead page — non-resident-cgt-selling-uk-property-overseas-guide exists (category Non-Resident Landlord Tax). The 404 was an un-nested URL guess; internal links must use /blog/<category-slug>/<slug>. Writers: use nested path; link audit enforces.**

**Raised by:** Stage 2 sub-agent S2-CGT-IHT (Session A), 2026-07-09, during A9 full-brief extension (cgt-overseas-property-uk-residents-foreign-disposals).

**Issue:** The slug `non-resident-cgt-selling-uk-property-overseas-guide` returned HTTP 404 (checked 2026-07-08). This page is either unpublished, at a different URL, or deleted. The overseas-property brief references the reverse-flow page for the cannib guard (directional contrast between UK resident selling overseas vs. non-UK resident selling UK property). The brief cannot link to the reverse-flow page until a live URL is confirmed.

**Required action (manager):** Confirm whether the non-resident CGT page is live at a different slug. If yes, update brief. If not yet published, flag as a future pick and note "coming soon" in the brief.

**Blocking:** No.

---

## F-52 — INTERNAL_LINK — IHT 7-year clock gifting page returned 404

**CLOSED 2026-07-09 Stage 2b: NOT a dead page — iht-7-year-clock-property-gifting-mid-life-landlord-strategy exists (category Landlord Tax Essentials). Same nested-path correction as F-51.**

**Raised by:** Stage 2 sub-agent S2-CGT-IHT (Session A), 2026-07-09, during A11 full-brief extension (gifting-property-and-deed-of-gift-tax-implications).

**Issue:** The slug `iht-7-year-clock-property-gifting-mid-life-landlord-strategy` returned HTTP 404 (checked 2026-07-08). The gifting brief intended to cross-link to this page for the deeper IHT / taper maths. The IHT section in the gifting brief has been made self-contained as a result. If the 7-year clock page exists at a different URL, update the brief's internal link.

**Required action (manager):** Confirm live slug or confirm page does not yet exist (future pick).

**Blocking:** No.

---

## F-53 — CROSS_BUCKET — existing CGT gifting page should back-link to new gifting deed-of-gift page

**Raised by:** Stage 2 sub-agent S2-CGT-IHT (Session A), 2026-07-09, during A11 full-brief extension.

**Issue:** `cgt-gifting-property-family-members-uk` (verified live, HTTP 200) covers CGT mechanics on property gifts in depth. It does NOT link to the new `gifting-property-and-deed-of-gift-tax-implications` page, which is the companion multi-tax (CGT + IHT + SDLT + income) guide with the deed-of-gift as the lens. Once the new page is published, the existing CGT gifting page should back-link to it under a label such as "For the IHT, SDLT and GROB dimensions of gifting, see: Gifting Property and Deed of Gift: Tax Implications."

**Required action (manager):** Back-patch `cgt-gifting-property-family-members-uk` at wave-close step 4.

**Blocking:** No.

---


---

## F-111 — CROSS_BUCKET — portfolio-landlord-tax-planning-strategy-guide does not yet exist in worktree

**Raised by:** RUN-phase writer, A7, 2026-07-09.

**Issue:** A7 (`starting-property-business-sole-trader-vs-ltd-vs-partnership`) links into `/blog/portfolio-management/portfolio-landlord-tax-planning-strategy-guide` (wave-internal pillar, A1). The file is not present in the worktree branch. The link is included in the page body (scale decision table, 10+ properties row). If A1 is not deployed before A7, this link will 404.

**Required action (manager):** Confirm A1 is committed in the same worktree branch before wave merge, or remove the link at WRAP if A1 is deferred. Back-patch once A1 is live.

**Blocking:** No. Link included as forward-reference per brief instruction.

**Status:** open

---

## F-112 — CROSS_BUCKET — profit-extraction slug mismatch: brief vs live page

**Raised by:** RUN-phase writer, A7, 2026-07-09.

**Issue:** The A7 brief references cross-link target `profit-extraction-buy-to-let-limited-company-salary-dividends`. The live page in the worktree is `property-company-profit-extraction-salary-vs-dividends` (a different slug). A7 does not link to the profit-extraction page directly in body (deferred to brief's optional cross-link). The link was omitted from A7 body to avoid a dead slug. If A6 (brief slug `profit-extraction-buy-to-let-limited-company-salary-dividends`) is published at that slug, back-patch the A7 body to add it.

**Required action (manager):** Confirm the slug for the A6 profit-extraction page once committed. Back-patch A7 body at WRAP to add the cross-link once confirmed.

**Blocking:** No. A7 page cross-links to BTL limited company complete guide instead, which is the higher-authority target.

**Status:** open

---

## F-113 — BRIEF_NOTE — A7 body word count exceeds 3,500 target (5,478 words)

**Raised by:** RUN-phase writer, A7, 2026-07-09.

**Issue:** The brief's format spec requests 10 H2 sections, worked comparison tables at two rent levels, a partnership worked example, an SDLT incorporation worked example, 12-13 FAQ answers in frontmatter AND 13 inline FAQ H3s in body. Executing all elements produces approximately 5,478 words. The stated 2,800-3,500 target cannot be met while including all format-spec elements. All content is substantive and directly instructed by the brief; no padding present.

**Required action (manager):** Accept current word count, or identify specific sections to trim at WRAP review.

**Blocking:** No. Content is complete and accurate.

**Status:** open


## F-81 -- CROSS_BUCKET -- A6 and A10 internal link targets not yet written at A1 RUN time

**Raised by:** RUN-phase writer A1, 2026-07-09.

**Issue:** A1 (portfolio-landlord-tax-planning-strategy-guide) links out to profit-extraction-buy-to-let-limited-company-salary-dividends (A6) and amily-investment-company-mechanics-share-classes-property (A10) using nested canonical paths. At the time A1 was committed neither file existed in the worktree (both A6 and A10 are other parallel wave-10 agents). The links are pre-written correctly and will resolve once A6 and A10 are merged.

**Required action:** Verify at WRAP merge that both A6 and A10 slugs match exactly: profit-extraction-buy-to-let-limited-company-salary-dividends and amily-investment-company-mechanics-share-classes-property. Correct A1 body links if slugs differ.

**Blocking:** No. Links will resolve post-merge.

---

## F-82 -- BRIEF_DRIFT -- SDLT internal link target slug mismatch

**Raised by:** RUN-phase writer A1, 2026-07-09.

**Issue:** The A1 brief specified internal link to -complete-guide-to-stamp-duty-land-tax-uk for the SDLT-on-transfer section. That file does not exist in the blog corpus. A1 used incorporating-property-portfolio-uk-2026 (confirmed live) as the closest alternative covering SDLT on portfolio incorporation. The brief target slug should be corrected or a dedicated SDLT guide page added to the pipeline.

**Required action (manager):** Confirm whether -complete-guide-to-stamp-duty-land-tax-uk is planned as a future pick or whether incorporating-property-portfolio-uk-2026 is the correct standing target.

**Blocking:** No.

---

## F-83 -- BRIEF_DRIFT -- ATED 2026/27 indicative figures in brief were pre-uplift

**Raised by:** RUN-phase writer A1, 2026-07-09.

**Issue:** The Stage 2 brief for A1 provided indicative ATED 2026/27 figures in the worked-example table (e.g. £4,400 for the £500k-£1m band). Writer verified current-year figures at gov.uk per brief instruction. Verified 2026/27 figures (1 April 2026 to 31 March 2027) are higher across all bands: £4,600 / £9,450 / £32,200 / £75,450 / £151,450 / £303,450. Page uses verified figures throughout. Brief indicatives were approximately 3-5% lower than the enacted 2026/27 amounts (CPI uplift).

**Required action:** No action needed. Page is correct. Brief indicative figures can be updated for reference at stage-2 refresh if needed.

**Blocking:** No.

---
---

## F-91 — AUTHORITY_GAP — HMRC IHT manual lag confirmed at write time (cross-ref F-61)

**Raised by:** RUN-phase writer, A3, 2026-07-09.
**Issue:** Confirmed at write time that IHTM13000 series still uses pre-FA-2025 domicile/deemed-domicile framing. Page cites legislation.gov.uk ss.6, 6A, 6B, Sch A1, s.18, s.48ZA, s.267ZC and FA 2025 s.44+Sch 13 directly. No IHTM pages cited as authority for LTR test. Cross-ref F-61 (open).
**Blocking:** No.
**Status:** open

---

## F-92 — INTERNAL_LINK — iht-non-resident-uk-property-april-2025-residence-test should back-link to A3

**Raised by:** RUN-phase writer, A3, 2026-07-09.
**Issue:** The existing page `iht-non-resident-uk-property-april-2025-residence-test` covers the LTR regime generally. It does not link to the new A3 page which is the property-investor-specific companion. A bi-directional link set is in place from A3's body to the existing page; the back-link from the existing page to A3 needs a back-patch at wave-close.
**Required action:** Back-patch `iht-non-resident-uk-property-april-2025-residence-test` at wave-close step 4 with a link to A3.
**Blocking:** No.
**Status:** open

---

## F-141 — CANNIBAL — A6 profit-extraction page PULLED at WRAP cannib gate (conductor ruling 2026-07-09)

A6 (profit-extraction-buy-to-let-limited-company-salary-dividends) h2 set = union of two LIVE siblings: property-company-profit-extraction-salary-vs-dividends (routes, DLA-vs-dividend, pension, spouse) + salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis (worked examples by profit band £30k-£125k). No surviving distinct angle. Page held on branch worktree-agent-aadc976bff0a3d46e, NOT merged. Topic rejected in blog_topics. Root cause: discovery collision-verify compared only vs buy-to-let-limited-company-complete-guide-uk; add sibling-sweep to next-cycle verify. A1/A7 links to the A6 slug repointed at WRAP to the live extraction page.

**Status:** CLOSED (pull executed)
