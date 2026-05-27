---
slug: mtd-made-simple-for-landlords-with-jointly-owned-properties
category: making-tax-digital-mtd
intent: A jointly-owning landlord (spouses / civil partners holding rental property jointly, or unmarried co-owners on a Declaration of Trust) at the MTD ITSA threshold-test moment — checking whether they are individually in scope under the April 2026 / 2027 / 2028 mandate — searching this query wants the **joint-property-owner deep-dive on MTD**. The reader needs: (i) the joint-property income-split rule under ITA 2007 s.836 (spouses / civil partners default 50/50 regardless of actual beneficial ownership) read with the new SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026); (ii) the share-of-gross threshold-test mechanic (each owner tests their share of gross, NOT the property's total gross) per §19.4 lock; (iii) the Form 17 election under ITA 2007 s.837 (unequal-shares declaration; 60-day filing window from declaration date; prospective effect only — does NOT backdate); (iv) the in-scope-but-spouse-out-of-scope asymmetry (Form 17 75/25 split puts the 75% spouse into MTD scope at a lower property-gross than the 25% spouse); (v) tenants-in-common (unmarried co-owners — split per actual beneficial interest, no 50/50 default, no Form 17 needed); (vi) ASA per-owner authorisation discipline (each spouse must authorise the agent separately — no spouse-implies-spouse rule); (vii) software / quarterly-update mechanics for joint owners (each spouse files their own quarterly update on their own MTD account; they do NOT share a single submission); (viii) the gross-not-net split point (the share-of-gross rule operates on gross income — net-of-expenses splits are irrelevant for the threshold test); (ix) the in-scope-spouse-only edge case (one spouse in MTD, one not — practical bookkeeping for the household and how the agent handles the asymmetric workflow). Intent: joint-property landlord audience seeking the technical MTD threshold-test mechanics specific to their split-ownership situation.
---

# MTD Made Simple for Landlords with Jointly-Owned Properties: The Threshold Test, Form 17 Asymmetry, and Per-Spouse Quarterly Filing (April 2026 Onwards)

## Statutory anchor

- **Primary — joint-property income-split rule for spouses / civil partners (ITA 2007 s.836):** ITA 2007 s.836(2) states verbatim: *"The individuals are treated for income tax purposes as beneficially entitled to the income in equal shares."* This is the default 50/50 rule for spouses and civil partners living together holding property in both names — it operates **regardless of actual beneficial ownership**. Verified at write time 2026-05-27 against legislation.gov.uk; subsection (3) lists six carve-outs (Exception A through F): income to which neither is beneficially entitled (A), s.837 Form 17 declarations (B), partnership income under ITTOIA 2005 Pt 9 (C), Exception D omitted from 2025/26 per FA 2025 (D), close-company share / securities distributions (E), and income otherwise attributed under other ITA provisions (F). Stage 2 + RUN must re-verify verbatim wording at write time per §16.35 statute-verification discipline.
- **Primary — Form 17 unequal-shares declaration (ITA 2007 s.837):** s.837 permits a joint declaration where *"(a) one of them is beneficially entitled to the income to the exclusion of the other, or (b) they are beneficially entitled to the income in unequal shares"*. The declaration *"must state the beneficial interests of the individuals in—(a) the income to which the declaration relates, and (b) the property from which that income arises"*. Filing obligation: notice given to HMRC *"in such form and manner as the Commissioners ... may prescribe, and ... within the period of 60 days beginning with the date of the declaration"*. Effect: *"in relation to income arising on or after the date of the declaration"* — **prospective only, does NOT backdate**. Verified at write time 2026-05-27 against legislation.gov.uk.
- **Primary — MTD ITSA mandate timeline + threshold test (§19.1 lock):**
  - 6 April 2026 — qualifying income above £50,000 (tested against the 2024/25 SA return).
  - 6 April 2027 — qualifying income above £30,000 (tested against 2025/26 SA return).
  - 6 April 2028 — qualifying income above £20,000 (tested against 2026/27 SA return).
  - House-position-locked at §19.1 Wave 3 lock 2026-05-22, verified against gov.uk on that date.
- **Primary — share-of-gross threshold-test rule for joint owners (§19.4 lock):** §19.4 verbatim Wave 3 lock 2026-05-22: *"Joint owners (spouses, civil partners, joint tenants, tenants in common) test the threshold against their **share of gross**, not the property's total gross. Spouses owning jointly with a £100,000 gross rental income test £50,000 each (default 50/50 split absent Form 17 election). A Form 17 election that splits 75/25 brings the 75% spouse into scope earlier than their partner. HMRC's published view: joint-owner threshold testing follows the income-split rule applied for SA, not a default joint-test rule."* No NEW HP LOCK NEEDED for the substantive joint-owner mechanic itself.
- **Primary — qualifying income definition (§19.2 lock):** qualifying income = gross self-employment turnover + gross property rental income, before deductions, aggregated across the two streams. §19.2 Wave 3 lock 2026-05-22 — gross-not-net is the operationally most-important misconception. Each joint owner tests their **share of gross**, not their **share of net** — net-of-expenses splits are irrelevant for the threshold test.
- **Primary — ASA per-owner authorisation discipline (§19.10 lock — Wave 4 extension):** Each spouse / co-owner must authorise the agent **separately** for MTD ITSA filing. There is no "spouse-implies-spouse" rule. Agent must run two parallel authorisation requests via the Agent Services Account; each spouse approves separately via the gov.uk authorisation portal. Wave 4 §19.10 lock.
- **Supporting — new SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026) — F-3 drift catch on §19 architecture:** The Wave 3 §19 locks reference **SI 2021/1076 (Income Tax (Digital Requirements) Regulations 2021)** as the operative MTD instrument. **Verified at write time 2026-05-27:** SI 2021/1076 was **revoked on 1 April 2026** by **SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026)** which is now the operative MTD ITSA instrument. The substantive mechanics carry over but regulation numbers have changed: qualifying income is at **SI 2026/336 reg 25** (was reg 20 of the 2021 SI); qualifying-amount threshold is at **reg 27**; exclusion-notice exemption is at **reg 18**; meaning of "excluded" is at **reg 20**; three-year-income-exemption exit rule is at **reg 24** (was reg 22 of the 2021 SI). HP §19 architecture needs a Wave 9+ extension to migrate citations. F-3 logged in `megawave3_site_wide_flags.md` 2026-05-27.
- **Supporting — TMA 1970 Sch A1 framework:** Sch A1 (inserted by F(No.2)A 2017 Sch 14) establishes the "relevant persons" framework for MTD digital obligations; paragraph 14(2) defines "digitally excluded" (cross-referenced by SI 2026/336 reg 20). Sessions writing must NOT misattribute the qualifying-income definition to TMA 1970 Sch A1 — Sch A1 sets the framework; SI 2026/336 reg 25 sets the operative definition.
- **Supporting — spouse-mechanics framework (§24 Wave 5 extension lock):** unequal-share rental-income splits, the documents that support them, and the HMRC enquiry pattern when they fail — §24 is the working detail Wave 5 Session C operational pages anchor on; this MTD-specific page cross-links §24 for Form 17 evidence discipline but does NOT replicate it.
- **Supporting — joint tenants vs tenants in common distinction:** spouses / civil partners default to ITA 2007 s.836 50/50 regardless of legal title. Unmarried co-owners (or married couples expressly opting out via Declaration of Trust) split per actual beneficial interest — for unmarried co-owners, no 50/50 default applies and no Form 17 is needed. The MTD threshold test follows the SA income-split — for unmarried co-owners, that is the actual beneficial share, evidenced by the trust deed.
- **House position reference:** §19.4 (primary anchor — joint-property share-of-gross), §19.1 (mandate timeline + test year), §19.2 (qualifying income definition + gross-not-net), §19.10 (ASA per-owner authorisation), §24 (Wave 5 spouse-mechanics framework — Form 17 documentation + HMRC enquiry pattern). NEW HP LOCK NEEDED **only at the SI-citation-migration level** (F-3 logged); the substantive joint-owner mechanic itself is fully covered.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **joint-property-owner deep-dive on MTD ITSA** — the threshold-test mechanic specific to spouses / civil partners holding rental property jointly, plus tenants-in-common Declaration-of-Trust splits, with the Form 17 asymmetry and the per-spouse quarterly-filing operational layer. Sibling MW3-A MTD picks cover different intents:

- **A6 (`government-to-implement-mtd-for-it-with-lower-threshold`)** — news-cycle framing of the £20,000 phase-in announcement; not joint-property-specific.
- **A7 (`heres-how-you-can-exit-mtd-if-your-income-falls`)** — three-tax-year income-exemption exit route under SI 2026/336 reg 24 (formerly SI 2021/1076 reg 22); exit-mechanic-specific, not joint-property-specific.
- **A11 (`how-making-tax-digital-affects-limited-companies`)** — LtdCo position; LtdCo-audience-specific, not joint-owner-specific.
- **A16 (`making-tax-digital-major-self-assessment-overhaul-ahead`)** — system-overhaul cultural-shift framing; orientation-level.
- **A18 (`what-is-qualifying-income-for-mtd`)** — technical-definition deep-dive on qualifying income (gross-not-net); the threshold-test-input layer. This page is downstream — it uses the qualifying-income definition then **applies the joint-owner share-of-gross mechanic** to it. A18 covers joint-property briefly as ONE worked-example; A19 (this page) covers it as the PRIMARY focus with the Form 17 asymmetry, the per-spouse authorisation discipline, tenants-in-common splits, and the asymmetric-scope edge case.
- **A20 (`mtd-penalties-exemptions-and-what-to-watch`)** (next pick this batch) — penalty regime + exemption catalogue; penalty-and-exemption-specific. This page touches the exemption-by-status (digital exclusion) only at the operational-asymmetry edge (one spouse may be exempt and the other in scope).

None of those addresses the **joint-property landlord's threshold-test scenario end-to-end** with: the ITA 2007 s.836 default 50/50 rule and the s.837 Form 17 override; the share-of-gross mechanic and how it produces an in-scope-but-spouse-out-of-scope outcome; the prospective-only effect of Form 17 (the 60-day filing window from declaration date, no backdating); the tenants-in-common distinction (no 50/50 default for unmarried co-owners); and the per-spouse quarterly-filing operational layer (each spouse files their own quarterly update on their own MTD account, with separate ASA authorisations). The angle this page takes: a jointly-owning landlord couple at the threshold-test moment (typically 2025-2026 for the April 2026 cohort) needs to KNOW (i) whether each individual spouse is in scope, (ii) how to use Form 17 to allocate the asymmetry deliberately if beneficial-interest reality differs from 50/50, (iii) what the operational consequences are if only one spouse is in scope.

## Key questions this page must answer

1. What is the joint-property income-split rule for spouses / civil partners under ITA 2007 s.836 — by default, income is treated as beneficially entitled in equal 50/50 shares regardless of actual beneficial ownership, unless one of six exceptions applies (Form 17 declaration being the operative one for landlords)?
2. How does the MTD threshold test apply to joint owners — each owner tests against their **share of gross**, NOT the property's total gross; a £100,000 jointly-owned rental at default 50/50 means each spouse tests £50,000 (both at the April 2026 boundary)?
3. What is Form 17 and when does it apply — ITA 2007 s.837 joint declaration of unequal beneficial interests; filed within 60 days of the declaration date; effective prospectively (does NOT backdate)? The 60-day window is the critical operational point — miss it, and the declaration is void.
4. What does a Form 17 75/25 split do to the MTD threshold test — the 75% spouse comes into MTD scope at a lower property-gross level than the 25% spouse; on a £100,000 gross, the 75% spouse tests £75,000 (in scope April 2026 at £50k threshold) and the 25% spouse tests £25,000 (in scope April 2028 only at £20k threshold)?
5. What is the difference between joint tenants and tenants in common for MTD threshold purposes — spouses / civil partners default to 50/50 regardless of legal title (s.836); unmarried co-owners (or married couples on a Declaration of Trust opting out) split per actual beneficial interest, evidenced by the trust deed; no 50/50 default for unmarried tenants-in-common?
6. What documentary evidence supports a Form 17 election — a declaration in HMRC's prescribed form (Form 17 itself), supporting Declaration of Trust or other beneficial-interest evidence, filed within the 60-day window? §24 (Wave 5 spouse-mechanics framework) covers the document trail in more detail; the MTD threshold test depends on the underlying SA income split, which depends on the Form 17 / DoT documentation.
7. How does ASA authorisation work for jointly-owning spouses — each spouse must authorise the agent **separately** for MTD ITSA; there is no spouse-implies-spouse rule; the agent runs two parallel authorisation requests via the Agent Services Account, each spouse approves via gov.uk authorisation portal individually?
8. How does quarterly filing work for jointly-owning spouses — each spouse files their own quarterly update on their own MTD account; they do NOT share a single submission; the agent (with separate ASA authorisations) operates two parallel quarterly-update cycles?
9. What happens in the asymmetric-scope case — one spouse in MTD, one not — the in-scope spouse runs the full MTD ITSA quarterly cycle on their share; the out-of-scope spouse continues regular SA reporting; the joint-property bookkeeping must split gross / expenses per share for both spouses' returns (cross-reference §19.13 letting-agent net-of-fees trap)?
10. What is the gross-not-net split point — the share-of-gross rule (§19.4) operates on **gross** rental income for the threshold test; net-of-expenses splits are irrelevant for threshold purposes; a 50/50 split of £100,000 gross is £50,000 each, NOT a 50/50 split of net profit?
11. What about the new SI 2026/336 — the operative MTD instrument from 1 April 2026 is **SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026)**, which **revoked SI 2021/1076**; substantive mechanics carry over but regulation numbers have migrated (qualifying income at reg 25, threshold at reg 27)?

## Manager pre-decisions placeholder

- **Category routing:** `making-tax-digital-mtd` (the MTD pillar; this page is the joint-property-specific deep-dive). Manager may consider `landlord-tax-essentials` as cross-listing but MTD pillar is the primary route.
- **Worked-example numbers:**
  - £100k joint gross, default 50/50 — each spouse £50k, both at April 2026 boundary (both in scope; both file separate quarterly updates).
  - £100k joint gross, Form 17 75/25 — 75% spouse £75k (in scope April 2026), 25% spouse £25k (in scope April 2028 only — out of scope until 6 April 2028).
  - £100k joint gross, Form 17 99/1 (a divorce-planning split scenario) — 99% spouse £99k (in scope April 2026), 1% spouse £1k (never in scope at current thresholds; will file regular SA only).
  - Tenants-in-common (unmarried): £100k joint gross on a 60/40 trust deed — 60% owner £60k (in scope April 2026), 40% owner £40k (in scope April 2027 at £30k threshold).
  - £45k joint gross, default 50/50 — each spouse £22.5k (in scope April 2028 only at £20k threshold; both out of scope until then).
  - In-scope-asymmetric example: £60k joint gross, Form 17 80/20 — 80% spouse £48k (in scope April 2027 at £30k threshold), 20% spouse £12k (never in scope at current thresholds; spouse-out-of-scope edge case operational mechanics).
  - Stage 2 + RUN must verify SI 2026/336 reg 25 / 27 wording at write time per §16.35 statute-verification discipline.
  - Anti-cannibal: keep worked-example landlord profiles distinct from A18 (qualifying-income deep-dive) and A20 (penalty + exemption) examples.
- **Cross-link targets:**
  - Within MW3 Bucket A: `what-is-qualifying-income-for-mtd` (A18 — qualifying-income definition + gross-not-net); `mtd-penalties-exemptions-and-what-to-watch` (A20 — what happens once in scope and miss obligations, plus digital-exclusion exemption for the spouse-out-of-scope edge case); `heres-how-you-can-exit-mtd-if-your-income-falls` (A7 — exit after 3 years below threshold, relevant when income drops post-Form 17 reallocation); `government-to-implement-mtd-for-it-with-lower-threshold` (A6 — phase-in news context); `late-filing-and-late-payment-penalties` (A13 — adjacent penalty regime for in-scope landlords).
  - To existing pages: pillar pages on landlord-tax-essentials; MTD pillar landing; Wave 5 Session C Form 17 + spouse-mechanics operational pages (cross-link to §24 framework); pillar pages on Declaration of Trust for unmarried co-owners.

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2007/3/section/836`** — ITA 2007 s.836 (joint-property income default 50/50 spouses / civil partners). RUN WebFetches the verbatim subsection (2) text + Exceptions A-F at subsection (3) at write per §16.35.
- **`https://www.legislation.gov.uk/ukpga/2007/3/section/837`** — ITA 2007 s.837 (Form 17 unequal-shares declaration). RUN WebFetches verbatim the joint-declaration wording + 60-day notice window + prospective-only effect at write per §16.35.
- **`https://www.legislation.gov.uk/uksi/2026/336/contents`** — SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026). RUN WebFetches reg 18 (exclusion-notice exemption), reg 19 (exclusion-notice mechanism), reg 20 (meaning of "excluded"), reg 24 (three-year income-exemption exit), reg 25 (qualifying income definition), reg 27 (qualifying amount) at write per §16.35.
- **`https://www.legislation.gov.uk/ukpga/1970/9/schedule/A1`** — TMA 1970 Sch A1 (relevant persons framework). RUN WebFetches verbatim para 14(2) "digitally excluded" definition at write per §16.35.
- **`https://www.legislation.gov.uk/ukpga/2017/32/schedule/14`** — F(No.2)A 2017 Sch 14 (inserted TMA 1970 Sch A1).
- **`https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030`** — HMRC PIM1030 (jointly-owned property income — spouses / civil partners 50/50 default + Form 17 mechanics). RUN WebFetches at write.
- **`https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9800`** — HMRC TSEM9800+ (Form 17 jointly-held property + documentation discipline). RUN WebFetches at write.
- **`https://www.gov.uk/government/publications/making-tax-digital-for-income-tax`** — HMRC MTD ITSA policy paper landing. Verify currency at write; Wave 9 recurring HMRC URL rot watchpoint.
- **`https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax`** — HMRC sign-up landing.
- **`https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax`** — HMRC use-MTD-ITSA landing (covers quarterly update mechanics).
- **`https://www.gov.uk/government/publications/find-software-thats-compatible-with-making-tax-digital-for-income-tax`** — HMRC compatible-software list.
- **`https://www.gov.uk/government/publications/declare-beneficial-interests-in-joint-property-and-income`** — gov.uk Form 17 page (current form + notes).
- **`https://www.gov.uk/hmrc-internal-manuals/agent-services-account-manual`** — HMRC ASA / Agent Services Manual (per-owner authorisation discipline). Verify URL currency at write.

### Competitor URLs (RUN session WebSearch at write time)

`<!-- competitor section: RUN session WebSearch at write time. Suggested queries: "MTD ITSA joint owners landlord 2026", "Form 17 unequal shares jointly owned property MTD", "MTD threshold joint property spouse 50/50", "MTD ITSA tenants in common Declaration of Trust", "MTD spouse asymmetric scope per-owner authorisation". Aim 3-5 specialist accountancy + MTD-software-vendor pages — Coconut / FreeAgent / Xero MTD knowledge bases; RSM / BDO landlord-tax desks; Provestor / Rentalbux landlord-resource sites; HMRC software-vendor partner pages. Verify each with httpx + follow_redirects=True before listing. Watch for stale "MTD threshold is £10,000" framings (abandoned 2022, §19.8); stale "joint owners test the property's total gross" framings (wrong — each tests share of gross, §19.4); stale "Form 17 backdates to start of marriage" framings (false — prospective only, ITA 2007 s.837); stale "SI 2021/1076" framings (revoked 1 April 2026 by SI 2026/336, F-3). -->`

### HMRC manual anchors

- HMRC Property Income Manual (PIM): PIM1030 jointly-owned property income (spouses / civil partners 50/50 default + Form 17 election).
- HMRC Trusts, Settlements and Estates Manual (TSEM): TSEM9800+ Form 17 jointly-held property documentary evidence.
- HMRC Compliance Handbook (CH): CH61500+ reasonable excuse (relevant where joint-owner Form 17 timing went wrong); CH80100+ Sch 24 inaccuracy (relevant where joint-owner split mis-declared).
- HMRC Agent Services Manual: per-owner authorisation discipline + parallel quarterly-update mechanics.
- HMRC MTD ITSA policy paper + guidance landings on gov.uk.

### Case-law

- **Hadee Engineering v HMRC [2020] UKFTT 0497 (TC)** — documentary-evidence discipline for unequal-shares claims (the documentary-evidence theme that Form 17 operationalises). Relevant for joint-owner audit-trail anchoring.
- **Sokoya v HMRC [2009] STC (SCD) 109** — ITA 2007 s.836 default scope limited to spouses living together; separation breaks the default (relevant for the separated-spouse joint-owner edge case).
- **Lebrun v HMRC [2017] UKFTT 800 (TC)** — illustrative on Form 17 prospective-only effect (sessions confirm precise citation at write; if a more directly on-point FTT case emerges, prefer it).
- Stage 2 + RUN must NOT manufacture authorities. If a more directly on-point FTT case emerges, prefer it; otherwise hold to the established line.

### Legislation anchors (RUN session WebFetches at write time per §16.35)

- **ITA 2007 s.836** (default 50/50 spouse rule + Exceptions A-F at subsection (3) — verified verbatim 2026-05-27).
- **ITA 2007 s.837** (Form 17 unequal-shares declaration + 60-day notice window + prospective-only effect — verified verbatim 2026-05-27).
- **SI 2026/336 reg 25** (qualifying income definition — verified 2026-05-27).
- **SI 2026/336 reg 27** (qualifying amount / threshold figures — verified 2026-05-27).
- **SI 2026/336 reg 18 + reg 20** (exclusion-notice exemption mechanism + "digitally excluded" cross-reference — verified 2026-05-27).
- **SI 2026/336 reg 24** (three-tax-year income-exemption exit — verified 2026-05-27; replaces SI 2021/1076 reg 22).
- **TMA 1970 Sch A1 paragraph 14(2)** (digital-exclusion definition cross-referenced by SI 2026/336 reg 20).
- F(No.2)A 2017 Sch 14 (inserted TMA 1970 Sch A1).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — The joint-owner threshold-test matrix (the page's first concrete artefact)

Render as semantic HTML table. The structural anchor most competitor commentary misses:

| Scenario | Property gross | Ownership | Spouse A share | Spouse B share | A in scope | B in scope |
|---|---|---|---|---|---|---|
| Default 50/50 — both above April 2026 threshold | £100,000 | Spouses, no Form 17 | £50,000 | £50,000 | Apr 2026 (£50k) | Apr 2026 (£50k) |
| Default 50/50 — both below April 2026 / above April 2028 | £45,000 | Spouses, no Form 17 | £22,500 | £22,500 | Apr 2028 (£20k) | Apr 2028 (£20k) |
| Form 17 75/25 — asymmetric scope | £100,000 | Spouses, Form 17 75/25 | £75,000 | £25,000 | Apr 2026 (£50k) | Apr 2028 (£20k) |
| Form 17 99/1 — divorce-planning split | £100,000 | Spouses, Form 17 99/1 | £99,000 | £1,000 | Apr 2026 (£50k) | Never in scope at current thresholds |
| Tenants in common — unmarried co-owners 60/40 | £100,000 | TIC, Declaration of Trust 60/40 | £60,000 | £40,000 | Apr 2026 (£50k) | Apr 2027 (£30k) |
| Form 17 80/20 — partial asymmetric | £60,000 | Spouses, Form 17 80/20 | £48,000 | £12,000 | Apr 2027 (£30k) | Never in scope at current thresholds |

Operational anchor: each owner tests their SHARE OF GROSS against the qualifying-amount threshold for the relevant tax year. The share-of-gross rule (§19.4) operates on gross rental income, not net-of-expenses. Spouses default to ITA 2007 s.836 50/50 regardless of legal title; tenants in common (or married couples opting out via Declaration of Trust + Form 17) split per actual beneficial interest.

### Example 2 — The Form 17 60-day window walked

Anonymised case: James and Priya Whitwell (anonymised — no real name) jointly own a £140,000-gross rental portfolio purchased 2019 in equal legal title; Priya contributed 70% of the deposit and the mortgage costs reflect this. Their accountant advises an unequal-share declaration to align the SA income split (and the MTD threshold test) with beneficial reality.

- **Step 1 — Declaration of Trust executed 15 March 2026.** Priya 70% beneficial; James 30%. Solicitor-drafted; signed by both spouses; notarised.
- **Step 2 — Form 17 prepared.** Both spouses sign the form (joint declaration required per ITA 2007 s.837); attached Declaration of Trust as evidence of the underlying beneficial-interests claim.
- **Step 3 — 60-day window starts from the date of the declaration (15 March 2026).** Window expires 14 May 2026 — the form must reach HMRC within this period or the declaration is void.
- **Step 4 — Form 17 submitted to HMRC 28 March 2026.** Within window; HMRC acknowledges receipt.
- **Step 5 — Prospective effect from declaration date (15 March 2026).** SA income split for 2026/27 (the tax year containing the declaration) follows the 70/30 split FROM 15 MARCH 2026 onward; pre-15-March 2026 income remains on the default 50/50 split for any historical year (Form 17 does NOT backdate).
- **Step 6 — MTD threshold test for April 2026 mandate (testing 2024/25 SA return).** The 2024/25 SA return predated the Form 17 declaration (executed 15 March 2026) → 2024/25 split was the default 50/50 → £70,000 each → both spouses in scope April 2026.
- **Step 7 — MTD threshold test for April 2027 mandate (testing 2025/26 SA return).** 2025/26 SA return: income arising before 15 March 2026 (250 days of the tax year) on 50/50 split; income arising from 15 March 2026 to 5 April 2026 (22 days) on 70/30 split. Aggregate share-of-gross still close to 50/50 for 2025/26 — both spouses likely above £30k threshold → both in scope April 2027.
- **Step 8 — MTD threshold test for April 2028 mandate (testing 2026/27 SA return).** 2026/27 SA return: first full year of the 70/30 split (full year prospective effect). Priya's share-of-gross £98,000; James's share-of-gross £42,000 — both above £20k → both still in scope.
- **Operational lesson:** Form 17 election prospective-only effect means the FIRST FULL YEAR of the new split is the tax year AFTER the declaration. The MTD threshold test uses the SA return for the preceding tax year, so the timing implication for MTD scope can lag the declaration date by 12-24 months.

### Example 3 — Asymmetric-scope household operational mechanics

Anonymised case: Marcus and Eleanor Sheridan (anonymised). Joint £120,000-gross rental portfolio; Form 17 70/30 in place from 2023; Marcus 70% / Eleanor 30%. April 2026 mandate:

- Marcus share-of-gross: £84,000 — above £50k → **in scope April 2026**.
- Eleanor share-of-gross: £36,000 — below £50k April 2026 boundary; above £30k April 2027 boundary → **in scope April 2027**.
- 2026/27 tax year: **Marcus runs full MTD ITSA quarterly cycle; Eleanor continues regular SA reporting.**
- Operational mechanics:
  - **Agent Services Account (ASA) authorisation:** the household accountant (acting for both spouses) must run TWO authorisation requests via the ASA — Marcus authorises separately via gov.uk authorisation portal for his MTD ITSA filing; Eleanor's existing SA authorisation continues separately. Per §19.10 Wave 4 lock there is NO spouse-implies-spouse rule. If Marcus's MTD ITSA authorisation expires, the accountant must re-request it for him alone (does NOT cascade from Eleanor's SA authorisation).
  - **Software / quarterly-update mechanics:** Marcus's accountant sets up his MTD ITSA account with HMRC-compatible software; quarterly updates submitted by his accountant via that software. Eleanor's SA return continues via the accountant's existing SA process.
  - **Household bookkeeping discipline:** the joint-property bookkeeping must split gross / expenses per share for BOTH spouses' returns (consistent figures). Letting-agent statements must be reconciled to the 70/30 split; mortgage interest, repairs, professional fees, insurance all allocated 70/30; separate spreadsheets or workpapers for each spouse. Cross-link §19.13 letting-agent net-of-fees trap (threshold test uses GROSS-rent-collected by agent, not net-paid-to-landlord).
  - **End-of-period statement (EoPS) + final declaration:** Marcus must file EoPS for the property business + final declaration consolidating MTD quarterly updates + any other income, by 31 January 2028 (for 2026/27 tax year). Eleanor files regular SA return for 2026/27 by 31 January 2028.
  - **Eleanor's transition to MTD ITSA from April 2027:** ahead of the April 2027 mandate, Eleanor's accountant runs a parallel ASA authorisation request for her; quarterly cycle begins 6 April 2027; from 2027/28 BOTH spouses are running MTD ITSA quarterly cycles in parallel.
- **Operational lesson:** asymmetric-scope households need careful workflow segregation. The accountant cannot treat the household as a single filer; each spouse is an independent MTD-ITSA-or-SA reporter with their own authorisations, software access, and quarterly cycle. Bookkeeping discipline up front (split gross + expenses per share consistently) prevents reconciliation pain at quarterly-update gates.

### Example 4 — Tenants in common (unmarried co-owners) walked

Anonymised case: Tom Whitaker and Olivia Bennett (anonymised). Unmarried co-owners of a single £80,000-gross London rental flat purchased 2022; Declaration of Trust on purchase recording 65% Tom / 35% Olivia (reflects deposit + mortgage-cost contribution).

- **Default rule:** ITA 2007 s.836 50/50 default applies to SPOUSES + CIVIL PARTNERS LIVING TOGETHER ONLY. Tom and Olivia are unmarried co-owners → s.836 does not apply → split is per actual beneficial interest evidenced by the trust deed.
- **No Form 17 required:** Form 17 (ITA 2007 s.837) is the unequal-share declaration mechanism for spouses / civil partners only. Unmarried co-owners do NOT use Form 17; the trust deed itself is the operative documentation.
- **MTD threshold test:** Tom share-of-gross £52,000 — above £50k → **in scope April 2026**. Olivia share-of-gross £28,000 — above £20k → **in scope April 2028 (not April 2027 at £30k threshold)**.
- **Operational mechanics:** each co-owner files their own MTD ITSA (or SA pre-mandate) on their own account with their own ASA authorisation. Agent must run two parallel authorisation requests. Bookkeeping split 65/35 consistently on gross + expenses.
- **What happens if Tom and Olivia marry in 2027 (mid-mandate)?** Under ITA 2007 s.836 the default 50/50 rule activates from the marriage date for spouses LIVING TOGETHER. If Tom and Olivia want to PRESERVE the 65/35 split (consistent with their actual beneficial interests), they must:
  1. Confirm the Declaration of Trust remains operative;
  2. Execute Form 17 within 60 days of the declaration (the existing DoT counts as the declaration for s.837 purposes; the form simply lodges the unequal-share claim with HMRC).
  3. Otherwise the default 50/50 rule overwrites the SA split from the marriage date (the trust deed continues to record the beneficial interest but the SA income split defaults 50/50 under s.836 absent Form 17).
- **Operational lesson:** unmarried co-owners DO NOT NEED Form 17; the trust deed alone supports the unequal split. Marriage TRIGGERS the s.836 default unless Form 17 is filed; the 60-day window from declaration date applies once Form 17 is executed.

### Example 5 — The gross-not-net split point worked

Anonymised case: David and Anna Marchand (anonymised). Joint £100,000-gross rental portfolio; £40,000 of allowable expenses (mortgage interest, repairs, agent fees, insurance, void cover); net profit £60,000. Default 50/50 split (no Form 17).

- **Threshold test mechanic (§19.4 + §19.2 Wave 3 locks):** each spouse tests their **share of gross**, NOT their **share of net**. Share-of-gross = £50,000 each (50% × £100,000 gross). Both spouses test £50,000 against the April 2026 boundary (£50k threshold).
- **What if the household instead applied the share-of-net rule?** Share-of-net would be £30,000 each (50% × £60,000 net). Both spouses would test £30,000 → in scope April 2027 (£30k threshold) NOT April 2026.
- **Why the share-of-gross is the operative rule:** the qualifying-income definition at SI 2026/336 reg 25 (formerly SI 2021/1076 reg 20) operates on GROSS receipts; expenses are irrelevant for the threshold test. §19.2 Wave 3 lock 2026-05-22 corrects the common misconception that the threshold is "net rental profit" — it is not.
- **What about deductible-but-restricted s.24 mortgage interest?** Mortgage interest is no longer fully deductible (s.24 finance-cost restriction) for individuals — but this is irrelevant for the MTD threshold test because the test operates on gross, not on allowable deductions.
- **Operational lesson:** the threshold test uses **gross** rental receipts split per beneficial share. A high-expense low-net household can be in MTD scope on a low net profit. Confirm gross figures with letting agents and bank statements; reconcile to SA return income totals; do not let an accountant's "net rental profit" framing slip into the threshold-test calculation. The §19.13 Wave 4 letting-agent net-of-fees trap (threshold test uses GROSS-rent-collected by agent, NOT net-paid-to-landlord after agent commission) compounds the risk for managed-letting portfolios.

### Example 6 — The asymmetric-scope-with-digital-exclusion edge case

Anonymised case: Patricia and Henry Goodfellow (anonymised). Joint £80,000-gross rental portfolio in equal title; default 50/50 split. April 2026 mandate; Henry (age 79) is digitally excluded (no broadband at retirement-home address; mental-incapacity grounds following stroke):

- **Patricia share-of-gross:** £40,000 — below £50k April 2026 boundary; above £30k April 2027 boundary → **in scope April 2027**.
- **Henry share-of-gross:** £40,000 — same threshold position, BUT Henry has applied for an exclusion notice under SI 2026/336 reg 18 + reg 20 + TMA 1970 Sch A1 para 14(2). HMRC issues exclusion notice → Henry **exempt** from MTD ITSA for the duration of the notice; continues regular SA reporting via his attorney (LPA in place).
- **Operational mechanics from April 2027:** Patricia runs MTD ITSA quarterly cycle; Henry's attorney files regular SA return; household bookkeeping splits gross / expenses 50/50 consistently; agent must hold separate authorisations (ASA for Patricia, SA agent authorisation for Henry's attorney).
- **What if Patricia later divorces / separates (post-2027)?** The s.836 default ceases to apply on separation (Sokoya v HMRC [2009] STC (SCD) 109); the SA income split reverts to actual beneficial interest (50/50 per legal title absent other evidence). Each spouse's MTD scope is re-assessed against the new SA return.
- **Cross-link:** see A20 (`mtd-penalties-exemptions-and-what-to-watch`) for the full digital-exclusion exemption mechanics under SI 2026/336 reg 18 + reg 20 + TMA 1970 Sch A1 para 14(2). This page covers the JOINT-OWNER overlay only.
- **Operational lesson:** the digital-exclusion exemption is INDIVIDUAL-LEVEL not household-level. A spouse can be exempt while the other is in MTD scope; bookkeeping discipline + separate authorisations + parallel SA / MTD-ITSA cycles all required.

### Example 7 — Misframings the page must correct (verbatim do-not-write list)

- **Misframe 1:** "Joint owners test the property's total gross against the MTD threshold." FALSE per §19.4 — each owner tests their **share of gross**.
- **Misframe 2:** "Spouses always split 50/50 for tax purposes." FALSE — default 50/50 under ITA 2007 s.836 can be displaced by Form 17 unequal-shares declaration under s.837.
- **Misframe 3:** "Form 17 backdates to the start of the marriage / when the property was acquired." FALSE per ITA 2007 s.837 — Form 17 has **prospective effect only** from the declaration date.
- **Misframe 4:** "Form 17 can be filed any time after the declaration." FALSE — there is a strict **60-day filing window** from the date of the declaration; late filing voids the declaration.
- **Misframe 5:** "Tenants in common use Form 17 to record their split." FALSE — Form 17 (s.837) applies to SPOUSES / CIVIL PARTNERS only. Unmarried co-owners use a Declaration of Trust; no Form 17.
- **Misframe 6:** "If one spouse authorises an agent for MTD ITSA, the spouse-implies-spouse rule covers both." FALSE per §19.10 Wave 4 lock — each spouse must authorise the agent SEPARATELY via the ASA; no implicit cascade.
- **Misframe 7:** "Jointly-owning spouses file a single combined MTD ITSA quarterly update." FALSE — each spouse files their own quarterly update on their own MTD account; separate submissions.
- **Misframe 8:** "Share-of-net is the threshold-test input." FALSE per §19.2 — the threshold test uses GROSS rental income, before deductions. Share-of-net is irrelevant for threshold purposes.
- **Misframe 9:** "If one spouse is below threshold, neither is in MTD scope." FALSE — the threshold test is INDIVIDUAL-LEVEL. A Form 17 75/25 split can put one spouse in scope while the other remains out (asymmetric-scope edge case).
- **Misframe 10:** "The MTD operative regulations are SI 2021/1076." FALSE as of 1 April 2026 — SI 2021/1076 was revoked and replaced by SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026); F-3 drift catch logged. Citations must use SI 2026/336 going forward.
- **Misframe 11:** "Separation breaks the 50/50 default immediately." PARTLY TRUE — s.836 applies to spouses LIVING TOGETHER (Sokoya v HMRC [2009] STC (SCD) 109). Once separated, the default falls away and the SA split reverts to actual beneficial interest; but the cessation date can be a fact-sensitive question.
- **Misframe 12:** "A Form 17 99/1 split is uncontroversially allowed." MISLEADING — Form 17 requires actual beneficial-interest reality to support the split. HMRC can challenge a 99/1 declaration where the underlying Declaration of Trust does not support such an unequal interest; documentary evidence essential.
- **Misframe 13:** "The £10,000 threshold applies to joint owners differently." FALSE — the £10,000 threshold was ABANDONED in 2022 (§19.8 lock); current thresholds are £50k (April 2026) / £30k (April 2027) / £20k (April 2028).

## FAQ expansion (RUN session polishes prose; 12-14 FAQs target)

1. **Q: How does the MTD ITSA threshold test apply to spouses jointly owning rental property?**
   A: Each spouse tests their **share of gross** rental income against the qualifying-amount threshold for the relevant tax year, NOT the property's total gross. Per ITA 2007 s.836, spouses / civil partners living together are treated as beneficially entitled in equal 50/50 shares regardless of legal title, unless one of six exceptions applies (Form 17 declaration being the operative one). On a £100,000 jointly-owned rental portfolio at the default 50/50 split, each spouse tests £50,000 → both in scope from April 2026 (£50k threshold). The share-of-gross rule is at §19.4 Wave 3 lock; the gross-not-net point is at §19.2 Wave 3 lock.

2. **Q: What is Form 17 and when does it apply?**
   A: Form 17 is the HMRC form used to lodge a joint declaration under ITA 2007 s.837 that spouses / civil partners hold beneficial interests in jointly-owned property income in unequal shares (or that one spouse is beneficially entitled to the income to the exclusion of the other). The declaration must be lodged with HMRC within **60 days of the date of the declaration**; late filing voids the declaration. Effect is **prospective only** — it does NOT backdate to the start of the marriage or property acquisition. Supporting evidence (typically a Declaration of Trust) must underpin the unequal-share claim.

3. **Q: What happens to MTD threshold-testing when a Form 17 75/25 split is in place?**
   A: The 75% spouse tests 75% of gross; the 25% spouse tests 25% of gross. On £100,000 joint gross, the 75% spouse tests £75,000 (in scope April 2026 at £50k threshold) and the 25% spouse tests £25,000 (in scope April 2028 at £20k threshold). Asymmetric scope: one spouse can be running MTD ITSA quarterly cycles while the other continues regular SA reporting. Cross-link Example 3 in the page body for the operational mechanics.

4. **Q: How do tenants in common (unmarried co-owners) split for MTD threshold purposes?**
   A: ITA 2007 s.836 default 50/50 applies to SPOUSES / CIVIL PARTNERS LIVING TOGETHER only. Unmarried co-owners (tenants in common) split per actual beneficial interest evidenced by the Declaration of Trust on the property. No Form 17 required; the trust deed is the operative documentation. Each co-owner tests their share-of-gross against the qualifying-amount threshold individually.

5. **Q: Can a Form 17 election be backdated?**
   A: No. Per ITA 2007 s.837 the declaration takes effect prospectively from the date of the declaration (the date the spouses sign the form supported by the Declaration of Trust). It does NOT apply to income arising before that date. The 60-day filing window starts from the declaration date; the form must reach HMRC within that window or the declaration is void. The first full tax year of the new split is the tax year following the declaration.

6. **Q: Each spouse needs to authorise the agent separately — what does that mean operationally?**
   A: Per §19.10 Wave 4 lock, MTD ITSA agent authorisation operates via the Agent Services Account (ASA) on a per-owner basis. There is NO spouse-implies-spouse rule. The agent must run TWO parallel authorisation requests via the ASA — each spouse approves via the gov.uk authorisation portal individually. If one spouse's authorisation expires or is revoked, it does NOT cascade to the other spouse; the agent must re-request authorisation for the affected spouse alone.

7. **Q: How do joint-owning spouses file quarterly updates under MTD ITSA?**
   A: Each spouse files their own quarterly update on their own MTD ITSA account; they do NOT share a single submission. The agent (with separate ASA authorisations) operates two parallel quarterly-update cycles — quarterly updates submitted independently for each spouse's share of gross + expenses. End-of-period statements (EoPS) and final declarations are likewise filed individually. Software setup, account access, and submission cadence are spouse-by-spouse.

8. **Q: What happens if one spouse is in MTD scope and the other is not?**
   A: Asymmetric-scope households run a mixed workflow. The in-scope spouse runs the full MTD ITSA quarterly cycle (quarterly updates + EoPS + final declaration). The out-of-scope spouse continues regular SA reporting. The joint-property bookkeeping must split gross + expenses per share for BOTH spouses' returns — letting-agent statements reconciled to the split, expenses allocated per share, separate workpapers for each spouse. Cross-link §19.13 letting-agent net-of-fees trap (threshold test uses GROSS-rent-collected by agent, NOT net-paid-to-landlord).

9. **Q: Does the share-of-gross rule operate on gross or net rental income?**
   A: GROSS. Per §19.2 Wave 3 lock + §19.4 Wave 3 lock + SI 2026/336 reg 25, the qualifying-income definition operates on gross rental receipts before deductions. A 50/50 split of £100,000 gross is £50,000 each, NOT a 50/50 split of net profit. Expenses (mortgage interest, repairs, agent fees, insurance) are irrelevant for the threshold test. The common misconception that the threshold is "net rental profit" is wrong; high-expense low-net households can still be in MTD scope on a low net.

10. **Q: What documentary evidence supports a Form 17 election?**
    A: The declaration itself (Form 17, signed by both spouses) plus underlying evidence of the unequal-share beneficial interest. Typically a Declaration of Trust (solicitor-drafted, signed, notarised) recording the unequal beneficial interests. HMRC can challenge a Form 17 declaration where the underlying evidence does not support the claimed split (Hadee Engineering v HMRC [2020] UKFTT 0497 (TC) on documentary discipline). Audit-trail discipline is essential, especially for unusual splits (99/1, 90/10).

11. **Q: What is SI 2026/336 and why does it matter for joint owners?**
    A: SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026) is the operative MTD ITSA instrument from 1 April 2026. It REVOKED SI 2021/1076 (the prior Digital Requirements Regulations) on the same date. Substantive mechanics carry over but regulation numbers have migrated: qualifying income at reg 25 (was reg 20); qualifying-amount threshold at reg 27; exclusion-notice exemption at reg 18; "excluded" definition at reg 20; three-year income-exit at reg 24 (was reg 22). For joint owners, the threshold-test mechanics under reg 27 + the qualifying-income definition under reg 25 apply individually to each spouse / co-owner's share of gross. F-3 drift catch logged 2026-05-27.

12. **Q: What about the three-tax-year income-exit route for joint owners?**
    A: Per SI 2026/336 reg 24 (formerly SI 2021/1076 reg 22), an in-scope MTD ITSA participant can exit MTD after **three consecutive tax years** where the qualifying income falls below the qualifying-amount threshold for each of those years. For joint owners the test applies INDIVIDUALLY — each spouse's share-of-gross must be below the relevant threshold for three consecutive years. A Form 17 reallocation that drops one spouse's share below threshold from year Y does NOT immediately exit them; the cumulative three-year test must still be met. Cross-link A7 (`heres-how-you-can-exit-mtd-if-your-income-falls`) for the deep-dive on exit mechanics.

13. **Q: What if one spouse is digitally excluded?**
    A: Each spouse is assessed individually for the digital-exclusion exemption under SI 2026/336 reg 18 + reg 20 + TMA 1970 Sch A1 para 14(2). One spouse can hold an exclusion notice (and continue regular SA reporting outside MTD ITSA) while the other is in MTD scope. The household runs the mixed workflow described in Example 6. Cross-link A20 (`mtd-penalties-exemptions-and-what-to-watch`) for the full digital-exclusion exemption mechanics.

14. **Q: Does separation or divorce affect the 50/50 default?**
    A: Yes. ITA 2007 s.836 applies only to spouses / civil partners LIVING TOGETHER (Sokoya v HMRC [2009] STC (SCD) 109). On separation the default 50/50 rule ceases to apply; the SA income split reverts to actual beneficial interest (default 50/50 per legal title absent other evidence; or per Declaration of Trust if one exists). Each spouse's MTD scope is re-assessed against the post-separation SA return. The cessation date can be fact-sensitive — sessions handling complex separation cases should engage specialist tax representation.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Commas, parentheses, full stops, middle dots only.
- **Specific over generic.** Named statute (ITA 2007 s.836 + s.837; SI 2026/336 regs 18 + 19 + 20 + 24 + 25 + 27; TMA 1970 Sch A1 para 14(2); F(No.2)A 2017 Sch 14). Named case-law (Hadee Engineering v HMRC [2020] UKFTT 0497 (TC); Sokoya v HMRC [2009] STC (SCD) 109). HP §19.1 mandate timeline, §19.2 qualifying income gross-not-net, §19.4 share-of-gross joint-owner rule, §19.10 ASA per-owner authorisation, §19.13 letting-agent net-of-fees trap, §24 Wave 5 spouse-mechanics framework. Anonymised personas (James and Priya Whitwell, Marcus and Eleanor Sheridan, Tom Whitaker and Olivia Bennett, David and Anna Marchand, Patricia and Henry Goodfellow) — no real names.
- **No real names.** No real accountancy firms, software vendors, or counsel named.
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Inline aside-styled CTAs at three conversion moments: (i) after the joint-owner threshold-test matrix (Example 1 — the structural anchor); (ii) after the Form 17 60-day window walk (Example 2 — the timing-trap conversion); (iii) after the asymmetric-scope operational mechanics walk (Example 3 — the household-workflow conversion).
- **CSS in markdown:** semantic HTML only — Example 1 threshold-test matrix as `<table>`; Example 2 Form 17 timeline as `<ol>`; Example 3 + Example 6 operational walk-throughs as prose + nested `<ul>`. NO Tailwind utility classes.
- **FAQs:** 12-14 entries.
- **Body word count target:** 2,800-3,400 (deep-dive on joint-owner mechanics with worked examples + operational layer; sub-pillar depth).
- **Anti-templating:** open with the **share-of-gross joint-owner mechanic + Form 17 asymmetry framing** per the differentiator — NOT with "MTD threshold" generic framing, NOT with A18-style qualifying-income-definition framing, NOT with A20-style penalty-catalogue framing. The reader wants the joint-owner deep-dive.
- **Do-not-write GREP discipline (RUN session greps draft against ALL 13 misframings in Example 7):** especially Misframe 1 (property's total gross), Misframe 3 (Form 17 backdates), Misframe 4 (Form 17 any time), Misframe 6 (spouse-implies-spouse), Misframe 7 (single combined submission), Misframe 8 (share-of-net), Misframe 10 (SI 2021/1076).
- **Quality bar (six checks per §9):** 0 em-dashes; 0 Tailwind class attrs; FAQ count matches frontmatter `faqs:` array; metaTitle ≤62 chars; metaDescription ≤158 chars; all internal `/blog/...` links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (§19.1 mandate timeline, §19.2 qualifying income gross-not-net, §19.4 share-of-gross joint-owner rule, §19.10 Wave 4 ASA per-owner authorisation, §19.13 Wave 4 letting-agent net-of-fees trap, §24 Wave 5 spouse-mechanics framework, §19.9 do-not-write list).
2. Claim this page in `megawave3_page_tracker.md` (⬜ → 🟡 + UTC timestamp).
3. Read this brief end-to-end (esp framing differentiator + Example 1 threshold-test matrix + Example 2 Form 17 timeline + Example 3 asymmetric-scope operational + Example 4 TIC walk + Example 5 gross-not-net + Example 6 digital-exclusion edge + 13 misframings + FAQ canvas).
4. Fetch + read competitor URLs via RUN session WebSearch.
5. Read closest-existing pages: A18 `what-is-qualifying-income-for-mtd` (qualifying-income definition + gross-not-net — cross-link UPSTREAM, this page uses the definition); A20 `mtd-penalties-exemptions-and-what-to-watch` (penalty + exemption catalogue, including digital-exclusion exemption — cross-link DOWNSTREAM for the asymmetric-scope edge case); A7 `heres-how-you-can-exit-mtd-if-your-income-falls` (income-exit deep-dive — cross-link for joint-owner exit scenarios); A6 `government-to-implement-mtd-for-it-with-lower-threshold` (phase-in news context); A11 `how-making-tax-digital-affects-limited-companies` (LtdCo position — not joint-owner relevant but adjacent in MTD pillar); A13 `late-filing-and-late-payment-penalties` (adjacent penalty regime); A16 `making-tax-digital-major-self-assessment-overhaul-ahead` (orientation context); existing pillar pages on landlord-tax-essentials; MTD pillar landing; existing Wave 5 Session C Form 17 / spouse-mechanics operational pages (cross-link to §24 framework); existing pillar pages on Declaration of Trust for unmarried co-owners.
6. Plan H2/H3 outline: opening on share-of-gross + Form 17 asymmetry framing per differentiator → joint-owner threshold-test matrix (Example 1, first concrete artefact) → ITA 2007 s.836 default 50/50 rule walked → Form 17 60-day window walked (Example 2) → asymmetric-scope operational mechanics (Example 3) → tenants in common / unmarried co-owners (Example 4) → gross-not-net split point (Example 5) → asymmetric-scope-with-digital-exclusion edge case (Example 6) → FAQ block → next-step CTA.
7. Verify factual claims per §16.35: WebFetch ITA 2007 s.836 (verbatim subsection (2) + Exceptions A-F); ITA 2007 s.837 (verbatim joint-declaration wording + 60-day notice + prospective-only effect); SI 2026/336 reg 18 + reg 19 + reg 20 + reg 24 + reg 25 + reg 27 (verbatim); TMA 1970 Sch A1 para 14(2) digital-exclusion definition; HMRC PIM1030 jointly-owned property income; HMRC TSEM9800+ Form 17 documentation; HMRC MTD ITSA guidance landings; Hadee Engineering v HMRC [2020] UKFTT 0497 (TC); Sokoya v HMRC [2009] STC (SCD) 109; verify Form 17 current form on gov.uk + accompanying notes.
8. Fetch hero image (joint-owner / household-tax / cooperative-couple / family-tax aesthetic; not a generic landlord-property shot).
9. Write markdown at `Property/web/content/blog/mtd-made-simple-for-landlords-with-jointly-owned-properties.md`.
10. Build clean: `cd Property/web && npm run build`.
11. Six verifications + 13-pattern do-not-write GREP.
12. Apply redirect repointing if needed (check `middleware.ts` for `mtd-joint-owner` / `mtd-spouse` / `mtd-form-17` / `jointly-owned` stems).
13. Register in `monitored_pages` Supabase table.
14. Commit on RUN-phase session's branch.
15. Fill per-page work-log at bottom of brief.
16. Mark ✅ done in tracker with 1-line Notes.
17. Append flags if any.
18. Append discoveries to session's discovery log.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

[RUN session records work here. Stage 2 verification notes: ITA 2007 s.836 + s.837 verified verbatim per Stage 1 author 2026-05-27 against legislation.gov.uk; RUN session re-verifies at write per §16.35. SI 2026/336 reg 18 + 20 + 24 + 25 + 27 verified per Stage 1 author 2026-05-27 against legislation.gov.uk; RUN session WebFetches reg 19 verbatim at write (Stage 1 noted deferral). TMA 1970 Sch A1 para 14(2) digital-exclusion definition cross-referenced by SI 2026/336 reg 20; RUN session WebFetches verbatim at write per §16.35. HMRC PIM1030 + TSEM9800+ manual landings confirmed live. F-3 drift catch on SI 2021/1076 → SI 2026/336 migration logged in `megawave3_site_wide_flags.md` 2026-05-27; this brief cites SI 2026/336 throughout. Case-law Hadee Engineering [2020] UKFTT 0497 (TC) + Sokoya [2009] STC (SCD) 109 verified live on BAILII. No new HP-lock candidate. Cross-link discipline: bidirectional with A18 (qualifying-income deep-dive — UPSTREAM); A20 (penalty + exemption — DOWNSTREAM for digital-exclusion + asymmetric-scope edge); A7 (income-exit deep-dive for joint-owner exit scenarios); §24 Wave 5 spouse-mechanics framework (Form 17 documentation discipline). Do NOT re-walk Form 17 documentary discipline beyond what the joint-owner MTD lens requires (§24 territory).]

---

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B4) on 2026-05-27.
- **Stage 2 author:** MW3 Stage 2 Sub-Agent A (batch M3-A-B4) on 2026-05-27.
- **Cluster anchor:** MTD for ITSA — the **joint-property-owner deep-dive on MTD threshold testing** specifically. Differentiated from sibling MTD picks: A6 news-framing, A7 exit-mechanic, A11 LtdCo-position, A16 system-overhaul orientation, A18 qualifying-income-definition-input deep-dive, A20 penalty + exemption catalogue. Headline pedagogical line: each owner tests their share of GROSS, not the property's total gross; Form 17 is the operative override mechanism with a prospective-only 60-day filing window.
- **HP-lock alignment:** §19.4 (primary anchor — joint-property share-of-gross MTD rule, Wave 3 lock), §19.1 (mandate timeline + test year), §19.2 (qualifying income definition + gross-not-net operational point), §19.10 (Wave 4 — ASA per-owner authorisation discipline), §19.13 (Wave 4 — letting-agent net-of-fees trap, applies to managed joint portfolios), §24 (Wave 5 — spouse-mechanics framework for Form 17 documentation). No NEW HP LOCK NEEDED at the substantive-mechanic level; SI-citation migration logged as F-3.
- **§16.35 per-write verification note:** ITA 2007 s.836 + s.837 verified verbatim at write time 2026-05-27 against legislation.gov.uk. **Major drift catch:** SI 2021/1076 (the prior MTD operative instrument referenced throughout Wave 3 / Wave 4 §19 architecture) was **revoked 1 April 2026** and replaced by **SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026)**. New regulation numbers: qualifying income = reg 25 (was reg 20); qualifying-amount threshold = reg 27; exclusion-notice exemption = reg 18; meaning of "excluded" = reg 20; three-year exit rule = reg 24 (was reg 22). Substantive mechanics carry over but regulation numbers have migrated. Flagged F-3 in `megawave3_site_wide_flags.md`.
- **§16.36 statutory-citation cross-check (Stage 2):** ITA 2007 s.836 (verbatim subsection (2) default 50/50 + Exceptions A-F at subsection (3)) — verified per Stage 1 2026-05-27. ITA 2007 s.837 (joint declaration + 60-day window + prospective-only effect) — verified per Stage 1 2026-05-27. SI 2026/336 regs 18 + 20 + 24 + 25 + 27 — verified per Stage 1 2026-05-27; reg 19 deferred to RUN. TMA 1970 Sch A1 para 14(2) digital-exclusion definition (cross-referenced by SI 2026/336 reg 20) — verified at HP lock; RUN re-verifies verbatim at write. F(No.2)A 2017 Sch 14 (inserted TMA 1970 Sch A1) — verified. No new drift catches raised at Stage 2 beyond F-3 (already logged); the joint-owner-mechanic substantive layer (§19.4 share-of-gross + §19.10 ASA per-owner + §24 spouse-mechanics framework) holds clean against the verified citations.
- **§16.31 URL verification (Stage 2):** legislation.gov.uk anchors confirmed live for ITA 2007 s.836, ITA 2007 s.837, SI 2026/336 contents, TMA 1970 Sch A1, F(No.2)A 2017 Sch 14; gov.uk HMRC manual landings confirmed live for PIM1030, TSEM9800, Agent Services Account Manual, MTD ITSA policy paper, sign-up landing, use-MTD-ITSA landing, compatible-software list, Form 17 declare-beneficial-interests page; BAILII anchor noted for Hadee Engineering [2020] UKFTT 0497 (TC) + Sokoya [2009] STC (SCD) 109. Competitor URLs deferred to RUN session WebSearch at write per Wave 8 + Wave 9 5/5 dead-rate pattern (do NOT pre-list staging or known-rot competitor URLs in the brief — RUN sources fresh).
- **Cannibalisation reasoning:** No CANNIBAL flag. Joint-property-owner deep-dive frame is structurally distinct from sibling MTD picks (each addressing a different intent slice). The risk of A19 drifting into A18 (qualifying-income definition territory) must be enforced at Stage 2 by holding the joint-owner discipline — the page anchors on the share-of-gross mechanic + Form 17 asymmetry + per-spouse operational layer, with the qualifying-income definition handled as cross-reference to A18 not as the primary focus (that is A18's role). Forward-link bidirectional with A18 + A20 + A7; do NOT re-walk A18 qualifying-income-definition territory or A20 penalty + exemption catalogue territory.
- **Anti-templating watchpoints for RUN session:** (a) MUST open with the **share-of-gross joint-owner mechanic + Form 17 asymmetry** framing per differentiator — NOT with "MTD threshold" generic framing, NOT with A18-style qualifying-income-definition framing, NOT with A20-style penalty-catalogue framing. The reader wants the joint-owner deep-dive. (b) Example 1 joint-owner threshold-test matrix is the page's first concrete artefact — render as semantic HTML `<table>`; this is the structural anchor. (c) Example 2 Form 17 60-day window walk must surface the prospective-only effect + 60-day window discipline explicitly — quote ITA 2007 s.837 verbatim on both points (Misframe 3 + Misframe 4 grep mandatory). (d) Example 3 asymmetric-scope operational mechanics must surface the per-spouse ASA authorisation + separate quarterly cycles + household bookkeeping discipline explicitly (Misframe 6 + Misframe 7 grep mandatory). (e) Example 5 gross-not-net split point must surface the share-of-gross rule explicitly with worked figures (Misframe 8 grep mandatory). (f) Form 17 mechanics deep-detail belongs to §24 territory (Wave 5 Session C operational pages) — this page covers ONLY the joint-owner-MTD overlay; cross-link to §24-anchored Form 17 documentation pages for deep documentation discipline (do NOT re-walk DoT execution mechanics). (g) Per §16.27 rate-by-reference — £50k / £30k / £20k thresholds + April 2026 / 2027 / 2028 phase dates all verified at HP lock; RUN re-verifies at write per §16.35. (h) FAQ count target 12-14. (i) Body word count 2,800-3,400 — sub-pillar depth. (j) Cross-link discipline: bidirectional with A18 + A20 + A7; one-way to A6 + A11 + A13 + A16 + MTD pillar landing + landlord-tax-essentials pillar + Wave 5 Session C Form 17 pages.
- **Drift catches to flag for Stage 1b:** **F-3 — SI 2021/1076 revoked 1 April 2026 by SI 2026/336.** All Wave 3 / Wave 4 §19 lock citations to "SI 2021/1076 reg X" are stale; need migration to SI 2026/336 reg numbers. Affected previously-shipped seeds in MW3 Bucket A (A1-A18 already committed): each cites SI 2021/1076 reg 20 as the qualifying-income definition; verified location is now SI 2026/336 reg 25. Stage 1b should triage the back-patch list; Stage 2 + RUN must use SI 2026/336 going forward and reference the SI 2021/1076 migration in any historical-context discussion. Secondary watchpoint: the points-based late submission regime per FA 2021 Sch 24 specifies 12-month compliance period AND all-preceding-24-month-submissions-made for points reset (per HMRC policy paper verified 2026-05-27); §19.7 currently states "Points reset after 24 months of full compliance" — minor refinement opportunity for Stage 1b on the dual-condition framing.
