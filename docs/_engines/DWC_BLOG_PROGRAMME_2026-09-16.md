# DWC blog development programme: the pool, the pyramid, the plan

> **Engine readiness, 2026-09-17.** The engine that runs this programme was built, reviewed and
> committed at `C:\Users\user\Documents\Web Design Agency\blog\` (its own git repo). The only
> instruction doc is `blog/RUNBOOK.md`, the only state doc `blog/STATE.md`, tracking in
> `blog/ledger.csv`. Owner rulings since this doc: DWC's own prices never appear in a post (the
> wave-0 pricing page is withdrawn), Serper is not a provider (DataForSEO is), waves are 12 to 16
> posts and start only when the owner asks. Sections 5, 8 and 9 below are superseded on those points.

Date 2026-09-16. Owner brief: cast the net as wide as it goes across every niche, every
service and every creative outlet where an AI-first design, marketing and brand agency can
flourish; keep only commercial intent and the design lens; floor at 10 searches a month;
collapse into topics; never drift into thin content; sequence it as a waterfall from head
terms down to posts; know what competitors do.

**Ruling that governs this doc:** the accounting estate is a separate business. It is not
DWC's portfolio, proof, referral channel or case study. What it lends this programme is the
content engine and the method. Nothing from it is named to DWC prospects or on DWC's site.

## 1. The answer in three lines

1. **The pool is 2,907 pages**: 38 service pages, 22 sector hubs, 11 city hubs, 110 pillar
   guides, 2,726 cluster posts, 5 wave-0 assets. Behind them 20,972 folded topics become
   sections and FAQs inside those pages. That is the breadth, without the thin pages.
2. **72 waves of 40 posts.** Weekly, 17 months. Fortnightly, 33 months. The median UK
   competitor publishes 5 posts a month; wave 5 passes their whole blog.
3. **Wave 0 takes the five gaps nobody in the market fills**: a calculator hub, published
   pricing, original data, a glossary and a proof page. Cheaper than 200 posts, and on the
   competitor evidence they put DWC in a category of one.

Decisions at the end, section 9.

## 2. Where the numbers come from

Five DataForSEO sweeps, UK, one competitor crawl, one merge, one classification, one tree.
Everything is in `expansion_research/dwc_demand/`. Total spend 25.3 credits.

| Step | File | What it holds |
|---|---|---|
| Sweep 1 | `SWEEP.md` | web design, SEO, UX, maintenance, B2B lead gen, ecommerce build, cities, AI search. 17,688 keywords, 36 SERPs classified |
| Sweep 2 | `SWEEP2.md` | brand, copy, social and video, email and automation, paid media, AI marketing, AI tools, product and app design, creative and print, marketing strategy, marketing by vertical and city. 40,648 keywords |
| Sweep 3 | `SWEEP3.md` | 111 niches x 25 services grid. 2,775 exact keywords |
| Sweep 4 | `SWEEP4.md` | marketing fundamentals, analytics, PR, sales and landing pages, product strategy, web and app development, ecommerce marketing, influencer and affiliate, events, AI marketing deep, agency ops. 34,674 keywords |
| Sweep 5 | `SWEEP5.md` | Shopify platform, starting and growing a store, digital products and creators, marketplaces, print on demand, subscriptions and pricing, local business online, no-code and automation, AI commerce. 12,888 keywords |
| Competitors | `COMPETITORS.md` | 33 UK agency sitemaps: volume, cadence, architecture, gaps, thin-content examples |
| Merge | `merge.py`, `topics.csv` | 108,673 rows in, 68,305 topics out at floor 10, close variants collapsed |
| Filter | `classify.py`, `CLASSIFY.md`, `topics_tagged.csv` | commercial intent and design lens, hand-measured |
| Tree | `tree.py`, `TREE.md`, `tree.csv` | the pyramid, the folds, the waves |

## 3. The pool, before and after the filter

| Stage | Topics |
|---|---:|
| Merged, floor 10 a month | 68,305 |
| Kept: commercial intent (buy) | 11,933 |
| Kept: design lens (informational a design agency naturally authors) | 11,946 |
| Cut: textbook, tool names, logo browsing, DIY with no design angle, job seekers | 44,426 |
| Kept, at 50 a month or more | 3,246 |

Filter accuracy on a 600-row hand-judged sample: buy 91% precise, design lens 78%, off 88%.
The 30 largest cuts are listed in `CLASSIFY.md` section 6 for overruling. The one worth a
look: the AI video generator family, 76,600 searches a month, cut as tool browsing.

Difficulty across the kept pool at 50 a month or more: 1,531 easy (KD under 20), 414 medium
(20 to 35), 455 hard (35 and up), the rest unscored tail.

## 4. The pyramid

| Layer | Pages | What decides membership |
|---|---:|---|
| Service pages | 38 | one per service family, biggest buy-intent head with no sector or city in it; hard KD allowed, year-long targets |
| Sector hubs | 22 | 5 or more kept topics at 50 a month naming the sector, plus a buy-intent head; grouped by buyer, not one per synonym |
| City hubs | 11 | at least one KD-under-20 term at 50 a month and 10 topics to fill it; London closed; counties excluded |
| Pillar guides | 110 | one definitive page per topic family, head = biggest easy or medium term |
| Cluster posts | 2,726 | every kept topic at 50 a month under exactly one pillar; 10 to 49 a month only if it asks a distinct question |
| Folded | 20,972 | sections and FAQs inside the pages above |

**Service pages, the 38 families:** website design, website redesign, web development,
custom software, mobile app development, Shopify and ecommerce build, UX and CRO, UI design
and design systems, UX research, wireframing and prototyping, brand identity and
rebranding, logo and visual identity, brand guidelines and tone of voice, graphic design,
print design, packaging and label design, signage and exhibition, pitch and presentation
design, menu and hospitality collateral, copywriting, content marketing and blogs, SEO,
local SEO and Google Business Profile, AI search visibility (GEO and AEO), PPC and paid
media, paid social, social media management, video and motion, influencer and affiliate,
email marketing and automation, PR and reputation, lead generation, digital marketing,
marketing strategy, analytics and reporting, AI marketing and automation, website
maintenance and migration, white label and freelance partnerships. Full table with head
term, volume, CPC and KD in `TREE.md` section 2.

**Sector hubs, 22:** small businesses, law firms, dentists, SaaS and tech, B2B,
construction, beauty and wellness, creatives, restaurants, hotels, trades, healthcare,
schools, charities, estate agents, professional services, manufacturers, recruitment,
accountants, pubs and leisure, car dealers, architects. An "agencies" sector was removed:
its demand was Google folding "seo agency" into "seo for agencies", a close-variant artefact. Sectors with 2 to 4
topics get one post and a row on the sector index. 41 niches had zero demand and get
nothing.

**City hubs, 11:** Birmingham, Manchester, Newcastle, Leeds, Nottingham, Edinburgh,
Liverpool, Sheffield, Bristol, Glasgow, Cardiff. Ten of the eleven heads are SEO or PPC
queries, not design: second-city web design is KD 73 to 80, second-city SEO is KD 0 to 17.
City pages are search-service pages.

## 5. The waterfall in practice

Every post links up to its pillar and, where it names a sector or city, to that hub. Every
pillar links up to its service page. Every service page links to the calculators, the
pricing page and the proof page. Nothing publishes without a parent.

Wave 0 (built once, before any post): the 38 service pages, the 33 hubs, and the five gap
assets: a UK website cost calculator, a redesign ROI calculator, an AI-visibility check
(does ChatGPT, Copilot or Bing mention your business for your service and town), a
published pricing page, a glossary.

Waves 1 to 72: 40 posts each, buy intent before design lens, easy before medium before
hard, each wave drawn from at most six pillars so internal links land in the same deploy.
Waves 1 to 3 are 120 buy-intent easy posts, almost all sector-by-service terms (law firm
web design 720/mo KD 0, construction company website design 590/mo KD 0, marketing for
dentists 480/mo KD 17, digital marketing for law firms 210/mo KD 0). Full tables in
`TREE.md` section 6. Pillar and hub heads were re-chosen after a check showed four of them
were close-variant artefacts ("agency website design" standing in for "web design agency")
and two were London heads on second-city families; the rule now refuses both.

## 6. The competitor bar and the thin-content guard

33 UK agency sitemaps crawled. The median winner: 358 URLs, 182 posts at about 5 a month,
38 service pages, 14 sector pages, 30 case studies, zero tools. The top of the table is
padded with conference write-ups and algorithm news that carry no search shape. The one
that out-targets everyone does it with 168 posts on one niche using cost, comparison and
"best X" titles.

What repeats across winners: a sector-by-service matrix (20 of 26 sites), a three-level
service tree with case studies as proof, a high-volume blog feeding a gated download hub.
City pages are not a pattern; the median site has one.

What almost nobody does: calculators (2 of 26), published pricing (5 of 26), original data
(3 of 26), a structured glossary (2 of 26), published lead numbers (0 of 26). AI-search
content is table stakes, not a gap.

What not to copy, verified live: seven PPC URLs with 100% identical body copy, 57 town
pages 44% identical, five synonym service pages 42% identical. The depth bar for sibling
pages is about 12% overlap.

The guard applied to this pool folded 20,972 rows on three rules: identical synonym
signature (1,884), place that is not a hub (258), tail question test on the 10 to 49 band
(18,826, of which 2% survived as posts). Sibling pages must differ by more than the noun,
and sector pages ship only with sector-specific proof, pricing and questions.

## 7. How the engine runs it

The estate's net-new programme, unchanged in method, pointed at DWC:

- One Opus writer per topic, batch size 1, in parallel. Sonnet only for registry and
  config work.
- A DWC ground-truth doc (`docs/dwc/house_positions.md`, to be written): services, prices,
  method, what DWC can claim, what it cannot. Every post checked against it.
- Two QA tracks on every draft, both Opus: factual against the ground truth, editorial
  against AI tells, sameness, thin sections and pipeline artefacts.
- Six-check per-page floor, cannibalisation guard, one build at wave close, deploy on
  sign-off, IndexNow and Bing on every deploy.
- Rewrite, never collapse. If two posts overlap later, differentiate them.

Per-site setup the engine needs: site config, the ground-truth doc, the topic pool
(`tree.csv` is it), and a place to publish.

## 8. Prerequisites

- **A home for the content.** doublewiredcreative.com is Next.js on Vercel. Either the site
  moves into the estate monorepo on the kit (every engine, deploy script and lead pipeline
  works day one; Tanj's brand rebuilt on the kit), or the blog is bolted onto the existing
  DWC repo with adapters written for each tool. The source of the current site was not
  found on this machine.
- **DWC's own proof.** Case studies and numbers come from DWC client work under DWC's name.
  The earlier pitch kit's Property case study is parked; it names estate work.
- **Pricing published.** Wave 0 includes a pricing page. The current site lists Spark from
  £1,500, Surge £2,500 to £3,500, Powerhouse on quote, and no retainer. The retainer offer
  needs a price before wave 0 ships.

## 9. Decisions

1. **Where the site lives**: monorepo on the kit (recommended, everything works day one)
   or bolt-on to the current DWC repo (keeps her build untouched, adapters needed).
2. **Pace**: 40 posts a week (17 months) or 40 a fortnight (33 months). Recommended weekly;
   the engine has run that cadence before.
3. **Three overrides, default no**: restore the 258 folded place terms (`lancashire web
   design`, 320 a month at £211 a click, is the example); restore 26 exact-match niche pages
   inside grouped sectors (`solicitors website design` is the example); keep the AI video
   generator family (76,600 a month, cut as tool browsing).

Blast radius: nothing is built or published by this doc. Revert path: delete this doc and
the `expansion_research/dwc_demand/` folder. Nothing committed yet.
