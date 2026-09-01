# §9.5 RESEARCH PACK: /blog/consultant-directors-loan-account-s455-medical-company

**Batch 3, wave C (incorporation and company structures), COMPANY-STRUCTURES SET. GRADE = REFRAME.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md`. Ground truth `docs/medical/house_positions.md`. Batch index
`docs/medical/packs/BATCH3_INDEX.md` (wave C, D3 RULED 2026-09-01, ownership map O1 to O36). Peer set
`docs/medical/competitor_universe_2026-08-26.md` §2a plus the 17 domains reclassified in BATCH3_INDEX D13.
Format exemplar `PACK_B3_blog__how-gms-funding-works-global-sum-carr-hill-explained.md`.

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. No git
command other than read-only `rev-parse`, `log`, `diff --stat` and `merge-base`. **No paid API call: $0.00.**
DataForSEO was read from the persisted harvest only. Five competitor URLs were fetched live; every one is
accounted for with its status code.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/consultant-directors-loan-account-s455-medical-company` |
| Cluster | Wave C, incorporation and company structures. Nearest siblings: `salary-vs-dividend-medical-limited-company-2026` (**O34 owner**), `surplus-cash-medical-limited-company-options`, `gp-corporation-tax`, `incorporation-relief-private-medical-practice-s162`, `medical-practice-incorporation-step-by-step` (**O33 owner**), `family-investment-company-doctors-consultants`. |
| Source file | `Medical/web/content/blog/consultant-directors-loan-account-s455-medical-company.md` |
| Rendering | **Markdown post whose body is raw HTML.** New blocks are written as raw HTML to match. |
| Grade | **REFRAME.** Google 13 impressions, 0 clicks; Bing 0 clicks, 0 impressions. Both branches of §9.2 satisfied with no reliance on the §2.4 ruling. |
| Repo HEAD at write time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, 2026-09-01) |
| **Revert anchor (preferred)** | `7e596f02a5339982597949c5b7db9f41af3df4ea` (`git log -1 --format=%H -- <the file>`, "fix(medical): correct the false company-contract claim estate-wide", 2026-08-26). Verified an ancestor of HEAD; `git diff --stat 7e596f02 -- <file>` is empty, so this sha's copy is **byte-identical to the working tree**. It post-dates the hero-image backfill, so a revert to it cannot strip `image` or `imageCredit`. |
| **Revert path** | `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/consultant-directors-loan-account-s455-medical-company.md` |

### 1.1 Armed-window check, run live, no status predicate

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- run 2026-09-01 via scripts/_q.py (Supabase Management API, project dhlxwmvmkrfnmcgjbntk)
-- 19 rows
```

The 19 rows are exactly the set at BATCH3_INDEX §1: `__home` (**flagged**, to 2026-10-06) and eighteen rows to
2026-09-10, of which `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines` are also **flagged**.
**`consultant-directors-loan-account-s455-medical-company` is NOT among them, and neither is any other wave-C
surface. This page is in no armed monitored window and is workable now.** A `status='active'` filter would
silently excuse three rows and must not be used.

**Frozen pages this page already links to.** `/blog/gp-limited-company-tax-benefits-drawbacks` (frozen to
2026-09-10) and `/blog/gp-pension-contributions-tax-relief` (frozen to 2026-09-10). Per batch-1 coordinator
ruling 5, contextual links to a frozen page's live URL are fine; editing the frozen file is not. Both links are
kept and neither frozen file is touched.

### 1.2 The permission call

**REFRAME permits a full overhaul, and here the pack advises taking most of it. But not the title.**

The fresh pull (§2.1) puts this URL at **Google average position 9.69 on 13 impressions**. That is a live page-1
Google position on a domain where 18 of 139 URLs are indexed at all (STATE, Stage 0 diagnosis 2026-09-01). It is
weaker than the sibling FIC page's 4.78 but it is real and it is not replaceable.

**Ruling for this pack:**

1. **`metaTitle`, `h1`, `title`, `slug`, `canonical`, `category` and `date` are retained unchanged**, by choice
   rather than by rule, because the page holds a page-1 Google position and the title is the only thing an engine
   has been shown. A conductor may overrule this; a writer may not.
2. **`metaDescription` is retained.** 155 characters, inside band, and it already carries the two rates and the
   three mechanisms. **One caveat: it reads "the s.455 charge (33.75% then 35.75%)", which is a correct date-band
   statement today and will be a stale-looking one in a year. Leave it and note it (§10.4).**
3. **Body copy, H2/H3 structure, FAQ set and `keyTakeaways` are fully open**, which is where the work is (§6).
4. **The two-rate date band and the deferred-relief cash gap are KEEP.** They are what every competitor gets
   wrong (§5.1).

**Never propose a collapse, a redirect or a URL change** (K4). **No em-dashes** (I1): the live file contains
**zero** and must still contain zero.

---

## 2. Equity register (dual-engine, endpoint named per D2)

Every figure below was pulled fresh by this task on 2026-09-01. Nothing is quoted from a stored Supabase
snapshot and `gsc_query_data` was not read or summed.

### 2.1 Google, GSC API

```
optimisation_engine.clients.gsc_query_client.GSCQueryFetcher("medical").gsc_client.service
  property  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"],         startDate=2026-06-03, endDate=2026-09-01, rowLimit=1000)
  searchanalytics().query(dimensions=["page","query"], startDate=2026-06-03, endDate=2026-09-01, rowLimit=5000)
run 2026-09-01
```

**Page dimension, this URL, exact API response:**

| Metric | Value |
|---|---|
| clicks | **0** |
| impressions | **13** |
| ctr | 0.0 |
| position | **9.692307692307692** |

**Page plus query dimension, this URL: ZERO rows.** All 13 impressions are anonymised. Per BATCH3_INDEX D5 that
is a fact about GSC's disclosure threshold, not about demand, and **no conclusion about Google intent may be
drawn from the absence.**

**A correction to the task brief.** The brief describes this page at "11 impressions". The fresh pull returns
**13 impressions at position 9.69** over 2026-06-03 to 2026-09-01. The rank order within wave C reproduces (this
page is second behind FIC); the level differs by two because the windows differ. **The number the brief did not
carry is position 9.69**, and it is the one that constrains the work (§1.2, §8.4).

### 2.2 Bing, `GetPageStats` (page level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
  filtered to Query == "https://www.medicalaccounts.co.uk/blog/consultant-directors-loan-account-s455-medical-company"
run 2026-09-01  ->  0 snapshots
```

**Zero.** `GetPageStats` is a **top-N** endpoint (BATCH3_INDEX §9 limitation 2), so this is "absent from the top
N", **not** "proven zero Bing impressions". Recorded as a question, not a finding (D5).

### 2.3 Bing, `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/consultant-directors-loan-account-s455-medical-company")
run 2026-09-01  ->  0 rows
```

**Zero named Bing queries.** The call used the **full `https://www.` URL**, not a path, so this is a true empty
result and not the silent-failure false negative BATCH3_INDEX §0.2 warns about. The control: the same client and
argument shape returned 10 rows for `gp-bookkeeping-guide-uk` in this same session.

### 2.4 What the register says

**The do-not-lose set is empty at query level on both engines and consists of one thing at page level: Google
average position 9.69 on 13 impressions.** §7.2 therefore cannot be a query-coverage gate and is written as a
position gate.

**And the shape says something the FIC page's does not.** Thirteen impressions at position 9.7 on a topic whose
harvest family carries **19,450 volume** (§3) means the page is ranking page-1 for something almost nobody
searches, and is invisible on everything the market actually types. That is not an answer-shape problem and it is
not a quality problem. **It is a matching problem**, and §7.1 is built to it: the market's words for this topic
(`s455`, `s455 tax`, `directors loan`, `overdrawn directors loan account`) are largely absent from a page that
explains all of them correctly.

---

## 3. The market's keyword set

### 3.1 The selection, printed so the counts are re-derivable

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`. **No new DataForSEO call
was made; $0.00 spent.** Live corpus count, run 2026-09-01 via `python scripts/_q.py`:
**39,296 rows / 31,539 keywords / 44 domains**, confirming BATCH3_INDEX D12 against the live table.
Peer-winnable uses the **39-domain peer set** (§2a's 22 plus D13's 17). **Per D9 the regex uses `\y`, never
`\b`.**

```sql
ranked_keyword ~* 'director.?s loan|\ydla\y|section 455|s455|\ys\.455\y|participator|beneficial loan|overdrawn'
```

**Counts. Keywords returned: 78. Combined deduplicated volume: 19,450. Peer-winnable (a peer at position <= 20):
8,390. Contributing domains: 7** (bhp 31, sandisoneasson 23, pricebailey 9, lanop 5, johnstoncarmichael 5,
taxqube 4, forvismazars 1).

**This is the largest keyword family in the company-structures set by a wide margin: 19,450 volume against the
FIC page's 3,640.**

### 3.2 The head of the set, 30 of 78 rows

`On page` = phrase appears verbatim in the live source file, case and punctuation normalised.

| Vol | Best pos | Peer best | Holder | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|---|
| 2,900 | 26 | 26 | sandisoneasson.co.uk | no | **no** | `directors loan` |
| 1,900 | 19 | 19 | taxqube.co.uk | **yes** | **no** | `s455 tax` |
| 1,900 | 62 | 62 | taxqube.co.uk | no | **no** | `section 455 tax` |
| 1,000 | 18 | 18 | sandisoneasson.co.uk | **yes** | **no** | `directors loan account` |
| 1,000 | 24 | 24 | taxqube.co.uk | no | **no** | `s455` |
| 720 | 37 | 37 | bhp.co.uk | no | **no** | `what is a director's loan` |
| 480 | 9 | 9 | sandisoneasson.co.uk | **yes** | **no** | `directors loan interest rate` |
| 480 | 31 | 31 | sandisoneasson.co.uk | no | **no** | `what is a directors loan account` |
| 480 | 28 | 28 | sandisoneasson.co.uk | no | **no** | `what is directors loan account` |
| 390 | 16 | 16 | bhp.co.uk | **yes** | **yes** | `director's loan account` |
| 390 | 27 | 27 | sandisoneasson.co.uk | no | **no** | `overdrawn directors loan account` |
| 260 | 13 | 13 | pricebailey.co.uk | **yes** | **no** | `director's loan tax` |
| 260 | 28 | 28 | sandisoneasson.co.uk | no | **no** | `directors loan tax` |
| 260 | 14 | 14 | bhp.co.uk | **yes** | **no** | `tax on directors loans` |
| 260 | 29 | 29 | bhp.co.uk | no | **no** | `ltd company directors loan` |
| 260 | 9 | 9 | lanop.co.uk | **yes** | **no** | `dla payments over christmas` **FALSE POSITIVE, see 3.3** |
| 210 | 17 | 17 | sandisoneasson.co.uk | **yes** | **no** | `directors loan interest` |
| 210 | 14 | 14 | bhp.co.uk | **yes** | **no** | `interest on directors loan` |
| 210 | 13 | 13 | pricebailey.co.uk | **yes** | **no** | `s455 charge` |
| 210 | 24 | 24 | pricebailey.co.uk | no | **no** | `section 455 charge` |
| 210 | 6 | 6 | lanop.co.uk | **yes** | **no** | `dla christmas payments 2025` **FALSE POSITIVE** |
| 170 | 8 | 8 | bhp.co.uk | **yes** | **no** | `directors loan rules` |
| 170 | 13 | 13 | bhp.co.uk | **yes** | **no** | `directors loan account example` |
| 170 | 17 | 17 | pricebailey.co.uk | **yes** | **no** | `section 455 tax charge` |
| 170 | 25 | 25 | bhp.co.uk | no | **no** | `how does directors loan work` |
| 170 | 40 | 40 | bhp.co.uk | no | **no** | `how does a director's loan work` |
| 140 | 10 | 10 | sandisoneasson.co.uk | **yes** | **no** | `interest on overdrawn directors loan account` |
| 140 | 9 | 9 | bhp.co.uk | **yes** | **no** | `overdrawn directors loan account interest` |
| 140 | 85 | none | forvismazars.com | no | **no** | `loans to participators` |
| 110 | 7 | 7 | bhp.co.uk | **yes** | **no** | `overdrawn directors loan account tax` |
| 110 | 11 | 11 | bhp.co.uk | **yes** | **no** | `directors loan repayment` |
| 110 | 25 | 25 | taxqube.co.uk | no | **no** | `what is s455 tax` |
| 90 | 2 | 2 | bhp.co.uk | **yes** | **no** | `directors loan account in credit` |
| 90 | 4 | 4 | bhp.co.uk | **yes** | **no** | `credit directors loan account` |
| 90 | 52 | 52 | bhp.co.uk | no | **no** | `directors loan write off` |

### 3.3 Five readings the table does not make obvious

1. **THE FINDING OF THIS PACK. The page's own subject is called `s455` by the market and the page never writes
   it that way.** `s455 tax` (1,900), `s455` (1,000), `s455 charge` (210), `what is s455 tax` (110): **3,220
   combined volume on the unpunctuated form**, and the live page writes `s.455`, `section 455` and `S455` in a
   key takeaway only. **`s455` as an unpunctuated standalone token appears zero times in the body.** This is a
   pure vocabulary gap on a page that is otherwise the most technically correct treatment of the topic found
   anywhere in the fetch set.
2. **The interest sub-family is 1,180 volume across five peer-winnable rows and the page barely touches it.**
   `directors loan interest rate` (480, position 9), `directors loan interest` (210, 17),
   `interest on directors loan` (210, 14), `interest on overdrawn directors loan account` (140, 10),
   `overdrawn directors loan account interest` (140, 9). All peer-winnable. **Our page gives interest one bullet
   in the mistakes list** ("If the company charges the director interest ... Most directors simply pay the BIK
   rather than set a formal interest rate"). §5.1 point 3.
3. **The in-credit sub-family is a position-2 and position-4 competitor win and it is our page's best section.**
   `directors loan account in credit` (90, bhp position **2**) and `credit directors loan account` (90, bhp
   position **4**), both peer-winnable. Our page has a whole H2 on the in-credit account plus the s.162
   consideration route, which no competitor carries. **We have the better answer and not the words.**
4. **`dla christmas payments` is a false positive and must be excluded with its reason on the record.** Four
   rows (`dla payments over christmas` 260, `dla christmas payments 2025` 210, `dla christmas payment dates
   2025` 140, `dla christmas payments` 140; combined **750 volume**), all held by
   `https://lanop.co.uk/hmrc-christmas-payments-and-child-benefit-claim-guide/`. **DLA here is Disability Living
   Allowance, not a director's loan account. Excluded, 750 volume removed from any target.** Anyone re-deriving
   this family with a bare `dla` regex will pick it up again, which is why it is named here rather than silently
   dropped.
5. **Nothing in 78 rows is medical.** No `directors loan doctor`, no `consultant directors loan`, no
   `s455 medical company`. The medical modifier does not exist in the Google harvest for this topic, exactly as
   it does not for FIC. Our differentiation is not a keyword; it is that the worked example is a consultant, the
   in-credit route is s.162 incorporation consideration, and the cost line includes NHS pension accrual.

---

## 4. Competitor teardown

All fetches made **2026-09-01**, `httpx` with a **full browser header set** (UA, Accept, Accept-Language,
Accept-Encoding, four `Sec-Fetch-*`, `Upgrade-Insecure-Requests`), following redirects. **Every URL attempted is
accounted for below with its status code. Only pages that returned HTTP 200 are torn down.**

### 4.1 sandisoneasson.co.uk, A Guide to Directors Loan Accounts: **THE MEDICAL SPECIALIST, AND IT IS SIX YEARS STALE**
`https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` · **HTTP 200**
**Class: PEER** (universe §2a #7). **Holds the head of the family**: `directors loan` (2,900, position 26),
`directors loan account` (1,000, **18**), `directors loan interest rate` (480, **9**),
`what is a directors loan account` (480, 31), `overdrawn directors loan account` (390, 27), and 18 more rows.

| | |
|---|---|
| Title / H1 | `A Guide to Directors Loan Accounts` (identical) |
| Published | **September 2020**, author "Aaron", categories `Limited Company`, `Tax-efficient` |
| Word count | **1,596** including site chrome; the article body is roughly 1,250 |
| H2/H3 in the article body | **NONE.** The only heading markup on the page is the chrome (`Address`, `Links`). |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |
| Medical? | **Yes.** Its navigation is `Hospital Consultants / GP-Practice / GP-Federations / GP-Locums / registrars / dentists`, and the article closes "If during the lockdown and with restrictions as to the availability to practice within the private hospitals you feel that you may have extracted more funds from your company than in previous years then please do not hesitate to get in contact." |

**Covers:** the two directions of the account and the "Directors Current Account (DCA)" synonym; the 9-months-
and-1-day rule with a worked date example; the deferred repayment ("HMRC will repay the tax after 1 January 2023
following a claim for repayment"); clearing an overdrawn account by **voting a dividend that is not withdrawn**,
credited to the loan account; the bed-and-breakfasting 30-day point; the case where reserves are insufficient to
clear the balance; and, unusually, **the matrimonial-dispute angle** where a spouse director-shareholder is
unaware of the overdrawn balance.

**What it gets wrong, and it is most of the numbers.**
- **`HMRC will charge additional tax on that loan at 32.5%`.** That was the dividend upper rate for 2020/21. It
  is **two rate generations stale**: 33.75% from 6 April 2022, **35.75% from 6 April 2026** (house positions §5).
- **`The official rate set by HMRC is currently 2.25% per annum`.** A 2020 figure presented in the present tense.
- Dates the whole worked example to 2021 to 2023.
- **Never names s.458.** Says the tax "will be repaid" without the section, the four-year claim window, or the
  fact that relief is deferred rather than automatic.
- **Never names s.464C or s.464D**, and describes only the 30-day limb. **The arrangements limb is absent.**
- **Never states the £10,000 beneficial-loan threshold.** It mentions P11D reporting with no trigger.

**Consequence for us.** **The medical specialist peer that holds the head term is a six-year-old,
heading-free, lockdown-framed article carrying a rate that is two generations out of date.** That is the single
most winnable competitor page in wave C. Its two genuinely useful ideas we lack are **clearing an overdrawn
balance by voting an undrawn dividend** and the **matrimonial exposure**.

### 4.2 bhp.co.uk, Director's Loan Accounts: the good, the bad and the ugly: **THE PAGE TO BEAT ON SUBSTANCE**
`https://bhp.co.uk/news-events/blog/directors-loan-accounts-the-good-the-bad-and-the-ugly/` · **HTTP 200**
**Class: PEER** (universe §2a #15 family). Holds 31 rows including `directors loan rules` (170, position 8),
`overdrawn directors loan account tax` (110, **7**), `directors loan account in credit` (90, **2**),
`credit directors loan account` (90, **4**), `overdrawn directors loan account interest` (140, **9**).

| | |
|---|---|
| Title / H1 | `Director's Loan Accounts - the good, the bad and the ugly` |
| Published | **21 April 2023**, bylined to a named Senior Tax Manager with an office and a "Connect with" link |
| Word count | **1,771** · Reading time stated as "5 mins" |
| H3 | `The Good`; `The Bad`; `The Ugly`; `Summary` (plus `Charging Interest`, `Benefit In Kind`, `S.455 Charge`, `Exclusions to s455`, `"Bed and Breakfasting" rules`, `Writing off an overdrawn DLA`, `Liquidating a company that has an overdrawn DLA` as inline bolded sub-heads) |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |

**Covers, and this is the most complete competitor treatment in the set:** charging interest, with the **CT61**
machinery (20% basic-rate withholding, due 14 days after the March/June/September/December quarter end, CT relief
on the gross where commercial and paid within 12 months of the year end), and a worked interest-efficiency
example. The £10,000 BIK threshold. **s.455 exclusions** that no other page carries: money-lending business,
charitable-trust trustee, and **a loan to a director or employee not exceeding £15,000 where the individual's
interest in the company is under 5%**. **Both bed-and-breakfasting limbs with their statutory thresholds**: the
30-day rule on repayments of £5,000 or more, and the **arrangements rule where the balance immediately before
repayment is at least £15,000 and there is an intention to borrow at least £5,000**. Write-off as a deemed
distribution with **Class 1 NIC for both company and individual**. Liquidation: the liquidator can demand
repayment and can bankrupt the director.

**What it gets wrong.**
- **`The amount of S.455 tax payable is 33.75%`.** Correct in April 2023, **stale from 6 April 2026**.
- **`Class 1A National Insurance (currently at 13.8%)`.** **The rate is 15% from 6 April 2025** (house positions
  §5). **Our page states 15% and is right where BHP is wrong.**
- **`The minimum rate of interest required is set by HMRC and is currently 2.25% per annum`.** Same stale
  official rate as 4.1.
- **The BIK trigger is stated as "exceeds £10,000 for a period of more than 30 days".** The statutory test in
  ITEPA 2003 s.175 has **no 30-day limb**; the small-loan exemption turns on the balance not exceeding £10,000
  at any time in the tax year. **Our page states it correctly and BHP does not.**
- Defines a close company as "broadly those with 5 or fewer shareholders **or where all of the shareholders are
  also directors**", which is loose but is the better of the two competitor attempts (see 4.3).

**Consequence for us.** BHP is the real competition on completeness and it is stale on every rate. **Four things
it has and we do not: CT61 and the interest mechanics, the s.455 exclusions, the arrangements-rule thresholds,
and write-off and liquidation.** Three of those four are §7.1 phrases.

### 4.3 taxqube.co.uk, S455: Tax on Directors' Loan Account
`https://taxqube.co.uk/s455-tax-on-directors-loan-account/` · **HTTP 200**
**Class: PEER** (universe §2a #18). **Holds the `s455` token family**: `s455 tax` (1,900, position **19**,
peer-winnable), `section 455 tax` (1,900, 62), `s455` (1,000, 24), `what is s455 tax` (110, 25).

| | |
|---|---|
| Title | `S455 \| Tax on Directors' Loan Account \| Chartered Accountants London` |
| H1 | `S455 \| Tax on Directors' Loan Account` |
| Published | **February 2022**, "5 minutes", author a named Client Manager with an email address |
| Word count | **1,328** including heavy service-block chrome; article body roughly 1,100 |
| H3 | `What is an overdrawn Director's Loan Account?`; `Corporation tax charge - S455`; `Beneficial Loan benefit in kind`; `Watch out for benefits in kind`; `The interaction between S455 and the benefits code`; `Record keeping and disclosure`; `How to deal with an overdrawn director's loan account` |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |

**Covers:** the CT600 supplementary-pages disclosure; the P11D and P11D(b) deadline of 6 July and the **£100 per
50 employees per month late-filing penalty**; the point that P11Ds run on the **tax year, not the accounting
year**, so a non-31-March year end requires mid-year books; and a genuinely good section on **the interaction
between s.455 and the benefits code** (a charge with no BIK, a BIK with no charge, or both).

**What it gets wrong, and two of the three are serious.**
- **`the S455 charge is calculated as 32.5 percent`.** Two generations stale, on the page that holds the `s455`
  token family.
- **`this only applies to 'close companies,' which are defined as businesses with fewer than five
  shareholders/directors`.** **Wrong twice.** The test is control by **five or fewer participators**, so five
  qualifies where "fewer than five" excludes it, and it is **participators**, not shareholders or directors.
  **Our page states "controlled by five or fewer participators" and is right.**
- **`you only pay S455 on loan advances, not the entire loan balance. So, if your loan balance increased from
  £15,000 to £18,000 this year, you'd only pay S455 on the extra £3,000`.** **This is wrong as a flat statement**
  and it is the kind of error that costs a reader money: s.455 applies to the loan outstanding at the
  nine-month-and-one-day point, and the advances framing describes only the year-on-year matching in a case where
  the earlier balance was already charged. **The page holding the head `s455` term teaches an under-payment.**

**Consequence for us.** The `s455` token family is held at position 19 to 62 by a February 2022 page with a wrong
rate, a wrong close-company definition and a wrong charging basis. **This is the clearest correctness gap in wave
C, and closing it costs nothing but the market's spelling of the word** (§3.3 point 1).

### 4.4 The fetches that did not return 200, recorded rather than dropped

| URL | Status | Note |
|---|---|---|
| `https://www.pricebailey.co.uk/glossary/s455-directors-loan-tax-charge/` | **HTTP 403** | Holds `s455 charge` (210, position 13, peer-winnable) and `section 455 tax charge` (170, 17). Returns a Cloudflare interstitial (`<title>Just a moment...</title>`) to `httpx` with the full header set, to `curl.exe --compressed` with a Safari UA, and to the `WebFetch` tool. **Not torn down. Nothing about its content is asserted anywhere in this pack.** See D14 correction at §10.1. |
| `https://www.pricebailey.co.uk/blog/family-investment-companies-fic/` | **HTTP 403** | Same wall, attempted for the sibling FIC pack. Recorded here because it is the same finding. |

**No fetch was silently dropped.**

### 4.5 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 14 themes, 14 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **`s455` as the market's spelling** (3.3 point 1, 4.3) | **COVER** | 3,220 volume on the unpunctuated token. Our page writes `s.455` throughout. Cheapest gap in the pack. |
| 2 | **Charging interest: CT61, 20% withholding, 14 days after quarter end, CT relief on the gross** (4.2) | **COVER** | 1,180 peer-winnable volume in the interest sub-family (§3.3 point 2) and our page gives it one bullet. **Real, statutory, and it is the alternative to paying the BIK.** |
| 3 | **The HMRC official rate itself** (4.1, 4.2 both state 2.25%) | **COVER the mechanism, VERIFY the rate before stating it** | Both competitors publish a stale rate in the present tense. Stating the current rate correctly is a clean win. **F6: no figure without a primary source. Verify at gov.uk (§7.5) or state the mechanism and link to the rate table without a number.** |
| 4 | **The s.455 exclusions: money-lending trade, charitable trustees, and loans not exceeding £15,000 to a director or employee with under 5% interest** (4.2) | **COVER, VERIFY at CTA 2010 s.456** | Absent from our page, absent from 4.1 and 4.3, and directly useful to a consultant whose spouse holds a minority stake. |
| 5 | **The arrangements rule's statutory thresholds: balance >= £15,000 before repayment, intention to borrow >= £5,000** (4.2) | **COVER, VERIFY at CTA 2010 s.464D** | Our page describes the arrangements rule **without its thresholds**, which makes it read as an unbounded anti-avoidance discretion. §6.2 point 4. |
| 6 | **Clearing an overdrawn balance by voting a dividend that is not withdrawn** (4.1) | **COVER** | Genuinely useful, absent from our page, and it is the mechanism most consultants actually use. **Handle it carefully against O34: it is a s.455 clearance mechanism, not an extraction-strategy recommendation.** One paragraph, no dividend rates, link out. |
| 7 | **Writing off an overdrawn DLA: deemed distribution, income tax, and Class 1 NIC on both sides** (4.2) | **COVER** | `directors loan write off` 90 vol. Our page mentions write-off only in passing inside the s.458 paragraph. The Class 1 NIC consequence is the point and we do not have it. |
| 8 | **Liquidation: the liquidator can demand repayment and bankrupt the director** (4.2) | **COVER, one paragraph** | The hardest consequence in the topic and no medical page carries it. |
| 9 | **P11D mechanics: the 6 July deadline, the P11D(b), and that P11Ds run on the TAX year not the accounting year** (4.3) | **COVER the tax-year point** | Our page states the 6 July and 19 July dates. The tax-year-versus-accounting-year mismatch is the practical trap and it is absent. |
| 10 | **The interaction table: charge without BIK, BIK without charge, or both** (4.3) | **COVER as a table** | L4 wants a table; this is a natural one; our page has two tables already and this would be the third and the most useful. |
| 11 | **The matrimonial-dispute exposure** (4.1) | **DECLINE** | Genuinely interesting and genuinely not ours. It is family-law adjacent, we are not solicitors, and it would be the only such passage in wave C. |
| 12 | **The close-company definition** (4.2 loose, 4.3 wrong) | **COVERED ALREADY, and it is a KEEP** | Our page says "controlled by five or fewer participators", which is right where both competitors are not. Do not soften it. |
| 13 | **The 32.5% / 33.75% rate as current** (4.1, 4.2, 4.3) | **DECLINE, and it is the whole page** | Every competitor is stale. See §5.1 point 1. **Never state 32.5% at all; state 33.75% only inside the date band.** |
| 14 | The consultant's medical framing: NHS pension accrual, s.162 consideration, private-work-only | **COVER, and no competitor has any of it** | See §5.1 point 5. |

---

## 5. Whitespace: what this page owns, and what it links out

### 5.1 What nobody in the peer set has

1. **Not one competitor page states the current s.455 rate.** 4.1 says **32.5%** (2020/21), 4.2 says **33.75%**
   (2022/23 to 2025/26), 4.3 says **32.5%**. **The correct rate for a loan made on or after 6 April 2026 is
   35.75%** (house positions §5) and it appears on none of them. Our page states both rates **with their date
   bands**, which is the thing the topic most needs and the thing nobody else does. **KEEP and protect: this is
   the page's single strongest asset.**
2. **Nobody explains that s.458 relief is DEFERRED.** 4.1 says the tax "will be repaid ... following a claim" and
   dates it correctly by accident; 4.2 says the company "is entitled to the repayment nine months after the year
   end in which the loan is repaid" and does not name the section or the four-year window; 4.3 says relief is
   "due immediately" where repaid within nine months, which is right for that case and silent on the other.
   **Nobody prices the up-to-12-month cash gap. Ours does, with dates. KEEP.**
3. **The interest sub-family is 1,180 peer-winnable volume and everyone is stale on it.** Both competitors that
   quote the official rate quote 2.25%. **Get it right and this family is winnable on correctness alone**, which
   is the rarest kind of opportunity in the corpus.
4. **Nobody connects the loan account to incorporation consideration.** Our H2 on the in-credit account explains
   that s.162 consideration can be credited to the DLA rather than taken wholly in shares, and that each pound
   outside shares reduces the deferred gain. **No competitor page in the set mentions s.162 at all.** It is the
   most valuable paragraph on our page for a consultant who has just incorporated, and it is unique. **KEEP.**
5. **Nobody prices the pension cost.** Every competitor treats a DLA as a pure tax question. Ours adds that
   loan-account drawings generate **no NHS pension accrual**, and that for a consultant whose NHS post is the
   only pensionable income an employer pension contribution is often the better lever. **That is the medical
   differentiation and no keyword expresses it. KEEP.**
6. **Nobody has a table.** Zero tables across 4,695 competitor words. Our page has two.

### 5.2 What this page OWNS versus what it LINKS OUT

**This page OWNS:**
- The **director's loan account** in a medical company: how it arises, both directions, and why the direction
  decides the tax.
- **CTA 2010 s.455**: close company, participator, the dividend-upper-rate charge, the nine-months-and-one-day
  measurement point, and the **date band that fixes the rate by when the loan was made**.
- **CTA 2010 s.458**: deferred relief, the four-year claim window, and the cash gap it creates.
- **CTA 2010 s.464C and s.464D**: the 30-day rule and the arrangements rule, **with their statutory thresholds**.
- **ITEPA 2003 s.175**: the beneficial-loan benefit in kind, the £10,000 test, the official rate, P11D and
  employer Class 1A.
- **PROPOSED, see §10.2:** the s.455 exclusions, write-off and liquidation consequences, and the CT61 interest
  machinery, all as parts of the same fact family.

**This page LINKS OUT and does not explain:**

| Fact | Owner | Allowance on this page |
|---|---|---|
| Salary versus dividend extraction, the dividend rate stack, the £500 allowance, and the optimal extraction mix | **O34**, `/blog/salary-vs-dividend-medical-limited-company-2026` | **One sentence, then link.** The task brief is explicit: "s455/FIC pages take one sentence then link for extraction". **THE LIVE PAGE IS IN BREACH IN THREE PLACES AND CARRIES NO LINK AT ALL**, §6.2 point 1. |
| Incorporation of a medical practice, s.162 relief, the claim requirement from 6 April 2026 | **O33**, `/blog/medical-practice-incorporation-step-by-step`; the relief detail on `/blog/incorporation-relief-private-medical-practice-s162` | One sentence, then link. The live page links the s.162 page correctly. Keep. |
| Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | **O2**, `/calculators/nhs-pension-annual-allowance` | **One sentence, then link.** Live page in breach, §6.2 point 2. |
| The 60% band, adjusted net income, the £100,000 to £125,140 taper | **O3**, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | One sentence, then link. **Do not restate the 60% band.** Live page compliant (it does not raise it). |
| Corporation tax rates and marginal relief as a topic | wave C sibling, `/blog/gp-corporation-tax` | One sentence, then link. |
| Surplus cash inside a trading medical company | wave C sibling, `/blog/surplus-cash-medical-limited-company-options` | One sentence, then link. **The nearest sibling and the one most likely to be annexed.** |
| A family investment company funded by a loan from the trading company | wave C sibling, `/blog/family-investment-company-doctors-consultants` | One sentence, then link. **Reciprocal of that pack's §4.5 theme 4.** |
| The employment-status fork for doctors | **O35**, `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | One sentence, then link to the live URL. No four-role table. |

### 5.3 KEEP, explicitly

K1 is a hard fail: the drafted version's count of statutory references, technical terms and figures must be
**greater than or equal to** the live page's.

- **The two-rate date band, 33.75% for loans made in 2025/26 and 35.75% for loans made on or after 6 April 2026,
  and the rule that the rate is fixed by when the loan was MADE, not when the charge falls due.** The most
  valuable content on the page. **KEEP, including the straddling-year-end example.**
- **s.458 relief is deferred to nine months and one day after the accounting period of REPAYMENT, four-year claim
  window, and the up-to-12-month cash gap with the January 2028 / January 2029 dates.** **KEEP.**
- **"controlled by five or fewer participators"** as the close-company test. Right where two competitors are
  wrong. **KEEP. Do not soften it to "shareholders" or to "fewer than five".**
- **The £10,000 beneficial-loan test stated as "exceeds £10,000 at any point in the tax year"**, with no 30-day
  limb. Right where BHP is wrong. **KEEP.**
- **Employer Class 1A at 15%.** Right where BHP is wrong at 13.8%. **KEEP with its date.**
- **The £40,000 worked example and its £14,300 charge**, with the full timetable. No competitor has arithmetic.
  **KEEP and re-derive (§7.4).**
- **The s.162 incorporation-consideration route into an in-credit DLA**, and the trade-off that value taken
  outside shares reduces the deferred gain. Unique in the set. **KEEP.**
- **The NHS pension line**: DLA drawings are neither salary nor dividends and generate no accrual; an ordinary
  personal service company cannot hold an NHS contract; company-derived income including dividends is outside the
  NHS pension. Aligned with house positions §2.C. **KEEP.**
- **The corrected NHS-contract wording** in FAQ 9 and in the body ("a company limited by shares whose
  shareholders all qualify"), landed by commit `7e596f02`. **KEEP EXACTLY. Never regress it to "a limited company
  cannot hold a GMS or PMS contract".**
- **"The loan route does not save tax; it defers it badly."** The page's sharpest sentence. **KEEP.**

---

## 6. Our current page, read honestly

Source file read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **4,357** · body copy only **2,815** |
| `metaTitle` | `Director's Loan Account: Consultant Medical Company` (51 chars) |
| `h1` / `title` | identical, `The Director's Loan Account in a Consultant's Medical Company: s.455, s.458 and the 2026/27 Rules` (97 chars) |
| Date / generator | 2026-07-06, `opus-4.8/netnew-wave` |
| H2 / H3 | **10 / 2** · Tables **2** · Internal links **3** · FAQs **12** · keyTakeaways **5** |
| Worked example | **Yes**, the £40,000 timetable table |
| Em-dashes | **0** (I1 clean) |
| C4 first-person plural | 6 in 2,815 words = **2.1 / 1,000** (cap 3). **Inside band.** |
| C3 second person | 3 in 2,815 words = **1.1 / 1,000** (band 12 to 25). **Far below band.** |

### 6.1 Blunt read

**This is the most technically accurate page on its topic anywhere in the fetch set, and it is written in the
third person about a hypothetical consultant while three stale competitor pages take the traffic.** It is right
on the rate, right on the deferral, right on the close-company test, right on the £10,000 threshold and right on
Class 1A where BHP is wrong on the last three. It is invisible because it does not use the market's word for its
own subject and because it addresses nobody.

Against the competitor set it is **missing four substantive things** (CT61 and interest, the s.455 exclusions,
the arrangements-rule thresholds, write-off and liquidation) and **carrying three things that belong to another
page** (§6.2 point 1).

### 6.2 What is wrong, thin or out of bounds, checked against house positions and the CURRENT rules including V2

1. **O34 IS BREACHED IN THREE PLACES AND THERE IS NO LINK TO THE OWNING PAGE. This is the biggest compliance
   defect in the pack.**
   - The comparison paragraph after the worked example states the full 2026/27 dividend stack ("10.75% (basic
     rate), 35.75% (higher rate) or 39.35% (additional rate) after the £500 allowance") and computes a dividend
     alternative of "approximately £14,121".
   - FAQ 10 (`How does the s.455 rate compare to simply paying a dividend?`) restates the upper rate and argues
     the dividend route is better.
   - The final paragraph **prescribes an extraction mix**: "model the cleanest 2026/27 extraction mix (salary
     near the £5,000 secondary NIC threshold, topped up with dividends at the new 10.75% and 35.75% rates, with
     employer pension contributions as the third lever)". **That is `/blog/salary-vs-dividend-medical-limited-company-2026`'s
     entire subject, stated as a prescription, on a page that never links to it.**
   - **`href="/blog/salary-vs-dividend-medical-limited-company-2026"` appears zero times on this page.**
   - **Ruling for this pack, at §9.2**: the page keeps ONE comparison, because s.455 is defined by reference to
     the dividend upper rate and a reader cannot understand the charge without knowing that. It loses the rate
     stack, the £500 allowance, the £14,121 arithmetic and the extraction-mix prescription, and gains the link.
2. **O2 is breached, and the year tag is stale.** "subject to the annual allowance of **£60,000 for 2025/26**,
   tapering where threshold income exceeds £200,000 and adjusted income exceeds £260,000 (down to a minimum of
   £10,000)". Two defects in one sentence: it is O2's fact stated in full where one sentence and a link is the
   allowance, **and every one of those figures is 2026/27's** (house positions §2.B: identical values under "2026
   to 2027" and "2025 to 2026", and the practical writing rule says tag them 2026/27). Tagging a current figure
   with the prior year is exactly the stale-framing defect F2 exists to catch. **Fix both: one sentence, tagged
   2026/27, then link.**
3. **The HMRC official rate is never stated, only referred to** ("calculated using the HMRC official rate for the
   relevant tax year (published annually at gov.uk)"). That is **correct and honest** under F6 and it is also a
   1,180-volume gap (§3.3 point 2). **The right fix is to verify the current rate at source and state it with its
   year tag, not to keep hedging** (§7.5). If it cannot be verified, the hedge stays.
4. **The arrangements rule is described without its thresholds.** "where, at the time of repayment, arrangements
   already exist to make a new loan, the relief is denied regardless of whether 30 days have elapsed". BHP (4.2)
   gives the statutory shape: balance at least **£15,000** immediately before repayment, intention to borrow at
   least **£5,000**. **Verify at CTA 2010 s.464D and state them** (§7.5). As written our sentence overstates the
   rule's reach.
5. **`s455` unpunctuated appears zero times in the body.** §3.3 point 1. The single cheapest fix in wave C.
6. **Four competitor themes are absent**: CT61 and the interest mechanics, the s.455 exclusions, write-off with
   Class 1 NIC, and liquidation (4.5 themes 2, 4, 7, 8).
7. **No `s.455` interaction table.** L4 wants a table on a page carrying a comparison; the charge-versus-BIK
   interaction (4.5 theme 10) is the natural third one.
8. **C3 far below band** (1.1 per 1,000 against 12 to 25). Unconstrained by the grade; this is a REFRAME.
9. **V5 and V9 checks on the live copy.** `it is not X, it is Y`: **one** instance ("It is a company-level
   charge, included in the Corporation Tax return, not a personal income-tax charge on the director" is a
   near-miss; the clear instance is "The loan route does not save tax; it defers it badly"), so the redraft's
   budget is **zero**, **except** that the "defers it badly" sentence is a §5.3 KEEP. **Resolution: keep that
   sentence, spend the whole page budget on it, and write zero others.** Numeral-count paragraph openers:
   **two** ("Two practical points follow"; "The account has two possible states"). **At the batch cap, above the
   wave-wide cap of one. Cut both.** V2: clean.
10. **The `metaDescription` will age badly.** "(33.75% then 35.75%)" is correct today and will read as
    prior-year framing once 2025/26 loans are historic. **Left unchanged per §1.2 and noted at §10.4.**
11. **A1 and A5.** The opening runs 171 words to the first H2; the direct answer (the rate and the date band)
    arrives at roughly word 55, inside A5's 40-to-90 band. **Over on intro length, inside on answer position.**

---

## 7. Deterministic acceptance criteria

### 7.1 The named phrase list

**12 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case and
punctuation normalised. **V1 is binding: two word orders per idea per page, hard cap, counted as non-overlapping
longest matches, never raw substrings. Any V1 finding must quote the spans it counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `s455` (unpunctuated, standalone, in body prose) | The charge's name | 1 of 2 | Harvest `s455 tax` 1,900 (taxqube pos **19**, peer-winnable), `s455` 1,000, `s455 charge` 210 (pricebailey pos 13, peer-winnable), `what is s455 tax` 110. **3,220 combined.** |
| 2 | `s455 tax` | The charge's name | 2 of 2 | Harvest 1,900 vol, peer-winnable. **The head of the family and the market's exact phrase.** |
| 3 | `overdrawn directors loan account` (unpunctuated possessive, the market's form) | Overdrawn DLA | 1 of 2 | Harvest 390 vol pos 27; plus `overdrawn directors loan account tax` 110 (bhp pos **7**), `overdrawn directors loan account interest` 140 (pos **9**). Our page writes `overdrawn director's loan account` only. |
| 4 | `directors loan interest rate` | Interest on the loan | 1 of 2 | Harvest 480 vol, sandisoneasson position **9**, peer-winnable. §3.3 point 2. |
| 5 | `CT61` | Interest on the loan | 2 of 2 | 4.2. The machinery that makes charging interest work, and it is absent from our page. |
| 6 | `official rate of interest` (with its 2026/27 tag, **conditional on §7.5**) | The official rate | 1 of 1 | Both competitors publish 2.25% in the present tense (4.1, 4.2). **If it cannot be verified at gov.uk, the phrase is DROPPED, not guessed.** |
| 7 | `directors loan account in credit` (unpunctuated, the market's form) | In-credit DLA | 1 of 2 | Harvest 90 vol, bhp position **2**, peer-winnable; plus `credit directors loan account` 90 at position **4**. We own the better answer (§5.1 point 4) and not the words. |
| 8 | `directors loan rules` | DLA rules as a topic | 1 of 1 | Harvest 170 vol, bhp position **8**, peer-winnable. |
| 9 | `written off` or `write off` (of an overdrawn balance, with the Class 1 NIC consequence) | Write-off | 1 of 2 | Harvest `directors loan write off` 90, `directors loan written off` 90. 4.5 theme 7. |
| 10 | `liquidation` (the liquidator's power to demand repayment) | Insolvency exposure | 1 of 1 | 4.5 theme 8. No medical page carries it. |
| 11 | `£15,000` (the s.464D arrangements threshold **and/or** the s.456 exclusion limit, **conditional on §7.5**) | Statutory thresholds | 1 of 1 | 4.2. §6.2 point 4. **If neither is verified at statute, the phrase is DROPPED.** |
| 12 | `what is a directors loan account` (or the same question as a heading or FAQ, in the market's word order) | Definition intent | 1 of 2 | Harvest 480 + 480 vol across two phrasings. Our FAQ 1 asks "What is a director's loan account **in a medical company**?", which is a different string. |

**Countable test: 12 of 12 present.** Phrases 6 and 11 drop to zero if §7.5 fails to verify them, making the test
10 of 10. **Any other absent phrase is a named BLOCK.**

**Explicitly NOT on this list, with the reason on the record:**
- **The `dla christmas payments` family** (750 combined volume, lanop positions 6 to 9). **EXCLUDED as a false
  positive**: DLA there is Disability Living Allowance (§3.3 point 4).
- **`loans to participators`** (140 vol, forvismazars position 85, **not** peer-winnable and the holder is an
  institutional non-peer per universe §2b). The term is on our page already inside the s.455 explanation.
- **`32.5%`** in any form. Two rate generations stale. Never write it.
- **The matrimonial-dispute angle** (4.5 theme 11). Declined.

### 7.2 Equity preservation (§9.9 floor 5)

**There is no named-query equity set. Zero Bing named queries (§2.3), zero Google query rows (§2.1).** Floor 5 is
replaced, for this page only, by:

**Countable test A: `metaTitle`, `h1`, `title`, `slug` and `canonical` byte-identical pre and post** (§1.2).
`git diff` must show zero changes on those five frontmatter lines.

**Countable test B: the Google page-dimension position must hold.** §8.4 trigger 1.

### 7.3 Ownership gates, countable

| Gate | Test | Pass condition |
|---|---|---|
| **O34, sentences** | Count sentences that state a dividend rate, the dividend allowance, or prescribe an extraction mix | **<= 1** on the whole page including FAQs and `keyTakeaways`. That one sentence exists to say the s.455 rate tracks the dividend upper rate, and it carries the link. |
| **O34, link** | `href="/blog/salary-vs-dividend-medical-limited-company-2026"` | **>= 1 occurrence.** Today: **0.** |
| **O34, banned strings** | `10.75%`, `39.35%`, `£500` dividend allowance, `£14,121`, `secondary NIC threshold` in an extraction-mix context | **0 occurrences each.** **`35.75%` is PERMITTED and required**, because it is this page's own s.455 rate; it is stated as the s.455 rate, not as a dividend rate. |
| **O2** | Count sentences stating annual-allowance mechanics | **<= 1**, tagged **2026/27**, carrying a link to `/calculators/nhs-pension-annual-allowance`. |
| **O3** | Count sentences explaining the personal-allowance taper, adjusted net income or the 60% band | **<= 1**. **The string `60%` must not appear in a tax-band context.** |
| **O33** | Count sentences explaining the incorporation step sequence or s.162 mechanics | **<= 1** each, linking to `/blog/medical-practice-incorporation-step-by-step` and `/blog/incorporation-relief-private-medical-practice-s162`. **The s.162-consideration-into-DLA paragraph is this page's own fact and is exempt** (§5.1 point 4). |
| **O35** | Count occurrences of a four-role employment-status table or list | **0.** |
| **O4** | Count Scheme Pays deadlines stated | **0.** **This is the exact fact that broke batch 1.** |
| **O9** | Count GMC retention fee figures | **0.** UNVERIFIED, hard fail F5. |
| **O10 / O25** | Count QOF point values and Global Sum figures | **0.** |
| **D3** | Count links to `/blog/private-practice-incorporation-complete-guide` | **0.** That URL **301s** (D3 RULED 2026-09-01). Link the target directly. |

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

**Every figure in the worked example must be re-derived from stated inputs by `arithmetic_recomputed[]`.** The
live example was checked by this task and reconciles: £40,000 x 35.75% = **£14,300.00**, drawn 1 July 2026 (on or
after 6 April 2026, so the 2026/27 band), year end 31 March 2027, charge due 1 January 2028 (nine months and one
day), repaid 1 October 2027 inside the year to 31 March 2028, s.458 relief available 1 January 2029, cash gap
**12 months**. **Every date and the charge check out. KEEP the example and re-derive it; do not re-invent it.**

**The £14,121 dividend comparison in the same section is arithmetically fine (£39,500 x 35.75% = £14,121.25) and
is REMOVED anyway, because it is O34's fact** (§7.3).

**PERMITTED and verified figures on this page:**

| Figure | Date band | Source |
|---|---|---|
| **s.455 at 33.75%** on loans made in **2025/26** | prior-year band, labelled as such | `house_positions.md` §5 |
| **s.455 at 35.75%** on loans made **on or after 6 April 2026** | **current, present tense** | §5, tracking the FA 2026 s.4 dividend upper rate |
| **Nine months and one day** after the accounting period end | | §5; CTA 2010 s.455 |
| **s.458** relief deferred to nine months and one day after the period of repayment, **four-year** claim window | | §5 |
| **£10,000** beneficial-loan threshold, "at any point in the tax year" | | ITEPA 2003 s.175 |
| **Employer Class 1A at 15%**, from 6 April 2025, unchanged for 2026/27 | 2026/27 | §5 |
| **£5,000** secondary threshold | 2026/27 | §5. **Only where the sentence is about employer NIC, never as part of an extraction-mix prescription** (§7.3). |
| P11D by **6 July**, Class 1A by **19 July** following the tax year | | HMRC |
| **£5,000** 30-day-rule repayment threshold; CTA 2010 **s.464C**, **s.464D** | | statute |
| **£15,000** arrangements-rule balance and **£15,000** s.456 exclusion limit with the **5%** interest test | | **CONDITIONAL: verify at statute first (§7.5)** |
| **CT61**, 20% withholding, 14 days after quarter end | | **CONDITIONAL: verify at HMRC first (§7.5)** |
| The HMRC **official rate of interest** for 2026/27 | | **CONDITIONAL: verify at gov.uk first (§7.5). Do NOT write 2.25%.** |
| Annual allowance **£60,000**, threshold income **£200,000**, adjusted income **£260,000**, floor **£10,000** | **2026/27, NOT 2025/26** | §2.B. **One sentence only, O2.** |
| CT 19% / 25% with marginal relief 3/200 | 2026/27 | §5. One sentence, then link to `/blog/gp-corporation-tax`. |

**BANNED FIGURES. None of these may be asserted:**

| Banned | Why |
|---|---|
| **`32.5%` in any context** | Two rate generations stale. Competitor-sourced (4.1, 4.3). |
| **`2.25%` as the official rate** | Competitor-sourced (4.1, 4.2), stale, published by both in the present tense. F6. |
| **`13.8%` Class 1A** | Competitor error (4.2). The rate is 15%. |
| **Any dividend rate other than the s.455 rate itself, any dividend allowance figure, any extraction-mix prescription** | O34, §7.3. |
| **The annual allowance tagged `2025/26`** | §6.2 point 2. F2 stale framing on a current figure. |
| **Any Scheme Pays deadline** | O4. |
| **Any GMC retention fee** | O9, F5. |
| **Any QOF point value or Global Sum figure** | O10, O25. |
| **"fewer than five shareholders" as the close-company test** | Competitor error (4.3). It is **five or fewer participators**. |
| **"s455 is charged only on advances, not the balance"** | Competitor error (4.3). Wrong as a flat statement. |
| **A 30-day limb on the £10,000 beneficial-loan test** | Competitor error (4.2). ITEPA 2003 s.175 has no such limb. |
| **`Entrepreneur's Relief`** | Renamed BADR in April 2020. |
| **Any statement that a doctor's ordinary personal service company, or any company, simply "cannot hold a GMS or PMS contract"** | §2.C correction of 2026-08-26. Use the corrected wording already on the page. |
| **Any fabricated statistic, "most consultants", "we find that around X%"** | F6, I6. |

**Countable test: count of banned-figure assertions = 0.**

**Worked-example rules: G3's five components in order, G4 (role plus an initial only, explicitly illustrative,
never a real person), G6 (the heading must NOT be "Worked example" and must not open with a `Worked example:`
prefix, hard fail), G5 (the £40,000 is illustrative; every RATE traces to house positions with its date band).**
Note the live H2 is `Worked example: a consultant overdraws £40,000`, which is a **live G6 breach** and, because
this is a REFRAME, is fixed rather than escalated. G7's 80-to-200-word band collides with C2's 75-word paragraph
maximum where the example spans paragraphs; per BATCH3_INDEX pack-defect 5, QA must not read the split as a
missing component.

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify, and it must be fetched |
|---|---|
| s.455 rate, date bands, nine months and one day; s.458 deferral and the four-year window | `house_positions.md` §5 (verified 2026-08-26) and https://www.legislation.gov.uk/ukpga/2010/4/section/455 and /section/458 |
| **s.464C 30-day rule and s.464D arrangements rule, INCLUDING the £5,000 and £15,000 thresholds** | **MUST be read at https://www.legislation.gov.uk/ukpga/2010/4/section/464C and /section/464D. BHP (4.2) is a competitor blog and a competitor blog is not a source (D17). If the thresholds cannot be confirmed, phrase 11 is DROPPED and the arrangements rule is stated without numbers.** |
| **The s.455 exclusions: money-lending trade, charitable trustees, and the £15,000 / under-5% employee limb** | **MUST be read at CTA 2010 s.456 (https://www.legislation.gov.uk/ukpga/2010/4/section/456). Same rule: verify or omit.** |
| Beneficial loan, £10,000 test, official rate, no 30-day limb | https://www.legislation.gov.uk/ukpga/2003/1/section/175 and https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim26100 |
| **The HMRC official rate of interest for 2026/27** | **MUST be read at https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments or the beneficial-loan official-rate page. Do NOT take 2.25% from 4.1 or 4.2. If unverified, phrase 6 is DROPPED and the mechanism is stated without a rate.** |
| **CT61: the 20% withholding on interest paid to a director and the 14-days-after-quarter-end filing** | **MUST be read at HMRC (CT61 guidance / SAIM9070) before stating.** |
| Write-off as a deemed distribution, and the Class 1 NIC consequence on both sides | **MUST be read at HMRC CTM61600+ / NIM before stating the NIC limb, which is the part that is easy to get wrong.** |
| Employer Class 1A 15%, £5,000 secondary threshold, Employment Allowance £10,500 and its single-director exclusion | `house_positions.md` §5 |
| Annual allowance, taper thresholds, floor, carry forward | `house_positions.md` §2.B. **Tag 2026/27.** |
| s.162 relief, claimed not automatic from 6 April 2026 per FA 2026 s.39, and the shares-versus-other-consideration apportionment | `house_positions.md` §4; https://www.legislation.gov.uk/ukpga/1992/12/section/162 |
| A company limited by shares may hold a GMS contract only on the s.86(3) shareholder conditions; PMS sits under s.92/s.94 and no shareholder test may be asserted for it | `house_positions.md` §2.C correction of 2026-08-26 |
| Dividends and company income are never NHS-pensionable; only the NHS post is pensionable for a consultant | `house_positions.md` §2.C |

**Countable test: every external factual claim maps to a row above with a fetch date. Count of unverified claims
= 0.**

### 7.6 Floors

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug consultant-directors-loan-account-s455-medical-company` | Gate bar met; **0 covered queries lost** (baseline 0, so the gate that bites is 7.2 test B) |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure and every date in the worked example re-derived from stated inputs (§7.4) |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified; the five MUST rows are blocking |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; every new link resolves via `slug_resolver.py`. All internal targets named in this pack were confirmed to exist as markdown files on 2026-09-01. |
| 5. Equity preservation | §7.2 | Tests A and B |
| 6. Cluster coverage | §7.1 | **12 of 12** (or 10 of 10 if the two conditional phrases drop) |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed.** The director's-loan family is not a dossier §4 row. Ledger unchanged. |
| 8. Competitor re-read | §4.5 | **14 themes, 14 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere including frontmatter. Live count **0**, must stay 0. I1, hard fail.
2. **`metaTitle`, `h1`, `title`, `slug`, `canonical` byte-identical** (§1.2, §7.2 test A).
3. **O34's three breaches are all removed and the link is added.** §7.3 makes it countable. **This is the pack's
   primary compliance objective.**
4. **`it is not X, it is Y`: budget ONE, and it is already spent** on "The loan route does not save tax; it
   defers it badly", which is a §5.3 KEEP. **Write zero others.**
5. **Numeral-count paragraph openers: budget ZERO**, and the two live instances (§6.2 point 9) must both go.
   BATCH3_INDEX §6.3 records this reflex reproducing across three batches; wave C is the fourth showing.
6. **C3: the redraft must reach 12 per 1,000 second person minimum.** Today 1.1.
7. **C4: keep first-person plural at or below 3 per 1,000.** Today 2.1.
8. **No "How we help" H2 in the batch-2 shape.** Seven of nine wave-A/B pages ended with a near-identical block
   and all were removed in round 3. **This page has one, and it is also where the O34 extraction-mix breach
   lives.** The rewrite does not reproduce it.
9. **G6: the live H2 `Worked example: a consultant overdraws £40,000` is a hard-fail string and must be
   renamed.** BATCH3_INDEX records 13 files in the corpus carrying it.
10. **No named individual, credential, byline or "reviewed by".** I2. Both 4.2 and 4.3 do this and we do not.
11. **Never state or imply that a doctor's ordinary personal service company can hold an NHS contract, and never
    regress to the flat "no company can" wording.** §2.C.
12. **Never propose a collapse, redirect or URL change.** K4.
13. **One change per page per window** (§9.3).
14. **Do not edit any frozen page.** Two frozen live URLs are linked and both links stay.

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC `searchanalytics.query`, dimension `page` | 2026-06-03 to 2026-09-01 (90d) | **0 clicks, 13 impressions, average position 9.69** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows.** All 13 impressions anonymised. |
| Bing | `GetPageStats`, **page level** | 13 weekly snapshots, 2026-05-29 to 2026-08-21 | **0 snapshots** (top-N absence, not proven zero) |
| Bing | `GetPageQueryStats`, **named-query level** | as returned | **0 rows** |

Pro-rated to 28 days from the 90-day Google frame: **4 impressions, 0 clicks.**

### 8.2 The read at 28 days, Bing (primary channel)

Bing out-clicks Google 3.3x estate-wide on this site (STATE, 2026-09-01: 360 clicks vs 108). **This page has
never appeared on Bing**, so the Bing test is a first-appearance test:

1. **First Bing impression.** `GetPageStats` returns **at least one weekly snapshot** containing this URL within
   28 days of deploy. Today: zero of thirteen.
2. **First named Bing query.** `GetPageQueryStats` returns **at least one row**, and it should be from the `s455`
   token family (§7.1 phrases 1 and 2), because that is what the rewrite adds.

**Both are low confidence: a page absent from a top-N endpoint is indistinguishable from a page with one
impression.** They are stated so the read has a number, not because a miss proves anything.

### 8.3 The read at 28 to 90 days, Google

3. **Position holds.** Average position on the `page` dimension stays **at or better than 13.0** against a
   baseline of 9.69. A slip inside that band is noise on 13 impressions.
4. **Impressions.** At or above **13** at day 90. **No growth target is set and no position promise is made.**
   STATE's Stage 0 diagnosis of 2026-09-01 is explicit: 18 of 139 URLs are indexed, 51 have never been fetched,
   and the head commercial family sits at position 45 to 78 with zero clicks. **Content cannot close an
   indexation gap.**
5. **Query rows.** At least **1** query-level Google row by day 90 against a baseline of 0. Low confidence:
   visibility is GSC's threshold decision, not ours.

### 8.4 Failure triggers, written as numbers, before the change

> **TRIGGER 1, Google, and it is the binding constraint.** If the GSC `page`-dimension average position for
> `/blog/consultant-directors-loan-account-s455-medical-company` falls **below 20.0** in any 28-day window
> between deploy and deploy+90 days, revert:
> `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/consultant-directors-loan-account-s455-medical-company.md`
> Position 9.69 is a live page-1 position on a domain that has 18 indexed URLs. It is the only measurable thing
> this REFRAME can lose.

> **TRIGGER 2, impressions.** If Google page-dimension impressions fall **below 7** (roughly half the baseline)
> in any 28-day-equivalent window between deploy and deploy+90 days, hold the page and investigate before any
> further change. Not an automatic revert: on 13 impressions the noise floor is wide.

> **TRIGGER 3, factual.** If the adversarial factual QA track finds **any** figure on the drafted page that
> contradicts `house_positions.md`, the page is held. This page's whole competitive position is that it is right
> where three competitors are wrong (§5.1), so a factual defect here costs more than a coverage miss.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **12 phrases of §7.1**,
not with the zero queries the page currently ranks for. **`monitored_pages` registration is a separate
owner-triggered step and has not been done by this task. No monitor, alert, cron, email or scheduled job was
created.**

---

## 9. Ownership-map compliance

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a conductor's brief and the map disagree, THE MAP WINS.**

### 9.1 The rows this page must obey, reproduced from BATCH3_INDEX §6

| # | Shared fact | Owner | **What THIS page does** |
|---|---|---|---|
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **One sentence, then link.** **THE LIVE PAGE IS IN BREACH IN THREE PLACES AND CARRIES NO LINK**, §6.2 point 1. See §9.2. |
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed not automatic from 6 April 2026 per FA 2026 s.39), the step sequence, and the pension-accrual loss paired with every tax saving | `/blog/medical-practice-incorporation-step-by-step` (**named 2026-09-01 by the D3 ruling**) | One sentence, then link. **Live page compliant**: it links `/blog/incorporation-relief-private-medical-practice-s162` for the apportionment detail and does not explain the step sequence. The DLA-consideration paragraph is this page's own fact (§9.2). |
| **O3** | Adjusted net income, the £100,000 to £125,140 taper, the **60% band**, HICBC | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | One sentence, then link. **Do not restate the 60% band.** Live page compliant: it does not raise it. |
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | One sentence, then link. **Live page in breach, and with a stale year tag**, §6.2 point 2. |
| **O35** | The employment-status fork for doctors (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work) | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | One sentence, then link to the live URL. **No batch-3 page rebuilds the four-role table.** Live page compliant. |
| **O4** | Scheme Pays: two-limb election, mandatory vs voluntary, deadlines | `/calculators/nhs-pension-scheme-pays`; `/blog/nhs-pension-scheme-pays-doctors-deadlines` **is not this batch's at any date** | **No Scheme Pays deadline anywhere.** Live page compliant. **This is the exact fact that broke batch 1.** |
| **O9** | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No GMC fee figure. Hard fail F5.** |
| **O10 / O25** | Global Sum (**£130.07, VERIFIED**) and QOF point value (**£227.95, VERIFIED**, ban lifted by the O10 RULING of 2026-08-26; the ownership fence is unaffected) | `house_positions.md` §3.A / §3.B; QOF owned by `/blog/qof-income-gp-practice-accounting-explained` | Neither appears. Compliant. |
| **O1** | NHS tiered member contribution rates and bands | `/calculators/nhs-superannuation-tiered-contribution` | No tier table. Compliant. |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. |
| **O17 / O21-VAT** | VAT exemption vs standard rating; the £90,000 threshold | `/blog/gp-vat-registration` (**FROZEN**) | Not relevant. Cited as `O21-VAT`, never as `O21` (BATCH3_INDEX §6.1a collision 2). |

### 9.2 THE BOUNDARY QUESTION, and the reciprocal of the FIC pack's

**O34 gives extraction to the salary-vs-dividend page. s.455 is DEFINED by reference to the dividend upper rate.
A reader cannot understand why the charge is 35.75% without being told it tracks the dividend upper rate. The map
and the topic pull against each other.**

**The pack's reading, offered to the conductor and NOT applied as a map change:**

- **O34 owns the extraction DECISION**: how salary, dividend and pension contribution compare as ways to take
  money out of a medical company; the full rate stack; the allowance; the optimal mix.
- **This page owns the s.455 CHARGE**, including the single sentence that says the charge is set at the dividend
  upper rate and moves with it. **That sentence is definitional, not comparative, and it is the whole
  allowance.**
- **The operative line:** the page keeps **one** sentence naming the dividend upper rate as the s.455 rate's
  reference point, plus the `35.75%` and `33.75%` figures **stated as s.455 rates**, and loses everything else
  in §6.2 point 1: the full rate stack, the £500 allowance, the £14,121 dividend arithmetic, FAQ 10's comparison
  argument, and the extraction-mix prescription. **The link to the O34 owner is added.** §7.3 makes all of that
  countable.
- **Also owned here and not by O33:** the route by which s.162 incorporation consideration is credited to the DLA
  rather than taken wholly in shares, and the consequence for the deferred gain. It is a loan-account fact
  reached from incorporation, not an incorporation fact. **The reciprocal handoff is that the s.162 page and the
  step-by-step page each get one sentence and a link here, which the live page already does.**

**Per §9.4 this is reported, not enacted.** If the conductor rules that FAQ 10 must go entirely rather than be
narrowed, the writer removes it and the page loses a genuine reader question, which the conductor should know is
the cost.

### 9.3 The reciprocal fence with the two nearest siblings

Three wave-C pages can each write "how a consultant gets money out of a company" and two of them must not.

| Page | Owns | Must not |
|---|---|---|
| `salary-vs-dividend-medical-limited-company-2026` (**O34**) | The extraction decision and every dividend rate | Explain s.455 mechanics beyond one sentence |
| **this page** | The s.455 / s.458 / s.464 / beneficial-loan machinery, and the in-credit account | State a dividend rate other than as the s.455 rate; prescribe an extraction mix |
| `surplus-cash-medical-limited-company-options` | What to do with cash left inside the company | Explain the loan account, or the FIC |

**A proposed clarification, not enacted:** this is the fence a conductor should write into the map as a wave-C
row, because three surfaces currently share one subject with only O34 to separate them. **Prefixed id proposed:
`C3-02`**, per BATCH3_INDEX §6.1a's lesson that a single global integer sequence collides across parallel
sessions.

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. This pack proposes **one** boundary clarification
(§9.2), **one** new wave-C fence row (§9.3), **one** owned-fact extension (§10.2) and **four** corrections. None
is enacted.

### 9.5 Batch-level style watch (V5 and V9), conductor's job not this writer's

1. Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   wave, is named in the wave's fix pass, whatever it is.
2. **Named and already burned:** `it is not X, it is Y` (cap once per page, wave-wide) and the **numeral-count
   paragraph opener** (cap once per page, wave-wide, prefer zero). **This page's budget for the first is spent on
   a KEEP sentence and its budget for the second is zero** (§7.7 points 4 and 5).
3. **V9's corollary: wave C is the fourth showing of the corrective-opening reflex.** The wave-C conductor decides
   the variation and states it in the fix pass.
4. **V1 hard cap: two word orders per idea per page**, non-overlapping longest matches, never raw substrings.
   §7.1 states its idea groups. **Note the V1 pressure specific to this page: `s455`, `s.455`, `section 455` and
   `S455` are four word orders for one idea. §7.1 asks for two of them (`s455`, `s455 tax`) and the page already
   carries `s.455` and `section 455`. The writer must choose, and the correct choice is to standardise the body
   on `s455` and `section 455` and let `s.455` survive only in the H1 and statutory citations**, where it is a
   citation form rather than a word order.
5. **V2 is a live standard.** This page is clean and must stay clean: no search-string narration, no
   keyword-variant table, and **no narration of the ownership map to the reader** (conductor ruling 3,
   2026-08-26). Write "the detail sits on X" and link it.

---

## 10. Corrections and escalations

Five. **None was acted on. Nothing outside this file was written.**

### 10.1 D14 needs restating: a full header set no longer recovers pricebailey

BATCH3_INDEX **D14** records that both pricebailey URLs 403 to `curl -A "Mozilla/5.0"` and **"return 200 to a
full browser header set"**, and prescribes fixing the estate's competitor-fetch helper to send full headers.

**Measured 2026-09-01: the full header set does not recover pricebailey.**
`https://www.pricebailey.co.uk/glossary/s455-directors-loan-tax-charge/` and the sibling FIC URL both return
**HTTP 403** with a Cloudflare interstitial (`<title>Just a moment...</title>`) to all three of: `httpx` with UA
+ Accept + Accept-Language + Accept-Encoding + four `Sec-Fetch-*` + `Upgrade-Insecure-Requests`; `curl.exe
--compressed` with a Safari UA; and the `WebFetch` tool. **hawsons.co.uk returned 200 to the same httpx header
set while 403-ing `WebFetch`**, which reproduces D14's original observation and shows the header fix is real and
simply insufficient for this domain.

**Consequence here: pricebailey holds `s455 charge` (210, position 13, peer-winnable) and `section 455 tax
charge` (170, 17) and its page is unreadable.** **D14's prescription stands and should be widened: the helper
needs full headers AND a documented fallback for JS-challenge domains, and until it has one, pricebailey pages
must be recorded as unread rather than characterised.** This pack characterises nothing about them.

### 10.2 PROPOSED EXTENSION of what this page owns (§5.2)

Proposed, not enacted, **prefixed rather than numbered `O37`** per BATCH3_INDEX §6.1a.

| # | Shared fact | Proposed owner | Everyone else |
|---|---|---|---|
| **C3-03** | **The full loans-to-participators machinery**: the s.456 exclusions, write-off as a deemed distribution with Class 1 NIC on both sides, the liquidator's power to demand repayment, and the CT61 machinery for charging interest on a loan account | `/blog/consultant-directors-loan-account-s455-medical-company` | Every other wave-C page: one sentence, then link. |

**Why here.** All four are consequences of the same loan, they are the four themes the competitor set has and we
do not (4.5 themes 2, 4, 7, 8), and the alternative is that `surplus-cash` or `gp-corporation-tax` picks one of
them up unowned, which is the batch-1 failure shape.

### 10.3 The pack's factual finding about the competitor set, recorded because it is unusually clean

**Three of three fetched competitor pages state a stale s.455 rate**, and two of the three state the same stale
official rate of interest (2.25%). Two carry outright errors on the close-company test or the charging basis
(4.3) and on the beneficial-loan trigger and Class 1A rate (4.2).

**This is the strongest correctness position any Medical page holds against its competitor set**, stronger than
the wave-A GMS page's (where the incumbent was merely eight years out of date on one figure). It is recorded here
so the wave-C conductor knows the argument for prioritising this page inside the wave: **the work is vocabulary,
not substance, and the substance advantage is already paid for.**

### 10.4 The `metaDescription` will age, and it is left alone deliberately

`How an overdrawn director's loan account works in a consultant's company: the s.455 charge (33.75% then
35.75%), s.458 relief and the beneficial-loan trap.` 155 characters, inside band, accurate today.

**It will read as prior-year framing from roughly April 2027**, when loans made in 2025/26 stop being a live
concern. §1.2 retains it because the page holds a page-1 Google position and the description is part of what an
engine has been shown. **Recorded so a later session changes it deliberately rather than discovering it**, and so
that a QA agent reading F2 does not raise it as a defect now.

### 10.5 Two smaller corrections

1. **The task brief's "11 impressions" is 13 on a fresh pull** over 2026-06-03 to 2026-09-01. Inside
   window-difference tolerance; it does not move the wave-C rank order. **The figure the brief omitted is the one
   that matters: position 9.69** (§1.2, §8.4).
2. **BATCH3_INDEX §5's "there is almost nothing to lose" on wave C is right for Bing and wrong for Google on the
   two highest-trace pages.** This page holds 9.69 and `family-investment-company-doctors-consultants` holds
   **4.78**, which is better than the position BATCH3_INDEX §8 protects as the corpus's strongest. **The wave-C
   conductor should re-pull the Google page dimension for the other eight surfaces before scoping them**, rather
   than working from the index's impression counts.

---

## 11. Limitations

1. **One competitor page in the family could not be read.** pricebailey holds two peer-winnable rows and 403s to
   every fetch method tried (§4.4, §10.1). Nothing is asserted about its content.
2. **`GetPageStats` is a top-N endpoint.** This URL's absence from all thirteen weekly snapshots is absence from
   the top N, not proven zero Bing impressions (BATCH3_INDEX §9 limitation 2, D5).
3. **All 13 Google impressions are anonymised**, so there is no query-level evidence of intent on either engine.
   §7.1 is built from the persisted harvest and the competitor teardown with **no first-party query signal at
   all**. That is a weaker evidence base than any wave-A pack had.
4. **Nothing in the 78-row keyword family is medical** (§3.3 point 5). The medical modifier does not exist in the
   Google harvest for this topic, and Bing gives no second opinion because the page has no Bing rows. **The
   medical framing is therefore a differentiation bet, not a measured demand.** Stated so the read is scored
   against the general-vocabulary phrases (§7.1) and not against a medical phrase that may never be typed.
5. **Five facts required for the redraft are unverified as at this pack's writing** and are gated at §7.5: the
   s.464D thresholds, the s.456 exclusions, the 2026/27 official rate of interest, the CT61 mechanics, and the
   Class 1 NIC limb on a write-off. **Four of the five are things the competitor set states and this pack
   refuses to take from a competitor** (D17: a snippet is not a source, including when it arrives from a
   conductor).
6. **Peer-winnable is Google-derived**, so it orders the work and excludes nothing (owner decision 21). On a page
   with zero Bing rows that limitation bites harder than usual, because Bing is the channel that pays here.
7. **No live-production check was run against medicalaccounts.co.uk.** Rendering mode, structure and internal
   link targets are derived from the source file and the repo. All internal targets were confirmed to exist as
   markdown files; that they render at the expected URLs was not verified live. The one live-state fact relied
   on, that `/blog/private-practice-incorporation-complete-guide` returns 301, comes from the D3 ruling of
   2026-09-01, which was itself a live fetch.
8. **Repo HEAD moved between the batch index's writing and this pack's** (`7be12b11` to `d2e75655` to `ad4800eb`
   to `6714de48` to `038016726e21bdc3837dbb8a0a5789e3d0c09a5e`). The revert anchor in §1 was derived live from
   the file's own last-touching commit and verified byte-identical to the working tree. **Do not copy a sha from
   any batch document.**
