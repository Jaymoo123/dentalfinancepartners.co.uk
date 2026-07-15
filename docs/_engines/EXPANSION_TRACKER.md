# Expansion Program Tracker

Single source of program state. Update at every stage transition. Stages S1-S8 and gates G1-G4 defined in [EXPANSION_PROGRAM.md](EXPANSION_PROGRAM.md).

Last updated: 2026-07-15 (ecommerce = site 7, the LAST Tier-1 build, launch core BUILT; all 7 buildable Tier-1 sites now done, manufacturing parked; every deploy held on owner G1)

## Thread B — existing-site content-gap enrichment (2026-07-14, commit 2aa8794c)

Parallel track: rank existing sites' `blog_topics` by real DataForSEO demand; build a pool for
a live site that has none. Full methodology + per-site results:
[CONTENT_GAP_ENRICHMENT.md](CONTENT_GAP_ENRICHMENT.md). Headlines: contractors-ir35 = 242
unwritten topics with demand; trade (construction-cis) pool built from scratch → 221 net-new vs
208 live pages; agency 5/314 terms have volume; generalist fully written (optimise signal);
dentists 58% duplicate rows. Tools: `scripts/enrich_blog_topics.py`, `scripts/_trade_pool_pull.py`.

Coverage reconciliation DONE 2026-07-14 (see CONTENT_GAP_ENRICHMENT.md): the "unwritten
backlogs" were mostly phantom (stale `used` flags). ir35 + dentists pools EXHAUSTED — need
fresh pool builds; trade has a small verified backlog (~14 topics + a CIS template asset).
Next: medical + solicitors enrichment (in progress), then fresh pool builds.

**2026-07-14 later same day — full pipeline executed:**
- Medical + solicitors enriched/reconciled: solicitors "27,980/mo unused" was phantom (all 65 mapped to live pages, pool exhausted); medical 16 verified-unwritten but 14/16 are transactional gp-accountant head terms → core-page work, not blogs.
- Fresh pool builds DONE (construction pattern, ~$0.79 total): ir35 139 net-new/54 w-vol (hot: hmrc umbrella company warning 880), dentists 14 net-new (tiny market confirmed), solicitors 244 net-new/94 w-vol (sra principles 2,400 = biggest estate gap). Artifacts `expansion_research/tier1_{ir35,dentists,solicitors}/`.
- Format/wave typing: [GAP_FILL_WAVE_PLAN_2026-07.md](GAP_FILL_WAVE_PLAN_2026-07.md).
- **WAVE 1 WRITTEN/BUILT 2026-07-14 (14/14, local, UNCOMMITTED/UNDEPLOYED):** solicitors SRA Principles pillar + legal-aid billing pillar + client-interest post; ir35 umbrella take-home calculator + FCSA verification pillar + 4 umbrella blogs; construction-cis 2 downloadable template assets (deduction statement + invoice, XLSX/PDF + landing pages, builds green) + unallocated-credit post; dentists salary benchmark; medical incorporation pillar (DEPLOY-HELD to ~08-03 watch verdict). All blog_topics rows flipped with ' wave1-2026-07-14'. Wave 2/3 queued in the wave plan.

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
| charities (PILOT) | Charities & non-profits (+CICs) | pilot | **S6 LAUNCH CORE BUILT 2026-07-14** under WORKING brand Trustee Finance Partners (www.trusteefinancepartners.co.uk); 29-asset core generated (home + 5 services + 2 sector + 6 pillar guides + 12 blogs) atop the S5 base; `brand_locked: true`; build green (49 static pages, vitest 33/33); brand-agnostic corpus (renders via getSiteUrl, zero brand literals); adversarial fact-review pass done. DEPLOY HELD. | **G1 = final brand + domain only** (working brand swap = 3-file config edit; owner picks + registers) | R3 dossier done | brand gate now PASS (working brand) | HELD (needs VERCEL_TOKEN + domain) | deploy gated on owner domain-register | pick FINAL brand + BUY domain (G1) |
| hospitality | Restaurants/pubs/takeaways/hotels | 1 | **S6 LAUNCH CORE BUILT 2026-07-14** under WORKING brand Hospitality Finance Partners (www.hospitalityfinancepartners.co.uk); 24 wave-1 briefs written (Opus) + 24-page core generated (home + 6 /for hubs + 5 services + 12 blogs) atop S5 (30 tests + Openings/Closures Index); infra built to charities parity; `brand_locked: true`; build green (48 static pages, vitest 30/30); brand-agnostic corpus; internal-link audit + adversarial fact-review done. DEPLOY HELD. Generalist has 4 live hospitality posts → owner cede/301-vs-differentiate call deferred to deploy gate. | **G1 = final brand + domain only** | R3 done | brand gate now PASS (working brand) | HELD (needs VERCEL_TOKEN + domain) | pick FINAL brand + BUY domain (G1) |
| care | Care homes + domiciliary | 1 | **S6 LAUNCH CORE BUILT 2026-07-15** under working brand Care Finance Partners (www.carefinancepartners.co.uk): 22 wave-1 briefs, home + 5 /for hubs + 6 services + 10 blogs + 4 calculators + Care Provider Business Index; build green, vitest 18/18, tsc clean; 2-track Opus QA passed (1 fabricated stat + link typos fixed); slugifyCategory comma fix. **DEPLOY HELD to ~2026-08-03** (medical indexing watch) + G1 owner final-brand | working brand locked (rec: Care Finance Partners, prefix carf) | R3 done | | | | pick final brand + register domain at G1 |
| startups-tech | Startups & tech/SaaS | 1 | **LAUNCH CORE BUILT + committed 2026-07-15 (S2-S6 done, deploy held)** | working brand Founder Finance Partners, prefix ffp | R3 done | 35 assets (home+5 hubs+6 svc+4 calc+18 blog+CH index), 59 vitest green, 2-track Opus QA passed | held (G1) | Reflex conflict ruled IRRELEVANT by owner | pick final brand + register domain (G1) |
| pharmacies | Pharmacy owners (+locums content) | 2 | **S6 LAUNCH CORE BUILT 2026-07-14** under WORKING brand Pharmacy Finance Partners (www.pharmacyfinancepartners.co.uk, prefix phfp); full S2 (spinup_site, tranche-2 migration pair re-fixed to keep BOTH crypto+pharmacies) + house_positions (28 positions, load-bearing figures re-verified: BADR 18% 2026/27, NIC 15%/£5k, EA £10,500, dividends 10.75/35.75/39.35, FA2026 WDA 14%+40% FYA) + rates_ledger (26) + crypto-parity infra + 27-asset core (home + 5 /for + 8 services + 13 blogs) + 3 golden-tested calculators (purchase affordability, FP34 cash-flow, locum take-home) + UK Community Pharmacy Openings & Closures Index (REAL NHSBSA 10,382 pharmacies Mar-2026/-1,382 over 7yr + CH SIC 47730 7,997 active/2,615 dissolved, zero fabricated figures); `brand_locked: true`; build green (53 static pages, vitest 21/21, tsc clean); brand-agnostic corpus; internal-link audit + Opus adversarial fact-review done (0 HP-contradictions/0 fabrication/0 em-dash/0 positioning-wall, 2 minor fixes). DEPLOY HELD. Medical-adjacency wall honoured (nothing clinical/patient-facing). | **G1 = final brand + domain only** (working brand swap = 3-file config edit; fallback Pharmacy Tax Partners) | R3 done | brand gate now PASS (working brand) | HELD (needs VERCEL_TOKEN + domain) | pick FINAL brand + BUY domain (G1) |
| manufacturing | Manufacturing & engineering | 2 | PARK RECOMMENDED — frozen pending owner ratification (no R4 run) | | R3 done | | | owner ratification | ratify/override PARK |
| crypto | Crypto traders & investors | 2 | **S6 LAUNCH CORE BUILT 2026-07-14** under WORKING brand Digital Asset Tax Partners (www.digitalassettaxpartners.co.uk); full S2 (spinup_site, prefix datp, tranche-2 migration pair) + house_positions (33 positions, load-bearing figures re-verified at source) + hospitality-parity infra + 24-asset core (home + 6 /for + 5 /services + 12 blogs) + 4 golden-tested calculators + Crypto Tax Compliance Index asset; `brand_locked: true`; build green (35 static pages, vitest 12/12, tsc clean); brand-agnostic corpus; internal-link audit + Opus adversarial fact-review done (0 HP-contradictions/0 fabrication/0 em-dash, 4 minor fixes). DEPLOY HELD. | **G1 = final brand + domain only** (working brand swap = 3-file config edit) | R3 done | brand gate now PASS (working brand) | HELD (needs VERCEL_TOKEN + domain) | pick FINAL brand + BUY domain (G1) |
| ecommerce | Ecommerce/Amazon sellers | 3 | **S6 LAUNCH CORE BUILT 2026-07-15** under WORKING brand Ecommerce Tax Partners (www.ecommercetaxpartners.co.uk, prefix ectp, tranche 3, hand-fixed 15-site migration pair); DEDUP_AUDIT pre-brief gate (7 UNIQUE / 6 DIFFERENTIATE / 5 FENCE / 0 DROP; FENCE = 5 HIRE hubs vs generalist's 6 live ecommerce pages, differentiated-not-migrated); 26 wave-1 Opus briefs + care-parity infra (NEW /vat/[slug] depth-cluster route) + 26-asset core (home + 4 /for + 4 services + 5 /vat + 8 blogs) + 3 golden-tested calculators (seller take-home, VAT threshold tracker, ST-vs-Ltd sellers w/ marginal relief + £5,000 salary model) + Online Seller Index page (structure-only, DATA RUN PENDING); house_positions 27 (IOSS €150 + OSS £8,818 flags CLEARED at source 2026-07-15), rates_ledger 42; `brand_locked: true`; build green, vitest 11/11, tsc clean; 2-track QA passed (adversarial: fixed calc engine CT-cliff/salary model + wrong £70k worked example + uncited Amazon billing claim; editorial: fixed narrated IOSS-omission cluster + thin stats). DEPLOY HELD. | **G1 = final brand + domain + migrate-vs-fence ruling** (owner rules the 5 fenced hubs vs generalist with fresh GSC) | R3 done | brand gate now PASS (working brand) | HELD (needs VERCEL_TOKEN + domain) | pick FINAL brand + BUY domain + rule migrate-vs-fence (G1) |

All six R4 shortlists produced 2026-07-12 in one batch (`expansion_research/tier1_*/BRAND_SHORTLIST.md` + `r4_results.json`); every recommended + fallback name independently re-verified RDAP 404 on .co.uk AND .com same day. Owner can pick all brands in bulk.
