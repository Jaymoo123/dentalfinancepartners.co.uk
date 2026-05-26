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
