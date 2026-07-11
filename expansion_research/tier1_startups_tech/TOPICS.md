# Topic pool — Startups & tech/SaaS (R3, Tier-1 #4)

Date: 2026-07-11. Pool file: `topic_pool.json`; intent classification: `topic_pool_classified.json`
(built by `s5_pool_build.py` / `s5b_intent_classify.py`).

## Derivation (honest accounting)

| Source | Raw rows | Notes |
|---|---|---|
| Google Autocomplete (28 seeds × a-z) | 2,818 unique suggestions | `raw/autocomplete_raw.json` |
| DataForSEO keyword_suggestions (8 seeds, UK) | 446 | `raw/dfs_keyword_suggestions.json` |
| DataForSEO ranked_keywords (accountancycloud.com, barnesandscott.com, saasaccountants.co.uk) | 1,010 flat / 995 unique volumed | `raw/dfs_ranked_keywords.json` |
| Rival sitemap slugs (8 verified specialists) | 2,097 URLs → slug-derived titles ≥3 words | `raw/rival_sitemaps.json` |

After the in-script relevance gate (startup/SaaS/R&D/SEIS/EIS/EMI/funding regex) + junk/non-UK
filter + self-dedup: **raw pool = 3,154 terms**.

## Estate dedup gate (page-level, ENTIRE estate)

Checked against all 8 estate sitemaps (2,760 URLs, `own_estate_exclusion.json`) + 2,035
Supabase blog_topics rows (topic + primary_keyword + slug). Exact-normalised + fuzzy
(difflib ≥0.90 drop, 0.78-0.90 flagged):

- **Dropped exact: 32** — incl. "startup accountant", "r&d tax credits explained", "seis and eis"
  (see collision warning below).
- **Dropped fuzzy: 39** — e.g. "accountants for ai startups" ≈ generalist's
  `accountant-for-ai-startups`.
- **Borderline flagged (kept, needs per-page judgment at briefing): 322.**
- **Kept: 2,814** — but see intent split; the buildable pool is much smaller than the kept count.

## ⚠ Estate collision warning (the load-bearing finding)

The dedup gate surfaced that this niche is NOT greenfield inside the estate:

- **generalist (hollowaydavies.co.uk)**: a live `/r-and-d-credits` hub, an
  `/calculators/rd-tax-credit-estimator`, and a `randd-tax-credits` blog category whose pages
  include literal head-term plays: `accountant-for-saas-startups-uk`,
  `accountant-for-tech-startups-uk`, `accountant-for-ai-startups`, `accountant-for-startup`
  (+ pre-incorporation/pre-revenue variants). ~37 URLs match the niche regex.
- **agency (agencyfounderfinance.co.uk)**: ~22 URLs of deep agency-scoped R&D content
  (merged scheme, ERIS intensity test, PAYE cap, LLM fine-tuning etc.) + its own
  rd-tax-credit-estimator, plus an `/agencies/saas-agencies` page.
- contractors-ir35: owns IR35/off-payroll wholesale (boundary note only, per house position 27).

Consequence: launching this site as planned puts THREE estate properties on overlapping R&D/
startup queries. Options for the owner (open question in DOSSIER.md): (a) migrate/301 the
generalist startup-head pages to the new site at launch; (b) scope the new site to exclude the
exact pages generalist holds and only build adjacent depth; (c) accept controlled overlap with
distinct intent. Per the estate's data-gated-consolidation rule, (a) needs GSC evidence first.

## Intent classification (regex triage, Claude-reviewable)

| Bucket | Count | Read |
|---|---|---|
| accountant_seeking | 197 | core money pool ("saas accountant", "emi scheme setup accountant", fees/cost queries) |
| funding_stage_signal | 272 | VC/round/advance-assurance/valuation contexts — high lead quality, maps to /for/funded-startups |
| founder_diy | 277 | how-to/eligibility/deadline/calculator — guide + tool capture |
| investor_diy | 142 | EIS/SEIS relief-claiming investors — traffic/authority only, explicit non-lead segment |
| ambiguous | 1,926 | mostly autocomplete noise + sitemap slugs; mine at wave-briefing time, not launch |

**Honest buildable pool: ~740 classified core terms**, clustering to an estimated 150-250
distinct pages after per-page dedup and borderline judgment — comfortably enough for launch
core (~40 pages) + 3-4 net-new waves. The 2,814 "kept" number overstates usable inventory;
do not quote it as topic supply.

## Sample high-value survivors (volume from ranked/suggestions where present)

- "emi share scheme" 1,900/mo KD 0; "emi scheme" 1,900 KD 1; "enterprise management incentives" 8,100 KD 4
- "seis advance assurance" 480 KD 2 CPC £27.13 (+ compliance-statement long tail)
- "additional information form r&d" 390 KD 0; "r&d claim notification" family
- "accountant for startup(s)" 720 KD 0 CPC £39.81 (head — see collision warning)
- "r and d tax credits calculator" 170 KD 0 CPC £23.68
- SaaS ops long tail: revenue recognition, deferred revenue, SaaS VAT place-of-supply (low
  measured volume, zero estate coverage, specialist-defining)
