# §9.5 RESEARCH PACK: /research/annual-allowance-pension-tax-index

Built 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, ground truth `docs/medical/house_positions.md`, peer classification `docs/medical/competitor_universe_2026-08-26.md`, and the deterministic data sheet for this page. No new DataForSEO calls were made. No file under `Medical/web/` was edited.

---

## 1. Target and permission level

| Field | Value |
|---|---|
| Page URL | `/research/annual-allowance-pension-tax-index` |
| Cluster | `nhs_pension` lane, dossier topic **pension lifetime allowance** (19,940 volume, 56 keywords) |
| Grade | **REFRAME** (full rewrite permitted) |
| Source file | `Medical/web/src/app/research/annual-allowance-pension-tax-index/page.tsx` |
| Data file | `Medical/web/src/data/nhs-aa-index.json`, typed by `Medical/web/src/lib/research/nhs-aa-index.ts` |
| Charts | `Medical/web/src/components/research/AaIndexCharts` |
| Rendering | **TSX ROUTE COMPONENT. The writer edits JSX, not markdown. Copy is inline in the component tree and in three const blocks at the top of the file.** |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/app/research/annual-allowance-pension-tax-index/page.tsx` |

**How the writer must work.** This is a Next.js App Router server component. There is no body string and no sections array. Prose lives in four places:
- the `faqs` const array at the top of the file (7 entries), which feeds both the rendered FAQ block and `buildFaqPage` JSON-LD;
- the `articleSchema` and `datasetSchema` const objects (JSON-LD `headline`, `name`, `description`);
- the exported `metadata: Metadata` object (`title`, `description`, `openGraph.title`, `openGraph.description`);
- literal JSX text inside the component tree: the hero `<h1>`, the hero lede `<p>`, four `<Stat label>` props, the "Key facts" `<ul>`, six `<Section title=...>` props and their child prose, the conversion block `<h2>` and `<p>`, and the FAQ block `<h2>`.

**Three hard mechanical constraints:**
1. **Do not hand-edit any figure that comes from `snapshot`.** Every number rendered through `headline.*`, `hmrc.*`, `nhs.*`, `fmtInt`, `fmtGBP` or `fmtGBPm` is read from `nhs-aa-index.json`. Prose figures typed as literals into the "Key facts" list (£350m, £64m, 56,270, 18,720, £215,000, £40,000, £60,000, 46,135, 7,991) are **duplicated literals of JSON values** and must be re-checked against the JSON, not edited independently. A prose figure that disagrees with its chart is the worst failure mode this page has.
2. **Do not change `PAGE_PATH`, the canonical, the `datasetSchema` licence or `distribution`.** The page is published under Open Government Licence v3.0 and the Dataset schema is what makes it citable. Breaking it costs the page its only structural differentiator.
3. **`datePublished: "2026-07-06"` must not change.** `dateModified` is bound to `meta.generated_at` and updates itself.

**What may be changed.** `metadata.title` and `description`, `openGraph` strings, the `<h1>`, the hero lede, `<Stat label>` prose, the "Key facts" list prose, all six `<Section title>` strings and their prose, the conversion block copy, and the `faqs` array (entries may be reworded and new ones added).

**What may not be changed.** The URL. The `id` props on `<Section>` elements (`scheme-pays-value`, `sa-individuals`, `allowance-path`, `nhs-exceeded`, `hmrc-series`, `methodology`) because they are anchor targets. The chart components and their data mapping. Any figure sourced from the JSON. No collapse, no redirect. Rewrite in place only.

**Frozen-list position.** Batch 1 excludes the **16 pages** inside armed `monitored_pages` windows running to **2026-09-10** (dossier §6). This page is **not** on that list. Three further `monitored_pages` rows carry `status='flagged'` (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) and are treated as **HOLD**. This page is neither frozen nor flagged.

### 1.1 The intent this page is pushed towards, and the phrasings it must not take

The slug `nhs-pension-annual-allowance` exists in **three namespaces at once** (dossier §7), and this page is the fourth member of the same term family:

| Namespace | Page | Intent it owns | Status |
|---|---|---|---|
| `/calculators/` | `/calculators/nhs-pension-annual-allowance` | **TOOL intent.** Numbers in, allowance and charge out. | REFRAME, same batch |
| `/medical-guides/` | `/medical-guides/nhs-pension-annual-allowance` | **EXPLANATION intent.** How the scheme works and how a benefit is calculated. | REFRAME, same batch |
| `/blog/` | `/blog/nhs-pension-annual-allowance-complete-guide` | **WORKED CASE intent.** The narrative example. | **FROZEN to 2026-09-10** |
| `/research/` | **this page** | **DATA and REFERENCE intent.** How big is this, across the profession, from official open data. | REFRAME, workable |

Per §5 of the working agreement and dossier §7 these are **never collapsed**. They are differentiated.

**This page is being pushed to data-and-reference intent, widened to carry the allowance-history vocabulary.** The dossier assigns it the topic **`pension lifetime allowance`** (19,940 volume, 56 keywords, coverage 54 of 56 missing) and NO-PAGE row 24 gives it **`abatement of pension`** (940 volume) as a section. So this page becomes the site's reference page for **what the allowance limits were, what replaced the lifetime allowance, and how many people the charges actually hit.**

**Phrasings this page must NOT take, because a sibling owns them:**

- `annual allowance calculator`, `pension annual allowance calculator`, `nhs annual allowance calculator`, `annual allowance calculator hmrc`, `hmrc annual allowance calculator`, `annual allowance calculation`, `threshold income annual allowance`, `threshold income for annual allowance`, `pension annual allowance taper`, `pension tapered annual allowance`, `annual allowance history`, `historic pension annual allowance`, `pension annual allowance history`, and the year-tagged **annual allowance** rows. **All allocated to `/calculators/nhs-pension-annual-allowance`, in this same batch.** This is the sharpest edge in the batch: this page already publishes a chart titled "How the standard allowance has changed", which is an allowance-history surface, and the calculator is being given the allowance-history table. See 1.2 for how the two are kept apart.
- `lifetime allowance calculator`, `lump sum allowance calculator`, `lifetime allowance pension calculator`, `pension lifetime allowance calculator`, `pensions lifetime allowance calculator`, `lump sum and death benefit allowance calculator`, `lifetime allowance calculator hmrc`. **All seven are calculator-intent strings.** This page has no calculator and must not claim one. Declined in 7.2.
- The whole `nhs pension calculator` and `nhs pension increase / uplift` family. **Allocated to `/medical-guides/nhs-pension-annual-allowance`, in this same batch.**
- `tapered annual allowance calculator` as a tool name. `/blog/nhs-pension-tapered-annual-allowance-calculator` holds that topic and is **FROZEN to 2026-09-10**.
- The **worked case narrative**. That belongs to the frozen `/blog/nhs-pension-annual-allowance-complete-guide`. This page reports population-level counts, never one doctor's year.
- `nhs pension scheme pays` as a page claim. Dossier §7 gives Scheme Pays to `/calculators/nhs-pension-scheme-pays` and `/blog/nhs-pension-scheme-pays-doctors-deadlines` (**flagged, HOLD**). This page's Scheme Pays content is the **HMRC Accounting for Tax money series**, which is a statistic, not advice. Keep it framed that way.

### 1.2 Vocabulary split across the batch, so attribution survives

Three of our pages are being changed in the same window. Bing re-crawls in days and is the 14 to 28 day read (§9.6). **One change per page per window, or attribution is lost (§9.3).**

| Half of the annual-allowance vocabulary | Owner | Contents |
|---|---|---|
| **The scale-and-history half** | **THIS PAGE** | lifetime allowance and LTA in the **historic** sense, standard lifetime allowance, lifetime allowance charge, lifetime allowance protection and protections, LSA, lump sum allowance, LSDBA, lump sum and death benefit allowance, pension abatement, plus the HMRC and NHSBSA statistical series and the per-year **standard allowance** path |
| **The mechanics half** | `/calculators/nhs-pension-annual-allowance` | annual allowance calculation and calculator phrasings, taper nouns, threshold and adjusted income, pension input amount, carry forward, MPAA, annual allowance charge, the year-tagged **annual allowance** table |
| **The scheme-explanation half** | `/medical-guides/nhs-pension-annual-allowance` | the `nhs pension calculator` family, 1995 / 2008 / 2015 accrual and calculation, pension increase and uplift, CPI revaluation, devolved scheme calculators |

**The one place the split is genuinely tight, and the rule that resolves it.** Both this page and the calculator carry a per-year allowance series. They are separated by **which allowance and in which voice**:
- **This page** publishes the **standard annual allowance path as a data series** (£215,000 in 2006/07 down to £40,000 and back to £60,000), framed as a chart with a source, plus the **lifetime allowance** series and its abolition. Its year strings appear as **chart axis labels and table cells in a sourced series**.
- **The calculator** publishes the **per-tax-year annual allowance lookup table** with year-tagged phrase rows (`pension annual allowance 2024/25` and siblings), framed as a reference a user checks before entering a number.
- **Enforcement rule:** this page must not contain the string `pension annual allowance` immediately followed by a year (`pension annual allowance 2024/25`, `pension annual allowance 23 24` and the eleven siblings). The calculator must not contain `lifetime allowance` in any year-tagged form. QA greps both.

Overlap that is unavoidable and therefore explicitly allowed: the strings `annual allowance` and `annual allowance charge` appear on all three. Only this page may put `lifetime allowance` or `lump sum allowance` in `metadata.title`, the `<h1>` or a `<Section title>`.

### 1.3 The equity being protected, and why it is the point of this pack

This page holds **page-level Google equity**: **0 clicks, 7 impressions, average position 10.6**, GSC page dimension, 90-day window to 2026-08-26 (dossier assignment table, "G 0c/7i pos 10.6"). Its **query breakdown is empty because GSC anonymises low-volume queries**, which is stated in section 2 verbatim from the data sheet.

**That page-level equity is real and it is protected.** An average position of 10.6 is the bottom of page one or the top of page two on whatever queries are anonymised behind it. It is the second-best Google position anywhere on this site (the best is `gp partnership goodwill valuation` at 10.3, per `competitor_universe_2026-08-26.md` §1). We do not know which queries produce it, so the protection is structural rather than per-query:

- **`metadata.title` must retain the strings `Annual Allowance` and `Pension Tax`.** They are the only tokens common to the URL, the H1, the Article schema headline and the Dataset schema name. Whatever the anonymised queries are, they route through those tokens.
- **The `<h1>` must retain `annual allowance`, `NHS doctors` and `pension tax charges`.**
- **The Dataset and Article JSON-LD must survive intact.** A research page's position-10 impressions on a data-shaped query are the most schema-dependent equity on the site.
- **The six `<Section>` `id` anchors must survive.** Anchored deep links are how a data page earns citations, and citations are what holds a position-10 impression.

**Section 2 shows no named Google queries. That is not evidence of no Google demand. It is evidence of anonymisation.** Any QA reading that concludes "no equity, free rewrite" is wrong and must be blocked.

### 1.4 The lifetime-allowance framing rule, which is a house-position gate

`house_positions.md` **§2.B governs the annual allowance, tapering, MPAA and the LTA replacement.** Its practical writing rule is explicit:

> Do NOT state a lifetime allowance of £1,073,100 (it is abolished; use LSA £268,275 / LSDBA £1,073,100 as the replacement framework).

The verification log records the abolition at source: **LTA abolished from 6 April 2024**, replaced by the **Lump Sum Allowance (LSA) £268,275** and the **Lump Sum and Death Benefit Allowance (LSDBA) £1,073,100**, both re-verified 2026-08-26 for 2026/27.

**The site has form on this.** A grep of `Medical/web/src` on 2026-08-26 found `lifetime allowance` in **6 files** (`app/about/page.tsx`, `app/blog/gp-accountant-services/page.tsx`, `app/blog/nhs-pension-planning/page.tsx`, `app/for-consultants/page.tsx`, `app/page.tsx`, `app/services/page.tsx`, 39 occurrences of the phrase in total across the tree). Command:

```
grep -rin "lifetime allowance" Medical/web/src --include=*.ts --include=*.tsx -l
grep -rio "lifetime allowance" Medical/web/src | wc -l   # 39
```

That is the "abolished LTA presented as current in 6 places" finding from the 2026-08-26 pass, confirmed here. **This page is not currently one of the six**: it contains zero occurrences of `lifetime allowance`. So this rewrite is not fixing an error, it is **introducing 4,400-volume vocabulary into a clean page**, and it is therefore the single highest-risk place on the site to get the framing wrong. If it ships with a live LTA, the site goes from 6 places to 7 and the newest one is the page we deliberately aimed at the phrase.

**The framing every LTA phrase on this page must carry, without exception:**
1. Past tense, or explicitly dated. "The lifetime allowance **was** abolished from 6 April 2024." Never "the lifetime allowance is £1,073,100."
2. Where £1,073,100 appears, it is the **LSDBA**, not the LTA. The coincidence of value is exactly the trap: the number survived, the allowance did not.
3. Where a tax-free lump sum cap appears, it is the **LSA £268,275**.
4. `lifetime allowance protection`, `fixed protection`, `enhanced protection` and `individual protection` are covered as **things that still matter** (they affect a member's LSA), but the allowance they once protected against is gone. This is the nuance every competitor in section 4 misses.
5. `lifetime allowance charge` is historic. It was reduced to nil from 6 April 2023 and the legislation was abolished from 6 April 2024.
6. This page is a **data page**, which makes historic framing natural rather than awkward. The LTA belongs here precisely because it is history with a series attached.

---

## 2. Equity register (copied verbatim from the data sheet)

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/research/annual-allowance-pension-tax-index)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **0** | impressions 0 | clicks 0.

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

> **Pack annotation, not part of the data sheet.** The Bing table is empty and the Google query table is empty, but the Google **page** dimension is not: **0 clicks, 7 impressions, average position 10.6** over the same 90-day window (dossier assignment table). See section 1.3. The absence of named queries here is anonymisation, not absence of equity, and section 1.3 is the binding protection.

---

## 3. The market's keyword set (copied verbatim from the data sheet)

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
lifetime allowance|\blta\b|abatement of pension|pension abatement|lump sum allowance|\blsa\b|lump sum and death benefit allowance
```

Keywords in topic: **64** | combined volume **22,830** | peer-winnable volume **0** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 4
| **Absent verbatim from this page: 64 of 64. Absent from the whole 105-page corpus: 61.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 4400 | 15 | bma.org.uk | no | **no** | no | lifetime allowance pension |
| 4400 | 8 | bma.org.uk | no | **no** | no | pension lifetime allowance |
| 2400 | 54 | bma.org.uk | no | **no** | yes | lump sum allowance |
| 1600 | 21 | bma.org.uk | no | **no** | yes | lifetime allowance |
| 1000 | 39 | bma.org.uk | no | **no** | no | pension lump sum allowance |
| 590 | 10 | bma.org.uk | no | **no** | no | pension lifetime allowance uk |
| 590 | 11 | bma.org.uk | no | **no** | no | uk pension lifetime allowance |
| 480 | 10 | bma.org.uk | no | **no** | no | lta pension |
| 480 | 11 | bma.org.uk | no | **no** | no | pension lta |
| 480 | 10 | bma.org.uk | no | **no** | no | pensions lta |
| 480 | 14 | bma.org.uk | no | **no** | no | what is a lifetime allowance |
| 480 | 15 | bma.org.uk | no | **no** | no | what is lifetime allowance |
| 390 | 10 | bma.org.uk | no | **no** | no | lifetime allowance protection |
| 390 | 6 | bma.org.uk | no | **no** | no | protection lifetime allowance |
| 390 | 16 | bma.org.uk | no | **no** | no | what is the lifetime allowance |
| 320 | 18 | bma.org.uk | no | **no** | no | lifetime allowance protections |
| 260 | 10 | bma.org.uk | no | **no** | no | lump sum allowance calculator |
| 170 | 16 | bma.org.uk | no | **no** | no | lifetime allowance calculator |
| 170 | 51 | bma.org.uk | no | **no** | no | what is the lump sum allowance |
| 140 | 5 | bma.org.uk | no | **no** | no | abatement of pension |
| 140 | 9 | bma.org.uk | no | **no** | no | pension abatement |
| 110 | 14 | bma.org.uk | no | **no** | no | lifetime allowance pension calculator |
| 110 | 20 | bma.org.uk | no | **no** | no | lump sum allowance 2025 |
| 110 | 27 | bma.org.uk | no | **no** | no | pension lifetime allowance calculation |
| 110 | 15 | bma.org.uk | no | **no** | no | pension lifetime allowance calculator |
| 110 | 17 | bma.org.uk | no | **no** | no | pensions lifetime allowance calculator |
| 110 | 16 | bma.org.uk | no | **no** | no | standard lifetime allowance |
| 110 | 10 | bma.org.uk | no | **no** | no | what is lifetime allowance protection |
| 110 | 40 | bma.org.uk | no | **no** | no | what is lump sum allowance |
| 90 | 7 | bma.org.uk | no | **no** | yes | lifetime allowance charge |
| 90 | 13 | bma.org.uk | no | **no** | no | lifetime allowance uk |
| 90 | 18 | bma.org.uk | no | **no** | no | lta allowance |
| 90 | 9 | bma.org.uk | no | **no** | no | maximum pension contribution lifetime allowance |
| 90 | 16 | bma.org.uk | no | **no** | no | what is lta pension |
| 90 | 5 | bma.org.uk | no | **no** | no | what is pension abatement |
| 70 | 22 | bma.org.uk | no | **no** | no | hmrc lifetime allowance |
| 70 | 10 | bma.org.uk | no | **no** | no | hmrc lifetime allowance protection |
| 70 | 16 | bma.org.uk | no | **no** | no | lifetime allowance hmrc |
| 70 | 15 | bma.org.uk | no | **no** | no | lifetime allowance lta |
| 70 | 8 | bma.org.uk | no | **no** | no | lifetime allowance pension protection |
| 70 | 10 | bma.org.uk | no | **no** | no | lifetime allowance protection hmrc |
| 70 | 18 | bma.org.uk | no | **no** | no | lump sum and death benefit allowance calculator |
| 70 | 20 | bma.org.uk | no | **no** | no | pension lifetime allowance changes |
| 70 | 10 | bma.org.uk | no | **no** | no | pension protection lifetime allowance |
| 70 | 28 | bma.org.uk | no | **no** | no | pensions lifetime allowance changes |
| 70 | 9 | bma.org.uk | no | **no** | no | pensions lifetime allowance protection |
| 70 | 52 | bma.org.uk | no | **no** | no | what is a lump sum allowance |
| 50 | 30 | bma.org.uk | no | **no** | no | civil service pension abatement |
| 50 | 9 | bma.org.uk | no | **no** | no | lifetime allowance 2023 24 |
| 50 | 8 | bma.org.uk | no | **no** | no | lifetime allowance 2023/24 |
| 50 | 24 | bma.org.uk | no | **no** | no | lifetime allowance calculator hmrc |
| 50 | 14 | bma.org.uk | no | **no** | no | lifetime allowance change |
| 50 | 18 | bma.org.uk | no | **no** | no | lifetime allowance changes |
| 50 | 3 | bma.org.uk | no | **no** | no | lifetime allowance nhs pension |
| 50 | 3 | bma.org.uk | no | **no** | no | nhs pension lifetime allowance |
| 50 | 4 | bma.org.uk | no | **no** | no | nhs pension scheme lifetime allowance |
| 50 | 3 | bma.org.uk | no | **no** | no | nhs pensions lifetime allowance |
| 50 | 11 | bma.org.uk | no | **no** | no | pension abatement civil service |
| 50 | 5 | bma.org.uk | no | **no** | no | pension abatement meaning |
| 50 | 9 | bma.org.uk | no | **no** | no | pension lifetime allowance protection |
| 50 | 10 | bma.org.uk | no | **no** | no | pension lta uk |
| 40 | 10 | bma.org.uk | no | **no** | no | lifetime allowance 2024 25 |
| 40 | 18 | bma.org.uk | no | **no** | no | lifetime allowance 2024-25 |
| 40 | 22 | bma.org.uk | no | **no** | no | lifetime allowance 2024/25 |

---

## 4. Competitor teardown

Six competitor URLs hold this topic's keywords. All six were attempted on 2026-08-26. No cap applied (the cap of 12 was not reached). Domain classification from `docs/medical/competitor_universe_2026-08-26.md` sections 2a and 2b.

**The concentration is extreme and it matters for how the SERP is read: 62 of the 64 keywords are held by bma.org.uk, and 45 of them by a single URL.** Only 4 domains contribute anything at all.

### 4.1 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-lifetime-allowance
**45 in-topic keywords, more than two thirds of the topic on one URL. Classification: UNWINNABLE AUTHORITY** (§2b: trade union / professional body, 15 top-10 slots, "cannot be outranked on brand").
- Title and H1: NHS pension lifetime allowance. ~3,200 words. **Tables: yes** (multiple calculation examples). Calculator: no. FAQ block: no.
- H2 in order: McCloud age discrimination ruling · How your lifetime allowance is calculated (pre 6 April 2023) · When can I be charged (pre 6 April 2023)? · Paying the lifetime allowance tax charge (pre 6 April 2023) · Taking a bigger tax-free lump sum · Taking a bigger lump sum · Ways to reduce your lifetime allowance tax charge (pre 6 April 2023) · Joining the 2015 scheme and losing protections · Enhanced protection · Fixed protection · Benefit accrual (pre 6 April 2023) · Individual protection
- H3: Transitioning in April 2022 · Retaining protections and opting out · Alternative options for pension contribution
- **Covers:** historic LTA calculation, the 25% pension and 55% lump sum charge mechanics, enhanced, fixed and individual protection, benefit accrual testing, McCloud implications, the April 2022 transition.
- **Structure:** heavily and consistently dated. Six of its twelve H2s carry an explicit "(pre 6 April 2023)" suffix, which is honest and unusual.
- **Gets wrong or omits, and this is the opening:** its framing is **hybrid and stops short**. It says "On 6 April 2023 the LTA charge was reduced to nil from that date and the LTA legislation abolished from 6 April 2024", then adds "The guidance below will relate to those who retired fully or partially before 6 April 2023". So it is a **historic page that never builds the replacement**. It uses **no LSA and no LSDBA terminology at all**. It says "The Pension Commencement Lump Sum is being retained at £268,275" without naming that as the Lump Sum Allowance. It omits guidance for anyone retiring after 6 April 2024, omits LSDBA mechanics entirely, and offers no pre-versus-post comparison. **The market's biggest page on this topic does not contain the vocabulary that replaced the topic.**

### 4.2 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/calculating-your-pension-lump-sum
**13 in-topic keywords. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: Calculating your pension lump sum. ~1,200 words. Tables: no. Calculator: no. FAQ: no.
- Headings in order: Am I entitled to a lump sum on retirement? (H3: 1995 section members and 2008 section optants via the Choice exercise · 2008 and 2015 sections) · When your lump sum will be paid · Commutation of pension benefits (H3: Maximum tax free lump sum · 1995 section · 2008 section and 2015 scheme) · Is my lump sum always tax-free? · Is the lump sum likely to ever be taxed in future? · Making another commutation choice
- **Covers:** the automatic 3x lump sum for 1995 members, commutation at £1 pension for £12 lump sum, the **£268,275** tax-free limit, protection certificates.
- **Gets wrong or omits:** it quotes £268,275 as a "tax-free limit" and **never calls it the Lump Sum Allowance**. It holds `lump sum allowance` keywords with a page that does not contain the term. No worked examples for complex scenarios, no LSDBA, no death-benefit treatment.

### 4.3 https://www.simpkinsedwards.co.uk/articles/pensions-protecting-your-lifetime-allowance
**8 in-topic keywords, holder of a chunk of the protection family. Classification: PEER** (§2a row 17: regional generalist with a healthcare sector page).
- **FETCH FAILED: HTTP 403 Forbidden**, 2026-08-26 via WebFetch. Recorded as a **flagged gap**, not dropped.
- What the keyword data still tells us: this is the **only non-BMA domain holding lifetime allowance protection phrases**, and its slug (`pensions-protecting-your-lifetime-allowance`) is written in the present tense about protecting an allowance that no longer exists. That is a strong prior that the page is stale, but it is a prior, not a finding. **Do not assert what it says.**
- Limitation stated: heading structure unknown. It is a peer, so if it is stale it is beatable, but that cannot be confirmed from here. Flagged for a manual read.

### 4.4 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/nhs-pension-abatement-rules
**6 in-topic keywords, the entire abatement family. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: NHS pension abatement rules. ~1,800 words. Tables: no. Calculator: no. FAQ: no (17 topic sections, most in question form).
- Headings in order: Abatement criteria · When does abatement apply? · When does abatement not apply? · Pensionable NHS earnings · I'm a secondary care doctor who retired from the 1995 section · I'm a GP who retired from the 1995 section · I'm a secondary care doctor who retired from the 2008 section · I'm a GP who retired from the 2008 section · I'm a secondary care doctor in the 2015 scheme · I'm a GP in the 2015 scheme · What is the enhanced element? · Applying abatement to your pension · Can my whole pension be abated? · Will my pension remain abated permanently? · I transitioned to the 2015 scheme and have retained a final salary link · Are any post-retirement NHS earnings excluded? · How does abatement affect my lump sum?
- **Covers:** abatement defined as the restriction of a pension in payment on return to NHS work, the pound-for-pound mechanic where post-retirement earnings plus the enhanced pension exceed pre-retirement earnings, the enhanced element, and the **abolition of abatement for Medical and Dental Officers on 1 April 2024**.
- **Structure: role-and-section first-person headings.** "I'm a GP who retired from the 1995 section". That is the best heading pattern in this teardown and it is worth borrowing for the abatement section.
- **Gets wrong or omits:** no numerical examples of an abatement calculation, no review or recalculation timeline, no dispute route, no international-work treatment, and **no specific figures for the 2024 changes beyond the MHO abolition**. The abatement family is 940 volume with no worked arithmetic anywhere on the SERP.

### 4.5 https://www.rbp.co.uk/news/is-it-time-to-rethink-your-nhs-pension
**1 in-topic keyword. Classification: PEER** (§2a row 22: specialist medical accountancy firm, retained on specialism).
- Title: Is it time to rethink your NHS Pension? | RBP. H1: Is it time to rethink your NHS Pension? ~1,200 words. **Tables: yes** (an annual allowance charges comparison table). Calculator: no. FAQ: no.
- Headings in order: Lifetime Allowance (LTA) · Maximum Tax-Free Lump sum · Annual Allowance (AA) · Tapered Annual Allowance · Examples of annual allowance charges for 2023/24 · Negative Growth · Other Changes to the NHS Pension Scheme
- **Gets wrong, and it is exactly the trap this pack exists to avoid:** it states "The lifetime allowance is the total amount you can save in your pension pot over your lifetime, the limit had previously been frozen at £1,073,000. This limit will now be **abolished from 6th April 2023**." Two errors in one sentence. The value is **£1,073,100**, not £1,073,000, and the **abolition date is 6 April 2024**, not 2023 (6 April 2023 is when the *charge* went to nil; `house_positions.md` verification log, gov.uk abolition publication). It uses **no LSA or LSDBA terminology**. It is written in the present tense about a live LTA in its lead H2.
- **Peer, and beatable.** A specialist firm leading a page with a wrong LTA sentence is the cleanest demonstration available that this vocabulary is mishandled across the niche.

### 4.6 https://www.pricebailey.co.uk/wp-content/uploads/2023/03/Price_Bailey_Budget_Summary_2024.pdf
**1 in-topic keyword. Classification: PEER, borderline** (§2a row 5: "National top-30 firm with a healthcare sector hub. Borderline peer: winnable on long-tail specialism, not on brand").
- **FETCH FAILED: HTTP 403 Forbidden**, 2026-08-26 via WebFetch. Recorded as a **flagged gap**, not dropped.
- What is knowable without fetching: it is a **PDF budget summary**, uploaded to a `/wp-content/uploads/2023/03/` path and named for 2024. A PDF holding a lifetime allowance keyword is a document-format result, not a competing page. It does not enter the coverage checklist as a structural competitor, but it is **not declined**, because a PDF ranking at all on this topic tells us the SERP is thin.

### 4.7 Coverage checklist: the union of their heading themes minus ours

Present on at least one competitor above, absent from our page today:

1. What the lifetime allowance was, and how it was calculated (historic)
2. When an LTA charge arose, and the 25% pension / 55% lump sum charge rates (historic)
3. Paying the lifetime allowance tax charge (historic)
4. **What replaced it: the Lump Sum Allowance and the Lump Sum and Death Benefit Allowance** (absent from every competitor, see section 5)
5. Taking a bigger tax-free lump sum, and the £268,275 cap
6. Commutation at £1 pension for £12 lump sum
7. Ways to reduce an LTA charge (historic)
8. Joining the 2015 scheme and losing protections
9. **Enhanced protection**
10. **Fixed protection**
11. **Individual protection**
12. Retaining protections and opting out
13. Benefit accrual testing (historic)
14. The April 2022 transition
15. McCloud and the age discrimination ruling in an LTA context
16. Entitlement to a lump sum by section, and when it is paid
17. Whether a lump sum is always tax free, and whether it might be taxed in future
18. **Abatement criteria: when it applies and when it does not**
19. **Abatement by role and section**, (secondary care and GP, 1995, 2008, 2015)
20. **The enhanced element, and pound-for-pound abatement**
21. **Whether a whole pension can be abated, and whether abatement is permanent**
22. **Post-retirement NHS earnings excluded from abatement**
23. **How abatement affects a lump sum**
24. **MHO abatement abolished from 1 April 2024**
25. Maximum tax-free lump sum framing
26. Negative growth
27. An annual allowance charges comparison table by scenario

Themes 1 to 27 are covered, declined or reassigned in section 7. Count of undecided themes must be **zero** (§9.9 floor 8).

---

## 5. Whitespace

Specific and quotable.

1. **Not one competitor page on this topic contains the words "Lump Sum Allowance" or "Lump Sum and Death Benefit Allowance".** BMA's 3,200-word lifetime allowance page uses neither and calls £268,275 a "Pension Commencement Lump Sum". BMA's lump sum page quotes £268,275 as a "tax-free limit". RBP uses neither. Johnston Carmichael (torn down in the calculator pack) leads an H2 with "Lifetime Allowance" and is frozen at 2023. **`lump sum allowance` alone is 2,400 volume, `pension lump sum allowance` 1,000, `what is the lump sum allowance` 170, `what is lump sum allowance` 110, `what is a lump sum allowance` 70. That is 3,750 volume for a term nobody in this niche has written down.** This is the single largest genuinely open block in the entire batch.
2. **Every competitor that mentions the abolition gets the date or the number wrong, or stops before the replacement.** RBP says abolished "from 6th April 2023" and £1,073,000. BMA hedges into "the guidance below will relate to those who retired before 6 April 2023". Nichols Medical (in the guide pack) gets the date right but frames it inside a page titled for 2025. **A page that states the sequence correctly (charge to nil 6 April 2023, legislation abolished 6 April 2024, LSA £268,275 and LSDBA £1,073,100 from that date) is factually alone on this SERP.**
3. **Nobody has published the allowance history as a data series with a source.** We already have the chart. `AllowancePathChart` renders the standard allowance from £215,000 in 2006/07 to £60,000 in 2023/24 from HMRC's own published series. `standard lifetime allowance` (110), `lifetime allowance changes` (50), `lifetime allowance change` (50), `pension lifetime allowance changes` (70), `pensions lifetime allowance changes` (70) and five year-tagged LTA rows are all asking for a series. **We are the only page in the teardown with the chart already built.**
4. **The protection family is 1,660 volume with no correct treatment anywhere.** `lifetime allowance protection` (390), `protection lifetime allowance` (390), `lifetime allowance protections` (320), `what is lifetime allowance protection` (110), `hmrc lifetime allowance protection` (70), `lifetime allowance protection hmrc` (70), `lifetime allowance pension protection` (70), `pension protection lifetime allowance` (70), `pensions lifetime allowance protection` (70), `pension lifetime allowance protection` (50). BMA covers enhanced, fixed and individual protection as live pre-2023 planning. Simpkins Edwards has a page titled "protecting your lifetime allowance" that we could not fetch. **The correct 2026/27 answer, that protections still matter because they can raise a member's LSA above £268,275, is written nowhere in this teardown.**
5. **Abatement has no arithmetic anywhere.** BMA's 1,800-word abatement page is the only treatment on the SERP and it explicitly publishes no numerical examples. 940 volume across `abatement of pension` (140), `pension abatement` (140), `what is pension abatement` (90), `pension abatement meaning` (50), `civil service pension abatement` (50), `pension abatement civil service` (50) and dossier NO-PAGE row 24 assigns it here.

**KEEP, marked explicitly, from our current page:**
- **KEEP the Dataset JSON-LD, the Open Government Licence v3.0 declaration and the downloadable distribution.** No competitor on this topic is citable. That is the whole reason this page exists and it is the only structural asset it has.
- **KEEP the four charts** (`SchemePaysValueChart`, `SaIndividualsChart`, `NhsExceededChart`, `AllowancePathChart`). `AllowancePathChart` in particular becomes the vehicle for whitespace item 3.
- **KEEP the HMRC / NHSBSA separation.** The current page states plainly that the money series is all-UK-schemes HMRC data and the NHS layer is NHSBSA FOI data for England and Wales, and that "we do not present a national money figure as if it were NHS-only". That discipline is rare and it is what makes the page citable. **Do not blur it when the LTA content is added.**
- **KEEP the 2022/23 reporting-artefact explanation.** The page correctly explains that the fall from 56,270 to 34,190 Self Assessment individuals is a reporting artefact caused by the McCloud public service pension adjustment service, not a real decline. That is a genuinely hard read of the data and no competitor attempts it.
- **KEEP the provisional flags.** The page marks 2023/24 as provisional. That is the honesty that earns a citation.

---

## 6. Our current page, read honestly

Read from `Medical/web/src/app/research/annual-allowance-pension-tax-index/page.tsx` at sha `b3d78c97e768645cca480dd350281ffa68c1faf9`.

- Approximate word count: **3,073** (`node`, tags and braces stripped, whitespace split). The longest of the three pages in this batch and comfortably longer than every competitor except BMA's LTA page.
- `metadata.title`: `Annual Allowance Pension Tax Index | NHS & UK data`
- `<h1>`: `The annual allowance and NHS doctors: pension tax charges across UK registered pension schemes`
- Heading list in order: **Key facts** (H2) · The money settled through Scheme Pays is climbing (H2, `#scheme-pays-value`) · Reports of pension savings above the allowance (H2, `#sa-individuals`) · How the standard allowance has changed (H2, `#allowance-path`) · Inside the NHS Pension Scheme (England and Wales) (H2, `#nhs-exceeded`) · The full HMRC series (H2, `#hmrc-series`) · Methodology and sources (H2, `#methodology`) · Concerned about your annual allowance position? (H2, conversion block) · Frequently asked questions (H2) with 7 H3 questions.
- Assets: 4 charts, a full HMRC series table, an NHS role split, Article + Dataset + FAQPage JSON-LD, a `LeadForm`, and links to `/calculators/nhs-pension-annual-allowance` and `/nhs-pension`.

**Blunt read: this is the strongest page of the three and it is not thin.** It is sourced, provisional-flagged, schema-complete, chart-backed and honest about its own limitations. It is also **completely absent from its assigned topic**: 64 of 64 keywords missing, and 0 occurrences of `lifetime allowance`, `lump sum allowance`, `LSA`, `LSDBA` or `abatement` anywhere in 3,073 words. The dossier assigns it `pension lifetime allowance` (19,940 volume) and it does not contain the phrase.

**Not stale in the usual sense, and this is worth saying clearly.** Unlike the calculator and the guide, this page has **no wrong tax-year tags**, because it is a historic data series and its years are the data's years, not a currency claim. `dateModified` is bound to `meta.generated_at` and maintains itself. The HMRC edition is correctly described as the July 2025 edition reaching 2023/24, with the next edition due summer 2026.

**Checked against `house_positions.md` and found correct:**
- `faqs[3]` states mandatory Scheme Pays as "charge is more than £2,000 and the member's pension input in the NHS scheme alone exceeds the £60,000 standard allowance; a charge driven only by the taper below £60,000 is voluntary Scheme Pays". That matches §2.D **exactly**, including the mandatory-versus-voluntary distinction that both sibling pages get wrong. **This is the correct wording in the batch. The other two pages should be corrected to match this page, not the other way round.**
- `faqs[3]` states "The election deadline is 31 July in the year after the year the charge relates to, so a 2025/26 charge must be elected by 31 July 2027". Matches §2.D.
- `faqs[2]` states the standard AA rose from £40,000 to £60,000 from 6 April 2023 and the minimum tapered allowance from £4,000 to £10,000. Matches §2.B.

**Gaps against `house_positions.md`, all of them omissions rather than errors:**
1. **No LTA content at all**, and therefore no LSA or LSDBA. §2.B's replacement framework (LSA £268,275, LSDBA £1,073,100, LTA abolished 6 April 2024) is entirely absent. This is the gap the rewrite exists to fill, and section 1.4 is the gate it must pass.
2. **No abatement content**, despite NO-PAGE row 24 assigning it here.
3. **`faqs[3]` omits the revised-statement extension.** §2.D: where a revised pension savings statement is issued **on or after 2 May**, the deadline extends to the earlier of **3 months** from that statement or **6 years** from the end of the tax year, and house positions says late NHSBSA statements are "the normal case, not the exception". The page gives the plain 31 July rule only.
4. **`faqs[3]` uses the 2025/26-to-31-July-2027 pairing.** §2.D's writing rule says to use that pairing "only where the page is about the year just closed" and otherwise to use **2026/27 to 31 July 2028**. This page's data reaches 2023/24, so the year-just-closed framing is arguably right, but the pack's position is: give **both** pairings, because the page is read in 2026/27.

**One structural risk the writer must not create.** The conversion block currently says "Our NHS pension annual allowance calculator models your situation" and links `/calculators/nhs-pension-annual-allowance`. That link is correct and must stay. But adding LTA and LSA vocabulary to this page while the calculator is being rewritten in the same window puts two pages in the same term family into the same measurement window. Section 1.2's enforcement rule is what keeps them separable, and the anchor text of that link must not change.

**Worth keeping:** everything in the KEEP list in section 5. This page needs an addition, not a rescue.

---

## 7. Deterministic acceptance criteria

All countable at QA. A failure on any numbered item is a BLOCK.

### 7.1 Phrases that must appear verbatim (case and punctuation normalised): **31**

Drawn from the `On page = no` rows of section 3. **Peer-winnable volume in this topic is 0** and 62 of 64 rows are held by bma.org.uk, so ordering falls to volume. **Every phrase below must appear inside the section 1.4 framing.** A phrase that appears in a present-tense live-LTA sentence is a BLOCK even though the string matched.

The LTA head family, 12 phrases:
1. `lifetime allowance pension` (4400)
2. `pension lifetime allowance` (4400)
3. `lifetime allowance` (1600)
4. `pension lifetime allowance uk` (590)
5. `uk pension lifetime allowance` (590)
6. `lta pension` (480)
7. `pension lta` (480)
8. `pensions lta` (480)
9. `what is a lifetime allowance` (480)
10. `what is lifetime allowance` (480)
11. `what is the lifetime allowance` (390)
12. `lifetime allowance uk` (90)

The LSA / LSDBA family, 6 phrases (whitespace item 1, 3,750 volume, written down by nobody):
13. `lump sum allowance` (2400)
14. `pension lump sum allowance` (1000)
15. `what is the lump sum allowance` (170)
16. `what is lump sum allowance` (110)
17. `what is a lump sum allowance` (70)
18. `lump sum allowance 2025` (110)

The protection family, 6 phrases (whitespace item 4, 1,660 volume):
19. `lifetime allowance protection` (390)
20. `protection lifetime allowance` (390)
21. `lifetime allowance protections` (320)
22. `what is lifetime allowance protection` (110)
23. `lifetime allowance pension protection` (70)
24. `pension lifetime allowance protection` (50)

The abatement family, 5 phrases (whitespace item 5, NO-PAGE row 24):
25. `abatement of pension` (140)
26. `pension abatement` (140)
27. `what is pension abatement` (90)
28. `pension abatement meaning` (50)
29. `civil service pension abatement` (50)

The NHS-specific LTA rows, all at position 3 to 4 and the closest thing to a winnable slot in the topic:
30. `nhs pension lifetime allowance` (50) plus `lifetime allowance nhs pension` (50), `nhs pension scheme lifetime allowance` (50), `nhs pensions lifetime allowance` (50)
31. `standard lifetime allowance` (110)

### 7.2 The remaining rows: placed, declined, deferred

**Placed in the LTA history series block, 11 further phrases:** `lifetime allowance changes` (50) · `lifetime allowance change` (50) · `pension lifetime allowance changes` (70) · `pensions lifetime allowance changes` (70) · `lifetime allowance 2023 24` (50) · `lifetime allowance 2023/24` (50) · `lifetime allowance 2024 25` (40) · `lifetime allowance 2024-25` (40) · `lifetime allowance 2024/25` (40) · `lifetime allowance charge` (90) · `lta allowance` (90).

**Placed in the HMRC framing block, 5 further phrases:** `hmrc lifetime allowance` (70) · `lifetime allowance hmrc` (70) · `hmrc lifetime allowance protection` (70) · `lifetime allowance protection hmrc` (70) · `lifetime allowance lta` (70).

**Placed in the abatement and protection blocks, 3 further phrases:** `pension abatement civil service` (50) · `pensions lifetime allowance protection` (70) · `pension protection lifetime allowance` (70).

**Placed, remaining head rows, 3 phrases:** `what is lta pension` (90) · `pension lta uk` (50) · `maximum pension contribution lifetime allowance` (90).

**Total placed: 31 + 11 + 5 + 3 + 3 = 53.** Counting the four NHS rows in item 30 individually gives **56 of the 64 absent rows placed.**

**Declined, with reason: 8 of 64.** All eight are calculator-intent strings, and this page has no calculator. Claiming one on a data page is a false promise and it collides with the section 1.1 allocation.

| Keyword | Vol | Reason code | Reason |
|---|---|---|---|
| `lump sum allowance calculator` | 260 | tool-intent, belongs elsewhere | No calculator on this page. |
| `lifetime allowance calculator` | 170 | tool-intent | No calculator on this page. |
| `lifetime allowance pension calculator` | 110 | tool-intent | No calculator on this page. |
| `pension lifetime allowance calculator` | 110 | tool-intent | No calculator on this page. |
| `pensions lifetime allowance calculator` | 110 | tool-intent | No calculator on this page. |
| `lifetime allowance calculator hmrc` | 50 | tool-intent | No calculator on this page. |
| `lump sum and death benefit allowance calculator` | 70 | tool-intent | No calculator on this page. The **term** LSDBA is placed (see 7.4 below); the calculator string is declined. |
| `pension lifetime allowance calculation` | 110 | tool-intent, deferred | Real intent. **Deferred, not excluded**, and named: it belongs to a future LSA / LSDBA calculator, or to `/calculators/nhs-pension-scheme-pays` if that page grows a lump sum module. Recorded as deferred so the reconciliation ledger balances. |

**Reassigned to a sibling, not declined: 0 rows from this topic.** The annual-allowance mechanics phrases prohibited in section 1.1 are not members of this topic's 64-row set.

### 7.3 The LSDBA requirement, which is not a keyword row

`lump sum and death benefit allowance` appears in the topic only inside a declined calculator string. **The term itself is mandatory anyway**, because `house_positions.md` §2.B requires the LSA and LSDBA pair as the replacement framework and the page cannot state one without the other. QA must confirm the page contains, verbatim:
- `lump sum and death benefit allowance`
- `£1,073,100` **attributed to the LSDBA**, never to a live lifetime allowance
- `£268,275` **attributed to the Lump Sum Allowance**

### 7.4 Equity preservation (§9.9 floor 5)

**Named Bing queries: 0. Named Google queries: 0. Neither is a licence.**

The protected equity is **page-level Google: 0 clicks, 7 impressions, average position 10.6**, 90-day window to 2026-08-26, GSC page dimension. Section 1.3 sets the structural protection. QA checks all five, each a BLOCK if it fails:

1. `metadata.title` still contains the strings `Annual Allowance` and `Pension Tax`. (Currently: `Annual Allowance Pension Tax Index | NHS & UK data`.)
2. The `<h1>` still contains `annual allowance`, `NHS doctors` and `pension tax charges`.
3. `articleSchema.headline`, `datasetSchema.name`, `datasetSchema.license`, `datasetSchema.distribution` and `datasetSchema.temporalCoverage` all still present and valid. Validate the rendered JSON-LD, not the source.
4. All six `<Section id>` anchors still present: `scheme-pays-value`, `sa-individuals`, `allowance-path`, `nhs-exceeded`, `hmrc-series`, `methodology`.
5. `alternates.canonical` still `${siteConfig.url}/research/annual-allowance-pension-tax-index`, and `datePublished` still `2026-07-06`.

Before the writer starts, QA reads the **page-level** figure for this URL from `gsc_page_rows.json` and records it as the baseline. **A QA that reads the empty query table in section 2 and concludes "no equity, free rewrite" is wrong and must be blocked.**

### 7.5 EXTEND-only protections

**Not applicable. This page is REFRAME.** But note that REFRAME here should be read as **substantial addition to a sound page**, not demolition. Section 5's KEEP list and section 7.4's five structural checks are the practical limit on how much may change.

### 7.6 Arithmetic that must recompute

| # | Input | Expected output | Source of the rule |
|---|---|---|---|
| A1 | Any statement of the LSA | **£268,275** for 2026/27, unchanged from 2025/26 | house_positions §2.B, gov.uk pension schemes rates, verified 2026-08-26 |
| A2 | Any statement of the LSDBA | **£1,073,100** for 2026/27, unchanged from 2025/26, and **attributed to the LSDBA, never to a live LTA** | §2.B |
| A3 | The abolition sequence | LTA **charge** reduced to nil from **6 April 2023**; LTA **legislation abolished from 6 April 2024**. Two different dates, both required. | §2.B and the verification log's gov.uk abolition publication. Note RBP (4.5) states this wrongly; do not copy it. |
| A4 | Any historic LTA value quoted in the series | £1,073,100 as the **frozen LTA to 5 April 2024**, and **not** £1,073,000. RBP's figure is wrong by £100. | §2.B, LSA/LSDBA verification log |
| A5 | Any Scheme Pays deadline for a 2026/27 charge | **31 July 2028**. For a 2025/26 charge, **31 July 2027**. Both may be stated. | §2.D |
| A6 | Scheme Pays where a revised statement is issued on or after 2 May | The **earlier of** 3 months from that statement **or** 6 years from the end of the tax year | §2.D |
| A7 | Mandatory versus voluntary Scheme Pays | Mandatory needs charge **> £2,000** AND NHS scheme input **> the standard £60,000**. A charge driven only by the taper below £60,000 is **voluntary**. | §2.D. The page already states this correctly; the check is that the rewrite does not degrade it. |
| A8 | Every prose figure in the "Key facts" list | Must equal its counterpart in `nhs-aa-index.json`: £350m, £64m, 56,270, 18,720, 34,190, £215,000, £40,000, £60,000, 46,135, 7,991 | The JSON is the source. A prose figure that disagrees with its chart is a BLOCK. |
| A9 | The standard allowance path series | 2006/07 £215,000 through to 2023/24 £60,000, matching `hmrc.series[].standard_aa_gbp` | The JSON |
| A10 | Any 2026/27 annual allowance figure added in the LTA context | **£60,000**, MPAA **£10,000**, minimum tapered **£10,000**, threshold income **£200,000**, adjusted income **£260,000**, all unchanged from 2025/26 | §2.B |

A3 and A4 exist specifically to catch the two errors found on RBP. Both must be run.

### 7.7 Statute and regulation to be re-verified at source

| What | URL |
|---|---|
| **LTA abolition from 6 April 2024** | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 |
| LSA £268,275, LSDBA £1,073,100, annual allowance, MPAA, minimum tapered AA, threshold and adjusted income limits, all for 2026/27 | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates |
| Post-LTA lump sum allowances, protections and their effect on the LSA | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual (PTM170000+) |
| Taper trigger conditions and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Scheme Pays liability and the £2,000 test | https://www.legislation.gov.uk/ukpga/2004/12/section/237B |
| Scheme Pays deadline and the revised-statement extension | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA |
| Scheme Pays deadline in HMRC's words, including the 2 May limb | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 |
| McCloud remedy period and rollback, for the abatement and protections context | https://www.nhsemployers.org/articles/mccloud-remedy |
| Scheme sections and NPAs, for the abatement-by-section content | https://www.nhsemployers.org/articles/comparing-different-sections-nhs-pension-scheme |
| The HMRC Private pension statistics edition the page is built on, and whether the summer 2026 edition has landed | HMRC Private pension statistics, as cited in `meta` of `nhs-aa-index.json`. If a newer edition exists, that is a **data refresh, not a copy change**, and it is a separate task with its own `monitored_pages` implications. Do not fold it into this rewrite. |

**Abatement note.** `house_positions.md` does not lock a position on NHS pension abatement. BMA (4.4) is the only substantive source and it is a peer-classified-unwinnable trade body, not a primary one. **Every abatement statement on this page must be sourced to NHSBSA or to the scheme regulations, or framed as "confirm the current position at source", naming the block.** In particular, BMA's claim that **abatement for Medical and Dental Officers was abolished on 1 April 2024** is a single-source claim and must be verified at NHSBSA before publication or omitted. Do not publish it on BMA's authority alone.

### 7.8 UNVERIFIED figures that must not be stated

`house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **No figure for any of them may appear on this page.** This topic needs none of them. If the writer reaches for one, the page frames it as "confirm the current figure at source" and names the block. Named block if it arises: the `Methodology and sources` section.

Adding to that list for this page specifically: **no current-year NHS pension increase percentage** (not in house positions, see the guide pack), and **no abatement figure** sourced only to BMA (see 7.7).

### 7.9 The floors

**The four existing floors (§4):**
1. **Arithmetic**, all ten calculations in 7.6 recompute, and every prose figure reconciles to `nhs-aa-index.json` (A8).
2. **Statute**, every URL in 7.7 fetched and confirmed, or its status code recorded. The **LTA abolition publication is mandatory**, not optional: it is the source for the whole reframe.
3. **Links**, every internal link resolves. The existing links to `/calculators/nhs-pension-annual-allowance` and `/nhs-pension` stay, with **unchanged anchor text** (section 6). A link to `/medical-guides/nhs-pension-annual-allowance` may be added. **No link may be added to or removed from** `/blog/nhs-pension-annual-allowance-complete-guide` or `/blog/nhs-pension-tapered-annual-allowance-calculator` while those are frozen to 2026-09-10. All external source links in `Methodology and sources` must return 200 or be recorded with their status.
4. **Coverage**, the 56 placed phrases of 7.1 and 7.2 all present, plus the three mandatory LSDBA strings of 7.3, each unplaced one named.

**§9.9 floors 5 to 8:**
5. **Equity preservation**, the five structural checks in 7.4. Named Bing and Google query sets are empty, so the page-level Google baseline (7 impressions, position 10.6) is the protected quantity and is re-read at 90 days.
6. **Cluster coverage**, every keyword the dossier assigned to this page is placed; the checker names each one that is not.
7. **Reconciliation balance**, this page's 64 keywords balance: **56 assigned**, 0 already-covered (all 64 are absent), **7 excluded** (tool-intent, no calculator on this page), **1 deferred** (`pension lifetime allowance calculation`, named to a future LSA/LSDBA calculator). **56 + 0 + 7 + 1 = 64.**
8. **Competitor re-read**, all 27 coverage-checklist themes in 4.7 decided, so the undecided count is zero:
   - **Covered here:** 1, 2, 3, **4**, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26
   - **Covered here in brief with a link out:** 5, 15 (McCloud, one paragraph, linking to `/blog/mccloud-remedy-nhs-pension-doctors-explained`), 27 (the annual allowance charge comparison table is referenced as belonging to the calculator)
   - **Belongs to `/medical-guides/nhs-pension-annual-allowance`:** 6 (commutation at £1 for £12), 16 (lump sum entitlement by section and when it is paid), 17 (whether a lump sum is always tax free). Declined here with reason: the guide owns the scheme-explanation half and is being written in this same batch. This page states the **£268,275 LSA cap** and links across.
   - **Belongs to `/calculators/nhs-pension-annual-allowance`:** 27's arithmetic.
   - Undecided: **0**

Plus the two human passes: adversarial factual QA against `house_positions.md` §2.B and §2.D **with section 1.4 as an explicit checklist item**, and the editorial pass against the cluster answer-pattern spec (§9.11). The editorial pass here has one extra job: **31 mandatory phrases, most of them near-duplicates of each other (`lifetime allowance pension`, `pension lifetime allowance`, `pension lifetime allowance uk`, `uk pension lifetime allowance`), is the highest keyword-insertion risk in the batch.** The intended device is a definitional block written as a glossary of what each term meant and what replaced it, plus a sourced history table with the years as rows. Not a paragraph that lists the phrases.

---

## 8. Stated expectation

Written before the work, as numbers a later read can fail (§9.6).

**Engine and window.** Bing is the **14 to 28 day** read, Google the **28 to 90 day** read. Baseline is the 90-day pull to 2026-08-26: **Bing 0 impressions, 0 clicks, 0 named queries. Google 0 query-level rows, but page-level 0 clicks, 7 impressions, average position 10.6.**

**What we expect:**

| Read | Window | Expectation |
|---|---|---|
| Bing, 14 day | to 2026-09-09 | Any named query at all on this URL, against a baseline of zero. At least **1** Bing impression. |
| Bing, 28 day | to 2026-09-23 | At least **5** Bing impressions and at least **3** named queries on this URL. At least **2** of them containing `lifetime allowance`, `lump sum allowance` or `abatement`. |
| Google, 28 day | to 2026-09-23 | Page-level impressions **at or above 7** (the baseline) and average position **no worse than 10.6**. This is the protection read, not the growth read. |
| Google, 90 day | to 2026-11-24 | Page-level impressions **at or above 21** (three times the baseline), average position **at or better than 10.6**, and at least **1** query-level row appearing where there are currently none. |

**The verdict is read against phrase coverage, not total traffic** (§9.6 rule 2). Total impressions rising while the 56 named phrases stay missing is **drift and must be recorded as a fail.**

**Failure trigger, written as a number.** Two triggers, either one fires a revert:
1. **Google protection trigger.** If, in the 90-day window to **2026-11-24**, page-level Google impressions on `/research/annual-allowance-pension-tax-index` fall below **7** (the baseline), **or** average position falls worse than **13.0** (a 2.4-position degradation from 10.6), **revert**.
2. **Bing dead-page trigger.** If, in the 28-day window to **2026-09-23**, Bing impressions on this URL are still **0**, that is not a revert on its own (the baseline is also 0), but it is a **recorded fail** on the expectation and the page must not be changed again until the 90-day Google read lands.

Revert command: `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/app/research/annual-allowance-pension-tax-index/page.tsx`, with the reason recorded in `blog_optimizations.rollback_reason`.

**A third trigger, which is a factual gate rather than a performance one.** If a post-publication grep finds `lifetime allowance` on this page in any present-tense or undated form, the page is reverted immediately regardless of performance. Command:

```
grep -in "lifetime allowance" Medical/web/src/app/research/annual-allowance-pension-tax-index/page.tsx
```

Every hit must sit within a past-tense or explicitly dated clause per section 1.4. This is the gate that stops the site going from 6 places carrying a live abolished LTA to 7.

**Tracker discipline.** `blog_optimizations.target_keywords` for this page must be populated with the **56 placed phrases** from 7.1 and 7.2 plus the three mandatory LSDBA strings from 7.3. Not with the annual allowance vocabulary the page already carries.

**One change per page per window.** This page, the calculator and the medical guide are all changing in the same batch. The section 1.2 vocabulary split, and specifically the enforcement rule that this page never carries a year-tagged `pension annual allowance` string while the calculator never carries a year-tagged `lifetime allowance` string, is what makes their readings separable. If the writer breaches the split, the 28-day read on all three is uninterpretable and the correct response is to revert all three, not to guess.

---

## Corrections to the dossier

1. **The dossier records this page's equity as "G 0c/7i pos 10.6" in the assignment table, and the data sheet's section 2 renders as "Google query-level rows: 0" with an empty Bing table.** Read alone, the data sheet makes this page look like it has no equity at all. It has the **second-best Google position on the site**. The two documents are not in conflict (one reports the page dimension, the other the query dimension) but the data sheet is the document a writer reads, and on its face it invites exactly the wrong conclusion. Section 1.3 and section 7.4 of this pack exist to close that gap, and the dossier should carry the page-level figure into any future data sheet for a page whose query breakdown is anonymised.

2. **The dossier assigns this page the `pension lifetime allowance` topic without recording that the page contains zero LTA vocabulary and is therefore a clean surface.** That matters, because the 2026-08-26 pass found the abolished LTA presented as current in **6 files** under `Medical/web/src` (`app/about/page.tsx`, `app/blog/gp-accountant-services/page.tsx`, `app/blog/nhs-pension-planning/page.tsx`, `app/for-consultants/page.tsx`, `app/page.tsx`, `app/services/page.tsx`; 39 occurrences of the phrase in total). This page is not one of the six. **The dossier treats the assignment as a coverage gap; it is also a contamination risk**, because we are deliberately introducing 4,400-volume LTA vocabulary into the one page in the family that is currently clean. Section 1.4 is the gate. The six contaminated files are a **separate remediation task** and are not in this pack's scope, but they should be on a named list.

3. **Dossier §7 lists `pension lifetime allowance` as a 51.1 tie between this page and `/medical-guides/nhs-pension-annual-allowance`, and `pension tapered annual allowance` as 71.4 for the FROZEN `/blog/nhs-pension-tapered-annual-allowance-calculator` against 57.1 for this page.** Both are resolved here by allocation, not by score: the LTA family comes to this page (section 1.2), and the taper family goes to `/calculators/nhs-pension-annual-allowance` with the tool-name form reserved to the frozen blog. Recording the resolutions so a later reader does not reopen them.

4. **`/research/annual-allowance-pension-tax-index` currently states the mandatory-versus-voluntary Scheme Pays distinction correctly, and its two sibling pages in this batch do not.** `/calculators/nhs-pension-annual-allowance` (`faqs[2]`) and `/medical-guides/nhs-pension-annual-allowance` (`sections[4]`) both say Scheme Pays is available where the input exceeds "the annual allowance", omitting that mandatory Scheme Pays needs the input to exceed the **standard £60,000**. The dossier records neither. **The correct wording already exists on this page and should be propagated to the other two**, which is the cheapest factual fix in the batch.
