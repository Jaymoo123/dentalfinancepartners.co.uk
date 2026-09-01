# §9.5 RESEARCH PACK: /blog/salary-vs-dividend-medical-limited-company-2026

**Batch 3, wave C (incorporation and company structures), PROFIT-EXTRACTION SET. This page is the HUB. GRADE = REFRAME.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (rules A to L, V1 to V9). Ground truth
`docs/medical/house_positions.md`. Batch index `docs/medical/packs/BATCH3_INDEX.md` (wave C section,
**D3 RULED 2026-09-01**, ownership map O1 to O36, §6.3 style watch, defects D1 to D18). Site state
`docs/medical/STATE.md`, **Stage 0 diagnosis 2026-09-01**. Peer set
`docs/medical/competitor_universe_2026-08-26.md` §2a plus the 17 domains re-classified as peers by the
D13 resolution (39 peers of 44 harvested). Format exemplar
`docs/medical/packs/PACK_B3_blog__how-gms-funding-works-global-sum-carr-hill-explained.md`.

**Sibling packs, written together with this one for coherence:**
`PACK_C_blog__surplus-cash-medical-limited-company-options.md` and `PACK_C_blog__gp-corporation-tax.md`.
Both are SATELLITES of this page under ownership row **O34**.

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed,
deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled
job created. **No paid API call: $0.00.** DataForSEO was read from the persisted harvest by SQL only.
GSC (Search Analytics and URL Inspection) and Bing Webmaster calls are free; six were made. Thirteen
competitor URLs were fetched live with a full browser header set. **No git command was run by this
task** beyond a single read-only `git log -1 --format=%H`, and see §1 on why the writer must re-derive
the sha anyway.

---

## 1. Target and permission level

### The constraint, first

**GRADE = REFRAME. FULL REWRITE PERMITTED. K2 does not apply.** But see §1.1: this page is NOT a
no-equity page, and the REFRAME grade is doing less work here than it does on a page with nothing at all.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/salary-vs-dividend-medical-limited-company-2026` |
| Cluster / topic | Profit extraction from a private medical or consultant limited company. **This page is the hub of the extraction set.** |
| Wave | **C**, incorporation and company structures. Unblocked by the D3 ruling of 2026-09-01. |
| Source file | `Medical/web/content/blog/salary-vs-dividend-medical-limited-company-2026.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** The writer edits the `.md` file directly and writes blocks as raw HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<table>`) to match. Frontmatter carries `title`, `metaTitle`, `metaDescription`, `h1`, `keyTakeaways`, `summary` and the `faqs` list. There is no `howtoSteps` key on this file. |
| Category | `Incorporation & Company Structures` (an existing TSX hub route; do not change it) |
| Repo HEAD seen at build time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` |
| Revert path | `git checkout <sha derived at write time> -- Medical/web/content/blog/salary-vs-dividend-medical-limited-company-2026.md` |

> **HEAD DISCIPLINE, and BATCH3_INDEX §0 is emphatic about it.** The sha above was read once, on
> 2026-09-01, and other agents commit to this repo concurrently: the batch-3 index records HEAD moving
> three times inside a single writing session. **Do not copy the sha above into the revert command.**
> Derive it at the moment you write the command, preferably with
> `git log -1 --format=%H -- Medical/web/content/blog/salary-vs-dividend-medical-limited-company-2026.md`,
> which anchors on the last commit that touched this file rather than on a repo-wide HEAD that may carry
> nine other agents' work. Verify the anchor is byte-identical to the working tree before you rely on it.
>
> **Revert consequence, stated because it is the blast radius.** A single-file `git checkout` restores the
> whole file, frontmatter included. The `image` and `imageCredit` block on this file came from the
> 2026-08-26 hero backfill (`bb1db095`), so an anchor older than that strips the hero image along with
> the content. Any anchor at or after `38a8ba75` (the 2026-08-26 Medical deploy) is safe on that point.
>
> **No `monitored_pages` row exists for this slug (§1.2), so there is no measurement window to break and
> no registration to unwind. Registration is owner-gated and is not part of this work.**

### 1.1 What REFRAME does NOT mean on this page, and this is the pack's first correction to the index

BATCH3_INDEX §5's wave C entry says wave C "is the lowest-risk wave in the batch: there is almost nothing
to lose and a full rewrite is permitted on nine pages", and cites `salary-vs-dividend` at **10 Google
impressions**.

**The impression count is right in character and the "nothing to lose" reading is wrong.** Fresh pull,
2026-09-01, GSC page dimension, 90-day window: **15 impressions at average position 5.93** (§2.1). And a
**GSC URL Inspection** call the same day returns **`PASS`, coverage `Submitted and indexed`,
self-canonical, last crawled 2026-08-19** (§2.4).

So this is one of the **18 URLs of 139 that Google has indexed at all** (STATE 2026-09-01), and inside
that set it holds one of the site's best average positions. Compare the whole indexed slice: the homepage
sits at 55.1, the head commercial family at 45 to 78. **Position 5.93 is better than every page on this
site except `gp-partner-vs-salaried-gp-tax-comparison` (7.87) and the two-thirds of the partnership
cluster, all of which are FROZEN.**

**The operative reading: this page has a small amount of very good equity, not none.** The grade permits a
full rewrite and the pack takes it, because 15 impressions cannot be defended by preservation and the page
has a real coverage problem (§6). But §7.2 sets a position guard and §8.4 sets a revert trigger on the
position rather than on the volume, because a 5.93 is the thing that could actually be lost here.

### 1.2 Armed-window check, run for this pack

**Required by the brief and by BATCH3_INDEX §1: no status predicate.** Run 2026-09-01 through
`python scripts/_q.py` (Supabase Management API, project `dhlxwmvmkrfnmcgjbntk`):

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- 19 rows
```

The 19 rows are unchanged from BATCH3_INDEX §1: `__home` (**flagged**, 2026-10-06) plus 18 blog slugs to
**2026-09-10**, of which `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines` are
**flagged**. A `status='active'` filter silently excuses those three and that mistake has already been
made twice on this site.

**`salary-vs-dividend-medical-limited-company-2026` is NOT on that list.** Neither is
`surplus-cash-medical-limited-company-options` nor `gp-corporation-tax`. **All three surfaces in this set
are free to work today, with no gate.**

**One frozen page is central to this page's boundary and must not be edited.**
`gp-limited-company-tax-benefits-drawbacks` is frozen to **2026-09-10**, is **indexed** (URL Inspection,
2026-09-01, last crawl 2026-08-26) and carries **96 Google impressions, 4 clicks, position 5.66** over 90
days, which makes it the best-earning page in the whole incorporation cluster. It owns the
should-I-incorporate question and this page links to it twice today. **Per batch-1 coordinator ruling 5,
contextual links to a frozen page's live URL are fine; editing the frozen file is not.** Keep both links,
add no third, and take nothing from its topic.

### What may change: everything

REFRAME permits a full overhaul: `metaTitle`, `metaDescription`, `h1`, `title`, every H2 and H3, the body,
the FAQ list, `keyTakeaways` and `summary`. **What may NOT change is the `slug`, the `canonical`, the
`category`, the `date`, the `image` and the whole `imageCredit` block, and the `altText`.**

**Never propose a collapse, a redirect or a URL change** (K4, and the estate-wide "never collapse" rule).
**No em-dashes** (I1): the live file contains **zero** and must still contain zero.

### The four hard permissions this page does NOT have

1. **It may not explain the £100,000 to £125,140 personal-allowance taper or the 60% effective band.**
   O3, owner `/blog/adjusted-net-income-doctors-60-percent-tax-trap` (file confirmed present
   2026-09-01). One sentence, then link. See §9 for the exact wording of the fence and for why stating
   `£125,140` as the additional-rate threshold is NOT a breach.
2. **It may not explain the annual allowance, the taper or carry-forward mechanics.** O2, owner
   `/calculators/nhs-pension-annual-allowance`. One sentence, then link. The live page currently runs a
   full paragraph on it (§6.3 point 6).
3. **It may not carry incorporation prose.** O33, owner `/blog/medical-practice-incorporation-step-by-step`
   (named by the D3 ruling of 2026-09-01). The live page already handles this correctly in its opening.
4. **It may not rebuild the four-role employment-status table.** O35, owner
   `/blog/gp-partner-vs-salaried-gp-tax-comparison`, **FROZEN to 2026-09-10**.

---

## 2. Dual-engine equity register

**Every figure below was pulled fresh by this task on 2026-09-01.** Nothing is quoted from a stored
Supabase snapshot and `gsc_query_data` is not used or summed anywhere (the undercount trap reproduces
against the live API: STATE 2026-09-01 records the query dimension summing to 3 clicks against a true site
total of 108).

**D2 compliance: every engine figure below names its endpoint.** Google page-level, Google query-level,
Bing page-level and Bing named-query-level are four different measurements and none is comparable to
another.

### 2.1 Google, GSC Search Analytics, `page` dimension

```
optimisation_engine.clients.gsc_query_client.GSCQueryFetcher("medical").gsc_client.service
  .searchanalytics().query(
      siteUrl="sc-domain:medicalaccounts.co.uk",
      body={"startDate":"2026-06-03","endDate":"2026-09-01","dimensions":["page"],"rowLimit":1000})
run 2026-09-01  ->  23 rows site-wide
```

| Metric | Value |
|---|---|
| clicks | **0** |
| impressions | **15** |
| ctr | 0 |
| position | **5.933333333333334** |

**Context, from the same call.** 23 page-dimension rows for a 139-URL sitemap. Ranked by impressions this
URL is 17th of 23. Ranked by **position** it is **2nd of the 20 non-fragment rows**, behind only
`/blog/family-investment-company-doctors-consultants` at 4.78 and level with
`/blog/surplus-cash-medical-limited-company-options` at 4.9.

**The incorporation cluster's Google shape, which is the finding that drives this whole pack:**

| URL | Impr | Clicks | Position |
|---|---|---|---|
| `/blog/gp-limited-company-tax-benefits-drawbacks` (**FROZEN**) | 96 | 4 | 5.66 |
| `/blog/family-investment-company-doctors-consultants` | 18 | 0 | 4.78 |
| `/blog/salary-vs-dividend-medical-limited-company-2026` | **15** | **0** | **5.93** |
| `/blog/consultant-directors-loan-account-s455-medical-company` | 13 | 0 | 9.69 |
| `/blog/surplus-cash-medical-limited-company-options` | 10 | 0 | 4.90 |
| `/blog/gp-corporation-tax` | **0** | 0 | never crawled (§2.4) |

**Five of the six extraction-set pages are indexed and every indexed one ranks inside the top 10 on
Google.** Four of the five earn zero clicks. **This cluster's problem is demand volume and click-through,
not position**, and that is a materially different diagnosis from the rest of the Medical corpus, where
STATE 2026-09-01 records a head commercial family sitting at position 45 to 78 with 4,000 impressions.

### 2.2 Google, GSC Search Analytics, `page` + `query` dimension

```
same client, dimensions=["page","query"], rowLimit=5000, same window
run 2026-09-01  ->  288 rows site-wide
```

**Rows for this URL: ZERO.**

**All 15 impressions are anonymised by GSC and carry no query.** That is not a bug and it is not zero
demand: GSC withholds low-volume queries, so a page can hold 15 impressions at position 5.93 with no
visible query row at all. **No writer may conclude anything about Google intent on this page from the
absence**, and no writer may describe the page as "ranking nowhere" (BATCH3_INDEX D5).

The sibling page `surplus-cash-medical-limited-company-options` returns exactly one query row,
`yes please` (1 impression, position 5), which is junk and is recorded in its own pack rather than here.

**Consequence for method:** the missing-phrase list at §7.1 cannot be built from Google query evidence,
because there is none. It is built from the persisted DataForSEO harvest (§3) and from the market's own
word orders as held by the incumbent pages (§4). This is stated so a QA agent reads it as a method choice
and not as a gap.

### 2.3 Bing, `GetPageStats` (page level) and `GetPageQueryStats` (named-query level)

```
optimisation_engine.clients.bing_query_client.BingWebmasterClient()
  .get_page_stats("https://medicalaccounts.co.uk")
      -> 329 rows, 80 distinct URLs
  .get_page_query_stats("https://medicalaccounts.co.uk",
       "https://www.medicalaccounts.co.uk/blog/salary-vs-dividend-medical-limited-company-2026")
      -> 0 rows
run 2026-09-01
```

| Endpoint | Result |
|---|---|
| `GetPageStats`, page level | **0 snapshots. This URL is absent from all 329 rows.** |
| `GetPageQueryStats`, named-query level | **0 rows.** |

**Two disciplines apply and both matter.**

1. **The `GetPageQueryStats` zero is a TRUE zero, not the silent-failure path.** BATCH3_INDEX §0.2 records
   that this endpoint returns an empty list rather than an error when `page` is passed as a path instead
   of the full `https://www.` URL, producing a false negative that a writer then honestly reports as a
   finding. **The call above passed the full `https://www.` URL** (see the code block), and the same
   script returned populated results for other Medical URLs in the same run. The zero is real.
2. **The `GetPageStats` zero is NOT proof of zero Bing impressions.** `GetPageStats` is a top-N endpoint
   (Bing top-N trap memo; BATCH3_INDEX §9 limitation 2). This URL is absent from the top N, which on a
   site where the endpoint surfaces **80 distinct URLs of 139** means it is outside the top 80 by Bing
   traffic. **Record it as "no Bing trace above the top-N floor", never as "zero Bing impressions".**

**Correction to a figure this pack inherited.** STATE's 2026-08-26 entry read `GetPageStats` "303 rows" as
303 Bing-indexed pages. The 2026-09-01 entry already corrects this (one row per page per date; 329 rows
collapse to 80 URLs) and the fresh pull here reproduces the corrected shape exactly: **329 rows, 80
distinct URLs.** Independent corroboration, recorded because the two reads were made by different tasks.

### 2.4 Google, URL Inspection API: the fact that changes this page's expectation

```
POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect
  {"inspectionUrl": "https://www.medicalaccounts.co.uk/blog/salary-vs-dividend-medical-limited-company-2026",
   "siteUrl": "sc-domain:medicalaccounts.co.uk"}
via optimisation_engine.snapshot.index_coverage._call_inspection_with_status, run 2026-09-01, HTTP 200
```

| Field | Value |
|---|---|
| `verdict` | **PASS** |
| `coverageState` | **Submitted and indexed** |
| `lastCrawlTime` | **2026-08-19T23:35:34Z** |
| `pageFetchState` | SUCCESSFUL |
| `robotsTxtState` | ALLOWED |
| `googleCanonical` | self |
| `userCanonical` | self |

**This page is indexed, self-canonical, crawled thirteen days ago and serving cleanly.** It is not one of
the 117 not-indexed URLs and it is not affected by the `/resources/` canonical defect that STATE
2026-09-01 found and fixed. **A rewrite here is a change to a live indexed page that Google already ranks
at 5.93, which is a materially different risk profile from a rewrite of an uncrawled page**, and it is why
§8.4's trigger 1 exists.

### 2.5 THE DO-NOT-LOSE LIST

**It is short, and it is a position rather than a phrase set.**

| # | What must not be lost | Measured by |
|---|---|---|
| 1 | **Google average position at or better than 5.93** on the `page` dimension | GSC Search Analytics, `page` dimension, 90-day window |
| 2 | **Google impressions at or above 15** over 90 days | same |
| 3 | **Index status `PASS` / `Submitted and indexed`, self-canonical** | GSC URL Inspection |
| 4 | The 6 internal inbound links this page receives from within the corpus (§7.6 floor 4) | `scripts/medical_flat_link_audit.py` |

**There is no named-query equity set on this page, on either engine.** Zero GSC query rows, zero Bing
named-query rows. **The equity floor here is genuinely near-empty and it is enumerated above rather than
asserted**, which is what D2 asks for. That is the honest position and it is the reason a full rewrite is
the right call.

---

## 3. The market's keyword set

### 3.1 The selection SQL, printed so the counts are re-derivable

Source: `dataforseo_competitor_data`, `site_key='medical'`. **No new DataForSEO call was made: $0.00.**
Live corpus counts confirmed by the D12 resolution of 2026-08-26 and not re-derived here: **39,296 rows,
31,539 keywords, 44 domains.** Peer set is the **39 domains** of `competitor_universe_2026-08-26.md` §2a
plus the 17 re-classified by the D13 resolution; the 5 institutional non-peers of §2b (`bma.org.uk`,
`themdu.com`, `aisma.org.uk`, `forvismazars.com`, `johnstoncarmichael.com`) are excluded from
peer-winnable.

Run 2026-09-01 through `python scripts/_q.py`:

```sql
with peers as (select unnest(array[ /* the 39 peers, listed in the scratchpad query */ ]) d)
select ranked_keyword, max(search_volume) vol, min(position) best,
       min(position) filter (where competitor_domain in (select d from peers)) peerbest,
       (array_agg(competitor_domain order by position))[1] holder,
       (array_agg(url order by position))[1] topurl
from dataforseo_competitor_data
where site_key='medical'
  and ranked_keyword ~* '\ysalary\y.*\ydividend|\ydividend\y.*\ysalary|\ydividend tax|dividend rate|dividend allowance|\ydirectors? salary|optimum salary|most tax.?efficient salary|\yprofit extraction|taking money out of (a|your|my) (limited )?company|\ys455\y|directors loan|director.s loan|surplus cash|retained profit|excess cash|\ymvl\y|members voluntary liquidat|corporation tax.*(doctor|gp|medical|consultant|locum)|(doctor|gp|medical|consultant|locum).*corporation tax|\ycorporation tax rate|marginal relief|small profits rate|family investment company'
group by 1 order by vol desc nulls last, ranked_keyword;
```

**`\y` is used throughout, never `\b`.** BATCH3_INDEX **D9** records that Postgres ARE treats `\b` as a
backspace character, and that one pack writer got 3 rows where the correct boundary returned 41. That
defect is not reproduced here.

**Counts across the whole extraction family: 311 keywords, 174,740 combined volume, 56,220 peer-winnable
(a peer at position <= 20).**

### 3.2 Family breakdown, and the number that decides the page

| Family | Kws | Volume | Peer-winnable | Dominant holder |
|---|---|---|---|---|
| **Salary versus dividend** | **37** | **11,210** | **11,090** | gorillaaccounting.com, 37 of 37 |
| Dividend rates and allowance | 137 | 101,360 | 31,710 | gorillaaccounting.com |
| s.455 and director's loan | 68 | 16,100 | 7,290 | sandisoneasson.co.uk, bhp.co.uk, taxqube.co.uk |
| Surplus cash, retained profit, MVL | 31 | 10,890 | 6,550 | gorillaaccounting.com, r-m-t.co.uk |
| Corporation tax rates and marginal relief | 34 | 33,130 | **140** | gorillaaccounting.com |
| Family investment company | 6 | 3,010 | 400 | pricebailey.co.uk |

**Only the first row is this page's.** The others belong to the satellites and to
`consultant-directors-loan-account-s455-medical-company`, and are reproduced here because a hub writer
needs to see the whole set to know where its fences are.

### 3.3 The salary-versus-dividend set in full, ordered by volume

`On page` = phrase appears verbatim in the live source file, case and punctuation normalised.
Peer-winnable **orders** the work and never excludes a row (owner decision 21).

| Vol | Best pos | Peer best | Holder | On page | Keyword |
|---|---|---|---|---|---|
| 1,300 | 2 | 2 | gorillaaccounting.com | **no** | `dividend and salary calculator` |
| 1,300 | **1** | 1 | gorillaaccounting.com | **no** | `salary and dividend calculator` |
| 1,300 | 2 | 2 | gorillaaccounting.com | **no** | `salary dividend calculator` |
| 880 | 20 | 20 | gorillaaccounting.com | **no** | `directors salary` |
| 480 | **1** | 1 | gorillaaccounting.com | **no** | `dividend and salary tax calculator` |
| 480 | **1** | 1 | gorillaaccounting.com | **no** | `dividend salary tax calculator` |
| 480 | **1** | 1 | gorillaaccounting.com | **no** | `salary and dividend tax calculator` |
| 480 | **1** | 1 | gorillaaccounting.com | **no** | `salary and dividends tax calculator` |
| 480 | 2 | 2 | gorillaaccounting.com | **no** | `salary dividend tax calculator` |
| 480 | 2 | 2 | gorillaaccounting.com | **no** | `tax calculator dividend and salary` |
| 480 | **1** | 1 | gorillaaccounting.com | **no** | `tax calculator salary and dividends` |
| 260 | 4 | 4 | gorillaaccounting.com | **no** | `dividend v salary` |
| 260 | 4 | 4 | gorillaaccounting.com | **no** | `salary vs dividends` |
| 170 | **1** | 1 | gorillaaccounting.com | **no** | `salary vs dividend calculator` |
| 140 | **1** | 1 | gorillaaccounting.com | **no** | `director salary calculator` |
| 140 | 10 | 10 | gorillaaccounting.com | **no** | `director salary tax` |
| 140 | 2 | 2 | gorillaaccounting.com | **no** | `directors salary calculator` |
| 140 | 5 | 5 | gorillaaccounting.com | **no** | `directors salary tax` |
| 140 | 2 | 2 | gorillaaccounting.com | **no** | `dividend v salary calculator` |
| 140 | 3 | 3 | gorillaaccounting.com | **no** | `dividend versus salary calculator` |
| 140 | 2 | 2 | gorillaaccounting.com | **no** | `dividend vs salary calculator` |
| 140 | **1** | 1 | gorillaaccounting.com | **no** | `dividend vs salary uk calculator` |

(The remaining 15 rows are further calculator permutations at 20 to 110 volume, all held by the same URL.)

### 3.4 Four readings the table does not make obvious, and they set the whole strategy

1. **The salary-versus-dividend family is a CALCULATOR SERP, not a guide SERP.** Of 11,210 volume,
   roughly **9,000 sits on keywords containing the word `calculator`**, and a **single URL**
   (`gorillaaccounting.com/salary-dividend-tax-calculator/`) holds **429 keywords and 1,281,630 combined
   volume** across the whole harvest at best position **1**. **We do not have a salary-versus-dividend
   calculator and this page must not pretend to be one** (D3 forbids salesy framing; K4 forbids
   collapsing surfaces; and a guide claiming to be a calculator is the doorway shape rule 4 of the
   quality bar bans). Recorded as a **DECLINE with its reason** at §4.9 theme 1, and as an owner-facing
   observation at §10.3: the site has ten calculators and none of them is this one.
2. **The non-calculator slice is small and it is winnable.** Stripping `calculator` leaves roughly
   **2,200 volume across 8 keywords**: `directors salary` (880, position 20), `dividend v salary` (260,
   4), `salary vs dividends` (260, 4), `director salary tax` (140, 10), `directors salary tax` (140, 5),
   plus three long-tail forms. **Every one of these is held by the same contractor accountant on a page
   publishing 2024/25 rates** (§4.1). That is the opening.
3. **THE FINDING THAT MATTERS MOST, AND IT IS AN ABSENCE. There is not one medical-modified
   profit-extraction keyword anywhere in the 39,296-row harvest.** Run 2026-09-01:

   ```sql
   select ranked_keyword, max(search_volume) vol, min(position) best,
          (array_agg(competitor_domain order by position))[1] holder
   from dataforseo_competitor_data
   where site_key='medical'
     and ranked_keyword ~* '\y(doctor|doctors|gp|gps|medical|consultant|consultants|locum|locums|nhs|surgery|practice|physician)\y'
     and ranked_keyword ~* 'dividend|salary|corporation tax|incorporat|limited company|ltd|extract|director|s455|surplus|retained|liquidat|\yfic\y|investment company'
   group by 1 order by vol desc nulls last limit 80;
   ```

   **Eighty rows returned and not one is about extraction.** Every medical-modified `salary` keyword is
   about **pay levels**, not about how to take money out of a company: `salary consultant nhs` (3,600,
   `accountants4nhsdoctors.co.uk` at 42), `gp salary` (2,400, `medicsmoney.co.uk` at 52),
   `gp partner salary` (480, `kudosaccounting.co.uk` at 11), `practice manager salary` (390,
   `practiceindex.co.uk` at 9). The rest are NHS pension salary-sacrifice and final-salary queries owned
   by `bma.org.uk`, plus three company-name lookups (`bw medical accountants ltd`, `dolby medical ltd`,
   `williams medical supplies ltd`). **`consultant dividend`, `doctor limited company dividend`,
   `medical company salary dividend`, `gp corporation tax`: zero rows, in any phrasing.**

   **Two readings are available and only one survives contact with our own GSC.** The first is that
   there is no medical extraction demand. The second is that the harvest is Google-derived from
   competitor SERPs and **no competitor runs such a page, so the vocabulary cannot appear in a
   competitor-keyword harvest at all**. Our own data settles it: this page holds **15 Google impressions
   at position 5.93** and the sibling holds 10 at 4.90, which is Google showing us, near the top of page
   one, for medical-modified extraction queries it will not name. **The demand is real, small, and
   invisible to the paid harvest.** This is the same shape as BATCH3_INDEX §3.4 point 3 on the GMS page,
   arriving from the opposite direction, and it is the single most important sentence in this pack.
4. **The DataForSEO harvest is a WEAK map of this topic and there is no strong one.** On wave A the
   fallback was Bing named-query evidence; here there is none either (§2.3). **§7.1 is therefore built
   from the generic market's word orders (§3.3) crossed with the medical modifier that the market does
   not have**, and it is explicitly a smaller and more speculative list than wave A's. Stated so a QA
   agent reads it as a bounded method rather than as thin research.

---

## 4. Competitor teardown

**MANDATORY CLAUSE, and it is satisfied. Every URL below was fetched LIVE by this task on 2026-09-01 and
its HTTP status is recorded. No URL was assessed from the harvest alone, no fetch was silently dropped,
and the one non-200 is recorded with its status code.**

Fetch method, and it implements BATCH3_INDEX **D14**: `httpx.get(url, headers=<full browser header
set>, follow_redirects=True, timeout=45)`. The header set carries `User-Agent`, `Accept`,
`Accept-Language`, `Accept-Encoding`, `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site`,
`Sec-Fetch-User`, `Upgrade-Insecure-Requests` and `Connection`. **D14 says a bare `-A "Mozilla/5.0"` is
not sufficient and that a full header set recovers `pricebailey.co.uk`. The second half of that is no
longer true, see 4.8.**

### 4.1 gorillaaccounting.com, Salary and Dividend Tax Calculator: **THE PAGE TO BEAT**
`https://gorillaaccounting.com/salary-dividend-tax-calculator/` · **HTTP 200**
**Class: PEER** (universe §2a #12 lane, contractor accountant). **Holds 429 keywords / 1,281,630 combined
volume across the harvest at best position 1**, including every calculator permutation in §3.3 and, after
a redirect, the 18,100-volume `dividend tax rate` head.

| | |
|---|---|
| Title | `Salary & Dividend Tax Calculator | Gorilla` |
| H1 | `Salary and Dividend Tax Calculator` |
| `article:modified_time` | **2026-07-01T15:12:50+00:00** |
| Word count | **2,281** (chrome included) |
| H2s (article) | `How Dividends work`; then `Don't just take our word for it`, `Ready to switch?`, `Discover Our Top Packages`, `Online Instant Quote`, `Get an Instant Quote`, `Get In Touch` |
| Tables | 1 |
| FAQ schema | No |
| Calculator | **Yes, and it is the page** |

**What it says, verbatim from the fetched text:**

> "For the **2024/25** financial year (6th April 2024 to 5th April 2025), income from dividends is taxed
> as follows: £0 to £12,570 | 0% (Personal Allowance) £12,571 to £50,270 | **8.75%** (Basic Rate)
> £50,271 to £125,140 | **33.75%** (Higher Rate) Over £125,140 | **39.35%** (Additional Rate)"

> "Up to £20,000 can be saved in stocks and shares ISAs in the **24/25 tax year**"

**What it gets wrong, and it is the whole opening.** **The page that owns this SERP publishes 2024/25
dividend rates as current, two full tax years out of date**, on a page whose own `modified_time` is
**1 July 2026**. It was touched three months ago and the rates were not. It carries **no 2026/27 tax year
anywhere**, no 10.75%, no 35.75%, no employer NIC threshold, no Employment Allowance, no s.455 rate, no
corporation tax interaction, and no medical content of any kind. Roughly half its words are packages,
testimonials and quote forms.

**Consequence for us.** We cannot take the calculator intent (§3.4 point 1) and we should not try. **We
take the currency and the specificity.** The incumbent's own rate table is the argument for our page
existing.

### 4.2 gorillaaccounting.com, The lowdown on dividend tax rates: **A REDIRECT, and the harvest does not say so**
`https://gorillaaccounting.com/blog/the-lowdown-on-dividend-tax-rates/` · **HTTP 200 after a redirect to
`https://gorillaaccounting.com/salary-dividend-tax-calculator/`**

The harvest records this URL as the holder of `dividend tax rate` and `dividend tax rates` (**18,100
volume each**, positions 38 and 37) plus 33 further keywords, 54,980 combined volume. **The live URL
redirects to 4.1.** So the 18,100-volume dividend-rate head is, in reality, held by the calculator page,
and the harvest's URL column is a snapshot of a pre-redirect state.

**Recorded as a method finding, not as a defect in the data.** Anyone re-deriving competitor page
groupings from `dataforseo_competitor_data.url` must **fetch before concluding**, because a URL in the
harvest may be a redirect source. This is the same class of error as BATCH3_INDEX D3 on our own corpus,
arriving on a competitor's.

### 4.3 gorillaaccounting.com, UK Taxation on Dividends Explained
`https://gorillaaccounting.com/blog/uk-taxation-on-dividends-explained/` · **HTTP 200**
**Class: PEER.** 34 keywords, 40,390 combined volume; holds `uk dividend taxation` (8,100) at position 20
and `dividend allowance 2024/25` (2,400) at 37.

| | |
|---|---|
| Title / H1 | `UK Taxation on Dividends Explained` |
| `datePublished` | 2024-08-28 · `dateModified` **2025-02-18** |
| Word count | 2,266 |
| H2s | `What Are Dividends?`; `What are the UK Taxation Rates on Dividends?`; `How UK Taxation on Dividends Works in Practice`; `How To Pay Yourself Dividends`; `Limited Company Accounting with Gorilla` |
| Tables | 1 · FAQ schema: No · Calculator: No |

**Figures present: 8.75%, 33.75%, 39.35%, £500, £12,570, £50,270, £125,140, 2024/25. Figures absent:
10.75%, 35.75%, 2025/26, 2026/27.** Not modified since February 2025.

**Consequence.** `How To Pay Yourself Dividends` is a good H2 shape and the market's own phrasing; it
feeds §7.1. The rates are the same two-year-stale set as 4.1.

### 4.4 rsbc.uk, Salary vs Dividend Calculator for Contractors UK 2026/27: **THE MOST INSTRUCTIVE PAGE IN THE SET**
`https://www.rsbc.uk/salary-dividend-tax-calculator` · **HTTP 200**
**Class: PEER** (D13 re-classification, `rsbc.uk`). 36 keywords, 8,860 combined volume, best position 10.

| | |
|---|---|
| Title | `Salary vs Dividend Calculator for Contractors UK 2026/27` |
| H1 | `Salary vs Dividend Calculator for Contractors UK 2026/27` |
| Word count | 2,473 · Tables: 0 · **FAQ schema: Yes** · Calculator: Yes |
| H3s (selected) | `Dividend vs Salary: Maximise Your Contractor Take-Home Pay in 2026/27`; `How Dividends work?`; `Understanding Dividends`; `Why Caution Is Needed`; `Benefits of a Limited Company`; `Example: Salary vs Dividends`; `Dividend Allowances`; `From Sole Trader to Limited Company`; `Claiming Allowable Expenses`; `Optimise Your Remuneration` |

**The finding.** The string `2026/27` appears **nineteen times**, in the title, the H1 and throughout the
copy. The rates in the body are **8.75%, 33.75%, 39.35%**. **A current-year title over prior-year rates.**
The page also devotes its first three H3s to the firm's own service packages and payment terms, inside the
FAQ schema.

**Consequence for us, and it is a positive one.** This page proves the market's exact word order,
`Salary vs Dividend ... 2026/27`, is being fought for, and that our own `h1` and `metaTitle` already carry
it. It also proves that carrying the year in the title is worth nothing without carrying the year in the
rates. **Our page's differentiation is not the year in the title; it is the year in the number.**

### 4.5 rsbc.uk, UK Dividend Tax Guide 2023-2026
`https://www.rsbc.uk/blogs/uk-dividend-tax-guide-2023-2026-rates-allowances-and-calculators` · **HTTP 200**
**Class: PEER.** 49 keywords, 16,270 combined volume; holds `dividend allowance 2024 25` (2,400) at 52 and
`tax free dividend allowance 25/26` (590) at 104.

| | |
|---|---|
| Title / H1 | `UK Dividend Tax Guide 2023-2026: Rates, Allowances & Calculators` |
| `datePublished` 2025-09-16 · `dateModified` **2025-12-09** |
| Word count | 2,637 · Tables: 0 · **FAQ schema: Yes** |
| H2s | `What Are Dividends?`; `Dividend Allowance by Year (2022/23 to 2025/26)`; `UK Dividend Tax Rates Explained`; **`Dividends vs Salary: Which Is Better?`**; `Dividend Tax Calculators and Tools`; `Dividend Tax Planning Strategies`; `Dividend Tax FAQ`; `Key Takeaways`; `Conclusion` |

**Figures: 8.75%, 33.75%, 39.35%, £500, £1,000, 2023/24, 2024/25, 2025/26. No 2026/27, no 10.75%, no
35.75%.** The title claims a range ending in 2026 and the content stops at 2025/26.

**This page is also a live F2 lesson.** Its `Dividend Allowance by Year` H2 stacks four dated regimes as
separate H3s (2022/23, 2023/24, 2024/25, 2025/26), which is precisely the chronological march that F2
bans. It is the same failure the language spec already measures against `bma.org.uk`. **Our page states
one current year in full and subordinates 2025/26 into a single labelled clause.**

**Its `Dividends vs Salary: Which Is Better?` H2 is the market's question form** and feeds §7.1.

### 4.6 medicsmoney.co.uk, GP Partner Salary in the UK: **THE ABSENCE, PROVED BY FETCH**
`https://medicsmoney.co.uk/gp-partner-salary-in-the-uk-what-to-expect/` · **HTTP 200**
**Class: PEER**, and the strongest medical-audience brand in the peer set. Holds 64 keywords / 29,650
combined volume, best position 4, on the medical `salary` family.

| | |
|---|---|
| Title / H1 | `GP Partner Salary in the UK: What to Expect` |
| `datePublished` | 2025-02-11 |
| Word count | **3,656** |
| H2s | `The Nuances of GP Partner Salary`; `Factors Influencing GP Partner Salary`; **`What medical school didn't teach us about money`**; `What to Expect (General Ranges of Salary)`; `Key Considerations Regarding Salary`; `Seeking Professional Advice`; `Medics Money: Your Financial Partner` |
| Tables | 0 · Calculator: No |

**Occurrences of `dividend`, `limited company`, `incorporat`, `corporation tax` in 3,656 words: ZERO.**
The figure scan returned **no matched rate or threshold at all**.

**Two things this fetch settles.**
1. **The medical peer holding the `salary` vocabulary is writing about pay levels, not extraction.** The
   two topics share a word and nothing else. Our page must not drift toward pay-level content to chase
   that volume; it is a different search and a different reader.
2. **`What medical school didn't teach us about money` is a live D5 violation in the peer set**, and D5
   names that exact framing as banned for us. Recorded because it is the clearest available example of
   the condescension rule, and because a writer reading a high-ranking competitor may be tempted to copy
   its register.

### 4.7 sandisoneasson.co.uk, A Guide to Directors Loan Accounts: **THE BEST STALENESS FINDING IN THE WAVE**
`https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` · **HTTP 200**
**Class: PEER, and a MEDICAL SPECIALIST.** Its own navigation reads `Hospital Consultants`, `GP-Practice`,
`GP-Federations`, `GP-Locums`, `registrars`, `dentists`. It holds **53 keywords / 17,240 combined volume**
including `directors loan` (2,900) at position 26 and `directors loan account` (1,000) at 18.

| | |
|---|---|
| Title / H1 | `A Guide to Directors Loan Accounts` |
| Visible date | **Sep 2020** |
| Word count | **1,596** |
| Headings | H1 plus two navigation H2s (`Address`, `Links`). **No article H2 or H3 at all.** |
| Tables | 0 · FAQ schema: No |

**What it says, verbatim:**

> "If the loan from the company to you is not repaid in one form or another within 9 months and one day
> then HMRC will charge additional tax on that loan at **32.5%**. The additional corporation tax is known
> as Section 455 tax. This tax is the same rate as that for a higher rate tax payer"

> "the official rate of interest set by HMRC is currently **2.25%** per annum"

**32.5% is THREE rate generations stale.** The s.455 rate tracks the dividend upper rate: 32.5%, then
33.75% from 6 April 2022, then **35.75% on loans made on or after 6 April 2026** (`house_positions.md`
§5). The page's own worked example dates itself further ("if a loan is fully repaid on 1 April 2021").

**Consequence, and it is the wave's headline.** **A medical-specialist accountant, in the peer set,
ranking on the head `directors loan` terms, is publishing a rate that was superseded four and a half years
ago, on a page that has no headings.** This is the exact shape our extraction set exists to beat. **It is
NOT this page's fact to state** (see §9: s.455 belongs to
`/blog/consultant-directors-loan-account-s455-medical-company`), and the finding is passed to that page's
owner at §10.4.

### 4.8 pricebailey.co.uk, Family Investment Companies: **NON-200, RECORDED**
`https://www.pricebailey.co.uk/blog/family-investment-companies-fic/` · **HTTP 403**

Returned **403 with a `Just a moment...` interstitial (3 words of body text)** to the full browser header
set described above. **This contradicts BATCH3_INDEX D14**, which recorded that wave-B writers found both
`pricebailey.co.uk` URLs 403 to a bare user agent and **200 to a full browser header set**. Six days
later, a full header set is refused too.

**Recorded rather than dropped, and it is a live correction to D14** (§10.2). The page holds
`family investment company` (2,400) at position 22 and 10 further FIC keywords. **It is not this page's
topic**; the FIC boundary belongs to `/blog/family-investment-company-doctors-consultants` and to the
surplus-cash satellite. **No claim in this pack rests on that page's content.**

### 4.9 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes**. **14 themes, 14 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **The salary-and-dividend CALCULATOR intent** (4.1, 4.4; ~9,000 of the family's 11,210 volume) | **DECLINE** | We have no such tool. A guide that implies it is one is a doorway page and breaches D3 and the A* bar. Declined on the record, and raised to the owner at §10.3 as a tooling question, not a content one. |
| 2 | **`Dividends vs Salary: Which Is Better?` as the market's question form** (4.5 H2) | **COVER** | Free, and it is the page's own subject. §7.1 phrase 1. |
| 3 | **`How To Pay Yourself Dividends`** (4.3 H2) | **COVER** | The market's verb. §7.1 phrase 5. Our page says "extraction" and never "pay yourself". |
| 4 | **The dividend rate table with bands** (4.1, 4.3, 4.5, all at 8.75 / 33.75 / 39.35) | **COVER, with the CURRENT figures** | O34 is ours. `house_positions.md` §5: **10.75% / 35.75% / 39.35%, £500 allowance, 2026/27, FA 2026 s.4**. Already on the page. **This is where we are ahead of every competitor and the job is to keep it and make it legible, not to add it.** |
| 5 | **`directors salary` as a standalone noun phrase** (4.1, 880 volume at position 20) | **COVER** | The market's unpossessive spelling. We write `director's salary` six times and `directors salary` zero. §7.1 phrase 4. |
| 6 | **`take-home pay` framing** (4.4 H3 `Maximise Your Contractor Take-Home Pay`) | **COVER** | The reader's outcome word. Our page says "net income" in the table and `take-home` zero times. §7.1 phrase 6. |
| 7 | **A worked salary-versus-dividend example with real numbers** (4.4 H3 `Example: Salary vs Dividends`) | **COVERED ALREADY, and it is our strongest asset** | Our comparison table (§6.2) is arithmetically correct and re-derived in §7.4. **KEEP.** |
| 8 | **Employer NIC and the secondary threshold as a lever** | **COVER** | Absent from every competitor page fetched. `house_positions.md` §5: **15% above £5,000, from 6 April 2025, unchanged 2026/27.** Already on the page. **KEEP.** |
| 9 | **The Employment Allowance single-director exclusion** | **COVER** | Absent from every competitor page fetched. HP §5: **£10,500, not available where the only employee is a sole director.** Already on the page. **KEEP.** See §7.7 rule 6 for the trap next to it. |
| 10 | **The employer pension contribution as the third lever** | **COVER, and see the boundary** | HP §5 and §2.B. Present on our page. **The DEPLOYMENT of accumulated surplus into a pension is the satellite's**; this page owns the head-to-head comparison against a dividend at the margin. Proposed as ownership row **O37**, §9.6. |
| 11 | **The spouse or family shareholder and the settlements legislation** | **COVER, and claim ownership** | On our page and, near-identically, on the surplus-cash satellite. Proposed as ownership row **O38**, §9.6. ITTOIA 2005 s.619 onward, s.624. |
| 12 | **The director's loan account as a substitute for extraction, and s.455** | **ELSEWHERE, one sentence and a link** | Owner `/blog/consultant-directors-loan-account-s455-medical-company` (file confirmed present). The live page gives it one bullet plus one FAQ, both with the 35.75% rate; §7.3 caps this. |
| 13 | **Corporation tax rates and marginal relief** | **ELSEWHERE, one sentence and a link** | Owner `/blog/gp-corporation-tax`, the satellite. This page needs the CT rate only as an INPUT to its own worked example. §7.3 caps the exposition at one sentence plus table cells. |
| 14 | **`Benefits of a Limited Company` / `From Sole Trader to Limited Company`** (4.4 H3s) | **DECLINE, and it is O33's** | The should-I-incorporate question. Owners: `/blog/medical-practice-incorporation-step-by-step` (O33) and the frozen `/blog/gp-limited-company-tax-benefits-drawbacks`. **The live page already declines it correctly in its opening sentence and that sentence is a KEEP.** |

---

## 5. Whitespace

### 5.1 What this page owns and what it hands off, stated as the hub-and-satellite structure O34 requires

**O34 makes this page the HUB.** `surplus-cash-medical-limited-company-options`,
`family-investment-company-doctors-consultants`,
`consultant-directors-loan-account-s455-medical-company` and `gp-corporation-tax` are its SATELLITES for
extraction facts: **one sentence, then link, never the explanation.**

**The satellite rule cuts both ways and the hub half is the half writers forget.** A hub that takes its
satellites' subjects is the same defect as a satellite that takes the hub's fact. So:

| This page OWNS, exclusively | This page HANDS OFF, one sentence and a link |
|---|---|
| The 2026/27 dividend rate map: **10.75% / 35.75% / 39.35%, £500 allowance**, and which band a dividend falls into | **What surplus cash should be DEPLOYED into once it has accumulated** (the satellite) |
| **The director's salary decision**: £0 / £5,000 / £12,570, employer NIC at 15% above £5,000, the CT deduction | **The corporation tax rate map, marginal relief and associated companies** (the satellite) |
| **The Employment Allowance single-director exclusion** as it bites on the salary decision | **s.455, the director's loan account and its 35.75% charge** (its own page) |
| **The salary-versus-dividend head-to-head comparison** with the arithmetic | **The FIC** (its own page) |
| **The employer pension contribution compared against a dividend at the margin** (proposed O37) | **Whether to incorporate at all** (O33 and the frozen page) |
| **The spouse or family shareholder and settlements risk** (proposed O38) | **Adjusted net income, the £100k to £125,140 taper and the 60% band** (O3) |
| **The one-line NHS-pension consequence of extraction choice**: none of it is pensionable | **Annual allowance mechanics, taper, carry-forward** (O2) |

### 5.2 What nobody in the peer set covers, quotably

1. **No competitor page in this SERP states the live 2026/27 dividend rates.** This is the single
   strongest finding in the wave and it is measured, not asserted: **eleven competitor pages were fetched
   and returned HTTP 200, and a figure scan across all eleven returned `10.75%` zero times and `35.75%`
   zero times.** Four of them print `8.75%` and `33.75%` as current (4.1, 4.3, 4.4, 4.5), including one
   modified on 1 July 2026 and one whose title says 2026/27 nineteen times. **We state the current rates,
   with the year tag and the FA 2026 s.4 hook, and no rival does.**
2. **Nobody writes the extraction question for a doctor.** Zero medical-modified extraction keywords in
   the harvest (§3.4 point 3), and the medical peer holding the `salary` vocabulary spends 3,656 words on
   pay levels with zero occurrences of `dividend` (4.6). **The generic pages are written for a contractor
   with one income; a consultant has an NHS salary underneath the company, which changes which band every
   dividend lands in.** That single structural fact is absent from every page in the set and is present
   on ours.
3. **Nobody pairs the extraction decision with the NHS pension position.** Every generic page treats a
   pension contribution as a tax lever; none can say that dividends, company salary and company pension
   contributions are **all** outside NHS accrual and that a lower company salary therefore costs the
   reader no NHS pension at all. `house_positions.md` §2.C. **This is the reassurance a consultant
   actually needs before setting a £5,000 salary, and only we can give it.**
4. **Nobody carries employer NIC or the Employment Allowance into the salary decision.** Not one of the
   eleven fetched pages mentions the £5,000 secondary threshold, the 15% rate or the £10,500 allowance.
   The salary-versus-dividend answer is unsafe without them, because the sole-director exclusion is
   exactly what stops the obvious £12,570 answer from being right.
5. **Nobody states what the rate rise did to the answer.** The ordinary and upper dividend rates rose two
   points on 6 April 2026 (HP §5, FA 2026 s.4). Every competitor page still shows the old rates, so none
   of them can describe the change. **A page that says "the answer moved this April, and here is by how
   much" is unique in this set** and it is the natural shape for the opening under A4.
6. **Nobody shows the combined effective rate.** The stacked cost of corporation tax then dividend tax is
   the number a consultant is actually deciding on, and it appears on no competitor page fetched. Our
   page already computes it (§6.2) and it should be a table row, not a clause.

### 5.3 KEEP, explicitly

**K1 is a hard fail: the drafted version's count of statutory references, form names, technical terms and
figures must be greater than or equal to the live page's.** These are this page's differentiators and they
survive the rewrite.

- **The 2026/27 dividend rates 10.75% / 35.75% / 39.35% with the £500 allowance and the FA 2026 s.4 hook.**
  The most valuable content on the page. **KEEP and make more prominent.**
- **The three-point salary reference set (£0 / £5,000 / £12,570) with the arithmetic**: 15% employer NIC on
  £7,570 = £1,136, and the CT deductions at 19% of £5,000 = £950 and of £12,570 = £2,388. All three
  recompute (§7.4). **KEEP.**
- **The Employment Allowance single-director exclusion, and the second-employee route out of it**, with
  the BIM37700 wholly-and-exclusively and commensurate-with-work condition on a spouse's salary. **KEEP.**
- **The all-in comparison table.** Every one of its fourteen figures re-derives (§7.4). **KEEP the
  arithmetic exactly; it may be re-presented but not re-computed.**
- **The notes paragraph under the table**, which states the marginal-relief computation and warns that a
  consultant with NHS income faces 35.75% on every dividend. **KEEP.**
- **The NHS pension paragraph**: dividends and company salary are both outside NHS accrual, only NHS
  employment is pensionable for a consultant, and taking a lower company salary therefore does no NHS
  pension harm. Aligned with HP §2.C. **KEEP, and it is the page's best sentence.**
- **The employer pension comparison on £10,000**: 19% CT leaves £8,100, then 35.75% leaves about £5,204,
  against £10,000 into the pension with £1,900 of CT saved. Recomputes (§7.4). **KEEP.**
- **FA 2004 s.196, paid basis, wholly and exclusively.** **KEEP.**
- **ITTOIA 2005 s.619 onward and s.624** on settlor-interested arrangements. **KEEP.**
- **The opening sentence that separates the incorporate question from the extract question**, with its
  link to the frozen `/blog/gp-limited-company-tax-benefits-drawbacks`. This is O33 compliance already
  working and it is also the page's clearest statement of scope. **KEEP.**
- **The £500-allowance-has-fallen point** (£2,000, then £1,000, then £500), which is the one place a
  historic figure earns its place because the reader's plan may be built on the old number. **KEEP, as a
  single subordinated clause, per F2.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/salary-vs-dividend-medical-limited-company-2026.md`, read in full
2026-09-01.

| | |
|---|---|
| Word count, whole file | **3,461** |
| Word count, body copy only | **2,207** (HTML stripped) |
| `metaTitle` | `Salary vs Dividend: Medical Company 2026/27` (43 characters) |
| `metaDescription` | 154 characters, under the 155 limit |
| `h1` | `Salary vs Dividend for a Medical or Consultant Limited Company (2026/27)` |
| `title` | identical to `h1` |
| Date / generator | 2026-07-06, `opus-4.8/netnew-wave` |
| H2 count | **10** · H3 count: **1** |
| FAQ entries | **11** · `keyTakeaways`: **5** · `howtoSteps`: absent |
| Tables | **1** |
| Worked example with figures | **Yes**, the comparison table plus the £10,000 pension comparison |
| Em-dashes | **0** (I1 clean) |
| `we` / `our` / `us` | 9, i.e. **4.1 per 1,000** against a C4 cap of 3 |
| `you` / `your` | 10, i.e. **4.5 per 1,000** against a C3 band of 12 to 25 |

### 6.1 Existing heading list, verbatim and in order

- H2 `The question this page answers`
- H2 `The 2026/27 rate map`
- H2 `Setting the director's salary`
  - H3 `The Employment Allowance single-director trap`
- H2 `Topping up with dividends`
- H2 `A spouse or family shareholder`
- H2 `The all-in comparison: salary only versus low salary plus dividends`
- H2 `The NHS pension point that changes the maths`
- H2 `Employer pension contributions as a third lever`
- H2 `Common mistakes with the salary and dividend split`
- H2 `How we set up the right extraction mix for medical companies`

### 6.2 Blunt read

**This is a factually strong page with a heading set written for us rather than for the reader, and a
second-person register roughly a third of where it should be.** The rewrite is a re-shaping and a
re-voicing, not a re-researching. That is a different diagnosis from most of batch 3.

**What is good, specifically.**

1. **Every load-bearing figure traces to `house_positions.md` and every one is current.** 10.75% /
   35.75% / 39.35% and £500 with the FA 2026 s.4 hook (§5). CT 19% / 25% / 3/200 / 26.5% (§5). Employer
   NIC 15% above £5,000 (§5). Employment Allowance £10,500 with the sole-director exclusion (§5).
   Employee NIC 8% and 2% at £12,570 and £50,270 (§5, §8). s.455 at 35.75% on loans made from 6 April
   2026 (§5). FA 2004 s.196 (§5). Dividends not NHS-pensionable (§2.C). **F4 clean.**
2. **The arithmetic is correct.** All fourteen table figures and both pension comparisons re-derive
   (§7.4). This is unusual: BATCH3_INDEX records two Medical calculators publishing invented figures and
   two spreadsheet models computing tax wrongly.
3. **F2 is already right.** One current year leads; 2025/26 appears only as a labelled prior-year clause.
4. **I1, I2, I4, I5 clean.** Zero em-dashes, no named expert, no client name, no pricing.
5. **O33 and O3 are already respected.** The opening hands the incorporate question to the frozen page.
   The 60% band and adjusted net income appear zero times.

### 6.3 What is thin, missing or wrong, checked against the CURRENT rules

Every page touched in this batch is checked against the rules as they stand today, not the rules that
existed when it was written (BATCH3_INDEX §6.3 point 5).

1. **The market's own word orders are absent.** `salary vs dividends` (260 vol, competitor position 4):
   **zero**. `dividend vs salary` (260 combined across forms, position 4): **zero**. `directors salary`
   (880, position 20): **zero**, we write `director's salary` six times. `take-home` / `take home`:
   **zero**. `pay yourself`: **zero**. `optimum salary` / `most tax efficient salary`: **zero**. B2 and
   B3 both fail on this.
2. **B2 fails on the heading set.** `The question this page answers` is an abstract heading and it is also
   a V2-class defect: it narrates our own editorial scoping to the reader, which conductor ruling 3 of
   2026-08-26 extends V2 to cover. `The 2026/27 rate map`, `Topping up with dividends` and `The NHS
   pension point that changes the maths` are our phrasings, not the market's.
3. **B4 fails hard: 0 of 10 H2s are question-form, against a band of 50% to 75%.** The market's demand
   here is overwhelmingly interrogative (`what is the most tax-efficient salary`, `dividends vs salary:
   which is better`, `how to pay yourself dividends`) and the page answers none of those questions in a
   heading.
4. **C3 fails: 4.5 second-person instances per 1,000 words against a band of 12 to 25.** The page is
   written in the third person about a hypothetical consultant. **This is the largest single editorial
   defect on the page** and it is also, per §2.1, plausibly part of why a position-5.93 page earns zero
   clicks: the snippet Google can lift does not address the searcher.
5. **C4 fails: 4.1 first-person-plural instances per 1,000 against a cap of 3.** The cluster is the
   `How we set up the right extraction mix for medical companies` H2 and the closing paragraph. C4 also
   bans `we` in any H2, which that heading breaks. **REFRAME permits fixing this; the closing CTA
   paragraph stays as the single end-of-page CTA that D3 allows.**
6. **O2 is breached in one paragraph.** The `The NHS pension point that changes the maths` H2 explains the
   annual allowance taper: the £260,000 adjusted-income and £200,000 threshold-income conditions, the
   £60,000 to £10,000 range, and what the pension input amount is. **O2 gives all of that to
   `/calculators/nhs-pension-annual-allowance`.** FAQ 11 repeats it a second time. **Live breach, and
   REFRAME permits the writer to fix it rather than escalate.** §7.3 sets the budget.
7. **The s.455 boundary is over-run.** The rate 35.75% appears in a key takeaway, in FAQ 6 and in a
   Common-mistakes bullet, with the 9-months-and-1-day rule and the s.458 deferral each stated twice.
   That is four sentences of another page's fact where the map allows one. §7.3 sets the budget.
8. **The corporation tax boundary is over-run in the same way.** 19% / 25% / £50,000 / £250,000 / 3/200 /
   26.5% / associated companies appear in the rate-map H2, in FAQ 9 and in FAQ 10. **`gp-corporation-tax`
   owns that map.**
9. **No table caption.** L4 is met by the comparison table's existence but F1 requires the effective date
   in the caption, and the table has no caption element at all; the year sits in a sentence above it.
10. **G2 fails.** The worked comparison sits four H2s after `The 2026/27 rate map` that states the rule it
    demonstrates. G2 requires the example immediately after that H2.
11. **G6 passes** (`The all-in comparison...` is not the words "Worked example"), and **G7 fails**: the
    table plus its notes paragraph runs well past 200 words. **This is the known G7-versus-C2 collision
    recorded as batch-3 pack defect 5; QA should not read the split as a missing component.**
12. **A1 and A5.** The opening block runs 118 words to the first H2, inside A5's 120-word hard ceiling but
    outside its 40-to-90 band. The direct answer, that salary usually sits at £5,000, arrives at roughly
    word 40 of the bold intro, which satisfies A1 and A4.
13. **A3 risk in the rewrite, not in the live page.** The live opening is direct. A rewritten opening must
    not become "Navigating profit extraction is essential" or a rhetorical question.
14. **V5 and V9 checks on the live copy: clean.** Zero instances of `it is not X, it is Y`. Zero
    numeral-count paragraph openers. **But note two near-misses the rewrite must not convert into the
    tic**: "Those are different decisions with different answers" and "Two caveats apply." The second is
    one word away from the batch-2 numeral-count opener that ran 22 times across seven pages. **V2 check:
    clean** on keyword narration; see point 2 for the process-narration limb.
15. **D1 risk in two paragraphs.** The spouse-shareholder second paragraph and the closing paragraph both
    run over 40 words with no figure, date, form name, deadline or named rule. D1 flags exactly that
    shape.

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgement.

### 7.1 THE NAMED MISSING-PHRASE LIST: the 14/28-day read is measured on THIS

**11 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case
and punctuation normalised. Ordered by evidence strength.

**V1 IS BINDING AND THIS LIST IS BUILT TO IT.** Two word orders per idea per page, hard cap, counted as
**non-overlapping longest matches, never raw substrings** (V1 enforcement note). The idea grouping is
stated so a QA agent can verify the cap rather than assume it, and any V1 finding must quote the spans it
counted.

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `salary vs dividends` | The comparison itself | 1 of 2 | Harvest, 260 vol, gorillaaccounting position 4. Currently zero; we write `salary vs dividend` singular three times. |
| 2 | `dividend vs salary` | The comparison itself | 2 of 2 | Harvest, 260 vol across `dividend v salary` and `dividend vs salary calculator`, position 2 to 4. Also rsbc's own H2 word order (4.5). Currently zero. |
| 3 | `which is better` (of salary against dividends, in an H2 or FAQ question) | The reader's question form | 1 of 2 | rsbc.uk H2 `Dividends vs Salary: Which Is Better?` (4.5), HTTP 200. B4 requires question-form H2s and the page currently has none. |
| 4 | `directors salary` (unpossessive, as the market spells it) | The salary decision | 1 of 2 | Harvest, **880 vol**, gorillaaccounting position 20, plus `directors salary tax` (140) and `directors salary calculator` (140). Currently zero. |
| 5 | `pay yourself` | The extraction verb | 1 of 2 | gorillaaccounting H2 `How To Pay Yourself Dividends` (4.3), HTTP 200. Currently zero. The page says "extraction" throughout, which is our word. |
| 6 | `take-home` | The reader's outcome | 1 of 1 | rsbc H3 `Maximise Your Contractor Take-Home Pay in 2026/27` (4.4), HTTP 200. Currently zero; the table says "Director net income". |
| 7 | `most tax-efficient salary` | The salary decision | 2 of 2 | Present once in FAQ 1 only, absent from body and headings. The FAQ question is the page's single best market-shaped string and it is buried. **Promote it, do not merely repeat it.** |
| 8 | `2026/27` in the comparison table's own caption | Currency, F1 | 1 of 1 | F1 requires the tax year in the same sentence or the table caption. The table has no caption. |
| 9 | `combined effective rate` on a pound of company profit, as a stated number | The stacked cost | 1 of 1 | §5.2 point 6. The page states it in prose ("can approach 55%") and never as a computed row. Absent from every competitor page fetched. |
| 10 | `not NHS-pensionable` applied to **company salary as well as dividends**, in the same sentence | The NHS consequence | 1 of 2 | HP §2.C. The live page makes the point across two sentences; the market needs it in one, because it is the reassurance that unlocks the £5,000 salary answer. |
| 11 | `£5,000 secondary threshold` as a single noun phrase | The salary decision inputs | 1 of 1 | HP §5. Present as two separate strings today. Absent from all eleven fetched competitor pages. |

**Countable test: 11 of 11 present.** Any other absent phrase is a named BLOCK.

**Explicitly NOT on this list, and the reason is on the record:**
- **Every keyword containing `calculator`** (roughly 9,000 of the family's 11,210 volume, held at position
  1 to 5 by 4.1). **DECLINED** at §4.9 theme 1: we have no such tool and a guide implying otherwise is a
  doorway page. Raised as a tooling question at §10.3.
- **`dividend tax rate` and `dividend tax rates`** (18,100 volume each). Held by 4.1 (via the 4.2
  redirect) at position 37 to 38. **DECLINED as the satellite's**: the generic dividend-rate map without a
  medical modifier is a national head term this domain sits 50 places away from on comparable families
  (STATE 2026-09-01, family 1), and chasing it means writing a generic dividend guide. The page states
  the rates because it owns them under O34; it does not target the generic head.
- **`corporation tax rate` and `corporation tax rates`** (12,100 each). **O34's satellite fence: they are
  `gp-corporation-tax`'s**, and that page's pack declines them too, for the reason above.
- **`s455`, `s455 tax`, `directors loan`** (1,900 / 1,000 / 2,900). **Owned by
  `/blog/consultant-directors-loan-account-s455-medical-company`.**
- **`gp salary`, `gp partner salary`, `salary consultant nhs`** (2,400 / 480 / 3,600). **DECLINED as a
  different search.** These are pay-level queries (4.6) and O35's `gp-partner-vs-salaried-gp-tax-comparison`
  is the nearest owner, and it is FROZEN.

### 7.2 Equity preservation (§9.9 floor 5)

**There is no named-query equity set to preserve on either engine** (§2.5). The gate is therefore a
position gate and an index gate, and it is stated at the level it is measured at:

| Gate | Endpoint | Pass condition |
|---|---|---|
| E1 | GSC Search Analytics, `page` dimension, 90d | Average position **at or better than 9.0**, against a baseline of 5.93 |
| E2 | same | Impressions **at or above 15** |
| E3 | GSC URL Inspection | `verdict` still `PASS`, `coverageState` still `Submitted and indexed`, `googleCanonical` still self |
| E4 | `scripts/medical_flat_link_audit.py` | All existing internal inbound links still resolve; 0 new broken links |

**Countable test: E1 to E4 all pass at the 28-day and 90-day reads.**

**A slip inside E1's band is noise on 15 impressions. A slip beyond it, on a page Google indexed and
ranked at 5.93 before the change, is a signal that a REFRAME of an indexed page is riskier than the grade
assumes, and it would need re-examining across wave C.** That is the whole reason E1 exists on a page the
index called "nothing to lose".

### 7.3 Ownership budgets, countable

The map allows one sentence and a link for a fact this page does not own. These are the counts a QA agent
runs.

| Fact | Owner | Budget on this page | Live count today |
|---|---|---|---|
| Annual allowance, taper, threshold and adjusted income, carry-forward, pension input amount | O2, `/calculators/nhs-pension-annual-allowance` | **1 sentence, then link. Zero figures**: no £60,000, no £10,000, no £260,000, no £200,000 | ~6 sentences plus 4 figures, twice (§6.3 point 6) |
| Adjusted net income, £100,000 to £125,140 taper, the 60% band, HICBC | O3, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **1 sentence, then link. Never the explanation.** See the note below on `£125,140`. | 0 sentences. **Compliant. Keep it that way.** |
| s.455, the director's loan account, s.458 | `/blog/consultant-directors-loan-account-s455-medical-company` | **1 sentence, then link.** The 35.75% rate may be named once as the reason not to use the loan account, with its date band | 4 sentences across a takeaway, an FAQ and a bullet |
| Corporation tax rates, marginal relief, associated companies | `/blog/gp-corporation-tax` (satellite) | **1 sentence, then link**, plus the CT figures used as INPUTS in the worked example and its table cells (G5 requires the body to have stated any rate the example uses, so the one sentence must carry 19% with its year) | 3 blocks: the rate-map H2, FAQ 9, FAQ 10 |
| Whether to incorporate; the pros and cons | O33, `/blog/medical-practice-incorporation-step-by-step`; and the FROZEN `/blog/gp-limited-company-tax-benefits-drawbacks` | **1 sentence, then link.** Both existing links stay; no third is added | 1 sentence plus 2 links. **Compliant. KEEP.** |
| The four-role employment-status fork | O35, `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN**) | **1 sentence, then link. Never the table.** | 0. **Compliant.** |
| Deploying accumulated surplus; MVL; BADR; trading status; the FIC | the satellite, and `/blog/family-investment-company-doctors-consultants` | **1 sentence, then link. Zero BADR rate, zero TAAR, zero trading-status test** | 0. **Compliant. Keep it that way** (the live counts are `BADR` 0, `TAAR` 0, `trading company` 0) |

> **THE `£125,140` RULE, written out so QA does not raise a false positive.** O3 owns the personal
> allowance taper and the 60% effective band. It does **not** own the income tax band map. This page may
> state that the additional rate starts above £125,140 and that a dividend landing there is taxed at
> 39.35%, because that is the dividend rate map, which is O34's. **What it may not do is explain that the
> personal allowance is withdrawn between £100,000 and £125,140, or compute a 60% effective rate, or use
> the word `taper` of personal allowance.** The live page states `£125,140` twice, both times as a band
> boundary, and both are compliant. **Countable test: occurrences of `60%`, `adjusted net income`,
> `personal allowance is withdrawn`, `personal allowance taper` = 0.**

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

**Every figure in a worked example must be re-derived from stated inputs by `arithmetic_recomputed[]`.**
The live page's arithmetic was re-derived by this pack on 2026-09-01 and **all of it checks out**. It is
printed here so a rewrite that changes the presentation cannot silently change the numbers.

**The comparison table, £60,000 of company profit, single director, no other income, no Employment
Allowance:**

| Step | Low salary £5,000 plus dividends | Salary only |
|---|---|---|
| Salary | £5,000 | £52,826 |
| Employer NIC, 15% above £5,000 | £0 | 0.15 x (52,826 - 5,000) = **£7,173.90 ≈ £7,174** |
| Salary plus employer NIC | £5,000 | 52,826 + 7,174 = **£60,000** ✓ |
| Company taxable profit after salary and NIC | 60,000 - 5,000 = **£55,000** | £0 |
| Corporation tax, marginal relief | 0.25 x 55,000 - (3/200) x (250,000 - 55,000) = 13,750 - 2,925 = **£10,825** ✓ | £0 |
| Post-tax profit available as dividends | 55,000 - 10,825 = **£44,175** ✓ | £0 |
| Director gross income | 5,000 + 44,175 = **£49,175** ✓ | £52,826 |
| Employee NIC | £0 (salary below £12,570) | 0.08 x (50,270 - 12,570) + 0.02 x (52,826 - 50,270) = 3,016 + 51.12 = **£3,067** ✓ |
| Income tax and dividend tax | PA remaining 12,570 - 5,000 = 7,570; taxable dividends 44,175 - 7,570 - 500 = 36,105; 0.1075 x 36,105 = **£3,881.29 ≈ £3,881** ✓ | 0.20 x (50,270 - 12,570) + 0.40 x (52,826 - 50,270) = 7,540 + 1,022.40 = **£8,562** ✓ |
| Director net income | 49,175 - 3,881 = **£45,294** ✓ | 52,826 - 3,067 - 8,562 = **£41,197** ✓ |
| Total taxes and NIC | 60,000 - 45,294 = **£14,706** ✓ | 60,000 - 41,197 = **£18,803** ✓ |
| Effective rate on £60,000 | 14,706 / 60,000 = **24.51% ≈ 24.5%** ✓ | 18,803 / 60,000 = **31.34% ≈ 31.3%** ✓ |

**The salary reference points:** 15% x (12,570 - 5,000) = **£1,135.50 ≈ £1,136** ✓ · 19% x 5,000 =
**£950** ✓ · 19% x 12,570 = **£2,388.30 ≈ £2,388** ✓

**The £10,000 pension comparison, higher-rate taxpayer:** 10,000 x 0.81 = **£8,100** ✓ ·
8,100 x (1 - 0.3575) = **£5,204.25 ≈ £5,204** ✓ · CT saved on a £10,000 contribution at 19% =
**£1,900** ✓

**The combined effective rate claim ("can approach 55%"):** at the marginal-relief CT rate and the
additional dividend rate, 1 - (1 - 0.265)(1 - 0.3935) = **55.4%**. At the upper dividend rate,
1 - (1 - 0.265)(1 - 0.3575) = **52.8%**. **The claim holds and its band should be stated rather than
approximated**, which is §7.1 phrase 9.

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| Dividend **10.75% / 35.75% / 39.35%**, allowance **£500** | 2026/27, from 6 April 2026 | HP §5, FA 2026 s.4, gov.uk verified 2026-08-26 |
| Dividend **8.75% / 33.75%** as PRIOR year only, one subordinated clause | 2025/26 | HP §5. F2. |
| CT **19%** to £50,000, **25%** over £250,000, fraction **3/200**, effective **~26.5%** | financial year from 1 April 2026 | HP §5 |
| Employer secondary Class 1 NIC **15%** above the **£5,000** secondary threshold | from 6 April 2025, unchanged 2026/27 | HP §5 |
| Employment Allowance **£10,500**, not available where the only employee is a sole director | 2026/27 | HP §5 |
| Personal allowance **£12,570**; basic 20% to **£50,270**; higher 40% to **£125,140**; additional 45% above | 2026/27 | HP §5 |
| Employee primary Class 1 NIC **8%** then **2%** above £50,270 | 2026/27 | HP §5 |
| s.455 at **35.75%** on loans made on or after 6 April 2026, and **33.75%** on loans made in 2025/26 or earlier, date-banded by when the loan was MADE | | HP §5. **One sentence only, then link.** |
| FA 2004 **s.196**, employer pension contributions deductible on a paid basis, wholly and exclusively, no NIC | | HP §5 |
| ITTOIA 2005 **s.619** onward, **s.624** settlor-interested | | HP §5 hooks; live page |
| HMRC **BIM37700**, spouse wages wholly and exclusively and commensurate with work done | | HP §5 manual anchors |
| CTA 2010 **s.455 / s.458**; ITA 2007 **s.8** (dividend rates, amended by FA 2026 s.4); CTA 2010 Part 3 ss.18 to 19 | | HP §5 hooks |

**BANNED FIGURES on this page. None of these may be asserted:**

| Banned | Why | What the page does instead |
|---|---|---|
| **Any annual allowance figure**: £60,000, £10,000 floor, £260,000, £200,000, carry-forward years | O2. The taper and its mechanics are the calculator's. | One sentence saying a company pension contribution is capped by the annual allowance and can be tapered, then the link. **Zero figures.** |
| **Any 60% effective rate, or any explanation of the £100,000 to £125,140 personal-allowance withdrawal** | O3. | One sentence, then link. See the §7.3 note on why `£125,140` as a band boundary is fine. |
| **Any GMC annual retention fee figure** | O9. **UNVERIFIED**; the GMC returns HTTP 403 to automated fetch. F5, as narrowed by the O10 ruling of 2026-08-26 to the GMC fee alone. | Not applicable here; listed for completeness of the ban. |
| **Any BADR rate, any TAAR reference, any trading-status test, any MVL figure** | The satellite's. | One sentence at most, then link. |
| **Any FIC content** | `/blog/family-investment-company-doctors-consultants`. | Nothing, or one sentence and a link from the spouse-shareholder section. |
| **Any statement that a GP practice can claim the Employment Allowance** | HP **§8.A**: HMRC NIM06530 lists GP services as functions of a public nature, so a practice normally **cannot** claim it. **This page is about a PRIVATE consultant's company, which is not caught by §8.A**, and it is excluded instead by the sole-director rule in §5. **Do not import §8.A's reasoning here and do not import this page's reasoning into a practice page.** | State the sole-director exclusion. Say nothing about practices. |
| **`8.75%` or `33.75%` presented as current** | F2, and it is the defect four competitors are live with (4.1, 4.3, 4.4, 4.5). | One subordinated clause labelled as the prior year. |
| **A dividend rate with no year tag** | F1, hard. | Every rate carries 2026/27 in the same sentence or the table caption. |
| **`the minimum pension age (55, rising to 57 in 2028)`** | **Not in `house_positions.md` anywhere.** See §10.1: this is a live unverified assertion on the page. | Either add it to house positions at primary source first, or state the lock-up without the ages. |
| **Any fabricated statistic**: "most consultants", "we find that around X%", any percentage without a named source | F6, I6. | Nothing. |
| **Any pricing, fee or fee range** | I5. | Nothing. |
| **Any named individual, credential, byline or "reviewed by"** | I2. | Nothing. |

**Countable test: count of banned-figure assertions on the page = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| Dividend 10.75% / 35.75% / 39.35%, £500 allowance, 2026/27 | https://www.gov.uk/tax-on-dividends (page headed "6 April 2026 to 5 April 2027"); HP §5 |
| FA 2026 s.4, dividend ordinary and upper rate increase | https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted |
| CT 19% / 25% / 3/200, FY beginning 1 April 2026 | https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax ; HP §5 |
| Employer NIC 15% above the £5,000 secondary threshold | https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions ; HP §5 |
| Employment Allowance £10,500 and the single-director exclusion | https://www.gov.uk/claim-employment-allowance ; HP §5 |
| Income tax bands and personal allowance 2026/27 | https://www.gov.uk/income-tax-rates ; HP §5 |
| Class 1 primary NIC 8% / 2% | HP §5 |
| s.455 / s.458 | https://www.legislation.gov.uk/ukpga/2010/4/section/455 ; HP §5 |
| FA 2004 s.196 | HP §5 |
| ITTOIA 2005 s.619, s.624 | https://www.legislation.gov.uk/ukpga/2005/5 |
| BIM37700 | https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim37700 |
| Dividends and company income not NHS-pensionable; only NHS employment pensionable for a consultant | HP §2.C |
| **The minimum pension age and any 2028 change** | **MUST be verified at gov.uk before stating, or dropped.** Not in house positions. §10.1. |

**Countable test: every external factual claim maps to a row above. Count of unverified claims = 0.**

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug salary-vs-dividend-medical-limited-company-2026` | Gate bar met; **0 covered queries lost** (the covered set is empty today, §2.5, so this reduces to "no regression") |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure in §7.4 re-derives from stated inputs at the real 2026/27 rates |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. Link resolution | **`scripts/medical_flat_link_audit.py`**, then `predeploy_gate.py` | 0 HARD 404s. **Medical is a FLAT-ROUTING site: `slug_resolver.py` HARD-REFUSES it and must not be used** (STATE, and the Medical memory). All existing internal link targets were confirmed present as markdown files on 2026-09-01: `gp-limited-company-tax-benefits-drawbacks`, `gp-corporation-tax`, `consultant-directors-loan-account-s455-medical-company`, plus the TSX routes `/for-consultants` and `/contact`. New links must resolve to `adjusted-net-income-doctors-60-percent-tax-trap`, `surplus-cash-medical-limited-company-options`, `family-investment-company-doctors-consultants`, `medical-practice-incorporation-step-by-step`, `gp-partner-vs-salaried-gp-tax-comparison` and `/calculators/nhs-pension-annual-allowance`, **all confirmed present 2026-09-01.** |
| 5. Equity preservation | §7.2 | **E1 to E4 all pass** |
| 6. Cluster coverage | §7.1 | **11 of 11** phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed by this page.** The extraction family is not a dossier §4 row (§3.4 point 3 explains why: it is invisible to a competitor-derived harvest). Ledger unchanged. |
| 8. Competitor re-read | §4.9 | **14 themes, 14 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere, including frontmatter. The live file has **0** and must still have
   0. I1, hard fail.
2. **`slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block and `altText` are
   byte-identical.** Everything else may change.
3. **No collapse, no redirect, no URL change.** K4.
4. **Do not touch any frozen page.** The 19 slugs of §1.2, including the three at `status='flagged'`.
   **Contextual links to their live URLs are fine** and two already exist to
   `gp-limited-company-tax-benefits-drawbacks`.
5. **Never state or imply that a doctor's ordinary personal service company can hold an NHS GMS or PMS
   contract.** HP §2.C, and note the correction of 2026-08-26: never write "a limited company cannot hold
   a GMS or PMS contract" flat either. The correct form is that the contract sits with GPs, their
   partnerships, or a company limited by shares whose shareholders all qualify, and that a doctor's
   ordinary personal service company does not meet those conditions. **Cite s.86(3) only where the
   sentence is about GMS alone.** This page's natural treatment is one clause in the opening, or nothing.
6. **Never tell a GP practice it can claim the Employment Allowance.** HP §8.A. This page's subject is a
   private consultant's own company and the sole-director rule is the right exclusion here; the practice
   answer is different and is not this page's.
7. **No Scheme Pays deadline anywhere.** O4, and
   `/blog/nhs-pension-scheme-pays-doctors-deadlines` is being prepared separately and is not this batch's
   at any date. **This is the exact fact that broke batch 1.**
8. **C4: `we`, `our`, `us` at 3 or fewer per 1,000 words, and none in the opening block or in any H2.**
   The live page fails on both limbs. **REFRAME permits fixing it and the fix is mandatory here, unlike
   on an EXTEND page.**
9. **C3: `you` and `your` at 12 to 25 per 1,000 words.** Live figure 4.5. **This is the largest editorial
   lift in the rewrite.**
10. **B4: 50% to 75% of H2s are question-form.** Live figure 0%.
11. **One CTA, at the end of the page only** (D3). No "get in touch today" inside body copy.
12. **No interruptive UI** (I7). Note BATCH3_INDEX **D6**: `DeepScrollModal` and `ReturningBar` are
    already mounted on every route in `Medical/web/src/app/layout.tsx`. **They pre-date this work, they
    are not this programme's to remove, and no page in this wave touches them.**
13. **One change per page per window** (§9.3). This REFRAME is the only change to this URL until the
    28-day read.
14. **Do not narrate our own process to the reader** (V2 as extended by conductor ruling 3, 2026-08-26).
    No "the detail lives on our other page because that page owns this topic", no heading that describes
    an editorial decision. Write "the detail sits on X" and link it. **The live H2 `The question this page
    answers` is exactly this defect and must go.**
15. **V5 and V9 style caps, whole wave.** `it is not X, it is Y`: **once per page maximum, and prefer
    zero.** The numeral-count paragraph opener ("Two caveats apply", "Three levers work"): **once per page
    maximum, and prefer zero.** The live page carries zero of the first and one near-miss of the second
    (§6.3 point 14). **Batch 3 is the third batch and V9 says the third shape will appear somewhere new:
    the conductor names it across the wave, not this writer inside one page.**

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC Search Analytics, dimension `page` | 2026-06-03 to 2026-09-01 (90d) | **0 clicks, 15 impressions, average position 5.93** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows.** All 15 impressions anonymised. |
| Google | GSC URL Inspection | 2026-09-01 | **PASS, Submitted and indexed, self-canonical, last crawl 2026-08-19** |
| Bing | `GetPageStats`, **page level** | 2026-05-17 to 2026-08-30 | **Absent from all 329 rows / 80 distinct URLs.** No trace above the top-N floor. |
| Bing | `GetPageQueryStats`, **named-query level** | as returned, full `https://www.` URL passed | **0 rows** |

Pro-rated to 28 days from the 90-day Google frame: **4.7 impressions**, 0 clicks.

### 8.2 THE EXPECTATION, and Bing comes first

**The house order is Bing at 14 and 28 days, then Google.** On this page that order produces an awkward
but honest result and it is stated rather than smoothed.

**Bing, 14 and 28 days, primary.** This URL has **no Bing trace at all today**, on either endpoint, on a
site where Bing out-clicks Google **3.3x** and where STATE 2026-09-01 records that Bing has **no
poor-position family whatsoever**: every query the site earns on Bing, it earns at position 2 to 10.
**Bing's constraint on this site is surface, not rank.** So the Bing test is a first-appearance test:

1. **At the 28-day read, this URL returns at least one `GetPageStats` row.** Today: zero. This is the
   test that the rewrite gave Bing something new to match, and it is the wave's real primary test on this
   page.
2. **If it appears, at least 2 of the 11 §7.1 phrases return a `GetPageQueryStats` impression** for this
   URL. Today: zero of eleven.
3. **Stated with low confidence and the reason given: `GetPageStats` is top-N.** A page can gain Bing
   impressions and stay invisible to the endpoint because it did not reach the top 80. **A miss on test 1
   is therefore weak evidence and must not be read as a failed rewrite.** It is recorded here so the
   later read does not over-interpret it.

**Google, 28 to 90 days, and no position promise is made.** §5.3 of the rollout runbook and STATE
2026-09-01 both say the same thing: on a domain where Google indexes 18 of 139 URLs and holds the head
commercial family 50 places out, content cannot be promised a Google lift. **This page is one of the 18
and it already ranks at 5.93, so the Google expectation here is a HOLD, not a GAIN.**

4. **Average position on the `page` dimension stays at or better than 9.0** against a baseline of 5.93.
5. **Impressions at or above 15** at day 90. **No growth target is set.** Growth here needs demand, and
   the demand for medical-modified extraction queries is small enough that the paid harvest cannot see it
   (§3.4 point 3).
6. **At least 1 query-level GSC row appears by day 90**, against a baseline of 0. Stated with low
   confidence: whether an anonymised query becomes visible is GSC's threshold decision, not ours.
7. **Index status stays `PASS` and self-canonical.** Checked by URL Inspection at the 28-day read.

**The one number that would prove the diagnosis right.** §6.3 point 4 says the page ranks at 5.93 and
earns nothing because it is written in the third person about a hypothetical consultant, so the snippet
does not address the searcher. **A first Google click on this URL, at any position inside the top 10, is
the observation that separates "we rewrote the page" from "we fixed the page".** Baseline: zero clicks in
90 days.

### 8.3 What would count as a FAIL that is not a loss

**Per §9.6 point 2, total impressions rising while the 11 named phrases stay unmatched is DRIFT and is
recorded as a FAIL, not a pass.** A page that gains impressions on queries it was never rewritten for has
told us nothing about the change.

### 8.4 Failure triggers, written as numbers, before the change

> **TRIGGER 1, Google position, and it is the tightest constraint on this page.** If the GSC
> `page`-dimension average position for
> `/blog/salary-vs-dividend-medical-limited-company-2026` falls **below 12.0** in any 28-day window
> between deploy and deploy+90 days, revert:
> `git checkout <sha derived at write time> -- Medical/web/content/blog/salary-vs-dividend-medical-limited-company-2026.md`
> A 5.93 on 15 impressions is the second-best position on the unfrozen corpus and BATCH3_INDEX's
> "nothing to lose" reading of this page is corrected at §1.1 precisely so this trigger exists.

> **TRIGGER 2, index status.** If URL Inspection returns anything other than `PASS` /
> `Submitted and indexed` with a self `googleCanonical` at the 28-day read, **stop and diagnose before any
> further change to this URL.** STATE 2026-09-01 found four live non-self canonicals on this site inside
> an area a previous session had declared clean, so this is not a theoretical check.

> **TRIGGER 3, impressions.** If 90-day impressions fall **below 8** (roughly half the baseline) at the
> 90-day read, revert to the same sha.

> **TRIGGER 4, wave-level and it is the conductor's.** If wave C's editorial QA raises a **V1, V3 or V5
> finding on three or more pages**, the wave has reproduced the batch-1 defect the index exists to
> prevent and its pages are **held rather than deployed** (BATCH3_INDEX §8).

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **11 missing
phrases of §7.1**, not with anything the page already matches (it matches nothing). **`monitored_pages`
registration is a separate owner-triggered step and has NOT been done by this task**, so this page carries
no armed window and the acceptance tests above have nothing scoring them until the owner arms them. **No
monitor, alert, cron, email or scheduled job was created.**

---

## 9. The ownership map, reproduced

**This is the most important part of this pack.** Batch 1 failed because twelve pages were written with no
map and the same explanation landed on seven of them.

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and
a link, never the explanation. A writer who needs three sentences is taking someone else's fact and must
stop.**

**V7 IS BINDING: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the map,
states neither fact, and reports the conflict.

### 9.1 THE ROW THIS PAGE OWNS

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary **10.75%**, upper **35.75%**, additional **39.35%**, allowance **£500**) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | Surplus-cash, FIC, s455 and gp-corporation-tax pages: **one sentence, then link.** |

**What owning O34 means for this writer, stated positively.** This page is the only page on the site that
may explain the salary-versus-dividend decision, the 2026/27 dividend rate map and which band a dividend
lands in, the director's salary reference points and their employer-NIC and CT consequences, and the
Employment Allowance single-director exclusion as it bites on that decision. **Everything else in the
extraction set is one sentence and a link.**

### 9.2 THE ROWS THAT CONSTRAIN THIS PAGE

| # | Shared fact | **Owner** | **What THIS page does** |
|---|---|---|---|
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link. Zero figures.** The live page is in breach in one paragraph and in FAQ 11 (§6.3 point 6). REFRAME permits the writer to fix it. |
| **O3** | Adjusted net income as a general concept, the **£100,000 to £125,140 taper**, the **60% band**, HICBC | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **One sentence, then link. DO NOT RESTATE THE 60% BAND.** The live page is compliant (zero occurrences) and must stay so. See the §7.3 note on `£125,140` as a band boundary. |
| **O4** | Scheme Pays: two-limb election, mandatory versus voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **No batch-3 page states a Scheme Pays deadline.** `/blog/nhs-pension-scheme-pays-doctors-deadlines` is prepared separately and is not this batch's at any date. |
| **O9** | GMC annual retention fee: deductible, **amount UNVERIFIED** | `house_positions.md` §8 and the Verification log | **No page states a GMC fee figure.** F5, as narrowed by the O10 ruling of 2026-08-26 to the GMC fee alone. |
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed, not automatic, from 6 April 2026 per FA 2026 s.39), the step sequence, and the pension-accrual loss paired with every tax saving | `/blog/medical-practice-incorporation-step-by-step` (**named 2026-09-01 by the D3 ruling**) | **One sentence, then link.** The live opening already does this and links additionally to the frozen `/blog/gp-limited-company-tax-benefits-drawbacks`. **KEEP both links, add no third.** |
| **O35** | The employment-status fork for doctors (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work) | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 2026-09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** |
| **O17** | VAT: the healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` | Not needed here. The live page mentions VAT zero times, which is correct. |
| **O21-VAT** | The VAT registration threshold (£90,000, 30-day rule) and the deregistration limit (£88,000) | `/blog/gp-vat-registration` (**FROZEN**) | Not needed here. **Cited as `O21-VAT`, never as `O21`**, per the collision-2 ruling in BATCH3_INDEX §6.1a. |

### 9.3 THE SATELLITE ROWS THIS PAGE MUST NOT ANNEX

These are the facts the satellites own. **A hub that takes them is the same defect as a satellite that
takes O34.**

| Fact | Owner | This page's budget |
|---|---|---|
| What to do with accumulated surplus cash; the five deployment routes; BADR trading status; the MVL; the anti-phoenix TAAR | `/blog/surplus-cash-medical-limited-company-options` | **1 sentence, then link. Zero BADR rate, zero TAAR, zero trading-status test.** |
| The corporation tax rate map, marginal relief, associated companies, CT600, payment and filing deadlines, capital allowances | `/blog/gp-corporation-tax` | **1 sentence, then link**, plus CT figures as worked-example inputs only. |
| s.455, the director's loan account, the beneficial-loan benefit in kind, s.458 relief | `/blog/consultant-directors-loan-account-s455-medical-company` | **1 sentence, then link**, with the 35.75% rate named once and date-banded. |
| The family investment company | `/blog/family-investment-company-doctors-consultants` | **1 sentence, then link, or nothing.** |

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. Batch 2's O7 split was ratified precisely because
two writers converged on the same boundary independently and said so. The opposite signal, one writer
quietly annexing another's fact, is what V3 exists to catch.

**This pack proposes no change to any EXISTING O-row. It proposes two NEW rows (§9.6) and one clarifying
note to O34 (§9.5), all three of which need ratification before a writer relies on them.**

### 9.5 PROPOSED CLARIFICATION TO O34, and it is needed before the satellites can be written

**The problem.** O34's consequence column says the satellites get "one sentence, then link". Read
literally, that forbids the surplus-cash page from putting a dividend rate in the comparison table that is
the whole point of that page, and forbids `gp-corporation-tax` from stating the dividend rate its
two-layers-of-tax section needs. **This is the same self-contradiction that O24 was corrected for on
2026-08-26**, where the shared-fact column awarded a fact and the consequence column applied the cap
reserved for pages that do not own it.

**Proposed operative text, and the sibling packs are written to it.** O34 owns the **explanation**: what
the rates are, which band a dividend lands in, how the salary and dividend split is decided, and why the
6 April 2026 rise moved the answer. A satellite may:

1. state the three 2026/27 rates **once**, in one sentence, with the year tag and a link to this page; and
2. **use those rates as inputs in its own worked example and table cells**, because **G5 requires that
   every rate an example uses has already been stated in the body with its year**, so a satellite that
   cannot state the rate cannot compute its own example either.

**A satellite may NOT** explain the bands, the allowance mechanics, the salary decision, the employer NIC
interaction, or the comparison between the two routes. **Countable for a satellite: at most 1 sentence of
dividend-rate exposition outside a table, plus table cells.**

**This is a clarification, not a boundary move, and it is reported rather than assumed.** Until it is
ratified, both satellite packs set their allowance to that budget and say so.

### 9.6 TWO PROPOSED NEW ROWS, both from live duplication between this page and the surplus-cash satellite

**Neither is ratified. Both packs record them identically and neither writer resolves them alone.**

> **PROPOSED O37. The employer pension contribution as a profit-extraction lever.**
> **The duplication, measured:** this page carries an H2 `Employer pension contributions as a third lever`
> with three advantages, the £10,000 comparison and the annual-allowance caveat. The surplus-cash page
> carries `Option 1: employer pension contributions` at greater length, plus a second pass in
> `The NHS pension interaction across all five options`, plus two FAQs, plus a table row. **Same fact,
> same statute (FA 2004 s.196), same caveat, on two pages.** That is the batch-1 shape.
> **PROPOSED SPLIT, by question rather than by topic, on the model of the ratified O7 split:**
> **this page owns the head-to-head at the margin** (a marginal £10,000 of profit: dividend versus
> employer pension contribution, with the arithmetic), because that is a limb of the extraction decision
> O34 already owns. **The surplus-cash page owns the deployment of an accumulated balance** (how much room
> exists, carry-forward against prior years, and what happens when the allowance is exhausted), because
> that is a question about a balance sheet rather than about this year's pay.
> **Neither page explains the annual allowance itself. That stays O2's.**

> **PROPOSED O38. The spouse or family shareholder and the settlements legislation.**
> **The duplication, measured:** this page carries an H2 `A spouse or family shareholder` plus FAQ 8. The
> surplus-cash page carries a near-identical paragraph inside `Option 2` plus FAQ 9, citing the same
> ITTOIA 2005 s.619 and s.624. Both say the shareholding must be genuine and both warn about
> settlor-interested arrangements.
> **PROPOSED OWNER: this page**, because a spouse shareholding is a mechanism for splitting **dividend
> income across two personal allowances and two basic-rate bands**, which is squarely the extraction
> decision. The surplus-cash page takes **one sentence and a link.**

### 9.7 Batch-level style watch (V5 and V9), and it is the CONDUCTOR's job

Batch 1 produced one tic across ten authors (`it is not X, it is Y`, three to seven times a page). Batch 2
complied and produced a **different** tic: seven writers converged on the numeral-count paragraph opener,
22 instances across seven pages against a cap of two. **V9 is explicit that banning the second tic will
produce a third, and batch 3 has already reproduced the second for a third batch running.**

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering
   across the wave, is named in that wave's fix pass, whatever it is.** Invisible from inside a single
   page. Conductor's job.
2. **Named and already burned, do not reach for either:** `it is not X, it is Y` (cap **once per page**,
   wave-wide) and the **numeral-count paragraph opener** (cap **once per page**, wave-wide, prefer zero).
   **This page's live copy carries zero of the first and one near-miss of the second** (§6.3 point 14), so
   the whole budget is available to the rewrite and the correct spend is still zero.
3. **The fourth shape, already named by batch 3's round-3 QA and therefore also burned:
   self-announcing sufficiency claims** ("the point is worth labouring", "one line is enough here").
4. **The house reflex to watch:** V9's corollary records five of seven batch-2 pages opening with a
   corrective clause in the first two sentences. **This page's live opening does exactly that** ("Most
   guidance bundles two questions... Those are different decisions"). **Wave C's conductor decides the
   variation and states it in the wave's fix pass**; this writer should not simply reproduce the reflex
   because the live page has it.
5. **V1 hard cap: two word orders per idea per page, counted as non-overlapping longest matches, never
   raw substrings.** §7.1 is built to this and states its idea groups.
6. **V2 is a live standard**, and conductor ruling 3 of 2026-08-26 extends it to **any narration of our
   own process**, including the ownership map and editorial scoping. §6.3 point 2 names the live instance.
7. **V7: where a conductor's brief and this map disagree, THE MAP WINS.**

---

## 10. Corrections, findings and open items

**Six. None was acted on. Nothing outside this file was written.**

### 10.1 A live unverified assertion on the page, and it is not in house positions

The body states: "pension funds are locked until the **minimum pension age (55, rising to 57 in 2028)**".

**`house_positions.md` contains no minimum pension age and no 2028 change.** §2.E gives a minimum pension
age of **55** in the NHS scheme's early-retirement context, and nothing anywhere addresses the normal
minimum pension age for a personal or self-invested pension or its scheduled rise.

**This is a load-bearing claim in the sentence that argues for the pension route over dividends**, and F4
requires every load-bearing figure to trace to house positions. **Recommended handling: either the
conductor adds a house position after reading gov.uk directly, or the sentence states the lock-up without
the ages.** **Not resolved by this pack, because house positions is shared with concurrent agents and is
manager-direct.**

### 10.2 BATCH3_INDEX D14 is now wrong in its second half, on a fresh measurement

D14 records that `pricebailey.co.uk` URLs 403 to `curl -A "Mozilla/5.0"` and **return 200 to a full
browser header set**, and concludes that the estate's competitor-fetch helper should send a full header
set. **On 2026-09-01, `https://www.pricebailey.co.uk/blog/family-investment-companies-fic/` returned HTTP
403 with a `Just a moment...` interstitial to a full browser header set** carrying `User-Agent`, `Accept`,
`Accept-Language`, `Accept-Encoding`, four `Sec-Fetch-*` headers, `Upgrade-Insecure-Requests` and
`Connection` (§4.8).

**D14's diagnosis stands and its remedy no longer suffices.** The domain is behind a challenge that a
static header set does not pass. **Recommendation: D14 should be restated as "a full header set is the
floor, not the fix", and any pack needing a pricebailey page should record it as an unfetchable source
rather than reporting its content from the harvest.** No claim in these three packs rests on it.

### 10.3 An owner-facing observation: the site has ten calculators and not this one

Roughly **9,000 of the salary-versus-dividend family's 11,210 volume sits on `calculator` keywords**, held
at position **1 to 5** by a single competitor URL that publishes **2024/25 rates** (§4.1). Medical already
runs **ten `/calculators/<slug>` routes** and a `/calculators` hub with a per-calculator CTA id (STATE
2026-08-26). **A 2026/27 salary-versus-dividend calculator is the only surface that could take that
intent, and no page in this wave can.**

**Recorded as an observation with a number attached, not as a proposal**, because building a calculator is
new scope, it would need its own pack and its own arithmetic QA, and BATCH3_INDEX's own lesson is that a
guide pretending to be a tool is a doorway page. **The decision is the owner's and this pack declines the
intent explicitly at §4.9 theme 1 in the meantime.**

### 10.4 A finding handed to another page's owner: two peers publish a 32.5% s.455 rate

`sandisoneasson.co.uk`, **a medical-specialist peer** whose navigation lists Hospital Consultants,
GP-Practice, GP-Federations and GP-Locums, states on a page dated **Sep 2020** that HMRC charges "additional
tax on that loan at **32.5%**" and that the official rate of interest is "currently 2.25%" (§4.7,
HTTP 200). It holds `directors loan` (2,900 volume) at position 26 and `directors loan account` (1,000) at
18. **`taxqube.co.uk`, published 2022-02-19 and holding `s455 tax` (1,900) at position 19, says the same:
"the S455 charge is calculated as 32.5 percent"** (HTTP 200).

**32.5% is three rate generations stale.** The current rate is **35.75% on loans made on or after 6 April
2026** and 33.75% on loans made in 2025/26 or earlier (HP §5).

**This is s.455's owner's finding, not this page's.** It is passed to
`/blog/consultant-directors-loan-account-s455-medical-company`, which is REFRAME, carries **13 Google
impressions at position 9.69**, and is the best competitive opening found anywhere in wave C. **This page
states the 35.75% rate once, date-banded, and links.**

### 10.5 A method finding: a harvest URL may be a redirect

`dataforseo_competitor_data` records
`https://gorillaaccounting.com/blog/the-lowdown-on-dividend-tax-rates/` as the holder of `dividend tax
rate` and `dividend tax rates` at **18,100 volume each**, plus 33 further keywords. **The live URL
301-redirects to the calculator page** (§4.2). Anyone grouping competitor pages by the harvest's `url`
column, as §4 of every pack in this programme does, must **fetch before concluding**. Recorded so the next
pack writer does not report a redirect target as an independent page.

### 10.6 Wave-C ownership: three proposals and one clarification, all needing ratification

Consolidated so a conductor sees them in one place. All three packs in this set carry the same text.

1. **O34 clarification** (§9.5): a satellite may state the three 2026/27 dividend rates once with a link,
   and reuse them as inputs in its own worked example, because G5 forbids an example using a rate the body
   has not stated. **Without this, the surplus-cash page cannot compute its own four-route comparison.**
2. **PROPOSED O37** (§9.6): the employer pension contribution as an extraction lever, split by question
   between this page (head-to-head at the margin) and the surplus-cash page (deploying an accumulated
   balance).
3. **PROPOSED O38** (§9.6): the spouse or family shareholder and the settlements legislation, owned by
   this page.
4. **A live O2 breach exists on both this page and the surplus-cash page** (the annual allowance taper
   explained in full on each). **Both are REFRAME, so both writers may fix it rather than escalate**, per
   the conductor rulings of 2026-08-26. Both packs set the budget to one sentence and zero figures.

---

## 11. Limitations

1. **There is no query-level demand evidence for this page on either engine.** Zero GSC query rows, zero
   Bing named-query rows (§2.2, §2.3). **§7.1's eleven phrases are inferred from the generic market's word
   orders crossed with a medical modifier the harvest does not contain**, and that is a weaker evidence
   base than wave A's 51 named Bing queries. It is stated so the 28-day read is scored against the right
   expectation.
2. **`GetPageStats` is a top-N endpoint.** Absence from it is not proof of zero Bing impressions; it is
   absence from the top N, which on this site is roughly the top 80 URLs. §8.2 test 1 is weak evidence in
   the negative direction for exactly this reason.
3. **Peer-winnable is Google-derived**, because DataForSEO positions are Google positions. Per owner
   decision 21 it orders the work and excludes nothing.
4. **The harvest's cluster volumes are for ordering and must not be quoted to the pound**, per the dossier
   §4 correction note's own warning.
5. **Thirteen competitor URLs were fetched and one returned HTTP 403** (§4.8), which is also a correction
   to D14 (§10.2). **No fetch was silently dropped.** One further URL was found to be a redirect (§4.2).
6. **No live-production check was run against `medicalaccounts.co.uk` for this page's rendering.** Its
   rendering mode and its internal link targets are derived from the source file and the repo. **All
   internal link targets were confirmed to exist as markdown files or TSX routes on 2026-09-01; that they
   render at the expected URLs was not verified live.** The URL Inspection call at §2.4 is Google's view
   of the live page, not our own fetch of it.
7. **The scratchpad is contended, and it bit this task.** BATCH3_INDEX **D10** records files being deleted
   under running agents by concurrent obedience to the delete-your-scratch rule. **This task's first pull
   script was overwritten in place by a sibling wave-C agent writing its own script to the same path**,
   and the work was redone in a task-specific subdirectory. **Every figure in §2 and §3 is from a re-run
   after that.** The consequence for later waves is D10's own: pass figures inline in the agent prompt and
   instruct a re-pull, and give each agent its own scratch subdirectory.
8. **The rewrite is the only change to this URL in its window** (§9.3), and **no `monitored_pages` row
   exists**, so nothing is scoring the §8 tests until the owner arms them. That is by design and it is
   recorded rather than treated as a gap.
