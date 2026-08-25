# Research pack — iht-april-2026-bpr-apr-cap-property-impact (E3)

Assembled per `docs/_engines/REWRITE_PROGRAM.md` §9.5, from the frozen `DOSSIER.md` and its named
artefacts only. Cluster: rural / landed-estates (Cluster 5).

## 1. Target and permission level

- **Page:** `Property/web/content/blog/iht-april-2026-bpr-apr-cap-property-impact.md`
  (slug `iht-april-2026-bpr-apr-cap-property-impact`, category "Landlord Tax Essentials").
- **Grade: EXTEND — manager override** (DOSSIER §8, row E3, verbatim): "sub-threshold Bing equity but our
  ONLY Bing surface... additive only, protect every statute query." The mechanical REWRITE_PROGRAM §9.2
  step 5 test (Bing clicks ≥3 OR Bing impressions ≥300 OR Google clicks ≥1 OR Google impressions ≥300)
  is NOT met by this page on the numbers alone (16 rows, 24 total impressions, 0 clicks — see §2); the
  manager overrode the mechanical grade to EXTEND specifically because this is the family's ONLY page
  with any measured Bing presence at all, and REWRITE_PROGRAM §9.2's own EXTEND rule ("Bing returns
  roughly twice Google's clicks... title change is a real risk") governs even at sub-threshold volume
  when it is the sole surface.
- **What may change (ADDITIVE ONLY):** new H2 blocks, new FAQ entries. Nothing else.
- **What may NOT change:** metaTitle, H1, existing H2 order, and **every one of the 16 baseline Bing
  queries below must still match after the edit** (§2). Slug frozen (rewrite-only, never collapse).
- **Revert trigger (DOSSIER §9, E3-specific, stated verbatim):** "any of its 16 baseline Bing queries
  stops matching = revert."
- **Monitored-pages status:** NOT one of the three armed/expiring rows named in DOSSIER §8. Clear to
  extend now (the two rows that DID expire today, 2026-08-21, are `bpr-pure-btl-pawson-...` [E5] and
  `iht-1m-bpr-apr-cap-mixed-trading-...` [a DEFERRED delta-list page, not this one, not E4 either —
  confirmed by exact slug against DOSSIER §8's deferred list]).

## 2. Equity register — the "do not lose this" list

Source: `_bing_page_queries.json`, pulled 2026-08-21, site `propertytaxpartners.co.uk`. This page is the
ONLY one of 11 family URLs checked with any Bing rows at all (`row_count: 16`, `total_impressions: 24`,
`total_clicks: 0`, positions 1.0-10.0). GSC carries no rows for this page (no already-covered entry in
`ledger.csv`).

| # | Bing query (verbatim) | Impr. | Clicks | Avg. pos | Literal substring match in current body? | Topical anchor present? |
|---|---|---:|---:|---:|:---:|:---:|
| 1 | ihta1984 | 3 | 0 | 9.0 | no | **yes** — "IHTA 1984" appears throughout as a spaced citation |
| 2 | ihtm25000 | 2 | 0 | 9.0 | **YES** (visible anchor text "IHTM25000") | yes |
| 3 | ihta 1984 apr relief percentage | 2 | 0 | 6.0 | no | yes — "50%"/"100%" rates + "IHTA 1984" both present, not as one string |
| 4 | bpr april 2026 | 1 | 0 | 9.0 | no | yes — "BPR" and "April 2026" both present, not adjacent |
| 5 | bpr allwaonce 2026/2027 | 1 | 0 | 1.0 | no (typo query — "allwaonce") | yes — "allowance" (correct spelling) present |
| 6 | apr bpr changes april 2026 | 1 | 0 | 10.0 | no | yes — page is entirely about this |
| 7 | bpr eligible, not gwvis | 1 | 0 | 5.0 | no (garbled query, likely "gwvis" = OCR/typo noise) | unclear — flagged, no confident anchor |
| 8 | [full-sentence query, verbatim paste of a summary-style sentence — see note] | 1 | 0 | 10.0 | no (checked; does not literal-match this page's actual `summary:` field wording) | yes — the £2.5m/100%/50%/20%-effective arithmetic it pastes is stated on this page |
| 9 | s124d ihta 1984 | 1 | 0 | 6.0 | no | yes — "s.124D" and "IHTA 1984" both present, not concatenated as "s124d" |
| 10 | when are bpr invalid? trading | 1 | 0 | 9.0 | no | yes — trading-vs-investment eligibility is a page theme (four affected segments) |
| 11 | ihta 1984 schedule 1 | 1 | 0 | 10.0 | no | **unclear — flagged, highest-risk row.** Page cites "FA 2026 Schedule 12 paragraph 4", not "IHTA 1984 Schedule 1"; no obvious topical anchor for "Schedule 1" specifically |
| 12 | apr cap | 2 | 0 | 7.0 | no in rendered copy (a literal-string check hit the internal `editorialNote:` frontmatter field only, which is NOT rendered on the live page — corrected from an initial false positive) | yes — "cap" is the page's central subject |
| 13 | bpr capped at £1m | 2 | 0 | 4.0 | no | yes — the stale £1m framing is extensively discussed (as superseded) |
| 14 | ihta 124(a) (5) (a) | 2 | 0 | 10.0 | no (malformed citation, not a real section reference) | unclear — likely a mis-typed s.124 family reference; s.124D itself is present |
| 15 | new bpr £2.5m pro rata 10 year charge | 2 | 0 | 9.0 | no | yes — 7-year rolling allowance and trust periodic-charge mechanics are both discussed |
| 16 | bpr april | 1 | 0 | 6.0 | no | yes |

**Literal-string result: 1 of 16 true verbatim matches (`ihtm25000`, visible anchor text).** This is
expected and NOT a defect: most of these are informal or misspelled Bing user queries ("allwaonce",
"gwvis", "ihta 124(a) (5) (a)") that Bing itself resolves semantically, not by exact substring — the
equity-preservation floor (REWRITE_PROGRAM §9.9 floor 5) requires each query to be "matchable... in
metaTitle, H1, an H2, an FAQ or body prose," which for typo/fuzzy queries means the underlying **topical
token** (the correctly-spelled statute reference, the correct figure, the correct concept) must survive,
not the literal misspelling. **Two rows are flagged genuinely uncertain** (row 7 "gwvis" and row 11
"Schedule 1") and should get explicit manual attention at QA time rather than an assumed pass — row 11 in
particular has no confident topical anchor today and is the single highest-risk row against the revert
trigger.

**Row 12 correction on record:** an initial bash fixed-string pass returned a false-positive YES for `apr
cap` because it matched only inside the page's internal `editorialNote:` frontmatter field (a pipeline
note, not rendered on the live page: "post-F-102 quantum correction... cap is £2.5m enacted under IHTA
1984 s.124D"). Corrected to "no in rendered copy" above. This is exactly the kind of check the DOSSIER
asks packs to do truthfully rather than assume.

## 3. The market's keyword set — the ADD list (consumer cap phrasings)

The dossier's ADD-list intent for this page (per DOSSIER §2's manager adjudication: "the cap keywords to
`iht-april-2026-bpr-apr-cap-property-impact`") names four phrasings. Checked truthfully against
`ledger.csv` and `_bing_page_queries.json` — **two of four are literal rows in a named source, two are
NOT and are flagged:**

| Named phrasing | Found in a named source? | What actually exists |
|---|---|---|
| `apr bpr changes april 2026` | **YES** — `ledger.csv`: `apr bpr changes april 2026,0,bing,,,assigned,cluster + own impressions`. Also equity-register row 6 above (dual status: both protect AND strengthen). | Use as-is. |
| `apr cap` | **YES** — `ledger.csv`: `apr cap,0,bing,,,already-covered,own impressions`. Also equity-register row 12. | Use as-is; note it is currently only in unrendered frontmatter (§2 row 12), so adding it to a new H2/FAQ genuinely strengthens rather than duplicates. |
| `bpr allowance variants` | **NOT a literal row anywhere.** Nearest actual rows: `bpr allwaonce 2026/2027` (equity row 5, a typo for "allowance") and `new bpr £2.5m pro rata 10 year charge` (equity row 15). Treat "bpr allowance variants" as shorthand for these two, not as a standalone phrase to insert verbatim. | Use the two real rows; do not invent a phrase "bpr allowance variants" that appears nowhere. |
| `2.5 million inheritance tax` | **NOT FOUND** in `ledger.csv`, `_consensus_map_raw.json`, or `_bing_page_queries.json`. `grep -E 'allowance\|2\.5 million\|2,500,000'` against the full ledger returns zero matches. **This phrase could not be derived from the named sources and is flagged as such, per this task's own instruction to report what cannot be derived.** | Do not present this as a sourced keyword. If the writer wants consumer-facing £2.5m language, ground it in house-position §15.4's own wording ("£2,500,000") and the language-spec's rule 5 (convert the cap into an effective rate the reader applies), not in a fabricated keyword row. |

**Verbatim-in-copy for the two real ADD-list rows:** neither `apr bpr changes april 2026` nor `apr cap`
(as a rendered, non-frontmatter string) currently appears in the page body — confirmed by the same check
run for §2. Both are genuine additions, consistent with the EXTEND grade's "add new H2 blocks and FAQ
entries carrying the missing phrasings" instruction (REWRITE_PROGRAM §9.2 EXTEND definition).

## 4. Competitor teardown

DOSSIER §7/§9.10 crawled only saffery.com and oldmillgroup.co.uk/om.uk. No competitor page dedicated
solely to "the cap" beyond what E1's and E2's packs already tear down (saffery's reforms article, W5, is
the closest analogue and is fully torn down in the E1 pack §4 — not repeated here to avoid drift between
packs; cross-reference PACK_maximising-business-relief-to-reduce-inheritance-tax.md §4). Specific to THIS
page's extend-not-rewrite context, the relevant finding is **staleness, not structure**:

- **Old Mill `/business-property-relief-bpr/`** (torn down, `_teardown_notes.md`): the domain's 7th-
  highest owner page by mentions, STILL states the superseded figure as current: "Introduction of a £1
  Million allowance. Effective from 6 April 2026, the 100% BPR rate will be capped at £1 million per
  individual." **Do not copy this framing.** Our page already correctly states £2.5m as enacted and the
  £1m as superseded — the EXTEND should not disturb that, only add consumer-cap phrasings around it.
- **Old Mill `/insight/how-the-recent-changes-to-business-property-relief-bpr-may-impact-you/`** — also
  named in `_teardown_notes.md` as carrying "the same stale £1 million framing... word-for-word in
  places." Same do-not-copy note.
- **Saffery's reforms article (W5)** is CURRENT and its H2 structure (see E1 pack §4) shows the shape a
  cap-specific page can take: "How APR and BPR currently reduce IHT" → "Changes... for individuals" →
  "Changes... for trusts" → "Get in touch." Our page's existing 11-heading structure already covers
  broadly equivalent ground with MORE segmentation (four affected-segment H3s); this is not a structural
  gap, it is a phrasing gap (§3).
- **thp.co.uk `/apr-bpr-changes-2026/`** appears in `_consensus_map_raw.json`'s cluster member list for
  `business property relief` but was NOT crawled in the §9.10 teardown (saffery + oldmill only).
  **Keyword-harvest only — no H2 list available, flagged rather than guessed.**

## 5. Ours, side by side

- **Title:** "April 2026 BPR/APR £2.5m Cap: Property Investor Impact" — **PROTECTED, do not change.**
- **metaTitle:** identical to title — **PROTECTED.**
- **H1:** "April 2026 BPR/APR £2.5 Million Cap: What Changed for Property Investors" — **PROTECTED.**
- **Word count:** 2,593 (measured, prose-only, `_language_spec.md`) — the shortest of our four measured
  pages, and closest to the winner median (1,500).
- **FAQ count:** 13
- **Current heading list (PROTECTED ORDER — 11 total, 7 H2, 4 H3, matches measured "Headings total: 11"):**
  - H2: What changed on 6 April 2026: the cap mechanics
  - H2: Who is actually affected: four segments
    - H3: 1. Farming families with APR-eligible land
    - H3: 2. Property developers with trading work-in-progress
    - H3: 3. Serviced-accommodation operators meeting the Pawson trading bar
    - H3: 4. Mixed estates with both trading and investment elements
  - H2: Who is not affected: pure BTL landlords
  - H2: Worked example: mixed estate with trading business plus BTL
  - H2: Planning responses for affected estates
  - H2: Anti-forestalling rules and the legislative pipeline
  - H2: Common misunderstandings about the cap
- **Measured register:** statute **13.1/1,000** — the LOWEST of the four measured pages, but still far
  above the winner max (0.8). Second person **1.5/1,000** — also the highest of our four (still far below
  the 6+/1,000 adviser target). First person 3.1/1,000. Question-headings 3/11 — again the highest
  fraction of our four pages, consistent with this being the page closest to ranking-grade already.
- **Why this page's own statute density is NOT the thing to fix:** it is precisely what the 15 of 16
  equity-register queries above topically anchor to (IHTA 1984, s.124D, £1m/£2.5m, AIM, trading
  eligibility). Cutting it to the cluster's general 2/1,000 adviser target — the move prescribed for E1
  and E2 — would risk breaking the very equity this pack exists to protect. **This is a page-specific
  override of the general cluster statute-density rule; see §7.6 below.**

## 6. Whitespace — explicitly marked KEEP

- **The four-affected-segment structure** (farming families / developers / serviced accommodation /
  mixed estates) with named £ arithmetic per segment — no winner in the cluster segments its audience
  this precisely. KEEP, and this is exactly where new consumer-cap H2/FAQ content should attach (as
  ADDITIONS alongside, not replacing, the segments).
- **"Who is not affected: pure BTL landlords"** — an explicit negative-case section naming the majority
  reader and telling them the reform does not touch them. `_language_spec.md` P8 records zero comparable
  "who this does NOT affect" sections in any of the 7 winners. KEEP.
- **The Singh-estate worked example** (pre-cap vs post-cap arithmetic on a named mixed estate) — zero
  named worked examples exist across all winners. KEEP.
- **"Common misunderstandings about the cap"** (six named myths, each corrected in one sentence) — no
  winner runs a myth-correction section. KEEP; this is also the natural landing spot for new consumer
  phrasings ("The headline figure is £1m, isn't it?" is already there and IS the consumer-register
  question in miniature).

## 7. Acceptance criteria

1. **Equity preservation — the primary gate for this page (REWRITE_PROGRAM §9.9 floor 5).** All 16
   baseline Bing queries in §2 must remain matchable (topically, per the substring-vs-topical-anchor
   distinction established there) after the edit. Rows 7 (`bpr eligible, not gwvis`) and 11 (`ihta 1984
   schedule 1`) are flagged highest-risk and need explicit manual confirmation at QA, not an assumed
   pass. **Any query that stops matching is a BLOCK per §9.9, named, with the diff line that removed it.**
2. **Additive-only structural constraint.** metaTitle, H1, and the existing 11-heading order (§5) are
   BYTE-IDENTICAL before and after. New content is new H2 blocks appended in a logical position (most
   naturally after "Common misunderstandings" or as new H3s under an existing affected-segment H2, NOT
   inserted between existing headings in a way that changes their order) and/or new FAQ entries appended
   to the existing 13.
3. **New-content register target.** The ADD-list phrasings (§3: `apr bpr changes april 2026`, `apr cap`,
   the two allowance-variant Bing rows) go into the NEW blocks written to the **consumer decision page**
   register (`_language_spec.md` §3 table: second person 15+/1,000, statute 0-1/1,000, question H2s,
   short FAQ block) — NOT the adviser 2/1,000-statute target used for E1/E2/E4/E5. This is because the
   ADD content is explicitly the "consumer layer above the statute layer" (DOSSIER §8 note for E3,
   verbatim) and must not import more statute density onto a page that already has the cluster's second-
   highest statute count.
4. **Existing-content statute density is FROZEN, not targeted.** Unlike every other pack in this cluster,
   this page's current 13.1/1,000 statute density is NOT a defect to correct under the general cluster
   rule (`_language_spec.md` rule 1, cap at 2/1,000) — doing so would directly conflict with equity
   preservation (point 1). State this explicitly at QA time so an automated statute-density check does
   not flag this page as a false failure against the general cluster target.
5. **No statute reference in NEW headings** (`_language_spec.md` rule 3 still applies to anything newly
   added, even though it does not retroactively apply to the protected existing 11).
6. **The four existing §4 floors apply to the new content only:** arithmetic recompute on any new worked
   figures, statute verification at source for any new citation, link resolution, and query-coverage for
   the ADD-list keywords in §3.
7. **House-position fidelity, §15.4** — new content must state £2,500,000, never re-introduce the stale
   £1m as current, and must not contradict the existing "who is not affected: pure BTL" section (§22.1,
   quoted below).

**House-position quotes (verbatim):**
> §15.4: "The enacted figure under IHTA 1984 s.124D(2)(a) is **£2,500,000**... **CRITICAL STALE-PAGE
> WARNING:** The GOV.UK announcement summary... still cites £1 million as of 2026-05-27... Sessions and
> writers must NOT cite that page as authoritative for the cap figure."

> §22.1: "**Pure BTL fails BPR.** *Pawson v HMRC* [2013] UKUT 050 (TCC) is the anchor case... **From 6
> April 2026:** even where BPR applies, **£2.5m combined BPR + APR rolling 7-year allowance**... above-
> allowance relief drops to 50%, giving effective 20% IHT on the above-allowance portion."

## 8. Expectation

**90-day read, Bing 14/28-day directional per DOSSIER §9.** This page's specific extra trigger (DOSSIER
§9, stated verbatim): "any of its 16 baseline Bing queries stops matching = revert." Because Bing
re-crawls in days (REWRITE_PROGRAM §9.6), the 14-28 day Bing read on the NEW additions is the fast signal
here — check specifically whether any new impressions appear on the ADD-list phrasings (`apr bpr changes
april 2026`, `apr cap`) without the 16 existing rows' positions degrading. Success: new impressions on
the ADD-list terms, existing 16 rows stable or improved, page remains the family's only Bing-visible
surface (not replaced by regression to zero). Failure trigger: ANY existing query stops matching at the
first post-edit Bing pull — revert immediately per the DOSSIER-stated trigger, do not wait for the 90-day
window to confirm.
