# Track 2 brief: how-to-register-mtd-landlord-step-by-step-guide

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (MTD cluster)
**Source markdown path:** `Property/web/content/blog/how-to-register-mtd-landlord-step-by-step-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide
**Stage 1 priority:** **H** — uniquely owns the transactional "how do I sign up / register" intent in a ~30-page MTD cluster; carries the strongest registration-intent equity on Bing (~37 impr / 4 clicks; pos 1-4 on multiple "register for mtd" queries) and is fully INVISIBLE on Google GSC, so the upside is asymmetric.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source read in full; Bing equity from diagnosis payload; HMRC sign-up flow re-verified on gov.uk 2026-05-30)
**Cannibalisation status:** REWRITE (in place — see §"Cannibalisation universe check"; this page is the collapse TARGET of the cluster, never a collapse source)

> **This is a gold-reference brief.** Every section below is populated with real source-page facts and the live diagnosis signal. Execution sub-agents should produce the rewrite at the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-template discipline of `briefs/property/track2/trial/birmingham-property-accountant.md`. The single load-bearing fact about this page: **its current Step 5 process is fabricated** — that is the primary rewrite driver, not depth.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `how-to-register-mtd-landlord-step-by-step-guide`. The slug carries the user's actual search verb ("register") which is what they type, and the page already holds Bing position 1-4 on the literal "register for mtd hmrc / online / how to complete mtd registration" queries. Changing the slug would forfeit that equity. The body uses HMRC's verb ("sign up for Making Tax Digital for Income Tax") while the slug + metaTitle keep "register" for query-match. This split is deliberate, not a contradiction.
- **Category:** `Making Tax Digital (MTD)` (kept; canonical route `/blog/making-tax-digital-mtd/`).
- **Gap-mode tag:** `STALE_FACTS` (primary — fabricated HMRC process + fabricated timings + a do-not-write partnership error) + `INVISIBLE` (secondary — zero Google GSC despite Bing equity) + `THIN_DEPTH` (1,759 words vs 3,000 target) + `STRUCTURE` (4 FAQs, zero outbound authority, threshold boilerplate x7) + `CTR_FAIL` (Bing pos 1-4 converting weakly; Google not surfacing at all).
- **"Why this rewrite" angle:** This is the canonical "the sign-up walkthrough" page for the whole MTD cluster, and it is **actively wrong about the process it walks through**. The current Step 5 invents an HMRC menu path ("Business Tax Account / Manage your Income Tax > Making Tax Digital for Income Tax > Sign up") that does not exist; HMRC's real flow is a single "Sign up now" button using existing Self Assessment Government Gateway credentials. The page also fabricates a "7-10 working days" / "confirmation by email and post" multi-week registration when sign-up is effectively an instant, self-service step. A page that ranks page-1 on Bing for "how to complete mtd registration" while describing a non-existent registration is a reputational and conversion liability, not just a thin page. The rewrite re-grounds every step against the live gov.uk sign-up guidance, corrects the partnership do-not-write violation (§19.3), replaces the x7 threshold boilerplate with one §19.1 table, adds the missing real-process elements competitors cover (GOV.UK ID Check identity verification, software-must-precede ordering, per-income-source sign-up, ASA agent route, joint-owner separate sign-up), and lifts to ~3,000 words with 10-12 FAQs targeting the verbatim Bing queries. It forward-links to the switch / quarterly / software / deadline siblings rather than duplicating them.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read 2026-05-30:**
- **Word count:** ~1,759 (body) — confirmed against diagnosis payload.
- **H2 / H3 outline (1-line each):**
  1. H2 *Who Must Register for MTD as a Landlord?* — threshold + mandatory list (contains the partnership error + the "thresholdcan" typo).
  2. H2 *Step-by-Step Registration Process* with 7 H3 steps:
     - H3 *Step 1: Check Eligibility and Gather Information* — gross income, info checklist (mostly sound).
     - H3 *Step 2: Create or Access Your Government Gateway Account* — GG setup (sound but oversells postal verification timing; misses GOV.UK ID Check app).
     - H3 *Step 3: Register for Self Assessment (If Required)* — SA-first ordering (sound).
     - H3 *Step 4: Choose MTD-Compatible Software* — undersells the must-precede ordering; carries the £5-50 software price band.
     - H3 *Step 5: Complete MTD for Income Tax Registration* — **FABRICATED menu path** (the load-bearing error).
     - H3 *Step 6: Set Up Your Software and Link to HMRC* — sound in outline.
     - H3 *Step 7: Prepare for Quarterly Reporting* — duplicates downstream sibling; keep as a forward-link stub, not full coverage.
  3. H2 *Special Registration Circumstances* with H3 *Joint Property Owners* (threshold boilerplate again) + H3 *Non-Resident Landlords*.
  4. H2 *Common Registration Issues and Solutions*.
  5. H2 *Professional Support and Timeline* with H3 *When to Consider Professional Help* + H3 *Registration Timeline and Deadlines* (**fabricated multi-week timeline table**).
  6. H2 *After Registration: Next Steps*.
- **metaTitle:** "How to Register MTD Landlord: Step-by-Step Guide 2026" (53 chars; keeps "register" — fine for query-match, but lacks the differentiator/freshness hook).
- **metaDescription:** "Complete guide to register for Making Tax Digital as a landlord. Step-by-step HMRC registration process, eligibility, software setup and deadlines." (146 chars; serviceable, but promises the very "registration process" that is currently wrong).
- **h1 / title:** "How to Register for Making Tax Digital as a Landlord: Complete Step-by-Step Guide 2026".
- **FAQ count (frontmatter `faqs:`):** 4. FAQ #1 ("how long does it take to register") *propagates the fabricated 2-4 week / 7-10 day timing* — must be rewritten, not just supplemented. FAQ #2 (voluntary), #3 (no register by April 2026), #4 (need an accountant) are salvageable with edits.
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC links anywhere).
- **Internal links:** 4 (BTL ltd-co incorporation guide; what-does-a-property-accountant-do; making-tax-digital-landlords-april-2026-deadline; how-much-does-a-property-accountant-cost; property-investment-tax complete guide).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; never hand-add in body).
- **Inline CTAs:** 0 `<aside>` (LeadForm is auto-injected by `BlogPostRenderer.tsx`; target 1-2 inline `<aside>` at conversion moments).
- **Last meaningful edit:** frontmatter `date: 2026-04-10`.

**Concrete defects to fix (carried from diagnosis, verified against source lines):**
- **Fabricated process (Step 5, body lines 91-103):** non-existent "Business Tax Account / Manage your Income Tax > Making Tax Digital for Income Tax > Sign up" menu path + "HMRC will send confirmation by email and post."
- **Fabricated timings:** intro line 27 "registration process typically takes 7-10 working days"; FAQ #1 "2-4 weeks ... MTD registration itself (7-10 days)"; timeline table line 179 "MTD registration with HMRC: 7-10 working days".
- **Do-not-write violation (body line 36):** "Property partnerships (but not limited companies)" listed as mandatory from April 2026. Per §3 / §19.3 GP partnerships are **DEFERRED to a date TBC** — this is on the §19.9 do-not-write list ("MTD applies to GP partnerships from April 2026"). Must be corrected, and the joint/partnership framing untangled (joint ownership is NOT a partnership).
- **Threshold boilerplate repeated ~7x:** the verbatim "£50,000 ... falling to £30,000 from 6 April 2027 and £20,000 from 6 April 2028" string appears at lines 26, 30, 33, 132 and in FAQ #3 — replace with ONE §19.1 table near the top + plain references thereafter.
- **Typo (body line 38):** "thresholdcan" (missing space).
- **Software price band (body line 84):** "Cost (typically £5-50+ per month)". Per Decision E this is a third-party software price band, NOT our partner firm's fee, so it is not a hard fee-comparison leak — but soften to "free tiers up to fuller paid packages" with no figures, to keep the no-pricing posture clean and avoid stale price points.

---

## GSC / Bing equity angle (last 90 days) — from diagnosis payload

**Google GSC:** EMPTY (INVISIBLE). The page does not surface on Google for any query in the 90-day window. This is the secondary gap mode and the asymmetric upside: a correct, deep, well-structured sign-up walkthrough has no Google baseline to protect and everything to gain.

**Bing Webmaster (the equity that exists):**
- "mtd registration" — 15 impr, **pos 6.0**.
- "register for mtd online" — **pos 2.0**.
- "register for mtd hmrc" — **pos 2.0**.
- "how to complete mtd registration" — **pos 2.0, 2 clicks**.
- "how to sign up for mtd in property and landlords scotland" — **pos 1.0, 1 click**.
- Aggregate ~37 impr / 4 clicks total.

**Pattern analysis:**
- **The page owns transactional registration intent on Bing** (pos 1-4 across the literal "register / sign up" queries). This is the single strongest signal in the cluster on that intent; the four nearest siblings carry no comparable registration equity.
- **Legacy-page Bing-vs-Google split** (memory: `bing_webmaster_data.md`): page-1 on Bing, absent on Google. The rewrite's job on the Google side is to *become eligible* (depth + accuracy + structure + authority links + FAQ schema) so Google has a reason to surface a corrected, citation-backed walkthrough; on the Bing side, protect and convert the existing pos 1-4.
- **Scotland sub-query** ("...property and landlords scotland", pos 1.0, 1 click): worth one FAQ acknowledging MTD ITSA is UK-wide (reserved tax; Scotland follows the same HMRC sign-up; the devolved LBTT/Scottish income-tax-band point is separate and out of scope here — forward-link to devolved siblings if any).

**Strategic conclusion:** keep "register" in slug + metaTitle to defend the Bing transactional equity; rebuild the body around HMRC's real "sign up" flow so it earns Google eligibility. Realistic target: convert Bing pos 1-4 more reliably (CTR_FAIL fix via accurate, scannable steps) AND open a Google entry that currently scores zero.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS / fabricated process.** The page describes an HMRC sign-up flow that does not exist, fabricates a multi-week postal registration, and asserts a do-not-write partnership position. This is the highest-consequence defect: it is wrong, it ranks page-1 on Bing for the exact "how to complete mtd registration" query, and it would mislead a landlord at the precise moment they act. Per the deterministic-floor principle (§16.T-series), a high-consequence process claim is NOT gated on LLM plausibility — every step must be re-grounded against gov.uk at write time.

**Secondary: INVISIBLE (Google).** Zero GSC. The rewrite is the eligibility play: depth + accuracy + authority citations + FAQ schema give Google a corrected, sourced walkthrough to rank where it currently surfaces nothing.

**Tertiary: THIN_DEPTH + STRUCTURE.** 1,759 words, 4 FAQs, zero outbound authority, threshold boilerplate x7, one typo. Below the cluster-canonical floor.

**Quaternary: CTR_FAIL (Bing).** Pos 1-4 on transactional queries with only 4 clicks suggests the metaTitle/metaDescription and the on-page scannability are under-converting even where we rank.

**Load-bearing fix sequence (ordered by ROI):**
1. **Re-ground the sign-up flow** against gov.uk `sign-up-your-business-for-making-tax-digital-for-income-tax` (verified 2026-05-30): one "Sign up now" button, existing SA Government Gateway credentials, GOV.UK ID Check app (or security questions) for identity verification, **software must be HMRC-recognised and in place BEFORE sign-up**, each income source signed up individually (sole trade + each property business). Sign-up is a self-service ~few-minute step, NOT a 7-10 day / postal registration.
2. **Correct the partnership do-not-write violation** (§19.3): GP partnerships and LLPs are DEFERRED to a date TBC; remove "Property partnerships ... mandatory from April 2026". Disentangle from joint ownership (joint owners are individuals testing their own share, §19.4 — not a partnership).
3. **Collapse threshold boilerplate** into ONE §19.1 table near the top; reference it plainly thereafter.
4. **Add the points-based + accelerated late-payment penalty detail** (§19.7 / §19.19): 1 point per missed quarterly update, £200 fixed penalty at the 4-point threshold (24-month window), and the MTD-ITSA late-payment schedule of 3% from day 15, +3% from day 30, +10% per annum from day 31 (NOT the legacy 31/46/91 at 2%/2%/4%). The current page leaves penalties unspecified — this is the §19.9 "immediate £200" and "2%/2%/4%" trap to avoid.
5. **Body lift to ~3,000 words**, 10-12 FAQs (each targeting a verbatim Bing query), 1-2 inline `<aside>` CTAs, 4-6 outbound authority links.
6. **Soften software price band** to "free tiers up to fuller paid packages" (no figures).
7. **Fix the "thresholdcan" typo.**
8. **metaTitle/metaDescription refresh** keeping "register" for query-match, adding accuracy/freshness ("2026 sign-up" / "no postal wait").

---

## Competitor URLs (Stage 2 — fetch + status-check + date-stamp at execution per §16.31)

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax | **Process source of truth.** Re-verified 2026-05-30: single "Sign up now" flow, existing SA Government Gateway sign-in, identity verification, software-must-precede. | The exact step sequence + the verbs ("sign up", "Sign up now"). | gov.uk is generic across sole traders + landlords; we are landlord-specific (per-property-business sign-up, joint owners, NRL). |
| https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-for-businesses-step-by-step | HMRC step-by-step collection (eligibility → software → sign up → quarterly). | The "check eligibility → get software → sign up → file" ordering. | We add the landlord-specific gross-vs-net qualifying-income test (§19.2) and the joint-owner split (§19.4). |
| https://www.maslins.co.uk/guides/signing-up-for-making-tax-digital-a-step-by-step-guide-for-sole-traders-and-landlords/ | Accountant-authored walkthrough; stresses sign-up is a ~5-minute manual self-service step. | The "it's quick and manual, not a multi-week wait" framing that corrects our fabricated timing. | Sole-trader-and-landlord generic; thinner on penalties, ASA, NRL, and software-must-precede ordering. |
| https://www.freeagent.com/guides/making-tax-digital/sign-up-mtd-for-income-tax/ | Software-vendor walkthrough; stresses software-first then sign-up. | The software-first sequencing emphasis. | Vendor-led (steers to their product); we stay product-neutral per §19.6 (do not hard-code product names). |

**Competitor depth ceiling for this query class:** ~800-1,500 words, 0-3 FAQs, 0 statute citations, no penalty depth, no joint-owner/NRL/ASA depth. A ~3,000-word, 10-12 FAQ, accurate-process, statute-cited landlord-specific walkthrough is decisively best-in-class.

**Verification mandate:** re-fetch all four at execution (httpx, proper User-Agent), confirm 200, and re-confirm the gov.uk sign-up flow has not changed (HMRC iterates the journey). The process facts in this brief are the 2026-05-30 state.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed per latest Track 2 heartbeat). Large MTD cluster (~30 live pages under `/making-tax-digital-mtd/`).

| Source | Slug | Intent owned | Resolution |
|---|---|---|---|
| Residual (own) | how-to-register-mtd-landlord-step-by-step-guide | **"how do I sign up / register" (transactional)** | REWRITE in place. This page is the canonical sign-up walkthrough and the **collapse TARGET** of the cluster. |
| Sibling (live) | how-to-switch-self-assessment-mtd-property-income (~1,407w) | "transition from SA" migration angle; no GSC/Bing equity | DISTINCT (migration, not sign-up). Cross-link, do NOT collapse. Per collapse-direction rule, if anything THIS weaker page is the later candidate to redirect INTO the register page, not vice versa. |
| Sibling (live) | making-tax-digital-property-income-2026-complete-guide (~1,604w) | pillar overview; 3 Bing impr pos 5.5 | DISTINCT (pillar). Forward-link up to it as the overview; it links down to this as the sign-up step. |
| Sibling (live) | making-tax-digital-landlords-april-2026-deadline (~1,585w) | deadline explainer; GSC pos 61 / 1 impr | DISTINCT (deadline intent, far weaker). Forward-link for the "when" question. |
| Sibling (live) | mtd-quarterly-reporting-landlords-step-by-step-guide (~1,343w) | post-signup quarterly cycle | DISTINCT (downstream). Step 7 of this page becomes a forward-link stub to it, NOT full coverage. |
| Sibling (live) | mtd-itsa-agent-services-account-asa-authorisation-walkthrough | ASA agent authorisation deep-dive | DISTINCT. This page covers the agent route briefly (§19.10) + forward-links here. |
| Sibling (live) | mtd-software-landlords-free-vs-paid-options-compared / best-mtd-software-landlords-2026 | software selection | DISTINCT. Step "choose software" references it + forward-links; no software-comparison depth duplicated here. |
| Sibling (live) | mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse / mtd-itsa-jointly-owned-property-threshold-split | joint-owner quarterly mechanics + threshold split | DISTINCT. This page covers joint-owner *sign-up* (each signs up separately, §19.4) + forward-links for the quarterly/threshold mechanics. |
| Sibling (live) | mtd-itsa-letter-from-hmrc-what-to-do-next | "I got an HMRC letter" trigger | DISTINCT. Cross-link: the letter is a common entry point to "now how do I sign up". |
| Sibling (live) | mtd-penalties-landlords-miss-deadline / mtd-itsa-late-submission-points-late-payment-15-30-31-worked | penalty deep-dives | DISTINCT. This page states the penalty headline (§19.7) + forward-links for the worked detail. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED out of this page (it is the target). No FLAG-MANAGER. The cluster stays clean because this page is the single canonical sign-up walkthrough and forward-links the distinct sibling intents rather than duplicating them. **Collapse-direction note:** per the data-gated collapse-equity guard, the weaker `how-to-switch-self-assessment-mtd-property-income` page is the candidate to later redirect INTO this one — never the reverse.

---

## Closest existing pages (Stage 2)

Internal-link partners (all under `/blog/making-tax-digital-mtd/` unless noted). Use category-route hrefs:

- **Pillar (up-link):** `/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide`
- **Migration sibling:** `/blog/making-tax-digital-mtd/how-to-switch-self-assessment-mtd-property-income` (for SA-to-MTD transition; cross-link)
- **Deadline sibling:** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` (for "when")
- **Quarterly downstream:** `/blog/making-tax-digital-mtd/mtd-quarterly-reporting-landlords-step-by-step-guide` (Step 7 forward-link stub)
- **Software:** `/blog/making-tax-digital-mtd/mtd-software-landlords-free-vs-paid-options-compared` (software-choice step)
- **Qualifying income:** `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net` (gross-vs-net eligibility)
- **Agent route:** `/blog/making-tax-digital-mtd/mtd-itsa-agent-services-account-asa-authorisation-walkthrough` (ASA)
- **Joint owners:** `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` + `/blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split`
- **HMRC letter trigger:** `/blog/making-tax-digital-mtd/mtd-itsa-letter-from-hmrc-what-to-do-next`
- **Penalties:** `/blog/making-tax-digital-mtd/mtd-penalties-landlords-miss-deadline` + `/blog/making-tax-digital-mtd/mtd-itsa-late-submission-points-late-payment-15-30-31-worked`
- **Incorporation (cross-category, already on page):** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (for the Ltd-co-out-of-MTD point) — keep.
- **Accountant services (cross-category, already on page):** `/blog/property-accountant-services/what-does-a-property-accountant-do` + `/blog/property-accountant-services/how-much-does-a-property-accountant-cost` — keep (the cost page is the no-pricing-on-this-page pressure valve).

Target: 6-9 internal links (up from 4), each a distinct intent so the page reads as a cluster hub for the sign-up moment.

---

## House-position references (Stage 1)

- **§3 MTD for ITSA applicability** [LOCKED] — headline schedule: mandatory 6 Apr 2026 (>£50,000), 6 Apr 2027 (>£30,000), 6 Apr 2028 (>£20,000); Ltd cos OUT; **GP partnerships DEFERRED to TBC**; joint owners test their share. This is the primary spine.
- **§19.1 Mandate timeline** [LOCKED 2026-05-22] — the table that replaces the x7 boilerplate; threshold tested against 2024/25 SA return for the April 2026 cohort.
- **§19.2 Qualifying income (gross, both streams aggregated)** [LOCKED] — Step 1 eligibility framing: GROSS receipts before deductions; the £52k-gross / £12k-net "in scope" trap.
- **§19.3 Excluded categories** [LOCKED] — Ltd cos out; **GP partnerships + LLPs deferred** (corrects the body-line-36 violation); trustees out; non-resident individuals IN where threshold met.
- **§19.4 Joint-property owners** [LOCKED] — each owner tests their share; each signs up separately (do NOT frame joint owners as a partnership).
- **§19.5 Exit / voluntary opt-in** [LOCKED] — three-consecutive-years exit; voluntary opt-in from 6 Apr 2025 (pilot) / 6 Apr 2026 (general). Corrects the current FAQ #2 "cannot opt out" overstatement (there IS an income-drop exit route).
- **§19.6 Software requirements** [LOCKED] — HMRC-recognised compatible software; spreadsheet + bridging acceptable; **do NOT hard-code product names**; software must be in place before sign-up.
- **§19.7 Penalty regime** [LOCKED 2026-05-22, verified] — points-based late submission (1 point/update, £200 at 4-point threshold, 24-month reset window); late-payment 3% day 15 / +3% day 30 / +10% p.a. day 31 (MTD ITSA). NOT legacy 31/46/91 at 2%/2%/4%.
- **§19.10 Agent Services Account (ASA)** [LOCKED 2026-05-23] — ASA is the mandatory agent route for MTD ITSA (NOT the legacy 64-8); each joint owner authorises separately; authorisations do not transfer on agent change.
- **§19.18 SI 2021/1076 → SI 2026/336 migration** [LOCKED 2026-05-27] — the Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076) were **REVOKED 1 April 2026** by the Income Tax (Digital Obligations) Regulations 2026 (**SI 2026/336**). Cite SI 2026/336 as the live instrument. Qualifying income = **reg 25** (NOT reg 20); threshold = reg 27; digital-exclusion exemption = reg 18. SI 2021/1076 appears only in historical/migration context.
- **§19.19 Points-based late submission** [LOCKED 2026-05-27] — sits at **FA 2021 Schedule 24** (NOT FA 2007 Sch 24, the inaccuracy regime — naming collision); reset requires the dual-condition test (12-month compliance AND all prior-24-month submissions made).
- **§13 / §19.9 / §19.17 Do-not-write lists** [LOCKED] — no pricing; no real client names; NOT "£10,000 threshold"; NOT "MTD applies to GP partnerships from April 2026"; NOT "immediate £200 penalty"; NOT "2%/2%/4%"; NOT "joint owners test the property's total"; NOT "letting agent files for the landlord".

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict #1 — STALE_FACTS / fabricated process (primary).** Source Step 5 (body lines 91-103) invents a non-existent HMRC menu path and a "confirmation by email and post"; intro + FAQ #1 + timeline table fabricate a 7-10 working day / 2-4 week registration. HMRC's real flow (gov.uk sign-up guidance, verified 2026-05-30) is a single self-service "Sign up now" step using existing SA Government Gateway credentials. Execution MUST re-ground every step against gov.uk at write time and delete the fabricated timings.

**CONFIRMED conflict #2 — §19.3 / §19.9 do-not-write violation.** Body line 36 lists "Property partnerships ... mandatory from April 2026". GP partnerships + LLPs are **DEFERRED to a date TBC** (§3, §19.3). This is verbatim on the §19.9 do-not-write list. Execution MUST remove it and disentangle joint ownership (individuals, §19.4) from partnership.

**Flag to `track2_site_wide_flags.md`:**
- **F-NN | 2026-05-30 | HIGH | how-to-register-mtd-landlord-step-by-step-guide | STALE_FACTS | Fabricated HMRC sign-up menu path (Step 5) + fabricated 7-10 day / postal registration timing (intro, FAQ #1, timeline table). Real flow is single self-service "Sign up now" via existing SA Government Gateway credentials. Re-ground at write time against gov.uk sign-up guidance.**
- **F-NN | 2026-05-30 | HIGH | how-to-register-mtd-landlord-step-by-step-guide | HOUSE_POSITION_CONFLICT | "Property partnerships mandatory from April 2026" (body line 36) violates §19.3 / §19.9 do-not-write (GP partnerships + LLPs DEFERRED to TBC). Cluster-audit candidate: check other MTD pages for the same partnership error.**

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31, including any SI/Act dates)

| URL | Verification note | Use case |
|---|---|---|
| https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax | Re-verify 200 + that the "Sign up now" single-button flow is unchanged (HMRC iterates). | The sign-up process source-of-truth + controlled link-out for users who want gov.uk (converts the gov.uk-intent impression class). |
| https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-for-businesses-step-by-step | Re-verify 200. | HMRC step-by-step collection cross-reference. |
| https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax | Re-verify 200; do NOT name products (§19.6). | The "choose compatible software" step (product-neutral link-out). |
| https://www.gov.uk/guidance/get-an-hmrc-agent-services-account | Re-verify 200. | The ASA agent route (§19.10). |
| https://www.legislation.gov.uk/uksi/2026/336/contents/made | **Verify the SI number + in-force date (1 April 2026) at write time.** Cite SI 2026/336 (the live instrument), NOT SI 2021/1076 (revoked). Qualifying income = reg 25. | Operative MTD ITSA digital-obligations instrument (§19.18). |
| https://www.legislation.gov.uk/ukpga/2021/26/schedule/24 | Verify FA 2021 Sch 24 is the points-based late-submission location (NOT FA 2007 Sch 24). | Penalty regime statute (§19.7 / §19.19). |
| https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html | Verify 200 + the 15/30/31-day 3%/3%/10% wording. | Accelerated late-payment penalty source (§19.7). |

**Execution selects 4-6 to actually cite in body.** Render as legislation.gov.uk / gov.uk hyperlinks. **F-37 Bill-vs-enacted discipline:** if any Finance Act is cited, verify its Royal Assent date at write time; FA 2026 (c.11) Royal Assent confirmed 18 March 2026 per the program's 13th catch — re-confirm if relied upon.

---

## Section-by-section content plan (~3,000 words)

Target ~3,000 body words, 8-10 H2s, 10-12 FAQs, 1-2 inline `<aside>` CTAs, 4-6 outbound authority links, raw HTML body (`<p>`, `<h2>`, `<ul>` — never markdown `##`; per memory `blog_page_rendering_html_in_frontmatter`).

1. **Intro (~140w)** — "From 6 April 2026 you sign up for Making Tax Digital for Income Tax, not 'register' in the old postal sense." State up front: it is a quick, self-service step using your existing Self Assessment Government Gateway sign-in; the work is BEFORE sign-up (checking the threshold and getting software in place). Kill the "7-10 working days" claim. Keep "register" once for query-match, then switch to HMRC's "sign up" verb.
2. **H2 Who must sign up (and who does not) (~320w)** — ONE §19.1 mandate table (Apr 2026 >£50k / Apr 2027 >£30k / Apr 2028 >£20k). Gross qualifying income, both streams aggregated (§19.2), with the £52k-gross / £12k-net "in scope" trap. Ltd cos OUT (forward-link incorporation guide). **GP partnerships + LLPs DEFERRED to TBC** (corrects line 36). Joint owners test their share (§19.4) and are NOT a partnership. Non-resident individuals IN where threshold met. Fix the "thresholdcan" typo.
3. **H2 Before you sign up: the three things to have ready (~300w)** — (a) confirm you are over the threshold on gross (§19.2); (b) be registered for Self Assessment with a UTR (SA-first ordering); (c) **have HMRC-recognised compatible software in place FIRST** (§19.6, product-neutral, forward-link software sibling). Stress the must-precede ordering the current page undersells.
4. **H2 The Government Gateway and identity check (~260w)** — existing SA filers already have a Government Gateway user ID. New users create one and verify identity via the **GOV.UK ID Check app** (or security questions) — the real-process element the current page misses. Correct the oversold "5-10 working days by post" framing.
5. **H2 How to sign up for MTD for Income Tax: the actual steps (~360w)** — the load-bearing rewrite. Re-ground against gov.uk: sign in with existing SA Government Gateway credentials → use the single **"Sign up now"** journey → confirm/enter income sources → **each income source is signed up individually** (sole trade + each separate property business) → confirm. It is self-service and effectively immediate; there is no multi-week postal registration and no fabricated "Business Tax Account > Manage your Income Tax > MTD > Sign up" menu path. Inline `<aside>` CTA #1 here (conversion moment: "unsure which income sources to sign up? a property accountant can confirm").
6. **H2 Connect your software to HMRC (~220w)** — after sign-up, authorise the software to file via the MTD API (digital link). Product-neutral. Forward-link the quarterly-reporting sibling for what filing looks like.
7. **H2 Signing up as a joint owner or via an agent (~300w)** — joint owners each sign up separately and each authorise software (§19.4; NOT a partnership). Agent route: the **Agent Services Account (ASA)** is the mandatory MTD ITSA route (§19.10; NOT the legacy 64-8); each joint owner authorises the agent separately; authorisations do not transfer on agent change. Forward-link ASA sibling.
8. **H2 Non-resident landlords (~200w)** — same sign-up flow; NRL scheme (§17.5/§19.11) operates alongside, not instead of, MTD; software must support non-resident reporting. Forward-link NRL/foreign-income siblings.
9. **H2 What happens if you do not sign up: penalties (~280w)** — points-based late submission (1 point/update, £200 at 4-point threshold, 24-month reset; §19.7/§19.19, FA 2021 Sch 24) + late-payment 3% day 15 / +3% day 30 / +10% p.a. day 31 (§19.7, Spring Statement 2025; NOT 2%/2%/4% on 31/46/91). Forward-link penalty siblings. Inline `<aside>` CTA #2 optional here.
10. **H2 After sign-up: your quarterly cycle in brief (~180w)** — short stub only; the four quarterly deadlines headline + EoPS + final declaration by 31 Jan, then forward-link the quarterly sibling. Do NOT duplicate the quarterly page (current Step 7 over-covers this).
11. **H2 Common sign-up problems (~200w)** — Government Gateway access recovery (don't create duplicate accounts); UTR delays; "business start date" = first letting date; software-connection failures = wrong GG credentials or sign-up not yet confirmed. Salvage the current "Common Registration Issues" content, re-verb to "sign up".
12. **FAQs (10-12)** — each targets a verbatim Bing/intent query:
    - "How do I sign up for Making Tax Digital for Income Tax as a landlord?" (the primary)
    - "How do I complete MTD registration?" (Bing pos 2.0 query — answer with the corrected single-button flow)
    - "How do I register for MTD online / with HMRC?" (Bing pos 2.0)
    - "Do I sign up myself or does HMRC do it for me?" (self-service; HMRC may write but the obligation is yours)
    - "Do I need software before I sign up?" (yes — §19.6, must precede)
    - "How long does it take to sign up for MTD?" (**rewrite the fabricated FAQ #1** — minutes, self-service, not 2-4 weeks)
    - "Can I sign up voluntarily if I'm below the threshold, and can I stop?" (§19.5 — voluntary opt-in; three-year income-drop exit corrects the "cannot opt out" overstatement)
    - "Do property partnerships have to sign up from April 2026?" (NO — deferred to TBC, §19.3)
    - "How do joint owners sign up?" (each separately, §19.4)
    - "What are the penalties if I don't sign up / file?" (§19.7 headline)
    - "How does an accountant sign up on my behalf?" (ASA, §19.10)
    - "Do landlords in Scotland sign up the same way?" (yes — MTD ITSA is UK-wide reserved tax; Scottish income-tax bands are separate) — captures the pos-1.0 Scotland Bing query.

---

## Statute / instrument spine (every citation to be VERIFIED against legislation.gov.uk + gov.uk at write time)

| Citation | Governs | House position | Verify note |
|---|---|---|---|
| **SI 2026/336** — Income Tax (Digital Obligations) Regulations 2026, **reg 25** (qualifying income) | Live operative MTD ITSA instrument; qualifying-income definition | §19.18 | In force 1 Apr 2026; REPLACES SI 2021/1076 (revoked 1 Apr 2026). Cite SI 2026/336, NOT SI 2021/1076. Qualifying income = reg 25, NOT reg 20. |
| **SI 2026/336 reg 27** (threshold) + **reg 18** (digital-exclusion exemption) | Threshold + exemption mechanics | §19.18 | Verify reg numbers at write time per migration table. |
| **SI 2021/1076** — Income Tax (Digital Requirements) Regulations 2021 (**revoked**) | Historical/migration context only | §19.18 | Only valid when explicitly describing the 2021→2026 migration; NEVER as the live instrument. |
| **FA 2021 Schedule 24** | Points-based late-submission penalty regime | §19.7 / §19.19 | NOT FA 2007 Sch 24 (the inaccuracy regime — naming collision). Verify the Schedule at write time. |
| **FA 2021 Schedule 26** (as amended) + Spring Statement 2025 | Late-payment penalties (3% day 15 / +3% day 30 / +10% p.a. day 31 for MTD ITSA) | §19.7 | Cite the Spring Statement 2025 HTML (verbatim 15/30/31 wording) or FA 2025 amendments once enacted. NOT legacy 31/46/91 at 2%/2%/4%. |
| **TMA 1970 s.12B** | 7-year digital-records retention | §19.16 | If the record-keeping point is made; verify section. |
| **ITTOIA 2005 s.272 / Part 3** | UK property business (qualifying-income basis) | §19.2 context | Optional; verify if cited. |
| **TMA 1970 (s.7 / SA registration)** | Self-Assessment registration prerequisite | Step-2 framing | Optional; verify if cited. |
| **FA 2026 (c.11)** | Only if any FA 2026 provision is relied upon | F-37 pattern | Royal Assent 18 Mar 2026 (program's 13th Bill-vs-enacted catch) — re-confirm at write time. |

**Hard rule:** no citation goes into the body unverified. The SI 2021/1076 → SI 2026/336 revocation and the reg-20 → reg-25 migration are the highest-risk items (the §19.18 13th-catch pattern) — re-fetch legislation.gov.uk at write time and confirm the revocation note still reads as recorded.

---

## Competitor depth benchmark

- **gov.uk sign-up guidance + step-by-step collection:** authoritative process, generic across sole traders + landlords, no FAQs, no penalty depth, no joint-owner/NRL/ASA landlord specifics.
- **Maslins / FreeAgent walkthroughs:** ~800-1,300 words, 0-2 FAQs, stress the "quick, manual, software-first" reality (the exact correction our page needs), but thin on penalties, ASA, NRL, joint-owner sign-up, and statute.
- **Our target:** ~3,000 words, 10-12 FAQs, accurate single-button sign-up flow, identity-check + software-must-precede + per-income-source detail, joint-owner + ASA + NRL coverage, penalty headline with §19.7 figures, 4-6 verified authority links, FAQ schema. Best-in-class for the landlord-specific sign-up query, not catch-up.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤62 chars):** keep "register" for Bing query-match + add freshness/accuracy. Candidates (execution A/B against the live SERP):
  - "How to Register for MTD as a Landlord: 2026 Sign-Up Steps" (57)
  - "Register for MTD as a Landlord 2026 | Step-by-Step Sign-Up" (57)
  - "How to Sign Up for MTD (Landlords): Register Step by Step" (56)
  Pick the one leading with the user's verb ("register") while signalling the corrected, current process.
- **metaDescription (≤158 chars):** lead with the corrected reality + the differentiator. Candidate: "How landlords sign up for Making Tax Digital for Income Tax in 2026: the real HMRC steps, software-first, identity check, joint owners and agents. No postal wait." (verify char count at write time; trim to ≤158.)
- **h1 / title:** "How to Register for Making Tax Digital as a Landlord: 2026 Step-by-Step Sign-Up Guide" (keep "register" in h1 for query-match; the body uses HMRC's "sign up" verb throughout).

---

## Universal rules (do not skip)

(Inherited per §13/§14 pointers. Critical for THIS brief: **NO em-dashes** anywhere — use commas, parentheses, full stops, middle dots. **NO pricing/fees** on-page; soften the £5-50 software band to "free tiers up to fuller paid packages" with no figures (Decision E — third-party band, not a fee leak, but kept clean). **No real client names**; any case study anonymised. **Raw HTML body**, never markdown `##`. **LeadForm auto-injected** by `BlogPostRenderer.tsx` — never duplicate; 1-2 inline `<aside>` CTAs only. **FAQ schema auto-emitted** from frontmatter `faqs:` — never hand-add FAQPage JSON in body. **Every statute/SI verified at write time**, including the SI 2026/336 revocation note and any Finance Act Royal Assent date per F-37.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `house_positions.md` §3, §19 (esp. §19.1-§19.10, §19.18, §19.19), §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution-claimed).
3. Read this brief end-to-end.
4. **Re-verify the HMRC sign-up flow** at gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax (the single "Sign up now" journey) AND **re-verify SI 2026/336 + reg 25 + the SI 2021/1076 revocation note** at legislation.gov.uk. These are the load-bearing pre-rewrite verifications (deterministic floor — do not trust prior memory).
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx, proper User-Agent).
6. Read the current source file in full.
7. Read the closest siblings (pillar, switch, quarterly, software, ASA, joint-owner, penalties) for cluster boundaries.
8. Plan outline: 8-10 H2s, ~3,000 body words, 10-12 FAQs, ONE §19.1 threshold table, 1-2 inline `<aside>`, 4-6 authority links.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + category; update `date`/`dateModified` to today. Update metaTitle/metaDescription/h1 per the plan. **Delete** the fabricated Step-5 menu path, the 7-10 day / 2-4 week timings, and the partnership-mandatory line; **fix** "thresholdcan"; **soften** the software price band.
10. Run build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0 (`grep` for "—"); Tailwind class count = 0; metaTitle ≤62; metaDescription ≤158; all internal links resolve; pricing check (`£[0-9]` returns 0 fee-discussion matches in body).
12. Confirm no redirect needed (none — this page is the cluster collapse TARGET; slug kept).
13. Update / insert `monitored_pages` Supabase row. **F-11 INVISIBLE-baseline rule:** because Google GSC is empty, use the 180-day monitoring window (not 90), and record the Bing pos 1-4 baseline so the Bing-side CTR change is measurable.
14. Commit on `main`: `git commit -m "Track 2: rewrite how-to-register-mtd-landlord (fabricated sign-up process + partnership do-not-write + depth lift)"`. Tracker edits to main repo file via absolute paths only.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the two HIGH flags + any new discoveries (cluster-audit candidate: other MTD pages carrying the partnership-mandatory error or fabricated timings).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §3 / §19.1 mandate table (50k/30k/20k): __
- §19.2 gross qualifying income (gross-vs-net trap): __
- §19.3 partnership DEFERRED (line-36 violation removed): __
- §19.4 joint owners sign up separately (not a partnership): __
- §19.5 voluntary opt-in + three-year exit (FAQ #2 overstatement corrected): __
- §19.6 software-must-precede + product-neutral: __
- §19.7 / §19.19 penalties (points + 15/30/31, FA 2021 Sch 24): __
- §19.10 ASA agent route (not 64-8): __
- §19.18 SI 2026/336 reg 25 (NOT SI 2021/1076 reg 20): __
- HMRC sign-up flow re-verified (single "Sign up now"): __

### Comparison: before vs after
- Word count: 1,759 → __
- H2 count: ~6 → __ (target 8-10)
- FAQ count: 4 → __ (target 10-12)
- Authority links: 0 → __ (target 4-6)
- Inline CTAs: 0 → __ (target 1-2)
- Fabricated Step-5 menu path removed: __ (Y/N)
- Fabricated 7-10 day / 2-4 week timings removed: __ (Y/N)
- Partnership-mandatory line removed: __ (Y/N)
- "thresholdcan" typo fixed: __ (Y/N)
- Software price band softened (no figures): __ (Y/N)
- Threshold boilerplate x7 → ONE §19.1 table: __ (Y/N)

### Visibility hypothesis test
- Pre-rewrite Google GSC: 0 (INVISIBLE)
- Pre-rewrite Bing: ~37 impr / 4 clicks; pos 1-4 on register-intent queries
- Post-rewrite target: open a Google entry (any non-zero); hold/improve Bing pos 1-4 with better CTR
- Verify at +30 / +60 / +90 / +180 days via monitored_pages (180-day window per F-11 INVISIBLE rule)

### Flags raised
- F-NN STALE_FACTS (fabricated process) — resolution recorded: __
- F-NN HOUSE_POSITION_CONFLICT (partnership) — resolution recorded: __
- Any new flags (cluster-audit candidates): __

### 2-3 sentence summary
- (populated at execution time)
