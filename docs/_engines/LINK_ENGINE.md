# Link Engine: Reusable Engine

> **This is the SITE-AGNOSTIC engine.** It is true for any niche site (property, medical, dentists, solicitors, generalist, contractors-ir35). To run it on a new site you reuse this doc **verbatim** plus the code in `scripts/link_engine/` and fill one small per-site config (see section 7). Property figures are labelled `(example, Property)` and illustrate a mechanism; the RULE itself is always stated site-neutrally.
>
> **Engine vs state:** this doc holds the method, formulas, data rules, spend policy and incident log. A site's counts, rulings and run outputs live under `docs/<site>/link_engine/<run>/` and in the site's STATE doc, never here. **Code is the truth for Half A:** where this doc and a script's docstring disagree, the script wins and this doc is wrong.

---

## 1. Purpose and where it plugs in

The link engine turns search demand into a ranked map: which commercial searches are worth money, which page should own each, and how winnable each is against a named competitor.
Code computes every number; the model judges only against a written rubric; every verdict is a file; gates block anything unverified.
It does not rewrite pages and does not touch other websites' links. It names the page; the writers and the owner act.

**Where it plugs in** (items 1 to 5 are Half B, designed but not yet built; the Half A outputs they read exist today):

1. **Writers read it.** Two saved lists: `page -> family` (which family each page feeds) and the owner lists (which page owns which family). The blog writer and the rewrite writer (`track2_rewrite_writer.wf.js`) and the net-new wave prep read both, so a new post is drafted already linking to its money page with an approved wording.
2. **Predeploy gate.** A free, deterministic `predeploy_gate.py --links` check (no API calls, runs only when the owner deploys; not CI, not an email). It blocks hire wording pointed at the wrong page, new orphans or broken links, and a money page dropped below its link budget. A gate warning (not an email) shows when the demand map is more than 90 days old.
3. **Before/after measurement.** Every run records what it expects to move. The next run re-pulls GSC and leads by entry page, and `wp1_read.py` (the day-14 and week-4 reads) scores what actually moved.
4. **Gaps feed `run-wave`.** A family with owner `GAP: new page needed` is a candidate topic for the net-new programme, ranked by priority.
5. **Rulings are precedent.** Every owner decision is saved to `scripts/link_engine/sites/<site>_rulings.md`. The rubric tells every reader to read it first, so a question answered once is never asked twice and judgments do not drift between runs.

Rhythm: demand map quarterly (volumes are monthly averages and barely move); link audit on every deploy via item 2. No scheduled job, monitor or reminder is created by this engine.

---

## 2. Run order

Every stage is one script taking `--site <key> --run <YYYY-MM-DD>`. Run from the repo root. Outputs go to `docs/<site>/link_engine/<run>/` (`inputs/`, `stages/`, `judgments/`, `dfs_spend_ledger.csv`). Setup once per sandbox: `pip install -r requirements.txt` (needs `google-api-python-client`, `google-auth`, `httpx`). Env: `GSC_SERVICE_ACCOUNT_JSON`, `BING_WEBMASTER_API_KEY`, `DATAFORSEO_API_LOGIN`, `DATAFORSEO_API_PASSWORD`.

### Half A: the demand map (built, runs today)

| # | Command | Cost | Writes |
|---|---|---|---|
| 1 | `python scripts/link_engine/gsc_pull.py --site S --run R` | free | `03_gsc_query_page`, `03_gsc_page`, `03_bing_query`, `03_bing_page` |
| 2 | `python scripts/link_engine/universe.py --site S --run R` | free | `01_universe` |
| 3 | `python scripts/link_engine/metrics.py --site S --run R --dry-run` | free | nothing (prints count, estimate, DFS balance) |
| 4 | `python scripts/link_engine/metrics.py --site S --run R` | about $0.14 | `02_metrics`, `02_metrics_rejects` |
| 5 | `python scripts/link_engine/serp.py --site S --run R --from-metrics --min-volume 10 --limit N --dry-run` | free | nothing |
| 6 | same command without `--dry-run` | $0.002 per keyword | `04_serp`, `04_serp_summary`, `04_serp_skipped` |
| 7 | `python scripts/link_engine/cluster.py --site S --run R` | free | `05_clusters`, `05_cluster_conflicts` |
| 8 | `python scripts/link_engine/families.py --site S --run R` | free | `06_families`, `06_owner_queue`, `06_owner_rollup` |
| 9 | leads SQL via the Supabase connector (below) | free | `inputs/leads_by_entry_page.csv` |
| 10 | judgment readers (section 6) | agent time | `judgments/*.jsonl` |
| 11 | `python scripts/link_engine/apply_judgments.py --site S --run R` | free | rewrites `06_families`, `06_owner_rollup` |

Notes on order and re-runs:

- **gsc_pull before universe.** `universe.py` reads `03_gsc_query_page.csv`; without it the script prints a note and runs without fresh GSC queries.
- **universe needs `inputs/dfs_cache_commercial.csv`** (the site's cached `dataforseo_keyword_data` rows, exported through the Supabase connector with a DB md5). It refuses to run without it (`--wait-minutes N` polls for it). It never fabricates the file.
- **Always dry-run before paying.** `metrics.py` refuses (exit 2) if its estimate exceeds `--max-estimate` (default $1.00). `serp.py` keeps the top N keywords by volume x CPC that fit under `--max-estimate` and logs the rest to `04_serp_skipped.csv`.
- **Step 9 (leads) must exist before step 8.** `families.py` reads `inputs/leads_by_entry_page.csv`. Run `scripts/link_engine/sql/leads_by_entry_page.sql` through the Supabase connector with `:site`, `:from` and `:to_excl` replaced (90 days to the day before the run). The query returns one CSV string plus its md5. Save the body as the CSV (header `entry_path,leads,scored,est_value_gbp,high_tier,i_incorporation,i_structure,i_cgt,i_sdlt,i_compliance,i_nrl_expat,i_other,i_unscored`), recompute the md5 of the body lines joined by `\n` (no header, no trailing newline), and record both `body_md5_db` and `body_md5_file` in the sidecar. They must be equal. The SQL selects aggregates only: never names, emails, phones, messages, `rationale`, `intent_line`, `extras`, `visitor_id` or `session_id` (the last is used in the join only). Save the SQL and the result together.
- **Judgment loop.** Conflict verdicts (`merge`/`split`) change clustering, so after they land, re-run `cluster.py` then `families.py` (which regenerates `06_families.csv` from scratch), then take owner verdicts, then `apply_judgments.py`. `apply_judgments.py` is re-runnable.
- **Every stage is deterministic**: same inputs, same output (ties break on volume desc, then text).

### Half B: the link work (designed, NOT yet built)

Starts only after the owner approves the Half A demand map (`DEMAND_MAP.md` plus `06_families.csv`). Stages 07 to 17 from the approved plan; none of these scripts exist yet:

| # | Script | Job |
|---|---|---|
| 07 | `build.py` | `npm ci` and a build with the font mock; record the SHA built and route count |
| 08 | `graph_html.py` | parse built HTML into edges (source, target, anchor, region); resolve through the middleware maps |
| 09 | `graph_source.py` | independent source-level count (blog `.md`, `audiences.ts`, location template, static pages); gate: body-link counts per target must equal 08 exactly or every difference is explained |
| 10 | `assign.py` | assign each indexable page to one family (GSC-query match, auto at top-family share 0.6 or more, else judged against `rubrics/page_family.md`, cached by page sha256) |
| 11 | `budget.py` | link budget per family in proportion to priority, floored and capped at available source pages; source value = topical fit x log authority |
| 12 | `gaps.py` | missing links from strong sources, hire anchors at the wrong page, pages competing with the owner, orphans, broken links; frozen and give-up pages flagged for owner sign-off, never auto-included |
| 13 | `sentences` (judgment) | link sentences under blueprint 5.1; deterministic checker: one link per source per owner page, exact-match anchors at most one third, not in the first paragraph or last line, no em-dashes, no repeated sentence |
| 14 | `verify.py` | after approved edits: rebuild, re-run 08 and 09, diff against the plan |
| 15 | `pack.py` | owner pack ranked by commercial priority, plus the expected-movement record for the next run to score |
| 16 | `gate_check.py` | the free check called from `predeploy_gate.py --links` |
| 17 | `selftest.py` | fixed fixture of known pages and counts; must pass before any run |

---

## 3. Data rules

1. **Fresh GSC API only.** `gsc_pull.py` calls the Search Console API with `dataState=final`, paginated by `startRow` (25,000 rows a page). It never reads Supabase `gsc_query_data`. Service account scope is `webmasters.readonly`.
2. **Window = 90 days ending run date minus 3** (GSC final-data lag). A run on 2026-10-10 reads 2026-07-10 to 2026-10-07. The window and data-through date are in every GSC sidecar.
3. **Query-level rows are privacy-thresholded.** Google drops rare queries from the `query,page` dimension, so those sums sit far below the page-level totals. (Example, Property, run 2026-10-10: 196 of 3,601 clicks visible at query level, and 93,645 of 382,443 impressions.) Both sets of totals are in the sidecars. Therefore **family impressions and clicks are a floor, never a total**, and thin GSC at query level is a data limit, not evidence of no demand.
4. **Bing is a weekly top-100 sample.** `GetQueryStats` and `GetPageStats` return weekly rows over Bing's own date range (Property run: 2026-05-22 to 2026-10-02, 2,000 query rows). It is a second view, not a total, and its window differs from GSC's.
5. **Every output has a `.meta.json` sidecar** written by `common.write_csv`: `pulled_at`, source, site, `data_through`, script and args, `rows`, `sha256`, plus stage-specific fields (window, privacy totals, DFS balance before and after, run spend).
6. **Connector-exported inputs carry a DB md5 that the file must reproduce.** The Supabase connector returns the CSV as a string with an md5 computed in the database; the saved file's md5 is recomputed and both go in the sidecar. A mismatch means the file is not the query result and must not be used. Example (Property leads): 75 entry paths, 206 leads, GBP 83,800 estimated value, `body_md5_db` equals `body_md5_file`. Test leads (`is_test`) are excluded and the exclusion is noted in the sidecar.
7. **Absence of data is a question, not a finding.** A blank is "not measured" until a source says "measured zero". Say which.

---

## 4. DataForSEO spend policy

1. **Commercial filter before any paid call.** Only `hire` and `decision` keywords (section 5.1) are priced. Informational, career, software, brand and non-UK queries are never sent. The filter is free and deterministic.
2. **Single-source metric policy.** Every volume and CPC in `02_metrics.csv` comes from one endpoint, `keywords_data/google_ads/search_volume/live` (UK location 2826, language `en`), one date. Cached rows, QRY_C and `keyword_ideas` values are kept only as reference columns (`prior_volume`, `prior_cpc`, `prior_source`, `prior_date`) and never rank anything.
   *Evidence:* CPCs from different endpoints are not comparable. "property tax accountant" showed CPC 14.76 in QRY_C (2026-10-07) and 7.99 in the August `keyword_suggestions` cache, nearly a factor of two on the same phrase. Mixing sources would have ranked families on endpoint noise.
3. **Persistent per-keyword store (source of truth).** Paid DataForSEO data lives in `docs/_engines/link_engine_store/`, committed and append-only, shared by every site (Google Ads volume and CPC for a UK keyword are the same whichever site asks):
   - `keyword_metrics.csv`: one row per keyword per fetch (`keyword, location_code, language_code, search_volume, cpc, competition, competition_index, monthly_searches` (last 12, JSON), `endpoint, fetched_on, source_response_sha256`). Readers take the latest row. Only rows from `google_ads/search_volume/live` ever serve a lookup; rows with endpoint `legacy_supabase_cache` are reference only, so ranking stays single-source.
   - `serp/<yyyy-mm>/<sha1(keyword|location|device)>.json.gz` plus `serp_index.csv`: the raw SERP response per keyword.
   - `keyword_ideas/<sha1(sorted seeds, location, language, limit)>.json.gz` plus `keyword_ideas_index.csv`: discovery for a seed set is never bought twice.
   **The rule is per keyword.** `common.dfs_post` looks each keyword up in the store first (`store_lookup(keywords, max_age_days=90)` returns `(have, need)`), sends only `need` to the API, and a changed or extra keyword costs only that keyword (a `search_volume` call still bills about $0.09 flat, so batch new keywords together). **Append first, process later:** the paid response is written to the store before any caller touches it, so a crash cannot lose paid data. Store hits are logged to the ledger as `cache_hit=True` at cost 0. **Commit the store with each run**: the container's `.cache/link_engine/dfs/` is gitignored and dies with the session; it stays only as a fast local mirror, and the store is the source of truth. `store_backfill.py` rebuilds the store from an archived raw-response tarball (`<run>/raw/`) with no API calls; `metrics.py --selftest` and `serp.py --selftest` prove that one new keyword prices exactly one keyword. Optional future step, not done: mirror the store into Supabase `dataforseo_keyword_data` (cloud sessions have no REST keys, so it needs a laptop session).
4. **Ledger.** Every call, hit or miss, appends to `<run>/dfs_spend_ledger.csv` (`ts, endpoint, n_items, cost_usd, cache_hit`). Reconcile it against the account balance before and after (`dfs_balance()` is free; both balances go in the `02` and `04` sidecars).
5. **Hard stop $5.00 per run** (`RUN_CAP_USD`). `dfs_post` refuses with `SpendCapError` before a call that would push run spend past it. The per-stage `--max-estimate` (default $1.00) is a tighter guard.
6. **Rate card as observed.** `search_volume/live` bills about **$0.09 flat per call** (416 keywords and 591 keywords both billed $0.09), up to 1,000 keywords per call, so batch to the maximum. `estimate_cost` uses $0.075 + $0.0001 per keyword (conservative). `keyword_ideas/live` was $0.048 for one call (limit 300). Organic SERP is **$0.002 per keyword** at depth 10.
7. **Discovery runs once.** `keyword_ideas` is called once for all seeds and is cached; its results only add unseen commercial variants to the price list.
8. **This run's total (Property, 2026-10-10): $1.14** per `dfs_spend_ledger.csv` (802 rows, 387 cache hits at $0): `search_volume` $0.27 (two calls), `keyword_ideas` $0.048, SERP $0.822 (411 paid keywords). Expected cost for a first run on a new site is a few dollars; a quarterly refresh is about $0.50 because the cache covers repeat keywords.
9. **CPC currency is USD by DataForSEO convention, unverified.** The response carries no currency field and the docs page could not be read from the sandbox. The column says `USD (DataForSEO convention, unverified)`. Value figures (`value_usd_month`, `priority`) are **relative signals for ranking families against each other, not pounds**.
10. **Free sources** (GSC, Bing, the leads query, the cache export) are re-pulled fresh each run and cost nothing.

---

## 5. Formulas, exactly as coded

### 5.1 Commercial classifier (`universe.py`, `RULES`, first match wins)

Queries are normalised with `norm_query` (lowercase, punctuation to space except hyphen, collapsed spaces). The universe keeps **all** candidates, with `intent_class` (`hire`, `decision`, `excluded`) and an `excluded_reason`. Sources: seeds, the cached DFS export, the prior universe (QRY_C), the prior assignment (WP1) and fresh GSC queries.

| # | Rule | Test | Result |
|---|---|---|---|
| 1 | `seed_hire` / `seed_decision` | an owner seed AND a property-context word (`ctx_hit`) | hire / decision (a seed with no property-context word is not forced) |
| 2 | `site_operator` | raw text contains `site:` | excluded |
| 3 | `brand` | site brand terms or competitor brands from config | excluded (navigational) |
| 4 | `career` | jobs, careers, salary, vacancies, apprentice, courses, training, qualifications, "become a" | excluded |
| 5 | `software` | software, app(s), platform, spreadsheet(s) | excluded |
| 5b | `borrower_intent` | mortgage, remortgage, loan, lender, broker, bridging, equity release, unless an accountant/adviser word is present | excluded |
| 6 | `non_uk_geo` | USA, Australia, Canada, India, Dubai, Ireland and similar (northern ireland is UK; "ireland" allowed beside "non resident") | excluded |
| 7 | `calculator_rates_forms` | calculator, rate(s), form(s), deadline, login, template, pdf, checklist, threshold, allowance | excluded (blog engine owns these) |
| 8 | `gov_navigational` | gov uk; hmrc with phone/contact/number/helpline/email/address | excluded |
| 9 | `reference` | "what is/are/does", "how does/do ... work", "when is/do/can", "explained", "rules" (at end), "meaning", "definition", "can i" (unless afford/claim/cost) | excluded |
| 10 | `hire_provider_context` | provider word (accountant, accountancy, accounting firm/service, tax adviser/advice/specialist/consultant/expert/planning) AND a property-context word | hire |
| 10b | `no_property_context` | provider word + only a tax-topic word (cgt, inheritance, sdlt, non resident...), no property-context word | excluded |
| 11 | `decision_topic` | a decision-topic rule matches AND a property-context word exists OUTSIDE every topic-word span | decision |
| 12 | `not_commercial` | everything else | excluded |

- **Property-context words** (`DECISION_CONTEXT`): property/properties, landlord(s), buy to let, btl, rental, rent, let, letting(s), hmo, holiday let(s), spv, portfolio, house, flat, real estate. "home" counts only beside a sell/gift/inherit/iht topic word.
- **Decision-topic rules:** incorporation; transfer + (limited company or ltd); sell/selling/sale + tax; gift; inherit; iht; non resident; nrl; expat; (sdlt or stamp duty) + (transfer, multiple dwellings or mdr); restructure; partnership; family investment company; trust.
- **Separate-word rule (incident, section 9):** bare "inheritance tax" does not qualify, because "inherit" is itself the topic span and a context word must lie outside it.
- **City:** `geo_of` returns the first city (longest first) from the site's list; "reading" counts as a city only beside an accountant/tax word or after "in".

### 5.2 Close-variant dedupe (`cluster.py`, `families.py`)

Google Ads returns **one grouped volume** for close variants (word order, plurals, stems), and each variant row repeats that figure. A close-variant group is the set of keywords sharing the same `(lexical key, volume, cpc)`. A family counts each group **once**: `demand_volume` = sum over groups of the group volume; `value_usd_month` = sum over groups of volume x CPC. `demand_volume_raw` is the undeduped sum, kept for audit. `families.selftest()` asserts `demand_volume_raw - demand_volume` equals the repeated groups exactly, that `n_variant_groups` matches, and that "property accountant" and "accountant property" (equal volume) are counted once. A failed assertion aborts the run.

The same dedupe applies inside `cluster.py` when testing the 100-volume bridge threshold.

### 5.3 Clustering (`cluster.py`)

Only `hire` and `decision` rows of `02_metrics.csv` take part.

1. **Normalise:** lowercase; extract the city into its own field and remove it; singularise (accountants to accountant, landlords to landlord, properties to property, advisers/advisors to advisor, accountancy to accountant, and others in `SING`; hyphenated tokens such as "buy-to-let" are kept whole and are not merged with "buy to let"); strip "uk", "near me", "best"; strip "specialist" in any query containing "accountant"; strip "service(s)", "firm(s)", "company" only when they come after "accountant"; drop stopwords (`STOP` in cluster.py: for, to, of, in, on, into, a, an, the, and, with, my, me, i, we, do, near).
2. **Lexical key** = sorted unique content tokens after stemming: transfer*, gift*, incorporat*, inherit* collapse to one stem; selling/sale/sold to `sell`; house/home/flat to `home`; `ltd` to `limited company`; gains to gain; taxes to tax. Same key = same family. "property" stays separate from "home".
3. **SERP join:** two non-geo keywords whose top-10 URL sets share **4 or more** URLs (URL = host without `www` + path without trailing slash, query string dropped) join one family. Union-find, strongest link first. Only keywords with a pulled SERP take part.
4. **Bridge rule.** When a 4-or-more link would join two components that **each already have deduped volume of 100 or more**, the join is blocked if: (a) their dominant `intent_class` differs (`held by rule: intent_differs`); (b) both carry WP1 rulings and their dominant `owner_page` differs (`held by rule: wp1_owners_differ`); or (c) fewer than **6** URLs are shared (status `open`, goes to judgment). Two components with the **same** WP1 owner and 4 or more shared URLs merge whatever their size. Without this guard, transitive chaining fused 119 keywords into one family (section 9).
5. **Geo rule (blueprint R4).** A keyword with a city never joins a national family. It joins one city family per `(city, intent_class, hire type)`, where hire type is `landlord` (tokens landlord, buy, btl, rental, hmo, let, rent) or `property` (everything else). City keywords never take part in SERP joins.
6. **No-SERP keywords** (volume under 10 or an empty result) take part in step 2. If still alone they attach to the non-geo, same-`intent_class` family whose head has the highest token Jaccard of **0.6 or more** (`assigned_by = overlap`), else stay singletons.
7. **Head and id:** head = highest volume; ties break on most GSC impressions (so the variant people really type wins), then shorter, then alphabetical. `family_id` = slug of the head (suffix `-2` on collision). `assigned_by` per keyword is `lexical`, `serp`, `overlap` or `singleton`.
8. **Conflict queue** (`05_cluster_conflicts.csv`, columns `conflict_type, keyword, other_keyword, lexical_family, serp_family, shared_urls, volumes, via, status`): `serp_bridge` (above) and `lexical_serp_split` (same lexical key, SERPs share 2 or fewer URLs, and surface tokens differ by more than order, plurals, stems, stopwords, "uk" or "near me"; merged by default, the judge may split). Settled-by-rule rows are labelled `held by rule: ...`; judged rows read `resolved: ...`. Verdicts are keyed by `conflict_sha` (sha256 of `conflict_type, keyword, other_keyword, shared_urls`, volumes excluded because they move when families merge).

### 5.4 Winnability (`families.py`)

`winnability = pos_factor x (1 - 0.5 x hard_share)`, range 0.1 to 1.0.

`pos_factor` is decided on the family **head**:

| Situation | pos_factor | `pos_basis` |
|---|---|---|
| Head SERP pulled, we are in the top 10 | rank 10 or better: **1.0** | `serp_rank_N` |
| Head SERP pulled, we are absent, GSC head position 11 to 20 and head impressions >= 20 | 0.7 | `serp_absent;gsc_11-20` |
| Head SERP pulled, we are absent, GSC position 21 to 50 and impressions >= 20 | 0.4 | `serp_absent;gsc_21-50` |
| Head SERP pulled, we are absent, anything else (thin, none, over 50, or GSC says top 10) | 0.2 | `serp_absent;gsc_thin / no_gsc / gsc_over_50 / gsc_top10_ignored` |
| No SERP for head: GSC with impressions >= 20 | 10 or better 1.0; 11 to 20 0.7; 21 to 50 0.4; else 0.2 | `no_serp;gsc` |
| No SERP, GSC below the 20-impression floor or absent | 0.2 | `no_serp;gsc_thin / no_gsc` |

- **Never 1.0 from GSC when the live SERP shows us absent.** The live depth-10 SERP wins over a GSC average; a GSC top-10 position with an absent SERP is ignored (`gsc_top10_ignored`).
- **20-impression floor:** GSC head position counts only with 20 or more head impressions (the whole close-variant group of the head, impression-weighted).
- **hard_share** = share of the top 10 held by the site's `hard_domains` (gov.uk, directories, national brands, forums). Basis: the head's own `hard_share_top10` (`head`); else the median over the family's pulled keywords (`family_median`); else **0.3** (`default`).
- `confidence_note`: "thin data: volume under 50" when deduped demand is below 50; "no SERP for head" when none.
- Supporting columns: `yardstick_position` (the named competitor's rank on the head SERP), `gsc_pos_family_weighted` (impression-weighted mean of the best position per query), `our_top_page` (page with most family impressions, excluding noindexed pages and URLs the middleware 301s).

### 5.5 Priority, owner, commercial fit, leads

- **Priority** = `value_usd_month x winnability`. Families are ranked by priority desc, then demand desc, then id.
- **Owner basis order: WP1 ruling, then judgment, then GAP.**
  1. *WP1 ruling:* volume-weighted majority `owner_page` over the family's keywords in the prior assignment, ignoring `exclude`; "no page (city)" becomes `GAP: city page`. Basis `WP1 ruling`. These are binding and are never overwritten by `apply_judgments.py`.
  2. *Judgment:* a family with no WP1 row is blank, basis `needs judgment`, and joins `06_owner_queue.csv`. A verdict sets `owner_page`; basis becomes `judgment (high|medium)`, `judgment (low, 2 readers agree)`, `needs second reader`, or `OWNER DECISION NEEDED`.
  3. *GAP:* verdict `gap` sets `GAP: new page needed` and a one-line `gap_brief`.
- **commercial_fit** (required on every owner or gap verdict): `core_hire`, `paid_advice_decision`, or `informational_with_ad_spend` (high CPC but the searcher wants a fact or a calculation, for example "capital gains tax on home sale"). **Effect:** `informational_with_ad_spend` families stay in `06_families.csv` but get **no rank**, sort last, and drop out of `06_owner_rollup.csv` and the share-of-priority total (they stay with the blog engine). Readers must agree on it or the family is `OWNER DECISION NEEDED`.
- **Owner rollup** (`06_owner_rollup.csv`): per owner page, family count, demand, value, `priority_sum`, `share_of_priority` (of the total excluding the `needs judgment` bucket), the owner page's own entry-path leads, and top three family heads.
- **Lead join:** `leads_90d` and `lead_value_gbp_90d` are the leads whose `entry_path` equals `our_top_page` OR the `owner_page` (each distinct page counted once). A page shared by several families repeats on each, so **never sum the column**.
- **Lead cross-check flag (`lead_signal`)**, computed after ranking: `leads exceed demand` when `leads_90d >= 3` and rank is worse than 20; `demand without leads` when rank is 10 or better and `leads_90d == 0`; else blank. A flag is a question for the owner, not a verdict (lead intent is partial, section 8).

---

## 6. Judgment protocol

The model decides only two things: whether two families are one (cluster conflicts) and which page owns a family with no WP1 ruling. Everything else is code.

1. **Rubric:** `scripts/link_engine/rubrics/cluster_owner.md` (index in `rubrics/README.md`). Readers (Opus) read, in order: `scripts/link_engine/sites/<site>_rulings.md` if it exists (owner rulings beat everything), then the rubric, then only the facts in the input row. A missing fact lowers confidence; it is never invented.
2. **Inputs:** `stages/05_cluster_conflicts.csv` rows with status `open`, and `stages/06_owner_queue.csv` (top five candidate pages per family with title, title source and why chosen).
3. **Verdict schema** (one JSON object per line, appended to `judgments/<reader>_<batch>.jsonl`):

```json
{"family_id": "...", "decision": "owner | gap | merge | split",
 "commercial_fit": "core_hire | paid_advice_decision | informational_with_ad_spend | null",
 "owner_page": "/path or null", "gap_brief": "one line or null",
 "confidence": "high | medium | low", "reason": "one sentence",
 "input_sha256": "...", "reader": "A or B"}
```

4. **Cache key = `input_sha256`.** For owner and gap verdicts it is the queue row's own hash (`families.row_sha`: sha256 of the queue columns as sorted-key JSON, excluding the hash itself). For merge and split it is `cluster.conflict_sha(row)`. A changed row has a new hash and is re-judged; an unchanged row is never re-judged.
5. **Reader 2 only for low or medium confidence and conflicts.** One reader at high or medium confidence applies. A single low verdict waits (`needs second reader`). Reader B is a separate agent that does not see reader A's verdict. In `cluster.py`, a conflict verdict applies when one reader gave high or medium, or two or more agree.
6. **Disagreements go to the owner.** Two readers who differ on `(decision, owner_page, commercial_fit)` leave `owner_page` blank with basis `OWNER DECISION NEEDED` and both reasons in `judgment_reason`. Readers who agree apply at the lowest of their confidences.
7. **`apply_judgments.py` refuses, and lists, any verdict** whose family is not in the owner queue, whose `input_sha256` differs from the current queue row, whose queue row no longer hashes to its stored value, whose decision or confidence is invalid, or whose `commercial_fit` is missing. Nothing is guessed. Merge/split verdicts are counted but applied only by re-running `cluster.py`.
8. **Rulings as precedent.** A decision the owner makes on a disagreement is appended to `<site>_rulings.md` so it is read first next time. Blueprint rulings (Property: R2, R4, R15, R18, R22) are binding; if data disagrees with a ruling, follow the ruling and say so in `reason`.
9. Style for `reason`: one sentence, no em-dashes, no hedging.

---

## 7. Adding a new site

1. **Config:** create `scripts/link_engine/sites/<site>.json` with a `link_engine` block. `common.load_site` merges it with the repo's `sites/<site>.json`. Fields:
   - `gsc_property` (for example `sc-domain:example.co.uk`) and `bing_site` (with trailing slash)
   - `domain` (our domain, matched as a suffix in SERPs) and `yardstick_domain` (the named competitor to beat)
   - `money_pages` (paths of the commercial pages that should win)
   - `prior_assignment` and `prior_universe` (repo-relative paths to the prior query-to-page assignment CSV and the earlier universe CSV; may need columns `query`, `owner_page`, `monthly_volume`/`volume`, `cpc` as `universe.py` and `cluster.py` read them)
   - `brand_terms` (our brand and competitor brands, excluded as navigational)
   - `hard_domains` (domains counted toward `hard_share`: gov, trade bodies, directories, forums, national brands)
   - `cities` (city names; used for the geo rule and R4)
   - `seeds.hire` and `seeds.decision` (owner-chosen head terms; decision seeds are the paid-advice topics for that niche)
2. **Rulings file:** `scripts/link_engine/sites/<site>_rulings.md`, one numbered ruling per decision (rule, the pages it binds, date, who ruled). Start with the site's existing blueprint rulings. Property has none saved yet as a standalone file; the rubric currently carries R2, R4, R15, R18 and R22 inline.
3. **Site-specific code to check:** `families.routes()` reads `Property/web` (blog frontmatter, `src/app/services`, `audiences.ts`, `niche.config.json`, `middleware.ts` maps) and is Property-only today. A new site needs `WEB` and the route sources generalised before step 8 will run. The rubric's blueprint section is also Property text and must be rewritten for the new niche.
4. **Inputs:** the cached keyword export (`inputs/dfs_cache_commercial.csv`, connector, md5 recorded) and the leads CSV (SQL with `:site` replaced).
5. **Expected cost:** first run a few dollars (two `search_volume` calls near $0.09 each, one `keyword_ideas` call near $0.05, SERP at $0.002 per keyword for those with volume 10 or more; Property was $1.14 with a warm cache). Dry-run first, and the $5 hard stop applies regardless.
6. **Do not** start a second site until the first run's families have been spot-checked by hand against the SERP.

---

## 8. Known limits and open questions

Absence of data is a question, not a finding.

1. **Thin GSC at query level.** Privacy thresholding hides most of the volume (section 3). Family impressions are a floor, and `pos_factor` falls back to 0.2 whenever the head has under 20 visible impressions. Open: how much of the hidden mass belongs to commercial families.
2. **Depth-10 SERP cannot see ranks 11 to 50.** Absent from the top 10 is all we know. GSC position supplies 11 to 50 only above the 20-impression floor, so for most heads "absent" collapses to 0.2 without separating rank 11 from rank 80.
3. **CPC currency unverified** (USD by convention). Treat value as a ranking signal, not a revenue forecast.
4. **Lead intent is partial.** In the Property leads input, `intent` is null for 141 of 206 leads (the scorer did not set it), so the intent columns understate every class. Lead counts and `est_value_gbp` are usable; intent splits are not.
5. **Unexplained DataForSEO balance movement.** The account balance fell about $2.09 on 2026-10-10 with no engine spend (engine spend that day: $1.14, reconciled to the ledger, and the balances in the `02` and `04` sidecars move by only the engine's own calls). Another consumer of the account is the likely cause; it is not identified. Owner to confirm who else uses the account.
6. **Volumes are Google Ads grouped estimates**, rounded in broad bands for low-volume terms; variants share one figure (section 5.2).
7. **Winnability is a ranking heuristic**, not a probability. The factors (1.0, 0.7, 0.4, 0.2 and the 0.5 hard-share weight) are judgment calls written here so they can be challenged; changing them changes every priority.
8. **Half B is not built.** There is no link graph, budget, gap list or gate yet; this doc claims nothing about current internal-link counts.
9. **Homepage** is on the frozen list with no sign-off while blueprint R3 and R28 record one: treated as frozen for linking until the owner says otherwise.

---

## 9. Incident log

All dated 2026-10-10 (Property, first Half A run). Each is closed in code.

1. **Close-variant double count.** Google Ads returns one grouped volume for word-order and plural variants, and each variant row repeats it. Summing them inflated "property accountant" demand from 9,050 to a deduped 2,680. The 2026-10-09 WP1 query assignment carried the same inflation of about 3x: 8,700 vs about 2,630, 3,860 vs about 1,330, 1,160 vs about 730. *Fix:* group by `(lexical key, volume, cpc)` and count each group once (section 5.2); `families.selftest()` asserts it on every run. WP1 volumes are not to be reused as demand.
2. **Mixed-source CPC.** The universe mixed CPCs from QRY_C, the August `keyword_suggestions` cache and `keyword_ideas`; "property tax accountant" read 14.76 in QRY_C and 7.99 in the August cache. *Fix:* single-source policy, every volume and CPC from `google_ads/search_volume` on one date; other values are reference-only `prior_*` columns (section 4.2).
3. **Transitive SERP chaining.** Joining any two keywords sharing 4 or more top-10 URLs chained through head terms (landlord accountant, property tax advice, property accountant) and fused **119 keywords into one family**, against blueprint R2. *Fix:* the bridge rule (section 5.3.4): components of 100 volume or more are not joined when intent differs, WP1 owners differ, or fewer than 6 URLs are shared.
4. **Bare "inheritance tax" leaking into hire and decision.** Without a separate property-context word, "inheritance tax" and "inheritance estate tax" qualified as decision queries and dominated the first run. *Fix:* decision rows need a property-context word outside every topic-word span (section 5.1); "home" counts only beside sell/gift/inherit/iht.
