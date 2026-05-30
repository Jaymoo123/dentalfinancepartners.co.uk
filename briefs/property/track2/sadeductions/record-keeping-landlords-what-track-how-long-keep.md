# Track 2 brief: record-keeping-landlords-what-track-how-long-keep

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; INVISIBLE + THIN_DEPTH + STALE_FACTS + STRUCTURE + CANNIBALISATION)
**Source markdown path:** `Property/web/content/blog/record-keeping-landlords-what-track-how-long-keep.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/record-keeping-landlords-what-track-how-long-keep
**Stage 1 priority:** M (low GSC equity, but clean intent-split carve and a confirmed statute-anchor gap make it a high-confidence REWRITE rather than a collapse)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (intent-split retained; fallback 301 into `record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords` only if a distinct practical intent cannot be carved at execution)

> Match-target depth: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (gold reference). City-page rewrite mechanics (pricing-leak fix discipline, FAQ-to-12-14 lift, authority-link floor) borrowed from `briefs/property/track2/trial/birmingham-property-accountant.md`. This brief carries the full statute spine because the load-bearing gap is the MISSING statute anchor, not CTR.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `record-keeping-landlords-what-track-how-long-keep`. The slug carries the practical/operational beginner intent ("what to physically track, how long, how to organise"). It does NOT carry the statute-and-disclosure-route intent, which is owned by the sibling `record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords`. The slug is the contract for the intent-split; no redirect proposed (fallback documented below).
- **Category:** `Landlord Tax Essentials` (kept; canonical category-path `landlord-tax-essentials`).
- **Gap-mode tag:** `THIN_DEPTH` (primary) + `STALE_FACTS` (secondary, statute-precision) + `CANNIBALISATION` (tertiary, four-page intent space needing reciprocal-link resolution) + `STRUCTURE` (FAQ count 4 to 12-14, no rates/retention table, zero authority links) + `INVISIBLE` (effectively zero GSC/Bing equity, so the lift is a forward investment, not a CTR rescue).
- **"Why this rewrite" angle:** This page is the generic, un-anchored beginner record-keeping guide (1,145 words, NO statute citation, an em-dash voice violation at line 26). The deeper newer sibling already owns the statute-and-disclosure depth. Rather than collapse two zero-equity pages (which destroys nothing but gains nothing per §16.T2/§16.T3), the rewrite **repositions this page as the definitive practical "what to track day-to-day, how long to keep it, how to set up a system" guide for ordinary landlords**, re-anchors the retention claims to TMA 1970 s.12B (individuals) and CA 2006 s.388 (companies) so they stop being un-sourced assertions, and delegates the s.12B-penalty / discovery-window / voluntary-disclosure-route depth to the retention-discipline sibling via a forward-link. The MTD-form question forward-links to the MTD page; the disposal-base-cost question forward-links to the CGT page. Reciprocal links resolve cluster positioning by topic-split, not collapse.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`record-keeping-landlords-what-track-how-long-keep.md`):**
- `word_count`: ~1,145 (body)
- 9 H2 sections: HMRC Requirements and Retention Periods; Essential Rental Income Records; Property Expense and Capital Expenditure Records; Digital Storage and Best Practices; Records for Different Property Types; Making Tax Digital (MTD) Compliance; Setting Up a Record Keeping System and Avoiding Mistakes; Penalties and When to Seek Professional Help. (Plus an unheaded intro.)
- Multiple H3s under retention, income, expenses, storage, property-type, and system sections (the structural skeleton is sound; the depth and anchoring are not).
- `metaTitle`: "Landlord Records: What to Keep & How Long | UK Guide 2026" (55 chars)
- `metaDescription`: "Complete guide to record keeping for landlords. HMRC requirements, what rental records to track, digital storage tips, and retention periods explained." (149 chars)
- `h1`: "What Records Should UK Landlords Keep and for How Long?"
- FAQ count (frontmatter `faqs:` array): **4** (target 12-14). FAQ #1 correctly states individuals = 5 years; this is the cluster's correct-advice anchor.
- Internal links present: 5 (MTD-April-2026 deadline, landlord-tax-deductions list, Section-24 guide, CGT complete guide, what-does-a-property-accountant-do). Reasonable internal-link base; needs the three cluster reciprocal links added.
- Outbound authority links: **0** (no legislation.gov.uk / gov.uk / HMRC-manual citations). This is the load-bearing structural gap.
- **Statute anchor: NONE.** Retention periods, the £3,000 penalty, and the 20-year discovery window are all asserted without a single statutory hook.
- **Em-dash violation:** line 26 ("not just good practice — it's a legal requirement"). Must be stripped to a comma/parenthesis/full stop on rewrite. Sweep the whole body for further instances.
- Last meaningful edit: 2026-04-10 (frontmatter `date`).

---

## GSC angle (last 90 days) — equity assessment

**This is an INVISIBLE-baseline page. Per the diagnosis input:**
- GSC: **1 impression / position 31 / 0 clicks** in the 90-day window (a single impression on the fringe of page 3). Effectively no Google equity.
- Bing: **zero** `bing_query_data` rows for this slug or for `%record-keeping%` / `%record-retention%`. No Bing equity.
- The statute-anchored sibling (`record-retention-discipline-...`) has **no GSC rows at all** — also zero equity.

**Collapse-direction check (deterministic-floor discipline, §16.T2):** both candidate pages have ZERO sustained impressions and ZERO weeks-present, so the spike-robust collapse guard would NOT clear a redirect in either direction (a redirect destroys nothing but gains nothing). With equity equal at zero, collapse direction cannot be data-justified, so the decision falls to **intent-split** — the safest reversible option that preserves two distinct beginner-vs-statute landing surfaces and lets future GSC signal pick the winner. Run `scripts/track2_collapse_guard.py` at execution to confirm NEITHER page meets the collapse threshold before committing to REWRITE over the fallback 301.

**GA4 engagement signal:** no meaningful session data expected for an invisible page; do not gate the rewrite on engagement. The investment thesis is forward-looking: anchor the page to a real statute spine + carve a distinct practical intent so it can begin to accrue the high-volume "what records do landlords need to keep" / "how long keep landlord records UK" head term that gov.uk and LITRG currently own.

**Realistic post-rewrite target:** this is a depth + distinctiveness play, not a CTR rescue. Target is to move from 1 impression / pos 31 to a page-1-to-2 foothold on the practical record-keeping head term within the 90-180 day monitored window (INVISIBLE-baseline pages get the 180-day window per the F-11 recommendation). Do not promise CTR multiples; there is no CTR baseline to multiply.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: THIN_DEPTH.** At 1,145 words the page is below both the competitor depth ceiling (~2,500 words at uklandlordtax.co.uk) and the gold-reference floor. It lists record categories competently but never quantifies retention with a statute, never works a retention example end-to-end, never distinguishes the income-tax 5-year floor from the corporation-tax 6-year floor with the underlying Acts, and never builds the day-to-day operating system a beginner actually needs. The load-bearing fix is a body lift to ~2,600 words that adds: a retention-period table anchored to statute, a worked retention-end-date example, a per-property record taxonomy, and a step-by-step "set up your system this month" operating section.

**Secondary: STALE_FACTS (statute-precision, not figure-wrong).** The page's headline figures are mostly CORRECT (individuals = 5 years after 31 January deadline; companies = 6 years from period end; MTD thresholds £50k/£30k/£20k; FHL abolition April 2025; £3,000 penalty; 20-year discovery). The defect is that NONE of them is anchored. Per §27.7 [LOCKED 2026-05-24] the correct hooks are TMA 1970 s.12B (individuals, 5 years from 31 January) and CA 2006 s.388 (companies, 6 years from period end), and §27.7 explicitly warns sessions **must not collapse the two**. The £3,000 figure must be re-anchored to s.12B(5) and framed as the **floor for records-only failures**, with §27.2/§27.3 framing that Sch 24 FA 2007 (inaccuracy) and Sch 41 FA 2008 (failure-to-notify) penalties on the consequential tax loss usually dominate. The 20-year line must be paired with the §27.1 nuance (ordinary 4 years s.34, careless 6 years s.36(1), deliberate 20 years s.36(1A), offshore innocent-error 12 years s.36A).

**Tertiary: CANNIBALISATION (four-page intent space).** Resolved by intent-split + reciprocal links, not collapse. See the cannibalisation universe check. The cluster also carries a confirmed wrong-advice flag on a SIBLING (the CGT page's "6 years income tax" claim, false per §27.9) that this rewrite should flag for back-patch but must NOT replicate — this page's FAQ #1 is the cluster's correct-advice anchor and must stay 5 years for income tax.

**Quaternary: STRUCTURE + INVISIBLE.** FAQ count 4 to 12-14; add a retention-period table (snippet-bait against gov.uk/HMRC); add 5-7 authority links from zero. INVISIBLE means the lift is a forward investment — diagnose accordingly and set the 180-day monitored window.

**Load-bearing fix sequence (ordered by ROI):**

1. **Re-anchor every retention claim to statute** (s.12B individuals / CA 2006 s.388 companies, kept distinct per §27.7). This is the single defect that most separates this page from gov.uk/LITRG and from its own statute-anchored sibling. Do it first.
2. **Carve the practical intent explicitly** in the intro + H1 framing: this is the "what to track + how long + how to organise" guide. Forward-link the statute-penalty-and-disclosure depth to the retention-discipline sibling, the MTD-form mechanics to the MTD page, the disposal-base-cost records to the CGT page. The intro must state what this page is and is not, so the split is legible to both readers and Google.
3. **Body lift to ~2,600 words** with the retention table, the worked retention-end-date example, the per-property-type taxonomy, and the operating-system section.
4. **FAQ count 4 to 12-14**, each FAQ targeting a specific practical query verbatim; FAQ #1 stays "5 years for individuals" (the correct-advice anchor); add a FAQ that explicitly disambiguates "5 years (income tax) vs 6 years (corporation tax)" to inoculate against the cluster's own wrong-advice drift.
5. **Authority links: 5-7 verified citations** (TMA 1970 s.12B; CA 2006 s.388; TMA 1970 s.34/s.36; Sch 24 FA 2007; Sch 41 FA 2008; gov.uk record-keeping guidance; LITRG record-keeping reference).
6. **Strip the em-dash at line 26** and sweep the body; replace with commas/parentheses/full stops/middle dots.
7. **No pricing, no real client names** (page is already clean per the diagnosis; keep it clean — anonymised illustrative landlord only).

---

## Competitor URLs (Stage 2 — verify live at execution via WebFetch per §16.31)

| URL | Expected status | Approx words | FAQs | Statute cites | Coverage signals |
|---|---|---|---|---|---|
| https://uklandlordtax.co.uk/record-keeping-landlords/ | verify 200 | ~2,500 | verify | NO statute cite | 5yr/6yr retention, MTD, records list. Depth ceiling for the query class. Borrow the comprehensive records taxonomy; beat it on statute anchoring + worked retention-end-date. |
| https://alba.uk.com/landlords-which-records-to-keep/ | verify 200 | ~1,200 | verify | NO statute cite | Retention + records list + deductibles; no penalties/MTD depth. Borrow the plain-English deductibles framing; differentiate on penalty + MTD depth. |
| https://www.litrg.org.uk/tax-nic/how-tax-collected/self-assessment-and-tax-returns/tax-keeping-records | verify 200 | authoritative | n/a | references HMRC guidance | The authoritative consumer record-keeping reference. Use as an AUTHORITY cross-reference (link out), not a copy target; converts the "I want a trusted source" impression into a controlled link-out while we hold the specialist-application layer. |
| https://gofile.co.uk/knowledgebase/tax-for-landlords/record-keeping/ | verify 200 | specialist | verify | verify | Specialist landlord record-keeping page. Borrow any per-property-type record nuance; differentiate on retention-table + statute spine. |

**Competitor depth ceiling for this query class:** ~2,500 words, 0 statute citations, generic records lists. Our ~2,600-word target with a statute-anchored retention table + worked retention-end-date + 12-14 FAQs + 5-7 verified citations puts us decisively best-in-class on precision, not merely at parity on length.

**What to borrow:** uklandlordtax.co.uk's comprehensive records taxonomy; alba.uk.com's plain-English deductibles framing.
**What to differentiate against:** every competitor skips the statute anchor, the income-tax-vs-corporation-tax distinction, and the worked retention-end-date. Those are our differentiators, plus the disclosure-route forward-link to the sibling that no competitor offers.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (most recent Track 2 snapshot). Re-read fresh at execution per §15.

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | record-keeping-landlords-what-track-how-long-keep | self | REWRITE in place; reposition to practical/operational intent |
| Same-category sibling | record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords (Landlord Tax Essentials, ~2,740 words, statute-anchored on TMA 1970 s.12B + CA 2006 s.388 + 7-year practical floor + LPC/WDF/DDS/CoP9 disclosure decision tree) | Retention + statute + voluntary-disclosure depth | **Intent-split.** This page owns practical "what to track + how long + how to organise"; the sibling owns the s.12B-penalty / discovery-window / disclosure-route depth. Forward-link to it from the "Penalties and what to do if records are missing" section. Sibling adds reciprocal forward-link back at execution (note in flags; sibling edit is a separate touch). **Fallback:** if a distinct practical intent cannot be carved, 301 THIS page into the sibling (deeper/newer/statute-anchored; equity equal at zero). |
| Different-category sibling | mtd-record-keeping-landlords-digital-requirements (Making Tax Digital, ~1,506 words) | Digital-records / MTD-form intent | No collision. This page references MTD digital-records obligation briefly + forward-links for the form/software mechanics. |
| Different-category sibling | cgt-record-keeping-property-sales-what-to-save-how-long (Capital Gains Tax, ~1,207 words) | Disposal / base-cost records intent | No collision. This page references base-cost/improvement records briefly + forward-links for the disposal-records depth. **FLAG:** the CGT sibling's FAQ asserts individuals keep records "6 years" for income tax/CGT — FALSE per §27.9 (income tax = 5 years; 6 years is corporation tax / CA 2006 s.388). This rewrite is the correct-advice anchor; raise a back-patch flag for the CGT page (do NOT replicate the error). |
| Cross-category | landlord-tax-deductions-uk-2026-complete-list (Section 24 and Tax Relief) | Deductible-expense list | No cannibal; this page links there for the deductible-expenses depth (already linked). |
| Cross-category | landlord-tax-changes-2026-complete-guide (Landlord Tax Essentials) | Broad landlord changes | No cannibal; optional internal link for the MTD/FHL context. |

**Conclusion:** REWRITE in place via intent-split. No REDIRECT-PROPOSED on the primary path. Fallback 301 into the retention-discipline canonical documented and gated on execution-time inability to carve a distinct intent. One cross-sibling back-patch flag raised (CGT page wrong-advice).

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page); paths confirmed against canonical frontmatter:

- **Retention-discipline sibling (statute + disclosure depth):** `/blog/landlord-tax-essentials/record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords` — forward-link from the penalties / missing-records section ("for the discovery-window, penalty bands, and voluntary-disclosure routes, see ..."). Reciprocal back-link added at the sibling at execution.
- **MTD digital-records sibling:** `/blog/making-tax-digital-mtd/mtd-record-keeping-landlords-digital-requirements` — forward-link from the MTD section for the digital-form/software mechanics.
- **CGT disposal-records sibling:** `/blog/capital-gains-tax/cgt-record-keeping-property-sales-what-to-save-how-long` — forward-link from the capital-expenditure/base-cost section.
- **MTD deadline guide:** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — already linked; keep.
- **Deductions list:** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — already linked; keep (the expense-records section feeds the deductions claim).
- **Section 24 guide:** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` — already linked from the finance-costs section; keep.
- **CGT pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` — already linked from capital-expenditure; keep.
- **Property accountant:** `/blog/property-accountant-services/what-does-a-property-accountant-do` — already linked from the professional-help section; keep.
- **PPR (optional):** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` — optional link if the base-cost records section touches main-residence record-keeping.

---

## House-position references (Stage 1)

- **§27.7 Record retention — TMA 1970 s.12B + CA 2006 s.388** [LOCKED 2026-05-24]: the primary spine. Individuals = 5 years after 31 January following the tax year (s.12B); companies = 6 years from end of accounting period (CA 2006 s.388). **Must not collapse the two** (§27.7 explicit rule). Worked retention-end-date: a 2026/27 record must be kept until 31 January 2033 (income tax). MTD ITSA digital-records form constraint runs alongside but does not extend the period (§19.16 interaction).
- **§27.7 / §27.8 penalty floor — TMA 1970 s.12B(5)** [LOCKED 2026-05-24]: up to £3,000 per year of failure; the **floor for records-only failures**, rarely operative because Sch 24 / Sch 41 dominate where there is consequential tax loss.
- **§27.2 Schedule 24 FA 2007** [LOCKED 2026-05-24]: inaccuracy penalties (careless 30% max to deliberate-concealed 100%, before offshore uplift). Reference only — depth belongs to the retention-discipline sibling; this page frames "the £3,000 is the floor; the bigger exposure is the tax-geared penalty on the under-assessment" and forward-links.
- **§27.3 Schedule 41 FA 2008** [LOCKED 2026-05-24]: failure-to-notify penalties. Same treatment — reference + forward-link.
- **§27.1 Discovery time limits — TMA 1970 s.34 / s.36(1) / s.36(1A) / s.36A** [LOCKED 2026-05-24]: ordinary 4 years (s.34), careless 6 years (s.36(1)), deliberate 20 years (s.36(1A)), offshore innocent-error 12 years (s.36A FA 2019). The page's bare "20 years" line must be re-framed as the deliberate-behaviour ceiling within this ladder, NOT a default. Do NOT write "HMRC has 6 years to assess all under-declared rental income" (§27.9 do-not-write).
- **§27.8 practical 7-year floor** [LOCKED 2026-05-24]: the firm's standing recommendation is keep records 7 years (one year above the s.12B floor) as a risk-buffer; anchor on the 5-year statutory floor but recommend the 7-year practical floor, consistent with the sibling and §19.16.
- **§19.16 MTD ITSA digital-records discipline** [LOCKED]: MTD thresholds £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028); digital-link requirement constrains the FORM not the retention period. Page already has the thresholds correct; preserve.
- **§13 / §27.9 Do-not-write list** [LOCKED]: NO pricing; NO real client names; do NOT state "records must be kept for 6 years (income tax)" (false; that is corporation tax); do NOT collapse the discovery-window ladder into a flat figure; do NOT frame FHL relief as alive (abolished April 2025).

---

## House-position conflict flag (Stage 2)

**No direct contradiction of a locked figure — the page's numbers are correct.** The defect is **absence of statute anchoring**, which §27.7 requires, plus one VOICE rule breach.

1. **Em-dash violation (VOICE rule, memory-locked).** Line 26 carries "not just good practice — it's a legal requirement". Must be stripped on rewrite. Sweep whole body. Flag to `track2_site_wide_flags.md` as the rewrite's mechanical pre-task.
2. **Cluster wrong-advice flag (cross-sibling, do NOT replicate).** The CGT sibling `cgt-record-keeping-property-sales-what-to-save-how-long` FAQ asserts individuals keep records "6 years" for income tax/CGT — FALSE per §27.9 (income tax = 5 years; 6 years = corporation tax / CA 2006 s.388). This page's FAQ #1 is correct (5 years). **Raise a back-patch flag for the CGT page**; this rewrite is the cluster's correct-advice anchor and must NOT import the error. Per the memory note on factual back-patches, the CGT-page correction stays manager-direct (per-citation judgment), not a mechanical sweep — flag it, do not fix it inside this rewrite.

No pricing leak found (clean). No real client names (clean). No Finance-Act Bill-vs-enacted hazard (no 2027-rate assertions present on this page — the MTD thresholds are enacted and correct).

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31, including any Finance-Act Royal-Assent date)

| URL | Use case | Verify-at-write note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1970/9/section/12B | Record-retention statutory obligation (individuals; 5-year period; s.12B(5) £3,000 penalty) | §27.7 verified this live 2026-05-24; re-confirm operative wording at write time (§F-8 amendment-can-strip-content discipline) |
| https://www.legislation.gov.uk/ukpga/2006/46/section/388 | CA 2006 s.388 company accounting-record obligation (6-year retention for private companies) | Confirm 6-year private-company retention at write time |
| https://www.legislation.gov.uk/ukpga/1970/9/section/34 | Ordinary 4-year assessment time limit | §27.1 verified 2026-05-24; re-confirm |
| https://www.legislation.gov.uk/ukpga/1970/9/section/36 | Extended time limits (careless 6yr / deliberate 20yr / offshore 12yr s.36A) | §27.1 verified 2026-05-24; re-confirm |
| https://www.legislation.gov.uk/ukpga/2007/11/schedule/24 | Sch 24 FA 2007 inaccuracy penalties (the tax-geared penalty that dominates the £3,000 floor) | §27.2 verified 2026-05-24; re-confirm |
| https://www.legislation.gov.uk/ukpga/2008/9/schedule/41 | Sch 41 FA 2008 failure-to-notify penalties | §27.3 verified 2026-05-24; re-confirm |
| https://www.gov.uk/government/publications/keeping-records-for-business-what-you-need-to-know (or current gov.uk landlord record-keeping guidance URL) | Cross-reference for "I want a trusted source" impression-class (controlled link-out) | Verify exact current gov.uk URL at write time; do not guess the path |
| https://www.litrg.org.uk/tax-nic/how-tax-collected/self-assessment-and-tax-returns/tax-keeping-records | Authoritative consumer record-keeping reference (link-out, not copy) | Verify 200 + path at write time |

**(Execution session selects 5-7 to actually cite in body. Statute cites take priority over guidance cites — the statute anchor is the load-bearing differentiator.)**

---

## metaTitle / metaDescription / h1 plan (Stage 2)

- **metaTitle (current):** "Landlord Records: What to Keep & How Long | UK Guide 2026" (55 chars). It is acceptable but generic and does not signal the practical/operational intent-carve or the statute precision. Test 2-3 candidates at execution, leading with the practical "what to track" + retention angle:
  - "Landlord Records: What to Keep & How Long (2026 UK Guide)"
  - "What Records Should Landlords Keep? UK Retention Guide 2026"
  - "Landlord Record Keeping: What to Track + How Long | 2026"
  - Constraint: <= 62 chars; replace the "&" only if a candidate reads cleaner; keep "2026".
- **metaDescription (current):** "Complete guide to record keeping for landlords. HMRC requirements, what rental records to track, digital storage tips, and retention periods explained." (149 chars). Rewrite to lead with the practical promise + the statute-anchored retention precision + a no-pricing free-call hook. Candidate:
  - "What rental records UK landlords must track, how to organise them, and exactly how long to keep them (5 years for individuals under TMA 1970 s.12B, 6 years for companies). Book a free record-keeping review." — trim to <= 158 chars at execution; drop the citation inline if it pushes over length and keep the 5-vs-6-year distinction.
  - Constraint: <= 158 chars; NO em-dashes; NO pricing; one free-call hook only.
- **h1 (current):** "What Records Should UK Landlords Keep and for How Long?" — KEEP. It already matches the practical primary query verbatim and signals the intent-carve. No change.

---

## Primary + secondary query targets (Stage 2)

- **Primary query:** "what records should landlords keep and for how long" (UK rental property record keeping / retention). H1 already matches; the body must become the best answer via the statute-anchored retention table + worked retention-end-date.
- **Secondary queries (each maps to a planned FAQ / section):**
  - "how long do landlords have to keep records UK" -> retention table + s.12B / CA 2006 s.388 distinction
  - "what records do landlords need to keep for tax" -> income/expense/capital records taxonomy
  - "do landlords have to keep receipts" -> expense-records + missing-receipts mistake section
  - "can landlords keep digital records / scan receipts" -> digital storage + MTD section
  - "how long keep records after selling rental property" -> CGT base-cost forward-link + retention-after-disposal FAQ
  - "5 years or 6 years landlord records" -> the disambiguation FAQ (correct-advice anchor)
  - "penalty for not keeping landlord records" -> s.12B(5) £3,000 floor + Sch 24/41 tax-geared framing + sibling forward-link
  - "how to organise landlord records / record keeping system landlords" -> the operating-system section (the practical-intent differentiator)

---

## Section-by-section content plan to ~2,600 words

Target ~2,600 body words, 9-11 H2s, 12-14 FAQs, 1 retention table, 1 worked retention-end-date example, 1-2 inline `<aside>` CTAs at conversion moments. Raw HTML body (`<p>`, `<h2>`, `<ul>`) per the blog-rendering rule; NO markdown headings in body; NO Tailwind classes.

1. **Intro (~150 words) — the intent-carve.** State plainly that this is the practical guide to what to track day-to-day, how long to keep it, and how to organise it; and that the deeper statute/penalty/disclosure-route detail lives at the retention-discipline sibling (forward-link), MTD-form mechanics at the MTD sibling, and disposal-records at the CGT sibling. Strip the em-dash. Lead the practical promise; do not bury the retention answer.
2. **H2: How long must you keep landlord records? (~350 words, the load-bearing section).** Retention TABLE: Individual landlord = 5 years after the 31 January submission deadline (TMA 1970 s.12B); Limited company = 6 years from end of accounting period (CA 2006 s.388); records where an enquiry is open = until enquiry + appeal resolved; capital-gains base-cost records = until 5 years after disposal; losses carried forward = until fully utilised. Worked retention-end-date: a 2026/27 record (return due 31 January 2028) kept until 31 January 2033. State the 7-year practical floor recommendation (§27.8). Cite s.12B + CA 2006 s.388. Do NOT collapse the 5-vs-6-year distinction.
3. **H2: Essential rental income records (~250 words).** Rent payments, bank statements, tenancy agreements, deposits retained, ground rent received, other property income (parking/storage/holiday-let platform statements), service-charge/utility recharges with supporting bills. Per-property discipline.
4. **H2: Property expense and capital-expenditure records (~300 words).** Allowable-expense records (management, maintenance/repairs, finance costs under Section 24, insurance/professional fees) feeding the deductions list (link). Separate the capital-expenditure/base-cost records (acquisition, improvements, disposal) and forward-link the disposal-records depth to the CGT sibling. Make the revenue-vs-capital record split explicit (it is the most common beginner error).
5. **H2: Keeping records digitally (~200 words).** HMRC accepts digital records if complete/accurate/accessible; scan-on-receipt; consistent naming; backups; file-integrity over time. Bridge into MTD.
6. **H2: Making Tax Digital and your records (~200 words).** MTD thresholds £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028) per §19.16; digital-link requirement constrains FORM not retention period; quarterly updates + audit trail. Forward-link the MTD-form/software mechanics to the MTD sibling. (Keep software mentions generic; no endorsement framing that reads as advert.)
7. **H2: Records for different property types (~250 words).** HMO (licensing docs, per-room tenancies, fire-safety certificates); holiday lets post-FHL-abolition April 2025 (booking-platform statements, occupancy, changeover costs) — frame FHL as ABOLISHED, not alive; commercial (business leases, service-charge reconciliations, business rates, VAT records if registered).
8. **H2: Setting up a record-keeping system (~300 words, the practical-intent differentiator).** Monthly / quarterly / annual cadence; separate rental bank account; per-property folders; the operating routine a beginner can adopt this month. This is the section that most distinguishes the page from gov.uk and from the statute-anchored sibling.
9. **H2: Common record-keeping mistakes to avoid (~200 words).** Missing receipts; mixing personal and business; inadequate descriptions; poor mileage logs; no backup; collapsing revenue and capital. Anonymised illustrative landlord only (no real names, no pricing).
10. **H2: Penalties and what happens if your records are missing (~250 words).** s.12B(5) up to £3,000 per year = the FLOOR for records-only failures. The bigger exposure is the tax-geared penalty on any under-assessment: Sch 24 FA 2007 (inaccuracy) / Sch 41 FA 2008 (failure-to-notify). Discovery ladder: ordinary 4 years (s.34), careless 6 years (s.36(1)), deliberate 20 years (s.36(1A)), offshore innocent-error 12 years (s.36A) — NOT a flat 20-year default. Forward-link the penalty-band and voluntary-disclosure-route depth to the retention-discipline sibling. Inline `<aside>` CTA (free record-keeping review) at this conversion moment.
11. **H2: When to bring in a property accountant (~150 words).** Multiple properties, incorporation, complex finance, MTD onboarding, live enquiry. Link to what-does-a-property-accountant-do. Second inline `<aside>` CTA optional.

**FAQs (12-14) — each targets a secondary query verbatim:** how long must individuals keep records (5 years, s.12B — KEEP as #1, correct-advice anchor); how long must companies keep records (6 years, CA 2006 s.388); is it 5 or 6 years (the disambiguation FAQ — inoculates against the cluster wrong-advice); what income records does HMRC require; do I need to keep paper receipts or are scans enough; how long to keep records after selling a rental property (base-cost + CGT forward-link); what is the penalty for not keeping records (£3,000 floor + tax-geared framing); how far back can HMRC go (discovery ladder, not flat 20 years); what records do HMO landlords need; what changed for holiday-let records after FHL abolition; does MTD change what records I keep; how do I organise records for multiple properties; what happens during an HMRC enquiry if records are missing; should I keep records longer than the legal minimum (7-year practical floor).

---

## Statute spine (every section number with its Act — verify each at legislation.gov.uk at write time per §16.31 + F-8)

- **TMA 1970 s.12B** — record-keeping/retention obligation for self-assessment; individuals 5 years after 31 January following the tax year. [§27.7 LOCKED 2026-05-24]
- **TMA 1970 s.12B(5)** — penalty up to £3,000 per year for failure to keep records (the records-only floor). [§27.7 LOCKED 2026-05-24]
- **CA 2006 s.388** — company accounting-record retention; 6 years from end of accounting period for private companies. [§27.7 LOCKED 2026-05-24]
- **TMA 1970 s.34** — ordinary 4-year assessment time limit. [§27.1 LOCKED 2026-05-24]
- **TMA 1970 s.36(1)** — careless-behaviour 6-year extended limit. [§27.1 LOCKED 2026-05-24]
- **TMA 1970 s.36(1A)** — deliberate-behaviour 20-year extended limit. [§27.1 LOCKED 2026-05-24]
- **TMA 1970 s.36A** — offshore innocent-error 12-year limit (FA 2019 reform). [§27.1 LOCKED 2026-05-24]
- **Schedule 24 FA 2007** — inaccuracy penalties (reference + sibling forward-link; the tax-geared penalty that dominates the £3,000 floor). [§27.2 LOCKED 2026-05-24]
- **Schedule 41 FA 2008** — failure-to-notify penalties (reference + sibling forward-link). [§27.3 LOCKED 2026-05-24]
- **(Context, not a fresh assertion) MTD ITSA thresholds** — enacted; £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028) per §19.16. No Finance-Act Bill-vs-enacted hazard on this page.

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM §4 section 13: voice rules (NO em-dashes anywhere; anonymised social proof only; NO pricing/fees; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-2 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind utility classes), FAQs-and-schema (frontmatter `faqs:` array target 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema in body), anti-templating discipline, six-check verification, statute-citation discipline (F-8: content can be removed by amendment even when the URL is live — verify operative wording, not just 200 status). All inherited; if parent rules change, this brief inherits automatically.

**Critical for this brief:** NO em-dashes (one to strip at line 26 + body sweep). NO pricing (page is clean; keep clean). Anonymised illustrative landlord only. Statute anchor is the load-bearing differentiator — verify each cite + any Finance-Act Royal-Assent date at write time.

---

## 19-step workflow — inherited from parent program with Track 2 deltas

Per TRACK2_PROGRAM §4 section 14 (inherits the full workflow from NETNEW_PROGRAM §7; Track 2 deltas: Step 9 rewrite at existing path, Step 12 confirm-no-redirect-or-propose-one, Step 13 update existing `monitored_pages` row or insert new). Brief-specific sequence:

1. Read `house_positions.md` §27.7 + §27.1 + §27.2 + §27.3 + §27.8 + §19.16 + §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting).
3. Read this brief end-to-end.
4. **Run `scripts/track2_collapse_guard.py` on this slug vs the retention-discipline sibling** to confirm NEITHER meets the collapse threshold (deterministic floor; both zero-equity). REWRITE proceeds only if the guard does not force a collapse; otherwise apply the documented fallback 301.
5. Verify the 9-item statute spine + 2 guidance URLs against legislation.gov.uk / gov.uk (status + operative wording per F-8). Confirm CA 2006 s.388 6-year private-company retention and TMA 1970 s.12B 5-year/£3,000 wording.
6. Re-fetch the 4 competitor URLs to confirm liveness (httpx with proper User-Agent); replace any non-200.
7. Read the current source file + the 3 cluster siblings (retention-discipline, MTD, CGT) for intent-split coordination.
8. Plan rewrite outline: 9-11 H2s, ~2,600 body words, 12-14 FAQs, 1 retention table, 1 worked retention-end-date, 1-2 inline CTAs.
9. **Rewrite markdown at existing path** (NOT a new file). Preserve frontmatter slug + canonical + category; keep h1; update `dateModified` to today; test metaTitle/metaDescription candidates against the constraints above. Strip the em-dash + sweep body.
10. Add the reciprocal forward-link back from the retention-discipline sibling (separate touch; note in flags). Raise the CGT-page wrong-advice back-patch flag (manager-direct per the factual-back-patch memory note).
11. Run site build: `cd Property/web && npm run build`. Must pass.
12. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle <= 62 chars; metaDescription <= 158 chars; all internal links resolve; pricing-grep returns 0 fee lines.
13. Confirm no redirect needed (slug kept; intent-split). If Step 4 forced a collapse, execute the fallback 301 instead and skip the rewrite.
14. Update `monitored_pages`: insert (or update) row with INVISIBLE baseline + **180-day** window per F-11.
15. Commit on `main`: `git commit -m "Track 2: rewrite record-keeping-landlords-what-track-how-long-keep (statute-anchor + intent-split + depth lift)"`.
16. Update `track2_page_tracker.md`: mark ✅ executed.
17. Update `track2_site_wide_flags.md` (em-dash fix done; CGT-page wrong-advice back-patch flag; sibling reciprocal-link note).
18. Update `TRACK2_PROGRAM.md` §3 heartbeat.
19. Log discoveries for inter-batch awareness; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §27.7 retention (s.12B 5yr individuals / CA 2006 s.388 6yr companies, not collapsed): __
- §27.7 s.12B(5) £3,000 floor framed as records-only floor: __
- §27.1 discovery ladder (4/6/20/12 yr, not flat 20): __
- §27.8 7-year practical floor recommended: __
- §19.16 MTD thresholds preserved + FORM-not-period framing: __
- §13 / §27.9 do-not-write (no pricing; no "6 years income tax"; FHL abolished): __

### Comparison: before vs after
- Word count: 1,145 -> __
- H2 count: 9 -> __
- FAQ count: 4 -> __
- Authority links: 0 -> __
- Statute citations: 0 -> __
- Inline CTAs: 0 -> __
- Retention table at top of retention section: 0 -> __ (1 expected)
- Worked retention-end-date example: 0 -> __ (1 expected)
- Em-dash count: 1+ -> 0

### Cannibalisation / intent-split
- Collapse guard verdict (this vs retention-discipline sibling): __ (expect NEITHER-clears; REWRITE)
- Forward-links added (retention-discipline / MTD / CGT siblings): __
- Reciprocal back-link added at retention-discipline sibling: __
- CGT-page wrong-advice back-patch flag raised: __

### Flags raised
- Em-dash strip (line 26 + body sweep): __
- CGT sibling "6 years income tax" back-patch (manager-direct): __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
