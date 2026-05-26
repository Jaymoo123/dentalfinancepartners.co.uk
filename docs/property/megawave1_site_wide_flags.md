# MegaWave 1 site-wide flags

**Created:** 2026-05-25. **Status:** Pre-launch (no flags yet).

Flag types per NETNEW_PROGRAM §13.2: EXISTING_PAGE_STALE / BRIEF_DRIFT / INTERNAL_LINK / CROSS_BUCKET / REDIRECT / HOUSE_POSITION_EXTENSION / AUTHORITY_GAP.

Per-bucket F-number ranges (Bug #2 fix):
- Bucket A: F-1..F-49
- Bucket B: F-50..F-99
- Bucket C: F-100..F-149

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step.)

---

## [F-1] BRIEF_DRIFT — A1 mis-states Scottish LBTT MDR position

**Raised by:** MW1 Bucket A batch M1-A-B4 (Stage 1 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (with HOUSE_POSITION_EXTENSION component).
**Affected brief:** `briefs/property/megawave1/abolishment-of-multiple-dwelling-relief.md` (A1 seed).

**Drift:** A1's "Framing differentiator" Q5 + "Key questions" Q5 contain the statement:

> "Scotland never had an MDR equivalent — LBTT has its own Additional Dwelling Supplement regime."

This is **incorrect**. Scotland has had LBTT Multiple Dwellings Relief since the LBTT(S)A 2013 came into force on 1 April 2015. The relief sits at Schedule 5 of LBTT(S)A 2013 (verified verbatim at https://www.legislation.gov.uk/asp/2013/11/schedule/5 on 2026-05-26 — title "Multiple dwellings relief", paragraphs 1-7 in the consolidated text covering overview, the rule, in-scope transaction tests, excluded transactions, and consideration attribution). The Scottish Additional Dwelling Supplement (Schedule 2A LBTT(S)A 2013) is a **separate** supplemental tax on additional dwellings — it is NOT a substitute for or equivalent of MDR; the two operate in parallel.

LBTT MDR was NOT abolished alongside the SDLT abolition by FA(No.2) 2024 s.7. The Scottish Parliament has not legislated an MDR repeal at the time of this seed-write. LBTT MDR therefore remains operative for current Scottish acquisitions.

**Back-patch required at Stage 1b or Stage 2:** A1's Q5 wording should be corrected to read approximately: "Does this affect Welsh or Scottish purchases? No — SDLT only. Welsh LTT MDR survives under LTTA 2017 Sch 13. Scottish LBTT MDR survives under LBTT(S)A 2013 Sch 5 — the Scottish Parliament has not legislated an MDR repeal at the time of writing. Cross-link to the Welsh-survives page and to A19 (`land-and-buildings-transaction-tax-multiple-dwellings-relief`) for the Scottish-survives mechanics." The Framing differentiator paragraph should be aligned accordingly.

**Companion HP-extension need:** the SDLT-architecture house position (§1 main text) does not currently anchor the devolved-tax position. A new HP sub-section or a new §X devoted to "Devolved property taxes — LTT (Wales) Sch 13 LTTA 2017 + LBTT (Scotland) Sch 5 LBTT(S)A 2013" is required to give A19, A20, the existing Welsh-survives page, and any future LBTT-cluster pages a shared anchor. Stage 1b conductor to decide whether a single devolved-taxes block spans both jurisdictions or whether each jurisdiction gets its own sub-section. Flagging as HOUSE_POSITION_EXTENSION component of this flag.

**No-block discipline:** A19 was committed with the correct LBTT MDR statutory position (Sch 5 LBTT(S)A 2013) and an explicit drift watchpoint at the bottom of its Stage 2 research target list. A1's Stage 2 expansion / back-patch must close the drift before the page is published.

---

## [F-50] CROSS_BUCKET — B9 soft cannib pair with existing Wave 5 page (intentional but needs conductor sanity-check)

**Raised by:** MW1 Bucket B batch M1-B-B2 (Stage 1 sub-agent), 2026-05-26.
**Type:** CROSS_BUCKET (with INTERNAL_LINK component).
**Affected brief:** `briefs/property/megawave1/ltt-refunds-for-derelict-or-uninhabitable-properties.md` (B9 seed).
**Affected existing page:** `Property/web/content/blog/welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md` (Wave 5, shipped 2026-05-23).

**Pairing description:** the existing Wave 5 page is the claim-side refund-mechanics treatment (post-payment WRA + TCMA s.41 / s.63 / s.78 routes, evidence pack at the WRA, review + tribunal pathway, £180k derelict cottage worked example). The B9 brief is scoped as the **pre-purchase classification page** (LTTA 2017 s.72 dwelling-suitability test as the substantive question, surveyor evidence pack at the buyer instruction stage, strategic choice between filing non-residential at outset versus filing residential and reclaiming).

The two pages are an **intentional pair** on the site: pre-purchase classification (B9) → post-completion refund mechanics (Wave 5 page). The B9 brief includes the framing differentiator paragraph and the explicit cross-link to the Wave 5 page. The pair should be cross-linked in both directions when both pages are deployed.

**Conductor sanity-check needed at Stage 1b:** confirm the pre-purchase / post-completion split is the right cut, or re-scope B9 as (a) a narrower long-tail variant (evidence-pack-only / decision-framework-only), (b) a redirect of the simpler-slug B9 query to the canonical Wave 5 page, or (c) merge the two into one expanded page. The default recommendation in the seed is to keep the pair as a deliberate two-page set.

**No-block discipline:** B9 seed committed at SHA 98e8d5e with the pre-purchase classification framing. Stage 2 expansion proceeds on the assumption the pair stands; if Stage 1b conductor judges otherwise, B9 is re-scoped or merged before Stage 2 begins.

---

## [F-51] CROSS_BUCKET — B12 lane-mis-clustered (Incorporation topic placed in Scottish/Welsh equivalents cluster)

**Raised by:** MW1 Bucket B batch M1-B-B2 (Stage 1 sub-agent), 2026-05-26.
**Type:** CROSS_BUCKET (slicer mis-clustering).
**Affected brief:** `briefs/property/megawave1/ltd-property-spreadsheet.md` (B12 seed).

**Mis-clustering:** B12 was placed by `slice-megawave.ps1` (2026-05-25) in **Bucket B "SDLT — Scottish / Welsh equivalents + FHL — abolition and transitional rules"** but the topic has no Scottish / Welsh-specific dimension. The page is a UK-wide treatment of limited-company property accounting (CTA 2009 / CTA 2010 / Companies Act 2006), which sits topically in the **"Incorporation & Company Structures"** category alongside existing pages such as `accountant-corporation-tax-property-companies`, `buy-to-let-limited-company-complete-guide-uk`, `alphabet-shares-property-spv-dividend-splitting-spouse-children`, and `btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction`. The B12 brief was written with the correct topical framing irrespective of the slicer placement.

**Likely cause of mis-clustering:** the source competitor URL `https://uklandlordtax.co.uk/ltd-property-spreadsheet/` was grouped by surface-keyword similarity (other "uklandlordtax.co.uk" URLs in the same cluster batch included LTT calculator pages, which are genuinely devolved-tax) rather than by topic semantic. The slicer's affinity clustering may benefit from a second-pass review where competitor-source dominance is overridden by primary-keyword analysis.

**Resolution proposed at Stage 1b:**
- Confirm B12 brief retains the corrected category routing (`incorporation-and-company-structures`) for Stage 2 expansion.
- No tracker re-bucketing needed (B12 stays in Bucket B for tracking purposes; the F-51 flag flags the topical mis-fit without disrupting the queue/lane mechanics).
- For future slicer runs (MW2 / MW3), consider a `meta_classifier` second-pass that re-classifies picks where the surface-keyword cluster does not match the semantic topic (a future infrastructure improvement, not a blocker for MW1).

**No-block discipline:** B12 brief committed at SHA 4497efb with the correct `incorporation-and-company-structures` routing. Stage 2 expansion proceeds on that routing.

---

## [F-53] BRIEF_DRIFT — B10 seed cites FA 2003 s.73BA as LBTT financial-institution definition source (corrected to ITA 2007 s.564B)

**Raised by:** MW1 Bucket B batch M1-B-B2 (Stage 2 sub-agent), 2026-05-26. (F-number bumped from F-52 to F-53 to resolve collision with M1-B-B1's F-52 LTTA s.41/s.44 catch committed concurrently.)
**Type:** BRIEF_DRIFT (§16.36 statutory cross-check catch).
**Affected brief:** `briefs/property/megawave1/understanding-alternative-finance-arrangements-under-lbtt.md` (B10 seed).

**Drift.** The B10 Stage 1 seed asserted that the LBTT(S)A 2013 Schedule 7 financial-institution definition "mirrors the SDLT definition at FA 2003 s.73BA". This is INCORRECT. Verified verbatim against `https://www.legislation.gov.uk/asp/2013/11/schedule/7` on 2026-05-26: Sch 7 **paragraph 25 (Interpretation)** expressly imports the definition from **Income Tax Act 2007 section 564B** (paragraph (d) omitted), NOT from FA 2003 s.73BA. ITA 2007 s.564B is the common spine for alternative-finance "financial institution" definitions across multiple UK tax codes; FA 2003 s.73BA is the SDLT-specific re-statement of the same underlying ITA 2007 s.564B definition.

**Pattern.** This is a §16.36 Stage 2 statutory cross-check catch (per Wave 5 §16.36 / Wave 6 §16.40 / Wave 7 §16.38 / Wave 8+ continued lessons). The Stage 1 seed asserted a plausible-sounding cite (FA 2003 s.73BA) without verifying against legislation.gov.uk; the Stage 2 verification step caught the drift before it propagated to RUN-phase writing.

**Correction applied.** B10 Stage 2 full brief (committed in batch M1-B-B2) cites ITA 2007 s.564B as the correct authority. The cross-jurisdictional alignment note in B10 explains that FA 2003 s.73BA is the SDLT-specific re-statement of the same underlying ITA 2007 framework, but the LBTT statutory source is ITA 2007 s.564B (imported via Sch 7 para 25), not the SDLT re-statement.

**No-block discipline.** B10 brief committed at this batch with the correction baked in. Stage 1b conductor may consider extending §23 with a mini-lock on the three-jurisdiction alternative-finance alignment (Sch 7 / Sch 10 / ss.71A-73), citing ITA 2007 s.564B as the common financial-institution definition spine; current §23 does not anchor alternative finance.

---

## [F-100] HOUSE_POSITION_EXTENSION — Council-tax framework HP-lock needed at §30 (C-B1 numbering drift)

**Raised by:** MW1 Bucket C batch M1-C-B2 (Stage 1 sub-agent), 2026-05-26.
**Type:** HOUSE_POSITION_EXTENSION (with companion BRIEF_DRIFT component against C1 + C6).
**Affected briefs:** C1 (`a-complete-guide-on-community-infrastructure-levy-cil`), C6 (`reduce-your-council-tax-bill-in-the-uk`), C8 (`single-person-council-tax-discount`), C9 (`single-person-council-tax-discounts-a-complete-guide`).

**Drift:** C1 brief (committed 2026-05-26 as 83d0866) proposed a "NEW HP-LOCK NEEDED — §28 'Community Infrastructure Levy + s.106 planning-obligation framework'." C6 brief (committed 2026-05-26 as 1eb3af0) proposed a "NEW HP-LOCK NEEDED — §29 'Council tax framework — LGFA 1992 + completion notices + premiums + reliefs'."

Both section numbers are **already occupied** in `docs/property/house_positions.md` (verified by Stage 1 sub-agent on 2026-05-26):

- §28 = "Transactions in UK land + trading-vs-investment (CTA 2010 Part 8ZB + ITA 2007 Part 9A)" — NEW Wave 8 cluster (locked 2026-05-25).
- §29 = "VAT for property — architectural anchor cluster" — Wave 8 mini-lock (added 2026-05-25; Stage 1b HP-gap closure).

**Resolution proposed at Stage 1b:**

- New **§30 "Council tax framework — LGFA 1992 ss.11-16 + Sch 1 + Sch 4 + SI 1992/558 + SI 1992/554 + LGFA 2012 Sch 1A + LURA 2023 amendments"** — anchor for the C2 / C3 / C4 / C6 / C8 / C9 cluster (six pages all touching the LGFA 1992 / SI 1992/558 / SI 1992/554 architecture).
- New **§31 "Community Infrastructure Levy (CIL) + s.106 planning-obligation framework — Planning Act 2008 Part 11 + SI 2010/948 + TCPA 1990 s.106"** — anchor for C1 (and any later CIL pages).

**No-block discipline:** C7 (committed 2026-05-26 as 2858d4d) avoided the drift by anchoring exclusively to the existing §17 cluster (HP §17.6 + §17.8 + §17.9 + §17.10 + §22.X + §15.6). C8 (committed 2026-05-26 as 6d70b7a) explicitly proposes §30 in the brief. C9 + the remaining council-tax briefs inherit the §30 proposal. Conductor decision at Stage 1b: confirm or override §30 / §31 numbering, then C1 + C6 + C8 + C9 briefs' "House position reference" lines are back-patched to the agreed number at Stage 2.

---

## [F-101] HOUSE_POSITION_EXTENSION — Lease-extension / enfranchisement statutory architecture HP-lock needed (§1.K proposed)

**Raised by:** MW1 Bucket C batch M1-C-B3 (Stage 1 sub-agent), 2026-05-26.
**Type:** HOUSE_POSITION_EXTENSION.
**Affected briefs:** C13 (`lease-extension-vs-freehold-purchase`), C14 (`lease-extensions-in-the-uk-surrender-and-regrant`), C15 (`lease-variation-and-lease-surrender`); cross-bucket adjacency with the existing M1-A-B2 `archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt` seed and the existing site page `sdlt-leasehold-extension-vs-fresh-purchase` (currently anchored to §1 general).

**Gap:** the house-positions file currently has no dedicated lease-extension / enfranchisement / lease-variation HP-lock. The existing §1.A through §1.J Wave-7-to-Wave-9 mini-locks cover SDLT-specific clusters (partnership SLP, MDR abolition, HRAD surcharge, residential-vs-mixed-use line) but none anchor the underlying LRA 1967 + LRHUDA 1993 + LFRA 2024 statutory architecture that governs the lease-extension / freehold-acquisition decision and the surrender-and-regrant doctrine. Three Bucket C briefs in this batch (C13 / C14 / C15) plus one Bucket A seed (M1-A-B2 Archer) plus one existing site page all need a shared anchor.

**Resolution proposed at Stage 1b:**

- New **§1.K "Lease extension and freehold acquisition statutory architecture — LRA 1967 (houses: enfranchisement under ss.1-9, extension under ss.14-15) + LRHUDA 1993 Part 1 Chapter I (collective enfranchisement of flats — ss.1, 13, 32 + Sch 6 valuation) + Part 1 Chapter II (individual flat lease extension — ss.39, 42, 56 + Sch 13 valuation) + LFRA 2024 Part 2 reform overlay (2-year qualifying-period abolition + 990-year extension term + marriage-value abolition + deferment-rate regulation power)"** — covering the statutory routes, eligibility tests, valuation formulae, and the LFRA 2024 reform package commencement schedule.
- New **§1.L "Lease variation surrender-and-regrant doctrine — FA 2003 Sch 17A para 9 + overlap relief Sch 17A para 9(2A) + corresponding LBTT(S)A 2013 Sch 19 paras 13-14 + LTTA 2017 Sch 6 paras 19-22"** — anchoring the SDLT / LBTT / LTT treatment of lease variations across the three jurisdictions. (Note: the §1.L number was previously proposed by the M1-A-B2 Archer brief seed for a different but overlapping topic ("SDLT-to-LBTT transitional boundary"); Stage 1b conductor decides whether (a) the transitional-boundary lock is folded into the broader §1.L variation-doctrine lock proposed here, or (b) one of the two locks is renumbered.)
- The collective-enfranchisement SDLT special calculation under FA 2003 s.74 (divide total consideration by number of qualifying flats; apply standard rates to per-flat fraction; multiply back up) is sub-lemma of §1.K and does not need a separate lock; it sits inside §1.K alongside the LRHUDA 1993 Chapter I framework.

**No-block discipline:** C13 (committed 2026-05-26 — this seed) anchors to §1 main + §1.I + §1.J + proposed §1.K. C14 and C15 (this batch) and the existing M1-A-B2 Archer seed and the existing `sdlt-leasehold-extension-vs-fresh-purchase` page all back-patch to the agreed numbering at Stage 1b conductor decision. Stage 2 brief expansion verifies the LFRA 2024 commencement-order position before writing rate-by-reference content.

---

## [F-2] BRIEF_DRIFT — A14 primary FTT case citation unconfirmed (garden-easement leasehold)

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (case-citation gap).
**Affected brief:** `briefs/property/megawave1/ftt-confirms-residential-sdlt-rates-for-leasehold-with-garden-easement.md` (A14).

**Gap.** A14 hinges on a specific FTT decision (a leasehold dwelling benefiting from a garden easement, where the FTT confirmed residential SDLT rates). The seed correctly flagged this as a Stage 1b drift watchpoint. Stage 2 sub-agent did not have the time budget within this batch to verify the precise citation against the GOV.UK Tax Chamber decisions database. The brief preserves the gap and instructs the RUN session to confirm at write time.

**Statutory framework remains solid.** FA 2003 s.116(1)(c) is the operative deeming provision for easements benefiting residential property; the framework section of the page is well-anchored. The gap is the case-specific section.

**Conductor decision needed.** Three options:
1. Dispatch a dedicated case-citation verification sub-agent with GOV.UK Tax Chamber search access ahead of RUN dispatch.
2. Instruct the RUN session to confirm at write time via GOV.UK search + raise Q-N if unconfirmable.
3. Reposition A14 as a statutory-framework explainer treating the FTT decision at secondary-source level (consistent with the seed's contingency framing).

The page MUST NOT ship with a fabricated case citation. Option 2 is the natural RUN-session pattern aligned with §16.35 per-write verification.

**Action required.** Conductor selects option 1, 2, or 3 ahead of RUN dispatch for A14.

---

## [F-3] HOUSE_POSITION_EXTENSION — §1.M garden-easement / PROW sub-line lock candidate (or extend §1.J)

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** HOUSE_POSITION_EXTENSION.
**Affected briefs:** A14 (garden-easement FTT), A9 (Averdieck PROW), A16 (Hortons Hall) — collectively the s.116 residential / non-residential boundary case-law cluster.

**Gap.** §1.J Wave 9 mini-lock captures the Hyman + Suterwalla + Hortons Hall mixed-use case-law trilogy, but does not explicitly call out (a) the garden-easement leasehold sub-line under s.116(1)(c) (A14 angle) or (b) the public-rights-of-way sub-line (A9 Averdieck angle) as named sub-clusters. MW1 Bucket A adds three case-analysis pages that collectively benefit from a more explicit sub-line taxonomy in the HP.

**Resolution proposed.** Two options:
1. Extend §1.J in place with two additional bullet points naming the easement (s.116(1)(c)) and PROW sub-lines, with cross-references to A14 + A9.
2. Open §1.M as a new mini-lock dedicated to "s.116 residential / non-residential boundary sub-lines beyond the trilogy" covering easement, PROW, and any future sub-line cases.

Option 1 is lighter touch and keeps §1.J as the canonical case-law cluster anchor. Option 2 makes room for the cluster to grow without overloading §1.J. Conductor preference.

**Action required.** Conductor selects option 1 or 2 ahead of RUN dispatch for A9 / A14 / A16. Not a blocker for Stage 2 brief generation — the briefs cite §1.J as the current anchor with the candidate flagged.

---

## [F-4] BRIEF_DRIFT — A15 primary FTT case citation unconfirmed (late SDLT appeal, no professional advice reasoning)

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (case-citation gap).
**Affected brief:** `briefs/property/megawave1/ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice.md` (A15).

**Gap.** A15 hinges on a specific FTT decision refusing a late SDLT appeal on "did not take professional advice" reasoning. Multiple candidate FTT decisions exist in this line — the reasoning is recurrent and has been litigated several times. Stage 2 sub-agent did not have the time budget within this batch to identify the precise controlling decision.

**Statutory framework remains solid.** FA 2003 Sch 10 paras 6, 12, 25, 28-29, 34, 35 + Tribunal Procedure Rules 2009 (SI 2009/273) + Martland v HMRC [2018] UKUT 178 (TCC) + BPP Holdings UKSC + Katib UKUT — all verified and operative for the page's procedural framework. The gap is the case-specific section.

**Conductor decision needed.** Three options:
1. Dispatch a dedicated case-citation verification sub-agent.
2. Instruct the RUN session to confirm at write time via GOV.UK Tax Chamber search + raise Q-N if unconfirmable.
3. Reposition A15 as a procedural-explainer page treating the FTT case-line at secondary-source level (the Martland framework + statutory architecture is well-anchored without a single case anchor).

The page MUST NOT ship with a fabricated citation.

**Action required.** Conductor selects option 1, 2, or 3 ahead of RUN dispatch for A15.

---

## [F-5] HOUSE_POSITION_EXTENSION — §1.N SDLT appeal-procedure HP-lock candidate

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** HOUSE_POSITION_EXTENSION.
**Affected brief:** A15 (`ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice`).

**Gap.** A15 is the first page in the site set to deeply address the SDLT appeal-procedure architecture (FA 2003 Sch 10 para 35 30-day window + Martland three-stage framework + overpayment-relief alternative under Sch 10 para 34). No existing §1 sub-section captures the SDLT appeal-procedure / late-appeal jurisprudence directly. §27 (HMRC enquiry + compliance mechanics, Wave 7 lock) covers income-tax appeal procedure but is anchored on TMA 1970 s.28A / s.31A rather than FA 2003 Sch 10.

**Resolution proposed.** Open §1.N "SDLT appeal procedure + late-appeal jurisdiction — FA 2003 Sch 10 + Martland framework" with:
- statutory anchors at Sch 10 paras 6, 12, 25, 28-29, 34, 35
- Tribunal Procedure Rules 2009 (SI 2009/273) rule 5(3)(a) + rule 20(4)
- Martland UKUT three-stage framework + Denton EWCA import
- BPP Holdings UKSC importance of statutory compliance
- HMRC v Katib UKUT on agent failures vs personal responsibility
- the "no professional advice" reasoning line as a known FTT pattern
- distinction between Sch 10 para 35 appeal-window route and Sch 10 para 34 overpayment-relief route
- do-not-write list (e.g., "late-appeal applications routinely succeed"; "no professional advice is a good reason for delay"; etc.)

**Action required.** Conductor decides whether to lock §1.N pre-RUN (preferred for future Stage 2 anchoring) or accept A15 as one-off citing directly from primary statute + case-law. Not a blocker for Stage 2 brief generation.

---

## [F-6] BRIEF_DRIFT — A16 Hortons Hall primary case citation + canonical spelling unconfirmed

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (case-citation + name-spelling gap).
**Affected brief:** `briefs/property/megawave1/horton-hall-sdlt-case-residential-vs-non-residential-dispute.md` (A16).

**Gap.** A16 is the dedicated Hortons Hall single-case deep-dive (the Hortons Hall arm of the Wave 9 §1.J trilogy lock). The page hinges on case-specific facts: judge, decision date, amount at stake, FTT's specific findings on the disputed land's character, paragraph references. The slug uses "horton-hall" for SERP-match-with-query, but the canonical case name in the FTT register is likely "Hortons Hall" or "Hortons Hall Estate Ltd v HMRC". Stage 2 sub-agent did not have the time budget within this batch to confirm the citation against the GOV.UK Tax Chamber decisions database.

**Statutory framework remains solid.** FA 2003 s.116(1)(b) "garden or grounds" is the operative limb; Hyman + Suterwalla + Mudan + MHB + Brown supporting case-law line is well-anchored against §1.J Wave 9 HP-lock. The gap is the case-specific section.

**Note on the trilogy relationship.** §1.J Wave 9 HP-lock already names Hortons Hall as one arm of the trilogy (line 2349: "Hortons Hall (Horton Hall Estates Ltd v HMRC): FTT cases (multiple decisions) on the residential/non-residential line for substantial estates. Stage 2 sub-agent A3 verifies the precise citation + ratio at write time — there are several Horton/Horton's Hall decisions and the brief should cite the controlling one."). The HP-lock itself flags that there are several decisions in this line — A16 must identify which is the controlling one.

**Conductor decision needed.** Three options:
1. Dispatch a dedicated case-citation verification sub-agent (most efficient given A14 + A15 + A16 share this need; sub-agent could resolve all three in a single dispatch).
2. Instruct the RUN session to confirm at write time via GOV.UK Tax Chamber search before drafting the case-summary section.
3. Reposition A16 from single-case deep-dive to "Hortons Hall arm of the trilogy" framing where the case is treated at the level secondary-source coverage allows.

A16 has the highest case-depth target in this batch (2,600-3,000 words; 11-13 FAQs), so unconfirmed citation creates the biggest scope-uncertainty. **Option 1 strongly preferred for A16.**

**Slug-vs-canonical disambiguation.** Slug retains "horton-hall" for SERP-match-with-query; body must use the canonical case name once confirmed. RUN session writes the page H1 + first-paragraph reference with the canonical name, citing the SERP variant parenthetically once for findability ("Hortons Hall Estate Ltd v HMRC, sometimes referred to as 'Horton Hall' in tax-press summaries").

**Action required.** Conductor selects option 1, 2, or 3 ahead of RUN dispatch. If option 1, the verification sub-agent should handle A14 + A15 + A16 in one dispatch.

---

## [F-7] HOUSE_POSITION_EXTENSION — §1.O worldwide-property + non-resident-buyer SDLT HP-lock candidate

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** HOUSE_POSITION_EXTENSION.
**Affected briefs:** A17 (`how-owning-property-abroad-leads-higher-stamp-duty-rates`) + A18 (`labour-plans-stamp-duty-hike-for-overseas-buyers`).

**Gap.** A17 + A18 collectively address the worldwide-property + non-resident-buyer SDLT architecture: Sch 4ZA worldwide reach (5% additional dwellings surcharge); Sch 9A 2% non-resident surcharge (FA 2021 s.86 + Sch 16, in force 1 April 2021); Sch 6ZA FTB-relief disqualification on worldwide ownership; and the 2024 Labour manifesto commitment to lift the Sch 9A rate from 2% to 3%. No existing §1 sub-section captures this triangulated architecture; §1.I covers Sch 4ZA mechanics but not the worldwide-reach + Sch 9A + Sch 6ZA-disqualification triangulation; §1.K covers FTB-relief mechanics but not the worldwide-disqualification asymmetry.

**Resolution proposed.** Open §1.O "Worldwide-property ownership and UK SDLT — three statutory routes":
- statutory anchors at Sch 4ZA paras 2, 3, 6-7, 9, 9A, 17 (worldwide-property test + spouse-aggregation + inherited-interests + £40k exclusion + replacement-of-main-residence relief)
- Sch 9A paras 1-5 (non-resident surcharge — 183-day SDLT-specific residence test, distinct from SRT under FA 2013 Sch 45)
- Sch 6ZA para 6(2) (FTB definition with worldwide reach — "any dwelling situated anywhere in the world", with no £40k floor unlike Sch 4ZA)
- FA 2025 c. 8 s.51 (5% Sch 4ZA rate from 31 October 2024)
- FA 2021 s.86 + Sch 16 (2% Sch 9A rate from 1 April 2021)
- the stacking effect (Sch 4ZA + Sch 9A additive on the same transaction)
- the asymmetry between Sch 4ZA £40k exclusion and Sch 6ZA worldwide-disqualification (no £40k floor — key drift source)
- the spouse-aggregation trap under Sch 4ZA para 9 (worldwide-property of either spouse attributed to purchasing spouse)
- do-not-write list (e.g., "the £40k exclusion applies to FTB-disqualification"; "the Sch 9A residence test is the SRT"; "the 5% surcharge does not apply to overseas-owned properties"; etc.)

Optionally extend to §1.P for the Labour-manifesto policy trajectory if conductor prefers separation of statutory + policy lines.

**Action required.** Conductor decides whether to lock §1.O pre-RUN (preferred for future Stage 2 anchoring on cross-border SDLT cluster) or accept A17 + A18 as one-off citing directly from primary statute. Not a blocker.

---

## [F-8] BRIEF_DRIFT — A18 live-policy rate verification mandatory at write time

**Raised by:** MW1 Bucket A batch M1-A-B3 (Stage 2 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (live-policy state-tracking).
**Affected brief:** `briefs/property/megawave1/labour-plans-stamp-duty-hike-for-overseas-buyers.md` (A18).

**Gap.** A18 tracks Labour's 2024 General Election manifesto commitment to lift the SDLT non-resident surcharge under FA 2003 Sch 9A from the current 2% to 3%. As of Stage 2 (2026-05-26), the operative rate remains 2% per Sch 9A as inserted by FA 2021 s.86 + Sch 16 (in force 1 April 2021). The legislative status of the 3% proposal is uncertain: the increase may be (a) not yet legislated; (b) legislated with future commencement date; (c) legislated and in force; (d) revised in subsequent Budget cycles. The page MUST NOT assert a rate or a policy state without WebFetch verification at the write date.

**Statutory framework remains solid.** Sch 9A + s.55C + the residence test at Sch 9A para 4 + the stacking interaction with Sch 4ZA 5% (current rate per §1.I Wave 9 HP-lock) are all verified and operative.

**The page's central risk** is the §16.27 + §16.30 + §16.35 + §16.38 + §16.40 / §16.42 Bill-vs-enacted-Act drift pattern (11+ consecutive drift catches in succession across the program). A live-policy page is the highest-risk territory for this drift class.

**Three rate-states the page must distinguish:**
1. The 2% currently-statutory rate under Sch 9A as inserted by FA 2021 s.86 + Sch 16.
2. The 3% Labour-manifesto-commitment rate (2024 manifesto).
3. Any subsequently-legislated rate (verify at write date against FA 2025 c. 8 + any Finance Bill 2025-26 / FA 2026 in progress).

**Conductor decision needed.** Three options:
1. Dispatch a dedicated policy-verification sub-agent ahead of RUN dispatch to provide A18 with the verified policy state + verbatim 2024 manifesto wording. (Preferred — front-loads the highest-risk verification work.)
2. Instruct the RUN session to perform full WebFetch verification of FA 2025 c. 8 + Finance Bill 2025-26 + gov.uk SDLT non-resident-surcharge guidance + the official Labour manifesto document at write time before drafting.
3. Reposition A18 as a tighter "current state of the proposal as of [date]" explainer with explicit time-stamping in the H1 + meta.

The page MUST NOT assert a rate or a policy state without verification. The 2024 Labour manifesto verbatim wording also requires fetching the official manifesto document.

**Action required.** Conductor selects option 1, 2, or 3 ahead of RUN dispatch for A18.

---

## [F-9] BRIEF_DRIFT — A8 Archer UK Ltd v Revenue Scotland precise FTT citation unconfirmed

**Raised by:** MW1 Bucket A batch M1-A-B2 (Stage 2 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (case-citation gap; parallel to F-2 / F-4 / F-6 pattern).
**Affected brief:** `briefs/property/megawave1/archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt.md` (A8).

**Gap.** A8 hinges on the Scottish FTT decision in Archer UK Limited v Revenue Scotland on the LBTT treatment of a lease extension where the original lease was granted under SDLT (pre-1-April-2015 transitional). The case is referenced in tax-press summaries and is now recorded against the §31 lease-extension cluster HP-lock at §31.4 (added 2026-05-26) as the Scottish-side authority. Stage 1 seed flagged the precise citation as uncertain (likely 2022-2024 FTSTC). Stage 2 sub-agent did not have the time budget within this leaf batch to verify the precise citation against the Scottish Courts and Tribunals Service Tax Chamber decisions database. The brief preserves the gap and instructs the RUN session to lock at write time OR write to the statutory framework with the case discussed as "Archer UK Limited (Scottish FTT, citation pending verification)".

**Resolution proposed.** One of:
1. Conductor commissions a focused citation-verification sub-agent for A8 (parallel to the A14 + A15 + A16 case-citation gap pattern in F-2 / F-4 / F-6); recommended if F-2 / F-4 / F-6 are being addressed by a verification batch, A8 fits the same dispatch.
2. RUN session locks the citation as the first task within the A8 write workflow (step 4 fetch + step 7 verification); brief already instructs this.
3. RUN writes to the statutory framework + §31.4 anchor with the case discussed at the level Stage 2 could verify, deferring the precise citation to post-publish back-patch.

**Action required.** Conductor selects option ahead of RUN dispatch for A8. Not a blocker for Stage 2 brief generation, the brief cites §31 as the current HP anchor with the case-citation gap flagged.

---

## [F-102] HOUSE_POSITION_EXTENSION — CIL HP-lock still open after Stage 1b §30 / §31 allocation

**Raised by:** MW1 Bucket C batch M1-C-B1 (Stage 2 sub-agent), 2026-05-26.
**Type:** HOUSE_POSITION_EXTENSION (status update to F-100's CIL portion).
**Affected briefs:** C1 (`a-complete-guide-on-community-infrastructure-levy-cil`).

**Status update.** F-100 proposed BOTH (i) §30 council tax framework AND (ii) §31 CIL + s.106 framework. Conductor's Stage 1b HP-lock pass (2026-05-26) closed (i) by locking §30 "Council tax framework, LGFA 1992 + SI 1992/558 architecture" (verified at house_positions.md lines 3181+), but allocated §31 to "Lease extension and enfranchisement, LRA 1967 + LRHUDA 1993 + LFRA 2024 architecture" (closing F-101 instead). The CIL portion of F-100 therefore **remains open**.

**Resolution proposed.** Open a fresh §-number slot (§32 candidate) for "Community Infrastructure Levy + s.106 planning-obligation framework, Planning Act 2008 Part 11 + SI 2010/948 + TCPA 1990 s.106 architecture." Same architectural scope as F-100's original §31 proposal (statutory location of CIL, liability default + Assumption-of-Liability mechanic, chargeable-amount + BCIS uplift, reliefs catalogue, commencement-notice + surcharge regime, CIL vs s.106 division of labour, LURA 2023 Part 4 CIL amendments + commencement-order regime).

**RUN-session interim handling for C1.** Stage 2 extension on C1 brief instructs the RUN session to anchor to verified statutory primary text from legislation.gov.uk (Planning Act 2008 Part 11; SI 2010/948 consolidated; SI amendments listed in C1 seed; LURA 2023 c.55 Part 4; TCPA 1990 s.106) + gov.uk Planning Practice Guidance. The RUN session must NOT cite a §28 or §31 CIL HP lock; both numbers are occupied by other clusters.

**Action required.** Conductor decides whether to lock §32 CIL pre-RUN (preferred for citation-discipline parity with the rest of the bucket) or accept C1 as one-off citing direct from primary statute / SI / PPG. No blocker for RUN-phase start.

---

## [F-52] BRIEF_DRIFT — HP §23.8 + §23.10 cites LTTA 2017 s.41 for the 30-day return window; correct cite is s.44

**Raised by:** MW1 Bucket B batch M1-B-B1 (Stage 2 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (with HOUSE_POSITION back-patch component on §23.8 + §23.10 citation block).
**Affected briefs:** B3 (`land-transaction-tax-a-complete-guide`) Stage 1 seed flagged this for Stage 2 verification; the Stage 1 seed already noted the suspected drift in its "Stage 2 verification note" line in the Manager pre-decisions block.

**Drift confirmed at Stage 2:** WebFetch verification against legislation.gov.uk on 2026-05-26 confirms:
- LTTA 2017 **s.44 "Duty to make a return"** is the operative section for the 30-day return window (Part 6 Returns and Payments, ss.44-65). Verified verbatim: "section 44 is about the duty to deliver a Land Transaction Tax (LTT) return... within 30 days of the transaction's effective date".
- LTTA 2017 s.41 sits in Part 5 (Application to Certain Persons and Bodies, ss.33-43), NOT the returns part.

**HP currently cites s.41 in §23.8 effective-date-timing block:**
> "LTT effective date: LTTA 2017 s.10, same substantial-performance test. Returns due: SDLT 14 days from effective date (FA 2003 s.76); LTT 30 days (LTTA 2017 s.41); LBTT 30 days (LBTT(S)A 2013 s.29)."

§23.10 citation block does NOT explicitly list s.41 or s.44 (the gap is on the §23.10 side too — the returns section should be added to "key provisions").

**Back-patch required:** edit `docs/property/house_positions.md` §23.8 line to cite **LTTA 2017 s.44** for the LTT 30-day return window (replacing s.41). Companion edit to §23.10 to add s.44 to the "key provisions" list. Non-blocking — RUN-phase B3 page can cite s.44 directly per the Stage 2 extension to its brief.

**No-block discipline:** B3 brief Stage 2 extension (committed in this batch, c.3c904dc..HEAD) explicitly directs the RUN session to cite s.44 not s.41 throughout. The page MUST NOT propagate the seed-level s.41 cite. Other Bucket B briefs that may have inherited the s.41 drift (B1, B2, B7, B8, B9, B11) — Stage 2 sub-agent confirms B1, B2 extensions cite the 30-day window without a section number (no drift); B8, B9, B11 to be checked at their Stage 2 extension.

**Action required:** conductor back-patches §23.8 + §23.10 in `house_positions.md` at MW1 wave-close step (or earlier if RUN-phase B3 cites the section before close — first writer benefits from the verification).

---

## [F-10] EXISTING_PAGE_STALE — Wave 9 welsh-ltt-multiple-dwellings-relief page stale on post-Feb-2025 + post-Feb-2026 LTTA 2017 Sch 13 statutory updates

**Raised by:** MW1 Bucket A batch M1-A-B4 (Stage 2 sub-agent), 2026-05-26.
**Type:** EXISTING_PAGE_STALE.
**Affected existing page:** `Property/web/content/blog/welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition.md` (Wave 9, deployed pre-Feb-2025).

**Drift:** Stage 2 sub-agent verifying LTTA 2017 Sch 13 via WebFetch surfaced two material statutory updates that post-date the Wave 9 page's deployment. Both confirmed verbatim at legislation.gov.uk on 2026-05-26:

- **Para 6(2) minimum-prescribed-amount floor substituted to 3%** effective 13 February 2026 by The Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026 (verify exact SI series number at write). The Wave 9 page likely cites the pre-amendment floor figure (or omits the floor entirely if not surfaced at write).
- **New para 7A "Subsidiary dwellings" inserted 7 February 2025** by SI 2025/119 (The Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2025). Verbatim core provision: "the interests in the qualifying dwelling mentioned in sub-paragraph (1)(b) and a purchased dwelling (or more than one) that is subsidiary to it are treated as if they were an interest in a single dwelling." Qualifying-test references Schedule 5 paragraph 14; exclusions per Schedule 5 paragraph 18 (intermediate transactions treated as higher rates residential property transactions).

Both verified at https://www.legislation.gov.uk/anaw/2017/1/schedule/13 and https://www.legislation.gov.uk/anaw/2017/1/schedule/13/paragraph/7A on 2026-05-26.

**Back-patch required:** Wave 9 page should be updated at MW1 close to (a) cite the current 3% minimum floor at para 6(2); (b) describe the subsidiary-dwelling treatment under new para 7A; (c) update any worked example whose per-dwelling-average computation interacts with the minimum-floor. Both A19 (Scottish-survives) and A20 (canonical three-jurisdiction hub) briefs surface the current LTT Sch 13 architecture in their §16.36 gate + FAQ entries. Consistency back-patch on the Welsh-survives sister page maintains site coherence with the MW1 outputs.

**Cross-bucket consideration:** F-1's proposed devolved-property-taxes HP-extension was NOT executed at Stage 1b (the Stage 1b commits 7877f1c + ec7d20f locked §1.K FTB + §30 Council-tax + §31 Lease-extension only). F-10 reinforces the case for a devolved-property-taxes HP-lock that spans both LBTT (Scotland) + LTT (Wales) Sch 13 — a single lock could anchor A19 + A20 + the back-patched Welsh-survives page in one place. Recommend re-evaluation at MW1 wave-close.

**No-block discipline:** A19 + A20 Stage 2 briefs include the current Welsh Sch 13 architecture explicitly (Feb 2025 + Feb 2026 amendments surfaced in §16.36 gate + FAQ #7 of A19 and FAQ #7 + #10 of A20). The MW1 RUN dispatch is not blocked by this flag. It is a Wave-9-back-patch action item for MW1 close.

---


---

## Stage 2b case-citation closures (2026-05-26)

The four BRIEF_DRIFT flags raised at Stage 2 for unconfirmed case citations (F-2 / F-4 / F-6 / F-9) are CLOSED via a dispatched Stage 2b case-verification Agent (run completed 2026-05-26). All four citations verified against official tribunal databases (caselaw.nationalarchives.gov.uk for FTT; secondary tax-press for Scottish FTSTC which 403'd at Agent runtime). Verified citations appended to each affected brief on the lane A worktree.

**F-2 closed:** A14 page cites **Bonsu v HMRC [2024] UKFTT 158 (TC)** (Tribunal Judge Richard Chapman KC, 26 February 2024). The s.116(1)(c) easement-benefit point is at paras [TBV — RUN-session verifies]. Earlier sister-line authority: Sexton & Anor v HMRC [2023] UKFTT 73 (TC).

**F-4 closed:** A15 page cites **R & E Goonesena v HMRC [2024] UKFTT 619 (TC)** (Tribunal Judge Abigail McGregor, 25 June 2024). The "conscious decision not to seek professional advice" Martland-framework application is at paras 22 + 47. Martland v HMRC [2018] UKUT 178 (TCC) remains the controlling framework.

**F-6 closed:** A16 page cites **Mark White & Carol Kane v HMRC [2023] UKFTT 866 (TC)** (Tribunal Judge Anne Fairpo sitting with Member Shaneem Akhtar, 29 September 2023). Property is **Horton Hall** (singular, Staffordshire) — earlier working-doc "Hortons Hall" was an error; the slug `horton-hall-sdlt-case-residential-vs-non-residential-dispute` is correct. Case name = White & Kane; "Horton Hall" is the disputed property. Controlling appellate authority: Hyman v HMRC [2022] EWCA Civ 185; controlling Upper Tribunal: How Development 1 [2023] UKUT 84 (TCC) + Suterwalla [2024] UKUT 188 (TCC). White & Kane is FTT application.

**F-9 closed:** A8 page cites **Archer (UK) Limited v Revenue Scotland [2025] FTSTC 10** (10 July 2025). Statutory framework MUST cite LBTT (Transitional Provisions) (Scotland) Order 2014 **Article 13** (the key transitional provision) + LBTT(S)A 2013 Sch 19 + FA 2003 Sch 17A para 9. Counsel: Philip Simpson KC. **Judge name pending primary-source verification** (taxtribunals.scot 403'd at Agent runtime; verify via browser before RUN-phase write).

All four verified citations are appended to each affected brief on the lane A worktree branch (`property-megawave1-a`). The closure blocks include the verification URL, key holding paragraphs, and line/cluster notes. The Stage 2 verification gap that prompted F-2 / F-4 / F-6 / F-9 is now closed; RUN-phase sub-agent re-verifies at write-time per §16.35.
