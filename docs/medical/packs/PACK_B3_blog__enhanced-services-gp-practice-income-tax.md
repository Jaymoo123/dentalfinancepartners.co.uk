# §9.5 RESEARCH PACK: /blog/enhanced-services-gp-practice-income-tax

Built 2026-08-26 for **batch 3, wave A**. Spec: `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5.
Batch index: `docs/medical/packs/BATCH3_INDEX.md` (sections 1, 2, 5 and 6 binding).
Language spec: `docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9).
Ground truth: `docs/medical/house_positions.md`. Peer set: `docs/medical/competitor_universe_2026-08-26.md` §2a.
Market map: `docs/medical/cluster_dossier_2026-08-26.md`, CORRECTED §4 ordering.
Format exemplar: `docs/medical/packs/PACK_blog__qof-income-gp-practice-accounting-explained.md`.

**No paid API call was made by this pack: $0.00.** GSC and Bing Webmaster are free and both were
re-pulled by this task (section 2). The DataForSEO harvest queried in section 3 was already paid for
on 2026-08-26 and was read by SQL only.

**Nothing under `Medical/web/` was edited.** No commit, no deploy, no IndexNow, no `monitored_pages`
write, no monitor, alert, cron or scheduled job created. This pack is preparation only.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES.**

The grade does **not** come from a plain read of §9.2. It comes from the **§2.4 ruling** in
`BATCH3_INDEX.md`. §9.2's table has a hole: REFRAME requires Bing clicks **= 0**, EXTEND requires Bing
clicks **>= 3**, and this page has **1**. It matches neither branch, and 26 URLs on this site fall in
the same hole. The ruling is:

> **1 or 2 Bing clicks at a Bing average impression position of 10 or better grades EXTEND.**

**This page holds Bing average impression position 4.0** (section 2), so it qualifies on the position
test and grades EXTEND. The position condition is the load-bearing half of the ruling: it is what
stops a future page with two clicks from position 40 being frozen by accident. Recorded here so a QA
agent reading §9.2 alone does not conclude the grade is wrong. The ruling is also **defect D4** in the
index and should be promoted into `REWRITE_PROGRAM.md` §9.2 as a third row, because the hole is in the
shared spec and will recur on every Bing-first site in the estate.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/enhanced-services-gp-practice-income-tax` |
| Cluster / lane | GP practice income and NHS funding. Wave A. Lane `practice_income` / `nhs_practice_income`. |
| Ownership row | **O23**, `BATCH3_INDEX.md` §6.2. This page is the OWNER. |
| Source file | `Medical/web/content/blog/enhanced-services-gp-practice-income-tax.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** The writer edits the `.md` file directly and writes new blocks as raw HTML `<h2>` / `<h3>` / `<p>` / `<ul>` to match. Frontmatter carries `metaTitle`, `h1`, `title`, `summary`, `keyTakeaways` and the `faqs` list. |
| Current sha (revert anchor) | **`d2e75655`** (`git rev-parse HEAD` run live by this task, 2026-08-26, full: `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`) |
| Revert path | `git checkout d2e75655 -- Medical/web/content/blog/enhanced-services-gp-practice-income-tax.md` |

> **Sha warning, and it is not theoretical.** `BATCH3_INDEX.md` §0 records that the index first
> printed `7be12b11`, taken from a session-start environment banner, and that
> `git cat-file -t 7be12b11` finds no such object on this branch. This pack's own task prompt also
> carried the wrong sha in an earlier form. **The anchor above was derived live by running
> `git rev-parse HEAD` in this task**, not copied from a banner and not copied from the index. A pack
> that copied `7be12b11` would write a revert command that undoes batch 2 as well as its own page.

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `Enhanced Services Income for GPs: DES, LES & the Tax`
2. `h1`: `Enhanced and Locally Commissioned Services: Extra GP Practice Income and How It Is Taxed`
3. `title`: `Enhanced Services Income for GP Practices: DES, LES and the Tax`
4. `metaDescription`, `slug`, `canonical`, `category`, `date`, `generator`, `author`, `image`, the
   whole `imageCredit` block, `altText`, `schema`.
5. **The existing H2 sequence, verbatim and in this relative order:**
   1. `Where enhanced services sit in GP funding`
   2. `Directed Enhanced Services (DES)`
   3. `Local Enhanced Services / Locally Commissioned Services (LES / LCS)`
   4. `DES versus LES versus QOF versus core (a clear comparison)`
   5. `How enhanced-services income is taxed`
   6. `The VAT line on enhanced and private-feeling services`
   7. `Should the practice sign up? (a decision lens, not advice)`
   8. `How we help GP practices`
6. **All 7 existing H3 strings**, unchanged and in place: `What a DES is`, `Examples`,
   `The Network Contract DES (named once)`, `What a LES is`, `Examples`, `How a LES is priced and paid`,
   `Timing and accruals`. (Two of them are the identical string `Examples`. See section 6, defect P2.)
7. **All 14 existing FAQ question and answer strings.**
8. **All 5 existing `keyTakeaways` strings**, and the `summary`.
9. Every existing paragraph. **Nothing existing is reworded, reordered, shortened or "tidied".**

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before** the existing
   `How we help GP practices` H2, so the eight existing H2s keep their relative order and a
   byte-identical check reads them as an unbroken subsequence. This page has no `Related Reading`
   block, so appending after `How we help GP practices` is structurally legal but reads worse.
2. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place unchanged.
   Note H1 of the language spec caps a **newly authored** set at 4 to 8; coordinator ruling 1 (batch 1)
   is explicit that existing substantive entries are never deleted to hit a count, and coordinator
   ruling 2 is explicit that structural bands are scored against the EXTEND reality. **14 existing FAQs
   is a consequence of the grade, not a defect, and the writer must not contort the page to reach a band
   the grade forbids.**
3. **New key takeaways appended** to `keyTakeaways` (optional; the existing 5 stay).
4. New internal links **inside the NEW blocks only**. No new internal link inside any existing paragraph.

### Frozen-list position, confirmed against BATCH3_INDEX §1

`BATCH3_INDEX.md` §1 lists **19 rows** from `monitored_pages` where `site_key='medical'` and
`monitor_until > now()`, run with **no status predicate**. The slug
`enhanced-services-gp-practice-income-tax` **does not appear on that list**, so this page is workable now.

**The check that matters is the one that was already got wrong once today.** Three of the 19 rows carry
`status='flagged'` (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) and a
`status='active'` filter silently excuses them. `flagged` is written in exactly one place
(`optimisation_engine/analysis/detectors.py:1400`) and nothing resets it, so it is a de-duplication
stamp on an open regression: a flagged row is **more** sensitive than an active one, not less.
**All nineteen are frozen. This page is not one of them.**

Contextual links to a frozen page's live URL are fine. Editing a frozen page is not.

**Never propose a collapse, a redirect or a URL change** (§5 locked rules, K4, and the estate-wide
never list). Rewrite in place only. **No em-dashes** (I1). The live file currently contains zero
em-dashes and must still contain zero afterwards.

---

## 2. Equity register

**Every figure below was re-pulled by this task on 2026-08-26.** The shared scratchpad files named in
the writer brief (`medical_stage0/gsc_page_rows.json` and siblings) were **not relied on**: they are
being deleted mid-task by concurrent agents obeying the standing "delete the temporary files you
create" rule, which is recorded as **defect D10** in `BATCH3_INDEX.md` §7. Every number here carries
the call that produced it.

**Data-through 2026-08-23 on both engines.**

### 2.1 Google, and it is a crawl-demand fact

```python
from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
f = GSCQueryFetcher("medical")            # -> siteUrl sc-domain:medicalaccounts.co.uk
svc = f.gsc_client.service
svc.searchanalytics().query(
    siteUrl="sc-domain:medicalaccounts.co.uk",
    body={"startDate":"2026-05-25","endDate":"2026-08-23",
          "dimensions":["page"],          # -> 21 rows site-wide, 0 for this URL
          "rowLimit":25000}).execute()
# same call with dimensions ["page","query"] -> 259 rows site-wide, 0 for this URL
```

| Dimension | Rows returned, whole site | Rows for THIS URL |
|---|---|---|
| `["page"]` | **21** | **0** |
| `["page","query"]` | **259** | **0** |

**Google: zero clicks, zero impressions, zero rows at either dimension.**

**This is a fact about crawl demand, not about the page, and it must be written that way.** Google
returns page-dimension rows for **21 of the 138 URLs in the sitemap**, roughly 15% of the corpus.
On a domain where Google gives rows to fifteen URLs in a hundred, a page's absence from that set
carries no information about its quality or its ranking. **Never write that this page "ranks nowhere"
on Google.** It has never been given the chance to fail. This is `BATCH3_INDEX.md` §7 defect **D5**,
recorded there explicitly as a question rather than a finding, and it binds this pack.

### 2.2 Bing, page level, `GetPageStats`

```python
from optimisation_engine.clients.bing_query_client import BingWebmasterClient
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
# 303 rows, 14 weekly snapshots. Filtered to this slug -> exactly 1 snapshot row.
```

| Snapshot date | Clicks | Impressions | Avg impression position |
|---|---|---|---|
| **2026-08-14** | **1** | **7** | **4.0** |

Summed across the 13 weekly snapshots dated **2026-05-29 to 2026-08-21**, which is the window figure:
**1 click, 7 impressions, average impression position 4.0.** Only one snapshot in the window carries
this URL at all; the other twelve return nothing for it, which is itself consistent with limitation 2
below (`GetPageStats` is a top-N endpoint).

**This reproduces the figure given inline in the task prompt exactly. No divergence to record.**

### 2.3 Bing, named-query level, `GetPageQueryStats`, and this is the interesting number

```python
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/enhanced-services-gp-practice-income-tax")
# -> []   (rows: 0)
```

**ZERO named-query rows. Not one.**

**State this rather than smooth it.** The page has a click and seven impressions at page level, and
**no query is attributable to any of it**. Both numbers are true and they are measured by different
endpoints that are never comparable to each other. This is the endpoint split recorded as **defect D2**
at its most extreme: on the GMS page the two endpoints read 129 and 85 page-level against named-query
impressions, a 34% gap while the clicks agree exactly at 7. Here the gap is total. **The click is real,
and no query is attributable.**

> **The trap inside the trap, and the reason this zero was verified rather than assumed.**
> `GetPageQueryStats` returns an **empty list rather than an error** when `page` is passed as a path
> (`/blog/<slug>`) instead of the full `https://www.` URL. A writer following the batch-1 exemplar,
> which shows a path argument, gets zero rows and honestly reports "no Bing query data" as a finding.
> That is a silent-failure path producing a false negative. **The call above was made with the full
> `https://www.` URL and still returned zero**, so this zero is a real zero and not the client bug.
> Recorded in `BATCH3_INDEX.md` §0.2 and unfixed in the client and in the exemplar.

### 2.4 What this means for the pack, stated plainly

**This is the thinnest equity in wave A.** The six wave-A pages compared, all page-level Bing,
same window:

| Page | Bing clicks / impressions | Named-query rows |
|---|---|---|
| `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | 7 / 129 | 55 |
| `/blog/pcn-funding-network-contract-des-explained` | 7 / 85 | 47 |
| `/blog/arrs-reimbursement-employing-pcn-staff-tax` | 1 / 11 | 7 |
| **`/blog/enhanced-services-gp-practice-income-tax`** | **1 / 7** | **0** |
| `/blog/pcn-clinical-director-payments-tax` | 1 / 4 | 0 |
| `/blog/dispensing-practice-income-accounts-tax` | 0 / 1 | n/a |

**What follows from that, and it governs section 7.** There is no equity set to preserve and no
traffic baseline worth testing against. A do-not-lose query list cannot be written, because there are
no named queries to list. A 14-day or 28-day traffic target on one click is noise dressed as a metric:
one click either happening or not happening moves the figure 100%.

**So the acceptance criteria in section 7 are a COVERAGE test, not a traffic test.** They count what is
present on the page, which is deterministic and checkable on the day the page ships, rather than what
the page earns, which on this equity base is unmeasurable. This is stated before the work so the later
read has something to fail (§9.6) and cannot be quietly re-scoped into a traffic story afterwards.

**Equity preservation, the §9.9 floor 5 gate:** the combined equity set for this URL is **0 Google rows
plus 0 named Bing queries = 0 queries**. The floor is satisfied trivially and by construction, because
the change is additive only and removes nothing. **The one thing that CAN be lost is the page-level
position 4.0**, and that is the only equity number worth watching (section 8).

---

## 3. The market's keyword set

### 3.1 Source and selection regex

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`. **Read by SQL
only; no new DataForSEO call was made and none is permitted by this task.**

**Regex printed so the counts are re-derivable**, and it uses `\y` and not `\b`, per **defect D9**:

```sql
-- run 2026-08-26 via scripts/_q.py
select competitor_domain, ranked_keyword, position, search_volume, url
from dataforseo_competitor_data
where site_key='medical'
  and ranked_keyword ~ '\yenhanced service|\ydes\y|\yles\y|locally commissioned|\ylcs\y|local enhanced|directed enhanced|national enhanced|minor surgery|item of service|\yios\y|near patient testing|phlebotomy'
order by search_volume desc nulls last, ranked_keyword;
-- 19 rows, 11 distinct ranked_keyword
```

> **D9 compliance, and it is load-bearing here.** Postgres ARE uses `\y` for a word boundary; `\b` is a
> **backspace character**. A pack writer found `~ '\yarrs\b|...'` returning 3 rows where `\y` returns 41,
> and a second found `\mpcn\M` missing `pcns payment` at 9,900 volume, roughly 88% of that topic.
> The regex above word-bounds four short stems (`des`, `les`, `lcs`, `ios`) that would otherwise match
> inside `describes`, `unless`, `services` and hundreds of other words, so getting the boundary syntax
> right is the difference between 19 rows and an unusable result set. A second, deliberately unbounded
> sweep is at 3.3.

### 3.2 The 19 rows, and the finding that governs this pack

| Vol | Best pos | Held by | Class | Peer-winnable | Keyword | Owner |
|---|---|---|---|---|---|---|
| 260 | 13 | bhp.co.uk | PEER (§2a #15) | yes | `pcn des` | **O20** |
| 260 | 28 | practiceindex.co.uk | PEER (#6) | no | `pcn des 26/27` | **O20** |
| 110 | 19 | bhp.co.uk | PEER | yes | `des gp` | **O20** |
| 110 | 23 | bhp.co.uk | PEER | no | `des nhs` | **O20** |
| 110 | 29 | bhp.co.uk | PEER | no | `nhs des` | **O20** |
| 50 | 76 | practiceindex.co.uk | PEER | no | `des: contract 25/26` | **O20** |
| 50 | 84 | practiceindex.co.uk | PEER | no | `network contract des 25/26` | **O20** |
| 50 | 94 | practiceindex.co.uk | PEER | no | `des contract 25/26` | **O20** |
| 50 | 38 | practiceindex.co.uk | PEER | no | `pcn des 2026/27` | **O20** |
| 40 | 42 | practiceindex.co.uk | PEER | no | `pcn des 2025/26` | **O20** |
| **40** | **40** | **practiceindex.co.uk** | **PEER** | **no** | **`advice and guidance enhanced service`** | **O23, MINE** |

Eleven distinct keywords. **Ten of them are PCN DES keywords and belong to O20, not to this page.**

**Exactly one row in the entire 39,296-row harvest is O23's**: `advice and guidance enhanced service`,
40 volume, held by practiceindex.co.uk at **position 40**, on
`https://practiceindex.co.uk/gp/blog/is-the-end-nigh-for-enhanced-services/`.

**Peer-winnable volume for this page: 0.** Peer-winnable is defined as deduplicated volume where a peer
holds position <= 20. The single O23 row is held at position 40, so it does not qualify. The two rows
that DO qualify on the position test (`pcn des` at 13, `des gp` at 19, 370 combined volume) are **O20's
and this page may not take them.**

### 3.3 The confirming sweep: the vocabulary genuinely is not there

Because "peer-winnable = 0" is an unusual result, it was re-tested with a deliberately wider and looser
regex, unbounded on `enhanced`:

```sql
select competitor_domain, ranked_keyword, position, search_volume, url
from dataforseo_competitor_data
where site_key='medical'
  and ranked_keyword ~ '\yenhanced\y|\yimmunisation|\yvaccination\y|coil fitting|contraceptiv|\ylmc\y|\yicb\y|integrated care board|practice income|gp practice fund'
order by search_volume desc nulls last limit 60;
-- 36 rows
```

**Not one of the 36 is an enhanced-services income keyword.** Every `enhanced` hit is a homonym from a
different subject entirely:

- `enhanced capital allowances` (8,100), `what is enhanced capital allowance` (170) - capital allowances, johnstoncarmichael.
- `enhanced redundancy pay` / `payments` (480 each) - NHS redundancy, bma.org.uk.
- `what is enhanced maternity pay` (320), `enhanced maternity pay calculator` (170), `enhanced maternity leave` (90), `nhs enhanced maternity pay` (70) - maternity, and O11 to O13's, not this page's.
- `enhanced protection` / `enhanced pension protection` and five further orders (110 each) - lifetime-allowance protection, O2's.
- `enhanced data subject rights` (90) - GDPR, themdu.com.
- `advice and guidance enhanced service` (40) - **the only genuine one, already counted above.**

The `vaccination` rows are all clinical (`flu vaccination pgd`, `consent form for flu vaccination`,
`flu vaccination contraindications`), held by themdu.com, and are **medico-legal and clinical-governance
intent, not income intent**. `covid vaccination payment` / `payments` (90 each, bma.org.uk at 18 and 24)
is the closest near-miss in the whole harvest and it is a historic programme-specific query, not a
durable enhanced-services term. **Zero rows for `local enhanced service`, `locally commissioned`,
`minor surgery`, `phlebotomy`, `near patient testing`, `item of service` or `LES` in any form.**

### 3.4 What that means, and it is the most important sentence in this pack

**This page's subject has essentially no measured Google market.** That is not the same as the subject
having no value, and it must not be reported as either "the topic is dead" or "the topic is a gap we
can take". Three separate things are true and they need holding apart:

1. **The harvest is a Google-position artefact.** Peer-winnable is DataForSEO-derived and DataForSEO
   positions are Google positions (`BATCH3_INDEX.md` §9 limitation 3). Under owner decision 21,
   peer-winnable **orders** the work and **never excludes any of it**. A zero here orders this page last
   on Google-derived priority and removes nothing from its scope.
2. **The absence is partly an absence of publishers, not of searchers.** The harvest covers 44 domains.
   None of them runs an enhanced-services income page, so none of them ranks for enhanced-services income
   vocabulary, so the vocabulary cannot appear in a harvest built from what those domains rank for. This
   is exactly the shape recorded for the opticians and allied-health ABSORB clusters in
   `BATCH2_INDEX.md` §7 and carried into `BATCH3_INDEX.md` §4: **no accountancy vocabulary anywhere in
   the harvest because nobody in the harvested set runs such a page.** The $1.13 seed-and-harvest fix
   priced there is still unauthorised and would settle it. **Do not infer demand from this data in
   either direction.**
3. **Bing says the page is being shown and clicked at position 4.0.** One click and seven impressions is
   tiny, but position 4.0 is not nothing, and on this site Bing sends 3.4x Google's clicks. The channel
   that actually works for this domain has this page near the top of the SERP for something, and the
   named-query endpoint will not say what.

**Consequence for the writer: there is no missing-phrase list derived from market volume, because there
is no market volume to derive it from.** Section 7.1 is therefore built differently, and the difference
is stated there rather than hidden.

### 3.5 Phrasings present in our page, and in the corpus

Measured 2026-08-26 by `grep -ric` over `Medical/web/content/blog/`:

| Phrase | Occurrences on THIS page | Files in corpus |
|---|---|---|
| `enhanced service` | **39** | 34 |
| `local enhanced service` | **9** | 2 |
| `locally commissioned` | **10** | 3 |
| `directed enhanced service` | **9** | 2 |
| `network contract des` | **7** | 29 |
| `minor surgery` | 2 | 3 |
| `phlebotomy` | 2 | 1 |
| `integrated care board` | 3 | 4 |
| `item of service` | **0** | **0** |

**The page is not missing its own vocabulary. It is saturated with it.** This inverts the standard
Medical finding (1,141 of 1,242 market phrasings absent corpus-wide, dossier §1) and it inverts the QOF
exemplar, where 31 of 31 phrasings were absent from the best QOF page on the UK web. **Here the words
are all present and the market that types them has not been measured.** A writer who arrives expecting
to place missing phrases will find nothing to place, and if they invent phrases to place they will
produce keyword-stuffed prose in breach of K6. **Do not.**

Two genuine absences worth noting, neither volume-backed:

- **`item of service`** appears zero times on this page and **zero times in the entire 86-post corpus**.
  It is the standard NHS term for the per-item payment basis this page already describes in plain words
  ("Payment is often per item"). Naming it is free precision of exactly the kind the QOF pack called
  "free precision" for Contractor Population Index. No volume behind it in this harvest.
- **`ICB` spelled out and glossed.** The page uses "Integrated Care Board (ICB)" correctly on first use,
  so this is already compliant, but see section 6 on the **CCG-to-ICB transition**, which is the single
  most useful thing the competitor evidence surfaces.

---

## 4. Competitor teardown

**Real fetches, all made 2026-08-26 with `curl -A "Mozilla/5.0"`.** `WebFetch` returns 403 where curl
returns 200 on this niche, established in `BATCH2_INDEX.md` §10B. **Both fetches returned HTTP 200 and
neither is dropped.** The candidate set is small because section 3 found it small: only two URLs in the
whole harvest carry enhanced-services vocabulary at all, and one of them is O20's page.

### 4.1 practiceindex.co.uk, "Is the end nigh for enhanced services? You share your views"

`https://practiceindex.co.uk/gp/blog/is-the-end-nigh-for-enhanced-services/`
**Class: PEER** (universe §2a #6). **HTTP 200, 189,940 bytes.**
**This is the ONLY page in the entire competitor universe that ranks for an enhanced-services term.**

| | |
|---|---|
| Title / H1 | `Is the end nigh for enhanced services? You share your views` |
| **Published** | **25 August 2016** |
| Word count | ~1,188 including chrome |
| Content H2/H3 | **None.** The only headings on the page are `Cookie Preferences`, the duplicated H1, and site chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`). The body's own sub-sections (`The struggle`, `Threats to practices`, `Positive news`) are **bold paragraph text, not headings**. |
| Tables | No |
| Calculator | No |
| FAQ block | No |
| Holds | `advice and guidance enhanced service`, 40 volume, **position 40** |

**Covers:** a 2016 opinion piece quoting anonymous practice managers on CCG deficits and enhanced-service
decommissioning. Names, verbatim on the page, the services then under threat: **near-patient testing,
phlebotomy, care home advanced schemes and practice-based counselling**. Describes NHS England opening a
flu and pertussis DES to hospital trusts at "the same tariff price as GP practices receive (£9.80)", and
records local enhanced services being taken over by local councils with devolved powers.

**Structure:** none. Zero content headings in 1,188 words, and it still holds the term.

**What it gets wrong or omits, and the list is nearly total:** it has **no accounting and no tax
whatsoever**. No profit share, no accruals, no VAT, no pensionability, no costing framework, no
decision lens. It is a sentiment piece, not guidance.

**And it is a decade stale in a way that matters more than its age.** It is written entirely around
**CCGs**, which were **abolished on 1 July 2022 and replaced by Integrated Care Boards**. It cites the
**GP Forward View** (2016) and an "unplanned admissions service" removal proposed "from April 2017".
Every commissioning noun on the page is defunct. **The £9.80 tariff figure is 2016 and must never be
copied.**

**Consequence for us.** The only competitor page on this subject anywhere in the peer set is a
ten-year-old comment thread about abolished organisations, with no headings, no money and no tax,
ranking at position 40. That is the whole competitive picture for O23 and it is recorded here as
measured rather than asserted.

### 4.2 bhp.co.uk, "The Primary Care Network Directed Enhanced Service (PCN DES) Changes"

`https://bhp.co.uk/news-events/blog/the-primary-care-network-directed-enhanced-service-pcn-des-changes/`
**Class: PEER** (universe §2a #15, regional generalist with a healthcare team). **HTTP 200, 194,192 bytes.**
**Fetched as BOUNDARY EVIDENCE, not as a competitor for this page.** It holds seven of the eleven
keywords in section 3.2 and every one of them is O20's.

| | |
|---|---|
| Title / H1 | `The Primary Care Network Directed Enhanced Service (PCN DES) Changes` |
| Word count | ~977 |
| H3 | `What Has Changed?`; `Why This Matters`; `Are Single Neighbourhoods Now Being Delivered Through the DES?`; `How does this impact GP practice finances?`; `Are PCNs Organised for This Next Phase?`; `Practical Actions to Consider Now`; then chrome (`Our insights to your inbox`) |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the 2026/27 changes to the Network Contract DES from an accountant's chair, single
neighbourhood delivery, and the practice-finance consequence.

**Why it is in this pack at all.** It is the concrete demonstration of the O20/O23 abutment discussed in
section 5.3: **an accountant writing about "directed enhanced services" writes entirely about the PCN
DES**, because that is where the money and the search volume are. Its H3 `How does this impact GP
practice finances?` is the exact question this page answers for the *other* enhanced services, and
BHP does not answer it for them.

**Do not take anything from this page.** It is O20's evidence and the PCN pack has already read it.
`PACK_B3_blog__pcn-funding-network-contract-des-explained.md` line 543 records a hard-fail figure on it
(a "30% of total revenue" claim with no named source, breaching F6 and I6). **Named here so this pack's
writer does not encounter that figure fresh and reuse it.**

### 4.3 Union of competitor heading themes minus ours = the coverage checklist

§9.9 floor 8 requires **zero undecided themes**. The competitor set yields few themes because it is two
pages, one of which is another page's. **9 themes, 9 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **CCGs are gone and ICBs commission LES now** (4.1, implicitly, by being wrong) | **COVER** | The single highest-value thing in the teardown. See section 5.1. Our page already says ICB correctly; the *transition* is the coverage gap. |
| 2 | **Enhanced services can be decommissioned, and the practice carries that risk** (4.1) | **COVER** | Section 5.2. Genuinely absent from our page and directly an accounting and planning point. |
| 3 | Named LES examples: near-patient testing, phlebotomy, practice-based counselling, care home schemes (4.1) | COVERED ALREADY, one addition | Our page names phlebotomy, near-patient testing, minor surgery, coil and implant fittings, ambulatory BP monitoring, mental-health and substance-misuse work, wound care. **`care home` schemes and `practice-based counselling` are the two 4.1 names we lack.** Add inside an existing-adjacent NEW block only, never by editing the existing list. |
| 4 | A named per-item tariff figure, `£9.80` (4.1) | **DECLINE, hard** | 2016 figure, superseded, service-specific, and not in house positions. Copying it would breach F1, F4 and F7 simultaneously. Declined with reason. |
| 5 | Competition from hospital trusts and councils for enhanced-service delivery (4.1) | **COVER, briefly** | One paragraph. It is a real commercial fact about this income stream and nobody frames it as an income-security question. |
| 6 | Alternative and neighbourhood providers, single neighbourhoods (4.2) | **ELSEWHERE, O20** | PCN DES delivery architecture. Link only. |
| 7 | `How does this impact GP practice finances?` framed on the PCN DES (4.2) | **ELSEWHERE, O20** | This is the abutment. See section 5.3. |
| 8 | 2026/27 contract-round changes to the DES envelope (4.2) | **ELSEWHERE, O20 and O19** | The settlement figures (£485m, £13,863m, 3.6%) are O19's contract-round material. **Not this page's.** |
| 9 | Practice-manager sentiment and anonymous quotes (4.1) | **DECLINE** | I4 permits anonymised social proof but not invented or borrowed testimony, and F6 bans quantified generalisation. We do not have practice managers to quote and must not imply we do. Declined with reason. |

---

## 5. Whitespace

What nobody in the peer set covers, quotably.

### 5.1 The commissioning body changed and the market's only page still says CCG

**The one page on the UK web that ranks for an enhanced-services term is written entirely about CCGs.**
CCGs were abolished on 1 July 2022 and replaced by Integrated Care Boards. Every commissioning noun on
practiceindex's page (CCG, GP Forward View, the 2017 unplanned admissions proposal) is defunct.

Our page is already correct: it says ICB throughout, and glosses it on first use. **The whitespace is not
being right, it is saying so.** A reader or a practice manager who searched this in the last decade has
most likely landed on a page framed around a body that no longer exists, and nothing in the market tells
them the framework moved. One short block that says who commissions a local enhanced service **now**,
and that guidance written before mid-2022 refers to a body that no longer commissions anything, is
genuinely useful, genuinely current, and held by nobody.

It is also the **safest** possible addition on a page with this equity profile: it adds currency without
adding a figure, and it cannot go stale in the direction the market's page went stale.

### 5.2 Nobody treats enhanced-services income as income that can be withdrawn

practiceindex's page is *about* decommissioning and never reaches the accounting consequence. Our page
covers the sign-up decision thoroughly (marginal cost, capacity, set-up cost, pensionability) and is
**entirely silent on the exit**: what happens when a commissioner withdraws a service the practice has
built a team and a room around, how a practice should think about the recoverability of set-up cost over
an uncertain commissioning horizon, and why a locally negotiated service is structurally less secure
income than the Global Sum.

That is the accountant's half of the question the only competitor page asks and cannot answer. It needs
no figure, it traces to nothing that could go stale, and it is the natural completion of the decision
lens already on the page. **This is the strongest whitespace finding in this pack.**

### 5.3 The abutment: where O20 ends and O23 begins, drawn explicitly

**The tension is real. The Network Contract DES IS a directed enhanced service.** O20 owns it and O23
owns directed enhanced services as a family, so the two rows touch on their most prominent single
instance. Left undrawn, either page could reasonably write the same thousand words.

**Where I draw the line, and I am drawing it as O23's owner:**

| | O23, this page | O20, `/blog/pcn-funding-network-contract-des-explained` |
|---|---|---|
| **Owns** | The **taxonomy and the contracting layer**: what makes a service "enhanced", how DES, LES and national enhanced services differ as commissioning instruments, who directs and who commissions each, how the practice contracts for and invoices them, and how the resulting income is recognised, taxed and shown in the accounts. | The **Network Contract DES as a funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. |
| **The test** | Is this a statement about the *class* of enhanced services and how a practice contracts, invoices and books them? | Is this a statement about the *PCN's* money, its strands, or how it reaches member practices? |
| **The Network Contract DES itself** | **Named as one example of a DES, and handed off.** One sentence, then link. | **Explained in full.** |

**The clean formulation, and it is the line I would defend:** this page may say **that** the Network
Contract DES is a DES, because that fact is a fact about the taxonomy, which is O23's. It may not say
**what the Network Contract DES pays for**, because that is a fact about the envelope, which is O20's.

**I believe the line is drawn in the right place** and I am not proposing to move it. The PCN pack has
independently reached the same boundary from the other side: line 183 of
`PACK_B3_blog__pcn-funding-network-contract-des-explained.md` reads *"Enhanced services: one sentence,
then link. DES against LES is O23's."* **Two writers converging on the same boundary independently is
the condition under which batch 2's O7 split was ratified**, and it is recorded here for the same
reason. See section 9 for the one wording problem this raises on the existing page.

### 5.4 KEEP, explicitly

Per §9.3 and K1, the specialist layer is never traded away and **no net deletion of specialist content
is permitted**. These are this page's differentiators and stay exactly as they are:

- **The DES-versus-LES distinction done properly**, with "nationally specified, must be offered to all
  practices in England, practice chooses" against "locally commissioned by the ICB, scope and fee vary".
  Correct, and clearer than anything in the market. **KEEP.**
- **The payment-basis risk analysis**: per item tracks activity but needs volume; block gives income
  certainty and puts volume risk on the practice. Genuinely expert, entirely unique, and not present on
  any competitor page. **KEEP.**
- **The full-delivery-cost argument** (the minor-surgery example: not just the clinician, but the
  assisting nurse, consumables, sterilisation, room opportunity cost, booking and recall admin). **KEEP.**
- **The four-way comparison** of core Global Sum, QOF, DES and LES, and the argument that collapsing them
  into one income line destroys the partners' ability to decide. **KEEP.**
- **The tax treatment**: ordinary trading income, profit-sharing agreement, profit share, Class 4 NIC,
  SA800 and SA104, no separate regime, taxed when earned, delivery costs deductible, so the practice is
  taxed on the net contribution. Aligned with `house_positions.md` §1 and §8. **KEEP.**
- **The accruals point** for services delivered in one period and paid in the next. **KEEP.**
- **The pension line**: NHS-commissioned work feeding partnership profit is pensionable for a Type 1
  practitioner via the Annual Certificate of Pensionable Profits; company income is not NHS-pensionable
  because a company cannot hold a GMS or PMS contract. Aligned with §2.C. **KEEP.**
- **The refusal to publish a fixed LES menu or a tariff.** The page says repeatedly that the DES roster
  and LES arrangements change and that the current local specification is the thing to check. That is the
  house position and it is exactly what kept the competitor's £9.80 off our page. **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/enhanced-services-gp-practice-income-tax.md`, read in full 2026-08-26.

| | |
|---|---|
| Word count | **4,334** (`wc -w` on the source file, includes frontmatter) |
| `metaTitle` | `Enhanced Services Income for GPs: DES, LES & the Tax` (51 characters) |
| `h1` | `Enhanced and Locally Commissioned Services: Extra GP Practice Income and How It Is Taxed` |
| `title` | `Enhanced Services Income for GP Practices: DES, LES and the Tax` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| FAQ entries | **14** |
| Key takeaways | 5 |
| Tables | **None** |
| Calculator | None |
| Em-dashes | **0** (verified; must stay 0) |
| Rendering | Markdown file whose body is raw HTML. Write new blocks as raw HTML to match. |

### Current heading list, in order

- H2 `Where enhanced services sit in GP funding`
- H2 `Directed Enhanced Services (DES)`
  - H3 `What a DES is`
  - H3 `Examples`
  - H3 `The Network Contract DES (named once)`
- H2 `Local Enhanced Services / Locally Commissioned Services (LES / LCS)`
  - H3 `What a LES is`
  - H3 `Examples`
  - H3 `How a LES is priced and paid`
- H2 `DES versus LES versus QOF versus core (a clear comparison)`
- H2 `How enhanced-services income is taxed`
  - H3 `Timing and accruals`
- H2 `The VAT line on enhanced and private-feeling services`
- H2 `Should the practice sign up? (a decision lens, not advice)`
- H2 `How we help GP practices`

### Blunt read

**This is a good page with a saturated vocabulary and an unmeasured market, and it has one live
ownership problem in its own copy.** That combination is the opposite of the QOF exemplar's shape and
the pack has to be honest about it: there is very little to add here on evidence, and the temptation to
add anyway is the main risk.

**What is good.** The taxonomy is correct and clearly written. The payment-basis risk analysis and the
full-delivery-cost argument are genuinely expert. The tax section is accurate against house positions
§1 and §8. The pension line is accurate against §2.C. The VAT section is accurate against §6 and, in
particular, correctly states the harder half of the rule: that the £90,000 threshold counts **taxable
(non-exempt) turnover only**, so exempt NHS income does not push a practice towards registration. Not
one competitor page in the set contains any of this.

**What is stale against house positions: nothing.** Checked line by line against §1 (partner taxed on
profit share, SA800/SA104), §8 (Class 4 NIC), §2.C (Type 1 Annual Certificate, a company cannot hold a
GMS/PMS contract, company income not pensionable), §3 (GMS/PMS/APMS, Global Sum, Carr-Hill, QOF,
enhanced services, PCN/Network Contract DES, and never UDAs), §6 (Sch 9 Group 7 exemption,
principal-purpose test, cosmetic and third-party-report watch-items, threshold counts non-exempt
turnover). **No contradiction found and no stale year tag, because the page correctly states no figures
at all.** It contains no £ amount, no percentage and no tax-year tag anywhere, which is why F1 and F5
are trivially satisfied and why there is nothing to de-stale.

**What is thin.** Only two things, both in section 5: the CCG-to-ICB transition is unstated, and the
withdrawal or decommissioning side of the income is entirely absent. **`item of service` is absent as a
term** and the concept is present in plain words.

### Checked against the CURRENT rules, including V2

Per the V2 enforcement note, this page (dated 2026-06-03) is checked against the rules as they stand
**today**, not the rules that existed when it was written.

| Rule | Result |
|---|---|
| **V2** (never narrate keyword research to the reader) | **PASS on the letter, but see defect P1.** There is no "also searched as" table cell and no search-string list. The page does not tell the reader that two searches mean the same thing. |
| **V1** (two word orders per idea per page, non-overlapping longest matches) | **Needs a QA count, and it is the likeliest finding on this page.** The H2 `Local Enhanced Services / Locally Commissioned Services (LES / LCS)` places, in one heading, four orders of one idea: `Local Enhanced Services`, `Locally Commissioned Services`, `LES`, `LCS`. **Any V1 finding must quote the spans it counted** and must count non-overlapping longest matches, never raw substrings. **The H2 is frozen by K2 and cannot be fixed by this pass.** Flagged, not resolved. |
| **I1** (no em-dashes) | **PASS**, 0 occurrences. |
| **I2, I3, I4, I5, I7** | **PASS.** No byline beyond the editorial-team string, no advice verbs, no named clients, no pricing, no new interruptive UI. |
| **F5 / F6 / I6** (UNVERIFIED figures, fabricated statistics) | **PASS.** The page contains no figures of any kind. Zero risk. |
| **G1** (one worked example where the topic involves a calculation) | **Absent.** The topic is arguably a costing topic. See section 7.3: **not required and not recommended**, because there is no verified fee to build one on and an illustrative-input example on a page with no other figures would be the only number on the page. |
| **L2** (deep guide 2,000 to 3,200 words) | **Over band at 4,334 including frontmatter.** Per L3 and V8, **length is not a lever and the miss is reported, not corrected.** The page must not be padded and must not be trimmed. New blocks push it further over and that is accepted. |
| **B4** (50% to 75% question-form H2s) | **0 of 8 question-form.** Unreachable under K2, which freezes the H2 sequence. Per coordinator ruling 2 this is a consequence of the grade, not a defect. New H2s may be question-form and should be. |
| **H1** (4 to 8 FAQs) | **14.** Per coordinator ruling 1 these are existing substantive entries and are never deleted to hit a band. |
| **K1** (no net deletion of specialist content) | Satisfied by construction: the change is additive only. |

### Defects found in the live page, and none is this writer's to fix

**P1. The H3 `The Network Contract DES (named once)` narrates our editorial rule to the reader.**
"(named once)" is not information about enhanced services. It is a note to ourselves about an ownership
constraint, published in a heading. It is the same *class* of leak as V2's "also searched as" and as
J2's pipeline-artefact leakage, even though it matches neither string test. A reader has no idea what
"named once" means or why it would matter to them. **The H3 is frozen by K2 and this writer must not
touch it.** Escalated to the manager, not resolved here.

**P1b, and it is the sharper half.** The heading claims the Network Contract DES is named once. **It is
named seven times on the page** (`grep -c`): in the DES `Examples` paragraph, in the H3 itself, in the
paragraph under it, in the comparison-section clarification paragraph, and in two FAQs
(`What is a Directed Enhanced Service (DES)?` and `Is the Network Contract DES an enhanced service?`).
The heading is not merely odd, **it is inaccurate about its own page**. Three of those seven are pure
handoff sentences and are correct under O20. The concentration is not currently an O20 breach in
substance, because none of them explains what the DES pays for, but it is the **maximum tolerable** and
**this pack sets the new-Network-Contract-DES-mention allowance to ZERO** (section 7.2).

**P2. Two H3s carry the identical string `Examples`.** One under `Directed Enhanced Services (DES)` and
one under `Local Enhanced Services / Locally Commissioned Services (LES / LCS)`. Both breach B2 (no
abstract headings; every H2/H3 should carry a market phrase or open with a question word), and a
duplicated heading string is a structural smell in its own right. **Both are frozen by K2.** Flagged.

**P3. Two H2s carry parenthetical editorial asides**: `(a clear comparison)` and
`(a decision lens, not advice)`. The second is a disclaimer in a heading. Both breach B2. **Frozen by
K2.** Flagged. New H2s must not copy the habit.

**P4, and this one is a genuine near-miss on an ownership fence.** The `Where enhanced services sit in
GP funding` H2 names the Global Sum and QOF and links both to their owners, which is correct under O19
and O25. But the O19 handoff runs to **two sentences plus a bracketed gloss** ("the core per-weighted-patient
payment, explained in..."), and the O25 handoff similarly. Both are within the "one sentence and a link"
allowance in spirit and neither states a figure, so **neither is a breach**. Recorded because it is the
exact place a future writer would add a third sentence, and because it is one clause away from being
O19's explanation. **The new blocks add nothing here.**

---

## 7. Deterministic acceptance criteria

**Read section 2.4 before applying these.** This page has 1 Bing click, 7 page-level impressions, zero
named Bing queries and zero Google rows. **There is no traffic baseline to test against and no
do-not-lose query list to write.** Section 3 found peer-winnable volume of **0** and a market keyword
set of **one row held at position 40**.

**So 7.1 is a coverage test, not a traffic test, and this is stated before the work rather than
discovered after it.** Every criterion below is countable on the day the page ships, by a QA agent, with
no judgement.

### 7.1 The named coverage list the 14/28-day read will be measured on

**Not derived from market volume, because there is none.** Derived from the section 4 teardown and the
section 5 whitespace, which is the only evidence this topic has. Each item names what must be present
and what makes it countable.

| # | Must be present | Countable test | Source |
|---|---|---|---|
| 1 | `Integrated Care Board` **and** `ICB` **and** `clinical commissioning group` **and** `CCG`, with the abolition and replacement stated | All four strings present; `CCG` and `Integrated Care Board` within 60 words of each other at least once | 5.1, 4.1 |
| 2 | The date the commissioning body changed, stated as a date | The string `2022` present within 40 words of `Integrated Care Board` or `CCG` | 5.1 |
| 3 | `decommission` or `decommissioned` or `withdrawn` applied to an enhanced service | String present, in a new block, with the accounting consequence in the same block | 5.2, 4.1 |
| 4 | `item of service` | String present at least once. **Currently 0 on this page and 0 in the whole 86-post corpus.** | 3.5 |
| 5 | `care home` as a named LES example | String present | 4.3 theme 3 |
| 6 | `counselling` as a named LES example | String present | 4.3 theme 3 |
| 7 | The recoverability of set-up cost against an uncertain commissioning horizon | A new block containing `set-up cost` or `set up cost` **and** one of `horizon`, `uncertain`, `withdrawn`, `decommission` | 5.2 |
| 8 | Alternative providers (trusts, councils) competing for enhanced-service delivery | One paragraph containing at least two of `trust`, `council`, `alternative provider` | 4.3 theme 5 |
| 9 | `advice and guidance` | String present. The single market phrase this topic actually holds anywhere. Place as natural English inside the ICB or examples material, never as a heading built to hold it (K6). | 3.2 |

**Countable test: 9 of 9 present. Any absent item is a named BLOCK.**

**Item 9 carries a warning.** It is 40 volume held at position 40 by the only page in the market. It is
worth placing **only if it can be placed as natural English**. Per **V2**, if a phrasing cannot be
placed as natural prose it does not go on the page and the writer reports it as unplaced. **Reporting it
unplaced is a PASS on item 9, not a failure.** Nine of nine with item 9 reported unplaced and reasoned is
an acceptable outcome. Manufacturing a section to hold a 40-volume phrase is a **K6 fail** and is worse
than the miss.

### 7.2 Ownership containment, and this is the hardest gate on this page

Wave A's five funding pages read as one topic to a careless writer, and O23 abuts O20 on the Network
Contract DES (section 5.3). These are counted, not judged.

| Gate | Test | Pass condition |
|---|---|---|
| **New mentions of the Network Contract DES** | Count occurrences of `Network Contract DES` before and after | **Exactly equal. Allowance = ZERO new mentions.** The existing 7 stay (K2 freezes them); not one more is added. |
| **PCN funding explanation** | Search the NEW blocks for `core PCN funding`, `extended access`, `enhanced access`, `capacity`, `PCN funding envelope`, `member practice` | **0 hits in new blocks.** All are O20's. |
| **ARRS** | Search the whole page for `ARRS`, `Additional Roles` | **0 on the page, before and after.** O21's, and this page has never carried it. Keep it that way. |
| **Clinical director** | Search for `clinical director` | **0 on the page.** O22's. |
| **Global Sum figure** | Search for a `£` or numeric within 30 words of `Global Sum` or `weighted patient` | **0 hits.** See the O10 ruling block in section 10: the figure is VERIFIED, and it is still O19's. |
| **QOF point value** | Search for a `£` or numeric within 30 words of `QOF point` | **0 hits.** Same reasoning. O25's. |
| **Carr-Hill** | Search for `Carr-Hill`, `London Adjustment`, `weighting` | **0 on the page.** O19's. |
| **Contract types** | Search the NEW blocks for `PMS`, `APMS`, `GMS contract`, `contract type` | **0 in new blocks.** O19's, including NO-PAGE corrected order 12. |
| **Dispensing** | Search for `dispensing`, `dispensed`, `Drug Tariff` | **0 on the page.** O24's, and wave A permits no other page to mention dispensing income at all. |
| **VAT exemption explanation** | Count sentences in NEW blocks explaining the Sch 9 Group 7 exemption or the principal-purpose test | **0 new sentences.** O17's, owned by the FROZEN `gp-vat-registration` and by the batch-1 `gp-practice-private-non-nhs-income-streams`. The existing VAT H2 stays exactly as it is. |
| **PCSE reconciliation** | Count sentences in NEW blocks on how income is recognised against the PCSE statement | **At most 1, plus a link.** O26's. Five pages describing income recognition five times is the batch-1 failure. |
| **SFE parental-leave reimbursement** | Search for `parental leave`, `maternity`, `paternity` | **0 on the page.** O13's. This is a real collision (O13's own note says so) and the answer here is silence, not a sentence. |
| **Scheme Pays deadline** | Search for `Scheme Pays`, `31 July` | **0 on the page.** O4. **This is the exact fact that broke batch 1** and it appears on no batch-3 page at any date. |

**Countable test: every row above passes. Any single failure is a named BLOCK.**

### 7.3 EXTEND byte-identity

Diff the pre and post files. The following must be **byte-identical**:

- `metaTitle: "Enhanced Services Income for GPs: DES, LES & the Tax"`
- `h1: "Enhanced and Locally Commissioned Services: Extra GP Practice Income and How It Is Taxed"`
- `title: "Enhanced Services Income for GP Practices: DES, LES and the Tax"`
- `metaDescription`, `slug`, `canonical`, `category`, `date`, `generator`, `author`, `image`,
  `imageCredit` (all four sub-keys), `altText`, `schema`, `summary`
- All **8** existing H2 strings, in their existing relative order
- All **7** existing H3 strings (including both instances of `Examples`)
- All **14** existing FAQ question and answer strings
- All **5** existing `keyTakeaways` strings

**Countable test: `git diff` shows ONLY additions. Deletion count must be exactly 0.**

There is **no escalated exception on this page.** Unlike the QOF exemplar, which had two stale-framed
year sentences creating a real conflict between K2 and the de-stale duty, **this page contains no figure
and no year tag anywhere**, so nothing is stale and nothing needs a factual-currency exception.
Coordinator ruling 3 (factual corrections inside frozen copy are required, not merely permitted) has
nothing to bite on here. **Deletion count 0, no exceptions, no discussion.**

### 7.4 Figures: the ban list, and why this page should stay at zero figures

The existing page asserts **no figure of any kind**. That is unusual and it is correct for this subject,
because the subject's defining property is that fees are locally negotiated and the roster changes.

**BANNED. None of these may be asserted on this page:**

| Banned | Why | What the page says instead |
|---|---|---|
| Any **Global Sum per weighted patient** figure | **O19 owns it.** `house_positions.md` §3.A verifies £130.07 for 2026/27, and verification is not permission. See the O10 ruling in section 10. | Name core funding, then link to the GMS page. |
| Any **QOF point value** | **O25 owns it.** §3.B verifies £227.95 for 2026/27. Same reasoning. | Name QOF, then link. |
| Any **GMC annual retention fee** | `house_positions.md` §8: **UNVERIFIED**, GMC returns HTTP 403 to automated fetch. O9. The one item whose F5 ban still stands. | Not applicable to this page; listed for completeness of the ban. |
| **`£9.80`**, or any per-item tariff | practiceindex 2016 (4.1). Ten years old, service-specific, superseded, in no primary source and in no house position. | "the fee is set in the current local specification". |
| Any **LES fee, tariff or fee range** | Locally negotiated by definition. Publishing one implies a national rate that does not exist. | Already correct on the page: check the current local specification. |
| Any **proportion of practice income** from enhanced services | BHP's "30% of total revenue" (4.2) is a percentage with no named source, on one competitor page and in no primary source. **F6 and I6, hard fail.** Named here so it is not encountered fresh and reused. | Say the stream is material and directly influenceable. State no proportion. |
| Any **count of DES schemes** in a year | The roster changes annually and the page's own thesis is that it should not be treated as a fixed list. | Already correct: "the DES roster changes year to year". |

**Countable test: count of banned-figure assertions = 0. Count of £ symbols on the page = 0, before and
after.**

**G1 and the worked example: not required, and recommended against.** G1 requires exactly one worked
example on a page whose topic involves a calculation, a threshold, a taper or a band. This page's topic
is a **decision framework with no national rate**: there is no threshold, no taper and no band, and the
only arithmetic available would be a marginal-cost comparison built entirely on invented inputs. G5
requires every rate used to trace to house positions and there is no rate to trace. An illustrative
example would introduce the **only** numbers on a page that currently has none, and would sit oddly
against the page's own correct insistence that the fee is local. **Declined with reason, recorded here
so the decline is deliberate rather than an omission.** If a later pass disagrees, G3's five components
and G6's naming ban both apply and the inputs must be explicitly labelled illustrative.

### 7.5 Statute, regulation and source re-verification

Every external factual claim in the NEW blocks maps to a row here with a fetch date.

| Claim | Source to re-verify |
|---|---|
| CCGs abolished and replaced by Integrated Care Boards on 1 July 2022 | **Health and Care Act 2022** https://www.legislation.gov.uk/ukpga/2022/31/contents (s.25 and Sch 2, establishment of integrated care boards; abolition of clinical commissioning groups) plus NHS England's ICB guidance. **Verify the commencement date at source before stating it.** |
| ICBs commission local enhanced services, often after consulting the LMC | NHS England primary care commissioning guidance; the current GP contract long-read https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ |
| Enhanced services sit outside the core contract and are separately commissioned | `house_positions.md` §3, and the **GMS Statement of Financial Entitlements Directions 2026** https://assets.publishing.service.gov.uk/media/69cbe5032d120d9d5ec0f352/general-medical-services-statement-of-financial-entitlements-directions-2026.pdf |
| The contract-type framework (GMS, PMS, APMS) exists | `house_positions.md` §3. **One sentence only, then link to O19's page.** |
| Enhanced-services income is partnership trading income, taxed on profit share with Class 4 NIC via SA800 and SA104 | `house_positions.md` §1 and §8; ITTOIA 2005 and TMA 1970 machinery per §1 statutory hooks; https://www.gov.uk/self-employed-national-insurance-rates |
| NHS-commissioned medical care is exempt or outside scope; the principal-purpose test; the threshold counts non-exempt turnover | `house_positions.md` §6; VATA 1994 Sch 9 Group 7 https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 ; HMRC VATHLT2010 https://www.gov.uk/hmrc-internal-manuals/vat-health/vathlt2010 . **Existing copy only. No new explanation, O17.** |
| A company cannot hold a GMS or PMS contract; company income is not NHS-pensionable; Type 1 Annual Certificate | `house_positions.md` §2.C; PCSE https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate |
| `advice and guidance` is a current enhanced service | NHS England advice and guidance guidance, and the current SFE / contract long-read. **Verify before stating; the competitor page carrying this term is from 2016.** |

**Countable test: every external factual claim in the new blocks maps to a row above with a fetch date.
Count of unverified claims = 0.**

> **The standing method rule applies to every row above that cites a Directions or Regulations.**
> `house_positions.md` records it in terms: **a Directions or Regulations citation must be checked for
> AMENDING INSTRUMENTS before any figure taken from it is locked.** Reading the principal instrument is
> not verification. The incident that produced the rule is on the record: two SFE parental-leave rates
> were locked at £1,475.17 and £2,238.03, read correctly and verbatim out of the principal Directions,
> and both were already superseded by the (Amendment) Directions 2026 to £1,526.80 and £2,316.37. A
> wrong figure went into ground truth with a correct-looking primary-source citation attached and pages
> were written from it the same day. **This page states no figure at all, so the rule cannot bite here,
> which is a further argument for keeping it at zero figures.**

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `python scripts/track2_query_coverage.py --slug enhanced-services-gp-practice-income-tax --json` | **0 covered queries lost.** The gate bar is trivially met: the covered set is empty (section 2). Run it anyway, so the zero is on the record as measured rather than assumed. |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | **Empty array.** No worked example, no figures (7.4). |
| 3. Statute verified at source | `statute_checks[]` | Every row in 7.5 fetched and content-verified, with the amending-instrument check where a Directions is cited |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; new links resolve via `slug_resolver.py`. **See below.** |
| 5. Equity preservation | 7.2 and section 2 | 0 of 0 queries. Satisfied by construction; the additive-only rule is what guarantees it. |
| 6. Cluster coverage | 7.1 | **9 of 9** items placed, with item 9 permitted as reported-unplaced |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is prescribed onto this page.** Corrected order 12 (GMS/APMS) goes to O19's page, not here. The ledger does not move for this page and **must not be adjusted for it.** |
| 8. Competitor re-read | 4.3 | **9 themes, 9 decisions, 0 undecided** |

**Floor 4 carries a live risk on this page.** The existing body links to `/blog/gp-practice-management`,
`/blog/gp-partnership-tax-complete-guide`, `/blog/gp-tax-deductions-complete-list-2026`,
`/blog/gp-accounting-guide`, `/blog/gp-vat-registration`, `/blog/gp-financial-planning`,
`/blog/gp-pension-contributions-tax-relief`, `/for-gps` and `/contact`. **Six of those are on the frozen
list** (`gp-partnership-tax-complete-guide`, `gp-tax-deductions-complete-list-2026`, `gp-accounting-guide`,
`gp-vat-registration`, `gp-pension-contributions-tax-relief`, and `gp-accounting-guide` is additionally
`status='flagged'`). **Linking to a frozen page's live URL is fine; editing one is not.** Two further
points for the link audit:

- `/blog/gp-practice-management` and `/blog/gp-tax-and-accounts` are **category hubs**, and
  `BATCH3_INDEX.md` §3.3 says leave `gp-tax-and-accounts` alone. Existing links to hubs stay; **no new
  link from this page to any category hub.**
- **Coordinator ruling 5:** a calculator's file name does not predict its route. If a new block links a
  calculator, resolve it by reading the `slug` field in `Medical/web/src/lib/tools/configs/*.ts` or by
  requesting the URL, never by matching a filename. One writer wrongly reported a dead link this way on
  2026-08-26.

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere, including frontmatter. Currently 0. Must stay 0.
2. **No new internal link inside any existing paragraph.**
3. **No new figure of any kind.** Count of `£` on the page = 0, before and after (7.4).
4. **No collapse, no redirect, no URL change** (K4).
5. **Never use UDAs, dental bands or any dental framing.** `house_positions.md` §3: doctors do not use
   UDAs, and this site is unusually close to the Dentists site, which is exactly why the framing leaks.
6. **Never state that enhanced services are compulsory.** They are voluntary for the practice, on both
   the DES and LES side, and the existing page is correct and emphatic about this.
7. **Never present a DES or LES list as fixed or national.** The page's own thesis, and the house
   position.
8. **Do not narrate the ownership map to the reader.** No new heading or sentence may explain what this
   page does or does not cover, or why. See defect P1: the page already does this once, in a frozen
   heading, and the new blocks must not add a second instance.
9. **V9 and the batch-level shape check.** The two named-and-burned constructions are `it is not X, it is
   Y` (cap once per page, wave-wide) and the **numeral-count paragraph opener** ("Two rules that...",
   "Three things account for..."), cap once per page and **prefer zero**. V9 is explicit that banning a
   tic produces a replacement tic, so the standing instruction is the **shape** check, not a phrase ban:
   any single sentence-opening or clause shape appearing more than twice on this page is named in the
   wave's fix pass, whatever it is. **This is the conductor's job across wave A, not this writer's**, and
   it is invisible from inside one page. The writer's duty is only to avoid the two named ones.
10. **V9 corollary, and batch 3 is the third batch.** Five of seven batch-2 pages opened with a corrective
    clause in the first two sentences. It was below cap and arguably correct on a corpus whose whole
    differentiation is that the market is wrong. **A third batch showing the same reflex should be varied
    deliberately, and wave A's conductor decides the variation and states it in the fix pass.**

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### The baseline, restated so a later read cannot drift

| Metric | Value | Endpoint and window |
|---|---|---|
| Google clicks | **0** | GSC `searchanalytics.query`, dims `["page"]`, 2026-05-25 to 2026-08-23 |
| Google impressions | **0** | same |
| Google query rows | **0** | GSC, dims `["page","query"]`, same window |
| Bing clicks | **1** | `GetPageStats` **page level**, snapshots 2026-05-29 to 2026-08-21 |
| Bing impressions | **7** | same |
| Bing avg impression position | **4.0** | same |
| Bing named-query rows | **0** | `GetPageQueryStats`, full `https://www.` URL |

Pro-rated to 28 days: **0.31 clicks** and **2.2 page-level impressions**. That is the honest number and
it is the reason section 7 is a coverage test.

### The read at 14 to 28 days

1. **Coverage, and this is the primary test.** All **9 items** in section 7.1 present in the shipped
   file, verified by string search on the day it ships. Item 9 may be reported unplaced with a reason.
   **This is checkable immediately and does not wait for a search engine.**
2. **Ownership containment, and this is the co-primary test.** Every row of section 7.2 passing.
   **A single failure here is worth more than any traffic outcome**, because the failure this whole index
   exists to prevent is an ownership one, not a ranking one.
3. **Position hold, and it is the only equity number worth watching.** `GetPageStats` average impression
   position for this URL **still 10.0 or better** at 28 days. Today it is 4.0. This is the number the
   §2.4 ruling used to grade the page EXTEND, so it is the number that tests whether the ruling was
   right.
4. **Named-phrase impressions, recorded but NOT a gate.** Any `GetPageQueryStats` row at all for this URL
   would be new information, because today there are none. **Target: at least 1 named-query row by day 28.**
   Recorded as an observation, not a pass condition, because a single row on a page with seven
   impressions is within noise in both directions.

### What is explicitly NOT a test, and why it is written down

- **Bing clicks are not a test.** The baseline is 1. A move to 0 or to 2 is a 100% swing and means
  nothing. Any read that reports "clicks doubled" or "clicks fell to zero" on this URL is reporting noise
  and must be told so.
- **Google is not a test, at any horizon.** Google indexes roughly 21 of 138 URLs on this domain. A page
  not being indexed at 28 days carries no information. `BATCH3_INDEX.md` §8 sets no Google expectation for
  any wave deliberately, and this page is the clearest case for that decision in the batch.
- **Total traffic rising while the section 7.1 items stay absent is a FAIL, not a pass**, per §9.6
  point 2, and is recorded as **drift**.

### Failure trigger, written as a number, before the change

> **If the `GetPageStats` average impression position for
> `/blog/enhanced-services-gp-practice-income-tax` falls below 10.0 in any rolling 28-day window between
> deploy and deploy+56 days, revert:**
> `git checkout d2e75655 -- Medical/web/content/blog/enhanced-services-gp-practice-income-tax.md`

Position rather than clicks, because position is the only metric on this page with enough signal to move
meaningfully, and because 10.0 is the exact threshold the §2.4 ruling uses. **If an additive-only change
can push this page from 4.0 past 10.0, the additive-only premise is wrong and the EXTEND grade needs
re-examining across all 26 pages the ruling covers**, not just this one. That is the real value of this
page in the wave: it is a cheap test of the ruling itself.

Second trigger, on ownership:

> **If any row of section 7.2 fails at QA, the page is HELD, not deployed.** Per `BATCH3_INDEX.md` §8,
> a wave whose editorial QA raises a V1, V3 or V5 finding on three or more pages has reproduced the
> batch-1 defect and its pages are held rather than deployed.

**Wave-level context.** This page is 1 of 6 in wave A's combined Bing baseline of **17 clicks / 234
impressions** page level. The wave's revert trigger is combined Bing clicks falling below **13** across
the six URLs at the 28-day read. **This page contributes 1 of those 17**, so it cannot on its own trigger
or prevent the wave revert, and its individual trigger above is the one that governs it.

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day
Bing read.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` for this slug must be populated with
**the section 7.1 coverage items**, not with market phrases, because there are no market phrases to
populate it with. If the field will only accept keyword strings, populate it with
`advice and guidance enhanced service` and `item of service` and **record in the row that the real
acceptance criteria are 7.1's nine items**, so a later read does not measure this page against a keyword
list that was never the plan.

**No monitor, alert, cron or scheduled job is created by this pack.** Registration in `monitored_pages`
is a separate owner-triggered step and has not been done. Reading a tracker is a pull, not a
notification.

---

## 9. THE OWNERSHIP MAP, reproduced verbatim and in full

**This is the most important part of this pack.** Batch 1 failed because twelve pages were written with
no map and the same explanation landed on seven of them.

**The standing rule, restated because it is the reason this document exists:**

> **Every shared fact has exactly ONE owning page. Every other page gets one sentence and a link, never
> the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

> **V7 IS BINDING: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the
> map, states neither fact, and reports the conflict. A conductor writes seven briefs quickly and can
> easily reach for the same compelling fact in more than one of them; **the map is the single place where
> duplication is actually visible.** A brief is an instruction about ONE page, and only the map can see
> the batch.

### 9.1 THIS PAGE'S OWN ROW. Everything here is yours to explain in full.

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O23** | **Locally commissioned and enhanced services**: DES vs LES vs national enhanced services, how they are contracted, invoiced and recognised in the accounts. | **`/blog/enhanced-services-gp-practice-income-tax`** | The GMS page gets one sentence naming enhanced services as a funding stream, then link. |

**No other wave-A page may take any of it.** If a sentence in a new block is not about the taxonomy, the
contracting, the invoicing or the accounts treatment of enhanced services as a class, that is the signal
it has left O23.

### 9.2 New batch-3 rows that CONSTRAIN this page (BATCH3_INDEX.md §6.2, verbatim)

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12 (`what is a GMS contract`, `apms contract`, 1,140 peer-winnable).** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** Batch 1 put the tier table on three pages that did not own it; this is the same shape and it is pre-empted here. |
| **O20** | The **Network Contract DES and the PCN funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. | `/blog/pcn-funding-network-contract-des-explained` | The ARRS and clinical-director pages get **one sentence** placing their subject inside the DES, then link. The GMS page gets one sentence saying PCN money sits outside the core contract, then link. |
| **O21** | **ARRS**: which roles are reimbursable, the reimbursement mechanics and caps, **who employs ARRS staff**, the payroll, pension and employer-NIC consequences, and the VAT trap when staff are shared between practices. | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | The PCN funding page gets **two sentences** naming ARRS as a DES strand and hands off. It must not explain the employment model. |
| **O22** | **PCN clinical director payments**: how the CD payment is calculated, whether it is employment or self-employment income, how it is taxed, and how it interacts with a partner's profit share. | `/blog/pcn-clinical-director-payments-tax` | The PCN funding page gets one sentence, then link. **No tax treatment stated anywhere else.** |
| **O24** | **Dispensing practice income**: the dispensing fee and drug-reimbursement structure, and the **zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12** as distinct from the Sch 9 Group 7 medical-care exemption. | `/blog/dispensing-practice-income-accounts-tax` | Wave A: no other page mentions dispensing income at all. **O17 still binds**: this page states the zero-rating in **one or two sentences** as the contrast, and does not explain the exemption, which belongs to the frozen `gp-vat-registration`. |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **Wave A: one sentence and a link, on every page.** Not reopened in this batch. **No page states a QOF point value (O10, hard fail F5).** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | Wave A: every page that mentions a payment landing gets **one sentence** and a link. Five pages describing income recognition five times is the batch-1 failure. |

### 9.3 Inherited rows still binding on this page (BATCH3_INDEX.md §6.1, verbatim)

| # | Shared fact | Owner | Batch-3 consequence |
|---|---|---|---|
| O4 | Scheme Pays: two-limb election, mandatory vs voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **`/blog/nhs-pension-scheme-pays-doctors-deadlines` is being prepared separately and is not this batch's at any date.** No batch-3 page states a Scheme Pays deadline. This is the exact fact that broke batch 1. |
| O9 | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** Binds wave F directly (gmc revalidation). |
| O10 | Global Sum per weighted patient (**£130.07, 2026/27, VERIFIED**) and the QOF point value (**£227.95, 2026/27, VERIFIED, see the ruling below**) | `house_positions.md` §3.A and §3.B | Wave A: the GMS page may state £130.07 with its year tag. **No page in wave A states a QOF point value, but the reason is now ownership (O25), not verification.** |
| O13 | GP practice reimbursement for parental-leave cover under the SFE | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | **Wave A**: the GMS and enhanced-services pages get one sentence and a link. This is a real collision, see O19. |
| O17 | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **Wave A**: the dispensing page gets one sentence on zero-rating and a link. **Wave F**: `private-practice-tax-nhs-and-private-income` gets one sentence. Neither explains the exemption. |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | All waves: one sentence, then link. |
| O35 | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

> ### THE O10 RULING, 2026-08-26, reproduced verbatim because it is the likeliest thing to be misread on this page
>
> **The QOF point value is VERIFIED and the O10 verification ban on it is lifted. F5 is now wrong on two
> of its three items and must be narrowed.**
>
> Three pack writers raised this independently. `house_positions.md` **§3.B** is headed "QOF point value
> (VERIFIED AT SOURCE 2026-08-26, block lifted)" and locks **£227.95 for 2026/27**, quoting GMS Statement
> of Financial Entitlements Directions 2026 paragraphs 6(6)(b), 6(7), 6(8) and Annex E paragraph E4
> verbatim, with both 2026 amending instruments read and confirmed not to touch Section 6. It says in
> terms that "the ban in the batch-2 ownership map row O10 can be released for this figure". §3.A does
> the same for the Global Sum at **£130.07**. Only the **GMC annual retention fee** remains UNVERIFIED,
> and its ban stands.
>
> **Language spec F5 has not caught up and is a live false-positive risk.** As written it is a hard fail
> for "a £ or numeric within 30 words of ... 'global sum', 'weighted patient', 'QOF point'". Read
> literally, editorial QA would **BLOCK wave A's anchor page for correctly stating the verified £130.07
> with its year tag**, which is the opposite of what F5 exists to do.
>
> **Ruling: F5 is narrowed to the GMC annual retention fee alone.** The Global Sum and the QOF point
> value are governed by F1 (year tag in the same sentence or table caption) and F4 (traces to house
> positions) like any other verified figure. `language_spec_2026-08-26.md` F5 and `BATCH2_INDEX.md` O10
> both need one line amended; **neither is amended by this task**, because both belong to other windows,
> and this ruling is recorded here so the QA agent has something to cite.
>
> **What does NOT change: the ownership fence.** No wave-A page states a QOF point value, because
> **O25 gives QOF to `/blog/qof-income-gp-practice-accounting-explained`**, which is a batch-1 page
> inside its own read window. **A verification ban and an ownership fence are different things and a
> writer must not read the lifting of one as the lifting of the other.** Per V7, where a brief and the
> map disagree, the map wins.

**Applied to THIS page, and the task brief says the same:** the lifting of the O10 verification ban
**changes nothing here.** O25 and O19 are **ownership fences**, and an ownership fence is not a
verification ban. **This page states neither figure.** Not because they are unverified (both are
verified), but because they belong to other pages. Section 7.2 tests this as a count.

### 9.4 The batch-level style watch (BATCH3_INDEX.md §6.3)

Reproduced because item 6 is V7 and item 4 is the V1 counting method this page will be scored on.

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering
   across the wave, is named in that wave's fix pass, whatever it is.** The conductor runs this across
   the wave after drafting. It is invisible from inside a single page.
2. **Named and already burned, do not reach for either:** `it is not X, it is Y` (cap **once per page**,
   wave-wide), and the **numeral-count paragraph opener** (cap **once per page**, wave-wide, and prefer
   zero).
3. **The house reflex to watch third:** V9's corollary records five of seven batch-2 pages opening with a
   corrective clause in the first two sentences. **Batch 3 is the third batch and V9 says a third showing
   should be varied deliberately.** Wave A's conductor decides the variation and states it in the fix pass.
4. **V1 hard cap: two word orders per idea per page**, counted as **non-overlapping longest matches**,
   never raw substrings. **Any V1 finding must quote the spans it counted.**
5. **V2 is a live standard, not a batch-2 rule.** Every page touched in this batch is checked against the
   current rules, not the rules that existed when it was written.
6. **V7: where a conductor's brief and this map disagree, THE MAP WINS.** The writer follows the map,
   states neither fact, and reports the conflict.

---

## 10. Corrections to the index or the dossier

**Four, and none is edited into another document by this task.**

**C1. The harvest is larger than `BATCH3_INDEX.md` states, and the row count in the writer brief is wrong.**
The brief and the index both describe `dataforseo_competitor_data` for `site_key='medical'` as
**32,872 rows** across **27 domains**. Measured live 2026-08-26:

```sql
select date_pulled, count(*) n, count(distinct ranked_keyword) kw, count(distinct competitor_domain) d
from dataforseo_competitor_data where site_key='medical' group by 1 order by 1;
-- 2026-08-26 | 39296 | 31539 | 44
```

**39,296 rows, 31,539 distinct keywords, 44 domains, all on a single `date_pulled` of 2026-08-26.**
There is no second pull date to explain the gap. The likeliest reading is that the harvest was still
being written when the 32,872 figure was taken, which would also explain the 27-versus-44 domain count.
**Nothing in this pack depends on the total**, because section 3's regexes were run against the live
table, but **any pack that quoted 32,872 as a denominator quoted a low one**, and the QOF exemplar
(`§3`, "32,872 rows, 27 domains") is one of them. **Recommendation: re-derive the count live in each
pack rather than inheriting it, and correct the index's §0.1 and the writer brief.** No document is
edited by this task.

**C2. The peer set is 22 domains but the harvest carries 44, and section 3's classification depends on
which is used.** `competitor_universe_2026-08-26.md` §2a lists **22** peer-winnable domains and §2b lists
the non-peer authority layer. The harvest contains **44** distinct domains, including at least one
(`mlaaccounting.co.uk`, surfaced by the section 3.3 sweep on `lmc accountants`) that appears in neither
§2a nor §2b. **Peer-winnable is defined against §2a's 22**, so an unclassified domain holding a keyword
at position <= 20 would be silently excluded from every peer-winnable count in every batch-3 pack.
**It does not affect this pack** (this page's peer-winnable is 0 and the only O23 row is held by a §2a
peer at position 40), but it is a systematic risk for the packs that follow. **Recommendation: reconcile
the 44 harvested domains against the 22+N classified ones before wave C, and record the residue.**

**C3. Wave A's own evidence table understates this page's isolation, and the index's §5 wave-A table
should say so.** `BATCH3_INDEX.md` §5 records this page as "EXTEND (§2.4) | B 1c/7i pos 4.0, 0 named
queries", which is exactly right. What it does not record, and what section 3 of this pack establishes,
is that **the page's subject has zero peer-winnable volume and exactly one keyword in the entire
harvest.** The index's §5 justification for wave A is that it is "the only cluster on the site with real
Bing demand *and* no frozen owner *and* the only immediately workable NO-PAGE topic", and that its query
evidence is "unusually specific and unusually answerable". **All of that is true of the GMS, PCN and ARRS
pages and none of it is true of this one.** This page is in wave A because it shares facts with those
pages and must be mapped alongside them, which is the correct reason under the index's own sizing rule
("a wave is as large as the set of pages that share facts with each other"), but it is a **different**
reason from the one §5 gives. **Recommendation: add one line to §5 distinguishing the wave's two anchor
pages from its three thin ones, so a later reader does not measure all six against the same expectation.**
This matters at the 28-day read: §8's wave-A test is "at least 4 of 6 pages register impressions on a
named phrase", and **this page and the clinical-director page have no named phrases to register**, which
makes 4 of 6 substantially harder than it reads.

**C4. The ownership boundary I was asked to examine is drawn in the RIGHT place, and I am not moving it.**
The task brief asked me to draw the O20/O23 line explicitly and to say so if I thought it was wrong.
**It is not wrong.** The line is at section 5.3: **O23 owns the taxonomy and the contracting layer, O20
owns the envelope; this page may say THAT the Network Contract DES is a DES, and may not say WHAT it pays
for.** The PCN pack reached the same boundary independently from the other side (its line 183: "Enhanced
services: one sentence, then link. DES against LES is O23's"), which is the two-writer convergence
condition under which batch 2's O7 split was ratified. **Recorded as confirmation, not as a change.**

**One wording problem this does raise, and it is the P1/P1b defect in section 6.** The existing H3
`The Network Contract DES (named once)` both narrates the ownership rule to the reader and is inaccurate
about its own page (the DES is named seven times). **It is frozen by K2 and this writer must not touch
it.** It is escalated to the manager as a named item, alongside the wave-A **D8** escalation, which is
the mirror-image problem on the PCN page: a 157-word ARRS block that breaches O21 inside frozen copy,
where the manager must decide whether a deletion inside frozen copy is permitted as an ownership
correction. **P1 and D8 are the same question asked from two directions and should be ruled on together.**
D8's note records that batch-1 coordinator ruling 3 clears **factual** corrections inside frozen copy and
that an ownership correction is not a factual correction. **P1 is a third case: a heading that is factually
wrong about its own page AND narrates an internal rule.** It arguably falls inside ruling 3 on the
factual limb alone, which is why it should not be decided by a writer.

---

## 11. Limitations

1. **Peer-winnable is Google-derived and this page has none.** DataForSEO positions are Google positions.
   Per owner decision 21, peer-winnable **orders** the work and **never excludes any of it**. A zero here
   orders this page last on Google-derived priority and removes nothing from its scope. On a site where
   Bing out-clicks Google 3.4x, and where this page's only measured signal is a Bing position of 4.0,
   a Google-derived zero is close to uninformative.
2. **`GetPageStats` is a top-N endpoint** (the Bing top-N trap memo). **A page absent from it is not
   proven to have zero Bing impressions; it is absent from the top N.** This URL appears in exactly one
   of the fourteen weekly snapshots. Its true impression count over the window is **at least** 7 and may
   be higher. Every Bing figure in this pack is a floor, not a total.
3. **`GetPageQueryStats` returning zero is confirmed, not assumed, but its cause is unknown.** The call
   was made with the full `https://www.` URL, so it is not the silent path-argument bug in §0.2. Whether
   the zero means "no query crossed the reporting threshold" or "the named-query index has no entry for
   this URL" is not distinguishable from the client. **The click is real and no query is attributable**,
   and that is the whole of what can be said.
4. **The competitor set is two pages and one of them is another page's.** That is not a sampling choice,
   it is the size of the measured market (section 3). A teardown of two URLs is thin evidence, and section
   5's whitespace findings rest on it. **They should be treated as the best available reading, not as a
   proven gap.**
5. **The enhanced-services vocabulary may be absent from the harvest because nobody publishes it, not
   because nobody searches it.** This is the same shape as the opticians and allied-health ABSORB clusters
   (`BATCH2_INDEX.md` §7, `BATCH3_INDEX.md` §4), where the $1.13 seed-and-harvest fix is priced and still
   unauthorised. **That $1.13 would settle whether this page has a market**, and it is the cheapest open
   question in this pack. **Not spent, because this task permits no paid API call.**
6. **No live-production check was run.** Every statement about the page comes from the source file and
   from the sitemap generator, not from a request to the live site. In particular, the section 7.6 link
   list is derived from the markdown, not from `curl`, and defects D1 (`/blog/employment-status` 404s in
   the sitemap) and D3 (the possible live 301 on `private-practice-incorporation-complete-guide`) are
   both unresolved and both derived from source.
7. **The CCG abolition date in section 7.1 item 2 is stated as a coverage requirement, not as a verified
   fact.** `house_positions.md` does not cover it. **It must be verified at the Health and Care Act 2022
   before it is written**, per section 7.5, and the standing amending-instrument rule applies.
8. **`advice and guidance` as a current enhanced service is unverified.** The only evidence for it is a
   40-volume keyword and a 2016 competitor page. It must be verified at NHS England before the page says
   it is a live service, and it may turn out to be a term the page can carry only descriptively.
9. **This pack does not resolve P1, P1b or D8.** All three are frozen-copy questions and all three are
   the manager's. A writer who resolves any of them has broken K2.
