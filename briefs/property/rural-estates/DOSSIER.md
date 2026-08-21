# Rural / landed-estates cluster dossier (APR + BPR + farm IHT)

Cluster 5 of the coverage programme, built through `REWRITE_PROGRAM.md` §9.
Owner approvals in force (EXPANSION_PROPOSAL_2026-08-21, ruled 2026-08-21, do not
re-litigate): rural lives on Property under a `/landed-estates` root pillar, scope
frozen at the TAX HALF, conceded deliberately: herd basis, farmers' averaging, BPS/SFI,
agricultural tenancy law, natural capital, farm accountancy services.

**STATUS: FROZEN 2026-08-21.** Anything discovered later goes to the §9.8 delta list.

## 1. Scope declaration

- **Term family:** agricultural property relief, business property relief, farm/farmer/
  farming/farmland IHT, landed estate, woodland (IHT/relief only), herd basis (conceded
  marker), apr/bpr as word tokens, s.124D, Pawson.
- **Our pages:** 61 in scope by `slug/title match UNION 5+ body mentions`
  (`_scope_pages.json`); 11 core family pages (the 9 agri/BPR posts + the two
  BPR-heavy IHT posts). Full corpus 764 posts.
- **Competitor domains harvested (19, uncapped, family-filtered, §9.7):** saffery.com,
  oldmillgroup.co.uk (0 rows again, keyword-data-only), om.uk, ukpropertyaccountants.co.uk,
  uklandlordtax.co.uk, rossmartin.co.uk, optimiseaccountants.co.uk, dnsassociates.co.uk,
  protaxaccountant.co.uk, landlordzone.co.uk, landlordstudio.com, provestor.co.uk,
  taxfix.com, geraldedelman.com, thp.co.uk, taxaccountant.co.uk, getground.co.uk,
  landlordstax.co.uk, propertyhub.net.
- **Query universe: 242** (per-source: competitor ranked_keywords 327 raw family rows
  pulled 2026-08-21 at $0.38; keyword_ideas 23; our GSC 90d 47 family rows,
  data-through 2026-08-19; our Bing page-query stats 17 rows across 2 of 11 pages,
  pulled 2026-08-21). Sources named per §9.7; a source not named was not used.

## 2. Consensus topic map (`_consensus_map_raw.json`, `cluster_map.csv`)

The market treats this family as VERY FEW pages. Saffery's single APR article carries
48 of its tracked family keywords; only 10 consensus clusters exist across 19 domains.
The two that matter:

| Cluster | Vol/mo | Peer-winnable | Domains | Action |
|---|---|---|---|---|
| farm-IHT consumer head (`inheritance tax farmers` + 20 variants) | 38,000 | 3,990 | 5 | NET-NEW (manager adjudication: no existing page is close; consumer register held by NOBODY in top-10; saffery's adviser page sits p28-p51 on it) |
| `business property relief` (7 domains treat as one page) | 10,110 | 6,140 | 7 | REFRAME `maximising-business-relief-to-reduce-inheritance-tax` |
| `farming taxation` / farm tax overview | 2,810 | 1,090 | 2 | NET-NEW (no farm-tax page exists; bounded to property-tax half) |

Screened clusters (reason-coded, §9.2 step 3): agricultural accounting
(conceded-scope), snail farms + woodland for rent + woodland mortgages (off-niche),
agricultural tenancies act 1995 + farmers averaging rules (conceded-scope, saffery
holds averaging at p3 and we choose not to contest), farmers budget (news-cycle).

**Manager adjudication on the head cluster (recorded because the token scorer's pick
was wrong):** the 38,000/mo head cluster merges the consumer farm-IHT family AND the
APR adviser family. At pack stage it splits: consumer head keywords go to the new
consumer head page; `agricultural property relief` + APR-variant keywords go to
EXTEND on `agricultural-relief-for-inheritance-tax-key-benefits` and the cap keywords
to `iht-april-2026-bpr-apr-cap-property-impact`. The ledger carries them as
`assigned (net-new queued)` at freeze; the pack derivation records the split.

## 3. Key market facts (from the 2026-08-21 harvest)

- Consumer register heads: `farmers inheritance tax` 4,400/mo best peer p50,
  `inheritance tax farmers` 4,400 p51, `farming inheritance tax` 2,900 p35,
  `inheritance tax and farms` 2,900 p28, `inheritance tax farm` 2,900 p31,
  `inheritance tax farmland` 2,900 p36, `uk farm inheritance tax` 1,300 p27,
  `farm tax` 1,000 p25. NOBODY tracked holds a top-10 on any of them.
- Adviser register: saffery holds `bpr` 1,900 p4, `agricultural property relief`
  1,000 p4, `apr and bpr` p2 (on a DEDICATED 6-April-2026 reforms article,
  `/insights/articles/agricultural-property-relief-and-business-property-relief-reforms-from-6-april-2026/`),
  rossmartin `iht business property relief` p4, dnsassociates
  `agricultural land stamp duty` p3.
- The only tracked consumer-register top-10: taxaccountant.co.uk
  `how to avoid inheritance tax on farms` 210/mo p10.
- Our own equity in the family is near-zero: GSC 47 family rows, ZERO clicks, mostly
  position 37-60; Bing rows exist on ONE page only
  (`iht-april-2026-bpr-apr-cap-property-impact`, 16 queries at pos 6-9, all
  statute-shaped: `ihta1984`, `ihtm25000`, `apr cap`, `new bpr £2.5m pro rata`).
  We currently speak ONLY the statute register, and Bing is where it shows.

## 4. Reconciliation ledger (`ledger.csv`, §9.7, BALANCED)

242 = assigned 139 (incl. net-new queued) + already-covered 35 + excluded 63
(reason-coded: brand / off-niche / news-cycle / conceded-scope) + deferred 5
(named tail, none above 390/mo, all junk-adjacent; re-screen at next delta pass).

## 5. Audience and voice

Who: (a) the landlord/mixed-estate owner who also holds let farmland and has just
heard about the £2.5m cap; (b) the farming family googling the consumer head after
a news cycle; (c) their adult children doing succession research. NOT: working
farmers wanting BPS/averaging/tenancy help (conceded), farm accountants.

Register: split by page type, per `_language_spec.md` (§9.11 pass, run 2026-08-21;
every pack inherits it by reference). Measured: our statute density runs 13-20 per
1,000 words against winners' 0.0-0.8; our direct address 0.9/1k vs winner median
6.5 and the consumer top-10's 18.8-40.9. Sentence length, Flesch and word count are
NOT levers (indistinguishable / 7x spread inside the winner set). Prescription:
consumer head and decision pages write at 15-20+ second-person per 1,000, ZERO
statute in prose, 700-1,600 words, question H2s; adviser reference pages keep the
saffery shape but cap statute at 2/1k and raise second person to 6+. The register
difference is grammatical subject: winners put the reader in the sentence ("you'll
pay 20% on the excess"), we put the relief. Our one Bing-visible page earns only
statute-shaped queries (ihta1984, ihtm25000), which is that register working
exactly as written, for a market with no lead intent.

## 6. Ground truth (house_positions.md sections that govern)

- §15.4: the whole cap lock: combined £2.5m rolling 7-year BPR+APR allowance,
  IHTA 1984 s.124D via FA 2026 Sch 12 para 4, in force 6 Apr 2026, 100% below /
  50% above (effective 20%), AIM 50% separate sub-tier NOT consuming the allowance,
  anti-forestalling from 30 Oct 2024, trust anti-fragmentation.
- §22.1: Pawson investment line, why pure BTL fails BPR.
- §39: s.191/s.274 sale-below-probate interaction where CGT crosses in.
- F-102: gov.uk announcement summary still carries the stale £1m headline, NEVER cite
  it (verified three ways 2026-05-27). This staleness is the cluster's core edge.
- Memory ground truth: `br_apr_1m_cap_2026_ground_truth`, `iht_freeze_2031_ground_truth`.

## 7. Competitor teardown (§9.10, run 2026-08-21: 162 pages, 0 fetch failures)

See `_teardown_saffery.json`, `_teardown_oldmill.json`, `_teardown_notes.md`.
Bounds and limitations recorded in the notes file.

- Saffery: landed-estates hub confirmed at `/our-sectors/landed-estates-and-rural-businesses/`
  (11 sub-pages), 12 owner pages with a clear pillar elbow, 82.1% of non-owner-heavy
  family pages link to an owner. **STALENESS CORRECTION, supersedes the 08-21 scout
  and the proposal's "more current than either incumbent hub" line: saffery IS
  current on the £2.5m cap** (11 pages cite it correctly; £1m only as superseded
  history; it even has a dedicated raise announcement page). The currency wedge
  against saffery is GONE; what remains against saffery is the consumer register
  (its 4,400/mo heads sit p28-p51) and calculator absence.
- Old Mill (om.uk; oldmillgroup.co.uk redirects): farming hub at `/sectors/farming/`,
  23 owner pages but FLAT (no hierarchy, top family page is a wills/disputes post),
  21.6% owner-linking share. **STALE where it counts: its evergreen
  `/business-property-relief-bpr/` page (a top-10 owner page) still states the £1m
  cap as current law** ("the 100% BPR rate will be capped at £1 million per
  individual"), plus 3 more stale posts. The currency wedge is REAL against Old Mill.
- ukpropertyaccountants.co.uk remains keyword-data-only (serves 202 with empty body).
- Two saffery pages were sitemap-under-declared and surfaced only via the one-hop
  crawl, matching the §9.10 known failure mode.

## 8. Work order (derived from §2-§3; grades per §9.5)

Gated on nothing material. Verified against monitored_pages 2026-08-21: no worked
page sits in an armed window. Three family rows exist: `bpr-pure-btl-pawson-...` and
`iht-1m-bpr-apr-cap-mixed-trading-...` expire TODAY (2026-08-21, edits fine from
tomorrow), and `serviced-accommodation-tax-fhl-abolition-april-2025` is armed to
2026-08-30 but is conflict-check-only in this cluster (no edits before 08-30). E-numbered EXTENDs are additive-only; N-numbered are net-new with
middleware map entries; the pillar and calculator follow the wave11 §6 out-of-band
pattern.

| # | Target | Grade | Prize | Note |
|---|---|---|---|---|
| P1 | `/landed-estates` root pillar | NET-NEW route | binds the family | in-force table, £2.5m arithmetic, Pawson boundary, links every family page |
| N1 | farm-IHT consumer head page | NET-NEW | 4,400+4,400+2,900x4 family, pw 3,990 | consumer register, answers "will my family farm pay IHT", cap arithmetic worked |
| N2 | farm tax overview (property-tax half) | NET-NEW | 2,810 | `farm tax`/`farming taxation`; concedes operations topics by name |
| N3 | how-to-avoid/reduce IHT on a farm (legitimate planning) | NET-NEW | 210 head + tail | only consumer top-10 anywhere is p10 on this; succession-timing arithmetic |
| E1 | `maximising-business-relief-to-reduce-inheritance-tax` | REFRAME (0 equity) | 10,110 vol / pw 6,140 | the 7-domain BPR consensus topic |
| E2 | `agricultural-relief-for-inheritance-tax-key-benefits` | REFRAME (0 equity) | APR family 1,000 + variants | APR conditions, occupation tests |
| E3 | `iht-april-2026-bpr-apr-cap-property-impact` | EXTEND (manager override: sub-threshold Bing equity, 16 queries pos 6-9, but it is our ONLY Bing surface; additive only, protect every statute query) | cap family | the £2.5m arithmetic page |
| E4 | `agricultural-property-relief-mixed-estate-1m-cap` | REFRAME (0 equity) | mixed-estate allocation | body correct, slug stays (no redirects, standing never) |
| E5 | `bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line` | REFRAME (0 equity) | Pawson boundary | the honest-no page, links from P1 |
| T1 | combined BPR+APR allowance calculator | NET-NEW tool | queue after content lands | GenericTool + goldens; allowance used/remaining, 50% band, effective 20% |

Deferred to delta list: `business-property-relief-rental-property-iht`,
`fic-iht-treatment-bpr-myth`, `farmland-supply-value-drops-is-iht-reform-to-blame`,
`serviced-accommodation-bpr-eligibility-pawson-test` (conflict-check only at QA),
plus 2-4 further net-new candidates the packs may surface (proposal budget was
8-10 net-new; N1-N3 + pillar are the evidence-backed core, the rest must earn their
slot from pack data, not fill a quota).

## 9. Expectations + failure triggers (stated before the work)

- This is a 90-day read, not 28 (IHT-planning intent converts slowly). Bing 14/28d
  reads are directional only.
- Success: impressions appearing on the NAMED consumer-register keywords (the
  `farmers inheritance tax` family) and the BPR/APR heads moving inside p30.
- Honest failure trigger (from the proposal, unchanged): if the consumer-register
  family has not moved inside p30 by the 90-day read, the wedge thesis is wrong and
  the cluster STOPS at what is built.
- Per-page revert triggers stated in each pack at write time.
- E3 extra trigger: any of its 16 baseline Bing queries stops matching = revert.

## 10. Limitations

1. Serper still out of credits: every position is a stored harvest value at pull
   date, no live SERP checks.
2. Bing free-API volumes are directional; `GetKeywordStats` medians quoted in the
   proposal are Bing-on-Bing impressions, not market volume.
3. oldmillgroup.co.uk: zero ranked keywords on two pulls; om.uk partially covers it.
   The rural competitive picture leans on saffery + rossmartin + the consumer-register
   absence.
4. GSC returned one junk rank-tracker row inside the query dimension (recorded in
   `_gsc_family_queries.json`, flagged, not treated as a keyword).
5. Consensus map is thin (10 clusters) because the market itself is thin: this is a
   finding (the market treats farm IHT as one page), but it means domain-count
   confidence is lower than SDLT/CGT dossiers. The 7-domain BPR cluster is the
   strongest consensus signal in the family.
6. ukpropertyaccountants.co.uk runs a page with the IDENTICAL slug to our E2 page
   (`agricultural-relief-for-inheritance-tax-key-benefits`), unfetchable (202 empty
   body), ranking p34-96. Positioning note for the E2 pack: the REFRAME must
   differentiate the page's title/H1 from the shared-slug twin; the slug itself
   stays (no redirects, standing never).
