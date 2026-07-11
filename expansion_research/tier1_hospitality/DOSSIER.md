# R3 deep-research dossier — Hospitality accountancy (Tier-1 site #2)

Date: 2026-07-11. Branch: expansion/phase-0. Read-first inputs honoured:
`R2_NICHE_SCORES_FINAL.md` (hospitality row: dense field, win requires full A* depth) and
`R2_REDTEAM.md` §2 (weak-field claim FALSE; all six named rivals verified here).

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 48 verified rivals (15 DEDICATED + 33 SECTION), evidence quotes, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool.json](topic_pool.json) | 2,420 raw → 2,069 post-estate-dedup → 1,815 usable; intent-classified |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | /for/* sub-trade hub architecture, 24 pages + 3 tools + 1 asset, queue |
| [CALCULATORS.md](CALCULATORS.md) | 8 candidates, 3 launch-tier with volume/CPC/precedent evidence |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Hospitality Openings & Closures Index (CH SIC 55/56) — sources verified pullable |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 27 positions, 30/30 citations fetched live |
| [r3_call_plan.md](r3_call_plan.md) | Paid-call plan (written before calls) + actuals |
| s1-s7 scripts + raw/ | Re-runnable pipeline (adapted from pilot_charities) + all raw evidence |

## Summary

- **Field verdict confirmed**: CONTESTED-to-STRONG everywhere. 15 dedicated hospitality
  accountancy brands verified live (incl. all six red-team names) plus 33 real firms with
  dedicated sections, incl. heavyweights (Moore Kingston Smith, Buzzacott, HaysMac, Xeinadin,
  Bishop Fleming). No walkover; the win is A* depth + calculators + a data asset no rival has.
- **Demand shape**: hire-intent heads total ≈ 2,900-3,700/mo clean across sub-trades
  (hospitality 1,330; restaurants ~680-1,040; hotels ~550; pubs 420; tronc operator-side 630;
  TOMS 300; takeaways/cafes ≈ 0 measured head volume — leads there come long-tail via the
  7,990/mo food-VAT cluster). Massive DIY layers (tronc 11k/mo, pub-count 3.6k/mo) fuel
  authority content, the tronc calculator and the index asset.
- **Sharpest wedges**: tronc (2024 Tips Act + July-2026 tipping news; CPC to £50; only three
  serious specialists), TOMS (zero interactive competition), food-VAT checker (nobody has a
  tool), 2026 RHL rates cliff, and the Openings & Closures Index (proven 3,600/mo question
  with no living answer page).

## Spend record

| Item | Cost |
|---|---|
| DFS keyword_suggestions × 8 seeds | $0.11628 |
| DFS ranked_keywords × 3 rivals | $0.08760 |
| **DataForSEO total (budget $3-8)** | **$0.20388** |
| Serper ~36 queries | separate Serper quota |
| DDG, autocomplete (864 queries), 222 domain fetches, 14 sitemap crawls, 30 citation checks | $0 |

Balance after run: $48.91716. One incident: daily $0.85 code guard (already consumed by same-day
R2d + charities R3) blocked the ranked call pre-spend; raised process-locally to $2.50/$3.00 in
`s4b_dataforseo.py` under this task's explicit budget — see r3_call_plan.md.

## Open questions (for owner / R4 gate)

1. **Generalist cannibalisation**: Holloway Davies has 4 live hospitality posts on exactly the
   new site's head terms (and property has a TOMS/aparthotel post). Cede-and-301 vs
   differentiate — data-gated-consolidation rule makes this an owner call before launch.
2. **Head-term pool gap**: because of (1), the dedup gate removed the site's own head terms
   from the countable pool; they re-enter only after the cannibalisation decision.
3. **Location pages**: savure.co.uk proves programmatic local SEO works in this niche (~2,000
   pages) but it strains the gold-standard A* bar — in or out?
4. **Tronc positioning**: content/calculator only, or an actual troncmaster-service referral
   offering (WMT/Buzzacott territory; higher lead value, higher ops burden)?
5. **Index v1 scope**: full openings/closures index vs pub-count tracker first (LAUNCH_CORE
   recommends tracker-first).
6. **Brand shortlist (R4)** not started — next stage per the factory line.
