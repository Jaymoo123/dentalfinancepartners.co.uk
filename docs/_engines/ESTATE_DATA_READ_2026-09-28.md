# Estate data read (2026-09-28)

Data agent for `docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md` section 5. Every
number here was pulled live on 2026-09-28. No stored Supabase search snapshot was read and
`gsc_query_data` was never summed.

## Method, stated once

| Thing | How it was pulled |
|---|---|
| Google Search Console | Fresh API, `searchanalytics.query`, `dimensions: ["date"]` only, so the totals are unsampled. Property list from `sites().list()`: all 17 domains are `sc-domain:` properties at `siteOwner` level, so nothing was blocked by verification. Window 28d and 90d back from 2026-09-28; **data-through 2026-09-25** on every site (Google's usual three-day lag). |
| Bing | Fresh `GetRankAndTrafficStats` per site, the site-total method. `GetQueryStats` was not used for totals (it is a truncated top-N slice, memory `bing_query_stats_topn_trap`). Site URLs from `GetUserSites`. **Data-through 2026-09-25.** Where Bing holds fewer than 90 days the row says how many days it has, and the "90d" figure is that shorter window, not a zero. |
| UK humans | `web_sessions`, `is_bot = false`, `country = 'GB'`, `count(distinct visitor_id)`. This is the definition the 09-27 programme used: it reproduces that document's medical 801, contractors 111 and care 111 to within 2%. Bot gate per memory `analytics_bot_gate`; GB and UTC per `console_analytics_dashboard`. Window 2026-06-30 to 2026-09-28 inclusive, **data-through 2026-09-28**. |
| Leads | `leads` table, `created_at` in the same window, `coalesce(is_test,false) = false` and `source <> 'test'`. Session-attributed leads (`web_sessions.lead_id`) are shown alongside because the two differ: leads with no session are embed, phone and non-GB arrivals. |
| Leads per 1,000 | leads table count divided by UK humans, times 1,000. |
| AI referred | `web_sessions.referrer_host` matching `chatgpt.com`, `openai.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com` only, same bot gate and window. A looser filter that also accepted `utm_source=chatgpt` roughly doubled the counts, but it catches `llms.txt` tagged links arriving from Google, so it is not reported as AI traffic. |
| Entry page split | `web_sessions.entry_path` of the session carrying the lead: `/` homepage, `/blog*` or `/guides*` blog, `/for/*` segment, anything containing `calculator` calculator, else other. |

Site keys: `digital-agency` is `agency` in the database. Property is `property`.

---

## 1. Google Search Console, fresh pull, data-through 2026-09-25

| Site | Clicks 28d | Impressions 28d | Clicks 90d | Impressions 90d | Days with data in 90d |
|---|---:|---:|---:|---:|---:|
| Property | 1,271 | 125,496 | 3,245 | 330,175 | 88 |
| Solicitors | 913 | 69,243 | 1,706 | 119,054 | 88 |
| Dentists | 203 | 15,832 | 430 | 37,880 | 88 |
| generalist | 186 | 26,241 | 405 | 71,421 | 88 |
| construction-cis | 128 | 15,722 | 273 | 34,253 | 88 |
| Medical | 89 | 5,237 | 183 | 14,510 | 88 |
| charities | 56 | 8,280 | 84 | 18,047 | 73 |
| care | 40 | 2,682 | 65 | 5,827 | 73 |
| pharmacies | 33 | 2,456 | 65 | 4,351 | 73 |
| ecommerce | 15 | 5,224 | 32 | 9,176 | 73 |
| hospitality | 15 | 1,619 | 21 | 3,234 | 73 |
| startups-tech | 6 | 2,316 | 20 | 6,213 | 73 |
| contractors-ir35 | 8 | 1,751 | 16 | 4,254 | 88 |
| digital-agency | 1 | 990 | 18 | 4,983 | 88 |
| crypto | 4 | 504 | 8 | 996 | 73 |
| wills-probate | no data | no data | no data | no data | 0 |
| divorce-finances | no data | no data | no data | no data | 0 |

wills-probate and divorce-finances: the properties exist and are owned
(`sc-domain:estateplanningspecialists.co.uk`, `sc-domain:divorcefinancespecialists.co.uk`),
the API returns HTTP 200 and a single row dated 2026-09-25 carrying zero clicks and zero
impressions. So the read is "verified, in the pipeline, no search exposure yet", not "not in
GSC". Both domains answer HTTP 200 on the live web.

The 73-day sites (charities, care, pharmacies, ecommerce, hospitality, startups-tech, crypto)
have no GSC rows before 2026-07-15. Their "90d" column is a 73-day window.

## 2. Bing Webmaster Tools, GetRankAndTrafficStats, data-through 2026-09-25

| Site | Clicks 28d | Impressions 28d | Clicks 90d | Impressions 90d | Days Bing holds |
|---|---:|---:|---:|---:|---:|
| Property | 2,000 | 74,414 | 5,740 | 216,091 | 132 |
| generalist | 785 | 53,687 | 2,248 | 158,285 | 129 |
| Solicitors | 747 | 25,068 | 1,955 | 70,167 | 132 |
| Medical | 167 | 5,451 | 435 | 12,793 | 132 |
| charities | 145 | 7,939 | 189 (71d) | 9,788 (71d) | 71 |
| Dentists | 118 | 6,556 | 324 | 17,001 | 132 |
| digital-agency | 45 | 2,549 | 115 | 6,165 | 132 |
| hospitality | 29 | 2,262 | 44 (71d) | 3,290 (71d) | 71 |
| contractors-ir35 | 26 | 2,314 | 40 | 2,926 | 99 |
| construction-cis | 22 | 1,346 | 82 | 4,623 | 105 |
| pharmacies | 14 | 328 | 15 (71d) | 382 (71d) | 71 |
| startups-tech | 14 | 783 | 15 (71d) | 823 (71d) | 71 |
| care | 6 | 557 | 15 (71d) | 774 (71d) | 71 |
| ecommerce | 3 | 305 | 6 (71d) | 432 (71d) | 71 |
| crypto | 2 | 169 | 6 (71d) | 208 (71d) | 71 |
| wills-probate | no data | no data | no data | no data | 0 |
| divorce-finances | no data | no data | no data | no data | 0 |

wills-probate and divorce-finances are both verified in Bing Webmaster Tools (they appear in
`GetUserSites` as `https://estateplanningspecialists.co.uk/` and
`https://divorcefinancespecialists.co.uk/`) but `GetRankAndTrafficStats` returns no dated rows
at all, so Bing has recorded no impressions yet. Not an API error, not a verification gap.

Bing beats Google on clicks on generalist (2,248 against 405, 5.5x), Property (5,740 against
3,245), charities, hospitality, pharmacies, startups-tech, digital-agency and contractors-ir35.
Google is ahead only on Dentists, construction-cis, care, ecommerce and crypto.

## 3. UK humans, leads and leads per 1,000, 90 days, data-through 2026-09-28

Window 2026-06-30 to 2026-09-28. The post 2026-08-23 bot gate is applied throughout, so these
are not comparable with any traffic figure quoted before that date.

| Site | UK humans 90d | GB sessions 90d | Leads 90d (leads table) | Leads 90d (session attributed) | Leads per 1,000 humans |
|---|---:|---:|---:|---:|---:|
| contractors-ir35 | 114 | 148 | 8 | 8 | **70.2** |
| care | 113 | 165 | 5 | 5 | **44.2** |
| Medical | 817 | 1,193 | 27 | 27 | **33.0** |
| crypto | 38 | 56 | 1 | 1 | **26.3** |
| ecommerce | 46 | 48 | 1 | 0 | **21.7** |
| startups-tech | 51 | 57 | 1 | 1 | 19.6 |
| Property | 11,119 | 14,962 | 200 | 165 | 18.0 |
| charities | 384 | 476 | 6 | 6 | 15.6 |
| construction-cis | 403 | 502 | 5 | 5 | 12.4 |
| pharmacies | 92 | 122 | 1 | 0 | 10.9 |
| Dentists | 853 | 1,177 | 5 | 4 | 5.9 |
| digital-agency | 180 | 213 | 1 | 1 | 5.6 |
| generalist | 3,431 | 4,158 | 17 | 15 | 5.0 |
| Solicitors | 4,170 | 5,525 | 9 | 8 | 2.2 |
| hospitality | 99 | 144 | 0 | 0 | 0.0 |
| wills-probate | no data | no data | 0 | no data | no data |
| divorce-finances | no data | no data | 0 | no data | no data |

wills-probate and divorce-finances have **no rows at all** in `web_sessions` for any date under
any plausible site key (`wills-probate`, `divorce-finances`, `estate`, `wills`, `divorce`,
`probate` all return nothing), and no rows in `leads`. Both domains serve HTTP 200. Whether the
analytics beacon is wired on them is a question for the ops agent, not a finding here: the
tracking endpoint is not visible in either site's raw HTML, and it is not visible in Property's
raw HTML either, so that test proves nothing.

Read the top five rates as rates on small denominators. contractors-ir35 is 8 leads on 114
humans, care 5 on 113, crypto 1 on 38, ecommerce 1 on 46, startups-tech 1 on 51. One lead moves
crypto by 26 points. Medical at 33.0 per 1,000 on 817 humans is the only high rate with a
denominator large enough to trust on its own.

## 4. AI referred sessions and leads, 90 days, data-through 2026-09-28

Referrer host only. ChatGPT includes `chatgpt.com` and `openai.com`.

| Site | AI sessions | AI humans | AI leads | ChatGPT | Perplexity | Copilot | Gemini |
|---|---:|---:|---:|---:|---:|---:|---:|
| Property | 229 | 197 | 15 | 83 | 22 | 98 | 26 |
| generalist | 65 | 59 | 4 | 38 | 4 | 22 | 1 |
| Solicitors | 58 | 53 | 1 | 14 | 0 | 36 | 8 |
| Dentists | 19 | 17 | 0 | 4 | 1 | 12 | 2 |
| Medical | 18 | 17 | 5 | 12 | 0 | 5 | 1 |
| contractors-ir35 | 16 | 14 | 3 | 9 | 1 | 6 | 0 |
| construction-cis | 13 | 6 | 0 | 3 | 0 | 1 | 9 |
| digital-agency | 12 | 11 | 1 | 9 | 1 | 2 | 0 |
| care | 11 | 5 | 1 | 4 | 5 | 2 | 0 |
| charities | 8 | 7 | 1 | 3 | 0 | 5 | 0 |
| hospitality | 6 | 5 | 0 | 4 | 0 | 2 | 0 |
| crypto | 4 | 3 | 1 | 4 | 0 | 0 | 0 |
| pharmacies | 2 | 2 | 0 | 1 | 0 | 0 | 1 |
| startups-tech | 1 | 1 | 0 | 1 | 0 | 0 | 0 |
| ecommerce | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| wills-probate | no data | no data | no data | no data | no data | no data | no data |
| divorce-finances | no data | no data | no data | no data | no data | no data | no data |

AI traffic converts far above each site's own average: Property 15 leads on 197 AI humans is 76
per 1,000 against its site rate of 18.0, Medical 5 on 17 against 33.0. Copilot is the largest
single AI source on Property, Solicitors, Dentists and charities; ChatGPT leads on generalist,
Medical, contractors-ir35, digital-agency and crypto. ecommerce has zero AI sessions on a strict
referrer match.

## 5. Entry page of the converting session, leads 90 days, data-through 2026-09-28

Session-attributed leads only, so these rows sum to the session-attributed column in section 3,
not to the leads table count.

| Site | Homepage | Blog or guides | Segment `/for/` | Calculator | Other | Total |
|---|---:|---:|---:|---:|---:|---:|
| Property | 47 | 93 | 0 | 1 | 24 | 165 |
| Medical | 15 | 4 | 0 | 2 | 6 | 27 |
| generalist | 6 | 4 | 0 | 0 | 5 | 15 |
| Solicitors | 1 | 4 | 0 | 0 | 3 | 8 |
| contractors-ir35 | 3 | 1 | 2 | 0 | 2 | 8 |
| charities | 3 | 3 | 0 | 0 | 0 | 6 |
| care | 3 | 0 | 1 | 0 | 1 | 5 |
| construction-cis | 1 | 0 | 2 | 1 | 1 | 5 |
| Dentists | 2 | 1 | 0 | 0 | 1 | 4 |
| startups-tech | 1 | 0 | 0 | 0 | 0 | 1 |
| crypto | 1 | 0 | 0 | 0 | 0 | 1 |
| digital-agency | 0 | 0 | 0 | 0 | 1 | 1 |
| ecommerce, hospitality, pharmacies | 0 | 0 | 0 | 0 | 0 | 0 |
| wills-probate, divorce-finances | no data | no data | no data | no data | no data | no data |

Property's 15 segment pages produced zero entry-page leads in 90 days. Calculators produced
four leads estate-wide. Homepage arrivals are the dominant route on every site except Property,
where blog arrivals are 56% of leads.

---

## Summary

1. Fifteen of 17 sites have usable data on every metric. wills-probate and divorce-finances
   have none: verified in both Google and Bing, live on HTTP 200, zero search exposure and zero
   analytics rows ever recorded.
2. Data-through dates: Google and Bing 2026-09-25, Supabase sessions and leads 2026-09-28.
3. The five biggest leads per 1,000 UK humans over 90 days: contractors-ir35 70.2, care 44.2,
   Medical 33.0, crypto 26.3, ecommerce 21.7.
4. Four of those five rest on one to eight leads. Medical is the only one with a denominator
   (817 humans) large enough to stand on its own.
5. Property is 63% of estate UK humans and 74% of estate leads, at 18.0 per 1,000.
6. Solicitors and generalist are the estate's two large low-rate sites: 7,601 UK humans between
   them for 26 leads, 2.2 and 5.0 per 1,000.
7. Bing out-clicks Google on eight of the 15 sites with data, by 5.5x on generalist.
8. AI referred traffic is 502 sessions estate-wide and 31 leads, a rate several times each
   site's own average; Copilot is the biggest single source on four sites.
9. Could not pull: any session, AI or entry-page figure for the two new sites; a true Bing
   90-day window on seven sites, which hold only 71 days of Bing history, marked in the table.
10. Not attempted because section 5 does not ask for them: per-page GSC, per-page Bing, and any
    28-day lead rate, which no site but Property has the volume to state.
