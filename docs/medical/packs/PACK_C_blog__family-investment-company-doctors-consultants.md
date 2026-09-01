# §9.5 RESEARCH PACK: /blog/family-investment-company-doctors-consultants

**Batch 3, wave C (incorporation and company structures), COMPANY-STRUCTURES SET. GRADE = REFRAME.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md`. Ground truth `docs/medical/house_positions.md`. Batch index
`docs/medical/packs/BATCH3_INDEX.md` (wave C section, D3 RULED 2026-09-01, ownership map O1 to O36).
Peer set `docs/medical/competitor_universe_2026-08-26.md` §2a plus the 17 domains reclassified in
BATCH3_INDEX D13. Format exemplar `PACK_B3_blog__how-gms-funding-works-global-sum-carr-hill-explained.md`.

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. No git
command other than read-only `rev-parse`, `log`, `diff --stat` and `merge-base`. **No paid API call: $0.00.**
DataForSEO was read from the persisted harvest only. GSC and Bing Webmaster calls are free. Six competitor URLs
were fetched live; every one is accounted for with its status code.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/family-investment-company-doctors-consultants` |
| Cluster | Wave C, incorporation and company structures. Sibling surfaces: `medical-practice-incorporation-step-by-step`, `incorporation-relief-private-medical-practice-s162`, `/calculators/private-practice-incorporation`, `/resources/incorporation-private`, `consultant-directors-loan-account-s455-medical-company`, `salary-vs-dividend-medical-limited-company-2026`, `surplus-cash-medical-limited-company-options`, `gp-corporation-tax`, `gp-bookkeeping-guide-uk`. |
| Source file | `Medical/web/content/blog/family-investment-company-doctors-consultants.md` |
| Rendering | **Markdown post whose body is raw HTML.** New blocks are written as raw HTML (`<h2>`, `<p>`, `<ul>`, `<table>`) to match. |
| Grade | **REFRAME.** Google 18 impressions, 0 clicks; Bing 0 clicks, 0 impressions. Both branches of §9.2 satisfied for REFRAME with no reliance on the §2.4 ruling. |
| Repo HEAD at write time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, 2026-09-01) |
| **Revert anchor (preferred)** | `7e596f02a5339982597949c5b7db9f41af3df4ea` (`git log -1 --format=%H -- <the file>`, "fix(medical): correct the false company-contract claim estate-wide", 2026-08-26). Verified an ancestor of HEAD, and `git diff --stat 7e596f02 -- <file>` is empty, so this sha's copy of the file is **byte-identical to the working tree**. It is a more precise anchor than HEAD and it post-dates the hero-image backfill, so a revert to it cannot strip `image` or `imageCredit`. |
| **Revert path** | `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/family-investment-company-doctors-consultants.md` |

### 1.1 Armed-window check, run live, no status predicate

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- run 2026-09-01 via scripts/_q.py (Supabase Management API, project dhlxwmvmkrfnmcgjbntk)
-- 19 rows
```

The 19 rows are exactly the set at BATCH3_INDEX §1, unchanged: `__home` (**flagged**, to 2026-10-06), and
eighteen rows to 2026-09-10 of which `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines` are
also **flagged**. **`family-investment-company-doctors-consultants` is NOT among them, and neither is any other
wave-C surface. This page is in no armed monitored window and is workable now.** A `status='active'` filter would
silently excuse three rows and must not be used.

**Frozen pages this page already links to.** `/blog/gp-limited-company-tax-benefits-drawbacks` is frozen to
2026-09-10. Per batch-1 coordinator ruling 5, a contextual link to a frozen page's live URL is fine; editing the
frozen file is not. The link is kept and the frozen file is not touched.

### 1.2 The permission call, and it is the most important line in this pack

**REFRAME permits a full overhaul. This pack asks the writer NOT to take all of it, and the reason is a number
that was not available when the wave was scoped.**

BATCH3_INDEX §5 calls wave C "the lowest-risk wave in the batch: there is almost nothing to lose". That was
derived from impression counts. It is right about the Bing side and **wrong about the Google side on this page**.
The fresh pull (§2.1) puts this URL at **Google average position 4.78**. That is a **better position than
`/blog/how-gms-funding-works-global-sum-carr-hill-explained`** (7.28), which BATCH3_INDEX §8 names as "the
strongest Google position in the untreated corpus" and protects with the tightest failure trigger in the batch.
The index's statement was true of the corpus it had measured; this page was not in that measurement.

**Ruling for this pack, and the writer follows it:**

1. **`metaTitle`, `h1`, `title`, `slug`, `canonical`, `category` and `date` are retained unchanged.** Not because
   the grade forbids changing them (it does not) but because the page holds a top-five Google position on 18
   impressions and the title is the only thing a search engine has been shown. **This is a choice, recorded with
   its reason, not a rule.** A conductor may overrule it; a writer may not.
2. **`metaDescription` is retained.** It is 150 characters, inside band, and it already carries the page's whole
   thesis ("A family investment company defers tax, it does not cut it").
3. **Body copy, H2/H3 structure, FAQ set and `keyTakeaways` are fully open**, which is where the work is (§6).
4. **The 50.5% thesis is KEEP.** It is the differentiator, it is in the metaDescription, and no competitor has it.

**Never propose a collapse, a redirect or a URL change** (K4). **No em-dashes** (I1): the live file contains
**zero** and must still contain zero.

---

## 2. Equity register (dual-engine, endpoint named per D2)

Every figure below was pulled fresh by this task on 2026-09-01. Nothing is quoted from a stored Supabase snapshot
and `gsc_query_data` was not read or summed.

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
| impressions | **18** |
| ctr | 0.0 |
| position | **4.777777777777778** |

**Page plus query dimension, this URL: ZERO rows.** All 18 impressions are anonymised by GSC. Per BATCH3_INDEX D5
that is a fact about GSC's disclosure threshold, not about demand, and **no writer may conclude anything about
Google intent on this page from the absence.**

**A correction to the task brief.** The brief describes this page as "the wave's highest-trace page at 16 Google
impressions". The fresh pull returns **18 impressions at position 4.78** over 2026-06-03 to 2026-09-01. The
direction and the rank order within wave C both reproduce; the level differs by two impressions because the
windows differ. **The number that matters is the one the brief did not carry: position 4.78.** See §1.2.

### 2.2 Bing, `GetPageStats` (page level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
  filtered to Query == "https://www.medicalaccounts.co.uk/blog/family-investment-company-doctors-consultants"
run 2026-09-01  ->  0 snapshots
```

**Zero. No weekly snapshot in the window contains this URL.** Per BATCH3_INDEX §9 limitation 2, `GetPageStats` is
a **top-N** endpoint, so this is "absent from the top N", **not** "proven zero impressions". It is recorded as a
question, not a finding (D5).

### 2.3 Bing, `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/family-investment-company-doctors-consultants")
run 2026-09-01  ->  0 rows
```

**Zero named Bing queries.** The call was made against the **full `https://www.` URL**, not a path, so this is a
true empty result and not the silent-failure false negative BATCH3_INDEX §0.2 warns about. (The same client and
the same argument shape returned 10 rows for `gp-bookkeeping-guide-uk` in this same session, which is the control
that proves the call works.)

### 2.4 What the register says

**The do-not-lose set on this page is EMPTY at query level and consists of exactly one thing at page level: a
Google average position of 4.78 on 18 impressions.** There is no named query to preserve, so §7.2 cannot be
written as a query-coverage gate and is written as a position gate instead. A REFRAME here risks almost nothing
that can be enumerated and one thing that cannot be replaced.

**The shape is the opposite of the wave-A anchor's.** That page ranks and does not convert. This page is not
being shown at all: 18 impressions in 90 days at position 4.78 means the queries it wins are near-zero volume.
**The diagnosis is demand, not answer shape**, and §5 and §7.1 are built to that.

---

## 3. The market's keyword set

### 3.1 The selection, printed so the counts are re-derivable

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`. **No new DataForSEO call
was made; $0.00 spent.** Live corpus count, run 2026-09-01 via `python scripts/_q.py`:

```sql
select date_pulled, count(*) rows, count(distinct ranked_keyword) kws, count(distinct competitor_domain) doms
from dataforseo_competitor_data where site_key='medical' group by 1;
-- 2026-08-26 | 39296 rows | 31539 keywords | 44 domains
```

**This confirms BATCH3_INDEX D12 against the live table: the harvest is 39,296 rows across 44 domains, not the
32,872 across 27 that the dossier and the batch-1 and batch-2 packs repeat.** Peer-winnable below uses the
**39-domain peer set** (the 22 of `competitor_universe_2026-08-26.md` §2a plus the 17 reclassified in D13's
resolution), and the peer array is printed in full in the scratch SQL. **Per D9 the family regex uses `\y`, never
`\b`.**

```sql
-- family tag
ranked_keyword ~* 'family investment|\yfic\y|investment company|alphabet share'
```

**Counts. Keywords returned: 11. Combined deduplicated volume: 3,640. Peer-winnable (a peer at position <= 20):
800 across 5 keywords. Contributing domains: 3.**

### 3.2 The full set, all 11 rows

`On page` = phrase appears verbatim in the live source file, case and punctuation normalised.

| Vol | Best pos | Peer best | Holder | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|---|
| 2,400 | 22 | 22 | pricebailey.co.uk | no | **yes** | `family investment company` |
| 260 | 17 | 17 | pricebailey.co.uk | **yes** | **no** | `family investment companies uk` |
| 210 | 19 | 19 | pricebailey.co.uk | **yes** | **yes** (FAQ 1) | `what is a family investment company` |
| 140 | 18 | 18 | pricebailey.co.uk | **yes** | **no** | `disadvantages of family investment company` |
| 140 | 38 | 38 | pricebailey.co.uk | no | **partly** (H2, as "vs a discretionary trust") | `family investment company vs trust` |
| 140 | 20 | 20 | pricebailey.co.uk | **yes** | **no** | `fic company` |
| 90 | 26 | 26 | pricebailey.co.uk | no | **no** | `family investment trust` |
| 90 | 21 | 21 | pricebailey.co.uk | no | **no** | `family investment trusts` |
| 70 | 60 | 60 | hawsons.co.uk | no | **no** | `setting up a family investment company` |
| 50 | 54 | 54 | medicsmoney.co.uk | no | **no** | `how to open investment company` |
| 50 | 16 | 16 | pricebailey.co.uk | **yes** | **no** | `what is a family investment company uk` |

### 3.3 Four readings the table does not make obvious

1. **One domain holds nine of eleven rows, and it is a generalist.** `pricebailey.co.uk` holds every keyword
   except two, all from a **single URL**, `https://www.pricebailey.co.uk/blog/family-investment-companies-fic/`.
   The whole topic on Google is one page. Its best position across the family is **16 to 22**, so nobody is
   winning it convincingly either.
2. **`disadvantages of family investment company` (140 volume, peer-winnable) is the highest-intent row in the
   set and our page is built for it and does not say the word.** The page's entire second half is disadvantages
   (settlements, minor children, BADR, BPR, running cost, the 50.5% trap) and the market's word for that is
   `disadvantages`. This is the cheapest gap in the pack.
3. **There is NO medical-specific FIC vocabulary anywhere in 39,296 rows.** No `family investment company
   doctors`, no `fic consultant`, no `investment company nhs`. The only medical-adjacent row in the family is
   `how to open investment company` (50 volume) held by medicsmoney at position 54. **The doctor-specific FIC
   query does not exist in the Google harvest**, which is either genuine absence of demand or the same
   Google-blindness BATCH3_INDEX §3.4 point 3 found on the GMS topic. Bing gives no second opinion here because
   the page has zero Bing rows (§2.3). **Stated as a limitation, not resolved** (§11).
4. **The adjacent IHT family is enormous and it is DECLINED.** A separate harvest query
   (`~* 'inheritance tax|\yiht\y|discretionary trust|business property relief|potentially exempt'`) returns rows
   at 9,900 volume (`inheritance tax calculator`, `iht calculator`, `calculating iht`, all pricebailey), 3,600
   (`discretionary trust`, `iht`), 1,000 (`potentially exempt transfers`, pricebailey **position 5**). Covering
   any of it means building a general IHT hub on a FIC page for an audience that is not medical, and Medical has
   no IHT owner to hand off to. **Declined at 4.5 theme 11 with this reason.** Recorded as a genuine opportunity
   for a future wave, not as a gap on this page.

---

## 4. Competitor teardown

All fetches made **2026-09-01**, `httpx` with a **full browser header set** (UA, Accept, Accept-Language,
Accept-Encoding, four `Sec-Fetch-*` headers, `Upgrade-Insecure-Requests`), following redirects. **Every URL
attempted is accounted for below with its status code. Only pages that returned HTTP 200 are torn down.**

### 4.1 hawsons.co.uk, Family Investment Company: Structuring Your Wealth for Future Generations
`https://www.hawsons.co.uk/family-investment-company-structuring-your-wealth-for-future-generations/` · **HTTP 200**
**Class: PEER** (universe §2a #15). Holds `setting up a family investment company` (70 volume, position 60).

| | |
|---|---|
| Title | `Family Investment Company \| FIC Guide \| Setting Up an FIC` |
| H1 | `Family Investment Company: Structuring Your Wealth for Future Generations` |
| Published | **6 November 2025**, "Author: Hawsons Corporate Finance", bylined to a named partner with a photograph, direct-dial phone number and LinkedIn |
| Word count | **895** (chrome stripped) |
| H2/H3 | `What is a Family Investment Company?`; `Setting Up a Family Investment Company`; `Why Choose an FIC?`; `How Hawsons Can Help with your FIC:` |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |

**Covers:** a six-step process (clarify goals, design the company, fund the company, set governance and control,
build the investment strategy, ongoing compliance), the funding options ("a loan to the company, a cash
injection, a transfer of existing assets, or family share transfers"), and a four-part benefits list (tax
efficiency, control and flexibility, asset protection, succession). Names "voting, non-voting, growth, or
**freezer** shares". Says "FICs are subject to corporation tax, which is often lower than higher-rate personal
income or capital gains tax" and "dividends received by the company may also be exempt from tax".

**What it gets wrong or omits, and this is the finding.** **It states not one number.** No corporation tax rate,
no dividend rate, no additional-rate threshold, no IHT rate, no seven-year rule, no £100 minor-child limit, no
statutory reference of any kind. It never mentions the **settlements legislation**, **BPR**, **BADR**, or the
**parental settlement rule**, which are the four things that decide whether a FIC works. Roughly a third of the
words are "How Hawsons Can Help". Its one genuinely useful term is **freezer shares**, which our page does not
carry.

**Consequence for us.** The best-resourced accountancy FIC page in the peer set is a 895-word sales page with
zero figures. **Our page already beats it on substance by a wide margin.** The job is not to out-explain
Hawsons; it is to be findable and to be unambiguously medical.

### 4.2 medicsmoney.co.uk, How to invest through a limited company
`https://medicsmoney.co.uk/how-to-invest-through-a-limited-company/` · **HTTP 200**
**Class: PEER, and the only medical domain anywhere in the FIC family.** Holds `how to open investment company`
(50 volume, position 54).

| | |
|---|---|
| Title / H1 | `How to invest through a limited company` |
| Published | **28 September 2021**, "By Tommy", bylined to **Dr Tommy Perkins BSc (Hons) MBChB MRCGP PGDipClinDerm**, a named GP partner |
| Word count | **3,367** including heavy review chrome; the article body is roughly 900 words |
| H2/H3 | `What could happen if you leave your profits in your bank account.`; `Investing through a limited company`; `Example`; `The two ways you can invest through your limited company:`; `Where to invest your funds`; `Work with a professional`; `About the author` |
| Tables | **No** · Calculator: **No** · FAQ block: **No** |

**Covers:** an inflation-erosion argument (£100,000 becomes "£80,232 of buying power", "Inflation rates sourced
11/06/2021"); a compounding example ("cash profit is £60k each year ... assuming an average 7% annual return and
19% corporate tax, after 10 years, that could potentially equal £892,000" against "£640,000" personally); and two
structures, a **holding company** receiving surplus as dividends, or a **separate company funded by a loan from
the trading company**.

**What it gets wrong, and there is a lot of it.** It states dividend tax as "**32.5%/38%**", which were 2021/22
rates and are now **35.75% / 39.35%** (house positions §5). It says "19% corporate tax" flat, with **no 25% main
rate and no marginal relief**, which have applied since 1 April 2023. It offers "**Entrepreneur's Relief**" at
"**10% capital gains tax**": that relief was renamed **Business Asset Disposal Relief in April 2020** and the
rate is **18% from 6 April 2026** (house positions §4). Three rate generations stale in one paragraph.

**And the thing that matters more than the staleness.** The page closes with "At Dental & Medical Financial
Services our passion is helping you ... Reach out to us today", followed by "**Dental and Medical Financial
Services is an appointed representative of Best Practice IFA Group Limited, which is authorised and regulated by
the Financial Conduct Authority.**" **The only medical competitor in this topic is an FCA-regulated firm giving
investment guidance under a financial-promotion disclaimer.** We are not, and that is the whole of §5.3.

### 4.3 hawsons.co.uk, Inheritance Tax Pension Changes: How to prepare for 6 April 2027
`https://www.hawsons.co.uk/inheritance-tax-pension-changes-how-to-prepare-for-6-april-2027/` · **HTTP 200**
**Class: PEER.** Not in the FIC keyword family; fetched because it holds the adjacent 6,600-volume row
`hmrc inheritance tax changes 2027` and because the fact it carries is directly load-bearing for a doctor.

| | |
|---|---|
| H1 | `Inheritance Tax Pension Changes: How to prepare for 6 April 2027?` · Published **29 September 2025** |
| Word count | **998** · Tables: **No** · Calculator: **No** · FAQ: **No** |
| H2/H3 | `Understanding the Current Rules`; `What's Changing from April 2027`; `How will these pension changes affect you?`; `Financial planning implications`; `How Hawsons Wealth Management Can Support You` |

**What it carries, verbatim:** "From 6 April 2027, the inheritance tax rules on pensions will change. **Unused
pension funds will start to be included in the value of your estate for IHT purposes.**" "The Government
estimates suggest that around **10,500 individuals will become liable for inheritance tax for the first time**,
and a further **38,500** are expected to face higher IHT bills." "any remaining pension funds left to other
beneficiaries could be pulled into your estate and **taxed at 40 percent**"; spouse and civil-partner transfers
stay exempt; and death at or over 75 adds income tax for the beneficiary on withdrawals, "a potential double tax
hit".

**Consequence for us, and it is the single best whitespace item in this pack.** **A doctor's largest asset after
the family home is an NHS pension, and from 6 April 2027 unused pension funds enter the estate for IHT.** That is
the most concrete reason a high-earning consultant would look at a FIC at all, it is dated, it is
government-announced, and **our page does not mention it once**. It is also not in `house_positions.md`, so it is
COVER-only-if-verified (§7.5) and a proposed new house-positions block (§10.4).

### 4.4 The fetches that did not return 200, recorded rather than dropped

| URL | Status | Note |
|---|---|---|
| `https://www.pricebailey.co.uk/blog/family-investment-companies-fic/` | **HTTP 403** | **THE page to beat: it holds 9 of the 11 keywords in §3.2, including the 2,400-volume head.** Returns a Cloudflare interstitial (`<title>Just a moment...</title>`, 5,843 bytes) to (a) `httpx` with the full header set above, (b) `curl.exe --compressed` with a Safari UA, and (c) the `WebFetch` tool. **Not torn down. Its content is unknown to this pack and no claim is made about it.** See D14 correction at §10.1. |
| `https://www.pricebailey.co.uk/glossary/s455-directors-loan-tax-charge/` | **HTTP 403** | Same wall, attempted for the sibling s455 pack. Recorded here because it is the same finding. |

**No fetch was silently dropped and nothing about pricebailey's content is asserted anywhere in this pack.**

### 4.5 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 12 themes, 12 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | `what is a family investment company` as the market's question (3.2, 210 vol, peer-winnable) | **COVER** | Present in FAQ 1 only. Needs to exist as a heading or opening sentence in the market's word order. |
| 2 | **`disadvantages of family investment company`** (3.2, 140 vol, peer-winnable) | **COVER** | The page already IS this; it just never uses the word. §3.3 point 2. |
| 3 | The six-step setup process (4.1) | **DECLINE** | Process-of-engagement content. It is a sales sequence, not a tax answer, and it is what makes 4.1 thin. |
| 4 | Funding routes: loan to the company, cash injection, asset transfer, family share transfer (4.1) | **COVER, briefly** | Genuinely absent from our page and genuinely relevant: funding a FIC by **director's loan** is the route that keeps the founder's capital extractable. **One paragraph, then hand off to the s455 page for the loan-account mechanics** (see §9, the reciprocal of that page's own boundary). |
| 5 | **Freezer and growth shares** (4.1) | **COVER, one sentence** | Real vocabulary we lack. Our page says "alphabet shares: A, B, C" and stops. Freezer shares are the mechanism by which future growth is directed, which is the IHT point the page already makes in prose. |
| 6 | Holding company vs separate company funded by intercompany loan (4.2) | **DECLINE** | It is a group-structure question, it is 2021 advice, and the "Entrepreneur's Relief on loan repayment" claim attached to it (4.2) is wrong. Declining it is also the safe side of §5.3. |
| 7 | The inflation-erosion / compounding argument (4.2) | **DECLINE, and the reason is regulatory** | This is an investment-return argument ("assuming an average 7% annual return"). See §5.3. **We do not project investment returns.** |
| 8 | "Where to invest your funds", diversification, platforms (4.2) | **DECLINE, hard** | §5.3. Straight investment advice. **Hard fail if it appears.** |
| 9 | **Unused pension funds enter the estate for IHT from 6 April 2027** (4.3) | **COVER if verified at source** | §4.3 and §7.5. The best whitespace item in the pack and the only one that makes the FIC question specifically medical. **A competitor blog is not a source.** |
| 10 | The 10,500 / 38,500 affected-taxpayer estimates (4.3) | **DECLINE the figures, COVER the point** | F6: no figure without a named primary source. If HMRC's or HMT's own policy paper is read and carries them, they may be quoted with attribution; otherwise state the change without a headcount. |
| 11 | The general IHT family: calculators, nil-rate band, discretionary trusts, PETs as a standalone topic (§3.3 point 4) | **DECLINE** | 9,900-volume rows, all pricebailey, all non-medical. Covering them builds an IHT hub on a FIC page. **This is wave C's clearest V3 trap and it is refused on the record.** |
| 12 | The specialist medical accountant's FIC page (4.1, 4.2) | **COVER, and it is the whole page** | See §5.1. |

---

## 5. Whitespace: what this page owns, and what it links out

### 5.1 What nobody in the peer set has

1. **No accountant in the peer set has a doctor-specific FIC page.** The topic's holder is a generalist
   (pricebailey, 9 of 11 keywords from one URL). The one other accountancy page found is 895 words with zero
   figures (4.1). The one medical page is an FCA-regulated firm's 2021 investment article (4.2). **A FIC page
   written for consultants and GP partners, in accounting and tax terms, does not exist anywhere in the peer set
   except ours.**
2. **Nobody states a single number.** Hawsons states none. Medics Money states 2021 numbers. Our page states the
   2026/27 corporation tax band structure, the 2026/27 dividend stack, the £125,140 additional-rate threshold, the
   £100 parental-settlement limit and BADR at 18%, and **quantifies the 50.5% combined rate that makes the whole
   structure fail for a founder who extracts**. **KEEP and protect.**
3. **Nobody names the settlements legislation.** ITTOIA 2005 s.619, s.624 and s.629 appear on our page and on
   neither competitor. s.629's £100 limit is the fact that kills the most commonly sold version of the story
   (income splitting to children) and no competitor mentions children at all.
4. **Nobody prices the failure case.** Every competitor page is an argument for a FIC. Ours contains a four-route
   table in which one route is **worse than doing nothing**. That is the page's voice and its trust asset.
5. **Nobody connects a FIC to the NHS pension, and after 6 April 2027 that is the connection that matters.**
   Unused pension funds enter the estate (4.3). A doctor's pension is their largest asset. **This is the sentence
   the page is missing and the reason the page should exist at all.**
6. **Nobody says the word `disadvantages`** (§3.3 point 2).

### 5.2 What this page OWNS versus what it LINKS OUT

Stated as a fence, because wave C's four company-structure surfaces are one paragraph away from being the same
page.

**This page OWNS:**
- What a FIC is, what it is not, and the fit test for a doctor.
- The share-class architecture (alphabet shares, voting/non-voting, freezer and growth shares) **as it bears on
  who receives income and who holds control**.
- The **settlements legislation** as it applies to a family company (ITTOIA 2005 s.619, s.624) and the
  **parental settlement rule** (s.629, the £100 limit).
- **Why an investment company gets neither BPR nor BADR**, and what that costs.
- The **FIC versus discretionary trust versus personal investing** comparison.
- **PROPOSED, see §10.2:** the IHT of a private wealth structure for a doctor (PETs, the seven-year rule, gift
  with reservation), because no O-row currently owns it and this page is already carrying it unowned.

**This page LINKS OUT and does not explain:**

| Fact | Owner | Allowance on this page |
|---|---|---|
| Salary versus dividend extraction, and the dividend rate stack | **O34**, `/blog/salary-vs-dividend-medical-limited-company-2026` | **One sentence, then link.** See §6.3 point 1 and §9.2. |
| The 60% band, adjusted net income, the £100,000 to £125,140 personal-allowance taper | **O3**, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **One sentence, then link. Do not restate the 60% band or the taper mechanics.** |
| Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | **O2**, `/calculators/nhs-pension-annual-allowance` | **One sentence, then link.** |
| Incorporation of a medical practice, s.162 relief, the step sequence | **O33**, `/blog/medical-practice-incorporation-step-by-step` (named by the D3 ruling) | One sentence, then link. |
| The director's-loan mechanics of funding a FIC by loan | wave C sibling, `/blog/consultant-directors-loan-account-s455-medical-company` | One sentence, then link. |
| The employment-status fork for doctors | **O35**, `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | One sentence, then link to the live URL. Do not rebuild the four-role table. |
| Surplus cash inside a trading medical company | wave C sibling, `/blog/surplus-cash-medical-limited-company-options` | One sentence, then link. **This is the nearest sibling and the one most likely to be annexed.** |

### 5.3 THE REGULATED-ADVICE BOUNDARY, and it is a hard fail

**Ashfield Trading Ltd is not authorised or regulated by the Financial Conduct Authority, and the owner is not a
qualified accountant.** The standing estate rule is that off-site and on-site authority is **faceless** and never
expert-dependent. A FIC page sits closer to that line than anything else in wave C, because the vehicle's whole
purpose is holding investments.

**Evidence that the line is real and not theoretical:** the only medical competitor in this topic (4.2) gives
this exact guidance **as an appointed representative of an FCA-authorised firm, under a published financial
promotion disclaimer**. They may write "where to invest your funds" and project a 7% return. We may not.

**The page stays accounting and tax shaped. Concretely:**

| Permitted | Forbidden, hard fail |
|---|---|
| The tax treatment of income and gains arising inside a company | Any recommendation, or implied recommendation, to invest |
| Naming asset classes only to explain a differing tax treatment ("UK dividends are broadly exempt from CT; interest and rents are not") | Naming a fund, platform, product, provider or portfolio, or discussing diversification, asset allocation or risk |
| The corporation tax, dividend tax, CGT and IHT consequences of a structure | Any projected or assumed investment return, growth rate or inflation rate (4.2's "7% annual return" and "£100,000 becomes £80,232") |
| "This is general information, not personal advice" | "Suitable for", "you should", "we recommend" attached to an investment decision |
| Saying that the structure needs a solicitor's drafting and specialist tax input | Anything that reads as a personal recommendation on a financial product |

**Also I2, and it binds harder here than elsewhere:** no named individual, no credential, no byline, no "reviewed
by", no photograph, no direct-dial. **Both competitor pages do all of that and we do not.** The `author` field
stays `Medical Accountants UK Editorial Team`.

### 5.4 KEEP, explicitly

K1 is a hard fail: the drafted version's count of statutory references, technical terms and figures must be
**greater than or equal to** the live page's.

- **The 50.5% combined-rate finding and its four-route table.** The page's thesis, its metaDescription, and the
  one thing no competitor has. **KEEP, and keep the arithmetic recomputable (§7.4).**
- **ITTOIA 2005 s.619, s.624 and s.629, and the £100 parental-settlement limit.** **KEEP.**
- **The "FIC planning for children under 18 is not [efficient], and founders should not be sold the
  income-splitting story on the basis of minor beneficiaries" position.** House voice. **KEEP.**
- **CTA 2009 Part 9A dividend exemption**, and the consequence that a UK-equity FIC broadly pays no CT on
  dividends while interest, rent and most overseas dividends are taxed at the full rate. **KEEP.**
- **The BADR-is-structurally-unavailable point**, and the instruction that it "should be quantified, not glossed
  over". **KEEP**, and see §6.3 point 4 for what to add to it.
- **The gift-with-reservation warning tied to the founder drawing a salary or occupying company property.**
  **KEEP.**
- **The time-horizon argument** (a FIC at 45 versus a FIC at 58). Genuinely expert and entirely absent from the
  peer set. **KEEP.**
- **The NHS-pension separation**: a FIC does nothing for accrual, dividends are never pensionable, model the two
  as separate decisions. Aligned with house positions §2.C. **KEEP.**
- **The corrected NHS-contract wording** ("a company limited by shares whose shareholders all qualify") in the
  body and in FAQ 4. This is the §2.C correction of 2026-08-26 already landed on this file by commit
  `7e596f02`. **KEEP EXACTLY. Never regress it to "a limited company cannot hold a GMS or PMS contract".**

---

## 6. Our current page, read honestly

Source file read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **4,982** · body copy only **3,527** |
| `metaTitle` | `Is a Family Investment Company Worth It for Doctors?` (52 chars) |
| `h1` / `title` | identical, `Family Investment Companies for Doctors and Consultants: What They Are and When They Fit` (88 chars) |
| Date / generator | 2026-07-06, `opus-4.8/netnew-wave` |
| H2 / H3 | **10 / 4** · Tables **2** · Internal links **4** · FAQs **10** · keyTakeaways **5** |
| Worked example | **Yes**, the four-route table |
| Em-dashes | **0** (I1 clean) |
| C4 first-person plural | 6 in 3,527 words = **1.7 / 1,000** (cap 3). **Inside band.** |
| C3 second person | 4 in 3,527 words = **1.1 / 1,000** (band 12 to 25). **Far below band, and it is the biggest structural defect on the page.** |

### 6.1 Blunt read

**This is a strong page with a real thesis, and it is written about a doctor rather than to one.** Four instances
of "you" in 3,527 words is a treatise. The competitor pages are worse in every technical respect and better at
addressing a reader. That, plus 18 impressions, is the diagnosis: the page is not thin, not stale in its core
figures, and not findable.

**What is good, specifically.** Every load-bearing tax figure traces to `house_positions.md` §5, §4, §2.B and
§2.C and is current: CT 19% / 25% with marginal relief at 3/200 and ~26.5% effective; dividends 10.75% / 35.75% /
39.35% with the £500 allowance, tagged 2026/27 and correctly described as risen rather than rising; £125,140;
BADR 18% from 6 April 2026 on the first £1m; the annual-allowance taper figures. The NHS-contract sentence
carries the post-`7e596f02` corrected wording. It refuses the fabrication trap and it prices its own failure case.

### 6.2 What is wrong or stale, checked against house positions and the CURRENT rules including V2

Ordered by severity.

1. **`BPR at 100%` is asserted twice and is stale from 6 April 2026.** The page says BPR "requires a qualifying
   interest in a trading business (a 100% BPR exemption)" and "BPR at 100% requires a qualifying trading business
   interest". The estate ground truth (`br_apr_1m_cap_2026_ground_truth`) records that from April 2026 business
   and agricultural property relief share a **combined allowance with 50% relief above it**, and that AIM shares
   move from 100% to 50%. **The page's conclusion is unaffected** (a FIC gets no BPR at all, which is right), but
   **the characterisation of BPR as a flat 100% relief is a stale framing that F2 forbids**, and it is stated as
   present fact. **`house_positions.md` has no BPR block at all**, which is why nobody caught it. **This is the
   one factual defect on the page that must be fixed, and it needs ground truth first (§10.3).**
2. **`the 15% flat rate of SDLT` on a company buying higher-value residential property is stale.** The
   corporate-purchase flat rate for residential property over £500,000 **rose from 15% to 17% on 31 October
   2024**. `house_positions.md` carries no SDLT block. **VERIFY AT SOURCE before the sentence is rewritten
   (§7.5); if it cannot be verified, cut the rate and keep the point.**
3. **O34 is breached by an H3 and a table.** The H3 `The 2026/27 rate stack on extraction` and the paragraph
   under it state the full dividend rate stack, the £500 allowance, the FA 2026 s.4 hook, the prior-year rates
   and the "28.6 percentage points" differential. **That is `/blog/salary-vs-dividend-medical-limited-company-2026`'s
   fact under O34, which allows this page one sentence and a link.** The page also carries **no link to that page
   at all**. See §9.2 for the ruling this pack proposes and §7.3 for the countable gate.
4. **O3 is breached in one clause.** "above that level, income tax is 45% and **the personal allowance is
   entirely tapered away**" is the §100,000-to-£125,140 taper, which O3 gives to
   `/blog/adjusted-net-income-doctors-60-percent-tax-trap`. There is no link to it. **One sentence and a link;
   do not restate the 60% band.**
5. **O2 is breached twice.** The taper mechanics (threshold income £200,000, adjusted income £260,000, £60,000
   reducing to a £10,000 floor) are stated in full in the body and again in FAQ 2. O2 allows one sentence and a
   link to `/calculators/nhs-pension-annual-allowance`, and there is no link.
6. **An outbound commercial link sits in the second paragraph of the page.** The SDLT/ATED sentence ends with
   "property-focused firms such as [Property Tax Partners] deal with exactly these questions", `rel="nofollow"`.
   It is unexplained, it is the only outbound commercial link in the wave, it sits above the fold, and it sends a
   reader who has just arrived to another firm. **Not a house-positions contradiction. Recorded as an editorial
   item for the manager (§10.5); the writer must not silently remove it.**
7. **`disadvantages` appears zero times** (§3.3 point 2).
8. **C3 far below band** (1.1 per 1,000 against 12 to 25). Second person is the cheapest fix in the pack and it
   is unconstrained by any grade, because this is a REFRAME.
9. **No mention of the 6 April 2027 pension-IHT change** (§4.3).
10. **`freezer shares` and the funding routes are absent** (4.5 themes 4 and 5).
11. **V5 and V9 checks on the existing copy.** `it is not X, it is Y`: **one** instance ("It is worth stating
    plainly what a FIC is not"), at the wave-wide cap of one per page, so **the new draft's budget for it is
    zero**. Numeral-count paragraph openers: **two** ("Two income levels make a FIC relevant"; "this is critical
    for two reasons"), which is **at the batch cap and above the wave-wide cap of one**. **The rewrite must cut
    at least one and should cut both** (§7.7). V2: clean, no search-string narration, no process narration.
12. **A1 and A5.** The opening runs 197 words to the first H2 and the direct answer arrives at roughly word 45.
    Inside A5's 40-to-90 band for the answer, **over** on the length of the intro. A REFRAME may fix it.

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgement.

### 7.1 The named phrase list

**11 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case and
punctuation normalised. **V1 is binding: two word orders per idea per page, hard cap, counted as non-overlapping
longest matches, never raw substrings. Any V1 finding must quote the spans it counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `disadvantages of a family investment company` | Disadvantages | 1 of 2 | Harvest 140 vol, pricebailey position 18, **peer-winnable**. §3.3 point 2. |
| 2 | `disadvantages` used at least once outside phrase 1 | Disadvantages | 2 of 2 | Zero occurrences today on a page that is half disadvantages. |
| 3 | `family investment companies` (plural, as a standalone noun phrase) | FIC identity | 1 of 2 | Harvest `family investment companies uk` 260 vol pos 17, peer-winnable. Singular appears; plural does not. |
| 4 | `FIC company` | FIC identity | 2 of 2 | Harvest 140 vol, position 20, peer-winnable. The market's clumsy phrasing and we do not carry it. |
| 5 | `freezer shares` | Share architecture | 1 of 2 | 4.1. Real vocabulary, absent from our page. |
| 6 | `growth shares` | Share architecture | 2 of 2 | 4.1. Same. |
| 7 | `unused pension funds` (in the 6 April 2027 IHT context) | The 2027 pension-IHT change | 1 of 2 | 4.3. **Conditional on §7.5 verification.** |
| 8 | `6 April 2027` | The 2027 pension-IHT change | 2 of 2 | 4.3. **Conditional on §7.5 verification.** |
| 9 | `director's loan` (as a FIC funding route, with the link out) | Funding the company | 1 of 2 | 4.5 theme 4. Also discharges the sibling handoff at §5.2. |
| 10 | `seven-year rule` (in the market's word order) | PETs | 1 of 1 | The page says "survives seven years" and "seven-year rule" only in a key takeaway; it needs it in body prose too. |
| 11 | `is a family investment company worth it` (or the same question in body prose) | Worth-it intent | 1 of 1 | It is our own `metaTitle` and it appears **nowhere in the body**. A page whose title asks a question and whose body never asks it is the shape B2 and B3 exist to catch. |

**Countable test: 11 of 11 present. If §7.5 fails to verify the 6 April 2027 change at a primary source, phrases
7 and 8 are DROPPED, not guessed, and the test becomes 9 of 9.** Any other absent phrase is a named BLOCK.

**Explicitly NOT on this list, with the reason on the record:**
- **The general IHT family** (`inheritance tax calculator`, `iht calculator`, `discretionary trust`,
  `potentially exempt transfers`, roughly 30,000 combined volume). **DECLINED** at 4.5 theme 11.
- **`family investment company vs trust`** (140 vol, position 38, **not** peer-winnable). Already covered by an
  existing H2 and an eight-row table. Listing it would be a false positive.
- **`setting up a family investment company`** (70 vol, position 60). The setup-process theme is declined at 4.5
  theme 3.

### 7.2 Equity preservation (§9.9 floor 5)

**There is no named-query equity set on this page. Zero Bing named queries (§2.3), zero Google query rows
(§2.1).** Floor 5 therefore cannot be scored as query coverage and is replaced, for this page only, by:

**Countable test A: `metaTitle`, `h1`, `title`, `slug` and `canonical` are byte-identical pre and post.** Not
because the grade requires it but because §1.2 rules it. **`git diff` must show zero changes on those five
frontmatter lines.**

**Countable test B: the Google page-dimension position must hold.** See §8.4 trigger 1.

### 7.3 Ownership gates, countable

| Gate | Test | Pass condition |
|---|---|---|
| **O34** | Count sentences on the page that state or explain a dividend rate, the dividend allowance, or the salary-versus-dividend choice as a general mechanism | **<= 1**, and that sentence carries a link to `/blog/salary-vs-dividend-medical-limited-company-2026`. **The four-route comparison table is exempt: see §9.2.** |
| **O34, link** | `href="/blog/salary-vs-dividend-medical-limited-company-2026"` | **>= 1 occurrence.** Today: 0. |
| **O3** | Count sentences explaining the personal-allowance taper, adjusted net income or the 60% band | **<= 1**, carrying a link to `/blog/adjusted-net-income-doctors-60-percent-tax-trap`. **The string `60%` must not appear in a tax-band context.** |
| **O2** | Count sentences stating annual-allowance mechanics (taper, threshold income, adjusted income, carry forward, MPAA, pension input amount) | **<= 1** in the body **and <= 1** across the whole FAQ set, each carrying a link to `/calculators/nhs-pension-annual-allowance`. |
| **O33** | Count sentences explaining s.162 relief, the incorporation step sequence, or the pension-accrual loss as an incorporation topic | **<= 1**, linking to `/blog/medical-practice-incorporation-step-by-step`. |
| **O35** | Count occurrences of a four-role employment-status table or list | **0.** One sentence and a link to `/blog/gp-partner-vs-salaried-gp-tax-comparison` is the whole allowance. |
| **O4** | Count Scheme Pays deadlines stated | **0.** `nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date. **This is the exact fact that broke batch 1.** |
| **O9** | Count GMC retention fee figures stated | **0.** UNVERIFIED, hard fail F5. |
| **O10 / O25** | Count QOF point values and Global Sum figures stated | **0.** Not relevant to this page; listed for completeness of the ban. |
| **D3** | Count links to `/blog/private-practice-incorporation-complete-guide` | **0.** That URL **301s** to `medical-practice-incorporation-step-by-step` (D3 RULED 2026-09-01). Link the target directly, never the redirect. |

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

**Every figure in the four-route table must be re-derived from stated inputs by `arithmetic_recomputed[]`.** The
live table's arithmetic was checked by this task and reconciles: £50,000 x 45% = £22,500 net £27,500;
£50,000 x 19% = £9,500 net £40,500; £40,000 chargeable after the £500 allowance from £40,500, x 10.75% = £4,300
(£4,300.00 exactly) net £36,200; x 39.35% = £15,740 (£15,740.00 exactly) net £24,760; total tax
£9,500 + £15,740 = £25,240 on £50,000 = **50.48%, which is the "around 50.5%" the page states.** **KEEP the
example and re-derive it; do not re-invent it.**

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| CT **19%** to £50,000, **25%** over £250,000, marginal relief **3/200**, effective **~26.5%** in the band | 2026/27 | `house_positions.md` §5 (verified 2026-08-26 at gov.uk) |
| Dividend **10.75% / 35.75% / 39.35%**, allowance **£500** | **2026/27, and write the rise as already happened** | §5, FA 2026 s.4 |
| Prior-year dividend **8.75% / 33.75%** | **labelled historic, per F2** | §5 |
| Personal allowance £12,570, basic 20% to £50,270, higher 40% to £125,140, additional **45%** above | 2026/27 | §5 |
| Annual allowance **£60,000**; taper where threshold income > **£200,000** and adjusted income > **£260,000**; floor **£10,000** | **2026/27** (not 2025/26) | §2.B. **One sentence only, O2.** |
| **BADR 18%**, **£1m** lifetime limit, 2-year conditions | **from 6 April 2026, in force today** | §4 |
| **The main CGT rate BADR saves against: 24% for a higher-rate taxpayer from 6 April 2026**, so BADR is worth **up to 6 percentage points** | 2026/27 | §4. **ADD THIS. The page tells the reader to quantify the BADR loss and then does not, and house positions added this figure on 2026-08-26 precisely because a page needed it.** |
| Employer NIC **15%** above the **£5,000** secondary threshold; Employment Allowance **£10,500** but not for a single-director company | 2026/27 | §5. Relevant only if a spouse salary is discussed. |
| CTA 2009 Part 9A dividend exemption; ITTOIA 2005 s.619 / s.624 / s.629; **£100** parental-settlement limit | | Statute, on the page today |

**BANNED FIGURES. None of these may be asserted:**

| Banned | Why |
|---|---|
| **`BPR at 100%` as a present-tense flat relief** | §6.2 point 1. Stale from 6 April 2026. Until §10.3's ground truth exists, write **"a FIC is an investment company and gets no business property relief at all"** and say nothing about the rate BPR gives a trading business. |
| **`15%` SDLT on a corporate residential purchase** | §6.2 point 2. Verify at source or cut the rate. |
| **Any dividend rate stated as a general extraction mechanism** | O34. Permitted only inside the four-route table (§9.2). |
| **Any projected investment return, growth rate or inflation rate** | §5.3. Hard fail. |
| **Any named fund, platform, provider or portfolio** | §5.3. Hard fail. |
| **Any GMC retention fee** | O9, F5. |
| **Any QOF point value or Global Sum figure** | O10, O25. |
| **Any Scheme Pays deadline** | O4. |
| **`Entrepreneur's Relief`** | Renamed BADR in April 2020. Competitor-sourced (4.2). Never write it. |
| **The 10,500 / 38,500 affected-taxpayer estimates** | 4.5 theme 10. F6, third-hand. |
| **Any fabricated statistic, "most doctors", "we find that around X%"** | F6, I6. |
| **Any statement or implication that a doctor's ordinary personal service company, or a FIC, can hold a GMS or PMS contract** | §2.C. And never regress to the flat "a limited company cannot hold a GMS or PMS contract" either. |

**Countable test: count of banned-figure assertions = 0.**

**If the worked example is retained (it should be), it must satisfy G3's five components in order, G4 (role plus
an initial only, explicitly illustrative, never a real person), G6 (the heading must NOT be "Worked example" and
the block must not open with a `Worked example:` prefix, hard fail) and G5 (the amounts are illustrative; every
RATE traces to house positions with its year tag).** G7's 80-to-200-word band collides with C2's 75-word
paragraph maximum where the example spans paragraphs; per BATCH3_INDEX pack-defect 5, QA must not read the split
as a missing component.

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify, and it must be fetched |
|---|---|
| CT rates, marginal relief, dividend rates and allowance, income tax bands, employer NIC | `house_positions.md` §5 (already verified at gov.uk 2026-08-26; no re-fetch needed) |
| BADR 18% from 6 April 2026, £1m limit, **and the 24% main CGT rate it saves against** | `house_positions.md` §4 |
| Annual allowance and taper figures | `house_positions.md` §2.B |
| Dividend exemption | CTA 2009 Part 9A, https://www.legislation.gov.uk/ukpga/2009/4 |
| Settlements: settlor-interested income, s.624; parental settlement and the £100 limit, s.629 | https://www.legislation.gov.uk/ukpga/2005/5/section/624 and /section/629 |
| **BPR: whether a flat 100% is still correct, and what the April 2026 cap and 50% rate actually are** | **MUST be read at legislation.gov.uk (IHTA 1984 Part V Ch I) and at gov.uk before ANY BPR rate is written.** Estate memory `br_apr_1m_cap_2026_ground_truth` is the pointer, not the source. **If it cannot be verified, state no BPR rate at all.** |
| **SDLT: the flat rate for a company buying residential property over £500,000, and the ATED charge** | **MUST be read at https://www.gov.uk/stamp-duty-land-tax/residential-property-rates and the ATED guidance before the sentence is rewritten. If unverified, cut the rate and keep the point.** |
| **Unused pension funds entering the estate for IHT from 6 April 2027** | **MUST be read at gov.uk / HMRC policy paper or the Finance Act provision. 4.3 is a competitor blog and a competitor blog is not a source (D17).** If unverified, phrases 7 and 8 are dropped. |
| A company limited by shares may hold a GMS contract only on the s.86(3) shareholder conditions; PMS sits under s.92/s.94 and no shareholder test may be asserted for it | `house_positions.md` §2.C correction of 2026-08-26 |
| Dividends and company income are never NHS-pensionable; Type 1 Annual Certificate for a GP partner; only the NHS post is pensionable for a consultant | `house_positions.md` §2.C |

**Countable test: every external factual claim maps to a row above with a fetch date. Count of unverified claims
= 0.**

### 7.6 Floors

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug family-investment-company-doctors-consultants` | Gate bar met; **0 covered queries lost** (baseline is 0, so this is trivially satisfied and the gate that matters is 7.2 test B) |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure in the four-route table re-derived from stated inputs (§7.4) |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified; the three MUST rows are blocking |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; every new link resolves via `slug_resolver.py`. **All internal targets named in this pack were confirmed to exist as markdown files on 2026-09-01.** |
| 5. Equity preservation | §7.2 | Tests A and B |
| 6. Cluster coverage | §7.1 | **11 of 11** (or 9 of 9) |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed by this page.** The FIC family is not a dossier §4 row. Ledger unchanged. |
| 8. Competitor re-read | §4.5 | **12 themes, 12 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere including frontmatter. Live count **0**, must stay 0. I1, hard fail.
2. **`metaTitle`, `h1`, `title`, `slug`, `canonical` byte-identical** (§1.2, §7.2 test A).
3. **The regulated-advice boundary at §5.3 is a hard fail on every forbidden row.**
4. **No named individual, credential, byline, photograph or "reviewed by".** I2. `author` stays
   `Medical Accountants UK Editorial Team`.
5. **`it is not X, it is Y`: budget ZERO** in the new draft. The live page already spends the wave-wide cap of
   one and a REFRAME rewrites the sentence that spends it.
6. **Numeral-count paragraph openers: budget ZERO**, and the two live instances (§6.2 point 11) must both go.
   BATCH3_INDEX §6.3 records this reflex reproducing across three batches; wave C is the fourth showing.
7. **C3: the redraft must reach 12 per 1,000 second person minimum.** Today 1.1. This is countable and it is the
   single largest editorial change in the pack.
8. **C4: keep first-person plural at or below 3 per 1,000.** Today 1.7. Do not let the "How we help" section grow.
9. **No "How we help" H2 in the batch-2 shape.** BATCH3_INDEX records seven of nine wave-A/B pages ending with a
   near-identical block and all being removed in round 3. This page has one. **The rewrite does not reproduce it.**
10. **Never propose a collapse, redirect or URL change.** K4.
11. **One change per page per window** (§9.3). This REFRAME is the only change to this URL until the read.
12. **Do not edit any frozen page.** Contextual links to frozen live URLs are fine.

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC `searchanalytics.query`, dimension `page` | 2026-06-03 to 2026-09-01 (90d) | **0 clicks, 18 impressions, average position 4.78** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows.** All 18 impressions anonymised. |
| Bing | `GetPageStats`, **page level** | 13 weekly snapshots, 2026-05-29 to 2026-08-21 | **0 snapshots** (top-N absence, not proven zero) |
| Bing | `GetPageQueryStats`, **named-query level** | as returned | **0 rows** |

Pro-rated to 28 days from the 90-day Google frame: **5.6 impressions, 0 clicks.**

### 8.2 The read at 28 days, Bing (primary channel)

Bing out-clicks Google 3.3x estate-wide on this site (STATE, 2026-09-01: 360 clicks vs 108). **This page has
never appeared on Bing at all**, so the Bing test is a first-appearance test and nothing more:

1. **First Bing impression.** `GetPageStats` returns **at least one weekly snapshot** containing this URL in the
   28 days after deploy. Today: zero of thirteen.
2. **First named Bing query.** `GetPageQueryStats` returns **at least one row**. Today: zero.

**Both are low-confidence and a miss on either carries little information**, because a page absent from a top-N
endpoint cannot be distinguished from a page with one impression. They are stated so the read has a number.

### 8.3 The read at 28 to 90 days, Google

3. **Position holds.** Average position on the `page` dimension stays **at or better than 8.0** against a
   baseline of 4.78. A slip inside that band is noise on 18 impressions.
4. **Impressions.** At or above **18** at day 90. **No growth target is set.** BATCH3_INDEX §8 and STATE's Stage 0
   diagnosis both say the binding constraint is indexation, not content: 18 of 139 URLs are indexed and 51 have
   never been fetched. **Growth here is not in this page's gift and no position promise is made.**
5. **Query rows.** At least **1** query-level Google row by day 90, against a baseline of 0. Stated with low
   confidence: whether a query becomes visible is GSC's threshold decision, not ours.

### 8.4 Failure triggers, written as numbers, before the change

> **TRIGGER 1, Google, and it is the binding constraint on this page.** If the GSC `page`-dimension average
> position for `/blog/family-investment-company-doctors-consultants` falls **below 12.0** in any 28-day window
> between deploy and deploy+90 days, revert:
> `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/family-investment-company-doctors-consultants.md`
> **This page holds a better Google position than the page BATCH3_INDEX §8 protects as the corpus's strongest**
> (§1.2), and it is the only measurable thing a REFRAME here can lose.

> **TRIGGER 2, impressions.** If Google page-dimension impressions fall **below 9** (half the baseline) in any
> 28-day-equivalent window between deploy and deploy+90 days, hold the page and investigate before any further
> change. Not an automatic revert: on 18 impressions the noise floor is wide.

> **TRIGGER 3, quality.** If either QA track raises a **§5.3 regulated-advice finding**, the page is held and not
> deployed, whatever else passes. That boundary is not tradeable against a coverage gain.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **11 phrases of §7.1**,
not with the zero queries the page currently ranks for. **`monitored_pages` registration is a separate
owner-triggered step and has not been done by this task. No monitor, alert, cron, email or scheduled job was
created.**

---

## 9. Ownership-map compliance

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a conductor's brief and the map disagree, THE MAP WINS.** The writer follows the map,
states neither fact, and reports the conflict.

### 9.1 The rows this page must obey, reproduced from BATCH3_INDEX §6

| # | Shared fact | Owner | **What THIS page does** |
|---|---|---|---|
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **One sentence, then link.** The task brief states this explicitly: "s455/FIC pages take one sentence then link for extraction". **THE LIVE PAGE IS IN BREACH**, §6.2 point 3. See §9.2. |
| **O3** | Adjusted net income, the £100,000 to £125,140 taper, the **60% band**, HICBC | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **One sentence, then link. Do not restate the 60% band.** Live page in breach in one clause, §6.2 point 4. |
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed not automatic from 6 April 2026 per FA 2026 s.39), the step sequence, and the pension-accrual loss paired with every tax saving | `/blog/medical-practice-incorporation-step-by-step` (**named 2026-09-01 by the D3 ruling**, because the complete-guide URL 301s to it) | One sentence, then link. **Live page compliant**: it says a FIC is not a trading company and that the incorporation question is different, and stops. Keep that. |
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | One sentence, then link. Live page in breach twice, §6.2 point 5. |
| **O35** | The employment-status fork for doctors | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | One sentence, then link to the live URL. **No batch-3 page rebuilds the four-role table.** Live page compliant. |
| **O4** | Scheme Pays | `/calculators/nhs-pension-scheme-pays`; and `/blog/nhs-pension-scheme-pays-doctors-deadlines` **is not this batch's at any date** | **No Scheme Pays deadline anywhere on this page.** Live page compliant. |
| **O9** | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No GMC fee figure. Hard fail F5.** Not relevant here; listed for completeness. |
| **O10 / O25** | Global Sum per weighted patient (**£130.07, VERIFIED**), QOF point value (**£227.95, VERIFIED**, ban lifted by the O10 RULING of 2026-08-26; the ownership fence is unaffected) | `house_positions.md` §3.A / §3.B; QOF owned by `/blog/qof-income-gp-practice-accounting-explained` | **Neither figure appears on this page.** Compliant, and it costs this page nothing. |
| **O1** | NHS tiered member contribution rates and bands | `/calculators/nhs-superannuation-tiered-contribution` | No tier table. Compliant. |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. Compliant. |
| **O17 / O21-VAT** | VAT exemption vs standard rating; the £90,000 threshold | `/blog/gp-vat-registration` (**FROZEN**) | Not relevant. If the redraft mentions VAT at all, one sentence and a link. Cited as `O21-VAT`, never as `O21` (BATCH3_INDEX §6.1a collision 2). |

### 9.2 THE ONE BOUNDARY QUESTION THIS PACK RAISES, and it is not resolved unilaterally

**O34 gives salary-versus-dividend extraction to the salary-vs-dividend page and gives this page one sentence.
This page's central finding is an extraction comparison. The two cannot both be taken literally.**

The finding is: **£50,000 of investment income extracted from a FIC to an additional-rate founder bears about
50.5% combined, which is worse than 45% paid personally.** It is in the metaDescription, it is the reason the
page exists, and no competitor has it.

**The pack's reading, offered to the conductor and NOT applied as a map change:**

- **O34 owns the mechanism**: what the dividend rates are, how the allowance works, how salary and dividend
  compare as ways to pay a working director. **This page states none of that and links.**
- **This page owns the FIC-specific outcome**: the four-route comparison of holding £50,000 personally, retaining
  it in a FIC, redirecting it to a basic-rate family member, or passing it back to the founder. That comparison
  is about **whether the vehicle earns its keep**, which is this page's subject and no other page's.
- **The operative line: the four-route table stays. The H3 `The 2026/27 rate stack on extraction` and the
  paragraph explaining the rates go, replaced by one sentence and a link.** §7.3 makes this countable.

**Per §9.4 below this is reported, not enacted.** If the conductor rules the other way, the writer removes the
table too and the page loses its thesis, which the conductor should know is the cost.

### 9.3 The gap: nobody owns IHT

O1 to O36 contain **no row for inheritance tax**. This page carries PETs, the seven-year rule, gift with
reservation and the BPR question today, unowned, exactly as O36's dilapidations fact was carried unowned until
D18 ruled it. **A proposed new row is at §10.2 and it uses a PREFIXED id, not `O37`**, per BATCH3_INDEX §6.1a's
own lesson that a single global integer sequence collides across parallel sessions.

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. This pack proposes **one** boundary clarification
(§9.2), **one** new row (§10.2), **one** ground-truth gap (§10.3) and **one** editorial escalation (§10.5).
None is enacted.

### 9.5 Batch-level style watch (V5 and V9), conductor's job not this writer's

1. Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   wave, is named in the wave's fix pass, whatever it is. Invisible from inside a single page.
2. **Named and already burned:** `it is not X, it is Y` (cap once per page, wave-wide) and the **numeral-count
   paragraph opener** (cap once per page, wave-wide, prefer zero). **This page's live copy spends 1 and 2
   respectively (§6.2 point 11); the redraft's budget for both is ZERO** (§7.7).
3. **V9's corollary, and wave C is the fourth showing.** Five of seven batch-2 pages opened with a corrective
   clause in the first two sentences; batch 3 was told to vary it deliberately. **This page's live opening does
   it too** ("It is not, however, a structure for every doctor"). **The wave-C conductor decides the variation
   and states it in the fix pass.**
4. **V1 hard cap: two word orders per idea per page**, non-overlapping longest matches, never raw substrings.
   §7.1 states its idea groups so the cap is verifiable.
5. **V2 is a live standard.** This page is clean today and must stay clean: no search-string narration, no
   keyword-variant table, and **no narration of the ownership map to the reader** (conductor ruling 3,
   2026-08-26). Write "the detail sits on X" and link it.

---

## 10. Corrections and escalations

Five. **None was acted on. Nothing outside this file was written.**

### 10.1 D14 needs restating: a full header set no longer recovers pricebailey

BATCH2_INDEX §10B established that `curl -A "Mozilla/5.0"` recovers hawsons where `WebFetch` 403s. BATCH3_INDEX
**D14** then found that both pricebailey URLs still 403 to that command and **"return 200 to a full browser header
set"**, and prescribed fixing the estate's competitor-fetch helper to send full headers.

**Measured 2026-09-01: the full header set does not recover pricebailey either.** Both
`https://www.pricebailey.co.uk/blog/family-investment-companies-fic/` and
`https://www.pricebailey.co.uk/glossary/s455-directors-loan-tax-charge/` return **HTTP 403** with a Cloudflare
interstitial (`<title>Just a moment...</title>`) to all three of: `httpx` with UA + Accept + Accept-Language +
Accept-Encoding + four `Sec-Fetch-*` + `Upgrade-Insecure-Requests`; `curl.exe --compressed` with a Safari UA; and
the `WebFetch` tool. **hawsons.co.uk returned 200 to the same httpx header set while 403-ing `WebFetch`**, which
reproduces D14's original observation and shows the header fix is real and simply insufficient for this domain.

**Consequence, and it is not small: pricebailey holds 9 of the 11 keywords in this pack's family and the entire
2,400-volume head.** The page to beat is unreadable. **D14's prescription stands and should be widened: the
helper needs full headers AND a documented fallback for JS-challenge domains, and until it has one, pricebailey
pages must be recorded as unread rather than characterised.** This pack characterises nothing about them.

### 10.2 PROPOSED NEW OWNERSHIP ROW: nobody owns IHT (§9.3)

Proposed, not enacted, and **prefixed rather than numbered `O37`** per BATCH3_INDEX §6.1a.

| # | Shared fact | Proposed owner | Everyone else |
|---|---|---|---|
| **C3-01** | **The inheritance tax of a private wealth structure for a doctor**: potentially exempt transfers and the seven-year rule, gift with reservation of benefit, and why an investment company reaches neither business property relief nor Business Asset Disposal Relief | `/blog/family-investment-company-doctors-consultants` | Surplus-cash, salary-vs-dividend, s455 and the incorporation pages: one sentence, then link. No other wave-C page explains PETs or the seven-year rule. |

**Why here.** The page already carries all of it, the IHT argument is inseparable from the reason a FIC exists,
and the alternative is that four wave-C pages each explain PETs, which is the batch-1 failure shape.

**Explicitly NOT proposed:** general inheritance tax (nil-rate band, residence nil-rate band, the 40% rate, IHT
calculators). That is a 30,000-volume topic Medical has no page for, it is declined at 4.5 theme 11, and it
should be scoped as a page in its own right in a later wave rather than annexed here.

### 10.3 GROUND-TRUTH GAP: `house_positions.md` has no BPR block, and a live page is stale because of it

`house_positions.md` §4 covers BADR, s.162 and CGT in detail. **It says nothing about business property relief.**
The estate ground-truth memory `br_apr_1m_cap_2026_ground_truth` records that from April 2026 BR and APR share a
**combined allowance with 50% relief above it** and that AIM shares fall from 100% to 50%.

**This live page asserts `BPR at 100%` twice as present fact** (§6.2 point 1). The page's conclusion survives (a
FIC gets no BPR), but the framing is stale and it is stated in the present tense, which F2 forbids.

**Proposed as a new `house_positions.md` §4.A, Business Property Relief.** **Not added by this task: house
positions is shared with concurrent agents and this is not this task's file.** Until it exists, §7.4 bans any BPR
rate on this page.

### 10.4 GROUND-TRUTH GAP: the 6 April 2027 pension IHT change is not in house positions

`house_positions.md` §2.B covers the annual allowance and the LSA/LSDBA framework. It says nothing about **unused
pension funds entering the estate for IHT from 6 April 2027** (4.3).

**For a Medical site this is a material omission**, not a FIC detail: a doctor's NHS pension is their largest
asset and the change alters the answer to "should I fund the pension or something else" across the corpus.
**Proposed as a `house_positions.md` §2.F.** Not added by this task. Until it exists, §7.5 makes the claim
verify-at-source-or-drop on this page.

### 10.5 EDITORIAL ESCALATION: the outbound commercial link, and the writer must not resolve it alone

The second paragraph of the live page ends: "property-focused firms such as **Property Tax Partners** deal with
exactly these questions", an outbound `rel="nofollow" target="_blank"` link to `propertytaxpartners.co.uk`.

It is the only outbound commercial link on any wave-C page, it sits above the fold, and it routes a reader who
has just arrived to a different firm. **It may be a deliberate reciprocal arrangement this pack does not know
about.** A REFRAME rewrites the paragraph it lives in, so the writer will be forced to decide.

**The writer's instruction: keep the link, in a rewritten sentence, and escalate.** The manager decides whether
it stays, moves below the fold, or goes. **Do not remove it silently and do not add a second one.**

### 10.6 Two smaller corrections

1. **The task brief's "16 Google impressions" is 18 on a fresh pull**, over 2026-06-03 to 2026-09-01. Inside
   window-difference tolerance and it does not move the wave-C rank order. **The figure the brief omitted is the
   one that matters: position 4.78** (§1.2, §2.1).
2. **BATCH3_INDEX §5's "there is almost nothing to lose" is right for Bing and wrong for Google on this page.**
   Recorded so the wave-C conductor scopes the other eight surfaces against a fresh Google page-dimension pull
   rather than against the index's impression counts. **`/blog/consultant-directors-loan-account-s455-medical-company`
   was also re-pulled by this task and sits at 13 impressions, position 9.69**, which is likewise a live Google
   position the index does not record.

---

## 11. Limitations

1. **The page to beat could not be read.** pricebailey holds 9 of 11 keywords and 403s to every fetch method
   tried (§4.4, §10.1). **The competitor teardown is built on two 200s in the family plus one adjacent 200, and
   nothing is asserted about pricebailey's content.**
2. **`GetPageStats` is a top-N endpoint.** This URL's absence from all thirteen weekly snapshots is absence from
   the top N, not proven zero Bing impressions (BATCH3_INDEX §9 limitation 2, D5).
3. **All 18 Google impressions are anonymised**, so there is no query-level evidence of intent on either engine
   for this page. §7.1 is built entirely from the persisted harvest and the competitor teardown, with **no
   first-party query signal at all**. That is a weaker evidence base than any wave-A pack had and it is why the
   phrase list is 11 rather than 30.
4. **No doctor-specific FIC vocabulary exists in the 39,296-row harvest** (§3.3 point 3). Whether that is absent
   demand or Google-blindness cannot be settled from this data, and Bing gives no second opinion because the page
   has no Bing rows.
5. **Peer-winnable is Google-derived** (DataForSEO positions are Google positions). Per owner decision 21 it
   orders the work and excludes nothing.
6. **Three facts required for the redraft are unverified as at this pack's writing** and are gated at §7.5: the
   current BPR position, the corporate-residential SDLT rate, and the 6 April 2027 pension-IHT change. **Two of
   the three are ground-truth gaps (§10.3, §10.4), not writer problems.**
7. **No live-production check was run against medicalaccounts.co.uk.** The page's rendering mode, structure and
   internal link targets are derived from the source file and the repo. All internal targets were confirmed to
   exist as markdown files; **that they render at the expected URLs was not verified live.** The one live-state
   fact this pack relies on, that `/blog/private-practice-incorporation-complete-guide` returns 301, is taken
   from the D3 ruling of 2026-09-01, which was itself a live fetch.
8. **Repo HEAD moved between the batch index's writing and this pack's** (`7be12b11` to `d2e75655` to `ad4800eb`
   to `6714de48` to `038016726e21bdc3837dbb8a0a5789e3d0c09a5e`). The revert anchor in §1 was derived live from
   the file's own last-touching commit and verified byte-identical to the working tree. **Do not copy a sha from
   any batch document.**
