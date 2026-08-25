# Cluster dossier: creative performers family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2/§9.7/§9.8. **FROZEN on write; late finds go to
the delta list in §9 below (named: DELTA_creative_performers_2026-08-25).**

Cluster = 5 niches moved agency -> generalist by owner decision 14, 2026-08-25
(`expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md` amendment note 1):
row 37 content creators / influencers, row 41 musicians, row 42 actors / entertainment,
row 44 artists / creatives, row 46 photographers.

DataForSEO spend this dossier: **$0.84** (ranked_keywords 9 domains uncapped $0.75,
search_volume 46 kws $0.09). Balance before: $51.35. Within the $2 budget and
`DATAFORSEO_ABORT_AT`.

---

## 1. Scope declaration (§9.8 item 1)

**Term family (regex, recorded):** creator|influencer|youtuber|youtube|tiktok|twitch|
streamer|vlogger|blogger|musician|band|dj|singer|songwriter|spotify|royalt*|actor|actress|
performer|performing|theatre|entertainer|entertainment|dancer|artist|creative|photographer|
photography|videographer|filmmaker|music|acting|touring|busk*|orchestr*|composer — with a
recorded false-positive screen for "tax band(s)" (UK rate-band queries are NOT this family).

**Our pages in scope (7; 6 in-cluster seeds + 1 conflict-check-only):** all in
`generalist/web/content/blog/`:
`accountant-for-musicians-uk.md`, `accountant-for-actors-performers-uk.md`,
`accountant-for-photographers-uk.md`, `accountant-for-content-creators-uk.md`,
`accountant-for-influencers-uk.md`, `creative-industry-tax-reliefs-uk.md`;
plus `accountant-for-onlyfans-creators-uk.md` (row 38, OUT of this cluster,
conflict-check only). Body-frequency sweep of the other 411 generalist posts found no
additional page carrying the family at density (slug/title scan; no 5+ body-mention
candidates surfaced by the corpus grep beyond these).

**Competitor domains harvested (9, uncapped, paginated to exhaustion, 2026-08-25):**
identified via free DDG SERP sweep over 6 "accountant for X uk" heads plus the discovery
pool's dfs_ranked source domain:

| Domain | Type | Ranked rows (total) | Family rows |
|---|---|---|---|
| alto-accounting.com | creative/creator specialist | 1,175 | 26 |
| srlv.co.uk | music/entertainment specialist (large) | 286 | 49 |
| yourinfluenceraccountant.co.uk | influencer specialist | 23 | 19 |
| creativeandnumbers.co.uk | creative specialist | 59 | 35 |
| pulse-accountants.co.uk | media/influencer specialist | 785 | 28 |
| performanceaccountancy.co.uk | performers specialist | 1,115 | 31 |
| rsbc.uk | creative-sector specialist | 901 | 34 |
| weareband.co.uk | musician specialist | 105 | 52 |
| greenandpeter.co.uk | entertainers/media specialist | 740 | 99 |

**Query universe (union of named sources, §9.7):**

| Source | Pull date | Family rows | Unique contribution |
|---|---|---|---|
| Competitor ranked_keywords, 9 domains, uncapped | 2026-08-25 | 213 distinct kws | 213 |
| Our GSC 90d (window 2026-05-27 to 2026-08-25) | 2026-08-25 | 3 true-family queries (+2 tax-band false positives screened) | 3 |
| Our Bing 91d query stats | 2026-08-25 | 6 true-family (+1 false positive screened) | all 6 are OnlyFans/deferred or overlap |
| Discovery pool `discovery_candidates` lane creative_performers (dfs_ranked+gsc sources only; sitemap rows are competitor page titles, not queries) | 2026-08-25 | 8 | 1 |

**Universe = 219 keywords.** Full row-level record:
`creative_performers_2026-08-25_ledger.csv` (same directory). Raw paid harvest preserved:
`creative_performers_2026-08-25_ranked_raw.json`.

**Known artefact, stated:** the discovery pool's 28 rows are thin because the 15 general
competitors in `sites/generalist.discovery.json` do not specialise here. That thinness is
a sampling artefact, NOT evidence of low demand; this dossier's specialist harvest is the
corrective. Free expansions (autocomplete/PAA) were NOT run: stated limitation.

---

## 2. Consensus topic map (§9.8 item 2)

Competitor URL nodes with 3+ family keywords, merged across domains at 30% overlap of the
smaller set. 34 nodes -> 16 raw clusters; brand/noise-dominated clusters adjudicated out
(recorded in the ledger). Surviving consensus topics:

| Topic | Domains | Kws | Raw vol/mo | Peer-winnable (top-10 held by a specialist) | Note |
|---|---|---|---|---|---|
| Accountant for influencers / content creators | 6 | 12 | 1,000 | 680 | pulse p9, greenandpeter, rsbc, srlv, creativeandnumbers, yourinfluenceraccountant all run a dedicated page |
| "Do influencers/YouTubers pay tax" Q&A | 3 | 6 (inside above) | 360 | 360 | yourinfluenceraccountant runs it as its own page |
| Musician / music-industry accountant | 6 | 12 | 960 | 960 | weareband holds p4 on `musician accountant` (140/mo) |
| Actor tax / accountant for actors / entertainment accountant | 5 | 19 | 1,820 | 1,220 | srlv, creativeandnumbers, greenandpeter run dedicated pages; incl. theatre accounts 110 |
| Accountants for creatives / artists | 6 | 3 | 280 | 280 | high domain count, tiny set; head `accountants for creatives` 140 |
| Creative industry tax reliefs | 1 (srlv) | 5 | 470 | 0 | only srlv ranks, outside top-10; we hold Google pos 8.0 on our pillar |
| Royalties tax/VAT | 2 | 5 | 250 | 50 | performanceaccountancy knowledgebase page; sub-topic, not a page |
| Photographers (accountancy intent) | 0 | 0 | 0 | 0 | NO specialist ranks for photographer-accountancy terms; only head-term volume exists (`accountant for photographers` 40/mo, ads data). greenandpeter's photographer traffic is 100% earnings/career content |

Single-domain idiosyncrasies screened (see §4): greenandpeter's earnings-content fleet
("how much do photographers/actors earn", 16,920/mo family-wide), pulse's
media-industry-explainer fleet, business-entertaining VAT (alto; belongs to generalist's
core corpus, not this cluster).

---

## 3. Assignment table, unique (§9.8 item 3)

One topic -> one page. Estate unique-assignment respected: nothing here belongs to
agency's founder audience (verified: agency blog has zero creator/performer/artist
pages); OnlyFans (row 38) and Film & TV production (row 43 STANDALONE) are deferred, not
assigned.

| Topic (ledger code) | Kws | Vol | Peer-winnable | Page | Grade |
|---|---|---|---|---|---|
| P-CRE influencers/creators | 12 | 1,000 | 680 | split: influencer heads -> `accountant-for-influencers-uk`; creator heads (`accountants for content creators` 70, `content creator accountant(s)` 120, `tiktok accountant` 40) -> `accountant-for-content-creators-uk`; question set (`do influencers/youtubers pay tax`, 360) -> net-new N1 | REFRAME / REFRAME / NET-NEW |
| P-MUS musicians | 12 | 960 | 960 | `accountant-for-musicians-uk` | REFRAME |
| P-ROY royalties | 5 | 250 | 50 | attached to `accountant-for-musicians-uk` as H2/FAQ section (never a page per keyword) | (inside REFRAME) |
| P-ACT actors/entertainment | 19 | 1,820 | 1,220 | `accountant-for-actors-performers-uk` takes the accountant-heads incl. `entertainment accountant` family (440) + `theatre accountants` (180); the tax-question set (`actor tax`/`tax for actors`/`self assessment for actors`, ~660) -> net-new N2 | REFRAME / NET-NEW |
| P-ART artists/creatives | 3 | 280 | 280 | NO PAGE EXISTS (the one niche with no seed) -> net-new N3 `accountant for artists and creatives` | NET-NEW |
| P-REL creative reliefs | 5 | 470 | 0 | `creative-industry-tax-reliefs-uk` | EXTEND |
| P-PHO photographers | 0 assigned | 0 | 0 | `accountant-for-photographers-uk` keeps its head term (40/mo, ads data; page already earns 117 impressions + 1 click) | EXTEND, no new pages |

Our specialist-tail outcome (§9.2 step 4, third outcome): `accountant-for-photographers-uk`
matches nothing in the market map; the market does not group photographer accountancy at
all. It is kept and protected, not expanded.

---

## 4. Screen: exclusions with reason codes and volumes (§9.2 step 3)

Nothing dropped silently; every row is in the ledger CSV. Summary:

| Reason code | Kws | Vol/mo | What it is |
|---|---|---|---|
| EX-BRAND | 33 | 26,610 | weareband/at-music brand navigation, generic "band", `youtube accountant` (3,600/mo but intent = accounting tutorials ON YouTube, not creator accountancy — flagged, not chased) |
| EX-CAREER | 67 | 16,920 | "how much do photographers/actors/influencers earn/make", how-to-become, marketing how-tos. greenandpeter's traffic strategy; excluded from the plan under the A* lead-intent bar (see open question 3) |
| EX-OFFNICHE (mgmt/law/consulting) | 25 | 3,160 | band management, media law, entertainment consulting — pulse/weareband service lines, not accountancy demand |
| EX-OFFNICHE (royalty navigation) | 7 | 800 | "music royalty companies" = PRS/collection-society navigation, not tax |

Deferred (real demand, other clusters, named):

| Deferred to | Kws | Vol/mo |
|---|---|---|
| Row 38 OnlyFans creators (separate niche, C1 CONDITIONAL: separate-domain safe form) | 12 | 810 |
| Generalist core corpus: business-entertaining VAT/expenses (`vat on entertainment` etc.) | 19 | 3,140 |

Ledger balance: **assigned 56 + already-covered 0 + excluded 132 + deferred 31 = 219 =
universe. BALANCES.** (already-covered is legitimately zero: no seed has enough equity for
any query to qualify as protected ranking coverage; the 3 live GSC family queries travel
inside their assigned pages' packs as do-not-lose entries.)

---

## 5. Equity grading of the 6 seeds (§9.2 step 5; Bing graded first, conservative)

Google = GSC 90d (2026-05-27 to 2026-08-25); Bing = 91d page stats, summed per URL.

| Seed | Bing clicks/imps | Google clicks/imps/pos | Verdict |
|---|---|---|---|
| accountant-for-musicians-uk | 0 / 0 | 0 / 30 / 10.8 | **REFRAME** |
| accountant-for-actors-performers-uk | 0 / 0 | 0 / 16 / 35.7 | **REFRAME** |
| accountant-for-photographers-uk | 0 / 0 | 1 / 117 / 12.3 | **EXTEND** (Google clicks >= 1) |
| accountant-for-content-creators-uk | 0 / 0 | 0 / 4 / 5.8 | **REFRAME** |
| accountant-for-influencers-uk | 0 / 0 | 0 / 1 / 5.0 | **REFRAME** |
| creative-industry-tax-reliefs-uk | 2 / 142 | 0 / 32 / 8.0 | **EXTEND — manager override, recorded**: 2 Bing clicks is sub-threshold (needs 3) but it is the cluster's ONLY Bing click surface and sits at Google pos 8; farming E3 precedent. Additive only; keep metaTitle/H1/H2 order; protect every current query |

Non-cluster note: `accountant-for-onlyfans-creators-uk` (Bing 2 clicks / 23 imps, Google
0/19/8.2) would grade EXTEND but belongs to row 38 and is untouched by this cluster.

---

## 6. Proposed page plan (harvest-right-sized; C2 sizing said 3-5 per niche, evidence says less)

10 target surfaces total: 6 seed verdicts + 3 net-new + 0 for photographers beyond its seed.

| # | Surface | Action | Assigned vol (peer-winnable) |
|---|---|---|---|
| R1 | accountant-for-influencers-uk | REFRAME on influencer heads (`accountants for influencers` 170, `influencer accountant` 40) + GSC query `accountant for influencers wimbledon` protected | 380 (of 680 P-CRE) |
| R2 | accountant-for-content-creators-uk | REFRAME on creator heads + `tiktok accountant`; must differentiate hard from R1 (unique assignment is the differentiation instruction) | 260 |
| N1 | net-new: "Do influencers and YouTubers pay tax?" Q&A | NET-NEW (3 domains treat it as a page) | 360 |
| R3 | accountant-for-musicians-uk | REFRAME on `musician accountant` family + music-industry phrasings + royalties tax/VAT H2 (P-ROY folded in) | 1,210 incl. royalties |
| R4 | accountant-for-actors-performers-uk | REFRAME on `accountant for actors` family + `entertainment accountant` + `theatre accountants` phrasings; protect GSC query `accounting for performers` | ~1,160 |
| N2 | net-new: actor tax / self assessment for actors | NET-NEW (`actor(s) tax` 330, `tax(es) for actors` 220, `actor tax return`, `self assessment for actors`) | ~660 |
| N3 | net-new: accountant for artists and creatives | NET-NEW (no seed exists; `accountants for creatives` 140 at 6 domains; protect GSC query `creative industry accountants near me`) | 280 |
| E1 | creative-industry-tax-reliefs-uk | EXTEND (additive only, Bing override above); add `creative industry tax relief(s)` singular/plural phrasings; carries the row-43 scope fence (§8) | 470 raw, 0 peer-winnable |
| E2 | accountant-for-photographers-uk | EXTEND (additive only); no new photographer pages, market shows zero specialist accountancy field | 40 (head, ads data) |
| — | musicians niche second page | NOT built: P-MUS all routes to one page; a planned page with no assigned demand does not get written (farming E4/E5 discipline) | — |

Frozen-ground check (R.5 / §5.1 step 4): none of these 6 seeds appears in an armed
`monitored_pages` window on the generalist rewrite registers on file; verify against the
live table at pack derivation before any edit (standing rule regardless).

Cannibalisation notes (C2 amendment note 5): R1 vs R2 is the only intra-cluster overlap
risk and is resolved by the assignment split above. Agency holds no stray creator pages
(checked 2026-08-25). Photographers' "stray" page IS the host page here, so note 5's
watch-list entry for photographers closes with this dossier.

---

## 7. Audience, voice (§9.8 item 5)

Self-employed individual creatives and small-company performers (sole traders, some PSCs);
NOT agency founders (that audience stays with agency), NOT production companies (row 43).
Register per generalist's existing parity voice and `VOICE_STANDARD.md`: consumer-plain,
direct address, worked figures; the farming language finding applies (winners put the
reader in the sentence, not the relief). Formal language pass (§9.11) to `_language_spec.md`
still to run at pack derivation, on the 9 harvested domains' top pages.

---

## 8. Ground truth: house positions needed BEFORE writing (§9.8 item 6)

C1 status for all 5 rows: **CLEAR** (rows 37/41/42/44/46; row 37 note: CAP/ASA disclosure
duties bite the creator, not us — fine to describe, nothing to fence). But
`docs/generalist/house_positions.md` (286 lines) carries **zero** creative-sector
positions, and C2 §2 records creative reliefs in NO house_positions anywhere in the
estate. GT 0: lock these positions first, before any pack is written:

1. **Creative-sector reliefs boundary block** for E1: current AVEC/VGEC/theatre/orchestra
   relief rates and the scope fence: this page covers the reliefs as information for
   creative businesses; production-company advisory depth is row 43 (STANDALONE) and is
   deliberately NOT built here. Write the fence into the position so the row-43 build can
   land later with zero content overlap (farming step-2 pattern, zero redirects).
2. **Royalties position** for R3: income tax treatment of music royalties (trading income
   vs miscellaneous), VAT on royalty payments, post-cessation receipts.
3. **Performer status and expenses position** for R4/N2: actors' employment status and
   NIC treatment (entertainers' regulations history to current position), agent fees
   deductibility, touring/subsistence expenses.
4. **Creator income position** for R1/R2/N1: barter/gifted-product income valuation,
   platform income (AdSense/TikTok fund/brand deals), trading allowance interaction,
   badges of trade for one-off gifted items.
5. **Photographer/artist basics** for E2/N3 can cite existing sole-trader positions
   (capital allowances on kit already covered in the core doc); no new lock needed beyond
   confirming coverage at pack time.

---

## 9. Delta list — DELTA_creative_performers_2026-08-25

Dossier is FROZEN. Everything found after this point lands here, not in the batch.

| # | Item | Reason parked |
|---|---|---|
| D1 | `youtube accountant` 3,600/mo | intent unverified (likely tutorial-seeking); needs a SERP read before anyone chases it |
| D2 | Earnings/career content fleet (16,920/mo excluded) | greenandpeter's traffic model; conflicts with A* lead-intent bar; owner call if ever revisited |
| D3 | Free expansions (autocomplete/PAA) never run for this family | stated §1 limitation; run at pack derivation if head coverage looks thin |
| D4 | Persist raw harvest into `dataforseo_competitor_data` table | §9.2 step 1 persistence not done; raw JSON preserved beside this file |
| D5 | OnlyFans seed EXTEND-grade signal (2 Bing clicks) | row 38's own future pass, not this cluster |

---

## 10. Open questions for the owner (batched, none blocking pack derivation except Q1)

1. House positions (§8 items 1-4) must be authored and locked before writing. Approve
   authoring as the first Stage 3 task for this cluster?
2. Net-new N1/N2/N3 go to existing blog categories (sole-trader family) per the farming
   precedent; no hub page proposed at this volume. Confirm no-hub is acceptable.
3. EX-CAREER: 16,920/mo of earnings-content demand deliberately excluded. The specialist
   competitors farm it for top-funnel traffic. Recommend leaving it excluded; say if you
   want a one-page test instead.
