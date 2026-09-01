# §9.5 RESEARCH PACK: /blog/surplus-cash-medical-limited-company-options

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
`PACK_C_blog__gp-corporation-tax.md`. **The hub pack carries the shared research: the equity shape of the
whole incorporation cluster, the harvest's family breakdown, and the twelve competitor teardowns. This
pack does not repeat it; it names what it takes and where.**

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed,
deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job
created. **No paid API call: $0.00.** DataForSEO was read from the persisted harvest by SQL only. GSC
(Search Analytics and URL Inspection) and Bing Webmaster calls are free. Thirteen competitor URLs were
fetched live with a full browser header set.

---

## 1. Target and permission level

### The constraint, first

**GRADE = REFRAME. FULL REWRITE PERMITTED. K2 does not apply.** But see §1.1: like the hub, this page is
indexed and ranking, and "nothing to lose" is the wrong reading.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/surplus-cash-medical-limited-company-options` |
| Cluster / topic | **What to do with accumulated surplus cash in a private medical or consultant company.** The deployment question, as distinct from the extraction question. |
| Wave | **C**, incorporation and company structures. Unblocked by the D3 ruling of 2026-09-01. |
| Source file | `Medical/web/content/blog/surplus-cash-medical-limited-company-options.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** Frontmatter carries `title`, `metaTitle`, `metaDescription`, `h1`, `keyTakeaways`, `summary` and the `faqs` list. No `howtoSteps` key. Note the `generator` value is unquoted (`opus-4.8/netnew-wave`) while the sibling files quote it; do not "tidy" it. |
| Category | `Incorporation & Company Structures` (existing TSX hub route; do not change) |
| Repo HEAD seen at build time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` |
| Revert path | `git checkout <sha derived at write time> -- Medical/web/content/blog/surplus-cash-medical-limited-company-options.md` |

> **HEAD DISCIPLINE.** The sha above was read once, on 2026-09-01, and other agents commit concurrently:
> BATCH3_INDEX §0 records HEAD moving three times inside one writing session and three packs carrying
> three different anchors, none of them wrong. **Do not copy the sha above.** Derive it at write time,
> preferably with
> `git log -1 --format=%H -- Medical/web/content/blog/surplus-cash-medical-limited-company-options.md`,
> and verify the anchor is byte-identical to the working tree first.
>
> **Blast radius of a revert:** a single-file checkout restores the whole file, frontmatter included. This
> file's `image` and `imageCredit` block came from the 2026-08-26 hero backfill, so an anchor older than
> `bb1db095` strips the hero along with the content. Any anchor at or after `38a8ba75` is safe on that
> point.
>
> **No `monitored_pages` row exists for this slug (§1.2), so there is no measurement window to break and
> no registration to unwind. Registration is owner-gated and is not part of this work.**

### 1.1 What REFRAME does NOT mean here

BATCH3_INDEX §5's wave C entry cites this page at **9 Google impressions** and describes the wave as
having "almost nothing to lose".

**Fresh pull, 2026-09-01, GSC page dimension, 90 days: 10 impressions at average position 4.90.** And a
**GSC URL Inspection** call the same day returns **`PASS`, `Submitted and indexed`, self-canonical, last
crawled 2026-08-21** (§2.4).

**Position 4.90 is the second-best average position on the entire unfrozen Medical corpus**, behind only
`/blog/family-investment-company-doctors-consultants` at 4.78. For scale: the homepage sits at 55.1 and
the head commercial family at 45 to 78 (STATE 2026-09-01).

**The operative reading: a very small amount of very good equity.** A full rewrite is right, because ten
impressions cannot be defended by preservation and the page has a real shape problem (§6). But §7.2 sets a
position guard and §8.4 a revert trigger on the position rather than on the volume.

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
**flagged**. A `status='active'` filter silently excuses those three.

**`surplus-cash-medical-limited-company-options` is NOT on that list.** Neither are the other two surfaces
in this set. **All three are free to work today, with no gate.**

**Two frozen pages matter to this one and neither may be edited.**
- `/blog/gp-pension-contributions-tax-relief` is **frozen to 2026-09-10** and this page links to it in its
  closing paragraph. **Per batch-1 coordinator ruling 5, contextual links to a frozen page's live URL are
  fine; editing the frozen file is not.** Keep the link.
- `/blog/gp-limited-company-tax-benefits-drawbacks` is **frozen to 2026-09-10**, indexed, and carries
  **96 impressions, 4 clicks, position 5.66**, the best figures in the incorporation cluster. It owns the
  should-I-incorporate question. This page does not link to it today and does not need to.

### What may change: everything

REFRAME permits a full overhaul: `metaTitle`, `metaDescription`, `h1`, `title`, every H2 and H3, the body,
the FAQ list, `keyTakeaways` and `summary`. **What may NOT change is the `slug`, the `canonical`, the
`category`, the `date`, the `image` and the whole `imageCredit` block, and the `altText`.**

**Never propose a collapse, a redirect or a URL change** (K4). **No em-dashes** (I1): the live file
contains **zero** and must still contain zero.

### The hard permissions this page does NOT have

1. **O34.** The salary-versus-dividend decision and the dividend rate map belong to
   `/blog/salary-vs-dividend-medical-limited-company-2026`. **One sentence, then link.** See §9.5 for the
   proposed clarification that lets this page keep the rates it needs as table inputs, and §7.3 for the
   countable budget. **The live page is over that budget today.**
2. **O2.** The annual allowance, the taper, threshold and adjusted income, carry-forward and the pension
   input amount belong to `/calculators/nhs-pension-annual-allowance`. **One sentence, then link, zero
   figures.** **The live page explains all of it, twice, plus two FAQs. Live breach.**
3. **O3.** Adjusted net income, the £100,000 to £125,140 taper and the 60% band belong to
   `/blog/adjusted-net-income-doctors-60-percent-tax-trap`. **One sentence, then link. Do not restate the
   60% band.** The live page is compliant (zero occurrences) and must stay so.
4. **O33.** Incorporation prose belongs to `/blog/medical-practice-incorporation-step-by-step`. Not
   currently a problem here; the page opens after incorporation has happened, which is correct.
5. **The FIC.** `/blog/family-investment-company-doctors-consultants` owns it. The live page's Option 4
   already links out and already says "We cover the FIC structure in full in our separate guide", which is
   **compliant in substance and a V2 process-narration defect in wording** (§6.3 point 5).

---

## 2. Dual-engine equity register

**Every figure below was pulled fresh by this task on 2026-09-01.** Nothing is quoted from a stored
Supabase snapshot and `gsc_query_data` is not used or summed anywhere.

**D2 compliance: every engine figure names its endpoint.**

### 2.1 Google, GSC Search Analytics, `page` dimension

```
GSCQueryFetcher("medical").gsc_client.service.searchanalytics().query(
    siteUrl="sc-domain:medicalaccounts.co.uk",
    body={"startDate":"2026-06-03","endDate":"2026-09-01","dimensions":["page"],"rowLimit":1000})
run 2026-09-01  ->  23 rows site-wide
```

| Metric | Value |
|---|---|
| clicks | **0** |
| impressions | **10** |
| ctr | 0 |
| position | **4.9** |

**Context.** 23 page-dimension rows for a 139-URL sitemap. By impressions this URL is 19th of 23. **By
position it is 2nd of the 20 non-fragment rows**, behind only `family-investment-company-doctors-consultants`
at 4.78.

The full incorporation-cluster shape is in the hub pack §2.1 and is not repeated here. The single line
that matters for this page: **five of the six extraction-set pages are indexed, every indexed one ranks
inside Google's top 10, and four of the five earn zero clicks.** The cluster's constraint is demand volume
and click-through, not rank.

### 2.2 Google, GSC Search Analytics, `page` + `query` dimension

```
same client, dimensions=["page","query"], rowLimit=5000, same window
run 2026-09-01  ->  288 rows site-wide
```

**Rows for this URL: exactly ONE.**

| Query | Impr | Clicks | Position |
|---|---|---|---|
| `yes please` | 1 | 0 | 5.0 |

**This is junk and it must not be treated as demand evidence.** It is almost certainly a fragment of a
longer natural-language query or a mis-captured string; it says nothing about what this page should
answer, and **no writer may optimise toward it**. It is recorded because §2 is the do-not-lose list and it
is technically on it.

**The other 9 of 10 impressions are anonymised by GSC and carry no query.** GSC withholds low-volume
queries, so a page can hold 10 impressions at position 4.90 with one junk query row. **No writer may
conclude anything about Google intent from that**, and no writer may describe the page as "ranking
nowhere" (BATCH3_INDEX D5).

**Consequence for method:** §7.1 cannot be built from Google query evidence. It is built from the
persisted DataForSEO harvest (§3) and from the market's own word orders as held by the incumbent pages
(§4). Stated so a QA agent reads it as a method choice, not a gap.

### 2.3 Bing, `GetPageStats` (page level) and `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
    -> 329 rows, 80 distinct URLs
BingWebmasterClient().get_page_query_stats("https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/surplus-cash-medical-limited-company-options")
    -> 0 rows
run 2026-09-01
```

| Endpoint | Result |
|---|---|
| `GetPageStats`, page level | **0 snapshots. This URL is absent from all 329 rows.** |
| `GetPageQueryStats`, named-query level | **0 rows.** |

**Both disciplines apply.**

1. **The `GetPageQueryStats` zero is a TRUE zero, not the silent-failure path.** BATCH3_INDEX §0.2 records
   that this endpoint returns an empty list rather than an error when `page` is passed as a path instead
   of the full `https://www.` URL. **The call above passed the full `https://www.` URL** and the same
   script returned populated results for other Medical URLs in the same run.
2. **The `GetPageStats` zero is NOT proof of zero Bing impressions.** `GetPageStats` is top-N (Bing top-N
   trap memo; BATCH3_INDEX §9 limitation 2), and on this site it surfaces **80 distinct URLs of 139**.
   **Record it as "no Bing trace above the top-N floor", never as "zero Bing impressions".**

### 2.4 Google, URL Inspection API

```
POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect
  {"inspectionUrl": "https://www.medicalaccounts.co.uk/blog/surplus-cash-medical-limited-company-options",
   "siteUrl": "sc-domain:medicalaccounts.co.uk"}
via optimisation_engine.snapshot.index_coverage._call_inspection_with_status, run 2026-09-01, HTTP 200
```

| Field | Value |
|---|---|
| `verdict` | **PASS** |
| `coverageState` | **Submitted and indexed** |
| `lastCrawlTime` | **2026-08-21T05:38:56Z** |
| `pageFetchState` | SUCCESSFUL |
| `robotsTxtState` | ALLOWED |
| `googleCanonical` / `userCanonical` | self / self |

**This page is indexed, self-canonical and crawled eleven days ago.** It is not one of the 117 not-indexed
URLs and it is not affected by the `/resources/` canonical defect STATE found and fixed on 2026-09-01.

### 2.5 THE DO-NOT-LOSE LIST

| # | What must not be lost | Measured by |
|---|---|---|
| 1 | **Google average position at or better than 4.90** on the `page` dimension | GSC Search Analytics, `page` dimension, 90-day window |
| 2 | **Google impressions at or above 10** over 90 days | same |
| 3 | Index status `PASS` / `Submitted and indexed`, self-canonical | GSC URL Inspection |
| 4 | Existing internal inbound links | `scripts/medical_flat_link_audit.py` |

**There is no usable named-query equity set on either engine**: one junk GSC row, zero Bing rows. **The
equity floor is genuinely near-empty and it is enumerated above with its endpoint named rather than
asserted**, which is what D2 asks for. That is the honest position and it is why a full rewrite is right.

---

## 3. The market's keyword set

### 3.1 Method and provenance

Source: `dataforseo_competitor_data`, `site_key='medical'`. **No new DataForSEO call was made: $0.00.**
Live corpus: **39,296 rows, 31,539 keywords, 44 domains** (D12 resolution, 2026-08-26). Peer set is the
**39 domains** confirmed by the D13 resolution; the 5 institutional non-peers of §2b are excluded from
peer-winnable. Run 2026-09-01 through `python scripts/_q.py`. **The full SQL, including the peer array and
the selection regex, is printed in the hub pack §3.1 and is not duplicated here.**

**`\y` is used throughout, never `\b`** (BATCH3_INDEX **D9**: Postgres ARE treats `\b` as a backspace
character, and one pack writer got 3 rows where the correct boundary returned 41).

**Whole extraction family: 311 keywords, 174,740 volume, 56,220 peer-winnable.** This page's slice:

| Family | Kws | Volume | Peer-winnable | Dominant holder |
|---|---|---|---|---|
| **Surplus cash, retained profit, MVL** | **31** | **10,890** | **6,550** | gorillaaccounting.com (22 of 31), r-m-t.co.uk (4) |
| Family investment company (boundary) | 6 | 3,010 | 400 | pricebailey.co.uk |

### 3.2 The set in full, ordered by volume

`On page` = phrase appears verbatim in the live source file, case and punctuation normalised.
Peer-winnable **orders** the work and never excludes a row (owner decision 21).

| Vol | Best pos | Peer best | Holder | On page | Keyword |
|---|---|---|---|---|---|
| 1,300 | 11 | 11 | gorillaaccounting.com | **no** | `what are retained profits` |
| 1,300 | 10 | 10 | gorillaaccounting.com | **no** | `what is retained profit` |
| 880 | **8** | 8 | r-m-t.co.uk | **yes** | `members voluntary liquidation` |
| 720 | **7** | 7 | gorillaaccounting.com | **no** | `retained profit meaning` |
| 720 | 9 | 9 | gorillaaccounting.com | **no** | `retained profits meaning` |
| 590 | 49 | 49 | gorillaaccounting.com | **no** | `advantage and disadvantage of retained profit` |
| 590 | 28 | 28 | gorillaaccounting.com | **no** | `advantages and disadvantages of retained profit` |
| 590 | 49 | 49 | gorillaaccounting.com | **no** | `retained profits advantages and disadvantages` |
| 480 | 55 | 55 | gorillaaccounting.com | **no** | `disadvantage of retained profit` |
| 480 | 52 | 52 | gorillaaccounting.com | **no** | `retained profit disadvantages` |
| 390 | 21 | 21 | gorillaaccounting.com | **no** | `advantage of retained profit` |
| 390 | 52 | 52 | gorillaaccounting.com | **no** | `advantages of retained profit` |
| 390 | 26 | 26 | gorillaaccounting.com | **no** | `advantages of retained profits` |
| 390 | 28 | 28 | gorillaaccounting.com | **no** | `retained profits advantages` |
| 260 | 17 | 17 | gorillaaccounting.com | **no** | `retained profit definition` |
| 260 | 16 | 16 | gorillaaccounting.com | **no** | `retained profits definition` |
| 210 | **8** | 8 | r-m-t.co.uk | **no** | `mvl liquidation` |
| 90 | 7 | 7 | gorillaaccounting.com | **no** | `retained profit definition business` |
| 90 | 7 | 7 | gorillaaccounting.com | **no** | `retained profits definition business` |
| 90 | 9 | 9 | gorillaaccounting.com | **no** | `what is retained profit in business` |
| 70 | **8** | 8 | r-m-t.co.uk | **no** | `members voluntary liquidation mvl` |
| 70 | 15 | 15 | r-m-t.co.uk | **no** | `members voluntary liquidation tax` |

(The remaining 9 rows are further `retained profit` permutations at 20 to 70 volume, all held by the same
gorilla URL.)

### 3.3 Five readings the table does not make obvious

1. **`surplus cash` returns ZERO harvest rows in any phrasing.** So does `excess cash`. **The market's word
   for this money is `retained profit`, and our page uses it four times against twelve uses of `surplus
   cash`.** The 4,720 combined volume in the `retained profit` family, held at positions 7 to 55 by a
   single competitor URL, is entirely unaddressed by us. **This is the largest single vocabulary gap in
   wave C** and it drives §7.1.
2. **The `retained profit` family splits cleanly into two intents and only one is ours.** The
   definitional half (`what is retained profit`, `retained profit meaning`, `retained profit definition
   business`, ~4,000 volume at positions 7 to 17) is a bookkeeping question: what the line on the balance
   sheet means. The decision half (`advantages and disadvantages of retained profit`, ~3,000 volume at
   positions 21 to 55) is the question our page actually answers. **The incumbent answers the first well
   and the second badly** (§4.1), and it answers neither for a company holding a doctor's private-practice
   profits.
3. **The MVL slice is genuinely competitive and it is a different SERP.** `members voluntary liquidation`
   (880) and `mvl liquidation` (210) are held at position **8** by `r-m-t.co.uk`, an insolvency-practice
   page rather than a tax-guide page. **`members voluntary liquidation tax` (70, position 15) is the
   crossover query and it is the only one of the three we should target**, because it is the tax question
   and we are not licensed insolvency practitioners. The other two are DECLINED at §4.9 theme 6.
4. **THE FINDING THAT MATTERS MOST, AND IT IS AN ABSENCE.** There is not one medical-modified
   profit-extraction or surplus-cash keyword anywhere in the 39,296-row harvest. **The full query and its
   eighty-row result are printed in the hub pack §3.4 point 3.** Every medical-modified `salary` keyword
   is about pay levels; `consultant dividend`, `doctor limited company`, `medical company surplus`,
   `gp corporation tax` return zero rows in any phrasing. **The reading that survives contact with our own
   GSC is that no competitor runs such a page, so the vocabulary cannot appear in a competitor-derived
   harvest**, while our own page holds 10 impressions at position 4.90 for medical-modified queries Google
   will not name. **The demand is real, small, and invisible to the paid harvest.**
5. **The harvest is a weak map of this topic and there is no strong one**, because the Bing fallback that
   wave A used does not exist here either (§2.3). **§7.1 is built from the generic market's word orders
   crossed with the medical modifier the market does not have**, and it is explicitly a smaller and more
   speculative list than wave A's 14. Stated so a QA agent reads it as a bounded method rather than as
   thin research.

---

## 4. Competitor teardown

**MANDATORY CLAUSE, and it is satisfied. Every URL below was fetched LIVE by this task on 2026-09-01 and
its HTTP status is recorded. No URL was assessed from the harvest alone, no fetch was silently dropped,
and the one non-200 is recorded with its status code.**

Fetch method, implementing BATCH3_INDEX **D14**: `httpx.get(url, headers=<full browser header set>,
follow_redirects=True, timeout=45)`, carrying `User-Agent`, `Accept`, `Accept-Language`,
`Accept-Encoding`, four `Sec-Fetch-*` headers, `Upgrade-Insecure-Requests` and `Connection`.

### 4.1 gorillaaccounting.com, What is Retained Profit?: **THE PAGE TO BEAT**
`https://gorillaaccounting.com/blog/what-is-retained-profit-a-guide-for-the-self-employed/` · **HTTP 200**
**Class: PEER** (contractor accountant). **Holds 22 keywords / 9,310 combined volume, best position 7**,
including every `retained profit` head term in §3.2.

| | |
|---|---|
| Title / H1 | `What is Retained Profit? A Guide for the Self-Employed` |
| `datePublished` / `dateModified` | **2025-06-06** / **2025-06-06** (never updated since publication) |
| Word count | 2,380 (chrome included) |
| H2s (article) | `What Is Retained Profit?`; `How Do You Calculate Retained Profit?`; `The Importance of Retained Profit`; `Retained Profit and Tax`; `How to Manage Your Retained Profit`; `Retained Profit and Sole Traders`; `Working With Gorilla` |
| H3s | `Track Your Retained Profit`; `Set Aside Funds`; `Have a Financial Plan`; `Strategic Reinvestment`; `Have a Dividend Strategy` |
| Tables | 1 · FAQ schema: No · Calculator: No |

**The figure scan across the whole page returned exactly one number: `£50,000`.** No dividend rate, no
corporation tax rate, no BADR rate, no year tag anywhere.

**What it says, verbatim:**

> "Retained profit that's kept in the business isn't actually taxed, Corporation Tax has already been
> levied and further taxes would only apply if the funds were withdrawn as dividends or salary."

> "You could purchase new equipment to help you diversify or to improve efficiency, appoint an employee or
> invest in marketing and lead gen. You could also use it for paying off debt."

**What it omits, and the list is the whole of our page.** A targeted search of the fetched text for
`BADR`, `business asset`, `trading status`, `trading company` and `liquidat` returned **zero matches on
all five**. So the incumbent on a 4,720-volume family:

- never mentions **Business Asset Disposal Relief**;
- never mentions **trading-company status**, which is the thing accumulating cash actually puts at risk;
- never mentions **liquidation or an MVL** as a route for the money;
- never mentions **an employer pension contribution** as a deployment;
- never mentions **investing the balance inside the company**, other than "reinvestment" in equipment and
  marketing;
- carries **no tax year tag at all**.

**Consequence for us.** **The market's best-ranked answer to "what should I do with retained profit" is a
balance-sheet definition with a list of business reinvestments, written for a contractor who is going to
buy a laptop.** It has nothing to say to a consultant sitting on six figures of post-tax private-practice
profit. **This is the most winnable competitor page in the extraction set** and the way to beat it is to
answer the decision half of the intent (§3.3 point 2) in the market's own noun.

### 4.2 r-m-t.co.uk, Accountants Guide To Members Voluntary Liquidation (MVL)
`https://r-m-t.co.uk/recovery-insolvency/members-voluntary-liquidation/` · **HTTP 200**
**Class: PEER.** Holds 24 keywords / 4,460 combined volume, best position **7**, including `members
voluntary liquidation` (880) at 8 and `members voluntary liquidation tax` (70) at 15.

| | |
|---|---|
| Title / H1 | `Accountants Guide To Members Voluntary Liquidation (MVL)` |
| `datePublished` 2025-03-12 · `dateModified` **2026-06-11** |
| Word count | 2,286 · Tables: **0** · FAQ schema: No |
| H2s | `When should I use an MVL?`; `What is the MVL process?`; `How Long Does An MVL Take?`; `Benefits of an MVL?`; `In specie distribution`; `What Are The Costs Of An MVL?` |
| Figures found | `2026/27` (in the site's "UK Tax Card 2026/27" navigation only), `TAAR`, `£1m`, `£500` |

**What it says, verbatim:**

> "Dividend distributions in an MVL are usually classified as a capital distribution, rather than an
> income distribution, and would therefore be subject to capital gains taxation. Capital gains have lower
> taxation rates than Income Tax, especially with the availability of the reduced rate provided by
> **Business Asset Disposal Relief**."

> "You can only claim relief on **£1m** over your lifetime... The main purpose of the liquidation should
> not solely be for tax benefits. HMRC has **Targeted Anti-Avoidance Rules (TAAR)** that allow it to
> challenge liquidation shareholder distributions where it considers that the main purpose of the
> liquidation was to avoid tax."

**What it gets wrong or omits, and it is one thing, repeatedly.** **The page names BADR four times and
never states its rate.** A figure scan for `18%`, `14%` and `10%` across the whole fetched text returned
**zero matches**. It says capital rates are "lower than Income Tax" and leaves the reader to find out by
how much. It also carries no trading-status test, no two-year qualifying period detail, and no comparison
against a dividend.

**Consequence for us.** This is a well-made page by a real insolvency practice and it is the right
competitor for the MVL slice. **We do not compete on the process (we are not licensed insolvency
practitioners and §4.9 theme 6 declines it). We compete on the number**: BADR at **18% from 6 April 2026**
against the **35.75% or 39.35%** a dividend would cost, which is the comparison the reader is actually
making and which nobody in this set prints.

### 4.3 gorillaaccounting.com, Salary and Dividend Tax Calculator
`https://gorillaaccounting.com/salary-dividend-tax-calculator/` · **HTTP 200**
**Class: PEER.** Fetched because it is the extraction family's dominant URL (429 keywords, 1,281,630
combined volume, best position 1) and because the harvest's `the-lowdown-on-dividend-tax-rates` URL
**301-redirects to it** (hub pack §4.2).

**The single relevant fact for this page:** it publishes **2024/25** dividend rates, **8.75% / 33.75% /
39.35%**, as current, on a page whose `article:modified_time` is **2026-07-01**. Full teardown in the hub
pack §4.1. **Recorded here because the four-route comparison table on our page needs the current rates and
this is the evidence that the incumbents do not have them.**

### 4.4 rsbc.uk, Salary vs Dividend Calculator for Contractors UK 2026/27
`https://www.rsbc.uk/salary-dividend-tax-calculator` · **HTTP 200**
**Class: PEER.** Title and H1 carry `2026/27`, the string appears nineteen times, and the body rates are
**8.75% / 33.75% / 39.35%**. A current-year title over prior-year rates. Full teardown in the hub pack
§4.4.

### 4.5 rsbc.uk, UK Dividend Tax Guide 2023-2026
`https://www.rsbc.uk/blogs/uk-dividend-tax-guide-2023-2026-rates-allowances-and-calculators` · **HTTP 200**
**Class: PEER.** `dateModified` 2025-12-09. Stops at 2025/26. Its `Dividend Allowance by Year` H2 stacks
four dated regimes as four H3s, which is the chronological march F2 bans. Full teardown in the hub pack
§4.5.

### 4.6 taxqube.co.uk, What is an associated company? Marginal Relief and UK Corporation Tax
`https://taxqube.co.uk/what-is-an-associated-company-marginal-relief-and-uk-corporation-tax/` · **HTTP 200**
**Class: PEER.** 19 keywords / 5,210 combined volume; holds `corporation tax marginal relief` (720) at 43.
`datePublished` and `dateModified` both **2023-03-09**. 1,513 words. **Figures: 19%, 25%, £50,000,
£250,000. No 3/200 fraction, no 26.5% effective rate, no year tag.**

**Fetched for the corporation tax boundary only.** The CT teardown proper belongs to the
`gp-corporation-tax` pack, which carries it in full. **Recorded here because this page states the 19%
small-profits rate as the input to its own four-route table and needs to know the incumbent's shape.**

### 4.7 sandisoneasson.co.uk, A Guide to Directors Loan Accounts
`https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` · **HTTP 200**
**Class: PEER, and a MEDICAL SPECIALIST** (its navigation reads Hospital Consultants, GP-Practice,
GP-Federations, GP-Locums, registrars, dentists). Visible date **Sep 2020**, 1,596 words, **no article
headings at all**.

**Verbatim: "HMRC will charge additional tax on that loan at 32.5%. The additional corporation tax is
known as Section 455 tax."** Three rate generations stale (32.5%, then 33.75%, then **35.75%** on loans
made on or after 6 April 2026, HP §5).

**Fetched to answer one question for this page: does any medical-specialist peer write about what to do
with money inside a company? The answer is no.** This is the closest thing in the peer set and it is a
generic, unheadinged, five-year-old page about an overdrawn loan account. **The finding is passed to
`/blog/consultant-directors-loan-account-s455-medical-company` at §10.4, not used here.**

### 4.8 medicsmoney.co.uk, GP Partner Salary in the UK
`https://medicsmoney.co.uk/gp-partner-salary-in-the-uk-what-to-expect/` · **HTTP 200**
**Class: PEER**, the strongest medical-audience brand in the set, 64 keywords / 29,650 combined volume at
best position 4.

**3,656 words. Occurrences of `dividend`, `limited company`, `incorporat` and `corporation tax`: ZERO.
The figure scan returned no rate or threshold at all.** Full teardown in the hub pack §4.6.

**This is the proof of §3.3 point 4 by fetch rather than by inference: the medical peer holding the
company-adjacent vocabulary is writing about pay levels.** It also carries an H2 reading
`What medical school didn't teach us about money`, which is the exact framing **D5** bans for us.

### 4.9 pricebailey.co.uk, Family Investment Companies: **NON-200, RECORDED**
`https://www.pricebailey.co.uk/blog/family-investment-companies-fic/` · **HTTP 403**

Returned **403 with a `Just a moment...` interstitial (3 words of body)** to the full browser header set.
**This contradicts BATCH3_INDEX D14**, which recorded that a full header set recovers `pricebailey.co.uk`
where a bare user agent 403s. Six days later it does not. **Recorded rather than dropped, and it is a live
correction to D14** (§10.2).

The page holds `family investment company` (2,400) at position 22 and 10 further FIC keywords. **This
matters to Option 4 of our page and it is the reason Option 4 must stay at one paragraph and a link**: the
FIC belongs to `/blog/family-investment-company-doctors-consultants`, and **no claim in this pack rests on
the unfetchable competitor page.**

### 4.10 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes**. **12 themes, 12 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **`retained profit` as the market's noun for this money** (4.1, 4,720 volume) | **COVER, and it is the page's biggest gap** | We say `surplus cash` twelve times and `retained profit` four. §7.1 phrases 1 and 2. |
| 2 | **The definitional half: what retained profit IS, how it is calculated** (4.1 H2s 1 and 2, ~4,000 volume at positions 7 to 17) | **COVER, briefly, as a primer layer** | K3: the primer goes **above** the specialist material and never in place of it. Two or three sentences: profit after CT and after dividends, sitting in equity, and the fact that it has already been taxed once. **Do not write a bookkeeping guide.** |
| 3 | **The decision half: advantages and disadvantages of retaining profit** (4.1, ~3,000 volume at positions 21 to 55) | **COVER, and it is the page's own subject** | The incumbent ranks 21st to 55th on it because it answers it with "buy equipment". §7.1 phrase 3. |
| 4 | **`Retained Profit and Tax`: that retained profit is not taxed again while it sits** (4.1 H2 4, verbatim above) | **COVER, one sentence** | True, useful, and the reader's actual first question. It also sets up the deferral point our page already makes well. |
| 5 | **The MVL process: appointment of a licensed insolvency practitioner, timescales, costs, in specie distribution** (4.2 H2s) | **DECLINE the process, COVER the tax** | We are not licensed insolvency practitioners and I3 bars regulated-activity framing. The page explains **the tax outcome** and says the process needs a licensed IP. §7.1 phrase 8 targets `members voluntary liquidation tax` (70, position 15), not the 880-volume process head. |
| 6 | **`members voluntary liquidation` and `mvl liquidation` as head terms** (4.2, 1,090 combined at position 8) | **DECLINE** | Insolvency-practice intent on an insolvency-practice SERP. Chasing it means writing a service page for a service we do not provide, which is the doorway shape the A* bar bans. Declined on the record. |
| 7 | **BADR named without its rate** (4.2, four mentions, zero rate) | **COVER, with the rate and the SAVING** | HP §4: **18% from 6 April 2026**, up from 14% in 2025/26 and 10% before. **And HP §4's own instruction, added because a page needed it: state the saving, not just the relief rate.** The main CGT rate on non-residential assets is **24% for a higher-rate taxpayer from 6 April 2026**, so BADR is worth **up to 6 percentage points**, not the much larger saving the old 10% rate delivered. **The live page states 18% and never states what it saves against.** §7.1 phrase 7. |
| 8 | **The £1m BADR lifetime limit and the anti-phoenix TAAR** (4.2, both present) | **COVERED ALREADY** | Both on our page. **KEEP**, and see §10.1: the live page attributes the TAAR to the wrong Act. |
| 9 | **The trading-company test** | **COVER, and it is unowned in the whole set** | Zero matches for `trading status` or `trading company` on 4.1; not on 4.2 either. Our page carries it at length and it is the page's single strongest differentiator. **KEEP.** |
| 10 | **The dividend rate map** (4.3, 4.4, 4.5, all at 8.75 / 33.75 / 39.35) | **ELSEWHERE, one sentence and a link, plus table inputs** | **O34's**, hub `/blog/salary-vs-dividend-medical-limited-company-2026`. See §9.5 for the proposed clarification that permits the table inputs and §7.3 for the count. |
| 11 | **The corporation tax rate map and marginal relief** (4.6) | **ELSEWHERE, one sentence and a link, plus table inputs** | `/blog/gp-corporation-tax`'s. |
| 12 | **The FIC** (4.9, HTTP 403) | **ELSEWHERE, one paragraph maximum and a link** | `/blog/family-investment-company-doctors-consultants`'s. The live Option 4 is already close to the right size; its closing sentence is a V2 process-narration defect (§6.3 point 5). |

---

## 5. Whitespace

### 5.1 What this page owns, and the hub-and-satellite structure O34 requires

**O34 makes `/blog/salary-vs-dividend-medical-limited-company-2026` the hub for extraction facts and this
page one of its satellites. That does not make this page a stub: it owns its own subject in full.**

| This page OWNS, exclusively | This page HANDS OFF, one sentence and a link |
|---|---|
| **What to do with accumulated surplus, as a set of routes with a comparison** | **The salary-versus-dividend decision and the dividend rate map** (O34, the hub) |
| **The BADR trading-status trap**: why accumulating investments inside a trading company threatens the relief, the main-activity test, and the two-year look-back | **The corporation tax rate map, marginal relief and associated companies** (`gp-corporation-tax`) |
| **The MVL as a tax outcome**: capital rather than income treatment, the 5% and officer-or-employee conditions, the £1m lifetime limit, the anti-phoenix TAAR | **s.455 and the director's loan account** (its own page) |
| **Investing inside the company** versus a separate entity, and what each does to the balance sheet | **The FIC itself** (its own page) |
| **Deploying an accumulated balance into an employer pension**: how much room exists, carry-forward against prior years, what happens when the allowance is exhausted (**PROPOSED O37**, §9.6) | **The annual allowance, its taper and its mechanics** (O2, the calculator) |
| **The one-line NHS-pension consequence**: every route here is outside NHS accrual | **Whether to incorporate at all** (O33, and the frozen page) |
| | **Adjusted net income, the £100k to £125,140 taper, the 60% band** (O3) |
| | **The spouse or family shareholder and the settlements legislation** (**PROPOSED O38**, §9.6, owned by the hub) |

### 5.2 What nobody in the peer set covers, quotably

1. **No competitor page in this SERP states the live 2026/27 dividend rates.** Eleven competitor pages were
   fetched and returned HTTP 200, and a figure scan across all eleven returned `10.75%` **zero times** and
   `35.75%` **zero times**. Four print `8.75%` and `33.75%` as current, including one modified on 1 July
   2026 and one whose title says 2026/27 nineteen times. **Our four-route table computes against the
   current rates and no rival page could.**
2. **The best-ranked `retained profit` page never mentions BADR, trading status or liquidation.** Verified
   by targeted search of the fetched text, five terms, zero matches (§4.1). **The single biggest financial
   risk in accumulating company cash is absent from the page that owns the vocabulary for it.**
3. **The best-ranked MVL page names BADR four times and never states its rate** (§4.2, zero matches for
   `18%`, `14%`, `10%`). **We state 18% from 6 April 2026 and, per HP §4, what it saves against.**
4. **Nobody states what BADR is worth now rather than what it used to be worth.** HP §4 makes this point
   against itself: at a 24% main CGT rate for a higher-rate taxpayer from 6 April 2026, BADR at 18% is
   worth **up to 6 percentage points**, not the 14-point gap the old 10% rate delivered. **A page that
   says "the relief is worth less than your adviser's mental model" is unique in this set** and it is the
   most useful sentence available on the MVL route.
5. **Nobody writes any of this for a doctor.** Zero medical-modified surplus-cash or extraction keywords in
   the harvest (§3.3 point 4), and the strongest medical peer spends 3,656 words on GP pay with zero
   occurrences of `dividend` (§4.8). **The generic pages are written for a contractor deciding whether to
   buy equipment. A consultant is deciding between a pension contribution, a dividend into a 39.35% band
   underneath an NHS salary, and a wind-up.** Those are not the same question.
6. **Nobody pairs any of it with the NHS pension.** Only we can say that company income, dividends, capital
   distributions and investment returns are **all** outside NHS accrual, and that an employer contribution
   builds a separate DC pot rather than restoring anything (HP §2.C). **The live page already makes this
   point well and it is the page's best paragraph.**
7. **Nobody carries the interaction between the balance sheet and the exit.** The trading-status test is
   applied at the date of disposal **and throughout the preceding two years**, so a balance sheet that
   drifted three years ago costs the relief today and the clock cannot be wound back. **The live page has
   this and it is the sentence that makes the page worth reading.** **KEEP.**

### 5.3 KEEP, explicitly

**K1 is a hard fail: the drafted version's count of statutory references, form names, technical terms and
figures must be greater than or equal to the live page's.**

- **The BADR rate 18% from 6 April 2026, with the 14% prior-year band** (HP §4). **KEEP**, and add what it
  saves against (§5.2 point 4).
- **The BADR conditions in full**: trading company throughout the **two-year** period to disposal, at least
  **5%** of ordinary share capital and voting rights, at least 5% of the economic interest, and officer or
  employee status throughout (HP §4). **KEEP. No competitor page in the set carries them.**
- **The £1m BADR lifetime limit per individual.** **KEEP.**
- **The trading-company test as HMRC applies it**: main activity, the nature and size of trading versus
  non-trading activity, the proportion of assets held for investment, management time devoted to each,
  assessed on all the facts with no hard statutory boundary. **KEEP. This is the page's best asset.**
- **The two-year look-back consequence**: the test runs to the date of disposal and across the preceding
  two years, so a deteriorated position cannot be repaired at the last moment. **KEEP.**
- **The anti-phoenix TAAR**, its purpose test, and the point that it catches a consultant who winds up and
  resumes private practice through a new vehicle. **KEEP the substance; see §10.1 on the citation.**
- **FA 2004 s.196**, deductible on a paid basis, wholly and exclusively, no NIC. **KEEP.**
- **The NHS pension paragraph**: company income, dividends, capital distributions and investment returns
  are all outside the NHS scheme; only the NHS employment is pensionable for a consultant; an employer
  contribution builds a separate DC pot and restores no NHS accrual. **KEEP, and it is the page's best
  paragraph.**
- **The four-route comparison table** on £100,000 of pre-tax profit. Every figure re-derives (§7.4).
  **KEEP the arithmetic exactly; it may be re-presented but not re-computed.**
- **The £200,000 MVL-versus-dividend illustration**: 18% gives £36,000 against 39.35% giving £78,700, a
  difference of over £40,000 on one decision. Re-derives (§7.4). **KEEP.**
- **The UK dividend exemption on dividends received by a company**, which is what makes equity investment
  inside a company reasonably efficient. **KEEP, subject to §10.3: it is not currently in house
  positions.**
- **The corporation tax charge on investment returns inside the company**, as the cost of the
  invest-in-company route. **KEEP.**
- **ITTOIA 2005 s.619 onward, s.624, s.629.** **KEEP the citations if the spouse paragraph survives the
  O38 boundary; see §7.3.**

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/surplus-cash-medical-limited-company-options.md`, read in full
2026-09-01.

| | |
|---|---|
| Word count, whole file | **4,070** |
| Word count, body copy only | **2,781** (HTML stripped) |
| `metaTitle` | `Surplus Cash in a Medical Limited Company: Options` (49 characters) |
| `metaDescription` | 148 characters, under the 155 limit |
| `h1` | `What To Do With Surplus Cash in a Medical or Consultant Limited Company` |
| `title` | identical to `h1` |
| Date / generator | 2026-07-06, `opus-4.8/netnew-wave` (unquoted in the frontmatter) |
| H2 count | **11** · H3 count: **1** |
| FAQ entries | **10** · `keyTakeaways`: **5** · `howtoSteps`: absent |
| Tables | **1** |
| Worked example with figures | **Yes**, the four-route table plus the £200,000 MVL illustration |
| Em-dashes | **0** (I1 clean) |
| `we` / `our` / `us` | 7, i.e. **2.5 per 1,000** against a C4 cap of 3. **PASSES.** |
| `you` / `your` | 6, i.e. **2.2 per 1,000** against a C3 band of 12 to 25. **Worst on the site's extraction set.** |
| L2 word band | 2,781 body words, inside the 2,000 to 3,200 deep-guide band |

### 6.1 Existing heading list, verbatim and in order

- H2 `Why surplus cash builds up in a medical company`
- H2 `The problem with leaving it as idle cash`
- H2 `Option 1: employer pension contributions`
- H2 `Option 2: extract as dividends over time`
- H2 `Option 3: invest inside the company and the BADR trading-status trap`
  - H3 `The trading company test in practice`
- H2 `Option 4: a family investment company or a separate investment subsidiary`
- H2 `Option 5: wind the company up and take capital via an MVL`
- H2 `The NHS pension interaction across all five options`
- H2 `Worked comparison: £100,000 of pre-tax company profit, four routes (2026/27)`
- H2 `Common mistakes consultants make with surplus company cash`
- H2 `How we help consultants deploy surplus company cash`

### 6.2 Blunt read

**This is the strongest of the three extraction pages on substance and the weakest on voice. It also
carries the wave's two largest ownership breaches.** The rewrite is a re-voicing, a re-vocabularising and
a fencing exercise, not a re-researching.

**What is good, specifically.**

1. **The BADR trading-status thesis is genuinely expert and genuinely absent from the market.** No
   competitor page fetched mentions trading status at all (§4.1, §4.2). The two-year look-back point is
   the best sentence in the extraction set.
2. **The arithmetic is correct.** All twelve table figures and the £200,000 illustration re-derive (§7.4).
3. **Load-bearing figures trace to house positions.** BADR 18% from 6 April 2026 with the 14% prior band
   (§4), CT 19% / 25% / 3/200 (§5), dividend 10.75% / 35.75% / 39.35% and £500 (§5), FA 2004 s.196 (§5),
   the 5% and officer-or-employee BADR conditions (§4), dividends not NHS-pensionable (§2.C).
4. **F2 is right on the BADR band** (one current rate leading, one labelled prior clause) and **F1 is met
   on the table** (the year is in the H2 that captions it).
5. **C4 passes at 2.5 per 1,000**, which is unusual on this corpus, and the single CTA sits at the end
   where D3 requires it.
6. **I1, I2, I4, I5 clean.** Zero em-dashes, no named expert, no client name, no pricing.
7. **O3 and O33 are respected**: zero occurrences of the 60% band or adjusted net income, and the page
   correctly starts after incorporation.

### 6.3 What is thin, missing or wrong, checked against the CURRENT rules

1. **The market's noun is missing.** `retained profit` appears **4 times** against `surplus cash` **12**.
   The 4,720-volume `retained profit` family (§3.2) is the market's vocabulary for exactly this money and
   the page is written in ours. **B2 and B3 both fail on this**, and it is the single largest
   vocabulary gap in wave C.
2. **C3 fails badly: 2.2 second-person instances per 1,000 words against a band of 12 to 25.** The page is
   written in the third person about "the consultant". **This is the largest editorial defect on the
   page**, and on a page ranking at 4.90 with zero clicks it is a plausible part of why the snippet does
   not convert.
3. **B4 fails: 0 of 11 H2s are question-form, against a band of 50% to 75%.** The `Option 1` to
   `Option 5` sequence is a document structure, not a reader's question. The market asks "what is retained
   profit", "advantages and disadvantages of retained profit", "members voluntary liquidation tax", and
   the page answers none of them in a heading.
4. **B2 fails on three headings.** `Option 1: employer pension contributions` through
   `Option 5: wind the company up` are enumerated labels, not market phrases or questions.
5. **V2 is breached in one clause, in the extended sense conductor ruling 3 of 2026-08-26 gave it.**
   Option 4 closes "We cover the FIC structure in full in our separate guide." That narrates our own
   ownership map to the reader. **Write "the detail sits on X" and link it**, or simply link.
6. **O2 IS BREACHED THREE TIMES, and it is the larger of the two ownership problems.** The annual
   allowance mechanics (£60,000, the £1-for-£2 taper above £260,000 adjusted income, the £200,000
   threshold-income condition, the £10,000 floor, three-year carry-forward back to 2023/24, the pension
   input amount and what it is) are explained in **key takeaway 2**, in **Option 1's second paragraph**,
   in **`The NHS pension interaction across all five options`**, in **FAQ 2**, in **FAQ 6** and in a
   **table caveat cell**. **O2 gives all of it to `/calculators/nhs-pension-annual-allowance`.** Six
   places against a budget of one sentence and zero figures. **REFRAME permits the writer to fix this
   rather than escalate.**
7. **O34 IS BREACHED, and this is the one that needs the §9.5 clarification before a writer can act.** The
   2026/27 dividend rates appear in **key takeaway 4**, in **`Why surplus cash builds up`**, in
   **Option 2's first paragraph**, in **Option 4**, in **FAQ 9**, in **two table cells** and in a
   **Common-mistakes bullet**. **O34 gives the rate map to the hub.** But the four-route table cannot be
   computed without the rates, and **G5 forbids an example using a rate the body has not already stated
   with its year**. §9.5 proposes the operative resolution and §7.3 sets the count.
8. **The spouse-shareholder paragraph duplicates the hub almost exactly.** Option 2's second paragraph and
   FAQ 9 cover genuine arm's-length ownership, the settlements legislation and ITTOIA 2005 s.619 and
   s.624, which is what the hub's `A spouse or family shareholder` H2 and FAQ 8 also cover. **PROPOSED
   O38 (§9.6) gives it to the hub and this page one sentence and a link.** Not ratified; both packs record
   it identically.
9. **Option 1 duplicates the hub's `Employer pension contributions as a third lever`.** **PROPOSED O37
   (§9.6) splits it by question**: the hub owns the head-to-head at the margin, this page owns the
   deployment of an accumulated balance and the carry-forward calculation. Not ratified.
10. **The corporation tax boundary is over-run mildly.** 19%, 25%, £50,000, £250,000 and the 3/200
    fraction appear in `Why surplus cash builds up in a medical company` and again in the table caption
    logic. **`gp-corporation-tax` owns the rate map.** One sentence plus table inputs.
11. **A live IHT staleness defect, and it is the sharpest factual finding on this page.** Option 3 says
    business property relief "can reduce or eliminate the inheritance tax charge on transfers of shares in
    a qualifying trading company". **From 6 April 2026 that is only true up to the combined £2.5m BR/APR
    allowance (£5m transferable), with 50% relief above it, and AIM shares moved from 100% to 50%**
    (estate ground truth `br_apr_1m_cap_2026_ground_truth`). `house_positions.md` says in terms that it
    does not cover IHT and that any business-succession IHT figure must be taken from that memory. **The
    sentence as written describes the pre-April-2026 regime.** See §10.1.
12. **A probable wrong statutory citation.** Option 5 attributes the anti-phoenix TAAR to **CTA 2010**.
    The winding-up TAAR is in **ITTOIA 2005**, not CTA 2010. **Verify at legislation.gov.uk before
    restating, and do not simply repeat the live wording.** See §10.1.
13. **BADR's saving is never stated, only its rate.** HP §4 added the main CGT rate specifically because a
    page needed it: **24% for a higher-rate taxpayer from 6 April 2026**, so BADR is worth **up to 6
    percentage points**. The page says losing BADR would be "significantly worse" and gives no number.
    **F7 requires that the absence of a figure be stated, never smoothed over**, and this is smoothed over.
14. **No table caption element.** L4 is met by the table's existence and F1 is met by the year sitting in
    the H2 above it, but the table itself carries no caption. A caption stating the effective date is the
    cleaner form.
15. **G2 fails.** The worked comparison sits eight H2s after the rule it demonstrates. **G7 also fails**:
    the table plus its preamble runs past 200 words. **This is the known G7-versus-C2 collision recorded
    as batch-3 pack defect 5; QA should not read the split as a missing component.**
16. **A1 and A5.** The bold opening block runs 121 words to the first H2, **one word over A5's 120-word
    hard ceiling**. The direct answer (an employer pension contribution, for most high earners) arrives at
    roughly word 55, satisfying A1 and A4.
17. **D1 risk in two paragraphs.** The `Why surplus cash builds up` closing paragraph and the
    `How we help` opening both run over 40 words with no figure, date, form name, deadline or named rule.
18. **V5 and V9 checks on the live copy: clean.** Zero instances of `it is not X, it is Y`. Zero
    numeral-count paragraph openers. **One near-miss the rewrite must not convert into the tic:** "Two
    specific risks apply to the MVL route." That is one word from the batch-2 shape that ran 22 times
    across seven pages. **V2 on keyword narration: clean**; see point 5 for the process-narration limb.

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgement.

### 7.1 THE NAMED MISSING-PHRASE LIST: the 14/28-day read is measured on THIS

**10 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case
and punctuation normalised.

**V1 IS BINDING AND THIS LIST IS BUILT TO IT.** Two word orders per idea per page, hard cap, counted as
**non-overlapping longest matches, never raw substrings**. Idea groups are stated so a QA agent can verify
the cap rather than assume it; any V1 finding must quote the spans it counted.

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `retained profit` | The market's noun for this money | 1 of 2 | Harvest: `what is retained profit` (1,300, position 10), `retained profit meaning` (720, 7), `retained profit definition` (260, 17). **Currently 4 occurrences against 12 of our own word.** The phrase must lead, not trail. |
| 2 | `retained profits` (plural) | The market's noun for this money | 2 of 2 | Harvest: `what are retained profits` (1,300, position 11), `retained profits meaning` (720, 9), `retained profits advantages` (390, 28). Currently zero. |
| 3 | `advantages and disadvantages of retained profit` (or an H2 carrying that idea in the market's order) | The decision question | 1 of 1 | Harvest, 590 vol at position 28, plus four sibling forms totalling ~3,000. **This is the intent the incumbent ranks 21st to 55th on and answers with "buy equipment"** (§4.1). |
| 4 | `members voluntary liquidation tax` | The MVL, tax rather than process | 1 of 2 | Harvest, 70 vol, `r-m-t.co.uk` at position 15. **The crossover query, and the only MVL term this page should target** (§4.10 themes 5 and 6). |
| 5 | `MVL` expanded on first use as `members' voluntary liquidation` in the same sentence | The MVL, tax rather than process | 2 of 2 | D4: every term of art gets a six-to-fifteen-word plain gloss on first use. The live page uses `MVL` 11 times and expands it 3 times, but the first body use is inside a heading. |
| 6 | `trading status` | The BADR risk | 1 of 2 | Currently the page writes `trading company` 11 times and `trading status` inside compounds only. **Zero matches for either on both incumbent pages** (§4.1, §4.2), so this is uncontested vocabulary and the page's own differentiator. |
| 7 | `24%` as the main CGT rate BADR is saving against, with its 6 April 2026 date | What BADR is worth | 1 of 1 | **HP §4, added specifically because a page needed it: "say the saving, not just the relief rate."** Currently zero. §5.2 point 4. |
| 8 | `up to 6 percentage points` (or the same arithmetic stated plainly) | What BADR is worth | 1 of 1 | HP §4: 24% main rate less 18% BADR. **The single most useful sentence available on the MVL route and it appears nowhere in the market.** |
| 9 | `not taxed again while it stays in the company` (or the same point in the market's terms) | The reader's first question | 1 of 1 | Incumbent H2 `Retained Profit and Tax`, verbatim at §4.1: "Retained profit that's kept in the business isn't actually taxed, Corporation Tax has already been levied". Our page implies this and never states it. |
| 10 | `pay yourself` | The extraction verb, for the handoff sentence | 1 of 1 | gorillaaccounting H2 `How To Pay Yourself Dividends` (hub pack §4.3). The one-sentence O34 handoff should use the market's verb, not ours. |

**Countable test: 10 of 10 present.** Any other absent phrase is a named BLOCK.

**Explicitly NOT on this list, and the reason is on the record:**
- **`members voluntary liquidation` (880, position 8) and `mvl liquidation` (210, position 8).**
  **DECLINED** at §4.10 theme 6: insolvency-practice intent, on an insolvency-practice SERP, for a service
  we do not provide. Targeting it would mean writing a service page, which the A* bar and I3 both forbid.
- **The whole `calculator` slice of the extraction family** (~9,000 volume at position 1 to 5). **DECLINED**
  in the hub pack §4.9 theme 1 and raised as a tooling question to the owner at hub §10.3.
- **`dividend tax rate` / `dividend tax rates`** (18,100 each). **O34's, and the hub declines them too**,
  because the generic national head is 50 places away on comparable families (STATE 2026-09-01, family 1).
- **`corporation tax rate` / `corporation tax rates`** (12,100 each). **`gp-corporation-tax`'s, and that
  pack declines them too.**
- **`family investment company`** (2,400, position 22). **`/blog/family-investment-company-doctors-consultants`'s.**
  Our Option 4 links out; it does not target the term.
- **The `retained profit definition business` bookkeeping tail** (~270 combined). Definitional intent that
  a primer sentence covers incidentally; not worth a targeted phrase, and K3 keeps the primer above and
  small.

### 7.2 Equity preservation (§9.9 floor 5)

**There is no usable named-query equity set on either engine** (§2.5). The gate is a position gate and an
index gate, stated at the level it is measured at:

| Gate | Endpoint | Pass condition |
|---|---|---|
| E1 | GSC Search Analytics, `page` dimension, 90d | Average position **at or better than 8.0**, against a baseline of 4.90 |
| E2 | same | Impressions **at or above 10** |
| E3 | GSC URL Inspection | `verdict` still `PASS`, `coverageState` still `Submitted and indexed`, `googleCanonical` still self |
| E4 | `scripts/medical_flat_link_audit.py` | All existing internal inbound links still resolve; 0 new broken links |

**Countable test: E1 to E4 all pass at the 28-day and 90-day reads.**

**The `yes please` query row is NOT an equity gate** and its loss is not a finding. It is junk (§2.2) and
is excluded here explicitly so a QA agent does not raise it.

### 7.3 Ownership budgets, countable

| Fact | Owner | Budget on this page | Live count today |
|---|---|---|---|
| **The dividend rate map, the bands, the salary-versus-dividend decision** | **O34**, `/blog/salary-vs-dividend-medical-limited-company-2026` | **At most 1 sentence of exposition outside a table**, stating 10.75% / 35.75% / 39.35% with the 2026/27 tag and linking to the hub, **plus table cells** in the four-route comparison. **No band explanation, no allowance mechanics, no salary interaction, no employer NIC.** Per the §9.5 clarification, which is proposed and not ratified. | 7 places (§6.3 point 7) |
| **Annual allowance, taper, threshold and adjusted income, carry-forward, pension input amount** | **O2**, `/calculators/nhs-pension-annual-allowance` | **1 sentence, then link. ZERO figures**: no £60,000, no £10,000, no £260,000, no £200,000, no three-year carry-forward count. The sentence may say the contribution is capped by the annual allowance, which can be tapered, and that carry-forward may add room. | 6 places (§6.3 point 6) |
| Adjusted net income, £100,000 to £125,140, the 60% band, HICBC | **O3**, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **1 sentence, then link. Never the explanation.** | 0. **Compliant. Keep it that way.** |
| The spouse or family shareholder and the settlements legislation | **PROPOSED O38**, the hub | **1 sentence, then link**, if O38 is ratified. Until then the writer sets it to that budget and reports the conflict, per §9.4. | 2 places (Option 2 paragraph 2, FAQ 9) |
| The employer pension contribution as a head-to-head against a dividend at the margin | **PROPOSED O37**, the hub | **This page keeps the DEPLOYMENT limb** (how much room exists, carry-forward against prior years, what happens when it is exhausted) and hands the marginal head-to-head to the hub in one sentence. Until O37 is ratified, the writer sets it to that split and reports. | Option 1 plus a second pass in the NHS-pension H2 |
| Corporation tax rates, marginal relief, associated companies | `/blog/gp-corporation-tax` | **1 sentence, then link**, plus CT figures as table inputs. G5 requires the body to have stated 19% with its year before the table uses it, so the one sentence carries it. | 2 places |
| s.455, the director's loan account, s.458 | `/blog/consultant-directors-loan-account-s455-medical-company` | **1 sentence, then link, or nothing.** | 0. **Compliant.** |
| The family investment company | `/blog/family-investment-company-doctors-consultants` | **1 short paragraph maximum, then link.** No FIC tax detail beyond naming the structural separation. | Option 4, roughly at budget. **KEEP the size, fix the V2 closing clause.** |
| Whether to incorporate; the four-role employment-status fork | O33 and O35 (**FROZEN**) | **1 sentence, then link, or nothing.** | 0. **Compliant.** |

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

**Every figure in a worked example must be re-derived from stated inputs by `arithmetic_recomputed[]`.**
The live page's arithmetic was re-derived by this pack on 2026-09-01 and **all of it checks out**. It is
printed so a rewrite that changes the presentation cannot silently change the numbers.

**The four-route table, £100,000 of pre-tax company profit, 19% small-profits CT, additional-rate
consultant, sufficient carry-forward assumed, base cost and the £500 allowance excluded for clarity:**

| Route | CT | After-CT cash | Personal tax | Reaching the consultant | Check |
|---|---|---|---|---|---|
| Employer pension contribution | Nil (deductible, profit to zero) | £100,000 into the pension | Nil | **£100,000** | ✓ by construction |
| Dividend, additional rate | 0.19 x 100,000 = **£19,000** | **£81,000** | 0.3935 x 81,000 = **£31,873.50 ≈ £31,874** ✓ | 81,000 - 31,874 = **£49,126** ✓ | ✓ |
| Dividend, basic-rate spouse | £19,000 | £81,000 | 0.1075 x 81,000 = **£8,707.50 ≈ £8,708** ✓ | 81,000 - 8,708 = **£72,292** ✓ | ✓ |
| Capital via MVL with BADR | £19,000 | £81,000 | 0.18 x 81,000 = **£14,580** ✓ | 81,000 - 14,580 = **£66,420** ✓ | ✓ |

**The £200,000 MVL illustration:** 0.18 x 200,000 = **£36,000** ✓ · 0.3935 x 200,000 = **£78,700** ✓ ·
difference **£42,700**, which the page rounds to "over £40,000" ✓

**The combined-rate claim ("around 50% once both layers stack up"):** at 19% CT then 39.35% additional
dividend rate, 1 - (1 - 0.19)(1 - 0.3935) = **50.9%**. **The claim holds.** At the marginal-relief CT rate
of 26.5% it is 55.4%, so if the rewrite states a band rather than a single figure, that is the band.

**Two caveats the rewrite must carry, both already on the live page and both correct:**
1. The pension row is only meaningful where genuine annual-allowance headroom exists; where the allowance
   is fully tapered and there is no carry-forward, the route is capped or unavailable.
2. The MVL row ignores base cost and sits under the £1m BADR lifetime limit.

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| BADR **18%** on qualifying disposals from **6 April 2026**; **14%** between 6 April 2025 and 5 April 2026 as the prior band; **£1m** lifetime limit; 5% ordinary share capital and voting rights, 5% economic entitlement, officer or employee, throughout the **2-year** period | | HP §4, gov.uk re-verified 2026-08-26 |
| **Main CGT rate 24%** on assets other than residential property for a higher-rate taxpayer **from 6 April 2026** (18% for a basic-rate taxpayer up to the band limit) | 2026/27 | HP §4, https://www.gov.uk/capital-gains-tax/rates read 2026-08-26. **New to this page and it is §7.1 phrase 7.** |
| CT **19%** to £50,000, **25%** over £250,000, fraction **3/200**, effective ~26.5% | FY from 1 April 2026 | HP §5. **One sentence plus table inputs only.** |
| Dividend **10.75% / 35.75% / 39.35%**, allowance **£500** | 2026/27, FA 2026 s.4 | HP §5. **One sentence plus table cells only** (§7.3, §9.5). |
| Dividend **8.75% / 33.75%** as PRIOR year, one subordinated clause | 2025/26 | HP §5, F2 |
| FA 2004 **s.196**, deductible on a paid basis, wholly and exclusively, no NIC | | HP §5 |
| TCGA 1992 **s.169H to s.169S** (BADR); **s.28** (time of disposal) | | HP §4 hooks |
| ITTOIA 2005 **s.619**, **s.624**, **s.629** | | HP §5 hooks. Only if the spouse limb survives O38. |
| Dividends, company income, capital distributions and investment returns are all outside NHS accrual; only NHS employment is pensionable for a consultant | | HP §2.C |

**BANNED FIGURES on this page. None of these may be asserted:**

| Banned | Why | What the page does instead |
|---|---|---|
| **Any annual allowance figure**: £60,000, the £10,000 floor, £260,000, £200,000, the £1-for-£2 taper rate, the three-year carry-forward count | **O2.** Six live occurrences today. | One sentence: the contribution is capped by the annual allowance, which can be tapered and which carry-forward may extend, then the link. **Zero figures.** |
| **Any explanation of the dividend BANDS or the salary-versus-dividend comparison** | **O34.** | One sentence stating the three rates with the year tag and the link, plus table cells. |
| **Any 60% effective rate; any explanation of the £100,000 to £125,140 personal-allowance withdrawal** | **O3.** | One sentence, then link. Currently zero occurrences, which is correct. |
| **Any BPR or IHT figure or any unqualified claim that BPR eliminates the IHT charge** | **House positions does not cover IHT and says so.** From 6 April 2026 the combined BR/APR 100% allowance is capped at **£2.5m** (£5m transferable) with 50% relief above, and AIM moved from 100% to 50% (estate memory `br_apr_1m_cap_2026_ground_truth`). **The live sentence describes the pre-April-2026 regime.** §10.1. | Either drop the BPR limb entirely, or state it with the cap and the 50%-above rule after the conductor has written the ground truth. **The writer must not assert either version from memory.** |
| **The anti-phoenix TAAR attributed to CTA 2010** | **Probably wrong** (§10.1). The winding-up TAAR is in ITTOIA 2005. | Verify at legislation.gov.uk and cite correctly, or state the rule without an Act reference. **Do not repeat the live citation.** |
| **Any GMC annual retention fee figure** | O9, F5 as narrowed by the O10 ruling of 2026-08-26 to the GMC fee alone. | Not applicable; listed for completeness of the ban. |
| **Any s.455 rate or director's-loan mechanic** | Its own page's. | One sentence, then link, or nothing. |
| **`8.75%` or `33.75%` presented as current** | F2, and it is the live defect on four competitor pages. | One subordinated clause labelled as prior. |
| **A rate with no year tag** | F1, hard. | Every rate carries its year in the same sentence or the table caption. |
| **Any statement that a GP practice can claim the Employment Allowance** | HP §8.A: HMRC NIM06530 lists GP services as functions of a public nature, so a practice normally **cannot**. Not this page's subject, and the reasoning must not travel. | Say nothing about practices. |
| **Any advice to invest, transfer or opt out** | **I3, and it binds this page harder than any other in the wave** because Option 3 is about investing. The page explains how the rules work and what the tax consequences are; it never recommends an investment, a product or a provider. | Explain the tax and the trading-status consequence. Recommend nothing. |
| **Any MVL process advice presented as our service** | I3, D3, and §4.10 theme 5. We are not licensed insolvency practitioners. | Say the process needs a licensed insolvency practitioner and explain the tax outcome. |
| **Any fabricated statistic**: "most consultants", "we find that around X%", any percentage without a named source | F6, I6. | Nothing. |
| **Any pricing, fee or fee range**, including MVL costs | I5. | Nothing. The incumbent has a `What Are The Costs Of An MVL?` H2; we do not. |

**Countable test: count of banned-figure assertions on the page = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| BADR 18% from 6 April 2026, 14% prior band, £1m lifetime limit, 5% and officer-or-employee conditions, 2-year period | https://www.gov.uk/business-asset-disposal-relief ; TCGA 1992 ss.169H to 169S https://www.legislation.gov.uk/ukpga/1992/12 ; HP §4 |
| **Main CGT rate 24% for a higher-rate taxpayer from 6 April 2026** | https://www.gov.uk/capital-gains-tax/rates ; HP §4 |
| CT 19% / 25% / 3/200, FY from 1 April 2026 | https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax ; HP §5 |
| Dividend 10.75% / 35.75% / 39.35%, £500, 2026/27 | https://www.gov.uk/tax-on-dividends ; FA 2026 s.4 https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted ; HP §5 |
| FA 2004 s.196 | HP §5 |
| ITTOIA 2005 s.619, s.624, s.629 | https://www.legislation.gov.uk/ukpga/2005/5 |
| **The anti-phoenix winding-up TAAR: its correct Act and section** | **MUST be read at legislation.gov.uk before restating. The live page's CTA 2010 attribution is probably wrong** (§10.1). |
| **The distributions exemption on UK dividends received by a company** | **Not in house positions.** Must be verified at legislation.gov.uk (CTA 2009 Part 9A) or stated without the statutory claim. §10.3. |
| **Business property relief for IHT after 6 April 2026** | **Not in house positions, which says it does not cover IHT.** Estate memory `br_apr_1m_cap_2026_ground_truth` carries the £2.5m combined cap, the £5m transferable figure, 50% above and the AIM change. **A conductor writes the ground truth before a writer states it.** §10.1. |
| Dividends and company income not NHS-pensionable; only NHS employment pensionable for a consultant | HP §2.C |
| HMRC's trading-company assessment (main activity, assets, income, management time) | HMRC CG64060 onward / the trading-company definition in TCGA 1992 s.165A. **The live page states the test correctly in substance and cites no source; a citation would strengthen it and D1 rewards it.** |

**Countable test: every external factual claim maps to a row above. Count of unverified claims = 0.**

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug surplus-cash-medical-limited-company-options` | Gate bar met; **0 covered queries lost** (the covered set is one junk row, §2.2, so this reduces to "no regression") |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure in §7.4 re-derives from stated inputs at the real 2026/27 rates |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified, **including the three currently unverified ones** |
| 4. Link resolution | **`scripts/medical_flat_link_audit.py`**, then `predeploy_gate.py` | 0 HARD 404s. **Medical is FLAT-ROUTING: `slug_resolver.py` HARD-REFUSES it and must not be used.** Existing internal targets confirmed present as markdown files 2026-09-01: `family-investment-company-doctors-consultants`, `gp-pension-contributions-tax-relief` (**frozen, link only**), `selling-private-medical-practice-cgt-badr`, plus the TSX routes `/for-consultants` and `/contact`. New links must resolve to `salary-vs-dividend-medical-limited-company-2026`, `gp-corporation-tax`, `adjusted-net-income-doctors-60-percent-tax-trap` and `/calculators/nhs-pension-annual-allowance`, **all confirmed present 2026-09-01.** |
| 5. Equity preservation | §7.2 | **E1 to E4 all pass** |
| 6. Cluster coverage | §7.1 | **10 of 10** phrases placed |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed.** The surplus-cash and retained-profit family is not a dossier §4 row, for the reason at §3.3 point 4. Ledger unchanged. |
| 8. Competitor re-read | §4.10 | **12 themes, 12 decisions, 0 undecided** |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere, including frontmatter. Live count **0**, must stay 0. I1, hard fail.
2. **`slug`, `canonical`, `category`, `date`, `image`, the whole `imageCredit` block and `altText` are
   byte-identical.**
3. **No collapse, no redirect, no URL change.** K4.
4. **Do not touch any frozen page.** The 19 slugs of §1.2. **Contextual links to their live URLs are
   fine** and one already exists to `/blog/gp-pension-contributions-tax-relief`.
5. **I3 binds this page hardest in the wave.** Option 3 is about investing surplus company money.
   **No investment advice, no product, no provider, no allocation, no "we advise you to invest".** The
   page explains how the tax rules work and what the trading-status consequence is, and stops.
6. **No MVL process advice framed as our service.** Say a licensed insolvency practitioner is required.
7. **No Scheme Pays deadline anywhere.** O4, and `/blog/nhs-pension-scheme-pays-doctors-deadlines` is
   prepared separately and is not this batch's at any date. **This is the exact fact that broke batch 1.**
8. **C3: `you` and `your` at 12 to 25 per 1,000 words.** Live figure **2.2**. **This is the largest
   editorial lift in the rewrite.**
9. **C4: `we`, `our`, `us` at 3 or fewer per 1,000, and none in the opening block or any H2.** Live figure
   2.5, which **passes**. **The live H2 `How we help consultants deploy surplus company cash` breaks the
   no-`we`-in-an-H2 limb and must be rewritten** even though the density passes.
10. **B4: 50% to 75% of H2s are question-form.** Live figure 0%.
11. **A5: the opening block runs 40 to 90 words, hard ceiling 120.** Live figure **121**. Over by one.
12. **One CTA, at the end of the page only** (D3).
13. **No interruptive UI** (I7). BATCH3_INDEX **D6**: `DeepScrollModal` and `ReturningBar` are already
    mounted on every route in `Medical/web/src/app/layout.tsx`. **They pre-date this work and no page in
    this wave touches them.**
14. **One change per page per window** (§9.3).
15. **Do not narrate our own process to the reader** (V2 as extended by conductor ruling 3, 2026-08-26).
    **The live Option 4 closing clause is exactly this defect** (§6.3 point 5).
16. **V5 and V9 style caps, whole wave.** `it is not X, it is Y`: **once per page maximum, prefer zero.**
    The numeral-count paragraph opener: **once per page maximum, prefer zero.** Live copy carries zero of
    the first and one near-miss of the second (§6.3 point 18). **The fourth burned shape, from batch 3's
    round-3 QA, is the self-announcing sufficiency claim** ("the point is worth labouring").
17. **The `Option 1` to `Option 5` enumeration is itself a V5 risk at wave level.** Five sequentially
    numbered H2s on one page is a single repeated shape, and if the rewrite keeps it while the hub adopts
    something similar, that is the wave-level clustering §6.3 of the index tells the conductor to catch.
    **Recorded for the conductor, not resolved by this writer.**

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure |
|---|---|---|---|
| Google | GSC Search Analytics, dimension `page` | 2026-06-03 to 2026-09-01 (90d) | **0 clicks, 10 impressions, average position 4.90** |
| Google | GSC, dimensions `page` + `query` | same | **1 row**, `yes please`, 1 impression, position 5. Junk. 9 of 10 impressions anonymised. |
| Google | GSC URL Inspection | 2026-09-01 | **PASS, Submitted and indexed, self-canonical, last crawl 2026-08-21** |
| Bing | `GetPageStats`, **page level** | 2026-05-17 to 2026-08-30 | **Absent from all 329 rows / 80 distinct URLs.** No trace above the top-N floor. |
| Bing | `GetPageQueryStats`, **named-query level** | full `https://www.` URL passed | **0 rows** |

Pro-rated to 28 days from the 90-day Google frame: **3.1 impressions**, 0 clicks.

### 8.2 THE EXPECTATION, and Bing comes first

**Bing, 14 and 28 days, primary.** This URL has **no Bing trace at all today**, on a site where Bing
out-clicks Google **3.3x** and where STATE 2026-09-01 records that **Bing has no poor-position family
whatsoever**: every query the site earns on Bing, it earns at position 2 to 10. **Bing's constraint here
is surface, not rank.** So the Bing test is a first-appearance test:

1. **At the 28-day read, this URL returns at least one `GetPageStats` row.** Today: zero. **This is the
   wave's real primary test on this page.**
2. **If it appears, at least 2 of the 10 §7.1 phrases return a `GetPageQueryStats` impression** for this
   URL. Today: zero of ten. **The two most likely are phrases 1 and 2 (`retained profit`, `retained
   profits`)**, because that is the vocabulary the page currently lacks entirely and the vocabulary Bing
   would have to see something new to match.
3. **Stated with low confidence and the reason given: `GetPageStats` is top-N.** A page can gain Bing
   impressions and stay invisible because it did not reach the top 80. **A miss on test 1 is weak
   evidence and must not be read as a failed rewrite.**

**Google, 28 to 90 days, and NO POSITION PROMISE IS MADE.** §5.3 of the rollout runbook and STATE
2026-09-01 say the same thing: on a domain where Google indexes 18 of 139 URLs and holds the head
commercial family 50 places out, content cannot be promised a Google lift. **This page is one of the 18
and it already ranks at 4.90, so the Google expectation is a HOLD, not a GAIN.**

4. **Average position on the `page` dimension stays at or better than 8.0** against a baseline of 4.90.
5. **Impressions at or above 10** at day 90. **No growth target is set.** Growth needs demand, and the
   demand for medical-modified surplus-cash queries is small enough that the paid harvest cannot see it
   (§3.3 point 4).
6. **At least 1 non-junk query-level GSC row appears by day 90**, against a baseline of one junk row.
   Stated with low confidence: whether an anonymised query becomes visible is GSC's threshold decision.
7. **Index status stays `PASS` and self-canonical**, checked by URL Inspection at the 28-day read.

**The one number that would prove the diagnosis right.** §6.3 point 2 says the page ranks at 4.90 and
earns nothing because it is written in the third person at 2.2 second-person instances per 1,000 words, so
the snippet does not address the searcher. **A first Google click on this URL, at any position inside the
top 10, separates "we rewrote the page" from "we fixed the page".** Baseline: zero clicks in 90 days.

### 8.3 What would count as a FAIL that is not a loss

**Per §9.6 point 2, total impressions rising while the 10 named phrases stay unmatched is DRIFT and is
recorded as a FAIL, not a pass.**

### 8.4 Failure triggers, written as numbers, before the change

> **TRIGGER 1, Google position.** If the GSC `page`-dimension average position for
> `/blog/surplus-cash-medical-limited-company-options` falls **below 11.0** in any 28-day window between
> deploy and deploy+90 days, revert:
> `git checkout <sha derived at write time> -- Medical/web/content/blog/surplus-cash-medical-limited-company-options.md`
> A 4.90 is the second-best average position on the unfrozen corpus, and BATCH3_INDEX's "nothing to lose"
> reading of this page is corrected at §1.1 precisely so this trigger exists.

> **TRIGGER 2, index status.** If URL Inspection returns anything other than `PASS` /
> `Submitted and indexed` with a self `googleCanonical` at the 28-day read, **stop and diagnose before any
> further change to this URL.** STATE 2026-09-01 found four live non-self canonicals inside an area a
> previous session had declared clean, so this is not a theoretical check.

> **TRIGGER 3, impressions.** If 90-day impressions fall **below 5** at the 90-day read, revert to the
> same sha.

> **TRIGGER 4, wave-level and it is the conductor's.** If wave C's editorial QA raises a **V1, V3 or V5
> finding on three or more pages**, the wave has reproduced the batch-1 defect the index exists to prevent
> and its pages are **held rather than deployed** (BATCH3_INDEX §8).

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **10 missing
phrases of §7.1**. **`monitored_pages` registration is a separate owner-triggered step and has NOT been
done by this task**, so this page carries no armed window and the tests above have nothing scoring them
until the owner arms them. **No monitor, alert, cron, email or scheduled job was created.**

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
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary **10.75%**, upper **35.75%**, additional **39.35%**, allowance **£500**) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **One sentence, then link**, plus table inputs under the §9.5 clarification. **Live count is 7 places; §7.3 sets the budget.** |

### 9.2 WHAT THIS PAGE OWNS ANYWAY, and it is most of the page

**A satellite for one fact is not a satellite for its own subject.** No O-row currently names an owner for
the following, and this page is the only surface on the site that carries them. **They are proposed as
row O39 at §9.6 so the map is complete rather than silent:**

- What to do with an accumulated surplus, as a comparable set of routes;
- **the BADR trading-status trap** and the main-activity test as HMRC applies it;
- the **two-year look-back** and why the position cannot be repaired late;
- **the MVL as a tax outcome**, the capital-versus-income treatment, and the anti-phoenix TAAR;
- **investing inside the trading company versus a separate entity**, as a balance-sheet question;
- the **deployment** of an accumulated balance into an employer pension (**proposed O37's** second limb).

### 9.3 THE ROWS THAT CONSTRAIN THIS PAGE

| # | Shared fact | **Owner** | **What THIS page does** |
|---|---|---|---|
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link. ZERO figures.** Live breach in six places (§6.3 point 6). REFRAME permits the writer to fix it. |
| **O3** | Adjusted net income, the **£100,000 to £125,140 taper**, the **60% band**, HICBC | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | **One sentence, then link. DO NOT RESTATE THE 60% BAND.** Live count zero. **Compliant, keep it so.** |
| **O4** | Scheme Pays: two-limb election, mandatory versus voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **No batch-3 page states a Scheme Pays deadline.** `/blog/nhs-pension-scheme-pays-doctors-deadlines` is prepared separately and is not this batch's at any date. |
| **O9** | GMC annual retention fee: deductible, **amount UNVERIFIED** | `house_positions.md` §8 | **No page states a GMC fee figure.** F5, as narrowed by the O10 ruling of 2026-08-26 to the GMC fee alone. |
| **O33** | Incorporation of a medical practice: s.162 relief, the step sequence, the pension-accrual loss | `/blog/medical-practice-incorporation-step-by-step` (**named 2026-09-01 by the D3 ruling**) | **One sentence, then link, or nothing.** The page begins after incorporation, which is correct. |
| **O35** | The employment-status fork for doctors | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 2026-09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** Live count zero. |
| **O16** | Practice-ownership economics shared with veterinary | the existing GP and private-practice corpus | Unchanged; not engaged here. |
| **O17** / **O21-VAT** | The VAT healthcare exemption; the £90,000 registration and £88,000 deregistration thresholds | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` | Not needed. The live page mentions VAT zero times, which is correct. **Cite `O21-VAT`, never `O21`**, per the collision-2 ruling in BATCH3_INDEX §6.1a. |

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. Batch 2's O7 split was ratified precisely because
two writers converged on the same boundary independently and said so.

**This pack proposes no change to any EXISTING O-row. It proposes three NEW rows and one clarifying note,
all four needing ratification before a writer relies on them.**

### 9.5 PROPOSED CLARIFICATION TO O34, and this page cannot be written without it

**Identical text in all three packs in this set.**

**The problem.** O34's consequence column says the satellites get "one sentence, then link". Read
literally, that forbids this page from putting a dividend rate in the four-route comparison table that is
the entire point of the page. **This is the same self-contradiction O24 was corrected for on 2026-08-26**,
where the shared-fact column awarded a fact and the consequence column applied the cap reserved for pages
that do not own it. That correction's own words apply here: the two readings differ by hundreds of words
and the writer would otherwise have to guess.

**Proposed operative text, and this pack is written to it.** O34 owns the **explanation**: what the rates
are, which band a dividend lands in, how the split is decided, and why the 6 April 2026 rise moved the
answer. A satellite may:

1. state the three 2026/27 rates **once**, in one sentence, with the year tag and a link to the hub; and
2. **use those rates as inputs in its own worked example and table cells**, because **G5 requires that
   every rate an example uses has already been stated in the body with its year**, so a satellite that
   cannot state the rate cannot compute its own example either.

**A satellite may NOT** explain the bands, the allowance mechanics, the salary decision, the employer NIC
interaction or the comparison between the two routes.

**Countable for this page: at most 1 sentence of dividend-rate exposition outside a table, plus table
cells.** Until the clarification is ratified, the writer holds to that budget and reports the conflict.

### 9.6 THREE PROPOSED NEW ROWS

**None is ratified. The first two are recorded identically in the hub pack. Neither writer resolves them
alone.**

> **PROPOSED O37. The employer pension contribution as a profit-extraction lever.**
> **The duplication, measured:** the hub carries an H2 `Employer pension contributions as a third lever`
> with three advantages, a £10,000 comparison and the annual-allowance caveat. This page carries
> `Option 1: employer pension contributions` at greater length, plus a second pass in
> `The NHS pension interaction across all five options`, plus FAQ 2 and FAQ 6, plus a table row. **Same
> fact, same statute (FA 2004 s.196), same caveat, on two pages.** That is the batch-1 shape.
> **PROPOSED SPLIT, by question rather than by topic, on the model of the ratified O7 split:**
> **the hub owns the head-to-head at the margin** (a marginal £10,000 of profit: dividend versus employer
> pension contribution, with the arithmetic), because that is a limb of the extraction decision O34 owns.
> **This page owns the deployment of an accumulated balance**: how much room exists, carry-forward against
> prior years, and what happens when the allowance is exhausted, because that is a balance-sheet question.
> **Neither page explains the annual allowance itself. That stays O2's.**

> **PROPOSED O38. The spouse or family shareholder and the settlements legislation.**
> **The duplication, measured:** the hub carries an H2 `A spouse or family shareholder` plus FAQ 8. This
> page carries a near-identical paragraph inside Option 2 plus FAQ 9, citing the same ITTOIA 2005 s.619
> and s.624. Both say the shareholding must be genuine and both warn about settlor-interested
> arrangements.
> **PROPOSED OWNER: the hub**, because a spouse shareholding is a mechanism for splitting **dividend
> income across two personal allowances and two basic-rate bands**, which is squarely the extraction
> decision. **This page takes one sentence and a link**, and keeps the basic-rate-spouse row in its
> four-route table as a computational input under the §9.5 clarification.

> **PROPOSED O39. Surplus cash and retained profit in a medical company: the deployment decision.**
> **The gap:** the ownership map has no row for what this page is actually about, so its own subject is
> unowned and any later page could take it. Named here so the map is complete rather than silent, in the
> same way O36 was folded in from ruling D18 on 2026-09-01.
> **PROPOSED OWNER: this page**, covering the route comparison, the BADR trading-status trap, the
> main-activity test, the two-year look-back, the MVL as a tax outcome, the anti-phoenix TAAR, and
> investing inside the company versus a separate entity.
> **Everyone else: one sentence, then link.** In particular `/blog/selling-private-medical-practice-cgt-badr`
> (wave F) will meet BADR from the disposal side and must not rebuild the trading-status test.

### 9.7 Batch-level style watch (V5 and V9), and it is the CONDUCTOR's job

Batch 1 produced one tic across ten authors. Batch 2 produced a **different** tic, 22 instances across
seven pages against a cap of two. Batch 3's round 3 found a **fourth** shape already forming.

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering
   across the wave, is named in that wave's fix pass, whatever it is.** Conductor's job; invisible from
   inside one page.
2. **Named and already burned:** `it is not X, it is Y` (cap **once per page**, wave-wide);
   the **numeral-count paragraph opener** (cap **once per page**, wave-wide, prefer zero); and the
   **self-announcing sufficiency claim** ("the point is worth labouring", "one line is enough here").
3. **The live copy carries zero of the first and one near-miss of the second** (§6.3 point 18), so the
   budget is available and the correct spend is still zero.
4. **This page carries a wave-level risk the others do not: the `Option 1` to `Option 5` enumeration.**
   Five sequentially numbered H2s is one repeated shape across a whole page. **Recorded for the conductor
   at §7.7 point 17.**
5. **V1 hard cap: two word orders per idea per page, counted as non-overlapping longest matches, never
   raw substrings.** §7.1 is built to this and states its idea groups.
6. **V2 is a live standard**, extended by conductor ruling 3 of 2026-08-26 to any narration of our own
   process. §6.3 point 5 names the live instance.
7. **V7: where a conductor's brief and this map disagree, THE MAP WINS.**

---

## 10. Corrections, findings and open items

**Five. None was acted on. Nothing outside this file was written.**

### 10.1 TWO LIVE FACTUAL DEFECTS ON THIS PAGE, and they are the pack's most important finding

Both are in Option 3 and Option 5, both are load-bearing, and **neither can be fixed by this writer alone**
because both need ground truth that does not exist.

**(a) The business property relief sentence describes a regime that ended on 6 April 2026.** Option 3
says: "Business property relief, which can reduce or eliminate the inheritance tax charge on transfers of
shares in a qualifying trading company, is unavailable for an investment company."

`house_positions.md` states in terms that it **does not cover IHT** and that if a Medical page ever needs a
business-succession IHT figure it must take **BR/APR £2.5m combined 100% allowance (£5m transferable) from
6 April 2026, with 50% relief above, and AIM 100% to 50%** from the estate ground-truth memory
`br_apr_1m_cap_2026_ground_truth`. **After 6 April 2026 BPR does not "eliminate" the charge above the
allowance; it halves the relief.** The sentence is a pre-April-2026 framing on a page tagged 2026/27
throughout.

**Recommended handling, and the writer must not choose it alone: either the conductor writes a house
position for the post-April-2026 BR/APR position (manager-direct, since house positions is shared with
concurrent agents), or the BPR limb is dropped and Option 3 rests on BADR alone**, which it can do without
loss because BADR is the relief this page is actually about. **§7.4 bans the writer from asserting either
version from memory.**

**(b) The anti-phoenix TAAR is probably attributed to the wrong Act.** Option 5 says "the anti-phoenix
Targeted Anti-Avoidance Rule in **CTA 2010**". The winding-up TAAR is an income-tax rule sitting in
**ITTOIA 2005**, not in the corporation tax act. House positions has no TAAR entry at all, so there is
nothing to check the page against.

**Recommended handling: read the provision at legislation.gov.uk, cite it correctly, and add it to house
positions.** Until then, §7.4 bans repeating the live citation and permits stating the rule without an Act
reference. **The substance of the rule as the page states it (a main-purpose test, capital treatment
denied and the distribution treated as income, aimed at contrived arrangements rather than genuine
retirements) is corroborated by `r-m-t.co.uk` (§4.2, HTTP 200) and is not in doubt. Only the citation is.**

**Both are recorded rather than fixed, because a pack does not edit the corpus and because the fix for
each is a ground-truth write that belongs to the manager.**

### 10.2 BATCH3_INDEX D14 is now wrong in its second half, on a fresh measurement

D14 records that `pricebailey.co.uk` URLs 403 to `curl -A "Mozilla/5.0"` and **return 200 to a full
browser header set**. **On 2026-09-01, `https://www.pricebailey.co.uk/blog/family-investment-companies-fic/`
returned HTTP 403 with a `Just a moment...` interstitial to a full browser header set** carrying
`User-Agent`, `Accept`, `Accept-Language`, `Accept-Encoding`, four `Sec-Fetch-*` headers,
`Upgrade-Insecure-Requests` and `Connection` (§4.9).

**D14's diagnosis stands and its remedy no longer suffices.** Recommendation: restate D14 as "a full
header set is the floor, not the fix", and treat pricebailey as an unfetchable source. **No claim in this
pack rests on it.** Recorded identically in the hub pack §10.2.

### 10.3 A house-positions gap this page depends on: the distributions exemption

Option 3 says "UK company dividends received by the company are broadly exempt from corporation tax under
the distributions exemption for most qualifying holdings, which makes equity investment inside a company
reasonably tax-efficient on investment income." **That is correct in substance and it is not in
`house_positions.md`.** F4 requires every load-bearing figure to trace to house positions, and this claim
is load-bearing for Option 3's whole premise.

**Recommendation: add a short house position (CTA 2009 Part 9A) or state the point without the statutory
claim.** §7.5 carries it as a must-verify row.

### 10.4 A finding handed to another page's owner: two peers publish a 32.5% s.455 rate

`sandisoneasson.co.uk`, **a medical-specialist peer**, states on a page dated **Sep 2020** that HMRC
charges tax on an overdrawn loan at **32.5%** (§4.7, HTTP 200), and holds `directors loan` (2,900) at
position 26. `taxqube.co.uk`, published 2022-02-19 and holding `s455 tax` (1,900) at position 19, says
**"the S455 charge is calculated as 32.5 percent"** (HTTP 200). **Three rate generations stale**; the
current rate is **35.75%** on loans made on or after 6 April 2026 (HP §5).

**This is s.455's owner's finding.** It is passed to
`/blog/consultant-directors-loan-account-s455-medical-company`, which is REFRAME and carries **13 Google
impressions at position 9.69**. **This page states no s.455 rate at all**, which is correct.

### 10.5 Wave-C ownership: three proposals and one clarification, all needing ratification

Consolidated so a conductor sees them in one place. **All three packs in this set carry the same list.**

1. **O34 clarification** (§9.5): a satellite may state the three 2026/27 dividend rates once with a link,
   and reuse them as inputs in its own worked example, because G5 forbids an example using a rate the body
   has not stated. **Without this, this page cannot compute its own four-route comparison.**
2. **PROPOSED O37** (§9.6): the employer pension contribution, split by question between the hub
   (head-to-head at the margin) and this page (deploying an accumulated balance).
3. **PROPOSED O38** (§9.6): the spouse or family shareholder and the settlements legislation, owned by the
   hub.
4. **PROPOSED O39** (§9.6, this pack only): surplus cash and retained profit as a deployment decision,
   owned by this page, so its own subject is not left unowned in the map.
5. **A live O2 breach exists on this page (six places) and on the hub (two).** Both are REFRAME, so both
   writers may fix it rather than escalate, per the conductor rulings of 2026-08-26. Both packs set the
   budget to one sentence and zero figures.

---

## 11. Limitations

1. **There is no usable query-level demand evidence for this page on either engine.** One junk GSC row,
   zero Bing named-query rows (§2.2, §2.3). **§7.1's ten phrases are inferred from the generic market's
   word orders crossed with a medical modifier the harvest does not contain**, and that is a weaker
   evidence base than wave A's 51 named Bing queries. Stated so the 28-day read is scored against the
   right expectation.
2. **`GetPageStats` is a top-N endpoint.** Absence from it is not proof of zero Bing impressions; it is
   absence from roughly the top 80 URLs. §8.2 test 1 is weak evidence in the negative direction for
   exactly this reason.
3. **Peer-winnable is Google-derived**, because DataForSEO positions are Google positions. Per owner
   decision 21 it orders the work and excludes nothing.
4. **The harvest's cluster volumes are for ordering and must not be quoted to the pound**, per the dossier
   §4 correction note's own warning.
5. **Thirteen competitor URLs were fetched and one returned HTTP 403** (§4.9), which is also a correction
   to D14 (§10.2). **No fetch was silently dropped.**
6. **No live-production check was run against `medicalaccounts.co.uk` for this page's rendering.** Its
   rendering mode and its internal link targets are derived from the source file and the repo; all targets
   were confirmed to exist as markdown files or TSX routes on 2026-09-01, **but that they render at the
   expected URLs was not verified live.** The URL Inspection call at §2.4 is Google's view, not our fetch.
7. **Three claims on the live page could not be checked against house positions because house positions
   does not carry them**: the post-April-2026 BPR position (§10.1a), the anti-phoenix TAAR's statutory
   home (§10.1b) and the distributions exemption (§10.3). **All three are load-bearing and all three are
   blocked on a ground-truth write that belongs to the manager, not to this writer.**
8. **The scratchpad is contended, and it bit this task.** BATCH3_INDEX **D10** records files being deleted
   under running agents. **This task's first pull script was overwritten in place by a sibling wave-C
   agent writing its own script to the same path**, and the work was redone in a task-specific
   subdirectory. Every figure in §2 and §3 is from a re-run after that.
9. **The rewrite is the only change to this URL in its window** (§9.3), and **no `monitored_pages` row
   exists**, so nothing is scoring the §8 tests until the owner arms them. By design, and recorded rather
   than treated as a gap.
