# §9.5 RESEARCH PACK: /blog/gp-bookkeeping-guide-uk

**Batch 3, wave C (incorporation and company structures, adjacent surface). GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md`. Ground truth `docs/medical/house_positions.md`. Batch index
`docs/medical/packs/BATCH3_INDEX.md` (wave C, the §2.4 grade ruling, ownership map O1 to O36, conductor rulings
1 to 6 of 2026-08-26). Peer set `docs/medical/competitor_universe_2026-08-26.md` §2a plus the 17 domains
reclassified in BATCH3_INDEX D13. Format exemplar
`PACK_B3_blog__how-gms-funding-works-global-sum-carr-hill-explained.md`.

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. No git
command other than read-only `rev-parse`, `log`, `diff --stat` and `merge-base`. **No paid API call: $0.00.**
DataForSEO was read from the persisted harvest only. Four competitor URLs were fetched live; every one returned
HTTP 200.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 applies.** Bing 4 clicks page-level, which satisfies §9.2's plain EXTEND
branch (`Bing clicks >= 3`) with no reliance on the §2.4 ruling.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/gp-bookkeeping-guide-uk` |
| Cluster | Adjacent to wave C. BATCH3_INDEX §5 places it with the company-structures set: "**Plus `/blog/gp-bookkeeping-guide-uk` (EXTEND, 4 Bing clicks) sits adjacent and is included.**" Its subject matter is GP practice accounting, so it borders **wave A** (GMS/PCN income, O19 to O26), **wave B** (premises, O27 to O29) and the **frozen wave-E partnership set** (O30, O35) far more than it borders incorporation. **That is the whole difficulty of this pack.** |
| Source file | `Medical/web/content/blog/gp-bookkeeping-guide-uk.md` |
| Rendering | **Markdown post whose body is raw HTML.** New blocks are written as raw HTML (`<h2>`, `<p>`, `<ul>`, `<table>`) to match. |
| Repo HEAD at write time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, 2026-09-01) |
| **Revert anchor (preferred)** | `7e596f02a5339982597949c5b7db9f41af3df4ea` (`git log -1 --format=%H -- <the file>`, "fix(medical): correct the false company-contract claim estate-wide", 2026-08-26). Verified an ancestor of HEAD; `git diff --stat 7e596f02 -- <file>` is empty, so this sha's copy is **byte-identical to the working tree**. It post-dates the hero-image backfill, so a revert to it cannot strip `image` or `imageCredit`. |
| **Revert path** | `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/gp-bookkeeping-guide-uk.md` |

### 1.1 Armed-window check, run live, no status predicate

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- run 2026-09-01 via scripts/_q.py (Supabase Management API, project dhlxwmvmkrfnmcgjbntk)
-- 19 rows
```

The 19 rows are exactly the set at BATCH3_INDEX §1: `__home` (**flagged**, to 2026-10-06) and eighteen rows to
2026-09-10, of which `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines` are also **flagged**.
**`gp-bookkeeping-guide-uk` is NOT among them. This page is in no armed monitored window and is workable now.**
A `status='active'` filter would silently excuse three rows and must not be used.

**But five of the nineteen matter to this page, because it links to them or borders them.**
`/blog/gp-vat-registration`, `/blog/gp-tax-deductions-complete-list-2026`, `/blog/gp-accounting-guide`
(**flagged**), `/blog/gp-partnership-tax-complete-guide` and `/blog/gp-pension-contributions-tax-relief` are all
frozen to 2026-09-10, and this page carries live links to the first four. **Per batch-1 coordinator ruling 5,
contextual links to a frozen page's live URL are fine; editing the frozen file is not.** No frozen file is
touched by this work.

### 1.2 What may NOT change (must come back byte-identical)

1. `metaTitle`: `GP Practice Bookkeeping Guide 2026/27 | NHS Income UK`
2. `metaDescription`: `How to do GP practice bookkeeping: record Global Sum, QOF, enhanced services and PCN income, track drawings vs profit share, and keep MTD-ready records.`
3. `h1`: `GP Bookkeeping: Essential Guide for UK General Practice Partners`
4. `title`: `GP Bookkeeping: Essential Guide for UK General Practice Partners` (**the `title` key EXISTS on this
   file. BATCH3_INDEX pack-defect 2 records a wave-A pack wrongly asserting a file had no `title` key; this one
   does, and it is frozen.**)
5. `slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block, `altText`, `author`,
   `generator`, `schema`.
6. **The existing H2 sequence, in this relative order, each string unchanged:**
   1. `Recording GP NHS income streams correctly`
   2. `Accruals and cut-off: matching NHS income to the right year`
   3. `Drawings versus profit share: the distinction that matters`
   4. `Capital accounts, partner changes and premises`
   5. `Allocating practice expenses`
   6. `Keeping MTD-ready digital records`
   7. `VAT for GP practices: usually exempt, but watch the watch-items`
   8. `Software: get the setup right, not a particular brand`
   9. `Common GP bookkeeping mistakes to avoid`
   10. `How specialist medical bookkeeping helps`
   11. `Related reading`
7. **All 6 existing FAQ question and answer strings**, except for the two currency corrections named at §1.4.
   Nothing is reworded, reordered, shortened or "tidied".
8. **All 5 existing `keyTakeaways` strings**, except for the currency correction named at §1.4.
9. **Every existing paragraph of body copy**, except for the currency corrections at §1.4 and the link
   insertions permitted at §1.3 point 5.
10. **The page has zero H3s.** That is a structural fact, not a rule, and new H3s are permitted only under a new
    H2 (§1.3 point 2).

### 1.3 What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before the existing
   `How specialist medical bookkeeping helps` H2**, so all eleven existing H2s keep their relative order and a
   byte-identical check reads them as an unbroken subsequence. **Do not place anything after `Related reading`.**
2. **New H3 blocks nested under a NEW H2 only.** No new H3 under an existing H2: that changes the existing H2's
   block and risks a reviewer reading it as a rewrite.
3. **New FAQ entries appended to the end of the `faqs:` list.** The existing 6 stay in place.
4. **New key takeaways appended** to `keyTakeaways` (optional; the existing 5 stay).
5. **New internal links INSIDE EXISTING PARAGRAPHS ARE PERMITTED ON THIS PAGE.** This is the exception the
   ordinary EXTEND rule does not give, and it exists because of a specific ruling:

   > **Conductor ruling 2, 2026-08-26 (BATCH3_INDEX, "CONDUCTOR RULINGS"): "May a writer INSERT a link into an
   > existing paragraph? Yes. A link adds no heading, changes no order and alters no claim. It is the cheapest
   > possible form of the handoff the map requires."**

   That ruling was issued to fix the notional-rent **map gap** (D11 row 5): a page naming four owned facts with
   no link to any owning page. **This page has the same defect at more than twice the scale** (§6.2 point 2).
   **Link insertions are therefore not merely permitted here, they are the pack's primary objective**, and §7.3
   makes them countable.
6. **New tables inside new blocks.** The page has zero tables and L4 is unmet (§6.2 point 8).
7. `howtoSteps` does not exist on this file and is not added.

### 1.4 The factual-currency exception, and this page needs it in three places

**Batch-1 coordinator ruling 3 stands, and conductor rulings 5 and 6 of 2026-08-26 extend it: EXTEND restricts
STRUCTURE AND POSITIONING, never TRUTH. Factual corrections and stale year tags inside frozen copy are corrected
rather than merely flagged, and each is logged as a named addendum.**

Three corrections are required on this page. All three are named at §6.2 and gated at §7.4.

1. **The Class 4 NIC year tag** (`keyTakeaways` entry 5 and the body): `for 2025/26` on figures that
   `house_positions.md` §8 verifies as **2026/27** and instructs be tagged 2026/27. **Ruling 6 case (a):
   tag-only, the figures still hold.**
2. **"There is no single national per-patient value to assume"** (body, Global Sum bullet). **Ruling 5 case: the
   claim is superseded and false as written.** See §6.2 point 1.
3. **"There is no single national Global Sum or QOF point value to plug in"** (FAQ 3). Same defect, in a frozen
   FAQ answer string. **The manager is asked to confirm before the FAQ answer is edited** (§10.2), because ruling
   5 was issued about body copy and an FAQ answer string is the thing K2 protects most tightly.

**Never propose a collapse, a redirect or a URL change** (K4). **No em-dashes** (I1): the live file contains
**zero** and must still contain zero.

---

## 2. Equity register (dual-engine, endpoint named per D2)

Every figure below was pulled fresh by this task on 2026-09-01. Nothing is quoted from a stored Supabase snapshot
and `gsc_query_data` was not read or summed.

### 2.1 Google, GSC API

```
GSCQueryFetcher("medical").gsc_client.service
  property  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"],         startDate=2026-06-03, endDate=2026-09-01, rowLimit=1000)
  searchanalytics().query(dimensions=["page","query"], startDate=2026-06-03, endDate=2026-09-01, rowLimit=5000)
run 2026-09-01
```

**Page dimension, this URL: ZERO rows. Page plus query dimension: ZERO rows.**

This URL earned **no Google impression at all** in the 90-day window. Per STATE's Stage 0 diagnosis of
2026-09-01, **18 of 139 sitemap URLs are indexed and 51 have never been fetched by Google**; this page is in the
117 that are not indexed in any form. **That is a fact about crawl demand on a low-authority domain, not about
the page** (BATCH3_INDEX D5). **No Google expectation is set for this page and none may be promised** (§8.3).

### 2.2 Bing, `GetPageStats` (page level): the grade

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
  filtered to Query == "https://www.medicalaccounts.co.uk/blog/gp-bookkeeping-guide-uk"
run 2026-09-01
```

**Six weekly snapshots inside the window 2026-05-29 to 2026-08-21:**

| Snapshot | Impressions | Clicks | Avg impression position |
|---|---|---|---|
| 2026-05-29 | 1 | 0 | 9 |
| 2026-06-26 | 1 | 0 | 6 |
| 2026-07-10 | 5 | **3** | **2** |
| 2026-07-24 | 7 | 0 | 5 |
| 2026-08-14 | 6 | 0 | 6 |
| 2026-08-21 | 3 | **1** | 4 |
| **Window total** | **23** | **4** | |

**23 impressions and 4 clicks, page level. This reproduces BATCH3_INDEX §2.5's "B 4c/23i" exactly, from an
independent pull.** CTR **17.4%**, which is the highest CTR on any page examined in this batch.

The page is absent from seven of the thirteen weekly snapshots. Per BATCH3_INDEX §9 limitation 2, `GetPageStats`
is a **top-N** endpoint, so **23 is a floor, not a total.**

### 2.3 Bing, `GetPageQueryStats` (named-query level): THE DO-NOT-LOSE LIST

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/gp-bookkeeping-guide-uk")
run 2026-09-01  ->  10 rows, 10 distinct queries, 14 impressions, 3 clicks
```

**The call used the full `https://www.` URL, not a path**, avoiding the silent-failure false negative
BATCH3_INDEX §0.2 records.

**LABEL, and it is required: `GetPageStats` and `GetPageQueryStats` are BOTH top-N endpoints and their figures
are NEVER comparable to each other (D2). Everything in this section is named-query level. The grade in §2.2 is
page level. The two are never set against each other. The table below is a TOP-N REFERENCE SET, not a complete
enumeration of every query this URL has ever matched.**

| # | Query (verbatim, including the typos) | Impr | Clicks | Avg impression pos | Snapshot |
|---|---|---|---|---|---|
| 1 | `incomeaccount that use for gp fund accounting` | 1 | 0 | 9 | 2026-05-29 |
| 2 | `why do we record sundry income in gp` | 1 | 0 | 6 | 2026-06-26 |
| 3 | `bookkeeping courses gp medical practices` | 2 | **1** | **1** | 2026-07-10 |
| 4 | `nhs gp income tracker` | 1 | **1** | 3 | 2026-07-10 |
| 5 | `nhs gp income tracker spreadsheet` | 1 | **1** | **1** | 2026-07-10 |
| 6 | `nhs digital gp income` | 1 | 0 | 6 | 2026-07-10 |
| 7 | `gp practice accounts template uk` | 3 | 0 | 5 | 2026-07-24 |
| 8 | `bma gp accounts` | 2 | 0 | 4 | 2026-07-24 |
| 9 | `networking gp accounts` | 1 | 0 | 10 | 2026-07-24 |
| 10 | `gp practice accounts` | 1 | 0 | 5 | 2026-07-24 |

**Every one of these ten queries is a DO-NOT-LOSE query. "Every one still matches post-edit" is the pack's
primary deterministic acceptance criterion and it is written out at §7.2.**

### 2.4 A CORRECTION TO D2, and it is the most useful measurement in this pack

BATCH3_INDEX **D2** frames the endpoint problem as a scale gap: on the GMS page, 129 page-level impressions
against 85 named-query impressions, "a factor of 1.5", with clicks agreeing at 7. The lesson drawn was that the
agreement on clicks invites a comparison the trap forbids.

**On this page the two endpoints agree PERFECTLY where they overlap, and the entire divergence is a reporting
lag.** Laid out snapshot by snapshot:

| Snapshot | `GetPageStats` impr / clicks | `GetPageQueryStats` impr / clicks | Agreement |
|---|---|---|---|
| 2026-05-29 | 1 / 0 | 1 / 0 | **exact** |
| 2026-06-26 | 1 / 0 | 1 / 0 | **exact** |
| 2026-07-10 | 5 / 3 | 5 / 3 | **exact** |
| 2026-07-24 | 7 / 0 | 7 / 0 | **exact** |
| 2026-08-14 | 6 / 0 | **no rows** | page level only |
| 2026-08-21 | 3 / 1 | **no rows** | page level only |
| **Total** | **23 / 4** | **14 / 3** | 14 of 14 and 3 of 3 in the overlap |

**For the four snapshots where the named-query endpoint has any data at all, impressions match 14 of 14 and
clicks match 3 of 3. The whole 23-versus-14 gap is the two most recent snapshots, for which
`GetPageQueryStats` has returned nothing yet.**

**Consequence, and it changes what a QA agent should do.** D2's "the endpoints are never comparable" is right as
an operating rule and its stated mechanism is at least partly wrong: on this page the endpoints are not measuring
different things at different scales, **the named-query endpoint is simply behind by roughly two weekly
snapshots.** That is a *testable* alternative explanation for the GMS page's 129-versus-85 gap too, and it is
cheap to test: **re-pull the GMS page's `GetPageQueryStats` today and see whether the 85 has grown toward 129.**
Recorded at §10.1 as a correction the wave conductor can settle for free.

**It also sets the read window.** Because the named-query endpoint lags, **a 28-day read taken on day 28 will be
scoring roughly day 14's queries.** §8.2 sets the read at **day 42** for the named-query test and day 28 for the
page-level test, and says why.

### 2.5 What the equity register actually says

Three readings that drive §5 and §7.

1. **All three clicks that have a named query are ARTEFACT queries.** `bookkeeping courses gp medical practices`
   (position 1, clicked), `nhs gp income tracker` (clicked), `nhs gp income tracker spreadsheet` (position 1,
   clicked). Add the unclicked `gp practice accounts template uk` at 3 impressions and `bma gp accounts` at 2.
   **Five of ten queries, and 9 of 14 named impressions, are people looking for a THING: a tracker, a
   spreadsheet, a template, a course, the BMA's version.** The page is 1,876 words of prose containing **zero
   tables and no structured artefact of any kind.**
2. **The page ranks at position 1 to 5 on eight of the ten queries and converts three of them at 17.4% CTR
   page-level.** This is the opposite diagnosis from the wave-A anchor page, which ranked first and converted
   nothing. **This page converts what it is shown for. The constraint is that it is shown for almost nothing.**
3. **Two queries are somebody reading a set of accounts and not understanding a line.**
   `why do we record sundry income in gp` (position 6) and `incomeaccount that use for gp fund accounting`
   (position 9). Both are chart-of-accounts questions. The page explains income *streams* and never gives a
   *coding structure*, which is what both searchers wanted.

---

## 3. The market's keyword set

### 3.1 The selection, printed so the counts are re-derivable

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`. **No new DataForSEO call
was made; $0.00 spent.** Live corpus count, run 2026-09-01 via `python scripts/_q.py`:
**39,296 rows / 31,539 keywords / 44 domains**, confirming BATCH3_INDEX D12 against the live table.
Peer-winnable uses the **39-domain peer set**. **Per D9 the regex uses `\y`, never `\b`.**

Two queries were run, and the second is the one that matters.

```sql
-- (a) the generalist bookkeeping family
ranked_keyword ~* 'book.?keep|practice accounts|gp accounts|accounting software|nominal ledger|chart of accounts|accounts template'
--   158 keywords, 29,460 total volume, 11,750 peer-winnable
--   top holders: lanop 47, rsbc 29, pricebailey 26, coveneynicholls 20, gorillaaccounting 9, hawsons 7

-- (b) the MEDICAL intersection
ranked_keyword ~* '\ygp\y|doctor|consultant|medical|nhs|practice|surger|locum|physician|clinic'
  and ranked_keyword ~* 'book.?keep|accounts|accounting|software|ledger|income|record|profit|drawings|partnership account'
--   59 keywords
```

### 3.2 The medical intersection, the rows that are actually ours

| Vol | Best pos | Holder | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|
| 70 | 6 | medicsmoney.co.uk | **yes** | **no** | `accounting for doctors` |
| 50 | **2** | bw-medical.co.uk | **yes** | **no** | `medical practice accounting` |
| 50 | **3** | practiceindex.co.uk | **yes** | **no** | `medical practice accounts` |
| 50 | 6 | r-m-t.co.uk | **yes** | **no** | `accounting for medical practices` |
| 50 | 4 | medicsmoney.co.uk | **yes** | **no** | `medical accounting near me` |
| 40 | **2** | medicsmoney.co.uk | **yes** | **no** | `medical accounts` |
| 70 | 25 | practiceindex.co.uk | no | **no** | `medical practice software uk` |
| 50 | 44 | practiceindex.co.uk | no | **no** | `software for medical practices` |

### 3.3 Five readings, and three of them are decisions

1. **The generalist bookkeeping family (29,460 volume, 11,750 peer-winnable) is DECLINED in full.** Every head
   row is a commercial service term held by a generalist: `bookkeepers services` (2,400, lanop),
   `bookkeeping cloud software` (880, pricebailey), `cloud accounting software` (720, pricebailey),
   `outsourced bookkeeping services` (390, lanop position 9), `bookkeeping for sole traders` (320,
   gorillaaccounting position 11). **None of it is medical, all of it is "hire a bookkeeper", and under O14 the
   national commercial pitch belongs to `/blog/healthcare-accountants-uk` and the wave-G commercial set, not
   here.** Chasing it would turn a practice-management guide into a services page. **Declined at 4.4 theme 9 with
   this reason.**
2. **The medical intersection is small and the positions are brutal.** `medical practice accounting` at position
   **2** (bw-medical), `medical practice accounts` at **3** (practiceindex), `medical accounts` at **2**
   (medicsmoney). Six of eight rows are peer-winnable on the <= 20 test but three of them are held at positions
   2 to 4 by specialists with fifteen-year domains. **Per STATE's Stage 0 diagnosis, this domain will not close
   that gap on content, and §8 promises nothing on it.**
3. **`medical practice accounts` and `gp practice accounts` are the SAME intent and the second one is already
   ours on Bing.** The harvest row is `medical practice accounts` (50 vol, Google). The Bing named-query set
   (§2.3) carries `gp practice accounts` at position 5 and `gp practice accounts template uk` at position 5.
   **The Google harvest and the Bing query log are showing the same demand in two vocabularies, and we already
   hold the Bing one.** That is the §7.1 target and it is evidenced on both engines, which is rare in this batch.
4. **The artefact intent has no Google harvest row at all.** No `gp practice accounts template`, no
   `nhs gp income tracker`, no `gp bookkeeping spreadsheet` anywhere in 39,296 rows. **Bing sees demand Google's
   commercial-intent crawl does not**, exactly as BATCH3_INDEX §3.4 point 3 found on the GMS topic. **§7.1 is
   therefore built primarily from the Bing named-query evidence in §2.3 and secondarily from the harvest.** This
   is a departure from the exemplar pack's method and it is deliberate, stated so a QA agent does not read it as
   sloppiness.
5. **`bma gp accounts` (2 named Bing impressions, position 4) has no harvest row either**, and the thing the
   searcher probably wants is AISMA's `Explaining the GP practice accounts` guide, which practiceindex hosts as
   a free PDF (4.1). **We cannot and should not host that guide. We can be the page that explains the same
   thing without a download**, which is 4.4 theme 1.

---

## 4. Competitor teardown

All fetches made **2026-09-01**, `httpx` with a **full browser header set** (UA, Accept, Accept-Language,
Accept-Encoding, four `Sec-Fetch-*`, `Upgrade-Insecure-Requests`), following redirects. **Every URL attempted
returned HTTP 200. No fetch failed and none was dropped.**

### 4.1 practiceindex.co.uk, Explaining the GP practice accounts 2024: **THE INCUMBENT, AND IT IS A DOWNLOAD PROMO**
`https://practiceindex.co.uk/gp/blog/explaining-the-gp-practice-accounts-2024/` · **HTTP 200**
**Class: PEER** (universe §2a #6). Holds `medical practice accounts` (50 vol, position **3**), peer-winnable.

| | |
|---|---|
| Title / H1 | `Explaining the GP practice accounts 2024` (identical) |
| Published | **29 August 2024**, "by Practice Index", in Accounting, AISMA, Finance, Money |
| Word count | **641** total, of which the article body is roughly **230** |
| H2/H3 in the article body | **None.** All heading markup on the page is chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`). |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |

**Covers:** it is a signpost. "Written by the **Association of Independent Specialist Medical Accountants
(AISMA)**, this essential guide, **Explaining the GP practice accounts**, has been fully revised and updated for
2024", then a contents list of the PDF: "What information is needed in the accounts / **Partner current
accounts** / Income and expenditure / **How pensions are shown in the accounts** / **Benchmarking financial
performance** / Conducting annual finance meetings / **Property** / **Incoming/outgoing partners** /
**Bookkeeping in the Cloud**", then "**Download the PDF for free here**", then four paid-course upsells.

**What it omits.** Everything. It contains no accounting content of its own: no drawings-versus-profit-share
explanation, no accruals, no VAT, no MTD, no figure, no date other than 2024.

**Consequence for us.** **The page ranking third on `medical practice accounts` is a 230-word advert for
somebody else's PDF.** Its contents list is the best available statement of what a GP practice manager expects
this topic to cover, and **two of its nine items are absent from our page: how pensions are shown in the
accounts, and benchmarking.** Those are 4.4 themes 2 and 3.

### 4.2 bw-medical.co.uk, GP Practice Accounts: A Basic Introduction
`https://www.bw-medical.co.uk/blog/gp-practice-accounts-a-basic-introduction` · **HTTP 200**
**Class: PEER** (universe §2a #4). Holds `medical practice accounting` (50 vol, position **2**), peer-winnable.

| | |
|---|---|
| Title / H1 | `GP Practice Accounts - A Basic Introduction` |
| Published | no date on the article; latest sibling news item dated 9 May 2024 |
| Word count | **1,236** including chrome; the article body is roughly **850** |
| H3 | `What Are The GP Practice Accounts?`; `What Else Can GP Practice Accounts Be Used For?`; **`Medical Accounting Glossary`**; `Get In Touch` |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |

**Covers, and the glossary is the reason to read it.** It opens on the right reader ("If you [are] going into
meetings with your GP partners and the practice accountant and feel overwhelmed ... There is very limited, if
any financial awareness and education as part of clinical training"), notes that most practices align the year
end to 1 April but that there is no requirement to, and lists five uses of the accounts (understand the
business, calculate partner tax and pension contributions, evidence earnings to a bank, project and plan, value
a retiring or incoming partner). It then runs a **seven-term glossary**: Accruals Basis, Balance Sheet,
Drawings, **Partners' Capital Accounts**, **Partners' Current Accounts**, Profit and Loss Account,
**Working Capital**, each with a one-paragraph definition. It closes on **AISMA benchmarking** against regional
and national averages, with a specific example ("if your practice is spending more on locums than others in your
locality").

**What it omits.** **Every number.** No VAT threshold, no NIC rate, no MTD date, no capital allowance, no year
tag anywhere. No Global Sum, no QOF, no PCN, no ARRS: the whole NHS income side is absent from a page called GP
Practice Accounts. No statutory reference. Three of its four H3s are chrome or sales.

**Consequence for us.** **The specialist medical accountant holding position 2 has a glossary and no facts. We
have facts and no glossary.** The glossary is 4.4 theme 4 and it maps exactly onto the two chart-of-accounts
Bing queries at §2.5 point 3.

### 4.3 r-m-t.co.uk, Accounting for Healthcare Professionals
`https://r-m-t.co.uk/rmt-medical/hospital-doctors/` · **HTTP 200**
**Class: PEER** (universe §2a #9). Holds `accounting for medical practices` (50 vol, position **6**).

| | |
|---|---|
| Title | `Accounting for Healthcare Professionals \| RMT Accountants` · H1 identical |
| Word count | **992** · Tables **No** · Calculator **No** · FAQ **No** |
| H2 | `Professional Accounting Support in Healthcare`; `Working with Accounting for Healthcare Professionals Experts`; `Choose RMT Accountants`; `Get in touch to find out more`; `Key Contacts` (two named partners); `Latest news` |

**Covers:** nothing about accounting. It is a service page whose actual subject is **income protection**
("our accounting for healthcare professionals service involves prioritising income protection as the cornerstone
of any financial plan we recommend ... Alongside critical illness cover and life assurance"). It repeats the
phrase "accounting for healthcare professionals" eight times.

**Consequence for us. This is a keyword-stuffed service page holding position 6 on an informational term, and it
is a DECLINE, not a target.** Under O14 the national commercial pitch belongs to `/blog/healthcare-accountants-uk`
and the wave-G set. **Recorded so the row is a decision rather than an omission**, and as evidence for §5.1
point 1.

### 4.4 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 11 themes, 11 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **The GP practice accounts as a document a partner has to read in a meeting** (4.1's contents list, 4.2's opening) | **COVER** | Both competitors frame it as "you are in a partners' meeting and do not understand the paperwork". Our page frames it as "how to do the bookkeeping". **Different reader, and the competitors have the right one for `gp practice accounts`** (§2.3 queries 8 and 10). New H2. |
| 2 | **How pensions are shown in the accounts** (4.1 contents list) | **COVER, narrowly, and hand off** | A real gap: the page mentions employer pension contributions once in the expenses list and never explains that superannuation appears in the accounts and flows to the Type 1 certificate. **One paragraph naming where it sits, then links to `/blog/gp-pension-contributions-tax-relief` (FROZEN, link the live URL) and `/nhs-pension`. No tier table (O1), no annual-allowance mechanics (O2).** |
| 3 | **Benchmarking practice financial performance against regional and national averages** (4.1, 4.2, both name AISMA) | **COVER the concept, DECLINE the figures** | Genuinely absent from our page and genuinely useful. **F6: we hold no benchmark data and must not invent or quote one.** Describe what benchmarking is and what it is used for; state no average, no percentile, no "typical practice spends X". |
| 4 | **A glossary of GP accounting terms** (4.2: accruals, balance sheet, drawings, partners' capital accounts, partners' current accounts, P&L, working capital) | **COVER as a TABLE** | Answers `why do we record sundry income in gp` and `incomeaccount that use for gp fund accounting` (§2.5 point 3), satisfies L4, and beats the incumbent at its own best feature. **Constraint: O30 gives the partnership capital account to the frozen wave-E set, so the capital-account row is a one-line definition and a link, never an explanation** (§7.3). |
| 5 | **A chart of accounts / income-category structure** (§2.5 point 3, and 4.1's "What information is needed in the accounts") | **COVER as a TABLE, and it is the pack's best idea** | See §5.1 point 2. This is the artefact the Bing queries are asking for, expressed as a table rather than a download. |
| 6 | **The year end: most practices align to 1 April but nothing requires it, and changing it needs specialist advice** (4.2) | **COVER, one paragraph** | Absent from our page, concrete, and it is a real bookkeeping decision. |
| 7 | **The five uses of the accounts: understand the business, partner tax and pension, bank evidence, projection, partner valuation** (4.2) | **COVER, one short list** | Cheap, absent, and it is what makes the page answer "why does this matter". |
| 8 | **AISMA as the specialist-accountant body** (4.1, 4.2 both lean on it) | **DECLINE** | Naming a membership body we do not belong to is either an implied credential or an advert for a competitor's. I2's faceless-authority rule cuts both ways. |
| 9 | **The generalist bookkeeping service pitch** (§3.3 point 1, 4.3) | **DECLINE** | 29,460 volume declined deliberately. O14 gives the national commercial pitch to `/blog/healthcare-accountants-uk` and wave G. **This is wave C's clearest V3 trap on this page and it is refused on the record.** |
| 10 | **Income protection, critical illness, life assurance** (4.3) | **DECLINE, and it is a boundary** | Regulated financial-product territory. Ashfield Trading Ltd is not FCA authorised. Not on this page at any depth. |
| 11 | **The free downloadable PDF** (4.1) | **DECLINE the download, COVER the content** | We do not host a rival PDF and we do not link to a competitor's. **Note also that a viewer-facing download would not work: the artefact must be an on-page table.** |

---

## 5. Whitespace: what this page owns, and what it links out

### 5.1 What nobody in the peer set has

1. **Nobody states a single number.** Across 4.1, 4.2 and 4.3, in 2,869 words, there is **not one tax figure, one
   threshold, one date or one statutory reference.** Our page states the VAT registration and deregistration
   thresholds, the MTD phasing dates, Class 4 rates and bands, the Class 2 abolition date, the AIA limit and
   SI 2019/251 for the goodwill prohibition. **KEEP every one of them, and this is why K1 is a hard fail here.**
2. **Nobody gives a coding structure, and five of ten Bing queries are asking for one.** `gp practice accounts
   template uk`, `nhs gp income tracker`, `nhs gp income tracker spreadsheet`, `incomeaccount that use for gp
   fund accounting`, `why do we record sundry income in gp`. The incumbent points at a PDF (4.1); the specialist
   gives seven definitions and no structure (4.2). **An on-page table of NHS income categories with what belongs
   in each and how each is recognised is the single highest-value addition available to this page**, it is
   additive-only so it is permitted under EXTEND, and it converts an artefact query into an on-page answer
   without hosting a file. §7.1 phrases 1 to 4.
3. **Nobody explains drawings versus profit share properly.** 4.2 defines "Drawings" in one sentence of a
   glossary. Our page gives it a whole H2 and states the rule that a partner is taxed on profit share, not
   drawings, tied to SA800 and the partnership pages. **The best section on the page and unique in the set.
   KEEP.**
4. **Nobody mentions MTD for Income Tax.** Not once, in any of the three. Our page has the phasing right
   (£50,000 / £30,000 / £20,000 by year), states that **general partnerships are deferred with no confirmed
   date**, that an individual partner can still be caught on their own qualifying income, and that limited
   companies are out. That is the current, correct and complete position per house positions §9, on a topic the
   entire peer set ignores. **KEEP.**
5. **Nobody mentions VAT.** Our page has the £90,000 and £88,000 thresholds and the standard-rated watch-items.
   **KEEP.**
6. **Nobody mentions the NHS goodwill prohibition.** Our page states it with **SI 2019/251** and the 1 April 2004
   date, which is house positions §4's CRITICAL medical divergence and the thing that most distinguishes a GP
   practice from every other partnership a bookkeeper has seen. **KEEP.**
7. **Nobody has a table.** Zero across three pages. Our page has zero too, and under EXTEND we can add them.

### 5.2 What this page OWNS versus what it LINKS OUT

**This is the pack's central discipline, because this page names nine facts that belong to other pages and links
to none of their owners** (§6.2 point 2).

**This page OWNS:**
- **How a GP partnership's books are kept**: the income categories as bookkeeping categories, accruals and
  cut-off, the current account per partner, expense categorisation, and what has to reconcile to what.
- **Drawings versus profit share** as a bookkeeping and personal-tax distinction.
- **PROPOSED, see §10.3:** the **chart of accounts for a GP practice** and the glossary of practice-accounts
  terms, because no O-row covers them and this page is the only surface that would.

**This page LINKS OUT and does not explain. Every row is currently breached: the fact is named on the page and
the owner is not linked.**

| Fact named on the live page | Owner | Allowance | Link present today |
|---|---|---|---|
| **Global Sum**, and the **Carr-Hill** weighting variables | **O19**, `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | One sentence naming it, then link. **No Carr-Hill variable list.** | **NO** |
| **QOF** points and how QOF income is recognised | **O25**, `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | One sentence, then link. **No QOF point value** (O10). | **NO** |
| **Enhanced services**, DES vs LES | **O23**, `/blog/enhanced-services-gp-practice-income-tax` | One sentence, then link. | **NO** |
| **PCN and Network Contract DES funding** | **O20**, `/blog/pcn-funding-network-contract-des-explained` | One sentence, then link. | **NO** |
| **ARRS** and the allocation between practices | **O21**, `/blog/arrs-reimbursement-employing-pcn-staff-tax` | **One sentence**, then link. Do not explain the employment model. | **NO** |
| **Dispensing income** | **O24**, `/blog/dispensing-practice-income-accounts-tax` | One sentence naming it as a separate stream, then link. **Never state the Sch 8 Group 12 zero-rating here.** | **NO** |
| **Reconciling income against the NHS statement** | **O26**, `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | **One sentence** and a link on every mention of a payment landing. **O26 binds this page harder than any other row: the whole accruals-and-cut-off H2 sits on its boundary.** | **NO** |
| **Notional rent and cost rent** | **O27**, `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` (wave B) | One sentence, then link. **Do not explain the valuation basis.** | **NO** |
| **The partnership capital account itself** | **O30**, the frozen wave-E partnership set | **One sentence and a link only**, and the link target must be checked live because five partnership pages are frozen. **Do not explain capital accounts.** | **NO** (it links `gp-partnership-tax-complete-guide` from the Related Reading list only) |
| **Last-man-standing premises risk** | **O28**, `/blog/gp-partnership-last-man-standing-premises-risk` | One sentence, then link. | **YES**, the one row already compliant |
| VAT exemption vs standard rating; the £90,000 threshold | **O17 / O21-VAT**, `/blog/gp-vat-registration` (**FROZEN**) | One sentence, then link. **Do not explain partial exemption.** | **YES** |
| What a doctor can claim | `/blog/gp-tax-deductions-complete-list-2026` (**FROZEN**) | Link. | **YES** |
| The employment-status fork for doctors | **O35**, `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN**) | One sentence, then link. **No four-role table.** | **NO** |
| Incorporation of a medical practice | **O33**, `/blog/medical-practice-incorporation-step-by-step` | One sentence, then link. The page's closing sentence raises incorporation with no link. | **NO** |

**Ten missing links. Conductor ruling 2 permits every one of them to be inserted into existing paragraphs
(§1.3 point 5), and §7.3 counts them.**

### 5.3 KEEP, explicitly

K1 is a hard fail: the drafted version's count of statutory references, technical terms and figures must be
**greater than or equal to** the live page's.

- **VAT £90,000 registration / £88,000 deregistration, and that NHS GMS and PMS income is outside the scope of
  VAT so exempt income does not count toward the threshold.** House positions §6. **KEEP.**
- **MTD phasing £50,000 / 6 Apr 2026, £30,000 / 6 Apr 2027, £20,000 / 6 Apr 2028; general partnerships deferred
  with no confirmed date; limited companies out; the explicit "Do not confuse this with the old £10,000 figure".**
  House positions §9, and the entire peer set has none of it. **KEEP.**
- **Class 4 at 6% between £12,570 and £50,270 then 2% above; Class 2 no longer a required payment from 6 April
  2024.** House positions §8. **KEEP, with the year tag corrected to 2026/27** (§1.4).
- **AIA 100% relief up to £1,000,000**, and that equipment is relieved through capital allowances rather than
  booked as an expense. House positions §7. **KEEP.**
- **The NHS goodwill prohibition since 1 April 2004, currently SI 2019/251**, and that a buy-in or buy-out is
  about tangibles, premises and capital accounts. House positions §4. **KEEP.**
- **CNSGP from 1 April 2019**, so partners' own paid indemnity is now mainly for private, non-clinical or
  regulatory cover. House positions §8, and it is a genuinely medical nuance no competitor carries. **KEEP.**
- **The GMC retention fee named as deductible with NO amount.** O9 compliant, and it must stay that way. **KEEP.**
- **"A GP partner is taxed on their profit share, not on the cash they drew", tied to SA800 and the partnership
  pages.** House positions §1. **KEEP.**
- **"it is not measured in UDAs or dental activity bands".** House positions §3 is explicit that doctors do not
  use UDAs and this page pre-empts the dental transcription error. **KEEP.**
- **The corrected NHS-contract wording** in the closing paragraph ("an ordinary personal service company cannot
  hold an NHS contract and company income is not NHS-pensionable"), landed by commit `7e596f02`. **KEEP EXACTLY.
  Never regress it to "a limited company cannot hold a GMS or PMS contract".**

---

## 6. Our current page, read honestly

Source file read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **2,798** · body copy only **1,876** |
| `metaTitle` | `GP Practice Bookkeeping Guide 2026/27 \| NHS Income UK` (53 chars) |
| `h1` / `title` | identical, `GP Bookkeeping: Essential Guide for UK General Practice Partners` (64 chars) |
| Date / generator | 2026-04-01, `opus-4.8/track2-rewrite` |
| H2 / H3 | **11 / 0** · Tables **0** · Internal links **11** · FAQs **6** · keyTakeaways **5** |
| Worked example | **None** |
| Em-dashes | **0** (I1 clean) |
| C4 first-person plural | 7 in 1,876 words = **3.7 / 1,000** (cap 3). **Marginally over.** |
| C3 second person | 6 in 1,876 words = **3.2 / 1,000** (band 12 to 25). **Below band.** |

### 6.1 Blunt read

**This is the shortest page in the batch, it is the only one earning Bing clicks, and it converts at 17.4%.**
It is factually current on VAT, MTD, NIC, AIA and the goodwill prohibition, where the entire peer set states no
figures at all. Its defects are of two kinds and only one of them is fixable inside the grade.

**Fixable and the pack's objective:** ten owned facts named with no link to any owner (§5.2), zero tables against
an L4 requirement, and no structured artefact against five artefact queries (§2.5 point 1).

**Not fixable inside the grade:** the H1 and metaTitle address a bookkeeper, and the queries that convert
(`gp practice accounts`, `bma gp accounts`, `medical practice accounts`) address a partner reading a set of
accounts. **K2 freezes both strings and this pack does not propose changing them.** The right response is a new
H2 that speaks to that reader (4.4 theme 1), not a title change.

**Per batch-1 coordinator ruling 2, the structural bands are scored against the EXTEND reality and a writer must
never contort a page to reach a band the grade forbids.** C3 at 3.2 and C4 at 3.7 are recorded as numbers, not
raised as defects; **the NEW blocks must run second person and carry zero first-person plural**, which is the
only part either band the writer controls.

### 6.2 What is wrong, thin or out of bounds, checked against the CURRENT rules including V2

Ordered by severity.

1. **THE PAGE TELLS THE READER THAT TWO VERIFIED NATIONAL FIGURES DO NOT EXIST. This is the biggest call in the
   pack.**
   - Body, Global Sum bullet: "**There is no single national per-patient value to assume**: it is uplifted
     annually, so record the actual amount on your NHS statements."
   - Body, closing the same H2: "there is **no single fixed national figure to slot in**. If a source quotes
     'the Global Sum is £X per patient', treat that as indicative only".
   - FAQ 3: "**There is no single national Global Sum or QOF point value to plug in**: both are weighted and
     uplifted annually".

   **`house_positions.md` §3.A is headed "Global Sum per weighted patient (VERIFIED AT SOURCE 2026-08-26, block
   lifted)" and locks £130.07 for 2026/27, cited to SFE Directions 2026 paragraph 3(4). §3.B does the same for
   the QOF point value at £227.95, cited to paragraphs 6(6)(b), 6(7), 6(8) and Annex E paragraph E4.** Both were
   verified at primary source, both amending instruments were read, and the O10 verification ban on both was
   lifted by the O10 RULING of 2026-08-26.

   **There IS a single national per-weighted-patient value and there IS a single national QOF point value, and
   a live page says three times that there is not.** Worse, `/blog/how-gms-funding-works-global-sum-carr-hill-explained`
   **shipped on 2026-08-26 stating £130.07 with its year tag**, so the corpus now contradicts itself.

   **The fix is NOT to state the figures here.** O19 owns the Global Sum and O25 owns QOF, and this page's
   allowance is one sentence and a link. **The fix is to stop asserting the negative.** The correct replacement
   claim, which is true, is a bookkeeping claim: *the national figure is a per-**weighted**-patient price and
   your practice's weighted list is not your headcount, so the amount that lands is practice-specific and you
   book what the statement says.* That keeps the page's actual bookkeeping point, removes the false assertion,
   states no owned figure, and creates the natural place for the O19 link. **Ruling 5 of 2026-08-26 covers the
   body instances; the FAQ instance is escalated at §10.2.**
2. **Ten owned facts are named with no link to any owning page** (§5.2 table). This is the **map gap** shape
   D11 row 5 recorded on the notional-rent page, at more than twice the scale, and conductor ruling 2 was issued
   precisely to make it fixable. **It is the pack's primary objective and §7.3 counts it.**
3. **The Carr-Hill variable list is wrong and it is not ours.** The page says the Global Sum is "weighted by the
   Carr-Hill formula (**list size adjusted for age, sex, morbidity, list turnover and geography** to give
   weighted patients)". **O19 owns the Carr-Hill variables**, and the wave-A pack records the market's and the
   formula's own wording as **rurality, patient age and sex, additional needs, list turnover, numbers in
   residential and nursing homes, and local staff costs**. Our list substitutes "morbidity" and "geography" for
   the actual variables and omits the care-home and staff-cost limbs entirely. **Two defects in one parenthesis:
   an ownership breach and an accuracy problem.** **Handling: delete the parenthetical under conductor ruling 1
   (deletion of a passage another page owns is permitted where it removes no heading and no figure and leaves a
   one-sentence handoff plus a link), replace with the O19 link, and do NOT write a corrected variable list here
   because that is O19's to write.**
4. **The Class 4 NIC year tag is stale on a current figure**, in `keyTakeaways` entry 5 ("Class 4 National
   Insurance **for 2025/26** runs at 6% ...") and in the body ("with Class 4 National Insurance (6% on profits
   between £12,570 and £50,270, then 2% above, **for 2025/26**)"). **House positions §8 verifies 6% / 2% at
   £12,570 / £50,270 for 2026/27 and instructs that current advice be tagged 2026/27.** **Ruling 6 case (a):
   tag-only correction, the figures hold. Fix both.**
5. **`Capital accounts, partner changes and premises` is an H2 whose subject is O30's.** O30 gives the
   partnership capital account to the frozen wave-E set and allows this page one sentence and a link. The H2 is
   **frozen copy** and K2 forbids rewording it. **Handling: the H2 string and its paragraphs stay byte-identical
   except for link insertion; the new glossary table's capital-account row is a one-line definition and a link,
   never an explanation; the new-block allowance for capital-account sentences is ZERO.** **Escalated at §10.2,
   because this is the same species as D11 and the conductor should rule whether a bookkeeping page may define a
   capital account at all.**
6. **Zero tables. L4 is unmet**, on a page carrying an income-stream list, an expense-category list and a
   competitor-beating glossary opportunity. **All three are natural tables and all three live in new blocks.**
7. **No worked example. G1 is unmet.** The topic supports one (a partner's drawings against profit share,
   leaving a current-account balance) and it would be the only arithmetic in the entire fetch set. **Optional,
   in a new block, and if written it must satisfy G3, G4, G5, G6 and G7.**
8. **Capital allowances are named without their current rates.** The page states AIA £1,000,000 and stops. House
   positions §7 and §7.A record that the **main-rate WDA fell from 18% to 14%** (FA 2026 s.28, 1 April 2026 CT /
   6 April 2026 IT) and that a **new 40% first-year allowance** applies to new main-rate plant from 1 January
   2026, and instruct that the WDA be date-tagged **every time**. **The page states no WDA, so it is not wrong.
   It is incomplete, and this is a permitted additive gain in a new block.**
9. **V5 and V9 checks on the existing copy.** `it is not X, it is Y`: **two** instances ("Drawings are never an
   expense ... a partner is not taxed on what they drew. A GP partner is taxed on their profit share"; "The
   choice that matters is configuration and discipline, not logo"). **At the batch cap of two and above the
   wave-wide cap of one, and both are FROZEN.** The new blocks' budget is therefore **ZERO**. Numeral-count
   paragraph openers: **one** ("Two points matter for a GP practice"), frozen, at the wave-wide cap. **New
   blocks' budget: ZERO.** **V2: clean.** No search-string narration, no keyword-variant table, no process
   narration.
10. **A1 and A5.** The opening runs 104 words to the first H2 and the direct answer arrives at roughly word 40,
    inside A5's 40-to-90 band. Marginally over on intro length. **Frozen, recorded not raised.**
11. **FAQ and word-count bands.** 6 FAQs against a band of 4 to 8: **inside**. 1,876 body words against a band of
    2,000 to 3,200: **below**, and additive work will move it toward the band. **This is the one page in the
    batch where the EXTEND band problem BATCH3_INDEX records runs the right way.**

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgement.

### 7.1 THE NAMED MISSING-PHRASE LIST: the read is measured on THIS

**10 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case and
punctuation normalised. Ordered by evidence strength: Bing named-query evidence first, harvest second.

**V1 IS BINDING AND THIS LIST IS BUILT TO IT.** Two word orders per idea per page, hard cap, counted as
**non-overlapping longest matches, never raw substrings**. The idea grouping is stated so a QA agent can verify
the cap rather than assume it. **Any V1 finding must quote the spans it counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `GP practice accounts` (as a standalone noun phrase) | The accounts as a document | 1 of 2 | **Bing `gp practice accounts` 1 impr at position 5, `gp practice accounts template uk` 3 impr at position 5, `bma gp accounts` 2 impr at position 4.** Plus harvest `medical practice accounts` 50 vol, practiceindex position 3, peer-winnable. **Six named Bing impressions and the page never writes the phrase.** |
| 2 | `medical practice accounts` | The accounts as a document | 2 of 2 | Harvest 50 vol, position 3, peer-winnable; and `medical practice accounting` 50 vol at position 2. The Google vocabulary for the same intent as phrase 1 (§3.3 point 3). |
| 3 | `income categories` (heading a table of NHS income lines) | The coding structure | 1 of 2 | **Bing `incomeaccount that use for gp fund accounting` (pos 9) and `why do we record sundry income in gp` (pos 6).** §2.5 point 3. |
| 4 | `chart of accounts` | The coding structure | 2 of 2 | Same two queries; and it is the standard term the page never uses. Harvest carries `dfe chart of accounts` (210 vol) as evidence the phrase is live vocabulary, though on a non-medical page. |
| 5 | `sundry income` | Sundry / other income | 1 of 1 | **Bing `why do we record sundry income in gp`, 1 impr at position 6.** Somebody is reading a practice P&L, does not understand a line, and lands on us. **Zero occurrences.** |
| 6 | `current account` used with `capital account` in one glossary row each | Partner account types | 1 of 2 | 4.2's glossary, which is the incumbent specialist's best feature. **Constraint: the capital-account row is a one-line definition and a link only, O30** (§7.3). |
| 7 | `weighted patient` (or `weighted list`) | Why the national figure is not your figure | 1 of 2 | **Required by the §6.2 point 1 correction.** The page must say the national price is per *weighted* patient in order to stop asserting that no national price exists, without stating O19's figure. Zero occurrences. |
| 8 | `benchmarking` (of practice financial performance) | Benchmarking | 1 of 1 | 4.1 and 4.2 both carry it; we do not. **4.4 theme 3: the concept only, no figures.** |
| 9 | `year end` (as a choice a practice makes, with the 1 April convention) | The accounting year end | 1 of 1 | 4.2, and it is a real bookkeeping decision absent from a bookkeeping page. |
| 10 | `superannuation` (as a line in the practice accounts) | Pensions in the accounts | 1 of 1 | **4.1's contents list names "How pensions are shown in the accounts".** 4.4 theme 2. **One paragraph, then link. No tier table (O1), no annual-allowance mechanics (O2).** |

**Countable test: 10 of 10 present.** Any other absent phrase is a named BLOCK.

**Explicitly NOT on this list, with the reason on the record:**
- **The generalist bookkeeping family** (`bookkeepers services`, `outsourced bookkeeping services`,
  `bookkeeping services uk`, `cloud accounting software`, and 154 more; **29,460 combined volume, 11,750
  peer-winnable**). **DECLINED** at 4.4 theme 9. O14 gives the national commercial pitch to
  `/blog/healthcare-accountants-uk` and wave G.
- **`accounting for doctors`, `medical accounts`, `medical accounting near me`** (160 combined volume, medicsmoney
  positions 2 to 6). Commercial-intent terms for the estate's healthcare-accountant head page under **O14**, not
  for a practice-management guide.
- **`networking gp accounts`** (Bing, 1 impression at position 10). **Excluded as a probable mis-parse**: it is
  almost certainly about PCN or federation networking rather than bookkeeping, and it is a single impression with
  no click. It remains a **do-not-lose** query under §7.2 because it currently matches; it is simply not a
  target.
- **`nhs digital gp income`** (Bing, 1 impression at position 6). **Excluded as a target**: NHS Digital publishes
  GP earnings statistics, which is a different topic, and chasing it would pull the page toward a national-earnings
  dataset it has no business carrying. **Do-not-lose under §7.2, not a target.**
- **`bookkeeping courses gp medical practices`** (Bing, 2 impressions at position 1, **1 click**). **Excluded as
  a target and this is deliberate**: we do not sell courses, practiceindex does (4.1), and writing toward a
  course query would either mislead or turn into a competitor advert. **It is a do-not-lose query under §7.2 and
  the page must still match it, which it will, because it matches on `bookkeeping` plus `gp` plus `practices`
  and none of those words is going anywhere.**

### 7.2 EQUITY PRESERVATION: the ten-query gate, and it is the pack's primary criterion

**ALL TEN named Bing queries at §2.3 must still match after the change**, in `metaTitle`, `metaDescription`,
`h1`, `title`, an H2, an FAQ question or answer, a `keyTakeaways` entry, or body prose.

**LABEL, restated because it is required: this is a `GetPageQueryStats` TOP-N REFERENCE SET as at 2026-09-01. It
is the set of named queries Bing has disclosed for this URL, not a proof that no other query matches. A query
absent from it may still exist.** The gate is therefore stated as "every disclosed query still matches", which
is what can be verified, and not as "no query is lost", which cannot.

| # | Query | Matching tokens that must survive |
|---|---|---|
| 1 | `incomeaccount that use for gp fund accounting` | `income`, `gp`, `accounting` |
| 2 | `why do we record sundry income in gp` | `record`, `income`, `gp` (and `sundry` is ADDED by §7.1 phrase 5, strengthening the match) |
| 3 | `bookkeeping courses gp medical practices` | `bookkeeping`, `gp`, `medical`, `practices` |
| 4 | `nhs gp income tracker` | `nhs`, `gp`, `income` |
| 5 | `nhs gp income tracker spreadsheet` | `nhs`, `gp`, `income` |
| 6 | `nhs digital gp income` | `nhs`, `gp`, `income` |
| 7 | `gp practice accounts template uk` | `gp`, `practice`, `accounts`, `uk` (and `gp practice accounts` as a phrase is ADDED by §7.1 phrase 1) |
| 8 | `bma gp accounts` | `gp`, `accounts` |
| 9 | `networking gp accounts` | `gp`, `accounts` |
| 10 | `gp practice accounts` | `gp`, `practice`, `accounts` |

**Countable test, and it is deterministic: for each of the ten queries, every non-stopword token in the query
must appear at least once in the post-edit source file, case-insensitively.** Run:

```
python scripts/track2_query_coverage.py --slug gp-bookkeeping-guide-uk --json
```

**Pass condition: 10 of 10. Any query whose token set is no longer fully present is a named BLOCK.**

**Because this change is additive only and the only deletions permitted are the three currency corrections
(§1.4) and the Carr-Hill parenthetical (§6.2 point 3), no equity query can be lost by construction.** The gate
exists to catch a writer who edits existing copy anyway, **and specifically to catch the Carr-Hill deletion**:
the parenthetical being removed contains none of the tokens above, which was checked, and the gate proves it.

**One further countable test on the deletions.** Diff the pre and post files and confirm the **only** removed
spans are: the two `for 2025/26` tags, the two "no single national value" claims in body copy, the FAQ 3 clause
if §10.2 is approved, and the Carr-Hill parenthetical. **Any other deletion is a named BLOCK.**

### 7.3 EXTEND byte-identity, and the link-insertion gate

**Byte-identical, no exceptions:**

- `metaTitle`, `metaDescription`, `h1`, `title`, `slug`, `canonical`, `category`, `date`, `image`, the whole
  `imageCredit` block, `altText`, `author`, `generator`, `schema`
- All **11** existing H2 strings, in their existing relative order
- All **6** existing FAQ **question** strings
- All **5** existing `keyTakeaways` strings **except** entry 5's `for 2025/26` tag (§1.4 correction 1)

**Countable test: `git diff` shows additions, plus deletions ONLY at the spans enumerated in §7.2's second
countable test. Deletion count outside those spans must be 0.**

**The link-insertion gate, and it is the pack's primary objective.** Under conductor ruling 2 (§1.3 point 5),
each of the following must appear at least once in the post-edit file:

| Owner row | Required `href` | Occurrences today |
|---|---|---|
| O19 | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | 0 |
| O25 | `/blog/qof-income-gp-practice-accounting-explained` | 0 |
| O23 | `/blog/enhanced-services-gp-practice-income-tax` | 0 |
| O20 | `/blog/pcn-funding-network-contract-des-explained` | 0 |
| O21 | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | 0 |
| O24 | `/blog/dispensing-practice-income-accounts-tax` | 0 |
| O26 | `/blog/gp-practice-income-pcse-statement-reconciliation` | 0 |
| O27 | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | 0 |
| O35 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` | 0 |
| O33 | `/blog/medical-practice-incorporation-step-by-step` | 0 |

**Countable test: 10 of 10 present. Every target was confirmed to exist as a markdown file on 2026-09-01.**

**Ownership sentence caps, countable:**

| Gate | Test | Pass condition |
|---|---|---|
| **O19** | Sentences explaining the Global Sum, Carr-Hill, weighted patients or contract types | **<= 2** page-wide (one naming Global Sum as an income line, one making the weighted-patient point required by §6.2 point 1). **Carr-Hill variable list: 0.** **Global Sum figure: 0.** |
| **O25** | Sentences explaining QOF beyond naming it as a stream and an accruals example | **<= 2.** **QOF point value: 0** (O10). |
| **O20 / O21** | Sentences explaining the DES envelope or the ARRS employment model | **<= 1 each.** |
| **O23 / O24** | Sentences explaining enhanced services or dispensing beyond naming them | **<= 1 each.** **Sch 8 Group 12 zero-rating: 0 occurrences** (O24). |
| **O26** | Sentences explaining income recognition against the NHS statement, **in NEW blocks** | **0.** The existing accruals H2 is frozen copy and stays; **the new blocks add no further reconciliation explanation, and every new mention of a payment landing carries the O26 link.** |
| **O27 / O30** | Sentences explaining the notional-rent valuation basis, or explaining a partnership capital account | **0 in new blocks.** The glossary's capital-account row is **one line and a link**. |
| **O17 / O21-VAT** | Sentences explaining the VAT exemption, the principal-purpose test or partial exemption **in new blocks** | **0.** The existing VAT H2 is frozen and already compliant. |
| **O35** | Four-role employment-status table or list | **0.** |
| **O4** | Scheme Pays deadlines | **0.** **This is the exact fact that broke batch 1.** |
| **O9** | GMC retention fee figures | **0.** UNVERIFIED, hard fail F5. The page names the fee as deductible without an amount and must stay that way. |
| **O1 / O2** | Tier tables; annual-allowance mechanics | **0 tier tables. <= 1 annual-allowance sentence**, carrying a link. |
| **O14** | National commercial vocabulary ("what a healthcare accountant does", the audience list, the national pitch) | **0 new occurrences.** The existing `How specialist medical bookkeeping helps` H2 is frozen and is not expanded. |
| **D3** | Links to `/blog/private-practice-incorporation-complete-guide` | **0.** That URL **301s** (D3 RULED 2026-09-01). Link the target directly, never the redirect. |

### 7.4 The three currency corrections, and the figures that are BANNED

**The corrections, each logged as a named addendum:**

| # | Live text | Correction | Authority |
|---|---|---|---|
| 1 | `keyTakeaways` entry 5 and body: `for 2025/26` on Class 4 | Change the tag to **2026/27**. **The rates and bands do not change**: 6% between £12,570 and £50,270, 2% above, and Class 2 not required from 6 April 2024. | House positions §8 ("2026/27, unchanged from 2025/26 ... verified 2026-08-26"); **conductor ruling 6 case (a)**, tag-only. |
| 2 | Body: `There is no single national per-patient value to assume` and `there is no single fixed national figure to slot in` | Replace with the weighted-patient point (§6.2 point 1). **State no figure.** Insert the O19 link. | House positions §3.A (VERIFIED, block lifted); **conductor ruling 5**, superseded claims are corrected not re-tagged. |
| 3 | FAQ 3: `There is no single national Global Sum or QOF point value to plug in` | Same correction. **ESCALATED at §10.2: a frozen FAQ answer string is what K2 protects most tightly and ruling 5 was issued about body copy. The manager decides. Until then the writer's allowance for this string is ZERO and the body corrections stand alone.** | House positions §3.A and §3.B |

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| VAT registration **£90,000**, deregistration **£88,000**, rolling 12 months, threshold rose from £85,000 on 1 April 2024 | current | house positions §6 |
| MTD **£50,000** / 6 Apr 2026, **£30,000** / 6 Apr 2027, **£20,000** / 6 Apr 2028; partnerships deferred, no confirmed date; companies out | current | house positions §9 |
| Class 4 **6%** £12,570 to £50,270, **2%** above; Class 2 not required from **6 April 2024**; voluntary Class 2 **£3.65/week** | **2026/27** | house positions §8 |
| AIA **£1,000,000** | current | house positions §7 |
| **Main-rate WDA 14%** (FA 2026 s.28, from 1 Apr 2026 CT / 6 Apr 2026 IT), special rate **6%**, new **40% FYA** on new main-rate plant from 1 Jan 2026 (FA 2026 s.29) | **date-tag every time** | house positions §7, §7.A. **Additive gain, new block only** (§6.2 point 8). |
| **SI 2019/251**, goodwill prohibition from 1 April 2004 | | house positions §4 |
| **CNSGP from 1 April 2019** | | house positions §8 |
| Six-year record retention; **SA800**; partnership pages **SA104** | | house positions §1 |
| **AMAP 55p first 10,000 miles / 25p thereafter** | **2026/27 (rose from 45p on 6 Apr 2026)** | house positions §8. **Only if mileage is mentioned; the page does not mention it today and need not.** |

**BANNED FIGURES. None of these may be asserted:**

| Banned | Why |
|---|---|
| **Any Global Sum per-weighted-patient figure** | O19. The GMS page owns it and states £130.07 with its tag. **This page states none.** |
| **Any QOF point value** | O25 owns QOF; O10's verification ban was lifted for the figure but **the ownership fence is unaffected**. A verification ban and an ownership fence are different things. |
| **Any ARRS, PCN DES, enhanced-services or dispensing figure**; the Sch 8 Group 12 zero-rating | O20, O21, O23, O24 |
| **Any Carr-Hill variable list, weighting or coefficient** | O19. §6.2 point 3. |
| **Any Scheme Pays deadline** | O4 |
| **Any GMC retention fee amount** | O9, F5 |
| **Any NHS tiered contribution rate or band** | O1 |
| **Any benchmark, average or "typical practice spends X"** | F6, 4.4 theme 3. **We hold no benchmark data.** |
| **A flat 18% main-rate WDA for periods after April 2026** | house positions §7.A |
| **A £10,000 MTD threshold** | house positions §9 |
| **The old £85,000 VAT threshold as current** | house positions §6 |
| **UDAs, dental bands or any dental framing** | house positions §3. The live page already pre-empts this and it is a KEEP. |
| **Any statement that a limited company simply "cannot hold a GMS or PMS contract"** | §2.C correction of 2026-08-26. The page's current wording is correct; do not regress it. |
| **Any fabricated statistic, "most practices", "we find that around X%"** | F6, I6 |

**Countable test: count of banned-figure assertions = 0.**

**If a worked example is written (optional, §6.2 point 7), it must satisfy G3's five components in order, G4
(role plus an initial only, explicitly illustrative, never a real practice), G6 (the heading must NOT be "Worked
example" and must not open with a `Worked example:` prefix, hard fail) and G5 (amounts illustrative, every RATE
traceable to house positions with its year tag).** G7's 80-to-200-word band collides with C2's 75-word paragraph
maximum where the example spans paragraphs; per BATCH3_INDEX pack-defect 5, QA must not read the split as a
missing component.

### 7.5 Statute, regulation and source re-verification

| Claim | Source |
|---|---|
| VAT thresholds and the outside-the-scope treatment of GMS/PMS income | `house_positions.md` §6 (verified 2026-08-26 at gov.uk) |
| MTD thresholds, dates, partnership deferral, companies out | `house_positions.md` §9 |
| Class 4 rates and bands, Class 2 position | `house_positions.md` §8 |
| AIA, **and the FA 2026 s.28 / s.29 changes if the new block states them** | `house_positions.md` §7 and §7.A; https://www.legislation.gov.uk/ukpga/2026/11/section/28/enacted and /section/29/enacted |
| Goodwill prohibition, SI 2019/251 | `house_positions.md` §4; https://www.legislation.gov.uk/uksi/2019/251/made |
| CNSGP from 1 April 2019 | `house_positions.md` §8 |
| **That a national Global Sum per-weighted-patient value and a national QOF point value both exist and are published** (needed to justify correction 2, not to state a figure) | `house_positions.md` §3.A and §3.B, which cite the SFE Directions 2026 at paragraph 3(4) and paragraphs 6(6) to 6(8) and Annex E4. **Read the house-positions blocks; do not re-fetch the PDF and do not quote a figure.** |
| Partner taxed on profit share not drawings; SA800 and SA104 | `house_positions.md` §1 |
| **Superannuation as a line in the practice accounts and the Type 1 Annual Certificate** (needed for §7.1 phrase 10) | `house_positions.md` §2.C; https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate . **One paragraph only; no deadline beyond what §2.C states, no tier table, no annual-allowance mechanics.** |
| **The accounting year end: that most practices align to 1 April and nothing requires it** (§7.1 phrase 9) | **4.2 is a competitor blog and a competitor blog is not a source (D17). Verify at HMRC BIM/PIM basis-period guidance or state it as a convention without asserting a rule.** |
| A company limited by shares may hold a GMS contract only on the s.86(3) shareholder conditions; PMS sits under s.92/s.94 | `house_positions.md` §2.C correction of 2026-08-26 |

**Countable test: every external factual claim in the NEW blocks maps to a row above with a fetch date. Count of
unverified claims = 0.**

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug gp-bookkeeping-guide-uk` | Gate bar met; **0 covered queries lost** |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Only if a worked example is written; every figure re-derived from stated inputs |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5; the year-end row is verify-or-soften |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; **all 10 new link targets and all 11 existing ones confirmed present in `Medical/web/content/blog/` on 2026-09-01** |
| 5. Equity preservation | §7.2 | **10 of 10** disclosed Bing queries still match; deletion set exactly as enumerated |
| 6. Cluster coverage | §7.1 | **10 of 10** assigned phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed.** Ledger unchanged. |
| 8. Competitor re-read | §4.4 | **11 themes, 11 decisions, 0 undecided** |
| **9. Ownership links (this pack's addition)** | §7.3 | **10 of 10** required `href` values present |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere including frontmatter. Live count **0**, must stay 0. I1, hard fail.
2. **No new H3 under an existing H2.** New H3s only inside a new H2 block.
3. **New blocks go immediately before the `How specialist medical bookkeeping helps` H2. Nothing goes after
   `Related reading`.**
4. **`it is not X, it is Y`: NEW-BLOCK budget ZERO.** The live copy already carries two, both frozen (§6.2
   point 9).
5. **Numeral-count paragraph openers: NEW-BLOCK budget ZERO.** The live copy carries one, frozen.
6. **The new blocks carry ZERO first-person plural** ("we", "our", "us"). The page is at 3.7 per 1,000 against a
   C4 cap of 3 and the existing instances are frozen. **This is the only part of C4 the writer controls.**
7. **The new blocks run second person throughout**, to lift the page toward the C3 band of 12 to 25 without
   touching a word of the existing text.
8. **No named individual, credential, byline or "reviewed by".** I2. 4.2 and 4.3 both do this and we do not.
9. **Do not name AISMA or any membership body** (4.4 theme 8).
10. **Never state or imply that any limited company simply cannot hold an NHS contract**, and never regress the
    corrected wording landed by `7e596f02`. §2.C.
11. **Never use UDAs, dental bands or dental framing.** House positions §3.
12. **Never describe QOF as compulsory.** It is voluntary; the live page is already correct.
13. **`nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date.** No Scheme Pays deadline
    anywhere. O4.
14. **Do not edit any frozen page.** Four frozen live URLs are linked from this page and all four links stay.
15. **Never propose a collapse, redirect or URL change.** K4.
16. **One change per page per window** (§9.3). This EXTEND is the only change to this URL until the read.

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC, dimension `page` | 2026-06-03 to 2026-09-01 (90d) | **0 rows. No impression at all.** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows** |
| Bing | `GetPageStats`, **page level** | 6 snapshots, 2026-05-29 to 2026-08-21 | **4 clicks, 23 impressions**, avg impression position 2 to 9, **CTR 17.4%** |
| Bing | `GetPageQueryStats`, **named-query level** | as returned | **10 distinct queries, 14 impressions, 3 clicks** |

Pro-rated to 28 days from the 90-day Bing frame: **1.2 clicks, 7 page-level impressions, 4 named-query
impressions.**

**The click-through shape, and it is the opposite of the wave-A anchor's.** 4 clicks from 23 page-level
impressions is **17.4%**, the highest in the batch, and the page ranks at position 1 to 5 on eight of its ten
named queries. **This page converts what it is shown for and is shown for almost nothing.** The remedy is
coverage and matching, not answer shape.

### 8.2 The read, Bing (primary), and the window is 42 days not 28

**§2.4 measured that `GetPageQueryStats` on this URL lags `GetPageStats` by roughly two weekly snapshots.** A
28-day read on the named-query endpoint would therefore be scoring roughly day 14's data. **The page-level test
is taken at day 28 and the named-query test at day 42, and the reason is written here so a later session does
not read the split as an inconsistency.**

1. **Named-phrase impressions, at day 42.** At least **4 of the 10** phrases in §7.1 return at least one Bing
   impression for this URL, and **at least 2 of those 4 must come from the coding-structure and accounts-document
   groups** (phrases 1, 2, 3, 4, 5), because those are the intents that carry the clicks today. Today the count
   is 0 of 10. **Per §9.6 point 2, total impressions rising while the 10 stay at zero is DRIFT and is recorded as
   a FAIL, not a pass.**
2. **Clicks, at day 28, page level.** Bing clicks on this URL in a rolling 28-day window **at or above 2**
   (baseline 1.2).
3. **Page-level impressions, at day 28.** At or above **12** in a rolling 28-day window (baseline 7).
4. **The five artefact queries** (§2.5 point 1: `nhs gp income tracker`, `nhs gp income tracker spreadsheet`,
   `gp practice accounts template uk`, `bma gp accounts`, `bookkeeping courses gp medical practices`). **At least
   3 of the 5 still return an impression at day 42**, and **`gp practice accounts template uk` must convert at
   least one click**, having earned 3 impressions at position 5 and zero clicks. **That single number is the test
   of whether the on-page table was the right answer to an artefact query**, and it is the one figure that
   separates "we added words" from "we fixed the page".

### 8.3 Google: no expectation is set, deliberately

**This URL has never earned a Google impression.** STATE's Stage 0 diagnosis of 2026-09-01 records 18 of 139
URLs indexed, 66 discovered-not-indexed and 51 unknown to Google, with the binding constraint named as
**indexation, not content**. **A page not being indexed at 42 days carries no information. No position is
promised, no ranking is promised, and any later read that scores this page on Google is scoring the wrong thing.**

The only Google observation worth recording is a binary: **whether the URL earns a first impression at all by
day 90.** If it does, that is evidence about crawl, not about the rewrite.

### 8.4 Failure triggers, written as numbers, before the change

> **TRIGGER 1, equity, and it is the tightest constraint on this page.** If **any** of the ten named Bing queries
> at §2.3 stops returning an impression for this URL for two consecutive 28-day windows after deploy, that query
> is a named BLOCK and is investigated before any further change to this page. **Because the change is additive
> only, no query can be lost by construction; a loss therefore means the additive-only rule was breached, and
> that finding matters more than the query.**

> **TRIGGER 2, volume.** If Bing page-level clicks on this URL fall **to 0** across two consecutive 28-day
> windows between deploy and deploy+84 days, revert:
> `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/gp-bookkeeping-guide-uk.md`
> The baseline is 1.2 clicks per 28 days, so a single empty window is well inside noise and two is not.

> **TRIGGER 3, position.** If the `GetPageStats` average impression position for this URL exceeds **10** across
> two consecutive snapshots (baseline range 2 to 9), hold the page and investigate. **State the endpoint when
> scoring this: page-level and named-query positions are different numbers and BATCH3_INDEX §8 records a wave-B
> acceptance test that was written against the wrong one.**

> **TRIGGER 4, correction.** If the adversarial factual QA track finds that either §7.4 correction 2 or the
> Carr-Hill deletion (§6.2 point 3) removed a token needed by one of the ten equity queries, the change is
> reverted and re-drafted. §7.2's second countable test exists to catch this before deploy.

**Wave-level context.** BATCH3_INDEX §5 records wave C as 1 EXTEND and 9 REFRAME. **This page is that one
EXTEND, and it carries 100% of wave C's measured Bing clicks**, because every other wave-C surface returns zero
Bing rows (measured for two of them by this task's sibling packs). **A fall here is a fall in the whole wave's
only Bing signal**, which is the argument for treating triggers 1 and 2 as blocking rather than advisory.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **10 missing phrases of
§7.1**, not with the 10 queries the page already ranks for. **`monitored_pages` registration is a separate
owner-triggered step and has not been done by this task. No monitor, alert, cron, email or scheduled job was
created.**

---

## 9. Ownership-map compliance

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a conductor's brief and the map disagree, THE MAP WINS.** The writer follows the map,
states neither fact, and reports the conflict.

### 9.1 THE ROWS THAT CONSTRAIN THIS PAGE, reproduced from BATCH3_INDEX §6

**This page owns no O-row. It is a page that names ten other pages' facts, which is why the map matters here more
than anywhere else in wave C.**

| # | Shared fact | **Owner** | **What THIS page does** |
|---|---|---|---|
| **O19** | The core GMS contract and the **Global Sum**: the per-weighted-patient price with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | **One sentence naming Global Sum as an income line, plus one making the weighted-patient point required by §7.4 correction 2, then link. No Carr-Hill explanation, no Global Sum figure, no contract-type comparison.** The live page's Carr-Hill parenthetical is deleted under conductor ruling 1 (§6.2 point 3). |
| **O20** | The **Network Contract DES and the PCN funding envelope** | `/blog/pcn-funding-network-contract-des-explained` | One sentence, then link. |
| **O21** | **ARRS**: reimbursable roles, mechanics and caps, who employs ARRS staff, payroll, pension and employer-NIC consequences, the shared-staff VAT trap | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | **One sentence, then link. Do not explain the employment model or the allocation mechanics.** The live page says ARRS income "needs proper allocation between participating practices", which is at the edge of the allowance and is frozen copy: **leave it byte-identical and add the link.** |
| **O22** | PCN clinical director payments | `/blog/pcn-clinical-director-payments-tax` | Not mentioned. Compliant. |
| **O23** | Locally commissioned and **enhanced services**: DES vs LES, how they are contracted, invoiced and recognised | `/blog/enhanced-services-gp-practice-income-tax` | One sentence naming it as a stream, then link. |
| **O24** | **Dispensing practice income**, and the zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12 | `/blog/dispensing-practice-income-accounts-tax` | One sentence naming it as a separate stream, then link. **Never state the zero-rating here.** |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **One sentence and a link. No QOF point value** (O10, and the ownership fence is unaffected by the verification ban being lifted). The live page's accruals example uses QOF, which is legitimate as a *timing* illustration; **it stays byte-identical and gains the link.** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | **Every mention of a payment landing gets one sentence and a link. THIS ROW BINDS THIS PAGE HARDEST**: the whole `Accruals and cut-off` H2 sits on its boundary. That H2 is existing copy and stays. **The new blocks add no further reconciliation explanation.** |
| **O27** | **Notional rent and cost rent** | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` (wave B) | One sentence, then link. **Do not explain the valuation basis.** Live page names both with no link. |
| **O28** | **Last-man-standing lease risk** | `/blog/gp-partnership-last-man-standing-premises-risk` | One sentence, then link. **Live page compliant, and it is the only compliant row.** |
| **O29** | The own-versus-rent decision | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` (wave B) | Not raised. Compliant. |
| **O30** | **The partnership capital account itself** | frozen wave-E partnership set | **One sentence and a link only, and the link target must be checked live because five partnership pages are frozen. Do not explain capital accounts.** The live page has a whole H2 on them. **Frozen copy, escalated at §10.2, new-block allowance ZERO.** |
| **O33** | Incorporation of a medical practice, s.162 relief, the step sequence, and the pension-accrual loss | `/blog/medical-practice-incorporation-step-by-step` (**named 2026-09-01 by the D3 ruling**) | One sentence, then link. The live closing paragraph raises incorporation with no link. |
| **O35** | The employment-status fork for doctors | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | One sentence, then link to the live URL. **No four-role table.** |
| **O14** | "What a healthcare accountant does", the audience list, the national commercial pitch | `/blog/healthcare-accountants-uk` | **Wave G in full.** The existing `How specialist medical bookkeeping helps` H2 is frozen and is not expanded, and **no national commercial vocabulary is added** (4.4 theme 9). |
| **O17 / O21-VAT** | VAT exemption vs standard rating; the £90,000 threshold and the registration decision | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | One sentence and a link. **Live page compliant**: it links the VAT page and does not explain partial exemption. **Do not expand it.** Cited as `O21-VAT`, never as `O21` (BATCH3_INDEX §6.1a collision 2). |
| **O1 / O2** | Tiered contribution rates and bands; annual-allowance mechanics | `/calculators/nhs-superannuation-tiered-contribution`; `/calculators/nhs-pension-annual-allowance` | **No tier table.** One sentence and a link if the superannuation block (§7.1 phrase 10) is written. |
| **O4** | Scheme Pays | `/calculators/nhs-pension-scheme-pays`; `/blog/nhs-pension-scheme-pays-doctors-deadlines` **is not this batch's at any date** | **No Scheme Pays deadline anywhere. This is the exact fact that broke batch 1.** |
| **O9** | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No GMC fee figure. Hard fail F5.** The live page names the fee as deductible with no amount, which is exactly right. **KEEP.** |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. |
| **O7a / O7b / O8** | Uniform and laundry flat rates; professional subscriptions and List 3; how to claim employment expenses | `/blog/nhs-uniform-tax-relief-laundry-allowance`; `/blog/nurse-tax-relief-professional-subscriptions` | The live expenses H2 names BMA and Royal College fees "where on HMRC's approved List 3", which is **O7b's fact in one clause**. Frozen copy: **leave byte-identical, and the new blocks add nothing on subscriptions.** |

### 9.2 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. This pack proposes **one** new row (§10.3), **two**
escalations (§10.2) and **two** corrections (§10.1, §10.4). None is enacted.

### 9.3 Batch-level style watch (V5 and V9), conductor's job not this writer's

1. Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   wave, is named in the wave's fix pass, whatever it is. Invisible from inside a single page.
2. **Named and already burned:** `it is not X, it is Y` and the **numeral-count paragraph opener**, both capped
   at once per page wave-wide. **The live frozen copy already spends 2 and 1 respectively (§6.2 point 9), which
   is over the wave-wide cap on the first and at it on the second, and none of it can be removed under EXTEND.
   The new blocks' budget for both is ZERO, and the conductor should know that this page enters the wave over
   cap through no fault of the writer** (the same situation BATCH3_INDEX records for the wave-A anchor's frozen
   corrective H2).
3. **V9's corollary: wave C is the fourth showing of the corrective-opening reflex.** The wave-C conductor
   decides the variation and states it in the fix pass.
4. **V1 hard cap: two word orders per idea per page**, non-overlapping longest matches, never raw substrings.
   §7.1 states its idea groups. **Specific V1 pressure here: `GP practice accounts`, `medical practice accounts`,
   `practice accounts` and `the accounts` are four word orders for one idea. §7.1 asks for two of them and the
   frozen copy carries none, so the budget is available and must not be exceeded.**
5. **V2 is a live standard.** This page is clean and must stay clean: no search-string narration, no
   keyword-variant table, and **no narration of the ownership map to the reader** (conductor ruling 3,
   2026-08-26). Write "the detail sits on X" and link it. **This matters unusually much on this page, because it
   is about to gain ten handoff links and a lazy writer will explain why they are there.**

---

## 10. Corrections and escalations

Four. **None was acted on. Nothing outside this file was written.**

### 10.1 D2 IS PARTLY WRONG ABOUT ITS OWN MECHANISM, and the test is free

BATCH3_INDEX **D2** and **§0.2** frame the Bing endpoint problem as a scale gap: 129 page-level impressions
against 85 named-query impressions on the GMS page, "a factor of 1.5", with clicks agreeing exactly at 7, and the
lesson that the agreement on clicks invites a forbidden comparison.

**On this page the two endpoints agree PERFECTLY in the overlap and the entire gap is a reporting lag** (§2.4).
Snapshot by snapshot: 2026-05-29 **1/1**, 2026-06-26 **1/1**, 2026-07-10 **5/5 impressions and 3/3 clicks**,
2026-07-24 **7/7**. The two most recent snapshots (2026-08-14 and 2026-08-21, 9 impressions and 1 click at page
level) **return no named-query rows at all.**

**So the operating rule stands and the stated mechanism is at least incomplete: the endpoints are not
necessarily measuring different things at different scales, the named-query endpoint is behind.**

**This is testable for free and the wave conductor should test it: re-pull
`get_page_query_stats` for `/blog/how-gms-funding-works-global-sum-carr-hill-explained` today and see whether the
85 has grown toward 129.** If it has, D2's factor-of-1.5 framing is a lag artefact and **every acceptance
criterion in the batch that reads a named-query figure at 28 days is reading it too early.** That would affect
wave A's and wave B's reads as well as this one. **This pack sets its own named-query read at day 42 for that
reason** (§8.2).

**D2's actual operating instruction, that every Bing figure must name its endpoint, is unaffected and is followed
throughout this pack.**

### 10.2 TWO ESCALATIONS: the writer must not resolve either alone

**(a) The FAQ 3 correction.** §7.4 correction 3 asks to change a **frozen FAQ answer string** to remove a claim
that contradicts verified house positions. Conductor ruling 5 of 2026-08-26 ("superseded figures inside frozen
copy are corrected, not merely re-tagged") was issued about **body copy** on the PCN page. **An FAQ answer string
is the thing K2 protects most tightly, and BATCH3_INDEX's byte-identity lists name FAQ strings explicitly.**

**Recommendation: permit it, narrowly.** The clause is factually wrong, it contradicts a sibling page that
shipped on 2026-08-26 stating £130.07, and the correction removes no heading, reorders nothing and adds no owned
figure. The equity check is clean: the clause contains none of the tokens in the ten equity queries at §7.2.
**Until the manager rules, the writer's allowance for this string is ZERO and the two body-copy corrections stand
alone**, which leaves the page internally inconsistent for one window rather than risking the equity. That is the
same safe default D11 chose.

**(b) The `Capital accounts, partner changes and premises` H2.** O30 gives the partnership capital account to the
frozen wave-E set and allows this page one sentence and a link. **The live page has a whole H2 on it, written
2026-04-01, long before the map existed.** This is the D11 class exactly: a pre-existing ownership breach inside
copy that an EXTEND grade freezes.

**Recommendation: leave it.** Unlike the wave-A breaches D11 named, **this one is arguably not a breach at all**:
the H2's subject is how capital and current accounts are *posted in the books*, which is bookkeeping, whereas O30
owns what a capital account *means* for a partner's stake. The two are genuinely different facts wearing the same
noun. **The writer leaves the H2 byte-identical, adds the O30 link, sets the new-block capital-account allowance
to ZERO, and lets the glossary row be one line and a link.** **The manager decides whether O30 should be
narrowed in the map to say so**, which would also settle the same question for `gp-partnership-profit-sharing-tax-planning`
and the two wave-E calculators.

### 10.3 PROPOSED NEW OWNERSHIP ROW: nobody owns the practice's books

O1 to O36 contain **no row for the mechanics of GP practice bookkeeping**: the chart of accounts, the income
coding structure, the current account per partner as a ledger, cut-off, or the glossary of practice-accounts
terms. This page is the only surface that carries any of it, and §7.1 asks it to carry more.

Proposed, not enacted, and **prefixed rather than numbered `O37`**, per BATCH3_INDEX §6.1a's own lesson that a
single global integer sequence collides across parallel sessions.

| # | Shared fact | Proposed owner | Everyone else |
|---|---|---|---|
| **C3-04** | **How a GP practice's books are kept**: the income-category / chart-of-accounts structure, accruals and cut-off as bookkeeping practice, the current account per partner as a ledger, and the glossary of practice-accounts terms (accruals basis, balance sheet, drawings, current account, profit and loss, working capital) | `/blog/gp-bookkeeping-guide-uk` | `/blog/gp-accounting-guide` (**FROZEN**), `/blog/gp-accounting-software` and the wave-E partnership set: one sentence, then link. **The boundary against O26 is that O26 owns reconciling to the PCSE statement and this row owns the ledger the reconciliation lands in.** |

**Why it matters now.** `/blog/gp-accounting-guide` is frozen and **`status='flagged'`**, meaning an open
regression, and it is the nearest neighbour to this row. **The row cannot be settled properly until that page
unfreezes on 2026-09-10 and can be read.** Proposing it now, unowned, is better than letting a wave-E page annex
it silently.

### 10.4 The Carr-Hill parenthetical is wrong on the facts as well as out of bounds

§6.2 point 3. The live page describes Carr-Hill as adjusting list size "for **age, sex, morbidity, list turnover
and geography**". The wave-A pack records the formula's own six elements as **rurality, patient age and sex,
additional needs, list turnover, numbers in residential and nursing homes, and local staff costs**, and records
`gms funding weighting for care homes` as a Bing query on which the GMS page sits at position 1.0.

**Our list substitutes "morbidity" for "additional needs" and "geography" for "rurality", and omits the
residential-and-nursing-home and local-staff-cost limbs entirely.** It is close enough to sound right and wrong
enough to mislead, on a page that has no business stating it.

**Handling: delete the parenthetical (conductor ruling 1) and link O19. Do not write a corrected list here.**
**Recorded for the wave-A owner's benefit**, because if this page had it wrong, a check is worth running across
the corpus for other pages that paraphrase Carr-Hill without owning it.

---

## 11. Limitations

1. **`GetPageStats` and `GetPageQueryStats` are BOTH top-N endpoints** (BATCH3_INDEX §9 limitation 2). The 23
   page-level impressions are a **floor**, and the ten-query list at §2.3 is **the set Bing has disclosed**, not
   a complete enumeration. §7.2 is worded to that limit and must not be restated as "no query is lost".
2. **The named-query endpoint lags the page-level endpoint on this URL by roughly two weekly snapshots**
   (§2.4, §10.1). Every named-query figure in this pack is therefore **at least two weeks stale relative to the
   page-level figure**, and the two are never set against each other.
3. **This page has no Google data at all**, so §7.1 rests on ten Bing named queries and eight harvest rows.
   **That is the thinnest evidence base of any EXTEND page in batch 3**, and the phrase list is 10 rather than
   the wave-A anchor's 14 because of it.
4. **The artefact intent has no Google harvest row anywhere in 39,296 rows** (§3.3 point 4). The single best idea
   in this pack, the on-page coding-structure table, rests entirely on five Bing queries totalling nine
   impressions. **It is a well-evidenced bet, not a measured demand**, and §8.2 point 4 is written so the bet can
   fail visibly.
5. **Peer-winnable is Google-derived** (DataForSEO positions are Google positions). Per owner decision 21 it
   orders the work and excludes nothing. On a page with zero Google impressions and four Bing clicks, that
   limitation bites harder than on any other page in the wave.
6. **One fact needed for §7.1 phrase 9 is competitor-sourced and unverified**: that most GP practices align the
   year end to 1 April and that nothing requires a fixed date (4.2). **A competitor blog is not a source (D17).**
   §7.5 makes it verify-or-soften.
7. **No live-production check was run against medicalaccounts.co.uk.** The page's rendering mode, structure and
   internal link targets are derived from the source file and the repo. **All 10 new link targets and all 11
   existing ones were confirmed to exist as markdown files on 2026-09-01; that they render at the expected URLs
   was not verified live.** The one live-state fact relied on, that
   `/blog/private-practice-incorporation-complete-guide` returns 301, comes from the D3 ruling of 2026-09-01,
   which was itself a live fetch.
8. **Repo HEAD moved between the batch index's writing and this pack's** (`7be12b11` to `d2e75655` to `ad4800eb`
   to `6714de48` to `038016726e21bdc3837dbb8a0a5789e3d0c09a5e`). The revert anchor in §1 was derived live from
   the file's own last-touching commit and verified byte-identical to the working tree. **Do not copy a sha from
   any batch document.**
