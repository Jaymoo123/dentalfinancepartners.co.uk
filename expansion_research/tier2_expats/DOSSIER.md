# R3 deep-research dossier, Expats + non-residents UK tax (Tier-2)

Date: 2026-07-15. Branch: expansion/phase-0. Run under the zero-spend constraint:
**no DataForSEO, no Serper (none attempted, credits exhausted estate-wide), $0.00
total**. All volumes/KD/CPC in this dossier are null by rule, never invented; paid
enrichment is queued below.

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 53 verified rivals (25 DEDICATED + 28 SECTION) with direction labels, evidence, adjacent-player map |
| [topic_pool.json](topic_pool.json) / [topic_pool_final.json](topic_pool_final.json) | 3,310 raw -> 2,851 final keywords -> 1,909 page-level clusters; estate dedup gate run (10 exact + 29 fuzzy dropped); 160 property-adjacent clusters flagged |
| [VERDICT.md](VERDICT.md) | GO / NO-GO call vs the R2 prior (lead 5, entrenched) |
| [r3_call_plan.md](r3_call_plan.md) | Call plan + measured actuals ($0.00) |
| s1-s7 scripts + raw/ | Re-runnable pipeline + all raw evidence |

## Summary

- **Field verdict: ENTRENCHED, three layers deep.** 25 dedicated brands verified live:
  a 16-brand UK cross-border tier (boutique CTAs up to the institutional Blevins Franks
  and the 568-URL expertsforexpats.com content moat) plus a 9-brand US-expat-in-UK
  layer (Bright!Tax, Greenback, Taxes for Expats, plus London US/UK dual handlers)
  whose dual-filing product we cannot replicate. Behind them, big/mid-tier firms
  (BDO, Blick Rothenberg, Buzzacott, AAB, Moore Kingston Smith) own the technical
  head terms, and an 11-firm expat wealth/IFA layer owns pension/wealth intent.
  The R2 "entrenched" prior is **confirmed and strengthened** by evidence.
- **The commercial wedge collides with our own estate.** The most attackable
  compliance product in this niche is non-resident landlord (NRL scheme, NRL
  self assessment, NRCGT returns). The estate dedup gate dropped 10 exact and 29
  fuzzy matches, almost all NRL terms already covered by propertytaxpartners.co.uk,
  which itself surfaced in this niche's SERPs (dropped at the estate filter). 160 of
  1,909 clusters are property-adjacent. A standalone expat site would cannibalise
  our best-performing property asset on its strongest queries.
- **Real gaps exist but are narrow**: (1) the FIG-regime window, the post-non-dom
  four-year foreign income and gains regime is young and several rivals' content is
  still remittance-basis-stale; (2) an interactive-tool vacuum, no SRT day-count
  calculator, split-year checker, or NRCGT estimator surfaced from any accountancy
  rival in the sweep; (3) corridor pages (UK-to-UAE, UK-to-Australia, UK-to-Spain)
  are served by single-corridor boutiques or wealth firms, not by one systematic
  accountancy brand.
- **Topic pool is large but not clean-new**: 2,851 keywords / 1,909 clusters, with
  the highest-intent slice (NRL/NRCGT) overlapping the property site and another
  slice (US-expat) fenced off by the dual-filing product barrier. Net-attackable
  core is the residence/leaving-UK/FIG cluster.
- **Lead economics (unverified, flagged)**: R2 scored lead value 5; plausible
  (HNW movers, NRCGT disposals) but no CPC evidence was collectable this run;
  paid pulls below must confirm before any reversal of the verdict.

## Anomalies / limitations (honest record)

1. **DDG-only SERPs**: Serper credits exhausted estate-wide; no Serper calls
   attempted. Google-side positions under-sampled; ~13 strategic bot-blocked domains
   (Blevins Franks, Blick Rothenberg, UK Property Accountants, Bright!Tax, Greenback,
   Xerxes, etc.) were classified from their own DDG SERP titles/snippets rather than
   fetched pages (marked verify_method=serp).
2. **Zero volume/KD/CPC data**: by rule. Gap sizing (FIG regime, SRT calculator
   demand) is directional, not measured.
3. **Autocomplete noise**: "p85" (Tesla/parts), "resident evil", "fig regimen"
   cosmetics, US-state residency, swept in s5b (56 junked), some residue may remain
   in low-signal clusters.
4. **estate_blog_topics.json** copied from the 2026-07-11 care run (4 days old);
   estate corpora have not materially changed since (build phase complete 07-15).
5. A first s5 background run's output file vanished mid-write (parallel producer
   session contention suspected); the pool was rebuilt synchronously with a faster
   quick-ratio gate, final numbers above are from the verified synchronous run.

## TODO, paid pulls (manager, DataForSEO)

Keyword-suggestion seeds: "expat accountant", "expat tax uk", "non resident tax uk",
"non resident landlord scheme", "nrcgt", "leaving the uk tax", "split year treatment",
"statutory residence test", "fig regime", "foreign income and gains", "non dom tax",
"double taxation relief uk", "us expat tax uk", "moving abroad tax uk", "p85 form",
"remittance basis", "returning to the uk tax".
Ranked-keywords domains: globaltaxconsulting.co.uk, expertsforexpats.com,
expat-tax-advice.co.uk, horizonukts.com, taxadvisorypartnership.com,
ukpropertyaccountants.co.uk (for the NRL collision read), expattaxes.co.uk.
Plus a Serper Google re-sweep of the 34 s1 queries once credits are topped up.
