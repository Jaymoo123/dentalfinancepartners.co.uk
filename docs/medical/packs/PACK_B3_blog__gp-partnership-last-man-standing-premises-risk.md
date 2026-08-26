# §9.5 RESEARCH PACK: /blog/gp-partnership-last-man-standing-premises-risk

**Batch 3, wave B (GP surgery premises), page 2 of 3.** Built 2026-08-26.
Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6 · Batch plan `docs/medical/packs/BATCH3_INDEX.md`
Language spec `docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9) · Ground truth `docs/medical/house_positions.md`
Peer classification `docs/medical/competitor_universe_2026-08-26.md` §2a · Market map `docs/medical/cluster_dossier_2026-08-26.md` (CORRECTED §4 ordering)
Inherited rows `docs/medical/packs/BATCH2_INDEX.md` §4 and its two ratified amendments.

**No paid API call was made by this task: $0.00.** GSC and Bing Webmaster are free and were re-pulled live.
The persisted DataForSEO harvest was queried by SQL only; it was paid for on 2026-08-26 and no new call was made.
No file under `Medical/web/` was edited. No commit, no deploy, no IndexNow, no `monitored_pages` write, no monitor,
alert, cron or scheduled job created.

---

## 0. Three corrections to this pack's own inputs, before anything else

**0.1 The revert anchor in the task brief is stale. Repo HEAD has moved.** The brief instructs
`d2e75655`. That was correct when `BATCH3_INDEX.md` was written and it is no longer HEAD.

```
$ git rev-parse HEAD
ad4800ebac954b74ecd2efe1e2c80eb10975b685
$ git log --oneline -2
ad4800eb docs(leads): record the Sheets feed as live, and guard resource-gate signups
d2e75655 feat(medical): batch 2 shipped after dual QA, plus ground-truth corrections
$ git merge-base --is-ancestor d2e75655 HEAD && echo ancestor
ancestor
```

`d2e75655` is a real object and a real ancestor, so a revert to it would succeed silently and would also undo
`ad4800eb`. **This pack's revert anchor is `ad4800eb`** (§1). The batch index already carries this lesson once
(§0.8 of `BATCH3_INDEX.md`, where the anchor was wrong in the other direction) and it has now recurred with the
opposite sign inside one working day. **The durable fix is the one the index already states: derive the sha live
at pack-write time, never from a brief and never from an environment banner.** A brief written an hour ago is an
environment banner with a longer half-life.

For completeness, the target file itself has not moved since `bb1db095`:

```
$ git log --oneline -1 -- Medical/web/content/blog/gp-partnership-last-man-standing-premises-risk.md
bb1db095 feat(medical): Stage 0 + baseline items 1-3, competitor intelligence, cluster dossier
```

so `ad4800eb`, `d2e75655` and `bb1db095` all currently produce a byte-identical checkout of this one file. The
anchor still matters, because it stops being true the moment anything else in the repo touches it.

**0.2 The persisted harvest is larger than `BATCH3_INDEX.md` §0 and the writer brief say, and it was re-derived
rather than quoted.**

```sql
select count(*) rows, count(distinct ranked_keyword) kws,
       count(distinct competitor_domain) doms, min(date_pulled) d
from dataforseo_competitor_data where site_key='medical';
-- run 2026-08-26 via python scripts/_q.py -
-- rows 39296 | kws 31539 | doms 44 | date_pulled 2026-08-26
```

**39,296 rows / 31,539 keywords / 44 domains**, not 32,872 / 27. Every count in §3 is derived against the live
table, not against either published figure.

**0.3 The Bing page-level average impression position of 1.0, printed in `BATCH3_INDEX.md` §2.5 and §5 wave B for
this page, is wrong. The correct impression-weighted figure is 2.0.** See §2.3. The clicks and impressions (3 and
8) reproduce exactly. This matters because wave B's success test is a POSITION test, so the batch expectation is
currently anchored to a baseline position this page does not hold at page level.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES, AND ON THIS PAGE K2 IS THE WHOLE POINT.**

The grade is reached on a plain read of §9.2 with no ruling needed: **Bing clicks = 3**, which clears the
`Bing clicks >= 3` branch of the EXTEND test outright. §2.4 of `BATCH3_INDEX.md` (the 1-or-2-click hole and its
position ruling) is **not** invoked here and this page is not one of the 26 pages that ruling rescues.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/gp-partnership-last-man-standing-premises-risk` |
| Cluster / topic | GP surgery premises, last-man-standing lease and loan liability. Ownership row **O28** |
| Lane | `premises_finance` (`competitor_universe_2026-08-26.md` §3 lane 9, 2 pages) |
| Wave | **B**, start now, concurrent with A and C, no gate |
| NO-PAGE topics attached | **None.** No row of the corrected dossier §4 ordering (26 remaining rows, `BATCH3_INDEX.md` §4) is prescribed onto this page or onto any wave-B page |
| Source file | `Medical/web/content/blog/gp-partnership-last-man-standing-premises-risk.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** The writer edits the `.md` directly and writes new blocks as raw HTML `<h2>`, `<h3>`, `<p>`, `<ul>` to match. Frontmatter carries `metaTitle`, `h1`, `title`, `keyTakeaways`, `summary` and the `faqs` list |
| Current sha (revert anchor) | **`ad4800ebac954b74ecd2efe1e2c80eb10975b685`** (`git rev-parse HEAD`, 2026-08-26, and see §0.1) |
| Revert path | `git checkout ad4800ebac954b74ecd2efe1e2c80eb10975b685 -- Medical/web/content/blog/gp-partnership-last-man-standing-premises-risk.md` |

### Why K2 matters more here than anywhere else in batch 3

This page holds **Bing position 1 on three separate word orders of one phrase and converts every one of them to a
click** (§2.2). It is the only page in the untreated corpus that is already winning a query outright. Its equity
is not a topic and not a title, **it is the phrase**. Every other EXTEND page in the batch is protected by K2
because a title change might cost something; this page is protected by K2 because a title change would cost the
one thing on the site that is demonstrably working.

That is also why wave B's success test is a POSITION test and not a traffic test (§8), and it is why this page is
the batch's control experiment: if an additive-only change moves a position-1 hold, the additive-only rule is not
doing what the whole EXTEND grade assumes it does.

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `Last Man Standing: GP Partnership Premises Risk`
2. `h1`: `The Last Man Standing Problem: GP Partnership Premises Liability and How to Manage It`
3. `title`: `Last Man Standing: GP Partnership Premises Risk and How to Manage It`
4. `metaDescription`, `slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block, `altText`, `summary`, `generator`, `author`, `schema`.
5. **The existing H2 sequence, all 12, in this relative order, each string unchanged:**
   1. `What last man standing actually means`
   2. `Why the risk has grown`
   3. `How the risk concentrates: an illustrative walk-through`
   4. `The leasehold version of the risk`
   5. `The owner-occupier version of the risk`
   6. `The two-tier partnership: property-owning and non-property-owning partners`
   7. `How the partnership deed manages the risk`
   8. `What an incoming partner should check before buying in`
   9. `What a last man standing partner can actually do`
   10. `The tax and accounts angle`
   11. `Common misconceptions`
   12. `How we help GP partnerships manage premises risk`
6. **All 14 existing H3 strings**, each under its existing H2.
7. **All 14 existing FAQ question and answer strings.**
8. **All 5 existing `keyTakeaways` strings.**
9. Every existing paragraph, every existing list item, every existing internal link. **Nothing existing is
   reworded, reordered, shortened, re-linked or "tidied".**

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before the existing
   `<h2>Common misconceptions</h2>`**, so all 12 existing H2s keep their relative order and a byte-identical
   check reads the existing sequence as an unbroken subsequence. Placing them after
   `How we help GP partnerships manage premises risk` would put new substance below the CTA block, which reads
   badly; placing them before `Common misconceptions` keeps the closing shape intact.
2. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place, in order,
   unchanged. Note coordinator ruling 1 (batch 1): the 4-to-8 FAQ band governs a newly authored set only, so 14
   existing entries are not a defect and none is deleted to reach a band.
3. **New key takeaways appended** to `keyTakeaways`. Optional. The existing 5 stay.
4. **New internal links inside the NEW blocks only.** No new link inside any existing paragraph.

### Frozen-list position, confirmed against BATCH3_INDEX §1

**This slug is not on the frozen list.** The live `monitored_pages` freeze is 19 rows to 2026-09-10 or later
(`BATCH3_INDEX.md` §1, derived with **no status predicate**, which is the point: a `status='active'` filter
silently excuses `__home`, `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines`). This slug
appears in none of the 19. It is workable now.

**Five of the 19 are the GP-partnership set and one of them is this pack's O30 link target.** See §6.4 for the
live-target check, which was run.

**Never propose a collapse, a redirect or a URL change.** No em-dashes anywhere (rule I1, hard fail).

---

## 2. Equity register

Every figure below states the endpoint and the window. **`GetPageStats` page-level impressions and
`GetPageQueryStats` named-query impressions are both true and are never comparable to each other**
(`BATCH3_INDEX.md` §0.2, defect D2). On this page they read 8 and 6, and that gap is discussed in §2.3.

### 2.1 Google, and how to say it

```
GSCQueryFetcher("medical")  ->  sc-domain:medicalaccounts.co.uk
searchanalytics().query(dimensions=["page"])          window 2026-05-25..2026-08-23 -> 21 rows site-wide, 0 for this URL
searchanalytics().query(dimensions=["page","query"])  window 2026-05-25..2026-08-23 -> 259 rows site-wide, 0 for this URL
# re-pulled live 2026-08-26 by this task; site-wide row counts reproduce BATCH3_INDEX §0.1 exactly
```

**Google: zero clicks, zero impressions, zero rows on either dimension.**

**State this as a fact about crawl demand, never as "the page ranks nowhere."** Google returns page-dimension
rows for **21 of the site's 138 sitemap URLs**. A page absent from that set has not been shown and rejected; it
has not been shown. On this domain absence is a fact about how much of the corpus Google has taken an interest
in, and it carries no information about the page. `BATCH3_INDEX.md` §7 defect D5 records the same point for the
44 untreated URLs with no data on either engine, and §8 sets no Google expectation for any wave for exactly this
reason.

### 2.2 Bing, `GetPageQueryStats`, named-query level. This is the most interesting equity picture in the batch

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/gp-partnership-last-man-standing-premises-risk")
# pulled 2026-08-26. 5 rows returned.
```

| Query | Impr | Clicks | Avg impression pos | Snapshot |
|---|---|---|---|---|
| `last man standing gp practice lease` | 2 | **1** | **1** | 2026-07-17 |
| `last man standing lease gp pracitce` | 1 | **1** | **1** | 2026-07-17 |
| `last man standing arrangement gp practice` | 1 | **1** | **1** | 2026-07-24 |
| `last man standing arrangement gp contract` | 1 | 0 | 3 | 2026-07-24 |
| `last partner standing arrangement` | 1 | 0 | 6 | 2026-07-24 |
| **Total** | **6** | **3** | | |

**This page converts three of its five named queries and holds position 1 on all three.** Three impressions,
three clicks, three position-1 holds. The two that do not convert sit at positions 3 and 6.

**Every one of the five is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

**Endpoint discipline, stated because it is a live trap.** `get_page_query_stats` returns an **empty list rather
than an error** when `page` is passed as a path instead of the full `https://www.` URL. The batch-1 exemplar
shows a path argument. A writer copying it gets zero rows and honestly reports "no Bing query data for this
page", which is a silent-failure false negative. The full URL above is the one that works.

### 2.3 Bing, `GetPageStats`, page level, and a correction to the batch index

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")   # 303 rows, 14 weekly snapshots
# rows filtered to this URL, snapshots inside 2026-05-29..2026-08-21:
```

| Snapshot | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| 2026-07-17 | 3 | 2 | 1 |
| 2026-07-24 | 3 | 1 | 3 |
| 2026-08-21 | 2 | 0 | 2 |
| **Window total** | **8** | **3** | |

**Clicks 3 and impressions 8 reproduce `BATCH3_INDEX.md` §2.5 and §5 exactly. The average impression position
does not.**

The index prints **1.0**. The impression-weighted average across the three snapshots is
`(1x3 + 3x3 + 2x2) / 8 = 16 / 8 = ` **2.0**. The unweighted mean of the three snapshot positions is also 2.0.
There is no weighting under which this page's **page-level** average impression position is 1.0.

**Where the 1.0 came from, and why the error is instructive rather than careless.** 1.0 is the correct figure at
**named-query** level for the three click-earning rows in §2.2. The index's own wave-B note says so in terms:
"holds Bing position 1.0 on three near-identical phrasings". Somewhere between that sentence and the §2.5 table
the named-query position was carried into a page-level column. **This is defect D2 in miniature: the two
endpoints agreed closely enough on one field that a figure crossed from one to the other unnoticed.** D2 was
written about impressions disagreeing; the sharper version is that the danger is not disagreement, it is partial
agreement, because partial agreement makes the columns look interchangeable. The corrected numbers in
`BATCH3_INDEX.md` §0.2 make the same point about clicks agreeing at 7 while impressions differed by 34%.

**Consequence, and it is not cosmetic.** Wave B's primary test in `BATCH3_INDEX.md` §8 is
"must still hold Bing position 1 to 3". Read against page level that test starts at 2.0 and a drift to 3 would
pass while representing a real loss. Read against named-query level, which is what the sentence means, it starts
at 1. **§8 of this pack restates the test at named-query level on a named query, which is the only level at which
it is falsifiable.** Recorded as a correction in the closing section.

### 2.4 The endpoint gap on this page

Page level 8 impressions against named level 6. A 25% gap, in the same direction as the GMS page (129 against 85)
and the PCN page (85 against 65). Both are true. Neither is set against a grade number: the grade in §1 is
page-level clicks, the evidence in §2.2 is named-query level, and they are never mixed.

### 2.5 Wave-B siblings, pulled at the same time, for the wave's combined baseline

| Page | `GetPageStats` page level | `GetPageQueryStats` named level |
|---|---|---|
| `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | 1 click / 5 impr, positions 8 and 3 | 2 rows, 0 clicks / 3 impr: `notional gp meaning` (2 impr, pos 8), `whats notional rent` (1 impr, pos 8) |
| **`/blog/gp-partnership-last-man-standing-premises-risk`** | **3 clicks / 8 impr** | **5 rows, 3 clicks / 6 impr** |
| `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | **0 rows on either endpoint** | 0 rows |
| **Wave B combined** | **4 clicks / 13 impr** | **7 rows, 3 clicks / 9 impr** |

The wave combined page-level figure of **4 clicks / 13 impressions** reproduces `BATCH3_INDEX.md` §8 exactly.

Note the third page returns nothing on either endpoint. Per limitation 2 of the index, `GetPageStats` is top-N,
so that is "absent from the top N", not "proven zero". It is a question, not a finding.

---

## 3. The market's keyword set

### 3.1 The selection regex, printed so the counts are re-derivable

```sql
-- python scripts/_q.py -   (Supabase Management API, project dhlxwmvmkrfnmcgjbntk), run 2026-08-26
select competitor_domain, ranked_keyword, position, search_volume, url
from dataforseo_competitor_data
where site_key='medical'
  and ranked_keyword ~ '\ydilapidations?\y|\ylast man standing\y|\ylast partner standing\y|(gp |surgery |practice )(premises|lease)|premises (lease|liability|risk)|\ysurgery premises\y|\ygp surgery for sale\y|partnership at will|joint and several'
order by search_volume desc nulls last, position;
```

**`\y`, not `\b`.** Postgres ARE uses `\y` for a word boundary; `\b` is a backspace character and silently
under-matches. This is defect D9 in `BATCH3_INDEX.md` §7, where `\b` returned 3 rows against 41 for `\y` on one
stem. The regex above was written with `\y` from the start.

### 3.2 The counts

| Measure | Value |
|---|---|
| Rows matched | **35** |
| Distinct keywords | **18** |
| Distinct domains holding them | **3** |
| Combined volume, deduplicated by keyword | **2,790** |
| **Peer-winnable volume** (a domain in the 22-domain peer set at position <= 20) | **2,030** |
| Domains outside the 22-domain peer set holding any matched row | **0** |

Peer set = the 22 domains in `competitor_universe_2026-08-26.md` §2a, enumerated inline in the query as a
`values` list so the figure is reproducible without a join to a config file.

### 3.3 The finding that dominates this pack: the harvest does not contain this page's topic at all

```sql
select count(*) from dataforseo_competitor_data
where site_key='medical' and ranked_keyword ~ 'last man|last partner';   -- 0
select count(*) from dataforseo_competitor_data
where site_key='medical' and ranked_keyword ~ 'partnership deed|partnership agreement';  -- 0
```

**Zero rows.** Not zero volume, not a low position held by an unwinnable domain. **Zero rows across 39,296 rows,
31,539 keywords and 44 domains.** The phrase this page holds Bing position 1 on, three times over, does not
appear anywhere in the paid Google harvest of the entire medical market.

Two readings, and both are worth stating because they point in different directions:

1. **The demand is real and Google-invisible.** Bing shows five distinct human-typed queries for it in one 90-day
   window, three of them converting. DataForSEO reports Google search volume, and a topic can carry real intent
   at a volume below the point at which Google reports it. The five queries are also long, specific and
   conversational, which is the shape that vanishes from keyword tools first.
2. **The market has no page for it that a keyword tool can see.** No peer ranks for it, so no peer URL enters the
   harvest carrying it, so the vocabulary never enters the map. §4 confirms this directly: real pages on this
   exact topic do exist, and every one of them belongs to a **solicitor or a surveyor**, which are domain classes
   that never entered a universe built from accountancy head terms.

**This is the single clearest piece of evidence in the Medical programme for owner decision 21 (peer-winnable
volume ORDERS the work and never excludes any of it), and for the standing position that Bing is this site's
working channel.** A Google-derived winnability screen applied to wave B would have scored this page zero and
deprioritised it. It is the best-converting untreated page on the site.

**It is also a live instance of the amendment's warning about unclassified domains.** The peer set is 22 of the
44 harvested domains, so a domain that is neither in §2a nor in §2b can hold a top-20 position and be dropped
from any peer-winnable count without trace. **It does not bite this pack:** all 3 domains holding matched rows
(`pricebailey.co.uk`, `bhp.co.uk`, `practiceindex.co.uk`) are peers, numbers 5, 15 and 6 in §2a, and the
"domains outside the peer set" count in §3.2 is 0 by measurement, not by assumption. The wider exploratory
queries in §3.5 did surface three unclassified domains (`e-accounts.co.uk`, `apexaccountants.tax`,
`thepeloton.co.uk`), all holding company-car-lease keywords, all correctly outside the final regex.

### 3.4 What the harvest DOES hold for this page, in full

18 keywords, every one held by a peer. `On page` = phrase appears verbatim, case and punctuation normalised, in
the current source file.

| Vol | Best pos | Held by | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|
| 210 | 4 | pricebailey.co.uk | **yes** | **no** | `provision for dilapidations` |
| 210 | 5 | bhp.co.uk | **yes** | **no** | `dilapidation provision accounting` |
| 210 | 6 | pricebailey.co.uk | **yes** | **no** | `dilapidations provision accounting` |
| 210 | 6 | bhp.co.uk | **yes** | **no** | `dilapidation provisions` |
| 210 | 6 | bhp.co.uk | **yes** | **no** | `dilapidations provisions` |
| 210 | 7 | pricebailey.co.uk | **yes** | **no** | `dilapidations provision` |
| 210 | 9 | bhp.co.uk | **yes** | **no** | `dilapidation provision` |
| 140 | 11 | bhp.co.uk | **yes** | **no** | `dilapidations vat` |
| 140 | 25 | bhp.co.uk | no | **no** | `dilapidations and vat` |
| 140 | 26 | bhp.co.uk | no | **no** | `vat dilapidations` |
| 140 | 29 | bhp.co.uk | no | **no** | `vat and dilapidations` |
| 140 | 30 | bhp.co.uk | no | **no** | `vat on dilapidations` |
| 110 | 4 | pricebailey.co.uk | **yes** | **no** | `dilapidations costs` |
| 110 | 4 | pricebailey.co.uk | **yes** | **no** | `dilapidation costs` |
| 110 | 5 | bhp.co.uk | **yes** | **no** | `dilapidation cost` |
| 110 | 24 | practiceindex.co.uk | no | **no** | `gp surgery for sale` |
| 90 | 17 | pricebailey.co.uk | **yes** | **no** | `dilapidations deposit` |
| 90 | 21 | pricebailey.co.uk | no | **no** | `dilapidation deposit` |

**18 of 18 absent from this page.** The page uses the word `dilapidations` **13 times** and does not contain a
single one of these phrasings, because every one of them is an **accounting** phrasing (`provision`, `costs`,
`deposit`) and the page treats dilapidations only as an exposure. That is the §9.5 specimen failure exactly: the
page has the subject and not the words.

### 3.5 What is present in our page and absent from the market

The reverse direction, which on this page is unusually lopsided. Our page carries and the harvest does not
contain: `last man standing` (14 occurrences), `last partner standing` (2), `Partnership Act 1890` (3),
`joint and several` (4), `partnership at will`, `property partnership`, `notional rent` in a link context.
The market's harvested vocabulary for premises is `dilapidations` accounting and `frs 102 lease` accounting,
neither of which is GP-specific and neither of which is on our page.

### 3.6 Ownership screens applied to the keyword set BEFORE any phrase reaches §7.1

Two families in the table above are **declined on ownership, not on volume**, and V7 governs both: where a brief
and the map disagree, the map wins.

| Family | Vol | Best pos | Decision | Reason |
|---|---|---|---|---|
| `dilapidations vat`, `dilapidations and vat`, `vat dilapidations`, `vat and dilapidations`, `vat on dilapidations` | 140 each, 700 raw | 11 | **DECLINE, in full** | VAT treatment is **O17**, owned by `/blog/gp-vat-registration` (FROZEN to 2026-09-10) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1). Only one of the five is peer-winnable in any case (position 11; the rest sit 25 to 30). A page cannot take a VAT family from a frozen owner it cannot even read the current state of |
| `gp surgery for sale` | 110 | 24 | **DECLINE** | Disposal and sale is **O29** (own-versus-rent, CGT on a later disposal) and, at practice level, wave F's `can-gp-practice-goodwill-be-sold-nhs-rules` and `selling-private-medical-practice-cgt-badr`. Not peer-winnable in any case at position 24 |

Recording the declines with their volumes rather than dropping them silently is §9.2 step 3 discipline.

---

## 4. Competitor teardown

Every URL below was fetched live on 2026-08-26 with `curl -A "Mozilla/5.0" -sS -o - <url>`. `WebFetch` is not
used: it returns 403 where curl returns 200 (`BATCH2_INDEX.md` §10B). **Non-200 responses are recorded with their
status code and never dropped.**

The peer-set URLs came from the harvest (§3.4). The GP-specific URLs did not, and could not, because §3.3 shows
the harvest contains nothing on this topic. They were found by web search on
`"last man standing" GP practice surgery lease liability partnership UK` and then fetched directly. **Four URL
guesses made before the search all returned 404 and are listed in §4.7 rather than hidden**, because guessing a
competitor URL and reporting the 404 as "the market does not cover this" is exactly the false negative §2.2 warns
about on the Bing side.

### 4.1 bhp.co.uk, Dilapidations demystified: accounting, tax and VAT implications
`https://bhp.co.uk/news-events/blog/dilapidations-demystified-accounting-tax-and-vat-implications/` · **HTTP 200**
**Class: PEER** (universe §2a #15, regional generalist with a healthcare team). Holds 17 of the topic's 18
keywords in the harvest, more than any other URL. **This is the page to beat on the accounting vocabulary.**

| | |
|---|---|
| Title | `Dilapidations demystified: accounting, tax and VAT implications - BHP, Chartered Accountants` |
| H1 | `Dilapidations demystified: accounting, tax and VAT implications` |
| Word count | ~1,141 including chrome; the article body is closer to 700 |
| Content headings | `Audit impact`; `Tax impact`; `VAT impact`. That is **three H3s and no H2 at all** in the article body. Everything else on the page is `Related Articles` chrome |
| Tables | **No** |
| Calculator | No |
| FAQ block | No |
| Occurrences: `GP` 0 · `surgery` 0 · `partnership` 0 · `last man standing` 0 · `joint and several` 0 · `notional rent` 0 | |

**Covers, and it covers it well.** The three provision-recognition criteria, verbatim as questions: "Is there a
present obligation resulting from a past event?", "Is there likely to be a transfer of economic benefits?",
"Reliable estimate, can the amount of the obligation be reliably estimated?" It states that the past event is the
date the alterations or damage take place and that the obligation is present if it is specifically contained in
the lease. It states that if all three criteria are met a liability is recognised on the balance sheet, and that
if they are not, a **contingent liability disclosure** may be required. On tax: "Provisions for dilapidation
costs are generally tax deductible when they are recognised in the accounts, as long as they are not capital in
nature", with HMRC's three named capital exclusions (rebuilding the leased premises, restoring demolished
portions, demolishing structures added by the tenant). It then explains **composition payments** (a payment to
the landlord instead of doing the work), that their treatment follows the underlying costs, that the payment "is
considered compensation for not making repairs, not repair expenditure itself", and that it "can be deducted when
accounted for according to accounting standards, regardless of whether the landlord actually makes the repairs".
It closes on the timing lever: recognise as soon as the accounting treatment allows, to accelerate tax relief.

**What it misses.** Everything that makes it a GP page. Zero occurrences of GP, surgery, practice, partnership,
NHS, joint and several, notional rent or last man standing. It is written for a company with a commercial lease
and a balance sheet, and a GP partnership has neither in the form it assumes.

**Consequence for us.** It holds the accounting vocabulary at positions 5 to 10 with a 700-word article carrying
three H3s and no table. We do not beat it on general dilapidations accounting and should not try. We take the
vocabulary onto a page that then answers the question it cannot: what a dilapidations provision does to a **GP
partnership's** accounts when the partner numbers are falling, which is the exact intersection of its subject and
ours.

### 4.2 pricebailey.co.uk, Dilapidations accounting
`https://www.pricebailey.co.uk/blog/dilapidations-accounting/` · **HTTP 403**
**Class: PEER** (universe §2a #5). **Not readable.** 5,544 bytes of block page returned to
`curl -A "Mozilla/5.0"`.

**Recorded, not dropped.** This is a flagged gap per §9.5 section 4. What is known about it comes from the
harvest only: it holds the topic's best positions (`provision for dilapidations` at **4**, `dilapidations costs`
and `dilapidation costs` both at **4**, `dilapidations provision accounting` at 6, `dilapidations provision` at
7). So the strongest incumbent on the peer-winnable phrases is the one page in the set that cannot be read.
**Its headings and depth are unknown and no claim is made about them.** If a human can open it, the coverage
checklist in §4.8 should be re-run against it before the writer starts. Price Bailey also returned 403 to the
language spec's automated fetching on the same day, so this is a site-level block rather than a transient.

### 4.3 practiceindex.co.uk, Surgery Premises Development and Investment
`https://practiceindex.co.uk/gp/money/surgery-premises-development-investment` · **HTTP 200**
**Class: PEER** (universe §2a #6). Holds `gp surgery for sale` at position 24.

| | |
|---|---|
| Title | `GP Surgery Premises Development & Investment | Practice Index` |
| H1 | `Surgery Premises Development & Investment` |
| Word count | ~1,021 |
| Content headings | `Dene Healthcare`; `BW Healthcare Surveyors`; `GP Surveyors`; `Graham + Sibbald`; `Primary Care Surveyors`; `Control Group`, each with a one-line H3 strapline |
| Tables | 2 |
| Occurrences: `dilapidation` 0 · `last man standing` 0 · `partnership` 0 · `notional rent` 0 | |

**Covers: nothing.** Every H2 is a supplier name. **This is a directory of surveyors and procurement firms, not
a content page**, and it ranks at position 24 for `gp surgery for sale` on that basis. It is listed because it is
the only peer URL in the harvest that touches GP premises at all, and what it shows is that the peer set's entire
GP-premises presence is a supplier list.

### 4.4 mills-reeve.com, Last man standing: what GP partners need to know about managing your lease
`https://www.mills-reeve.com/publications/last-man-standing-what-gp-partners-need-to-know-ab/` · **HTTP 200**
**Class: NON-PEER, law firm.** Not in universe §2a and not in §2b. Not in the harvest.

| | |
|---|---|
| Title / H1 | `Last man standing: what GP partners need to know about managing your lease` (identical) |
| Word count | **~680** including chrome |
| Content headings | **`Last word`. One heading.** The rest is `Existing clients`, `Staff`, `Contact`, `How we can help you` chrome |
| Tables | No · Calculator: No · FAQ: No |
| Occurrences: `last man standing` 4 · `tax` **0** · `accounts` **0** · `dilapidation` **0** · `capital account` **0** · `joint and several` **0** | |

**Covers, and three of these are things our page does not have.**
- The **Premises Costs Directions in force 10 May 2024** and the protocol under which "NHS England 'may'
  recommend an assignment of your lease to a nominee body", with the honest caveat "We will have to wait and see
  how this will play out in practice". Our page has the nominee route; it does not date the Directions.
- **"partners should ensure that new partners are joined as a tenant to the lease. This is straightforward and
  you can remove retiring partners at the same time. Doing this regularly means you avoid the situation where you
  need to track down long retired partners as they are still named on the lease."** Our page does not contain
  this at all. It is the cheapest and most practical mitigation on the whole topic and it is missing from ours.
- New partners taking advice on whether they are assuming liabilities that should have sat with prior partners,
  "for example, whether the property has been kept in repair". Ours has a due-diligence list and not this item.
- The **interim provider** route: if no practice will take yours on and the ICB still wants services commissioned
  from the premises, "it is likely they will facilitate an interim provider who will take the lease from you".
  Absent from ours.
- **Alternative-use provisions** and assigning or subletting "if not to another NHS practice, then to a private
  health provider or alternative use".
- The **"Armageddon clause"**, named as such alongside the break right, with a warning to take advice well before
  any break date. Absent from ours, and it is a named term a reader may arrive holding.

**What it misses.** All of it: no tax, no accounts, no provision, no capital account, no joint and several
liability, no Partnership Act, no numbers, one content heading in 680 words.

### 4.5 gpsolicitors.co.uk (DR Solicitors), Beware the 'Last Man Standing' Issue in GP Practices
`https://gpsolicitors.co.uk/beware-last-man-standing-issue-gp-practices` · **HTTP 200**
**Class: NON-PEER, law firm.** Not in the harvest.

| | |
|---|---|
| Title | `Beware the 'Last Man Standing' Issue in GP Practices - DR Solicitors` |
| Word count | ~750 including chrome |
| Content headings | **None.** Every heading on the page is `News`, `Related Articles`, `Contact us today`, `Contact us` |
| Tables | No · Calculator: No · FAQ: No |
| Occurrences: `last man standing` 8 · `tax` **0** · `accounts` **0** · `dilapidation` **0** | |

**Covers, and one item here is the most valuable thing in the whole teardown.**
- A definition framed as an **exit problem rather than a liability problem**: the concern "that one or more
  partner(s) will be unable to retire from a GP practice when they want to, because they are unable to divest
  themselves of the various liabilities and obligations of the practice." Ours frames it as concentration of
  liability. Both are right and the exit framing is closer to what the searcher is actually worried about.
- Named triggers: recruitment difficulty, retirement or emigration clusters, onerous liabilities, and
  specifically **"surgery leases and mortgage redemption penalties"**, plus "death in service or a property
  market crash". **Mortgage redemption penalties appear nowhere on our page** and they are a concrete, checkable
  item on the owner-occupier side.
- A **bank-run analogy** for the dynamic: partners who fear others may leave start "thinking about the likely
  costs of closing the practice and consider leaving while they still can", and once it starts "it is difficult
  to get confidence back".
- Partnership agreements "requiring a gap between retirements", which ours covers well.
- **And this, which is an accounting fact written by a solicitor because no accountant has written it:**
  "ultimately the accountants start wondering whether the business is still a going concern, i.e. able to
  survive. They may then decide that it is prudent to accrue for the potential liabilities, worsening the
  financial position of the practice and hastening its demise."

  **That is our subject, in our vocabulary, on a law firm's page.** It joins the two halves of this pack: the
  dilapidations provision (§4.1) is the accrual, and the going-concern assessment is what forces it. Nobody with
  an accounting qualification has written the sentence, and it is the single strongest whitespace finding in this
  pack (§5.1).

**What it misses.** No tax, no accounts detail beyond that one sentence, no headings, no figures, no structure.

### 4.6 gpsurveyors.co.uk, GP partnership and property: buy into a practice or sign a lease?
`https://www.gpsurveyors.co.uk/gp-partnership-and-property-buy-or-lease/` · **HTTP 200**
**Class: NON-PEER, chartered surveyors.** Not in the harvest.

| | |
|---|---|
| Word count | ~1,429 |
| Content headings | `Exploring the options for prospective partners`; `Buying into a GP practice property`; `The key considerations when buying into a practice property`; `Signing a lease for a GP practice property` |
| Tables | No · Calculator: No · FAQ: No |
| Occurrences: `last man standing` 4 · `notional rent` 4 · `tax` **0** · `accounts` **0** · `dilapidation` **0** | |

**Covers:** the buy-in-versus-lease decision from the valuation chair, with notional rent as the income side.
**Misses:** all tax, all accounting, all deed mechanics. Its H1 is duplicated in the markup, which is a technical
defect on their side and not ours to fix.

**Note for O29's owner:** this is the most direct competitor to `/blog/gp-surgery-premises-own-vs-rent-tax-guide`
(wave B's REFRAME page), not to this one. Passed to that pack rather than acted on here.

### 4.7 drsolicitors.com, GP surgery premises
`https://www.drsolicitors.com/general-practitioners/gp-surgery-premises/` · **HTTP 200**
**Class: NON-PEER, law firm** (same firm as 4.5, different domain and a service page rather than an article).

| | |
|---|---|
| Word count | ~1,068 |
| Content headings | `General Practitioners & Primary Care Networks`; then an FAQ-style H3 run: `Why you need specialist advice for a surgery lease`; `What happens to your share in the surgery premises when you retire`; `Key Contacts` |
| Tables | No · Calculator: No · FAQ: an H3-level FAQ, yes |
| Occurrences: `Premises Costs Directions` 2 · `notional rent` 3 · `partnership deed` 4 · `last man standing` 4 · `tax` 1 · `dilapidation` **0** | |

**Covers:** that the building "usually forms part of partnership capital"; that a standard commercial lease "for
a shop or office is not going to work for a GP surgery"; the need to "fully link rent reimbursement to lease
rental payments"; leases needing flexibility for sub-letting, licensing and PCNs under ICSs; and, on retirement,
that the outcome "depends on what is set out in the partnership deed and/or **declaration of trust document**",
with the observation that minimal premises provisions in the deed are possible but not recommended and that "a
separate declaration of trust is by far the best way of protecting the property owners' respective" interests.

**The one term worth taking: `declaration of trust`.** Our page names the partnership deed and the
property-partnership agreement and never names the declaration of trust, which is the instrument that actually
records who owns what share of a jointly held surgery. It is a precision gain, not a coverage play.

**Misses:** no dilapidations, no accounting, no tax beyond one mention, and it is a service page with heavy
self-description (three CTA blocks), which is the D3 pattern the language spec declines.

### 4.8 Fetches attempted that did not return 200

Listed in full, with status, because a 404 on a guessed URL is not evidence about the market.

| URL | Status |
|---|---|
| `https://www.bma.org.uk/advice-and-support/gp-practices/gp-premises/gp-premises-last-person-standing` | **404** (guessed) |
| `https://www.bma.org.uk/advice-and-support/gp-practices/gp-premises/managing-your-gp-premises` | **404** (guessed) |
| `https://practiceindex.co.uk/gp/blog/last-man-standing/` | **404** (guessed) |
| `https://www.gpsurveyors.co.uk/last-man-standing/` | **404** (guessed) |
| `https://www.gponline.com/will-nhs-englands-plan-de-risk-gp-premises-leases-work/article/1590388` | **403** (real URL, trade press, blocked) |
| `https://www.pricebailey.co.uk/blog/dilapidations-accounting/` | **403** (real URL, PEER, blocked, §4.2) |

**Two real URLs are blocked and one of them is the strongest incumbent.** The BMA has no reachable
last-man-standing page under the paths tried, and no BMA page on this topic entered either the harvest or the
search results, which is notable given that bma.org.uk appears in 15 of 18 head-term SERPs across this niche
(universe §2b). **The institutional authority wall that blocks most of this site's topics is absent here.**

### 4.9 Union of competitor themes minus ours: THE COVERAGE CHECKLIST

Every theme present on any readable competitor page above, minus what our page already covers (§6). §9.9 floor 8
requires zero undecided themes. **16 themes, 16 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **Dilapidations as an accounting provision: the three recognition criteria** (4.1) | **COVER** | 7 peer-winnable phrasings, 1,470 raw volume, positions 4 to 9. It is our subject (the liability the last partner carries) in our discipline (how it hits the accounts). No GP page anywhere carries it |
| 2 | **Tax deductibility of a dilapidations provision, and the capital exclusions** (4.1) | **COVER** | Deductible when recognised in the accounts if not capital in nature; HMRC's three named capital exclusions. Directly answers what a partner facing dilapidations actually wants to know |
| 3 | **Composition payments to the landlord in lieu of works** (4.1) | **COVER, briefly** | One paragraph. Compensation for not repairing, not repair expenditure; treatment follows the underlying costs. Real precision, cheap to add |
| 4 | **Contingent liability disclosure where the criteria are not met** (4.1) | **COVER, one or two sentences** | The honest other branch, and it is the branch a shrinking partnership is most likely to be in |
| 5 | **Going concern, and the accrual that follows from it** (4.5) | **COVER. This is the whitespace anchor** | See §5.1. Written by a solicitor because no accountant has written it |
| 6 | **Joining new partners to the lease as tenants, and removing retiring partners at the same time** (4.4) | **COVER** | Absent from our page. The most practical mitigation on the topic and squarely inside O28 ("what mitigations exist") |
| 7 | **Long-retired partners still named on the lease** (4.4) | **COVER** | The consequence of not doing theme 6. Concrete and checkable |
| 8 | **Mortgage redemption penalties as a trigger** (4.5) | **COVER, one sentence** | Absent from our page. Sits on the owner-occupier side. **Careful: this is the boundary with O29.** One sentence naming it as a last-man-standing trigger, no explanation of the borrowing itself |
| 9 | **The Armageddon clause, named** (4.4) | **COVER, one sentence, inside a NEW block** | The existing break-right H3 is frozen and must not be touched. The term goes in a new block |
| 10 | **Interim provider facilitated by the ICB** (4.4) | **COVER, one sentence** | Adds a route our exit list does not have |
| 11 | **Declaration of trust as distinct from the deed** (4.7) | **COVER, one sentence** | Free precision. Our page names the deed and the property-partnership agreement only |
| 12 | **Premises Costs Directions dated: in force 10 May 2024** (4.4) | **COVER the DATE only** | `house_positions.md` §4 confirms independently: "NHS (General Medical Services) Premises Costs Directions 2024 (in force 10 May 2024, replacing the 2013 Directions)". Two sources agree. **O27 owns the framework; we add the in-force date to a mitigation we already state, and nothing else** |
| 13 | The bank-run analogy for the exit dynamic (4.5) | **DECLINE** | Our §`How the risk concentrates` walk-through already does this job better and at greater length, and it is frozen. Adding a second analogy for the same mechanism is duplication inside one page |
| 14 | Notional rent as the income side (4.6, 4.7) | **ELSEWHERE** | **O27**, `/blog/gp-surgery-notional-rent-vs-cost-rent-explained`. Our page already has one sentence and a link, twice, which is compliant. **Add nothing** |
| 15 | Buy-in versus lease as a decision (4.6) | **ELSEWHERE** | **O29**, `/blog/gp-surgery-premises-own-vs-rent-tax-guide` |
| 16 | VAT on dilapidation payments (4.1) | **DECLINE on ownership** | **O17**, frozen owner. See §3.6. Declined with its volume stated (700 raw across 5 phrasings, 1 of 5 peer-winnable) |

---

## 5. Whitespace

What nobody in the peer set, or in the wider market, covers.

**5.1 Nobody has written the accountant's page on this topic, and the market has noticed the gap out loud.**
Six readable pages on GP premises risk and dilapidations accounting between them, and the split is total: the
three pages that understand the accounting (4.1, and by inference 4.2) contain **zero** occurrences of GP,
surgery or partnership, and the four pages that understand the GP partnership (4.4, 4.5, 4.6, 4.7) contain
**zero** occurrences of `dilapidation` and, between them, one occurrence of the word `tax`. DR Solicitors'
sentence about the accountants deciding "it is prudent to accrue for the potential liabilities, worsening the
financial position of the practice and hastening its demise" is a law firm describing our job to our client
because we have not described it ourselves. **The page that joins a dilapidations provision, a going-concern
assessment and a shrinking partnership does not exist anywhere, and we already own three quarters of it.**

**5.2 Nobody puts a number on anything.** Not one of the six readable pages carries a figure, a table, a worked
example or a statutory reference beyond a date. Ours carries the Partnership Act 1890 three times and the
Premises Costs Directions four times, and no figures. The language spec's finding that zero of nine competitor
pages carry a worked example (§G) holds at 6 of 6 here as well. **On this topic a worked example is not
available honestly** and that is stated in §7.4 rather than worked around: a dilapidations provision is
property-specific and surveyor-assessed, exactly like a premises valuation, and the existing page's refusal to
invent a valuation figure is the correct precedent to extend rather than break.

**5.3 Nobody has a heading.** Mills & Reeve: one content heading in 680 words. DR Solicitors' article: zero. BHP:
three H3s and no H2. Practice Index: six supplier names. Our page has 12 H2s and 14 H3s and a 14-entry FAQ, and
is longer than all six put together. **We do not need to compete on depth here; we need the words.**

**5.4 The exit framing is missing from ours and is what the searcher holds.** DR Solicitors defines the problem
as a partner being **unable to retire**. Our page defines it as liability concentrating. Two of our five Bing
queries use the word `arrangement`, which is the language of someone looking for a structure that lets them get
out, not someone researching a risk. Our frozen H1 and H2s are all risk-framed. **A new block framed as the exit
question is additive, does not touch the frozen framing, and matches the query intent we already convert.**

**5.5 Nobody dates the Premises Costs Directions.** Only Mills & Reeve gives 10 May 2024, and it is the one thing
on that page a reader could act on. Ours cites the Directions four times, undated.

### KEEP, explicitly

Per §9.3 the specialist layer is never traded away, and K1 makes a net loss of specialist content a hard fail.
These are this page's differentiators and stay exactly as they are, byte-identical:

- **The six-partners-to-one illustrative walk-through**, both the leasehold and owner-occupier runs. Roughly 500
  words, explicitly labelled illustrative, no invented figures. Nothing in the market attempts it. **KEEP.**
- **Joint and several liability and the Partnership Act 1890** as the named mechanism. Four occurrences, three
  Act citations, and zero occurrences across all six competitor pages. **KEEP.**
- **The NHS Property Services and BMA standard lease contract-linked break right.** Correctly hedged
  ("typically includes", "the exact wording varies"). **KEEP, and do not restate it in a new block.**
- **The Premises Costs Directions negative-equity protection** (no repayment above actual sale price or best
  price reasonably obtainable). Traces to `house_positions.md` §4. **KEEP.**
- **The two-tier property partnership treatment**, advantages and cautions, including "separating the vehicle
  moves the risk, it does not remove it". **KEEP.**
- **The whole deed section**: retirement caps per accounting period, notice periods, buy-out valuation and
  timing, continuity against accidental dissolution, and the alignment of deed, lease and property-partnership
  agreement. Five H3s, better than anything in the market. **KEEP.**
- **The partnership-at-will warning.** **KEEP.**
- **The assignment, surrender and NHS-nominee exit routes**, including waiver of residual grant repayment.
  **KEEP.**
- **The refusal to state a premises valuation figure or formula, and the refusal to put numbers on the
  recruitment trend.** Both are correct under F6 and F7. **KEEP** (but see §6.4 on how they are worded).

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/gp-partnership-last-man-standing-premises-risk.md`, read in full 2026-08-26.

| | |
|---|---|
| Word count | **3,428** body words (`awk` past the frontmatter fence, then `wc -w`); 5,064 including frontmatter |
| `metaTitle` | `Last Man Standing: GP Partnership Premises Risk` (46 characters) |
| `h1` | `The Last Man Standing Problem: GP Partnership Premises Liability and How to Manage It` |
| `title` | `Last Man Standing: GP Partnership Premises Risk and How to Manage It` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave`. **Written three months before the ownership map existed** |
| Category | `GP Practice Management` (a category with a live TSX route, checked) |
| H2 / H3 | **12 / 14** |
| Question-form H2s | **7 of 12 = 58%**, inside B4's 50 to 75% band |
| FAQ entries | **14** |
| Key takeaways | 5 |
| Tables | **None** |
| Em-dashes | **0** (I1 clean) |
| Figures anywhere on the page | **0**. No `£`, no percentage, one occurrence of `2026` and that is the `date:` field |

### 6.1 Existing H2 sequence, verbatim, in order

Reproduced so the byte-identity check in §7.3 has something to diff against.

```
What last man standing actually means
Why the risk has grown
How the risk concentrates: an illustrative walk-through
The leasehold version of the risk
  The last man standing exposure
  The NHS standard lease and the break right
  Surplus premises and dilapidations
The owner-occupier version of the risk
  Negative equity and surplus premises
  Why incoming partners resist buying in
The two-tier partnership: property-owning and non-property-owning partners
  The advantages
  The cautions
How the partnership deed manages the risk
  Limiting simultaneous exits
  Notice periods and buy-out terms
  Continuity and avoiding accidental dissolution
  How a premises share is valued and bought out
  Aligning the deed, the lease and the property structure
What an incoming partner should check before buying in
What a last man standing partner can actually do
  Assignment, surrender and the NHS routes in more detail
  Surplus and over-specified premises
The tax and accounts angle
Common misconceptions
How we help GP partnerships manage premises risk
```

### 6.2 What is good, and it is a lot

This is a genuinely strong page and better than every competitor page in §4 on every axis except vocabulary. It
is longer than all six readable ones combined, it is the only treatment anywhere that names joint and several
liability and the Partnership Act, the only one with a worked-through concentration mechanism, and the only one
that covers the deed at clause level. Its hedging is correct throughout ("typically includes", "in principle",
"none of these is guaranteed"). It is honest about the limits of every protection it describes. **The gap is
vocabulary and one missing discipline, not quality.**

### 6.3 What is thin or missing

1. **18 of 18 market phrasings absent** (§3.4), and the reason is structural: the page treats dilapidations as an
   exposure (13 occurrences of the word) and never as an accounting event. The words `provision` in its
   accounting sense, `accrue`, `going concern`, `contingent liability` and `FRS 102` appear **zero** times. Six
   occurrences of `provision` exist and every one is a deed provision.
2. **Neither of its own two best Bing queries appears verbatim.** `last man standing gp practice lease` and
   `last man standing arrangement gp practice` are both **0 occurrences**. The page carries the bare stem
   `last man standing` 14 times and `last partner standing` twice. **It is holding position 1 on phrases it does
   not contain**, which is Bing matching on meaning, and which is a fragile way to hold a position.
3. **No table**, against L4, on a page that has at least two natural ones (leasehold versus owner-occupier
   exposure; the exit routes and what each needs). **Careful: a new table may only sit in a new block.**
4. **The Premises Costs Directions are cited four times and never dated** (§5.5).
5. **Missing mitigations**: joining new partners as tenants to the lease, long-retired partners still named,
   mortgage redemption penalties, the Armageddon clause, the interim-provider route, the declaration of trust.
   Six concrete items, all inside O28's scope, all absent (§4.9 themes 6 to 11).
6. **No figures at all.** Correct on the valuation refusal, but it means D1 (every claim carries a figure, date,
   form name or named rule) is carried entirely by the Act and Directions citations. The two dates available for
   free are 10 May 2024 (Premises Costs Directions) and 1890 (already present).

### 6.4 Checked against the CURRENT rules, including V2, and this is where the class defect check lands

The brief flags a class defect found in wave A: pre-existing ownership breaches inside K2-frozen copy, and, on
one page, a live V2 violation narrating our internal ownership rule to the reader in a heading. **Both shapes
were checked here explicitly.**

**V2, headings: CLEAN.** No heading on this page narrates keyword research, search variants or our internal
ownership rule. All 26 headings are natural English about the subject.

**V2, body: CLEAN.** `grep -in "also searched\|also known as\|variant\|word order\|also written\|people search"`
returns nothing. No "also searched as" table cell, no variant list, no sentence telling the reader that two
searches mean the same thing.

**A THIRD, SOFTER SHAPE IS PRESENT, AND IT IS NOT V2. Escalating it rather than resolving it.** The page narrates
its own **editorial process** to the reader in six places:

| Line | Text |
|---|---|
| 72 | "We keep this factual and avoid putting numbers on the trend, because the national picture varies and the point that matters is the dynamic, not a statistic." |
| 114 | "We explain the structure at a high level here and cover its tax detail ... in the own vs rent tax guide." |
| 126 | "The levers below are framed as matters to ensure your deed addresses ... rather than as drafting advice." |
| 142 | "We deliberately do not suggest a valuation figure or formula here, because a premises valuation is property-specific and a matter for a surveyor." |
| 177 | "Kept proportionate, because the detail lives in the sibling guides." |
| 41 (FAQ) | "These are matters to settle with your solicitor and accountant, framed as ensuring the deed addresses them rather than as drafting advice here." |

**Why this is not V2 and should not be filed as one.** V2 bans narrating the **keyword research**. This narrates
the **scoping and ownership decisions**, which is a different rule and currently an unwritten one. The two at
lines 126 and 142 are also defensible on their own terms: refusing to give a valuation figure is F7 behaviour
(state the absence, do not smooth it over) and the drafting-advice framing is I3 behaviour (no regulated-activity
claim). **"Kept proportionate, because the detail lives in the sibling guides" is the one with no such defence:
it is our content architecture, addressed to a reader who has no stake in it, and it opens the H2 that carries
the most ownership-sensitive material on the page.**

**The manager's call, not the writer's, and the writer's allowance for it is ZERO.** K2 freezes every line above.
The writer changes none of them, adds no new instance of the shape, and does not comment on them in the copy.
Two open questions for the manager, phrased so they can be answered once for the whole batch:
1. Is process narration ("we deliberately do not", "kept proportionate", "the detail lives in") a rule in its own
   right, or is it acceptable house voice below some count? It appears **6 times on this page**, which under the
   general V9 shape rule (no single clause shape more than twice per page) is over cap on its own.
2. If it is a rule, does batch-1 coordinator ruling 3 reach it? That ruling clears **factual corrections** inside
   frozen copy. This is not a factual correction, which is the same question D8 raises about the PCN page's ARRS
   block. **Answering it once settles both.**

### 6.5 Pre-existing ownership breaches inside frozen copy. Escalated, allowance ZERO

The page predates the map by three months. Everything below is the map being applied to copy written before it
existed, so it is not writer error, and K2 forbids the writer resolving any of it.

| Row | Owner | What this page already does | Verdict |
|---|---|---|---|
| **O27** notional rent, cost rent, district valuer, Premises Costs Directions framework | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | Names notional rent 4 times, always with a link, never explaining the valuation basis. Never names cost rent or the district valuer at all. Cites the Premises Costs Directions 4 times, but only for the negative-equity protection and the nominee and waiver routes | **COMPLIANT.** See the boundary question below |
| **O28** last-man-standing mechanism, personal liability, mitigations | **THIS PAGE** | Owns it | **CORRECT** |
| **O29** own-versus-rent, capital, borrowing, CGT on disposal, capital-account consequence | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | **Three separate touches of the loan-interest deduction**: line 118 ("the rent stream, with its interest deduction, is cleanly separated in its own vehicle, which keeps the income and the relief on the same side"), line 177 ("the loan-interest deduction against the rent"), line 189 ("the rent income and interest deduction sit in the right vehicle"). Plus borrowing at lines 82, 106 and 158, and CGT at 114 and 177 | **MILD BREACH, PRE-EXISTING.** No single instance explains anything; each is a clause. Cumulatively the page states O29's interest-deduction fact three times without ever handing it off in the sentence that states it. Two of the three sit inside CTA-adjacent copy. **Escalate. Writer allowance for new O29 material: ZERO** |
| **O30** the partnership capital account itself | frozen partnership set, wave E | Names capital accounts at lines 146, 177 and 189, and "their capital (their share of the building)" at 82. **Never explains what a capital account is.** Line 177 hands off explicitly: "For the partnership and capital-account basics, see our GP partnership tax guide" | **COMPLIANT in substance, over on sentence count.** O30 says one sentence and a link only, and this is four touches with one link. No explanation, so nothing is annexed. **Escalate as a count observation, not a breach. Writer allowance: ZERO** |
| **O19** core GMS contract and Global Sum | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` (wave A) | Says "core NHS contract" 3 times, purely as the thing the break right is tied to. **No Global Sum, no Carr-Hill, no GMS/PMS/APMS comparison, no figure** | **COMPLIANT** |
| **O35** employment-status fork | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 2026-09-10**) | Says "a salaried role or a non-property-owning partner route" twice, and "salaried GP" once inside the walk-through. **Never builds the four-role table, never states a tax treatment for either role** | **COMPLIANT** |
| **O17** VAT exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) | Zero occurrences of VAT anywhere on the page | **COMPLIANT, and §3.6 keeps it that way** |

**O30's link target was checked live, as the row requires.**
`Medical/web/content/blog/gp-partnership-tax-complete-guide.md` exists in the corpus and the slug is row 8 of the
frozen list, which means it is a live monitored page rather than a missing one. The link at line 177 resolves.
**All six other internal link targets on the page were checked the same way and all resolve:**
`becoming-gp-partner-financial-implications` (frozen row 2), `gp-surgery-notional-rent-vs-cost-rent-explained`,
`gp-surgery-premises-own-vs-rent-tax-guide`, `gp-partnership-profit-sharing-tax-planning` (wave E) all exist as
posts; `/blog/gp-practice-management` is a live TSX category route (verified in
`Medical/web/src/app/blog/`, and note batch-1 coordinator ruling 5: a route is resolved by checking the route,
not by looking for a file whose name matches); `/for-gps` and `/contact` both exist as routes. **Zero dead links.**

**A boundary question the writer must NOT resolve, raised for ratification.** O27 gives
`/blog/gp-surgery-notional-rent-vs-cost-rent-explained` "the Premises Costs Directions framework". O28 gives this
page "what mitigations exist". **The negative-equity clawback protection and the NHS-nominee assignment and
grant-waiver routes are both: they live in the Premises Costs Directions and they are last-man-standing
mitigations.** This page currently states all three, in depth, and the notional-rent page may well state them
too. I am not moving the line. **Proposed clarification in §9: O27 owns the Directions as a REIMBURSEMENT
framework (how notional rent and cost rent are set and reviewed); O28 owns the Directions' EXIT and CLAWBACK
provisions.** If the O27 pack writer reaches the same split independently, that is the batch-2 O7 signal and it
should be ratified rather than argued.

---

## 7. Deterministic acceptance criteria

### 7.1 The named missing-phrase list the 14 and 28-day read is measured on

**Five phrases. This is the whole list and it is deliberately short**, because §3.6 declined two families on
ownership and §7.1a caps three word-order families at two, one and two respectively. A longer list on this page
would be a V1 breach dressed as thoroughness.

**Tier A: the equity phrases. Highest priority, and phrase 1 is the wave's success test.**

| # | Phrase | Source | Current Bing pos | Why |
|---|---|---|---|---|
| 1 | `last man standing gp practice lease` | Bing named query, 2 impr, **1 click**, **pos 1** | **1** | The single most valuable phrase on this page. **Held at position 1, converting, and absent from the copy.** §8's primary test is measured on this exact string |
| 2 | `last man standing arrangement gp practice` | Bing named query, 1 impr, **1 click**, **pos 1** | **1** | Second converting phrase, and it introduces the noun `arrangement`, which two of the five queries use and the page never does |

**Tier B: peer-winnable market phrases, ordered peer-winnable first then volume.**

| # | Phrase | Vol | Best pos | Held by | Peer-winnable |
|---|---|---|---|---|---|
| 3 | `provision for dilapidations` | 210 | **4** | pricebailey.co.uk | yes |
| 4 | `dilapidations provision accounting` | 210 | **6** | pricebailey.co.uk | yes |
| 5 | `dilapidations costs` | 110 | **4** | pricebailey.co.uk | yes |

**Countable test: 5 of 5 present verbatim (case and punctuation normalised). Any absent phrase is a named BLOCK.**

Attached peer-winnable volume: **530**. Attached Bing equity: **3 clicks and 3 position-1 holds**, which on this
page is worth more than the volume figure and is the number §8 is written against.

### 7.1a V1 ENFORCEMENT. This page has THREE word-order families and the cap binds on every one

**V1 is a hard cap of two word orders per idea per page, counted as non-overlapping longest matches, never raw
substrings. Any V1 finding must quote the spans it counted.** On this page V1 has an unusual shape: the five Bing
queries are five word orders of **one** idea, and the market keyword table is seven word orders of **a second**
idea and three of a third. A writer placing everything relevant would place fifteen orders of three ideas. **The
cap allows five phrases in total.**

**Family A: the last-man-standing family. Five orders exist. TWO are placed.**

| Order | Placed? | Reason |
|---|---|---|
| `last man standing gp practice lease` | **PLACE** | Highest impressions, converts, position 1, and it is §8's test string |
| `last man standing arrangement gp practice` | **PLACE** | Converts, position 1, and carries the `arrangement` noun that covers the residual family semantically |
| `last man standing lease gp pracitce` | **UNPLACED, deliberately** | **This is a misspelling of "practice", and it is a QUERY, not a phrase to place.** It cannot be written as English. Bing's matcher already reaches it through the correctly spelled copy, which is how it earned its click at position 1 in the first place. Writing a misspelling into live copy to chase a one-impression query would be a J2 pipeline artefact and a quality-bar failure |
| `last man standing arrangement gp contract` | **UNPLACED, deliberately** | Third order of Family A, blocked by V1. Also carries `contract`, which drifts toward O19 |
| `last partner standing arrangement` | **UNPLACED, deliberately** | Fourth order of Family A, blocked by V1. The page already contains `last partner standing` twice in existing frozen copy, and placing this order would push the counted family to three |

**Family B: the dilapidations-provision family. Seven orders exist. TWO are placed.**
Placed: `provision for dilapidations`, `dilapidations provision accounting`.
Unplaced, deliberately: `dilapidations provision`, `dilapidations provisions`, `dilapidation provision`,
`dilapidation provisions`, `dilapidation provision accounting`. All five are singular/plural or article
permutations of the two placed orders and all sit at positions 5 to 9 on the same two peer URLs.

**Family C: the dilapidations-cost family. Three orders exist. ONE is placed.**
Placed: `dilapidations costs`. Unplaced, deliberately: `dilapidation costs`, `dilapidation cost`.
**One rather than two, on purpose.** The two remaining orders differ from the placed one by a single `s`.
Placing a second would sit exactly at the cap and read as keyword stuffing to any human, which is the K6 test
(a section or phrase that exists only to hold a phrase is a fail). V9's standing instruction is to prefer zero
over the cap where the cap can be reached without adding meaning.

**Ten of fifteen word orders are deliberately unplaced, and every one is named above with its reason.** That is
the V1 report, and it is required output, not a shortfall.

**THE SPANS TO COUNT, quoted, so a QA finding is checkable and a false positive is visible.** Match longest
first, consume the matched span, count what remains.

| Span to consume | Length | Note |
|---|---|---|
| `last man standing gp practice lease` | 6 words | Family A, order 1 |
| `last man standing arrangement gp practice` | 6 words | Family A, order 2 |
| `dilapidations provision accounting` | 3 words | Family B, order 1 |
| `provision for dilapidations` | 3 words | Family B, order 2 |
| `dilapidations costs` | 2 words | Family C, order 1 |

**The false positive this page will generate, and QA must not raise it.** The existing frozen copy contains the
bare stem `last man standing` **14 times** and `last partner standing` **twice**. A naive substring counter will
consume the two placed Family A spans and then report 14 further "matches" of `last man standing`, and will
conclude the page carries sixteen word orders of one idea. **It carries two.** The bare stem is the page's
subject noun, not a word order of it: it appears in the frozen `h1`, `metaTitle`, `title`, in four frozen H2s and
H3s, and throughout frozen body copy, none of which the writer may touch. Under the longest-match rule the two
placed spans consume their own occurrences and the residual bare-stem occurrences are the topic term. **A V1
finding on this page that does not quote its spans is a false positive by construction.**

### 7.2 Equity preservation (§9.9 floor 5)

**All 5 Bing named queries in §2.2 must still match** in `metaTitle`, `h1`, `title`, an H2, an H3, an FAQ or body
prose after the change. Google contributes 0 rows, so the combined equity set is **5**.

**Countable test: 5 of 5 matchable.** Run
`python scripts/track2_query_coverage.py --slug gp-partnership-last-man-standing-premises-risk --json`.

**This floor is nearly free on this page and it is worth saying why**, so nobody mistakes it for a pass earned by
the change. The change is additive only, nothing existing is removed, and all five queries currently match
against text that is frozen. **The five cannot be lost by this change.** The risk this page carries is not
match-loss, it is rank-loss on a matched query, which is a different failure and is what §8 tests.

### 7.3 EXTEND byte-identity

Diff the pre and post files. The following must be byte-identical:

- `metaTitle: "Last Man Standing: GP Partnership Premises Risk"`
- `h1: "The Last Man Standing Problem: GP Partnership Premises Liability and How to Manage It"`
- `title: "Last Man Standing: GP Partnership Premises Risk and How to Manage It"`
- `metaDescription`, `slug`, `canonical`, `category`, `date`, `image`, `imageCredit`, `altText`, `summary`,
  `generator`, `author`, `schema`
- **All 12 existing H2 strings, in their existing relative order** (§6.1)
- **All 14 existing H3 strings**
- **All 14 existing FAQ question and answer strings**
- **All 5 existing `keyTakeaways` strings**
- Every existing `<p>`, every existing `<li>`, every existing `<a href>`

**Countable test: `git diff` shows ONLY additions. Deletion count must be 0.**

**There is no cleared exception on this page.** The two stale-framing escalations that the QOF pack carries have
no analogue here: nothing on this page is stale against `house_positions.md` (§7.5). The escalations in §6.4 and
§6.5 are explicitly **not** clearances, and the permitted deletion count remains zero unless the manager rules
otherwise in writing.

### 7.4 Arithmetic, and the figures that are BANNED

**The existing page contains no arithmetic and no figures at all** (§6). The new blocks should not introduce any.

**Countable test: `arithmetic_recomputed[]` is empty, or every worked figure is re-derived from explicitly
labelled illustrative inputs.**

**No worked example on this page, and this is a deliberate G1 decision.** G1 requires exactly one worked example
on a page whose topic involves a calculation, a threshold, a taper or a band, and none on a page that is
procedural or judgement-based. **This page has no threshold, no band and no rate.** A dilapidations provision is
a surveyor's estimate of a property-specific liability, and a premises share is a surveyor's valuation. The
existing page already refuses to invent a valuation figure (line 142) and that refusal is the correct precedent
to extend to the provision. **Inventing an illustrative dilapidations figure would give the page's most
attackable claim a number, on a topic where the market's own specialists publish none.** Recorded as a G1
decision with a reason, so QA reads it as a decision and not an omission.

**BANNED FIGURES on this page. None of these may be asserted:**

| Banned | Why |
|---|---|
| Any **GMC annual retention fee** figure | `house_positions.md` §8 and the Verification log: **UNVERIFIED as at 2026-08-26**, and the previously stated "around £433" was REMOVED as unsupported. GMC returns HTTP 403 to automated fetch. **This is the only remaining item under the F5 ban** (see the note below). Not otherwise relevant here; listed for completeness |
| Any **dilapidations figure, provision amount, rate per square foot or premises valuation** | Property-specific and surveyor-assessed. No source. F6 and F7 |
| Any **quantified claim about the GP recruitment or partnership-numbers trend** | F6 and I6, no fabricated statistics. The existing page already declines this at line 72 |
| Any **£ figure for a lease, rent, buy-in or buy-out** | Same |

**F5 has been narrowed and this page must be scored against the narrowed version.** As written, F5 is a hard fail
for a numeric within 30 words of "global sum", "weighted patient" or "QOF point". `house_positions.md` §3.A and
§3.B are both now headed "VERIFIED AT SOURCE 2026-08-26, block lifted" and lock the Global Sum at **£130.07** and
the QOF point value at **£227.95** for 2026/27. **`BATCH3_INDEX.md` §6.1 rules F5 narrowed to the GMC annual
retention fee alone.** Neither the Global Sum nor the QOF point value is relevant to this page and neither may
appear on it, but the reason is **ownership** (O19 and O25, and O25's owner is a batch-1 page inside its own read
window), **not verification**. A verification ban and an ownership fence are different things and a writer must
not read the lifting of one as the lifting of the other.

**Countable test: count of banned-figure assertions on the page = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify | Status |
|---|---|---|
| NHS (General Medical Services) Premises Costs Directions 2024, **in force 10 May 2024**, replacing the 2013 Directions | `house_positions.md` §4 (verified at the HP-lock gate 2026-06-03) **and** mills-reeve.com (4.4). **Two independent sources agree** | **SAFE to state** |
| Owner-occupier repayment capped at actual sale price or best price reasonably obtainable | `house_positions.md` §4; already on the page | Already stated, frozen, no change |
| Assignment to an NHS nominee body, and waiver of residual grant repayment | Premises Costs Directions 2024; mills-reeve.com corroborates the nominee protocol as one NHS England "may" recommend | Already stated, frozen. **Do not upgrade "may" to "will"** |
| Partnership Act 1890, joint and several liability of partners | `house_positions.md` §4 context; the Act itself, https://www.legislation.gov.uk/ukpga/1890/39 | Already stated, frozen |
| NHS GP goodwill cannot be sold (SI 2019/251, from 1 April 2004 under SI 2004/906) | `house_positions.md` §4 | **Relevant if a new block touches practice sale. Prefer not to; it is O29 and wave F** |
| Dilapidations provision: the three recognition criteria, balance-sheet recognition, contingent liability disclosure | **FRS 102 Section 21 (Provisions and Contingencies).** bhp.co.uk (4.1) states the criteria without naming the standard | **VERIFY THE STANDARD AT SOURCE BEFORE NAMING IT.** A competitor blog is not a source. If FRS 102 s.21 is not read directly, state the criteria without a standard reference |
| Dilapidations provisions deductible when recognised in the accounts if not capital in nature; the three capital exclusions | bhp.co.uk (4.1) only. **HMRC BIM43265 and the repairs guidance at BIM46900+ are the likely anchors** | **VERIFY AT HMRC BEFORE STATING.** Single-source, and it is a tax-deductibility claim, which is the highest-risk class on the page |
| Composition payments: compensation for not repairing, treatment follows underlying costs, deductible regardless of whether the landlord does the works | bhp.co.uk (4.1) only | **VERIFY AT HMRC BEFORE STATING.** Same reason |
| Going concern assessment and the accrual that follows | FRS 102 Section 3 / FRS 105 as applicable, plus the general going-concern basis | **VERIFY. Do not cite DR Solicitors as the authority for an accounting standard.** Their sentence is evidence the gap exists, not evidence of the rule |
| Joining new partners as tenants to the lease; long-retired partners still named | mills-reeve.com (4.4) | Practice observation, not a legal rule. **State as what practices should ensure, never as a rule** |
| Mortgage redemption penalties as a trigger | gpsolicitors.co.uk (4.5) | Practice observation. **One sentence, no explanation of the borrowing (O29)** |
| Armageddon clause | mills-reeve.com (4.4) | A market term of art. **Name it and gloss it in one clause; make no claim about what any particular lease contains** |
| Declaration of trust as the instrument recording shares in jointly held premises | drsolicitors.com (4.7) | **One sentence, and it is a legal instrument, so frame it as something to check with a solicitor (I3)** |

**Countable test: every external factual claim in the new blocks maps to a row above with a fetch date. Count of
unverified claims = 0.** Four rows above are marked VERIFY and are the writer's blocking prerequisites. **If HMRC
and FRS 102 cannot be read at source, the tax-deductibility and composition-payment material is DROPPED, not
softened**, and themes 2 and 3 of §4.9 are reported as unwritten. Dropping is the correct outcome; hedging an
unverified tax claim is not.

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug gp-partnership-last-man-standing-premises-risk` | Gate bar met; **0 covered queries lost** |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | **Empty** (§7.4). If non-empty, every figure re-derived from labelled illustrative inputs |
| 3. Statute verified at source | `statute_checks[]` | Every VERIFY row in §7.5 fetched and content-verified, or its material dropped |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | **0 HARD 404s repo-wide**; new links resolve via `slug_resolver.py`. Note the corpus currently ships one known sitemap 404 (`/blog/employment-status`, defect D1) which is **not this page's and must not be fixed here** |
| 5. Equity preservation | §7.2 | **5 of 5** Bing named queries still match |
| 6. Cluster coverage | §7.1 | **5 of 5** assigned phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No movement.** No NO-PAGE topic attaches to this page (§1), so nothing moves between the `NO-PAGE` and `assigned` buckets and the ledger is unchanged by this page |
| 8. Competitor re-read | §4.9 | **16 themes, 16 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere in the new copy, including new FAQ answers and new key takeaways. The page
   is currently at 0 and must stay there. Hard fail I1.
2. **No new internal link inside any existing paragraph.** New links live in new blocks only.
3. **No new table inside an existing section.** L4 wants a table and K2 forbids restructuring, so any table sits
   inside a new H2 block.
4. **No worked example** (§7.4, G1 decision with reason).
5. **Do not touch any frozen page.** 19 slugs, `BATCH3_INDEX.md` §1, including three `status='flagged'` rows.
   Contextual links to their live URLs are fine and two already exist on this page.
6. **No collapse, no redirect, no URL change** (§5 locked rules, K4).
7. **Never state or imply that NHS GP goodwill can be sold.** `house_positions.md` §4: prohibited since 1 April
   2004, current instrument SI 2019/251. A page about a partner who cannot exit is exactly where that error would
   be tempting.
8. **Never use dental framing.** No UDAs, no dental bands (`house_positions.md` §3).
9. **The word "consultant" is not used in its clinical sense on this page and should stay that way.** Dossier §8
   flags seven topics where "consultant" reads as a tax adviser to Google.
10. **V9 shape check.** The page's frozen copy already runs the corrective contrast ("rather than", "not X, it is
    Y") heavily and runs process narration 6 times (§6.4). **The new blocks add zero instances of either.** The
    conductor runs the cross-wave shape check after drafting, per `BATCH3_INDEX.md` §6.3.
11. **No interruptive UI.** Two already exist site-wide (`DeepScrollModal`, `ReturningBar`, defect D6). **They are
    not this page's to add to or remove.**

---

## 8. Stated expectation, written before the work

### The baseline, restated at both levels so a later read compares like with like

| Measure | Value | Endpoint |
|---|---|---|
| Google clicks / impressions | **0 / 0** | GSC, page and page+query, 2026-05-25 to 2026-08-23 |
| Bing clicks / impressions, page level | **3 / 8** | `GetPageStats`, snapshots 2026-07-17, 2026-07-24, 2026-08-21 |
| Bing average impression position, **page level** | **2.0** (impression-weighted; **not 1.0**, see §2.3) | `GetPageStats` |
| Bing clicks / impressions, named-query level | **3 / 6** across 5 queries | `GetPageQueryStats` |
| Bing position on `last man standing gp practice lease`, **named-query level** | **1** | `GetPageQueryStats` |
| Named phrases from §7.1 present today | **0 of 5** | source file |

Pro-rated to 28 days the click figure is `3 x 28 / 90 = 0.93`. **That is why this page does not get a traffic
test.** A test built on a number that rounds to one click cannot be failed or passed by anything the content does.

### 8.1 THE PRIMARY TEST, and why it is a position test and not a traffic test

> **At the 28-day read, `/blog/gp-partnership-last-man-standing-premises-risk` must still hold Bing average
> impression position 1 to 3 on the named query `last man standing gp practice lease`, measured at
> `GetPageQueryStats` named-query level, not at `GetPageStats` page level.**

**Baseline: position 1.** Measured 2026-08-26 on the 2026-07-17 snapshot.

**Stated at named-query level deliberately, correcting `BATCH3_INDEX.md` §8.** The index's wave-B test says
"position 1 to 3" against a baseline it prints as 1.0, but its 1.0 is a page-level figure and the true page-level
figure is 2.0 (§2.3). Read against page level the test would start at 2.0, a drift to 3 would pass, and a real
loss would be scored as a hold. Read at named-query level on a named string it starts at 1 and is falsifiable.
**The string is the test. A position test with no query named is not a test.**

### 8.2 What this test is actually for, and it is bigger than this page

This is the batch's control experiment on the EXTEND grade itself.

Every EXTEND page in batch 3 is additive-only on the theory that additive-only changes cannot move structural
equity, and §8 of the index states that theory outright: "All five EXTEND pages are additive-only, so structural
equity cannot move." **That is an assumption, and until now nothing in the programme has been in a position to
test it.** A page at position 12 that moves to 15 tells you nothing; the noise is larger than the signal. **This
page is at position 1 on a named query, on a corpus with a live 90-day window, and there is nowhere above
position 1 to hide a measurement error.** If an additive-only change moves this, then either additive-only
changes do move structural equity or the equity was never as stable as the grade assumes, and in both cases the
EXTEND grade needs re-examining across the whole batch before wave G rewrites twenty-four commercial pages on
the same theory.

**So the escalation is written now, before the work, with the action attached:**

> **If this page's Bing named-query position on `last man standing gp practice lease` falls below 3 at the 28-day
> read, do not treat it as a page-level problem. Revert this page, hold every remaining EXTEND page in batch 3,
> and re-derive the additive-only assumption in `REWRITE_PROGRAM.md` §9.2 before any further EXTEND work on any
> site.** The revert is one command (§1). The hold costs a fortnight. Discovering the same thing after wave G
> costs twenty-four pages.

Conversely, **a clean hold at position 1 to 3 is the first real evidence the estate has that the additive-only
rule does what it claims**, and it is worth recording as such rather than as a routine pass.

### 8.3 The secondary tests, Bing, 14 to 28 days

1. **Named-phrase impressions.** At least **2 of the 5** phrases in §7.1 return at least one Bing impression for
   this URL in a 28-day window. Today the count is **0 of 5**. The bar is 2 rather than a proportion because the
   whole page earns 6 named-query impressions in 90 days, so a bar of 3 or more would be asking the page to more
   than double its total impression count to pass.
   **Per §9.6 point 2, total impressions rising while all 5 named phrases stay absent is DRIFT and is recorded as
   a FAIL, not a pass.**
2. **The three converting queries keep converting.** `last man standing gp practice lease`,
   `last man standing lease gp pracitce` and `last man standing arrangement gp practice` each returned a click
   from a position-1 impression. At the 28-day read, **at least 2 of the 3 must still return an impression**.
   Any one that stops returning an impression for two consecutive 28-day windows is a named **BLOCK** and is
   investigated before any further change to this URL.
3. **Impressions, page level, as a floor not a target.** At or above **8** in a rolling 90-day window. This is a
   floor to catch a collapse, not a growth target, and it must never be read as the success criterion. A rise
   here with the §7.1 phrases still at zero is drift (test 1).

### 8.4 Google, 28 to 90 days

**No expectation is set, deliberately.** Google returns page-dimension rows for 21 of 138 URLs on this domain.
A page not appearing at 28 days carries no information. **If any query-level Google row appears at all it is
recorded as new information and nothing is concluded from its absence.**

### 8.5 Failure trigger, written as a number, before the change

> **Primary: if the Bing named-query position on `last man standing gp practice lease` falls below 3 in any
> rolling 28-day window between deploy and deploy+56 days, revert with**
> `git checkout ad4800ebac954b74ecd2efe1e2c80eb10975b685 -- Medical/web/content/blog/gp-partnership-last-man-standing-premises-risk.md`
> **and escalate per §8.2.**

> **Secondary: if Bing clicks on this URL fall to 0 across two consecutive 28-day windows, revert.** The baseline
> is 3 in 90 days, so a single zero window is inside normal variation on these volumes and is not a trigger. Two
> consecutive is.

> **Tertiary, on the wave: if combined wave-B Bing clicks across the three URLs fall below 3 (from a page-level
> baseline of 4) at the 28-day read, hold the wave.** Stated because `BATCH3_INDEX.md` §8 sets a wave-level
> revert for wave A and none for wave B, and a wave with a 4-click baseline needs a floor rather than a percentage.

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day Bing read.
No internal-link pass, no meta pass, no image change, or attribution is lost.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **5 missing
phrases from §7.1**, not with the 5 Bing queries the page already ranks for. Populating it with the equity set
re-measures the past.

**No monitor is created by this pack.** Registration in `monitored_pages` is a separate owner-triggered step and
has not been done. Reading a tracker is a pull, not a push.

---

## THE OWNERSHIP MAP, reproduced verbatim and in full for every row that constrains this page

**The rule, restated because it is the reason this block exists: every shared fact has exactly ONE owning page.
Every other page gets one sentence and a link, never the explanation. A writer who needs three sentences is
taking someone else's fact and must stop.**

**V7 is binding: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the map, states
neither fact, and reports the conflict. A conductor writes several briefs quickly and can reach for the same
compelling fact in more than one of them; the map is the single place where duplication is visible. A brief is an
instruction about ONE page, and only the map can see the batch.

### The new wave-B rows (`BATCH3_INDEX.md` §6.2), verbatim

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O27** | **Notional rent and cost rent**: what each is, how the district valuer sets notional rent, the current-market-rent basis, reviews, and the Premises Costs Directions framework. | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | The own-vs-rent page gets **one sentence** naming reimbursement as the income side, then link. It must not explain the valuation basis. |
| **O28** | **Last-man-standing lease risk**: the mechanism, why it is a personal liability, and what mitigations exist. | **`/blog/gp-partnership-last-man-standing-premises-risk`** (THIS PAGE) | The own-vs-rent page gets one sentence, then link. This page holds Bing position 1.0 on the phrase and its equity is the phrase itself. |
| **O29** | **The own-versus-rent decision**: capital, borrowing, the tax treatment of owning surgery premises, CGT on a later disposal, and the partnership capital-account consequence. | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | The other two premises pages get one sentence each, then link. |
| **O30** | **The partnership capital account itself** (how premises equity sits in it) | frozen partnership set, wave E | Wave B: **one sentence and a link only**, and the link target must be checked live because five partnership pages are frozen. Do not explain capital accounts in wave B. |

### The cross-wave and inherited rows that also bind this page, verbatim

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O9** | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** |
| **O10** | Global Sum per weighted patient (**£130.07, 2026/27, VERIFIED**) and the QOF point value (**£227.95, 2026/27, VERIFIED**) | `house_positions.md` §3.A and §3.B | Wave A: the GMS page may state £130.07 with its year tag. **No page in wave A states a QOF point value, but the reason is now ownership (O25), not verification.** |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **Wave A**: the dispensing page gets one sentence on zero-rating and a link. **Wave F**: `private-practice-tax-nhs-and-private-income` gets one sentence. Neither explains the exemption. |
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12.** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **Wave A: one sentence and a link, on every page.** Not reopened in this batch. |
| **O35** | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

### What this page may write, in one table, so the writer never has to interpret the rows above

| Fact | This page's allowance |
|---|---|
| The last-man-standing mechanism, personal liability, and every mitigation | **Full ownership. Write it.** This is O28 |
| Dilapidations as an exposure, a provision, and its accounting and tax treatment | **Write it**, subject to the §7.5 VERIFY gates. No row assigns it elsewhere and §9 proposes it be added to O28 explicitly |
| Notional rent, cost rent, district valuer, Premises Costs Directions as a reimbursement framework | **One sentence and a link. Already present twice. ADD NOTHING NEW** except the 10 May 2024 in-force date attached to a mitigation this page already states |
| Own-versus-rent, borrowing, mortgage redemption penalties, CGT, SDLT | **One sentence and a link.** Already at or over its allowance (§6.5). **New O29 material allowance: ZERO**, except the single sentence naming mortgage redemption penalties as a trigger, which is a trigger fact and not a borrowing explanation |
| The partnership capital account | **One sentence and a link only. Already present. ADD NOTHING NEW.** Link target verified live (§6.4) |
| The core GMS contract, Global Sum, Carr-Hill, GMS/PMS/APMS | **Naming "the core NHS contract" only, as the thing the break right attaches to. No explanation, no figure** |
| QOF | **Do not mention** |
| VAT, on dilapidations or anything else | **Do not mention.** §3.6 declines the family on ownership |
| The employment-status fork, salaried versus partner tax treatment | **Naming a salaried role as a career alternative only. No tax treatment** |
| Any GMC fee figure | **Never** |

---

## Corrections to the index, the dossier and the map

**C1. `BATCH3_INDEX.md` §2.5 and §5 print this page's Bing average impression position as 1.0. The page-level
figure is 2.0.** Impression-weighted across the three in-window snapshots: `(1x3 + 3x3 + 2x2) / 8 = 2.0`. The
unweighted mean is also 2.0. **1.0 is the correct figure at named-query level for the three click-earning rows,
and it has been carried into a page-level column.** This is defect D2 in its subtler form: the endpoints agreed
on clicks and impressions closely enough that a position figure crossed between them unnoticed. **Amend both
cells to 2.0 and label the column with its endpoint.** Not amended by this task; `BATCH3_INDEX.md` belongs to
another window.

**C2. The wave-B success test in `BATCH3_INDEX.md` §8 is not falsifiable as written and this pack restates it.**
"must still hold Bing position 1 to 3" does not name the endpoint. Against page level it starts at 2.0 and a drift
to 3 passes while representing a real loss; against named-query level on a named string it starts at 1. §8.1
restates it as named-query level on `last man standing gp practice lease`. **Amend §8 to name the endpoint and
the query string.**

**C3. The revert anchor in the batch index and in every batch-3 brief is already stale, one working day after it
was corrected.** `BATCH3_INDEX.md` §0.8 records `d2e75655` as the anchor after correcting an earlier wrong sha.
HEAD is now `ad4800eb` and `d2e75655` is an ancestor, so a revert to it succeeds silently and undoes an unrelated
commit as well. **The index's own instruction is the fix and it should be promoted from prose to a rule: no pack
inherits a sha, every pack derives it with `git rev-parse HEAD` at write time.** A pack whose revert command is
wrong is worse than a pack with no revert command, because it will run.

**C4. O21 is used for two different facts across the two indexes, and one of them will be silently lost.**
`BATCH2_INDEX.md`'s closing amendment creates **"New row O21. Owner: `/blog/gp-vat-registration`"** for the VAT
registration threshold family. `BATCH3_INDEX.md` §6.2 independently creates **O21 for ARRS**, owned by
`/blog/arrs-reimbursement-employing-pcn-staff-tax`. Two facts, two owners, one number, and batch 3's §6.1 carries
batch 2's rows forward "unchanged in meaning" without noticing the collision. **A pack citing O21 is ambiguous
and a QA agent resolving a finding by row number will resolve it against the wrong fact.** Proposed fix: renumber
the VAT-threshold row to **O36** and leave ARRS at O21, since batch 3's numbering is the live sequence and
O31 to O35 are already taken. Not renumbered by this task; both index files belong to other windows.

**C5. A boundary I am NOT moving, raised for ratification (§6.4).** O27 gives the notional-rent page "the
Premises Costs Directions framework". O28 gives this page "what mitigations exist". **The Directions' clawback
cap and its NHS-nominee and grant-waiver exit routes satisfy both descriptions**, and this page states all three
in frozen copy. **Proposed clarification: O27 owns the Directions as a REIMBURSEMENT framework (how notional rent
and cost rent are set, assessed and reviewed); O28 owns the Directions' EXIT and CLAWBACK provisions.** Per the
batch-2 O7 precedent, if the O27 pack writer reaches the same split independently, that is evidence the line was
drawn in the wrong place and it should be ratified rather than argued.

**C6. Proposed addition to O28, so the largest new block in this pack has a row.** O28 currently reads
"the mechanism, why it is a personal liability, and what mitigations exist". **The accounting treatment of the
liability (the dilapidations provision, the going-concern assessment, the contingent-liability disclosure) has no
owner anywhere in the map**, and it is the entire peer-winnable keyword set for this page (§3.4, 1,470 volume at
positions 4 to 9). This is a **gap, not a breach**, in exactly the sense `BATCH2_INDEX.md`'s O21 note defines:
a fact no row covers, which no amount of writer discipline prevents. **Proposed: extend O28 to "the mechanism,
why it is a personal liability, what mitigations exist, and how the resulting liability is provided for in the
practice accounts."** Recorded here so the writer's biggest new section rests on a stated row rather than on the
absence of one.

**C7. The dossier's §4 corrected ordering prescribes nothing onto wave B, and that is correct rather than an
oversight.** All 26 remaining NO-PAGE rows are NHS-pension, expenses, commercial or QOF topics. No premises row
exists in the map at all, which is consistent with §3.3: the harvest contains no premises vocabulary because no
peer ranks for any. **No dossier edit is needed. The correction is to the reading: a topic's absence from the
dossier is not evidence the topic has no demand, only that no harvested domain has a page for it.** On a
Bing-first site that distinction is load-bearing, and this page is its proof.

**C8. `GetPageQueryStats` fails silently on a path argument, and the batch-1 exemplar teaches the failing
call.** Confirmed again here: the full `https://www.` URL returns 5 rows, a path returns an empty list with no
error. `BATCH3_INDEX.md` §0.2 already records this and says "it should be fixed in the client or the exemplar".
**Restated because it is the cheapest open defect in the programme and it manufactures false negatives that look
exactly like findings.** A one-line guard in `BingWebmasterClient.get_page_query_stats` that raises on an
argument not starting with `http` would close it permanently.

---

## Limitations

1. **The strongest incumbent on this page's peer-winnable phrases could not be read.**
   `pricebailey.co.uk/blog/dilapidations-accounting/` returns **HTTP 403** to
   `curl -A "Mozilla/5.0"` and holds `provision for dilapidations`, `dilapidations costs` and `dilapidation
   costs` all at position 4. §4.2 records what the harvest knows about it and makes no claim about its headings,
   depth or quality. **The coverage checklist in §4.9 should be re-run against it if a human can open it.**
2. **`GetPageStats` is top-N** (Bing top-N trap memo). This page appears in it, so its figures are real, but the
   wave-B sibling `/blog/gp-surgery-premises-own-vs-rent-tax-guide` returns nothing and that is "absent from the
   top N", not "proven zero impressions".
3. **The Bing window is 3 snapshots and 8 impressions.** Every position figure here rests on single-digit
   impression counts. Position 1 from 2 impressions is a real position-1 hold and it is also two data points.
   **The 28-day read must not treat a movement from 1 to 2 as a signal**; §8.1's band is 1 to 3 for that reason,
   and §8.5's secondary trigger requires two consecutive zero windows rather than one.
4. **Peer-winnable is Google-derived** (DataForSEO positions are Google positions) and on this page that measure
   is at its least informative: §3.3 shows the page's actual demand is entirely invisible to it. Per decision 21
   it orders the work and excludes nothing, which is the only reason this page is in a wave at all.
5. **Four of the six market pages in §4 are outside the validated competitor universe.** They are law firms and
   surveyors, found by search rather than by harvest, and they are not rank targets in the §2a sense. They are
   included because they are the only pages on earth covering this topic and excluding them would have produced a
   teardown saying the market does not cover it. **Their class is labelled on every entry so nobody later reads
   them as peers.**
6. **Four VERIFY rows in §7.5 are blocking prerequisites and none was resolved by this task.** FRS 102 s.21, the
   HMRC position on dilapidations-provision deductibility, composition payments, and the going-concern basis are
   all currently single-sourced to a competitor blog. **This is preparation, not verification, and the writer
   must close them or drop the material.**
7. **No live-production check was run against our own page.** Its rendering, its links as served and its
   indexation state are all inferred from source and from the sitemap generator, not from a request to the live
   site. This matches the batch index's mandate (§9 limitation 7) and it means defects D1 and D3 remain
   underived from production for wave B as well as for wave C.
8. **The class-defect findings in §6.4 and §6.5 are escalations, not rulings.** Nothing on this page was changed
   and nothing was resolved. If the manager rules that process narration is a live rule and that coordinator
   ruling 3 reaches it, this page has six instances to fix and that is a separate change requiring its own
   window, because §9.3 allows one change per page per window and this EXTEND is it.
