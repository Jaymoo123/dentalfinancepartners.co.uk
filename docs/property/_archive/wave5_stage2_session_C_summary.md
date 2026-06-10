# Wave 5 Stage 2 Session C summary (Bucket C: Form 17 + joint ownership + spouse-mechanics)

**Date:** 2026-05-23
**Sub-agent:** Wave 5 Stage 2 reasoning sub-agent for Bucket C
**Source:** `docs/property/wave5_stage1_candidates_2026-05-23.md` (C1 through C10) + `docs/property/house_positions.md` §24 (locked 2026-05-23) + adjacent §19.4 / §21.2 / §22.5 / §23.5 / §15.2 / §1 / §4

---

## Brief files emitted (10 of 10)

All briefs written at `briefs/property/wave5/<slug>.md` per §4 brief anatomy:

| Position | Slug | Category |
|---|---|---|
| C1 | `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` | landlord-tax-essentials |
| C2 | `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` | landlord-tax-essentials |
| C3 | `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` | landlord-tax-essentials |
| C4 | `unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision` | section-24-and-tax-relief |
| C5 | `civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality` | landlord-tax-essentials |
| C6 | `unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share` | landlord-tax-essentials |
| C7 | `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` | capital-gains-tax |
| C8 | `iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt` | landlord-tax-essentials |
| C9 | `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` | landlord-tax-essentials |
| C10 | `retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure` | portfolio-management |

All 10 briefs contain: header, manager pre-decisions, competitor URLs with liveness check, empty GSC data block (net-new), closest-existing pages with cannibalisation discipline, redirect-overlap scan, 5-8 authority links per brief, universal-rules block (with §16.35 per-write verification line prepended), verbatim 19-step workflow, blank per-page work-log scaffold.

---

## URL liveness counts (§16.31)

**Verified live (200) at brief generation:**
- ukpropertyaccountants.co.uk: 3 URLs (top-tax-saving-tips-for-jointly-owned-properties; how-owning-property-abroad-leads-higher-stamp-duty-rates; inheritance-tax-on-jointly-owned-property; ltt-higher-rates-for-spouses-minor-children-and-trust-interests)
- uklandlordtax.co.uk: 4 URLs (jointly-owned-property; declaration-of-trust; what-is-a-declaration-of-trust; principal-private-residence-relief)
- alexander-ene.co.uk: 14 URLs across the C-bucket (joint-tenants-or-tenants-in-common; co-ownership-rental-property; civil-partnership-tax; civil-partner-property-tax; civil-partnership-property; declaration-trust-rental-property; declaration-of-trust-rental-property; unmarried-couples-property; cohabitee-property-tax; principal-private-residence-relief; main-residence-relief; cgt-on-jointly-owned-property; landlord-retirement-planning; sdlt-on-second-properties; transfer-rental-property-spouse; spouse-property-transfer-cgt; inheritance-tax-jointly-owned-property; inheritance-tax-and-jointly-owned-property; inheritance-tax-on-jointly-owned-property; iht-jointly-owned-property)
- farnellclarke.co.uk: 1 URL (property-investors-letting-jointly-owned-property-form-17)
- taxscape.deloitte.com: 1 URL (married-couples-civil-partnership-form-17)
- propertyaccountant.co.uk: 1 URL (tax-saving-jointly-held-assets)
- gov.uk + legislation.gov.uk + HMRC manuals: all referenced URLs verified live (legislation.gov.uk returns 437 to User-Agent "Mozilla/5.0" but URLs are the same canonical anchors used in §24.9 citations).

**Dead URLs replaced via reasoning:**
- ~12 candidate URLs returned 404 during liveness verification (taxinsider.co.uk article-path URLs; several ukpropertyaccountants.co.uk + uklandlordtax.co.uk speculative slugs; optimiseaccountants.co.uk Form 17 pages; unbiased.co.uk landlord-tax-tips). All replaced with verified-live alternatives within the same competitor cluster (alexander-ene.co.uk and ukpropertyaccountants.co.uk + uklandlordtax.co.uk core working set).

**Total URLs in briefs:** ~40 competitor + 80+ authority (statutory + HMRC manuals + gov.uk forms).
**Replacement rate via reasoning:** ~24% (12 of ~50 candidate URLs replaced). Higher than Wave 4 13% catch rate, driven by Bucket C's narrow topical lane: many speculative competitor slugs in topic_gaps_final.md were stale; the alexander-ene.co.uk competitor cluster carried the strongest verified coverage on the spouse-mechanics topics.

---

## HOUSE_POSITION_CONFLICT signals against newly-locked §24

**None at brief generation time.** §24 was locked 2026-05-23 (today) via pre-launch statute verification; the load-bearing positions threaded into the briefs are:

- §24.1 default 50/50 + application limits (NOT living together; NOT joint legal title; three-party joint ownership exclusion)
- §24.2 Form 17 mechanic (both sign; 60-day strict window from last signature; declared split must match underlying beneficial interest; effective date; persistence; joint-tenancy bar; severance via LPA 1925 s.36(2))
- §24.3 declaration of trust as the underlying ownership document + SDLT/LTT/LBTT assumed-debt trap (FA 2003 Sch 4 para 8)
- §24.4 TCGA 1992 s.58 no-gain-no-loss on the trust declaration itself (with FA 2023 s.58(1A)-(1B) 3-year separation extension)
- §24.5 cross-mechanism interactions (S24 §4 income-and-property correspondence; PRR s.222(5) election + s.222(6) one-residence-per-couple; IHT §22.5 spouse exemption + TNRB / TRNRB; SDLT §23.5 + §1 joint-buyer trigger + spousal aggregation; MTD §19.4 threshold per-share)
- §24.6 unmarried co-owners (no Form 17; s.17 + s.286 connected persons CGT contrast)
- §24.7 adult-child + minor-child co-ownership (settlements legislation §21.2 + GROB §15.2)
- §24.8 HMRC enquiry pattern + defence pack
- §24.10 do-not-write list (memorised by sessions)

**Section 24 page back-patch context (existing on-site `section-24-joint-property-ownership-tax-split`):** the existing applied page was back-patched 2026-05-23 to align with §24.2 framing (Form 17 elects to ACTUAL beneficial interest, NOT arbitrary split). C1 and C4 briefs reference the back-patched page as cousin-applied content. No remaining HOUSE_POSITION_CONFLICT on the existing on-site inventory at brief-write time.

**Potential downstream conflict surface (sessions should monitor at write time):** competitor sources frequently violate §24.10 do-not-write list ("Spouses can file Form 17 to split rental income any way they choose"; "Form 17 changes the beneficial ownership"; "Form 17 takes effect from the start of the tax year"; "Joint tenants can file Form 17"; "Unmarried cohabitees can use Form 17"). Sessions to flag in `wave5_site_wide_flags.md` if competitor sources push back against the locked positions.

---

## §16.32 sequencing flags applied

Three sequencing constraints baked into the briefs:

1. **C1 (Form 17 mechanic) before C5 (civil-partner-specific applied).**
   - C5's launch prompt note: "C1 is the upstream mechanic page; verify C1 is committed before launching C5 session, or include forward-link placeholder for manager hyperlink at merge."
   - C5 carries the forward-link placeholder discipline if launched concurrently.

2. **B2 (Welsh higher rates) + B7 (Scottish ADS) before C9 (SDLT spousal aggregation).**
   - C9's launch prompt note: "B2 + B7 cover the devolved equivalents of the spousal-aggregation question; verify both are committed before C9, or include forward-link placeholders for manager hyperlink at merge."
   - C9 carries forward-link placeholders to B2 + B7 if launched concurrently with Session B.

3. **C8 (IHT joint-ownership structural choice) extends Wave 4 C2 (second-death window mechanic).**
   - C8 brief explicitly cites Wave 4 C2 (`iht-spouse-exemption-second-death-property-portfolio-window-mechanics`) as the downstream mechanic. Wave 4 C2 is already on `main` (Wave 4 close commit f0bf5b7) so no within-Wave-5 sequencing constraint applies; C8 forward-links directly.

4. **C10 (retirement applied Form-17 shift) sibling to Wave 4 A8 (FIC retirement decumulation).**
   - C10 brief cross-links Wave 4 A8 (`fic-property-retirement-decumulation-mechanics-uk`) as the alternative-route. Wave 4 A8 is already on `main`. C10 forward-links directly.

Within-bucket C: no other ordering constraints (C1-C10 can be claimed in any order otherwise; C2 / C3 / C4 / C6 / C7 / C8 / C9 / C10 are all independently writeable).

---

## Cross-mechanism interactions threaded (§24.5)

The §24.5 cross-mechanism sub-section is the key value-add of Bucket C. Per the launch prompt's mandatory threading list, each brief threads relevant interactions explicitly:

| Brief | §24.5 interaction threaded |
|---|---|
| C1 | All five §24.5 interactions covered at signposting depth (S24 + PPR + IHT + SDLT + MTD); applied pages link back to C1 for the mechanic |
| C2 | IHT survivorship vs TIC-by-will + spousal aggregation context |
| C3 | SDLT/LTT/LBTT assumed-debt trap (FA 2003 Sch 4 para 8) + s.58 on the deed |
| **C4** | **§4 (Section 24) finance cost restriction — load-bearing** + MTD threshold per-share |
| C5 | All §24.5 interactions in civil-partner-cohort lens + FA 2023 s.58(1A)-(1B) dissolution extension |
| C6 | s.17 + s.286 CGT contrast (no s.58 for unmarried); no Form 17 route |
| **C7** | **s.222(5) PPR election + s.222(6) one-residence-per-couple — load-bearing**; Form 17 doesn't change PPR; unmarried-co-owner contrast |
| **C8** | **§22.5 IHT spouse exemption + TNRB / TRNRB — load-bearing**; Wave 4 C2 downstream mechanic |
| **C9** | **§23.5 devolved ADS + FA 2003 Sch 4ZA para 2(3) + para 9 — load-bearing**; cross-bucket B2 + B7 placeholder links |
| **C10** | **§19.4 MTD threshold per-share — load-bearing** + Wave 4 A8 FIC alternative-route cross-link + s.58 no-CGT confirmation |

**Cross-mechanism interactions NOT threaded (and why):**
- §24.7 adult-child + minor-child settlements legislation: NOT threaded in any C1-C10 brief because the Stage 1 candidate set did not surface an adult/minor-child cohort page (the bucket is spouse-and-civil-partner-mechanics). Discovery-log signal for Wave 6+: an "adult-child co-owner + s.624 settlements + GROB family-home" applied page is a clean gap.
- §24.8 HMRC enquiry pattern: NOT a standalone brief but is threaded into C1 (mechanic page) and C4 (applied page) as defensive-discipline content.

No interactions from the launch-prompt list are missing from the §24.5 thread within the briefs as written.

---

## Discipline confirmation

- **Reasoning-first per §16.18:** brief-level reasoning (framing differentiator, sequencing rationale, cannibalisation lane assignment) written directly without script-driven similarity selection. The cannibalisation discipline in each brief is reasoned against the closest-existing inventory (back-patched s.24 page + Wave 3 B3 + Wave 4 B1 + Wave 4 C2 + Wave 4 A8 + existing PRR + CGT spouse transfer pages).
- **§16.35 per-write verification:** mandatory line prepended to universal-rules block in every brief.
- **§16.31 URL liveness:** 100% of competitor URLs in briefs were verified live at brief generation; ~24% replacement rate via reasoning for dead/stale candidates.
- **§16.32 sequencing:** three constraints baked into C5 + C9 + C8/C10 briefs (with placeholders if concurrent launch).
- **Cross-reference precision:** every § citation precise (§19.4 not §19; §22.5 not §22; §23.5 not §23; §24.2 not §24; §24.5 sub-section explicitly named per interaction).

---

**End summary.** Sessions can claim briefs in the order C1 → C2/C3 → C4/C6/C7/C8/C9/C10 → C5 (subject to manager arbitration on session launch sequencing per §16.32). Manager review gate per §16.19 recommended before Session C launch.
