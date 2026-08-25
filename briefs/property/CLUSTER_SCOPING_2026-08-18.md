# Cluster scoping: demand table for the next Property cluster (2026-08-18)

Method: `docs/_engines/REWRITE_PROGRAM.md` §9, same pattern as the SDLT dossier
(`briefs/property/sdlt/DOSSIER.md`). One fresh DataForSEO `ranked_keywords/live`
sweep of the 7 competitor domains, analysed locally against 10 candidate term
families. **Peer-winnable volume is the steering number, not raw volume** —
gov.uk, MoneyHelper and MSE own the largest heads in this niche, and a family
where no specialist firm holds a single top-10 slot is not a winnable prize
regardless of its raw volume.

This file quantifies. It does not rank clusters into a work order or recommend
which to run next — that decision is the owner's / a follow-on session's, same
as the SDLT dossier kept the "what happens next" step separate from the map.

## Pull

- **Date:** 2026-08-18 (session date 2026-08-17 UK).
- **Domains (7):** uklandlordtax.co.uk, ukpropertyaccountants.co.uk,
  provestor.co.uk, optimiseaccountants.co.uk, cruseburke.co.uk,
  landlordstudio.com, taxd.co.uk.
- **Endpoint:** `dataforseo_labs/google/ranked_keywords/live`, UK
  (`location_code=2826`), via `optimisation_engine/clients/dataforseo_client.py`.
- **Cap applied: 1,000 rows per domain**, equal across all 7. Not a true
  uncapped pull — every domain returned exactly 1,000 rows, so each domain's
  real ranked-keyword universe is larger than what's captured here. 1,000/domain
  was chosen to leave comfortable headroom under the $2.50 task cap while
  matching the API's practical row ceiling; it is not the API's hard max.
- **Spend: $0.924 actual** (7 calls x ~$0.132 actual each; estimated $0.11/call
  pre-flight, base $0.01 + $0.0001/row at limit=1,000). Task cap was $2.50, so
  62% of the cap went unused. $0 DataForSEO spend was logged earlier today, so
  the daily $5.00 code-level guard was never in play. Account balance before
  the pull: $6.70 (free balance check).
- No `google_ads`/`search_volume` calls made (banned by the task brief).
- **7,000 raw rows** (1,000 x 7) saved to
  `briefs/property/_competitor_ranked_keywords_2026-08-18.json`
  (fields: domain, keyword, volume, position, url).
- **5,845 unique keywords** after de-duplicating across domains (volume is a
  keyword-level DataForSEO attribute, not a domain-level one, so cluster
  totals below sum unique keywords, not keyword-domain rows).

## Family table, ranked by peer-winnable volume

A keyword can fall into more than one family (**9 keywords do**, e.g. a
"capital gains tax on rental property" query sits in both `cgt` and
`rental-income-tax`); each family's numbers are computed independently, so
those 9 are not double-removed, matching the brief's "report overlaps but
don't double-solve".

| Family | Total vol/mo | Peer-winnable vol/mo | Kw in family | Peer-top10 kw | Our pages |
|---|---:|---:|---:|---:|---:|
| yield-and-tools | 178,850 | **102,070** | 71 | 24 | 2 |
| cgt | 307,520 | **30,620** | 231 | 16 | 49 |
| rental-income-tax | 55,660 | **12,020** | 74 | 15 | 52 |
| incorporation-ltd | 87,330 | **9,130** | 145 | 49 | 64 |
| section24 | 22,720 | **4,880** | 59 | 14 | 33 |
| accountant-commercial | 3,460 | **2,140** | 9 | 4 | 49 |
| allowable-expenses | 2,410 | **580** | 10 | 2 | 1 |
| mtd | 28,260 | **0** | 38 | 0 | 45 |
| capital-allowances | 3,530 | **0** | 4 | 0 | 34 |
| iht-probate-property | 1,300 | **0** | 1 | 0 | 5 |

Three families (`mtd`, `capital-allowances`, `iht-probate-property`) carry
real search volume but **zero peer-top-10 keywords** — none of the 7
specialist domains hold a top-10 slot anywhere in these families in this
pull. Raw volume there is vanity by the same logic the SDLT dossier used for
gov.uk/MoneyHelper heads.

## Per-family detail

### yield-and-tools
- Term set: "rental yield", "rent calculator", "buy to let calculator", "mortgage calculator".
- Top competitor pages by keyword count: uklandlordtax.co.uk buy-to-let mortgage calculator (interest-only) — 17; provestor.co.uk best-uk-rental-yield-hotspots — 5; landlordstudio.com free rental yield calculator — 1.
- Top 10 peer-winnable keywords by volume: buy let mortgage calculator (22,200), buy to let mortgage calculator (22,200), buy to rent mortgage calculator (22,200), buy-to let repayment mortgage calculator (22,200), rental yield calculator (2,400), btl mortgage calculator (1,900), buy to let calculator (1,600), buy to let mortgage calculator uk (1,600), mortgage calculator buy to let (880), mortgage calculator buy to let uk (880).
- Note: the four "buy to let mortgage calculator" close variants share an identical 22,200 volume — DataForSEO's Google Ads grouping, not four independent 22k demand pools. Cluster total overstates unique demand accordingly (same caveat the SDLT dossier logged).

### cgt
- Term set: "capital gains", "cgt".
- Top competitor pages by keyword count: provestor.co.uk capital-gains-tax calculator — 5; taxd.co.uk capital-gains-tax-shares blog — 4; ukpropertyaccountants.co.uk CGT calculator — 2.
- Top 10 peer-winnable keywords by volume: capital gains tax calculator (14,800), cgt calculator for property (1,900), property capital gains tax calculator (1,900), property cgt calculator (1,900), capital gains tax uk property calculator (1,600), capital gains calculator shares (1,300), capital gains on shares calculator (1,300), capital gains tax on shares calculator (1,300), cgt on shares calculator (1,300), hmrc cgt calculator (1,000).
- Note: this family is dominated by calculator-intent keywords, same tool-shape caveat the SDLT dossier raised about calculators (subject-match and domain-age effects, not obviously a copy lever).

### rental-income-tax
- Term set: "rental income", "rent tax", "tax on rent", "landlord tax".
- Top competitor pages by keyword count: uklandlordtax.co.uk tax-on-rental-income — 3; taxd.co.uk rental-tax-calculator — 2; ukpropertyaccountants.co.uk NI-on-rental-income post — 2.
- Top 10 peer-winnable keywords by volume: tax on rental income calculator (1,600), rental income national insurance (1,300), rental income tax uk (1,300), tax on rental income uk (1,300), national insurance on rental income (1,300), rental income tax calculator uk (1,000), landlord tax on rental income (880), budget landlord tax (590), capital gains tax on rental property (590, overlaps `cgt`), rent tax calculator (480).

### incorporation-ltd
- Term set: "limited company", "incorporat", "ltd company", or "company" AND (landlord/property/rental/buy to let).
- Top competitor pages by keyword count: provestor.co.uk stamp-duty/limited-company guide — 21; provestor.co.uk limited-company-setup/advantages-disadvantages — 12; provestor.co.uk limited-company-setup — 8.
- Highest peer-top10 keyword count of any family (49), but the volume per keyword is modest — long-tail heavy.
- Top 10 peer-winnable keywords by volume: stamp duty for limited company (1,300 — already in scope of the executed SDLT batch), property investment company (590), stamp duty calculator for limited company (480), buy to let as a limited company (480), buy to let with limited company (480), stamp duty limited company property calculator (390), ltd company mortgage calculator (320), mortgage calculator limited company (320), transfer property to limited company without stamp duty (320 — also already in the SDLT ledger as a NO-PAGE cluster), does a limited company pay stamp duty (210).
- Caution: several of this family's top keywords already surfaced in the SDLT dossier's ledger under `incorporation-and-company-structures` pages. Running this cluster next risks reworking ground the SDLT batch already touched; check `briefs/property/sdlt/ledger.csv` before scoping a fresh brief here.

### section24
- Term set: "section 24", "mortgage interest" (tax context).
- Top competitor pages by keyword count: uklandlordtax.co.uk section-24 restriction guide — 14 (only page in the top 3; the rest of the family's peer-winnable keywords are spread thin).
- Top 10 peer-winnable keywords by volume: section 24 tax (590), mortgage interest relief tax (390), mortgage interest tax relief (390), tax relief for mortgage interest (390), tax relief mortgage interest (390), tax relief on mortgage interest (390), is mortgage interest deductible (320), is mortgage interest tax deductible (320), is the mortgage interest tax deductible (320), mortgage interest relief (320).

### accountant-commercial
- Term set: "property accountant", "landlord accountant", "property tax advisor", "accountant for landlords".
- Small family (9 keywords) but decent peer-winnable share (62% of its volume).
- Top competitor pages by keyword count: uklandlordtax.co.uk homepage — 3; optimiseaccountants.co.uk homepage — 1.
- Top peer-winnable keywords by volume: property accountants near me (880), uk property accountants (480), landlord accountant (390), property accountants (390).
- We already have 49 pages loosely matching this family by slug/title — but the homepage-level competitor wins suggest this is a commercial-page/service-page play, not a blog-cluster play; the slug+title match here is likely picking up broader accountant-services content, not dedicated commercial-intent pages.

### allowable-expenses
- Term set: "allowable expense", "landlord expense", "what can landlords claim".
- Smallest meaningfully peer-winnable family (10 keywords, 2 peer-top10).
- Top competitor page: uklandlordtax.co.uk allowable-expenses-against-rental-income — 2.
- Peer-winnable keywords: allowable expenses rental income (320), landlord allowable expenses (260).
- We show only 1 page matching this family by slug/title despite the term being core landlord-tax vocabulary — worth a manual check of whether existing expense content just uses different phrasing in slug/title (body-mention counting was out of scope for this scoping pass per the brief).

### mtd — zero peer-winnable
- Term set: "making tax digital", "mtd". 38 keywords, 28,260 vol/mo, **0 keywords where any of the 7 domains holds a top-10 slot.**
- We already have 45 pages matching this family by slug/title. Volume here is real but not contestable against these 7 peers in this pull — likely owned by gov.uk/software vendors (QuickBooks, Xero, FreeAgent) rather than by specialist accountancy-firm content.

### capital-allowances — zero peer-winnable
- Term set: "capital allowance", "aia", "full expensing". Only 4 unique keywords matched (capital allowances, capital allowances fhl, capital allowances for furnished holiday lets, furnished holiday let capital allowances) — narrower than expected, and none of the 4 has a peer top-10 slot.
- We already have 34 pages matching this family. Note: "aia" and "full expensing" produced zero matches in this competitor set — these specialist firms don't appear to target those specific terms, or FHL-specific capital-allowances phrasing dominates instead.

### iht-probate-property — zero peer-winnable
- Term set: "inheritance tax" AND property-ish, or "probate property". Only 1 unique keyword matched across all 7 domains, 1,300 vol/mo, 0 peer-top10.
- Smallest family by a wide margin. We have 5 pages matching by slug/title. This family looks like it needs a different competitor set (specialist IHT/probate firms, not landlord-tax accountants) to be scoped honestly — these 7 domains simply don't compete here.

## Our-side page counts (slug + title match only, `Property/web/content/blog/*.md`, 760 posts scanned)

| Family | Our pages |
|---|---:|
| incorporation-ltd | 64 |
| rental-income-tax | 52 |
| cgt | 49 |
| accountant-commercial | 49 |
| mtd | 45 |
| capital-allowances | 34 |
| section24 | 33 |
| iht-probate-property | 5 |
| allowable-expenses | 1 |
| yield-and-tools | 2 |

Slug+title matching only, per the brief — no body-mention counting at this
scoping level, so these are a floor on true coverage, not a ceiling (the SDLT
dossier's page-scope step found ~3x more pages by body mention than by
slug/title alone).

## Known limitations, stated not hidden

- 1,000-row-per-domain cap: every domain hit the cap exactly, so the true
  ranked-keyword universe of each competitor is larger than what's captured
  here. A deeper pull (limit 2,000+ per domain) would still fit comfortably
  under the $2.50 task cap (~$1.85 estimated for 2,000/domain) if a fuller
  sweep is wanted later.
- Volume figures sum close variants (DataForSEO/Google Ads groups near-
  duplicate phrasings under identical volume), so cluster totals overstate
  unique demand — most visible in `yield-and-tools` where four "buy to let
  mortgage calculator" variants each carry 22,200.
- DataForSEO positions are a database snapshot, not a live SERP read; treat
  as directional, same caveat as the SDLT dossier.
- No GSC/Bing union was performed for these families (the brief scoped this
  as a single DataForSEO sweep plus local analysis, unlike the SDLT dossier's
  three-source union). Real query universe per family is larger than the
  competitor-only counts above.
- `incorporation-ltd`'s top keywords overlap with pages the SDLT batch just
  touched (`sdlt-transfer-property-company-cost`,
  `sdlt-incorporation-stamp-duty-twice`) — check the SDLT ledger before
  scoping a fresh brief on this family to avoid re-working the same ground.
