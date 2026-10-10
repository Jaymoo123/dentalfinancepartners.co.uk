# Why Google indexes 379 of 887 Property pages (investigation 2026-10-10)

Sources in this folder: INDEX_STATE.csv + INDEX_FINDINGS.md (all 887 routes inspected 2026-10-10),
HISTORY_FINDINGS.md (git/deploy history), GOOGLE_GUIDANCE.md (Google statements, sourced),
VERCEL_CRAWL_LOG.md (30 days of crawler requests), plus the 2026-09-26 full inspection sweep in Supabase
gsc_url_inspection. Nothing on the site was changed.

## What the data shows
1. Index state follows Google's last read, not page content.
   - Last crawled Apr-Jun: 2 of 213 indexed. July: 37 of 287. Aug-Oct: 340 of 360.
   - Mar-May posts never substantively edited: last read by July 5 of 251 indexed; read again Aug-Oct 58 of 62.
   - Posts published Jul-Sep and read Aug-Oct: 104 of 104 indexed.
2. The index is churning toward recently read pages. 26 Sep to 10 Oct: 58 dropped out (48 last read May/July),
   39 came in (38 read Sep/Oct, 32 of them had been "crawled, not indexed" on 26 Sep).
3. Google reads very few of our pages. 30 days of Vercel data: Googlebot 3,356 requests (about half robots.txt and
   JS/CSS) vs Bingbot 15,631. No errors, no blocks. Googlebot fetched the three rewritten service pages 0 times in
   30 days, although Search Console's test tool (indexing requests) fetched them 4-8 times each.
4. No technical fault separates indexed from not indexed: canonicals self-referencing, no noindex, valid JSON-LD,
   no near-duplicates (max 5-gram overlap 7.4%).

## Likely history (dated, from git and deploys)
- 1-2 Apr: every post briefly carried a cross-domain canonical (accountsforproperty.co.uk), fixed in a day.
- 17-28 May: production went from 252 to 697 posts in 11 days (418 posts in the 22-28 May waves, 14-28% indexed today).
- Until 28 Sep: sitemap lastmod was the publish date for posts and "now" for hubs/static pages on every build.
- 9 Oct (live): 60 posts carry dateModified 2026-10-09 (so sitemap lastmod 9 Oct) for a link-only insertion,
  because CI requires dateModified to move on any edit. Google asks lastmod to reflect significant changes only.

## What is NOT known
- Why Google's appetite to recrawl is low. Google's staff say crawl frequency follows perceived site value; the
  May flood is the most likely trigger, but there is no way to prove it from outside Google.
- Whether a recrawl causes indexing or Google recrawls pages it already rates (selection). Evidence 1 (same
  unedited content, opposite outcome by read date) and the 32 rejected-then-accepted pages favour "a fresh read
  decides", but this is observational.
- Why Search Console still shows a 29 May crawl for the Section 24 guide Googlebot fetched twice in w/c 21 Sep.

## Implication
Rewriting pages to "differentiate" them is not supported by this data: 342 of the 478 unindexed pages were read
on near-current content, and identical content flips to indexed when Google reads it again. The lever is getting
Googlebot to read pages again, using only signals Google documents: truthful sitemap lastmod, internal links from
pages Google reads often, and genuine updates where a page is actually weak.
