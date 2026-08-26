# READY TO APPLY: /blog/nhs-pension-scheme-pays-doctors-deadlines

| Field | Value |
|---|---|
| **Target file** | `Medical/web/content/blog/nhs-pension-scheme-pays-doctors-deadlines.md` |
| **Editable from** | **2026-09-11.** The `monitored_pages` row (id 501, `site_key='medical'`) holds `monitor_until = 2026-09-10` at `status='flagged'`. Verified 2026-08-26 with `select slug, status, monitor_until from monitored_pages where site_key='medical' and monitor_until > now()`, no status predicate. The row is present. **Do not apply before 2026-09-11.** |
| **Grade** | **EXTEND.** §9.2 equity test: Google impressions 385 over 90 days (threshold is under 300), Bing clicks 3, Bing impressions 18. Two of the three REFRAME conditions fail, so the page keeps its equity treatment. |
| **Permission level** | `metaTitle`, `metaDescription`, `h1`, `slug`, `canonical` and the **order of the existing H2s** are frozen (K2). New material enters as new H2 sections only. Existing FAQs are not deleted (coordinator ruling 1). **Factual corrections inside frozen copy are required, not merely permitted** (coordinator ruling 3), and every one made here is itemised in the addendum below. |
| **Application instruction** | On or after 2026-09-11, replace the entire contents of the target file with everything below the `=== PAGE STARTS ===` marker. No other file changes. Do not commit or deploy without sign-off. |
| **PARTIALLY APPLIED ALREADY, READ THIS FIRST** | **The three factual corrections in §7 items 1, 2, 3 and 6 were applied to the live file EARLY, on 2026-08-26, on coordinator authorisation.** The live file is therefore **no longer identical to the pre-freeze version** described elsewhere in this pack. See the "Early application" note below before applying anything. |
| **Prepared** | 2026-08-26 at repo sha `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`. Nothing under `Medical/web/` was read-modified, nothing committed, deployed or indexed, no monitor or alert created, no paid API call made ($0.00). |
| **Revert path** | `git checkout <sha-before-apply> -- Medical/web/content/blog/nhs-pension-scheme-pays-doctors-deadlines.md` |

## Early application, 2026-08-26

**What was applied to the live file on 2026-08-26, inside the monitoring window, on coordinator authorisation.** Only the factual corrections. Specifically §7 items **1, 2, 3 and 6**, plus the three consequential one-line fixes they forced for internal consistency (the mandatory bullet in "Mandatory Scheme Pays", the "tested only against the NHS slice" clause, the "Common mistakes" list). Nothing else.

**What was NOT applied and is still waiting for 2026-09-11.** All five new H2 sections ("Which NHS pension scheme is your input tested against?", "Why does the extended deadline start on 2 May?", "When should your pension savings statement arrive?", "What the SPE2 election notice has to contain", "Can you elect for Scheme Pays after you have retired?"), the deadline table, the calculator links, the SPE2 naming in the election steps, the 2 May correction to the extended-limb wording (§7 item 4), the statutory pinpointing throughout (§7 item 5), and the "pension savings statements" placement. **The bulk of this pack is unapplied.**

**The reasoning, recorded because it is a precedent.** A measurement window restricts **structure and positioning, never truth**. A factual correction does not change what a page is about, so it cannot corrupt the attribution the window exists to protect. That alone was sufficient. It was reinforced here by §2 of this pack: the window is guarding a measurement that is invalid, because the flag was a detector artefact rather than a real regression, so there was little left to preserve. Against that sat a live page telling doctors that a doctor with £70,000 of NHS growth split across two schemes has a mandatory right (they do not) and that Scheme Pays is unavailable after retirement (it is, voluntarily, to the 75th birthday). Either could cost a reader the ability to settle a charge.

**Consequences for whoever applies the rest.**
- **Do not re-apply corrections 1, 2, 3 or 6. They are already live.** They are also already present in the page text below, so applying this file wholesale on 2026-09-11 remains correct and idempotent; the warning is against treating them as outstanding work or as evidence the file was tampered with.
- The live file's `dateModified` is now `2026-08-26` and its `editorialNote` records the three corrections. The page text below sets `dateModified` to `2026-09-11` and extends that note. That is intended.
- `metaTitle`, `metaDescription`, `h1`, `slug`, `canonical` and the order and text of all ten live H2s were verified **byte-identical after the early edit**, and no H2 was added. `python scripts/frontmatter_lint.py --check --site medical` returned `frontmatter OK: 86 file(s) valid`, exit 0.
- The equity register in §1 was pulled **before** the early edit and is the correct pre-edit baseline. If a later reader wants to know whether the corrections moved anything, the comparison window starts 2026-08-26.

## Ownership boundary against `/calculators/nhs-pension-scheme-pays`

`docs/medical/packs/BATCH2_INDEX.md` §4 row O4 names the calculator as owner of "Scheme Pays: the two-limb election, the mandatory / voluntary split, the deadlines". That row was written as a **routing rule for batch 2 writers while this page was frozen**, and it is not the whole map. The calculator's own pack, `PACK_calculators__nhs-pension-scheme-pays.md` §1, gives the reciprocal instruction to the calculator's writer: *"The calculator owns the tool intent... The blog post owns the deadline and procedure narrative and is not yours to write, edit or absorb."* The two documents agree once read together. The split applied here:

| | `/calculators/nhs-pension-scheme-pays` owns | `/blog/nhs-pension-scheme-pays-doctors-deadlines` owns |
|---|---|---|
| Question | **How much will it cost me, and should I elect?** | **By when must I elect, and how?** |
| Content | NHSBSA estimating factors, the divide-by-factor method, the SP1 recovery-factor distinction, break-even ages, Normal Pension Age as a modelling input, the cash-versus-Scheme-Pays comparison | The statutory deadline limbs and which one applies to your statement, the pension savings statement timetable, the SPE2 election notice, the per-scheme input test, amend-not-revoke, the Self Assessment interaction, remediable statements, sequencing against retirement |
| Numbers | Every reduction figure, factor and break-even | No factor, no reduction figure, no break-even. Dates, thresholds and statutory references only |

The calculator was rebuilt on 2026-08-26 (`77cc1bed`) on NHSBSA's real published method after being found to use invented factors. **This page therefore states no arithmetic of the reduction at all and links out for it.** The live page links to neither the calculator nor `/calculators/nhs-pension-annual-allowance`; the prepared page links to both. Conversely the calculator's rebuilt explainer has drifted a short way into deadline territory (it now states all three limbs). That is acceptable as one-or-two-sentence orientation under V3 and it already ends by handing off to "the Scheme Pays deadlines guide linked below". No change is proposed to the calculator here.

---

## 1. Equity register, and how the grade was decided

**Google.** GSC API `searchanalytics.query`, property `sc-domain:medicalaccounts.co.uk`, page filter `equals` on the canonical URL. Pulled fresh 2026-08-26. Nothing read from `gsc_query_data` for these figures.

| Window | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| 90d, 2026-05-28 to 2026-08-25 | 4 | **385** | 1.04% | 18.6 |
| 28d current, 2026-07-29 to 2026-08-25 | 1 | 213 | 0.47% | 20.0 |
| 28d prior, 2026-07-01 to 2026-07-28 | 2 | 92 | 2.17% | 16.6 |
| 28d to the flag date, 2026-06-22 to 2026-07-19 | 0 | 35 | 0% | 8.8 |
| 28d before the 2026-06-12 rewrite, 2026-05-15 to 2026-06-11 | 1 | 51 | 1.96% | 19.7 |

**Bing.** `GetPageQueryStats(siteUrl='https://medicalaccounts.co.uk/', page=<canonical>)` via `BingWebmasterClient`, pulled 2026-08-26. **14 named queries, 18 impressions, 3 clicks**, against Google's 26 named queries for the same page across 90 days. Every one of the 14 is on-topic, which is not true of Google's set.

| Impr | Clicks | Avg impression pos | Query |
|---|---|---|---|
| 2 | 1 | 7 | can scheme pays election be made if annual allowance statement is late nhs |
| 2 | 0 | 9 | nhs scheme pays election |
| 2 | 0 | 8 | nhs pension mandatory scheme pays |
| 2 | 0 | 5 | how much does [scheme] pays election reduce my pension by |
| 1 | 1 | 4 | nhs scheme pays deadline extension for 24/25 tax year? |
| 1 | 1 | 3 | can scheme pays election be made if annual allowance statement is late |
| 1 | 0 | 8 | nhs deadline on tax suppirt |
| 1 | 0 | 8 | how much does 10000 [scheme] pays election reduce my pension by |
| 1 | 0 | 7 | scheme pays election form do we enter tax paid in the return |
| 1 | 0 | 7 | nhs voluntary versus mandatory scheme pays |
| 1 | 0 | 6 | voluntary scheme pays from nhs pension if affected by taper |
| 1 | 0 | 6 | scheme pays elections deadlines |
| 1 | 0 | 5 | "scheme pays" election deadline 31 july 2026 nhs pension annual allowance |
| 1 | 0 | 4 | nhs scheme pays deadlones |

**These 14 are DO-NOT-LOSE queries.** Any one that stops matching after the change is a named BLOCK. Note what they ask for: three are about a **late or revised statement**, two about **mandatory versus voluntary**, one about **what to enter on the return**, one about a **deadline extension for a specific tax year**. The Bing query set is a specification for this rewrite and it points almost entirely at the sections being added.

**Grade decision.** §9.2 REFRAME requires Google impressions under 300 **and** Bing clicks zero **and** Bing impressions under 300. Google impressions are 385 and Bing clicks are 3. Two conditions fail independently. **EXTEND.**

## 2. The regression, diagnosed

The originating `optimisation_opportunities` row is gone, but the baseline columns survive on `monitored_pages` id 501 and the detector's inputs are reconstructable. What fired is now established rather than guessed.

**Baseline stored at registration** (`baseline_pulled_at` 2026-06-12, `baseline_window_days` 90): Google clicks 0, impressions 15, position 48.53. Bing impressions 0, clicks 0, position NULL.

**What the detector compared it against.** `detect_monitored_page_regressions` in `optimisation_engine/analysis/detectors.py` does not re-pull from the API. It sums `gsc_query_data` over `window_days=28` and takes `AVG(position)` across query-days. Queried for the 28 days to 2026-07-19, that table holds **1 impression, 0 clicks, avg position 54.00** for this page.

Running the five conditions on those inputs, with the defaults `clicks_drop_ratio=0.5`, `position_drop=5.0`, `impressions_drop_ratio=0.5`, `bing_position_drop=3.0`:

| Condition | Inputs | Fired? |
|---|---|---|
| Google clicks | `base_clicks=0`, gate is `>= 5` | No |
| **Google impressions** | `15 >= 10` and `1 < 15 x 0.5 = 7.5` | **YES** |
| **Google position** | `54.00 - 48.53 = 5.47 >= 5.0` | **YES** |
| Bing position | `base_bpos` is NULL | No |
| Bing impressions | `base_bimpr=0`, gate is `>= 10` | No |

**Verdict: the flag is a false positive, and no content-caused regression exists.** The fresh API says the true 28 days to 2026-07-19 were **35 impressions at position 8.8**, up from 51 impressions at position 19.7 in the 28 days before the 2026-06-12 rewrite. The page was improving sharply on the only data that measures it correctly. The flag is an artefact of three known defects stacking: a 90-day fresh-API baseline compared against a 28-day window, `gsc_query_data`'s documented sampling undercount (memory `gsc_query_sum_undercount`), and an unweighted `AVG(position)` across query-days that a handful of position-90 tail queries can move five places on its own.

**What this means for the rewrite.** The brief asked whether an earlier change caused the regression so the rewrite would not repeat it. It did not, and there is nothing to avoid repeating. The 2026-06-12 rewrite worked.

**What is genuinely weak, established from the fresh pull only.** The monthly page trend is 2026-06: 1 click / 80 impressions / position 10.7; 2026-07: 3 clicks / 127 impressions / position 7.8; 2026-08 (to the 25th): **0 clicks / 178 impressions / position 18.8**. Impressions are climbing and position and clicks are falling together, and the query breakdown says why. Of 213 Google impressions in the current 28 days, **13 come from "nhs pension for doctors" at position 43.8** and the top six queries by impressions are all generic NHS-pension head terms at positions 40 to 55 that this page does not answer. The on-topic Scheme Pays queries total **6 impressions**. Google is serving the page as a weak generic NHS-pension result, which inflates impressions, drags the average position down and converts at zero. Bing is serving it as a Scheme Pays result at positions 3 to 9 and converting at 17%.

The correct response is not defensive. It is to make the page unambiguously the Scheme Pays deadlines and procedure page, which is what the added sections do, and to accept that generic head-term impressions belong to `/nhs-pension` and `/blog/nhs-pension-annual-allowance-complete-guide`.

**What could not be established.** Which of the two firing conditions was reported first, the exact `recommended_action` string that was mailed, and whether a human ever read it. Those lived on the purged opportunity row.

## 3. The market's keyword set

**Source:** `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, the harvest already paid for in the dossier task. **No new paid calls, $0.00 spent.** Selection regex:

```
(scheme pays|annual allowance charge|pension tax charge|annual allowance tax|pension savings statement|remediable pension savings|voluntary scheme|mandatory scheme)
```

```sql
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
k as (select ranked_keyword, max(search_volume) v, min(position) best_any_pos,
   (array_agg(competitor_domain order by position))[1] best_any_domain,
   min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos
 from dataforseo_competitor_data where site_key='medical'
   and ranked_keyword ~* '(scheme pays|annual allowance charge|pension tax charge|annual allowance tax|pension savings statement|remediable pension savings|voluntary scheme|mandatory scheme)'
 group by 1)
select ranked_keyword, v, best_any_pos, best_any_domain, best_peer_pos from k order by v desc;
```

**14 deduplicated keywords, 1,390 combined volume, 190 peer-winnable.** `On page` is a case-insensitive verbatim match against the live source file.

| Vol | Best pos | Held by | Best peer pos | On page | Keyword |
|---|---|---|---|---|---|
| 320 | 8 | bma.org.uk | none | yes (1) | annual allowance tax charge |
| 210 | 7 | bma.org.uk | none | yes (12) | annual allowance charge |
| 170 | 25 | bma.org.uk | none | yes (77) | scheme pays |
| 90 | 8 | bma.org.uk | none | **no** | pension savings statements |
| 90 | 8 | bma.org.uk | none | yes (3) | pension savings statement |
| 70 | 9 | bma.org.uk | none | yes (1) | pension annual allowance charge |
| 70 | 7 | bma.org.uk | none | yes (1) | pension tax charge |
| 70 | 9 | bma.org.uk | none | yes (1) | pension tax charges |
| 70 | 8 | bma.org.uk | none | **no** | annual allowance charge pension |
| 50 | 5 | bma.org.uk | 8 | **no** | scheme pays nhs pension |
| 50 | 3 | bma.org.uk | 7 | yes (1) | nhs scheme pays |
| 50 | 5 | bma.org.uk | 8 | **no** | scheme pays nhs |
| 40 | 23 | bma.org.uk | none | yes (15) | voluntary scheme pays |
| 40 | 4 | bma.org.uk | 10 | yes (3) | nhs pension scheme pays |

**Headline: 4 of 14 phrasings missing, 260 of 1,390 volume.** This page is the best-covered page in the Medical corpus on its own vocabulary, which is a different picture from the "71 of 78 phrasings missing" recorded in `BATCH2_INDEX.md` §3. That figure came from the calculator's much wider topic regex, which sweeps in contribution rates, salary sacrifice and death in service. Both numbers are correct for what they measure; **the tight number is the one that governs this page**, and the wide one is a reminder that the surrounding topic is under-covered by pages that are not this one.

### Word-order families

1. **Annual allowance charge** (6 phrasings, ~810 volume): annual allowance charge, annual allowance tax charge, pension annual allowance charge, pension tax charge, pension tax charges, annual allowance charge pension.
2. **Scheme pays** (5 phrasings, ~360 volume): scheme pays, nhs scheme pays, scheme pays nhs, scheme pays nhs pension, nhs pension scheme pays. The only family with peer competition.
3. **Pension savings statement** (2 phrasings, 180 volume): singular and plural.
4. **Voluntary scheme pays** (40), a qualifier on family 2 rather than a distinct order.

### Placement decision, and two deliberate non-placements

**Placed:** "pension savings statements" (plural, 90 volume), in the new statement-timetable section, as natural prose.

**NOT placed, and this is deliberate: "scheme pays nhs" (50) and "scheme pays nhs pension" (50), both peer-winnable.** V1 caps a page at two word orders per idea, counted as non-overlapping longest matches. The live page already carries **four** orders of the scheme-pays family ("scheme pays", "nhs scheme pays", "nhs pension scheme pays", "voluntary scheme pays"), all inside frozen copy that K1 forbids deleting. Adding a fifth and sixth would deepen an existing V1 breach in order to chase 100 volume. The two strings go on the record as **unplaced with reason**, per V2's instruction to report rather than force. The underlying family is already held. If a future pass unfreezes the structure, the correct fix is to reduce the four to two, not to add more.

## 4. Competitor teardown

Nine pages read in full on 2026-08-26. Two blocked automated fetch and are recorded as such rather than dropped.

| # | URL | Words | Worked example | Mandatory test | 31 July limb | Extended limb | Statute | Amend-not-revoke | Post-retirement | FAQs |
|---|---|---|---|---|---|---|---|---|---|
| 1 | https://faq.nhsbsa.nhs.uk/knowledgebase/article/KA-31017/en-us | ~1,100 | No | **Yes, per scheme** | Yes, example-anchored | 6-year leg only | No | Partial | **Yes, before 75th birthday** | 0 |
| 2 | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056400 | ~350 | No | No | No | No | No | No | No | 0 |
| 3 | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056420 | ~1,100 | No | No | No | No | **Yes, SI 2011/1793** | **Yes, precisely** | No | 0 |
| 4 | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 | ~2,100 | Date arithmetic only | No | **Yes, canonical wording** | **Yes, both legs** | **Yes, ss.237B, 237BA** | No | Yes | 0 |
| 5 | https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/your-annual-allowance-statement-and-exceeding-the-limit | ~2,800 | No | Yes | Yes, loose wording | McCloud dates only | No | No | No | 0 |
| 6 | https://medicsmoney.co.uk/nhs-pension-statement-annual-allowance-tax-charge/ | ~1,200 | LTA comparison, off-topic | No | No | No | No | No | No | 0 |
| 7 | https://adviser.royallondon.com/technical-central/pensions/contributions-and-tax-relief/scheme-pays/ | ~1,200 | **Yes, dated** | **Yes, both limbs** | Yes, canonical wording | No | Cites PTM | Yes | No | 6 |
| 8 | https://www.bw-medical.co.uk/nhs-pension | ~1,900 | No | No | No | No | No | No | No | 0 |
| 9 | https://www.nhsbsa.nhs.uk/member-hub/annual-allowance | n/a | **HTTP 403 to automated fetch, twice.** Keyword and structure unknown, recorded as an explicit unknown, not as zero. Substituted by #1, which is NHSBSA-authored. | | | | | | | |

`ramsaybrown.com`'s dedicated annual-allowance page returned 404 at fetch despite appearing in search results. Recorded, not counted.

**Union of headings across the set.** What Scheme Pays is · mandatory versus voluntary · the £2,000 test · the standard-allowance input test · taper and MPAA interaction · GP-specific treatment · carry-forward of unused allowance · offsetting negative growth in the 1995/2008 legacy sections · paying the charge and the Self Assessment interaction · the 31 July deadline · the extended deadline · McCloud remediable statements and their bespoke dates · how the reduction is calculated · interest on Scheme Pays · amending versus revoking · the post-retirement and age-75 backstops · SPE2 mechanics · common mistakes.

**Table stakes.** The two-limb mandatory test, the headline 31 July date in some form, and an acknowledgement that the pension is permanently reduced. Nothing else is universal. The exact statutory phrasing of the deadline appears verbatim on only three of the nine: PTM056430, Royal London and our own live page.

## 5. Whitespace

Six openings, ordered by how defensible they are.

1. **Nobody explains why the extended deadline starts on 2 May.** Not one page in the set states the date at all in generic form: PTM056430 gives the three-month and six-year legs without the trigger date, NHSBSA gives only the six-year leg, the BMA gives McCloud-specific dates instead of the rule. The trigger is in s.237BA(4) and the reason for it is provable arithmetic. **This is the single highest-value addition available and it is uncontested.**
2. **Nobody reconciles the two post-retirement rules.** NHSBSA says an SPE2 on a voluntary basis must arrive before the member's 75th birthday. FA 2004 s.237B(6) says no notice at all after entitlement to all benefits. Those are different rules with different triggers and no page in the set explains that one governs the statutory route and the other NHSBSA's discretionary one. **Our own live page states only the second and answers the FAQ "No", which is wrong for the voluntary route.**
3. **Nobody explains that the input test runs per scheme, not across your NHS record.** NHSBSA's own wording is "the pension input amount in either the 1995 or 2008 Scheme or the 2015 Scheme must be more than the standard AA", and s.237B(1)(b) tests input "in relation to a registered pension scheme". For a doctor with rolled-back legacy service and 2015 accrual this is decisive and it is the reason NHSBSA's voluntary route exists in the shape it does. Generic explainers such as Royal London cannot cover it, because it is a fact about the NHS scheme structure rather than about pensions tax.
4. **Our page does not name the SPE2 election notice.** Every NHSBSA-adjacent source treats the form as the central mechanic. The page describes submitting "the Scheme Pays election form" generically.
5. **Nobody states the pension savings statement timetable next to the election deadline.** The 6 October duty under reg 14A of SI 2006/567 is what makes the whole sequence legible, and its routine breach at NHSBSA is what makes the 2 May limb the operative one.
6. **Interest is underexplained everywhere**, but it belongs to the calculator under the ownership map and is deliberately declined here.

## 6. Deterministic acceptance criteria

Countable at QA. A checker can fail each one.

| # | Criterion | Pass condition |
|---|---|---|
| AC1 | Frozen fields unchanged | `slug`, `canonical`, `metaTitle`, `metaDescription`, `h1` byte-identical to the live file |
| AC2 | Existing H2 order preserved | The 10 live H2s appear in the same relative order (K2) |
| AC3 | New H2s are additive | Exactly 5 new H2s, no live H2 removed or renamed |
| AC4 | No net loss of depth (K1) | Statutory references: live 1 generic ("Finance Act 2004") to **9 pinpoint**. Form names: live 0 to **1** (SPE2). Named instruments: live 0 to **3** (FA 2004, SI 2006/567, SI 2011/1793). Word count up, not down |
| AC5 | Bing equity retained | All 14 DO-NOT-LOSE queries still have their subject matter addressed on the page. Manual check against §1 |
| AC6 | No em-dash (I1) | Zero occurrences of the em-dash character anywhere in the file |
| AC7 | No GMC retention fee figure (F5) | No numeral within 30 words of "GMC" plus "fee". The string "GMC" does not appear at all |
| AC8 | Ownership boundary held | No actuarial factor, no reduction figure, no break-even figure, no NHSBSA estimating-factor arithmetic anywhere on the page |
| AC9 | V5 rhetorical cap | "It is not X, it is Y" and its variants at most twice |
| AC10 | V9 tic check | Zero paragraphs opening with a numeral count ("Two rules", "Three things", "Four levers") |
| AC11 | V1 word orders | Scheme-pays family orders not increased above the live count of 4. "scheme pays nhs" and "scheme pays nhs pension" absent by design |
| AC12 | Table present (L4) | At least one table with an effective-date caption |
| AC13 | Every figure traces to house positions (F4) | £2,000, £60,000, £200,000, £260,000, £10,000, 31 July, 2 May, 6 October, six years, three months, age 75 all traceable to §2.B, §2.D or a cited primary source |
| AC14 | No fabricated statistics (F6, I6) | No percentage and no quantified generalisation without a named source |

**Bands reported as missed, not padded to (V8, coordinator ruling 2).** L2 sets 2,000 to 3,200 words for a deep guide. The prepared page runs to **4,749 words of body copy**, excluding the FAQ block, against **2,906 live**. It overshoots because the grade forbids deleting anything (K1) and the whitespace requires five new sections. H1 sets 4 to 8 FAQs; the page carries **14**, inherited, and coordinator ruling 1 forbids deleting substantive FAQ entries to reach a band. Both misses are consequences of the EXTEND grade and neither is corrected by contorting the page.

## 7. Factual corrections made inside frozen copy

Recorded as a one-line addendum each, per coordinator ruling 3, so QA does not read them as scope creep.

1. **`keyTakeaways[1]` and the H3 "The £60,000 input test".** Live text says the test looks at "the NHS scheme input in isolation". Corrected to state that it runs **per registered pension scheme**, and that NHSBSA treats the 1995/2008 Scheme and the 2015 Scheme as separate schemes for it. Source: FA 2004 s.237B(1)(b), "in relation to a registered pension scheme", read at https://www.legislation.gov.uk/ukpga/2004/12/section/237B on 2026-08-26; NHSBSA, "the pension input amount in either the 1995 or 2008 Scheme or the 2015 Scheme must be more than the standard AA", https://faq.nhsbsa.nhs.uk/knowledgebase/article/KA-31017/en-us read 2026-08-26.
2. **The H3 "Voluntary Scheme Pays" and its FAQ.** Live text gives two triggers for the voluntary route (charge of £2,000 or less, taper-driven charge). NHSBSA's own definition adds a third and, for doctors, the most common: membership in more than one NHS Pension Scheme where neither input alone exceeds the standard allowance but the combined input does. Added. Same NHSBSA source.
3. **FAQ "Can I use Scheme Pays after I have retired?"** Live answer is "No." That is right for the mandatory route and **wrong for the voluntary route**. Corrected to give both rules with their separate triggers. Sources: FA 2004 s.237B(6) verbatim, "A notice may not be given after the individual becomes actually entitled to all of the individual's benefits under the pension scheme"; NHSBSA KB, voluntary SPE2 "before your 75th birthday".
4. **`keyTakeaways[3]`, the H3 "The extended deadline where the scheme is late", and its FAQ.** Live text describes the extension as applying where the statement is "late" or arrives "so late that the normal deadline would be unfair", which is a paraphrase and not the rule. The statutory trigger is a revised statement given **on or after 2 May in the year following the year in which the tax year ends**, and before six years from the end of that tax year. Corrected and dated. Source: FA 2004 s.237BA(4) and (5).
5. **"This is a statutory right under the Finance Act 2004".** Pinpointed to s.237B(1) and s.237BA throughout, rather than a bare Act reference.
6. **The H3 "The absolute backstop".** Qualified so it is clear it states the mandatory limb, with the voluntary position handled in its own new section.
7. **V9 tic, recorded not silently carried.** The added copy contains no numeral-count paragraph opener and no "it is not X, it is Y" construction. One numeral-count opener survives in frozen live copy, "Two cross-currents are worth pulling together", and two instances of the older construction survive in the "What Scheme Pays is" and "The deadline" sections. All three are inherited, all sit inside copy K1 forbids deleting, and the page is at the V5 cap of two rather than over it. Recorded so a later unfreezing pass knows where they are.
8. **Step 4 of the election list.** "Submit the Scheme Pays election form" corrected to name the **Scheme Pays Election Notice (SPE2)** and to say only the current version is accepted.

## 8. Source verification log

Every load-bearing claim, read at source on 2026-08-26.

| Claim | Source read | What it says |
|---|---|---|
| Mandatory conditions | https://www.legislation.gov.uk/ukpga/2004/12/section/237B (FA 2004 s.237B(1)) | "the amount of the individual's liability to the annual allowance charge for a tax year exceeds £2,000, and... the pension scheme input amount in the case of the individual in relation to a registered pension scheme for the tax year exceeds the amount of the annual allowance specified in section 228(1) for the tax year" |
| The joint liability amount is specified by the member | FA 2004 s.237B(3), same URL | "...and is specified in the notice, ('the joint liability amount')" |
| Amend but not revoke | FA 2004 s.237B(5)(c), same URL | "may be amended... but may not be revoked" |
| Notice contents are prescribed by regulations | FA 2004 s.237B(5)(b), same URL; https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056420 | Manner, form and particulars prescribed by regulations. PTM056420 identifies SI 2011/1793 |
| Brought-forward limb | FA 2004 s.237B(6), same URL | "A notice may not be given after the individual becomes actually entitled to all of the individual's benefits under the pension scheme" |
| Standard 31 July limb | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA (s.237BA(2)) | "the individual must give the notice not later than 31 July in the year following the year in which the tax year ends" |
| The 2 May trigger | FA 2004 s.237BA(4), same URL | A relevant time is one "on or after 2 May in the year following that in which the tax year in question ends, and before the end of the period of 6 years beginning with the end of the tax year in question" |
| The extended limb | FA 2004 s.237BA(5), same URL | Notice before the earlier of "the end of the period of 3 months beginning with the day on which the scheme administrator gives the individual the information" or the six-year point |
| s.237BA is in force | Same URL | Inserted by Finance Act 2022 s.9(3), effective 24 February 2022 |
| HMRC's reading of all three limbs | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 , page last updated **24 August 2026** | Title "Annual allowance: tax charge: scheme pays: deadlines". Carries the 31 July limb, the three-month and six-year legs, and the brought-forward limb |
| Pension savings statement by 6 October | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm167100 , last updated **24 August 2026** | "A pension savings statement for a particular tax year should be given to the individual by 6 October following the end of the relevant tax year", under reg 14A(4) to (6C) of SI 2006/567 |
| Per-scheme input test, voluntary route, SPE2, age 75 | https://faq.nhsbsa.nhs.uk/knowledgebase/article/KA-31017/en-us | Mandatory: input "in either the 1995 or 2008 Scheme or the 2015 Scheme" over the standard AA and charge over £2,000. Voluntary: membership in more than one NHS scheme, neither input over the standard AA, combined over it, no £2,000 floor, extended from 2017/18 to tapered and alternative allowances. "complete the scheme pays Election Notice (SPE2)". Post-retirement elections "on a voluntary basis... before your 75th birthday" |
| £60,000, £200,000, £260,000, £10,000, carry-forward | `docs/medical/house_positions.md` §2.B, re-verified there 2026-08-26 at https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates | Unchanged for 2026/27 |
| Scheme Pays position, all three limbs, s.237B(6) citation | `docs/medical/house_positions.md` §2.D, re-read 2026-08-26 after the same-day correction | Matches every limb above. The s.237B(6) citation for the brought-forward limb is the corrected one and is used here |

**Stated limitation (F7).** The current SPE2 PDF (V16, dated 20250813) and the NHSBSA member hub both return HTTP 403 to automated fetch. The form was **not read**. The page therefore names the form, says only the current version is accepted, and describes what the notice must contain from the statute and PTM056420 rather than from the PDF's field list. Nothing about the form's internal layout is asserted. A human should open the current SPE2 before this page ships if a field-level description is ever added.

---
---

=== PAGE STARTS ===

---
title: 'Scheme Pays for Doctors: NHS Pension Annual Allowance Charge Deadlines Explained'
slug: nhs-pension-scheme-pays-doctors-deadlines
canonical: https://www.medicalaccounts.co.uk/blog/nhs-pension-scheme-pays-doctors-deadlines
date: '2026-06-03'
generator: opus-4.8/netnew-wave
author: Medical Accountants UK Editorial Team
image: "https://images.pexels.com/photos/7580856/pexels-photo-7580856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
imageCredit:
  photographer: "RDNE Stock project"
  photographerUrl: "https://www.pexels.com/@rdne"
  source: "Pexels"
  sourceUrl: "https://www.pexels.com/photo/calendar-with-deadline-reminder-7580856/"
category: NHS Pension Planning
metaTitle: 'NHS Pension Scheme Pays for Doctors: Deadlines Guide'
metaDescription: 'Let the NHS scheme settle your annual allowance charge: the mandatory test, the benefit reduction and the 31 July election deadline. Elect in time.'
altText: Doctor reviewing an NHS pension savings statement and a Scheme Pays election form
h1: 'NHS Pension Scheme Pays for Doctors: Deadlines, the Mandatory Test and How It Reduces Your Pension'
keyTakeaways:
- "Mandatory Scheme Pays applies only where both tests are met at once: the annual allowance charge exceeds £2,000 and the scheme input amount exceeds the standard £60,000 annual allowance."
- "The input test runs scheme by scheme, and NHSBSA treats your 1995/2008 benefits and your 2015 benefits as separate schemes for it, so a doctor whose combined NHS input is over £60,000 but whose input in each scheme is below it has no mandatory right."
- "A 2025/26 charge must be elected by 31 July 2027, because the deadline is 31 July in the year following the year in which the tax year ends, not the July straight after."
- "Where NHSBSA gives you a revised pension savings statement on or after 2 May in that following year, the deadline becomes the earlier of three months from that statement or six years from the end of the original tax year."
- "A Scheme Pays election can be amended but never revoked, and the charge must still be reported on your Self Assessment return even when the scheme settles it."
summary: When a doctor breaches the annual allowance, Scheme Pays lets the NHS pension settle the tax charge in exchange for a permanent reduction in benefits. This guide explains mandatory versus voluntary Scheme Pays, the precise test, the 31 July deadline and how to make and revise an election.
schema: ''
faqs:
- question: What is Scheme Pays on the NHS pension?
  answer: Scheme Pays is a facility that lets the NHS Pension Scheme settle your annual allowance tax charge for you, in exchange for a permanent reduction in your pension benefits. You are not avoiding or waiving the tax. You are funding it from the pension instead of out of your own cash, and your benefits are reduced by an actuarially equivalent amount.
- question: What is the difference between mandatory and voluntary Scheme Pays?
  answer: 'Mandatory Scheme Pays is a legal right under section 237B of the Finance Act 2004: where the charge exceeds £2,000 and your pension input in one NHS scheme exceeds the standard £60,000 annual allowance, the scheme must accept your election for the qualifying part. Voluntary Scheme Pays is offered at NHSBSA''s discretion where those conditions are not met, for example where the charge is £2,000 or less, where it is driven only by the taper, or where your input is split across two NHS schemes and neither slice reaches £60,000.'
- question: When is mandatory Scheme Pays available?
  answer: 'Mandatory Scheme Pays is available only where both conditions are met at once: your annual allowance charge for the tax year exceeds £2,000, and your pension input amount in a single NHS scheme exceeds the standard £60,000 annual allowance. If either condition fails, mandatory Scheme Pays does not apply, although voluntary Scheme Pays may still be offered.'
- question: What is the £2,000 threshold for Scheme Pays?
  answer: It is the size of the annual allowance charge itself, not the excess over the allowance, that must exceed £2,000 for the mandatory route. So you look at the tax charge produced for the year. If that charge is more than £2,000 and the input test is also met, you have a right to mandatory Scheme Pays for the qualifying portion.
- question: Does the £60,000 test look at the NHS scheme alone or all my pensions?
  answer: Neither, quite. Section 237B tests your pension input amount in relation to one registered pension scheme, and NHSBSA counts your 1995/2008 benefits and your 2015 benefits as two separate schemes. So a doctor with £35,000 of input in the legacy scheme and £35,000 in the 2015 scheme has £70,000 of NHS growth, a charge, and no mandatory right, because neither slice on its own exceeds £60,000. That case is exactly what NHSBSA's voluntary route is designed for.
- question: What is the deadline to elect for Scheme Pays?
  answer: The election deadline is 31 July in the year following the year in which the tax year ends, under section 237BA of the Finance Act 2004. There is an extended limb where NHSBSA gives you a revised pension savings statement on or after 2 May in that following year, but the standard mandatory deadline is that 31 July date. It is a hard deadline, so it should be diarised well in advance.
- question: My charge is for 2025/26. By when must I elect?
  answer: A 2025/26 charge must be elected by 31 July 2027. The logic is that the 2025/26 tax year ends on 5 April 2026, the year following ends on 5 April 2027, and the deadline is 31 July in that following year, which is 31 July 2027. Working the timeline through avoids the common mistake of assuming it is the July straight after the tax year.
- question: Can the Scheme Pays deadline ever be extended?
  answer: Yes, for the mandatory route. Where NHSBSA gives you revised pension input information at a relevant time, meaning on or after 2 May in the year following the year in which the tax year ends, the time limit becomes the earlier of three months from the day that information is given or six years from the end of the original tax year. This extended limb is particularly relevant to McCloud-revised historic charges and to the routinely late NHS statement.
- question: Can I still use Scheme Pays if my charge is only because of the taper?
  answer: Not on the mandatory route. If your NHS input is below £60,000 but you have a charge because your tapered allowance is lower, the mandatory conditions are not met, so the charge is voluntary-only. NHSBSA may still offer voluntary Scheme Pays on its own terms, and it has done so for tapered and alternative allowance cases since the 2017/18 tax year, which matters a great deal for tapered high earners.
- question: How much will Scheme Pays reduce my pension?
  answer: The amount of the charge is deducted and your benefits are permanently reduced using actuarial factors set by NHSBSA and the Government Actuary's Department. The factors depend on your age, your scheme section and the amount, and they are revised from time to time, so there is no fixed percentage to quote. Our NHS Pension Scheme Pays calculator applies NHSBSA's own published estimating method to your figures.
- question: Can I cancel or change a Scheme Pays election?
  answer: An election can be amended but it cannot be revoked. Section 237B(5) of the Finance Act 2004 says so directly. If a corrected pension input amount changes your charge, you can revise the election to match, but you cannot simply cancel it and take the tax back into your own hands. This is why it is worth getting the input figure confirmed before you elect.
- question: Do I still need to put the charge on my tax return if the scheme pays it?
  answer: Yes. The annual allowance charge still has to be reported on your Self Assessment return even when the scheme settles it. The return shows both the charge and the amount you have asked the scheme to pay. Leaving it off the return is a common error that creates problems later.
- question: Can I use Scheme Pays after I have retired?
  answer: 'The answer differs by route. The mandatory right ends at full entitlement: section 237B(6) says a notice may not be given after you become actually entitled to all of your benefits under the scheme. The voluntary route runs longer, because NHSBSA accepts a voluntary SPE2 after retirement provided it reaches them before your 75th birthday. So taking all your benefits closes the statutory door and leaves only NHSBSA''s discretion.'
- question: How does Scheme Pays work with a McCloud-revised charge?
  answer: A McCloud recalculation can change a historic pension input amount and therefore a historic annual allowance charge. Where that revised charge needs settling, it can often be paid through Scheme Pays within the extended deadline that applies when NHSBSA gives you revised information on or after 2 May in the relevant year. The mechanics of the election are the same, the deadline is the extended one.
metaTitle_prev: 'NHS Pension Scheme Pays: Deadlines for Doctors'
metaDescription_prev: 'How NHS Scheme Pays settles an annual allowance charge: the mandatory test (over £2,000 and over £60k input), the 31 July deadline and the benefit reduction.'
dateModified: '2026-09-11'
editorialNote: metaTitle and metaDescription rewritten via meta_apply.py (SERP meta-optimisation program) after GSC+Bing CTR analysis. Body extended 2026-09-11 under an EXTEND grade, additive sections only, with factual corrections to the input test, the voluntary route, the 2 May extension trigger and the post-retirement position, each verified at source.
---
<p>When a doctor breaches the annual allowance, the resulting tax charge does not have to be paid out of your own pocket. The NHS Pension Scheme can settle it for you through a facility called Scheme Pays, in exchange for a permanent reduction in your benefits. This is the page that explains how Scheme Pays actually works: the difference between mandatory and voluntary Scheme Pays, the precise numbers test, the hard 31 July deadline with a worked timeline, how the benefit reduction is applied, and how to make and revise an election.</p>

<p>This guide assumes the charge already exists. It does not re-teach how the charge arises or how the £60,000 allowance and the input amount are calculated. For that, start with the <a href="/blog/nhs-pension-annual-allowance-complete-guide">NHS pension annual allowance complete guide</a>, and if your charge comes from the taper, the <a href="/blog/nhs-pension-tapered-annual-allowance-calculator">tapered annual allowance guide and calculator</a>. For the wider toolkit of reducing charges in the first place, see <a href="/blog/nhs-pension-tax-charges-how-to-minimize">how to minimise NHS pension tax charges</a>. For what an election will cost your pension in pounds, use the <a href="/calculators/nhs-pension-scheme-pays">NHS Pension Scheme Pays calculator</a>, which applies NHSBSA's own published estimating factors. This page covers the deadlines and the procedure.</p>

<h2>What Scheme Pays is</h2>

<p>Scheme Pays is a facility that lets the NHS scheme pay your annual allowance charge to HMRC and recover the cost by permanently reducing your pension benefits. The crucial point is what it is not: it is not a way to avoid or reduce the tax. The charge is the same either way. Scheme Pays simply changes where the money comes from, the pension rather than your bank account, and in doing so converts a cash bill today into a smaller pension later. Whether that trade is worthwhile is an individual question we return to below.</p>

<p>It exists because of the nature of NHS pension growth. In a defined benefit scheme, a large annual allowance charge can arise in a year when you have not actually received any extra cash. The charge is driven by the capitalised growth in your promised future pension, not by money in your pocket, so a consultant or GP partner can face a tax bill of several thousand pounds with no corresponding rise in take-home pay to fund it. Scheme Pays is the mechanism that resolves that mismatch by letting the pension that caused the charge also carry the cost of it. Without it, doctors with strong pension growth would routinely have to find large sums of cash to pay tax on a benefit they cannot yet access.</p>

<h2>Mandatory versus voluntary Scheme Pays</h2>

<p>The single most important distinction in this whole area is between mandatory and voluntary Scheme Pays, because it determines whether the scheme must accept your election or merely may.</p>

<h3>Mandatory Scheme Pays</h3>

<p>Mandatory Scheme Pays is available where <strong>both</strong> of these conditions are met for the tax year:</p>

<ul>
<li>your annual allowance charge <strong>exceeds £2,000</strong>; and</li>
<li>your pension input amount in the scheme <strong>exceeds the standard £60,000</strong> annual allowance for 2026/27.</li>
</ul>

<p>Where mandatory Scheme Pays applies, the scheme has no discretion. It must accept your election for the qualifying portion of the charge. This is a statutory right under section 237B(1) of the Finance Act 2004, not a favour, and the statute states both limbs in those terms: the liability must exceed £2,000, and the pension scheme input amount must exceed the annual allowance specified for the tax year.</p>

<h3>Voluntary Scheme Pays</h3>

<p>Where those two conditions are not both met, mandatory Scheme Pays is unavailable, but NHSBSA can still offer voluntary Scheme Pays at its discretion and on its own terms. Three situations put a doctor here. The charge may be £2,000 or less. The charge may be driven by the taper, which is common for high earners. Or your NHS growth may be split across two schemes, with neither slice reaching £60,000 on its own, which is covered in the next section and is the case NHSBSA's own guidance describes first. NHSBSA extended the voluntary route from the 2017/18 tax year onwards to members exceeding a tapered or alternative allowance, and there is no £2,000 floor on it.</p>

<p>The practical difference between the two routes is one of certainty and timing. With mandatory Scheme Pays you have a statutory right, the scheme must accept a valid election for the qualifying part, and the deadline is the one set in law. With voluntary Scheme Pays the scheme decides whether to offer it, sets the terms on which it will, and may apply its own administrative cut-offs that differ from the statutory mandatory deadline. So a doctor relying on the voluntary route cannot assume the same latitude and should engage with NHS Pensions in good time rather than at the last moment. For high earners caught by the taper, this is not a marginal technicality, it is the usual position, because their NHS input frequently sits below the £60,000 standard allowance even though their available allowance after tapering is far lower.</p>

<h3>The split-charge point</h3>

<p>A single year's charge can be part-mandatory and part-voluntary. The mandatory limb only covers the part of the charge that is driven by input above the £60,000 standard allowance. Any part of the charge attributable to a lower tapered allowance sits in the voluntary limb. So a tapered doctor whose NHS input is above £60,000 can have a mandatory right to part of the settlement and need the scheme's agreement for the rest.</p>

<h2>The numbers test, worked out</h2>

<h3>The £2,000 threshold</h3>

<p>It is the <strong>charge</strong> that must exceed £2,000, not the amount by which you have exceeded your allowance. So you calculate the annual allowance charge for the year, at your marginal rate on the excess, and then test that figure against £2,000. A charge of exactly £2,000 does not meet the mandatory test, because the test is more than £2,000.</p>

<h3>The £60,000 input test</h3>

<p>The input test looks at the pension input amount in <strong>one registered pension scheme</strong>, not aggregated across everything you hold. For a defined benefit scheme like the NHS one, the input amount is the capitalised growth in your benefits over the year, not the contributions you paid. If that single-scheme input exceeds £60,000, the input limb of the mandatory test is satisfied. If your combined input across several schemes is over £60,000 but no single scheme reaches it, the mandatory route is still closed.</p>

<p>This single-scheme rule has a real consequence for doctors who also pay into a private pension or hold a separate added pension or AVC arrangement. Your annual allowance bites on the total input across everything, so the charge can be substantial, but the mandatory Scheme Pays right is tested scheme by scheme. A doctor whose NHS input is £55,000 and whose private pension input is another £20,000 has a combined input of £75,000 and may well have a charge, but because the NHS input alone is below £60,000, the NHS scheme is not obliged to operate Scheme Pays. The doctor would then either pay from cash, ask NHSBSA to operate voluntary Scheme Pays, or, where the private scheme offers it, settle part of the charge through that scheme instead. Knowing which input figure drives the right is therefore essential before assuming any scheme must act.</p>

<h3>Why tapered doctors often fall into voluntary-only</h3>

<p>Take a consultant whose NHS pension input for the year is around £48,000, but whose tapered annual allowance has fallen to, say, £20,000 because of high adjusted income. There is plainly a charge, because input far exceeds the tapered allowance. But the mandatory input test asks whether scheme input exceeds £60,000, and here it does not. So mandatory Scheme Pays is unavailable, and the consultant is reliant on voluntary Scheme Pays, which the scheme offers on its terms. The figures are illustrative, but the structural trap is real and common among tapered doctors. For how the taper itself is calculated, see the <a href="/blog/nhs-pension-tapered-annual-allowance-calculator">tapered annual allowance calculator guide</a>.</p>

<p>The taper, for context, reduces the standard £60,000 allowance for high earners. It applies where threshold income exceeds £200,000 and adjusted income exceeds £260,000, cutting the allowance by £1 for every £2 of adjusted income above £260,000, down to a floor of £10,000. The money purchase annual allowance, relevant where defined contribution AVCs are flexibly accessed, is also £10,000. We do not work through those figures here, because the point of this page is what happens once a charge exists, not how it is computed. The relevance to Scheme Pays is simply that a tapered doctor can have a meaningful charge while their NHS input sits below £60,000, which is exactly the combination that leaves them in voluntary-only territory. Recognising that early changes how you approach NHS Pensions and how much lead time you allow.</p>

<h2>Which NHS pension scheme is your input tested against?</h2>

<p>Here is the point that catches more doctors than the taper does, and almost nobody states it plainly. The mandatory test is not applied to your NHS pension record as a whole. Section 237B(1)(b) tests your pension input amount "in relation to a registered pension scheme", one scheme at a time, and NHSBSA counts your 1995 or 2008 benefits and your 2015 benefits as <strong>separate schemes</strong> for that purpose. Its own guidance puts the condition as the input amount in either the 1995 or 2008 Scheme or the 2015 Scheme being more than the standard allowance.</p>

<p>Consider a consultant with rolled-back legacy service and continuing 2015 accrual whose statement shows £35,000 of input in the legacy scheme and £35,000 in the 2015 scheme. Total NHS growth is £70,000, comfortably over the allowance, and there is a real charge at marginal rate on the excess. Neither slice reaches £60,000, so both limbs of the mandatory test cannot be satisfied and NHSBSA is not obliged to settle anything. Read the two input figures on your statement separately before you assume you have a right.</p>

<p>NHSBSA's voluntary route is written the way it is for exactly this reason, and its first listed voluntary case is precisely this one: membership of more than one NHS Pension Scheme, an input amount in one or both that does not exceed the standard allowance, and a combined input that does. Read together, the two routes cover the ground. What changes is whether you are exercising a right or asking for a discretion, and that determines both your leverage and your timetable.</p>

<p>The <a href="/blog/mccloud-remedy-nhs-pension-doctors-explained">McCloud remedy</a> made this split the normal case rather than the exception, because remedy-period service for eligible members was rolled back into the legacy section from 1 October 2023. A doctor who had all their growth in one scheme before the rollback may have had it in two afterwards, with no change in behaviour and no warning that their mandatory right had quietly gone.</p>

<h2>The deadline: 31 July, with a worked timeline</h2>

<p>The Scheme Pays election deadline is <strong>31 July in the year following the year in which the tax year ends</strong>, set by section 237BA(2) of the Finance Act 2004. That phrasing trips people up, so it is worth walking through.</p>

<h3>Worked example</h3>

<p>Take a <strong>2025/26 charge</strong>. The deadline to elect is <strong>31 July 2027</strong>. Here is why:</p>

<ul>
<li>The 2025/26 tax year ends on <strong>5 April 2026</strong>.</li>
<li>The year following the year in which the tax year ends finishes on <strong>5 April 2027</strong>.</li>
<li>The deadline is 31 July in that following year, so <strong>31 July 2027</strong>.</li>
</ul>

<p>The common error is to assume the deadline is the July immediately after the tax year ends, which would be 31 July 2026. It is not. You get an extra year. Even so, diarise it early, because once it passes the mandatory right is gone.</p>

<h3>The extended deadline where the scheme is late</h3>

<p>A separate and longer limb applies where NHSBSA gives you revised pension input information at what the statute calls a relevant time. In that case the time limit becomes the <strong>earlier of three months from the day that information is given, or six years from the end of the original tax year</strong>. This extended limb is what makes it possible to settle McCloud-revised historic charges through Scheme Pays, because those revised figures often arrive years after the original tax year. The next section explains what "a relevant time" means, because the date is specific and it is the part that decides whether you actually get more time.</p>

<h3>The absolute backstop</h3>

<p>No mandatory Scheme Pays election can be made once you have become actually entitled to all of your benefits under the scheme, in other words once you have taken everything. Section 237B(6) of the Finance Act 2004 says a notice may not be given after that point. So the election has to be in before full retirement. If you expect a charge in your final working years, the sequencing matters: elect first, retire fully second. This timing point connects directly to <a href="/blog/nhs-pension-partial-retirement-doctors-guide">partial retirement</a>, where you can take some benefits while continuing to accrue. The voluntary route behaves differently after retirement and is covered in its own section below.</p>

<h2>Why does the extended deadline start on 2 May?</h2>

<p>The extension does not apply to any late statement. It applies where the revised information is given at a "relevant time", which section 237BA(4) defines as a time on or after <strong>2 May in the year following that in which the tax year in question ends</strong>, and before the end of six years beginning with the end of that tax year. The 2 May date looks arbitrary until you do the arithmetic, and then it is obviously deliberate.</p>

<p>The extension gives you three months beginning with the day the information is given. A statement handed over on 1 May starts a three-month period that ends on 31 July, which is the ordinary deadline you already had, so the extension would be worth nothing. Move the statement one day later, to 2 May, and the three months run to 1 August, one day past the ordinary deadline. So 2 May is simply the first date on which the extended limb can give you more time than the standard rule already does. Parliament drew the line at the point where the extension starts to have an effect.</p>

<p>The practical reading for a doctor is straightforward. Find the date on the revised statement. If it is before 2 May in the relevant year, your deadline is the ordinary 31 July and nothing has changed. If it is on or after 2 May, count three months forward from that date, compare it with the six-year backstop, and your deadline is whichever comes first. Keep the statement, because the date on it is the evidence for which limb you are using.</p>

<p>Worked through for a 2025/26 charge, the picture looks like this.</p>

<table>
<caption>Scheme Pays election deadlines for a 2025/26 annual allowance charge, under FA 2004 ss.237B and 237BA as in force at 26 August 2026</caption>
<thead>
<tr><th>Your situation</th><th>Governing provision</th><th>Deadline</th></tr>
</thead>
<tbody>
<tr><td>Original statement, no revision</td><td>s.237BA(2)</td><td>31 July 2027</td></tr>
<tr><td>Revised statement given on 12 April 2027</td><td>s.237BA(2), because 12 April is before the relevant time</td><td>31 July 2027, unchanged</td></tr>
<tr><td>Revised statement given on 20 June 2027</td><td>s.237BA(4) and (5)</td><td>19 September 2027, being three months from the statement</td></tr>
<tr><td>Revised statement given on 3 March 2032</td><td>s.237BA(5), six-year leg bites first</td><td>5 April 2032, being six years from the end of the tax year</td></tr>
<tr><td>You become entitled to all your benefits on 1 May 2027</td><td>s.237B(6)</td><td>Before 1 May 2027, whatever the limbs above would otherwise allow</td></tr>
</tbody>
</table>

<h2>When should your pension savings statement arrive?</h2>

<p>The election clock only makes sense alongside the statement clock, and the two are set by different rules. A scheme administrator should give you a pension savings statement for a tax year <strong>by 6 October following the end of that tax year</strong>, under regulation 14A of the Registered Pension Schemes (Provision of Information) Regulations 2006. So for 2025/26 the statement is due by 6 October 2026, the charge is declared on the Self Assessment return due by 31 January 2027, and the election is due by 31 July 2027. Each stage gives you several months of clear air, on paper.</p>

<p>In practice NHS pension savings statements are frequently late, and revised statements are common enough that many doctors receive two or three for the same year. The reasons are structural rather than careless: certified GP profits arrive a year in arrears, backdated pay awards restate an input amount after the fact, and the McCloud rollback required historic years to be recalculated wholesale. That is precisely why the 2 May limb matters so much to NHS members and so little to members of a scheme that issues on time.</p>

<p>Chase the statement if it has not arrived by mid-October, because you cannot compute a charge without an input amount and the election deadline does not move just because the statement is late in an ordinary way. Keep every version you receive, dated, because if a revised one lands on or after 2 May it is the document that proves which deadline you are entitled to work to. For how the input amount is arrived at in the first place, see the <a href="/blog/nhs-pension-annual-allowance-complete-guide">annual allowance complete guide</a>.</p>

<h2>How the benefit reduction works</h2>

<p>When the scheme pays the charge, that amount is deducted and your benefits are permanently reduced using actuarial factors set by NHSBSA and the Government Actuary's Department. The factors depend on your age, your scheme section and the amount being settled. These factors are revised from time to time, so there is deliberately no fixed percentage to quote here. As a rough sense of direction, the older you are when the reduction takes effect, the larger the proportional impact tends to be, because there is less time for the deduction to be spread across. For the current factors and a modelled figure for your own charge, use the <a href="/calculators/nhs-pension-scheme-pays">Scheme Pays calculator</a>, which is built on NHSBSA's published estimating method, or read the NHSBSA Scheme Pays and annual allowance member guidance directly.</p>

<p>A point worth understanding is that the reduction is itself revalued over time until you draw your benefits, broadly in line with the way the scheme uprates its figures, so the deduction you carry to retirement is not simply the cash amount the scheme paid years earlier. This is one reason you should treat any single percentage you see quoted online with caution: it may relate to a particular age, section and year that does not match yours. The honest answer to how much Scheme Pays will cost your pension is that it depends on your specific factors, and the only reliable figure is the one NHSBSA produces for your own case. What you can rely on is the direction of travel and the fact that the reduction is permanent, which is what makes the decision to use it one worth modelling rather than taking by reflex.</p>

<h3>Is it worth it?</h3>

<p>Whether Scheme Pays is the right call is an individual judgement, not a rule. You are trading cash now (paying the charge yourself, often from taxed income) against a permanently smaller pension later. For a doctor who is cash-constrained, or who would otherwise borrow to pay the charge, Scheme Pays can be the sensible route. For a doctor with the cash to settle it and a long time to retirement, paying directly may preserve more pension. There is no blanket recommendation, and modelling the permanent reduction against the cash cost is the right way to decide.</p>

<h2>How to make a Scheme Pays election</h2>

<p>The practical steps are straightforward once the charge is known:</p>

<ol>
<li><strong>Get your pension savings statement</strong> and input amount from NHSBSA, so you know the input figure for the year, split by scheme.</li>
<li><strong>Calculate the charge</strong>, or have it calculated, at your marginal rate on the excess over your available allowance (after carry-forward).</li>
<li><strong>Declare the charge on your Self Assessment return</strong> for the relevant year, showing both the charge and the Scheme Pays amount.</li>
<li><strong>Submit the Scheme Pays Election Notice, form SPE2</strong>, to NHS Pensions before the deadline. Only the current version of the form is accepted, so download it from NHSBSA rather than reusing a copy saved in a previous year.</li>
<li><strong>Keep evidence</strong> of the election and the figures it was based on.</li>
</ol>

<h3>The Self Assessment interaction</h3>

<p>It bears repeating because it is so often missed: the charge still goes on your tax return even though the scheme pays it. The return reports the charge and the amount the scheme is settling. Asking the scheme to pay does not take the charge off your return, it simply records who is funding it. For how contributions and relief feed into all of this, see our guide to <a href="/blog/gp-pension-contributions-tax-relief">GP pension contributions and tax relief</a>.</p>

<h2>What the SPE2 election notice has to contain</h2>

<p>The election is a formal notice, not a letter, and the law is specific about it in three ways. Section 237B(5) of the Finance Act 2004 requires the notice to be given within the time limit in section 237BA, to be made in the manner and form and to contain the particulars prescribed by regulations, and permits amendment but not revocation. The prescribing regulations are the Registered Pension Schemes (Notice of Joint Liability for the Annual Allowance Charge) Regulations 2011, which is why a free-text request will not do the job.</p>

<p>The substance the notice carries follows from section 237B(3). You are telling NHSBSA that you and the scheme are to be jointly and severally liable for a specified part of your annual allowance charge, and that specified figure is called the joint liability amount. So the notice identifies the tax year, the amount you are asking the scheme to meet, and the benefits it is to be taken from. Getting the scheme identification right matters, because which benefits settle the charge determines which factor table NHSBSA applies to the reduction.</p>

<p>The form NHSBSA uses for all of this is the Scheme Pays Election Notice, SPE2, published on its annual allowance pages. NHSBSA revises it periodically and is explicit that only the current version should be completed, so check the version stamp before you fill anything in. Send it to NHS Pensions by the route the current form specifies, and keep a dated copy alongside the pension savings statement it was based on, because if the election is later amended you will need both.</p>

<h2>Revising or amending an election</h2>

<p>An election may be amended but it may not be revoked. In practice you would revise an election where a corrected pension input amount changes the charge, for example after the scheme reissues a statement or after a McCloud recalculation. You update the election to match the corrected figure through NHS Pensions. What you cannot do is simply cancel a valid election and reclaim the tax yourself. This irreversibility is the reason it is worth getting the input figure confirmed before you elect, rather than electing on a provisional number and unwinding it later.</p>

<p>The amend-not-revoke rule is more practical than it sounds. It is common for a pension savings statement to be revised after you have already submitted a return and an election, particularly for years touched by the McCloud recalculation. When that happens you do not need to start again from scratch, you amend the existing election so the amount the scheme settles matches the corrected charge. If the corrected charge is lower, the election is amended down; if higher, it can be amended up within the applicable deadline. The thing you cannot do is treat the whole election as undone and take responsibility for the tax back into your own hands, because the scheme has already taken on the joint liability. Practically, this means it is better to elect on the best figure available and amend later than to delay electing past the deadline while waiting for a perfect number.</p>

<h2>Can you elect for Scheme Pays after you have retired?</h2>

<p>Most sources answer this with a flat no, and that is right for the statutory route and wrong for the other one. The two routes close at different moments, and the difference is worth several thousand pounds to a doctor who has already drawn their benefits.</p>

<p>Mandatory Scheme Pays ends at full entitlement. Section 237B(6) says a notice may not be given after the individual becomes actually entitled to all of their benefits under the pension scheme. The trigger is entitlement to everything, not a birthday and not the date you stopped working, so a member who has taken part of their benefits under partial retirement has not closed the door and a member who has taken all of them has.</p>

<p>Voluntary Scheme Pays runs considerably longer, because it is NHSBSA's discretion rather than a statutory right and NHSBSA sets its own outer limit. Its guidance accepts a voluntary SPE2 after retirement provided the form reaches NHS Pensions before the member's 75th birthday. That is a genuinely useful window for anyone who discovers a historic charge after drawing benefits, which the McCloud recalculations have made a real scenario rather than a theoretical one.</p>

<p>The planning point that follows is about sequencing, not about age. If you can see a charge coming in your final working years, get the election in while the statutory right is still alive, because relying on discretion later means relying on terms you do not control. Where you are weighing <a href="/blog/nhs-pension-partial-retirement-doctors-guide">partial retirement</a> in the same tax year as a likely charge, put the election ahead of the retirement decision in your own timeline.</p>

<h2>Scheme Pays, McCloud and tapered years</h2>

<p>Two cross-currents are worth pulling together. First, a <a href="/blog/mccloud-remedy-nhs-pension-doctors-explained">McCloud recalculation</a> can change historic input amounts and therefore historic charges, which can be settled through Scheme Pays within the extended window described above. Second, taper-only charges are voluntary-only, which is why managing the taper in the first place matters so much. One lever there is keeping private income outside pensionable pay where appropriate, which is discussed in our guide to <a href="/blog/private-practice-tax-nhs-and-private-income">private practice tax and NHS and private income</a>, alongside the broader <a href="/blog/nhs-pension-tax-charges-how-to-minimize">charge-reduction toolkit</a>.</p>

<h2>Common mistakes doctors make with Scheme Pays</h2>

<ul>
<li><strong>Missing the 31 July deadline</strong> by assuming it falls the July straight after the tax year, rather than a year later.</li>
<li><strong>Assuming mandatory applies</strong> when the charge is taper-only and NHS input is below £60,000, where only voluntary Scheme Pays is open.</li>
<li><strong>Adding the two input figures together</strong> when testing the mandatory right, when the test runs against each scheme separately.</li>
<li><strong>Treating any late statement as an extension</strong>, when only a revised statement given on or after 2 May in the relevant year moves the deadline.</li>
<li><strong>Leaving the election until after taking all benefits</strong>, by which point the statutory right has gone and only NHSBSA's discretion remains.</li>
<li><strong>Forgetting the charge still goes on the tax return</strong> even when the scheme pays it.</li>
<li><strong>Not modelling the permanent benefit reduction</strong> against the cost of paying the charge in cash before deciding.</li>
</ul>

<h2>How we help doctors with Scheme Pays</h2>

<p>The hard parts of Scheme Pays are rarely the form itself. They are getting the input amount and the charge right, working out which part of a charge is mandatory and which is voluntary, hitting the correct deadline (including the extended limb for revised statements), and sequencing the election ahead of any plan to take all your benefits. We help doctors confirm the figures from the NHSBSA statement, calculate the charge with carry-forward applied, decide between settling in cash and using Scheme Pays by modelling the permanent reduction, and make and where necessary revise the election on time.</p>

<p>We work with consultants, GP partners and salaried GPs across the full <a href="/nhs-pension">NHS pension</a> picture, including the role differences set out in our <a href="/blog/gp-partner-vs-salaried-gp-tax-comparison">GP partner versus salaried GP comparison</a> and the partnership-profit angle in our <a href="/blog/gp-partnership-tax-complete-guide">GP partnership tax guide</a>. You can browse our wider <a href="/blog/nhs-pension-planning">NHS pension planning</a> guides, see how we support <a href="/for-gps">general practice</a>, or <a href="/contact">get in touch</a> to talk through a specific charge.</p>
