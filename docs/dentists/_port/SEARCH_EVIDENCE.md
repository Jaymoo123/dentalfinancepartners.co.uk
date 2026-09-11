# DENTISTS PORT — SEARCH-TRAFFIC EVIDENCE

Purpose: remove the guessing from the retirement and redirect decisions in
`DISPOSITION_SLICE3.md` §H. Every number below is a FRESH API pull, not a stored
Supabase snapshot. Nothing here deletes anything: every deletion stays an owner gate.

Pulled 2026-09-11. Script was a scratch pull (deleted), calling
`optimisation_engine.clients.gsc_query_client.GSCQueryFetcher` (Google Search Console
Search Analytics API, `sc-domain:dentalfinancepartners.co.uk`) and
`optimisation_engine.clients.bing_query_client.BingWebmasterClient` against
`https://www.dentalfinancepartners.co.uk`.

## 0. Sources and data-through dates

| Source | Method | Window used | Data through |
|---|---|---|---|
| Google | GSC API, `dimensions:["date"]` (unsampled site totals) | 2026-08-13 to 2026-09-09 | **2026-09-08** (last date row) |
| Google | GSC API, `dimensions:["page"]` | 28d 2026-08-13 to 2026-09-09; 90d 2026-06-12 to 2026-09-09 | **2026-09-08** |
| Google | GSC API, `dimensions:["query"]` and `["page","query"]` | 90d 2026-06-12 to 2026-09-09 | **2026-09-08** |
| Bing | `GetRankAndTrafficStats` (the ONLY site-total method) | daily rows 2026-05-17 to 2026-09-09 | **2026-09-09** |
| Bing | `GetPageStats` (per-URL, **top-N: 121 URLs only**) | weekly buckets 2026-05-22 to 2026-09-04 | **2026-09-04** |
| Bing | `GetPageQueryStats` (per-URL, queried route by route) | rolling, service-defined | **2026-09-04** |

`gsc_query_data` was NOT summed anywhere in this document (~20x undercount). Page totals
come from `gsc_page_performance`-equivalent live API calls with the `page` dimension.

The analytics bot gate landed 2026-08-23. It gates on-site analytics, not GSC or Bing
Webmaster, so the windows here are unaffected by it. No on-site event figures are quoted.

---

## 1. A CORRECTION TO THE BRIEF THAT CHANGES THE FRAME

The brief says Bing sent **1,682 clicks against Google's 109** over 28 days, "roughly 15x,
the widest split on the estate", and instructs that every keep/kill judgement be a Bing
judgement first.

**That is FALSE.** Fresh from the APIs:

| Window | Google clicks | Google impressions | Bing clicks | Bing impressions |
|---|---|---|---|---|
| 28 days (Google to 2026-09-08, Bing to 2026-09-09) | **131** | 14,188 | **109** | 4,954 |
| 90 days (to 2026-09-09) | **320** | 35,720 | **309** | 14,589 |

Decisive output line, Bing `GetRankAndTrafficStats`:
`BING 28d(to 2026-09-09) clicks=109 impr=4954` — and Google date-dimension
`gsc 28d clicks 131 impr 14188`.

So **109 is Bing's number, not Google's**, and Google is ahead on clicks on both windows.
The correct reading is: Bing is a genuine second channel worth about 83% of Google's clicks
on 28 days and 97% on 90 days, and on one third of Google's impressions, so Bing converts
impressions to clicks about 2.9x harder. That is worth respecting. It is not 15x, and no
route should be kept or killed on a claimed 15x Bing advantage.

The other half of the brief's correction stands: `docs/dentists/STATE.md` saying
"Bing: 0 rows ingested for dentists" is wrong. Bing has live data for this site.

**Practical rule this document uses:** a route is only called dead when it is zero on BOTH
engines, and Bing's per-URL methods are top-N, so a Bing zero is confirmed route by route
with `GetPageQueryStats` rather than inferred from absence in `GetPageStats`.

---

## 2. Section A — retirement candidates from SLICE3 §H

`docs/dentists/_port/PHASE456_SCOPE.md` **does not exist** at the time of this pull
(`ls` returned "No such file or directory"), so this covers the §H list only. If that file
lands later with additional candidates, they are not evidenced here.

Internal-link counts are literal occurrences of the path in `Dentists/web/src` and
`Dentists/web/content` (exact-quoted form), the same derivation SLICE3 used. They count
source occurrences, not rendered link instances: a link inside a blog renderer renders on
every post.

Windows: Google 28d = 2026-08-13..2026-09-09 and 90d = 2026-06-12..2026-09-09, through
2026-09-08. Bing per-URL through 2026-09-04.

| Route | G clicks/impr 28d | G clicks/impr 90d | G best pos 90d | Bing clicks/impr | Bing best pos | Internal links | Verdict | Reason |
|---|---|---|---|---|---|---|---|---|
| `/` | 1 / 1,940 | 8 / 5,106 | 44.6 | 2 / 22 | 1 | chrome | **KEEP** | Not a candidate; see §6 |
| `/about` | 0 / 0 | 1 / 10 | 48.6 | 0 / 0 (confirmed) | — | 1 source, renders on 223 posts | **KEEP + PROMOTE** | E-E-A-T page with 223 rendered inbound links and no chrome slot; search is irrelevant to the decision |
| `/book` | **0 / 0** | **0 / 0** | — | **0 / 0 (confirmed)** | — | 0 | **NEEDS-OWNER (recommend KEEP)** | `noindex,nofollow`, so zero is expected, not evidence of death. It is the destination for nurture email and Telegram lead-ops flows that live outside this repo's link graph. Deleting it breaks a channel search data cannot see |
| `/complete` | 0 / 0 | 0 / 0 | — | 0 / 0 | — | 0 | **KEEP** | Token-gated post-submit top-up, `noindex,nofollow`. Zero links is correct by design |
| `/thank-you` | 0 / 0 | 0 / 0 | — | 0 / 0 | — | 0 | **KEEP** | Form redirect target, `noindex,follow` |
| `/embed`, `/embed/[slug]` (14) | n/a (`index:false`) | n/a | — | n/a | — | 0 | **KEEP** | Partner distribution surface, deliberately unindexed |
| `/research` | 0 / 5 | 0 / 11 | 14.0 | 0 / 0 (confirmed) | — | 5 | **KEEP + PROMOTE** | Indexed and ranking top-15 on its few impressions; it is invisible from the chrome, which is the actual defect |
| `/research/nhs-dentist-earnings-index` | 0 / 85 | 0 / 195 | 6.3 | 0 / 5 | 8.0 | via `/research` | **KEEP** | 195 impressions at position 6.3 on both engines. Strongest of the four data assets |
| `/research/dental-practice-density` | 1 / 65 | 1 / 100 | 5.2 | 0 / 0 | — | via `/research` | **KEEP** | Ranks 5.2, earns clicks. Live asset |
| `/research/nhs-dental-activity-index` | 0 / 5 | 0 / 13 | 4.3 | 0 / 0 | — | via `/research` | **KEEP** | Position 4.3 on a thin-demand query set. Low volume is the market, not the page |
| `/research/dental-company-formation-index` | 0 / 4 | 0 / 13 | 8.6 | 0 / 1 | 2.0 | via `/research` | **KEEP** | Indexed on both engines, tiny demand |
| `/resources/associate` | 0 / 3 | 0 / 14 | 9.9 | 0 / 0 (confirmed) | — | 2 | **KEEP + build the hub** | Indexed, position 9.9, zero clicks because volume is tiny. No `/resources` index exists (`ls src/app/resources` = `[topic]` only) |
| `/resources/principal` | 0 / 0 | 0 / 3 | 10.7 | 0 / 0 | — | 1 | **KEEP + build the hub** | Same |
| `/resources/*` other 4 topics | no rows | no rows | — | no rows | — | 0 | **NEEDS-OWNER** | **Absence is a question here, not a finding.** Zero impressions on a page with zero inbound links and no hub is indistinguishable from "never discovered". Build the hub, then re-read in a quarter before anyone proposes deleting them |
| `/for-associates` | 0 / 4 | 0 / 5 | 8.0 | 0 / 0 | — | 10 | **KEEP** | Indexed, ranks 8.0 |
| `/for-principals` | 0 / 0 | 0 / 1 | 8.0 | 0 / 0 | — | 9 | **KEEP** | Indexed, negligible demand |
| `/for-practice-buyers` | 0 / 3 | 0 / 3 | 7.7 | 0 / 3 | 5.0 | 6 | **KEEP** | Indexed on both engines |
| `/for-locum-dentists` | 0 / 22 | 0 / 22 | 23.6 | 0 / 0 (confirmed) | — | 4 | **KEEP** | 22 impressions all inside the last 28 days and none in the prior 62: this page is **maturing, revisit ~a quarter**. Judging it now would be judging a page mid-discovery |
| `/locations` | 0 / 0 | 0 / 0 | — | 0 / 0 (confirmed) | — | 3, and in `footer_links` (chrome) | **KEEP** | Index page for 2 cities; it is in the chrome on every page, so it is not an orphan. Zero search demand for a 2-city hub is expected |
| `/locations/london` | 0 / 0 | 0 / 0 | — | 0 / 3 | 1.0 | 0 literal | **KEEP** | **Bing-only page.** Position 1 on Bing, invisible to Google. Exactly the case the brief warned about: killing it on Google evidence alone would be wrong |
| 5 static blog hub files | each is the canonical `/blog/<slug>` route; `/blog/buying-a-practice` alone holds 654 impr / 0 clicks / pos 77.7 (90d) | — | — | — | — | blog index grid | **KEEP the routes** | Converge the template, keep the prose, change no URL. Deleting the files loses hand-written content that is already indexed |
| `components/blog/ExitIntentModal.tsx` | no route | — | — | — | — | 0 imports | **DELETE** | Component, not a route. Already unmounted; no search question exists |
| The unimported `CalcResultCta.tsx` | no route | — | — | — | — | establish which | **DELETE the unimported one** | Component, no search question |
| `components/ui/CTASection.tsx` | no route | — | — | — | — | 3 call sites | **DELETE after migration** | Component |
| `components/ui/Breadcrumb.tsx` | no route | — | — | — | — | many | **DELETE after migration** | Component |
| `BrandWordmarkHomeLink.tsx`, `BrandLogoHero.tsx` | no route | — | — | — | — | chrome + hero | **DELETE in phase 1/5** | Component; export the wordmark constants first |
| `header_nav_secondary`, `header_mobile_secondary` ids | no route | — | — | — | — | — | **RETIRE the ids** | Analytics ids that cannot fire under the live `leadgen` variant. Nothing recorded, nothing lost |
| `home_cta_primary`, `home_cta_secondary`, `contact_pricing_link` | no route | — | — | — | — | — | **KEEP under the branch** | Unused variant, not dead code |

**No route on this list earns a DELETE.** The only DELETEs are component-level and carry no
URL, so no redirect question arises. Nothing here needs a redirect, so `permanent: true`
(which emits a 308, and 308 is fine) is not required for any §A item.

---

## 3. Section B — the five dead calculator routes

All five 404 today. They are linked **20 times across 16 content files**, all under the
`/calculators/` prefix (verified by grep; the 16-file count in the brief is correct).

**Search traffic for all five: zero, on both engines, on every window pulled.**

Decisive output lines:
- Google, 90d page dimension: `GSC90 rows containing -calculator: 0 []`
- Bing `GetPageStats`: 4 rows contain `-calculator`, and **none of them is one of these five**
  (they are `/blog/associate-tax/associate-dentist-tax-calculator-uk` x3 and
  `/blog/general/vat-calculator-dental-practice` x1)
- Bing `GetPageQueryStats`, run individually on each of the five: `rows=0 clk=0 impr=0`

So these slugs are not earning impressions, are not earning clicks, and there is no
evidence they were ever live and indexed under these URLs. `next.config.ts` carries exactly
one redirect (`/pricing` -> `/services`), so nothing has ever been routed from them.

Live registry (`Dentists/web/src/lib/tools/registry.ts`) holds 13 tools. Mapping:

| Dead slug (404) | Live target | Confidence | Recommendation |
|---|---|---|---|
| `/calculators/associate-take-home-calculator` | `/calculators/associate-take-home` | exact, slug differs only by the `-calculator` suffix | **Fix the 3 links** to point at the live slug |
| `/calculators/nhs-uda-value-calculator` | `/calculators/uda-value` | high; `uda-value` is the site's strongest calculator (Bing 4 clicks / 59 impr, pos 5.3) | **Fix the 4 links** |
| `/calculators/practice-valuation-calculator` | `/calculators/practice-valuation` | exact, suffix only | **Fix the 8 links** |
| `/calculators/practice-profit-extraction-calculator` | `/calculators/principal-extraction` | high; it is the profit-extraction tool for principals | **Fix the 3 links** |
| `/calculators/locum-cost-benefit-calculator` | `/calculators/locum-structure` | high; the sole-trader vs Ltd decision tool for locums | **Fix the 2 links** |

**Fix at the link, never by deleting the link.** Each of the 20 links sits in a real editorial
context in a real post; removing them removes a legitimate internal link and a reader's next
step. Editing the href is a one-character-class change in a content file.

A redirect block in `next.config.ts` is the alternative and is also defensible as a belt on
top, since the 404s have been shipping and other people may have copied the URLs. But there
is **no external evidence to preserve** (zero impressions, zero clicks, both engines), so a
redirect is optional hygiene here, not a rescue. If added, `permanent: true` emits a 308 and
that is fine.

Recommendation: fix the 20 links; skip the redirects unless the owner wants the belt.

---

## 4. Section C — the wrong-category blog link

`content/blog/nhs-dentist-earnings-expenses-gross-net-breakdown.md` links to
`/blog/practice-finance/how-much-of-dental-practice-price-is-goodwill`.

Confirmed from source. The post file is
`Dentists/web/content/blog/how-much-of-dental-practice-price-is-goodwill.md`:
- frontmatter `category: "Goodwill & Practice Sale"`
- `slugifyCategory()` in `src/lib/blog.ts:96-104` lowercases, replaces `&` with `and`, and
  hyphenates spaces, giving **`goodwill-and-practice-sale`**
- the file's own `canonical` frontmatter already says
  `https://www.dentalfinancepartners.co.uk/blog/goodwill-and-practice-sale/how-much-of-dental-practice-price-is-goodwill`
- `getPostByCategoryAndSlug` (`src/lib/blog.ts:110-118`) returns null when the category
  segment does not match, so the wrong URL **404s**

**Correct live URL:** `/blog/goodwill-and-practice-sale/how-much-of-dental-practice-price-is-goodwill`

Note the brief writes the category slug as "Goodwill & Practice Sale" and my own first guess
of the slug was `goodwill-practice-sale`. That is wrong: the `&` becomes `and`, so the
segment is `goodwill-and-practice-sale`. Both wrong spellings return no data.

| URL | Google 28d | Google 90d | Google best pos | Bing |
|---|---|---|---|---|
| `/blog/practice-finance/how-much-of-dental-practice-price-is-goodwill` (the wrong one) | no rows | no rows | — | `GetPageQueryStats` `rows=0` |
| `/blog/goodwill-practice-sale/...` (also wrong) | no rows | no rows | — | `rows=0` |
| `/blog/goodwill-and-practice-sale/...` (**correct, live**) | 0 clicks / 9 impr | 0 clicks / 13 impr | 12.8 | not in `GetPageStats` top-N; `GetPageQueryStats` not run on this exact URL |

**Verdict: the wrong URL has zero traffic and zero indexation on both engines.** Nothing is
at stake externally; this is a one-line href fix in one content file, and no redirect is
needed. The real cost is that a reader clicking it today gets a 404.

---

## 5. Section D — the 5 `/services/<slug>` pages missing from `sitemap.xml`

Confirmed absent: `src/app/sitemap.ts` lists `/services` in `staticPaths` but never
enumerates the `[slug]` children, while `src/app/services/[slug]/data.ts` defines exactly
five: `dental-accountants`, `practice-accounting`, `associate-tax`, `practice-valuation`,
`locum-dentist-tax`.

| Route | Google 28d | Google 90d | Google best pos 90d | Bing (`GetPageQueryStats`) | Indexed? |
|---|---|---|---|---|---|
| `/services/practice-valuation` | 0 clicks / 51 impr | 1 click / 287 impr | 6.6 (28d) / 47.8 (90d avg) | `rows=0`; `GetPageStats` 0 clk / 1 impr, pos 10 | **Yes, both engines** |
| `/services/practice-accounting` | no rows | 0 clicks / 29 impr | 68.4 | `rows=0` | **Yes, Google** |
| `/services/associate-tax` | no rows | no rows | — | `GetPageStats` 0 clk / 1 impr, pos 6.0 | **Yes, Bing only** |
| `/services/dental-accountants` | no rows | no rows | — | `rows=0` | **Unknown** |
| `/services/locum-dentist-tax` | no rows | no rows | — | `rows=0` | **Unknown** |

Three of the five are demonstrably indexed despite the sitemap gap, which is the expected
outcome: `/services` is linked 24 times in source and links onward, so the crawler reaches
them regardless. A sitemap is a discovery hint, not an indexation gate.

For the two with no rows on either engine, **absence is a question, not a finding**. They may
be unindexed, or indexed with demand too thin to register. Nothing here distinguishes those,
and the honest answer needs a URL Inspection call, which is a separate read.

**Answer: a formality, not a live commercial loss.** Add the five entries anyway, because it
costs four lines in `sitemap.ts` and it removes the ambiguity for
`/services/dental-accountants`, which is the page named after this site's single biggest
head term and is currently earning nothing on either engine.

---

## 6. Section E — the head-term picture, for the owner

Re-derived fresh, Google 90d window 2026-06-12..2026-09-09, data through 2026-09-08.

**Homepage:** 8 clicks on 5,106 impressions over 90 days, average position **44.8**. Over the
last 28 days: **1 click on 1,940 impressions**, average position 44.6.

**Head terms, from the `page`+`query` dimension on the homepage (90 days):**

| Query | Impressions | Clicks | Avg position |
|---|---|---|---|
| accountants for dentists | 1,284 | 0 | 46.6 |
| dental accountants | 989 | 1 | 46.6 |
| specialist dental accountants | 658 | 0 | 43.7 |
| accounting for dentists | 268 | 0 | 45.5 |
| dental accounting | 172 | 0 | 52.3 |
| accountant for dentists | 138 | 0 | 50.6 |
| dentist accountants near me | 97 | 0 | 71.3 |

28-day positions on the same terms: 43.4, 44.4, 45.0, 47.2. Identical band.

**Bing homepage, for contrast:** 2 clicks on 22 impressions, best position **1**. Bing ranks
this homepage at the top of a tiny query set; Google shows it to thousands and ranks it in
the forties.

### In plain English

It has not moved. The homepage is still holding thousands of impressions for a single click,
and the money terms are still parked around positions 43 to 47, exactly where `STATE.md`
recorded them. Nothing has improved and nothing has decayed.

**And this is an authority problem, not a conversion problem.** At position 45 nobody sees
the page, so no amount of redesign changes the click. A design port cannot be justified on
these numbers: the impressions that would reward better conversion are not reaching the site.

That does not make the port wrong. It makes the **justification** wrong. The port's real case
is on the pages that already rank: `/blog/nhs-contracts/uda-value-explained-for-uk-dentists`
(6,833 impressions, 80 clicks, position 6.6 on Google over 90 days),
`/blog/practice-finance/sole-trader-vs-limited-company-dentists-uk` (52 clicks, position
5.8), `/blog/nhs-contracts/band-1-band-2-band-3-uda-treatment-explained` (Bing 38 clicks on
2,840 impressions). Those pages get real traffic, sit at real positions, and are where better
capture converts into leads. The homepage head-term gap is a separate, slower, off-site
authority job.

---

## 7. What could not be pulled

| Check | Why not | What would close it |
|---|---|---|
| Indexation status of `/services/dental-accountants` and `/services/locum-dentist-tax` | Zero impressions cannot distinguish "not indexed" from "indexed, no demand" | GSC URL Inspection API call per URL, or Bing `GetUrlInfo` |
| Bing per-URL coverage for routes outside the top 121 | `GetPageStats` is top-N by design | Per-route `GetPageQueryStats` was used instead, and every zero marked "(confirmed)" in §2 was verified that way. Rows not marked "(confirmed)" are top-N absences only |
| Bing `GetUrlTrafficInfo` | API returned `400 Bad Request` for this site | Not needed; `GetRankAndTrafficStats` covers site totals |
| Publication dates for the `/services/[slug]` and `/resources/[topic]` pages | Not carried in the data files pulled | Needed before calling any of them mature. `/for-locum-dentists` is flagged maturing on impression-onset evidence instead |
| On-site `cta_click` figures per `data-cta` id (SLICE3 §I) | Out of scope for this brief, and any window spanning 2026-08-23 is inflated by the pre-bot-gate data | A separate post-2026-08-23 read |

---

## 8. Corrections this document makes to other docs

1. **`docs/dentists/STATE.md`: "Bing: 0 rows ingested for dentists" is FALSE.** Bing has live
   data for this site through 2026-09-09.
2. **The brief's "Bing 1,682 clicks vs Google's 109, roughly 15x" is FALSE.** Fresh totals for
   28 days are Google 131 clicks and Bing 109 clicks. Google is ahead. Bing is a strong second
   channel, not a 15x one. Whatever produced 1,682 was not `GetRankAndTrafficStats`.
3. **`DISPOSITION_SLICE3.md` §H is sound.** Every "needs a GSC read" row has now been read and
   none of them changed the recommendation already written there. The evidence confirms the
   dispositions rather than overturning them.
4. `docs/dentists/_port/PHASE456_SCOPE.md` did not exist when this was pulled, so any
   candidates it adds are unevidenced here.
