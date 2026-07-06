# Medical Research Asset — Program State (write-ahead ledger)

Program: build + ship the **NHS Pension Annual Allowance Burden Index** at `/research/nhs-pension-annual-allowance-index` on www.medicalaccounts.co.uk — the medical clone of Property's Landlord Tax Index (faceless, citable, open-data, GEO-packaged).
This file is the WRITE-AHEAD LEDGER and single source of truth for program state. A fresh agent with zero context resumes from HERE. This file overrides memory on any conflict.

Handoff read order: (1) `docs/medical/RESEARCH_ASSET_HANDOVER.md` (mission, owner cores, Property precedent map, data design), (2) this file, (3) `docs/medical/house_positions.md`, (4) memory LAST.

## ⚡ RESUME HERE
- Program KICKED OFF 2026-07-06 (manager: Fable). P0 committed. Next: P1 data-source verification (Opus, HARD GATE — nothing builds until the source manifest passes).
- Do-not-redo rule: trust DONE/REVIEWED-PASS rows after running their one-line verify cmd. Re-run only IN-PROGRESS rows from their "next action".

## 0. Invariants (never re-derive)
- Site: https://www.medicalaccounts.co.uk. Vercel root `Medical/web`. Branch: work continues on `estate-cro-parity` (medical program commits already live there).
- **Scope**: `Medical/**`, `docs/medical/**`, `optimisation_engine/ingestion/ingest_medical_aa_data.py` ONLY. `packages/web-shared/**` FORBIDDEN (shared across sites). Root `package-lock.json` deltas from Medical workspace installs allowed.
- **Model tiering**: Fable = manager/gates only. Opus = judgment (P1 verification, P2 brief, P4 QA). Sonnet = build/content (P3 lanes). Haiku = mechanical grunt only, banned from content. No DeepSeek.
- **MED-F7 freeze**: homepage, GP-partner post, LeadForm, /contact are FROZEN (JSON-LD-only exceptions need byte-identical rendered-markup verification). This program must not touch them.
- **FLAT blog routing**: never `slug_resolver --fix`; link audits via `scripts/medical_flat_link_audit.py`; predeploy via `python scripts/predeploy_gate.py --site medical`.
- **Deploy recipe** (proven 2×, 2026-07-06): from repo root, `$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"; $env:VERCEL_PROJECT_ID="prj_50vByZ3rqXQQwCUeENUTBbNBB41n"; vercel deploy --prod --yes` — NEVER bare deploy from root (root `.vercel` = Property), NEVER pipe deploy output. Verify with new-content marker fetch on live HTML, then tag `deploy/medical/<date>-<name>`, then IndexNow via `optimisation_engine/indexing/submit_indexnow.py`.
- **Copy rules**: no em-dashes, UK English, facts must match `docs/medical/house_positions.md` (AA £60,000, taper to £10,000, Scheme Pays etc.).
- **Data honesty**: annual data with ~18–24 month lag. NEVER claim "updated this month"; the asset is a year-on-year burden trend. Charges are gross; an AA charge does not mean the doctor left the scheme. Scheme-Pays vs cash split disclosed. Only open OGL sources.
- **Data = committed static JSON** `Medical/web/src/data/nhs-aa-index.json`, imported at build time by both page and CSV route (no runtime fetches, page and CSV can never drift).
- medical llms.txt = static file `Medical/web/public/llms.txt`. Sitemap = `Medical/web/src/app/sitemap.ts`.
- Property precedent files (read before cloning): `Property/web/src/app/research/page.tsx`, `.../research/landlord-tax-index/page.tsx`, `.../landlord-tax-index/data/route.ts`, `Property/web/src/components/research/LandlordIndexCharts.tsx`, `Property/web/src/lib/research/landlord-index.ts`, `optimisation_engine/ingestion/ingest_landlord_data.py` (+ sibling `ingest_contractor_data.py`).
- Raw artifacts → `.cache/medical_research/` (uncommitted). Curated findings → this doc + `docs/medical/research/*.md` (committed).

### File-ownership map for P3 lanes (no overlaps)
| lane | owns (exclusive) |
|---|---|
| A (ingest+data) | `optimisation_engine/ingestion/ingest_medical_aa_data.py`, `Medical/web/src/data/nhs-aa-index.json` |
| B (routes/components) | `Medical/web/src/app/research/**` (index page, report page incl. ALL JSON-LD, CSV `data/route.ts`), `Medical/web/src/components/research/**`, `Medical/web/src/lib/research/**` + ADDENDUM (P2.a escalation): `Medical/web/package.json` (add recharts ^3.8.0), `Medical/web/src/components/ui/chart.tsx` (port from Property), `Medical/web/src/app/globals.css` (add --chart-1..5 vars) |
| C (GEO + docs) | `Medical/web/public/llms.txt` (add section), `Medical/web/src/app/sitemap.ts` (add entries), `docs/medical/research/methodology.md`, `docs/medical/research/press-release.md` |

Note: triple JSON-LD (Article + Dataset + FAQPage) lives inside the report page.tsx, so it is LANE B's deliverable (spec comes from the P2 brief); lane C verifies nothing in code, it packages around it.

## 1. Step ledger

Status enum: TODO / IN-PROGRESS / DONE / REVIEWED-PASS / BLOCKED / DROPPED.

| step | phase | status | owner-gated? | artifact | verify cmd (1 line) | next action |
|---|---|---|---|---|---|---|
| P0.a bootstrap state doc + commit | 0 | DONE | no | this file | `git log --oneline -1 -- docs/medical/RESEARCH_ASSET_STATE.md` shows a commit | — |
| P1.a HMRC source verification (Opus): download pension schemes statistics xlsx, verify AA charges/Scheme Pays series + coverage + latest year, record exact URL/sheet/columns | 1 | DONE (verdict PASS, workflow wf_ca7e7b95-330) | no | `docs/medical/research/SOURCE_MANIFEST_HMRC.md` + raw files in `.cache/medical_research/` | manifest has exact URLs + sheet + latest year + parse recipe | — |
| P1.b NHSBSA corroboration (Opus): NHS Pension Scheme Annual Report member counts + in-scheme AA/Scheme Pays values; optional NHS Digital workforce denominator | 1 | DONE (verdict PARTIAL: member counts PASS; NHS AA = FOI counts-only snapshot) | no | `docs/medical/research/SOURCE_MANIFEST_NHSBSA.md` | manifest has exact URLs + tables + hand-key values | — |
| P1.gate manager reviews manifest — HARD GATE, nothing builds until pass | 1 | DONE (PASS w/ 6 binding constraints, see Decision log) | no | gate verdict in Decision log | Decision log has P1.gate PASS row | — |
| P2.a design brief (Opus): headline metrics, chart set, key-facts bullets, FAQ, final name/slug, annual-lag framing, LOCKED JSON schema + TS interface, house_positions cross-check | 2 | DONE (15 sections, 0 unverified figures, naming locked: `/research/annual-allowance-pension-tax-index`) | no | `docs/medical/research/DESIGN_BRIEF.md` | brief exists w/ locked schema section (§7) | — |
| P2.r adversarial brief review (Opus skeptic): attack figures vs manifests, schema completeness, naming honesty, framing traps | 2 | REVIEWED-PASS (SHIP-WITH-EDITS: 9/9 figures recomputed ✓, 1 McCloud caption edit applied by skeptic, schema stays LOCKED) | no | verdict in Decision log | §4a caption in brief contains McCloud sentence | — |
| P3.a Lane A (Sonnet): ingest script cloned from landlord/contractor scaffold (Excel parse, no CH pacing) + generate committed JSON | 3 | IN-PROGRESS (spawned 2026-07-06) | no | ingest script + `Medical/web/src/data/nhs-aa-index.json` | `python optimisation_engine/ingestion/ingest_medical_aa_data.py --dry-run` exits 0 | runs FIRST (B/C need real JSON) |
| P3.b Lane B (Sonnet): /research index + report page (incl. triple JSON-LD) + CSV route + charts + lib, cloned from Property | 3 | TODO | no | files per ownership map | `npm run build` in Medical/web green w/ /research routes | after P3.a |
| P3.c Lane C (Sonnet): llms.txt section + sitemap entries + methodology.md + press-release.md | 3 | TODO | no | files per ownership map | llms.txt has '## Original research and data'; sitemap emits /research | after P3.a, ∥ with P3.b |
| P4.a QA skeptic: data accuracy — independently recompute every published figure from raw sources | 4 | TODO | no | verdict in Decision log | Decision log row | ∥ fan-out |
| P4.b QA skeptic: citability/GEO — JSON-LD validity, Dataset schema, llms.txt, CSV integrity | 4 | TODO | no | verdict in Decision log | Decision log row | ∥ fan-out |
| P4.c QA skeptic: methodology honesty — lag framing, gross-counts caveat, source licensing, A* bar | 4 | TODO | no | verdict in Decision log | Decision log row | ∥ fan-out |
| P4.d QA skeptic: copy/code — em-dashes, UK English, house_positions conflicts, build health, MED-F7 untouched | 4 | TODO | no | verdict in Decision log | Decision log row | ∥ fan-out |
| P4.fix apply QA findings (Sonnet if needed, manager gates) | 4 | TODO | no | diffs | build green + skeptics re-pass | — |
| P5.a build + tests + predeploy gate | 5 | TODO | no | gate output | `python scripts/predeploy_gate.py --site medical` exits 0 | — |
| P5.b deploy per recipe (pre-authorised by owner auto-mode go) | 5 | TODO | no | deploy URL + `dpl_` id in Decision log | live HTML marker fetch | — |
| P5.c live markers: Dataset JSON-LD present, CSV downloads, stats render | 5 | TODO | no | Decision log row | curl live /research/... | — |
| P5.d IndexNow changed URLs + tag `deploy/medical/<date>-research-asset` | 5 | TODO | no | tag + IndexNow 200 | `git tag -l 'deploy/medical/*research*'` | — |
| P5.e state-doc close-out + commit + push | 5 | TODO | no | this file | RESUME HERE says SHIPPED | — |
| P6.a distribution: press-release final; OWNER: GSC Request Indexing on /research + report URL | 6 | TODO | **owner part** | press-release.md + owner note | — | watch via MedicalCoverageWatch |

## 2. Findings ledger (headlines only; raw detail in artifacts)
- [P1.a HMRC ★PASS] Handover URL DEAD (404). Live publication = HMRC "Private pension statistics" (gov.uk `/government/statistics/personal-and-stakeholder-pensions-statistics`), Accredited official statistics, OGL v3.0, annual each July (latest 31 Jul 2025 release; next Summer 2026). AA data = **Table 7** in `Tables_7_and_8.ods` + tidy CSV (both downloaded to `.cache/medical_research/`, reconciled exactly). Verified series: Scheme Pays/AfT charge **count + £value 2012/13→2023/24** (2019/20 £256m → 2022/23 £348m → 2023/24 £350m [prov]); SA individuals exceeding AA **2006/07→2023/24** (140 → peak 56,270 in 2021/22 → 23,370 [prov]); SA **excess-contributions £value** (NOT tax charge — HMRC never publishes an SA charge value); standard-AA policy column; Table 8 LTA as context. 2016/17→2022/23 marked [revised], 2023/24 [provisional]. NO NHS/public-sector split in this publication.
- [P1.b NHSBSA PARTIAL] Scheme = England & Wales only. **Member counts PASS**: Annual Report §3.3 movement table, closing figures hand-keyed for 31 Mar 2023/2024/2025 (active 1,815,310 / 1,868,523 / 1,872,287; PDFs in `.cache/medical_research/`). **NHS-specific AA = FOI-02228 only** (opendata.nhsbsa.net, OGL): members exceeding STANDARD AA + members with Scheme Pays record, practitioner/officer split, 2015/16→2023/24 — but 2022/23+2023/24 radically undercounted (33 and 8 total; NHSBSA says figures "will increase as calculations continue"), pre-McCloud-rollback snapshot dated 26 Sep 2024, counts only NO £ values, taper-only cases excluded. **Safe window 2015/16→2021/22** (officer 2021/22 = 46,135, the CPI-revaluation spike). FOI-02711 = single-year 2019/20 Scheme Pays role split (GP 8,239, hospital doctor 9,745 forms). Workforce denominator DEFERRED (England-only vs E&W mismatch).
- [P1 traps for all downstream copy] (1) Scheme Pays £ line starts 2012/13, never plot earlier; (2) SA money column = excess contributions, NEVER call it a tax charge; (3) 2022/23 SA fall (56,270→34,190) = McCloud public-service remedy reporting artefact (affected members diverted to the HMRC adjustment service), not a real decline — explain wherever shown; (4) 2016/17 SA count jump partly definitional (taper+MPAA widening); (5) PODS digital service may inflate AfT from 2020/21; (6) FOI years 2022/23+2023/24 NEVER used; (7) HMRC spine = ALL registered schemes, NHS layer = FOI — never conflate, incl. in the asset name.

## 3. Decision log
- 2026-07-06 P0: program kicked off by owner ("Execute this" on the handover). Manager = Fable. Working candidate slug `/research/nhs-pension-annual-allowance-index` (P2 Opus naming pass may adjust; owner glance optional). Supabase upsert SKIPPED in v1 (static JSON suffices — handover §4 option taken for simplicity/reversibility).
- 2026-07-06 P0: P3 sequencing decision — Lane A runs FIRST (produces the real committed JSON), then lanes B and C in parallel; B builds against the real data file so its build verification is meaningful. Trades ~20 min of wall clock for zero schema-drift risk.
- 2026-07-06 **P1.gate PASS with 6 binding design constraints** (manager, from wf_ca7e7b95-330): (1) recurring £ spine = HMRC Table 7 whole-market series; (2) NHS-specific layer = FOI-02228 corroboration snapshot, safe window 2015/16→2021/22 ONLY, counts not £; (3) the P1-traps list above binds every chart, bullet, FAQ and meta description; (4) per-1,000-doctors derived metric DEFERRED for v1 (denominator mismatch); (5) asset NAME must not overclaim NHS-specificity of the spine — P2 Opus makes the naming call explicitly against this constraint; (6) update cadence claim = "annual, HMRC publishes each July" (no monthly language anywhere). `SOURCE_MANIFEST.md` = index over the two section manifests.
- 2026-07-06 P2 shape: added P2.r adversarial brief review before build — the brief is the keystone (3 lanes build on it); one Opus skeptic attacking figures/schema/naming is cheap insurance vs the P1-traps class of error.
- 2026-07-06 **P2.a naming LOCKED**: slug `/research/annual-allowance-pension-tax-index`, display name "Annual Allowance Pension Tax Index", H1 "The annual allowance and NHS doctors: pension tax charges across UK registered pension schemes". Whole-market spine cannot carry an NHS-specific name (gate constraint 5); NHS relevance carried in H1/copy with per-figure labelling; slug also avoids cannibalising existing /nhs-pension pages. Hero stats: £350m Scheme Pays 2023/24 [prov] · 56,270 SA peak 2021/22 [rev] · 46,135 NHS officers over std AA 2021/22 (FOI, E&W) · AA path £215k→£60k.
- 2026-07-06 P2.a corrections to handover: medical FAQ JSON-LD helper = `buildFaqPage` from `@/lib/schema` ({question, answer} shape), NOT "buildFaqPageJsonLd". Lane B ownership addendum (recharts dep + ui/chart.tsx port + --chart-1..5 CSS vars) recorded in the ownership map.
- 2026-07-06 **P2.r SHIP-WITH-EDITS → P2 gate PASS**: 9/9 figures independently recomputed from raw files (zero mismatches, incl. all FOI rows byte-for-byte); all 7 traps + 6 constraints hold; skeptic applied 1 edit (McCloud sentence on §4a table caption); slug differentiation vs /nhs-pension cluster verified clean; brief's JSON-LD is a superset of Property's (adds spatialCoverage+publisher). Lane C note: sitemap `lastModified` ternary must branch on a new RESEARCH_DATE const (expected, in brief §10b). P4 note: sitemap changeFrequency "monthly" = crawl hint, not a freshness claim, acceptable.
