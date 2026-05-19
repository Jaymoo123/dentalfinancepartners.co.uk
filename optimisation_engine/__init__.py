"""
Optimisation engine: weekly cross-site SEO/content optimisation pipeline.

Layers:
  clients/   - thin wrappers over external APIs (GSC, DataForSEO)
  ingestion/ - per-source ingestion that persists raw data to Supabase
  analysis/  - opportunity detection from the data tables
  weekly_run.py - the single command that runs the whole thing

Data destinations (all in the shared Supabase project):
  sites                         - registry
  gsc_query_data                - daily page + query GSC snapshots
  gsc_page_performance          - daily page-level (existing, reused)
  bing_query_data               - schema-only this round
  dataforseo_keyword_data       - keyword ideas / KD / CPC, raw_response preserved
  dataforseo_competitor_data    - competitor intersections + ranked_keywords
  api_cost_log                  - every paid call, with idempotency + budget gates
  optimisation_changes          - audit log of every shipped change
  optimisation_opportunities    - queued proposals for review
"""
