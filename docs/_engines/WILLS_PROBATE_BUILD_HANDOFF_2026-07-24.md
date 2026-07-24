# HANDOFF: Wills/Probate/Estate-Planning site build
Date: 2026-07-24. For: a fresh agent starting the wills/probate build. Author: screening session (niche screener v2). Everything referenced here is committed on branch `expansion/phase-0`.

## Why this vertical (the one-paragraph case)

Screened by a same-day-backtested instrument (9/9 pre-registered checks, 2 post-fix; see `docs/_engines/NICHE_SCREENER_V2_BACKTEST.md`). Wills/probate scored **60.6/100** — highest genuine build candidate on the all-time league (`docs/_engines/CROSS_DOMAIN_LEAGUE_2026-07-24.md`). It wins the composite that predicted property's success: **corpus proxy 409 distinct DIY queries** (property's 126 sustained a 697-post site), **delegation + DIY demand coexist** (DIY share 0.75 with 10,600 delegation volume — readers who also hire), **auto-verified paid lead market** (30+ seller domains, ~£25 baseline, premium tiers to £95+), and a **dated regulatory shock: pensions enter IHT scope 6 April 2027** (~49,000 affected estates/yr per HMRC's own impact assessment) which both discovery generators surfaced independently. Winnability: mean specialist thinness 0.84 across 50 classified long-tail SERPs (CI ±0.05). Known headwind: 100% AI Overview coverage on DIY SERPs — tools, calculators and capture matter more than prose answers.

## Where the research lives (all committed)

- **Full research export**: `optimisation_engine/niche_screener/out/wills_probate_research_export/`
  - `universe.json` — 518 queries, intent-tagged (DIY/DELEGATION/OTHER). THIS IS THE SEED CONTENT PLAN: 409 DIY queries = candidate post/tool topics; 45 delegation queries = commercial page targets.
  - `volumes.json` — per-query Google Ads volume/CPC/monthly history (spike detection data).
  - `serps.json` — 50 sampled long-tail SERPs, full organic top-10 with titles/snippets + AIO flags. Competitor intelligence.
  - `classify.json` — every SERP domain labelled (SPECIALIST/GENERALIST/UGC/GOV_EDU...). The SPECIALIST list = the competitor set; the UGC-heavy queries = softest targets.
  - `gates.json` — incl. G1 evidence: the 30+ lead-seller domains (buyer-market map; shedsocial.co.uk sells estate-planning leads ~£25).
  - `score.json`, `manifest.json` — component scores + provenance.
  - `candidate_*.json` — discovery-generator evidence records (wills + probate lead markets, both pensions-into-IHT reg-churn angles, LPA).
- **Dossier (readable)**: `optimisation_engine/niche_screener/out/ext-wills-probate_run_20260724T133216Z_fe9fa8.md` — gates, components, top winnable queries table.
- **Strategy context**: `docs/_engines/NEXT_HORIZON_STRATEGY_2026-07-24.md` (why-this-programme; regulatory ground truth: SRA referral fees LEGAL outside personal injury — wills/probate lead selling is UNGATED), `CROSS_DOMAIN_LEAGUE_2026-07-24.md`, `NICHE_SCREENER_V2_BACKTEST.md`.
- Raw API caches (rescoreable, gitignored, on this machine only): `optimisation_engine/niche_screener/cache/run_20260724T133216Z_fe9fa8/ext-wills-probate/`.

## What the estate already gives you (do not rebuild)

- **Site template + playbook**: construction-cis is the canonical launch pattern — conversion stack live at day one (calculators, mini-capture, sticky CTA, data asset). See `docs/construction-cis/STATE.md` and memory `construction_cis_state`.
- **Post-mortem law** (`docs/PORTFOLIO_LEAD_AUDIT_2026-07-10.md`): ship the conversion machinery WITH the content; day-one technical hygiene on a zero-authority domain (stable sitemap lastmod, SSR blog links, 308 apex, sameAs schema) — medical/agency died of these; never dilute a young domain with off-topic posts.
- **Locked editorial rules** (memory index): Opus-only content bodies; A*-gold-standard bar; no em-dashes; blog body = raw HTML in frontmatter; faceless authority (owner is NOT a solicitor — no named-expert claims, no regulated-activity language; informational + tools + "speak to a specialist" handoff only).
- **Entity**: new brand = trading name of Ashfield Trading Ltd; /contact-only contact model; mandatory data-sharing consent checkbox on lead forms; leads into estate Supabase `leads` table with a new `source` value (needs `leads_source_valid` constraint migration — copy pattern from `supabase/migrations/20260723000001...`).
- **Deploy**: Vercel via env-override CLI from repo root (memory `vercel_cli_deploy_workflow`); auto-deploy OFF; owner sign-off before prod.

## Build shape (suggested, not locked)

1. Brand + domain decision (owner). 2. Scaffold from construction-cis template. 3. Calculator fleet first — the data says these queries have tool intent: probate cost calculator, IHT threshold/liability calculator, lease... (see `volumes.json` tool-frame queries; "how much does probate cost" family = top demand), pensions-into-IHT 2027 estimator = the flagship data asset. 4. Launch corpus from `universe.json` DIY queries ranked by volume × thinness (both in the export; join on query). 5. Nurture + lead capture day one; buyer outreach starts with the G1 seller-domain map (sell-side comps) and fragmented probate solicitors/estate planners as buyers. 6. April 2027 pensions-IHT content wave planned from month 1 — demand spikes as commencement nears.

## Constraints from this session's findings

- AIO 100% on DIY SERPs: every post needs a tool/next-step reason to click through; pure-answer prose will be cannibalised.
- Wills/probate is YMYL: expect the medical-style authority tax on a fresh domain — technical hygiene + entity schema + data-PR citations from day one are not optional.
- Regulatory: wills/probate/estate-planning lead selling is unregulated (NOT personal injury; NOT claims management). Do not drift into financial-promotion territory (equity release, pension products) without the IAR decision.
- Do not touch `optimisation_engine/niche_screener/` (live instrument) beyond READING the export.

## Open questions for the owner (the build agent should ask, not assume)

Brand name/domain; whether divorce-finances (#2, 59.9) launches as fast-follow or waits; buyer-outreach timing (pre-launch vs post-traffic).
