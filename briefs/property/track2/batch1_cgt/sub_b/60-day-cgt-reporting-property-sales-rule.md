# Track 2 brief: 60-day-cgt-reporting-property-sales-rule

**Site:** property
**Brief type:** Legacy rewrite — Batch 1 Sub-bucket B (CGT disposal + reporting)
**Source markdown path:** `Property/web/content/blog/60-day-cgt-reporting-property-sales-rule.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/60-day-cgt-reporting-property-sales-rule
**Stage 1 priority:** M (107 imp / pos 17-18 cluster signal — non-zero but ranked too low to convert; intra-residual duplicate of B1-B1; both shadowed by the rewritten canonical that gets ~262 imp at pos 1-11)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (the rewritten Session C #23 sibling, shipped 2026-05-21, with 2.4× this page's impression volume and substantially better positions on overlapping queries).

**Intra-pair resolution (B1-B1 vs B1-B2):** this page (B1-B2) is the **stronger of the two near-duplicates** by GSC signal (~107 imp vs 0 imp), by recency (dateModified 2026-05-19 vs no dateModified), by structure (4 FAQs + schema + ICAEW reviewer + Sources block vs 2 FAQs + no schema + no reviewer), and by prior-rewrite history (one metaTitle/metaDescription attempt already made via the `metaTitle_prev` / `metaDescription_prev` evidence). If only ONE of the two had to be retired, B1-B2 would be the canonical and B1-B1 the redirect. But **neither survives** because the third sibling `cgt-payment-deadlines-property-sales-2026` already exists at 2.4× B1-B2's impression volume and is structurally newer. Three-way cluster collapse to one canonical.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** propose retire via 301 redirect to `cgt-payment-deadlines-property-sales-2026`. The slug carries no distinguishing semantic angle vs the canonical — both treat the 60-day rule as the central topic, both cover UK-resident vs non-resident asymmetry, both walk the SA-interaction. The only thing this page does that the canonical doesn't is carry the editorial "this is a rule explainer" framing (vs the canonical's "this is a deadlines + payment guide" framing), but Google's SERP behaviour shows users searching for either framing land on the canonical anyway. There is no semantic reason to keep both.
- **Category:** `capital-gains-tax` (unchanged at redirect).
- **Gap-mode tag:** `CANNIBAL` (primary, against rewritten sibling — and dominant over intra-pair B1-B1). **NOT** INVISIBLE — page has 107 impressions in 90-day window across 12 queries, which puts it above the F-11 "invisible" threshold even though it is ranked too poorly to convert.
- **"Why this rewrite" angle:** there is no rewrite worth doing. The redirect target is newer, more comprehensive (12 FAQs vs 4; in-scope-seller table vs paragraph; dual penalty-clock table vs single-list penalty schedule; worked timeline with explicit dates vs single example), and already ranking at positions 1-11 on the same query cluster where this page sits at 17-18. Redirecting this slug consolidates the 107-impression signal into the canonical's existing 262-impression base. Expected lift on the canonical: incremental, ~30-40% impression-share gain on the `hmrc cgt reporting requirements 2026` query family (where this page currently shadows the canonical out of pos 8-12 down to its current pos 11.7 on the related "hmrc cgt reporting deadlines 2026" query).

---

## Current page snapshot (Stage 2 — pulled from filesystem + Supabase)

**Supabase `page_content_map` (2026-05-21 parse):**
- `word_count`: 1,894
- `section_count`: 12
- `faq_count`: 0 *(parser bug per `competitor_rewrite_playbook.md §6` — parser misses frontmatter `faqs:` array; actual count is 4)*
- `title_tag`: "HMRC CGT Reporting Requirements 2026: 60-Day Rule | Property Tax Partners"
- `meta_description`: "Understand HMRC CGT reporting requirements for UK property sales in 2026. Learn the 60-day rule, exemptions, penalties, and how to file. Start now." (147 chars)

**Filesystem source read (`Property/web/content/blog/60-day-cgt-reporting-property-sales-rule.md`):**
- Date: 2026-04-10. `dateModified`: 2026-05-19. `reviewedBy`: "ICAEW Qualified Senior Reviewer" / "Chartered Accountant (ACA, ICAEW), Property Tax Specialist". `reviewedAt`: 2026-05-19. `sourcesVerifiedAt`: 2026-05-19. `editorialNote`: "Backfilled Sources block: 6 authority citations."
- `metaTitle_prev` and `metaDescription_prev` fields present → **prior metaTitle/metaDescription rewrite was attempted** (likely the same 2026-05-19 backfill commit) and did not lift CTR meaningfully (still 0 clicks across 107 impressions).
- Title: "What Is the 60 Day CGT Reporting Rule for Property Sales?" (identical to B1-B1 title — direct intra-pair duplication signal)
- Body: 7 H2 sections (`When the 60-Day Rule Applies and Key Exemptions`, `What and How to Report to HMRC` with `Example Calculation` H3, `HMRC CGT Reporting Requirements for 2026`, `Penalties for Late Reporting`, `Rules for Non-Residents, Companies and Trusts`, `Integration with Self-Assessment and Record Keeping`, `Planning and Professional Support`, `Common Mistakes and Future Developments`, `Sources`)
- 4 FAQs in frontmatter (broader than B1-B1's 2)
- 1 worked example (£450k sale £350k purchase £15k costs → £85k gain → £20,400 CGT at higher rate). Uses 2026/27 framing correctly.
- Sources block at bottom with 6 numbered citations (gov.uk, aka.hmrc.gov.uk, fca.org.uk, accaglobal.com, icaew.com, att.org.uk).
- 4 internal links (CGT pillar, BTL Ltd Co guide, property accountant services, MTD landlords).
- Schema is comprehensive (AccountingService + Editorial Person + Reviewer Person + Article + BreadcrumbList + FAQPage). One of the most schema-rich legacy pages.

**House-position drift visible in source:**
- FAQ #1: *"Yes, you must still report most UK residential property disposals within 60 days even if you make a capital loss."* — This is **wrong for UK residents** per §5 LOCKED (the 60-day return applies to UK residents *only where CGT is due*; not for loss-only disposals). It is correct for non-residents. The framing as a universal "yes" is misleading and contradicts §5's do-not-write list verbatim: *"60-day applies to all UK residents' disposals regardless of tax due (only where tax is due)"*.
- Penalty schedule in body (lines 89-97) uses the OLD penalty structure: *"£100 initial penalty / £300 at 3 months late / £300 at 6 months late / 5% of tax owed (minimum £300) at 12 months late"*. This conflates the late-filing schedule with the late-payment surcharge schedule. The correct schedule (per the canonical and per §5 LOCKED): late filing runs £100 fixed + £10/day from day 91 + £300 (or 5% if higher) at 6 months + another £300 (or 5% if higher) at 12 months. Late payment runs daily interest from day 61 + 5% surcharge at day 91 / day 181 / day 365. Two separate clocks. The page conflates them into one.
- Body §"HMRC CGT Reporting Requirements for 2026" asserts "From 6 April 2026, UK residents disposing of residential property must report and pay any Capital Gains Tax (CGT) within 60 days of completion" — the **"from 6 April 2026"** phrasing is wrong; the 60-day rule has applied to UK residents since 27 October 2021 (when the deadline extended from 30 to 60 days). This appears to be DeepSeek-era language treating 2026/27 as the year a new rule starts.
- FAQ #2 penalty figures (lines 22-23): *"£100, increasing to £300 after 3 months, another £300 after 6 months, and 5% of tax owed (minimum £300) after 12 months. Interest also accrues daily on any unpaid tax from the day after the deadline."* Same conflation as above.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 from Supabase via `python -m optimisation_engine.track2.pull_page_data --slug 60-day-cgt-reporting-property-sales-rule --days 90`.**

**Aggregate: 107 impressions / 0 clicks / 12 queries / avg position varies pos 2.7 to pos 49 across queries.** Highest-impression query is `hmrc cgt reporting requirements 2026` at 62 imp / pos 18.5 — page-2 territory, zero clicks.

### Top 12 queries (full)

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 62 | 0 | 18.49 | 0.00% | hmrc cgt reporting requirements 2026 |
| 19 | 0 | 3.63 | 0.00% | uk cgt reporting deadline for property sale 2026 |
| 7 | 0 | 2.78 | 0.00% | uk cgt reporting deadline for residential property sale 2026 |
| 6 | 0 | 9.00 | 0.00% | gov.uk report and pay capital gains tax on uk property within 60 days 2026 |
| 4 | 0 | 48.83 | 0.00% | 60 day property cg tax return |
| 3 | 0 | 2.67 | 0.00% | uk cgt reporting deadline residential property 2026 |
| 2 | 0 | 5.00 | 0.00% | uk cgt reporting deadline residential property sale 2026 |
| 1 | 0 | 19.00 | 0.00% | yes |
| 1 | 0 | 8.00 | 0.00% | both |
| 1 | 0 | 1.00 | 0.00% | hmrc cgt reporting deadlines 2026 |
| 1 | 0 | 8.00 | 0.00% | hmrc report and pay cgt on uk property within 60 days of completion |
| 1 | 0 | 49.00 | 0.00% | reporting sale of property to hmrc |

### Pattern analysis

**Cluster A — primary query `hmrc cgt reporting requirements 2026` (62 imp at pos 18.5):** this is the page's anchor query but the position is so deep (page 2) that 62 impressions translate to 0 clicks. Crucially, the canonical (`cgt-payment-deadlines-property-sales-2026`) ranks at pos 11.7 on the sibling query `hmrc cgt reporting deadlines 2026` (85 imp). Google is splitting the deadline-vs-requirement query family across the two pages, with neither winning a top-3 slot. A redirect consolidates the signal into the canonical and gives it a credible shot at moving from pos 11 to pos 5-8 (still no clicks expected without further canonical-level work, but better impression-volume for any future canonical-level CTR-fail intervention).

**Cluster B — `uk cgt reporting deadline for property sale 2026` and variants (~37 imp at pos 2.7-9):** the page DOES rank well on these long-tail variants — pos 2-4 is competitive territory. But the canonical ranks even better on the same family (`uk cgt reporting deadline for property sale 2026` at pos 3.2 / 26 imp on the canonical vs pos 3.6 / 19 imp here). The canonical is the slight favourite already. Redirect consolidates without losing position.

**Cluster C — gov.uk-prefixed queries (6 imp on "gov.uk report and pay..."):** same INTENT-MISMATCH pattern as gold-reference brief T4 — users want gov.uk authority. Irrecoverable for either page; not a redirect-decision factor.

**Cluster D — operator / fragment queries (`yes`, `both`):** 2 impressions across two single-word queries. Noise.

**SERP context (from `competitor_serps` runs 2026-05-21 + 2026-05-23):** on the primary query `hmrc cgt reporting requirements 2026`, our page sits at pos 17 against competitors:
- pos 1: `rayneressex.com/news/hmrc-confirms-cgt-uk-property-return-filing-requirements/` (320-word newsroom piece)
- pos 2-3: `att.org.uk/technical/news/hmrc-updates-guidance-cgt-uk-property-returns` + `att.org.uk/technical/news/hmrc-produces-cgt-30-days-fact-sheet`
- pos 4: `duxadvisory.co.uk/hmrcs-60-day-reporting-requirement-for-residential-property-sales/`
- pos 5: `accountingweb.co.uk/any-answers/cgt-reporting-requirement-if-under-thresholds`

The pos-1-5 competitors are mostly newsroom or technical-update articles (lower depth than the canonical) — the canonical at ~2,500 words with table + 12 FAQs + worked timeline outranks them on substance but the canonical itself only sits at pos 11.7 on the sibling query. Suggests Google's SERP rank for this query family is partly competitive-density-driven (many tax-advisor sites cover this), partly canonicalisation-driven (Google rotating which site it picks). Redirect-then-monitor is the right move; aggressive canonical-level rewrite would be the next intervention if pos doesn't move.

### GA4 engagement signal

- 0 sessions / 0 active users / 0 engaged sessions / 0 conversions in 90-day window.
- Despite 107 impressions, the page generated zero GA4 traffic — confirms 0% CTR from GSC data. The few impressions that did appear in GA4 traffic-flow likely came from internal links (MTD landlords page references it).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CANNIBAL** (intra-residual + cross-source). Two intra-residual duplicates (this page + B1-B1) plus one excluded canonical (`cgt-payment-deadlines-property-sales-2026`) all chase the same 60-day-CGT-reporting query space. Google has already partially resolved this by demoting both legacy pages to pos 17-18 while preferring the rewritten canonical at pos 1-11 on the same query family. Continuing to host three pages perpetuates the split-equity problem.

**Secondary: STALE_FACTUAL (high severity).** Three discrete factual drift issues:
1. FAQ #1 wrong-for-UK-residents framing (must-report-on-loss is true for non-residents only).
2. Penalty schedule conflates late-filing and late-payment clocks per §5.
3. Body asserts "From 6 April 2026, UK residents disposing of residential property must report and pay any Capital Gains Tax within 60 days of completion" — wrong year-anchor; the rule applied to UK residents from 6 April 2020 (30-day) extended to 60-day from 27 October 2021. FA 2026 has nothing to do with this.

**Tertiary: STRUCTURE (rejected as primary).** Page has decent structure (12 sections, 4 FAQs, full schema, Sources block) — not a STRUCTURE-mode page. The structural quality actually argues against retaining: this is a well-built page that's still beaten by the canonical, which signals the issue is upstream of structure (intent overlap, not page quality).

**Load-bearing fix (ordered by ROI):**

1. **Add 301 redirect** from `/blog/capital-gains-tax/60-day-cgt-reporting-property-sales-rule` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
2. **Bundle with B1-B1 and B1-B3 redirects** as one commit so the canonical absorbs equity from all three slugs in a single deployment.
3. **Update `monitored_pages` Supabase row** for this slug (likely exists from prior rewrite-attempt window; if not, insert). Set `redirect_target_slug` + `tracking_type = redirect_post` for 90-day post-redirect detector.
4. **Internal-link survey** — particular attention to the MTD landlords page which has a body-link to this slug; update to canonical.
5. **Do NOT pre-fix the factual drift before redirecting.** The drift surfaces at the wrong-page; fixing it would waste effort on a page that's about to be removed. The canonical has correct framing on all three drift points; redirect inherits the correct framing.

**No body rewrite, no FAQ expansion.** All effort consolidates into the canonical.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Notes |
|---|---|---|---|---|---|
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | 200 OK | ~8,500-9,000 | 0 (embedded) | Schedule 2 of Finance Act 2019 (correct) | Best-in-class. 12 major sections including agent-authorisation, paper-return route, unrepresented-taxpayer route, trust mechanics, estate PR mechanics, non-resident mechanics. Last updated 7 January 2026. |
| https://rayneressex.com/news/hmrc-confirms-cgt-uk-property-return-filing-requirements/ | 200 OK | ~320 | 0 | HMRC Agent Update Issue 95 | Pos 1 SERP holder on primary query. Light newsroom angle on the SA-filing exception. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report | 200 OK | ~450 | 0 | None | Non-residential / overseas sibling page in the gov.uk CGT service. |

**(Same 3 URLs as B1-B1 brief — same query cluster, same SERP, same WebFetch results.)**

**Competitor depth context:** att.org.uk at ~8,500-9,000 words sets the upper bound. The canonical at ~2,500 words is decent but materially shallower. SERP-leader rayneressex.com is at ~320 words — Google is not currently ranking on word count for this query, so the canonical's mid-depth positioning is defensible. If a future depth-up rewrite of the canonical happens (per F-14 discovery), the att.org.uk guide is the depth-target.

**No competitor URLs to borrow for this brief specifically** because the recommendation is REDIRECT, not REWRITE.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-23 PM).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | 60-day-cgt-reporting-property-sales-rule | REDIRECT-PROPOSED (this brief) | redirect to canonical |
| Residual (intra) | 60-day-cgt-reporting-property-sales-complete-guide (B1-B1) | REDIRECT-PROPOSED (B1-B1 brief) | redirect to same canonical |
| Residual (intra) | cgt-reporting-deadlines-property-2026 (B1-B3) | REDIRECT-PROPOSED (B1-B3 brief) | redirect to same canonical |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | **CANONICAL** | absorbs redirects from B1-B1, B1-B2, B1-B3 |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | Unaffected — pillar covers comprehensive policy. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances (Session C #17) | Disposal mechanics sibling | Unaffected — different cluster anchor. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | Unaffected — different cluster anchor. |
| Residual (related, future REDIRECT candidate) | how-to-report-property-sale-hmrc-60-days | likely future REDIRECT to same canonical | Out of scope for Batch 1 (not in B-bucket); flagged for future batch. |
| Residual (related, future REDIRECT candidate) | report-property-sale-hmrc-60-days-guide | likely future REDIRECT to same canonical | Out of scope for Batch 1. |
| Wave 5 (shipped) | — | — | No collisions. |
| Wave 6 (in-flight) | — | — | No collisions. |

**Conclusion:** REDIRECT-PROPOSED to `cgt-payment-deadlines-property-sales-2026`. Single canonical absorbs all three Batch 1 Sub-bucket B redirects. The intra-pair B1-B1 vs B1-B2 question is answered by GSC data: B1-B2 (this page) is the stronger of the two (107 imp vs 0 imp) but neither is strong enough to displace the canonical.

---

## Closest existing pages (Stage 2)

**Post-redirect cluster shape** (identical to B1-B1 brief's mapping):

- **Canonical (this redirect's target):** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`
- **Parent pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`
- **Disposal mechanics sibling:** `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances`
- **Calculation walkthrough sibling:** `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step`
- **AEA depth sibling:** `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27`
- **Rates + planning sibling:** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (trial gold-reference rewrite target)
- **Gifting reliefs sibling:** `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk`
- **PRR sibling:** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (residual, future REWRITE candidate)

**Internal-link survey at this slug** (to be verified at execution): MTD landlords page (`/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`) has a body link to this slug from the body §"Common Mistakes and Future Developments" — update to canonical. Other internal-link survivors TBD at grep.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: governs the 60-day rule for UK residents (line 113). This page's FAQ #1 violates the "Do not write" rule explicitly. The redirect target asserts the rule correctly.
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22]: §17.4 NRCGT 60-day return — applies to **every** non-resident UK land disposal regardless of tax due. This page covers it in body but conflates with the UK-resident framing in the FAQ. Redirect resolves.
- **§19 MTD for ITSA** [LOCKED 2026-05-22]: §19.15 confirms 60-day return runs in parallel with MTD cessation reporting. Not critical for this brief.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY per §16.22]: NOT applicable — April 2027 surcharge is on rental income, not CGT.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts (HIGH severity, but all resolved by REDIRECT not REWRITE):**

1. **FAQ #1 wrong-for-UK-residents framing** (line 21 of source) — direct §5 do-not-write violation. Resolved by redirect to canonical (which handles UK-vs-non-resident asymmetry in a dedicated H2 table).
2. **Penalty schedule conflation** (lines 89-97) — late-filing vs late-payment clocks merged into one. Resolved by redirect (canonical uses correct dual-table format).
3. **"From 6 April 2026" anchor on existing rule** (body §"HMRC CGT Reporting Requirements for 2026") — wrong year-anchor. The 60-day rule for UK residents started 6 April 2020 (30-day) and aligned at 60-day on 27 October 2021. Resolved by redirect.

Like B1-B1, these are flagged as **discovery** that the canonical handles correctly (verified at canonical-source read 2026-05-23). **No back-patch needed at the canonical for these three points.**

**Carried-forward critical drift catch — at the canonical, NOT at this page (logged as F-13 in `track2_site_wide_flags.md` per B1-B1 brief):** the canonical `cgt-payment-deadlines-property-sales-2026` cites *"Schedule 2 to the Finance Act 2019 (now within sections 222 to 233 of the Finance Act 2019, as amended)"* — the parenthetical "sections 222 to 233" is hallucinated. The correct statutory anchor is Schedule 2 to FA 2019 (verified via WebFetch 2026-05-23). Same flag as raised in B1-B1 brief; not re-raising here — single F-13 covers it. Manager to back-patch or queue separately.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | 200 OK + content verified 2026-05-23 | Correct 60-day-return statute. Used at canonical's F-13 back-patch. Not in this brief's body (none). |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report | 200 OK | gov.uk service page (non-residential / overseas variant). |
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | 200 OK | ATT users' guide — depth-target for any future canonical-level depth-up. |

**(Execution session for the redirect doesn't need to cite any of these in body — there is no body.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: see B1-B1 brief for the full list of applicable universal rules under the REDIRECT case. Same restricted subset applies here (§16.14 tracker discipline, §16.18 reasoning-first, §16.31 URL liveness, quality bar §4.3 six-check). No em-dash discipline relevant (no body authored).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: same compressed REDIRECT workflow as B1-B1 brief, with this slug substituted into steps 4-6 and 8-9:

1. Read this brief end-to-end.
2. Claim the row in `track2_page_tracker.md` (mark 🟡 stage2_executing → ✅ executed).
3. Verify canonical still exists at expected path.
4. Add 301 redirect: `/blog/capital-gains-tax/60-day-cgt-reporting-property-sales-rule` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
5. Delete (or move to `_redirected/`) `Property/web/content/blog/60-day-cgt-reporting-property-sales-rule.md`.
6. Grep for internal links pointing to this slug — particular attention to MTD landlords page. Update to canonical.
7. Build site. Must pass. Confirm sitemap regenerates without the old slug.
8. Insert `monitored_pages` row with `tracking_type = redirect_post`, `redirect_source_slug = 60-day-cgt-reporting-property-sales-rule`, `redirect_target_slug = cgt-payment-deadlines-property-sales-2026`.
9. Commit (bundled with B1-B1 + B1-B3 redirects) on `main`: `git commit -m "Track 2A: redirect 3 legacy 60-day-CGT pages to canonical (CANNIBAL cluster resolution)"`.
10. Mark tracker ✅ executed for all 3 slugs.
11. Log any execution-time surprises to `track2_site_wide_flags.md`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-redirect verification

- Canonical still at expected path: __
- Canonical's published content still factually current: __
- F-13 statute-citation drift at canonical resolved (or still queued)? __

### Redirect commit

- Middleware rule landed: __
- Source markdown removed/moved: __
- Internal-link survivors patched (file:line list): __ (expected: at minimum the MTD landlords page)
- Build pass: __
- monitored_pages row inserted: __
- Commit hash: __

### Post-redirect monitoring

- 30-day check: canonical's `hmrc cgt reporting requirements 2026` impressions trended +/- against baseline (62 imp at this page's pos 18.5 + 2 imp at canonical's pos 11.5 = 64 imp combined): __
- 60-day check: canonical's deadline-cluster total impressions trended vs Wave 5 pre-redirect baseline (~262 + 107 + 11 = ~380 combined across the three legacy + canonical): __
- 90-day check: monitored_pages detector firing or quiet: __

### Flags raised during execution

- F-13 (carried from B1-B1 brief, canonical's hallucinated FA 2019 citation): resolved / queued / unresolved: __
- Any new flags: __

### 2-3 sentence summary

- (populated at execution time)
