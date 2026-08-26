# §9.5 RESEARCH PACK: /blog/nhs-pension-partial-retirement-doctors-guide

Assembled 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, the deterministic data sheet for this page, `docs/medical/house_positions.md`, `docs/medical/competitor_universe_2026-08-26.md` and live competitor fetches recorded in section 4. Preparation only. The pack does not write the page.

---

## 1. Target and permission level

**CONSTRAINT FIRST.**

| Field | Value |
|---|---|
| URL | `/blog/nhs-pension-partial-retirement-doctors-guide` |
| Cluster / topic | nhs pension 1995 scheme · lane `nhs_pension` |
| Grade | **REFRAME** (data sheet header; dossier §3: 1 domain, 8,800 volume, 45 of 48 phrasings missing) |
| Source file | `Medical/web/content/blog/nhs-pension-partial-retirement-doctors-guide.md` |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>`, `<strong>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the whole `faqs` array live in frontmatter and are separate editable surfaces from the body. |
| Current sha | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/nhs-pension-partial-retirement-doctors-guide.md` |

**REFRAME = full rewrite permitted.** `metaTitle`, `title`, `h1`, every `<h2>` and `<h3>`, the body, `keyTakeaways`, `summary` and the `faqs` array may all be rewritten against the topic keyword set in section 3. The equity register in section 2 still binds: the single Bing query must still match.

**What may NOT be changed.**
- `slug`, `canonical`, the file path. Rewrite in place. No redirect, no collapse, no URL change (§5, hard rule 6).
- The locked positions in `house_positions.md` **§2.E (partial and early retirement)**, which governs this page, with **§2** (scheme sections and accrual), **§2.A** (McCloud), **§2.B** (annual allowance and taper) and **§2.D** (Scheme Pays) as the cross-references it must get right.
- Frontmatter keys the build depends on: `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (a single key, never duplicated), `altText`, `schema`.
- Nothing else under `Medical/web/` may be edited.

**Frozen-list position.** This page is **not** frozen. Batch 1 excludes the 16 pages with an armed `monitored_pages` window to **2026-09-10** (dossier §6) and treats the 3 `status='flagged'` rows (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) as **HOLD**. This page is on neither list. Note that two pages it links to, `/blog/nhs-pension-annual-allowance-complete-guide` and `/blog/nhs-pension-tapered-annual-allowance-calculator`, **are** frozen to 2026-09-10, and one, `/blog/nhs-pension-scheme-pays-doctors-deadlines`, is on HOLD. Linking to them is fine. Editing them is not, and no content may be moved into or out of them.

**The defining fact about this topic: peer-winnable volume is ZERO.** Section 3 records 37 keywords, 6,850 combined volume, **peer-winnable volume 0**, **2 contributing domains**, and the best position on **every single row** is held by **bma.org.uk**. This is not a topic where a peer holds a slot we can take. Per owner decision 21 (2026-08-26) that **does not remove the topic from the coverage set**: peer-winnable volume sequences the work, it never excludes it. The reasons it is still worth writing are stated by the dossier and the estate ground truth, and the writer should hold both:
1. **Winnability is per engine.** bma.org.uk's dominance here is measured on Google. On this site **Bing out-clicks Google 3.4x and indexes the corpus fully while Google indexes roughly 16% of it** (dossier / decision 21 rationale). A Google-derived screen would have discarded a third of the head SERP.
2. **The harvest exists to define the market's vocabulary.** bma.org.uk supplied the largest share of the missing vocabulary in the dossier's §5 precisely because it owns the hardest SERPs. We take the words, not the slot.

**Adjacent-page discipline.** Dossier §7 records this page as the owner of `early retirement` (59.6, tied with `/blog/mccloud-remedy-nhs-pension-doctors-explained`) and `retire and return` (51.2, against the McCloud page's 47.6). **This page owns both.** The McCloud page has been told to stay out. Conversely, this page must not grow a McCloud explainer, an annual allowance primer or a Scheme Pays mechanics section: it links to `/blog/mccloud-remedy-nhs-pension-doctors-explained`, `/blog/nhs-pension-annual-allowance-complete-guide`, `/blog/nhs-pension-tapered-annual-allowance-calculator` and `/blog/nhs-pension-scheme-pays-doctors-deadlines` for those, and it already does so correctly. **Keep that discipline.**

---

## 2. Equity register

*(Copied verbatim from the data sheet, including provenance lines.)*

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/nhs-pension-partial-retirement-doctors-guide)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **1** | impressions 2 | clicks 0.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| nhs pension partial retirement guide | 2 | 0 | 10.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set

*(Copied verbatim from the data sheet, including provenance lines and the full table. Not re-sorted, not truncated.)*

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
1995 (section|scheme)|2008 (section|scheme)|partial retirement|retire and return|draw down.*pension|early retirement.*(nhs|pension)|nhs pension.*early retirement|actuarial reduc|normal pension age
```

Keywords in topic: **37** | combined volume **6,850** | peer-winnable volume **0** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 2
| **Absent verbatim from this page: 36 of 37. Absent from the whole 105-page corpus: 36.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 590 | 6 | bma.org.uk | no | **no** | no | nhs pension 1995 scheme |
| 480 | 7 | bma.org.uk | no | **no** | no | nhs pension calculator 1995 scheme |
| 390 | 6 | bma.org.uk | no | **no** | no | early retirement nhs pension |
| 390 | 5 | bma.org.uk | no | **no** | no | early retirement nhs pension scheme |
| 390 | 6 | bma.org.uk | no | **no** | no | nhs pension early retirement |
| 390 | 8 | bma.org.uk | no | **no** | no | nhs pensions early retirement |
| 260 | 8 | bma.org.uk | no | **no** | no | early retirement nhs pension calculator |
| 260 | 8 | bma.org.uk | no | **no** | no | nhs early retirement pension calculator |
| 260 | 8 | bma.org.uk | no | **no** | no | nhs pension calculator early retirement |
| 260 | 7 | bma.org.uk | no | **no** | no | nhs pension early retirement calculator |
| 260 | 8 | bma.org.uk | no | **no** | no | nhs pensions early retirement calculator |
| 210 | 9 | bma.org.uk | no | **no** | no | nhs pension early retirement calculator 1995 |
| 210 | 4 | bma.org.uk | no | **no** | no | nhs pension early retirement reduction |
| 210 | 5 | bma.org.uk | no | **no** | no | nhs pension reduction for early retirement |
| 170 | 7 | bma.org.uk | no | **no** | no | nhs pension retire and return |
| 170 | 6 | bma.org.uk | no | **no** | no | nhs pensions retire and return |
| 170 | 8 | bma.org.uk | no | **no** | no | retire and return nhs pension |
| 140 | 9 | bma.org.uk | no | **no** | no | early retirement pension |
| 140 | 11 | bma.org.uk | no | **no** | no | early retirement pensions |
| 140 | 9 | bma.org.uk | no | **no** | no | nhs pension early retirement calculator 1995 pdf |
| 140 | 8 | bma.org.uk | no | **no** | no | nhs pension early retirement calculator 2015 |
| 110 | 5 | bma.org.uk | no | **no** | no | actuarial reduction pension |
| 110 | 5 | bma.org.uk | no | **no** | no | pension actuarial reduction |
| 90 | 4 | bma.org.uk | no | **no** | no | actuarial reduction nhs pension |
| 90 | 20 | bma.org.uk | no | **no** | no | early retirement and state pension |
| 90 | 18 | bma.org.uk | no | **no** | no | early retirement state pension |
| 90 | 19 | bma.org.uk | no | **no** | no | early retirement state pension uk |
| 90 | 19 | bma.org.uk | no | **no** | no | early retirement uk state pension |
| 90 | 8 | bma.org.uk | no | **no** | no | nhs sick pay after retire and return |
| 70 | 8 | bma.org.uk | no | **no** | no | 1995 nhs pension early retirement |
| 70 | 6 | bma.org.uk | no | **no** | no | 1995 nhs pension scheme early retirement |
| 70 | 6 | bma.org.uk | no | **no** | no | nhs pension 1995 early retirement |
| 70 | 18 | bma.org.uk | no | YES | yes | nhs pension partial retirement |
| 50 | 8 | bma.org.uk | no | **no** | no | nhs pension 1995 scheme calculator |
| 50 | 7 | bma.org.uk | no | **no** | no | nhs pension 2008 scheme |
| 40 | 6 | bma.org.uk | no | **no** | no | nhs pension 2015 early retirement |
| 40 | 5 | bma.org.uk | no | **no** | no | nhs pension early retirement 2015 |

---

## 4. Competitor teardown

**No cap applied.** The data sheet lists **5** competitor URLs holding keywords in this topic. All five are torn down below. Four are bma.org.uk, one is practiceindex.co.uk. All five fetched successfully; there are **no flagged fetch gaps** on this page.

Domain classification per `competitor_universe_2026-08-26.md`: **peer** = §2a; **unwinnable-authority** = §2b.

### 4.1 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/taking-early-retirement
28 in-topic keywords · **unwinnable-authority** (bma.org.uk, §2b, 15 of 18 head terms, best position 1)
- Title / H1: "Taking early retirement". ~2,100 words.
- H2/H3: What is voluntary early retirement? · When to apply · Reductions to your pension · By how much will my pension and lump sum be reduced? · Can I compensate for any actuarial reduction? · What if I commute part of my pension to a bigger lump sum? · Lifetime and annual allowance · Added years/additional pension · Will my added years be reduced? · Will my additional pension be reduced? · Will my pension in payment be increased? · Returning to work · Can I return to work after taking early retirement? · Can I rejoin the pension scheme?
- Tables: **yes**, Government Actuary's Department actuarial reduction factor tables with sample monthly reduction factors by age and by scheme. Calculator: no. FAQ: no (questions used as headings).
- **Judgement.** This one URL holds **28 of the topic's 37 keywords**, which is the whole story of this topic in one line. It covers actuarial reduction mechanics, normal pension ages across 1995, 2008 and 2015, ERRBO, partial retirement since October 2023, and abatement on return to work. Its structural device is a **run of question-form headings**, most of them beginning "Will my..." or "Can I...". It omits tax beyond a passing mention of LTA abolition, has no case studies, no worked arithmetic on a specific member, and nothing at all on the GP-partner profit-share complication. **The GAD factor tables are the asset we cannot match and should not try to reproduce**, because §2.E explicitly forbids locking a fixed percentage reduction.

### 4.2 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/returning-to-work-after-retirement
5 in-topic keywords · **unwinnable-authority**
- Title / H1: "Returning to work after retirement". ~2,800 words.
- H2/H3: COVID-19 · Taking the required break to access your NHS pension on retire and return or full (not draw down/partial) retirement · I'm accessing the 1995 section benefits · I'm accessing the 2008 or 2015 scheme benefits · What if I don't take a 24 hour break? · Annual leave · I have untaken annual leave to be paid in lieu, how does that affect my retirement? · Can I use annual leave as my break in service? · Exceptions from the usual retire and return to work rules · I retired on health grounds · I am drawing down benefits from the 1995/2008 section or 2015 scheme · Redundancy · Members who have transitioned to the 2015 scheme · 1995/2008 section members who have been opted out for five years or more · Rejoining the pension scheme · I'm in receipt of 1995 section benefits · I'm in receipt of 2008 section benefits · I'm in receipt of 2015 scheme benefits · I transitioned to the 2015 scheme prior to retirement · Are there any restrictions on my NHS earnings after retirement? · Can I receive the employer contribution if I cease to be able to contribute to the scheme? · Additional guidance which may apply to members of the HSC pension scheme in Northern Ireland from 1 April 2024 · What if I work more than 16 hours per week in the first month after a break? · Can I use annual leave to ensure that I work no more than 16 hours per week during the first month? · The 16 hours per week restriction applied to 1995 section retirements · Exceptions from the usual retire and return to work rules · I'm a secondary care doctor in the 1995 section · I'm a GP in the 1995 section · What happens to an NCEA or NCIA if you retire and return?
- Tables: no. Calculator: no. FAQ: no (the whole page is scenario Q&A).
- **Judgement.** The definitive retire-and-return page and the reason we hold zero of the "retire and return" rows. It owns the **24-hour break**, the **16-hours-a-week first-month restriction**, abatement, annual leave as a break, and rejoining by section. Two things stand out. First, it explicitly draws the line our page needs: "retire and return **or full (not draw down/partial) retirement**", which is the cleanest available statement that retire-and-return and partial retirement are different animals. Second, and this is the useful one: **it does not address sick pay after retire and return at all**, yet bma.org.uk ranks at position 8 for "nhs sick pay after retire and return" (90). It also still carries a COVID-19 heading, which dates it.

### 4.3 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/when-can-i-take-my-nhs-pension
2 in-topic keywords · **unwinnable-authority**
- Title / H1: "When can I take my NHS pension?" ~2,100 words.
- H2/H3: Case studies (H3: Hugo · Kellie · Moussa · Beatrice) · How to apply for your pension · Taking late retirement (H3: 2015 scheme · 2008 section · 1995 section) · Pension scheme for female doctors.
- Tables: no. Calculator: no. FAQ: no.
- **Judgement.** Structurally the most interesting page in this teardown: it leads with **four named case studies** before any rule, and it is the only page in the set to treat **late retirement** (working past normal pension age, with 45-year service limits and an age-75 cap) as a first-class section. It states the normal pension ages correctly (1995 = 60, 2008 = 65, 2015 = State Pension age). It handles **minimum pension age 55 and partial retirement only in passing**, which is the seam our page sits in.

### 4.4 https://www.bma.org.uk/pay-and-contracts/pensions/retirement/calculating-your-pension-lump-sum
2 in-topic keywords · **unwinnable-authority**
- Title / H1: "Calculating your pension lump sum". ~1,800 words.
- H2/H3: Am I entitled to a lump sum on retirement? · 1995 section members and 2008 section optants via the Choice exercise · 2008 and 2015 sections · When your lump sum will be paid · Commutation of pension benefits · Maximum tax free lump sum · 1995 section · 2008 section and 2015 scheme · Is my lump sum always tax-free? · Is the lump sum likely to ever be taxed in future? · Making another commutation choice
- Tables: no, but it publishes **commutation factors inline** (1995 section 5.36, 2008/2015 4.28) and the £1 of pension for £12 of lump sum trade, with **two worked examples**. Calculator: no. FAQ: no.
- **Judgement.** The only page in this teardown with worked arithmetic, and it uses it well. It states the Lump Sum Allowance of £268,275 correctly, which matters because most of the competitor corpus in the wider cluster is still carrying pre-2024 lifetime allowance language (see the McCloud pack's 4.6). It omits how commutation interacts with partial retirement, which is precisely the question a doctor drawing 50 percent of accrued benefits will ask.

### 4.5 https://practiceindex.co.uk/gp/blog/explaining-the-nhs-pension-scheme-part-one/
1 in-topic keyword · **peer** (practiceindex.co.uk, §2a rank 6)
- Title / H1: "Explaining the NHS Pension Scheme, Part One". ~1,800 words.
- H2/H3: Association of Independent Specialist Medical Accountants nine-part tutorial for Practice Index, Introduction · Note · Part 1: Overview · Updates post-Budget 2023 · Is the NHS Pension Scheme a good scheme? · What benefits does the scheme provide? · The three parts: 1995, 2008 and 2015 · So what are the differences? Some key points · The Normal Retirement Age · How the pension is calculated · Do you get a tax-free lump sum? · Death in service and ill health benefits · (remainder is site chrome: Related Posts · Rating · Share this article · Leave a Reply · Recent Blog Posts · Recent Blog Comments · Social Media · Tag Cloud)
- Tables: no. Calculator: no. FAQ: no.
- **Judgement.** The only non-bma domain in the topic, and it holds exactly one keyword. It is a primer written by AISMA, the specialist medical accountants' association, which `competitor_universe_2026-08-26.md` §2b classifies as a **citation and membership target, not a rank target**. Its heading "Updates post-Budget 2023" dates it, and it uses "Normal Retirement Age" where the scheme's own term is **normal pension age**, which is worth noting because our page uses the correct term and the market searches it (the regex limb `normal pension age` is in the topic definition).

### 4.6 Coverage checklist: union of their heading themes minus ours

Our page's `<h2>` set: What partial (flexible) retirement is · The headline rules · Re-accrual: you keep building pension in the 2015 scheme · How partial retirement interacts with the annual allowance · How partial retirement interacts with McCloud · Partial retirement versus early retirement · A worked illustration · Practical steps and pitfalls for doctors · How we help doctors plan partial retirement. Plus `<h3>`s: How much you can draw · How many times · The 10 percent reduction condition · Minimum age · The 1 October 2023 change · The Scheme Pays timing point · Reducing hours can change taper exposure · Early retirement before normal pension age · ERRBO: the Early Retirement Reduction Buy Out · Which route suits whom.

Union of competitor themes, deduplicated, marked against ours:

1. What is voluntary early retirement (4.1), partly ours
2. When to apply / how to apply (4.1, 4.3), **NOT OURS**
3. Reductions to your pension: the actuarial reduction principle (4.1), ours
4. **By how much will my pension AND LUMP SUM be reduced (4.1)**, **NOT OURS** on the lump sum half
5. Compensating for the reduction / ERRBO (4.1), ours
6. **Commutation: trading pension for a bigger lump sum, and doing it at early retirement (4.1, 4.4)**, **NOT OURS**
7. Annual allowance at retirement (4.1), ours
8. **Added years and additional pension, and whether they are reduced (4.1)**, **NOT OURS**
9. **Will my pension in payment be increased (4.1)**, **NOT OURS**
10. Returning to work after early retirement (4.1, 4.2), **NOT OURS**
11. Rejoining the pension scheme, by section (4.1, 4.2), **NOT OURS**
12. **The 24-hour break requirement (4.2)**, **NOT OURS**
13. **The 16-hours-a-week restriction in the first month (4.2)**, **NOT OURS**
14. **Annual leave as a break in service / pay in lieu (4.2)**, **NOT OURS**
15. **Abatement and restrictions on NHS earnings after retirement (4.2)**, **NOT OURS**
16. **Retire and return versus draw down / partial retirement, stated as a distinction (4.2)**, ours, and stated well
17. **Retiring on health grounds / ill-health exceptions (4.2)**, **NOT OURS**
18. **Redundancy interaction (4.2)**, **NOT OURS**
19. **Members opted out for five years or more (4.2)**, **NOT OURS**
20. **Secondary care doctor versus GP in the 1995 section, as separate cases (4.2)**, partly ours, we cover GP partner only
21. **NCEA / NCIA on retire and return (4.2)**, **NOT OURS**
22. **Northern Ireland HSC scheme divergence (4.2)**, **NOT OURS**
23. **Named case studies as the lead structure (4.3)**, ours as one illustration, not as a lead
24. **Late retirement, working past normal pension age, 45-year and age-75 limits (4.3)**, **NOT OURS**
25. Normal pension age by section (4.1, 4.3, 4.5), ours
26. Minimum pension age 55 (4.3), ours
27. **Entitlement to a lump sum by section, and the automatic 1995 lump sum (4.4, 4.5)**, partly ours
28. **When the lump sum is paid (4.4)**, **NOT OURS**
29. **Maximum tax-free lump sum and the Lump Sum Allowance (4.4)**, **NOT OURS**
30. **Is the lump sum always tax-free / could it be taxed in future (4.4)**, **NOT OURS**
31. Is the NHS pension a good scheme (4.5), **NOT OURS**, and belongs to `/calculators/nhs-pension-scheme-pays` in this batch
32. The three sections and their differences (4.5), ours
33. How the pension is calculated (4.5), **NOT OURS**, belongs to the annual allowance and calculator surfaces
34. **Early retirement and the state pension (keyword rows at 90 volume x 4)**, **NOT OURS**
35. **Sick pay after retire and return (keyword row, 90)**, **NOT OURS**, and **not covered by any competitor either**

Thirty-five themes. **Twenty-four are absent or materially under-treated on our page.** Every one must end QA marked covered, declined-with-reason, or belongs-to-another-page (§9.9 floor 8), undecided count **0**. Themes 31 and 33 are clear belongs-to-another-page declines. Themes 21 and 22 (NCEA/NCIA, Northern Ireland HSC) are reasonable deliberate declines for a page aimed at partial retirement, but the decline must be recorded.

---

## 5. Whitespace

1. **Nobody joins partial retirement to the lump sum decision.** 4.4 explains commutation with real factors and worked examples; 4.1 asks how the lump sum is reduced at early retirement; neither asks what happens when you draw **50 percent** of accrued benefits under partial retirement and want a lump sum from that slice. A doctor taking a partial drawdown faces exactly that question and there is no page in the topic that answers it. **This is the single largest piece of open whitespace.**
2. **Nobody covers sick pay after retire and return.** bma.org.uk ranks at **position 8** for "nhs sick pay after retire and return" (90 volume) on a page that, per the fetch, **does not address it**. An unsatisfied query at position 8 on an unwinnable domain is the definition of a gap that can be taken on Bing.
3. **Nobody handles the GP partner properly.** Every competitor page in this topic is written for a salaried doctor or a consultant with sessions and programmed activities. 4.2 has one heading for "I'm a GP in the 1995 section", about the break rules. **Nobody explains how a partner engineers a genuine 10 percent reduction out of a profit share, or what happens when the deed and the day-to-day reality diverge.** Our page already does this, twice, and it is our strongest asset in the topic. **KEEP.**
4. **Nobody sequences partial retirement against the Scheme Pays election.** The rule that no election is possible once all benefits are taken (§2.D) collides directly with a 100 percent partial drawdown. 4.1 covers annual allowance at retirement without this point. Our page has it. **KEEP, and it deserves more prominence than a single `<h3>`.**
5. **Nobody covers the interaction with the state pension.** Four phrasings at 90 volume each ("early retirement and state pension", "early retirement state pension", "early retirement state pension uk", "early retirement uk state pension", total 360) and bma.org.uk holds them all at positions 18 to 20, which for that domain means an incidental mention rather than an owned page. Nobody in the topic has a section on it. The 2015 scheme's normal pension age **is** State Pension age, so this is on-subject and unclaimed.
6. **Nobody quantifies the two-event limit as a planning decision.** 4.1 mentions drawdown; nobody treats "you get two events, when do you spend them" as the planning question it is. Our page raises it and then does not develop it.
7. **Everybody publishes the reduction as a factor table; the market searches for a calculator.** Eleven of the 37 rows are calculator phrasings ("nhs pension early retirement calculator" and its permutations, plus the 1995 and 2015 variants and a PDF variant), totalling **2,320 volume**, all held by bma.org.uk at positions 7 to 9 with **no calculator on the page**. This page must not build one. It should say plainly where the real factor tables live (NHSBSA/GAD), that the factors are revised, and why no third-party page can give you a reliable number. §2.E forbids locking a fixed percentage, and that constraint is also the honest answer to the query.

**Depth on our page worth keeping, marked KEEP:**
- **KEEP** the GP-partner profit-share treatment of the 10 percent reduction, including the paragraph on the deed and the day-to-day reality diverging. Nothing in the topic comes close.
- **KEEP** the Scheme Pays sequencing point (no election once all benefits are taken).
- **KEEP** the erosion warning: picking up extra sessions, waiting-list work or acting-up inside the 12 months and quietly undoing the reduction. This is a practitioner insight, not a rule restatement, and it appears on no competitor page.
- **KEEP** the section-by-section early retirement point: the same retirement date can carry different reductions across 1995, 2008 and 2015 benefits, so a headline percentage is meaningless. This is the correct framing under §2.E and it is better reasoning than 4.1's factor tables invite.
- **KEEP** the ERRBO judgement paragraph (paying for protection you may not use versus genuine early-exit intent). No competitor evaluates ERRBO, they only define it.
- **KEEP** the taper interaction paragraph, which correctly states £60,000, £200,000 threshold income, £260,000 adjusted income, £1 for every £2, £10,000 floor, all matching §2.B.

---

## 6. Our current page, read honestly

Read from `Medical/web/content/blog/nhs-pension-partial-retirement-doctors-guide.md` at sha `b3d78c97`.

**What it says now.**
- `metaTitle`: `NHS Pension Partial Retirement: A Doctor's Guide`
- `h1`: `NHS Pension Partial Retirement for Doctors: Drawing 20 to 100 Percent While Still Working`
- `title`: `Partial (Flexible) Retirement for Doctors: The NHS Pension Guide`
- Nine `<h2>` and ten `<h3>` (listed in full at 4.6), plus 5 `keyTakeaways` and **14 frontmatter FAQs**.
- Body word count: **approximately 2,900 words**, plus roughly 1,400 words of frontmatter FAQ text. **Not thin.** It is longer than four of the five competitor pages.

**What is right, checked against `house_positions.md` §2.E and §2.**
- Partial (flexible) retirement, 20 percent to 100 percent, up to two drawdown events. Correct.
- Reduce pensionable pay or commitment by at least 10 percent, held for at least 12 months, with loss of eligibility for the benefits taken if reversed. Correct.
- Continued accrual in the 2015 scheme at 1/54th of pensionable earnings. Correct per §2 and §2.E.
- Minimum pension age 55; normal pension ages 60 (1995), 65 (2008), State Pension age (2015). Correct.
- Permanent actuarial reduction for early retirement, factors set by NHSBSA and GAD, revised from time to time, **no fixed percentage quoted**. This is exactly what §2.E requires and the page does it correctly and deliberately. **Good.**
- ERRBO described as a 2015-scheme buy-out of part of the reduction, at a real ongoing contribution cost. Correct.
- Taper figures: £60,000 standard allowance, threshold income £200,000, adjusted income £260,000, £1 for every £2, £10,000 floor. All match §2.B for 2026/27.
- Scheme Pays: no election once all benefits are taken. Matches §2.D.
- McCloud: taking benefits triggers the Deferred Choice Underpin for the remedy period. Matches §2.A.

**One point to check at source, not an error:** the page says "From 1 October 2023 the regulations opened partial retirement to 1995 Section members, who previously could not use it (it was already available to 2008 Section and 2015 Scheme members)". `house_positions.md` §2.E states partial retirement as available "all sections from 1 October 2023". These are compatible readings, and the page's version is the more specific and more useful one, but it is **more specific than the locked position**, so it must be re-verified at NHSBSA / NHS Employers before republication rather than carried forward on trust.

**What is wrong or missing, bluntly.**
1. **36 of the topic's 37 phrasings are absent.** The one present is "nhs pension partial retirement". The page is written almost entirely in "partial retirement" and "flexible retirement" vocabulary while the topic's mass, **2,320 volume across eleven rows**, is in **early retirement calculator** phrasings and another **1,560** is in plain **early retirement** phrasings.
2. **"Early retirement" is in no heading.** There is an `<h2>` "Partial retirement versus early retirement" and an `<h3>` "Early retirement before normal pension age", so the concept is present, but the market's actual strings ("nhs pension early retirement", "early retirement nhs pension", "nhs pension early retirement reduction", "nhs pension reduction for early retirement") appear nowhere verbatim. This is the cheapest available gain on the page.
3. **"1995 scheme" and "2008 scheme" are absent as strings.** The page consistently writes "1995 section" and "2008 Section", which is the scheme's own correct terminology, while the market searches "nhs pension 1995 scheme" (590) and "nhs pension 2008 scheme" (50). **Both spellings must appear.** The rewrite does not abandon the correct term; it introduces the searched term alongside it, once, in a place where a reader will not be confused.
4. **"Actuarial reduction" appears in prose but never in the searched word orders.** The rows are "actuarial reduction pension" (110), "pension actuarial reduction" (110) and "actuarial reduction nhs pension" (90). Three phrasings, 310 volume, and the page has the concept and not one of the strings.
5. **Retire and return is defined and then dropped.** The page distinguishes it from partial retirement in two good sentences and never returns to it, while holding the topic per dossier §7. The 24-hour break, the 16-hour first-month restriction, abatement and sick pay after retire and return are all absent. **Three "retire and return" rows totalling 510 volume are unaddressed on the page that owns the topic.**
6. **The lump sum is absent entirely.** No commutation, no automatic 1995 lump sum, no Lump Sum Allowance. For a page about drawing benefits, this is a real hole, and 4.4 shows how straightforward it is to fill.
7. **No table.** Section, normal pension age, automatic lump sum, accrual rate, and what partial retirement does to each: that is a five-column table a doctor would actually use, and none of the five competitors has one either.
8. **No calculator, correctly.** The page should stay a guide. But it currently says nothing at all about where the factors come from beyond "the current NHSBSA factor tables", and it does not name GAD in a way a reader could act on.
9. **`keyTakeaways` and `faqs` are strong surfaces already in use.** Fourteen FAQs is a good base; several of them are already near-verbatim market questions ("What is the difference between partial retirement and early retirement?", "What is the minimum age for partial retirement?"). The rewrite should extend that pattern rather than replace it.

Verdict: **a well-built, factually careful page written in the scheme's vocabulary rather than the searcher's.** Its §2.E compliance is exemplary, particularly the refusal to quote a fixed reduction percentage. The rewrite is a vocabulary and coverage job with three genuine content additions (retire-and-return detail, the lump sum, the state pension interaction) and one structural addition (a section comparison table).

---

## 7. Deterministic acceptance criteria

### 7.1 Exact phrases that must appear (verbatim, case and punctuation normalised), **24 required**

Drawn from the `On page = no` rows of section 3. **Peer-winnable volume in this topic is zero**, so ordering falls through to volume, per owner decision 21 (peer-winnable sequences, it never excludes). Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary` or body prose.

**Tier A, the early-retirement head (8 required):**
1. nhs pension 1995 scheme (590)
2. early retirement nhs pension (390)
3. nhs pension early retirement (390)
4. early retirement nhs pension scheme (390)
5. nhs pensions early retirement (390)
6. nhs pension early retirement reduction (210)
7. nhs pension reduction for early retirement (210)
8. early retirement pension (140)

**Tier B, retire and return, and the sections (6 required):**
9. nhs pension retire and return (170)
10. retire and return nhs pension (170)
11. nhs pensions retire and return (170)
12. nhs sick pay after retire and return (90)
13. nhs pension 2008 scheme (50)
14. nhs pension 2015 early retirement (40)

**Tier C, actuarial reduction and the 1995 variants (6 required):**
15. actuarial reduction pension (110)
16. pension actuarial reduction (110)
17. actuarial reduction nhs pension (90)
18. 1995 nhs pension early retirement (70)
19. nhs pension 1995 early retirement (70)
20. 1995 nhs pension scheme early retirement (70)

**Tier D, state pension interaction (4 required, one block covers all four):**
21. early retirement and state pension (90)
22. early retirement state pension (90)
23. early retirement state pension uk (90)
24. early retirement uk state pension (90)

**Deferred with reason (7 rows, named so the ledger balances).** The calculator phrasings: `nhs pension calculator 1995 scheme` (480), `early retirement nhs pension calculator` (260), `nhs early retirement pension calculator` (260), `nhs pension calculator early retirement` (260), `nhs pension early retirement calculator` (260), `nhs pensions early retirement calculator` (260), `nhs pension early retirement calculator 1995` (210). **Reason: tool intent, and this page is a guide.** They total 1,990 volume and the honest position under §2.E is that no third party can publish a reliable early-retirement reduction figure because GAD revises the factors. The page must therefore **address the intent without claiming the tool**: one named block that says where the current factor tables live and why a fixed percentage cannot be quoted. **Recommendation recorded as a delta, not folded in:** an NHS early-retirement reduction illustrator belongs in `/calculators/` in a later pass. No collapse, no redirect, no URL change is proposed.

**Encouraged but not required (5 rows):** `early retirement pensions` (140), `nhs pension early retirement calculator 1995 pdf` (140), `nhs pension early retirement calculator 2015` (140), `nhs pension 1995 scheme calculator` (50), `nhs pension early retirement 2015` (40). Several will be placed incidentally by Tier A and C.

Ledger for floor 7: 1 already-covered + 24 assigned-and-required + 7 deferred-with-reason + 5 encouraged = **37**. Balances.

### 7.2 Equity preservation, **1 query, must still match**

`nhs pension partial retirement guide` must still be matchable in `metaTitle`, `h1`, an `<h2>`, an FAQ or body prose. It is carried today by the `h1`, the `metaTitle` and the slug. **The words "partial retirement" must survive in the metaTitle and the h1.** Since this is a REFRAME and the writer may be tempted to re-title the page around "early retirement" to chase the larger volume, this is stated as an explicit constraint: **a rewrite that drops "partial retirement" from the metaTitle or the h1 is a BLOCK.** Count required: **1 of 1**.

### 7.3 Protected elements
REFRAME. **No byte-identical requirement**, with the single named exception in 7.2: "partial retirement" survives in `metaTitle` and `h1`. Immutable: `slug`, `canonical`, the file path, and the build-required frontmatter keys.

### 7.4 Arithmetic and figures that must recompute or match a locked source

| Statement | Source | Must equal |
|---|---|---|
| Partial retirement drawdown range | §2.E | **20% to 100%** of accrued benefits |
| Number of drawdown events | §2.E | **up to two** |
| Reduction condition | §2.E | at least **10%** of pensionable pay or commitment, held **at least 12 months** |
| Availability date | §2.E | **1 October 2023** |
| Minimum pension age | §2.E | **55** |
| Normal pension ages | §2.E, §2 | **60** (1995), **65** (2008), **State Pension age, or 65 if later** (2015) |
| 2015 accrual | §2 | **1/54th** of each year's pensionable earnings, active revaluation **CPI + 1.5%** |
| 1995 / 2008 accrual, if stated | §2 | **1/80th** plus automatic **3x** lump sum (1995); **1/60th**, no automatic lump sum (2008) |
| Annual allowance and taper | §2.B | AA **£60,000**; threshold income **£200,000**; adjusted income **£260,000**; £1 for every £2; floor **£10,000**; MPAA **£10,000**. All tagged **2026/27** |
| Lump Sum Allowance, if a lump sum block is added | §2.B | **£268,275**; LSDBA **£1,073,100**. **The LTA is abolished from 6 April 2024 and must not be stated as a limit.** |
| Commutation, if stated | 4.4 and NHSBSA at source | **Do not carry 4.4's factors (5.36 / 4.28) or the £1:£12 trade into our page on the strength of a competitor read.** Either verify at NHSBSA or describe the mechanism without numbers. |
| Actuarial reduction percentage | §2.E | **NO FIXED PERCENTAGE MAY BE STATED.** §2.E: "lock the PRINCIPLE (permanent actuarial reduction) and point to the NHSBSA factor table; do NOT lock a fixed % reduction." Quoting a percentage is a BLOCK. |
| Any worked illustration | stated inline | inputs given inline so a checker can recompute without external data, and labelled illustrative |

### 7.5 Statutes and sources to re-verify at source before publication

| What | URL | Why |
|---|---|---|
| Partial retirement rules: 20 to 100 percent, two events, the 10 percent / 12 month condition, and **whether 1995 section members gained access on 1 October 2023 specifically** | NHSBSA / NHS Employers partial (flexible) retirement guidance, current page | §2.E, and the section-6 point that our page is more specific than the locked position. NHSBSA's own member-hub pages return **HTTP 403** to automated fetches; use NHS Employers as the fetchable authority and record the limitation if neither can be read |
| Scheme sections, accrual rates, normal pension ages | https://www.nhsemployers.org/articles/comparing-different-sections-nhs-pension-scheme | §2 |
| Early retirement actuarial reduction factors and ERRBO | NHSBSA / GAD factor guidance, current release | §2.E. **Read to confirm the principle and the location, not to lift a percentage.** |
| Annual allowance, taper, MPAA, LSA, LSDBA, tagged **2026 to 2027** | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates | §2.B |
| Taper trigger wording and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance | §2.B |
| Scheme Pays: the brought-forward limb, no election once all benefits are taken | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA | §2.D. This page asserts the rule; it must be re-read |
| McCloud remedy period, rollback, deferred choice | https://www.nhsemployers.org/articles/mccloud-remedy | §2.A, for the trigger paragraph |
| Lifetime allowance abolition | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 | Needed only if a lump sum block is added |
| Retire and return: the 24-hour break and the 16-hour first-month restriction, **if a retire-and-return block is added** | NHSBSA / NHS Employers retirement guidance | 4.2 is a competitor read, not a source. **These rules must not be stated on the strength of the bma.org.uk page alone.** |

**UNVERIFIED figures, hard rule 4.** `house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **This page must state no figure for any of them.** The topic requires none. The most plausible accidental introduction is a GMC fee in a "what a winding-down doctor still pays" aside; if that appears, the acceptance criterion is that the block instead reads "confirm the current figure at source" and the containing block is named for QA.

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Requirement on this page |
|---|---|
| 1. Arithmetic | Every figure in 7.4 matches its locked source. **No actuarial reduction percentage anywhere.** |
| 2. Statute | Every source in 7.5 re-verified on the day of the rewrite. Any that returns 403 is recorded as a stated limitation and the dependent sentence is softened or removed, never guessed. |
| 3. Links | Zero broken internal links repo-wide. The existing links to `/blog/nhs-pension-scheme-pays-doctors-deadlines`, `/blog/nhs-pension-annual-allowance-complete-guide`, `/blog/nhs-pension-tapered-annual-allowance-calculator`, `/blog/mccloud-remedy-nhs-pension-doctors-explained`, `/blog/gp-partnership-tax-complete-guide`, `/blog/private-practice-tax-nhs-and-private-income`, `/blog/gp-pension-contributions-tax-relief`, `/nhs-pension`, `/blog/nhs-pension-planning`, `/for-gps` and `/contact` all resolve. |
| 4. Coverage | The 24 phrases in 7.1 placed; the checker names any that are not. |
| 5. Equity preservation | The 1 query in 7.2 still matches, and "partial retirement" survives in `metaTitle` and `h1`. |
| 6. Cluster coverage | Same matcher, the 7.1 input. 24 placed, 0 unplaced. |
| 7. Reconciliation balance | 1 already-covered + 24 assigned + 7 deferred-with-reason + 5 encouraged = 37. Must balance. |
| 8. Competitor re-read | All **35** heading themes in 4.6 marked covered, declined-with-reason, or belongs-to-another-page. Undecided count **0**. **No fetch-failed URLs on this page: all 5 competitors were read, so there is no "unknown" bucket and floor 8 is fully decidable here.** |

### 7.7 Named factual requirements the rewrite must meet
1. **No fixed actuarial reduction percentage.** §2.E. This is the page's single most important factual constraint and it is currently honoured. A rewrite chasing "nhs pension early retirement reduction" volume must place the phrase without inventing a number.
2. The 20-to-100 percent range, the two-event limit, the 10 percent reduction and the 12-month hold must all survive.
3. Normal pension ages must stay attached to their sections and must not be flattened into a single figure.
4. The 2015 scheme must never be described as final salary. It is CARE (§2, practical writing rule).
5. If retire-and-return detail is added, the 24-hour break and 16-hour rules must be verified at NHSBSA / NHS Employers, not lifted from 4.2.
6. If a lump sum block is added, no lifetime allowance figure. LSA £268,275 / LSDBA £1,073,100 (§2.B).
7. The claim that 1995 section members gained partial retirement specifically on 1 October 2023 must be re-verified or softened to the §2.E form ("all sections from 1 October 2023").

---

## 8. Stated expectation

**Engine and window.** Bing is the 14 to 28 day read; Google the 28 to 90 day read (§9.6). This topic has **zero peer-winnable volume** and every row is held by bma.org.uk, so the Google expectation is deliberately weak and the Bing expectation is where the change is judged.

**Baseline, with its command.** Bing `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/nhs-pension-partial-retirement-doctors-guide)`, pulled 2026-08-26: **1 named query, 2 impressions, 0 clicks**, average impression position 10.0. Google GSC `searchanalytics.query` dims ['page','query'], 2026-05-28 to 2026-08-26: **0 rows**.

**What we expect.**
- **Bing, 14 to 28 days after deploy:** the named-query count for this URL rises from 1 to **at least 10**, with **at least 4** containing the token "early" (the vocabulary the page does not currently carry) and **at least 1** containing "retire and return". Impressions at least **25**.
- **Bing, 28 days:** at least **1** click on this URL. The page has never had one, so this is a genuine threshold rather than a continuation.
- **Google, 28 to 90 days:** query-level rows move from 0 to **at least 2**. Given every row in the topic is held by bma.org.uk and `medical` Google indexation sits near 16%, **zero Google rows at 90 days is not by itself a failure** on this page, and the expectation is written that way deliberately so it is not read as one later.
- **Phrase coverage is the verdict, not total traffic** (§9.6 point 2). Impressions rising while the 24 named phrases stay absent from the query set is recorded as **drift and a fail**.

**Failure trigger, written as a number, before the work (§9.6 point 3).**
> If Bing impressions on `/blog/nhs-pension-partial-retirement-doctors-guide` are **below 2** in a 28-day window after deploy (that is, no better than the pre-rewrite baseline), or the Bing named-query count for this URL is **below 3** at 28 days, or the equity query `nhs pension partial retirement guide` stops appearing in `GetPageQueryStats` for this URL across two consecutive 28-day windows, **revert** to sha `b3d78c97e768645cca480dd350281ffa68c1faf9` and record the rollback reason on `blog_optimizations`.

**Tracker fields to populate at rewrite time** (`§9.6`, reuse, do not build): one `monitored_pages` row with both engines' baselines above; `blog_optimizations.target_keywords` set to the **24 phrases in 7.1**, not to the one we already carry.

---

## Corrections to the dossier

1. **Topic size disagrees.** Dossier §3 records this topic as **48 keywords, 8,800 volume, 0 peer-winnable, 45 of 48 missing**. The data sheet gives **37 keywords, 6,850 volume, 0 peer-winnable, 36 of 37 missing**. Both dated 2026-08-26 from `dataforseo_competitor_data`. The two agree on the only structural finding that matters here (peer-winnable is zero) and disagree on size by 11 keywords and 1,950 volume. The pack uses the data sheet, per the brief. **Not harmonised. Flagged.** This is the third page in this batch showing the same dossier-versus-sheet divergence, which suggests a single systematic difference in the extraction rule rather than three separate errors, and is worth one look before the next cluster.
2. **Equity figures agree on this page.** Dossier §3 records `B 0c/2i`; the data sheet gives 2 impressions, 0 clicks. **Consistent.** Noting it because the same comparison diverged on both other pages in this batch, which makes the divergence there more likely to be real than a rounding artefact.
3. **The topic is named "nhs pension 1995 scheme" and assigned to a partial-retirement page.** That mismatch is the page's whole problem in one line: the dossier's own topic label does not appear on the page it is assigned to, and the page's own subject ("partial retirement", 70 volume, 1 row) is the smallest thing in the topic. The assignment is defensible under §9.2 step 4 (highest scorer takes the topic, uniquely) and the pack works it as given. It is worth recording that **the topic's centre of mass is early retirement, not partial retirement**, and that a future pass may reasonably decide this deserves two pages rather than a rewrite. **No collapse, no redirect and no URL change is proposed here.**
4. **The largest single intent in this topic is a calculator intent with no calculator anywhere in the SERP.** Eleven calculator phrasings totalling **2,320 volume**, all held by bma.org.uk at positions 7 to 9, on pages that publish factor tables rather than tools. The dossier assigns them to a markdown guide, which cannot satisfy them. **Recorded as a delta:** an NHS early-retirement reduction illustrator in `/calculators/` is the obvious later-pass candidate, and it is constrained by §2.E (no fixed percentage may be locked), which is exactly why nobody has built one. This pack does not instruct the writer to build it.
5. **One competitor page ranks at position 8 for a query it does not answer.** bma.org.uk holds "nhs sick pay after retire and return" (90) at position 8 on `/pensions/retirement/returning-to-work-after-retirement`, and the fetch confirms the page does not address sick pay. This is recorded because the dossier's screening logic treats a bma.org.uk top-10 as a hard SERP; on this row it is a hard SERP with an unsatisfied query behind it, which is a different and more workable thing.
