# §9.5 RESEARCH PACK: /blog/maternity-pay-and-maternity-allowance-for-doctors

Assembled 2026-08-26 from the persisted harvest `dataforseo_competitor_data` (`site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 rows), `docs/medical/cluster_dossier_2026-08-26.md`, `docs/medical/competitor_universe_2026-08-26.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`, `docs/medical/packs/BATCH2_INDEX.md`, and live competitor fetches recorded in section 4. Preparation only. The pack does not write the page.

**No new paid API calls. $0.00 additional DataForSEO spend.** Every number below carries the query or command that produced it. Nothing under `Medical/web/` was edited; the corpus was read only.

**The one thing a reader of this pack must take away first.** This cluster's headline volume is **244,120**. **227,310 of it, 93.1%, is employment-pay vocabulary we cannot and should not chase.** The addressable accountancy slice is **16,810 volume across 61 keywords**. Section 3 splits the two halves and shows the arithmetic. Section 8 states plainly that the 244,120 figure is **not** the target and that any later read against it would be meaningless.

---

## 1. Target and permission level

**CONSTRAINT FIRST.**

| Field | Value |
|---|---|
| URL | `/blog/maternity-pay-and-maternity-allowance-for-doctors` |
| Cluster / topic | maternity allowance · dossier §4 NO-PAGE row 12 · batch-2 item 4 |
| Grade | **NET-NEW.** The page does not exist. There is no source file, no equity and no revert-to-sha path |
| Source file to be created | `Medical/web/content/blog/maternity-pay-and-maternity-allowance-for-doctors.md` |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the whole `faqs` array live in frontmatter and are separate editable surfaces from the body |
| Repo sha at pack build | `7be12b118` (`git rev-parse HEAD`, 2026-08-26). Batch-2 index records `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf` at its own build time; the difference is the estate-wide hero-image backfill and is unrelated to this page |
| Revert path | **Deletion of a single new file.** `git rm Medical/web/content/blog/maternity-pay-and-maternity-allowance-for-doctors.md`. Nothing else is touched, so there is no partial-revert case |

**NET-NEW = full authorial freedom on structure, bounded by the ownership map in this section and by the scope ruling in section 5.** `metaTitle`, `title`, `h1`, every `<h2>` and `<h3>`, the body, `keyTakeaways`, `summary` and the `faqs` array are all the writer's. There is no equity to preserve (section 2), so no heading is frozen.

**What may NOT be done.**
- No page under `Medical/web/` may be edited. This page is created; nothing else is touched. Other agents are working concurrently in `Medical/web/content/`.
- No collapse, no redirect, no `DUPLICATE_REDIRECTS` entry (`language_spec` K4, estate standing rule).
- Frontmatter keys the build depends on must be present and correct: `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (**exactly one key, never duplicated**), `altText`, `schema`.
- **No figure may be stated for the three UNVERIFIED items** (`house_positions.md` §8, §3.A, and the GMC entry in the verification log): the **GMC annual retention fee**, the **Global Sum per weighted patient** in any 2027/28 context, and the **QOF point value**. Rule F5, hard fail. This topic requires none of them, so the expected outcome is absence.

**Frozen-list position.** This page does not exist, so it cannot be frozen. **But two of the three pages that could otherwise have hosted this material as a section are frozen**, which is decisive for section 5 and is stated here so the writer does not try to route around it:

```sql
select slug,status,rewrite_date,monitor_until,rewrite_type from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- run 2026-08-26 via `python scripts/_q.py`; 19 rows returned
```

`gp-payroll-services` (active, `monitor_until` 2026-09-10), `locum-doctor-tax-complete-guide` (active, 2026-09-10) and `nhs-pension-for-locums-form-a-form-b` (active, 2026-09-10) are all inside live measurement windows. This confirms the batch-2 index §6 correction 3: the correct frozen test is `monitor_until > now()` with no status predicate, and it returns 19 rows.

### The ownership map rows that bind this page

Reproduced from `BATCH2_INDEX.md` §4, which is binding on every writer in this batch. This exists because in batch 1 the Scheme Pays two-limb deadline landed on seven of twelve pages in near-identical wording, none of them the Scheme Pays page (binding rule V3).

**Rows this page OWNS. Nobody else in the batch may explain these.**

| # | Shared fact | Scope note for this writer |
|---|---|---|
| **O11** | **SMP versus Maternity Allowance: eligibility, the small-earnings route, which one a self-employed or locum GP gets** | This is the page's spine. Item 7 (nurses) gets one sentence and a link |
| **O12** | **Pension accrual during maternity and other statutory leave** | Items 3 (opt out) and 5 (adjusted net income) get one sentence and a link. See the competitive warning at 4.6: the BMA holds this at ~3,000 words with role-segmented headings, and it is the strongest single competitor page in the addressable half |
| **O13** | **GP practice reimbursement for parental leave cover under the Statement of Financial Entitlements** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) gets one sentence and a link. **Nobody in the harvest holds this at all.** It is the only uncontested ground in the cluster |

**Rows this page is CONSTRAINED by. One sentence and a link each, never the explanation.**

| # | Shared fact | Owner | What this page does |
|---|---|---|---|
| O1 | NHS tiered member contribution rates and bands (uplifted 1 April 2026) | `/calculators/nhs-superannuation-tiered-contribution` | One sentence naming the tier idea, then link. **No table.** The temptation here is real: deemed pay during maternity leave sits on a tier, and explaining the tier table is taking O1's fact |
| O2 | Annual allowance mechanics: taper, threshold income, adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | One sentence, then link. The BMA's competing page carries a whole "Impact on annual allowance calculations" heading (4.6). We may say a leave year changes the input amount, and then we link |
| O3 | **Adjusted net income** as a general concept: £100,000 to £125,140 personal-allowance withdrawal, the 60% effective band, free childcare, the High Income Child Benefit Charge | **Batch 2 item 5**, `/blog/adjusted-net-income-doctors-60-percent-tax-trap`, **being written in parallel in this same batch** | **One sentence and a link. Never the explanation.** Maternity pay in a part-year drags a doctor's adjusted net income around and the free-childcare interaction is genuinely on-topic, which is exactly why the guard is here. If the writer finds they need three sentences, they are taking item 5's fact and must stop |
| O8 | How to claim employment expenses: form P87, the self-assessment route, the four-year time limit, and the repayment-agent warning | **Batch 2 item 1** | One sentence, then link |
| O9 | GMC annual retention fee: deductible, **amount UNVERIFIED** | `house_positions.md` §8 and §10 | May say the fee is deductible. **No figure.** Hard fail F5 |
| O10 | Global Sum per weighted patient, and the QOF point value | `house_positions.md` (Global Sum verified at £130.07 for 2026/27; **QOF point value UNVERIFIED**) | **No QOF point value on this page.** Hard fail F5. Note the trap: O13 sends this writer into the SFE Directions 2026, which is the same document that carries the Global Sum. Read it for the parental-leave provisions and do not bring the funding figures back |

**Adjacent-page discipline.** `/blog/gp-payroll-services` (FROZEN to 2026-09-10) already covers statutory maternity and paternity pay **for practice employees** in one sentence of its payroll-complications paragraph. That page is the long-run owner of the practice-as-employer payroll obligation. This page is about **the doctor's own position**, not about running a payroll. Where the two touch, this page states the doctor's side and links.

**Sibling-site boundary, and it is a hard acceptance criterion.** `bhp.co.uk/news-events/blog/maternity-pay-nhs-dentists/` (4.13) is a peer page in this cluster targeting **dentists**, who are the `dentists` site's audience under the five-niche model, not medical's. Its framing (NHS dental performer list, Net Pensionable Earnings, the dental and orthodontic reimbursement caps) is dental-contract machinery and **must not be imported**. The GP analogue is the SFE, which is a different instrument with different provisions. A draft that reaches for NPE, performer-list language or a dental cap has crossed the boundary.

---

## 2. Equity register

**The page does not exist. There is nothing to protect.** This section is stated rather than omitted, per `BATCH2_INDEX.md` §1.

**Google.** Zero equity, because there is no URL. No GSC query can attach to a page that has never been served. No `searchanalytics.query` pull was run against this URL because the pull would be meaningless; the site-level context is that Google indexes roughly **21 of 130 URLs** on this domain (batch-2 index §8).

**Bing, fresh pull today, and this is the evidence that matters.**

```
python -c "from optimisation_engine.clients.bing_query_client import BingWebmasterClient; ..."
BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')
# run 2026-08-26
# rows 648
# maternity-family matches: 0
```

The site-level query set returned **648 queries**. A regex for `maternity|paternity|parental|adoption` across all 648 matched **zero**. Not one query in the site's entire live Bing footprint touches this family.

| Engine | Named queries for this URL | Impressions | Clicks |
|---|---|---|---|
| Google | 0 (URL does not exist) | 0 | 0 |
| Bing | 0 of 648 site-level queries match the maternity family | 0 | 0 |

**There are no DO-NOT-LOSE queries. There is no BLOCK condition derived from equity. Floor 5 (equity preservation) is vacuous on this page and is recorded as such rather than skipped.**

This is also the honest baseline for section 8: the page starts from measured zero on both engines, on a family the site has never matched on, which is precisely what makes a 14-day and 28-day read interpretable.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'` (32,872 persisted rows, 27 domains, no volume floor). **Selection regex for this cluster, printed so the counts are re-derivable and any divergence from the dossier is visible rather than silent:**

```
ranked_keyword ~ '(maternity|paternity|shared parental|adoption pay)'
```

### 3.1 Headline figures, re-derived

```sql
-- run 2026-08-26 via `python scripts/_q.py`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data
      where site_key='medical' and date_pulled='2026-08-26'
        and ranked_keyword ~ '(maternity|paternity|shared parental|adoption pay)'),
k as (select ranked_keyword, max(search_volume) v,
        min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos,
        min(position) best_any_pos
      from c group by 1)
select count(*) uniq_kws, sum(v) total_vol,
       sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
       count(*) filter (where best_peer_pos<=10) peer_top10_kws,
       (select count(distinct competitor_domain) from c) domains,
       (select count(*) from c) raw_rows
from k;
```

| uniq_kws | total_vol | peer_winnable_vol | peer_top10_kws | domains | raw_rows |
|---|---|---|---|---|---|
| **397** | **244,120** | **4,220** | **0** | 4 | 431 |

All four figures the batch-2 index carries for this cluster reproduce exactly: 397 deduplicated keywords, 244,120 total volume, 4,220 peer-winnable, **0 keywords held by a peer inside the Google top 10**. The peer set is §2a of `competitor_universe_2026-08-26.md`, 22 domains. Only 6 domains contribute rows in this cluster and only 4 of them appear in the deduplicated set: bma.org.uk, bhp.co.uk, pricebailey.co.uk and simpkinsedwards.co.uk.

**Read the zero.** 244,120 volume and not one keyword where a peer sits in the Google top 10. That is the number that forces the split below.

### 3.2 THE SPLIT, and the rule that produces it

**The split rule, stated so it can be argued with.** A keyword is **ADDRESSABLE** if answering it requires a fact about the reader's own accounts, profits, pension record or practice finances. A keyword is **EMPLOYMENT-PAY** if the answer is a statutory rate, an entitlement condition or a leave duration that an employer's payroll or HR department applies, and that the reader's own financial position does not change.

Operationally:

```sql
-- ADDRESSABLE half
ranked_keyword ~ '(maternity allowance|self.?employ|sole trader|locum|profit|pension|tax|national insurance|accountant|reimburs)'
-- EMPLOYMENT-PAY half = everything else inside the cluster regex
```

**Why this rule and not a looser one.** An earlier cut treated every `statutory maternity pay` phrasing as ours, on the reasoning that SMP is a payroll figure and payroll is accountancy. That cut returned 116 keywords and 66,520 volume, and it is wrong. `how much is statutory maternity pay` (14,800) and `statutory maternity pay how much` (14,800) are the same question asked twice, the answer is a national rate published on gov.uk, and nothing about the searcher's accounts changes it. Claiming that volume would be claiming the gov.uk rate-lookup SERP. The tighter rule pushes it into the excluded half, where it belongs, and the cost of the honesty is 49,710 volume of apparent opportunity. **Stated, not silent.**

```sql
-- run 2026-08-26 via `python scripts/_q.py`; peers CTE and c CTE as at 3.1
s as (select *, case when ranked_keyword ~ '(maternity allowance|self.?employ|sole trader|locum|profit|pension|tax|national insurance|accountant|reimburs)'
                     then 'b_addressable' else 'a_employment_pay' end half from k)
select half, count(*) kws, sum(v) vol,
  sum(v) filter (where best_peer_pos<=20) peer_winnable,
  count(*) filter (where best_peer_pos<=10) peer_top10,
  count(*) filter (where best_any_pos<=10) any_top10
from s group by 1 order by 1;
```

| Half | Keywords | Volume | Share of cluster | Peer-winnable vol | Peer top-10 kws | Any-domain top-10 kws |
|---|---|---|---|---|---|---|
| **(a) EMPLOYMENT-PAY, excluded** | 336 | **227,310** | **93.1%** | 790 | 0 | 55 |
| **(b) ADDRESSABLE, ours** | 61 | **16,810** | **6.9%** | **3,430** | 0 | 4 |
| Total | 397 | 244,120 | 100% | 4,220 | 0 | 59 |

**The exclusion is quantified, not silent: 227,310 volume, 336 keywords, 93.1% of the cluster, is being deliberately left on the table.** 81% of the peer-winnable volume (3,430 of 4,220) sits in the 6.9% we are taking, which is the whole argument for the split in one number.

### 3.3 Half (a): the EMPLOYMENT-PAY vocabulary we are declining, and why

Top 25 by volume, from the same query with the split predicate negated:

| Vol | Keyword | Vol | Keyword |
|---|---|---|---|
| 22,200 | maternity pay | 4,400 | maternity pay nhs calculator |
| 14,800 | how much maternity pay | 4,400 | nhs maternity pay calculator |
| 14,800 | how much is statutory maternity pay | 3,600 | teaching maternity pay |
| 14,800 | statutory maternity pay how much | 3,600 | paternity pay |
| 12,100 | maternity pay uk | 3,600 | teacher maternity pay |
| 9,900 | working out maternity pay | 2,900 | maternity pay rate |
| 9,900 | maternity pay calculator | 2,900 | statutory pay maternity |
| 8,100 | nhs maternity pay | 2,900 | statutory maternity pay 2025 |
| 8,100 | maternity pay in nhs | 1,900 | maternity leave payment |
| 4,400 | statutory maternity pay 2026 | 1,900 | maternity leave pay |

Those 20 rows alone carry **152,900 volume, 63% of the whole cluster.**

**Four reasons this half is out of scope, in descending order of how binding they are.**

1. **V6, and it is the binding rule for this pack.** `language_spec` V6: vocabulary placement never overrides the page's own topic. `teacher maternity pay` (3,600) and `teaching maternity pay` (3,600) cannot be placed as natural English on an accountancy page for doctors. There is no sentence a medical accountant writes that contains "teacher maternity pay" and is not keyword-stuffing. **They go unplaced and are reported as unplaced.** The same is true of `maternity pay uk`, `maternity leave payment` and every bare rate-lookup phrasing.
2. **It is BMA-owned employment-pay content, at position 1.** `bma.org.uk/.../maternity-leave-pay-entitlements-under-the-nhs-scheme` holds **226 in-cluster keywords, 171,910 volume, best position 1** (4.1). `competitor_universe_2026-08-26.md` §2b classifies bma.org.uk as a non-peer institutional domain that "cannot be outranked on brand". It is the doctors' trade union publishing their own contractual entitlements. This is not a SERP we lose; it is one we should not enter.
3. **The 55 any-domain top-10 keywords in this half are all BMA's.** They are not evidence of a winnable field. They are evidence of one institution holding its own subject matter.
4. **Some of it is not even our profession.** `teacher maternity pay` is in the harvest because bma.org.uk's page happens to rank for it, not because a doctor searches it.

**One row in this half deserves a named decline rather than a silent one.** `nhs maternity pay` (8,100, BMA at position 4) and `maternity pay in nhs` (8,100) are genuinely about our audience. They are still declined, because the answer is the NHS Terms and Conditions of Service occupational maternity scheme, which is a contractual entitlement the BMA negotiates and publishes and about which we have no expertise, no ground truth and no house position. Writing it would be summarising the BMA. **Declined on competence, and recorded.**

### 3.4 Half (b): the ADDRESSABLE accountancy slice, in full

All **61** keywords, ordered by volume. `Best peer pos` is the best Google position held by a §2a peer; `Best any pos` is the best position held by any harvested domain. `On page` and `In corpus` are verbatim presence, case and punctuation normalised, checked by grep over `Medical/web/content/blog/*.md` (79 files, read only).

```bash
# run 2026-08-26, read only, nothing under Medical/web/ modified
cd Medical/web/content/blog && grep -ri "maternity allowance" *.md    # 0 matches
cd Medical/web/content/blog && grep -rin "maternity" *.md             # 5 matches across 5 files
```

**Every one of the 61 phrases is absent from this page (it does not exist) and absent from the whole 79-file blog corpus.** The word "maternity" appears five times in total across the corpus, in five different files, and not one is an accountancy treatment: a partnership-deed checklist item, a salaried-GP employment-rights sentence, a payroll-complications list, and the PCSE statement code table row `LOCADG | Locum allowances, maternity and paternity`. That last one is the closest thing we have to O13 and it is one cell of a code table.

| Vol | Best peer pos (domain) | Best any pos (domain) | On page | In corpus | Keyword |
|---|---|---|---|---|---|
| 2900 | **20** (bhp.co.uk) | 20 (bhp.co.uk) | n/a | **no** | how much is maternity allowance |
| 2900 | 25 (bhp.co.uk) | 25 (bhp.co.uk) | n/a | **no** | how much maternity allowance |
| 1600 | 29 (bhp.co.uk) | 29 (bhp.co.uk) | n/a | **no** | what is maternity allowance |
| 1000 | none | 17 (bma.org.uk) | n/a | **no** | maternity allowance calculator |
| 720 | none | 44 (bma.org.uk) | n/a | **no** | self employed paternity pay |
| 390 | none | 36 (bma.org.uk) | n/a | **no** | maternity allowance pay |
| 320 | **20** (bhp.co.uk) | 20 (bhp.co.uk) | n/a | **no** | how much is maternity allowance uk |
| 320 | none | 30 (bma.org.uk) | n/a | **no** | maternity allowance test period calculator |
| 260 | 50 (bhp.co.uk) | 50 (bhp.co.uk) | n/a | **no** | difference between maternity pay and maternity allowance |
| 260 | none | 61 (bma.org.uk) | n/a | **no** | maternity allowance claim pack |
| 260 | none | 21 (bma.org.uk) | n/a | **no** | maternity pay calculator after tax |
| 210 | none | 35 (bma.org.uk) | n/a | **no** | check your maternity allowance dates |
| 210 | none | 32 (bma.org.uk) | n/a | **no** | how long maternity allowance paid for |
| 210 | none | 32 (bma.org.uk) | n/a | **no** | maternity allowance test period |
| 210 | 36 (pricebailey.co.uk) | 9 (bma.org.uk) | n/a | **no** | maternity leave and pension contributions |
| 210 | 37 (pricebailey.co.uk) | 15 (bma.org.uk) | n/a | **no** | maternity leave pension contributions |
| 210 | 26 (pricebailey.co.uk) | 21 (bma.org.uk) | n/a | **no** | pension contributions and maternity leave |
| 210 | 43 (pricebailey.co.uk) | 16 (bma.org.uk) | n/a | **no** | pension contributions maternity leave |
| 210 | 22 (pricebailey.co.uk) | 19 (bma.org.uk) | n/a | **no** | pension contributions on maternity leave |
| 210 | 28 (pricebailey.co.uk) | 21 (bma.org.uk) | n/a | **no** | pension contributions when on maternity leave |
| 210 | none | 33 (bma.org.uk) | n/a | **no** | test period maternity allowance |
| 170 | 33 (pricebailey.co.uk) | 25 (bma.org.uk) | n/a | **no** | pension contribution during maternity leave |
| 170 | 40 (pricebailey.co.uk) | 19 (bma.org.uk) | n/a | **no** | pension contributions during maternity leave |
| 170 | none | 18 (bma.org.uk) | n/a | **no** | pension contributions while on maternity leave |
| 140 | 36 (bhp.co.uk) | 36 (bhp.co.uk) | n/a | **no** | how much do you get maternity allowance |
| 140 | 40 (bhp.co.uk) | 27 (bma.org.uk) | n/a | **no** | maternity allowance and maternity pay |
| 140 | 37 (bhp.co.uk) | 37 (bhp.co.uk) | n/a | **no** | maternity pay and maternity allowance |
| 140 | 39 (bhp.co.uk) | 39 (bhp.co.uk) | n/a | **no** | maternity pay maternity allowance |
| 140 | none | 42 (bma.org.uk) | n/a | **no** | test period calculator maternity allowance |
| 110 | 33 (bhp.co.uk) | 33 (bhp.co.uk) | n/a | **no** | how do you qualify for maternity allowance |
| 110 | 33 (bhp.co.uk) | 33 (bhp.co.uk) | n/a | **no** | how to qualify for maternity allowance |
| 110 | **16** (bhp.co.uk) | 16 (bhp.co.uk) | n/a | **no** | maternity allowance rate |
| 110 | 48 (bhp.co.uk) | 48 (bhp.co.uk) | n/a | **no** | maternity pay vs maternity allowance |
| 110 | 40 (pricebailey.co.uk) | 9 (bma.org.uk) | n/a | **no** | pension during maternity leave |
| 110 | none | 18 (bma.org.uk) | n/a | **no** | pension while on maternity leave |
| 110 | 40 (pricebailey.co.uk) | 10 (bma.org.uk) | n/a | **no** | pensions and maternity leave |
| 110 | 43 (bhp.co.uk) | 43 (bhp.co.uk) | n/a | **no** | what is maternity allowance in uk |
| 90 | 37 (pricebailey.co.uk) | 16 (bma.org.uk) | n/a | **no** | employer pension contributions during maternity leave |
| 90 | none | 24 (bma.org.uk) | n/a | **no** | how many weeks is maternity allowance |
| 90 | 25 (pricebailey.co.uk) | 10 (bma.org.uk) | n/a | **no** | is statutory maternity pay pensionable |
| 90 | none | 63 (bma.org.uk) | n/a | **no** | maternity allowance contact number free 0800 0345 |
| 90 | none | 17 (bma.org.uk) | n/a | **no** | maternity leave pension |
| 90 | 37 (pricebailey.co.uk) | 17 (bma.org.uk) | n/a | **no** | pension maternity leave |
| 90 | 35 (pricebailey.co.uk) | 15 (bma.org.uk) | n/a | **no** | pension on maternity leave |
| 90 | 44 (pricebailey.co.uk) | 14 (bma.org.uk) | n/a | **no** | pensions maternity leave |
| 90 | 24 (bhp.co.uk) | 24 (bhp.co.uk) | n/a | **no** | who is eligible for maternity allowance |
| 70 | 45 (bhp.co.uk) | 45 (bhp.co.uk) | n/a | **no** | can i claim maternity allowance |
| 70 | 40 (bhp.co.uk) | 30 (bma.org.uk) | n/a | **no** | how is maternity allowance calculated |
| 70 | none | 31 (bma.org.uk) | n/a | **no** | how often is maternity allowance paid |
| 70 | 22 (bhp.co.uk) | 22 (bhp.co.uk) | n/a | **no** | maternity allowance criteria |
| 70 | 39 (bhp.co.uk) | 39 (bhp.co.uk) | n/a | **no** | maternity allowance meaning |
| 70 | 28 (bhp.co.uk) | 28 (bhp.co.uk) | n/a | **no** | maternity allowance requirements |
| 70 | 42 (bhp.co.uk) | 42 (bhp.co.uk) | n/a | **no** | what is maternity allowance uk |
| 50 | none | 31 (bma.org.uk) | n/a | **no** | keeping in touch days maternity allowance |
| 50 | none | 30 (bma.org.uk) | n/a | **no** | kit days maternity allowance |
| 50 | none | 31 (bma.org.uk) | n/a | **no** | maternity allowance and kit days |
| 50 | none | 29 (bma.org.uk) | n/a | **no** | maternity allowance final payment |
| 50 | **12** (pricebailey.co.uk) | 12 (pricebailey.co.uk) | n/a | **no** | salary sacrifice pension and maternity leave |
| 50 | **16** (pricebailey.co.uk) | 16 (pricebailey.co.uk) | n/a | **no** | salary sacrifice pension maternity leave |
| 50 | none | 38 (bma.org.uk) | n/a | **no** | test period table maternity allowance |
| 40 | none | 32 (bma.org.uk) | n/a | **no** | maximum maternity allowance |

**Structure of the addressable half, which is what tells the writer what the page is.**

- **Maternity Allowance, 31 keywords, ~10,730 volume.** The largest sub-family and the reason the page exists. Best position anywhere is **bhp.co.uk at 16**, on a **650-word** post carrying **2023/24 figures** (4.4). This is beatable.
- **Pension during statutory leave, 19 keywords, ~2,450 volume.** Owned in substance by BMA at positions 9 to 21 with a genuinely strong page (4.6), and contested by pricebailey at 22 to 44 with a page we could not fetch (4.5). Peer-winnable on the salary-sacrifice pair only.
- **Salary sacrifice and maternity, 2 keywords, 100 volume, pricebailey at 12 and 16.** Tiny, and the **best peer position in the entire cluster.**
- **Self-employed paternity, 1 keyword, 720 volume, nobody inside position 44.** The most open single row in the half.
- **SMP versus MA comparison, 5 keywords, 790 volume.** This is O11 stated as a search.
- **Tool and navigational intent, 8 keywords, 2,120 volume.** Calculators, the test-period table, the DWP contact number, payment dates. Deferred in section 7.1 with reasons; a markdown post will not satisfy them.
- **GP practice reimbursement for parental leave cover (O13): ZERO keywords in the harvest.** There is no vocabulary for it because **no domain among the 27 harvested runs a page on it.** This is the batch-2 index §7 pattern repeating: a gap in the competitor set, not a gap in the market. It is stated here so nobody later reads the absence as evidence that O13 does not matter.

---

## 4. Competitor teardown

**Scope declared.** Every URL in the harvest holding **3 or more in-cluster keywords** is torn down. There is no cap and nothing is deferred below a line.

```sql
-- run 2026-08-26 via `python scripts/_q.py`
with c as (select * from dataforseo_competitor_data
      where site_key='medical' and date_pulled='2026-08-26'
        and ranked_keyword ~ '(maternity|paternity|shared parental|adoption pay)')
select url, competitor_domain, count(distinct ranked_keyword) kws, sum(distinct_v) vol, min(position) best_pos
from (select url, competitor_domain, ranked_keyword, position,
             max(search_volume) over (partition by url, ranked_keyword) distinct_v from c) t
group by 1,2 having count(distinct ranked_keyword)>=3 order by kws desc;
```

**13 URLs returned.** The list in the task brief was verified against this query row by row and reconciles exactly, with one clarification: the brief presents the four small BMA URLs on one line, which reads as one entry; they are four separate rows and are torn down separately at 4.7, 4.8, 4.9 and 4.10. Domain classification per `competitor_universe_2026-08-26.md`: **peer** = §2a, **non-peer** = §2b.

**Fetch outcomes: 10 of 13 returned 200. Three returned HTTP 403.** Two are `pricebailey.co.uk`, a known 403 to automated fetching; the third is `simpkinsedwards.co.uk` (4.12), which the task brief did not anticipate. **None is dropped.**

Per `language_spec` Part 4 point 4: **bma.org.uk is read for VOCABULARY and HEADING PATTERNS only, never for length.** Its 1,200 to 3,000 word pages rank on brand.

### 4.1 https://www.bma.org.uk/pay-and-contracts/maternity-paternity-and-adoption/finance/maternity-leave-pay-entitlements-under-the-nhs-scheme
**226 in-cluster keywords · 171,910 volume · best position 1 · NON-PEER** (bma.org.uk, §2b)
- Title / H1: "Maternity leave pay entitlements under the NHS scheme". ~1,200 words. Fetched 200.
- H2/H3: NHS scheme · Calculation of maternity pay · Nodal point pay progression · Resident doctors on the 2016 contract · Statutory entitlements.
- Tables: no. Calculator: no. FAQ: no.
- **Judgement. This single page is the cluster.** 226 keywords and 171,910 volume, which is **70% of the whole 244,120 headline** on its own, at position 1, from 1,200 words and five headings. It is the doctors' trade union publishing the doctors' own contract. It names Maternity Allowance only as an offset ("8 weeks' full pay, less any Statutory Maternity Pay (SMP) or Maternity Allowance (MA)") and as a fallback claimable from JobcentrePlus. **It says nothing about self-employed or locum GPs, nothing about pension accrual during leave, and nothing about practice reimbursement for cover.** Every word of its 171,910 volume is in half (a). It is not a competitor for our page; it is the reason our page must be scoped away from three quarters of the cluster.

### 4.2 https://www.bma.org.uk/pay-and-contracts/maternity-paternity-and-adoption/leave/maternity-leave-calculator
**54 keywords · 41,030 volume · best position 9 · NON-PEER**
- Title / H1: "Maternity leave calculator". Fetched 200. Page dated "Updated: Wednesday 26 August 2026".
- H2/H3: **none in the main content area.**
- Tables: no. FAQ: no. Calculator: **yes, and it is behind a member sign-in.**
- **Judgement. The most instructive page in the teardown, and it argues against building a calculator.** 41,030 volume held at position 9 by a page with **zero headings and a login wall**. It ranks on brand plus a tool promise. Two consequences. First, this is exactly the `themdu.com` pattern the McCloud pack found: the phrase, not the depth, is what ranks, which normally argues for placing vocabulary. Second, and overriding it here: the vocabulary it ranks for is half (a) leave-duration and pay-calculation phrasing, and V6 says a page does not take vocabulary that does not fit its topic. **We decline all 54.** The one genuinely useful observation is that its tool is gated, so a public page that plainly states the rule beats it on usefulness even while losing on rank, which is the same posture the McCloud pack took against the BMA's gated webinars.

### 4.3 https://www.bma.org.uk/pay-and-contracts/maternity-paternity-and-adoption/leave/paternity-leave-for-doctors
**32 keywords · 13,850 volume · best position 2 · NON-PEER**
- Title / H1: "Paternity leave for doctors". ~1,200 words. Fetched 200.
- H2: Eligibility · Notice period · When can paternity leave start? · How long do I have for paternity leave? · Pay and other terms and conditions · Enhanced pay under NHS terms and conditions · Time off for ante-natal and adoption appointments · Shared parental leave · Additional statutory paternity pay · Unpaid additional paternity leave.
- Tables: no. Calculator: no. FAQ: no.
- **Judgement.** Entitlement content, position 2, out of scope in substance. **One row it holds is ours and it is the most open row in the cluster:** `self employed paternity pay` (720 volume), where BMA sits at **44** and no other domain appears at all. A page written for employed doctors ranks 44th for a self-employed question because nobody has written the self-employed answer. That is a one-line whitespace proof.

### 4.4 https://bhp.co.uk/news-events/blog/maternity-allowance/
**23 keywords · 10,100 volume · best position 16 · PEER** (bhp.co.uk, §2a rank 15). **The single most important teardown in this pack.**
- Title: "Maternity Allowance - BHP, Chartered Accountants". H1: "Maternity Allowance". **~650 words.** Fetched 200.
- H2/H3: Full-rate Maternity Allowance · Reduced rate Maternity Allowance · How to apply for Maternity Allowance · What if you're employed and self-employed?
- Tables: no. Calculator: no. FAQ: no.
- **Content it carries.** The 66-week test period and the requirement to have been self-employed for at least 26 weeks of it, earning £30 a week or more for at least 13 weeks. The full rate as the lower of a weekly cap or 90% of average weekly earnings, conditional on having paid **Class 2 National Insurance** for at least 13 of the 66 weeks. The **reduced rate** for those with insufficient Class 2 contributions, payable for up to 39 weeks. That you cannot claim MA and SMP at the same time: "You can only claim maternity allowance if you are not entitled to any SMP."
- **Judgement. This is the page to beat, it is the only peer holding the addressable half, and it is beatable on five specific counts.**
  1. **Its figures are 2023/24.** It quotes £172.48 full rate and £27 reduced rate against a "2023/24" tag. It is three tax years stale on a page whose entire purpose is an amount. This is `language_spec` F1 and F2 failing in public, on the exact page we are competing with. **We must not simply copy the current numbers in; we must verify them at gov.uk (section 7.5) and date-tag them, and we will then be current where the incumbent is not.**
  2. **650 words.** It is the thinnest substantive page in the teardown and it holds 23 keywords and 10,100 volume with them. It ranks on being the only accountant who wrote the page at all.
  3. **It is not written for doctors.** It is a generic chartered-accountancy explainer. Nothing in it touches the NHS Pension Scheme, locum GP practice, GP profit share, or the 10-week locum forms clock. Our specialist tail is the whole differentiator (`language_spec` K1).
  4. **It says nothing about the pension consequence.** A self-employed GP on MA is not accruing NHS pension, which is the single most expensive fact in the topic for our audience, and this page does not raise it.
  5. **It says nothing about practice reimbursement (O13).** BHP wrote that content, but for **dentists** (4.13), on a different contract.
- **What it does that we should copy.** The `What if you're employed and self-employed?` heading is a genuinely good reader-voice heading for a mixed-status GP, and the employed-plus-self-employed fork is the real case for a salaried GP who also locums. `language_spec` B2 wants exactly this shape.

### 4.5 https://www.pricebailey.co.uk/blog/pension-contributions-statutory-leave/
**23 keywords · 2,730 volume · best position 12 · PEER** (pricebailey.co.uk, §2a rank 5). **The O12 competitor.**
- **FETCH FAILED: HTTP 403 Forbidden.** Flagged gap. **Not dropped.** Keyword data only, per `BATCH2_INDEX.md` §9 point 3, which records pricebailey among the known automated-fetch refusals.
- What the harvest tells us without the fetch: it holds **the two best peer positions in the entire 397-keyword cluster**, `salary sacrifice pension and maternity leave` at **12** and `salary sacrifice pension maternity leave` at **16**, and it holds twelve further word orders of "pension contributions during maternity leave" between positions 22 and 44. It also holds `is statutory maternity pay pensionable` at 25.
- **Its headings are UNKNOWN and cannot be marked covered or declined at QA floor 8 without a human read.** This is a stated limitation, not a decision. It is the more consequential of the two 403s, because it is the only peer with a dedicated page on O12.

### 4.6 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/maternity-paternity-and-adoption-leave-and-your-pension
**18 keywords · 2,640 volume · best position 9 · NON-PEER**
- Title / H1: "Maternity, paternity and adoption leave and your pension". **~3,000 words.** Fetched 200.
- H2: Is my maternity leave pensionable? · I am a secondary care doctor · I am a GP partner · I am a salaried GP · I am a locum GP/bank staff · Not returning to work from maternity leave · What if I retire? · Paying your contributions · Do I have to contribute whilst on Maternity Leave · I am only entitled to maternity allowance · My employer did not take any contributions from me · I cannot afford to pay contributions whilst on unpaid leave · What rate are the employer contributions? · Are keep in touch (KIT) days pensionable? · What about my added years or additional pension? · Shared parental leave · Impact on annual allowance calculations.
- Tables: **yes**, a 12-row maternity pay scenario comparison. Calculator: no. FAQ: no (the H2 set is the FAQ).
- **Judgement. This is the strongest competitor in the addressable half and the writer must read this entry before drafting O12.** Seventeen reader-voice headings, four of them role-segmented in exactly the "I am a..." form `language_spec` Part 1 B tells us to copy outright. It carries the **deemed pay** mechanic (the pension record continues to show unreduced pre-leave earnings), the arrears treatment of unpaid leave, KIT-day pensionability, and, decisively, the locum position: **"you are only able to contribute to the scheme while actually working"**, so a freelance locum GP has no pension protection during unpaid leave. It even has a heading for "I am only entitled to maternity allowance".
- **This page does most of O12 better than we plausibly will, and the honest consequence is stated in section 5.** What it does not do: it is a pension page, so it says nothing about MA eligibility arithmetic, nothing about how a fluctuating profit figure drives the MA amount, and nothing about practice reimbursement. It is also position 9, not 1, on its best row, which means the SERP is not fully satisfied.

### 4.7 https://www.bma.org.uk/pay-and-contracts/maternity-paternity-and-adoption/return-to-work/returning-to-work-and-your-rights-as-a-working-parent
**11 keywords · 780 volume · best position 19 · NON-PEER**
- Title / H1: "Returning to work and your rights as a working parent". ~2,400 to 2,600 words. Fetched 200.
- H2/H3: Returning to work · Providing notice · The right to return · Keeping in touch days · What type of work can be done on KIT days? · When can KIT days be worked? · How much will I get paid for KIT days? · What if I'm breastfeeding when I'm asked to work a KIT day? · What about help with childcare so I can work a KIT day? · Shared parental leave in touch (SPLIT) days · What should my employer be doing to ensure the rules are followed? · Changing your hours · Statutory right to request flexible working · If you don't plan to return · If you are on a fixed term or training contract · Post-natal care and breastfeeding · Your leave rights as a parent · Time off for dependents · Advice from working medical parents.
- **Judgement.** Employment-rights content, out of scope on substance. **One theme is ours: KIT days.** Our cluster carries `keeping in touch days maternity allowance` (50), `kit days maternity allowance` (50) and `maternity allowance and kit days` (50). Those are MA-specific and this page answers the SMP-employee version. Nobody answers the MA version, and MA has a different KIT rule from SMP, which is a genuine and cheap piece of whitespace.

### 4.8 https://www.bma.org.uk/pay-and-contracts/maternity-paternity-and-adoption/your-rights/your-contract-during-maternity-leave
**9 keywords · 630 volume · best position 4 · NON-PEER**
- Title / H1: "Your contract during maternity leave". ~1,200 words. Fetched 200.
- H2/H3: Paid and unpaid maternity leave · Annual leave · Maternity leave and training contracts · Fixed term or training contracts · Rotational training contracts · Statutory continuous service during a rotational training contract for statutory payments · Resident doctors on the 2016 contract who are subject to the transitional pay protection arrangements under Schedule 14 · Expiration of contract and movement between posts · University or NHS honorary contracts · Returning to the NHS.
- **Judgement.** Pure employment-contract content, position 4, entirely half (a). **Declined in full.** Note its heading 7 as an example of what `language_spec` Part 3 calls legible only on brand equity: a 24-word heading naming a contract schedule.

### 4.9 https://www.bma.org.uk/pay-and-contracts/maternity-paternity-and-adoption/your-rights/adoption-and-surrogacy
**6 keywords · 920 volume · best position 18 · NON-PEER**
- Title / H1: "Adoption and surrogacy". ~1,100 words. Fetched 200.
- H2/H3: Your rights as an adopter · Who is the adopter? · Notice for taking leave · Evidence · Changing your notice period · Adoption pay, terms and conditions while on leave · Returning to work · During adoption leave · Time off for adoption appointments · Rights for intended parents in surrogacy arrangements.
- **Judgement. Declined in full, and the decline is recorded rather than silent.** Statutory Adoption Pay and surrogacy parental orders are employment-entitlement law. There is no accountancy fork here comparable to the MA-versus-SMP fork, because there is **no self-employed equivalent of SAP** the way MA is the self-employed equivalent of SMP. That asymmetry is worth one sentence on our page and no more.

### 4.10 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/salary-sacrifice-schemes
**5 keywords · 310 volume · best position 16 · NON-PEER**
- Title / H1: "Salary sacrifice schemes". ~2,400 words. Fetched 200.
- H2/H3: What benefits you can access · Adjusting your arrangement · Implications (H3: Tax and national insurance benefits · Salary sacrifice differences between pension schemes, H4: 2015 scheme / 1995 section / 2008 section · High earners and the Annual Allowance · Final pay controls for employers · Salary Sacrifice and partial retirement · Impact on other benefits) · What to consider.
- **Judgement.** Its maternity content is **one sentence** inside "Impact on other benefits": a reduction in salary from a sacrifice arrangement reduces work-related statutory payments such as statutory maternity pay, because those are based on average earnings over a fixed period. **That one sentence is the entire market answer to a question pricebailey holds at position 12 and 16.** It is the sharpest, most specific, most genuinely accountancy-shaped fact in the whole addressable half: sacrificing salary in the qualifying weeks cuts the SMP you then receive. **Note the O2 boundary:** this page's annual-allowance and final-pay-control material belongs to `/calculators/nhs-pension-annual-allowance`, not to us.

### 4.11 https://www.pricebailey.co.uk/guides/frequently-asked-questions-maternity-leave-and-pay/
**7 keywords · 700 volume · best position 14 · PEER**
- **FETCH FAILED: HTTP 403 Forbidden.** Flagged gap. **Not dropped.** Headings unknown, keyword data only. Second of the two 403s, same domain, same known cause.

### 4.12 https://www.simpkinsedwards.co.uk/articles/what-employers-need-to-know-about-2025-26-statutory-rate-changes
**6 keywords · 7,790 volume · best position 36 · PEER** (simpkinsedwards.co.uk, §2a rank 17)
- **FETCH FAILED: HTTP 403 Forbidden.** Flagged gap. **Not dropped.** Headings unknown.
- What the harvest tells us: it is a **statutory-rates announcement page for employers**, and it holds `statutory maternity pay 2026` (4,400), `statutory maternity pay 2025` (2,900) and four other rate-year rows, all at positions 36 to 99. **7,790 volume at position 36 and below is a peer failing to rank on rate-lookup terms**, which corroborates the section 3.3 decision: this is gov.uk's SERP and an accountancy firm publishing the rates does not take it.
- **Correction to the task brief, recorded rather than silent.** The brief lists this URL under section 4's fetchable set with no flag. It is a third 403, not the two the brief anticipated. **Three URLs failed to fetch, not two.**

### 4.13 https://bhp.co.uk/news-events/blog/maternity-pay-nhs-dentists/
**4 keywords · 320 volume · best position 16 · PEER, and OUT OF BOUNDS on audience**
- Title: "Maternity Pay - NHS Dentists - BHP, Chartered Accountants". H1: "Maternity Pay – NHS Dentists". **~280 words.** Fetched 200.
- H2/H3: **none.**
- **Judgement, and it is a boundary ruling as much as a teardown.** This is the closest thing in the entire harvest to O13, and **it is a dental page**. It describes the NHS dental maternity reimbursement: a performer on the NHS dental performer list for two years with 26 weeks' continuous employment before the qualifying date, not registered as a limited company, claiming 26 weeks from no earlier than the 11th week before the expected week of birth, with the provider reimbursed weekly on **Net Pensionable Earnings**, capped at £1,660 for dental performers and £3,630 for orthodontic specialists, less any DWP Maternity Allowance.
- **None of that is transferable.** Dentists are the `dentists` site's audience under the five-niche model. NPE, the dental performer list and those two caps are dental-contract machinery. The GP analogue lives in the **GMS Statement of Financial Entitlements**, a different instrument with different conditions and different amounts, and it must be read at source (section 7.5). **A draft containing "Net Pensionable Earnings", "dental performer", "£1,660" or "£3,630" has crossed the sibling-site boundary and is a BLOCK.**
- **What it does prove, and this is the most valuable single observation in the teardown:** an accountant writing the practice-reimbursement-for-maternity-cover page in the *dental* vertical ranks at position 16 on 280 words. **Nobody has written it for GPs.** That is O13's whitespace demonstrated by its own sibling.

### 4.14 Coverage checklist: union of their heading themes, minus what we would have

Twenty-eight distinct themes across the eleven fetchable pages, deduplicated. Marked against a page scoped as section 5 rules. `OURS` = the page would cover it. `DECLINE` = deliberately not covered, reason given. `OTHER PAGE` = belongs to a page named in the ownership map.

| # | Theme | Seen at | Verdict |
|---|---|---|---|
| 1 | The NHS occupational maternity scheme: 8 weeks full pay, 18 weeks half pay plus SMP | 4.1, 4.9 | **DECLINE.** Contractual entitlement, BMA-negotiated, no house position, no competence. §3.3 reason 4 |
| 2 | Calculation of maternity pay against nodal points and pay progression | 4.1 | **DECLINE.** Half (a). Employment-pay |
| 3 | Resident doctors on the 2016 contract | 4.1, 4.8 | **DECLINE.** Contract-specific employment terms |
| 4 | Statutory entitlements: SMP weeks, rates, the 90% period | 4.1, 4.3 | **OURS, one sentence only**, as the comparator against MA. Never as the page's subject |
| 5 | A maternity leave date calculator | 4.2 | **DECLINE, tool intent.** Deferred in 7.1 with three sibling rows. Note the incumbent's is login-gated |
| 6 | Paternity leave eligibility, notice, duration, enhanced NHS pay | 4.3 | **DECLINE.** Half (a) |
| 7 | **Self-employed paternity pay** | 4.3 (position 44) | **OURS.** 720 volume, the most open row in the cluster |
| 8 | Shared parental leave | 4.3, 4.6, 4.7 | **DECLINE**, except one sentence noting there is no self-employed equivalent |
| 9 | **Full-rate Maternity Allowance: the amount and the 90%-of-earnings cap** | 4.4 | **OURS.** O11. Figures verified at source per 7.5, never copied from 4.4's stale 2023/24 numbers |
| 10 | **Reduced-rate Maternity Allowance, the small-earnings route** | 4.4 | **OURS.** O11, and named explicitly in `BATCH2_INDEX.md` §5 as a ground-truth prerequisite |
| 11 | **The 66-week test period and the 26-weeks-of-work / 13-weeks-of-earnings conditions** | 4.4 | **OURS.** O11 |
| 12 | **Class 2 National Insurance as the switch between full and reduced rate** | 4.4 | **OURS, and it is the most accountancy-shaped fact in the topic.** Cross-refer `house_positions.md` §8: Class 2 is treated as paid at or above the Small Profits Threshold from 6 April 2024, and voluntary Class 2 is £3.65 per week for 2026/27. **A GP whose profits fall below the threshold and who does not pay voluntary Class 2 drops from full-rate to reduced-rate MA.** No competitor connects those two facts |
| 13 | **How to apply for MA, the claim form** | 4.4 | **OURS.** O11. Form name verified at source, never asserted from memory |
| 14 | **Employed and self-employed at the same time** | 4.4 | **OURS**, and it is the salaried-GP-who-also-locums case, which is our audience exactly |
| 15 | **SMP and MA cannot both be claimed** | 4.4 | **OURS.** O11, the page's spine |
| 16 | **Is maternity leave pensionable? Deemed pay** | 4.6 | **OURS.** O12 |
| 17 | **Role segmentation: secondary care doctor / GP partner / salaried GP / locum GP** | 4.6 | **OURS, and copy the heading form.** `language_spec` Part 3 "copy outright": reader-voice "I am a..." headings |
| 18 | **The locum position: contributions only while actually working, no protection during unpaid leave** | 4.6 | **OURS.** O12, and the single most expensive fact for a locum reader |
| 19 | **Arrears of contributions during unpaid leave, and repaying them** | 4.6 | **OURS.** O12 |
| 20 | **KIT days and pensionability; MA-specific KIT rules** | 4.6, 4.7 | **OURS.** 150 volume across three MA-specific phrasings that nobody answers |
| 21 | Employer contribution rate during leave | 4.6 | **OURS, one sentence.** `house_positions.md`: 23.7% of pensionable pay, applicable from 1 April 2024 and still current for 2026/27. **Then link.** The tier machinery is O1's |
| 22 | Impact on annual allowance calculations | 4.6 | **OTHER PAGE.** O2. One sentence, then link to `/calculators/nhs-pension-annual-allowance` |
| 23 | Added years and additional pension during leave | 4.6 | **DECLINE.** Adjacent scheme-mechanics, not maternity-specific. One sentence at most |
| 24 | **Salary sacrifice reduces the earnings that SMP is calculated on** | 4.10, and pricebailey at 4.5 (positions 12 and 16) | **OURS.** The best peer position in the cluster and a genuine accountancy point |
| 25 | Salary sacrifice mechanics by scheme section, final pay controls | 4.10 | **OTHER PAGE.** O1 and O2 |
| 26 | Not returning to work; repaying occupational maternity pay | 4.6, 4.7 | **OURS, one sentence**, because the repayment clawback has a real tax and cashflow consequence |
| 27 | **NHS contract reimbursement to the practice for maternity cover** | 4.13, **dental only** | **OURS, as the GP version read at source.** O13. **The dental version is out of bounds** |
| 28 | Adoption pay, surrogacy, parental orders | 4.9 | **DECLINE.** No self-employed fork exists. One sentence |
| 29 | Statutory rate changes announced for employers | 4.12 (403) | **DECLINE, tool/rates intent.** Half (a) |
| 30 | **Contract during leave; annual leave accrual; training-contract continuity** | 4.8 | **DECLINE.** Employment law, not accountancy |

**Thirty themes. Eighteen are OURS, ten are DECLINE, two are OTHER PAGE.** Every one must end QA marked covered, declined-with-reason, or belongs-to-another-page, **undecided count zero** (floor 8). The **three 403 URLs (4.5, 4.11, 4.12) are recorded as fetch-failed, themes unknown**: a stated limitation, not a decision, and 4.5 is the material one because it is the only peer page dedicated to O12.

---

## 5. Whitespace, and the page-versus-section question answered with numbers

**The question this pack was told to answer honestly: is there enough addressable ground here for a page, or is this a section on an existing page?**

### 5.1 The verdict

**BUILD THE PAGE. Scoped to half (b) only, and to the self-employed and locum GP fork specifically.**

Three reasons, in the order of how much weight they carry.

**Reason 1, and it is dispositive on its own: the section route is not available in batch 2.** The only three pages that could host this material as a section are `gp-payroll-services`, `locum-doctor-tax-complete-guide` and `nhs-pension-for-locums-form-a-form-b`. **All three are frozen to 2026-09-10** (query in section 1). Choosing "section" would mean choosing to do nothing until 2026-09-11, which is precisely the deferral `BATCH2_INDEX.md` §2 applied to payroll, mileage, QOF and tapered AA. Those four were deferred because their host pages were frozen **and** their volumes were 1,310 to 5,490. This cluster's addressable half is **16,810 volume with 3,430 peer-winnable**, which is three to twelve times larger. Deferring it would be applying the small-cluster remedy to a mid-sized cluster.

**Reason 2: the addressable half clears this batch's own bar for a page, and not by a small margin.** Against the batch-2 index §1 table, on the measure the owner chose to order the work:

| Batch-2 item | Peer-winnable volume | This cluster's addressable half |
|---|---|---|
| 1 uniform tax relief | 27,550 | |
| **4 maternity (addressable half only)** | | **3,430** |
| 5 adjusted net income | 1,900 | |
| 6 vets | 740 | |
| 7 nurses | 420 | |

**The addressable half alone outranks three of the seven approved pages on peer-winnable volume**, and it does so on 61 keywords, which is more than items 5 (32), 6 (11) and 2 (27 tight) carry in total. Item 6 was approved on 1,260 total volume and 11 keywords. If 16,810 volume and 61 keywords is not a page, then item 6 is not a page either, and the batch has already ruled that it is.

**Reason 3: three distinct owned facts, one of them uncontested by anybody.** O11, O12 and O13 are three separate questions with three separate answers. A section cannot carry three. And **O13 has zero competitor coverage in the entire 32,872-row harvest** for GPs; the only page in the market that writes the equivalent writes it for dentists (4.13) and ranks at position 16 on 280 words.

### 5.2 The honest counter-argument, stated in full rather than buried

**O12 is largely already answered, and answered well, by a page we cannot outrank.** Competitor 4.6 is 3,000 words, seventeen reader-voice headings, role-segmented into exactly the four audiences we serve, carrying deemed pay, arrears, KIT-day pensionability and the locum "only while actually working" rule. It sits at position 9. If this page were **only** about pension during maternity leave, the correct answer would be **section, not page**, and the section would belong on a pension page. **That is the finding for O12 considered alone, and it is recorded so a later reader can see the question was actually asked.**

What rescues the page is that O12 is one of three limbs, and it is not the largest. The MA sub-family is 31 keywords and ~10,730 volume against the pension sub-family's 19 keywords and ~2,450. **The page's spine is O11, the pension material is a supporting limb written to our audience rather than a competing treatment, and O13 is the uncontested differentiator.** Under binding rule V3 the page owns O12, so it must carry it; the constraint is that it carries it as **the self-employed and locum consequence**, which is what BMA's page states in one clause and does not develop, and not as a general re-treatment of BMA's seventeen headings.

**A second honest caveat.** Peer-winnable in this half is 3,430, and **3,320 of it is four rows**: `how much is maternity allowance` (2,900), `how much is maternity allowance uk` (320), `maternity allowance rate` (110), all held by bhp at 16 to 20, plus the two salary-sacrifice rows (100 combined) held by pricebailey at 12 and 16. **The peer-winnable case rests almost entirely on beating one 650-word, three-year-stale BHP post.** That is a real dependency and it is a favourable one, but it should not be dressed up as breadth.

### 5.3 The actual whitespace, tested against the reads

1. **Nobody in the harvest writes the accountancy version of Maternity Allowance for a self-employed professional whose profits fluctuate.** BHP (4.4) writes the generic benefits explainer with stale figures; BMA (4.1) names MA only as an offset. Nobody explains that the amount is the lower of a cap and 90% of average weekly earnings across a 13-week window the claimant partly controls, that a locum GP with lumpy monthly invoicing therefore gets a different answer depending on which 13 weeks fall in the test period, or that this is a thing an accountant can look at in advance. **This is the largest piece of open whitespace and it is genuinely ours.**
2. **Nobody connects Class 2 National Insurance to the MA rate.** Theme 12 above. Class 2 is no longer a required payment from 6 April 2024 where profits are at or above the Small Profits Threshold, and voluntary Class 2 is £3.65 per week for 2026/27 (`house_positions.md` §8). BHP states the 13-of-66-weeks Class 2 condition without connecting it to the modern Class 2 position, and no other page touches it. **A GP with low profits in the test period who assumes Class 2 is dealt with can land on the reduced rate instead of the full rate.** That is a concrete, checkable, cheap-to-fix consequence and it is the strongest single paragraph available to this page.
3. **Nobody says what happens to the NHS pension record.** BMA (4.6) says it for employees, superbly, and says in one clause that a locum can only contribute while actually working. Nobody develops the consequence: a self-employed or locum GP on MA has a gap in pensionable service, MA is not pensionable, and the 10-week locum forms clock (`house_positions.md` §2.C, "a missed 10-week window is an irrecoverable loss of pension accrual, not a late-filing penalty") keeps running against work done before the leave started. **That last interaction appears nowhere in the market and it is the kind of specialist tail `language_spec` K1 exists to protect.**
4. **Nobody writes the practice side: what a GP practice can reclaim for parental-leave cover (O13).** Zero keywords, zero competitor pages, one dental sibling at 4.13. To be written it must be **read at source in the SFE Directions 2026**, which is cheap (section 7.5). This limb has no search demand in the harvest, so it will not be measured by section 8's tests; it is there because it is true, useful and uncontested, which is what `language_spec` K1 and the estate's A\*-or-don't-ship bar ask for.
5. **Nobody answers the MA-specific KIT day question.** Three phrasings, 150 volume, BMA answers the SMP-employee version at position 30 or worse. MA's KIT rules differ from SMP's. Small, and free.
6. **Salary sacrifice cuts the SMP you receive, and one sentence on a BMA pensions page is the entire market answer.** pricebailey holds it at 12 and 16, the best peer positions in the cluster, presumably on a page about something else. A page that states it plainly, with the qualifying-week timing, beats a passing clause.

### 5.4 What the page must NOT become

- **Not a maternity pay explainer.** 93.1% of the cluster is out of scope. A page that drifts into SMP rates, leave duration or the NHS occupational scheme has taken half (a) and will be marked as a V6 failure.
- **Not a second pension-during-leave page.** O12 is carried as the self-employed and locum consequence. Seventeen headings re-treating BMA's material is `language_spec` K6 (a section existing only to hold a phrase) and V4 (answering what should be routed).
- **Not a dental page.** Section 1, sibling-site boundary.
- **Not a calculator.** Four calculator-intent rows totalling 1,710 volume are deferred in 7.1. A markdown post will not satisfy them, and the incumbent tool (4.2) is login-gated, so naming the gov.uk route plainly is the better move.

---

## 6. Our current position, read honestly

**There is no page.** `Medical/web/content/blog/maternity-pay-and-maternity-allowance-for-doctors.md` does not exist. This section reports what the corpus currently says on the topic, so the writer knows what they are adding to and what they must not contradict.

**Corpus scan, 79 blog files, read only.**

```bash
cd Medical/web/content/blog
grep -rin "maternity" *.md        # 5 matches, 5 files
grep -ri  "maternity allowance" *.md   # 0 matches
grep -ril "parental leave" *.md   # 1 file
grep -ril "statutory maternity" *.md   # 1 file
```

Every occurrence, in full:

| File | What it says | Status |
|---|---|---|
| `gp-partnership-mutual-assessment-period-what-to-check.md` (FROZEN) | Partnership-deed checklist: read it for "maternity, paternity and sickness provisions", twice (once in an FAQ answer, once as a list item) | Correct and out of scope. **Do not extend it.** The deed question is that page's |
| `gp-partner-vs-salaried-gp-tax-comparison.md` (FROZEN) | "you receive statutory employment rights such as sick pay and maternity or paternity leave" | Correct. This is the one-sentence employed-versus-self-employed contrast our page develops. **Our page must not contradict it and should link to it** |
| `gp-payroll-services.md` (FROZEN) | Practice payroll must cope with "statutory sick pay, statutory maternity, paternity and shared parental pay" | Correct, and it establishes that page as the long-run owner of the **practice-as-employer** payroll obligation. Section 1, adjacent-page discipline |
| `gp-practice-income-pcse-statement-reconciliation.md` (batch 1) | PCSE statement code table row: `LOCADG \| Locum allowances, maternity and paternity` | **This is the closest the corpus comes to O13, and it is one cell of a code table.** O13 is genuinely unwritten. That page gets one sentence and a link per the ownership map |

**Read against the market: 61 of 61 addressable phrasings absent, and the corpus's entire maternity vocabulary is four incidental clauses and one table cell.** This is the batch-1 diagnosis (`language_spec` Part 2: 1,141 of 1,242 market phrasings absent) in its purest form, except that here the subject matter is absent too, not just the words.

**What the corpus gives this page for free, and it must be used rather than re-explained.** `house_positions.md` already locks, at primary source and verified 2026-08-26: Class 2 NIC treatment and the £3.65 voluntary weekly rate for 2026/27 (§8 and the verification log); the employer contribution rate of 23.7%; the tiered member contribution bands from 1 April 2026 (O1's, one sentence only); the 10-week locum forms rule and the 28 February Type 1 and Type 2 deadlines (§2.C); the annual allowance framework (O2's, one sentence only); and the SFE Directions 2026 as a **downloadable and text-extractable** document (§3.A). That last one is what makes O13 cheap.

**What the corpus does not give this page, and this is the gate.** `house_positions.md` carries **no position at all** on Maternity Allowance rates, SMP rates for 2026/27, the MA small-earnings route, or the SFE 2026 parental-leave reimbursement provisions. A grep for `maternity|parental|SMP|adoption` across the whole file returns **one match**, and it is the Global Sum paragraph mentioning "notionally annual". **This page cannot be drafted until section 7.5 has been run.** `BATCH2_INDEX.md` §5 records this as a prerequisite on this item specifically.

---

## 7. Deterministic acceptance criteria

### 7.1 Exact phrases that must appear (verbatim, case and punctuation normalised), **25 required**

Drawn **exclusively from half (b)**, section 3.4. **No phrase from half (a) is required, encouraged or permitted as a placement target.** Ordered peer-winnable first, then by volume. Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary` or body prose.

**Binding rule V1 governs this list. Two word orders per idea per page, hard cap.** The pension-during-leave family alone has **fourteen** word orders in the harvest between 90 and 210 volume each. That is not licence for fourteen; it is licence for **two**, and the other twelve are reported as unplaced. The MA-amount family has four orders and gets two. The SMP-versus-MA family has five and gets two. Every deferral below names V1 where V1 is the reason.

**Tier A, peer-winnable, 5 of 5 required:**

| # | Phrase | Vol | Best peer pos |
|---|---|---|---|
| 1 | how much is maternity allowance | 2,900 | bhp.co.uk 20 |
| 2 | how much is maternity allowance uk | 320 | bhp.co.uk 20 |
| 3 | maternity allowance rate | 110 | bhp.co.uk 16 |
| 4 | salary sacrifice pension and maternity leave | 50 | pricebailey.co.uk **12** |
| 5 | salary sacrifice pension maternity leave | 50 | pricebailey.co.uk 16 |

**Tier B, by volume, 20 required:**

| # | Phrase | Vol | # | Phrase | Vol |
|---|---|---|---|---|---|
| 6 | self employed paternity pay | 720 | 16 | how many weeks is maternity allowance | 90 |
| 7 | what is maternity allowance | 1,600 | 17 | how do you qualify for maternity allowance | 110 |
| 8 | what is maternity allowance uk | 70 | 18 | who is eligible for maternity allowance | 90 |
| 9 | difference between maternity pay and maternity allowance | 260 | 19 | is statutory maternity pay pensionable | 90 |
| 10 | maternity pay vs maternity allowance | 110 | 20 | employer pension contributions during maternity leave | 90 |
| 11 | maternity allowance claim pack | 260 | 21 | how is maternity allowance calculated | 70 |
| 12 | maternity leave and pension contributions | 210 | 22 | maximum maternity allowance | 40 |
| 13 | pension contributions during maternity leave | 170 | 23 | keeping in touch days maternity allowance | 50 |
| 14 | maternity allowance test period | 210 | 24 | maternity allowance and kit days | 50 |
| 15 | how long maternity allowance paid for | 210 | 25 | how often is maternity allowance paid | 70 |

Required volume: **8,000** of the addressable half's 16,810.

**Deferred with reason, 36 rows, 8,810 volume, named so the ledger balances.**

- **V1 word-order cap, 28 rows, 6,690 volume.** Pension-during-leave family, twelve deferred orders (`maternity leave pension contributions`, `pension contributions and maternity leave`, `pension contributions maternity leave`, `pension contributions on maternity leave`, `pension contributions when on maternity leave`, `pension contribution during maternity leave`, `pension contributions while on maternity leave`, `pension during maternity leave`, `pension while on maternity leave`, `pensions and maternity leave`, `maternity leave pension`, `pension maternity leave`, `pension on maternity leave`, `pensions maternity leave`). MA-amount family (`how much maternity allowance`, `how much do you get maternity allowance`, `maternity allowance pay`). MA-definition family (`what is maternity allowance in uk`, `maternity allowance meaning`). MA-eligibility family (`how to qualify for maternity allowance`, `can i claim maternity allowance`, `maternity allowance criteria`, `maternity allowance requirements`). SMP-versus-MA family (`maternity allowance and maternity pay`, `maternity pay and maternity allowance`, `maternity pay maternity allowance`). Test-period family (`test period maternity allowance`). KIT family (`kit days maternity allowance`).
- **Tool intent, belongs to another surface, 5 rows, 1,770 volume.** `maternity allowance calculator` (1,000), `maternity allowance test period calculator` (320), `maternity pay calculator after tax` (260), `test period calculator maternity allowance` (140), `test period table maternity allowance` (50). A markdown post does not satisfy a calculator intent (the McCloud pack's finding, restated). The page may **name** the gov.uk MA test-period route and say what it does; it may not imply it has a tool. **Recorded as a delta for a possible `/calculators/` surface, not an instruction to build one.**
- **Navigational / DWP service intent, 3 rows, 350 volume.** `check your maternity allowance dates` (210), `maternity allowance contact number free 0800 0345` (90), `maternity allowance final payment` (50). These are people looking for the DWP's own service. We do not compete for a government phone number.

**Ledger for floor 7: 0 already-covered + 25 assigned-and-required + 36 deferred-with-reason + 0 encouraged-not-required = 61. Balances against section 3.4's 61 rows.**

**The 336 half-(a) keywords, 227,310 volume, are excluded at cluster level by the section 3.2 split rule, not deferred at phrase level, and they are not part of this ledger.** That exclusion is itself an acceptance criterion: see 7.6 floor 9.

### 7.2 Equity preservation, **0 queries**

The page does not exist. Google equity zero, Bing equity zero of 648 site-level queries (section 2). **Floor 5 is vacuous and is recorded as vacuous, count 0 of 0.** No revert-on-equity-loss trigger applies.

### 7.3 Protected elements

NET-NEW. Nothing pre-exists, so nothing is byte-identical-protected. **Required frontmatter keys:** `slug` (must equal `maternity-pay-and-maternity-allowance-for-doctors`), `canonical`, `date`, `category`, `image`, `imageCredit` (**exactly one occurrence**, never duplicated), `altText`, `schema`. The body is raw HTML inside the markdown file.

### 7.4 Arithmetic and figures that must recompute

**This page's central number, the Maternity Allowance weekly rate, is NOT in house positions and must not be written from memory or from a competitor.** Competitor 4.4 states £172.48 and £27 against a 2023/24 tag; **those figures must not be copied.** Every figure below is either verified at source per 7.5 or framed as "confirm the current figure at source", exactly as the GMC retention fee is handled.

| Statement | Source | Must equal |
|---|---|---|
| MA full weekly rate, 2026/27 | gov.uk maternity pay and leave rates, **7.5 row 1** | **UNVERIFIED at pack time.** Verify, date-tag "2026/27", or write "confirm the current figure at source" |
| MA reduced (small-earnings) weekly rate, 2026/27 | 7.5 row 1 | Same treatment |
| SMP: 90% of average weekly earnings for the first 6 weeks, then the lower of the standard rate and 90% for 33 weeks | 7.5 row 1 | Structure may be stated; **the rate must be verified** |
| MA payable period | 7.5 row 1 | **39 weeks** for the full rate. Verify the reduced-rate period at source (4.4 says "up to 39 weeks"; do not rely on it) |
| MA test period | 7.5 row 1 | **66 weeks** ending the week before the expected week of childbirth; **26 weeks** of employment or self-employment within it; earning at or above the MA threshold in **13** of those weeks. Verify all four numbers |
| Class 2 NIC position, 2026/27 | `house_positions.md` §8 and verification log, verified 2026-08-26 | Treated as paid at or above the Small Profits Threshold from **6 April 2024**; **voluntary Class 2 £3.65 per week** for 2026/27. **This is locked ground truth and may be stated** |
| Class 4 NIC, if stated | `house_positions.md` §8 | **6%** £12,570 to £50,270, **2%** above. 2026/27 |
| Personal allowance and bands, if stated | `house_positions.md` §5 | £12,570; 20% to £50,270; 40% to £125,140; 45% above. 2026/27. **O3 caps this at one sentence and a link** |
| NHS employer contribution rate, if stated | `house_positions.md` §2.C | **23.7%** of pensionable pay, applicable from 1 April 2024, still current 2026/27 |
| NHS member contribution tiers | **O1's fact.** One sentence, no table | Bands uplifted **1 April 2026**. No figures on this page |
| Locum GP forms clock, if stated | `house_positions.md` §2.C | **10 weeks**, and a missed window is an irrecoverable loss of accrual, not a late-filing penalty |
| Type 1 / Type 2 deadline, if stated | `house_positions.md` §2.C | **28 February** a year in arrears; 2025/26 due 28 February 2027 |
| SFE parental-leave reimbursement provisions | 7.5 row 2 | **UNVERIFIED at pack time.** Read at source or write "confirm the current provisions in the Statement of Financial Entitlements Directions 2026" |
| GMC retention fee | `house_positions.md`, **UNVERIFIED** | **No figure. Ever.** F5 hard fail |
| Global Sum, QOF point value | `house_positions.md` §3.A | **No figure on this page.** F5 hard fail. See the O10 trap note in section 1 |

**One worked example, per `language_spec` G1**, because the topic involves a threshold and a calculation. It must satisfy G2 to G7: positioned immediately after the H2 stating the rule; five components in order (named illustrative persona with role and rounded figure, inputs, arithmetic step by step, result, one sentence on what changes the answer); persona is a role plus an initial only; 80 to 200 words; **the heading above it must not be the words "Worked example"** and it must not open with a "Worked example:" prefix (G6 and J4, hard fail). The natural example is a locum GP whose 13 highest-earning weeks in the 66-week test period drive the MA amount, showing the 90%-of-average-weekly-earnings computation against the cap. **Every rate it uses must already have been stated in the body with its year.**

### 7.5 Statutes and sources to re-verify at source before publication

**This page is one of the three that `BATCH2_INDEX.md` §5 gates on a house-positions extension. It cannot be drafted until rows 1 and 2 are read at primary source and written into `docs/medical/house_positions.md`.**

| # | What | URL | Why, and how hard |
|---|---|---|---|
| **1** | **Maternity Allowance weekly rate and the small-earnings (reduced) rate for 2026/27; SMP rates for 2026/27; the 66-week test period, the 26-week and 13-week conditions, the 39-week payable period; the MA claim form name** | https://www.gov.uk/maternity-pay-leave , https://www.gov.uk/maternity-allowance , and the gov.uk rates-and-thresholds publication for 2026 to 2027 | **The page's central figures. Named in `BATCH2_INDEX.md` §5 as a prerequisite on this item.** Competitor 4.4's figures are three tax years stale and must not be used. Where a figure cannot be pinned at source it is framed as **"confirm the current figure at source"** and **NEVER asserted**, exactly as the GMC retention fee is handled |
| **2** | **The SFE 2026 parental-leave reimbursement provisions for GP practices: what a practice can reclaim for maternity, paternity, adoption and shared parental leave cover, the conditions and any caps** | https://assets.publishing.service.gov.uk/media/69cbe5032d120d9d5ec0f352/general-medical-services-statement-of-financial-entitlements-directions-2026.pdf | **O13. This is cheap and there is no excuse for guessing.** Per `house_positions.md` §3.A, this exact PDF **is downloadable with `curl`** (1,708,434 bytes) and **text-extractable with `pdftotext -layout`** (324,324 characters of clean text). That is how Global Sum £130.07 was verified on 2026-08-26. The earlier failure was a text-extraction failure inside the fetch tool, not an access failure. **Extract, search for the parental-leave payment provisions, quote verbatim into house positions.** While in the document, **do not** bring back the Global Sum or QOF figures: O10 |
| 3 | Class 2 National Insurance treatment and the voluntary weekly rate for 2026/27 | https://www.gov.uk/self-employed-national-insurance-rates | Already locked in `house_positions.md` (verified 2026-08-26: £3.65 per week voluntary). Re-confirm on the day, because it is the switch between full-rate and reduced-rate MA and is the page's best paragraph |
| 4 | NHS Pension Scheme treatment of maternity and other statutory leave: deemed pay, arrears on unpaid leave, KIT-day pensionability, and the locum position | https://www.nhsemployers.org/ member and contribution publications | O12. **NHSBSA's own member-hub pages return HTTP 403 to automated fetches** (`house_positions.md` verification log), so NHS Employers is the fetchable authority. Competitor 4.6 is a good map of what to look for and is **not** a citable source |
| 5 | NHS employer contribution rate 23.7% | https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions | Only if stated. Locked, re-set expected for 2027/28 |
| 6 | Statutory Maternity Pay and salary sacrifice: that a sacrifice reduces the average weekly earnings SMP is computed on | HMRC guidance on salary sacrifice and statutory payments | The two best peer positions in the cluster hang on this. **Verify before asserting**; competitor 4.10 states it in one clause and is a union page, not a source |
| 7 | Locum GP pension forms A and B, the 10-week rule | https://pcse.england.nhs.uk/services/gp-pensions/locum-gps/submit-locum-b-forms | Locked in `house_positions.md` §2.C. Re-confirm if the page states it |

**UNVERIFIED figures, hard rule F5.** The **GMC annual retention fee**, the **Global Sum per weighted patient** (outside its locked 2026/27 use, which this page has no reason to make) and the **QOF point value** must not appear as figures on this page. The topic requires none of them, so the expected outcome is absence. If a draft introduces one, the criterion is that the block instead reads "confirm the current figure at source" and is named for QA.

### 7.6 The floors, made countable

| Floor | Requirement on this page | Count |
|---|---|---|
| 1. Arithmetic | Every figure and date in 7.4 correct and date-tagged per F1. No bare figure | 15 rows checked |
| 2. Statute | Every source in 7.5 re-verified on the day of writing. **Rows 1 and 2 written into `house_positions.md` BEFORE drafting** | 7 sources, 2 blocking |
| 3. Links | Zero broken internal links repo-wide. Every ownership-map link resolves. **Resolve calculator links by reading the `slug` field in `Medical/web/src/lib/tools/configs/*.ts`, never by file name** (`language_spec` coordinator ruling 5) | 0 broken |
| 4. Coverage | The 25 phrases in 7.1 placed. The checker names any that are not | 25 placed, 0 unplaced |
| 5. Equity preservation | **Vacuous. Recorded as 0 of 0**, not skipped | 0 of 0 |
| 6. Cluster coverage | Same matcher, 7.1 input | 25 placed, 0 unplaced |
| 7. Reconciliation balance | 0 covered + 25 assigned + 36 deferred + 0 encouraged = **61** | Must balance |
| 8. Competitor re-read | All **30** heading themes in 4.14 marked covered, declined-with-reason, or belongs-to-another-page. **Undecided count 0.** The **three 403 URLs** (4.5, 4.11, 4.12) recorded as fetch-failed, themes unknown | 30 decided, 3 URLs flagged |
| **9. Scope, and it is specific to this page** | **Zero phrases from half (a) placed as targets.** The checker greps the drafted page for the 336 half-(a) keywords and reports any that appear as a heading, an FAQ question or a `keyTakeaways` line. Incidental prose occurrence of the words "maternity pay" is expected and fine; a **heading built around a half-(a) phrase is a V6 failure and a BLOCK** | 0 half-(a) headings |

### 7.7 Rules V1 to V6, made countable on this page

| Rule | Requirement | How QA counts it |
|---|---|---|
| **V1** | **Two word orders per idea per page. Hard cap.** | Group the 25 placed phrases into idea families and count orders per family. **Any family with 3 or more placed orders is a defect.** Expected families and counts: MA amount 2, MA definition 2, MA eligibility 2, SMP-versus-MA 2, MA duration 2, MA rate/cap 2, pension-during-leave **2**, salary sacrifice 2, KIT days 2, and seven singletons. **The pension family is the one to watch: fourteen orders exist and exactly two may appear** |
| **V2** | **Never narrate the keyword research.** | String search for "also searched as", "also written as", "people also search", any body sentence telling the reader two phrasings mean the same thing, and any table column of variants. **Any hit is a BLOCK.** This was shipped live in batch 1 and blocked |
| **V3** | **Every fact has one owning page.** | Count sentences on each constrained row: **O1 ≤ 1 sentence and no table; O2 ≤ 1; O3 ≤ 1; O8 ≤ 1**. Each must be followed by a link. **Three sentences on O3 means the writer has taken item 5's fact and the page is held.** Count sentences on each owned row: **O11, O12, O13 each ≥ 1 substantive section** |
| **V4** | **A hub routes, it does not answer.** | This page is not a hub, so V4 binds in the reverse direction: it must not be **routed away from** its own owned facts. O11, O12 and O13 must be answered here, not deferred to a link |
| **V5** | **One rhetorical construction, maximum twice per page.** `"it is not X, it is Y"` capped at **once per page across the whole batch** | Count constructions. Also J6: no repeated triadic rhythm, no repeated "not only X but Y". Batch-level watch is the conductor's job, not this writer's |
| **V6** | **Vocabulary placement never overrides the page's own topic.** | **The binding rule for this pack.** Two counts: (a) floor 9, zero half-(a) headings; (b) the writer's own unplaced report. **Any of the 25 required phrases that cannot be placed as natural English is reported as unplaced with the sentence that was attempted, and is NOT forced.** An unplaced report is a pass; a forced placement is a defect |

### 7.8 Named factual requirements the draft must meet

1. **MA and SMP are mutually exclusive.** A claimant entitled to SMP cannot claim MA. Stating them as alternatives a claimant chooses between on preference is a BLOCK.
2. **MA is a DWP benefit, not a payment from an employer or from the NHS.** Describing it as paid by a practice, a trust or the NHS Pension Scheme is a BLOCK.
3. **MA is not pensionable and does not accrue NHS Pension Scheme service.** If this cannot be confirmed at 7.5 row 4, the page states what it can confirm and does not assert the rest.
4. **The full-rate versus reduced-rate fork turns on Class 2 National Insurance in the test period, not on income tax.** Conflating the two is a BLOCK.
5. **A self-employed or locum GP's position is different from a salaried GP's, and both differ from a GP partner's.** The page must state which structure it is talking about in every substantive claim (`house_positions.md` §1: partner self-employed on profit share, salaried GP an employee under PAYE, locum usually a sole trader or a PSC). A claim that does not name its structure is a defect.
6. **No page in this batch may state a QOF point value or a GMC fee.** F5.
7. **No dental framing.** Section 1 boundary. `Net Pensionable Earnings`, `dental performer`, `£1,660`, `£3,630` are each a BLOCK.
8. **Where a rate cannot be pinned at source, the page says "confirm the current figure at source" and states no number.** F7 and the GMC precedent.

---

## 8. Stated expectation

Written before the work, so a later read has something to fail.

### 8.1 The number this page is NOT aimed at, stated first so it cannot be misread later

> **The 244,120 headline volume is NOT the target of this page.** 227,310 of it, 93.1%, is BMA-held employment-pay vocabulary that section 3.2 excludes by rule and section 3.3 excludes by reason. **A read that scores this page against 244,120, or against any traffic expectation derived from it, is measuring something the page was never aimed at and its verdict is void.**
>
> **The target is the addressable half: 61 keywords, 16,810 volume, 3,430 peer-winnable.** Every test below names phrases from that half only.

### 8.2 Engine, window and baseline

Bing is the 14 to 28 day read; Google the 28 to 90 day read (`REWRITE_PROGRAM.md` §9.6). The measurement reality: Google indexes roughly **21 of 130 URLs** on this site, driven by low domain authority, not by a technical defect. **Bing indexes it fully and sends 3.4x the Google clicks.**

**Baseline, with its command.** `BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')`, pulled 2026-08-26: **648 site-level queries, 0 matching `maternity|paternity|parental|adoption`.** Google: URL does not exist, 0 rows. **The page starts from a measured zero on both engines, on a family the site has never matched on.**

### 8.3 Bing, 14 days after deploy

**Primary test: does the page exist in the index and does it match anything in the addressable half.**

Target: **at least 1 Bing impression on at least 1 of these five named phrases**, all Tier A or high-volume Tier B from 7.1:

1. `how much is maternity allowance`
2. `what is maternity allowance`
3. `self employed paternity pay`
4. `difference between maternity pay and maternity allowance`
5. `maternity allowance test period`

A net-new page on a low-authority domain failing to surface in fourteen days is normal, not a defect. This is a liveness check, not a performance test.

### 8.4 Bing, 28 days after deploy

**Primary test: phrase coverage, not total traffic.**

- The named-query count for this URL rises from **0 to at least 6**, and **at least 4 of those 6 must contain the token `allowance`**. That token is the discriminator between the two halves: `maternity pay` alone is half (a) and is not evidence this page worked.
- Impressions **at least 15**.
- **At least 1** of the five Tier A peer-winnable phrases in 7.1 appears as a named query with non-zero impressions. Tier A is only 3,430 volume, so this is deliberately modest and therefore falsifiable.

**Per §9.6 point 2: total traffic rising while the named phrases stay missing is a FAIL, not a pass, and is recorded as drift.** This matters more here than on any other page in the batch, because this cluster has 227,310 volume of adjacent vocabulary the page could accidentally attract. **Impressions arriving on half-(a) phrasings such as `maternity pay`, `nhs maternity pay` or `how much maternity pay` are NOT a success. They are evidence the page drifted out of scope and are recorded as a V6 finding, not as traffic.**

### 8.5 Google, 28 to 90 days

**No expectation is set, and that is deliberate.** On a corpus where Google indexes 16% of URLs, a new page not being indexed at 28 days carries no information. The batch-2 index reserves the one Google observation worth recording for item 5, not for this page.

**One Google observation is worth recording here if it happens**, and it is a bonus rather than a target: `how much is maternity allowance` (2,900) is held by **bhp.co.uk at position 20** on a 650-word post carrying 2023/24 figures. If Google indexes this page at all inside 90 days, that row is the one where a current, deeper, doctor-specific page should move first. **Record the outcome either way; do not treat a miss as a failure.**

### 8.6 Leads and conversion

**No lead target, at any horizon.** This is an informational page. `BATCH2_INDEX.md` §8 reserves the conversion expectation for item 2, the only page in the batch a reader can convert on. Attributing a lead to this page would be attributing it to the site.

### 8.7 Failure trigger, written as a number, before the work

> If, in a 28-day window after deploy, Bing impressions on `/blog/maternity-pay-and-maternity-allowance-for-doctors` are **below 3**, **or** the Bing named-query count for this URL is **below 2**, **or** fewer than **1** named query contains the token `allowance`, the page has not established itself on the half it was written for.
>
> **The remedy is NOT revert.** There is no equity to restore and no prior state to return to. The remedy is a **scope re-read**: check whether the impressions that did arrive sit in half (a), and if they do, record it as a V6 drift finding and re-scope the headings toward the `allowance` vocabulary before spending anything further. Deletion is available (section 1) and is the correct move only if the page has attracted **zero** impressions on **both** halves across two consecutive 28-day windows, which would mean it is not indexed at all.

### 8.8 Tracker fields to populate at rewrite time

Reuse, do not build (§9.6). One `monitored_pages` row with both engines' baselines from 8.2 (Google 0, Bing 0 of 648). `blog_optimizations.target_keywords` set to the **25 phrases in 7.1**, drawn from the addressable half only. **`target_keywords` must not contain a single half-(a) phrase**, because that is how a later automated read would come to score this page against 244,120.

**No monitor is created by this pack.** Registration in `monitored_pages` is a separate owner-triggered step and has not been done. No alert, cron, tripwire, digest or scheduled job was created.

---

## Corrections and contradictions

Recorded rather than harmonised, per the batch-1 convention.

1. **The dossier's peer-winnable figure for this cluster is wrong, and it is the same error the batch-2 index found on "pension opt out".** `cluster_dossier_2026-08-26.md` §4 row 12 records "how much is maternity allowance" as **22 keywords, 9,490 volume, 0 peer-winnable**. Re-derived against the §2a peer set on the same persisted harvest, the maternity family is **397 keywords, 244,120 volume, 4,220 peer-winnable**, of which **3,430 sits in the addressable half**. The stated zero is wrong for the same reason the opt-out zero was wrong: **`bhp.co.uk` is a peer** (`competitor_universe_2026-08-26.md` §2a rank 15) and it holds `how much is maternity allowance` at position 20, `maternity allowance rate` at 16 and nineteen other in-cluster rows. **This is correction 2's pattern repeating, and it is now the third cluster where the dossier's peer-winnable column understates against the §2a set.** Worth a systematic re-derivation of the whole §4 table before batch 3.

2. **The dossier's §5 "best position" for this cluster's head term is wrong.** §5 lists `how much is maternity allowance | 2,900 | best pos 31 | bma.org.uk`. The harvest returns two rows for that keyword:

   ```sql
   select competitor_domain, position, search_volume, url from dataforseo_competitor_data
   where site_key='medical' and date_pulled='2026-08-26'
     and ranked_keyword='how much is maternity allowance' order by position;
   -- bhp.co.uk        20  2900  https://bhp.co.uk/news-events/blog/maternity-allowance/
   -- bma.org.uk       31  2900  https://www.bma.org.uk/.../maternity-leave-pay-entitlements-under-the-nhs-scheme
   ```

   **Best position is 20, held by bhp.co.uk, not 31 held by bma.org.uk.** The dossier reported the second-best row. Since §5's whole purpose is to show how hard each absent phrase is, reporting the worse of two positions makes the field look harder than it is. **Flagged, not harmonised.**

3. **The keyword count disagrees with the dossier by 18x, in the expected direction and for the stated reason.** Dossier row 12: 22 keywords. This pack's regex: 397. `BATCH2_INDEX.md` §9 point 1 predicts exactly this: the packs rebuild keyword sets by term-family regex over the persisted harvest rather than by re-running the dossier's seed-node clustering, so counts differ in both directions. Here the regex is far wider because it takes the whole `maternity|paternity|shared parental|adoption pay` family rather than an MA-centred cluster. **The wide set is the right measure of the SERP; the section 3.4 addressable set of 61 is the right measure of what this page can honestly target.** Both are printed, as the index requires.

4. **A third competitor URL returned 403, not the two the task brief anticipated.** `simpkinsedwards.co.uk/articles/what-employers-need-to-know-about-2025-26-statutory-rate-changes` failed alongside both pricebailey URLs. Recorded at 4.12. Final fetch outcomes: **10 of 13 read at 200, 3 returned HTTP 403** (pricebailey x2, simpkinsedwards x1).

5. **`house_positions.md` carries no maternity position at all, and the gap is total.** A grep for `maternity|Maternity|parental|SMP|adoption` across the whole file returns **one** match, and it is the Global Sum paragraph in §3.A using the word "notionally". Not one line on MA, SMP, the small-earnings route, pension treatment of statutory leave, or the SFE parental-leave provisions. `BATCH2_INDEX.md` §5 records this as a prerequisite; this pack confirms it is not a partial gap that could be worked around but a complete absence. **Section 7.5 rows 1 and 2 are blocking.**

6. **The "section rather than page" option was not merely rejected, it was unavailable, and that should be visible to whoever reads this later.** All three candidate host pages (`gp-payroll-services`, `locum-doctor-tax-complete-guide`, `nhs-pension-for-locums-form-a-form-b`) carry `monitor_until = 2026-09-10`. If the verdict in 5.1 is ever revisited, revisit it **after 2026-09-11**, when the section route reopens and the O12 limb in particular could reasonably move onto a pension page. The reasoning in 5.2, that O12 alone would be a section rather than a page, is recorded precisely so that later reader has it.

7. **One deliverable in this cluster has no search demand and will not be measured.** O13, GP practice reimbursement for parental-leave cover, returns **zero keywords** in a 32,872-row harvest, because no domain among the 27 harvested runs the page. It is written because it is true, useful and uncontested, not because a number says so. **No test in section 8 covers it, and its absence from the results is not evidence it was wrong to write.** This is the `BATCH2_INDEX.md` §7 pattern (a gap in the competitor set, not a gap in the market) appearing inside a packable cluster rather than blocking one.
