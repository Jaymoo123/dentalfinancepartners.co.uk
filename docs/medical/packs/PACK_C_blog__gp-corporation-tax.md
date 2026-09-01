# §9.5 RESEARCH PACK: /blog/gp-corporation-tax

**Batch 3, wave C (incorporation and company structures), PROFIT-EXTRACTION SET. This page is a SATELLITE
of the O34 hub, and it owns its own subject in full. GRADE = REFRAME.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (rules A to L, V1 to V9). Ground truth
`docs/medical/house_positions.md`. Batch index `docs/medical/packs/BATCH3_INDEX.md` (wave C section,
**D3 RULED 2026-09-01**, ownership map O1 to O36, §6.3 style watch, defects D1 to D18). Site state
`docs/medical/STATE.md`, **Stage 0 diagnosis 2026-09-01**. Peer set
`docs/medical/competitor_universe_2026-08-26.md` §2a plus the 17 domains re-classified as peers by the
D13 resolution (39 peers of 44 harvested). Format exemplar
`docs/medical/packs/PACK_B3_blog__how-gms-funding-works-global-sum-carr-hill-explained.md`.

**Sibling packs, written together with this one for coherence:**
`PACK_C_blog__salary-vs-dividend-medical-limited-company-2026.md` (**the HUB**) and
`PACK_C_blog__surplus-cash-medical-limited-company-options.md`. **The hub pack carries the shared
research: the equity shape of the whole incorporation cluster, the harvest's family breakdown, and the
twelve competitor teardowns. This pack does not repeat it; it names what it takes and where.**

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed,
deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job
created. **No paid API call: $0.00.** DataForSEO was read from the persisted harvest by SQL only. GSC
(Search Analytics and URL Inspection) and Bing Webmaster calls are free. Thirteen competitor URLs were
fetched live with a full browser header set.

---

## 1. Target and permission level

### The constraint, first

**GRADE = REFRAME. FULL REWRITE PERMITTED. K2 does not apply.** And on this page, unlike its two siblings,
the "nothing to lose" reading is literally correct: see §1.1.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/gp-corporation-tax` |
| Cluster / topic | **Corporation tax for an incorporated GP, consultant or locum company**: the rate map, marginal relief, associated companies, payment and filing, capital allowances, and the NHS-pension consequence of routing income through a company. |
| Wave | **C**, incorporation and company structures. Unblocked by the D3 ruling of 2026-09-01. |
| Source file | `Medical/web/content/blog/gp-corporation-tax.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** Frontmatter carries `title`, `metaTitle`, `metaDescription`, `h1`, `keyTakeaways`, `summary` and the `faqs` list. No `howtoSteps` key. `generator` is unquoted (`opus-4.8/track2-rewrite`); do not "tidy" it. |
| Category | `Incorporation & Company Structures` (existing TSX hub route; do not change) |
| Repo HEAD seen at build time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` |
| Revert path | `git checkout <sha derived at write time> -- Medical/web/content/blog/gp-corporation-tax.md` |

> **HEAD DISCIPLINE.** The sha above was read once, on 2026-09-01, and other agents commit concurrently:
> BATCH3_INDEX §0 records HEAD moving three times inside one writing session, and three packs carrying
> three different anchors, none of them wrong. **Do not copy the sha above.** Derive it at write time,
> preferably with `git log -1 --format=%H -- Medical/web/content/blog/gp-corporation-tax.md`, and verify
> the anchor is byte-identical to the working tree first.
>
> **Blast radius of a revert:** a single-file checkout restores the whole file, frontmatter included.
> This file's `image` and `imageCredit` block came from the 2026-08-26 hero backfill, so an anchor older
> than `bb1db095` strips the hero along with the content. Any anchor at or after `38a8ba75` is safe on
> that point.
>
> **No `monitored_pages` row exists for this slug (§1.2), so there is no measurement window to break and
> no registration to unwind. Registration is owner-gated and is not part of this work.**

### 1.1 THE FACT THAT DEFINES THIS PAGE: Google has never fetched it

BATCH3_INDEX §5's wave C entry lists this page as REFRAME with **no trace at all**. That is right, and a
URL Inspection call says something sharper than "no data".

```
POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect
  {"inspectionUrl": "https://www.medicalaccounts.co.uk/blog/gp-corporation-tax",
   "siteUrl": "sc-domain:medicalaccounts.co.uk"}
via optimisation_engine.snapshot.index_coverage._call_inspection_with_status, run 2026-09-01, HTTP 200
```

| Field | Value |
|---|---|
| `verdict` | **NEUTRAL** |
| `coverageState` | **Discovered - currently not indexed** |
| `lastCrawlTime` | **null. Never crawled.** |
| `pageFetchState` | `PAGE_FETCH_STATE_UNSPECIFIED` |
| `robotsTxtState` | `ROBOTS_TXT_STATE_UNSPECIFIED` |
| `googleCanonical` / `userCanonical` | empty / empty |

**Google knows this URL exists and has never fetched it.** It is one of the **66 discovered-not-indexed
URLs** in STATE's 2026-09-01 full-sitemap sweep, and one of the **117 of 139 that are not indexed in any
form**.

**Three consequences, and they run through the whole pack.**

1. **The zero on both engines is a fact about crawl demand, not about the page.** BATCH3_INDEX **D5** is
   explicit: a page with no history has never been given the chance to fail, and **no pack may describe
   one as "ranking nowhere"**. This one has not even been read. Every "absent" figure in §2 carries that
   caveat.
2. **This is the only page in the extraction set where "nothing to lose" is literally true.** Its two
   siblings are indexed at positions 5.93 and 4.90 and carry position guards (their packs' §7.2). **This
   page has no position, no impressions, no index entry and no canonical on record.** The rewrite is
   unconstrained by equity and §7.2 reduces to a link-integrity check.
3. **No Google expectation may be set for it, at any horizon.** §5.3 of the rollout runbook and STATE
   2026-09-01 both say the same thing, and here it is at its strongest: a page Google has never fetched
   cannot be promised a position by a content change. **§8 sets a Bing-first expectation and an
   indexation observation, and promises no Google position.** The one lever that would change this is
   **IndexNow**, which STATE names as the highest-value remaining step and which is **owner-triggered and
   explicitly not done** (§10.3).

### 1.2 Armed-window check, run for this pack

**Required by the brief and by BATCH3_INDEX §1: no status predicate.** Run 2026-09-01 through
`python scripts/_q.py` (Supabase Management API, project `dhlxwmvmkrfnmcgjbntk`):

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- 19 rows
```

Nineteen rows, unchanged from BATCH3_INDEX §1: `__home` (**flagged**, 2026-10-06) plus 18 blog slugs to
**2026-09-10**, of which `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines` are
**flagged**. A `status='active'` filter silently excuses those three, and STATE records that mistake being
made across the dossier, the batch-1 packs and STATE itself.

**`gp-corporation-tax` is NOT on that list.** Neither are the other two surfaces in this set. **All three
are free to work today, with no gate.**

**Four frozen pages matter to this one and none may be edited.** This page links to all four today.

| Frozen slug | Until | Google, 90d | Why it matters here |
|---|---|---|---|
| `gp-limited-company-tax-benefits-drawbacks` | 2026-09-10 | **96 impr, 4 clicks, pos 5.66** | Owns the should-I-incorporate question and is the best-earning page in the cluster |
| `nhs-pension-annual-allowance-complete-guide` | 2026-09-10 | 0 | Linked from the NHS-pension H2 |
| `gp-pension-contributions-tax-relief` | 2026-09-10 | 0 | Linked from the same H2 |
| `gp-partner-vs-salaried-gp-tax-comparison` | 2026-09-10 | 738 impr, 17 clicks, pos 7.87 | **O35's owner.** The site's second-best Google page |

**Per batch-1 coordinator ruling 5, contextual links to a frozen page's live URL are fine; editing the
frozen file is not.** Keep all four links. Add no fifth into the frozen set.

### What may change: everything

REFRAME permits a full overhaul: `metaTitle`, `metaDescription`, `h1`, `title`, every H2 and H3, the body,
the FAQ list, `keyTakeaways` and `summary`. **What may NOT change is the `slug`, the `canonical`, the
`category`, the `date`, the `image` and the whole `imageCredit` block, and the `altText`.**

**Never propose a collapse, a redirect or a URL change** (K4). **No em-dashes** (I1): the live file
contains **zero** and must still contain zero.

### The hard permissions this page does NOT have

1. **O34.** The salary-versus-dividend decision and the dividend rate map belong to
   `/blog/salary-vs-dividend-medical-limited-company-2026`. **One sentence, then link.** See §9.5 for the
   proposed clarification and §7.3 for the countable budget. **The live page is well over that budget: it
   runs a whole H3 on it.**
2. **O33.** Incorporation prose, s.162 relief and the step sequence belong to
   `/blog/medical-practice-incorporation-step-by-step` (named by the D3 ruling of 2026-09-01). **The live
   page runs a whole H2, `Is Incorporation Worth It for Your Private Work?`. Live breach.**
3. **O35.** The four-role employment-status fork belongs to `/blog/gp-partner-vs-salaried-gp-tax-comparison`,
   **FROZEN to 2026-09-10**. **The live page rebuilds it inside the NHS-pension H2. Live breach.**
4. **O2.** The annual allowance, its taper and its mechanics belong to
   `/calculators/nhs-pension-annual-allowance`. **The live page states the full taper with figures, and
   tags it to the wrong year. Live breach plus a stale tag.**
5. **O3.** Adjusted net income, the £100,000 to £125,140 taper and the 60% band belong to
   `/blog/adjusted-net-income-doctors-60-percent-tax-trap`. **One sentence, then link. Do not restate the
   60% band.** The live page is compliant (zero occurrences) and must stay so.
6. **s.455 and the director's loan account** belong to
   `/blog/consultant-directors-loan-account-s455-medical-company`. **The live page runs an H3 on it. Over
   budget.**
7. **IR35 and off-payroll for locums** belong to wave D under **O31**, whose owner is deliberately unnamed
   until wave D is scoped against its unfrozen hub. **The live page runs a whole H2 and mentions IR35
   eleven times. This is the pack's single largest ownership finding and it needs a conductor decision:
   see §9.6.**

---

## 2. Dual-engine equity register

**Every figure below was pulled fresh by this task on 2026-09-01.** Nothing is quoted from a stored
Supabase snapshot and `gsc_query_data` is not used or summed anywhere.

**D2 compliance: every engine figure names its endpoint. On this page every one of them is a zero, and
each zero means something different.**

### 2.1 Google, GSC Search Analytics, `page` dimension

```
GSCQueryFetcher("medical").gsc_client.service.searchanalytics().query(
    siteUrl="sc-domain:medicalaccounts.co.uk",
    body={"startDate":"2026-06-03","endDate":"2026-09-01","dimensions":["page"],"rowLimit":1000})
run 2026-09-01  ->  23 rows site-wide
```

**Rows for this URL: ZERO.** The call is unsampled at the page dimension and returned 23 rows for a
139-URL sitemap. This URL is not among them.

**Meaning, precisely.** Zero impressions over 90 days. Combined with §1.1 this is fully explained: **the
page has never been fetched, so it cannot be in the index, so it cannot be shown.** This is the cleanest
available example of BATCH3_INDEX D5's rule that absence of data is a question and not a finding, and here
the question has been answered directly rather than inferred.

**Cluster context, for scale.** Five of the six extraction-set pages ARE indexed, and every indexed one
ranks inside Google's top 10 (`gp-limited-company-tax-benefits-drawbacks` 5.66,
`family-investment-company-doctors-consultants` 4.78, `salary-vs-dividend` 5.93,
`consultant-directors-loan-account-s455-medical-company` 9.69, `surplus-cash` 4.90). The full table is in
the hub pack §2.1. **This page is the one member of its own cluster that Google has not taken**, which is
the useful comparison: the cluster is not being refused, this URL has simply not been reached.

### 2.2 Google, GSC Search Analytics, `page` + `query` dimension

```
same client, dimensions=["page","query"], rowLimit=5000, same window
run 2026-09-01  ->  288 rows site-wide
```

**Rows for this URL: ZERO.** Consistent with §2.1 and with §1.1. No query evidence exists.

### 2.3 Bing, `GetPageStats` (page level) and `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
    -> 329 rows, 80 distinct URLs
BingWebmasterClient().get_page_query_stats("https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/gp-corporation-tax")
    -> 0 rows
run 2026-09-01
```

| Endpoint | Result |
|---|---|
| `GetPageStats`, page level | **0 snapshots. Absent from all 329 rows.** |
| `GetPageQueryStats`, named-query level | **0 rows.** |

**Both disciplines apply and on this page the distinction is load-bearing.**

1. **The `GetPageQueryStats` zero is a TRUE zero, not the silent-failure path.** BATCH3_INDEX §0.2 records
   that this endpoint returns an empty list rather than an error when `page` is passed as a path instead
   of the full `https://www.` URL, producing a false negative a writer then honestly reports as a finding.
   **The call above passed the full `https://www.` URL** and the same script returned populated results
   for other Medical URLs in the same run.
2. **The `GetPageStats` zero is NOT proof of zero Bing impressions.** `GetPageStats` is top-N (Bing top-N
   trap memo; BATCH3_INDEX §9 limitation 2), and on this site it surfaces **80 distinct URLs of 139**.
   **Record it as "no Bing trace above the top-N floor", never as "zero Bing impressions".**
3. **And here is the difference that matters.** Bing is a **separate index** and there is no Bing
   equivalent of the URL Inspection result at §1.1. **This page may well be in Bing's index and simply
   outside its top 80 by traffic. Nothing in this pull says otherwise, and the pack does not claim
   otherwise.** That is why §8 sets a Bing first-appearance test that is genuinely open, rather than one
   gated on an indexation event.

### 2.4 THE EQUITY REGISTER, enumerated

**It is empty, on both engines, and here is the enumeration D2 asks for rather than an assertion:**

| # | Measure | Endpoint | Value |
|---|---|---|---|
| 1 | Google clicks, impressions, position, 90d | GSC Search Analytics, `page` dimension | **no row** |
| 2 | Google named queries | GSC Search Analytics, `page` + `query` | **0 rows** |
| 3 | Google index status | GSC URL Inspection | **Discovered - currently not indexed. `lastCrawlTime` null.** |
| 4 | Bing page-level impressions and clicks | `GetPageStats` (top-N) | **absent from 329 rows / 80 URLs** |
| 5 | Bing named queries | `GetPageQueryStats`, full `https://www.` URL | **0 rows** |
| 6 | Internal inbound links | `scripts/medical_flat_link_audit.py` | **non-zero, and this is the only equity the page has.** It is linked from at least `salary-vs-dividend-medical-limited-company-2026` (twice) and is the category sibling of the rest of the cluster |

**THE DO-NOT-LOSE LIST is therefore one item: the internal inbound links.** They are how a
never-crawled page gets discovered at all, and a rewrite that broke them would remove the only route
Google currently has to it. §7.2 is built on exactly that.

---

## 3. The market's keyword set

### 3.1 Method and provenance

Source: `dataforseo_competitor_data`, `site_key='medical'`. **No new DataForSEO call was made: $0.00.**
Live corpus: **39,296 rows, 31,539 keywords, 44 domains** (D12 resolution, 2026-08-26). Peer set is the
**39 domains** confirmed by the D13 resolution; the 5 institutional non-peers of §2b (`bma.org.uk`,
`themdu.com`, `aisma.org.uk`, `forvismazars.com`, `johnstoncarmichael.com`) are excluded from
peer-winnable. Run 2026-09-01 through `python scripts/_q.py`. **The full SQL, including the peer array and
the selection regex, is printed in the hub pack §3.1 and is not duplicated here.**

**`\y` is used throughout, never `\b`** (BATCH3_INDEX **D9**).

**Whole extraction family: 311 keywords, 174,740 volume, 56,220 peer-winnable.** This page's slice:

| Family | Kws | Volume | **Peer-winnable** | Dominant holder |
|---|---|---|---|---|
| **Corporation tax rates and marginal relief** | **34** | **33,130** | **140** | gorillaaccounting.com (20 of 34), gmprofessionalaccountants.co.uk (7), pricebailey.co.uk (4) |

**Note the peer-winnable column: 140 out of 33,130 volume, which is 0.4%.** That is the lowest ratio of
any family in the extraction set by an order of magnitude, and it is the finding that shapes this whole
page.

### 3.2 The set in full, ordered by volume

`On page` = phrase appears verbatim in the live source file, case and punctuation normalised.

| Vol | Best pos | Peer best | Holder | On page | Keyword |
|---|---|---|---|---|---|
| 12,100 | 60 | 60 | gorillaaccounting.com | **no** | `corporation tax rate` |
| 12,100 | 60 | 60 | gorillaaccounting.com | **no** | `corporation tax rates` |
| 1,600 | 62 | 62 | pricebailey.co.uk | **no** | `corporation tax rate calculator` |
| 1,600 | 64 | 64 | pricebailey.co.uk | **no** | `corporation tax rates calculator` |
| 720 | 43 | 43 | taxqube.co.uk | **yes** | `corporation tax marginal relief` |
| 720 | 47 | 47 | gorillaaccounting.com | **no** | `what is corporation tax rate uk` |
| 390 | 49 | 49 | gorillaaccounting.com | **no** | `what are corporation tax rates` |
| 320 | 51 | 51 | gorillaaccounting.com | **no** | `current corporation tax rate uk` |
| 260 | 64 | 64 | pricebailey.co.uk | **no** | `corporation tax marginal relief calculator` |
| 210 | **20** | 86 | forvismazars.com (**non-peer**) | **no** | `change in corporation tax rate` |
| 210 | 69 | 69 | gmprofessionalaccountants.co.uk | **no** | `corporation tax rate 2024 25` |
| 210 | 69 | 69 | gmprofessionalaccountants.co.uk | **no** | `corporation tax rate 2024/25` |
| 210 | 81 | 81 | gmprofessionalaccountants.co.uk | **no** | `corporation tax rate changes` |
| 210 | 70 | 70 | gmprofessionalaccountants.co.uk | **no** | `corporation tax rates 2024 25` |
| 210 | 47 | 47 | gorillaaccounting.com | **no** | `what is corporation tax rate` |
| 210 | 49 | 49 | gorillaaccounting.com | **no** | `what is corporation tax rates` |
| 140 | 74 | 74 | gmprofessionalaccountants.co.uk | **no** | `corporation tax rate 2024` |
| 140 | **16** | none | johnstoncarmichael.com (**non-peer**) | **no** | `corporation tax rate for small companies` |
| 140 | **15** | 61 | johnstoncarmichael.com (**non-peer**) | **no** | `corporation tax rate scotland` |
| 140 | 75 | 75 | gmprofessionalaccountants.co.uk | **no** | `corporation tax rates 2024` |
| 140 | **15** | **15** | r-m-t.co.uk | **no** | **`corporation tax rates 2026/27`** |
| 140 | **15** | none | johnstoncarmichael.com (**non-peer**) | **no** | `corporation tax rates scotland` |

(The remaining 12 rows are further permutations at 20 to 110 volume at positions 43 to 81.)

### 3.3 Five readings, and the first one decides the page

1. **THE GENERIC CORPORATION TAX HEAD IS NOT WINNABLE AND IT IS DECLINED ON THE RECORD.**
   `corporation tax rate` and `corporation tax rates` carry **12,100 volume each** and the best peer
   position anywhere in the harvest is **60**. Seven of the top eight rows sit at position 43 to 64.
   **Peer-winnable across the whole 33,130-volume family is 140.** STATE 2026-09-01 says exactly what to
   do with a family like this: the head commercial family on this site sits at position 45 to 78 with
   ~4,000 impressions and **zero clicks in 90 days**, and "content cannot close a 50-place gap on a
   five-word commercial head term; this is the domain-authority wall §5.3 says to expect and not to
   promise lifts on". **`corporation tax rate` is a national head term with an HMRC-and-gov.uk SERP. We
   decline it, we say so at §4.6 theme 1, and we set no expectation against it.**
2. **The winnable slice is the medical modifier, and it does not exist in the harvest.** There is not one
   medical-modified corporation tax keyword anywhere in the 39,296 rows. **The full query and its
   eighty-row result are printed in the hub pack §3.4 point 3**: `gp corporation tax`,
   `corporation tax for doctors`, `medical company corporation tax` return zero rows in any phrasing;
   every medical-modified hit is a pay-level or NHS-pension query. **This page's own slug is a keyword
   nobody in the peer set ranks for, because nobody in the peer set has written the page.**
3. **`corporation tax rates 2026/27` (140 volume, `r-m-t.co.uk` at position 15) is the one live-year row
   in the family and it is the shape to copy.** Every other year-tagged row in the table is **2024** or
   **2024/25**, held at positions 69 to 81 by a single domain that has not updated them. **The family is
   full of stale-year pages ranking badly, and the one current-year page ranks 15th.** That is the
   currency argument this page should make, and §7.1 phrase 3 targets it.
4. **The `calculator` slice is DECLINED.** `corporation tax rate calculator` and
   `corporation tax rates calculator` (1,600 each) plus
   `corporation tax marginal relief calculator` (260) are held by a `pricebailey.co.uk` **VAT-filer tool
   subdomain** at positions 62 to 64. We have no such calculator. Medical runs ten `/calculators/<slug>`
   routes and none is this. **Declined at §4.6 theme 5, and folded into the same owner-facing tooling
   observation the hub raises at its §10.3.**
5. **`corporation tax marginal relief` (720, position 43) is the single most winnable row in the family
   and it is the one term already on our page.** The incumbent (§4.2) is a 2023 page that states the 19%
   to 25% band and **never gives the 3/200 fraction or the ~26.5% effective rate**. **We already give
   both.** §7.1 phrase 4 makes the term prominent rather than incidental.

---

## 4. Competitor teardown

**MANDATORY CLAUSE, and it is satisfied. Every URL below was fetched LIVE by this task on 2026-09-01 and
its HTTP status is recorded. No URL was assessed from the harvest alone, no fetch was silently dropped,
and the one non-200 in the wave is recorded with its status code in the hub and surplus-cash packs.**

Fetch method, implementing BATCH3_INDEX **D14**: `httpx.get(url, headers=<full browser header set>,
follow_redirects=True, timeout=45)`, carrying `User-Agent`, `Accept`, `Accept-Language`,
`Accept-Encoding`, four `Sec-Fetch-*` headers, `Upgrade-Insecure-Requests` and `Connection`.

### 4.1 gorillaaccounting.com, What is Corporation Tax and How Much Do UK Companies Pay?: **THE PAGE TO BEAT**
`https://gorillaaccounting.com/blog/what-is-corporation-tax-and-how-much-do-uk-companies-pay/` · **HTTP 200**
**Class: PEER** (contractor accountant). **Holds 96 keywords / 207,380 combined volume**, including both
12,100-volume heads at position 60, best position across the page **21**.

| | |
|---|---|
| Title / H1 | `What is Corporation Tax and How Much Do UK Companies Pay?` |
| `datePublished` / `dateModified` | **2026-04-30** / **2026-04-30** |
| Visible byline | `April 30, 2026 · Minutes to read 4 · Limited Companies, News, Tax` |
| Word count | 2,421 (chrome included) |
| H2s (article) | `What is Corporation Tax?`; `What Are The Corporation Tax Rates?`; `How Is Your Corporation Tax Liability Calculated?`; `What Are The Corporation Tax Deadlines?`; `What Corporation Tax Reliefs and Allowances Are Available?`; `How We Can Help With Your Corporation Tax Obligations` |
| Tables | 1 · FAQ schema: No · Calculator: No |
| Figures found across the page | `19%`, `25%`, `£50,000`, `£250,000`, `£1m`. **Nothing else.** |

**What it says, verbatim:**

> "Prior to April 2023, all businesses paid Corporation Tax at 19% but the rules were then changed so more
> profitable companies paid more while smaller companies were shielded from paying higher rates. Small
> Profits Rate: 19% Applies to companies with profits up to £50,000. Marginal Relief: 19% to 25%
> Companies with profits between £50,000 and £250,000 pay a rate between 19% and 25% on a sliding scale.
> Main Rate: 25% Applies to companies with profits over £250,000."

> "if you company has associated companies, the thresholds may be reduced as the limits are shared between
> them."

**What it gets wrong or omits.** **This page was modified on 30 April 2026 and carries no tax year or
financial year anywhere.** A targeted search of the fetched text for `3/200`, `26.5`, `financial year`,
`2025` and `2026` returned matches only in the site's own recent-posts sidebar dates, never in the
article. So:

- **no year tag on any rate** (F1's exact failure);
- **no marginal relief fraction** and **no effective rate in the band**, which is the number a company
  between £50,000 and £250,000 is actually deciding on;
- the associated-companies rule named in a single dependent clause, with a spelling error ("if you
  company"), and no time-apportionment rule for short periods;
- **no medical content of any kind**, and the reliefs section is generic.

**Consequence for us.** The dominant page on a 12,100-volume head, freshly touched four months ago, sits
at **position 60** and cannot tell a reader what rate they will actually pay in the band most medical
companies occupy. **We give the fraction, the effective rate and the year, and we give them for a
consultant with NHS income on top.** We still decline the head term (§3.3 point 1) because position 60 on
a national term is a domain-authority wall, not a content gap.

### 4.2 taxqube.co.uk, What is an associated company? Marginal Relief and UK Corporation Tax
`https://taxqube.co.uk/what-is-an-associated-company-marginal-relief-and-uk-corporation-tax/` · **HTTP 200**
**Class: PEER.** Holds 19 keywords / 5,210 combined volume; **holds `corporation tax marginal relief` (720)
at position 43**, the family's most winnable row.

| | |
|---|---|
| Title | `What is an associated company? Marginal Relief And UK Corporation Tax | Chartered Accountants London` |
| H1 | `What is an associated company? Marginal Relief And UK Corporation Tax` |
| `datePublished` / `dateModified` | **2023-03-09** / **2023-03-09**. Never updated. |
| Word count | **1,513** |
| H3s (article) | `What is an associated company ?`; `Definition of "control"`; `What are the maximum and minimum values?`; `Attribution of rights`; `Fixed-rate preference shares`; `The implications` |
| Tables | 1 · FAQ schema: No |
| Figures found | `19%`, `25%`, `£50,000`, `£250,000`. **No 3/200, no 26.5%, no year tag.** |
| Visible dates in body | `April 1, 2023`, `May 31, 2023`, `January 1, 2024`, `March 31, 2024` |

**What it is good at, and it is worth saying.** This is the best associated-companies content in the set:
the control definition, attribution of rights and fixed-rate preference shares are genuine technical
depth that nothing else in the family carries.

**What it omits.** **The marginal relief calculation itself.** A page holding the head marginal-relief
term states the 19% to 25% band and never gives the fraction or the effective rate. Its worked dates run
to March 2024 and stop.

**Consequence for us.** **`corporation tax marginal relief` at position 43 held by a three-year-old page
that does not compute marginal relief is the most winnable single row in this family**, and our page
already carries the 3/200 fraction and the ~26.5% figure. **The job is to make them prominent and current,
not to add them.** §7.1 phrase 4.

### 4.3 gorillaaccounting.com, Salary and Dividend Tax Calculator
`https://gorillaaccounting.com/salary-dividend-tax-calculator/` · **HTTP 200**
**Class: PEER.** The extraction family's dominant URL (429 keywords, 1,281,630 combined volume, best
position 1), and the redirect target of the harvest's `the-lowdown-on-dividend-tax-rates` URL (hub pack
§4.2).

**The single relevant fact for this page:** it publishes **2024/25** dividend rates, **8.75% / 33.75% /
39.35%**, as current, on a page whose `article:modified_time` is **2026-07-01**. Full teardown in the hub
pack §4.1. **Recorded here because this page's two-layers-of-tax section needs the current dividend rates
and this is the evidence that the incumbents do not have them.**

### 4.4 rsbc.uk, Salary vs Dividend Calculator for Contractors UK 2026/27
`https://www.rsbc.uk/salary-dividend-tax-calculator` · **HTTP 200**
**Class: PEER.** Title and H1 carry `2026/27`, the string appears nineteen times, and the body rates are
**8.75% / 33.75% / 39.35%**. A current-year title over prior-year rates. Full teardown in the hub pack
§4.4. **Recorded here as the cautionary example: putting the year in the title is worth nothing without
putting it in the number**, and this page's `metaTitle` already carries `2026/27`.

### 4.5 sandisoneasson.co.uk, A Guide to Directors Loan Accounts
`https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` · **HTTP 200**
**Class: PEER, and a MEDICAL SPECIALIST** (navigation: Hospital Consultants, GP-Practice, GP-Federations,
GP-Locums, registrars, dentists). Visible date **Sep 2020**, 1,596 words, **no article headings at all**,
holds `directors loan` (2,900) at position 26.

**Verbatim: "HMRC will charge additional tax on that loan at 32.5%. The additional corporation tax is
known as Section 455 tax."** Also: "the official rate of interest set by HMRC is currently 2.25%".
**32.5% is three rate generations stale** (32.5%, then 33.75%, then **35.75%** on loans made on or after
6 April 2026, HP §5). Corroborated independently by `taxqube.co.uk/s455-tax-on-directors-loan-account/`
(**HTTP 200**, published 2022-02-19, holds `s455 tax` at position 19), verbatim: **"the S455 charge is
calculated as 32.5 percent of the outstanding balance"**.

**Fetched for one reason and it is decisive.** **This is the closest thing to a medical-specialist
corporate-tax page anywhere in the peer set, and it is a five-year-old, unheadinged, generic note on
overdrawn loan accounts publishing a superseded rate.** No medical peer runs a corporation tax page at
all. **The finding itself belongs to `/blog/consultant-directors-loan-account-s455-medical-company` and is
passed there at §10.4; this page states the s.455 rate once, date-banded, and links.**

### 4.6 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes**. **13 themes, 13 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **`corporation tax rate` / `corporation tax rates` as national head terms** (4.1, 12,100 volume each) | **DECLINE** | Best peer position anywhere is 60; family peer-winnable is 140 of 33,130. STATE 2026-09-01: content cannot close a 50-place gap on a commercial head term and §5.3 says not to promise it. Declined on the record, and no expectation is set against it at §8. |
| 2 | **The three-tier rate structure: 19% to £50,000, 25% over £250,000, marginal relief between** (4.1, 4.2) | **COVER, with the year** | HP §5. Already on the page and already tagged to the financial year from 1 April 2026. **KEEP. This is the one thing the incumbents also have, so it is table stakes, not differentiation.** |
| 3 | **The marginal relief FRACTION and the effective rate in the band** (absent from 4.1 and from 4.2, the two pages that hold the terms) | **COVER, and it is the differentiator** | HP §5: **standard fraction 3/200, effective rate around 26.5%**. Already on the page. **KEEP and promote.** |
| 4 | **Associated companies: the control definition, attribution of rights, fixed-rate preference shares** (4.2, the best technical depth in the set) | **COVER the rule, DECLINE the depth** | Our page states that the limits are divided by the number of associated companies and time-apportioned for short periods, which is the right size for a medical audience. **A control-and-attribution treatise is a corporate-tax page for corporate-tax readers and D4 says write to a clinician.** Declined with the reason. |
| 5 | **A corporation tax calculator** (4.1 has none; pricebailey holds the calculator terms at 62 to 64 on a VAT-filer subdomain) | **DECLINE** | We have no such tool. A guide implying it is one is a doorway page. Folded into the owner-facing tooling observation the hub pack raises at its §10.3. |
| 6 | **Payment and filing deadlines: 9 months and 1 day, CT600 within 12 months, quarterly instalments for large companies** (4.1 H2 4) | **COVERED ALREADY** | On our page, with the £1.5 million instalment threshold divided by associated companies. **KEEP.** |
| 7 | **Reliefs and allowances: AIA, first-year allowances, writing-down allowances** (4.1 H2 5, generic) | **COVER, with the FA 2026 changes** | HP §7 and §7.A: **AIA £1m permanent; main-rate WDA 18% to 14% from 1 April 2026 (CT) with a hybrid rate for a straddling period; special rate stays 6%; new 40% FYA on new unused main-rate plant from 1 January 2026; full expensing companies-only.** All on our page and all current. **KEEP. No competitor page in the set carries the FA 2026 changes.** |
| 8 | **The s.198 fixtures election on a premises purchase** | **COVERED ALREADY, briefly** | HP §7: s.198 election, 2-year limit under s.201, and missing it forfeits the buyer's fixtures allowances. Our page mentions the election without the deadline. **The deadline is the useful half.** §7.1 phrase 7. |
| 9 | **The dividend rate map and the two-layers-of-tax point** (4.3, 4.4) | **ELSEWHERE, one sentence and a link** | **O34's**, hub `/blog/salary-vs-dividend-medical-limited-company-2026`. See §9.5 and §7.3. **The live page runs a whole H3 on it.** |
| 10 | **s.455 and the director's loan account** (4.5) | **ELSEWHERE, one sentence and a link** | `/blog/consultant-directors-loan-account-s455-medical-company`'s. **The live page runs an H3 on it.** |
| 11 | **Whether to incorporate; the pros and cons** | **ELSEWHERE, one sentence and a link** | **O33's**, `/blog/medical-practice-incorporation-step-by-step`; plus the FROZEN `/blog/gp-limited-company-tax-benefits-drawbacks`. **The live page runs a whole H2, `Is Incorporation Worth It for Your Private Work?`.** |
| 12 | **IR35 and off-payroll for a locum PSC** | **ELSEWHERE, and it needs a conductor decision** | **O31's**, wave D, owner deliberately unnamed until D is scoped against its unfrozen hub. **The live page runs a whole H2 and names IR35 eleven times.** See §9.6: this is the pack's largest ownership finding. |
| 13 | **MTD for Income Tax and whether it reaches a company** | **COVER, one sentence, and it is genuinely useful** | HP §9: MTD for ITSA is income tax, so **limited companies are out**, and a locum trading through a PSC is outside it while a sole-trader locum over £50,000 has been in scope since 6 April 2026. **A negative fact that saves the reader a wrong assumption is exactly what D1 rewards.** Already on the page in one sentence. **KEEP.** |

---

## 5. Whitespace

### 5.1 What this page owns and what it hands off

**O34 makes `/blog/salary-vs-dividend-medical-limited-company-2026` the hub for extraction facts and this
page one of its satellites. That does not make this page a stub: corporation tax is its own subject and no
other page on the site carries it.**

| This page OWNS, exclusively | This page HANDS OFF, one sentence and a link |
|---|---|
| **The corporation tax rate map for a medical company**: 19% / 25% / marginal relief, the 3/200 fraction, the ~26.5% effective rate, all with the financial year | **The dividend rate map and the salary-versus-dividend decision** (O34, the hub) |
| **Associated companies**: the limits divided, and time-apportionment for short periods | **What to do with the profit once it has been taxed** (the surplus-cash satellite) |
| **Payment and filing**: 9 months and 1 day, the CT600 at 12 months, the £1.5m instalment threshold, penalties and interest | **s.455 and the director's loan account** (its own page) |
| **Capital allowances for a medical company**: AIA £1m, the FA 2026 WDA drop to 14%, the 40% FYA, full expensing, the special rate at 6%, and the s.198 fixtures election | **Whether to incorporate at all** (O33, and the frozen page) |
| **Allowable expenses for a medical company** as they reduce taxable profit (indemnity, List 3 subscriptions, CPD, mileage at 55p, home office) | **IR35 and off-payroll** (O31, wave D, **owner unnamed**: see §9.6) |
| **The NHS-pension consequence of routing income through a company**, in one paragraph | **The four-role employment-status fork** (O35, **FROZEN**) |
| | **The annual allowance and its taper** (O2, the calculator) |
| | **Adjusted net income, the £100k to £125,140 taper, the 60% band** (O3) |

### 5.2 What nobody in the peer set covers, quotably

1. **The two pages that hold the corporation tax terms cannot compute corporation tax.** `gorillaaccounting`
   holds both 12,100-volume heads and gives the 19% to 25% band with **no fraction, no effective rate and
   no year** (§4.1, modified 30 April 2026). `taxqube` holds the head marginal-relief term and does the
   same (§4.2, published March 2023). **We give 3/200 and ~26.5% with the financial year, and it is the
   number a company between £50,000 and £250,000 is actually deciding on.**
2. **No competitor page in this SERP states the live 2026/27 dividend rates.** Eleven competitor pages
   were fetched and returned HTTP 200, and a figure scan across all eleven returned `10.75%` **zero
   times** and `35.75%` **zero times**. Four print `8.75%` and `33.75%` as current. **Our one-sentence
   O34 handoff will carry a figure no rival page has.**
3. **Nobody carries the FA 2026 capital allowance changes.** A targeted scan of §4.1's reliefs section
   found `£1m` and nothing else: no 14% WDA, no 40% FYA, no 1 January 2026 date, no straddling-period
   hybrid rate. HP §7.A has all of it, current and in the present tense. **The whole of §4.6 theme 7 is
   whitespace.**
4. **Nobody writes any of it for a doctor.** Zero medical-modified corporation tax keywords in the harvest
   (§3.3 point 2). The nearest medical-peer page is a five-year-old note on directors' loans publishing a
   32.5% s.455 rate (§4.5). **No medical accountant in the peer set has a corporation tax page.**
5. **Nobody pairs corporation tax with the NHS pension.** Only we can say that every pound of private
   income routed through a company is a pound that builds no NHS pension, that NHS accrual runs on income
   taken in the doctor's own name and certified through the Type 1 certificate, the Type 2 self-assessment
   or Locum forms A and B, and that a company pension contribution builds a separate DC pot rather than
   restoring anything (HP §2.C). **The live page already does this and it is the page's whole reason to
   exist.**
6. **Nobody states the negative facts that save a reader a wrong assumption.** MTD does not reach a
   limited company (HP §9). The Employment Allowance is not available to a sole-director company (HP §5).
   Quarterly instalments almost never apply to a medical company. **Three assumptions corrected in three
   sentences, and none of the three appears on a competitor page.**
7. **Nobody names the s.198 two-year deadline.** HP §7 calls missing it "a common, preventable loss" and
   the deadline is the actionable half. Our page names the election and not the deadline (§7.1 phrase 7).

### 5.3 KEEP, explicitly

**K1 is a hard fail: the drafted version's count of statutory references, form names, technical terms and
figures must be greater than or equal to the live page's.** **This matters more here than on either
sibling, because the fencing work at §7.3 removes four blocks and a careless rewrite could strip the page
below its own floor.** The list below is what must survive.

- **CT 19% to £50,000, 25% over £250,000, marginal relief between, standard fraction 3/200, effective rate
  around 26.5%, financial year from 1 April 2026.** **KEEP, and promote: it is the differentiator.**
- **Associated companies divide the £50,000 and £250,000 limits; the limits are time-apportioned for
  accounting periods under 12 months.** **KEEP.**
- **Corporation tax payable 9 months and 1 day after the accounting year end; CT600 filed within 12
  months; quarterly instalments only for large companies, broadly profits over £1.5 million, divided by
  associated companies; late filing penalties from £100 and interest on overdue tax.** **KEEP the whole
  block; it is complete and correct.**
- **AIA £1,000,000, permanent, cars excluded.** **KEEP.**
- **Main-rate WDA 18% to 14% for relief from 1 April 2026 (CT), with a time-apportioned hybrid rate for a
  straddling accounting period; special-rate pool stays 6%.** **KEEP. No competitor page has this.**
- **The 40% first-year allowance on new, unused, not second-hand main-rate plant from 1 January 2026, and
  full expensing as companies-only.** **KEEP.**
- **The CAA 2001 s.198 election on a premises purchase including fixtures.** **KEEP, and add the two-year
  deadline** (§7.1 phrase 7).
- **Mileage at 55p for the first 10,000 business miles and 25p thereafter for 2026/27, up from 45p on
  6 April 2026, and the home-to-first-site commuting rule.** **KEEP.**
- **The allowable-expense list**: GMC retention fees (deductible, **no figure**), indemnity (MDU, MPS,
  MDDUS), Royal College and specialty membership and BMA subscriptions where on HMRC's approved list, CPD
  genuinely relevant to current practice, professional and accountancy fees, apportioned phone, internet
  and home office. **KEEP.**
- **The corrected NHS-contract wording**: an NHS GMS or PMS contract sits with GPs, their partnerships or
  a company limited by shares whose shareholders all qualify, and a doctor's ordinary personal service
  company is not one. **This is HP §2.C's corrected form and the live page already uses the unpinned
  version correctly. KEEP EXACTLY, and see §7.7 rule 5 for why the citation must not be tightened.**
- **Company income and dividends are not NHS-pensionable; NHS accrual runs only on income taken in the
  doctor's own name; the Type 1 Annual Certificate of Pensionable Profits, the Type 2 self-assessment and
  Locum forms A and B.** **KEEP.**
- **The company pension contribution is a separate defined-contribution pot and does not replace NHS
  accrual.** **KEEP.**
- **The taper-management point**: for a doctor near the annual-allowance taper, keeping some private income
  outside pensionable NHS pay can itself be a reason to incorporate, and it is a fine judgement rather
  than a default. **KEEP the judgement; strip the taper figures per §7.3 (O2).**
- **MTD for Income Tax does not apply to limited companies**, while a sole-trader locum or unincorporated
  private GP over £50,000 has been in scope since 6 April 2026. **KEEP.**
- **The general-information disclaimer paragraph** at the foot. **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/gp-corporation-tax.md`, read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **2,935** |
| Word count, body copy only | **2,129** (HTML stripped) |
| `metaTitle` | `GP Corporation Tax Rates 2026/27 (19% to 25%)` (45 characters) |
| `metaDescription` | 137 characters, under the 155 limit |
| `h1` | `GP Corporation Tax: Complete Guide for UK Medical Professionals` |
| `title` | identical to `h1` |
| Date / generator | 2026-04-01, `opus-4.8/track2-rewrite` (unquoted) |
| H2 count | **8** · H3 count: **6** |
| FAQ entries | **6** · `keyTakeaways`: **5** · `howtoSteps`: absent |
| Tables | **0. L4 UNMET.** |
| Worked example with figures | **None. G1 UNMET.** |
| Em-dashes | **0** (I1 clean) |
| `we` / `our` / `us` | 8, i.e. **3.8 per 1,000** against a C4 cap of 3 |
| `you` / `your` | 31, i.e. **14.6 per 1,000**, **inside the C3 band of 12 to 25. The only one of the three extraction pages that passes C3.** |
| L2 word band | 2,129 body words, inside the 2,000 to 3,200 deep-guide band |

### 6.1 Existing heading list, verbatim and in order

- H2 `GP Corporation Tax Rates 2026/27`
- H2 `How Corporation Tax Differs from Personal Tax for Doctors`
  - H3 `Payment Timing`
  - H3 `Two Layers of Tax`
- H2 `Profit Extraction: Salary, Dividends and Pension`
  - H3 `Dividend Tax Rates 2026/27`
  - H3 `A Note on the Director's Loan Trap`
- H2 `NHS Pension and Incorporated GPs: the Decisive Issue`
  - H3 `Corporation Tax Relief on Pension Contributions`
- H2 `Allowable Expenses and Capital Allowances`
  - H3 `Equipment and Capital Allowances`
- H2 `IR35 and Corporation Tax for Locum Companies`
- H2 `Filing, Deadlines and Records`
- H2 `Is Incorporation Worth It for Your Private Work?`

### 6.2 Blunt read

**This is the best-voiced page of the three and the worst-fenced. It is also the only one carrying two
stale year tags.** The rewrite is a fencing exercise plus a currency fix plus the addition of the two
structural components the page has never had.

**What is good, specifically.**

1. **C3 passes at 14.6 per 1,000**, comfortably inside the band, and it is the only extraction page that
   does. The register is genuinely second-person and the rewrite must not lose it while removing the
   fenced blocks.
2. **The capital allowances block is the most current content in the extraction set.** AIA £1m permanent,
   WDA 18% to 14% from 1 April 2026 with the straddling hybrid, special rate 6%, the 40% FYA from
   1 January 2026, full expensing companies-only. All of it matches HP §7 and §7.A and **none of it
   appears on any competitor page fetched.**
3. **The corrected NHS-contract wording is already in use, in three places** (key takeaway 1, the opening
   paragraph, FAQ 2), in the **unpinned form** HP §2.C requires where a sentence covers GMS and PMS
   together. That correction only landed on 2026-08-26 and had propagated as a wrong flat claim to five
   pages plus 39 further blog posts. **This page is on the right side of it and must stay there.**
4. **The filing and deadline block is complete and correct** and the MTD negative is genuinely useful.
5. **The NHS pension H2 is the page's reason to exist** and the taper-management insight (that keeping
   income outside pensionable pay can be a reason to incorporate, as a fine judgement rather than a
   default) is the most sophisticated thing on any of the three pages.
6. **I1, I2, I4, I5 clean.** Zero em-dashes, no named expert, no client name, no pricing. **F5 clean**:
   GMC retention fees are named as deductible with **no figure**, which is exactly what O9 and the
   narrowed F5 require.
7. **O3 respected**: zero occurrences of the 60% band or adjusted net income.

### 6.3 What is thin, missing or wrong, checked against the CURRENT rules

**TWO STALE YEAR TAGS, and they are the pack's factual findings on this page.**

1. **"The annual allowance is £60,000 for 2025/26 (the limit rose from £40,000 to £60,000 in April 2023)".**
   The live tax year is **2026/27**. HP §2.B and the verification log confirm the annual allowance,
   threshold income limit and adjusted income limit are all **unchanged into 2026/27**, so **the figure is
   right and the tag is stale**, which is exactly the pattern the 2026-08-26 currency pass found across
   house positions itself. **F1 and F2 both fail.** It also sits inside an O2 breach (point 3 below), so
   the correct fix removes the figures entirely rather than re-tagging them.
2. **"At 2025/26 rates the pure tax saving from incorporating private medical work is often modest".**
   HP §5's headline point is written for **2026/27** and its writing rule is explicit: the 6 April 2026
   dividend rise "has already narrowed it (write this as a change that has happened, not one that is
   coming)". **A page whose `metaTitle` says 2026/27 and whose closing section reasons from 2025/26 rates
   is internally inconsistent and F2 fails.**

**THE FOUR OWNERSHIP BREACHES, in size order.**

3. **O31 (IR35) is breached at whole-H2 scale, and this one needs a conductor decision.** The H2
   `IR35 and Corporation Tax for Locum Companies` runs 218 words across two paragraphs covering the three
   hirer types, who issues the determination, the disagreement process, that IR35 has not been abolished,
   and that a locum can hold a mix of determinations. Plus FAQ 5. **`IR35` appears 11 times.** **O31
   assigns all of it to wave D and deliberately leaves the owner unnamed** until wave D is scoped against
   its unfrozen hub. **See §9.6: the writer must not pick the owner.**
4. **O33 is breached at whole-H2 scale.** `Is Incorporation Worth It for Your Private Work?` is the
   incorporation decision: the drivers, the modest headline saving, family-shareholder planning, limited
   liability, and the pension trade-off. **O33 gives that to `/blog/medical-practice-incorporation-step-by-step`
   and the frozen `/blog/gp-limited-company-tax-benefits-drawbacks` holds its Google equity.** The live
   page links to both, correctly, and then writes the section anyway.
5. **O34 is breached at whole-H3 scale.** `Dividend Tax Rates 2026/27` states all three rates and the
   allowance, compares them to 2025/26, and adds "the salary-versus-dividend balance is worth re-running",
   which is the hub's exact subject. Plus key takeaway 3, plus FAQ 3, plus the `Profit Extraction` H2's
   bullet list. **Five places.**
6. **O2 is breached in one paragraph**, with the stale tag of point 1 inside it: the £60,000 allowance,
   the £200,000 threshold-income and £260,000 adjusted-income conditions and the £10,000 floor.
7. **O35 is breached inside the NHS pension H2.** The paragraph walks the partner, salaried GP, locum and
   hospital consultant positions and names the Type 1 certificate, the Type 2 self-assessment and Locum
   forms A and B. **O35 gives the four-role fork to the FROZEN
   `/blog/gp-partner-vs-salaried-gp-tax-comparison`, and no batch-3 page may rebuild the table.**
   **Nuance the writer needs: the certification forms are HP §2.C's and are legitimately this page's**
   when the sentence is about why company income is not pensionable. **What must go is the four-role walk,
   not the form names.** §7.3 draws the line.
8. **s.455 is over-budget.** The H3 `A Note on the Director's Loan Trap` gives the mechanic, both rate
   bands and the refund deferral, and key takeaway 5 and FAQ 4 repeat it. **Three places against a budget
   of one sentence.**

**THE STRUCTURAL GAPS.**

9. **No table. L4 UNMET, and this page has the clearest case for one in the whole wave.** It carries a
   three-tier rate structure with two thresholds, a dividend band set, a capital-allowance set with four
   rates and three dates, and three filing deadlines. **All four are natural tables and all four are
   prose or bullets.** L4 requires at least one table on any page carrying bands, rates or deadlines, with
   a caption stating the effective date per F1.
10. **No worked example. G1 UNMET.** The topic is a calculation with a threshold and a taper (marginal
    relief across the £50,000 to £250,000 band), which is precisely the trigger G1 names. **The page
    states 26.5% and never shows where it comes from.** A single 80-to-200-word example computing the CT
    on a profit inside the band, using the 3/200 fraction, would be the most useful block on the page and
    would be unique in the family (§4.1, §4.2 both omit it). **G2 places it immediately after the rate
    H2; G6 forbids the heading being the words "Worked example"; G4 requires a role and an initial only,
    explicitly illustrative; G5 requires every rate to have been stated in the body with its year.**
11. **B4 fails: 1 of 8 H2s is question-form** (`Is Incorporation Worth It for Your Private Work?`, and
    that H2 is being removed as an O33 breach), **against a band of 50% to 75%.** After the fencing work,
    the count is 0 of 6.
12. **B2 is mixed.** `GP Corporation Tax Rates 2026/27` and `Filing, Deadlines and Records` are good noun
    phrases carrying market vocabulary. `How Corporation Tax Differs from Personal Tax for Doctors` and
    `Profit Extraction: Salary, Dividends and Pension` are ours, and the second names a subject the page
    is handing away.
13. **Title case throughout the headings**, against sentence case on both siblings. Not a spec rule, but
    it is a visible inconsistency across three pages in one category that a conductor should settle at
    wave level rather than a writer settling alone.
14. **C4 fails: 3.8 per 1,000 against a cap of 3**, clustered in the closing two paragraphs. **REFRAME
    permits fixing it; the single end-of-page CTA stays, per D3.**
15. **A1, A4 and A5.** The opening block runs 104 words to the first H2, inside A5's 120-word hard ceiling
    but outside its 40-to-90 band. **A4 is met**: the answer is a number and 19% to 25% arrives in the
    first sentence of the bolded intro.
16. **F6 risk in one clause.** "most incorporated GPs draw dividends in the higher-rate band" is an
    unsourced generalisation about a population. **F6 bans a percentage without a named source and I6
    restates it as the most commonly broken rule under time pressure.** Reword to the conditional, or
    drop.
17. **V5 and V9 checks on the live copy: clean.** Zero instances of `it is not X, it is Y`. Zero
    numeral-count paragraph openers. **One near-miss the rewrite must not convert into the tic:** "company
    taxation works differently in two ways that matter for cash flow". **V2 on keyword narration: clean**;
    no process narration found either.
18. **D1 risk in one paragraph.** The `Two Layers of Tax` H3 body runs without a figure, date, form name,
    deadline or named rule.

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgement.

### 7.1 THE NAMED MISSING-PHRASE LIST: the 14/28-day read is measured on THIS

**9 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case
and punctuation normalised.

**V1 IS BINDING AND THIS LIST IS BUILT TO IT.** Two word orders per idea per page, hard cap, counted as
**non-overlapping longest matches, never raw substrings**. Idea groups are stated so a QA agent can verify
the cap rather than assume it; any V1 finding must quote the spans it counted.

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `corporation tax rates 2026/27` | Currency of the rate map | 1 of 2 | Harvest, 140 vol, `r-m-t.co.uk` at position **15**. **The only live-year row in a 34-keyword family whose other year-tagged rows are all 2024 or 2024/25 at positions 69 to 81** (§3.3 point 3). Our `metaTitle` carries the year; the body never writes this word order. |
| 2 | `current corporation tax rate` | Currency of the rate map | 2 of 2 | Harvest, `current corporation tax rate uk` 320 vol at position 51. Currently zero. |
| 3 | `small profits rate` | The rate structure | 1 of 2 | Present **once**, inside a bullet's bold label. The market's term (incumbent H2 verbatim at §4.1: "Small Profits Rate: 19%") and it should appear in body prose and in the table caption too. |
| 4 | `corporation tax marginal relief` (as a single noun phrase) | The rate structure | 2 of 2 | Harvest, **720 vol at position 43**, held by a March-2023 page that never gives the fraction (§4.2). **The single most winnable row in the family.** We write `marginal relief` eight times and never with the qualifier the market uses. |
| 5 | `effective rate` shown by ARITHMETIC, in a worked example | The number in the band | 1 of 1 | **G1 is unmet** (§6.3 point 10). The page asserts ~26.5% and never derives it. Neither incumbent gives the fraction at all. **This is the page's biggest single content gap and its clearest differentiator.** |
| 6 | `9 months and 1 day` in a TABLE row with the CT600 deadline | Deadlines, in a scannable form | 1 of 1 | **L4 is unmet** (§6.3 point 9). The string appears 6 times in prose. A three-row deadline table with a caption stating the effective date satisfies L4 and F1 at once. |
| 7 | `two-year` (or `2-year`) as the s.198 fixtures-election deadline | The preventable loss | 1 of 1 | HP §7: the s.198 joint election has a **2-year time limit under s.201** and missing it "forfeits the buyer's fixtures allowances", described as "a common, preventable loss". Our page names the election and not the deadline. Absent from every competitor page fetched. |
| 8 | `40% first-year allowance` with `1 January 2026` in the same sentence | The FA 2026 changes | 1 of 2 | HP §7.A. Present but split across a bullet; F1 requires the effective date in the same sentence or the table caption. |
| 9 | `14%` writing-down allowance with `1 April 2026` in the same sentence | The FA 2026 changes | 2 of 2 | HP §7.A. Same defect as phrase 8. **No competitor page in the family carries either figure** (§5.2 point 3). |

**Countable test: 9 of 9 present.** Any other absent phrase is a named BLOCK.

**Explicitly NOT on this list, and the reason is on the record:**
- **`corporation tax rate` and `corporation tax rates`** (12,100 volume each). **DECLINED** at §4.6 theme
  1: best peer position anywhere is 60, family peer-winnable is 140 of 33,130, and STATE 2026-09-01 says
  content cannot close a 50-place gap on a national commercial head term. **No expectation is set against
  them at §8.**
- **`corporation tax rate calculator`, `corporation tax rates calculator`, `corporation tax marginal
  relief calculator`** (1,600 / 1,600 / 260). **DECLINED** at §4.6 theme 5: we have no such tool and a
  guide implying otherwise is a doorway page. Folded into the hub pack's §10.3 tooling observation.
- **`corporation tax rate scotland`, `corporation tax rates scotland`, `corporation tax rate for small
  companies`** (140 each). Held by `johnstoncarmichael.com` at positions 15 to 16, and **that domain is a
  §2b institutional non-peer, so those rows are excluded from peer-winnable by construction.** Corporation
  tax is a UK-wide tax with no Scottish variant; the Scottish rows are a brand-and-locality artefact and
  targeting them would mean writing a devolution section for a tax that is not devolved.
- **`corporation tax rate 2024`, `2024 25`, `2024/25`, `corporation tax rate changes`** (140 to 210 each,
  positions 69 to 81). **DECLINED as prior-year intent.** F2 requires the live year to lead, and a page
  chasing a 2024/25 keyword in 2026/27 would have to stack dated regimes, which F2 bans and which §4.5 of
  the hub pack measures as a live failure on `rsbc.uk`.
- **`s455`, `directors loan`, `dividend tax rate`, `family investment company`, `retained profit`.** Each
  belongs to a sibling page under §7.3.
- **The `associated company` control-and-attribution depth** (§4.6 theme 4). Declined with its reason:
  D4 says write to a clinician, not to a corporate tax specialist.

### 7.2 Equity preservation (§9.9 floor 5)

**There is nothing to preserve on either engine** (§2.4). No Google row, no Google query, no index entry,
no Bing trace. **The floor therefore reduces to link integrity and index eligibility, and it is stated at
the level it is measured at:**

| Gate | Endpoint | Pass condition |
|---|---|---|
| E1 | `scripts/medical_flat_link_audit.py` | **All existing internal inbound links to this URL still resolve.** These are the only discovery route Google currently has to a never-crawled page. **0 new broken links.** |
| E2 | GSC URL Inspection, 28-day read | `coverageState` is **not worse** than `Discovered - currently not indexed`. Specifically: it must not become `URL is unknown to Google`, `Excluded by robots.txt`, or canonicalised away to another URL. |
| E3 | Live fetch of the rendered page | `rel="canonical"` is **self**. STATE 2026-09-01 found **four live non-self canonicals** on this site inside an area a previous session had declared clean, so this is checked rather than assumed. |
| E4 | Sitemap | The URL is still emitted by `Medical/web/src/app/sitemap.ts`. **The D3 ruling of 2026-09-01 class-filters `DUPLICATE_REDIRECTS` out of the sitemap; this slug is not in that list and must not enter it.** |

**Countable test: E1 to E4 all pass at the 28-day read.**

### 7.3 Ownership budgets, countable

**This is the largest fencing job in wave C. Four whole blocks come out.**

| Fact | Owner | Budget on this page | Live count today |
|---|---|---|---|
| **IR35 and off-payroll for a locum PSC**: the three hirer types, the SDS, the April 2024 PAYE-offset change, the disagreement process | **O31**, wave D, **OWNER NOT YET NAMED** | **ZERO new sentences, and the existing block is HELD pending a conductor decision. See §9.6.** The writer must not choose an owner and must not silently delete a 218-word block whose destination does not exist yet. **The safe default is the one BATCH3_INDEX D11 used five times: set the allowance to zero and escalate.** | 1 H2 (218 words, 2 paragraphs), 1 FAQ, 11 occurrences of `IR35` |
| **The dividend rate map, the bands, the salary-versus-dividend decision** | **O34**, `/blog/salary-vs-dividend-medical-limited-company-2026` | **At most 1 sentence of exposition**, stating 10.75% / 35.75% / 39.35% with the 2026/27 tag and linking to the hub, **plus table cells** if the rewrite builds a two-layers table. **No band explanation, no comparison, no "worth re-running".** Per the §9.5 clarification, proposed not ratified. | 1 H3, 1 key takeaway, 1 FAQ, 1 bullet, 1 body clause. **Five places.** |
| **Whether to incorporate; the pros and cons; s.162 relief** | **O33**, `/blog/medical-practice-incorporation-step-by-step`; plus the FROZEN `/blog/gp-limited-company-tax-benefits-drawbacks` | **1 sentence, then link.** Both existing links stay; no third into the frozen set. | 1 H2 (`Is Incorporation Worth It for Your Private Work?`), plus the opening's link sentence |
| **The four-role employment-status fork** | **O35**, `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 2026-09-10**) | **1 sentence, then link. Never the four-role walk.** **BUT: the Type 1 Annual Certificate, the Type 2 self-assessment and Locum forms A and B are HP §2.C's and are legitimately this page's** where the sentence explains why company income is not pensionable. **The line: name the forms as the machinery NHS accrual runs through; do not walk the four roles and their returns.** | 1 paragraph walking all four roles |
| **Annual allowance, taper, threshold and adjusted income, carry-forward, pension input amount** | **O2**, `/calculators/nhs-pension-annual-allowance` | **1 sentence, then link. ZERO figures**: no £60,000, no £10,000, no £260,000, no £200,000. **This also disposes of the stale 2025/26 tag at §6.3 point 1 by removing the figures entirely.** The taper-management insight survives without them. | 1 paragraph with four figures and a stale year tag |
| **s.455, the director's loan account, s.458** | `/blog/consultant-directors-loan-account-s455-medical-company` | **1 sentence, then link.** The 35.75% rate may be named once, date-banded, as the reason not to use the loan account. | 1 H3, 1 key takeaway, 1 FAQ |
| Adjusted net income, £100,000 to £125,140, the 60% band | **O3**, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **1 sentence, then link. Never the explanation.** | 0. **Compliant. Keep it that way.** |
| Surplus cash, retained profit, BADR, trading status, the MVL | `/blog/surplus-cash-medical-limited-company-options` | **1 sentence, then link, or nothing.** | 1 occurrence of `retained profit`, in passing. **Compliant.** |
| The family investment company | `/blog/family-investment-company-doctors-consultants` | **Nothing, or 1 sentence and a link.** | 0. **Compliant.** |
| VAT: the healthcare exemption, the £90,000 threshold | **O17** and **O21-VAT**, `/blog/gp-vat-registration` (**FROZEN**) | **1 sentence, then link, or nothing.** | 0. **Compliant.** Cite `O21-VAT`, never `O21` (BATCH3_INDEX §6.1a collision 2). |

> **K1 WARNING, and it is specific to this page.** The fencing above removes two whole H2s, two H3s, three
> FAQ entries and two key takeaways. **K1 requires the drafted page's count of statutory references, form
> names, technical terms and figures to be greater than or equal to the live page's.** The removed blocks
> carry ITEPA references, the SDS, the s.455 rate, s.458, the annual allowance figures and s.162. **The
> replacement material named at §7.1 (the worked marginal-relief example, the deadline table, the s.198
> two-year limit, the FA 2026 dates) must be written, not merely planned, or the page will fail K1 by
> subtraction.** This is the one place in wave C where a careful writer could comply with the map and
> break the quality floor at the same time.

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

**The live page contains NO arithmetic at all. G1 is unmet.** If the worked example §7.1 phrase 5 requires
is written, **every figure must be re-derived from stated inputs by `arithmetic_recomputed[]`.**

**The marginal relief formula, from HP §5, for the writer's use:**
`CT = 25% x augmented profits, less (3/200) x (£250,000 - augmented profits)`, for profits between £50,000
and £250,000, with the limits divided by the number of associated companies and time-apportioned for
periods under 12 months.

**Two check values, computed by this pack on 2026-09-01, either of which the example may use:**
- **£120,000 of profit:** 0.25 x 120,000 = 30,000; relief = (3/200) x (250,000 - 120,000) = 1,950;
  **CT = £28,050**; effective rate **23.4%**.
- **£200,000 of profit:** 0.25 x 200,000 = 50,000; relief = (3/200) x (250,000 - 200,000) = 750;
  **CT = £49,250**; effective rate **24.6%**.

**And the marginal rate itself, which is the ~26.5% the page asserts and never shows:** on the pound above
£50,000, 25% less the relief withdrawn at 3/200 gives **25% + 1.5% = 26.5%**. Equivalently, CT on £51,000
is 0.25 x 51,000 - (3/200) x 199,000 = 12,750 - 2,985 = **£9,765**, against £9,500 on £50,000, a
difference of **£265 on £1,000, which is 26.5%**. **That derivation is the single most useful block this
page could carry and no competitor page in the family has it** (§4.1, §4.2).

**G-rule compliance for the example, stated so QA can score it:** **G2** places it immediately after the
rate H2, never in a terminal block. **G3** requires, in order, a one-line named persona with a role and a
rounded figure, the inputs, the arithmetic step by step, the result, and one sentence on what changes the
answer. **G4** requires a role and an initial only, explicitly illustrative ("Dr B, a consultant whose
private company made £120,000"), never a real or realistic named individual. **G5** requires the profit
figure to be rounded and illustrative while **every rate traces to house positions** and has already been
stated in the body with its year. **G6** forbids the heading being the words "Worked example" and forbids
a "Worked example:" prefix; the corpus already contains that string in 13 files. **G7** caps it at 80 to
200 words. **Note the known G7-versus-C2 collision** (batch-3 pack defect 5): a compliant example will
split across paragraphs and QA must not read the split as a missing component.

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| CT **19%** to £50,000, **25%** over £250,000, marginal relief between, standard fraction **3/200**, effective marginal rate **~26.5%** | financial year from 1 April 2026 | HP §5, gov.uk re-verified 2026-08-26 |
| Limits divided by associated companies; time-apportioned for periods under 12 months | | HP §5; CTA 2010 Part 3 ss.18 to 19 |
| **9 months and 1 day** payment; **12 months** CT600; instalments for large companies, broadly over **£1.5 million** | | live page, standard CT machinery |
| **AIA £1,000,000**, permanent, cars excluded | | HP §7 |
| Main-rate **WDA 18% to 14%** for relief **from 1 April 2026 (CT) / 6 April 2026 (IT)**, hybrid time-apportioned rate for a straddling period; **special rate 6%** | | HP §7 and §7.A; **FA 2026 s.28** |
| **40% first-year allowance** on new, unused, not second-hand main-rate plant **from 1 January 2026**; excludes cars; full expensing companies-only | | HP §7.A; **FA 2026 s.29** |
| **CAA 2001 s.198 / s.199** fixtures election; **s.201** 2-year time limit; s.187A | | HP §7 |
| **Mileage 55p** first 10,000 business miles, **25p** thereafter | 2026/27, from 6 April 2026 | HP §8 |
| Employer secondary Class 1 NIC **15%** above the **£5,000** secondary threshold; **Employment Allowance £10,500**, not available to a sole-director company | 2026/27 | HP §5. **One sentence at most; the salary decision is O34's.** |
| Dividend **10.75% / 35.75% / 39.35%**, allowance **£500** | 2026/27, FA 2026 s.4 | HP §5. **One sentence plus table cells only** (§7.3, §9.5). |
| s.455 at **35.75%** on loans made on or after 6 April 2026, **33.75%** on loans made in 2025/26 or earlier; s.458 relief deferred | | HP §5. **One sentence only, then link.** |
| MTD for ITSA: **£50,000 from 6 April 2026**, £30,000 from 2027, £20,000 from 2028; **limited companies out**; partnerships deferred with no date | | HP §9 |
| The corrected NHS-contract wording, unpinned form | | **HP §2.C correction, 2026-08-26** |
| Type 1 Annual Certificate of Pensionable Profits; Type 2 self-assessment; Locum forms A and B | | HP §2.C |
| GMC retention fee **deductible, no figure**; indemnity; List 3 subscriptions; CPD; home office | | HP §8, §10, §12 |

**BANNED FIGURES on this page. None of these may be asserted:**

| Banned | Why | What the page does instead |
|---|---|---|
| **Any annual allowance figure**: £60,000, the £10,000 floor, £260,000, £200,000 | **O2**, and it disposes of the stale 2025/26 tag at §6.3 point 1 at the same time. | One sentence: a company pension contribution is capped by the annual allowance, which can be tapered, then the link. **Zero figures. The taper-management insight survives without them.** |
| **`2025/26` used as the current year, anywhere** | **F1 and F2**, and it is live twice (§6.3 points 1 and 2). The live year is **2026/27**. | 2026/27 leads. 2025/26 appears only as a labelled prior-year clause. |
| **Any explanation of the dividend BANDS or the salary-versus-dividend comparison** | **O34.** | One sentence with the three rates and the year, plus the link. |
| **Any IR35 or off-payroll content, new or retained, pending the §9.6 decision** | **O31**, owner not yet named. | **Zero new sentences. The existing block is held and escalated, not deleted and not expanded.** |
| **Any incorporation-decision content**: the drivers, the headline saving, s.162 relief, the step sequence | **O33.** | One sentence, then link, to both existing targets. |
| **The four-role employment-status walk** | **O35** (FROZEN owner). | One sentence, then link. **The certification form names stay** (HP §2.C). |
| **Any 60% effective rate; any explanation of the £100,000 to £125,140 personal-allowance withdrawal** | **O3.** | One sentence, then link. Currently zero, which is correct. |
| **Any GMC annual retention fee figure** | **O9. UNVERIFIED**: the GMC fees page and the 2026 Registration Fee Regulations both return HTTP 403 to automated fetch, and the previously stated "around £433" was **removed as unsupported** on 2026-08-26. F5, as narrowed by the O10 ruling to the GMC fee alone. **The live page is already compliant: it names the fee as deductible with no figure. Keep it that way.** | "The GMC annual retention fee is deductible", with no amount. |
| **"a limited company cannot hold a GMS or PMS contract", stated flat** | **HP §2.C correction, 2026-08-26.** NHS Act 2006 s.86(1)(c) permits a company limited by shares meeting the s.86(3) shareholder conditions. **The flat claim had propagated to five pages and is still live on 39 further Medical blog posts and 6 page files.** | The unpinned form the live page already uses. **See §7.7 rule 5: do not tighten the citation either.** |
| **`s.86(3)` cited on a sentence that covers GMS and PMS together** | **HP §2.C, second correction, 2026-08-26.** s.86 is the GMS contracting power; **PMS agreements are made under s.92** with the detail delegated to s.94 regulations that nobody has read. **Attaching the GMS subsection to both is a smaller version of the same over-claiming defect.** | Cite s.86(3) only where the sentence is about GMS alone; otherwise use the unpinned accurate form. **Never assert a specific PMS shareholder test.** |
| **Any BADR rate, TAAR reference, trading-status test or MVL figure** | The surplus-cash satellite's. | One sentence at most, then link. |
| **Any Scheme Pays deadline** | **O4.** `/blog/nhs-pension-scheme-pays-doctors-deadlines` is prepared separately and is not this batch's at any date. **This is the exact fact that broke batch 1.** | Nothing. |
| **"most incorporated GPs draw dividends in the higher-rate band"** or any similar population claim | **F6 and I6**: no percentage and no "most X" without a named source. Live at §6.3 point 16. | State the conditional: a doctor whose NHS income already fills the basic-rate band faces the upper rate on company dividends. |
| **Any statement that a GP practice can claim the Employment Allowance** | **HP §8.A**: HMRC NIM06530 lists GP services as functions of a public nature, so a practice normally **cannot**. **This page is about a private company, which is excluded by the sole-director rule instead.** The two reasons must not be swapped. | State the sole-director exclusion if the salary sentence needs it. Say nothing about practices. |
| **A flat 18% main-rate WDA for periods after April 2026, or a special rate of 4%** | HP §7.A names both as false. | 14% with its date, hybrid for a straddling period; special rate 6%. |
| **Any claim that AIA "reverts to £200,000"** | HP §7: **£1m is permanent** (CAA 2001 s.51A(5), made permanent by F(No.2)A 2023 s.8) and any reversion framing is stale. | £1m, permanent. |
| **Any pricing, fee or fee range** | I5. | Nothing. |
| **Any named individual, credential, byline or "reviewed by"** | I2. | Nothing. |

**Countable test: count of banned-figure assertions on the page = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| CT 19% / 25% / 3/200 / ~26.5%, FY from 1 April 2026 | https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax ; CTA 2010 Part 3 ss.18 to 19 ; HP §5 |
| AIA £1,000,000, permanent, cars excluded | https://www.gov.uk/capital-allowances/annual-investment-allowance ; CAA 2001 s.38A, s.51A ; HP §7 |
| Main-rate WDA 14% from 1 April 2026 (CT) / 6 April 2026 (IT), hybrid straddling rate | **FA 2026 s.28** https://www.legislation.gov.uk/ukpga/2026/11/section/28/enacted ; CAA 2001 s.56 ; HP §7.A |
| 40% FYA on new unused main-rate plant from 1 January 2026 | **FA 2026 s.29** https://www.legislation.gov.uk/ukpga/2026/11/section/29/enacted ; HP §7.A |
| Special rate 6%; s.198 / s.199 election; **s.201 two-year limit**; s.187A | CAA 2001 ; HP §7 |
| Mileage 55p / 25p for 2026/27 | https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances/travel-mileage-and-fuel-rates-and-allowances ; HP §8 |
| Dividend 10.75% / 35.75% / 39.35%, £500, 2026/27 | https://www.gov.uk/tax-on-dividends ; **FA 2026 s.4** https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted ; HP §5 |
| s.455 / s.458 | https://www.legislation.gov.uk/ukpga/2010/4/section/455 ; HP §5 |
| Employer NIC 15% above £5,000; Employment Allowance £10,500 and the sole-director exclusion | https://www.gov.uk/claim-employment-allowance ; HP §5 |
| MTD for ITSA thresholds and dates; **limited companies out**; partnerships deferred | https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax ; HP §9 |
| **NHS Act 2006 s.86(1) and s.86(3)** (GMS contracting power and shareholder conditions) | https://www.legislation.gov.uk/ukpga/2006/41/section/86 ; **HP §2.C correction, 2026-08-26** |
| **NHS Act 2006 s.92 and s.94** (PMS agreements: no categories named, detail delegated to regulations **nobody has read**) | https://www.legislation.gov.uk/ukpga/2006/41/section/92 ; **HP §2.C. Do not assert a PMS shareholder test.** |
| Type 1 Annual Certificate; Type 2 self-assessment; Locum forms A and B | PCSE, https://pcse.england.nhs.uk/services/gp-pensions/ ; HP §2.C |
| Company income and dividends not NHS-pensionable | HP §2.C |
| GMC retention fee **deductible, amount UNVERIFIED** (GMC returns HTTP 403 to automated fetch) | HP §8 and the Verification log. **No figure may be stated.** |
| CT600 filing and payment deadlines; the £1.5m instalment threshold; the £100 late-filing penalty | **gov.uk corporation tax pages. Not in house positions; verify at source before restating.** §10.3. |

**Countable test: every external factual claim maps to a row above. Count of unverified claims = 0.**

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug gp-corporation-tax` | **The covered set is empty on both engines** (§2.4), so this reduces to "no regression" and the real gate is floor 6 |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | **The live page has none.** Every figure in the new worked example (§7.4) must re-derive from stated inputs at the real rates |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified, **including the CT deadline row that house positions does not cover** |
| 4. Link resolution | **`scripts/medical_flat_link_audit.py`**, then `predeploy_gate.py` | 0 HARD 404s. **Medical is FLAT-ROUTING: `slug_resolver.py` HARD-REFUSES it and must not be used.** Existing internal targets confirmed present as markdown files 2026-09-01: `gp-limited-company-tax-benefits-drawbacks` (**frozen**), `medical-practice-incorporation-step-by-step`, `nhs-pension-annual-allowance-complete-guide` (**frozen**), `gp-pension-contributions-tax-relief` (**frozen**), `locum-doctor-ir35-what-you-need-to-know`, `private-practice-tax-nhs-and-private-income`, `gp-accountant`, plus the TSX routes `/services` and `/contact`. New links must resolve to `salary-vs-dividend-medical-limited-company-2026`, `surplus-cash-medical-limited-company-options`, `consultant-directors-loan-account-s455-medical-company`, `adjusted-net-income-doctors-60-percent-tax-trap`, `gp-partner-vs-salaried-gp-tax-comparison` (**frozen**) and `/calculators/nhs-pension-annual-allowance`, **all confirmed present 2026-09-01.** |
| 5. Equity preservation | §7.2 | **E1 to E4 all pass.** On this page the floor is link integrity and index eligibility, not position |
| 6. Cluster coverage | §7.1 | **9 of 9** phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed.** The corporation tax family is not a dossier §4 row. Ledger unchanged. |
| 8. Competitor re-read | §4.6 | **13 themes, 13 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere, including frontmatter. Live count **0**, must stay 0. I1, hard fail.
2. **`slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block and `altText` are
   byte-identical.**
3. **No collapse, no redirect, no URL change.** K4. **And E4: the slug must not enter `DUPLICATE_REDIRECTS`.**
4. **Do not touch any frozen page.** The 19 slugs of §1.2. **Contextual links to their live URLs are
   fine** and four already exist.
5. **The NHS-contract sentence is a trap in both directions.** Never write "a limited company cannot hold
   a GMS or PMS contract" flat (the claim is false and is still live on 39 further Medical posts), **and
   never tighten the citation by attaching s.86(3) to a sentence covering GMS and PMS together** (s.86 is
   GMS only; PMS runs under s.92 and s.94, and nobody has read the s.94 regulations). **The live wording
   is correct. Leave it alone.**
6. **Never state a GMC annual retention fee figure.** O9, F5. The live page is compliant.
7. **No Scheme Pays deadline anywhere.** O4.
8. **Never tell a GP practice it can claim the Employment Allowance.** HP §8.A. Not this page's subject.
9. **C4: `we`, `our`, `us` at 3 or fewer per 1,000, and none in the opening block or any H2.** Live figure
   3.8, clustered in the closing paragraphs. **REFRAME permits fixing it; the single end-of-page CTA stays
   (D3).**
10. **C3: `you` and `your` at 12 to 25 per 1,000.** Live figure **14.6, which PASSES.** **The rewrite must
    not lose it while removing four blocks.** This is the one page in the set where the voice is right and
    the risk is regression rather than repair.
11. **B4: 50% to 75% of H2s are question-form.** Live figure 1 of 8, and 0 of 6 after fencing.
12. **L4: at least one table, with a caption stating the effective date.** Live count **0**.
13. **G1: exactly one worked example.** Live count **0**. §7.4 gives the arithmetic and the G-rule
    compliance list.
14. **A5: the opening block runs 40 to 90 words, hard ceiling 120.** Live figure 104.
15. **One CTA, at the end of the page only** (D3).
16. **No interruptive UI** (I7). BATCH3_INDEX **D6**: `DeepScrollModal` and `ReturningBar` are already
    mounted on every route in `Medical/web/src/app/layout.tsx`. **They pre-date this work and no page in
    this wave touches them.**
17. **One change per page per window** (§9.3).
18. **Do not narrate our own process to the reader** (V2 as extended by conductor ruling 3, 2026-08-26).
    Write "the detail sits on X" and link it; never anything resembling "this is covered on our other page
    because that page owns this topic". **This matters more here than anywhere in the wave, because four
    blocks are being replaced by handoffs and four handoffs are four chances to narrate the map.**
19. **V5 and V9 style caps, whole wave.** `it is not X, it is Y`: **once per page maximum, prefer zero.**
    The numeral-count paragraph opener: **once per page maximum, prefer zero.** The **self-announcing
    sufficiency claim** ("the point is worth labouring") is the fourth burned shape, from batch 3's round-3
    QA. Live copy carries zero of all three and one near-miss of the second (§6.3 point 17).
20. **Heading case is a wave-level decision, not this writer's.** This page is title case; both siblings
    are sentence case; all three sit in the same category hub. **Recorded for the conductor at §10.5.**

---

## 8. Stated expectation

**Written before the work so the later read has something to fail. This page's expectation is the most
constrained of the three and the constraint is stated rather than smoothed.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC Search Analytics, dimension `page` | 2026-06-03 to 2026-09-01 (90d) | **no row. 0 clicks, 0 impressions, no position.** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows** |
| Google | GSC URL Inspection | 2026-09-01 | **NEUTRAL. `Discovered - currently not indexed`. `lastCrawlTime` NULL: never fetched.** |
| Bing | `GetPageStats`, **page level** | 2026-05-17 to 2026-08-30 | **Absent from all 329 rows / 80 distinct URLs.** No trace above the top-N floor. |
| Bing | `GetPageQueryStats`, **named-query level** | full `https://www.` URL passed | **0 rows** |

### 8.2 THE EXPECTATION, and Bing comes first

**Bing, 14 and 28 days, primary, and it is the only engine with a genuine chance here.** STATE 2026-09-01:
Bing out-clicks Google **3.3x** on this site (360 against 108 over 90 days on near-identical impression
counts), Bing surfaces ~80 pages against Google's 23, and **Bing has no poor-position family at all**:
every query the site earns on Bing, it earns at position 2 to 10. **Bing's constraint here is surface, not
rank**, and unlike Google there is no evidence that Bing has failed to fetch this URL (§2.3 point 3).

1. **At the 28-day read, this URL returns at least one `GetPageStats` row.** Today: zero. **This is the
   page's primary test.**
2. **If it appears, at least 2 of the 9 §7.1 phrases return a `GetPageQueryStats` impression** for this
   URL. Today: zero of nine. **The two most likely are phrases 1 and 4** (`corporation tax rates 2026/27`,
   `corporation tax marginal relief`), because those are the two rows in the family where a current,
   computing page has an actual opening (§3.3 points 3 and 5).
3. **Stated with low confidence and the reason given: `GetPageStats` is top-N.** A page can gain Bing
   impressions and remain invisible because it did not reach the top 80 by traffic. **A miss on test 1 is
   weak evidence and must not be read as a failed rewrite.**

### 8.3 Google: NO POSITION PROMISE IS MADE, and here is why in one line

**Google has never fetched this URL** (§1.1). §5.3 of the rollout runbook and STATE 2026-09-01 both say
content cannot be promised a Google lift on this domain, and on a never-crawled page that is not a
caution, it is an arithmetic fact: **there is no position to move.**

**Two observations are recorded, both explicitly as observations rather than targets:**

4. **`coverageState` at the 28-day read.** Any movement from `Discovered - currently not indexed` toward
   `Crawled - currently not indexed` or `Submitted and indexed` is recorded. **No target is set**, and
   **STATE's own repeatability finding applies**: the same sweep run twice twenty minutes apart moved six
   URLs across the discovered-versus-unknown boundary, so a single reading of that field is noisy and only
   a move to a crawled or indexed state is meaningful.
5. **Any first Google impression at all**, at any position, by day 90. Baseline zero. **Recorded as an
   event, not scored as a target.**

**The honest framing for the later read.** If this page earns nothing on Google in 90 days, **that is the
expected outcome and it says nothing about the rewrite.** STATE's Layer 1 finding is that 87% of the
corpus earns nothing from Google because Google has not taken it, and that **content added to that pile
earns on Bing and nothing on Google until authority moves.** This page is in that 87%.

**The one lever that would change it is not a content lever.** STATE names **IndexNow** as the
highest-value remaining step on this site, precisely because Bing learns quickly from it, and records that
**it has never been submitted**. It is **owner-triggered and was not done by this task** (§10.3).

### 8.4 What would count as a FAIL that is not a loss

**Per §9.6 point 2, Bing impressions appearing on queries unrelated to the 9 named phrases, while the 9
stay unmatched, is DRIFT and is recorded as a FAIL, not a pass.**

### 8.5 Failure triggers, written as numbers, before the change

**This page has no equity, so its triggers are integrity triggers rather than loss triggers.** That is
stated plainly because a reader comparing the three packs will notice this one has no position trigger and
should know the reason.

> **TRIGGER 1, index eligibility.** If at the 28-day read the URL Inspection `coverageState` has moved to
> **`URL is unknown to Google`**, or the live page's `rel="canonical"` is **not self**, or the URL has
> left the sitemap, **stop and diagnose before any further change.** STATE 2026-09-01 found four live
> non-self canonicals inside an area a previous session had declared clean, caused by a
> `generateMetadata()` omission on a single route. This is not a theoretical check.

> **TRIGGER 2, internal links.** If `scripts/medical_flat_link_audit.py` reports any inbound link to this
> URL broken after the change, revert:
> `git checkout <sha derived at write time> -- Medical/web/content/blog/gp-corporation-tax.md`
> On a never-crawled page the internal links are the only discovery route that exists.

> **TRIGGER 3, quality floor, and it is the one most likely to fire.** **K1: if the drafted page's count
> of statutory references, form names, technical terms and figures is LOWER than the live page's, the page
> is held and not deployed.** §7.3's fencing removes two H2s, two H3s, three FAQs and two key takeaways.
> **This is the specific way this page could fail: by complying with the ownership map and shrinking below
> its own quality floor.** The replacement material at §7.1 must be written, not planned.

> **TRIGGER 4, wave-level and it is the conductor's.** If wave C's editorial QA raises a **V1, V3 or V5
> finding on three or more pages**, the wave has reproduced the batch-1 defect the index exists to prevent
> and its pages are **held rather than deployed** (BATCH3_INDEX §8).

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **9 missing
phrases of §7.1**, and **not** with `corporation tax rate` or `corporation tax rates`, which are declined
at §4.6 theme 1. **`monitored_pages` registration is a separate owner-triggered step and has NOT been done
by this task**, so this page carries no armed window and the tests above have nothing scoring them until
the owner arms them. **No monitor, alert, cron, email or scheduled job was created.**

---

## 9. The ownership map, reproduced

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and
a link, never the explanation. A writer who needs three sentences is taking someone else's fact and must
stop.**

**V7 IS BINDING: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the map,
states neither fact, and reports the conflict.

### 9.1 THE ROW THAT MAKES THIS PAGE A SATELLITE

| # | Shared fact | **Owner** | **What THIS page does** |
|---|---|---|---|
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary **10.75%**, upper **35.75%**, additional **39.35%**, allowance **£500**) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **One sentence, then link**, plus table cells under the §9.5 clarification. **Live count is five places including a whole H3; §7.3 sets the budget.** |

### 9.2 WHAT THIS PAGE OWNS ANYWAY, and it is the majority of the page

**A satellite for one fact is not a satellite for its own subject.** No O-row currently names an owner for
corporation tax, and this page is the only surface on the site that carries it. **Proposed as row O40 at
§9.6 so the map is complete rather than silent:** the CT rate map and marginal relief for a medical
company, associated companies, payment and filing, capital allowances including the FA 2026 changes and
the s.198 election, allowable expenses as they reduce taxable profit, and the NHS-pension consequence of
routing income through a company.

### 9.3 THE ROWS THAT CONSTRAIN THIS PAGE

| # | Shared fact | **Owner** | **What THIS page does** |
|---|---|---|---|
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link. ZERO figures.** Live breach in one paragraph, with a stale 2025/26 tag inside it (§6.3 points 1 and 6). REFRAME permits the fix. |
| **O3** | Adjusted net income, the **£100,000 to £125,140 taper**, the **60% band**, HICBC | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **One sentence, then link. DO NOT RESTATE THE 60% BAND.** Live count zero. **Compliant, keep it so.** |
| **O4** | Scheme Pays: two-limb election, mandatory versus voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **No batch-3 page states a Scheme Pays deadline.** `/blog/nhs-pension-scheme-pays-doctors-deadlines` is prepared separately and is not this batch's at any date. **This is the exact fact that broke batch 1.** |
| **O9** | GMC annual retention fee: deductible, **amount UNVERIFIED** | `house_positions.md` §8 and the Verification log | **No page states a GMC fee figure.** F5, as narrowed by the O10 ruling of 2026-08-26 to the GMC fee alone. **Live page compliant.** |
| **O31** | **IR35 and off-payroll for locum doctors**: the three hirer types, who issues the SDS, the April 2024 PAYE-offset change | **Wave D, ONE page only, TO BE NAMED when D is scoped against the unfrozen hub.** The row deliberately carries a placeholder owner rather than a guess. | **ZERO new sentences, and the existing 218-word H2 is HELD, not deleted. See §9.6: this needs a conductor decision and the writer must not make it.** |
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed, not automatic, from 6 April 2026 per FA 2026 s.39), the step sequence, the pension-accrual loss | `/blog/medical-practice-incorporation-step-by-step` (**named 2026-09-01 by the D3 ruling**) | **One sentence, then link.** Live breach at whole-H2 scale. Both existing links stay; no third into the frozen set. |
| **O35** | The employment-status fork for doctors (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work) | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 2026-09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** Live breach in one paragraph. **The certification form names are HP §2.C's and stay** (§7.3). |
| **O17** / **O21-VAT** | The VAT healthcare exemption; the £90,000 registration and £88,000 deregistration thresholds | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` | Not needed. Live count zero. **Cite `O21-VAT`, never `O21`** (BATCH3_INDEX §6.1a collision 2). |
| **O16** | Practice-ownership economics shared with veterinary | the existing GP and private-practice corpus | Unchanged; not engaged here. |

### 9.4 THE SIBLING ROWS THIS PAGE MUST NOT ANNEX

| Fact | Owner | This page's budget |
|---|---|---|
| Surplus cash, retained profit, BADR trading status, the MVL, the anti-phoenix TAAR, investing inside the company | `/blog/surplus-cash-medical-limited-company-options` | **1 sentence, then link, or nothing.** Live count: compliant. |
| s.455, the director's loan account, the beneficial-loan benefit in kind, s.458 | `/blog/consultant-directors-loan-account-s455-medical-company` | **1 sentence, then link**, with the 35.75% rate named once and date-banded. Live count: three places. |
| The family investment company | `/blog/family-investment-company-doctors-consultants` | **Nothing, or 1 sentence and a link.** Live count: compliant. |

### 9.5 PROPOSED CLARIFICATION TO O34

**Identical text in all three packs in this set.**

**The problem.** O34's consequence column says the satellites get "one sentence, then link". Read
literally, that forbids this page's two-layers-of-tax section from stating the dividend rate the second
layer consists of. **This is the same self-contradiction O24 was corrected for on 2026-08-26**, where the
shared-fact column awarded a fact and the consequence column applied the cap reserved for pages that do
not own it.

**Proposed operative text, and this pack is written to it.** O34 owns the **explanation**: what the rates
are, which band a dividend lands in, how the split is decided, and why the 6 April 2026 rise moved the
answer. A satellite may:

1. state the three 2026/27 rates **once**, in one sentence, with the year tag and a link to the hub; and
2. **use those rates as inputs in its own worked example and table cells**, because **G5 requires that
   every rate an example uses has already been stated in the body with its year.**

**A satellite may NOT** explain the bands, the allowance mechanics, the salary decision, the employer NIC
interaction or the comparison between the two routes.

**Countable for this page: at most 1 sentence of dividend-rate exposition, plus table cells.** Until the
clarification is ratified the writer holds to that budget and reports the conflict.

### 9.6 THE DECISION THIS PACK NEEDS: an O31 block, on a page whose owner does not exist yet

**This is the pack's single largest ownership finding and the writer must not resolve it.**

**The situation.** `gp-corporation-tax` carries an H2, `IR35 and Corporation Tax for Locum Companies`, of
**218 words across two paragraphs**, plus FAQ 5, plus **11 occurrences of `IR35`**. It covers the three
hirer types, who determines status, the disagreement process, that IR35 has not been abolished, and that a
locum can hold a mix of determinations. **All of that is O31's.**

**Why it is not a simple deletion.** **O31 has no owner.** BATCH3_INDEX §6.2 says in terms that the row
"is deliberately left with a placeholder owner rather than guessed, because naming it now would be naming
it without reading the frozen hub", and that four surfaces currently carry the fact. **Wave D cannot start
before 2026-09-11** because `locum-doctor-tax-complete-guide`, the natural hub of the family, is frozen
until 2026-09-10.

**So a wave-C writer faces a fact that belongs to a page nobody has named, in a wave that cannot start for
ten days.** Three options and none is obviously right:

1. **Delete the block and link to `/blog/locum-doctor-ir35-what-you-need-to-know`**, which the page already
   links to. **Risk:** that page is one of four wave-D surfaces competing on this topic and it may not be
   the one wave D names as O31's owner. A link written now could point at a page that is later
   de-scoped, and the deletion cannot easily be undone once wave D re-plans around it.
2. **Keep the block unchanged and escalate.** **This is the safe default and it is the one BATCH3_INDEX
   D11 applied five times**, on the reasoning that a page left internally inconsistent for one window is
   better than an equity risk taken on a guess. **Cost:** the page ships with a known 218-word O31 breach
   and wave D inherits it.
3. **Reduce the block to one sentence with no link**, then let wave D add the link when it names the
   owner. **Cost:** a handoff with no destination is a dangling reference, and D1 penalises a claim with
   nowhere to go.

**RECOMMENDATION, and it is a recommendation and not a decision: option 2, with a named addendum.** The
page is REFRAME, so the writer *may* delete; but the map's whole purpose is that a fact lands on one named
page, and there is no name. **Deleting into a vacuum is the one move that cannot be corrected cheaply
later.** The block stays, the writer adds nothing to it, the pack records it, and **wave D's conductor
resolves it in the same pass that names O31's owner.**

**The conductor decides. The writer sets the allowance to zero either way** (§7.3), which is compliant
under all three options.

### 9.7 A PROPOSED NEW ROW

> **PROPOSED O40. Corporation tax for a medical company.**
> **The gap:** the ownership map has no row for corporation tax, so this page's own subject is unowned and
> any later page could take it. Named here so the map is complete rather than silent, in the same way O36
> was folded in from ruling D18 on 2026-09-01.
> **PROPOSED OWNER: `/blog/gp-corporation-tax`**, covering the CT rate map and marginal relief, associated
> companies, payment and filing deadlines, capital allowances for a medical company including the FA 2026
> changes and the s.198 election, and allowable expenses as they reduce taxable profit.
> **Everyone else: one sentence, then link.** In particular the hub and the surplus-cash satellite both
> need the 19% rate as a worked-example input and both packs set that budget explicitly (their §7.3).
> **Not ratified.** The hub and surplus-cash packs carry the two companion proposals, O37 and O38, plus
> O39; this pack carries O40 and the O31 decision at §9.6.

### 9.8 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. Batch 2's O7 split was ratified precisely because
two writers converged on the same boundary independently and said so. The opposite signal, one writer
quietly annexing another's fact, is what V3 exists to catch.

### 9.9 Batch-level style watch (V5 and V9), and it is the CONDUCTOR's job

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering
   across the wave, is named in that wave's fix pass, whatever it is.** Conductor's job; invisible from
   inside one page.
2. **Named and already burned:** `it is not X, it is Y` (cap **once per page**, wave-wide); the
   **numeral-count paragraph opener** (cap **once per page**, wave-wide, prefer zero); and the
   **self-announcing sufficiency claim** ("the point is worth labouring", "one line is enough here"), the
   fourth shape found by batch 3's round-3 QA.
3. **The live copy carries zero of all three and one near-miss of the second** (§6.3 point 17), so the
   budget is available and the correct spend is still zero.
4. **V1 hard cap: two word orders per idea per page, counted as non-overlapping longest matches, never raw
   substrings.** §7.1 is built to this and states its idea groups.
5. **V2 is a live standard**, extended by conductor ruling 3 of 2026-08-26 to any narration of our own
   process. **This page has four handoffs to write and four chances to break it** (§7.7 point 18).
6. **A wave-level item only the conductor can see: heading case.** This page is title case, both siblings
   are sentence case, all three sit in one category hub. §10.5.
7. **V7: where a conductor's brief and this map disagree, THE MAP WINS.**

---

## 10. Corrections, findings and open items

**Six. None was acted on. Nothing outside this file was written.**

### 10.1 TWO STALE YEAR TAGS ON THE LIVE PAGE, both against house positions

**These are this pack's `house_positions.md` contradictions and both are live today.**

**(a) "The annual allowance is £60,000 for 2025/26."** The live tax year is **2026/27**. HP §2.B and the
verification log record the annual allowance, the £200,000 threshold-income limit and the £260,000
adjusted-income limit as **verbatim identical for "2026 to 2027" and "2025 to 2026"** at
https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates,
read 2026-08-26. **So the figure is right and the tag is stale**, which is the exact pattern the
2026-08-26 currency pass found across house positions itself: "the figures were right but the year tags
were stale". **F1 and F2 both fail.**

**The fix is not a re-tag.** The sentence also breaches **O2**, so §7.3 removes the figures entirely and
the tag problem disappears with them.

**(b) "At 2025/26 rates the pure tax saving from incorporating private medical work is often modest."**
HP §5's headline point is written for 2026/27 and its writing rule is explicit: the dividend-rate rise
that took effect on 6 April 2026 "has already narrowed it (**write this as a change that has happened, not
one that is coming**)". **A page whose `metaTitle` reads `GP Corporation Tax Rates 2026/27` and whose
closing section reasons from 2025/26 rates is internally inconsistent.** F2 fails.

**This sentence also sits inside the O33 breach** (§6.3 point 4), so §7.3 removes it too.

**Both are recorded rather than fixed, because a pack does not edit the corpus.**

### 10.2 What is NOT wrong on this page, recorded so nobody re-raises it

Three things a QA agent will reach for and should not:

1. **The NHS-contract wording is correct and is the corrected form.** Key takeaway 1, the opening
   paragraph and FAQ 2 all use the **unpinned** version HP §2.C requires where a sentence covers GMS and
   PMS together. **That correction landed on 2026-08-26 and the flat wrong claim is still live on 39
   further Medical blog posts and 6 page files.** This page is on the right side of it. **Leave it, and do
   not tighten the citation** (§7.7 rule 5).
2. **The GMC retention fee is named as deductible with no figure**, which is exactly what O9 and the
   narrowed F5 require.
3. **The capital allowances block is fully current** against HP §7 and §7.A: AIA £1m permanent, WDA 14%
   from 1 April 2026 with the straddling hybrid, special rate 6%, the 40% FYA from 1 January 2026, full
   expensing companies-only. **No competitor page fetched carries any of it.**

### 10.3 Two gaps this page depends on, and neither is this writer's to close

1. **The CT filing and payment machinery is not in `house_positions.md`.** The 9-months-and-1-day payment
   date, the 12-month CT600 deadline, the £1.5 million instalment threshold and the £100 late-filing
   penalty are all on the live page, all correct as far as this pack can tell, and **none traces to house
   positions**, which F4 requires of every load-bearing figure. **Recommendation: a short house position,
   or the writer verifies each at gov.uk and cites it.** §7.5 carries it as a must-verify row.
2. **IndexNow has never been submitted for this site, and this page is the clearest case for it.** STATE
   2026-08-26 names IndexNow as "the highest-value remaining step, because Bing out-clicks Google 3.4x
   here and IndexNow is how Bing learns quickly", and records that nothing was submitted. STATE 2026-09-01
   confirms nine new URLs went live on 26 August and none has earned a Google impression, noting "they are
   six days old and IndexNow was never submitted". **This page has never been crawled by Google at all**
   (§1.1). **IndexNow is owner-triggered and was NOT done by this task**, and this pack does not propose
   doing it; it records the connection so the owner can see what the step would be worth.

### 10.4 A finding handed to another page's owner: two peers publish a 32.5% s.455 rate

`sandisoneasson.co.uk`, **a medical-specialist peer** (navigation: Hospital Consultants, GP-Practice,
GP-Federations, GP-Locums), states on a page dated **Sep 2020** that HMRC charges tax on an unrepaid
director's loan at **32.5%**, and gives the HMRC official rate of interest as 2.25% (§4.5, HTTP 200). It
holds `directors loan` (2,900 volume) at position 26 and `directors loan account` (1,000) at 18.
`taxqube.co.uk`, published 2022-02-19 and holding `s455 tax` (1,900) at position 19, says the same
verbatim: **"the S455 charge is calculated as 32.5 percent of the outstanding balance"** (HTTP 200).

**32.5% is three rate generations stale**; the current rate is **35.75%** on loans made on or after
6 April 2026 and 33.75% on loans made in 2025/26 or earlier (HP §5).

**This is s.455's owner's finding.** It is passed to
`/blog/consultant-directors-loan-account-s455-medical-company`, which is REFRAME and carries **13 Google
impressions at position 9.69**. **This page states the rate once, date-banded, and links** (§7.3).

### 10.5 A wave-level inconsistency only a conductor can settle: heading case

`gp-corporation-tax` uses **title case** throughout its headings (`GP Corporation Tax Rates 2026/27`,
`Profit Extraction: Salary, Dividends and Pension`). Both siblings use **sentence case**
(`Setting the director's salary`, `Why surplus cash builds up in a medical company`). **All three sit in
the same `Incorporation & Company Structures` category hub and will be seen together.**

The language spec does not rule on case, so this is not a defect. **It is a wave-level consistency
decision and it belongs in wave C's fix pass, not in one writer's judgement.** Recorded so the conductor
sees it before three writers make three different choices.

### 10.6 Wave-C ownership: the consolidated list

**All three packs in this set carry the same list, so a conductor sees it once whichever pack it reads.**

1. **O34 clarification** (§9.5): a satellite may state the three 2026/27 dividend rates once with a link,
   and reuse them as inputs in its own worked example, because G5 forbids an example using a rate the body
   has not stated.
2. **PROPOSED O37** (hub pack §9.6): the employer pension contribution, split by question between the hub
   (head-to-head at the margin) and the surplus-cash page (deploying an accumulated balance).
3. **PROPOSED O38** (hub pack §9.6): the spouse or family shareholder and the settlements legislation,
   owned by the hub.
4. **PROPOSED O39** (surplus-cash pack §9.6): surplus cash and retained profit as a deployment decision,
   owned by the surplus-cash page.
5. **PROPOSED O40** (this pack §9.7): corporation tax for a medical company, owned by this page.
6. **THE O31 DECISION** (this pack §9.6): a 218-word IR35 block on this page belongs to a wave-D row whose
   owner is deliberately unnamed and cannot be named before 2026-09-11. **Recommendation: hold the block,
   add nothing, and let wave D resolve it when it names O31's owner. The conductor decides.**
7. **Live O2 breaches exist on all three pages** (six places on surplus-cash, two on the hub, one on this
   page with a stale year tag inside it). **All three are REFRAME, so all three writers may fix rather
   than escalate**, per the conductor rulings of 2026-08-26. All three packs set the budget to one
   sentence and zero figures.

---

## 11. Limitations

1. **This page has no measurement history on either engine and Google has never fetched it** (§1.1, §2.4).
   **Every acceptance test at §8 is therefore a first-appearance test rather than a movement test**, and
   the Google half is explicitly an observation rather than a target. Stated so the later read is scored
   against the right expectation.
2. **`GetPageStats` is a top-N endpoint.** Absence from it is not proof of zero Bing impressions; it is
   absence from roughly the top 80 URLs by traffic. **Unlike Google, there is no evidence Bing has failed
   to fetch this URL**, and the pack does not claim there is.
3. **The URL Inspection discovered-versus-unknown split is noisy.** STATE 2026-09-01 ran the same
   139-URL sweep twice, twenty minutes apart, and **six URLs moved across that boundary between two reads
   of the same API**. This page read `Discovered - currently not indexed` on 2026-09-01. **The hard fact
   is "not indexed"; the exact cohort label is +/- noise**, and §8.3 observation 4 is written accordingly.
4. **The corporation tax family is essentially unwinnable at the head and the pack says so rather than
   working around it.** Peer-winnable is **140 of 33,130 volume**, best peer position anywhere is 60, and
   §4.6 theme 1 declines both 12,100-volume heads. **§7.1's nine phrases target a long tail worth a few
   hundred volume in the harvest plus a medical modifier the harvest cannot see.** That is a thin
   evidence base and it is stated as one.
5. **Peer-winnable is Google-derived**, because DataForSEO positions are Google positions. Per owner
   decision 21 it orders the work and excludes nothing. **On a never-crawled page whose only realistic
   channel is Bing, that limitation bites harder than anywhere in the wave.**
6. **The harvest's cluster volumes are for ordering and must not be quoted to the pound**, per the dossier
   §4 correction note's own warning.
7. **Thirteen competitor URLs were fetched across this pack set and one returned HTTP 403** (recorded in
   the hub and surplus-cash packs, with the D14 correction). **No fetch was silently dropped.** One
   harvest URL was found to be a redirect (hub pack §4.2).
8. **No live-production check was run against `medicalaccounts.co.uk` for this page.** Its rendering mode
   and internal link targets are derived from the source file and the repo; all targets were confirmed to
   exist as markdown files or TSX routes on 2026-09-01, **but that they render at the expected URLs was
   not verified live**, and **§7.2 gate E3 requires a live canonical check that this pack did not run.**
   The URL Inspection call at §1.1 is Google's view of the URL, not our fetch of the page.
9. **Two claims on the live page could not be checked against house positions because house positions does
   not carry them**: the CT filing and payment machinery (§10.3 point 1), and the £1.5 million instalment
   threshold. Both look right; neither is verified to the standard F4 sets.
10. **The scratchpad is contended, and it bit this task.** BATCH3_INDEX **D10** records files being deleted
    under running agents. **This task's first pull script was overwritten in place by a sibling wave-C
    agent writing its own script to the same path**, and the work was redone in a task-specific
    subdirectory. Every figure in §2 and §3 is from a re-run after that.
11. **The rewrite is the only change to this URL in its window** (§9.3), and **no `monitored_pages` row
    exists**, so nothing is scoring the §8 tests until the owner arms them. By design, and recorded rather
    than treated as a gap.
