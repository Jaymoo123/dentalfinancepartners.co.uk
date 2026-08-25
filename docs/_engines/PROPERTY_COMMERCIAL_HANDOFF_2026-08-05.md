# Property commercial capture — HANDOFF, 2026-08-05

> **If you are a fresh agent taking over: read this file top to bottom, then do the
> RESUME HERE step at the bottom. No conversation context is required.**

You are picking up an investigation that started as "what opportunities are left?"
and ended somewhere quite different. The short version: **the estate's growth problem
is not a shortage of niches, it is that Property (the one site that works) has never
captured any commercial demand, and the content engine has been pointed at the wrong
kind of topic.** Everything below is measured, not inferred.

## Document map (read in this order)

| Doc | What it is |
|---|---|
| `PROPERTY_CEILING_ANALYSIS_2026-08-05.md` | The measurement. Is Property near its ceiling? (No.) |
| `PROPERTY_COMMERCIAL_CAPTURE_SCOPE_2026-08-05.md` | The diagnosis + commercial architecture + four-market geography data |
| `PROPERTY_COMMERCIAL_PLAN_2026-08-05.md` | **The plan.** Six phases, gates, risks, owner decisions |
| this file | Handoff: state, traps, what is done, what is next |

Commits: `cb9c496e` (ceiling), `d5514118` (scope), `21211b70` (Bing correction),
`94662d90` (architecture + geography), `3cb26b08` (plan), `83220b79` (screener probe
expansion). Branch `expansion/phase-0`.

## The findings, compressed

1. **Property is far from its ceiling.** Google impressions 11.5k (Apr) to 77.5k (Jul);
   Bing 15.5k to 67.1k. 665 pages earn impressions, only 118 earn >=100.
2. **It has never won a commercial query.** 90d: commercial bucket = 4,856 impressions,
   **5 clicks**. Local terms = 2,465 impressions, **1 click**.
3. **The homepage is not competing.** 42 impressions, 1 click, 10 queries in 90 days.
   Ranks for brand only. Position 82 for `landlord tax accountant`.
4. **The head term is served by a careers article.** Google picks
   `/blog/property-accountant-services/how-to-become-property-accountant` for
   `property accountant` (720/mo, £17.55 CPC), at position 24.8.
5. **`landlord tax` (2,900/mo) earns ZERO impressions.** Largest term in the UK set,
   larger than any single term in the US, AU or CA sets. Complete absence.
6. **40 city posts target terms with zero measured volume** and cannibalise the six
   pages that matter. London alone has 6 competing pages plus `/locations/london`.
7. **Bing beats Google**: July 67,141 impr / 1,692 clicks / 2.52% vs 77,466 / 811 /
   1.05%, and 16 leads vs 11. But **both are weak** at avg position 4-6.
8. **Informational content is the PRIMARY lead source**: 52 leads enter on blog posts
   vs 32 on the homepage. The real split is decision-stage vs reference-stage.
9. **Estate context**: July leads = Property 62, all seven other sites combined 21
   (and those have no paying buyer). Property is the business.

## Traps — read these before you touch data

Three of these already cost this investigation a wrong conclusion.

1. **Bing `GetQueryStats` is a truncated top-N slice.** Summing it produced a 19.7%
   CTR and a confident, wrong "Bing converts 19x better, Google uniquely broken"
   conclusion. The owner caught it from the BWT dashboard (139.5k impressions).
   **Site totals come from `GetRankAndTrafficStats`; per-page from `GetPageStats`.**
   Memory: `bing_query_stats_topn_trap`.
2. **GSC query-dimension rows are a sample.** They summed to ~29k over 90d against
   ~140k on the empty-dimension aggregate. Use the date/empty dimension for totals.
   Memory: `gsc_query_sum_undercount`.
3. **Session counts double if you forget `is_bot` / `is_embed`.** July: 5,188 human
   vs 7,451 `ua_pattern` bot rows.
4. **Search volume is not impressions.** GSC showed healthy impressions on
   `property accountants leeds`; DataForSEO shows the term has **zero** volume. Always
   check volume before treating an impression count as demand.
5. **Do not trust a stored snapshot.** Estate rule: re-pull GSC/Bing before any traffic
   claim.

## What is already done

- **Analysis complete and committed** (four docs above).
- **Phase 0 instrument built**: `scripts/property_commercial_baseline.py`. One command,
  one JSON, all five sections (gsc / bing / channels / leads / keywords). It encodes
  every trap above. `--free-only` skips the DataForSEO section. **Run it and commit the
  JSON before changing anything**, so the 28-day reads are a diff.
- **Screener side-quest closed**: `optimisation_engine/niche_screener/generators/
  probe_expand.py` mines vertical vocabulary from the ~274 known lead-seller domains
  (free, cached). Result: 742 phrases, 722 new, but the multi-vendor tier is the same
  commodity set. **The binding constraint on new niches is the business model, not the
  probe list.** Do not re-run niche discovery expecting a different answer.

## What is NOT done

Everything in `PROPERTY_COMMERCIAL_PLAN_2026-08-05.md` phases 1-6. Nothing has been
changed on the Property site. No redirects, no content, no deploys.

## Governing constraints (locked estate rules — do not work around these)

- **Homepage and all conversion surfaces are FROZEN** (`docs/_engines/property_frozen_pages.md`).
  A homepage edit needs an explicit per-page sign-off line added to that file first.
  This blocks the highest-leverage item in the plan.
- **Rewrite-only, never collapse.** Consolidation needs fresh GSC + Bing + guard +
  **Bing veto** + per-cluster owner approval. The fresh-data half is satisfied by these
  docs; the approval half is not.
- **Opus writes all content.** Sonnet is banned from blog bodies.
- **Voice standard locked** (`docs/_engines/VOICE_STANDARD.md`): second person, no
  meta-commentary, no SEO-architecture words in prose, **no em-dashes**. Floor is
  `scripts/voice_scan.py` band `clean` or `minor`.
- **A\* bar**: a page that exists only to hold a keyword is a violation. That is what
  most of the 40 city posts are.
- **No named-expert claims, no quotes, no credentials** (the owner is not an accountant).
- **No phone numbers displayed. No Google Business Profile, ever.**
- **Deploys need owner sign-off. Auto-commit is off.**
- **One sub-agent per topic, in parallel** (wave batch size 1).

## Open owner decisions (all still unanswered)

1. **Homepage sign-off line** in `property_frozen_pages.md`. Blocks plan phase 2.1.
2. **`/services` disposition.** It currently targets the same head term as the
   homepage. Recommend homepage owns it, `/services` narrows. No redirect needed.
3. **City consolidation approval**, London cluster first (6 pages, 814 impr, 0 clicks).
4. **DJH ranks 6th for `property accountant`.** Optimising hard against the lead buyer
   is a commercial question, not a technical one.
5. **No-GBP rule confirmation.** Does not block `property accountant` (no local pack)
   but caps `landlord accountant` and `accountant for landlords`, which carry a
   3-result pack.

## Geography (asked and answered, do not re-litigate without new information)

Measured across 15 commercial terms: UK 6,840 vol @ £10.42 avg CPC; US 5,240 @ $34.26;
Australia 1,850 @ $8.15; Canada 1,320 @ $7.50.

- **US is the value outlier** (~3x CPC; `rental property accountant` at $87.15) but
  transfers worst: "property tax" there is a state-level ad valorem levy across 50
  regimes, and the vocabulary is `real estate accountant`, not `property accountant`.
- **Australia fits the content best** (negative gearing, CGT discount, land tax) at
  ~27% of UK volume. Vocabulary shifts to `investment property accountant`.
- **`propertytaxpartners.co.uk` is a ccTLD**, hard-geotargeted to the UK. A `/us/` or
  `/au/` subfolder **cannot** inherit its authority. A new domain starts at zero.
  Operational leverage (build system, CRO machinery, calculators, pipeline) transfers;
  ranking authority does not.
- **Standing recommendation: hold geography** until plan phases 1-3 are measured. The
  largest untapped term found in any of the four markets (`landlord tax`, 2,900/mo) is
  in the market where we already hold the domain, the authority and the buyer.

## Useful commands

```bash
# Phase 0 baseline (run this first; --free-only skips DataForSEO spend)
python scripts/property_commercial_baseline.py --free-only

# Bing site totals only (the correct method)
python scripts/property_commercial_baseline.py --section bing

# Four-market keyword volumes (costs ~$0.05)
python scripts/property_commercial_baseline.py --section keywords

# Bing per-page ingest (feeds the Bing veto)
python -m optimisation_engine.clients.bing_query_client property --site-queries
```

Credentials all live in the root `.env`: `SUPABASE_ACCESS_TOKEN`,
`BING_WEBMASTER_API_KEY`, DataForSEO creds. GSC uses OAuth via
`agents/utils/gsc_client_oauth.py` and **must be run from the repo root**
(it resolves `secrets/gsc_credentials.json` relatively).

## RESUME HERE

1. **Run the Phase 0 baseline and commit the JSON.** `python
   scripts/property_commercial_baseline.py` (drop `--free-only` once, to capture the
   keyword section). This is the diff target for every later read. Nothing else starts
   before this exists.
2. **Pull per-page Bing position for the 55 commercial/city posts.** This is the input
   to the Bing veto and it gates every redirect in plan phase 2.3. A page that is dead
   on Google may be alive on Bing, and Bing is the better converter.
3. **Execute plan Phase 1** (no owner gate, low risk, additive):
   - Fix the www / non-www canonicalisation split.
   - Quarantine the three careers posts (`how-to-become-property-accountant`,
     `property-accountant-jobs-uk`, `property-accountant-salary-complete-guide`) with
     `noindex` and move them out of the `property-accountant-services` category.
   - Deploy and verify live before starting anything in Phase 2, so the measurement is
     not confounded.
4. **In parallel, put the five owner decisions above in front of the owner.** Decision 1
   (homepage sign-off) unblocks the single highest-leverage item and should not wait.
5. **Then Phase 3.1, the landlord tax hub** — the largest gap, a new page, no redirect,
   no consolidation approval needed. Pull the SERP composition for `landlord tax` first
   (as was done for `property accountant`, which turned out to have no local pack):
   volume is not the same as available clicks.

**Do not start with the city consolidation.** It is the only destructive block, it
touches 40 pages, and it is deliberately last in the plan.

---

## AUDIT NOTE (2026-08-05, Fable session)

This document was audited against same-day re-pulls. Verdict: directionally right, materially wrong in specific numbers and two conclusions. Before acting on any figure or conclusion here, read docs/_engines/PROPERTY_ANALYSIS_AUDIT_2026-08-05.md (verdict ledger, 13 decision-changing corrections, corrected fact base) and docs/_engines/PROPERTY_ARCHITECTURE_RECOMMENDATIONS_2026-08-05.md (amended plan). Headline corrections: query-mix CTR argument refuted; Phase 4 reference-content ban refuted; city 301 direction reversed (consolidate within city, never into national pages); city denominator is 19 posts + 5 routes; landlord tax zero is Google-exact only (Bing serves it 1,064 impr / 121 clicks); local pack IS present on property accountant, so no-GBP caps 6 clusters; Bing 6-9% CTR norm unsupported.
