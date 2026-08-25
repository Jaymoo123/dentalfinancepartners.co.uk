# PACK inheritance-tax-on-farms (N1, rural/landed-estates cluster)

Net-new page pack, assembled 2026-08-21 from `briefs/property/rural-estates/DOSSIER.md` (frozen
scope) and its named source files. Nothing outside the dossier's frozen scope is added. Follows
`docs/_engines/REWRITE_PROGRAM.md` §9.5, 8 sections in reading order.

## 1. Target and permission level

- **Page:** NET-NEW, slug **`inheritance-tax-on-farms`** (fixed, do not vary)
- **URL:** `/blog/property-types-and-specialist-tax/inheritance-tax-on-farms`
- **Category:** `property-types-and-specialist-tax` (confirmed live category, existing hub page,
  used by 24+ other posts — this is a real category, not a new one)
- **Middleware map entry required.** Add to `SLUG_TO_CATEGORY_MAP` in `Property/web/src/middleware.ts`
  ahead of the page landing (dynamicParams=false 404s the route until both the map entry and the
  content file exist):
  ```ts
  // --- Rural/landed-estates cluster (2026-08-21): N1-N3 net-new consumer pages.
  "inheritance-tax-on-farms": "property-types-and-specialist-tax",
  // --- end rural-estates block ---
  ```
- **Grade:** NET-NEW. Full freedom on structure, headings, length within the register band below.
  No protected elements, no existing copy to preserve.
- **Fixed constraints (do not vary):** the slug above; the category above; zero em-dashes; UK
  English; no PropertyTaxPartners pricing on page (standing rules, `_language_spec.md` §5).
- **Revert path:** this is a new URL with no prior equity — a failed page is deleted or redirected,
  never a partial-content risk to an existing page. No revert mechanics needed beyond normal
  monitored_pages deregistration.
- **Cluster:** rural/landed-estates (Cluster 5, coverage programme). Dossier work-order row **N1**:
  "farm-IHT consumer head page ... consumer register, answers 'will my family farm pay IHT', cap
  arithmetic worked" (DOSSIER.md §8).

## 2. Equity register

**ZERO.** This is a net-new page. No prior Google or Bing equity exists on this URL — nothing to
protect, nothing to lose. (For contrast: the cluster's one Bing-visible page,
`iht-april-2026-bpr-apr-cap-property-impact`, earns 16 statute-shaped queries at pos 6-9 — that
equity belongs to E3, not this page, and E3's pack carries its own protect list.)

## 3. The market's keyword set

Source: `ledger.csv` (2026-08-21 harvest, uncapped, no volume floor, per §9.7). All rows below are
`bucket=assigned`, tagged `net-new queued`, and are the farm/farmer/farming + inheritance-tax
consumer-head family — excluding the APR-token family (routes to E2:
`agricultural-relief-for-inheritance-tax-key-benefits`), the BPR-token family (routes to E1:
`maximising-business-relief-to-reduce-inheritance-tax`), and the farm-tax-overview family (routes
to N2). **Verbatim-in-our-copy: no, for every row** (net-new page, no existing copy).

| Keyword | Vol/mo | Best peer pos | Peer domain |
|---|---:|---:|---|
| farmers inheritance tax | 4,400 | p50 | saffery.com |
| inheritance tax farmers | 4,400 | p51 | saffery.com |
| farming inheritance tax | 2,900 | p35 | saffery.com |
| farms and inheritance tax | 2,900 | p38 | saffery.com |
| inheritance tax and farms | 2,900 | p28 | saffery.com |
| inheritance tax farm | 2,900 | p31 | saffery.com |
| inheritance tax farmland | 2,900 | p36 | saffery.com |
| uk farm inheritance tax | 1,300 | p27 | saffery.com |
| uk farming inheritance tax | 1,300 | p40 | ukpropertyaccountants.co.uk |
| farm inheritance tax uk | 480 | p33 | saffery.com |
| farmer inheritance tax uk | 480 | p51 | ukpropertyaccountants.co.uk |
| farmers inheritance tax uk | 320 | p43 | ukpropertyaccountants.co.uk |
| farm inheritance tax changes | 260 | p44 | ukpropertyaccountants.co.uk |
| farming inheritance tax changes | 260 | p44 | ukpropertyaccountants.co.uk |
| farmer iht | 210 | p29 | saffery.com |
| farming iht | 210 | p31 | saffery.com |
| farms iht | 210 | p32 | saffery.com |
| farm iht | 210 | p34 | rossmartin.co.uk |
| farmers inheritance tax explained | 210 | p61 | ukpropertyaccountants.co.uk |
| iht farmers | 110 | p30 | saffery.com |
| inheritance tax on farms uk | 110 | p33 | saffery.com |
| inheritance tax farmers uk | 90 | p51 | ukpropertyaccountants.co.uk |
| farm land inheritance tax | 70 | p10 | saffery.com |
| iht farm | 70 | p31 | saffery.com |
| iht farming | 70 | p28 | saffery.com |
| iht farmland | 70 | p12 | rossmartin.co.uk |
| iht farms | 70 | p36 | saffery.com |
| iht on farms | 70 | p32 | saffery.com |
| inheritance tax on farm land | 70 | p29 | saffery.com |
| farm inheritance tax calculator | 70 | p40 | ukpropertyaccountants.co.uk |
| inheritance tax on farmers | 70 | p52 | ukpropertyaccountants.co.uk |
| inheritance tax for farmers uk | 50 | p29 | saffery.com |
| uk farmers inheritance tax | 40 | — | ideas source, no position data |
| inheritance tax for farmers explained | 10 | — | ideas source, no position data |
| inheritance tax on farmers uk | 10 | — | ideas source, no position data |

**Peer-held-top-10 count: 0 of 34** for the deliberately-named head terms in DOSSIER.md §3 (the
4,400/2,900-volume group). **Caveat, stated not buried:** two rows in this table are NOT nobody's —
`farm land inheritance tax` (saffery p10) and `iht farmland` (rossmartin p12) sit at or near a
top-10 slot. Write for the head family honestly: the dossier's "nobody holds top-10" claim is true
for the named 4,400/2,900/1,300-volume heads, not for every row in this table.

**Excluded from this table (routed elsewhere, not this page's job):** `agricultural property
relief`, `agricultural relief` and its variants, `inheritance tax on agricultural land` (p5,
saffery — APR-coded, routes E2); `bpr`, `business property relief` and its variants (routes E1);
`farm tax`, `farm taxes`, `farming taxation`, `tax for farmers`, `taxation of farmers` (routes N2);
`how to avoid inheritance tax on farms` (routes N3 — see that pack). News-cycle rows (`keir starmer
farmers inheritance tax`, `farmers budget`, `labour farm inheritance tax` etc) are excluded per
DOSSIER.md §2 screening, not renewed here.

## 4. Competitor teardown extracts

Per task scope: saffery's two governing pages for this cluster, both fetched 2026-08-21, 0 fetch
failures (`_teardown_saffery.json`, `_teardown_notes.md`).

**Saffery — `/insights/articles/agricultural-property-relief/`** (the single strongest adviser-register
page in the cluster: 63 family-term mentions, saffery's #1 owner page)
- Title: "Agricultural Property Relief | A Guide for Landowners | Saffery"
- H1: "Agricultural Property Relief"
- Word count: 1,718
- H2/H3 list: What is Agricultural Property Relief? / Agricultural Property Relief exclusions /
  Does a farmhouse qualify for Agricultural Property Relief? / Environmental schemes /
  Diversification issues / Grazing licence / Agricultural value / Business Property Relief
  (H3: Debts, H3: Clawbacks) / Agricultural Property Relief – a summary / Get in touch / Latest
  Insights
- Tables: none. Calculator: none. FAQ block: `has_faq_block` false per teardown JSON detector —
  contradicts `_language_spec.md`'s W2 row, which records "FAQ: yes" for this same URL. Flagged,
  not resolved: two named sources disagree on FAQ presence; do not assume either without a fresh
  check at write time.
- Best position: p4 on `agricultural property relief` (1,000/mo); **p50 on `farmers inheritance
  tax`** (4,400/mo) — this is the single data point the dossier's whole N1 thesis rests on: saffery's
  strongest page in the family loses the largest-volume consumer query by 46 places.

**Saffery — `/insights/articles/agricultural-property-relief-and-business-property-relief-reforms-from-6-april-2026/`**
(the dedicated reforms article; holds p2 on `apr and bpr`)
- Title: "Agricultural Property Relief and Business Property Relief reforms from 6 April 2026 |
  Saffery"
- H1: "Agricultural Property Relief and Business Property Relief reforms from 6 April 2026"
- Word count: 1,722
- H2/H3 list: How APR and BPR currently reduce inheritance tax / Changes to APR and BPR from 6
  April 2026 for individuals (H3: Actions to consider) / Changes to APR and BPR for trusts (H3: £2.5
  million allowance, H3: IHT charges, H3: Actions to consider) / Get in touch / Latest Insights
- Tables: none. Calculator: none. FAQ block: false (teardown JSON).
- Currency: **CURRENT** on the £2.5m cap (verified in `_teardown_notes.md` staleness check) — this
  page is not the wedge; its register is.

**Measured register data for both pages** (source: `_language_spec.md`, not the teardown JSON —
cited separately because it measures prose stats the teardown JSON does not):
- APR page (W2): 25.4 words/sentence, Flesch 38.5, 2/11 question-shaped headings, **1.3 "you" per
  1,000 words**, 0.6 statute refs/1,000 words.
- Reforms page (W5): 25.1 words/sentence, Flesch 43.7, 1/7 question headings, **1.3 "you" per 1,000
  words**, 0.0 statute refs/1,000 words, highest pound-figure density of any winner (18 per page).

**Do-not-copy contrast, named per `_language_spec.md` §4 (not re-torn-down here, cited as measured
finding only):** Old Mill's evergreen `/business-property-relief-bpr/` page states, as current law,
*"Introduction of a £1 Million allowance. Effective from 6 April 2026, the 100% BPR rate will be
capped at £1 million per individual."* (`_teardown_notes.md`, staleness check section). This is
wrong against house_positions §15.4. landlordzone.co.uk carries the same superseded £1m as a flat
statement of enacted law (`_language_spec.md` §4, B3). Never cite either as a source; both are named
do-not-copy examples of the exact error this page corrects.

## 5. Ours, side by side

n/a — net-new page, no existing copy. Our three nearest existing pages in the family, so the writer
differentiates instead of duplicating:

| Slug | Current title |
|---|---|
| `agricultural-relief-for-inheritance-tax-key-benefits` | "Agricultural Property Relief for Inheritance Tax: The Qualification Gate and the £2.5m Cap from April 2026" |
| `iht-april-2026-bpr-apr-cap-property-impact` | "April 2026 BPR/APR £2.5m Cap: Property Investor Impact" |
| `maximising-business-relief-to-reduce-inheritance-tax` | "Maximising Business Relief to Reduce Inheritance Tax" |

All three are adviser-register pages (statute density 13.1-20.1/1,000 words, "you" 0.0-1.5/1,000 —
`_language_spec.md` §1). This page is the consumer-register counterpart: it answers "will my family
have to pay, how much, what do I do now" in plain language, then **links to these three** for the
reader who wants the mechanics (qualification gate → E2, the cap arithmetic in adviser depth → E3,
the wider BPR relief → E1). Do not restate their statute-level detail here; link out to it.

## 6. Whitespace

What no competitor covers, and what none of our own pages currently do in this register
(`_language_spec.md` §3, §5):

- **The £2.5m arithmetic converted into an effective rate, in consumer language, in the first
  screen.** No tracked domain does this correctly with current figures (W6/taxaccountant does the
  conversion but with the wrong, superseded number).
- **A worked example with a real farm value**, run through 100% below / 50% above, ending on the
  effective-20%-on-the-excess framing — zero named worked examples exist anywhere in the winner set
  (`_language_spec.md` P8).
- **The couples/transferability figure stated as a single pound number** the reader can hold onto.
- **The anti-forestalling date (30 October 2024) explained in plain terms** — "gifts made after this
  date still count if you die after 6 April 2026 and within 7 years" — no winner states this as
  reader-facing guidance; saffery's W5 page touches it once, adviser-register.
- **The honest "probably nothing changes" answer** for the majority of readers below the allowance —
  every winner assumes the reader is already worried; none tells the unworried reader they can stop
  reading early.
- **The gov.uk-still-wrong warning as a stated fact, not an editorial aside** (see §7 below) — this
  is differentiation the market doesn't have, because the market doesn't check gov.uk against
  legislation.gov.uk.

## 7. Acceptance criteria

Deterministic, gate-checkable at QA:

1. **Register** (per `_language_spec.md` §3, consumer-head row): 20+ second-person address per
   1,000 words, **0 statute references in prose** (count section numbers, Act names, Schedule refs,
   HMRC manual codes together — the spec's counting rule), 700-1,600 words, at least half of H2s
   phrased as complete reader questions.
2. **Named keywords placed**: at minimum `farmers inheritance tax`, `inheritance tax farmers`,
   `farming inheritance tax` appear verbatim in metaTitle/H1/an H2/FAQ/body (not all four
   necessarily in every field — spread across the page per normal on-page practice). A majority of
   the 34 keywords in §3 appear naturally somewhere in body or FAQ.
3. **Figures, exact, from house_positions.md §15.4** (do not paraphrase into a different number):
   £2,500,000 combined 100% relief allowance (IHTA 1984 s.124D(2)(a), FA 2026 Sch 12 para 4, in
   force 6 April 2026); 100% below the allowance; 50% above it, i.e. **effective 20% IHT** on the
   value above the cap; **anti-forestalling from 30 October 2024** (lifetime transfers on or after
   that date are caught if the donor dies on or after 6 April 2026 and within 7 years — pre-30-Oct-2024
   gifts are NOT caught even on a post-6-April-2026 death); AIM shares as a **separate 50% sub-tier
   that does not consume the allowance**.
4. **Couples figure**: up to £5m combined for a couple, presented as arithmetic (2 × £2.5m, each
   spouse's unused allowance transfers to the survivor, mirroring the TNRB mechanic) — this exact
   quantum is not spelled out verbatim in house_positions §15.4 itself; it is the direct arithmetic
   consequence of the per-person £2.5m figure that IS locked there, corroborated by saffery's own
   verified quote in `_teardown_saffery.json` ("a combined allowance of up to £5 million"). State it
   as derived, not as an independent locked fact.
5. **Do-not-cite gate**: the page must NOT cite or link the GOV.UK announcement-summary page at
   `.../summary-of-reforms-to-agricultural-property-relief-and-business-property-relief` (F-102,
   house_positions §15.4 — that page still shows £1m as of the last verification and was never
   updated post-enactment). If the page names gov.uk's staleness as a fact (recommended per §6
   whitespace), it must do so without linking the stale page, and must cite `legislation.gov.uk`
   IHTA 1984 s.124D as the authority instead.
6. **Do-not-write list respected** (house_positions §15.4 verbatim): never "BTL qualifies for BPR
   after the April 2026 reforms" (§22.1 Pawson still applies — see whitespace note below); never
   "the £2.5m allowance applies separately to BPR and APR" (combined); never "AIM relief is
   unaffected" (rate drops to 50%, does not consume the allowance); never "pre-announcement gifts
   are caught"; never "each new same-settlor trust gets its own allowance" (false from 30 Oct 2024);
   never "the cap is £1 million".
7. **Zero em-dashes, UK English, no pricing** (standing rule).
8. **Middleware map entry present** in `Property/web/src/middleware.ts` before or with the content
   commit, per §1 above.
9. **All four §4 floors** (arithmetic, statute, links, coverage) per the standard pack acceptance
   pattern: arithmetic checked against §15.4's exact figures; statute count at 0 in prose; internal
   links present to the three §5 sibling pages plus (once built) the P1 `/landed-estates` pillar and
   T1 calculator; the named keyword coverage from point 2.

## 8. Expectation + failure trigger

- **90-day read, not 28** (DOSSIER.md §9 — IHT-planning intent converts slowly; Bing 14/28-day reads
  are directional only).
- **Success:** impressions appearing on the named consumer-register family in §3, and this page (or
  the cluster as a whole) moving the `farmers inheritance tax` / `inheritance tax farmers` pair
  inside p30 — the head pair currently sits at p50/p51 held by saffery's *adviser*-register page, not
  by any consumer-register page at all.
- **Page-level failure trigger:** if this page shows **zero impressions on the named keyword family**
  (§3) by the 90-day read, the page failed. This is stricter than the cluster-wide trigger in
  DOSSIER.md §9 (which triggers cluster-stop only if the WHOLE consumer-register family fails to
  move inside p30) — this page can fail individually without stopping the cluster, since N2 and N3
  are independent bets on the same thesis.
