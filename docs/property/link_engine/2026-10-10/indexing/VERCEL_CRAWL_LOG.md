# Google crawler visits from Vercel request data (2026-09-10 to 2026-10-10)

Source: Vercel observability, metric vercel.request.count, project property-tax-partners, grouped by Vercel's
bot_name classification (queries run 2026-10-10; Vercel keeps about 30 days). Counts are requests, including
JS/CSS assets fetched while rendering. Read-only; nothing changed.

## Totals, 30 days
| Crawler | Requests | What it is |
|---|---|---|
| bingbot | 15,631 | Bing search |
| googlebot | 3,356 | Google search crawler (the one that feeds the index) |
| googleother | 882 | Google non-search crawling (research, one-off fetches); does not feed Search |
| google-adsbot | 753 | Google Ads landing-page checks |
| google-inspectiontool | 730 | Search Console live test / Request indexing (47 in w/c 21 Sep, 683 in w/c 5 Oct) |

Googlebot responses: 2,922 x 200, 58 x 308, 57 x 301, 15 x 304; no 4xx/5xx. No technical block.
About half of Googlebot's requests are robots.txt (about 13/day) and JS/CSS; it reads only a few HTML pages per day.

## Pages that matter, 30 days
| Page | googlebot | google-inspectiontool | googleother |
|---|---|---|---|
| /services/property-accountant | 0 | 8 | 15 |
| /services/property-tax-advice | 0 | 8 | 16 |
| /services/landlord-accountant | 0 | 4 | 18 |
| /services/non-resident-landlord | 2 | 0 | 14 |
| / (homepage) | 63 (about 3/day mid Sep, about 1/day in Oct) | 0 | 28 |
| /blog/.../cgt-gifting-property-family-members-uk | 0 | 0 | 0 |
| /blog/.../tax-sell-rental-property-uk | 0 | 0 | 0 |
| /blog/.../finance-costs-section-24-complete-guide | 2 (w/c 21 Sep) | 0 | 0 |
| each /for/ page | 1 (all in w/c 28 Sep) | 0 | n/a |

## What this shows
- Search Console live tests / indexing requests on the three service pages did reach the site (Google-InspectionTool
  fetched them), but Googlebot, the crawler that updates the index, has not fetched them in 30 days.
- The two refreshed guides have had no Google visit of any kind in 30 days.
- Open contradiction: Googlebot fetched the Section 24 finance costs guide twice in w/c 21 Sep, but URL Inspection
  still reports last crawl 2026-05-29. Either URL Inspection lags, or that fetch did not count as an indexing crawl.
  Unresolved.
