# Agency (Agency Founder Finance) — site state

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** agencyfounderfinance.co.uk · Vercel project `agency-founder-finance` · site_key `agency` · repo dir `digital-agency/` (NOTE: Supabase `sites.content_dir` says "Digital Agency/..." with a space; the on-disk dir is `digital-agency/` — tooling normalises this).

## Corpus + structure (as of 2026-06-12)

- Blog + fundamentals sections (`digital-agency/web/content/blog` + `content/fundamentals`; ~315 mapped slugs). UK + UAE/Dubai founder topics.
- Nurture engine composed but DORMANT (collect-only). Legacy DeepSeek title pipeline (`digital-agency/pipeline/title_optimise.py`) is RETIRED — do not reuse its LLM calls (Opus-only rule).

## Full diagnosis + fix wave (2026-07-08) — CURRENT, see `DIAGNOSIS_2026-07.md` RESUME HERE

- Medical-playbook replay: 7-lane battery on FRESH data (GSC→07-06, Bing→07-08) + Opus synthesis + skeptics + F8 page-level review.
- **Root cause: crawl-budget/authority starvation.** 18/433 indexed (4.2%); 214 discovered-not-indexed + 175 unknown; sitemap fetched daily by Google; no penalties/noindex/firewall; quality fork disproven (all 26 triaged pages read as genuinely strong); internal linking uncorrelated. Generalist same-age = 10x impressions and growing; agency flat.
- Leads: 0 all-time; funnel reframed as "traffic mis-shaped, form invisible" (denominator too small for CRO conclusions).
- Local fix wave DONE, build green, **awaiting owner deploy gate** (deploy + Vercel 308 + GSC sitemap resubmit/Request Indexing). Backlog + monitoring dates in DIAGNOSIS doc.
- Supersedes below: BADR stale spots FIXED (14 corrections, 7 files); employer-NIC hit-list was stale — agency corpus verified CLEAN at 15%/£5,000; CIS glossary page removed (topic leakage).

## Search/optimisation state

- **Data**: GSC live since 2026-04-15 (sc-domain) + Bing flowing. Young-site volumes: 90d at 2026-06-12 = 828 impressions, 0 clicks, 20 pages with any data.
- **SERP meta program batch 1 (2026-06-12)**: 30 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd, 90-day regression watch in `monitored_pages` (to 2026-09-10). Several pre-existing truncated/corrupted metaTitles fixed in passing. Engine: `docs/_engines/SERP_META_PROGRAM.md`. 28d verdicts via weekly_run from ~2026-07-10.
- **Content-gap follow-ups**: `docs/agency/opportunity_register_meta_2026-06-12.md` (register only).

## Known pending

- Stale BADR 10% spots inside `earn-out-tax-treatment-hmrc-agency-sale` and `selling-agency-tax-implications` bodies (operative statements say 14%, a couple of older in-body mentions still say 10%) — flagged during meta batch 1, queued for the FA-2026 stale-figure sweep.
- GA4 not configured for this site (first-party analytics runs).
- Net-new/rewrite content programs: not yet onboarded (see `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`).

## Blog audit + rewrite program (2026-06-12)

- Provenance: 306 claude-supabase (low confidence; subtree-merge masks true origin). Agency never had a DeepSeek generator.
- Blind quality audit: corpus sound (1 a_star / 4 acceptable / 1 needs_rewrite). The needs_rewrite page is remittance-basis-dubai: suspect FIG transitional description, queued for review.
- Rewrite worklist: `docs/agency/rewrite_worklist_2026-06-12.md`. Tier A+B = 3 pages, all in SERP meta cooldown until 2026-06-26. Execution deferred to next cycle when GSC matures (approximately 4 weeks from now). house_positions still to author before any agency wave.
- Approximately 45 pages carry stale 13.8%/GBP9,100 employer NIC (sweep queued estate-wide).
- generator: frontmatter field now stamped on all posts and written by all pipelines going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.
