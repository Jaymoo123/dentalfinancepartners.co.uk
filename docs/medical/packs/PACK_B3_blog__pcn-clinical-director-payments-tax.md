# §9.5 RESEARCH PACK: /blog/pcn-clinical-director-payments-tax

**Wave A · Batch 3 · GRADE = EXTEND (by `BATCH3_INDEX.md` §2.4's ruling) · ADDITIVE ONLY, K2 APPLIES**

Built 2026-08-26. Spec: `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5. Batch index and ownership map:
`docs/medical/packs/BATCH3_INDEX.md`. Language spec: `docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9).
Ground truth: `docs/medical/house_positions.md`. Market map: `docs/medical/cluster_dossier_2026-08-26.md`
(CORRECTED §4 ordering). Format exemplar: `PACK_blog__qof-income-gp-practice-accounting-explained.md`.

No file under `Medical/web/` was edited. No commit, no deploy, no `monitored_pages` write, no monitor, alert,
cron or scheduled job created. **No paid API call was made by this task: $0.00.** GSC and Bing Webmaster are
free and were re-pulled live; the DataForSEO harvest queried in section 3 was already paid for on 2026-08-26.

---

## 0. Provenance, and a correction to the brief's data instruction

**The shared scratchpad files named in the writer brief (`medical_stage0/gsc_page_rows.json` and siblings) were
absent, exactly as `BATCH3_INDEX.md` defect D10 predicts.** Every figure in this pack comes from a live re-pull
made by this task on 2026-08-26, from the repo root (the clients resolve `secrets/gsc_credentials.json` relative
to cwd, so a pull launched from the scratchpad directory dies with `FileNotFoundError`; run it from the repo
root).

```python
# re-pull, 2026-08-26, run from C:\Users\user\Documents\Accounting
GSCQueryFetcher("medical").gsc_client.service.searchanalytics().query(
    siteUrl="sc-domain:medicalaccounts.co.uk",
    body={"startDate":"2026-05-25","endDate":"2026-08-23",
          "dimensions":["page"],           "rowLimit":25000})   # -> 21 rows
    #    dimensions=["page","query"]                            # -> 259 rows
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")            # -> 303 rows
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/pcn-clinical-director-payments-tax") # -> 0 rows
```

**The re-pull reproduces every figure the brief supplied, exactly: 21 GSC page rows, 259 GSC page+query rows,
303 Bing `GetPageStats` rows, this page at 1 click / 4 impressions / average impression position 4.0, and zero
`GetPageQueryStats` rows.** No divergence on any supplied figure. Two additions to the brief's evidence are
recorded in section 2.3 and one correction to the index's harvest size in section 3.1.

**Endpoint discipline, restated because it is a live trap (`BATCH3_INDEX.md` §0.2 and defect D2).**
`GetPageStats` page-level impressions and `GetPageQueryStats` named-query impressions are BOTH true and are
NEVER comparable to each other. Every Bing number in this pack names the endpoint that produced it. The full
`https://www.` URL is used on `GetPageQueryStats`; a path argument returns an empty list rather than an error,
which is a silent-failure path that manufactures a false "no Bing data" finding.

**Repo HEAD verified live: `git rev-parse HEAD` -> `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`.**
`7be12b11` appears in a session-start environment banner and is **not on this branch**. A pack that copied it
would write a revert command that undoes batch 2 as well as this page.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES.**

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/pcn-clinical-director-payments-tax` |
| Cluster / wave | Wave A, GP practice income and NHS funding (`BATCH3_INDEX.md` §5). Six surfaces, five EXTEND, one REFRAME. |
| Lane | `nhs_practice_income` (`competitor_universe_2026-08-26.md` §3 lane 8) |
| Source file | `Medical/web/content/blog/pcn-clinical-director-payments-tax.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** The writer edits the `.md` file directly and writes new blocks as raw HTML (`<h2>`, `<p>`, `<ul>`) to match. Frontmatter carries `metaTitle`, `h1`, `title` is ABSENT on this file (see the note below), `keyTakeaways`, `summary` and the `faqs` list. |
| Current sha (revert anchor) | **`d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`** (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/pcn-clinical-director-payments-tax.md` |
| NO-PAGE topics attached | **None.** The only immediately workable dossier NO-PAGE topic in wave A is corrected order 12 (GMS/APMS), prescribed onto the GMS page, not this one (`BATCH3_INDEX.md` §4 point 1). |

**Why this page grades EXTEND and not REFRAME.** §9.2 as written matches neither branch: REFRAME requires Bing
clicks **= 0** and this page has **1**; EXTEND requires Bing clicks **>= 3**. `BATCH3_INDEX.md` §2.4 rules that
**1 or 2 Bing clicks at a Bing average impression position of 10 or better grades EXTEND**, and this page holds
**position 4.0**. It qualifies on the position test with six positions of headroom. The grade is therefore a
ruling, not a spec reading, and the ruling should be promoted into `REWRITE_PROGRAM.md` §9.2 as a third row
(defect D4, a class defect that will recur on every Bing-first site in the estate).

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `PCN Clinical Director Payments: Tax & Pension`
2. `h1`: `PCN Clinical Director and Leadership Payments: How They Are Taxed and Pensioned`
3. `metaDescription`, `slug`, `canonical`, `category`, `date`, `generator`, `author`, `altText`, `image` and the
   whole `imageCredit` block.
4. **The existing H2 sequence, in this relative order, each string unchanged:**
   1. `What the Clinical Director and Leadership Funding Is`
   2. `Why the Payment Route Is the Whole Question`
   3. `Route 1: Paid Through a Member Practice`
   4. `Route 2: Invoiced From the Director's GP Partnership`
   5. `Route 3: Paid Via a Personal Service Company`
   6. `Route 4: Paid Direct as Self-Employed Income`
   7. `So Is Clinical Director Pay Pensionable? The Honest Answer`
   8. `The Annual Allowance Angle for High-Earning Directors`
   9. `Getting It Documented`
   10. `How We Help GP Practices and PCN Clinical Directors`
5. Every existing paragraph, every existing `<strong>` run-in label (`Mechanics.`, `Tax.`, `Pension.`,
   `VAT watch-item.`, `Pension (important).`), **all 14 existing FAQ questions and answers**, all 5 existing
   `keyTakeaways`, and the `summary`. **Nothing existing is reworded, reordered, shortened or "tidied".**

**Note on `title`.** Unlike the QOF exemplar, this file has **no `title:` frontmatter key**; it carries `title`
only as the first frontmatter line (`title: "PCN Clinical Director Payments: Tax and Pension Explained"`). That
line is frozen too. Do not add a second title key and do not "normalise" the frontmatter to match another post.

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before** the existing
   `<h2>How We Help GP Practices and PCN Clinical Directors</h2>`, so the ten existing H2s keep their relative
   order and the byte-identity check reads them as an unbroken subsequence. Do **not** place new blocks between
   Route 1 and Route 4; the four-route sequence is the page's spine and interleaving it breaks the reader.
2. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place unchanged.
3. **New key takeaways appended** to `keyTakeaways` (optional; the existing 5 stay).
4. New internal links **inside the NEW blocks only**. No new internal link inside any existing paragraph.

### Frozen-list position, confirmed against BATCH3_INDEX §1

`BATCH3_INDEX.md` §1 lists **19** live `monitored_pages` rows for `site_key='medical'`, derived with **no status
predicate** (a `status='active'` filter silently excuses rows 1, 4 and 18, and that mistake was made once already
today). **`pcn-clinical-director-payments-tax` is not among the 19.** It is workable now, with no gate.

Two of the nineteen matter to this page as **link targets**, not as constraints on it:
`gp-partner-vs-salaried-gp-tax-comparison` (row 6, active to 2026-09-10) and `gp-vat-registration` (row 12,
active to 2026-09-10). Both are already linked from the live page and both stay linked. **Contextual links to a
frozen page's live URL are fine; writing toward it is not.**

**Never propose a collapse, a redirect or a URL change (rule K4). Rewrite in place only. No em-dashes (rule I1).**

---

## 2. Equity register

Every figure below names its endpoint and its window. **Data-through 2026-08-23 on both engines.**

### 2.1 Google

Source: GSC API `searchanalytics.query`, property `sc-domain:medicalaccounts.co.uk`, window
**2026-05-25 to 2026-08-23**, dimensions `["page"]` (21 rows returned) and `["page","query"]` (259 rows
returned), re-pulled 2026-08-26.

| Dimension | Rows for this URL | Clicks | Impressions |
|---|---|---|---|
| `["page"]` | **0** | 0 | 0 |
| `["page","query"]` | **0** | 0 | 0 |

**This page has no Google history at all, and that is a fact about crawl demand, not about the page.**
`BATCH3_INDEX.md` §2.1 establishes that the sitemap emits **138 URLs** and §8 that Google returns page-dimension
rows for **21** of them. A page absent from a 21-row set on a 138-URL site has never been given the chance to
fail. **No sentence in this pack, in the drafted copy, or in the later read may describe this page as "ranking
nowhere", "not ranking" or "failing on Google".** Forty-four untreated URLs are in the same position
(`BATCH3_INDEX.md` defect D5, recorded there as a question rather than a finding).

### 2.2 Bing, page level

Source: `BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")`, 303 rows across 14 weekly
snapshots, re-pulled 2026-08-26. Window = the 13 snapshots dated **2026-05-29 to 2026-08-21**.

| Snapshot | In window | Clicks | Impressions | Avg impression position |
|---|---|---|---|---|
| 2026-08-21 | yes | **1** | **4** | **4.0** |
| **WINDOW TOTAL** | | **1** | **4** | **4.0** |

**This URL appears in exactly ONE of the thirteen weekly snapshots.** All of its measured equity was earned in
the week ending 2026-08-21, which is the most recent snapshot in the window. Two readings are available and the
pack does not choose between them, because the data cannot: either the page has just started to surface on Bing,
or `GetPageStats` is top-N (limitation 2 in `BATCH3_INDEX.md` §9) and the page fell below the cut in the other
twelve weeks. **Both readings make this a fragile, recently-acquired position rather than a settled one**, and
that is the argument for additive-only handling regardless of which is true.

### 2.3 Bing, named-query level, and the adjacent evidence that matters more

Source: `BingWebmasterClient().get_page_query_stats("https://medicalaccounts.co.uk",
"https://www.medicalaccounts.co.uk/blog/pcn-clinical-director-payments-tax")`, re-pulled 2026-08-26 against the
full `https://www.` URL.

**Rows returned: ZERO.** Distinct queries 0, impressions 0, clicks 0.

This is a genuine zero and not the empty-list trap: the identical call against the sibling PCN page, made in the
same script and the same second, returned **47 rows**. The endpoint is working; this page has no named-query
rows. So **Bing knows this URL is worth showing (page level: 1 click, 4 impressions, position 4.0) and will not
tell us for what.** This page has an equity register with a number in it and no words in it.

**The consequence for the acceptance criteria is structural, and it is the best thing about this grade.**
There are **zero do-not-lose named queries** on this URL. The QOF exemplar had 29 and had to protect every one.
This page has none, so the equity-preservation gate (§9.9 floor 5) reduces to the single page-level position:
hold 4.0 or better. That is why an additive change here is unusually low-risk.

#### 2.3.1 THE ADJACENT EVIDENCE: the sibling page is answering this page's question

Same endpoint, same call, same second, against
`https://www.medicalaccounts.co.uk/blog/pcn-funding-network-contract-des-explained`: **47 rows, 47 distinct
queries, 7 clicks, 65 impressions** (`GetPageQueryStats`). Its page-level figure is **7 clicks / 85 impressions**
(`GetPageStats`, same 13 snapshots), impression-weighted average position **4.89**. The two impression figures
differ by 24% on the same page in the same window, which is defect D2 restated in fresh data.

**Three of those 47 named queries are clinical-director queries, and they are landing on the funding page.**

| Query (Bing `GetPageQueryStats`, sibling URL) | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| `what is pcn cd element of core pcn funding 23/24` | 3 | 0 | 7.0 |
| `what is pcn cd element of core pcn funding 24/25` | 1 | **1** | 7.0 |
| `pcn clinical director funding` | 1 | 0 | 6.0 |
| **Total** | **5** | **1** | |

**Two corrections to the brief's statement of this evidence, both additions rather than contradictions.** The
brief names one query (`...23/24`, 3 impressions, position 7). The live re-pull finds **three**, totalling
**5 impressions and 1 click**, including a second year-variant that **converted**. So the ownership signal is
stronger than the brief states, and it is not a single stray impression: it is a small but real, click-earning,
multi-phrasing demand pattern sitting on the wrong page.

**Why this belongs in sections 2 and 5 rather than being a curiosity.** A practice manager searching the
clinical-director element of core PCN funding lands on `/blog/pcn-funding-network-contract-des-explained`, which
under **O20** owns the DES envelope and under **O22** is entitled to exactly one sentence about the clinical
director. The page that owns the CD payment in full has **zero named-query rows**. That is a measurable
ownership inversion, it is the clearest demand signal available anywhere near this topic, and closing it is what
this pack's acceptance criteria are built to measure.

**It is also a boundary question, not only a coverage question.** The queries ask what the CD *element of core
funding* is, which straddles O20 (the envelope) and O22 (how the CD payment is calculated). **O22's first clause
is "how the CD payment is calculated", so the calculation and scaling of the CD element is this page's**, and the
composition of the wider core-funding envelope it sits inside is the sibling's. Section 7.3 makes that split
countable so the two pages cannot both answer it.

---

## 3. The market's keyword set

### 3.1 The harvest, the regex, and a correction to the index

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`. Queried via
`python scripts/_q.py -` from the repo root. **No new DataForSEO call was made; this is the persisted harvest.**

**Correction to `BATCH3_INDEX.md`.** The index and the writer brief both describe the harvest as
**32,872 rows across 27 domains**. Re-counted live:

```sql
select date_pulled, count(*) rows, count(distinct competitor_domain) domains
from dataforseo_competitor_data where site_key='medical' group by 1 order by 1;
-- 2026-08-26 | 39296 | 44
```

**39,296 rows across 44 domains, all stamped `2026-08-26`.** The harvest grew during the day, presumably from
the concurrent opticians and allied-health seeding work referenced in `BATCH3_INDEX.md` §4. **The 32,872 figure
is stale wherever it is quoted, including in this batch's own writer brief.** This matters for reproducibility,
not for this page's conclusion, which is a zero either way.

**Selection regex, printed so the count is re-derivable.** Word boundaries use Postgres ARE `\y`, never `\b`
(defect D9: `\b` is a backspace character in ARE and silently under-counts; one writer found `\yarrs\y`
returning 41 rows where `\barrs\b` returned 3).

```sql
select ranked_keyword, max(search_volume) vol, min(position) best,
       (array_agg(competitor_domain order by position))[1] dom
from dataforseo_competitor_data
where site_key='medical'
  and (ranked_keyword ~ 'clinical director'
       or ranked_keyword ~ '\ycd\y'
       or (ranked_keyword ~ '\ypcn\y' and ranked_keyword ~ 'pay|salar|tax|income|director|lead')
       or ranked_keyword ~ 'clinical lead')
group by 1 order by vol desc nulls last, best;
-- 0 rows
```

### 3.2 THE FINDING: this topic has no market keyword set at all

**Keywords in topic: 0. Combined volume: 0. Peer-winnable volume: 0. Domains contributing: 0.**

Three widening passes were run to confirm the zero is real and not a regex artefact:

| Widened pattern | Rows | What actually came back |
|---|---|---|
| `ranked_keyword ~ '\ypcn'` | **10** | `pcns payment` (9,900, bma.org.uk pos 8), `pcn des 26/27` (260), `pcn des` (260, bhp.co.uk pos 13), `pcn manager jobs` (140), `what is a pcn nhs` (70), `pcn manager` (70), `pcn des 2026/27` (50), `pcn network` (50), `maidenhead pcn` (50), `pcn des 2025/26` (40). **Not one is about a clinical director or their pay.** |
| `ranked_keyword ~ 'clinical'` | 55 | Entirely clinical-fellow, clinical-coding, clinical-oncology and clinical-correspondence job and training terms. `senior clinical fellow salary` (40) is the only pay term and it is a hospital training grade, not a PCN role. **Zero relevance.** |
| `ranked_keyword ~ 'director'` | 5+ | `director identification number` (8,100), `director loan` (2,900), `company director loans` (2,900), `company director loan` (2,900), `loans to company directors` (2,900). **Every one is a company-director term, none is a clinical director.** |

**So the entire PCN family in a 39,296-row, 44-domain harvest is ten keywords, and the clinical-director share of
it is zero.** This page is a **third topic that is unpackable from the paid harvest**, joining the two ABSORB
clusters (opticians, allied health) recorded in `BATCH2_INDEX.md` §7 and carried forward in `BATCH3_INDEX.md` §4.
The mechanism is the same in all three cases: **none of the 44 harvested domains runs a page on the topic**, so
no keyword the topic would generate can appear in a competitor-position harvest by construction.

**The `director` result is not merely an empty set, it is an active cannibalisation warning.** The five
`director` keywords with real volume are all company-director and director's-loan tax terms, which is **wave C's
territory** (`salary-vs-dividend-medical-limited-company-2026`,
`consultant-directors-loan-account-s455-medical-company`, O34). Our page uses "director" 40+ times meaning
*clinical* director, and it already carries a personal-service-company route with corporation tax and dividend
extraction in it. **Any new block must qualify "clinical director" on every use in a heading and must not add
company-director or director's-loan vocabulary**, or this page drifts into a wave C SERP it cannot win and
competes with a wave C page it must not compete with. This is the same shape as the dossier §8 "consultant"
warning (seven screened topics, 6,450 volume, where "consultant" means a tax adviser to Google and a hospital
doctor to us), and it is recorded here because nothing in the batch documents flags it for "director".

### 3.3 What this means for section 7, stated before section 7 uses it

The exemplar's section 7.1 is a list of harvested market phrasings with volumes and best-held positions. **This
page cannot have one, because the harvest returns zero rows.** Fabricating volumes would breach F6 and I6, and
inventing a peer-winnable figure would breach F4.

**So the missing-phrase list in section 7.1 is built from two sources instead, each labelled, and the writer and
the QA agent must be able to see which is which:**

- **MEASURED**: phrasings taken verbatim from live Bing `GetPageQueryStats` rows on the sibling page
  (section 2.3.1). These are real, dated, click-earning demand with a named endpoint. There are few of them and
  they are the only ones the 14/28-day read can honestly be scored against as *demand*.
- **REASONED**: phrasings derived from the competitor pages actually fetched in section 4 and from the page's own
  topic. These carry **no volume figure and none is invented**. They are scored as *presence*, not as demand.

**Section 7.1 states the tier of every phrase. A QA agent must not treat a REASONED phrase as evidence of
demand, and the 14/28-day read must not report one as a traffic result.**

---

## 4. Competitor teardown

All fetches made 2026-08-26 with `curl -A "Mozilla/5.0" -sS -L`. **Every URL attempted is accounted for below,
including the five that did not return 200**, per the brief's instruction to record non-200s with their status
code and never drop them.

### 4.0 Fetch ledger

| # | URL | HTTP | Bytes |
|---|---|---|---|
| 1 | `https://www.nhsbsa.nhs.uk/payments-clinical-director-duties` | **403** | 34,454 |
| 2 | `https://www.icaew.com/technical/healthcare/tax/pcns-current-hot-topic-tax-issues` | **404** | 473,950 |
| 3 | `https://aisma.org.uk/2022/05/20/vat-blow-pcn-clinical-directors/` | 200 | 78,694 |
| 4 | `https://www.gponline.com/pcns-check-payment-rules-clinical-directors-avoid-tax-penalties/article/1675090` | **403** | 5,750 |
| 5 | `https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/the-nhs-pension-scheme-as-a-medical-director` | 200 | 339,245 |
| 6 | `https://www.larking-gowen.co.uk/insights/blog-primary-care-networks-what-next/` | **404** | 186,907 |
| 7 | `https://www.rbp.co.uk/news/is-your-practice-receiving-the-right-network-payments` | 200 | 70,237 |
| 8 | `https://www.icaew.com/technical/healthcare/tax` | 200 | 494,891 |
| 9 | `https://www.sandisoneasson.co.uk/news/post/pcn-clinical-director-payments` | **404** | 13,104 |
| 10 | `https://www.bma.org.uk/pay-and-contracts/contracts/gp-practice-contract/primary-care-networks-pcns` | **404** | 317,421 |
| 11 | `https://practiceindex.co.uk/gp/blog/pcn-clinical-director-role/` | **404** | 169,661 |

**Method finding, and it corroborates house positions.** Rows 9, 10 and 11 were guessed paths and all three
404'd; rows 3, 5 and 7 were reached from a search result and all three returned 200. That is
`house_positions.md` method finding 3 ("guessing URLs is the slowest route") reproduced exactly.

**Method finding that CONTRADICTS house positions, and it should be recorded.** `house_positions.md` method
finding 2 (2026-08-26) narrows the NHSBSA block to the fetch tool rather than the domain, on the evidence that
"`nhsbsa.nhs.uk` is reachable to `curl` with a browser user agent". **On this run, `curl -A "Mozilla/5.0"`
against `https://www.nhsbsa.nhs.uk/payments-clinical-director-duties` returned HTTP 403 with a 34,454-byte
challenge body.** The narrowing does not hold for this path on this date. See section 10, correction 3.

### 4.1 aisma.org.uk, "VAT blow for PCN clinical directors" (HTTP 200)
`https://aisma.org.uk/2022/05/20/vat-blow-pcn-clinical-directors/`
**Class: UNWINNABLE AUTHORITY / NON-RIVAL** per `competitor_universe_2026-08-26.md` §2b, which records AISMA as
"the specialist medical accountants' association. Gatekeeper/directory, not a rival. A citation and membership
target, not a rank target." Treat as a **citable position**, never as a page to outrank.

| | |
|---|---|
| Title / H1 | `VAT blow for PCN clinical directors` (identical) |
| Published | 20 May 2022 |
| Word count | **~594** including cookie chrome; the article body is roughly 480 |
| H2/H3 | **None.** One H1 and no content headings. |
| Tables / calculator / FAQ | None / none / none |

**Covers.** The single most load-bearing thing anyone has published on this page's VAT question, and it is a
direct quotation of HMRC's position, obtained by AISMA over three years of correspondence. Verbatim on the page:
*"When PCNs were first set up there was an assumption that the work carried out by PCN clinical directors would
be exempt from VAT because they would be involved in healthcare services. However, HMRC does not agree where the
role of the clinical director is leading and managing the PCN and supporting practices with planning, direction
and governance, rather than directly concerning the protection, maintenance or restoration of the health of the
patient."* (attributed to Jonathan Main, VAT and Indirect Taxes Partner at MHA Moore and Smalley, AISMA's
specialist VAT lead). And: *"the work carried out by PCN clinical directors on behalf of the practices in the
network would now be a standard rated service."*

It also carries Andrew Pow's structural point: *"The way PCNs have been commissioned does not work from a VAT
perspective"*, that a cost-sharing exemption may be available where staff sit in a federation or a
PCN-member-owned company, that *"many PCNs are loose arrangements with no formal structure for dealing with
VAT"*, and that irrecoverable VAT *"would reduce the budget available to the PCN by 20%"*.

**Corroboration value, which is why this is the most important fetch in the set.** The HMRC principal-purpose
formulation quoted here (*"the protection, maintenance or restoration of the health of the patient"*) matches
`house_positions.md` §6 and the VATHLT2010 two-part test **word for word**. Our live page already states the
principle correctly and hedges it ("this is a point to check, not a settled rule"). **AISMA is a primary-adjacent
source that lets the hedge tighten from "could" to "HMRC's stated position is", and the citation is available to
almost nobody else.**

**What it gets wrong or omits, and this is a DO-NOT-COPY.** It states *"the VAT-rated services threshold of
£85,000"*. **That figure is four years stale.** `house_positions.md` §6, re-verified 2026-08-26, locks the
registration threshold at **£90,000** and the deregistration limit at **£88,000**, both in force since 1 April
2024. **Never quote AISMA's £85,000.** It also covers no income tax, no National Insurance, no pension, no
payment routes and no employment status. It is a 480-word press release about one tax.

**Consequence for us.** We can cite the HMRC position from a named specialist-accountancy association, pair it
with the current threshold, and be the only page that does both. The whole rest of the topic is untouched here.

### 4.2 bma.org.uk, "The NHS pension scheme as a medical director" (HTTP 200)
`https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/the-nhs-pension-scheme-as-a-medical-director`
**Class: UNWINNABLE AUTHORITY** (`competitor_universe_2026-08-26.md` §2b; the language spec Part 4 point 4
records bma.org.uk as a vocabulary and heading-pattern source, never a rank target).

| | |
|---|---|
| H1 | `The NHS pension scheme as a medical director` |
| Stamp | `Location: UK · Audience: Consultants GPs · Updated: Friday 28 June 2024` |
| Word count | **~725** |
| H2s | `Additional pay from medical director duties`; `If you stop your duties before you retire`; `Is it always beneficial to pension my earnings?`; `Making your pay pensionable` |
| Tables / calculator / FAQ | None / none / none |

**Covers.** The closest thing in the market to a real answer on this page's pension question, and it is
specific. Verbatim: *"if you are working whole-time (10 PAs) and undertake medical or clinical director duties in
addition to your 10 PA (programmed activities) contract, this can only be pensionable if you are paid in the form
of a responsibility allowance"*; *"If you are paid additional PAs for the performance of these duties these will
not be treated as pensionable"*; *"If you are working part-time (fewer than 10 PAs), and undertake medical or
clinical director duties, these can be pensionable if paid as PAs up to 10 PAs."*

Also, and this is the sharpest sentence on the page: *"If you wish to pay pension contributions on this pay then
it is sensible to agree this at the start of the arrangement. It is not possible to subsequently alter your
contract without an objectively justifiable reason for doing so, as the pensions agency may view this a purely an
attempt to boost your pension."* Plus the loss case: if you die in service or retire on ill-health grounds during
non-pensioned director duties, *"your pensionable pay will not include these earnings"*. And the annual-allowance
caveat: a high earner *"may prefer not to pension these earnings"*.

**What it gets wrong or omits, and this is the single most important finding in the whole teardown.**
**This page is about SECONDARY CARE medical directors, not about GP PCN clinical directors.** Its entire
mechanism is programmed activities, a 10-PA whole-time contract, responsibility allowances and final-salary-link
pay protection, which is the machinery of an **employed hospital consultant on Agenda for Change / consultant
terms**. A GP PCN clinical director is typically a **partner in an independent contractor practice** whose
pensionable earnings derive from NHS-derived practitioner profit on the **Type 1 Annual Certificate**
(`house_positions.md` §2.C), and who has **no PAs at all**. The BMA page audiences itself "Consultants GPs" and
then answers only the consultant case.

**So the market's best pension answer is about the wrong role, and it does not say so.** A GP clinical director
reading it will conclude that a responsibility allowance is the answer, which is right only if they are salaried,
and will find nothing about the partnership, invoice or company routes at all.

**What we take, and what we must NOT take.** Take the two principles, which do generalise and which our live page
already carries correctly: **leadership pay is pensionable only when delivered in a recognised pensionable form,
not automatically**, and **contracts must not be re-engineered after the event to boost pension**. Take the
*consequence framing* (death in service and ill-health retirement on non-pensioned pay), which our page does not
have and which nobody else states. **Do NOT import the PA machinery.** Restating "10 PAs" and "additional PAs"
on a GP page would be a precision error dressed as depth, and the four-role fork it implies belongs to **O35**,
which is frozen (section 6 and section 7.3).

### 4.3 rbp.co.uk, "Is Your Practice Receiving The Right Network Payments?" (HTTP 200)
`https://www.rbp.co.uk/news/is-your-practice-receiving-the-right-network-payments`
**Class: PEER** (specialist medical accountancy firm).

| | |
|---|---|
| H1 | `Is Your Practice Receiving The Right Network Payments?` |
| Word count | **~1,381** |
| H3s | `Income receipts - what practices should expect`; `Bank accounts`; `Who should deal with the administration?`; `Who is paying network staff?`; **`Clinical director payment and payroll issues`**; `Don't lose out on staff funding - recruit now`; `How to spend the PCN network payment (£1.50 per patient)`; `How to spend the PCN participation payment (£1.76 per patient)`; `Future financial planning` |
| Tables / calculator / FAQ | None / none / none |
| Structure note | **Nine H3s and no H2s** in the content. The only H2 on the page is `Related Content` chrome. |

**Covers.** The only competitor page in the set with a heading dedicated to clinical director payment, and it is
the one that names the **mechanism** our page describes without naming. Verbatim: *"Clinical director payment.
The nominated practice should now be receiving a monthly payment in respect of the clinical director, the value
of which will relate to the size of the PCN. The amount being paid is 68.7p per patient."* Also: *"All the above
payments will have been paid into the nominated practice's own bank account along with their normal monthly NHS
income and will have been included on the practice's Open Exeter statements"*, and *"All monies relating to the
PCN should, therefore, immediately be transferred into the PCN bank account on receipt."*

**Two terms of art we do not carry and should.** **`nominated practice`** is the actual named role in the
payment chain, and **`Open Exeter`** is the statement the money appears on. Our live page says "the network funds
the director's practice" throughout and never uses either term. See section 6 point 3.

**What it gets wrong or omits, and it is stale to the point of being a hazard.** This page is written from
**2019**. It refers to the extended hours DES having *"been transferred to the PCNs as from 1st July 2019"*, tells
readers to query missing payments *"with your CCG"* (CCGs were abolished and replaced by ICBs on 1 July 2022),
gives the CD payment as **68.7p per patient**, the network payment as **£1.50 per patient** and the participation
payment as **£1.76 per patient**, and describes CD funding as a separate ring-fenced stream. **Every one of those
figures and structures is superseded**: `BATCH3_INDEX.md` O20 and our own live page record that clinical
director, leadership and management funding is now **combined into core PCN funding** within the Network
Contract DES. **None of RBP's per-patient figures may be reproduced.** They are not in `house_positions.md`,
they are seven years old, and the funding structure they describe no longer exists.

**Consequence for us.** The best-structured competitor treatment of clinical director payment is seven years
stale, has no H2s, contains no tax, no employment status, no pension and no VAT, and is written for a practice
manager reconciling a bank account. **Its one durable contribution is vocabulary (`nominated practice`,
`Open Exeter`), and vocabulary is free to take.**

### 4.4 icaew.com healthcare tax hub (HTTP 200, deep page HTTP 404)
`https://www.icaew.com/technical/healthcare/tax`
**Class: UNWINNABLE AUTHORITY / NON-RIVAL** (professional body).

The deep page indexed by search as "PCN's - Current hot topic tax issues"
(`/technical/healthcare/tax/pcns-current-hot-topic-tax-issues`) returns **HTTP 404**. The hub that does resolve
was extracted to text (**~6,006 words**) and searched: **the string `PCN` appears zero times on it.**

**Recorded rather than dropped, because the absence is the finding.** The accountancy profession's own healthcare
tax hub has no live PCN content at all, and its one indexed PCN page is dead. Combined with 4.1, 4.2 and 4.3 this
means **no currently-maintained, currently-accurate page on the UK web answers the question this page answers.**

### 4.5 gponline.com (HTTP 403, recorded not dropped)
`https://www.gponline.com/pcns-check-payment-rules-clinical-directors-avoid-tax-penalties/article/1675090`

Returns **HTTP 403** (5,750-byte block page) to `curl` with a browser user agent. **Its content was NOT read and
nothing from it may be used as a source.** It is recorded because its title, "PCNs must check payment rules for
clinical directors to avoid tax penalties", indicates it is directly on this page's topic, and because a search
snippet suggests it carries an IR35 point about who is *personally appointed* to the role. **That snippet is
unverified, was not read at source, and must not be written onto the page.** If the manager wants it, a human
read of the article is the only route.

### 4.6 nhsbsa.nhs.uk "Payments for Clinical Director duties" (HTTP 403, recorded not dropped)
`https://www.nhsbsa.nhs.uk/payments-clinical-director-duties`

Returns **HTTP 403**. This is the **scheme administrator's own page on the exact question**, and it is the single
most authoritative source that exists for the pension half of this topic. **It was not read.** Everything this
pack and the drafted page say about NHS pensionability therefore rests on `house_positions.md` §2.C, on the BMA
page at 4.2 (which answers the consultant case), and on the page's existing hedged framing. **The page's refusal
to assert a single pensionability answer is correct and must be preserved.** See section 7.4 and section 11.

### 4.7 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

Every theme present on any fetched competitor page, minus what our page already covers (section 6).
§9.9 floor 8 requires **zero undecided themes**. It is zero: **16 themes, 16 decisions.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **HMRC's stated position that CD leading-and-managing work is standard rated** (4.1) | **COVER** | Our page has the principle and hedges it as "a point to check". AISMA gives a named, quotable HMRC formulation matching `house_positions.md` §6 verbatim. Tighten the sourcing, keep the hedge on the reader's own facts. |
| 2 | **The current VAT registration threshold** (4.1 quotes £85,000, stale) | **COVER with the CORRECT figure** | **£90,000**, deregistration **£88,000**, `house_positions.md` §6, in force since 1 April 2024, re-verified 2026-08-26. Coordinator ruling 4: a statutory threshold is a fact about the reader's position, not our pricing, so it is publishable. **Never £85,000.** |
| 3 | **Cost-sharing exemption / federation or PCN-owned-company structuring as VAT mitigation** (4.1) | **DECLINE** | Structuring advice on a corporate reorganisation, beyond this page's scope, and it edges toward I3 (regulated-activity framing). Declined with reason. Name that structuring options exist and that specialist advice is needed, which the page already does. |
| 4 | **The 20% irrecoverable-VAT budget impact** (4.1) | **COVER, one sentence, as a consequence not a statistic** | It is arithmetic on the standard rate, not a survey figure, so F6 is not engaged. State it as "standard-rated at 20%, and irrecoverable in a loose PCN with no VAT structure". |
| 5 | **Leadership pay is pensionable only in a recognised pensionable form** (4.2) | COVERED ALREADY | Live page states it twice, correctly, in the Route 1 block and the "Honest Answer" H2. **Do not restate.** |
| 6 | **Contracts must not be re-engineered after the event to boost pension** (4.2) | COVERED ALREADY | Live page states it in the "Honest Answer" H2. **Do not restate.** |
| 7 | **The loss case: death in service or ill-health retirement on non-pensioned director pay** (4.2) | **COVER** | Genuinely absent from our page and from every other page in the set. It is the strongest argument for settling the route in advance and it converts an abstract "decide first" into a named consequence. |
| 8 | **Agree pensionability at the start; the pensions agency may refuse a later change** (4.2) | **COVER** | Our page says "decide and document before the work starts" as a general principle. The BMA gives the *reason it is refused later*, which is sharper and is the natural close of a new block. |
| 9 | **PA machinery: 10 PAs, additional PAs, responsibility allowance for whole-time vs part-time** (4.2) | **DECLINE** | Secondary-care consultant machinery on a GP page. A GP partner has no PAs. Importing it is a precision error, and the role fork it implies is **O35**, frozen to 2026-09-10. Declined with reason; see 7.3. |
| 10 | **Final-salary-link and voluntary protection of pay on giving up director duties** (4.2) | **ELSEWHERE** | 1995/2008 section final-salary mechanics belong to the NHS pension corpus, not here. Link only. |
| 11 | **`nominated practice` as the named payee in the payment chain** (4.3) | **COVER** | Real term of art, absent from our page, and it is the mechanism Route 1 already describes in generic words. Free precision. |
| 12 | **`Open Exeter` as the statement the payment appears on** (4.3) | **COVER, one line, then hand off** | Naming the artefact is ours. **How practice income is recognised and reconciled against the PCSE statement is O26** and belongs to `/blog/gp-practice-income-pcse-statement-reconciliation`. One sentence and a link, never the reconciliation. |
| 13 | **68.7p per patient CD payment; £1.50 network payment; £1.76 participation payment** (4.3) | **DECLINE, BANNED** | 2019 figures describing a funding structure that no longer exists (CD funding is now inside core PCN funding). Not in `house_positions.md`. See 7.4. |
| 14 | **CD funding as a separate ring-fenced stream; CCGs; extended hours DES transfer** (4.3) | **DECLINE** | Superseded. CCGs were replaced by ICBs on 1 July 2022. Our page already states the correct current position (funding combined into core PCN funding). |
| 15 | **PCN bank accounts, who administers the funds, transferring money from the nominated practice** (4.3) | **ELSEWHERE** | PCN money-flow and governance is **O20**, `/blog/pcn-funding-network-contract-des-explained`. One sentence at most, then link. |
| 16 | **IR35 / who is personally appointed to the role** (4.5, HTTP 403, unread) | **DECLINE, unsourced** | The snippet was never read at source and **O31 assigns IR35 and off-payroll to wave D, one page only, owner deliberately unnamed.** Our page already carries more IR35 than O31 will eventually permit (section 6 point 7). Adding to it is the wrong direction. |

---

## 5. Whitespace

What nobody in the peer set covers, quotably.

1. **Nobody has written a currently-accurate page on this topic at all.** Eleven URLs attempted, three returned
   200 with relevant content, and each answers a different quarter of the question: AISMA answers VAT only and
   is 2022 with a stale threshold; the BMA answers pension only and answers it for the wrong role; RBP answers
   the payment mechanism only and is 2019 with superseded figures and abolished institutions. The ICAEW
   healthcare tax hub has zero PCN content and its one indexed PCN page 404s. **The page that sets out the
   payment routes and gives the income tax, National Insurance, VAT and pension consequence of each does not
   exist anywhere except ours.** That is an unusually clean statement of whitespace and it is the whole thesis
   of this pack.

2. **THE OWNERSHIP INVERSION, which is the most actionable finding in the pack.** Three clinical-director
   queries with **5 impressions, 1 click and average positions 6.0 to 7.0** are landing on
   `/blog/pcn-funding-network-contract-des-explained` (`GetPageQueryStats`, 2026-08-26, section 2.3.1), while
   the page that owns the CD payment under **O22** has **zero named-query rows**. `what is pcn cd element of core
   pcn funding 23/24`, `what is pcn cd element of core pcn funding 24/25` and `pcn clinical director funding`
   are a practice manager asking what the CD element is worth and how it is calculated. **O22's first clause is
   "how the CD payment is calculated". That question is ours and it is being answered by the wrong page.**
   No competitor is involved in this at all; we are competing with ourselves and losing to our own sibling.

3. **Nobody names the payment route as the variable.** All three live competitors describe *one* route as
   though it were the arrangement: RBP describes the nominated-practice route as what happens, the BMA describes
   the responsibility-allowance route as what happens, AISMA describes the practice-invoices-the-network route as
   what triggers VAT. **Not one of them tells the reader there is a choice, or that the choice is what decides
   the tax.** Our page's four-route spine is a genuine structural differentiator and it is already built.

4. **The loss case is unstated everywhere.** Only the BMA touches it, in one clause, buried, and only for
   consultants: die in service or retire on ill-health grounds during non-pensioned director duties and
   *"your pensionable pay will not include these earnings"*. **Nobody pairs that with the company route**, where
   our page already establishes the accrual is lost outright. The pairing (choose a non-pensionable route, and
   the cost is not only lost accrual but a reduced death-in-service and ill-health benefit) is available to us
   and to nobody else in the set.

5. **Nobody explains why the answer cannot be changed later.** The BMA gives the reason in one sentence
   (*"the pensions agency may view this a purely an attempt to boost your pension"*) and does not develop it.
   Our page states the rule and not the reason. The gap between "settle it first" and "here is what happens if
   you do not, and why you cannot fix it afterwards" is a whole section nobody has written.

6. **`nominated practice` and `Open Exeter` appear on no page of ours.** Two terms of art that a practice manager
   uses daily, present in the market (4.3), absent from our corpus. The precision is free and it is the
   vocabulary a reader searching the CD element would actually type.

7. **The VAT registration-threshold interaction is stated by nobody with a current figure.** AISMA raises the
   registration point and gives **£85,000**. Our page raises it and gives no figure at all. **The correct figure
   is £90,000 (`house_positions.md` §6, re-verified 2026-08-26).** A practice already near the threshold for
   other reasons being tipped over by adding a taxable management supply is a real, checkable, current position
   and there is currently no page on the UK web that states it correctly.

### KEEP, explicitly

Per §9.3 and rule K1 the specialist layer is never traded away. These are this page's differentiators and stay
exactly as they are:

- **The four-route spine** (member practice, partnership invoice, personal service company, self-employed
  direct), each with `Mechanics.` / `Tax.` / `Pension.` run-in labels. It is the structure no competitor has.
  **KEEP, and do not interleave new H2s into it.**
- **The refusal to assert a single pensionability answer.** The page says in terms that "this page does not
  assert a single answer" and directs the reader to confirm with practice, network and PCSE. Given that NHSBSA's
  own page on the question returned **HTTP 403** and was never read (4.6), that refusal is not timidity, it is
  correct. **KEEP.**
- **The one clear negative**: company and dividend income is never NHS pensionable, so the PSC route always loses
  the accrual. Aligned with `house_positions.md` §2.C ("a limited company cannot hold a GMS/PMS contract",
  "income routed through a company is not NHS-pensionable", "dividends are not pensionable"). **KEEP.**
- **The instruction to pair the incorporation tax saving with the pension-accrual loss.** §2.C: "Always pair any
  incorporation tax saving with the pension-accrual loss." The page does this explicitly. **KEEP.**
- **The VAT watch-item on Route 2**, correctly hedged as a point to check. **KEEP.**
- **The "decide and document before the work starts" close** and the four-question checklist in
  `Getting It Documented`. **KEEP.**
- **The annual-allowance-at-the-margin point**: pensionable is not always worthwhile for a high earner. **KEEP.**
- **All 14 FAQs and all 5 key takeaways.** Coordinator ruling 1: existing substantive FAQ entries are never
  deleted to hit the 4-to-8 band. **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/pcn-clinical-director-payments-tax.md`, read in full 2026-08-26.

| | |
|---|---|
| Word count | **4,387** (`wc -w` on the source file, includes frontmatter) |
| `metaTitle` | `PCN Clinical Director Payments: Tax & Pension` (44 characters) |
| `h1` | `PCN Clinical Director and Leadership Payments: How They Are Taxed and Pensioned` |
| Frontmatter `title` | `PCN Clinical Director Payments: Tax and Pension Explained` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| H2 count | **10** |
| Question-form H2s | **0 of 10 (0%)** |
| FAQ entries | **14** |
| Key takeaways | **5** |
| Tables | **None** |
| Worked example | **None** |
| `£` figures on the page | **0** |
| Em-dashes | **0** |

**Current heading list, verbatim and in order** (frozen under K2, reproduced here as the byte-identity
reference):

1. `What the Clinical Director and Leadership Funding Is`
2. `Why the Payment Route Is the Whole Question`
3. `Route 1: Paid Through a Member Practice`
4. `Route 2: Invoiced From the Director's GP Partnership`
5. `Route 3: Paid Via a Personal Service Company`
6. `Route 4: Paid Direct as Self-Employed Income`
7. `So Is Clinical Director Pay Pensionable? The Honest Answer`
8. `The Annual Allowance Angle for High-Earning Directors`
9. `Getting It Documented`
10. `How We Help GP Practices and PCN Clinical Directors`

**Specialist-depth baseline for the K1 gate** (counts on the current file; the drafted version must be greater
than or equal to every one of these):

| Term | Count |
|---|---|
| `VAT` | 23 |
| `IR35` | 8 |
| `off-payroll` | 5 |
| `Class 4` | 5 |
| `PCSE` | 5 |
| `Class 1` | 4 |
| `responsibility allowance` | 4 |
| `corporation tax` | 3 |
| `self assessment` | 3 |
| `Type 1` | 2 |

### Blunt read

**This is a good page, it is correct against house positions, and it is invisible.** It carries 4,387 words, 14
FAQs, a genuinely differentiating four-route structure and zero factual errors, and Bing has named-query rows for
it on **zero** queries while routing this page's own topic to its sibling.

Specifically:

1. **It contains no figure of any kind.** Zero `£`, zero percentages, zero dates beyond the frontmatter. Under
   rule **D1** ("no paragraph of pure generality", flag any 40+ word paragraph with no number, date, proper noun
   or form name) several paragraphs pass only on proper nouns. Under **A4** the page is a conditional answer and
   states the condition, which is correct, but a reader asking "how much" gets nothing. **The current VAT
   threshold (£90,000, `house_positions.md` §6) is the one genuinely current, publishable, checkable figure
   available to this topic and it is not on the page.**

2. **It never uses the abbreviation `CD`.** Zero occurrences. The live Bing evidence (section 2.3.1) shows the
   market types `pcn cd`, and every one of those impressions goes to the sibling. This is the clearest
   single-token gap on the page.

3. **It never uses `nominated practice` or `Open Exeter`.** Route 1 says "The network funds the director's
   practice, and the practice pays the director", which is the right mechanism in the wrong words. `per patient`
   also appears zero times, so the scaling of the CD element (explicitly O22's, "how the CD payment is
   calculated") is described only as "the value relates to the size of the PCN" nowhere on the page at all.

4. **It never says `employment status`, `employed or self-employed`, or `clinical director salary`.** The page is
   *about* an employment-status question and does not contain the phrase. This is the same failure mode as the
   QOF page carrying "Quality and Outcomes Framework" throughout and never `gp qof`.

5. **Zero question-form H2s against rule B4's 50% to 75% band.** This is **not a defect and must not be
   "fixed"**: coordinator ruling 2 says structural bands on an EXTEND page are scored against the EXTEND reality,
   a frozen structure can make the band unreachable, and a writer must never contort a page to reach a band the
   grade forbids. New H2s should be question-form where natural, which will move the ratio, and the ratio is
   **reported, not gated**.

6. **Rule E1 is violated, live, and it is not fixable under EXTEND.** `PCSE` appears 5 times and
   **`Primary Care Support England` appears 0 times.** E1 requires the expansion on first use, plus what it does
   in one clause, plus the nation caveat (local health board in Wales, separate arrangements in Scotland and
   Northern Ireland). The page glosses it only as "(the GP pension agency)" and "the pension agency (PCSE)".
   **Rule E2 is also violated**: `Type 1` appears twice, only as "the Type 1 Annual Certificate of Pensionable
   Profits", never saying that Type 1 *is a GP provider or partner*. **V2 is a live standard and older pages are
   checked against current rules**, so these are real findings. **The fix is additive**: the writer expands PCSE
   in full, with the nation caveat, on its **first occurrence inside a NEW block**, and glosses Type 1 as a role
   there. Existing sentences are not touched. **This does not fully satisfy E1's "first use" test, because the
   new blocks sit after the existing ones. Recorded as a known partial compliance rather than claimed as a fix,
   and reported to the manager in section 10.**

7. **A pre-existing O31 ownership breach, and EXTEND forbids the writer fixing it.** `IR35` appears **8** times
   and `off-payroll` **5** times, across the Route 3 body block and a dedicated FAQ (`Does IR35 apply if I use a
   personal service company?`, roughly 70 words explaining the three hirer types and who issues the
   determination). **O31 assigns IR35 and off-payroll for locum doctors to wave D, one page only, owner
   deliberately unnamed until D is scoped against the unfrozen hub.** This block predates the ownership map
   (generated 2026-06-03), so it is not writer error; it is the map applied to a page written before it existed.
   **This is the same shape as defect D8 on the sibling PCN page.** Handling: identical to D8. The writer's
   **new-IR35-sentence allowance is ZERO**, nothing existing is touched, and the block is escalated rather than
   resolved. See section 10, correction 2.

8. **The annual-allowance H2 sits at the ceiling of O2 and should be watched, not touched.**
   `The Annual Allowance Angle for High-Earning Directors` runs two paragraphs. **O2 gives annual-allowance
   mechanics (taper, threshold and adjusted income, pension input amount, carry forward, MPAA) to
   `/calculators/nhs-pension-annual-allowance`.** The section is compliant as written: it names the taper and
   glosses the pension input amount as growth (correct per E7) without stating a single figure, and it links to
   the owner twice. **It is at the line and must not be extended.** New blocks add **zero** annual-allowance
   sentences.

9. **Nothing on the page contradicts `house_positions.md`.** Checked against §1 (employment status follows
   substance not label; partner SA800/SA104 and Class 4; salaried PAYE and Class 1), §1.A (off-payroll, public-
   sector hirer determines status, April 2024 PAYE-offset is a set-off mechanic only), §2.B (pension input
   amount is growth, taper), §2.C (a company cannot hold a GMS/PMS contract, company and dividend income is not
   NHS-pensionable, Type 1 Annual Certificate, always pair the tax saving with the accrual loss), §3 (funding
   structure, partner income is profit share not salary), §5 (corporation tax then extraction, 2026/27 dividend
   rate rise) and §6 (VAT medical exemption, principal-purpose test, management work standard rated). **All
   correct.** The one sentence that could have been stale is the 2026/27 dividend reference in the Route 3 body
   block, and it is correctly forward-dated.

10. **No em-dashes, no "Worked example" label, no "it is not X, it is Y" construction, no numeral-count paragraph
    opener, no "also searched as".** Checked by string search. The page is clean against I1, G6/J4, V5 and V2's
    known live violation pattern. It also does not open with a corrective clause, which matters for V9 point 3
    (batch 3 is the third batch and the house reflex should be varied deliberately).

11. **It is not thin and the gap is not quality.** 4,387 words, correct throughout, structurally differentiated.
    **The gap is vocabulary and figures**, and the sibling page is currently absorbing the demand.

---

## 7. THE OWNERSHIP MAP (binding), and this pack's central problem

> **THE STANDING RULE, restated because it is the reason this document exists.**
> **Every shared fact has exactly ONE owning page. Every other page gets one sentence and a link, never the
> explanation. A writer who needs three sentences is taking someone else's fact and must stop.**
>
> **V7 IS BINDING: where a conductor's brief and the ownership map disagree, THE MAP WINS.** The writer follows
> the map, states neither fact, and reports the conflict. A brief is an instruction about ONE page; only the map
> can see the batch.

### 7.0 The rows that constrain this page, reproduced verbatim and in full from `BATCH3_INDEX.md` §6

#### This page's own row

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O22** | **PCN clinical director payments**: how the CD payment is calculated, whether it is employment or self-employment income, how it is taxed, and how it interacts with a partner's profit share. | `/blog/pcn-clinical-director-payments-tax` | The PCN funding page gets one sentence, then link. **No tax treatment stated anywhere else.** |

#### Inherited rows (§6.1) that bind this page

| # | Shared fact | Owner | Batch-3 consequence |
|---|---|---|---|
| O2 | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | Waves D, E, F, H: one sentence, then link. |
| O10 | **Global Sum per weighted patient (£130.07, 2026/27, VERIFIED)** and the QOF point value (**£227.95, 2026/27, VERIFIED, see the ruling below**) | `house_positions.md` §3.A and §3.B | Wave A: the GMS page may state £130.07 with its year tag. **No page in wave A states a QOF point value, but the reason is now ownership (O25), not verification.** |
| O13 | GP practice reimbursement for parental-leave cover under the SFE | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | **Wave A**: the GMS and enhanced-services pages get one sentence and a link. This is a real collision, see O19. |
| O17 | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **Wave A**: the dispensing page gets one sentence on zero-rating and a link. **Wave F**: `private-practice-tax-nhs-and-private-income` gets one sentence. Neither explains the exemption. |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | All waves: one sentence, then link. |

> **O10 RULING, 2026-08-26, reproduced because the writer will otherwise re-raise it.** The QOF point value is
> VERIFIED and the O10 verification ban on it is lifted; `house_positions.md` §3.B locks **£227.95 for 2026/27**
> and §3.A locks the Global Sum at **£130.07 for 2026/27**. Only the **GMC annual retention fee** remains
> UNVERIFIED, and its ban stands. **Language spec F5 is narrowed to the GMC annual retention fee alone.**
> **What does NOT change is the ownership fence.** No wave-A page other than the owner states these figures,
> because O19 gives the Global Sum to the GMS page and O25 gives QOF to
> `/blog/qof-income-gp-practice-accounting-explained`. **A verification ban and an ownership fence are different
> things and a writer must not read the lifting of one as the lifting of the other.**
>
> **Consequence for THIS page: nothing changes. State neither figure.** Not £130.07, not £227.95, not a GMC fee.

#### New wave-A rows (§6.2) that fence this page

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12 (`what is a GMS contract`, `apms contract`, 1,140 peer-winnable).** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** Batch 1 put the tier table on three pages that did not own it; this is the same shape and it is pre-empted here. |
| **O20** | The **Network Contract DES and the PCN funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. | `/blog/pcn-funding-network-contract-des-explained` | The ARRS and clinical-director pages get **one sentence** placing their subject inside the DES, then link. The GMS page gets one sentence saying PCN money sits outside the core contract, then link. |
| **O21** | **ARRS**: which roles are reimbursable, the reimbursement mechanics and caps, **who employs ARRS staff**, the payroll, pension and employer-NIC consequences, and the VAT trap when staff are shared between practices. | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | The PCN funding page gets **two sentences** naming ARRS as a DES strand and hands off. It must not explain the employment model. |
| **O23** | **Locally commissioned and enhanced services**: DES vs LES vs national enhanced services, how they are contracted, invoiced and recognised in the accounts. | `/blog/enhanced-services-gp-practice-income-tax` | The GMS page gets one sentence naming enhanced services as a funding stream, then link. |
| **O24** | **Dispensing practice income**: the dispensing fee and drug-reimbursement structure, and the **zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12** as distinct from the Sch 9 Group 7 medical-care exemption. | `/blog/dispensing-practice-income-accounts-tax` | Wave A: no other page mentions dispensing income at all. **O17 still binds**: this page states the zero-rating in **one or two sentences** as the contrast, and does not explain the exemption, which belongs to the frozen `gp-vat-registration`. |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **Wave A: one sentence and a link, on every page.** Not reopened in this batch. **No page states a QOF point value (O10, hard fail F5).** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | Wave A: every page that mentions a payment landing gets **one sentence** and a link. Five pages describing income recognition five times is the batch-1 failure. |

#### Cross-wave rows (§6.2) that bind this page

| # | Shared fact | **Owner** | Note |
|---|---|---|---|
| **O31** | **IR35 and off-payroll for locum doctors**: the three hirer types, who issues the SDS, the April 2024 PAYE-offset change. | Wave D, **one page only, to be named when D is scoped against the unfrozen hub** | Four surfaces currently carry it. This row is deliberately left with a placeholder owner rather than guessed, because naming it now would be naming it without reading the frozen hub. |
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | Surplus-cash, FIC, s455 and gp-corporation-tax pages: one sentence, then link. |
| **O35** | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

### 7.1 What this page may write, in one table

| Fact | Owner | This page's allowance |
|---|---|---|
| How the CD payment is calculated and scaled | **O22, THIS PAGE** | **Unlimited. This is ours and it is currently unwritten.** |
| Whether the CD payment is employment or self-employment income | **O22, THIS PAGE** | **Unlimited, subject to 7.3.** |
| How the CD payment is taxed, and its NIC class, on each route | **O22, THIS PAGE** | **Unlimited.** |
| How the CD payment interacts with a partner's profit share | **O22, THIS PAGE** | **Unlimited.** |
| The Network Contract DES and the core PCN funding envelope | O20, sibling | **ONE sentence, then link.** Already spent on the live page. |
| Global Sum, Carr-Hill, £130.07, GMS vs PMS vs APMS | O19, GMS page | **ONE sentence naming core funding, then link. No figure.** |
| ARRS roles, caps, who employs ARRS staff | O21, ARRS page | **ONE sentence, then link.** Already spent. |
| Enhanced services / LES | O23 | **ONE sentence, then link.** Not currently used. |
| Dispensing income | O24 | **ZERO. No other wave-A page mentions it.** |
| QOF, and any QOF point value | O25 / O10 | **ONE sentence and a link at most. No figure.** Not currently used. |
| Income recognition and PCSE statement reconciliation | O26 | **ONE sentence, then link.** Naming `Open Exeter` is ours; reconciling it is not. |
| The VAT medical exemption itself | O17, frozen `gp-vat-registration` | **The exemption is NOT explained.** The page states that management work falls outside it and links. The registration threshold figure is permitted (7.4). |
| Annual allowance mechanics | O2 | **ZERO NEW SENTENCES.** The existing H2 is at the ceiling. |
| IR35 / off-payroll | O31, wave D, unnamed | **ZERO NEW SENTENCES.** Pre-existing breach, escalated not fixed. |
| Salary versus dividend extraction, dividend rates | O34, wave C | **ZERO NEW SENTENCES.** The existing Route 3 reference is at the ceiling. |
| The four-role employment-status fork | **O35, FROZEN** | **See 7.3. This is the pack's central problem.** |

### 7.2 The conflict between this pack's brief and the map, declared

The writer brief for this page instructs the writer to treat the sibling's CD queries as "a real, measurable
ownership signal" and to use it in sections 2 and 5. **That instruction is consistent with the map and is
followed.** No conflict arises on that point.

**One instruction in the brief is narrower than the live data and has been widened, not overridden.** The brief
names one sibling CD query; the re-pull found three (section 2.3.1). The brief itself directs that where a
re-pull disagrees, the re-pull wins and the divergence is recorded. Recorded.

**No brief-versus-map conflict of the V7 kind was found on this page.** Stated explicitly so its absence is a
finding rather than an omission.

### 7.3 THE CENTRAL PROBLEM: O35 versus O22, ruled

**The problem, stated plainly.** This page's topic *is* an employment-status question. Its H1 asks how the
payments are "Taxed and Pensioned", its second H2 says "the payment route is the whole question", and its four
routes are four answers to "employed or self-employed". **The page that owns the general employment-status fork
for doctors is `/blog/gp-partner-vs-salaried-gp-tax-comparison`, and it is FROZEN to 2026-09-10.** So the page
whose subject is a status question cannot write the status framework, and cannot even be read against for
differentiation.

**THE RULING.**

> **O22 gives this page the status treatment OF THIS SPECIFIC PAYMENT. O35 keeps the general fork.**
>
> The dividing line is the **subject of the sentence**. A sentence whose subject is a **payment route**
> ("the clinical director payment, when it is delivered through the nominated practice, is...") is **O22's and
> this page writes it freely**. A sentence whose subject is a **doctor's role** ("a GP partner is taxed on...",
> "a salaried GP is an employee who...") is **O35's**, and this page gets **one** such sentence in total,
> immediately followed by the link to the owner.

**Why this is the defensible line and not a convenience.** O22's own wording is "whether it **is** employment or
self-employment income" - the subject is *the payment*, not the person. O35's wording is "the employment-status
fork **for doctors**" - the subject is *the person*. The map already draws the line where this ruling draws it;
this section only makes it countable.

**THE COUNTABLE CRITERION (a QA agent applies this without judgement).**

Over the **NEW copy only** (existing text is frozen and is not counted):

1. **Count every sentence whose grammatical subject is one of the O35 role-nouns**: `GP partner`, `partner`,
   `salaried GP`, `locum`, `hospital consultant`, `consultant`, **and** whose predicate states a tax, NIC,
   return or status treatment. **Cap: 1.** Above 1 is a **BLOCK**.
2. **The one permitted sentence must be followed, within the same or the next sentence, by a link to
   `/blog/gp-partner-vs-salaried-gp-tax-comparison`.** Absent link is a **BLOCK**.
3. **Count occurrences in NEW copy of the O35 return codes: `SA800`, `SA104`, `SA103`. Cap: 0.** Any occurrence
   is a **BLOCK**. These are the four-role table's identifiers and their presence is the signature of rebuilding
   it.
4. **No table, list or parallel construction in NEW copy may enumerate three or more doctor roles with a
   treatment against each.** One is the four-role table by another name. Any such structure is a **BLOCK**,
   regardless of how it is formatted.
5. **Sentences whose subject is a payment route are uncapped**, including sentences that name a role as the
   *recipient* rather than the subject ("where the payment is delivered through the nominated practice to a
   partner, it..."). This is the clause that keeps the page writable.

**What the live page already does, assessed against this ruling and NOT to be changed.** Route 1's body carries
"A salaried director is taxed under PAYE with Class 1 National Insurance. A partner is taxed on profit share with
Class 4 National Insurance", immediately followed by the link to O35's owner. Two FAQs are framed by role
(`How is clinical director pay taxed if I am a salaried GP?` and `How is it taxed if I am a GP partner?`), each
also linking to O35's owner. **Under the criterion above that is four role-subject sentences against a cap of
one.** It is **pre-existing, it predates the ownership map (page generated 2026-06-03), K2 freezes every one of
those strings, and each already carries the required link.** **The writer changes none of it.** The cap of 1
applies to **new copy only**, and given the four already present, the pack sets the **new-copy role-subject
sentence allowance to ZERO** and requires the writer to write every new status sentence with a **payment route**
as its subject. Escalated to the manager in section 10, correction 2, alongside the O31 breach, as one decision
rather than two.

**One further constraint the writer will otherwise trip over.** The four routes are **not** the four roles.
Route 1 covers both a salaried GP and a partner; Routes 2 and 4 are both self-employed but differ in who
contracts. **New copy must never present the four routes as though they mapped onto the four roles**, because
that is the O35 table smuggled in through this page's own structure. If a new block needs to show the mapping, it
shows **route to treatment**, never **role to treatment**.

### 7.4 Figures: what is permitted and what is BANNED

**PERMITTED, and this is the page's one currently-publishable figure.**

| Figure | Year tag | Source | Why permitted |
|---|---|---|---|
| VAT registration threshold **£90,000** | in force since 1 April 2024, current for 2026/27 | `house_positions.md` §6, re-verified 2026-08-26 at https://www.gov.uk/register-for-vat/when-to-register | O17 fences the **explanation of the exemption**, not the registration threshold, which is a general VAT fact the page needs to make its own VAT watch-item actionable. Coordinator ruling 4: a statutory threshold is a fact about the reader's position, not our pricing. Rule F1 satisfied by the effective date. |
| VAT deregistration threshold **£88,000** | same | same, plus VAT Notice 700/1 supplement | Optional, same reasoning. Include only if the page uses it. |
| Standard rate **20%** | current | `house_positions.md` §6 and AISMA 4.1 | Arithmetic on the standard rate, not a statistic. F6 not engaged. |

**BANNED FIGURES on this page. None of these may be asserted.**

| Banned | Why | What the page says instead |
|---|---|---|
| **£85,000** VAT threshold | AISMA 4.1 quotes it and it is **four years stale**. `house_positions.md` §6 locks £90,000 from 1 April 2024. | £90,000, with its effective date. |
| **68.7p per patient** clinical director payment | RBP 4.3, a **2019** figure describing a ring-fenced CD stream that no longer exists. Not in `house_positions.md`. | The CD element sits inside core PCN funding and scales with PCN population; confirm the current value at source. |
| **£1.50 per patient** network payment, **£1.76 per patient** participation payment | RBP 4.3, 2019, and both are **O20's** subject matter in any case. | Nothing. One sentence naming core PCN funding, then link to the sibling. |
| **£34,279** or any worked CD remuneration figure for a stated PCN size | Appears only in an unread search snippet (4.5, HTTP 403). Never read at source. F6 and F4. | Nothing. |
| Any **Global Sum per weighted patient** figure, including **£130.07** | **O19 ownership fence.** The figure is VERIFIED (O10 ruling) and the ban here is ownership, not verification. | One sentence naming core GMS funding, then link to the GMS page. |
| Any **QOF point value**, including **£227.95** | **O25 ownership fence** (O10 ruling: verified, but fenced). | One sentence and a link at most, or nothing. |
| Any **GMC annual retention fee** | **UNVERIFIED**, `house_positions.md` §8 and the Verification log; GMC returns HTTP 403. **Hard fail F5**, which the O10 ruling narrows to this item alone. | Not applicable to this page; listed for completeness of the ban. |
| Any **dividend rate**, **corporation tax rate** or **s.455 rate** | **O34 fence** (wave C) plus O31 adjacency. The existing Route 3 text is at the ceiling. | Nothing new. The existing link to the corporation tax guide stands. |
| Any **annual allowance figure** (£60,000, £200,000, £260,000, £10,000) | **O2 fence.** | Nothing. The existing H2 links to the owner. |
| Any **NHS tiered contribution rate or band** | **O1 fence.** | Nothing. |
| Any **fabricated or unsourced statistic**, "most PCNs", "many clinical directors", a percentage without a named source | **F6 and I6, hard fails.** | Nothing. |

**Countable test: count of banned-figure assertions on the page = 0.**

**A note on rule G1 and worked examples.** G1 requires exactly one worked example on any page whose topic
involves a calculation, a threshold or a band. **This page is now borderline and the pack rules it NO worked
example.** The reason is that the only arithmetic available is the CD element per patient, and every figure for
it is either banned (68.7p, £34,279) or fenced (the core-funding envelope is O20's). A worked example built on a
labelled illustrative CD payment would be permissible in principle, but it would necessarily also model the tax
on it, and the tax differs by route, so the example would either pick one route (misleading) or become a
four-way table (a section pretending to be an example, G7). **G1 is therefore reported as a deliberate,
reasoned non-compliance rather than a miss**, per V8's principle that a band is a shape check and the miss is
reported. If the writer finds a clean single-route example that stays inside the figure rules, it is permitted;
it is not required.

---

## 8. Deterministic acceptance criteria

### 8.1 Phrases that MUST appear verbatim (case and punctuation normalised)

**Read section 3.3 before scoring this list.** The DataForSEO harvest returns **zero** rows for this topic, so
this is **not** a harvested market-phrasing list and **no volume figure is given for any phrase, because none
exists and none may be invented**. Each phrase carries its tier and its evidence.

**Tier M, MEASURED. Live Bing `GetPageQueryStats` demand, currently landing on the sibling page (section 2.3.1),
absent from this page. These are the phrases the 14/28-day read is measured on as DEMAND.**

| # | Phrase | Evidence | On page now |
|---|---|---|---|
| M1 | `pcn cd` | Bing `GetPageQueryStats`, sibling URL, 2026-08-26: `what is pcn cd element of core pcn funding 23/24` (3 impr, pos 7.0) and `...24/25` (1 impr, **1 click**, pos 7.0) | **no** (`CD` appears 0 times on the page) |
| M2 | `cd element of core pcn funding` | same two rows | **no** |
| M3 | `pcn clinical director funding` | Bing `GetPageQueryStats`, sibling URL, 2026-08-26: 1 impr, pos 6.0 | **no** (`clinical director funding` appears once, without `pcn`) |

**Tier R, REASONED. Derived from the competitor pages fetched in section 4 and from this page's own topic. No
volume figure exists for any of these and none is claimed. Scored as PRESENCE only, never as demand.**

| # | Phrase | Source | On page now |
|---|---|---|---|
| R1 | `nominated practice` | rbp.co.uk 4.3, verbatim term of art in the payment chain | **no** (0 occurrences) |
| R2 | `Open Exeter` | rbp.co.uk 4.3 | **no** (0 occurrences) |
| R3 | `employment status` | the page's own subject; absent from it | **no** (0 occurrences) |
| R4 | `employed or self-employed` | O22's own wording ("whether it is employment or self-employment income") | **no** (0 occurrences) |
| R5 | `clinical director salary` | the plain-language phrasing of the question the page answers | **no** (0 occurrences) |
| R6 | `per patient` | the scaling mechanism of the CD element, which is O22's ("how the CD payment is calculated") | **no** (0 occurrences) |
| R7 | `standard rated` | aisma.org.uk 4.1, HMRC's own word for the VAT outcome | **no** (page says "taxable supply", never "standard rated") |
| R8 | `VAT registration threshold` | `house_positions.md` §6; the page raises the threshold point without the term or the figure | **no** |
| R9 | `Primary Care Support England` | **rule E1**, violated live (section 6 point 6) | **no** (0 occurrences) |
| R10 | `death in service` | bma.org.uk 4.2, the loss case nobody pairs with the route decision. Also `language_spec` §2d records `death in service` as **0 files** across the whole 105-page corpus | **no** |

**Countable test: 13 of 13 present in the drafted page. Any absent phrase is a named BLOCK.**

**V1 hard cap applies and is the reason this list is 13 and not 30.** Two word orders per idea per page, counted
as **non-overlapping longest matches, never raw substrings**. M1 (`pcn cd`) nests inside M2
(`cd element of core pcn funding`); a naive substring counter will report both plus a third from
`pcn clinical director funding` and BLOCK a compliant page. **Match longest first, consume the matched span,
count what remains. Any V1 finding must quote the spans it counted.** The `pcn` + `clinical director` idea is
capped at **two** distinct orders on this page; M1/M2 are one family and M3 is the second, and no third order
may be added.

**Placement guidance, not a gate.**
- M1 and M2 belong together in **one new H2 that answers what the CD element is and how it scales**, which is
  O22's own first clause and the exact question the sibling is currently absorbing. This is the single highest-
  value block in the pack.
- R1 and R2 belong in that same block, describing the payment chain in the market's words, with **one sentence
  and a link** to `/blog/gp-practice-income-pcse-statement-reconciliation` (O26) and **one sentence and a link**
  to the sibling (O20). Not more.
- R3, R4 and R5 belong in a **new FAQ question**, not in a heading, and must be phrased with the payment as the
  subject per 7.3.
- R7, R8 and the £90,000 figure belong in **one new VAT H2**, which is also where AISMA's HMRC formulation is
  cited. **Never £85,000.**
- R9 (`Primary Care Support England`) is placed at the **first occurrence of PCSE inside a new block**, with the
  nation caveat, per E1. Section 6 point 6 records why this is partial compliance.
- R10 belongs in the pension block, paired with the route decision, per whitespace point 4.

### 8.2 Equity preservation (§9.9 floor 5)

**This page has ZERO named Bing queries and ZERO Google rows (section 2), so there is no named-query equity set
to preserve.** The gate reduces to one number.

**Countable test: the page-level Bing average impression position must remain at 4.0 or better** at the 28-day
read (`GetPageStats`, page level, named endpoint). No named query can be lost because none exists.

**The sibling's three CD queries are NOT this page's equity and must not be counted as a loss if they move.**
If they migrate from the sibling to this page, that is the intended outcome of the pack, not a regression on the
sibling. **Score them at the wave level, across both URLs, never per page.** This is stated explicitly because
a per-page read would record a successful outcome as a sibling regression.

### 8.3 EXTEND byte-identity

Diff the pre and post files. The following must be byte-identical:

- `title: "PCN Clinical Director Payments: Tax and Pension Explained"`
- `metaTitle: "PCN Clinical Director Payments: Tax & Pension"`
- `h1: "PCN Clinical Director and Leadership Payments: How They Are Taxed and Pensioned"`
- `metaDescription`, `slug`, `canonical`, `category`, `date`, `generator`, `author`, `image`, `imageCredit`,
  `altText`, `summary`
- **All 10 existing H2 strings, in their existing relative order** (section 6)
- **All 14 existing FAQ question and answer strings**
- **All 5 existing `keyTakeaways` strings**
- Every existing `<p>` block and every existing `<strong>` run-in label

**Countable test: `git diff` shows ONLY additions. Deletion count must be 0.** There is no cleared escalation on
this page, so the permitted deletion count is **zero with no exception**.

### 8.4 K1, no net deletion of specialist depth

**Countable test:** every term count in the section 6 baseline table must be **greater than or equal to** its
current value in the drafted page. Since the change is additive-only and deletion count is 0, this passes by
construction; it is listed so QA records the numbers rather than assuming them.

### 8.5 Ownership-fence tests (the ones batch 1 failed)

| # | Test | Pass condition |
|---|---|---|
| F-a | Sentences in NEW copy explaining the Network Contract DES or the core PCN funding envelope (O20) | **<= 1**, and it links to `/blog/pcn-funding-network-contract-des-explained` |
| F-b | Sentences in NEW copy explaining the Global Sum, Carr-Hill, GMS vs PMS vs APMS (O19) | **<= 1**, and it links to `/blog/how-gms-funding-works-global-sum-carr-hill-explained`. **Any Global Sum figure = BLOCK** |
| F-c | Sentences in NEW copy about ARRS roles, caps or who employs ARRS staff (O21) | **<= 1**, and it links to the ARRS page |
| F-d | Mentions of dispensing income (O24) | **0** |
| F-e | Any QOF point value (O25, O10) | **0** |
| F-f | Sentences in NEW copy explaining income recognition or PCSE statement reconciliation (O26) | **<= 1**, and it links to the PCSE page. Naming `Open Exeter` as the artefact is permitted and does not count |
| F-g | Sentences in NEW copy explaining the VAT medical exemption itself (O17) | **0**. Stating that management work falls outside it, and the registration threshold, is permitted |
| F-h | **NEW annual-allowance sentences (O2)** | **0** |
| F-i | **NEW IR35 or off-payroll sentences (O31)** | **0** |
| F-j | **NEW dividend, corporation tax or s.455 rate statements (O34)** | **0** |
| F-k | **O35 role-subject sentences in NEW copy (7.3 criterion 1)** | **0** |
| F-l | **`SA800`, `SA104`, `SA103` in NEW copy (7.3 criterion 3)** | **0** |
| F-m | **Any structure enumerating 3+ doctor roles with a treatment each (7.3 criterion 4)** | **0** |

### 8.6 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| VAT medical exemption, principal-purpose test, management work standard rated | https://www.gov.uk/hmrc-internal-manuals/vat-health/vathlt2010 and VATA 1994 Sch 9 Group 7 https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 ; `house_positions.md` §6 |
| VAT registration threshold £90,000, deregistration £88,000, 30-day rule | https://www.gov.uk/register-for-vat/when-to-register ; `house_positions.md` §6 |
| HMRC's stated position on PCN clinical director management work | https://aisma.org.uk/2022/05/20/vat-blow-pcn-clinical-directors/ (fetched 2026-08-26, HTTP 200). **Cite as AISMA reporting HMRC's position, never as HMRC guidance directly.** Its £85,000 threshold is stale and is not reproduced |
| Leadership pay pensionable only in a recognised form; no retrospective re-characterisation; the loss case | https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/the-nhs-pension-scheme-as-a-medical-director (fetched 2026-08-26, HTTP 200, page stamped `Updated: Friday 28 June 2024`). **Written for secondary-care medical directors; do not import the PA machinery (4.2)** |
| Company income and dividends are never NHS pensionable; a company cannot hold a GMS/PMS contract | `house_positions.md` §2.C |
| Type 1 Annual Certificate of Pensionable Profits, 28 February a year in arrears | https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate ; `house_positions.md` §2.C |
| Partner taxed on profit share not drawings; Class 4 NIC 6% / 2% | `house_positions.md` §1 and §8; https://www.gov.uk/self-employed-national-insurance-rates |
| CD, leadership and management funding combined into core PCN funding | NHS England 2026/27 GP contract long-read https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ and the Network Contract DES specification. **Re-verify before restating; the live page's framing is 2026-06-03 vintage** |
| NHS pensionability of clinical director duties, GP case | **https://www.nhsbsa.nhs.uk/payments-clinical-director-duties returned HTTP 403 and was NOT read.** This remains the authoritative gap. See section 11 |

**Countable test: every external factual claim in the new blocks maps to a row above with a fetch date. Count of
unverified claims = 0.** Nothing from the two HTTP 403 pages (4.5, 4.6) may be asserted.

### 8.7 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `python scripts/track2_query_coverage.py --slug pcn-clinical-director-payments-tax --json` | 0 covered queries lost (baseline is 0, so this cannot fail; run it to record the number) |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Empty, or every worked figure re-derived from labelled illustrative inputs. See the G1 note in 7.4 |
| 3. Statute verified at source | `statute_checks[]` | Every row in 8.6 fetched and content-verified; the two 403 rows recorded as unread |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; new links resolve via `slug_resolver.py`. **Note `BATCH3_INDEX.md` defect D1: `/blog/employment-status` 404s from the sitemap. Do not link to any `/blog/<category>` hub without resolving it first, and do not use `Employment Status` as a category anywhere** |
| 5. Equity preservation | 8.2 | Bing page-level position 4.0 or better |
| 6. Cluster coverage | 8.1 | **13 of 13** phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic attaches to this page** (section 1), so the ledger is unmoved by it. Record the zero so the balance is deliberate |
| 8. Competitor re-read | 4.7 | **16 themes, 16 decisions, 0 undecided** |

### 8.8 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere in the new copy, including frontmatter and FAQ answers. Rule I1, hard fail.
2. **No new internal link inside any existing paragraph.**
3. **`clinical director` is qualified on every use in a new heading.** Never bare `director` in an H2, because
   the harvest's only `director` volume is company-director and director's-loan terms (section 3.2) and those
   belong to wave C.
4. **No collapse, no redirect, no URL change** (K4).
5. **Never use UDAs, dental bands or any dental framing** (`house_positions.md` §3: doctors do not use UDAs).
6. **Never assert that CD pay is pensionable, or that it is not.** The one clear negative (the company route) may
   be stated flatly; everything else stays hedged, because the scheme administrator's own page on the question
   returned HTTP 403 and was never read.
7. **Do not link to `/blog/employment-status`** or any category hub not confirmed to resolve (defect D1).
8. **V5 and V9 shape check.** `it is not X, it is Y` is capped at **once per page, wave-wide** and this page
   currently has **zero**; keep it at zero. The **numeral-count paragraph opener** ("Two rules that...", "Four
   levers work...") is capped at **once per page, wave-wide, and prefer zero**; this page currently has zero and
   the new blocks must not introduce one. **V9 point 3: batch 3 is the third batch and the house corrective-clause
   opener should be varied deliberately.** The wave A conductor decides the variation and states it in the fix
   pass; this page's writer must not open a new block with a corrective clause by reflex.
9. **Rule D2**: no rhetorical questions in body copy (questions belong in headings), no "daunting", no
   "overwhelming". **Rule D3**: no CTA inside body copy; the existing single closing CTA stands and is not
   duplicated.
10. **Rule J1, cross-post sameness.** Four other wave-A packs are being written against the same ownership map
    and the same one-sentence-and-link allowances. **The handoff sentences to O19, O20, O21, O25 and O26 are the
    single highest sameness risk in this wave**, because five writers each need one and the map tells each of
    them the same thing to say. This writer's handoff sentences must be distinct in construction, not just in
    wording. It is the conductor's job to check this across the wave; it is invisible from inside this page.

---

## 9. Stated expectation, written before the work

**Baseline, from the re-pull of 2026-08-26.**

| Metric | Endpoint | Window | Value |
|---|---|---|---|
| Bing clicks, page level | `GetPageStats` | 13 snapshots, 2026-05-29 to 2026-08-21 | **1** |
| Bing impressions, page level | `GetPageStats` | same | **4** |
| Bing average impression position | `GetPageStats` | same | **4.0** |
| Bing named queries | `GetPageQueryStats` | 2026-08-26 pull | **0** |
| Google clicks / impressions | GSC `["page"]` and `["page","query"]` | 2026-05-25 to 2026-08-23 | **0 / 0** |
| Adjacent: sibling CD queries | `GetPageQueryStats`, sibling URL | 2026-08-26 pull | **3 queries, 5 impressions, 1 click, pos 6.0 to 7.0** |

Pro-rated to 28 days from the 13-snapshot window: **1 x (28/85) = 0.33 clicks**, **4 x (28/85) = 1.3
impressions**. **These numbers are too small for a traffic test and the pack does not set one.** Anyone reading a
click count of 1 as a trend is reading noise.

### The read at 28 days, Bing

1. **PRIMARY TEST, phrase coverage, and it is the only test that carries weight.** At least **2 of the 3 Tier M
   phrases** (section 8.1) return at least one Bing impression **for this URL** in the 28-day window. Today the
   count is **0 of 3**. Per §9.6 point 2, **total impressions rising while M1 to M3 stay at zero is DRIFT and is
   recorded as a FAIL, not a pass.**

2. **SECONDARY TEST, the ownership inversion.** Across the **two URLs together** (this page and
   `/blog/pcn-funding-network-contract-des-explained`), the combined CD-query impression count is at or above
   **5** (today's figure, all of it on the sibling), **and at least one CD query is attributed to this URL.**
   **Migration from the sibling to this page is a PASS, not a sibling regression.** Stated as a wave-level test
   precisely so a per-page read cannot score the intended outcome as a loss.

3. **POSITION FLOOR.** Bing page-level average impression position on this URL stays at **4.0 or better**
   (`GetPageStats`). This is the whole of the equity gate (8.2).

4. **NO CLICK TARGET IS SET, deliberately.** A baseline of 1 click from a single weekly snapshot cannot support
   one. Reporting a click movement on this URL as a result at 28 days is a misreading and the read should say so.

### The read at 90 days, Google

5. **Any GSC row at all.** Today: 0 page rows and 0 query rows. Target: **at least 1 page-dimension row** for
   this URL in GSC by day 90. **This is recorded as an observation, not a gate.** On a corpus where Google
   returns page rows for 21 of 138 URLs, a page not appearing at 90 days carries no information
   (`BATCH3_INDEX.md` §8, "Google, all waves: no expectation is set, deliberately").

### Failure trigger (§9.6, written as a number, before the change)

> **If the Bing page-level average impression position for
> `/blog/pcn-clinical-director-payments-tax` falls below 8.0 in any rolling 28-day window between deploy and
> deploy+56 days, revert to
> `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/pcn-clinical-director-payments-tax.md`.**

The trigger is written on **position, not clicks**, because position 4.0 is this page's only measured equity and
a click count of 1 cannot support a threshold. **8.0 is chosen as the floor because it is the boundary of §2.4's
own EXTEND ruling** (1 or 2 Bing clicks at position 10 or better), with two positions of margin, so a page that
crosses it has fallen out of the condition that earned it this grade.

Second trigger, on the wave:

> **If the combined CD-query impressions across this URL and the sibling fall below 3 (from 5) across a full
> 28-day window, the wave A conductor reviews both pages together before any further change to either.**

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day Bing read.
**Wave A's combined revert trigger also binds**: `BATCH3_INDEX.md` §8 sets the wave-level condition at combined
Bing clicks across the six URLs falling below **13** (from 17).

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **13 phrases from
section 8.1**, tagged by tier, **not** with any harvested keyword set, because none exists. **No
`monitored_pages` row is written by this pack; registration is a separate owner-triggered step.**

---

## 10. Corrections to the index, the dossier and the ground truth

**1. The harvest size quoted throughout batch 3 is stale.** `BATCH3_INDEX.md` §0 and the shared writer brief both
state **32,872 rows across 27 domains** for `dataforseo_competitor_data` where `site_key='medical'`. Re-counted
live 2026-08-26: **39,296 rows across 44 domains**, all stamped `date_pulled='2026-08-26'` (query in section
3.1). The harvest grew during the day, presumably from the concurrent opticians and allied-health seeding.
**Consequence: any pack quoting 32,872 as the denominator has an understated denominator, and any "absent from
the whole harvest" finding made against the smaller set should be re-run.** For this page the conclusion is
unchanged (zero either way). **Recommend the index be amended rather than re-planned**, per its own §4 note about
the concurrent ABSORB work.

**2. TWO pre-existing ownership breaches on this page, escalated as ONE decision for the manager, and EXTEND
forbids the writer resolving either.** Both are the same shape as `BATCH3_INDEX.md` defect **D8** (the live O21
breach on the sibling PCN page) and should be ruled on together with it, not separately.

- **O31 (IR35 / off-payroll).** `IR35` x8 and `off-payroll` x5 across the Route 3 block and a dedicated ~70-word
  FAQ explaining the three hirer types and who issues the determination. **O31 assigns this to wave D, one page
  only, owner deliberately unnamed.**
- **O35 (the employment-status fork).** Four role-subject tax sentences (two in the Route 1 body, two as FAQ
  questions framed `if I am a salaried GP` and `if I am a GP partner`) against the cap of one this pack derives
  in section 7.3. **All four already carry the required link to O35's frozen owner**, which is the mitigating
  fact and is why this is a lower-severity breach than D8.

**Both blocks predate the ownership map (page generated 2026-06-03), so neither is writer error; it is the map
being applied to a page written before it existed.** Handling adopted: **the writer's new-sentence allowance is
ZERO on both rows**, nothing existing is touched, and the decision is escalated. **The manager decides** whether a
deletion inside frozen copy is permitted as an ownership correction. Batch-1 coordinator ruling 3 clears
*factual* corrections inside frozen copy, and **neither of these is a factual correction**, which is the same
genuinely-new question D8 raises. **The pack's recommendation: rule all three together (D8, O31 here, O35 here)
as one policy, because three instances in one wave is a class, not three incidents.**

**3. A `house_positions.md` method finding does not hold on this run, and it is load-bearing for future
fetching.** The Verification log's batch-2 method finding 2 records that "`nhsbsa.nhs.uk` is reachable to `curl`
with a browser user agent, returning a normal 404 for a wrong path rather than the 403 recorded against it
elsewhere in this document", and concludes "the standing note that NHSBSA blocks automated fetches should be
narrowed to the fetch tool, not the domain". **On 2026-08-26, `curl -A "Mozilla/5.0" -sS -L
https://www.nhsbsa.nhs.uk/payments-clinical-director-duties` returned HTTP 403 with a 34,454-byte challenge
body** (section 4.0 row 1, section 4.6). A second NHSBSA path returned 404 in the same run, so the domain is
reachable but this path is blocked. **The narrowing is too broad as written and should be softened to
"path-dependent, re-test per URL".** This is not a correction to a figure; it is a correction to a method note
that a future writer will rely on to decide whether a source is gettable. **The practical cost here was real:
the scheme administrator's own page on this page's central pension question was never read.**

**4. `BATCH3_INDEX.md` §4's list of unpackable clusters is one short.** It records two ABSORB clusters
(opticians, allied health) as unpackable from the paid harvest because none of the harvested domains runs such a
page. **PCN clinical director payments is a third**, on the same mechanism and now on a 44-domain harvest
(section 3.2). The difference is that this one **already has a page**, so it is not an ABSORB gap, it is an
**EXTEND page with no market keyword set** and it needs a different scoring method (section 3.3). **Recommend
§4 record it, and recommend §9's limitations note that "peer-winnable orders the work" is unusable on any topic
the harvest cannot see.** The wave A conductor should expect the same shape on
`/blog/enhanced-services-gp-practice-income-tax`, which grades EXTEND on **0 named Bing queries** and whose
topic (`enhanced services`, `LES`) is equally unlikely to be in a competitor-position harvest.

**5. A new cannibalisation risk not flagged anywhere in the batch documents.** The dossier §8 warns that
"consultant" means a tax adviser to Google and a hospital doctor to us, and requires qualification on first use.
**The identical trap exists for "director" and is unflagged.** The only `director` volume in the 44-domain
harvest is company-director and director's-loan tax terms at 2,900 to 8,100 volume, which is **wave C's**
territory under O34 and the s455 page. This page uses "director" 40+ times meaning clinical director and already
carries a personal-service-company route. **Recommend the dossier §8 caution be extended to "director", and
recommend wave C's packs carry the reciprocal warning.** Section 8.8 constraint 3 implements it for this page.

**6. No correction is proposed to the ownership map's placement of O22.** The row is drawn in the right place and
the live Bing evidence corroborates it: the demand exists, it is specific to the CD payment, and it is currently
being met by the wrong page. **O22 does not need moving; it needs enforcing.** Stated explicitly so the absence
of a proposed move is a finding rather than an omission, per the brief's instruction that a writer who thinks a
row is wrong must say so rather than quietly move it.

---

## 11. Known limitations

1. **The authoritative source on this page's central pension question was never read.**
   `https://www.nhsbsa.nhs.uk/payments-clinical-director-duties` is the scheme administrator's own page on
   payments for clinical director duties and it returned **HTTP 403** (section 4.6). Everything this pack says
   about NHS pensionability rests on `house_positions.md` §2.C, on a BMA page written for secondary-care medical
   directors, and on the live page's existing hedged framing. **This is the single largest gap in the pack and it
   is the reason the page's refusal to assert a pensionability answer must be preserved.** A human read of that
   URL would be the highest-value hour available on this topic.

2. **`gponline.com` returned HTTP 403** (section 4.5). Its title indicates it is directly on topic and a search
   snippet suggests an IR35 point about who is personally appointed to the role. **None of it was read and none
   of it may be used.** Recorded so the gap is deliberate.

3. **The topic has no market keyword set**, so section 8.1 is not a harvested phrase list and carries no volumes
   and no peer-winnable figure (sections 3.2, 3.3). **Peer-winnable orders the work under owner decision 21 and
   here it cannot order anything**, because it is Google-derived and there is no Google data on either side. The
   ordering fell to the Bing evidence instead, which is the right substitute on a site where Bing out-clicks
   Google 3.4x, but it is a substitute and it is named as one.

4. **`GetPageStats` is top-N** (`BATCH3_INDEX.md` §9 limitation 2). This page appears in **one** of thirteen
   weekly snapshots. It is not proven that it had zero Bing impressions in the other twelve; it is proven that it
   was absent from the top N. **The 1 click / 4 impressions / position 4.0 figure is therefore a floor, not a
   total**, and the 28-day read must compare like with like on the same endpoint.

5. **No live-production check was run.** The rendering mode, the frozen strings and the internal link targets are
   all read from the source file and from `BATCH3_INDEX.md`, not from a request to the live site. This task's
   mandate is preparation.

6. **The CD-funding-inside-core-PCN-funding framing on the live page is 2026-06-03 vintage and was not
   re-verified at source by this task.** It is consistent with O20 and with the batch documents, and the page
   correctly refuses to state a per-patient figure, so nothing turns on it for the figure rules. **But any new
   block that restates the funding position must re-verify it against the NHS England 2026/27 GP contract
   long-read and the current Network Contract DES specification first** (section 8.6). Given the standing method
   rule in `house_positions.md` (a Directions or Regulations citation must be checked for amending instruments
   before any figure is locked), and given that RBP's 2019 page shows how fast this structure moves, the risk of
   restating a superseded funding structure is live.

7. **The 14-day read named in the wave A expectation is not separately specified here.** With a baseline of 1
   click and 4 impressions, a 14-day window on this URL cannot distinguish a result from noise. **This page
   reports at 28 days only**, and its 14-day contribution to the wave should be the phrase-presence check
   (section 8.1), which is a property of the deployed file rather than of the traffic.

8. **G1 is deliberately not satisfied** (no worked example), with the reasoning recorded in section 7.4. Reported
   as a reasoned non-compliance per V8, not closed by padding.
