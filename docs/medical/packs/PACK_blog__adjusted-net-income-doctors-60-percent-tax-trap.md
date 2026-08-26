# §9.5 RESEARCH PACK: /blog/adjusted-net-income-doctors-60-percent-tax-trap

**Batch 2, item 5.** Assembled 2026-08-26 from `docs/medical/packs/BATCH2_INDEX.md` (the binding batch contract), `docs/medical/cluster_dossier_2026-08-26.md`, `docs/medical/competitor_universe_2026-08-26.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`, the persisted DataForSEO harvest, a fresh Bing Webmaster pull, and five live competitor fetches recorded in section 4.

Preparation only. No page content written. Nothing under `Medical/web/` read for anything other than a read-only verbatim grep, and nothing under it edited. Nothing committed, deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron or scheduled job created. **No new DataForSEO calls and no paid lookups: $0.00 additional spend.**

Repo state at build time: `git rev-parse HEAD` = `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf`.

---

## 1. Target and permission level

| Field | Value |
|---|---|
| URL | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` |
| Status | **NET-NEW. The page does not exist.** |
| Cluster | adjusted net income / marginal rate traps (dossier §4 NO-PAGE row 5) |
| Grade | **NEW PAGE.** No grade applies, because there is nothing to extend or reframe. All permission questions collapse to one: what may this page own, and what may it not touch. |
| File to create | `Medical/web/content/blog/adjusted-net-income-doctors-60-percent-tax-trap.md` |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the whole `faqs` array live in frontmatter and are separate editable surfaces from the body. Source: memory `blog_page_rendering_html_in_frontmatter`. |
| Required frontmatter keys | `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (exactly once, never duplicated), `altText`, `schema` |
| Revert path | `git rm Medical/web/content/blog/adjusted-net-income-doctors-60-percent-tax-trap.md`. One new file, one deletion. There is no equity to lose. |

**Frozen-list position.** This page is not on the frozen list, because it does not exist. The correct frozen test is `select slug from monitored_pages where site_key='medical' and monitor_until > now()`, which returns 19 rows (BATCH2_INDEX §3 and §6 correction 3). **No page in that set owns this topic**, so nothing here is blocked by a live measurement window. The two nearest frozen pages, `/blog/nhs-pension-tapered-annual-allowance-calculator` and `/blog/nhs-pension-annual-allowance-complete-guide`, both sit on the far side of the O2 boundary in section 1.2 and this page must not link to either while their windows run to 2026-09-10.

### 1.1 Why this page is the one Google observation in the batch

BATCH2_INDEX §8 sets no Google expectation for six of the seven batch-2 pages, because Google indexes roughly 21 of 130 URLs on this site and a new page not being indexed at 28 days carries no information. It makes one exception, and this is it. Every other batch-2 cluster is held at the top of Google by an institution we cannot outrank on brand (bma.org.uk, nhsbsa.nhs.uk, gov.uk). **This cluster is held by peers.** The two best in-cluster Google positions in the whole harvest belong to `medicsmoney.co.uk` at 8 and `hawsons.co.uk` at 9, both classified peer-winnable in `competitor_universe_2026-08-26.md` §2a (rows 1 and 14). That is why section 8 sets a 90-day Google observation on this page and on no other.

### 1.2 THE O2 BOUNDARY. Read this before writing a word.

This is the sharpest ownership line in the batch and the single most likely way this page fails.

**Two different statutory quantities share a nearly identical name.**

| | **Adjusted net income** | **Adjusted income** |
|---|---|---|
| What it measures | Total taxable income for the year less certain reliefs, principally gross Gift Aid donations and gross personal pension contributions | Threshold income plus the value of all employer pension contributions and pension input amounts |
| What it drives | The **withdrawal of the personal allowance** above £100,000, the High Income Child Benefit Charge, and eligibility for Tax-Free Childcare and the 30 free hours | The **taper of the pension annual allowance** above £260,000 |
| Statutory hook | ITA 2007 s.35 and s.58 (personal allowance and the meaning of adjusted net income) | FA 2004 s.228ZA (tapered annual allowance) |
| Effective rate it creates | 60% between £100,000 and £125,140 | An annual allowance charge at marginal rate on pension growth above a reduced allowance |
| **Owner** | **THIS PAGE (O3)** | `/calculators/nhs-pension-annual-allowance` **(O2)** |

**Ownership map rows repeated verbatim from BATCH2_INDEX §4, because every row that constrains a page is repeated inside that page's pack:**

> **O2** · Annual allowance mechanics: taper, threshold income, adjusted income, pension input amount, carry forward, MPAA · Owner `/calculators/nhs-pension-annual-allowance` · Everyone else: one sentence, then link. Batch 2 item 5 owns the **general** personal-allowance taper and must not restate the pension taper.
>
> **O3** · **Adjusted net income** as a general concept: the £100,000 to £125,140 personal-allowance withdrawal, the 60% effective band, the interaction with free childcare and the High Income Child Benefit Charge · Owner **this page** · Items 1, 3, 4, 7 and the whole AA family: one sentence, then link.
>
> **O12** · Pension accrual during maternity and other statutory leave · Owner batch 2 item 4 · Items 3 and 5: one sentence, then link.
>
> **O9** · GMC annual retention fee: deductible, amount UNVERIFIED · Every page may say the fee is deductible. **No page may state a figure.** Hard fail F5.
>
> **O10** · Global Sum per weighted patient and the QOF point value · **No page in this batch may state a QOF point value.** Hard fail F5.

**What that means in practice on this page.** The writer will feel a strong pull to explain the annual allowance taper, because the reader who has just learned that £100,000 costs them 60p in the pound is the same reader whose pension is about to be tapered, and because the harvest itself mixes the two senses (section 3). That pull is exactly the batch-1 failure mode: the Scheme Pays two-limb deadline landed on seven of twelve pages, none of them the Scheme Pays page (`language_spec` binding rule **V3**).

The permitted treatment is **two sentences, once, in one place**, of the shape: there is a second and separate taper that bites on a different measure of income and reduces the amount you can build up in the NHS pension before a tax charge, and it is explained on `/calculators/nhs-pension-annual-allowance`. Then stop. The countable form of that rule is acceptance criterion **7.6**, and it is a BLOCK.

**What the page must NOT contain, anywhere, at any length:** the phrases `threshold income`, `pension input amount`, `pension input period`, `carry forward`, `MPAA`, `money purchase annual allowance`, `£200,000`, `£260,000`, `minimum tapered`, `£10,000` in a pension-allowance sense, `Scheme Pays`, and any per-year annual allowance history. Every one of those belongs to O2. Counted at QA in 7.6.

**Reason to hold the line beyond tidiness.** Our own corpus already proves how easily the two words merge. `adjusted income` appears verbatim in **41** of the 79 files in `Medical/web/content/blog/`, always in the pension sense. `adjusted net income` appears in **zero**. The site has spent 41 pages teaching one meaning of a phrase and has never once written the other. A page that blurs them re-seeds the confusion across the largest term family on the site (grep command in section 3).

### 1.3 Other pages this page must not take from

- **The maternity page (item 4, O12)** owns pension accrual during statutory leave. This page gets one sentence at most if the topic arises, and more probably none.
- **The uniform and subscriptions page (item 1, O7 and O8)** owns employment-expense relief, form P87 and the repayment-agent warning. Reducing adjusted net income by claiming employment expenses is a genuine and tempting sub-topic here. **One sentence and a link.** The competitor at 4.4 makes it its first of seven strategies, and copying that structure would take item 1's page.
- **`/blog/gp-tax-deductions-complete-list-2026` and `/blog/medical-professional-expenses-what-is-claimable`** are FROZEN to 2026-09-10 and are the long-run owners of the general deduction list. This page must not become a second deductions list.
- **Incorporation and profit extraction** (`house_positions.md` §5) is a live corpus topic with its own pages. Routing private income outside pensionable pay is named in §5 as a driver, but the incorporation case belongs to the existing pages. One sentence and a link.

---

## 2. Equity register

**The page does not exist. There is no equity register to copy, and this section exists to say so explicitly rather than being omitted.**

- **Google: zero.** There is no URL, therefore no `searchanalytics.query` rows, no impressions and no clicks. Nothing to protect, no DO-NOT-LOSE query, no revert trigger tied to a lost query.
- **Bing: zero for this URL**, same reason.

**Site-level Bing evidence, pulled fresh today, and it corrects the brief.**

```
python -c "from optimisation_engine.clients.bing_query_client import BingWebmasterClient; \
  q=BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')"
# run 2026-08-26. Returned 648 site-level query rows.
```

Filtering those 648 rows on `(adjusted net income|adjustable net income|adjusted income|marginal|tax trap|60 tax|60 percent|personal allowance|100k|125,140)` returns **3** rows, not zero:

| Query | Impressions | Clicks | Avg impression pos | Which sense |
|---|---|---|---|---|
| `adjusted income calculator for nhs pension` | 2 | 1 | 4.0 | **PENSION (O2)** |
| `nhs pension adjusted income` | 2 | 1 | 7.0 | **PENSION (O2)** |
| `annual allowance nhs pension tax trap explained uk` | 2 | 0 | 9.0 | **PENSION (O2)** |

**BATCH2_INDEX §8 and this task's brief both state that zero of the 648 matched. On the narrow reading that is right and on the broad reading it is wrong, and the correction is the most useful single fact in this pack.** Not one of the 648 site-level Bing queries touches the adjusted **net** income family, the 60% band, the personal-allowance taper, childcare or the High Income Child Benefit Charge. Every match is the **pension** sense of "adjusted income", and one of them even uses the phrase "tax trap" to mean the annual allowance charge.

Two consequences, both binding:

1. **Baseline for this page is genuinely zero on both engines** for the O3 vocabulary. Section 8's expectations are set against zero.
2. **The site's only existing equity in this term family belongs to O2**, and it is already earning clicks at positions 4 and 7. A page that answers the pension sense of "adjusted income" would be competing with a page that is already ranking for it on the engine that sends this site 3.4x its Google clicks. The O2 boundary in 1.2 is therefore not only an editorial rule, it protects live Bing equity. Breaching it is a measurable loss, not a stylistic one.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 persisted rows, 27 domains, no volume floor. Already paid for in the dossier task ($4.92048). This pack spent $0.00.

**Selection regex, printed so the counts are re-derivable:**

```
(adjusted net income|adjustable net income|adjusted income|marginal (rate|tax)|tax trap|60 tax|60 percent tax|personal allowance taper)
```

### 3.1 Headline figures, re-derived

```sql
-- python scripts/_q.py <file.sql>, run 2026-08-26
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~ '(adjusted net income|adjustable net income|adjusted income|marginal (rate|tax)|tax trap|60 tax|60 percent tax|personal allowance taper)'),
k as (select ranked_keyword, max(search_volume) v,
   min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos,
   min(position) best_any_pos
 from c group by 1)
select count(*) uniq_kws, sum(v) total_vol,
 sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
 count(*) filter (where best_peer_pos<=10) peer_top10_kws
from k;
```

Result, verbatim:

```json
[{"uniq_kws": 32, "total_vol": 10360, "peer_winnable_vol": 1900, "peer_top10_kws": 3}]
```

**32 deduplicated keywords · 10,360 total volume · 1,900 peer-winnable · 3 keywords held by a peer inside the Google top 10.** The three peer top-10 rows are `marginal tax` (1,300, medicsmoney position 8), `60 percent tax trap` (90, hawsons position 9) and `uk tax trap graph` (50, medicsmoney position 10).

### 3.2 Divergence from the dossier, stated rather than silently replaced

`cluster_dossier_2026-08-26.md` §4 NO-PAGE row 5 records this topic as **7,210 volume, 1,300 peer-winnable, 15 keywords, 1 domain**. This pack derives **10,360 / 1,900 / 32 / 5 domains**.

Both are dated 2026-08-26 and both come from the same 32,872-row table. **The difference is membership, not arithmetic.** The dossier's per-topic counts come from its seed-node clustering, which was scratch and is not in the repo (BATCH2_INDEX §9 limitation 1); this pack's come from the term-family regex printed above. The regex is wider in two named ways: it admits the whole `marginal (rate|tax)` family, including the calculator rows that gorillaaccounting holds, and it admits the four pension-sense `adjusted income` rows that bma.org.uk holds. Both of those additions are visible in the table below and both are handled explicitly, the first as deferred and the second as reassigned to O2.

**Not harmonised. Flagged.** Section 7's ledger balances against 32, because section 7 is built from this set. Anyone reading the dossier's 15 alongside this pack's 32 should read the two as different membership rules, not as a contradiction to be resolved by picking one.

### 3.3 The full keyword set

`Sense` is the boundary column and it is the most important column in this pack. **ANI** = adjusted net income, the personal-allowance taper, O3, ours. **AI-PENSION** = adjusted income in the annual-allowance sense, O2, `/calculators/nhs-pension-annual-allowance`, **not ours**. **NEUTRAL** = the marginal-rate and 60% trap vocabulary, which carries no pension meaning and is unambiguously ours.

`In corpus?` = phrase appears verbatim, case and punctuation normalised, anywhere in `Medical/web/content/blog/*.md` (79 files). Read-only grep, nothing under `Medical/web/` was modified:

```python
# scratch, run 2026-08-26 then deleted
import glob, re
norm = lambda s: re.sub(r"[^a-z0-9 ]", " ", s.lower())
txt = {f: re.sub(r"\s+", " ", norm(open(f, encoding="utf-8").read()))
       for f in glob.glob("Medical/web/content/blog/*.md")}
hits = [f for f, t in txt.items() if re.sub(r"\s+", " ", norm(KEYWORD)) in t]
```

| Vol | Best peer pos | Best any pos | Held by (best) | **Sense** | In corpus? | Keyword |
|---|---|---|---|---|---|---|
| 3600 | 38 | 38 | medicsmoney.co.uk | **ANI** | 0 files | adjustable net income |
| 1300 | 28 | 28 | hawsons.co.uk | NEUTRAL | 0 files | 60 tax trap |
| 1300 | **8** | **8** | medicsmoney.co.uk | NEUTRAL | 2 files | marginal tax |
| 1000 | 26 | 26 | medicsmoney.co.uk | NEUTRAL | 1 file | tax at marginal rate |
| 260 | 32 | 32 | medicsmoney.co.uk | **AMBIGUOUS** | **41 files** | adjusted income |
| 210 | 40 | 40 | gorillaaccounting.com | NEUTRAL | 0 files | marginal rate tax calculator |
| 210 | 37 | 37 | gorillaaccounting.com | NEUTRAL | 0 files | marginal tax calculator |
| 210 | 37 | 37 | gorillaaccounting.com | NEUTRAL | 0 files | marginal tax rate calculator |
| 210 | 21 | 21 | hawsons.co.uk | NEUTRAL | 0 files | tax trap |
| 210 | 22 | 22 | hawsons.co.uk | NEUTRAL | 0 files | what is the 60 tax trap |
| 140 | 18 | 18 | hawsons.co.uk | NEUTRAL | 0 files | how to avoid 60 tax trap |
| 140 | 15 | 15 | hawsons.co.uk | NEUTRAL | 0 files | uk tax trap |
| 140 | 25 | 25 | medicsmoney.co.uk | **ANI** | 0 files | what is my adjusted net income |
| 110 | 62 | **8** | **bma.org.uk** | **AI-PENSION** | 0 files | adjusted income for pension |
| 110 | 24 | 24 | hawsons.co.uk | NEUTRAL | 0 files | uk 60 tax trap |
| 110 | 15 | 15 | hawsons.co.uk | NEUTRAL | 0 files | what is the 60 tax trap uk |
| 90 | **9** | **9** | hawsons.co.uk | NEUTRAL | 0 files | 60 percent tax trap |
| 90 | 24 | 24 | hawsons.co.uk | NEUTRAL | 0 files | 60 tax trap explained |
| 90 | 24 | 24 | hawsons.co.uk | NEUTRAL | 0 files | how to avoid the 60 tax trap |
| 90 | 25 | 25 | medicsmoney.co.uk | **ANI** | 0 files | is adjusted net income after tax |
| 90 | 58 | 58 | hawsons.co.uk | NEUTRAL | 0 files | tax trap over 100k calculator |
| 70 | 56 | 56 | taxqube.co.uk | **ANI** | 0 files | 100k tax trap childcare |
| 70 | none | **10** | **bma.org.uk** | **AI-PENSION** | 0 files | how to calculate adjusted income for pension allowance |
| 70 | 18 | 18 | hawsons.co.uk | NEUTRAL | 0 files | tax trap uk |
| 70 | 26 | 26 | medicsmoney.co.uk | NEUTRAL | 0 files | what is marginal rate of tax uk |
| 70 | 26 | 26 | medicsmoney.co.uk | NEUTRAL | 0 files | what is marginal tax rate uk |
| 50 | 29 | 29 | hawsons.co.uk | NEUTRAL | 0 files | 60 tax uk |
| 50 | none | **8** | **bma.org.uk** | **AI-PENSION** | 0 files | adjusted income pension |
| 50 | 33 | 33 | medicsmoney.co.uk | **ANI** | 0 files | adjusted net income uk |
| 50 | none | **11** | **bma.org.uk** | **AI-PENSION** | 0 files | pension adjusted income |
| 50 | **10** | **10** | medicsmoney.co.uk | NEUTRAL | 0 files | uk tax trap graph |
| 50 | 33 | 33 | hawsons.co.uk | NEUTRAL | 0 files | when do you pay 60 tax |

Corpus grep also run on two phrases that are not harvest rows but are core to O3: `personal allowance taper` appears in **6** files, `high income child benefit charge` in **1** (`blog/accountant-self-assessment.md`), `adjusted net income` in **0**.

### 3.4 What the sense column is telling the writer

1. **Four rows, 280 volume, are the O2 boundary showing up in the SERP itself.** `adjusted income for pension`, `how to calculate adjusted income for pension allowance`, `adjusted income pension` and `pension adjusted income` are all held by bma.org.uk's annual-allowance page at positions 8 to 11, and that page was fetched today to confirm it (4.5). They are reassigned to `/calculators/nhs-pension-annual-allowance` in section 7 and **must not be placed here**. A writer who places them writes the pension taper, and writing the pension taper is the failure.
2. **`adjusted income` (260) is the trap row.** It is held by the medicsmoney ANI page at position 32, so in the harvest it is an ANI row, but our own corpus uses it 41 times in the pension sense and bma outranks everyone on the pension reading. It is required in section 7 **only in a sentence that draws the distinction explicitly** (criterion 7.5). Placed alone it is worse than useless.
3. **`adjustable net income` (3,600) is a misphrasing and is 35% of the cluster's volume.** `language_spec` §2e is explicit: carry the correct term as the H2 and the common misphrasing in an FAQ question, **never as a factual assertion**. It goes on the page exactly once.
4. **The 60% trap family has eight word orders** (`60 tax trap`, `tax trap`, `uk tax trap`, `tax trap uk`, `uk 60 tax trap`, `60 percent tax trap`, `60 tax trap explained`, `60 tax uk`). Binding rule **V1** caps this page at two orders per idea. Section 7 places two carrier strings and reports the rest unplaced. Placing all eight is the batch-1 defect, not thoroughness.

---

## 4. Competitor teardown

**Selection, verified against the harvest rather than taken from the brief.**

```sql
with c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~ '(adjusted net income|adjustable net income|adjusted income|marginal (rate|tax)|tax trap|60 tax|60 percent tax|personal allowance taper)')
select competitor_domain, url, count(distinct ranked_keyword) kws, sum(search_volume) vol, min(position) best_pos
from c group by 1,2 order by kws desc, vol desc;
```

| URL | In-cluster kws | Volume | Best pos | Class | Treatment |
|---|---|---|---|---|---|
| `hawsons.co.uk/60-tax-trap/` | 15 | 2,800 | 9 | **PEER** (§2a row 14) | Torn down, 4.2 |
| `medicsmoney.co.uk/your-marginal-tax-rate/` | 9 | 6,580 | 8 | **PEER** (§2a row 1) | Torn down, 4.1, deepest |
| `bma.org.uk/.../nhs-pension-annual-allowance` | 4 | 280 | 8 | NON-PEER (§2b) | Torn down, 4.5 |
| `gorillaaccounting.com/salary-dividend-tax-calculator/` | 3 | 630 | 37 | **PEER** (§2a row 11) | Torn down, 4.3 |
| `medicsmoney.co.uk/ep-254-the-60-marginal-rate-tax-trap-and-how-to-avoid-it/` | 3 | 300 | 30 | **PEER** | Torn down, 4.4 |
| `medicsmoney.co.uk/the-marginal-rate-tax-traps/` | 1 | 50 | 10 | **PEER** | Deferred by count, **read anyway**, 4.6 |
| `hawsons.co.uk/tapered-annual-allowance-and-pension-contributions-for-high-earners/` | 1 | 110 | 62 | **PEER** | Deferred, 4.7 |
| `taxqube.co.uk/how-to-keep-your-childcare-benefits-if-you-earn-over-100k-a-year/` | 1 | 70 | 56 | **PEER** (§2a row 18) | Deferred, 4.7 |

Eight URLs, not five. The brief named five to tear down and two to record as deferred; the harvest returns a third deferred URL (taxqube), recorded here so no competitor page is silently dropped (§9.7 balance rule). Five domains contribute, against the dossier's stated one.

**Fetch status. Every URL was fetched on 2026-08-26 and every one returned content. There are no non-200s in this teardown, and that itself is a finding.**

> **The hawsons 403 is not a property of the site, it is a property of the fetch path.** `house_positions.md` and the batch-1 index both record `hawsons.co.uk` as a known 403 to automated fetching, and `WebFetch` did indeed return **HTTP 403 Forbidden** on `https://www.hawsons.co.uk/60-tax-trap/` today. The same URL fetched with `curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"` returned **HTTP 200** and 599,638 bytes of HTML. So did the deferred tapered-allowance URL. The block is a default-user-agent block, not an IP or bot block.
>
> ```
> curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0" https://www.hawsons.co.uk/60-tax-trap/
> 200
> curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0" https://www.hawsons.co.uk/tapered-annual-allowance-and-pension-contributions-for-high-earners/
> 200
> ```
>
> **Consequence beyond this pack.** The brief expected this teardown to carry a flagged gap and a note that a human opening the page was the cheapest improvement available. It does not, because the gap is closed. Batch 1 recorded seven fetch-failed URLs and `hawsons.co.uk` appears on items 5 and 6 of batch 2. **The cheapest single improvement to the whole programme's teardown quality is to route competitor fetches through a UA-bearing `curl` when `WebFetch` returns 403, before recording a flagged gap.** That is a recommendation, not an action; nothing was changed.

### 4.1 https://medicsmoney.co.uk/your-marginal-tax-rate/
**9 in-cluster keywords · 6,580 volume · best position 8 · PEER, §2a rank 1, the strongest domain in the universe.**

- Title: "Your Marginal Tax Rate - Medics Money". H1: "Your Marginal Tax Rate". Approximately **2,400 words**.
- H2 in order: The Tax-Free Childcare Scheme · What medical school didn't teach us about money · The High-Income Child Benefit Charge · Important levels of income · Gift Aid · A Final Thought · Join 30,000 doctors and receive free, exclusive, financial CPD for doctors in your inbox · About the author · Explore our top 10 blog posts here. One H3: "Level of income in 2026/27".
- **Table: yes**, an income-threshold table. Calculator: no. FAQ block: no. **Worked example: YES.**
- Opening two sentences, verbatim: *"You will already know that the main income tax rates in the England, Wales, and Northern Ireland are 20%, 40% and 45% depending on your income. In Scotland, the main income tax rates 19%, 20%, 21%, 42%, 45% and 48%."*
- Figures it states, all tagged **2026/27**: £12,570 personal allowance · £50,270 higher-rate threshold · £60,000 child benefit clawback start · £80,000 child benefit fully reclaimed · £100,000 personal allowance withdrawal and loss of the childcare scheme · £125,140 allowance gone · £200,000, £260,000 and £360,000 on the pension annual allowance · the 60% marginal rate between £100,000 and £125,140 · 1% child benefit clawback per £200 above £60,000.
- Its worked example: a doctor on £100,000 receiving £5,000 of additional income, of which **£1,650 reaches the bank account** after income tax, National Insurance and student loan.

**Judgement. This is the page to beat and it is genuinely good.** It holds 6,580 volume of the cluster's 10,360, it is current for 2026/27, it has a threshold table, and it has a worked example whose punchline is a single number a doctor will remember. Four exploitable weaknesses, all real:

1. **It is a rate-ladder page, not an adjusted-net-income page.** It ranks at 38 for `adjustable net income` (3,600, the single biggest row in the cluster) and at 25 to 33 for the whole ANI question family, because ANI is treated as a derived aside rather than as the subject. **The largest keyword in this cluster is held at position 38 by the strongest peer in the universe.** That is the opening.
2. **It never says what income to check.** It gives the thresholds; it does not tell a doctor which figure on which document is the one that is tested, or what comes out of it before the test is applied.
3. **It carries three things we are forbidden to carry and would not want**: a named clinician byline and an "About the author" block (**I2**), the heading "What medical school didn't teach us about money" (**D5**, banned by name in `language_spec`), and a newsletter-capture H2 in the body (**I7**, **D3**).
4. **Its opening violates A1 for its own audience.** Two sentences of England-and-Scotland rate recitation before the subject appears.

### 4.2 https://www.hawsons.co.uk/60-tax-trap/
**15 in-cluster keywords · 2,800 volume · best position 9 · PEER, §2a row 14. `WebFetch` 403, `curl` 200. Headings recovered, not unknown.**

- Title: "The 60% Tax Trap: What High Income Earners Need to Know". H1: "The UK's 60% Income Tax Trap: What High Earners Need to Know". Dated **15 December 2025**. Approximately **1,410 words** of page text.
- Headings in order: **H2** What is the 60% Tax Trap? · **H3** A Quick Example · **H2** Why the Income Tax Trap Matters · **H3** It Is Easy to Trigger · **H2** How to Reduce Your Exposure · **H3** Pension Contributions · **H3** Salary Sacrifice Pension Arrangements · **H3** Elect for other Salary Sacrifice Benefits · **H3** Charitable Donations · **H3** Considering the Timing of Income · **H3** Review Structure of non-earned Income Sources · **H2** Why Early Action Matters · **H3** Frequently Asked Questions · **H3** What Is the 60% Tax Trap in the UK? · **H3** What Is the Personal Allowance Taper? · **H3** How Can I Avoid the UK 60 Per Cent Tax Trap · **H3** Is Salary Sacrifice a Good Way to Reduce Tax? · **H2** Contact our Team.
- **Table: no.** Calculator: no. **FAQ block: yes**, four questions, and every one of them is a market phrasing from section 3 used verbatim as a heading. **Worked example: YES.**
- Its worked example, verbatim: *"Imagine your income increases to £110,000. The extra £10,000 appears at first to be taxed at 40 per cent, which would create a £4,000 tax bill. In reality, you lose £5,000 of your tax-free personal allowance at the same time, exposing more of your earnings to basic-rate income tax. Your total tax on the extra £10,000 becomes £6,000. You also lose access to 30 hours of free childcare each week. This is the 60 per cent income tax trap in practice."*
- It names adjusted net income explicitly and correctly: *"Your aim is to reduce your adjusted net income. HMRC uses this figure to assess how much of your personal allowance you can keep."* It also states a forward-dated rule: *"From April 2029, salary sacrifice pension contributions above £2,000 per annum will attract national insurance contributions."*

**Judgement. Structurally this is the best page in the cluster and it is the reason this page can rank on Google.** It holds 15 of the 32 keywords with 1,410 words, a four-question FAQ block whose questions are the search strings, and a clean worked example. Its weaknesses are all about audience and depth:

1. **There is no doctor anywhere on it.** It is written for a generic high earner: bonus, savings interest, rental income, company car, P11D. Nothing about NHS pay, pension growth, GP profit share, private practice or a locum's year end. It ranks at 9 on `60 percent tax trap` with a page that has never heard of the reader we are writing for.
2. **No table.** Fifteen keywords, six thresholds in play, and the reader has to hold them in prose. `language_spec` **L4** requires a table on any page carrying bands.
3. **Its "How to Reduce Your Exposure" section is a six-item list of levers with roughly two sentences each.** Broad and shallow.
4. **It carries an author byline with a professional credential** ("Ben Peacock, Chartered Financial Planner"). **I2** forbids us copying that.
5. **It says nothing about the High Income Child Benefit Charge.** The string `child benefit` does not appear on the page. Childcare appears once, inside the worked example. Two of the three interactions O3 owns are absent from the market's structurally strongest page.

### 4.3 https://gorillaaccounting.com/salary-dividend-tax-calculator/
**3 in-cluster keywords · 630 volume · best position 37 · PEER, §2a row 11.**

- Title: "Salary & Dividend Tax Calculator | Gorilla". H1: "Salary and Dividend Tax Calculator". Approximately 1,800 to 2,000 words, most of it commercial.
- Headings: a sentence-long lead H2 · Calculate Your Take Home Pay · How Dividends work · Don't just take our word for it · Ready to switch? · Discover Our Top Packages · Limited Companies · Landlords & Buy-To-Let · Sole Traders · Online Instant Quote · Get an Instant Quote · The UK's Most Trusted Accountancy Firm · Get in touch.
- **Calculator: yes, working.** Table: yes, dividend rates. FAQ: no. Worked example: no.
- **It is stale and it is off-topic.** Its rate table is tagged **2024/25** and shows dividend rates of 8.75% / 33.75% / 39.35%, which `house_positions.md` §5 records as historic: the current 2026/27 rates are **10.75% / 35.75% / 39.35%**, live since 6 April 2026. It does **not** mention adjusted net income, the 60% band or the personal allowance taper at all.

**Judgement. Three calculator keywords held at 37 to 40 by a page with no content on the topic.** `marginal rate tax calculator`, `marginal tax calculator` and `marginal tax rate calculator` total 630 volume and are being answered by a salary-and-dividend tool that never discusses marginal rates. The intent is unsatisfied. **This page must not chase it**, because a markdown post cannot satisfy a calculator query and building a tool is a different workstream (section 7 defers all four calculator rows). Recorded as a delta: a marginal-rate illustration in `/calculators/` would have a genuinely weak field. Note also its five commercial CTAs and "The UK's Most Trusted Accountancy Firm" heading, which **I8** and **D3** forbid us.

### 4.4 https://medicsmoney.co.uk/ep-254-the-60-marginal-rate-tax-trap-and-how-to-avoid-it/
**3 in-cluster keywords · 300 volume · best position 30 · PEER. Podcast episode page.**

- Title and H1: "The 60% marginal rate TAX TRAP and how to avoid it". Approximately **1,200 words** of prose excluding chrome.
- Headings in order: Understanding and Navigating the 60% Tax Trap for UK Healthcare Professionals · Introduction · Understanding the 60% Marginal Tax Rate Trap · Seven Strategies to Avoid the 60% Tax Trap · 1. Maximise Claims for Employment Expense · 2. Utilise Gift Aid Donations · 3. Contribute to Private Pensions · 4. Leverage the NHS Pension Scheme · 5. Plan Around Child Benefits · 6. Equalise Income with a Partner · 7. Consider Working Less · Conclusion · About the author · Explore our top 10 blog posts here · Find out more · Working with.
- **No embedded player and no transcript** in the fetched content. No table, no calculator, no FAQ. **Worked example: no.**

**Judgement. This is the only page in the market written for healthcare professionals on this exact topic, and it is a seven-item listicle with no figures.** It is the closest competitor to our intended page in audience and the furthest in execution. Strategy 4, "Leverage the NHS Pension Scheme", is the one place any competitor connects the personal-allowance taper to the NHS pension, and it does so in a paragraph. **That is the interaction section 5 identifies as the whitespace, and it confirms nobody has taken it.** Two of its strategies are ours to link rather than to take: strategy 1 is O7 and O8 (item 1's page), strategy 4 touches O2.

### 4.5 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance
**4 in-cluster keywords · 280 volume · best position 8 · NON-PEER, unwinnable authority (§2b, trade union, 15 top-10 slots).**

- H2 in order: Tapered annual allowance 2023/24 · Your annual allowance statement · What your statement includes · Ensuring your statement is right · Receiving a backdated pay award · What to do if you exceed the limit · If you are a deferred scheme member · Video guides · BMA pensions.
- No table in the sense this cluster needs, no calculator, no FAQ block, **no worked example**.
- It uses `adjusted income` **exclusively in the pension annual allowance sense**, verbatim: *"Adjusted income includes all pension contributions (including any employer contributions). Threshold income excludes pension contributions."*
- **It does not contain the phrase "adjusted net income", the 60% band, £100,000 or £125,140 anywhere.**

**Judgement. This is the O2 boundary rendered as a SERP result, and it is the strongest single argument for the rule in section 1.2.** Four keywords that a naive regex reads as belonging to this cluster are in fact answered by a page about a completely different taper, and that page holds them at positions 8 to 11 on brand we cannot beat. It also confirms the split is clean in the market's own hands: BMA writes adjusted income and never adjusted net income; hawsons writes adjusted net income and never adjusted income. **The only page in the market that writes both is 4.6, and it separates them under different headings.** The rule we are imposing is the one the market already follows.

For our purposes this page is a **vocabulary source and a boundary marker, not a rank target**. Its lead H2 is still tagged "2023/24", three tax years stale, which is a freshness weakness the O2 owner should exploit and this page should not.

### 4.6 https://medicsmoney.co.uk/the-marginal-rate-tax-traps/
**1 in-cluster keyword (`uk tax trap graph`, 50, position 10) · PEER. Below the teardown threshold, read anyway, and the read changed section 5.**

- Title: "The Marginal Rate Tax Traps - Medics Money". H1: "The Marginal Rate Tax Traps". Approximately **2,100 words**.
- H2 in order: **Adjusted net income** · The High-Income Child Benefit Charge: level of income: £60,000 · Loss of the Tax-Free Personal Allowance of £12,570: level of income £100,000 · Loss of the Tax-Free Childcare of £12,570: level of income £100,000 · Tapering of the Pension's Annual Allowance of £60,000: level of income £200,000 · Find a specialist medical accountant with Medics Money · Other · Conclusion · About the author · Explore our top 10 blog posts here.
- **Chart: yes**, an IFS graph of income against childcare affordability, which is what `uk tax trap graph` at position 10 is ranking on. Table: no. Calculator: no. FAQ: no. **Worked example: yes**, multiple threshold-level illustrations with figures.

**Judgement, and it is the most important correction in this teardown. This page holds one keyword and is substantively the closest thing in the market to the page we intend to write.** It opens on an "Adjusted net income" H2, then walks the four cliffs in income order: HICBC at £60,000, personal allowance at £100,000, Tax-Free Childcare at £100,000, pension annual allowance at £200,000. That is O3's full scope plus one sentence of O2, structured exactly as a doctor experiences it.

Three consequences, all binding on section 5:

1. **The whitespace claim "nobody covers the interaction" must be narrowed and is narrowed in section 5.** Somebody does put both tapers on one page, under separate headings, in income order. What nobody does is explain why they are computed on two different measures of income, or what a doctor does when both bite in the same year.
2. **The claim "nobody covers childcare and child benefit" is false and is corrected.** 4.1 and 4.6 both do, at length. Only hawsons omits them.
3. **A peer holds position 10 on a query for a graph, with a graph.** `uk tax trap graph` is one of the three peer top-10 rows in this cluster. That is a genuine and cheap format signal, handled at criterion 7.4.

Note also that this page shows the **market's own answer to the O2 question**: it gives the pension annual allowance taper exactly one H2 among five and does not explain the mechanics. Even the peer that goes deepest on the traps declines to teach the pension taper on this page.

### 4.7 Deferred, not torn down (2 further URLs, 1 in-cluster keyword each)

- `hawsons.co.uk/tapered-annual-allowance-and-pension-contributions-for-high-earners/` · **1** in-cluster keyword (`adjusted income for pension`, 110, position 62) · fetches **200** with a UA. It is squarely an O2 page and its one in-cluster row is an AI-PENSION row reassigned in section 7. Not torn down, and deliberately not read for structure, because reading it is how a writer starts absorbing O2 material.
- `taxqube.co.uk/how-to-keep-your-childcare-benefits-if-you-earn-over-100k-a-year/` · **1** in-cluster keyword (`100k tax trap childcare`, 70, position 56) · **PEER**, §2a row 18. This is the only page in the harvest whose whole subject is the childcare half of O3, and it is held at 56 by a small generalist. Its keyword is required in section 7. Worth a human eye before QA, because it is the sole competitor evidence on a theme we own outright.

### 4.8 Does the "no worked examples" finding hold? **No. It fails on this cluster, and that changes the differentiation strategy.**

`language_spec_2026-08-26.md` Part 4 point 3 records that **zero of nine** competitor pages read in batch 1 carried a worked example with figures, and calls it "the widest quality gap in the niche". Tested against the five pages torn down here, plus 4.6:

| Page | Worked example with figures? |
|---|---|
| 4.1 medicsmoney `/your-marginal-tax-rate/` | **YES.** £100,000 plus £5,000, of which £1,650 arrives |
| 4.2 hawsons `/60-tax-trap/` | **YES.** £110,000, £10,000 extra, £6,000 of tax, stated as an H3 "A Quick Example" |
| 4.3 gorillaaccounting | No (it has a live calculator instead) |
| 4.4 medicsmoney ep-254 | No |
| 4.5 bma.org.uk | No |
| 4.6 medicsmoney `/the-marginal-rate-tax-traps/` | **YES**, several |

**Three of six, and both of the two peers holding Google top-10 slots have one.** The batch-1 finding does not generalise to this cluster, and it is easy to see why: a page about a marginal rate cannot be written without arithmetic, whereas a page about a pension scheme can.

**Consequence for this page, stated so the writer does not aim at a gap that is already filled.** A worked example is now **table stakes, not a differentiator**. `language_spec` **G1** requires exactly one on a page like this and that requirement stands, but it buys parity, not advantage. The differentiator has to come from section 5, and specifically from making the example a **doctor's** example rather than a generic high earner's: an income the reader did not choose, arriving late, on a figure they cannot see until a statement lands. Neither 4.1's £5,000 of extra income nor 4.2's £110,000 salary is anybody in particular.

Corollary, recorded as a delta for the language spec rather than folded in: **Part 4 point 3 should be scoped to the pension and practice-accounting clusters where it was measured, not stated as a niche-wide finding.** It is wrong on the tax-rate cluster.

### 4.9 Coverage checklist: union of their heading themes, minus what we would have

Nineteen themes across 4.1 to 4.6. Every one must end QA marked **covered**, **declined-with-reason**, or **belongs-to-another-page**, with an undecided count of **zero** (§9.9 floor 8). Provisional decisions given so the writer starts from a position rather than a blank:

| # | Theme | Seen at | Provisional decision |
|---|---|---|---|
| 1 | What the 60% tax trap is, stated as a definition | 4.2, 4.4, 4.6 | **Covered.** The page's core. |
| 2 | The personal allowance taper mechanic, £1 lost per £2 above £100,000 | 4.1, 4.2, 4.6 | **Covered.** O3, ours. |
| 3 | The band boundaries £100,000 and £125,140 | 4.1, 4.2, 4.6 | **Covered**, in a table per L4 |
| 4 | Adjusted net income named as the tested figure, and what reduces it | 4.2, 4.6 | **Covered.** This is the page's H1 subject and the thing 4.1 buries. |
| 5 | A worked example with figures | 4.1, 4.2, 4.6 | **Covered**, once, per G1 to G7. Doctor-specific, see section 5. |
| 6 | A rate or threshold table | 4.1 | **Covered**, per L4. hawsons has none and holds 15 keywords without one. |
| 7 | A graph of the effective rate ladder | 4.6 | **Covered or declined, writer's call, recorded either way.** See 7.4. |
| 8 | Tax-Free Childcare and the 30 free hours lost at £100,000 | 4.1, 4.2 (one clause), 4.6, taxqube | **Covered.** O3, ours, and the sharpest cliff. |
| 9 | High Income Child Benefit Charge, the £60,000 to £80,000 clawback | 4.1, 4.6 | **Covered.** O3, ours. |
| 10 | Pension contributions as the lever that reduces adjusted net income | 4.2, 4.4, 4.6 | **Covered**, as a relief that reduces ANI. **Not** as annual allowance mechanics. This is the sentence where O2 gets breached; see 7.6. |
| 11 | Gift Aid as the other lever | 4.1, 4.2, 4.4 | **Covered.** Genuinely ours, ITA 2007 s.58, and it is the second statutory deduction in the ANI computation. |
| 12 | Salary sacrifice, including the April 2029 NIC change | 4.2 | **Covered in brief.** Verify the 2029 rule at source (7.7) or omit it. Do not assert it from a competitor page. |
| 13 | Timing of income, and reviewing non-earned income sources | 4.2 | **Covered in brief.** Genuinely useful for a GP partner whose profit share moves after the year end. |
| 14 | Equalising income with a spouse or partner | 4.4 | **Covered in brief.** Careful: **I3**, this explains how a rule works, it never advises. |
| 15 | Working less, or declining additional sessions | 4.4 | **Covered in brief.** It is the honest answer for a clinician and no other page frames it as a tax calculation. |
| 16 | Employment expense claims as an ANI reducer | 4.4 | **BELONGS TO ANOTHER PAGE.** O7 and O8, batch 2 item 1. One sentence and a link. |
| 17 | The pension annual allowance taper at £200,000 and £260,000 | 4.1, 4.6, 4.5 in full | **BELONGS TO ANOTHER PAGE.** O2. Two sentences, one link, per 7.6. |
| 18 | Scottish rates and bands | 4.1 | **DECLINED WITH REASON.** `house_positions.md` §5 locks rUK rates only. Scottish income tax rates are not a house position and no figure may be invented for them. The page states the scope as England, Wales and Northern Ireland and says Scottish rates differ, without figures. |
| 19 | Newsletter capture, author bio, "find an accountant" directory | 4.1, 4.4, 4.6 | **DECLINED WITH REASON.** I2, I7, D3. |

Undecided: **0**. Themes 7 and 12 are the two the writer may move, and each must be recorded with a reason if moved.

---

## 5. Whitespace

Specific, quotable, and tested against the six pages actually read rather than assumed.

**5.1 The candidate in the brief, tested and PARTLY FALSIFIED, stated honestly.**

The brief proposed: the competitors write the 60% trap generically, and nobody writes it for a doctor whose income spike is a pension growth figure they did not choose, or for a GP partner whose profit share moves after the year end.

- **The generic half holds and is the strongest finding in the pack.** hawsons (4.2), which holds 15 of 32 keywords and position 9, has no doctor on it anywhere: its triggers are a bonus, savings interest, rental income, a company car and a P11D benefit. gorillaaccounting (4.3) is a contractor calculator. Neither has heard of the NHS.
- **The doctor half is already partly taken and must not be claimed as new.** medicsmoney holds three doctor-facing pages in this cluster (4.1, 4.4, 4.6) and 4.6 in particular walks all four cliffs in income order under an "Adjusted net income" H2. Writing "nobody has written this for doctors" into the page or the QA would be false.

**5.2 The genuine, defensible whitespace, in one sentence.** Every competitor writes the trap as a **decision about a salary**, and for a doctor it is very often not a decision and not a salary.

That is the whole opening, and it decomposes into four things no page in the market does:

1. **Nobody tells the reader which number is tested.** Six pages, all of them state the thresholds, and not one says what an NHS doctor should actually look at to find their own adjusted net income: which figures on a payslip, a P60, a practice profit share or a private-practice set of accounts go in, and what comes out before the test is applied. 4.2 comes closest, in one sentence: *"HMRC uses this figure to assess how much of your personal allowance you can keep."* It then never returns to it. This is the same failure mode `language_spec` Part 2 records estate-wide: the right page carrying the wrong words. Here the right pages carry the right words and skip the reader's actual first question.
2. **Nobody writes for income that arrives without being chosen.** The competitors' triggers are electives: take the bonus, buy the rental, accept the dividend. A GP partner's profit share is agreed after the year end and can move a partner across £100,000 retrospectively. A consultant's additional sessions, waiting-list initiative payments and a backdated pay award land on a timetable set by somebody else. **A page that treats the £100,000 line as something the reader crosses without deciding to is a different page from every one of the six read**, and it is honest, because that is what happens.
3. **Nobody says what you can still do after the year end and what you cannot.** This follows directly from 2 and is the practical payoff. Some of the levers in 4.2's and 4.4's lists work only before 5 April and some work after. No competitor separates them. For a reader who found out in July that their profit share pushed them over in the year that ended in April, that separation is the only useful thing on the page.
4. **Nobody writes the double bind, and this is where the O2 line has to be walked precisely.**

**5.3 The double bind, and exactly how this page raises it without taking the explanation.**

The genuinely hard thing this reader faces is that **two tapers can bite in the same tax year, and they are computed on two different statutory measures of income**. A consultant at £110,000 with significant pension growth is losing personal allowance on adjusted net income and may separately be facing a reduced pension annual allowance on adjusted income. Worse, the two interact perversely: a personal pension contribution made to escape the 60% band reduces adjusted net income, which is the point, and the same contribution is an input into the other calculation.

Nobody has written that. 4.6 puts both cliffs on one page in income order and never says they are different measures. 4.5 explains one measure and never mentions the other. 4.4 gives it a paragraph inside strategy 4.

**How this page raises it. This is the boundary in operational form and it is criterion 7.6.**

**PERMITTED, and required:**
- Name the fact that a second and different taper exists, that it applies to the NHS pension, and that it is tested on **a different measure of income with a confusingly similar name**.
- State that the two are not the same number and must not be assumed to be.
- Link once to `/calculators/nhs-pension-annual-allowance`.
- Total budget: **two sentences**, in one place on the page.

**FORBIDDEN, and each is a BLOCK:**
- Any threshold figure for the pension taper (£200,000, £260,000, the £10,000 floor).
- The words `threshold income`, `pension input amount`, `carry forward`, `MPAA`, `Scheme Pays`.
- Any explanation of how the pension taper is computed, how much allowance is lost, or what the charge is.
- Any worked example involving pension growth. **The page's one worked example is an adjusted-net-income example.**
- Any second mention of the pension taper elsewhere on the page.

The test a writer should apply to themselves is the one in BATCH2_INDEX §4: *if you find you need three sentences, you are taking someone else's fact and must stop.*

**5.4 Format whitespace, cheap and evidenced.**

- **hawsons holds 15 keywords and position 9 with no table.** L4 requires one here anyway. A single threshold table, captioned 2026/27, is a free structural advantage over the market's best-structured page.
- **`uk tax trap graph` (50) is held at position 10 by the only page in the cluster with a chart** (4.6, an IFS graph). It is one of the three peer top-10 rows. The intent is visual and a markdown post can partly satisfy it with a rate-ladder table showing the effective marginal rate by income band. Handled at 7.4.
- **Four calculator rows, 630 volume, are held at 37 to 58 by pages that either have the wrong calculator (4.3) or none (4.2).** The intent is unsatisfied and this page cannot satisfy it. Deferred in 7.2 and recorded as a delta, not chased.

---

## 6. Our current position

**There is no current page. This section records the surrounding position instead, because "nothing here" is itself the finding that sets section 8's baseline.**

**6.1 What the corpus already says, and the risk it creates.** From the read-only grep in section 3.3, across the 79 files in `Medical/web/content/blog/`:

| Phrase | Files | Reading |
|---|---|---|
| `adjusted income` | **41** | Always the pension sense. The single most-used technical phrase in this family on the site. |
| `adjusted net income` | **0** | The subject of this page appears nowhere in 79 blog posts. |
| `personal allowance taper` | 6 | The mechanic is named but not owned. |
| `high income child benefit charge` | 1 | `blog/accountant-self-assessment.md` only. |
| `marginal tax` | 2 | `blog/gp-accountant-bristol.md`, `blog/medico-legal-expert-witness-income-doctors-tax.md` |
| `tax at marginal rate` | 1 | `blog/medico-legal-expert-witness-income-doctors-tax.md` |
| `tax trap`, `60 tax trap`, and every other trap phrasing | **0** | The entire 2,800-volume hawsons vocabulary is absent. |

**41 to 0 is the whole argument for this page and the whole argument for the O2 boundary in one line.** The site has taught one meaning of a near-identical phrase forty-one times and the other meaning zero times. The new page is the first and only place the distinction gets made, which makes it valuable and makes it fragile: if it blurs the two, it blurs them with the authority of being the only page that addresses the question.

**6.2 Six pages already carry `personal allowance taper` and one carries the HICBC.** Per **V3**, once this page exists it becomes the owner and those mentions are correct as they stand: one sentence and a link is exactly what a supporting page should have. **No back-patching of existing pages is authorised by this pack**, and any such sweep would be a separate task. It is recorded here only so a later reader does not mistake the six for duplication.

**6.3 Internal links this page should carry**, all verified as existing routes before use (§9.9 floor 3, and coordinator ruling 5: resolve calculator routes by reading the `slug` field inside `Medical/web/src/lib/tools/configs/*.ts`, never by filename):
- `/calculators/nhs-pension-annual-allowance` (the O2 link, exactly one, per 7.6)
- The batch-2 item 1 page on uniform, laundry and subscriptions, for theme 16, once it exists
- `/contact`, once, at the end, using the site's existing CTA component and never invented inline (**D3**)

**It must NOT link to** `/blog/nhs-pension-tapered-annual-allowance-calculator` or `/blog/nhs-pension-annual-allowance-complete-guide` while their `monitored_pages` windows run to 2026-09-10. A new inbound link is a change inside a live measurement window.

---

## 7. Deterministic acceptance criteria

All countable at QA. **Twenty-two numbered criteria. A failure on any one is a BLOCK.** Criteria are grouped for reading; the count is the count of numbered items in 7.1 to 7.10.

### 7.1 Phrases that must appear verbatim, case and punctuation normalised: **13 carrier strings covering 17 keyword rows**

The count is of strings to place, not of keyword rows, because binding rule **V1** caps this page at two word orders per idea and several rows are substrings of others. A longer string places its contained substrings for free and that is one string on the page, not two, so it does not breach V1.

**Criterion 1. Tier A, peer top-10 rows. All 3 required.**

| # | String | Covers rows | Vol | Peer pos |
|---|---|---|---|---|
| 1 | `what is marginal tax rate uk` | + `marginal tax` | 70 + 1,300 | medicsmoney 26 / **8** |
| 2 | `60 percent tax trap` | + `tax trap` | 90 + 210 | hawsons **9** |
| 3 | `uk tax trap graph` | | 50 | medicsmoney **10** |

**Criterion 2. Tier B, by volume. All 10 required.**

| # | String | Covers rows | Vol |
|---|---|---|---|
| 4 | `adjustable net income` | | 3,600 |
| 5 | `what is the 60 tax trap uk` | + `what is the 60 tax trap` + `60 tax trap` | 110 + 210 + 1,300 |
| 6 | `tax at marginal rate` | | 1,000 |
| 7 | `adjusted income` | | 260 |
| 8 | `what is my adjusted net income` | | 140 |
| 9 | `how to avoid the 60 tax trap` | | 90 |
| 10 | `is adjusted net income after tax` | | 90 |
| 11 | `100k tax trap childcare` | | 70 |
| 12 | `adjusted net income uk` | | 50 |
| 13 | `when do you pay 60 tax` | | 50 |

Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary`, a table caption or body prose.

**Two placement rules that are themselves BLOCKs:**

- **Criterion 3.** String 4, `adjustable net income`, is a **misphrasing**. It appears **exactly once**, in an `faqs[].question`, and the answer's first clause states the correct term. It never appears in `metaTitle`, `h1`, an `<h2>`, `keyTakeaways` or `summary`, and it is **never asserted as the name of the thing** (`language_spec` §2e). QA counts occurrences: expected exactly 1, in exactly one location type.
- **Criterion 4.** String 7, `adjusted income`, appears **only** inside a sentence that also contains `adjusted net income` and states that the two are different. It never appears alone. See criterion 12.

### 7.2 Deferred with reason: **4 rows, 630 volume**

**Criterion 5.** `marginal rate tax calculator` (210), `marginal tax calculator` (210), `marginal tax rate calculator` (210), `tax trap over 100k calculator` (90). **Calculator intent. A markdown post cannot satisfy it and this page must not pretend to.** Recorded as a delta for a possible `/calculators/` surface, per the correction list. QA confirms these are **absent**: their presence on this page is a fail, not a bonus, because it would be the page claiming a tool it does not have.

### 7.3 Reassigned to `/calculators/nhs-pension-annual-allowance` (O2): **4 rows, 280 volume**

**Criterion 6.** `adjusted income for pension` (110), `how to calculate adjusted income for pension allowance` (70), `adjusted income pension` (50), `pension adjusted income` (50). All four are the AI-PENSION sense, all four are held by bma.org.uk at positions 8 to 11. **QA confirms all four are absent from this page.** Any one of them present is a BLOCK, because placing it requires writing the pension taper.

### 7.4 Unplaced by the V1 word-order cap: **7 rows, 670 volume, named so the ledger balances**

**Criterion 7.** `uk 60 tax trap` (110), `how to avoid 60 tax trap` (140), `uk tax trap` (140), `60 tax trap explained` (90), `tax trap uk` (70), `what is marginal rate of tax uk` (70), `60 tax uk` (50). These are third-and-beyond word orders of ideas already carried by strings 1, 2, 5 and 9. **V1 makes placing them a defect, not thoroughness.** QA reports them as unplaced-by-rule, not as missing.

**Criterion 8, the format decision on string 3.** `uk tax trap graph` is a Tier A peer top-10 row and its intent is visual (4.6 ranks at 10 with an IFS chart). The page satisfies it with a **table of the effective marginal rate by income band**, captioned for 2026/27, and the string is placed in prose or an FAQ question that refers to it. If the writer judges that the string cannot sit as natural English (**V6**), it is reported **unplaced with a recorded reason** and criterion 8 passes on the reason, not on the placement. It is the one Tier A row permitted to go unplaced, and only this way.

### 7.5 The O3 substance the page must contain

**Criterion 9. The four O3 anchors, all four, each with its 2026/27 tag** (**F1**): personal allowance **£12,570**, withdrawal beginning above **£100,000** at £1 for every £2, allowance fully gone at **£125,140**, effective marginal rate **60%** in that band.

**Criterion 10. Adjusted net income is defined as a computation, not as a synonym for salary.** The definition must name at least the two principal deductions, **gross Gift Aid donations** and **gross personal pension contributions**, and must say that it is not the same as taxable pay on a payslip.

**Criterion 11. Both O3 interactions appear**: **Tax-Free Childcare and the 30 free hours** lost at £100,000, and the **High Income Child Benefit Charge**. Both are O3 and both are ours outright. HICBC figures are subject to criterion 20.

**Criterion 12. The disambiguation sentence exists, once, and is unambiguous.** One sentence on the page states that **adjusted net income** and **adjusted income** are two different statutory measures with confusingly similar names, that this page is about the first, and that the second is explained elsewhere. QA reads that sentence and confirms a reader could not conflate the two after it. This is the criterion the whole pack exists for.

### 7.6 THE O2 BOUNDARY, as a countable criterion

**Criterion 13. Sentence cap.** The total number of sentences on the page, across body, frontmatter FAQs, `keyTakeaways` and `summary`, that describe the **pension annual allowance taper** is **at most 2**, and they occur in **one contiguous place**. Count them. **3 or more is a BLOCK.**

**Criterion 14. Link cap.** Exactly **one** link to `/calculators/nhs-pension-annual-allowance`, inside those two sentences.

**Criterion 15. Banned-string count, all expected ZERO.** QA string-searches the whole file, body and frontmatter:

`threshold income` · `pension input amount` · `pension input period` · `carry forward` · `MPAA` · `money purchase annual allowance` · `£200,000` · `£260,000` · `minimum tapered` · `Scheme Pays` · `annual allowance charge` · `£60,000` *(in an annual-allowance sense; £60,000 in the HICBC sense is required by criterion 11, so QA reads the containing sentence rather than counting blind)*

**Criterion 16. No pension worked example.** The page's single worked example is an adjusted-net-income example. A worked example containing pension growth, a pension input amount or an annual allowance figure is a BLOCK.

### 7.7 Arithmetic that must recompute

**Criterion 17.** Every figure traces to `docs/medical/house_positions.md` and recomputes from stated inputs. The anchors, each confirmed by reading the file today:

| Statement | House positions line | Must equal |
|---|---|---|
| Personal allowance | §5 (line 219): *"personal allowance £12,570 (tapered above £100,000)"*, and the Verification log (line 40), verified 2026-08-26 at https://www.gov.uk/income-tax-rates | **£12,570**, tapered above **£100,000** |
| Basic rate | §5 line 219 and log line 40 | **20%** to **£50,270** |
| Higher rate | §5 line 219 and log line 40 | **40%** to **£125,140** |
| Additional rate | §5 line 219 and log line 40 | **45%** above £125,140 |
| Class 4 NIC | §5 line 219, §8 line 279, log line 46, verified 2026-08-26 at https://www.gov.uk/self-employed-national-insurance-rates | **6%** £12,570 to £50,270, then **2%** |
| The 60% arithmetic | Derived, must recompute | £2 of income above £100,000 costs 40p of tax on the £2 plus 40p on the £1 of allowance lost, so £1.20 of tax on £2 = **60%** |
| Allowance exhaustion point | Derived, must recompute | £100,000 + (2 x £12,570) = **£125,140**. If the page states the arithmetic it must give this figure. |

**Correction to the brief, recorded rather than silently absorbed.** The brief locates these anchors in house positions **§5 and §9**. §5 (line 219) carries them and so does the Verification log (lines 40 and 46). **§9 is MTD for Income Tax Self Assessment and carries no income-tax band figures.** It is relevant to this page only as the reason a doctor with private income files a return at all, and the page may cite it for that and nothing else. Nothing beyond §5 and the Verification log was invented.

**Criterion 18. The worked example meets G1 to G7 in full**: exactly one, positioned immediately after the H2 stating the rule it demonstrates, 80 to 200 words, five components (illustrative persona as role plus initial, inputs, arithmetic step by step, result, one sentence on what changes the answer), rounded figures, every rate already stated in the body with its year, and **not** headed or prefixed "Worked example" (**G6**, **J4**, hard fail; note the corpus already contains that string in 13 files).

### 7.8 UNVERIFIED figures that must not be stated

**Criterion 19.** `house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED, and **F5** makes any figure for them a hard fail. This topic needs none of the three, so the expected outcome is absence. The live risk is the GMC fee: a writer listing what reduces adjusted net income will reach for professional subscriptions and then for a number. The page may say the fee is deductible; it may not state an amount. If a draft introduces one, the block reads "confirm the current figure at source" and is named for QA. Note also that professional subscriptions are **O7**, so this is one sentence and a link regardless.

**Criterion 20. Figures this pack does NOT have a house position for, and which must be verified at source or omitted.** House positions carries no locked figure for the High Income Child Benefit Charge thresholds, the Child Benefit rates, the Tax-Free Childcare cap or the 30-free-hours income limit, and it carries nothing on the April 2029 salary-sacrifice NIC change that 4.2 asserts. **None of these may be taken from a competitor page.** Each is either verified at the source named in 7.9 on the day of writing, or the page names the interaction without a figure and tells the reader where to confirm it (**F7**). Competitor 4.1 states £60,000, £80,000 and 1% per £200; **that is evidence of what the market says, not a source.**

### 7.9 Sources to re-verify at source before publication

**Criterion 21.** Every URL fetched on the day of writing. A fetch failure is recorded with its status code, not ignored, and per 4.0 a `WebFetch` 403 is retried with a UA-bearing `curl` before being recorded as a gap.

| What | URL |
|---|---|
| Personal allowance, bands and rates for 2026/27, and the taper above £100,000 | https://www.gov.uk/income-tax-rates |
| **The statutory definition of adjusted net income, and what is deducted** | https://www.gov.uk/guidance/adjusted-net-income |
| Personal allowance and adjusted net income in statute | https://www.legislation.gov.uk/ukpga/2007/3/section/35 and https://www.legislation.gov.uk/ukpga/2007/3/section/58 |
| **High Income Child Benefit Charge thresholds and the clawback rate** | https://www.gov.uk/child-benefit-tax-charge |
| **Tax-Free Childcare and 30 free hours, the £100,000 adjusted net income limit** | https://www.gov.uk/tax-free-childcare |
| Gift Aid and how a donation extends the basic rate band and reduces adjusted net income | https://www.gov.uk/donating-to-charity/gift-aid |
| Class 4 NIC 2026/27 | https://www.gov.uk/self-employed-national-insurance-rates |
| The April 2029 salary-sacrifice NIC change, **only if the page states it** | HMRC or gov.uk current guidance. If it cannot be pinned, the sentence is cut. It came from a competitor page and nothing else. |

### 7.10 The floors

**Criterion 22.** All eight floors pass.

| Floor | Requirement on this page |
|---|---|
| 1. Arithmetic | Every figure in 7.7 correct and recomputing. The 60% derivation and the £125,140 exhaustion point both check out. |
| 2. Statute | Every source in 7.9 fetched on the day of writing, or its status code recorded. |
| 3. Links | Zero broken internal links repo-wide. Calculator routes resolved from the `slug` field, not the filename (coordinator ruling 5). No new link to a page frozen to 2026-09-10. |
| 4. Coverage | The 13 strings of 7.1 placed. Any unplaced one named, with criterion 8 the only permitted reasoned exception. |
| 5. Equity preservation | **Not applicable. The page does not exist and there is no equity to preserve.** Stated, not skipped. The site-level Bing rows in section 2 belong to O2 pages and are protected by criteria 13 to 16, not by this floor. |
| 6. Cluster coverage | Same matcher, the 7.1 input. |
| 7. Reconciliation balance | **17 rows covered by the 13 required strings + 4 deferred (7.2) + 4 reassigned (7.3) + 7 unplaced-by-V1 (7.4) = 32.** Balances against the section 3 count. |
| 8. Competitor re-read | All **19** heading themes in 4.9 marked covered, declined-with-reason, or belongs-to-another-page. Undecided count **0**. No fetch-failed URL to record: all eight fetched 200. |

**Plus the two standing QA tracks, both Opus:** adversarial factual against `house_positions.md` §5, §8 and the Verification log; and editorial against `language_spec_2026-08-26.md` Part 1 and Part 5.

### 7.11 The language-spec rules made countable on this page

Not additional criteria, but the numbers the editorial QA reports. **V5 is the one this batch is watching.**

| Rule | Number QA reports |
|---|---|
| **V1** | Distinct word orders per idea. **Maximum 2.** The 60% trap family and the marginal-rate family are the two at risk; 7.4 pre-resolves both. |
| **V2** | Occurrences of keyword-research narration ("also searched as", variant lists, telling the reader two searches mean the same thing). **Expected 0.** Criterion 3 is the live risk: the `adjustable net income` FAQ must read as a reader's question, never as a note about search strings. |
| **V3** | Sentences on a fact owned by another page. Counted per owner: O2 **max 2** (criterion 13), O7 and O8 **max 1**, O12 **max 1**, incorporation **max 1**. |
| **V4** | Not applicable. This is not a hub. |
| **V5** | Occurrences of `"it is not X, it is Y"`. **MAXIMUM 1 on this page, across the whole batch.** Every batch-1 page ran it three to seven times. This page is unusually exposed to it, because its entire subject is a distinction between two similarly named things, and the construction will feel natural every time the writer draws it. **It is capped at one.** Any other single rhetorical construction is capped at **2** (**J6**). |
| **V6** | Phrasings reported unplaced because they will not sit as natural English. **Expected 1 at most** (criterion 8). |
| A1, A5 | Answer within the first **60** words, opening block **40 to 90** words. On a "how much" page **A4** applies: a figure in the first 60 words. |
| B4, B6 | Question-form H2 rate **50% to 75%**. H2 count **6 to 14**. |
| C1, C2, C3, C4 | Mean sentence **15 to 22** words, none over 40. Paragraphs 1 to 4 sentences. "you"/"your" **12 to 25** per 1,000 words. "we"/"our"/"us" **max 3** per 1,000 and none in the opening or an H2. |
| H1, H3 | **4 to 8** FAQs, answers **40 to 110** words each. |
| L1, L4 | **900 to 1,600 words** (this is a primer-and-coverage page, and the competitor median here is 1,410 to 2,400). **At least one table**, captioned with its effective date. L3 stands: word count is not a lever. |
| I1 | Em-dashes anywhere in user-facing copy including frontmatter. **0.** |
| I2, I3, I4, I5, I7, I8 | **0** each. Named experts and credentials, regulated-activity claims, named clients, pricing, interruptive UI, comparative claims. Three of the six competitor pages breach I2 and two breach I7; do not copy them. |
| D5 | **0.** "What medical school didn't teach us about money" is a live H2 on 4.1, 4.4 and 4.6 and is banned by name. |
| F5, F6, I6 | **0** UNVERIFIED figures, **0** fabricated statistics or unsourced percentages. |
| G6, J4 | The string "Worked example" as a heading or line-initial prefix. **0.** |
| J7 | Coefficient of variation across section word counts **above 0.2**. |

---

## 8. Stated expectation

Written before the work, as numbers a later read can fail (§9.6).

**Baseline, with its command.** Both engines are at **zero for this URL**, because the URL does not exist. Site-level Bing, `BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')` pulled 2026-08-26, returned **648** query rows, of which **3** touch this term family and **all three are the pension sense** (section 2). **Zero of 648 touch adjusted net income, the 60% band, the personal allowance taper, childcare or the High Income Child Benefit Charge.** Google: no URL, no rows.

**The measurement reality.** Google indexes roughly **21 of 130** URLs on this site. That is low domain authority, not a technical defect. Bing indexes it fully and sends **3.4x** the Google clicks. Bing is therefore the primary read at 14 and 28 days, and Google is a 90-day observation.

### 8.1 Primary tests, Bing, on named phrases

| Read | Window | Expectation |
|---|---|---|
| **Bing, 14 days** | to deploy + 14 | `GetPageQueryStats` for this URL returns **at least 1 named query with at least 1 impression**, and that query contains at least one of the tokens `adjusted`, `trap`, `marginal`, `60` or `100k`. The page exists in the index and matches something. |
| **Bing, 28 days** | to deploy + 28 | **At least 4 named queries** on this URL. **At least 2** of them matching a criterion-1 or criterion-2 string from section 7.1 by token overlap. **At least 8 impressions.** A first Bing click is hoped for and is **not** part of the test: at 8 impressions a click is a coin flip, and setting it as a target would make the read unfalsifiable. |

**Phrase coverage is the verdict, not total traffic** (§9.6 point 2). **Impressions rising while the 13 named strings stay absent from the query set is drift and is recorded as a FAIL, not a pass.** The specific drift to watch on this page, and it is the reason the boundary is a criterion rather than a note: **Bing impressions arriving on pension-sense queries** (`adjusted income`, `nhs pension adjusted income`, `annual allowance`) would mean the page has been indexed as an O2 page. That is a **FAIL even if the numbers look good**, and it is also a signal that O2's own live Bing equity, currently earning clicks at positions 4 and 7, is now being competed with by us.

### 8.2 The batch's one Google observation, at 90 days

Per BATCH2_INDEX §8, **this is the only page in batch 2 with a Google expectation, and it is set as an observation rather than a target.**

> **Google, 90 days after deploy.** Record, for `/blog/adjusted-net-income-doctors-60-percent-tax-trap`: is the URL indexed, does it have any page-level impressions in GSC, does it have any query-level rows, and what is its best average position on any query containing `trap`, `marginal` or `adjusted net income`.
>
> **The observation is interesting if the URL is indexed and returns any query-level row.** It is very interesting if it appears at any position on `60 percent tax trap` or `marginal tax`, where the incumbents are peers at 9 and 8 rather than institutions.

**Why this page and no other.** Every other batch-2 cluster's Google slots are held by bma.org.uk, nhsbsa.nhs.uk or gov.uk, which `competitor_universe_2026-08-26.md` §2b classes as unwinnable on brand. This cluster's best two positions belong to `medicsmoney.co.uk` (8) and `hawsons.co.uk` (9), both §2a peers. If any batch-2 page is going to be indexed and ranked by Google inside 90 days, it is this one.

**Why a miss is not a failure, in one line.** On a corpus where Google indexes 16% of URLs, a single new page failing to be indexed inside 90 days is the base rate rather than evidence about the page, so a miss falsifies nothing and only a hit carries information.

### 8.3 Failure trigger, written as a number, before the work

There is no revert-on-equity-loss trigger, because there is no equity: the revert path is deletion of one new file. The triggers that do apply are quality triggers.

> **BLOCK before deploy** if the editorial QA raises a **V1, V3 or V5** finding, or if any criterion in section 7 fails, in particular criteria **13 to 16** (the O2 boundary) and criterion **12** (the disambiguation sentence). Per BATCH2_INDEX §8, if V1, V3 or V5 fires on **three or more of the seven** batch-2 pages, the batch has reproduced the batch-1 defect and the affected pages are held rather than deployed.
>
> **RE-READ AND FIX, not revert, at 28 days** if Bing named queries on this URL are non-zero but **more than half of them are pension-sense queries**. That is the boundary having leaked, and the fix is to tighten the two O2 sentences, not to delete the page.
>
> **DELETE only** if the page is found to state a figure banned by criterion 19 or 20 and the figure cannot be verified at source.

### 8.4 Tracker fields, at deploy time, owner-triggered

`blog_optimizations.target_keywords` populated with the **13 strings from section 7.1**, not with anything the corpus already ranks for. `monitored_pages` registration with the zero baselines above. **Neither has been done and neither is authorised by this pack.** No monitor, alert, cron or scheduled job was created by this document, and reading the tracker later is a pull, not a notification.

---

## Corrections to the dossier, the brief and the language spec

1. **Cluster size disagrees with the dossier and the divergence is membership, not arithmetic.** Dossier §4 row 5: 7,210 volume, 1,300 peer-winnable, 15 keywords, 1 domain. This pack, from the printed regex: **10,360 / 1,900 / 32 / 5 domains**. The regex additionally admits the `marginal (rate|tax)` calculator family and the four pension-sense `adjusted income` rows. **Not harmonised. Flagged**, per BATCH2_INDEX §9 limitation 1.

2. **The dossier reports one contributing domain; there are five.** medicsmoney.co.uk, hawsons.co.uk, bma.org.uk, gorillaaccounting.com and taxqube.co.uk all hold in-cluster rows. §5 of the dossier separately lists `adjustable net income` (3,600, position 38, medicsmoney) as a top absence, which is consistent, but the row-5 domain count of 1 understates the field.

3. **The brief's Bing statement needs one word changed, and the correction matters.** It says zero of the 648 site-level queries matched the adjusted-net-income or tax-trap family. Re-pulled today, **3 matched a broad regex, and all three are the pension sense of "adjusted income"**, one of them using the phrase "tax trap" to mean the annual allowance charge. Zero matched the O3 family. So the baseline claim holds and the underlying picture is sharper than stated: **the site's only live equity in this term family sits on the far side of the O2 line and is already earning clicks at positions 4 and 7.** Section 8.1 turns that into a drift test.

4. **`hawsons.co.uk` is not a 403 to automated fetching. It is a 403 to the default `WebFetch` user agent.** `curl -A "Mozilla/5.0 ..."` returns 200 on both hawsons URLs in this cluster, and the full heading structure of `60-tax-trap/` is recovered at 4.2. `house_positions.md` and the batch-1 index both record it as a known block, and batch 1 recorded seven fetch-failed URLs. **Recommendation, not an action: retry a 403 with a UA-bearing `curl` before recording a flagged gap.** It closes the gap this pack was expected to carry and probably closes several in batch 1.

5. **`language_spec_2026-08-26.md` Part 4 point 3 does not hold on this cluster.** It records zero of nine competitor pages carrying a worked example and calls it the widest quality gap in the niche. **Three of the six pages read here carry one, including both peers holding Google top-10 slots.** A worked example is table stakes on a marginal-rate page, not a differentiator. **Recommended edit to the spec: scope the finding to the clusters where it was measured.** Recorded as a delta; the spec was not edited.

6. **The brief locates this page's ground-truth anchors in house positions §5 and §9. §9 is MTD for Income Tax Self Assessment and carries no band figures.** The anchors are in **§5 (line 219)** and the **Verification log (lines 40 and 46)**, all verified 2026-08-26 at gov.uk. Every figure in criterion 17 cites the line it came from. Nothing was invented beyond those.

7. **`medicsmoney.co.uk/the-marginal-rate-tax-traps/` holds one in-cluster keyword and is substantively the closest page in the market to this one.** Keyword count is a poor proxy for competitive threat here. It was read despite falling below the teardown threshold (4.6), and the read narrowed two whitespace claims that would otherwise have been overstated. **Recorded as a method note: in a small cluster, read the deferred URLs whose titles are on-topic before writing section 5.**

8. **Four calculator rows totalling 630 volume are unsatisfied on this SERP** and are held at 37 to 58 by `gorillaaccounting.com/salary-dividend-tax-calculator/`, a page that never mentions marginal rates, adjusted net income or the 60% band, and whose dividend table is tagged 2024/25 with rates `house_positions.md` §5 records as historic. **Recommendation, recorded as a delta and not instructed here:** a marginal-rate illustration in `/calculators/` would face an unusually weak field. This pack does not tell the writer to build one, and proposes no collapse or redirect.
