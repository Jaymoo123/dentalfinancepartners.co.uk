# §9.5 RESEARCH PACK: /blog/gp-practice-income-pcse-statement-reconciliation

Built 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, the data sheet
generated for this page, and live competitor fetches made the same day. Spec: `docs/_engines/REWRITE_PROGRAM.md`
§9.2 to §9.5, §9.9, §9.10. Ground truth: `docs/medical/house_positions.md`. Peer classification:
`docs/medical/competitor_universe_2026-08-26.md`.

No new DataForSEO calls were made. No file under `Medical/web/` was edited. No commit, no deploy, no
`monitored_pages` write, no monitor or alert created.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY.**

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/gp-practice-income-pcse-statement-reconciliation` |
| Cluster / topic | `pcse contact and enquiries` (dossier §3, "Topics with a page of ours") |
| Lane | `practice_income` (per the data sheet); the site lane taxonomy files PCSE administrative language under `pension_admin_pcse` and practice funding under `nhs_practice_income`, `docs/medical/competitor_universe_2026-08-26.md` §3 |
| Source file | `Medical/web/content/blog/gp-practice-income-pcse-statement-reconciliation.md` |
| **Rendering** | **Markdown post.** The writer edits the `.md` file directly. Body is raw HTML inside the markdown file (see §6), frontmatter carries `metaTitle`, `h1`, `keyTakeaways`, `summary` and the `faqs` list. |
| Current sha (revert anchor) | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/gp-practice-income-pcse-statement-reconciliation.md` |

**What may NOT change (must come back byte-identical):**

1. `metaTitle`: `Reading and Reconciling Your GP Practice PCSE Statements`
2. `h1`: `Are You Actually Being Paid What You Are Owed? Reading and Reconciling Your PCSE Statements`
3. `title`: `Checking Your GP Practice Income: PCSE Statements and Reconciliation`
4. The existing H2 sequence, in this relative order, each string unchanged:
   1. `Where GP Practice Income Comes From, and Who Pays It`
   2. `How to Read Your PCSE Online Payment Statement`
   3. `Reconciling the Statement Against What You Are Owed`
   4. `Spotting and Recovering an Underpayment`
   5. `Building Reconciliation Into the Practice's Routine`
   6. `How We Help Practices Reconcile NHS Income`
   7. `Related Reading`
5. Every existing H3, every existing paragraph, every existing FAQ question and answer. **Nothing existing is
   reworded, reordered, shortened or "tidied".** No rewrite of the intro. No new key takeaways replacing old ones.
6. `slug`, `canonical`, `category`, `date`, `image` and the whole `imageCredit` block.

**What MAY change:**

1. **New H2 blocks appended into the body**, carrying the missing phrasings. Place them **immediately before**
   the existing `How We Help Practices Reconcile NHS Income` H2, so the seven existing H2s keep their relative
   order and the byte-identical check reads them as an unbroken subsequence. Appending after `Related Reading`
   is also permitted but reads badly; before the "How We Help" block is the house pattern.
2. **New FAQ entries appended to the end of the `faqs:` list** in frontmatter. Existing entries stay in place
   and unchanged.
3. **New key takeaways appended** to `keyTakeaways` (optional; existing five stay).
4. New internal links inside the NEW blocks only. Do not add links into existing paragraphs (one change per
   page per window, §9.3).

### Frozen-list position

This page is **not** on the frozen list. Batch 1 excludes the **16 pages** carrying an armed `monitored_pages`
window to **2026-09-10** (dossier §6, all `rewrite_date` 2026-06-12, `rewrite_type` 'rewrite'), and treats the
**3 `status='flagged'` rows** (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) as
**HOLD**, because a flagged monitor is a question and not a clearance. Neither list contains this slug, so it is
workable now.

**Never propose a collapse, a redirect or a URL change (§5 locked rules). Rewrite in place only. No em-dashes.**

---

## 2. Equity register

*Copied verbatim from the data sheet, including its provenance lines.*

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/gp-practice-income-pcse-statement-reconciliation)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **64** | impressions 129 | clicks 17.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| pcse gp remittance advice | 4 | 2 | 4.0 |
| what does gpftg mean on pcse statemenmt | 1 | 2 | 4.0 |
| pcse statements | 8 | 1 | 4.2 |
| understanding pcse gpp sttaements | 3 | 1 | 4.0 |
| gpp payments report nhs what does gpp stand for | 2 | 1 | 5.0 |
| what does a/m mean on pcse statement | 1 | 1 | 5.0 |
| view gpp statement pcse | 1 | 1 | 4.0 |
| pcse statement explained | 1 | 1 | 6.0 |
| pcse statement is rent paid in advance or arrears | 1 | 1 | 3.0 |
| what does this mean on a pcse statement: znpt2g | 1 | 1 | 4.0 |
| pcse monthly gp statement explained | 1 | 1 | 1.0 |
| pcse statement import for xero | 1 | 1 | 9.0 |
| things to check on a pcse drug statement | 1 | 1 | 4.0 |
| pcse statements local log in | 1 | 1 | 9.0 |
| how to understand gpp payment for a gp practice uk | 1 | 1 | 2.0 |
| pcse staement | 8 | 0 | 4.8 |
| pcse online statement | 7 | 0 | 3.0 |
| what is pcse | 6 | 0 | 6.3 |
| what does pcse stand for | 6 | 0 | 4.2 |
| pcse | 5 | 0 | 6.0 |
| pcse payments pcn | 4 | 0 | 4.8 |
| pcse pcn | 3 | 0 | 6.0 |
| pcse statement | 3 | 0 | 3.0 |
| gpp statements explained | 2 | 0 | 4.0 |
| pcse gp practice monthly update | 2 | 0 | 6.0 |
| pcse gp payments | 2 | 0 | 6.0 |
| how are dispensing fees calculated on pcse statements | 2 | 0 | 4.0 |
| pcse online paycode state | 2 | 0 | 10.0 |
| finance statements prior to pcse | 2 | 0 | 2.0 |
| pcse online6.27 nhs gp contract | 2 | 0 | 5.0 |
| do the claims for enhanced services work go on pcse | 2 | 0 | 1.0 |
| pcse gpp | 2 | 0 | 3.0 |
| capitation report pcse | 2 | 0 | 5.0 |
| pcse change of remittance advice | 2 | 0 | 4.0 |
| wpcc income pcse statement | 2 | 0 | 3.0 |
| pcse accountant access to statements | 2 | 0 | 6.0 |
| pcse gp payment request | 2 | 0 | 5.0 |
| pcse statement code locadg meaning | 2 | 0 | 4.0 |
| pcse statement pay code locsig meaning | 2 | 0 | 4.0 |
| pcse online pcn module | 2 | 0 | 7.0 |
| pcse reimbursement i come | 2 | 0 | 4.0 |
| gp payment statement examples | 1 | 0 | 4.0 |
| what does credit com mean on the gpp statement and why has money been deducted nhs gp surgery | 1 | 0 | 4.0 |
| pcse drug statements | 1 | 0 | 10.0 |
| pcse statement dispensing gps - professional fees, where does this amount come from | 1 | 0 | 1.0 |
| pcse secondary sample statement | 1 | 0 | 9.0 |
| pcse pzyments pcn | 1 | 0 | 5.0 |
| pcse achievement report | 1 | 0 | 9.0 |
| gp statement | 1 | 0 | 4.0 |
| pcse payment query | 1 | 0 | 3.0 |
| pcse finance | 1 | 0 | 9.0 |
| total from com nhs pcse statement | 1 | 0 | 3.0 |
| pcse statement, which one has the global sum payment on it uk | 1 | 0 | 2.0 |
| pcse paycodes | 1 | 0 | 7.0 |
| jow to download statements from pcse | 1 | 0 | 3.0 |
| another way to say pcse so a patient knows | 1 | 0 | 6.0 |
| gp payments on bank statement | 1 | 0 | 4.0 |
| how to download pcse reconcilation | 1 | 0 | 3.0 |
| pcse change remittance advise | 1 | 0 | 9.0 |
| out of hours services pcse statement | 1 | 0 | 5.0 |
| videos on pcse statement | 1 | 0 | 6.0 |
| what does pcse mean nhs | 1 | 0 | 5.0 |
| what is gpp payments by pcse? | 1 | 0 | 4.0 |
| how do i view my practice statement in pcse portal | 1 | 0 | 7.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set

*Copied verbatim from the data sheet, including its provenance lines.*

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
\bpcse\b|primary care support england|type 2 (pension )?(form|certificate)|gp pension (statement|record)|open exeter
```

Keywords in topic: **13** | combined volume **2,440** | peer-winnable volume **0** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 8
| **Absent verbatim from this page: 12 of 13. Absent from the whole 105-page corpus: 12.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 1000 | 14 | sandisoneasson.co.uk | no | **no** | no | pcse contact us |
| 390 | 13 | sandisoneasson.co.uk | no | **no** | no | pcse contact number |
| 260 | 18 | sandisoneasson.co.uk | no | **no** | no | pcse contact |
| 140 | 18 | sandisoneasson.co.uk | no | **no** | no | contact pcse |
| 110 | 6 | bma.org.uk | no | **no** | no | pcse pension |
| 110 | 5 | bma.org.uk | no | **no** | no | pcse pensions |
| 70 | 19 | sandisoneasson.co.uk | no | **no** | no | pcse online enquiry form |
| 70 | 12 | bhp.co.uk | no | **no** | no | pcse type 2 form |
| 70 | 5 | bma.org.uk | no | **no** | no | type 2 pension form |
| 70 | 31 | practiceindex.co.uk | no | YES | yes | what is pcse |
| 50 | 18 | sandisoneasson.co.uk | no | **no** | no | pcse enquiries |
| 50 | 25 | practiceindex.co.uk | no | **no** | no | pcse meaning |
| 50 | 19 | sandisoneasson.co.uk | no | **no** | no | pcse phone number |

**Reading note for the writer.** Peer-winnable volume is 0 for this topic. That is a Google-derived number
(dossier §11 limitation 6) and it **sequences** the work, it never excludes it (owner decision 21). On this URL
the engine that pays is Bing: 17 clicks against zero Google query rows. Treat the peer-winnable column here as
telling you this is not a Google land-grab, and the Bing table in section 2 as telling you what the work is.

---

## 4. Competitor teardown

All 10 competitor URLs listed at the bottom of the data sheet were fetched on 2026-08-26. **Nothing was capped**
(the 12-URL cap did not bind). Every URL is accounted for below, including the one that failed to parse.

Domain classification per `docs/medical/competitor_universe_2026-08-26.md` §2a and §2b.

### 4.1 sandisoneasson.co.uk, GP Payments and Pension Queries
`https://www.sandisoneasson.co.uk/news/post/gp-payments-pension-queries1`
**Class: PEER** (universe §2a #7, specialist medical accountancy, AISMA member, 12 URLs in sitemap, "ranks on
authority, not volume"). Holds 9 of this topic's 13 keywords, the largest single holder.

| | |
|---|---|
| Title / H1 | `GP Payments and Pension Queries` (identical) |
| Word count | ~350 |
| H2/H3 | Body carries no content headings. The extracted heading list is chrome: `Blog Menu`, `User Menu`, `Resources`, `Posts By Category`, `10 Most Recent Posts`, `Posts By Month`, `Address`, `Links` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** a single announcement that PCSE replaced its query email addresses with an online enquiry form, and
a note that the 2016/17 Certificate of Pensionable Profit was pending with a 28 February 2018 deadline. Names
the live route `https://pcse.england.nhs.uk/contact-us/` and the two discontinued addresses
`pcse.gp-pensions@nhs.net` and `pcse.gp-payments@nhs.net`.
**Structure:** a 350-word news post with no headings at all, wrapped in heavy site chrome.
**What it gets wrong or omits:** it is a **2018 news item ranking in 2026** for "pcse contact us" (1,000/mo),
"pcse contact number" (390), "pcse contact" (260), "contact pcse" (140), "pcse enquiries" (50) and "pcse phone
number" (50). It carries no phone number, no current process, no statement guidance and no reconciliation
content. **This is the single most important finding in the teardown: 1,890 monthly searches of contact intent
are being served by a stale 350-word announcement with no headings.** A page that answers "how do I contact PCSE
about a payment query, and which route works for which problem" beats it on substance without needing authority.

### 4.2 practiceindex.co.uk, PCSE online: A new dawn
`https://practiceindex.co.uk/gp/blog/pcse-online-a-new-dawn/`
**Class: PEER** (universe §2a #6, GP practice-manager publisher and directory, content-peer on informational
queries).

| | |
|---|---|
| Title / H1 | `PCSE online: A new dawn – by Paula the PM` (identical) |
| Published | 17 June 2021 |
| Word count | ~1,200 |
| H2/H3 | `Related Posts` only. No content headings. |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** a practice manager's first-person account of the PCSE Online launch, cataloguing missing payment
statements, absent GP pension records, unclear charges and unintuitive navigation.
**Structure:** unbroken narrative, no headings, no scannable answer anywhere.
**What it gets wrong or omits:** it is a complaint, not a guide. No workaround, no route to a fix, no
explanation of any statement line, no query process. It ranks for "what is pcse" (70) and "pcse meaning" (50) at
positions 31 and 25, which is a weak hold. A page that actually defines PCSE in one sentence and then explains
the statement should take those.

### 4.3 bma.org.uk, Guidance for GPs in England on getting your pension record up to date
`https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/guidance-for-gps-in-england-on-getting-your-pension-record-up-to-date`
**Class: UNWINNABLE AUTHORITY** (universe §2b, trade union, 15 of 18 head terms, "cannot be outranked on brand").
In scope for vocabulary under owner decision 21, and per dossier §2 the single largest supplier of missing
vocabulary in the whole map.

| | |
|---|---|
| Title / H1 | `Guidance for GPs in England on getting your pension record up to date` (identical) |
| Word count | ~2,100 |
| H2 | `Background`; `A step by step guide to ensure you have accurate pension records`; `About the BMA`; `Shortcuts`; `Legal`; `Follow the BMA` |
| H3 (inside the step guide) | `1. Request information about your pension from NHS Pensions`; `2. Check your PCSE Pensions Online Portal and submit the required forms`; `3. Raise a complaint with PCSE`; `4. Escalate the complaint to NHS England`; `5. Seek compensation as a result of maladministration by PCSE`; `6. Ask for the Pensions Ombudsman's help`; `7. Report PCSE to the Pensions Regulator`; `8. BMA Pensions Department` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the escalation ladder when a pension record is wrong. States that 56% of English GPs have incomplete
records. Names the PCSE Pensions Online Portal, Type 1 and Type 2 forms, NHS Pensions 05 and AA statements, and
three service standards: acknowledgement in 3 working days, complaint resolution target 40 calendar days, case
closure risk after 90 days of inactivity.
**Structure:** the strongest structure in the whole set. Numbered escalation steps, each an H3, each with a
named body to escalate to.
**What it gets wrong or omits:** it is pension-record only. It says nothing about the **payment** statement, the
GPP statement, paycodes, Global Sum reconciliation, QOF or enhanced-service payment lines. It also carries no
deadlines for the forms themselves.
**Steal the shape, not the ground:** the escalation ladder (PCSE, then commissioner, then NHS England, then
Ombudsman) is exactly the missing structure on our payments-query section, where our page currently says only
"push both PCSE and the commissioner".

### 4.4 rbp.co.uk, Pension and the PCSE, A New Hope?
`https://www.rbp.co.uk/news/pension-and-the-pcse-a-new-hope`
**Class: PEER** (universe §2a #22, specialist medical accountancy firm, retained on specialism despite weak
SERP evidence).

| | |
|---|---|
| Title / H1 | `Pension and the PCSE - A New Hope?` (identical) |
| Published | 02.07.2019 |
| Word count | ~1,200 |
| H2/H3 | `April`; `August`; `September – January`; `February`; `March`; `Annual Allowance`; `Summary`; `Related Content`; `Associated Companies`; `Services` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the GP pension year as a **month-by-month calendar**, April through March, with what PCSE expects
when, plus an annual-allowance note.
**Structure:** the calendar-as-headings device is genuinely good and nobody else in this set uses it.
**What it gets wrong or omits:** 2019 vintage, so every deadline in it needs re-verification; explicitly
disclaims advice; pension only, no payment statement, no paycode, no reconciliation.

### 4.5 bhp.co.uk, Type 2 pension certificates for medical practitioners
`https://bhp.co.uk/news-events/blog/type-2-pension-certificates-for-medical-practitioners/`
**Class: PEER** (universe §2a #15, regional generalist with a healthcare team). Holds `pcse type 2 form` (70) at
position 12.

| | |
|---|---|
| Title | `Type 2 pension certificates for medical practitioners - BHP, Chartered Accountants` |
| H1 | `Type 2 pension certificates for medical practitioners` |
| Word count | ~650 |
| H2/H3 | `Who needs to complete a Type 2 pension certificate?`; `What is included on the certificate?`; `PCSE Contributions Statement`; `Locums`; `Pension record` |
| Tables | No |
| Calculator | References the NHS Pensions annualisation calculator, does not host one |
| FAQ block | No |

**Covers:** who completes a Type 2 (salaried GPs and self-employed out-of-hours providers), what income goes on
it, and how to verify contributions against the **PCSE Contributions Statement**.
**What it gets wrong or omits:** the only deadline it states is `2022/23 certificate has been extended from 28
February 2024 to 31 March 2024`, which is three years stale and is exactly the trap our page must not copy.
House position §2.C is the current authority: Type 1, Type 2 and the practice Estimate of Pensionable Profits
all run to **28 February a year in arrears**, so 2025/26 is due 28 February 2027. No Type 1 detail, no tier
formula, no appeal route.
**Note the crossover:** BHP's `PCSE Contributions Statement` heading is the bridge between the pension-forms
vocabulary and the payment-statement vocabulary. Ours is the only page in the set positioned to hold both.

### 4.6 nicholsmedical.co.uk, Type 2 Self-Assessment Form
`https://nicholsmedical.co.uk/news/type-2-self-assessment-form/`
**Class: PEER** (universe §2a #10, specialist medical accountancy firm).

| | |
|---|---|
| Title | `Type 2 Self-Assessment Form: New Deadline is Fast Approaching - Nichols Medical Accountants` |
| H1 | `Type 2 Self-Assessment Form: New Deadline is Fast Approaching` |
| Word count | ~800 |
| H2/H3 | `What is a Type 2 Form?`; `Why are Type 2 Self-Assessment Forms Required?`; `Who is required to submit a Type 2 Form?`; `What is the new Type 2 Form deadline?`; `What to do if you need assistance with submitting your Type 2 Form`; `Need advice on this topic?`; `Why not book a meeting to discuss?` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the Type 2 form in plain question-headings. Deadline stated: 31 March 2024.
**What it gets wrong or omits:** same stale-deadline problem as 4.5. No calculation method, no submission
mechanics, no penalty position. The heading pattern (`What is X` / `Why is X required` / `Who must do X` / `What
is the deadline`) is the market's shape for this vocabulary and is worth copying as a shape.

### 4.7 rbp.co.uk, Info Request Checklist for Type 2 2023-24 (PDF)
`https://www.rbp.co.uk/images/Info-Request-Checklist-for-Type-2-2023-24.pdf`
**Class: PEER** (same domain as 4.4).
**FLAGGED GAP.** The PDF was retrieved (61.8 KB, `application/pdf`) but **did not render to text**: compressed
streams, no extractable headings, title and word count unknown. Not an HTTP failure and not a silent drop.
Treated as keyword-data-only per §9.10. It holds 2 of the topic's keywords. Its existence is itself a signal:
a peer publishes a **client information-request checklist** for the Type 2 as a downloadable asset, and no one in
this set publishes the equivalent as an on-page list.

### 4.8 sial-accountants.co.uk, Type 2 Self-Assessment for Salaried and Assistant GPs
`https://sial-accountants.co.uk/type-2-self-assessment-nhs-pension-gps/`
**Class: PEER** (universe §2a #2, specialist medical and dental accountancy firm, 14 of 18 head terms, "ranks on
thin service pages, not on depth").

| | |
|---|---|
| Title | `Type 2 Self-Assessment for NHS Pension Salaried & Assistant GPs` |
| H1 | `Type 2 Self-Assessment for Salaried and Assistant GPs` |
| Word count | ~1,100 |
| H2 | `What Is the Type 2 Self-Assessment Form?`; `Why Accuracy Matters for NHS Pension Contributions`; `How SIAL Accountants Support Salaried and Assistant GPs`; `The Type 2 Self-Assessment Process Explained`; `Common Issues Faced by Salaried and Assistant GPs`; `Protect Your NHS Pension with Confidence`; `Ready to Get Started?` |
| H3 | `Specialist NHS Pension Knowledge`; `Comprehensive Income Review`; `Efficient and Stress-Free Process`; `Step 1: Prepare Your Documents`; `Step 2: Professional Review and Completion`; `Step 3: Timely Submission` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the Type 2 as a service page. Correctly states the **28 February** annual deadline, the only
competitor in the set with the right deadline.
**What it gets wrong or omits:** four of its seven H2s are sales copy. No contribution rates, no calculation, no
eligibility detail beyond the role label. Depth is absent by design.

### 4.9 medicsmoney.co.uk, Annual Pension Returns
`https://medicsmoney.co.uk/annual-pension-returns/`
**Class: PEER** (universe §2a #1, the single strongest peer, 15 of 18 head terms, best position 1).

| | |
|---|---|
| Title / H1 | `Annual Pension Returns - Medics Money` / `Annual Pension Returns` |
| Word count | ~1,200 |
| H2/H3 | `Partners in GP Practices`; `So why does my pension record not get updated?`; `Find a specialist medical independant financial advisor with Medics Money`; `Salaried GPs`; `Some things to watch for 2024/25`; `Annualisation`; `Two lots of pension paid amounts to enter!`; `More accountant direct access`; `Pension Estimates`; `Using PCSE online`; `Join 30,000 doctors and receive free, exclusive, financial CPD for doctors in your inbox`; `About the author`; `Explore our top 10 blog posts here` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** Type 1 and Type 2 returns side by side, why records fail to update, annualisation, the
"two lots of pension paid amounts" trap, **accountant direct access to PCSE**, pension estimates and PCSE Online
use.
**Structure:** headings written as the reader's own question ("So why does my pension record not get updated?",
"Two lots of pension paid amounts to enter!"). This is the register that wins in this niche.
**What it gets wrong or omits:** year-tagged to 2024/25 with a forward reference to 2026/27 estimates, so it is
mid-refresh; no payment-statement content; no formulas.
**Directly relevant to our Bing equity:** `More accountant direct access` is the only competitor treatment
anywhere in this set of the query `pcse accountant access to statements` (2 impressions on our page). It is also
the section our page has the strongest claim to, because we are the accountant.

### 4.10 bma.org.uk, The NHS pension scheme as a sessional GP
`https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/the-nhs-pension-scheme-as-a-sessional-gp`
**Class: UNWINNABLE AUTHORITY** (universe §2b).

| | |
|---|---|
| Title / H1 | `The NHS pension scheme as a sessional GP` (identical) |
| Word count | ~4,200, the longest page in the set |
| H2 | `What pension tier to use`; `Forms needed`; `Who needs to complete a type 2 form`; `Annualisation`; `Death in service`; `Your TRS (total rewards statement)`; `Submitting forms and money`; `Issues with PCSE`; `Nominations`; `Amnesty form`; `Change in process for submitting type 1 and 2 pension forms 2023-2024` |
| H3 | `GP trainees`; `CCG work / ICB work`; `Locum A and B forms`; `SOLO forms`; `Type 2 forms`; `Working in England and Wales`; `Working in Scotland and Northern Ireland`; `Locum GPs`; `Part-time workers`; `Should I pension all my locum work?`; `Workarounds`; `What about a sole locum?`; `What are the benefits for a locum when not in service?`; `When your TRS will be updated`; `If your TRS is blank`; `Submitting money as a locum`; `Submitting forms`; `Use the BMA's GP pension campaign to get your record up to date`; `If your case is closed`; `Complaints` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the whole sessional-GP pension administration surface. States Type 2 due **28 February** (11 months
after the 31 March pension year end), Locum A and B within **10 weeks**, SOLO forms submitted by the employing
organisation, amnesty forms for 2009/10 to 2014/15, and that contributions have been based on annualised
earnings since 1 October 2022.
**Note a live conflict to resolve at source:** BHP (4.5) dates the amnesty window 2009/10 to **2016/17**; the BMA
dates it 2009/10 to **2014/15**. Neither is house-position ground truth. **Do not state an amnesty window on our
page without reading PCSE at source**, and if it cannot be pinned, do not state it at all.
**What it gets wrong or omits:** locum and salaried only, nothing on partner-level Type 1 mechanics, and
nothing at all on the practice payment statement. The `Issues with PCSE` H2 with `If your case is closed` and
`Complaints` H3s is the second-best structural idea in the set after 4.3's escalation ladder.

### 4.11 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

Every theme present on any competitor page above, minus the themes our page already covers (§6). Each is either
**COVER** (goes in a new H2 or FAQ on this page), **DECLINE** (with a stated reason) or **ELSEWHERE** (belongs to
another page). §9.9 floor 8 requires the count of undecided themes to be **zero**. It is zero: 18 themes, 18
decisions.

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | How to contact PCSE, and by which route (4.1) | **COVER** | The topic's whole volume. New H2. Online enquiry form is the live route; the two `@nhs.net` addresses are dead (4.1). |
| 2 | What PCSE stands for and what it does (4.2) | COVERED ALREADY | FAQ 1 already answers this and holds `what is pcse` verbatim. Do not touch it. Add `pcse meaning` and `what does pcse stand for` in a NEW block instead. |
| 3 | Escalation ladder: PCSE, commissioner, NHS England, Ombudsman, Pensions Regulator (4.3) | **COVER** | New H2 or new H3-equivalent block. Our existing query section names only PCSE and the ICB. |
| 4 | PCSE service standards (3 working days, 40 calendar days, 90-day closure) (4.3) | **COVER** | Verify at PCSE source before stating. These are the numbers that make a query section actionable. |
| 5 | The GP pension/payment year as a month-by-month calendar (4.4) | **COVER** | Cheap and differentiating. Frame as the reconciliation year, not the pension year, to stay in our altitude. |
| 6 | Type 2 self-assessment: who, what, deadline (4.5, 4.6, 4.8, 4.10) | **COVER, narrowly** | 3 of the 13 topic keywords are Type 2 phrasings and the topic regex includes them. Cover as a short signposting block plus FAQs, linking out. Do not build a Type 2 guide here; that ground belongs to the pension-forms pages. |
| 7 | Type 1 Annual Certificate of Pensionable Profits (4.9, 4.10) | **COVER, one line** | Named in the same signposting block, with the same 28 February deadline. |
| 8 | Locum A and B forms, 10-week rule (4.10) | ELSEWHERE | `/blog/nhs-pension-for-locums-form-a-form-b` owns it and is **FROZEN to 2026-09-10** (dossier §6). Link only. |
| 9 | SOLO forms (4.10) | ELSEWHERE | Same page as #8. |
| 10 | Annualisation (4.5, 4.9, 4.10) | DECLINE | Pension-contribution mechanics, not statement reconciliation. Out of this page's altitude and it would blur the topic boundary. |
| 11 | PCSE Contributions Statement as a check on the pension record (4.5, 4.9) | **COVER** | This is the bridge theme. It is a PCSE statement, it is on PCSE Online, and it is not the payment statement. Distinguishing the two is genuinely useful and nobody does it. |
| 12 | Accountant direct access to PCSE (4.9) | **COVER** | Directly matches the live Bing query `pcse accountant access to statements`. We are the accountant, so this is ours to own. |
| 13 | Why pension records do not update (4.3, 4.9) | **COVER, briefly** | One FAQ, linking to the pension pages. The 56% figure (4.3) is BMA's, cite it as BMA's or leave it out. |
| 14 | Amnesty forms for historic years (4.5, 4.10) | DECLINE | The two peers give conflicting windows and neither is verifiable in house positions. Stating it risks a wrong figure. Named here so the decline is recorded, not silent. |
| 15 | TRS (Total Reward Statement), when it updates, blank TRS (4.10) | DECLINE | Member-level pension surface, not practice income. |
| 16 | Death in service, nominations (4.10) | ELSEWHERE | `/nhs-pension` per dossier §4 rows 15 and 28. |
| 17 | Client information-request checklist as a downloadable asset (4.7) | **COVER as on-page list** | Turn the peer's PDF into an on-page reconciliation checklist. No new file, no download, just a list. |
| 18 | Contribution tiers and rates (4.5, 4.10) | ELSEWHERE | `/calculators/nhs-superannuation-tiered-contribution`. Also see house positions §2.C, which carries the current 2026/27 bands. |

---

## 5. Whitespace

What no competitor in this set covers, stated specifically enough to be quotable.

1. **The paycode glossary. Nobody has one.** Not one of the 10 pages explains a single PCSE statement code. Our
   own Bing table is a list of people asking for exactly this and getting nothing: `what does gpftg mean on pcse
   statemenmt` (**2 clicks from 1 impression**, the joint-highest click count on the page), `what does a/m mean
   on pcse statement`, `pcse statement code locadg meaning`, `pcse statement pay code locsig meaning`, `what does
   this mean on a pcse statement: znpt2g`, `what does credit com mean on the gpp statement and why has money been
   deducted nhs gp surgery`, `total from com nhs pcse statement`, `pcse paycodes`, `pcse online paycode state`.
   That is nine distinct queries against a glossary that does not exist anywhere on the open web in a form these
   searchers can find. **Every code named must be verified against a real statement or PCSE documentation before
   it is published. Do not infer a code's meaning from its letters.** Where a code cannot be verified, the block
   says how to find its meaning (the statement's own key, the PCSE payments guide, the practice's accountant)
   rather than guessing.
2. **"GPP" is never expanded by anyone.** `gpp payments report nhs what does gpp stand for` (1 click),
   `understanding pcse gpp sttaements` (1 click), `view gpp statement pcse` (1 click), `gpp statements
   explained`, `pcse gpp`, `what is gpp payments by pcse?`, `how to understand gpp payment for a gp practice uk`
   (1 click). Seven queries. Our page uses the phrase `GPP - Statements` exactly once, as the name of an access
   role, and never says what GPP means. Expanding it once, in a new block, is close to free.
3. **Nobody joins the statement to the accounts.** All 10 competitor pages stop at "check your record" or "chase
   PCSE". None of them says what an unrecovered underpayment does to trading profit, to the partners' profit
   share or to the tax on it. Our page already does (see KEEP below). No peer can follow us there without being
   an accountant, and only two of the ten are medical-specialist accountants writing on this ground at all.
4. **Exporting and importing the statement.** `pcse statement import for xero` (**1 click**), `jow to download
   statements from pcse`, `how to download pcse reconcilation`, `gp payments on bank statement`. Our page names
   the expanded CSV as the working document and stops there. Nobody explains getting it into a ledger.
5. **The advance-or-arrears question.** `pcse statement is rent paid in advance or arrears` (**1 click**). A
   timing question about premises payments that no page in the set touches, and one that matters for the accrual.
6. **PCN money on the statement.** `pcse payments pcn` (4 impressions), `pcse pcn`, `pcse online pcn module`,
   `pcse pzyments pcn`. Our page has one bullet and one H3. No competitor has anything.
7. **Dispensing on the statement.** `how are dispensing fees calculated on pcse statements`, `things to check on
   a pcse drug statement` (**1 click**), `pcse drug statements`, `pcse statement dispensing gps - professional
   fees, where does this amount come from`. Four queries, zero competitor coverage.

### KEEP, explicitly

Per §9.3 the specialist layer is never traded away to make room for the plain-language layer. The following are
this page's differentiators and stay exactly as they are:

- **The profit-share consequence.** The closing argument that an unrecovered underpayment understates trading
  profit and therefore every partner's share, and that partners are taxed on profit share and not drawings
  (house positions §1 and §3). No competitor in the set makes this argument at all. **KEEP.**
- **The expanded-CSV-versus-collapsed-summary distinction** and the reason for it. **KEEP.**
- **The `GPP - Statements` role and the PCSE Online user administrator as the access gate.** The most practical
  sentence on the page and unique in the set. **KEEP.**
- **The processing-error versus entitlement-change fork** (PCSE fixes one, the ICB must action a contract
  variation for the other). This is the correct mental model and it is better than anything a competitor states.
  **KEEP.**
- **The line-by-line variance schedule** (expected / received / variance, one row per income line). **KEEP.**
- **"There is no single national per-patient value"** discipline, inherited from house positions §3. **KEEP**, and
  see the acceptance criteria: it is also a hard constraint.

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/gp-practice-income-pcse-statement-reconciliation.md`, read 2026-08-26.

| | |
|---|---|
| Word count | **4,337** (`wc -w` on the source file, includes frontmatter) |
| `metaTitle` | `Reading and Reconciling Your GP Practice PCSE Statements` (55 characters) |
| `h1` | `Are You Actually Being Paid What You Are Owed? Reading and Reconciling Your PCSE Statements` |
| `title` | `Checking Your GP Practice Income: PCSE Statements and Reconciliation` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| FAQ entries | 14 |
| Key takeaways | 5 |
| Tables | **None** |
| Calculator | None |
| Rendering | Markdown file whose body is **raw HTML** (`<p>`, `<h2>`, `<h3>`, `<ul>`), per the estate convention. Not markdown prose. Write new blocks as raw HTML to match. |

**Current heading list, in order:**

- H2 `Where GP Practice Income Comes From, and Who Pays It`
- H2 `How to Read Your PCSE Online Payment Statement`
  - H3 `Getting Access`
  - H3 `The Format`
  - H3 `The Main Lines to Expect`
  - H3 `Reading the Adjustments`
- H2 `Reconciling the Statement Against What You Are Owed`
  - H3 `The Principle`
  - H3 `Global Sum`
  - H3 `QOF`
  - H3 `Enhanced and Locally Commissioned Services`
  - H3 `Premises`
  - H3 `Dispensing`
  - H3 `PCN Payments`
- H2 `Spotting and Recovering an Underpayment`
  - H3 `How Underpayments Arise`
  - H3 `The Query Process`
  - H3 `Underpayments and Overpayments Mechanics`
  - H3 `Time and Persistence`
- H2 `Building Reconciliation Into the Practice's Routine`
- H2 `How We Help Practices Reconcile NHS Income`
- H2 `Related Reading`

**Blunt read.** This page is **not thin**. It is a well-built 4,300-word reconciliation guide with a correct
mental model, a clean structure and no factual errors found against `house_positions.md`. It is also **almost
entirely written in our vocabulary rather than the market's**, which is why it earns 17 Bing clicks from
position 4 and nothing at all on Google.

Specifically:

1. **It never once uses the market's contact vocabulary.** The words "contact", "enquiry", "enquiries", "phone"
   and "helpline" appear nowhere in the context of PCSE. 1,890 monthly searches of pure contact intent, held by
   a 350-word 2018 peer post, and we have no surface for them.
2. **It never expands GPP.** The string `GPP - Statements` appears twice and is never defined. Seven Bing queries
   ask what it means.
3. **It has no paycode content at all.** Nine Bing queries, no surface.
4. **It says "PCSE" 40-odd times and never says "PCSE Online enquiry form", "PCSE contact" or "PCSE payment
   query type"** as a phrase, even though the query process section describes exactly that route. This is the
   Property SDLT failure mode named in §9.5: the page describes the thing and does not contain the words.
5. **No tables.** Every reconciliation concept on the page (the variance schedule, the main statement lines, the
   causes of underpayment) is prose or bullets. A statement-lines table and a paycode table are the natural
   format and would also make the page eligible for the answer-box shapes Bing favours.
6. **The `Related Reading` H2 is the last block on the page**, which constrains where new H2s can go. See §1.
7. **Stale-risk items to re-verify but NOT to silently change:** the page correctly refuses to state a Global Sum
   figure and correctly says the SFE figures are uplifted annually. It refers to "the current Statement of
   Financial Entitlements" without naming the year. House positions §3 now names **the GMS Statement of
   Financial Entitlements Directions 2026** and the **2026/27** contract year. New blocks must use the 2026/27
   framing. Existing prose is frozen and is not wrong, so it stays.
8. **Nothing on the page contradicts `house_positions.md`.** Checked against §3 (GMS/PMS/APMS, Global Sum,
   Carr-Hill, QOF, enhanced services, PCN/ARRS, no UDAs, partner income is profit share), §4 (premises, notional
   versus cost rent, District Valuer), §6.A (dispensing) and §1 (partner taxed on profit share, not drawings).
   All consistent. The page also correctly avoids the two UNVERIFIED figures.

---

## 7. Deterministic acceptance criteria

Countable at QA. Each line is pass or fail, no judgement.

### 7.1 Phrases that MUST appear verbatim (case and punctuation normalised)

**12 phrases.** Every `On page = no` row from section 3. Ordered peer-winnable first, then volume; peer-winnable
is 0 across this topic, so the order below is pure volume, per owner decision 21 which sequences but never
excludes.

| # | Phrase | Vol | Where it should land |
|---|---|---|---|
| 1 | `pcse contact us` | 1000 | New contact H2 or an FAQ question |
| 2 | `pcse contact number` | 390 | New contact H2 body or FAQ |
| 3 | `pcse contact` | 260 | Subsumed by 1 and 2 only if the exact string appears; otherwise place it |
| 4 | `contact pcse` | 140 | New FAQ question ("How do I contact PCSE about a payment query?") |
| 5 | `pcse pension` | 110 | Signposting block |
| 6 | `pcse pensions` | 110 | Signposting block |
| 7 | `pcse online enquiry form` | 70 | New contact H2 body, this is the live route |
| 8 | `pcse type 2 form` | 70 | Signposting block or FAQ |
| 9 | `type 2 pension form` | 70 | Signposting block or FAQ |
| 10 | `pcse enquiries` | 50 | New contact H2 |
| 11 | `pcse meaning` | 50 | New block, NOT by editing the existing FAQ 1 |
| 12 | `pcse phone number` | 50 | New FAQ. See the statute/source rule in 7.5: the phrase must appear; a **number** may only appear if verified at source that day |

`what is pcse` (70) is already present and must remain present.

**Countable test:** 12 of 12 present. Any absent phrase is a named BLOCK.

### 7.2 Equity preservation (§9.9 floor 5)

**All 64 Bing queries in section 2 must still match** in `metaTitle`, `h1`, an H2, an FAQ or body prose after the
change. Since EXTEND forbids changing anything existing, the only way to fail this is by editing existing text,
so the test is also a proxy for the additive-only rule.

**Countable test:** 64 of 64 matchable. Google contributes 0 rows, so the combined equity set is 64. Run
`python scripts/track2_query_coverage.py --slug gp-practice-income-pcse-statement-reconciliation --json`.

### 7.3 EXTEND byte-identity (§9.5 grade table)

Diff the pre and post files. The following must be byte-identical:

- `metaTitle: "Reading and Reconciling Your GP Practice PCSE Statements"`
- `h1: "Are You Actually Being Paid What You Are Owed? Reading and Reconciling Your PCSE Statements"`
- `title: "Checking Your GP Practice Income: PCSE Statements and Reconciliation"`
- `metaDescription`, `slug`, `canonical`, `category`, `date`, `image`, `imageCredit`, `altText`
- All 7 existing H2 strings, in their existing relative order
- All 16 existing H3 strings
- All 14 existing FAQ question and answer strings
- All 5 existing `keyTakeaways` strings

**Countable test:** `git diff` shows **only additions**, zero deletions, zero modified lines, outside the
frontmatter list appends. Deletion count must be 0.

### 7.4 Arithmetic that must recompute

The page currently contains **no arithmetic and no worked example**, so there is nothing to recompute in the
existing text.

If a new block introduces a worked reconciliation example, it must recompute from stated inputs, and:

- **It must not use a Global Sum per weighted patient figure.** `house_positions.md` §3 marks the per-weighted-
  patient Global Sum **UNVERIFIED** and blocks any page needing a hard figure until a human reads the SFE 2026
  PDF. A worked example must use a **stated hypothetical rate labelled as illustrative**, or use only list size
  and a variance, never a national rate presented as fact.
- **It must not use a QOF point value.** Same rule, same §3 `> VERIFY` note. practiceindex publishes
  `£225.49` for 2025/26 and `£213.43` for 2023/24 (fetched 2026-08-26, see §4 of the QOF pack). **Neither may be
  copied onto our page.** The block must say "confirm the current point value in the GMS Statement of Financial
  Entitlements Directions 2026".
- **It must not state a GMC annual retention fee.** UNVERIFIED per §8 and the Verification log. Not relevant to
  this page, listed for completeness of the ban.

**Countable test:** count of UNVERIFIED-figure assertions on the page = **0**.

### 7.5 Statute, regulation and source re-verification

Every one of these must be re-fetched at the URL given before the claim is written, and the fetch date recorded
in the QA verdict.

| Claim | Source URL to re-verify |
|---|---|
| GMS contract funding structure (Global Sum, Carr-Hill, QOF, enhanced services, PCN/ARRS) and that 2026/27 is the live year | https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ |
| The SFE is the benchmark, and its current identity is the **Directions 2026** | https://assets.publishing.service.gov.uk/media/69cbe5032d120d9d5ec0f352/general-medical-services-statement-of-financial-entitlements-directions-2026.pdf |
| GMS contract regulations underpinning the entitlements | https://www.legislation.gov.uk/uksi/2015/1862 (SI 2015/1862) |
| PCSE contact route: the online enquiry form, and any phone number | https://pcse.england.nhs.uk/contact-us/ |
| PCSE payment-query process and query types | https://pcse.england.nhs.uk/ (payments query guidance for GP practices) |
| Type 1 Annual Certificate, 28 February a year in arrears | https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate |
| Type 2 self-assessment, 28 February a year in arrears | https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/salaried-and-solo-gps-type-2-self-assessment |
| Estimate of Pensionable Profits, 28 February | https://pcse.england.nhs.uk/gp-practices/managing-pensions/estimate-pensionable-profits |
| Locum 10-week rule, if referenced in the signposting block | https://pcse.england.nhs.uk/services/gp-pensions/locum-gps/submit-locum-b-forms |
| Dispensed NHS prescription drugs are zero-rated under VATA 1994 Sch 8 Group 12 Item 1, not exempt, if the dispensing block is extended | https://www.legislation.gov.uk/ukpga/1994/23/schedule/8 and https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 |
| Premises Costs Directions 2024 (notional / cost rent), if the premises block is extended | NHS (General Medical Services) Premises Costs Directions 2024, in force 10 May 2024 |

**Hard rules on the sources above.** Any deadline stated must be the **28 February a year in arrears** position
from `house_positions.md` §2.C (2025/26 due 28 February 2027), not the stale 2024 dates published by the peers in
§4.5 and §4.6. Any PCSE service standard (3 working days, 40 calendar days, 90-day closure) is BMA-reported and
must be confirmed at PCSE or attributed to the BMA in-text. Any paycode meaning must be verified, not inferred.

**Countable test:** every external factual claim in the new blocks maps to a row above with a fetch date. Count
of unverified claims = 0.

### 7.6 The four existing floors (§4) plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug gp-practice-income-pcse-statement-reconciliation` | Gate bar met on high-demand queries; 0 covered queries lost |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` in `track2_independent_qa.wf.js` | Every worked figure re-derived, or the array is empty because no arithmetic was added |
| 3. Statute verified at source | `statute_checks[]` | Every row in 7.5 fetched and content-verified, not URL-liveness only |
| 4. Link resolution | `scripts/track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; every new internal link resolves through `slug_resolver.py` |
| 5. Equity preservation | Section 7.2 | 64 of 64 Bing queries still match |
| 6. Cluster coverage | Section 7.1 | 12 of 12 assigned phrases placed |
| 7. Reconciliation balance | Dossier §10 | Already BALANCED (792 + 450 + 642 + 1,336 = 3,220). This page's 13 keywords sit inside the 792 `assigned` bucket. Unchanged by this work. |
| 8. Competitor re-read | Section 4.11 | 18 themes, 18 decisions, **0 undecided** |

Plus the two human passes: adversarial factual QA against `house_positions.md`, and the editorial pass checking
that the new plain-language blocks read as prose and not as inserted keywords.

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere in the new copy.
2. **No new internal link inside any existing paragraph.** New links live only in new blocks.
3. **Do not link to `/blog/nhs-pension-for-locums-form-a-form-b`, `/blog/gp-payroll-services`,
   `/blog/gp-tax-deductions-complete-list-2026` or `/blog/nhs-pension-tapered-annual-allowance-calculator` as
   part of a differentiation change**; they are frozen to 2026-09-10 (dossier §6). A plain contextual link to an
   existing published URL is fine and does not touch the frozen file.
4. **No collapse, no redirect, no URL change** (§5).
5. **Never state the Global Sum per weighted patient, the QOF point value, or a GMC fee.** See 7.4.

---

## 8. Stated expectation

Written before the work, per §9.6, as numbers a later read can fail.

**Baseline, from the pull of 2026-08-26** (`GetPageQueryStats` for this URL, aggregated across the returned
series, 90-day window): **64 named queries, 129 impressions, 17 clicks**, best average impression position 1.0,
typical 4.0. Google query-level rows: **0**. The dossier records the page-level Bing figure for this URL as
**17 clicks from 261 impressions**; the 129 above is the sum of the *named* query rows only, which is the smaller
of the two by construction. Both are stated so a later read compares like with like.

Pro-rated to a 28-day window: **17 clicks / 90 days x 28 = 5.3 clicks**, **129 impressions / 90 x 28 = 40
impressions** across named queries.

### The read at 14 to 28 days, Bing

1. **Named-phrase impressions.** At least **6 of the 12** phrases in section 7.1 return at least one Bing
   impression for this URL in the 28-day window. Today the count is 0 of 12. This is the §9.6 rule that the
   verdict is read against **phrase coverage**, not against total traffic: total impressions rising while the
   12 stay at zero is DRIFT and is recorded as a FAIL.
2. **Clicks.** Bing clicks on this URL in a rolling 28-day window at or above **6** (baseline 5.3). The contact
   family alone is 1,890 monthly volume against a 350-word 2018 competitor page, so the upside case is
   materially higher; 6 is the floor, not the target.
3. **Impressions.** Named-query impressions in a rolling 28-day window at or above **55** (baseline 40, a
   37% lift, which is the minimum that would be visible above this page's noise given single-digit per-query
   counts).

### The read at 28 to 90 days, Google

4. **Any query-level Google row at all.** Today: 0 rows, 0 impressions, 0 clicks. Target: **at least 1
   query-level row** for this URL in GSC by day 90. On a site where Google indexes roughly a sixth of the corpus
   (universe §7), a first row is the honest bar, not a position target.

### Failure trigger (§9.6, written as a number, before the change)

> **If Bing clicks on `/blog/gp-practice-income-pcse-statement-reconciliation` fall below 4 in any rolling
> 28-day window between deploy and deploy+56 days, revert to
> `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/gp-practice-income-pcse-statement-reconciliation.md`.**

Second trigger, on the equity gate rather than the traffic:

> **If any of the 64 named Bing queries in section 2 stops returning an impression for this URL for two
> consecutive 28-day windows, that query is a named BLOCK and the block is investigated before any further
> change to this page.**

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day Bing read
is taken. No internal-link programme, no image change, no schema change stacked on top, or attribution is lost.

**Tracker discipline (§9.6).** When this page is registered in `monitored_pages` at deploy,
`blog_optimizations.target_keywords` must be populated with the **12 missing phrases from section 7.1**, not with
the 64 queries the page already ranks for. Populating it with the existing queries re-measures the past.

---

## Corrections to the dossier

1. **Bing impression figure for this URL is stated two different ways and both are right.** Dossier §3 records
   `B 17c/261i` for this page. The data sheet's `GetPageQueryStats` pull for the same URL on the same day sums to
   **129 impressions** across 64 named queries, same 17 clicks. The difference is named-query rows versus the
   page-level total; Bing does not name every query. **Not a contradiction, but the dossier's 261 and the pack's
   129 are not the same measurement and must not be compared to each other in a later read.** Use 261 for
   page-level trend and 129 for named-query trend, and never mix them.

2. **The dossier says "9 of 9 missing phrasings"; the data sheet says 12 of 13 absent.** Dossier §3 gives this
   topic 9 keywords, all 9 missing. The data sheet's regex returns **13 keywords, 12 absent, 1 present**
   (`what is pcse`). The data sheet regex is broader (it adds the `type 2 (pension )?(form|certificate)`,
   `gp pension (statement|record)` and `open exeter` alternates). The pack uses the data sheet's 13, which is the
   superset. **The dossier's per-topic keyword counts are therefore a floor, not a total**, wherever the pack
   regex is broader than the clustering regex. Worth checking on the other packs before the counts are quoted
   anywhere as final.

3. **The dossier's peer-winnable ordering is misleading on this specific page and the dossier already knows it.**
   §11 limitation 6 states peer-winnable is Google-derived. On this URL peer-winnable is 0 and the page
   nonetheless earns 17 Bing clicks at average position 4. Recorded here so the writer does not read
   "peer-winnable 0" as "not worth doing". No change to the dossier is needed; the limitation is already stated.
