# Google guidance on "Crawled - currently not indexed" (research, 2026-10-10)

Scope: propertytaxpartners.co.uk, ~888 indexable pages, ~387 indexed. Section 24 folder: 11 of 16 are "Crawled - currently not indexed" (CCNI), last crawled late May 2026, not recrawled since even after October edits. Pages crawled in Sep/Oct are indexed; pages last crawled in May/Jul mostly are not. Bing ranks many of the unindexed pages top 3.

Tags: **[G]** = Google's own docs or staff statements. **[3P]** = third parties. **(verified)** = fetched and read this session. **(secondary)** = known only from reporting or memory, so check before quoting. Research only: this note does not recommend collapsing any page (house rule: collapsing needs an opt-in, measured trial).

---

## Bottom line

1. **CCNI is a decision Google made after reading the page, not a crawl failure.** Google says that when many pages are unindexed with no technical cause, the usual reason is site-wide quality concern. Resubmitting does not change that decision. A recrawl only helps if the page Google fetches is materially better than the one it judged.
2. **Our pattern fits two causes at once: (A) Google is still judging the May versions, and (C) a quality signal at cluster or site level.** The October edits have not been seen, because Google has not crawled those URLs since May. Crawl rate is partly a sign of how much Google values a page. So the fact that these pages are not being recrawled is itself a hint of low perceived value.
3. **Google's documentation leans against deleting.** "Deleting content is a last resort." Its pattern is improve first, then combine, then noindex or delete. The rule that what is indexed drives site quality is the main argument for noindex over deletion if a trial is ever run.

---

## 1. What CCNI means, and how Google re-evaluates

- **[G] (verified)** Page Indexing report help: "The page was crawled by Google but not indexed. It may or may not be indexed in the future; no need to resubmit this URL for crawling." The same page says you can reduce indexing lag by requesting indexing, and that "Indexing is never instant." https://support.google.com/webmasters/answer/7440203 (live page, read 2026-10-10)
- **[G] (verified via SERoundtable, 2026-07-16)** Search Off the Record, "How to Read the Indexing Report", from about 20:32. Splitt: CCNI "means we visited them and we didn't put them in the index." Asked whether CCNI is a quality sign, Mueller said "Sometimes," and added: "if our systems are seriously worried about the quality of a website" they index fewer pages. His fix when many pages are unindexed with no technical cause: "you almost need to take a step back and think about the quality overall," looking at the site "with the eyes of someone who is not directly involved." He also said "it's not just the text" (layout and user experience count). Episode: https://search-off-the-record.libsyn.com/how-to-read-the-indexing-report. Coverage: https://seroundtable.com/google-crawled-not-indexed-quality-ai-content-41701.html and https://searchenginejournal.com/google-explains-seo-connection-of-site-quality-to-non-indexed-pages/582683 (SEJ, 2026-07-17)
- **[G] (secondary)** Mueller, 2021 (relayed by SEJ and others): CCNI is usually "more site-wide rather than an issue with that page." The fix is to convince Google that indexing more of the site is worthwhile. https://www.searchenginejournal.com/googles-mueller-offers-two-tips-for-getting-indexed/
- **[G] (secondary)** Mueller has said "our quality algorithms do look at the website overall, so they do look at everything that's indexed." This is why noindexed pages may not count toward site quality. https://www.internetmarketingninjas.com/google/can-low-quality-content-de-rank-your-high-quality-content-in-google/

**Is CCNI judged per page or per site? Both.** The decision is recorded against each URL. But Google's own staff say the threshold a page has to clear moves with how Google rates the site overall.

**Does it need a recrawl?** Yes. Google can only re-judge content it has fetched, and our October edits have not been fetched (last crawl was May). Requesting indexing gets the page recrawled. It does not override a quality decision, so use it as a test (see section 6 below), not as a fix.

**dateModified and sitemap `lastmod`**
- **[G] (verified)** Sitemaps doc: Google uses `lastmod` only if it is "consistently and verifiably" accurate. `lastmod` should mark the "last significant update", meaning a change to main content, structured data or links. A copyright-date change does not count. https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (updated 2026-07-08)
- **[G] (verified)** Helpful content self-check: "Are you changing the date of pages to make them seem fresh when the content has not substantially changed?" https://developers.google.com/search/docs/fundamentals/creating-helpful-content (updated 2026-10-05)
- **Verdict:** accurate `lastmod` helps get pages recrawled. Inflated dates teach Google to ignore our `lastmod` across the whole site. We have found no evidence that `lastmod` affects whether a page gets indexed.

---

## 2. Many overlapping pages on one topic

**What the policy says**
- **[G] (verified)** Spam policies, scaled content abuse: "when many pages are generated for the primary purpose of manipulating search rankings ... typically focused on creating large amounts of unoriginal content" that gives users little value, "no matter how it's created." https://developers.google.com/search/docs/essentials/spam-policies#scaled-content (updated 2026-08-28). Site reputation abuse covers third-party content placed on a host site. It does not apply to us.
- **[G] (verified)** The helpful content questions include "producing lots of content on many different topics in hopes that some of it might perform well" and "mainly summarizing what others have to say without adding much value." Same URL as above.

**Does weak content drag down the whole site?**
- **[G] (secondary, 2022-08)** The original helpful content update said: "Any content ... on sites determined to have relatively high amounts of unhelpful content overall is less likely to perform well." https://developers.google.com/search/blog/2022/08/helpful-content-update
- **[G] (secondary, 2024-03-05)** In March 2024 that system became part of core ranking, and Google said it now "uses a variety of signals." https://developers.google.com/search/blog/2024/03/core-update-spam-policies
- **[G] (secondary)** Mueller, January 2022: "if you have significant portions that are low quality, then that can drag down your ... higher quality content." Relayed in https://www.gsqi.com/marketing-blog/remove-versus-improve-low-quality-thin-content/

**What Google recommends doing**
- **[G] (verified)** Core updates doc: "Deleting content is a last resort." It adds that if you are "considering deleting entire sections of your site, that's likely a sign those sections were created for search engines first." Assess "your site as a whole." Recovery "could take several months" and may wait for the next core update. https://developers.google.com/search/docs/appearance/core-updates (updated 2025-12-10)

**Google statements against deletion or consolidation**
- **[G] (secondary, 2023-08-08)** Search Liaison (Danny Sullivan), on CNET deleting thousands of pages: deleting old content because "Google doesn't like old content" is "not a thing", and Google's guidance does not encourage it. https://searchengineland.com/google-warns-against-content-pruning-as-cnet-deletes-thousands-of-pages-430509
- **[G] (secondary)** Mueller in office hours: removing pages does not automatically make the remaining pages perform better. It is easy to drop pages that are useful but rarely visited. Recovery after a large pruning took "a couple of months, maybe a half a year." https://www.searchenginejournal.com/google-right-way-to-remove-content (and gsqi link above)

**Evidence quality:** whether consolidating helps the rest of a site is contested and anecdotal. Google has published no controlled data. This supports the house rule: an opt-in, measured trial before any collapse.

---

## 3. Crawl budget and crawl demand

- **[G] (verified)** The crawl budget guide is for sites with over 1M pages, or over 10k pages that change daily, or with many "Discovered - currently not indexed" URLs. At ~888 pages we are not limited by crawl capacity. Crawl demand depends on how many URLs Google knows about, popularity ("URLs that are more popular on the Internet tend to be crawled more often"), staleness, and "page quality, and relevance", plus "overall user value, content uniqueness." https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget (updated 2026-07-22)
- **[G] (secondary, 2024-03-14)** Illyes on Search Off the Record: "As soon as we get the signals back from search indexing that the quality of the content has increased across this many URLs, we would just start turning up demand." https://searchenginejournal.com/google-confirms-high-quality-content-is-crawled-more-often/511202
- **[3P] (secondary, 2025)** Indexing Insight (a tool vendor): 1.4M pages across 18 sites. Pages not recrawled within about 130 to 190 days tend to drop out of the index or lose crawl priority. https://indexinginsight.substack.com/p/new-study-the-130-day-indexing-rule. Google has not confirmed this. Our May-crawled pages are about 135 days old now, so we are inside that window.
- **Verdict:** at our size, how often Google crawls a page is mainly a sign of how much it values the page. Levers that raise crawl demand: internal links from pages that already get crawled and indexed, external links and mentions, accurate `lastmod`, and real updates.

---

## 4. AI-assisted content

- **[G] (secondary, 2023-02-08)** "Appropriate use of AI or automation is not against our guidelines." Google rewards quality "however it is produced." Using AI mainly to manipulate rankings is spam. https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- **[G] (verified)** The generative AI guidance says generating many pages without added value may count as scaled content abuse. Models "predict a likely sequence of words," so facts need checking by a person. The rater guidelines flag "little to no effort, little to no originality, and little to no added value." Explaining how content was made is suggested where readers would expect it. https://developers.google.com/search/docs/fundamentals/using-gen-ai-content (updated 2026-10-01)
- **[G] (verified via SERoundtable, 2026-07-16)** Mueller: "not ... all AI-generated content is bad." The problem is generic pages where "Anyone could have written this. This tells me nothing."
- **Signals Google describes as unoriginal:** summarising others without adding anything, mass production, no first-hand experience, dates changed without real changes, and many near-identical pages.

---

## 5. Why Bing ranks pages Google will not index

- **[3P]** Bing and Google run separate crawlers, indexes and quality systems. Neither publishes a comparison. Onely sampled WordPress sites and found Bing indexed more posts than Google, though the sample was small. https://www.onely.com/blog/bing-vs-google-which-search-engine-indexes-more-content/
- **[3P]** Bing also filters on quality before indexing (Fabrice Canel). https://searchengineland.com/bing-considers-page-quality-before-indexing-339818. Bing supports IndexNow push submission. Google does not use IndexNow.
- **Evidence quality:** thin. No document from either engine explains this gap. A Bing ranking shows the page is relevant and technically fetchable. It does not show the page would pass Google's quality bar.

---

## 6. Diagnostic tests

| # | Test | Result, and which cause it points to |
|---|------|------------------------|
| 1 | Run URL Inspection Live Test on the 11 Section 24 pages | Fetch blocked, noindex, wrong canonical, soft 404, or render shows missing content: **D (technical)**. All clean: rules out D. |
| 2 | Compare Google's chosen canonical with ours, and check for near-duplicate pages in the cluster | Google picks a sibling page as canonical, or files the page under "Duplicate": **C (cluster overlap)**, not A. |
| 3 | Request indexing on a small, matched set of edited pages (e.g. 3 edited, 3 unedited controls). Watch 2 to 4 weeks. | Edited pages get indexed, controls do not: **A (stale judgment)**. All stay CCNI after a confirmed new crawl date: **B or C**. |
| 4 | After test 3, compare the pages that flipped with those that stayed | Only the most distinctive pages (original worked examples, unique angle) get indexed: **B (page-level value)**. Even strong rewrites stay CCNI while unrelated new pages on the site do get indexed: **C (cluster or site signal)**. |
| 5 | Plot indexing rate by folder and by publish wave, crawl date held constant | Low indexing confined to one folder or one wave: **C (cluster or wave)**. Low everywhere for pages crawled in the same period: site-level **C**, or **A** if pages recrawled recently are indexed. |
| 6 | Add internal links from pages that already get crawled and indexed, plus an accurate `lastmod`. Do not request indexing. | Googlebot returns on its own and the pages index: **A**, with low crawl demand as the bottleneck. Googlebot returns and the pages still are not indexed: **B or C**. Googlebot does not return: low perceived value (**C**), i.e. low crawl demand. |
| 7 | Check server logs and the Crawl Stats report for 5xx errors, timeouts, or robots.txt fetch failures in May to July | Errors cluster on the dates that matter: **D**. |

Tests 3, 4 and 6 are small and can be undone. None of them collapses, deletes or noindexes a page.
