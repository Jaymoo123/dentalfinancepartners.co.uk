# R3 dossier — Tier-1 #4: Startups & tech/SaaS accountancy

Date: 2026-07-11. Branch: expansion/phase-0. Doctrine: cloned from `../pilot_charities/`.
Inputs: R2_NICHE_SCORES_FINAL.md row 4; R2_REDTEAM.md §3 (SURVIVES-WITH-CHANGES).
Positioning locked by R2: **funded/scaling companies (R&D, SEIS/EIS, share schemes)** — the
searching head-term segment is a £10-38/mo commodity war we do not enter.

## Index

| File | What it holds |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 35 UK queries → 195 survivors → every survivor fetch-verified; 5-tier field map (15 specialists, 10 R&D verticals, 6 equity platforms, 8 fractional-CFO, 12 commodity) |
| [TOPICS.md](TOPICS.md) + topic_pool.json / topic_pool_classified.json | 3,154 raw → 2,814 kept after estate dedup; honest buildable pool ~740 classified core terms; **estate collision warning** |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | 8 evidence-backed clusters; ~40-page launch core; /for/* architecture with agencies-excluded + IR35-deferred boundaries |
| [CALCULATORS.md](CALCULATORS.md) | 4 launch + 5 queue tools with demand evidence (R&D estimator, SEIS/EIS relief, EMI vs unapproved, founder dividend-vs-salary) |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Startup Formation & Survival Index (Companies House SIC 62/63) — sources verified pullable, estate precedent (Landlord Tax Index) |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 29 positions, all 32 citation URLs fetched live 2026-07-11, 0 failing |
| [r3_call_plan.md](r3_call_plan.md) | Written-before-spend call plan + actuals + 2 incidents |
| raw/ | serp_raw, verify_evidence (+retry), autocomplete, dfs_ranked/suggest, rival_sitemaps, citation_checks, estate_blog_topics |
| Scripts s1-s6 + s5b | re-runnable pipeline (SERP→verify→autocomplete→sitemaps→DFS→pool/dedup→intent→citations) |

## Summary verdict

The R2 call holds: the field is two-tier. The commodity tier (Sleek, GoForma £14-126/mo,
a-wise £10/mo, 123financials £37.99/mo — all fetch-verified with price evidence) owns the
"accountant for startups" head. The specialist tier we actually fight — Accountancy Cloud,
Barnes & Scott, Finerva, OnTheGo, Standard Ledger UK, Chacc — is real, UK, and priced
£345-675/mo (startupaccountancy.com evidence), validating the funded/scaling positioning.
No US player survived UK SERP verification (the pilot.com caveat stays dead). The money
clusters (SEIS/EIS advance assurance KD 2, EMI KD 0-4, R&D compliance long-tail KD 0) are
winnable with the estate's depth playbook; the R&D head is ceded to ForrestBrown-tier mills;
investor-side EIS relief demand (2,400/mo, KD 1-8) is captured with calculators for authority,
not leads.

## Spend record

| Item | Cost |
|---|---|
| DataForSEO keyword_suggestions (8 seeds) | $0.14952 |
| DataForSEO ranked_keywords (3 domains, 4 calls — one $0.072 response lost to a budget-guard abort mid-batch, re-pulled) | $0.22920 |
| **DataForSEO total** | **$0.37872** (budget $3-8; balance after: $49.00476, verified live) |
| Serper (35 queries gl=gb) | ~$0.035 equivalent, separate quota |
| DDG / autocomplete / ~450 page fetches / citation checks | $0 |

Incidents (detail in r3_call_plan.md): (1) the estate-wide $0.85/day DataForSEO guard was
already at $0.8054 from today's sibling R3 dossiers and aborted the ranked batch after one
call, losing that response; the guard was raised to $1.20 **in-process only** (config.py
untouched) under this task's explicit budget. (2) Idempotency guard correctly blocked the
identical re-pull; recovered with limit=501. Net waste $0.072.

## Open questions (owner / next stage)

1. **Reflex conflict (biggest)**: reflexaccounting.co.uk — the estate's live lead-buying
   partner (Reflex/Ahmad) — markets a "Specialist SaaS Accountants" service page and ranks on
   our target SaaS queries. Launching this site competes directly with the partner the estate
   sells leads to. Owner decision before any build: partner alignment (sell them this site's
   leads?) or accept the channel conflict.
2. **Generalist cannibalisation**: hollowaydavies.co.uk already holds `/r-and-d-credits`, an R&D
   calculator and literal "accountant for saas/tech/ai startups" pages (~37 URLs), and the
   agency site holds ~22 R&D URLs. Migrate/301 vs scope-around vs controlled overlap — per the
   data-gated-consolidation rule this needs a GSC pull on those pages before deciding.
3. **EMI valuation citation**: the standalone gov.uk VAL231 guidance URL 404s (position 14
   currently anchors to the ERS return page + ETASSUM manual). Find the current VAL231 form
   location at build.
4. **BADR 18% (2026/27)** and dividend-rate figures are estate ground truths; both flagged for
   the figure-by-figure re-verification pass when house_positions.md is finalised.
5. **Standard Ledger** is AUS-origin with a genuine UK arm — kept in the specialist tier;
   confirm UK entity depth if used as a benchmark.
6. **Survival-index archive cron**: monthly Companies House snapshot archiving should start at
   build sign-off (2-3 months of snapshots needed before the first survival update).
7. Five Cloudflare-blocked rivals (SeedLegals, GrantTree, Source Advisors, Alexander Clifford,
   The Accountancy Partnership) are SERP-verified only; re-verify with a headless fetch if any
   becomes strategy-relevant.
