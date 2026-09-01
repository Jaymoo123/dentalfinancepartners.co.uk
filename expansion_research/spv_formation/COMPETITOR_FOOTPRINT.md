# SPV / BTL Ltd Co Competitor Footprint — 2026-09-01

Source: sitemap.xml crawl (robots.txt -> sitemap index -> urlset), URLs only, no page fetches.
Specialists kept in full; generic sites filtered to SPV/landlord/incorporation-relevant paths.

## Per-domain kept URL counts

| Domain | Kept | Note |
|---|---:|---|
| needingadvice.co.uk | 3653 | specialist, huge content site |
| mfbrokers.co.uk | 619 | specialist (broker) |
| nrla.org.uk | 666 | filtered from 36,448 total |
| uklandlordtax.co.uk | 513 | specialist |
| taxd.co.uk | 442 | specialist |
| dnsassociates.co.uk | 351 | filtered from 5,458 total |
| interpolitanmoney.com | 315 | specialist |
| propertyspv.co.uk | 284 | specialist |
| watsonknipe.co.uk | 241 | specialist |
| provestor.co.uk | 239 | specialist |
| taxqube.co.uk | 220 | specialist |
| companyservicesuk.co.uk | 144 | specialist |
| getground.co.uk | 139 | specialist |
| commercialtrust.co.uk | 133 | filtered from 479 total |
| rapidformations.co.uk | 114 | filtered from 842 total |
| vincentburch.co.uk | 99 | specialist |
| togethermoney.com | 64 | filtered from 756 total |
| charcol.co.uk | 32 | filtered from 477 total |
| landlordvision.co.uk | 12 | filtered from 85 total |
| **1stformations.co.uk** | **FAILED** | sitemap.xml returns 403 (Cloudflare bot challenge), robots.txt only reachable via www subdomain |

19 of 20 domains crawled successfully. Only failure: 1stformations.co.uk (Cloudflare blocks sitemap fetch; would need a browser fetch to get past it).

## Cluster x domain coverage (URL counts)

| Cluster | Domains covering | URLs |
|---|---:|---:|
| other (mostly generic/blog/legal pages, not further clustered) | 19 | 5805 |
| SPV mortgages | 14 | 1750 |
| running the company (accounts, filings, loans, dividends) | 15 | 220 |
| formation mechanics | 14 | 188 |
| transfer existing property | 15 | 106 |
| non-resident | 12 | 85 |
| tools-calculators | 8 | 61 |
| pricing-product pages | 8 | 45 |
| incorporate-or-not | 10 | 20 |

Note: the "other" bucket is large because needingadvice.co.uk and mfbrokers.co.uk are full-site specialist sitemaps (all their content counted per the brief), most of which is general accountancy/broker content, not SPV-specific.

## Table stakes (topic slug covered by 3+ competitors)

31 topics clear the 3-domain bar. Beyond boilerplate (contact/about/privacy/T&Cs/careers), the real table-stakes content topics are:
- buy to let mortgages / buy to let mortgage calculator (6 and 5 domains)
- blog / guides / resources / calculators (hub pages, 4-6 domains)
- bookkeeping, making tax digital, self assessment, limited company(ies) (3-4 domains)

## Topics covered only by specialists (2+ specialist domains, no generic-site presence)

84 topics. These are the differentiated SPV-specific content areas the generic brokers/formation agents don't bother with — expect things like SPV-specific incorporation steps, SIC codes for property SPVs, director loan accounts for landlords, SPV vs personal ownership comparisons, and non-resident landlord company setup. Full list is in competitor_urls.csv filtered to these domains; not enumerated here to keep this report short.

## Whitespace (thin everywhere)

- **incorporate-or-not**: only 20 URLs across 10 domains — thinnest substantive cluster (excluding "other"). Most competitors mention it in passing rather than owning a dedicated comparison page.
- **pricing-product pages**: 45 URLs, 8 domains — many specialists don't sitemap their pricing/plans pages at all (likely gated or app-embedded), so this may be an undercount rather than true absence.
- **tools-calculators**: 61 URLs, 8 domains, concentrated in buy-to-let mortgage calculators; no domain has an SPV-specific tax/incorporation calculator suite.

## Output files

- `competitor_urls.csv` — domain, url, section, cluster, topic (all kept rows, ~9,300 total)
- `crawl.py` — the crawler (kept for reproducibility, not required output)
