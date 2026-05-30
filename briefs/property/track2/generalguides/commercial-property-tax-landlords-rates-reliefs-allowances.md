# Track 2 brief: commercial-property-tax-landlords-rates-reliefs-allowances

**Site:** property
**Brief type:** Legacy rewrite — gold-reference, umbrella/router repositioning
**Source markdown path:** `Property/web/content/blog/commercial-property-tax-landlords-rates-reliefs-allowances.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/commercial-property-tax-landlords-rates-reliefs-allowances
**Category:** `property-types-and-specialist-tax` (kept)
**Stage 1 priority:** H — this is the top-of-funnel umbrella that should anchor the entire commercial-property cluster (11+ live subtopic siblings) and currently does none of that work; it also carries five separate STALE/WRONG-FACT defects.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source read, all statutes WebFetch-verified against legislation.gov.uk, sibling categories enumerated, competitor depth ceiling fetched)
**Cannibalisation status:** **REWRITE** (clean umbrella positioning — see §"Cannibalisation universe check")

> This is a gold-reference brief at the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. Every statute below was verified against legislation.gov.uk at brief-drafting time (2026-05-30); the verification table is in the "Authority links" section. Execution session re-verifies the FA 2026 Royal Assent date and the business-rates multiplier figures at write time per the F-37 Bill-vs-enacted discipline.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `commercial-property-tax-landlords-rates-reliefs-allowances`. The slug already maps to the broad "what tax do commercial property landlords pay" umbrella intent; no sibling owns it. No redirect proposed (collapse-direction guard cleared below).
- **Category:** `property-types-and-specialist-tax` (kept — matches 7 of the 11 commercial siblings).
- **Gap-mode tag:** `STALE_FACTS` (primary — five separate wrong-fact defects) + `THIN_DEPTH` (secondary — 1,045 words vs a ~3,400 target and a ~6,500-word competitor depth ceiling) + `STRUCTURE` (tertiary — 4 FAQs, zero outbound authority links, no per-tax-head router structure) + `INVISIBLE` (tertiary — zero inbound internal links; orphan page).
- **"Why this rewrite" angle (distinct from a net-new page):** the page already exists and already targets the right umbrella intent, but it (a) ships five wrong facts that actively mislead readers, and (b) fails to do the one job the umbrella should do, which is to give one or two authoritative paragraphs per tax head (income/corporation tax, capital allowances, business rates, VAT, SDLT, CGT) and forward-link DOWN to each deep subtopic sibling. The rewrite keeps the page deliberately as a **router/overview**: it never duplicates the full depth of the VAT cluster, the s.198 fixtures page, the SIPP/SSAS page, or the CGT-commercial page; it summarises each head correctly and links to the page that owns it. The load-bearing differentiator versus every live competitor is **factual currency**: our correct FA 2026 figures (WDA 14%, new 40% FYA, five-multiplier business rates) beat competitors that still publish 18% WDA and the old two-multiplier rates.

---

## Current page snapshot (Stage 2 — source markdown read 2026-05-30)

- **Word count:** ~1,045 (body)
- **H2 outline (1-line each):**
  1. *Key Differences Between Commercial and Residential Property Tax* (H3s: No Section 24 Restrictions; Capital Allowances Available; VAT Considerations)
  2. *Taxation of Commercial Property Income* (income tax bands + corp-tax mention)
  3. *Allowable Expenses and Capital Allowances*
  4. *Business Rates and Empty Property Relief*
  5. *Ownership Structures: Individual vs. Limited Company* (H3: Close Company Benefits)
  6. *Taxes on Property Transactions* (H3s: CGT; SDLT; VAT)
  7. *Record Keeping, Planning, and Common Mistakes*
  8. *Getting Professional Advice*
- **metaTitle:** "Commercial Property Tax Landlords: Rates & Reliefs 2026" (54 chars — OK length, generic, no differentiator)
- **metaDescription:** "Complete guide to commercial property tax for landlords in 2026. Rates, reliefs, allowances, and key differences from residential property tax." (143 chars)
- **h1:** "Commercial Property Tax for Landlords: Rates, Reliefs, and Allowances"
- **FAQ count (frontmatter `faqs:`):** 4 (Section 24 / tax rate / capital allowances / business rates). Target 12-14.
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations anywhere).
- **Inbound internal links (from corpus):** 0 — confirmed orphan (grep of `Property/web/content/blog/*.md` returns only the page itself). This is the proximate driver of the INVISIBLE mode.
- **Outbound internal links (in body):** 2 only (`buy-to-let-limited-company-complete-guide-uk`, `what-does-a-property-accountant-do`, plus the MTD page). Does NOT link to any of its 11 commercial-cluster siblings — the umbrella does no routing.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` by `buildBlogPostingJsonLd`).
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).
- **Em-dashes in body:** present (intro para "more favourable rules — but face"; capital-allowances para "immediate tax relief — potentially beneficial"; April-2027 bullet; CGT-relief para). ALL must be stripped at rewrite per memory-lock.

---

## GSC angle (last 90 days)

**Status: NO GSC signal pulled at brief time (deferred to execution per §16.31 budget discipline).** This page sits in the commercial cluster where every sibling has ZERO Google + ZERO Bing equity (per the diagnosis cannibalisation note), so the rewrite case rests on **content correctness + cluster-architecture + orphan-cure**, not on a CTR-fail signal like the gold-reference CGT page. Treat the gap mode as STALE_FACTS + THIN_DEPTH + INVISIBLE, NOT CTR-FAIL.

**Execution session SHOULD pull at write time** (`python -m optimisation_engine.track2.pull_page_data --slug commercial-property-tax-landlords-rates-reliefs-allowances`) and record the baseline in the work-log. Expected primary query: "commercial property tax for landlords UK" / "tax on commercial property landlord" / "do commercial landlords pay section 24". If the page shows page-2+ positions with impressions, the orphan-cure inbound links (below) plus the depth lift are the load-bearing levers. Because this is an INVISIBLE-baseline page, set a **180-day** monitored_pages window per the F-11 recommendation, not 90.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS.** The page ships five separate wrong-fact defects, each independently capable of misleading a reader on a money decision. In ROI-fix order:

1. **Capital allowances are a currency gap (house §38 / §25).** The page covers ONLY "AIA 100% up to £1m" and stops. It omits the entire post-FA-2026 framework: main-pool WDA is now **14%** (FA 2026 s.28 substituting CAA 2001 s.56(1), chargeable periods from 1 Apr 2026 CT / 6 Apr 2026 IT, hybrid time-apportioned for straddling periods, down from 18%); the **new 40% first-year allowance** (FA 2026 s.29 inserting CAA 2001 s.45U, new/unused main-rate P&M from 1 Jan 2026, available to UNINCORPORATED landlords and to leasing, excludes cars/second-hand); special-rate pool **UNCHANGED at 6%** (CAA 2001 s.104D / s.33A integral features); **full expensing 100% FYA is companies-only** (CAA 2001 s.45S, permanent); **SBA 3%** (CAA 2001 s.270AA, 29-Oct-2018 construction gate, allowance-statement requirement); **s.198 fixtures election** (2-year deadline + pooling gate on purchase). AIA £1m is **permanent** (CAA 2001 s.51A(5), F(No.2)A 2023 s.8) — drop any "temporary" framing. **Differentiator note:** the depth-ceiling competitor (apexaccountants, ~6,500 words, fetched 2026-05-30) still states "main pool, with an 18% annual writing-down rate" — STALE. Our 14% is correct current law and is the single strongest reason this page should rank.

2. **BADR is stale and over-claimed (house §5).** Source line 87 says BADR "reduc[es] CGT to 10% on gains up to £1 million". WRONG: BADR rose to **14% from 6 April 2025** and **18% from 6 April 2026** (house §5). Also over-claimed: BADR does NOT apply to pure investment property at all (it needs a trading-business condition); the page hedges with "rarely qualifies" but leads with the headline relief. Reframe: BADR is generally unavailable to a commercial property LANDLORD (investment, not trading); mention it only to close the door, with correct 18% rate.

3. **April 2027 rates framing is misleading (house §7).** Source line 51 asserts "22% basic, 42% higher, 47% additional rate on **all property income**" as the headline. Frame correctly: these are **enacted law** (FA 2026 ss.6-7, Royal Assent 18 March 2026), apply to property (rental) income in **England, Wales and Northern Ireland from 6 April 2027**, **Scotland carved out**; the Section 24 finance-cost reducer rises 20%→22% (no new basic-rate wedge). Commercial rental held personally IS property income, so the new rates DO apply to commercial landlords. Do NOT imply commercial income escapes them. Per F-37/§16.27 this is enacted, NOT a Bill — state as current law, never "proposed" or "from April 2027 (subject to Royal Assent)".

4. **Business rates currency gap.** Source omits the **1 April 2026 reform** (move from a two-multiplier to a FIVE-multiplier system, plus the 2026 revaluation). Competitor `broadfield-law.com` (fetched 2026-05-30, live) confirms "the move from a two-multiplier system to five new business rates multipliers" and "updated rateable values apply across the board" from 1 April 2026. Add the new multiplier structure (verify the exact multiplier figures + which RV thresholds map to which multiplier at write time against gov.uk; the broadfield page mentions a 5% retail/hospitality/leisure cut for premises with RV under £500,000 but does not publish the multiplier numbers). Keep the empty-property relief framing (3 months standard / 6 months industrial / ongoing relief under the RV threshold) but **verify the current RV threshold figure at write time** (source says "under £2,900"; confirm the live small-RV empty-relief threshold).

5. **Corporation-tax worked example is wrong (house §21.A).** Source line 79 says a "£200k annual profit pays 19% corporation tax (£38k)". WRONG: £200k sits in the marginal-relief band (£50k-£250k), taxed at an effective **26.5%** via marginal relief (standard fraction 3/200), NOT 19%. 19% applies only up to £50k; 25% above £250k. Rewrite the worked example with correct marginal-relief arithmetic, and add the associated-companies divisor warning for multi-SPV portfolios (s.18D: limits divided by 1+N).

**Secondary: THIN_DEPTH.** 1,045 words against a ~3,400 target. The competitor depth ceiling on the narrowest sub-head alone (capital allowances) is ~6,500 words — but we do NOT chase that on this page; depth here means **breadth across all six tax heads done correctly**, with each head one or two paragraphs deep plus a forward link to the sibling that owns it. That is the umbrella's job and the anti-cannibalisation discipline simultaneously.

**Tertiary: STRUCTURE + INVISIBLE.** 4 FAQs → 12-14; zero authority links → 6-8 verified citations; zero inbound internal links → cure the orphan status by adding inbound links from the property-accountant-services hub page and the CGT / capital-allowances pillars (see "Closest existing pages"); no per-head router structure → add a "six taxes at a glance" snippet-bait table at the top.

**Load-bearing fix sequence (ordered by ROI):**

1. Correct all five STALE_FACTS (capital allowances framework, BADR, April-2027 territorial framing, business rates five-multiplier, CT worked example).
2. Reposition as an **umbrella/router**: one "six taxes at a glance" table at top, then one H2 per tax head, each ending with a forward-link to the sibling that owns the depth.
3. Cure orphan status: stage inbound links from the hub + two pillars (this is a corpus edit on OTHER pages — see note in "Closest existing pages"; execution session makes those edits).
4. Body lift to ~3,400 words by deepening each head to overview-correct depth (not sibling-duplicating depth) + 2 worked examples (commercial CGT disposal; individual-vs-company on commercial rent with CORRECT marginal relief).
5. FAQ 4 → 12-14, each targeting a discrete commercial-landlord question (Section 24 / WDA 14% / 40% FYA eligibility / full expensing companies-only / option to tax 20-year lock / TOGC / SDLT non-residential bands / business rates empty relief / BADR availability / SIPP-SSAS pointer).
6. Add 6-8 verified authority links (legislation.gov.uk CAA 2001 + FA 2026 ss.6-7/28/29; gov.uk business rates; gov.uk CGT rates; VATA 1994 Sch 10).
7. metaTitle / metaDescription rewrite leading with the umbrella + currency differentiator.

---

## Competitor URLs (Stage 2 — verified live 2026-05-30 via WebFetch)

| URL | Status | Word count | Scope | Key signal / what to note |
|---|---|---|---|---|
| https://apexaccountants.tax/how-to-claim-capital-allowances-on-commercial-property-in-the-uk/ | 200 OK | ~6,500 | Capital allowances ONLY (AIA, WDA, SBA 3%, integral features, s.198, full expensing/50% FYA, CPSE.1) | **STALE: states "main pool, with an 18% annual writing-down rate"** — our 14% (FA 2026 s.28) is the differentiator. This is the CA-only depth ceiling; we do NOT match its CA depth (that is our sibling `capital-allowances-commercial-property-what-can-claim`'s job); we forward-link to the sibling and beat apex on currency. |
| https://www.dnsassociates.co.uk/blog/vat-on-rent-commercial-residential-property | (named in diagnosis; re-verify at execution) | ~2,200 | VAT ONLY | VAT-only depth; we summarise option-to-tax in one paragraph + forward-link to the VAT cluster siblings. Do not duplicate. |
| https://broadfield-law.com/thought-leadership/uk-business-rates-what-changes-on-1-april-2026-and-what-they-mean-for-your-property/ | 200 OK (dated 28 Apr 2026) | (legal-firm thought-leadership) | Business rates 1 Apr 2026 reform | Confirms two-multiplier → FIVE-multiplier shift + 2026 revaluation + 3-month empty relief + 5% RHL cut for RV under £500k. Does NOT publish the multiplier numbers — verify those against gov.uk at write time. |
| https://www.ukpropertyaccountants.co.uk/complete-guide-on-capital-allowances-for-property-business/ | (named in diagnosis; re-verify at execution) | (CA pillar) | Capital allowances pillar | Comparator for CA breadth; same forward-link discipline as apex. |

**Competitor depth ceiling for the UMBRELLA query class:** none of the four competitors is an umbrella — each is a single-head deep dive. There is no live competitor doing the correct, current, all-six-heads commercial-landlord overview with forward routing. Our ~3,400-word router with correct FA 2026 figures + 12-14 FAQs + 6-8 verified citations is best-in-class for the umbrella intent and is NOT trying to out-depth the single-head specialists.

**What to borrow:** apex's clear AIA/WDA/special-rate structure (but with 14% not 18%); broadfield's five-multiplier framing for the business-rates head.

**What to differentiate against:** every competitor is stale on WDA (18%) and silent on the new 40% FYA, the five-multiplier business rates, and the April-2027 property rates. Currency is the moat.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest frozen snapshot). Diagnosis collapse-direction guard already cleared per the engine (`scripts/track2_collapse_guard.py`): this page CANNOT collapse into any sibling because (a) it is the broader/umbrella intent and (b) every sibling has ZERO Google + ZERO Bing equity, so there is no stronger canonical to collapse into.

| Sibling slug | Category | Owns intent | Resolution for the umbrella |
|---|---|---|---|
| capital-allowances-commercial-property-what-can-claim | property-types-and-specialist-tax | CA depth (what can be claimed) | Forward-link from the Capital Allowances head. Umbrella gives 1-2 paras + 14% / 40% FYA / s.198 pointer; sibling owns the full claim catalogue. |
| commercial-property-fixtures-claim-s198-election-purchase-mechanics | property-types-and-specialist-tax | s.198 election purchase mechanics | Forward-link from Capital Allowances head (fixtures sub-point). |
| full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 | property-types-and-specialist-tax | Full expensing / 50% FYA for SPVs | Forward-link from Capital Allowances head (companies-only sub-point). |
| cgt-commercial-property-different-residential | capital-gains-tax | Commercial-vs-residential CGT | Forward-link from the CGT head. NB house-position note: post-Autumn-2024 commercial + residential CGT are the SAME 18%/24% (unified s.1H); the differentiator is reliefs + mechanics, not rate. |
| section-24-commercial-property-complete-guide | property-types-and-specialist-tax | S24 non-application to commercial | Forward-link from the Income Tax head (the "no Section 24" point). |
| vat-option-to-tax-commercial-property-mechanics-election-revocation | property-types-and-specialist-tax | Option-to-tax mechanics | Forward-link from the VAT head. |
| option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock | property-types-and-specialist-tax | OTT 20-year irrevocability | Forward-link from the VAT head (20-year lock sub-point). |
| landlord-vat-recovery-professional-fees-capital-costs-commercial-property | property-types-and-specialist-tax | VAT recovery on fees/capital | Forward-link from the VAT head. |
| transfer-of-going-concern-togc-commercial-property-option-matching-vat-free | incorporation-and-company-structures | TOGC VAT-free transfer | Forward-link from the VAT head (sale/transfer sub-point). |
| vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework | landlord-tax-essentials | VAT status decision framework | Forward-link from the VAT head. |
| sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund | incorporation-and-company-structures | SIPP/SSAS pension-fund purchase | Forward-link from the Ownership Structures head (pension-fund route sub-point). |

**Conclusion:** **REWRITE in place as the umbrella/router.** No REDIRECT-PROPOSED, no FLAG-MANAGER on cannibalisation. The umbrella stays distinct from all 11 siblings by being deliberately shallow-per-head + routing down; the siblings stay distinct by owning their single-head depth. The umbrella forward-links to all 11; the orphan-cure adds inbound links to the umbrella from the hub + pillars.

---

## Closest existing pages (Stage 2 — internal-link plan)

**Forward-links FROM this umbrella (DOWN to the 11 siblings):** all 11 listed in the cannibalisation table above, each linked from the relevant tax-head H2.

**Cross-head pillar / hub links FROM this umbrella:**
- `buy-to-let-limited-company-complete-guide-uk` (incorporation-and-company-structures) — Ownership Structures head (already present; keep).
- `corporation-tax-rates-property-companies-2026-27` (incorporation-and-company-structures) — Corporation Tax head (CORRECT marginal-relief detail lives there).
- `corporation-tax-vs-income-tax-landlords-2027` (incorporation-and-company-structures) — Ownership Structures head (individual-vs-company on commercial rent).
- `property-business-rates-council-tax-landlords` (landlord-tax-essentials) — Business Rates head (the existing rates/council-tax explainer).
- `making-tax-digital-landlords-april-2026-deadline` (making-tax-digital-mtd) — Record Keeping head (already present; keep).
- `what-does-a-property-accountant-do` (property-accountant-services) — Getting Professional Advice head (already present; keep).

**Inbound-link CURE (edits on OTHER pages — execution session makes these; this is the load-bearing INVISIBLE fix):**
- From `what-does-a-property-accountant-do` (property-accountant-services hub) — add a contextual link to this umbrella where commercial clients are mentioned.
- From `capital-allowances-commercial-property-what-can-claim` (the CA pillar/sibling) — add an "see the full commercial-landlord tax overview" up-link to this umbrella.
- From `cgt-commercial-property-different-residential` (the CGT sibling) — add an up-link to this umbrella.
- (Optional) from `buy-to-let-limited-company-complete-guide-uk` where commercial SPVs are discussed.

These inbound links convert the orphan into a hub-connected umbrella and are the primary driver of curing the INVISIBLE mode.

---

## House-position references (Stage 1)

Each must be threaded; cite by section number, never paraphrase the figure independently.

- **§38 Capital allowances FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified at legislation.gov.uk]: main-pool WDA **14%** (FA 2026 s.28 → CAA 2001 s.56(1), 1 Apr 2026 CT / 6 Apr 2026 IT, hybrid straddling); special-rate **6%** unchanged (CAA 2001 s.104D); new **40% FYA** (FA 2026 s.29 → CAA 2001 s.45U, from 1 Jan 2026, unincorporated + leasing, ex-cars/second-hand); full expensing **100% companies-only** (CAA 2001 s.45S); AIA **£1m permanent** (CAA 2001 s.51A(5) / F(No.2)A 2023 s.8); cars excluded from AIA + 40% FYA. PRIMARY LOCK for the Capital Allowances head.
- **§25 Capital allowances cluster (CAA 2001)** [LOCKED 2026-05-23, Wave 6]: s.21/s.22/s.23 (building/structure exclusions + List C carve-back); s.33A integral features (special rate); s.35 dwelling-house bar (why residential is restricted, commercial broad); SBA s.270AA (3%, 29-Oct-2018 gate, s.270IA allowance statement); s.198/s.201 fixtures election (2-year deadline + pooling gate, see §25.11). Threads the Capital Allowances head depth.
- **§5 CGT on UK property (2026/27)** [LOCKED]: 18%/24% (unified for commercial and residential per s.1H from 30 Oct 2024); £3,000 AEA; s.162 incorporation relief; **BADR risen to 14% (6 Apr 2025) then 18% (6 Apr 2026), does NOT apply to investment property**. PRIMARY LOCK for the CGT head + the BADR fix.
- **§7 April 2027 property income tax rates** [LOCKED 2026-05-30, manager source-verified — ENACTED, not Bill-form]: 22%/42%/47% on property income England/Wales/NI from 6 Apr 2027 (FA 2026 ss.6-7, RA 18 Mar 2026); Scotland carved out; S24 reducer rises 20%→22%, no new basic-rate wedge. PRIMARY LOCK for the Income Tax head + the April-2027 fix. **Verify RA date at write time per F-37.**
- **§1 SDLT — rates and surcharges** [LOCKED + Wave 7/9 extensions]: non-residential/commercial bands **0% to £150k, 2% £150k-£250k, 5% above £250k**; no 5% additional-dwellings surcharge on commercial. PRIMARY LOCK for the SDLT head.
- **§21.A Corporation tax three-figure framework** [LOCKED 2026-05-25, Wave 8]: 19% SPR up to £50k; 25% main rate above £250k; **26.5% effective marginal rate (standard fraction 3/200)** on the £50k-£250k slice; associated-companies divisor s.18D (limits ÷ (1+N)); CIHC always 25% (s.18N, "let commercially" carve-out). PRIMARY LOCK for the Corporation Tax head + the £200k-worked-example fix.
- **§3 / §19 MTD for ITSA** [LOCKED]: £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028). Threads the Record Keeping head (page is already correct here; preserve).
- **§4 Section 24** [LOCKED]: 20% basic-rate finance-cost credit for RESIDENTIAL; does NOT apply to commercial. Threads the Income Tax head ("no Section 24" point).
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees on-page; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts — multiple STALE/WRONG-FACT contradictions of locked positions. These are the rewrite's first job.**

1. **F (HIGH) — BADR 10%/£1m assertion contradicts §5.** Source line 87 ("reducing CGT to 10% on gains up to £1 million") is wrong on rate (BADR is 18% from 6 Apr 2026 per §5) and over-claims availability (investment property does not qualify). Fix mandatory.
2. **F (HIGH) — Capital allowances currency gap contradicts §38.** Source covers only AIA £1m; omits WDA 14%, the new 40% FYA, special-rate 6%, full expensing companies-only, SBA 3%, s.198. Fix mandatory; this is the page's biggest credibility gap and its biggest differentiator.
3. **F (HIGH) — April-2027 "all property income" framing contradicts §7.** Source line 51 implies blanket application and omits the England/Wales/NI scope + Scotland carve-out + S24 reducer rise. Fix mandatory; assert as ENACTED (FA 2026 ss.6-7, RA 18 Mar 2026), not Bill-form, per F-37.
4. **F (MEDIUM) — Business rates currency gap.** Source omits the 1 Apr 2026 two-to-five-multiplier reform + 2026 revaluation. Add and verify multiplier figures + small-RV empty-relief threshold at write time.
5. **F (MEDIUM) — CT worked example contradicts §21.A.** Source line 79 ("£200k profit pays 19% / £38k") is arithmetically wrong (marginal-relief band, effective 26.5%). Fix the example + add associated-companies divisor warning.

Log these to `track2_site_wide_flags.md` at the next free F-number block (one HIGH entry per defect-1/2/3, one MEDIUM per defect-4/5). The capital-allowances 18%-WDA staleness is a **cluster-audit candidate**: the same 18% figure likely persists across the ~15 capital-allowance cluster pages (house §38 notes ~16 corpus pages still say "WDA 18%") and across any commercial sibling that mentions WDA. Recommend a §16.43 mechanical STALE sweep for "18% writing-down" / "18% WDA" across the commercial + CA clusters.

---

## Authority links worth considering (Stage 2 — verified 2026-05-30 unless noted)

| URL | Verification status (2026-05-30) | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2026/11/section/28 | **200 OK + content verified** — substitutes 14% into CAA 2001 s.56; 1 Apr 2026 (CT) / 6 Apr 2026 (IT); blended straddling formula (18×BRD/CP)+(14×ARD/CP) | Capital Allowances head — WDA 14% statute |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | **200 OK + content verified** — 40% FYA, inserts CAA 2001 s.45U, expenditure on/after 1 Jan 2026, unused/not second-hand, cars excluded | Capital Allowances head — new 40% FYA statute |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | **200 OK + content verified** — now reads "14%", annotated substituted by FA 2026 s.28(1) | Capital Allowances head — WDA current text |
| https://www.legislation.gov.uk/ukpga/2026/11/section/7 | **200 OK + content verified** — property basic 22% / higher 42% / additional 47% for 2027-28 | Income Tax head — April-2027 rates statute |
| https://www.legislation.gov.uk/ukpga/2026/11/contents | **200 OK + content verified** — s.6 "New rates of income tax on property income"; s.7 "Property rates of income tax for tax year 2027-28"; s.28/s.29 titles confirmed. (RA date NOT shown on contents page — RA 18 Mar 2026 per house §7/§38; re-confirm at write time) | Cross-reference for FA 2026 structure |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | (per house §38; re-verify at execution) | Capital Allowances head — full expensing companies-only |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | (per house §25.3 / §38; re-verify at execution) | Capital Allowances head — AIA £1m permanent |
| https://www.legislation.gov.uk/ukpga/2001/2/section/198 | (per house §25.2 / §25.11; re-verify at execution) | Capital Allowances head — fixtures election |
| https://www.legislation.gov.uk/ukpga/2003/14/section/55 | Verify at execution | SDLT head — non-residential rate bands (s.55 / Table B) |
| https://www.legislation.gov.uk/ukpga/1994/23/schedule/10 | Verify at execution | VAT head — option to tax 20-year lock (VATA 1994 Sch 10) |
| https://www.gov.uk/introduction-to-business-rates | Verify at execution + cross-check 1 Apr 2026 five-multiplier figures | Business Rates head — multiplier structure + empty relief |
| https://www.gov.uk/capital-gains-tax/rates | Verify at execution | CGT head — 18%/24% + £3k AEA cross-reference |

**Execution session selects 6-8 to actually cite in body.** The four FA 2026 / CAA 2001 links (s.28, s.29, s.56, FA 2026 s.7) are the highest-value because they are the currency differentiators against stale competitors; cite at least those four.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (target ≤ 62 chars), lead with umbrella + currency:**
  - Candidate A: "Commercial Property Tax for Landlords 2026/27 | Full Guide" (58)
  - Candidate B: "Commercial Property Landlord Tax 2026/27: All Six Taxes" (54)
  - Candidate C: "Tax on Commercial Property for Landlords 2026/27 Explained" (57)
  - Recommend A or B (leads with the umbrella intent + current tax-year stamp). Keep the year stamp 2026/27 (not bare "2026").
- **metaDescription (target ≤ 158 chars), name the six heads + the currency hook + free-call hook:**
  - "How commercial property landlords are taxed in 2026/27: income and corporation tax, capital allowances (14% WDA, 40% FYA), business rates, VAT, SDLT and CGT." (157 chars, verified em-dash-free).
- **h1 (kept, lightly tightened):** "Commercial Property Tax for Landlords: Rates, Reliefs and Allowances" (drop the Oxford comma per no-em-dash/clean-copy preference; keep otherwise).

---

## Section-by-section content plan (~3,400 words)

Target 11-13 H2s, ~3,400 body words, 12-14 FAQs, 1 snippet-bait table at top, 2 worked examples, 2 inline `<aside>` CTAs.

1. **Intro (≈120 words)** — commercial vs residential framing; commercial escapes Section 24 but faces its own six-tax matrix; promise the router. Strip em-dashes.
2. **"The six taxes at a glance" table (snippet-bait, ≈60 words + table)** — rows: Income/Corporation tax, Capital allowances, Business rates, VAT, SDLT, CGT; columns: what it is, headline 2026/27 figure, where the depth lives (forward-link). This is the router spine.
3. **Income tax on commercial rent (≈340 words)** — property income; 2026/27 bands 20/40/45; **no Section 24** (forward-link `section-24-commercial-property-complete-guide`); April-2027 22/42/47 ENACTED for England/Wales/NI, Scotland carved out, S24 reducer to 22% (house §7); commercial rent held personally IS property income so the new rates apply. Inline CTA after this head.
4. **Corporation tax (company-owned commercial) (≈340 words)** — 19% SPR ≤£50k / 25% >£250k / 26.5% effective marginal (3/200) on the slice; **CORRECTED worked example** (e.g. £200k profit → marginal-relief calc, not 19%); associated-companies divisor for multi-SPV (house §21.A); forward-link `corporation-tax-rates-property-companies-2026-27` + `corporation-tax-vs-income-tax-landlords-2027`.
5. **Capital allowances (the currency-differentiator head, ≈460 words)** — why commercial is broad and residential is barred (s.35 dwelling-house); AIA £1m permanent; **main-pool WDA 14%** (FA 2026 s.28, hybrid straddling); special-rate 6% (integral features s.33A); **new 40% FYA** for unincorporated landlords + leasing from 1 Jan 2026 (FA 2026 s.29); full expensing 100% companies-only (s.45S); SBA 3% (29-Oct-2018 gate + allowance statement); s.198 fixtures election (2-year deadline + pooling gate). Forward-links: `capital-allowances-commercial-property-what-can-claim`, `commercial-property-fixtures-claim-s198-election-purchase-mechanics`, `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`. (Note explicitly that competitors still publish 18% — we are current.)
6. **Business rates (≈300 words)** — commercial pays business rates not council tax; the **1 Apr 2026 two-to-five-multiplier reform + 2026 revaluation** (verify multiplier figures at write time); empty-property relief (3 months standard / 6 months industrial / ongoing under the small-RV threshold, verify threshold); landlord-vs-tenant liability. Forward-link `property-business-rates-council-tax-landlords`.
7. **VAT (≈340 words)** — most commercial letting is exempt; option to tax (charge VAT on rent, recover input VAT); 20-year irrevocability; TOGC for VAT-free sales; partial exemption for mixed portfolios. Forward-links to the VAT cluster: `vat-option-to-tax-commercial-property-mechanics-election-revocation`, `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock`, `landlord-vat-recovery-professional-fees-capital-costs-commercial-property`, `transfer-of-going-concern-togc-commercial-property-option-matching-vat-free`, `vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework`.
8. **SDLT (≈220 words)** — non-residential bands 0% to £150k / 2% £150k-£250k / 5% above £250k; NO 5% additional-dwellings surcharge on commercial; six-dwellings automatic non-residential treatment (house §1); leasehold NPV charge note. Inline CTA after this head.
9. **CGT on disposal (≈300 words)** — 18%/24% unified for commercial AND residential (s.1H, post-Oct-2024); £3,000 AEA; **BADR generally NOT available to investment landlords** (trading condition), and where it does apply it is **18% from 6 Apr 2026** (not 10%) — correct the headline; s.162 incorporation relief; 60-day reporting note + worked example (commercial disposal). Forward-link `cgt-commercial-property-different-residential`.
10. **Ownership structures: individual, company, or pension fund (≈300 words)** — individual vs company trade-offs (cross-link the CT head); the **SIPP/SSAS commercial-property route** (pension fund can hold commercial, not residential) forward-link `sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund`; `buy-to-let-limited-company-complete-guide-uk`.
11. **Records, MTD and common mistakes (≈260 words)** — MTD ITSA £50k/£30k/£20k schedule (house §3/§19, page already correct); the five common mistakes (reframed: not pooling fixtures pre-sale / missing the s.198 2-year window / wrong WDA rate / ignoring empty-rates relief / mis-applying S24 across property types). Forward-link the MTD page.
12. **Getting specialist advice (≈120 words)** — anonymised, no pricing; free-discovery framing; forward-link `what-does-a-property-accountant-do`. (LeadForm auto-injected by `BlogPostRenderer.tsx`; do NOT duplicate.)

**FAQ plan (12-14, frontmatter `faqs:`):** Do commercial landlords pay Section 24? / What income tax rate on commercial rent in 2026/27 and 2027/28? / What capital allowances can a commercial landlord claim? / Is the writing-down allowance still 18%? (answer: no, 14% from Apr 2026) / Can an individual landlord get the new 40% FYA? (yes) / Is full expensing available to individuals? (no, companies only) / Are commercial properties subject to business rates? / How long is empty-property rates relief? / What SDLT applies to commercial property? / Is there a 5% surcharge on commercial purchases? (no) / What CGT rate on commercial disposal? / Does BADR cut my CGT to 10%? (no, 18% and rarely available to landlords) / What is the option to tax and is it really 20 years? / Can my pension fund buy commercial property? (SIPP/SSAS pointer). Each FAQ answer 40-70 words, statute-anchored where relevant, NO pricing.

---

## Statute spine (every section number with its Act — verified at brief time 2026-05-30; re-verify FA 2026 RA date at write time)

- **FA 2026 (c.11) s.6** — New rates of income tax on property income [verified contents 2026-05-30]
- **FA 2026 (c.11) s.7** — Property rates of income tax for tax year 2027-28 (22%/42%/47%) [verified 2026-05-30]
- **FA 2026 (c.11) s.28** — Main rate of writing-down allowances → substitutes 14% into CAA 2001 s.56(1); 1 Apr 2026 CT / 6 Apr 2026 IT; hybrid straddling [verified 2026-05-30]
- **FA 2026 (c.11) s.29** — First-year allowance for main rate expenditure on P&M → 40% FYA inserting CAA 2001 s.45U, from 1 Jan 2026, unused/not second-hand, cars excluded [verified 2026-05-30]
- **CAA 2001 s.56(1)** — WDA now 14% (substituted by FA 2026 s.28(1)) [verified 2026-05-30]
- **CAA 2001 s.45U** — 40% main-rate FYA (inserted by FA 2026 s.29) [verified 2026-05-30]
- **CAA 2001 s.45S** — full expensing 100% FYA, companies only (inserted by F(No.2)A 2023) [house §38]
- **CAA 2001 s.51A(5)** — AIA £1,000,000 permanent (made permanent by F(No.2)A 2023 s.8) [house §38]
- **CAA 2001 s.104D** — special rate pool 6% (unchanged) [house §38]
- **CAA 2001 s.33A** — integral features (special-rate) [house §25.2]
- **CAA 2001 s.35** — dwelling-house P&M bar (why residential restricted) [house §25]
- **CAA 2001 s.270AA** — SBA 3%, 29-Oct-2018 construction gate [house §25.4]
- **CAA 2001 s.270IA** — SBA allowance-statement requirement [house §25.4]
- **CAA 2001 s.198 + s.201** — fixtures election + 2-year deadline + pooling gate [house §25.11]
- **CAA 2001 s.45D** — 100% FYA new unused zero-emission cars only [house §38]
- **F(No.2)A 2023 (c.30) s.8** — AIA £1m permanent enabling [house §38]
- **FA 2003 s.55 + Sch (non-residential rate bands)** — commercial SDLT 0%/2%/5% [house §1]
- **FA 2003 s.116(7)** — six-dwellings automatic non-residential treatment [house §1]
- **TCGA 1992 s.1H** — unified 18%/24% CGT (commercial + residential) [house §5]
- **TCGA 1992 s.162** — incorporation relief [house §5]
- **TCGA 1992 (BADR / s.169 ff.)** — BADR 18% from 6 Apr 2026, trading condition; not investment property [house §5]
- **VATA 1994 Sch 10** — option to tax + 20-year irrevocability [VAT head]
- **CTA 2010 s.18A / s.18B / s.18D / s.18E / s.18N** — CT 19% SPR / marginal relief 26.5% (3/200) / associated-companies divisor / CIHC [house §21.A]
- **ITTOIA 2005 (property income) + ITA 2007 s.399B / s.274AA-274C** — S24 reducer 20%→22% from 2027/28 [house §4 / §7]
- **MTD ITSA (FA 2021 / SI 2021/1076 → SI 2026/336)** — £50k/£30k/£20k schedule [house §3/§19]

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM.md §4 section 13: voice rules (NO em-dashes anywhere; NO pricing/fees; anonymised social proof only; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML body, no Tailwind classes; `.prose-blog aside` handles inline-CTA styling), FAQs-and-schema (frontmatter `faqs:` array 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema), anti-templating discipline, six-check verification (playbook §4.3), statute-citation discipline (verify at write time including FA Royal Assent date per F-37). **Body must be raw HTML** (`<p>`, `<h2>`, `<ul>`), NOT markdown syntax, per the blog-rendering memory note.

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Inherits the full 19-step workflow from NETNEW_PROGRAM §7. Track 2 deltas: Step 9 rewrites the markdown at the EXISTING path (preserve frontmatter slug + canonical + category; update `dateModified` to write date). Step 12 confirms no redirect (REWRITE in place). Step 13 inserts/updates a `monitored_pages` row with a **180-day** window (INVISIBLE baseline). **Pre-rewrite load-bearing step:** re-verify FA 2026 Royal Assent date (18 Mar 2026) + the s.28/s.29/s.6/s.7 wording + the business-rates five-multiplier figures + the small-RV empty-relief threshold against legislation.gov.uk / gov.uk at write time. Six-check additions: em-dash count = 0; pricing-figure check (no `£` fee/charge quotes for the firm's services); all 11 sibling forward-links resolve; the three+ inbound-link edits on the hub/pillars are committed.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §38 capital allowances (WDA 14% / 40% FYA / 6% / full expensing companies-only / AIA £1m): __
- §5 CGT (18%/24% unified + BADR 18% not-investment): __
- §7 April 2027 (22/42/47 England/Wales/NI, Scotland out, S24 reducer 22%) — RA date re-verified: __
- §1 SDLT commercial (0/2/5, no surcharge): __
- §21.A CT (19/25/26.5% marginal + associated-companies divisor): __

### Comparison: before vs after
- Word count: 1,045 → __ (target ~3,400)
- H2 count: 8 → __ (target 11-13)
- FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 6-8)
- Inline CTAs: 0 → __ (target 2)
- Worked examples: 1 (wrong CT example) → __ (target 2, both correct)
- Six-taxes-at-a-glance table: 0 → __ (1 expected)
- Sibling forward-links: 1 → __ (target 11)
- Inbound links cured: 0 → __ (target 3-4 edits on hub/pillars)

### Flags raised
- Five STALE/WRONG-FACT flags carried from brief (BADR / capital-allowances framework / April-2027 framing / business-rates five-multiplier / CT worked example): resolution recorded: __
- 18%-WDA cluster-audit recommendation status: __
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
