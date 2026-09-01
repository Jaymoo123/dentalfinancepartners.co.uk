# §9.5 RESEARCH PACK: /calculators/private-practice-incorporation

**Batch 3, wave C (incorporation and company structures), INCORPORATION DIFFERENTIATION SET, surface 3 of 4.
GRADE = REFRAME. TSX calculator surface, not a markdown post.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9). Ground truth `docs/medical/house_positions.md`.
Batch index `docs/medical/packs/BATCH3_INDEX.md`. Site diagnosis `docs/medical/STATE.md` "Stage 0 diagnosis
2026-09-01".

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. **No paid
API call: $0.00.** DataForSEO read from the persisted harvest by SQL only. GSC and Bing calls are free. Thirteen
competitor pages fetched live.

**Sibling packs, meant to be read together:** `PACK_C_blog__medical-practice-incorporation-step-by-step.md`
(**read its §5.0 first: it defines this set's boundaries**),
`PACK_C_blog__incorporation-relief-private-medical-practice-s162.md`,
`PACK_C_resources__incorporation-private.md`.

> **THIS PACK CONTAINS THE HEAVIEST FINDINGS IN WAVE C AND THREE OF THEM ARE NOT CONTENT.** Two compute defects
> and one user-facing artefact leak are recorded at §6.4 and escalated at §10. **A writer may not fix them: they
> are code, they are covered by tests, and they change a live calculation.** They are the reason this surface
> needs a manager decision before it ships.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/calculators/private-practice-incorporation` |
| **Content source file** | `Medical/web/src/lib/tools/configs/incorporation-calculator.ts` (**TypeScript, not markdown**) |
| **Compute source file** | `Medical/web/src/lib/tools/compute/incorporation.ts` (`calcIncorporation`). **OUT OF WRITER SCOPE.** §6.4. |
| **Route** | `Medical/web/src/app/calculators/[slug]/page.tsx`, `dynamicParams = false`, static params from `allTools()` filtered to `kind === "generic"` |
| **What actually renders**, traced to the call site 2026-09-01 | `tool.metaTitle` (page title, OG, and the `SoftwareApplication` schema `name`), `tool.intro` (hero paragraph), the four input fields with their `label` and `help`, the computed `headline` / `rows` / `note`, `<CalculatorPageResources>`, `tool.explainer` (heading plus paragraphs), `tool.workedExamples` (**a supported field, currently EMPTY**), and `tool.faqs` (rendered, and emitted as `FAQPage` schema via `buildFaqPage`) |
| **The writer's surface** | `metaTitle`, `metaDescription`, `oneLiner`, `intro`, field `label` and `help`, `note`, `explainer.heading`, `explainer.paragraphs`, `faqs`, and **`workedExamples`, which is available and unused** |
| Word count of the config file | **845** |
| Em-dashes in file | **0**. Must still be 0 (I1, hard fail). |
| **GRADE** | **REFRAME.** Full rewrite of every string above is permitted. |
| Repo HEAD at pack time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, 2026-09-01) |
| Last commit touching the config | `4702b8bd702ab55e3776139a8ff23b4c8e636e01` (2026-07-06), working tree clean on the path |
| Last commit touching the compute | `5be346b0142f36b49bcfac26cf689a9246d4f90e` (2026-07-17), working tree clean |
| **Revert path** | `git revert <the wave-C commit>`. Single-file: `git checkout 4702b8bd702ab55e3776139a8ff23b4c8e636e01 -- Medical/web/src/lib/tools/configs/incorporation-calculator.ts`. **Derive the wave sha live at revert time.** **A TSX/TS revert must be followed by `tsc --noEmit` and the tool test suites** (§7.6 floor 4). |
| **`monitored_pages`** | **No row exists for this slug, at any status, at any date.** Registration is owner-gated and post-deploy. |

### 1.1 Why REFRAME, with the evidence

§9.2, Bing graded first:

```
REFRAME = Google impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300
```

This URL returns **zero rows on both engines** (§2). It is nowhere near the §2.4 ruling boundary (1 or 2 Bing
clicks at position 10 or better). **REFRAME. The equity-preservation floor is empty by construction.**

**Recorded as a question, not a finding** (BATCH3_INDEX §2.3, D5). **No sentence in the drafted copy or any QA
report may describe this URL as "ranking nowhere".**

**A calculator's REFRAME is narrower than a blog post's in one specific way and wider in another.** Narrower: the
arithmetic is not the writer's to change (§6.4). Wider: **every reader-facing string on the surface is
rewritable, including the metaTitle, which on a blog post under EXTEND would be frozen.**

### 1.2 Armed monitored windows, run live for this pack

BATCH3_INDEX §4.7 SQL, run 2026-09-01 via `python scripts/_q.py`, project `dhlxwmvmkrfnmcgjbntk`, **no status
predicate**:

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
`nhs-pension-tapered-annual-allowance-calculator`. Eighteen blog rows expire **2026-09-10**.

**`private-practice-incorporation` is NOT among them, and neither is any `/calculators/` slug.** Unfrozen,
workable now.

**One frozen row binds this surface hardest.** `gp-limited-company-tax-benefits-drawbacks` (Google **4 clicks /
96 impressions / position 5.7**, frozen to 2026-09-10) owns "is a limited company worth it for a doctor".
**This calculator's live `explainer` heading is `When does incorporating private practice make sense?`, which is
that page's question, restated.** §5.1.

### 1.3 THE SURFACE MAP: three renderings of one compute function, traced to the call site

**This is the fact that makes wave C's differentiation a real problem rather than an editorial preference, and
it is verified from the code rather than assumed.**

```
Medical/web/src/lib/tools/compute/incorporation.ts  ->  calcIncorporation()
  |
  |-- configs/incorporation-calculator.ts  (slug "private-practice-incorporation", kind "generic")
  |     rendered at /calculators/private-practice-incorporation   [THIS SURFACE]
  |
  `-- premium/configs/incorporation-premium.ts  (id "incorporation-premium", topic "incorporation-private")
        premium/registry.ts        PREMIUM_TOOLS["incorporation-premium"]
        premium/resources.ts       "incorporation-private" -> "incorporation-premium"
        intent/taxonomy.ts         blogCategorySlugs ["incorporation-and-company-structures", "private-practice"]
                                   -> TopicKey "incorporation-private"
        BlogPostRenderer.tsx:84    premiumTopic = topicForBlogSlug(categorySlug)
        BlogPostRenderer.tsx:216   <PremiumUpgrade topic={premiumTopic} placement="blog" />
        PremiumUpgrade.tsx:110     -> <PremiumCalculator config={...} />
        rendered MID-SCROLL on every blog post whose category is
        "Incorporation & Company Structures" or "Private Practice"
```

**Both wave-C blog surfaces carry that category**, so **an interactive incorporation calculator already renders
inside `/blog/medical-practice-incorporation-step-by-step` and
`/blog/incorporation-relief-private-medical-practice-s162`**, running the same `calcIncorporation` as this page.

`intent/taxonomy.ts` also sets `primaryCalculator: "private-practice-incorporation"` and
`ctaCopy: "Model your tax saving from incorporating your private practice"` for the topic, and
`CALC_SLUG_TO_TOPIC` maps this slug back to `incorporation-private`. **All four wave-C surfaces sit inside one
topic key.**

**Three consequences.**

1. **This surface's differentiator cannot be "it calculates", because the blog posts calculate too.** It is
   **the standalone destination for the calculation query**, and its copy must be written for someone who
   arrived wanting a number, not for someone reading a guide.
2. **The `note` and `explainer` on this page and the `note` on the premium config are read by the same person in
   the same session.** If they disagree, we have told a reader two things. **Today they do disagree, materially,
   about corporation tax** (§6.4 defect C).
3. **A reader who lands on the calculator and one who lands on a blog post get different disclosure of the same
   model's limits.** The premium note is 150 words of qualification; this page's note is 32. **The honest
   position is the longer one, and it belongs on both.**

### 1.4 D3

> **D3 RULED 2026-09-01:** `/blog/private-practice-incorporation-complete-guide` returns 301 to
> `/blog/medical-practice-incorporation-step-by-step`. **Wave C differentiates FOUR surfaces.**

**No string on this surface may link to the redirected URL.** **Never propose a collapse, a redirect or a URL
change** (K4).

---

## 2. Equity register

**Every figure pulled fresh by this task on 2026-09-01.** Nothing from a stored Supabase snapshot.
`gsc_query_data` was not read and no SUM of it appears anywhere.

### 2.1 Google, GSC API

```
GSCQueryFetcher("medical")  ->  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"],         2026-06-03..2026-09-01) -> 23 rows
  searchanalytics().query(dimensions=["page","query"], 2026-06-03..2026-09-01) -> 288 rows
run 2026-09-01
```

| Dimension | Rows for this URL |
|---|---|
| `page` | **0** |
| `page` + `query` | **0** |

**ENDPOINT NAMED (D2): GSC `searchanalytics.query`, `page` dimension. Never compared to a Bing figure.**

### 2.2 Bing, `GetPageStats` (page level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
run 2026-09-01  ->  329 rows collapsing to 80 distinct URLs
```

**0 snapshots, 0 impressions, 0 clicks for this URL.**

**But the calculator NAMESPACE is not empty on Bing, and this is the most useful thing in this pack's §2:**

| Calculator URL | Bing `GetPageStats`, window totals | Google `page` dim |
|---|---|---|
| `/calculators/nhs-pension-annual-allowance` | **19 impressions, 1 click** | 0 |
| `/calculators/salaried-gp-vs-partner` | **16 impressions, 3 clicks** | 0 |
| `/calculators/nhs-pension-scheme-pays` | **15 impressions, 1 click** | 0 |
| `/calculators` (index) | 11 impressions, 0 clicks | 0 |
| `/calculators/salaried-doctor-take-home` | 6 impressions, 1 click | 0 |
| `/calculators/nhs-superannuation-tiered-contribution` | 2 impressions, 1 click | 0 |
| `/calculators/doctor-expenses-tax-relief` | 2 impressions, 0 clicks | 0 |
| **`/calculators/private-practice-incorporation`** | **0** | **0** |

**Six of the site's calculator URLs earn Bing impressions and five of them convert a click; none of them earns
anything on Google.** That is the clearest channel evidence in wave C: **on this domain a calculator is a Bing
surface**, and it is the empirical basis for §8's expectation.

### 2.3 Bing, `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/calculators/private-practice-incorporation")
run 2026-09-01  ->  0 rows
```

The `page` argument was the full `https://www.` URL, not a path (BATCH3_INDEX §0.2's silent-failure trap), so
the zero is a real zero.

**ENDPOINT DISCIPLINE (D2), and it bites here.** The sibling calculators in §2.2 have **page-level** Bing data.
Any comparison of this surface's future named-query figures against those page-level numbers is invalid. §8
names the endpoint on every line.

### 2.4 What the register says

**Nothing to preserve. A full rewrite of every string forfeits nothing.** The constraints are all external:

| Neighbour | Figure | Constraint it imposes |
|---|---|---|
| `/blog/gp-limited-company-tax-benefits-drawbacks` | Google 4 clicks / 96 impr / **pos 5.7**, **FROZEN to 09-10** | Owns "is it worth it". **This calculator's explainer heading is currently that question.** §5.1. |
| `/calculators/salaried-gp-vs-partner` | Bing **3 clicks / 16 impr** | The best-converting calculator on the site and a **comparison** calculator. Its shape is the model to copy; its subject must not be encroached on. |
| `/blog/salary-vs-dividend-medical-limited-company-2026` | Google 0 / 15 / pos 5.9 | **O34 owner.** This surface's whole output is a salary-plus-dividend extraction. §7.4. |
| `/blog/consultant-directors-loan-account-s455-medical-company` | Google 0 / 13 / pos 9.7 | s.455 owner. **The premium config's note states an s.455 rate** (§6.4 defect D). |

**BATCH3_INDEX §9 limitation 2: `GetPageStats` is top-N, so the zeros are floors.**

---

## 3. The market's keyword set

### 3.1 The selection SQL

`dataforseo_competitor_data`, `site_key='medical'`, run 2026-09-01 via `python scripts/_q.py`. **No DataForSEO
call was made.** Peer array = the **39-domain** set. **Word boundaries use `\y`, never `\b`** (D9). The full SQL is
reproduced in `PACK_C_blog__medical-practice-incorporation-step-by-step.md` §3.1. Family-wide counts, shared
across all four wave-C packs:
**1,153 keywords / 676,630 volume / 394 peer-winnable rows at 166,490 volume.**

### 3.2 The calculator-intent rows, and they are the highest-volume rows in wave C

| Vol | Best pos | Peer best | Holder | Peer-winnable | Keyword |
|---|---|---|---|---|---|
| 6,600 | **2** | 2 | gorillaaccounting.com | **yes** | `tax and dividend calculator` |
| 6,600 | **4** | 4 | gorillaaccounting.com | **yes** | `tax on dividends calculator` |
| 6,600 | **4** | 4 | gorillaaccounting.com | **yes** | `taxes on dividends calculator` |
| 6,600 | **5** | 5 | gorillaaccounting.com | **yes** | `dividend tax calculator` |
| 6,600 | **5** | 5 | gorillaaccounting.com | **yes** | `calculate dividend tax` |
| 5,400 | 52 | 52 | pricebailey.co.uk | no | `corporation tax calculator` |
| 4,400 | **7** | 7 | gorillaaccounting.com | **yes** | `dividend calculator` |
| 1,600 | **5** | 5 | gorillaaccounting.com | **yes** | `dividend tax calculator uk` |
| 1,600 | **8** | 8 | gorillaaccounting.com | **yes** | `dividend calculator uk` |
| 1,600 | **11** | 11 | pricebailey.co.uk | **yes** | `ltd company tax calculator` |
| 1,600 | 30 | 30 | gorillaaccounting.com | no | `calculate limited company tax` |
| 1,300 | **1** | 1 | gorillaaccounting.com | **yes** | `salary and dividend calculator` |
| 1,300 | **2** | 2 | gorillaaccounting.com | **yes** | `dividend and salary calculator` |
| 1,300 | **2** | 2 | gorillaaccounting.com | **yes** | `salary dividend calculator` |
| 480 x ~14 | **1 to 4** | 1 to 4 | gorillaaccounting.com | **yes** | the `income tax and dividend calculator` long-tail cluster |
| 320 | 38 | 38 | gorillaaccounting.com | no | `ltd company vs sole trader calculator` |
| 320 | 46 | 46 | gorillaaccounting.com | no | `sole trader vs limited company calculator` |
| 140 | 47 | 47 | gorillaaccounting.com | no | `sole trader vs limited company tax calculator` |

**Counts for this surface. Keywords: 140 in the calculator family. Combined volume: 88,760. Peer-winnable:
most of the dividend cluster, held by ONE page.**

**Read that table again before targeting anything from it.** `gorillaaccounting.com/salary-dividend-tax-calculator/`
holds roughly thirty keywords at **positions 1 to 8**, including several 480-volume long-tail phrasings at
**position 1**. That is not a beatable position from a domain sitting at average position 33.88 with 18 of 139
URLs indexed.

### 3.3 The three readings that decide this surface's targets

1. **The dividend-calculator family (roughly 40,000 volume) is DECLINED in full.** It is generalist, it is held
   at positions 1 to 8 by a single incumbent, and it is **O34's subject** in any case
   (`/blog/salary-vs-dividend-medical-limited-company-2026`). Chasing it means building a dividend calculator on
   a medical site to lose to a contractor accountant. **Refused on the record.**
2. **The `sole trader vs limited company calculator` family (780 volume across three keywords) is the one this
   surface actually is, and NOBODY holds it**: positions 38, 46 and 47, all on the same generic self-employed
   calculator. **That is the target, and it is small on purpose.**
3. **There is no medical modifier anywhere in the calculator family.** Of the 1,153-keyword incorporation
   family, exactly one keyword carries medical vocabulary at all (40 volume, a podcast page). **So this surface
   is not competing for `incorporation calculator` traffic; it is competing to be the page a doctor lands on
   from a specific medical phrasing that the Google-derived harvest cannot see.** That is precisely the demand
   Bing shows and Google does not (§2.2), and it is why §7.1's phrase list is built from medical vocabulary and
   the model's own limits rather than from the harvest.

---

## 4. Competitor teardown

**Thirteen URLs fetched live 2026-09-01 across this set. Every URL accounted for with its status code. Zero
silent drops.** Fetch-method defect and its one-line fix: step-by-step pack §10.1 (the pricebailey block is the
TLS client fingerprint, not the header set, so D14's prescription is necessary and not sufficient).

### 4.1 gorillaaccounting.com, Salary and Dividend Tax Calculator: **THE INCUMBENT, AND IT IS ON LAST YEAR'S RATES**
`https://gorillaaccounting.com/salary-dividend-tax-calculator/` · **HTTP 200**
**Class: PEER.** Holds roughly **thirty** keywords at positions **1 to 8**, including `salary and dividend
calculator` (1,300) at **position 1** and `dividend tax calculator` (6,600) at **position 5**.

| | |
|---|---|
| Title / H1 | `Salary & Dividend Tax Calculator` / `Salary and Dividend Tax Calculator` |
| Word count | **1,876** · Tables: **0** · FAQ block: **none** |
| H2 | `How Dividends work`; `Don't just take our word for it`; `Ready to switch?`; `Discover Our Top Packages`; `Online Instant Quote`; `Get an Instant Quote` |
| £ figures | £0, £500, £12,570, £12,571, £13,070, £20,000, £330, £50,000, £50,270, £50,271, £125,140 |
| **Percentages** | 0%, 8%, **8.75%**, 19%, 20%, 25%, 28%, **33.75%**, **39.35%** |
| Years present | **2024, 2025 only** |

**What it gets wrong, and it is the single biggest competitive opening on this surface.**

**It states the dividend rates as 8.75% and 33.75%.** Those are the **2025/26** rates. The live 2026/27 rates
are **10.75% ordinary and 35.75% upper** (FA 2026 s.4, `house_positions.md` §5, verified at gov.uk 2026-08-26,
where the page is now headed "6 April 2026 to 5 April 2027"). **The dominant dividend calculator in the peer
set, holding position 1 on multiple terms, is computing on last year's rates**, and the only years mentioned
anywhere on the page are 2024 and 2025.

**It also carries a 28% rate**, which is not a current dividend, CGT or corporation tax rate for any purpose
relevant to this page, and **it carries no medical content, no pension content and no NHS content at all.**

**Consequence for us.** **We do not chase its keywords** (3.3 point 1) **and we do not need to.** The useful
finding is the standard it sets: a calculator can hold position 1 while being a year out of date, which means
**currency is not what wins that SERP and it is not what will win ours either.** What wins ours is being the
calculator that models the input a doctor actually has (an NHS salary underneath private profit) and is honest
about the line it cannot price.

### 4.2 gorillaaccounting.com, Self-Employed Tax Calculator
`https://gorillaaccounting.com/self-employed-calculator/` · **HTTP 200**
**Class: PEER.** Holds the entire `sole trader vs limited company calculator` family: `ltd company vs sole
trader calculator` (320, position 38), `sole trader vs limited company calculator` (320, position 46),
`sole trader vs limited company tax calculator` (140, position 47).

| | |
|---|---|
| Title / H1 | `Self Employed Tax Calculator` / `Self-Employed Tax Calculator` |
| Word count | **1,045** · Tables: 0 · FAQ: none |
| H2 | `Email Calculator Results`; `Useful Information`; `Related Blog Posts` |
| **£ figures on the page** | **ZERO** |
| **Percentages on the page** | **ZERO** |

**What it is.** A lead-capture calculator (`Email Calculator Results` is its first H2) with **no stated
assumptions of any kind**. Zero figures, zero rates, zero years, no note, no explainer of what the model
includes or excludes.

**Consequence for us, and it is this surface's whitespace.** **The page that holds our exact intent tells the
reader nothing about how it computes.** It is a black box behind an email gate at position 38 to 47. **A
calculator that states its own error bars, in figures, would be the only one in the set.** We already have that
copy: it is on `/resources/incorporation-private`, which quantifies both simplifications to the pound
(§5.2).

### 4.3 pricebailey.co.uk, Corporation Tax Calculator
`https://vatfiler.pricebailey.co.uk/Calculator/CorporationTax` · **not fetched; recorded rather than dropped.**
Holds `corporation tax calculator` (5,400) at **position 52**, `ltd company tax calculator` (1,600) at
**position 11**, and four more at 62 to 74. **Not fetched because the family is DECLINED**: corporation tax is
O34's neighbour (`/blog/gp-corporation-tax`) and a CT calculator is not this surface. Named so the absence is a
decision.

### 4.4 The rest of the set, and what each contributes here

| URL | Status | Contribution to this surface |
|---|---|---|
| `https://www.livingstonesaccountants.co.uk/blog/how-to-switch-from-sole-trader-to-limited-company-tax-implications-explained/` | 200, 3,007w, **1 table** | The only competitor that shows a sole-trader-against-company comparison **with real arithmetic in a table**. Carries **33.75%** (2025/26, stale). **Evidence that the comparison table is the winning shape and that nobody is doing it currently.** |
| `https://www.e-accounts.co.uk/2025/01/17/sole-trader-vs-limited-company-tax-comparison/` | 200, 1,654w, 1 table | Same shape. **8.75% / 33.75% (stale) and a £150,000 additional-rate threshold superseded in April 2023.** |
| `https://www.aims.co.uk/sole-trader-vs-limited-company-whats-the-right-option-for-running-a-solo-business/` | 200, **578w** | Nominal holder of the 5,400-volume head at **position 105**. **Zero figures.** Evidence the head is held by nobody. |
| `https://gorillaaccounting.com/blog/when-should-sole-traders-set-up-a-limited-company/` | 200, 2,623w | Carries a **17% corporation tax rate** that has never applied. |
| `https://gorillaaccounting.com/blog/limited-company-formation-should-you-incorporate/` | 200, 2,312w | £50,000, 19%, 45% and nothing else. |
| `https://medicsmoney.co.uk/ep-197-limited-companies-2024-masterclass/` | 200, 3,284w | **The only medical competitor in 1,153 keywords. Zero £ figures.** |
| `https://www.medicsmoney.co.uk/` | 200, 5,722w | Confirms the strongest medical brand runs **no incorporation calculator**. |
| `https://www.pricebailey.co.uk/blog/incorporation-relief/` | 200 (via `curl`; 403 via `httpx`) | Zero figures. Torn down in the s.162 pack. |
| `https://lanop.co.uk/section-162-incorporation-relief-uk/` | 200, 4,103w | Torn down in the s.162 pack. |
| `https://www.pricebailey.co.uk/blog/togc-transfer-of-a-going-concern/` | 200 (via `curl`) | Torn down in the s.162 pack. |
| `https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` | 200, 1,596w | s.455 incumbent. **ELSEWHERE.** |

**Not one of the thirteen carries an NHS-salary input, a pension line, or a stated error bar.**

### 4.5 Union of competitor themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 12 themes, 12 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **A side-by-side sole trader against limited company total-tax comparison** (4.4 livingstones, e-accounts) | **COVER, and it is the surface** | Already the computed output. The family (780 vol) is held at positions 38 to 47 by a black box (4.2). |
| 2 | **An NHS salary stacked underneath the private profit, setting the bands** (absent from all thirteen) | **COVER, and it is the ONE thing no competitor can do** | Already an input (`nhsIncome`) and the live `help` text does not explain why it matters. §5.2. |
| 3 | **Stated assumptions and quantified error bars** (absent from all thirteen; 4.2 states nothing at all) | **COVER, and it is the second differentiator** | The copy already exists on the resource sibling and is quantified to the pound. **It must be imported as a SUMMARY, not copied verbatim: gate D12 bans a shared 8-word span.** §5.2. |
| 4 | **The NHS pension accrual the model cannot price** (absent from all thirteen) | **COVER, MANDATORY, and it goes in the `note`, not a footnote** | `house_positions.md` §2.C. **The live FAQ hedges it to "Possibly" and misstates the scheme** (§6.3 point 2). |
| 5 | **Corporation tax as 19% / 25% / marginal relief rather than a flat rate** (4.4 livingstones does this; 4.5 gorilla carries 17%) | **DISCLOSE, do not restate the table** | **O34's neighbour owns the CT table.** But the model charges a flat 25% (§6.4 defect A) and the copy must say so plainly, because **not disclosing a known overstatement is worse than the overstatement.** |
| 6 | **Employer NIC on the director salary** (absent from all thirteen) | **DISCLOSE as an omission** | §6.4 defect B. The resource sibling quantifies it at £1,135.50 on the default salary. |
| 7 | **The dividend rates the model uses** (4.1 uses 8.75 / 33.75, stale) | **STATE THE YEAR, DO NOT TABULATE THE RATES** | **O34.** The `note` may say the model is on the 2026/27 basis and name the rates **once**, because a calculator that hides its rate basis is not honest. **It may not compare them to 2025/26 and may not explain them.** §7.4. |
| 8 | **Email-gating the result** (4.2's first H2 is `Email Calculator Results`) | **DECLINE** | **I7 and the working agreement's standing rule: never create anything that interrupts the owner or the reader without asking.** No new gate, modal or capture is added by this wave. **A `ResultGateModal` already exists in the premium component and pre-dates this programme; no wave touches it.** |
| 9 | **The dividend-calculator keyword family (roughly 40,000 volume, held at positions 1 to 8)** | **DECLINE** | 3.3 point 1. Generalist, O34's subject, and unwinnable from position 33.88. |
| 10 | **A corporation tax calculator** (4.3, 5,400 vol at position 52) | **DECLINE** | Different tool, different owner. |
| 11 | **"Is it worth it" framing as the page's own question** (4.5 gorilla, 4.4 aims) | **DECLINE. One sentence and a link, to a FROZEN page.** | `gp-limited-company-tax-benefits-drawbacks`, 4 clicks at position 5.7. **The live explainer heading is exactly this question.** §5.1. |
| 12 | **A saving range asserted as fact** ("save £5,000 to £20,000 per year", live in OUR explainer; no competitor does this) | **DELETE. F6, hard.** | §6.3 point 4. **This is our defect, not the market's, and it is the only fabricated figure found on any of the four surfaces.** |

---

## 5. Whitespace and the differentiation statement

### 5.0 THE POINT OF THIS SET

Reproduced in all four packs. **Four surfaces, one topic, one compute function. The differentiation is by the
READER'S QUESTION.**

| Surface | The one question it owns | It hands off |
|---|---|---|
| `/blog/medical-practice-incorporation-step-by-step` | **"How do I actually do it?"** The ordered sequence, and the NHS pension-accrual pairing beside every saving. | The relief, the arithmetic, VAT, dividend rates, s.455, "is it worth it". |
| `/blog/incorporation-relief-private-medical-practice-s162` | **"What happens to the tax on my goodwill?"** TCGA 1992 s.162 in full, including the FA 2026 s.39 claim regime. | The process, the running tax, the extraction question, the saving calculation. |
| **`/calculators/private-practice-incorporation`** (this pack) | **"How much, for my numbers?"** One computed comparison from the reader's four inputs, and an honest statement of what the calculation includes, excludes, and cannot price. | Every explanation. Each fact gets one sentence and a link. |
| `/resources/incorporation-private` | **"What does the downloadable model do, and where does it stop?"** The manual for the file. | The decision, the process, the relief, and any live calculation. |

**The deterministic boundary rules:**

- **B1.** Only the s.162 surface may contain `162A`, `first anniversary of the 31 January`, or a worked
  apportionment of a gain.
- **B2.** **Only THIS surface may present a £ figure that is an OUTPUT of `calcIncorporation`.**
- **B3.** The resource surface's £ figures may only quantify a simplification or omission in the model.
- **B4.** Only the step-by-step surface may carry an ordered `<ol>` of incorporation steps or `howtoSteps`.
- **B5.** No wave-C surface states a dividend rate, a CT rate table, a VAT threshold, an s.455 rate or a BADR
  rate except where an O-row awards it. **This surface's single exception is at 4.5 theme 7 and §7.4: the `note`
  may name the dividend basis ONCE, because a calculator that hides its rate basis is not honest.**

**And the rule that separates this surface from the resource sibling, which is the hardest boundary in the set
because both are "how much":**

> **B6. This surface's numbers come only from the reader's inputs. The resource surface's numbers exist only to
> quantify a simplification or an omission in the file. Neither writes the other's.**

Concretely: this page may show a computed comparison and may state the default inputs it ships with. **It may
not carry the resource page's `£80,000 profit, £2,550 marginal relief, 21.8% effective` worked correction**,
because that is the manual's error-bar arithmetic. The resource page may keep it. **Gate D12 catches any shared
8-word span.**

### 5.1 The decision question is not this surface's, and its owner is frozen

`/blog/gp-limited-company-tax-benefits-drawbacks` holds **4 Google clicks from 96 impressions at position 5.7**,
the best incorporation-family performance on the site, and is **frozen to 2026-09-10**.

**This surface currently competes with it in its most prominent block.** The live `explainer.heading` is
`When does incorporating private practice make sense?` and its three paragraphs are a decision essay: when the
admin cost outweighs the saving, what income level makes a structure worthwhile, what the actual position
depends on. **That is a 300-word answer to another page's question, sitting under a calculator.**

**Ruling for the writer: the explainer stops answering "when does it make sense" and starts answering "what does
this number mean and what is missing from it".** Proposed heading direction: what the comparison includes and
what it leaves out. **The decision gets one sentence and a link.**

### 5.2 What no competitor in the set does, and we can do both today

1. **Nobody models an NHS salary underneath the private profit.** All thirteen competitors assume the reader's
   only income is the business. **A doctor's private profit almost always stacks on top of an NHS PAYE salary or
   a partnership profit share, and that is what decides which band the dividends fall into**, which is usually
   what decides the answer. **This surface already has the input.** The live `help` text on it is blank; the
   premium sibling's says "It sits underneath the private income in both columns and determines which tax band
   the private profit or the dividends fall into, which is usually what decides the answer" (the resource page
   makes the same point). **The field help on this page should say why the field exists.**
2. **Nobody states an error bar.** 4.2, which holds our exact intent, states **nothing at all**: zero figures,
   zero rates, zero assumptions, behind an email gate. 4.1 states rates and they are a year old. **A calculator
   that names its own two simplifications, says which direction each one pulls, and names the one factor it
   cannot price at all would be the only one in the set.** We already own that copy on the resource sibling and
   it is quantified to the pound.
3. **Nobody prices the NHS pension line, or admits they cannot.** `house_positions.md` §2.C makes the pairing
   mandatory. **The honest version is the resource page's**: the model compares tax against tax, it has no cell
   for the accrual the company column gives up, that accrual is a defined-benefit promise accruing at 1/54th in
   the 2015 section, and **a positive saving in the model is therefore not on its own a reason to incorporate.**
   **The live FAQ on this surface says "Possibly" and gets the scheme wrong** (§6.3 point 2).

### 5.3 KEEP, explicitly

K1 is a hard fail: the drafted config's count of statutory references, technical terms and figures must be
greater than or equal to the live config's.

- **The four inputs and their defaults** (`privateIncome` £100,000, `nhsIncome` £50,000, `expenses` £15,000,
  `desiredSalary` £12,570). They are sensible and they match the premium sibling. **KEEP; the compute is
  unchanged by this wave.**
- **The `expenses` help text** ("Indemnity, GMC, CPD, equipment, travel, room rental"). **The only genuinely
  medical string on the whole surface.** KEEP and lead with it.
- **`desiredSalary` help ("Usually £12,570 (personal allowance)")**. KEEP the figure; **the premium sibling's
  fuller framing is better** and the resource page's "run it at both £5,000 and £12,570 and compare" is better
  still, because it brackets rather than settles.
- **The `note`'s admission that the model does not cover IR35, the NHS pension interaction or accountancy
  costs.** The list is right; **the framing buries the most important item third.** KEEP the items, reorder.
- **"Speak to a specialist medical accountant before incorporating."** KEEP.
- **Zero em-dashes.** KEEP at zero.

---

## 6. Our current surface, read honestly

### 6.1 What is on it

| | |
|---|---|
| `metaTitle` | `Private Practice Incorporation Calculator \| Sole Trader vs Ltd Company` (69 chars) |
| `metaDescription` | `Free calculator: compare sole trader vs limited company tax for UK doctors with private practice income. 2026/27 dividend tax rates. Instant savings estimate.` (155 chars) |
| `oneLiner` | `Sole trader vs limited company for medical private practice. 2026/27 dividend tax rates and 25% CT.` |
| `name` | `Private Practice Incorporation Calculator` · `category`: `Incorporation` |
| Inputs | 4 (`privateIncome`, `nhsIncome`, `expenses`, `desiredSalary`) |
| Output rows | 5, plus a headline and a 32-word `note` |
| `explainer` | 1 heading, **3 paragraphs** |
| `faqs` | **4** |
| `workedExamples` | **NONE. The field is supported by the route and unused.** |
| Em-dashes | 0 |

### 6.2 Blunt read

**The tool is well-shaped, the inputs are the right ones, and almost every sentence of prose around it is
either a year out of date, another page's fact, or a claim we cannot support.** The `explainer` in particular
contains the only fabricated figure found on any of the four wave-C surfaces.

### 6.3 HOUSE-POSITION CONTRADICTIONS ON THE LIVE COPY

**Listed, not fixed. All are fixable by the writer because the grade is REFRAME and they are all strings.**

1. **THE WORST ONE: a wrong statute and a future-framed live rate in a single sentence.**
   FAQ 2, `What is the dividend allowance?`, verbatim:
   > "Above the allowance, dividends are taxed at 8.75% (basic), 33.75% (higher) or 39.35% (additional) **in
   > 2025/26, rising to 10.75%/35.75%/39.35% in 2026/27 under FA 2025 changes**."

   Three defects in one clause. **(a)** The Act is wrong: the change is **Finance Act 2026 section 4**
   (`house_positions.md` §5 and the verification log; FA 2026 c. 11, Royal Assent 18 March 2026). **There is no
   "FA 2025" dividend change.** **(b)** "rising to ... in 2026/27" frames a live rate as an upcoming change,
   which §5's writing rule forbids in terms: "The 10.75% / 35.75% rates are live now, so do not write them as an
   upcoming change." **(c)** It presents 8.75% and 33.75% as the operative rates, which they have not been since
   6 April 2026. **The page's own `metaDescription` and `oneLiner` both say "2026/27 dividend tax rates", so the
   surface contradicts itself.**

2. **THE SECOND WORST: the pension answer is hedged, and it describes the wrong scheme.**
   FAQ 1, `Will incorporation affect my NHS pension?`, verbatim:
   > "**Possibly.** If you operate outside IR35 and route private work through a limited company, that income
   > **may** not count as NHS pensionable pay (which can affect your **final salary calculation** in certain
   > scheme sections). For GP partners, the interaction is different."

   **(a)** `house_positions.md` §2.C: "**State plainly: dividends are not pensionable.**" There is no
   "possibly" and no "may": company income is not NHS-pensionable, full stop, and for a consultant only the NHS
   post is ever pensionable. **(b)** "final salary calculation" is the wrong framing: **everyone accrues in the
   **2015 section** from 1 April 2022 and the 2015 scheme is CARE, not final salary** (§2, practical writing
   rule: "Do NOT describe the 2015 scheme as final salary"). **(c)** "For GP partners, the interaction is
   different" is true and unhelpful; §2.C says what the difference is (the practitioner certification route).
   **(d)** The whole answer inverts §2.C's mandatory pairing: the pension loss is presented as a possible
   complication rather than as the counterweight to the saving the calculator has just displayed.

3. **A corporation tax rate stated as fact that contradicts §5.**
   `explainer` paragraph 1: "**A limited company pays 25% corporation tax**, then dividends carry a lower tax
   rate than income tax on the same profit". `house_positions.md` §5: **19% on profits up to £50,000, 25% above
   £250,000, marginal relief between (standard fraction 3/200, unchanged for the financial year beginning
   1 April 2026), effective marginal rate about 26.5%.** The `oneLiner` repeats it ("25% CT") and the output row
   label says `Ltd co: corporation tax (25%)`.
   **This is not only a copy defect: the compute does charge a flat 25%** (§6.4 defect A), so the copy is
   accurately describing a model that is wrong. **The fix is disclosure, not silence** (4.5 theme 5).

4. **A FABRICATED SAVING RANGE. F6, hard fail.**
   `explainer` paragraph 2, verbatim: "At private practice income below roughly **£50,000 to £70,000**, the
   administrative cost and accountancy fees of running a company often outweigh the tax saving. Above £100,000
   of consistent private income, a specialist structure that allows income splitting with a spouse can save
   **£5,000 to £20,000 per year** depending on circumstances."
   **Neither range has a source, and neither is derivable from the model on the same page.** F6 forbids a figure
   without a named source; I6 forbids invented statistics. **It is also flatly against `house_positions.md`
   §5's headline point**: "at 2026/27 rates the pure tax saving from incorporating private work is **modest** at
   typical profit levels ... Do NOT present incorporation as a clear tax win at typical private-income levels in
   2026/27." **A £20,000 upper bound presented on the calculator page is the opposite of that instruction.**
   **DELETE both ranges.**

5. **The headline presents a saving before the pension line exists.** `headline.label` is
   `Annual saving by incorporating` with `tone: "good"`, and the `sub` is a monthly saving figure. The `note`
   then lists the NHS pension interaction third among things the model "does not model". **§2.C requires the
   pairing, and the premium sibling already does it better**: it carries an `NHS Pension impact` row inside the
   breakdown, always present, described in its own source comment as "compliance non-negotiable". **This surface
   should carry the same row.**

6. **The `explainer`'s third paragraph gestures at facts it does not own and cannot support.**
   "The actual position depends on IR35 status for each engagement, carry-forward pension planning, **NHS
   pension carry-in amounts**, and whether the company structure is **sustainable under current HMRC
   practice**." **"NHS pension carry-in amounts" is not a term in `house_positions.md` or in NHS pension
   guidance**, and "sustainable under current HMRC practice" is an unsourced insinuation about HMRC challenge.
   **Both are unverifiable and should go.**

7. **`workedExamples` is empty and the route renders it.** The field exists, the page has a `Worked examples`
   section ready for it, and **this is the ONE surface in wave C permitted to show output figures** (B2). **G1's
   worked-example mandate is unmet on the surface best placed to meet it.**

8. **FAQ 3 (spouse shares) is O34-adjacent and unsourced.** "Both arrangements are legitimate tax planning, but
   must have commercial substance. HMRC scrutinises situations where a dividend-only spouse has no real
   involvement." The substance is right (`house_positions.md` §5 names **BIM37700+** for spouse wages), **but
   the manual anchor is absent and the dividend-splitting half is O34's**, not this surface's.

9. **FAQ 4 (running costs) states "£1,500 to £3,000 per year" accountancy fees with no source.** **F6.** It is
   also our own pricing territory, on a lead-generation site that carries no pricing by standing rule
   (`agency_lead_gen_model`: anonymised social proof only, no pricing). **DELETE or source.**

10. **`metaTitle` is 69 characters.** The estate's SERP work caps `metaTitle` around 60 and
    `metaDescription` at 155. The description is at 155 exactly, which is at the limit. **A REFRAME can fix the
    title; note that `metaTitle` is also the `SoftwareApplication` schema `name` and the OG image title, so it
    is doing three jobs.**

11. **V5 / V9 check on the live copy: clean.** No `it is not X, it is Y`, no numeral-count openers, no
    self-announcing sufficiency claims. **V2 check: clean.**

12. **C3 / C4 check.** `you` and `your` appear 21 times in roughly 640 words of prose (**33 per 1,000**, band 12
    to 25, **above band**). `we`, `our`, `us`: **0** (cap 3). **The second-person density is a calculator-copy
    artefact and should come down naturally as the explainer stops being an essay.**

### 6.4 THREE DEFECTS THAT ARE NOT COPY, AND A WRITER MUST NOT TOUCH THEM

**These are in `compute/incorporation.ts` and `premium/configs/incorporation-premium.ts`. They are covered by
`compute/medical-tools.test.ts` and `premium/premium-tools.test.ts`, they change a live calculation, and they
are manager-direct work.** They are recorded here because **the copy this pack commissions must not describe a
model that does not exist**, and because two of them mean the four surfaces currently disagree with each other.

> **DEFECT A. Corporation tax is charged at a flat 25%, and the director salary is deducted AFTER it.**
>
> ```ts
> // compute/incorporation.ts
> const corporationTax = companyProfit * 0.25;
> const profitAfterCT  = companyProfit - corporationTax;
> const dividendAmount = profitAfterCT - desiredSalary;   // salary taken AFTER tax
> ```
> Two separate problems in three lines. **(a)** The flat 25% ignores the 19% small-profits rate and marginal
> relief (`house_positions.md` §5). On the shipped default of £85,000 profit it overstates corporation tax by
> roughly £2,500. **(b)** A director's salary is a **deductible expense of the company** and should reduce the
> profit chargeable to corporation tax. Here it is subtracted from the post-tax balance, so the company is taxed
> on the salary as well. **Both errors push the same way: they understate the company column and therefore
> understate the saving.**
>
> **And the resource sibling documents the OPPOSITE behaviour.** `/resources/incorporation-private` says, of the
> spreadsheet: "The limited company column takes the same profit, **deducts the director salary, charges
> corporation tax on what is left**". **So the manual and the live calculator disagree about the order of two
> operations, and a reader who uses both gets two different answers.** That is the finding, and it is worse than
> either error alone.

> **DEFECT B. Employer NIC on the director salary is not charged at all.** The company pays secondary Class 1 at
> **15% above a £5,000 secondary threshold** and the Employment Allowance does not relieve a single-director
> company (`house_positions.md` §5). On the shipped default £12,570 salary that is **£1,135.50 a year**. The
> resource sibling names this, quantifies it, and says which way it pulls. **The calculator neither charges it
> nor discloses it.**
>
> **Net of A and B**, the resource page's own arithmetic gives the direction: the two omissions leave the
> company column roughly **£1,400** better off than the model shows on its worked figures. **The model is
> conservative overall, which is the safe direction, and that is not a reason to leave it undisclosed.**

> **DEFECT C. The two "net income" rows displayed side by side are not comparable.**
> ```ts
> const soleTraderNetIncome     = soleTraderTaxableIncome - soleTraderTotalTax;      // includes NHS income tax
> const limitedCompanyNetIncome = nhsIncome + desiredSalary + dividendAmount - dividendTax;  // omits nhsIncomeTax
> ```
> `soleTraderNetIncome` is net of income tax on the NHS salary; `limitedCompanyNetIncome` is not. **The two
> numbers are rendered adjacent as `Sole trader: net income` and `Ltd co: net income`, and the company one is
> overstated by the tax on the NHS salary, which on the shipped defaults is several thousand pounds.**
> The headline `taxSavings` is computed from `totalTax` on both sides and **is** consistent, so the headline is
> right and two of the five visible rows are misleading. **The premium sibling renders the same two values as a
> `Net after tax` chart series, so the defect is on both surfaces.**

> **DEFECT D. Internal ground-truth codes are rendered to the reader, on every incorporation blog post.**
> `premium/configs/incorporation-premium.ts` puts these strings into fields that
> `PremiumCalculator.tsx` renders as visible text (`field.help` at lines 158, 207, 234, 281; the breakdown rows;
> the `note`):
> - field help: `"... it uses your personal allowance and basic-rate band first **(HP §2.C)**."`
> - field help: `"Often set near the £5,000 secondary threshold for a single-director company **(HP §5)**."`
> - breakdown row: `"Company dividends are not NHS pensionable ... loses NHS accrual **(HP §2.C)**."`
> - `note`: **five further `(HP §5)` and `(HP §2.C)` codes** inside a single 150-word paragraph.
>
> **That is seven inline house-position codes visible to readers**, and it is precisely the
> "pipeline-artefact leakage such as ... inline '(HP12)' codes" the editorial QA track exists to catch (working
> agreement §4). **Traced to the call site, not inferred**: `field.help` is rendered in four places in
> `PremiumCalculator.tsx`, and the component is mounted mid-scroll by `BlogPostRenderer` on every post in the
> `Incorporation & Company Structures` and `Private Practice` categories, **which is both wave-C blog surfaces
> and at least four other live posts.**
>
> **The premium `note` also states the CT structure correctly** ("CT 19% to £50,000, 25% above £250,000,
> marginal relief between") **while the shared compute charges a flat 25%** (defect A). **So the premium note
> describes behaviour the model does not have, and this page's note describes what it actually does. Two
> surfaces, one model, two incompatible disclosures.**
>
> It also states **an s.455 rate of 35.75%**, which is another page's fact (§7.4, and the proposed row `C3-01`).

**None of A to D is fixed by this task and none is a writer's to fix.** §10.1 sets out what the manager has to
decide, and §7.7 constraint 1 tells the writer what to do in the meantime.

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgment.

### 7.1 THE NAMED MISSING-PHRASE LIST

**10 phrases.** Every one verified absent from the live config on 2026-09-01 by verbatim search, case and
punctuation normalised.

**V1 IS BINDING.** Two word orders per idea per surface, hard cap, **non-overlapping longest matches, never raw
substrings**. **Any V1 finding must quote the spans it counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `sole trader or a limited company` (or `limited company or sole trader`) as a natural phrase in the intro | The comparison, in the market's word order | 1 of 2 | Harvest: `limited company or sole trader` 6,600, `sole trader or limited company` 6,600, both held at positions 95 to 106. **The page says "sole trader vs limited company" only, in the metaTitle.** |
| 2 | `sole trader vs limited company calculator` | The comparison, in the market's word order | 2 of 2 | Harvest: 320 vol at position 46; `ltd company vs sole trader calculator` 320 at 38; `sole trader vs limited company tax calculator` 140 at 47. **780 volume, held by a black box.** 3.3 point 2. |
| 3 | `NHS salary` (or `NHS pay`) named in the field help as the thing that sets the band | The NHS-salary input | 1 of 1 | §5.2 point 1. **Absent from all thirteen competitors and from this field's help, which is empty.** |
| 4 | `not NHS pensionable`, stated flatly, without `possibly` or `may` | The pension, stated plainly | 1 of 2 | `house_positions.md` §2.C: "State plainly: dividends are not pensionable." §6.3 point 2. |
| 5 | `1/54th` or `defined benefit` describing what the company column gives up | The pension, stated plainly | 2 of 2 | §2.C. **The resource sibling says it; this surface does not.** |
| 6 | `2015 section` (replacing the `final salary` framing) | Scheme accuracy | 1 of 1 | §2: everyone accrues in the 2015 section from 1 April 2022 and it is CARE. §6.3 point 2. |
| 7 | `marginal relief`, disclosed as something the model does NOT apply | The error bar | 1 of 2 | §6.4 defect A. **Disclosure, not a rate table.** |
| 8 | `employer National Insurance`, disclosed as something the model does NOT charge | The error bar | 2 of 2 | §6.4 defect B. |
| 9 | `Finance Act 2026` (replacing `FA 2025`) | Statutory accuracy | 1 of 1 | §6.3 point 1. **A wrong statute on a live page.** |
| 10 | `2026/27` attached to the dividend basis in the `note` | Currency | 1 of 1 | The `note` says "for 2026/27" already; **the check is that the rewrite does not lose it while FAQ 2 is corrected**, and that the surface stops contradicting itself. |

**Countable test: 10 of 10 present. Any other absent phrase is a named BLOCK.**

**Explicitly NOT on this list, with the reason on the record:**
- **The dividend-calculator family** (`dividend tax calculator`, `salary and dividend calculator` and roughly 38
  siblings, about 40,000 volume, held at positions 1 to 8). **DECLINED** at 3.3 point 1 and 4.5 theme 9:
  generalist, O34's subject, unwinnable.
- **`corporation tax calculator`** (5,400 at position 52). **DECLINED**, different tool, different owner.
- **Any `should I incorporate` or `is it worth it` phrasing.** **DECLINED** at §5.1: the owner holds position
  5.7 and is frozen.
- **`162A`, the claim deadline, any apportionment.** B1, the s.162 surface.
- **Any incorporation step phrasing.** B4, the step-by-step surface.

### 7.2 Equity preservation (§9.9 floor 5)

**The equity set is EMPTY: 0 named Bing queries, 0 Google query rows** (§2). Nothing can be lost.

**Countable test: 0 of 0, recorded as "empty, verified by fresh pull 2026-09-01", never as "not run".**

### 7.3 CROSS-SURFACE DUPLICATION GATE

Run over the four wave-C surfaces **together**, after all four are drafted, by the conductor.

| # | Gate | Pass condition |
|---|---|---|
| D1 | `162A` on this surface | **0** |
| D2 | `first anniversary of the 31 January` on this surface | **0** |
| D3 | Any apportionment of a gain between share and non-share consideration | **0** |
| D4 | Ordered list of incorporation steps on this surface | **0** (B4) |
| D5 | Dividend percentage figures on this surface | **at most 3, all inside the `note`, all 2026/27** (the 4.5 theme 7 exception). **`8.75` and `33.75` must be 0.** |
| D6 | Corporation tax percentage figures on this surface | **at most 2** (the flat rate the model uses, and the disclosure that the real structure differs). **No rate table, no `3/200`, no `26.5%`.** |
| D7 | `£90,000`, `£88,000`, `30 days`, `partial exemption` | **0** |
| D8 | s.455 percentage figures on this surface | **0** |
| D9 | BADR percentage figures on this surface | **0** |
| D10 | Any heading string on this surface containing `worth it`, `make sense`, `benefits`, `drawbacks`, `pros`, `cons`, or `should I` | **0** (§5.1: the live explainer heading fails this today) |
| D11 | £ figures on this surface that are NOT an output of `calcIncorporation`, not a stated default input, and not a rate | **0** (B2, B6) |
| D12 | Occurrences of the same >= 8-word span on this surface and any other wave-C surface | **0**. **This gate is aimed at the resource sibling specifically: its error-bar copy is the right copy and must be summarised, never lifted.** |
| D13 | Fabricated or unsourced £ ranges (a saving range, a fee range, an income threshold) | **0** (F6). §6.3 points 4 and 9. |

### 7.4 Arithmetic, and the figures that are BANNED

**G1 is met on this surface by populating `workedExamples`, which the route renders and which is currently
empty** (§6.3 point 7). **Exactly one** worked example. **This is the only wave-C surface permitted to show
`calcIncorporation` outputs (B2), so it is the only one that can meet G1 with real comparison arithmetic.**

**Every figure in it must be re-derived from stated inputs by `arithmetic_recomputed[]`, and it must reproduce
what the live model actually returns**, not what the model ought to return. **If the worked example and the live
calculator disagree on the same inputs, that is a hard fail**, and it is the check that would have caught
defects A and C.

**G3's five components in order; G4** (role plus an initial only, explicitly illustrative, never a real
practice); **G6** (the block must not open with a `Worked example:` prefix; **the corpus already contains that
string in 13 files**); **G7** (80 to 200 words), **which collides with C2's 75-word paragraph maximum, so the
example splits across paragraphs and QA must not read the split as a missing component** (BATCH3_INDEX
pack-defect 5).

**PERMITTED figures on this surface:**

| Figure | Source |
|---|---|
| Any **output of `calcIncorporation`** for stated inputs | The live model. B2. |
| The four **default inputs** (£100,000, £50,000, £15,000, £12,570) | The config |
| **£12,570** personal allowance, **£50,270** basic-rate limit, **£125,140** additional-rate threshold | `house_positions.md` §5, verified at gov.uk 2026-08-26 |
| **Class 4 NIC 6%** then **2%** above £50,270 | §5 |
| **£500** dividend allowance | §5 |
| **10.75% / 35.75% / 39.35%** dividend rates, **2026/27**, named ONCE in the `note` as the model's basis | §5, FA 2026 s.4. **The 4.5 theme 7 exception. No comparison to 2025/26, no explanation.** |
| The **flat 25%** the model charges, **stated as the model's simplification and not as the law** | §6.4 defect A |
| **15%** employer secondary Class 1 above **£5,000**, named ONCE as something the model does NOT charge | §5, §6.4 defect B |
| **1/54th** accrual, **2015 section**, CARE | §2, §2.C |

**BANNED FIGURES on this surface:**

| Banned | Why | Instead |
|---|---|---|
| **`8.75%` and `33.75%`** | Prior-year rates presented as current (§6.3 point 1). §5: treat them as historic. | Not stated at all. This surface has no reason to carry a prior year. |
| **`FA 2025`** | **There is no FA 2025 dividend change. It is Finance Act 2026 s.4.** | `Finance Act 2026`. |
| **The corporation tax rate TABLE (19% / £50,000 / £250,000 / 3/200 / 26.5%)** | **O34's neighbour**, `/blog/gp-corporation-tax`. The model's flat 25% is disclosed; the real structure is linked, not tabulated. | One sentence of disclosure, then link. |
| **Any s.455 rate, the 9-months-and-1-day timing, `section 458`** | `/blog/consultant-directors-loan-account-s455-medical-company`; proposed row `C3-01`. **The premium sibling states 35.75% today** (§6.4 defect D). | Not stated. |
| **Any BADR rate, `£1 million lifetime limit`, the 24% main CGT rate** | Wave F; proposed row `C3-02`. | Not stated. |
| **`£90,000`, `£88,000`, the 30-day rule, partial exemption, Sch 9 Group 7** | **O21-VAT and O17. Owner `/blog/gp-vat-registration` is FROZEN to 2026-09-10.** | Not stated. |
| **Any annual allowance figure, taper threshold, or MPAA** | **O2**, `/calculators/nhs-pension-annual-allowance`. **That calculator is a sibling on the same route and earns 19 Bing impressions; linking to it is correct, restating its figures is not.** | One sentence, then link. |
| **Any Scheme Pays deadline** | **O4. `nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date. The exact fact that broke batch 1.** | Nothing. |
| **Any GMC annual retention fee** | **O9. UNVERIFIED. Hard fail F5.** The `expenses` help names the GMC and must not price it. | Nothing. |
| **`£5,000 to £20,000` saving, `£50,000 to £70,000` threshold, `£1,500 to £3,000` fees, or ANY range asserted without a source** | **F6, I6, and `house_positions.md` §5's "do NOT present incorporation as a clear tax win".** §6.3 points 4 and 9. **This is the surface's worst defect.** | **Delete. Say nothing in their place.** The model on the same page gives the reader a number for their own inputs, which is better than a range. |
| **`NHS pension carry-in amounts`, `sustainable under current HMRC practice`** | Not terms in `house_positions.md` or NHS pension guidance; the second is an unsourced insinuation. §6.3 point 6. | Delete. |
| **Any pricing for our own services** | Standing rule: the lead-gen sites carry no pricing and no client names. | Nothing. |
| **"a limited company cannot hold a GMS or PMS contract" flat** | §2.C correction, 2026-08-26. **Note the premium sibling uses the approved form; this surface currently says nothing at all, which is its own gap.** | The approved unpinned form, once. |
| **`possibly` / `may not count` about pensionability** | §2.C: **state plainly**. §6.3 point 2. | The flat statement. |
| **`final salary` describing the 2015 scheme** | §2. | `2015 section`, CARE. |

**Countable test: count of banned-figure assertions = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| Dividend rates 2026/27 (10.75 / 35.75 / 39.35, £500 allowance), **FA 2026 s.4** | https://www.gov.uk/tax-on-dividends (now headed "6 April 2026 to 5 April 2027") and https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted ; `house_positions.md` §5 |
| Corporation tax 19% / 25% / marginal relief 3/200, unchanged for FY beginning 1 April 2026 | https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax ; §5 |
| Employer secondary Class 1 at 15% above a £5,000 secondary threshold; Employment Allowance £10,500 not available to a single-director company | https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions and https://www.gov.uk/claim-employment-allowance ; §5 |
| Income tax bands and Class 4 NIC 6% / 2% for 2026/27 | https://www.gov.uk/income-tax-rates and https://www.gov.uk/self-employed-national-insurance-rates ; §5 |
| Company income and dividends are not NHS-pensionable; only the NHS post is pensionable for a consultant; **2015 section, 1/54th, CARE** | `house_positions.md` §2, §2.C |
| A doctor's ordinary personal service company cannot hold an NHS contract, **in the approved unpinned form**; **s.86 is GMS only, PMS is s.92 with detail in s.94 regulations** | https://www.legislation.gov.uk/ukpga/2006/41/section/86 and /section/92 ; §2.C correction. **Do not assert a PMS shareholder test.** |
| **BIM37700+ for spouse wages, if FAQ 3 survives** | https://www.gov.uk/hmrc-internal-manuals/business-income-manual ; §5 |
| **That the four inputs and the shipped defaults produce the figures used in `workedExamples`** | **Run `calcIncorporation` and record the outputs.** §7.4. **This is the check that catches a copy-model divergence.** |

**Countable test: every external factual claim maps to a row above with a fetch date. Count of unverified
claims = 0. Any row that fails verification is DROPPED, not softened.**

### 7.6 Floors

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py` | **Not applicable to a TSX surface; the covered set is empty (§7.2).** Record as empty-verified, never as "not run". |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure in `workedExamples` re-derived from stated inputs **and reproduced by running `calcIncorporation`**. A divergence is a hard fail. |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. **Build and tests** | `tsc --noEmit`; the tool test suites (`compute/medical-tools.test.ts`, `premium/premium-tools.test.ts`) | **Both green. A TS surface fails differently from a markdown one and this floor does not exist in the blog packs.** |
| 5. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s; every link resolves. **No link to `/blog/private-practice-incorporation-complete-guide`, which 301s.** |
| 6. Equity preservation | §7.2 | **0 of 0**, empty-verified |
| 7. Cluster coverage | §7.1 | **10 of 10** phrases placed |
| 8. Competitor re-read | §4.5 | **12 themes, 12 decisions, 0 undecided** |
| 9. Cross-surface duplication | §7.3 | **13 of 13 gates pass** |
| 10. Voice bands | §6.3 point 12 | `you`/`your` **12 to 25** per 1,000 words of prose; `we`/`our`/`us` **at or below 3** |
| 11. Structure | G1, schema | **`workedExamples` populated with exactly 1 example**; **`faqs` 4 to 8**; `metaTitle` **at or under 60 chars**; `metaDescription` **at or under 155** |
| 12. Em-dashes | I1 | **0** |
| 13. **Copy-model consistency** | Manual | **Every claim the copy makes about what the model does is true of `calcIncorporation` as it stands.** §7.7 constraint 1. |

### 7.7 Extra hard constraints

1. **THE ONE THAT MATTERS MOST: the copy describes the model as it IS, not as it should be.** Defects A, B and C
   (§6.4) are not the writer's to fix. **So the `note` and the explainer must disclose the flat corporation tax
   rate and the missing employer NIC as simplifications, in the model's own direction, and must not claim
   marginal relief or employer NIC are applied.** If the manager fixes the compute first (§10.1), the copy is
   rewritten to match **in the same change**, and never before.
2. **No em-dashes (U+2014) anywhere.** Live count 0, must stay 0. I1, hard fail.
3. **Do not edit `compute/incorporation.ts`.** It is shared with the premium tool and covered by two test
   suites. §10.1.
4. **Do not edit `premium/configs/incorporation-premium.ts` as part of this wave without a manager decision.**
   Its artefact leak (defect D) renders on **both wave-C blog surfaces**, so it is in scope for wave C's outcome
   and out of scope for a content writer. §10.1.
5. **No new interruptive UI, no gate, no modal, no capture.** I7 and the standing rule. **A `ResultGateModal`
   already exists in the premium component and pre-dates this programme; no wave touches it, and the two
   site-wide surfaces `DeepScrollModal` and `ReturningBar` in `src/app/layout.tsx` are likewise untouched**
   (defect D6). **Declining 4.5 theme 8's email gate is a deliberate decision, not an oversight.**
6. **No named individual, no credential, no byline.** I2.
7. **Never state or imply that a doctor's ordinary personal service company can hold an NHS contract**, and
   never state the flat "no limited company can". §2.C.
8. **Never describe the 2015 NHS scheme as final salary.** §2.
9. **Never state that 2025/26 is the current tax year**, and never write the 2026/27 dividend rates as an
   upcoming change. §5.
10. **Never present incorporation as a clear tax win**, and never assert a saving range. §5, F6, I6.
11. **Never use UDAs, dental bands or any dental framing.** §3.
12. **One change per surface per window** (§9.3).
13. **`metaTitle` does three jobs** (page title, OG image title, `SoftwareApplication` schema `name`). Changing
    it changes all three. **Keep it a name, not a sentence.**

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

**Site context.** Google 108 clicks / 10,168 impressions / 90d at impression-weighted position 33.88, **18 of
139 URLs indexed, 51 never fetched**. Bing 360 clicks / 9,818 impressions (`GetRankAndTrafficStats`).
**Bing out-clicks Google 3.3x.**

**And the context specific to this surface, which is better evidence than the site total:** six sibling
`/calculators/` URLs earn Bing page-level impressions and five convert a click, while **not one of them earns a
single Google impression** (§2.2). **On this domain a calculator is a Bing surface. That is what this page's
expectation is built on.**

### 8.2 The read at 14 to 28 days, Bing (primary)

1. **First page-level appearance.** This URL appears in **at least 1** weekly Bing `GetPageStats` snapshot
   inside 28 days. Today it appears in none. **Endpoint named: `GetPageStats`, page level.** **Top-N caveat:
   appearing is the signal, absence is not proof of zero.**
2. **First named-query impression.** At least **2 of the 10** phrases in §7.1 return at least one
   `GetPageQueryStats` impression for this URL inside 28 days. **Today: 0 of 10.** **Endpoint named:
   `GetPageQueryStats`, named-query level, and it is never compared to the page-level figure in point 1.**
3. **The comparable to judge it against.** `/calculators/salaried-gp-vs-partner` sits at 16 page-level
   impressions and 3 clicks over the 90-day window, which pro-rates to roughly **5 impressions and 1 click per
   28 days**. **That is the realistic ceiling for a calculator on this domain and it is what "working" looks
   like here.** It is context, not a target.
4. **Clicks.** **No click target at 28 days.** A first click on a surface with no history is not a measurable
   expectation.
5. **Per §9.6 point 2, site traffic rising while these 10 phrases stay at zero is DRIFT and is a FAIL.**

### 8.3 The read at 28 to 90 days, Google, and the honest statement

**Google is crawl-starved on this domain and this surface must not be promised a position lift** (§5.3).
STATE 2026-09-01: **18 of 139 URLs indexed, 117 not, 51 unknown to Google entirely.** **Zero of the eight
`/calculators/` URLs earns a Google impression today**, which is a stronger statement about this namespace than
the site average.

6. **Indexation, not ranking.** By day 90 this URL moves out of `URL is unknown to Google` or
   `Discovered - currently not indexed` into `Indexed`, measured by
   `python -m optimisation_engine.snapshot.index_coverage medical --fresh --skip-bing`.
   **LOW confidence, not in this surface's gift, and the not-indexed side of that sweep carries +/- 6** (the
   same sweep twice, twenty minutes apart, moved six URLs across the discovered/unknown boundary).
7. **No impression target and no position target is set, deliberately.** **Given that no calculator on this
   domain has ever earned a Google impression, setting one would be manufacturing a failure.**

### 8.4 Failure triggers (§9.6, written as numbers, before the change)

> **TRIGGER 1, THE ONE THAT IS NOT ABOUT TRAFFIC. If the copy shipped on this surface states, implies or
> illustrates a model behaviour that `calcIncorporation` does not have, revert immediately, whatever the
> numbers say.** Floor 13 and §7.7 constraint 1. **A calculator that describes a different calculation is worse
> than no calculator, and the four surfaces already disagree about corporation tax today** (§6.4 defect A).

> **TRIGGER 2, the frozen neighbour.** If `/blog/gp-limited-company-tax-benefits-drawbacks` (4 clicks / 96
> impressions / position 5.7) falls below **position 9.0** on the GSC `page` dimension, or below **2 clicks** in
> a rolling 28-day window, between deploy and deploy+90 days, treat wave C as the prime suspect and revert this
> surface and the step-by-step page first. §5.1.

> **TRIGGER 3, self-competition inside the set.** If, at the 28-day read, two or more of the four wave-C
> surfaces return Bing impressions for the **same** named query, the differentiation has failed and the
> conductor re-reads §5.0 before any further change to any of the four.

> **TRIGGER 4, the calculator namespace.** If the combined Bing page-level impressions across the eight
> `/calculators/` URLs (**71 in the current window**, of which this page is 0) fall below **50** in a rolling
> 28-day-equivalent window after deploy, the change is suspected of harming the namespace and is reverted.
> **This is the only trigger in wave C with a non-zero baseline to fall from.**

> **TRIGGER 5, quality.** If editorial QA raises a **V1, V3 or V5 finding on three or more** of the four
> surfaces, wave C has reproduced the batch-1 defect and its pages are **held rather than deployed**.

**Revert path, restated.** `git revert <the wave-C commit>`, sha derived live at revert time. Single-file:
`git checkout 4702b8bd702ab55e3776139a8ff23b4c8e636e01 -- Medical/web/src/lib/tools/configs/incorporation-calculator.ts`,
**followed by `tsc --noEmit` and both tool test suites.** **No `monitored_pages` row exists for this surface and
none is created by this wave; registration is owner-gated, post-deploy.**

**Tracker discipline (§9.6).** If this surface is tracked at all, its target keywords are the **10 phrases of
§7.1**. **Note that `blog_optimizations` is a blog table and this is a TSX route: the tracker may have no row
shape for it, which is a real gap and is recorded at §10.3 rather than worked around.**

---

## 9. The ownership map, reproduced

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a brief and the map disagree, THE MAP WINS.**

### 9.1 This surface owns no O-row, and that is the point

**No row in the map names a calculator as the owner of an incorporation fact.** O33 (and the proposed O33a /
O33b split, step-by-step pack §9.2) covers the prose. **This surface's job is the computation, and under §5.0's
B2 it is the ONLY wave-C surface permitted to show an output figure.** That is its exclusive territory and it
is not an O-row, because the map governs facts and this governs a number.

**Stated positively for the writer: everything on this surface that is not the reader's own number is one
sentence and a link.**

### 9.2 THE ROWS THAT CONSTRAIN THIS SURFACE

| # | Shared fact | Owner | **What THIS surface does** |
|---|---|---|---|
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link. No figure.** The owner is a sibling on the same route earning 19 Bing impressions, so the link is genuinely useful and the restatement genuinely is not. |
| **O4** | Scheme Pays | `/calculators/nhs-pension-scheme-pays` | **No batch-3 surface states a Scheme Pays deadline. The exact fact that broke batch 1.** Also a sibling on this route (15 Bing impressions). Link only. |
| **O9** | GMC annual retention fee, **amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page states a GMC fee figure. Hard fail F5.** The `expenses` help names the GMC and must not price it. |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) | **Nothing.** |
| **O21-VAT** | The £90,000 threshold, 30-day rule, £88,000 deregistration limit | `/blog/gp-vat-registration` (**FROZEN to 2026-09-10**) | **Nothing.** Cited as `O21-VAT`, never `O21`. |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link, if needed. |
| **O33 / O33a** | The incorporation step sequence and the pension-accrual pairing PROSE | `/blog/medical-practice-incorporation-step-by-step` | **One sentence and a link for the process.** **The pension pairing is DIFFERENT: §2.C makes stating the accrual loss mandatory wherever a saving is displayed, and this surface displays one in its headline.** So this surface **states** the pairing in one sentence and does not **explain** it. |
| **O34** | Salary versus dividend extraction (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **The `note` may name the dividend basis ONCE as the model's own basis** (4.5 theme 7, the single B5 exception). **No comparison of years, no explanation, no rate table.** Everything else is one sentence and a link. **This is the tightest constraint on this surface, because its entire output is a salary-plus-dividend extraction.** |
| **O35** | The employment-status fork for doctors | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** Relevant because the `nhsIncome` field means different things for a partner and a salaried GP. |
| **C3-01** (proposed, step-by-step pack §10.2) | s.455 rate, timing, s.458 deferred relief | `/blog/consultant-directors-loan-account-s455-medical-company` | **Nothing. No rate.** **The premium sibling breaches this today** (§6.4 defect D). |
| **C3-02** (proposed, step-by-step pack §10.2) | BADR rate band, £1m limit, the 24% rate it saves against | `/blog/selling-private-medical-practice-cgt-badr` (wave F) | **Nothing.** |

### 9.3 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. **This pack proposes no boundary change.** It relies on
the O33a / O33b clarification proposed in the step-by-step pack §9.2 and on the two rows proposed at §10.2
there, applies none of them, and sets its own allowances so that they are safe under either ruling.

### 9.4 Batch-level style watch (V5, V9), and it is the CONDUCTOR's job

Batch 1 produced `it is not X, it is Y`. Batch 2 produced the numeral-count paragraph opener. Round 3 of the
2026-08-26 batch found a fourth tic forming: self-announcing sufficiency claims. **V9 is explicit that banning a
tic produces the next one.**

1. **Any single sentence-opening or clause shape appearing more than twice on one surface, or clustering across
   the four, is named in wave C's fix pass, whatever it is.**
2. **Named and burned, do not reach for any:** `it is not X, it is Y` (cap once per surface, wave-wide); the
   numeral-count paragraph opener (cap once, prefer zero); the self-announcing sufficiency claim (prefer zero).
   **This surface's live copy is clean on all three** (§6.3 point 11), **so its whole budget is available and
   the correct spend is still zero.**
3. **A calculator-specific risk the blog packs do not carry:** explainer paragraphs and FAQ answers are short
   and structurally similar, which is exactly the condition that produced batch 2's convergence. **The
   conductor should read the four FAQ answers together, not one at a time.**
4. **V1 hard cap: two word orders per idea per surface, non-overlapping longest matches, never raw substrings.**
5. **V2 is a live standard, not a batch-2 rule.**
6. **Process narration is banned** (conductor ruling 3, 2026-08-26). Write "the detail sits on X" and link it.

---

## 10. Corrections, findings and escalations

**None was acted on. Nothing outside this file was written.**

### 10.1 THE MANAGER DECISION THIS SURFACE NEEDS, and it is the only genuine blocker in wave C

**Four defects sit in code, not copy** (§6.4): a flat 25% corporation tax with the director salary deducted
after it (A), no employer NIC (B), two non-comparable "net income" rows (C), and seven internal `(HP §…)` codes
rendered to readers on every incorporation blog post (D).

**They matter to a content wave for three reasons.**
1. **The copy this pack commissions has to describe the model that exists.** So either the model is fixed and
   the copy describes the fixed model, or the model stands and the copy discloses the simplifications. **Both
   are shippable. What is not shippable is copy that claims marginal relief while the model charges a flat 25%,
   which is what the premium sibling's `note` does today.**
2. **Defect D is live user-facing text on both wave-C blog surfaces**, so it will be inside the diff's blast
   radius whether or not anyone touches it, and an editorial QA agent reading those pages will raise it.
3. **Defects A and C change displayed numbers**, so fixing them is a measurement event on a surface we are about
   to re-baseline. Doing both in one change destroys attribution (the working agreement's isolate-variables
   rule).

**Recommended sequencing, one line: fix defect D first and alone** (it is a pure string change, it removes
reader-visible artefacts, it changes no number and no test), **then ship the content wave, then decide A, B and
C as a separate measured change after the 28-day read.**

**Blast radius of each, so the decision can be made without re-reading the code:**

| Defect | Files | Tests affected | Changes a displayed number | Reversible |
|---|---|---|---|---|
| D (artefact leak) | `premium/configs/incorporation-premium.ts` strings only | none expected | **no** | trivially |
| A (CT flat rate and salary ordering) | `compute/incorporation.ts` | `compute/medical-tools.test.ts`, `premium/premium-tools.test.ts` | **yes, on both surfaces and the premium chart** | yes, one file |
| B (employer NIC) | `compute/incorporation.ts` | both suites | **yes** | yes |
| C (net income rows) | `compute/incorporation.ts` | both suites | **yes, two visible rows** | yes |

**This task made no code change and expresses no view on whether A to C should be fixed at all**; the model is
conservative in the reader's favour and disclosure may be the right answer. **The decision is the manager's.**

### 10.2 The resource sibling documents behaviour the calculator does not have

`/resources/incorporation-private` says the limited company column "**deducts the director salary, charges
corporation tax on what is left**". `calcIncorporation` charges corporation tax first and deducts the salary
after (§6.4 defect A). **The manual and the live tool describe two different orders of operation, on the same
topic key, linked to each other from both directions.**

**This is not a copy fix.** Either the spreadsheet genuinely does it correctly and the calculator does not, in
which case the calculator has a bug and the manual is right; or the manual describes an intention the file does
not implement either. **Nobody has opened the `.xlsx`**, and this task did not. **Recorded as an open question
for §10.1's decision, with the recommendation that the workbook be opened before either page's copy is
finalised**, because whichever way it resolves, one of the two surfaces is currently wrong.

### 10.3 The tracker has no row shape for a calculator surface

§9.6's tracker discipline says `blog_optimizations.target_keywords` is populated with the pack's missing-phrase
list. **`blog_optimizations` is a blog table**, and two of wave C's four surfaces are not blog posts (this one is
a TSX config; the resource sibling is a `content/resources/*.md` rendered by a different route).

**So half of wave C cannot be tracked the way the spec assumes**, and the 28-day read for those two surfaces has
to be run directly against the Bing and GSC pulls rather than against a tracker row. **Recorded rather than
worked around.** It is a shared-engine gap, it will recur on every site with calculator surfaces, and it belongs
in `REWRITE_PROGRAM.md` rather than in a per-site pack.

### 10.4 Market intelligence worth keeping: the dominant calculator in the peer set is a year out of date

`gorillaaccounting.com/salary-dividend-tax-calculator/` holds roughly thirty keywords at positions 1 to 8,
including **position 1 on several 480-volume phrasings and position 5 on the 6,600-volume head**, and it
computes on **8.75% / 33.75%**, the 2025/26 dividend rates, with no year later than 2025 mentioned anywhere on
the page.

**Two uses.** First, it is direct evidence that **currency is not what wins a calculator SERP**, which should
temper any expectation that being current will move us. Second, it is a standing reminder that **our own FAQ 2
makes the same error in the opposite direction** (§6.3 point 1): it names 2026/27 and then attributes it to the
wrong Act and frames it as forthcoming. **The market being wrong is not a licence to be wrong differently.**

**No action is taken against the competitor and nothing about them appears on our surface** (I2).

---

## 11. Limitations

1. **This surface has no measurement history on either engine**, so §7.1's phrase list is derived from
   competitor evidence, house-positions vocabulary and the model's own limits rather than from our own query
   data. Weaker evidence than the wave-A packs had, stated rather than hidden.
2. **The harvest is a poor map of this surface's intent.** 1,153 keywords in the incorporation family and
   **exactly one** with medical vocabulary (40 volume, a podcast page). The calculator family is 88,760 volume
   of generalist dividend terms held at positions 1 to 8 by one incumbent, and it is declined in full.
3. **Peer-winnable is Google-derived.** On a domain where Bing out-clicks Google 3.3x and **no calculator has
   ever earned a Google impression**, that limitation is at its most severe on this surface. Read every
   peer-winnable figure as a **floor** and prefer §2.2's Bing evidence.
4. **`GetPageStats` is a top-N endpoint.** The zeros in §2 are floors, not proven absences.
5. **Thirteen competitor URLs were fetched across this set; two required a client change to recover**
   (step-by-step pack §10.1); **`vatfiler.pricebailey.co.uk/Calculator/CorporationTax` was deliberately NOT
   fetched** (4.3) and the reason is on the record. **No fetch was silently dropped.**
6. **No live-production check was run against medicalaccounts.co.uk by this task.** The surface map at §1.3 is
   traced through the repo to the call site (`BlogPostRenderer.tsx:84` and `:216`, `PremiumUpgrade.tsx:110`,
   `taxonomy.ts` `TOPICS`, `premium/resources.ts`, `premium/registry.ts`, and `PremiumCalculator.tsx`'s four
   `field.help` render sites), **not from a request to the live site.** The rendering claim is therefore as
   strong as the code and no stronger. **Nobody has confirmed by fetching the live page that the premium island
   appears where the code says it does**, and that check is one `curl` if the manager wants it before acting on
   defect D.
7. **The `.xlsx` behind the resource sibling was NOT opened** (§10.2), so the manual-versus-calculator
   contradiction is established between two pieces of code and one page of prose, not against the workbook
   itself.
8. **The scratchpad is contended.** A concurrent agent overwrote this task's first pull script mid-run
   (BATCH3_INDEX D10, recurring). Every figure is from a re-run under a uniquely named file, and a sibling
   agent's independent pull reproduced two of §2.4's figures exactly.
