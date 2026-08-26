# §9.5 RESEARCH PACK: /blog/nhs-uniform-tax-relief-laundry-allowance

Assembled 2026-08-26 against the binding batch contract `docs/medical/packs/BATCH2_INDEX.md`, the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md` (§4 row 4, §5), `docs/medical/competitor_universe_2026-08-26.md` (§2a, §2b), `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md` and `expansion_research/nichemap_2026-08-25/C1_REGULATORY.md`, plus live competitor fetches recorded in section 4 and a fresh Bing pull recorded in section 2.

Preparation only. The pack does not write the page. Nothing under `Medical/web/` was edited. Nothing committed, deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron or scheduled job created. **No new DataForSEO calls and no paid lookups of any kind: $0.00 additional spend.** Every figure below carries the query or command that produced it.

Repo state at build time: `git rev-parse HEAD` = `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf`.

---

## 1. Target and permission level

**CONSTRAINT FIRST.**

| Field | Value |
|---|---|
| URL | `/blog/nhs-uniform-tax-relief-laundry-allowance` |
| Status | **NET-NEW. The page does not exist.** No file, no equity, nothing to protect |
| Cluster / topic | uniform tax rebate family · lanes `expenses_allowances` and `allied_health` |
| Batch position | Item 1 of 7 (`BATCH2_INDEX.md` §1), ordered first on peer-winnable volume |
| Grade | **NET-NEW.** No EXTEND or REFRAME constraints apply. K1 and K2 are inapplicable because there is no live page to lose depth against |
| File to create | `Medical/web/content/blog/nhs-uniform-tax-relief-laundry-allowance.md` |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the whole `faqs` array live in frontmatter and are separate editable surfaces from the body (memory `blog_page_rendering_html_in_frontmatter`) |
| Current sha | `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf` |
| **Revert path** | `git rm Medical/web/content/blog/nhs-uniform-tax-relief-laundry-allowance.md`. One new file, deletion is the whole rollback. No redirect, no collapse, nothing else touched |

**Frontmatter keys the build requires** and which must be present and correct on creation: `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (**exactly one key, never duplicated**, per the estate-wide fix on 10 backfilled posts), `altText`, `schema`. `slug` must equal `nhs-uniform-tax-relief-laundry-allowance` and `canonical` must resolve to `/blog/nhs-uniform-tax-relief-laundry-allowance`.

**Lead source.** Any form on this page uses the existing site component and the `medical` lead source. No new component, no inline CTA invention (D3), no interruptive UI of any kind (I7).

**Nothing else under `Medical/web/` may be edited by the writer of this page.** Other agents are working concurrently in `Medical/web/content/`. See section 6 for a live overlap this pack found and deliberately does **not** authorise anyone to fix in this batch.

---

## 2. Equity register

**The page does not exist, so there is no equity register. This section is present and says so rather than being omitted** (`BATCH2_INDEX.md` §1: "Every equity register is therefore empty, and each pack says so rather than omitting the section").

**Google.** Zero. There is no URL, so there are no GSC rows for it, and no query can be lost. The site-level context, from `competitor_universe_2026-08-26.md` §7 and the batch index §8, is that Google indexes roughly 21 of 130 URLs on this domain. That is a domain-authority condition, not a technical defect: two of our URLs hold live Google top-10 organic positions today, so indexation is sparse rather than absent.

**Bing, pulled fresh today.**

```
python -c "from optimisation_engine.clients.bing_query_client import BingWebmasterClient; \
           BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')"
# run 2026-08-26. rows = 648
```

**648 site-level queries returned. Zero of them match this cluster.** The match was run twice, at two widths:

| Regex applied to the 648 query strings | Matches |
|---|---|
| `uniform\|laundr` | **0** |
| `uniform\|laundr\|rebate\|refund` (deliberately wider than the cluster) | **0** |

The wider test is the stronger statement and it is the one to quote: the site currently earns **no Bing impression on any query containing the words uniform, laundry, rebate or refund**. The batch index §8 records the narrower version (six of 648 matched across all seven batch-2 clusters, none of them this one); this pack's re-derivation agrees and tightens it.

**Conclusion. Baseline is zero on both engines. Nothing to protect, no DO-NOT-LOSE query, no revert trigger tied to an existing query.** The failure trigger in section 8 is therefore written as a floor to clear, not as a loss to avoid.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'` (32,872 persisted rows, 27 domains, no volume floor). Already paid for in the dossier task ($4.92048). **This task spent $0.00.**

**Selection regex for this cluster, printed so the counts are re-derivable:**

```
ranked_keyword ~ '(uniform|laundr)'
  and ranked_keyword ~ '(tax|rebate|refund|relief|claim|allowance|hmrc)'
```

**Headline figures, re-derived today, with the query that produced them:**

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~ '(uniform|laundr)' and ranked_keyword ~ '(tax|rebate|refund|relief|claim|allowance|hmrc)'),
k as (select ranked_keyword, max(search_volume) v,
   min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos,
   min(position) best_any_pos
 from c group by 1)
select count(*) uniq_kws, sum(v) total_vol,
 sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
 count(*) filter (where best_peer_pos<=10) peer_top10_kws
from k;
-- {"uniq_kws": 118, "total_vol": 55860, "peer_winnable_vol": 27550, "peer_top10_kws": 18}
```

| Measure | Value |
|---|---|
| Deduplicated keywords in cluster | **118** |
| Combined volume | **55,860** |
| **Peer-winnable volume** (a §2a peer holds position <= 20) | **27,550** |
| Keywords a peer holds inside the Google top 10 | **18** |
| Domains contributing | **2** (`lanop.co.uk`, `taxqube.co.uk`) |
| Competitor URLs holding the cluster | **2** |
| **Absent verbatim from this page** | **118 of 118.** The page does not exist |
| Absent verbatim from the whole live blog corpus | **115 of 118** (3 present, all on one other page, see section 6) |

All four headline figures reconcile exactly with `BATCH2_INDEX.md` §1. They do **not** reconcile with the dossier: that divergence is correction 1 in the batch index and is restated in this pack's tail.

**Corpus check for the "verbatim in our copy?" column.** Run read-only over the live blog corpus, 79 files, 1,682,161 characters after HTML-stripping and case and punctuation normalisation:

```
glob("Medical/web/content/blog/*.md")   # 79 files, READ ONLY, nothing edited
# normalise: strip HTML tags, lowercase, non-alphanumerics to spaces, collapse whitespace
# 3 of 118 keywords present verbatim, all in ONE file:
#   rebate for uniform         -> blog/nhs-pension-tax-charges-how-to-minimize.md
#   nhs tax rebate for uniform -> blog/nhs-pension-tax-charges-how-to-minimize.md
#   nhs tax refund uniform     -> blog/nhs-pension-tax-charges-how-to-minimize.md
```

### 3a. The full keyword set

Ordered by volume then alphabetically, not re-sorted or truncated. `Best peer pos` is the best position held by any of the 22 §2a peers. `Best any pos` is the best position held by any harvested domain. On this cluster the two columns are identical on every row, because the only two domains that hold it are both peers. **That single fact is the commercial argument for the page** and it is discussed in section 4.

`Verbatim in our copy?` = the phrase appears, case and punctuation normalised, somewhere in `Medical/web/content/blog/*.md` at sha `77cc1bed`. It is a corpus-wide test, not a this-page test, because this page does not exist.

| Vol | Best peer pos | Best any pos | Top-ranked domain | Verbatim in our copy? | Keyword |
|---|---|---|---|---|---|
| 3600 | 36 | 36 | lanop.co.uk | **no** | tax back on uniform |
| 3600 | 4 | 4 | lanop.co.uk | **no** | tax rebate uniform |
| 3600 | 15 | 15 | lanop.co.uk | **no** | tax uniform refund |
| 3600 | 9 | 9 | lanop.co.uk | **no** | uniform tax rebate |
| 3600 | 10 | 10 | lanop.co.uk | **no** | uniform tax refund |
| 3600 | 28 | 28 | lanop.co.uk | **no** | work uniform tax rebate |
| 3600 | 17 | 17 | lanop.co.uk | **no** | work uniform tax refund |
| 1600 | 24 | 24 | lanop.co.uk | **no** | tax relief on work uniform |
| 1600 | 29 | 29 | lanop.co.uk | **no** | tax relief uniform |
| 1600 | 30 | 30 | lanop.co.uk | **no** | uniform tax allowance |
| 1600 | 76 | 76 | taxqube.co.uk | **no** | uniform tax relief |
| 1300 | 37 | 37 | lanop.co.uk | **no** | uniform tax |
| 880 | 14 | 14 | lanop.co.uk | **no** | hmrc uniform allowance |
| 880 | 10 | 10 | lanop.co.uk | **no** | tax rebate washing uniform |
| 880 | 24 | 24 | lanop.co.uk | **no** | tax refund uniform washing |
| 880 | 15 | 15 | lanop.co.uk | **no** | tax refund washing uniform |
| 880 | 14 | 14 | lanop.co.uk | **no** | uniform washing tax rebate |
| 590 | 37 | 37 | lanop.co.uk | **no** | claim for washing uniform |
| 590 | 22 | 22 | lanop.co.uk | **no** | tax relief cleaning uniform |
| 590 | 70 | 70 | taxqube.co.uk | **no** | tax relief for washing uniform |
| 590 | 19 | 19 | lanop.co.uk | **no** | tax relief uniform laundry |
| 590 | 18 | 18 | lanop.co.uk | **no** | tax relief washing uniform |
| 590 | 30 | 30 | lanop.co.uk | **no** | uniform washing allowance |
| 480 | 31 | 31 | lanop.co.uk | **no** | tax for washing uniform |
| 480 | 14 | 14 | lanop.co.uk | **no** | uniform allowance |
| 480 | 35 | 35 | lanop.co.uk | **no** | washing uniform tax |
| 390 | 8 | 8 | lanop.co.uk | **no** | hmrc uniform tax |
| 320 | 80 | 80 | taxqube.co.uk | **no** | claim tax for uniform |
| 320 | 15 | 15 | lanop.co.uk | **no** | claim tax on uniform |
| 320 | 43 | 43 | lanop.co.uk | **no** | claim tax uniform |
| 320 | 43 | 43 | lanop.co.uk | **no** | tax claim uniform |
| 320 | 43 | 43 | lanop.co.uk | **no** | uniform claim tax |
| 260 | 32 | 32 | taxqube.co.uk | **no** | claim back uniform tax |
| 260 | 33 | 33 | lanop.co.uk | **no** | claim tax back on uniform |
| 260 | 69 | 69 | taxqube.co.uk | **no** | claim tax back uniform |
| 260 | 53 | 53 | taxqube.co.uk | **no** | claim uniform tax back |
| 260 | 9 | 9 | lanop.co.uk | **no** | gov uk uniform tax |
| 260 | 40 | 40 | lanop.co.uk | **no** | how to claim tax for uniform |
| 260 | 35 | 35 | lanop.co.uk | **no** | how to claim uniform tax |
| 260 | 60 | 60 | taxqube.co.uk | **no** | uniform tax claim back |
| 210 | 31 | 31 | lanop.co.uk | **no** | claim tax back for washing uniform |
| 210 | 72 | 72 | taxqube.co.uk | **no** | claim tax for washing uniform |
| 210 | 14 | 14 | lanop.co.uk | **no** | claiming tax back for washing uniform |
| 210 | 50 | 50 | taxqube.co.uk | **no** | claiming tax back uniform |
| 210 | 5 | 5 | lanop.co.uk | **no** | hm revenue and customs uniform tax rebate |
| 210 | 21 | 21 | lanop.co.uk | **no** | hmrc claim uniform |
| 210 | 13 | 13 | lanop.co.uk | **no** | hmrc uniform tax rebate |
| 210 | 32 | 32 | lanop.co.uk | **no** | how much can you claim for washing uniform uk |
| 210 | 36 | 36 | lanop.co.uk | **no** | how to claim for washing work uniform |
| 210 | 32 | 32 | lanop.co.uk | **no** | how to claim washing uniform |
| 210 | 40 | 40 | lanop.co.uk | **no** | tax claim washing uniform |
| 210 | 27 | 27 | lanop.co.uk | **no** | uniform tax refund hmrc |
| 170 | 35 | 35 | lanop.co.uk | **no** | hmrc uniform |
| 170 | 38 | 38 | lanop.co.uk | **no** | hmrc uniform laundry allowance calculator |
| 170 | 31 | 31 | lanop.co.uk | YES | rebate for uniform |
| 170 | 37 | 37 | lanop.co.uk | **no** | uniform claim |
| 170 | 17 | 17 | lanop.co.uk | **no** | uniform hmrc |
| 170 | 4 | 4 | lanop.co.uk | **no** | uniform rebate |
| 140 | 42 | 42 | lanop.co.uk | **no** | claim uniform allowance |
| 140 | 44 | 44 | lanop.co.uk | **no** | claiming uniform allowance |
| 140 | 10 | 10 | lanop.co.uk | YES | nhs tax rebate for uniform |
| 140 | 17 | 17 | lanop.co.uk | **no** | nhs tax rebate uniform |
| 140 | 9 | 9 | lanop.co.uk | YES | nhs tax refund uniform |
| 140 | 11 | 11 | lanop.co.uk | **no** | nhs uniform tax rebate |
| 140 | 9 | 9 | lanop.co.uk | **no** | tax code uniform |
| 140 | 14 | 14 | lanop.co.uk | **no** | tax rebate nhs uniform |
| 140 | 38 | 38 | lanop.co.uk | **no** | uniform tax code |
| 140 | 15 | 15 | lanop.co.uk | **no** | uniform tax rebate nhs |
| 140 | 44 | 44 | lanop.co.uk | **no** | work uniform tax |
| 110 | 16 | 16 | lanop.co.uk | **no** | claim tax back for uniform |
| 110 | 7 | 7 | lanop.co.uk | **no** | gov uk uniform tax rebate |
| 110 | 27 | 27 | lanop.co.uk | **no** | government uniform tax rebate |
| 110 | 35 | 35 | lanop.co.uk | **no** | hmrc cleaning uniform |
| 110 | 26 | 26 | lanop.co.uk | **no** | hmrc wash uniform |
| 110 | 37 | 37 | lanop.co.uk | **no** | how do i claim tax back on uniform |
| 110 | 30 | 30 | lanop.co.uk | **no** | how to claim back tax for uniform |
| 110 | 29 | 29 | lanop.co.uk | **no** | how to claim back tax for washing uniform |
| 110 | 19 | 19 | lanop.co.uk | **no** | how to claim tax back for uniform |
| 110 | 27 | 27 | lanop.co.uk | **no** | how to claim tax back for washing uniform |
| 110 | 40 | 40 | lanop.co.uk | **no** | how to claim tax back on uniform |
| 110 | 32 | 32 | lanop.co.uk | **no** | how to claim tax rebate for washing uniform |
| 110 | 28 | 28 | lanop.co.uk | **no** | how to claim tax relief for washing uniform |
| 110 | 36 | 36 | lanop.co.uk | **no** | laundry tax relief |
| 110 | 13 | 13 | lanop.co.uk | **no** | tax rebate uniform gov |
| 110 | 22 | 22 | lanop.co.uk | **no** | tax relief for washing uniform uk |
| 110 | 33 | 33 | lanop.co.uk | **no** | tax relief laundry |
| 110 | 15 | 15 | lanop.co.uk | **no** | uk uniform tax rebate |
| 110 | 25 | 25 | lanop.co.uk | **no** | uniform tax rebate gov |
| 110 | 5 | 5 | lanop.co.uk | **no** | uniform tax rebate gov uk |
| 110 | 24 | 24 | lanop.co.uk | **no** | uniform tax rebate government |
| 110 | 5 | 5 | lanop.co.uk | **no** | uniform tax rebate uk |
| 110 | 8 | 8 | lanop.co.uk | **no** | uniform tax rebates uk |
| 110 | 3 | 3 | lanop.co.uk | **no** | uniform tax refund uk |
| 110 | 7 | 7 | lanop.co.uk | **no** | uniform tax relief uk |
| 90 | 20 | 20 | lanop.co.uk | **no** | hmrc uniform laundry allowance eligibility |
| 90 | 29 | 29 | lanop.co.uk | **no** | how to claim uniform allowance |
| 90 | 28 | 28 | lanop.co.uk | **no** | tax code for uniform washing |
| 90 | 29 | 29 | lanop.co.uk | **no** | tax code for washing uniform |
| 90 | 36 | 36 | lanop.co.uk | **no** | uniform tax claim |
| 90 | 37 | 37 | lanop.co.uk | **no** | work clothes laundry tax rebate |
| 70 | 24 | 24 | lanop.co.uk | **no** | claim money for washing uniform |
| 70 | 75 | 75 | taxqube.co.uk | **no** | claim uniform expenses |
| 70 | 82 | 82 | taxqube.co.uk | **no** | claiming uniform expenses |
| 70 | 30 | 30 | lanop.co.uk | **no** | cleaning work uniform tax rebate |
| 70 | 38 | 38 | lanop.co.uk | **no** | how much is the uniform allowance |
| 70 | 16 | 16 | lanop.co.uk | **no** | nhs uniform allowance |
| 70 | 35 | 35 | lanop.co.uk | **no** | tax code for uniform allowance |
| 70 | 9 | 9 | lanop.co.uk | **no** | tax deduction for uniform |
| 70 | 40 | 40 | lanop.co.uk | **no** | tax deduction for uniforms |
| 70 | 18 | 18 | lanop.co.uk | **no** | tax rebate uniform cleaning |
| 70 | 24 | 24 | lanop.co.uk | **no** | uniform cleaning tax rebate |
| 70 | 72 | 72 | lanop.co.uk | **no** | work uniforms tax deductible |
| 50 | 43 | 43 | lanop.co.uk | **no** | laundry allowance |
| 50 | 51 | 51 | lanop.co.uk | **no** | tax allowance laundry |
| 50 | 26 | 26 | lanop.co.uk | **no** | tax deduction uniform |
| 50 | 60 | 60 | lanop.co.uk | **no** | tax deductions uniform |
| 50 | 16 | 16 | lanop.co.uk | **no** | tax refund for washing uniform |
| 50 | 47 | 47 | lanop.co.uk | **no** | uniform tax deduction |

---

## 4. Competitor teardown

**The whole field is two pages.** The query that establishes it, and it is the most important number in this pack:

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~ '(uniform|laundr)' and ranked_keyword ~ '(tax|rebate|refund|relief|claim|allowance|hmrc)')
select competitor_domain, url, count(distinct ranked_keyword) kws, sum(search_volume) vol, min(position) best
from c group by 1,2 order by kws desc;
```

| Domain | URL | In-cluster kws | Volume | Best pos | Class |
|---|---|---|---|---|---|
| lanop.co.uk | `https://lanop.co.uk/uniform-tax-rebate-uk-guide/` | **107** | 51,750 | **3** | **peer** (§2a row 12) |
| taxqube.co.uk | `https://taxqube.co.uk/tax-relief-for-nhs-medical-professionals/` | **31** | 16,170 | 32 | **peer** (§2a row 18) |

Two rows. Not two rows above a threshold: **two rows, full stop.** Across a 32,872-row harvest of 27 domains, no third URL holds a single keyword in this cluster.

Two further pages were read because the brief requires them, both non-peer or non-ranking in this cluster, read for vocabulary and heading patterns only per `language_spec` Part 4 point 4. **All four URLs returned HTTP 200. There are no fetch failures in this teardown and no competitor page has been dropped.**

### 4.1 https://lanop.co.uk/uniform-tax-rebate-uk-guide/
**107 in-cluster keywords · 51,750 volume · best position 3 · PEER** (`competitor_universe_2026-08-26.md` §2a row 12: "Generalist London firm with a doctors service page", 3 of 18 head terms, best organic 5). **Fetched 2026-08-26, HTTP 200.**

- **Title / H1:** "Uniform Tax Rebate UK 2026: Eligibility, Amount, and How to Claim". Approximately **3,500 to 4,000 words**.
- **H2 set, verbatim and in order (19):** Introduction · What Is a Uniform Tax Rebate? · Who Qualifies for a Uniform Tax Rebate? · What Counts as a Work Uniform? · Uniform Tax Rebate Amount: How Much Can You Claim? · Step-by-Step Guide to Claiming · What Happens After You Submit? · How Long Does a Uniform Tax Rebate Take? · Claiming for Previous Years · Common Reasons Claims Are Rejected · How to Fix a Rejected Claim · Uniform Tax Rebate for Specific Professions · Special Cases · DIY vs Using a Claims Company · Uniform Tax Rebate for Employers · Is It Worth Claiming? · Key Takeaways · FAQs · Conclusion.
- **H3 set, verbatim and in order (27):** Definition · Tax Relief vs Rebate · Who It Applies To · Eligibility Rules · Who Does Not Qualify · Quick Eligibility Checklist · Examples: Eligible vs Not Eligible · Grey Areas · Flat Rate Explained · Real Payout Examples · Why Amounts Seem Low · Flat Rate vs Actual Cost Claims · Online Method (Fastest) · P87 Method · Self-Assessment · Processing · Tax Code vs Refund · The 4-Year Rule · Example · NHS Workers · Other Common Roles · Multiple Jobs · Part-Time Workers · Agency Workers · Employer Role · Compliance.
- **Structure:** three tables (an occupational-rates table, a DIY versus claims-company comparison, a flat-rate versus actual-cost comparison). **FAQ block: yes, 12 questions.** Calculator: no. **Worked numerical examples: yes, several.**
- **Figures it states:** £60 standard flat rate; £125 NHS nurses and midwives; £185 ambulance staff; £140 police; £80 prison officers; £120 mechanics; £120 chefs; £12 relief at 20% on £60; £25 at 20% on £125; £37 at 20% on £185; a £48 four-year cumulative example; a £200 four-year example at 40%; claims-company fees of 20% to 40% and a £19 fee example; 4-year backdating limit; 5 to 10 working days online, 6 to 8 weeks by post.
- **Forms:** P87, Self Assessment. **Repayment agents:** discussed as "claims company", with the fee range stated. No deed of assignment mentioned, no assignment discussion, no contingent-fee offer of its own.
- **Author:** named, with credentials. "Aurangzaib Chawla, Tax Partner, Managing Partner at Lanop Business & Tax Advisors, 19 years' experience". **We cannot copy that (I2). Authority here is faceless.**
- **Opening 60 words, verbatim:** "Every year, thousands of UK workers miss out on money they are owed. If you wear a uniform at work, you may qualify for a uniform tax rebate. Most people never claim it. HMRC's rules can seem confusing."

**Judgement.** This is a genuinely good page and it should be treated as the benchmark, not as a straw man. It is the most complete treatment of the topic anywhere in the harvest, it has the tables, the worked payouts, the four-year rule, the rejection reasons and a twelve-question FAQ, and it holds 107 of the cluster's 118 keywords with it. It beats us on nothing we cannot take, and it loses on four specific things.

1. **It is a general-population page with an NHS subsection.** "NHS Workers" is one H3 inside a 4,000-word page that also covers police, prison officers, mechanics and chefs. It is written for anyone in a uniform. The NHS reader is a segment, not the audience.
2. **It opens on a scene-setter that violates A1 and A3 outright.** Four sentences, no number, "thousands of UK workers miss out on money they are owed", "HMRC's rules can seem confusing". A1 requires the answer inside 60 words; this page spends its 60 words on framing.
3. **It carries at least one figure that is wrong for 2026/27 if repeated.** It states mileage at 45p for the first 10,000 miles. `house_positions.md` §8, verified at source on 2026-08-26, gives **55p** for the first 10,000 miles from 6 April 2026, 25p thereafter. Any figure lifted from this page is presumed stale until re-read at source. See section 7.5.
4. **Its flat-rate figures disagree with the other peer's**, and neither is a primary source. See 4.5.

It also does one thing we should study and one thing we must not copy. Study: the "Common Reasons Claims Are Rejected" and "How to Fix a Rejected Claim" pair, which is the only failure-mode content anywhere in this teardown and is exactly the shape of the "missing statements / resubmitting incorrect statements" whitespace the McCloud pack found on a different topic. Do not copy: the named author with credentials (I2), and the "money they are owed" framing, which is the emotional register the repayment-agent industry uses.

### 4.2 https://taxqube.co.uk/tax-relief-for-nhs-medical-professionals/
**31 in-cluster keywords · 16,170 volume · best position 32 · PEER** (§2a row 18: "Small generalist with a medical/healthcare industry page", 2 of 18 head terms, best organic 6). **Fetched 2026-08-26, HTTP 200.**

- **Title / H1:** "Tax Relief for NHS Medical Professionals". Approximately **1,100 words**.
- **H2 set, verbatim and in order (5):** What can I claim an NHS tax rebate for? · What can a Nurse claim a tax rebate for? · How to claim your Nurses Tax Rebate · Looking for a Specialist? · Our Expert Team Can Help.
- **H3 set, verbatim and in order (4):** NHS uniform tax rebate · Membership of professional bodies and unions · NHS mileage tax relief · Work equipment and tools.
- **Structure:** no table, no FAQ block, no calculator, **no worked example**. Two of its five H2s are about the firm.
- **Figures it states:** uniform tax rebate £100 per year; shoes and tights £18 each per tax year; mileage 45p per mile to 10,000 miles; HMRC response 8 to 12 weeks.
- **Professional bodies named:** Nursing and Midwifery Council (NMC), Royal College of Nursing (RCN), UNISON.
- **Author:** named, "Iwona (Client Manager)". Same I2 problem.
- **Opening 60 words, verbatim:** "You may be entitled to tax relief on work-related expenses even if you get paid through payroll. There's good news! This applies not only to the current tax year, but also to the previous four years, lowering your future tax bill for as long as you are employed."

**Judgement. This is the page we take, and it is thin enough to take on substance alone.** Eleven hundred words, no table, no example, no FAQ, two of five headings selling the firm, an exclamation mark in the second sentence (D2), and a mileage figure that is a full year out of date. It is nonetheless holding 31 keywords and 16,170 volume, which is the measure of how empty this SERP is. Its one genuine asset is that it is **NHS-framed from the H1 down**, which is the framing lanop lacks, and it pairs uniform relief with professional-body subscriptions in the same page, which is exactly the O7 scope. It proves the shape of the page we should build. It does not defend it.

### 4.3 https://taxqube.co.uk/healthcare-workers-tax-rebate/
**Read for vocabulary and heading patterns. It holds zero keywords in this cluster** (it does not appear in the two-row URL query above), so it is not a rank competitor here. **Fetched 2026-08-26, HTTP 200.**

- **Headings, verbatim and in order (7):** Can I Deduct Professional Fees? · Can I Claim Tax Relief for the Cost of Shoes and Tights? · What about tax deductions for laundry expenses? · Can I get a tax deduction for business miles? · Can I claim Tax Relief for Specialist Equipment? · Looking for a Specialist? · Our Expert Team Can Help.
- Approximately **1,100 words**. No table, no FAQ, no calculator, no worked example, no pricing, no contingent-fee offer.
- **Figures:** tights £6 per tax year; shoes £12 per tax year; laundry £125 per year "for certain roles"; mileage 45p / 25p; four-year backdating throughout.

**Judgement.** Its value is the heading form, and it is the best heading model in the teardown: **five consecutive reader-voice questions, every one of them a claimable-item question in the reader's own words.** That is B2 and B4 satisfied by construction and it is worth copying as a pattern. Note also that the same firm publishes **two different uniform and laundry figures on two pages**: £100 per year on 4.2 and £125 per year here, alongside £18 for shoes and tights on 4.2 versus £6 plus £12 on this page. That is not a rounding difference, it is an internal contradiction inside one peer, and it is direct evidence for why section 7.5 refuses to let this page state any flat rate that has not been read in HMRC's own table.

### 4.4 https://www.bma.org.uk/pay-and-contracts/tax/tax-claim/claiming-for-professional-expenses
**Non-peer institutional** (`competitor_universe_2026-08-26.md` §2b, bma.org.uk, 15 of 18 head terms, best position 1, "cannot be outranked on brand"). Read for vocabulary and heading patterns only, never as a rank target. **Fetched 2026-08-26, HTTP 200.**

- **Headings, verbatim and in order (13, of which 7 are site chrome):** Claim tax back on your professional expenses · Eligible expenses for tax relief · Simplify the claims process with our tax relief tool · When to claim/large claims · When to claim · Large claims · Understanding your tax code · Completing the P87 tax claim form yourself · You might also be interested in · About the BMA · Shortcuts · Legal · Follow the BMA.
- Approximately **2,400 words**. No table, no FAQ, no worked example.
- **Vocabulary, exactly as used:** "Professional memberships and subscriptions"; "your annual membership fees to organisations such as the BMA"; "memberships and subscriptions like your BMA membership... GMC, and Royal Colleges"; "complete list of HMRC-approved professional bodies"; "P87 tax claim form"; self-assessment for claims over £2,500; "current tax year and the four previous tax years".
- **The words "uniform", "laundry" and "flat rate expenses" do not appear on the page at all.**
- **Opening 60 words, verbatim:** "If you're a UK taxpayer, you may be eligible to reclaim tax on common professional expenses. The process doesn't have to be complicated; our tax relief tool helps you take control of your claim and ensure you're not leaving money on the".

**Judgement, and it is the most useful single observation in this teardown.** The BMA owns the professional-subscription half of O7 with a 2,400-word page and a branded claim tool, and it **does not mention uniform or laundry once**. The union's page is about fees; the two peers' pages are about uniforms. Nobody joins them for a doctor. Note also the two vocabulary items worth carrying because the reader's own union uses them: **"P87 tax claim form"** (not "form P87") and **the £2,500 self-assessment threshold**, which neither peer states and which is the actual fork in the claim route. The £2,500 figure must be re-verified at source before use (section 7.5).

Its "Understanding your tax code" heading matters for a different reason: eight keywords in the set are tax-code phrasings (`tax code uniform` 140 at peer position 9, `uniform tax code` 140, `tax code for washing uniform` 90, `tax code for uniform washing` 90, `tax code for uniform allowance` 70, and three others), and the reason they exist is that flat-rate relief is usually delivered as a coding adjustment rather than a cheque. That is the single most common misunderstanding in the cluster and section 5 treats it as whitespace.

### 4.5 The flat-rate figures do not agree, across three competitor pages

Stated as a table because it is the reason for the section 7.5 gate, not as an aside.

| Item | lanop (4.1) | taxqube NHS page (4.2) | taxqube healthcare page (4.3) |
|---|---|---|---|
| Uniform / laundry, NHS | £125 (nurses and midwives) | £100 | £125 ("certain roles") |
| Ambulance staff | £185 | not stated | not stated |
| Shoes | included in £18 pair figure? no | £18 for shoes and tights together | £12 |
| Tights | as above | as above | £6 |
| Standard flat rate | £60 | not stated | not stated |
| Mileage, first 10,000 miles | 45p | 45p | 45p |

Three peer pages, three different answers on the NHS uniform figure, and all three carry a mileage rate that `house_positions.md` §8 shows is stale for 2026/27 (55p from 6 April 2026, verified at gov.uk on 2026-08-26). **Not one number in this table may be copied.** Every one of them is a candidate to be right and none of them is a source.

### 4.6 The teardown's key question, answered

**The question: the field is only two pages deep on a 55,860-volume cluster held by beatable peers. What does that mean, and is it real or a measurement artefact?**

**It is partly real and partly an artefact, and the two halves point the same way. The answer is: build it.**

**The artefact half, stated first because it is the honest part.** The harvest is `ranked_keywords` for 27 named domains, so it can only ever surface pages belonging to those 27. The real Google SERP for `uniform tax rebate` is not two pages deep. It will contain gov.uk, MoneySavingExpert, Which, Citizens Advice, several unions, and a dense layer of commercial repayment agents whose entire business is this query. **None of those are in the competitor set, so none of them can appear in this table.** Anyone reading "the field is two pages deep" as "the SERP is two pages deep" has misread the instrument. The dossier records the same limitation in a different form at `BATCH2_INDEX.md` §7: absence in the harvest is evidence about the competitor set, not about the market.

**The real half, and it is the half that decides the build.** The measurement is not "how many pages exist", it is **"how much of this cluster is held by domains we have already classified as beatable, and at what positions"**. On that question the instrument is exactly the right one and the answer is unambiguous:

- **Both** holding domains are §2a peers. Zero of the 118 keywords are held by an institution in this harvest.
- The best-any-domain and best-peer positions are **identical on all 118 rows**, because there is no non-peer domain in the harvest holding any of it.
- A peer holds **18** of the 118 inside the Google top 10, including position 3 on `uniform tax refund uk`, position 4 on `tax rebate uniform` and `uniform rebate`, and position 5 on `hm revenue and customs uniform tax rebate`, `uniform tax rebate gov uk` and `uniform tax rebate uk`.
- **27,550 of the 55,860 volume is peer-winnable**, which is 49% and the largest such number in batch 2 by a factor of six (the next is 4,240, `BATCH2_INDEX.md` §1).

Read together: **the unwinnable layer that dominates every other cluster on this site is absent here.** On NHS pension topics, bma.org.uk and nhsbsa.nhs.uk hold the slots and the ceiling is brand. On this cluster the harvest contains no BMA row at all, because the BMA's own page on the adjacent topic does not mention uniforms (4.4). What is in front of us is one strong generalist page written for the general public with an NHS subsection, and one thin service page.

**And one more thing the two-row result tells us that a deeper harvest would not.** Neither of the two pages is a specialist medical accountancy firm. Not medicsmoney, not bw-medical, not sandisoneasson, not ramsaybrown, not accountants4nhsdoctors. **Twenty of the twenty-two peers, including every specialist medical peer in the universe, hold nothing here.** The specialist layer of this niche has collectively decided that uniform relief is beneath a doctors' accountancy site, and the volume went to a London generalist and a small firm's thin page. That is a real gap in a real market, and it is the gap this page fills, provided it is written for the NHS reader that neither page is written for.

**The one caveat that must go in the writer's brief.** The volume is real but the **money per reader is small**, and the page must say so rather than pretend otherwise. lanop's own arithmetic makes the point: £48 over four years at the standard rate. A page that promises a windfall on a £12-a-year deduction is doing what the repayment agents do. The page's honesty about size is both an editorial requirement (F7, D1) and the thing that most sharply differentiates it from the industry that owns this vocabulary.

### 4.7 Coverage checklist: union of their heading themes, minus what we would have

Union across 4.1, 4.2, 4.3 and 4.4, deduplicated. "Ours" means required or permitted by section 7 of this pack. Every theme must end QA marked **covered**, **declined-with-reason**, or **belongs-to-another-page**, undecided count **0**.

| # | Theme | Seen at | Verdict |
|---|---|---|---|
| 1 | What a uniform tax rebate is; relief versus rebate | 4.1 | **OURS**, and it is the A1 answer |
| 2 | Who qualifies / eligibility rules | 4.1, 4.3 | **OURS** |
| 3 | What counts as a work uniform (and what does not) | 4.1 | **OURS.** The scrubs / own-clothes distinction is the NHS-specific fork |
| 4 | Who does **not** qualify, and grey areas | 4.1 | **OURS.** Highest-value inherited theme. The employer-launders and employer-provides cases are the honest answer for most NHS staff |
| 5 | How much: the flat rate, by occupation | 4.1, 4.2, 4.3 | **OURS**, gated on 7.5. No figure until read in HMRC's own table |
| 6 | Why the amounts seem low | 4.1 | **OURS.** Directly serves the section 4.6 honesty requirement |
| 7 | Flat rate versus actual cost | 4.1 | **OURS** |
| 8 | Step-by-step: how to claim (online, P87, self-assessment) | 4.1, 4.2, 4.4 | **OURS.** O8 |
| 9 | The £2,500 threshold that forces the self-assessment route | 4.4 only | **OURS**, gated on 7.5. Neither peer has it |
| 10 | The four-year rule / claiming previous years | 4.1, 4.2, 4.3, 4.4 | **OURS.** O8 |
| 11 | What happens after you submit; how long it takes | 4.1, 4.2, 4.3 | **OURS**, one short section, timescales framed as typical and not asserted as a rule |
| 12 | **Tax code versus refund** | 4.1 (H3), 4.4 (H2) | **OURS.** Whitespace item 1, section 5 |
| 13 | Common reasons claims are rejected, and how to fix one | 4.1 only | **OURS.** The best inherited theme in the teardown |
| 14 | By profession: NHS workers specifically | 4.1 (one H3), 4.2, 4.3 | **OURS, and it is the whole page rather than a section.** This is the differentiator |
| 15 | Other professions: police, prison, mechanics, chefs, retail | 4.1 | **DECLINED WITH REASON.** Off-niche. This is medicalaccounts.co.uk. Section 7.7 makes it a hard fail |
| 16 | Multiple jobs, part-time, agency workers | 4.1 | **OURS**, compressed. The bank and agency case is genuinely NHS-relevant |
| 17 | **DIY versus using a claims company** | 4.1 only | **OURS, and mandatory.** This is O8's repayment-agent warning and section 7.6 makes it a hard requirement rather than an option |
| 18 | Uniform tax rebate for employers / employer compliance | 4.1 | **DECLINED WITH REASON.** Employer-side PAYE compliance belongs to `/blog/gp-payroll-services`, which is FROZEN to 2026-09-10. One sentence maximum, no section |
| 19 | Is it worth claiming | 4.1 | **OURS**, and it must answer honestly, including "often no, and here is when" |
| 20 | Professional memberships and subscriptions; List 3 | 4.2, 4.3, 4.4 | **OURS.** O7's second half. See correction 3 in the tail: the demand for it sits outside this cluster's regex and is BMA-held |
| 21 | Union fees (BMA, RCN, UNISON) as deductible | 4.2, 4.4 | **OURS**, one sentence inside theme 20. `house_positions.md` §8 locks BMA and Royal College fees as deductible where on List 3 |
| 22 | GMC and Royal College fees | 4.4 | **OURS as deductibility only. NO FIGURE, EVER.** O9 and F5. Hard fail |
| 23 | Shoes and tights allowances | 4.2, 4.3 | **OURS**, gated on 7.5, and only if it survives primary-source verification |
| 24 | Mileage / business miles | 4.1, 4.2, 4.3, 4.4 | **BELONGS TO ANOTHER PAGE.** `/blog/gp-tax-deductions-complete-list-2026`, FROZEN. One sentence and a link, and if a rate is stated it is 55p / 25p for 2026/27 per house positions §8, never the 45p all three competitors print |
| 25 | Specialist equipment and tools | 4.1, 4.2, 4.3 | **BELONGS TO ANOTHER PAGE.** `/blog/medical-professional-expenses-what-is-claimable`, FROZEN. One sentence and a link |
| 26 | Understanding your tax code, generally | 4.4 | **OURS**, but only the uniform-relief slice of it (theme 12) |
| 27 | A branded claim tool / calculator | 4.4 | **DECLINED WITH REASON.** No tool is built by this page and none is promised. Building one is a separate owner-triggered decision |
| 28 | "Looking for a specialist" / "Our expert team can help" as body headings | 4.2, 4.3 | **DECLINED WITH REASON.** D3 and I7. One CTA at the end of the page, using the existing component, and nothing in a heading |
| 29 | Named author with credentials and years of experience | 4.1, 4.2 | **DECLINED WITH REASON.** I2. Authority on this site is faceless and institutional |
| 30 | Worked payout examples with figures | 4.1 | **OURS. Exactly one**, per G1 to G7 |
| 31 | An FAQ block | 4.1 (12 questions) | **OURS, 4 to 8 questions**, per H1. Twelve is a keyword dump |

**Thirty-one themes. 21 ours, 5 declined-with-reason, 3 belong-to-another-page, and 2 (12 and 13) are inherited from a single competitor and are the sharpest additions available.** Undecided must be **0** at QA.

---

## 5. Whitespace

Six items. Each is a thing no page in the teardown does, stated with the evidence.

1. **Nobody explains that the relief usually arrives as a tax-code change, not as money.** Eight keywords in the set are tax-code phrasings, led by `tax code uniform` (140, peer position **9**, top ten) and `uniform tax code` (140), plus `tax code for washing uniform` (90), `tax code for uniform washing` (90), `tax code for uniform allowance` (70) and `uniform tax code` variants. lanop gives it one H3 called "Tax Code vs Refund"; the BMA gives it a heading and then talks about codes generally. **Nobody says the sentence a reader needs**, which is that a flat-rate expense is normally coded into the current year going forward and only the backdated years produce a repayment, which is why the reader who expected a cheque got a code notice instead. This is the single clearest piece of open whitespace in the cluster and it sits on a peer-top-10 keyword.

2. **Nobody tells an NHS reader the most likely answer is no, and why.** Most NHS trusts launder uniforms, provide laundering facilities, or already give an allowance, and where the employer provides or pays for laundering there is no deduction. lanop has "Who Does Not Qualify" and "Grey Areas" but writes them for the general population. Neither taxqube page raises the possibility of a nil answer at all. **A page that leads with the disqualifying condition rather than the payout is both more accurate and, on this vocabulary, more differentiated than any amount of extra detail.** It is also the direct antidote to the repayment-agent framing that owns this SERP.

3. **Nobody separates "already in your code" from "never claimed".** Where the flat rate is already in the code, claiming it again produces an underpayment rather than a refund. This appears nowhere in the teardown. It appears, in one sentence, in our own corpus already (section 6), which means we have the insight and have buried it in an FAQ on a pension page.

4. **Nobody handles the doctor case as distinct from the nurse case.** Every page in the teardown that mentions healthcare means nursing: taxqube's H2 is literally "What can a Nurse claim a tax rebate for?", lanop's H3 is "NHS Workers" and its table row is "NHS nurses & midwives". A hospital doctor's position is genuinely different (scrubs are usually provided and laundered, so the flat rate is often unavailable, while the professional-subscription route usually is available and is worth more). **No page in the harvest makes that distinction**, and it is the one this site is uniquely placed to make. It is also the honest reason the page belongs on medicalaccounts.co.uk rather than being a generic uniform page with the word NHS in the title.

5. **Nobody joins uniform relief to professional subscriptions for the same reader in the same claim.** The BMA owns subscriptions and never says "uniform" (4.4). The two peers own uniform and treat subscriptions as a sub-heading. **They are the same claim, on the same form, subject to the same four-year limit**, and the reader making one should make the other. Joining them is O7 plus O8 in one page and it is what the ownership map already assigned here.

6. **Nobody warns about repayment agents in the reader's interest.** lanop is the only page that mentions claims companies at all, and it does so as a "DIY vs Using a Claims Company" comparison with a fee range. Nobody explains what a deed of assignment does to a repayment, or that the assignment route can redirect repayments the reader did not intend to assign. **We own this under O8 and section 7.6 makes it mandatory.** It is also the clearest possible demonstration that this page is not selling what the vocabulary sounds like it is selling.

**No "depth to keep" list exists for this page.** There is no live page.

---

## 6. Our current position, read honestly

**There is no page. There is no `Medical/web/content/blog/nhs-uniform-tax-relief-laundry-allowance.md` and no URL at `/blog/nhs-uniform-tax-relief-laundry-allowance`.** That is the whole of the position, and everything below is about the corpus around the hole rather than about the page.

**What the live corpus already says about this topic.** Read-only grep over `Medical/web/content/` at sha `77cc1bed`:

| Search | Files | Where |
|---|---|---|
| `uniform` or `laundr` | 1 file with substantive treatment | `blog/nhs-pension-tax-charges-how-to-minimize.md` |
| `List 3` / `professional subscription` | several, all as one-line deductibility mentions | `blog/medical-professional-expenses-what-is-claimable.md`, `blog/gp-tax-deductions-complete-list-2026.md` (both **FROZEN**), plus city and guide pages |
| `P87` | 3 files | `blog/gp-home-office-expenses-tax-relief.md`, `blog/gp-partner-vs-salaried-gp-tax-comparison.md`, `blog/nhs-pension-tax-charges-how-to-minimize.md` |
| `flat-rate expense` | 1 file | `blog/nhs-pension-tax-charges-how-to-minimize.md` |
| `repayment agent` or `deed of assignment` | **0 files** | Nowhere in the corpus |

**The finding that matters, and it is not in the batch index.** `blog/nhs-pension-tax-charges-how-to-minimize.md` carries, in its frontmatter `faqs` array, three questions that are **squarely O7 and O8 material on a page that owns neither**:

- "Is there an NHS tax rebate for uniform and laundry costs?" This answer states the employer-provides condition, that HMRC gives a flat-rate deduction set by occupation rather than a repayment of what was spent, that uniform relief is often already sitting in a tax code so claiming it a second time creates an underpayment, and that doctors in Self Assessment claim it on the return.
- "How many years can you claim tax back?" This answer states four years, cites Taxes Management Act 1970 section 43, and works the 2022/23 to 5 April 2027 example.
- "Do I need receipts to claim an NHS tax refund?" This answer states the flat-rate exception and the reimbursed-fee rule.

**That is whitespace items 2 and 3 from section 5, and the whole of O8's four-year limb, already written, on a pension-tax page.** It is also the source of all three of the cluster's verbatim corpus matches recorded in section 3.

**How to handle it, and this is a ruling not a suggestion.**

- `nhs-pension-tax-charges-how-to-minimize` is **not on the frozen list** (`select slug,status,monitor_until from monitored_pages where site_key='medical' and monitor_until > now()` returns 19 rows on 2026-08-26 and it is not among them). So it is editable in principle.
- **It is not edited by this batch and not by this writer.** `BATCH2_INDEX.md` §1 scopes batch 2 to seven new files, and this pack's section 1 forbids touching anything else under `Medical/web/`. Other agents are working in that directory concurrently.
- **The new page becomes the owner** of O7 and O8 under the ownership map. The overlap is therefore a **known, recorded, deliberate duplication for the length of batch 2**, not an accident, and it is listed as correction 2 in the tail so a later pass can resolve it rather than rediscovering it.
- **The writer must read those three FAQ answers before drafting** and must not reproduce their sentences, because V3 and J1 both bite: batch 1 was blocked for exactly this shape of near-identical wording across pages. Section 7.9 makes it countable.

**What the corpus does not have at all.** No flat-rate expense table, no occupational rates, no P87 walkthrough, no `£2,500` self-assessment threshold, no NMC or RCN figures, no repayment-agent warning anywhere on the site, and no page whose topic is this. **115 of the cluster's 118 phrasings are absent from the entire 79-file blog corpus.**

---

## 7. Deterministic acceptance criteria

**Every criterion below is numbered `C<n>`, is countable by a checker without judgement, and carries a verdict of PASS or FAIL. There are 46. A page with any FAIL on a criterion marked HARD does not ship.**

### 7.1 Exact phrases that must appear, **18 required**

Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary` or body prose. Matching is verbatim, case and punctuation normalised.

**The cap comes first, because this cluster is the exact case rule V1 was written for.** The set contains fifteen word orders of one idea at 3,600 volume each. **V1 permits two orders per idea per page. It is not licence for fifteen.** The nine idea families below are the whole cluster, and each gets exactly two.

| # | Family | Required phrase A | Vol | Peer pos | Required phrase B | Vol | Peer pos |
|---|---|---|---|---|---|---|---|
| F1 | the head term | `uniform tax rebate` | 3,600 | **9** | `uniform tax refund` | 3,600 | **10** |
| F2 | NHS-qualified head | `nhs uniform tax rebate` | 140 | 11 | `uniform tax rebate nhs` | 140 | 15 |
| F3 | washing and laundering | `tax rebate washing uniform` | 880 | **10** | `tax relief washing uniform` | 590 | 18 |
| F4 | the allowance framing | `hmrc uniform allowance` | 880 | 14 | `uniform tax allowance` | 1,600 | 30 |
| F5 | the relief framing | `uniform tax relief` | 1,600 | 76 | `tax relief on work uniform` | 1,600 | 24 |
| F6 | how to claim | `claim tax back on uniform` | 260 | 33 | `how to claim uniform tax` | 260 | 35 |
| F7 | the tax-code family | `tax code uniform` | 140 | **9** | `uniform tax code` | 140 | 38 |
| F8 | laundry standalone | `laundry tax relief` | 110 | 36 | `laundry allowance` | 50 | 43 |
| F9 | the UK-qualified head | `uniform tax refund uk` | 110 | **3** | `uniform tax rebate uk` | 110 | **5** |

**C1 (HARD).** All **18** phrases present verbatim. Checker names any that are not. Count required: 18 of 18.
**C2 (HARD).** **No more than two** distinct word orders from any one family F1 to F9 appear verbatim anywhere on the page. A third occurrence of a family is a **V1 defect**, not thoroughness. Checker counts distinct listed orders present per family; any family above 2 is a FAIL.
**C3.** Six of the 18 are rows a peer holds inside the Google top 10 (`uniform tax rebate` 9, `uniform tax refund` 10, `tax rebate washing uniform` 10, `tax code uniform` 9, `uniform tax refund uk` 3, `uniform tax rebate uk` 5). All six must be placed in a **structural** surface (`metaTitle`, `h1`, an `<h2>`, an `<h3>` or an `faqs[].question`), not only in body prose.
**C4 (HARD).** `h1` contains the dominant query's word order verbatim: `uniform tax rebate` **or** `uniform tax relief`. B1.

**Deferred with reason, 8 rows.** `gov uk uniform tax` (260), `hm revenue and customs uniform tax rebate` (210), `gov uk uniform tax rebate` (110), `government uniform tax rebate` (110), `tax rebate uniform gov` (110), `uniform tax rebate gov` (110), `uniform tax rebate gov uk` (110), `uniform tax rebate government` (110). These are **navigational intent aimed at gov.uk**. They cannot be placed as natural English without narrating the search string, which V2 forbids outright. Reported as unplaced, per V6.

**Unplaced by the V1 cap, 92 rows.** Every remaining row in section 3a is an additional word order of one of F1 to F9. They are **encouraged where they fall out naturally and required nowhere.** Placing them deliberately is a defect.

**C5.** Ledger for floor 7 must balance: **0 already-covered + 18 assigned-and-required + 8 deferred-with-reason + 92 unplaced-by-V1 = 118.** Any other total means the keyword set changed and the pack is stale.

### 7.2 Equity preservation, **0 queries**

**C6.** Not applicable and recorded as such. The page does not exist, Bing returns zero matching queries across 648 (section 2), and Google has no rows for a URL that has never been served. **There is no DO-NOT-LOSE query on this page and no equity-loss revert trigger.** A checker asserting otherwise has the wrong pack.

### 7.3 Protected elements

**C7 (HARD).** `slug` = `nhs-uniform-tax-relief-laundry-allowance`, `canonical` resolves to `/blog/nhs-uniform-tax-relief-laundry-allowance`. No redirect entry, no `DUPLICATE_REDIRECTS` entry, no collapse of any existing page (K4).
**C8 (HARD).** Frontmatter carries `slug`, `canonical`, `date`, `category`, `image`, `imageCredit`, `altText`, `schema`. **`imageCredit` appears exactly once.** Duplicate `imageCredit` keys were removed estate-wide in commit `7be12b11` and must not be reintroduced.
**C9 (HARD).** `git status` after the work shows **exactly one** new file under `Medical/web/`. Any modification to an existing file under `Medical/web/` is a FAIL, including the three FAQ answers on `nhs-pension-tax-charges-how-to-minimize` discussed in section 6.

### 7.4 Arithmetic that must recompute

The page has one calculation shape and it is simple: flat rate multiplied by marginal rate, multiplied by the number of open years.

| Statement | Source | Must equal |
|---|---|---|
| The number of open years for a claim | O8, TMA 1970 s.43 | **four**, plus the current year. A claim for 2022/23 expires **5 April 2027** |
| Basic rate applied to a flat-rate deduction | `house_positions.md` §5, 2026/27 | **20%** |
| Higher rate applied to a flat-rate deduction | `house_positions.md` §5, 2026/27 | **40%** |
| Personal allowance, if stated | `house_positions.md` §5 | **£12,570**, 2026/27, tapered above £100,000 |
| Mileage, if mentioned at all | `house_positions.md` §8, verified at gov.uk 2026-08-26 | **55p** first 10,000 business miles, **25p** thereafter, 2026/27. **Never 45p**, which all three competitor pages print |
| Any flat-rate expense amount | **NOT IN HOUSE POSITIONS.** See 7.5 | Unstateable until read at source |

**C10 (HARD).** Every worked figure recomputes from inputs stated inline. A checker with no external data must be able to reproduce the arithmetic.
**C11 (HARD).** Every rate, threshold or allowance carries its tax year or effective date in the same sentence or table caption. F1. Format `2026/27` for tax years, `from 6 April 2026` for tax-year events, `from 1 April 2026` for NHS scheme events. Never a bare figure.
**C12 (HARD).** If mileage appears at all, the rate is 55p / 25p tagged 2026/27, or no rate is given. A 45p on this page is a FAIL. F3 also applies: do not date a tax-year change to 1 April.
**C13.** Exactly **one** worked example, per G1. The topic involves a calculation, so one is required and a second is a FAIL. It sits immediately after the H2 stating the rule it demonstrates (G2), runs 80 to 200 words (G7), and contains all five G3 components: a one-line role-and-initial persona, the inputs, the arithmetic step by step, the result, and one sentence on what changes the answer.
**C14 (HARD).** The heading above the example is **not** the words "Worked example", and the example does not open with a `Worked example:` prefix. G6 and J4. String search, any hit is a FAIL.
**C15 (HARD).** The persona is a role plus an initial or first name only, explicitly illustrative. G4. No surnames, no trust names, no locations tied to a person.

### 7.5 Sources that must be read at primary source BEFORE the page is drafted

**This is the ground-truth gate, and it is a prerequisite on this page specifically.** `docs/medical/house_positions.md` was re-verified figure by figure on 2026-08-26 and **carries no position on uniform or laundry flat-rate expense amounts and no position on NMC or RCN subscription figures.** `BATCH2_INDEX.md` §5 records this as blocking item 1. Section 4.5 of this pack shows three peer pages giving three different answers, so there is nothing to triangulate from.

**The standing rule applies without exception: where a figure cannot be pinned at primary source, the page frames it as "confirm the current figure at source" and never asserts it.** That is exactly how the GMC retention fee is already handled.

| # | What must be read | Where | Why |
|---|---|---|---|
| S1 | **The HMRC flat-rate expenses table for uniforms and laundry**, and specifically the healthcare occupational rows | HMRC Employment Income Manual flat-rate expense tables, the **EIM32712 / EIM32485** family, plus the published gov.uk flat-rate expenses list for occupations | `house_positions.md` has **no position**. `BATCH2_INDEX.md` §5 row 1. Every amount on the page depends on it |
| S2 | **The NHS occupational-group rates** within S1: which NHS staff groups have a rate, and which do not | Same source as S1, the ambulance / nursing / healthcare rows | Section 4.5: lanop says £125 nurses and £185 ambulance, taxqube says £100 on one page and £125 on another. All three are secondary |
| S3 | **HMRC List 3, approved professional organisations and learned societies**: whether NMC, RCN, GMC, BMA and the Royal Colleges appear, and under what names | HMRC List 3 (approved professional organisations), current published version | `house_positions.md` §8 and §10 lock **deductibility** for GMC, BMA and Royal Colleges. It does **not** lock NMC or RCN. 4.4 notes the BMA's own caveat that "organisation names may not appear as expected" |
| S4 | **NMC published annual registration fee** | NMC published fees page | `BATCH2_INDEX.md` §5 row 2. No house position |
| S5 | **RCN published annual membership fee** | RCN published membership fees page | As S4 |
| S6 | **The shoes and tights flat rates**, if they are to be mentioned at all | Same HMRC flat-rate source as S1 | 4.5: two figures on two pages of one peer (£18 combined versus £6 plus £12) |
| S7 | **Form P87: the current form, the online route, and the self-assessment threshold** | gov.uk "Claim tax relief for your job expenses" and the P87 guidance | O8. The **£2,500** figure comes from 4.4 (bma.org.uk) and is not in house positions. It must be read at source or omitted |
| S8 | **The four-year time limit** | Taxes Management Act 1970 **s.43**, legislation.gov.uk | O8. Already cited in our corpus (section 6) but must be re-read, not inherited |
| S9 | **The repayment-agent regime**: HMRC agent registration, and the current status of deeds of assignment for income tax repayments | **The Income Tax (Repayment Agents) Regulations 2023**; HMRC guidance on using a tax agent to claim a repayment; the legislation that rendered assignments of income tax repayments ineffective | **Mandatory. Section 7.6 requires a warning and the warning must be accurate.** Do not state a commencement date, a regulation number or the legal effect of an assignment from memory |
| S10 | **Income tax rates and the personal allowance for 2026/27** | Already locked, `house_positions.md` §5, verified 2026-08-26 at gov.uk | No new read needed. Cited for completeness because the worked example uses 20% or 40% |
| S11 | **AMAP mileage 2026/27**, only if mileage is mentioned | Already locked, `house_positions.md` §8, verified 2026-08-26 | 55p / 25p. Do not re-derive, do not copy 45p from a competitor |

**C16 (HARD).** Every one of S1 to S9 is read at the named primary source on the day of drafting, and the read is recorded. A page drafted before S1, S2 and S9 are read does not ship.
**C17 (HARD).** **No flat-rate amount, no NMC fee and no RCN fee appears on the page unless it was read at primary source that day.** Where a figure could not be pinned, the containing sentence reads "confirm the current figure at source" and names the source, and the block is named for QA. Asserting an unverified figure is a FAIL.
**C18 (HARD).** **No figure for the GMC annual retention fee**, anywhere, in any surface, including frontmatter. O9, F5, `house_positions.md` §8 and §10, which record it as UNVERIFIED at 2026-08-26 with a removed prior figure. The page **may** say the fee is deductible. Checker: a `£` or numeric within 30 words of "GMC" plus "fee" is a FAIL.
**C19 (HARD).** **No Global Sum per weighted patient figure and no QOF point value**, anywhere. O10, F5. The topic requires neither, so the expected outcome is absence.
**C20 (HARD).** No fabricated statistic of any kind. No "most NHS staff", no "we find that around X%", no invented survey, no percentage without a named source, no client-outcome number. F6 and I6.

### 7.6 The regulatory fence: informational only. HARD FAIL

**`expansion_research/nichemap_2026-08-25/C1_REGULATORY.md`, standing constraint 2, applies estate-wide:** *"No contingent-fee or assignment-based tax-refund service, on any niche (HMRC repayment-agent registration + the deed-of-assignment ban). Cited per-row only where the audience is PAYE and the refund IS the commercial route."* Regime: **HMRC repayment-agent regime, the Income Tax (Repayment Agents) Regulations 2023, and the deed-of-assignment ban.**

Row 23 of the same table (nurses and healthcare professionals) is **CONDITIONAL** for exactly this reason: *"Audience is overwhelmingly PAYE, so the only natural monetisation is refund-shaped, which is the one route that is off. Safe form: informational content plus an accountancy lead restricted to self-employed/agency/bank nurses."* Row 67 (pilots) carries the identical fence in identical words.

**This cluster's entire vocabulary is refund-shaped.** Of the 118 keywords, the head terms are `uniform tax rebate`, `uniform tax refund`, `claim tax back on uniform`, `tax rebate washing uniform`. **The page is written into that vocabulary and must not be written into that business.**

**C21 (HARD).** The page is **informational only**. It explains the relief and how the reader claims it **themselves**. It never offers to make a claim on the reader's behalf.
**C22 (HARD).** **Zero occurrences** of any offer-to-claim construction. String search, any hit is a FAIL: `we can claim`, `we'll claim`, `we will claim`, `claim on your behalf`, `let us claim`, `we handle your claim`, `we handle your rebate`, `claim it for you`, `we'll get you`, `we get you back`, `start your claim`, `your rebate is waiting`, `how much am I owed`, `check what you're owed`.
**C23 (HARD).** **Zero occurrences** of any contingent-fee construction. String search: `no win no fee`, `no rebate no fee`, `no refund no fee`, `% of your refund`, `percent of your refund`, `we only get paid if`, `success fee`, `commission on your refund`.
**C24 (HARD).** **Zero occurrences** of any assignment construction offering or facilitating an assignment. String search for `assign your`, `assignment of your`, `sign over your refund`, `deed of assignment` **used as an offer**. Note the asymmetry: `deed of assignment` **must** appear in the warning required by C25 and is a FAIL only when it appears as something the page offers or arranges.
**C25 (HARD).** The page carries a **repayment-agent warning of at least 60 words** in its own H2 or H3 section, containing all four of:
 (a) that companies advertise to make these claims for a share of the repayment;
 (b) what a **deed of assignment** does, verified at source per S9, in plain English;
 (c) that a reader can make the claim **directly to HMRC for nothing**;
 (d) the current position on repayment-agent registration and on assignments, per S9, stated only as far as it was verified.
 A page without this block FAILS. This is the O8 obligation and it is the whole reason O8 sits on this page rather than on the frozen deductions pages.
**C26 (HARD).** **Exactly one CTA on the page, at the end, using the site's existing component**, and it is an **accountancy enquiry** and nothing else. D3 and I7. No inline CTA, no "get in touch today" in body copy, no CTA in any heading, no second form, no popup, modal, toast, banner, sticky bar, exit-intent or newsletter interstitial. The CTA must not describe a rebate, refund or claim service.
**C27 (HARD).** No regulated-activity claim. I3. No investment, pension-transfer or insurance advice, no "we advise you to". The page explains rules and options.
**C28 (HARD).** No pricing of our own services anywhere. I5. Note the batch-1 coordinator ruling: third-party amounts that are facts about the reader's position (a statutory limit, an HMRC rate, a flat-rate expense) are publishable and are often the most useful thing on the page. A pricing finding must name the service **we** would be charging for.

### 7.7 The scope fence. HARD FAIL

**`/blog/medical-professional-expenses-what-is-claimable` and `/blog/gp-tax-deductions-complete-list-2026` are FROZEN to 2026-09-10** and are the long-run owners of the **general deduction list** (O7, `BATCH2_INDEX.md` §4). Verified live today: `select slug,status,monitor_until from monitored_pages where site_key='medical' and monitor_until > now()` returns 19 rows on 2026-08-26, both of those slugs among them at `monitor_until = 2026-09-10`.

**This page is scoped to uniform, laundry and professional subscriptions ONLY. It must not become a second deductions list.**

**C29 (HARD).** Neither frozen file is edited. Enforced by C9.
**C30 (HARD).** The page contains **no enumerated list of general allowable expenses.** Checker: any list or table with **four or more** deduction categories outside uniform, laundry and professional subscriptions is a FAIL. Equipment, CPD, home office, mileage, indemnity, accountancy fees, phone and internet may each be mentioned in **at most one sentence with a link**, and may not appear together as a set.
**C31 (HARD).** **No other profession's uniform** gets a section, a heading, a table row or a worked example. Police, prison officers, mechanics, chefs, retail, hospitality: off-niche on this domain (teardown theme 15). A passing mention that the rates are set by occupation is fine; a rates table covering non-healthcare occupations is a FAIL.
**C32.** Employer-side PAYE and payroll treatment of uniform allowances: **one sentence maximum**, no section. It belongs to `/blog/gp-payroll-services`, FROZEN (teardown theme 18).

### 7.8 The ownership map. Binding, repeated here in full per `BATCH2_INDEX.md` §4

| # | Shared fact | Owner | This page's obligation |
|---|---|---|---|
| **O7** | Flat-rate expense for uniform and laundry, and professional-subscription relief under **ITEPA 2003 s.343 / List 3** | **THIS PAGE** | **We own it.** Full treatment. Item 7 (nurses) gets one sentence and a link |
| **O8** | How to claim employment expenses: **form P87, the self-assessment route, the four-year time limit, and the repayment-agent warning** | **THIS PAGE** | **We own it.** Full treatment. Items 4 and 7 get one sentence and a link |
| **O3** | Adjusted net income as a general concept: £100,000 to £125,140 personal-allowance withdrawal, the 60% band, free childcare, HICBC | Batch 2 item 5, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **One sentence, then link. Nothing more** |
| **O9** | GMC annual retention fee: **deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | May say the fee is deductible. **No figure, ever.** Enforced by C18 |
| **O10** | Global Sum per weighted patient (£130.07 verified) and the **QOF point value (UNVERIFIED)** | `house_positions.md` §3.A | **No QOF point value on any page in this batch.** Enforced by C19. Neither figure is on-topic here |
| **O2** | Annual allowance mechanics: taper, threshold income, adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` (batch 1) | **One sentence, then link.** Do not restate the pension taper. Relevant only because a higher-rate reader's marginal rate is what makes the relief worth more |

**C33 (HARD).** For each of **O3, O2, O9 and O10**: the page contains **at most one sentence** on the fact, followed by a link to the owning page or, for O9 and O10, no figure at all. **Two or more explanatory sentences on someone else's fact is a V3 defect and a FAIL.** This is the exact rule batch 1 broke on seven of twelve pages.
**C34.** Every one-sentence handoff carries a working internal link to the owning page. Zero broken internal links repo-wide.
**C35.** The page routes to `/blog/nurse-tax-relief-professional-subscriptions` (batch 2 item 7) in at most **two sentences**, and does not deliver the nurse case itself. V4 in reverse: item 7 must be left something to rank for.

### 7.9 The language spec, V1 to V6, made countable

**C36 (HARD, V1).** Two word orders per idea per page. Enforced by **C2** above, which is the operative test.
**C37 (HARD, V2).** **Never narrate the keyword research.** Zero occurrences of: `also searched as`, `also known as`, `also written as`, `people also search`, `whether you call it`, `sometimes called`, `or as it is often searched`, `both terms mean`, `these all mean the same`. **No table column listing search variants. No sentence telling the reader that two searches mean the same thing.** This was shipped live in batch 1 and blocked. Any hit is a FAIL.
**C38 (HARD, V3).** Enforced by **C33**. Additionally: **no sentence on this page may be a near-duplicate of any of the three FAQ answers on `blog/nhs-pension-tax-charges-how-to-minimize.md`** identified in section 6. Checker: word overlap above 60% between any drafted sentence and any sentence in those three answers is a FAIL. The facts are ours to state; the wording is not ours to reuse.
**C39 (V4).** Enforced by **C35**.
**C40 (HARD, V5).** **Any one rhetorical construction: maximum twice per page.** The construction `it is not X, it is Y` and its variants (`not X. It is Y`, `this is not X, it is Y`): **maximum once per page across the whole batch.** Every batch-1 page ran it three to seven times. Checker counts constructions. J6 is the same rule and its cap is 2.
**C41 (V6).** Vocabulary never overrides the page's own topic. Any phrasing that will not sit as natural English **goes unplaced and is reported**, and the report is part of the deliverable. The 8 deferred rows and the 92 V1-capped rows in 7.1 are the pre-declared unplaced set; anything the writer adds to it must be named.

### 7.10 Structure, register and the estate hard fails

**C42 (HARD, I1).** **No em-dash anywhere in user-facing copy**, including frontmatter, `metaTitle`, `metaDescription`, `altText`, headings, tables and FAQ answers. En-dashes permitted only in numeric ranges such as 2026–27. Any hit is a FAIL.
**C43 (HARD, I2).** No named author, no byline, no credentials, no "reviewed by", no post-nominals (ACA, ACCA, FCA, CTA, ATT), no photo presented as our team. **Both peer pages in this teardown carry named authors with credentials. We do not.**
**C44 (HARD, I4).** Anonymised social proof only. No named clients, no named trusts or practices, no logos, no testimonial with an identifiable person.
**C45 (HARD, J2).** No pipeline-artefact leakage: no `verify at build`, no inline house-position codes such as `(HP12)`, no `TODO`, no `[source]`, no bracketed instructions to the writer, no `£X` placeholder.
**C46.** Counted structural bands, reported with the number:

| Rule | Band | Note |
|---|---|---|
| A1 | The direct answer to `uniform tax rebate` within the **first 60 words** of body copy, before the first H2 | Both peers fail this. lanop spends 60 words on framing |
| A4 | The answer here is genuinely conditional, so the first sentence states it as "X if Y, Z if not" | The condition is whether the employer launders or pays for laundering |
| A5 | Opening block **40 to 90 words**, never over 120 | |
| B4 | **50% to 75%** of H2s are question-form | 4.3 is the model: five consecutive reader-voice questions |
| B6 | **6 to 14** H2s | lanop has 19 and 27 H3s. That is a general-population reference document, not our page |
| C1 | Mean sentence length **15 to 22 words**, none over 40 | |
| C2 | Paragraphs **1 to 4 sentences**, max 75 words | |
| C3 | **12 to 25** instances of "you" or "your" per 1,000 words | |
| C4 | **Maximum 3** instances of "we", "our" or "us" per 1,000 words, **none** in the opening block or any H2 | Both peers put the firm in a heading. Enforced also by C26 |
| C5 | **Maximum 3** bulleted lists, **maximum 8 items** each | |
| D1 | No paragraph of 40+ words with no number, date, proper noun or form name | |
| D2 | No exclamation marks. taxqube's second sentence is "There's good news!" | |
| H1 | **4 to 8** FAQ questions | lanop has 12 |
| H3 | Each FAQ answer **40 to 110 words**, direct answer in the first clause, at least one figure, date, form name or named rule | |
| H6 | No FAQ answer overlaps a body paragraph above 60% | |
| J7 | Coefficient of variation across section word counts **above 0.2** | |
| L1 | **900 to 1,600 words.** L3 stands: length is not a lever. Do not pad toward lanop's 4,000 | The extra 2,400 words on lanop are police, prison officers, mechanics, chefs and employers, all of which C31 forbids |
| L4 | **At least one table**, with a caption stating the effective date, per F1 | Gated on S1 and S2. If no rate can be verified, the table is a route or eligibility table, not a rates table |
| E-glosses | Any NHS or tax term of art gets a **6 to 15 word plain gloss on first use**. On this page that is at minimum: flat-rate expense, List 3, P87, tax code, marginal rate | D4 |

### 7.11 The floors

| Floor | Requirement on this page |
|---|---|
| 1. Arithmetic | C10 to C15. Every figure recomputes or is a locked date |
| 2. Statute | C16 and C17. S1 to S9 read at primary source on the day of drafting |
| 3. Links | C34. Zero broken internal links repo-wide |
| 4. Coverage | C1. The 18 phrases placed; the checker names any that are not |
| 5. Equity preservation | C6. Not applicable, and stated |
| 6. Cluster coverage | Same matcher, the 7.1 input. 18 placed, 0 unplaced from the required set |
| 7. Reconciliation balance | C5. 0 + 18 + 8 + 92 = 118. Must balance |
| 8. Competitor re-read | All **31** heading themes in 4.7 marked covered, declined-with-reason, or belongs-to-another-page. Undecided count **0**. **No fetch failures in this teardown**, so there is no themes-unknown category |

---

## 8. Stated expectation

Written before the work, so the later read has something to fail.

**The measurement reality this page is written into, with the commands.** Google indexes roughly **21 of 130 URLs** on this site. That is low domain authority, not a technical defect: `competitor_universe_2026-08-26.md` §7 shows two of our URLs holding live Google top-10 organic positions today, and GSC corroborates with `gp partnership goodwill valuation` averaging position 10.3 over 90 days. **Bing indexes the site fully and sends 3.4x the Google clicks.** New pages on this domain earn on Bing first, and any expectation written the other way round would be untestable.

**Baseline, re-derived today.** `BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')`, pulled 2026-08-26: **648 site-level queries, of which 0 match `uniform|laundr` and 0 match the wider `uniform|laundr|rebate|refund`.** Google: no URL, therefore no rows. **The baseline on both engines is zero.**

**Primary test, Bing, 14 days after deploy.**
> The URL registers **at least one Bing impression on at least one phrase named in section 7.1.** Named phrases to watch first, because they are the ones a peer already holds inside the Google top 10 and are therefore the ones with demonstrable demand: `uniform tax rebate`, `uniform tax refund`, `tax rebate washing uniform`, `tax code uniform`, `uniform tax rebate uk`, `uniform tax refund uk`.
> **PASS = one impression on one of those six, or on any of the other twelve required phrases.** Not a click. Not a position. One impression on a named phrase.

**Primary test, Bing, 28 days after deploy.**
> **At least 5 distinct named queries** on this URL in `GetPageQueryStats`, of which **at least 2** contain the token `uniform`, and **total impressions at least 15.**
> A **first Bing click** is the stretch outcome and is not the target. The batch-level target is 3 of 7 pages clicking at 28 days (`BATCH2_INDEX.md` §8); this page is one of the likelier three because its head vocabulary is high-volume and consumer-shaped, but a zero-click 28-day read on a brand-new URL is not a defect.
> **Phrase coverage is the verdict, not total traffic.** Impressions rising while every one of the 18 named phrases stays absent from the query set is recorded as **drift and a FAIL**, per §9.6 point 2.

**Google, 28 to 90 days: an observation, not a target, and the distinction is deliberate.**
> **Google may not index this page at all inside the measurement window, and that carries no information about the page.** On a corpus where Google indexes roughly 16% of URLs, non-indexation at 28 days is the base rate.
> That said, **this is the one cluster in batch 2 where a Google observation is worth recording deliberately.** It carries the batch's largest peer-winnable number by a factor of six (27,550 against a next-best 4,240), **both** holding domains are §2a peers, and there is **no institutional layer in the harvest at all**, which is the condition that closes every other cluster on this site. If a page on this domain is going to be indexed and ranked by Google on a competitive term, the structural case for it is strongest here.
> **Recorded as an observation at 90 days: is the URL in the Google index, and does it hold any query-level GSC row on any of the 18 named phrases?** Either answer is recorded. A miss is not a failure and does not trigger anything. Note that `BATCH2_INDEX.md` §8 names item 5 as the batch's Google-observation candidate on the grounds that peers rather than institutions hold its Google slots. That test is satisfied here too, and on ten times the peer-winnable volume, so **both** are worth observing and this pack recommends recording both rather than substituting one for the other.

**Leads, 90 days: no target, and the reason is stated.**
> This page is **not** a page a reader converts on, and the batch index already says so: item 2 is "the only page in the batch that a reader can convert on". The audience for a £12-a-year deduction is overwhelmingly PAYE, which is precisely the audience `C1_REGULATORY.md` row 23 fences off from refund-shaped monetisation. **This page exists for coverage, vocabulary and the internal route to item 2 and item 7. Any attributed lead is a bonus and no lead is a failure.** Setting a lead target here would create pressure toward exactly the commercial shape section 7.6 forbids.

**Failure trigger, written as a number, before the work.**
> If Bing impressions on `/blog/nhs-uniform-tax-relief-laundry-allowance` are **0** across a full 28-day window after deploy, **and** the Bing named-query count for the URL is **0** at 28 days, the page has not entered the index on any phrase and the finding is recorded against the pack, not against the writer. **The revert path is deletion of one file** (section 1). No revert is triggered by a low number, only by a zero on both measures, because there is no equity to protect and a live page costing nothing is not a reason to delete anything.
> **The quality failure trigger is the one that actually binds.** Per `BATCH2_INDEX.md` §8: if batch-level editorial QA raises a **V1, V3 or V5 finding** on this page, it is **held rather than deployed** until fixed. On this page specifically, V1 is the live risk: the cluster contains fifteen word orders of one idea and the temptation to place them is the exact defect C2 exists to catch.

**Tracker fields to populate at rewrite time** (reuse, do not build): one `monitored_pages` row with both baselines above stated as zero; `blog_optimizations.target_keywords` set to the **18 phrases in 7.1**, not to the full 118. **No row is written by this pack. Registration is a separate owner-triggered step and has not been done. No monitor, alert, cron or scheduled job was created by this document.**

---

## Corrections to the dossier and to the batch index

Five. All re-derived today, each with the query or command that produced it.

1. **The dossier understates this cluster's peer-winnable figure by roughly 19x, and the batch index's correction is confirmed.** Dossier §4 row 4 gives the uniform topic as **4 domains, 26,880 volume, 1,420 peer-winnable, 108 keywords**. Re-derived against the §2a peer set with the regex printed in section 3, the figures are **2 domains, 118 keywords, 55,860 volume, 27,550 peer-winnable, 18 keywords held by a peer inside the Google top 10**. `BATCH2_INDEX.md` §6 correction 1 states exactly these numbers and this pack reproduces all four independently. The cause is domain classification, not arithmetic: both `lanop.co.uk` (§2a row 12) and `taxqube.co.uk` (§2a row 18) are peer-winnable, and lanop holds the head terms at positions 3 to 17, not the positions 59 to 87 the dossier's §5 table implies. **Dossier §4 row 4 and dossier §5's uniform rows should be treated as superseded.**

2. **A live page already answers O7 and O8 in its FAQ, and neither the dossier nor the batch index records it.** `Medical/web/content/blog/nhs-pension-tax-charges-how-to-minimize.md` carries three frontmatter FAQ answers covering uniform and laundry flat-rate relief, the four-year limit with TMA 1970 s.43, and the receipts and flat-rate exception. It is the source of all three of this cluster's verbatim corpus matches and it is the only file in the corpus containing the phrase "flat-rate expense". It is **not** on the frozen list (19 rows returned by `select slug,status,monitor_until from monitored_pages where site_key='medical' and monitor_until > now()` on 2026-08-26; it is not among them). **Recorded as a known duplication, not fixed here.** Section 6 rules that this batch does not touch it and section 7.9 C38 stops the new page reusing its wording. **Recommended for a later pass, not authorised by this task:** trim those three FAQ answers to one sentence and a link once the new page is live, which is the O7 and O8 handoff the ownership map already prescribes.

3. **O7's professional-subscription half has almost no demand inside this cluster's regex, and what demand exists is BMA-held.** Not one of the 118 keywords mentions a subscription, a professional fee, NMC, RCN or List 3. Re-run with a subscription regex:

   ```sql
   -- run 2026-08-26 via `python scripts/_q.py <file.sql>`
   ranked_keyword ~ '(professional (subscription|fee)|union fee|\mnmc\M|\mrcn\M|list 3)'
     and ranked_keyword ~ '(tax|rebate|refund|relief|claim|allowance|hmrc)'
   -- {"kws": 35, "vol": 7650, "peer_winnable": 280, "ptop10": 0}
   ```
   **35 keywords, 7,650 volume, only 280 peer-winnable, zero peer top-10 rows.** bma.org.uk holds nearly all of it, at positions 3 to 10 on `tax rebate professional fees`, `professional fees tax relief`, `tax rebate on professional fees` and a dozen siblings. The two peer-reachable rows are `nmc tax relief` (170, taxqube at 22) and `rcn tax relief` / `tax relief rcn` (140 each, medicsmoney at 21). **Consequence for the writer:** subscriptions stay in scope because O7 assigns them here and because whitespace item 5 says joining them to uniform is the differentiator, but **no subscription phrasing is a required phrase in 7.1 and none should be forced.** The realistic ceiling on that half is a Bing read, not a Google one. **Recorded as a delta for the next harvest**, not folded into the cluster count.

4. **The dossier's §5 positions for taxqube on the uniform head terms do not match the harvest.** Dossier §5 lists `work uniform tax refund` at position 59, `uniform tax rebate` at 81, `uniform tax relief` at 76, `tax relief on work uniform` at 83 and `uniform tax allowance` at 87, all attributed to taxqube.co.uk. In the persisted harvest, `uniform tax rebate` is held by **lanop at 9**, `tax relief on work uniform` by **lanop at 24**, `uniform tax allowance` by **lanop at 30**, and only `uniform tax relief` (76, taxqube) reconciles. The dossier appears to have taken the best **taxqube** position rather than the best position overall on those rows. The effect is the same misreading as correction 1: it makes the cluster look unreachable when it is the most reachable in the batch. **Flagged, not harmonised.**

5. **Three competitor pages publish three different NHS uniform flat-rate figures, and all three publish a stale mileage rate.** £125 (lanop), £100 (taxqube NHS page), £125 with different shoes and tights amounts (taxqube healthcare page), and 45p per mile on all three when the 2026/27 rate has been **55p** since 6 April 2026 (`house_positions.md` §8, verified at gov.uk 2026-08-26). This is not a correction to our documents; it is the **evidence for section 7.5** and it is recorded here so the ground-truth pass understands that the secondary layer on this topic is unreliable in a way the NHS pension topics are not. **`house_positions.md` should gain a flat-rate expense position once S1 and S2 are read**, in the same shape as the Global Sum entry: the figure, the paragraph it came from, the fetch method and the date.
