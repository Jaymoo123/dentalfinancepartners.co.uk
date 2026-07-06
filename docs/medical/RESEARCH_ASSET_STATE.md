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
| B (routes/components) | `Medical/web/src/app/research/**` (index page, report page incl. ALL JSON-LD, CSV `data/route.ts`), `Medical/web/src/components/research/**`, `Medical/web/src/lib/research/**` |
| C (GEO + docs) | `Medical/web/public/llms.txt` (add section), `Medical/web/src/app/sitemap.ts` (add entries), `docs/medical/research/methodology.md`, `docs/medical/research/press-release.md` |

Note: triple JSON-LD (Article + Dataset + FAQPage) lives inside the report page.tsx, so it is LANE B's deliverable (spec comes from the P2 brief); lane C verifies nothing in code, it packages around it.

## 1. Step ledger

Status enum: TODO / IN-PROGRESS / DONE / REVIEWED-PASS / BLOCKED / DROPPED.

| step | phase | status | owner-gated? | artifact | verify cmd (1 line) | next action |
|---|---|---|---|---|---|---|
| P0.a bootstrap state doc + commit | 0 | DONE | no | this file | `git log --oneline -1 -- docs/medical/RESEARCH_ASSET_STATE.md` shows a commit | — |
| P1.a HMRC source verification (Opus): download pension schemes statistics xlsx, verify AA charges/Scheme Pays series + coverage + latest year, record exact URL/sheet/columns | 1 | TODO | no | `docs/medical/research/SOURCE_MANIFEST.md` §HMRC + raw file in `.cache/medical_research/` | manifest §HMRC has exact URL + sheet + latest year + parse targets | spawn with P1.b |
| P1.b NHSBSA corroboration (Opus): NHS Pension Scheme Annual Report member counts + in-scheme AA/Scheme Pays values; optional NHS Digital workforce denominator | 1 | TODO | no | `docs/medical/research/SOURCE_MANIFEST.md` §NHSBSA | manifest §NHSBSA has exact URL + table + latest year | spawn with P1.a |
| P1.gate manager reviews manifest — HARD GATE, nothing builds until pass | 1 | TODO | no | gate verdict in Decision log | Decision log has P1.gate PASS row | — |
| P2.a design brief (Opus): headline metrics, chart set, key-facts bullets, FAQ, final name/slug, annual-lag framing, LOCKED JSON schema + TS interface, house_positions cross-check | 2 | TODO | no | `docs/medical/research/DESIGN_BRIEF.md` | brief exists w/ locked schema section | owner glance optional |
| P3.a Lane A (Sonnet): ingest script cloned from landlord/contractor scaffold (Excel parse, no CH pacing) + generate committed JSON | 3 | TODO | no | ingest script + `Medical/web/src/data/nhs-aa-index.json` | `python optimisation_engine/ingestion/ingest_medical_aa_data.py --dry-run` exits 0 | runs FIRST (B/C need real JSON) |
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
- (empty — P1 populates)

## 3. Decision log
- 2026-07-06 P0: program kicked off by owner ("Execute this" on the handover). Manager = Fable. Working candidate slug `/research/nhs-pension-annual-allowance-index` (P2 Opus naming pass may adjust; owner glance optional). Supabase upsert SKIPPED in v1 (static JSON suffices — handover §4 option taken for simplicity/reversibility).
- 2026-07-06 P0: P3 sequencing decision — Lane A runs FIRST (produces the real committed JSON), then lanes B and C in parallel; B builds against the real data file so its build verification is meaningful. Trades ~20 min of wall clock for zero schema-drift risk.
