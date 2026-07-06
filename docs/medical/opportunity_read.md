# Medical — Opportunity Read (battery step B6)

Author: B6 (opportunity read, Opus). Date: 2026-07-06. Raw artifact: `.cache/medical_diag/serp_sample.json`.
Scope: 668-topic gap pool (`docs/medical/topic_gaps_first_cut.md`) diffed against the live corpus (73 blog posts + core routes), a 12-query gap-topic SERP sample, and demand cross-check against GSC/Bing query data. I own GAP queries; head/brand queries belong to sibling B2 and are excluded here.

## DATA-TRUST HEADER (cite in any downstream verdict)
- GSC (Google) data exists ONLY 2026-04-01 → 2026-07-04; API-confirmed EMPTY before April (site earned zero impressions pre-April — real, not an auth artifact). Windows: pre = Apr 1–May 19 (thin), mig = May 20–Jun 17 (46 legacy canonicals pointed at a phantom never-registered domain until fixed Jun 17), post = Jun 18–Jul 4.
- Bing snapshots 2026-06-03 → 2026-07-06 (rolling trailing-window aggregates; matched-length windows only; no pre-May Bing data can exist).
- Absolute counts sit beside every rate. Medical is a tiny-denominator site (7 leads total, ~238 sessions/30d): rates with denominator < 20 are suppressed.

## Absolute numbers this read stands on
- **Google, whole life of site (Apr 1–Jul 4):** 93 distinct queries, 2,187 impressions, **0 clicks.** Post-canonical-fix slice (Jun 18–Jul 4): 43 distinct queries, 452 impressions, **0 clicks.** Positions cluster at 40–90 (page 4–9).
- **Bing (Jun 3–Jul 6):** 537 distinct queries, 1,654 impressions, **157 clicks.** Positions frequently 1–10; this is where the site actually earns engagement.
- Corpus: **73 live blog posts** + core routes (3 calculators, 4 `/for-*` audience pages, 6 `/medical-guides`, locations, `/nhs-pension`, `/services`, 6 resource guides, 8 blog category hubs).

## 1. White-space diff (668 pool → true gaps)

The 668 figure is an inflated upper bound. After (a) dropping generalist/housekeeping noise and (b) loose-matching against the 73 posts + core routes, the genuine, specialist, un-covered net-new white-space collapses to roughly **8–12 topics, concentrated in a single cluster.**

Bucket-by-bucket verdict (specialist buckets only; the big buckets are noise):
- **Other/uncategorised (252), VAT & medical compliance (130), Payroll/pensions/staff (63), MTD (17):** almost entirely generalist noise or competitor housekeeping (azets Nordic pages, doctor bios, testimonials, awards, careers, NI-number how-tos). Not medical-specialist demand. The one live-demand exception is VAT medical-exemption (see below) which is already covered.
- **NHS pension scheme (16):** COVERED — 8 dedicated posts (mccloud, scheme-pays, partial-retirement, annual-allowance, tapered, tax-charges, locum form A/B, pension contributions) + `/nhs-pension` + calculator + guide. Thin residual: "which section am I in (1995/2008/2015)" and "is my NHS pension record accurate" — but partial-retirement page already carries 17 section/allowance mentions, so these are fold-ins, not net-new.
- **BADR & capital gains (25):** the medical angle (selling a practice, goodwill) is COVERED by `selling-private-medical-practice-cgt-badr` + `can-gp-practice-goodwill-be-sold-nhs-rules` + `incorporation-relief-...-s162`. The other 22 are generic medicaccountants.co.uk reposts (current CGT rates, rollover, gift hold-over) = generalist noise.
- **Buying/selling a practice & goodwill (17):** mostly Brexit-era noise; medical covered by buy-in / financing / goodwill / merger / retiring posts. Residual ~0.
- **Incorporation & profit extraction (15):** COVERED by 5 incorporation posts. Residual: "salary vs dividend for a medical/private-practice Ltd" (thin — overlaps `gp-limited-company-tax-benefits-drawbacks`).
- **PCN & primary care networks (19):** ~90% azets housekeeping noise; medical covered by 3 dedicated PCN posts (network-contract DES, clinical-director pay, ARRS). Residual ~0.
- **Locum doctor tax (12):** SATURATED — 6 dedicated posts + calculator + 2 guides. Residual ~0.
- **Premises & property (11):** COVERED by 4 premises posts; SDLT is already substantially handled inside `gp-surgery-premises-own-vs-rent-tax-guide` (31 SDLT/stamp-duty hits). Residual thin (rollover-relief-on-premises reinvestment).
- **GP partner & partnership tax (10):** SATURATED — 11 dedicated posts. Residual ~0.
- **Private practice & consultant income (8): THE genuine gap cluster.** DLA, FIC, surplus-company-funds, expert-witness/medico-legal income — none exist in the corpus, each is a distinct specialist topic with a live competitor page (nicholsmedical).
- **Type 1/2 pension certification (1):** genuine thin gap — no dedicated "Type 1 vs Type 2 medical-practitioner certificate" page (locum form A/B is a different thing).
- **CQC/GMC (7), IR35 (2), salaried (3), NHS contracts (5), junior (1):** covered or noise (GMC fee is a covered mention; salaried-GP is a `/for-*` landing candidate, not blog).

**Competitor-count signal ([xN]):** the high-count tags are all noise or already-covered heads — `hospital-doctors`[x3]/`salaried-gps`[x3] (audience landing pages, not gaps), `making-tax-digital-for-income-tax`[x3] (generalist), `vat`[x2], `auto-enrolment`[x2]. Every genuine specialist gap below is [x1] — i.e., the depth of the corpus already absorbed the multi-competitor topics.

## 2. SERP sample (12 gap-topic queries)

**Google via Serper: UNAVAILABLE this run (fail-loud).** Serper returned HTTP 400 `{"message":"Not enough credits"}` on all 12 queries. The key is valid (40 chars); the account balance is exhausted. Google SERP composition for gap topics therefore could not be sampled directly; I substitute Bing-family (DDG) results plus the GSC positional data (which shows the site sitting pos 40–90 on Google for every query it appears on). **Do not read the absence of Google SERP data as a zero-finding — it is a spend/quota outage to record and, if wanted, retry once Serper credits are topped up.**

**Bing-family (DDG): all 12 queries returned OK.** Who ranks, by gap:

| gap | specialist hits (top 8) | SERP dominated by | winnable? |
|---|---|---|---|
| nhs_pension_section | 0 | NHS/gov (nhsbsa, nhsemployers, bma, bmj) | gov-walled; low accountant angle |
| type2_certificate | 0 | PCSE/NHSBSA/BMA + a few generic firms (bhp, ballards, lovewell-blake) | winnable accountant angle, gov-heavy |
| consultant_dla | 1 (nicholsmedical #1) | gov + generic (rossmartin, unbiased, accountants4nhsdoctors) | **yes — winnable** |
| consultant_fic | 3 (nicholsmedical #6-8) | consultancy/LinkedIn noise + nichols | **yes — winnable** |
| medicolegal_income | 0 | generic tax firms + expert-witness sites (churchill, jspubs, expert-evidence) | **yes — pure white-space, no medical specialist** |
| sdlt_premises | 0 | healthcare solicitors (vwv, drsolicitors) + BMA/NHS/gov | winnable but already mostly covered on-site |
| mtd_itsa | 0 | gov.uk + generic landlord sites | generalist, not medical-differentiated |
| salary_dividend_medco | 1 (larking-gowen #8) | generic calculators/blogs | generalist, low medical angle |
| mpaa_partial_retire | 0 | pension providers + gov | overlaps existing partial-retirement post |
| consultant_surplus | 1 (nicholsmedical #2) | generic accountants (cruseburke, jondavies) | **yes — winnable** |
| cgt_rollover_premises | 0; **medicalaccounts.co.uk appears #5** | gov + rossmartin | already discoverable on Bing |
| llp_gp_practice | 1 (medicsmoney #2); **medicalaccounts.co.uk appears #4** | solicitors + BMA/gov | already discoverable on Bing |

Two structural reads from this:
1. **Gap SERPs are NOT walled by the medical-accountant specialists.** They are dominated by NHS/gov official sources and fragmented generic tax/law firms. Only nicholsmedical (consultant cluster) and the occasional medicsmoney/larking-gowen show up. A genuinely authoritative medical page would compete — the moat is thin.
2. **The site is already indexed/rank-able on Bing** (it self-appears at #4–#5 on two specialist long-tails), consistent with 157 Bing clicks. The failure is Google-specific (0 clicks ever, pos 40–90), aligning with the sibling findings (P2.t1: 4/4 core pages "unknown to Google"; B4 phantom-canonical).

## 3. Ranked opportunity clusters

Ranked by (specialist relevance × SERP winnability), with the demand caveat applied honestly.

**OPP-1 — Consultant / private-practice limited-company advanced cluster (strongest genuine white-space).**
Topics: directors' loan account for a consultant Ltd; family investment company for NHS consultants; what to do with surplus company cash; (adjacent) salary vs dividend for a medical Ltd. Why: the only specialist-relevant bucket ("Private practice & consultant income", 8 topics) with zero corpus coverage; each is a discrete, high-intent, advisory-grade topic. Competitor evidence: nicholsmedical.co.uk owns dedicated pages and ranks (consultant_dla #1, consultant_fic #6-8, consultant_surplus #2 on Bing); the rest of each SERP is generic. Demand evidence: near-zero measured — "accountants for nhs consultants" 1 impr (GSC), "medical consultant pension tax" 6 impr / 3 clicks (Bing, but that is pension not company-structure). Difficulty: MEDIUM — winnable SERP, but advanced/low-volume and demands genuinely authoritative writing (not thin).

**OPP-2 — Medico-legal / expert-witness income for doctors (pure white-space).**
Why: a real consultant income stream with NO medical-accountant specialist ranking at all (SERP is churchilltaxation, jspubs, expert-evidence, expertwitness.co.uk). Competitor evidence: ramsaybrown has an `expert-witness-services` page ([x1]); nichols does not rank. Demand evidence: none measured. Difficulty: MEDIUM (open SERP) but LOW volume; a single strong page could own it.

**OPP-3 — NHS-pension foundational singletons (fold-in, not net-new).**
Topics: "which section of the NHS pension am I in (1995/2008/2015)"; "Type 1 vs Type 2 medical-practitioner pension certificate"; MPAA after partial retirement. Why: genuine sub-topics with live demand-shape on Bing (pension queries pos 1-10). Competitor evidence: bw-medical/sial [x1] each. Demand evidence: strong Bing pension demand exists but maps to ALREADY-covered pages (annual-allowance, partial-retirement, scheme-pays). Difficulty: gov-walled SERPs (nhsbsa/bma dominate) → HARD to rank net-new. Recommendation: FOLD these into the existing pension posts as sections, do NOT write standalone.

**OPP-4 — Everything else in the 668:** either already covered or generalist noise. **Do not write.** No blind volume.

## 4. Honest difficulty read
- The corpus is already specialist-saturated in exactly the buckets that carry demand (locum forms, NHS pension AA, GP-partner NI, expenses/CPD, buying-in, VAT exemption). The measured demand — Bing especially — lands on topics we already cover.
- The genuine white-space is thin (~8–12 topics), single-cluster, [x1]-only, and low-volume. Its SERPs are winnable (not specialist-walled) — but only for a site that can rank at all.
- Google is the binding constraint: 2,187 impressions, 0 clicks, ever; positions 40–90. Bing works (157 clicks) but Bing is the smaller pond and the site already ranks there.

## 5. SEQUENCING — READ THIS FIRST (the headline)
**Opportunity/content work must queue BEHIND Google index/discovery repair. Do not commission net-new content now.**

Evidence: 73 already-published specialist posts that DO cover the live demand earn **0 Google clicks across 2,187 impressions over the whole life of the site** (positions 40–90), while the sibling coverage sweep (P2.t1: 4/4 sampled core pages "URL is unknown to Google") and the phantom-canonical forensics (B4: 46 legacy canonicals pointed at a never-registered domain until 2026-06-17) point to a discovery/indexing failure, not a topic-gap failure. Adding more posts to a site Google is not indexing is pouring content into a hole.

Recommended order:
1. **FIRST: fix Google discovery/indexing** (sitemap processing / canonical residue / crawl — owned by B3/B4 + the fix backlog). Prove it worked by watching the existing 73 posts start earning Google impressions→clicks (the Jun-18 canonical fix is only ~2 weeks old; a maturation window to ~mid/late-July is owed before declaring anything).
2. **ONLY THEN: a SMALL, targeted net-new batch** — OPP-1 (consultant Ltd cluster, ~3–4 posts) and OPP-2 (medico-legal income, 1 post). Fold OPP-3 into existing pension pages. Total genuine net-new ceiling is ~5 posts, not a wave.
3. Never recommend volume for volume's sake; medical's quality-and-indexing constraint, not topical coverage, is what's throttling it.

## Errors / caveats recorded (fail-loud)
- Serper (Google SERP) exhausted its credit balance → HTTP 400 "Not enough credits"; Google SERP composition for gaps was NOT sampled this run. Bing-family (DDG) covered all 12 queries successfully. Retry Google sampling only if Serper is topped up.
- Demand figures for gap topics are near-zero by construction (gaps = topics with little/no current impression footprint); absence of demand here is expected and is itself part of the "don't chase volume" verdict, not a data error.
- All GSC click figures are literally 0 — not suppressed-low, actually zero.
