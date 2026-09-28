# Lead levers: what applies, where, 2026-09-26

Owner question: "how to increase leads across the sites, and that comes down to
domain age". Four candidate levers were proposed (convert existing traffic,
unblock the crawl path, Bing and AI channels, off-site authority). Six research
agents measured each one per site on fresh data. Per-lever reports and raw pulls
live in `expansion_research/lead_levers_2026-09-26/` (L1 conversion, L2A index
coverage big and small, L2B link graph, L3 Bing and AI, L4 authority).

## Recommendation in three lines

1. **The biggest cheap lever is one line of shared form validation.** The
   multi-step mini capture refuses any message under 20 characters and 4 words.
   In 90 days 510 sessions filled a form, pressed submit, were refused and never
   came back, against 233 that completed. Property alone: 411 blocked vs 170
   completed. Relaxing it is one constant in one file.
2. **Solicitors and Generalist are not conversion problems.** Their traffic is
   the wrong people, proven in the query data. Solicitors' entire hire-intent
   slice would yield about 3 leads a month at Property's rate. The lever there is
   content aimed at buyers, not form work.
3. **Crawl path, Bing plumbing and asset supply are NOT the constraint.** 2.3% of
   sitemap URLs are unreachable by link. Every site is Bing-verified, IndexNow
   wired, has llms.txt and a valid sitemap. 44 research pages and 15 calculator
   fleets exist and have earned zero third-party links or embeds. Domain age is
   not what the data blames anywhere.

One decision needed: approve relaxing the message rule estate-wide with a 4-week
lead-quality watch. Everything else below is either mechanical (no decision) or
listed as an owner call.

---

## Lever by lever: does it apply, and where

### Lever 1, convert the traffic already arriving: APPLIES, in three different shapes

Source: `L1_CONVERSION.md`. Window 90 days to 2026-09-26, GB human sessions,
session-attributed leads. Verified by the manager: the constants exist at
`packages/web-shared/leads/capture-steps.ts:16-17`; Property's calculator result
gate logged 160 starts, 9 submits and 222 errors in September alone.

**The real form is fine everywhere.** Start-to-submit on the `lead_form` surface
runs 42% (Solicitors) to 76% (Medical). What differs 10x between sites is how
many sessions ever reach it: 2.5% on Medical, 1.2% on Property, 0.2% on
Solicitors.

**Shape A, the shared validation rule (mechanical, estate-wide).** Two thirds of
all form engagement lands on the secondary surfaces (`calc_result_gate`,
`mobile_tool`, `resource_block`), which run the multi-step MiniCapture and
convert at 2 to 5%. The 20-char / 4-word message floor produced 837 of 1,043
form errors on five sites.

| Site | Sessions blocked and never submitted (90d) | Sessions that submitted (90d) |
|---|---:|---:|
| property | 411 | 170 |
| solicitors | 36 | 8 |
| dentists | 30 | 5 |
| medical | 17 | 25 |
| generalist | 16 | 15 |

Uplift arithmetic: Property loses ~137 blocked sessions a month. At 20% recovery
that is +27 leads a month on a base of ~55 (+49%). At 10%, +14. Estate at 20%:
about +34 a month. Blast radius: one constant, all 15 sites; revert is one line.
Risk: thinner messages, weaker qualification. Keep a non-empty requirement and
read lead quality at 4 weeks.

Property's own start-to-submit rate fell from 48.9% (June, before the multi-step
port) to 12.9% (September). Submits rose in absolute terms, so the port was not
purely destructive, but it added low-yield surfaces and this rule.

**Shape B, wrong audience (content, not CRO).**

- **Solicitors** (5,391 sessions, 8 leads, 0.15%). Hypothesis confirmed: the
  readers are legal cashiers and COFAs ("sra accounts rules", "legal cashiering
  rules about vat and disbursements", "colp"), students ("slaughter and may
  trainee salary") and consumers ("can solicitors check your bank account"). The
  `sra-accounts-rules` category took 1,143 sessions and produced 1 lead. The site
  converts badly on every channel (Google 0.12%, Bing 0.05%, direct 0.19%), so it
  is not tracking or channel. The plausibly-buyer categories total 306 sessions
  a month; at Property's rate that is 3.4 leads. **Perfect CRO buys +2.4 a
  month.** The lever is a hire-intent content wave: practice sale and succession,
  partner and LLP member tax, LLP conversion, outsourced legal cashiering. Stop
  deepening the SRA rules corpus.
- **Generalist** (4,115 sessions, 15 leads). Clean channel split: Google 426
  sessions, 5 leads (1.17%, Property's rate); Bing 2,367 sessions, **0 leads**
  (at 1.1% you would expect 26). Bing queries are DIY admin ("benefit in kind",
  "how register for paye", "capital allowances on vans"). Nothing to fix on the
  page. Grow the Google and AI slices. Minor parity gap: blog template carries 2
  forms not the kit's 3 (+0.5 a month at best).

**Shape C, the gate eats real intent (Dentists).** Dentists' blog view-to-start
rate is 17.3%, identical to Property's. Then 30 gate starts threw 59 message
errors and produced 0, while its 7 real-form starts converted at 57%. Fixing the
rule roughly doubles Dentists from a base of 2 a month. Sample too small to
quote a rate.

**Shape D, page never asks (Charities).** Blog template has no form, only a link
to /contact; 289 blog sessions, 2 form views. Owner-gated per its PHASE_PLAN §7.
Worth under 1 lead a month at today's traffic.

**Too little traffic to judge:** construction-cis (487 sessions, 4 leads), and
every site under 200 sessions a month. Minimum bar before a rate means anything:
~1,500 GB sessions and 10 leads in one window.

**Two estate-wide items that are owner decisions, not builds:** no phone number
anywhere on 35 audited production pages (cheapest trust lever, blocked on who
answers it); and AI referrals convert 5 to 6x the site average everywhere except
Solicitors, on tiny volumes.

**Falsified along the way:** "short forms convert better" (Property and Medical
ask the most and convert best); "returning visitors convert better" (first
sessions win on 4 of 6 sites this window); the memory note that the paid-PDF test
replaced Property's result gate on 09-14 (the gate is live and erroring). The L1
report's flag that "recent content is not deployed" is a false alarm: the agent
built URLs without the category segment; a sampled post returns 200, and the 694
modified blog files in the working tree are a `dateModified` frontmatter change
from another session.

### Lever 2, unblock the crawl path: MOSTLY DOES NOT APPLY as framed; three real defects found

Source: `L2B_LINK_GRAPH.md` (BFS over server HTML from each homepage, 15 sites,
21:05 UTC). Index coverage from `L2A_*` below.

**The 12-post blog cap is not starving Google.** It is binding on the raw
`/blog` link count only on Dentists (12 of 223) and Solicitors (12 of 196), and
even there every category hub lists its full category in server HTML, so nothing
is orphaned. It costs one hop of depth, not reachability. Medical,
construction-cis, charities and generalist render their full post lists. The
manager's earlier framing of this as a top lever was wrong.

**Estate-wide: 3,599 sitemap URLs, 83 orphans (2.3%).** Nothing sits deeper
than depth 4. Every post page carries related-post links (median 2 to 10).

**What does apply, per site:**

| Site | Defect | Size | Fix |
|---|---|---|---|
| contractors-ir35 | `/glossary` (40 terms) and `/research` hub have zero inbound links | 43 orphans, 28% of its sitemap, 52% of estate orphans | Link glossary from footer or related-terms block |
| construction-cis | `/for/<trade>` pages AND several tool pages canonical to homepage, wider than the 09-25 sweep recorded | ~54 pages | Same fix pattern as ecommerce `286365a8` |
| ecommerce | `/services`, `/vat`, `/for` canonical to homepage | 3 hubs | Deploy `286365a8` (committed, undeployed) |
| hospitality, care, startups-tech | `/services`, `/for` canonical to homepage; hospitality and care research-embed pages indexable and canonical to homepage | 2 to 3 each | Same sweep |
| generalist | `/resources/exit-cgt` indexable orphan canonical to homepage | 1 | noindex or self-canonical |
| solicitors | 48 old blog-category URLs still live after a rename, self-canonical to new (safe direction) | 48 | 301s, cosmetic |
| agency | `content_dir` in `optimisation_engine.config` points at a non-existent path | config | one-line fix |

### Lever 2A, Google index coverage per site

Live GSC URL Inspection over every sitemap URL, run 2026-09-26 (manager read
of `.cache/<site>_diag/index_coverage.json`; agent reports `L2A_*` add the
family split, examples and the impressions cross-check).

| Site (registry date) | Sitemap URLs | Indexed, self-canonical | Unknown to Google | Discovered, not indexed | Crawled, not indexed | Canonicalised away | Indexed share |
|---|---:|---:|---:|---:|---:|---:|---:|
| charities (Jul) | 66 | 60 | 2 | 1 | 0 | 3 | **91%** |
| care (Jul) | 55 | 48 | 2 | 2 | 1 | 2 | 87% |
| ecommerce (Jul) | 51 | 43 | 3 | 2 | 0 | 3 | 84% |
| startups-tech (Jul) | 68 | 52 | 10 | 5 | 0 | 1 | 76% |
| crypto (Jul) | 51 | 37 | 6 | 6 | 1 | 1 | 73% |
| hospitality (Jul) | 59 | 41 | 12 | 4 | 1 | 1 | 69% |
| solicitors (May) | 274 | 166 | 19 | 18 | 15 | 7 (+9 404s) | 61% |
| pharmacies (Jul) | 55 | 29 | 24 | 0 | 2 | 0 | 53% |
| construction-cis (Jun) | 246 | 125 | 27 | 0 | 39 | **55** | 51% |
| contractors-ir35 (Jun) | 154 | 73 | 34 | 19 | 14 | 13 | 47% |
| **dentists** (May) | 289 | **110** | **82** | **61** | 30 | 0 | **38%** |
| **medical** (May) | 138 | **20** | **72** | **44** | 2 | 0 | **14%** |
| **agency** (May) | 436 | **18** | **225** | **164** | 29 | 0 | **4%** |
| property (May) | 873 | 382 | 15 | 16 | **455** | 1 | 44% |
| generalist (May) | 784 | 348 | 4 | 7 | **416** | 7 | 44% |

Live URL Inspection, `--fresh`, run 19:53 to 21:16 UTC, no quota hits. Full
detail, examples and the GSC impressions cross-check in `L2A_INDEX_COVERAGE_SMALL.md`.

**Reading:** the youngest sites are the best indexed. Charities, care and
ecommerce, all live since July, sit at 84 to 91%. The oldest small site,
Medical (May), is the worst at 14%. Age does not explain the spread. Two things
do: whether a site carries the homepage-canonical defect, and raw discovery of
deep blog pages.

**The homepage-canonical defect is a shared template bug on six of ten small
sites, not a per-site one-off:** construction-cis (55 URLs, 45 of 46 `/for/*`
trade pages), contractors-ir35 (13, nine `/for/*` plus `/services`),
charities (3), ecommerce (3, fix `286365a8` undeployed), care (2), hospitality
(1). Charities and contractors-ir35 were not on any prior defect list. One fix
pattern, six sites.

**Medical is the one genuine discovery failure**, and the estate's best
converter (2.3%, home page 23%). Since the 08-03 read its never-discovered
share fell from 87% to 52%, but only 20 of the 118 URLs Google now knows are
indexed; 44 sit in "discovered, currently not indexed". It moved from "Google
does not know we exist" to "Google knows and will not commit". Zero of its 11
calculator pages are indexed. Its blog is fully linked (0 orphans), so this is
not link path; it is crawl budget on that domain. **Pharmacies** shows the same
shape smaller (44% never discovered, no canonical defect). **Agency** is the
other authority-wall site and has gone backwards since 08-03: 36 indexed then,
18 now, of 436; 389 URLs unknown or discovered-and-refused. It is already
F16-gated (no more content), and this read confirms the gate.

**Dentists is the second discovery failure** at 38%: blog 82 indexed vs 154
not, all 7 `/dental-guides` unindexed. The blog cap (12 of 223 on `/blog`) is
the one place the crawl-depth cost plausibly bites: category hubs reach every
post, but at depth 3 on a domain Google recrawls rarely (72 to 87% of indexed
pages on small sites last crawled more than 60 days ago).

**Blog posts are the largest and weakest-indexing family on every site**
except charities and care, where the blog indexes near 100%.

**Property and Generalist are a different failure mode again: crawled and
declined.** Neither is discovery-starved (under 2% unknown or discovered-only).
Google has fetched 455 of Property's 813 blog posts (56%) and 323 of
Generalist's 486 (66%) and holds them in "crawled, currently not indexed".
That is Google's quality or duplication verdict on the long tail, not a crawl
budget or age problem. Property still earns impressions on 776 pages in 28
days, so many of those posts flicker in and out. Generalist additionally has
51% of its indexed pages not recrawled in 60 days. This is the one finding
that argues for LESS content, or for consolidating and deepening the tail on
the two biggest sites, and it is the strongest evidence in the whole
programme for the standing "A* or do not ship" rule. It needs its own read
(which posts, what they share) before any action; it is listed below as a
diagnosis, not a build.

**Solicitors' sitemap is incomplete:** 324 pages earned impressions in 28 days
against 274 sitemap URLs, mostly the 40 renamed blog slugs (the `-and-`
rename) still showing under old URLs. Same root as the 48 duplicate URLs the
crawl found. 301s close it.

### Lever 3, Bing and AI channels: DOES NOT APPLY as a lever; the assumption is stale

Source: `L3_BING_GEO.md`. Bing totals from `GetRankAndTrafficStats` (the only
site-total call), 28 days to 2026-09-24; Google from GSC date-dimension totals.

**Plumbing is complete on all 17 domains.** Bing verified, IndexNow key live and
matching `optimisation_engine/indexing/config.py`, shared submit path exists,
llms.txt and sitemap valid. There is nothing to unblock.

**The August decay continued.** Estate Bing/Google click ratio: ~5x (June), 2.11x
(08-18 deep dive), **1.43x today**. Solicitors (0.82), dentists (0.61),
construction-cis (0.17), care, ecommerce and pharmacies are now Google-dominant.
"Bing is 2x Google" holds cleanly only on property (1.63), generalist (4.17) and
medical (1.92), and the margin is shrinking on all three.

**Bing-family traffic converts near zero where it is largest:** generalist 1,030
Bing sessions, 1 lead; solicitors 963, 0. Property 3,004, 20 (0.7%).

**AI referrals are the best-converting bucket everywhere they appear** (property
9.5%, medical 33% on n=3, contractors-ir35 18%, generalist 8.7%), on single to
low double-digit sessions per site. A signal to protect, not a programme.

**Two concrete gaps:** medical and agency serve an llms.txt that lists zero
URLs; wills-probate and divorce-finances have no `gsc_property_url` configured
so their Google side cannot be measured at all.

### Lever 4, off-site authority: APPLIES everywhere, but the gap is distribution not supply

Source: `L4_AUTHORITY.md`. DataForSEO backlinks, $0.46 spent, balance $41.82.

**Link equity is still near zero and what grew is junk.** Property 13 to 47
referring domains since 08-08, Solicitors 3 to 11, Medical 4 to 15, all from
rank-0 link farms (betting mirrors, random blogs). Zero editorial third-party
links anywhere. 11 of 15 domains are outside the backlink index entirely. Zero
cross-links between sister sites.

**The assets already exist.** 44 original-data research pages across the estate
(startups-tech 5, dentists 4, charities 4, construction-cis 4, generalist 4,
property 1 flagship), and every one of 15 sites has a config-driven calculator
fleet with a working `/embed/[slug]` route.

**And nobody uses them.** `is_embed = true` has fired on 0 of 108,627 sessions,
ever. Either no third party has embedded a calculator, or the embed page does
not set the flag. That 10-minute instrumentation check comes before any
conclusion. Bing's `GetAiPerformance` endpoint 404s on this account, so the GEO
doc's measurement plan cannot be wired. Property is the one site missing
Companies House `sameAs` (one line). The named GEO flagships (SRA Enforcement
Index, Dental Pay and Tax Index, Agency Finance Benchmark) were never built;
smaller formation and survival indexes shipped instead.

Building a 45th research page is not the lever. Getting the 44 seen is, and
under the faceless constraint that means OGL data submitted to aggregators and
directories, plus citation monitoring to learn whether any AI engine already
cites them.

---

## Ranked actions

| # | Action | Where | Leads/month, arithmetic shown | Type | Blast radius, revert |
|---|---|---|---|---|---|
| 1 | Relax `MINI_MESSAGE_MIN_CHARS` / `MIN_WORDS` (keep non-empty) | all 15 via web-shared | +14 to +27 Property, ~+34 estate at 20% recovery of 510 blocked/90d | **owner decision** (quality watch) | one constant, one-line revert |
| 2 | Route `calc_result_gate` and `mobile_tool` traffic into the real enquiry form, or drop the gate | property, dentists | Property gate: 160 starts, 9 submits in Sept; Dentists: 30 starts, 0 | test, not forecast | one component |
| 3 | Canonical sweep: deploy `286365a8`, fix construction-cis ~54 pages, hospitality/care/startups hubs, research-embed noindex, generalist exit-cgt | 6 sites | ranking, not direct leads | mechanical | page metadata only |
| 4 | Solicitors hire-intent content wave; freeze SRA-rules deepening | solicitors | ceiling +2.4 from CRO; content is the lever | owner sequencing | content only |
| 5 | Generalist: grow Google/AI slice via topic selection; restore 3rd blog form | generalist | +3.3 if Google slice triples; +0.5 form | content + one template | small |
| 6 | Link contractors-ir35 glossary and research hub | contractors-ir35 | 43 pages become crawlable | mechanical | one footer/nav block |
| 7 | Property `sameAs`; medical and agency llms.txt; wills/divorce GSC property URLs; agency `content_dir` | 5 sites | hygiene | mechanical | trivial |
| 8 | Verify `is_embed` instrumentation, then citation check on the 44 research pages, then OGL aggregator submission | estate | unknown until measured | measure first | none |
| 8b | Diagnose the crawled-not-indexed tail: 455 Property posts, 323 Generalist posts, what they share (age, length, topic overlap) | property, generalist | ranking, not direct leads | diagnosis, one agent | none |
| 8c | 301 the 40 renamed Solicitors blog slugs; register the sitemap gap | solicitors | hygiene | mechanical | redirects, reversible |
| 9 | Charities blog form | charities | under +1 | **owner-gated** (PHASE_PLAN §7) | one template |
| 10 | Phone number on sites | estate | unmeasured trust lever | **owner decision** (who answers) | copy |

**Not doing, and why:** changing the shared blog list component (cosmetic depth
gain on 3 sites, no orphans); a Bing programme (plumbing complete, channel
decaying); new research assets (44 unused); buying aged domains (Google's
expired-domain abuse policy). Domain age appears in none of the six reports as a
measured cause.

## Corrections to standing notes

- Memory `audience_intent_monetisation`: the paid-PDF test did not replace the
  Property result gate. Gate live and erroring through 09-26.
- Memory `kit_blog_list_12_post_cap`: cap is binding on dentists and solicitors
  only, and category hubs make it a depth cost, not a reachability defect.
- Memory `property_ceiling_and_channel_truth`: "Bing 2x Google" is stale;
  1.43x estate-wide, Google-dominant on six sites.
- Memory `audience_intent_monetisation`: returning visitors convert better does
  not reproduce as a rate; share-of-converters may still hold.
- `docs/_engines/ESTATE_CANONICAL_SWEEP_2026-09-25.md`: construction-cis defect
  covers ~54 pages, not 4.

## Agents and spend

Six agents (one Opus, five Sonnet), DataForSEO $0.46, GSC URL Inspection calls
within per-property quota, zero deploys, zero submissions, zero git commands by
agents. Scratch scripts deleted.
