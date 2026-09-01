# §9.5 RESEARCH PACK: /blog/medical-practice-incorporation-step-by-step

**Batch 3, wave C (incorporation and company structures), INCORPORATION DIFFERENTIATION SET, surface 1 of 4.
GRADE = REFRAME. This page is the O33 prose owner, named by the D3 ruling of 2026-09-01.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9). Ground truth `docs/medical/house_positions.md`.
Batch index `docs/medical/packs/BATCH3_INDEX.md`. Peer set `docs/medical/competitor_universe_2026-08-26.md`
§2a plus the 17 domains reclassified as peers by the D13 resolution (39 peers of 44 harvested).
Site diagnosis `docs/medical/STATE.md` "Stage 0 diagnosis 2026-09-01".

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. **No paid
API call: $0.00.** DataForSEO was read from the persisted harvest by SQL only. GSC and Bing Webmaster calls are
free. Thirteen competitor pages were fetched live.

**Sibling packs, written in the same task and meant to be read together:**
`PACK_C_blog__incorporation-relief-private-medical-practice-s162.md`,
`PACK_C_calculators__private-practice-incorporation.md`,
`PACK_C_resources__incorporation-private.md`.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/medical-practice-incorporation-step-by-step` |
| Source file | `Medical/web/content/blog/medical-practice-incorporation-step-by-step.md` |
| **Rendering** | Markdown post whose **body is raw HTML**. Frontmatter carries `metaTitle`, `metaDescription`, `h1`, `title`, `howtoSteps` (8), `keyTakeaways` (5), `summary`, `faqs` (6). Write new blocks as raw HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<table>`) to match. |
| Category | `Incorporation & Company Structures` |
| Word count, whole file | **3,185** (`git`-clean working tree, counted 2026-09-01) |
| Em-dashes in file | **0**. Must still be 0 (I1, hard fail). |
| **GRADE** | **REFRAME.** Full rewrite permitted. |
| Repo HEAD at pack time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, run 2026-09-01) |
| Last commit touching this file | `7e596f02a5339982597949c5b7db9f41af3df4ea` (2026-08-26), verified byte-identical to the working tree (`git status --porcelain` on the path returns empty) |
| **Revert path** | `git revert <the wave-C commit>`. For a single-file revert to the pre-wave state: `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/medical-practice-incorporation-step-by-step.md`. **Derive the wave sha live at revert time; never copy one from a document.** |
| **`monitored_pages`** | **No row exists for this slug, at any status, at any date.** Registration is a separate owner-triggered step and is NOT done by this task or by the wave. See §1.2. |

### 1.1 Why REFRAME, with the evidence

§9.2, Bing graded first:

```
REFRAME = Google impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300
```

This URL returns **zero rows on both engines**: no GSC page row, no GSC page+query row, no Bing `GetPageStats`
snapshot, no Bing `GetPageQueryStats` row (§2). It is not near the §2.4 ruling boundary (1 or 2 Bing clicks at
position 10 or better); it has no clicks and no impressions to place it anywhere. **REFRAME, unambiguously, and
the equity-preservation floor is empty by construction.**

**Per BATCH3_INDEX §2.3 and defect D5 this is recorded as a question, not a finding.** Google has indexed 18 of
139 URLs on this domain and 51 have never been fetched at all (STATE, 2026-09-01, full URL Inspection sweep).
A page with no history has never been given the chance to fail. **No sentence in the drafted page or in any QA
report may describe this URL as "ranking nowhere".**

### 1.2 Armed monitored windows, run live for this pack

BATCH3_INDEX §4.7 SQL, run 2026-09-01 through `python scripts/_q.py` against the Supabase Management API,
project `dhlxwmvmkrfnmcgjbntk`, **with no status predicate**:

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- 19 rows
```

`__home` (**flagged**, 2026-10-06); `becoming-gp-partner-financial-implications`;
`buying-into-gp-partnership-capital-parity-explained`; `gp-accounting-guide` (**flagged**);
`gp-limited-company-tax-benefits-drawbacks`; `gp-partner-vs-salaried-gp-tax-comparison`;
`gp-partnership-mutual-assessment-period-what-to-check`; `gp-partnership-tax-complete-guide`;
`gp-payroll-services`; `gp-pension-contributions-tax-relief`; `gp-tax-deductions-complete-list-2026`;
`gp-vat-registration`; `locum-doctor-self-assessment-filing-guide`; `locum-doctor-tax-complete-guide`;
`medical-professional-expenses-what-is-claimable`; `nhs-pension-annual-allowance-complete-guide`;
`nhs-pension-for-locums-form-a-form-b`; `nhs-pension-scheme-pays-doctors-deadlines` (**flagged**);
`nhs-pension-tapered-annual-allowance-calculator`. All eighteen blog rows expire **2026-09-10**.

**`medical-practice-incorporation-step-by-step` is NOT among them. This page is unfrozen and workable now.**

**Two frozen rows bind this page hard and neither may be edited:**

1. **`gp-limited-company-tax-benefits-drawbacks`, frozen to 2026-09-10, is the best-performing incorporation
   page on the site**: Google **4 clicks / 96 impressions at position 5.7** over 2026-06-03 to 2026-09-01
   (§2.4). It owns "is a limited company worth it for a doctor". **See §5.1, which is the sharpest call in this
   pack.**
2. **`gp-vat-registration`, frozen to 2026-09-10, owns the VAT registration decision (O21-VAT, O17).** This page
   currently restates its material at length (§6.3 point 5).

### 1.3 The D3 ruling and what it makes this page

> **D3 RULED 2026-09-01 (conductor, live fetch):** `/blog/private-practice-incorporation-complete-guide`
> returns **301** to `/blog/medical-practice-incorporation-step-by-step` (middleware `DUPLICATE_REDIRECTS`),
> deployed and staying per the live-301s rule. **Wave C differentiates FOUR surfaces.** The sitemap no longer
> emits the redirected slug (commit `0abd26e7`) and the four internal links to it now go single-hop. The
> orphaned `.md` stays on disk untouched.

**Consequence: this page is the redirect target, so it inherits the complete-guide's link equity and its name in
the O33 row.** It is the one surviving prose owner of "incorporation of a medical practice".

The redirected URL was also pulled in §2: **it too returns zero rows on both engines**, so the 301 transfers no
measurable equity. That is a fact about the domain's index coverage, not about the redirect.

**Do not touch `Medical/web/content/blog/private-practice-incorporation-complete-guide.md`.** It is orphaned by
design and belongs to the deliberate collapse-review workstream. **Never propose a collapse, a redirect or a URL
change** (K4).

---

## 2. Equity register

**Every figure below was pulled fresh by this task on 2026-09-01.** Nothing is quoted from a stored Supabase
snapshot. `gsc_query_data` was not read and no SUM of it appears anywhere in this pack.

### 2.1 Google, GSC API

```
optimisation_engine.clients.gsc_query_client.GSCQueryFetcher("medical")
  property  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"],         startDate=2026-06-03, endDate=2026-09-01) -> 23 rows
  searchanalytics().query(dimensions=["page","query"], startDate=2026-06-03, endDate=2026-09-01) -> 288 rows
run 2026-09-01
```

| Dimension | Rows for this URL |
|---|---|
| `page` | **0** |
| `page` + `query` | **0** |

**ENDPOINT NAMED (D2): Google figures in this pack are GSC `searchanalytics.query`, `page` dimension, and are
never compared to any Bing figure.**

The pull is sound and the empty result is real, not a broken query: the same call returned 23 page rows and 288
page+query rows site-wide, including six sibling pages in this family (§2.4).

### 2.2 Bing, `GetPageStats` (page level)

```
optimisation_engine.clients.bing_query_client.BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
run 2026-09-01  ->  329 rows collapsing to 80 distinct URLs
```

| Metric | Value for this URL |
|---|---|
| Weekly snapshots present | **0** |
| Impressions | **0** |
| Clicks | **0** |

### 2.3 Bing, `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/medical-practice-incorporation-step-by-step")
run 2026-09-01  ->  0 rows
```

**The `page` argument was passed as the full `https://www.` URL, not as a path.** BATCH3_INDEX §0.2 records that
this endpoint returns an **empty list rather than an error** when handed a path, which is a silent-failure path
producing a false negative. The call idiom here is the correct one, so the zero is a real zero.

**ENDPOINT DISCIPLINE (D2).** `GetPageStats` page-level impressions and `GetPageQueryStats` named-query
impressions are both true and are **never comparable**. Both are zero here, which removes the trap on this page
but not on the wave: the calculator surface has sibling calculators with page-level Bing data and no named-query
data, and §2.4 keeps the two apart.

### 2.4 What the register actually says

**The do-not-lose list for this page is EMPTY. There is no equity to preserve and a full rewrite forfeits
nothing.** That is the permission. The constraint is elsewhere, and it is the neighbours:

| Sibling URL in the incorporation family | Google (page dim, 90d to 2026-09-01) | Bing `GetPageStats` | Status |
|---|---|---|---|
| `/blog/gp-limited-company-tax-benefits-drawbacks` | **4 clicks / 96 impr / pos 5.7** | 2 impr / 0 clicks | **FROZEN to 2026-09-10** |
| `/blog/family-investment-company-doctors-consultants` | 0 / 18 / pos 4.8 | 0 | wave C, not this pack |
| `/blog/salary-vs-dividend-medical-limited-company-2026` | 0 / 15 / pos 5.9 | 0 | wave C, **O34 owner** |
| `/blog/consultant-directors-loan-account-s455-medical-company` | 0 / 13 / pos 9.7 | 0 | wave C, s.455 owner |
| `/blog/surplus-cash-medical-limited-company-options` | 0 / 10 / pos 4.9 | 0 | wave C, not this pack |
| `/blog/locum-doctor-limited-company-pros-and-cons` | 0 | 5 impr / **2 clicks** | wave D, gated to 09-11 |
| **this page and the other three wave-C incorporation surfaces** | **0** | **0** | REFRAME |

**Two readings drive §5 and §7.**

1. **Every page in this family that earns anything on Google sits at position 4.8 to 9.7 on a handful of
   impressions.** Google will rank this domain on a specific incorporation question. It will not rank it on a
   commercial head term (STATE §layer 2: the "gp accountants" family holds ~4,000 impressions at average
   position 55 with zero clicks in 90 days). **The winnable shape here is the specific question, not the
   category.**
2. **The one page in the family with clicks is frozen and it owns the decision question.** So the four surfaces
   in this set have to differentiate around a page they may not read the future of and may not edit. §5.1.

**BATCH3_INDEX §9 limitation 2 applies:** `GetPageStats` is a top-N endpoint. Absence from it is not proof of
zero Bing impressions; it is absence from the top N. The zeros above are floors.

---

## 3. The market's keyword set

### 3.1 The selection SQL, printed so the counts are re-derivable

Source: `dataforseo_competitor_data`, `site_key='medical'`. **No DataForSEO call was made; this is free SQL
against data already paid for.** Run 2026-09-01 through `python scripts/_q.py`.

The peer array is the **39-domain set** (universe §2a's 22 plus the 17 reclassified by the D13 resolution of
2026-08-26), not the 22 the older packs use. **Word boundaries use `\y`, never `\b`** (defect D9: `\b` is a
backspace character in Postgres ARE and silently halved earlier keyword counts).

```sql
-- reproduced in full here; the sibling packs cite this block rather than a scratch file
select ranked_keyword, max(search_volume) vol, min(position) best,
       min(position) filter (where competitor_domain in (select d from peers)) peerbest,
       (array_agg(competitor_domain order by position))[1] holder,
       (array_agg(url order by position))[1] topurl
from dataforseo_competitor_data
where site_key='medical'
  and ranked_keyword ~* 'incorporat|\ys\.?162\y|162a|sole trader (v|vs)|limited company|ltd company|
      roll ?over relief|hold ?over relief|going concern|company or sole|dividend|director.?s loan|
      \ys\.?455\y|corporation tax|profit extraction|salary (v|vs)'
group by 1 order by vol desc nulls last;
```

**Counts. Keywords returned: 1,153. Combined volume: 676,630. Peer-winnable (a peer at position <= 20): 394
keywords, 166,490 volume.**

### 3.2 THE FINDING THAT GOVERNS THIS WHOLE SET, and it is not in the volume column

**Of 1,153 keywords in the incorporation family, exactly ONE contains any medical, NHS, doctor, GP, consultant,
practice or clinic vocabulary:**

| Vol | Best pos | Holder | Keyword | Holding URL |
|---|---|---|---|---|
| 40 | 39 | medicsmoney.co.uk | `private health insurance through limited company` | `https://medicsmoney.co.uk/ep-197-limited-companies-2024-masterclass/` |

**One keyword. Forty volume. Position 39.** The other 1,152 are generalist accountancy terms held by generalist
firms: `sole trader vs limited company` (5,400, aims.co.uk at position 105), `corporation tax` (22,200,
gorillaaccounting at 37), `dividend tax calculator` (6,600, gorillaaccounting at **5**).

**Three consequences, and each one is load-bearing for a different surface in this set.**

1. **The harvest is a poor map of this topic and the site has no Bing map of it either** (§2 is all zeros). So
   §7.1's missing-phrase list is built from **the market's own question forms as evidenced by competitor
   headings and titles** (§4) and from `house_positions.md` vocabulary, not from our own query data, because we
   have none. **This is a departure from the exemplar pack's method and it is deliberate.** It is stated here
   so a QA agent reads it as a method note rather than as sloppiness.
2. **Nobody in the peer set writes incorporation for doctors.** The single medical row is a **podcast episode
   page** (§4.7). That is the whitespace and it is the reason this set exists (§5).
3. **The generalist head terms are not winnable and must not be chased.** `sole trader vs limited company`
   (5,400) sits at position 93 to 106 across the peer set on a 578-word page. Our domain holds position 55 on
   its own commercial head family. Chasing it would produce a generalist page on a medical site, which is the
   V3 trap. **DECLINED at 4.8 theme 12, on the record.**

### 3.3 The rows that matter for THIS surface (the process question)

Filtered to the "how do I actually do it" intent. Peer-winnable **orders** the work and never excludes any row
(owner decision 21).

| Vol | Best pos | Holder | Peer-winnable | On page today | Keyword |
|---|---|---|---|---|---|
| 320 | 81 | livingstonesaccountants.co.uk | no | **no** | `changing from sole trader to limited company` |
| 320 | 77 | livingstonesaccountants.co.uk | no | **no** | `going from a sole trader to a limited company` |
| 320 | 56 | livingstonesaccountants.co.uk | no | **no** | `switching from sole trader to limited company` |
| 260 | 51 | e-accounts.co.uk | no | **no** | `companies house incorporation fee` |
| 170 | 70 | livingstonesaccountants.co.uk | no | **no** | `how to change from sole trader to limited company` |
| 170 | 73 | livingstonesaccountants.co.uk | no | **no** | `how to go from sole trader to limited company` |
| 110 | 73 | livingstonesaccountants.co.uk | no | **no** | `change from ltd company to sole trader` |
| 110 | 83 | livingstonesaccountants.co.uk | no | **no** | `changing from limited company to sole trader` |
| 90 | 7 | gorillaaccounting.com | **yes** | **no** | `incorporated company vs limited company` |
| 90 | 8 | gorillaaccounting.com | **yes** | **no** | `limited company vs incorporated` |
| 90 | 10 | gorillaaccounting.com | **yes** | **no** | `incorporation vs limited` |
| 70 | 77 | livingstonesaccountants.co.uk | no | **no** | `when should i change from sole trader to limited company` |
| 50 | 15 | gorillaaccounting.com | **yes** | **no** | `should i set up a limited company or sole trader` |

**The `switch / change / go from sole trader to limited company` family is 1,190 combined volume across seven
keywords, every one held by ONE page at position 56 to 83, and none of them is on our page.** That family is
this surface's own intent expressed in the market's words, and it is the only process-intent family in the
harvest.

**Two rows deliberately NOT targeted here and the reason on the record:**
- `should i set up a limited company or sole trader` (50) and `when should i change from sole trader to limited
  company` (70) are **decision** intent, and the decision belongs to `gp-limited-company-tax-benefits-drawbacks`
  (frozen, 4 clicks at position 5.7). §5.1. **Declined.**
- The `close a limited company` family (2,400 x 6) is disincorporation, a different subject with no owner in
  this batch. **Declined, recorded as an unowned NO-PAGE candidate at §10.4.**

---

## 4. Competitor teardown

**Thirteen URLs fetched live 2026-09-01. Every URL is accounted for with its status code. Zero silent drops.**

> **METHOD DEFECT FOUND AND WORKED AROUND, and it sharpens D14 rather than repeating it.** BATCH2_INDEX §10B
> established that a plain `curl -A "Mozilla/5.0"` recovers pages that `WebFetch` 403s. D14 then established
> that `pricebailey.co.uk` 403s to that command and returns 200 to a **full browser header set**.
> **Today both pricebailey URLs returned HTTP 403 to `httpx` carrying a full 9-header browser set (UA, Accept,
> Accept-Language, Accept-Encoding, four Sec-Fetch headers, Upgrade-Insecure-Requests) and HTTP 200 to
> `curl.exe` carrying only a UA and two Accept headers.** The discriminator is therefore **not the header set,
> it is the client's TLS fingerprint.** D14's prescription ("send a full header set") is necessary and is now
> demonstrably not sufficient. **Recorded as a new defect at §10.1.** Both pages were recovered and are torn
> down below.

### 4.1 livingstonesaccountants.co.uk, How to Switch from Sole Trader to Limited Company: **THE PAGE TO BEAT ON PROCESS**
`https://www.livingstonesaccountants.co.uk/blog/how-to-switch-from-sole-trader-to-limited-company-tax-implications-explained/` · **HTTP 200**
**Class: PEER** (D13 reclassification set). Holds the entire seven-keyword switching family, 1,190 volume, at
positions 56 to 83.

| | |
|---|---|
| Title / H1 | `How to Switch from Sole Trader to Limited Company: Tax Implications Explained` (identical) |
| Published | **19 June 2026** |
| Word count | **3,007** |
| H2 (article body) | `Table of Contents` only. **Every other heading on the page is a `Recent Posts` sidebar link.** |
| Tables | **1** |
| Calculator | No |
| FAQ block | No |
| Figures carried | £12,570, £50,270, £125,140, £50,000, £250,000, £1,500, £25,000, £37,000, £18,500, £27,000, £13,000, £12,000, £5,500, £40,000, £149.99, £150, £100,000 |
| Percentages carried | 6%, 19%, 25%, **33.75%**, 40%, 60% |

**Covers:** the full switching mechanic, with real arithmetic. Corporation tax at 19% and 25% with the £50,000
and £250,000 limits. Class 4 at 6%. The £100,000 to £125,140 personal-allowance taper as a 60% effective band.
Companies House fees. Accountancy cost of £1,500. It is the most complete process page in the set and it is the
only one that shows numbers.

**What it gets wrong or omits.**
1. **It states the dividend upper rate as 33.75%.** That is the **2025/26** rate. The live 2026/27 upper rate is
   **35.75%** (FA 2026 s.4, `house_positions.md` §5, verified at gov.uk 2026-08-26). **The best process page in
   the peer set is on last year's dividend rates**, published three months after the rates changed.
2. **Zero incorporation-relief content.** `claim` appears twice, `Finance Act 2026` zero times, `162` zero
   times. It moves a business into a company without mentioning the CGT on the goodwill.
3. **Four NHS mentions and three pension mentions, none of them about NHS pension accrual.** The site runs a
   `Medical Partnership Accounts: What Doctors Must Know` post, so it is a generalist with a medical vertical
   and no medical incorporation page.
4. **No H2 structure in the article body at all.** The page is a wall under a table of contents.

**Consequence for us.** The incumbent on our own intent is a 3,007-word generalist page with a stale dividend
rate, no relief content and no pension content, and it is ranking at 56 to 83, which means **nobody is winning
this family**. We win it by being the page that does the same process **for a doctor**, with the current rates,
the NHS pension line in the same paragraph as every saving, and the transfer-of-goodwill question handed to the
surface that owns it.

### 4.2 gorillaaccounting.com, When Should Sole Traders Set Up a Limited Company?
`https://gorillaaccounting.com/blog/when-should-sole-traders-set-up-a-limited-company/` · **HTTP 200**
**Class: PEER.** Holds `limited company sole trader` (6,600, position 30) and `should i set up a limited company
or sole trader` (50, position **15**).

| | |
|---|---|
| Title / H1 | `When Should Sole Traders Set Up a Limited Company?` (identical) |
| Published | **4 November 2020**, updated reference to 2026 |
| Word count | **2,623** |
| H2 (article body) | `What Are the Benefits of Setting Up a Limited Company?`; `When Should You Switch to a Limited Company?`; `How to Go from Sole Trader to Limited Company Director`; `Should You Remain a Sole Trader?` |
| Tables | No · Calculator: No · FAQ: No |
| Figures carried | **£50,000 only** |
| Percentages carried | **17%, 19%** |

**What it gets wrong.** It carries a **17% corporation tax rate**, which has never been the UK main rate in the
period this page covers and is a leftover from the abandoned 2020 rate plan. The live structure is 19% / 25%
with marginal relief at 3/200 (`house_positions.md` §5). **A six-year-old page with a rate that does not exist
holds position 15 on a decision term.** No pension content, no NHS content, no goodwill content.

### 4.3 gorillaaccounting.com, Limited Company Formation: Should You Incorporate?
`https://gorillaaccounting.com/blog/limited-company-formation-should-you-incorporate/` · **HTTP 200**
**Class: PEER.** Holds the five-keyword `incorporated vs limited` family (450 combined volume) at positions 7 to 11.

| | |
|---|---|
| Title / H1 | `Limited Company Formation: Should You Incorporate?` (identical) |
| Published | **30 October 2024** |
| Word count | **2,312** · Tables: No · Calculator: No · FAQ: No |
| H2 | `The Differences Between the Limited Company and Sole Trader Business Structures`; `When Might a Limited Company Be The Right Fit?`; `When Might Personal Ownership Be The Right Fit?` |
| H3 | `Setup and Simplicity`; `The Legal Structure`; `How You're Taxed`; `Financial Risk`; `Your Personal Privacy`; `The Administrative Burden`; `Business Perception and Growth` |
| Figures | **£50,000 only.** Percentages: 19%, 45%. |

**Consequence.** The `incorporated company vs limited company` family (450 volume, peer at position 7) is a
**terminology** question, not a process one, and it is cheap: it is answered in one sentence. It is the only
peer-winnable-at-or-under-20 row in the process cluster. **COVER in one sentence** (4.8 theme 3).

### 4.4 aims.co.uk, Sole Trader vs Limited Company
`https://www.aims.co.uk/sole-trader-vs-limited-company-whats-the-right-option-for-running-a-solo-business/` · **HTTP 200**
**Class: PEER.** Nominal holder of the 5,400-volume head `sole trader vs limited company` at position **105**.
**578 words. No figures at all. No percentages. One H2 of substance (`What is Right?`).** Published 2020.
**Recorded to show the head term is held by nobody, which is why it is declined rather than chased** (4.8 theme
12).

### 4.5 e-accounts.co.uk, Sole Trader vs Limited Company Tax Comparison
`https://www.e-accounts.co.uk/2025/01/17/sole-trader-vs-limited-company-tax-comparison/` · **HTTP 200**
**Class: PEER.** 1,654 words, **1 table**, published 17 January 2025. Carries 8.75% and 33.75% dividend rates
(**2025/26, now the prior year**) and a £150,000 additional-rate threshold, which was superseded by £125,140 in
April 2023. **Two superseded figures on a live comparison page.** No medical content.

### 4.6 lanop.co.uk, Section 162 Incorporation Relief
`https://lanop.co.uk/section-162-incorporation-relief-uk/` · **HTTP 200** · 4,103 words, published 7 February 2026.
**Class: PEER.** Torn down in full in the s.162 sibling pack (§4.1 there), because it is that surface's page to
beat, not this one's. **Relevant here for one row only:** it carries an H2 `Practical Step-by-Step Incorporation
Relief Checklist`, which is process content on a relief page. **We do the opposite split** (§5.2).

### 4.7 medicsmoney.co.uk, Limited Companies for doctors 2024: **THE ONLY MEDICAL COMPETITOR IN 1,153 KEYWORDS**
`https://medicsmoney.co.uk/ep-197-limited-companies-2024-masterclass/` · **HTTP 200**
**Class: PEER** (universe §2a #1, the strongest medical-audience brand in the set).

| | |
|---|---|
| Title / H1 | `Limited Companies for doctors 2024` (identical) |
| Word count | **3,284**, of which a large part is a Google-reviews widget and podcast chrome |
| H2 (article body) | `About the author` and two instances of `Explore our top 10 blog posts here`. **There is no topical H2 on the page.** |
| Tables | No · Calculator: No · FAQ: No |
| Figures | **None. Zero £ amounts on the entire page.** One percentage: 60%. |
| `pension` mentions | 12 · `NHS` mentions: 6 |

**What it is.** A **podcast episode page** for episode 197, dated 2024, with a transcript-style body. It is the
only page in the entire 1,153-keyword harvest that pairs "limited company" with a doctor audience, and it does
so with no headings, no figures, no process and no statute.

**Consequence for us, and it is the whole point of this set.** The strongest medical-accountancy brand in the
peer set has **no written incorporation guide for doctors**. It has a two-year-old podcast page. **The
doctor's incorporation process page does not exist anywhere in the peer set except ours**, and ours has never
been indexed. §5.

### 4.8 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 14 themes, 14 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **The ordered switching process as the page's own spine** (4.1, 4.2) | **COVER, and it is this page's O33 fact** | The seven-keyword switching family (1,190 vol) is process intent and nobody holds it above position 56. |
| 2 | **Companies House formation mechanics: name rules, PSC register, articles, 24-hour turnaround** (4.1, 4.2) | **COVER** | Already on the page and correct. Add the fee only if verified at source (§7.5); the harvest shows `companies house incorporation fee` at 260 volume and we currently state no fee. |
| 3 | **`incorporated company` versus `limited company` as terminology** (4.3, 450 vol, peer at pos 7) | **COVER, one sentence** | The cheapest peer-winnable row in the process cluster. One sentence, no section. |
| 4 | **Transferring the business: goodwill, the CGT event, s.162** (absent from 4.1, 4.2, 4.3, 4.4, 4.5) | **ONE SENTENCE AND A LINK. This page does not explain it.** | O33b, the s.162 sibling surface. See §5.2 and §9.2. **This is the single most likely place a writer over-reaches.** |
| 5 | **Novation and assignment of contracts, leases, indemnity, GMC position** (absent from every competitor) | **COVER, and it is unique to us** | No competitor page in the set mentions professional indemnity, medical practising agreements or the GMC. §5.3. |
| 6 | **Corporation tax registration within three months of trading** (4.1) | **COVER, one line** | Procedural, ours already, correct. |
| 7 | **VAT registration on incorporation** (4.1, 4.5) | **ONE SENTENCE AND A LINK. Do not restate the threshold mechanics.** | **O21-VAT and O17 owner is `/blog/gp-vat-registration`, FROZEN to 2026-09-10.** The page is currently in breach with a whole H3 (§6.3 point 5). |
| 8 | **Payroll, salary and dividend extraction** (4.1, 4.5) | **ONE SENTENCE AND A LINK. No dividend rate table.** | **O34 owner is `/blog/salary-vs-dividend-medical-limited-company-2026`.** Currently in breach (§6.3 point 4). |
| 9 | **Director's loan account and s.455** (4.1's sidebar family; sandisoneasson and bhp hold it) | **ONE SENTENCE AND A LINK. No rate.** | Owner is `/blog/consultant-directors-loan-account-s455-medical-company`. Currently in breach (§6.3 point 6). |
| 10 | **"Is it worth it" / the benefits-and-drawbacks comparison** (4.2, 4.3, 4.4) | **DECLINE. One sentence and a link, to a FROZEN page.** | `gp-limited-company-tax-benefits-drawbacks`, 4 Google clicks at position 5.7, frozen to 09-10. **This is §5.1 and it is the sharpest call in the pack.** |
| 11 | **The NHS pension accrual given up** (absent from all twelve non-medical competitors; gestured at by 4.7) | **COVER, and it is MANDATORY on every saving sentence** | `house_positions.md` §2.C: "Always pair any incorporation tax saving with the pension-accrual loss." O33 names this page as the owner of the pairing prose. §5.4. |
| 12 | **The generalist `sole trader vs limited company` head (5,400 vol, held at position 93 to 106)** | **DECLINE** | §3.2 point 3. Winning it means writing a generalist page on a medical site. V3 trap, refused on the record. |
| 13 | **Closing / disincorporating a limited company** (4.5's neighbours, 2,400 x 6) | **ELSEWHERE, and currently unowned** | Not this page, not this wave. Recorded as a NO-PAGE candidate at §10.4. |
| 14 | **A named author with a credential and a photograph** (4.6 lanop: "Aurangzaib Chawla, Tax Partner"; 4.7 medicsmoney: "About the author") | **DECLINE, permanently** | **I2**: no named individual, no credential, no byline, no "reviewed by", on any page. Off-site authority on this estate is faceless by standing rule. |

---

## 5. Whitespace and the differentiation statement

### 5.0 THE POINT OF THIS SET, stated once and reproduced in all four packs

**Four surfaces, one topic, one compute function, and until now no boundary between them.** The differentiation
is by the READER'S QUESTION, not by the subject:

| Surface | The one question it owns | It hands off |
|---|---|---|
| **`/blog/medical-practice-incorporation-step-by-step`** (this pack) | **"How do I actually do it?"** The ordered sequence from decided to first filing, and the NHS pension-accrual pairing that must sit beside every saving. | The relief computation, the saving arithmetic, the VAT threshold, the dividend rates, the s.455 rate, the "is it worth it" comparison. |
| **`/blog/incorporation-relief-private-medical-practice-s162`** | **"What happens to the tax on my goodwill when I transfer it?"** TCGA 1992 s.162: the roll-over mechanic, the three conditions, the share apportionment, goodwill valuation, the FA 2026 s.39 claim regime in full, and s.162 against BADR as a fork. | The process, the company's running tax, the extraction question, the saving calculation. |
| **`/calculators/private-practice-incorporation`** | **"How much, for my numbers?"** One computed comparison from the reader's own four inputs, plus an honest statement of what the calculation does and does not include. | Every explanation. Each fact gets one sentence and a link. |
| **`/resources/incorporation-private`** | **"What does the downloadable model do, and where does it stop?"** The manual for the file: the four inputs, how each column is built, the two quantified simplifications, the omissions, and how to sweep a range. | The decision, the process, the relief, and any live calculation. |

**The deterministic boundary rules that fall out of it, checkable without judgment:**

- **B1.** Only the s.162 surface may contain the strings `162A`, `first anniversary of the 31 January`, or a
  worked apportionment of a gain between shares and non-share consideration.
- **B2.** Only the calculator surface may present a £ figure that is an OUTPUT of `calcIncorporation`.
- **B3.** The resource surface's £ figures may only quantify a **simplification or an omission** in the model,
  never answer "should I incorporate".
- **B4.** Only this page may contain an ordered `<ol>` of incorporation steps or `howtoSteps` frontmatter.
- **B5.** No wave-C surface states a dividend rate, a corporation tax rate table, a VAT threshold, an s.455 rate
  or a BADR rate except where an O-row awards it. See each pack's §9.

### 5.1 THE CALL THAT DECIDES THIS PAGE: the decision question is not ours, and its owner is frozen

`/blog/gp-limited-company-tax-benefits-drawbacks` holds **4 Google clicks from 96 impressions at position 5.7**,
which is the best incorporation-family performance on the site, and it is **frozen to 2026-09-10**.

**This page currently competes with it directly.** Live H3: `Is it actually worth it? (the honest answer)`,
followed by two paragraphs comparing the structures and a link out to that very page. The live FAQ 3 is
`How much private income makes incorporation worth considering?`.

**Ruling for the writer: the drafted page contains no comparison section and no "is it worth it" heading.** The
decision gets **one sentence and a link**, in the opening, of the shape "if you have not yet decided, X compares
the two structures", and the page then proceeds on the assumption that the reader has decided. **The FAQ
question string `How much private income makes incorporation worth considering?` is deleted, not reworded**,
because a REFRAME permits it and because leaving it is self-competition against a frozen page whose measurement
window closes in nine days.

**Why this is not over-caution.** BATCH3_INDEX §3.1 declined to touch `/blog/locum-tax` on exactly this logic:
rewriting a page in the same window as the pages it competes with is self-competition by construction. Here the
competitor is frozen and unreadable, so the risk is one-sided: we can move, it cannot.

### 5.2 Nobody separates the process from the relief, and both of ours currently carry both

Live today: this page's step 3 names s.162 and FA 2026 s.39 in one sentence; the s.162 page carries an H3
`Interaction with the director's loan account` and a `Practical steps to get section 162 right` checklist, and
links back here. **The two pages currently answer each other's question.** lanop does the same thing inside one
page (4.6, `Practical Step-by-Step Incorporation Relief Checklist`).

**The split (B1 and B4).** This page carries the transfer as **one step in a sequence**, states in **one
sentence** that for transfers on or after 6 April 2026 the relief must be claimed and is no longer automatic,
gives the date, and links. It does **not** carry the deadline arithmetic, the s.162A removal, the apportionment
or the valuation. Those are O33b. **See §9.2 for the proposed O33 sub-clause and the fallback if the conductor
rules the other way.**

### 5.3 What no competitor covers at all, and it is not the tax

Twelve of the thirteen fetched pages are generalist and the thirteenth is a podcast page. **Not one of them
mentions:**

- **Professional indemnity.** Moving from a personal MDU / MPS / MDDUS arrangement to a corporate one is a real
  step with a real gap risk, and it is on our page already in half a sentence.
- **The GMC position and the Performers List.** A doctor asks this before they ask about corporation tax.
- **Private hospital practising privileges and room-hire agreements**, which are the contracts that actually
  need novating for a consultant, as against the generic "leases and equipment finance" every competitor lists.
- **That the NHS side cannot come with you at all.** Every generalist page assumes the whole business moves.
  For a doctor, the largest part of the income is structurally excluded, and that is the first thing to say.

**This is the specialist layer and K1 protects it: the drafted page's count of statutory references, form names,
technical terms and figures must be greater than or equal to the live page's.**

### 5.4 The pension pairing is the page's differentiator and it is also a hard house rule

`house_positions.md` §2.C, practical writing rule, verbatim: **"Always model both the tax saving and the pension
-accrual loss, never the saving alone. Do NOT imply incorporation is pension-neutral."** §5's rule adds: **"Do
NOT present incorporation as a clear tax win at typical private-income levels in 2026/27."**

Of the thirteen competitors, **zero** pair a saving with a pension cost. The live page does this well and it is
the strongest thing on it. **It is a KEEP.**

### 5.5 KEEP, explicitly

Per §9.3 and K1 the specialist layer is never traded away. These are this page's differentiators and they
survive the REFRAME. **K1 is a hard fail.**

- **"An ordinary personal service company cannot hold an NHS GMS or PMS contract" in the corrected, unpinned
  form.** `house_positions.md` §2.C correction of 2026-08-26 forbids the flat "a limited company cannot hold a
  GMS or PMS contract": NHS Act 2006 s.86(1)(c) permits a company limited by shares meeting the s.86(3)
  shareholder conditions. **The live page is already in the approved form in all four places.** KEEP the
  wording; do not "tighten" it back to the flat claim, and **do not attach s.86(3) to PMS**, which is made under
  s.92 with the detail in s.94 regulations nobody has read.
- **The NHS pension trap as its own named block, with the three certification routes** (Type 1 Annual
  Certificate for partners, Type 2 self-assessment for salaried GPs, Locum forms A and B for freelance locums).
  Correct against §2.C. KEEP.
- **"Never look at the tax saving in isolation; always pair it with the pension-accrual loss."** The house rule
  stated to the reader in the reader's terms. KEEP.
- **The NHS goodwill prohibition since 1 April 2004, current instrument SI 2019/251, including that it blocks
  selling shares whose value includes that goodwill.** Correct against §4. KEEP.
- **The step-3 point that a GP cannot transfer NHS goodwill at all.** KEEP.
- **The indemnity, GMC and novation step.** §5.3. KEEP and expand.
- **The three-month corporation tax registration deadline.** KEEP.
- **"These compliance costs are real and recurring, which is part of why incorporation only earns its keep above
  a certain level of sustained private profit."** KEEP; it is the honest counterweight and it is compliant with
  §5's "do not present it as a clear tax win".
- **Zero em-dashes.** KEEP at zero.

---

## 6. Our current page, read honestly

Source read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **3,185** |
| `metaTitle` | `Medical Practice Incorporation: Step-by-Step Guide 2026/27` (57 chars) |
| `h1` | `Medical Practice Incorporation Step by Step: Complete Guide for UK Doctors` |
| `title` | `Medical Practice Incorporation Step by Step: Complete Guide for UK Doctors` |
| Date / generator | 2026-04-01, `opus-4.8/track2-rewrite` |
| H2 count | **6** · H3 count: **6** · FAQs: **6** · keyTakeaways: **5** · `howtoSteps`: **8** |
| Tables | **None.** L4 unmet. |
| Worked example with figures | **None.** G1 unmet. |
| Em-dashes | **0** |

### 6.1 Existing heading list, verbatim and in order

- H2 `Step 0: Understand what you can and cannot incorporate`
  - H3 `The NHS pension trap: the cost you must price in`
  - H3 `Is it actually worth it? (the honest answer)`
- H2 `The incorporation process, step by step`
  - H3 `Step detail: VAT (only if you cross £90,000 of taxable turnover)`
  - H3 `Step detail: payroll, dividends and corporation tax (2026/27 figures)`
- H2 `Common pitfalls to avoid`
  - H3 `1. Forgetting the NHS pension cost`
  - H3 `2. NHS goodwill cannot be sold`
  - H3 `3. The director's loan (s.455) charge`
  - H3 `4. Mixing money and missing the basics`
- H2 `Ongoing obligations once incorporated`
- H2 `Getting it right for your circumstances`
- H2 `Related reading`

### 6.2 Blunt read

**The process spine is good, the medical framing is genuinely specialist, and the page is carrying four other
pages' facts while its own headline fact is stale-framed.** It is not thin and it is not wrong about medicine.
It is wrong about which year it is, in three places, and it is over-broad about which page it is.

**What is good, specifically.** The s.86 correction is applied correctly throughout. The pension trap has its
own block, names the three certification routes, and is repeated as pitfall 1. The goodwill prohibition is
current and cited to SI 2019/251. The eight `howtoSteps` are a real ordered sequence, not a list of topics.

### 6.3 HOUSE-POSITION CONTRADICTIONS AND OWNERSHIP BREACHES ON THE LIVE PAGE

**Listed, not fixed by this task. All are fixable by the writer because the grade is REFRAME.**

1. **STALE YEAR FRAMING, and it is the page's own headline claim. Three occurrences.**
   - Body, H3 `Is it actually worth it?`: "At **2025/26 rates** the pure tax saving from incorporating private
     work is modest at typical profit levels, and the **2026/27 dividend-rate rise narrows it further**."
   - Body, H3 `The NHS pension trap`: "already breaching the **£60,000 annual allowance (2025/26)**".
   - FAQ 3: "At **2025/26 rates** the pure tax saving ... and the **2026/27 dividend-rate rise (ordinary rate
     8.75% rising to 10.75%, upper rate 33.75% to 35.75%)** narrows it further."

   `house_positions.md` §5 is explicit: **"the dividend-rate rise that took effect on 6 April 2026 has already
   narrowed it (write this as a change that has happened, not one that is coming)"** and **"The 10.75% / 35.75%
   rates are live now, so do not write them as an upcoming change."** §2.B is equally explicit that the £60,000
   annual allowance is a **2026/27** figure, unchanged from 2025/26, and must carry the 2026/27 tag.
   **The page is written from the wrong side of 6 April 2026 while its own metaTitle says 2026/27.**

2. **O2 BREACH (annual allowance mechanics).** The pension-trap H3 explains the taper: "caught by the taper
   where **threshold income exceeds £200,000 and adjusted income exceeds £260,000**". O2 gives taper, threshold
   and adjusted income, pension input amount, carry forward and MPAA to `/calculators/nhs-pension-annual-
   allowance`, and every other page gets **one sentence, then a link**. The figures are correct; the ownership
   is not.

3. **O33 GAP, and it is this page's own fact.** Body step 3 and `howtoSteps` step 3 both name s.162 and cite
   "TCGA 1992 s.162, amended by FA 2026 s.39", and **neither says the relief must now be claimed**. A reader
   following the eight steps is never told that for a transfer on or after 6 April 2026 there is a claim to
   make, and that missing it makes the whole gain chargeable. **The single most consequential omission on the
   page, and it is in the row the page owns.**

4. **O34 BREACH (salary versus dividend extraction).** H3 `Step detail: payroll, dividends and corporation tax`
   carries the full dividend table (10.75%, 35.75%, 39.35%, £500 allowance, plus the 2025/26 comparatives),
   corporation tax at 19% / 25% / marginal relief 3/200 / 26.5%, employer NIC at 15% above £5,000, the £10,500
   Employment Allowance and the single-director exclusion, and employer pension contributions under FA 2004
   s.196. **That is roughly 250 words of another page's fact.** O34 owner:
   `/blog/salary-vs-dividend-medical-limited-company-2026` (wave C). Cap: one sentence and a link.

5. **O21-VAT AND O17 BREACH, and the owner is FROZEN.** H3 `Step detail: VAT (only if you cross £90,000 of
   taxable turnover)` runs two full paragraphs: the Sch 9 Group 7 exemption, the principal-purpose test, the
   standard-rated watch-items, the £90,000 threshold, the 30-day registration rule, the £88,000 deregistration
   limit and partial exemption. **Every one of those is `/blog/gp-vat-registration`'s (O21-VAT and O17), and
   that page is frozen to 2026-09-10.** The step-list entry plus the H3 plus FAQ 4 plus key takeaway 4 give VAT
   four separate treatments on a page whose subject is not VAT.

6. **s.455 OVER-BUDGET.** Key takeaway 5 and pitfall H3 3 both carry the s.455 rate pair (33.75% / 35.75%), the
   9-months-and-1-day timing, and the s.458 deferred-relief point. The owner is
   `/blog/consultant-directors-loan-account-s455-medical-company` (wave C). **The map has no O-row for s.455;
   O34's consequence column names the s455 page as a one-sentence-and-link recipient, which implies the s455
   page owns it. Proposed as an explicit row at §10.2 rather than assumed.**

7. **BADR over-budget.** Pitfall H3 2 and FAQ 5 both state the BADR rate band (18% from 6 April 2026, 14% from
   6 April 2025, 10% before). **The figures are correct against `house_positions.md` §4.** The subject belongs
   to wave F's `/blog/selling-private-medical-practice-cgt-badr`, which is gated to 2026-09-11 and has no O-row.
   **Recorded at §10.2 as a proposed row; the writer's allowance is set at one sentence and a link, which is safe
   under either outcome.**

8. **L4 unmet: no tables.** The page carries a comparison (sole trader against company, and the three
   certification routes) in prose. L4 requires at least one table on any page carrying a comparison.

9. **G1 unmet: no worked example.** The topic is a sequence rather than a calculation, so **G1 is satisfied here
   by a worked TIMELINE, not by arithmetic** (§7.4). The page currently has neither.

10. **A1 / A5 check.** The opening runs 61 words to the first H2 and the direct answer ("incorporation is a
    private-work decision only") lands at word 55. **Inside A5's 40 to 90 band. Compliant.**

11. **C3 / C4 check.** `you` and `your` appear 71 times in roughly 2,400 body words, which is **29.6 per 1,000**
    against a target band of 12 to 25. **Above band.** `we`, `our`, `us` appear 9 times, **3.8 per 1,000**
    against a cap of 3. **Marginally above cap**, concentrated in the closing block. Both are correctable in a
    REFRAME and both are named as countable gates at §7.6.

12. **V5 and V9 check on the live copy: clean.** Zero instances of `it is not X, it is Y`. Zero numeral-count
    paragraph openers. **V2 check: clean.** No search-string narration, no "also searched as".
    **One near-miss to watch:** the H3 `Is it actually worth it? (the honest answer)` is the same self-announcing
    -sufficiency shape that round 3 of the 2026-08-26 batch identified as the fourth emerging tic ("the point is
    worth labouring", "one line is enough here"). **That H3 is being deleted anyway under §5.1, which removes
    the instance; the writer must not reintroduce the shape.**

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgment.

### 7.1 THE NAMED MISSING-PHRASE LIST: the 14/28-day read is measured on THIS

**12 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case and
punctuation normalised.

**V1 IS BINDING AND THIS LIST IS BUILT TO IT.** Two word orders per idea per page, hard cap, counted as
**non-overlapping longest matches, never raw substrings**. The idea grouping is stated so a QA agent can verify
the cap. **Any V1 finding must quote the spans it counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `switch from sole trader to limited company` | Switching, the market's verb | 1 of 2 | Harvest: `switching from sole trader to limited company` 320 vol, held at position 56; `changing from...` 320 at 81; `going from a sole trader to...` 320 at 77. 1,190 vol across the family, nobody above position 56. |
| 2 | `change from sole trader to a limited company` | Switching, the market's verb | 2 of 2 | Harvest: `how to change from sole trader to limited company` 170 at 70. |
| 3 | `incorporated company` (as distinct from `limited company`) | Terminology | 1 of 1 | Harvest: `incorporated company vs limited company` 90, peer at position **7**; four sibling phrasings, 450 vol combined. Zero occurrences on our page. |
| 4 | `you must claim` the relief (or `the relief must be claimed`) | The FA 2026 claim, named once | 1 of 1 | `house_positions.md` §4 and O33. **The page's own row and its largest omission** (§6.3 point 3). **Hard cap: ONE sentence. No deadline arithmetic, no `162A`, no apportionment. B1.** |
| 5 | `6 April 2026` as the transfer-date dividing line | The dividing line | 1 of 1 | §4: relief is claimed for transfers on or after that date, automatic before it. Currently absent from both the body step and the `howtoStep`. |
| 6 | `professional indemnity` in its corporate form | The medical-only steps | 1 of 2 | §5.3: absent from all thirteen competitors. On the page today only as the bracketed "(MDU, MPS or MDDUS)". |
| 7 | `practising privileges` (private hospital) | The medical-only steps | 2 of 2 | §5.3. Zero occurrences. The consultant's actual contract-novation problem. |
| 8 | `novate` / `novation` used of a named medical contract | Novation | 1 of 1 | Present once generically; must attach to a named medical contract type. |
| 9 | `Performers List` | GMC and regulation | 1 of 2 | `house_positions.md` §10. Zero occurrences. The question a GP asks first. |
| 10 | `GMC` position on incorporation | GMC and regulation | 2 of 2 | Present once, unexplained ("check your GMC position is unaffected"), which invites the question and does not answer it. |
| 11 | `2026/27` attached to the annual allowance | Currency | 1 of 2 | §6.3 point 1. The live page tags £60,000 as 2025/26. |
| 12 | `has already narrowed` (or an equivalent completed-past framing of the dividend rise) | Currency | 2 of 2 | `house_positions.md` §5, verbatim writing rule. §6.3 point 1. **Three live occurrences of the future framing must all go.** |

**Countable test: 12 of 12 present. Any other absent phrase is a named BLOCK.**

**Explicitly NOT on this list, with the reason on the record:**
- **`sole trader vs limited company` and its five head variants (5,400 vol).** DECLINED at 4.8 theme 12 as
  generalist intent on a medical site. Chasing it means writing the page aims.co.uk wrote.
- **`is a limited company worth it` and every decision phrasing.** DECLINED at §5.1: the owner is
  `gp-limited-company-tax-benefits-drawbacks`, which holds 4 Google clicks at position 5.7 and is frozen.
- **`section 162A`, `first anniversary of the 31 January`, `annual exempt amount`.** These are O33b's and belong
  to the s.162 surface. **B1. Listing them here would be the exact cross-surface duplication this set exists to
  prevent.**
- **Any dividend rate, corporation tax rate, VAT threshold, s.455 rate or BADR rate as a target phrase.**
  O34, O21-VAT, O17 and §10.2's proposed rows. See §7.4.

### 7.2 Equity preservation (§9.9 floor 5)

**The equity set is EMPTY: 0 named Bing queries, 0 Google query rows** (§2). There is nothing to preserve and no
phrasing can be lost by construction.

**Countable test: 0 of 0. The floor is satisfied trivially and the QA agent records it as "empty, verified by
fresh pull on 2026-09-01", never as "not run".**

**The real preservation risk on this page is not its own equity, it is the neighbour's.** See §7.3.

### 7.3 CROSS-SURFACE DUPLICATION GATE (the boundary rules of §5.0, made countable)

Run over the four wave-C surfaces **together**, after all four are drafted, by the conductor.

| # | Gate | Pass condition |
|---|---|---|
| D1 | `162A` occurrences on this page | **0** |
| D2 | `first anniversary of the 31 January` on this page | **0** |
| D3 | Sentences on this page explaining how much of a gain is deferred when consideration is part shares and part cash | **0** |
| D4 | Ordered `<ol>` of incorporation steps, or `howtoSteps` frontmatter, on any wave-C surface other than this one | **0** |
| D5 | Dividend percentage figures (`10.75`, `35.75`, `39.35`, `8.75`, `33.75`) on this page | **0** |
| D6 | Corporation tax percentage figures (`19%`, `25%`, `26.5%`, `3/200`) on this page | **0** |
| D7 | `£90,000`, `£88,000`, `30 days`, `partial exemption` on this page | **0** |
| D8 | s.455 percentage figures on this page | **0** |
| D9 | BADR percentage figures on this page | **0** |
| D10 | Any H2 or H3 on this page whose string contains `worth it`, `benefits`, `drawbacks`, `pros`, `cons`, `vs`, `versus`, or `compared` | **0** |
| D11 | Any £ figure on this page that is an output of a sole-trader-against-company comparison | **0** (B2) |
| D12 | Occurrences of the same >= 8-word span on this page and any other wave-C surface | **0** |

### 7.4 Arithmetic, worked components, and the figures that are BANNED

**G1 is satisfied on this page by a worked TIMELINE, not by arithmetic**, because the page's subject is a
sequence. **Exactly one** worked component, and it is a dated sequence for one illustrative doctor: decision,
formation, transfer date, claim diarised, CT registration, first payroll, first accounts, first CT payment.

**If any figure appears in it, every figure must be re-derived from stated inputs by `arithmetic_recomputed[]`,
and G5 applies: the dates and deadlines used must be the real ones.**

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| Corporation tax registration within **3 months** of starting to trade | | HMRC, re-verify per §7.5 |
| CT return due **12 months** after year-end; tax payable **9 months and 1 day** after year-end | | `house_positions.md` §5 |
| **£60,000** annual allowance, **£200,000** threshold income, **£260,000** adjusted income, **£10,000** floor | **2026/27**, unchanged from 2025/26 | §2.B. **One sentence only, then link to O2's owner.** |
| **1 April 2004** NHS goodwill prohibition; **SI 2019/251** | | §4 |
| **6 April 2026** as the s.162 claim dividing line; **TCGA 1992 s.162**; **FA 2026 s.39** | | §4. **One sentence, no arithmetic.** |
| **NHS Act 2006 s.86(1)(c)** and the s.86(3) shareholder conditions, **GMS only** | | §2.C correction, 2026-08-26 |
| **1/54th** accrual, **CPI plus 1.5%**, 2015 section | | §2 |
| Type 1 Annual Certificate, Type 2 self-assessment, Locum forms A and B; **28 February** a year in arrears; the locum **10-week rule** | | §2.C, verified at PCSE 2026-08-26 |

**BANNED FIGURES on this page. None may be asserted:**

| Banned | Why | What the page does instead |
|---|---|---|
| **Any dividend rate**, 2026/27 or historic | **O34.** Owner: `/blog/salary-vs-dividend-medical-limited-company-2026`. | One sentence naming salary-plus-dividend as the extraction question, then link. |
| **Any corporation tax rate, threshold or marginal-relief fraction** | **O34's consequence column plus the §10.2 proposal.** Owner: `/blog/gp-corporation-tax`. | One sentence and a link. |
| **£90,000, £88,000, the 30-day rule, partial exemption, Sch 9 Group 7, the principal-purpose test** | **O21-VAT and O17.** Owner `/blog/gp-vat-registration` is **FROZEN to 2026-09-10**. | One sentence saying VAT registration turns on standard-rated turnover only, then link. **No figure.** |
| **Any s.455 rate or the s.458 deferral mechanic** | Owner: `/blog/consultant-directors-loan-account-s455-medical-company`. §10.2. | One sentence naming the overdrawn-loan risk, then link. **No figure, no date.** |
| **Any BADR rate or the £1m lifetime limit** | Wave F's `/blog/selling-private-medical-practice-cgt-badr`. §10.2. | One sentence at most, then link. |
| **Any Employment Allowance figure or employer NIC rate** | O34, and `house_positions.md` §8.A: **never tell a GP practice it can claim the Employment Allowance** (HMRC NIM06530, functions of a public nature). The live page states £10,500 in a company context, which is the correct context, but the figure is still O34's. | Not stated. |
| **The s.162 claim DEADLINE, `162A`, or any apportionment fraction** | **O33b, the s.162 surface. B1.** | The claim requirement in one sentence with its date, then link. |
| **Any QOF point value or Global Sum figure** | O10, O19, O25. Not relevant here; listed for completeness. | Nothing. |
| **Any GMC annual retention fee** | **O9. UNVERIFIED. Hard fail F5.** The page names the GMC and must not price it. | Nothing. |
| **Any Scheme Pays deadline** | **O4. `/blog/nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date. This is the exact fact that broke batch 1.** | Nothing. |
| **Any fabricated statistic**: "most doctors", "we find that around X%", a saving range | **F6, I6.** The calculator's live explainer carries exactly this defect ("can save £5,000 to £20,000 per year"); do not import it here. | Nothing. |
| **"a limited company cannot hold a GMS or PMS contract" flat** | §2.C correction. **The live page is already correct; the ban exists so a rewrite does not regress it.** | The approved unpinned form. |

**Countable test: count of banned-figure assertions = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| TCGA 1992 s.162; FA 2026 s.39 amends it; claim required for transfers on or after 6 April 2026 | https://www.legislation.gov.uk/ukpga/1992/12/section/162 and https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted ; `house_positions.md` §4 |
| NHS goodwill prohibition, SI 2019/251 (revoking SI 2004/906) | https://www.legislation.gov.uk/uksi/2019/251/made ; `house_positions.md` §4 |
| GMS contract may be held by a company limited by shares meeting s.86(3); **s.86 is GMS only, PMS is s.92 with detail in s.94 regulations** | https://www.legislation.gov.uk/ukpga/2006/41/section/86 and /section/92 ; `house_positions.md` §2.C. **Do not assert a PMS shareholder test: nobody has read the s.94 regulations.** |
| Dividends and company income are not NHS-pensionable; Type 1 / Type 2 / Locum A and B; 28 February and the 10-week rule | `house_positions.md` §2.C; https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate |
| Annual allowance £60,000 / £200,000 / £260,000 / £10,000, **2026/27** | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates ; `house_positions.md` §2.B |
| **Corporation tax registration within 3 months of starting to trade** | **Must be verified at gov.uk before stating.** Currently asserted on the page with no source. |
| **Companies House online incorporation "usually processed within about 24 hours"** | **Must be verified at gov.uk / Companies House before restating.** Currently asserted with no source. |
| **The Companies House incorporation FEE** (harvest row, 260 vol) | **Must be verified at Companies House before stating. If it cannot be verified, it is DROPPED, not guessed.** |
| **GMC position on practising through a company; the Performers List** | **Must be verified at gmc-uk.org / NHS England before stating.** `house_positions.md` §10 carries the regulatory context; **the GMC site returns HTTP 403 to automated fetch (O9's note), so a claim that cannot be verified is not made.** |
| **Corporate professional indemnity: that MDU / MPS / MDDUS offer it and that a personal arrangement does not cover a company** | **Must be verified at each defence organisation before stating. A competitor page is not a source.** |
| Company name rules (cannot use "NHS" or imply a government connection) | **Must be verified at gov.uk company-name rules before restating.** |

**Countable test: every external factual claim maps to a row above with a fetch date. Count of unverified
claims = 0. Any row that fails verification is DROPPED, not softened.**

### 7.6 Floors

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug medical-practice-incorporation-step-by-step` | Gate bar met; **0 covered queries lost** (the covered set is empty, §7.2) |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every date and figure in the worked timeline re-derived from stated inputs |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; every internal link resolves via `slug_resolver.py`. **`slug_resolver` HARD-REFUSES flat sites and Medical is flat: verify link targets against `content/blog/*.md` directly.** **No link may point at `/blog/private-practice-incorporation-complete-guide`, which 301s (D3).** |
| 5. Equity preservation | §7.2 | **0 of 0**, recorded as empty-verified |
| 6. Cluster coverage | §7.1 | **12 of 12** phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed by this page.** The ledger does not move. |
| 8. Competitor re-read | §4.8 | **14 themes, 14 decisions, 0 undecided** |
| 9. Cross-surface duplication | §7.3 | **12 of 12 gates pass** |
| 10. Voice bands | §6.3 points 11 and 12 | `you`/`your` **12 to 25** per 1,000 body words; `we`/`our`/`us` **at or below 3** per 1,000 |
| 11. Structure | L4, G1 | **At least 1 table**; **exactly 1** worked timeline |
| 12. Em-dashes | I1 | **0**, frontmatter included |

### 7.7 Extra hard constraints

1. **No em-dashes (U+2014) anywhere, including frontmatter.** Live count 0, must stay 0. I1, hard fail.
2. **No collapse, no redirect, no URL change.** K4. **Do not touch
   `private-practice-incorporation-complete-guide.md`**, which is orphaned by the D3 ruling.
3. **Do not edit any of the 19 frozen slugs of §1.2.** Contextual links to their live URLs are fine and several
   are required.
4. **No named individual, no credential, no byline, no "reviewed by".** I2, and it is what separates us from
   4.6 and 4.7.
5. **Never state or imply that a doctor's ordinary personal service company can hold an NHS contract**, and
   never state the flat "no limited company can" either. §2.C.
6. **Never use UDAs, dental bands or any dental framing.** §3: doctors do not use UDAs. And never transcribe the
   dental "sell the goodwill and claim relief" playbook. §4.
7. **Never describe the 2015 NHS scheme as final salary.** §2. It is CARE.
8. **Never state that 2025/26 is the current tax year.** §5 and §3: the live year is 2026/27.
9. **No new interruptive UI**, no modal, banner or popup. I7. **Two interruptive surfaces already exist site-wide
   (`DeepScrollModal`, `ReturningBar`, mounted in `src/app/layout.tsx`); they pre-date this programme, no wave
   touches them, and this note exists so a writer reading I7 does not re-raise them** (defect D6).
10. **One change per page per window** (§9.3). This REFRAME is the only change to this URL until the 28-day
    Bing read.
11. **`howtoSteps` frontmatter must survive as an ordered sequence** and must match the body's `<ol>` step for
    step. **The live page's howtoStep 3 and body step 3 currently disagree with §7.1 phrase 4; both must be
    updated together or the schema and the prose diverge.**

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure for this URL |
|---|---|---|---|
| Google | GSC `searchanalytics.query`, dimension `page` | 2026-06-03 to 2026-09-01 | **0 clicks, 0 impressions, no row** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows** |
| Bing | `GetPageStats`, **page level** | 2026-05-17 to 2026-08-30 | **0 snapshots, 0 impressions, 0 clicks** |
| Bing | `GetPageQueryStats`, **named-query level** | as returned | **0 rows** |

**Site context, so the page-level zero is read correctly.** Google 108 clicks / 10,168 impressions / 90d at
impression-weighted position 33.88, with **18 of 139 URLs indexed and 51 never fetched**. Bing 360 clicks /
9,818 impressions (`GetRankAndTrafficStats`, the only site-total-safe endpoint). **Bing out-clicks Google 3.3x.**

### 8.2 The read at 14 to 28 days, Bing (primary)

**Bing is where a new or rewritten page on this domain earns.** Sibling calculator and blog surfaces in this
family already show Bing traction with zero Google traction (`/calculators/salaried-gp-vs-partner` 16 impressions
and 3 clicks; `/blog/locum-doctor-limited-company-pros-and-cons` 5 impressions and 2 clicks), which is the shape
to expect.

1. **First named-query impression.** At least **3 of the 12** phrases in §7.1 return at least one Bing
   impression for this URL in the 28-day window. **Today the count is 0 of 12.**
2. **First page-level appearance.** This URL appears in **at least 1** weekly `GetPageStats` snapshot in the
   28-day window. Today it appears in none. **Note the top-N caveat: appearing is the signal, absence is not
   proof of zero.**
3. **Clicks.** **No click target is set at 28 days.** A first click on a page with no history is not a
   measurable expectation and setting one would manufacture a failure.
4. **Per §9.6 point 2, site traffic rising while these 12 phrases stay at zero is DRIFT and is recorded as a
   FAIL, not a pass.**

### 8.3 The read at 28 to 90 days, Google, and the honest statement

**Google is crawl-starved on this domain and this page must not be promised a position lift.** §5.3 of the
programme spec is explicit and STATE's 2026-09-01 diagnosis quantifies it: **87% of the corpus earns nothing
from Google because Google has not taken it**, 51 of 139 URLs are unknown to Google entirely, and the nine URLs
that went live on 2026-08-26 have earned **zero** Google impressions in six days with IndexNow never submitted.

**So the Google expectation for this page is an INDEXATION expectation, not a ranking one:**

5. **Indexation.** By day 90, this URL moves out of `URL is unknown to Google` or `Discovered - currently not
   indexed` into `Indexed`, measured by
   `python -m optimisation_engine.snapshot.index_coverage medical --fresh --skip-bing`.
   **Stated with LOW confidence and it is not in this page's gift**: indexation on this domain is an authority
   function, and the same sweep run twice twenty minutes apart moved six URLs across the
   discovered/unknown boundary, so the not-indexed side carries +/- 6.
6. **Impressions.** **No impression target and no position target is set, deliberately.** On a corpus where
   Google indexes 13% of URLs, a page not indexed at 90 days carries no information about the page.
7. **If a Google position does appear**, the family's observed band is position 4.8 to 9.7 on single-digit
   impressions (§2.4). That is context for reading the number, **not a target, and it must not be quoted back
   as one.**

### 8.4 Failure triggers (§9.6, written as numbers, before the change)

> **TRIGGER 1, the neighbour, and it is the tightest constraint in this set.** If
> `/blog/gp-limited-company-tax-benefits-drawbacks` (4 clicks / 96 impressions / position 5.7, **frozen**) falls
> below **position 9.0** on the GSC `page` dimension, or below **2 clicks** in a rolling 28-day window, at any
> point between deploy and deploy+90 days, **treat wave C as the prime suspect and revert this page and the
> calculator surface first.** That page is the only incorporation surface on the site with clicks, and §5.1
> exists to protect it.

> **TRIGGER 2, self-competition inside the set.** If, at the 28-day read, two or more of the four wave-C
> surfaces return Bing impressions for the **same** named query, the differentiation has failed and the
> conductor re-reads §5.0 before any further change to any of the four.

> **TRIGGER 3, quality.** If editorial QA raises a **V1, V3 or V5 finding on three or more** of the four
> surfaces, wave C has reproduced the batch-1 defect and its pages are **held rather than deployed**
> (BATCH3_INDEX §8, batch failure trigger).

**Revert path, restated.** `git revert <the wave-C commit>`, sha derived live at revert time. Single-file:
`git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/medical-practice-incorporation-step-by-step.md`.
**No `monitored_pages` row exists for this page and none is created by this wave; registration is owner-gated
and happens post-deploy, if at all.**

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **12 phrases of
§7.1**, never with queries the page already ranks for, because there are none.

---

## 9. The ownership map, reproduced

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a brief and the map disagree, THE MAP WINS.** The writer follows the map, states neither
fact, and reports the conflict. **This pack contains one such tension, at §9.2, and it proposes a clarification
rather than moving a row (§9.4).**

### 9.1 THE ROW THIS PAGE OWNS

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed, not automatic, from 6 April 2026 per FA 2026 s.39), the step sequence, and the **pension-accrual loss that must be paired with every tax saving** (house positions §2.C) | `/blog/medical-practice-incorporation-step-by-step`, wave C (**named 2026-09-01 by the D3 ruling**: the complete-guide URL 301s to it, so the step-by-step page is the one surviving prose owner) | Five surfaces currently carry it; after the D3 ruling four remain live. |

**What owning O33 means for this writer, stated positively.** This page is the only page on the site that may
set out the incorporation **step sequence**, and it is the page that must carry the **pension-accrual pairing**
in prose, in the reader's terms, beside every saving. Everything else in wave C references the sequence in one
sentence and links here.

### 9.2 THE O33 SUB-CLAUSE THIS SET NEEDS, proposed and not applied

**The tension, stated plainly.** O33 as written gives ONE page both the step sequence AND "s.162 relief
(claimed, not automatic, from 6 April 2026 per FA 2026 s.39)". But
`/blog/incorporation-relief-private-medical-practice-s162` is a dedicated 4,485-word surface **whose entire
subject is that relief**, whose `metaTitle` is `Section 162 Incorporation Relief: Private Practice` and whose
`metaDescription` sells "the 2026 claim change". Read at its strictest, O33 would strip that page of its own
subject and leave four surfaces where two answer "how do I do it".

**PROPOSED CLARIFICATION, for the conductor to rule before drafting begins:**

- **O33a, this page:** the incorporation **decision-to-first-filing sequence**, the medical-only steps
  (indemnity, GMC, Performers List, practising privileges, novation), and the **pension-accrual pairing prose**.
  It states in **one sentence, with the 6 April 2026 date**, that the relief must now be claimed, and links.
- **O33b, the s.162 surface:** **TCGA 1992 s.162 itself**: the roll-over mechanic, the three conditions, the
  wholly-or-partly-for-shares apportionment, private goodwill valuation, and the **FA 2026 s.39 claim regime in
  full** (the deadline arithmetic, the removal of s.162A, the before-and-after fork).

**This is a clarification of scope inside one row, not a move of the row.** Both pages remain wave C. O33's
owner column is unchanged. §9.4's rule is respected: nothing is quietly annexed and the proposal is on the
record.

**FALLBACK, so a writer is never blocked.** If the conductor rules that O33 stands strictly as written and the
step-by-step page owns the claim-change prose in full, then **one line changes in each pack**: §7.1 phrase 4's
cap moves from one sentence to a full block on this page, and the s.162 pack's §9.2 allowance for the claim
regime drops to one sentence and a link. **Nothing else in either pack moves.** Until a ruling, **the writer
follows the DEFAULT above (O33a / O33b) because it is the only split under which no two of the four surfaces
answer the same query**, and the conductor is told (§10.3).

### 9.3 THE ROWS THAT CONSTRAIN THIS PAGE

| # | Shared fact | Owner | **What THIS page does** |
|---|---|---|---|
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link.** The live page explains the taper (§6.3 point 2) and must stop at naming it. The £60,000 figure may be stated once, tagged 2026/27, because the pension trap turns on it. |
| **O4** | Scheme Pays: two-limb election, mandatory vs voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **`/blog/nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date. No batch-3 page states a Scheme Pays deadline. This is the exact fact that broke batch 1.** Not needed here. |
| **O9** | GMC annual retention fee: deductible, **amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page states a GMC fee figure. Hard fail F5.** This page names the GMC and must not price it. |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` | **One sentence and a link. Do not explain the exemption, the principal-purpose test or partial exemption.** Live breach at §6.3 point 5. |
| **O21-VAT** | The VAT registration threshold (£90,000, 30-day rule), the deregistration limit (£88,000) and the registration decision | `/blog/gp-vat-registration` (**FROZEN to 2026-09-10**) | **One sentence, then link. No figure.** Cited as `O21-VAT`, never as `O21` (the batch-2 / batch-3 namespace collision, BATCH3_INDEX §6.1a). |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. |
| **O30** | The partnership capital account itself | frozen partnership set, wave E | **One sentence and a link only, and the link target must be checked live because five partnership pages are frozen.** Relevant where a GP partner's private work is carved out. |
| **O34** | Salary versus dividend extraction (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **One sentence, then link. NO DIVIDEND RATE ON THIS PAGE.** Live breach at §6.3 point 4, roughly 250 words. |
| **O35** | The employment-status fork for doctors (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work) | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** This page correctly names the roles without tabulating them; keep it that way. |
| **O33b** (proposed, §9.2) | TCGA 1992 s.162: mechanic, conditions, apportionment, valuation, the FA 2026 s.39 claim regime in full | `/blog/incorporation-relief-private-medical-practice-s162`, wave C | **One sentence with the 6 April 2026 date, then link.** B1. |

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. Batch 2's O7 split was ratified precisely because two
writers converged on the same boundary independently and said so. The opposite signal, one writer quietly
annexing another's fact, is what V3 exists to catch.

**This pack proposes one clarification (§9.2, O33a / O33b) and two new rows (§10.2), applies none of them, and
states a fallback for each so no writer is blocked.**

### 9.5 Batch-level style watch (V5, V9), and it is the CONDUCTOR's job

Batch 1 produced `it is not X, it is Y` (3 to 7 times a page across ten authors). Batch 2 produced the
numeral-count paragraph opener (22 instances across seven pages against a cap of two). Round 3 of the 2026-08-26
batch found a **fourth** tic already forming to replace the one round 2 killed: self-announcing sufficiency
claims ("the point is worth labouring", "one line is enough here"). **V9 is explicit that banning a tic produces
the next one.**

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   four surfaces, is named in wave C's fix pass, whatever it is.** Invisible from inside a single page.
2. **Named and already burned, do not reach for any:** `it is not X, it is Y` (cap **once per page**,
   wave-wide); the **numeral-count paragraph opener** (cap **once per page**, wave-wide, prefer zero); the
   **self-announcing sufficiency claim** (prefer zero). **This page's live copy carries zero of the first two
   and one near-miss of the third, in an H3 that §5.1 deletes anyway.**
3. **The house corrective-opening reflex is on its fourth showing.** V9's corollary says a third showing should
   be varied deliberately; this is the fourth. **Wave C's conductor states the variation in the fix pass.**
   Note that this page's whole thesis is corrective ("you cannot incorporate the NHS side"), so the reflex will
   pull hard here. It is allowed once, in the opening, and not again.
4. **V1 hard cap: two word orders per idea per page, counted as non-overlapping longest matches, never raw
   substrings.** §7.1 states its idea groups so the cap is verifiable.
5. **V2 is a live standard, not a batch-2 rule.** This page is checked against the rules as they stand today.
6. **Process narration is banned** (conductor ruling 3, 2026-08-26). Never write anything resembling "this is
   covered on our other page because that page owns this topic". Write "the detail sits on X" and link it.

---

## 10. Corrections, findings and escalations

**None was acted on. Nothing outside this file was written.**

### 10.1 NEW DEFECT. The competitor-fetch prescription in D14 is necessary and not sufficient: the block is the TLS client, not the headers

D14 records that `pricebailey.co.uk` 403s to `curl -A "Mozilla/5.0"` and returns 200 to a full browser header
set, and prescribes "the estate's competitor-fetch helper should send a full header set, not just a UA".

**Measured today, 2026-09-01, on both pricebailey URLs in this teardown:**

| Client | Headers sent | Result |
|---|---|---|
| `httpx` | 9-header browser set (UA, Accept, Accept-Language, Accept-Encoding, four `Sec-Fetch-*`, `Upgrade-Insecure-Requests`) | **HTTP 403**, 3-word body |
| `curl.exe` | UA plus 2 Accept headers, `--compressed` | **HTTP 200**, 123,311 and 155,827 bytes |

**The richer header set failed and the poorer one succeeded, so the discriminator is not the header set.** The
remaining difference is the TLS handshake fingerprint. **A helper that follows D14's prescription literally will
still 403 on this domain**, and the failure mode is the one D14 exists to prevent: a writer logs "gap, no
competitor page" when the incumbent is sitting there at position 5.

**Recommended fix, one line:** the estate's competitor-fetch helper should **shell out to `curl` and fall back
to `httpx`**, not the other way round, and should treat a 403 with a sub-100-word body as a fetch failure to
retry rather than as content. **Not applied: the helper is another window's file.**

**What it cost this pack:** nothing, because both pages were recovered. **What it nearly cost:** the s.162
sibling pack's page to beat, which is a 1,057-word Price Bailey post holding `incorporation relief` (880 volume)
at **position 5**.

### 10.2 TWO OWNERSHIP ROWS THE MAP DOES NOT HAVE, and four wave-C surfaces need both

The map has no row for **s.455 / the director's loan account** and no row for **BADR**. Both facts are live on
three or more wave-C surfaces today:

| Fact | Carried today on | Natural owner | Status |
|---|---|---|---|
| s.455 rate, timing and s.458 deferral | this page (takeaway 5 + pitfall 3), the s.162 page (H3 `Interaction with the director's loan account`), the resource page (omissions list) | `/blog/consultant-directors-loan-account-s455-medical-company` (wave C, 0 clicks / 13 Google impressions at position 9.7) | **No O-row. Proposed.** O34's consequence column already names the s455 page as a one-sentence-and-link recipient, which implies the ownership without stating it. |
| BADR rate band, £1m limit, conditions | this page (pitfall 2 + FAQ 5), the s.162 page (H3 `Selling outright with BADR` + FAQ 12 + the worked illustration) | `/blog/selling-private-medical-practice-cgt-badr` (wave F, gated to 2026-09-11) | **No O-row. Proposed.** |

**Recommendation: issue both as prefixed rows (`C3-01` s.455, `C3-02` BADR) rather than continuing the global
integer sequence**, per BATCH3_INDEX §6.1a's own conclusion that a single global O-series is a shared namespace
that collides across parallel sessions. **Not issued by this task.**

**All four wave-C packs set the writer's allowance for both facts at one sentence and a link**, which is safe
under either outcome and is the safe default BATCH3_INDEX §7 D11 prescribes.

### 10.3 The O33 clarification needs a conductor ruling before drafting

§9.2. **This is the one item that could block a writer**, and the pack removes the block by naming a default
(O33a / O33b) and a one-line fallback. **The conductor should still rule explicitly**, because the two readings
put roughly 900 words in different places and a QA agent reading O33 literally would raise the default as a
breach.

### 10.4 An unowned NO-PAGE candidate found in the harvest, recorded not planned

**Closing a limited company: 2,400 volume across six keywords** (`close a limited company`, `close limited
company`, `close ltd company`, `closing a limited company`, `how to close a limited company`, `how to close down
a limited company`), plus `closing down a limited company` (2,400, lanop at position 67). Every one is held by
e-accounts.co.uk at positions **66 to 82**, which is nobody holding it.

**Disincorporation is the back half of this set's subject and no Medical surface covers it at all.** It is not
this wave's and it is not planned here; it is recorded so its absence is a decision. **It is also the correct
home for the "what if I get it wrong" question that the s.162 surface's deferral-resurfaces point currently
gestures at.**

### 10.5 The site diagnosis figure the packs should quote, and the one they should not

STATE's 2026-09-01 entry supersedes the 2026-08-26 one in two places that matter to wave C:

1. **Bing surfaces ~80 pages, not ~303.** The earlier entry read `GetPageStats`'s 303 rows as 303 pages;
   the endpoint returns one row per page per date. Fresh pull: 329 rows collapsing to **80 distinct URLs**.
   **Quote 80.**
2. **18 of 139 URLs are indexed, not "roughly the 21 impression-earning URLs".** The full 139-URL Inspection
   sweep is a materially better read than the 27-URL sample it replaces. **Quote 18 of 139, and carry the +/- 6
   caveat on the discovered-versus-unknown split.**

Both are already correct in STATE. Recorded here because three of the four wave-C packs quote the figure and
they must all quote the same one.

---

## 11. Limitations

1. **This page has no measurement history on either engine, so §7.1's phrase list is derived from competitor
   evidence and house-positions vocabulary, not from our own query data.** That is weaker evidence than the
   wave-A packs had and it is stated rather than hidden. The list is correspondingly short (12, against the QOF
   pack's 31) and every row names its source.
2. **The DataForSEO harvest is a poor map of this topic: 1,153 keywords and exactly ONE with any medical
   vocabulary** (§3.2). Peer-winnable orders the work and excludes nothing (decision 21), but on this topic it
   is ordering a generalist corpus, so it carries less weight here than usual.
3. **Peer-winnable is Google-derived** (DataForSEO positions are Google positions). On a domain where Bing
   out-clicks Google 3.3x and Google has indexed 13% of the corpus, that limitation bites hard. Read every
   peer-winnable figure as a **floor**.
4. **`GetPageStats` is a top-N endpoint.** The zeros in §2 are floors, not proven absences.
5. **Thirteen competitor URLs were fetched; two required a client change to recover** (§10.1). **No fetch was
   silently dropped and no non-200 was left unrecorded.**
6. **No live-production check was run against medicalaccounts.co.uk by this task.** The page's rendering mode,
   its category-to-topic resolution and its internal link targets are derived from the repo, traced to the call
   site, not from a request to the live site. **The one live-state fact this pack relies on is the D3 ruling's
   own live fetch, which is another session's verified work.**
7. **A live canonical defect affects a sibling in this set.** `/resources/incorporation-private` declares its
   canonical as the homepage (STATE 2026-09-01). **Fixed in code the same session and committed, NOT deployed**,
   so it is still live in production. It does not affect this page and it is recorded in the resource pack.
8. **The scratchpad is contended.** A concurrent agent overwrote this task's first pull script mid-run
   (BATCH3_INDEX defect D10, recurring). Every figure here is from a re-run under a uniquely named file and
   **the sibling agent's independent pull reproduced two of this pack's §2.4 figures exactly**
   (`family-investment-company` 18 impressions, `consultant-directors-loan-account` 13). **Consequence for later
   waves, restated: pass figures inline in the agent prompt and instruct a re-pull; never rely on a shared
   scratchpad file surviving.**
