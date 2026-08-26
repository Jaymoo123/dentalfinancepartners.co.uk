# §9.5 RESEARCH PACK: /blog/qof-income-gp-practice-accounting-explained

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
| Page URL | `https://www.medicalaccounts.co.uk/blog/qof-income-gp-practice-accounting-explained` |
| Cluster / topic | `qof 2026/27`, plus two NO-PAGE topics the dossier prescribes onto this page: `qof 2025/26` (§4 row 6, 17 keywords, 1,310 volume, 1,020 peer-winnable) and `qof register` (§4 row 26, 5 keywords, 840 volume) |
| Lane | `practice_income` (data sheet); the site taxonomy files this under `nhs_practice_income`, `docs/medical/competitor_universe_2026-08-26.md` §3 lane 8 |
| Source file | `Medical/web/content/blog/qof-income-gp-practice-accounting-explained.md` |
| **Rendering** | **Markdown post.** The writer edits the `.md` file directly. Body is raw HTML inside the markdown file (see §6), frontmatter carries `metaTitle`, `h1`, `keyTakeaways`, `summary` and the `faqs` list. |
| Current sha (revert anchor) | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/qof-income-gp-practice-accounting-explained.md` |

**What may NOT change (must come back byte-identical):**

1. `metaTitle`: `QOF Income Explained: How It Pays Your GP Practice`
2. `h1`: `QOF Income Explained: How the Quality and Outcomes Framework Pays Your Practice`
3. `title`: `QOF Income for GP Practices: How It Is Paid, Accounted For and Taxed`
4. The existing H2 sequence, in this relative order, each string unchanged:
   1. `What QOF is (and where it sits in GP funding)`
   2. `How QOF points work`
   3. `Aspiration payments and achievement payments (the two-part cash flow)`
   4. `How QOF income is recognised in the practice accounts`
   5. `How QOF income is taxed`
   6. `Common QOF accounting and tax mistakes`
   7. `How we help GP practices`
5. Every existing H3, every existing paragraph, every existing FAQ question and answer (14 of them), every
   existing key takeaway (5). **Nothing existing is reworded, reordered, shortened or "tidied".**
6. `slug`, `canonical`, `category`, `date`, `image` and the whole `imageCredit` block.

**What MAY change:**

1. **New H2 blocks appended into the body**, carrying the missing phrasings. Place them **immediately before**
   the existing `How we help GP practices` H2, so the seven existing H2s keep their relative order and the
   byte-identical check reads them as an unbroken subsequence. This page has no `Related Reading` block, so it is
   also acceptable to append after `How we help GP practices`; before it reads better.
2. **New FAQ entries appended to the end of the `faqs:` list.** Existing 14 stay in place unchanged.
3. **New key takeaways appended** to `keyTakeaways` (optional; existing 5 stay).
4. New internal links inside the NEW blocks only.

### One flagged exception, for the manager, not for the writer

Two existing sentences are **stale-framed, not wrong**, against `house_positions.md` §3 as re-verified
2026-08-26 (the live GP contract year is now **2026/27**, governed by the GMS Statement of Financial
Entitlements Directions 2026):

- body, under `The value of a point`: "The point value was uprated for 2025/26, but you should not lock any
  specific pounds-per-point figure as permanent."
- FAQ `How much is a QOF point worth?`: "The point value was uprated for 2025/26, but you should treat any
  specific figure as date-tagged..."

EXTEND forbids rewording existing text, and the de-stale duty (§1 of the engine doc) says stale framing gets
fixed. **These two conflict and the writer must not resolve it alone.** Handling: the writer leaves both
sentences byte-identical, writes the current-year (2026/27) framing into the NEW blocks, and **escalates the two
sentences to the manager as a named item**. The manager decides whether a year-tag-only edit is permitted as a
factual-currency exception. If it is not permitted, they stay and the new block carries the correct year.
Recorded here so the decision exists rather than being made silently either way.

### Frozen-list position

This page is **not** on the frozen list. Batch 1 excludes the **16 pages** carrying an armed `monitored_pages`
window to **2026-09-10** (dossier §6), and treats the **3 `status='flagged'` rows** (`__home`,
`gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) as **HOLD**, because a flagged monitor is a
question and not a clearance. Neither list contains this slug, so it is workable now.

**Never propose a collapse, a redirect or a URL change (§5 locked rules). Rewrite in place only. No em-dashes.**

---

## 2. Equity register

*Copied verbatim from the data sheet, including its provenance lines.*

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/qof-income-gp-practice-accounting-explained)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **29** | impressions 34 | clicks 12.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| how is qof payments divided per month | 2 | 1 | 3.0 |
| how does qof pays the gp surgery by nhs | 2 | 1 | 4.0 |
| qof as a percentage of practice income | 1 | 1 | 2.0 |
| does qof come as one big payment or seperate | 1 | 1 | 2.0 |
| what happens to the qof money pot if a practice doesn't earn it | 1 | 1 | 1.0 |
| how does payment for qof work in terms of points | 1 | 1 | 2.0 |
| simple explanation of how qof points are earned in qof | 1 | 1 | 9.0 |
| if a patient is exempted on qof is money still earned by the gp practice | 1 | 1 | 1.0 |
| qof points explained | 1 | 1 | 7.0 |
| how do qof payments work | 1 | 1 | 1.0 |
| why don't gp practice staff get a bonus for qof | 1 | 1 | 2.0 |
| how does qof ork - do you get paid for registers on qof 2026/7 where the amount of points available i 0 | 1 | 1 | 1.0 |
| qof thf the month | 2 | 0 | 6.0 |
| qof acheivement by gp practice | 2 | 0 | 10.0 |
| tutorial for a gp trainee regarding practice payments qof etc | 2 | 0 | 2.0 |
| how much money does qof bring into general practice | 1 | 0 | 1.0 |
| when should we receive our qof achiement money | 1 | 0 | 1.0 |
| ow much is 18points of qof for tirzapetide worth a gp practice of 5500 patients? | 1 | 0 | 5.0 |
| how much gp income is from qof | 1 | 0 | 1.0 |
| who apperoves qof achievement s payments | 1 | 0 | 8.0 |
| qof the a of the month | 1 | 0 | 2.0 |
| qof thfhe month | 1 | 0 | 7.0 |
| qwaf points gp | 1 | 0 | 8.0 |
| how much is 1 qof points worth for 12k practice | 1 | 0 | 2.0 |
| how much are gp's paid for qof points | 1 | 0 | 2.0 |
| qof points income | 1 | 0 | 3.0 |
| information for colleague about qof in gp practie | 1 | 0 | 6.0 |
| do hospital staff get paid for qof | 1 | 0 | 5.0 |
| qof in gp | 1 | 0 | 8.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set

*Copied verbatim from the data sheet, including its provenance lines.*

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
\bqof\b|quality and outcomes framework
```

Keywords in topic: **31** | combined volume **3,680** | peer-winnable volume **1,860** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 3
| **Absent verbatim from this page: 31 of 31. Absent from the whole 105-page corpus: 31.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 480 | 41 | practiceindex.co.uk | no | **no** | no | qof register |
| 320 | 12 | practiceindex.co.uk | no | **no** | no | qof 2026 27 |
| 320 | 6 | practiceindex.co.uk | yes | **no** | no | qof 2026/27 |
| 260 | 6 | practiceindex.co.uk | yes | **no** | no | qof 2025/26 |
| 260 | 4 | practiceindex.co.uk | yes | **no** | no | qof 26 27 |
| 260 | 2 | practiceindex.co.uk | yes | **no** | no | qof 26/27 |
| 210 | 6 | practiceindex.co.uk | yes | **no** | no | qof 25 26 |
| 210 | 5 | practiceindex.co.uk | yes | **no** | no | qof 25/26 |
| 110 | 20 | practiceindex.co.uk | no | **no** | no | gp qof |
| 110 | 51 | practiceindex.co.uk | no | **no** | no | qof gp |
| 110 | 22 | practiceindex.co.uk | no | **no** | no | what is a qof register |
| 110 | 41 | practiceindex.co.uk | no | **no** | no | what is qof register |
| 70 | 20 | practiceindex.co.uk | no | **no** | no | patient on qof register |
| 70 | 18 | practiceindex.co.uk | no | **no** | no | patient on qof registers |
| 70 | 22 | practiceindex.co.uk | no | **no** | no | qof targets |
| 70 | 26 | practiceindex.co.uk | no | **no** | no | why am i on the qof register |
| 50 | 35 | practiceindex.co.uk | no | **no** | no | qof and diabetes |
| 50 | 15 | practiceindex.co.uk | no | **no** | no | qof business rules |
| 50 | 7 | practiceindex.co.uk | yes | **no** | no | qof business rules 25 26 |
| 50 | 7 | practiceindex.co.uk | yes | **no** | no | qof business rules 25/26 |
| 50 | 29 | practiceindex.co.uk | no | **no** | no | qof diabetes |
| 50 | 11 | practiceindex.co.uk | no | **no** | no | qof for dummies |
| 50 | 5 | practiceindex.co.uk | yes | **no** | no | qof indicators 25/26 |
| 50 | 3 | practiceindex.co.uk | yes | **no** | no | qof point value 2025 26 |
| 50 | 3 | practiceindex.co.uk | yes | **no** | no | qof point value 2025/26 |
| 40 | 18 | practiceindex.co.uk | no | **no** | no | qof asthma |
| 30 | 20 | practiceindex.co.uk | no | **no** | no | qof 2024 25 |
| 30 | 20 | practiceindex.co.uk | no | **no** | no | qof 2024/25 |
| 30 | 9 | practiceindex.co.uk | yes | **no** | no | qof 2025 |
| 30 | 5 | practiceindex.co.uk | yes | **no** | no | qof 2025 2026 |
| 30 | 5 | practiceindex.co.uk | yes | **no** | no | qof 2025/2026 |

**Reading note.** Every row is held by one domain, practiceindex.co.uk, a PEER (universe §2a #6). This is the
rarest and best shape in the whole Medical map: **1,860 peer-winnable volume, no gov.uk, no NHS, no BMA, no MSE
anywhere in the topic**, and the incumbent is a practice-manager publisher that writes about clinical indicators
and not about money. There is no unwinnable-authority wall on this topic at all.

---

## 4. Competitor teardown

All 8 competitor URLs listed at the bottom of the data sheet were fetched on 2026-08-26. **Nothing was capped**
(the 12-URL cap did not bind). Every URL is accounted for; none failed to fetch.

Domain classification per `docs/medical/competitor_universe_2026-08-26.md`.

### 4.1 practiceindex.co.uk, 2025/26 QOF summary
`https://practiceindex.co.uk/gp/blog/2025-26-qof-summary/`
**Class: PEER** (universe §2a #6). Holds **17 of the topic's 31 keywords**, more than twice any other URL. This
is the page to beat.

| | |
|---|---|
| Title / H1 | `2025/26 QOF summary` (identical) |
| Word count | ~1,200 |
| H2/H3 | `Summary of the changes`; `Clinical domain`; `Secondary prevention of coronary heart disease (CHD)`; `Cholesterol control and lipid management (CHOL)`; `Hypertension`; `Stroke and transient ischaemic attack (STIA)`; `Diabetes mellitus`; `Asthma`; `Continuing indicators with no changes`; `Clinical domain`; `Atrial fibrillation`; `Secondary prevention of CHD`; `Heart failure`; `Stroke and TIA`; `Diabetes mellitus`; `Asthma`; `COPD`; `Dementia`; `Mental health`; `Non-diabetic hyperglycaemia (NDH)`; `Public Health domain`; `Blood pressure`; `Smoking`; `Vaccination and immunisations`; `Cervical screening`; `Personalised care adjustments`; then chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`, `Company`, `Our services`) |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the indicator-by-indicator change list for 2025/26, organised by clinical condition. States, verbatim
on the page: `The value of a QOF point for 2025/26 is £225.49` and `The total of 564 points, worth a total of
£127,176.36, to the average practice`. Also covers income-protected registers, revised indicator wording and
vaccination fee changes.
**Structure:** a change-log by disease area. Twenty-plus headings, every one a clinical condition. Written for a
practice manager doing the QOF work, not for a partner reading the accounts.
**What it gets wrong or omits:** **it contains no accounting and no tax at all.** Nothing on aspiration versus
achievement timing, nothing on accruals, nothing on the cash crossing two years, nothing on profit share,
nothing on pensionability. It also carries a hard point value with no caveat that the figure is uplifted
annually, which is exactly the staleness trap our house position guards against.
**Consequence for us:** it holds the year-string vocabulary (`qof 2025/26`, `qof 25/26`, `qof point value
2025/26`) and nothing else that matters. We cannot beat it on indicator detail and should not try. We beat it by
carrying the year strings on a page that then answers the money question it does not touch.

### 4.2 practiceindex.co.uk, A practical view of the QOF 26/27 changes
`https://practiceindex.co.uk/gp/blog/a-practical-view-of-the-qof-26-27-changes-by-ceri-gardener/`
**Class: PEER.** Holds 7 of the 31 keywords, including the `qof 26/27` family (position 2 on `qof 26/27`).

| | |
|---|---|
| Title / H1 | `A practical view of the QOF 26/27 changes – By Ceri Gardener` (identical) |
| Word count | ~850 |
| H2/H3 | `What else is new?` then chrome (`Related Posts`, `Leave a Reply`, `Subscribe for blog updates`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`, `Company`, `Our services`) |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** 2026/27 changes from a practice manager's chair: vaccination thresholds on a sliding scale against
practice baseline achievement, new obesity indicators requiring weight-management referral, gestational diabetes
added to the non-diabetic hyperglycaemia domain. Quotes `NDH003` moving from `18 to 20` points, an obesity domain
worth `a combined total of 18 points`, and the historical anchor that original 2004 QOF was `1,050 points with
each one worth an average of £77.50`.
**Structure:** essentially none. **One content heading in 850 words**, at position 2 for a 260-volume term.
**What it gets wrong or omits:** no money, no accounting, no tax, no register explanation, no aspiration or
achievement mechanics. The 18-point obesity figure is the same 18 points BHP (4.6) attributes to the whole QOF
uplift, so the two peers are describing the same change differently and neither is a primary source.
**Consequence for us:** an 850-word single-heading post holds the highest-volume year family in the topic. This
is the single most winnable competitor page in either EXTEND pack.

### 4.3 practiceindex.co.uk, QOF 2023/24 summary
`https://practiceindex.co.uk/gp/blog/qof-2023-24-summary/`
**Class: PEER.** Holds 5 keywords, the `qof 2024/25` and `qof 2023/24` tail.

| | |
|---|---|
| Title / H1 | `QOF 2023/24 summary` (identical) |
| Word count | ~2,200 |
| H2/H3 | `Income protected disease registers`; `Other changes`; `ATRIAL FIBRILATION`; `CORONARY HEART DISEASE`; `HEART FAILURE`; `HYPERTENSION`; `STROKE AND TIA`; `DEMENTIA`; `ASTHMA`; `COPD`; `DEPRESSION (LIKELY CODING CHANGES)`; `MENTAL HEALTH`; `RHEUMATOID ARTHRITIS`; `NON-DIABETIC HYPERGLYCAEMIA (LIKELY CODING CHANGES)`; `VACCINATION AND IMMUNISATION`; `Quality Improvement Activity`; `Workforce and wellbeing (37 POINTS)`; `Optimising demand and capacity in General Practice (37 POINTS)`; then chrome |
| Tables | **Yes**, the only competitor page in this set with tables |
| Calculator | No |
| FAQ block | No |

**Covers:** the 2023/24 change log. States `the value of a QOF point is £213.43` and `635 available QOF points
available`. Introduces **income-protected disease registers** as its lead heading.
**What it gets wrong or omits:** three years stale and still ranking; no money, no accounting, no tax.
**One theme worth taking:** `Income protected disease registers` is the direct answer to our live Bing query
`what happens to the qof money pot if a practice doesn't earn it` (**1 click, average position 1.0**) and to
`how does qof ork - do you get paid for registers on qof 2026/7 where the amount of points available i 0`
(**1 click, position 1.0**). Two of our twelve click-earning queries are register and income-protection
questions and our page says nothing about either.

### 4.4 practiceindex.co.uk, A-Z of QOF
`https://practiceindex.co.uk/gp/blog/a-z-of-qof-by-ceri-gardener/`
**Class: PEER.** Holds 1 keyword, but it is the **structurally most interesting page in the set**.

| | |
|---|---|
| Title / H1 | `A-Z of QOF – By Ceri Gardener` (identical) |
| Word count | ~2,100 |
| H2/H3 | `A – Administration`; `B – Business rules`; `C – Contractor Population Index (CPI)`; `D – Disease registers`; `E – Episodicity`; `F – Funding`; `G – Get going from day 1!`; `H – How am I driving?`; `I – Indicators`; `J – Justify`; `K – Keep your eye on the ball`; `L – Lighten the load`; `M – Mad March rush`; `N – New indicators`; `O – Origins`; `P – Prevalence`; `Q – Quality improvement modules`; `R – Read codes`; `S – Summarise`; `T – Thresholds`; `U – Updates`; `V – Vac and imms`; `W – Window of opportunity`; `X – Xception reporting`; `Y – Your view`; `Z – Zero points`; `Useful resources` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** a glossary of QOF jargon. Defines **disease registers** (maintained even when no indicator is
attached), **exception reporting / personalised care adjustment** (two invitations at least seven days apart),
**prevalence** (register size scales the value of a point), **achievement** (upper threshold for maximum points),
**business rules** (NHS England extraction specifications) and **Contractor Population Index**. Aspiration is
referenced but never formally defined.
**What it gets wrong or omits:** no money mechanics, no accounting, no tax, no point value, and **aspiration is
the one term it fails to define**, which is precisely the term our page owns.
**Directly relevant:** it is the only competitor treatment of `qof business rules` (50 volume, two peer-winnable
phrasings at position 7) and of the register vocabulary. Our page has neither word.

### 4.5 practiceindex.co.uk, The 'new-look' QOF, good or bad for your practice?
`https://practiceindex.co.uk/gp/blog/new-look-qof-good-bad-practice/`
**Class: PEER.** Holds 1 keyword.

| | |
|---|---|
| Title / H1 | `The 'new-look' QOF – good or bad for your practice?` (identical) |
| Word count | ~2,400 |
| H2/H3 | `Quality improvement domain`; `Personalised care adjustment policy`; `Calculating QOF`; `Disease prevalence`; `Further considerations`; `A handy tool` |
| Tables | No |
| Calculator | **Yes**, in the sense that it works a point-value calculation through on the page, and links a tool |
| FAQ block | No |

**Covers:** the 2019/20 reshape. `Calculating QOF` walks the adjustment of a point by practice population and
disease prevalence with a worked example, and `Disease prevalence` explains the adjusted prevalence factor.
**This is the ONLY competitor page in the entire set that shows the arithmetic of a QOF point.**
**What it gets wrong or omits:** 2019/20 vintage, so its figures are six years stale; still no accruals, no tax,
no profit share.
**Consequence:** the market's only worked point calculation is six years old and sits on a practice-management
blog. Our page describes the two adjustments qualitatively and explicitly refuses to invent numbers. A worked
example built on a **stated illustrative rate** (never a published point value, see §7.4) would be the best
version of this anywhere.

### 4.6 bhp.co.uk, 2026/27 GP Contract Update
`https://bhp.co.uk/news-events/blog/2026-27-gp-contract-update/`
**Class: PEER** (universe §2a #15, regional generalist with a healthcare team).

| | |
|---|---|
| Title | `2026/27 GP Contract Update - BHP, Chartered Accountants` |
| H1 | `2026/27 GP Contract Update` |
| Word count | ~1,100 |
| H2/H3 | `Contract Uplift`; `Reallocation of Funding – New Practice-Level GP Reimbursement Scheme`; `ARRS – Expanded GP Recruitment Flexibility`; `QOF – 18 Additional Points and Updated Clinical Indicators`; `Access and Demand Management – New Contractual Requirements`; `Vaccinations`; `Key Action Points for Practices` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the 2026/27 settlement from an accountant's chair. Quotes `The total value of the GP contract will
increase by £485m, taking overall investment to £13.863bn for 2026/27` and `QOF increases by 18 points, with
national funding of around £25m to support the changes`.
**Corroboration, which is the point of listing it:** the £485m and £13,863m figures **match
`house_positions.md` §3 exactly** as re-verified against NHS England on 2026-08-26. That is two independent
sources agreeing, so those two figures are safe to use. The `18 points` and `£25m` figures are **BHP's alone**
and are not in house positions; treat them as unverified until read at NHS England or the SFE 2026.
**What it gets wrong or omits:** it is a contract-update news post, not a QOF explainer. No mechanics, no
accounting, no register, no point value.
**The strongest single signal in this pack:** the only accountant in the set writing about QOF 2026/27 gives it
**one H2 in a contract round-up**. Nobody has written the accountant's QOF page. We have, and it does not carry
the words.

### 4.7 bhp.co.uk, 2025/26 Proposed GP Contract Updates Announced
`https://bhp.co.uk/news-events/blog/2025-26-proposed-gp-contract-updates-announced/`
**Class: PEER.**

| | |
|---|---|
| Title | `2025/26 Proposed GP Contract Updates Announced - BHP, Chartered Accountants` |
| H1 | `2025/26 Proposed GP Contract Updates Announced` |
| Word count | ~350 |
| H2/H3 | `Key Financial Changes` (one heading only) |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the 2025/26 proposals, £889m core funding increase. QOF figures quoted: `141 points (totalling an
additional £198m) will be added to the nine CVD indicators` and `32 indicators (worth 212 points) will be
permanently retired`.
**What it gets wrong or omits:** it is explicitly about **proposals**, and the word "proposed" is in the title of
a page still ranking a year later. This is the Bill-versus-enacted drift pattern (§7 of the engine doc) in
contract form. **Do not cite a "proposed" figure as settled.**

### 4.8 aisma.org.uk, Response to 2026/27 GP contract changes
`https://aisma.org.uk/2026/02/24/response-to-2026-27-gp-contract-changes/`
**Class: UNWINNABLE AUTHORITY / NON-RIVAL** (universe §2b: AISMA is "the specialist medical accountants'
association. Gatekeeper/directory, not a rival. **A citation and membership target, not a rank target**").

| | |
|---|---|
| Title / H1 | `Response to 2026/27 GP contract changes` (identical) |
| Published | 24 February 2026 |
| Word count | ~350 |
| H2/H3 | **None.** The heading-level markup on the page is post navigation, not content headings. |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** AISMA's press response, attributed to adviser Andy Pow. Argues `A cash uplift of 3.6% is unlikely to
leave practices with a significant funding increase`, and objects to ringfencing £292m of Capacity and Access
funding previously distributed at PCN level.
**What it gets wrong or omits:** it is a statement, not guidance. No QOF mechanics at all.
**How to use it:** as a **citable position**, not a competitor. The 3.6% cash growth figure it disputes is the
same 3.6% in `house_positions.md` §3 and NHS England's own long-read, so it corroborates the number while
disagreeing with its adequacy. Quoting a named AISMA adviser is an E-E-A-T asset available to almost nobody else.

### 4.9 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

Every theme present on any competitor page above, minus what our page already covers (§6). §9.9 floor 8 requires
**zero undecided themes**. It is zero: 20 themes, 20 decisions.

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | QOF year-string identity: `qof 2026/27`, `qof 26/27`, `qof 25/26` etc (4.1, 4.2) | **COVER** | 8 of the 31 keywords are pure year strings, 1,860 volume, and they are the peer-winnable core. New H2 written around the current year, with prior years named in prose. |
| 2 | **Disease registers, what they are and who is on one** (4.3, 4.4) | **COVER** | `qof register` family is 5 keywords / 840 volume and is a dossier NO-PAGE topic prescribed onto this page (§4 row 26). Also answers 2 of our 12 click-earning Bing queries. |
| 3 | **Income-protected registers, what happens when points are withdrawn** (4.3) | **COVER** | Directly answers `what happens to the qof money pot if a practice doesn't earn it` (1 click, position 1.0) and the 2026/7 zero-points register query (1 click, position 1.0). Nobody else pairs it with the accounting consequence. |
| 4 | Prevalence and the adjusted prevalence factor (4.4, 4.5) | COVERED ALREADY | Existing H3 `The two practice adjustments` covers it well. Do not touch. Add the word `prevalence` in the register block for phrase coverage. |
| 5 | **Personalised care adjustment / exception reporting** (4.4, 4.5) | **COVER** | Answers `if a patient is exempted on qof is money still earned by the gp practice` (**1 click, position 1.0**), which our page does not address at all. Two invitations seven days apart is 4.4's detail; verify at source before stating. |
| 6 | **QOF business rules** (4.4) | **COVER, briefly** | 2 peer-winnable phrasings at position 7. One paragraph naming what the business rules are and where they live. |
| 7 | **Thresholds, lower and upper** (4.4) | **COVER** | `qof targets` (70 volume). Also the mechanical basis for the achievement estimate our accruals section already relies on, so it strengthens existing depth rather than diluting it. |
| 8 | Indicator-by-indicator clinical change log (4.1, 4.2, 4.3) | **DECLINE** | Clinical content, annually obsolete, and practiceindex is better placed to maintain it. Declined with reason: maintaining a change log we cannot keep current is a staleness liability, and §9.3 says the plain-language layer is added above our depth, not a clinical layer beside it. |
| 9 | Named condition keywords: `qof and diabetes`, `qof diabetes`, `qof asthma` (4.1, 4.3) | **COVER as examples only** | 140 combined volume. Name diabetes and asthma as illustrative indicator areas inside the register or threshold block. Do not build condition sections. |
| 10 | Total points available in a year (4.1: 564, 4.3: 635) | **COVER as a mechanism, not a figure** | Existing prose already says the total is reviewed annually. New block states where to confirm it. **Do not copy 564 or 635.** |
| 11 | **QOF point value with a year tag** (4.1: £225.49, 4.3: £213.43, 4.2: £77.50 in 2004) | **COVER the PHRASE, NEVER the FIGURE** | `qof point value 2025 26` and `qof point value 2025/26` are peer-winnable at position 3 and must appear as phrases. `house_positions.md` §3 marks the QOF point value **UNVERIFIED**. See §7.4: the block frames it as "confirm the current figure at source" and names the SFE 2026. |
| 12 | Worked point-value calculation (4.5) | **COVER, with illustrative inputs** | The only worked example in the market is six years old. Ours uses a labelled hypothetical rate, never a published one. |
| 13 | Contractor Population Index (4.4) | **COVER, one line** | The formal name for the list-size adjustment our page already describes qualitatively. Naming it is free precision. |
| 14 | 2026/27 contract uplift, £485m to £13,863m, 3.6% cash growth (4.6, 4.8) | **COVER** | Corroborated by `house_positions.md` §3 and NHS England directly. Safe, current, and it is the sentence that makes the page read as 2026/27. |
| 15 | QOF gains 18 points for 2026/27 with ~£25m funding (4.6) | **COVER only if verified** | BHP-only figure. Verify at NHS England's 2026/27 long-read or the SFE 2026 before stating; otherwise say "QOF points were added for 2026/27, confirm the current total at source". |
| 16 | 2025/26 proposals: 141 CVD points, £198m, 32 indicators / 212 points retired (4.7) | **DECLINE** | Proposal-stage figures on a page still titled "Proposed". Bill-versus-enacted drift. Declined with reason. |
| 17 | Quality improvement modules / domains (4.3, 4.4, 4.5) | **DECLINE** | Clinical programme design, not income accounting. Named so the decline is recorded. |
| 18 | Vaccination and immunisation thresholds and fees (4.1, 4.2, 4.6) | ELSEWHERE | `/blog/enhanced-services-gp-practice-income-tax` and the item-of-service side. Link only. |
| 19 | Read codes, coding discipline, "mad March rush" (4.4) | **DECLINE** | Practice-operations advice. We are the accountant, not the practice manager, and the register keeps us honest about that boundary. |
| 20 | Contract-wide changes: ARRS, access requirements, practice-level GP reimbursement (4.6, 4.8) | ELSEWHERE | `/blog/pcn-funding-network-contract-des-explained` and `/blog/how-gms-funding-works-global-sum-carr-hill-explained`. Link only. |

---

## 5. Whitespace

What no competitor covers, quotably.

1. **Not one competitor page in this set contains any accounting.** Eight pages, roughly 10,000 words of QOF
   content between them, and the words "accrual", "debtor", "profit share" and "taxable" appear on none of them.
   The market's QOF corpus is written by practice managers about clinical indicators and by accountants about
   contract news. **The QOF income accounting page does not exist anywhere except ours**, and ours is written
   without the words the market types.
2. **Nobody explains where QOF money goes after it lands.** Our live Bing query `why don't gp practice staff get
   a bonus for qof` (**1 click, position 2.0**) is a question about profit share, and `do hospital staff get paid
   for qof` (position 5.0) is a scope question. Both are answered by one sentence about QOF being partnership
   trading income allocated under the profit-sharing agreement, which our page already contains and never frames
   as an answer to that question.
3. **Nobody prices QOF as a share of practice income.** `qof as a percentage of practice income` (**1 click,
   position 2.0**), `how much money does qof bring into general practice` (position 1.0), `how much gp income is
   from qof` (position 1.0). Three queries, position 1 to 2, no competitor page addressing it and no answer on
   ours. This is answerable structurally (QOF sits alongside the Global Sum, is voluntary, and its size depends
   on points achieved, list size and prevalence) **without stating a national point value**, which is the only
   way it can be answered under the UNVERIFIED constraint.
4. **The payment calendar.** `how is qof payments divided per month` (**1 click, position 3.0**), `does qof come
   as one big payment or seperate` (**1 click, position 2.0**), `when should we receive our qof achiement money`
   (position 1.0), `qof thf the month` and its three typo variants. Our page explains aspiration monthly and
   achievement at year-end, and never presents it as a calendar. No competitor has one at all.
5. **Who approves the payment.** `who apperoves qof achievement s payments` (position 8.0). The CQRS to PCSE to
   ICB chain. Nobody in the set covers it and we own the neighbouring page that does
   (`/blog/gp-practice-income-pcse-statement-reconciliation`).
6. **QOF for a GP trainee or a new partner.** `tutorial for a gp trainee regarding practice payments qof etc`
   (2 impressions, position 2.0), `information for colleague about qof in gp practie`, `qof for dummies` (50
   volume, held at position 11). A named primer block would take all three.
7. **The register questions from the patient side.** `why am i on the qof register` (70 volume), `patient on qof
   register` (70), `patient on qof registers` (70). 210 volume of patient-side intent that practiceindex holds at
   positions 18 to 26. We can answer it in two sentences inside the register block and it costs nothing.

### KEEP, explicitly

Per §9.3 the specialist layer is never traded away. These are this page's differentiators and stay exactly as
they are:

- **The two-year cash-crossing explanation** with the Year 1 / Year 2 worked sequence. The clearest treatment of
  QOF timing anywhere in the set, and no competitor attempts it. **KEEP.**
- **The accruals treatment**: recognise expected achievement, carry a debtor, offset aspiration received.
  **KEEP.**
- **The transition-year trap** (first year on accruals after years on cash looks like a jump in earnings, and it
  is not). Genuinely expert, entirely unique. **KEEP.**
- **Partner-change fairness**: a partner joining or leaving mid-year takes their share of QOF accrued to the
  date, not the lumpy cash. **KEEP.**
- **The tax treatment**: ordinary trading income, profit share, Class 4 NIC, SA800 and SA104, no special QOF
  regime, taxed when earned. Aligned with `house_positions.md` §1 and §8. **KEEP.**
- **The pension line**: QOF feeds NHS-derived profit and is pensionable for a Type 1 partner via the Annual
  Certificate; a company cannot hold a GMS/PMS contract and company income is not pensionable. Aligned with §2.C.
  **KEEP.**
- **The refusal to invent a point value or a points total.** That is not timidity, it is the house position.
  **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/qof-income-gp-practice-accounting-explained.md`, read 2026-08-26.

| | |
|---|---|
| Word count | **4,476** (`wc -w` on the source file, includes frontmatter) |
| `metaTitle` | `QOF Income Explained: How It Pays Your GP Practice` (49 characters) |
| `h1` | `QOF Income Explained: How the Quality and Outcomes Framework Pays Your Practice` |
| `title` | `QOF Income for GP Practices: How It Is Paid, Accounted For and Taxed` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| FAQ entries | 14 |
| Key takeaways | 5 |
| Tables | **None** |
| Calculator | None |
| Rendering | Markdown file whose body is **raw HTML**. Write new blocks as raw HTML to match. |

**Current heading list, in order:**

- H2 `What QOF is (and where it sits in GP funding)`
- H2 `How QOF points work`
  - H3 `Indicators and the points total`
  - H3 `The value of a point`
  - H3 `The two practice adjustments`
- H2 `Aspiration payments and achievement payments (the two-part cash flow)`
  - H3 `Aspiration payments`
  - H3 `Achievement payments`
  - H3 `Why the cash crosses two years`
- H2 `How QOF income is recognised in the practice accounts`
  - H3 `Accrual, not just cash`
  - H3 `Estimating year-end achievement`
  - H3 `Why it matters for partners`
- H2 `How QOF income is taxed`
- H2 `Common QOF accounting and tax mistakes`
- H2 `How we help GP practices`

**Blunt read.** This is the best QOF accounting page on the UK web and **31 of 31 market phrasings are missing
from it**. Nothing else in the Medical dossier has that shape as cleanly.

Specifically:

1. **The word "register" appears nowhere on the page.** Not once. The register family is 840 volume and two of
   our own twelve click-earning Bing queries are register questions.
2. **No year string anywhere.** The page never writes `2026/27`, `2025/26`, `26/27` or `25/26`. It says "the
   current Statement of Financial Entitlements" and "reviewed each year". That is correct behaviour for
   durability and it is why 1,860 of peer-winnable volume passes it by. The fix is not to date-stamp the whole
   page, it is one clearly-scoped current-year block that can be re-cut annually.
3. **"Quality and Outcomes Framework" is spelled out, "QOF" is used throughout, and neither `gp qof` nor `qof gp`
   nor `qof in gp` appears as a phrase.** Same failure mode as the Property SDLT specimen in §9.5.
4. **No thresholds, no exception reporting / personalised care adjustment, no business rules, no income
   protection.** Four vocabulary families entirely absent, all of them answering queries we already rank at
   position 1 to 2 for.
5. **No tables.** Aspiration versus achievement, the two practice adjustments, and the payment calendar are all
   natural tables and all currently prose.
6. **Two stale-framed sentences**, both saying the point value "was uprated for 2025/26" while the live contract
   year is 2026/27 (`house_positions.md` §3). Neither is factually false; both are last-year framing. See §1 for
   the escalation, which the writer must not resolve alone.
7. **Nothing on the page contradicts `house_positions.md`.** Checked against §3 (QOF is voluntary, sits alongside
   Global Sum, no single national per-patient value, figures uplifted annually, never UDAs), §1 (partner taxed on
   profit share not drawings, SA800/SA104), §8 (Class 4 NIC) and §2.C (Type 1 Annual Certificate, company income
   not pensionable). All correct. The page also correctly states no QOF point value, which is the UNVERIFIED
   figure.
8. **It is not thin.** 4,476 words, 14 FAQs, correct throughout. The gap is vocabulary, not quality.

---

## 7. Deterministic acceptance criteria

### 7.1 Phrases that MUST appear verbatim (case and punctuation normalised)

**31 phrases.** Every row of section 3, because all 31 are `On page = no`. Ordered **peer-winnable first, then
volume**, per §9.3 as narrowed by owner decision 21 (peer-winnable sequences, never excludes).

**Tier A, peer-winnable (12 phrases, 1,860 volume). Place these first.**

| # | Phrase | Vol | Best pos |
|---|---|---|---|
| 1 | `qof 2026/27` | 320 | 6 |
| 2 | `qof 2025/26` | 260 | 6 |
| 3 | `qof 26 27` | 260 | 4 |
| 4 | `qof 26/27` | 260 | 2 |
| 5 | `qof 25 26` | 210 | 6 |
| 6 | `qof 25/26` | 210 | 5 |
| 7 | `qof business rules 25 26` | 50 | 7 |
| 8 | `qof business rules 25/26` | 50 | 7 |
| 9 | `qof indicators 25/26` | 50 | 5 |
| 10 | `qof point value 2025 26` | 50 | 3 |
| 11 | `qof point value 2025/26` | 50 | 3 |
| 12 | `qof 2025` / `qof 2025 2026` / `qof 2025/2026` | 30 each | 9 / 5 / 5 |

*(row 12 is three separate phrases; the phrase count of 31 counts them individually)*

**Tier B, not peer-winnable, ordered by volume (19 phrases).**

`qof register` (480) · `qof 2026 27` (320) · `gp qof` (110) · `qof gp` (110) · `what is a qof register` (110) ·
`what is qof register` (110) · `patient on qof register` (70) · `patient on qof registers` (70) · `qof targets`
(70) · `why am i on the qof register` (70) · `qof and diabetes` (50) · `qof business rules` (50) · `qof diabetes`
(50) · `qof for dummies` (50) · `qof asthma` (40) · `qof 2024 25` (30) · `qof 2024/25` (30)

**Countable test:** **31 of 31 present**. Any absent phrase is a named BLOCK.

**Placement guidance, not a gate:**
- The year strings live in one current-year H2 (`QOF 2026/27: what changed, and what it means for the accounts`
  or similar) with prior years named in prose so `qof 25/26` and `qof 2024/25` land naturally.
- `qof point value 2025 26` and `qof point value 2025/26` should be the **question** of a new FAQ whose **answer**
  refuses the figure and points at the SFE 2026. The phrase must be present; the number must not.
- The register family lives in one register H2 that answers both the practice-side and patient-side questions.
- `qof for dummies` is a phrase, not a tone instruction. Place it in an FAQ question, not in a heading.

### 7.2 Equity preservation (§9.9 floor 5)

**All 29 Bing queries in section 2 must still match** in `metaTitle`, `h1`, an H2, an FAQ or body prose after the
change. Google contributes 0 rows, so the combined equity set is **29**.

**Countable test:** 29 of 29 matchable. Run
`python scripts/track2_query_coverage.py --slug qof-income-gp-practice-accounting-explained --json`.

Note the typo cluster (`qof thf the month`, `qof thfhe month`, `qof the a of the month`, `qwaf points gp`,
`qof acheivement by gp practice`, `ow much is 18points...`). The matcher normalises; these are protected by the
underlying terms staying present, and no existing text is being removed, so they cannot be lost by this change.

### 7.3 EXTEND byte-identity

Diff the pre and post files. The following must be byte-identical:

- `metaTitle: "QOF Income Explained: How It Pays Your GP Practice"`
- `h1: "QOF Income Explained: How the Quality and Outcomes Framework Pays Your Practice"`
- `title: "QOF Income for GP Practices: How It Is Paid, Accounted For and Taxed"`
- `metaDescription`, `slug`, `canonical`, `category`, `date`, `image`, `imageCredit`, `altText`
- All 7 existing H2 strings, in their existing relative order
- All 9 existing H3 strings
- All 14 existing FAQ question and answer strings
- All 5 existing `keyTakeaways` strings

**Countable test:** `git diff` shows **only additions**. Deletion count must be **0**, unless the manager has
explicitly cleared the year-tag escalation in §1, in which case the permitted deletion count is exactly the two
named sentences and the diff is reviewed line by line.

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

The existing page contains **no arithmetic**. If a new block adds a worked example, every figure must be
re-derived from stated inputs by `arithmetic_recomputed[]`.

**BANNED FIGURES on this page. None of these may be asserted:**

| Banned | Why | What the page says instead |
|---|---|---|
| Any **QOF point value** in pounds (competitors publish £225.49 for 2025/26, £213.43 for 2023/24, £77.50 for 2004) | `house_positions.md` §3 `> VERIFY`: the QOF point value is **UNVERIFIED at primary source**. The SFE 2026 PDF carries it but did not render on fetch. | The new block must frame it as **"confirm the current point value in the GMS Statement of Financial Entitlements Directions 2026"**. Name the block: this is the FAQ answering `qof point value 2025/26`. |
| Any **Global Sum per weighted patient** figure | Same §3 `> VERIFY`. Secondary commentary suggests ~£130 for 2026/27 with an out-of-hours deduction near 4.7%; **not read at source, must not be published**. | "uplifted for 2026/27, confirm the current figure in the Statement of Financial Entitlements Directions 2026". |
| Any **GMC annual retention fee** | `house_positions.md` §8 and Verification log: **UNVERIFIED**, GMC returns HTTP 403 to automated fetch. Not otherwise relevant to this page. | Not applicable; listed for completeness of the ban. |
| **564** or **635** total QOF points as a current figure | Competitor-sourced, year-specific, and the total is reviewed annually. | "the annual points maximum is set nationally and reviewed each year; confirm the current total at source". |
| **18 points / £25m** for the 2026/27 QOF uplift | BHP-only (4.6), not in house positions, not verified at NHS England. | State only if verified at source per 7.5; otherwise omit the numbers. |

**PERMITTED and corroborated figures** (house positions §3 AND BHP 4.6 AND AISMA 4.8 agree):
`£485 million` uplift, total contract value `£13,863 million`, `3.6% cash growth or 1.4% real terms growth`,
2026/27. These are the numbers that make the new block read as current. Cite NHS England as the source.

If a worked example is written, its inputs must be **explicitly labelled illustrative**, for example "assume a
point is worth £X, and check the current figure at source". The arithmetic is then checkable and the figure is
not an assertion.

**Countable test:** count of banned-figure assertions on the page = **0**.

### 7.5 Statute, regulation and source re-verification

| Claim | Source URL to re-verify |
|---|---|
| 2026/27 is the live contract year; £485m uplift; £13,863m total; 3.6% cash / 1.4% real | https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ |
| QOF points added for 2026/27, and the current points total and point value | https://assets.publishing.service.gov.uk/media/69cbe5032d120d9d5ec0f352/general-medical-services-statement-of-financial-entitlements-directions-2026.pdf (SFE Directions 2026) |
| PMS/APMS parity of the 2026/27 changes | https://www.england.nhs.uk/long-read/implementing-the-2026-27-gp-contract-changes-to-personal-medical-services-and-alternative-provider-medical-services-contracts/ |
| GMS contract regulations underpinning QOF as a contractual entitlement | https://www.legislation.gov.uk/uksi/2015/1862 (SI 2015/1862) |
| Current QOF indicator set, registers, thresholds, business rules, personalised care adjustment | NHS England QOF guidance for 2026/27 (link from the 2026/27 contract long-read) and NHS Digital / NHS England QOF business rules |
| QOF achievement publication (register sizes, prevalence, achievement) | NHS England / NHS Digital annual QOF achievement publication |
| Partnership taxation: SA800, SA104, taxed on profit share not drawings | `house_positions.md` §1; ITTOIA 2005 and TMA 1970 machinery per §1 statutory hooks |
| Class 4 NIC 6% / 2% for 2026/27, if any NIC figure is restated | https://www.gov.uk/self-employed-national-insurance-rates |
| Type 1 Annual Certificate of Pensionable Profits, 28 February a year in arrears | https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate |
| A company cannot hold a GMS/PMS contract and company income is not NHS-pensionable | `house_positions.md` §2.C |

**Countable test:** every external factual claim in the new blocks maps to a row above with a fetch date. Count
of unverified claims = 0. **Personalised care adjustment mechanics (the "two invitations at least seven days
apart" detail from 4.4) must be verified in the current QOF business rules before it is stated.** A competitor
blog is not a source.

### 7.6 The four existing floors (§4) plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug qof-income-gp-practice-accounting-explained` | Gate bar met; 0 covered queries lost |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every worked figure re-derived from labelled illustrative inputs, or the array is empty |
| 3. Statute verified at source | `statute_checks[]` | Every row in 7.5 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; new links resolve via `slug_resolver.py` |
| 5. Equity preservation | 7.2 | 29 of 29 Bing queries still match |
| 6. Cluster coverage | 7.1 | **31 of 31** assigned phrases placed |
| 7. Reconciliation balance | Dossier §10 | Already BALANCED. This page's 31 keywords plus the 17 from NO-PAGE `qof 2025/26` and 5 from `qof register` all sit inside the harvested 3,220. Attaching two NO-PAGE topics to this page moves them from the `NO-PAGE` bucket to `assigned`; **record the move so the ledger still balances**. |
| 8. Competitor re-read | 4.9 | 20 themes, 20 decisions, **0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) in the new copy.
2. **No new internal link inside any existing paragraph.**
3. **Do not touch any frozen page** (dossier §6, 16 slugs to 2026-09-10) and do not treat
   `gp-accounting-guide` or `nhs-pension-scheme-pays-doctors-deadlines` as available; both are `status='flagged'`
   and are HOLD. Contextual links to their live URLs are fine.
4. **No collapse, no redirect, no URL change.**
5. **Never use UDAs, dental bands or any dental framing** (`house_positions.md` §3: doctors do not use UDAs).
6. **Never state that QOF is compulsory.** It is voluntary, per §3 and the existing page.

---

## 8. Stated expectation

**Baseline, from the pull of 2026-08-26** (`GetPageQueryStats` for this URL, 90-day window): **29 named queries,
34 impressions, 12 clicks**, best average impression position 1.0. Google query-level rows: **0**. The dossier
records the page-level Bing figure as **12 clicks from 59 impressions**; the 34 above is the sum of *named* query
rows only. Both stated so a later read compares like with like.

Pro-rated to 28 days: **12 / 90 x 28 = 3.7 clicks**, **34 / 90 x 28 = 10.6 named-query impressions**.

Note the click-through shape: **12 clicks from 34 impressions is a 35% CTR**, driven by nine queries sitting at
average position 1.0 to 3.0. This page converts impressions extremely well and simply is not being shown for the
phrases the market types. That is the whole thesis of this pack.

### The read at 14 to 28 days, Bing

1. **Named-phrase impressions.** At least **10 of the 31** phrases in section 7.1 return at least one Bing
   impression for this URL in the 28-day window, and **at least 4 of those 10 come from Tier A** (the
   peer-winnable year strings). Today the count is 0 of 31. Per §9.6, total impressions rising while the 31 stay
   at zero is DRIFT and is recorded as a **FAIL**, not a pass.
2. **Clicks.** Bing clicks on this URL in a rolling 28-day window at or above **5** (baseline 3.7).
3. **Impressions.** Named-query impressions in a rolling 28-day window at or above **20** (baseline 10.6). The
   topic's peer-winnable volume is 1,860 against an 850-word single-heading incumbent (4.2), so a near-doubling
   is a conservative ask rather than an aggressive one.

### The read at 28 to 90 days, Google

4. **Any query-level Google row at all.** Today: 0. Target: **at least 3 query-level rows** for this URL in GSC
   by day 90, and at least one of them from the year-string or register family. Three rather than one, because
   unlike the PCSE page this topic has **no unwinnable-authority domain anywhere in it**: the entire keyword set
   is held by a single peer publisher, and 12 of the 31 phrases are peer-winnable at positions 2 to 7.

### Failure trigger (§9.6, written as a number, before the change)

> **If Bing clicks on `/blog/qof-income-gp-practice-accounting-explained` fall below 3 in any rolling 28-day
> window between deploy and deploy+56 days, revert to
> `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/qof-income-gp-practice-accounting-explained.md`.**

Second trigger, on CTR rather than volume, because this page's value is its conversion rate:

> **If the named-query CTR on this URL falls below 20% (against a 35% baseline) across a full 28-day window while
> impressions are flat or up, the new blocks are drawing the wrong intent and are reviewed before any further
> change.**

Third trigger, on the equity gate:

> **If any of the 29 named Bing queries in section 2 stops returning an impression for this URL for two
> consecutive 28-day windows, that query is a named BLOCK and is investigated before any further change.**

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day Bing read.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **31 missing
phrases from section 7.1**, not with the 29 queries the page already ranks for.

---

## Corrections to the dossier

1. **The dossier's keyword count for this topic is a floor, not a total.** Dossier §3 gives topic `qof 2026/27`
   **7 keywords, 7 of 7 missing**. The data sheet's regex (`\bqof\b|quality and outcomes framework`) returns
   **31 keywords, 31 missing**, 3,680 combined volume. The dossier count reflects the consensus-node clustering
   (competitor URLs holding 3+ in-family keywords, merged at 30% overlap), which by construction fragments a term
   family across several topic rows: this page's dossier row (7), NO-PAGE row 6 `qof 2025/26` (17) and NO-PAGE
   row 26 `qof register` (5) sum to 29, close to but not equal to the pack's 31. **Same finding on the PCSE pack.
   Anywhere the dossier's per-topic keyword counts are quoted as totals, they are undercounts.** No dossier edit
   is needed; the clustering is doing what §9.2 step 2 specifies. The correction is to the reading, not the data.

2. **Two dossier NO-PAGE prescriptions land on this page and should be recorded as assigned.** §4 row 6
   (`qof 2025/26`, 17 keywords, 1,310 volume, 1,020 peer-winnable, "Section on
   /blog/qof-income-gp-practice-accounting-explained") and §4 row 26 (`qof register`, 5 keywords, 840 volume,
   "Section on the QOF page"). Both are inside this pack's acceptance criteria. **The reconciliation ledger
   (§9.9 floor 7) must move those 22 keywords from `NO-PAGE` to `assigned` when this page ships**, or the balance
   is preserved only by accident.

3. **The dossier's peer-winnable figure for this topic understates the prize.** §3 gives the `qof 2026/27` row
   840 peer-winnable. The data sheet's wider regex gives **1,860 peer-winnable across 12 phrases at positions 2
   to 7**, all held by a single peer publisher with no gov.uk, NHS or BMA presence anywhere in the topic. On a
   map where 33% of head-term SERP real estate is structurally unwinnable (universe §2b), **this is the cleanest
   peer-winnable topic in the Medical dossier and the dossier does not say so.** Worth surfacing to the owner
   when the batch is sequenced.
