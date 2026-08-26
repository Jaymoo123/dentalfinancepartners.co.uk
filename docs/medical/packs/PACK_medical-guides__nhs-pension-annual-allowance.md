# §9.5 RESEARCH PACK: /medical-guides/nhs-pension-annual-allowance

Built 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, ground truth `docs/medical/house_positions.md`, peer classification `docs/medical/competitor_universe_2026-08-26.md`, and the deterministic data sheet for this page. No new DataForSEO calls were made. No file under `Medical/web/` was edited.

---

## 1. Target and permission level

| Field | Value |
|---|---|
| Page URL | `/medical-guides/nhs-pension-annual-allowance` |
| Cluster | `nhs_pension` lane, dossier topic **nhs pension calculator** (27,940 volume, 74 keywords) |
| Grade | **REFRAME** (full rewrite permitted) |
| Source file | `Medical/web/src/lib/medical-guides-data.ts`, the `MEDICAL_GUIDES` array entry with `slug: "nhs-pension-annual-allowance"` (lines 20 to 76 at the sha below) |
| Rendered by | `Medical/web/src/app/medical-guides/[slug]/page.tsx` |
| Rendering | **TS DATA ENTRY inside an exported array. This is not a markdown file, it has no frontmatter, and it is not a blog post.** |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/lib/medical-guides-data.ts` |

**How the writer must work.** The writer edits one object literal inside `export const MEDICAL_GUIDES: MedicalGuide[]`. The type is declared at the top of the same file. Prose lives in typed string fields. The editable surfaces are: `title` (rendered as H1), `metaTitle`, `metaDescription`, `eyebrow`, `summary`, `readTime`, `audience[]`, `sections[].heading` (each one renders as an H2), `sections[].body`, `keyPoints[]`, `relatedGuides[]` and `relatedPosts[]`. Body text is a **single string with `\n\n` paragraph breaks**, not markdown. There is no markdown renderer on this route, so `##`, `**` and `|` table syntax will render as literal characters. Structure comes from adding `sections` entries, not from markup inside a body string.

**Critical:** the revert path touches the **whole 46,899-byte file**, which holds all six medical guides. The writer must not disturb the other five entries. QA must diff and confirm the byte range outside lines 20 to 76 is unchanged.

**What may be changed.** `title`, `metaTitle`, `metaDescription`, `eyebrow`, `summary`, `readTime`, `audience`, every `sections[]` entry including their order and count, `keyPoints`, `relatedPosts`.

**What may not be changed.** `slug`. The `MedicalGuide` type. The other five guide entries. `relatedGuides` values must remain valid slugs in the same array (`gp-partnership-accounts`, `consultant-private-practice-tax`, `locum-limited-company-vs-umbrella`). No collapse, no redirect, no merge with `/calculators/nhs-pension-annual-allowance` or with the frozen blog post. Rewrite in place only.

**Frozen-list position.** Batch 1 excludes the **16 pages** inside armed `monitored_pages` windows running to **2026-09-10** (dossier §6). This page is **not** on that list, so it is workable now. Three further `monitored_pages` rows carry `status='flagged'` (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) and are treated as **HOLD**. This page is neither frozen nor flagged.

### 1.1 The intent this page is pushed towards, and the phrasings it must not take

The slug `nhs-pension-annual-allowance` exists in **three namespaces at once** (dossier §7):

| Namespace | Page | Intent it owns | Status |
|---|---|---|---|
| `/calculators/` | `/calculators/nhs-pension-annual-allowance` | **TOOL intent.** Numbers in, allowance and charge out. | REFRAME, same batch |
| `/medical-guides/` | **this page** | **EXPLANATION intent.** How the NHS scheme works, how a benefit is calculated, how it grows. | REFRAME, workable |
| `/blog/` | `/blog/nhs-pension-annual-allowance-complete-guide` | **WORKED CASE intent.** The narrative example. | **FROZEN to 2026-09-10** |

Per §5 of the working agreement and dossier §7 these are **never collapsed**. They are differentiated.

**This page is being pushed to explanation intent, and the dossier has already widened what "explanation" means here.** The assignment table gives this page the topic **`nhs pension calculator`** (27,940 volume, 74 keywords, coverage 73 of 74 missing), and NO-PAGE row 17 gives it **`nhs pension increase / uplift`** (1,930 volume) as a section. So the explanation this page owns is: **how an NHS pension benefit is worked out across the 1995, 2008 and 2015 sections, and how it is increased each year.** The annual allowance is the frame it sits in, not the whole of it.

**Phrasings this page must NOT take, because a sibling owns them:**

- `annual allowance calculator`, `pension annual allowance calculator`, `nhs annual allowance calculator`, `annual allowance calculator hmrc`, `hmrc annual allowance calculator`, `annual allowance calculation`, `threshold income annual allowance`, `threshold income for annual allowance`, `pension annual allowance taper`, `pension tapered annual allowance`, `pensions tapered annual allowance`, `annual allowance history`, `historic pension annual allowance`, `pension annual allowance history`, and every year-tagged annual allowance row (`pension annual allowance 2024/25` and the eleven siblings). **All allocated to `/calculators/nhs-pension-annual-allowance`, which is in this same batch.**
- `tapered annual allowance calculator` and `nhs pension tapered annual allowance calculator` as a **tool name**. `/blog/nhs-pension-tapered-annual-allowance-calculator` holds that topic and is **FROZEN to 2026-09-10**.
- The **worked case narrative** ("Dr X, a consultant on £Y, received a statement showing £Z"). That belongs to the frozen `/blog/nhs-pension-annual-allowance-complete-guide`. This page explains a mechanism; it does not tell the story of one doctor's year.
- `lifetime allowance`, `lta`, `lump sum allowance`, `lsa`, `lsdba`, `lifetime allowance protection`, `pension abatement`. **Allocated to `/research/annual-allowance-pension-tax-index`, also in this batch.** If this page must gesture at the post-2024 lump sum position it does so in one sentence with a link, and the sentence must not contain the phrase `lifetime allowance` in a present-tense form.
- `nhs pension scheme pays`, `scheme pays calculator`, `death in service`, `is nhs pension salary sacrifice`. Dossier §7 gives those to `/calculators/nhs-pension-scheme-pays` and to `/blog/nhs-pension-scheme-pays-doctors-deadlines` (which is **flagged, HOLD**). This page may explain Scheme Pays in two sentences with a link out. It must not become a Scheme Pays page.
- `nhs deferred pension` and `pension nhs contact`. Dossier §7 ties both against `/nhs-pension`. That hub wins them; this page must not put either in `metaTitle`, `title` or a `sections[].heading`.

### 1.2 Vocabulary split across the batch, so attribution survives

Three of our pages are being changed in the same window. Bing re-crawls in days and is the 14 to 28 day read (§9.6). **One change per page per window, or attribution is lost (§9.3).** This split is a hard allocation.

| Half of the annual-allowance vocabulary | Owner | Contents |
|---|---|---|
| **The scheme-explanation half** | **THIS PAGE** | the whole `nhs pension calculator` family (fund, 1995, 2008, 2015, uk, scotland, sppa, early retirement, lump sum, monthly, final salary), how to calculate nhs pension, calculate nhs pension contribution, additional nhs pension, and the whole increase and uplift family (nhs pension increase, increases, uplift, does nhs pension increase with inflation, when does nhs pension increase, CPI revaluation) |
| **The mechanics half** | `/calculators/nhs-pension-annual-allowance` | annual allowance calculation and calculator phrasings, taper nouns, threshold and adjusted income, pension input amount, carry forward, MPAA, the annual allowance history table |
| **The scale-and-history half** | `/research/annual-allowance-pension-tax-index` | lifetime allowance and LTA in the historic sense, lump sum allowance, LSA, LSDBA, protections, abatement, the HMRC and NHSBSA statistical series |

Overlap that is unavoidable and therefore explicitly allowed: the strings `annual allowance` and `pension input amount` may appear on all three, but this page must not put either in `metaTitle` alone as its primary claim, and must not put any calculator-noun phrase from the mechanics half in a `sections[].heading`.

**The consequence for `title` and `metaTitle` on this page.** The current H1 is "NHS Pension Annual Allowance: A Complete Guide for UK Doctors" and the current metaTitle leads on "NHS Pension Annual Allowance Guide". Under this split the page's assigned topic is `nhs pension calculator`, not the annual allowance mechanics. The rewrite should lead the metaTitle on **how the NHS pension is calculated and increased**, keep `NHS pension` and `annual allowance` present for the equity in section 2, and leave the word `calculator` in a heading rather than in a tool-name position. That is the reframe.

---

## 2. Equity register (copied verbatim from the data sheet)

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/medical-guides/nhs-pension-annual-allowance)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **3** | impressions 3 | clicks 1.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| aa tax charges 25/26 nhs | 1 | 1 | 6.0 |
| how do you calculate the pia for a 1995 and 2015 nhs pension | 1 | 0 | 7.0 |
| doctors pension annual allowance | 1 | 0 | 2.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set (copied verbatim from the data sheet)

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
nhs pension calculator|pension calculator nhs|nhs pension (fund |benefit )?calculator|calculate (my )?nhs pension|nhs pension increase|pension increase 20|nhs pension uplift
```

Keywords in topic: **42** | combined volume **22,690** | peer-winnable volume **0** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 8
| **Absent verbatim from this page: 42 of 42. Absent from the whole 105-page corpus: 41.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 6600 | 7 | bma.org.uk | no | **no** | yes | nhs pension calculator |
| 6600 | 18 | bma.org.uk | no | **no** | no | nhs pension fund calculator |
| 880 | 9 | bma.org.uk | no | **no** | no | nhs pension calculator 2015 |
| 880 | 9 | bma.org.uk | no | **no** | no | nhs pension calculator 2015 scheme |
| 480 | 7 | bma.org.uk | no | **no** | no | 1995 nhs pension calculator |
| 480 | 7 | bma.org.uk | no | **no** | no | nhs pension calculator 1995 |
| 480 | 7 | bma.org.uk | no | **no** | no | nhs pension calculator 1995 scheme |
| 480 | 10 | bma.org.uk | no | **no** | no | nhs pension calculator uk |
| 480 | 6 | bma.org.uk | no | **no** | no | pension calculator nhs 1995 |
| 480 | 6 | bma.org.uk | no | **no** | no | pension calculator nhs uk |
| 390 | 9 | bma.org.uk | no | **no** | no | calculate nhs pension contribution |
| 390 | 37 | bma.org.uk | no | **no** | no | nhs pension increase 2026 27 |
| 320 | 8 | bma.org.uk | no | **no** | no | how to calculate nhs pension |
| 260 | 6 | bma.org.uk | no | **no** | no | additional nhs pension calculator |
| 260 | 8 | bma.org.uk | no | **no** | no | early retirement nhs pension calculator |
| 260 | 8 | bma.org.uk | no | **no** | no | nhs pension calculator early retirement |
| 260 | 11 | bma.org.uk | no | **no** | no | nhs pension increase 2025 |
| 260 | 11 | bma.org.uk | no | **no** | no | pension calculator nhs scotland |
| 170 | 9 | bma.org.uk | no | **no** | no | nhs pension increase |
| 170 | 6 | bma.org.uk | no | **no** | no | nhs pension increases |
| 170 | 4 | bma.org.uk | no | **no** | no | nhs pension uplift |
| 140 | 24 | bma.org.uk | no | **no** | no | nhs pension calculator unison |
| 140 | 14 | bma.org.uk | no | **no** | no | nhs pension increase 2025/26 |
| 140 | 31 | forvismazars.com | no | **no** | no | nhs pension increase 2026/27 latest news today |
| 110 | 6 | bma.org.uk | no | **no** | no | nhs pension calculator 2015 examples pdf |
| 110 | 16 | bma.org.uk | no | **no** | no | nhs pension calculator gov uk |
| 110 | 3 | bma.org.uk | no | **no** | no | nhs pension calculator lump sum |
| 110 | 11 | bma.org.uk | no | **no** | no | nhs pension calculator scotland |
| 110 | 22 | bma.org.uk | no | **no** | no | nhs pension increase 2026 gov uk |
| 90 | 40 | bma.org.uk | no | **no** | no | armed forces pension increase 2026 latest news |
| 90 | 4 | bma.org.uk | no | **no** | no | does nhs pension increase with inflation |
| 90 | 17 | bma.org.uk | no | **no** | no | nhs pension increase 2025 26 gov uk |
| 90 | 17 | bma.org.uk | no | **no** | no | nhs pension increase 2025/26 gov uk |
| 90 | 15 | bma.org.uk | no | **no** | no | sppa nhs pension calculator |
| 90 | 14 | bma.org.uk | no | **no** | no | sppa pension calculator nhs |
| 70 | 6 | bma.org.uk | no | **no** | no | 1995 nhs pension calculator free |
| 70 | 8 | bma.org.uk | no | **no** | no | 2008 nhs pension calculator |
| 70 | 6 | bma.org.uk | no | **no** | no | nhs pension increase 2024 |
| 70 | 30 | bma.org.uk | no | **no** | no | nhs pension uplift 2026 |
| 50 | 7 | bma.org.uk | no | **no** | no | final salary pension calculator nhs |
| 50 | 16 | bma.org.uk | no | **no** | no | nhs pension calculator monthly |
| 50 | 7 | bma.org.uk | no | **no** | no | when does nhs pension increase |

---

## 4. Competitor teardown

The data sheet lists **18** competitor URLs holding this topic's keywords. **Capped at the 12 highest-keyword URLs** per the brief. The six dropped all hold exactly 1 in-topic keyword and are the tail of a nine-way tie at 1: `fkca.co.uk` (2024 NHS pension changes), `mdujournal.themdu.com` (NHS pension changes Q&A), `hawsons.co.uk/nhs-pension-contribution-changes/`, `r-m-t.co.uk/blog/payroll-and-nhs-pension-changes/`, `medicsmoney.co.uk/budget-2025-the-impact-on-doctors-finances/`, and `bma.org.uk/.../your-final-pensionable-pay`. **Why these six and not other 1-keyword rows:** the three 1-keyword URLs retained (4.10, 4.11, 4.12) were retained because one is the only non-BMA domain in the whole topic (forvismazars, 4.12), one is BMA's own additional-pension page which holds the `additional nhs pension calculator` phrase family (4.10), and one is the row the keyword data attributes an increase phrase to (4.11). The dropped six are recorded here so nothing is silently dropped, and any of them may be pulled in a later delta.

Domain classification from `docs/medical/competitor_universe_2026-08-26.md` sections 2a and 2b.

### 4.1 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/calculating-your-pension-lump-sum
**20 in-topic keywords, the single biggest holder in this topic. Classification: UNWINNABLE AUTHORITY** (§2b: trade union / professional body, 15 top-10 slots, "cannot be outranked on brand").
- Title and H1: Calculating your pension lump sum. ~1,200 words.
- Headings in order: Am I entitled to a lump sum on retirement? (H3: 1995 section members and 2008 section optants via the Choice exercise · 2008 and 2015 sections) · When your lump sum will be paid · Commutation of pension benefits (H3: Maximum tax free lump sum · 1995 section · 2008 section and 2015 scheme) · Is my lump sum always tax-free? · Is the lump sum likely to ever be taxed in future? · Making another commutation choice
- Tables: no. Calculator: no. FAQ block: no.
- **Covers:** the automatic 3x lump sum for 1995 members, commutation at £1 pension for £12 lump sum, the £268,275 tax-free limit, protection certificates.
- **Structure:** section-by-section, question-form headings, no arithmetic the reader can vary.
- **Gets wrong or omits:** it holds 20 of this topic's calculator keywords **without being a calculator**. No worked examples for complex cases, no early-retirement interaction, no state pension interaction. This is the clearest demonstration in the pack that Google is serving an explanation page against `... calculator` queries, because nobody has published a good one.

### 4.2 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/inflationary-increases-to-your-nhs-pension
**8 in-topic keywords, and the holder of the entire increase and uplift family. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: Inflationary increases to your NHS pension. ~2,200 words. Tables: no. Calculator: no. FAQ: no.
- Headings in order: If you are an active member of the NHS pension scheme · If you left NHS employment · Once I have retired how will my pension be increased? · When an increase will be applied · Are you entitled to the full increase next April? · Retiring before age 55 · Additional pension purchase · Who pays the increases on my NHS pension? · Second bite pensions increase · Second bite and lifetime allowance
- **Covers:** active revaluation "in line with treasury orders plus 1.5%", deferred increases under the Pensions (Increase) Act 1971, September-to-September CPI applied the first Monday in April, the nil-or-negative CPI case, final salary linking and dynamised income, and **second bite** increases.
- **Structure:** member-state-first (active, left, retired), which is the right structure and we should borrow it.
- **Gets wrong or omits:** **it publishes no CPI rate and no year.** No historical increase table. No comparison across the 1995, 2008 and 2015 sections. No member examples with figures. And its final H2 is "Second bite and lifetime allowance", which is stale framing given the LTA was abolished from 6 April 2024.

### 4.3 https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/
**5 in-topic keywords. Classification: PEER, and the strongest peer in the universe** (§2a row 1: "The single strongest peer", 15 top-10 slots, hybrid content plus directory).
- Title: NHS Pension Scheme - Guide by Medics Money. H1: NHS Pension Scheme Guide. ~2,800 words.
- Headings in order: How the NHS Pension works · What is a pension and why is the NHS Pension different? (H3: The NHS Pension is different to most other pensions, in a good way) · How does the NHS Pension actually work? · How much does it cost to join the NHS Pension? · When can I retire? · How can I retire early? Can I buy additional pension? What's an ERRBO? · What is the McCloud judgment and what do doctors need to do about it? · NHS Pension FAQs (multiple H5 sub-questions)
- **Tables: yes**, three contribution rate tables for England and Scotland. Calculator: no. **FAQ: yes**, extensive.
- **Covers:** DB versus DC, tiered contribution rates by earnings band, normal pension age by section, the 2015 to state pension age link, ERRBO, McCloud, and it references annual allowance charges and Scheme Pays.
- **Structure:** the best-shaped competitor here. Question headings throughout, a real FAQ block, real tables. This is the page to beat on structure.
- **Gets wrong or omits:** **no pension calculation formulas at all**, which is remarkable on a page holding `nhs pension calculator` keywords. No annual allowance thresholds or percentages. **No revaluation or indexation rates**, so the increase family is entirely absent. No worked benefit calculation.

### 4.4 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance
**5 in-topic keywords. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: NHS pension annual allowance. ~2,100 words. Tables: no. Calculator: no. FAQ: no.
- H2: Tapered annual allowance 2023/24 · Your annual allowance statement · What your statement includes · Ensuring your statement is right · Receiving a backdated pay award · What to do if you exceed the limit · If you are a deferred scheme member · Video guides · BMA pensions
- H3: GPs · Nations · Pension input start date · Pension input end · Annual allowance · Pension input amount · **Hospital doctors 1995/2008 section accrual · GPs 1995/2008 section accrual · 2015 scheme accrual** · Scheme pays
- **Covers:** the three accrual H3s are the directly relevant part for this page. They split the accrual explanation by role and by section, which is exactly the structure our Bing query `how do you calculate the pia for a 1995 and 2015 nhs pension` is asking for.
- **Gets wrong or omits:** lead H2 still dated 2023/24, three tax years stale. No table, no calculator, no FAQ block. Note: the **annual allowance mechanics** on this page belong to our calculator sibling, not here. Only the accrual H3s are in scope for this page.

### 4.5 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates
**2 in-topic keywords, holder of `calculate nhs pension contribution`. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: NHS pension contribution rates. ~1,200 words. **Tables: yes**, multiple tier tables. Calculator: no. FAQ: no.
- Headings in order: Employer contribution rates from 1 April 2024 · From 1 April 2025 the contributions will be · In England · In Northern Ireland · In Scotland · Pension contributions and tax · Part-time doctors
- **Covers:** member tier tables for 2024/25 and 2025/26 across four nations, employer rate from 1 April 2024, part-time treatment.
- **Gets wrong or omits:** **it is a year behind.** Its newest table is "from 1 April 2025". `house_positions.md` §2.C carries the **2026/27 bands uplifted from 1 April 2026**, verified at NHS Employers on 2026-08-26. This is a live, checkable freshness win. It also omits AVC guidance and any worked contribution calculation.

### 4.6 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/taking-early-retirement
**2 in-topic keywords, holder of the early-retirement calculator phrases. Classification: UNWINNABLE AUTHORITY.**
- Title and H1: Taking early retirement. ~2,100 words. **Tables: yes** (GAD actuarial reduction factors). Calculator: no. FAQ: no (topic sections, not Q&A).
- Headings in order: What is voluntary early retirement? · When to apply · Reductions to your pension · By how much will my pension and lump sum be reduced? · Can I compensate for any actuarial reduction? · What if I commute part of my pension to a bigger lump sum? · Lifetime and annual allowance · Added years/additional pension · Will my added years be reduced? · Will my additional pension be reduced? · Will my pension in payment be increased? · Returning to work · Can I return to work after taking early retirement? · Can I rejoin the pension scheme?
- **Covers:** minimum pension age, permanent actuarial reduction with a GAD factor table, ERRBO-style compensation, commutation interaction, rejoining.
- **Gets wrong or omits:** one worked example only. Its "Lifetime and annual allowance" heading is stale framing post-abolition. No tax planning.

### 4.7 https://www.bma.org.uk/pay-and-contracts/pensions
**2 in-topic keywords. Classification: UNWINNABLE AUTHORITY. This is a HUB page, not an article.**
- Title and H1: Pensions. ~1,200 words. Tables: no. Calculator: no (links external modelling tools). FAQ: no.
- Structure: Retirement · Pensions tax · Glossary of pensions terms · Additional pensions advice (Doctor categories, Going on leave, In the event of death, Leaving the pension scheme, 2015 NHS pension scheme, Non-NHS pension schemes, **External modelling tools**) · We campaign for you · The BMA pensions department · Latest pensions news
- **Judgement:** the relevant lesson is the **silo shape**, not the copy. BMA holds this topic with a hub plus eleven child pages, and links out to external modelling tools rather than building one. Our equivalent hub is `/nhs-pension`, and this page must link up to it.

### 4.8 https://nicholsmedical.co.uk/news/nhs-pension-and-tax-in-2025/
**2 in-topic keywords. Classification: PEER** (§2a row 10: specialist medical accountancy firm).
- Title and H1: NHS Pension & Tax in 2025 - What GPs Need to Know. ~1,200 to 1,400 words. Tables: no. Calculator: no. FAQ: no.
- Headings in order: NHS Pension Changes Taking Effect in 2025 (H3: **6.7% Pension Increase** · McCloud Remedy Updates · Flexible Retirement · Pension Contribution Tiers) · Annual Allowance and Lifetime Allowance, What You Should Watch (H3: **Lifetime Allowance Abolished** · Annual Allowance Risk · Tapered Annual Allowance) · Tax Planning Considerations for 2025 (H3: Transitional Profits and Basis Period Reform · Using Pension Contributions Strategically · Scheme Pays) · How Nichols Medical Accountants Can Support You Through 2025
- **Covers:** it is the only page in this teardown that **states an actual pension increase percentage** (6.7% for April 2025) and correctly says the lifetime allowance was abolished on 6 April 2024, giving £1.073m and £268,275 as historic and current-lump-sum-cap figures respectively.
- **Gets wrong or omits:** it is titled and framed for **2025** and is now a full tax year out of date. It states the McCloud remedy period as "2015-16 to 2022-23"; `house_positions.md` §2.A gives **1 April 2015 to 31 March 2022**, so its end point is a year long. No examples, no employer contribution changes, no self-employed GP treatment.
- **Peer, and beatable.** It is a specialist firm ranking on a dated news post. The same content, correctly dated to 2026/27 and with the McCloud period right, wins.

### 4.9 https://www.forvismazars.com/uk/en/insights/healthcare-and-pharma-insights/nhs-pension
**2 in-topic keywords, and the ONLY non-BMA domain holding an increase phrase (`nhs pension increase 2026/27 latest news today`, 140 vol, position 31). Classification: UNWINNABLE AUTHORITY** (§2b: global top-10 accountancy network).
- Title and H1: NHS Pension Annual Allowance June 2026 update. ~1,800 words. Tables: no. Calculator: no. FAQ: no.
- Headings in order: Implications · Examples of pension growth for officer members · Looking ahead and actions to take · Discover more · Key contact · Contact us · Follow us
- **Covers:** the £60,000 threshold and taper, and volatility in pension growth across 2023/24, 2024/25, 2025/26 and **2026/27**. It is the freshest competitor page in this teardown, dated June 2026.
- **Gets wrong or omits:** contribution rates, member and employer percentages, accrual rates, retirement ages, survivor benefits, early retirement, transfers. It is a single-issue update note, not a guide. It has **no headings a reader could navigate** ("Implications", "Discover more"), which is why it sits at position 31 on the phrase it holds.
- **The lesson:** it ranks for a **`... latest news today`** query. That query family is a news-cycle intent we cannot serve from a guide and should not chase. See the decline list in 7.2.

### 4.10 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/additional-pension-purchase
**1 in-topic keyword, holder of `additional nhs pension calculator` (260 vol, position 6). Classification: UNWINNABLE AUTHORITY.**
- Title and H1: Additional pension purchase. ~2,800 words. Tables: no. **Calculator: yes**, it links the NHS pensions calculator and form AP1. **FAQ: yes**, Q&A structured throughout.
- Headings in order: McCloud and Additional Pension purchases · Eligibility · How do I apply? · I have added years and am likely to have maximum service · I have mental health officer status · Paying for additional pension (H3: How much does it cost? · What payment options are there? · How are contributions collected? · Can I take a break from paying? · Can my employer purchase additional pension on my behalf?) · Pension growth (H3: Can additional pension increase my dependents' benefits? · Will it increase my lump sum? · **Does additional pension increase in line with inflation?**) · Tax (H3: Does the contribution attract tax relief? · **Will my pension growth count for the purposes of the annual allowance?**) · Leaving the pension scheme (H3: Voluntary early retirement · Retirement within 12 months of your contract starting · Ill health retirement · Death and retirement · Redundancy · Partial retirement)
- **Covers:** units of £250 up to £8,036 a year, payment options, tax relief, the annual allowance interaction, and every exit scenario.
- **Structure:** deepest Q&A structure of any page here. Worth copying as a shape.
- **Gets wrong or omits:** no cost examples by age, no investment comparison, no employer contact process.

### 4.11 https://www.bma.org.uk/news-and-opinion/bma-s-evidence-submission-to-the-armed-forces-pay-review-body-202627
**1 in-topic keyword (`armed forces pension increase 2026 latest news`, 90 vol, position 40). Classification: UNWINNABLE AUTHORITY.**
- Title and H1: BMA's evidence submission to the Armed Forces Pay Review Body 2026/27. ~1,200 words. Tables: no. Calculator: no. FAQ: no.
- Headings: Summary of BMA's evidence submission to the 2026/27 pay round · We asked that the AFPRB recommend the following
- **Judgement: off-topic false positive for this page.** It is a pay-review submission for Defence Medical Services. It mentions Scheme Pays administration and asks to remove the annual allowance taper, but it is not NHS pension increase content. **Declined with reason.** The keyword `armed forces pension increase 2026 latest news` is declined in 7.2.

### 4.12 https://www.forvismazars.com/uk/en/services/accounting-and-outsourcing/medical-accounting-services/insights/healthcare-news-autumn-2021/what-impact-does-cpi-have-on-my-pension-and-tax
**1 in-topic keyword. Classification: UNWINNABLE AUTHORITY.**
- Title: What does the increased CPI inflation rate mean for my NHS pension and tax? H1: What impact does CPI have on my pension and tax? ~1,200 words. Tables: no. Calculator: no. FAQ: no.
- Headings in order: Why may I have an Annual Allowance tax charge this year? · **What impact does CPI have on my NHS pension?** · Do recent changes to the annual allowance calculation help me? · How do I pay any annual allowance tax charge? · What can I do to mitigate any annual allowance tax charge? · What about the Lifetime Allowance? · What is the McCloud Judgement? · How we can help
- **Covers:** the mechanism we most need, stated plainly: "each year your pension is uplifted by the September CPI plus 1.5%", with the September 2021 CPI of 3.1% against 0.5% the year before, and the causal chain from CPI to pension growth to an annual allowance charge.
- **Gets wrong or omits:** **it is from Autumn 2021, five years old.** It quotes the £40,000 allowance as current, which is wrong for every year from 2023/24. Its "What about the Lifetime Allowance?" section predates abolition entirely. A five-year-old page still ranking is the clearest evidence that this topic is under-served.

### 4.13 Coverage checklist: the union of their heading themes minus ours

Present on at least one competitor above, absent from our page today:

1. Am I entitled to a lump sum on retirement, split by section
2. Commutation: trading £1 of pension for £12 of lump sum, and the maximum tax-free lump sum
3. When a lump sum is paid, and whether it is always tax free
4. Making a further commutation choice
5. **Active member revaluation: treasury orders plus 1.5%** and the nil-or-negative CPI case
6. **Deferred member increases under the Pensions (Increase) Act 1971**
7. **How a pension in payment is increased: September-to-September CPI, applied the first Monday in April**
8. Entitlement to a full increase in the first April (part-year proportioning)
9. Retiring before age 55 and the increase treatment
10. **Second bite pensions increase**
11. Who pays the increases
12. DB versus DC framing: why the NHS pension is different
13. **Tiered member contribution rates by earnings band**, and what it costs to join
14. Normal pension age by section, and the 2015 to state pension age link
15. **1995/2008 accrual mechanics for hospital doctors, and separately for GPs**
16. **2015 scheme accrual mechanics**
17. ERRBO and buying out the early retirement reduction
18. Early retirement actuarial reduction with a factor table
19. Added years and additional pension, and whether they are reduced
20. **Additional pension purchase: units of £250, the annual cap, tax relief, and whether it counts for the annual allowance**
21. McCloud remedy and what a doctor must actually do
22. Part-time doctors and pensionable pay
23. Devolved administration: Scotland (SPPA) and Northern Ireland
24. Final salary linking and dynamised income for practitioners
25. Returning to work and rejoining the scheme
26. **A stated annual increase percentage with its year** (only nicholsmedical does this)
27. An FAQ block (medicsmoney and BMA additional-pension have one; we do not)
28. Contribution rate tables (medicsmoney and BMA have them; we do not)

Themes 1 to 28 are covered, declined or reassigned in section 7. Count of undecided themes must be **zero** (§9.9 floor 8).

---

## 5. Whitespace

Specific and quotable.

1. **Not one competitor page in this topic contains a working NHS pension calculation.** Twelve URLs, 22,690 combined volume, and the phrase family is `... calculator` on nine tenths of it. BMA holds 20 of the keywords with a **1,200 word prose page and no arithmetic**. Medics Money, the strongest peer, explicitly omits "detailed pension calculation formulas". Forvis Mazars ranks on a five-year-old CPI note. **The market is serving explanation pages against calculation queries because nobody has published a calculation.** A guide that shows the 1/80th, 1/60th and 1/54th arithmetic worked through with a named salary is the whole opening.
2. **Nobody publishes an NHS pension increase table with years and percentages.** BMA's increase page, 2,200 words, publishes **no CPI rate and no year**. Nichols Medical gives one number (6.7% for April 2025) inside a page titled for 2025. The queries are explicit about years: `nhs pension increase 2026 27`, `nhs pension increase 2025/26`, `nhs pension increase 2024`, `nhs pension uplift 2026`, `when does nhs pension increase`, `does nhs pension increase with inflation`. That is **1,340 volume** asking for a table nobody has built.
3. **Nobody covers the three sections' calculation side by side.** BMA splits accrual across three H3s on a different page from the lump sum page from the increase page. Medics Money covers retirement ages but not accrual. A single side-by-side of 1995 (1/80th plus automatic 3x lump sum, NPA 60), 2008 (1/60th, NPA 65) and 2015 (1/54th CARE, CPI + 1.5% revaluation, NPA at state pension age) does not exist on any of the twelve pages.
4. **The devolved calculators are a naked gap.** `pension calculator nhs scotland` (260), `nhs pension calculator scotland` (110), `sppa nhs pension calculator` (90), `sppa pension calculator nhs` (90) total **550 volume** and every single one is held by bma.org.uk. No specialist firm holds any of them.
5. **The contribution tier tables on every competitor are a year stale.** BMA's newest is "from 1 April 2025". `house_positions.md` §2.C carries the **2026/27 bands uplifted from 1 April 2026**, verified at NHS Employers 2026-08-26. Publishing the current table with its date tag and the standing CPI-uplift rule is a freshness win available today.

**KEEP, marked explicitly, from our current page:**
- **KEEP** the section "How the NHS Pension Scheme calculates pension input", which already sets out the closing-minus-opening structure with the CPI adjustment. It is closer to a real calculation than anything on the twelve competitor pages. It needs correcting (see section 6) and expanding, not replacing.
- **KEEP** the passage warning that NHSBSA Pension Savings Statements are **not always accurate**, particularly for members who changed section or had part-year pay changes. No competitor says this. It is specialist depth and it is the reason a doctor calls an accountant.
- **KEEP** the point that statements are **not issued proactively** to everyone affected by the taper, so a doctor should not wait for one. Uniquely ours in this teardown.
- **KEEP** the `audience` array. Splitting GP partners, salaried GPs, consultants and locums is the right frame and no competitor page segments its reader.

---

## 6. Our current page, read honestly

Read from `Medical/web/src/lib/medical-guides-data.ts` lines 20 to 76 at sha `b3d78c97e768645cca480dd350281ffa68c1faf9`.

- Approximate word count of the entry: **1,048** (`node`, whitespace split of the object literal). `readTime` claims **12 min**. At roughly 200 words a minute that is a **5 minute read being advertised as 12**. Fix the claim or fix the length; do not leave both.
- `metaTitle`: `NHS Pension Annual Allowance Guide for Doctors | GP & Consultant Tax`
- `title` (rendered as H1): `NHS Pension Annual Allowance: A Complete Guide for UK Doctors`
- `sections[].heading` in order, all six: What is the annual allowance? · How the NHS Pension Scheme calculates pension input · The tapered annual allowance for high earners · Carry-forward: using unused allowances from prior years · Scheme Pays: deferring an annual allowance charge · What to do if you receive a Pension Savings Statement
- Plus 6 `keyPoints`, 3 `relatedGuides`, 4 `relatedPosts`.

**Blunt read: this page is thin, and it is the wrong page for its assigned topic.** 1,048 words across six sections, no table, no FAQ block, no worked figure other than the threshold numbers. It is a competent summary of the **annual allowance mechanics**, which is precisely the half of the vocabulary that section 1.2 allocates to the calculator sibling. Its assigned topic is `nhs pension calculator` (27,940 volume, 74 keywords) and it contains **0 of 42** of that topic's phrases. That is not a coverage gap, it is a mis-aimed page.

**Stale:**
- `metaDescription` ends "Updated for 2025/26." The live tax year is **2026/27**.
- `sections[0].body`: "For 2025/26, the standard annual allowance is £60,000."
- `sections[2].body`: "For 2025/26, the taper works as follows".
- `sections[5].body`: "(£60,000 for 2025/26)".
- `keyPoints[0]`: "Standard annual allowance for 2025/26 is £60,000."
- House positions §2.B is explicit: every one of these figures **carries into 2026/27 unchanged**, verified 2026-08-26. The numbers are right; five year tags are wrong. Re-tagging is free and fixes a freshness signal.

**Factually wrong or muddled against `house_positions.md`:**

1. **`sections[0].body` conflates the PIA factor with the accrual rate.** It says the pension input is "the increase in your pension entitlement over the pension input period, multiplied by a factor of 16 (for the 1995 and 2008 sections) **or 1/54th of pensionable pay for the 2015 section**". 1/54th is the **2015 accrual rate** (house positions §2), not a PIA factor. The page's own next section then correctly applies **x16 to all three sections**. The page contradicts itself two paragraphs apart. This is the single worst error on the page and it sits in the opening section.
2. **`sections[4].body` states Scheme Pays needs "an annual allowance charge of £2,000 or more".** House positions §2.D and FA 2004 s.237B: the charge must **exceed** £2,000. "Or more" wrongly includes a charge of exactly £2,000.
3. **`sections[4].body` says mandatory Scheme Pays applies where "your pension input amount exceeds the annual allowance".** House positions §2.D is more precise and the imprecision matters: the NHS scheme's own input must exceed the **standard £60,000** allowance. A charge driven only by the taper below £60,000 is **voluntary** Scheme Pays. As written the page tells a tapered doctor they have a right they do not have.
4. **The Scheme Pays deadline is absent entirely.** House positions §2.D: **31 July** in the year following the year the charge crystallised, so a **2026/27 charge must be elected by 31 July 2028**. And the limb NHS members actually need, because house positions says late NHSBSA statements are "the normal case, not the exception": where a **revised** statement is issued **on or after 2 May**, the deadline extends to the earlier of **3 months from that statement** or **6 years from the end of the tax year**. A guide that names Scheme Pays and omits its deadline is incomplete.
5. **No mention of the McCloud remedy at all**, on a page that explains pension input across the 1995, 2008 and 2015 sections. The remedy period is **1 April 2015 to 31 March 2022** with rollback from **1 October 2023** and a deferred choice at retirement (house positions §2.A). A doctor calculating a 2015-section input for those years is calculating the wrong thing without it.
6. **No mention of the CPI + 1.5% active revaluation**, which is the mechanism behind the entire increase and uplift family this page is being assigned.
7. **`relatedPosts` links two frozen pages.** `/blog/nhs-pension-annual-allowance-complete-guide` and `/blog/nhs-pension-tapered-annual-allowance-calculator` are both inside armed `monitored_pages` windows to **2026-09-10**. The existing links may stay, since leaving them is not a change to those pages. **No new link to either may be added**, and neither may be removed, because both actions alter their inbound link graph inside a measurement window.

**Worth keeping:** see the KEEP list in section 5. The page is well written. It is aimed at the wrong topic, five year tags stale, and carries one self-contradiction and three Scheme Pays imprecisions.

---

## 7. Deterministic acceptance criteria

All countable at QA. A failure on any numbered item is a BLOCK.

### 7.1 Phrases that must appear verbatim (case and punctuation normalised): **27**

Drawn from the `On page = no` rows of section 3. **Peer-winnable volume in this topic is 0**, so ordering falls to volume (the tie-break the brief prescribes). All 42 rows are held by bma.org.uk or forvismazars.com, both classified unwinnable-authority, which is why the ordering below is pure volume.

The calculator family, 17 phrases:
1. `nhs pension calculator` (6600)
2. `nhs pension fund calculator` (6600)
3. `nhs pension calculator 2015` (880)
4. `nhs pension calculator 2015 scheme` (880)
5. `1995 nhs pension calculator` (480)
6. `nhs pension calculator 1995` (480)
7. `nhs pension calculator 1995 scheme` (480)
8. `nhs pension calculator uk` (480)
9. `pension calculator nhs 1995` (480)
10. `pension calculator nhs uk` (480)
11. `calculate nhs pension contribution` (390)
12. `how to calculate nhs pension` (320)
13. `additional nhs pension calculator` (260)
14. `early retirement nhs pension calculator` (260)
15. `nhs pension calculator early retirement` (260)
16. `nhs pension calculator lump sum` (110)
17. `2008 nhs pension calculator` (70)

The increase and uplift family, 6 phrases (these carry NO-PAGE row 17, 1,930 volume):
18. `nhs pension increase` (170)
19. `nhs pension increases` (170)
20. `nhs pension uplift` (170)
21. `does nhs pension increase with inflation` (90)
22. `when does nhs pension increase` (50)
23. `nhs pension increase 2026 27` (390)

The devolved family, 3 phrases (whitespace item 4, 550 volume, no specialist firm holds any):
24. `pension calculator nhs scotland` (260)
25. `nhs pension calculator scotland` (110)
26. `sppa nhs pension calculator` (90)

The final-salary phrase:
27. `final salary pension calculator nhs` (50)

### 7.2 The year-row block and the declines

**Placed in the increase table, 5 further phrases:** `nhs pension increase 2025` (260) · `nhs pension increase 2025/26` (140) · `nhs pension increase 2024` (70) · `nhs pension uplift 2026` (70) · `sppa pension calculator nhs` (90).

**Total phrase count to place: 27 + 5 = 32 of the 42 absent rows.**

**Declined, with reason: 10 of 42.**

| Keyword | Vol | Reason code | Reason |
|---|---|---|---|
| `nhs pension increase 2026/27 latest news today` | 140 | news-cycle | A live-news intent a guide cannot serve and should not chase. Held by forvismazars at position 31 on a June 2026 update note. |
| `armed forces pension increase 2026 latest news` | 90 | off-niche | Defence Medical Services pay review, not NHS pension. See 4.11. |
| `nhs pension calculator gov uk` | 110 | SERP owned | Navigational to gov.uk. |
| `nhs pension increase 2026 gov uk` | 110 | SERP owned | Navigational to gov.uk. |
| `nhs pension increase 2025 26 gov uk` | 90 | SERP owned | Navigational to gov.uk. |
| `nhs pension increase 2025/26 gov uk` | 90 | SERP owned | Navigational to gov.uk. |
| `nhs pension calculator unison` | 140 | brand | Navigational to a trade union. |
| `nhs pension calculator 2015 examples pdf` | 110 | off-format | Asks for a PDF. We do not publish one and will not build one for this. |
| `1995 nhs pension calculator free` | 70 | modifier duplicate | The `free` modifier on row 5, already placed. Declining the modifier form rather than writing "free" into the copy, which reads as a keyword insertion and fails the editorial pass. |
| `nhs pension calculator monthly` | 50 | deferred | Real intent (monthly pension figure) but the monthly-versus-annual framing belongs with the retirement-income pages. Named for a later pass. |

**Reassigned to a sibling, not declined: 0 rows from this topic.** The annual-allowance mechanics phrases prohibited in section 1.1 are not members of this topic's 42-row set.

### 7.3 Equity preservation: **3 queries must still match** (§9.9 floor 5)

Every one of the 3 Bing queries in section 2 must be matchable in `metaTitle`, `title`, a `sections[].heading`, an FAQ entry, or body prose after the rewrite. Named individually because any one that stops matching is a BLOCK with its diff line:

1. `aa tax charges 25/26 nhs`, **1 impression, 1 click. This is the only click either engine has ever recorded on this URL.** It needs `annual allowance` (as `AA`), `tax charge` and a `2025/26` reference to co-occur. **Consequence: re-tagging every `2025/26` to `2026/27` must not remove `2025/26` from the page entirely.** House positions §2.B prescribes the fix directly: tag figures **2026/27** and say **"unchanged from 2025/26"** where a page compares years. Do that, and this query survives the re-tag. Do a blind find-and-replace and the page loses its only click.
2. `how do you calculate the pia for a 1995 and 2015 nhs pension`, needs `PIA`, `pension input amount`, `1995` and `2015` in one passage. Currently matched by `sections[1]`, which is the section that also carries the factor-16 self-contradiction. Fixing the error must not delete the match.
3. `doctors pension annual allowance`, **average position 2.0**, the best position this URL holds on either engine. Needs `doctors`, `pension` and `annual allowance` to co-occur. The current H1 carries it. Any new H1 must too.

**Google: 0 query-level rows.** Before the writer starts, QA reads the **page-level** figure for this URL from `gsc_page_rows.json`. GSC anonymises low-volume queries, so a zero query breakdown is not evidence of zero Google demand.

### 7.4 EXTEND-only protections

**Not applicable. This page is REFRAME.** metaTitle, title (H1) and the six `sections[].heading` values may all change. The equity register in 7.3 still binds absolutely, and the section 1.1 prohibitions bind absolutely.

### 7.5 Arithmetic that must recompute

Every calculation the page publishes must be recomputed by QA from the stated inputs.

| # | Input | Expected output | Source of the rule |
|---|---|---|---|
| A1 | 1995 section, 20 years reckonable service, final pensionable pay £100,000 | Pension = 20/80 x 100,000 = **£25,000** a year. Automatic lump sum = 3 x pension = **£75,000**. | house_positions §2: 1/80th plus automatic 3x lump sum |
| A2 | 2008 section, 20 years, final pensionable pay £100,000 | Pension = 20/60 x 100,000 = **£33,333**. **No automatic lump sum.** | §2: 1/60th, no automatic lump sum |
| A3 | 2015 section, one year, pensionable earnings £100,000 | Accrual for that year = 100,000 / 54 = **£1,851.85**, then revalued at **CPI + 1.5%** while active | §2: 1/54th CARE, active revaluation CPI + 1.5% |
| A4 | 2015 section, £1,851.85 accrued, CPI of 3.0% | Revalued amount = 1,851.85 x 1.045 = **£1,935.18** | §2: CPI + 1.5% |
| A5 | PIA for any section: closing pension x 16 minus (opening pension x 16 x CPI adjustment) | The x16 factor applies to **all three sections**. 1/54th is an accrual rate, never a PIA factor. | §2, and this is the fix for the section 6 item 1 error |
| A6 | A Scheme Pays deadline for a 2026/27 charge | **31 July 2028** | §2.D, FA 2004 s.237BA |
| A7 | A Scheme Pays deadline where a revised statement is issued on or after 2 May | The **earlier of** 3 months from that statement **or** 6 years from the end of the tax year | §2.D |
| A8 | Any tiered member contribution figure | The **2026/27** table from §2.C: up to £13,259 at 5.2% · £13,260 to £28,854 at 6.5% · £28,855 to £35,155 at 8.3% · £35,156 to £52,778 at 9.8% · £52,779 to £67,668 at 10.7% · £67,669 and above at 12.5%. Date-tagged, with the statement that a band table can be **revised retrospectively in-year**. | §2.C |
| A9 | Any employer contribution figure | **23.7% of pensionable pay**, from 1 April 2024, current for 2026/27, to be re-checked before any 2027/28 content | §2.C |
| A10 | McCloud remedy period | **1 April 2015 to 31 March 2022**, rollback from **1 October 2023**, deferred choice **at retirement** | §2.A. Note nicholsmedical states this wrongly (see 4.8); do not copy it. |

A5 and A10 exist specifically to catch the two errors this pack found. Both must be run.

### 7.6 Statute and regulation to be re-verified at source

| What | URL |
|---|---|
| Scheme sections, accrual rates 1/80th, 1/60th, 1/54th, NPAs, all-active-in-2015-from-1-April-2022 | https://www.nhsemployers.org/articles/comparing-different-sections-nhs-pension-scheme |
| McCloud remedy period, rollback date, deferred choice | https://www.nhsemployers.org/articles/mccloud-remedy |
| McCloud primary legislation | https://www.legislation.gov.uk/ukpga/2022/7 |
| Tiered member contribution bands 2026/27, and the standing September-CPI uplift rule | https://www.nhsemployers.org/publications/nhs-pension-scheme-member-contributions |
| Employer contribution rate 23.7% | https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions |
| Annual allowance, MPAA, minimum tapered AA, threshold and adjusted income limits, LSA, LSDBA, 2026/27 | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates |
| Taper trigger conditions and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Scheme Pays liability and the £2,000 test | https://www.legislation.gov.uk/ukpga/2004/12/section/237B |
| Scheme Pays deadline and the revised-statement extension | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA |
| Scheme Pays deadline in HMRC's words, including the 2 May limb | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 |
| Lifetime allowance abolition (needed only for the one-sentence historic reference, see 1.1) | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 |

Note: NHSBSA's own member-hub pages return **HTTP 403** to automated fetches (house_positions verification log). NHS Employers is the fetchable authority. The 403 is a fetch limitation, not a missing fact.

**Not verifiable and therefore not to be stated:** the **current year's NHS pension increase percentage**. Nichols Medical publishes 6.7% for April 2025 (see 4.8) and it is not in `house_positions.md`. The increase is set by the annual Pensions Increase (Review) Order and is not in the locked ground truth. The page must therefore build the increase table around the **mechanism** (September-to-September CPI, applied the first Monday in April, plus 1.5% for active revaluation, per §2 and corroborated by BMA 4.2 and Forvis Mazars 4.12) and frame any specific percentage as **"confirm the current figure at source"**, naming the block: the `sections[]` entry titled for NHS pension increases.

### 7.7 UNVERIFIED figures that must not be stated

`house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **No figure for any of them may appear on this page.** The GMC fee is the live risk here, because a guide for doctors that discusses deductions reaches for it. The page may say the fee **is deductible**; it must not state an amount, and where it needs one it says "confirm the current figure at source". Named block if it arises: any `sections[]` entry touching allowable deductions or threshold income.

### 7.8 The floors

**The four existing floors (§4):**
1. **Arithmetic**, all ten calculations in 7.5 recompute.
2. **Statute**, every URL in 7.6 fetched and confirmed, or its status code recorded.
3. **Links**, every internal link resolves. The page must link **up** to `/nhs-pension` (the hub) and **across** to `/calculators/nhs-pension-annual-allowance` (the tool) and `/research/annual-allowance-pension-tax-index` (the data). It must **not add or remove** any link to `/blog/nhs-pension-annual-allowance-complete-guide` or `/blog/nhs-pension-tapered-annual-allowance-calculator` while those are frozen to 2026-09-10. The three `relatedGuides` slugs must still exist in `MEDICAL_GUIDES`.
4. **Coverage**, the 32 phrases of 7.1 and 7.2 all placed, each unplaced one named.

**§9.9 floors 5 to 8:**
5. **Equity preservation**, all 3 Bing queries in 7.3 still matchable, with particular attention to the `25/26` string surviving the year re-tag. Any that is not is a named BLOCK with the diff line that removed it.
6. **Cluster coverage**, every keyword the dossier assigned to this page is placed; the checker names each one that is not.
7. **Reconciliation balance**, this page's 42 keywords balance: 32 assigned, 0 already-covered (all 42 are absent), 9 excluded (news-cycle, off-niche, SERP-owned, brand, off-format, modifier duplicate), 1 deferred (`nhs pension calculator monthly`). **32 + 0 + 9 + 1 = 42.**
8. **Competitor re-read**, all 28 coverage-checklist themes in 4.13 decided, so the undecided count is zero:
   - **Covered here:** 1, 2, 3, 5, 6, 7, 8, 11, 12, 14, 15, 16, 20, 22, 23, 24, 26, 27, 28
   - **Covered here in brief with a link out:** 4, 9, 13 (the tier table is published here per A8, with the contribution-cost framing linking to the calculator), 21 (McCloud, two paragraphs, linking to `/blog/mccloud-remedy-nhs-pension-doctors-explained`)
   - **Belongs to `/blog/nhs-pension-partial-retirement-doctors-guide`:** 17, 18, 19, 25 (ERRBO, actuarial reduction factors, added years, returning to work). Declined here with reason: dossier §7 assigns early retirement and retire-and-return to that page.
   - **Belongs to `/calculators/nhs-pension-annual-allowance`:** 10 is not a competitor theme we take, and the annual-allowance interaction inside theme 20 is stated in one sentence with a link rather than developed.
   - **Declined outright:** 10 (second bite pensions increase). Reason: it is a narrow post-retirement mechanic that BMA covers adequately and that no keyword in section 3 asks for. Recorded as a decision, not an omission.
   - Undecided: **0**

Plus the two human passes: adversarial factual QA against `house_positions.md` §2, §2.A, §2.B, §2.C and §2.D, and the editorial pass against the cluster answer-pattern spec (§9.11), which here must also check that the calculator phrases in 7.1 read as prose rather than as inserted keywords. Seventeen `... calculator` phrases in one page is the highest keyword-insertion risk in this batch. The intended device is a set of section headings framed as calculation questions ("How to calculate an NHS pension in the 1995 section") plus a table of what each scheme's calculator needs as an input, not a paragraph listing the phrases.

---

## 8. Stated expectation

Written before the work, as numbers a later read can fail (§9.6).

**Engine and window.** Bing is the **14 to 28 day** read, Google the **28 to 90 day** read. Baseline is the 90-day pull to 2026-08-26 in section 2: Bing 3 impressions, **1 click**, 3 named queries, best position 2.0; Google 0 query-level rows.

**What we expect:**

| Read | Window | Expectation |
|---|---|---|
| Bing, 14 day | to 2026-09-09 | All 3 baseline queries still returning impressions. `doctors pension annual allowance` still at or better than position **2.0**. |
| Bing, 28 day | to 2026-09-23 | Bing impressions on this URL at or above **9** (three times the baseline), driven by the calculator family and the increase family. At least **4** of the 32 named phrases from 7.1 and 7.2 appearing as new named Bing queries on this URL. Clicks at or above **1**. |
| Google, 28 day | to 2026-09-23 | No expectation. Record the page-level impression figure only. |
| Google, 90 day | to 2026-11-24 | Page-level impressions on this URL above **0**, and at least one query-level row appearing where there are currently none. |

**The verdict is read against phrase coverage, not total traffic** (§9.6 rule 2). Total impressions rising while the 32 named phrases stay missing is **drift and must be recorded as a fail.**

**Failure trigger, written as a number.** If, in the 28-day window to **2026-09-23**, Bing clicks on `/medical-guides/nhs-pension-annual-allowance` are **0** (against a baseline of 1), **or** Bing impressions fall below **3** (the baseline), **or** the query `doctors pension annual allowance` stops returning an impression on this URL, **revert** with `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/lib/medical-guides-data.ts` and record the reason in `blog_optimizations.rollback_reason`.

**A caution on the baseline.** 3 impressions and 1 click is a small number and it will be noisy. That is exactly why the failure trigger is written as a query-survival test (`doctors pension annual allowance` at position 2.0) as well as a volume test. Losing a position-2 query is a signal even when the impression count is too small to move.

**Tracker discipline.** `blog_optimizations.target_keywords` for this page must be populated with the **32 missing phrases** from 7.1 and 7.2, not with the annual-allowance phrases the page already carries. Populating it with what the page already ranked for re-measures the past.

**One change per page per window.** This page, the calculator and the research index are all changing in the same batch. The section 1.2 vocabulary split is what makes their Bing readings separable. If the writer breaches the split, the 28-day read on all three is uninterpretable and the correct response is to revert all three, not to guess.

---

## Corrections to the dossier

1. **The dossier does not record that this page contradicts itself on the PIA factor.** `sections[0].body` says the 2015 input is "1/54th of pensionable pay" while `sections[1].body` correctly applies the x16 factor to all three sections. The dossier lists this page as REFRAME with 73 of 74 keywords missing, which is a coverage finding. It is also carrying a live factual self-contradiction in its opening section, and one of the three Bing queries this URL earns (`how do you calculate the pia for a 1995 and 2015 nhs pension`) lands on exactly that passage.

2. **`readTime: "12 min"` is unsupported.** The entry is 1,048 words, roughly a 5 minute read. The dossier's page inventory does not check `readTime` claims. Flagging it because it is a user-facing claim on a page we are about to touch.

3. **Dossier §7 lists `nhs pension increase` as an unresolved tie between this page (51.1) and `/calculators/nhs-pension-annual-allowance` (51.1), noted "tie, same slug two namespaces".** Dossier §4 NO-PAGE row 17 has already resolved it: "Section on /medical-guides/nhs-pension-annual-allowance". The two are consistent but §7 reads as open. Recording the resolution here so a later reader does not reopen it.

4. **Dossier §7 also ties `pension nhs contact` (41.0) and `nhs deferred pension` (50.0) between this page and `/nhs-pension`.** This pack resolves both to `/nhs-pension`, consistent with §4 NO-PAGE rows 13 and 16 which prescribe sections on `/nhs-pension`. Stated so the writer does not take them.
