# Wave 9 brief: multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords

**Site:** property
**Bucket:** A (SDLT — MDR abolition + 5% surcharge mechanics + mixed-use rates line)
**Session:** A
**Pick ID:** A1
**Brief type:** Net-new page
**Stage:** 2 (full brief — Stage 1b HP-lock §1.H closed; framing + URLs + FAQ + worked examples + authority links populated 2026-05-25)
**Source markdown path on launch:** `Property/web/content/blog/multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords

---

## Manager pre-decisions

- **Suggested slug:** `multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (SDLT — MDR abolition cluster)
- **Cannibalisation classification:** net-new (top score 0.20 against `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition` — that page is the Welsh LTT survival angle; this page is the SDLT abolition + transitional + post-abolition mitigation angle).

### Framing differentiator (Stage 2, 2026-05-25)

> A landlord and portfolio-acquirer walk-through of the SDLT Multiple Dwellings Relief (MDR) abolition under Finance (No.2) Act 2024 (c. 12) **s.7** ("Abolition of multiple dwellings relief for SDLT" — verified at https://www.legislation.gov.uk/ukpga/2024/12/section/7 on 2026-05-25 per HP §1.H). MDR is unavailable for **land transactions with an effective date on or after 1 June 2024** (effective date per FA 2003 s.119 = completion OR substantial performance, whichever is earlier). The page covers four things competitor coverage routinely under-serves: (a) the **transitional cohort identification mechanics** — contracts entered into AND substantially performed before 1 June 2024 retain MDR eligibility even on post-1-June-2024 completion; contracts pre-dating the abolition without pre-1-June-2024 substantial performance are caught by anti-forestalling; the operational test rests on FA 2003 s.119 effective-date analysis, not on contract date alone; (b) the **anti-forestalling architecture** — F(No.2)A 2024 blocks retrofit MDR via sub-sale arrangements structured around the abolition date, options or assignments of pre-1-June-2024 contracts where the underlying transaction completes post-abolition, and post-Budget variations to pre-existing contracts changing consideration or dwelling count; (c) the **three surviving alternatives for portfolio buyers** — the **FA 2003 s.116(7) six-or-more-dwellings automatic non-residential rule** (statutory deeming, no claim required; the workhorse route for bulk acquisitions now per HP §1.H), the **FA 2003 Sch 15 para 10 partnership SLP route** (genuine pre-existing partnership only; full mechanics in HP §1.A Wave 7 lock), and the **FA 2003 s.45 sub-sale route** (narrow surviving relief for genuine pre-completion onward-sale arrangements); (d) the **cross-border position** — Welsh LTT MDR survives under LTTA 2017 Sch 13 (devolved regime; abolition was SDLT-only); Scottish LBTT never had an MDR equivalent. Page is NOT an MDR explainer (the relief is dead for new transactions; do not write as live); it IS an **abolition + transitional + alternatives** architecture page for buyers who were planning acquisitions on the assumption MDR was available.

**Stage 1b HP-lock note:** HP §1.H locked 2026-05-25 (commit 6d4a42c) closes F-1 from Wave 9 Stage 1b. The §1.H lock confirms F(No.2)A 2024 s.7 as the abolition statutory hook and confirms s.116(7) (NOT the repealed Sch 6B para 7) as the surviving 6+-dwellings deeming rule. Per §1.H "practical writing rule for A1": lead with abolition date + statutory authority; then transitional cohort identification mechanics; then anti-forestalling architecture; then the three surviving alternatives as the post-abolition operational toolkit. Distinguish from Welsh LTT angle explicitly.

**Pool-thinness disclosure:** Most competitor pages still treat MDR as live, or only briefly note abolition without surfacing the anti-forestalling architecture or the s.116(7) / Sch 15 SLP / s.45 alternatives. The defensible point is the **abolition + transitional + alternatives** architecture combined with the anti-forestalling enquiry-attack pattern + the Welsh-LTT-survives jurisdictional point.

---

## Competitor URLs (Stage 2 populated 2026-05-25; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` + `BeautifulSoup(html, "lxml")`. Extract treatment of: (a) abolition date framing (1 June 2024 effective-date cut-off vs Budget-day-2024 cut-off confusion); (b) transitional cohort tests (does the source surface FA 2003 s.119 effective-date analysis or default to contract-date framing?); (c) anti-forestalling architecture (most sources omit); (d) surviving alternatives (s.116(7) / Sch 15 SLP / s.45 — most sources fail to map all three); (e) Welsh LTT divergence (most sources omit). Flag any "MDR is still available for 5+ properties" misframes for the drift-catch list — this is a common pre-abolition pattern that has lingered in cached SEO content.

- https://www.saffery.com/insights/articles/multiple-dwellings-relief-abolition/
- https://www.bdo.co.uk/en-gb/insights/tax/property/multiple-dwellings-relief-abolition
- https://www.rsmuk.com/insights/tax-insights/multiple-dwellings-relief-sdlt-abolition
- https://www.crowe.com/uk/insights/multiple-dwellings-relief-abolition-impact
- https://www.charlesrussellspeechlys.com/en/insights/expert-insights/tax/multiple-dwellings-relief-abolition/

**Borrowable patterns (subject to verification):** competitor transitional-cohort decision trees (verify the s.119 effective-date analysis is correctly applied); HMRC SDLTM29900+ update status (verify post-abolition manual update has landed; if stale, flag).

**Reliability notes:**
- Saffery / BDO / RSM / Crowe / Charles Russell Speechlys are core-tier UK accountancy + legal-conveyancing commentary; broadly reliable on statutory framing but typically thin on the post-abolition alternatives architecture.
- AVOID: aggressive SDLT-claims-firm content (Cornerstone Tax, Patrick Cannon, Stamp Duty Claims) on MDR — most pre-abolition claims-firm material lingers in the SERP and overstates current eligibility; if surfaced, treat as drift-catch source, not borrow-pattern source.

---

## GSC data

*Net-new page; primary topical queries expected: "multiple dwellings relief abolished", "MDR SDLT 2024", "SDLT bulk purchase portfolio after MDR", "six or more dwellings SDLT rule", "anti-forestalling MDR", "MDR transitional rules 2024", "Welsh MDR vs SDLT abolition".*

---

## Closest existing pages (cannibalisation context)

From `wave9_cannibalisation_check.md` (top score 0.20):
- `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition` (0.20) — **adjacent** — Welsh LTT MDR survival angle (LTT MDR remains live post-1-June-2024 in Wales under LTTA 2017 Sch 13). This page (A1) explicitly cross-links it for the cross-border Welsh-investor reader and surfaces the jurisdictional divergence as a planning point.
- `renters-rights-act-section-21-abolition-landlord-operational-mechanics` (0.13) — coincidental "abolition" keyword overlap; no real overlap.
- `2027-property-tax-rates-section-24-relief-uk-landlords` (0.12) — no real overlap.
- `partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions` — Wave 7 page; HP §1.A Sch 15 SLP pillar. **Mandatory cross-link** as primary surviving-alternative for connected-party partnership acquirers.

**Cannibalisation discipline:**
- Cross-link the Welsh LTT MDR page explicitly as the cross-border companion (acknowledge LTT MDR survives; recommend Welsh-resident readers consult that page).
- Cross-link the Wave 7 Sch 15 partnership-SLP pillar as the primary surviving-alternative for connected-party partnership acquirers.
- Surface s.116(7) 6+-dwellings rule clearly; existing site does not have a dedicated s.116(7) pillar yet (potential discovery flag for future wave).

---

## Redirect overlap (on launch)

No existing slug matches A1's scope (MDR abolition is a 2024 statutory event; pre-abolition MDR pages on the site are general "What is MDR" explainers that have already been retired or repointed in prior waves). No middleware edit required on initial launch. **Session to scan `middleware.ts` for any `multiple-dwellings-relief` token redirects pre-launch; if found, repoint to A1.**

---

## Authority links worth considering (Stage 2 populated 2026-05-25; session selects 6-8)

**Statutory (legislation.gov.uk):**
- F(No.2)A 2024 s.7 (MDR abolition): https://www.legislation.gov.uk/ukpga/2024/12/section/7
- F(No.2)A 2024 (full Act, for anti-forestalling commencement provisions — locate within the section/schedule architecture at write time): https://www.legislation.gov.uk/ukpga/2024/12/contents
- FA 2003 s.116 (residential property + s.116(7) 6+-dwellings deeming): https://www.legislation.gov.uk/ukpga/2003/14/section/116
- FA 2003 s.119 (effective date — completion or substantial performance whichever earlier): https://www.legislation.gov.uk/ukpga/2003/14/section/119
- FA 2003 s.45 (sub-sale relief surviving alternative): https://www.legislation.gov.uk/ukpga/2003/14/section/45
- FA 2003 Sch 15 para 10 (partnership SLP route — surviving alternative): https://www.legislation.gov.uk/ukpga/2003/14/schedule/15
- FA 2003 s.108 (linked transactions — load-bearing for whether multiple property contracts aggregate for s.116(7)): https://www.legislation.gov.uk/ukpga/2003/14/section/108
- LTTA 2017 (Welsh LTT — for cross-border position; MDR-equivalent survives at LTTA 2017 Sch 13): https://www.legislation.gov.uk/anaw/2017/1/contents

**HMRC manuals + guidance:**
- HMRC SDLT Manual SDLTM29900+ (MDR — note manual may still describe relief as live for historical transitional purposes; cross-reference SDLTM00500 for current post-abolition rates): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax/sdltm29900
- HMRC SDLT Manual SDLTM00500+ (rates of SDLT): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax/sdltm00500
- gov.uk SDLT calculator (current residential + non-residential rates): https://www.gov.uk/stamp-duty-land-tax
- HMRC technical note on F(No.2)A 2024 changes (search "abolition multiple dwellings relief" at gov.uk publications; locate the policy paper): https://www.gov.uk/government/publications

**Professional-body commentary (verify currency at fetch):**
- ICAEW Tax Faculty MDR abolition briefing: https://www.icaew.com/insights/tax-news
- CIOT response to MDR abolition (consultation + commencement commentary): https://www.tax.org.uk/

**Cross-references in house_positions.md:**
- **§1.H primary anchor** (Wave 9 Stage 1b lock 2026-05-25 — MDR abolition + transitional + anti-forestalling + 3 surviving alternatives).
- §1.A (Wave 7 lock) — Sch 15 SLP mechanics for connected-party partnership surviving alternative.
- §1.B (Wave 7 lock) — s.108 linked-transactions discipline for s.116(7) aggregation.
- §1 main text — historic MDR mention (pre-§1.H) plus s.116(7) Wave 1 correction (logged 2026-05-22; correct cite at s.116(7), not Sch 6B para 7).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify F(No.2)A 2024 s.7 verbatim heading "Abolition of multiple dwellings relief for SDLT" against https://www.legislation.gov.uk/ukpga/2024/12/section/7
- Verify the **exact statutory section** for the F(No.2)A 2024 anti-forestalling commencement provisions (likely embedded in commencement schedule or Schedule X — locate at write time; the §1.H lock notes this is for Stage 2 sub-agent A1 to verify the precise statutory architecture).
- Verify FA 2003 s.116(7) verbatim text on 6+-dwellings deeming (per HP §1.H Wave 1 correction): https://www.legislation.gov.uk/ukpga/2003/14/section/116
- Verify FA 2003 s.119 effective-date definition: https://www.legislation.gov.uk/ukpga/2003/14/section/119
- Verify HMRC SDLTM29900+ current state (post-abolition update status).
- Verify LTTA 2017 Sch 13 MDR-equivalent still in force (Welsh divergence cross-border point).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation, statutory section references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise portfolio landlord + property-investor solicitor + acquisition LtdCo directors.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the transitional-cohort section (high-intent: buyer mid-acquisition checking exposure).
  - After the anti-forestalling section (high-intent: buyer with pre-1-June-2024 paperwork structured around the abolition date).
  - After the surviving-alternatives section (planning-intent for new portfolio acquirers).
- Vary opening; do NOT lead with "Multiple Dwellings Relief was...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. See **Draft FAQ entries** section below.

### Cannibalisation
- Cross-link Welsh LTT MDR page as cross-border companion.
- Cross-link Sch 15 partnership-SLP pillar (HP §1.A territory, Wave 7 page).

### House positions
- §1.H primary anchor (now LOCKED, Wave 9 Stage 1b).
- §1.A + §1.B + §1 main text secondary anchors.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the **abolition + transitional + anti-forestalling + 3 surviving alternatives + cross-border** architecture. Write to it.
- Vary H2s from any cached pre-abolition MDR explainer patterns; structure around abolition-mechanic + transitional-test + anti-forestalling + alternatives-decision-matrix + cross-border-note, NOT around "What is MDR / How MDR worked".

---

## Draft FAQ entries (Stage 2 populated 2026-05-25; session may rewrite or expand)

Target 10-12 FAQs. Draft set below; session adapts wording, ensures no duplication of body H2/H3 phrasing, and expands or contracts as needed for FAQPage schema cleanliness.

1. **When exactly did Multiple Dwellings Relief stop being available?**
   MDR is unavailable for SDLT land transactions with an **effective date on or after 1 June 2024**. "Effective date" per FA 2003 s.119 is the earlier of completion or substantial performance. F(No.2)A 2024 s.7 repealed the relief in full; FA 2003 Sch 6B (the MDR statutory provision) is no longer operative for transactions on or after that date.

2. **My contract was dated before 1 June 2024 but completion is in 2026. Can I still claim MDR?**
   Only if there was **substantial performance** before 1 June 2024 (typically possession taken or substantial consideration paid). A bare pre-1-June-2024 contract date without substantial performance pre-abolition is caught by the anti-forestalling provisions; relief is denied. The effective-date analysis under FA 2003 s.119 is the operative test, not contract date alone.

3. **What counts as "substantial performance" for MDR transitional eligibility?**
   FA 2003 s.44 defines substantial performance: the purchaser (or someone on their behalf) takes possession of the whole or substantially the whole of the subject matter of the contract, OR pays a substantial amount of the consideration (broadly, 90%+ of total consideration). For most landlord acquisitions, possession on practical completion is the trigger.

4. **What does the anti-forestalling architecture actually block?**
   F(No.2)A 2024 blocks three patterns designed to retrofit MDR claims: (a) sub-sale arrangements structured around the abolition date where the underlying acquisition completes post-1 June 2024 but a pre-existing pre-abolition contract is in the chain; (b) options or assignments of pre-1-June-2024 contracts where the buyer who takes the assignment completes post-abolition; (c) post-Budget variations to pre-existing contracts that change the consideration or dwelling count (used to package transactions for MDR after Budget day).

5. **I am buying a portfolio of 6 or more dwellings. Does the abolition affect me?**
   Less than you might fear. FA 2003 **s.116(7)** automatically classifies any purchase of **6 or more dwellings in a single transaction** as non-residential for SDLT rate purposes. This is statutory deeming (not a relief, no claim required) and survives MDR abolition. Top non-residential rate is 5% (FA 2003 s.55 Table B), markedly lower than the residential 12-17% top bands plus the additional-dwellings 5% surcharge. For 6+-dwelling bulk acquisitions, s.116(7) is the workhorse route post-abolition.

6. **I am buying 4 dwellings. What can I do now MDR is abolished?**
   Three options to consider with your adviser: (a) restructure to 6+ dwellings if commercial reality permits (s.116(7) deeming); (b) acquire via a genuine pre-existing partnership under FA 2003 Sch 15 para 10, using the Sum of the Lower Proportions calculation (full mechanics in our Schedule 15 SDLT page; anti-Ramsay safeguards apply and the partnership must have substance predating the transaction); (c) FA 2003 s.45 sub-sale relief for narrow genuine pre-completion onward-sale arrangements. None replaces MDR in scope; 4-dwelling acquisitions typically face higher SDLT post-abolition than pre-abolition.

7. **Does the abolition apply to Wales?**
   No. MDR abolition under F(No.2)A 2024 s.7 applies to SDLT only (England + Northern Ireland). Welsh Land Transaction Tax retains its MDR-equivalent under LTTA 2017 Schedule 13; LTT MDR is still live for Welsh transactions on or after 1 June 2024. Cross-border buyers acquiring property in Wales should consult specialist Welsh LTT guidance; the calculation mechanics differ from the pre-abolition SDLT MDR.

8. **Does the abolition apply to Scotland?**
   Scotland never had an MDR equivalent. LBTT (Land and Buildings Transaction Tax) operates a different rate structure for additional dwellings under the Additional Dwelling Supplement regime; sessions writing or acquiring in Scotland should consult LBTT-specific guidance. MDR abolition is irrelevant to Scottish transactions.

9. **What happens if I incorrectly claim MDR after 1 June 2024?**
   The claim will be disallowed on HMRC enquiry. Penalty exposure under Schedule 24 FA 2007 applies if the incorrect claim was careless or deliberate. The behaviour-rating ladder (reasonable care, careless, deliberate, deliberate and concealed) sets the penalty range; an unprompted disclosure plus full cooperation moves the penalty floor down. Deliberate or deliberate-and-concealed claims attract substantially higher penalties and potentially personal liability for company officers under FA 2007 Sch 24 para 19.

10. **I already paid SDLT with MDR for a pre-abolition transaction and HMRC is now enquiring. Is the relief withdrawn retrospectively?**
    No. MDR abolition is not retrospective. Pre-1-June-2024 effective-date transactions that correctly claimed MDR remain valid; relief stands. HMRC enquiries on pre-abolition MDR claims continue to test the eligibility criteria that were in force at the effective date (Sch 6B paras 2-6 conditions, "dwelling" definition, average-consideration calculation).

11. **Can I still benefit from MDR by structuring my purchase through a Special Purpose Vehicle?**
    No. The abolition is transaction-level; the buyer's identity (individual, company, SPV, partnership) does not unlock MDR for a post-1-June-2024 effective-date transaction. The three surviving alternatives (s.116(7) for 6+; Sch 15 SLP for partnership; s.45 for genuine sub-sale) operate on their own statutory criteria; SPV-wrapping does not bypass abolition.

12. **What is the practical SDLT cost increase for a typical 4-dwelling portfolio acquisition post-abolition?**
    Depends on dwelling count, consideration, and whether the 5% additional-dwellings surcharge applies. As illustration: a £1.4m four-dwelling portfolio (average £350k per dwelling) under pre-abolition MDR computed SDLT on £350k per dwelling × 4 with surcharge, often yielding £42k-£70k SDLT depending on band interaction. The same transaction post-abolition is computed on the full £1.4m consideration at residential bands plus surcharge, typically £120k-£170k SDLT. The 6+-dwelling s.116(7) route requires actually buying 6+ dwellings (not just structuring as such), so a 4-dwelling buyer cannot reach for it. Sch 15 SLP and s.45 sub-sale are conditional routes with narrow eligibility. Plan SDLT cost into the acquisition modelling at residential rates plus surcharge as the baseline post-abolition.

---

## Worked examples (Stage 2 drafted 2026-05-25; session may adapt personas + figures)

Three illustrative scenarios. Use anonymised personas (no real names; sector + persona-type only). Vary persona figures from existing site MDR-related coverage where present.

### Worked example 1: transitional cohort, MDR survives on post-abolition completion

A buy-to-let landlord ("Acquirer A") contracted to buy a block of 4 flats on 14 February 2024. The contract included a long-stop completion in October 2025 to allow vendor refurbishment. Acquirer A paid the deposit at exchange and took possession of one flat on 20 May 2024 for refurbishment supervision (substantial performance under FA 2003 s.44).

- **Test:** effective date is the earlier of completion (October 2025) or substantial performance (20 May 2024) per FA 2003 s.119. Substantial performance on 20 May 2024 precedes 1 June 2024.
- **Result:** MDR remains claimable on the transaction. Anti-forestalling does not bite because pre-1-June-2024 substantial performance occurred.
- **Operational point:** Acquirer A's SDLT return must reflect the 20 May 2024 effective date; the MDR claim is computed on the average-consideration-per-dwelling basis under (the now-repealed) Sch 6B. Evidence pack required: contract dated 14 February 2024; deposit receipt; possession evidence (key handover, refurbishment supervision authorisation, contemporaneous correspondence).

### Worked example 2: anti-forestalling, pre-1-June-2024 contract caught by abolition

A property investor ("Acquirer B") entered into a contract on 25 April 2024 to purchase a portfolio of 5 dwellings, with completion scheduled for 30 September 2024. No deposit at exchange beyond standard 5%; no possession before completion; no other substantial performance pre-1-June-2024.

- **Test:** effective date is 30 September 2024 (completion). No pre-1-June-2024 substantial performance. Anti-forestalling looks through the pre-abolition contract date.
- **Result:** MDR not available. The transaction is taxed at residential rates plus 5% additional-dwellings surcharge on the full consideration. The 6+-dwellings s.116(7) deeming is unavailable (only 5 dwellings). Sch 15 SLP partnership route unavailable (Acquirer B is a sole purchaser). FA 2003 s.45 sub-sale unavailable (no genuine onward-sale).
- **Operational point:** Acquirer B faces SDLT computed on the full residential-band consideration plus 5% surcharge on the entire price. Pre-abolition modelling assumed MDR; post-abolition reality is markedly higher. Decision-point: rescind the contract (if vendor cooperative and commercial cost acceptable), restructure to add a 6th dwelling (s.116(7) eligibility), or proceed and absorb the higher SDLT.

### Worked example 3: post-abolition surviving alternative, s.116(7) 6+-dwellings route

A portfolio landlord ("Acquirer C") agrees to acquire 7 buy-to-let dwellings from a single vendor in a single transaction. Contract dated October 2025; completion January 2026. Total consideration £2.45m (average £350k per dwelling). No partnership structure; not connected with vendor.

- **Test:** transaction involves the acquisition of 6 or more dwellings in a single transaction per FA 2003 s.116(7). The statute automatically classifies the transaction as non-residential for SDLT rate purposes; no claim is required.
- **Calculation:** non-residential SDLT bands under FA 2003 s.55 Table B (verify current rates at write time per §16.35): 0% to £150k = £0; 2% £150k-£250k = £2,000; 5% above £250k on £2,200,000 = £110,000. Total non-residential SDLT roughly £112,000.
- **Comparison:** residential rates plus 5% surcharge on £2.45m would be markedly higher (residential top rate 12% on portion above £1.5m plus 5% surcharge on the full price, indicative £230k-£270k depending on band interaction; verify against gov.uk SDLT calculator at write time per §16.35).
- **Operational point:** s.116(7) is the workhorse post-abolition route for 6+-dwellings portfolio acquisitions. Material saving vs residential-rate treatment. No claim machinery (statutory deeming); the buyer's SDLT return simply applies non-residential rates. Evidence pack: vendor sale particulars showing 7 dwellings; valuation per dwelling; transaction documents confirming single-transaction acquisition (linked-transaction analysis under FA 2003 s.108 may aggregate separate but related contracts; session writing notes the linked-transactions discipline per HP §1.B).

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §1.H primary mandatory; §1.A + §1.B + §1 secondary; §16.35 per-write verification on F(No.2)A 2024 s.7, FA 2003 s.116(7), FA 2003 s.119, and HMRC SDLTM29900+ post-abolition status.

## Session-side watcher pattern

Standard per NETNEW_PROGRAM §8.4. After raising any Q at `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_A.md` (absolute path; per §16.15 + §16.37 critical discipline), arm a single Monitor task watching for STATUS flip to answered. Continue working on another page meanwhile.

---

## Per-page work-log (session fills during work)

### Decisions
- Final slug:
- Final category:
- H1 chosen:
- Meta title chosen (<=62 chars):
- Meta description (<=158 chars):
- Why these vs other options:

### Competitor URLs fetched + key takeaway per URL
-

### Existing-page review (overlap, differentiation decision)
-

### Citations added
-

### Internal links added
-

### Inline CTA placements
-

### Build attempts (pass/fail)
-

### Verification (six checks)
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave9_site_wide_flags.md
-

### 2-3 sentence summary
-
