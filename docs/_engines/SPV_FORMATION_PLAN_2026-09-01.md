# SPV formation programme, scope and targeting plan (2026-09-01)

Status: DISCOVERY COMPLETE, NO CONTENT STARTED (owner instruction). Build is gated on the
decisions in §8. Research artefacts: `expansion_research/spv_formation/` (demand_corpus.csv
9,762 keywords, competitor_urls.csv 9,304 URLs, questions_corpus.csv 1,700 questions,
DEMAND_MAP.md, COMPETITOR_FOOTPRINT.md, QUESTIONS.md, OUR_DEMAND.md). Market sizing and
economics: MONETISATION_MAP_2026-09-01.md Lane B.

## 1. Objective

Own the organic funnel for UK landlord SPV / buy-to-let limited company formation and
running, and monetise it with our own formation product (setup fee + recurring registered
office / filings / support) plus the cross-sell stack (ltd-co BTL mortgage introduction,
bank referral, accountant lead). Positioning: the specialist authority option between £13
commodity agents and GetGround's ~£1,270 year one. Target window: the incorporation wave
into the Apr 2027 property income tax rise; s162 relief claims mandatory from 6 Apr 2026.

## 2. The market in four numbers

~70k new BTL companies/yr (66,587 in 2025, Jan 2026 +11% YoY); 443k stock; ~71k/mo of
on-topic UK search demand once generic noise is stripped; 0 specialist brands owning the
SERP (GetGround absent from top 6 on all 12 checked head terms; rankers are brokers,
lenders, accountant blogs and commodity agents of beatable authority).

## 3. Who we are targeting (segments, from the data)

1. **First-time incorporating landlord** (form-now bucket): decided or nearly decided,
   searching setup mechanics, SIC codes, costs. The direct customer.
2. **Portfolio transferrer** (transfer-in): owns personally, moving stock in; SDLT/CGT/s162
   questions and calculator intent (stamp duty calculator limited company 1,000/mo). Higher
   value, advice-shaped, feeds the mortgage introduction (day-one remortgage).
3. **Mortgage-first searcher** (mortgages, 41.7k/mo SPV-specific): shopping ltd-co BTL
   rates; enters through mortgage content, needs an SPV to complete. Feeds formation AND
   the introducer fee.
4. **Running-the-company landlord** (SIC/admin, tax-in-company, extraction, selling/closing
   questions): already has the company; buys the recurring services, switches agents,
   becomes an accountant lead.
5. **Non-resident/expat landlord**: small search corpus (280/mo + 27 questions) but
   GetGround charges a 70-90% premium here, so worth one hub, not a cluster.

## 4. What we are targeting (clusters, volumes, sources)

| Cluster | Search signal | Long-tail Qs | Competitor coverage | Verdict |
|---|---|---|---|---|
| Ltd-co BTL mortgages | 41,660/mo | 131 | 1,750 URLs / 14 domains | EXTEND Track B (15 pages, LIVE since Aug deploys, verified 200 on 2026-09-02), do not duplicate |
| Formation mechanics + costs | 21,210/mo raw; targeted terms ~380/mo | 49 | 188 URLs / 14 domains | BUILD, anchored on cost + how-to + product pages |
| SIC + Companies House admin | modest vol | **421** | inside specialists only | BUILD as Q&A block, biggest long-tail prize |
| Transfer-in (SDLT/CGT/s162) | 7,530/mo, calculator-shaped | 91 | 106 URLs / 15 domains | BUILD, calculator-led |
| Run-the-company + extraction | 540/mo | 171 | 220 URLs / 15 domains | BUILD Q&A + guides, feeds recurring product |
| Selling + closing the company | thin vol | 75 | thin | BUILD Q&A, nobody owns it |
| Ownership structures (spouse/kids/holdco/trust/JV) | thin vol | 41 | thin | BUILD Q&A |
| Non-resident | 280/mo | 27 | 85 URLs / 12 domains | one hub page + sections |
| Incorporate-or-not | 50/mo search | in misc | **20 URLs / 10 domains, thinnest cluster** | BUILD as conversion asset + AIO/GEO answer surface, not for search clicks |

Coverage-over-selection applies: zero-volume Q&A pages are wanted. The 694 misc questions
get triaged into the clusters above during architecture.

Two whitespace findings to exploit:
- **No competitor anywhere has an SPV-specific calculator suite** (only BTL mortgage
  calculators). We have the calculator engine and existing incorporation/SDLT/section-24
  calculators to adapt. Calculator set: incorporate-vs-personal comparison, SDLT on
  transfer/purchase via company, transfer total-cost (SDLT+CGT+fees), extraction
  (salary/dividend from a property company), SPV running-cost.
- **Incorporate-or-not is unowned** despite being the funnel entrance; near-zero search
  volume but it is the conversion and AI-answer surface.

## 5. Where it lives + where we already stand

Host decision is the owner's (§8): Property (Property Tax Partners) vs a new formation
brand/domain. Data points: estate has near-zero link equity to forfeit (2026-08-08 pull),
so new-domain cost is brand-building time only; Property already holds the surrounding tax
authority (~450 clicks/90d on incorporation/company pages, 791-page corpus, 20.9 leads per
100 pages) and the undeployed Track B SPV mortgage cluster; but Property is an accounting
brand and a formation PRODUCT changes its shape. A split is possible: content authority on
Property, product pages on the formation domain, cross-linked.

Hard prerequisite either way: de-cannibalisation pass against Property's live corpus before
any page list is final (Property already owns 6+ BTL-mortgage pages and much transfer-in
tax content; the 2026-07-30 expansion learned this the right way).

## 6. Product shape (hypothesis for owner sign-off)

Setup £400-£600 (SPV-correct SIC and articles, lender-and-solicitor-facing pack, ID
verification, bank referral) + recurring £300-£600/yr (registered office, service address,
mail scanning, confirmation statement, deadline management, support). Exact tiers priced at
sign-off against GetGround (£696 + £576/yr), Provestor (£15.83-£89/mo) and the £140
commodity floor. Cross-sell per customer: BTL mortgage introduction £500-950, bank £50,
accountant lead £85+, plus the annuity.

## 7. Ops and regulatory path (sequenced, not started)

1. HMRC TCSP AML supervision: £300 application + £400/premises/yr + £500 fit-and-proper.
   Longest lead item, start first on GO.
2. Companies House ACSP registration (£55, rising to £63 from Feb 2026): required to file
   for clients and verify identities; third-party filing becomes ACSP-only ~Nov 2026.
3. Wholesale registered-office / mail-scanning partner selection.
4. Build: order flow, CH API filing, IDV provider, GoCardless/Stripe recurring billing.
Entry cost ~£1,300-1,600 year one. None of this blocks content; content blocks on §8.

## 8. Owner decisions (the gates)

1. Host: **TAKEN 2026-09-01, Property** ("keep it on property site as we have the equity").
2. Product tiers and prices (§6 hypothesis). OPEN.
3. AML/ACSP registration: **PARKED by owner 2026-09-01** ("ignore AML stuff"). Revisit
   before the product goes live; content does not need it.
4. GO on content build. Architecture + de-cannibalisation GO'd 2026-09-01 and running;
   content writing still gated.

## 8b. Head term (settled 2026-09-01)

The generic giant "set up a limited company" (14,800/mo, £55 CPC) is WRONG-intent (generic
company registration, Companies House searchers, KD-cheap but not our buyer). The true
on-topic head family is **"spv company" (720/mo) + "set up spv company" + "spv company set
up cost" + "spv for property" (210/mo)**, held today by lenders/brokers (YBS, Practical
Law, commercialtrust) with no specialist owner. The pillar targets that family; the bigger
adjacent head "limited company buy to let mortgage" (2,400/mo) belongs to the Track B
mortgage cluster, not the pillar.

## 9. Build sequence (Phase A DONE 2026-09-01)

**Phase A architecture: COMPLETE. The page map is `expansion_research/spv_formation/
PAGE_MAP.md` + `page_map.csv` (51 units: 17 NEW incl the root pillar `/spv-company` and 1
new calculator, 12 EXTEND incl 2 calculator upgrades, 15 COVERED, 7 RESERVED Track B).**
Reality check from the triage: after dedupe and UK-relevance filtering the 1,700 questions
collapse to 664 property-relevant units, so the honest build is ~30 pages + 3 calculator
actions, not 150-250; this is a coverage and conversion play, not a traffic play. Track B's
15-page SPV/BTL finance cluster is BUILT AND ON DISK under category Property Finance
(RESERVED). Two pages rank 1.5-3.9 on transfer intent and are PROTECTED. Biggest single
uncovered head term found: "closing a limited company" 2,400/mo. Ten cannibalisation seams
are documented in PAGE_MAP.md §9, including the U36 trap (13 "sell my house to my own
company" questions are transfer intent, FAQ block only, never a page). Query-formulation
rule is in PAGE_MAP.md §4 and page_map.csv `query_variants`, inherited by every brief.

Head-term volume reconciliation: PAGE_MAP.md caveat 1 says "spv company 720/mo is not in
our corpus"; that is true of the Labs-derived demand_corpus.csv, but the figure IS verified,
pulled live from Google Ads search_volume (location UK) on 2026-09-01 in the SERP check.
Both statements stand; the 720/mo is real.

**WAVE 1 COMPLETE 2026-09-01, commits `65be9c4d` (Wave 0 briefs) + `c7f95e31` (build).**
Shipped locally, NOT pushed, NOT deployed: pillar /spv-company (router, sitemap), 3 new
posts (formation cost, company allowable expenses, how-to-close at the 2,400/mo head),
4 full rewrites (U17/U18/U19/U20, both portfolio pages de-conflicted in one wave), U02
extend (CH walkthrough), C1+C2 calculator extensions (additive, goldens prove no change
for existing inputs; embeds untouched). QA = 3 Opus tracks; factual recomputed every
worked example and caught 2 HIGH arithmetic errors + a repeat of the logged s.116(7)
correction; query-coverage verified every variant set; editorial unified currency/percent
conventions. Gates green: validator 0 errors, 1,540 tests, tsc, production build.
U45 died in Wave 0 (personal guarantees already covered). house_positions gained §42
(closing-company ground truth); note §29 was already taken, the SPV block is §42.
U19 ceded "cheapest way to incorporate property" (Bing pos-1, 7 impr) to U17 by design.

**WAVE 2 COMPLETE 2026-09-02, commits `093487e8` (briefs) + `2d20615a` (build).** 9 new
pages + NRL-guide company-path extend + property-company-extraction-calculator (new
employerNic lib, fleet 27 tools). Brief gate caught the NRL4/NRL6 premise error at source
(NRL2 = company form). Factual QA verified 6 sources live and fixed a stale 15%->17%
Sch 4A rate, a share-route netting error and pre-ECCTA PSC framing; coverage 10/10 after
sentence-scale fixes; editorial: 17 tables thead-wrapped, boilerplate openers rewritten.
All gates green (1,546 tests). Pillar wired to every Wave 2 page.

**WAVE 3 CONTENT COMPLETE 2026-09-02, commits `d9bdc3d0` (briefs) + `8632321b` (build,
GATES PENDING).** 3 new pages (name rules, SIC change, Scotland/Wales company landlord
registration) + 3 extends (VAT, group relief opener, insurance) + pillar wiring + combined
QA applied (SIC leak fixed, Welsh paper-licence fees corrected, missing FAQs added). FAQ
anchors stripped in 2 Wave 2 files (FAQ answers render as plain text; NOTE: 100+ LEGACY
posts site-wide embed HTML in FAQ answers, a probable long-standing cosmetic defect, owner
decision needed on a separate sweep).

## EXECUTED 2026-09-02 (all resume-point steps done)

Step 0 equity check PASSED (PROTECTED pages zero-diff; slugs/canonicals/categories unchanged
on all 9 edited units; U18 3-year-trap H2+FAQ kept; U19 "cheapest way" covered on U17 as
designed; baselines from the 2026-09-01 pull). Gates green (validator 0 errors, 1,546 tests,
tsc, build). Pushed `2422c82e` (9 SPV + 14 Medical wave C commits). 15 sites deployed to
production from clean worktree, all aliased and verified 200, incl /spv-company + 3
calculators. monitored_pages: 16 net_new rows inserted (monitor_until 2026-12-01); the 9
rewrites were already registered with baselines from the 2026-07-08 bulk pass. CI noise: 1
red Content Quality run on the push (U43 lacked h1/summary, legacy fields, fixed in the
follow-up commit). Track B was found ALREADY LIVE (shipped with the Aug deploys; the
"undeployed" note here was stale). Owner 2026-09-02: product side stays parked.

FAQ-HTML defect: verified 69 posts estate-wide (50 Property + 19 across 9 sites) carry HTML
tags inside frontmatter FAQ answers; accordion renders them as escaped literal text and raw
tags leak into FAQPage JSON-LD. Owner shown, fix decision pending (recommended: render HTML
in accordion + strip tags for JSON-LD).

Remaining: ~4-week GSC baseline re-read (~2026-09-30, young pages = maturing, not failing);
ongoing GSC query mining for the autocomplete-blind costs+fees bucket.

## RESUME POINT (session closed 2026-09-02 at owner request, before gates) — EXECUTED, see above
0. **EQUITY-PROTECTION CHECK (owner instruction 2026-09-02, run BEFORE deploy):** verify
   none of the rewritten/extended pages loses existing search equity. For each EXTEND and
   REWRITE unit (W1: U02, U17, U18, U19, U20; W2: U43; W3: U14, U23, U28): pull the
   page's live query set from fresh GSC + Bing (the queries it currently gets impressions
   or clicks for, esp. U17/U18/U20's pre-rewrite baselines in OUR_DEMAND.md and the Bing
   earners recorded in the briefs, e.g. U18's 3-year-trap query 23 clicks, U19's ceded
   "cheapest way" query) and confirm the new text still answers each of those queries with
   the phrasing intact or better (H1/H2/FAQ present). Also confirm: slugs, canonicals and
   categories UNCHANGED on every edited file (no URL moved); frontmatter titles still
   carry the ranking terms; the two PROTECTED transfer pages untouched (git diff = zero);
   and no internal links to the edited pages broke. Any query the rewrite dropped
   coverage for gets patched before deploy. This is the "rewrites must only add" gate.
1. Run full gates in Property/web: `python scripts/validate_blog_content.py`,
   `npx vitest run`, `npx tsc --noEmit`, `npm run build`. Fix anything red, amendless
   commit on top.
2. OWNER INSTRUCTED 2026-09-02 (pending execution): "once done and we're confident, add
   to monitored pages and deploy all sites, all except wills/divorce". So after gates:
   `python scripts/check_dependency_closure.py`; check `git log origin/main..main` (our 6
   SPV commits PLUS possibly another session's Medical wave commits, verify before push);
   push; clean-worktree deploys per memory `vercel_cli_deploy_workflow` (C:/dep short
   path) for all live sites EXCEPT wills-probate + divorce-finances (+ashfield, no
   project); then register the SPV programme pages in monitored_pages (memory
   `monitored_pages_system`). IndexNow NOT requested.
3. Post-deploy: verify /spv-company + the 2 extended calculators live; fresh GSC baseline
   re-read ~4 weeks later (pages younger = maturing, not failing).
Ongoing: GSC query mining post-launch for the autocomplete-blind costs+fees bucket.

## 10. Our current demand baseline (GSC/Bing)

See `expansion_research/spv_formation/OUR_DEMAND.md` (fresh 90-day GSC + Bing pull,
2026-09-01) for the query-level baseline this programme starts from.
