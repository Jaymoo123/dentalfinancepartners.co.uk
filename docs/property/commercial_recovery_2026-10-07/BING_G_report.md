# What Bing and ChatGPT reward on Property today

Read-only analysis, 2026-10-07. Sources: `bing_query_data` (snapshot 2026-10-07), Bing Webmaster `GetRankAndTrafficStats` and `GetQueryStats` (pulled today), `web_sessions` + `leads` + `lead_value_scores` (prod Supabase), live page fetches of www.propertytaxpartners.co.uk.

## Headline

Bing and ChatGPT reward two completely different things, and neither of them is the commercial page set the owner is about to change.

- **Bing rewards the informational blog.** 79,352 impressions and 2,067 clicks in the last 28 days site-wide, and essentially all of it lands on `/blog/*`. Across all 26 Bing snapshots since May, **not one row exists for any `/locations/*`, `/services/*`, `/spv-company`, `/incorporation` or `/for/*` page**. The homepage has 70 impressions and 11 clicks in its entire recorded history.
- **ChatGPT rewards the homepage and `/services/*`.** 131 of about 250 ChatGPT sessions since 13 Jul entered on `/`, and 13 on `/services/property-tax-advice`. ChatGPT is the only channel sending meaningful traffic to the commercial pages at all.
- So the Google-facing change touches pages Bing does not currently rank, and pages ChatGPT does currently cite. The risk is concentrated on ChatGPT, not Bing.

## 1. Bing commercial table

Commercial query set = queries containing accountant, tax advis, tax special, bookkeep, tax consultant, plus city variants. Snapshot date 2026-10-07. Full list in `BING_G_bing_commercial_queries.csv`.

| Query | Our page | Position | Impr | Clicks |
|---|---|---|---|---|
| uk property accountants | `/` | 5.0 | 4 | 0 |
| property tax specialists | `/` | 2.0 | 3 | 1 |
| property income tax specialist | `/` | 3.0 | 1 | 1 |
| property tax specialist | `/` | 2.0 | 1 | 0 |
| uk property accountants group structure | `/blog/.../property-investment-company-structure-planning` | 5.0 | 2 | 0 |
| how to justify cgt improvements to accountant | `/blog/.../property-improvements-reduce-cgt-enhancement-expenditure` | 6.0 | 2 | 1 |
| tax specialist for cgt house sale when divorcing | `/blog/.../cgt-divorce-property-transfer-tax-implications` | 3.0 | 2 | 0 |
| bookkeeping cil levy in the u.k. | `/blog/.../community-infrastructure-levy-cil` | 2.0 | 2 | 1 |
| property accounting fee | `/blog/property-accountant-services/how-much-does-a-property-accountant-cost` | 3.0 | 2 | 0 |
| accountants peterborough btl landlords | `/blog/property-accountant-services/how-much-does-a-property-accountant-cost` | 6.0 | 1 | 0 |
| accountants peterborough btl landlords | `/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026` | 5.0 | 1 | 0 |
| land tax specialist west wales | `/blog/.../land-transaction-tax-a-complete-guide` | 4.0 | 1 | 1 |
| property tax advisers for ltt wales | `/blog/.../welsh-land-transaction-tax-ltt-rates-bands-2026-27...` | 3.0 | 1 | 0 |
| tax advisors for uk resident, inherited greek property | `/blog/.../cgt-overseas-property-uk-residents-foreign-disposals` | 2.0 | 1 | 1 |

The "about position 5, stable" read is accurate as a position, but the volume behind it is single-digit impressions per query. The whole commercial set is under 30 impressions and 6 clicks in the snapshot. **"Near me" is noise on Bing for this site**: every `near me` match is a food or fishing query ("mongolian beef near me", "best cottage pie near me") landing on capital-allowances and CGT posts. It is not commercial intent and should not be used as a baseline.

Pages that actually carry Bing's traffic, and what they look like today (fetched live):

| Page | Bing impr (snapshot) | Bing clicks | Title today | H1 today |
|---|---|---|---|---|
| `/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24` | 1,466 | 307 | informational, Section 24 question shape | informational |
| `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` | 1,400 | 318 | CGT Gifting Property to Family UK 2026: Rules and Reliefs \| Property Tax Partners | CGT on Gifting Property to Family Members in the UK (2026 Guide) |
| `/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide` | 1,339 | 210 | informational, year-stamped | informational |
| `/blog/capital-gains-tax/tax-sell-rental-property-uk` | 1,322 | 272 | informational | informational |
| `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` | 1,222 | 294 | Transfer Property Into a Limited Company UK \| 2026 Guide \| Property Tax Partners | How to Transfer Property Into a Limited Company UK |
| `/` (homepage) | 70 lifetime | 11 lifetime | Property Accountants UK \| Specialist Landlord Tax Advice | Property accountants for UK landlords and investors |

Pattern Bing rewards: long-tail question queries, often misspelled or conversational, matched to a guide whose title is the question plus a year. Nine FAQPage questions on the homepage, 13 to 14 on the top blog posts.

## 2. Bing and AI lead attribution by entry page

Lead sessions, `source='property'`, `is_test` false, since 2026-07-13. Full list in `BING_G_lead_attribution.csv`.

Channel totals (lead sessions): bing-family 64, AI (ChatGPT + Copilot) 49, Google 40, direct 32, other 11.

Bing-family leads, grouped by entry page:

| Entry page | Leads | Case tiers seen |
|---|---|---|
| `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` | 12 (bing 8, ddg 2, yahoo 2) | advisory, essential |
| `/` | 4 | advisory, essential |
| `/blog/capital-gains-tax/cgt-overseas-property-uk-residents-foreign-disposals` | 4 | advisory |
| `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` | 3 | advisory, essential |
| `/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost` | 3 | advisory |
| `/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide` | 2 | advisory, standard |
| `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step` | 2 | essential |
| `/blog/incorporation-and-company-structures/incorporating-property-portfolio-uk-2026` | 2 | advisory |
| `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` | 2 | advisory |
| `/blog/property-accountant-services/property-accountant-edinburgh-landlord-tax-services` | 2 | standard |
| `/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24` | 2 | essential, standard |
| 23 further blog pages, plus `/calculators/corporation-tax-calculator` and `/contact` | 1 each | mixed |

**Zero Bing-family leads entered on `/locations/*`, `/services/*`, `/spv-company`, `/incorporation` or `/for/*`.** The single highest-value Bing entry point is the incorporation transfer guide, which alone carries 12 of 64 Bing leads and scores advisory tier.

AI leads, grouped by entry page:

| Entry page | Leads | Case tiers seen |
|---|---|---|
| `/` | 34 (18 utm only, 12 referrer chatgpt.com, 4 self-referrer plus utm) | advisory, standard |
| `/services/property-tax-advice` | 6 | advisory, standard |
| `/services/non-resident-landlord` | 1 | advisory |
| `/locations/manchester` | 1 | advisory |
| `/about` | 1 | advisory |
| 6 blog pages (4 incorporation, 1 ATED via Copilot, 1 Australia NRL via Copilot) | 1 each | essential, unscored |

AI leads skew advisory tier. The homepage is 34 of 49.

## 3. ChatGPT entry pages and what they have in common

All non-bot sessions since 2026-07-13 with referrer or utm_source matching chatgpt or openai. Full list in `BING_G_chatgpt_entries.csv`.

| Entry page | Sessions | Leads | Conv |
|---|---|---|---|
| `/` | 131 | 34 | 26% |
| `/services/property-tax-advice` | 13 | 6 | 46% |
| `/blog/.../us-based-directors-ecctas-identity-verification-rules` | 6 | 0 | 0% |
| `/blog/.../incorporating-property-portfolio-uk-2026` | 6 | 0 | 0% |
| `/blog/.../how-to-transfer-property-into-limited-company-uk` | 5 | 1 | 20% |
| `/blog/.../property-investment-company-structure-planning` | 4 | 0 | 0% |
| `/services/non-resident-landlord` | 4 | 1 | 25% |
| `/locations/manchester` | 4 | 1 | 25% |
| `/about` | 3 | 1 | 33% |
| about 45 further blog pages | 1 to 3 each | 0 to 1 | low |

Last 28 days: ChatGPT 78 sessions and 16 leads (20.5% conversion). Bing-family 3,389 sessions and 17 leads (0.5%). Copilot 32 sessions, 1 lead. Google 1,802 sessions, 10 leads. Direct 1,272 sessions, 11 leads.

What the ChatGPT-fed pages share:

- **They are the pages `llms.txt` names.** `llms.txt` (24 KB, HTTP 200) has an explicit "Specialist services" block listing all four `/services/*` pages with one-line descriptions, a "Key pages" block listing `/`, `/services`, `/about`, `/blog`, `/contact`, and an "Attribution and traffic tagging" block instructing the model to append `utm_source=chatgpt&utm_medium=llms`. That tagging is why utm attribution works at all, and why 18 lead sessions show utm_source=chatgpt with no referrer.
- **Firm-voice, service-shaped titles with the word specialist in them.** "Property tax advice from specialist advisors", "Non-resident landlord accountant", "A property accountant for UK landlords and investors".
- **FAQPage on every one.** Homepage 9 questions, each `/services/*` page 12, `/locations/*` 11 to 12. The `/services` hub and `/locations` hub have zero, and both get near-zero AI traffic.
- **Direct-answer openers as H2s**, not marketing headers: "Advice, not another set of accounts", "How the non-resident landlord scheme catches you", "Your tax bill is decided before the return is filed".
- `llms.txt` "Specialist property accountants by city" points 4 of 5 cities at **blog** posts (`/blog/property-accountant-services/london-property-accountant` and siblings), not `/locations/*`. Only Leeds points at `/locations/leeds`. `/spv-company` appears 0 times in `llms.txt`; `/for/` appears 15 times. `llms-full.txt` is served at 17 MB and carries the full body text of the blog, including the `/blog/property-accountant-services/*` cluster.

## 4. Risk register for the planned change

| Planned move | What Bing or ChatGPT rewards that it could disturb | Evidence | Metric to watch, with baseline |
|---|---|---|---|
| Restore exact-match "Property Accountant {City}" titles and H1s on `/locations/*` | **Already in place.** Live fetch shows title "Property Accountant in Manchester \| Landlord Tax Specialists \| Property Tax Partners" and H1 "Property accountant Manchester"; Birmingham is identical in shape. Bing risk is nil, these pages have zero Bing rows ever. Residual ChatGPT risk only: `/locations/manchester` is a live ChatGPT entry point. | Live HTML 2026-10-07; `bing_query_data` zero rows for `/locations/%` across 26 snapshots | `web_sessions` ChatGPT sessions on `/locations/manchester`: baseline 4 since 13 Jul, 2 in last 28d, 1 lead. Re-read 28d after deploy. |
| Restore truthful LocalBusiness properties | Location pages currently carry `AccountingService` with `areaServed: City` and no address, no priceRange, no openingHours, no aggregateRating, with FAQPage alongside at 11 to 12 questions. **Putting a Bradford postal address on a Manchester page is the real exposure**, not to Bing rankings (zero footprint) but to what ChatGPT reads back about where the firm is. ChatGPT currently answers from `llms.txt`, which states the registered office plainly and says the firm works remotely UK-wide. | Live JSON-LD on `/locations/manchester`; `llms.txt` "Who we are" block | FAQPage question count per location page, must stay 11 or more. ChatGPT sessions to `/locations/*`: baseline 8 since 13 Jul (manchester 4, bristol 1, london 1, leeds 0, birmingham 0). |
| Add nav and footer links to `/locations/*`, `/services/*` and the commercial hub | **Largely already in place.** Homepage HTML already links `/locations`, 5 city pages, `/services`, all 4 service pages and `/incorporation`. Further internal links dilute the per-page link budget on pages Bing already ranks, and Property has a known one-link-per-route pattern in the kit. | Homepage href scan 2026-10-07 | Bing site totals: 28d to 2026-10-04 = 79,352 impressions, 2,067 clicks (prior 28d 68,190 and 1,886, so currently rising). Re-read `GetRankAndTrafficStats` 28 days after deploy. A drop below the prior-period 68,190 is the alarm. |
| Rebuild `/blog/property-accountant-services` as a commercial landing page | The hub is a `CollectionPage` with no FAQPage, but its children do carry Bing: `can-you-claim-aia-on-second-hand-assets` 3,370 lifetime impressions and 344 clicks at position 1 to 2 on AIA queries; `how-much-does-a-property-accountant-cost` 47 impressions. Two Bing-family leads came in on `/blog/property-accountant-services/property-accountant-edinburgh-...`, one each on the Cardiff, Glasgow and cost pages. **If the rebuild changes the child listing, the internal links, or any child URL, those Bing positions are what is at stake.** `llms.txt` also cites 4 of 5 city blog posts in this folder, so changing those URLs breaks ChatGPT's current city answers. | `bing_query_data` lifetime sums; `BING_G_lead_attribution.csv`; `llms.txt` city block | `can-you-claim-aia-on-second-hand-assets` Bing position on "can you claim aia on second hand assets": baseline 2.0 at 4 impressions, snapshot 2026-10-07. The four city blog URLs named in `llms.txt` must keep returning 200. |
| Refresh `/services/*` copy | Highest-converting ChatGPT surface on the site: `/services/property-tax-advice` 13 sessions and 6 leads, 46%. All four pages carry 12 FAQPage questions and direct-answer H2s, and all four are named in `llms.txt` with hand-written descriptions. Rewriting the openers or cutting the FAQ blocks removes exactly the structure ChatGPT is citing, and copy changes can leave `llms.txt` describing something the page no longer says. | `BING_G_chatgpt_entries.csv`; live FAQ counts; `llms.txt` "Specialist services" block | FAQPage question count per `/services/*` page: baseline 12 each at 2026-10-07. ChatGPT sessions and leads on `/services/property-tax-advice`: baseline 15 sessions and 4 leads in the last 28 days. Keep the `llms.txt` descriptions in step. |
| Batch deploys to two a week | Nothing in the data argues against this. One note: Bing data lands in `bing_query_data` at irregular snapshots (26 dates since 30 May, gaps of 1 to 16 days), so a twice-weekly cadence will often give fewer than two Bing snapshots between deploys, and attribution of a Bing move to one deploy will be weak. | `bing_query_data` date list | None. Record deploy dates so a later snapshot can be lined up against them. |

## 5. Baseline snapshot

`BING_G_baseline.csv` has one row per commercial page per top-5 Bing query, with page, query rank, query, Bing position, Bing impressions, Bing clicks (snapshot 2026-10-07), sessions last 28 days, ChatGPT sessions last 28 days, Bing-family sessions last 28 days, and leads last 28 days. 44 data rows covering 41 commercial pages. 35 of those pages have no Bing rows at all, recorded as "(no bing rows)" so a post-change read can tell absent apart from zero.

Site-level Bing baseline to pair with it: 28 days to 2026-10-04, 79,352 impressions and 2,067 clicks, against 68,190 and 1,886 in the prior 28 days.

Supporting CSVs: `BING_G_bing_commercial_queries.csv`, `BING_G_lead_attribution.csv`, `BING_G_chatgpt_entries.csv`.

## Could not verify

- **Bing clicks per page for a fixed 28-day window.** `bing_query_data` is a snapshot of whatever rolling window the Bing API returns, not a daily series. One page-query pair read 14 impressions on 2026-08-24 and 1 on 2026-10-07, so the values are not cumulative and cannot be differenced into a 28-day figure. The baseline CSV carries snapshot values, labelled as such. The site-level 28-day clicks come from `GetRankAndTrafficStats`, which is a true daily series.
- **Per-page `GetPageQueryStats`** was not re-pulled page by page. The 2026-10-07 snapshot already in `bing_query_data` covers 247 Property pages and was used instead.
- **Whether `/locations/*` and `/services/*` are absent from Bing because of position or because of indexing.** The table holds top-N queries per page, so absence could mean not indexed, or indexed with zero impressions. This matters for the Google plan: if those pages are not in Bing's index, the change cannot hurt Bing there, but it also cannot help.
- **Google-side baseline.** Out of scope here; no GSC pull was made.
- **What ChatGPT actually says about the firm.** Session data shows where it sends people, not what it answers. No prompt test was run.
- **Case tier for 18 of the 113 Bing and AI lead sessions**, which have no `lead_value_scores` row.
