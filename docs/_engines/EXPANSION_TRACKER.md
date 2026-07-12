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
| R3 pilot deep research (charities) | done | dossier under `expansion_research/pilot_charities/`; 29 wave1 briefs VERIFIED + committed (figures vs house_positions, all 19 citation URLs live-fetched) |
| R4 pilot brand shortlist | done, awaiting G1 | RDAP-verified shortlist → owner picks + registers (G1) |
| R3 crypto | **DONE + volume-enriched 2026-07-12** (paid pulls $0.42, folded back) | 53 rivals (22 dedicated); 1,418 clusters (272 with volume); no launch pick falsified; HMRC disclosure = top measured money surface (590/mo KD 0) |
| R3 pharmacies | **DONE + volume-enriched 2026-07-12** (paid pulls $0.32, folded back, second-agent verified) | 43 rivals (7 dedicated); 1,227 clusters (37 with volume); buying-a-pharmacy 140/mo confirms purchase wedge; lanop cleared as non-threat; locum content-only confirmed |
| R3 care | **DONE + volume-enriched 2026-07-12** (paid pulls $0.25, folded back) | 41 rivals (12 dedicated); 652 clusters (53 with volume); cqc registration hub 2,900/mo KD 26; FNC calculator promoted to launch tier; dedicated tier nearly invisible in Google — gap thesis strengthened |
| R3 manufacturing | **DONE, checker VERIFIED-WITH-CORRECTIONS; PARK RECOMMENDED — owner to ratify** | 1 dedicated + 37 institutional SECTION rivals; hire family measured 360/mo (re-check $0.37); skynet earns zero hire-intent traffic; CBAM-cluster home needs a ruling if parked |
| R3 ecommerce | **DONE + volume-enriched 2026-07-12** (checker VERIFIED-WITH-CORRECTIONS; paid pulls $0.37, folded back) | 82 rivals (14 dedicated + 47 SECTION under-count + 21 adjacent); 2,329 clusters (50 with volume); 32/32 citations; verdict CONFIRMED: narrower-deeper wedge, build LAST, 14-page core stands; side-hustle/platform-reporting family = 5,910/mo top build surface; TikTok hub folded into marketplace hub (50/mo); **collides with generalist's 6 live "Accountant For [ecommerce]" pages — owner migrate-vs-fence ruling needed** |

## Owner actions needed now

1. ~~Top up DataForSEO~~ DONE 2026-07-11 ($49.79 remaining after R2d's $0.18).
2. Add a `VERCEL_TOKEN` to `.env` (needed at first preview deploy, not blocking yet).
3. ~~G2 niche-list sign-off~~ DONE 2026-07-11 (8 Tier-1 sites).
4. **Pick the charities brand (G1)** — shortlist `expansion_research/pilot_charities/BRAND_SHORTLIST.md`; re-verify RDAP availability before buying. Blocks pilot content + preview.
5. **Top up Serper credits** — exhausted 2026-07-11 (all calls 400); blocks estate-wide SERP sweeps and the dossiers' Google re-sweep TODOs (manufacturing/ecommerce R3 ran DDG-only).

Resolved 2026-07-11 late: stray commit 3a165133 confirmed by owner as his own (other session) — no merge blocker. DataForSEO daily guard ruled automated-only; interactive runs may lift via `DATAFORSEO_ABORT_AT` env (owner ruling; sub-agent ban unchanged).

## Sites

| Site | Niche | Tranche | Stage | G1 brand | G2 research | G3 auto | G4 preview | Blockers | Owner action needed |
|---|---|---|---|---|---|---|---|---|---|
| charities (PILOT) | Charities & non-profits (+CICs) | pilot | **S5 DONE + Supabase seeded** (33 tests green; pilot migration pair APPLIED 2026-07-11, live 'test' source preserved; 1,660 blog_topics rows seeded from R3 pool, 293 with DFS volume) | **G1 DEFERRED by owner** (shortlist ready; re-verify availability before buying) | R3 dossier done | brand gate correctly FAIL | - | content + preview deploy gated on G1 | pick brand + BUY domain (G1) |
| hospitality | Restaurants/pubs/takeaways/hotels | 1 | **R4 + S2-S5 done 2026-07-12** (30 tests green; Openings & Closures Index run for real, pub headline 42,280; house_positions checker-verified); next wave-1 briefs (fence 4 generalist-overlap posts at brief level) | shortlist ready (rec: Hospitality Finance Partners, prefix hfp) | R3 done | | | | pick brand (can batch with others) |
| care | Care homes + domiciliary | 1 | **R4 done 2026-07-12**; next S2 (deploy-only hold ~08-03) | shortlist ready (rec: Care Finance Partners, prefix carf) | R3 done | | | | pick brand |
| startups-tech | Startups & tech/SaaS | 1 | **R4 done 2026-07-12**; next S2 | shortlist ready (rec: Founder Finance Partners, prefix ffp) | R3 done | | | Reflex conflict must be ruled before briefs | pick brand + rule Reflex conflict |
| pharmacies | Pharmacy owners (+locums content) | 2 | **R4 done 2026-07-12**; next S2 | shortlist ready (rec: Pharmacy Finance Partners, prefix phfp) | R3 done | | | | pick brand |
| manufacturing | Manufacturing & engineering | 2 | PARK RECOMMENDED — frozen pending owner ratification (no R4 run) | | R3 done | | | owner ratification | ratify/override PARK |
| crypto | Crypto traders & investors | 2 | **R4 done 2026-07-12**; next S2 | shortlist ready (rec: Digital Asset Tax Partners, prefix datp) | R3 done | | | | pick brand |
| ecommerce | Ecommerce/Amazon sellers | 3 | **R4 done 2026-07-12**; next S2 (build LAST) | shortlist ready (rec: Ecommerce Tax Partners, prefix ectp) | R3 done | | | generalist-overlap ruling before briefs | pick brand + rule overlap |

All six R4 shortlists produced 2026-07-12 in one batch (`expansion_research/tier1_*/BRAND_SHORTLIST.md` + `r4_results.json`); every recommended + fallback name independently re-verified RDAP 404 on .co.uk AND .com same day. Owner can pick all brands in bulk.
