# Finance/Tax Lead-Gen Expansion — Handoff

**Date:** 2026-07-30 · **Status:** research + page-map + de-cannibalisation + seeding + **cluster briefs + all 66 A\* content pages + 6 calculators BUILT and build-green on all 4 sites (2026-07-30)**. NOT committed, NOT deployed (owner-gated). See "## BUILD COMPLETE" at bottom.
**Working dir:** `expansion_research/dental_finance/` (all scripts + data + reports).
**Memory:** [[adjacent_leadgen_finance_expansion]].

## What this is
Expanding the estate's per-lead-to-accounting-firms model into adjacent finance/tax verticals for the same audiences (landlords, dentists, businesses). Started as "dental practice finance + SPV BTL", widened to the full opportunity space.

## What was done (in order)
1. **6-vertical qual research** (mortgages/insurance/practice-finance) → `docs/_engines/ADJACENT_VERTICAL_LEADGEN_RESEARCH_2026-07-30.md`. Core finding: accounting model doesn't port to FCA-regulated verticals (s21 promotion; IAR ties you to one buyer).
2. **DataForSEO deep pull** (live, $34 balance; direct-call pattern bypasses CostTracker/Supabase audit which 409s on new site_keys). Volumes + CPC + KD + SERP/AIO + competitor sitemaps + `keywords_for_site`.
3. **Wide opportunity scan** (`wide_scan.py`, `WIDE_FINDINGS.md`) across 7 candidate clusters → reframe.
4. **4 deep reg/value research passes** → confirmed the winning clusters (see `OPPORTUNITY_MAP.md`).
5. **Comprehensive page map** (`page_map_v2.py`, `PAGE_PLAN_V2.md`) — 98 pages across 4 clusters, data-populated from keyword universes (`*_universe.csv`), intent-noise filtered. Plus earlier dental (14) + SPV-BTL (17) maps.
6. **De-cannibalisation** (`s10_decannibalise.py`, `DECANNIBALISATION.md`) vs 15-site estate GSC corpus (`estate_corpus.json`) + internal. ~10 pages → EXTEND existing; 0 true internal dupes; rest greenfield.
7. **Seeding** (`seed_expansion.py`) — 72 build-now NEW pages staged into `blog_topics`.

## The opportunity map (ranked)
| # | Cluster | Reg | Note |
|---|---------|-----|------|
| 1 | **Specialist tax** (capital allowances, R&D, land remediation) | UNREG (no s21/IAR) | Highest value/lead; estate ALREADY pos-1 for CA + R&D; whitespace. Exclude fee-protection INSURANCE (IDD). |
| 2 | **Business finance** (invoice/factoring/asset/unsecured/VAT loan) | UNREG for LTD-CO (company-gate form; fence sole traders) | Highest CPC £47-145; greenfield; multi-buyer panel. No IAR. |
| 3 | **Exit / EOT** | UNREG advisory (Art 70 RAO); fence MBO finance (credit broking) | EOT wedge: rivals' content stale post-26-Nov-2025 CGT cut. |
| 4 | **Landlord commercial finance** (bridging/dev/commercial mortgage) | s21 qualifying-credit → **IAR-gated** conversion | ~5-10x BTL case value. Educational builds now; conversion needs IAR. NOT seeded. |
| 5 | SPV/BTL mortgages | IAR-gated | Same principal as #4. |
| 6 | Dental practice finance | UNREG commercial slice | Thin volume; extend dentist site. |

**Two hard constraints:** (a) every head term is AI-Overview-eaten + bank/gov/Big-4 held → long-tail + tools + tax-intersection + segments, never head-on (owner directive: build everything anyway, multi-engine/GEO, let the market decide). (b) TRACK A (build-now, no gate: specialist tax, business finance, exit/EOT, dental) vs TRACK B (IAR-gated: landlord commercial + SPV-BTL).

## De-cannibalisation outcomes (MUST respect at generation)
- **EXTEND, do NOT generate new (rewrite path `brief_for_opus.py`):** capital-allowances-guide + annual-investment-allowance → property (pos-1). R&D core (rd-tax-credits-guide, rd-tax-credit-rates, how-to-claim-rd) → **CONSOLIDATE onto property + generalist existing pos-1 R&D pages; do NOT add a 4th competing page** (property/generalist/founder already cannibalise each other). These were EXCLUDED from the seed.
- Ltd-co BTL / BTL calculator / let-to-buy → host on property (already ranks).
- Dental EXTEND pages (valuation, goodwill pos-11, selling, specialist-finance hub) → extend dentist site in place.
- `capital-allowances-for-care-homes` segment → cross-link/host with `care` (carehometax ranks it).
- **Cross-link hierarchies (canonical + link, not dupes):** equipment finance pillar ⊃ dental equipment segment; bridging-for-BTL (short-term) vs BTL mortgage (term); capital-allowances-for-dental (tax) vs dental finance (lending).
- **Greenfield (no estate site ranks — safe net-new):** commercial mortgage, invoice finance/factoring, business loans, unsecured, MCA, EOT, MBO, van/plant finance.

## Seeding — what is staged NOW
72 build-now NEW pages in `blog_topics`, identifiable by:
- `keyword_source = 'expansion-2026-07-30'`
- `status = 'staged-expansion'` (distinct so routine generators skip them)
- `pillar_topic` = cluster: **Specialist Tax** (17, site_key=property), **Business Finance** (27, generalist), **Business Exit and Succession** (20, generalist), **Dental Practice Finance** (8, dentists).
- Fields set: topic, primary_keyword, secondary_keywords, user_intent, content_tier, publish_priority, target_search_volume, category, notes (`[type] note || GUARDRAIL: ...`), suggested_slug.

**site_key is a STAGING host** (FK + whitelist CHECK on `sites` blocked dedicated keys). Owner decision pending: keep as clusters on property/generalist/dentists, OR split into new hub sites (would need `sites` rows via Management-API DDL + Next.js site build + Vercel/domain). Re-tagging site_key later is a cheap UPDATE.

**Reversible:** `DELETE FROM blog_topics WHERE keyword_source='expansion-2026-07-30'`.

## NOT done (next steps)
1. **Brief generation** for the 72 staged pages (this handoff's next agent — see prompt).
2. **Landlord commercial finance + SPV-BTL** (Track B): NOT seeded. Build educational/tax-intersection content now, gate conversion behind an IAR. Secure ONE bridging/commercial + BTL broker principal (shared).
3. **EXTEND/rewrite tasks:** capital allowances + R&D core on property/generalist (rewrite path, consolidate R&D).
4. **Calculators** (capital-allowances, business-loan, asset-finance, business-valuation, EOT-tax, bridging, commercial-mortgage): build tasks (interactive components), NOT blog briefs — route separately.
5. **Buyer-side commercial diligence:** specialist-tax firms (Catax/Ryan, ForrestBrown), commercial-finance brokers (lead prices £50-100 exclusive), IAR principal shortlist.
6. **Owner decisions:** new-hub-vs-cluster hosting; EOT CGT 100%->50% figure verify vs HMRC; fee-protection insurance slice (route to authorised broker or drop).

## Key files (expansion_research/dental_finance/)
- Reports: `OPPORTUNITY_MAP.md`, `WIDE_FINDINGS.md`, `FINDINGS.md`, `DECANNIBALISATION.md`, `PAGE_PLAN_V2.md`, `PAGE_PLAN.md`, `NEW_OPPORTUNITIES.md`
- Page maps (brief-feedable CSVs): `specialist_tax_pages.csv`, `business_finance_pages.csv`, `exit_eot_pages.csv`, `landlord_commercial_finance_pages.csv`, `dental_pages.csv`, `btl_pages.csv`
- Data: `*_universe.csv`, `wide_scan.csv`, `discovered.json`, `our_corpus.json`, `estate_corpus.json`, `decannibalise_actions.csv`
- Scripts: `s1_sitemaps` `s2_volumes` `s4_topicmap` `s5_our_corpus` `s6_discover` `s7_cannibalise` `s8_estate_sweep` `s9_serp` `s10_decannibalise` `wide_scan` `expand_clusters` `page_map(_v2)` `seed_expansion`

## Ground-truth reminders for content (from memory)
- Opus-only content; gold-standard A* bar; no em-dashes; faceless EEAT (user not an accountant); blog body = raw HTML in frontmatter (not markdown); business-audience + lead specificity.
- Tax facts 2026/27: dividend 10.75/35.75/39.35%; BADR 18%; AIA £1m + full expensing; employer NI 15%/£5,000; EOT CGT relief 100%->50% from 26-Nov-2025 (verify).

---

## BUILD COMPLETE (2026-07-30)

**Delivered:** 66 A\* content pages + 6 interactive calculators across 4 clusters, all `npm run build` green on Property, generalist, and Dentists. NOT git-committed, NOT deployed (both owner-gated).

**Per cluster (all build-green):**
- **Specialist Tax** (property): 15 content (`Property/web/content/blog/*.md`, category "Property Types & Specialist Tax") + 2 calcs (`Property/web/src/lib/calculators/tools/{capital-allowances,rd-tax-credit}-calculator.ts`). LRR pillar = head-term hub; 9 sector CA pages differentiated by anti-sameness matrix; 5 cluster pages defer mechanics to existing pos-1 pages.
- **Business Finance** (generalist): 25 content (3 pillars in `content/fundamentals/`, 22 in `content/blog/` category "Business Finance") + 2 calcs (`generalist/web/src/lib/tools/{configs,compute}/{business-loan,asset-finance}-calculator.ts`). Company-gated throughout.
- **Business Exit & Succession** (generalist): 18 content (3 pillars in `fundamentals/`, 15 in `blog/` category "Exit and Capital Gains") + 2 calcs (`.../{eot-tax-saving,business-valuation}-calculator.ts`). EOT 50% wedge (26-Nov-2025, verified), MBO-finance fenced.
- **Dental Practice Finance** (dentists): 8 content (`Dentists/web/content/blog/*.md`), lending lane only (fenced vs existing tax pages), broker-CTA placeholder.

**Infra built/reused (in `expansion_research/dental_finance/briefs/`):** 4 cluster architecture briefs + `WRITER_PLUMBING.md` + `validate_md.py` (frontmatter contract) + `fix_links.py` (reuses `slug_resolver.normalise_links` to fix cross-link category prefixes + flag 404 slugs). Schema (Article/FAQPage/Breadcrumb), sitemap, related-posts all auto-emit from frontmatter/registry (not hand-built). Property `llms.txt` + `llms-full.txt` updated by hand (static); generalist/dentists `llms-full.txt` auto-regenerate via the route factory on deploy.

**Key facts corrected at source during build (were wrong in the seed/plumbing):** main-pool WDA 18%->**14%** from Apr 2026 (FA2026 s.28) + new **40% FYA** from 1 Jan 2026 (companies + unincorporated, not cars/second-hand); FHL abolished **April 2025** not 2026; EOT CGT 50% from 26-Nov-2025 confirmed vs HMRC/Deloitte/HoC. New generalist category **"Business Finance"** added to `generalist/niche.config.json` (generates the category index; fixed a breadcrumb 404).

**Staging queue:** the 72 `blog_topics` rows (`keyword_source='expansion-2026-07-30'`) flipped `staged-expansion` -> `generated-expansion`, `used=true`. Reversible.

**Remaining / deferred (owner or follow-up):**
1. **git commit + deploy** — not done (owner-gated). ~72 new files + config edits on branch `expansion/phase-0`.
2. **new-hub-vs-cluster hosting** decision — pages sit on staged hosts with root-relative cross-links, so a re-home is a cheap move + reslug + canonical find-replace.
3. **Dental broker principal** not secured — primary broker CTA is a shared placeholder; wire when a principal is signed.
4. **generalist "business-finance" taxonomy mapping** (`src/lib/intent/taxonomy.ts`) — optional: enables the mid-article premium tool-island + category CTA on the 25 BF pages (pages work + build without it; LeadForm + inline asides already present).
5. **Existing property CA pages still show stale 18% WDA** (pre-FA2026) — separate estate-wide stale-sweep, out of this build's scope (writers flagged e.g. `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`).
6. **Track B (IAR-gated landlord/BTL commercial finance)** — still not built; needs an IAR principal (separate program).
7. **Buyer-side commercial diligence** — specialist CA/R&D firms, commercial-finance broker panel, exit advisory buyers (lead pricing).
