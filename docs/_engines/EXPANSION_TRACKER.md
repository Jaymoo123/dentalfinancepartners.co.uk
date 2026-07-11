# Expansion Program Tracker

Single source of program state. Update at every stage transition. Stages S1-S8 and gates G1-G4 defined in [EXPANSION_PROGRAM.md](EXPANSION_PROGRAM.md).

Last updated: 2026-07-11

## Phase 0 (factory hardening) — CODE DONE, committed 939933fa on `expansion/phase-0`

| Item | Status | Notes |
|---|---|---|
| P0-1 brand lint + generator guard | done | estate sweep passes clean; brand_locked guard live (8 live sites exempt) |
| P0-2 spinup extensions + vercel_create_site.py | done | zz-test dry-run verified; VERCEL_TOKEN needed in .env at G4 |
| P0-2b frontmatter_lint/cli new-site support | done | sites/<site>.json fallback; CLI choices auto-discovered |
| P0-4 CI path filter | done | dynamic matrix; full on web-shared/main |
| P0-6 template defect remediation | done | fixed in scaffold; LIVE-site fixes reverted per rule → debt ledger |
| P0-7 program docs | done | this file |
| Vercel CLI install | done | |
| Pilot end-to-end (G0) | pending | after R2 owner sign-off picks the pilot niche |

## Research

| Phase | Status | Notes |
|---|---|---|
| R0 preconditions | done | creds valid, **balance -$0.03 → OWNER: top up DataForSEO**; corpora + exclusion list committed |
| R1 enumeration | done | 89 candidates, `expansion_research/R1_NICHE_CANDIDATES.md`; DataForSEO leg deferred |
| R2 scoring | **SIGNED OFF 2026-07-11** | Owner approved all 8 Tier-1 sites + charities pilot. Final list `expansion_research/R2_NICHE_SCORES_FINAL.md` (recruitment + creative killed by red-team on intent evidence) |
| R3 pilot deep research (charities) | in progress | dossier under `expansion_research/pilot_charities/` |
| R4 pilot brand shortlist | in progress | RDAP-verified shortlist → owner picks + registers (G1) |

## Owner actions needed now

1. ~~Top up DataForSEO~~ DONE 2026-07-11 ($49.79 remaining after R2d's $0.18).
2. Add a `VERCEL_TOKEN` to `.env` (needed at first preview deploy, not blocking yet).
3. UPCOMING: G2 niche-list sign-off once the red-team pass completes.

## Sites

| Site | Niche | Tranche | Stage | G1 brand | G2 research | G3 auto | G4 preview | Blockers | Owner action needed |
|---|---|---|---|---|---|---|---|---|---|
| charities (PILOT) | Charities & non-profits (+CICs) | pilot | **S5 DONE + Supabase seeded** (33 tests green; pilot migration pair APPLIED 2026-07-11, live 'test' source preserved; 1,660 blog_topics rows seeded from R3 pool, 293 with DFS volume) | **G1 DEFERRED by owner** (shortlist ready; re-verify availability before buying) | R3 dossier done | brand gate correctly FAIL | - | content + preview deploy gated on G1 | pick brand + BUY domain (G1) |
| hospitality | Restaurants/pubs/takeaways/hotels | 1 | queued | | | | | | |
| care | Care homes + domiciliary | 1 | queued (after medical watch ~08-03) | | | | | | |
| startups-tech | Startups & tech/SaaS | 1 | queued | | | | | | |
| pharmacies | Pharmacy owners (+locums content) | 2 | queued | | | | | | |
| manufacturing | Manufacturing & engineering | 2 | queued (needs live-SERP confirm in R3) | | | | | | |
| crypto | Crypto traders & investors | 2 | queued | | | | | | |
| ecommerce | Ecommerce/Amazon sellers | 3 | queued (hardest field, most ambitious asset plan) | | | | | | |
