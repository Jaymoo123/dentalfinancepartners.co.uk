# Track 2 brief: accounting-services-for-property-owners

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief
**Source markdown path:** `Property/web/content/blog/accounting-services-for-property-owners.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-accountant-services/accounting-services-for-property-owners
**Stage 1 priority:** **H** (exact-match query "accounting services for property owners" already at pos 9.0; whole landlord-accounting query cluster sits invisible at pos 26-54 with a clean, distinct intent this page owns; biggest lever is depth + a pricing-leak fix the diagnosis flagged HIGH)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (GSC cluster positions + source markdown read + house_positions threaded + live-corpus internal-link slugs verified on disk)
**Cannibalisation status:** REWRITE (no collapse — confirmed by the diagnosis equity check; this page holds the best cluster positions on its own query universe)

> This is a gold-reference depth-match brief. It mirrors `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (depth) and `briefs/property/track2/trial/birmingham-property-accountant.md` (pricing-leak fix pattern). Every statute citation below is to be re-verified against legislation.gov.uk at write time, including any Finance Act Royal Assent date (the F-37 Bill-vs-enacted pattern).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `accounting-services-for-property-owners`. It is the exact-match slug for the strongest query in the cluster ("accounting services for property owners", pos 9.0) and carries the "services / what work is done for me" intent. No redirect proposed.
- **Category:** `Property Accountant Services` (kept; URL segment `property-accountant-services`).
- **Gap-mode tag:** `INVISIBLE` (primary — whole cluster at pos 26-54, 0 clicks) + `THIN_DEPTH` (secondary — 1,418 words vs ~2,500-3,000 competitor floor) + `PRICING_LEAK` (HIGH, F-1 pattern) + `STALE_FACTS` (MTD £20k step missing; no FA 2026 22/42/47 property-income framing) + `STRUCTURE` (4 FAQs vs 12-14 target; 0 inline CTAs; stale aka.hmrc link).
- **"Why this rewrite" angle:** This is the landlord-facing "what your accountant actually does for you, end to end" services-and-process page. It is the strongest page in a 4-page near-duplicated services cluster on its own queries, but the whole cluster is invisible on Google. The rewrite does three jobs in priority order: (1) strip the pricing leak (frontmatter FAQ #3 quotes £200-£400 / £1,000-£3,000; body "How Much Do Property Accounting Services Cost?" H2 also leaks soft fee language "a few hundred pounds / several thousand") and replace with a how-charging-works explainer that forward-links to `how-much-does-a-property-accountant-cost` with NO numbers; (2) fix the CGT 60-day scope error (body §4 currently says "report the disposal to HMRC within 60 days if you are a non-resident" — wrong; per §5 / §17.4 the 60-day UK-property CGT return applies to ALL chargeable residential disposals by individuals where tax is due, resident and non-resident; non-residents file on every disposal regardless of tax due); (3) deepen from 1,418 to ~3,200 words by expanding the 8 service areas into a genuine end-to-end engagement narrative (onboarding, records-to-provide, the annual cycle, the 8 service areas applied) with anonymised worked vignettes, an FA 2026 property-income-rate update, the full three-step MTD threshold ladder, and 12-14 FAQs that mirror the cluster's zero-click queries verbatim. The page must stay distinct from its three siblings (see cannibalisation block) by owning the "process + scope of work delivered" angle, not the role-definition, BTL-scope, or cost angles.

---

## Current page snapshot (Stage 2 — source markdown read 2026-05-30)

**Filesystem source read (`Property/web/content/blog/accounting-services-for-property-owners.md`):**
- **Word count:** ~1,418 body words (per diagnosis; confirmed thin against the ~2,500-3,000 competitor floor).
- **H2 / H3 outline (11 headings):**
  1. H2 Why Property Accounting Is Different from General Accounting
  2. H2 Core Services Included in Accounting for Property Owners (with eight H3s: 1 Rental Income/Expense Tracking, 2 Self Assessment SA105, 3 Section 24, 4 CGT Planning and Reporting, 5 MTD Compliance, 6 Limited Company + CT, 7 VAT, 8 Tax Planning and Strategy)
  3. H2 What Accounting Services Do Not Typically Include
  4. H2 How Much Do Property Accounting Services Cost? (**pricing-leak H2 — soft fee language**)
  5. H2 How to Choose a Property Accountant
  6. H2 What to Expect When You Engage a Property Accountant
  7. H2 The Bottom Line
  8. H2 Sources
- **metaTitle:** "Accounting Services for Property Owners: What You Get" (52 chars; generic, no differentiator, no number-bait).
- **metaDescription:** "Discover what accounting services for property owners include, from tax returns to MTD compliance. Practical guide for UK landlords." (130 chars; bland, no specific hook).
- **h1:** "What Do Accounting Services for Property Owners Actually Cover?" (kept-shape, fine).
- **FAQ count (frontmatter `faqs:` array):** 4 (target 12-14). FAQ #3 is the pricing leak.
- **Outbound authority links:** 3 (gov.uk rental-income guidance [ref-1, good], icaew.com MTD/jointly-owned [ref-2, good], **aka.hmrc.gov.uk start-up redirect [ref-3, stale — replace]**).
- **Inline CTAs:** 0 (`<aside>` count = 0).
- **Internal links:** 6 (Section 24 guide, CGT complete guide, MTD guide, BTL ltd-co guide, how-much-cost, how-to-choose) + 3 site routes (/services, /contact, /calculators).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit:** `dateModified: 2026-05-20`.

**Body prose is otherwise clean on figures** (no invented fees in prose other than the soft-cost H2): legit statutory figures only — £3,000 AEA, £50k/£30k MTD, £50k-£250k CT bands, 18%/24% CGT, 20% S24 credit, FHL abolished April 2025, CT 19%/25%. All of those are CORRECT and must be PRESERVED (just deepened), with the two exceptions in the gap-mode diagnosis (CGT 60-day scope + missing FA 2026 / £20k MTD step).

---

## GSC angle (last 90 days) — cluster positioning from diagnosis

**Aggregate for THIS page:** 33 impressions / 0 clicks / pos 42.5 / 13 distinct queries (90-day window). Invisible — page-3-to-page-6 on most cluster queries, 0 clicks.

**Query universe this page owns (the "services / what work is done for me" intent):**

| query | avg pos | note |
|---|---|---|
| accounting services for property owners | 9.0 | **exact-match slug; strongest position; closest to page-1** |
| landlord accounting services | 26.5 | core commercial query |
| accounting for landlords | 35.9 | high-volume head term |
| accounting for property tax | 29.5 | tax-scoped variant |
| landlord accounting | 54.1 | broad head term, deep position |

**Pattern analysis:**
- **No AI-Overview / gov.uk-explicit loss class here** (unlike the cgt-rates gold-reference, where ~25% of impressions were irrecoverable gov.uk-explicit intent). This is a commercial "find me an accountant / understand the service" intent that gov.uk does not satisfy — so the depth + relevance lift can realistically move position, not just CTR.
- The exact-match query already sits at pos 9.0 (bottom of page 1 / top page 2). A depth + freshness + structure lift is the lever to push it onto page 1 and to lift the pos 26-54 head terms toward page 1-2.
- **Realistic post-rewrite target:** move "accounting services for property owners" from pos 9 to page-1 top-half; pull "landlord accounting services" / "accounting for landlords" from pos 26-36 toward pos 10-20; first clicks within 60-90 days (page currently 0 clicks). Verify via `monitored_pages` at +30/+60/+90 days.

**GA4 engagement signal:** not separately pulled at brief time (Bing data is EMPTY for this URL — no Bing equity to protect; the REWRITE-vs-collapse call rests purely on Google cluster positioning, REWRITE confirmed). Execution session pulls `ga4_page_data` for this slug at write time and records baseline.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INVISIBLE.** The entire landlord-accounting query cluster sits at pos 26-54 with 0 clicks, except the exact-match slug at pos 9. The page is structurally too thin and too undifferentiated to rank where the commercial intent lives. Unlike a CTR-fail page (good position, bad title), this page needs position movement, which means depth + relevance + freshness.

**Secondary: THIN_DEPTH.** 1,418 words against a ~2,500-3,000 word specialist-competitor floor (lanop, ukpropertyaccountants, fusionaccountants, taxassist, uklandlordtax). The 8 service areas are listed but not *applied* — each is one short paragraph. The page reads as a brochure, not as the definitive "here is exactly what your property accountant does for you, step by step, across the tax year" resource.

**Tertiary: PRICING_LEAK (HIGH, F-1 pattern).** Two leaks:
1. Frontmatter FAQ #3 "How much does a property accountant cost in the UK?" quotes "£200-£400" and "£1,000-£3,000". Direct violation of the lead-gen handoff no-pricing rule (`agency_lead_gen_model.md` / Decision E / §13).
2. Body H2 "How Much Do Property Accounting Services Cost?" leaks soft fee language ("a few hundred pounds per year", "could pay several thousand"). Per **Decision E**, even soft general-market fee ranges are a pricing leak. Strip both. Replace with a how-charging-works explainer (fixed-fee vs hourly vs portfolio-tiered, what drives scope, what to ask) that forward-links to `how-much-does-a-property-accountant-cost` and quotes NO numbers.

**Quaternary: STALE_FACTS.** (a) CGT 60-day scope ERROR — body §4 says "report the disposal to HMRC within 60 days if you are a non-resident", which wrongly implies the 60-day rule is non-resident-only. Per §5 + §17.4: UK residents file the 60-day UK-property CGT return where CGT is due; non-residents file on EVERY UK land disposal regardless of tax due. Fix. (b) MTD section omits the £20k April 2028 step (§3 / §19.1 has all three). (c) No FA 2026 April-2027 22%/42%/47% property-income-rate framing and no §4-reducer-rises-to-22%-no-new-wedge point (§7, FA 2026 c.11 ss.6-7, Royal Assent 18 March 2026 — assert as enacted law with citation, do NOT hedge as Bill-form). (d) Section 24 "since April 2020" framing on the 20% credit is fine for 2026/27 but must note the reducer rises to 22% from 2027/28 (§4 / §7).

**STALE/CITATION watch (MEDIUM, F-37 pattern) — Renters' Rights Act:** body line 85 asserts "Renters' Rights Act 2025 (commencement 1 May 2026 per SI 2026/421, abolishing Section 21)". Good news: §20.12 [LOCKED 2026-05-22, verified against legislation.gov.uk] CONFIRMS RRA 2025 (2025 c. 26, Royal Assent 27 Oct 2025), SI 2026/421 (Commencement No. 2), appointed day 1 May 2026, s.21 abolition in force from that date — so the SI number IS verified, not unverified as the diagnosis feared. BUT the RRA is borderline scope-creep on an accounting-services page. **Decision: keep only a single tightly-framed sentence** under the Tax Planning service area, framing it as "your accountant models the cash-flow and Section 24 (§4) interaction of the post-1-May-2026 periodic-tenancy / rent-increase regime" (the §20.11 tax-implications angle), NOT a tenancy-law explainer. Re-verify §20.12 at write time; if a later SI has superseded SI 2026/421, update.

**Load-bearing fix sequence (ordered by ROI):**
1. **Strip both pricing leaks** (FAQ #3 + the soft-cost H2). Replace with a how-charging-works explainer that forward-links to `how-much-does-a-property-accountant-cost`, NO numbers. This is the HIGH-severity house-norm fix and ships first.
2. **Fix the CGT 60-day scope error** (§5 / §17.4) — a reader-misleading factual error on a tax-compliance page.
3. **Body lift 1,418 → ~3,200 words** by reframing from "list of 8 services" to "end-to-end engagement: onboarding -> records you provide -> the annual cycle -> the 8 service areas applied", with 2-3 anonymised vignettes (no real names, no fees).
4. **Add the FA 2026 property-income update** (22/42/47 from 6 April 2027, England + Wales + NI, Scotland carved out; reducer rises 20% -> 22%, no new wedge) per §7, asserted as enacted law with FA 2026 citation.
5. **Complete the MTD ladder** (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028) per §3 / §19.1, plus the gross-income test (§19.2) and joint-owner share test (§19.4).
6. **FAQ count 4 -> 12-14**, each FAQ targeting a cluster zero-click query verbatim (lead FAQs on "accounting for landlords", "landlord accounting services", "what's included", "do I need a specialist", "records to provide", "charging" [no numbers]).
7. **2 inline `<aside>` CTAs** at conversion moments (after the records/onboarding section; after the CGT/incorporation section).
8. **Authority links: replace the stale `aka.hmrc.gov.uk` redirect** with a live gov.uk/HMRC equivalent; add 2-3 statutory citations (ITTOIA 2005 s.272 / s.272A; TCGA 1992 s.1A + Sch 1A; ICAEW MTD reference retained). Target 4-6 outbound authority links.
9. **metaTitle / metaDescription rewrite** leading with the highest-impression head terms ("accounting for landlords" / "landlord accounting services") plus a scope-and-process differentiator.

---

## Competitor URLs (Stage 2 — verify live + status-check + date-stamp at WRITE TIME per §16.31)

| URL | Expected status | Approx words | FAQs | What to borrow | What to differentiate against |
|---|---|---|---|---|---|
| https://lanop.co.uk/landlords-accounting-in-uk/ | verify 200 | ~2,500-3,000 | 5 | 8-heading service structure (SA returns, CT returns, rental accounts, bookkeeping, tax planning, CGT, FHL, exit+IHT); free-consult-only CTA, no pricing (mirrors our model) | They list services; we own the end-to-end *process + applied vignettes* angle; we go deeper on FA 2026 / MTD ladder / CGT 60-day |
| https://www.ukpropertyaccountants.co.uk/ | verify 200 | service hub | varies | ACCA/CIOT specialist framing; SERP leader for the services intent; breadth of property-tax service taxonomy | Hub page, not a single deep guide; we beat it on a single-URL depth + statute citations + FAQ count |
| https://www.taxassist.co.uk/who-we-help/landlords | verify 200 | national-firm page | few | Plain-English "what we do for landlords" framing for a non-expert reader | National generalist; we differentiate on property-tax specialism depth (S24, FHL abolition, MTD, FA 2026) |
| https://www.fusionaccountants.co.uk/property-accountants/ | verify 200 | London services page | few | London landlord service framing | Geo-narrow; we are national + statute-anchored |
| https://uklandlordtax.co.uk/ | verify 200 | specialist hub | varies | Recurring Track 2 competitor; specialist property-tax-accountant taxonomy | Hub, not a single deep services guide; we beat on FAQ depth + worked engagement narrative |

**Competitor depth ceiling for this query class:** ~2,500-3,000 words, 0-5 FAQs, ~0 statute citations, no FA 2026 / no MTD £20k step / no CGT 60-day precision, all pricing-free (consult-CTA model). Our ~3,200-word target with 12-14 FAQs + 4-6 verified authority links + FA 2026 + full MTD ladder + correct CGT 60-day scope + 2-3 anonymised engagement vignettes puts us decisively best-in-class, not catch-up.

**WebFetch note (F-36 carry-forward):** if WebFetch returns permission denials on any URL, carry forward the named-source-with-stamp discipline and flag for a manager 5% sample re-check at quality-gate close. Reject any URL returning non-200 and substitute from `briefs/property/_sitemap_cache_v2/` + `competitor_serps`.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the latest in-place refresh at execution; cluster reasoning below is per §16.18 semantic reasoning, not Jaccard).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | accounting-services-for-property-owners | REWRITE | self — rewrite in place; owns the "services / process / what work is done for me" intent |
| Sibling (rewritten 2026-05-21) | what-does-a-property-accountant-do | ROLE / DEFINITION intent | **No collapse.** Equity guard: it ranks WORSE (pos 76.5 "property accountant", 74.5 "property accounting") and never appears on the "landlord accounting" cluster. Collapsing THIS into it would be a reversed-equity move (weaker-position target) and the guard would reject it. Forward-link to it for the role definition; it links back here for "what the service covers". |
| Sibling (residual) | buy-to-let-accountants-near-me-guide | BTL-specific / near-me intent | No collision — BTL scope + near-me geo intent. Forward-link from the "do I need a specialist" FAQ. (Diagnosis named `what-services-buy-to-let-accountant`, which does NOT exist on disk; the live equivalent is `buy-to-let-accountants-near-me-guide` — see flag F-NEW below.) |
| Sibling (rewritten 2026-05-21) | how-much-does-a-property-accountant-cost | COST intent | No collision — this is where the stripped pricing FAQ + soft-cost H2 redirect the reader. Forward-link from the how-charging-works explainer FAQ. |
| Sibling (residual) | how-to-choose-a-property-accountant | SELECTION intent | No collision — selection criteria. Forward-link from the "How to Choose" section (already linked; keep). |
| Sibling (residual) | property-accountant-near-me | NEAR-ME geo intent | No collision — geo intent. Optional forward-link. |
| Pillar (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar | No collision — pillar covers CGT policy; this page references CGT briefly + forward-links from §4 service area. |
| Pillar (rewritten 2026-05-21) | buy-to-let-limited-company-complete-guide-uk | Incorporation pillar | No collision — references incorporation briefly + forward-links from §6 service area. |
| Pillar (residual) | section-24-mortgage-interest-restriction-uk-landlords | S24 pillar | No collision — references S24 briefly + forward-links from §3 service area. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. The 4-page services cluster (this + `what-does-a-property-accountant-do` + `buy-to-let-accountants-near-me-guide` + the cost/choose pages) is internally near-duplicated and broadly invisible on Google (pos 9-77); a **future cluster-level consolidation audit is warranted** (raise as a flag), but NOT a unilateral collapse now — this page holds the best cluster positions on its own target queries and a reversed-equity collapse would be rejected by the guard.

---

## Closest existing pages (Stage 2 — slugs + categories verified on disk 2026-05-30)

URL pattern is `/blog/<category-slug>/<slug>` (lowercase-hyphenated category). Internal-link partners to and from this page:

- **Role sibling:** `/blog/property-accountant-services/what-does-a-property-accountant-do` — forward-link from the intro ("for the role itself, see ...") + reciprocal back-link.
- **Cost sibling:** `/blog/property-accountant-services/how-much-does-a-property-accountant-cost` — forward-link from the how-charging-works FAQ (replaces the stripped pricing FAQ).
- **Selection sibling:** `/blog/property-accountant-services/how-to-choose-a-property-accountant` — keep existing link from "How to Choose".
- **BTL/near-me sibling:** `/blog/property-accountant-services/buy-to-let-accountants-near-me-guide` — forward-link from the "do I need a specialist" FAQ.
- **Section 24 applied (rewritten):** `/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24` — **NOTE:** the current page links to `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`; verify the live URL category segment at write time (frontmatter category "Section 24 & Tax Relief"). Forward-link from §3 service area.
- **Section 24 pillar:** `/blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords` — alternative/additional S24 forward-link.
- **CGT pillar (rewritten):** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` — forward-link from §4 service area (already present; keep).
- **CGT 60-day deadlines (rewritten):** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` — forward-link from the corrected §4 CGT 60-day paragraph.
- **PRR relief:** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` — forward-link from §4 where PRR is mentioned.
- **MTD guide (rewritten):** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — **NOTE:** current page links to `/blog/making-tax-digital-mtd/...`; frontmatter category is "Making Tax Digital (MTD)" — verify the exact URL category segment at write time. Forward-link from §5 service area (keep).
- **BTL ltd-co pillar (rewritten):** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — forward-link from §6 service area (already present; keep).
- **FA 2026 / 2027 rates (rewritten pillar):** `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk` — forward-link from the new FA 2026 property-income paragraph.
- **Landlord changes overview (residual):** `/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide` — optional forward-link from the Tax Planning service area.
- **Site routes:** `/services`, `/contact`, `/calculators` — keep (LeadForm is auto-injected by `BlogPostRenderer.tsx`; do not duplicate it).

---

## House-position references (Stage 1 — cite §N, never paraphrase; re-confirm lock dates at write time)

- **§3 MTD ITSA** [LOCKED] + **§19.1 mandate timeline** / **§19.2 qualifying-income gross test** / **§19.4 joint-owner share test** [LOCKED 2026-05-22, verified gov.uk] — MTD threshold ladder £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028); limited companies OUT; gross-income test; joint owners test share-of-gross. Current page has £50k + £30k only — ADD the £20k 2028 step.
- **§4 Section 24** [LOCKED] — 20% basic-rate finance-cost tax credit for 2026/27; three-part cap; carries forward; applies to individuals/partnerships/trusts not companies; reducer RISES to **22%** from 2027/28 (FA 2026 Sch 1 amending ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B), no new basic-rate wedge. Current page says "20%" only — ADD the 22% from-2027/28 point.
- **§5 CGT on UK residential property 2026/27** [LOCKED] — 18% basic / 24% higher (from 30 Oct 2024); £3,000 AEA; **60-day UK-property CGT return where CGT is due for UK residents**, every disposal for non-residents. Current page MIS-STATES the 60-day scope as non-resident-only — FIX.
- **§6 FHL abolition** [LOCKED] — abolished 6 April 2025; former-FHL now standard residential. Current page correct ("abolished from April 2025") — preserve.
- **§7 April 2027 property income surcharge** [LOCKED 2026-05-30, FA 2026 c.11 ss.6-7 Royal Assent 18 March 2026] — 22% basic / 42% higher / 47% additional from 6 April 2027; England + Wales + NI (Scotland carved out); reducer at 22%, no new wedge. **Assert as enacted law with FA 2026 citation; do NOT hedge as Bill-form** (F-37 discipline — verify Royal Assent against legislation.gov.uk at write time). Current page has NO FA 2026 framing — ADD.
- **§17.4 NRCGT** [LOCKED 2026-05-22, verified gov.uk] — TCGA 1992 s.1A + Sch 1A/1B/4AA (rewritten by FA 2019; do NOT cite the repealed ss.14B-14H); non-residents file the 60-day return on EVERY UK land disposal regardless of tax due. Use to correct the §4 CGT scope error.
- **§12 / §20.11 / §20.12 Renters' Rights Act 2025** [LOCKED 2026-05-22, verified legislation.gov.uk] — RRA 2025 (2025 c. 26), SI 2026/421 appointed day 1 May 2026, s.21 abolition + periodic-tenancy default in force. Keep ONE tightly-framed sentence via the §20.11 tax-implications angle only. Re-verify SI at write time.
- **§21.4 CT rates 2026/27** [LOCKED 2026-05-23, confirmed gov.uk] — 19% small profits (≤£50k), 25% main (≥£250k), marginal relief £50k-£250k. Current page correct — preserve.
- **§13 do-not-write list** [LOCKED] — NO pricing/fees (incl. soft general-market ranges per Decision E); NO real client names; NO em-dashes; anonymised personas only; no invented £ figures purporting to be HMRC data. Pricing-leak strip is governed here.
- **§14 things to flag** [LOCKED] — flag (do not unilaterally decide) any named-software endorsement, proprietary-data implication, or cluster-cannibalisation. (See the cluster-consolidation flag below.)

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict 1 — PRICING LEAK (HIGH, F-1 pattern, §13 / Decision E).** Frontmatter FAQ #3 quotes "£200-£400" and "£1,000-£3,000"; body H2 "How Much Do Property Accounting Services Cost?" leaks "a few hundred pounds" / "several thousand". Both violate the lead-gen handoff no-pricing rule. Flag to `track2_site_wide_flags.md` and STRIP at rewrite (FAQ replaced with a numberless how-charging-works explainer forward-linking to `how-much-does-a-property-accountant-cost`; the cost H2 reframed to "How property accountants typically structure their fees" with no figures).

**CONFIRMED conflict 2 — FACTUAL ERROR, CGT 60-day scope (MEDIUM, §5 / §17.4).** Body §4 says "report the disposal to HMRC within 60 days if you are a non-resident", implying the 60-day rule is non-resident-only. WRONG. Per §5: UK residents must file + pay within 60 days of completion **where CGT is due**; per §17.4: non-residents file on **every** UK land disposal regardless of tax due. FIX at rewrite. Flag to `track2_site_wide_flags.md` (reader-misleading on a compliance page; check whether the same mis-scoping appears on sibling services-cluster pages at the cluster audit).

**WATCH 3 — STALE/CITATION (MEDIUM, F-37 pattern).** The RRA "SI 2026/421 / 1 May 2026" reference is CONFIRMED by §20.12 (not unverified as the diagnosis feared) but is scope-creep; trim to one §20.11-framed sentence. The MTD £20k step omission + missing FA 2026 22/42/47 framing are STALE_FACTS to correct (not conflicts with locked positions, just gaps against them).

**FLAG-MANAGER (cluster audit, §14).** The 4-page services cluster (this + `what-does-a-property-accountant-do` + `buy-to-let-accountants-near-me-guide` + `how-much/how-to-choose`) is internally near-duplicated and broadly invisible on Google. Recommend a future cluster-level consolidation audit. NOT a unilateral collapse now.

**FLAG-NEW (brief-input drift).** The diagnosis named two cluster siblings that do NOT exist on disk: `what-services-buy-to-let-accountant` and `accountant-bookkeeping-services`. The live equivalents are `buy-to-let-accountants-near-me-guide` and (no bookkeeping-services page exists in this cluster). Internal-link plan above uses only verified on-disk slugs. Flag so the cannibalisation index / diagnosis source is corrected.

---

## Authority links worth considering (Stage 2 — verify all at WRITE TIME; select 4-6 to cite)

| URL / citation | Verification note | Use case |
|---|---|---|
| https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income | retained from current ref-1 (verify 200) | Rental income + allowable expenses + record-keeping |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | verify 200 | ITTOIA 2005 s.272 (profits of a UK property business computed like trade profits) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272A | verify 200 | ITTOIA 2005 s.272A (finance-cost restriction landing point — Section 24 statutory hook) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1A | verify 200 | TCGA 1992 s.1A (NRCGT charging provision, post-FA-2019 rewrite — for the corrected 60-day scope para). Do NOT cite repealed ss.14B-14H. |
| https://www.gov.uk/capital-gains-tax/rates | verify 200 | gov.uk CGT rates + £3k AEA cross-reference (controlled link-out) |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual | verify 200 | HMRC PIM (property income) |
| https://www.gov.uk/government/publications/finance-bill-2026 (or the enacted FA 2026 c.11 page on legislation.gov.uk) | **verify Royal Assent date 18 March 2026 at write time (F-37)** | FA 2026 ss.6-7 property-income 22/42/47 + Sch 1 reducer-at-22% citation |
| https://www.icaew.com/insights/tax-news/2025/jan-2025/update-on-making-tax-digital-and-jointly-owned-property | retained from current ref-2 (verify 200) | MTD + jointly-owned property |
| https://www.legislation.gov.uk/ukpga/2025/26/contents + SI 2026/421 | verify 200 (§20.12 source) | RRA commencement (one-sentence reference only) |
| **REPLACE:** ~~http://aka.hmrc.gov.uk/ct/getting-started/new-company/start-up.htm~~ | **stale redirect — REMOVE** | replace with https://www.gov.uk/limited-company-formation or https://www.gov.uk/corporation-tax (verify 200) for the CT/ltd-co paragraph |

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤ 62 chars):** lead with the highest-impression head terms + a scope/process differentiator. Test candidates at write time:
  - "Accounting for Landlords: What a Property Accountant Does" (57)
  - "Landlord Accounting Services: Full Scope of Work Explained" (58)
  - "Accounting for Landlords | What Your Accountant Does for You" (59)
  - Choose the candidate that leads with the exact head term ("accounting for landlords" / "landlord accounting services") and signals end-to-end scope.
- **metaDescription (≤ 158 chars):** named-scope + freshness hook + no pricing. Candidate: "What landlord accounting services actually cover, end to end: Self Assessment, Section 24, MTD, CGT and the new 2027 property income rates. UK guide." (verify char count at write time; trim to ≤158.)
- **h1:** keep the existing question-shape "What Do Accounting Services for Property Owners Actually Cover?" (it carries the exact-match phrase and reads well) OR tighten to "Accounting Services for Property Owners: What Your Accountant Actually Does". Manager preference: keep the existing h1 (exact-match retained) unless the writer's testing shows the tightened form scans better.

---

## Section-by-section content plan to ~3,200 words

Target: 11-13 H2s, ~3,200 body words, 12-14 FAQs, rates-and-scope clarity, 2 inline CTAs, 4-6 authority links. Reframe from "list of 8 services" to "end-to-end engagement narrative".

1. **Intro (~150 words).** Keep the exact-match phrase early. Add one sentence forward-linking the role sibling (`what-does-a-property-accountant-do`) so the two pages co-rank without cannibalising. Set up the "what your accountant does for you, across the year" frame.
2. **H2 Why property accounting is different from general accounting (~250 words).** Keep + deepen: Section 24 finance-cost restriction (§4), capital vs revenue, FHL abolition (§6), MTD horizon. Cite ITTOIA 2005 s.272.
3. **H2 What to expect when you engage a property accountant: onboarding (~300 words).** PROMOTE from the thin "What to Expect" list to a proper section: engagement letter / AML / authorising the accountant as agent (ASA, §19.10 angle), the discovery review of your portfolio and current tax position, the records-handover system. Anonymised vignette 1 (e.g. "a Leeds landlord with 4 properties moving from a spreadsheet to a digital records system"). **Inline CTA 1** after this section.
4. **H2 The records you need to provide (~250 words).** Expand the current single FAQ into a section: rental statements, repair vs improvement invoices, mortgage interest statements, completion statements, deposit-protection records, the 5-year statutory retention floor (note the 7-year practical recommendation), and the MTD digital-records direction. Cite gov.uk rental-income guidance.
5. **H2 The annual compliance cycle (~250 words).** NEW: walk the tax-year calendar — quarterly MTD updates (from the relevant mandate date), the SA105 property pages, the 31 January filing + payment, the 31 July payment on account, the 60-day CGT-on-property return when a disposal happens. This is the "process" differentiator gov.uk and competitors do not provide.
6. **H2 The eight service areas applied (~900 words, eight H3s).** Keep the 8-area spine but APPLY each with a sentence of "here is what your accountant actually does":
   - H3 1 Rental income + expense tracking (cash basis vs accruals; allowable expenses list; cite s.272).
   - H3 2 Self Assessment SA105 preparation + filing.
   - H3 3 Section 24 (§4): 20% credit for 2026/27, the three-part cap, **rises to 22% from 2027/28 (FA 2026 Sch 1)**, no new wedge; forward-link S24 applied page.
   - H3 4 CGT planning + reporting (§5): 18%/24%, £3,000 AEA, PRR; **CORRECTED 60-day scope** (UK residents where tax due; non-residents every disposal per §17.4); forward-link CGT pillar + 60-day deadlines page. **Inline CTA 2** after this H3.
   - H3 5 MTD compliance (§3/§19): full ladder £50k/£30k/£20k, gross-income test (§19.2), joint-owner share test (§19.4); forward-link MTD guide.
   - H3 6 Limited company + Corporation Tax (§21.4): 19%/25%/marginal-relief £50k-£250k; director filing duties; forward-link BTL ltd-co pillar. (Replace the stale aka.hmrc link here.)
   - H3 7 VAT (commercial option-to-tax; residential generally exempt; new-build/conversion exceptions).
   - H3 8 Tax planning + strategy: incorporation decision, IHT on the portfolio (BTL does NOT qualify for BPR, §9 / Pawson), CGT structuring, AND the ONE tightly-framed RRA sentence (§20.11 tax/cash-flow interaction with Section 24, post-1-May-2026).
7. **H2 The 2027 property income tax change your accountant is planning for (~200 words).** NEW: FA 2026 (c.11) ss.6-7, 22%/42%/47% from 6 April 2027 (England + Wales + NI; Scotland carved out), reducer rises to 22% (no new basic-rate wedge); asserted as enacted law with FA 2026 citation; forward-link the 2027 rates pillar.
8. **H2 What accounting services do not typically include (~150 words).** Keep (legal advice, mortgage broking, property management, bookkeeping-as-add-on); tidy.
9. **H2 How property accountants typically structure their fees (~150 words).** REPLACES the pricing-leak H2. NO numbers. Explain fixed-fee vs hourly vs portfolio-tiered, what drives scope (number of properties, company vs personal, CGT events), and what to ask. Forward-link `how-much-does-a-property-accountant-cost`.
10. **H2 How to choose a property accountant (~150 words).** Keep + tighten (experience with rental tax, S24/MTD knowledge, incorporation capability, clear communication, anonymised social proof). Forward-link `how-to-choose-a-property-accountant` + `buy-to-let-accountants-near-me-guide`.
11. **H2 The bottom line (~120 words).** Keep; close with `/contact` no-obligation discussion (LeadForm auto-injected — do not duplicate) + `/calculators`.
12. **H2 Sources (4-6 verified authority links).** Replace stale aka.hmrc link.

**FAQ plan (12-14; each mirrors a cluster zero-click query verbatim where possible; NO pricing numbers):**
1. What do accounting services for property owners include? (exact-match)
2. What does landlord accounting cover? (head term "landlord accounting")
3. Do I need a specialist property accountant or will any accountant do? (keep, deepen)
4. What records do I need to keep for my property accountant? (keep, deepen — 5yr floor / 7yr practical)
5. How do property accountants typically charge? (REPLACES pricing FAQ — no numbers, forward-link cost page)
6. Can a property accountant help with Making Tax Digital? (keep, add £20k 2028 step)
7. When do I have to report Capital Gains Tax on a property sale? (corrected 60-day scope, §5/§17.4)
8. How does Section 24 affect what my accountant does? (§4, 22% from 2027/28)
9. What changes from 6 April 2027 for landlord income tax? (§7 FA 2026 22/42/47)
10. Do limited-company landlords need a different accounting service? (§21.4)
11. What does a property accountant do during the tax year? (the annual-cycle process angle)
12. Is bookkeeping included in property accounting services?
13. Can a property accountant help non-resident landlords? (NRL §17.5 / 60-day §17.4 angle)
14. How does the Renters' Rights Act affect my tax position? (§20.11 one-FAQ, tax-framed only)

---

## Statute / citation spine (every cited provision with its Act — VERIFY each against legislation.gov.uk at write time, incl. FA 2026 Royal Assent per F-37)

- **ITTOIA 2005 s.272** — profits of a UK property business computed on trade principles (rental income + allowable expenses basis). [§5/§19 spine]
- **ITTOIA 2005 s.272A** — finance-cost restriction (the Section 24 statutory landing point for individuals). [§4]
- **ITTOIA 2005 ss.274AA / 274C** — finance-cost tax-reducer mechanics; amended by FA 2026 Sch 1 so the reducer is given at the 22% property basic rate from 2027/28. [§4/§7]
- **ITA 2007 s.399B** — the income-tax reducer for finance costs; amended by FA 2026 Sch 1 (22% from 2027/28). [§4/§7]
- **TCGA 1992 s.1A + Schedules 1A / 1B / 4AA** — CGT charge incl. the NRCGT regime (rewritten by FA 2019; do NOT cite repealed ss.14B-14H). [§5/§17.4 — corrects the 60-day scope error]
- **TCGA 1992 ss.222-226** — Private Residence Relief (PRR). [§5, service area 4]
- **TCGA 1992 s.58** — spouse / civil-partner no-gain-no-loss transfer. [§5, optional]
- **TCGA 1992 s.162** — incorporation relief (referenced in the incorporation planning point). [§5/§21]
- **Finance Act 2026 (c.11) ss.6-7** — separate property income tax rates 22% / 42% / 47% from 6 April 2027 (England + Wales + NI; Scotland carved out). **Royal Assent 18 March 2026 — assert as enacted law; verify date at write time.** [§7]
- **Finance Act 2026 (c.11) Sch 1** — amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B (reducer at 22%). [§4/§7]
- **CTA 2010 s.18N (and ss.18N-Q)** — close investment-holding company carve-out (if the incorporation/CIHC point is touched; cite s.18N, NEVER s.34 per §16.3 / §21.7). [§21.4, optional]
- **TMA 1970 s.12B** — record-keeping retention (5-year floor for the relevant tax year). [records section]
- **Renters' Rights Act 2025 (2025 c. 26)** + **SI 2026/421** (Commencement No. 2, appointed day 1 May 2026) — one tightly-framed §20.11-angle reference only; verify SI at write time. [service area 8 / FAQ 14]
- **MTD ITSA**: threshold ladder is administrative (FA 2017 Sch A1 / The Income Tax (Digital Requirements) Regulations, SI 2021/1076 as amended by SI 2026/336 per §19.18) — cite gov.uk MTD guidance + ICAEW for the operational figures rather than over-citing the SI; verify at write time.

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules (NO em-dashes; anonymised social proof only; NO pricing incl. soft general-market ranges per Decision E; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind utility classes in body), FAQs-and-schema (frontmatter `faqs:` array target 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never manually add FAQ schema in body), anti-templating discipline, six-check quality bar, statute-citation discipline (statute content can be removed by amendment even when the URL is live — TCGA 1992 s.4 / FA 2019 is the canonical case; cite the post-rewrite section), and all §16 lessons (esp. §16.18 reasoning-first, §16.31 URL liveness, §16.22/§16.27/§16.30/§16.35/§16.38/F-37 Bill-vs-enacted-Act discipline).

**Critical for THIS brief:** NO pricing numbers anywhere (FAQ #3 + cost H2 stripped). NO real client names (anonymised personas only). NO em-dashes. Assert FA 2026 as enacted law (do NOT hedge as Bill-form). Fix the CGT 60-day scope error. Replace the stale aka.hmrc.gov.uk link.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow from `NETNEW_PROGRAM.md §7` with the Track 2 deltas (Step 9 = rewrite markdown at existing path; Step 12 = confirm no redirect needed [none — slug kept]; Step 13 = update existing `monitored_pages` row OR insert new one if not yet tracked). Brief-specific load-bearing steps:

1. Read `house_positions.md` §3, §4, §5, §6, §7, §12/§20.11/§20.12, §17.4, §19.1/§19.2/§19.4, §21.4, §13, §14 at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status).
3. Read this brief end-to-end.
4. **VERIFY FA 2026 (c.11) ss.6-7 + Sch 1 Royal Assent (18 March 2026) against legislation.gov.uk** (F-37 load-bearing pre-rewrite step). Verify §20.12 SI 2026/421 still operative. Verify TCGA 1992 s.1A is the live NRCGT anchor.
5. Re-fetch the 5 competitor URLs (httpx + proper User-Agent); reject non-200; substitute from sitemap cache if dead. Date-stamp each.
6. Read the current source markdown in full.
7. Read the closest siblings (`what-does-a-property-accountant-do`, `how-much-does-a-property-accountant-cost`, `how-to-choose-a-property-accountant`, `buy-to-let-accountants-near-me-guide`) for cluster-distinctness; read the rewritten pillars being forward-linked.
8. Plan outline: 11-13 H2s, ~3,200 body words, 12-14 FAQs, 2 inline CTAs.
9. **Rewrite markdown at existing path** (NOT new file). Preserve slug + canonical; update `dateModified` to today + `sourcesVerifiedAt`. Rewrite metaTitle (lead with head term) + metaDescription (≤158, no pricing). STRIP both pricing leaks. FIX CGT 60-day scope. Remove `aka.hmrc.gov.uk` from `sourceDomains` + Sources list.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length (12-14); em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62; metaDescription ≤ 158; all internal links resolve. **PLUS pricing check:** `grep -E '£[0-9]'` returns only legit statutory figures (£3,000 AEA, £50k/£30k/£20k MTD, £50k-£250k CT) and ZERO fee-discussion lines.
12. Confirm no redirect needed (none — slug kept; this is the intentional services/process sibling).
13. Update `monitored_pages` Supabase row (insert if not tracked; INVISIBLE baseline -> 180-day window per F-11; record pos-9 exact-match baseline + 0-click cluster baseline).
14. Commit on `main`: "Track 2: rewrite accounting-services-for-property-owners (invisible + thin-depth lift; pricing-leak strip; CGT 60-day fix; FA 2026 + MTD ladder)". Tracker edits to main repo file via absolute paths only.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Update `track2_site_wide_flags.md` (F-1 pricing leak resolved; CGT 60-day scope flag; cluster-consolidation FLAG-MANAGER; brief-input drift FLAG-NEW for the two non-existent sibling slugs).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §3/§19 MTD ladder (£50k/£30k/£20k + gross test + joint-owner share): __
- §4 Section 24 (20% 2026/27 -> 22% 2027/28, no new wedge): __
- §5 CGT (18%/24% + £3k AEA + 60-day where tax due): __
- §6 FHL abolition (preserved): __
- §7 FA 2026 22/42/47 — lock status at write: __ enacted via FA 2026 c.11 ss.6-7 (assert with citation) / __ verify date
- §17.4 NRCGT 60-day every-disposal (corrects scope error): __
- §20.11/§20.12 RRA one-sentence tax-framed reference: __
- §21.4 CT 19%/25%/marginal relief (preserved): __
- §13 do-not-write (pricing strip): __ confirmed both leaks removed

### Comparison: before vs after
- Word count: 1,418 → __ (~3,200 target)
- H2 count: 8 → __ (11-13 target)
- FAQ count: 4 → __ (12-14 target)
- Authority links: 3 (1 stale) → __ (4-6, stale replaced)
- Inline CTAs: 0 → __ (2 target)
- Pricing leaks removed: __ (FAQ #3 + cost H2) (Y/N)
- CGT 60-day scope corrected: __ (Y/N)
- FA 2026 property-income framing added: __ (Y/N)
- MTD £20k 2028 step added: __ (Y/N)
- aka.hmrc.gov.uk removed: __ (Y/N)

### Visibility-lift hypothesis test
- Pre-rewrite baseline: 33 imp / 0 clk / pos 42.5 / 13 queries (exact-match query pos 9.0)
- Post-rewrite target: exact-match -> page-1 top-half; head terms ("accounting for landlords" pos 35.9, "landlord accounting services" pos 26.5) -> pos 10-20; first clicks within 60-90 days
- Verify at +30 / +60 / +90 days via monitored_pages detector

### Flags raised
- F-1 pricing leak (carried from brief): __ confirmed stripped
- CGT 60-day scope error: __ fixed; cluster-check for siblings: __
- Cluster-consolidation FLAG-MANAGER: __ raised
- Brief-input drift FLAG-NEW (two non-existent sibling slugs): __ raised
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
