# §9.5 RESEARCH PACK: /blog/gp-surgery-notional-rent-vs-cost-rent-explained

**Wave B (GP surgery premises), page 1 of 3. Grade EXTEND. Built 2026-08-26.**

Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5. Batch plan `docs/medical/packs/BATCH3_INDEX.md`
(sections 1, 2, 5 and 6 binding). Language rules `docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9).
Ground truth `docs/medical/house_positions.md`. Peer classification
`docs/medical/competitor_universe_2026-08-26.md` §2a. Market map `docs/medical/cluster_dossier_2026-08-26.md`
(CORRECTED §4 ordering). Format exemplar `PACK_blog__qof-income-gp-practice-accounting-explained.md`.

**No paid API call was made by this pack: $0.00.** GSC and Bing Webmaster are free. The competitor keyword set
comes from the already-paid persisted harvest by SQL. Four competitor URLs were fetched with `curl`.

No file under `Medical/web/` was edited. No commit, no deploy, no IndexNow, no `monitored_pages` write, no
monitor, alert, cron or scheduled job.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES.**

The grade comes from `BATCH3_INDEX.md` §2.4's ruling, not from the §9.2 table, because this page falls in the
hole the ruling exists to close: **1 or 2 Bing clicks with under 300 Bing impressions, under 300 Google
impressions and no Google clicks matches neither the REFRAME branch (Bing clicks = 0) nor the EXTEND branch
(Bing clicks >= 3).** The ruling grades such a page EXTEND where its Bing average impression position is 10 or
better. This page holds **6.00** (section 2), so it grades EXTEND and is additive only.

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/gp-surgery-notional-rent-vs-cost-rent-explained` |
| Cluster / topic | GP surgery premises reimbursement: notional rent, cost rent, improvement grants |
| Wave | **B**, three pages, no gate, startable now, concurrent with A and C |
| Lane | `gp_practice_management` (the post's own `category:` is `GP Practice Management`) |
| Source file | `Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** The writer edits the `.md` file directly and writes new blocks as raw HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`) to match. Frontmatter carries `metaTitle`, `h1`, `title`, `keyTakeaways`, `summary` and the `faqs` list. |
| **Revert anchor** | **`bb1db095`**. See the correction below. Do NOT use `d2e75655`, and do NOT use `7be12b11`. |
| Revert path | `git checkout bb1db095 -- Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md` |

### The revert anchor, derived live, and a correction to the index

`BATCH3_INDEX.md` §0 instructs that "every revert anchor in every batch-3 pack is `d2e75655`". **This pack uses
`bb1db095` instead, and the reason is mechanical rather than a disagreement about batch 2.**

HEAD is not stable. Three `git rev-parse HEAD` calls during this task returned three different shas:

```
ad4800ebac954b74ecd2efe1e2c80eb10975b685    (first call)
6714de485c411833f79db5859c2e540de9a9f595    (second call, minutes later)
```

Concurrent agents are committing to `main` throughout this session, so any anchor taken from HEAD is stale
before the pack is finished. **The stable anchor is the last commit that touched this specific file**, which is
`bb1db095`, and it was verified byte-identical to the working tree:

```
$ git log --oneline -1 -- Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md
bb1db095 feat(medical): Stage 0 + baseline items 1-3, competitor intelligence, cluster dossier

$ git diff --quiet bb1db095 -- Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md
   (exit 0: file unchanged since bb1db095)

$ git rev-parse bb1db095:Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md
4bffcdeb2f35644ae2727c1bc49a248fdb82b61f
$ git rev-parse d2e75655:...same path...    -> 4bffcdeb2f35644ae2727c1bc49a248fdb82b61f
$ git rev-parse HEAD:...same path...        -> 4bffcdeb2f35644ae2727c1bc49a248fdb82b61f
```

**For this file `bb1db095` and `d2e75655` carry the identical blob, so the index's anchor is not wrong for this
page, only fragile.** `bb1db095` is preferred because it is pinned to the file's own history and cannot drift as
other agents commit.

**Separately, the index's stated reason for rejecting `7be12b11` is factually wrong, and the correct reason is
sharper.** §0 says "`git cat-file -t 7be12b11` finds no such object on this branch" and that a pack copying it
"would write a revert command that undoes batch 2 as well as its own page". Both claims fail on inspection:

```
$ git cat-file -t 7be12b11                     -> commit          (the object EXISTS)
$ git merge-base --is-ancestor 7be12b11 HEAD   -> exit 0          (it IS an ancestor of HEAD, on main)
$ git branch -a --contains 7be12b11            -> main, origin/main
$ git merge-base --is-ancestor d2e75655 7be12b11 -> exit 1        (7be12b11 is NOT a descendant of d2e75655)
```

`7be12b11` is a real commit on `main` (`fix(generalist): remove duplicate imageCredit frontmatter keys`). It is
on a divergent line that later merged, which is why it is neither ancestor nor descendant of `d2e75655`. **The
real hazard is concrete and worse than a stale sha: its blob for this file differs.**

```
$ git rev-parse 7be12b11:...this file...   -> 58e75fa5f5f967d350cd998b8be2d55c044a4e5b   (DIFFERENT)
$ git diff 7be12b11 HEAD -- ...this file...
    1 file changed, 6 insertions(+), 1 deletion(-)
    -image: ""
    +image: "https://images.pexels.com/photos/2955030/..."
    +imageCredit:
    +  photographer: "Suzy Hazelwood"          (plus photographerUrl, source, sourceUrl)
```

**Reverting this page to `7be12b11` would silently strip its hero image and its `imageCredit` block**, undoing
the 2026-08-26 image backfill on this URL. The index's instruction to avoid `7be12b11` is correct and should
stand; its reason should be replaced with this one. Recorded as correction C1 in the closing section.

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `Notional Rent vs Cost Rent: GP Surgery Premises Guide`
2. `h1`: `Notional Rent vs Cost Rent: How NHS Funds (and Taxes) Your GP Surgery Premises`
3. `title`: `Notional Rent vs Cost Rent Explained: NHS GP Premises Funding and Tax`
4. `metaDescription`, `slug`, `canonical`, `category`, `date`, `altText`, `image` and the whole `imageCredit`
   block, `generator`, `author`, `summary`.
5. **The existing H2 sequence, in this relative order, each string unchanged:**
   1. `Why GP premises funding is its own subject`
   2. `The legal framework: the NHS Premises Costs Directions 2024`
   3. `Notional rent: the owner-occupier route`
   4. `Cost rent: the legacy borrowing-based scheme`
   5. `Improvement grants`
   6. `How each route is taxed: the part most guides skip`
   7. `A worked illustration`
   8. `Notional rent vs cost rent: which leaves a practice better off`
   9. `Common mistakes practices make`
   10. `How we help GP practices with premises funding`
6. All **12 existing H3 strings**, all existing paragraphs, all **14 existing FAQ** question and answer strings,
   all **5 existing `keyTakeaways`** strings. **Nothing existing is reworded, reordered, shortened or "tidied".**

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before** the existing
   `How we help GP practices with premises funding` H2, so the ten existing H2s keep their relative order and the
   byte-identical check reads them as an unbroken subsequence.
2. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place unchanged.
   Note the batch-1 coordinator ruling 1: the 4-to-8 FAQ band governs a newly authored set only, and 14 existing
   substantive entries are never deleted to hit a count.
3. **New key takeaways appended** to `keyTakeaways` (optional; the existing 5 stay).
4. **New internal links inside the NEW blocks only.** No new internal link inside any existing paragraph.

### Frozen-list position, confirmed against BATCH3_INDEX §1

`gp-surgery-notional-rent-vs-cost-rent-explained` **does not appear in the 19-row frozen list** in §1, on any
status. It is not one of the five frozen partnership pages, not one of the three frozen locum pages, and not one
of the three `status='flagged'` rows (`__home`, `gp-accounting-guide`,
`nhs-pension-scheme-pays-doctors-deadlines`). **This page is workable now.**

It is also not on the §3 leave-alone list. The two category hubs held back there
(`/blog/locum-tax`, `/blog/gp-tax-and-accounts`) are not this page's parents; this page's category is
`GP Practice Management`.

**Never propose a collapse, a redirect or a URL change (rule K4). Rewrite in place only. No em-dashes (rule I1).**

---

## 2. THE OWNERSHIP MAP, reproduced in full

**This is the most important part of this pack.** Batch 1 failed because twelve pages were written with no map
and the same explanation landed on seven of them.

**The standing rule, restated verbatim from `BATCH3_INDEX.md` §6: every shared fact has exactly ONE owning page.
Every other page gets one sentence and a link, never the explanation. A writer who needs three sentences is
taking someone else's fact and must stop.**

**V7 is binding: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the map,
states neither fact, and reports the conflict in its return. This is not discretionary. It is the standing order
added on 2026-08-26 after a batch-2 writer was told in its brief to use two figures its pack assigned elsewhere,
obeyed the pack, and reported the conflict. A brief is an instruction about ONE page; only the map can see the
batch.

### 2.1 The row this page OWNS

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O27** | **Notional rent and cost rent**: what each is, how the district valuer sets notional rent, the current-market-rent basis, reviews, and the Premises Costs Directions framework. | **`/blog/gp-surgery-notional-rent-vs-cost-rent-explained` (THIS PAGE)** | The own-vs-rent page gets **one sentence** naming reimbursement as the income side, then link. It must not explain the valuation basis. |

**This page may write O27 at full depth. It is the only page in the corpus that may.**

### 2.2 The rows that CONSTRAIN this page, reproduced verbatim

**Wave B rows, from `BATCH3_INDEX.md` §6.2:**

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O28** | **Last-man-standing lease risk**: the mechanism, why it is a personal liability, and what mitigations exist. | `/blog/gp-partnership-last-man-standing-premises-risk` | The own-vs-rent page gets one sentence, then link. This page holds Bing position 1.0 on the phrase and its equity is the phrase itself. |
| **O29** | **The own-versus-rent decision**: capital, borrowing, the tax treatment of owning surgery premises, CGT on a later disposal, and the partnership capital-account consequence. | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | The other two premises pages get one sentence each, then link. |
| **O30** | **The partnership capital account itself** (how premises equity sits in it) | frozen partnership set, wave E | Wave B: **one sentence and a link only**, and the link target must be checked live because five partnership pages are frozen. Do not explain capital accounts in wave B. |

**Inherited rows from `BATCH3_INDEX.md` §6.1 that bind this page:**

| # | Shared fact | Owner | Batch-3 consequence |
|---|---|---|---|
| **O9** | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** |
| **O10** | Global Sum per weighted patient (**£130.07, 2026/27, VERIFIED**) and the QOF point value (**£227.95, 2026/27, VERIFIED**) | `house_positions.md` §3.A and §3.B | Wave A's GMS page may state £130.07. **This page states neither figure**, because of O19 and O25 below, which are ownership fences and not verification bans. |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | This page does not explain the VAT exemption. See the O17 note in section 5, which is live for this page. |
| **O35** | The employment-status fork for doctors (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

**Wave A rows, reproduced because this page's opening H2 touches core funding in one sentence and must not grow:**

| # | Shared fact | Owner | This page does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | **One sentence naming core funding, then link. NO Global Sum figure on this page. No Carr-Hill explanation. No contract-type comparison.** |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | One sentence and a link. **No QOF point value.** A verification ban being lifted is not an ownership fence being lifted. |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | Every page that mentions a payment landing gets **one sentence** and a link. |
| **O23** | Locally commissioned and enhanced services | `/blog/enhanced-services-gp-practice-income-tax` | One sentence if named at all, then link. |

### 2.3 The O10 ruling, and what it does NOT release

`BATCH3_INDEX.md` §6.1 carries a ruling dated 2026-08-26, raised independently by three pack writers, which this
pack has verified at source in `house_positions.md`:

- **§3.A is headed "Global Sum per weighted patient (VERIFIED AT SOURCE 2026-08-26, block lifted)"** and locks
  **£130.07 per weighted patient for 2026/27**, plus a **£2.18** London Adjustment, quoting SFE Directions 2026
  paragraph 3(4) verbatim. Both 2026 amending instruments were read and neither touches Section 3.
- **§3.B is headed "QOF point value (VERIFIED AT SOURCE 2026-08-26, block lifted)"** and locks **£227.95 for
  2026/27**, quoting SFE Directions 2026 paragraphs 6(6)(b), 6(7), 6(8) and Annex E paragraph E4. Both amending
  instruments were read and neither touches Section 6 or Annex E.
- **Only the GMC annual retention fee remains UNVERIFIED** (GMC returns HTTP 403 to automated fetch, and the
  previously stated "around £433" has been REMOVED as unsupported). Its ban stands.

**Consequence for this page: none of the three figures may appear anyway**, and the writer must understand why,
because the reasons differ.

| Figure | Verification status | Why it is still absent from THIS page |
|---|---|---|
| Global Sum £130.07 | **VERIFIED** | **Ownership (O19).** The GMS page owns it. Not a verification question. |
| QOF point £227.95 | **VERIFIED** | **Ownership (O25).** The QOF page owns it and is inside its batch-1 read window. Not a verification question. |
| GMC retention fee | **UNVERIFIED** | **Verification (O9, hard fail F5).** Also simply not relevant to a premises page. |

**A verification ban and an ownership fence are different things and a writer must not read the lifting of one
as the lifting of the other.** Per V7, where a brief and the map disagree, the map wins.

Note for the QA agent: **language spec F5 has not caught up and is a live false-positive risk.** As written it
hard-fails "a £ or numeric within 30 words of ... 'global sum', 'weighted patient', 'QOF point'". The
`BATCH3_INDEX.md` §6.1 ruling narrows F5 to the GMC annual retention fee alone, and the Global Sum and QOF point
value are governed by F1 (year tag) and F4 (traces to house positions) like any other verified figure. Neither
`language_spec_2026-08-26.md` nor `BATCH2_INDEX.md` O10 has been amended, and neither is amended by this pack.

### 2.4 Ownership-breach audit of the CURRENT page

`BATCH3_INDEX.md` §7 defect D8 records that three wave-A pages carry **pre-existing** ownership breaches inside
copy that K2 freezes, and that one of them narrates the internal ownership rule to the reader in a heading, which
is a live rule-V2 violation. **This page was checked for both shapes. It is CLEAN on both.** The commands and
counts are given so the check is re-derivable rather than asserted.

```
$ F=Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md
$ grep -nEi "also searched as|also written as|same thing|variant|people (also )?search" $F
   (no output)
$ python -c "import sys;print(open(sys.argv[1],encoding='utf-8').read().count(chr(0x2014)))" $F   ->  0
```

Term counts in the full file, `grep -oi <term> $F | wc -l`:

| Term | Count | Verdict against the map |
|---|---|---|
| `capital account` | **0** | **O30 CLEAN.** The page never uses the phrase and never explains capital accounts. |
| `Global Sum` | **1** | **O19 CLEAN.** One naming mention, inside one sentence, no figure, no explanation. |
| `Carr-Hill` | **1** | **O19 CLEAN.** Same sentence. No formula explanation, no weighting variables. |
| `Quality and Outcomes` | 1 / `QOF` 0 | **O25 CLEAN on substance.** Named once in the same funding sentence, no explanation, no point value. See the gap below. |
| `PCSE` | **0** | **O26 CLEAN.** |
| `VAT` / `exempt` | **0 / 0** | **O17 CLEAN.** The page is silent on VAT entirely. |
| `BADR` | **0** | Clean. |
| `capital gains` | 2 | **O29 borderline but COMPLIANT.** Both sits inside `Improvement grant treatment`, which names the interaction in one sentence and hands off by link to the own-vs-rent guide. It does not explain CGT on disposal. |
| `last man standing` | 3 | **O28 COMPLIANT.** Three mentions, each one sentence, each immediately followed by a link to the owning page. Never explains the mechanism. |

**The single sentence carrying O19, O23 and O25 at once**, quoted verbatim so QA can see the whole exposure:

> "Most NHS general-practice income arrives through the core contract: the Global Sum weighted by the Carr-Hill
> formula, plus the Quality and Outcomes Framework, enhanced services and network funding."

That is exactly the "one sentence naming core funding" that O19 permits, with no figure and no explanation.
**It is compliant and the writer must not extend it, because K2 freezes it anyway.**

**One genuine GAP, not a breach, and it is not fixable additively.** That sentence names the Global Sum,
Carr-Hill, QOF and enhanced services and **carries no link to any of their four owning pages**. O19, O23, O25 and
O26 each specify "one sentence, **then link**". The sentence exists; the links do not. This is the shape
`BATCH2_INDEX.md` calls a map GAP rather than a map BREACH: no writer erred, and the copy predates the map
(generated 2026-06-03). **It cannot be repaired inside K2**, because the exemplar's constraint 7.7.2 forbids a new
internal link inside an existing paragraph, and adding four links to a frozen sentence is an edit to frozen copy.

**Handling, and it mirrors the D8 precedent: the writer's allowance for adding links to that sentence is ZERO.
Escalate, do not resolve.** The new blocks may link to the wave-A owning pages freely; the frozen sentence stays
as it is. Recorded as correction C2.

---

## 3. Equity register

**Every figure below was re-pulled by this pack on 2026-08-26.** The scratchpad JSONs named in the writer brief
were absent, deleted mid-session by concurrent agents obeying the standing "delete the temporary files you
create" rule (`BATCH3_INDEX.md` §7 defect D10). **The re-pull reproduced the index's control totals exactly**,
which is corroboration rather than a coincidence:

```
GSCQueryFetcher("medical") -> sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"])         2026-05-25..2026-08-23  ->  21 rows   (index: 21)
  searchanalytics().query(dimensions=["page","query"]) 2026-05-25..2026-08-23  -> 259 rows   (index: 259)
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")          -> 303 rows, 14 snapshots
                                                                                  (index: 303 rows, 14 snapshots)
```

### 3.1 Google: no rows, and that is a fact about crawl demand

**GSC returns ZERO rows for this URL on both dimensions.** Not zero clicks against non-zero impressions: the URL
is absent from the response entirely, on the `page` dimension and on the `page,query` dimension, for the full
2026-05-25 to 2026-08-23 window.

**This is not the same as ranking nowhere, and no line of the drafted page or of any later read may describe it
that way.** Google returns rows for **21 of the 138 sitemap URLs**, roughly 15% of the corpus. On a domain that
Google indexes that thinly, a page's absence is a fact about crawl demand, not a verdict on the page. Per
`BATCH3_INDEX.md` §7 defect D5, this is recorded as a question rather than a finding: **this page has never been
given the chance to fail on Google.**

The 21 URLs Google does return are dominated by the frozen partnership set (`becoming-gp-partner-financial-implications`
46 clicks / 1,798 impressions at position 9.9, `buying-into-gp-partnership-capital-parity-explained` 10 / 498 at
8.4, `gp-partner-vs-salaried-gp-tax-comparison` 14 / 475 at 7.5). **No premises page appears in the 21.**

**Google expectation for this page: none is set, deliberately** (`BATCH3_INDEX.md` §8). A page not indexed at 28
days carries no information on this corpus.

### 3.2 Bing, endpoint by endpoint, and the two must never be compared

`BATCH3_INDEX.md` §0.2 and §7 defect D2 record that `GetPageStats` page-level impressions and
`GetPageQueryStats` named-query impressions are **both true and never comparable**. Both endpoints were pulled
for this URL and both are stated with the endpoint named.

**Endpoint A: `GetPageStats`, page level.** Summed across the **13 weekly snapshots dated 2026-05-29 to
2026-08-21**, which is the in-window subset of the 14 snapshots returned (the 2026-05-22 snapshot falls outside).

| Metric | Value |
|---|---|
| Clicks | **1** |
| Impressions | **5** |
| **Average impression position, impression-weighted** | **6.00** |
| Snapshots in which the URL appears at all | **2 of 13** |
| Per-snapshot detail | position 8.0 on 3 impressions; position 3.0 on 2 impressions |

The impression-weighted mean is `(8.0 x 3 + 3.0 x 2) / 5 = 6.00`. The simple mean of the two snapshot positions
is 5.50. **6.00 is the figure the §2.4 ruling is applied to**, and it clears the "position 10 or better" test with
room, so the EXTEND grade holds on either method.

**Endpoint B: `GetPageQueryStats`, named-query level**, pulled with the FULL `https://www.` URL. Passing a path
returns an empty list with no error, which is a silent-failure path that has now caught several writers
(`BATCH3_INDEX.md` §0.2).

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/gp-surgery-notional-rent-vs-cost-rent-explained")
-> 2 rows
```

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| `notional gp meaning` | 2 | 0 | 8 |
| `whats notional rent` | 1 | 0 | 8 |

**Both are DO-NOT-LOSE queries. Either one ceasing to match after the change is a named BLOCK.**

### 3.3 The endpoint disagreement on THIS page is a third shape, and it is worth recording

`BATCH3_INDEX.md` §0.2 documents the disagreement on the two wave-A anchor pages, where **the clicks agreed
exactly at 7 on both endpoints while the impressions differed by 34%**, and warns that agreement on one field is
an invitation to compare the other.

**On this page the clicks do NOT agree.**

| | `GetPageStats` (page level) | `GetPageQueryStats` (named-query level) |
|---|---|---|
| Clicks | **1** | **0** |
| Impressions | **5** | **3** |

Named queries account for **3 of the 5 impressions and 0 of the 1 click**. **The click this page earned came from
a query Bing does not name**, and the two named queries have earned no click at all. So the wave-A pattern
(clicks agree, impressions diverge) is not a general property of the endpoints; it was a coincidence on those two
pages. **The safe rule is the original one: name the endpoint on every Bing number and never set one against the
other.** Recorded as correction C3.

### 3.4 Wave B baseline, reconciled against the index

`BATCH3_INDEX.md` §8 states a wave B combined Bing baseline of **4 clicks / 13 impressions**. The re-pull
reproduces it exactly, and it is worth writing out because the third page's absence is load-bearing:

| Page | `GetPageStats` clicks / impr | Impression-weighted pos |
|---|---|---|
| `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` (this page) | 1 / 5 | 6.00 |
| `/blog/gp-partnership-last-man-standing-premises-risk` | 3 / 8 | 2.00 |
| `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | **absent from the endpoint** | n/a |
| **Combined** | **4 / 13** | |

**The third page is absent, not zero.** `GetPageStats` is a top-N endpoint (`BATCH3_INDEX.md` §9 limitation 2 and
the Bing top-N trap memo), so absence proves it is outside the top N, never that its impressions are zero. Its
`GetPageQueryStats` call also returned 0 rows. It grades REFRAME and is not this pack's page.

**One index correction on the sibling.** `BATCH3_INDEX.md` §5's wave B table records
`gp-partnership-last-man-standing-premises-risk` at "**pos 1.0**". Its `GetPageStats` **page-level**
impression-weighted position is **2.00** (per-snapshot 1.0, 3.0, 2.0). The 1.0 is its **named-query** figure: it
holds position 1 on three separate `last man standing` phrasings, verified in this pack's own pull:

| Query | Impr | Clicks | Pos |
|---|---|---|---|
| `last man standing gp practice lease` | 2 | 1 | **1** |
| `last man standing lease gp pracitce` | 1 | 1 | **1** |
| `last man standing arrangement gp practice` | 1 | 1 | **1** |
| `last man standing arrangement gp contract` | 1 | 0 | 3 |
| `last partner standing arrangement` | 1 | 0 | 6 |

So §5's table mixes page-level and named-query positions in one column, which is the exact conflation §0.2 warns
against. **§8's wave B test is unaffected and correct**, because it names the query
(`last man standing gp practice lease`) and is therefore already a named-query test. Recorded as correction C4.

---

## 4. The market's keyword set

### 4.1 The harvest, re-derived

```sql
select count(*), count(distinct ranked_keyword), count(distinct competitor_domain), max(date_pulled)
from dataforseo_competitor_data where site_key='medical';
--  39296  |  31539  |  44  |  2026-08-26
```

**39,296 rows, 31,539 distinct keywords, 44 domains, `date_pulled = '2026-08-26'`.** This supersedes the
"32,872 rows, 27 domains" figure repeated in the writer brief and in `BATCH3_INDEX.md` §4. Re-derive, do not
quote either. Recorded as correction C5.

### 4.2 Selection regex, printed so the counts are re-derivable

Postgres ARE uses **`\y`** for a word boundary. **`\b` is a backspace character and silently guts the match**
(`BATCH3_INDEX.md` §7 defect D9: `\yarrs\y` returns 41 rows where `\marrs\b` returns 3). Every regex below uses
`\y`.

**Broad probe, to establish what exists at all:**

```sql
select ranked_keyword, competitor_domain, position, search_volume, url
from dataforseo_competitor_data where site_key='medical'
  and ranked_keyword ~ '\yrent\y|\yrents\y|notional|cost rent|district valuer|valuation office|\ylease\y|\yleasehold\y|improvement grant|premises'
order by search_volume desc nulls last;
--  87 rows, 73 distinct keywords, 15 domains
```

**83 of those 87 rows are off-topic.** They are generic commercial-property and lease-accounting terms from
generalist firms: `vat on commercial rent` (pricebailey, 140), `frs 102 lease changes` (forvismazars, 320),
`rent a room relief 2025` (gorillaaccounting, 260), `lease a car through a business` (e-accounts, 320),
`commonhold and leasehold reform bill` (pricebailey, 590). None concerns GP premises. They are listed here so
the exclusion is stated rather than silent, per §9.2 step 3.

**Narrow, on-topic regex:**

```sql
select ranked_keyword, competitor_domain, position, search_volume, url
from dataforseo_competitor_data where site_key='medical'
  and ranked_keyword ~ '\ynotional\y|cost rent|district valuer|premises|improvement grant|last man standing'
order by search_volume desc nulls last;
--  4 rows
```

### 4.3 The entire GP-premises topic in the paid harvest is FOUR ROWS and TWO KEYWORDS

| Vol | Best pos | Held by | Class | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|---|
| 90 | 29 | nicholsmedical.co.uk | **PEER** (#10) | **no** | **no** | **0 files** | `premises cost directions 2024` |
| 90 | 78 | practiceindex.co.uk | **PEER** (#6) | no | no | 0 files | `premises cost directions 2024` (same keyword, 2nd holder) |
| 70 | 19 | practiceindex.co.uk | **PEER** (#6) | **yes** | **yes** | 26 files | `notional rent` |
| 70 | 38 | r-m-t.co.uk | **PEER** (#9) | no | yes | 26 files | `notional rent` (same keyword, 2nd holder) |

- **Distinct keywords in topic: 2.** Combined deduplicated volume: **160**.
- **Peer-winnable volume: 70**, being `notional rent` alone, held by practiceindex.co.uk at position 19.
  `premises cost directions 2024`'s best peer position is 29, outside the top 20, so it does not qualify.
- **Domains contributing: 3, and all three are PEERS** (`competitor_universe_2026-08-26.md` §2a: practiceindex
  #6, r-m-t #9, nicholsmedical #10). **There is no gov.uk, NHS, BMA or MSE presence anywhere in this topic**, so
  none of the structural unwinnability that closes a third of this niche's head SERP applies here.

Zero-checks, run individually so the absences are proven rather than assumed:

```
'cost rent'         ->  0 rows        'district valuer'    ->  0 rows
'surgery premises'  ->  0 rows        'improvement grant'  ->  0 rows
'gp premises'       ->  0 rows        'last man standing'  ->  0 rows
'notional rent'     ->  2 rows
```

### 4.4 What this actually means, and it changes how the pack should be used

**A 31,539-keyword harvest contains two GP-premises keywords.** That is not a finding about demand. It is a
finding about the harvest's seed set, and it is the same shape as the two ABSORB clusters
`BATCH2_INDEX.md` §7 records as unpackable: **opticians and allied health have no accountancy vocabulary anywhere
in the harvest because none of the harvested domains runs such a page.** Premises is the third instance. The
harvest was seeded from accountancy-firm domains, and GP premises reimbursement is a subject those firms write
about in news posts rather than in keyword-targeted pages.

The corroborating evidence is in the dossier. `cluster_dossier_2026-08-26.md` §9 records that **97 of our 105
in-scope pages match no consensus topic at all**, and names `gp-partnership-last-man-standing-premises-risk`
explicitly as one of the examples. **This page's sibling is a named member of the specialist tail the market does
not group.** So is this page.

**The operative consequence for the writer: on this page the Bing named-query evidence is a strictly better
market signal than the paid harvest, which is the reverse of the usual ordering.** The harvest offers two
keywords at 160 combined volume. Bing offers two live reader-voice queries that the harvest does not contain at
all, on a URL already sitting at position 6.00. Section 7.1 is therefore built primarily from Bing and only
secondarily from the harvest, and that departure is stated here rather than made silently.

### 4.5 The one-character miss, and it is the sharpest single finding in this pack

**The market types `premises cost directions 2024`. The statute is the `Premises Costs Directions 2024`.
Singular "Cost" against plural "Costs". Our page carries the correct legal name and misses the market's word
order by one character.**

```
$ grep -rli "premises cost directions"  Medical/web/content/   ->  0 files
$ grep -rli "premises costs directions" Medical/web/content/   ->  5 files
```

**Zero files in the entire 86-post corpus carry the market's word order.** The page uses the plural form once,
in a frozen H2 (`The legal framework: the NHS Premises Costs Directions 2024`) and in a frozen key takeaway.

This is exactly the case Part 2 of the language spec is written for: **"Nothing in this table is a replacement
instruction: the market phrase is added, and the precise term stays wherever precision matters."** The statutory
name must remain correct everywhere it currently appears. The market's word order is added, once, in new copy,
as natural English. It is 90 volume held by a peer at position 29, which is takeable.

**Rule V1 applies and caps this at two word orders of the idea per page.** The page already carries the plural
form, so the singular form is the second and last. **A third phrasing of the Directions is a defect, not
thoroughness.**

---

## 5. Competitor teardown

Four URLs, all fetched on 2026-08-26 with `curl -A "Mozilla/5.0" -sS -o - <url>`. `WebFetch` returns 403 where
curl returns 200 on this niche (`BATCH2_INDEX.md` §10B). **Every URL is accounted for, including the failure.**

### 5.1 nicholsmedical.co.uk, "2024 Premises Costs Directions: Don't Miss These Updates!"
`https://nicholsmedical.co.uk/news/2024-premises-costs-directions/` &nbsp; **HTTP 200**, 85,365 bytes.
**Class: PEER** (universe §2a #10, specialist medical accountancy firm). Holds `premises cost directions 2024` at
position 29, the best position any domain holds on that keyword.

| | |
|---|---|
| Title | `2024 Premises Costs Directions: Don't Miss These Updates! - Nichols Medical Accountants` |
| H1 | `2024 Premises Costs Directions: Don't Miss These Updates!` |
| Word count | ~1,372 including site chrome; the article itself is far shorter |
| Content H2/H3 | **None.** The only headings are chrome: `Need advice on this topic?`, `Why not book a meeting to discuss?`, `Continue reading`, `View all news & updates`, `Enter search term:` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** the 2024 Directions as a news update. 100% improvement grants ("Practices can now receive full
funding for a wide range of premises projects without the need to combine NHS grants with other capital
sources"), simplified rent reviews, VAT reimbursement widening ("Practices can now claim VAT on renovation costs
and energy-efficiency projects"), shared-use reimbursement, and tighter compliance standards.

**One genuinely useful risk it names and we do not:** sale-and-leaseback. Verbatim: "Practices entering into
sale-and-leaseback arrangements should negotiate VAT terms with landlords carefully. If VAT on rent is deemed
ineligible for reimbursement, practices could face significant financial challenges."

**What it gets wrong or omits, and this is the headline:** it is a page about the Premises Costs Directions that
**never uses the words "notional rent" or "cost rent" at all** (`grep -ci` on the extracted text returns 0 for
both). It carries no valuation basis, no District Valuer, no review cycle, no abatement mechanics, and **no tax
treatment of the reimbursement whatsoever**. It has zero content headings in the body.

**Consequence for us:** the best-placed peer page on the Directions keyword is a heading-less news post that
omits the two nouns the subject is named after. We hold both nouns 60 and 42 times over. We are missing only its
keyword's word order (section 4.5).

### 5.2 practiceindex.co.uk, "Explaining the GP practice accounts, Part 8 of 10"
`https://practiceindex.co.uk/gp/blog/explaining-gp-practice-accounts-part-8-10/` &nbsp; **HTTP 200**, 189,170 bytes.
**Class: PEER** (universe §2a #6). **This is the page holding `notional rent` at position 19, the only
peer-winnable row in the topic.** Bylined to **AISMA**, dated 14 May 2020.

| | |
|---|---|
| Title / H1 | `Explaining the GP practice accounts, Part 8 of 10` |
| Word count | ~1,079 including chrome |
| Content headings | Effectively none. The H3s on the page are all chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`) |
| Tables | No |
| Calculator | No |
| FAQ block | No |
| `notional rent` count | **1** &nbsp;·&nbsp; `cost rent` **1** &nbsp;·&nbsp; `District Valuer` **1** |

**Covers:** premises inside the practice accounts. Owned versus leased premises, balance-sheet treatment at
latest revaluation, the mismatch between property ownership and general profit-sharing ratios, **the property
capital account** ("the equity (valuation less loans outstanding) should be scheduled out in a property capital
account so that the equity per partner is clearly shown"), paying out a leaver's equity, and 100% lending
availability for GP premises.

**Its entire treatment of our owned fact is two sentences**, quoted verbatim because it is the whole of the
incumbent's coverage of a keyword it holds at position 19:

> "If the partners own the premises they will receive either a notional or cost rent from the NHS. Notional rent
> is a market rent assessed every three years by District Valuer Services (DVS)."

**The one insight in the set that we do not have, and it is genuinely good:**

> "The practice should ensure that a review is held soon after the three years are up. If necessary use a
> specialist surveyor to appeal this as **DVS acts for the NHS not the practice**."

That last clause is a real, actionable, adviser-grade point. Our page says the assessment "is independent of the
practice, which is part of the point", which is true and is **the opposite emphasis**. Both are defensible; the
market's framing is more useful to a partner deciding whether to appeal. **This is the strongest single item to
take from the teardown.**

**What it gets wrong or omits:** no abatement, no improvement grants, no conversion-on-redemption rule, no
Premises Costs Directions at all, and **no tax treatment of the reimbursement**. It is six years old (2020) and
pre-dates the 2024 Directions entirely, so its framework is the 2013 Directions by implication.

**A boundary warning the writer must respect.** The bulk of this page is **property capital accounts and partner
equity**, which is **O30 (frozen partnership set, wave E) and O29 (own-vs-rent)**. The incumbent ranks for our
keyword on a page that is mostly about somebody else's fact. **That is not an invitation to follow it there.**
O30 gives this page one sentence and a link only.

### 5.3 practiceindex.co.uk, "An overview of the GP contract updates 2024/25"
`https://practiceindex.co.uk/gp/blog/an-overview-of-the-gp-contract-updates-2024-25/` &nbsp; **HTTP 200**, 197,658 bytes.
**Class: PEER.** Holds `premises cost directions 2024` at position **78**.

| | |
|---|---|
| Title / H1 | `An overview of the GP contract updates 2024/25` |
| Published | 1 April 2024 |
| Word count | ~2,023 including chrome |
| Content headings | None in the body; all H3s are chrome |
| Tables / Calculator / FAQ | No / No / No |

**Covers:** the 2024/25 contract round. **Premises is incidental**: the page ranks for a premises keyword at
position 78 without being a premises page. `grep -ci` returns 0 for `notional rent`, `cost rent`, `District
Valuer` and `Premises Costs Directions` in the extracted body text.

**Consequence for us:** this row is noise in the harvest rather than competition. It is recorded because §9.2
step 3 requires every exclusion to be stated with its volume, not dropped silently.

### 5.4 r-m-t.co.uk, "Healthy rise for GP notional rent"
`https://r-m-t.co.uk/blog/healthy-rise-for-gp-notional-rent/` &nbsp; **HTTP 404** (`Page Not Found | RMT
Accountants and Business Advisors Newcastle`, 43 words).
**Class: PEER** (universe §2a #9). Holds `notional rent` at position 38 in the harvest.

**This is a live defect in the harvest, not a fetch failure on our side.** The URL DataForSEO recorded as ranking
for `notional rent` no longer resolves. The 404 is recorded rather than dropped, per the brief. Two consequences:

1. **The peer holding position 38 on our owned keyword has removed its page.** That is a small, real opening on
   the second-best-held row in the topic.
2. **Harvest URLs are not guaranteed live.** `date_pulled` is 2026-08-26 but the ranking data behind it is
   DataForSEO's index, which lags. Any pack treating a harvest URL as a fetchable page should expect this.
   Recorded as correction C6.

### 5.5 Union of competitor themes minus ours, THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes**. It is zero: **14 themes, 14 decisions.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | `premises cost directions 2024`, the market's singular-"Cost" word order (5.1, 5.3) | **COVER** | 90 volume, best peer position 29, **0 files corpus-wide**. Section 4.5. One placement only, V1 caps the idea at two orders and the plural form is already present. |
| 2 | **DVS acts for the NHS, not the practice, so appeal with a specialist surveyor** (5.2) | **COVER** | The best single item in the teardown. Adviser-grade, actionable, and the opposite emphasis to our current "independent of the practice" framing. Additive, so both survive. |
| 3 | **The three-year review is not automatic; the practice must chase it** (5.2) | **COVER** | Verbatim source: "The practice should ensure that a review is held soon after the three years are up." Our page says reviews happen "periodically, commonly around every three years" and never says who has to trigger one. |
| 4 | 100% improvement grants under the 2024 Directions (5.1) | COVERED ALREADY | Existing H2 `Improvement grants` states it, with the abatement and clawback. Do not touch. |
| 5 | Simplified rent reviews under the 2024 Directions (5.1) | **COVER, briefly** | One clause inside the review block at theme 3. Verify against the Directions before stating any procedural detail; a competitor news post is not a source. |
| 6 | **VAT reimbursement widening, and the sale-and-leaseback VAT risk** (5.1) | **DECLINE, and it is an ownership decline** | **O17 gives VAT to `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams`.** The page currently contains the string `VAT` zero times, which is clean, and it must stay that way. Declining a genuinely useful competitor theme on ownership grounds is the map working, not a gap. |
| 7 | Shared-use-of-premises reimbursement with third parties (5.1) | **DECLINE** | Thin in the source, and its interest is mostly the VAT treatment, which is theme 6. Named so the decline is recorded. |
| 8 | Tighter compliance standards under the 2024 Directions (5.1) | **DECLINE** | Vague in the source with no specifics to verify. Declined for want of a checkable claim, per D1. |
| 9 | **Owned versus leased premises as two categories** (5.2) | **DECLINE** | **O29.** The own-vs-rent page owns the decision. This page gets one sentence and a link, which it already has, six times over. |
| 10 | Property capital account, partner equity scheduled out, leaver payout (5.2) | **DECLINE** | **O30, and it is the frozen wave-E partnership set.** One sentence and a link only, and the page currently contains `capital account` **zero** times, which is cleaner than the allowance. **Prefer keeping it at zero.** |
| 11 | Balance-sheet treatment at latest revaluation (5.2) | **DECLINE** | O30 / O29. Same reasoning as theme 10. |
| 12 | 100% lending availability on GP premises (5.2) | **DECLINE** | **O29** (capital and borrowing). One sentence at most, and the page does not need it. |
| 13 | Ownership not matching profit-sharing ratios (5.2) | **DECLINE** | O29 and O30. The page's existing `Where the income sits` H3 already handles the alignment point it legitimately owns, which is that the interest deduction must follow the income. |
| 14 | 2024/25 contract-round context (5.3) | **DECLINE** | **O19.** Wave A's GMS page owns the contract. Also stale (2024/25 against a live 2026/27 year). |

**Note the shape of that table: 9 of the 14 declines are ownership declines, not quality declines.** The premises
subject sits directly against O29 and O30, and the incumbent that ranks for our keyword is mostly writing their
facts, not ours. **The discipline this pack most needs to enforce is not what to add, it is what to refuse.**

---

## 6. Whitespace

What nobody in the peer set covers, quotably.

1. **Not one competitor page in this set contains any tax treatment of the reimbursement.** Three live pages,
   roughly 4,500 words of GP-premises content between them, and none of them says that notional rent and cost
   rent are taxable income to whoever owns the premises. **This is the page's existing thesis and the market has
   not caught up to it in six years.** Our H2 is called `How each route is taxed: the part most guides skip`,
   and the teardown proves the claim in that heading is literally true.

2. **Nobody defines the word "notional".** This is the whitespace that our own Bing data points at, and it is the
   sharpest section 7.1 material in the pack. Our live query `notional gp meaning` (2 impressions, position 8) is
   a reader asking what the word means, in their own words. Our page uses `notional rent` **60 times** and
   explains the concept well ("In effect the NHS treats the practice as if it were renting its own building"),
   but **never attaches that explanation to the bare word**. A reader searching for the meaning of "notional"
   lands on 2,817 words that assume they already have it. Language rules **A1** (the direct answer to the
   dominant query in the first 60 words), **B2** (every H2 a question in the reader's words or a noun phrase
   containing a market phrase) and **D4** (a six-to-fifteen-word plain gloss on first use) exist for exactly
   this, and here they are pointed at by live query data rather than by a style preference.

3. **Nobody says who has to chase the rent review.** practiceindex says the practice should ensure one happens;
   nobody explains the consequence of not chasing it, which is that the reimbursement sits at a stale valuation
   while costs move. Our page says reviews are periodic and never names an actor.

4. **Nobody says the District Valuer acts for the NHS.** practiceindex says it in one clause (5.2) and draws the
   right conclusion (appeal, with a surveyor). We say the assessment is "independent of the practice, which is
   part of the point". **Both statements are true and the pairing is better than either**, which is a rare case
   where the additive-only constraint helps: the existing sentence stays and the new material adds the
   consequence.

5. **Nobody has written the conversion event.** Cost rent converting to notional rent on mortgage redemption is
   on our page as a rule and nowhere in the peer set at all. `cost rent` returns **0 rows** in a
   31,539-keyword harvest and appears once on one competitor page. It is uncontested.

6. **The reader-voice question set is entirely unserved.** Both of our live Bing queries are colloquial
   (`whats notional rent`, `notional gp meaning`) and every competitor page is written in either statutory
   register or accountant-to-accountant register. bma.org.uk's reader-voice heading style
   ("I am a GP partner and locum") is the model the language spec says to copy outright, and no premises page in
   the market does it.

### KEEP, explicitly

Per §9.3 and rule K1 the specialist layer is never traded away, and **K1 is a hard fail: the drafted page's
count of statutory references, form names, technical terms and figures must be greater than or equal to the
current live page's.** These are this page's differentiators and stay exactly as they are:

- **The full tax section** (`How each route is taxed`), with the interest-versus-capital split, the
  wholly-and-exclusively test, and the medical-partnership-versus-property-partnership fork. Unique in the market.
  **KEEP.**
- **The abatement mechanics**: notional rent reduced for a period scaled to grant size, so the NHS does not
  reimburse the same cost twice. No competitor has it. **KEEP.**
- **The negative-equity protection**: an owner-occupier cannot be required to repay more than the actual sale
  price or best price reasonably obtainable. Genuinely expert and entirely absent from the peer set. **KEEP.**
- **The conversion-on-redemption rule** and the advice to model the likely notional rent before redemption.
  **KEEP.**
- **The three-generation framework history** (2004, then 2013 revoked 9 May 2024, then 2024 in force 10 May
  2024). Precise, dated, correct, and nowhere else. **KEEP.**
- **The worked illustration** and its explicit refusal to state a notional-rent figure, on the stated ground that
  the figure is District-Valuer-assessed and property-specific. **That refusal is the house position
  (`house_positions.md` §4: "Notional-rent amounts are property-specific and District-Valuer-assessed, so do NOT
  lock a figure"), not timidity. KEEP.**
- **The interest-alignment point**: if the premises owner and the borrower are not in the same vehicle, interest
  relief can be lost or mismatched. **KEEP.**

---

## 7. Our current page, read honestly

Source: `Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md`, read in full 2026-08-26.

| | |
|---|---|
| Word count | **4,262** (`wc -w`, whole file including frontmatter); **2,817** body words with HTML tags stripped |
| `metaTitle` | `Notional Rent vs Cost Rent: GP Surgery Premises Guide` (52 characters) |
| `h1` | `Notional Rent vs Cost Rent: How NHS Funds (and Taxes) Your GP Surgery Premises` |
| `title` | `Notional Rent vs Cost Rent Explained: NHS GP Premises Funding and Tax` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| H2 / H3 | **10 / 12** |
| FAQ entries | **14** |
| Key takeaways | **5** |
| Tables | **None** |
| Calculator | None |
| Rendering | Markdown file whose body is **raw HTML**. Write new blocks as raw HTML to match. |

**Current heading list, in order** (this is the frozen sequence):

- H2 `Why GP premises funding is its own subject`
- H2 `The legal framework: the NHS Premises Costs Directions 2024`
- H2 `Notional rent: the owner-occupier route`
  - H3 `Who sets the notional rent` · `The assessment basis` · `The owner-occupier choice` · `Abatement where a grant was taken`
- H2 `Cost rent: the legacy borrowing-based scheme`
  - H3 `Closed to new schemes` · `How cost rent behaves`
- H2 `Improvement grants`
  - H3 `The abatement and clawback period` · `Negative-equity protection`
- H2 `How each route is taxed: the part most guides skip`
  - H3 `Set against the premises costs` · `Where the income sits` · `Capital repayments are not deductible` · `Improvement grant treatment`
- H2 `A worked illustration`
- H2 `Notional rent vs cost rent: which leaves a practice better off`
- H2 `Common mistakes practices make`
- H2 `How we help GP practices with premises funding`

### Blunt read

**This is a strong, accurate, genuinely specialist page that is missing one word-level gloss and one word order.**
It is not thin, it is not stale, and it does not breach the ownership map. That is an unusual shape and it makes
the intervention small and precise.

Specifically:

1. **It never defines the word "notional".** 60 uses of `notional rent`, zero glosses of `notional`. Our own
   live Bing query is `notional gp meaning`. This is item 1 of section 7.1.
2. **It carries the statutory name `Premises Costs Directions` and not the market's `premises cost directions
   2024`.** One character, 90 volume, 0 of 86 corpus files. Section 4.5.
3. **It never names who chases a rent review**, and never says the District Valuer acts for the NHS.
4. **No tables** (rule L4). The page carries a genuine comparison, notional rent against cost rent, in prose
   across two H2s and a third comparison H2. **L4 requires at least one table on any page carrying a
   comparison.** A new comparison table is additive and does not disturb the frozen H2 order.
5. **Question-form heading rate is 0 of 10 H2s, against rule B4's 50% to 75% band.** This is **not a defect to
   fix**. Batch-1 coordinator ruling 2 and the §9.2 EXTEND corollary are explicit: a frozen structure can make
   the structural bands unreachable, that is a consequence of the grade rather than a defect, and **a writer must
   never contort a page to reach a band the grade forbids**. New H2s should be question-form where natural, which
   will lift the rate without touching the ten frozen ones.
6. **Nothing on the page contradicts `house_positions.md`.** Checked line by line against **§4** (premises):
   the Premises Costs Directions 2024 in force 10 May 2024 replacing the 2013 Directions, notional rent as an
   owner-occupier current-market-rent basis assessed by the District Valuer, cost rent as the legacy
   borrowing-based scheme closed to new schemes and converting on mortgage redemption, premises often held in a
   separate property partnership or LLP, and the standing instruction **not to lock a notional-rent figure**.
   **All correct, all present, and the figure refusal is correctly observed.** Also checked against §1
   (partner taxed on profit share), §7 (capital allowances) and §3 (no Global Sum figure). No conflict found.
7. **No stale year tags.** The page's only dated facts are the 2004, 2013 and 2024 Directions, all correct. It
   states no tax-year-tagged rate at all, so the F1 and F2 currency risks that hit other pages do not arise here.
   **There is no de-stale escalation on this page**, which distinguishes it from the wave-A QOF page.
8. **All 8 internal link targets resolve.** Verified against the repo, which matters because O30 requires the
   link target to be checked live where five partnership pages are frozen:

   | Target | Exists | Note |
   |---|---|---|
   | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` (x6) | yes | O29 owner, wave B |
   | `/blog/gp-partnership-last-man-standing-premises-risk` (x3) | yes | O28 owner, wave B |
   | `/blog/gp-tax-deductions-complete-list-2026` | yes | **FROZEN** to 09-10. A contextual link to a live URL is fine. |
   | `/blog/gp-partnership-tax-complete-guide` | yes | **FROZEN** to 09-10. Same. |
   | `/blog/gp-partnership-profit-sharing-tax-planning` | yes | wave E, not frozen |
   | `/for-gps`, `/contact`, `/blog/gp-practice-management` | yes | TSX routes, confirmed present |

9. **`notional rent` appears in 26 files across the corpus and `cost rent` in 29.** That is dispersion of an
   owned term, and most of it is benign: the eleven `gp-accountant-<city>` pages carry one-line mentions. It is
   recorded rather than actioned because those pages are **wave G**, gated to roughly 2026-09-24, and O27 is now
   on the record for whoever scopes that wave.

---

## 8. Deterministic acceptance criteria

### 8.1 Phrases that MUST appear verbatim, the named missing-phrase list

**This is the list the 14-day and 28-day read will be measured on.** It is deliberately short. The harvest
supplies two keywords, and padding this list with the 83 off-topic commercial-property rows from section 4.2
would make the read unfalsifiable.

**Tier A, from the live Bing named queries. These are the sharpest material in the pack.**

| # | Phrase | Source | Live evidence | On page now |
|---|---|---|---|---|
| 1 | `notional gp meaning` | Bing `GetPageQueryStats` | 2 impressions, position 8 | matched, but no gloss of the word |
| 2 | `whats notional rent` | Bing `GetPageQueryStats` | 1 impression, position 8 | `what is notional rent` present in an FAQ |

**Tier A is a coverage requirement, not a literal string requirement, and the distinction is a hard rule.**
`whats notional rent` must NOT be placed as the literal string `whats notional rent`; that is a misspelling and
writing it as body copy would be narrating the keyword to the reader, which **rule V2 forbids outright**. What
must be placed is the **plain-English gloss of the bare word "notional"** that both queries are reaching for. The
test in 8.2 is written accordingly.

**Tier B, from the paid harvest.**

| # | Phrase | Vol | Best pos | Held by | Peer-winnable | On page now | In corpus |
|---|---|---|---|---|---|---|---|
| 3 | `premises cost directions 2024` | 90 | 29 | nicholsmedical.co.uk (PEER) | no | **no** | **0 of 86 files** |
| 4 | `notional rent` | 70 | 19 | practiceindex.co.uk (PEER) | **yes** | **yes, 60x** | 26 files |

Phrase 4 is already present 60 times and needs no action. It is listed because it is the topic's only
peer-winnable row and the read must confirm it is not lost.

**Countable test: phrase 3 present exactly once in new copy. Phrases 1 and 2 satisfied by the 8.2 gloss test.
Phrase 4 still present.**

**V1 hard cap, and the writer must count it.** Two word orders per idea per page, **counted as non-overlapping
longest matches, never raw substrings** (the V1 enforcement note). The Directions idea already carries
`Premises Costs Directions 2024` in a frozen H2. Adding `premises cost directions 2024` makes two. **A third
phrasing is a defect.** Any QA finding on V1 must quote the spans it counted.

### 8.2 The gloss test, which is this page's primary acceptance criterion

**A single new sentence must define the bare word "notional" in plain English, within 25 words of a use of the
word, per rule D4.** It must not be a definition of "notional rent" as a compound, which the page already has 60
times over. It must explain that "notional" means the rent is not actually paid to anyone, it is the rent the
building would command if it were let, and the NHS pays that amount to the owner instead.

**Countable test, all four must hold:**

1. The new copy contains a sentence glossing `notional` as a word, of **6 to 15 words** of gloss (D4).
2. That gloss sits **within 25 words** of an occurrence of `notional` (D4's measurement).
3. The gloss is **not** a restatement of any of the 14 existing FAQ answers (rule H6, overlap above 60% of an
   answer's words with any body paragraph is a fail).
4. The sentence does not tell the reader that two searches mean the same thing (**rule V2, hard fail**).

### 8.3 Equity preservation (§9.9 floor 5)

**Both named Bing queries must still match** in `metaTitle`, `h1`, an H2, an FAQ or body prose after the change:

| Query | Impr | Clicks | Pos |
|---|---|---|---|
| `notional gp meaning` | 2 | 0 | 8 |
| `whats notional rent` | 1 | 0 | 8 |

Google contributes 0 rows, so the combined equity set is **2**.

**Countable test: 2 of 2 matchable.** Run
`python scripts/track2_query_coverage.py --slug gp-surgery-notional-rent-vs-cost-rent-explained --json`.

**This change cannot lose them by construction**, because it is additive only and no existing text is removed.
The check exists to catch an accidental deletion, not an expected loss.

### 8.4 EXTEND byte-identity

Diff the pre and post files. The following must be byte-identical:

- `metaTitle`, `h1`, `title`, `metaDescription`, `slug`, `canonical`, `category`, `date`, `altText`, `summary`,
  `generator`, `author`, `image`, and the whole `imageCredit` block
- All **10** existing H2 strings, in their existing relative order
- All **12** existing H3 strings
- All **14** existing FAQ question and answer strings
- All **5** existing `keyTakeaways` strings

**Countable test:** `git diff` shows **only additions. Deletion count must be exactly 0.** There is no cleared
escalation on this page and therefore no permitted deletion. If a factual correction is later found inside frozen
copy, batch-1 coordinator ruling 3 makes it required rather than permitted, and it is noted in a one-line
addendum. **No such correction was found by this pack.**

### 8.5 Figures that are BANNED on this page

| Banned | Why | What the page says instead |
|---|---|---|
| **Any notional rent or cost rent figure, in £ or per square metre** | `house_positions.md` §4: "Notional-rent amounts are property-specific and District-Valuer-assessed, so do NOT lock a figure." The existing page already refuses this correctly. | The existing refusal, which stays: "any sensible figure has to come from a valuation of your actual premises". |
| **Any Global Sum per weighted patient figure** (£130.07 is VERIFIED) | **Ownership, O19.** The GMS page owns it. Not a verification question. | The existing one-sentence naming of core funding, unextended. |
| **Any QOF point value** (£227.95 is VERIFIED) | **Ownership, O25.** The QOF page owns it and is inside its batch-1 read window. | The existing single naming of "Quality and Outcomes Framework", unextended. |
| **Any GMC annual retention fee** | `house_positions.md` §8: **UNVERIFIED**, GMC returns HTTP 403. **Hard fail F5.** Also irrelevant to premises. | Not applicable. Listed for completeness of the ban. |
| **Any specific improvement-grant abatement band in years** | The 2024 Directions set the bands. The existing page says "a range of years depending on the grant size" and does not enumerate. Enumerating requires reading the Directions at source. | Verify at source per 8.6, or keep the existing framing. |
| **The 2020 "assessed every three years by DVS" phrasing as a hard rule** | Taken from a 2020 competitor page (5.2) that pre-dates the 2024 Directions. Our page's "commonly around every three years" is the safer framing and is already there. | Keep "commonly around every three years". State the review as periodic, not as a guaranteed triennial entitlement, unless verified in the 2024 Directions. |
| **Any percentage or "most practices" generalisation** | Rules **F6** and **I6**, hard fails. No invented survey results, no client-outcome numbers. | Omit. |

**Countable test: count of banned-figure assertions on the page = 0.**

### 8.6 Statute and source re-verification

Every external factual claim in the NEW blocks maps to a row here with a fetch date. **A competitor blog is not a
source.**

| Claim | Source to re-verify |
|---|---|
| The NHS (GMS, Premises Costs) Directions 2024 are the current instrument, in force 10 May 2024, replacing the 2013 Directions revoked 9 May 2024 | `house_positions.md` §4 (verified at the HP-lock gate 2026-06-03). **Confirm the instrument is still current and check for amending instruments before citing**, per the standing method rule in `house_positions.md`: reading a principal instrument is not verification, and an in-year amendment can substitute figures without republishing the parent. |
| Notional rent is a current-market-rent basis assessed by the District Valuer or an appointed valuer for the commissioner | `house_positions.md` §4 |
| Cost rent is closed to new schemes and converts to notional rent on mortgage redemption | `house_positions.md` §4 |
| The rent-review cycle, and whether the practice or the commissioner must trigger a review | **NHS (GMS, Premises Costs) Directions 2024, read at source.** practiceindex (5.2) is 2020 and pre-dates the instrument. **Do not state a procedural duty on a competitor's authority.** |
| The District Valuer acts for the commissioner rather than the practice, and the appeal route | **Verify at the Directions or at VOA / District Valuer Services guidance before stating.** practiceindex asserts it (5.2) and it is plausible, but it is a competitor blog. If it cannot be verified, the point may be made as the existing page already makes it (the assessment is independent of the practice) without the appeal instruction. |
| Improvement grants up to 100% of project value, with a rent-abatement period scaled to grant size | `house_positions.md` §4 and the 2024 Directions. Already on the page. |
| Premises may be held in a separate property partnership or LLP | `house_positions.md` §4 |
| Only the interest element of a loan is deductible, never capital | The wholly-and-exclusively rule for the property business. Already on the page. |

**Countable test: count of unverified claims in new copy = 0.**

### 8.7 The four existing floors plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `track2_query_coverage.py --slug gp-surgery-notional-rent-vs-cost-rent-explained` | Gate bar met; **0 covered queries lost** |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | The existing page contains **no arithmetic**, and the worked illustration is deliberately figure-free. If a new block adds any figure, it is re-derived from labelled illustrative inputs. Otherwise the array is empty. |
| 3. Statute verified at source | `statute_checks[]` | Every row in 8.6 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide; new links resolve via `slug_resolver.py`. **Note: Medical is a FLAT-routing site and `slug_resolver` hard-refuses flat sites**, so link checks on this site go through the audit script, not the resolver. |
| 5. Equity preservation | 8.3 | **2 of 2** Bing queries still match |
| 6. Cluster coverage | 8.1, 8.2 | Phrase 3 placed once; the 8.2 gloss test passes on all four conditions; phrase 4 retained |
| 7. Reconciliation balance | dossier §10 | **No change.** This topic is not a dossier §4 NO-PAGE row and attaches no new topic to this page. The two harvest keywords sit in our specialist tail (dossier §9), which the market does not group. Nothing moves between buckets. |
| 8. Competitor re-read | 5.5 | **14 themes, 14 decisions, 0 undecided** |

### 8.8 Extra hard constraints for this page

1. **No em-dashes** (rule I1, hard fail). The current file has **0** and must still have 0.
2. **No new internal link inside any existing paragraph.** New links go in new blocks only. This specifically
   blocks the tempting repair of the four missing owner links in the frozen funding sentence (section 2.4).
   **That allowance is ZERO. Escalate, do not resolve.**
3. **Do not touch any frozen page** (`BATCH3_INDEX.md` §1, all 19 rows including the three `status='flagged'`
   ones). Contextual links to their live URLs are fine and three already exist.
4. **No collapse, no redirect, no URL change** (rule K4).
5. **Never use UDAs or any dental framing.** `house_positions.md` §3: doctors do not use UDAs.
6. **Never state a notional rent figure.** This is the house position, not caution.
7. **`capital account` must remain at 0 occurrences.** O30 permits one sentence and a link; the page currently
   uses zero, which is cleaner, and **zero is the target**.
8. **`VAT` must remain at 0 occurrences.** O17, and theme 6 of the coverage checklist.
9. **Rule V9 and the batch style watch.** No single sentence-opening or clause shape may repeat more than twice.
   Three shapes are already burned across this corpus and must not be reached for: **`it is not X, it is Y`**
   (dead, 0 instances in batch 2, keep it dead), the **numeral-count paragraph opener** ("Two rules that...",
   "Three things account for..."), and **the corrective definitional contrast `X rather than Y`**, which V9's
   confirmation note records at 5 to 12 instances per page across the live set and is now the dominant tic.
   **Expect a fourth shape rather than a clean result. Vary WHERE the correction sits (a heading, a table, an FAQ
   question) rather than renaming the sentence that carries it.**
10. **Rule L4.** At least one table, given the page carries a comparison and has none. Additive, so it does not
    disturb the frozen H2 order.

---

## 9. Stated expectation, written before the work

**Baseline, from this pack's pull of 2026-08-26**, both endpoints named:

- **`GetPageStats`, page level, 13 snapshots 2026-05-29 to 2026-08-21: 1 click, 5 impressions, impression-weighted
  average position 6.00.** Present in 2 of 13 snapshots.
- **`GetPageQueryStats`, named-query level: 2 queries, 3 impressions, 0 clicks, both at position 8.**
- **GSC, 2026-05-25 to 2026-08-23: 0 rows on both dimensions.**

Pro-rated to 28 days from the 13-week page-level window: **1 x (28/91) = 0.31 clicks** and
**5 x (28/91) = 1.54 impressions**. **These numbers are too small to support a traffic test and no traffic
target is set.** Setting one would be inventing precision the data cannot carry, and
`BATCH3_INDEX.md` §8 already declines a traffic test for wave B on exactly this ground.

### The read at 14 to 28 days, Bing

**The test is phrase coverage and position retention, not volume.**

1. **New named queries.** At least **1 new named query** appears in `GetPageQueryStats` for this URL that was
   absent at baseline, and it is a **meaning or definition query** (containing `meaning`, `what is`, `whats`,
   `explained` or `definition`). Today the named-query count is 2. **Target: 3 or more.**
2. **Position retention on the two baseline queries.** `notional gp meaning` and `whats notional rent` both still
   return impressions, **at average impression position 10 or better**. Both sit at 8 today. **A fall below 10 on
   either is a named BLOCK**, because position 10 is the threshold the §2.4 EXTEND ruling itself turns on: if the
   page drops below it, the grade that permitted this change would no longer be awarded.
3. **Page-level position.** `GetPageStats` impression-weighted average position for this URL **at or better than
   8.0** (baseline 6.00, with a 2.0-point tolerance for a 5-impression sample, which is small enough that a
   single snapshot moves the mean).

**Per §9.6 point 2, total impressions rising while no new meaning-query appears is DRIFT and is recorded as a
FAIL, not a pass.**

### The read at 28 to 90 days, Google

4. **Any GSC row at all.** Today: 0, on both dimensions. **Target: at least 1 page-dimension row.** One, not
   three, because unlike the wave-A QOF topic this one has no peer-winnable depth to convert: the whole topic is
   160 volume, and Google indexes 21 of 138 URLs on this domain. **A zero here at 90 days carries no information
   and is explicitly not a failure**, per `BATCH3_INDEX.md` §8's decision to set no Google expectation.

### Failure trigger, written as a number, before the change

> **If either of the two baseline named queries (`notional gp meaning`, `whats notional rent`) stops returning an
> impression for this URL across two consecutive 28-day windows, or if the `GetPageStats` impression-weighted
> average position for this URL falls below 10.0, revert:**
>
> `git checkout bb1db095 -- Medical/web/content/blog/gp-surgery-notional-rent-vs-cost-rent-explained.md`

### The wave-level test this page contributes to

`BATCH3_INDEX.md` §8 sets the wave B primary test on the sibling, not on this page: **`gp-partnership-last-man-standing-premises-risk`
must still hold Bing position 1 to 3 on `last man standing gp practice lease` at 28 days.** That is a
**named-query** test and it is correctly specified (this pack verified the query at position 1 with 2 impressions
and 1 click). **If an additive-only change moves that, the additive-only rule is not working and the EXTEND grade
needs re-examining across the whole batch.** This page's own contribution to the wave test is the combined figure:
wave B baseline **4 clicks / 13 impressions** page-level across three URLs, of which this page is 1 and 5.

**One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day Bing read.
No internal-link pass, no meta pass, no image change may be stacked on it or attribution is lost.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` for this slug must be populated with the
missing phrases from 8.1, which is **`premises cost directions 2024`** plus the two meaning queries, **not** with
`notional rent`, which the page already carries 60 times.

**No monitor is created by this pack.** Registration in `monitored_pages` is a separate owner-triggered step and
has not been done. Reading a tracker is a pull, not a monitor.

---

## 10. Corrections to the index, the dossier and the inputs

Six, each with the command that produced it. **None was acted on.**

**C1. `BATCH3_INDEX.md` §0's stated reason for rejecting `7be12b11` is factually wrong, and the real reason is
more serious.** §0 says the object does not exist on this branch and that using it would undo batch 2.
`git cat-file -t 7be12b11` returns `commit`, `git merge-base --is-ancestor 7be12b11 HEAD` exits 0, and
`git branch -a --contains 7be12b11` returns `main`. It is a real commit on the current branch. It is also **not**
a descendant of `d2e75655` (they are on lines that later merged), so it could not undo batch 2 by ordering. **The
actual hazard is that its blob for this file differs**: `git diff 7be12b11 HEAD -- <this file>` shows 6
insertions and 1 deletion, and reverting to it **would strip this page's hero image and `imageCredit` block**.
The instruction to avoid `7be12b11` is right and should stand with this reason substituted. See section 1.

**C2. A map GAP, not a breach, in this page's frozen funding sentence.** One frozen sentence names the Global Sum,
Carr-Hill, QOF and enhanced services and carries **no link to any of the four owning pages**, while O19, O23, O25
and O26 each specify "one sentence, **then link**". The copy predates the map (generated 2026-06-03) so no writer
erred, and **K2 plus the no-new-link-in-existing-paragraph rule make it unfixable inside this grade**. This is the
same class `BATCH2_INDEX.md` names when it distinguishes a gap from a breach and says the conductor's check is
not only "did each page respect its row" but "did any fact land twice, or fail to link, that has no row covering
it". **The writer's allowance here is zero. The manager decides** whether adding a link inside frozen copy is
permitted as an ownership correction. Batch-1 coordinator ruling 3 clears **factual** corrections inside frozen
copy, and a missing link is not a factual correction, so this is the same open question D8 raises for wave A.

**C3. The two Bing endpoints disagree in a THIRD shape on this page, and §0.2's characterisation is too narrow.**
§0.2 records that on both wave-A anchor pages the **clicks agreed exactly at 7** while impressions differed by
34%, and warns that agreement on one field invites comparing the other. **On this page the clicks do not agree:
`GetPageStats` gives 1 click and `GetPageQueryStats` gives 0.** Named queries account for 3 of 5 impressions and
0 of 1 click. So the click-agreement was a coincidence on those two pages, not a property of the endpoints. The
operative rule stands and is if anything stronger: name the endpoint on every Bing number and never set one
against the other.

**C4. `BATCH3_INDEX.md` §5's wave B table conflates the two endpoints in one column.** It records
`gp-partnership-last-man-standing-premises-risk` at "pos 1.0". Its **page-level** impression-weighted position is
**2.00** (per-snapshot 1.0, 3.0, 2.0); the **1.0** is its **named-query** position, held on three separate
`last man standing` phrasings. Both figures are true and they are different measurements. **§8's wave B test is
unaffected and correct**, because it names the query and is therefore already a named-query test. The fix is one
column label in §5.

**C5. The harvest is larger than every document in the chain says.** Live counts are **39,296 rows, 31,539
distinct keywords, 44 domains**, `date_pulled = '2026-08-26'`. The writer brief and `BATCH3_INDEX.md` §4 both
carry "32,872 rows, 27 domains", and `BATCH2_INDEX.md` §7 carries "32,872-row harvest" in its ABSORB reasoning.
**Re-derive rather than quoting any of them.** This matters beyond bookkeeping: §7's conclusion that opticians
and allied health have no vocabulary "anywhere in the 32,872-row harvest" was reached against a smaller corpus
than now exists, and **should be re-run against 39,296 before the $1.13 seed-and-harvest spend is authorised.**
It is free SQL against data already paid for.

**C6. A harvest URL is a live 404, and harvest URLs should not be assumed fetchable.**
`https://r-m-t.co.uk/blog/healthy-rise-for-gp-notional-rent/` is recorded in `dataforseo_competitor_data` as
r-m-t.co.uk's position-38 ranking URL for `notional rent`, and returns **HTTP 404** (`Page Not Found | RMT
Accountants and Business Advisors Newcastle`). `date_pulled` is 2026-08-26 but the underlying ranking data is
DataForSEO's index, which lags the live web. Two consequences: **a peer has removed its page on our owned
keyword**, which is a small real opening; and **any pack fetching harvest URLs should expect some to be dead and
must record the status code rather than dropping the row.**

**A NEW ownership row this pack does NOT propose, stated so the decision is visible.** Section 4.2's broad regex
surfaced a coherent, sizeable and entirely unclaimed cluster: **commercial-property VAT**, held almost entirely by
pricebailey.co.uk (a PEER, universe §2a #5) at positions 4 to 11 on `is there vat on commercial property rent`
(70), `vat on commercial rent` (140), `commercial rent vat` (140), `is commercial rent exempt from vat` (70) and
roughly ten more. **It is not this page's, it is not wave B's, and O17 gives VAT to a frozen page.** It is also
arguably not Medical's at all, in the way `pharmacist accountant` is not (index §4 note 3). Recorded so its
absence from every wave is a decision rather than an oversight, and so that whoever scopes the wave that touches
`gp-vat-registration` after 2026-09-10 sees it.

---

## 11. Known limitations of this pack

1. **The paid harvest is effectively empty for this topic** (2 keywords, 160 volume, section 4.4). Section 8.1's
   phrase list is therefore built primarily from live Bing named queries rather than from the market map, which
   is a departure from §9.5's normal ordering. It is stated rather than hidden. **If the harvest is ever re-seeded
   to include GP-premises vocabulary, this pack's section 4 should be re-derived, not reconciled.**
2. **`GetPageStats` is a top-N endpoint** (Bing top-N trap memo). This page appears in only **2 of 13** snapshots,
   so the 1 click and 5 impressions are a floor and not a total. The third wave-B page is absent entirely, which
   proves it is outside the top N and **does not prove zero**.
3. **A 5-impression baseline is small enough that a single weekly snapshot moves the mean position by points, not
   decimals.** The 8.0 tolerance in expectation 3 exists for that reason. Any later read that treats a movement
   from 6.00 as signal without checking the snapshot count is over-reading the data.
4. **The 2024 Directions were verified at the HP-lock gate on 2026-06-03, not by this pack.** Under
   `house_positions.md`'s own standing method rule, a Directions citation must be checked for **amending
   instruments** before any figure taken from it is locked, and that check has not been run for the Premises
   Costs Directions 2024. The incident that produced that rule is in the same document: two SFE parental-leave
   figures were locked correctly from a principal instrument that had already been amended. **Section 8.6 requires
   the amendment check before any new procedural detail is stated.**
5. **No live-production check was run.** Link targets were verified against repo files and TSX route
   directories, not by requesting the live URLs. This is the same limitation `BATCH3_INDEX.md` §9 records for
   defects D1 and D3, and the mandate here is preparation.
6. **Peer-winnable is Google-derived.** DataForSEO positions are Google positions. Per owner decision 21 it
   orders the work and excludes nothing, which matters unusually much on this page, where the entire measurable
   equity is on Bing and Google returns no row at all.
7. **The teardown is three live pages.** The topic supports no more: the fourth harvest URL is a 404, and the
   remaining 83 rows from the broad regex are off-niche commercial-property terms. This is a small teardown
   because the market is small, not because the search was shallow. The zero-checks in section 4.3 are the
   evidence.
8. **No editorial or factual QA has been run.** This is a pack, not a draft. Both Opus QA tracks run against the
   drafted page, and the batch failure trigger is `BATCH3_INDEX.md` §8's: a V1, V3 or V5 finding on three or more
   pages in a wave holds the wave rather than deploying it.
