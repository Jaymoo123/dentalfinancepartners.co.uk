# Section 24 indexing: what Google saw, and what changed on the site (history findings)

Read-only investigation, 2026-10-10. Nothing committed, nothing edited, nothing deployed. Scratch work lived in the session scratchpad.

Sources: git history (full, from 2026-03-27), Vercel production deploy list (project `property-tax-partners`), Supabase `gsc_url_inspection` (the 2026-09-26 sweep, 823 blog URLs), `docs/property/link_engine/2026-10-10/stages/03c_url_inspection.csv` (the 2026-10-10 inspection), `docs/property/_archive/STATE_HISTORY_2026-06_to_2026-10.md`, `docs/property/_archive/NETNEW_PROGRAM.md`.

Method note. "Version live at lastCrawlTime" = the file at the SHA of the last Vercel production deployment created before the crawl (deploy list below), cross-checked against the last commit touching the file before the crawl. For every page where both were available they were byte-identical, so the reconstruction does not depend on deploy-lag assumptions. Word counts strip HTML tags and are my own count (they differ by 1 to 3 percent from the `words` field in the querydata file).

Repo state note. The clone was shallow (143 commits from 2026-09-29) when I started. It was full (3,486 commits from 2026-03-27) by the time I needed history. My own `git fetch --unshallow` reported a lock held by another git process, so I did not complete it myself; I did not touch the repo further.

---

## 0. Corrections to the brief

1. Not all 11 not-indexed pages were last crawled on 05-28/29. Exact lastCrawlTime (UTC):
   - 05-28/29: 7 pages (guide 05-29 06:43, tax-credit 05-28 14:50, mortgage-restriction 05-29 00:02, interest-only 05-28 16:40, complete-guide 05-29 19:14, deductible-2026 05-29 20:01, tax-relief-guide 05-29 21:56).
   - 05-15: 2 pages (joint-ownership 18:58, multiple-properties 18:57).
   - July: 2 pages (remortgaging 07-03 11:47, basic-rate 07-19 08:57). Both of these were crawled after the rewrite and are still not indexed.
2. "Pages crawled in May are not indexed" is only half true as of 2026-10-10 and was not true on 2026-09-26. See section 4 (the 14-day flip).
3. The 2026-10-09 commits on these pages are one-line changes (a `dateModified` bump and, on some, a service-page link). The title and meta rewrite on the guide (`metaTitle_prev` kept) was commit `a1c670a1` on 2026-05-31, not 2026-10-09.

---

## 1. Dated event timeline, March to October 2026

Deploy facts come from the Vercel production list. The project had git integration through at least 2026-07 (every push to the connected branch deployed); STATE.md now says there is none. Hashes are short SHAs.

### 1a. Launch, domain and canonical (Mar 29 to Apr 16)

| Date | Event | Evidence |
|---|---|---|
| 03-29 | Site launched with 17 articles; first blog files added (89 file adds that day) | `f0a61086` |
| 03-29/30 | Domain `propertytaxpartners.co.uk` attached to the Vercel project (apex 03-29 17:50 UTC, www 03-30 10:46 UTC) | Vercel domain `createdAt` |
| 04-01 | Blog restructured from flat `/blog/<slug>` to nested `/blog/<category>/<slug>`; 167 canonicals rewritten; 301 map `SLUG_TO_CATEGORY_MAP` created. The rewritten canonicals pointed at a different domain, `accountsforproperty.co.uk`, on all 167 posts | `4cb3d404`, its own audit text says "ALL 167 posts ... DIFFERENT DOMAIN" |
| 04-01 17:51 to 04-02 03:06 UTC | Googlebot fetched pages while they carried that cross-domain canonical (Google still chose the propertytaxpartners URL as its canonical). Four URLs still show the stale declared canonical in `gsc_url_inspection` because they have not been re-fetched since | `gsc_url_inspection` rows for `/blog/capital-gains-tax` (04-02), `capital-gains-tax-property-sale-uk-2026`, `when-to-incorporate-property-portfolio-timing`, `landlord-insurance-tax-deductible-what-can-you-claim` (04-01) |
| 04-02 | Canonicals corrected to www propertytaxpartners (`b80225e5`, which also deleted 82 posts as consolidation); llms.txt and AI-crawler rules added to robots (`085b5290`) | git |
| 04-03 | Redirect-chain and middleware-mismatch fixes (`ed97f5d5`) | git |
| 04-10 | +148 posts and 2 new category hubs (`5422c5e8`, 170 file adds that day); this is the April batch the Section 24 guides come from | git |
| 04-11 | "Deduplicate 241 posts" pass (`80d51206`, DeepSeek-run consolidation per its own message). Corpus 252 posts | git |
| 04-16 19:49 UTC | `18a41cb4`: hreflang (en-GB, x-default, self-referencing) added to layout, posts, sitemap; `Content-Language` header; 8 flat-link fixes. Deployed. This is the last production deploy before 05-17 in the Vercel list | git, Vercel |

Of the 20 pages in this investigation, 5 existed at the 04-01 cross-domain-canonical moment (3 not indexed: mortgage-restriction, complete-guide, basic-rate; 2 indexed: higher-rate-2026, repeal-future-reversed). The other 15 were added 04-10 and never carried the wrong canonical. So this does not separate indexed from not indexed.

### 1b. The May publishing surge (the window Google crawled in)

Production corpus size by deploy (blog files in `Property/web/content/blog` at the deployed SHA):

| Deploy (UTC) | SHA | Posts live | Note |
|---|---|---|---|
| 04-16 19:49 | `18a41cb4` | 252 | |
| 05-17 15:04 | `d8e5ba9d` | 252 | shadcn foundation, accordion FAQ, bot allowlist, IndexNow |
| 05-18 | `e25afa91` | 259 | +7 posts, 23 meta titles/descriptions rewritten (`08d47d53`) |
| 05-20 12:25 / 05-21 20:52 | `5beaa771` / `5fe375d5` | 289 | web-shared workspace migration; cannibalisation cleanup and redirects (`e4cecef7`, 4 posts deleted) |
| 05-23 00:25 | `d44ae1bd` | 376 | +87 |
| 05-26 21:41 (22:43 BST per NETNEW) | `11a78b4d` | 577 | +201 in one deploy ("~209 net-new in one batch"); IndexNow submitted full sitemap, 602 URLs (Bing/Yandex family, not Google) |
| 05-27/28 | none | | MW2 + MW3 (120 posts) committed but Vercel blocked the deploy: ISR fallback 20.71 MB over the 19.07 MB limit (message of `c05f38f0`) |
| 05-28 23:23 | `c05f38f0` | 697 | `dynamicParams = false` set to unblock the build; IndexNow for 120 URLs |

So production went 252 to 697 posts (+445, +177 percent) between 05-17 and 05-28, in four increments over 11 days. Git file adds by day: 05-18 7, 05-19 3, 05-20 27, 05-22 87, 05-23 93, 05-24 28, 05-25 38, 05-26 52, 05-27 60, 05-28 60.

The Section 24 pages were crawled at 05-15 (before the surge, 252-post site), 05-28 14:50 and 16:40 (after the 05-26 batch, before the 120 more), and 05-29 00:02 to 21:56 (inside the busiest deploy day of the period):

| 05-29 deploy (UTC) | SHA | What |
|---|---|---|
| 00:18 BST (05-28 23:23 UTC) | `c05f38f0` | dynamicParams=false; wrong-category URLs now 404 instead of 308 |
| 10:19 | `7da4a764` | blog lead capture (inline mini-form, exit-intent, sticky CTA) |
| 12:06 / 12:42 | `6f8137c3` / `d8301db3` | Track 2 tooling; strip leaked tool-call markup (`</content>`, `</invoke>`) from 33 live posts (none of the 20 pages here) |
| 13:44 / 13:59 | `27ec789e` / `7eb620c8` | 26 long-tail city page refreshes |
| 15:47 | `dfb3d277` | factual fixes: April-2027 framing was "backwards" on 6 city pages, statute cites, 404 links |
| 18:11 | `4ca1f97e` | April-2027 framing sweep, 28 pages (touches tax-credit, deductible, tax-relief-guide here, one line each) |
| 19:35 | `f4f6d977` | fix 247 broken internal links (229 HARD) across 120 files |
| 23:35 | `c151126b` | batch 3: 4 rewrites + 1 collapse (301) |

Eight production deploys in about 13 hours. The 05-30 and 05-31 state: `c17d3601` 05-30, `a1c670a1` 05-31 13:14 (the Section 24 batch A rewrite).

### 1c. Rewrites, byline and housekeeping (May 31 to Aug 4)

| Date | Event | Evidence |
|---|---|---|
| 05-24, 05-29/30 | Redirect bundles: 6 CGT posts 301'd to canonicals (05-24, `39053e7a`, `e2bd08f2`); 8 CityService duplicates merged into 2 (`6e85f71c`, 05-29); 10 collapses reversed before deploy under the rewrite-only rule (`9bf06b16`, 05-30) | git |
| 05-31 13:14 UTC | Section 24 batch A: 12 ranking-grade rewrites deployed (`a1c670a1`): guide, how-to-calculate, basic-rate, higher-rate-2026, interest-only, joint, multiple, commercial and 4 others. Added `reviewedBy: ICAEW Qualified Senior Reviewer`, `reviewerCredentials: Chartered Tax Adviser (CTA)` | git, Vercel |
| 06-01/02 | Complete-guide (`beb2db89`), then final residual 10 incl. tax-credit, mortgage-restriction, deductible, tax-relief-guide (`90e33892`); deploy 06-02 up to 20:15 UTC (`65b81650`). Consent checkbox on all lead forms (`eb75b70b`) | git, Vercel |
| 06-05 20:06 UTC | Vercel config for the apex domain updated to 308 to www (domain `updatedAt`). Whether the apex redirect existed before this date is not shown anywhere I could read | Vercel |
| 06-06/07 | Premium tool/gate module on category pages deployed then disabled (`5cd99deb`); 91 humanise-rewritten posts merged and IndexNow'd (STATE 0.07) | Vercel, STATE |
| 06-23 21:20 UTC | Credential sweep on 518 posts: unsubstantiated "ICAEW Qualified Senior Reviewer" and "Chartered ... (ACA/CTA)" replaced by "Property Tax Partners Editorial Team" / "Reviewed against legislation.gov.uk and HMRC guidance"; deployed from the working tree (`cdf893f2`) | git |
| 06-25 | RSS feed and autodiscovery (`bc5dd593`) | git |
| 07-09 14:24 UTC | Wave 10 (11 posts) and back-links (`b3754948`) | git |
| 07-19 | Middleware: wrong-category nested URLs 301 to the right category again (`2cf1bc2f`). From 05-28 23:23 to 07-19 they returned 404 | git |
| 07-26 | SEO audit remediation: 162 meta descriptions trimmed, 134 external links noopener'd, 5 self-referential `/locations` 301s removed (`c218d7a6`) | git |
| 07-30, 08-03 | 15 specialist-tax posts (`3879b002`); 34 posts + 5 calculators (`747e1008`); FA 2026 year-transition sweep, 28 pages (`b4e0bbdb`) | git |

### 1d. Aug 5 and after

| Date | Event | Evidence |
|---|---|---|
| 08-05 14:48 BST | Middleware 308 for every non-www host to www, matcher widened to the whole site; `noindex` frontmatter support plus 3 careers posts noindexed (`c31b02d7`). The commit text says GSC had shown both hosts serving the same pages (example: `/locations/leeds` 805 impressions on www, 140 on non-www) | git |
| 08-05 15:10 BST | Commercial money tier: 7 new pages (`/services/*`, `/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`), 5 city posts deleted and 301'd to `/locations/*` pages that had themselves been 301 sources since 04-10, 3 head-term titles demoted (`bbfe0437`). Apex-only host redirect scoping (`0107a8b8`). `/section-24` was fetched by Google at 15:48 UTC that day and is indexed | git, `gsc_url_inspection` |
| 08-15 | `robots.ts`: only the Yandex-only `host:` line removed (`d8b8b118`). Consent-wording incident 08-15 to 08-24 | git, STATE |
| 08-17 to 08-21 | SDLT batch (7), Bing experiments (20 pages, `06195d7d`), CGT batch (11), Wave 11 (19), Wave 12 (13), rental, tools, landed-estates clusters; about 35 production deploys 08-19 to 08-21 (CLI deploys, no SHA in the list). Adds: 08-20 22 posts, 08-21 20 posts | git, Vercel |
| 08-22 | Middleware slug shadowing removed so `/blog/property-accountant-services` hub renders; it had been a 301 since it shipped (`0b397d08`) | git |
| 08-23 20:21 UTC | Designer redesign cutover (Tailwind classes only per STATE); 08-24 consent revert `435cc12e` | STATE |
| 09-02 | SPV programme: 23 posts, 5 deploys that day | git, Vercel |
| 09-16 | Estate release `90fbea9c` | STATE |
| 09-27/28 | `b226ff38`: sitemap `lastModified` rewritten (see 3c) and `dateModified` added to 694 posts by script (276 set to 2026-06-23, 187 to 07-26, 73 to 08-21 ...); deployed 09-28 | git |
| 10-09 | WP1 service pages (`eba68bdb`), 93 body links into them from 62 posts (`f47e3df5`) with `dateModified` bumps (`80ab0ab6`). One ERROR deploy at 12:31 UTC, then READY | git, Vercel |

No change to robots allow/disallow (only `/thank-you`), no sitewide `noindex`, and no `X-Robots-Tag` anywhere in the period (grep of `src` and `next.config.ts` at `c05f38f0`).

---

## 2. Per-page reconstruction (version live at lastCrawlTime vs today)

Index state is as of 2026-10-10 (the inspection CSV, or `gsc_url_inspection` where marked). "Live SHA" is the production deploy in force at the crawl. Em-dash residue = count in body plus frontmatter.

### 2a. The 11 not-indexed pages

| Page (slug) | Last crawl UTC | Live SHA | THEN: words / H2 / FAQ / tables / em-dash | THEN title and H1 | NOW: words / H2 / FAQ / tables | What changed since |
|---|---|---|---|---|---|---|
| finance-costs-section-24-complete-guide | 05-29 06:43 | `c05f38f0` | 1,120 / 5 / 4 / 0 / 5 | "Finance Costs Section 24: What Counts? UK Guide 2025" / "...Complete UK Guide 2025" | 2,078 / 8 / 12 / 2 | Substantive 05-31 (`a1c670a1`, +197/-70, deployed 05-31 13:14). Then frontmatter-only (06-23), dateModified (09-27), link plus date bump (10-09) |
| section-24-tax-credit-20-percent-basic-rate-relief | 05-28 14:50 | `11a78b4d` | 1,072 / 8 / 4 / 0 / 0 | "Section 24 Tax Credit 20%: How Basic Rate Relief Works 2026" | 2,037 / 8 / 15 / 1 | Substantive 06-02 (`90e33892`, +128/-117). One-line 2027 sweep 05-29 18:11 (after the crawl). Then cosmetic |
| section-24-mortgage-interest-restriction-uk-landlords | 05-29 00:02 | `c05f38f0` | 1,442 / 10 / 8 / 0 / 0 | "Section 24 Mortgage Interest Restriction \| UK Guide"; has a "Section 24 Rules for 2025/26 Tax Year" section | 2,625 / 12 / 14 / 2 | Substantive 06-02 (`90e33892`, +124/-89). Then cosmetic |
| mortgage-interest-deductible-landlords-uk-2026 | 05-29 20:01 | `f4f6d977` | 989 / 7 / 4 / 0 / 0 | "Mortgage Interest Deductible UK Landlords 2026 \| Tax Rules" | 2,382 / 11 / 12 / 2 | Substantive 06-02 (+144/-79). Then cosmetic |
| tax-relief-mortgage-interest-rented-property-guide | 05-29 21:56 | `f4f6d977` | 1,176 / 7 / 4 / 0 / 0 | "Tax Relief Mortgage Interest Rented Property UK 2026 Guide" | 1,564 / 7 / 12 / 1 | Substantive 06-02 (+104/-116). Then cosmetic |
| section-24-tax-relief-complete-guide | 05-29 19:14 | `4ca1f97e` | 754 / 8 / 4 / 0 / 0 | "Section 24 Tax Relief Guide: What UK Landlords Need to Know" | 2,189 / 12 / 14 / 1 | Substantive 06-01 (`beb2db89`, +147/-49). Then cosmetic |
| section-24-interest-only-mortgage-tax-planning | 05-28 16:40 | `11a78b4d` | 931 / 7 / 4 / 0 / 0 | "Section 24 Interest Only Mortgage: Tax Planning Guide 2026" | 2,146 / 10 / 12 / 3 | Substantive 05-31 (+248/-117). 08-21 class fix (26 lines, cosmetic). Then cosmetic |
| section-24-joint-property-ownership-tax-split | 05-15 18:58 | `18a41cb4` | 1,227 / 8 / 4 / 0 / 1 | "Section 24 Joint Ownership: How Tax Is Split" | 2,739 / 9 / 12 / 1 | Wave 5 edit 05-23 (+15/-13), substantive 05-31 (+125/-73), 08-21 class fix |
| section-24-multiple-properties-cumulative-impact | 05-15 18:57 | `18a41cb4` | 1,115 / 7 / 4 / 0 / 4 | "Section 24 Multiple Properties: Cumulative Impact Guide" | 1,990 / 8 / 12 / 2 | Substantive 05-31 (+137/-88), 08-21 class fix |
| section-24-basic-rate-taxpayers | 07-19 08:57 | `1d68a570` | 2,675 / 12 / 12 / 2 / 0 | "Section 24 and Basic Rate Taxpayers: Are You Affected?" | identical | Only `dateModified` changed (09-27). Crawled after the rewrite |
| section-24-remortgaging-btl-property-tax-implications | 07-03 11:47 | `f2986c34` | 2,164 / 9 / 12 / 5 / 0 | "Section 24 & Remortgaging a BTL: Tax Implications" | identical | Only `dateModified` changed. Crawled after the rewrite |

Defects in the May versions (none of the 9 May-crawled pages had placeholder text, broken markdown, duplicated sections, leaked tool-call markup, or unfinished FAQs; duplicate-sentence and duplicate-H2 scans were zero; all internal body links resolved):
- Wrong or stale year in title/H1: guide ("UK Guide 2025", in a 2026 title), mortgage-restriction (a "2025/26 Tax Year" section), deductible-2026 and tax-relief-guide (H1 or title carry a year; fine for 2026).
- Factual position since corrected: the guide said "The restriction remains at 20% regardless of the new property income tax rates" (house position now: the reducer rises to 22% from 2027/28, per commit `dfb3d277`). Similar "credit stays at 20%" framing was found and fixed on 6 city pages that day. Not checked line by line on the other pages.
- Em-dash residue: guide 5, multiple-properties 4, joint 1 (the rule against them is newer; this is a style tell, not a technical defect).
- No byline fields: 13 frontmatter keys, no `reviewedAt`, `reviewedBy`, `dateModified`. 322 of 697 posts live at `c05f38f0` also lacked `reviewedAt`.
- Generic H2 pattern ("Understanding Section 24 and ...", "Strategic Options to Mitigate Section 24", "Long-Term Strategy and Portfolio Planning") and a generic closing paragraph, no CTA.

Template shape. All 9 May-crawled not-indexed pages are April-batch posts (added 04-10, or 03-29/04-01 for mortgage-restriction and complete-guide, all re-processed by the 04-11 dedupe). The batch template is 13 frontmatter keys and exactly 4 FAQs: at `18a41cb4` that was 213 of 252 posts with 4 FAQs and 252 of 252 with 13 keys; at `c05f38f0` it was still 183 posts with 4 FAQs and 260 with 13 keys, while the median post (the net-new waves) was 2,518 words. These pages were the short end of the corpus (754 to 1,442 words vs median 2,518).

### 2b. Similarity to siblings at the time

Computed on the section-24 folder as it stood at each page's live SHA (48 posts at `c05f38f0`). TF-IDF cosine on body text; title overlap = Jaccard of title+H1 tokens; H2 overlap = Jaccard of H2 text; 5-gram = shared 5-word shingles over the smaller page.

| Page | Max cosine (to) | Max title+H1 overlap | Max H2 overlap | Max 5-gram overlap |
|---|---|---|---|---|
| guide | 0.34 (tax-relief-guide) | 0.20 | 0.00 | 2.0% |
| tax-credit | 0.37 (section-24-calculator) | 0.31 | 0.07 | 4.0% |
| mortgage-restriction | 0.38 (higher-rate-2026) | 0.40 | 0.07 | 4.3% |
| deductible-2026 | 0.33 | 0.38 | 0.07 | 4.6% |
| tax-relief-guide | 0.35 | 0.38 | 0.08 | 7.4% |
| complete-guide | 0.35 | 0.31 | 0.08 | 7.4% |
| interest-only | 0.24 | 0.29 | 0.07 | 2.1% |
| joint | 0.24 | 0.31 | 0.08 | 2.9% |
| multiple | 0.20 | 0.31 | 0.00 | 2.9% |
| basic-rate (July) | 0.32 | 0.36 | 0.05 | 3.8% |
| remortgaging (July) | 0.35 (corpus 0.37) | 0.31 | 0.06 | 2.8% |

Nothing here is a near-duplicate. The top title+H1 overlaps (0.40 to 0.46) are between titles that share "Section 24 / mortgage interest / tax credit" vocabulary, which is what a cluster of this kind does. No template-level text duplication either: max 5-gram overlap 7.4 percent.

### 2c. The 6 indexed comparison pages (plus the hub), same treatment

| Page | Index state / last crawl (UTC) | Live SHA | THEN words / H2 / FAQ / tables | NOW words / FAQ / tables | Change since |
|---|---|---|---|---|---|
| section-24-higher-rate-taxpayers-2026 | indexed; 05-29 06:31 (May crawl) | `c05f38f0` | 736 / 6 / 4 / 0, 3 em-dashes, "2025/26 tax year" in the opener | 2,180 / 12 / 1 | Substantive 05-31 (+124/-71). Still not re-crawled since 05-29 |
| claim-mortgage-interest-rental-property-uk-section-24 | indexed; 10-04 (was 05-15, not indexed on 09-26) | `18a41cb4` (05-15) | 1,100 / 9 / 4 / 0 | 1,858 / 13 / 5 | 05-21 rewrite (+200/-110, `e4cecef7`), then 07-26, 09-27. Re-fetched 10-04 on the rewritten version and moved from not indexed to indexed |
| how-to-calculate-section-24-tax-credit-step-by-step | indexed; 07-11 09:28 | `bb220be7` | 1,909 / 9 / 13 / 3 | 1,909 / 13 / 3 | dateModified and a link only. Post-rewrite crawl |
| section-24-self-assessment-tax-return | indexed; 09-11 16:11 | CLI deploy (no SHA); last commit `06195d7d` 08-18 | 2,386 / 12 / 13 / 1 | 2,389 | Cosmetic only |
| mortgage-arrangement-fees-deductible-landlord | indexed; 10-02 19:48 (also 09-26 05:08) | CLI deploy; last commit `f116a9a2` | 2,069 / 10 / 12 / 1 | 2,069 | None |
| section-24-repeal-future-reversed | indexed; 09-25 00:35 | CLI deploy; last commit `cdf893f2` | 1,743 / 8 / 14 / 2 | 1,744 | Cosmetic only |
| section-24-commercial-property-complete-guide (other folder) | indexed; 07-26 01:37 | `fcb4d21f` | 2,370 / 11 / 13 / 2 | 2,373 | Cosmetic only |
| /section-24 (hub, `page.tsx`, new 08-05) | indexed; 08-05 15:48 | the 08-05 15:04 deploy | n/a | n/a | n/a |

What they look like against the May versions:
- 5 of 6 indexed blog comparators were crawled in July to October, i.e. after the 05-31/06-02 rewrites or after the 07-26 audit. Their crawled versions are the rewritten 1,700 to 2,400 word, 12 to 14 FAQ, byline-field versions.
- The one indexed page with a May crawl (higher-rate-2026) was a May-template page exactly like the not-indexed ones: 736 words, 4 FAQs, no byline, 3 em-dashes. It is the best single piece of evidence that the content shape of the May version did not decide indexing by itself.
- Similarity profile of indexed vs not indexed is the same range (max cosine 0.21 to 0.28 for the indexed comparators vs 0.20 to 0.38 for the not-indexed).

### 2d. The two refreshed guides (CGT gifting, tax on selling a rental)

| Page | Last crawl UTC | Live SHA | THEN words / H2 / FAQ / tables | NOW words / H2 / FAQ / tables | Change since |
|---|---|---|---|---|---|
| cgt-gifting-property-family-members-uk | 07-09 19:30 (`gsc_url_inspection`) | `b3754948` (07-09 14:24) | 2,320 / 13 / 13 / 3; title "CGT Gifting Property to Family UK 2026: Rules, Reliefs, Examples" | 4,562 / 19 / 21 / 4 | Substantive 10-10 (`220873b9`, +161/-51) plus 3 follow-up one-liners the same day. 07-26 and 07-28 meta trims |
| tax-sell-rental-property-uk | 07-03 13:39 | `f2986c34` (07-03 10:47) | 2,549 / 8 / 14 / 1 | 3,998 / 8 / 21 / 1 | Substantive 10-10 (+74/-23). 07-26 trim |

Both were fully written, byline-free (no `reviewedAt`), 2,300 to 2,500 word pages with 13 to 14 FAQs when crawled; neither is thin. They were crawled one week before the 07-09/07-10 period and have not been fetched since. Their not-indexed state is not explained by anything visible in the page text at the crawl.

---

## 3. Technical signals the built pages could have sent

All facts below are from the code at the live SHAs (`18a41cb4`, `11a78b4d`, `c05f38f0`); none was observed on a live response, because I did not fetch the site. Marked where that matters.

### 3a. Head, canonical, robots, hreflang, schema (blog post route)

- Canonical: `alternates.canonical = post.canonical` from frontmatter, always `https://www.propertytaxpartners.co.uk/blog/<category-slug>/<slug>`. At `c05f38f0`: 697 of 697 posts www; one path mismatch in the whole corpus (not one of the 20 pages). `gsc_url_inspection` 09-26 shows declared canonical = Google canonical = www URL for every page in this study.
- The root layout also sets `alternates.canonical = siteUrl` (the homepage) as a default; the blog post route overrides it, so posts are fine. (Any route that forgot to override would canonicalise to the homepage; not shown to affect these pages.)
- hreflang: `en-GB` and `x-default`, both self-referencing, in the head and in the sitemap from 04-16. No contradictory alternates.
- Robots meta: none on posts (default index). `noindex` frontmatter support only arrived 08-05, for 3 careers posts. `robots.txt`: allow all, disallow `/thank-you`, explicit allow rules for about 60 bots, `host:` line (removed 08-15). No `X-Robots-Tag` in headers or middleware.
- Rendering: statically prerendered (`generateStaticParams`, all 697 routes), full article HTML and FAQ in the server response. Lead-capture components added 05-29 are client components added beside the article, not instead of it. Not checked on a live response.
- JSON-LD (from `lib/schema.ts` since `schema:` frontmatter is empty on every page): one script holding `[BlogPosting, FAQPage]`, valid JSON by construction. Details that are weak but not invalid: `dateModified` is set from `post.date` (the real edit date was ignored at that time), author is typed `Person` with the name "Property Tax Partners Editorial Team", image is a generated `/api/og` URL. `FAQPage` mirrors the visible FAQ. I did not run a validator.
- Title/description: `metaTitle` 44 to 59 chars plus the layout template " | Property Tax Partners" (over 60 in SERP); descriptions 137 to 154. Cosmetic.

### 3b. Sitemap and lastmod behaviour

- Until `b226ff38` (live 09-28): post URLs carried `lastModified = post.date` (the original publish date, e.g. 2026-04-10) and never moved when a page was rewritten (05-31, 06-02, 06-23). Static pages, locations and category hubs carried `new Date()`, i.e. the build time, so every one of the dozens of deploys re-stamped them. That is an inaccurate lastmod in both directions.
- From 09-28: static pages omit lastmod, posts use `dateModified ?? date`. The 694-post `dateModified` fill used git last-commit dates, so 276 posts carry 2026-06-23, the date of the frontmatter-only credential sweep, not a content edit.
- Sitemap size at `c05f38f0`: 697 posts + 11 static + categories + locations; hreflang alternates inside. Google was downloading the sitemap (STATE: last fetched 10-05). I could not see Google's fetch history for May.

### 3c. Duplicate URL variants that could have resolved 200

| Variant | Behaviour at the May crawl | Evidence strength |
|---|---|---|
| Trailing slash | Next.js default (no `trailingSlash` set): redirect to the non-slash URL | code only |
| Old flat `/blog/<slug>` | 301 to nested via `SLUG_TO_CATEGORY_MAP` and `DUPLICATE_REDIRECTS` (e.g. `section-24-basic-rate-taxpayer-affected` to `section-24-basic-rate-taxpayers`; `mortgage-interest-tax-relief-changes-landlords` to `section-24-mortgage-interest-restriction-uk-landlords`). This is the Section 24 cluster's only redirect-in; it is why that fifth URL is excluded | code |
| Wrong category prefix (`/blog/<wrong>/<slug>`) | 308 via `permanentRedirect` until 05-28 23:23 UTC; then 404 (dynamicParams=false) until 07-19; then 301 again | commit messages `c05f38f0`, `2cf1bc2f` |
| Apex host `propertytaxpartners.co.uk` | Served the same pages with a 200 and a www canonical until some date. GSC data in `c31b02d7` says both hosts held impressions. Vercel's apex-to-www 308 shows `updatedAt` 06-05 20:06 UTC; the middleware 308 shipped 08-05. Whether the apex 200 duplicates existed on 05-28/29 is **unknown** | commit text, Vercel config |
| Case, query-string and `/amp`-style variants | Not examined | |

### 3d. Broken internal links and other quality signals live at the time

- 247 broken internal links (229 HARD) existed across 120 files in the live corpus until `f4f6d977` (05-29 19:35 UTC); they pointed a real slug at the wrong category segment. I checked the body links of each of the 20 pages at its live SHA: **0 broken** (3 to 14 body links each). Related-articles and navigation components are not in this count.
- Leaked tool-call markup was live on 33 other posts until 05-29 12:42 UTC; none on these pages.
- Inbound body links to these pages at `c05f38f0` were very low for 9 of 11 (0 to 4 in the whole corpus), except tax-relief-complete-guide (130). So inbound count does not track index state either (130 inbound, not indexed).

---

## 4. What the data shows about index state versus crawl date

### 4a. The 14-day flip inside this cluster

`gsc_url_inspection` (sweep of 2026-09-26) versus the 2026-10-10 inspection, same lastCrawlTime on both:

| Page | 09-26 state | 10-10 state | lastCrawlTime |
|---|---|---|---|
| finance-costs-section-24-complete-guide | Submitted and indexed | Crawled, not indexed | 05-29 06:43 |
| section-24-tax-credit-20-percent-basic-rate-relief | Submitted and indexed | Crawled, not indexed | 05-28 14:50 |
| mortgage-interest-deductible-landlords-uk-2026 | Submitted and indexed | Crawled, not indexed | 05-29 20:01 |
| tax-relief-mortgage-interest-rented-property-guide | Submitted and indexed | Crawled, not indexed | 05-29 21:56 |
| section-24-tax-relief-complete-guide | Submitted and indexed | Crawled, not indexed | 05-29 19:14 |
| section-24-interest-only-mortgage-tax-planning | Submitted and indexed | Crawled, not indexed | 05-28 16:40 |
| section-24-higher-rate-taxpayers-2026 | Submitted and indexed | indexed (per brief) | 05-29 06:31 |
| section-24-mortgage-interest-restriction-uk-landlords | Crawled, not indexed | Crawled, not indexed | 05-29 00:02 |
| joint-ownership, multiple-properties | Crawled, not indexed | Crawled, not indexed | 05-15 |

So on 2026-09-26, 7 of the 11 May-crawled pages in this cluster were indexed; 6 of the 7 dropped out in the next 14 days with no re-crawl. This matches the 10-07 forensic ("472 crawled not indexed; 49 lost, 71 gained 09-26 to 10-07"). The guide's "not indexed since May" is therefore not the whole story: on this evidence it was indexed on the May version until late September or early October.

Site events in that 14-day window: 09-28 production deploys (4), including the sitemap `lastmod` rewrite and the 694-post `dateModified` sweep (`b226ff38`), schema and layout changes (`bc88aa78`, `1bca9bf0`), 09-30 wording revert, 10-07 deploys (2). The pages' own HTML did not change between 09-26 and 10-09 apart from the `dateModified` frontmatter field. I have no evidence linking any of these to the drop, and the 10-07 sweep rows are not in `gsc_url_inspection` so the exact day is unknown.

### 4b. Whole-site pattern on the 09-26 sweep (823 blog URLs; state = verdict PASS vs not)

By when Google last fetched the URL:

| Last crawl | Indexed | Not indexed | Rate |
|---|---|---|---|
| on or before 05-31 | 42 | 178 | 19% |
| June to July | 49 | 265 | 16% |
| August onward | 239 | 9 | 96% |

By the cohort the post belongs to (first added): April batch (04-10/11) indexed 62 of 164; 05-18 to 05-21 15 of 32; 05-22 to 05-24 65 of 208; 05-25 to 05-28 50 of 210; July 26 of 26; August 76 of 76. Within the on-or-before-05-31 bucket the rates are 33% (March), 19% (April), 12% (05-22 to 05-24), 12% (05-25 to 05-28). This confirms the prior forensic: the last-fetch date separates the groups far better than cohort or content. The direction of causation is not established (Google re-fetches pages it values).

---

## 5. What the evidence supports, and what it does not

Supported by the data above:
1. The version Google fetched on 05-15 and 05-28/29 for the nine May-crawled not-indexed pages was the April template version: 754 to 1,442 words, 4 FAQs, no byline fields, generic H2s, some stale-year and one factually backwards 2027 statement (guide). All nine were substantively rewritten 05-31 to 06-02 and Google has not fetched any of them since (about 4.5 months).
2. Those fetches happened in the middle of the largest sudden growth the site has had: 252 to 697 posts live in 11 days, 4 production increments (05-23, 05-26, 05-28/29), 8 deploys on 05-29 alone, with 247 broken internal links and a sitemap IndexNow of 602 URLs going out two days earlier.
3. The pages are not near-duplicates of each other or of the corpus (max cosine 0.38, max 5-gram overlap 7.4 percent), carry self-referencing www canonicals, no noindex, valid BlogPosting+FAQPage JSON-LD, and had working body links.
4. Content shape of the May version does not separate indexed from not indexed in this cluster: the one indexed May-crawled page (higher-rate-2026) was the same 736-word, 4-FAQ template.
5. Four of the cluster's pages crawled after the rewrite split two and two: remortgaging (07-03) and basic-rate (07-19) not indexed, how-to-calculate (07-11) and commercial (07-26) indexed. So a post-rewrite fetch is not sufficient by itself. Five pages fetched August to October (self-assessment, claim-mortgage-interest, arrangement-fees, repeal, deductions list) are all indexed, and claim-mortgage-interest moved from not indexed to indexed after Google re-fetched its rewritten version on 10-04.
6. For six of these pages "not indexed" is a recent change (after 09-26), not a May outcome.

Not supported, or not shown:
- A single site event that explains it. No change in the period altered robots, canonical host on posts, or indexability of these URLs. The recorded signal issues (sitemap lastmod stale for post rewrites until 09-28, stale cross-domain canonical in April, apex duplicates possibly live, 404s on wrong-category URLs 05-28 to 07-19) are real but none is shown to affect these 20 URLs, and indexed and not-indexed pages share them.
- That the May content was too thin or low quality to index. 754 to 1,442 words is short for the corpus, but one indexed page had the same shape.
- That the rewrites fixed it: Google has not seen them for the May-crawled pages.
- That the drop after 09-26 was caused by anything on the site. The evidence is only timing.

Unknowns (would need a live fetch, GSC API or Vercel logs, none done here):
- Exact date each of the six pages left the index between 09-26 and 10-10.
- Whether the apex host served 200 duplicates on 05-28/29 (Vercel config updated 06-05; middleware 08-05).
- What Googlebot received on the crawl requests (status, rendered HTML, any 5xx during the 05-28/29 deploy churn). Vercel runtime logs for 05-28/29 are likely outside retention.
- Vercel deployments with state ERROR or CANCELED before 05-28 23:23 (the list returned only READY rows) and any production deploys between 04-16 and 05-17 (none appear in the list).
- Whether a quality or redundancy filter applies to the cluster. Impressions are tiny (the best of the not-indexed siblings has 59 to 221 in 16 months), which fits Google not keeping them but does not show why.

---

## 6. Reproduction pointers

- Deploy list: `list_deployments` on `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU` (all production).
- Version at crawl: `git show <SHA>:Property/web/content/blog/<slug>.md` using the SHA in the tables.
- Index flip: `select page_url, index_status, last_crawl_time from gsc_url_inspection where page_url like '%/blog/section-24-and-tax-relief/%'` (latest row is the 09-26 sweep) versus `docs/property/link_engine/2026-10-10/stages/03c_url_inspection.csv` and the querydata JSON.
- Posts live by deploy: `git ls-tree --name-only <SHA> Property/web/content/blog/ | wc -l`.
