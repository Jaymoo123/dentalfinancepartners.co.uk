# §9.5 RESEARCH PACK: /blog/how-gms-funding-works-global-sum-carr-hill-explained

**Batch 3, wave A (GP practice income and NHS funding), wave anchor page. GRADE = EXTEND.**

Built 2026-08-26. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5 and §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (rules A to L, V1 to V9). Ground truth
`docs/medical/house_positions.md`. Batch index `docs/medical/packs/BATCH3_INDEX.md`. Peer set
`docs/medical/competitor_universe_2026-08-26.md` §2a. Market map `docs/medical/cluster_dossier_2026-08-26.md`,
**CORRECTED §4 ordering only**.

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. **No paid
API call: $0.00.** DataForSEO was read from the persisted harvest only. GSC and Bing Webmaster calls are free and
four were made (§2). Four competitor pages were fetched with `curl`.

**Format exemplar** `docs/medical/packs/PACK_blog__qof-income-gp-practice-accounting-explained.md`.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 applies.**

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/how-gms-funding-works-global-sum-carr-hill-explained` |
| Cluster / topic | Core GMS contract funding. **Plus one absorbed NO-PAGE topic**: corrected dossier §4 order 12, row #20, `what is a GMS contract` / `apms contract`, 3 keywords, 1,180 total volume, 1,140 peer-winnable (corrected). It is the **only one of the 26 remaining NO-PAGE topics that is workable right now** (BATCH3_INDEX §4 point 1). |
| Lane | `nhs_practice_income` (`competitor_universe_2026-08-26.md` §3 lane 8) |
| Wave | **A**, wave anchor. Waves A, B and C share no facts and run concurrently. |
| Source file | `Medical/web/content/blog/how-gms-funding-works-global-sum-carr-hill-explained.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** The writer edits the `.md` file directly and writes new blocks as raw HTML (`<h2>`, `<p>`, `<ul>`, `<table>`) to match. Frontmatter carries `metaTitle`, `h1`, `title` is absent on this file (see the note below), `keyTakeaways`, `summary`, `howtoSteps` and the `faqs` list. |
| Current sha (revert anchor) | `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3` (`git rev-parse HEAD`, run 2026-08-26) |
| Revert path | `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/how-gms-funding-works-global-sum-carr-hill-explained.md` |

**A correction to BATCH3_INDEX §6 before anything else.** The index records repo HEAD at build time as
`7be12b11`. `git rev-parse HEAD` on 2026-08-26 returns **`d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`**, which is
the batch-2 ship commit named in the index's own header line. `d2e75655` is the anchor to revert to, not
`7be12b11`. Recorded in §10.

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `GMS Funding Explained: Global Sum & Carr-Hill Formula`
2. `h1`: `How GMS Practice Funding Works: The Global Sum, the Carr-Hill Formula and Weighted Patients`
3. `title`: `How GMS Funding Works: Global Sum and the Carr-Hill Formula Explained`
4. `metaDescription`, `slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block, `altText`.
5. **The existing H2 sequence, in this relative order, each string unchanged:**
   1. `Where an NHS GP practice's money actually comes from (the income lines)`
   2. `The three NHS GP contract types: GMS, PMS and APMS`
   3. `The Global Sum: the core per-patient payment`
   4. `The Carr-Hill formula: how a raw list becomes weighted patients`
   5. `The Statement of Financial Entitlements (SFE): the rulebook for the money`
   6. `GMS funding is practice income, not your pay (how it reaches a partner)`
   7. `The pension angle: Global Sum profit is pensionable, dividends are not`
   8. `What this means for reading your practice accounts`
   9. `How we help GP practices`
6. **All 8 existing H3 strings**, in their existing positions: `GMS (General Medical Services)`,
   `PMS (Personal Medical Services)`, `APMS (Alternative Provider Medical Services)`,
   `Registered list versus weighted list`, `How the Global Sum is paid and reconciled`, `The factors`,
   `Why two same-size practices are funded differently`, `Known criticisms (kept brief and neutral)`.
7. **All 14 existing FAQ question and answer strings.** Nothing is reworded, reordered, shortened or "tidied".
8. **All 5 existing `keyTakeaways` strings**, and **all 5 existing `howtoSteps`** name and text pairs.
9. Every existing paragraph of body copy.

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before** the existing
   `How we help GP practices` H2, so the nine existing H2s keep their relative order and a byte-identical check
   reads them as an unbroken subsequence. This page has no `Related Reading` block.
2. **New H3 blocks nested under a NEW H2 only.** No new H3 may be inserted under an existing H2, because that
   changes the existing H2's block and risks a reviewer reading it as a rewrite.
3. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place unchanged.
4. **New key takeaways appended** to `keyTakeaways` (optional; the existing 5 stay).
5. **New internal links inside the NEW blocks only.** No new internal link inside any existing paragraph.
6. `howtoSteps` may gain steps at the end, but the writer should not: the existing five-step sequence is a
   complete arithmetic path and appending to it weakens the schema. Recommendation: leave `howtoSteps` alone.

### The factual-currency exception, and why this page does NOT need the QOF escalation

Batch-1 coordinator ruling 3 stands: **EXTEND restricts structure and positioning, never truth.** Factual
corrections inside frozen copy are required rather than merely permitted, and are noted in a one-line addendum.

**This page needs no such correction.** It was checked line by line against `house_positions.md` §3, §3.A, §1,
§2.C and §6 on 2026-08-26 and **nothing on it is factually wrong or stale-framed**. It already states £130.07
tagged 2026/27 with the SFE Directions 2026 cited at paragraph 3(4), already states the £2.18 London Adjustment,
already states that a company cannot hold a GMS or PMS contract and that company income is not NHS-pensionable,
and already states that a partner is taxed on profit share and not on drawings. This is the cleanest page against
house positions in the untreated corpus. The gap here is coverage, not currency. Full read at §6.

### Frozen-list position, confirmed against BATCH3_INDEX §1

BATCH3_INDEX §1 lists **19 frozen slugs** with a live `monitor_until`, derived with **no status predicate**
(rows 1, 4 and 18 are `status='flagged'` and are frozen exactly like the `active` ones; a `status='active'`
filter silently excuses them and that mistake has already been made once).

**`how-gms-funding-works-global-sum-carr-hill-explained` is not on that list.** It is not on the batch-1 list of
12 and not on the batch-2 list of 7. It is workable now, with no gate. Wave A carries no frozen owner, which is
the reason wave A is first.

**Frozen pages this page already links to, and the ruling that permits it.** The live page links to
`/blog/gp-partnership-tax-complete-guide` (frozen to 2026-09-10), `/blog/becoming-gp-partner-financial-implications`
(frozen), `/blog/gp-vat-registration` (frozen), `/blog/gp-pension-contributions-tax-relief` (frozen) and
`/blog/gp-accounting-guide` (**`status='flagged'`**, frozen). Per batch-1 coordinator ruling 5 and the
`gp-accounting-guide` HOLD note, **contextual links to a frozen page's live URL are fine**; what is forbidden is
editing the frozen file. No existing link is touched and no new link points into the frozen set.

**Never propose a collapse, a redirect or a URL change** (§5 locked rules, K4). Rewrite in place only.
**No em-dashes** (I1). The live file currently contains **zero** em-dashes and must still contain zero.

---

## 2. Equity register

**Every figure below was pulled fresh by this task on 2026-08-26.** The `medical_stage0/` files the brief names
(`gsc_page_rows.json`, `gsc_query_rows.json`, `bing_page_stats.json`, `bing_query_stats.json`,
`bing_page_query_waveAB.json`, `grades.csv`) **do not exist**. The scratchpad directory contains one file,
`B3_WRITER_BRIEF.md`, and a `find` across every session scratchpad under
`%TEMP%/claude/C--Users-user-Documents-Accounting/*/scratchpad` returned nothing. This is the same absence
BATCH3_INDEX §0.1 records, and it recurred. Nothing here is quoted from a stored Supabase snapshot.

### 2.1 Google, GSC API

```
optimisation_engine.clients.gsc_query_client.GSCQueryFetcher("medical")
  property  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"],           startDate=2026-05-25, endDate=2026-08-23, rowLimit=500)   -> 21 rows
  searchanalytics().query(dimensions=["page","query"],   startDate=2026-05-25, endDate=2026-08-23, rowLimit=5000)  -> 259 rows
run 2026-08-26, data-through 2026-08-23
```

**Page dimension, this URL, exact API response:**

| Metric | Value |
|---|---|
| clicks | **1** |
| impressions | **141** |
| ctr | 0.0070921985815602835 |
| position | **7.276595744680851** |

**This is the strongest Google position in the whole untreated corpus and the single Google observation worth
recording in waves A and B** (BATCH3_INDEX §8). Google indexes roughly 21 of 138 URLs on this domain. This page
is one of the 21, at position 7.3. **It must not lose them.**

**Page plus query dimension, this URL: exactly ONE row.**

| Query | Impr | Clicks | Position |
|---|---|---|---|
| `d doc prices` | 1 | 0 | 2.0 |

**140 of the 141 impressions are anonymised by GSC and have no query attached.** That is not a bug and it is not
zero demand. GSC withholds low-volume queries, so a page can hold 141 impressions at position 7.3 with one
visible query row. **No writer may conclude anything about Google intent on this page from that single row**, and
`d doc prices` is almost certainly not a query this page should be optimising toward. It is recorded because §2
is the do-not-lose list and it is on it.

### 2.2 Bing, `GetPageStats` (page level)

```
optimisation_engine.clients.bing_query_client.BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
  filtered to Query == "https://www.medicalaccounts.co.uk/blog/how-gms-funding-works-global-sum-carr-hill-explained"
run 2026-08-26
```

**Seven weekly snapshots, all inside the window 2026-05-29 to 2026-08-21:**

| Snapshot date | Impressions | Clicks | Avg impression position |
|---|---|---|---|
| 2026-07-03 | 7 | 2 | 3 |
| 2026-07-10 | 24 | 2 | 7 |
| 2026-07-17 | 9 | 0 | 6 |
| 2026-07-31 | 10 | 0 | 6 |
| 2026-08-07 | 15 | 1 | 6 |
| 2026-08-14 | 44 | 1 | 5 |
| 2026-08-21 | 20 | 1 | 7 |
| **Window total** | **129** | **7** | |

**129 impressions and 7 clicks, page level.** This reproduces the brief's and BATCH3_INDEX §0.2's figures
exactly, from an independent pull. **5.4% CTR.**

Note the shape: the page is absent from the top-N page list for the weeks of 2026-05-29, 2026-06-05, 2026-06-12,
2026-06-19, 2026-06-26 and 2026-08-28. Per BATCH3_INDEX §9 limitation 2, `GetPageStats` is a top-N endpoint, so
absence from a snapshot is not proof of zero impressions in that week. **The 129 is therefore a floor.**

### 2.3 Bing, `GetPageQueryStats` (named-query level): THE DO-NOT-LOSE LIST

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/how-gms-funding-works-global-sum-carr-hill-explained")
run 2026-08-26  ->  55 rows, 51 distinct queries, 85 impressions, 7 clicks
```

**ENDPOINT DISCIPLINE, and this is a live trap (BATCH3_INDEX defect D2).** `GetPageStats` page-level impressions
and `GetPageQueryStats` named-query impressions are BOTH true and are NEVER comparable to each other. On this page
they read **129 (page level)** and **85 (named-query level)**. The clicks agree at **7 on both**. Every Bing
figure in this pack names its endpoint. The grade in BATCH3_INDEX §2.5 is page-level; everything in this section
is named-query level and is never compared to the grade number.

| Query | Impr | Clicks | Best avg impression pos |
|---|---|---|---|
| `global sum patient registration tiers` | 2 | **1** | 9 |
| `sfe carr hill coefficient` | 1 | **1** | 1 |
| `carr -hil funding multipliers` | 1 | **1** | 1 |
| `carr-hill weighting calculator` | 1 | **1** | 5 |
| `how much is 400 patien worth on gms` | 1 | **1** | 1 |
| `how to calculate gms space for 30,000 patients` | 1 | **1** | 2 |
| `calculation to work out your global sum` | 1 | **1** | 3 |
| `carr hill formula` | **15** | 0 | 7 |
| `carr-hill variables` | 3 | 0 | 10 |
| `gms funding weighting for care homes` | 3 | 0 | **1** |
| `carr-hill formula` | 3 | 0 | 10 |
| `global sum` | 3 | 0 | 8 |
| `how do i find out what my oractices car hill forumla is` | 2 | 0 | 2 |
| `how to find out the carr-hill formula for a practice for qof income` | 2 | 0 | 2 |
| `what is the global sum for didsbury medical centre` | 2 | 0 | 7 |
| `gms payment` | 2 | 0 | 8 |
| `global sum vs non-global sum` | 2 | 0 | 5 |
| `gms in payments meaning` | 2 | 0 | 8 |
| `are shared care agreement nhs payments part of global sum` | 2 | 0 | 3 |
| `car-hill formula` | 2 | 0 | 9 |
| `what are the gms des income` | 2 | 0 | 8 |
| `how are gp partners pension contributions factored into global sum payments?` | 2 | 0 | **1** |
| `carr hill formula gp funding` | 2 | 0 | 8 |
| `gmds global sum` | 1 | 0 | 6 |
| `the carr-hill formula for gp funding, for instance, uses old data and under-compensates for socio-demographic need.` | 1 | 0 | 2 |
| `raw capitation ... as of 30 jun 2026, active gms patients only` | 1 | 0 | 5 |
| `global sum menaing` | 1 | 0 | 8 |
| `in context of gms/plo summary payments what is meaning of ev balancing` | 1 | 0 | 9 |
| `what is a global sum` | 1 | 0 | 2 |
| `if someone pays membership on gms where does the money go?` | 1 | 0 | 2 |
| `payment to sum up silverhill` | 1 | 0 | 5 |
| `global sum meaning` | 1 | 0 | 6 |
| `how is global sum worked out on` | 1 | 0 | 2 |
| `global sum work out` | 1 | 0 | 5 |
| `bma global sum allocation formula` | 1 | 0 | 7 |
| `submissions global sum` | 1 | 0 | 10 |
| `if a practice has 11000 patients whats the estimated income from global sum` | 1 | 0 | **1** |
| `carr-hill forumla for gp funding` | 1 | 0 | 5 |
| `what rules govern the gms global sum` | 1 | 0 | **1** |
| `car hill weighted` | 1 | 0 | 4 |
| `nhs england gp funding per patient capitation formula carr-hill weighted 2024 2025` | 1 | 0 | 7 |
| `ways to increase gms practice income` | 1 | 0 | 7 |
| `gp practice funding cost per patient` | 1 | 0 | 10 |
| `gglobal sum` | 1 | 0 | 7 |
| `global sum gp practices meaning` | 1 | 0 | 4 |
| `are all patients allocated the same amount of money at a g p surger` | 1 | 0 | 2 |
| `carr hill formula calculator` | 1 | 0 | 9 |
| `what does weighted list size in parimary care data mean?` | 1 | 0 | 5 |
| `gms quantity` | 1 | 0 | 10 |
| `focus on the global sum allocation formula (carr-hill formula)` | 1 | 0 | 5 |
| `gms value per pt` | 1 | 0 | 4 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named
BLOCK.** 51 distinct queries.

### 2.4 What the equity register actually says, and it is not what the click count says

Three readings that drive §5 and §7.

1. **Seven queries at position 1 to 2 return zero clicks.** `gms funding weighting for care homes` (3 impressions,
   position 1.0), `how are gp partners pension contributions factored into global sum payments?` (2 impressions,
   position 1.0), `what rules govern the gms global sum` (position 1.0), `if a practice has 11000 patients whats
   the estimated income from global sum` (position 1.0), `what is a global sum` (position 2.0), `how is global sum
   worked out on` (position 2.0), `are all patients allocated the same amount of money at a g p surger`
   (position 2.0). **Ranking first and earning nothing is a snippet problem, not a ranking problem.** The page is
   being shown and the searcher is not seeing their answer in the result. Every one of those seven is a question
   the page answers somewhere in 3,164 words of body copy and answers nowhere as a named block.
2. **The single largest query is `carr hill formula` at 15 impressions, and every one of the seven clicks comes
   from a calculation query.** `sfe carr hill coefficient`, `carr -hil funding multipliers`,
   `carr-hill weighting calculator`, `how much is 400 patien worth on gms`, `how to calculate gms space for 30,000
   patients`, `calculation to work out your global sum`, plus `global sum patient registration tiers`. **Seven of
   seven clicks are people trying to compute a number.** The page contains no arithmetic at all (§6).
3. **Two clusters of intent are entirely unanswered.** "How do I find my own practice's figure" (`how do i find out
   what my oractices car hill forumla is`, `how to find out the carr-hill formula for a practice for qof income`,
   `what is the global sum for didsbury medical centre`, 6 impressions at positions 2 to 7) and "what is not in the
   global sum" (`global sum vs non-global sum`, `are shared care agreement nhs payments part of global sum`,
   `what are the gms des income`, 6 impressions at positions 3 to 8).

---

## 3. The market's keyword set

### 3.1 The selection regex, printed so the counts are re-derivable

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'` (32,872 rows, 27 domains,
no volume floor). **No new DataForSEO call was made.** Query run 2026-08-26 through `python scripts/_q.py`
(Supabase Management API, project `dhlxwmvmkrfnmcgjbntk`):

```sql
with peers as (select unnest(array[
  'medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk','bw-medical.co.uk',
  'pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
  'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk',
  'accountants4nhsdoctors.co.uk','hawsons.co.uk','bhp.co.uk','freestyleaccounting.com',
  'simpkinsedwards.co.uk','taxqube.co.uk','coveneynicholls.co.uk','fkca.co.uk',
  'medifintech.co.uk','rbp.co.uk']) d)   -- the 22 domains of competitor_universe_2026-08-26.md §2a
select ranked_keyword,
       max(search_volume) vol,
       min(position) best,
       min(position) filter (where competitor_domain in (select d from peers)) peerbest,
       (array_agg(competitor_domain order by position))[1] holder,
       (array_agg(url order by position))[1] topurl
from dataforseo_competitor_data
where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~* '(^|[^a-z])(gms|apms|pms)([^a-z]|$)|global sum|carr[ -]?hill|weighted patient|weighted list|statement of financial entitlement|\msfe\M|gp contract'
group by 1 order by vol desc nulls last, ranked_keyword;
```

**Counts. Keywords returned: 17. Combined deduplicated volume: 3,530. Contributing domains: 2** (practiceindex.co.uk
on 16 of 17, bma.org.uk on 1). **Peer-winnable volume (a §2a peer at position <= 20): 2,780 across 12 keywords.**

### 3.2 The full set

`On page` = phrase appears verbatim in the live source file, case and punctuation normalised. Peer-winnable
**orders** the work and never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Peer best | Holder | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|---|
| 1,000 | 20 | 20 | practiceindex.co.uk | **yes** | **no** | `what is a gms` |
| 480 | 16 | 16 | practiceindex.co.uk | yes | **no** | `gp contract 26 27` |
| 260 | 18 | 18 | practiceindex.co.uk | yes | **no** | `new gp contract` |
| 260 | 33 | none | bma.org.uk | no | **no** | `sfe payment dates 25/26` |
| 210 | 10 | 10 | practiceindex.co.uk | yes | **yes** (hyphenated) | `carr hill formula` |
| 210 | 9 | 9 | practiceindex.co.uk | yes | **yes** | `carr-hill formula` |
| 170 | 16 | 16 | practiceindex.co.uk | yes | **no** | `gp contract 25/26` |
| 140 | 37 | 37 | practiceindex.co.uk | no | **no** | `bma gp contract rejection` |
| 140 | 17 | 17 | practiceindex.co.uk | yes | **no** | `gp contract 2026/27` |
| 140 | 16 | 16 | practiceindex.co.uk | yes | **no** | `new gp contract 26 27` |
| 140 | 16 | 16 | practiceindex.co.uk | yes | **no** | `new gp contract 26/27` |
| 110 | 48 | 48 | practiceindex.co.uk | no | **no** | `gp contract changes` |
| 90 | 21 | 21 | practiceindex.co.uk | no | **yes** | `apms contract` |
| 90 | 16 | 16 | practiceindex.co.uk | **yes** | **yes** | `apms contracts` |
| 70 | 47 | 47 | practiceindex.co.uk | no | **no** | `new gp contract 2026` |
| 50 | 21 | 21 | practiceindex.co.uk | no | **no** | `gms contract 25/26` |
| 50 | 7 | 7 | practiceindex.co.uk | yes | **no** | `pms instruments` **FALSE POSITIVE, see 3.4** |

### 3.3 The NO-PAGE absorb, re-derived

Corrected dossier §4, **order 12, row #20**, verbatim: `what is a GMS / APMS contract | 1 domain | 1,180 total |
1,140 peer-winnable | 3 keywords | Section on /blog/how-gms-funding-works-global-sum-carr-hill-explained`. It is
the row the correction note moved from order 20 to order 12 and from a published peer-winnable of **0** to
**1,140**, one of the "four zeros that are not zeros".

**My re-derivation of the three keywords:** `what is a gms` (1,000, practiceindex position **20**),
`apms contracts` (90, position **16**), `apms contract` (90, position **21**). Total 1,180, exactly matching the
dossier. **Peer-winnable at position <= 20 comes to 1,090, not 1,140**, because `apms contract` sits at position
21 and falls outside the threshold by one place. The 50-volume difference is most likely `gms contract 25/26`
(50, position 21) counted in. **This is inside the correction note's own stated tolerance** ("reliable for
ORDERING and should not be quoted to the pound") and it does not move order 12. Recorded in §10 rather than
treated as an error.

**Two of the three keywords are already on the page** (`apms contract` 3 times, `apms contracts` 3 times, inside
the existing H3 `APMS (Alternative Provider Medical Services)` and FAQ 8). **The 1,000-volume head,
`what is a gms`, is the one that is absent**, and it is the whole prize in this row. The page has an H3 called
`GMS (General Medical Services)` and an FAQ called `What is the difference between GMS, PMS and APMS contracts?`,
and it never once writes the market's actual question.

### 3.4 Three readings the table does not make obvious

1. **`pms instruments` is a false positive and must be excluded with its reason on the record.** The regex catches
   it because `PMS` is a substring of the topic vocabulary. The holding URL, `https://practiceindex.co.uk/gp/pms-instruments`,
   was fetched (HTTP 200, 24,247 words) and is a **supplier directory profile for a company called PMS Instruments
   Ltd of Maidenhead**, a healthcare technology vendor. It has nothing to do with Personal Medical Services.
   **Excluded. 50 volume removed from any target.** Anyone re-deriving these counts with a bare `pms` regex will
   pick it up again, which is why it is named here rather than silently dropped.
2. **The GP-contract-year family (1,450 combined volume across 8 keywords) is NEWS intent and is DECLINED.** See
   the teardown at 4.4 and the decision table at 4.5 theme 9. Every one of those eight keywords is held by a
   practiceindex opinion column or news round-up, and answering them would require reciting the QOF changes (O25),
   the PCN DES changes (O20), ARRS (O21) and enhanced-services changes (O23), which are four other pages' facts.
   **This is the single clearest V3 trap in wave A and the pack declines it deliberately.**
3. **The DataForSEO harvest is a poor map of this topic and Bing is the good one.** Seventeen keywords, one real
   holder, and the harvest returns **zero rows** for `global sum` in any phrasing, despite `global sum` earning
   3 Bing impressions on our URL by itself and appearing in 26 of our 51 named Bing queries. The harvest is
   Google-derived and Google's commercial-intent crawl simply does not see this vocabulary. On a site where Bing
   out-clicks Google 3.4x, **§7.1 is therefore built primarily from the Bing named-query evidence in §2.3 and
   secondarily from the harvest**, not the other way round. This is a departure from the exemplar pack's method
   and it is deliberate; the reason is stated so a QA agent does not read it as sloppiness.

---

## 4. Competitor teardown

All fetches made 2026-08-26 with `curl -A "Mozilla/5.0" -sS -L -o - <url>`. **Every URL is accounted for. One
non-200 is recorded with its status code.**

### 4.1 practiceindex.co.uk, Are you new to practice management? Part 3: **THE PAGE TO BEAT**
`https://practiceindex.co.uk/gp/blog/new-practice-management-part-3/` · **HTTP 200**
**Class: PEER** (universe §2a #6). **Holds `what is a gms` at position 20 and `apms contract` at 21, which is the
entire NO-PAGE row #20.**

| | |
|---|---|
| Title / H1 | `Are you new to practice management? Part 3` (identical) |
| Published | **6 March 2019**, by "Phil - Practice Index", in GP Practice Management, Staff |
| Word count | **588** (article body, chrome stripped) |
| H2/H3 | **None.** The only heading-level markup in the article body is the byline block. Everything else on the page is site chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`, `Company`, `Our services`). |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the three contract types in a numbered list, verbatim on the page: "1. The General Medical Services
Contract (GMS contract) 2. The Personal Medical Services Agreement (PMS contract) 3. The Alternative Provider
Medical Services Contract (APMS contract)". Gives the **practice-share split**: "Circa 62% of GP practices are on
a GMS contract", "Circa 34% of practices are on PMS contracts", "Circa 4% of practices are on APMS contracts".
Defines the Global Sum as "a provision of core funding to practices for essential and additional services".
Names NHS England's "**ready reckoner**" tool. Correctly notes that NHS England "can enter into a contract with
anyone and that there's no requirement for them to be a GP/doctor". Then pivots, at roughly the halfway point,
into partnership recruitment and a paywalled "New Partnership Checklist [PLUS]".

**What it gets wrong or omits.** It states, as current: "**the global sum figure for 2018/19 is £87.92 per
patient**". That is **eight years stale** and it is also **conceptually wrong in the market's own words**: it says
"per patient" where the SFE says per *weighted* patient. It carries no Carr-Hill explanation, no weighting, no
London Adjustment, no deductions, no accounting, no tax, and no date-tagging discipline of any kind. Half the
words are about something else.

**Consequence for us.** **A 588-word 2019 blog with no headings and an eight-year-old figure is the incumbent on
the 1,000-volume head of this topic.** This is the most winnable competitor page found anywhere in batch 3. We
should not try to beat it on the 62/34/4 split, which is a genuinely useful fact we can carry with attribution
and a date caveat; we beat it by answering `what is a GMS contract` in the market's own words on a page that then
states the **current** figure with its year tag and its statutory citation.

### 4.2 practiceindex.co.uk, Carr-Hill formula review
`https://practiceindex.co.uk/gp/blog/carr-hill-formula-review-will-this-long-awaited-shake-up-finally-fix-gp-funding/` · **HTTP 200**
**Class: PEER.** Holds `carr hill formula` (position 10) and `carr-hill formula` (position 9), 420 combined volume.

| | |
|---|---|
| Title / H1 | `Carr-Hill formula review - Will this long-awaited shake-up finally fix GP funding?` (identical) |
| Published | **16 October 2025**, by Practice Index, in Funding, GP Practice Management, Patients |
| Word count | **1,107** |
| H2/H3 (article body) | `Why the Carr-Hill formula is under fire`; `What the new review will do`; `Funding fears and front-line realities` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the **six-month Government review of the Carr-Hill formula launched October 2025, led by the National
Institute for Health and Care Research (NIHR)** at the request of the Department of Health and Social Care. Lists
the six Carr-Hill elements in the market's own order and wording: "rurality, patient age and sex, additional
needs, list turnover, numbers in residential and nursing homes, and local staff costs". States the formula was
"First introduced in 2004" and "is based in part on data that's now around 25 years old". Sets out the review's
five stated objectives verbatim. Quotes Dr Katie Bramall, Chair of the BMA's GP Committee, warning that a
cost-neutral redistribution "will mean as many lose out as gain". Cites the Nuffield Trust and Health Foundation
finding that deprived-area practices "receive, on average, around 10% less funding per patient". Closes on
anonymised practice-manager comment.

**What it gets wrong or omits.** No money mechanics at all: no per-weighted-patient price, no calculation, no
statement of how a practice finds its own weighted list, no accounting and no tax. It is a news piece about a
review, not an explainer of the formula, and it ranks at position 9 to 10 on the head term anyway.

**Consequence for us.** Two things. First, **the Carr-Hill review is a live, dated, named policy fact our page
does not carry.** Our page's H3 `Known criticisms (kept brief and neutral)` says "a recurring criticism is that it
may not fully capture deprivation" and "That is a live policy debate rather than settled fact". That framing was
correct when written and it is now **under-specific**: the debate has a name, a commissioner, a date and a scope.
Second, and more usefully, **this page proves the deprivation critique is the market's dominant Carr-Hill
conversation**, which is corroborated by our own Bing query
`the carr-hill formula for gp funding, for instance, uses old data and under-compensates for socio-demographic
need.` sitting at **position 2**. Somebody is pasting that sentence into Bing and landing on us.

### 4.3 practiceindex.co.uk, PMS Instruments (supplier directory)
`https://practiceindex.co.uk/gp/pms-instruments` · **HTTP 200**
**Class: PEER domain, NON-TOPIC page.** Fetched only to settle whether `pms instruments` (50 volume, position 7)
belongs in the keyword set. Title: `PMS Instruments Reviews - Maidenhead | Practice Index`. H1s: `PMS Instruments`;
`At the heart of healthcare technology`. It is a **vendor profile for a healthcare technology company**.
**Excluded from the keyword set with reason (3.4 point 1).** Recorded rather than dropped.

### 4.4 practiceindex.co.uk, The two big problems with the 2026/27 GP contract
`https://practiceindex.co.uk/gp/blog/the-two-big-problems-with-the-2026-27-gp-contract-by-ben-gowland/` · **HTTP 200**
**Class: PEER.** Holds the GP-contract-year family: `gp contract 26 27` (480, position 16), `gp contract 2026/27`
(140, position 17), `new gp contract 26 27` and `new gp contract 26/27` (140 each, position 16).

| | |
|---|---|
| Title / H1 | `The two big problems with the 2026/27 GP contract - By Ben Gowland` (identical) |
| Published | **12 March 2026**, by Ben Gowland, in GP Practice Management, GPs, Podcasts |
| Word count | **614** |
| H2/H3 (article body) | **None** |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** a named commentator's opinion column. Two arguments: unfunded work shifting from secondary to primary
care (the withdrawal of the Advice and Guidance DES and its replacement by a core contractual requirement), and
same-day response obligations for clinically urgent requests with no capping of online consultations. Quotes the
DHSC revenue-budget increase of "4.5% in cash terms" against a GP contract increase of "3.6%", and the "4.1%
increase of the National Living Wage". Notes the GPC's rejection of the contract and a referendum closing 25 March.

**What it gets wrong or omits.** Nothing factually, but it is **not an explainer**: no Global Sum, no Carr-Hill,
no contract types, no arithmetic, no accounting.

**Consequence for us, and it is a DECLINE.** A 614-word bylined opinion column holds a 480-volume head term at
position 16. It looks winnable and it is the wrong prize. Taking it means writing GP-contract-news content, which
means restating QOF changes (O25's fact), PCN DES changes (O20's), ARRS (O21's) and enhanced services (O23's) on
this page. **That is precisely the batch-1 failure shape.** Declined at 4.5 theme 9 with this reason.

### 4.5 bma.org.uk, GP contract changes England 2026/27
`https://www.bma.org.uk/pay-and-contracts/contracts/gp-contract/gp-contract-changes-england-202627` · **HTTP 200**
**Class: UNWINNABLE AUTHORITY / NON-RIVAL** (universe §2b: bma.org.uk, 15 of 18 head terms, "cannot be outranked
on brand"). Fetched for **corroboration of house positions**, not as a rank target.

| | |
|---|---|
| Title / H1 | `GP contract changes England 2026/27` |
| Word count | ~1,489 |
| H1/H2 | `GP contract changes England 2026/27`; `Headline Government GP contract changes for 2026/-27` (the malformed year is theirs) |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**What it corroborates, verbatim from the page:** "The GMS contract can only be varied if the requirements in the
National Health Service (General Medical Services Contracts) Regulations 2015 are followed. The variation must
take effect no earlier than 14 days after the notice is served, where reasonably practicable." And: "The combined
2026/27 uplift for both practice core contracts and the PCN DES is £485m, bringing the total to just under £13.9
billion, including Advice and Guidance funding. This is a 3.6% cash increase, or 1.4% real-terms growth relative
to the GDP deflator & CPI inflationary measures."

**Two things this fetch settles.**
1. **£485m, £13.9bn, 3.6% cash and 1.4% real terms are now triple-sourced**: `house_positions.md` §3, NHS England's
   own long-read, and the BMA. Safe to state on this page with the 2026/27 tag.
2. **The "18 additional QOF points, c.£25m" figure is no longer BHP-only.** The exemplar pack (4.6) flagged it as
   an unverified single-source figure. The BMA states it directly: "These changes are supported by an additional
   18 QOF points (c.£25m)." **That resolves an open item on the QOF pack, not on this one** (O25 owns QOF), and it
   is reported at §10 for the QOF page's benefit. **This page must not state it.**

**What it omits, which is the whole point:** the BMA's 2026/27 page contains **no Global Sum figure, no Carr-Hill
mention and no per-weighted-patient price**. The authority layer of this SERP does not carry the number.

### 4.6 Two fetches attempted for the accountant layer

| URL | Status | Note |
|---|---|---|
| `https://www.bma.org.uk/advice-and-support/gp-practices/funding-and-contracts/gms-contract-changes-2026-27` | **HTTP 404** | Recorded, not dropped. A URL guess; the live BMA page is 4.5. |
| `https://www.ramsaybrown.com/gp-practices/` | HTTP 200 | **131 words.** A news teaser ("GP practices' pay bills to increase again as minimum wage rises from April") plus a newsletter block. The specialist medical accountant with the strongest NHS-funding positioning in the peer set **has no GMS funding page at all**. Recorded as evidence for §5. |

### 4.7 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes**. **16 themes, 16 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **`what is a GMS contract` as the market's question** (4.1) | **COVER** | NO-PAGE order 12's 1,000-volume head. Our page has the answer and not the question. Owned by us under O19. |
| 2 | **The three contract types named as a set with the practice-share split, circa 62% GMS / 34% PMS / 4% APMS** (4.1) | **COVER, attributed and date-caveated** | Useful, absent from our page, and the only quantification of contract prevalence anywhere in the set. It is a practiceindex figure from a 2019 post: attribute it and say the split shifts. Do NOT present it as a 2026/27 figure. |
| 3 | **The Global Sum stated as a current price** (4.1: £87.92 for 2018/19) | **COVER, with the CURRENT figure** | O19 and `house_positions.md` §3.A: **£130.07 per weighted patient, 2026/27**, SFE Directions 2026 paragraph 3(4). Already on the page. **This is the one theme where we are already ahead of every competitor and the job is to keep it, not add it.** |
| 4 | **NHS England's "ready reckoner"** (4.1) | **COVER, one line** | Named by the incumbent, absent from ours, and it is the concrete answer to `how to find out the carr-hill formula for a practice` and `what is the global sum for didsbury medical centre`. Verify the current tool and its URL at source before naming it (§7.5). |
| 5 | **The Carr-Hill review: NIHR, six months, launched October 2025, DHSC-commissioned, five objectives** (4.2) | **COVER** | Live named policy fact. Our `Known criticisms` H3 gestures at it without naming it. Additive, sits in a new block, existing H3 untouched. |
| 6 | **The deprivation critique with its evidence** (4.2: Nuffield Trust / Health Foundation, ~10% less funding per patient in deprived areas; Lost Practices investigation) | **COVER the critique, VERIFY before quoting the 10%** | The market's dominant Carr-Hill conversation and our own position-2 Bing query. The 10% figure is practiceindex reporting a third party. **F6 applies: no percentage without a named source.** Either read it at the Nuffield Trust / Health Foundation and cite them, or state the critique without the number. |
| 7 | **The BMA GPC position on cost-neutral redistribution** (4.2, named quote) | **DECLINE the quote, COVER the point** | I2 forbids named-expert framing on our own pages, and quoting a third party's named officer is a different thing but a slippery one on a faceless-authority site. Take the substance ("a cost-neutral redistribution creates losers as well as winners") without the name. |
| 8 | **The six Carr-Hill elements in the market's wording** (4.2) | **COVERED ALREADY, add the missing word** | Our H3 `The factors` carries all six correctly. The market says "**variables**" (`carr-hill variables`, 3 Bing impressions at position 10) and "elements"; we say "factors". One sentence in a new block carrying `variables` closes it. **Do not touch the existing H3.** |
| 9 | **The 2026/27 GP contract change list: A&G, same-day urgent response, no capping of online consultations, RSV cohort, Lung Cancer Screening, the QOF refinements** (4.4, 4.5) | **DECLINE** | Recorded with its reason at 3.4 point 3 and 4.4. It is news intent, it is annually obsolete, and covering it means restating O20, O21, O23 and O25 on this page. Eight keywords and 1,450 volume declined deliberately. **This is the wave's V3 trap and it is being refused on the record.** |
| 10 | **The 2026/27 settlement headline: £485m, £13.9bn, 3.6% cash / 1.4% real terms** (4.5, corroborated by house positions §3 and NHS England) | **COVER, one sentence** | Triple-sourced and safe. One sentence makes the page read as 2026/27 without opening the change-list door. **Stop at one sentence.** |
| 11 | **The GMS contract variation mechanism: SI 2015/1862, 14 days' notice** (4.5) | **COVER, one line** | Free statutory precision, directly answers our position-1.0 Bing query `what rules govern the gms global sum`, and SI 2015/1862 is already in `house_positions.md` §3 statutory hooks. |
| 12 | **18 additional QOF points, c.£25m for 2026/27** (4.5) | **DECLINE, and it is O25's** | Now corroborated (4.5), and it is still not this page's fact. One sentence and a link to the QOF page, no figure. See §10 for the correction this hands to the QOF pack. |
| 13 | **Advice and Guidance DES withdrawal into core funding** (4.4, 4.5) | **ELSEWHERE** | Directed Enhanced Service territory. O23, `/blog/enhanced-services-gp-practice-income-tax`. Link only. Note it also answers our Bing query `what are the gms des income`, which is why the link matters. |
| 14 | **PCN and ARRS funding changes** (4.4, 4.5) | **ELSEWHERE** | O20 and O21. One sentence saying PCN money sits outside the core contract, then link. |
| 15 | **Partnership recruitment and new-partner checklists** (4.1's second half) | **DECLINE** | Wave E and the frozen partnership set (O35, O30). Not ours at any date in this batch. |
| 16 | **The specialist medical accountant's GMS funding page** (4.6: ramsaybrown, 131 words, does not exist) | **COVER, and it is the whole page** | See §5.1. |

---

## 5. Whitespace

What nobody in the peer set covers, quotably.

1. **No accountant in the peer set has a GMS funding page at all.** The topic's only real holder across 17
   keywords is practiceindex.co.uk, a practice-manager publisher. ramsaybrown.com, the peer whose entire
   positioning is NHS funding and superannuation, returns **131 words** on `/gp-practices/` and no funding
   explainer (4.6). sandisoneasson.co.uk runs 12 URLs in its whole sitemap (universe §2a #7). **The accountant's
   GMS funding page does not exist anywhere in the peer set except ours.** That is the same shape the QOF pack
   found and it is the reason wave A is first.

2. **Nobody states the current per-weighted-patient price.** The incumbent on the head term states **£87.92 for
   2018/19** (4.1). The BMA's own 2026/27 contract page carries **no Global Sum figure at all** (4.5). Our page
   states **£130.07 for 2026/27** with the statutory paragraph (`house_positions.md` §3.A, SFE Directions 2026
   paragraph 3(4), verified at source 2026-08-26 by `curl` plus `pdftotext -layout`). **We hold the single most
   valuable fact in this topic and no competitor has it.** KEEP, and protect.

3. **Nobody shows the arithmetic, and every click this page earns comes from someone trying to do it.** Seven of
   seven Bing clicks are calculation queries (§2.4 point 2): `calculation to work out your global sum`,
   `how much is 400 patien worth on gms`, `how to calculate gms space for 30,000 patients`,
   `carr-hill weighting calculator`, `sfe carr hill coefficient`, `carr -hil funding multipliers`. Plus
   `if a practice has 11000 patients whats the estimated income from global sum` sitting at **position 1.0 with
   zero clicks**. **No competitor page in this set contains a single calculation** and neither does ours. Under
   G1 this page's topic mandates exactly one worked example, and under §3.A the inputs are now verified, so it can
   finally be written with real figures rather than the "purely illustrative" hedge the page currently carries.

4. **Nobody tells a practice how to find its OWN weighted list and its own Global Sum.** Six Bing impressions at
   positions 2 to 7 across `how do i find out what my oractices car hill forumla is`, `how to find out the
   carr-hill formula for a practice for qof income`, `what is the global sum for didsbury medical centre`, plus
   `what does weighted list size in parimary care data mean?` and `raw capitation ... active gms patients only`.
   The incumbent names a "ready reckoner" in passing (4.1) and no page in the set explains the route. This is a
   procedural answer (the quarterly Contractor Registered Population and Contractor Weighted Population figures,
   where the practice sees them, and the NHS England ready reckoner) and it is entirely unowned.

5. **Nobody explains what is NOT in the Global Sum.** `global sum vs non-global sum` (2 impressions, position 5),
   `are shared care agreement nhs payments part of global sum` (2, position 3), `what are the gms des income`
   (2, position 8), `gms in payments meaning` (2, position 8), `gms payment` (2, position 8). Our page lists the
   income streams at the top and never draws the boundary line the searcher is actually asking about. **This can
   be answered as a boundary without explaining any of the neighbouring streams**, which is exactly what O19 to
   O26 require: name what sits outside the core contract, link, stop.

6. **The deductions are unowned and we already own the source.** `house_positions.md` §3.A carries a fact no
   competitor page in this set mentions and our page does not currently state: where a contractor does not
   provide the listed services, the Initial GSMP is reduced by **0.6% for minor surgery** and **4.70% for out of
   hours services** (SFE Directions 2026, the Table at paragraph 3(6)). The words `out of hours` and
   `minor surgery` appear **zero times** on the live page. This is verified, statutory, specific, and it belongs
   to O19 and nobody else.

7. **The care-home weighting is a position-1.0 query earning nothing.** `gms funding weighting for care homes`,
   3 impressions, position 1.0, **0 clicks**. Our page says "a nursing and residential home factor" four times
   and the phrase `care home` once, in a parenthetical about a town centre. The market's word is care home.

8. **The Carr-Hill review is a currency gap, not a coverage gap.** A named six-month NIHR review commissioned by
   the DHSC and launched October 2025 (4.2), and our page describes it as an unnamed "live policy debate".
   Nothing on the page is wrong; it is simply less current than a 2025 practice-management blog on the fact the
   market cares most about.

### KEEP, explicitly

Per §9.3 and K1 the specialist layer is never traded away. These are this page's differentiators and they stay
exactly as they are. **K1 is a hard fail: the drafted version's count of statutory references, form names,
technical terms and figures must be greater than or equal to the live page's.**

- **£130.07 per weighted patient for 2026/27, cited to paragraph 3(4) of the SFE Directions 2026, with the
  external link to the gov.uk PDF.** The most valuable sentence on the page. **KEEP.**
- **The £2.18 London Adjustment** for registered patients inside the Greater London Authority area. **KEEP.**
- **The quarterly list-cleaning cycle** and the explanation that a growing practice is briefly paid on a stale
  lower weighted figure and a shrinking one on a higher figure, "and neither is an error". No competitor
  attempts this. **KEEP.**
- **The remittance-unbundling discipline**: a single remittance bundles Global Sum with QOF aspiration, enhanced
  services, reimbursements and adjustments, and breaking it back out monthly is what lets a practice see whether
  core funding is right. **KEEP.**
- **The registered-list versus weighted-list distinction** as its own H3. **KEEP.**
- **All six Carr-Hill factors** in the existing H3 `The factors`. **KEEP.**
- **The explicit refusal to invent Carr-Hill coefficients**: "we describe them qualitatively here rather than
  inventing multipliers". That is the house position, not timidity. **KEEP.**
- **The weighting-is-not-rationing paragraph** (two patients with different weightings receive the same NHS
  service). Genuinely expert, entirely unique in the set. **KEEP.**
- **The buy-in angle**: an incoming partner reading raw headcount rather than weighted list is reading the wrong
  number. **KEEP.**
- **The funnel paragraph**: a large headline funding figure is the top of a funnel, drawings should be set
  against projected profit and not turnover. **KEEP.**
- **The pension line**: NHS-derived profit is pensionable for a Type 1 medical practitioner via the Annual
  Certificate of Pensionable Profits; a limited company cannot hold a GMS or PMS contract and company income is
  not NHS-pensionable. Aligned with `house_positions.md` §2.C. **KEEP.**
- **The VAT one-liner**: core NHS GMS income is outside the scope of VAT, with the link out to
  `/blog/gp-vat-registration`. This is exactly the one-sentence-and-a-link that O17 requires and it is already
  correct. **KEEP and do not expand it.**
- **SI 2015/1862 named in the GMS H3.** **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/how-gms-funding-works-global-sum-carr-hill-explained.md`, read in full 2026-08-26.

| | |
|---|---|
| Word count, whole file | **4,826** (`wc -w`, includes frontmatter) |
| Word count, body copy only | **3,164** (HTML stripped) |
| `metaTitle` | `GMS Funding Explained: Global Sum & Carr-Hill Formula` (53 characters) |
| `h1` | `How GMS Practice Funding Works: The Global Sum, the Carr-Hill Formula and Weighted Patients` |
| `title` | `How GMS Funding Works: Global Sum and the Carr-Hill Formula Explained` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| H2 count | **9** |
| H3 count | **8** |
| FAQ entries | **14** |
| Key takeaways | **5** |
| `howtoSteps` | **5** |
| Tables | **None** |
| Calculator | None |
| Worked example with figures | **None** |
| Em-dashes | **0** (I1 clean) |
| Rendering | Markdown file whose body is raw HTML. Write new blocks as raw HTML to match. |

### 6.1 Existing heading list, verbatim and in order

- H2 `Where an NHS GP practice's money actually comes from (the income lines)`
- H2 `The three NHS GP contract types: GMS, PMS and APMS`
  - H3 `GMS (General Medical Services)`
  - H3 `PMS (Personal Medical Services)`
  - H3 `APMS (Alternative Provider Medical Services)`
- H2 `The Global Sum: the core per-patient payment`
  - H3 `Registered list versus weighted list`
  - H3 `How the Global Sum is paid and reconciled`
- H2 `The Carr-Hill formula: how a raw list becomes weighted patients`
  - H3 `The factors`
  - H3 `Why two same-size practices are funded differently`
  - H3 `Known criticisms (kept brief and neutral)`
- H2 `The Statement of Financial Entitlements (SFE): the rulebook for the money`
- H2 `GMS funding is practice income, not your pay (how it reaches a partner)`
- H2 `The pension angle: Global Sum profit is pensionable, dividends are not`
- H2 `What this means for reading your practice accounts`
- H2 `How we help GP practices`

### 6.2 Blunt read

**This is the best GMS funding page in the peer set, it is factually current, and it is missing the market's
question forms and all of its arithmetic.** The gap is coverage and shape, not quality and not currency. That is
a different diagnosis from the QOF page (whose gap was pure vocabulary) and from most of batch 3.

**What is good, specifically.**

1. **Every load-bearing figure traces to `house_positions.md` and every one is current.** £130.07 tagged 2026/27
   with paragraph 3(4) and the gov.uk PDF link (§3.A). £2.18 London Adjustment (§3.A). "A limited company cannot
   hold a GMS or PMS contract and company income is not NHS-pensionable" (§2.C). "A partner is taxed on their
   share of practice profit, not on their drawings" (§1). "Core NHS GMS income is outside the scope of VAT" (§6).
   SI 2015/1862 named (§3 statutory hooks). **F4 clean. Nothing on this page contradicts house positions and
   nothing on it is stale-framed.**
2. **It already refuses the fabrication trap twice**, once on Carr-Hill coefficients and once on the illustrative
   comparison ("The figures here are purely illustrative"). F6 clean.
3. **Ownership discipline is already mostly right.** QOF gets one sentence and a link (O25 satisfied). Enhanced
   services gets one sentence and a link (O23 satisfied). VAT gets one sentence and a link (O17 satisfied).
   Dispensing gets one bullet and no explanation (O24 satisfied). Incorporation gets one sentence and two links
   (O33 satisfied). **The one live O-row breach is at 6.3 point 4.**
4. **It is not thin.** 3,164 words of body, 14 FAQs, 5 key takeaways, 5 `howtoSteps`, correct throughout.

### 6.3 What is thin, missing or wrong, checked against the CURRENT rules including V2

Every page touched in this batch is checked against the rules as they stand today, not the rules that existed
when it was written (BATCH3_INDEX §6.3 point 5).

1. **`what is a gms` appears zero times.** The 1,000-volume head of the absorbed NO-PAGE row, and the page has an
   H3 named `GMS (General Medical Services)` and an FAQ named `What is the difference between GMS, PMS and APMS
   contracts?`. It has the answer and not the question. B2 and B3.
2. **`global sum allocation formula` appears zero times.** That is the SFE's own name for the Carr-Hill weighting
   ("this number is to be adjusted by the Global Sum Allocation Formula", paragraph 3(4), quoted in
   `house_positions.md` §3.A) **and it is a live Bing query on this URL twice**: `bma global sum allocation
   formula` (position 7) and `focus on the global sum allocation formula (carr-hill formula)` (position 5). The
   page quotes the paragraph number and not the term the paragraph uses.
3. **`out of hours` and `minor surgery` appear zero times.** Two verified, statutory, quantified deductions
   (4.70% and 0.6%, SFE paragraph 3(6)) that O19 owns exclusively and no competitor mentions. §5 point 6.
4. **O13 is breached, in one clause.** The body reads: "reimbursements such as locum cover for parental or
   sickness leave are exactly that, reimbursements, not a windfall". **O13 assigns GP practice reimbursement for
   parental-leave cover under the SFE to `/blog/maternity-pay-and-maternity-allowance-for-doctors`**, and
   BATCH3_INDEX names this as "a real collision, see O19". It is currently one clause with **no link**, which is
   half of the one-sentence-and-a-link that O13 requires. **The clause is EXISTING copy and EXTEND forbids
   rewording it.** Handling at §7.3: leave the clause byte-identical and place the link in a NEW block. **This
   goes to the manager as a named item; the writer must not resolve it alone.**
5. **`contractor weighted population`, `contractor registered population`, `capitation` and `ready reckoner` all
   appear zero times.** These are the SFE's own vocabulary (verbatim in `house_positions.md` §3.A: "the
   contractor's Contractor Weighted Population for the Quarter") and the market's (`raw capitation ... active gms
   patients only`, `nhs england gp funding per patient capitation formula carr-hill weighted 2024 2025`,
   `gp practice funding cost per patient`). D1 rewards this kind of precision and it costs nothing.
6. **`care home` appears once, in a parenthetical, not as a weighting factor.** Against a position-1.0
   zero-click Bing query. §5 point 7.
7. **`carr-hill variables` is absent.** We say "factors"; the market also says variables and elements (4.2).
8. **No tables. L4 is unmet.** The page carries a three-way contract comparison (GMS / PMS / APMS) and a six-item
   factor list, both of which are natural tables and both currently prose. L4 requires at least one table on any
   page carrying a comparison. **A new table lives in a new block; existing prose is not converted.**
9. **No worked example. G1 is unmet.** The topic is a calculation (weighted list x price, plus London Adjustment,
   minus deductions) and G1 mandates exactly one worked example on such a page. The page currently says "The
   figures here are purely illustrative" and then gives **no figures at all**, which is the weakest possible
   position: it carries the hedge without the example.
10. **No year string other than 2026/27 (4 occurrences).** Correct behaviour for durability and it is why the
    entire GP-contract-year keyword family passes the page by. That family is **declined** at 4.7 theme 9, so
    this is recorded as an observation and **not** as a defect to fix.
11. **C4 check: "we", "our" and "us" total 21 in 3,164 body words, which is 6.6 per 1,000 against a cap of 3.**
    The cluster is the `How we help GP practices` H2 plus the link-out sentences. **This is EXISTING copy, K2
    freezes it, and batch-1 coordinator ruling 2 governs: on an EXTEND page the structural bands are scored
    against the EXTEND reality, and a writer must never contort a page to reach a band the grade forbids.**
    Recorded so QA reports the number rather than raising it as a defect. **The NEW blocks must carry zero
    first-person plural**, which is the only part of C4 the writer controls.
12. **C3 check: "you" and "your" total 20 in 3,164 body words, which is 6.3 per 1,000 against a target band of
    12 to 25.** Below band. Same ruling as point 11 applies to the existing copy. **The new blocks should run
    second person throughout**, which will lift the whole-page figure toward the band without touching a word of
    the existing text.
13. **V5 and V9 checks on the existing copy: clean.** Zero instances of `it is not X, it is Y`. Zero numeral-count
    paragraph openers. **V2 check: clean.** No search-string narration, no "also searched as", no keyword-variant
    table. The one known live V2 violation in the corpus is on a different page and belongs to wave H.
14. **A1 check.** The opening runs 91 words to the first H2 and the direct answer ("the Global Sum as the core
    per-patient payment") arrives at roughly word 60. A5's band is 40 to 90. **Marginally over on A5, inside A1.**
    Existing copy, frozen, recorded not raised.

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgement.

### 7.1 THE NAMED MISSING-PHRASE LIST: the 14/28-day read is measured on THIS

**14 phrases.** Every one verified absent from the live source file on 2026-08-26 by verbatim search, case and
punctuation normalised. Ordered peer-winnable and click-earning first.

**V1 IS BINDING AND THIS LIST IS BUILT TO IT.** Two word orders per idea per page, hard cap, counted as
**non-overlapping longest matches, never raw substrings** (V1 enforcement note). The idea grouping is stated in
the table so a QA agent can verify the cap rather than assume it. Any V1 finding must quote the spans it counted.

| # | Phrase (must appear verbatim) | Idea group | Order # within idea | Evidence |
|---|---|---|---|---|
| 1 | `what is a GMS contract` | GMS contract identity | 1 of 2 | Harvest `what is a gms`, 1,000 vol, practiceindex position 20. NO-PAGE order 12. |
| 2 | `GMS contract` used as a standalone noun phrase outside the H3 label | GMS contract identity | 2 of 2 | Currently 2 occurrences, both inside the frozen H3 block. |
| 3 | `Global Sum Allocation Formula` | The formula's official name | 1 of 2 | SFE paragraph 3(4) verbatim. Bing `bma global sum allocation formula` (pos 7), `focus on the global sum allocation formula (carr-hill formula)` (pos 5). |
| 4 | `Carr-Hill variables` | The formula's official name | 2 of 2 | Bing `carr-hill variables`, 3 impressions, position 10. |
| 5 | `out of hours` (as a Global Sum deduction) | The deductions | 1 of 2 | `house_positions.md` §3.A, SFE paragraph 3(6): **4.70%**. Zero occurrences. |
| 6 | `minor surgery` (as a Global Sum deduction) | The deductions | 2 of 2 | Same source: **0.6%**. Zero occurrences. |
| 7 | `care homes` (as a Carr-Hill weighting) | Care-home weighting | 1 of 1 | Bing `gms funding weighting for care homes`, 3 impressions at **position 1.0, zero clicks**. |
| 8 | `Contractor Weighted Population` | The SFE's list vocabulary | 1 of 2 | `house_positions.md` §3.A verbatim. Bing `what does weighted list size in parimary care data mean?` (pos 5). |
| 9 | `capitation` | The SFE's list vocabulary | 2 of 2 | Bing `raw capitation ... active gms patients only` (pos 5), `nhs england gp funding per patient capitation formula carr-hill weighted 2024 2025` (pos 7), `gp practice funding cost per patient` (pos 10). |
| 10 | `global sum meaning` (in an FAQ question, in the market's word order) | "What does it mean" intent | 1 of 2 | Bing `global sum meaning` (pos 6), `global sum menaing` (pos 8), `global sum gp practices meaning` (pos 4). |
| 11 | `GMS payment` | "What does it mean" intent | 2 of 2 | Bing `gms payment` (2 impressions, pos 8), `gms in payments meaning` (2, pos 8), `gms value per pt` (pos 4). |
| 12 | `how to calculate the Global Sum` | Calculation intent | 1 of 2 | **All 7 Bing clicks are calculation queries.** `calculation to work out your global sum` (1 click), `how is global sum worked out on` (pos 2), `global sum work out` (pos 5). |
| 13 | `how to find out` your practice's own weighted list / Global Sum | "Find my own figure" intent | 1 of 2 | Bing `how do i find out what my oractices car hill forumla is` (pos 2), `how to find out the carr-hill formula for a practice for qof income` (pos 2), `what is the global sum for didsbury medical centre` (pos 7). |
| 14 | `ready reckoner` | "Find my own figure" intent | 2 of 2 | Named by the incumbent (4.1). **Verify the current NHS England tool and its URL at source before naming it** (§7.5). If it cannot be verified, phrase 14 is **DROPPED, not guessed**, and the countable test becomes 13 of 13. |

**Countable test: 14 of 14 present** (or 13 of 13 if phrase 14 fails source verification). Any other absent phrase
is a named BLOCK.

**Explicitly NOT on this list, and the reason is on the record:**
- **The eight GP-contract-year keywords** (`gp contract 26 27`, `gp contract 2026/27`, `new gp contract`,
  `new gp contract 26 27`, `new gp contract 26/27`, `gp contract 25/26`, `gms contract 25/26`, `gp contract
  changes`, 1,450 volume). **DECLINED** at 4.7 theme 9 as news intent whose coverage would require restating O20,
  O21, O23 and O25 on this page.
- **`pms instruments`** (50 volume). **EXCLUDED** as a false positive: it is a Maidenhead healthcare-technology
  vendor, verified by fetch at 4.3.
- **`sfe payment dates 25/26`** (260 volume). Held by bma.org.uk at position 33, not peer-winnable, prior-year
  intent, and payment-dates content belongs with PCSE statement reconciliation (**O26**). Declined.
- **`carr hill formula` unhyphenated.** Under the pack's own normalisation rule (case and punctuation normalised)
  this is **already present** 23 times as `Carr-Hill formula`, and Bing already matches it: it is our largest
  single query at 15 impressions and position 7. **Listing it as missing would be a false positive**, which is
  exactly the trap the V1 enforcement note warns about. Named here so a QA agent does not add it back.

### 7.2 Equity preservation (§9.9 floor 5)

**All 51 named Bing queries in §2.3 must still match** in `metaTitle`, `h1`, `title`, an H2, an H3, an FAQ or body
prose after the change. **Plus the 1 Google query row** (`d doc prices`), giving a combined equity set of **52**.

**Countable test: 52 of 52 matchable.** Run
`python scripts/track2_query_coverage.py --slug how-gms-funding-works-global-sum-carr-hill-explained --json`.

The typo cluster (`carr -hil funding multipliers`, `car-hill formula`, `car hill weighted`, `carr-hill forumla for
gp funding`, `gglobal sum`, `gmds global sum`, `global sum menaing`, `oractices`, `parimary`, `patien`,
`surger`) normalises against the underlying terms. **Because this change is additive only and no existing text is
removed, no equity query can be lost by construction.** The gate exists to catch a writer who edits existing copy
anyway.

**Separately and more importantly: the Google position must hold.** 141 impressions at average position 7.276595
is the strongest Google signal in the untreated corpus. See the failure trigger at §8.

### 7.3 EXTEND byte-identity

Diff the pre and post files. The following must be byte-identical:

- `metaTitle: "GMS Funding Explained: Global Sum & Carr-Hill Formula"`
- `h1: "How GMS Practice Funding Works: The Global Sum, the Carr-Hill Formula and Weighted Patients"`
- `title: "How GMS Funding Works: Global Sum and the Carr-Hill Formula Explained"`
- `metaDescription`, `slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block, `altText`
- All **9** existing H2 strings, in their existing relative order
- All **8** existing H3 strings
- All **14** existing FAQ question and answer strings
- All **5** existing `keyTakeaways` strings
- All **5** existing `howtoSteps` name and text pairs

**Countable test: `git diff` shows ONLY additions. Deletion count must be 0.**

**The O13 clause (6.3 point 4) is the one place where that rule and an ownership row pull against each other.**
The clause "reimbursements such as locum cover for parental or sickness leave are exactly that, reimbursements,
not a windfall" is O13's fact with no link. The writer **leaves it byte-identical**, places the required link to
`/blog/maternity-pay-and-maternity-allowance-for-doctors` inside a NEW block, and **escalates the clause to the
manager as a named item**. The manager decides whether a link-only insertion into an existing sentence is
permitted as an ownership-compliance exception. If it is not permitted, the clause stays and the new-block link
carries O13. **The writer must not resolve this alone.** Recorded here so the decision exists rather than being
made silently either way.

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

The existing page contains **no arithmetic**. G1 requires **exactly one** worked example on this page, and §5
point 3 says every click it earns comes from someone trying to do the sum. **If a worked example is written,
every figure must be re-derived from stated inputs by `arithmetic_recomputed[]`.**

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| **£130.07** per weighted patient | 2026/27 | `house_positions.md` §3.A; SFE Directions 2026 paragraph 3(4), read at source 2026-08-26 by `curl` + `pdftotext -layout` |
| **£2.18** London Adjustment per registered patient inside the GLA area | 2026/27 | same |
| **0.6%** Initial GSMP reduction, minor surgery not provided | 2026/27 | same, Table at paragraph 3(6) |
| **4.70%** Initial GSMP reduction, out of hours not provided | 2026/27 | same |
| **£485 million** uplift, **£13,863 million** total, **3.6% cash / 1.4% real terms** | 2026/27 | `house_positions.md` §3, NHS England long-read, **and** bma.org.uk (4.5). Triple-sourced. |
| **1 April 2026** SFE commencement | | SFE paragraph 2(4) |
| **SI 2015/1862** and the 14-day contract-variation notice | | `house_positions.md` §3; bma.org.uk (4.5) |

**BANNED FIGURES on this page. None of these may be asserted:**

| Banned | Why | What the page says instead |
|---|---|---|
| **Any QOF point value in pounds** | O10 and O25. **BATCH3_INDEX §6.1 O10 states it is UNVERIFIED and a hard fail F5, and V7 makes the map binding.** See the correction at §10.1: `house_positions.md` §3.B has since verified it and lifted the ban, and the two documents now disagree. **The MAP WINS. State nothing.** | One sentence naming QOF as a funding stream, then the existing link to `/blog/qof-income-gp-practice-accounting-explained`. |
| **The 18 additional QOF points and c.£25m** | O25's fact, now corroborated (4.5) and still not this page's. | Not stated at all. |
| **Any GMC annual retention fee** | O9. UNVERIFIED, GMC returns HTTP 403 to automated fetch. Not otherwise relevant here. | Not applicable; listed for completeness of the ban. |
| **Any Carr-Hill coefficient, multiplier or weighting percentage** | Not in house positions and not published in a form we have read at source. The page's existing refusal to invent multipliers is a KEEP. Note the click-earning Bing queries `sfe carr hill coefficient` and `carr -hil funding multipliers` are **demand for exactly this figure**, and the correct answer is to explain the direction each variable pushes and to name where the formula lives, not to invent a number. | "the precise weightings the formula applies are technical and are not something a practice sets" (existing copy), plus the new block naming the Global Sum Allocation Formula and the review. |
| **Any ARRS, PCN DES, enhanced-services or dispensing figure** | O20, O21, O22, O23, O24. | One sentence and a link each. |
| **`£87.92` or any prior-year Global Sum as a current figure** | Competitor-sourced from a 2019 post (4.1) and eight years stale. | If prior-year framing is wanted at all, one subordinate clause, labelled as prior, per F2. |
| **The `circa 62% / 34% / 4%` contract split presented as 2026/27** | practiceindex, 2019 (4.1). F6 forbids a percentage without a named source. | Attribute it to Practice Index, date it 2019, and say the split has shifted since. Or omit. |
| **The `around 10% less funding per patient` deprivation figure** | practiceindex reporting Nuffield Trust / Health Foundation (4.2). Third-hand. F6. | Verify at the Nuffield Trust or Health Foundation and cite them directly, or state the critique with no number. |
| **Any fabricated statistic, "most practices", "we find that around X%"** | F6, I6. | Nothing. |

**Countable test: count of banned-figure assertions on the page = 0.**

**If the worked example is written, it must satisfy G3's five components in order** (a one-line named persona with
a role and a rounded figure, the inputs, the arithmetic step by step, the result, one sentence on what changes the
answer), **G4** (role plus an initial only, explicitly illustrative, never a real practice), **G6** (the heading
must NOT be the words "Worked example" and the block must not open with a "Worked example:" prefix; hard fail,
and our corpus already contains that string in 13 files) and **G7** (80 to 200 words).

**A note the writer will need.** Rounded illustrative inputs are fine and the **rates must be the real ones**
(G5: every rate used traces to house positions and the example never introduces a rate the body has not already
stated with its year). So: an illustrative weighted list, the real £130.07, the real £2.18 where London is in
scope, and the real 4.70% or 0.6% where the example turns on a deduction. **The list size is illustrative; the
prices are not.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source URL to re-verify |
|---|---|
| £130.07 per weighted patient, £2.18 London Adjustment, the 0.6% and 4.70% deductions, 1 April 2026 commencement, "Global Sum Allocation Formula", "Contractor Weighted Population" | https://assets.publishing.service.gov.uk/media/69cbe5032d120d9d5ec0f352/general-medical-services-statement-of-financial-entitlements-directions-2026.pdf (paragraphs 2(4), 3(4), 3(6)) |
| Amending instruments do not touch Section 3 | https://assets.publishing.service.gov.uk/media/69f35d355c1bc131b7d1eba8/general-medical-services-statement-of-financial-entitlements-amendment-directions-2026.pdf and https://assets.publishing.service.gov.uk/media/6a3b8edd33bc5beefd3c4818/general-medical-services-statement-of-financial-entitlements-amendment-no2-directions-2026.pdf |
| GMS contract regulations; the 14-day variation notice | https://www.legislation.gov.uk/uksi/2015/1862 (SI 2015/1862) |
| 2026/27 settlement: £485m, £13,863m, 3.6% cash / 1.4% real | https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ and https://www.bma.org.uk/pay-and-contracts/contracts/gp-contract/gp-contract-changes-england-202627 |
| PMS and APMS parity of the 2026/27 changes | https://www.england.nhs.uk/long-read/implementing-the-2026-27-gp-contract-changes-to-personal-medical-services-and-alternative-provider-medical-services-contracts/ |
| **The Carr-Hill review: NIHR, DHSC, six months, launched October 2025, five objectives** | **Must be verified at DHSC / NIHR / gov.uk before stating. A competitor blog is not a source** (4.2 is practiceindex). |
| **The deprivation evidence (~10% less funding per patient in deprived areas)** | **Nuffield Trust and/or the Health Foundation directly. Do not cite via practiceindex.** F6. |
| **NHS England's Global Sum "ready reckoner": that it still exists, its current name and its URL** | **Must be verified at NHS England before naming it.** If it cannot be verified, phrase 14 of §7.1 is dropped (not guessed) and the countable test becomes 13 of 13. |
| Where a practice sees its own registered and weighted list figures (PCSE / Open Exeter / the quarterly CRP statement) | **Must be verified at PCSE before stating a route.** https://pcse.england.nhs.uk/ |
| The 62/34/4 contract-type split | practiceindex.co.uk 2019 (4.1). **Attribute and date it, or omit.** If a current split is wanted, NHS England GP contract services data is the primary source. |
| Partner taxed on profit share not drawings; SA800 and SA104 | `house_positions.md` §1 |
| Type 1 Annual Certificate of Pensionable Profits | https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate ; `house_positions.md` §2.C |
| A company cannot hold a GMS/PMS contract; company income is not NHS-pensionable | `house_positions.md` §2.C |
| Core NHS GMS income outside the scope of VAT | `house_positions.md` §6; the explanation belongs to O17, not here |

**Countable test: every external factual claim in the NEW blocks maps to a row above with a fetch date. Count of
unverified claims = 0.**

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug how-gms-funding-works-global-sum-carr-hill-explained` | Gate bar met; **0 covered queries lost** |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure in the worked example re-derived from stated inputs, using the real 2026/27 rates per §7.4 |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; every new link resolves via `slug_resolver.py`. **All 16 existing internal link targets were confirmed present in `Medical/web/content/blog/` on 2026-08-26.** |
| 5. Equity preservation | §7.2 | **52 of 52** matchable |
| 6. Cluster coverage | §7.1 | **14 of 14** (or 13 of 13) assigned phrases placed |
| 7. Reconciliation balance | Dossier §10 | **Absorbing NO-PAGE corrected order 12 (row #20, 3 keywords, 1,180 volume) moves those 3 keywords from the `NO-PAGE` bucket to `assigned` when this page ships. Record the move so the ledger still balances.** |
| 8. Competitor re-read | §4.7 | **16 themes, 16 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere, including frontmatter. The live file has **0** and must still have 0. I1,
   hard fail.
2. **No new internal link inside any existing paragraph** (see §7.3 for the single O13 escalation).
3. **No new H3 under an existing H2.** New H3s only inside a new H2 block.
4. **No collapse, no redirect, no URL change.** K4.
5. **Never use UDAs, dental bands or any dental framing.** `house_positions.md` §3 is explicit: doctors do not use
   UDAs.
6. **Never state or imply that a limited company can hold a GMS or PMS contract.** §2.C.
7. **Never describe QOF as compulsory.** It is voluntary (§3), and the existing page is already correct.
8. **Never state that 2025/26 is the current contract year.** §3: the live year is 2026/27 and 2025/26 is the
   prior year.
9. **The new blocks carry ZERO first-person plural** ("we", "our", "us"), because the page is already at 6.6 per
   1,000 against a C4 cap of 3 and the existing instances are frozen. This is the only part of C4 the writer
   controls (§6.3 point 11).
10. **The new blocks run second person throughout**, to lift the page toward the C3 band of 12 to 25 per 1,000
    without touching existing text (§6.3 point 12).
11. **No named individual, no credential, no byline, no "reviewed by".** I2. This includes not quoting the BMA
    GPC officer named by practiceindex at 4.2 (see 4.7 theme 7).
12. **Do not touch any frozen page.** The 19 slugs of BATCH3_INDEX §1, including the three `status='flagged'`
    rows. **Contextual links to their live URLs are fine** and five already exist.
13. **`nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date.** No Scheme Pays deadline may
    be stated anywhere on this page. O4. This is the exact fact that broke batch 1.
14. **One change per page per window** (§9.3). This EXTEND is the only change to this URL until the 28-day Bing
    read.

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-08-26

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC `searchanalytics.query`, dimension `page` | 2026-05-25 to 2026-08-23 (90d) | **1 click, 141 impressions, average position 7.28** |
| Google | GSC, dimensions `page` + `query` | same | **1 row** (`d doc prices`, 1 impression, position 2). 140 of 141 impressions anonymised. |
| Bing | `GetPageStats`, **page level** | 7 snapshots, 2026-07-03 to 2026-08-21 | **7 clicks, 129 impressions**, avg impression position 3 to 7 |
| Bing | `GetPageQueryStats`, **named-query level** | as returned | **51 distinct queries, 85 impressions, 7 clicks** |

Pro-rated to 28 days from the 90-day Bing frame: **2.2 clicks**, **40 page-level impressions**, **26 named-query
impressions**.

**The click-through shape.** 7 clicks from 129 page-level impressions is a **5.4% CTR**, and **all 7 clicks come
from calculation queries** while seven separate queries sitting at Bing position 1 to 2 return **zero** clicks.
The page ranks and does not convert on the questions it ranks best for. **That is the thesis of this pack**, and
it is a different thesis from the QOF page's (which converted at 35% and simply was not shown). The remedy here is
answer shape and arithmetic, not vocabulary alone.

### 8.2 The read at 14 to 28 days, Bing (primary)

1. **Named-phrase impressions.** At least **6 of the 14** phrases in §7.1 return at least one Bing impression for
   this URL in the 28-day window, and **at least 2 of those 6 must come from the calculation and find-my-own-figure
   groups** (phrases 12, 13, 14), because those are the intents that carry the clicks. Today the count is 0 of 14.
   **Per §9.6 point 2, total impressions rising while the 14 stay at zero is DRIFT and is recorded as a FAIL, not
   a pass.**
2. **Clicks.** Bing clicks on this URL in a rolling 28-day window at or above **4** (baseline 2.2).
3. **Named-query impressions.** At or above **40** in a rolling 28-day window (baseline 26).
4. **The seven position-1-to-2 zero-click queries.** At least **2 of the 7** listed at §2.4 point 1 register their
   first click. This is the specific test of whether the answer-shape diagnosis was right, and it is the one
   number that separates "we added words" from "we fixed the page".

### 8.3 The read at 28 to 90 days, Google

5. **Position holds.** Average position on the `page` dimension for this URL stays **at or better than 9.0**
   against a baseline of 7.28. A slip inside that band is noise on 141 impressions; a slip beyond it on an
   additive-only change is a signal that additive-only is not as safe as the EXTEND grade assumes, and it would
   need re-examining across the whole batch.
6. **Impressions.** At or above **141** at day 90. No growth target is set: on a corpus where Google indexes 15%
   of URLs, growth here is not in this page's gift.
7. **Query rows.** At least **2 query-level Google rows** for this URL by day 90, against a baseline of 1. Stated
   with low confidence, because 140 of 141 impressions are anonymised and whether a query becomes visible is
   GSC's threshold decision, not ours.

### 8.4 Failure triggers (§9.6, written as numbers, before the change)

> **TRIGGER 1, Google, and it is the tightest constraint on this page.** If the GSC `page`-dimension average
> position for `/blog/how-gms-funding-works-global-sum-carr-hill-explained` falls **below 12.0** in any 28-day
> window between deploy and deploy+90 days, revert:
> `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/how-gms-funding-works-global-sum-carr-hill-explained.md`
> This is the strongest Google position in the untreated corpus and BATCH3_INDEX §8 names it as the one Google
> observation that must not be lost.

> **TRIGGER 2, Bing volume.** If Bing clicks on this URL fall **below 2** in any rolling 28-day window between
> deploy and deploy+56 days, revert to the same sha.

> **TRIGGER 3, equity.** If any of the **51** named Bing queries in §2.3 stops returning an impression for this
> URL for two consecutive 28-day windows, that query is a named BLOCK and is investigated before any further
> change to this page.

**Wave-level context, from BATCH3_INDEX §8, restated because this page is the anchor.** Wave A's six pages carry
a combined Bing baseline of **17 clicks / 234 impressions** page-level, of which this page is **7 clicks / 129
impressions**, so this URL alone is **41% of the wave's clicks and 55% of its impressions**. The wave revert
trigger is combined Bing clicks below 13 at the 28-day read. **A fall on this page alone can trip the whole
wave's trigger**, which is the argument for treating triggers 1 to 3 as page-level and acting on them first.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **14 missing
phrases of §7.1**, not with the 51 queries the page already ranks for. **`monitored_pages` registration is a
separate owner-triggered step and has not been done by this task.** No monitor, alert or scheduled job was
created.

---

## 9. THE OWNERSHIP MAP, reproduced in full

**This is the most important part of this pack.** Batch 1 failed because twelve pages were written with no map and
the same explanation landed on seven of them. The rows below are reproduced **verbatim and in full** from
`BATCH3_INDEX.md` §6.

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a link,
never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the map, states
neither fact, and reports the conflict. A brief is an instruction about ONE page; only the map can see the batch.
This pack contains one such conflict, at §10.1, and it resolves it the map's way.

### 9.1 THE ROW THIS PAGE OWNS

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12 (`what is a GMS contract`, `apms contract`, 1,140 peer-winnable).** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** Batch 1 put the tier table on three pages that did not own it; this is the same shape and it is pre-empted here. |

**What owning O19 means for this writer, stated positively.** This page is the only page on the site that may
explain the Global Sum, the Carr-Hill formula and its variables, the London Adjustment, the deductions, and the
GMS / PMS / APMS comparison. It may state £130.07 with its 2026/27 tag. It absorbs the GMS/APMS NO-PAGE topic as
a named new H2 section. **Everything else in wave A is one sentence and a link.**

### 9.2 THE ROWS THAT CONSTRAIN THIS PAGE (new, batch 3, wave A)

| # | Shared fact | **Owner** | **What THIS page does** |
|---|---|---|---|
| **O20** | The **Network Contract DES and the PCN funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. | `/blog/pcn-funding-network-contract-des-explained` | **One sentence saying PCN money sits outside the core contract, then link.** The live page currently gives it one bullet with no link; the new boundary block should carry the link. |
| **O21** | **ARRS**: which roles are reimbursable, the reimbursement mechanics and caps, **who employs ARRS staff**, the payroll, pension and employer-NIC consequences, and the VAT trap when staff are shared between practices. | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | **One sentence and a link.** Do not explain the employment model. The live page names ARRS once inside the PCN bullet, which is correct and should gain a link. |
| **O22** | **PCN clinical director payments**: how the CD payment is calculated, whether it is employment or self-employment income, how it is taxed, and how it interacts with a partner's profit share. | `/blog/pcn-clinical-director-payments-tax` | **One sentence and a link. No tax treatment stated anywhere else.** The live page does not mention it at all, which is compliant. |
| **O23** | **Locally commissioned and enhanced services**: DES vs LES vs national enhanced services, how they are contracted, invoiced and recognised in the accounts. | `/blog/enhanced-services-gp-practice-income-tax` | **One sentence naming enhanced services as a funding stream, then link.** Already satisfied on the live page. Note the Bing query `what are the gms des income` lands here: the boundary block may name DES and hand off, and must not explain it. |
| **O24** | **Dispensing practice income**: the dispensing fee and drug-reimbursement structure, and the **zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12** as distinct from the Sch 9 Group 7 medical-care exemption. | `/blog/dispensing-practice-income-accounts-tax` | **No other page mentions dispensing income at all** beyond naming it as a stream. The live page gives it one bullet with no explanation, which is compliant. **Never state the zero-rating here.** |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **One sentence and a link. Not reopened in this batch. No page states a QOF point value (O10, hard fail F5).** The live page already does this correctly, twice. **See the correction at §10.1.** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | **Every page that mentions a payment landing gets ONE sentence and a link.** Five pages describing income recognition five times is the batch-1 failure. **This binds this page hard**: the existing H3 `How the Global Sum is paid and reconciled` and the remittance-unbundling paragraph are right at the boundary. They are EXISTING copy and stay. **The new blocks must not add any further reconciliation explanation, and any new mention of a payment landing carries the link to the PCSE page.** |

### 9.3 THE INHERITED ROWS THAT STILL BIND THIS PAGE

| # | Shared fact | Owner | **What THIS page does** |
|---|---|---|---|
| **O1** | NHS tiered member contribution rates and bands (1 April 2026) | `/calculators/nhs-superannuation-tiered-contribution` | **No page in any wave carries the tier table. One sentence, then link.** Relevant here because the Bing query `how are gp partners pension contributions factored into global sum payments?` sits at position 1.0 with zero clicks. **Answer the Global Sum side of it, hand off the contribution-rate side.** |
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | One sentence, then link. Not needed on this page. |
| **O4** | Scheme Pays: two-limb election, mandatory vs voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **`/blog/nhs-pension-scheme-pays-doctors-deadlines` is being prepared separately and is not this batch's at any date. No batch-3 page states a Scheme Pays deadline. This is the exact fact that broke batch 1.** |
| **O9** | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** |
| **O10** | Global Sum per weighted patient (**£130.07, 2026/27, verified**) and the QOF point value (**UNVERIFIED**) | `house_positions.md` §3.A and §3.B | **Wave A: the GMS page may state £130.07 with its year tag. No page in any wave states a QOF point value. Hard fail F5.** **See §10.1: house positions and this row now disagree, and the MAP WINS.** |
| **O11** | SMP versus Maternity Allowance | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | One sentence, then link. Not needed on this page. |
| **O12** | Pension accrual during maternity and statutory leave | same | One sentence, then link. Not needed on this page. |
| **O13** | **GP practice reimbursement for parental-leave cover under the SFE** | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | **Wave A: the GMS and enhanced-services pages get one sentence and a link. This is a real collision, see O19.** **THIS PAGE IS CURRENTLY IN BREACH IN ONE CLAUSE, WITH NO LINK.** See §6.3 point 4 and §7.3. Escalated, not resolved by the writer. |
| **O14** | "What a healthcare accountant does", the audience list, the national commercial pitch | `/blog/healthcare-accountants-uk` | Wave G in full. **This page's `How we help GP practices` H2 is existing frozen copy and is not touched.** No national commercial vocabulary is added. |
| **O16** | Practice-ownership economics shared with veterinary | the existing GP and private-practice corpus | Unchanged. |
| **O17** | **VAT: healthcare exemption versus standard rating** | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **This page gets one sentence and a link and does NOT explain the exemption.** Already satisfied by the existing "one line is enough here" paragraph. **Do not expand it. Do not state the Sch 9 Group 7 or Sch 8 Group 12 statutory references here.** |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | One sentence, then link. |
| **O27** | **Notional rent and cost rent**: what each is, how the district valuer sets notional rent, the current-market-rent basis, reviews, and the Premises Costs Directions framework. | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` (wave B) | **This page names premises reimbursement as an income line and must NOT explain the valuation basis.** Already compliant: the live page gives it one bullet and one clause. **Add the link, do not add words.** |
| **O29** | **The own-versus-rent decision**: capital, borrowing, the tax treatment of owning surgery premises, CGT on a later disposal, and the partnership capital-account consequence. | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` (wave B) | One sentence and a link at most. Not needed on this page. |
| **O30** | **The partnership capital account itself** | frozen partnership set, wave E | **One sentence and a link only, and the link target must be checked live because five partnership pages are frozen. Do not explain capital accounts.** |
| **O33** | **Incorporation of a medical practice**: s.162 relief, the step sequence, and the pension-accrual loss that must be paired with every tax saving | Wave C, one page only, named after the defect D3 ruling | **This page's `The pension angle` H2 correctly states the accrual loss and links out to `/blog/gp-corporation-tax` without explaining incorporation. Already compliant. Add nothing.** |
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **No dividend rate may be stated on this page.** The existing "dividends build no NHS pension at all" is a pension statement, not an extraction statement, and it stays. |
| **O35** | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work) | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | **Every wave: one sentence, then link. No batch-3 page rebuilds the four-role table.** This page correctly states the partner position only and links out. |

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. Batch 2's O7 split was ratified precisely because two
writers converged on the same boundary independently and said so. The opposite signal, one writer quietly
annexing another's fact, is what V3 exists to catch and it looks nothing like this.

**This pack proposes no boundary change to any O-row.** It reports one document-level conflict (§10.1), one
compliance breach in existing frozen copy (§10.2), and three corrections to the index and dossier (§10.3 to
§10.5).

### 9.5 Batch-level style watch (V5 and V9), and it is the CONDUCTOR's job, not this writer's

Batch 1 produced one tic across ten authors (`it is not X, it is Y`, three to seven times a page). Batch 2 complied
and produced a **different** tic: seven writers independently converged on the numeral-count paragraph opener
("Two rules that...", "Four levers work...", "Three things account for..."), 22 instances across seven pages
against a cap of two. **V9 is explicit that banning the second tic will produce a third.**

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   wave, is named in that wave's fix pass, whatever it is.** Invisible from inside a single page. Conductor's job.
2. **Named and already burned, do not reach for either:** `it is not X, it is Y` (cap **once per page**,
   wave-wide) and the **numeral-count paragraph opener** (cap **once per page**, wave-wide, and prefer zero).
   **This page's existing copy contains zero of both** (§6.3 point 13), so the whole per-page budget is
   available to the new blocks and the correct spend is still zero.
3. **The house reflex to watch third:** V9's corollary records five of seven batch-2 pages opening with a
   corrective clause in the first two sentences. **Batch 3 is the third batch and V9 says a third showing should
   be varied deliberately. Wave A's conductor decides the variation and states it in the wave's fix pass.**
   Noted for the conductor: this page's frozen H2 `GMS funding is practice income, not your pay` is already a
   corrective construction, and it is frozen, so wave A starts with one on the board that cannot be removed.
4. **V1 hard cap: two word orders per idea per page, counted as non-overlapping longest matches, never raw
   substrings. Any V1 finding must quote the spans it counted.** §7.1 is built to this and states its idea groups.
5. **V2 is a live standard, not a batch-2 rule.** This page was checked against it and is clean (§6.3 point 13).
6. **V7: where a conductor's brief and this map disagree, THE MAP WINS.** §10.1.

---

## 10. Corrections to the index or the dossier

Five, each with the command or document that produced it. **None was acted on.** Nothing outside this file was
written.

### 10.1 THE ONE THAT MATTERS: house positions has released a ban that the ownership map still enforces

**`house_positions.md` §3.B and `BATCH3_INDEX.md` §6.1 row O10 now contradict each other.**

- **BATCH3_INDEX §6.1, O10**, and `language_spec_2026-08-26.md` rule **F5**, and the writer brief for this task,
  all state that the **QOF point value is UNVERIFIED** and that stating it is a **hard fail**.
- **`house_positions.md` §3.B**, headed **"QOF point value (VERIFIED AT SOURCE 2026-08-26, block lifted)"**,
  states the value is **£227.95 for 2026/27**, quotes SFE Directions 2026 paragraphs 6(6)(b), 6(7), 6(8) and Annex
  E paragraph E4 verbatim, records the `curl` plus `pdftotext -layout` verification method, records that neither
  2026 amending instrument touches Section 6 or Annex E, and says in terms: **"The previous UNVERIFIED block on
  the QOF point value is lifted, and the ban in the batch-2 ownership map row O10 can be released for this figure
  (the GMC retention fee in §8 and the O10 ban on that figure both stand)."**

**How this pack resolves it: THE MAP WINS (V7).** This page states no QOF point value, which costs it nothing,
because QOF is **O25's** fact and this page's only permitted treatment is one sentence and a link either way.
**The resolution is free for this page and is not free for the QOF page**, which is inside its batch-1 read window
and whose own pack (§7.4) bans the figure on the strength of an UNVERIFIED marker that no longer exists.

**Three documents need updating and this task did not update any of them:**
1. `BATCH3_INDEX.md` §6.1 row O10, to release the QOF half of the ban and keep the GMC half.
2. `language_spec_2026-08-26.md` rule F5, which still reads "the GMC annual retention fee, and the Global Sum per
   weighted patient or QOF point value" and is now wrong on **two of its three items**: the Global Sum was
   verified at §3.A and the QOF point value at §3.B. **Only the GMC retention fee remains UNVERIFIED.** F5 also
   still instructs pages to "say Global Sum and QOF values were uplifted for 2026/27 and direct the reader to the
   Statement of Financial Entitlements Directions 2026", which is now the wrong instruction for both figures.
   Note the live page already states £130.07, which under a literal reading of the un-updated F5 would be flagged
   as a **hard fail by an editorial QA agent reading the language spec rather than house positions.** That is a
   live false-positive risk on wave A's anchor page and it is the practical reason this correction is urgent.
3. The `language_spec` §9.5 QA runsheet, which lists F5 under "Hard fails, no exceptions".

**Recommended ruling for the conductor, in one line:** update F5 and O10 to name the **GMC annual retention fee
alone** as UNVERIFIED, and release both SFE-verified figures to their owning pages (Global Sum to this page under
O19, QOF point value to the QOF page under O25).

### 10.2 This page is in breach of O13 in one clause, in frozen copy

Recorded rather than fixed. The body clause "reimbursements such as locum cover for parental or sickness leave are
exactly that, reimbursements, not a windfall" is **O13's fact carried with no link**. BATCH3_INDEX §6.1 flags O13
as "a real collision, see O19" and this is that collision, already live in the corpus. **EXTEND forbids rewording
existing copy**, so the writer leaves it byte-identical and places the O13 link in a new block. **The manager
decides whether a link-only insertion into the existing sentence is permitted.** See §6.3 point 4 and §7.3.

### 10.3 BATCH3_INDEX §6's stated HEAD sha is not the HEAD sha

BATCH3_INDEX §0 records "Repo HEAD at build time `7be12b11`". `git rev-parse HEAD` run 2026-08-26 returns
**`d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`**, which is the batch-2 ship commit the index's own header line
names. **Every revert command in every batch-3 pack must anchor on `d2e75655`.** This pack does.

### 10.4 The Bing endpoint gap is 129 against 85, not 129 against 51

BATCH3_INDEX §0.2 and defect **D2** both state that this page reports "129 impressions and 7 clicks at
`GetPageStats` page level and **55 named-query rows summing to 51 impressions** at `GetPageQueryStats`", and D2
calls the gap "a factor of 2.5". The writer brief repeats it as "55 rows summing to roughly 51 impressions".

**A fresh `get_page_query_stats` call on 2026-08-26 returns 55 rows, 51 DISTINCT QUERIES, 85 impressions and 7
clicks.** The 51 is the **distinct query count**, not an impression sum, and the two numbers were transposed.
**The real endpoint gap is 129 against 85, a factor of 1.5, and the clicks agree exactly at 7 on both endpoints.**

**This makes D2's point stronger, not weaker.** Two endpoints that agree perfectly on clicks and diverge 1.5x on
impressions are more confusing than two that diverge 2.5x, because the agreement invites the comparison the trap
forbids. **D2 should be restated with the corrected figures** and `REWRITE_PROGRAM.md` §9.2 should still be
amended to name the endpoint, exactly as D2 says.

### 10.5 Three smaller corrections

1. **Corrected dossier §4 order 12's peer-winnable figure re-derives to 1,090, not 1,140.** My derivation from the
   persisted harvest (§3.3) gives `what is a gms` (1,000, position 20) plus `apms contracts` (90, position 16),
   with `apms contract` at position 21 falling one place outside the <= 20 threshold. The 50-volume difference is
   most likely `gms contract 25/26` (50, position 21). **This is inside the correction note's own stated tolerance
   ("reliable for ORDERING and should not be quoted to the pound") and does not move order 12.** No dossier edit
   is needed; the correction is to any later quotation of the figure as exact.
2. **A `pms` regex on this harvest returns a false positive that will recur.** `pms instruments` (50 volume,
   practiceindex position 7) is a **healthcare-technology vendor in Maidenhead**, verified by fetch (4.3), not
   Personal Medical Services. Anyone re-deriving this cluster will pick it up again. Recorded so the exclusion is
   a decision rather than an omission.
3. **The "18 QOF points, c.£25m" figure is no longer single-sourced.** The exemplar QOF pack (4.6) flagged it as
   BHP-only and unverified. **bma.org.uk states it directly** (4.5, fetched HTTP 200 on 2026-08-26): "These
   changes are supported by an additional 18 QOF points (c.£25m)." That is a peer accountancy firm and the
   profession's own trade body agreeing. **This is O25's fact and this page must not state it**, but the QOF
   page's `COVER only if verified` decision now has its verification and should be revisited when that page's
   read window closes.

---

## 11. Limitations

1. **The `medical_stage0/` pulls named in this task's brief were missing and were re-created.** The scratchpad
   contained one file, `B3_WRITER_BRIEF.md`. A `find` across every session scratchpad under
   `%TEMP%/claude/C--Users-user-Documents-Accounting/*/scratchpad` for `gsc_page_rows.json`, `bing_page_stats.json`,
   `bing_page_query_waveAB.json` and `grades.csv` returned nothing. **This is the second consecutive task to hit
   this** (BATCH3_INDEX §0.1 records the first). Every figure in §2 is from a fresh free API call made by this
   task. The Google page figure (1 / 141 / 7.28) and the Bing page-level figure (7 / 129) **reproduce the brief's
   and the index's numbers exactly**, which is a genuine independent corroboration; the named-query figure does
   not, and §10.4 explains why. **If the originals resurface with a different window, the grade must be
   re-derived, not reconciled.**
2. **`GetPageStats` is a top-N endpoint** (BATCH3_INDEX §9 limitation 2). This page is absent from six of the
   thirteen weekly snapshots in the window. **129 is a floor, not a total**, and the same caveat applies to the
   28-day pro-rata baselines in §8.1.
3. **The DataForSEO harvest is a weak map of this topic.** Seventeen keywords, one real holder, and **zero rows
   for `global sum` in any phrasing**. §7.1 is therefore built primarily from Bing named-query evidence rather
   than from the harvest, which is a departure from the exemplar pack's method (§3.4 point 3). The consequence is
   that the missing-phrase list is **smaller and better evidenced** than the QOF pack's 31, and it is measured
   against a demand signal Google cannot see.
4. **Peer-winnable is Google-derived**, because DataForSEO positions are Google positions. Per owner decision 21
   it orders the work and excludes nothing. On this page, where Bing carries all seven clicks and Google carries
   one, that limitation bites harder than usual.
5. **Four competitor pages were fetched and one URL returned HTTP 404** (§4.6). The 404 was a URL guess, not a
   dead peer page, and the live BMA page was located and fetched at 4.5. **No fetch was silently dropped.**
6. **No live-production check was run against medicalaccounts.co.uk.** The page's rendering mode, its internal
   link targets and its heading structure are all derived from the source file and from the repo, not from a
   request to the live site. All 16 internal link targets were confirmed to exist as markdown files; **that they
   render at the expected URLs was not verified live.**
7. **Three facts in §4 are competitor-sourced and must be verified at source before any of them is written**
   (§7.5): the Carr-Hill review's commissioner, scope and dates; the ~10% deprivation funding figure; and the
   existence and current URL of NHS England's ready reckoner. **A competitor blog is not a source.** If the ready
   reckoner cannot be verified, §7.1 drops to 13 phrases rather than guessing.
8. **The 62/34/4 contract-type split is a 2019 figure from a 2019 post.** It is the only quantification of
   contract prevalence found anywhere in the peer set, and it is eight years old. Attribute and date it, or omit
   it. **Do not present it as current.**

---

## ADDENDUM 2026-09-01 (owed from the 2026-08-26 close; BATCH3_INDEX "Still open after this batch")

Two places where this pack's instructions and the shipped page now disagree, both accepted
KNOWINGLY at QA on 2026-08-26. A future KEEP-list audit must read these as ratified
overrides, not deviations:

1. The section 5 KEEP list's "inventing multipliers" line and its funnel paragraph both
   contradict the shipped page. The shipped wording stands.
2. Section 1 forbade replacing a body under a frozen H2. The accounts section's body WAS
   replaced under its frozen H2, deliberately, and the change was accepted.
