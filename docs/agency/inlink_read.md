# Agency Site — Internal Link Graph (Lane B7)

**Date:** 2026-07-08 | **Known routes:** 439 | **Source:** `.cache/agency_diag/inlink_correlation.json`

## Summary

| Metric | Count |
|--------|-------|
| Total known routes | 439 |
| Structural orphans | 163 (37%) |
| Broken internal links | 0 (1 false positive: `/api/uk-tax-rates.json` is a valid API route) |
| Wrong-domain absolute links | 0 |

## Family orphan rates

| Family | Total | Orphaned | Rate |
|--------|-------|----------|------|
| /glossary | 25 | 25 | 100% |
| /founder-stories | 10 | 10 | 100% |
| /guides | 8 | 8 | 100% |
| /locations | 7 | 7 | 100% |
| /calculators | 8 | 7 | 88% |
| /agencies | 19 | 11 | 58% |
| /blog | 315 | 74 | 23% |
| /fundamentals | 9 | 1 | 11% |

## Most diagnostic observations

**1. Glossary, founder-stories, guides, locations: zero editorial inlinks.**
All 50 pages across these four families receive zero links from blog posts or fundamentals. They exist only via their index pages. These are high-value SEO assets (glossary terms, location hubs, case studies) with no link equity flowing in from the 315-post blog corpus.

**2. 11 /agencies/* pages unreachable from blog posts.**
The 8 well-linked agency types (`/digital`, `/creative`, `/marketing`, `/advertising`, `/pr`, `/web-design`, `/seo`, `/recruitment`) receive editorial links. The 11 orphaned ones — `/ai-agencies`, `/branding-agencies`, `/crypto-web3-agencies`, `/ecommerce-agencies`, `/email-marketing-agencies`, `/influencer-marketing-agencies`, `/performance-marketing-agencies`, `/ppc-agencies`, `/saas-agencies`, `/social-media-agencies`, `/video-production-agencies` — have zero editorial inlinks. They are siloed within agencies' own peer-link cluster.

**3. Calculators: 7/8 orphaned.**
Only one calculator (`/agency-valuation`) appears to receive inlinks; the other 7 are referenced from no blog post or content page. The calculator fleet has no editorial support.

**4. Relocation hubs: zero blog cross-links.**
`/dubai-relocation`, `/portugal-relocation`, `/cyprus-relocation` and the 7 other relocation hubs have 0 inlinks despite 18 orphaned posts in the `international-agencies` blog category. The blog posts and the conversion hubs are completely disconnected.

**5. `for-*` ICP pages unlinked.**
`/for-new-founders`, `/for-growth-stage`, `/for-pre-exit` — three high-intent audience entry points — have zero editorial inlinks from blog posts.

**6. `/blog/tax-and-compliance` carries the heaviest orphan burden.**
27 posts in that category have no inlinks beyond related-posts churn (same-category recency). The international-agencies cluster (18 orphaned) is similar.

**7. Related-posts is the dominant link mechanism — and it creates echo chambers.**
The top 3 most-linked pages (113 inlinks each) are `international-agencies` posts linked to each other via same-category related-posts. This inflates apparent "linkedness" within categories but does nothing for cross-category authority flow or for the non-blog route families.

## Top 10 most-inlinked routes

| Route | Inlinks |
|-------|---------|
| /contact | 254 |
| /services | 125 |
| /blog/international-agencies/agency-founder-golden-visa-revenue-proof-net-terms | 113 |
| /blog/international-agencies/agency-founder-relocation-client-contracts-tax-residency | 113 |
| /blog/international-agencies/90-day-rule-leaving-uk-agency-shareholding | 113 |
| /agencies/digital-agencies | 73 |
| /blog/tax-and-compliance/aia-capital-allowance-agency-equipment | 60 |
| /blog/tax-and-compliance/aia-capital-allowances | 60 |
| /blog/tax-and-compliance/annual-investment-allowance-2024-25 | 60 |
| /agencies/creative-agencies | 56 |

## Methodology notes

- Editorial links extracted from blog post and fundamentals body HTML (after closing frontmatter `---`)
- Related-posts modelled algorithmically: same category, 3 most recent posts
- App-router TSX hardcoded `href=` values extracted and counted
- Inlink count = distinct source pages linking to each target; self-links excluded
- Correlation with index-coverage state (lane B3) deferred to synthesis stage
- "Orphan" = 0 editorial inlinks; index pages (`/blog`, `/glossary`, etc.) and footer/legal pages excluded from orphan list
