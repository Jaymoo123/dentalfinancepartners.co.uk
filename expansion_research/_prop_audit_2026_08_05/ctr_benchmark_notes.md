# A1.10 — CTR benchmark sourcing (2026-08-05)

Claim 1: "Expected CTR at position 6 is roughly 4-5%" (Google).
Verdict: SUPPORTED with caveat. Aggregated 2025-26 studies put position 6 at ~4.35%
(range across studies; pos 5 ~5.5%, pos 7 ~4.3%). Caveat: these are blended figures;
SERPs with AI Overviews (30%+ of queries) depress all positions materially.
Sources: navboost.com/ctr-by-position (aggregate of 5+ studies), growthsrc.com 200k-keyword
2025 study (pos 1 CTR down 32% YoY under AI Overviews), thestacc.com/blog/organic-ctr-by-position.

Claim 2: "Bing CTR 2.52% at avg position 4-6, where 6-9% would be normal."
Verdict: UNSUPPORTED. No robust modern Bing-specific CTR-by-position benchmark exists.
Historical Bing-specific data (Slingshot SEO study) measured Bing pos 1 = 9.66%,
pos 2 = 5.51% — roughly HALF equivalent Google positions. Extrapolating, a normal Bing
CTR at avg position 4-6 is plausibly ~2-4%, not 6-9%. Post-Copilot integration, mid-page
informational CTR is lower still. Site's measured 2.51% may be near-normal for Bing.
Consequence: the "both engines under-perform their position, therefore query mix is the
binding constraint" elimination argument loses its Bing leg. The Google leg (0.46% measured
at pos 1 vs ~20%+ benchmark, per query_ledgers/property_ledger.json) still stands on its own.
Also note: the "avg impression position 4-6" figure for Bing has no table behind it in the
Opus docs — pending verification from the Bing pull agent.
