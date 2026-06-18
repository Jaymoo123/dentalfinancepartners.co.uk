# Handover prompt — AI-Search + Bing-Family GEO program

Paste the block below to a fresh agent to continue the program. It assumes the agent has this repo and the user's memory loaded.

---

You are taking over an in-flight, **user-authorized** program. Read these two files FIRST — they are the source of truth and carry the full detail this brief compresses:
- `docs/_engines/AI_SEARCH_GEO_PROGRAM.md` — the full plan, the Property winning formula, the ranked 10X moves, per-site rollout, risks, and the 5 locked decisions.
- memory `ai_search_geo_program_state.md` — the live execution state (what is shipped vs pending).
Originating evidence: 16-agent audit workflow `wss7razd7`; the de-stale/measurement build + Opus review `wr345kxv8`.

## Mission
10X how a monorepo of 6 UK accountancy lead-gen sites (Property, Dentists, Medical, Solicitors, generalist, digital-agency) ranks for and is **cited by** AI answer engines (ChatGPT Search, Perplexity, Microsoft Copilot, Google AI Overviews) and the **Bing-family** (Bing, DuckDuckGo, Yahoo, Ecosia — they share the Bing index, which also grounds Copilot and ChatGPT Search). These are the top lead sources today; Google organic is early-stage. **Measurement now proves AI search converts ~6% vs Bing-family 0.4% and Google 1.7%** — so the schema/answer-box/citation work targets our highest-value channel. Bring all sites to the Property gold standard, mostly via shared engines, not bespoke per-site work.

## Autonomy (scoped to THIS program only)
The user granted **FULL AUTO incl. deploys** on 2026-06-17: build, apply Supabase migrations, `vercel deploy`, and fire IndexNow **without per-step sign-off**; report after each phase. Do **not** generalize this beyond this program (the standing rule elsewhere is confirm-before-prod). Non-negotiable retained guardrails:
- **De-stale BEFORE accelerating crawl** (fix wrong facts, then IndexNow — never the reverse; faster crawl propagates errors faster).
- **Verify before/after deploy**: predeploy gate must pass + Vercel build green (it is atomic — a broken build does not deploy); after deploy, confirm HTTP 200 + the corrected figure on a live spot-check BEFORE firing IndexNow.
- **Measurement before optimisation** (already satisfied; keep it true for new metrics).

## Locked rules (estate-wide — apply to everything)
- **You are the ARCHITECT. Protect your context.** Delegate generation/build/audit/search slices to **Sonnet** sub-agents (`Workflow` / `Agent` with `model:'sonnet'`); reserve yourself (Opus) for synthesis, judgment, and prod gates. **Ultracode is ON** — use the Workflow tool for substantive multi-agent work; only go solo on conversational/synthesis turns.
- **Model tiering:** no DeepSeek anywhere (the 9 site_configs still declare it — a latent violation to purge centrally, never per-ir35-config). Sonnet writes/builds, Opus does hardest reasoning/judging, Haiku grunt only.
- **No em-dashes** in user-facing copy (commas, parentheses, full stops, middle dots).
- **Faceless off-site authority only** — the user is not an accountant; data-PR / tools / citations / GEO, never named-expert PR.
- **Factual back-patches / stale sweeps are MANAGER-DIRECT** — *you* make every per-citation judgment; do not hand the judgment to a sub-agent. (You may have a Sonnet worker APPLY edits you have specified exactly, but you decide each one.)
- **NEVER touch `contractors-ir35/`** — another agent owns it (now "Contractor Tax Accountants", launch-built, deploy-gated).
- **Auto-commit is OFF** — deploys build from the working tree; do not `git commit` unless the user asks.
- **A* / human-voice quality bar** — mechanical schema/FAQ stuffing or robotic exact-match titles *hurt* YMYL citation; genuine answers, real worked numbers only.

## DONE — verified live on prod (do NOT redo)
- **Measurement layer** (migrations `20260617000001-4`): channel split `bing_family`/`google`, named AI engines (chatgpt/perplexity/copilot/claude/gemini), Copilot routed from `sydney.bing.com`, `vw_channel_leads_weekly`, first-touch `vw_visitor_journey` fix, `vw_probable_ai_direct`, `bing_ai_performance` table. Backwards-compat macro view keeps the console working.
- **Clean de-stale ships** (deployed → verified live → IndexNow'd): Property `llms-full` (2026/27 + 5% surcharge); generalist (wrong domain `ukbusinessaccountants` eliminated); Solicitors (buildService audience bug + date-banded `llms` dividend + cross-site footer).
- **Medical domain alignment** — 79 files corrected to `www.medicalaccounts.co.uk` (all 46 canonicals + medical.py + OG routes + footers + tooling + CI). **LOCAL only — not deployed.**

## NEXT ARC (priority order)
1. **Per-site fact sweeps (MANAGER-DIRECT):**
   - **agency employer-NIC first (biggest, ~60 instances):** `13.8%→15%`, secondary threshold `£9,100→£5,000`, Employment Allowance `£5,000→£10,500`, Class 1A `13.8%→15%`, and **recompute every worked example** (e.g. employer NI = max(0, salary−5000)×0.15). The calculator **components** `digital-agency/web/src/components/calculators/EmployerNICalculator.tsx` and `SalaryDividendCalculator.tsx` still hardcode `9100` — fix them too. **CRITICAL:** do NOT blind find-replace — several `£9,100` hits are NOT the NI threshold (a director's loan, an R&D cost, a debt figure); and correctly date-banded historical statements ("2025/26: 8.75%") are CORRECT and must be left. **digital-agency must not deploy until this sweep is complete** (its calculators already say 15%, so shipping now = 15%-vs-13.8% contradiction across dozens of pages).
   - then **Solicitors / generalist / Dentists** dividend (FA 2026 `8.75/33.75→10.75/35.75`, 39.35 unchanged) + AMAP mileage (`45p→55p`) + employer-NIC, each ending deploy + IndexNow. Solicitors rate page + take-home calc are *2025/26-labelled* (refresh to 2026/27, don't just patch). Solicitors also has **179 em-dash content lines** to sweep.
2. **Medical deploy + 46-URL reindex** — run a build + the FLAT-routing link audit (`scripts/medical_flat_link_audit.py`, NOT slug_resolver) first; it also ships Medical's uncommitted rewrite/net-new.
3. **Phase 2 — the actual 10X (highest leverage):** apply the E-E-A-T `@graph` schema estate-wide (the generator exists in `optimisation_engine/apply/_schema_generator.py` but `schema:` frontmatter is empty on all posts; extend `schema_only.py` VALID_SCHEMA_TYPES first), BLUF answer-boxes, IndexNow-on-write, the data-PR asset factory (replicate the Landlord Tax Index to all 5 sites — all-5-this-quarter per decision 2, each gated on a data-source sign-off), calculator citability.
4. **Track-B tail:** confirm the Bing `GetAiPerformance` method name (via `--ai-inspect`) before citation ingestion runs; add console sub-channel panels.

## Operational gotchas (learned the hard way this session — these will save you time)
- **Deploy recipe:** `./scripts/deploy-and-index.ps1 -Site <key>` (PowerShell). Site keys come from `sites/<key>.json`; note **agency's key is `agency-founder-finance`**. It runs predeploy gate → `vercel deploy --prod --yes` → restores linkage → drains IndexNow. Non-interactive.
- **Benign exit-1:** the script ends with an IndexNow *queue* drain that is empty for manual file edits, so it reports `exit 1` "No valid URLs to submit" **even though the deploy succeeded**. Confirm the deploy by checking for `Production: https://...` in the output, then submit the changed URL explicitly: `python -m optimisation_engine.indexing.submit_indexnow --site <key> <url>`.
- **Root `.vercel/project.json` must exist** for the script's backup/swap/restore. If missing, seed it: `cp Property/.vercel/project.json .vercel/project.json`.
- **ONE deploy at a time** — the script swaps the shared repo-root `.vercel/project.json`; concurrent deploys corrupt each other's linkage.
- **`sites/<site>.json` may lack `vercel.projectJson`** (generalist's did, newly scaffolded) — add `"projectJson": "<Site>/.vercel/project.json"`.
- **Migrations:** add the filename to the `MIGRATIONS` list in `scripts/apply_web_analytics_migrations.py`, then `python scripts/apply_web_analytics_migrations.py prod <substring>` (the substring filter runs only matching files; it is transactional, so errors roll back cleanly). **Staging is dormant** (HTTP 544 timeouts) — prod is safe to target directly given the transactional guarantee. Prod ref `dhlxwmvmkrfnmcgjbntk`; token `SUPABASE_ACCESS_TOKEN` in `.env`.
- **Ground-truth facts** (cross-check against each site's own canonical rate page, prefer the site's maintained figures): employer NIC 15% / £5,000 secondary / £10,500 EA (from Apr 2025); dividend 10.75/35.75/39.35 (from 6 Apr 2026); AMAP 55p first 10k miles (from 6 Apr 2026); SDLT additional-dwelling surcharge is 5% (not 3%) since 31 Oct 2024.

## Immediate next action
Start the **agency employer-NIC fact sweep** (manager-direct, observing the no-blind-replace nuance above). Then proceed down the NEXT ARC list, reporting after each phase. Nothing is half-applied: every shipped change is verified live; everything else is safe in the working tree.
