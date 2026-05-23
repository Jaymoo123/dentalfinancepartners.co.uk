# Track 2 brief (GOLD REFERENCE): cgt-rates-property-2026-27-current-rates-explained

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief
**Source markdown path:** `Property/web/content/blog/cgt-rates-property-2026-27-current-rates-explained.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained
**Stage 1 priority:** **H — highest in residual pool** (895 impressions / 90 days / 1 click = strongest commercial signal among all 234 residual pages)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23 (data pulled from Supabase + WebFetched competitors + verified authorities)
**Cannibalisation status:** REWRITE (clean — no overlap with rewritten siblings; cluster positioning already resolved at 2026-05-21 rewrite pass; this page intentionally owns the "what are the rates" intent)

> **This is the gold-reference brief.** Every section below contains real data pulled at brief-drafting time. Phase 2 sub-agents should produce briefs at this depth. The airbnb trial brief (`briefs/property/track2/airbnb-tax-uk-short-term-rental-income-taxed.md`) is structure-complete but data-skipped — this brief shows the same template populated.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-rates-property-2026-27-current-rates-explained`. The slug carries the year identifier and the cluster has intentional resolution (this page owns the rates-explainer intent; siblings own disposal mechanics, AEA depth, calculation walkthrough, payment deadlines).
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `CTR-FAIL` (primary) + `INTENT-MISMATCH` (secondary, new sub-class) + `STRUCTURE` (tertiary, lacking snippet-bait table + insufficient FAQs).
- **"Why this rewrite" angle:** Position 2-5 on 25 distinct CGT-rates queries, ~895 total impressions / 90 days, **literally 0 clicks**. The frontmatter shows `metaTitle_prev` + `metaDescription_prev` fields — a prior meta-rewrite (commit `271e58f` "rewrite metaTitle + metaDescription on 4 pages flagged by GSC CTR analysis") was attempted and did NOT fix it. The query analysis reveals why: ~40% of impressions are on queries explicitly prefixed "gov.uk" (users want authoritative source — they click gov.uk, not us), and the remainder hit Google AI Overviews / Featured Snippets that satisfy "what's the rate" without click-through. **Standard meta-rewrite alone won't fix this** — we need to reposition the page from "rates explainer" (same intent as gov.uk) to "rates + applied specialist planning" (intent gov.uk doesn't satisfy). Body lift to ~2,800-3,200 words with rates-table-at-top + 4-5 worked examples + joint-ownership planning + April 2027 hedge.

---

## Current page snapshot (Stage 2 — pulled from `page_content_map` + filesystem)

**Supabase `page_content_map` row (2026-05-21 parse):**
- `word_count`: 1,565
- `section_count`: 11
- `faq_count`: 0 *(parser bug per `competitor_rewrite_playbook.md` §6 — parser misses `<dl>/<dt>/<dd>` patterns; actual frontmatter `faqs:` array has 4 entries)*
- `title_tag`: "UK CGT Rates on Residential Property 2026: 18% & 24% | Property Tax Partners"
- `meta_description`: "UK CGT rates on residential property for 2026/27: 18% for basic-rate, 24% for higher-rate taxpayers, with £3,000 annual exemption. Plan your disposal." (158 chars — at limit)
- `h1_text`: (empty — parser noise-stripping removed it per playbook §6)

**Filesystem source read:**
- 7 H2 sections (`Current CGT Rates`, `How Tax Band Affects Rates`, `Annual Exempt Amount`, `Non-UK Residents and Companies`, `Calculating Your CGT Liability`, `Reliefs That Can Reduce CGT` with 3 H3s, `Planning Strategies and Timing`, `Record Keeping, Returns and Deadlines`)
- 2 worked examples present (£20k gain band-stacking + £72k gain on £300k sale with full calculation)
- Asserts April 2027 22%/42%/47% as fact at line 80 ("From April 2027, **property income will be taxed at different rates**") — **§16.22 Bill-vs-enacted drift hazard, same pattern as F-2 on `2027-property-tax-rates-section-24-relief-uk-landlords`**
- Has `metaTitle_prev` and `metaDescription_prev` frontmatter fields — evidence of prior meta-rewrite that didn't lift CTR
- Internal links: 5 (Section 24 pillar, CGT pillar, AEA pillar, BTL ltd-co pillar, property-accountant-services page, MTD page)
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations)
- Last meaningful edit: 2026-04-10 (frontmatter `date`)

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 from Supabase after `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90` (3,829 rows refreshed across property; query-page-day grain).**

**Aggregate:** **895 impressions / 1 click / position 5.4 / CTR 0.11% / 25 distinct queries** in 90-day window.

**Expected CTR for position 5 = ~5-9%.** We are at ~2% of expected. **CTR-fail factor ≈ 50×.**

### Top 25 queries (full)

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 103 | 0 | 2.40 | 0.00% | uk cgt rates residential property 2026 |
| 66 | 0 | 2.20 | 0.00% | current uk cgt rates residential property 2026 |
| 50 | 0 | 5.13 | 0.00% | uk capital gains tax rates residential property 2026 |
| 40 | 0 | 5.44 | 0.00% | uk capital gains tax residential property rates 2026 |
| 27 | 0 | 9.28 | 0.00% | gov.uk capital gains tax rates 2025 2026 residential property 18% 24% |
| 26 | 0 | 4.93 | 0.00% | gov.uk capital gains tax rates residential property 24% 18% 2026 |
| 24 | 0 | 3.03 | 0.00% | uk capital gains tax rates 2026 residential property |
| 23 | 0 | 4.36 | 0.00% | uk cgt rates residential property 2026/27 |
| 21 | 0 | 2.86 | 0.00% | uk capital gains tax rates on residential property 2026 |
| 20 | 0 | 6.75 | 0.00% | gov.uk capital gains tax rates residential property 2026 |
| 19 | 0 | 15.80 | 0.00% | cgt rates residential property uk 2026 |
| 16 | 0 | 8.05 | 0.00% | gov.uk capital gains tax rates residential property 2026 uk |
| 15 | 0 | 8.00 | 0.00% | gov.uk capital gains tax residential property rates 2026 uk |
| 14 | 0 | 4.83 | 0.00% | gov.uk capital gains tax rates residential property 2026 24% 18% |
| 12 | 0 | 2.14 | 0.00% | uk cgt residential property rates 2026 |
| 12 | 0 | 2.04 | 0.00% | uk cgt rates on residential property 2026 |
| 11 | 0 | 10.38 | 0.00% | gov.uk capital gains tax rates residential property 2026 2027 annual exempt amount |
| 11 | 0 | 6.83 | 0.00% | gov.uk capital gains tax residential property rates 2026 |
| 11 | 0 | 6.42 | 0.00% | uk capital gains tax residential property rates 2026 annual exempt amount |
| 11 | 0 | 9.60 | 0.00% | gov.uk capital gains tax rates residential property 2026 2027 |
| 10 | 0 | 2.14 | 0.00% | uk cgt rates residential property 2026 higher rate taxpayer |
| 10 | 0 | 5.64 | 0.00% | gov.uk capital gains tax rates residential property 2026 18% 24% |
| 10 | 0 | 4.37 | 0.00% | hmrc capital gains tax residential property rates 2026 |
| 10 | 0 | 4.23 | 0.00% | uk capital gains tax rates residential property 2026/27 |
| 9 | 0 | 5.17 | 0.00% | gov.uk capital gains tax rates residential property 18% 24% 2026 |

### Pattern analysis

**Cluster A — gov.uk-explicit queries (~14 of 25; 220 impressions = 25% of total):** users explicitly typed "gov.uk" in the query. We cannot win this intent without becoming gov.uk; users will click the gov.uk result. Best we can do: appear in the SERP and pick up the *minority* who scan past gov.uk for accountant commentary.

**Cluster B — base CGT-rates queries (~7 of 25; 313 impressions = 35% of total):** "uk cgt rates residential property 2026" + variations. Position 2-3. Zero clicks. These are likely lost to AI Overview / Knowledge Panel — Google shows 18%/24% in the answer box, no click needed.

**Cluster C — qualified intent queries (~4 of 25; 50 impressions; 6% of total):** "higher rate taxpayer" / "annual exempt amount" qualifiers. Position 2.14-6.42. These are mid-funnel, more likely to convert if we can satisfy specific intent. Our page DOES partially satisfy ("higher rate" stacking is on page) but not in answer-shaped form.

**Strategic conclusion:** the rewrite cannot capture Cluster A (gov.uk explicit). For Cluster B (AI-snippet-loss), best lever is rates-table-at-top + structured-data optimisation so Google's snippet bot grabs OUR table not gov.uk's. For Cluster C (qualified intent), build specific FAQ + worked-example coverage so the page is the best answer to those refined queries. **Realistic post-rewrite target: 5-10× current CTR, ie 5-10 clicks / 90 days instead of 1.**

### GA4 engagement signal (real data from `ga4_page_data`)

- 3 sessions / 3 active users / 1 engaged session in 90 days
- Engagement rate 33.3%, bounce rate 66.7%
- **Average session duration: 161.5 seconds** (~2.7 minutes — the few who DO arrive read deeply)
- 0 conversions

**Read:** the page is well-read by the few who click. Content quality is OK; the limiter is click-through, not engagement.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CTR-FAIL** at extreme magnitude. Position 5.4 with 0.11% CTR. Expected CTR at position 5 is 5-9% (industry benchmark). We are at **~2% of expected**.

**Secondary: INTENT-MISMATCH (new gap-mode sub-class surfaced by this trial).** A meaningful fraction of impression volume (~25%) is on queries where users explicitly want gov.uk. We cannot capture that intent without being gov.uk. **Implication for the template:** the gap-mode taxonomy needs a 6th code — `INTENT-MISMATCH` — for pages whose primary impression class is irrecoverable. Update `TRACK2_PROGRAM.md §20 Glossary` accordingly.

**Tertiary: STRUCTURE.** Page is 1,565 words / 0 FAQs at parse-time (4 FAQs by frontmatter, but parser-missed — same site-wide parser bug per `competitor_rewrite_playbook.md §6`). No rates table at top. No outbound authority citations. This makes the page weak for snippet-capture against gov.uk's authoritative version.

**Load-bearing fix sequence (ordered by ROI):**

1. **Reposition** from "rates explainer" to "rates + specialist planning + worked examples". The gov.uk page is the rates source-of-truth; we are the SPECIALIST APPLICATION layer. Add 4-5 worked numerical examples that gov.uk doesn't have.
2. **Add rates table at top** (snippet-bait optimisation; competitor `taxfix.com` does this and ranks well on consumer queries).
3. **Body lift to 2,800-3,200 words** with applied planning sections (joint-ownership splitting, AEA spousal pooling, year-of-disposal timing, post-FHL-abolition CGT-on-disposal, incorporation vs personal CGT comparison).
4. **FAQ count 4 → 12-14** with each FAQ targeting a specific GSC zero-click query verbatim (highest-impression queries become FAQ #1-#5).
5. **Authority links: 5 verified citations** (TCGA 1992 — need correct section per Finance Act 2019 rewrite; HMRC CG Manual; gov.uk/capital-gains-tax/rates as cross-reference; HMRC NRCGT manual for non-resident section).
6. **§7 April 2027 hedge** per F-2 Bill-vs-enacted pattern (page currently asserts 22/42/47 as fact at line 80 — same hazard as `2027-property-tax-rates-section-24-relief-uk-landlords`).
7. **Meta title rewrite #2** — attempt #1 (which set the current title via commit `271e58f`) didn't lift CTR; try a planning-led angle: "UK CGT Rates Property 2026/27 | 18% / 24% + 5 Planning Examples" or "Property CGT 2026/27: Rates Table + Specialist Worked Examples".

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Rates table | Coverage signals |
|---|---|---|---|---|---|---|
| https://capitalgainstax.co.uk/capital-gains-tax-rates-uk | 200 OK | ~1,900 | 0 | 0 | No (prose only) | 18%/24% ✓, £3k AEA ✓, PPR ✓; Joint ownership ✗, April 2027 ✗, BADR ✗ |
| https://uklandlordtax.co.uk/cgt-on-residential-property/ | 200 OK (redirected to PRR page) | ~550 | 0 | 0 (1 case law) | No | Niche — only PRR demolition/rebuild scenario; not a rates page despite URL |
| https://taxfix.com/en-uk/the-tax-basics/capital-gains-tax-rates-uk/ | 200 OK | ~1,200 | 0 | 0 | **Yes (2 tables)** | 18%/24% ✓, £3k AEA ✓, BADR ✓; Joint ownership ✗, April 2027 ✗ |

**Competitor depth ceiling for this query class:** 1,200-1,900 words, 0 FAQs, 0 statute citations, 1 worked example each. Our 2,800-3,200 word target with 12-14 FAQs + 5 worked examples + 5 verified statute citations puts us decisively best-in-class — not catch-up.

**What to borrow:** taxfix.com rates-table-at-top structure (snippet-bait) + capitalgainstax.co.uk's Mrs. A band-stacking worked example (we should match the clarity, beat the depth).

**What to differentiate against:** all three competitors skip joint ownership planning, April 2027 hedge, post-FHL-abolition CGT, incorporation comparison. These are our differentiators.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (frozen 2026-05-23 PM).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | cgt-rates-property-2026-27-current-rates-explained | REWRITE | self — rewrite in place |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | No collision — pillar covers comprehensive policy, this page covers rates+planning. Forward-link both ways. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances (Session C #17) | Disposal mechanics | **Important:** notes from #17 rewrite say "Pivoted to disposal mechanics (sibling owns rates), 60-day reporting depth". **This page IS the sibling that owns rates.** Cluster positioning already resolved at rewrite pass — clean. |
| Excluded (rewritten 2026-05-21) | cgt-annual-exempt-amount-3000-allowance-2026-27 (Session 0 #14) | AEA depth | No collision — AEA depth is separate page. This page references AEA briefly + forward-links. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | No collision — that page is the worked-calculation guide. This page references calc briefly + forward-links. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | 60-day deadlines | No collision — that page is the deadlines guide. This page references 60-day rule briefly + forward-links. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting reliefs | No collision — gifting is a relief application. This page references reliefs and forward-links. |
| Residual (intra) | 60-day-cgt-reporting-property-sales-complete-guide / -rule | Intra-residual near-duplicates | NO collision with this rates page. **But** those two near-duplicate each other (Phase 2 cluster audit). |
| Residual (intra) | capital-gains-tax-selling-rental-property-uk | Generic CGT-on-sale | Potential overlap but slug is generic; semantic check at Phase 2. |
| Wave 5 (in-flight) | No collisions with VAT/devolved/Form 17 candidates | — | None — CGT cluster untouched by Wave 5. |
| Wave 6 (in-flight) | Capital allowances + SBA + FYA bucket — Session C in pre-launch | — | No direct collision (CA different from CGT) but cross-link opportunity in incorporation comparison section. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Cluster positioning was already resolved at 2026-05-21 rewrite pass — this page is intentionally the rates+planning sibling.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link target; rewrite must add reciprocal forward-link
- **Disposal mechanics sibling:** `capital-gains-tax-property-sale-uk-2026-rates-allowances` — bidirectional
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from §"Annual Exempt Amount and Planning"
- **Calculation walkthrough:** `cgt-calculation-selling-buy-to-let-property-step-by-step` — forward-link from §"Calculating Your CGT Liability"
- **60-day deadlines:** `cgt-payment-deadlines-property-sales-2026` — forward-link from §"Record Keeping, Returns and Deadlines"
- **PPR:** `principal-private-residence-relief-landlords` (residual) — forward-link from §"Reliefs"
- **Section 24:** `claim-mortgage-interest-rental-property-uk-section-24` (rewritten) — forward-link from §"Planning Strategies and Timing"
- **2027 rates pages:**
  - `2027-property-income-tax-rates-landlords-uk` (rewritten pillar)
  - `2027-property-tax-rates-section-24-relief-uk-landlords` (residual; Track 2A brief #3 trial pick)
  - Forward-link to both from §"Planning Strategies and Timing" / April 2027 paragraph
- **Incorporation comparison:** `buy-to-let-limited-company-complete-guide-uk` (rewritten) — forward-link from §"CGT for Non-UK Residents and Companies"

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified via `house_positions.md` and gov.uk page WebFetch confirming 18%/24% effective 6 April 2026 + £3,000 AEA for 2026/27]: primary lock. Page must match exactly.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY at execution per §16.22 Bill-vs-enacted drift discipline — gov.uk CGT rates page does NOT mention April 2027 changes, which suggests rates may still be Bill-form; F-2 pattern from trial brief #3 applies]: any 22/42/47 reference in the rewrite must be hedged with "announced 30 October 2024 Budget, pending Finance Act 2026" unless §7 confirms enacted status at execution.
- **§17 Leaving the UK / expat** [LOCKED]: NRCGT 60-day reporting cross-reference at §"CGT for Non-UK Residents and Companies".
- **§21 LtdCo + FIC mechanics** [LOCKED, Wave 4]: incorporation comparison framing in the same section. CIHC citation = CTA 2010 s.18N per §16.3 / §21.7 do-not-write list (never s.34).
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; NO FHL-BADR as if alive (FHL abolition transition).

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — F-5 STALE_FIGURES (Bill-vs-enacted assertion).** Line 80 of source asserts "From April 2027, **property income will be taxed at different rates** (22% basic, 42% higher, 47% additional)" as a fact. Per §16.22 / §16.27 / §16.30 / §16.33 / F-2 (from trial brief #3), this is the **fifth consecutive instance** of unhedged Bill-form rate assertion in the program. Cross-check: gov.uk CGT rates page (verified via WebFetch 2026-05-23) does NOT mention April 2027 changes, supporting the hypothesis that the rates remain Bill-form.

Execution session MUST:
- Re-verify §7 lock status against legislation.gov.uk (Finance Act 2026 enacted? Or still Bill-form?)
- Hedge with date-stamp citation if Bill-form
- Assert with date-stamp citation if enacted via Finance Act 2026

Flag to `track2_site_wide_flags.md` as **F-5 | 2026-05-23 18:00Z | HIGH | cgt-rates-property-2026-27-current-rates-explained | STALE_FIGURES | Unhedged April 2027 22/42/47 rate assertion at body line 80. Fifth consecutive instance of §16.22 Bill-vs-enacted pattern. Cross-check gov.uk supports Bill-form status (gov.uk does not mention April 2027 changes). Hedge at execution.**

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/4 | 200 OK but **operative wording removed** (substituted by Finance Act 2019). **Citation needs to point to the substituted section** — likely TCGA 1992 s.1H + s.1I + s.4BA. Verify exact current section at execution. | CGT rates statute (post-FA 2019 rewrite) |
| https://www.gov.uk/capital-gains-tax/rates | **200 OK + verified content** — title "Capital Gains Tax: what you pay it on, rates and allowances" — states £3k AEA for 2026/27, 18%/24% effective 6 April 2026, **does NOT mention April 2027 changes** | Cross-reference (we LINK to gov.uk for users who want gov.uk authority — converting impression-loss to controlled link-out) |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual | Verify at execution (not in this trial's fetch budget) | HMRC CG Manual main page |
| HMRC CG10000+ (introduction) — verify exact path at execution | Defer — historical PIM4101 hallucination caught earlier suggests verify-don't-guess for manual section numbers | CG Manual intro |
| Autumn Budget 2024 (30 October 2024) — exact gov.uk publication URL — verify at execution | Verify at execution | Cite for April 2027 announcement (if hedging) |
| Finance Act 2026 (if enacted by execution date) — verify exact citation | Verify at execution | Cite for §7 if locked |

**(Execution session selects 4-5 to actually cite in body.)**

---

## Universal rules (do not skip)

(Same as Wave 5 brief. Critical for this brief: NO em-dashes. NO pricing. Anonymised social proof only. LeadForm auto-injected. House position §7 hedge MANDATORY.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `docs/property/house_positions.md` §5, §7, §17, §21 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting).
3. Read this brief end-to-end.
4. **Verify §7 (April 2027 surcharge) LOCK STATUS** against legislation.gov.uk. This is the load-bearing pre-rewrite verification step.
5. Re-fetch the 3 competitor URLs to confirm liveness at execution (httpx with proper User-Agent).
6. Read the current `cgt-rates-property-2026-27-current-rates-explained.md` source file in full.
7. Read the 6 closest-existing on-site sibling pages listed above (all rewritten 2026-05-21).
8. Plan rewrite outline: 11-13 H2s, 2,800-3,200 body words, 12-14 FAQs, rates-table-at-top.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + date (update `dateModified` to today). Update metaTitle (test 2-3 candidates against highest-impression query order — "uk cgt rates residential property 2026" word order). metaDescription specific (named planning angle + worked-example promise + free-call hook).
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Run six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve.
12. Confirm no redirect needed (none — slug kept; this is the intentional rates-explainer sibling).
13. Update `monitored_pages` Supabase row (already exists from 2026-05-21 rewrite pass? verify; if existing, update `rewrite_date` to today + extend monitoring window by 90 days from today).
14. Commit on `main`: `git commit -m "Track 2A: rewrite cgt-rates-property-2026-27-current-rates-explained (CTR-fail + intent-mismatch lift)"`. Tracker edits to main repo file via absolute paths only.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with any new discoveries.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA): __
- §7 April 2027 — lock status at write: __ Bill-form (hedge) / __ enacted via Finance Act 2026 (assert with citation)
- §17 NRCGT 60-day: __
- §21 CIHC citation (s.18N, never s.34): __

### Comparison: before vs after
- Word count: 1,565 → __
- H2 count: 7 (+ 4 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 2 → __
- Rates table at top: 0 → __ (1 expected)

### CTR-lift hypothesis test
- Pre-rewrite GSC CTR baseline (2026-02-22 to 2026-05-23): 1 click / 895 imp = 0.11%
- Post-rewrite expected CTR (target): 0.5-1.0% (5-10× lift)
- Verify at +30 / +60 / +90 days post-rewrite via monitored_pages detector

### Flags raised
- F-5 (carried from brief): hedge / assert decision recorded with §7 lock-status verification: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)

---

## Trial-phase comparison: airbnb (data-skipped) vs cgt-rates (data-complete)

This brief is the gold reference. Compare with `briefs/property/track2/airbnb-tax-uk-short-term-rental-income-taxed.md` (the structure-only trial brief). The two briefs have identical structure (same §sections, same workflow, same conventions). The difference is **data presence**:

| Section | Airbnb brief | This brief |
|---|---|---|
| Current page snapshot | Eyeballed | Pulled from `page_content_map` |
| GSC angle | "Pending Supabase pull" with SQL query plan | 25 real queries, real impressions, real positions, real CTR, pattern analysis |
| Competitor URLs | Named, "pending live verification at execution" | 3 WebFetched live, 200 OK, content signals captured |
| Authority links | Named, unverified | TCGA 1992 s.4 = empty (FA 2019 substitution caught), gov.uk/capital-gains-tax/rates = live + content verified, others flagged for execution-time fetch |
| Cannibalisation table | Slug-as-proxy reasoning | GSC primary-query match against cluster siblings |
| Gap-mode diagnosis | Eyeballed DEPTH | DEPTH + CTR-FAIL + INTENT-MISMATCH (new sub-class surfaced by real data) |

**Implication for Phase 2 prompt:** the Stage 2 sub-agent prompt should explicitly require this depth of data integration, not the airbnb-level structural completeness. Update §9 sub-agent dispatch pattern in `TRACK2_PROGRAM.md` to reference this brief as the match-target.
