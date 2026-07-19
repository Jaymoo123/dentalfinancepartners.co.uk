# Session log — 2026-07-19 — Growth plan day-1 execution

Plan: `docs/_engines/GROWTH_PLAN_2026-07-19.md` (approved same day, CRO-first). 14+ commits pushed to main. All commit hashes below verified against `origin/main`.

## Infrastructure / monitoring
- **All 3 GitHub workflows GREEN**: CI Build & Lint; Content Quality (now changed-files-only, 8fb7f776); **Weekly Optimisation Engine end-to-end with new secrets** — monitoring restored, first successful run since 2026-07-13 (timeout 30→90 min d60a3fa1, DataForSEO skip-when-absent bca83fc3).
- **Nurture ARMED on 6 sites** (generalist, dentists, solicitors, medical, construction-cis, contractors-ir35): email-only, autopause on, retro-blast structurally impossible (no dormant-period state rows). Property untouched.
- **Bing client 15/15 sites** + `GetQueryStats` wired into weekly run (ab292ac2). First-ever dentists Bing snapshot now possible.
- **Tripwire bundle-check fix** (fe4a286a): the P0 was architecture drift (server-route capture made the inlined-URL grep a permanent false positive); capture verified healthy, probe now hits `/api/leads/submit`.
- **deploy_watch rows inserted**: medical verdict due 07-20, agency 07-22.
- CI-green fixes: research-index JSONs committed, missing eslint configs, stale console test (8fb7f776).

## CRO
- **CRO detectors live: 23 findings.** Headline: solicitors 977 engaged sessions → 15 calculator uses → 1 lead (worst funnel in estate).
- **ServiceTiers/StatsBar/LeadForm detail fields ported to 7 core sites** (744d372f, shared components, all builds green). Copy awaiting owner sign-off — NOT deployed.
- **Assistant data-pass verdict**: 59% widget opens, 14/7,235 compose rate → hybrid v2 justified; Property-first when unfrozen.

## Corepage rewrites — COMMITTED, NOT DEPLOYED
- **B1 Solicitors /services** (b8ae2269): /services owns head family, /contact + /blog link-ups. `/contact` → `/services` query migration owner-APPROVED. Engine parameterised in cf992e1d.
- **B2 Dentists homepage** (d3e705dd): head-token title/H1 + commercial schema.

## Content / metas — COMMITTED, NOT DEPLOYED
- **Generalist C1+C2** (43323c0a): 5-page query-ledger meta batch + construction-accounting-software expand; fabricated software pricing found and fixed during QA.
- **Dentists dividend-rate fix** (88ee3a3d): profit-extraction guide → 2026/27 rates (10.75/35.75), worked effective rates recomputed.

## GEO engine builds
- A0.2 schema whitelist extend (b356aafa: CollectionPage, DefinedTerm, DefinedTermSet).
- A0.6 entity graph: root-layout Organization+WebSite + Companies House sameAs estate-wide, non-Property (9af87738).
- A0.7 llms.txt AI dark-traffic tagging + Medical Key Facts + agency llms-full de-stale (098fbcf6).
- A0.8 citation battery harness, 8 niches (1ed0ad5d); **first baseline: 5/48 estate hits** (c2bf1428).

## Flagships
- **Dental Pay & Tax Index P1 manifest** committed (53eed5d8): `docs/dentists/research/P1_DATA_MANIFEST.md` — awaiting owner data-source sign-off.

## OWNER OPEN
1. MED-F2 confirm (Request Indexing done?) — due 07-20.
2. Dental Index P1 data-source sign-off.
3. ServiceTiers per-site copy sign-off.
4. Bing Places inputs: address/phone/which brand first (GBP permanently NO).
5. Deploy word for: corepage B1/B2 + ServiceTiers extras + generalist metas.
