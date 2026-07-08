# AGY-F8 — Cohort Quality Assessment (26 crawled-not-indexed / deindexed URLs)

Site: www.agencyfounderfinance.co.uk. Date: 2026-07-08. Author: F8 assessor (read-only pass over every cohort page). Bar: gold-standard A* (genuinely authoritative, not thin/templated/AI-scammy). No edits made.

## Headline finding (read this first)

**The cohort is not thin and it is not templated.** All 17 blog posts run 2,200–3,400 words, each carries an agency-specific angle with named worked examples (real £ figures, sector scenarios), correct FA-2026 figures (dividend 10.75/35.75/39.35, BADR 14% now → 18% Apr-2026, employer NIC 15%/£5,000, merged R&D scheme 20%), full JSON-LD (Article + FAQ + Breadcrumb), and genuine internal links. No near-duplicate pairs found even inside the tight SRT/PE/UK-day cluster (each takes a distinct sub-topic). Zero stale-figure hits across the 17 (the one `£9,100` match is a fabricated GCP cost line, not a stale NIC threshold).

**This directly loads the synthesis's falsification fork (§3d/§7).** Root cause #2 (content-quality triage) predicts this cohort should read as "generic tax advice wearing an agency label." It does not — at the individual-page level it reads as strong, differentiated, agency-native content. That is evidence the cohort was deindexed/skipped by **crawl-budget + weak-authority triage (root cause #1)**, not per-page quality. F8 should therefore ship a *very small* strengthening tranche (marginal-gain polish only), and the real signal test is whether these pages recover from Batch A crawl-hygiene alone. If they do, quality was never the operative cause and F8 can be closed.

## Per-page verdict table

| # | Route / slug | Type | Words | Verdict | Why |
|---|---|---|---|---|---|
| 1 | /agencies/creative-agencies | vertical (tsx) | ~126 lines | FINE | Real service copy + 3 substantive FAQs (valuation multiples, alphabet shares, software) + Service/FAQ schema. Adequate; non-index is authority, not quality. |
| 2 | /calculators/salary-dividend-optimiser | tool (config) | interactive | FINE | Genuine interactive calc: models CT+employer NI+employee NI+income tax+dividend tax together, Employment Allowance toggle. Real utility. Nit: config mixes "2025/26" and "2026/27" labels — cosmetic, fold into F14. |
| 3 | /blog/tax-and-compliance | category hub | intro+cards | STRUCTURAL (minor) | SSR intro (CT/VAT/HMRC-deadline sections, real copy) + SSR `<Link>` post cards + lead form. Crawlable, not a pagination shell. Thin *as a page type* (hub), not defective. Leave; recovers with authority. |
| 4 | /blog/incorporation-and-structure | category hub | intro+cards | STRUCTURAL (minor) | Same pattern as #3. Fine hub, inherently light. |
| 5 | what-is-aia-in-tax | blog | 2601 | FINE | AIA vs full-expensing, £1m limit calc, agency-equipment framing, Sources section. Correct FA-2026. |
| 6 | accountants-role-agency-exit-planning | blog | 2211 | FINE | Exit/valuation angle, agency-specific. Adequate; shortest of the 17 but still substantive. |
| 7 | attribution-tool-r-and-d-tax-credit-performance-marketing-agency | blog | 2830 | FINE | R&D on attribution tooling for perf-marketing agencies; merged-scheme note correct; worked example. |
| 8 | automate-mtd-itsa-updates-agency | blog | 2242 | FINE | MTD-ITSA automation, agency-native. Correct thresholds. |
| 9 | does-fine-tuning-llm-qualify-rd-tax-credits | blog | 2658 | FINE | Strong: 3 agency scenarios (PR sentiment / regulated chatbot / MENA CV screening), qualify-vs-not lists, merged-scheme worked example. Genuinely authoritative. |
| 10 | dubai-agency-setup-visa-sponsorship-solo-founder | blog | 3140 | FINE | International cluster; solo-founder sponsorship angle, distinct from siblings. |
| 11 | dubai-free-zone-agency-uae-corporate-tax-return-loss | blog | 3054 | FINE | Free-zone loss/CT-return angle; distinct. |
| 12 | dubai-freelancer-vs-company-for-agency | blog | 2668 | FINE | Freelancer-vs-company decision framing; distinct. |
| 13 | dubai-golden-visa-uk-citizens-revenue-threshold-agency-founders | blog | 3167 | FINE | Exemplary: revenue-route-not-property angle, side-by-side table, correct dividend rates, SRT/substance/transfer-pricing cautions. A* already. |
| 14 | missed-mtd-filing-deadline-penalties-appeals-mitigation | blog | 3005 | FINE | Penalties/appeals/mitigation depth; agency-framed. |
| 15 | pay-yourself-agency-feast-famine-income | blog | 2864 | FINE | Feast-famine cashflow pay angle — genuinely agency-specific, not generic salary/dividend. |
| 16 | prepare-financials-due-diligence-agency-sale | blog | 2889 | FINE | DD-prep for agency sale; buyer-lens detail. |
| 17 | rd-claim-cloud-compute-aws-gcp | blog | 2819 | FINE | Strong: tagging vs time-apportionment methods, detailed worked example, qualify/not lists, merged+ERIS note. A*. |
| 18 | srt-flowchart-deferred-revenue-agency-founders | blog | 3108 | FINE | SRT × deferred-revenue interaction — a genuinely novel intersection. Distinct from #20/#21. |
| 19 | uae-corporate-tax-rate-small-business-relief-agency-founders | blog | 2762 | FINE | UAE CT + small-business-relief specifics; distinct. |
| 20 | uk-permanent-establishment-for-uae-company-agency-founders | blog | 3389 | FINE | PE risk + UK-UAE treaty Art.5 depth; distinct angle. |
| 21 | what-counts-as-a-uk-day-statutory-residence-test-agency-founders | blog | 3103 | FINE | Day-counting mechanics, 16-day-trap example; distinct from #18/#20. |
| 22 | glossary/aia | glossary def | ~250w | STRUCTURAL (fine) | Substantive agency-framed def, correct £1m/FA-2026. Non-index is glossary-type thinness + 100% orphan, not defect. |
| 23 | glossary/vat-threshold | glossary def | ~250w | STRUCTURAL (fine) | Same; nit: check £90k threshold labelling on refresh. |
| 24 | glossary/gross-margin | glossary def | ~250w | STRUCTURAL (fine) | Substantive, agency utilisation framing. |
| 25 | glossary/cis | glossary def | — | SKIP | Already removed today (off-brand CIS leakage fix, AGY-F6). |
| 26 | founder-stories/creative-agency-badr-exit | founder story | data.ts | STRUCTURAL (minor) | Anonymised social-proof case study (data-driven component). Fine as type; 100%-orphan + young-domain = why unindexed. |

**Counts:** FINE 17 · STRUCTURAL 6 (2 hubs + 3 glossary + 1 founder-story; all "fine-but-inherently-light") · STRENGTHEN 0 (no thin/templated/near-dup page found) · SKIP 1 (cis, already handled).

## Pattern analysis

1. **No quality defect at page level.** The corpus is well above the AI-scammy floor. Whatever is keeping it out of the index is upstream of content (crawl budget / domain authority — synthesis root cause #1), confirmed by the same-age generalist sibling out-indexing 13x.
2. **International/Dubai cluster (8 of 26) is NOT templated.** Each of the 8 takes a genuinely different sub-question (golden-visa revenue route, free-zone loss CT, freelancer-vs-company, PE risk, SRT day-count, SRT×deferred-revenue, small-business-relief, solo-founder sponsorship). This was the most likely place to find near-dup slop; it is clean. Do not collapse.
3. **The two structural page *types* are the only "thinness," and it is inherent, not fixable by rewriting.** Category hubs and glossary defs are light by design; both are 100%-orphaned (per inlink_read) and on a budget-starved domain that is enough to keep them unindexed. The fix for these is linking (AGY-F7) + authority (F11), not content.
4. **Zero stale figures, correct FA-2026 throughout.** AGY-F9's stale-sweep hit-list does **not** intersect this 26-page cohort — the sweep lives elsewhere in the 400-page estate.
5. **One cosmetic factual nit only:** salary-dividend calc config labels both "2025/26" and "2026/27" — fold into F14, not F8.

## Prioritised strengthening worklist (for Sonnet briefing)

The honest recommendation is **F8 is near-empty**: there is no thin/templated page to overhaul. Ship Batch A (crawl hygiene) and watch — if the cohort recovers, close F8. The items below are *marginal-gain* only, worth doing while writers are warm but not load-bearing for indexing:

| Priority | Page(s) | What it needs | Scope |
|---|---|---|---|
| 1 | accountants-role-agency-exit-planning (#6) | Shortest of the 17 (2211w) and generic-leaning vs its siblings — add 1 agency-specific worked valuation example + a unique data point (EBITDA-multiple range by agency type, which the site already benchmarks elsewhere) to lift it clear of generic exit-planning content | S |
| 2 | attribution-tool-… (#7) & automate-mtd-itsa-updates (#8) | Both solid but the most "mechanics-forward"; add one concrete agency mini-case each so they carry a first-party angle no HMRC page has | S each |
| 3 | 2 category hubs (#3/#4) | Not a rewrite — add 2–3 curated internal links + a one-line unique intro proposition per hub so they are less obviously template shells (this is really AGY-F7 work) | S |
| 4 | 3 glossary defs (#22/#23/#24) | Leave content; give each ONE contextual inlink from a related blog body (AGY-F7) so they have a non-sitemap recovery path. No text change needed. | XS |
| 5 | Cross-cohort "first-party data" injection | The single highest-leverage lift for the whole cohort is a shared, reusable **agency benchmark data block** (margins/valuation multiples/R&D-claim sizes by agency type) dropped into the 6–8 exit/R&D/margin posts — turns "correct generic advice" into "cited proprietary data," which is exactly the crawl-worthiness signal root-cause #1 needs. This overlaps AGY-F11 (faceless data-PR) more than F8. | M (build once, embed many) |

**Do NOT** rewrite the Dubai cluster, the golden-visa/PE/SRT posts, the R&D-cloud/LLM posts, or the calc — they are already A*.
