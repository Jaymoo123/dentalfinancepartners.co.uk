# §9.5 RESEARCH PACK: /calculators/nhs-pension-annual-allowance

Built 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, ground truth `docs/medical/house_positions.md`, peer classification `docs/medical/competitor_universe_2026-08-26.md`, and the deterministic data sheet for this page. No new DataForSEO calls were made. No file under `Medical/web/` was edited.

---

## 1. Target and permission level

| Field | Value |
|---|---|
| Page URL | `/calculators/nhs-pension-annual-allowance` |
| Cluster | `nhs_pension` lane, dossier topic **pension annual allowance** |
| Grade | **REFRAME** (full rewrite permitted) |
| Source file | `Medical/web/src/lib/tools/configs/nhs-pension-calculator.ts` |
| Compute library | `Medical/web/src/lib/tools/compute/nhs-pension.ts` |
| Rendered by | `Medical/web/src/app/calculators/[slug]/page.tsx` |
| Rendering | **TS TOOL CONFIG. This is not a markdown file and it is not a blog post.** |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/lib/tools/configs/nhs-pension-calculator.ts Medical/web/src/lib/tools/compute/nhs-pension.ts` |

**How the writer must work.** The writer edits a TypeScript object literal exported as `nhsPensionTool: GenericTool`. Prose lives in typed string fields, not in a body. The editable prose surfaces are, in order of SEO weight: `metaTitle`, `metaDescription`, `name`, `oneLiner`, `intro`, each `fields[].label` and `fields[].help`, `explainer.heading`, `explainer.paragraphs[]`, each `faqs[].question` and `faqs[].answer`, and the `rows[].label` and `note` strings inside `compute()`. There is no H2 array: `explainer.heading` and each `faqs[].question` are what the renderer emits as sub-headings, so a "new H2" here means a new `explainer` paragraph group or a new FAQ entry. `slug` must not change. `kind: "generic"`, `embedHeight` and the `fields[].id` values must not change, because `compute()` and the calculator page key off them.

**What may be changed.** Every prose string listed above. The FAQ array may grow. `explainer.paragraphs` may grow. Numeric constants in `compute/nhs-pension.ts` may be re-tagged in comments but the values themselves are correct and must not be moved (see section 7).

**What may not be changed.** The slug. The URL. The field ids. The tool `kind`. The four existing FAQ questions may be reworded only if their answer still matches every Bing query in section 2. No collapse, no redirect, no merge with `/medical-guides/nhs-pension-annual-allowance` or with the frozen blog post. Rewrite in place only.

**Frozen-list position.** Batch 1 excludes the **16 pages** inside armed `monitored_pages` windows running to **2026-09-10** (dossier §6). This page is **not** on that list, so it is workable now. Three further `monitored_pages` rows for this site carry `status='flagged'` (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) and are treated as **HOLD**, not as clearance. This page is neither frozen nor flagged.

### 1.1 The intent this page is pushed towards, and the phrasings it must not take

The slug `nhs-pension-annual-allowance` exists in **three namespaces at once** (dossier §7):

| Namespace | Page | Intent it owns | Status |
|---|---|---|---|
| `/calculators/` | **this page** | **TOOL intent.** "Put my numbers in, tell me my allowance and my charge." | REFRAME, workable |
| `/medical-guides/` | `/medical-guides/nhs-pension-annual-allowance` | **EXPLANATION intent.** How the NHS scheme works and how a benefit is calculated. | REFRAME, workable, same batch |
| `/blog/` | `/blog/nhs-pension-annual-allowance-complete-guide` | **WORKED CASE intent.** The narrative example. | **FROZEN to 2026-09-10** |

Per §5 of the working agreement and dossier §7 these are **never collapsed**. They are differentiated.

**This page is being pushed to pure tool intent.** Every string it gains should be a string a person types when they want a number back, or a string that explains an input, an output, or the arithmetic between them.

**Phrasings this page must NOT take, because a sibling owns them:**

- `nhs pension calculator`, `nhs pension fund calculator`, `1995 nhs pension calculator`, `nhs pension calculator 2015`, `how to calculate nhs pension`, `final salary pension calculator nhs`, `early retirement nhs pension calculator`, `nhs pension calculator lump sum` and every other **benefit-projection** calculator phrase. These belong to `/medical-guides/nhs-pension-annual-allowance`, which is assigned the `nhs pension calculator` topic (dossier assignment table, 27,940 volume, 74 keywords).
- `nhs pension increase`, `nhs pension increases`, `nhs pension uplift`, `does nhs pension increase with inflation`, `when does nhs pension increase` and the CPI revaluation family. Assigned to the medical guide (dossier NO-PAGE row 17).
- `tapered annual allowance calculator` and `nhs pension tapered annual allowance calculator` as a **tool name**. `/blog/nhs-pension-tapered-annual-allowance-calculator` holds that topic and is **FROZEN to 2026-09-10**. This page may use `pension tapered annual allowance` and `pension annual allowance taper` as descriptive noun phrases (see the split below), but must not name itself a tapered annual allowance calculator or take that exact string in `metaTitle` or `name`.
- The **worked case narrative** ("Dr X, a consultant earning Y, faced a charge of Z"). That belongs to the frozen blog post. This page shows arithmetic from user input, not a story about a named doctor.
- `lifetime allowance`, `lta`, `lump sum allowance`, `lsa`, `lsdba`, `pension abatement`. Assigned to `/research/annual-allowance-pension-tax-index`, which is in this same batch.
- `capital gains annual allowance` (90 vol, row 33 of section 3). Off-niche. Declined with reason: it is a CGT annual exempt amount query that the regex swept in, and the domain holding it (lanop.co.uk, position 46) ranks with a CGT article. See section 4.

### 1.2 Vocabulary split across the batch, so attribution survives

Three of our pages are being changed in the same window. Bing re-crawls in days and is the 14 to 28 day read (§9.6). **One change per page per window, or attribution is lost (§9.3).** Because these three pages sit in one term family, the split below is a hard allocation, not a preference. A phrase allocated to a sibling must not appear as a heading, FAQ question, `metaTitle` or `name` on this page.

| Half of the annual-allowance vocabulary | Owner | Contents |
|---|---|---|
| **The mechanics half** | **THIS PAGE** | annual allowance, pension annual allowance, annual allowance calculation, annual allowance calculator, pension annual allowance calculator, tapered annual allowance, pension annual allowance taper, threshold income, adjusted income, pension input amount, pension input period, carry forward, MPAA, annual allowance charge, annual allowance tax charge, employer contributions, the per-year allowance history table |
| **The scale-and-history half** | `/research/annual-allowance-pension-tax-index` | lifetime allowance and LTA in the historic sense, lump sum allowance, LSA, LSDBA, lifetime allowance protection, pension abatement, plus the HMRC and NHSBSA statistical series |
| **The scheme-explanation half** | `/medical-guides/nhs-pension-annual-allowance` | nhs pension calculator family, 1995 / 2008 / 2015 section accrual and calculation, pension increase and uplift, CPI revaluation, devolved scheme calculators |

Overlap that is unavoidable and therefore explicitly allowed: the string `annual allowance` itself, and `pension input amount`, may appear on all three, but only **this page** may put either in `metaTitle`, `name` or an FAQ question.

---

## 2. Equity register (copied verbatim from the data sheet)

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/calculators/nhs-pension-annual-allowance)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **12** | impressions 13 | clicks 0.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| nhsbsa pensions annual allowance do figures in brackets mean | 2 | 0 | 9.0 |
| nhs band 8a annual allowance pension  calculator | 1 | 0 | 9.0 |
| annual allowance nhs pension tapered threshold 2025 2026 minimum tapered aa | 1 | 0 | 2.0 |
| tapered nhs pension | 1 | 0 | 8.0 |
| pension threshold 60000 nhs | 1 | 0 | 10.0 |
| nhs annual allowance calculator | 1 | 0 | 10.0 |
| how much of the annual allowance do you utilise with an nhs pension on a salary of 120000 | 1 | 0 | 9.0 |
| annual allowance calculator nhs | 1 | 0 | 10.0 |
| nhs pension scheme annual allowance calculation | 1 | 0 | 9.0 |
| what is the mhs annual allowance calculation | 1 | 0 | 6.0 |
| nhsbsa pensions annual allowancewhat do figures in brackets mean | 1 | 0 | 7.0 |
| nhs net inckme pension taper calculation | 1 | 0 | 5.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set (copied verbatim from the data sheet)

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
annual allowance|pension input (amount|period)|carry forward.*pension|pension.*carry forward|tapered annual allowance|money purchase annual allowance|\bmpaa\b
```

Keywords in topic: **52** | combined volume **13,970** | peer-winnable volume **0** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 5
| **Absent verbatim from this page: 43 of 52. Absent from the whole 105-page corpus: 36.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 3600 | 7 | bma.org.uk | no | YES | yes | pension annual allowance |
| 1300 | 15 | bma.org.uk | no | YES | yes | annual allowance |
| 590 | 9 | bma.org.uk | no | YES | yes | pension annual allowance calculator |
| 480 | 17 | bma.org.uk | no | **no** | yes | annual allowance calculation |
| 480 | 19 | bma.org.uk | no | YES | yes | annual allowance calculator |
| 390 | 59 | hawsons.co.uk | no | **no** | yes | pension annual allowance taper |
| 390 | 56 | hawsons.co.uk | no | **no** | yes | pension tapered annual allowance |
| 390 | 58 | hawsons.co.uk | no | **no** | no | pensions tapered annual allowance |
| 320 | 14 | bma.org.uk | no | **no** | no | annual allowance on pension contributions |
| 320 | 8 | bma.org.uk | no | **no** | yes | annual allowance tax charge |
| 320 | 11 | bma.org.uk | no | **no** | no | what is pension annual allowance |
| 260 | 18 | bma.org.uk | no | **no** | no | annual allowance calculator hmrc |
| 260 | 14 | bma.org.uk | no | **no** | no | annual allowance history |
| 260 | 22 | bma.org.uk | no | **no** | no | historic pension annual allowance |
| 260 | 17 | bma.org.uk | no | **no** | no | hmrc annual allowance calculator |
| 260 | 18 | bma.org.uk | no | **no** | yes | pension annual allowance 2025 26 |
| 260 | 16 | bma.org.uk | no | **no** | no | pension annual allowance history |
| 260 | 13 | bma.org.uk | no | **no** | no | uk pension annual allowance |
| 260 | 15 | bma.org.uk | no | **no** | no | uk pensions annual allowance |
| 210 | 7 | bma.org.uk | no | YES | yes | annual allowance charge |
| 170 | 15 | bma.org.uk | no | **no** | no | pension annual allowance 2024 25 |
| 170 | 17 | bma.org.uk | no | **no** | no | pension annual allowance 2024/25 |
| 170 | 9 | bma.org.uk | no | **no** | no | pension annual allowance 22 23 |
| 170 | 9 | bma.org.uk | no | **no** | no | pension annual allowance 22/23 |
| 140 | 3 | bma.org.uk | no | YES | yes | nhs pension annual allowance |
| 140 | 10 | bma.org.uk | no | **no** | no | pension annual allowance 2023 24 |
| 140 | 31 | bma.org.uk | no | **no** | no | pension annual allowance 2023/24 |
| 140 | 20 | bma.org.uk | no | **no** | no | pension annual allowance 23 24 |
| 140 | 15 | bma.org.uk | no | **no** | no | pension annual allowance 23/24 |
| 140 | 12 | bma.org.uk | no | YES | yes | pension input amount |
| 90 | 9 | bma.org.uk | no | **no** | no | annual allowance 2023 24 |
| 90 | 13 | bma.org.uk | no | **no** | no | annual allowance 2023/24 |
| 90 | 46 | lanop.co.uk | no | **no** | no | capital gains annual allowance |
| 90 | 65 | hawsons.co.uk | no | **no** | no | tapered annual allowance 2025 26 |
| 90 | 48 | bma.org.uk | no | **no** | no | tapered annual allowance 2025/26 |
| 90 | 24 | bma.org.uk | no | **no** | no | what is annual allowance |
| 70 | 17 | bma.org.uk | no | **no** | no | annual allowance 2022 23 |
| 70 | 13 | bma.org.uk | no | **no** | no | annual allowance 2022/23 |
| 70 | 25 | bma.org.uk | no | **no** | yes | annual allowance 2025/26 |
| 70 | 8 | bma.org.uk | no | **no** | no | annual allowance charge pension |
| 70 | 18 | bma.org.uk | no | **no** | no | annual allowance hmrc |
| 70 | 23 | bma.org.uk | no | **no** | no | do employer contributions count towards annual allowance |
| 70 | 4 | bma.org.uk | no | YES | yes | nhs pension annual allowance calculator |
| 70 | 13 | bma.org.uk | no | **no** | no | pension annual allowance 2022 23 |
| 70 | 13 | bma.org.uk | no | **no** | no | pension annual allowance 2022/23 |
| 70 | 9 | bma.org.uk | no | **no** | yes | pension annual allowance charge |
| 70 | 63 | hawsons.co.uk | no | **no** | no | threshold income annual allowance |
| 70 | 63 | hawsons.co.uk | no | **no** | no | threshold income for annual allowance |
| 50 | 22 | bma.org.uk | no | **no** | no | pension input amount calculation |
| 50 | 11 | bma.org.uk | no | YES | yes | pension input period |
| 50 | 10 | bma.org.uk | no | **no** | no | tapered annual allowance 2023/24 |
| 50 | 22 | bma.org.uk | no | **no** | no | tapered annual allowance 2024/25 |

---

## 4. Competitor teardown

Six competitor URLs hold this topic's keywords. All six were fetched on 2026-08-26. No cap applied (the cap of 12 was not reached). Domain classification is from `docs/medical/competitor_universe_2026-08-26.md` sections 2a and 2b.

### 4.1 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance
**23 in-topic keywords. Classification: UNWINNABLE AUTHORITY** (universe §2b: trade union / professional body, 15 top-10 slots, "cannot be outranked on brand").
- Title: NHS pension annual allowance. H1: NHS pension annual allowance. ~2,100 words.
- H2: Tapered annual allowance 2023/24 · Your annual allowance statement · What your statement includes · Ensuring your statement is right · Receiving a backdated pay award · What to do if you exceed the limit · If you are a deferred scheme member · Video guides · BMA pensions
- H3: GPs · Nations · Pension input start date · Pension input end · Annual allowance · Pension input amount · Hospital doctors 1995/2008 section accrual · GPs 1995/2008 section accrual · 2015 scheme accrual · Scheme pays
- Tables: no. Calculator: no. FAQ block: no.
- **Covers:** the statement lifecycle end to end, the pension input period boundaries, accrual mechanics split by role and section, backdated pay awards, deferred members, devolved nations.
- **Structure:** statement-first. It assumes the reader is holding a Pension Savings Statement and works outward from it.
- **Gets wrong or omits:** its lead H2 is still dated **"Tapered annual allowance 2023/24"**, three tax years stale. No worked arithmetic. No table. No calculator. No FAQ block, so no FAQ rich result. It never gives the reader a way to produce their own number.

### 4.2 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/your-annual-allowance-statement-and-exceeding-the-limit
**22 in-topic keywords. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: Your annual allowance statement and getting a tax charge. ~2,200 words.
- H2/H3 in order: What's included in your statement · Higher earners and tapered allowance · GPs · If you exceed the annual allowance limit (H3: Using previous unused allowance · Offsetting negative growth in legacy public sector schemes (1995/2008) · If you still have an excess · Paying the charge · Tax return · Deadlines and scheme pays · Interest on scheme pays) · Alternative options for pension contribution
- Tables: no. Calculator: no (links the external HMRC tool). FAQ block: no.
- **Covers:** £60,000 standard limit, the 6 April to 5 April input period, taper down to £10,000, carry-forward, **negative growth offsetting in the 1995/2008 sections**, mandatory versus voluntary Scheme Pays, the deadline, and **interest on Scheme Pays**.
- **Structure:** decision-tree prose. Best-in-class on the "I have an excess, now what" branch.
- **Gets wrong or omits:** no arithmetic the reader can vary. No per-year allowance history. No table. Refers to worked examples that live elsewhere. It links HMRC's calculator rather than being one, which is the whole opening.

### 4.3 https://www.hawsons.co.uk/tapered-annual-allowance-and-pension-contributions-for-high-earners/
**7 in-topic keywords. Classification: PEER** (universe §2a row 14: mid-tier generalist with a segmented healthcare hub).
- **FETCH FAILED: HTTP 403 Forbidden**, 2026-08-26 via WebFetch. Recorded as a **flagged gap**, not dropped.
- What the keyword data still tells us: this single URL is the only non-gov, non-BMA domain holding the taper phrase family (`pension annual allowance taper` 390, `pension tapered annual allowance` 390, `pensions tapered annual allowance` 390, `tapered annual allowance 2025 26` 90, `threshold income annual allowance` 70, `threshold income for annual allowance` 70), and it holds all of them at **positions 56 to 65**. A peer ranking in the fifties and sixties on 1,010 combined volume is the clearest winnable signal in this topic, and it is the reason the taper and threshold-income phrases are prioritised in section 7.
- Limitation stated: the heading structure of this page is unknown. Do not assert what it covers.

### 4.4 https://www.accountants4nhsdoctors.co.uk/nhs-pension-annual-allowance/
**1 in-topic keyword. Classification: PEER, and the most directly winnable domain in the universe** (§2a row 13: "Exact-match micro-brand aimed only at NHS doctors. Most directly winnable").
- Title: NHS Pension Annual Allowance | Doctor Pension Tax Help. H1: NHS Pension Annual Allowance for Doctors. ~2,800 words.
- 42 headings, service-page shaped. The substantive ones in order: Why annual allowance needs care · For NHS doctors, pension growth is not the same as pension contributions · The pension savings statement is the starting point, not the whole answer · High income can reduce the annual allowance available · The tax return must match the calculation and Scheme Pays position · The annual allowance review route · Current annual allowance figures · Key pension tax thresholds doctors should check · Common annual allowance issues · Private income and tapering · Income we check for annual allowance · Records needed · How we work · **Annual allowance FAQs** (What is the pension annual allowance? · Does a pension savings statement mean I owe tax? · Can private practice income affect annual allowance? · Can carry-forward reduce the charge? · Can Scheme Pays be used for annual allowance charges?)
- Tables: no. Calculator: no. **FAQ block: yes.**
- **Covers:** the same £60,000 / £200,000 / £260,000 / £10,000 set we hold, plus private-income tapering and a records checklist.
- **Structure:** a service page wearing a guide's headings. Heavy on "we check", light on the reader doing anything.
- **Gets wrong or omits:** it quotes every figure with **no tax year attached at all**, which is the single most exploitable weakness on this SERP. No calculator, no table, no history, no worked arithmetic.

### 4.5 https://johnstoncarmichael.com/our-services/private-client-tax/your-tax-planning-guide/tax-planning-pension-planning
**1 in-topic keyword. Classification: UNWINNABLE AUTHORITY** (§2b: large Scottish national firm).
- Title and H1: Tax planning - pension planning. ~850 words.
- Headings: Lifetime Allowance · Top tip: reinstating lost personal allowance · View our other services · Arrange an initial conversation with our team · Insight you can count on
- Tables: no. Calculator: no. FAQ: no.
- **Covers:** the £60,000 uplift, carry-forward from 2019/20 to 2021/22, MPAA £10,000, taper threshold £260,000.
- **Gets wrong or omits:** it is written **frozen at 6 April 2023**. It says the annual allowance "is being increased to £60,000" in the future tense, offers carry-forward "brought forward to 2022/23", and still leads with an H2 titled "Lifetime Allowance". Three tax years stale and structurally mis-headed. Not NHS-specific at all.

### 4.6 https://lanop.co.uk/capital-gains-tax-allowance-legal-ways-reduce-cgt/
**1 in-topic keyword (`capital gains annual allowance`, 90 vol, position 46). Classification: PEER** (§2a row 12: generalist London firm with a doctors service page).
- Title: Capital Gains Tax Allowance | Reduce Your CGT Legally in UK. H1: Capital Gains Tax Allowance 2025: How to Legally Reduce or Defer Your Tax Bill. ~3,500 to 4,000 words. Tables: yes (2). Calculator: no. FAQ: no.
- **Judgement: off-topic false positive.** This is a CGT annual-exempt-amount article that the regex `annual allowance` swept in. It carries no pension annual allowance content. **Declined with reason.** No heading from this page enters the coverage checklist.

### 4.7 Coverage checklist: the union of their heading themes minus ours

Present on at least one competitor, absent from our page today:

1. What the Pension Savings Statement contains, field by field, and **what the figures in brackets mean** (this is a live Bing query on our own URL, twice, see section 2)
2. Pension input period start and end dates (6 April to 5 April) named as such
3. Accrual mechanics split by role: hospital doctor 1995/2008, GP 1995/2008, 2015 scheme
4. Checking the statement is right, and what to do when it is not
5. Backdated pay awards and their effect on the input amount
6. Deferred scheme members
7. **Negative growth offsetting in the legacy 1995/2008 sections** (BMA only, and the strongest single omission on our page)
8. Carry-forward using unused allowance from the three prior years, stated as a mechanic
9. Paying the charge: self assessment tax return versus Scheme Pays
10. Scheme Pays deadlines, and **interest charged on Scheme Pays**
11. Mandatory versus voluntary Scheme Pays, distinguished
12. Alternative options: opting out, cash in lieu, and what that costs
13. Devolved nations: England and Wales, Scotland, Northern Ireland administrators
14. GP-specific input amount treatment (certified profit basis, arrears)
15. Private and non-NHS income pushing threshold and adjusted income
16. A records checklist for a review
17. **A per-year history of the standard allowance and the minimum tapered allowance** (no competitor does this well, see section 5)
18. An FAQ block (only accountants4nhsdoctors has one)

Themes 1 to 16 are covered, declined or reassigned in section 7. Count of undecided themes at the end of section 7 must be **zero** (§9.9 floor 8).

---

## 5. Whitespace

Specific and quotable, not "we go deeper".

1. **Nobody on this SERP lets the reader change a number.** Six competitor URLs, zero working calculators. BMA links HMRC's. Our page already has a live form. That is the page-shape lever from `REWRITE_PROGRAM.md` §9.12, marked **Live lever**, and it is the only structural advantage available here. **KEEP the working form. It is the asset.**
2. **Nobody publishes the allowance history as a table.** `annual allowance history` (260), `historic pension annual allowance` (260), `pension annual allowance history` (260) and eleven year-tagged rows (`pension annual allowance 22/23` through `annual allowance 2025/26`) total **2,110 volume** with no competitor page organised around them. BMA scatters years across prose. Johnston Carmichael is frozen in 2023. **This is the single largest uncontested block in the topic.**
3. **Nobody tags a tax year to their figures.** accountants4nhsdoctors quotes £60,000 / £200,000 / £260,000 / £10,000 with no year at all. BMA's lead H2 says 2023/24. Johnston Carmichael says "is being increased". A page that says "2026/27, unchanged from 2025/26" and dates every figure wins on freshness signal without any new fact.
4. **Nobody explains the brackets on an NHSBSA statement.** Two separate Bing impressions on our URL are literally `nhsbsa pensions annual allowance do figures in brackets mean`. Negative pension growth shown in brackets is what those queries are asking about, and it is the same mechanic as BMA's "offsetting negative growth" section. No competitor answers the question in the querier's words.
5. **Nobody separates threshold income from adjusted income with the doctor-specific reason.** The reason NHS doctors get tapered is that the **deemed employer contribution** inflates adjusted income. Hawsons is the only peer holding those phrases and it does so at positions 56 to 65.

**KEEP, marked explicitly:**
- **KEEP** the working `compute()` and its three fields. Do not turn this page into prose.
- **KEEP** the two-branch `note` string, which correctly states that tapering needs **both** tests to be met. That distinction is the most commonly botched point in the topic and we already have it right.
- **KEEP** the four existing FAQ answers' substance: where to find the pension growth figure, threshold versus adjusted income, Scheme Pays, carry-forward. All four map to live Bing queries.
- **KEEP** the `effectiveCost` output row. No competitor expresses the charge as a percentage of pension growth, and it is the number that actually decides Scheme Pays versus cash.

---

## 6. Our current page, read honestly

Read from `Medical/web/src/lib/tools/configs/nhs-pension-calculator.ts` and `Medical/web/src/lib/tools/compute/nhs-pension.ts` at sha `b3d78c97e768645cca480dd350281ffa68c1faf9`.

- Approximate word count of all prose strings: **864** (`node`, whitespace split of the config file). That is thin against a 2,100 to 2,800 word competitor set, but word count is **Not a lever** (§9.12), so the problem is not length, it is vocabulary and staleness.
- `metaTitle`: `NHS Pension Annual Allowance Calculator 2025/26 | Tapered Allowance`
- `name` (rendered as the page H1): `NHS Pension Annual Allowance Calculator`
- Sub-headings the renderer emits: `How the tapered annual allowance works` (explainer) plus four FAQ questions.
- Structure: oneLiner, intro, 3 fields, compute output, explainer with 3 paragraphs, 4 FAQs.

**Stale, and it is the most visible problem.** The string `2025/26` appears in the `metaTitle`, the `oneLiner`, `explainer.paragraphs[0]` and the compute library's file comment. The live tax year is **2026/27**. House positions §2.B is unambiguous: every figure on this page carries into 2026/27 **unchanged**, verified 2026-08-26 at the gov.uk pension schemes rates page. So the numbers are right and the year tag is wrong. That is the cheapest correction in the pack and it fixes a title-tag freshness signal.

**Factually wrong against `house_positions.md`:**

1. **`faqs[1].answer` states that NHS employer contributions are "20.68% or more of salary".** House positions §2.C: the employer contribution rate is **23.7% of pensionable pay**, applicable from 1 April 2024 and still current for 2026/27, verified 2026-08-26 at nhsemployers.org. 20.68% is the pre-April-2024 rate. **This is a wrong figure on a live page and must be corrected.** House positions also flags that the 2024 valuation re-sets this rate for four years from 1 April 2027, so the page must date-tag it.
2. **`faqs[2].answer` says Scheme Pays is available "if the charge exceeds £2,000 and your pension input in that scheme exceeded the annual allowance".** House positions §2.D is more precise and the imprecision matters: mandatory Scheme Pays needs the input to exceed the **standard £60,000** allowance. A charge driven only by the taper below £60,000 is **voluntary** Scheme Pays. As written, the page implies a tapered doctor with a £25,000 allowance and £30,000 growth has a right to Scheme Pays. They do not.
3. **The Scheme Pays deadline is absent entirely.** House positions §2.D: **31 July** in the year following the year the charge crystallised, so a **2026/27 charge must be elected by 31 July 2028**. And the limb NHS members actually need: where a **revised** pension savings statement is issued **on or after 2 May**, the deadline extends to the earlier of **3 months from that statement** or **6 years from the end of the tax year**. House positions says late NHSBSA statements are "the normal case, not the exception". A calculator that produces a charge figure and does not say when the election is due is incomplete.
4. **`faqs[1].answer` defines adjusted income as "threshold income adds back the employer pension contributions".** House positions §2.B: adjusted income is threshold income plus the value of **all employer pension contributions and pension input amounts**. For a DB member the add-back is the pension input amount. The compute library does this correctly (`adjustedIncome = thresholdIncome + pensionGrowth`); the FAQ prose describes it loosely.

**Arithmetic, checked line by line.** `compute/nhs-pension.ts` constants are **correct for 2026/27**: `STANDARD_ALLOWANCE = 60000`, `MIN_ALLOWANCE = 10000`, `THRESHOLD_LIMIT = 200000`, `ADJUSTED_LIMIT = 260000`, all verified against house positions §2.B and the gov.uk pension schemes rates page. The taper is `£1 for every £2` implemented as `reduction = (adjustedIncome - 260000) / 2` with a `Math.max` floor at £10,000. Correct. Two known simplifications the writer must not accidentally overstate:
- `adjustedIncome = thresholdIncome + pensionGrowth`. Defensible for a DB-only member because the pension input amount is the add-back, but it is not a general adjusted-income calculation. The `help` text on the field should say so.
- `taxCharge = excess * TAX_RATES[band]`. A single marginal rate. A real excess can straddle the higher and additional bands. The page must say the output is an estimate at the selected marginal rate, not a straddled calculation.

**Missing vocabulary, quantified:** 43 of 52 topic keywords absent verbatim, on a page whose whole job is this topic. Present are only the 9 shortest head phrases. Every year-tagged row, every history row, the entire threshold-income family and the whole taper-noun family are absent.

**Worth keeping:** see the KEEP list in section 5. The page is not bad. It is stale, it is missing one wrong percentage, and it says almost none of the words the market types.

---

## 7. Deterministic acceptance criteria

All countable at QA. A failure on any numbered item is a BLOCK.

### 7.1 Phrases that must appear verbatim (case and punctuation normalised): **20**

Drawn from the `On page = no` rows of section 3, ordered peer-winnable first (the six Hawsons-held rows), then by volume.

Peer-winnable first (Hawsons, positions 56 to 65, 1,010 combined volume):
1. `pension annual allowance taper`
2. `pension tapered annual allowance`
3. `pensions tapered annual allowance`
4. `tapered annual allowance 2025 26`
5. `threshold income annual allowance`
6. `threshold income for annual allowance`

Then by volume:
7. `annual allowance calculation`
8. `annual allowance on pension contributions`
9. `annual allowance tax charge`
10. `what is pension annual allowance`
11. `annual allowance calculator hmrc`
12. `annual allowance history`
13. `historic pension annual allowance`
14. `hmrc annual allowance calculator`
15. `pension annual allowance history`
16. `uk pension annual allowance`
17. `uk pensions annual allowance`
18. `what is annual allowance`
19. `do employer contributions count towards annual allowance`
20. `pension input amount calculation`

### 7.2 The year-row block: **13 further phrases, all in one table**

These are the history block from section 5 whitespace item 2. They must appear as row labels or cell text in a single "annual allowance history" table, not scattered in prose:

`pension annual allowance 2025 26` · `pension annual allowance 2024 25` · `pension annual allowance 2024/25` · `pension annual allowance 2023 24` · `pension annual allowance 2023/24` · `pension annual allowance 23 24` · `pension annual allowance 23/24` · `pension annual allowance 22 23` · `pension annual allowance 22/23` · `pension annual allowance 2022 23` · `pension annual allowance 2022/23` · `annual allowance 2023 24` · `annual allowance 2023/24`

Plus, in the same table: `annual allowance 2022 23` · `annual allowance 2022/23` · `annual allowance 2025/26` · `tapered annual allowance 2025/26` · `tapered annual allowance 2024/25` · `tapered annual allowance 2023/24` · `annual allowance charge pension` · `annual allowance hmrc`.

**Total phrase count to place: 20 + 13 + 8 = 41 of the 43 absent rows.**

**Declined, with reason: 2 of 43.**
- `capital gains annual allowance` (90): off-niche CGT query, see section 4.6.
- `pension annual allowance 2022/23` duplicate forms are counted once where the normaliser collapses them; if the QA normaliser treats `22/23` and `2022/23` as distinct, both are in the list above and neither is declined.

**Reassigned to a sibling, not declined: 0 rows from this topic.** The tool-name string `nhs pension tapered annual allowance calculator` is not in this topic's keyword set and is handled by the section 1.1 prohibition.

### 7.3 Equity preservation: **12 queries must still match** (§9.9 floor 5)

Every one of the 12 Bing queries in section 2 must be matchable in `metaTitle`, `name`, `explainer.heading`, an FAQ question, or body prose after the rewrite. Named individually because any one that stops matching is a BLOCK with its diff line:

1. `nhsbsa pensions annual allowance do figures in brackets mean`, needs an explicit passage on **NHSBSA statement figures shown in brackets** meaning negative pension growth. Not currently present. This query is at 9.0 with 2 impressions and is the highest-volume single query on the URL.
2. `nhsbsa pensions annual allowancewhat do figures in brackets mean`, same passage covers it.
3. `nhs band 8a annual allowance pension  calculator`, needs `band` and `calculator` to co-occur; an Agenda for Change band worked reference in the field help text carries it.
4. `annual allowance nhs pension tapered threshold 2025 2026 minimum tapered aa`, needs `minimum tapered` and a 2025/26-to-2026/27 year pair present. The history table carries it.
5. `tapered nhs pension`
6. `pension threshold 60000 nhs`, needs `£60,000` and `threshold` in the same passage.
7. `nhs annual allowance calculator`
8. `how much of the annual allowance do you utilise with an nhs pension on a salary of 120000`, needs a salary-level worked illustration. Note the default `thresholdIncome` is 150000; a 120,000 reference in the explainer preserves this.
9. `annual allowance calculator nhs`
10. `nhs pension scheme annual allowance calculation`
11. `what is the mhs annual allowance calculation` (typo for NHS), covered by 10.
12. `nhs net inckme pension taper calculation` (typos), covered by the taper passage.

**Google: 0 query-level rows.** Before the writer starts, the QA must read the **page-level** figure for this URL from `gsc_page_rows.json`. GSC anonymises low-volume queries, so a zero query breakdown is not evidence of zero Google demand. If the page-level row shows impressions, they are protected equity and the metaTitle must not lose the strings `NHS Pension Annual Allowance Calculator`.

### 7.4 EXTEND-only protections

**Not applicable. This page is REFRAME.** metaTitle, name and heading order may change. The equity register in 7.3 still binds absolutely.

### 7.5 Arithmetic that must recompute

Every one of these must be recomputed by the QA agent from the stated inputs and must match what the page renders.

| # | Input | Expected output | Source of the rule |
|---|---|---|---|
| A1 | thresholdIncome 150,000, pensionGrowth 40,000, band higher | adjusted income 190,000; **not tapered** (threshold 150,000 is not > 200,000); allowance £60,000; excess £0; charge £0 | house_positions §2.B, both tests required |
| A2 | thresholdIncome 210,000, pensionGrowth 60,000, band additional | adjusted income 270,000; tapered; reduction (270,000 - 260,000)/2 = 5,000; allowance £55,000; excess £5,000; charge £2,250; effective cost 3.75% | §2.B taper, £1 for every £2 |
| A3 | thresholdIncome 300,000, pensionGrowth 60,000, band additional | adjusted income 360,000; reduction 50,000; allowance £10,000 (floor binds, not £10,000 by subtraction: 60,000 - 50,000 = 10,000, so floor and subtraction coincide); excess £50,000; charge £22,500 | §2.B minimum £10,000 |
| A4 | thresholdIncome 400,000, pensionGrowth 60,000, band additional | adjusted income 460,000; reduction 100,000; subtraction gives -40,000, **floor binds at £10,000**; excess £50,000; charge £22,500 | §2.B floor |
| A5 | thresholdIncome 205,000, pensionGrowth 50,000, band higher | adjusted income 255,000; **not tapered** (threshold > 200,000 but adjusted 255,000 is not > 260,000); allowance £60,000; excess £0 | §2.B both tests |
| A6 | Any worked example naming a Scheme Pays deadline for a 2026/27 charge | **31 July 2028** | §2.D, FA 2004 s.237BA |
| A7 | Any statement of the employer contribution rate | **23.7% of pensionable pay**, tagged "from 1 April 2024, current for 2026/27" | §2.C |
| A8 | The allowance history table | 2022/23 £40,000 · 2023/24 £60,000 · 2024/25 £60,000 · 2025/26 £60,000 · 2026/27 £60,000; minimum tapered allowance £4,000 to 2022/23 then £10,000 from 2023/24 | §2.B plus the §2.B verification note that every figure carries into 2026/27 unchanged |

A3 and A4 exist specifically to catch a floor-versus-subtraction bug. They must both be run.

### 7.6 Statute and regulation to be re-verified at source

Each URL is fetched at QA time. A fetch failure is recorded with its status code, not ignored.

| What | URL |
|---|---|
| Annual allowance, MPAA, minimum tapered AA, threshold and adjusted income limits, LSA, LSDBA, all for 2026/27 | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates |
| Taper trigger conditions and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Scheme Pays liability, the £2,000 test and the s.228(1) input test | https://www.legislation.gov.uk/ukpga/2004/12/section/237B |
| Scheme Pays election deadline, 31 July, and the revised-statement extension | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA |
| Scheme Pays deadline in HMRC's own words, including the 2 May limb | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 |
| NHS employer contribution rate 23.7% | https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions |
| Income tax bands used by the tax-band selector (20/40/45) for 2026/27 | https://www.gov.uk/income-tax-rates |

Note: NHSBSA's own member-hub pages return **HTTP 403** to automated fetches (house_positions verification log). NHS Employers is the fetchable authority. Do not record the 403 as a missing fact.

### 7.7 UNVERIFIED figures that must not be stated

`house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **No figure for any of them may appear on this page.** This topic does not need any of the three. If the writer reaches for a GMC fee while writing about threshold income deductions, the page must instead say the fee is deductible and frame the amount as "confirm the current figure at source", naming the block. The named block if it arises: `faqs` entry on threshold income.

### 7.8 The floors

**The four existing floors (§4):**
1. **Arithmetic**, every calculation in 7.5 recomputes.
2. **Statute**, every URL in 7.6 fetched and the figure confirmed, or the fetch status recorded.
3. **Links**, every internal link resolves to a live route. The page must link to `/medical-guides/nhs-pension-annual-allowance` (explanation) and to `/calculators/nhs-pension-scheme-pays`. It must **not** add a new link to `/blog/nhs-pension-annual-allowance-complete-guide` or `/blog/nhs-pension-tapered-annual-allowance-calculator` while those are frozen to 2026-09-10, because a new inbound link is a change inside their measurement window.
4. **Coverage**, the 41 phrases of 7.1 and 7.2 all placed, each unplaced one named.

**§9.9 floors 5 to 8:**
5. **Equity preservation**, all 12 Bing queries in 7.3 still matchable. Any that is not is a named BLOCK with the diff line that removed it.
6. **Cluster coverage**, every keyword the dossier assigned to this page is placed; the checker names each one that is not.
7. **Reconciliation balance**, this page's 52 keywords balance: 41 assigned, 9 already-covered (the `On page = YES` rows), 2 excluded (7.2 decline list), 0 deferred. **41 + 9 + 2 + 0 = 52.**
8. **Competitor re-read**, all 18 coverage-checklist themes in 4.7 marked covered, declined-with-reason, or belongs-to-another-page. Decisions, so the undecided count is zero:
   - **Covered here:** 1, 2, 7, 8, 9, 10, 11, 15, 16, 17, 18
   - **Covered here in brief with a link out:** 4, 5, 12
   - **Belongs to `/medical-guides/nhs-pension-annual-allowance`:** 3 (accrual mechanics by section and role), 13 (devolved nations and their calculators)
   - **Belongs to `/blog/gp-practice-income-pcse-statement-reconciliation` and the GP pension pages:** 14 (GP certified-profit input treatment). Declined here because the guide and the PCSE page own the certification machinery.
   - Undecided: **0**

Plus the two human passes: adversarial factual QA against `house_positions.md` §2.B, §2.C and §2.D, and the editorial pass against the cluster answer-pattern spec (§9.11).

---

## 8. Stated expectation

Written before the work, as numbers a later read can fail (§9.6).

**Engine and window.** Bing is the **14 to 28 day** read, Google the **28 to 90 day** read. Baseline is the 90-day pull to 2026-08-26 in section 2: Bing 13 impressions, 0 clicks, 12 named queries; Google 0 query-level rows.

**What we expect:**

| Read | Window | Expectation |
|---|---|---|
| Bing, 14 day | to 2026-09-09 | The 12 baseline queries still returning impressions. Impressions at or above **13**. |
| Bing, 28 day | to 2026-09-23 | Bing impressions on this URL at or above **26** (double the baseline), driven by the taper and threshold-income phrases and the history table. At least **3** of the 41 named phrases from 7.1 and 7.2 appearing as new named Bing queries on this URL. At least **1** Bing click, against a baseline of 0. |
| Google, 28 day | to 2026-09-23 | No expectation. Too early. Record the page-level impression figure only. |
| Google, 90 day | to 2026-11-24 | Page-level impressions on this URL above **0**, and at least one query-level row appearing where there are currently none. |

**The verdict is read against phrase coverage, not total traffic** (§9.6 rule 2). Total impressions rising while the 41 named phrases stay missing is **drift and must be recorded as a fail.**

**Failure trigger, written as a number.** If, in the 28-day window to **2026-09-23**, Bing impressions on `/calculators/nhs-pension-annual-allowance` fall below **13** (the baseline), **or** fewer than **9** of the 12 baseline queries in section 2 still return an impression, **revert** with `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/lib/tools/configs/nhs-pension-calculator.ts Medical/web/src/lib/tools/compute/nhs-pension.ts` and record the reason in `blog_optimizations.rollback_reason`.

**Tracker discipline.** `blog_optimizations.target_keywords` for this page must be populated with the **41 missing phrases** from 7.1 and 7.2, not with the 9 phrases the page already carries. Populating it with what the page already ranked for re-measures the past.

**One change per page per window.** This page, the medical guide and the research index are all changing in the same batch. The section 1.2 vocabulary split is what makes their Bing readings separable. If the writer breaches the split, the 28-day read on all three is uninterpretable and the correct response is to revert all three, not to guess.

---

## Corrections to the dossier

1. **`/calculators/nhs-pension-annual-allowance` carries a wrong figure that the dossier does not flag.** `faqs[1].answer` states the NHS employer pension contribution is "20.68% or more of salary". `house_positions.md` §2.C gives **23.7% of pensionable pay** from 1 April 2024, current for 2026/27, verified at primary source 2026-08-26. The dossier's assignment table records this page only as REFRAME with a coverage gap of 16 of 24; it does not record a factual error. It should. This is a live wrong number on a live page, and it is the kind of error that re-seeds if the phrase is copied to the guide in the same batch.

2. **Dossier §7 lists `nhs pension increase` as a tie between `/medical-guides/nhs-pension-annual-allowance` (51.1) and `/calculators/nhs-pension-annual-allowance` (51.1), noted "tie, same slug two namespaces".** The tie is resolved in this pack by allocation, not by score: the increase and uplift family goes to the medical guide, per dossier NO-PAGE row 17 which already prescribes "Section on /medical-guides/nhs-pension-annual-allowance". The two dossier statements are consistent, but §7 reads as an open tie while §4 row 17 has already decided it. Recording the resolution here so a later reader does not reopen it.

3. **The dossier's `pension annual allowance` topic row for this page states coverage "16 of 24".** The data sheet for the same page states "Absent verbatim from this page: 43 of 52", i.e. 9 of 52 present. These are different denominators (dossier topic keyword count 24 against the data sheet's regex-selected 52) and are not in conflict, but the two numbers will look contradictory to a QA reader. The data sheet's 52 is the binding set for this pack, because the acceptance criteria in section 7 are built from it.
