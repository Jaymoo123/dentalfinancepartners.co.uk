# §9.5 RESEARCH PACK: /blog/healthcare-accountants-uk

**Built** 2026-08-26. **Site** medicalaccounts.co.uk (`medical`). **Batch** 2, item 2 of 7.
**Spec** `docs/_engines/REWRITE_PROGRAM.md` §9.5 (eight sections, fixed order). **Batch contract** `docs/medical/packs/BATCH2_INDEX.md`.
**Frozen inputs** `docs/medical/cluster_dossier_2026-08-26.md`, `docs/medical/competitor_universe_2026-08-26.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`.

This is preparation, not page content. Nothing under `Medical/web/` was read for anything other than inventory, and nothing there was edited. No commit, no deploy, no `monitored_pages` write, no monitor, alert, cron or notification created. **No new DataForSEO or paid API calls: $0.00 spend on this task.**

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `/blog/healthcare-accountants-uk` |
| Status | **NET-NEW.** The URL does not exist. There is no markdown file, no route, no redirect, no equity |
| Cluster / topic | `healthcare accountants near me` (dossier §4 NO-PAGE row 1) |
| Lane | `medical_accountancy_services` (lane 15 of 15, `sites/medical.discovery.json`), the adjacency catch-all that absorbs the head commercial terms |
| Grade | **NEW.** No EXTEND constraint, no frozen structure, no K1 depth floor to preserve |
| Confidence | **The highest on the entire consensus map: 24 of 27 harvested domains give this topic its own page** (dossier §1c and §4 row 1) |
| Commercial standing | **The only page in batch 2 a reader can convert on.** The site converts at roughly one lead per 46 sessions, the best rate in the estate |
| File to create | `Medical/web/content/blog/healthcare-accountants-uk.md` |
| Rendering | Markdown with **raw HTML in the `body` frontmatter field**, per the estate convention (memory `blog_rendering_html_in_frontmatter`). Medical uses **FLAT** `/blog/<slug>` routing; `slug_resolver.py` hard-refuses flat sites, so link auditing uses `scripts/medical_flat_link_audit.py` |
| Revert path | **Delete one new file**, `Medical/web/content/blog/healthcare-accountants-uk.md`. There is nothing else to revert |

### 1a. Permission, stated as constraint first

Everything about this page is open except the four things below, and all four are hard.

1. **It owns the NATIONAL term and must never add city vocabulary.** Ownership-map row **O14**. Criterion E1.
2. **It is a hub, and a hub routes rather than answers.** Binding rule **V4**, ownership-map row **O15**. Two to four sentences per sub-audience, then hand off. Criterion C.
3. **It is faceless.** No named expert, no credential, no photo of a person presented as our team, no named client. Rules I2 and I4. This is the single largest behavioural difference between this page and every competitor page torn down in section 4, and it is not negotiable.
4. **No pricing for our services.** Rule I5, narrowed by coordinator ruling 4: the ban covers **our** fees only. Third-party statutory amounts are publishable and are the most useful thing available to this page.

### 1b. Frozen-list position

The true frozen set is **18 pages with `monitor_until = 2026-09-10`**, plus `__home` to 2026-10-06 (BATCH2_INDEX §3 and §6 correction 3, correct test `monitor_until > now()` with no status predicate). **This page is not on that list, because it does not exist.**

**But one frozen page is a direct neighbour and constrains this build:** `/blog/gp-accounting-guide` is **FROZEN to 2026-09-10** and holds a live Google top-10 position (`gp partnership accounts specialist`, DataForSEO organic rank 6, `competitor_universe_2026-08-26.md` §7 point 1). It is not touched, not linked around, and nothing on this page may be written to compete with it. Section 6 sets the partition.

---

## 2. Equity register

### 2a. The page has no equity, because the page does not exist

**Stated explicitly rather than omitted, per BATCH2_INDEX §1.** There is no URL, therefore no GSC page row, no Bing page row, no impressions, no clicks, no ranking history and no DO-NOT-LOSE query set. §9.9 floor 5 (equity preservation) **passes vacuously: 0 of 0**. There is no revert trigger of the "we lost what we had" kind anywhere in this pack, and section 8's failure triggers are written accordingly.

### 2b. The one fresh Bing observation in this family

```
BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')
# pulled 2026-08-26; 648 site-level queries returned
```

Of those **648 site-level queries, exactly ONE matches this family**:

| Query | Clicks | Impressions | Avg position |
|---|---|---|---|
| `nhs tax accountant near me` | 0 | 1 | 2 |

One impression. Zero clicks. A position-2 average on a single impression is a sample of one and carries no information about ranking strength. **The honest reading is that on Bing this site is at approximately zero on the commercial acquisition vocabulary**, which is exactly the baseline BATCH2_INDEX §8 records for the batch as a whole. It is what makes the 14-day and 28-day reads in section 8 interpretable at all.

### 2c. The Google impressions that already exist, and which page must keep them

`competitor_universe_2026-08-26.md` §1 records the GSC 90-day head-term query set, data-through 2026-08-23, 217 query rows. Six rows are in this family and **every one of them belongs to a page that already exists**. This page must not take them.

| GSC query | Impressions | Avg pos | Which of our pages earns it | Confidence |
|---|---|---|---|---|
| `gp accountants` | 1,309 | 51.7 | `/blog/gp-accountant` and the 11 city pages, plus `/for-gps` (H1 "GP Practice Accountants") and `/locations` (H1 "GP accountants across the UK") | **Multiple candidates. NOT established** |
| `medical accountants` | 377 | not stated | `/services` (title "Medical Accounting Services \| Accounting for Doctors") and the site-wide brand string | **Not established** |
| `specialist medical accountants` | 284 | not stated | The 10 blog files carrying the phrase verbatim, plus `/blog/gp-accountant` (metaTitle "GP Accountant \| What a Specialist Medical Accountant Does") | **Not established** |
| `gp practice accountants` | 278 | not stated | `/for-gps` (H1 "GP Practice Accountants \| Accountants for GP Practices & Partners") | Strong, single obvious holder |
| `medical accountants uk` | 225 | not stated | Brand-string artefact. "Medical Accountants UK" is the trading name and appears in the disclaimer boilerplate of **79 of 79** blog files | **Brand, not topical** |
| `accountants for doctors` | 100 | not stated | **No page holds it verbatim.** 0 files in the corpus contain the string | Established: nobody holds it |

**This is a gap in the evidence and it is named rather than smoothed.** The §1 figures are **query-level, not page-level**. Which URL earns the 1,309 `gp accountants` impressions is an inference in five of the six rows above, not a measurement.

**Criterion A makes closing it a precondition of deploy**, not of writing: a GSC `searchanalytics.query` pull with dimensions `['page','query']` over the same window, so that the holder of each row is a fact before a new page is introduced into the same vocabulary. Per §5 of the working agreement, never conclude traffic from a stored snapshot; pull it fresh.

**What is already certain and is enough to build on:** `accountants for doctors` earns 100 impressions and **no page of ours contains the phrase**. That row is unowned, and it is the clearest single justification for this page existing.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 persisted rows, 27 domains, no volume floor. **Already paid for in the dossier task ($4.92048). This task spent $0.00.**

BATCH2_INDEX §6 correction 4 records this cluster as **a range, not a number**. Both ends are re-derived below and both regexes are named, because the wide set is the right measure of the SERP and the tight set is the right measure of what this page can honestly target.

### 3a. TIGHT: what this page can honestly target

**Regex (this is the binding selection for section 7's phrase list):**

```
(healthcare account|medical account|medic account|accountants? for (doctors|gps|medical|healthcare|nhs|consultants|surgeons)|(doctor|gp|medical|healthcare|nhs) account|specialist medical account)
```

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~ '(healthcare account|medical account|medic account|accountants? for (doctors|gps|medical|healthcare|nhs|consultants|surgeons)|(doctor|gp|medical|healthcare|nhs) account|specialist medical account)'),
k as (select ranked_keyword, max(search_volume) v,
   min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos,
   min(position) best_any_pos
 from c group by 1)
select count(*) uniq_kws, sum(v) uniq_vol,
 sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
 count(*) filter (where best_peer_pos<=10) peer_top10_kws
from k;
-- 27 | 4310 | 4240 | 24
```

**Result: 27 deduplicated keywords, 4,310 volume, 4,240 peer-winnable, 24 keywords a peer already holds in the Google top 10.** Reproduces the BATCH2_INDEX §6 correction-4 figures exactly.

**24 of 27 keywords sit in a peer's Google top 10.** That is the highest peer-held density in batch 2 and it is the whole commercial argument: this vocabulary is not held by an institution we cannot outrank, it is held by small specialist firms with thin pages.

### 3b. WIDE: the dossier's measure

**Regex:** the tight regex, **OR** a generic accountant-near-me row that carries no other vertical, **OR** the small-business-accountant family. Reproduced here as the near-me arm only, because that arm alone reconciles to the dossier:

```sql
-- same peers CTE as above
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and (ranked_keyword ~ '(healthcare account|medical account|medic account|accountants? for (doctors|gps|medical|healthcare|nhs|consultants|surgeons)|(doctor|gp|medical|healthcare|nhs) account|specialist medical account)'
    or (ranked_keyword ~ '(accountant|accountants|accounting|accountancy)s? near me'
        and ranked_keyword !~ '(property|landlord|charity|construction|agricultur|crypto|ecommerce|forensic|trust|dental|dentist|pharmac|farm)')))
-- 49 | 10080 | 4940 | 28
```

| Measure | Uniq kws | Volume | Peer-winnable | Peer top-10 kws |
|---|---|---|---|---|
| **TIGHT** (this page's honest target) | **27** | **4,310** | **4,240** | **24** |
| **WIDE**, re-derived | 49 | 10,080 | 4,940 | 28 |
| WIDE, as the dossier states it (§4 row 1) | 67 | 10,110 | 5,110 | not stated |

**Volume reconciles to within 30 (0.3%) and peer-winnable to within 170 (3.3%). The keyword COUNT does not (49 against 67).** The dossier's cluster was built by seed-node clustering, which is not in the repo (BATCH2_INDEX §9 limitation 1), so a regex cannot reproduce its row count. **The difference between the two ends of the range is genuine junk for this page:** `tax accountant near me` (1,600), `chartered professional accountant near me` (390), `cheap accountants near me` (90), `xero accountants near me` (50). None of it is medical, and a page that chases it drifts into the generalist SERP.

**The ruling: this page targets the TIGHT set. The WIDE set is recorded because it describes the SERP the page will land in, and section 8's expectations are set against the tight set only.**

### 3c. The 27 keywords, with our corpus check

`Verbatim in our copy?` was checked by case-insensitive grep across `Medical/web/content/blog/*.md` (79 files, read only, nothing edited), and separately across `Medical/web/src` for the TSX pillars and persona hubs.

| Vol | Best peer pos | Best any pos | Best-positioned domain | Keyword | Verbatim in our copy? |
|---|---|---|---|---|---|
| 720 | 4 | 4 | medicsmoney.co.uk | `healthcare accountants near me` | **no, 0 files** |
| 720 | 3 | 3 | medicsmoney.co.uk | `medic accountants` | **no, 0 files** |
| 390 | 5 | 5 | medicsmoney.co.uk | `accountants for doctors` | **no, 0 files** |
| 390 | 3 | 3 | medicsmoney.co.uk | `doctor accountants` | **no, 0 files** |
| 390 | 11 | 10 | johnstoncarmichael.com | `healthcare accountants` | **no, 0 files** |
| 170 | 4 | 4 | r-m-t.co.uk | `gp accountants` | yes, 1 file |
| 110 | 2 | 2 | medicsmoney.co.uk | `accountant for medical professionals` | **no, 0 files** |
| 110 | 2 | 2 | medicsmoney.co.uk | `accountants for medical professionals` | **no, 0 files** |
| 110 | 1 | 1 | bw-medical.co.uk | `b w medical accountants` | no (competitor brand) |
| 110 | 1 | 1 | bw-medical.co.uk | `bw medical accountants` | no (competitor brand) |
| 90 | 1 | 1 | bw-medical.co.uk | `bw medical accountants ltd` | no (competitor brand) |
| 90 | 2 | 2 | medicsmoney.co.uk | `medical accountants near me` | **no, 0 files** |
| 90 | 10 | 10 | taxqube.co.uk | `nhs accountants` | **no, 0 files** |
| 70 | 2 | 2 | medicsmoney.co.uk | `medic accountants london` | **no, 0 files** (city, declined) |
| 70 | 2 | 2 | sandisoneasson.co.uk | `medical accountant london` | **no, 0 files** (city, declined) |
| 70 | 5 | 5 | nicholsmedical.co.uk | `medical accountants london` | **no, 0 files** (city, declined) |
| 70 | 27 | 18 | forvismazars.com | `sharpe medical accounting ltd` | no (competitor brand) |
| 70 | 2 | 2 | sandisoneasson.co.uk | `specialist medical accountants` | **yes, 10 blog files (18 across `src` + `content`)** |
| 70 | 2 | **1 (bma.org.uk)** | bma.org.uk | `tax accountant for doctors` | **no, 0 files** |
| 70 | 2 | **1 (bma.org.uk)** | bma.org.uk | `tax accountants for doctors` | **no, 0 files** |
| 50 | 1 | 1 | medicsmoney.co.uk | `locum doctor accountant` | **no, 0 files** |
| 50 | 5 | 5 | medicsmoney.co.uk | `medical accountant near me` | **no, 0 files** |
| 50 | 2 | 2 | medicsmoney.co.uk | `medical accountant uk` | **no, 0 files** |
| 50 | 2 | 2 | medicsmoney.co.uk | `medical accountants uk` | **yes, 79 of 79 files, but see below** |
| 50 | 4 | 4 | medicsmoney.co.uk | `medical accounting near me` | **no, 0 files** |
| 40 | 2 | 2 | medicsmoney.co.uk | `medical accounts` | **no, 0 files** |
| 40 | 15 | 15 | medicsmoney.co.uk | `yorkshire medical accountants` | **no, 0 files** (city, declined) |

**The 79-of-79 hit on `medical accountants uk` is a false positive and must not be read as coverage.** "Medical Accountants UK" is the site's trading name, and the string appears in the standing disclaimer boilerplate at the foot of every blog file ("...Medical Accountants UK specialises in..."). It is a brand mention, not topical coverage of the search phrase. **Of the 27 keywords, exactly two are genuinely present as topical copy: `gp accountants` (1 file) and `specialist medical accountants` (10 files). Twenty-five are absent.**

**medicsmoney.co.uk is the best-positioned domain on 17 of the 27 keywords.** One competitor page, `medicsmoney.co.uk/medical-accountant/`, is effectively the incumbent for this whole cluster, and it is a directory rather than a service page. Section 4.1 and section 5 W1 turn on that.

---

## 4. Competitor teardown

**The largest teardown in batch 2.** The brief supplied a list of 30 URLs. It was re-derived independently against the harvest and **four URLs were missing from it**; all four are added and torn down. The two 2-keyword URLs in the brief's list are retained even though they sit below the 3-keyword threshold, so nothing is dropped.

```sql
-- URL-level derivation, run 2026-08-26
with c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
  and ranked_keyword ~ '(healthcare account|medical account|medic account|accountants? for (doctors|gps|medical|healthcare|nhs|consultants|surgeons)|(doctor|gp|medical|healthcare|nhs) account|specialist medical account)')
select url, count(distinct ranked_keyword) kws, sum(distinct search_volume) vol, min(position) best_pos
from c group by 1 having count(distinct ranked_keyword)>=3 order by kws desc, vol desc;
-- 32 rows
```

**Added, missing from the brief's list:**

| URL | In-cluster kws | Best pos | Why it matters |
|---|---|---|---|
| `johnstoncarmichael.com/industry-experience/healthcare` (no trailing slash) | 8 | 6 | A **second live URL for the same page**, ranking better than the trailing-slash version at position 6 against 10. A competitor self-cannibalisation artefact worth recording |
| `aisma.org.uk/accountants/mha-nottingham/` | 4 | 9 | A second AISMA member listing in the top set. Confirms directory listings, not service pages, are what rank here |
| `practiceindex.co.uk/gp/bw-medical-accountants-ltd` | 3 | 5 | A **third-party directory profile of a competitor** outranking most firms' own pages |
| `medicsmoney.co.uk/accountant/bw-medical-accountants-ltd/` | 3 | 4 | Same shape. Two of the top-ranking URLs for "medical accountants" are other people's profiles of one firm |

**Note on the volume column.** The brief's per-URL volumes are the sum of `search_volume` across all rows for that URL; mine sums distinct values. The two do not match and neither is wrong. Positions and keyword counts reconcile exactly.

**Total set: 34 URLs. 30 returned 200 and were read. 4 returned HTTP 403.**

### 4a. Fetch failures, recorded not dropped

| URL | Status | Note |
|---|---|---|
| `pricebailey.co.uk/industries/healthcare/medical/` | **403** | 13 in-cluster keywords, best position 8. Confirmed on retry, not transient |
| `pricebailey.co.uk/industries/healthcare/` | **403** | 3 keywords, best position 6. Confirmed on retry |
| `simpkinsedwards.co.uk/sectors/healthcare` | **403** | 6 keywords, best position 20 |
| `hawsons.co.uk/sectors/healthcare-medical-accountants/gp-accountants/` | **403** | **Known 403 to automated fetching**, recorded in `language_spec` Part 4 point 6 and BATCH2_INDEX §9 point 3 |

**These four are flagged gaps, not absences.** Between them they hold 25 in-cluster keywords, and Price Bailey holds a Google top-10 slot. **Nothing in this pack may claim the coverage checklist in 4c is complete across the market**; it is complete across the 30 pages that could be read. If any one of the four is later fetched by a browser path, the checklist is re-run against it before the page is written, not after.

### 4b. The thirty pages, torn down

Every row below was fetched live on 2026-08-26. **Words** are approximate body word counts. **WE** = worked example carrying real figures. **Named** = named staff, credentials or photos of people. **Test** = named clients or testimonials.

| # | URL | Kws | Best pos | Words | H2/H3s | Tables | FAQ | WE | Pricing | Named | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | medicsmoney.co.uk/medical-accountant/ | 20 | 2 | ~2,750 | 12 | 0 | 5 | no | no | **yes, 4 people** | yes, 87 reviews |
| 2 | nicholsmedical.co.uk/ | 18 | 5 | ~3,500 | 13 | 0 | 3 | no | no | **yes, 4 + photos** | yes, 4 named doctors |
| 3 | themdu.com/my-membership/specialist-tax-and-accountancy-services | 17 | 4 | **~180** | 10 | 0 | no | no | no | no | no |
| 4 | ramsaybrown.com/ | 16 | 3 | ~1,350 | 11 | 0 | no | no | no | **yes, 4** | yes, 8 named practices |
| 5 | r-m-t.co.uk/rmt-medical/ | 15 | 20 | ~1,200 | 9 | 0 | no | no | no | **yes, 2 + photos** | no, client-count claim |
| 6 | pricebailey.co.uk/industries/healthcare/medical/ | 13 | 8 | **403** | - | - | - | - | - | - | - |
| 7 | johnstoncarmichael.com/industry-experience/healthcare/ | 13 | 10 | ~650 | 1 | 0 | no | no | no | **yes, 3 (AISMA)** | yes, 1 named |
| 8 | practiceindex.co.uk/gp/money/accountants | 13 | 6 | ~900 | 5 | 0 | no | no | no | no, logos only | review counts only |
| 9 | sial-accountants.co.uk/ | 12 | 9 | ~2,500 | 11 | 0 | 6 | no | no | partial, 1 name | anonymised initials |
| 10 | kudosaccounting.co.uk/accountants-for-doctors-london/ | 10 | 4 | ~3,000 | 12 | 0 | **8** | no | no | no | generic, unverifiable |
| 11 | johnstoncarmichael.com/industry-experience/healthcare | 8 | **6** | ~800 | 2 | 0 | no | no | no | **yes, 3** | yes, 1 named |
| 12 | lanop.co.uk/accountant-for-doctors/ | 8 | 7 | ~1,350 | 12 | 0 | no | no | no | no | no |
| 13 | sandisoneasson.co.uk/ | 7 | 2 | **~450** | 5 | 0 | no | no | no | no | no, "3,000+ clients" |
| 14 | forvismazars.com/.../medical-accounting-services | 7 | 4 | ~2,800 | 18 | 0 | **8** | no | no | **yes, 2 + photos** | no, scale claims |
| 15 | simpkinsedwards.co.uk/sectors/healthcare | 6 | 20 | **403** | - | - | - | - | - | - | - |
| 16 | aisma.org.uk/accountants/tca-healthcare/ | 6 | 19 | **~180** | 0 | 0 | no | no | no | 1 name | no |
| 17 | bw-medical.co.uk/ | 6 | **1** | ~1,200 | 12 | 0 | no | no | no | no | no, scale claims |
| 18 | taxqube.co.uk/services/medical-healthcare-industry-accountants/ | 6 | 10 | ~850 | 20 | 0 | no | no | no | no | no |
| 19 | rbp.co.uk/ | 6 | 8 | ~800 | 4 | 0 | no | no | no | 12 photos, no names | no |
| 20 | bw-medical.co.uk/who-we-help/hospital-doctors | 5 | 27 | ~1,200 | 15 | 0 | no | **YES** | no | no | yes, 3 anonymised |
| 21 | sial-accountants.co.uk/services/medical-accountants-for-doctors/ | 4 | 9 | ~1,300 | 10 | 0 | 5 | no | no | no | anonymised initials |
| 22 | aisma.org.uk/accountants/mha-nottingham/ | 4 | 9 | **~280** | **0** | 0 | no | no | no | **yes, 4 credentialed** | no |
| 23 | aisma.org.uk/ | 4 | 3 | ~380 | 5 | 0 | no | **YES** | no | 2 names | no |
| 24 | r-m-t.co.uk/rmt-medical/gp-practices/ | 3 | 4 | ~1,800 | 19 | 0 | no | no | no | **yes, 3 + photos** | no |
| 25 | bhp.co.uk/specialist-teams/healthcareaccountants/ | 3 | 35 | ~2,750 | 13 | 0 | no | no | no | **yes, 5** | **yes, 10 + NPS** |
| 26 | practiceindex.co.uk/gp/bw-medical-accountants-ltd | 3 | 5 | ~1,200 | 7 | 0 | no | no | no | **yes, 4 + photos** | 44 verified reviews |
| 27 | medicsmoney.co.uk/accountant/bw-medical-accountants-ltd/ | 3 | 4 | ~3,500 | 3 | 0 | no | no | no | names in reviews only | **24 reviews, 1 to 5 star** |
| 28 | accountants4nhsdoctors.co.uk/ | 3 | 4 | **~2,500** | ~20 | 0 | no | no | no | **no** | 1 anonymised |
| 29 | coveneynicholls.co.uk/sectors/medical/ | 3 | 30 | ~650 | 4 | 0 | no | no | no | no | no |
| 30 | bhp.co.uk/office/sheffield/medical-accountants-sheffield/ | 3 | 8 | ~1,800 | 11 | 0 | no | no | no | **yes, 4** | yes, but **off-topic** |
| 31 | fkca.co.uk/fk-medical/ | 3 | 15 | ~800 | 20 | 0 | no | no | no | no | no |
| 32 | pricebailey.co.uk/industries/healthcare/ | 3 | 6 | **403** | - | - | - | - | - | - | - |
| 33 | bma.org.uk/.../medical-accountancy-and-tax-advice | 2 | **1** | ~650 | 17 | 0 | no | no | no | stock photo only | no |
| 34 | hawsons.co.uk/.../gp-accountants/ | n/a | 2 | **403** | - | - | - | - | - | - | - |

### 4c. Does the "peers are thin" finding hold across thirty pages? Mostly yes, with two corrections

`language_spec` Part 4 point 2 records, from a nine-page read, that the commercially-ranking peers are thin: ramsaybrown ~1,200 words with no worked example, sial 1,400 to 1,600 with none. **Tested against thirty pages, the finding holds and gets sharper.**

**1. It holds on depth, and the number is worse than the spec implies.** Median body length across the 30 readable pages is roughly **1,200 words**. Nine of the thirty are **under 900 words**, and four are under 500: `themdu.com` at ~180, `aisma.org.uk/accountants/tca-healthcare/` at ~180, `aisma.org.uk/accountants/mha-nottingham/` at ~280 with **zero H2s or H3s**, `sandisoneasson.co.uk` at ~450. The MDU page holds **17 in-cluster keywords at best position 4 on roughly 180 words**. sandisoneasson holds 7 keywords at **position 2 on roughly 450 words**. This is not a field where depth is buying the ranking.

**2. It holds decisively on worked examples, which is the widest quality gap.** `language_spec` §G already records zero of nine. **Across 30 pages, exactly two carry a worked figure**, and neither is a proper worked example:
   - `bw-medical.co.uk/who-we-help/hospital-doctors` states the mileage rate as **"45p per business mile for the first 10,000 miles then 25p"**. That figure is **stale**. `house_positions.md` §8 locks **55p for the first 10,000 business miles for 2026/27**, risen from 45p on 6 April 2026, verified at gov.uk on 2026-08-26. A live competitor page is publishing last year's rate on the exact figure this site has locked and re-verified. That is the single sharpest demonstration available that this market is not maintaining its numbers.
   - `aisma.org.uk` runs a case study, "AISMA accountant uncovers £180,000 VAT refund for dispensing practice". A real number, but it is a marketing outcome claim, and rule **I4** plus **F6** put it out of bounds for us. We cannot copy it and must not want to.

   **28 of 30 pages carry no figure at all. Zero of 30 carry a table.** `language_spec` **L4** requires at least one table on any page carrying rates or a comparison, and the market gives us that for free.

**3. CORRECTION to `language_spec` Part 4 point 5.** The spec records `accountants4nhsdoctors.co.uk` as "the longest peer page in the sample at roughly 2,850 words with 38 headings". Re-read on 2026-08-26 it is **approximately 2,500 words with roughly 20 headings**, and across the thirty-page set **it is not the longest**: `nicholsmedical.co.uk` (~3,500), `medicsmoney.co.uk/accountant/bw-medical-accountants-ltd/` (~3,500, mostly review text), `kudosaccounting.co.uk` (~3,000) and `forvismazars.com` (~2,800) are all longer. The **part of the finding that matters survives intact and is now much better evidenced: it carries no named staff, no credentials and no photos of people, and it holds a Google top-4 position.** Faceless works in this niche, and it is now a thirty-page finding rather than a one-page one. The word-count and heading-count claim in the spec should be corrected; the L3 conclusion drawn from it ("length is not the lever") is unaffected and is if anything strengthened, because the two 180-word directory pages rank at positions 4 and 19.

**4. NEW finding the nine-page read could not see: the top of this SERP is directories, not firms.** Six of the thirty pages are directory or listing surfaces rather than a firm's own service page: `medicsmoney.co.uk/medical-accountant/` (20 keywords, position 2, the cluster's incumbent), `practiceindex.co.uk/gp/money/accountants`, `aisma.org.uk/` and two AISMA member listings, plus `practiceindex.co.uk/gp/bw-medical-accountants-ltd` and `medicsmoney.co.uk/accountant/bw-medical-accountants-ltd/`. **Two of the best-ranking URLs for "medical accountants" are other people's directory profiles of a single firm, BW Medical.** The reader arriving on this vocabulary is frequently in a choosing-between-firms mindset, not a learning mindset, and no firm's own page in the set serves that intent honestly. Section 5 W1.

**5. Trust signalling in this market is exactly what we are forbidden to do.** 14 of 30 pages name staff with credentials or photos; 13 carry named clients or testimonials. `medicsmoney` bylines doctor-founders with post-nominals, `nicholsmedical` photographs four principals, `bhp` publishes a Net Promoter Score and ten named practices, `ramsaybrown` names eight client practices. **Every one of those levers is closed to us by I2 and I4.** One page in the set proves it does not matter (`accountants4nhsdoctors`, faceless, position 4). Our substitute for a face is a figure, per D1. That is the design constraint the whole page hangs on.

**6. Nobody shows a price. 0 of 30.** Several say "fixed fee" or "transparent pricing"; none states an amount. Our no-pricing rule (I5) costs us nothing competitively here, and coordinator ruling 4 gives us the asymmetry: **third-party statutory amounts are publishable and no competitor is publishing any.**

### 4d. Coverage checklist: the union of their heading themes

Deduplicated from the 30 readable pages. §9.9 floor 8 requires a decision on every row and **the count of undecided themes must be zero at QA**.

| # | Heading theme | Seen on | Decision for this page |
|---|---|---|---|
| 1 | "What a specialist medical accountant does that a general accountant cannot" | medicsmoney, sial, forvismazars, accountants4nhsdoctors | **COVER, and it is the page's core.** Ownership row O14 |
| 2 | Who we help / audience segmentation by role | 24 of 30 | **COVER as the routing spine.** V4: 2 to 4 sentences each, then link. Criterion C |
| 3 | GP partners and GP practices | 26 of 30 | **ROUTE ONLY.** Owned by `/for-gps` and `/blog/gp-accountant`. Criterion D |
| 4 | Salaried GPs | 12 | **ROUTE ONLY.** `/for-gps` |
| 5 | Locum doctors / locum GPs | 22 | **ROUTE ONLY.** `/for-locum-doctors`, `/blog/locum-tax` pillar. Criterion D |
| 6 | Hospital consultants and private practice | 20 | **ROUTE ONLY.** `/for-consultants`, `/blog/private-practice` pillar |
| 7 | Registrars, trainees, junior doctors | 6 | **ROUTE ONLY.** `/for-junior-doctors` |
| 8 | PCNs and GP federations | 4 (ramsaybrown, rbp, sandisoneasson, aisma-mha) | **COVER at one sentence.** No page of ours owns it; it is named as a gap in section 7.5 |
| 9 | Practice managers | 5 | **DECLINE.** Not a fee-payer for us and `practiceindex` owns the audience outright |
| 10 | **Vets / veterinary practices** | 2 (r-m-t x2) | **ROUTE ONLY, 2 to 4 sentences.** Ownership row **O15**. Hands off to batch-2 item 6 |
| 11 | **Nurses and allied health professionals** | 3 (medicsmoney, forvismazars, coveneynicholls) | **ROUTE ONLY, 2 to 4 sentences.** Ownership row **O15**. Hands off to batch-2 item 7 |
| 12 | **Opticians / optometrists** | 3 (sial, johnstoncarmichael, sial service) | **NAME ONLY, one clause, NO LINK.** There is no page to route to and BATCH2_INDEX §7 records the cluster as unpackable. Criterion F |
| 13 | Dentists | 9 | **DECLINE ENTIRELY.** Sibling-site territory, vetoed by `lane_negative_tokens` (`competitor_universe` §4). Criterion E2 |
| 14 | Pharmacists | 6 | **DECLINE ENTIRELY.** The `pharmacies` site owns rows 18 and 19. Criterion E2 |
| 15 | Care homes / domiciliary | 2 | **DECLINE ENTIRELY.** The `care` site. Criterion E2 |
| 16 | Annual accounts and year-end | 22 | **ROUTE ONLY.** `/services` |
| 17 | Self-assessment and tax returns | 24 | **ROUTE ONLY.** `/services`, `/blog/gp-tax-and-accounts` pillar |
| 18 | NHS pension / superannuation / annual allowance | 21 | **ONE SENTENCE AND A LINK to `/nhs-pension`.** Ownership rows O1, O2, O18. **No tier table, no allowance figures.** Criterion E3 |
| 19 | McCloud remedy | 4 (forvismazars, bw-medical, sial, aisma-mha) | **ONE SENTENCE AND A LINK** to `/blog/mccloud-remedy-nhs-pension-doctors-explained` |
| 20 | Scheme Pays | 1 (accountants4nhsdoctors) | **DECLINE.** Ownership row **O4**, and `/blog/nhs-pension-scheme-pays-doctors-deadlines` is FROZEN. This is the exact fact that broke batch 1. Criterion E3 |
| 21 | Superannuation certificates, Type 1 / Type 2 | 4 (sial, fkca, bw via directory, aisma-mha) | **ONE SENTENCE naming the certificate machinery, then link** to `/blog/gp-practice-income-pcse-statement-reconciliation`. Per E1 and E2 of the language spec, PCSE and Type 1/Type 2 get their gloss even in one sentence |
| 22 | Payroll | 12 | **ROUTE ONLY.** `/blog/gp-payroll-services` is FROZEN to 2026-09-10; link, add nothing |
| 23 | VAT | 8 | **ONE SENTENCE AND A LINK.** Ownership row O17, `/blog/gp-vat-registration` is FROZEN |
| 24 | IR35 and off-payroll | 4 (lanop, fkca, accountants4nhsdoctors, kudos) | **ROUTE ONLY** to `/for-locum-doctors` |
| 25 | Incorporation and company structures | 9 | **ROUTE ONLY** to the `/blog/incorporation-and-company-structures` pillar |
| 26 | Partnership agreements, mergers, disputes, capital | 7 | **ROUTE ONLY.** Our densest specialist ground and our only Google top-10 lane |
| 27 | Surgery premises and property finance | 4 | **ROUTE ONLY** |
| 28 | Benchmarking practice performance | 6 | **DECLINE.** We have no benchmarking data and inventing one is F6 |
| 29 | Drawings calculations | 3 (fkca, bw, aisma-mha) | **ROUTE ONLY** to `/calculators/gp-partner-drawings-planner` |
| 30 | MTD for Income Tax | 3 (sandisoneasson, bma, forvismazars) | **COVER at one to two sentences with a date.** §9 of house positions: £50,000 threshold live from 6 April 2026, present tense |
| 31 | Cloud accounting, Xero, software | 8 | **ROUTE ONLY** to `/blog/gp-accounting-software` |
| 32 | Tax investigation / fee protection | 5 | **DECLINE.** It is a product we do not sell, and naming it implies one |
| 33 | "Why choose us" / "what makes us different" | 18 | **COVER, reframed.** The section answers **how to choose any specialist medical accountant**, with checkable questions a reader can put to anyone. Not about us. Section 5 W1 |
| 34 | Named team with credentials and photos | 14 | **HARD DECLINE. Rule I2.** Criterion E4 |
| 35 | Named client testimonials, reviews, NPS | 13 | **HARD DECLINE. Rule I4.** Anonymised role-plus-rounded-scale only, and only if genuinely true. Criterion E4 |
| 36 | Awards and association badges (AISMA, AVN, ICAEW) | 7 | **DECLINE.** We hold none of these and implying membership is a fabricated credential |
| 37 | Fees, "fixed fee", "request a fee quote" | 9 (all wordless on amount) | **HARD DECLINE for our fees. Rule I5.** Criterion E4 |
| 38 | An FAQ block | 6 of 30 | **COVER, 4 to 8 questions.** Language spec H1. The market median is zero |
| 39 | A table | **0 of 30** | **COVER, at least one.** Language spec L4. Free differentiation |
| 40 | A worked example with real figures | **0 of 30 usable** | **COVER, exactly one.** Language spec G1 to G7. The widest quality gap in the niche |
| 41 | An embedded calculator or tool | 0 of 30 | **COVER by routing.** We have ten live calculators; resolve each link by reading the `slug` field in `Medical/web/src/lib/tools/configs/*.ts`, never by file name (coordinator ruling 5). Criterion G |
| 42 | City / "near me" local targeting | 16 of 30 | **DECLINE ALL CITY VOCABULARY. Criterion E1.** The "near me" phrasings are carried as national prose; no city name appears. Section 5 W4 records the tension |
| 43 | Newsletter signup, podcast, events, webinar | 5 | **HARD DECLINE. Rule I7**, no interruptive UI, and nothing new that interrupts the reader |
| 44 | Foreign income, returning-from-abroad doctors | 1 (accountants4nhsdoctors) | **DECLINE with reason.** No house position covers it. Named in section 7.5 as an unfilled gap |
| 45 | Mileage and personal expenses | 2 (bw-medical, taxqube) | **ONE SENTENCE with the correct 55p figure.** Ownership rows O7 and O8 give the detail to batch-2 item 1 and to the frozen deductions pages |

**Undecided themes: 0.**

---

## 5. Whitespace

What no competitor does, stated so a writer can quote it back.

**W1. Thirty pages sell "choose us" and not one page in the market tells a doctor how to choose.** 18 of 30 carry a "why choose us" or "what makes us different" section, and every one of them is an assertion. The **directory** layer that actually ranks (medicsmoney at position 2 with 20 keywords, practiceindex, aisma, and two third-party profiles of BW Medical) exists precisely because the reader's real question is comparative, and the directories answer it with review counts rather than with criteria.

**Nobody publishes the checkable questions.** A doctor choosing a medical accountant should be able to ask: does the firm complete the **Type 1 Annual Certificate of Pensionable Profits** for partners and the **Type 2 self-assessment** for salaried GPs, and does it know both run to a **28 February deadline a year in arrears** (so 2025/26 is due 28 February 2027)? Does it know the freelance locum **10-week rule**, where work pensioned more than ten weeks late is rejected outright and the accrual is **irrecoverably lost, not merely late**? Does it understand that the annual allowance measures the **pension input amount**, the capitalised growth in benefits, and not the contributions taken from pay? Every one of those is verified in `house_positions.md` §2.B and §2.C at primary source on 2026-08-26, every one is a question a reader can put to any firm including us, and **none of the thirty pages contains any of them.**

This is the page's spine, it is honest, it is faceless by construction, and it converts. It also satisfies D1 (every claim carries a figure, a date, a form name or a named rule) on a page type that is normally pure assertion.

**W2. The market publishes no figures at all, and one competitor is publishing a stale one.** 28 of 30 pages carry no number. `bw-medical.co.uk/who-we-help/hospital-doctors` carries **45p per business mile for the first 10,000 miles**, which was correct until 5 April 2026 and is wrong now: the rate is **55p for 2026/27** (`house_positions.md` §8, re-verified at gov.uk 2026-08-26). We do not name the competitor and we do not say "unlike others". We simply state the correct rate with its year tag, once, and link out per ownership row O7. **The differentiation is that our numbers are dated and theirs are not.** Language spec F1 and F2 exist for exactly this.

**W3. Nobody explains what makes medical accounting different at the level of the accounts, only at the level of the audience list.** Every page lists professions. None says what the actual technical divergence is. Ours can, in one table, and every row is locked ground truth:
   - **NHS GP goodwill cannot be sold** (prohibited since 1 April 2004, current instrument SI 2019/251), so a GP practice transaction is tangibles, premises and capital accounts, never a goodwill multiple (§4).
   - **A limited company cannot hold a GMS/PMS contract**, and company income and dividends are **not NHS-pensionable** (§2.C), so incorporation is a private-work decision only and always carries a pension-accrual cost.
   - **Medical care by a registered practitioner is VAT-exempt** under VATA 1994 Sch 9 Group 7 where the principal purpose is protection, maintenance or restoration of health, so **exempt income does not count toward the £90,000 registration threshold**, while medico-legal reports are standard-rated (§6).
   - **A GP partner is taxed on profit share, not drawings** (§1), which is the most common misunderstanding in the whole audience.

   Four sentences, four statutory anchors, zero competitors carrying any of them. This is the section that makes the page authoritative rather than a directory entry, and per V4 each row is one or two sentences and a link, never an explanation.

**W4. The local-pack tension, stated honestly and routed away.** `competitor_universe_2026-08-26.md` §2e records **`local_pack` on 9 of 18 head SERPs**, and 16 of the 30 competitor pages carry explicit city or office-address targeting. The obvious market answer to a local pack is a Google Business Profile.

**We will not do that. Google Business Profile is on the estate's standing never list, on every site, for suspension risk.** No recommendation in this pack touches GBP or any local listing, and none may be added later on the strength of the §2e observation.

**So the tension is real and this page does not resolve it.** What it does instead is take the **national** slice of the same demand, which is the larger and less contested half: `healthcare accountants near me` at 720 volume is a near-me phrasing whose SERP is national organic plus a pack, and the organic half is winnable without a listing. The three city phrasings in the tight set (`medic accountants london`, `medical accountant london`, `medical accountants london`, 210 combined) are **declined here and left to the existing city pages**, which is where section 6 puts them anyway.

**Route the recommendation elsewhere, not to GBP.** The two non-GBP levers this data actually supports are: (a) **the directory layer**, since AISMA and Practice Index listings are ranking in the top 10 and are an off-site placement rather than a Google product, and (b) **AI Overviews**, since §2e records **`ai_overview` on 12 of 18 head SERPs**, which is the GEO argument for this site in one number and is exactly what a figure-dense, question-headed, faceless page is built to be cited by. Both are **owner decisions outside this pack's scope** and neither is actioned here. Note that AISMA membership is a real credential we do not hold, and 4d row 36 forbids implying otherwise.

**W5. The reader arriving on this vocabulary is often not yet a client of anyone, and the market has no entry point for them.** Every page in the set is written for someone already shopping. Nothing addresses the doctor who does not yet know whether their position needs a specialist at all: a salaried GP with two locum shifts a month, a consultant whose first private invoice has just been paid, a registrar who has never filed a return. `accountants4nhsdoctors` gets closest with "A PAYE salary does not always mean a simple tax position", which is the one subheading in the entire thirty-page set worth copying outright (`language_spec` Part 3). A short qualifying section built from that shape, in the market's own words and with a figure in each, is unoccupied ground and is the natural home for the FAQ block.

---

## 6. Our current position: the self-competition partition

**This is the biggest self-competition risk in batch 2 and the section the writer must read twice.** The site already runs a large commercial-acquisition estate. The new page is being inserted into the middle of it.

### 6a. Full inventory of what already exists

Counted from `Medical/web/content/blog/*.md` (79 files) and `Medical/web/src/app/`, read only, 2026-08-26.

**City-level blog pages: eleven, not twelve.**

| Slug | Note |
|---|---|
| `gp-accountant-birmingham` · `gp-accountant-bristol` · `gp-accountant-edinburgh` · `gp-accountant-glasgow` · `gp-accountant-leeds` · `gp-accountant-liverpool` · `gp-accountant-london` · `gp-accountant-manchester` · `gp-accountant-newcastle` · `gp-accountant-sheffield` | 10 files on the `gp-accountant-<city>` pattern |
| `nottingham-gp-accountant` | **The eleventh, and its slug is inverted.** It is `nottingham-gp-accountant`, not `gp-accountant-nottingham`. See correction C2 |

**Non-city `gp-accountant*` blog pages: four.** `gp-accountant` (metaTitle "GP Accountant \| What a Specialist Medical Accountant Does"), `gp-accountant-cost`, `gp-accountant-services-complete-guide`, `gp-accounting-software`. Plus `gp-accounting-guide`, **FROZEN to 2026-09-10**.

**TSX pillar hubs under `Medical/web/src/app/blog/`: eight.**

| Route | Title |
|---|---|
| `/blog/gp-accountant-services` | "GP Accountant Services: Specialist Accounting for GPs" |
| `/blog/gp-practice-management` | "GP Practice Management: Financial Guidance for Practices" |
| `/blog/gp-tax-and-accounts` | "GP Tax & Accounts: Tax Planning for General Practitioners" |
| `/blog/incorporation-and-company-structures` | "Incorporation & Company Structures for Doctors" |
| `/blog/locum-tax` | "Locum Tax: Tax Guidance for Locum Doctors" |
| `/blog/medical-expenses` | "Allowable Medical Expenses for UK Doctors" |
| `/blog/nhs-pension-planning` | title from a `PAGE_TITLE` const |
| `/blog/private-practice` | "Private Practice for UK Doctors & Consultants" |

**Persona hubs, service page and location hub.**

| Route | Meta title | H1 |
|---|---|---|
| `/services` | "Medical Accounting Services \| Accounting for Doctors" | same const |
| `/for-gps` | "GP Practice Accountants \| Partnership Accounts & Partner Tax" | "GP Practice Accountants \| Accountants for GP Practices & Partners" |
| `/for-consultants` | "Medical Accountant for Hospital Consultants \| NHS & Private Practice Tax" | "Accountants for Hospital Consultants \| NHS & Private Practice Tax" |
| `/for-locum-doctors` | "Accountants for Locum Doctors \| Locum Accountant, IR35 & Tax" | "Accountants for Locum Doctors \| IR35, Ltd Company & Tax Returns" |
| `/for-junior-doctors` | "Accountants for Junior Doctors \| Locum Shifts, Student Loans & Tax" | same |
| `/locations` | "GP Accountants by Location \| Medical Accounting Specialists UK" | "GP accountants across the UK" |
| `/locations/[slug]` | **Five cities only**: london, manchester, birmingham, leeds, bristol (`Medical/niche.config.json` `locations`) | |

**Total commercial-acquisition surfaces already live: 16 city surfaces (11 blog + 5 `/locations/`), 4 non-city `gp-accountant*` blog pages, 8 TSX pillars, 4 persona hubs, `/services`, `/locations`.** That is 34 pages of commercial vocabulary before this page is written.

### 6b. What each one owns, and what this page is left

The dossier §9 finding is the key: **the market's vocabulary for this topic is "healthcare accountants", "accountants for doctors", "medic accountants", "accountant for medical professionals". Ours is "gp accountant <city>". The two sets do not overlap at all**, which is why a partition is possible rather than merely desirable.

| Surface | Owns, and keeps | Off limits to this page |
|---|---|---|
| The 11 city blog pages | **`gp accountant <city>` and every city name.** Ownership row O14 | Every UK city name, every region name |
| `/locations` and the 5 `/locations/<slug>` | The location-hub navigation and `gp accountants by location` | City vocabulary; the words "near your practice", "in your area", "local to you" |
| `/blog/gp-accountant` | `gp accountant` singular, and "what a specialist medical accountant does" **for GPs specifically** | The GP-specific version of the "what does one do" answer |
| `/blog/gp-accountant-cost` | **Everything about fees, cost drivers and what determines a price.** This page carries no pricing at all anyway (I5), so the boundary is free | Any sentence about cost, fee, price or "how much" |
| `/blog/gp-accountant-services-complete-guide` and `/blog/gp-accountant-services` (TSX) | The **service-line enumeration** for GPs, at guide depth | A service list longer than one sentence per line |
| `/blog/gp-accounting-guide` | **FROZEN to 2026-09-10**, holds a live Google top-10 on `gp partnership accounts specialist` | Anything about GP practice accounts production, SA800, or partnership accounting |
| `/blog/gp-accounting-software` | Software, MTD-ready bookkeeping, Xero | Software names |
| `/for-gps` | **`gp practice accountants` and `accountants for gp practices`.** 278 GSC impressions | Both those exact strings |
| `/for-consultants` | `accountants for hospital consultants`, NHS-plus-private-practice framing | That string |
| `/for-locum-doctors` | **`accountants for locum doctors`, `locum accountant`, `locum doctor accountant`, IR35** | All four |
| `/for-junior-doctors` | `accountants for junior doctors` | That string |
| `/services` | **`medical accounting services`** and the service-page commercial intent | That string |
| The 8 TSX pillars | Each topic's hub function inside `/blog/` | Becoming a ninth topic hub |

**The partition, in one line: this page owns the NATIONAL, PROFESSION-WIDE commercial term. Every existing page owns either a city, a single persona, or a service line. Nothing is taken from anything.**

**What this page uniquely owns and no existing page can claim:**
1. **`healthcare accountants` and `healthcare accountants near me`.** 0 files. The single highest-confidence topic on the map, 24 of 27 domains.
2. **`accountants for doctors` and `doctor accountants`.** 0 files, 780 combined volume, 100 GSC impressions already being earned by nothing.
3. **`medic accountants`.** 0 files, 720 volume, medicsmoney at position 3.
4. **`accountant for medical professionals` / `accountants for medical professionals`.** 0 files. The profession-wide framing that no persona hub can carry, because each hub is by definition one persona.
5. **`nhs accountants`.** 0 files.
6. **The routing function itself.** Nothing on this site currently routes a doctor who does not yet know which persona they are. `/services` is a service list; `/locations` is a city list; the persona hubs assume the reader has already self-identified. **That gap is the page's structural reason to exist, and V4 makes routing its job rather than a side effect.**

**The hard countable form of all this is criterion E1: zero city names, zero region names, and zero of the eight strings listed as owned by the persona hubs and `/services`.**

### 6c. The calculator-link rule

Coordinator ruling 5: **a calculator's file name does not predict its route.** Resolve every calculator link by reading the `slug` field inside `Medical/web/src/lib/tools/configs/*.ts`. The ten live slugs, read on 2026-08-26:

`consultant-private-vs-nhs` · `doctor-expenses-tax-relief` · `gp-partner-drawings-planner` · `private-practice-incorporation` · `locum-tax-calculator` · `nhs-pension-annual-allowance` · `nhs-pension-scheme-pays` · `nhs-superannuation-tiered-contribution` · `salaried-doctor-take-home` · `salaried-gp-vs-partner`

Each resolves to `/calculators/<slug>`. **`nhs-pension-calculator.ts` serves `/calculators/nhs-pension-annual-allowance`**, which is the exact trap ruling 5 was written for.

---

## 7. Deterministic acceptance criteria

Countable and checkable at QA. Every criterion either passes or names what failed. **Twelve criteria, A to L, containing 41 individually checkable assertions.** Hard fails are marked.

### A. Equity: passes vacuously, with one precondition (1 check)

**A1.** The page does not exist, so the DO-NOT-LOSE set is empty. **0 of 0.** §9.9 floor 5 passes.

**Precondition on deploy, not on writing, and it is BLOCKING at the deploy gate:** run a fresh GSC `searchanalytics.query` pull with dimensions `['page','query']` over 90 days and establish which URL earns each of the six rows in section 2c. Per §5 of the working agreement, never conclude from a stored snapshot. **If the pull shows any single existing page earning more than 500 of the 1,309 `gp accountants` impressions, that page's exact H1 string is added to the criterion E1 forbidden list before this page ships.**

### B. Named phrasings that must appear verbatim (11 required, 16 declined), BLOCKING

Drawn from section 3c's `no` rows, capped by binding rule **V1: two word orders per idea per page, hard cap.** The market having four orders of one idea is licence for two on this page, not four. **Count: 11 phrases must appear verbatim.** At least **four** of them must sit in the metaTitle, the H1 or an H2.

| # | Phrase | Idea family | Volume |
|---|---|---|---|
| 1 | `healthcare accountants` | A: healthcare accountants | 390 |
| 2 | `healthcare accountants near me` | A | 720 |
| 3 | `accountants for doctors` | B: accountants for doctors | 390 |
| 4 | `doctor accountants` | B | 390 |
| 5 | `medic accountants` | C: medic accountants | 720 |
| 6 | `medical accountants near me` | D: medical accountants near me | 90 |
| 7 | `medical accounting near me` | D | 50 |
| 8 | `accountant for medical professionals` | E: medical professionals | 110 |
| 9 | `accountants for medical professionals` | E | 110 |
| 10 | `nhs accountants` | F: nhs accountants | 90 |
| 11 | `medical accountant uk` | G: uk qualifier | 50 |

Seven idea families, no family carrying more than two orders. **The H1 must contain the market's word order verbatim (rule B1), and `healthcare accountants` is the head of the highest-confidence topic on the map, so it belongs there.**

`specialist medical accountants` is already present in 10 blog files; it may be carried once for continuity and is **not** counted as one of the 11.

**Declined, named so the count reconciles: 16 rows.**

- **Owned by an existing page, FORBIDDEN here (criterion E1): 2.** `gp accountants` (170), `locum doctor accountant` (50).
- **V1 cap, third and fourth orders of families already served: 3.** `tax accountant for doctors` (70), `tax accountants for doctors` (70), `medical accountant near me` (50).
- **City vocabulary, FORBIDDEN here (criterion E1): 4.** `medic accountants london`, `medical accountant london`, `medical accountants london`, `yorkshire medical accountants`.
- **Competitor brand navigational, never targetable: 4.** `b w medical accountants`, `bw medical accountants`, `bw medical accountants ltd`, `sharpe medical accounting ltd`.
- **Already present or brand-ambiguous: 3.** `specialist medical accountants` (present, 10 files), `medical accountants uk` (our own trading name, present in all 79 files as boilerplate), `medical accounts` (40, the domain stem; targeting it is targeting our own brand).

**11 required + 16 declined = 27. Balances to section 3a.**

### C. The hub rule, V4, made countable, BLOCKING (5 checks)

**C1.** Every sub-audience section is **2 to 4 sentences**, then a link. Count sentences per sub-audience block; any block of 5 or more sentences is a fail.
**C2.** **No sub-audience section contains a figure, a rate, a threshold, a form name or a deadline that is not also on the page it links to.** A hub that carries the child's facts has taken the child's ranking. This is the countable form of "a hub routes, it does not answer".
**C3.** The **vets** block and the **nurses** block are each 2 to 4 sentences and each carries exactly one forward link (ownership row **O15**). Neither may contain veterinary-specific or nursing-specific technical substance; that substance belongs to batch-2 items 6 and 7 and delivering it here leaves them nothing to rank for.
**C4.** **At least 12 internal links** in the finished page, covering at minimum: `/for-gps`, `/for-consultants`, `/for-locum-doctors`, `/for-junior-doctors`, `/services`, `/nhs-pension`, `/locations`, `/blog/gp-accountant`, one TSX pillar, one calculator resolved by its `slug` field, and the two batch-2 sibling pages once they exist.
**C5.** **No section of this page exceeds 220 words** except the opening block, the choosing section (W1) and the worked example. A hub with a 400-word section is answering something.

### D. Sibling-page respect, BLOCKING (1 check per row, 8 rows)

Each row is checkable as "at most one short block, and at least one internal link to the owner".

| Ground | Owner | Status |
|---|---|---|
| GP practice accounts, SA800, partnership accounting | `/blog/gp-accounting-guide` | **FROZEN to 2026-09-10** and holds a live Google top-10. Link only |
| Cost and fees of a medical accountant | `/blog/gp-accountant-cost` | Live. This page states no price at all |
| The GP-specific "what a specialist accountant does" | `/blog/gp-accountant` | Live, 1 of only 2 pages carrying tight-set vocabulary |
| GP practices and partners as an audience | `/for-gps` | Live, earns 278 GSC impressions |
| Locum doctors, IR35 | `/for-locum-doctors`, `/blog/locum-tax` | Live |
| Hospital consultants, private practice | `/for-consultants`, `/blog/private-practice` | Live |
| The service-line enumeration | `/services`, `/blog/gp-accountant-services` | Live |
| Payroll, VAT, deductions, mileage | `/blog/gp-payroll-services`, `/blog/gp-vat-registration`, `/blog/gp-tax-deductions-complete-list-2026` | **All FROZEN to 2026-09-10.** Link; add nothing |

### E. Forbidden content, BLOCKING, negative criteria (4 groups, 12 checks)

**E1. No city vocabulary and no owned strings. The single most important criterion in this pack.**
The following must be **absent from the entire file including frontmatter, metaTitle, metaDescription and alt text**:
- (a) Every UK city and region name, specifically `london`, `manchester`, `birmingham`, `leeds`, `bristol`, `sheffield`, `newcastle`, `liverpool`, `nottingham`, `edinburgh`, `glasgow`, `yorkshire`.
- (b) The strings `gp accountants`, `gp practice accountants`, `accountants for gp practices`, `locum doctor accountant`, `accountants for locum doctors`, `accountants for junior doctors`, `accountants for hospital consultants`, `medical accounting services`.
- (c) The phrases `near your practice`, `in your area`, `local to you`, `your local`.
- **Check: grep the finished file for all 24 strings. Any hit is a hard fail.**

**E2. No sibling-site profession.** The strings `dentist`, `dentists`, `dental`, `dentistry`, `pharmacist`, `pharmacists`, `pharmacy`, `care home`, `domiciliary` must be **absent**. Enforced by `lane_negative_tokens` and by the profession boundary in `competitor_universe_2026-08-26.md` §4. Nine of the thirty competitor pages list dentists in their audience; we do not, and the reason is that a sibling site owns them.

**E3. No UNVERIFIED figure, and no other page's owned figure.**
- **No GMC annual retention fee amount** (ownership row **O9**, `house_positions.md` §8 and §10, UNVERIFIED, GMC returns HTTP 403 to automated fetches). The page may say the fee is **deductible**. **Any £ or numeric within 30 words of "GMC" plus "fee" is a hard fail.**
- **No Global Sum per weighted patient figure and no QOF point value** (ownership row **O10**; QOF point value UNVERIFIED). Global Sum is separately locked at £130.07 for 2026/27, but it belongs to the GP practice-income pages, not to a hub.
- **No NHS tiered contribution table** (row O1), **no annual allowance figures** (row O2), **no Scheme Pays deadline or election mechanics** (row **O4**, the exact fact that broke batch 1), **no adjusted-net-income taper detail** (row O3, owned by batch-2 item 5).

**E4. No estate hard-fail content.** No named expert, credential or post-nominal, no "About the author", no "Reviewed by", no photo of a person presented as our team (I2). No named client, practice or testimonial (I4). No pricing for our services (I5). No fabricated statistic, no "most doctors", no percentage without a named source (F6, I6). No popup, modal, banner, sticky bar, newsletter interstitial or countdown (I7). No em-dash anywhere (I1). No comparative or superlative claim about us (I8). **No mention of Google Business Profile, Google Maps listing, or any local-listing recommendation, on the page or anywhere in the surrounding work.**

### F. The opticians handling, BLOCKING (1 check)

`opticians` and `optometrists` appear in three competitor audience lists and are assigned to this site by the niche map (ABSORB #20), but **BATCH2_INDEX §7 records the cluster as NOT PACKABLE**: the entire 32,872-row harvest contains three optician keywords, all navigational brand terms. **The page may name opticians once, in a single clause inside the audience orientation, and must not link anywhere**, because there is nothing to link to. Writing a routing sentence to a page that does not exist is a broken promise; writing a paragraph on optician accounting is writing on thin air. **Check: `optician` appears at most once, and carries no link.**

### G. Structural floors (8 checks)

- **G1.** Exactly **one** worked example, 80 to 200 words, five components in order (persona with role and rounded figure, inputs, arithmetic step by step, result, one sentence on what changes the answer). **The heading above it must not be the words "Worked example"** and it must not open with a `Worked example:` prefix (G6, J4, hard fail; our corpus already carries the string in 13 files).
- **G2.** **At least one table.** 0 of 30 competitor pages has one. The natural table is W3's four technical divergences, or the "questions to ask any specialist medical accountant" set from W1.
- **G3.** **FAQ block of 4 to 8 questions**, each a distinct market phrasing not already used verbatim as an H2, each answer 40 to 110 words opening with the direct answer and containing at least one figure, date, form name or named rule (H1 to H6).
- **G4.** **H2 count 6 to 14**, with **50% to 75% question-form** (B4, B6).
- **G5.** **Word count 2,000 to 3,200** (L2, hub band). Length is not a lever (L3); the band exists to catch a page that is thin or bloated. The market median is roughly 1,200 and the four best-ranking pages in the set range from 180 to 3,500 words, so nothing here is a race.
- **G6.** **The direct answer to "what is a healthcare accountant and what do they do" appears within the first 60 words**, before the first H2 (A1). Opening block 40 to 90 words (A5). No scene-setting, no rhetorical question, no "in this blog we'll", no sentence whose grammatical subject is us (A3).
- **G7.** **metaTitle at or under 60 characters** and containing `healthcare accountants`.
- **G8.** **Every internal link resolves.** Medical uses FLAT `/blog/<slug>` routing, so run `scripts/medical_flat_link_audit.py`, **0 broken links**. Every calculator link resolved by reading the `slug` field in `Medical/web/src/lib/tools/configs/*.ts` (coordinator ruling 5), never by file name.

### H. Style rules made countable, BLOCKING where marked (6 checks)

- **H1.** `"it is not X, it is Y"` appears **at most once**, and that is a batch-wide cap (**V5**). Every batch-1 page ran it three to seven times.
- **H2.** No other single rhetorical construction appears more than twice (J6).
- **H3.** **The keyword research is never narrated** (**V2**). No "also searched as", no variant list, no telling a reader that two searches mean the same thing, no "also known as" column. Observed live in batch 1 and blocked. **Hard fail.**
- **H4.** Any phrasing that will not sit as natural English **goes unplaced and is reported**, never forced (**V6**).
- **H5.** Mean sentence length 15 to 22 words, no sentence over 40 (C1). Paragraphs 1 to 4 sentences, maximum 75 words (C2). "you"/"your" at 12 to 25 per 1,000 words (C3). "we"/"our"/"us" at **maximum 3 per 1,000 words and none in the opening block or any H2** (C4). On a commercial page this last one is the hardest and the most important: 18 of 30 competitor pages open on themselves.
- **H6.** Section word-count coefficient of variation above 0.2 (J7). No hollow transitions (J8). No restated-question openers (J9). Maximum 3 bulleted lists, 8 items each (C5).

### I. Jargon glosses, E1 to E9, scoped to a hub (2 checks)

- **I1.** Any NHS term used on this page gets its gloss within 25 words of first use: **PCSE** expanded to Primary Care Support England with its function and the nation caveat (E1); **Type 1 and Type 2** given as what the person is, a GP provider or partner and a salaried GP, never as bare digits (E2); **superannuation** used once as an explicit synonym for NHS pension contributions (E8).
- **I2.** **Because this is a hub, the correct move on most jargon is not to use it at all.** A gloss is a licence, not an instruction. If a term needs more than a clause of explanation, it belongs on the page that owns it and the hub links instead. Cross-post sameness on these glosses is the highest J1 risk in the batch, since every batch-2 page needs them.

### J. The "consultant" disambiguation (1 check)

Dossier §8 flags seven screened topics totalling 6,450 volume where **"consultant" means a tax adviser to Google and a hospital doctor to us**. Every first use of "consultant" on this page must be qualified: `hospital consultant` or `consultant in private practice`. **Check: the bare word `consultant` does not appear before its first qualified use.**

### K. Statutes and sources to re-verify at source before publication, BLOCKING (1 check)

Every figure on the page traces to `house_positions.md` and is content-verified at primary source, not URL-liveness-checked. **This page needs no house-positions extension** (BATCH2_INDEX §5 lists items 1, 3, 4 and 7 as gated; item 2 is not). The load-bearing anchors, all verified at primary source on 2026-08-26 and all already locked:

| Fact the page may use | House position | Primary source |
|---|---|---|
| NHS GP goodwill cannot be sold, since 1 April 2004, current instrument SI 2019/251 | §4 | legislation.gov.uk/uksi/2019/251/made |
| A company cannot hold a GMS/PMS contract; company income and dividends are not NHS-pensionable | §2.C | NHSBSA practitioner guidance, FA 2004 Part 4 |
| Medical care by a registered practitioner is VAT-exempt, principal-purpose test; £90,000 registration threshold on non-exempt turnover; medico-legal reports standard-rated | §6 | VATA 1994 Sch 9 Group 7; gov.uk VAT registration |
| A GP partner is taxed on profit share, not drawings; SA800 to SA104 | §1 | ITTOIA 2005, TMA 1970 |
| Type 1 Annual Certificate and Type 2 self-assessment both due **28 February a year in arrears** (2025/26 due 28 February 2027); locum **10-week rule**, late forms rejected and accrual irrecoverably lost | §2.C | PCSE end-of-year process pages |
| The annual allowance measures the **pension input amount**, capitalised growth, not contributions paid | §2.B | gov.uk annual allowance |
| MTD for Income Tax: £50,000 from **6 April 2026**, live now, present tense; partnerships deferred with no date; limited companies out | §9 | gov.uk MTD guidance |
| Mileage **55p** first 10,000 business miles, 25p thereafter, 2026/27 | §8 | gov.uk travel and mileage rates |

**Facts read off a competitor page in section 4 that must NOT be published:** bw-medical's **45p** mileage rate (stale, contradicted by §8); AISMA's **£180,000 VAT refund** case study (I4 and F6); every scale claim in the set (`3,000+ clients`, `120+ GP practices`, `2,000+ healthcare professionals`, `300+ GP practices`, `2,600 medical professionals`, `over 40 GP practices`, published NPS scores). **None of them is ours and none may be adapted.**

### L. Batch and QA floors (4 checks)

- **L1.** Competitor re-read: the section 4d table, **45 themes, 0 undecided**.
- **L2.** Reconciliation balance: **11 required + 16 declined = 27**. Balances.
- **L3.** The **four 403 URLs in 4a are recorded as flagged gaps** in the QA note, and the coverage checklist is labelled complete across 30 of 34 pages, never across the market.
- **L4.** The two human passes: adversarial factual QA against `house_positions.md` §1, §2.B, §2.C, §4, §6, §8, §9, with **criterion E3 (UNVERIFIED figures)** as the named priority; and editorial QA, which here additionally checks that **the page still reads as a hub rather than as a guide** (criterion C), and that the market phrasings read as prose rather than as inserted keywords (K6, V2).

---

## 8. Stated expectation

Written before the work, as numbers a later read can fail (§9.6).

**Baseline.** Google: the URL does not exist, 0 impressions, 0 clicks. Bing: the URL does not exist; the site-level pull of 2026-08-26 returned 648 queries of which **one** matched this family, `nhs tax accountant near me`, 0 clicks / 1 impression. **This page starts from zero on both engines.**

**The measurement reality it is written into.** Google indexes roughly **21 of 130 URLs** on this site, driven by low domain authority and not by any technical defect. **Bing indexes it fully and sends 3.4x the Google clicks.** New pages on this domain earn on Bing first. Every primary test below is therefore a Bing test.

**Say it plainly: Google may not index this page at all inside the 90-day window, and that would carry no information.** On a corpus where Google indexes 16% of URLs, a new page not being indexed at 28 days is the base rate, not a defect. No Google target is set below and none should be inferred.

| Horizon | Engine | Expectation |
|---|---|---|
| **14 days** | **Bing** | The URL appears in `GetPageQueryStats` at all, with **at least 1 named query and at least 3 impressions**, where there were none. The named query must be one of the **11 phrases in criterion B**, not a brand or navigational string |
| **28 days** | **Bing** | **At least 4 named queries and at least 15 impressions**, of which **at least 2 queries come from criterion B**, and **at least 1 from idea family A** (`healthcare accountants` / `healthcare accountants near me`), which is the head of the topic and the reason the page exists |
| **28 days** | **Bing, drift test** | **Total impressions rising while the criterion-B phrases stay missing is a FAIL, not a pass**, and is recorded as drift (§9.6 point 2). A page that surfaces only on brand or on city strings has either been mis-scoped or has cannibalised a sibling |
| **28 days** | **Both, cannibalisation** | **The six GSC rows in section 2c must not fall.** Specifically `gp practice accountants` (278 impressions, held by `/for-gps`) and `gp accountants` (1,309 impressions) are re-read at page level. **Any drop of more than 20% in either, with this page appearing on the same query, is a cannibalisation finding and triggers criterion E1 re-audit** |
| **90 days** | **Leads** | **The question is ANY attributed lead, not a rate.** At roughly one lead per 46 sessions, this page needs about **46 sessions to produce one lead**. One attributed lead in 90 days is the pass. **No lead target is set at 28 days**, because a new page on this domain will not have 46 sessions by then |
| **90 days** | **Google** | **No target is set, deliberately.** Record whether the URL is indexed and whether any query-level GSC row exists, either way. A miss is not a failure and must not be written up as one |

**`target_keywords` on `blog_optimizations`**, if the page is later registered, must be populated from the **11 criterion-B phrases**, not from whatever the page turns out to rank for. Per §9.6 rule 2 the verdict is read against phrase coverage, never against total traffic.

**Failure triggers, as numbers.** There is no equity to lose, so the standard revert formulation cannot fire. Three explicit triggers replace it:

- **Topic failure.** If at 28 days **zero** of the 11 criterion-B phrases appear in the Bing query set for this URL, record `impact_verdict = fail` on the assigned topic regardless of total impressions.
- **Cannibalisation.** If any of the six section-2c GSC rows drops more than 20% while this page appears on the same query, record `impact_verdict = cannibalised`. **The remedy is to narrow this page under criterion E1, never to narrow the existing page**, which has the equity.
- **Correctness revert.** If any figure fails re-verification at source after deploy, or any criterion-E string is found live, **delete the file** rather than patching in place. There is exactly one file and deletion is the whole revert.

**No monitor is created by this pack.** Reading the tracker is a pull. Registration in `monitored_pages` is a separate owner-triggered step and has not been done.

---

## Corrections to the dossier, the index and the language spec

Stated, not silently harmonised.

**C1. `language_spec` Part 4 point 5 misstates accountants4nhsdoctors, and it is not the longest peer page.** The spec records "roughly 2,850 words with 38 headings". Re-read 2026-08-26: **approximately 2,500 words, roughly 20 headings**, and four pages in the thirty-page set are longer. **The load-bearing half of the finding survives and is now much better evidenced**: the page carries no named staff, no credentials and no photos, and holds a Google top-4 position. Faceless works here. Recommend the spec's word and heading figures be corrected; its L3 conclusion is unaffected.

**C2. One of the eleven city pages has an inverted slug.** The corpus has ten files on the `gp-accountant-<city>` pattern and one on the reverse pattern, `nottingham-gp-accountant.md`. Every internal linking convention, every lane token match and every future "list the city pages" glob that assumes the `gp-accountant-*` prefix will silently miss Nottingham. **Not fixed here** (nothing under `Medical/web/` was touched) and **not a redirect candidate** (§5 of the working agreement, never collapse or redirect). Recorded so the next pass that touches the city set sees it.

**C3. The city surface count is not twelve.** The brief and dossier §9 both say "twelve `gp-accountant-<city>` pages". The corpus has **eleven** city blog pages. Separately, `/locations/[slug]` renders **five** cities only (london, manchester, birmingham, leeds, bristol, from `Medical/niche.config.json`), so six of the eleven city blog pages have **no location-hub parent** and the `/locations` hub links to five cities the blog covers eleven of. **Total city surfaces are 16, distributed across two namespaces that do not agree with each other.** That is a real coverage inconsistency and it is a separate workstream, not this page's problem. This page's only obligation is criterion E1: touch none of it.

**C4. The dossier's WIDE keyword count for this cluster is not reproducible by regex, though its volume is.** Dossier §4 row 1 gives **67 keywords / 10,110 volume / 5,110 peer-winnable**. The nearest documentable regex reconstruction gives **49 keywords / 10,080 volume / 4,940 peer-winnable**: volume within 0.3%, peer-winnable within 3.3%, **keyword count out by 18**. The cause is the seed-node clustering that BATCH2_INDEX §9 limitation 1 already records as not being in the repo. **The volumes are sound and the count should be read as approximate.** Recommend the dossier state its per-topic `Kws` column as method-dependent.

**C5. The brief's teardown list was four URLs short, and two of the four are third-party directory profiles of a competitor.** `practiceindex.co.uk/gp/bw-medical-accountants-ltd` (3 keywords, position 5) and `medicsmoney.co.uk/accountant/bw-medical-accountants-ltd/` (3 keywords, position 4) are listings **about** BW Medical on someone else's domain, and both outrank most firms' own service pages. Plus `johnstoncarmichael.com/industry-experience/healthcare` without a trailing slash, a second live URL for the same page ranking better than the canonical version, and `aisma.org.uk/accountants/mha-nottingham/`. **The finding this produces is section 4c point 4 and it changes the read of the cluster: the top of this SERP is a directory layer, not a firm layer.** That is not visible from any nine-page or thirty-URL sample that excludes listings, and it is why the brief's list needed re-derivation rather than acceptance.

**C6. `competitor_universe` §1's head-term impressions are query-level and cannot be attributed to a page without a fresh pull.** Section 2c names the likely holder of each row and marks five of six as **not established**. The dossier and the universe report both use those figures as if page attribution were known. **It is not.** Criterion A makes the `['page','query']` pull a deploy precondition, which is the cheapest possible fix and closes the largest evidential gap in this pack.

---

*Pack built 2026-08-26. No file under `Medical/web/` was modified. No commit, no deploy, no `monitored_pages` write, no monitor, alert, cron or notification created. No paid API call was made.*
