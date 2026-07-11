# R3 deep-research dossier — Charities & non-profits (estate-expansion PILOT)

Date: 2026-07-11. Branch: expansion/phase-0. Inputs honoured: R2_NICHE_SCORES_FINAL.md (pick +
caveats), R2_REDTEAM.md charities section (STRONG-adjacent field, lead value 3-4, target
small/medium charities + CICs not audit-tier, churches content-only), r2_serp_composition.json
niches #74/#75/#76.

Verification doctrine applied: every claim in this dossier traces to a fetched page, a raw API
response file, or the Supabase cost log. No sub-agents were used for verdicts — all competitor
judgments made directly from the fetched evidence.

## Index

| File | Contents |
|---|---|
| `COMPETITORS.md` + `competitors.json` | Verified competitor universe (method, verdicts, evidence quotes) |
| `TOPICS.md` + `topic_pool.json` / `topic_pool_final.json` | Topic universe + derivation + estate dedup audit |
| `LAUNCH_CORE.md` | Clustering, intent classification, launch core picks |
| `CALCULATORS.md` | Calculator fleet (4 launch-tier + 5 queued) with demand evidence |
| `DATA_ASSET.md` | Flagship asset: UK Small Charity Finance Index (sources verified live) |
| `HOUSE_POSITIONS_OUTLINE.md` | 27 cited positions, every URL fetched 2026-07-11 (raw/citation_checks.json) |
| `r3_call_plan.md` | Paid-call plan + actuals |
| `raw/` | All raw evidence (SERPs, fetch evidence, sitemaps, DFS responses, citations, estate blog_topics dump) |
| `s1..s6*.py` | Re-runnable pipeline |

(`BRAND_SHORTLIST.md` / `r4_domain_check.py` in this folder are the parallel R4 session's work, not part of this dossier.)

## Summary

- **Rivals**: 32 UK queries (Serper gl=gb + DDG) → 180 domains → estate/directory filter (hard
  assert; caught hollowaydavies.co.uk ranking in a charity SERP) → 167 fetch-verified.
  **True fight = ~11 dedicated specialists (7 primary)** in three lanes: small-charity
  accounts/IE (charityaccountants.co.uk, charityaccountant.co.uk, iel.org.uk since 1996,
  charityexaminers.co.uk), CIC compliance (cicaccountants.co.uk, KG Accountants + blog), church
  accounts (finspireaccounting — we stay content-only). ~17 audit-tier/regional firms recorded
  as reference competitors (quality bar, not target clients). Confirms R2's STRONG-adjacent call.
- **Topic pool**: union of autocomplete (2,752) + DFS suggestions (632) + ranked_keywords on 4
  rivals (565) + 14 rival sitemaps (396 kept) = 3,345 raw → estate dedup (vs 2,760 live URLs +
  2,035 blog_topics) + judgment pass + junk sweep = **2,832 keywords → 1,660 page-level topic
  clusters, of which 291 volume-evidenced** (22 ≥1k/mo). Honest planning number: ~300 core
  topics, 1,660 ceiling. Estate dup rate ≈ 0% (2 true collisions, both the generalist's
  charity/church pages) — the 47% historical fear does not materialise in this niche.
- **Launch core**: 29 assets — 8 money pages, 6 pillars, 3 calculators (Gift Aid 720/0,
  IE-vs-audit checker 390/0, GASDS 390/0), 12 priority blogs; SORP-2026 transition is a live
  topical wedge (new SORP applies to periods starting 1 Jan 2026; charity sorp 1,900/mo).
- **Flagship asset**: **UK Small Charity Finance Index** from the Charity Commission full
  register download (verified live, OGL) + Companies House CIC layer — Landlord-Tax-Index
  pattern, annually refreshed.
- **House positions**: 27 positions outlined, all cited to gov.uk / Charity Commission / OSCR /
  charitysorp.org with URLs fetched live (9 initially-404 slugs replaced and re-verified).
- **Spend**: DataForSEO **$0.28764** (budget $3-8); Serper ~$0.032; everything logged in
  api_cost_log. A concurrent session's calls pushed the estate-wide daily total past the $0.85
  code guard late in the run — this task needs no further paid calls.

## Open questions (for owner / next stages)

1. **Generalist cannibalisation**: hollowaydavies.co.uk has live `accountant-for-charities-uk`
   and `accountant-for-churches-uk` pages targeting the pilot's head terms (and ranks for them).
   Decide at S-launch: 301-migrate to the new site vs de-optimise vs coexist. Data-gated
   consolidation rules apply (GSC+Bing refresh + owner approval per cluster).
2. **accountantsforcharities.uk** (Serper #1 for "charity accountant") is WAF-blocked to all our
   fetchers — needs a manual browser verification before S2 competitor briefs.
3. **Locations architecture**: accountantsforcharities.org.uk wins with programmatic location
   doorway pages; Google currently rewards it in this niche. Decide whether the estate's
   standard /locations pattern is enough or whether that footprint changes the plan (quality
   bar says don't copy doorways).
4. **E-E-A-T disclosure** (from red-team): "Ashfield Trading Ltd" trading-name disclosure on a
   charity site will be read by diligence-prone trustees — handle deliberately at brand/S1.
5. **Scotland scope**: v1 = England & Wales (house position 26); OSCR variant content queued.
6. **Lead-value calibration**: red-team's realistic funnel = small-charity IE + bookkeeping +
   Gift Aid (lead value 3). Success metrics for the pilot should be set on that basis before G0.
