# Hospitality accountancy — verified competitor landscape (R3)

Date: 2026-07-11. Method: 36 UK SERP queries (Serper gl=gb + DDG uk-en, `s1_serp_collect.py`,
raw in `raw/serp_raw.json`), script-filtered against `own_estate_exclusion.json` (hard assert:
**0 estate domains survived**) and a directory/info blocklist (9 dropped). 230 domains seen,
221 survivors + 1 manual add (Merranti, red-team-named but missed by our query sample; found
via live web search). **Every survivor was fetch-verified** (`s2_verify_fetch.py` →
`raw/verify_evidence.json`: 165 fetched OK, 57 blocked/failed; the strategically important
blocked ones re-verified via live web search, marked below).

Verdict tiers: **DEDICATED** = the firm's whole brand is hospitality (or a hospitality
sub-trade); **SECTION** = real multi-sector firm with a dedicated hospitality/sub-trade
service page. Full machine-readable list with evidence quotes: `competitors.json` (48 rivals:
15 DEDICATED + 33 SECTION).

## Headline read

The red-team's correction is confirmed at full depth: this is a **dense, CONTESTED-to-STRONG
field on every sub-trade**, not a weak one. All six red-team-named firms verified:
HLWA, Innspired, Paperchase, Perrys, TAJ, Merranti. On top of them the sweep surfaced a
licensed-trade specialist cluster (Inn Control, Innscribe, Roslyns, Hayhursts), a
hospitality-only outsourcing tier (Paperchase, Accurise, Solutions 4 Caterers), an exact-match
brand (thehospitalityaccountants.com), an SEO-aggressive bookkeeping player with ~2,000
programmatic location pages (Savure), and a **tronc sub-field owned by true specialists**
(WMT/Troncbox, Tips & Troncs, Buzzacott's Troncmaster practice).

## DEDICATED specialists (15, all verified)

| Domain | Sub-trade | Evidence (quoted from fetched page unless noted) |
|---|---|---|
| paperchase.ac | Hospitality-only (restaurants/hotels) | "Paperchase \| Hospitality Accounting for Restaurants & Hotels"; 35+ yrs, 450+ brands (Zuma, The Fat Duck). Fetch 403 → search-verified |
| hlwa.co.uk | Hospitality (Bristol) | H1 "Chartered Hospitality Accountants Bristol" |
| inn-control.co.uk | Pubs/licensed trade | H1 "Specialist Restaurant & Pub Accountants to the Licensed Trade"; 159-URL content sitemap |
| innspiredaccountancy.co.uk | Pubs/licensed trade | Title "Pub Accountants for Licensed Trade" |
| innscribeuk.com | Licensed trade, nationwide | "Accountancy Services to the Licensed Trade… over 800" clients |
| roslyns.co.uk | Pubs/hospitality services | H1 "the leading provider of business services to the hospitality sector" |
| hayhursts.net | Pubs & licensed trades | Service page "Pub & Licensed Trade Accountants \| Hayhursts are Specialists" |
| solutions4caterers.co.uk | Caterers/hospitality | "Hospitality Accountants \| Solutions 4 Caterers… Serving hospitality since 2003" |
| accountingchefs.com | Restaurants | "Comprehensive Restaurant Accounting and Finance Management Solutions" |
| accurise.net | Multi-site hospitality | "Hospitality Accounting, Payroll & Multi-Entity Software Specialists"; "Run 20 sites like you only have 2" |
| savure.co.uk | Restaurant/pub bookkeeping | Title "UK Bookkeeping Services For Restaurants, Pubs & Hospitality"; ~2,000-URL programmatic sitemap |
| thehospitalityaccountants.com | Hospitality (exact-match brand) | Hotels/restaurants/cafes/pubs/holiday lets, UK-wide. Fetch failed → search-verified |
| merrantiaccounting.com | Takeaways/restaurants | Dedicated "Accountants for Takeaways" page, from £25/mo. Fetch 202 → search-verified |
| tipsandtroncs.co.uk | Tronc | "Troncs Explained", "Tronc Scheme Savings", **has a tronc calculator** |
| troncbox.com | Tronc (WMT) | "The UK's number one Troncmaster by WMT Troncmaster Services" |

## SECTION rivals (33) — the ones that shape strategy

Heavyweights with sector teams: **Moore Kingston Smith** (homepage led July 2026 with "Tipping
changes you can't ignore"), **Buzzacott** (Troncmaster Services page), **HaysMac** (hospitality
sector, ranks on TOMS queries), **Bishop Fleming**, **AAB** (Hotel Accounting Services),
**Xeinadin** (dedicated bars/pubs/clubs page), **Hawsons**, **Alexander & Co**, **Rouse
Partners**, **Perrys** (hotel page). SEO-led online firms colonising every sub-trade query:
E2E Accounting, Auditox, Your Tax Help, Swift, LT Accounting, Loyals ("Tronc-ready, multi-site,
EPOS-integrated"), Fusion, Accotax, plus ~15 more (see competitors.json). Livingstones took the
most hits in our sweep (13 hits / 9 queries) via product-category pages.

## Dropped at judgment (not accountancy rivals)

countertalk.co.uk (hospitality media), myhospitalitysolutions.co.uk (jobs/tenancies),
stonegatepubpartners.co.uk + findmypub.com (pubcos/marketplaces), supy.io / paycaptain.com /
netsuite.co.uk (software), rawligion.co.uk (thin affiliate "Best Prices" page — an SEO-spam
signal, not a firm), hotelco51.com (hotel operator), hooky.co.uk (brewery),
qcaccountants.com.au (Australia), bing.com / uk.linkedin.com / accountingweb.co.uk
(engines/directories/media). Remaining one-hit generalist accountants without any hospitality
page were left in candidates.json but excluded from competitors.json.

## Implications for the build (feeds LAUNCH_CORE.md)

1. No walkover anywhere: every sub-trade head term has 5+ real specialists. Win = full A*
   depth + assets, per R2 FINAL caveat.
2. The licensed-trade (pub) cluster is the most specialist-saturated; the **cafe/coffee-shop
   and caterer sub-trades are the thinnest** (served mostly by SECTION pages, no dedicated brand).
3. Tronc is contested by genuine specialists (WMT, Tips & Troncs, Buzzacott) but is also the
   highest-CPC cluster (tronc £12.99, "how to set up a tronc scheme" £50.47) — fight it with a
   calculator + 2026 fair-tips content, not one service page.
4. Nobody in the verified set publishes a data asset (sitemaps checked are service pages +
   blogs); the flagship-asset lane (DATA_ASSET.md) is open.
