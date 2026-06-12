# Engine map + new-site onboarding

> **Purpose:** one place that answers "where are the engines, which are reusable, and how do I point them at another site?" Companion to [`REWRITE_PROGRAM.md`](REWRITE_PROGRAM.md) (legacy-page rewrite engine) and [`NETNEW_PROGRAM.md`](NETNEW_PROGRAM.md) (wave/megawave net-new engine). Last mapped 2026-06-03.

All shared engines live under `optimisation_engine/`. The model: **Python gathers + structures data; Opus 4.8 reasons + writes (via subagent); a human approves; execution is hand-driven.** No DeepSeek anywhere (see memory `feedback_no_deepseek_opus_only`).

## 1. Engine map (what lives where)

| Package | What it does | Site-agnostic? | Entry |
|---|---|---|---|
| `optimisation_engine/clients/` | GSC + Bing + DataForSEO + DDG/Serper/CSE API clients; fetch + upsert to Supabase | yes (site_key + per-site URL maps) | `gsc_query_client`, `gsc_page_client`, `bing_query_client`, `ddg_serp_client` |
| `optimisation_engine/ingestion/` | batch GSC ingest, internal-link suggester, topic repo | yes | `ingestion.ingest_gsc_queries` / `ingest_gsc_pages` |
| `optimisation_engine/blog_generator/` | LLM blog generation, per-site voice/categories/links | **yes** (7 site configs) | `python -m optimisation_engine.blog_generator --site <s>` |
| `optimisation_engine/competitor/` | SERP fetch, deep page-signal extraction, gap analysis, Opus brief scaffolds | partial (SITE_RULES has 2/7) | `python -m optimisation_engine.competitor --site <s>` |
| `optimisation_engine/corepage/` | core/landing-page SEO: head-keyword cannibalisation, competitor term/section analysis, guide-consolidation audit | **property-only config** | `python -m optimisation_engine.corepage --site <s> --page <p>` ; `.term_analysis` ; `.guide_audit` |
| `optimisation_engine/track2/` | per-slug GSC+Bing+GA4 puller; target-query coverage | hardcodes `property` | `track2.pull_page_data --slug <s>` |
| `optimisation_engine/analysis/` | opportunity detectors (keyword gaps, SERP/GA4 signals, monitored-page regression) | yes (by site_key) | detectors module |
| `optimisation_engine/apply/` | schema gen, redirect/canonical application, apply lifecycle | mostly yes | `apply.new_page` etc. |
| `optimisation_engine/indexing/` | IndexNow submission (Bing/Yandex/...) | **yes** (5/7 keys) | `python -m optimisation_engine.indexing.submit_indexnow --site <s>` |
| `scripts/` | orchestration + guards: `track2_collapse_guard.py` (collapse equity gate), `register_monitored_batch.py` (90-day regression baseline), `deploy-and-index.ps1`, wave runners | guards hardcode `property` | see scripts |

## 2. Per-site config surface (what must exist to run the engines on a site)

| Surface | Location | Coverage | New-site action |
|---|---|---|---|
| niche.config.json | `<Site>/niche.config.json` | all 7 | exists for built sites |
| blog generator config | `optimisation_engine/blog_generator/site_configs/<site>.py` | all 7 | exists |
| Supabase `sites` row | DB `public.sites` (`site_key`, `domain`, `gsc_property_url`, `niche`) | 6/7 (contractors-ir35 missing; solicitors drift) | verify/INSERT; `optimisation_engine/config.py::get_site` |
| GSC map | `clients/gsc_page_client.py::_SITE_URL_MAP` (+ query client) | 6/7 | add `sc-domain:<domain>` |
| Bing map | `clients/bing_query_client.py::DEFAULT_SITE_URL` | 6/7 | add `https://<domain>` |
| IndexNow key | `indexing/config.py` + `<Site>/web/public/<key>.txt` | 5/7 (medical, solicitors missing) | `python -c "import secrets;print(secrets.token_hex(16))"`, place key file, add config entry |
| **SITE_RULES** | `competitor/brief_for_opus.py` (lines ~43-104) | **2/7 (property, medical)** | **add entry** (content_dir, web_root, domain, audience, lead_form_segments, pillar_pages, authority_links) |
| **CORE_PAGES** | `corepage/config.py` | **1/7 (property)** | **add entry** (head_terms, geo_modifiers, page_url, source_tsx, web_root, head_match_like) |
| Vercel link | `<Site>/web/.vercel/project.json` | 5/6 | verify projectId/orgId |
| GA4 id | `<Site>/niche.config.json` → `seo.google_analytics_id` | 4/7 | add measurement id |

## 3. Hardcoded-`property` blockers (parameterise on first onboarding)

These currently assume Property. Fix each **when the engine is first run for the new site** (so the change is tested live), by threading `site_key` and sourcing paths/domain from `niche.config.json` / the `sites` table:

- `corepage/config.py` — `CORE_PAGES` only has `property`. **Add the target site's homepage (+ /services, /locations) entry.**
- `corepage/term_analysis.py` — `ROOT_TOKENS` are property terms ("property", "landlord", "buy-to-let"). Parameterise per site (e.g. dentists: "dentist", "practice", "associate").
- `corepage/guide_audit.py` — `BLOG = Property/web/content/blog`; `CLUSTERS`/`GAP_TOPICS` are property-specific. Derive `BLOG` from the site; define the site's own clusters.
- `track2/pull_page_data.py` — `site_key='property'` literal in `_gsc_query_rows` / `_bing_query_rows`. Make `site_key` a parameter.
- `scripts/track2_collapse_guard.py` — `SITE='property'`, `BLOG='Property/web/content/blog'`, `PROD_DOMAIN`. Add `--site` + resolve from config.
- `scripts/register_monitored_batch.py` — `SITE`, `PROD_DOMAIN`, `BLOG_DIR`. Add `--site` + resolve from config.

Already site-agnostic, no change: `clients/*` (maps), `indexing`, `blog_generator`, `analysis`, `competitor` engine logic (only `SITE_RULES` data needs an entry).

## 4. Onboarding checklist — apply the engines to an existing built site

Target = an already-built site (Dentists / Solicitors / Medical / Generalist): niche.config, blog config, Vercel, and usually GSC/Bing already exist, so onboarding is mostly **SEO-engine config + parameterising blockers as hit**.

1. **Confirm data + infra** (mostly done for built sites): `sites` row present; GSC/Bing maps include the site; GSC/Bing data flowing (`ingestion.ingest_gsc_queries <site>`); Vercel `.vercel/project.json` present; IndexNow key (add if missing).
2. **Add the two SEO-engine config entries** (the real gap): `SITE_RULES[<site>]` in `competitor/brief_for_opus.py`; `CORE_PAGES[<site>]` in `corepage/config.py`.
3. **Refresh data**: `GSCQueryFetcher('<site>').fetch_and_store(days=90)` + `bing_query_client <site>`.
4. **Run the analysis engines** (parameterise each blocker the first time it errors on `property`): `corepage --site <site> --page homepage` (+ `term_analysis`), and `competitor --site <site>` for gap briefs.
5. **Opus subagent writes the brief(s)**; manager reviews.
6. **Implement** the page edits by hand from the brief (no DeepSeek).
7. **Verify + deploy**: `cd <Site>/web && npm run build`; deploy via the proven Vercel command (project/org IDs from `.vercel/project.json`); pause at the deploy gate for approval.
8. **Post-deploy**: register changed pages in `monitored_pages` (`register_monitored_batch.py`, parameterised for the site) + submit IndexNow.

Reference: the Property homepage run (memory `corepage_engine`) is the worked example of steps 2-8.

---

## 5. Model provenance (generator frontmatter)

Every generated or rewritten blog post carries a frontmatter field:

```
generator: <model>/<pipeline>
```

### Format

| Example value | Meaning |
|---|---|
| `deepseek-chat/consolidated-generator` | Written by consolidated blog generator (DeepSeek) |
| `opus-4.8/netnew-wave` | Net-new wave page written by Opus 4.8 sub-agent |
| `opus-4.8/track2-rewrite` | Legacy page rewritten by Track-2 engine (Opus 4.8) |
| `sonnet-4.6/track2-rewrite` | Legacy page rewritten by Track-2 engine (Sonnet) |
| `claude/legacy-supabase` | Pre-consolidation Anthropic generation (supabase pipeline) |
| `deepseek-chat/legacy-bulk` | Pre-consolidation DeepSeek bulk generation |

### Who writes it

| Pipeline | Where set | Value |
|---|---|---|
| Consolidated blog generator (`optimisation_engine/blog_generator/`) | `output_writer.py::assemble_frontmatter` — derived from `site_config["llm_model"]` + hardcoded pipeline suffix `/consolidated-generator` | e.g. `deepseek-chat/consolidated-generator` |
| Track-2 rewrite writer (`scripts/track2_rewrite_writer.wf.js`) | Writer agent prompt HARD RULE — uses `WRITER_MODEL` constant near top of file | e.g. `sonnet-4.6/track2-rewrite` |
| Net-new wave RUN sub-agent (`templates/rolling/run.tmpl.md`) | Step 4 of per-page workflow instruction | `opus-4.8/netnew-wave` |

### Backfill mapping (for posts without the field)

Era classification lives in `scripts/blog_provenance.py` and caches results under `.cache/provenance/`. Run `--backfill-generator` to see counts; add `--execute` to write files.

| Era | Confidence | generator value assigned |
|---|---|---|
| `deepseek` | high | `deepseek-chat/legacy-bulk` |
| `deepseek` | low | `deepseek-chat/unverified` |
| `claude-supabase` | high | `claude/legacy-supabase` |
| `claude-supabase` | low | `unverified/claude-era` |
| `opus-wave` | any | `opus-4.8/netnew-wave` |
| `track2-rewritten` | any | `opus-4.8/track2-rewrite` |
| `ambiguous` / `untracked` | — | skipped (cannot assign) |

Backfill command (dry-run):

```
python scripts/blog_provenance.py --all --backfill-generator
python scripts/blog_provenance.py --site medical --backfill-generator
```

Add `--execute` to apply writes. The script inserts `generator:` after the `date:` line (or at frontmatter end), only when the field is absent. It never touches the body.
