# Medical Research Asset — Program Handover

**Mission:** build the medical equivalent of Property's flagship research asset (the UK Landlord Tax Index) — a faceless, citable, open-data research report that earns AI-engine citations and off-site authority. This is the #1 identified 10x lever for medicalaccounts.co.uk (diagnosis: `docs/medical/DIAGNOSIS_2026-07.md`; audit: `docs/medical/COMPLETENESS_AUDIT_2026-07-06.md` — "Original cited data is what earns AI citations at 3 to 10 times a standard post. This is the primary 10x move.").

**Working candidate:** **NHS Pension Annual Allowance Burden Index** at `/research/nhs-pension-annual-allowance-index` (final name/slug = an Opus naming pass + owner glance). Alternative angles exist (locum market rates, GP partner drawings) but AA burden has the strongest open-data spine and matches the site's #1 topic cluster.

---

## 1. OWNER'S ORIGINAL CORES (apply to all work on this program — verbatim intent)

From the diagnosis-program kickoff (2026-07-06):
> "Remember that you are expensive Fable, and so, building / verifying should be opus / mainly sonnet based as much as possible and keeping your context clean. … it might run out … in which case i will need to switch to opus agents who will need to be able to pick up exactly where you left off on your plan / audit etc so make sure we also build with that in mind. run the full battery of discovery and where there are gaps in the battery, fill them."

From the auto-mode go:
> "run everything in auto mode, as long as it doesn't touch other sites, let's really go to the extremities with this. … in theory this will be rivalling property. So do everything is needed. Deploy, test, develop, all of it. AI optimise - the entire shebang. … TEst everything, ship everyhting."

Operationalised:
- **Fable = manager only**: plans, architects, decomposes, gates, integrates. Never writes content or builds directly. Keeps its own context lean; heavy lifting is always delegated.
- **Opus = judgment**: briefs, design decisions, QA gates, adversarial review, synthesis, factual sign-off. Every shipped artifact passes an Opus review.
- **Sonnet = the workers**: builds, data pulls, page code, content drafts (parallel, non-overlapping files).
- **Haiku = grunt only** (mechanical transforms; BANNED from content writing). **No DeepSeek anywhere.**
- **Resumable by construction**: a write-ahead ledger state doc (mirror `docs/medical/DIAGNOSIS_2026-07.md`: ⚡RESUME HERE block, step ledger with one-line verify commands, findings ledger, decision log; manager updates the ledger BEFORE spawning agents; ≤1 IN-PROGRESS step outside declared fan-outs; a fresh Opus session with zero context resumes from the state doc alone, which overrides memory on any conflict).
- **Auto mode, medical-only**: deploys/tests/dev pre-authorised; touch NOTHING outside `Medical/` + medical-named scripts (root `package-lock.json` deltas from Medical workspace installs allowed; `packages/web-shared/**` FORBIDDEN — shared across sites).
- **Adversarial verification is standard**: after any "done" claim, skeptics attack it (the completeness-audit pattern) before it's believed.

## 2. LOCKED ESTATE RULES that bind this program
- **Faceless authority** (owner is not an accountant): no named spokesperson, no expert quotes. The asset is "Medical Accountants UK analysis of [official sources]". This is exactly the Property precedent and it is what makes press use possible.
- **Gold-standard A\***: best-in-niche or it doesn't ship. Independently reproducible figures, methodology fully disclosed, no stale data presented as current (Property explicitly EXCLUDED a discontinued ONS rent series from v1 for this reason — same bar here).
- **No em-dashes** in user-facing copy. UK English. Facts must match `docs/medical/house_positions.md` where they overlap (AA £60,000, taper to £10,000, Scheme Pays, etc.).
- **MED-F7 freeze**: homepage, GP-partner post, LeadForm, /contact are frozen (JSON-LD-only exceptions with byte-identical rendered-markup verification).
- **FLAT blog routing** on medical: never `slug_resolver --fix`; link audits via `scripts/medical_flat_link_audit.py`; predeploy via `python scripts/predeploy_gate.py --site medical`.
- **Deploy recipe** (proven twice on 2026-07-06): from repo root, `$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"; $env:VERCEL_PROJECT_ID="prj_50vByZ3rqXQQwCUeENUTBbNBB41n"; vercel deploy --prod --yes` — NEVER bare deploy from root (root `.vercel` = Property), NEVER pipe deploy output (M-2 silent-failure lesson), always verify with a new-content marker fetch on the live HTML, then tag `deploy/medical/<date>-<name>` + IndexNow the changed URLs via `optimisation_engine/indexing/submit_indexnow.py`.

## 3. THE PROPERTY PRECEDENT — architecture to mirror (verified 2026-07-06)

### Routes/components (copy-paste reusable, swap data)
- `Property/web/src/app/research/page.tsx` — index page, `reports` array of stat cards.
- `Property/web/src/app/research/landlord-tax-index/page.tsx` — the report: Hero (H1 + 4 stat blocks) → **Key facts box** (plain-language LLM-extractable bullets + "cite with attribution" line) → charts → breakdown table → **Methodology** (named sources with URLs + CSV download link) → LeadForm CTA → FAQ.
- `Property/web/src/app/research/landlord-tax-index/data/route.ts` — `force-static` CSV download, attribution comments in the CSV header, same JSON import as the page (page and CSV can never drift).
- `Property/web/src/components/research/LandlordIndexCharts.tsx` — "use client" recharts wrappers (Bar/Area/Line via shadcn ChartContainer); server passes plain serialisable arrays.
- `Property/web/src/lib/research/landlord-index.ts` — snapshot TypeScript interface + formatters.
- Data = **committed static JSON** `Property/web/src/data/landlord-tax-index.json`, imported at build time. Refresh = rerun script, commit JSON, redeploy. No runtime fetches.

### GEO packaging (the part that earns citations)
- Triple JSON-LD: `Article` (datePublished/dateModified) + **`Dataset`** (OGL license, temporalCoverage, `isAccessibleForFree: true`, `distribution` → `DataDownload` at the CSV URL — enables Google Dataset Search) + `FAQPage` (shared `buildFaqPageJsonLd`).
- llms.txt: dedicated `## Original research and data` section with the key stat inline, the driver explained, the CSV URL, and "free to cite with attribution" framing. (Medical's llms.txt was rebuilt 2026-07-06 — add the section there.)
- Sitemap: `/research` + report slug as static entries, monthly changeFrequency.
- Citation-bait: key-facts box, downloadable CSV, methodology with independently verifiable sources. Deliberately NO chart embeds (CSV is the journalist artifact).

### Distribution (faceless data-PR)
- `docs/property/landlord-tax-index/press-release.md` — faceless press summary ("X analysis of official data"), angles per desk (personal-finance, regional pairing, trade). Mirror as `docs/medical/research/press-release.md` (medical desks: GP/BMA trade press, medico-finance, health-policy, regional "doctors in {city}").
- `docs/property/landlord-tax-index/methodology.md` — decision record: why faceless, why gross counts (survivorship-bias-free), why provisional months excluded, why only open OGL sources. Mirror it.
- No on-site /press route; the press doc is for outreach. Data-PR links come organically, not via placement (the June link brief deliberately excluded it).

### Ingest script pattern
`optimisation_engine/ingestion/ingest_landlord_data.py` — argparse `--dry-run/--execute/--no-supabase`, `build_snapshot()` (pivot, annual totals, trend comparisons), writes the JSON snapshot, optional Supabase upsert. Sibling clones already exist: `ingest_contractor_data.py` (construction + ir35 research assets) — three-time-proven scaffold.

## 4. MEDICAL DATA DESIGN (the swaps)

| Property | Medical |
|---|---|
| Hero source: Companies House API (monthly, key, rate-limited) | **HMRC Pension Schemes Statistics** — "Annual allowance: charges and tax" table (`gov.uk/government/statistics/registered-pension-schemes-statistical-analysis`, pensiontaxrelief.xlsx). Annual AA charge totals, receipts, Scheme Pays elections, series back to 2006/07. **Open download, NO key, no rate limits** (parse with pandas/openpyxl). |
| Context source: Land Registry HPI CSV (monthly) | **NHSBSA NHS Pension Scheme Annual Report** (member counts, in-scheme AA charges, Scheme Pays values — NHS-specific corroboration) + optionally NHS Digital workforce stats (headcount denominator → "charge per 1,000 senior doctors" style derived metric). |
| Monthly granularity, TTM headline, 2-month provisional tail | **Annual data, ~18–24 month lag** (latest ≈ 2 tax years behind). ⚠ STRUCTURAL DIFFERENCE: no TTM, no dashed tail, no "updated this month" claim. The asset is a **year-on-year burden trend** ("charges rose X-fold between 2016/17 and the latest published year"). Update cadence = annual on HMRC publication. State this plainly in methodology + llms.txt. |
| Decade multiple (2016→2025) | Tax-year multiple (2016/17 → latest). The AA-taper era (2016+) and the £40k→£60k change (2023/24) give the narrative its shape — figures must be framed against those policy events, cited to house_positions where they overlap. |
| Supabase `landlord_incorporations` | optional `nhs_aa_charges` table, same upsert pattern (or skip Supabase in v1 — static JSON suffices). |
| Integrity framing: gross counts, survivorship-free | "Charges are gross; an AA charge does not mean the doctor left the NHS scheme" + Scheme-Pays vs cash split disclosed. |

**Data-source sign-off gate (from the audit):** before build, an Opus agent must verify each table actually contains the claimed series at the claimed granularity, capture exact file URLs + sheet/tab names + the latest published year into the state doc, and flag any discontinuity. Presenting stale/misread official data breaches the quality bar and is the program's main risk.

## 5. PROGRAM PLAN (phases, agents, gates)

- **P0 (manager)**: create state doc `docs/medical/RESEARCH_ASSET_STATE.md` (ledger convention as §1) with all steps TODO. Commit before any work.
- **P1 Data-source verification (Opus, 1–2 agents)**: the sign-off gate above. Download the actual HMRC xlsx + NHSBSA tables, verify series/coverage/latest-year, record exact parse targets. EXIT: verified source manifest in the state doc. HARD GATE — nothing builds until this passes.
- **P2 Design brief (Opus)**: headline metrics, chart set, key-facts bullets, FAQ, naming, and the annual-lag framing. Cross-check every figure against house_positions. Owner glance at the brief is optional but cheap (one message).
- **P3 Build (Sonnet ∥, 3 lanes)**: (a) ingest script `optimisation_engine/ingestion/ingest_medical_aa_data.py` cloned from the landlord/contractor scaffold (drop CH pacing, add Excel parse) + generate `Medical/web/src/data/nhs-aa-index.json`; (b) routes/components cloned from Property (`/research` index + report page + CSV route + charts + lib interface); (c) GEO packaging (triple JSON-LD, llms.txt section, sitemap entries) + `docs/medical/research/{methodology,press-release}.md`.
- **P4 QA (Opus)**: figures independently recomputed from the raw sources; schema validity; no em-dashes; A* gate; adversarial pass (one skeptic per: data accuracy, citability, methodology honesty).
- **P5 Ship (manager)**: build + tests + predeploy gate → deploy per §2 recipe → live marker checks (Dataset JSON-LD present, CSV downloads, stats render) → IndexNow changed URLs → tag → state-doc close-out.
- **P6 Distribution (owner + agents)**: press-release doc finalised; GSC Request Indexing on the new route (owner browser); the asset self-cites via llms.txt/Dataset schema. Watch: AI-referral leads + citation appearance (the diagnosis watch machinery — `MedicalCoverageWatch` task + `scripts/medical/lead_attribution.py` — already measures the AI channel).

## 6. CONTEXT A FRESH SESSION NEEDS (read order)
1. This file.
2. `docs/medical/DIAGNOSIS_2026-07.md` — the full diagnosis program record (why this asset: 92% Google discovery wall + ChatGPT = #1 lead channel with 3 of 7 leads; discovery fixes shipped 2026-07-06; watch windows ~07-20/08-03).
3. `docs/medical/COMPLETENESS_AUDIT_2026-07-06.md` — current site state (post-fix), residuals list.
4. Property precedent files listed in §3 (read the actual page.tsx + ingest script before cloning).
5. Reusable diagnostic tools if needed: `optimisation_engine/snapshot/index_coverage.py`, `scripts/medical/lead_attribution.py`, `scripts/medical/domain_forensics.py`, `scripts/_q.py` (read-only Supabase SQL).

Open owner items unrelated to this program but pending: GSC Request Indexing list (state doc RESUME HERE), Vercel dashboard apex-redirect 308 toggle + Speed Insights enable, Serper credit top-up (optional).
