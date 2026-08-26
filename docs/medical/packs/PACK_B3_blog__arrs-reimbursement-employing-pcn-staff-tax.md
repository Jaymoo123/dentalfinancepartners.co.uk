# §9.5 RESEARCH PACK: /blog/arrs-reimbursement-employing-pcn-staff-tax

**Batch 3, wave A** (GP practice income and NHS funding). Built 2026-08-26 against
`docs/medical/packs/BATCH3_INDEX.md` (sections 1, 2, 5 and 6 binding),
`docs/medical/language_spec_2026-08-26.md` (rules A to L, V1 to V9),
`docs/medical/house_positions.md`, `docs/medical/packs/BATCH2_INDEX.md` §4 and its ratified
amendment, `docs/medical/cluster_dossier_2026-08-26.md` (CORRECTED §4 ordering only),
`docs/medical/competitor_universe_2026-08-26.md` §2a, and `docs/_engines/REWRITE_PROGRAM.md`
§9.2 to §9.5. Format exemplar: `PACK_blog__qof-income-gp-practice-accounting-explained.md`.

**No paid API call was made by this pack: $0.00.** GSC and Bing Webmaster are free and were both
re-pulled fresh by this task (§2). The persisted DataForSEO harvest was read by SQL and is already
paid for. No file under `Medical/web/` was edited. No commit, no deploy, no IndexNow, no
`monitored_pages` write, no monitor, alert, cron or scheduled job created.

**No em-dashes anywhere in this pack (rule I1). Every number carries the query, command or URL that
produced it.**

---

## 0. Two things to read before section 1

**0.1 The scratchpad pulls named in the writer brief did not exist, again.** The brief points at
`medical_stage0/gsc_page_rows.json`, `gsc_query_rows.json`, `bing_page_stats.json`,
`bing_query_stats.json` and `bing_page_query_waveAB.json`. At the start of this task the directory
`%TEMP%/claude/C--Users-user-Documents-Accounting/8148a4f1-.../scratchpad/medical_stage0/`
contained exactly one file, `B3_WRITER_BRIEF.md`, and nothing else:

```
$ ls -la .../scratchpad/medical_stage0
total 8
-rw-r--r-- 1 user 197121 7388 Aug 26 16:34 B3_WRITER_BRIEF.md
```

This is the same failure `BATCH3_INDEX.md` §0.1 recorded, one layer down: the index re-created the
pulls into its own session scratchpad, and this writer runs in a different session that cannot see
them. **Every figure in section 2 is therefore from a fresh pull made by this task**, not from a
stored snapshot, not from `gsc_query_data` (which is sampled and must never be summed), and not from
the missing files. The figures reproduce the brief's numbers exactly, which is the cross-check.

**0.2 The Bing two-endpoint trap is live on THIS page, not just on the GMS page.** `BATCH3_INDEX.md`
§0.2 and defect D2 record that `GetPageStats` page-level and `GetPageQueryStats` named-query-level
figures are both true and never comparable, and cite the GMS page at 129 against 51. On this page
the gap is smaller in absolute terms and **larger in kind**:

| Endpoint | Clicks | Impressions | Avg impression position |
|---|---|---|---|
| `GetPageStats`, page level, 3 snapshots in window | **1** | **11** | **4.5** (impression-weighted) |
| `GetPageQueryStats`, named-query level, 7 rows | **0** | **10** | 1.0 best |

**The single click that makes this page grade EXTEND does not appear at named-query level at all.**
One impression is missing and the click is missing entirely. Every Bing number below names its
endpoint. Do not add them, do not compare them, and do not let a later read compare a page-level
baseline to a named-query outcome.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES.**

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/arrs-reimbursement-employing-pcn-staff-tax` |
| Cluster / topic | ARRS: reimbursable roles, reimbursement mechanics and caps, who employs the staff, the payroll, pension and employer-NIC consequences, and the shared-staff VAT trap. Ownership row **O21**. |
| Wave | **A**, GP practice income and NHS funding. Six surfaces, five EXTEND and one REFRAME. Start now, no gate (`BATCH3_INDEX.md` §5). |
| Lane | `nhs_practice_income` (`competitor_universe_2026-08-26.md` §3 lane 8) |
| Source file | `Medical/web/content/blog/arrs-reimbursement-employing-pcn-staff-tax.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** Frontmatter carries `metaTitle`, `h1`, `title` is absent (see §6), `keyTakeaways`, `summary` and the `faqs` list. **Write new blocks as raw HTML to match**, per memory `blog_page_rendering_html_in_frontmatter`. |
| Current sha (revert anchor) | `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3` (`git rev-parse HEAD`, 2026-08-26 16:4x) |
| Last commit touching this file | `054030f94651cd3c4415c352887086b82d2cffab` (`git log -1 -- <file>`), file clean at HEAD (`git status --porcelain <file>` returns nothing) |
| Revert path | `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/arrs-reimbursement-employing-pcn-staff-tax.md` |

**Sha drift, recorded rather than reconciled.** `BATCH3_INDEX.md` §6 records "Repo HEAD at build time
`7be12b11`". At the time this pack was written `git rev-parse HEAD` returns `d2e75655` and
`git log --oneline -5` does not contain `7be12b11` at all. Other agents are working the same repo
concurrently and the branch state moved between the index build and this pack. **The revert anchor
above is the one to use**, because it is the sha this file's content was read at. Re-run
`git rev-parse HEAD` immediately before the edit and use that instead if it has moved again.

### Why this page grades EXTEND, and it is a ruling rather than a plain read of the table

**§9.2's grade table does not classify this page.** REFRAME requires Bing clicks **= 0**. EXTEND
requires Bing clicks **>= 3** (or Bing impressions >= 300, or Google clicks >= 1, or Google
impressions >= 300). This page has **1 Bing click**, **11 Bing page-level impressions**, **0 Google
clicks** and **0 Google impressions**. It matches neither branch. It is one of the 26 URLs that fall
in the hole, recorded as defect **D4**.

**`BATCH3_INDEX.md` §2.4 rules the hole closed: 1 or 2 Bing clicks at a Bing average impression
position of 10 or better grades EXTEND.** This page holds **Bing average impression position 4.5**
(`GetPageStats`, impression-weighted across the three in-window snapshots, arithmetic in §2.2), so
it qualifies on the position test and grades **EXTEND**. The position condition is what stops a
future page with two clicks from position 40 being frozen by accident.

**The writer must not treat this as a weaker EXTEND than a 7-click page.** The equity at risk is
position, not volume: this page sits at an average impression position of 4.5 on Bing and holds
**position 1.0 on two named queries** (§2.3), on a site where Bing sends 3.4x Google's clicks. That
is exactly the equity a title or heading change destroys, which is the whole reason §2.4 was ruled
this way rather than the other way.

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `ARRS: Employing PCN Staff, Reimbursement & the Tax`
2. `h1`: `ARRS Explained: Reimbursement, Employing PCN Staff and the Tax Consequences`
3. `metaDescription`, `slug`, `canonical`, `date`, `category`, `author`, `generator`, `image`, the
   whole `imageCredit` block, `altText`, `summary`, `schema`.
4. The existing **H2 sequence, in this relative order, each string unchanged**:
   1. `What ARRS Is, and the One Thing Practices Get Wrong`
   2. `Which Roles Are Reimbursable`
   3. `Reimbursement Up to a Maximum, Not Free Money`
   4. `Who Employs ARRS Staff (the Model Decides Everything That Follows)`
   5. `The Payroll, Pension and Employer-Cost View`
   6. `The VAT Trap on Shared ARRS Staff (the Expensive One)`
   7. `How the Reimbursement Should Sit in the Accounts`
   8. `How We Help GP Practices and PCNs`
5. All **9 existing H3 strings**, all existing paragraphs, all **14 existing FAQ** questions and
   answers, all **5 existing key takeaways**. **Nothing existing is reworded, reordered, shortened
   or "tidied".**

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before** the existing
   `How We Help GP Practices and PCNs` H2, so the eight existing H2s remain an unbroken subsequence
   in their existing relative order and the byte-identity check in §7.3 reads cleanly. This page has
   no `Related Reading` block, so appending after `How We Help` would also technically satisfy K2,
   but it puts new material below the CTA section where nobody reads it. **Before, not after.**
2. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place
   unchanged, in order.
3. **New key takeaways appended** to `keyTakeaways` (optional; the existing 5 stay).
4. New internal links **inside the NEW blocks only**. No new link inside any existing paragraph.
5. **One new table** (L4, see §6 finding 5). It must sit inside a new block.

### The de-stale escalation, for the manager, not for the writer

**This page contains no instance of the string `2026/27` and eight instances of `2025/26`**
(`grep -c` on the source file). The live GP contract year is **2026/27**, governed by the GMS
Statement of Financial Entitlements Directions 2026 (`house_positions.md` §3, re-verified
2026-08-26). Three existing passages are **stale-framed, and one is arguably now wrong in substance**:

| Where | Existing text | Status |
|---|---|---|
| keyTakeaway 2, body under `Which Roles Are Reimbursable`, FAQ `Are salaried GPs and practice nurses covered by ARRS now?` | "For 2025/26 the previously separate GP ARRS pot was merged into the main ARRS as a short-term measure, practice nurses were added, and there is no cap on the number of GPs who can be engaged." | **Stale framing, and the 2026/27 position has moved past it.** See §4.5: for 2026/27 NHS England redirects £292m from the PCN Capacity and Access Payment to a **new practice-level GP reimbursement scheme**, withdraws CAP, CASP and CAIP from the PCN DES, and adjusts ARRS to allow recruitment of experienced rather than only newly qualified GPs with caps set at full salaried GP rates plus on-costs. |
| keyTakeaway 5 and the `Employment Allowance Question` H3 and its FAQ | "The Employment Allowance is £10,500 for 2025/26" | **Right figure, stale year tag.** `house_positions.md` §5, verified 2026-08-26 at https://www.gov.uk/claim-employment-allowance : £10,500 **carries into 2026/27 unchanged**. |
| body under `Reimbursement Up to a Maximum, Not Free Money` and its FAQ | "the reimbursable amount for a GP was around £82,418 plus on-costs for 2025/26 (increased by £9,305 in-year)" | **Correctly hedged and correctly year-tagged**, and superseded in substance by the 2026/27 change above. It is already labelled "for illustration only" and "a snapshot, not a fixed figure". |

**These conflict with K2 and the writer must not resolve it alone.** EXTEND forbids rewording
existing text; the de-stale duty in the engine doc says stale framing gets fixed. **Handling,
identical to the ruling in the QOF pack §1:** the writer leaves all three byte-identical, writes the
**2026/27** framing into the NEW blocks, and **escalates these three passages to the manager as a
named item**. The manager decides whether a year-tag-only edit is permitted as a factual-currency
exception under batch-1 coordinator ruling 3 ("EXTEND restricts structure and positioning, never
truth; factual corrections inside frozen copy are required, not merely permitted, and are noted in a
one-line addendum"). Ruling 3 arguably already clears the £10,500 year tag. It does **not** clearly
clear the GP-ARRS-pot passage, because that is a substantive change and not a tag.

**Default if the manager does not rule in time: leave all three, write 2026/27 into the new blocks,
report the conflict.** The page is then internally inconsistent for one window, which is worse
editorially and safer for the measurement. Say so in the report rather than deciding it silently.

### Frozen-list position, confirmed against BATCH3_INDEX §1

Run with no status predicate, as §1 requires. The nineteen frozen slugs are `__home`,
`becoming-gp-partner-financial-implications`, `buying-into-gp-partnership-capital-parity-explained`,
`gp-accounting-guide`, `gp-limited-company-tax-benefits-drawbacks`,
`gp-partner-vs-salaried-gp-tax-comparison`,
`gp-partnership-mutual-assessment-period-what-to-check`, `gp-partnership-tax-complete-guide`,
`gp-payroll-services`, `gp-pension-contributions-tax-relief`,
`gp-tax-deductions-complete-list-2026`, `gp-vat-registration`,
`locum-doctor-self-assessment-filing-guide`, `locum-doctor-tax-complete-guide`,
`medical-professional-expenses-what-is-claimable`, `nhs-pension-annual-allowance-complete-guide`,
`nhs-pension-for-locums-form-a-form-b`, `nhs-pension-scheme-pays-doctors-deadlines`,
`nhs-pension-tapered-annual-allowance-calculator`.

**`arrs-reimbursement-employing-pcn-staff-tax` is not among them. It is workable now.**

Note that **four pages this one links to ARE frozen**: `gp-payroll-services`, `gp-vat-registration`,
`gp-accounting-guide` (`status='flagged'`, which is HOLD, not clearance) and
`gp-tax-deductions-complete-list-2026`. **Contextual links to their live URLs are fine and the
existing links stay. No new material may be written toward any of them, and none of their facts may
be annexed.** All four links resolve: the source files exist under
`Medical/web/content/blog/` (checked by file test, 2026-08-26).

**Never propose a collapse, a redirect or a URL change (§5 locked rules, K4). No em-dashes (I1).**

---

## 2. Equity register

**Both engines re-pulled fresh by this task on 2026-08-26. Data-through 2026-08-23.**

### 2.1 Google: ZERO, and what that does and does not mean

```
# GSCQueryFetcher("medical") -> property sc-domain:medicalaccounts.co.uk
searchanalytics().query(dimensions=["page"],       start=2026-05-25, end=2026-08-23) -> 21 rows
searchanalytics().query(dimensions=["page","query"], same window)                    -> 259 rows
# rows whose page key contains "arrs-reimbursement-employing-pcn-staff-tax": 0 and 0
```

**Google page dimension: 0 clicks, 0 impressions, no row at all. Google page+query dimension: 0
rows.** The URL does not appear in either result set.

**A page with no history is not the same as a page that ranks nowhere.** GSC returns no row for a
URL that was never served in a result, and it also returns no row for a URL Google has not indexed.
On this domain **Google indexes roughly 21 of 138 sitemap URLs** (`BATCH3_INDEX.md` §8, and the 21
is literally the page-row count above), so **absence here is a fact about crawl demand, not about the
page**. This URL has never been given the chance to fail on Google. It is one of the 44 no-data URLs
recorded as defect **D5**, and no line of the drafted page, and no later read, may describe it as
"ranking nowhere" or "not ranking".

The secondary reason absence is uninformative here: GSC anonymises low-volume queries, so even an
indexed page with a handful of impressions can return an empty query breakdown. That is not the
explanation in this case, because the **page** dimension is also empty, which is the stronger signal.
Both are stated so a later reader does not have to re-derive which one applies.

### 2.2 Bing, `GetPageStats`, PAGE LEVEL. This is the grade number.

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")  -> 303 rows, 14 weekly
snapshots dated 2026-05-22 to 2026-08-21. Window per BATCH3_INDEX §0.1 = the 13 snapshots
2026-05-29 to 2026-08-21. Rows whose Query field is this URL: 3.
```

| Snapshot date | Impressions | Clicks | AvgImpressionPosition |
|---|---|---|---|
| 2026-07-31 | 7 | 0 | 5 |
| 2026-08-07 | 3 | 0 | 3 |
| 2026-08-14 | 1 | **1** | 6 |
| **Window total** | **11** | **1** | **4.5** |

Impression-weighted average impression position: `(5x7 + 3x3 + 6x1) / 11 = 50 / 11 = 4.545`, which
rounds to **4.5** and reproduces the brief's figure exactly. **Do not take the unweighted mean of
the three positions (4.67); that is a different and wrong number.**

**Three snapshots of thirteen, not thirteen.** `GetPageStats` is top-N (`bing_query_stats_topn_trap`
memo, and `BATCH3_INDEX.md` §9 limitation 2). This URL is absent from ten of the thirteen weekly
snapshots. **Absence from a snapshot is not proof of zero impressions in that week**, it is absence
from the top N. The window totals above are therefore a **floor**, not a measurement, and any later
read must be run the same way so the comparison is like with like.

### 2.3 Bing, `GetPageQueryStats`, NAMED-QUERY LEVEL. This is the do-not-lose list.

```
BingWebmasterClient().get_page_query_stats(
    siteUrl="https://medicalaccounts.co.uk",
    page="https://www.medicalaccounts.co.uk/blog/arrs-reimbursement-employing-pcn-staff-tax")
-> 7 rows
```

**Fetch note, worth recording because it costs a wasted call otherwise:** this endpoint returns **0
rows** for a path-only `page` argument (`/blog/arrs-...`) and **7 rows** for the absolute
`https://www.medicalaccounts.co.uk/...` form. Both `siteUrl` spellings (with and without `www.`)
return the same 7 rows once the page argument is absolute. The QOF pack's provenance line records a
path-style argument; on this endpoint that form yields nothing.

**7 named queries | 10 impressions | 0 clicks.**

| Query | Impr | Clicks | Avg impression pos | Snapshot |
|---|---|---|---|---|
| `can i do accountcy after arrs` | 4 | 0 | 4.0 | 2026-07-31 |
| `issues with arrs staff, does the pcn manager deal with if employed by the pcn limited company` | 1 | 0 | **2.0** | 2026-07-31 |
| `issues with arrs staff, does the pcn manager deal with` | 1 | 0 | 10.0 | 2026-07-31 |
| `pcn deduction` | 1 | 0 | 9.0 | 2026-07-31 |
| `do use pcn nhs for deductions` | 1 | 0 | 6.0 | 2026-08-07 |
| `does arrs reimbursement cover expenses paid to the employee` | 1 | 0 | **1.0** | 2026-08-07 |
| `if you pay an arrs staff indemnity costs can this be reclaimed via arrs` | 1 | 0 | **1.0** | 2026-08-07 |

**Every query in this table is a DO-NOT-LOSE query. Any one that stops matching after the change is
a named BLOCK.**

Two structural notes the writer needs:

1. **Rows 2 and 3 are a nesting pair, not two ideas.** `issues with arrs staff, does the pcn manager
   deal with` is a strict prefix of the longer query. Under the V1 enforcement note they are counted
   as **one** non-overlapping longest match, not two. Any V1 finding on this page must quote the
   spans it counted, and must not report these as two orders of one idea.
2. **All seven are operational employment questions and not one is a funding question.** Nobody
   reaching this page is asking what the PCN DES envelope is or how core PCN funding flows. They are
   asking who the employer is, what the reimbursement covers, and what comes out of the payment.
   **That is O21's territory precisely, and it is independent confirmation that the O19 to O24 split
   is drawn in the right place.** Section 5 turns this into the whitespace argument.

### 2.4 The two §7.1 queries the brief names, and why they are the measurable ones

- **`does arrs reimbursement cover expenses paid to the employee`**, 1 impression, **average
  impression position 1.0**. We rank first on Bing for a precise reimbursement-scope question and the
  page answers it only by implication: the body says ARRS reimburses "actual salary plus defined
  employer on-costs (employer National Insurance and employer pension) up to a maximum", from which a
  careful reader can infer that a mileage or course-fee reimbursement paid to the employee is not an
  on-cost. **The page never says so in its own words.**
- **`if you pay an arrs staff indemnity costs can this be reclaimed via arrs`**, 1 impression,
  **average impression position 1.0**. The string `indemnit` appears **zero times** in the source
  file (`grep -c`). We are at position 1 on a question the page does not address at all.

Both are §7.1 material. Both are answerable in the page's own words. Neither needs a figure, which
matters because the current-year cap figures are not locked in house positions (§7.4).

---

## 3. The market's keyword set

**Source:** `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, the
persisted 32,872-row harvest across 27 domains, no volume floor. No new DataForSEO call was made.

**Selection regex, printed so the counts are re-derivable:**

```sql
select competitor_domain, ranked_keyword, position, search_volume, url
from dataforseo_competitor_data
where site_key='medical'
  and ranked_keyword ~ '\yarrs\y|additional roles reimbursement|\ypcns?\y|primary care network|network contract|reimbursement scheme|reimbursement rates|employment allowance|supply of staff|directed enhanced service'
order by search_volume desc nulls last, ranked_keyword;
```

**Regex trap, recorded because it silently halves a count.** Postgres ARE uses `\y` for a word
boundary. `\b` is a **backspace**, not a boundary. A first pass of this query written as
`\marrs\b|...` returned **3 rows**; the corrected `\yarrs\y|...` form returns **41**. Any pack in
this batch quoting a `\b`-delimited regex against this table has undercounted. This is the same
class of defect as the `gsc_page_perf_niche_blindspot` memo: the tool, not the source.

**Raw rows: 41. Deduplicated keywords: 22. Combined volume: 15,860. Domains contributing: 9.**

**Peer-winnable** (deduplicated volume where a peer from `competitor_universe_2026-08-26.md` §2a
holds position <= 20, excluding gov.uk, bma.org.uk, `*.nhs.uk`, MSE and Which): **5 keywords, 660
volume**. Per owner decision 21, peer-winnable **orders** the work and excludes nothing.

| Vol | Best pos | Held by | Peer-winnable | On page | Keyword | Owner |
|---|---|---|---|---|---|---|
| 9,900 | 8 | bma.org.uk | no | **no** | `pcns payment` | **O20** |
| 2,900 | 32 | pricebailey.co.uk | no | **no** | `employment allowance 2025/26` | O21, and see the ARREARS note |
| 1,300 | 103 | e-accounts.co.uk | no | **no** | `employment allowance 2026/27` | **O21, ours** |
| 260 | 13 | bhp.co.uk | **yes** | **no** | `pcn des` | **O20** |
| 260 | 28 | practiceindex.co.uk | no | **no** | `pcn des 26/27` | **O20** |
| 140 | 11 | medicsmoney.co.uk | yes | no | `basic pay arrs` | **NOT OURS, ARREARS** |
| 140 | 13 | practiceindex.co.uk | yes | no | `pcn manager jobs` | NOT OURS, recruitment |
| 90 | 41 | practiceindex.co.uk | no | **no** | `gp reimbursement scheme 26/27` | **O21, ours** |
| 90 | 43 | aisma.org.uk | no | **no** | `gp reimbursement scheme 26 27` | **O21, ours** |
| 90 | 15 | bma.org.uk | no | no | `what is pension arrs` | **NOT OURS, ARREARS** |
| 70 | 65 | practiceindex.co.uk | no | **no** | `arrs reimbursement rates 25/26` | **O21, ours** |
| 70 | 10 | bma.org.uk | no | no | `basic pay arrs meaning` | **NOT OURS, ARREARS** |
| 70 | 54 | pricebailey.co.uk | no | **no** | `employment allowance 2025/26 eligibility` | O21 |
| 70 | 17 | practiceindex.co.uk | yes | no | `pcn manager` | NOT OURS, recruitment |
| 70 | 58 | sandisoneasson.co.uk | no | **no** | `what is a pcn nhs` | **O20** |
| 50 | 21 | practiceindex.co.uk | no | no | `maidenhead pcn` | NOT OURS, local jobs |
| 50 | 84 | practiceindex.co.uk | no | **no** | `network contract des 25/26` | **O20** |
| 50 | 38 | practiceindex.co.uk | no | **no** | `pcn des 2026/27` | **O20** |
| 50 | 67 | practiceindex.co.uk | no | **no** | `pcn network` | **O20** |
| 50 | 12 | bma.org.uk | no | no | `what does pension arrs mean` | **NOT OURS, ARREARS** |
| 50 | 15 | medicsmoney.co.uk | yes | no | `what is pension arrs nhs` | **NOT OURS, ARREARS** |
| 40 | 42 | practiceindex.co.uk | no | **no** | `pcn des 2025/26` | **O20** |

### 3.1 THE HOMONYM TRAP, and it is the most important finding in this section

**"ARRS" in this market is overwhelmingly the payslip abbreviation for ARREARS, not the Additional
Roles Reimbursement Scheme.** Five of the 22 keywords, **450 combined volume**, are payslip
questions:

| Keyword | Vol | Best pos | Held by, on this URL |
|---|---|---|---|
| `basic pay arrs` | 140 | 11 | medicsmoney.co.uk `/doctors-pay-slip/` |
| `basic pay arrs meaning` | 70 | 10 | bma.org.uk `/media/1029/bma_junior_doctor_payslip_england_wales.pdf` |
| `what is pension arrs` | 90 | 15 | bma.org.uk `/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance` |
| `what does pension arrs mean` | 50 | 12 | bma.org.uk, the same payslip PDF |
| `what is pension arrs nhs` | 50 | 15 | medicsmoney.co.uk `/nhs-pension-scheme-guide-by-medics-money/` |

Every holding URL is a **payslip explainer**. "Basic pay ARRS" is the arrears line on a junior
doctor's payslip. "Pension ARRS" is pension arrears. **None of these is our topic and none may be
placed on this page.** They are the same shape as the "consultant" trap in dossier §8, where
"consultant" means a tax adviser to Google and a hospital doctor to us, and they are more dangerous
because the string is identical rather than merely ambiguous: a writer told to "place the ARRS
phrasings" would place five payslip phrases and pull the page into a salaried-doctor payslip SERP it
cannot serve, on the site's single best-positioned funding-family page.

**Named and banned. See §7.1's exclusion list.** It is also the reason our own Bing query
`can i do accountcy after arrs` (4 impressions, position 4.0, the largest single named-query row on
this page) is **almost certainly an arrears or a career query and not an ARRS query at all**. It
must not be used to justify any content. It is in the do-not-lose list because it currently matches,
not because it is intent we want.

### 3.2 What is actually ours, after the ownership fence

Strip the O20 rows (the PCN DES and PCN funding family, `pcns payment` at 9,900 included), the
arrears rows and the recruitment rows, and **O21's assigned market set is four keywords**:

| Vol | Best pos | Held by | Keyword |
|---|---|---|---|
| 1,300 | 103 | e-accounts.co.uk | `employment allowance 2026/27` |
| 90 | 41 | practiceindex.co.uk | `gp reimbursement scheme 26/27` |
| 90 | 43 | aisma.org.uk | `gp reimbursement scheme 26 27` |
| 70 | 65 | practiceindex.co.uk | `arrs reimbursement rates 25/26` |

**1,550 volume. Zero peer-winnable at position <= 20. Best position any domain holds on any of the
four is 41.** Plus the two generalist `employment allowance 2025/26` rows (2,970 combined) which are
academy-trust and tax-table pages, not medical, and which we should carry only as the year-tagged
allowance phrase and never chase.

**The honest read: the harvest has almost nothing for this page, and that is the finding, not a
failure of the query.** No harvested domain runs an ARRS employment page. Confirmed by the negative
searches, each run as `ranked_keyword ilike '%<term>%'` against the same 32,872 rows:

| Term | Rows |
|---|---|
| `additional roles reimbursement` | **0** |
| `primary care network` | **0** |
| `supply of staff` | **0** |
| `staff recharge` | **0** |
| `employing staff` | **0** |
| `joint employment` | **0** |
| `cost sharing group` | **0** |
| `clinical pharmacist` | **0** |
| `social prescribing` | **0** |
| `physiotherapist` | **0** |
| `practice staff` / `gp practice staff` | **0** |

**This is the same shape as the two ABSORB clusters `BATCH3_INDEX.md` §4 records as unpackable
(opticians and allied health): the vocabulary is absent from the harvest because none of the 27
harvested domains runs such a page.** The difference, and it is the whole reason this page is worth
working rather than parking, is that **we have live Bing demand for it anyway** (§2.3): seven named
operational employment queries, two at position 1.0, on a topic with no Google-visible market at all.

**Consequence for the writer: section 7.1's phrase list is built from OUR Bing queries and the
2026/27 contract vocabulary, not from the harvest.** The harvest contributes four phrases. It is
stated here so the imbalance is visible rather than looking like an incomplete pack.

---

## 4. Competitor teardown

All fetches made 2026-08-26 with `curl -A "Mozilla/5.0" -sS -L`. Every URL is accounted for and
**every non-200 is recorded with its status code**, never dropped. Domain classification per
`competitor_universe_2026-08-26.md`.

### 4.0 The fetch that failed, recorded not dropped

`https://bhp.co.uk/news-events/blog/the-primary-care-network-directed-enhanced-service-pcn-des-2025-26/`
returned **HTTP 404** (176,504 bytes of BHP's "Page not found" template). This URL is the one
`dataforseo_competitor_data` records as holding `pcn des` at **position 13**, the single best
peer-winnable position in the whole selection set. **The DataForSEO `url` column is truncated in the
harvest display at 90 characters, and the reconstructed path above is a guess that 404s.** Either
the slug differs from the reconstruction or BHP has removed the page while it still ranks. **Not
resolved here.** It is an O20 page in any case (PCN DES), so it does not gate this pack, and it is
recorded in §10 so the wave-A conductor can retry it for the PCN funding pack, which does need it.

### 4.1 bma.org.uk, Primary care network funding
`https://www.bma.org.uk/advice-and-support/gp-practices/primary-care-networks/primary-care-network-funding`
**Class: UNWINNABLE AUTHORITY / NON-RIVAL** (universe §2b: trade union, 15 queries, best position 1,
"cannot be outranked on brand"). **HTTP 200.** Holds `pcns payment` at **position 8 on 9,900
volume**, the largest single row in the selection set.

| | |
|---|---|
| Title / H1 | `Primary care network funding` (identical) |
| Updated stamp on page | Monday 14 April 2025 |
| Word count | ~1,400 |
| H2/H3 | `Declaration of completion for "simpler online requests" in the 2024/25 PCN DES`; `PCN financial entitlements`; `ARRS (additional roles reimbursement scheme)`; `Annual reimbursement rates 2025/26`; `IIF Indicators 2025/26`; `IIF Capacity and Access Payments`; `Capacity and Access Support Payments (£172.2m)`; `Capacity and Access Improvement Payment (£73.8m)` |
| Tables | **Yes**, a financial-entitlements table |
| Calculator | No |
| FAQ block | No |
| Term counts (`grep -ic` on stripped text) | ARRS 8, reimburs 8, employ **2**, VAT **0**, pension **0**, Employment Allowance **0**, supply of staff **0**, cost sharing **0**, indemnit **0** |

**Covers:** the entitlements table verbatim, `Core PCN funding £2.999 per patient, with £2.266 being
multiplied by the PCN registered list size as at 1 January 2025 and £0.733 multiplied by PCN
adjusted population`; `Staff reimbursements  Actual salary plus employer on-costs to the maximum per
WTE amounts as outlined in network contract DES specification`; `Extended access £8.427`;
`Care home premium £130.253 per bed per year`; `network participation payment (£1.76 per patient)`.
On ARRS specifically: "Each PCN is allocated an additional roles reimbursement sum for the year.
This is based on the PCN's weighted population share of the total ARRS funding. PCNs are able to
claim up to this maximum sum each year", plus inner and outer London weighting on the per-role
maxima.

**Corroboration, which is the point of listing it.** The BMA's `Actual salary plus employer on-costs
to the maximum per WTE amounts` is **word for word the mechanic our page already states** ("actual
salary plus defined employer on-costs (employer National Insurance and employer pension) up to a
maximum per whole-time-equivalent"). Two independent statements of the same rule, one of them the
BMA. Our page's central mechanic is safe.

**What it gets wrong or omits, and it is the whole opening:** **zero on employment.** Two instances
of the string "employ" in 1,400 words, both inside the phrase "employer on-costs". **Nothing on who
may be the legal employer, nothing on VAT, nothing on the NHS pension, nothing on the Employment
Allowance, nothing on indemnity.** It is a rate card. It tells a PCN what it can claim and nothing
about what it costs to be the employer.

**Consequence for us:** the entitlement figures are **O20's** (`pcn-funding-network-contract-des-explained`),
not ours, and this page is the reason O20 exists. Do not lift the table. The gap it leaves,
everything that follows from actually employing the people, is exactly O21.

### 4.2 practiceindex.co.uk, A brief guide to PCN finance
`https://practiceindex.co.uk/gp/blog/brief-guide-pcn-finance/`
**Class: PEER** (universe §2a #6). **HTTP 200.**

| | |
|---|---|
| Title / H1 | `A brief guide to PCN finance` (identical) |
| Word count | ~1,103 |
| Content H2/H3 | **One**, the title. Everything else is site chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`) |
| Tables | No |
| Calculator | No |
| FAQ block | No |
| Term counts | ARRS 2, Additional Roles 1, employ 5, reimburs 4, pension 5, VAT **0**, Employment Allowance **0**, supply of staff **0**, cost sharing **0**, indemnit **0** |

**Covers:** verbatim, "This year, PCNs can claim up to 100% of the cost of employing a Social
Prescriber and 70% of the cost of employing a Clinical Pharmacist. These percentages include salary,
ER NI, and pension contributions. It's worth noting that the remaining 30% must be met by the PCN.
If the package that you offer these two employees exceeds the total amount that's claimable (£53,492
for PCNs with <100,000 patients), then any excess will have to be met by the par[tnership]". And
"for this inaugural year, 2019/20, the maximum amount that can be claimed by PCNs with less than
100,000 patients is £53,942", with Social Prescriber at AfC scale 6, "£30,401 to a maximum of
£37,267".

**What it gets wrong or omits:** it is **seven years stale and still ranking**. It describes the
2019/20 scheme with two reimbursable posts, when the current scheme has a dozen role families. It
also prints the cap as **£53,942** in one sentence and **£53,492** in another, which is a
transposition error nobody has fixed in seven years. No VAT, no employer choice, no Employment
Allowance, no indemnity.

**The one thing it does that the BMA does not, and that we should:** it states the above-cap excess
consequence in the reader's own money ("any excess will have to be met by the partnership"). Our
page states the same rule three times and never once in that form. It also carries the AfC scale
vocabulary, which our page lacks entirely (`Agenda for Change` count on our source file: **0**).

### 4.3 practiceindex.co.uk, The latest PCN DES guidance
`https://practiceindex.co.uk/gp/blog/latest-version-pcn-des/`
**Class: PEER.** **HTTP 200.** Published **23 April 2020**.

| | |
|---|---|
| Title / H1 | `The latest PCN DES guidance` (identical) |
| Word count | ~962 |
| Content H2/H3 | Effectively none. The page's substantive subheadings are inline bold, including `The dreaded VAT clause` and `New PCN contract sign-up documentation` and `Further reading` |
| Tables | No |
| Calculator | No |
| FAQ block | No |
| Term counts | VAT 4, Additional Roles 1, reimburs 2, ARRS **0**, employ **0**, pension **0**, Employment Allowance **0**, supply of staff **0**, cost sharing **0** |

**Covers, and this is the citable one.** Verbatim: "The dreaded VAT clause. The VAT notice is a
restatement of NHS England's previous VAT guidance and PCNs would be well advised to take note of
the final sentence: 'Practices should note that HM Revenue and Customs has not agreed the position
described in this document and that they are the authority for agreeing, administering and
collecting VAT.'" Also: "The additional roles reimbursement scheme will continue as planned with 100%
reimbursement of actual salary."

**Why it matters more than its 962 words suggest.** Our page already says "NHS England has suggested
ARRS services might be exempt regardless of structure, but that has not been formally agreed by
HMRC, so reliance carries risk." **This is the independent corroboration of that sentence, quoting
NHS England's own disclaimer back at it.** It is the single most useful competitor find in this
teardown and it supports a claim we already make, which is the safest kind of find. **The
attribution is to NHS England's PCN DES VAT notice, not to practiceindex**, and the writer must
verify it at the NHS England source before quoting it (§7.5).

**What it gets wrong or omits:** six years stale, one paragraph on VAT, no analysis, no employer
models, no supply-of-staff explanation, no threshold, no remedy.

### 4.4 sandisoneasson.co.uk, Primary Care Networks
`https://www.sandisoneasson.co.uk/news/post/pcn`
**Class: PEER** (universe §2a #7, "specialist medical accountancy firm, AISMA member. Only 12 URLs
in sitemap: ranks on authority, not volume"). **HTTP 200.** Holds `what is a pcn nhs` at position 58.
**This is the closest thing in the peer set to our page and it is the most important row in the
teardown.**

| | |
|---|---|
| Title / H1 | `Primary Care Networks` (identical) |
| Word count | ~1,523 |
| Content H2/H3 | `PCNS - a recap`; `The flat model`; `Federated model`; `Future models`; `Clinical Directors`. (The page's markup headings are only `Primary Care Networks`, `Address`, `Links`; the five above are inline bold subheadings.) |
| Tables | No |
| Calculator | No |
| FAQ block | No |
| Term counts | VAT **9**, pension 5, ARRS **0**, Additional Roles **0**, reimburs **0**, employ **0**, Employment Allowance **0**, supply of staff **0**, cost sharing **0**, indemnit **0** |

**Covers:** the flat model ("requires one practice to be a fundholder", "holding money on behalf of
the other member practices"), the federated model ("hands over certain responsibilities of the PCN to
your local GP federation", "the federation is acting as fundholder"), future models ("forming a
limited company where the practices are shareholders and directors"), the **surplus-funds tax point**
("if the fundholding practice is carrying surplus funds as at the NHS year end i.e. 31 March... HMRC
would argue that each practice should show their share of any surplus funds within their respective
practice financial accounts and pay tax on this income"), and the clinical director's VAT angle
("the role of CD may not be medical and therefore would not satisfy the VAT exemption for medical
services").

**It also states, and this corroborates us, that a standalone PCN business creates a pension
problem:** "issues such as lack of access to the NHS Pension scheme for PCNs operating in this way
may prove a significant barrier to trading as a standalone business. However, there are solutions
available to share resources whilst maintaining access to the NHS Pension scheme." Our page says the
same thing in its own words ("Scheme access depends on the employment model and the employing body...
particularly where a non-NHS-body entity is the employer"). Two independent statements.

**What it gets wrong or omits, and this is the finding of the whole teardown.** **It says "VAT" nine
times in 1,523 words and never once explains the rule.** Its VAT sentences are, in full: "Consideration
to the practices sharing resources and administration is also important, particularly in relation to
VAT"; "Issues in relation to VAT exist with all structures but in particular the model of a standalone
business. However, these can be overcome with VAT planning and we can assist PCNs in structuring
themselves optimally for VAT". **The words "supply of staff" do not appear. The 20% rate does not
appear. Joint or concurrent employment does not appear. Cost Sharing Group does not appear. The
irrecoverability of the VAT for an exempt practice does not appear.** Nine mentions of a risk, zero
explanations of it, and five separate "get in touch" or "we can help" clauses. It is a service page
wearing a guide's clothes, and it is 2020 vintage on its own evidence ("Primary care networks or PCNs
have been with us for a year or so now").

**Consequence for us:** **the only specialist medical accountant in the peer set writing about PCN
structure treats the VAT question as a reason to call them, and we already explain it.** That is our
whitespace and it is already on the page. See §5 KEEP.

**One theme of theirs we do NOT take: the surplus-funds and fundholder question.** That is who holds
the money and how it flows to member practices, which is **O20** verbatim. Recorded as ELSEWHERE in
§4.6 so the decline is on the record rather than looking like an oversight.

### 4.5 bhp.co.uk, 2026/27 GP Contract Update
`https://bhp.co.uk/news-events/blog/2026-27-gp-contract-update/`
**Class: PEER** (universe §2a #15). **HTTP 200.** Already torn down in the QOF pack §4.6 for its QOF
heading; this pack reads it for its **two ARRS-relevant headings**, which that pack did not.

| | |
|---|---|
| Title | `2026/27 GP Contract Update - BHP, Chartered Accountants` |
| H1 | `2026/27 GP Contract Update` |
| Word count | ~918 |
| H2/H3 | `Contract Uplift`; `Reallocation of Funding – New Practice-Level GP Reimbursement Scheme`; `ARRS – Expanded GP Recruitment Flexibility`; `QOF – 18 Additional Points and Updated Clinical Indicators`; `Access and Demand Management – New Contractual Requirements`; `Vaccinations`; `Key Action Points for Practices` |
| Tables | No |
| Calculator | No |
| FAQ block | No |
| Term counts | ARRS 5, reimburs 3, VAT 1 (incidental), employ 0, pension 1 |

**Covers, verbatim and this is the material that makes our page's 2025/26 framing last year's:**

> "Reallocation of Funding – New Practice-Level GP Reimbursement Scheme. NHS England will redirect
> £292m previously allocated through the PCN Capacity & Access Payment (CAP) directly to practices.
> This funding will support additional GP sessions or new GP recruitment at the practice level. CAP,
> CASP and CAIP will be withdrawn from the PCN DES. This change gives practices greater direct
> control over GP-related funding. However, PCNs that previously used CAP funding across multiple
> sites will need to reassess their financial and workforce plans for 2026/27."

> "ARRS – Expanded GP Recruitment Flexibility. The Additional Roles Reimbursement Scheme (ARRS) has
> been updated to allow recruitment of experienced GPs, not just newly qualified ones. Reimbursement
> caps have been adjusted to reflect full salaried GP rates plus on-costs. Commissioners may also
> approve additional ARRS roles where appropriate. This provides PCNs with a more realistic route to
> strengthen..."

**Corroboration status, and it is not uniform.** The **£485m uplift** and **£13,863m total contract
value** on this page match `house_positions.md` §3 exactly, re-verified against NHS England on
2026-08-26, so those two figures are safe. **The £292m CAP reallocation is corroborated by a second
independent source**: aisma.org.uk's response to the 2026/27 contract changes objects to
"ringfencing £292m of Capacity and Access funding previously distributed at PCN level" (quoted in the
QOF pack §4.8 from `https://aisma.org.uk/2026/02/24/response-to-2026-27-gp-contract-changes/`). Two
sources, one of them the specialist medical accountants' association, disagreeing about whether it is
good and agreeing on the number. **The "experienced GPs not just newly qualified" and "caps adjusted
to full salaried GP rates plus on-costs" statements are BHP's alone** and are not in house positions.
Verify at NHS England before stating (§7.5). If they cannot be verified, the new block says the ARRS
role list and per-role maxima changed for 2026/27 and names where to confirm, which is what the
existing page already does correctly for 2025/26.

**What it gets wrong or omits:** it is a contract-update news post. Two paragraphs on ARRS, nothing
on who employs, no VAT, no pension, no Employment Allowance, no accounting treatment.

**The strongest single signal in this pack, and it is the same shape as the QOF pack's:** the only
accountant in the peer set writing about ARRS in 2026/27 gives it **one H2 in a contract round-up**,
and holds `arrs reimbursement rates 25/26` at **position 85** while doing it. **Nobody has written
the accountant's ARRS employment page. We have.**

### 4.6 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

Every theme present on any competitor page above, minus what our page already covers (§6). §9.9
floor 8 requires **zero undecided themes**. It is zero: **18 themes, 18 decisions.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **2026/27: the new practice-level GP reimbursement scheme, £292m redirected from PCN CAP, CAP/CASP/CAIP withdrawn from the PCN DES** (4.5, corroborated by AISMA) | **COVER** | This is the current-year fact that makes the page read as 2026/27. It is a **reimbursement-mechanics** change, so it is O21's, not O20's: the money stops being a PCN envelope strand and becomes a practice-level reimbursement. Carries `gp reimbursement scheme 26/27` and `gp reimbursement scheme 26 27`. **One sentence naming the PCN DES envelope it left, then link to O20.** |
| 2 | **2026/27 ARRS changes: experienced GPs eligible, caps at full salaried GP rates plus on-costs, commissioner-approved additional roles** (4.5) | **COVER only if verified** | BHP-only. Verify at NHS England's 2026/27 long-read (§7.5). If unverifiable, state that the role list and per-role maxima were revised for 2026/27 and name the source, which is the page's existing and correct habit. |
| 3 | **The above-cap excess stated in the reader's own money** (4.2: "any excess will have to be met by the partnership") | **COVER, re-expressed** | Our page states this rule three times and never as the partners' money. One sentence in a new block, in a different construction from the three existing ones (J1, V5). |
| 4 | **Agenda for Change scales and 100% versus percentage reimbursement** (4.2) | **COVER, one line** | `Agenda for Change` appears **0 times** in our source file. Naming AfC as the pay framework the maxima are set against is free precision and it is the practice manager's word. **Do not quote 2019/20 percentages or the £53,942 / £53,492 cap.** |
| 5 | **Inner and outer London weighting on ARRS per-role maxima** (4.1) | **COVER, one line** | BMA-sourced, mechanical, not a figure. It belongs to O21 (reimbursement mechanics and caps). The **Global Sum's** £2.18 London Adjustment is **O19's and must not appear here.** |
| 6 | **The NHS England VAT notice disclaimer: "HM Revenue and Customs has not agreed the position described in this document"** (4.3) | **COVER as a citation** | Corroborates a sentence the page already carries. Quote NHS England, not practiceindex, and verify at source (§7.5). |
| 7 | **A standalone PCN entity may lose NHS Pension access** (4.4) | COVERED ALREADY | Existing body and FAQ both say it. Do not restate. Add nothing. |
| 8 | **The PCN financial-entitlements rate card**: core PCN funding per patient, extended access, care home premium, network participation payment (4.1) | **ELSEWHERE, O20** | `/blog/pcn-funding-network-contract-des-explained`. **No per-patient PCN figure on this page.** One sentence placing ARRS inside the DES, then link. |
| 9 | `pcns payment`, `pcn des`, `pcn des 26/27`, `network contract des 25/26`, `pcn network`, `what is a pcn nhs` (4.1, 4.2, 4.3, 4.4) | **ELSEWHERE, O20** | 10,560 combined volume and **none of it is ours**. The single biggest volume in the selection set sits behind the ownership fence. Recorded so the decline is deliberate. |
| 10 | **Flat model versus federated model versus fundholder, and PCN surplus funds taxed in member practices at 31 March** (4.4) | **ELSEWHERE, O20** | "Who holds the money and how it flows to member practices" is O20 verbatim. Our page's four employer models are the **employment** cut of the same structures and stay; the **money-holding** cut does not join them. |
| 11 | **Clinical director role, its tax treatment and its VAT status** (4.4) | **ELSEWHERE, O22** | `/blog/pcn-clinical-director-payments-tax`. The page already links it in the opening and that link stays. **No tax treatment of the CD payment anywhere in the new blocks.** |
| 12 | **IIF, Capacity and Access Support Payments (£172.2m), Capacity and Access Improvement Payment (£73.8m)** (4.1) | **ELSEWHERE, O20**, with one exception | The withdrawal of CAP/CASP/CAIP from the PCN DES for 2026/27 is theme 1 and is ours because it is what created the practice-level reimbursement scheme. **The IIF and the 2025/26 CASP/CAIP amounts are O20's and no figure for them appears here.** |
| 13 | **QOF 2026/27, 18 additional points, updated clinical indicators** (4.5) | **DECLINE, O25** | `/blog/qof-income-gp-practice-accounting-explained`, batch 1, in its read window. One sentence and a link at most, and the page currently does not mention QOF at all, which is correct. **Adding a QOF sentence is not required and the safer choice is to add none.** |
| 14 | **Contract uplift £485m to £13,863m, 3.6% cash growth** (4.5) | **DECLINE, O19** | Corroborated and safe, and it is the **core GMS contract** figure, which O19 assigns to `/blog/how-gms-funding-works-global-sum-carr-hill-explained`. **V7: the map wins. Do not state it here even though it is verified.** |
| 15 | **Vaccinations and item-of-service, access and demand requirements** (4.5) | **ELSEWHERE, O23** | `/blog/enhanced-services-gp-practice-income-tax`. Link only, and only if a new block needs it. |
| 16 | Payslip "ARRS" as arrears, `basic pay arrs`, `pension arrs` (3.1, held by medicsmoney and bma payslip pages) | **DECLINE, HARD** | 450 volume of the wrong intent. See §7.1's exclusion list. Placing any of these is a named BLOCK. |
| 17 | `pcn manager`, `pcn manager jobs`, `maidenhead pcn` (practiceindex jobs board) | **DECLINE** | Recruitment intent. practiceindex holds them from a jobs board. Not a content topic and not ours. |
| 18 | Named ARRS role families (clinical pharmacist, social prescriber, first-contact physiotherapist, paramedic) | COVERED ALREADY | The existing body lists nine role families. **`clinical pharmacist`, `social prescribing` and `physiotherapist` return 0 rows in the whole 32,872-row harvest**, so there is no market vocabulary to add. Do not expand the list. |

---

## 5. Whitespace

What no competitor covers, quotably. Four peer or authority pages plus one non-rival were read in
full and one 404'd.

1. **Not one page in the peer set explains the supply-of-staff VAT rule, and the closest peer says
   "VAT" nine times without explaining it once.** sandisoneasson.co.uk (4.4), a specialist medical
   accountancy firm and AISMA member, writes 1,523 words on PCN structure containing **zero**
   instances of "supply of staff", "cost sharing", "reimburs", "employ", "ARRS" or the 20% rate, and
   five separate offers to help. The BMA's own PCN funding page (4.1) has **zero** VAT mentions.
   practiceindex's PCN DES post (4.3) has one paragraph quoting NHS England's disclaimer and no
   analysis. **The explanation of when sharing ARRS staff becomes a taxable supply exists nowhere in
   this market except on our page.** That is the single largest whitespace finding in this pack and
   the answer to it is already written. See KEEP.

2. **Nobody in the market connects the employer model to its consequences.** Four pages describe PCN
   structures (flat, federated, standalone company) and none of them says what each one does to the
   VAT, the NHS pension, the Employment Allowance or the payroll. Our page's fourth H2 does exactly
   that and then walks one consequence through all three models. **No competitor page attempts it.**

3. **Indemnity is absent from the entire peer set and we rank first on the question.** `indemnit`
   returns **0** on every competitor page read (4.1 to 4.5) and **0** on our own source file, while
   Bing gives us **average impression position 1.0** on `if you pay an arrs staff indemnity costs can
   this be reclaimed via arrs` (§2.3). A question with a position-1 ranking, no answer on our page
   and no answer anywhere in the market is the cheapest section in this pack. The frame is the
   reimbursement-scope rule the page already owns (actual salary plus **defined** employer on-costs,
   which are employer NIC and employer pension), plus the CNSGP boundary from
   `house_positions.md` (state indemnity for NHS general-practice **clinical negligence**, not for
   non-clinical, regulatory or privately-funded work). Verify the ARRS treatment at the DES
   specification before asserting it (§7.5).

4. **What the reimbursement covers, as a positive statement.** `does arrs reimbursement cover
   expenses paid to the employee`, **position 1.0**. Every source in the market states the mechanic
   as an inclusion list ("actual salary plus employer on-costs"). **Nobody states the exclusion**,
   which is what the searcher is actually asking. A reimbursement of mileage, a course fee, a DBS
   check or a professional subscription paid to the employee is not salary and not an employer
   on-cost. One short section, no figures needed, answering the question in the negative and saying
   where the cost then falls.

5. **The 2026/27 reallocation, from the employer's chair.** BHP (4.5) reports the £292m move to a
   practice-level GP reimbursement scheme as a funding-flow change. AISMA objects to it as a
   ringfence. **Neither says what it does to the employer**: money that reached a GP through the PCN
   now reaches a practice, so the practice becomes the employer for those sessions, which moves the
   payroll, the Employment Allowance question and the shared-staff VAT question with it. That is the
   O21 reading of a fact two peers report and neither analyses.

6. **The Employment Allowance for a PCN entity.** `employment allowance 2026/27` carries **1,300
   volume** and the best position any harvested domain holds on it is **103**. The two pages that do
   rank on the allowance family are an academy-trust post and a generic tax-rates table
   (pricebailey.co.uk, e-accounts.co.uk), neither of them medical. **No medical page in the market
   addresses whether a PCN company or federation can claim it.** Ours does, correctly and with the
   right hedge. It is missing only the year tag.

7. **The above-cap excess as the partners' money.** practiceindex (4.2) is the only source that says
   it in those terms and its figures are seven years old. Our page states the rule three times in
   three abstract framings and never once as "this comes out of the partners' profit share". One
   sentence, and it links naturally to the accounts section the page already has.

### KEEP, explicitly

Per §9.3 and K1 the specialist layer is never traded away. These are this page's differentiators and
they stay exactly as they are:

- **The whole VAT section**, its control test, the recoverability explanation ("a normal trading
  business... can usually recover it, so VAT is broadly neutral for it. A GP practice cannot"), the
  £90,000 threshold consequence, joint and concurrent employment as the structural answer, and the
  Cost Sharing Group conditions. **This does not exist anywhere else in the market. KEEP.**
- **The on-trust misconception** and its two-questions explanation (who beneficially owns the funds
  versus what one organisation supplies to another for consideration). Genuinely expert, entirely
  unique, and it is the kind of thing a network actually gets wrong. **KEEP.**
- **The four employer models with their consequences walked through.** **KEEP.**
- **The Employment Allowance treatment**, including the public-sector restriction, the HMRC carve-out
  for providers of NHS primary medical services, and the explicit refusal to extend the carve-out to
  a separate PCN company. That last hedge is the correct answer and most sources would have got it
  wrong. **KEEP.**
- **The accounting discipline**: income recognised against the matching staff cost, above-cap excess
  as a net cost, misposting overstating profit, and the partner taxed on profit share not drawings.
  Aligned with `house_positions.md` §1. **KEEP.**
- **The refusal to publish a current per-role cap as a fixed figure.** The page hedges the £82,418
  as "for illustration only" and "a snapshot, not a fixed figure" and tells the reader to confirm at
  source. That is the house position, not timidity. **KEEP.**
- **The cash-flow and reconciliation discipline** (the network pays first and claims after, so the
  claim must be reconciled to the payroll). No competitor mentions it. **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/arrs-reimbursement-employing-pcn-staff-tax.md`, read in full
2026-08-26 at sha `d2e75655`.

| | |
|---|---|
| Word count | **4,500** total on the file (`wc -w`), **2,862** in the HTML body only (tags stripped) |
| `metaTitle` | `ARRS: Employing PCN Staff, Reimbursement & the Tax` (50 characters) |
| `h1` | `ARRS Explained: Reimbursement, Employing PCN Staff and the Tax Consequences` |
| `title` | **Absent.** This page has no `title` frontmatter key. The QOF page has one. Recorded in §10 as a corpus inconsistency, **not** something this pack fixes. |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` (an existing TSX route, `src/app/blog/gp-practice-management`; not the `Employment Status` category that 404s per defect D1) |
| FAQ entries | **14** |
| Key takeaways | **5** |
| Tables | **None** |
| Calculator | None |
| Em-dashes | **0** (I1 clean) |
| Rendering | Markdown file whose body is raw HTML. Write new blocks as raw HTML. |

**Current heading list, verbatim and in order:**

- H2 `What ARRS Is, and the One Thing Practices Get Wrong`
- H2 `Which Roles Are Reimbursable`
- H2 `Reimbursement Up to a Maximum, Not Free Money`
- H2 `Who Employs ARRS Staff (the Model Decides Everything That Follows)`
  - H3 `Single Lead (Host) Practice Employs`
  - H3 `The PCN as a Separate Legal Entity`
  - H3 `Joint or Shared Employment`
  - H3 `Direct Practice Employment and Other-Provider Models`
- H2 `The Payroll, Pension and Employer-Cost View`
  - H3 `The Employment Allowance Question`
- H2 `The VAT Trap on Shared ARRS Staff (the Expensive One)`
  - H3 `The Control Test`
  - H3 `Why the 90,000 Pounds Threshold Matters`
  - H3 `The Models That Reduce the Risk`
  - H3 `The On-Trust Misconception`
- H2 `How the Reimbursement Should Sit in the Accounts`
- H2 `How We Help GP Practices and PCNs`

**Blunt read.** This is a genuinely good page on a topic nobody else in the market has written, it
is fully compliant with the ownership map, and **it is written entirely in the previous contract
year**. The gap is currency and two named questions, not quality.

Specifically, and each item is countable:

1. **`2026/27` appears zero times. `2025/26` appears eight times.** The live contract year is
   2026/27 (`house_positions.md` §3). This is the single largest defect on the page and it is the
   §1 escalation.
2. **`indemnit` appears zero times**, on a page that holds Bing position 1.0 for an indemnity
   question (§2.3).
3. **`expenses paid` appears zero times**, on a page that holds Bing position 1.0 for
   `does arrs reimbursement cover expenses paid to the employee` (§2.3).
4. **The NHS Pension employer contribution rate is never stated.** `23.7` returns zero. The page
   names "employer pension" as a reimbursable on-cost five times and never says what it costs.
   `house_positions.md` §2.C locks it at **23.7% of pensionable pay**, verified 2026-08-26 at
   https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions, applicable from 1
   April 2024 and still current for 2026/27. This is the largest single on-cost on an ARRS post and
   it is missing from the page that owns employer on-costs. **It is squarely O21's** (row O21 names
   "the payroll, pension and employer-NIC consequences") and it is not O1's, which is the **member**
   tier table.
5. **No tables, against L4.** The page carries a four-way employer-model comparison, a
   reimbursable-versus-not distinction and a set of on-costs, and every one of them is prose. L4
   requires at least one table on a page carrying a comparison. The four models by their four
   consequences is the obvious one and it is currently a 178-word paragraph.
6. **`Agenda for Change` appears zero times. `PCSE` appears zero times.** AfC is the pay framework
   the maxima are set against (theme 4). PCSE is correctly absent and should stay absent: it is
   pension records and payments, which is O26 and the frozen `gp-payroll-services`, not this page.
7. **No worked example, against G1.** The page's topic involves arithmetic (a post above the cap, a
   20% VAT charge on a recharge that cannot be recovered) and carries none. `Worked example` returns
   zero, so G6 and J4 are clean and the label is free to use correctly. The language spec §G records
   that **zero of nine competitor pages** carry a worked example, and this teardown adds five more
   pages with none. It is the widest quality gap in the niche and it is cheap.

**Check against the CURRENT rules, including V2 (which is a live standard, not a batch-2 rule):**

| Rule | Measured | Verdict |
|---|---|---|
| I1 em-dash | 0 | **PASS** |
| V2 keyword-research narration | 0 hits for `also searched as` / `also written as` | **PASS** |
| G6 / J4 `Worked example` label | 0 | **PASS** |
| A1 direct answer in first 60 words | Answer lands at word 30 ("It is a reimbursement of defined employment costs up to a capped maximum") | **PASS** |
| A3 no scene-setting opener | No hypothetical, no rhetorical question, no "in this blog", subject is not us | **PASS** |
| L2 hub band 2,000 to 3,200 | 2,862 body words | **PASS** |
| K1 specialist density baseline | 15 distinct figures; `supply of staff` 11, `Cost Sharing Group` 6, `Network Contract DES` 10, `exempt` 19, `HMRC` 12, `concurrent employment` 3, `whole-time-equivalent` 3, `partial-exemption` 2, `secondary Class 1` 1, `Core Network Practice` 1 | **Baseline for the >= test in §7.6** |
| **C1 sentence length** | **mean 25.8 words** (band 15 to 22), **longest 69 words** (cap 40) | **FAIL** |
| **C3 second person** | **2.4** instances of you/your per 1,000 words (target 12 to 25) | **FAIL, badly** |
| **C4 first person plural** | **3.8** per 1,000 (cap 3.0), and `How We Help GP Practices and PCNs` puts "We" in an H2, which C4 forbids outright | **FAIL** |
| **L4 at least one table** | 0 tables | **FAIL** |
| **G1 worked example** | 0 on a calculation topic | **FAIL** |
| B4 question-form H2 rate | 0 of 8 (band 50% to 75%) | **FAIL, but see below** |
| J6 triadic / "it is not X, it is Y" | The opening runs "It is not. It is a reimbursement..." Once. Cap is 2 | **Within cap, but it is the named-and-burned batch-1 construction and it is in the first two sentences** |
| V9 numeral-count paragraph opener | 2 (`One`, `Two`) | **Within cap** |

**Four of these are not fixable and must not be attempted.** C1, C3, C4 and B4 all measure the
**existing frozen copy**, which K2 forbids touching. Batch-1 coordinator ruling 2 governs:
"on EXTEND pages the structural bands are scored against the EXTEND reality. A frozen structure can
make the question-form heading rate and the FAQ count unreachable. That is a consequence of the
grade, not a defect, and a writer must never contort a page to reach a band the grade forbids."

**What the writer does instead:** write the NEW blocks to the bands, so the page moves toward them
without any existing byte changing. New H2s question-form (B2, B4). New prose at 15 to 22 words a
sentence with no sentence over 40 (C1). New prose in the second person, densely (C3). **Zero
instances of "we", "our" or "us" in any new block** (C4), which also keeps the new material out of
the CTA register. §7.6 makes each of these a countable test **on the new material only**.

**Two things the page does that are worth naming as good, because a QA agent should not "fix" them:**

- The £82,418 GP cap is triple-hedged ("As an illustration only", "for 2025/26", "Treat that as a
  snapshot for that year, not a fixed figure, and confirm the current amount at source"). That is
  F1 and F7 done properly.
- The Employment Allowance answer refuses to extend the GP-practice carve-out to a PCN company. Most
  sources would have generalised it. Do not let a later editor "simplify" that hedge away.

**Nothing on the page contradicts `house_positions.md`.** Checked against §5 (employer secondary
Class 1 NIC 15% above the £5,000 secondary threshold; Employment Allowance £10,500, not available
where the only employee is a single director), §6 (VAT medical-care exemption under Sch 9 Group 7,
the £90,000 registration threshold on taxable turnover only), §2.C (a company cannot hold a GMS/PMS
contract, company income is not NHS-pensionable, scheme access depends on the employing body) and §1
(a partner is taxed on profit share, not drawings). **All correct.** The only house-position item the
page omits and should carry is the 23.7% employer contribution rate (item 4 above).

---

## 7. Deterministic acceptance criteria

### 7.1 The named missing-phrase list the 14 and 28 day read is measured on

**14 required phrases.** These are the phrases the later Bing read is scored against. **None of them
appears verbatim in the current source file** (checked by `grep -o`, case and punctuation
normalised). Ordered by tier.

**Tier A, the two position-1.0 Bing questions the page does not answer. These are the measurement.**

| # | Phrase | Source | Where it must land |
|---|---|---|---|
| 1 | `does arrs reimbursement cover expenses paid to the employee` | Bing `GetPageQueryStats`, 1 impr, **pos 1.0** | New FAQ **question**, verbatim |
| 2 | `expenses paid to the employee` | same, sub-phrase | New H2 or body sentence |
| 3 | `indemnity costs` | Bing `GetPageQueryStats`, `if you pay an arrs staff indemnity costs can this be reclaimed via arrs`, 1 impr, **pos 1.0** | New body sentence |
| 4 | `reclaimed via arrs` | same | New FAQ question |

**Tier B, the 2026/27 currency vocabulary. This is what makes the page current.**

| # | Phrase | Vol | Best pos held | Where |
|---|---|---|---|---|
| 5 | `2026/27` | n/a | n/a | New H2, and every new figure's year tag (F1) |
| 6 | `gp reimbursement scheme 26/27` | 90 | 41, practiceindex | New H2 or FAQ question |
| 7 | `gp reimbursement scheme 26 27` | 90 | 43, aisma | New body sentence |
| 8 | `practice-level` | n/a | n/a | New body sentence (the £292m reallocation) |
| 9 | `arrs reimbursement rates 25/26` | 70 | 65, practiceindex | New FAQ question, framed as the prior year against 2026/27 |
| 10 | `employment allowance 2026/27` | 1,300 | **103**, e-accounts | New body sentence or FAQ question |

**Tier C, the employer-cost precision the page owes O21.**

| # | Phrase | Source | Where |
|---|---|---|---|
| 11 | `23.7% of pensionable pay` | `house_positions.md` §2.C | New body sentence, tagged 2026/27 |
| 12 | `Agenda for Change` | Market vocabulary (4.1, 4.2) | New body sentence |
| 13 | `employer on-costs` | BMA verbatim (4.1) and market-standard | New H2 or body sentence |
| 14 | `above the reimbursement cap` | Reader-side framing of theme 3 | New body sentence |

**Countable test: 14 of 14 present verbatim. Any absent phrase is a named BLOCK.**

**Placement guidance, not a gate.** Phrases 1 to 4 want one new H2 in the reader's own words,
something on the shape of `What does the ARRS reimbursement actually cover?`, with the two FAQs
below it. Phrases 5 to 10 want one clearly-scoped current-year H2 that can be re-cut each April,
with the prior year subordinated to a single clause (F2: **maximum one tax year gets its own
paragraph or heading**). Phrases 11 to 14 belong in an employer-cost block that pairs naturally with
the new table (L4).

**V1 ENFORCEMENT ON THIS LIST.** Count **non-overlapping longest matches**, never raw substrings.
Phrase 1 contains phrase 2. Phrases 6 and 7 are two orders of one idea, which is exactly the V1 cap
of two and not a third. Phrase 9 is a different idea (the prior year's rates) from 6 and 7 (the
2026/27 scheme) and does not count against them. **Any V1 finding on this page must quote the spans
it counted.** Match longest first, consume the span, count what remains.

### 7.1a THE EXCLUSION LIST. Placing any of these is a named BLOCK.

**Five phrases, 450 volume, all of them the payslip-arrears homonym (§3.1):**

`basic pay arrs` · `basic pay arrs meaning` · `what is pension arrs` · `what does pension arrs mean`
· `what is pension arrs nhs`

Plus three recruitment phrases held by practiceindex's jobs board: `pcn manager` · `pcn manager
jobs` · `maidenhead pcn`.

**Countable test: count of excluded phrases present on the page = 0.**

### 7.2 Equity preservation (§9.9 floor 5)

**All 7 named Bing queries in §2.3 must still match** in `metaTitle`, `h1`, an H2, an FAQ or body
prose after the change. Google contributes 0 rows, so the combined equity set is **7**.

**Countable test:** 7 of 7 matchable. Run
`python scripts/track2_query_coverage.py --slug arrs-reimbursement-employing-pcn-staff-tax --json`.

**They cannot be lost by this change**, because the change is additive only and no existing text is
removed. The gate exists so that a later editor who does remove something is caught, and so the
28-day read has a baseline to compare against.

**Note on `can i do accountcy after arrs`** (4 impressions, position 4.0, the page's largest named
row). It is protected because it currently matches, **not** because it is intent we want (§3.1). If
it stops matching, that is a data point about the arrears homonym and not necessarily a defect. Say
so in the read rather than reverting on it alone.

### 7.3 EXTEND byte-identity (K2)

Diff the pre and post files. The following must be byte-identical:

- `metaTitle: "ARRS: Employing PCN Staff, Reimbursement & the Tax"`
- `h1: "ARRS Explained: Reimbursement, Employing PCN Staff and the Tax Consequences"`
- `metaDescription`, `slug`, `canonical`, `date`, `category`, `author`, `generator`, `image`, the
  whole `imageCredit` block, `altText`, `summary`, `schema`
- All **8 existing H2 strings**, in their existing relative order, as an unbroken subsequence
- All **9 existing H3 strings**
- All **14 existing FAQ question and answer strings**
- All **5 existing `keyTakeaways` strings**

**Countable test:** `git diff` shows **only additions**. **Deletion count must be 0**, unless the
manager has explicitly cleared the de-stale escalation in §1, in which case the permitted deletions
are exactly the passages named in that table and the diff is reviewed line by line.

### 7.4 Figures that are BANNED on this page, and the two that are permitted

| Banned | Why | What the page says instead |
|---|---|---|
| Any **Global Sum per weighted patient** figure, including **£130.07**, and the **£2.18 London Adjustment** | **O19.** The figure is verified in `house_positions.md` §3.A and is nonetheless **not this page's**. The map wins (V7). | Nothing. This page has no reason to mention the Global Sum at all and currently does not. |
| Any **Carr-Hill** explanation or weighting variable | **O19** | Nothing. Currently absent. Keep it absent. |
| Any **QOF point value** | **O25 and O10.** See the §10 correction: the value is now verified, and the ban still stands because it is an ownership ban, not a verification ban. | Nothing. Currently absent. |
| Any **core PCN funding per-patient figure** (£2.999, £2.266, £0.733), **extended access £8.427**, **care home premium £130.253**, **network participation payment £1.76** | **O20.** All from bma.org.uk (4.1). | One sentence placing ARRS inside the Network Contract DES, then link to `/blog/pcn-funding-network-contract-des-explained`. Already present in the opening; do not add a second. |
| **IIF, CASP £172.2m, CAIP £73.8m** as 2025/26 amounts | **O20** | The **2026/27 withdrawal** of CAP, CASP and CAIP from the PCN DES may be named as a fact with no 2025/26 amounts attached. |
| **£485m** uplift, **£13,863m** total contract value, **3.6% cash growth** | **O19.** Verified and corroborated three ways, and still not ours. | Nothing. |
| The **2019/20 ARRS cap** (£53,942 or £53,492) and the **AfC scale 6 range** (£30,401 to £37,267) | Seven years stale, and practiceindex (4.2) prints the cap two different ways in one article | Name Agenda for Change as the pay framework. **No AfC figure.** |
| Any **GMC annual retention fee** | **O9 and `house_positions.md` §8: UNVERIFIED**, GMC returns HTTP 403 | Not applicable here; listed for completeness of the ban. |
| A **current-year per-role ARRS maximum** as a settled figure | Not in house positions. BHP's "full salaried GP rates plus on-costs" (4.5) is BHP's alone. | "Confirm the current per-role maxima in the Network Contract DES specification for 2026/27", which is the page's existing and correct habit. |
| Any **QOF, enhanced services or dispensing** explanation | O25, O23, O24 | One sentence and a link at most, and none is required. |

**PERMITTED figures on this page, each traced to `house_positions.md`:**

| Figure | Year tag | House position | Already on page |
|---|---|---|---|
| Employer secondary Class 1 NIC **15%** above the **£5,000** secondary threshold | from 6 April 2025, unchanged for **2026/27** | §5 and §8, verified 2026-08-26 at the gov.uk NIC rates and allowances page | Yes, as "(from 6 April 2025)" |
| **Employment Allowance £10,500**, not available where the only employee is a single director | **2026/27** (unchanged from 2025/26) | §5, verified 2026-08-26 at https://www.gov.uk/claim-employment-allowance | Yes, tagged 2025/26. **Year tag is the §1 escalation.** |
| **NHS Pension employer contribution 23.7% of pensionable pay** | applicable from 1 April 2024, **still current for 2026/27**, due to be re-set for four years from 1 April 2027 | §2.C, verified 2026-08-26 at https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions | **No. This is §7.1 phrase 11.** |
| **VAT standard rate 20%** on a taxable supply of staff | current | §6 by implication; the standard rate is not year-variable | Yes |
| **VAT registration threshold £90,000**, deregistration £88,000, register within 30 days of the month-end | from 1 April 2024, unchanged **2026/27** | §6, verified 2026-08-26 | £90,000 yes. **Do not add the £88,000 or the 30-day rule: that is `gp-vat-registration`'s (O17, FROZEN).** |
| **£292m** redirected from PCN CAP to a practice-level GP reimbursement scheme | **2026/27** | **Not in house positions.** Corroborated by BHP (4.5) and AISMA independently. **Verify at NHS England before stating (§7.5).** | No |

**Countable test:** count of banned-figure assertions on the page = **0**.

**If a worked example is written (G1)**, its inputs must be explicitly labelled illustrative, the
persona must be a role and an initial only (G4, "a PCN employing one first-contact physiotherapist
on £45,000"), every rate used must already appear in the body with its year (G5), it must sit
immediately after the H2 stating the rule it demonstrates (G2), it must not be labelled "Worked
example" (G6, hard fail), and it must run 80 to 200 words (G7). Every figure must be re-derivable
from the stated inputs by `arithmetic_recomputed[]`. **The natural example is the above-cap excess,
because it needs no published cap: state an illustrative cap, an actual cost above it, and show the
difference falling on the partners.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source URL to re-verify |
|---|---|
| 2026/27 is the live GP contract year; the £292m CAP reallocation to a practice-level GP reimbursement scheme; withdrawal of CAP, CASP and CAIP from the PCN DES | https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ |
| ARRS 2026/27: the role list, the per-role maxima, whether experienced (not only newly qualified) GPs are now eligible, and inner and outer London weighting | Network Contract DES specification for 2026/27, linked from the 2026/27 contract long-read |
| Whether ARRS reimbursement extends beyond salary and employer on-costs (the phrase-1 and phrase-3 answers: expenses paid to the employee, indemnity costs) | Network Contract DES specification 2026/27, the reimbursement and claims sections. **A competitor blog is not a source and neither is inference from our own page.** |
| The NHS England PCN DES VAT notice and its disclaimer, "HM Revenue and Customs has not agreed the position described in this document and that they are the authority for agreeing, administering and collecting VAT" | NHS England PCN DES VAT guidance. Quoted second-hand at https://practiceindex.co.uk/gp/blog/latest-version-pcn-des/ (fetched 2026-08-26, HTTP 200). **Quote NHS England, not practiceindex.** |
| Supply of staff versus exempt medical care, and the control test | https://www.gov.uk/hmrc-internal-manuals/vat-health/vathlt2010 (principal-purpose test) and HMRC VAT Taxable Person Manual on supplies of staff; `house_positions.md` §6 |
| VAT medical-care exemption statute (referenced only, never explained here, O17) | https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 |
| VAT registration threshold £90,000 | https://www.gov.uk/register-for-vat/when-to-register |
| Cost Sharing Group conditions (independent group, members with exempt or non-business activities, exact reimbursement of each member's share, no distortion of competition) | VATA 1994 Sch 9 Group 16 and HMRC VAT Notice 700/2 or the cost-sharing exemption guidance |
| Employer secondary Class 1 NIC 15% above the £5,000 secondary threshold, 2026/27 | https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions |
| Employment Allowance £10,500 for 2026/27, the public-sector restriction, and the single-director exclusion | https://www.gov.uk/claim-employment-allowance ; `house_positions.md` §5 |
| NHS Pension employer contribution rate 23.7% of pensionable pay, current for 2026/27, re-set from 1 April 2027 | https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions ; `house_positions.md` §2.C |
| CNSGP scope: state indemnity for NHS general-practice clinical negligence in England from 1 April 2019, **not** non-clinical, regulatory or privately-funded work | https://resolution.nhs.uk/services/claims-management/clinical-schemes/general-practice-indemnity/clinical-negligence-scheme-for-general-practice/ ; `house_positions.md` Verification log |
| A partner is taxed on profit share, not drawings; SA800 and SA104 | `house_positions.md` §1 |

**Countable test:** every external factual claim in the new blocks maps to a row above with a fetch
date. **Count of unverified claims = 0.** In particular, **the reimbursement-scope answer for
expenses and indemnity (phrases 1 to 4) must be verified in the current DES specification before it
is stated.** If it cannot be verified, the section states the reimbursement rule that IS verified
(actual salary plus defined employer on-costs to a per-WTE maximum), says explicitly that anything
outside that is not reimbursed unless the current specification says otherwise, and names where the
reader confirms it. That is an honest answer to a position-1 query and it satisfies F7.

### 7.6 The four existing floors, §9.9 floors 5 to 8, and the new-material band tests

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug arrs-reimbursement-employing-pcn-staff-tax` | Gate bar met; **0 covered queries lost** |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every worked figure re-derived from labelled illustrative inputs, or the array is empty |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; new links resolve via `slug_resolver.py`. All 13 existing internal targets verified present in `Medical/web/content/blog/` on 2026-08-26 |
| 5. Equity preservation | §7.2 | **7 of 7** Bing named queries still match |
| 6. Cluster coverage | §7.1 | **14 of 14** assigned phrases placed, **0 of 8** excluded phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic attaches to this page.** `BATCH3_INDEX.md` §4 prescribes exactly one workable NO-PAGE topic in wave A (corrected order 12, GMS/APMS) and it goes to the **GMS** page, not this one. The ledger does not move for this page. Record the non-move so a later reader does not look for it. |
| 8. Competitor re-read | §4.6 | **18 themes, 18 decisions, 0 undecided.** One fetch recorded as HTTP 404 (§4.0), not dropped |

**New-material band tests. These score ONLY the added blocks, never the frozen copy** (batch-1
coordinator ruling 2):

| ID | Test on the new blocks only | Pass |
|---|---|---|
| C1 | Mean sentence length | 15 to 22 words, **no sentence over 40** |
| C3 | "you" or "your" per 1,000 new words | 12 to 25 |
| C4 | "we", "our", "us" in the new blocks | **0**, and none in any new H2 |
| B2 | Every new H2 contains a §7.1 phrase or starts with What / How / When / Who / Can / Do / Is / Why | 100% |
| B4 | Question-form share of the new H2s | at least 50% |
| L4 | Tables on the page after the change | **at least 1**, in a new block |
| G1 | Worked examples | exactly 1, satisfying G2 to G7 |
| K1 | Specialist density | figures, statutory references, form names and technical terms **>= the §6 baseline**. Any decrease is a hard fail requiring named justification |
| J6 / V5 | `it is not X, it is Y` in the new blocks | **0.** The construction is already used once in the page's opening and it is the batch-1 tic |
| V9 | Numeral-count paragraph openers in the new blocks | **0.** Already at 2 on the page and it is batch 2's burned tic |
| I1 | Em-dashes | 0 |
| F1 | Every new rate, threshold or allowance carries its tax year or effective date in the same sentence | 100% |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere, including frontmatter and FAQ answers.
2. **No new internal link inside any existing paragraph.**
3. **Do not touch any frozen page.** Four of this page's link targets are frozen or flagged
   (`gp-payroll-services`, `gp-vat-registration`, `gp-accounting-guide`,
   `gp-tax-deductions-complete-list-2026`). Contextual links to their live URLs are fine. **No new
   material may be written toward them and none of their facts may be annexed.**
4. **No collapse, no redirect, no URL change** (K4).
5. **Never use UDAs, dental bands or any dental framing** (`house_positions.md` §3).
6. **Never call ARRS a grant, a bonus or free money.** It is a reimbursement of incurred cost up to a
   maximum. The page's whole opening rests on this and every new block must be consistent with it.
7. **Never say a PCN company can claim the Employment Allowance.** The verified position is that
   HMRC treats providers of NHS primary medical services (GP practices) as outside the public-sector
   restriction; a separate PCN entity is fact-sensitive and must take advice. Do not generalise it in
   either direction.
8. **Never state that ARRS staff are always in the NHS Pension Scheme.** Access depends on the
   employing body.
9. **No regulated-activity claim** (I3). The VAT and structuring material points at specialist advice
   and never recommends a structure.
10. **The category stays `GP Practice Management`.** Do not change it to anything else, and in
    particular not to `Employment Status`, which is the category that generates the 404 recorded as
    defect D1.

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### Baseline, both engines, from this task's pull of 2026-08-26, data-through 2026-08-23

| Engine and endpoint | Window | Clicks | Impressions | Position |
|---|---|---|---|---|
| Google, GSC page dimension | 2026-05-25 to 2026-08-23 | **0** | **0** | no row |
| Google, GSC page+query dimension | same | **0** | **0** | no rows |
| Bing, `GetPageStats`, **page level**, 3 of 13 snapshots | 2026-05-29 to 2026-08-21 | **1** | **11** | **4.5** avg impression position |
| Bing, `GetPageQueryStats`, **named-query level**, 7 rows | same | **0** | **10** | **1.0** best |

Pro-rated to 28 days from the 13-week Bing window: **1 x 28/91 = 0.31 clicks** and
**11 x 28/91 = 3.4 page-level impressions**. **These numbers are too small for a traffic test and the
expectation below is deliberately not a traffic test.**

### The read at 14 to 28 days, Bing. Phrase coverage, not traffic.

1. **Named-phrase impressions, and this is the primary test.** At least **4 of the 14** phrases in
   §7.1 return at least one Bing impression for this URL in the 28-day window, and **at least 1 of
   those 4 comes from Tier A** (the two position-1.0 questions the page now answers). **Today the
   count is 0 of 14.** Per §9.6 point 2, **total impressions rising while the 14 stay at zero is
   DRIFT and is recorded as a FAIL, not a pass.**
2. **Position, not volume, is the equity test.** The page's Bing **average impression position must
   stay at or better than 7.0** on `GetPageStats` page level across the 28-day window (baseline 4.5).
   A 2.5-place drift on an additive-only change would mean the additive-only rule is not working, and
   that finding is worth more than this page's traffic. **This is the same test wave B applies to
   `gp-partnership-last-man-standing-premises-risk` and it is here for the same reason.**
3. **The two position-1.0 queries must still return an impression** at named-query level, or their
   absence must be explained by the top-N limitation rather than assumed away.
4. **Clicks: no target.** One click in thirteen weeks is not a measurable baseline and setting a
   click target on it would manufacture a false verdict in either direction. **State the click count
   in the read and draw no conclusion from it alone.**

### The read at 28 to 90 days, Google

5. **Any row at all.** Today: 0 page rows and 0 query rows. Target: **at least 1 page-level GSC row
   for this URL by day 90.** One, not three, and the reason is the opposite of the QOF page's: the
   QOF topic's whole keyword set is held by a single peer publisher with no institutional wall, while
   this page's market barely exists on Google at all (**four assigned keywords, 1,550 volume, best
   position any domain holds is 41**, §3.2). **A Google row here would mean the page got indexed, not
   that it beat anyone.** If there is still no row at 90 days, that is a crawl-demand fact about the
   domain (D5) and **not evidence the page failed**.

### Failure trigger (§9.6, written as a number, before the change)

> **If the Bing `GetPageStats` average impression position for
> `/blog/arrs-reimbursement-employing-pcn-staff-tax` falls below 10.0 in any rolling 28-day window
> between deploy and deploy+56 days, revert to
> `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/arrs-reimbursement-employing-pcn-staff-tax.md`.**

Position 10.0 is the threshold because it is the number §2.4's own EXTEND ruling uses. A page that
falls past it would no longer qualify for the grade under which it was worked, which makes the
trigger self-consistent rather than arbitrary.

Second trigger, on the equity gate:

> **If either of the two position-1.0 named queries (`does arrs reimbursement cover expenses paid to
> the employee`, `if you pay an arrs staff indemnity costs can this be reclaimed via arrs`) stops
> returning an impression for this URL for two consecutive 28-day windows, that query is a named
> BLOCK and is investigated before any further change.** Two windows, not one, because the page
> appears in only 3 of 13 `GetPageStats` snapshots and single-window absence on a top-N endpoint is
> noise.

Third trigger, on intent drift:

> **If the page starts returning impressions on any of the five excluded arrears phrases in §7.1a,
> the new blocks have pulled the page into the payslip SERP. Investigate and re-cut before any
> further change**, whatever the click count is doing.

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the
28-day Bing read.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **14
missing phrases from §7.1**, and never with the 7 queries the page already ranks for. **Registration
in `monitored_pages` is a separate owner-triggered step and is NOT done by this pack or by the
writer.**

### Wave-level contribution, so the conductor can reconcile

`BATCH3_INDEX.md` §8 sets the wave-A test at "at least 4 of 6 pages register impressions on a phrase
named in their own pack's section 7.1 that was absent before", against a combined Bing baseline of
**17 clicks / 234 impressions** page-level. **This page contributes 1 click and 11 impressions to
that 17 and 234**, which is 5.9% of the wave's clicks and 4.7% of its impressions. The wave revert
trigger (combined Bing clicks below 13) **cannot be driven by this page**, because losing all of its
traffic moves the combined figure from 17 to 16. Its contribution to the wave verdict is therefore
**entirely the phrase-coverage test**, not the traffic one. Stated so the conductor weights it
correctly and does not read a flat click count here as a wave-level signal.

---

## 9. The ownership map, reproduced verbatim and in full

**This is the most important section of this pack.** Batch 1 failed because twelve pages were
written with no map and the same explanation landed on seven of them.

**THE STANDING RULE, restated because it is the reason this document exists:**

> **Every shared fact has exactly ONE owning page. Every other page gets one sentence and a link,
> never the explanation. A writer who needs three sentences is taking someone else's fact and must
> stop.**

**V7 IS BINDING: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the
map, states neither fact, and reports the conflict. A brief is an instruction about one page; only
the map can see the batch.

### 9.1 The row this page OWNS

Reproduced verbatim from `BATCH3_INDEX.md` §6.2.

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O21** | **ARRS**: which roles are reimbursable, the reimbursement mechanics and caps, **who employs ARRS staff**, the payroll, pension and employer-NIC consequences, and the VAT trap when staff are shared between practices. | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | The PCN funding page gets **two sentences** naming ARRS as a DES strand and hands off. It must not explain the employment model. |

**The employment model is this page's and nobody else's.** Write it fully, and expect no other page
in wave A to carry any of it.

### 9.2 Inherited rows from BATCH3_INDEX §6.1 that constrain this page

Reproduced verbatim.

| # | Shared fact | Owner | Batch-3 consequence |
|---|---|---|---|
| O9 | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** Binds wave F directly (gmc revalidation). |
| O10 | Global Sum per weighted patient (**£130.07, 2026/27, verified**) and the QOF point value (**UNVERIFIED**) | `house_positions.md` §3.A and §3.B | Wave A: the GMS page may state £130.07 with its year tag. **No page in any wave states a QOF point value. Hard fail F5.** |
| O13 | GP practice reimbursement for parental-leave cover under the SFE | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | **Wave A**: the GMS and enhanced-services pages get one sentence and a link. This is a real collision, see O19. |
| O17 | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **Wave A**: the dispensing page gets one sentence on zero-rating and a link. **Wave F**: `private-practice-tax-nhs-and-private-income` gets one sentence. Neither explains the exemption. |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | All waves: one sentence, then link. |

**O17 is the tightest fence on this page and the writer must read it twice.** This page **may** state
that a supply of staff between separate organisations is standard-rated at 20% and that a GP
practice's mostly exempt income makes that VAT largely irrecoverable, because the **supply-of-staff
question is O21's** by the express words of the O21 row. It **may not** explain the Sch 9 Group 7
medical-care exemption, the principal-purpose test, partial exemption or the de minimis limits. The
existing H3 `Why the 90,000 Pounds Threshold Matters` is already at the edge of that fence: it states
the threshold and links out, which is one sentence plus a link and is acceptable. **No new material
may be added to it, and the £88,000 deregistration threshold and the 30-day registration rule must
not appear.**

**O10's Global Sum figure is verified and is still forbidden here.** That is V7 working as intended:
verification is not permission.

### 9.3 New batch-3 rows that FENCE this page

Reproduced verbatim from `BATCH3_INDEX.md` §6.2.

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12 (`what is a GMS contract`, `apms contract`, 1,140 peer-winnable).** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** Batch 1 put the tier table on three pages that did not own it; this is the same shape and it is pre-empted here. |
| **O20** | The **Network Contract DES and the PCN funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. | `/blog/pcn-funding-network-contract-des-explained` | The ARRS and clinical-director pages get **one sentence** placing their subject inside the DES, then link. The GMS page gets one sentence saying PCN money sits outside the core contract, then link. |
| **O22** | **PCN clinical director payments**: how the CD payment is calculated, whether it is employment or self-employment income, how it is taxed, and how it interacts with a partner's profit share. | `/blog/pcn-clinical-director-payments-tax` | The PCN funding page gets one sentence, then link. **No tax treatment stated anywhere else.** |
| **O23** | **Locally commissioned and enhanced services**: DES vs LES vs national enhanced services, how they are contracted, invoiced and recognised in the accounts. | `/blog/enhanced-services-gp-practice-income-tax` | The GMS page gets one sentence naming enhanced services as a funding stream, then link. |
| **O24** | **Dispensing practice income**: the dispensing fee and drug-reimbursement structure, and the **zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12** as distinct from the Sch 9 Group 7 medical-care exemption. | `/blog/dispensing-practice-income-accounts-tax` | Wave A: no other page mentions dispensing income at all. **O17 still binds**: this page states the zero-rating in **one or two sentences** as the contrast, and does not explain the exemption, which belongs to the frozen `gp-vat-registration`. |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **Wave A: one sentence and a link, on every page.** Not reopened in this batch. **No page states a QOF point value (O10, hard fail F5).** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | Wave A: every page that mentions a payment landing gets **one sentence** and a link. Five pages describing income recognition five times is the batch-1 failure. |

### 9.4 Cross-wave rows that constrain this page

Reproduced verbatim from `BATCH3_INDEX.md` §6.2.

| # | Shared fact | **Owner** | Note |
|---|---|---|---|
| **O35** | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

**O35 is a live risk on this page** and the writer should notice why. An ARRS employment page is
naturally drawn toward "is this person employed or self-employed", which is the four-role fork.
**It is not.** This page's employment question is **which organisation is the legal employer of an
employed person**, which is a different question and is O21's. Do not build a status table, do not
name SA800, SA104 or SA103, and do not restate the four roles. One sentence and a link if it is
needed at all, and it probably is not.

### 9.5 The fence stated positively, so the writer can hold it in one line each

| Fact | Owner | What THIS page does |
|---|---|---|
| Network Contract DES envelope, core PCN funding, who holds the money | **O20** | One sentence placing ARRS inside the DES, then link. Already in the opening. |
| Clinical director payments and their tax | **O22** | One sentence and a link. Already in the opening. |
| Core GMS contract, Global Sum, Carr-Hill, GMS vs PMS vs APMS | **O19** | Nothing. |
| Enhanced and locally commissioned services | **O23** | Nothing, or one link. |
| QOF and its point value | **O25**, **O10** | Nothing. |
| Dispensing income and drug zero-rating | **O24** | Nothing. |
| PCSE statement reconciliation | **O26** | One sentence and a link if a payment landing is mentioned. |
| The Sch 9 Group 7 medical-care exemption itself, partial exemption, de minimis | **O17** (FROZEN owner) | Nothing beyond the existing one-sentence-plus-link. |
| The four-role employment-status fork | **O35** (FROZEN owner) | Nothing. |
| The employment model, who employs ARRS staff, the payroll, pension and employer-NIC consequences, the shared-staff VAT supply | **O21, THIS PAGE** | **Write it fully. Nobody else may.** |

**Compliance of the CURRENT page against this fence, measured.** `Carr-Hill` 0, `Global Sum` 0,
`QOF` 0, `enhanced services` 0, `dispensing` 0, `PCSE` 0, `Type 1` 0, `clinical director` 1 (a link
in the opening, which is exactly the one sentence O22 allows). **The live page is fully compliant
with the map today.** The writer's job is to keep it that way, which is harder than it sounds on a
2026/27 currency block, because the 2026/27 contract story is mostly O19's and O20's.

---

## 10. Corrections to the index, the dossier and the language spec

Six, each with what produced it. **None was acted on. Nothing outside this pack's own file was
written.**

**C1. `house_positions.md` §3.B verified the QOF point value on 2026-08-26 and three documents still
say it is UNVERIFIED.** §3.B reads "**The value of a QOF Achievement Point is £227.95**... The
previous UNVERIFIED block on the QOF point value is lifted, **and the ban in the batch-2 ownership
map row O10 can be released for this figure**". Three places still carry the old position and are now
wrong on their face:

- `BATCH3_INDEX.md` §6.1 **O10**: "the QOF point value (**UNVERIFIED**)... **No page in any wave
  states a QOF point value. Hard fail F5.**"
- `language_spec_2026-08-26.md` **F5**: "No figure may be stated for the two UNVERIFIED items: the
  GMC annual retention fee, and the Global Sum per weighted patient or QOF point value."
- The B3 writer brief this pack was given: "no QOF point value ever, hard fail".

**This does not change anything for this page and the writer states no QOF figure either way**, because
O25 assigns QOF to `/blog/qof-income-gp-practice-accounting-explained` and an ownership ban is not a
verification ban. **It does change things for the QOF page, which is inside its batch-1 read window
and whose own pack §7.4 bans the figure on verification grounds that no longer hold.** Someone should
rule on whether the QOF page may now state £227.95 tagged 2026/27, with the §3.B practical writing
rule attached (the national price is not a practice's realised rate, because of the Adjusted Practice
Disease Factor and the Contractor Population Index). **Escalated, not resolved.**

Note also that the language spec's F5 says "the **two** UNVERIFIED items" and then lists **three**
things (GMC fee, Global Sum, QOF point value). The Global Sum was verified at £130.07 the same day
and is explicitly publishable by the GMS page under O19. **F5 is stale in two directions at once and
should be re-cut to name only the GMC retention fee.**

**C2. The Postgres regex trap, and it may have silently halved other packs' counts.** Postgres ARE
uses `\y` for a word boundary; `\b` is a backspace. `ranked_keyword ~ '\marrs\b|...'` returns **3
rows**; the corrected `'\yarrs\y|...'` returns **41**. Any batch-2 or batch-3 pack whose §3 selection
regex uses `\b` against `dataforseo_competitor_data` has undercounted its keyword set, and the
undercount is silent because the query succeeds. **Worth a one-line grep across the packs
directory.** Recorded here rather than fixed, because other packs are not this task's files.

**C3. `GetPageQueryStats` needs an absolute URL for the `page` argument, and the QOF pack's
provenance line implies otherwise.** That pack records
`GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/qof-income-...)`. On this
endpoint a path-only `page` returns **0 rows** and the absolute
`https://www.medicalaccounts.co.uk/blog/<slug>` form returns the data, on both the `www` and non-`www`
`siteUrl` spellings. Either the QOF pull used the absolute form and the provenance line abbreviated
it, or a path-only call happened to work at the time. **Any future pull must use the absolute form**,
or it will read zero and conclude "no named-query data" about a page that has plenty. This is the
same class as defect D2: an endpoint quirk producing a confident wrong zero.

**C4. `BATCH3_INDEX.md` §2.5 records this page as "B 1c/11i pos 4.5, 7 named queries" and the two
figures come from different endpoints.** The 1 click and 11 impressions and 4.5 position are
`GetPageStats` page level; the 7 named queries are `GetPageQueryStats` and carry **0 clicks and 10
impressions**. The index is right on both and the row reads as though the 7 queries produced the 1
click. **They did not: no named query on this page carries a click.** Suggested re-cut of that cell:
"B page-level 1c/11i pos 4.5; 7 named queries 0c/10i". Same shape as D2, one row further down.

**C5. This page has no `title` frontmatter key and the QOF page does.** The QOF pack's byte-identity
list protects `title: "QOF Income for GP Practices: How It Is Paid, Accounted For and Taxed"`. This
file has `metaTitle` and `h1` and no `title`. **A QA agent working from the QOF pack as the format
exemplar will look for a `title` here, not find one, and may add one**, which would be a K2
violation dressed as a fix. §7.3 of this pack therefore does not list `title` and says so explicitly.
Whether the corpus should be consistent on this key is a separate question and **not this pack's to
answer**; it affects an unknown number of the 86 posts and belongs in a structural sweep, not a
content pass.

**C6. The market for this page barely exists in the harvest and `BATCH3_INDEX.md` should say so.**
The index's §5 wave-A table justifies the wave on Bing demand, which is right. It does not record
that **`additional roles reimbursement`, `primary care network`, `supply of staff`, `joint
employment`, `cost sharing group`, `clinical pharmacist`, `social prescribing`, `physiotherapist`
and `practice staff` all return ZERO rows in the whole 32,872-row harvest**. That is the same
"unpackable from the paid harvest" condition §4 records for opticians and allied health, on a page
the index nonetheless correctly schedules first. **The distinction worth adding to the index: a
cluster can be unpackable from the harvest and still be workable, when our own Bing query data
carries the demand instead.** This page is the proof, and it is a better argument for wave A than the
one the index currently makes.

---

## 11. Known limitations

1. **The stage-0 pulls named in the brief were missing and were re-created** (§0.1), for the second
   time on this batch. If the originals resurface with a different window, the grade must be
   re-derived, not reconciled. The re-created figures reproduce the brief's numbers exactly, which is
   as good a cross-check as is available.
2. **Bing `GetPageStats` is top-N.** This page appears in **3 of 13** in-window snapshots. Its
   window totals are a **floor**, not a measurement, and a later read must be run identically or the
   comparison is meaningless. This is also why the failure trigger in §8 is a position trigger and
   not a volume one.
3. **Peer-winnable is Google-derived** (DataForSEO positions are Google positions). On this topic it
   returns **5 keywords and 660 volume, three of which are the arrears homonym or a jobs board**, so
   the figure is close to useless as an ordering signal here. Per decision 21 it orders and never
   excludes, which is the only reason this page is workable at all.
4. **The corrected dossier §4 column is reliable for ordering and should not be quoted to the
   pound**, per the correction note's own warning. **No dossier §4 NO-PAGE row attaches to this
   page**, so the caveat does not bite on any figure in this pack.
5. **One competitor URL returned HTTP 404** (§4.0) and it is the one holding the best peer-winnable
   position in the selection set. It is an O20 page, so the loss falls on the PCN funding pack rather
   than this one, but it is a real gap in the teardown and is not smoothed over.
6. **No live-production check was run.** The internal-link targets were verified as **source files
   present in the repo**, not as **200s on the live site**. This pack's mandate is preparation. The
   same caveat `BATCH3_INDEX.md` §9 limitation 7 records applies here.
7. **The two Tier A answers are not yet verified at source.** Whether ARRS reimbursement extends to
   expenses paid to an employee, and whether indemnity costs for an ARRS post are reclaimable, are
   both **§7.5 verification rows and not settled facts in this pack**. If the DES specification does
   not answer them, §7.5 sets out the honest fallback. **A writer who asserts either answer without
   the fetch has fabricated it**, and it would be a fabrication at Bing position 1.0, which is the
   worst possible place for one.
8. **The 2026/27 ARRS changes rest on one peer source plus one corroboration.** The £292m
   reallocation has two independent sources (BHP and AISMA). The "experienced GPs" and "caps at full
   salaried GP rates plus on-costs" statements have **one**, and it is a regional accountancy firm's
   blog. Verify at NHS England or write the hedged version.
9. **Sentence-level band targets (C1, C3, C4) are derived from read competitor pages and estate
   convention, not from a computed distribution**, per the language spec's own Part 4 point 6. They
   are applied here to new material only, where they are cheap to hit and cost nothing if they are
   slightly wrong.
