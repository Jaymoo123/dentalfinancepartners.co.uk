# §9.5 RESEARCH PACK: /blog/opting-out-of-the-nhs-pension-scheme

**NET-NEW page. It does not exist.** Assembled 2026-08-26 from the persisted harvest `dataforseo_competitor_data` (`site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 rows), the binding batch contract `docs/medical/packs/BATCH2_INDEX.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`, `docs/medical/competitor_universe_2026-08-26.md` §2a and §2b, `docs/medical/cluster_dossier_2026-08-26.md` §4 row 11 and §5, and three live competitor fetches recorded in section 4.

Preparation only. The pack does not write the page. Nothing under `Medical/web/` was edited; that tree was read only. Nothing committed, deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron or scheduled job created. **No new DataForSEO calls and no paid lookups: $0.00 additional spend.**

**Why this page exists.** Owner decision 21 of 2026-08-26: peer-winnable volume **orders** the work and **never excludes** any of it, because we take on Bing what we cannot take on Google. This cluster is 18,880 volume on which `bma.org.uk` holds Google positions 6 to 9 across the family. Under a Google-winnability filter this topic disappears. It is not filtered out. It is item 3 of 7.

---

## 1. Target and permission level

**CONSTRAINT FIRST.**

| Field | Value |
|---|---|
| URL | `/blog/opting-out-of-the-nhs-pension-scheme` |
| Cluster / topic | pension opt out · lane `nhs_pension` |
| Grade | **NET-NEW** (BATCH2_INDEX §1 row 3) |
| Source file to be created | `Medical/web/content/blog/opting-out-of-the-nhs-pension-scheme.md` |
| Exists today? | **No.** `ls Medical/web/content/blog/opting-out-of-the-nhs-pension-scheme.md` returns `No such file or directory` (run 2026-08-26). The blog directory holds **79** `.md` files (`ls *.md \| wc -l`). |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the whole `faqs` array live in frontmatter and are separate editable surfaces from the body. |
| Required frontmatter keys | `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (**exactly once**, a recent estate-wide fix removed duplicate `imageCredit` keys), `altText`, `schema` |
| Revert path | **Delete the single new file.** `git rm Medical/web/content/blog/opting-out-of-the-nhs-pension-scheme.md`. There is no equity to lose and no prior version to restore. |

**NET-NEW = full authorial freedom on structure, bounded hard by the ownership map in section 1.2 and by the two-word-order cap in section 7.3.**

**What may NOT be done.**
- Nothing else under `Medical/web/` may be created or edited. One new file, and no other.
- No page is collapsed, redirected or merged (language spec K4). In particular, `/blog/nhs-pension-tax-charges-how-to-minimize` is **not** to be trimmed to make room for this page. See the collision ruling at 1.3.
- No monitor, alert, cron or interruptive UI (language spec I7).
- The eighteen frozen pages (`monitor_until = 2026-09-10`) are untouched. This page links to two of them; linking is permitted, editing is not.

### 1.1 Frozen-page adjacency

Two frozen pages sit next to this topic and both are **link targets, never edit targets**:

| Frozen page | Frozen until | Relationship |
|---|---|---|
| `/blog/nhs-pension-for-locums-form-a-form-b` | 2026-09-10 | Owns the pension **certification** form family (Form A, Form B, SOLO). Hard boundary, see O6 at 1.2. |
| `/blog/nhs-pension-scheme-pays-doctors-deadlines` | 2026-09-10 (`status='flagged'`, live window) | Scheme Pays. One sentence and a link only, see O4 at 1.2. |

### 1.2 THE OWNERSHIP MAP, the rows that bind this page

Repeated verbatim from `BATCH2_INDEX.md` §4 as that document requires. This exists because of binding rule **V3**: in batch 1 the same explanations landed on seven of twelve pages written in parallel.

**Rows this page OWNS.**

| # | Fact | This page's duty |
|---|---|---|
| **O5** | **Why opting out costs more than the contributions**: the employer contribution, the death-in-service lump sum, ill-health cover, and the "should I opt out" reasoning | **This page owns it outright.** This is the page's spine. Annual-allowance and tax-charge pages get one sentence and a link to here. |
| **O6** (split) | **SD502** (the form to leave the scheme) and **RF12** (refund of contributions where under two years' membership), **IN THE OPT-OUT CONTEXT ONLY** | **This page owns the forms in the opt-out context.** It must not extend into Form A / Form B / SOLO territory **at all**. |

**Rows that CONSTRAIN this page. One sentence and a link each, never the explanation.**

| # | Fact | Owner | What this page may say |
|---|---|---|---|
| **O1** | NHS tiered member contribution rates and bands (uplifted 1 April 2026) | `/calculators/nhs-superannuation-tiered-contribution` | One sentence naming the tier idea, then link. **NO TABLE OF RATES.** Batch 1 put this table on three pages, none of them the owner. |
| **O2** | Annual allowance mechanics: taper, threshold income, adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | One sentence, then link. |
| **O3** | Adjusted net income as a general concept: the £100,000 to £125,140 personal-allowance withdrawal, the 60% effective band, free childcare, HICBC | Batch 2 item 5, `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | One sentence, then link. |
| **O4** | **Scheme Pays: the two-limb election, the mandatory / voluntary split, the deadlines** | `/calculators/nhs-pension-scheme-pays` | **ONE SENTENCE AND A LINK. NO DEADLINE DATES. NO ELECTION MECHANICS.** This is the exact fact that broke batch 1. Countable criterion at 7.4. |
| **O12** | Pension accrual during maternity and other statutory leave | Batch 2 item 4, `/blog/maternity-pay-and-maternity-allowance-for-doctors` | One sentence, then link. |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. |

**O4 restated, because it is the reason this map exists.** The Scheme Pays two-limb deadline landed on **seven of twelve** batch-1 pages in near-identical wording, and **none of them was the Scheme Pays page**. This page's legitimate need for Scheme Pays is exactly one clause: a doctor facing a repeated annual-allowance charge has an alternative to opting out, and it is called Scheme Pays, and it is explained over there. That clause is the whole permitted treatment. If the writer finds they need three sentences, they are taking someone else's fact and must stop.

### 1.3 COLLISION FOUND, not recorded in the ownership map. Ruling required before drafting.

**This is the most important finding in the pack and the index does not contain it.**

`/blog/nhs-pension-tax-charges-how-to-minimize` is a **live batch-1 page** and it already carries substantial O5 and O6 content. Read from `Medical/web/content/blog/nhs-pension-tax-charges-how-to-minimize.md` on 2026-08-26 (`grep -rin "opt out\|opt-out\|opting out\|RF12" *.md`):

| Line | What is already live there |
|---|---|
| 69 | A table row naming **RF12** (England and Wales) and **REF1** (Scotland), the two-year qualifying-service test, and that the refund is itself taxed |
| 74 | "Before you opt out, NHS pension refund rules are the ones that bite" |
| 90 | "one more reason a temporary opt-out is expensive" |
| 126 | "There is no NHS pension refund once you have two years of qualifying service, only preserved benefits payable later. That is why an NHS pension opt out refund is a young-doctor question" |
| 128 | "The refund form itself, the timescales and the mechanics of opting out sit with the [guide to NHS pension forms for locums]" |
| 162 | `<h3>Partial retirement instead of opting out</h3>` |
| 168 | `<h3>Why opting out is rarely a tax win</h3>` |
| 172 | "Treat opting out as a last resort, modelled in full." |
| 196 | "Opting out to save tax, forfeiting accrual worth many times the charge." |

That page is the **only** file in the 79-file blog corpus containing `RF12`, `nhs pension opt out` or `nhs pension opt out refund`.

**Three separate problems, each with a ruling.**

**(a) O5 is already partly written on a live page.** Its `<h3>Why opting out is rarely a tax win</h3>` is the O5 argument in miniature. **Ruling: this page still owns O5 and writes it in full.** The incumbent treatment is three short blocks inside a page whose H1 is about annual-allowance tax charges, reached only by a reader who already has a charge. This page is reached by a reader deciding whether to stay in the scheme at all, which is a different and much larger intent (18,880 volume against that page's whole topic at 2,470). **The incumbent page is not edited** (K4, and it is not this task's file). The duplication is recorded here as a **batch-3 back-patch candidate**: after 2026-09-11 the incumbent's opt-out blocks should be reduced to one sentence and a link to this page. Named, not silent, not done now.

**(b) O6 as written in the index CONTRADICTS the live batch-1 ruling.** `PACK_blog__nhs-pension-tax-charges-how-to-minimize.md` "Ruling 2, the refund line" states that RF12 mechanics belong to `/blog/nhs-pension-for-locums-form-a-form-b` (frozen), citing dossier NO-PAGE row 14, and instructs "Do not reproduce the RF12 walkthrough". `BATCH2_INDEX.md` O6 instead assigns RF12 **in the opt-out context** to this page. The live page follows the batch-1 ruling and its line 128 points RF12 mechanics at the locums page. **Ruling: BATCH2_INDEX O6 wins, on precedence.** It is the later document, it is the binding batch contract for this batch, and it names the split explicitly ("stated so it cannot drift"). This page writes RF12 **as the opt-out consequence**: who qualifies (under two years' membership), what is given up, and that the refund is taxed. When the locums page unfreezes on 2026-09-11 its RF12 section links here rather than repeating, exactly as O6 directs. **Flagged for the conductor**, because two packs currently give opposite instructions and only one can be right.

**(c) A live V2 violation sits in the colliding page.** Line 69 of `nhs-pension-tax-charges-how-to-minimize.md` reads "An NHS pension refund, **also searched as** an NHS pensions refund or an NHS pension opt out refund". That is keyword research narrated to the reader, which binding rule **V2** bans and which the batch-1 QA blocked elsewhere. It shipped here. **Not this task's file to fix.** Recorded so it is not lost, and it is the sharpest available warning to this page's writer: **this page must never do that.** Countable criterion at 7.4.

---

## 2. Equity register

**THE PAGE DOES NOT EXIST. THERE IS NO EQUITY. THERE IS NOTHING TO PROTECT.**

This section is present rather than omitted, per `BATCH2_INDEX.md` §1 ("Every equity register is therefore empty, and each pack says so rather than omitting the section").

**Google.** Zero equity, and the reason is structural rather than measured: there is no URL, so there can be no GSC row for it. No `searchanalytics.query` pull was made against a non-existent page. Separately, Google indexes roughly **21 of 130 URLs** on this site, which is a domain-authority condition and not a technical defect.

**Bing, fresh evidence, and it is the meaningful number.** `BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')`, pulled **2026-08-26**, returned **648 site-level queries**. **ZERO of the 648 matched the opt-out family.** The site is not currently visible on this topic on either engine, on any phrasing, at any position.

| Register | Value | Provenance |
|---|---|---|
| Google query-level rows for this URL | **0** (URL does not exist) | n/a |
| Bing named queries for this URL | **0** (URL does not exist) | n/a |
| Bing site-level queries matching the opt-out family | **0 of 648** | `BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')`, 2026-08-26 |

**DO-NOT-LOSE queries: none.** There is no equity-preservation floor on this page and floor 5 in section 7.6 is recorded as **not applicable**, not as passed.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'` (32,872 rows, 27 domains, no volume floor). **No new API calls.**

**Selection regex for this topic, printed so the counts are re-derivable:**

```
ranked_keyword ~ '(opt out|opt-out|opting out)' and ranked_keyword ~ '(pension|nhs|nation)'
```

### 3.1 Headline figures, re-derived

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
      and ranked_keyword ~ '(opt out|opt-out|opting out)' and ranked_keyword ~ '(pension|nhs|nation)'),
k as (select ranked_keyword, max(search_volume) v,
  min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos,
  min(position) best_any_pos
 from c group by 1)
select count(*) uniq_kws, sum(v) total_vol,
 sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
 count(*) filter (where best_peer_pos<=10) peer_top10_kws,
 count(*) filter (where best_any_pos<=10) any_top10_kws
from k;
```

Result, verbatim:

| uniq_kws | total_vol | peer_winnable_vol | peer_top10_kws | any_top10_kws |
|---|---|---|---|---|
| **24** | **18,880** | **4,280** | **0** | **15** |

**All four headline figures in the brief re-derive exactly.** 24 deduplicated keywords, 18,880 total volume, 4,280 peer-winnable, **0** keywords held by a peer inside the Google top 10. The fifth column is the one that frames the whole page: **15 of 24 keywords have a top-10 Google result, and every single one of those 15 is `bma.org.uk`.** The peer set holds nothing above position 15.

Peer set = the 22 domains classified peer-winnable in `competitor_universe_2026-08-26.md` §2a. Peer-winnable = deduplicated volume where a peer holds position <= 20. `bma.org.uk` is §2b non-peer: a trade union with 15 head-term queries and a best position of 1, and it "cannot be outranked on brand".

### 3.2 The full keyword set, 24 rows

`Verbatim in our copy?` checked by `grep -ril "<phrase>" Medical/web/content/blog/*.md` across all **79** blog files, run 2026-08-26. **READ ONLY, nothing under `Medical/web/` was edited.** The target page does not exist, so the "on page" answer is `n/a` for all 24 rows; the column below reports presence **anywhere in the blog corpus**.

| Vol | Best peer pos | Peer domain | Best any pos | Any domain | Verbatim in our copy? |  Keyword |
|---|---|---|---|---|---|---|
| 2400 | none | none | 28 | bma.org.uk | **no** | pension opt out |
| 1900 | 18 | medicsmoney.co.uk | 9 | bma.org.uk | **yes**, 1 file (`nhs-pension-tax-charges-how-to-minimize.md`) | nhs pension opt out |
| 1900 | **16** | medicsmoney.co.uk | 6 | bma.org.uk | **no** | opt out of pension nhs |
| 1600 | 21 | medicsmoney.co.uk | 9 | bma.org.uk | **no** | nhs pension opt out form |
| 1600 | none | none | 6 | bma.org.uk | **no** | nhs pension scheme opt out form |
| 1600 | none | none | 6 | bma.org.uk | **no** | opt out of nhs pension scheme form |
| 1600 | 31 | medicsmoney.co.uk | 7 | bma.org.uk | **no** | opting out of nhs pension |
| 1600 | none | none | 8 | bma.org.uk | **no** | pension nhs opt out form |
| 880 | none | none | 34 | bma.org.uk | **no** | opt out pension form |
| 880 | none | none | 54 | bma.org.uk | **no** | pension opt out form |
| 590 | none | none | 20 | bma.org.uk | **no** | can you opt out of pension |
| 480 | **15** | medicsmoney.co.uk | 6 | bma.org.uk | **no** | how do i opt out of nhs pension |
| 480 | none | none | 7 | bma.org.uk | **no** | how to opt out of nhs pension |
| 390 | none | none | 28 | bma.org.uk | **no** | can i opt out of pension |
| 210 | none | none | 8 | bma.org.uk | **no** | nhs pension opt out refund form rf12 |
| 170 | 50 | medicsmoney.co.uk | 50 | medicsmoney.co.uk | **no** | benefits of opting out of pension |
| 90 | 24 | medicsmoney.co.uk | 6 | bma.org.uk | **no** | can i opt out of nhs pension |
| 90 | 57 | medicsmoney.co.uk | 57 | medicsmoney.co.uk | **no** | opt out national insurance |
| 90 | 52 | medicsmoney.co.uk | 52 | medicsmoney.co.uk | **no** | should i opt out of pension |
| 70 | none | none | 10 | bma.org.uk | **no** | nhs pension opt out and refund |
| 70 | 50 | medicsmoney.co.uk | 10 | bma.org.uk | **yes**, 1 file (same file) | nhs pension opt out refund |
| 70 | 33 | medicsmoney.co.uk | 7 | bma.org.uk | **no** | opt out nhs pension refund |
| 70 | none | none | 39 | bma.org.uk | **no** | pension opt out form uk |
| 50 | none | none | 8 | bma.org.uk | **no** | nhs pension opt out form pdf download |

**Corpus coverage: 22 of 24 phrasings are absent from the entire 79-file blog corpus.** The two present are both in `nhs-pension-tax-charges-how-to-minimize.md`, the colliding page at 1.3. (A third grep hit, `pension opt out`, is a substring of `nhs pension opt out` in the same file and is not an independent placement.)

### 3.3 The word-order problem, and why rule V1 is the sharpest constraint on this page

**This cluster is the worst V1 hazard in the whole batch.** It is, substantially, **one idea written many ways**:

| Idea | Word orders present in the harvest | Combined volume |
|---|---|---|
| "opt out of the NHS pension" | `pension opt out` · `nhs pension opt out` · `opt out of pension nhs` · `opting out of nhs pension` · `can i opt out of nhs pension` · `how do i opt out of nhs pension` · `how to opt out of nhs pension` | **8,840** |
| "the form to opt out" | `nhs pension opt out form` · `nhs pension scheme opt out form` · `opt out of nhs pension scheme form` · `pension nhs opt out form` · `opt out pension form` · `pension opt out form` · `pension opt out form uk` · `nhs pension opt out form pdf download` | **8,280** |
| "opt out and get a refund" | `nhs pension opt out refund` · `nhs pension opt out and refund` · `opt out nhs pension refund` · `nhs pension opt out refund form rf12` | **420** |
| "should I / can I / is it worth it" | `should i opt out of pension` · `can i opt out of pension` · `can you opt out of pension` · `benefits of opting out of pension` | **1,240** |

**Four ideas, twenty-four word orders. Rule V1 permits TWO word orders per idea per page. Hard cap. That is a maximum of eight placements, and the remaining sixteen go unplaced and are reported.**

The market having eight word orders of "the form to opt out" is not licence for eight. It is licence for two on this page, and the rest are reported as unplaced with a reason. **Placing a third order of any one idea is a defect, not thoroughness.** Countable criterion at 7.3.

And per **V2**, the page must never tell the reader that these are the same search. No "also searched as", no variant list, no table column of alternative phrasings. The orders go IN the prose AS prose or they do not go on the page.

---

## 4. Competitor teardown

**Cap and completeness.** A URL-level query over the same regex returns **four** competitor URLs holding keywords in this cluster, not three. All four are torn down below; none is dropped.

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
select url, count(distinct ranked_keyword) kws, sum(search_volume) vol, min(position) best_pos
from (select distinct on (url, ranked_keyword) url, ranked_keyword, position, search_volume
 from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
 and ranked_keyword ~ '(opt out|opt-out|opting out)' and ranked_keyword ~ '(pension|nhs|nation)'
 order by url, ranked_keyword, position) t
group by 1 order by 2 desc;
```

| URL | Kws | Vol | Best pos | Class |
|---|---|---|---|---|
| `bma.org.uk/.../opting-out-of-the-nhs-pension-scheme` | 17 | 18,110 | **6** | non-peer (§2b) |
| `medicsmoney.co.uk/opting-out-of-the-nhs-pension-scheme/` | 11 | 8,060 | 15 | **PEER** (§2a rank 1) |
| `bma.org.uk/.../refunding-your-pension-contributions` | 3 | 350 | 7 | non-peer (§2b) |
| `bma.org.uk/.../transferring-money-out-of-the-nhs-pension-scheme` | 1 | 70 | 10 | non-peer (§2b) |

**Fetch status: 4 of 4 returned HTTP 200. There are no non-200s in this teardown and no flagged fetch gaps.** (Contrast batch 1, which carried seven fetch-failed URLs.)

### 4.1 https://medicsmoney.co.uk/opting-out-of-the-nhs-pension-scheme/
11 in-cluster keywords · 8,060 volume · best position 15 · **PEER, §2a rank 1, the strongest peer in the universe.** Fetched 2026-08-26, **HTTP 200**.

**This is the beatable page and this is the deepest teardown in the pack.**

- Title: "Opting out of the NHS pension scheme - Medics Money". H1: "Opting out of the NHS pension scheme". **~1,200 to 1,400 words.**
- H2 set, in order: *Over 150,000 NHS staff opted out of the NHS Pension between April and December 2022* · *Here's 10 things to think about before you opt out of the NHS Pension* · *Opting out of the NHS Pension is a pay cut to your future self* · *1. Don't miss out on employer contributions* · *2. Sacrificing a guaranteed lifetime income* · *3. Inflation proof retirement income growth* · *4. No investment risk with the NHS Pension* · *5. Impact on dependent benefits* · *6. Potential loss of lump sum death benefits* · *7. Dealing with ill health* · *8. Can't afford the contribution* · *9. Considering tax implications* · *10. So where to start?* · *About the author* · *Explore our top 10 blog posts here*
- H3: **none.** Tables: **no.** Calculator: **no.** FAQ block: **no.** Named forms: **none. It does not name SD502. It does not name RF12.**
- Author: a named clinician-accountant with an "About the author" block. CTAs: four, including two downloads and an adviser-matching route.

**Judgement, and it is the commercial finding of the pack.** This is a **listicle of ten reasons not to opt out** and it is the entire peer-held position in an 18,880-volume cluster. Its structure is a numbered countdown with no headings below H2, no table, no FAQ and no worked figures, and it ranks at positions 15 to 57 with it. Four specific weaknesses, each one directly addressable:

1. **It has no forms and no procedure.** A cluster containing **8,280 volume of "the form to opt out"** phrasings, and the strongest peer page names neither form. It ranks 21st for `nhs pension opt out form` (1,600) on a page that does not contain the form's name. That is the single largest and cheapest gap in the teardown.
2. **It has no figures at all.** Ten reasons, zero arithmetic. Reason 1 is "Don't miss out on employer contributions" and it does not quantify the employer contribution against the member contribution, which is the one calculation the entire decision turns on.
3. **Its tax section is one item out of ten** ("9. Considering tax implications"), placed ninth. The accountancy question is an afterthought on the page written by the accountancy-adjacent peer.
4. **Its openings and furniture violate rules we are bound by anyway.** The named-clinician byline and "About the author" block are barred to us by **I2**; the four in-body CTAs by **D3**; the "Explore our top 10 blog posts" furniture is chrome. Roughly two of fifteen headings are not substantive.

**What it does that is worth taking.** The framing **"Opting out of the NHS Pension is a pay cut to your future self"** is the best single sentence in the cluster and the correct emotional register for the decision. And its opening statistic move (a dated, sourced count of NHS staff who opted out) is the right shape, though **F6 forbids us reproducing any statistic without a named source we have verified**.

### 4.2 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/opting-out-of-the-nhs-pension-scheme
17 in-cluster keywords · 18,110 volume · **best position 6** · **NON-PEER, §2b.** Fetched 2026-08-26, **HTTP 200**.

Per `language_spec` Part 4 point 4, this is read for **vocabulary and heading patterns**, never for length and never for jargon handling.

- Title / H1: "Opting out of the NHS pension scheme". **~2,100 words.**
- Headings, verbatim, in order: *If you are thinking about opting out* · *Tax implications* · *What benefits will be lost if you leave a pension scheme* · *The key differences can be summarised as follows* · *Think carefully - seek independent advice*
- Tables: **yes**, one comparison table of death-benefit scenarios within and after 12 months of leaving. FAQ: **no**.
- **Named form: NHS Pensions form SD502.** This is the only page in the teardown that names it.
- Vocabulary harvested: *"written election"* to exit for future service · *"gratuity"* for the death-in-service benefit · death-in-service quantified by section (1995: 3x pension, 2008: 2.25x, 2015: 2.025x; two times actual annual pay for active members) · ill-health *"enhancement"* available to active members and **not** to deferred members.
- Its stated position: *"It is unlikely to be in the best interests of the vast majority of scheme members to make the decision to opt-out"*.

**Judgement.** It holds positions 6 to 9 across the family on **five headings**, one of which ("The key differences can be summarised as follows") is a fragment that only reads on BMA brand equity, exactly the pattern `language_spec` Part 3 tells us not to copy. **It is unbeatable on Google and it is beatable on usefulness.** Its own weaknesses: the reader-voice heading question is entirely absent (nothing is phrased as "Can I", "How do I", "Should I"), it gives no procedure beyond naming SD502, it says nothing about re-joining, and it hands the decision off with "seek independent advice" rather than framing what the reader can work out themselves.

**Vocabulary and structure to take: the death-in-service quantification by section, the active-versus-deferred distinction on ill-health enhancement, and the word "gratuity".** Those three are the substance of O5 and they are stated nowhere else in the teardown.

**The heading model to copy is a different BMA page, not this one.** Per `language_spec` Part 3 "copy outright" and Part 4 point 4, the BMA locum GP page is the best model in the sample for reader-voice situation headings: *"I have incorrectly assessed my tier"*, *"I am a GP partner and locum"*, *"Can I pension locum work as a GP?"*, *"Who pays my employer contribution?"*. **That "I have..." / "I am..." form is the structural instruction for this page's H2 set**, and no page in this cluster uses it.

### 4.3 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/refunding-your-pension-contributions
3 in-cluster keywords · 350 volume · best position 7 · **NON-PEER, §2b.** Fetched 2026-08-26, **HTTP 200**.

- Title / H1: "Refunding your pension contributions". **~1,100 words.**
- H2 set, verbatim, in order: *When you can have your contributions refunded* · *When you cannot have your contributions refunded* · *How to apply for a refund of contributions* · *Is a refund good value for money?* · *Can I avoid taking a refund?* · *Pensions refund letter without having left the NHS*
- **Named form: RF12** ("If you are contributing to the NHS pension scheme in England and Wales apply for a refund on form RF12"). Tables: no.
- Substance: the **two-calendar-year** rule (over two years, no refund, benefits are preserved instead; service in earlier sections counts toward the threshold); the 2015 scheme's **five-year break** trigger against the 1995/2008 sections' 365-day threshold; refunds are poor value because all benefits built up are lost and employer contributions are forfeited.
- **It states a tax figure: "taxed at 20% if the refund is less than £20,000 and 50% on any amount above this level".**

**Judgement.** This is the definitive answer behind every refund row in the cluster and its H2 set is a near-perfect coverage checklist. Its **"Is a refund good value for money?"** heading is the right question and it answers it correctly. Its structure is the one to match on the refund half of this page.

**HARD WARNING on the tax figure.** The 20% / 50% split is a **BMA statement**. It is **not** in `house_positions.md`. The batch-1 pack for `nhs-pension-tax-charges-how-to-minimize` already flagged it as not reproducible without re-verification at source. **This page must not reproduce it unless it is verified at primary source per 7.5.** If it cannot be pinned, the page states that a refund is taxed and directs the reader to confirm the current rate at source, exactly as the GMC retention fee is handled. Countable criterion at 7.4.

**Its omission, and it is ours to take:** it never connects the refund decision to the annual-allowance charge or the affordability pressure that drove the reader to consider opting out in the first place.

### 4.4 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/transferring-money-out-of-the-nhs-pension-scheme
1 in-cluster keyword · 70 volume · best position 10 · **NON-PEER, §2b.** Fetched 2026-08-26, **HTTP 200**.

**Not named in the brief. Found by the URL query and torn down rather than dropped.**

- Title / H1: "Transferring money out of the NHS pension scheme". **~2,100 words.**
- H2 set: *Transferring benefits out of the NHS pension scheme* · *Moving to a different UK nation* · *Transferring your NHS pension abroad* · *Time limits* · *How to apply for a transfer out* · *Public Sector Transfer Club* · *If you have missed the time limit* · *Transferring out to a Non-Club scheme* · *Annual Allowance* · *NHS Pension Scheme AVC plan* · *Refund of contributions*
- Relevant substance: under two years of service, members may transfer to a DC scheme and must initiate within **12 months of leaving**; refunds only below two calendar years; **"If you are likely to rejoin the NHS pension scheme within five years... you may wish to simply leave the service"**.

**Judgement and ruling.** It holds this cluster on one row only. **Transfers out are OFF-TOPIC for this page and are a declined theme**, per K4 and because a transfer is a regulated-advice adjacent decision that **I3** bars us from steering. But it supplies one genuinely useful fact that belongs on an opt-out page: **the under-two-years member has a fork, refund or transfer, not just a refund**, and the twelve-month clock on the transfer limb. One sentence naming that the fork exists, then out. **The theme "transferring out" is declined with reason and recorded, not silent.**

### 4.5 Coverage checklist: the union of competitor heading themes

Twenty-two deduplicated themes across the four pages. Every one must end QA marked **covered**, **declined-with-reason**, or **belongs-to-another-page**, undecided count **zero**.

| # | Theme | Held by | Ruling for our page |
|---|---|---|---|
| 1 | Scale of the opt-out problem, a dated statistic | 4.1 | **Declined.** F6 bars any statistic without a named source we verified. |
| 2 | "Things to think about before you opt out" as the page's spine | 4.1, 4.2 | **Covered.** This is O5. |
| 3 | **Opting out as a pay cut to your future self** | 4.1 | **Covered**, as the framing, re-expressed in our own words. |
| 4 | **Employer contribution lost** | 4.1, 4.2, 4.3 | **Covered. O5, and it must carry the arithmetic no competitor gives.** |
| 5 | Sacrificing a guaranteed lifetime income | 4.1 | **Covered.** O5. |
| 6 | Inflation-proofing / revaluation of the guaranteed income | 4.1 | **Covered.** O5. |
| 7 | No investment risk versus a DC alternative | 4.1 | **Covered**, one paragraph. **I3 boundary: describe the difference, never recommend a DC alternative.** |
| 8 | **Dependants' benefits lost** | 4.1, 4.2 | **Covered.** O5. |
| 9 | **Death-in-service lump sum lost, quantified by scheme section** | 4.1, 4.2 | **Covered. O5, and this is the sharpest single fact in the cluster.** Figures gated on 7.5. |
| 10 | **Ill-health cover: active member enhancement versus deferred member no enhancement** | 4.2 | **Covered. O5.** The active/deferred distinction is the point. |
| 11 | "I can't afford the contribution" as the real reason | 4.1 | **Covered**, and it is the reader-voice heading this page should lead the decision section with. |
| 12 | Tax implications of opting out | 4.1, 4.2 | **Covered, bounded.** O1, O2, O3, O4 each get one sentence and a link. This page owns the **decision**, not the mechanics. |
| 13 | **SD502, the form to leave the scheme** | 4.2 | **Covered. O6, this page owns it in the opt-out context.** Gated on 7.5. |
| 14 | **RF12 and how to apply for a refund** | 4.3 | **Covered. O6, opt-out context only.** Gated on 7.5. |
| 15 | **The two-calendar-year membership rule** | 4.3, 4.4 | **Covered.** O6. Gated on 7.5. |
| 16 | When you CANNOT have a refund | 4.3 | **Covered.** |
| 17 | **"Is a refund good value for money?"** | 4.3 | **Covered.** The right question, answered. |
| 18 | **Tax charged on a refund (the 20% / 50% figures)** | 4.3 | **Covered as a fact, figure GATED.** No figure unless verified at 7.5, else "confirm the current rate at source". |
| 19 | Break-in-service rules: 5 years (2015) versus 365 days (1995/2008), and re-joining | 4.3, 4.4 | **Covered.** This is the re-join question and no peer answers it. Gated on 7.5. |
| 20 | Transferring benefits out, Public Sector Transfer Club, overseas transfers | 4.4 | **DECLINED with reason.** Off-topic, and **I3** bars steering on a transfer. One sentence that the under-two-years fork exists, then out. |
| 21 | "Pensions refund letter without having left the NHS" | 4.3 | **Declined with reason.** Administrative edge case, thin, no volume in this cluster. |
| 22 | "Think carefully, seek independent advice" | 4.2 | **Covered, and required.** **I3** makes this our own compliance floor, not a borrowing. |

**Nineteen covered, three declined with reason, zero undecided.** Note that **not one of the four competitor pages carries a worked example, a FAQ block, or an H3**, and only two carry a table.

---

## 5. Whitespace

This section has a specific job on this page, because Google is effectively closed on this topic and Bing is not.

### 5.1 What this page is FOR, per engine, stated plainly

**On Google: almost nothing, and that is accepted, not conceded by accident.** 15 of the 24 keywords have a top-10 Google result and **every one of the 15 is `bma.org.uk`**, at positions 6 to 9 on the head. The peer set holds **zero** top-10 keywords in this cluster (`peer_top10_kws = 0`, section 3.1). `bma.org.uk` is §2b: a trade union, 15 head-term queries, best position 1, and the universe records that it "cannot be outranked on brand". **No Google expectation is set on this page** (section 8).

**On Bing: this is the whole point.** Bing indexes this site fully where Google indexes roughly 21 of 130 URLs, and Bing sends **3.4x** the Google clicks. The `bma.org.uk` brand advantage that closes Google does not transfer intact to Bing, and the site's Bing query set today contains **zero of 648** queries in this family, so every impression this page earns is new. **This page is the batch's purest Bing-first page.** Its job on Bing is to exist, in an 18,880-volume family where our corpus currently carries 2 of 24 phrasings and both of those are on a page about something else.

**And there is a third surface the ranking data does not measure.** This is a high-anxiety, decision-shaped query ("should I opt out", "can I opt out", "benefits of opting out") and those are exactly the questions that get asked of an assistant rather than typed into a search box. A page that answers the decision cleanly, with the arithmetic shown, is the citable answer. That is unmeasured upside and it is not counted in any target in section 8.

### 5.2 The accountancy angle, TESTED against the reads rather than assumed

**The hypothesis:** neither BMA nor Medics Money is an accountancy voice, so "what opting out actually does to your tax position and your take-home, versus what it does to your cover" is unclaimed.

**Tested. The hypothesis is HALF RIGHT, and the half that is wrong matters.**

- **Wrong on voice.** Medics Money is not a neutral publisher. Its author is a chartered accountant and it carries an explicit tax section ("9. Considering tax implications"). The claim "no accountancy voice holds this topic" does not survive the read and must not be written into the page or the pack as a differentiator.
- **Right, and strongly, on execution.** Medics Money's tax treatment is **one item out of ten, placed ninth**, with **no figures anywhere on the page**. BMA's "Tax implications" is a heading with prose and no arithmetic. **Not one of the four competitor pages contains a single worked calculation.** That is consistent with `language_spec` Part 4 point 3, which found zero worked examples across nine competitor pages read in this niche.

**So the real whitespace is not the voice. It is the arithmetic, and specifically one calculation nobody does:**

> **The net cost of staying in, after tax relief, against the gross value of what you give up by leaving.** A member contribution attracts tax relief at the member's marginal rate, so the take-home cost of staying in is materially less than the payslip deduction. Against that sits the employer contribution, which is pure forgone value and appears on no payslip line the reader ever looks at. **Every one of the four competitor pages asserts "you lose the employer contribution" and not one of them puts the two numbers next to each other.**

That is the page's worked example (**exactly one**, per G1, since this topic involves a calculation), and it is the whitespace an accountant is uniquely placed to fill.

### 5.3 The other five open gaps, each tied to evidence

1. **8,280 volume of form intent, and the strongest peer names no form.** Medics Money ranks 21st for `nhs pension opt out form` (1,600) without the words SD502 or RF12 on the page. BMA names SD502 on one page and RF12 on a different page, and **no page in the cluster names both**. A single page that answers "which form, for which situation" holds ground neither competitor occupies.
2. **Nobody answers the re-join question.** The break-in-service rules (5 years under 2015, 365 days under 1995/2008) appear only in passing on 4.3 and 4.4, and never framed as "what happens if I opt out now and change my mind". That is the second question every opt-out reader has and it is answered nowhere.
3. **Nobody separates the two under-two-years exits.** A member below two years has a **fork**, refund (RF12) or transfer out with a 12-month clock, and the two pages that know this are two different BMA pages. Naming the fork in one sentence is more useful than either.
4. **Nobody uses reader-voice situation headings in this cluster.** BMA's own best pattern ("I have incorrectly assessed my tier", "I am a GP partner and locum") is on a different page. This cluster's reader has exactly those shaped problems: *"I cannot afford the contribution this month"*, *"I have had an annual allowance charge two years running"*, *"I am leaving the NHS"*, *"I have been in the scheme less than two years"*. **Adopt the pattern here.**
5. **Nobody has a table in the decision section.** 4.2 has one table and it is on death benefits only. The active-versus-deferred contrast across employer contribution, death in service, ill-health enhancement and dependants' benefits is a four-row table that answers the whole page, and **L4 requires a table on a page carrying a comparison anyway.**

---

## 6. Our current position

**There is no current page and therefore no current position.** Stated rather than omitted.

| What was checked | Result | Command |
|---|---|---|
| Does the target file exist? | **No** | `ls Medical/web/content/blog/opting-out-of-the-nhs-pension-scheme.md` -> `No such file or directory` |
| Blog corpus size | 79 `.md` files | `ls Medical/web/content/blog/*.md \| wc -l` |
| Cluster phrasings present anywhere in the blog corpus | **2 of 24**, both in one file | `grep -ril "<phrase>" Medical/web/content/blog/*.md`, 24 phrases |
| `SD502` anywhere in the blog corpus | **0 files** | `grep -ril "SD502" *.md` |
| `RF12` anywhere in the blog corpus | **1 file** (`nhs-pension-tax-charges-how-to-minimize.md`) | `grep -ril "RF12" *.md` |
| `death in service` | **1 file** | `grep -ril "death in service" *.md` |
| `ill health retirement` | **1 file** | `grep -ril "ill health retirement" *.md` |
| `refund of contributions` | **1 file** | `grep -ril "refund of contributions" *.md` |
| Bing site-level queries in this family | **0 of 648** | `BingWebmasterClient().get_query_stats(...)`, 2026-08-26 |

This corroborates `language_spec` §2d, which records the opt-out family at "opt out 1 file, opting out 2 files", `death in service` at **0 files** and `refund of contributions` at **0 files** across the whole 105-page corpus. The measurement here is narrower (79 blog files, not 105 pages) and slightly higher on two rows, which is consistent rather than contradictory.

**The honest read:** the site has one page that mentions opting out in the course of arguing against it as a tax strategy, and nothing that answers the question a doctor actually types. The specialist depth this site has elsewhere (K1, the differentiator) does not exist on this topic at all, so **K1 is not applicable to this page**: there is nothing to preserve, only something to build.

---

## 7. Deterministic acceptance criteria

**Total: 34 numbered, countable criteria across 7.1 to 7.7.** Every one is checkable without judgement.

### 7.1 Exact phrases that must appear, **8 required, and 8 is also the MAXIMUM**

This is where this page differs from every other pack in the batch. **The required count and the V1 cap are the same number**, because the cluster is four ideas in twenty-four word orders (section 3.3). Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary` or body prose.

**Idea 1, "opt out of the NHS pension" (8,840 volume). Exactly 2 of these 7:**
1. `opting out of nhs pension` (1,600; medicsmoney pos 31) **REQUIRED**, it is the H1's word order and the slug's
2. `opt out of pension nhs` (1,900; **medicsmoney pos 16, the best peer position in the cluster**) **REQUIRED**
   *(unplaced by cap: `pension opt out` 2,400 · `nhs pension opt out` 1,900 · `how do i opt out of nhs pension` 480 · `how to opt out of nhs pension` 480 · `can i opt out of nhs pension` 90)*

**Idea 2, "the form to opt out" (8,280 volume). Exactly 2 of these 8:**
3. `nhs pension opt out form` (1,600; medicsmoney pos 21) **REQUIRED**
4. `opt out of nhs pension scheme form` (1,600) **REQUIRED**
   *(unplaced by cap: `nhs pension scheme opt out form` 1,600 · `pension nhs opt out form` 1,600 · `opt out pension form` 880 · `pension opt out form` 880 · `pension opt out form uk` 70 · `nhs pension opt out form pdf download` 50)*

**Idea 3, "opt out and get a refund" (420 volume). Exactly 2 of these 4:**
5. `nhs pension opt out refund form rf12` (210) **REQUIRED**, it is the only phrasing in the cluster naming a form code
6. `opt out nhs pension refund` (70; medicsmoney pos 33) **REQUIRED**
   *(unplaced by cap: `nhs pension opt out refund` 70 · `nhs pension opt out and refund` 70)*

**Idea 4, "should I / can I" (1,240 volume). Exactly 2 of these 4:**
7. `should i opt out of pension` (90; medicsmoney pos 52) **REQUIRED**
8. `benefits of opting out of pension` (170; medicsmoney pos 50) **REQUIRED**
   *(unplaced by cap: `can you opt out of pension` 590 · `can i opt out of pension` 390)*

**Deferred with reason, 1 row:** `opt out national insurance` (90, medicsmoney pos 57). **Off-topic.** Contracting out of the State Second Pension is a different subject from opting out of the NHS Pension Scheme, and placing it would drag the page into a topic it does not answer (**V6**: vocabulary never overrides the page's own topic).

**Ledger for floor 7:** 0 already-covered + 8 assigned-and-required + 1 deferred-with-reason + 15 unplaced-by-V1-cap = **24**. Balances against section 3.

> **CRITERION 1.** Exactly **8** phrases from the required list appear verbatim (case and punctuation normalised). Count = 8. Fewer is a coverage fail.
> **CRITERION 2.** The **15 unplaced-by-cap** phrases and the **1 deferred** phrase must be **reported as unplaced** in the writer's handback. Reported count = 16.

### 7.2 Equity preservation

> **CRITERION 3.** **NOT APPLICABLE, and recorded as such rather than as passed.** The page does not exist; there are zero DO-NOT-LOSE queries (section 2). Floor 5 in 7.6 is marked `n/a`.

### 7.3 THE V1 WORD-ORDER CAP, countable

> **CRITERION 4.** For **each** of the four ideas in section 3.3, the count of distinct word orders appearing verbatim on the page is **exactly 2**. Four counts, each must equal 2. **A count of 3 on any idea is a defect and a BLOCK, not thoroughness.**
> **CRITERION 5.** Total distinct cluster word orders on the page **<= 8**. A ninth is a BLOCK.
> **CRITERION 6.** **V2.** Zero occurrences of `also searched as`, `also known as` applied to a search phrase, `also written as`, `people also search`, or any table column or list enumerating search-string variants. Count must be **0**. This shipped live in batch 1 on the very page this one collides with (section 1.3c) and is the single likeliest failure here.
> **CRITERION 7.** **V5.** No single rhetorical construction appears more than **twice**. The construction `it is not ... it is ...` appears **at most once**, across the whole batch.

### 7.4 OWNERSHIP-MAP SENTENCE CAPS, countable

**These are the criteria that exist because of the batch-1 failure. Each is a sentence count.**

> **CRITERION 8. O4, Scheme Pays. MAXIMUM ONE (1) SENTENCE, plus one link to `/calculators/nhs-pension-scheme-pays`.** Sentence count referring to Scheme Pays must be **<= 1**. **ZERO deadline dates. ZERO election mechanics. ZERO mention of the two-limb split, the mandatory/voluntary distinction, or any date associated with a Scheme Pays election.** Checkable: count sentences containing `scheme pays` (case-insensitive); count must be <= 1. Then count date tokens and the strings `two-limb`, `two limb`, `mandatory scheme pays`, `voluntary scheme pays` within 50 words of `scheme pays`; **every one of those counts must be 0.** **This is the exact fact that broke batch 1, on seven of twelve pages. Any breach is a BLOCK.**
> **CRITERION 9. O1, tiered contribution rates. MAXIMUM ONE (1) SENTENCE plus a link to `/calculators/nhs-superannuation-tiered-contribution`. ZERO rate tables and ZERO tier percentages.** Checkable: count `<table>` elements whose content includes a contribution tier or band; must be **0**. Count `%` characters within 30 words of `tier`, `tiered`, `contribution rate`, `contribution band`; must be **0**.
> **CRITERION 10. O2, annual allowance mechanics. MAXIMUM ONE (1) SENTENCE plus a link to `/calculators/nhs-pension-annual-allowance`.** Zero explanation of taper, threshold income, adjusted income, pension input amount definition, carry forward or MPAA. Checkable: those six terms may appear at most once each, and none may be followed by a definition within 40 words.
> **CRITERION 11. O3, adjusted net income. MAXIMUM ONE (1) SENTENCE plus a link to `/blog/adjusted-net-income-doctors-60-percent-tax-trap`.** Zero statement of the £100,000 threshold mechanics, the £125,140 taper end, the 60% band, free childcare or the High Income Child Benefit Charge.
> **CRITERION 12. O12, pension accrual during maternity and statutory leave. MAXIMUM ONE (1) SENTENCE plus a link to `/blog/maternity-pay-and-maternity-allowance-for-doctors`.**
> **CRITERION 13. O18, NHS Pension Scheme membership eligibility by profession. MAXIMUM ONE (1) SENTENCE plus a link to `/nhs-pension`.**
> **CRITERION 14. O6 BOUNDARY, and it must not drift.** The strings `Form A`, `Form B`, `SOLO` (in the pension-certification sense), and any explanation of locum pension certification, must appear **ZERO** times. `/blog/nhs-pension-for-locums-form-a-form-b` is FROZEN to 2026-09-10 and owns that family entirely. Count must be **0**. **A single explanatory sentence about Form A or Form B is a BLOCK.** A bare link to that page with neutral anchor text is permitted and does not count.
> **CRITERION 15.** Conversely, **SD502** and **RF12** must each appear **at least once**, in the opt-out context, since O6 assigns them here. Count each **>= 1**, subject to the source gate at 7.5.

### 7.5 Statutes and sources to re-verify at PRIMARY SOURCE before publication

**`house_positions.md` carries NO POSITION on SD502, RF12, the two-year refund rule, or the opt-out re-join rules.** `BATCH2_INDEX.md` §5 records this as a prerequisite. **This is a gate on the writer, not on the pack.**

**The standing rule, applied exactly as the GMC retention fee is handled: where a figure or form reference cannot be pinned at primary source, it is framed as "confirm the current position at source" and NEVER asserted.**

| What must be read at source | Where | Why |
|---|---|---|
| **The SD502 form: its current name, its current code, what it does, who it goes to** | NHSBSA member hub (leaving / opting out pages) | Named only by 4.2. Not in house positions. O6 assigns it here. **NHSBSA returns HTTP 403 to automated fetching** (`language_spec` Part 4 point 6, and dossier), so this is a **manual read**, not a scripted fetch. |
| **The RF12 form: its current code, the England-and-Wales scope, and the Scotland equivalent (REF1)** | NHSBSA member hub; NHS Pension Scheme Regulations | Named by 4.3 and by one live page of ours. Not in house positions. |
| **The two-year refund rule**: two *calendar* years of membership, whether earlier-section service counts, and what "preserved benefits" means above the threshold | NHS Pension Scheme Regulations; NHSBSA member hub | Not in house positions. This is the page's central eligibility fact. |
| **The tax charged on a refund of contributions** (BMA states 20% below £20,000, 50% above) | NHS Pension Scheme Regulations / HMRC short-service-refund-lump-sum guidance | **HARD GATE.** A BMA statement, not ours. **If it cannot be pinned at primary source, the page states that a refund is taxed and says "confirm the current rate at source". It does not reproduce BMA's figures.** |
| **The opt-out and re-join rules**: the 2015 scheme's five-year break, the 1995/2008 365-day threshold, and what happens to accrual on re-joining | NHS Pension Scheme Regulations; NHSBSA member hub | Not in house positions. This is whitespace gap 2 and it must be right or absent. |
| **Death-in-service benefits by section** (BMA: 1995 3x pension, 2008 2.25x, 2015 2.025x; two times actual annual pay for active members) | NHSBSA member hub; NHS Pension Scheme Regulations | **The sharpest fact in the cluster and therefore the most dangerous.** Multipliers must be verified or the page states the benefit exists and differs by section without asserting a multiplier. |
| **Ill-health retirement: the active-member enhancement and its absence for deferred members** | NHSBSA member hub | O5 substance. Verify the active/deferred distinction before asserting it. |
| **The employer contribution rate** used in the section 5.2 worked example | NHS Employers / NHSBSA current employer contribution rate, with its effective date | The example is the page's differentiator and its input must be sourced and dated per F1. |
| Member contribution tiering, **only enough to link** | `/calculators/nhs-superannuation-tiered-contribution` | O1 caps this at one sentence. No rate is stated. |

> **CRITERION 16.** Every row above is either **verified at primary source and dated in the page**, or the relevant statement is **framed as "confirm the current position at source"** and the page asserts nothing. Zero rows may be asserted from a competitor page, from memory, or from `house_positions.md` (which is silent on all of them). **Any figure traceable only to bma.org.uk or medicsmoney.co.uk is a BLOCK.**
> **CRITERION 17. F5, UNVERIFIED figures, hard fail.** **ZERO** figures for the **GMC annual retention fee**, the **Global Sum per weighted patient**, or the **QOF point value**. The topic requires none, so the expected count is **0** and any occurrence is a hard fail. Checkable: any `£` or numeric within 30 words of `GMC`+`fee`, `global sum`, `weighted patient`, `QOF point`.
> **CRITERION 18. F6 / I6, fabricated statistics, hard fail.** **ZERO** percentages or quantified generalisations without an adjacent named, verified source. Medics Money's "over 150,000 NHS staff opted out" is **not** reproducible on our page without our own verification. Count of unsourced statistics must be **0**.

### 7.6 The QA floors

> **CRITERION 19.** Floor 1, **arithmetic**. Every figure and date recomputes; the worked example states its inputs inline so a checker can recompute without external data, and every rate in it carries its effective date (F1).
> **CRITERION 20.** Floor 2, **statute**. Every source in 7.5 re-verified on the day of drafting.
> **CRITERION 21.** Floor 3, **links**. Zero broken internal links repo-wide. The six ownership-map links (O1, O2, O3, O4, O12, O18) all resolve. **Resolve every calculator link by reading the `slug` field in `Medical/web/src/lib/tools/configs/*.ts`, never by matching a file name** (batch-1 coordinator ruling 5: `nhs-pension-calculator.ts` serves `/calculators/nhs-pension-annual-allowance`).
> **CRITERION 22.** Floor 4, **coverage**. The 8 phrases in 7.1 placed; the checker names any that are not.
> **CRITERION 23.** Floor 5, **equity preservation**. **n/a**, per criterion 3.
> **CRITERION 24.** Floor 6, **cluster coverage**. 8 placed, 16 reported unplaced or deferred.
> **CRITERION 25.** Floor 7, **reconciliation balance**. 0 + 8 + 1 + 15 = **24**. Must balance.
> **CRITERION 26.** Floor 8, **competitor re-read**. All **22** heading themes in 4.5 marked covered, declined-with-reason, or belongs-to-another-page. Undecided count **0**. **No fetch-failed URLs to record: 4 of 4 returned HTTP 200.**

### 7.7 Named factual and style requirements

> **CRITERION 27. I3, regulated activity, hard fail.** The page **must not advise** the reader to opt out, to stay in, to transfer, or to take out any alternative product. It explains how the rules work and what the options cost, and it points at a regulated adviser where advice is needed. Zero first-person advice verbs attached to a regulated noun. **This is the highest compliance risk on any page in the batch**, because the topic is literally a pension decision.
> **CRITERION 28. G1 to G7, exactly ONE worked example.** Count = 1. It is the section 5.2 calculation (net-of-relief cost of staying in against the employer contribution forgone). Five components in order per G3: illustrative persona with role and rounded figure, inputs, arithmetic step by step, result, one sentence on what changes the answer. **G6: the heading above it must NOT be the words "Worked example" and it must not open with a "Worked example:" prefix.** Hard fail. 80 to 200 words (G7).
> **CRITERION 29. L4, at least one table.** Count >= 1. The active-versus-deferred comparison (whitespace gap 5). Caption states its effective date per F1. **It must not be a contribution rate table** (criterion 9).
> **CRITERION 30. I2, faceless authority, hard fail.** Zero author bylines, zero "About the author", zero credentials or post-nominals. Medics Money does all three; we cannot.
> **CRITERION 31. I1, no em-dashes** anywhere in user-facing copy including frontmatter, metaTitle, metaDescription, alt text, headings, tables and FAQ answers. Count = 0. En-dashes permitted only in numeric ranges.
> **CRITERION 32. I5, no pricing.** Zero of our fees. Note batch-1 coordinator ruling 4: third-party amounts that are facts about the reader's position (the tax on a refund, a statutory rate) are publishable and are often the most useful thing on the page.
> **CRITERION 33. Heading and structure bands.** H2 count 6 to 14 (B6); question-form H2 rate 50% to 75% (B4); 4 to 8 FAQ questions, newly authored (H1 and coordinator ruling 1); FAQ answers 40 to 110 words (H3). **At least 3 H2s must use the BMA reader-voice situation form** ("I cannot afford...", "I have had...", "I am leaving..."), which is whitespace gap 4 and the one structural move no page in this cluster makes.
> **CRITERION 34. L1, length 900 to 1,600 words.** The competitor median is 1,100 to 2,100. **Length is not the lever** (L3): if the topic is answered in 1,000 words, ship 1,000. Do not pad toward BMA's 2,100.

---

## 8. Stated expectation

Written before the work, so the later read has something to fail.

### 8.1 THIS IS THE BATCH'S PUREST BING-FIRST PAGE

**No Google expectation is set on this page at all.** The reason, in one line: **`bma.org.uk` holds Google positions 6 to 9 across this family and cannot be outranked on brand, and no peer in the universe holds a single top-10 slot in the cluster (`peer_top10_kws = 0`).**

**That sentence exists so a later reader cannot mistake a Google zero on this page for a failure.** A Google zero here is the predicted outcome, not a miss. Do not revert on it, do not diagnose it, do not raise a finding on it. If Google traffic ever appears, it is upside and should be recorded as a surprise worth understanding.

The surrounding measurement reality, from `BATCH2_INDEX.md` §8: Google indexes roughly **21 of 130 URLs** on this site, driven by low domain authority and not by any technical defect. **Bing indexes it fully and sends 3.4x the Google clicks.**

### 8.2 Baseline, with its command

`BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')`, pulled **2026-08-26**: **648 site-level queries returned, of which ZERO match the opt-out family.** Page-level baseline is structurally zero because the URL does not exist. **The baseline on both engines is zero, and that is what makes the reads below interpretable.**

### 8.3 Bing, 14 days after deploy

> The URL registers **at least 1 Bing impression** on **at least 1** of the eight named phrases in section 7.1.

One impression on a named phrase. That is the whole 14-day test and it is deliberately low: this is a brand-new URL on a low-authority domain in a family where the site currently has **zero** presence, and the batch-level target is only that 5 of 7 pages surface at all in fourteen days.

### 8.4 Bing, 28 days after deploy

> 1. The URL registers **at least 4 named Bing queries** with non-zero impressions.
> 2. **At least 2** of those 4 contain the token `opt out`, `opt-out` or `opting out` **together with** `nhs` or `pension`.
> 3. **At least 1** of the eight section-7.1 phrases appears as a named query.
> 4. **Total Bing impressions for the URL >= 10.**

**Named phrases to watch specifically, and these are the test:** `opting out of nhs pension`, `opt out of pension nhs`, `nhs pension opt out form`, `opt out of nhs pension scheme form`, `nhs pension opt out refund form rf12`, `opt out nhs pension refund`, `should i opt out of pension`, `benefits of opting out of pension`.

**Phrase coverage is the verdict, not total traffic.** Per §9.6 point 2, **total impressions rising while the eight named phrases stay absent from the query set is a FAIL, not a pass**, and is recorded as drift.

### 8.5 Google, 28 to 90 days

> **No expectation. No target. No failure condition.** Reason: bma.org.uk holds positions 6 to 9 across the family and cannot be outranked on brand.

Record any Google observation that occurs, as information. Do not treat a zero as a miss, and do not treat a zero as evidence about the page's quality.

### 8.6 Leads

> **No lead target.** This is an informational page on a decision the reader must not be steered on (criterion 27). It carries the site's standard single end-of-page CTA and nothing more. Item 2 of the batch is the only page a reader converts on.

### 8.7 Failure trigger, written as a number, before the work

> If, at **28 days** after deploy, the URL has **zero named Bing queries** in `GetPageQueryStats` **and** zero Bing impressions, the page has not entered the index and the correct response is to **check indexation first**, not to rewrite. Only if the URL is confirmed indexed and still at zero named queries at **56 days** is the page's vocabulary treated as failed, and the response is a **vocabulary re-read against section 7.1, not a revert**.
>
> **There is no revert trigger on traffic.** The page is net-new, there is no equity to lose, and deleting a page that has not yet been indexed destroys the only evidence of whether it would have worked. **The only revert path is deletion of the single new file** (section 1), and it applies for a quality failure, never a traffic one.

**Batch-level quality failure trigger, inherited:** if editorial QA raises a **V1, V3 or V5** finding on three or more of the seven batch-2 pages, the batch has reproduced the batch-1 defect and the affected pages are held rather than deployed. **This page is the batch's highest V1 risk** (24 word orders of 4 ideas, section 3.3) and its **highest V3 risk on O4** (criterion 8).

### 8.8 Tracker fields, at rewrite time, owner-triggered

`monitored_pages`: one row, both engines' baselines at zero as recorded in 8.2. `blog_optimizations.target_keywords`: the **8 phrases in section 7.1**, not the 24 in section 3.

**No monitor is created by this pack.** Registration in `monitored_pages` is a separate owner-triggered step and has not been done.

---

## Corrections to the dossier

**1. The dossier's zero peer-winnable on NO-PAGE row 11 is WRONG. CONFIRMED against live data.**

`cluster_dossier_2026-08-26.md` §4 row 11 records:

```
| 11 | **pension opt out** | 2 | **20,260** | 0 | 35 | New page. bma.org.uk holds it end to end. |
```

and §5 elaborates: *"'pension opt out' is 20,260 volume with **zero** peer-winnable, because bma.org.uk holds positions 4 to 9 across the whole family."*

**The zero is refuted.** `medicsmoney.co.uk`, the strongest peer in the universe (§2a rank 1), holds `/opting-out-of-the-nhs-pension-scheme/` on **eleven** keywords in this cluster, four of them inside position 20:

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
select competitor_domain, ranked_keyword, position, search_volume, url
from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
and ranked_keyword ~ '(opt out|opt-out|opting out)' and ranked_keyword ~ '(pension|nhs|nation)'
and competitor_domain='medicsmoney.co.uk' order by position;
```

| Position | Volume | Keyword |
|---|---|---|
| **15** | 480 | how do i opt out of nhs pension |
| **16** | 1,900 | opt out of pension nhs |
| **18** | 1,900 | nhs pension opt out |
| 21 | 1,600 | nhs pension opt out form |
| 24 | 90 | can i opt out of nhs pension |
| 31 | 1,600 | opting out of nhs pension |
| 33 | 70 | opt out nhs pension refund |
| 50 | 70 | nhs pension opt out refund |
| 50 | 170 | benefits of opting out of pension |
| 52 | 90 | should i opt out of pension |
| 57 | 90 | opt out national insurance |

All eleven on **one URL**. The three positions the brief cites (16 on `opt out of pension nhs`, 18 on `nhs pension opt out`, 15 on `how do i opt out of nhs pension`) all confirm exactly.

**Deduplicated peer-winnable is 4,280**, from the section 3.1 query. Not zero. The volume figure also moves: the dossier says **20,260**, this regex gives **18,880**, a difference of 1,380 attributable to different membership rules between the dossier's seed-node clustering (not in the repo) and this pack's printed regex. **Not harmonised. Flagged, as `BATCH2_INDEX.md` §9 point 1 requires.**

The note "bma.org.uk holds it end to end" is **half true and worth keeping in that form**: BMA holds the **top 10** end to end (all 15 top-10 keywords are BMA), but it does not hold the cluster end to end. **Decision 21's argument for building this page stands either way; the dossier's stated zero does not.**

**2. There is a FOURTH competitor URL in this cluster and the brief names three.** `bma.org.uk/.../transferring-money-out-of-the-nhs-pension-scheme` holds 1 keyword at 70 volume, position 10. Torn down at 4.4 rather than dropped. It supplies one useful fact (the under-two-years refund-or-transfer fork, with a 12-month clock on the transfer limb) and its main theme is declined with reason.

**3. An ownership collision exists that `BATCH2_INDEX.md` §4 does not record, and two packs currently give opposite instructions on RF12.** Full detail and rulings at section 1.3. In summary: `/blog/nhs-pension-tax-charges-how-to-minimize` is live and already carries O5 argument and O6 vocabulary including RF12; its own batch-1 pack ruled RF12 belongs to the frozen locums page and instructed "Do not reproduce the RF12 walkthrough"; `BATCH2_INDEX.md` O6 assigns RF12 in the opt-out context to this page. **Ruled in favour of BATCH2_INDEX O6 on precedence, and flagged for the conductor** because only one of the two can be right.

**4. A live V2 violation is in the corpus, on the colliding page.** `nhs-pension-tax-charges-how-to-minimize.md` line 69 contains "also searched as", which binding rule V2 bans and which batch-1 QA blocked elsewhere. **Not this task's file to fix.** Recorded so it is not lost, and made a countable criterion (criterion 6) so this page cannot repeat it.

**5. `house_positions.md` is silent on every load-bearing fact this page needs.** Confirmed by grep on 2026-08-26: no position on SD502, RF12, the two-year refund rule, the opt-out re-join rules, the tax on a refund, or the death-in-service multipliers by section. `BATCH2_INDEX.md` §5 records this as a prerequisite and section 7.5 above names exactly what must be read at primary source first. **Note the practical obstacle: NHSBSA returns HTTP 403 to automated fetching, so the member-hub reads are manual.** The ground-truth pass runs before the writer starts; the pack is complete, the ground truth is not.

**6. The `language_spec` §2d corpus counts and this pack's measurements differ slightly and both are correct.** §2d records `opt out` at 1 file, `opting out` at 2 files, `death in service` at 0 files and `refund of contributions` at 0 files across the 105-page corpus. This pack measures 3, 1, 1 and 1 across the 79-file **blog** directory. Different scopes, different matchers. Recorded so the discrepancy is visible rather than read as an error in either document.
