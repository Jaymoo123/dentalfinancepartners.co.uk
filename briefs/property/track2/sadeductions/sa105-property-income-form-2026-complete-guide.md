# Track 2 brief: sa105-property-income-form-2026-complete-guide

**Site:** property
**Brief type:** Legacy rewrite — REWRITE in place (WRONG-ADVICE + STALE + THIN-DEPTH + STRUCTURE + INVISIBLE + CTR-FAIL)
**Source markdown path:** `Property/web/content/blog/sa105-property-income-form-2026-complete-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide
**Stage 1 priority:** **H — wrong-advice severity overrides everything.** The page actively misleads residential landlords into a capital-allowances claim that CAA 2001 s.35 bars. That is a consumer-protection error on a high-intent compliance page that ranks Bing page 1 + Google pos 4-5. Fix it.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source read in full; house positions §5/§6/§7/§25/§34/§38 threaded; competitor + authority targets named for live verification at write)
**Cannibalisation status:** REWRITE (this page is the strongest on-site asset for the literal "SA105 form / SA105 property income pages" intent; the two nearest siblings are weaker on this intent and own a different job-to-be-done; collapse-direction rule forbids 301-ing a stronger page into a weaker one)

> **Gold-reference depth target.** Match `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` for data integration and section completeness, and `briefs/property/track2/trial/birmingham-property-accountant.md` for the pricing-leak strip discipline. The load-bearing differentiator on this page is real SA105 box numbers, which no competitor in the SERP carries except the gov.uk SA105 notes PDF.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `sa105-property-income-form-2026-complete-guide`. The slug carries the form identifier ("sa105"), the page-job ("property-income-form"), and the year. It is the literal match for the primary intent and it is the strongest page we own on that intent. No redirect. No slug change (a slug change would forfeit the Bing page-1 equity for zero gain).
- **Category:** `landlord-tax-essentials` (kept). The page sits in the same category as both siblings, which keeps the three-page cluster internally navigable.
- **Gap-mode tags (in fix-priority order):**
  1. `WRONG_ADVICE` (primary, blocking) — the "Capital Allowances" H3 tells residential landlords they can claim AIA / capital allowances on furniture, appliances, carpets and curtains inside a let dwelling. CAA 2001 s.35 bars exactly this. House position §38 do-not-write and §25.7 are explicit.
  2. `STALE_FACTS` (high) — April 2027 separate property income rates stated as a future "will apply"; they are ENACTED law (FA 2026 c.11, ss.6-7, RA 18 March 2026, effective 6 April 2027, England + NI). The s.24 reducer rising to 22% is omitted entirely.
  3. `THIN_DEPTH` + `STRUCTURE` (high) — 1,195 body words; a "how to complete the form" page that names ZERO actual SA105 box numbers. This is simultaneously the biggest structural failure and the clearest differentiation gap.
  4. `INVISIBLE` + `CTR-FAIL` (the surfacing symptom) — Bing page 1 (pos 3 "sa105 property", pos 6 "sa105"/"sa105 form", pos 3 "sa105 2026 form", 2 clicks); Google pos 4-5 on the few "sa105 2026" impressions. The page ranks but the thin, partly-wrong body caps both impressions and CTR.
- **"Why this rewrite" angle:** This page should become the **box-by-box SA105 form-completion reference** for the corpus: a landlord arrives wanting to know which number goes in which box, and leaves with that plus the two corrections the SERP competitors all get wrong or omit (the s.35 dwelling-house bar -> RODIL route, and the enacted April 2027 rates). It forward-links the end-to-end SA100 walkthrough and the comprehensive return pillar rather than duplicating them, and forward-links the dedicated cluster pages (RODIL, rent-a-room, MTD, Section 24, capital allowances) rather than re-deriving their depth.

---

## Current page snapshot (Stage 2 — source read in full 2026-05-30)

**Filesystem source read (`Property/web/content/blog/sa105-property-income-form-2026-complete-guide.md`):**
- **Body word count:** ~1,195 (matches diagnosis `current_word_count`).
- **H2 outline (8 H2s, with H3s under the section-by-section block):**
  1. What Is the SA105 Property Income Form?
  2. When Do You Need to Complete SA105 Property Income Pages?
  3. SA105 Property Pages Tax Return 2026: Section-by-Section Guide (H3s: Property Income and Expenses; Mortgage Interest, Finance Costs and Section 24; **Capital Allowances** [WRONG]; Losses)
  4. Common SA105 Completion Mistakes to Avoid
  5. SA105, Making Tax Digital (MTD) and Future Changes
  6. Property Types and Specific Considerations
  7. SA105 Deadlines and Penalties
  8. Getting SA105 Right
- **metaTitle:** "SA105 2026 Property Income Form Guide | UK Landlords" (52 chars).
- **metaDescription:** "Complete guide to filling out SA105 property income pages for 2026 tax return. Step-by-step instructions for UK landlords with rental income." (139 chars) — generic; no box-number / RODIL / planning hook.
- **h1:** "SA105 Property Income Form 2026: Complete Guide for UK Landlords".
- **FAQs (frontmatter `faqs:` array):** 4 (what income goes on SA105; mortgage interest; loss; deadlines). Target 12-14.
- **Worked examples present:** light prose only (£1,200/month -> £14,400; £8,000 interest -> £1,600 credit). No box-mapped worked example. No real box numbers anywhere.
- **Internal links:** 6 (what-does-a-property-accountant-do; making-tax-digital-landlords-april-2026-deadline; section-24-tax-relief-complete-guide; property-investment-tax-uk-complete-guide-2026 mislabelled as "rent-a-room relief"; buy-to-let-limited-company-complete-guide-uk).
- **Outbound authority links:** 0 (no gov.uk SA105 page, no SA105 notes PDF, no legislation.gov.uk).
- **Inline CTAs:** 0.
- **Last meaningful edit:** frontmatter `date` 2026-04-10.

**Two embedded errors carried in the frontmatter `faqs` array too** (not just body): FAQ "Can I claim mortgage interest as an expense on SA105?" is correct, but the body's Capital Allowances claim must be removed AND no FAQ should be allowed to reintroduce the AIA-on-furnishings error.

---

## GSC / Bing angle (last 90 days) — per diagnosis cannibalisation evidence

**Bing (`bing_query_data`, the stronger surface for this page):**
- pos 3 "sa105 property"
- pos 6 "sa105" / "sa105 form"
- pos 3 "sa105 2026 form"
- 2 clicks in window (page-1 Bing presence is the live commercial signal — see memory `bing_webmaster_data.md`: legacy pages routinely rank page-1 Bing while sitting page 4-8 Google).

**Google (`gsc_query_data`):**
- pos 4-5 on the thin "sa105 2026" / "sa105 form 2026" / "sa105 notes 2026" impression set.

**Pattern read:** the literal "sa105" / "sa105 form" / "sa105 notes" query family is a navigational-plus-instructional intent (the searcher has the form in front of them and wants box-level help). gov.uk owns the raw form + the notes PDF; we cannot out-authority gov.uk on "what is box 20", but we CAN out-explain it (plain-English mapping + worked example + the two corrections gov.uk's notes do not editorialise). The page already ranks; the lever is depth + correctness + box-bait structure so Bing/Google can surface our box table and so the click resolves to a satisfying answer.

**Realistic post-rewrite target:** hold/improve Bing page-1, lift Google pos 4-5 toward page 1, and convert the box-completion intent that currently bounces to gov.uk's bare notes PDF. Tempered CTR-lift expectation per the `INTENT-MISMATCH` discipline (gov.uk notes PDF is a strong competing authority for part of this volume), but unlike a pure rates page, box-by-box *explanation* is genuinely under-served — this is a recoverable depth gap, not an irrecoverable intent.

**Execution note:** pull fresh `bing_query_data` + `gsc_query_data` + `ga4_page_data` for this slug at write time (`python -m optimisation_engine.clients.bing_query_client property` + `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90`) and bake the real rows into the work-log before committing.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source read)

**Primary: WRONG_ADVICE (highest severity, blocking).** The "Capital Allowances" H3 states residential landlords "can claim capital allowances on furniture, appliances, and equipment" and that AIA gives "100% relief ... up to £1 million" on "furniture and furnishings, kitchen appliances, carpets and curtains". This is FALSE for residential dwelling-houses. **CAA 2001 s.35** bars plant-and-machinery allowances for plant for use in a dwelling-house within a property business (house position **§38** do-not-write list: "Landlords can claim AIA on furnishings/boilers inside a let dwelling" is barred by s.35; **§25.7** dwelling-house restriction). The correct mechanism for replacing furniture, appliances, carpets and curtains in a residential let is **Replacement of Domestic Items relief (ITTOIA 2005 s.311A)**, which the page never mentions. AIA / capital allowances only reach **common parts** of a block and **integral features** (CAA 2001 s.33A) in qualifying non-dwelling areas, or commercial / former-FHL property. **The rewrite must delete the Capital Allowances H3 as written and replace it with a RODIL section (s.311A) that also explains the s.35 bar and where the narrow capital-allowances exception does apply (HMO common parts, commercial).**

**Secondary: STALE_FACTS.**
- (a) The page says "From April 2027, separate property income tax rates will apply (22% basic, 42% higher, 47% additional)" as a future event in two places (intro bullet + "Property Types" section). Per house position **§7** these are **ENACTED** (FA 2026 c.11, ss.6-7, RA 18 March 2026, effective 6 April 2027, England + NI only; Scotland/Wales set their own per s.8/Sch 2). Assert as enacted law, not "will apply". And the page **omits** that FA 2026 Sch 1 raises the **Section 24 finance-cost reducer to 22%** (not frozen at 20%) for 2027/28 — a material omission for a finance-cost box explainer. Note the §7 "no new wedge for basic-rate; reducer tracks 22%" framing.
- (b) "FHL abolished from April 2025" is correct (FA 2025 c.8 Sch 5; house position §6 / §25.7) — KEEP. But the page's capital-allowances-for-furnished-lettings claim directly contradicts the post-abolition s.35 regime; removing the wrong CA section resolves this internal contradiction too.

**Tertiary: THIN_DEPTH + STRUCTURE.** A "how to complete the form" page that names ZERO real SA105 box numbers is the single biggest structural failure. The whole differentiation gap is here: even SelfLandlord (~4,500w) and Taxd (~2,800w) omit real box numbers; only the gov.uk SA105 notes PDF has them, and it is a bare official notes document with no plain-English mapping, worked examples, or planning. **Map the real boxes** (see statute/box spine below) to plain-English guidance plus a worked example. Also missing entirely: the **£1,000 property allowance**, **cash-basis-vs-accruals default**, **jointly-owned-property apportionment** (and the Form 17 interaction), and the **foreign-property cross-link to SA106** (SA105 is UK property only).

**Quaternary: INVISIBLE / CTR-FAIL (surfacing symptom).** Page ranks (Bing page 1, Google pos 4-5) but the thin + partly-wrong body limits both impression growth and click-resolution. Depth + correctness + box-bait table + meta rewrite are the levers.

**PRICING-LEAK (Decision E strip — not a hard breach, strip anyway).** Two passages carry cost/payback framing with no figures: intro "The cost of professional help often pays for itself through tax savings and reduced compliance risks" and close "consider professional advice ... The investment in getting your SA105 right pays dividends". No numbers present so not a hard breach, but per Decision E + memory `agency_lead_gen_model.md` the lead-gen handoff must stay clean of fee/value-of-fee framing. **Strip both.** Replace with neutral "complex situations (mixed-use, joint ownership, MTD onboarding) are where landlords most often bring in a specialist" framing that routes to the auto-injected LeadForm / discovery-call CTA without any cost/payback language.

**Load-bearing fix sequence (ordered by ROI + severity):**
1. **Delete + replace the Capital Allowances H3** with a RODIL (s.311A) section + the s.35 dwelling-house bar + the narrow common-parts/integral-features exception. (Severity-driven; do this first.)
2. **Add the real box map** (box 5 rents, box 20 total rents/income side, the box 24-29 expenses sub-boxes, **box 26 residential finance costs** for the 20% credit, **box 44 RODIL**, the rent-a-room boxes, the loss boxes) as a snippet-bait table + per-box plain-English guidance + one box-mapped worked example. Verify every box number against the current gov.uk SA105 form + SA105 notes at write time (box numbers change year to year — DO NOT assume prior-year numbers).
3. **Correct the April 2027 framing to enacted** (§7) and **add the reducer-rises-to-22%** point.
4. **Add the missing mechanics:** £1,000 property allowance; cash basis (default) vs accruals; jointly-owned apportionment + Form 17; SA106 cross-link for foreign property.
5. **Strip the pricing/payback framing** (Decision E).
6. **FAQ count 4 -> 12-14**, each targeting a verbatim "sa105 / sa105 box / sa105 finance costs / sa105 losses" intent.
7. **Authority links: 4-6 verified** (gov.uk SA105 form page; SA105 notes PDF; legislation.gov.uk s.311A; s.35; FA 2026 ss.6-7; ITTOIA 2005 s.272).
8. **Meta + h1 rewrite** to lead with the box-level + correctness differentiator.

---

## Competitor URLs (Stage 2 — named for live verification at write per §16.31)

| URL | Expected status | Approx depth | Box numbers? | What to borrow | What to differentiate |
|---|---|---|---|---|---|
| https://selflandlord.com/guides/sa105-form/ | verify 200 | ~4,500w | No | Section ordering + reader hand-holding | We add real box numbers + RODIL correction + enacted 2027 rates |
| https://www.gov.uk/government/publications/self-assessment-uk-property-sa105 | verify 200 | form landing | Form itself | Authoritative box layout (read to confirm current-year box numbers) | We add plain-English mapping + worked example + planning |
| https://assets.publishing.service.gov.uk/media/67ed507de9c76fa33048c6b1/sa105_notes_2025.pdf | verify 200 (this is the 2025 notes; **fetch the current 2026 notes** at write) | official notes | **Yes (definitive)** | The ONLY source with real box numbers — verify our box map against it | We turn bare notes into explanation + corrections + cluster links |
| https://www.taxd.co.uk/blog/landlord-tax-sa105-sa106 | verify 200 | ~2,800w | No | SA105-vs-SA106 split framing (UK vs foreign) -> reinforces our SA106 cross-link | We add box numbers + RODIL + enacted rates |
| https://taxfix.com/en-uk/self-assessment-basics/what-is-the-sa105-form-and-how-to-fill-it/ | verify 200 | consumer | No | Consumer-friendly tone | We add specialist depth + corrections |

**Competitor depth ceiling for this query class:** 2,800-4,500 words of prose, **0 real box numbers** (except the gov.uk notes PDF, which is a bare official document), 0 statute citations, RODIL/s.35 correction absent, April 2027 rates either absent or stated as a future proposal. Our **~3,200-word** target with a **real box-number table + 12-14 FAQs + one box-mapped worked example + 4-6 verified statute citations + the s.35->RODIL correction + enacted §7 rates** is decisively best-in-class, not catch-up. The box table alone is the moat.

**Critical verification discipline:** SA105 box numbers are renumbered between tax years. The 2025 notes PDF above is prior-year. At write time, fetch the **current-year (2025/26) SA105 form and notes from gov.uk** and verify every box number (5, 20, 24-29, 26, 44, the rent-a-room and loss boxes) against that current document. If a box number cannot be confirmed against the current gov.uk form, describe the box by its label and field role rather than asserting a number. Never carry a prior-year box number forward unverified (this is the box-number analogue of the §16.31 / F-37 verify-at-write rule).

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refresh-read at write per §7 / §12).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | sa105-property-income-form-2026-complete-guide | REWRITE | self — rewrite in place; strongest page on the literal SA105 intent |
| Sibling (residual) | how-to-complete-landlord-self-assessment-filing-step-by-step-guide | Google pos ~64.4 (far weaker) | **NOT a collapse target** (collapse-direction rule: never 301 a stronger page into a weaker one). Different job-to-be-done: the WHOLE return (SA100 + payments-on-account + MTD), not SA105 box mechanics. Keep distinct. Add **reciprocal links**: this page forward-links it for the end-to-end SA100 walkthrough; it links DOWN into this page for the SA105 box detail. |
| Sibling (corpus pillar) | landlord-tax-return-complete-guide-2026 | Google pos ~8.2 / Bing 47 impr | **NOT a collapse target.** Broad "landlord tax return" pillar, not form-specific. Keep distinct. This page forward-links it as the pillar; the pillar links DOWN into this page for the SA105 detail. |
| Cluster (dedicated) | replacement-domestic-items-relief-uk-landlords-guide | dedicated RODIL page | **Forward-link, do not duplicate depth.** This page introduces RODIL (s.311A) in the corrected Capital Allowances replacement section and links out for the full mechanics. |
| Cluster (dedicated) | rent-a-room-relief-uk-landlords-lodgers-guide | dedicated RRA page | Forward-link from the rent-a-room boxes paragraph (note: current source mislinks "rent-a-room relief" to the property-investment pillar — FIX this link). |
| Cluster (dedicated) | making-tax-digital-property-income-2026-complete-guide + making-tax-digital-landlords-april-2026-deadline | dedicated MTD pages | Forward-link from the MTD section; keep MTD depth THERE. |
| Cluster (dedicated) | section-24-tax-relief-complete-guide + finance-costs-section-24-complete-guide | dedicated S24 pages | Forward-link from the box 26 (residential finance costs) paragraph. |
| Cluster (dedicated) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework + hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | dedicated CA pages | Forward-link from the s.35 / common-parts exception note (where capital allowances genuinely DO apply). |

**Conclusion:** **REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER on cannibalisation.** This page distinctly owns the "SA105 form / SA105 property income pages" intent and is the strongest page on it; the two nearest siblings own different jobs and rank weaker, so the collapse-direction rule (§16.T2) forbids collapsing this page into either. The differentiation is durable: this page is the **box-by-box form-completion reference**; the step-by-step page is the **end-to-end SA100 filing walkthrough**; the pillar is the **comprehensive landlord-return guide**. Add reciprocal links from both siblings down into this page.

---

## Closest existing pages (Stage 2 — all verified present on disk 2026-05-30)

Internal-link partners (to and from this page):

- **End-to-end filing sibling:** `how-to-complete-landlord-self-assessment-filing-step-by-step-guide` (category: Landlord Tax Essentials) — reciprocal link; this page sends "for the whole SA100 walkthrough, see ..."; that page sends "for SA105 box detail, see this page".
- **Return pillar:** `landlord-tax-return-complete-guide-2026` (Landlord Tax Essentials) — pillar back-link + reciprocal down-link.
- **RODIL (the correction target):** `replacement-domestic-items-relief-uk-landlords-guide` (Section 24 & Tax Relief) — forward-link from the corrected box-44 / RODIL section.
- **Rent-a-room:** `rent-a-room-relief-uk-landlords-lodgers-guide` (Section 24 & Tax Relief) — forward-link from the rent-a-room boxes paragraph (FIX the current mislink that points "rent-a-room relief" anchor text at the property-investment pillar).
- **Section 24 / finance costs (box 26):** `section-24-tax-relief-complete-guide` + `finance-costs-section-24-complete-guide` + `claim-mortgage-interest-rental-property-uk-section-24` — forward-link from the box 26 residential-finance-costs paragraph.
- **MTD:** `making-tax-digital-property-income-2026-complete-guide` + `making-tax-digital-landlords-april-2026-deadline` — forward-link from the MTD section.
- **Capital allowances (where they DO apply):** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` + `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` — forward-link from the s.35 bar / common-parts exception note.
- **2027 rates:** `2027-property-tax-rates-section-24-relief-uk-landlords` + `section-24-2027-tax-year-planning-uk-landlords` — forward-link from the corrected April 2027 paragraph.
- **Foreign property (SA106 is a separate form):** no dedicated on-site SA106 page exists; closest are `mtd-itsa-foreign-property-income-quarterly-reporting-rules` and `non-resident-landlord-self-assessment-filing-requirements`. Cross-link to those internally AND name SA106 with an outbound gov.uk SA106 link for the foreign-property reader (SA105 is UK property only).

---

## House-position references (Stage 1 — cite by §N, verify lock content at write)

- **§5 CGT on UK residential property (2026/27)** [LOCKED] — only incidentally relevant (SA105 is income, not gains); if disposal is mentioned, point to the CGT cluster, do not re-derive rates here.
- **§6 FHL abolition transition** [LOCKED] — FHL abolished 6 April 2025 (FA 2025 c.8 Sch 5). KEEP the page's correct FHL-abolished statement. Use §6 to frame former-FHL property now sitting on standard SA105 residential treatment.
- **§7 April 2027 property income tax rates** [LOCKED 2026-05-30 framing] — **ENACTED** FA 2026 c.11 ss.6-7, RA 18 March 2026, effective 6 April 2027, England + NI; 22/42/47; **reducer rises to 22% per FA 2026 Sch 1** (amending ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B); "no new wedge for basic-rate" framing. Assert as enacted, never "will apply / proposal / draft". **Re-verify Royal Assent + section numbers at legislation.gov.uk at write time per the F-37 Bill-vs-enacted rule** — this is the 14th-catch discipline; do not skip it even though §7 says enacted.
- **§25.7 + §38 Capital allowances / s.35 dwelling-house bar** [LOCKED 2026-05-30, Track 2 batch 4] — **the load-bearing correction.** s.35 bars P&M allowances for plant in a dwelling-house; AIA on furnishings/boilers inside a let dwelling is barred; narrow exception = common parts of a block + integral features (s.33A) in non-dwelling areas. Also: WDA 14% from April 2026 (FA 2026 s.28), special rate 6% unchanged, new 40% FYA (FA 2026 s.29, unincorporated route, ex-cars/second-hand). The page should NOT teach capital allowances depth (that is the CA cluster's job) — it should state the s.35 bar, point furnishings replacement to RODIL, and forward-link the CA pillar for the genuine common-parts/commercial cases.
- **§34 Landlord allowable expenses (ITTOIA 2005 s.272 import gateway)** [LOCKED 2026-05-27] — frames the expense boxes (box 24-29 sub-boxes): trading-income deduction rules apply via s.272; wholly-and-exclusively (s.34 imported); repairs-vs-improvements (revenue-vs-capital) is the gateway. Use §34 to explain the expense boxes correctly.
- **§3 MTD for ITSA** [LOCKED] — £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028) phasing; 6 April 2026 mandate. The page's MTD facts are CORRECT per §3 — keep.

**House position that does NOT yet exist (flag candidate):** there is **no dedicated house position locking RODIL (ITTOIA 2005 s.311A)**, the **£1,000 property allowance (ITTOIA 2005 s.783BA et seq)**, or the **cash-basis default (ITTOIA 2005 s.271D / s.271E)**. The rewrite must verify each directly at legislation.gov.uk at write time and cite the verified section. **Flag to `track2_site_wide_flags.md`:** recommend a future HP lock for RODIL (s.311A) + property allowance + cash-basis default, since multiple SA-deductions-cluster pages will thread them. Track 2 manager cannot lock house positions (deference rule §6) — this is a Wave-N / future-manager lock recommendation only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict #1 (BLOCKING) — WRONG_ADVICE vs §38 / §25.7.** Source "Capital Allowances" H3 asserts residential landlords can claim AIA / 100% relief up to £1m on furniture, furnishings, kitchen appliances, carpets and curtains inside a let dwelling. This is the **exact** do-not-write line in house position §38 ("Landlords can claim AIA on furnishings/boilers inside a let dwelling" — barred by s.35) and contradicts §25.7. **This is the rewrite's first job.** Replace with the s.35 bar + RODIL (s.311A) route + the narrow common-parts/integral-features exception.

> Flag to `track2_site_wide_flags.md`: **F-<n> | 2026-05-30 | HIGH (consumer-protection) | sa105-property-income-form-2026-complete-guide | WRONG_ADVICE | "Capital Allowances" H3 tells residential landlords to claim AIA on furnishings/carpets/curtains inside a let dwelling. Barred by CAA 2001 s.35 (house position §38 / §25.7). Correct mechanism is RODIL (ITTOIA 2005 s.311A), which the page never mentions. Audit candidate: other landlord-essentials / SA-completion pages may carry the same AIA-on-furnishings error — recommend a cluster sweep.**

**CONFIRMED conflict #2 (HIGH) — STALE vs §7.** Source states April 2027 22/42/47 rates as a future "will apply" in two places and omits the reducer rising to 22%. Per §7 these are enacted law (FA 2026 ss.6-7) and the reducer rises to 22% (FA 2026 Sch 1). Same Bill-vs-enacted pattern as F-2/F-5/F-22/F-37. Assert as enacted (after re-verifying Royal Assent at write), add the reducer-22% point.

> Flag to `track2_site_wide_flags.md`: **F-<n> | 2026-05-30 | HIGH | sa105-property-income-form-2026-complete-guide | STALE_FACTS | April 2027 rates stated as future "will apply"; enacted per §7 (FA 2026 ss.6-7, RA 18 March 2026). Reducer-rises-to-22% omitted. Assert enacted + add reducer point.**

**No conflict on:** FHL-abolished statement (correct, §6), Section 24 20% credit for 2026/27 (correct, §4/§7), MTD thresholds + 6 April 2026 mandate (correct, §3). Keep these.

---

## Authority links worth considering (Stage 2 — verify all at write per §16.31 + F-37)

| URL | Verify at write | Use case |
|---|---|---|
| https://www.gov.uk/government/publications/self-assessment-uk-property-sa105 | 200 + read current-year form | Box-number verification (THE source of truth for box numbers) + outbound authority cross-link |
| gov.uk SA105 notes (current 2025/26 PDF — find the live URL at write; the 2025 PDF in the competitor list is prior-year) | 200 + read | Box-number verification + finance-cost / RODIL box confirmation |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | 200 + confirm s.311A operative (RODIL) | RODIL statutory cite (Replacement of Domestic Items) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | 200 + confirm operative wording | s.35 dwelling-house bar cite (the WRONG_ADVICE correction) |
| https://www.legislation.gov.uk/ukpga/2026/11/section/6 + /section/7 | 200 + confirm RA 18 March 2026 + effective 6 April 2027 | FA 2026 ss.6-7 enacted April 2027 rates cite (F-37 discipline) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | 200 | ITTOIA s.272 import gateway for the expense boxes (§34) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/783BA (property allowance) | 200 + confirm £1,000 allowance section | £1,000 property allowance cite (verify exact section) |
| https://www.gov.uk/government/publications/self-assessment-foreign-sa106 | 200 | SA106 foreign-property cross-link (SA105 is UK property only) |

**(Execution session selects 4-6 to actually render as legislation.gov.uk / gov.uk hyperlinks in the body. Every statute section re-verified at legislation.gov.uk at write time, including the FA 2026 Royal Assent date, per the F-37 Bill-vs-enacted rule.)**

---

## Section-by-section content plan to ~3,200 words (11-13 H2s)

Target: **~3,200 body words**, **1 box-number table (snippet-bait, near top)**, **1 box-mapped worked example**, **12-14 FAQs**, **1-3 inline `<aside>` CTAs at conversion moments**, **4-6 authority links**, **reciprocal links to both siblings + forward-links to the dedicated cluster pages**. Raw HTML body (`<p>`, `<h2>`, `<table>`), NO markdown headings in body (memory `blog_page_rendering_html_in_frontmatter.md`). NO em-dashes. NO pricing.

1. **H2: What the SA105 is (and what it is NOT)** (~220w) — SA105 = the UK property supplementary pages of the SA100 self-assessment return. UK property only; **foreign property uses SA106** (cross-link). Position the page against the two siblings: "for the whole return walkthrough see [step-by-step]; for the comprehensive landlord-return guide see [pillar]; this page is your box-by-box SA105 reference." Strip the existing pricing/payback sentence here.
2. **H2: Do you need SA105? (£1,000 property allowance + the thresholds)** (~260w) — who files; the **£1,000 property allowance** (gross rents at or below £1,000 -> no SA105 needed / full relief; verify ITTOIA s.783BA at write); loss-year filing; jointly-owned property still reportable per-owner.
3. **H2: The SA105 box map at a glance (table)** (~260w + table) — **the snippet-bait table.** Columns: Box | What it captures | Plain-English note. Rows for the verified current-year boxes: total rents (box 5), other property income, total rents/income line (box 20 on the income side — verify role), expenses sub-boxes (boxes 24-29: rent/rates/insurance, property repairs, loan interest/finance NOT here, legal/professional, costs of services, other), **residential finance costs (box 26)** for the 20% credit, **RODIL (box 44)**, rent-a-room boxes, loss boxes. **Every box number verified against the current gov.uk SA105 form at write; describe-by-label if unverifiable.**
4. **H2: Income boxes (box 5 and the rents line)** (~240w) — gross rents before deductions; what counts (rent, premiums, parking, retained deposits, lodger income above rent-a-room); cash basis vs accruals (cash basis is the default for most unincorporated landlords under the threshold — verify ITTOIA s.271D/E); 2025/26 tax year 6 Apr 2025-5 Apr 2026.
5. **H2: Expense boxes (boxes 24-29) and the repairs-vs-improvements line** (~300w) — §34 / ITTOIA s.272 import gateway; wholly-and-exclusively; map each expense sub-box; repairs (allowable) vs improvements (capital, not allowable) with the boiler-vs-new-kitchen example; apportionment for part-occupied property. Inline CTA #1 (mixed-use / apportionment complexity).
6. **H2: Box 26 — residential finance costs and the Section 24 credit** (~280w) — mortgage/loan interest is NOT an expense box for residential; goes in the **residential finance costs box (box 26)** for the **20% basic-rate tax credit** (2026/27); HMRC computes the credit; commercial property is outside s.24 and deducts interest as a normal expense. Forward-link the S24 cluster. **Add the enacted April 2027 point here:** from 2027/28 the reducer rises to **22%** (FA 2026 Sch 1) and property income (England + NI) is taxed at **22/42/47** — enacted, not a proposal; basic-rate landlords get no new wedge (reducer tracks 22%).
7. **H2: Replacing furniture, appliances, carpets and curtains — RODIL, not capital allowances (box 44)** (~320w) — **THE CORRECTION SECTION.** State plainly: residential landlords CANNOT claim AIA / capital allowances on furniture, appliances, carpets or curtains inside a let dwelling — **CAA 2001 s.35** bars plant-and-machinery allowances for plant in a dwelling-house. The correct relief is **Replacement of Domestic Items relief (ITTOIA 2005 s.311A)**: a like-for-like replacement deduction (not the first purchase), entered at **box 44**; no allowance for the initial item; betterment is stripped to the like-for-like cost. Where capital allowances DO apply: **common parts** of a block (communal boiler/lift/lighting) and **integral features** (s.33A) in non-dwelling/commercial areas, and commercial/former-FHL property — forward-link the CA pillar + HMO common-parts page for those. Inline CTA #2 (HMO common-parts / commercial mix).
8. **H2: Rent-a-room and lodger income** (~200w) — £7,500 rent-a-room relief (verify); the rent-a-room boxes; election between relief and actual expenses; forward-link the dedicated RRA page (FIX the current mislink). 
9. **H2: Losses — carry forward and the loss boxes** (~220w) — property loss = expenses exceed income; carry forward against future property profits (the default); restrictions on offsetting against other income; the loss boxes; correct the source's vague "first four years of trading" line (property businesses are not trades — verify and reframe).
10. **H2: Jointly-owned property and Form 17** (~200w) — 50/50 default for spouses/civil partners; Form 17 to elect actual beneficial shares; each owner files their share on their own SA105; unmarried co-owners split per beneficial ownership. Forward-link the joint-ownership / Form 17 cluster.
11. **H2: SA105, MTD and digital records** (~220w) — KEEP the correct MTD facts (§3: £50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028; 6 Apr 2026 mandate; quarterly updates; digital records; MTD-compatible software). Forward-link the MTD cluster. Note SA105 box completion still maps to the quarterly + final-declaration data under MTD.
12. **H2: Deadlines and penalties** (~160w) — KEEP (paper 31 Oct 2026, online 31 Jan 2027, payment 31 Jan 2027, £100 late-filing start, interest from 1 Feb 2027). Verify penalty/interest framing.
13. **H2: Getting SA105 right (close)** (~140w) — neutral close; route complex situations (mixed-use, joint ownership, MTD onboarding, former-FHL transition) to the auto-injected LeadForm / discovery-call CTA. **No pricing / payback framing.** Reciprocal link to both siblings.

**FAQ plan (12-14, each verbatim-intent-targeted):** What is box 26 on SA105? / Can I claim mortgage interest as an expense on SA105? (no — box 26, 20% credit) / Can I claim capital allowances on furniture in a residential let? (**no — s.35 bar; RODIL at box 44 instead**) / What is box 44 on SA105? / Do I need SA105 if I earn under £1,000? (property allowance) / Cash basis or accruals for SA105? / How do I report jointly-owned property on SA105? / What goes in the expense boxes 24-29? / How do I report a property loss on SA105? / Do former holiday lets still use SA105? (yes, post-FHL-abolition) / Does SA105 cover foreign property? (no — SA106) / What are the SA105 2026 deadlines? / How does MTD change SA105? / Are the April 2027 property rates on SA105 confirmed? (yes — enacted FA 2026). Keep FAQ count = frontmatter `faqs:` length (six-check).

---

## Statute / box spine (every cite verified at legislation.gov.uk + current gov.uk SA105 form at write)

**Statute:**
- **CAA 2001 s.35** — dwelling-house bar on plant-and-machinery allowances (the WRONG_ADVICE correction). [§38 / §25.7]
- **CAA 2001 s.33A** — integral features (the narrow non-dwelling exception). [§38]
- **ITTOIA 2005 s.311A** — Replacement of Domestic Items relief (RODIL), the correct furnishings mechanism. [no HP lock yet — verify + flag]
- **ITTOIA 2005 s.272** — import of trading-income deduction rules into property business (the expense-box gateway). [§34]
- **ITTOIA 2005 s.34** (imported) — wholly-and-exclusively. [§34]
- **ITTOIA 2005 s.271D / s.271E** — cash basis default / GAAP for property businesses (verify exact sections at write). [no HP lock — verify]
- **ITTOIA 2005 s.783BA** (and the property-allowance group) — £1,000 property allowance (verify exact section at write). [no HP lock — verify]
- **FA 2026 c.11 ss.6-7** — enacted separate property income rates (22/42/47), effective 6 April 2027, England + NI; RA 18 March 2026. [§7] **Re-verify RA date at write (F-37).**
- **FA 2026 c.11 Sch 1** — Section 24 reducer rises to 22% for 2027/28 (amending ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B). [§7]
- **FA 2025 c.8 Sch 5** — FHL abolition from 6 April 2025. [§6 / §25]
- **ITTOIA 2005 ss.274A-274C / ITA 2007 s.399B** — Section 24 finance-cost reducer mechanism (the box-26 / 20% credit). [§4 / §7]

**SA105 boxes (verify EVERY number against the current-year gov.uk SA105 form + notes at write; describe-by-label if unconfirmable — box numbers are renumbered year to year):**
- box 5 — total rents (income)
- box 20 — total rents / income line (verify exact role + number on the current form)
- boxes 24-29 — expense sub-boxes (rent/rates/insurance/ground rent; property repairs & maintenance; legal/management/professional; costs of services; other allowable expenses)
- **box 26 — residential property finance costs** (the 20% credit pool; NOT a deductible expense)
- **box 44 — Replacement of Domestic Items relief (RODIL)**
- rent-a-room boxes (verify numbers)
- loss boxes (loss brought forward / loss to carry forward / loss set against total income — verify numbers)

---

## Competitor depth benchmark (summary)

| Source | Words | Real box numbers | Statute cites | s.35->RODIL correction | April 2027 enacted | Worked example |
|---|---|---|---|---|---|---|
| SelfLandlord | ~4,500 | No | 0 | No | No | Light |
| Taxd | ~2,800 | No | 0 | No | No | Light |
| Taxfix | consumer | No | 0 | No | No | Light |
| gov.uk SA105 notes PDF | official | **Yes** (bare) | n/a | No editorial | n/a | No |
| **This rewrite (target)** | **~3,200** | **Yes (verified, explained)** | **4-6** | **Yes** | **Yes** | **Yes (box-mapped)** |

**Differentiation moat:** real, verified, plain-English-explained box numbers + the s.35->RODIL correction + enacted April 2027 rates. No SERP competitor combines all three; the gov.uk notes PDF has box numbers but no explanation, correction editorial, or planning.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (target, lead with box-level + year, <= 60 chars):**
  - Candidate A: `SA105 2025/26 Property Income Form | Box-by-Box Guide` (53)
  - Candidate B: `SA105 Form 2026: Every Box Explained for UK Landlords` (53)
  - Recommend Candidate B (leads with the form + year + the box-level differentiator + audience; matches the "sa105 form 2026" Bing pos-6 query verbatim). Test against the highest-impression Bing/GSC query order at write.
- **metaDescription (<= 158 chars; box + correction + neutral CTA, no pricing):**
  - `Complete the SA105 property pages box by box: rents (box 5), expenses (24-29), finance costs (box 26), RODIL (box 44) and losses, with worked examples.` (~150)
- **h1 (keep audience + form + year, distinct from metaTitle):**
  - `SA105 Property Income Form (2025/26): A Box-by-Box Guide for UK Landlords`

(metaTitle must be <= 62 chars, metaDescription <= 158 chars at six-check. Update `dateModified` to write date; preserve slug + canonical + category.)

---

## Universal rules (do not skip)

(Inherited per TRACK2_PROGRAM §4 sections 13 + 14 — `NETNEW_PROGRAM.md §4` voice + `competitor_rewrite_playbook.md §5`. Critical for THIS brief: **NO em-dashes** (commas/parentheses/full stops/middle dots); **NO pricing or fee/value-of-fee/payback framing** (strip the two existing pricing-leak passages per Decision E); **anonymised social proof only, no real client names**; raw HTML body, no markdown headings, no Tailwind classes; LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; FAQ schema auto-emitted from frontmatter `faqs:` — never hand-add FAQ schema in body; **every statute + box number verified at write (legislation.gov.uk + current gov.uk SA105 form), including FA 2026 Royal Assent per F-37**.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `house_positions.md` §5, §6, §7, §25.7, §34, §38 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting).
3. Read this brief end-to-end.
4. **Fetch the current-year gov.uk SA105 form + SA105 notes and verify EVERY box number** (5, 20, 24-29, 26, 44, rent-a-room, loss). This is the load-bearing pre-rewrite step. Describe-by-label any box you cannot confirm.
5. **Verify the statute spine at legislation.gov.uk:** s.35, s.311A, s.272, FA 2026 ss.6-7 + Sch 1 (confirm RA 18 March 2026 per F-37), property allowance section, cash-basis sections.
6. Re-fetch the 5 competitor URLs to confirm liveness (httpx + proper User-Agent); replace any non-200.
7. Read the current source file in full + the two sibling pages + the RODIL / rent-a-room / MTD / S24 / CA-pillar pages for accurate forward-link anchors.
8. Plan the rewrite outline: 11-13 H2s, ~3,200 body words, 12-14 FAQs, box-number table near top, 1 box-mapped worked example, 1-3 inline CTAs.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + category; update `dateModified` to today; rewrite metaTitle + metaDescription + h1 per the plan. **Delete the Capital Allowances H3 entirely; insert the RODIL/s.35 section.** Correct the April 2027 framing to enacted + add reducer-22%. Strip both pricing/payback passages. Fix the rent-a-room mislink.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0 (`grep -c "—"` = 0); Tailwind class count = 0; metaTitle <= 62 chars; metaDescription <= 158 chars; all internal links resolve; **pricing check** (`grep -E '£[0-9]'` returns only the legitimate £1,000 allowance / £7,500 RRA / £50k MTD figures, NO fee/payback lines); **box-number check** (every box number in body matches the verified current-year gov.uk form).
12. Confirm no redirect needed (none — slug kept; this is the stronger page; collapse-direction rule forbids redirecting it).
13. Update `monitored_pages` Supabase row (insert if absent; window from rewrite date; this page is a WRONG_ADVICE correction so monitor closely for ranking + any HMRC-feedback signal).
14. Commit on a branch: `Track 2: rewrite sa105-property-income-form-2026-complete-guide (s.35->RODIL wrong-advice fix + box-by-box + enacted 2027 rates)`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Append the two flags (WRONG_ADVICE + STALE) and the RODIL/property-allowance/cash-basis HP-lock recommendation to `track2_site_wide_flags.md`.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (AIA-on-furnishings cluster-sweep candidate; box-number verify-at-write discipline as a new cluster lesson).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Box-number verification (against current-year gov.uk SA105 form)
- box 5 (rents): __  box 20: __  boxes 24-29 (expenses): __  box 26 (residential finance costs): __  box 44 (RODIL): __  rent-a-room boxes: __  loss boxes: __

### House-position alignment
- §38 / §25.7 s.35 bar correction applied (Capital Allowances H3 deleted, RODIL inserted): __
- §7 April 2027 enacted + reducer-22% added; RA date re-verified: __
- §6 FHL-abolished statement kept: __
- §34 / s.272 expense-box framing: __
- §3 MTD facts kept: __

### Statute verification (legislation.gov.uk at write)
- s.35 operative: __  s.311A (RODIL) operative: __  s.272: __  FA 2026 ss.6-7 + Sch 1 (RA 18 Mar 2026): __  property allowance section: __  cash-basis sections: __

### Comparison: before vs after
- Word count: 1,195 -> __  H2 count: 8 -> __  FAQ count: 4 -> __  Authority links: 0 -> __  Inline CTAs: 0 -> __  Box-number table: 0 -> 1  Box-mapped worked example: 0 -> 1
- Pricing/payback passages stripped (2): __  Rent-a-room mislink fixed: __

### Flags raised
- WRONG_ADVICE (s.35/RODIL) — recorded: __
- STALE (§7 April 2027) — recorded: __
- RODIL / property-allowance / cash-basis HP-lock recommendation logged: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
