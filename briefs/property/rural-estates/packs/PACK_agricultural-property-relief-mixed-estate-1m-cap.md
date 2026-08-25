# Research pack — agricultural-property-relief-mixed-estate-1m-cap (E4)

Assembled per `docs/_engines/REWRITE_PROGRAM.md` §9.5, from the frozen `DOSSIER.md` and its named
artefacts only. Cluster: rural / landed-estates (Cluster 5).

## 1. Target and permission level

- **Page:** `Property/web/content/blog/agricultural-property-relief-mixed-estate-1m-cap.md`
  (slug `agricultural-property-relief-mixed-estate-1m-cap`, category "Property Types & Specialist Tax" —
  note this is the only pack in this cluster whose page sits in a different category than the other four).
- **Grade: REFRAME** (DOSSIER §8, row E4). Test: `_bing_page_queries.json` `row_count: 0` for this URL.
  0 equity.
- **What may change:** metaTitle, H1, H2s, body, FAQ.
- **What may NOT change:** **the slug stays `...-mixed-estate-1m-cap` despite the "1m" reading stale
  next to the body's £2.5m content** — DOSSIER §8 states this explicitly: "body correct, slug stays (no
  redirects, standing never)." This is the same rewrite-only discipline as E2's slug collision, applied
  here to a self-inflicted stale-looking slug rather than a competitor collision.
- **Distinguishing fact for this pack (important, unlike E1/E2/E3): the title, metaTitle and H1 ALREADY
  lead with £2.5m, not £1m** — confirmed by direct read of the live file: title "Agricultural Property
  Relief and the £2.5m Cap: Planning for Mixed Estates", metaTitle "APR and the £2.5m Cap: Mixed Farm,
  BTL and Trading Estates", H1 identical to title. **The task's framing ("title/H1 lead with the £2.5m so
  SERP snippet contradicts the stale slug") is therefore already TRUE today, not a change to be made** —
  the pack's job is to confirm this holds through any rewrite and strengthen the body's whitespace, not
  to newly invent the £2.5m-leading title.
- **Monitored-pages status:** not in DOSSIER §8's armed/expiring list (that list's second entry,
  `iht-1m-bpr-apr-cap-mixed-trading-...`, is a DIFFERENT, DEFERRED delta-list page per DOSSIER §8's own
  deferred-list naming — confirmed by exact slug comparison, not this page). Clear to edit now.
- **Revert path:** REFRAME, 0 equity — standard rewrite-only revert.

## 2. Equity register

**Empty.** `_bing_page_queries.json` row_count 0. No GSC already-covered row in `ledger.csv`. Nothing to
protect.

## 3. The market's keyword set

**This page has ZERO dossier-assigned keywords.** Checked exhaustively against both named keyword
sources: `grep` for "mixed" and "allocation" against `ledger.csv` (243 rows) returns no matches; the same
terms do not appear as a cluster name, member, or keyword anywhere in `_consensus_map_raw.json`'s 10
clusters. This is consistent with, not contrary to, DOSSIER §8's own work-order table: E4's "Prize"
column reads "mixed-estate allocation" with **no volume figure** — unlike E1 (10,110/6,140), E2 (APR
family "1,000 + variants"), and E3 ("cap family") which all carry a stated number. E4 is the one REFRAME
row in this cluster the dossier never claimed a keyword prize for.

**The task brief for this pack instructed "keywords: mixed estate + allocation phrasings from ledger +
APR tail." Reported truthfully: the "mixed estate + allocation phrasings" half does not exist in either
named source — flagged as not derivable, per this task's own instruction to report what could not be
found, rather than invented.**

**On the "APR tail":** the same 16-keyword APR-variant set derived for E2's pack (`agricultural property
relief`, `agricultural relief`, etc., ~2,430/mo, 9 peer-winnable at 2,000/mo — see
`PACK_agricultural-relief-for-inheritance-tax-key-benefits.md` §3 for the full table) is the only
candidate "APR tail." **It is NOT re-assigned to this page.** REWRITE_PROGRAM §9.3 states unique
assignment explicitly: "one page per consensus topic, not per keyword... without it, four topics all
'match' the same page and the map lies." Those 16 keywords are already assigned to E2 in the
reconciliation ledger; listing them again here as E4's target-query set would double-count against
DOSSIER §4's BALANCED ledger. **This page's job, per its own work-order note and the task brief's own
framing ("the mixed-estate allocation worked example... is the whitespace nobody else covers"), is
differentiation and depth, not keyword capture.** No query-coverage floor target is set for this page
beyond what it may pick up incidentally from shared cluster vocabulary (£2.5m, cap, allowance) that is
not itself a tracked keyword.

## 4. Competitor teardown

**No competitor page in either named source treats "mixed-estate BPR/APR allocation" as its own topic.**
This absence IS the whitespace signal the task brief describes, not a gap in the research. Checked:
`_consensus_map_raw.json`'s 10 clusters (none named "mixed estate" or "allocation"); `_teardown_saffery.
json`'s 63 pages and `_teardown_oldmill.json`'s scope per `_teardown_notes.md` (neither firm runs a
dedicated allocation-arithmetic page — `_teardown_notes.md` states plainly: "Neither domain uses a
calculator/interactive tool or an FAQ block on any crawled rural/IHT page — this cluster's competitor set
is text-and-narrative content, not tool-shaped, on both sides").

The nearest teardown-covered content is the general BPR/APR pages already fully torn down in the E1 and
E2 packs (saffery's BPR article, APR article, and reforms article — cross-reference those packs' §4
rather than repeating the H2 lists here). Two of those DO briefly gesture at allocation:
- Saffery APR article (W2, teardown H2 "Business Property Relief" section) touches the APR/BPR
  interaction but does not walk a three-asset allocation arithmetic.
- Saffery reforms article (W5) has an H3 "£2.5 million allowance" but frames it at the single-relief
  level, not the multi-asset-class allocation level this page's Lambert-estate worked example covers.

**Old Mill's stale BPR page** (`/business-property-relief-bpr/`, `_teardown_notes.md`) remains the
relevant do-not-copy example for this page specifically: its stale £1m framing is exactly the error the
Lambert worked example in our own page demonstrates the CONSEQUENCE of getting wrong (a mixed estate that
is genuinely non-cap-exposed under the correct £2.5m figure would show as wrongly cap-exposed under Old
Mill's stale £1m framing). This is a direct, citable contrast our page already exploits (see §6).

## 5. Ours, side by side

- **Title:** "Agricultural Property Relief and the £2.5m Cap: Planning for Mixed Estates" — already
  £2.5m-leading (see §1).
- **metaTitle:** "APR and the £2.5m Cap: Mixed Farm, BTL and Trading Estates"
- **H1:** "Agricultural Property Relief and the £2.5m Cap: Planning for Mixed Estates" (identical to
  title)
- **Word count:** **not in `_language_spec.md`'s measured sample** — the language pass measured only
  four of our pages (cap-impact, APR key-benefits, maximising-BPR, Pawson), explicitly stated as "our
  four pages" throughout that document. This page (E4) was NOT one of them. An approximate count, taken
  directly from the live file body (frontmatter stripped, HTML tags stripped, asides/CTA blocks NOT
  separately excluded — so this is a rougher method than the language spec's and not directly comparable
  to the four measured pages' figures): **~3,102 words.**
- **FAQ count:** 12 (`faqs:` frontmatter block, counted directly from the file)
- **Current heading list** (11 total, 10 H2, 1 H3 — counted directly from the file, no measured source
  available):
  - H2: The mixed-estate landlord: who this page is for
  - H2: APR mechanics under Part V Chapter II IHTA 1984
  - H2: BPR mechanics in brief
  - H2: The £2.5m combined cap from 6 April 2026
  - H2: The allocation calculation: three competing assets, one £2.5m allowance
  - H2: Worked example: the Lambert estate
    - H3: Where the £2.5m cap actually bites
  - H2: The "farming the let" borderline pattern
  - H2: Schedule A1 IHTA 1984 extended to agricultural land
  - H2: Pre-April-2026 planning windows
  - H2: Closing pointers
- **No measured register (statute/1,000, jargon/1,000, second-person/1,000) exists for this page.** This
  is a genuine gap against the other four packs in this cluster, stated as a limitation rather than
  guessed at. The general cluster prescription (§7 below) still applies by extension, since this is
  unambiguously an adviser-reference page (heavy section citations: s.115, s.116, s.117, s.118, s.124A,
  s.124D, Schedule A1) in the same register family as the four measured pages.

## 6. Whitespace — explicitly marked KEEP

- **The Lambert-estate worked example** (§112-150 of the live file) is the single strongest asset on this
  page and arguably in the whole cluster: a named three-asset mixed estate (farm £800k agricultural
  value, trading company £400k, BTL £1.2m) where the qualifying total (£1,650,000) sits BELOW the £2.5m
  cap, so the cap is **non-binding** — and the page states explicitly what that means against the stale
  £1m figure: "Under the stale £1m headline figure that the GOV.UK summary page still cites, the same
  estate would have shown £130,000 of additional IHT... The four-fold uplift in the cap quantum between
  Bill announcement (£1m) and enactment (£2.5m) is therefore the single most consequential change for
  mid-size farming-family estates: it moves them from in-scope to out-of-scope." No competitor page
  makes this specific move (§4). **KEEP, and this is the page's genuine differentiator — the task brief's
  "worked example... is the whitespace nobody else covers" is correct and already substantially built.**
- **The four-step allocation decision framework** (identify qualifying values → total vs £2.5m → allocate
  100%-rate assets first → model post-cap IHT) — mechanical, reusable, and not present on any torn-down
  competitor page. KEEP.
- **The Schedule A1 IHTA 1984 extension to agricultural land** (Autumn Budget 2025, in force alongside
  the April 2026 cap, non-UK-resident offshore-company look-through) — genuine specialist depth absent
  from every competitor page checked. KEEP.

## 7. Acceptance criteria

1. **No query-coverage floor applies** (§3 — zero assigned keywords). The gate for this page is
   editorial/differentiation quality, not phrase placement.
2. **Equity preservation:** N/A — empty register.
3. **Positioning constraint (this page's real acceptance test, replacing the usual keyword-coverage
   check):** post-rewrite, the title and H1 must CONTINUE to lead with £2.5m (already true — verify it
   is not accidentally reverted during editing) and the slug must remain byte-identical
   (`agricultural-property-relief-mixed-estate-1m-cap`, no redirect, per DOSSIER §8).
4. **Competitor re-read.** The absence of a dedicated competitor allocation page (§4) is recorded, not
   silently assumed — confirmed against both named teardown files and the consensus map.
5. **Statute-density target (applied by extension of the general cluster rule, `_language_spec.md` §3/§5
   rule 1, since this page was not itself measured):** cap adviser-reference statute references at **2
   per 1,000 words**, raise second person to **6 or above per 1,000**. Because no baseline exists for
   this specific page, this is a target to hit on rewrite, not a measured-delta to close — state that
   distinction at QA time rather than comparing against a number this pack could not derive.
6. **No statute reference in any heading** (`_language_spec.md` rule 3) — currently already compliant
   (none of the 11 current H2/H3 headings above carry a bare section number; "APR mechanics under Part V
   Chapter II IHTA 1984" names the Act part in prose-adjacent heading text, which is a borderline case
   worth a QA judgement call, not an automatic fail, since it reads as a topic label rather than a
   citation).
7. **The four existing §4 floors apply unchanged:** arithmetic recompute on the Lambert worked example
   (£800k + £450k + £400k = £1,650,000 qualifying value; £1,620,000 unrelieved less £650,000 NRB stack =
   £970,000 chargeable at 40% = £388,000 — recompute all four figures at rewrite time), statute
   verification at source for s.115/s.116/s.117/s.118/s.124A/s.124D/Schedule A1, link resolution, and
   (per point 1) no query-coverage target.
8. **House-position fidelity, §15.4.** Must state £2,500,000 and must not regress the Lambert worked
   example's non-binding-cap conclusion, which depends entirely on the enacted quantum being correct.

**House-position quote (verbatim, §15.4):**
> "The enacted figure under IHTA 1984 s.124D(2)(a) is **£2,500,000**, available as a **rolling 7-year
> allowance**... Functionally, for a single death transfer with no prior chargeable transfers in the
> preceding 7 years, this operates as a £2.5m combined cap per estate."

## 8. Expectation

90-day read (DOSSIER §9). Because this page carries no assigned keywords, the usual "impressions on named
terms" success measure does not directly apply — the honest expectation is that any measurable gain here
rides on the shared cluster vocabulary (£2.5m, BPR/APR cap, mixed estate) picking up incidental
impressions as the cluster's overall visibility improves, not on a keyword list this page owns. Cluster-
wide honest failure trigger unchanged (DOSSIER §9): if the consumer-register family has not moved inside
p30 by the 90-day read, the cluster stops. No page-specific numeric revert trigger is set for E4, per
REWRITE_PROGRAM §9.6's own logic (a failure trigger needs a target-keyword baseline to measure against,
and none exists here) — flagged as a genuine gap in this pack's ability to state one, rather than
inventing a number.
