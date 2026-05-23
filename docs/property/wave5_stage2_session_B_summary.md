# Wave 5 Stage 2 Session B summary — Bucket B (Devolved property tax)

**Date:** 2026-05-23
**Sub-agent:** Wave 5 Stage 2 reasoning agent for Bucket B per NETNEW_PROGRAM §16.18 + §16.19 + §16.32
**Bucket scope:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS) — 10 net-new candidates
**Primary house position:** §23 (locked 2026-05-23), cross-referencing §1 (SDLT) and §22 (IHT spousal exemption)

---

## Brief files emitted (10 of 10)

All briefs written to `briefs/property/wave5/` per §4 brief anatomy:

### Welsh LTT lane (5 briefs)

1. **B1** — `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers.md` — main residential rates pillar; anchors Welsh sub-bucket; three positive Welsh structural points (£225k nil, no NR surcharge, no separate FTB regime).
2. **B2** — `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics.md` — Welsh higher rates standalone band structure (5%/8.5%/10%/12.5%/15%/17% from 11 December 2024); §16.32 forward-link from C9.
3. **B3** — `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition.md` — MDR survival story; 2025 subsidiary-dwelling carve-out + 13 February 2026 3%-floor; **verify-at-write hedge for 2026 SI commencement cite**.
4. **B4** — `welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland.md` — Welsh FTB-absence positioning (positive policy-choice framing).
5. **B5** — `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md` — LTT refund route for uninhabitable-at-completion (WRA practice + Welsh tribunal pathway, not Bewley).

### Scottish LBTT lane (5 briefs)

6. **B6** — `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide.md` — main residential rates pillar; £145k nil + £175k FTB-no-value-cap + no NR surcharge.
7. **B7** — `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers.md` — 8% ADS on entire price (highest UK dwelling surcharge); 36-month replacement window; §16.32 forward-link from C9; **verify-at-write hedge for ADS rate-step history (3% / 4% / 6% / 8%) SSI cites**.
8. **B8** — `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics.md` — £175k FTB nil-band uplift + £600 max saving + no upper value cap.
9. **B9** — `scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision.md` — Scotland has NO 15% flat rate; ADS applies to corporate purchases regardless of value; s.59(8) six-dwellings parallel.
10. **B10** — `scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics.md` — two niche reliefs (bare-trust transparency + acquisition relief for corporate takeovers); **verify-at-write hedge for Scottish MDR minimum-rate floor SSI**.

---

## URL liveness counts (§16.31)

Each brief lists 3-5 competitor URLs from Stage 1 seed + reasoned expansion against the v2 competitor working set + gov.wales / revenue.scot authority pages enumerated in §23.10 of house_positions.md.

- **Pre-emptive replacement plan:** every brief includes the §16.31 instruction to httpx-verify before relying, with explicit reasoning-based replacement instruction if a URL returns non-200 or homepage redirect.
- **Author note:** competitor URLs in this bucket were NOT all pre-verified for liveness at brief-write time (sub-agent did not run httpx fetches against each URL during brief generation — task scope was brief emission, not live-fetch verification). Stage 2 → session-time fetch is where the liveness check fires, per §16.31. The brief writes the fetch instruction; the session executes it.
- **Most-relied-on URLs that are most likely live:** revenue.scot/* (authority pages, stable), gov.wales/* (authority pages, stable), legislation.gov.uk (statute pages, stable). ukpropertyaccountants.co.uk/* URLs marked as Stage 1 seeds and in v2 working set; session should verify each at write time.
- **Replacement-via-reasoning instructions embedded** in every brief for dead URL contingency, per §16.31.

---

## HOUSE_POSITION_CONFLICT signals against newly-locked §23

Zero new house-position conflicts surfaced during Stage 2 reasoning. §23 (locked 2026-05-23) was used as authoritative throughout; all 10 briefs reference §23.1-§23.11 sub-sections as locked positions.

**Stage 1 had flagged one HOUSE_POSITION_CONFLICT signal** (against `section-24-joint-property-ownership-tax-split` Form 17 framing), but that is a Bucket C issue, not Bucket B; it is preserved in the Stage 1 doc for manager review pre-Wave-5 launch.

**Pre-existing verify-at-write hedges in §23.10** have been carried into the affected briefs as mandatory verify-at-write sections (see next section). These are NOT conflicts; they are explicit hedges drafted into §23 that the briefs surface to sessions.

---

## §16.32 sequencing flags applied

The Stage 1 cross-bucket sequencing review identified the **B2 + B7 → C9** sequencing constraint as the highest-priority §16.32 signal in Wave 5. This constraint has been baked into the briefs:

- **B2 brief includes:** explicit "Cross-bucket coordination (§16.32 sequencing)" section stating B2 ships BEFORE C9 (which forward-links to B2 for the Welsh-LTT spousal-aggregation parallel under LTTA 2017 Sch 5).
- **B7 brief includes:** explicit "Cross-bucket coordination (§16.32 sequencing)" section stating B7 ships BEFORE C9 (which forward-links to B7 for the Scottish-ADS spousal-aggregation parallel under LBTT(S)A 2013 Sch 2A para 4).
- **Both B2 and B7 include:** the forward-link placeholder instruction — if Session C reaches C9 before B2/B7 are on the B branch, the C9 session writes a placeholder for the manager to hyperlink at merge.

**Within-bucket sequencing flags (parallel-pair templating risks):**

- **B1↔B6** (Welsh main rates ↔ Scottish main rates): highest within-bucket templating risk per Stage 1; mitigated by explicit anti-templating sections in both briefs requiring positive-framing of each jurisdiction's specific structural points and divergent H2 architecture. The framing differentiators force POSITIVE Welsh-mechanic / POSITIVE Scottish-mechanic framings (not "the Welsh version of LBTT" or "the Scottish version of LTT").
- **B2↔B7** (Welsh higher rates ↔ Scottish ADS): templating risk mitigated by structural-architecture divergence (Wales = standalone band structure; Scotland = 8%-flat-on-entire-price). Each brief's anti-templating section enumerates the divergence explicitly + requires divergent H2 architecture + divergent worked examples.
- **B4↔B8** (Welsh FTB-absence ↔ Scottish FTB-relief): templating risk mitigated by positive-Welsh-policy-choice framing (B4) vs positive-Scottish-mechanic framing (B8). Different statutes (LTTA 2017 vs LBTT(S)A 2013 Sch 4A), different H2 architectures specified, different worked examples.

**No cross-wave sequencing constraints surfaced** (Wave 4 IHT estate-planning bucket completed; B briefs cite §22 IHT spousal exemption for cross-jurisdictional gift-tax contexts where relevant, but no new dependencies on unshipped Wave 5 work).

---

## Verify-at-write hedge instructions inserted (per §23.10 drafter)

Three briefs have mandatory verify-at-write hedge sections per the Stage 1 drafter directions, in addition to the universal §16.35 per-write verification block that appears in ALL ten briefs.

- **B3 brief verify-at-write hedge:** "Re-verify the SI commencement cite for the 3% minimum-rate floor at write time; the Welsh Government impact assessment for the 2026 SI is published but the precise SI number was not on legislation.gov.uk as of 2026-05-23. If the SI is still not on legislation.gov.uk at write time, cite the gov.wales 20 January 2026 written statement and the impact assessment as primary sources, with footnote that the SI number is to follow."
- **B7 brief verify-at-write hedge:** "Verify ADS rate-step history (3% from 1 April 2016, 4% from 25 January 2019, 6% from 16 December 2022, 8% from 5 December 2024) SSI cites at write time if rate-history is included in the body. Current 8% rate confirmed against revenue.scot 2026-05-23. Worth keeping the rate-history table short — page's centre-of-gravity is the current 8% mechanic, not historical rate steps."
- **B10 brief verify-at-write hedge:** "Verify the current Scottish MDR minimum-rate floor SSI at write time if MDR is referenced in any worked example. Sch 5 LBTT(S)A 2013 governs MDR; the prescribed-rate floor is set by SSI and is not enumerated in §23.6 as a fixed figure; current revenue.scot guidance is the verification source. Also verify the acquisition-relief consideration-reduction formula and the bare-trust transparency principle against current revenue.scot at write time."

**Universal §16.35 verification (applied to all 10 briefs):**

Every brief opens its universal rules block with the mandatory line: "Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification." This is the §16.35 graduation from pre-wave to per-write verification, particularly load-bearing for Bucket B given the high volatility of devolved-tax figures across Welsh and Scottish Budget cycles.

---

## Anti-templating spot-checks performed (§10)

Per the brief instructions, anti-templating spot-checks performed at brief 3 (B3) and brief 6 (B6):

- **Brief 3 (B3 — Welsh MDR):** distinct framing differentiator from B1 (rates) and B2 (higher rates). B3's framing centres on the SURVIVAL-WITH-MODIFICATION story; B1 on the £225k positive; B2 on the standalone-band-structure positive. Three different H2 architectures specified. Worked examples use different purchase prices, different personas, different scenarios. PASS.
- **Brief 6 (B6 — Scottish LBTT main rates):** highest within-bucket templating risk page (B1↔B6 parallel). Stage 2 spot-check confirms: B1 framing = £225k positive + no NR surcharge + no separate FTB; B6 framing = £145k positive + £175k FTB-no-value-cap + no NR surcharge. Different statutes (LTTA 2017 vs LBTT(S)A 2013). Different H2 architectures explicitly specified in B6's anti-templating section (Scottish-statute history → rates → FTB-no-value-cap structural point, vs B1's rates → £225k → no NR → no FTB regime → comparison). Different worked-example personas (Welsh Davies / Williams-Hughes vs Scottish Macleod / McGregor). PASS.

---

## Bucket viability sanity check

Per §16.34 (Wave 4 cannibal-correction lesson): the Bucket B candidate pool was 12 candidates in `topic_gaps_final.md` for SDLT - Scottish / Welsh equivalents. Stage 1 narrowed to 10 (5 + 5 jurisdiction split). All 10 candidates are genuinely net-new (zero on-site devolved-tax coverage as confirmed by Glob check 2026-05-23). The cannibal risk is purely against general SDLT pages (England-focused), and is managed by explicit cross-jurisdictional differentiation guidance in every brief.

**Verdict at Stage 2:** Bucket B is VIABLE for Session B execution. All 10 briefs are net-new with clear framing differentiators, manageable templating risk (within-bucket parallel pairs B1↔B6, B2↔B7, B4↔B8) mitigated via anti-templating sections, and one cross-bucket sequencing constraint (B2 + B7 → C9) baked into the briefs.

---

## Files emitted by this Stage 2 reasoning pass

```
briefs/property/wave5/
├── welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers.md  (B1)
├── welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics.md  (B2)
├── welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition.md  (B3)
├── welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland.md  (B4)
├── welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md  (B5)
├── scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide.md  (B6)
├── scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers.md  (B7)
├── scottish-lbtt-first-time-buyer-relief-eligibility-mechanics.md  (B8)
├── scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision.md  (B9)
└── scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics.md  (B10)

docs/property/
└── wave5_stage2_session_B_summary.md  (this document)
```

Total: 11 new files (10 briefs + this summary). No commits per §16.17. No edits to existing files outside the briefs directory and this summary doc.

---

## Open items for manager review (pre-launch)

1. **B3 SI cite resolution:** if the 2026 Welsh MDR SI lands on legislation.gov.uk between now and Session B launch, update B3's verify-at-write hedge to reference the specific SI number. Otherwise the session resolves it at write time.
2. **C9 sequencing coordination:** when Session C launch prompt is drafted, include the §16.32 instruction that C9 should be the last C-bucket page Session C writes (or include forward-link placeholders for manager hyperlink at merge), per the matched B2 + B7 sequencing language in B2 + B7 briefs.
3. **Stage 1 Form 17 HOUSE_POSITION_CONFLICT signal** against `section-24-joint-property-ownership-tax-split` (Stage 1 flagged it pre-Stage-2) requires manager arbitration in Bucket C, not Bucket B; out of scope for this summary.
4. **Existing SDLT-page cross-link slugs:** several briefs reference `sdlt-bands-rates-2026-27-residential` and `sdlt-5-percent-surcharge-refund-claim-process` as cross-link targets. The actual on-site slugs are `sdlt-buy-to-let-rates-surcharge-guide-2025` and (for the 5%-surcharge-refund) need to be verified by Session B at write time. Briefs include "verify exact slug at write time" notes for the affected cross-link targets.

---

## Discipline confirmation

- §16.18 reasoning-first: applied (no scripts used for selection or framing).
- §16.31 URL liveness: instruction embedded in every brief; verification fires at session-time.
- §16.32 cross-bucket sequencing: B2 + B7 → C9 constraint baked into B2 + B7 briefs.
- §16.34 cannibal-corrected pool: Bucket B genuinely net-new (zero on-site coverage); cannibal risk is cross-jurisdictional differentiation only, mitigated by explicit Welsh-vs-Scottish-vs-England framing in every brief.
- §16.35 per-write verification: mandatory verify line embedded in every brief's universal rules block; three briefs (B3, B7, B10) carry additional verify-at-write hedge sections.
- §16.17 context discipline: no commits; sub-agent stops here.
