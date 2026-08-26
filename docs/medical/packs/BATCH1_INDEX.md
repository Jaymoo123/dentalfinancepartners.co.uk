# Medical corpus rewrite, batch 1 research packs

**Built:** 2026-08-26 · **Spec:** `docs/_engines/REWRITE_PROGRAM.md` §9.5 (eight sections, fixed order) · **Frozen input:** `docs/medical/cluster_dossier_2026-08-26.md`
**Status:** preparation only. No page content was written. Nothing under `Medical/web/` was edited. Nothing committed, deployed or indexed. No row written to `monitored_pages`. No monitor, alert or scheduled job created. No new DataForSEO calls, so **$0.00 additional spend**.

Repo state at build time: `git rev-parse HEAD` = `b3d78c97e768645cca480dd350281ffa68c1faf9`.

---

## 1. The batch

12 pages. Two EXTEND, ten REFRAME.

| # | Page | Grade | Renders from | Bing equity (90d) | Google equity (90d) | Topic kws | Missing on page | Pack |
|---|---|---|---|---|---|---|---|---|
| 1 | `/blog/gp-practice-income-pcse-statement-reconciliation` | **EXTEND** | markdown | 17c / 261i page level, 64 named queries | 0 | 13 | 12 | `PACK_blog__gp-practice-income-pcse-statement-reconciliation.md` |
| 2 | `/blog/qof-income-gp-practice-accounting-explained` | **EXTEND** | markdown | 12c / 59i page level, 29 named queries | 0 | 31 | 31 | `PACK_blog__qof-income-gp-practice-accounting-explained.md` |
| 3 | `/calculators/nhs-pension-scheme-pays` | REFRAME | TS tool config | 1c / 10i page level | 0 | 121 | 116 | `PACK_calculators__nhs-pension-scheme-pays.md` |
| 4 | `/blog/mccloud-remedy-nhs-pension-doctors-explained` | REFRAME | markdown | 0c / 2i | 0 | 41 | 38 | `PACK_blog__mccloud-remedy-nhs-pension-doctors-explained.md` |
| 5 | `/blog/nhs-pension-tax-charges-how-to-minimize` | REFRAME | markdown | 2c / 18i page level | 0 | 41 | 41 | `PACK_blog__nhs-pension-tax-charges-how-to-minimize.md` |
| 6 | `/blog/gp-practice-private-non-nhs-income-streams` | REFRAME | markdown | 0 | 0 | 38 | 38 | `PACK_blog__gp-practice-private-non-nhs-income-streams.md` |
| 7 | `/nhs-pension` | REFRAME | **TSX route component** | 0 | 0 | 54 | 54 | `PACK_nhs-pension.md` |
| 8 | `/medical-guides/nhs-pension-annual-allowance` | REFRAME | **TS data entry** | 1c / 3i | 0 | 42 | 42 | `PACK_medical-guides__nhs-pension-annual-allowance.md` |
| 9 | `/research/annual-allowance-pension-tax-index` | REFRAME | **TSX route component** | 0 | 0c / 7i pos 10.6 (page dim) | 64 | 64 | `PACK_research__annual-allowance-pension-tax-index.md` |
| 10 | `/calculators/nhs-pension-annual-allowance` | REFRAME | **TS tool config** | 0c / 13i | 0 | 52 | 43 | `PACK_calculators__nhs-pension-annual-allowance.md` |
| 11 | `/blog/nhs-pension-partial-retirement-doctors-guide` | REFRAME | markdown | 0c / 2i | 0 | 37 | 36 | `PACK_blog__nhs-pension-partial-retirement-doctors-guide.md` |
| 12 | `/blog/nhs-pension-planning` | REFRAME | **TSX pillar hub** | 0c / 4i | 0 | 13 | 13 | `PACK_blog__nhs-pension-planning.md` |

**Six of the twelve are not markdown.** A writer given a slug and a `content/blog/*.md` glob will not find them. Each pack states the source file and the rendering path in section 1.

Provenance for the equity columns:
- Google: GSC API `searchanalytics.query`, dimensions `['page','query']` and `['page']`, window 2026-05-28 to 2026-08-26, script `equity_pull.py` (session scratchpad).
- Bing named queries: `GetPageQueryStats(siteUrl, page)` per URL, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`.
- Bing page level: `GetPageStats`, `bing_query_stats` pull dated 2026-08-23, `medical_stage0/bing_page_stats.json`.
- Topic keyword sets: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 persisted rows, 27 domains, no volume floor. Selection regex per topic is printed inside each pack's section 3.

---

## 2. Why these twelve

1. **The two EXTEND pages the dossier calls the sharpest opportunities.** `/blog/gp-practice-income-pcse-statement-reconciliation` (17 Bing clicks, 261 page-level impressions, zero Google) and `/blog/qof-income-gp-practice-accounting-explained` (12 Bing clicks) both earn real money on Bing while containing none of the words their own topic is searched with. That is the cleanest possible test of the §9 thesis: proven demand, proven page, missing vocabulary, additive-only change, fast Bing read.
2. **Every REFRAME topic the dossier graded.** Ten of the sixteen assigned topics grade REFRAME, meaning a full rewrite is permitted because there is almost no equity to lose. Taking all ten in one batch fills the plain-language layer across the NHS-pension family in a single window, which is where 30 of the map's 48 consensus topics sit.
3. **The third EXTEND page is not here.** `/blog/nhs-pension-scheme-pays-doctors-deadlines` grades EXTEND and holds the second-highest-confidence topic on the map, but its `monitored_pages` row is `status='flagged'`. See section 3.

---

## 3. Excluded, and why

**Frozen: 16 pages inside armed measurement windows to 2026-09-10.** Re-derived live, not copied from the dossier:

```sql
select slug, status, rewrite_date, monitor_until, rewrite_type
from monitored_pages
where site_key='medical' and lower(status)='active' and monitor_until > now();
-- 16 rows, all rewrite_date 2026-06-12, monitor_until 2026-09-10, rewrite_type 'rewrite'
-- run 2026-08-26 via scripts/_q.py
```

becoming-gp-partner-financial-implications · buying-into-gp-partnership-capital-parity-explained · gp-limited-company-tax-benefits-drawbacks · gp-partner-vs-salaried-gp-tax-comparison · gp-partnership-mutual-assessment-period-what-to-check · gp-partnership-tax-complete-guide · gp-payroll-services · gp-pension-contributions-tax-relief · gp-tax-deductions-complete-list-2026 · gp-vat-registration · locum-doctor-self-assessment-filing-guide · locum-doctor-tax-complete-guide · medical-professional-expenses-what-is-claimable · nhs-pension-annual-allowance-complete-guide · nhs-pension-for-locums-form-a-form-b · nhs-pension-tapered-annual-allowance-calculator

Three of these took a topic in the dossier's assignment (`nhs-pension-tapered-annual-allowance-calculator`, `nhs-pension-for-locums-form-a-form-b`, `nhs-pension-annual-allowance-complete-guide`) and are therefore absent from batch 1 by rule, not by choice.

**HOLD: 3 pages with `status='flagged'`.** The active-status test does not catch them, so they are named here rather than passing silently into or out of the batch:

| Slug | monitor_until | Why it is a HOLD |
|---|---|---|
| `nhs-pension-scheme-pays-doctors-deadlines` | 2026-09-10 | Grades EXTEND on the second-highest-confidence topic in the map (5 domains, 172,620 volume, 71 of 78 phrasings missing) and carries the batch's largest single prize. A flagged monitor is a question, not a clearance. **Resolve the flag before working it, then treat it as batch 2 item 1.** |
| `gp-accounting-guide` | 2026-09-10 | 4 Google clicks / 151 impressions at position 13.9. Real equity, unresolved flag. |
| `__home` | 2026-10-06 | Homepage, `rewrite_type='net_new'`, and already rewritten in the 2026-08-26 corepage pass. Out of scope for the rewrite program regardless. |

Query that finds them, which the frozen test misses:
```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and lower(status) <> 'active';
-- 3 rows
```

**Not excluded and worth stating:** `/calculators/nhs-pension-scheme-pays` (batch item 3) ties on nine consensus topics with the held `nhs-pension-scheme-pays-doctors-deadlines`. Its pack tells the writer to differentiate towards tool intent and names the phrasings it must leave for the sibling. Per the working agreement neither is ever collapsed.

---

## 4. Cross-page contention inside this batch

Three of the twelve contest the annual-allowance family and two more contest the NHS-pension hub layer. The packs partition the vocabulary explicitly so attribution survives:

| Page | Owns | Must not take |
|---|---|---|
| `/calculators/nhs-pension-annual-allowance` | mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA, year-tagged AA table | year-tagged lifetime-allowance vocabulary |
| `/research/annual-allowance-pension-tax-index` | scale and history: historic LTA, LSA and LSDBA, protections, abatement, HMRC and NHSBSA series | year-tagged `pension annual allowance` |
| `/medical-guides/nhs-pension-annual-allowance` | scheme explanation: the `nhs pension calculator` family, 1995 / 2008 / 2015 accrual, increase, uplift, CPI | Scheme Pays mechanics |
| `/blog/nhs-pension-annual-allowance-complete-guide` | the worked case | **FROZEN to 2026-09-10, not in this batch** |
| `/nhs-pension` | AVCs, Additional Pension, ill health, deferred benefits, dependants, contact vocabulary | annual-allowance depth |
| `/blog/nhs-pension-planning` | "how does the NHS pension work" primer altitude | tax-charge depth owned by four other pages |

Per §9.3, one change per page per window. Nothing in this batch stacks a reframe and an internal-link change on the same page.

---

## 5. Batch-level expectation

Written before the work, so the later read has something to fail.

**Primary, Bing, 14 to 28 days after deploy.** Bing indexes this corpus fully and out-clicks Google 3.4x on this site. The test is **phrase coverage, not total traffic** (§9.6): impressions must appear on the named missing phrasings in each pack's section 7. Target across the batch: at least **8 of the 12 pages** register at least one impression on a phrase that was absent before, and the two EXTEND pages each register impressions on at least **half** their named missing phrasings (7 of 13 for PCSE, 16 of 31 for QOF).

**Secondary, Bing clicks, 28 days.** Combined Bing clicks across the 12 URLs are **33** in the 90 days to 2026-08-23 (`GetPageStats`, `medical_stage0/bing_page_stats.json`, summed over the twelve URLs). Expectation: **>= 45** in a 28-day window by 2026-10-08. That is a rising number on a low base and should be read as directional, not as a hard gate.

**Google, 28 to 90 days.** Google indexes roughly 16% of this corpus, so no Google expectation is set on the ten REFRAME pages. The single Google test in this batch is `/research/annual-allowance-pension-tax-index`, which holds 7 impressions at average position 10.6 and must **not** lose them.

**Batch failure trigger.** If, at the 28-day read, combined Bing clicks across the 12 URLs are **below 25** (a 25% fall from the 33 baseline) or the two EXTEND pages have lost more than **20% of their combined 29 Bing clicks**, revert the batch. Revert path per page is a single `git checkout <pre-batch sha> -- <source file>`, named in section 1 of each pack.

**Total traffic rising while the missing phrase lists stay missing is a FAIL, not a pass** (§9.6 point 2). Record it as drift.

**No monitor is created by this document.** Reading the tracker is a pull. `blog_optimizations.target_keywords` must be populated with each page's MISSING phrases, not with what it already ranked for, at the time the work is registered, and that registration is a separate owner-triggered step.

---

## 6. Known limitations of these packs

1. **The topic keyword sets in section 3 were rebuilt locally**, by term-family regex over the persisted 32,872-row harvest, not by re-running the dossier's seed-node clustering (that script was scratch and is not in the repo). The regex is printed in every pack. Counts therefore differ from the dossier's per-topic `Kws` column, in both directions, on every page. The dossier's counts are a floor, the pack's are a page-level superset. This is a stated divergence, not a silent one.
2. **Peer-winnable is Google-derived** (DataForSEO positions are Google). Per owner decision 21 it orders the work and excludes nothing.
3. **Seven competitor URLs returned HTTP 403** across the twelve teardowns and are recorded inside their packs as flagged gaps with the status code, never dropped. The material one is `pricebailey.co.uk/blog/vat-and-doctors/`, which holds every addressable row for `/blog/gp-practice-private-non-nhs-income-streams`. A human opening that page and appending its headings is the cheapest single improvement to this batch.
4. **Section 2 shows no named Google queries on any of the twelve.** GSC anonymises low-volume queries; page-level Google impressions are non-zero on `/research/annual-allowance-pension-tax-index` and must still be protected. Absence of query rows is not absence of equity.
5. **Three UNVERIFIED figures are banned from every page in this batch**: the GMC annual retention fee, the Global Sum per weighted patient, and the QOF point value. Each pack carries the ban as a countable acceptance criterion with the "confirm the current figure at source" framing.
