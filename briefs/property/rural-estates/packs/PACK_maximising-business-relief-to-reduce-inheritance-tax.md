# Research pack — maximising-business-relief-to-reduce-inheritance-tax (E1)

Assembled per `docs/_engines/REWRITE_PROGRAM.md` §9.5, from the frozen `DOSSIER.md` and its named
artefacts only. Nothing outside the dossier is used. Cluster: rural / landed-estates (Cluster 5).

## 1. Target and permission level

- **Page:** `Property/web/content/blog/maximising-business-relief-to-reduce-inheritance-tax.md`
  (slug `maximising-business-relief-to-reduce-inheritance-tax`, category "Landlord Tax Essentials").
- **Cluster:** `business property relief` consensus topic, `_consensus_map_raw.json` — volume 10,110/mo,
  peer-winnable 6,140/mo (re-derived independently below, ties exactly to the dossier figure), 7 domains
  treat it as one page, `assign_score` 0.714.
- **Grade: REFRAME** (DOSSIER §8, work-order row E1). Test per REWRITE_PROGRAM §9.2 step 5: Google
  impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300. Confirmed: `_bing_page_queries.json`
  carries no row at all for this URL (0 of 11 checked pages), and DOSSIER §3 states our equity in the
  whole family is "near-zero: GSC 47 family rows, ZERO clicks, mostly position 37-60."
- **What may change:** metaTitle, H1, H2s, body, FAQ. Full rewrite against the cluster's keyword set.
- **What may not change:** the slug (rewrite-only, never collapse — REWRITE_PROGRAM §5); house-position
  figures (§15.4, §22.1, quoted exactly below); the four §4 deterministic floors are non-negotiable
  regardless of grade.
- **Monitored-pages status:** not listed among the three armed/expiring rows in DOSSIER §8 (`bpr-pure-btl-
  pawson-...`, `iht-1m-bpr-apr-cap-mixed-trading-...`, `serviced-accommodation-tax-fhl-abolition-april-
  2025`). Clear to edit now.
- **Revert path, one line:** REFRAME grade carries 0 equity to lose (no GSC clicks, no Bing rows); revert
  is the standard rewrite-only path — `git revert` to the pre-pack commit / `blog_optimizations.
  content_backup_path` — with no equity-preservation exposure.

## 2. Equity register

**Empty.** `_bing_page_queries.json` (11 URLs checked, 2026-08-21 pull) carries no row for this slug —
it is one of the 8 of 11 family pages returning `row_count: 0`. Ledger.csv carries no GSC or Bing
already-covered row naming this page either. There is nothing to protect on this page; the REFRAME
permission above follows directly from that absence, per REWRITE_PROGRAM §9.2 step 5.

## 3. The market's keyword set

42 keywords, `_consensus_map_raw.json` cluster `business property relief`, cross-joined to `ledger.csv`
for volume / best peer position / peer domain (all rows bucketed `assigned` in the reconciliation ledger,
none excluded or deferred). Sorted by volume descending. Verbatim-in-copy checked truthfully against the
live file (`grep -iF`, whole-file, case-insensitive) 2026-08-21; one false positive from a bash
fixed-string pass is corrected below and flagged.

| Keyword | Vol/mo | Best peer pos | Peer domain | Top-10? | Verbatim in current copy? |
|---|---:|---:|---|:---:|:---:|
| bpr | 1,900 | 4 | saffery.com | yes | **YES** (body, e.g. "BPR" abbreviation used throughout) |
| business property relief | 1,900 | 3 | saffery.com | yes | **YES** (title, H1, metaTitle, body) |
| business relief | 720 | 16 | saffery.com | no | **YES** (title, H1, metaTitle only — not in body prose, which always says "Business Property Relief" in full) |
| business relief inheritance tax | 590 | 17 | rossmartin.co.uk | no | no |
| bpr relief | 320 | 3 | saffery.com | yes | no |
| business property relief inheritance tax | 390 | 17 | rossmartin.co.uk | no | no |
| iht business property relief | 390 | 4 | rossmartin.co.uk | yes | no |
| small business relief | 480 | 15 | taxfix.com | no | no (off-topic homonym — "small business relief" is a business-rates relief, not IHT BPR; flagged, not a genuine miss) |
| business property relief changes | 260 | 3 | saffery.com | yes | no |
| what is bpr | 260 | 4 | saffery.com | yes | no |
| business relief iht | 260 | 22 | rossmartin.co.uk | no | no |
| bpr definition | 210 | 7 | saffery.com | yes | **no** — bash fixed-string check reported a false positive against "BPR definitional explainer" (line 216, a different word); corrected to no on word-boundary re-check |
| bpr meaning | 210 | 14 | saffery.com | no | no |
| definition of bpr | 210 | 11 | saffery.com | no | no |
| business relief investments | 170 | 22 | saffery.com | no | no |
| business relief tax | 140 | 21 | rossmartin.co.uk | no | no |
| business property relief examples | 110 | 7 | rossmartin.co.uk | yes | no |
| bpr iht | 110 | 10 | rossmartin.co.uk | yes | no |
| business relief changes | 110 | 20 | saffery.com | no | no |
| what is business relief | 110 | 18 | saffery.com | no | no |
| bpr changes | 110 | 16 | saffery.com | no | no |
| apr and bpr | 90 | 2 | saffery.com | yes | **YES** (body, "The s.124D allowance is combined across APR and BPR") |
| apr budget | 90 | 28 | saffery.com | no | no |
| bpr inheritance tax | 90 | 5 | saffery.com | yes | no |
| business relief qualifying investments | 90 | 14 | saffery.com | no | no |
| inheritance tax bpr | 90 | 7 | rossmartin.co.uk | yes | no |
| bpr investments | 70 | 19 | saffery.com | no | no |
| changes to agricultural property relief | 70 | 3 | saffery.com | yes | no |
| bpr tax | 50 | 4 | saffery.com | yes | no |
| business property relief on shares | 50 | 3 | saffery.com | yes | no |
| business property relief pitfalls | 50 | 2 | rossmartin.co.uk | yes | no |
| business property relief shares | 50 | 3 | saffery.com | yes | no |
| changes to business property relief | 50 | 2 | saffery.com | yes | no |
| inheritance tax business property relief | 50 | 19 | saffery.com | no | no |
| what is bpr relief | 40 | 5 | saffery.com | yes | no |
| business relief fund | 40 | 28 | saffery.com | no | no |
| business relief funds | 40 | 16 | saffery.com | no | no |
| what qualifies for business property relief | 50 | 2 | saffery.com | yes | no |
| agricultural and business property relief | 20 | — | — | — | no (shared with E2's APR cluster; see note) |
| apr bpr changes april 2026 | 0 | — | — | — | no (Bing-sourced, `ledger.csv` bucket `assigned`/"cluster + own impressions"; the equivalent phrase is the ADD-list item for E3, not E1 — flagged for E3's pack, not duplicated here) |
| business property loan apr | 0 | — | — | — | no (Bing-sourced junk-adjacent match; GSC/Bing "own impressions" note, not a real keyword for this topic — flagged, not dropped silently) |

**Peer-held-top-10 count: 20 of 42 keywords, combined volume 6,140/mo** — re-derived independently from
`ledger.csv` best_peer_pos ≤ 10, and it ties exactly to `_consensus_map_raw.json`'s stated
`peer_winnable: 6140` for this cluster. That tie is a working cross-check, not an assumption.

**Verbatim-in-copy: 4 of 42 keywords true hits** (`bpr`, `business property relief`, `business relief`,
`apr and bpr`), all four in title/H1/metaTitle or a single body sentence, none of them in an H2, none in
an FAQ. 38 of 42 keywords, including 16 of the 20 peer-winnable-top-10 keywords, are absent from the page
entirely. This is the SDLT specimen's finding (REWRITE_PROGRAM §9.5) repeating in this cluster: the page
says "Business Property Relief" and "BPR" but not the market's actual phrasings around it (bpr relief,
bpr meaning, definition of bpr, business property relief changes/examples/pitfalls/shares, iht business
property relief, business property relief inheritance tax).

**Note on `agricultural and business property relief` (20/mo, ideas-sourced, no peer position):** this
keyword sits in both the E1 (`business property relief`) and E2 (`inheritance tax farmers`/APR-variant)
territory. Per REWRITE_PROGRAM §9.3 "one page per consensus topic, not per keyword" / unique assignment,
it is listed here for completeness but not double-assigned; if placed, it belongs naturally in E1's
§199-211 "combined cap and APR competition" section, which already discusses BPR-and-APR jointly.

## 4. Competitor teardown

Named sources only: `_teardown_saffery.json` (saffery.com, §9.10 crawl, 63 pages, 0 fetch failures) and
`_language_spec.md` (measured stats for all winners, including rossmartin, which was NOT crawled in the
§9.10 teardown).

**W1 — saffery.com `/insights/articles/business-property-relief/`** (torn down, `_teardown_saffery.json`
lines 286-353). 45 family-term mentions, owner page rank 3 of 12. Title "Business Property Relief | An
overview"; H1 "Business Property Relief (BPR)". Word count 1,434 (teardown full-page) / 1,238 (language-
spec prose-only, sitewide furniture stripped). 29 tracked keywords, 15 top-10, best p2. No table, no
calculator, no FAQ block (`has_table`/`has_calculator`/`has_faq_block` all false).
- H2/H3 list (`h2_h3`, verbatim):
  - H2: What is Business Property Relief?
  - H2: Who qualifies for Business Property Relief (BPR)?
  - H2: Relevant business property
    - H3: Business Property Relief examples
    - H3: Excepted assets
    - H3: Debts
    - H3: Clawbacks
  - H2: APR and BPR
  - H2: More on Business Property Relief
  - H2: Get in touch
  - H2: Latest Insights
- Statute density 0.0/1,000 words (measured, `_language_spec.md` W1 row) — zero section numbers, zero
  case-law citations, across 1,238 prose words. Direct address ("you") 6.5/1,000, first person 3.2/1,000.
- Staleness check (`_teardown_notes.md`): CURRENT on the £2.5m figure (own £1m-vs-£2.5m staleness hit
  context confirms it cites the enacted quantum, framed as a Dec-2025 revision).

**W5 — saffery.com `/insights/articles/agricultural-property-relief-and-business-property-relief-
reforms-from-6-april-2026/`** (torn down, lines 96-159). "apr and bpr" p2. 1,722 words (teardown) / 1,500
(language-spec prose). 18 pound figures, 15 percentage figures — the highest of any measured winner.
- H2/H3 list (verbatim):
  - H2: How APR and BPR currently reduce inheritance tax
  - H2: Changes to APR and BPR from 6 April 2026 for individuals
    - H3: Actions to consider
  - H2: Changes to APR and BPR for trusts
    - H3: £2.5 million allowance
    - H3: IHT charges
    - H3: Actions to consider
  - H2: Get in touch
  - H2: Latest Insights
- Staleness hits recorded: cites £2.5m combined allowance, transferable to £5m between spouses, correctly
  current per `_teardown_notes.md`'s domain-wide verdict ("CURRENT... 11 distinct Saffery pages carry a
  £2.5m reference").

**W3 — rossmartin.co.uk `619-business-property-relief-iht`.** **Not in the §9.10 teardown scope**
(DOSSIER §7: only saffery.com and oldmillgroup.co.uk/om.uk were crawled). No H2/H3 list is available from
a named source — stating one would be guessing, which the dossier's own discipline forbids. What IS
measured, from `_language_spec.md` W3 row: 33 tracked keywords, 8 top-10, best p2; 795 words, mean
sentence 21.4, Flesch 43.0; **0/0 question-headings** — the language spec records this page as having
"zero headings... bold run-in labels inside `#maincenter` rather than heading elements," so its
heading structure is real but not HTML-heading-comparable, and it is excluded from heading medians on
that stated basis. "You" 2.5/1,000, "we" 1.3/1,000, statute 0.0/1,000, jargon 0.0/1,000, 1 table, no FAQ.
`_language_spec.md` §4 also flags rossmartin's pattern explicitly as **do not copy the paywall move**: it
repeatedly stops at "See IHT Business Property Relief" / "Subscribers, click here," which works only
because rossmartin has a subscription product behind it — irrelevant to this page.
**Keyword-harvest only for structure; do not attribute an invented H2 list to this domain.**

## 5. Ours, side by side

- **Title:** "Maximising Business Relief to Reduce Inheritance Tax"
- **metaTitle:** "Maximising Business Relief to Reduce Inheritance Tax" (identical to title)
- **H1:** "Maximising Business Relief to Reduce Inheritance Tax" (identical to title and metaTitle)
- **Word count:** 2,837 (measured, prose-only, `_language_spec.md`)
- **FAQ count:** 12
- **Current heading list** (19 total: 8 H2, 11 H3 — matches the measured "Headings total: 19"):
  - H2: The s.124D £2.5m rolling 7-year allowance
    - H3: AIM and the separate 50% sub-tier
    - H3: Anti-forestalling and the 30 October 2024 trigger
    - H3: Trust anti-fragmentation
  - H2: The Pawson investment gate
  - H2: The Holloway-portfolio worked example
    - H3: Status quo at death (no planning)
    - H3: Lever 1: lifetime CLT of trading shares into discretionary trust
    - H3: Lever 2: AIM 50% sub-tier captured at death
    - H3: Lever 3: extract non-trade assets (excepted-assets discipline)
    - H3: Lever 4: avoid the binding-contract-for-sale gateway
  - H2: Secondary levers
    - H3: Inter-spouse clock preservation (s.108)
    - H3: Post-death deed of variation (s.142)
    - H3: Replacement-property planning (s.107)
  - H2: The FIC trap
  - H2: The combined cap and APR competition
  - H2: Where to read next
  - H2: The bigger picture
- **Measured register** (`_language_spec.md` §1 table): statute 20.1/1,000 words, jargon 6.3/1,000 —
  **the single most extreme adviser register of our four measured pages in this cluster**. Second person
  ("you") 0.4/1,000, first person ("we") 2.5/1,000. Question-headings 0/19 — zero of nineteen headings
  are questions, thirteen of them contain a section number (`_language_spec.md` P3).
- **First sentence** (P1 test): "For property owners the very first question on Business Property Relief
  is whether any of the property even qualifies." Answer-first-ish but the true H1-matching claim ("the
  answer for pure buy-to-let is no") arrives in sentence two, not sentence one.

## 6. Whitespace — explicitly marked KEEP

- **The Holloway-portfolio worked example** (§92-176 of the live file): a named persona, a real £3.8m
  mixed estate, four sequenced planning levers each with recomputed arithmetic (£360k baseline IHT,
  £322k trust-growth saving, £100k AIM saving, £61.3k net excepted-assets saving, £800k s.113 exposure
  avoided). `_language_spec.md` P8 records **zero named worked examples across all 7 winners' 10,827
  words of prose**. This is genuine, uncontested whitespace — KEEP, do not thin it to make room for the
  plain-language layer.
- **The four-lever planning architecture** itself (2-year hold, excepted assets, CLT+s.260 holdover,
  s.113 gateway) — no winner names more than one lever in passing. KEEP.
- **The FIC trap section** — directly rebuts a live marketing claim ("wrap the BTL in a FIC and get
  BPR") that no competitor page addresses head-on. KEEP.

## 7. Acceptance criteria

Deterministic and gate-checkable, per REWRITE_PROGRAM §4 and §9.9:

1. **Query-coverage floor.** All 42 cluster keywords from §3 above are the target-query set for
   `track2_query_coverage.py`. The 20 peer-winnable-top-10 keywords (6,140/mo combined) are the priority
   placement set — metaTitle/H1/H2/FAQ first, body as backstop.
2. **Equity preservation:** N/A — the equity register (§2) is empty. Nothing to lose.
3. **Cluster coverage floor.** Every one of the 42 assigned keywords is placed or explicitly declined
   with a stated reason (e.g. `small business relief` — off-topic homonym, correctly excluded from
   placement even though it is in the cluster's raw keyword list).
4. **Reconciliation balance:** unaffected by this single-page pack; the cluster-wide ledger balance is
   DOSSIER's responsibility (§4), already stated BALANCED.
5. **Competitor re-read.** Every H2/H3 theme in §4 above (W1 saffery BPR, W5 saffery reforms, and the
   keyword-harvest-only rossmartin signal) is marked covered / deliberately-declined-with-reason /
   belongs-to-another-page. Zero undecided.
6. **Statute-density target (cluster-specific, `_language_spec.md` §3/§5 rule 1).** Adviser-reference
   pages cap statute references at **2 per 1,000 words** (winner median 0.0, winner maximum 0.8); this
   page currently measures **20.1 per 1,000**, the most extreme of the four measured pages. Second
   person must rise from the current **0.4/1,000** to **6 or above per 1,000** (adviser-register target;
   `_language_spec.md` §3 table, "Adviser reference pages" row). Move case-law citations (currently 20
   pound figures / 28 percentage figures / **20 case-law citations** per the secondary-counts table) out
   of prose into a single reference line or a linked sibling per rule 2 (at most one case-law citation
   per page, only where the case IS the answer — Pawson can stay named here since the page is partly
   about the Pawson gate; Green/Vigne/McCall/McKenna move to sibling pages or come out).
7. **No statute reference in any heading** (`_language_spec.md` rule 3). Currently 13 of 11+8=19 headings
   across this page and the APR sibling carry a section number per the language spec's cross-page count;
   this page's own headings do not currently carry section numbers in the H2/H3 text itself (they use
   plain-language labels like "The Pawson investment gate"), so this floor is already close to met —
   confirm on rewrite, do not introduce new ones.
8. **First sentence answers the query** (`_language_spec.md` rule 4 / P1). Do not open on a meta-argument
   about other content or a corpus cross-reference.
9. **The four existing §4 floors** (arithmetic recompute on the Holloway worked example, statute
   verification at source for every cited section against legislation.gov.uk, link resolution via
   `slug_resolver.py`, and the query-coverage floor in point 1) all apply unchanged.
10. **House-position fidelity.** §15.4 figures (below) must not drift: £2,500,000 (not £1m), rolling
    7-year allowance, AIM 50% separate sub-tier NOT consuming the allowance, anti-forestalling from 30
    October 2024, per-individual not per-couple. §22.1: pure BTL fails BPR via Pawson, unaffected by the
    April 2026 cap.

**House-position quotes (verbatim, `docs/property/house_positions.md`):**
> §15.4: "From **6 April 2026**, the previously unlimited 100% rate of Business Property Relief and
> Agricultural Property Relief is replaced by a combined 100% relief allowance. The enacted figure under
> IHTA 1984 s.124D(2)(a) is **£2,500,000**, available as a **rolling 7-year allowance**... Below the
> allowance: 100% relief... Above the allowance: 50% relief on the excess, producing an effective IHT
> rate of 20% on the qualifying value above the cap... AIM-listed shares... operate as a **separate 50%
> sub-tier** and do not consume the allowance."

> §22.1: "**Pure BTL fails BPR.** *Pawson v HMRC* [2013] UKUT 050 (TCC) is the anchor case: passive rent
> collection from residential lettings is 'mainly investment', caught by s.105(3) IHTA 1984. BPR does NOT
> apply."

## 8. Expectation

Stated before the work, per DOSSIER §9. This is a **90-day read, not 28** (IHT-planning intent converts
slowly; Bing 14/28-day reads are directional only). Success: impressions appearing on the named
consensus-cluster keywords in §3 (particularly the 20 peer-winnable-top-10 terms, 6,140/mo combined) and
this page's position moving inside p30 on the `business property relief` head terms. Cluster-wide honest
failure trigger (DOSSIER §9, unchanged): if the consumer-register family has not moved inside p30 by the
90-day read across the cluster, the wedge thesis is wrong and the cluster stops at what is built. Per-
page revert trigger: none needed (0 equity to protect); if the rewrite measurably fails to gain any
impressions on the 20 peer-winnable-top-10 terms by the 90-day read, that is the signal to re-diagnose
rather than iterate blind.
