# Medical Accountants UK — SEO / Indexing / Lead Diagnosis (Owner Report)

Site: www.medicalaccounts.co.uk (site_key `medical`). Author: P4 integrator (Opus), incorporating 5 adversarial skeptic reviews. Date: 2026-07-06.

**Status: FINAL for owner review. This is the standalone readable version of §3/§4 of `docs/medical/DIAGNOSIS_2026-07.md` (the ledger of record). Nothing is fixed yet. Locked decisions: (1) the program STOPS after this synthesis, no fix applies until you have read it; (2) every deploy is per-deploy owner sign-off; (3) you never owned the phantom domain.**

Data caveats (please read once): Google Search Console (GSC) data only exists from 2026-04-01 (the site earned zero Google impressions before April, it is a genuinely young site, not a tracking gap). Bing Webmaster Tools (BWT) snapshots run 2026-06-03 to 2026-07-06. On-site visitor tracking (web_sessions) only exists from 2026-06-11, about 25 days. Absolute numbers sit next to every percentage; any rate with fewer than 20 in the denominator is flagged as too small to trust. Live Google SERP credits (Serper) are exhausted, so Google positions are read from GSC weighted averages, not live checks.

---

## 1. The headline

The site is not being penalised. It is barely being seen.

103 of 112 pages (92%) are "unknown to Google": Google has never crawled them and has never even queued them for crawling. There are zero suppression signals (no noindex tags, no robots blocks, no manual actions). Google has actually indexed just 6 of the 112 pages (the homepage plus 5 blog posts). Meanwhile Bing knows at least 38 of the 112 pages, reading the exact same live HTML. That single fact (Bing can see the pages, Google has not looked) tells us the pages are live, accessible and crawlable, and that the failure is specific to Google.

So this is a discovery problem, not a ranking problem, not a content-quality problem, and not a suppression problem.

---

## 2. Why (root cause, ranked)

### 1. Young-domain near-zero crawl budget — PRIMARY (strong)

Google fetched the homepage on 2026-06-29 and then followed none of the links on it. Pages that are well linked internally still sit unknown: /contact has 63 editorial inbound links (more than any indexed page) yet is unknown; /services has 17 inbound links and is unknown. Every one of the 112 URLs is within 2 clicks of the homepage. This signature (fetch the homepage, index nothing it points to) is the textbook pattern of near-zero crawl budget on a low-authority young domain.

We tested and ruled out the obvious alternatives. A live fetch using Google's own crawler identity, with JavaScript switched off, returns the homepage with real clickable links to /services, /about, /contact, /nhs-pension, /for-gps, /for-consultants, /blog, /medical-guides, /calculators, /locations plus 3 featured posts. So Google demonstrably received the links it chose not to follow. That is crawl budget, not a broken page. robots.txt allows Google (only /api/ and /thank-you are blocked), every sampled unknown page returns HTTP 200 with a clean self-canonical and no noindex, and the sitemap is valid with all 112 URLs.

The deeper reason crawl budget is near zero is that the domain has almost no external authority signals. That is the slow root, and per your constraint any authority-building must be faceless (data-PR, tools, citations, AI/answer-engine visibility), never named-expert PR. It sets the ceiling on how fast we can force discovery by pinging alone.

### 2. Sitemap staleness plus a churning "last modified" defect — CONTRIBUTING and ACTIONABLE (moderate)

GSC last downloaded the sitemap on 2026-06-04 (32 days ago) and logged 97 URLs; the 15 URLs added since (calculators and medical-guides) are invisible to Google. Re-submitting forces a fresh fetch, which is the cheapest available lever.

Adversarial review found a concrete code defect that makes this lever weaker than it looks: `Medical/web/src/app/sitemap.ts` stamps `lastModified: new Date()` on every static path, calculator, location, blog category and guide (only individual blog posts use their real publish date). So every build resets every page's "last modified" to the deploy time even when nothing changed. Google is documented to distrust and ignore a sitemap whose dates churn like this, which degrades its value for crawl scheduling. A simple re-submission may therefore under-deliver unless we also pin those dates to a stable value (fix MED-F13). Staleness alone cannot explain the whole problem anyway, since old core pages that WERE in the 97-URL fetch are still unknown, so this is a contributor, not the master cause.

### 3. Phantom-canonical historical injury — SECONDARY; page canonicals resolved, one AI-surface residue remains (moderate)

From about 2026-05-20 until a fix on 2026-06-17, 46 legacy blog posts declared their "canonical" address as medicalaccountantsuk.co.uk, a domain that was never registered (a dead address). We confirmed the live source of both currently-flagged pages and both are now clean self-canonicals to the correct domain; 0 of 112 pages carry a phantom canonical today. This injury did NOT cause the discovery failure: Bing indexed at least 38 pages through the identical faulty HTML during the same period (a real canonical-trust collapse would have hit Bing too), the discovery failure predates the phantom era, and the unknown core pages never carried the phantom canonical in the first place.

Two honesty corrections from review:

- **The residue is not zero.** One live file, `Medical/web/public/llms.txt`, still lists the phantom domain for the homepage, services, about, blog, contact, locations, nhs-pension, calculators and the sitemap. This is the AI-discovery index (the file that tells ChatGPT and other answer-engines where your content lives, and the dynamic full-content file even points crawlers at it). It is currently sending AI engines to a dead address. Because ChatGPT/AI is your largest and fastest-growing lead channel (3 of 7 leads), this matters and is now a dedicated fix (MED-F12). It is the ONLY live file in the codebase still carrying the phantom domain.
- **The recovery is directional, not proven.** After the June 17 fix, 7 of 8 comparable pages improved their position (median improvement 3.65 places). At only 8 pages this is not statistically significant (a sign test gives about a 7% chance of seeing this by luck), and it is tangled up with the site simply maturing (the site's average position improved steadily 43.2 to 39.3 to 32.6 across all three windows, including during the phantom period). The often-quoted "gp accountants" 47 to 63 to 59 move is a single query dominated by the homepage, which never carried a phantom canonical at all. So the fix is credible, but we owe it a maturation window to mid/late July before calling the recovery complete.

### 4. YMYL / authority ceiling on head commercial terms (moderate, ranking not discovery)

Every commercial head term sits at position 47 to 85 and has never earned a click. This is a trust/authority ceiling, separate from discovery, and it will likely not move just because we fix indexing. That is expected, not a failure of the plan.

### 5. Blog index only server-renders 12 of 73 posts (weak-to-moderate, blog-specific)

The /blog listing uses a client-side component that puts only the first 12 of 73 posts into the initial HTML; the other 61 need JavaScript to appear as links. This is a genuine discovery dependency worth removing, but it cannot be the main cause, because server-rendered core pages that need no JavaScript are also unknown.

### 6. Structural orphans (weak, real for only 8 pages)

Only 8 pages are genuinely orphaned (5 location pages, 3 calculator pages, reachable via footer/nav only). The other 95 unknown pages are well linked (70 of 103 have 3 or more editorial inbound links). Orphaning cannot explain the 92%.

Note on the GSC "indexed: 0" sitemaps panel: that is a known display quirk for domain-level properties. URL Inspection (6 indexed) is the ground truth; do not read "indexed: 0" as total failure.

---

## 3. The lead paradox (answered)

You have 7 leads total. They are decoupled from search traffic.

- **ChatGPT/AI: 3** (leads #5, #6, #7, all in July, all landed on the homepage). Lead #6 was raw-classified "direct" but carries `utm_source=chatgpt.com` and the ChatGPT-app referrer signature.
- **Google: 2** (one GP-partner blog post, one homepage).
- **Unattributable: 2** (both in April, before tracking existed, no session recorded). These are NOT confirmed "direct": April had 1 Google click, so one of the two could have been Google-organic.
- **Bing: 0.**

The monthly trend is accelerating and shifting to AI: April 2, May 0, June 1, July 4.

The converting surface is the homepage (4 of the attributable leads) plus one decision-stage GP-partner blog post (1). Conversion overall is 5 tracked leads from 142 UK human sessions in about 25 days (3.5%); the homepage is by far the densest surface (4 leads from 14 UK homepage sessions, rate suppressed because the denominator is under 20).

Traffic volume does not predict leads. The two busiest blog posts (25 and 21 sessions) and the entire 96-session Bing stream produced zero leads. Bing's "0 from 96" is not a conversion defect: none of those 96 sessions ever landed on the homepage or /contact (the surfaces that convert); all 96 landed on informational posts and read them with high engagement (roughly 1.7 to 6.8 minutes, deep scroll, 20 to 40 events each). Bing is sending engaged readers to the wrong (non-converting) pages. This strengthens the decoupling story.

---

## 4. Opportunity (small and gated)

Genuine specialist net-new content collapses from a 668-topic pool to roughly 8 to 12 topics, with a recommended ceiling of about 5 new posts:

- **OPP-1:** consultant / private-practice advanced limited-company cluster (directors' loan account, family investment company, surplus company cash, salary-vs-dividend for a medical Ltd), about 3 to 4 posts.
- **OPP-2:** medico-legal / expert-witness income for doctors, 1 post (genuine white-space).
- **OPP-3:** NHS-pension singletons, folded into existing pension pages rather than written standalone.

Sequencing is load-bearing: the 73 specialist posts already published, which do cover live demand, earn 0 Google clicks across 2,187 lifetime impressions (positions 40 to 90). Adding more posts to a site Google is not indexing pours content into a hole. Content queues behind index repair.

---

## 5. Adversarial verification record

Five independent skeptics attacked the six core claims. Two verdicts were downgraded, three held. Every required correction is applied above and in the fix backlog.

| Skeptic domain | Verdict | What changed |
|---|---|---|
| Index-absence (92% unknown is real, not an artifact) | HOLDS | No change. Recorded the honest boundary that the head-term authority ceiling and 1 crawled-not-indexed page are separate root causes (#4), not denied. |
| Youth-vs-injury / phantom canonical | DOWNGRADE | Narrowed "RESOLVED / 0 residue / fix complete" to page canonicals only; added MED-F12 (live llms.txt still points AI engines at the phantom domain); softened the recovery evidence to directional-not-significant, confounded with maturation. |
| Lead attribution | HOLDS | Relabelled the 2 April leads from "direct" to "unattributable" (one could be Google); reframed Bing 0-leads as a landing/intent-mix artifact, not a conversion defect. |
| Bing-accessibility inference + Google discovery mechanism | HOLDS | Added the concrete `sitemap.ts` churning-lastmod defect (MED-F13); qualified "Bing 38/112" as "at least 38 by impressions proxy"; noted Bing got an IndexNow push on 2026-06-03 that Google never received; confirmed hreflang is valid. |
| Fix-backlog completeness / safety / sequencing | DOWNGRADE | Added MED-F12; re-scoped MED-F4 to the 15 new URLs only (dropped 44 inert re-pings, severity to low); re-targeted MED-F8 off the already-healthy dynamic file; stopped MED-F5 co-shipping inside the discovery-measurement window. |

---

## 6. Fix backlog (nothing ships without your sign-off)

Class key: engine-code, content, site-code, deploy [OWNER], gsc-ui [OWNER], spend [OWNER].

| fix id | title | root cause | severity | effort | conf | class | signal watched (one-variable) | expected signal + window |
|---|---|---|---|---|---|---|---|---|
| MED-F1 | GSC sitemap re-submission to force a fresh download | 1, 2 | blocker | S | H | gsc-ui [OWNER] (API `sitemaps.submit` is scriptable but this is a live-property action, browser panel is the safe path) | Yes | lastDownloaded refreshes within ~3d; submitted count 97 to 112. 7-14d. Pair with MED-F13. |
| MED-F2 | Request Indexing on core pages (/services, /about, /contact, /nhs-pension, /for-gps, /for-consultants, /blog + the 2 crawl-lag posts) | 1 | blocker | S | H | gsc-ui [OWNER], UI ONLY (requestIndexing not in the API); ~10-12 URL/day quota, prioritise 8-10 | Yes | requested URLs move unknown to crawled/indexed in 7-14d; indexed 6 to 15-20. 14d. |
| MED-F3 | Fix the 2 crawl-lag pages = Request Indexing only (NO source edit; live canonicals confirmed clean) | 3 | med | S | H | gsc-ui [OWNER] | Yes (folded into MED-F2) | Both re-crawled; locum SA page moves crawled-not-indexed to indexed. 14-28d. |
| MED-F4 | IndexNow submission of the 15 genuinely-new URLs ONLY; drop the 44 unchanged-post re-pings | 2 (Bing) | low | S | M | engine-code | Yes (Bing-only) | Bing pages > 38 and trailing clicks > 70 in 14-28d. Does nothing for the Google 92%. |
| MED-F5 | Make the blog index SSR all 73 posts | 1(D), 5 | high | M | M | site-code + deploy [OWNER] | Yes (blog subset) | Once /blog is crawled, blog-post unknown count falls faster than core. 28-56d. Ship AFTER the discovery batch, never inside the discovery window. |
| MED-F6 | Cross-link the 8 structural orphans (3 calculators, 5 locations) | 6 | low | S | M | content + site-code + deploy [OWNER] | Yes (the 8 URLs) | The 8 orphans move unknown to crawled once a linking post indexes. 28-56d. |
| MED-F7 | Protect the converting surface (freeze homepage trust wall + health-check magnet + LeadForm + /contact CTAs; freeze the GP-partner post) | 3 (protect) | high | S | H | guardrail (no deploy) | Yes (leads + homepage) | No regression: homepage stays the 4-lead surface; monthly leads not below the Apr-Jul run rate. Standing guardrail. |
| MED-F8 | GEO amplification test: decision-stage in-body /contact CTA on the 2 highest-traffic non-converting posts (llms.txt repair split out to MED-F12) | protect/grow | high | M | M | content + site-code + deploy [OWNER] | Yes (AI leads + CTA-post conversion) | The 2 CTA posts produce a first lead; AI leads keep leading. Additive, must not touch homepage. 28-56d. |
| MED-F9 | Bing 96-sessions-0-leads diagnostic (segment by entry page + intent + engagement) | investigate | med | S | H | engine-code (read-only) | Yes (diagnostic) | Classifies low-intent (expected) vs a Bing-fed conversion-path defect. Days. |
| MED-F10 | Serper credit top-up | diagnostic completeness | low | S | H | spend [OWNER] | n/a | Only unblocks live Google SERP probes; the diagnosis stands without it. Optional. |
| MED-F11 | Deferred content wave (max ~5 posts): OPP-1 consultant Ltd cluster + OPP-2 medico-legal; fold OPP-3 in | 5 | low (gated) | L | M | content + deploy [OWNER] | Yes (GATE) | DO NOT START until index recovery is proven. Gate review mid/late July. |
| MED-F12 | Repair `public/llms.txt` phantom domain (9 URLs + sitemap to medicalaccounts.co.uk) — only live file still carrying it; the AI-discovery index feeding the #1 lead channel | 3 | high | S | H | content/site-code + deploy [OWNER] | Yes (AI channel) | AI-channel leads hold; the phantom NXDOMAIN is cleared from the AI index. Ship alone. 28-56d. |
| MED-F13 | Pin `sitemap.ts` lastModified to a stable content/build date (stop the per-build `new Date()` churn) | 1, 2 | med | S | H | site-code + deploy [OWNER] | Yes | Google stops seeing meaningless per-build change; makes MED-F1 deliver. Ship with MED-F1. 14-28d. |

### Sequencing

- **Discovery-repair batch (ship together, one shared signal = indexed count from a coverage re-sweep): MED-F1 + MED-F2 + MED-F3 + MED-F13.** Non-competing; all wake Google on the same young domain, and MED-F13 makes MED-F1's re-fetch meaningful. Keep all content, homepage and blog-SSR changes out of this window so the indexed-count signal stays clean.
- **Ship-alone (own signal): MED-F12** (AI-surface fix, own AI-channel signal) and **MED-F11** (gated content wave).
- **Crawlability hardening, AFTER the discovery batch moves crawl budget: MED-F5 + MED-F6.** MED-F5 must not co-ship inside the discovery-measurement window.
- **Independent lanes: MED-F4** (Bing-only), **MED-F7** (guardrail, no deploy), **MED-F8** (leads, additive, must not touch homepage), **MED-F9** (read-only diagnostic).
- **Optional: MED-F10** (Serper spend, off critical path).

---

## 7. How we will know if this is right

Baselines: indexed 6/112; GSC about 55 impressions/day and 0.65 clicks/day with 0 lifetime head-term clicks and 0 Google clicks ever on the blog; Bing about 706 impressions / 70 clicks across at least 38 pages; 7 leads total (July run rate 4/month, AI-led).

- **14d (if right):** sitemap re-downloaded; submitted count 97 to 112; the Request-Indexed core pages move unknown to crawled/indexed; indexed count 6 to about 15-20; first impressions on newly-indexed core pages. Leads too small to move (expect 0 to 2).
- **28d:** coverage re-sweep shows indexed count about 20-40+; impressions/day past 55 toward 80-100+; first non-zero Google clicks plausible on long-tail blog; "gp accountants" recovering below about 55. Leads 2 to 4, AI still leading.
- **56d:** indexed count a majority of 112 (over 60); Google clicks establishing; head-term positions likely still deep (authority-gated, expected).

**What would mean we are wrong:** after a confirmed fresh sitemap download plus Request Indexing, those pages still sit unknown at 28d and indexed count stays at or below 10 (then the block is deeper trust/technical or an authority wall pinging cannot move, not discovery mechanics); or Bing keeps climbing while Google flatlines through 56d despite every lever (a Google-trust problem needing faceless off-site authority); or leads fall to 0 after any homepage or GEO change (an amplification breached the one proven converting surface). Conversely, if early content lifted Google clicks while indexed count stayed flat, that would falsify "content is gated behind indexing."

---

*Evidence pointers: `docs/medical/google_read.md`, `bing_read.md`, `index_coverage.md` (incl. internal-linking section), `old_domain_forensics.md`, `lead_paradox.md`, `opportunity_read.md`. Raw artifacts in `.cache/medical_diag/`. Ledger of record: `docs/medical/DIAGNOSIS_2026-07.md` §3/§4.*
