# §9.5 RESEARCH PACK: /resources/incorporation-private

**Batch 3, wave C (incorporation and company structures), INCORPORATION DIFFERENTIATION SET, surface 4 of 4.
GRADE = REFRAME. Resource / manual page, `content/resources/*.md` on its own route.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9). Ground truth `docs/medical/house_positions.md`.
Batch index `docs/medical/packs/BATCH3_INDEX.md`. Site diagnosis `docs/medical/STATE.md` "Stage 0 diagnosis
2026-09-01".

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. **No paid
API call: $0.00.** DataForSEO read from the persisted harvest by SQL only. GSC and Bing calls are free. Thirteen
competitor pages fetched live.

**Sibling packs, meant to be read together:** `PACK_C_blog__medical-practice-incorporation-step-by-step.md`
(**read its §5.0 first**), `PACK_C_blog__incorporation-relief-private-medical-practice-s162.md`,
`PACK_C_calculators__private-practice-incorporation.md` (**read its §6.4: two of the four defects it records
mean this page currently documents behaviour the live calculator does not have**).

> **THE SHORT VERSION OF THIS PACK. This is the best-written of the four surfaces and it needs the least work.
> It is also the one carrying a live technical defect (a canonical pointing at the homepage, fixed in the repo
> and not yet deployed) and a live contradiction with its own calculator sibling about the order of two
> operations. Its differentiation job is mostly about what it must STOP doing, not what it must add.**

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/resources/incorporation-private` |
| Source file | `Medical/web/content/resources/incorporation-private.md` |
| **Rendering** | Markdown file whose **body is raw HTML**, rendered by `Medical/web/src/app/resources/[topic]/page.tsx` (`dynamicParams = false`, static params from `publishedGuideTopicsWithFile()`). **This is a different route from `/blog/[slug]` and it renders different fields.** |
| **What actually renders**, traced to the call site 2026-09-01 | `guide.title` as **both the `<title>` and the visible `<h1>`**; `guide.summary` as **both the `<meta name="description">` and a visible sub-heading paragraph**; `frontmatter.version` and `frontmatter.lastReviewed` as **visible text** ("Tax year: 2026/27. Last reviewed: 2026-08-26."); an **xlsx download block** from `lib/resources/registry.ts` (`Download the Private practice incorporation model (Excel)`, "No email required"); an **auto-generated table of contents built from the body's H2 and H3 `id` attributes**; the body HTML; and a fixed `Book a free call` CTA block appended by the route. |
| **The writer's surface** | `title`, `summary`, `version`, `lastReviewed`, and the body HTML **including every heading `id`**. |
| **NOT the writer's surface** | The download block's label (it comes from `lib/resources/registry.ts`, not the frontmatter), and the closing CTA (it is hard-coded in the route and appears on every resource page). |
| Word count, whole file | **1,537** |
| Em-dashes in file | **0**. Must still be 0 (I1, hard fail). |
| **GRADE** | **REFRAME.** Full rewrite permitted. |
| Repo HEAD at pack time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, 2026-09-01) |
| Last commit touching this file | `0abd26e751ea3fd81a68e8aaf72e1ce695f85659` (**2026-09-01, today**), working tree clean on the path. **That is the same commit the D3 ruling names for the sitemap class-filter change, so this file moved hours before this pack was written.** |
| **Revert path** | `git revert <the wave-C commit>`. Single-file: `git checkout 0abd26e751ea3fd81a68e8aaf72e1ce695f85659 -- Medical/web/content/resources/incorporation-private.md`. **Derive the wave sha live at revert time; and note this file's anchor is only hours old, so re-derive it with `git log -1 --format=%H -- <path>` rather than reusing the value printed here.** |
| **`monitored_pages`** | **No row exists for this slug, at any status, at any date.** Registration is owner-gated and post-deploy. |

### 1.1 Why REFRAME, with the evidence

§9.2, Bing graded first:

```
REFRAME = Google impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300
```

This URL returns **zero rows on both engines** (§2). **REFRAME. The equity-preservation floor is empty by
construction.**

**Recorded as a question, not a finding** (BATCH3_INDEX §2.3, D5). **No sentence in the drafted page or any QA
report may describe this URL as "ranking nowhere".**

**But the REFRAME permission should be used sparingly here, and this is the one pack in wave C that says so.**
The page was substantially rewritten on 2026-08-26 (its `lastReviewed`), it is the only one of the four whose
prose is fully compliant with `house_positions.md` §5's framing of the dividend rise, and it contains the best
error-bar writing on the site. **The work here is boundary and technical, not authorial.** §5.3's KEEP list is
correspondingly long.

### 1.2 Armed monitored windows, run live for this pack

BATCH3_INDEX §4.7 SQL, run 2026-09-01 via `python scripts/_q.py`, project `dhlxwmvmkrfnmcgjbntk`, **no status
predicate** (a `status='active'` filter silently excuses the three `flagged` rows):

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

**`incorporation-private` is NOT among them, and no `/resources/` slug is.** Unfrozen, workable now.

**Two frozen rows bind this page.** `gp-limited-company-tax-benefits-drawbacks` (Google **4 clicks / 96
impressions / position 5.7**) owns "is it worth it"; **this page does not compete with it and must not start**.
`gp-pension-contributions-tax-relief` is frozen and **this page links to it once**, which is correct: contextual
links to a frozen page's live URL are fine, editing the frozen file is not.

### 1.3 A LIVE TECHNICAL DEFECT ON THIS EXACT URL, from STATE 2026-09-01

STATE's full 139-URL live canonical audit found **four URLs declaring a non-self canonical**, and this is one of
them:

| URL | Declares canonical as | Google impressions 90d |
|---|---|---|
| `/resources/nhs-pension` | the homepage | 63 impr, pos 12.2 |
| `/resources/locum` | the homepage | 61 impr, pos 12.6 |
| **`/resources/incorporation-private`** | **the homepage** | **0** |
| `/blog/private-practice-incorporation-complete-guide` | `/blog/medical-practice-incorporation-step-by-step` (correct, D3) | 0 |

**Root cause, traced to the call site:** `resources/[topic]/page.tsx` `generateMetadata()` returned only `title`
and `description`; with no `alternates.canonical`, Next fell back to `metadataBase`, emitting the site root.
Every other route in the app sets it.

**Status, stated precisely because it matters to this wave.** The fix **is in the repo**: `generateMetadata()`
at lines 42 to 47 of the current file now returns
`alternates: { canonical: ${siteConfig.url}/resources/${topic} }`, matching the sibling idiom, and STATE records
`tsc --noEmit` clean, **committed, NOT deployed**. **So the defect is still live in production and it will be
cured by the next Medical deploy, whether or not that deploy carries wave C.**

**Three consequences for this pack.**
1. **This surface's zero impressions cannot be read as evidence about its content**, because until the next
   deploy it has been telling Google it is the homepage. Its two `/resources/` siblings, which carry the same
   defect, earn 63 and 61 impressions at position ~12, **so Google has been declining the instruction rather
   than obeying it** and the defect is a live risk rather than a live loss.
2. **A wave-C deploy would carry both the canonical fix and the content change in one release**, which means
   the 28-day read cannot attribute a movement to either. **The working agreement's isolate-variables rule
   applies and the conductor should say so in the deploy note rather than discover it at the read.**
3. **No writer action.** The fix is code and it is already made.

### 1.4 D3, and what it does not change here

> **D3 RULED 2026-09-01:** `/blog/private-practice-incorporation-complete-guide` returns 301 to
> `/blog/medical-practice-incorporation-step-by-step`. **Wave C differentiates FOUR surfaces.** The sitemap no
> longer emits the redirected slug (**commit `0abd26e7`, which is also this file's own last-touch commit**) and
> the four internal links to it now go single-hop.

**This page already links to `/blog/medical-practice-incorporation-step-by-step` twice, which is the correct
single-hop target.** **No link on this page may point at the redirected URL.** **Never propose a collapse, a
redirect or a URL change** (K4).

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

**And the namespace comparison that gives the zero its meaning:**

| `/resources/` URL | Google `page` dim, 90d to 2026-09-01 | Bing `GetPageStats` |
|---|---|---|
| `/resources/nhs-pension` | 0 clicks, **63 impressions**, position 12.2 | 0 |
| `/resources/locum` | **1 click, 61 impressions**, position 12.6 | 0 |
| **`/resources/incorporation-private`** | **0** | **0** |

**This is the most interesting row in wave C's equity work.** The `/resources/` namespace is the **only**
namespace on this site where Google gives a non-blog surface real impressions at a single-digit-to-low-teens
position, and **Bing gives it nothing at all**. That is the exact inverse of the `/calculators/` namespace,
where six URLs earn Bing impressions and none earns a Google impression (calculator pack §2.2).

**So the two "how much" surfaces in this set live on opposite channels**, which is a genuinely useful
differentiation input and it is measured, not assumed. §8.

### 2.2 Bing, `GetPageStats` (page level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
run 2026-09-01  ->  329 rows collapsing to 80 distinct URLs
```

**0 snapshots, 0 impressions, 0 clicks for this URL. And 0 for every other `/resources/` URL.**

### 2.3 Bing, `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/resources/incorporation-private")
run 2026-09-01  ->  0 rows
```

The `page` argument was the full `https://www.` URL, not a path (BATCH3_INDEX §0.2's silent-failure trap), so
the zero is a real zero.

### 2.4 What the register says

**Nothing to preserve on this URL. But the namespace has something to lose and it is not this page's.**
`/resources/locum` (1 click, 61 impressions, position 12.6) and `/resources/nhs-pension` (63 impressions,
position 12.2) are the two best-positioned non-blog pages on the site. **They share this page's route, its
metadata pattern and, until the next deploy, its canonical defect.** Nothing in wave C touches them and nothing
in wave C should change the route.

**BATCH3_INDEX §9 limitation 2: `GetPageStats` is top-N, so the Bing zeros are floors.**

---

## 3. The market's keyword set

### 3.1 The selection SQL

`dataforseo_competitor_data`, `site_key='medical'`, run 2026-09-01 via `python scripts/_q.py`. **No DataForSEO
call was made.** Peer array = the **39-domain** set. **Word boundaries use `\y`, never `\b`** (D9). Full SQL in
`PACK_C_blog__medical-practice-incorporation-step-by-step.md` §3.1. Family-wide counts, shared across all four
wave-C packs:
**1,153 keywords / 676,630 volume / 394 peer-winnable rows at 166,490 volume.**

### 3.2 THE FINDING FOR THIS SURFACE: the harvest has no vocabulary for what this page is

**A resource page is documentation for a downloadable model. The harvest contains no keyword for that intent at
all.** Searched across the 1,153-keyword family for `spreadsheet`, `template`, `model`, `workbook`, `excel`,
`xlsx` and `download`: **zero rows**.

The nearest things in the harvest are the calculator family (88,760 volume, held at positions 1 to 8 by one
generalist incumbent, declined in the calculator pack at its §3.3) and the comparison family
(`sole trader vs limited company`, 5,400, held at position 105).

**So this surface has no keyword target and that is the correct finding, not a gap in the research.** Three
things follow.

1. **§7.1's phrase list is built from the model's own vocabulary and from `house_positions.md`, not from the
   harvest.** Stated so a QA agent reads it as a method note rather than as sloppiness.
2. **The one place the harvest is useful is negative: it tells us what this page must NOT reach for.**
   Everything with volume in this family belongs to the calculator sibling or to O34, and this page's only route
   to those terms would be to become a second calculator page. **B6 forbids exactly that.**
3. **This surface's demand, if it has any, is navigational and downstream**: someone who has the file, or who
   was sent here from the calculator or a blog post, wanting to know what the model does. **That is a retention
   and trust surface, not an acquisition surface, and §8's expectation is written accordingly.**

**One row worth naming, because it is the only medical row in the whole 1,153-keyword family:**
`private health insurance through limited company`, 40 volume, medicsmoney.co.uk at position 39, on a podcast
page. **Not this surface's, and not any wave-C surface's.**

---

## 4. Competitor teardown

**Thirteen URLs fetched live 2026-09-01 across this set. Every URL accounted for with its status code. Zero
silent drops.** Fetch-method defect and its one-line fix: step-by-step pack §10.1 (the pricebailey block is the
TLS client fingerprint, not the header set, so D14's prescription is necessary and not sufficient).

### 4.1 THE HEADLINE: there is no competitor for this surface, and that is a verified finding rather than an absence

**None of the thirteen fetched pages documents a downloadable model.** Checked on every one: no page in the set
offers a spreadsheet, a workbook or a template, and no page in the set states the assumptions behind its own
calculation in figures.

The closest two, and both fail in the same direction:

### 4.2 gorillaaccounting.com, Self-Employed Tax Calculator: **A BLACK BOX BEHIND AN EMAIL GATE**
`https://gorillaaccounting.com/self-employed-calculator/` · **HTTP 200**
**Class: PEER.** Holds the entire `sole trader vs limited company calculator` family (780 volume) at positions
38 to 47.

| | |
|---|---|
| Title / H1 | `Self Employed Tax Calculator` / `Self-Employed Tax Calculator` |
| Word count | **1,045** · Tables: **0** · FAQ: none |
| H2 | **`Email Calculator Results`**; `Useful Information`; `Related Blog Posts` |
| **£ figures on the page** | **ZERO** |
| **Percentages on the page** | **ZERO** |
| Stated assumptions | **NONE** |

**The page that holds this set's exact comparison intent tells the reader nothing about how it computes: no
rate, no year, no threshold, no exclusion, no error bar, and its first H2 is an email capture.**

**Consequence for us, and it is the whole justification for this surface's existence.** **A page that documents
its own model, quantifies its two simplifications to the pound, names the direction each one pulls, and then
names the one factor it cannot price at all is unique in this set.** We already have it. §5.2.

### 4.3 gorillaaccounting.com, Salary and Dividend Tax Calculator
`https://gorillaaccounting.com/salary-dividend-tax-calculator/` · **HTTP 200** · 1,876 words, 0 tables.
**Class: PEER.** Holds roughly thirty keywords at positions **1 to 8**.

**It does state rates**, which is more than 4.2 does: 8.75%, 33.75%, 39.35%, 19%, 25%, plus a stray 28%.
**Those dividend rates are 2025/26 and the page names no year later than 2025** (`house_positions.md` §5: the
live 2026/27 rates are 10.75% / 35.75% / 39.35%, FA 2026 s.4). **It states no assumption beyond the rates: no
treatment of employer NIC, no marginal relief, no statement of what is excluded.**

**Two uses here.** It is the proof that **stating a rate is not the same as stating an assumption**, which is
the distinction this page exists to make. And it is a caution: **a calculator can hold position 1 while being a
year out of date**, so being current is not on its own a ranking strategy.

### 4.4 livingstonesaccountants.co.uk, How to Switch from Sole Trader to Limited Company
`https://www.livingstonesaccountants.co.uk/blog/how-to-switch-from-sole-trader-to-limited-company-tax-implications-explained/` · **HTTP 200** · 3,007 words, **1 table**, 19 June 2026.
**Class: PEER.**

**The only competitor in the set that shows a sole-trader-against-company comparison with real arithmetic**
(£12,570, £50,270, £125,140, £50,000, £250,000, 19%, 25%, 6%, 60%). **It carries `33.75%` as the dividend upper
rate, which is 2025/26, on a page published three months after the rates changed.** No stated exclusions, no
error bar, no downloadable file, no pension content bearing on NHS accrual.

### 4.5 The rest of the set, and what each contributes here

| URL | Status | Contribution |
|---|---|---|
| `https://www.e-accounts.co.uk/2025/01/17/sole-trader-vs-limited-company-tax-comparison/` | 200, 1,654w, 1 table | Comparison with arithmetic. **8.75% / 33.75% (stale) and a £150,000 additional-rate threshold superseded in April 2023.** No stated assumptions. |
| `https://www.aims.co.uk/sole-trader-vs-limited-company-whats-the-right-option-for-running-a-solo-business/` | 200, **578w** | Nominal holder of the 5,400-volume head at **position 105**. Zero figures. |
| `https://gorillaaccounting.com/blog/when-should-sole-traders-set-up-a-limited-company/` | 200, 2,623w | **A 17% corporation tax rate that has never applied.** |
| `https://gorillaaccounting.com/blog/limited-company-formation-should-you-incorporate/` | 200, 2,312w | £50,000, 19%, 45%, nothing else. |
| `https://medicsmoney.co.uk/ep-197-limited-companies-2024-masterclass/` | 200, 3,284w | **The only medical competitor in 1,153 keywords.** A 2024 podcast page, **zero £ figures**, no topical H2. |
| `https://www.medicsmoney.co.uk/` | 200, 5,722w | The strongest medical brand in the peer set offers **no downloadable incorporation model**. |
| `https://www.pricebailey.co.uk/blog/incorporation-relief/` | 200 (via `curl`; 403 via `httpx`) | **Zero £ figures, zero percentages, no H1.** Torn down in the s.162 pack. |
| `https://lanop.co.uk/section-162-incorporation-relief-uk/` | 200, 4,103w | Torn down in the s.162 pack. |
| `https://www.pricebailey.co.uk/blog/togc-transfer-of-a-going-concern/` | 200 (via `curl`) | Torn down in the s.162 pack. |
| `https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` | 200, 1,596w | s.455 incumbent. **ELSEWHERE.** |
| `https://vatfiler.pricebailey.co.uk/Calculator/CorporationTax` | **not fetched** | Declined family, calculator pack §4.3. Recorded so the absence is a decision. |

### 4.6 Union of competitor themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 11 themes, 11 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **Documenting a downloadable model at all** (**absent from all thirteen**) | **COVER, and it is the surface** | 4.1. Nobody in the peer set does this. |
| 2 | **Quantified simplifications with a direction of travel** (absent from all thirteen; 4.2 states nothing at all) | **COVER, and it is the differentiator** | Already on the page and quantified to the pound. §5.2. **KEEP.** |
| 3 | **The factor the model cannot price: NHS pension accrual** (absent from all thirteen) | **COVER, MANDATORY** | `house_positions.md` §2.C. Already the page's best block. **KEEP.** |
| 4 | **The four inputs and why each exists** (4.2 explains none of its inputs) | **COVER** | Already on the page. The `NHS PAYE income` explanation is the strongest of the four and is unique in the set. |
| 5 | **How to USE the file: sweep a range rather than run one number** (absent from all thirteen) | **COVER, and it is genuinely unique** | Already on the page: "run it at several private income levels and watch where the two columns cross". **No competitor tells a reader how to use a tool.** **KEEP.** |
| 6 | **An explicit omissions list** (absent from all thirteen) | **COVER, and TIGHTEN** | Already on the page as five bullets. **Two of them currently over-reach into other pages' facts** (§6.3 points 2 and 3). |
| 7 | **Stated rates with a year and a source** (4.3 states rates with no year; 4.4 and 4.5 state stale rates) | **COVER, and it is already right** | The page states 10.75 / 35.75 / 39.35, tags 2026/27, links gov.uk and gives the read date, 26 August 2026. **The single most compliant sentence on any of the four surfaces. KEEP.** |
| 8 | **Email-gating the download** (4.2's first H2) | **DECLINE** | I7 and the standing rule against new interruptive surfaces. The route already serves the file ungated ("No email required") and `RESOURCE_EMAIL_DELIVERY` is off. **No gate is added.** |
| 9 | **A live in-browser calculation** (4.2, 4.3) | **DECLINE ON THIS SURFACE. B2 and B6.** | The calculator sibling owns the live comparison. **This page documents; it does not compute.** §5.1. |
| 10 | **The dividend-calculator keyword family** (about 40,000 volume, positions 1 to 8) | **DECLINE** | Generalist, O34's subject, and unwinnable. Calculator pack §3.3. |
| 11 | **A named author with a credential** (lanop) | **DECLINE, permanently** | **I2.** Note this page's frontmatter `author` is `Medical Accountants UK`, an organisation rather than a person, which is compliant and should stay that way. |

---

## 5. Whitespace and the differentiation statement

### 5.0 THE POINT OF THIS SET

Reproduced in all four packs. **Four surfaces, one topic. The differentiation is by the READER'S QUESTION.**

| Surface | The one question it owns | It hands off |
|---|---|---|
| `/blog/medical-practice-incorporation-step-by-step` | **"How do I actually do it?"** The ordered sequence, and the NHS pension-accrual pairing beside every saving. | The relief, the arithmetic, VAT, dividend rates, s.455, "is it worth it". |
| `/blog/incorporation-relief-private-medical-practice-s162` | **"What happens to the tax on my goodwill?"** TCGA 1992 s.162 in full, including the FA 2026 s.39 claim regime. | The process, the running tax, the extraction question, the saving calculation. |
| `/calculators/private-practice-incorporation` | **"How much, for my numbers?"** One computed comparison from the reader's four inputs, and an honest statement of its limits. | Every explanation. |
| **`/resources/incorporation-private`** (this pack) | **"What does the downloadable model do, and where does it stop?"** The manual for the file: the four inputs, how each column is constructed, the two quantified simplifications, the omissions, and how to sweep a range rather than run one number. | The decision, the process, the relief, and any live calculation. |

**The deterministic boundary rules:**

- **B1.** Only the s.162 surface may contain `162A`, `first anniversary of the 31 January`, or a worked
  apportionment of a gain.
- **B2.** Only the calculator surface may present a £ figure that is an OUTPUT of `calcIncorporation`.
- **B3.** **This surface's £ figures may ONLY quantify a simplification or an omission in the model. They may
  never answer "should I incorporate".**
- **B4.** Only the step-by-step surface may carry an ordered `<ol>` of incorporation steps or `howtoSteps`.
- **B5.** No wave-C surface states a dividend rate, a CT rate table, a VAT threshold, an s.455 rate or a BADR
  rate except where an O-row awards it. **This surface's single exception is the dividend basis of the model
  itself (4.6 theme 7), which it already states correctly.**
- **B6.** **This surface's numbers exist only to quantify a simplification or an omission in the file. The
  calculator surface's numbers come only from the reader's inputs. Neither writes the other's.**

### 5.1 THE HARDEST BOUNDARY IN THE SET IS THIS PAGE AGAINST THE CALCULATOR, and B3 and B6 are how it is settled

**Both surfaces answer "how much". That is the one place where two of the four genuinely collide, and it cannot
be settled by topic because the topic is identical.** It is settled by the kind of number each is allowed to
show:

| | This page | The calculator |
|---|---|---|
| Where its numbers come from | The **model's own construction**: a rate it applies, a rate it omits, the size of a simplification | The **reader's inputs**, through `calcIncorporation` |
| What a number is FOR | To size an error bar or an omission | To answer the reader's question |
| Worked example | **The £80,000 corporation tax correction** (£20,000 charged, £2,550 marginal relief, £17,450 actual, 21.8% effective) and **the £1,135.50 employer NIC** are error-bar arithmetic and are **this page's** | **`workedExamples`, currently empty**, showing the model's output for stated inputs, is **the calculator's** |
| What it must never do | Answer "should I incorporate" with a figure | Explain anything |

**Concretely for the writer: this page keeps every figure it has, and adds none that answers the reader's own
question.** The calculator pack's §7.3 gate D12 catches any shared 8-word span in the other direction: **the
calculator must summarise this page's error-bar copy, never lift it.**

### 5.2 What no competitor does, and this page already does it

**Three things, and all three are on the page today.**

1. **It quantifies both simplifications and names the direction each one pulls.** "For a company with £80,000
   of profit ... corporation tax is £80,000 at 25%, which is £20,000, less marginal relief of 3/200 of
   (£250,000 - £80,000), which is £2,550. That is £17,450, an effective rate of 21.8%. The model charges the
   full £20,000, so it **overstates the company's cost** by £2,550 and **understates the saving** by the same
   amount." Then the other way: employer NIC at 15% of £7,570 is £1,135.50, **"so the model overstates the
   saving by roughly this amount"**. Then the net: **"about £1,400 better off than the file shows"**.
   **Every figure recomputes** (§7.4) and **no competitor in the set states a single assumption.**
2. **It names the factor it cannot price and refuses to price it.** "The workbook compares tax against tax. It
   has no cell for the pension accrual that the company column gives up, and that accrual is a defined benefit
   promise, index linked, accruing at 1/54th of pensionable earnings a year in the 2015 section ... **which is
   precisely why the file cannot put a number on it and neither will this page.** What it does mean is that a
   positive saving in the workbook is not on its own a reason to incorporate."
   **That is `house_positions.md` §2.C executed properly, and it is the model the other three surfaces should
   follow.** The calculator's live FAQ says "Possibly" and misdescribes the scheme (calculator pack §6.3 point
   2); the step-by-step page pairs correctly but with a stale annual-allowance tag.
3. **It tells the reader how to use the tool.** "Use the workbook when you want to sweep a range: run it at
   several private income levels and watch where the two columns cross. A single run at today's income tells
   you much less than the shape of the curve around it." And on the salary input: "Run it at both £5,000 and
   £12,570 and compare ... the two runs **bracket** the real answer rather than settling it."
   **No competitor page in the set gives usage guidance of any kind.**

### 5.3 KEEP, explicitly, and this list is longer than the other three packs' because the page is better

K1 is a hard fail: the drafted page's count of statutory references, technical terms and figures must be greater
than or equal to the live page's.

- **The whole `two simplifications` H2 and both H3s, with every figure.** §5.2 point 1. **KEEP, verbatim in
  substance.** This is the best writing on any of the four surfaces.
- **The whole `the factor the model does not price at all` H2.** §5.2 point 2. **KEEP.**
- **The sweep-a-range framing and the £5,000-versus-£12,570 bracketing.** §5.2 point 3. **KEEP.**
- **The dividend-rate sentence with its year, its source link and its read date.** "The 2026/27 dividend rates
  in the file are 10.75% ordinary, 35.75% upper and 39.35% additional, which **took effect on 6 April 2026** and
  are confirmed at gov.uk tax on dividends, **read on 26 August 2026**." **This is the only sentence on any of
  the four surfaces that gets `house_positions.md` §5's completed-past framing right.** KEEP.
- **The negative-result answer.** "At typical private income levels on 2026/27 rates the pure tax saving from
  incorporating is modest, and the dividend rate rise that **took effect on 6 April 2026 narrowed it further**.
  A negative result is a normal output, and it is one of the more useful ones." **Correct against §5's
  "do NOT present incorporation as a clear tax win" and correct on the framing.** KEEP.
- **The `NHS PAYE income` input explanation.** "This is not decoration. It sits underneath the private income in
  both columns and determines which tax band the private profit or the dividends fall into, which is usually
  what decides the answer." **Unique in the set** (4.6 theme 4). KEEP.
- **"Gross private billings only. NHS contract income cannot go through a company at all, so it does not belong
  here."** The scope carve-out at the point of entry. KEEP.
- **The approved s.86 wording**, in both places: "a doctor's ordinary personal service company cannot hold a
  GMS or PMS contract". §2.C's correction of 2026-08-26 forbids the flat "a limited company cannot". **The live
  page is correct. KEEP and do not tighten it back.**
- **The associated-companies bullet.** "The £50,000 and £250,000 corporation tax limits are divided by the
  number of associated companies. A group of doctors incorporating a joint private clinic while each keeping
  their own company can find every company in the 25% band at profits that would otherwise sit at 19%."
  **The most specifically medical omission on the page and no competitor mentions associated companies at all.**
  KEEP. **Note the figures here are permitted under B3 because they quantify an omission from the model, not an
  answer.**
- **The LLP answer.** "The file compares sole trader against limited company only. An LLP gives limited
  liability with members taxed personally, so on tax it behaves much closer to the sole trader column."
  A real scope limit, honestly stated. KEEP.
- **`author: "Medical Accountants UK"`**, an organisation and not a person. I2. KEEP.
- **Zero em-dashes.** KEEP at zero.

---

## 6. Our current page, read honestly

Source read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **1,537** |
| `title` (**doubles as the `<title>` AND the visible `<h1>`**) | `Private Practice Incorporation Spreadsheet: What the Model Compares, and Where It Stops` (**86 characters**) |
| `summary` (**doubles as the `<meta name="description">` AND a visible sub-heading**) | 247 characters |
| `version` / `lastReviewed` (**render as visible text**) | `2026/27` / `2026-08-26` |
| `resourceLabel`, `resourceId` | `private practice incorporation comparison model`, `incorporation-model.xlsx`. **Both appear unused by the route, which takes the download label from `lib/resources/registry.ts`.** §10.4. |
| `date` | **`2025-09-01`**. §6.3 point 5. |
| H2 count | **6** · H3 count: **5** (four of them `<h3 id="q-...">` questions) · Tables: **None** |
| Em-dashes | **0** |

### 6.1 Existing heading list, verbatim and in order, with `id` values

**The `id` values are load-bearing: the route builds a visible table of contents from them and renders them as
anchor links. Changing a heading changes its anchor.**

- H2 `What this page is` (`#what-this-page-is`)
- H2 `The four inputs` (`#four-inputs`)
- H2 `How the two columns are built` (`#the-two-columns`)
- H2 `Two simplifications, pulling in opposite directions` (`#two-simplifications`)
  - H3 `Corporation tax is charged at a flat 25%` (`#ct-flat-rate`)
  - H3 `Employer National Insurance on the director salary is not charged` (`#employer-nic`)
- H2 `The factor the model does not price at all` (`#the-pension-omission`)
- H2 `The rest of what is not modelled` (`#other-omissions`)
- H2 `Questions about the model` (`#questions`)
  - H3 `Can I put my NHS income through the company to increase the saving?` (`#q-nhs-income`)
  - H3 `The saving is negative. Is the model broken?` (`#q-saving-negative`)
  - H3 `What should I put in the director salary cell?` (`#q-salary-level`)
  - H3 `Is a limited liability partnership covered?` (`#q-llp`)

### 6.2 Blunt read

**This is the strongest page of the four and the one with the least to do. Its problems are a stale date field,
two bullets that reach into other pages' facts, one metadata field that is doing two incompatible jobs, and a
contradiction with its own calculator sibling that it did not cause and cannot fix.**

**What is good is set out at §5.2 and §5.3 and is not repeated here.** The rest of this section is only what is
wrong.

### 6.3 HOUSE-POSITION CONTRADICTIONS, OWNERSHIP BREACHES AND DEFECTS ON THE LIVE PAGE

**Listed, not fixed.**

1. **NO HOUSE-POSITION CONTRADICTION WAS FOUND IN THIS PAGE'S PROSE, and that is worth stating explicitly
   because the other three all carry one.** Checked line by line against `house_positions.md` §2, §2.C, §4, §5,
   §8.A and §10. The dividend rates carry 2026/27 with a source and a read date; the rise is written as
   completed; corporation tax is described as 19% / 25% / marginal relief 3/200 with the effective rate; the
   employer NIC rate and secondary threshold are right; the Employment Allowance exclusion for a single-director
   company is right; the s.455 rates and date bands are right; the 1/54th accrual and 2015 section are right;
   the s.86 wording is the approved unpinned form in both places. **F4 clean.**
2. **s.455 OVER-BUDGET (proposed row `C3-01`).** The `Money taken out informally` bullet carries the full
   s.455 mechanic: close company, overdrawn 9 months and 1 day after the period end, **35.75% on loans made on
   or after 6 April 2026 and 33.75% in 2025/26 or earlier**, refundable under s.458 with deferred relief. **It
   then links to the owning page.** The facts are correct and the link is right; **the block is roughly three
   sentences where a non-owner gets one.** The step-by-step pack §10.2 proposes `C3-01` and all four packs set
   the allowance at one sentence and a link, which is safe under either ruling.
3. **O34 OVER-BUDGET, in the same bullets.** `Any extraction route other than salary plus dividend` explains
   employer pension contributions (deductible for corporation tax on a paid basis, no NIC, not dividend taxed,
   subject to the annual allowance) before linking to
   `/blog/salary-vs-dividend-medical-limited-company-2026`. **That is O34's explanation, given in full, with the
   link underneath it.** Same shape at `Profit left in the company` for the surplus-cash page. **One sentence
   and a link each.**
4. **O2 brush.** The pension H2's closing paragraph explains the annual-allowance interaction ("If private
   income is pushing your pension input amount past the allowance and generating a charge, moving that income
   outside pensionable pay reduces both") and links to `/calculators/nhs-pension-annual-allowance`. **The
   substance is right, the link is right, and `pension input amount` is O2's vocabulary.** It states no figure,
   so **this is inside budget and is recorded only so a rewrite does not expand it.**
5. **A STALE `date` FIELD, and it is a year out.** Frontmatter `date: "2025-09-01"`, exactly one year before
   today, while `lastReviewed` is `2026-08-26` and `version` is `2026/27`. **The route renders `version` and
   `lastReviewed` as visible text and does not render `date`**, so this is not a live reader-facing error, but
   it is wrong in the source and any tool reading `date` will misdate the page by a year.
6. **`summary` is 247 characters and is doing two incompatible jobs.** The route uses it as **both** the
   `<meta name="description">` **and** a visible sub-heading paragraph under the H1. **155 characters is the
   description cap**, so it is roughly 90 characters over as metadata while being about the right length as a
   standfirst. **This is a route-level design constraint, not a writing error**, and the writer resolves it by
   writing a summary that works at both lengths or by accepting truncation in the SERP deliberately. Recorded
   at §10.4.
7. **`title` is 86 characters and is doing two jobs**, `<title>` and visible `<h1>`. **60 is the practical
   `<title>` cap.** Same structural cause as point 6.
8. **No tables. L4.** The page carries at least two natural tables in prose: the four inputs with what each
   drives, and the two simplifications with their direction and size. **L4 requires at least one table on any
   page carrying a comparison.** **Note the table must be raw HTML to match the body's rendering, and the route
   applies `prose prose-slate`, so a plain `<table>` will inherit typographic styling.**
9. **THE CONTRADICTION WITH THE CALCULATOR, and this page did not cause it.** The `How the two columns are
   built` H2 says the limited company column "takes the same profit, **deducts the director salary, charges
   corporation tax on what is left**". `calcIncorporation`, which powers both `/calculators/private-practice-
   incorporation` and the premium island rendered inside both wave-C blog posts, does the **opposite**:
   ```ts
   const corporationTax = companyProfit * 0.25;
   const profitAfterCT  = companyProfit - corporationTax;
   const dividendAmount = profitAfterCT - desiredSalary;   // salary taken AFTER tax
   ```
   **So this page's description of the workbook and the live calculator's behaviour differ in the order of two
   operations, and the two surfaces link to each other from both directions.** **Nobody has opened the `.xlsx`,
   including this task**, so it is unknown whether the workbook matches this page or matches the calculator.
   **This is escalated at §10.1 and it is not the writer's to resolve.**
10. **A1 / A5 check.** The first H2 arrives at word 0 (the page opens on `What this page is`) and the direct
    answer ("This is the manual for the spreadsheet") is the first sentence. **Inside band, and unusually good
    for the corpus.**
11. **C3 / C4 check.** `you` and `your` appear 27 times in roughly 1,300 body words, **20.8 per 1,000**, inside
    the 12 to 25 band. **`we`, `our`, `us`: 0**, against a cap of 3. **The only one of the four surfaces
    compliant on both.** Do not disturb it.
12. **V5 check: clean.** No `it is not X, it is Y`. **One near-miss worth naming so it is not introduced:**
    "This is not decoration" is a corrective opening, and V9's corollary records the corrective-clause reflex as
    the house tic now on its fourth showing. **It is below cap, it is correct, and it should not be joined by a
    second.**
13. **V9 numeral-count opener: one instance**, and it is a heading: `The four inputs`. **A heading that names a
    count is not the paragraph-opener tic and is inside cap.** The body opener "Both are worth quantifying" is
    clean.
14. **V2 check: clean.** No search-string narration, no "also searched as".
15. **PROCESS NARRATION check: clean, and this page is the corpus's best example of how to do the handoff.**
    "If you want the incorporation decision explained rather than the file documented, [the step-by-step guide]
    does that, and [the incorporation calculator] runs the comparison in the browser." **That is the boundary
    stated in the reader's terms, with no mention of ownership, maps or our own structure.** Conductor ruling 3
    of 2026-08-26 asks for exactly this. **KEEP, and hold it up to the other three writers as the model.**

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgment.

### 7.1 THE NAMED MISSING-PHRASE LIST

**7 phrases, and it is deliberately the shortest list in wave C**, because the harvest has no vocabulary for
this surface (§3.2) and because the page's substance is already right (§5.3). **A longer list here would be
manufactured.**

**V1 IS BINDING.** Two word orders per idea per page, hard cap, **non-overlapping longest matches, never raw
substrings**. **Any V1 finding must quote the spans it counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `what the model does not do` (or an equivalent explicit limits framing in a heading) | The manual's own promise | 1 of 2 | 4.6 theme 2. **No competitor states an assumption at all** (4.2 states nothing; 4.3 states rates but no assumptions). The page does this in substance across two H2s; **the check is that a reader scanning the table of contents can see it.** |
| 2 | `assumptions` | The manual's own promise | 2 of 2 | Zero occurrences on the page today, on a page whose entire subject is its own assumptions. |
| 3 | `sole trader` and `limited company` in one heading | The comparison, in the market's word order | 1 of 1 | Harvest: `sole trader or limited company` 6,600, held at position 95. **The page describes "the two columns" throughout and never names them together in a heading.** |
| 4 | `error bar` or `range` describing the size of the model's uncertainty | Sizing the uncertainty | 1 of 1 | The page says "the width of the error bar around the saving figure" once, in the body. **Listed so the rewrite cannot lose it**, because it is the phrase that distinguishes this page from every competitor. |
| 5 | `not NHS pensionable` stated flatly, without `possibly` or `may` | The pension, stated plainly | 1 of 1 | `house_positions.md` §2.C: "State plainly: dividends are not pensionable." **The page already says "Dividends are not NHS pensionable" and this row exists to protect it**, because the calculator sibling gets it wrong and a writer harmonising the two must harmonise upward. |
| 6 | `2026/27` attached to the model's dividend basis | Currency | 1 of 1 | Already present and correct. **Protected, not added.** |
| 7 | `associated companies` | The unique omission | 1 of 1 | Already present. **Protected**: no competitor in the set mentions associated companies, and it is the most specifically medical omission on the page (a joint private clinic plus individual companies). |

**Countable test: 7 of 7 present. Any other absent phrase is a named BLOCK.**
**Note the shape of this list: five of the seven are PROTECTIVE rather than additive. That is correct for this
surface and it is stated so QA does not read it as a thin pack.**

**Explicitly NOT on this list, with the reason on the record:**
- **Every calculator keyword** (`dividend tax calculator`, `sole trader vs limited company calculator`, roughly
  89,000 volume). **DECLINED**: they belong to the calculator sibling and to O34, and B6 forbids this page
  competing for them.
- **`spreadsheet`, `template`, `model`, `workbook`, `excel`, `download` as keyword targets.** **The harvest
  returns ZERO rows for all six** (§3.2). They belong on the page as plain description, not as targets.
- **`162A`, the claim deadline, any apportionment.** B1, the s.162 surface.
- **Any incorporation step phrasing.** B4, the step-by-step surface.
- **Any `should I incorporate` or `is it worth it` phrasing.** The owner holds Google position 5.7 and is
  frozen to 2026-09-10.

### 7.2 Equity preservation (§9.9 floor 5)

**The equity set is EMPTY: 0 named Bing queries, 0 Google query rows** (§2). Nothing can be lost.

**Countable test: 0 of 0, recorded as "empty, verified by fresh pull 2026-09-01", never as "not run".**

**One preservation risk that is NOT about queries: the heading `id` values are anchor targets rendered in a
visible table of contents** (§6.1). **Countable test: every `id` that exists before the change either exists
after it or is deliberately listed as removed.** An anchor that silently disappears breaks any external or
internal deep link to it.

### 7.3 CROSS-SURFACE DUPLICATION GATE

Run over the four wave-C surfaces **together**, after all four are drafted, by the conductor.

| # | Gate | Pass condition |
|---|---|---|
| D1 | `162A` on this page | **0** |
| D2 | `first anniversary of the 31 January` on this page | **0** |
| D3 | Any apportionment of a gain between share and non-share consideration | **0** |
| D4 | Ordered list of incorporation steps, or `howtoSteps` frontmatter, on this page | **0** (B4) |
| D5 | Dividend percentage figures on this page | **at most 3, all 2026/27, all describing the MODEL's basis.** `8.75` and `33.75` must be **0**. |
| D6 | Corporation tax percentage figures on this page | **permitted**, because they quantify the model's flat-rate simplification (B3). **No CT rate may appear as general guidance rather than as an error-bar computation.** |
| D7 | `£90,000`, `£88,000`, `30 days`, `partial exemption`, `Schedule 9 Group 7` | **0** |
| D8 | s.455 sentences on this page | **at most 1**, then a link. §6.3 point 2. |
| D9 | BADR percentage figures on this page | **0** |
| D10 | Any heading on this page containing `worth it`, `should I`, `benefits`, `drawbacks`, `pros`, `cons` | **0** |
| D11 | £ figures on this page that answer "should I incorporate" rather than sizing a simplification or omission | **0** (B3, B6) |
| D12 | Occurrences of the same >= 8-word span on this page and any other wave-C surface | **0**. **This gate points OUTWARD from this page: its error-bar copy is the original and the calculator must summarise rather than lift it.** |
| D13 | Sentences on this page explaining an extraction route (employer pension contributions, retained profit) rather than naming it | **0**, then link. §6.3 point 3. |

### 7.4 Arithmetic, and the figures that are BANNED

**G1 is met on this page by the two error-bar computations it already carries, which together are the worked
example.** No new worked example is added. **Every figure must be re-derived by `arithmetic_recomputed[]`, and
all four currently recompute:**

| Stated | Recomputes as | Verified |
|---|---|---|
| £80,000 at 25% | £20,000 | **yes** |
| Marginal relief 3/200 of (£250,000 - £80,000) | 3/200 x £170,000 = **£2,550** | **yes** |
| £20,000 - £2,550 | **£17,450**, effective **21.8%** on £80,000 | **yes** (17,450 / 80,000 = 21.81%) |
| Employer NIC 15% of (£12,570 - £5,000) | 15% x £7,570 = **£1,135.50** | **yes** |
| Net effect "about £1,400" | £2,550 - £1,135.50 = **£1,414.50** | **yes** |

**All five recompute exactly. This is the only surface in wave C whose existing arithmetic passes floor 2 as it
stands, and the writer must not disturb it.**

**PERMITTED figures on this page:**

| Figure | Year tag | Source | Why permitted under B3 |
|---|---|---|---|
| **10.75% / 35.75% / 39.35%**, £500 allowance | **2026/27** | `house_positions.md` §5, FA 2026 s.4, gov.uk read 2026-08-26 | It is the model's stated basis |
| **19% / 25% / £50,000 / £250,000 / 3/200 / 26.5%** and the £80,000 worked correction | FY from 1 April 2026 | §5 | It quantifies the model's flat-rate **simplification** |
| **15%** employer secondary Class 1 above **£5,000**; **£1,135.50** on the default salary; Employment Allowance not available to a single-director company | 2026/27 | §5 | It quantifies an **omission** |
| **£12,570** personal allowance; **£50,270** basic-rate limit; **Class 4 at 6% then 2%** | 2026/27 | §5 | It describes how the sole-trader column is built |
| **1/54th** accrual, **2015 section**, index linked, defined benefit | | §2, §2.C | It names the factor the model cannot price |
| Associated-companies division of the £50,000 and £250,000 limits | | §5 | It quantifies an **omission** |
| **35.75% / 33.75%** s.455 rates with their date bands | | §5 | **Currently permitted and currently over-budget** (§6.3 point 2). **Reduce to one sentence; if the rate survives, it survives once.** |

**BANNED FIGURES on this page:**

| Banned | Why | Instead |
|---|---|---|
| **Any £ figure answering "should I incorporate"**, including a saving, a break-even income, or a threshold | **B3 and B6.** The calculator answers that with the reader's own inputs. **Note the calculator's live explainer carries exactly this defect ("can save £5,000 to £20,000 per year", "below roughly £50,000 to £70,000") and it must not migrate here during a harmonisation pass.** | Nothing. Point at the calculator. |
| **`8.75%` and `33.75%` as current dividend rates** | Prior-year rates. §5. | Not stated. **The s.455 date band is the one place `33.75%` may legitimately appear and it appears there as a loan-year rate, not a dividend rate.** |
| **Any BADR rate, `£1 million lifetime limit`, the 24% main CGT rate** | Wave F; proposed row `C3-02`. | Not stated. |
| **`£90,000`, `£88,000`, the 30-day rule, partial exemption, Sch 9 Group 7** | **O21-VAT and O17. Owner `/blog/gp-vat-registration` is FROZEN to 2026-09-10.** | Not stated. |
| **Any annual allowance figure, taper threshold, adjusted or threshold income, or MPAA** | **O2.** The page correctly discusses the interaction **with no figure** today (§6.3 point 4). **The ban exists so a rewrite does not add one.** | One sentence, then the existing link. |
| **Any Scheme Pays deadline** | **O4. `nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date. The exact fact that broke batch 1.** | Nothing. |
| **Any GMC annual retention fee** | **O9. UNVERIFIED. Hard fail F5.** | Nothing. |
| **Any s.162 figure, the claim deadline, `162A`, an apportionment** | **B1**, the s.162 surface. The page's `Getting there and running it` bullet correctly names incorporation relief and links, with no figure. **KEEP that shape.** | One sentence and a link. |
| **Any accountancy-fee figure or our own pricing** | Standing rule: the lead-gen sites carry no pricing and no client names. **The page names "ongoing company filing and accounting costs" without pricing them, which is correct.** | Named, not priced. |
| **Any fabricated statistic**: "most doctors", "we find that around X%" | **F6, I6.** | Nothing. |
| **"a limited company cannot hold a GMS or PMS contract" flat** | §2.C correction. **The live page is already correct in both places.** | The approved unpinned form. |
| **`final salary` describing the 2015 scheme** | §2. **The live page correctly says "the 2015 section".** | `2015 section`, CARE. |

**Countable test: count of banned-figure assertions = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| Dividend rates 2026/27 (10.75 / 35.75 / 39.35, £500), **FA 2026 s.4** | https://www.gov.uk/tax-on-dividends ; `house_positions.md` §5. **The page already cites this with a read date of 26 August 2026; re-read and update the read date, do not carry the old one forward.** |
| Corporation tax 19% / 25% / marginal relief 3/200, unchanged for FY beginning 1 April 2026; the associated-companies division of the limits | https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax ; §5 |
| Employer secondary Class 1 at 15% above £5,000; Employment Allowance not available to a single-director company | https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions and https://www.gov.uk/claim-employment-allowance ; §5 |
| Income tax bands and Class 4 NIC 6% / 2% | https://www.gov.uk/income-tax-rates and https://www.gov.uk/self-employed-national-insurance-rates ; §5 |
| s.455 at 35.75% on loans made on or after 6 April 2026 and 33.75% earlier; s.458 relief deferred | `house_positions.md` §5; https://www.legislation.gov.uk/ukpga/2010/4/section/455 . **If the bullet is cut to one sentence, this row may fall away.** |
| 1/54th accrual, CPI plus 1.5%, **2015 section**; dividends not NHS-pensionable | `house_positions.md` §2, §2.C |
| A doctor's ordinary personal service company cannot hold an NHS contract, **approved unpinned form**; **s.86 is GMS only, PMS is s.92 with detail in s.94 regulations** | https://www.legislation.gov.uk/ukpga/2006/41/section/86 and /section/92 ; §2.C. **Do not assert a PMS shareholder test.** |
| **THE ONE THAT IS NOT A STATUTE: that the workbook actually builds its columns the way this page says it does** | **Open `Medical/web/public/resources/incorporation-private/incorporation-model.xlsx` and read the formulas.** §6.3 point 9, §10.1. **Nobody has done this, including this task.** |

**Countable test: every external factual claim maps to a row above with a fetch date. Count of unverified
claims = 0. Any row that fails verification is DROPPED, not softened.**

### 7.6 Floors

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py` | **Not applicable: this is not a blog post and the covered set is empty (§7.2).** Record as empty-verified, never as "not run". §10.3. |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | **All five existing computations still recompute** (§7.4), plus any new one |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified, **including the `.xlsx` row** |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s; every internal link resolves. **`slug_resolver` HARD-REFUSES flat sites and Medical is flat; and the route's own header comment says `scripts/medical_flat_link_audit.py` must NOT be run on this route.** **No link to `/blog/private-practice-incorporation-complete-guide`, which 301s.** |
| 5. Equity preservation | §7.2 | **0 of 0** queries, empty-verified; **every pre-existing heading `id` preserved or explicitly listed as removed** |
| 6. Cluster coverage | §7.1 | **7 of 7** phrases present |
| 7. Competitor re-read | §4.6 | **11 themes, 11 decisions, 0 undecided** |
| 8. Cross-surface duplication | §7.3 | **13 of 13 gates pass** |
| 9. Voice bands | §6.3 point 11 | `you`/`your` **12 to 25** per 1,000 (currently 20.8, **inside band, do not disturb**); `we`/`our`/`us` **at or below 3** (currently 0) |
| 10. Structure | L4, metadata | **At least 1 table**; `title` **at or under 60 chars** or a stated decision to accept truncation; `summary` **at or under 155 chars** or the same; `date` **corrected**; `lastReviewed` **updated to the day of the change** |
| 11. Em-dashes | I1 | **0** |
| 12. Build | `tsc --noEmit` | Green. **The route is `dynamicParams = false` with static params from `publishedGuideTopicsWithFile()`, so a frontmatter error fails the build rather than the page.** |

### 7.7 Extra hard constraints

1. **No em-dashes (U+2014) anywhere, including frontmatter.** Live count 0, must stay 0. I1, hard fail.
2. **Do not change any heading `id` without listing it.** The route renders them as a visible table of contents
   and as anchor targets. §7.2.
3. **Do not add a live calculation to this page.** B2, B6, 4.6 theme 9. **The calculator sibling owns it and
   this page already links to it in its first paragraph.**
4. **Do not add an email gate or any interruptive surface.** I7 and the standing rule. **The route serves the
   file ungated and says so ("No email required"); `RESOURCE_EMAIL_DELIVERY` is off.** Declining 4.6 theme 8 is
   a deliberate decision.
5. **Do not edit the route file** (`resources/[topic]/page.tsx`). Its canonical fix is already committed
   (§1.3) and the closing CTA is shared by every resource page.
6. **Do not edit `lib/resources/registry.ts`.** The download label lives there and is shared.
7. **Do not edit `compute/incorporation.ts` or the premium config.** §6.3 point 9 and §10.1. **A writer
   harmonising this page's column description with the calculator's behaviour would be encoding a bug into
   prose; the direction of the fix is unknown until the workbook is read.**
8. **No named individual, no credential, no byline.** I2. `author` stays an organisation.
9. **Never state or imply that a doctor's ordinary personal service company can hold an NHS contract**, and
   never state the flat "no limited company can". §2.C.
10. **Never describe the 2015 NHS scheme as final salary.** §2.
11. **Never state that 2025/26 is the current tax year**, and never write the 2026/27 dividend rates as an
    upcoming change. §5. **The live page is correct on both; the constraint protects it.**
12. **Never present incorporation as a clear tax win**, and never assert a saving range. §5, F6, I6.
13. **Never use UDAs, dental bands or any dental framing.** §3.
14. **One change per page per window** (§9.3).

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
139 URLs indexed, 51 never fetched**. Bing 360 clicks / 9,818 impressions. **Bing out-clicks Google 3.3x.**

**Namespace context, and it inverts the site pattern.** The two other `/resources/` URLs earn **63 and 61
Google impressions at positions 12.2 and 12.6** and **zero Bing impressions**, while every `/calculators/` URL
earns Bing impressions and **zero** Google impressions (§2.1, calculator pack §2.2). **On this domain, resource
pages are the one non-blog surface Google takes.**

**And the confounder that makes all of it provisional.** Until the next Medical deploy this URL has been
declaring the homepage as its canonical (§1.3). **The zero is therefore not clean evidence about the page.**

### 8.2 The read at 14 to 28 days

**This is the one surface in wave C where the primary expectation is NOT Bing, and the reason is measured.**

1. **Bing.** **No expectation is set. No `/resources/` URL on this site has ever earned a Bing impression**, so
   a first Bing impression here would be new information rather than a target, and its absence would carry none.
   **Recorded so the 28-day read does not score a zero as a failure.**
2. **Google, first appearance.** By day 28, this URL returns **at least 1 impression** on the GSC `page`
   dimension. **Endpoint named: GSC `searchanalytics.query`, `page` dimension, never compared to a Bing
   figure.** **Today: 0.** **Stated with LOW confidence and one strong caveat: it depends on the canonical fix
   deploying, which is a code change this wave does not own.**
3. **Named phrases.** At least **4 of the 7** phrases in §7.1 are present in the shipped page. **That is a
   content check run on the file, not a search check**, and it is the only §7.1 check that can be scored at 14
   days on a surface with no query data.
4. **Per §9.6 point 2, site traffic rising while this URL stays at zero impressions is not by itself a failure
   here**, because the page's job is downstream of acquisition (§3.2 point 3). **The drift test that does apply:
   if the calculator sibling starts returning impressions for phrases this page owns, the boundary has moved and
   §5.1 is re-read.**

### 8.3 The read at 28 to 90 days, Google, and the honest statement

**Google is crawl-starved on this domain and this page must not be promised a position lift** (§5.3).
STATE 2026-09-01: **18 of 139 URLs indexed, 117 not, 51 unknown to Google entirely.**

5. **Indexation.** By day 90 this URL is `Indexed`, measured by
   `python -m optimisation_engine.snapshot.index_coverage medical --fresh --skip-bing`. **LOW confidence, not in
   this page's gift, and the not-indexed side of that sweep carries +/- 6** (the same sweep twice, twenty
   minutes apart, moved six URLs across the discovered/unknown boundary).
6. **If impressions appear, the band to read them against is the namespace's: 61 to 63 impressions at position
   12.2 to 12.6 over 90 days.** **That is context, not a target, and it must not be quoted back as one.** Those
   two siblings are older, deeper-linked pages on higher-demand topics.
7. **No position target is set, deliberately.**

### 8.4 Failure triggers (§9.6, written as numbers, before the change)

> **TRIGGER 1, THE NAMESPACE, and it is the only wave-C trigger with a real baseline.** If the combined GSC
> `page`-dimension impressions across the three `/resources/` URLs (**124 in the current window**, of which
> this page is 0) fall **below 90** in a rolling 90-day window between deploy and deploy+90 days, the change is
> suspected of harming the namespace and is reverted. **Those two siblings are the best-positioned non-blog
> pages on the site and nothing in wave C touches them, so a fall would point at the shared route or at
> cannibalisation from this page.**

> **TRIGGER 2, the frozen neighbour.** If `/blog/gp-limited-company-tax-benefits-drawbacks` (4 clicks / 96
> impressions / position 5.7) falls below **position 9.0**, or below **2 clicks** in a rolling 28-day window,
> between deploy and deploy+90 days, treat wave C as the prime suspect.

> **TRIGGER 3, self-competition inside the set.** If, at the 28-day read, two or more of the four wave-C
> surfaces return impressions on either engine for the **same** named query, the differentiation has failed and
> the conductor re-reads §5.0 before any further change to any of the four. **The most likely pair is this page
> and the calculator** (§5.1).

> **TRIGGER 4, the contradiction.** If the shipped page still describes the workbook as deducting the director
> salary before corporation tax while `calcIncorporation` does the opposite, and the `.xlsx` has not been read,
> **the page is held rather than deployed.** §6.3 point 9, §10.1. **This is a correctness trigger and it does
> not wait for a measurement window.**

> **TRIGGER 5, quality.** If editorial QA raises a **V1, V3 or V5 finding on three or more** of the four
> surfaces, wave C has reproduced the batch-1 defect and its pages are **held rather than deployed**.

**Revert path, restated.** `git revert <the wave-C commit>`, sha derived live at revert time. Single-file:
`git checkout <this file's pre-wave sha> -- Medical/web/content/resources/incorporation-private.md`, and
**re-derive that sha with `git log -1 --format=%H -- <path>` rather than reusing `0abd26e7` from this document,
because the file was last touched hours before this pack was written and the anchor is unusually fresh.**
**No `monitored_pages` row exists for this page and none is created by this wave; registration is owner-gated,
post-deploy.**

**Tracker discipline (§9.6).** **`blog_optimizations` is a blog table and this is a `/resources/` route**, so
there may be no row shape for this surface at all. §10.3.

---

## 9. The ownership map, reproduced

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a brief and the map disagree, THE MAP WINS.**

### 9.1 This page owns no O-row, and its territory is defined by B3 and B6 instead

**No row in the map names a resource page as the owner of an incorporation fact.** O33 (and the proposed O33a /
O33b split, step-by-step pack §9.2) covers the prose; B2 gives the live computation to the calculator.
**This page's exclusive territory is the DOCUMENTATION of the downloadable model: its construction, its
simplifications and its omissions** (B3, B6). That is not an O-row because the map governs facts and this
governs a file.

**Stated positively for the writer: everything on this page that is not a statement about what the workbook does
is one sentence and a link.** **That is the test the two over-budget bullets fail today** (§6.3 points 2 and 3).

### 9.2 THE ROWS THAT CONSTRAIN THIS PAGE

| # | Shared fact | Owner | **What THIS page does** |
|---|---|---|---|
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link. No figure.** The live page is inside budget (§6.3 point 4); the constraint protects it. |
| **O4** | Scheme Pays | `/calculators/nhs-pension-scheme-pays` | **No batch-3 page states a Scheme Pays deadline. The exact fact that broke batch 1.** Not needed here. |
| **O9** | GMC annual retention fee, **amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page states a GMC fee figure. Hard fail F5.** Not relevant here; listed for completeness. |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) | **Nothing.** |
| **O21-VAT** | The £90,000 threshold, 30-day rule, £88,000 deregistration limit | `/blog/gp-vat-registration` (**FROZEN to 2026-09-10**) | **Nothing.** Cited as `O21-VAT`, never `O21` (BATCH3_INDEX §6.1a namespace collision). |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link, if needed. |
| **O33 / O33a** | The incorporation step sequence and the pension-accrual pairing PROSE | `/blog/medical-practice-incorporation-step-by-step` | **One sentence and a link for the process** (already done, in the first paragraph, and done well). **The pension pairing is different: §2.C makes stating the accrual loss mandatory wherever a saving is presented, and this page presents one.** So it **states** the pairing and does not **own** it. **The live block is the corpus's best execution of that and stays.** |
| **O33b** (proposed, step-by-step pack §9.2) | TCGA 1992 s.162 in full, including the FA 2026 s.39 claim regime | `/blog/incorporation-relief-private-medical-practice-s162` | **One sentence and a link, no figure.** The live `Getting there and running it` bullet already does exactly this. **KEEP that shape.** |
| **O34** | Salary versus dividend extraction (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **The dividend rates may be stated ONCE as the model's basis** (B5's single exception here, 4.6 theme 7). **Everything else is one sentence and a link. The `Any extraction route other than salary plus dividend` bullet is over budget today** (§6.3 point 3). |
| **O35** | The employment-status fork for doctors | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** Relevant because the `NHS PAYE income` input means different things for a partner and a salaried GP, **and the live page's input description is careful about this already.** |
| **C3-01** (proposed, step-by-step pack §10.2) | s.455 rate, timing, s.458 deferred relief | `/blog/consultant-directors-loan-account-s455-medical-company` | **One sentence and a link. Over budget today at roughly three sentences** (§6.3 point 2). |
| **C3-02** (proposed, step-by-step pack §10.2) | BADR rate band, £1m limit, the 24% rate it saves against | `/blog/selling-private-medical-practice-cgt-badr` (wave F) | **Nothing. Compliant today.** |

### 9.3 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. **This pack proposes no boundary change.** It relies on
the O33a / O33b clarification proposed in the step-by-step pack §9.2 and on the two rows proposed at §10.2
there, applies none of them, and sets its own allowances so that they are safe under either ruling.

### 9.4 Batch-level style watch (V5, V9), and it is the CONDUCTOR's job

Batch 1 produced `it is not X, it is Y`. Batch 2 produced the numeral-count paragraph opener (22 instances
across seven pages against a cap of two). Round 3 of the 2026-08-26 batch found a fourth tic forming:
self-announcing sufficiency claims. **V9 is explicit that banning a tic produces the next one.**

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   four surfaces, is named in wave C's fix pass, whatever it is.**
2. **Named and burned, do not reach for any:** `it is not X, it is Y` (cap once per page, wave-wide); the
   numeral-count paragraph opener (cap once, prefer zero); the self-announcing sufficiency claim (prefer zero).
   **This page's live copy is clean on all three** (§6.3 points 12 and 13), **so its whole budget is available
   and the correct spend is still zero.**
3. **The corrective-clause reflex is on its fourth showing and this page carries one instance** ("This is not
   decoration"), which is below cap and correct. **It must not be joined by a second.**
4. **V1 hard cap: two word orders per idea per page, non-overlapping longest matches, never raw substrings.**
5. **V2 is a live standard, not a batch-2 rule.**
6. **Process narration is banned** (conductor ruling 3, 2026-08-26). **This page is the corpus's best example of
   the compliant handoff** (§6.3 point 15) **and the conductor should hold it up to the other three writers as
   the model rather than only enforcing the rule negatively.**

---

## 10. Corrections, findings and escalations

**None was acted on. Nothing outside this file was written.**

### 10.1 THE ONE THAT BLOCKS THIS SURFACE: nobody has opened the workbook, and the manual and the calculator disagree

This page says the limited company column "**deducts the director salary, charges corporation tax on what is
left**". `calcIncorporation` charges corporation tax on the whole profit and deducts the salary from the
post-tax balance (§6.3 point 9). **Those are different models and they produce different answers.**

**Three possibilities and they need different fixes:**

| If | Then |
|---|---|
| The `.xlsx` matches this page (salary deducted before CT) | **The calculator has a bug** (calculator pack §6.4 defect A) and this page is right. Fix the code; this page's prose is untouched. |
| The `.xlsx` matches the calculator (CT charged first) | **This page's prose is wrong** and must be corrected to describe what the file does, and the file itself arguably has the same bug. |
| The `.xlsx` does neither | Both surfaces are wrong and the workbook is the thing to fix. |

**The check is one file open: `Medical/web/public/resources/incorporation-private/incorporation-model.xlsx`,
read the formulas in the limited company column.** **This task did not do it**, because the mandate is
preparation and reading a binary artefact to adjudicate a code defect is the manager-direct work that §10 of the
calculator pack escalates.

**Trigger 4 in §8.4 makes this blocking: the page is held rather than deployed until the workbook is read.**
It is the only hard blocker in wave C and it costs minutes to clear.

### 10.2 The calculator sibling's fabricated saving range must not migrate here

`/calculators/private-practice-incorporation`'s live `explainer` asserts that incorporating "can save **£5,000 to
£20,000 per year**" and that below "roughly **£50,000 to £70,000**" of private income the costs outweigh the
saving. **Neither has a source, neither is derivable from the model on the same page, and both contradict
`house_positions.md` §5's "do NOT present incorporation as a clear tax win at typical private-income levels in
2026/27".** F6 and I6.

**It is recorded HERE, in a pack for a different surface, for one reason: this page is the natural place a
harmonisation pass would move it to**, because this page is where the model's economics are discussed. **The ban
is explicit at §7.4 and the gate is D13 in the calculator pack's §7.3.** **Harmonise upward, toward this page's
discipline, never downward.**

### 10.3 Two of wave C's four surfaces cannot be tracked the way the spec assumes

§9.6's tracker discipline populates `blog_optimizations.target_keywords` with the pack's missing-phrase list.
**`blog_optimizations` is a blog table.** This surface is a `/resources/` route and the calculator sibling is a
TSX config, so **half of wave C has no row shape in the tracker** and its 28-day read has to be run directly
against the GSC and Bing pulls.

**Recorded rather than worked around.** It is a shared-engine gap, it will recur on every site with resource and
calculator surfaces, and it belongs in `REWRITE_PROGRAM.md` rather than in a per-site pack. Also recorded in the
calculator pack §10.3, so a conductor reading either finds it.

### 10.4 Three smaller findings on this file

1. **`resourceLabel` and `resourceId` in the frontmatter appear to be dead.** The route takes the download
   label and file path from `lib/resources/registry.ts` (`xlsx.label`, `xlsx.file`), not from the frontmatter.
   **Two sources of truth for the same string, one of them unread.** Not verified exhaustively (other tooling
   may read the frontmatter), so it is recorded as a question rather than a finding. **If they are dead they
   should go, because a stale unread label is how a wrong file name reaches a reader later.**
2. **`title` and `summary` each do two jobs with incompatible length budgets** (§6.3 points 6 and 7): `title` is
   the `<title>` **and** the visible `<h1>` at 86 characters; `summary` is the `<meta description>` **and** a
   visible standfirst at 247 characters. **Every other route in the app separates `metaTitle` from `h1` and
   `metaDescription` from a visible summary; this route does not.** The writer can only trade one job off
   against the other. **Proposed as a route-level improvement (add optional `metaTitle` and `metaDescription`
   frontmatter keys, falling back to `title` and `summary`), not made by this task**, because the route is
   shared by three pages and one of them is inside nobody's window.
3. **`date: "2025-09-01"` is a year stale** and is exactly one year before today, which is the signature of a
   template default rather than a real date. Not rendered, so not a live reader-facing error, but wrong at
   source. **Correct it in the wave, and set `lastReviewed` to the day of the change.**

### 10.5 What this page should be used for beyond its own rewrite

**§6.3 point 15 and §5.2 make this page the corpus's reference implementation for three things the other three
surfaces get wrong:** the compliant handoff written in the reader's terms with no process narration; the
completed-past framing of the 6 April 2026 dividend change; and the flat, unhedged statement that dividends are
not NHS pensionable, paired with a refusal to price the accrual.

**Recommendation to the conductor: circulate this page's three passages to the other three wave-C writers as
worked examples before drafting, rather than only circulating the rules.** Batch 1's lesson was that ten authors
given the same rules produce the same tic; a worked example of the behaviour is cheaper to follow than a
prohibition. **Not a rule change and not applied by this task.**

---

## 11. Limitations

1. **This surface has no measurement history on either engine**, and its zero is confounded by a live canonical
   defect that has been declaring the homepage since before the window opened (§1.3). **The zero is therefore
   the weakest evidence in wave C and it is stated as such rather than reasoned from.**
2. **The harvest contains no vocabulary for this surface at all**: zero rows for `spreadsheet`, `template`,
   `model`, `workbook`, `excel`, `xlsx` or `download` across 1,153 keywords (§3.2). §7.1 is built from the
   model's own vocabulary and from `house_positions.md`, and it is deliberately short and mostly protective.
3. **Peer-winnable is Google-derived.** Read every peer-winnable figure as a **floor**. On this namespace,
   unusually, Google is the relevant channel (§2.1), so the limitation bites less here than on the calculator.
4. **`GetPageStats` is a top-N endpoint.** The Bing zeros are floors, not proven absences. **Note that every
   `/resources/` URL is absent, including two that earn Google impressions, so the namespace's Bing absence is
   consistent and probably real rather than a top-N artefact.**
5. **Thirteen competitor URLs were fetched across this set; two required a client change to recover**
   (step-by-step pack §10.1); one was deliberately not fetched with its reason recorded. **No fetch was silently
   dropped.** **The finding at 4.1, that no competitor documents a downloadable model, is a negative established
   over thirteen pages and not over the whole market**, and it is stated at that strength.
6. **No live-production check was run against medicalaccounts.co.uk by this task.** The rendering description at
   §1 is traced through `resources/[topic]/page.tsx` to the call site, not from a request to the live site.
   **The canonical status at §1.3 is taken from STATE's own live audit of 2026-09-01 plus a read of the current
   route file, which shows the fix present in the repo.** Whether it has since deployed was not checked.
7. **THE `.xlsx` WAS NOT OPENED** (§10.1, §7.5). **This is the single largest gap in this pack**, because the
   page is documentation for a file nobody in this task read, and it is the blocker at §8.4 trigger 4.
8. **The scratchpad is contended.** A concurrent agent overwrote this task's first pull script mid-run
   (BATCH3_INDEX D10, recurring). Every figure is from a re-run under a uniquely named file, and a sibling
   agent's independent pull reproduced two sibling-page figures exactly.
