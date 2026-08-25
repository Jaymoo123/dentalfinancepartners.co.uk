# Cluster dossier: care_education family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2/§9.7/§9.8.

**STATUS: PROVISIONAL — HARVEST INCOMPLETE, FREEZE DEFERRED (see §0). Everything found
after the eventual freeze goes to the delta list §9 (named:
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
| Competitor ranked_keywords, 7 specialist domains, uncapped | INCOMPLETE | pending (counts §0) | **the freeze blocker** |

**Held universe = 11 rows** (7 on-file head/equivalence/cluster-remainder rows + 2 pool
+ 2 screened FPs). Row-level
record: `care_education_2026-08-25_ledger.csv` (same directory). Free expansions
(autocomplete/PAA) NOT run: stated limitation, queue with D1.

---

## 2. Consensus topic map (§9.8 item 2) — provisional, from page-structure evidence

Keyword-union clustering awaits D1. What the field's own PAGE STRUCTURE already shows
(free crawl + SERP sweep; caservices runs exactly this split, and it is the only
domain specialising in all three sub-niches):

| Topic | Independent domains running a dedicated page | Est. vol/mo (on-file) | Note |
|---|---|---|---|
| Accountant for childminders (sole trader) | 6+ (caservices, swan-books, vanilla, qaccounting, auditox, taxbite, deadsimple) | 90 head, 200 cluster | strongest consensus in the family |
| Childminder expenses / 10% wear-and-tear / MTD ITSA | 2 confirmed (caservices content layer, accountaxzone-adjacent) | inside cluster 200 | HMRC-concession explainer shape |
| Foster carer tax / qualifying care relief | 5+ (octopusfostering, tax-wise, caservices, accountaxzone, reactaccountancy, bkplus) | 70 head, 140 cluster | SERP head owned by gov.uk HS236 + LITRG; peer-winnable slice = service/"accountant for" variants, not the naked relief term |
| Nursery / daycare accountants (Ltd, funded hours, payroll) | 5+ (hazlewoods, wearegolding, agile, apex, bradleys) | inside cluster 200 | DISTINCT audience from childminders: companies, staff payroll, funding-stream reconciliation |
| Tutor tax / accountant for tutors | 0 specialists (sector pages only) | 10 | our seed already at Google pos 6.2 on 13 imps |

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
| Childminder expenses / wear-and-tear / MTD | net-new N2 (provisional pending D1) | NO-PAGE -> NET-NEW |
| Nursery / daycare accountants | net-new N3 | NO-PAGE -> NET-NEW |
| Foster carer tax + accountant (QCR) | net-new N4 | NO-PAGE -> NET-NEW |
| Qualifying care relief explainer / HS236 Q&A | net-new N5 (provisional pending D1) | NO-PAGE -> NET-NEW |
| Tutor tax / accountant for tutors | `accountant-for-tutors-uk` | EXTEND |

Nothing here can cannibalise: the seed is unique, the estate carries no stray pages
(verified §1), and agency/charities/care hold nothing in this family.

---

## 4. Screen: exclusions with reason codes (§9.2 step 3)

| Reason code | Rows held | What it is |
|---|---|---|
| EX-SUBSTRING | 2 | GSC `company statutory services` (1 imp), `statutory accounts st albans` (113 imps) — "sta-tutor-y" artefact, per C3_DEMAND §5 precedent |
| EX-EMPLOYER-SIDE (standing, applies at D1) | 0 yet | nanny payroll / "nanny tax" = parents as employers; different audience, defer to a named decision if D1 surfaces volume |
| EX-CHARITY-PRESCHOOL (standing fence) | 0 yet | committee/charity-run preschool queries -> row 77 / charities site |
| EX-CAREER (standing, applies at D1) | 0 yet | "how much do childminders earn", "how to become a foster carer/tutor" — same A* lead-intent bar as creative dossier's EX-CAREER |
| EX-GOV-OWNED (standing, applies at D1) | 0 yet | naked `qualifying care relief` / HS236 informational head where gov.uk + LITRG own the SERP end-to-end; peer-winnable slice is the "accountant for" layer |

Ledger balance over the HELD universe: **assigned 9 + already-covered 0 + excluded 2 +
deferred 0 = 11 = held universe. BALANCES.** (already-covered legitimately zero: the
seed's 13 impressions have no named family query in GSC — the page row's demand travels
in E1's pack as a do-not-lose entry.) The full-universe balance is re-struck at D1
before freeze.

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

**6 target surfaces: 5 net-new + 1 EXTEND.** C2's sizing said up to 3-5 per niche; the
on-file demand (200 + 140 + 10 = ~350/mo raw) supports exactly this and no more. N2 and
N5 are confirmed or cut at D1; the plan is deliberately at the bottom of the C2 range.

| # | Surface | Action | Evidence |
|---|---|---|---|
| N1 | accountant-for-childminders-uk | NET-NEW, sole-trader audience | head 90/mo at $16.39 CPC, 6+ specialist pages = strongest consensus |
| N2 | childminder expenses / wear-and-tear / MTD explainer | NET-NEW, provisional (D1 confirms or folds into N1 as H2s) | caservices' whole content layer is this topic |
| N3 | accountants-for-nurseries (daycare, Ltd) | NET-NEW, company audience, distinct from N1; carries the charity-preschool fence | 5+ dedicated specialist pages; funded-hours/payroll/VAT-exempt substance |
| N4 | accountant-for-foster-carers-uk (QCR, tax return) | NET-NEW | head 70/mo, 5+ specialist pages incl. a £75-fixed-fee pure-play |
| N5 | qualifying care relief Q&A (HS236 shape) | NET-NEW, provisional (D1 + a SERP read decide: gov.uk may own it end-to-end -> fold into N4) | LITRG/gov.uk head; peer-winnable slice unproven |
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
benefits-claim-referral fence**. `docs/generalist/house_positions.md` carries **zero**
care/education positions. GT 0: lock these first; this dossier does not author them:

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

| # | Item | Reason parked |
|---|---|---|
| D1 | **Complete the 7-domain uncapped harvest, then re-strike §2/§4 and FREEZE** | daily `DATAFORSEO_ABORT_AT` gate consumed by parallel sessions; §0 has the exact re-run spec (~$0.40) |
| D2 | Free expansions (autocomplete/PAA) for the 3 head families | run with D1 |
| D3 | Nanny/au-pair payroll ("nanny tax") intent | employer-side audience; decide only if D1 shows volume |
| D4 | N5 SERP read (is QCR informational head gov.uk-owned end-to-end?) | decides N5 build-or-fold at D1 |
| D5 | Persist raw harvest into `dataforseo_competitor_data` | with D1 (same gap the creative dossier logged) |

---

## 10. Open questions for the owner (batched; none blocks D1)

1. House positions (§8 items 1-4) must be authored and locked before any page is
   written. Approve authoring as the first Stage 3 task for this cluster?
2. The daily DataForSEO gate ($5) is being consumed same-day by parallel dossier
   sessions; this cluster's harvest needs ~$0.40 of headroom on another day. OK to
   finish it next session (recommended), or raise the daily gate for the dossier sweep?
3. Plan is 6 surfaces (5 net-new + 1 extend), the bottom of C2's 3-5+3-5 sizing,
   because measured demand is ~350/mo across all three niches. Confirm right-sizing
   down is acceptable.
