# Track 2 brief: replacement-domestic-items-relief-uk-landlords-guide

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; STALE_FACTS + INVISIBLE + THIN_DEPTH + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/replacement-domestic-items-relief-uk-landlords-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide
**Stage 1 priority:** **H** — single-relief deep-dive owner (pillar `landlord-tax-deductions-uk-2026-complete-list` forward-links here for "the full mechanics and edge cases"); page holds Bing page-1 equity (pos 5-9 on exact-intent queries) but is INVISIBLE on Google (0 GSC rows), so it must be lifted, never collapsed.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source markdown read in full; statute landscape verified against the diagnosis pass of 2026-05-30; house_positions cited by section)
**Cannibalisation status:** **REWRITE** (clean — designated RDI deep-dive owner; pillar deliberately defers here)

> Depth match-target: this brief is built to the gold-reference standard of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The rewrite must correct four discrete factual errors (commercial-lettings claim, furnished-only gating, missing governing statute, missing FHL exclusion), strip two em-dash hard-rule violations, add the s.311A four-condition mechanics + incidental-cost uplift + company route (CTA 2009 s.250A), and lift the body from 1,425 to ~3,400 words.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `replacement-domestic-items-relief-uk-landlords-guide`. It is the exact-intent slug for the primary query "replacement of domestic items relief" and carries existing Bing page-1 equity (pos 5-9). No redirect. The slug intentionally owns the single-relief deep-dive intent; the pillar `landlord-tax-deductions-uk-2026-complete-list` owns the broad-deductions intent and forward-links here (pillar body line 235).
- **Category:** `Section 24 & Tax Relief` (kept; canonical path `/blog/section-24-and-tax-relief/...` unchanged so the existing inbound link from the pillar resolves without a 301).
- **Gap-mode tag:** `STALE_FACTS` (primary, four discrete legal errors) + `INVISIBLE` (secondary, 0 Google GSC rows despite Bing page-1 equity) + `THIN_DEPTH` (tertiary, 1,425 words vs ~3,400 target; no statute spine; no incidental-cost mechanics; no company route) + `STRUCTURE` (quaternary, 4 FAQs vs 12-14 target; no rates/conditions table; 0 outbound authority links; 2 em-dash violations).
- **"Why this rewrite" angle:** the page carries forward the **pre-2016 wear-and-tear-allowance mental model** into the post-2016 s.311A regime. That stale framing produces real reader-misleading errors: it tells landlords the relief covers "commercial furnished lettings" (it does not — s.311A is dwelling-house only) and gates the relief on the property being let "as furnished" (s.311A imposes no furnished requirement). The page never once cites the governing statute, so a reader has no way to verify or to find HMRC's own guidance. The differentiation from the pillar is depth on a single relief: the four statutory conditions, the like-for-like cap arithmetic, the incidental-cost uplift (delivery, installation, disposal), the FHL exclusion (and FHL abolition from 6 April 2025), and the company route under CTA 2009 s.250A — none of which the pillar covers in depth.

---

## Current page snapshot (Stage 2 — source markdown read in full 2026-05-30)

**Filesystem source read (`Property/web/content/blog/replacement-domestic-items-relief-uk-landlords-guide.md`):**
- **Body word count:** ~1,425 (diagnosis-confirmed)
- **H2 outline (8 H2 + 5 H3):**
  1. What Is Replacement Domestic Items Relief? (+ H3 Qualifying and Non-Qualifying Items)
  2. How to Calculate and Apply the Relief (+ H3 Example Calculations)
  3. Record Keeping Requirements (+ H3 Essential Records)
  4. Comparison to the Old Wear and Tear Allowance (+ H3 Key Differences, with a 4-row table)
  5. Tax Planning and Common Mistakes (+ H3 Tax Planning Considerations, H3 Common Mistakes to Avoid)
  6. Practical Examples (+ H3 Example 1: Student Property, H3 Example 2: HMO Property)
  7. Future Changes and Professional Advice (+ H3 Future Considerations, H3 Getting Professional Help)
- **Current meta title:** "Replacement Domestic Items Relief: UK Landlord Guide 2025/26" (59 chars; carries a STALE **2025/26** year-stamp; should move to 2026/27 framing or year-neutral)
- **Current meta description:** "Complete guide to replacement domestic items relief for UK landlords. Learn what qualifies, how to claim, and avoid HMRC pitfalls when replacing furniture." (151 chars; generic, no specific mechanic hook, no consultation hook)
- **Current FAQs (frontmatter count):** 4 (target 12-14)
- **Current outbound authority links:** **0** to legislation.gov.uk / gov.uk / HMRC PIM. Internal links: 4 (MTD-deadline page, property-investment-tax pillar, Section 24 complete guide, BTL ltd-co complete guide, plus a property-accountant-services link). No statute ever cited.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` array).
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).
- **Worked examples present:** 4 (Basic Replacement £800/£50; Part-Exchange £600/£100; Example 1 student property £1,210; Example 2 HMO £1,050). All compute correctly on a cost-minus-proceeds basis but **all omit the incidental-cost uplift** (delivery, installation, disposal) per PIM3210, so each understates a real claim.

---

## GSC angle (last 90 days) — INVISIBLE on Google, Bing page-1 equity

**Google Search Console:** **0 rows** for this page in the 90-day `gsc_query_data` window. The page does not surface on Google for any query. This is the INVISIBLE gap mode: there is no Google CTR to optimise because there are no Google impressions to convert.

**Bing Webmaster (`bing_query_data`, per memory `bing_webmaster_data.md`):** page holds **position 5-9 on the exact-intent queries** ("replacement of domestic items relief", "replacement domestic items relief landlords", "domestic items relief calculation"). This is the canonical legacy-page-ranks-on-Bing-but-invisible-on-Google pattern. **Decision input (§16.T2/§16.T4):** the page has live equity on at least one engine, so the collapse guard would (and should) refuse a redirect. REWRITE in place, lift depth, and let the corrected page compete for Google visibility on its own exact-intent slug.

**GA4 (`ga4_page_data`):** negligible sessions (page is Google-invisible). Engagement signal is not load-bearing here; the limiter is **discoverability + correctness**, not read-depth.

**Strategic conclusion:** unlike the gold-reference CGT-rates page (a CTR-fail with rich Google impressions), this is an INVISIBLE page with a *correctness* problem. The realistic post-rewrite target is to (a) earn first Google impressions on the exact-intent long tail by being the deepest correct answer, and (b) protect and extend the existing Bing page-1 equity by removing the four factual errors that would lose a knowledgeable reader. Temper the CTR expectation: this is a 90-180 day visible-baseline build, not a 30-day CTR swing.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (four discrete, reader-misleading legal errors carried over from the pre-2016 wear-and-tear framing).** These are not cosmetic. Each one would mislead a landlord into either over-claiming (penalty risk) or under-claiming (lost relief):

1. **"Applies to both residential AND commercial furnished lettings" (body line 34) is WRONG.** ITTOIA 2005 s.311A Condition A restricts the relief to a **dwelling-house** let as a **dwelling-house**. Commercial lettings do not qualify. Strip "commercial" everywhere; reframe as residential dwelling-house only.
2. **The "let as furnished" gating (lines 32-34, 56, 62) is a wear-and-tear-allowance hangover.** The old s.308A wear-and-tear allowance required the dwelling to be **furnished**. s.311A does **not**: it applies wherever an existing domestic item provided for the tenant's use in a residential dwelling is replaced, furnished or not (an unfurnished let where the landlord provides, say, white goods or carpets, still qualifies on replacement). Reframe from "the property must be furnished" to "the relief applies on replacement of a domestic item provided for the tenant's use, in any residential let".
3. **The governing statute is never cited.** Add ITTOIA 2005 s.311A (individuals) and CTA 2009 s.250A (companies) plus HMRC PIM3210, rendered as legislation.gov.uk / gov.uk hyperlinks. A relief page with zero statutory anchors is both untrustworthy to a knowledgeable reader and weak for snippet capture against HMRC's own PIM3210.
4. **The FHL exclusion is omitted.** RDI explicitly does **not** apply to furnished holiday lettings (s.311A(5) / the FHL carve-out), and the FHL regime was abolished from **6 April 2025** (IT) / 1 April 2025 (CT) by FA 2025 Sch 5. A former-FHL property let as an ordinary residential dwelling from 6 April 2025 onward now *can* claim RDI under the standard residential rules. This is a material edge case the page must address.

**Secondary: INVISIBLE.** 0 Google GSC rows (see GSC section). The fix is correctness + depth + statute anchors to earn first Google impressions, while protecting Bing page-1 equity.

**Tertiary: THIN_DEPTH.** 1,425 words; the calculation section misses the **incidental-cost uplift** (delivery, installation of the new item, and cost of disposing of the old item are addable to the claim per PIM3210) — so all four worked examples understate the real claim. No four-condition statutory walkthrough. No company route.

**Quaternary: STRUCTURE.** 4 FAQs (target 12-14); no conditions/qualifying-items table at top for snippet bait; 0 outbound authority links; **2 em-dash hard-rule violations at body lines 28 and 62** (must be zero).

**Load-bearing fix sequence (ordered by ROI / correctness-first):**

1. **Correct the four STALE_FACTS first** (commercial→residential-only; furnished-gating→provided-item-on-replacement; add s.311A/s.250A/PIM3210; add FHL exclusion + post-6-April-2025 former-FHL note). Correctness is the load-bearing job before any depth-add.
2. **Strip the two em-dashes** at lines 28 and 62 (replace with commas / parentheses / full stops).
3. **Add the four-condition statutory walkthrough** as a new H2 ("The Four Conditions for the Relief (ITTOIA 2005 s.311A)") with Conditions A-D in a table — this is the snippet-bait + the differentiator vs the pillar.
4. **Fix the calculation to include the incidental-cost uplift** (delivery + installation + disposal added; less disposal proceeds / less any improvement element). Reissue all worked examples with the uplift so they no longer understate.
5. **Add the company route** (CTA 2009 s.250A) as a distinct H2, noting subs.(7) was omitted for accounting periods from 1 April 2025 by FA 2025, and that companies deduct against CT (cite §21.4 CT rates) rather than against income tax.
6. **Body lift to ~3,400 words**, FAQ count 4 → 12-14 (each FAQ targeting a specific exact-intent long-tail query), 2 inline `<aside>` CTAs, 5-7 authority links.
7. **Meta + H1 differentiation from the pillar** so both rank without colliding (see meta plan).
8. **§7 April 2027 rates** at the "future considerations" paragraph: the source asserts 22/42/47 at line 163. Per §7 [LOCKED] this is now **enacted** (FA 2026, Royal Assent 18 March 2026), so state it as enacted law with a date-stamped citation, framed precisely (reducer **rises to 22%**, England + NI only; no new wedge for basic-rate landlords). **Verify lock status against legislation.gov.uk at write time** per the F-37 Bill-vs-enacted discipline before asserting.

---

## Competitor URLs (Stage 2 — verify 200 + date-stamp at execution per §16.31)

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim3210 | The authoritative four-condition structure, the incidental-cost rule, and the like-for-like / improvement worked logic. Cite it; do not paraphrase loosely. | This is HMRC's own manual (the authority we link TO). We differentiate by being the *applied specialist* layer: company route, FHL transition, portfolio timing, anonymised case studies. |
| https://connaughtlaw.com/replacement-domestic-items-relief-uk-guide/ | Consumer-friendly framing of qualifying vs non-qualifying items. | Likely no statute spine, no company route, no FHL-abolition edge case, no incidental-cost uplift. Beat on depth + correctness. |
| https://www.freeagent.com/blog/replacement-of-domestic-items-relief/ | Clean like-for-like example structure. | Software-vendor angle; no s.250A company route, no FHL exclusion. Differentiate on specialist tax depth. |
| https://www.landlordstudio.com/uk-blog/replacement-of-domestic-items-relief | Landlord-operational framing (room-by-room replacement during voids). | No statutory citation depth, no incidental-cost uplift, no April-2027-rates interaction. |

**Competitor depth ceiling for this query class:** consumer/vendor explainers at ~900-1,600 words, 0-1 statute citations, no company route, no FHL edge case, no incidental-cost uplift. PIM3210 is the only authoritative competitor and it is a manual, not an applied guide. Our ~3,400-word target with the s.311A four-condition table, s.250A company route, FHL transition, incidental-cost-correct worked examples, 12-14 FAQs and 5-7 verified statute citations puts us decisively best-in-class, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest frozen snapshot; refreshed per batch).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own page) | replacement-domestic-items-relief-uk-landlords-guide | self | **REWRITE** in place |
| Pillar (live) | landlord-tax-deductions-uk-2026-complete-list | Has a short "Replacement of Domestic Items Relief" H2 (correctly cites ITTOIA 2005 s.311A) and **forward-links to THIS page** for "the full mechanics and edge cases" (pillar body line 235) | **No collision — intentional deference.** Pillar owns broad-deductions intent; this page owns the single-relief deep-dive. Add a reciprocal back-link to the pillar. Keep the meta/H1 distinct so they do not collide on SERPs. |
| Adjacent (live) | capital-vs-revenue-expenditure-landlord-uk | Repairs-vs-improvements test (capital vs revenue boundary) | **Adjacent, distinct intent. Cross-link, do not merge.** RDI is the *moveable-domestic-item* replacement rule; capital-vs-revenue governs the *fixtures* boundary (boilers, fitted kitchens). The RDI page references the boundary and forward-links here for the fixtures test. |
| Adjacent (live) | abolition-of-furnished-holiday-lettings-fhl... | FHL abolition | Cross-link from the FHL-exclusion section. Distinct intent (FHL regime change vs RDI mechanics). |
| Adjacent (live) | buy-to-let-limited-company-complete-guide-uk | Company tax treatment | Cross-link from the s.250A company-route section. Distinct intent (incorporation pillar vs single-relief mechanics). |
| Passing mentions (42 files) | city pages, capital-allowances pages, FHL pages | Mention RDI only in passing | None target RDI as primary query. No collision. |

**On equity:** this page is INVISIBLE on Google (0 GSC rows) but holds **Bing page-1 equity (pos 5-9)** on the exact-intent queries, so it must **NOT** be collapsed away. The collapse guard (`scripts/track2_collapse_guard.py`, §16.T2) would refuse any redirect of a page with live single-engine equity into another page.

**Conclusion:** **REWRITE** in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. The page is the designated RDI deep-dive owner; the pillar deliberately defers to it.

---

## Closest existing pages (Stage 2 — internal-link partners, all verified live in corpus)

- **Pillar (reciprocal):** `landlord-tax-deductions-uk-2026-complete-list` (`/blog/section-24-and-tax-relief/...`) — pillar already forward-links here; add a reciprocal back-link from the intro and from the "what does not qualify" section.
- **Repairs-vs-improvements / fixtures boundary:** `capital-vs-revenue-expenditure-landlord-uk` (`/blog/landlord-tax-essentials/...`) — forward-link from the "fixtures do not qualify" section (boilers, fitted kitchens, bathroom suites are judged on the capital-vs-revenue test, not RDI).
- **FHL exclusion + abolition:** `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` (`/blog/landlord-tax-essentials/...`) — forward-link from the FHL-exclusion section.
- **Company route:** `buy-to-let-limited-company-complete-guide-uk` (`/blog/incorporation-and-company-structures/...`) — forward-link from the s.250A company-route section.
- **Section 24 interaction:** `section-24-tax-relief-complete-guide` (already linked at source line 126) — keep; RDI reduces profit *before* the S24 restriction, which is the page's strongest planning point. Verify the existing slug resolves (`section-24-and-tax-relief` category).
- **MTD record-keeping:** `making-tax-digital-landlords-april-2026-deadline` (already linked at source line 76) — keep for the record-keeping section.
- **HMO operational angle:** `hmo-tax-guide-rental-income-deductions-multi-tenant` — optional cross-link from the HMO worked example (room-by-room replacement during voids).
- **Home-office adjacency (optional):** `claim-home-office-deduction-landlords` — only if a natural "other deductible costs" aside is added; not required.

---

## House-position references (Stage 1)

> **No dedicated RDI lock exists in `house_positions.md`.** Per the diagnosis instruction, cite the **verified statute (ITTOIA 2005 s.311A / CTA 2009 s.250A) and HMRC PIM3210 directly**, not a §N.M, for the RDI mechanics. The §N.M cites below are for the *surrounding* positions the rewrite must thread.

- **§4 Section 24 finance cost restriction** [LOCKED]: RDI reduces rental profit *before* the S24 restriction applies, making it more valuable than finance-cost relief (which is a basic-rate reducer only). The source asserts this correctly at line 126 but states the higher-rate saving as "40%" — keep the principle, frame the rate precisely against §4 (and §7 for 2027/28, where the reducer rises to 22%). Do NOT write "the reducer stays at 20% in 2027/28".
- **§5 CGT** [LOCKED]: only relevant for the disposal-proceeds netting framing (selling the old item is not a CGT event for chattels under the £6,000 chattel exemption; the proceeds simply net against the RDI claim). Light touch only.
- **§6 FHL abolition transition** [LOCKED]: FHL abolished 6 April 2025 (IT) / 1 April 2025 (CT) per FA 2025 Sch 5. RDI does not apply to FHL; former-FHL property let as ordinary residential from 6 April 2025 can claim RDI under the standard rules. Do NOT write "FHL still applies".
- **§7 April 2027 property income tax rates** [LOCKED — but VERIFY at write time per F-37 Bill-vs-enacted discipline]: 22% basic / 42% higher / 47% additional, **enacted** by FA 2026 (Royal Assent 18 March 2026), effective 6 April 2027, England + NI only; S24 reducer rises to 22% (FA 2026 Sch 1). State as enacted law with date-stamped citation; do not hedge as "proposed" unless legislation.gov.uk contradicts the lock at write time. No new wedge for basic-rate landlords.
- **§21.4 CT rates 2026/27** [LOCKED]: 19% small profits (≤£50k) / 25% main (≥£250k) / 26.5% marginal band — for the company-route section (a company claims s.250A relief against CT, saving at its marginal CT rate, not at an income-tax rate). Do NOT quote a single "company saves X%" figure; the rate is profit-band-dependent.
- **§3 / §19 MTD for ITSA** [LOCKED]: thresholds £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028). The source states these correctly at line 164 — **keep as-is**; do not re-derive.
- **§13 do-not-write list** [LOCKED]: NO pricing/fees, NO real client names, anonymised personas only, NO em-dashes. The source is clean on pricing (no fee figures present) — keep it that way.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts (correctness, not style):**

1. **STALE_FACTS — "commercial furnished lettings" claim (line 34).** Contradicts the dwelling-house-only scope of ITTOIA 2005 s.311A Condition A. This is the rewrite's **first job**.
2. **STALE_FACTS — "let as furnished" gating (lines 32-34, 56, 62).** Carries the repealed s.308A wear-and-tear-allowance furnished requirement into the s.311A regime, which has no such requirement.
3. **OMISSION — FHL exclusion absent.** Must be added per §6.
4. **OMISSION — governing statute never cited.** Must add s.311A / s.250A / PIM3210.
5. **EM-DASH hard-rule violations at body lines 28 and 62.** Must be zero post-rewrite (`grep -c '—'` must return 0).
6. **STALE year-stamp in metaTitle ("2025/26").** Move to 2026/27 or year-neutral framing.
7. **§7 April 2027 assertion (line 163):** currently asserted as fact; per §7 [LOCKED] it is now enacted, so the assertion is *correct in direction* but must carry a date-stamped FA 2026 citation and the precise "reducer rises to 22%, England + NI only, no new wedge" framing. **Verify lock at write time.**

Flag to `track2_site_wide_flags.md` at execution as: **F-[next] | 2026-05-30 | HIGH | replacement-domestic-items-relief-uk-landlords-guide | STALE_FACTS | Page carries pre-2016 wear-and-tear framing: claims commercial lettings qualify (s.311A is dwelling-house only) + gates relief on furnished status (s.311A has no furnished requirement) + omits governing statute + omits FHL exclusion. 2 em-dash violations (lines 28, 62). Correctness-first rewrite.**

---

## Authority links worth considering (Stage 2 — verify 200 + current operative wording at execution per F-8 / §16.31)

| URL | Verification note | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | Verify s.311A is in force with the four conditions (A-D) + FHL carve-out at write time. **Confirm Royal Assent / amendment history of any Finance Act that touched it (F-37 pattern).** | Governing statute — individuals (the spine cite) |
| https://www.legislation.gov.uk/ukpga/2009/4/section/250A | Verify CTA 2009 s.250A in force; confirm subs.(7) omission for APs from 1 April 2025 (FA 2025) at write time. | Governing statute — companies |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim3210 | Verify 200 + that it still states the four conditions + incidental-cost rule + like-for-like / improvement test. | HMRC authority for conditions + incidental-cost uplift |
| https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 | FA 2025 Sch 5 (FHL abolition; commencement 1 Apr 2025 CT / 6 Apr 2025 IT) per §6 / §25.7. | FHL exclusion + post-abolition transition |
| https://www.legislation.gov.uk/ukpga/2016/... (Finance Act 2016) | The Act that abolished the 10% wear-and-tear allowance (old ITTOIA s.308A) and introduced s.311A from April 2016. **Verify exact c. number + section at write time** (do not guess the chapter). | Historical context for the wear-and-tear comparison section |
| Finance Act 2026 (April 2027 rates) — verify exact c. + section at write time | Per §7: FA 2026, Royal Assent 18 March 2026, ss.6-7 + Sch 1. F-37 verify-at-write discipline. | §"Future considerations" 2027/28 rates |
| https://www.gov.uk/government/publications/property-income-manual or gov.uk RDI consumer page | Optional cross-reference for users wanting HMRC's plain-English version. | User link-out |

**(Execution session selects 5-7 to actually render as hyperlinks in the body.)**

---

## Section-by-section content plan (~3,400 words)

Target: 11-13 H2s, ~3,400 body words, 12-14 FAQs, 1 conditions/qualifying-items table at top, 1 wear-and-tear comparison table, 4-5 incidental-cost-correct worked examples, 2 inline `<aside>` CTAs, 5-7 authority links.

1. **Intro (~180 words).** What RDI is in one correct sentence (a revenue deduction for replacing existing domestic items provided for a tenant's use in a **residential dwelling-house**, available to individuals under ITTOIA 2005 s.311A and to companies under CTA 2009 s.250A). State up front that it replaced the 10% wear-and-tear allowance from April 2016 and that it is a *replacement-only* relief (no relief on first provision). Reciprocal back-link to the pillar. **No "commercial". No "furnished" gating.**
2. **What Is Replacement Domestic Items Relief? (~280 words).** Plain-English definition; revenue not capital; deductible against rental profit. Correct the scope: **residential dwelling-house only**; applies on **replacement** of a domestic item provided for the tenant, furnished or unfurnished let. Cite s.311A + PIM3210.
3. **The Four Conditions (ITTOIA 2005 s.311A) (~360 words) — NEW, the differentiator.** Condition A: a dwelling-house is let as a dwelling-house (residential, not commercial; not FHL). Condition B: a "domestic item" provided for the tenant's use is replaced by a new domestic item. Condition C: the old item is no longer available for the tenant's use in that dwelling-house. Condition D: a deduction would otherwise be prohibited as capital (i.e. the relief overrides the capital bar). Present as a 4-row table for snippet bait. Note the "new item" must be the nearest modern equivalent (like-for-like cap, see below).
4. **Qualifying vs Non-Qualifying Items (~300 words).** Keep the source's lists (they are broadly correct) but reframe non-qualifying *fixtures* (boilers, fitted kitchens, bathroom suites, built-in wardrobes) as judged on the **repairs-vs-improvements / capital-vs-revenue test**, and forward-link to `capital-vs-revenue-expenditure-landlord-uk`. Clarify the moveable-vs-fixture line.
5. **How the Relief Is Calculated, Correctly (~340 words).** The full formula: **Relief = (cost of new item, capped at the cost of a like-for-like / nearest-modern-equivalent replacement) + incidental costs of acquiring/installing the new item + incidental costs of disposing of the old item − any proceeds from disposing of/part-exchanging the old item**. This corrects the source, which omits the incidental-cost uplift. One inline `<aside>` CTA after this section.
6. **Like-for-Like and the Improvement Cap (~280 words).** What counts as improvement (genuine uplift in quality/capacity) vs accepted technological advancement (SD TV → equivalent HD TV; basic → modern-equivalent washing machine). The cap mechanic: if you upgrade, you claim only the cost of the equivalent replacement, with the excess disallowed. Worked micro-example.
7. **Worked Examples (~360 words) — reissued with incidental costs.** (a) Basic replacement with delivery + old-item disposal costs added. (b) Upgrade hitting the like-for-like cap. (c) Part-exchange. (d) Multi-item void refurbishment (HMO room-by-room). Each must net disposal proceeds and add incidental costs so the figures no longer understate. Anonymised personas only (no real names).
8. **Replacement of Domestic Items Relief for Companies (CTA 2009 s.250A) (~300 words) — NEW.** Companies claim the equivalent relief under s.250A; note subs.(7) omitted for APs from 1 April 2025 (FA 2025). Relief is deducted against CT, so the saving tracks the company's marginal CT rate (cite §21.4: 19% / 25% / 26.5% band) rather than an income-tax rate. Forward-link to BTL ltd-co pillar. Do NOT quote a single saving percentage.
9. **The FHL Exclusion and the Former-FHL Transition (~260 words) — NEW.** RDI does not apply to furnished holiday lettings. FHL abolished 6 April 2025 (IT) / 1 April 2025 (CT) per FA 2025 Sch 5. A property that was an FHL but is let as an ordinary residential dwelling from 6 April 2025 can claim RDI under the standard residential rules. Forward-link to the FHL-abolition page.
10. **RDI vs the Old Wear and Tear Allowance (~240 words).** Keep the comparison table (correct), but anchor it to the Finance Act 2016 change and emphasise the *replacement-only* shift (no automatic 10%). Correct any "furnished-only" residue.
11. **Interaction with Section 24 and Why RDI Is Valuable (~240 words).** RDI reduces profit *before* the S24 finance-cost restriction, so it relieves at the landlord's full marginal rate, unlike finance costs (basic-rate reducer only). Frame the rate precisely per §4; note the 2027/28 reducer rises to 22% per §7. Forward-link to Section 24 guide.
12. **Record Keeping for an RDI Claim (~220 words).** Keep the source's records list; tie to MTD digital-records discipline (§19) and the April 2026 mandate. Forward-link to MTD page. Second inline `<aside>` CTA.
13. **Future Considerations (~180 words).** April 2027 rates (22/42/47, enacted FA 2026, England + NI, reducer at 22%, no new basic-rate wedge) per §7 — **verify lock at write time**. MTD thresholds (£50k/£30k/£20k) per §3 — keep as stated. Close with the "getting professional help" framing (no pricing; consultation CTA via the auto-injected LeadForm).

**FAQ plan (12-14, each targeting an exact-intent long-tail query):** (1) Can I claim RDI on the first furniture I buy? (No — replacement only; keep). (2) Does RDI apply to unfurnished lets? (Yes if a domestic item provided for the tenant is replaced — corrects the furnished gating). (3) Does RDI apply to commercial property? (No — residential dwelling-house only). (4) Can I claim RDI on a furnished holiday let? (No — FHL excluded; and FHL abolished from 6 April 2025). (5) Can I add delivery and disposal costs? (Yes — incidental-cost uplift per PIM3210). (6) What if I upgrade when replacing? (like-for-like cap). (7) Do I deduct sale proceeds of the old item? (Yes; keep). (8) Boiler / fitted kitchen replacement — is it RDI? (No — fixtures, capital-vs-revenue test). (9) How does a limited company claim it? (CTA 2009 s.250A, against CT). (10) Can I claim both RDI and capital allowances on the same item? (No double claim). (11) What records does HMRC expect? (12) Does RDI reduce profit before Section 24? (Yes). (13) Is there still a wear-and-tear allowance? (No — abolished April 2016, FA 2016). (14) Does RDI change in April 2027? (Relief unchanged; the rates it relieves against change per §7).

---

## Statute spine (every citation to be verified against legislation.gov.uk at write time, incl. Royal Assent dates per F-37)

| Citation | Use in rewrite | Verify-at-write note |
|---|---|---|
| **ITTOIA 2005 s.311A** | Governing statute, individuals; the four conditions A-D; FHL carve-out | Confirm in force + four-condition wording + FHL exclusion subsection |
| **CTA 2009 s.250A** | Governing statute, companies; the company route | Confirm in force; confirm subs.(7) omitted for APs from 1 April 2025 (FA 2025) |
| **ITTOIA 2005 s.308A (repealed)** | Historical: the old 10% wear-and-tear allowance, abolished April 2016 | Reference as repealed; do not present as live |
| **Finance Act 2016** | The Act that abolished wear-and-tear (old s.308A) and introduced s.311A from April 2016 | Verify exact c. number + section before citing |
| **FA 2025 Sch 5** | FHL abolition (6 Apr 2025 IT / 1 Apr 2025 CT); per §6 / §25.7 | Confirmed in house_positions §25.7; re-verify the schedule |
| **FA 2026 ss.6-7 + Sch 1** | April 2027 property income rates (22/42/47) + S24 reducer at 22%; per §7 | Royal Assent 18 March 2026 per §7 — **re-verify at write time (F-37)** |
| **HMRC PIM3210** | Incidental-cost uplift; four conditions; like-for-like / improvement test | gov.uk internal manual; verify 200 + content |
| **TCGA 1992 (chattel exemption context)** | Light: old-item sale proceeds netting; chattels under £6,000 not a CGT event | Optional; only if the disposal-proceeds framing needs it |
| **ITTOIA 2005 s.272 (property business)** | Optional anchor for "deductible against rental profit" framing | Optional |

**Primary spine (must appear as hyperlinks):** s.311A, s.250A, PIM3210, FA 2025 Sch 5, FA 2026 (April 2027 rates). The statute discipline per Track 2 flag F-8: a statute's *operative wording* can be removed by amendment even when the URL is live — verify the current text, not just a 200 status.

---

## metaTitle / metaDescription / H1 plan (differentiated from the pillar)

The pillar is `landlord-tax-deductions-uk-2026-complete-list` with metaTitle in the "complete list of landlord deductions" register. This page must own the *single-relief deep-dive* register so they do not collide on SERPs.

- **metaTitle (≤62 chars) — candidates (test against the exact-intent query "replacement of domestic items relief"):**
  - `Replacement of Domestic Items Relief: Landlord Guide 2026/27` (60)
  - `Replacement Domestic Items Relief: s.311A Explained 2026/27` (58)
  - Avoid the stale "2025/26" stamp. Lead with the exact-intent phrase "Replacement of Domestic Items Relief" (matches the primary query word order) + a differentiator (the statute, the year, or "how to claim").
- **metaDescription (≤158 chars) — candidate:** `How UK landlords claim Replacement of Domestic Items Relief under ITTOIA 2005 s.311A: the four conditions, the like-for-like cap, incidental costs, and the FHL rule.` (Specific mechanic hooks; no pricing; no em-dashes. Optionally append a free-consultation hook if within the char budget.)
- **H1:** keep close to the exact-intent query but distinct from the pillar H1. Candidate: `Replacement of Domestic Items Relief: A Complete Guide for UK Landlords` or keep the question form `What Is Replacement of Domestic Items Relief and What Can Landlords Claim?` (the question form already ranks on Bing; preserving it protects equity, but tighten to include "of Domestic Items" exact phrase). Ensure the H1 differs in register from the pillar H1.

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4` section 13, this brief inherits (pointers, not duplication):
- **Voice rules** — `NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5` ("Voice"): **no em-dashes anywhere** (this page currently violates at lines 28 + 62 — must be 0 post-rewrite), anonymised social proof only, **no pricing/fees**, exact figures + named statute. Memory `feedback_no_em_dashes.md` + `agency_lead_gen_model.md`.
- **Lead-gen architecture** — `competitor_rewrite_playbook.md §5`: `LeadForm` auto-injected by `BlogPostRenderer.tsx` (never duplicate); 1-3 inline `<aside>` CTAs at conversion moments (this plan specifies 2).
- **CSS in markdown** — `competitor_rewrite_playbook.md §5`: no Tailwind utility classes in markdown body; semantic HTML only; `.prose-blog aside` handles inline-CTA styling.
- **FAQs and schema** — `competitor_rewrite_playbook.md §5`: frontmatter `faqs:` array, target 10-14 (this plan: 12-14); `buildBlogPostingJsonLd` auto-emits FAQPage; never manually add FAQ schema in body.
- **Anti-templating discipline** — `NETNEW_PROGRAM.md §10`: gap-mode diagnosis must differ per page (this one is STALE_FACTS-led, distinct from the CTR-fail gold reference and the city-page STRUCTURE reference).
- **Quality bar** — `competitor_rewrite_playbook.md §4.3` six-check verification (build pass; FAQ schema count = frontmatter length; 0 em-dashes; 0 Tailwind classes; meta lengths; links resolve).
- **Statute citation discipline** — Track 2 flag F-8 (operative wording can be removed by amendment even when the URL is live) + the F-37 Bill-vs-enacted pattern (verify Royal Assent of any cited Finance Act at write time).
- **§16 lessons (all)** — `NETNEW_PROGRAM.md §16`, esp. §16.18 (reasoning-first), §16.31 (URL liveness), §16.22/§16.27/§16.30/§16.33/§16.40+ (Bill-vs-enacted), §16.14/§16.15 (tracker hygiene); and `TRACK2_PROGRAM.md §16.T1-T6` (deterministic floor; data-gated collapse; monitored_pages as input).

If any parent rule changes, this brief inherits automatically.

---

## 19-step workflow — inherited from parent program with Track 2 deltas

Inherits the full workflow from `NETNEW_PROGRAM.md §7` (or the equivalent Wave-N file). Track 2 deltas (per `TRACK2_PROGRAM.md §4` section 14): Step 9 rewrites the markdown at the existing path (not a new file); Step 12 confirms no redirect needed (none — slug + canonical kept, this is the designated RDI deep-dive owner); Step 13 updates/inserts the `monitored_pages` Supabase row. Page-specific deltas:

1. Read `house_positions.md` §4, §5, §6, §7, §21.4, §3/§19, §13 at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / phase status).
3. Read this brief end-to-end.
4. **Verify the statute spine** against legislation.gov.uk: s.311A (four conditions + FHL carve-out), s.250A (+ subs.(7) FA 2025 omission), FA 2025 Sch 5, FA 2026 ss.6-7 (Royal Assent 18 March 2026 — F-37), PIM3210. This is the load-bearing pre-rewrite step.
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx, proper User-Agent).
6. Read the current source markdown in full; mark the four STALE_FACTS errors + the two em-dashes (lines 28, 62) for correction.
7. Read the pillar (`landlord-tax-deductions-uk-2026-complete-list`) + `capital-vs-revenue-expenditure-landlord-uk` for boundary/cross-link alignment.
8. Plan the outline per the section-by-section plan above (~3,400 words, 12-14 FAQs, conditions table at top).
9. **Rewrite markdown at the existing path.** Preserve slug + canonical + category + `date`; update `dateModified` to today. Strip the "2025/26" metaTitle stamp. Correct all four STALE_FACTS. Add the four-condition table, incidental-cost-correct worked examples, the s.250A company route, the FHL exclusion. Add 5-7 authority hyperlinks. Add 2 inline `<aside>` CTAs.
10. Build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; **em-dash count = 0** (`grep -c '—'`); Tailwind class count = 0; metaTitle ≤62; metaDescription ≤158; all internal links resolve (slug_resolver category check).
12. Confirm no redirect needed (none; slug + canonical kept).
13. Update/insert `monitored_pages` row; this is an INVISIBLE-baseline page, so use the **180-day window** (per F-11 recommendation for invisible-baseline pages) from rewrite date.
14. Commit on `main`: `Track 2: rewrite replacement-domestic-items-relief-uk-landlords-guide (STALE_FACTS correctness + s.311A depth lift)`.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Append the F-flag (STALE_FACTS) + any new discoveries to `track2_site_wide_flags.md`.
17. Update `TRACK2_PROGRAM.md §3` heartbeat.
18. Log discoveries for inter-batch awareness (esp. whether the pre-2016 wear-and-tear framing recurs on other furnishing/FHL pages — cluster-audit candidate).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position + statute alignment
- s.311A four conditions verified at legislation.gov.uk: __
- s.250A (+ subs.(7) FA 2025 omission) verified: __
- FA 2025 Sch 5 (FHL abolition) verified: __
- FA 2026 ss.6-7 (April 2027 rates) Royal Assent 18 Mar 2026 re-verified (F-37): __ enacted / __ contradicted
- PIM3210 incidental-cost rule verified: __
- §4 S24-interaction framing: __  §21.4 CT-rate band for company route: __

### Comparison: before vs after
- Word count: 1,425 → __ (target ~3,400)
- H2 count: 8 → __  | FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 5-7)  | Inline CTAs: 0 → __ (target 2)
- Worked examples: 4 (understated) → __ (incidental-cost-correct)
- Em-dashes: 2 (lines 28, 62) → 0
- "commercial" RDI claim removed: __ (Y/N)  | furnished-gating reframed: __ (Y/N)
- FHL exclusion added: __ (Y/N)  | s.250A company route added: __ (Y/N)
- Conditions table added: __ (Y/N)  | metaTitle "2025/26" stamp removed: __ (Y/N)

### Flags raised
- F-[next] (carried from brief): STALE_FACTS correctness sweep applied: __
- Cluster-audit candidate (pre-2016 wear-and-tear framing on other furnishing/FHL pages): __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
