# Estate opportunity readout — 2026-07-08

Fresh data: GSC 90d (queries + pages, all 8 sites) and Bing snapshots (7 of 8; contractors-ir35 has no Bing rows yet) pulled 2026-07-08. Per-site worklists + opportunity registers regenerated: `docs/<site>/opportunity_register_meta_2026-07-08.md`. Top-query dump: `.cache/top_queries_90d.json`.

Action classes: **META** (batch-2 meta rewrite, running now), **EXPAND** (content expansion, page ranks 11-30), **AUTHORITY** (head term ranks 40+; meta/content won't fix, needs links/authority), **CORE** (TSX core page, HP-lock, needs its own pass), **CANNIBAL** (query split across pages), **LEAVE** (maturing, <28d).

## Property (report-only; monetised — nothing applied)

- **CANNIBAL, high priority:** `companies-house-reforms-explained-for-business-success` (370 imp, pos 7.1) vs `companies-house-reforms` (356 imp, pos 5.5), both created 2026-06-25, splitting the 726-imp query "property landlord companies house reform" at positions 5-7. Per locked rules: differentiate (re-angle one), never collapse without the data-gated consolidation process. This is the single biggest quick win on the estate: page-1 positions, zero clicks.
- **META candidates at strong positions with 0 clicks** (page-1/2 but no CTR): `sdlt-transfer-property-company-cost` (422 imp, pos 8.8), CGT-rates cluster ("uk cgt rates residential property 2026" 216 imp pos 4.3; annual-exempt-amount query 160 imp pos 5.8), `revenue scotland non-residential lbtt rates` (204 imp, pos 7.0). Worklist scored: `.cache/meta_program/property/worklist.json` (40 pages), register has 89 entries. Property joins the meta cadence only with your sign-off.
- **CANNIBAL, medium:** "hmrc cgt reporting deadlines 2026" (345 imp) split over 5 pages; "landlord portfolio incorporation uk" (199 imp) over 6; "property specialist accountant in london" (186 imp) over 7.
- 46 ranking pages were unmonitored (now registered net_new), incl. `property-tax-accountant-london` 461 imp.

## Generalist — biggest content opportunity on the estate

- **EXPAND:** "construction accounting software" cluster ≈ **1,800 impressions/90d** ("construction accounting software" 562 pos 27, "accounting software for construction" 275, "contractor accounting software" 227+187+169, "accounting software for builders" 210, more) all landing on ONE page (`construction-accounting-software-uk-contractors`, already 787→2,189 imp post batch-1) at pos 20-32 with 0 clicks. A dedicated comparison/tooling cluster here is the clearest new-content play. Hand to the gap-analysis session.
- **EXPAND:** ACCA vs ICAEW cluster ~500 imp at pos 23-26 (`icaew-vs-acca-vs-aat-accountant`, 663 imp post-batch) — near-miss, one rank-band from page 1-2 clicks.
- **META (batch 2, running):** 13 fresh pages incl. `hmrc-tax-rebate` (111 imp pos 2!), `correct-paye-overpayment-hmrc` (86 imp pos 2), `how-to-claim-rd-tax-credits` (133 imp pos 4).
- **Anomaly:** site earned 7,656 Google impressions since 06-12 with **zero clicks site-wide**. Deep average positions explain most of it, but pos 1-4 pages with 0 clicks (above) suggest SERP-feature capture (AI overviews/answer boxes) — strengthens the BLUF answer-box program case.
- **AUTHORITY:** locations pages rank on impressions (st-albans 645, putney 308, cannock 248) with 0 clicks at deep positions.

## Dentists

- **AUTHORITY (dominant fact):** head-term demand is huge and unconverted: "accountants for dentists" 1,081 imp pos 56, "dental accountants" 952 pos 62, "specialist dental accountants" 685 pos 44, plus ~1,500 imp of variants. The **homepage holds 4,825 impressions / 1 click**. Meta cannot fix pos 50; this is a core-page + authority problem → corepage engine pass + off-site (faceless) authority per the growth playbook.
- **META (batch 2, running):** `dental-practice-valuation-methods-uk` (376 imp, pos 2, score 55) is the standout; 10 fresh pages total.
- **EXPAND:** "accounting software for dental clinics" 131 imp pos 12.2 — near-miss.
- **CANNIBAL, watch:** "nhs uda rates" 125 imp split across 10 URLs (mostly #fragment variants of the UDA page — fragments now excluded from tracking).

## Solicitors

- **CORE:** `/contact` 482 imp, `/services` 447 imp, homepage 236 imp, `/blog` index 199 imp — ~1,365 impressions on TSX core pages with 0 clicks, outside the md-file meta engine. A core-page metadata pass (layout.tsx metadata) is cheap and untried.
- **META (batch 2, running):** strongest fresh worklist on the estate: `do-uk-solicitors-charge-vat` (517 imp, **pos 1**, score 143), `office-account-vs-client-account-differences` (199 imp pos 1), `what-counts-as-client-money-uk-solicitors` (226 imp pos 2), `sra-breach-notification` (121 imp pos 1). Page-1 rankings with zero clicks = exactly what meta rewrites are for.
- **AUTHORITY:** "accounting for solicitors" 549 imp pos 67 + head-term variants ~1,000 imp at pos 20-76; "accountant for lawyers" pos 20.8 split across 5 pages (differentiation candidate).
- Note: 45 rewritten Track-2 pages remain undeployed; batch-2 metas apply to the live corpus (no file collisions found in the fresh 19).

## Medical (signal window open — analysis only, nothing applied)

- Google discovery failure dominates: only real Google demand is "gp accountants" 1,257 imp pos 53 + head variants, homepage 1,936 imp / 1 click. Bing is the working channel (276→625 imp on batch-1 pages). No meta work until the 07-20/08-03 fix-wave checkpoints.

## Agency (signal window open — analysis only, nothing applied)

- `agencies/pr-agencies` 450 imp pos 28 on "accountants for pr agencies" (202 imp) — best future candidate once the indexing window closes (~08-05).
- "cis accountant" 138 imp pos 71 lands here AND on generalist (227 imp pos 75) — cross-site query overlap to watch when CIS site matures.

## Contractors-ir35 + Construction-cis (young; first data)

- Both DO have GSC flowing (264 / 457 query rows) — earlier assumption they lacked GSC properties was wrong. cis: "accountants for roofers" 240 imp at pos 17-24 on `/for/roofers` — near-miss on a 3-week-old site, promising. ir35: `ir35-status` 94 imp pos 29; no Bing rows for ir35 yet (site deploy pending anyway).
- Gotcha: both returned 0 rows in `gsc_page_performance` (page-level client) despite query rows — page client site-property mapping needs the same sc-domain fix as the query client. Open item.
- Both now have worklists (10 / 12 pages) — too young for a meta pass (LEAVE, maturing).

## Cross-estate observations

1. **The estate's binding constraint has shifted from coverage to position.** Impressions are compounding (batch 1 + net-new waves working), CTR is ~0 because average positions sit 20-70. Levers that move position: expansion of near-miss pages (11-30), internal linking, core-page optimisation, off-site authority — not more metas.
2. **Zero clicks at pos 1-5** (solicitors VAT page, generalist HMRC pages, property CGT pages) is the zero-click-SERP pattern → supports activating the BLUF answer-box program (currently design-only, gated).
3. **Tracking is now trustworthy**: target_url backfill, medical flat paths, verdict-window cap, immature-baseline tagging, 203 net_new registrations (see `meta_batch1_verdicts_2026-07.md` for details).
