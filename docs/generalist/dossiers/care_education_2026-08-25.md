# Cluster dossier: care_education family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2/§9.7/§9.8.

**STATUS: FINAL — FROZEN 2026-08-25 (see §0.1). D1 harvest completed the same day under an
explicit owner authorisation to spend past the daily DataForSEO gate ("ignore that $5 cap
temporarily, just get the work done today", 2026-08-25, that day only). §2 and §4 were
re-struck on the harvested rows and the ledger now balances over the full universe.
Everything found after this point goes to the delta list §9 (named:
DELTA_care_education_2026-08-25).**

Cluster = 3 niches, all ABSORB -> generalist per the amended
`expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md`:
row 26 childminders / nurseries (cluster 3-5, ~110-200/mo), row 27 foster carers
(cluster 3-5, ~70-140/mo), row 78 tutors / private teachers (section + 1-2 pages, ~10/mo).
**Scope fences:** schools/academies (row 77) belong to charities (C1 NEEDS-REVIEW there,
not here); care homes (row 24) belong to the care site; charity-run preschools/playgroups
are row-77-shaped and are excluded from this cluster.

## §0 Harvest incident and spend accounting (verify-then-claim record)

DataForSEO spend this dossier: **$0.188** (5 ranked_keywords pulls). Balance before
$49.72. Two failures, owned:

1. **Daily budget gate hit mid-harvest.** `DATAFORSEO_ABORT_AT` ($5/day, estate-wide)
   was at $4.9874 running when this session's 6th call fired; the tracker refused it
   (correctly). The budget was consumed by parallel dossier sessions the same day
   (api_cost_log: crypto + other generalist lanes, all real success spend). Gate was
   respected, not bypassed.
2. **The 5 completed pulls' row data was lost** by this session's harvest script (it
   buffered all responses and dumped at the end; the gate exception killed the process
   first). $0.188 bought verified per-domain counts only. Live re-calls are
   idempotency-refused same-day by design.

Completed pulls (counts verified, keyword rows NOT held):

| Domain | Type | total_count | Cost |
|---|---|---|---|
| caservices.org.uk | childminder + foster carer + nursery specialist (est. 2008) | 39 | $0.017 |
| swan-books.co.uk | childminder specialist (Essex) | 14 | $0.014 |
| vanillaonlineaccountancy.co.uk | online firm, childminder page | 11 | $0.013 |
| octopusfostering.co.uk | foster carer tax-return specialist (£75 fixed fee) | 1 | $0.012 |
| tax-wise.co.uk | general online firm + foster-carer service line | 1,842 (1,000 captured then lost) | $0.132 |

Not yet pulled: accountaxzone.com (foster-carer content fleet), wearegolding.com
(nursery/childcare specialist, Essex/Kent).

**Completion step (delta D1, blocking the freeze):** on a day with gate headroom, re-run
ranked_keywords for all 7 domains (idempotency resets daily), paginating tax-wise.co.uk
to exhaustion (1,842 rows = 2 calls), save incrementally, filter to the term family,
then complete §2-§4 and freeze. Estimated cost ~ $0.40. Everything else in this dossier
is built from held sources and stands.

## §0.1 D1 completion record (2026-08-25, same day, owner-authorised gate override)

The owner lifted the $5/day gate for 2026-08-25 only ("ignore that $5 cap temporarily,
just get the work done today. please use what you need today"). D1 ran the same session
with `DATAFORSEO_ABORT_AT=12` for that single run. Sub-agents still never set it; the gate
returns to $5 on 2026-08-26.

**Spend: $0.5584** for 8 calls (estimate was ~$0.40; the two previously-unpulled domains
came back an order of magnitude larger than the counts in §0 suggested). Session total for
this dossier: $0.188 + $0.5584 = **$0.7464**. Balance after: ~$49.0. Zero failures, zero
retries. The §0 failure mode is fixed: the runner writes the JSON after **every** call.

| Domain | offset | total_count | rows held | Cost |
|---|---|---|---|---|
| caservices.org.uk | 0 | 39 | 39 | $0.0167 |
| swan-books.co.uk | 0 | 14 | 14 | $0.0137 |
| vanillaonlineaccountancy.co.uk | 0 | 11 | 11 | $0.0133 |
| octopusfostering.co.uk | 0 | 1 | 1 | $0.0121 |
| accountaxzone.com | 0 | 991 | 991 | $0.1309 |
| wearegolding.com | 0 | 955 | 955 | $0.1266 |
| tax-wise.co.uk | 0 | 1,842 | 1,000 | $0.1320 |
| tax-wise.co.uk | 1000 | 1,842 | 842 | $0.1130 |

Raw rows persisted to `care_education_2026-08-25_ranked_raw.json` (same directory,
matching the sibling dossiers' convention). Uncapped: every domain exhausted, 3,853 rows.
Family filter (§1 regex, with the "statutory" and non-care-"foster" screens applied)
returns **31 rows**, 29 of them new (2 duplicated held head terms). All 31 are in the
ledger. **D5 remains open**: rows are persisted to the dossier JSON, not to
`dataforseo_competitor_data`, the same gap the creative dossier logged.

**What D1 changed, honestly stated:** it did not move a single surface in or out. It
confirmed N2 and N5 (both provisional), closed D3 and D4, added one new head term
(`foster accountants`, 170/mo, bigger than the on-file 70), and added one new exclusion
code. The plan in §6 is unchanged.

---

## 1. Scope declaration (§9.8 item 1)

**Term family (regex, recorded):** childmind|child mind|nurser(y|ies)|daycare|day care|
day nursery|early years|preschool|pre-school|playgroup|out of school|after school club|
childcare|child care|foster|fostering|kinship|staying put|shared lives|qualifying care|
HS236|tutor|tutoring|tuition|private teacher — with TWO recorded false-positive screens:
**"statutory" contains "tutor"** (C3_DEMAND.md §5 already killed the "tutor" estate token
for exactly this: 138 impressions, almost all "statutory accounts") and "foster" in
non-care senses (e.g. "foster growth"). Nanny/au-pair payroll intent is employer-side
(parent employs the nanny) and is screened to its own bucket, not silently dropped.

**Our pages in scope (1 seed + 1 conflict-check-only):** in
`generalist/web/content/blog/`:
- `accountant-for-tutors-uk.md` — the ONLY seed for all three niches (63 family
  mentions).
- `do-i-need-a-separate-business-bank-account-uk.md` — 1 passing childminder mention,
  conflict-check only, no action.

Body-frequency sweep of all 418 generalist posts (5+ mention threshold) surfaced nothing
else. Estate-wide slug sweep for childmind/foster/nurser/tutor: no stray pages on any
sibling site (the two "statutory-residence" hits are the substring artefact; generalist's
`how-to-sell-a-care-home-business.md` is row 24's business-sale page, out of scope here
and no overlap with nursery content). Childminders and foster carers are **NO-PAGE
niches: zero existing coverage anywhere in the estate.**

**Competitor field (free SERP sweep, 4 queries, 2026-08-25):** the specialist field is
real but shallow and fragmented per sub-niche:

- Childminders: caservices.org.uk (the true multi-sub-niche specialist: dedicated
  childminders / daycare-nursery / foster-carers audience pages plus a childminder
  10% wear-and-tear + MTD ITSA content layer, confirmed by free page crawl),
  swan-books.co.uk, vanillaonlineaccountancy.co.uk, plus sector pages on generalist
  firms (qaccounting.com, auditox-accountancy.uk, taxbite.uk, deadsimpleaccounting.co.uk).
- Foster carers: octopusfostering.co.uk, tax-wise.co.uk, accountaxzone.com content
  fleet; **Xeinadin** is the Fostering Network's endorsed provider — recorded as a
  national-brand-tier peer, deliberately NOT harvested (top-100 firm, huge domain,
  wasteful pull); non-commercial SERP owners: gov.uk HS236/BIM, LITRG, fosterline.
- Nurseries: hazlewoods.co.uk (30-year day-nursery team, large firm — recorded, not
  harvested for the same reason), wearegolding.com, agileaccountants.co.uk,
  apexaccountants.tax, bradleysaccountants.co.uk.
- Tutors: **NO specialist field exists.** Only sector pages on generalist firms
  (accotax.co.uk, auditox, apexaccountants.tax, hayes-accountants.co.uk) and
  marketplace/career content. Recorded per instruction; no spend hunting it.

**Query universe (union of named sources, §9.7):**

| Source | Pull date | Family rows | Note |
|---|---|---|---|
| Our GSC 90d (2026-05-27 to 2026-08-25, scratchpad stage0 pull) | 2026-08-25 | 0 true (2 "statutory" false positives screened) | tutors PAGE row exists: 2 clicks / 13 imps / pos 6.2 |
| Our Bing 91d query + page stats | 2026-08-25 | 0 | no family rows in 1,202 queries / 665 pages |
| Discovery pool `discovery_candidates` lane care_education | 2026-08-25 | 2 (both sitemap-source tutor how-tos, no volume) | thinness = sampling artefact (general competitors don't specialise here), NOT low demand — same artefact the creative dossier recorded |
| On-file paid demand (R2D_VOLUMES.md / C3_DEMAND.md, pulled 2026-08-25 in the niche-map pass) | 2026-08-25 | 6 named head terms + cluster totals | row 26: cluster 200/mo, `accountant for childminders` 90 ($16.39 CPC), = `childminder accountant` (C3 §equivalence); row 27: cluster 140/mo, `foster carer tax` 70 = `foster care tax`; row 78: `private tutor tax` 10 |
| Competitor ranked_keywords, 7 specialist domains, uncapped | 2026-08-25 (D1, §0.1) | 31 family rows from 3,853 harvested (29 new) | COMPLETE |

**Universe = 40 rows** (11 held at first pass + 29 new from D1). Row-level record:
`care_education_2026-08-25_ledger.csv` (same directory); raw JSON alongside it. Free
expansions (autocomplete/PAA) still NOT run: stated limitation, carried as D2. They are
not a freeze blocker, because D1 delivered 31 real rows across all four sub-niches and
free expansion adds phrasings, not surfaces.

**Cannibalisation flag found at D1 (not at first pass, because the §1 slug sweep regex
did not include "school" or "church"):** `generalist/web/content/blog/` carries
`accountant-for-schools-uk.md` and `accountant-for-churches-uk.md`, both live on the
generalist site, both dated 2026-05-17. Measured overlap with this family: **zero**
(schools page = 0 mentions of nursery / childminder / early years / preschool / childcare /
foster; churches page the same; the schools page is academy-shaped, 29 "academy" and 8
"audit" mentions). So neither cannibalises N1-N5 or E1 and **nothing here is collapsed or
redirected** (never-collapse rule). What they are is a **placement flag for another
cluster**: C2 rows 77 and 76 both place schools and churches on `charities`, and row 77 is
C1 NEEDS-REVIEW pending a position doc that splits audit-locked academy trusts from
independent schools. A live generalist page is sitting on that gated ground. Recorded here,
owned by the charities build, **not fixed by this cluster** (see §11).

---

## 2. Consensus topic map (§9.8 item 2) — RE-STRUCK on the D1 keyword union

Keyword-union clustering now runs on 31 harvested family rows plus the 11 held rows.
Volumes below are the harvested per-keyword figures where D1 supplied them, on-file
cluster figures otherwise. Page-structure consensus (free crawl) is unchanged and agrees
with the keyword union, which is the useful result: the field's page split and the demand
split are the same split.

| Topic | Independent domains running a dedicated page | Vol/mo (D1 keyword union) | Note |
|---|---|---|---|
| Accountant for childminders (sole trader) | 6+ (caservices, swan-books, vanilla, qaccounting, auditox, taxbite, deadsimple) | 90 head + 90 `childminding accountant` + 90 long-tail variant | strongest consensus in the family; CPC $16.39 on both head phrasings, the highest in the cluster |
| Childminder expenses / 10% wear-and-tear / MTD ITSA | caservices (a service page AND a Jan-2026 HMRC-confirmation post), swan-books (an H2 block) | **340 raw across 4 phrasings** (90/90/90/70) | **N2 CONFIRMED.** This is the biggest single demand block in the family and the incumbent p8 page tags its own mileage rates "(June 2016)" |
| Foster carer tax / accountant / tax return | 5+ (octopusfostering, tax-wise, caservices, accountaxzone, reactaccountancy, bkplus) | `foster accountants` **170** (new head, beats the on-file 70) + a 15-row service/return block, best CPC $8.20 | accountaxzone alone holds 15 of these rows, all at p21-p63: a content fleet ranking badly |
| Qualifying care relief, year-tagged | accountaxzone (p8), caservices (p89), tax-wise (p104) | 5 rows, 90/90/90/70/70 | **N5 CONFIRMED, D4 RESOLVED.** A peer holds **p8** on `qualifying care relief 2025/26`, so gov.uk and LITRG do NOT own this head end to end. The year tag in the query is the whole opportunity |
| Nursery / daycare accountants (Ltd, funded hours, payroll) | 5+ (hazlewoods, wearegolding, agile, apex, bradleys) | `nursery accounts` 110 (caservices p4, wearegolding p17) | DISTINCT audience from childminders: companies, staff payroll, funding-stream reconciliation. Thinnest keyword evidence in the family, strongest page evidence |
| Tutor tax / accountant for tutors | 0 specialists (sector pages only) | 10 | **D1 returned zero tutor rows across 3,853 harvested keywords**, which confirms rather than contradicts §1: no specialist domain competes here at all. Our seed already sits Google pos 6.2 on 13 imps |

**Audience split, recorded as the assignment instruction:** sole-trader childminder
(individual SA, simplified records, home-use costs) vs nursery GROUP/company (Ltd,
payroll, pensions, funded-hours income mix, VAT-exempt supplies) are two pages, never
one. Anything charity-preschool shaped (committee-run playgroups, charitable
incorporated organisations) is row 77's family and routes to the charities site: the
fence is written into the nursery page's position lock (§8 item 3).

---

## 3. Assignment table, unique (§9.8 item 3)

| Topic | Page | Grade |
|---|---|---|
| Accountant for childminders | net-new N1 | NO-PAGE -> NET-NEW |
| Childminder expenses / wear-and-tear / MTD | net-new N2 (**CONFIRMED at D1**, 340/mo raw) | NO-PAGE -> NET-NEW |
| Nursery / daycare accountants | net-new N3 | NO-PAGE -> NET-NEW |
| Foster carer tax + accountant (QCR) | net-new N4 | NO-PAGE -> NET-NEW |
| Qualifying care relief explainer / HS236 Q&A | net-new N5 (**CONFIRMED at D1**, peer at p8) | NO-PAGE -> NET-NEW |
| Tutor tax / accountant for tutors | `accountant-for-tutors-uk` | EXTEND |

Nothing here can cannibalise: the seed is unique, the estate carries no stray pages
(verified §1), and agency/charities/care hold nothing in this family.

---

## 4. Screen: exclusions with reason codes (§9.2 step 3)

| Reason code | Rows held | What it is |
|---|---|---|
| EX-SUBSTRING | 2 | GSC `company statutory services` (1 imp), `statutory accounts st albans` (113 imps) — "sta-tutor-y" artefact, per C3_DEMAND §5 precedent. The same screen ran over all 3,853 D1 rows |
| EX-CAREER | 1 | `how much can childminders earn` (70/mo, caservices p52). Career-earnings intent, below the A* lead-intent bar, same code as the creative dossier |
| EX-OFFNICHE-FRANCHISE | 1 | `nursery franchise` (90/mo, KD 11, wearegolding p10). Buying-a-franchise intent. C2 row 82 (franchisees) is a separate generalist cluster with its own §21.5 ground truth; taking it here would pre-empt that cluster's own sizing |
| EX-EMPLOYER-SIDE (standing) | 0 | **D3 CLOSED at D1: zero nanny/au-pair rows in 3,853 harvested keywords.** No specialist domain ranks for it, so there is nothing to exclude and nothing to build. Not a demand finding (we did not price the term), a field finding |
| EX-CHARITY-PRESCHOOL (standing fence) | 0 | committee/charity-run preschool queries -> row 77 / charities site. No harvested row tripped it; the fence stays live in N3's copy because the audience overlap is real even where the query set is not |
| EX-GOV-OWNED (standing) | 0 | **Retired as a live code: D4 disproved its premise.** A peer holds p8 on `qualifying care relief 2025/26`, so the QCR informational head is NOT gov.uk-owned end to end. N5 builds |

Ledger balance over the FULL universe: **assigned 36 + already-covered 0 + excluded 4 +
deferred 0 = 40 = universe. BALANCES.** (already-covered legitimately zero: the seed's 13
impressions have no named family query in GSC — the page row's demand travels in E1's pack
as a do-not-lose entry.) Counted from the ledger CSV, not by hand.

---

## 5. Equity grading (§9.2 step 5; Bing first, conservative)

| Seed | Bing clicks/imps | Google clicks/imps/pos | Verdict |
|---|---|---|---|
| accountant-for-tutors-uk | 0 / 0 | **2 / 13 / 6.2** | **EXTEND** (Google clicks >= 1). Additive only: keep metaTitle, H1, H2 order; page already sits pos 6 on tiny impressions, a title change risks the one thing working |

All other targets are NO-PAGE: nothing to grade, nothing frozen. Frozen-ground check
(R.5 / §5.1 step 4): no generalist family page is in an armed `monitored_pages` window
(only one seed exists and it is not registered); re-verify against the live table at
pack derivation, standing rule regardless.

---

## 6. Proposed page plan (evidence-right-sized; C2 shape 3-5 + 3-5 + section)

**6 target surfaces: 5 net-new + 1 EXTEND. UNCHANGED after D1.** C2's sizing said up to
3-5 per niche; the on-file demand (200 + 140 + 10 = ~350/mo raw) supported exactly this and
no more, and D1's 31 rows land inside the same six buckets without opening a seventh.
**N2 and N5 are both CONFIRMED, not folded.** The plan is deliberately at the bottom of the
C2 range and stays there.

| # | Surface | Action | Evidence |
|---|---|---|---|
| N1 | accountant-for-childminders-uk | NET-NEW, sole-trader audience | head 90/mo at $16.39 CPC, 6+ specialist pages = strongest consensus |
| N2 | childminder expenses / wear-and-tear / MTD explainer | **NET-NEW, CONFIRMED** | 4 phrasings at 90/90/90/70 = 340/mo raw, the family's largest block; caservices' whole content layer is this topic and its p8 page date-tags its rates "(June 2016)" |
| N3 | accountants-for-nurseries (daycare, Ltd) | NET-NEW, company audience, distinct from N1; carries the charity-preschool fence | 5+ dedicated specialist pages; funded-hours/payroll/VAT-exempt substance |
| N4 | accountant-for-foster-carers-uk (QCR, tax return) | NET-NEW | `foster accountants` **170/mo** (new D1 head) + a 15-row service/return block at CPC up to $8.20; 5+ specialist pages incl. a £75-fixed-fee pure-play; every peer row sits p21-p63 |
| N5 | qualifying care relief Q&A (HS236 shape) | **NET-NEW, CONFIRMED** | D4 resolved: accountaxzone holds **p8** on `qualifying care relief 2025/26` with the wrong figures. gov.uk does not own this head end to end, and the year-tagged phrasing is the winnable slice |
| E1 | accountant-for-tutors-uk | EXTEND (additive only) | pos 6.2, 2 clicks; row 78 shape "section + 1-2 pages" is already satisfied by this one page at 10/mo; NO second tutor page unless D1 shows demand |

No hub page proposed at this volume (farming/creative precedent). All three niches join
the sole-trader blog family except N3 (limited-company family).

---

## 7. Audience, voice (§9.8 item 5)

Three registers, one per niche, stated once: (a) sole-trader childminders — individual,
consumer-plain, home-based-business figures (the reader does school runs, not
spreadsheets); (b) nursery owner-managers — small-company operator, payroll and funding
admin pain; (c) foster carers — individual SA, most owe no tax at all under QCR, and the
page must say so plainly rather than sell fear. Tone rule for N4/N5: foster carers are
doing care work, not running a growth business; keep off benefits-claim referral
entirely (C1 row 27 fence, RAO claims-management shape). Per `VOICE_STANDARD.md` and
generalist parity voice; formal language pass (§9.11) runs at pack derivation over the
specialist field's top pages.

---

## 8. Ground truth: house positions needed BEFORE writing (§9.8 item 6)

C1 status: rows 26 and 78 **CLEAR**, row 27 **CLEAR with the standing
benefits-claim-referral fence**.

**RESOLVED 2026-08-25, verified by reading the file, not assumed:**
`docs/generalist/house_positions.md` now carries **§19 "Care and education: foster carers,
childminders, nurseries, tutors" (locked figures, DRAFT 2026-08-25, care_education gate)**,
authored after this dossier's first pass. It covers all four GT items below:
§19.1 QCR, §19.2 childminders, §19.3 nurseries and preschools (including the row-77 fence
verbatim), §19.4 tutors. Owner question 1 in §10 is therefore **answered by events**: the
positions exist, the packs cite them by section number, and no surface is BLOCKED on ground
truth. §19's own three open questions travel into the packs as write-time verifications.

The original GT-0 list, kept for the record and because each item names what §19 must be
checked against at write time:

1. **Qualifying care relief figures, current year** for N4/N5: fixed annual amount +
   weekly amounts per child/adult by age, CPI indexation status, simplified vs profit
   method election, HS236 as the anchor source, Class 2 NIC credit position for foster
   carers, shared lives/kinship/staying-put scope.
2. **Childminder expenses position** for N1/N2: the HMRC/PACEY 10% wear-and-tear
   concession and its current status under MTD ITSA, food/heating/council-tax
   hours-based apportionment, simplified expenses vs actual, home-use rules,
   Ofsted-registration costs deductibility.
3. **Nursery provider position** for N3: funded-hours (15/30) income treatment and
   Tax-Free Childcare receipts in provider accounts, VAT exemption for Ofsted-registered
   childcare (welfare exemption) and its partial-exemption consequences, staff
   payroll/auto-enrolment, PLUS the scope fence: charity/committee-run preschools and
   anything academy-shaped -> charities site (row 77), written into the position so the
   row-77 build lands later with zero overlap.
4. **Tutor trading-allowance boundary** for E1: £1,000 trading allowance vs registration,
   side-hustle reporting (platform-reporting rules), employed-teacher-with-tutoring
   interaction, DBS/exam-board/marketplace fee deductibility. E1's current copy must be
   re-checked against this lock at pack time (it predates it).

---

## 9. Delta list — DELTA_care_education_2026-08-25

| # | Item | Status |
|---|---|---|
| D1 | Complete the 7-domain uncapped harvest, re-strike §2/§4 and FREEZE | **CLOSED 2026-08-25.** $0.5584, 8 calls, 3,853 rows, 31 family rows, §0.1 |
| D2 | Free expansions (autocomplete/PAA) for the 3 head families | **STILL OPEN.** Not run. Free, so not gate-blocked, just not done; it adds phrasings inside existing surfaces, never a surface, so it does not block the freeze or the packs |
| D3 | Nanny/au-pair payroll ("nanny tax") intent | **CLOSED, no action.** Zero rows in 3,853. No specialist domain competes; no page proposed |
| D4 | N5 SERP read (is QCR informational head gov.uk-owned end-to-end?) | **CLOSED, N5 BUILDS.** accountaxzone p8 on `qualifying care relief 2025/26` proves a peer can hold the head |
| D5 | Persist raw harvest into `dataforseo_competitor_data` | **STILL OPEN.** Rows persisted to `care_education_2026-08-25_ranked_raw.json` only, same gap the creative dossier logged. Estate-wide item, not this cluster's to fix |
| D6 | `accountant-for-schools-uk.md` sits on C2 row 77's gated ground on the wrong site | **NEW, opened at D1** (§1, §11). Zero overlap with this family, so it does not block anything here. Owned by the charities build |

---

## 10. Open questions for the owner (batched; none blocks D1)

1. ~~House positions (§8 items 1-4) must be authored and locked before any page is
   written.~~ **ANSWERED BY EVENTS.** `house_positions.md` §19 exists and covers all four.
   No decision needed.
2. ~~The daily DataForSEO gate ($5) is being consumed same-day by parallel dossier
   sessions.~~ **ANSWERED.** The owner lifted the gate for 2026-08-25 only; D1 ran and cost
   $0.5584. The underlying question survives and is worth one line: parallel dossier
   sessions will keep colliding on a single estate-wide daily budget. Nothing to decide
   today.
3. Plan is 6 surfaces (5 net-new + 1 extend), the bottom of C2's 3-5+3-5 sizing,
   because measured demand is ~350/mo across all three niches. **Still open.** D1 did not
   change the answer, but it did strengthen the case: `foster accountants` at 170/mo is
   more than double the on-file head, and every peer ranking for it sits below p20.

---

## 11. Cannibalisation register (differentiate-or-defer; never collapse)

Full sweep of `generalist/web/content/blog/` for this family plus the two watch items
named in the pack brief. Nothing is collapsed, nothing is redirected: the house rule is
rewrite-and-differentiate, always.

| Page | Overlap with this family | Verdict |
|---|---|---|
| `accountant-for-tutors-uk.md` | It IS the family's seed | **EXTEND (E1)**, additive only. No conflict |
| `do-i-need-a-separate-business-bank-account-uk.md` | 1 passing childminder mention | No action. Conflict-check only |
| `how-to-sell-a-care-home-business.md` | Row 24 (care site) business-sale page; zero nursery content | No action. Different niche, different transaction, no shared query |
| `accountant-for-schools-uk.md` | **Measured zero** (0 mentions of nursery, childminder, early years, preschool, childcare, foster). Academy-shaped: 29 "academy", 8 "audit" | **DIFFERENTIATE, do not defer, do not collapse.** N3 does not touch it because N3's own position (§19.3) fences charity and academy ground out by construction. Flagged to the charities build as D6: it is a live page on C2 row 77's gated ground |
| `accountant-for-churches-uk.md` | Measured zero | No action here. C2 row 76 places churches on `charities`; same D6 flag, lower stakes |

**Standing rule for the writers:** if an N3 draft starts explaining academy trusts, funding
agreements, regularity assurance or charity SORP, it has crossed into row 77 and the
paragraph comes out. The N3 fence paragraph (§19.3) is what prevents the overlap, and it is
mandatory, not optional.
