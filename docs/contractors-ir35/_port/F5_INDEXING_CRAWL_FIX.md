# F5 - indexing and crawl fixes (contractors-ir35/web)

Date: 2026-09-12. Live defects, not design work. Nothing staged, nothing committed, nothing deployed.

## Changes

| file:line | before | after | root cause | proof |
|---|---|---|---|---|
| `src/lib/resources/content.ts:31` (GuideFrontmatter) | no `noindex` field | `noindex?: boolean` | the guide frontmatter type never modelled the flag, so gray-matter parsed it and the loader threw it away | `npx tsc --noEmit` clean |
| `src/lib/resources/content.ts:72` (getGuideByTopic return) | frontmatter returned without `noindex` | `noindex: fm.noindex === true` | shared read path dropped the flag, so no consumer could honour it | `curl -sL localhost:3699/resources/ir35 \| grep '<meta name="robots"'` |
| `src/lib/resources/content.ts:85-95` | only `publishedGuideTopicsWithFile()` | added `indexableGuideTopics()` = published topics minus `noindex: true` | sitemap had no flag-aware topic list; a guard in the shared read path covers every future caller | `curl -sL localhost:3699/sitemap.xml \| grep -c resources/` -> `0` |
| `src/app/sitemap.ts:8,81` | `publishedGuideTopicsWithFile()` built the resource rows | `indexableGuideTopics()` | sitemap built from "published + file exists", never from the index flag | `curl -sL localhost:3699/sitemap.xml \| grep -c "<loc>"` -> 154 (was 157, the 3 noindex guides removed) |
| `src/app/resources/[topic]/page.tsx:43` | `generateMetadata` returned title/description/canonical only | adds `robots: { index: false, follow: true }` when `frontmatter.noindex` | route emitted no robots meta at all | `curl -sL localhost:3699/resources/ir35` -> `<meta name="robots" content="noindex, follow"/>` |
| `src/app/glossary/[slug]/data.ts:27` | `<a href="/blog/ir35-basics">IR35 basics</a> guides` | `<a href="/blog/ir35-status/what-is-ir35">IR35 basics</a> guide` | link written against an assumed slug; real article is `what-is-ir35` in category `IR35 status` (resolved from `content/blog/what-is-ir35.md` frontmatter) | `curl -s -o /dev/null -w "%{http_code}" -L localhost:3699/blog/ir35-status/what-is-ir35` -> 200 |
| `src/components/blog/BlogListWithSearch.tsx:27-28, 66-78, 172-196` | `currentPage` state + `postsPerPage = 12` slice + Previous/Next buttons (no page-N hrefs) | full `filteredAndSortedPosts` rendered; pagination state and nav deleted; search + sort + read-time untouched | client-side slice meant only 12 of 62 article hrefs existed in server HTML | `curl -sL localhost:3699/blog \| grep -oE 'href="/blog/[a-z0-9-]+/[a-z0-9-]+"' \| sort -u \| wc -l` -> 62; `ls content/blog/*.md \| wc -l` -> 62 |

Post-change link-floor sweep: all 157 routes in `docs/contractors-ir35/_port/sweep_baseline.json` re-fetched, unique internal href count compared against baseline. **0 regressions.**

`npx vitest run src/lib/resources/resources.test.ts src/lib/blog.test.ts` -> 75 passed. `npm run build` succeeds.

## Reported, not fixed

- `src/config/lead-nurture.ts:96-97` - `/calculators/umbrella-vs-limited` and `/calculators/ir35-take-home` are dead paths, but both lines are **commented out** inside an empty `CALC_MAP` seed with an existing `ponytail:` note. Not live links. Correct slugs if they are ever wired: `umbrella-vs-limited-calculator`, `inside-ir35-take-home-calculator` / `outside-ir35-take-home-calculator`.
- `packages/web-shared/` untouched (18 sites). Nothing in it needed changing for these defects; the only `noindex` there is the console's own metadata helper, which works.
- `src/components/calculators/premium/PremiumBarChart.tsx` showed a transient unbalanced-JSX tsc error mid-session (another agent's in-flight edit). It compiled by build time. Not mine, not touched.
- No other content type in this site carries a `noindex` flag: blog frontmatter keys across all 62 posts are title/slug/date/updatedDate/author/image/altText/imageCredit/category/metaTitle/metaDescription/summary/keyTakeaways/sourcesVerifiedAt/schema/faqs - all consumed by `parsePostFile`. Resource frontmatter is title/slug/summary/version/lastReviewed/noindex; `slug` is the one field read nowhere (the topic comes from the filename), harmless and left alone.

## Consequence of honouring the flag

The three guides (`/resources/ir35`, `/resources/pay-planning`, `/resources/structure`) are now `noindex, follow` and out of the sitemap. They remain built, served and linked internally - `dynamicParams = false` still prerenders them from `publishedGuideTopicsWithFile()`, so no 404s and no internal-link loss. Whether they *should* be noindex is an owner decision; the frontmatter says so and the site now obeys it.
