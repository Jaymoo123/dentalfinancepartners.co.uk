# Track 2 brief: making-tax-digital-landlords-april-2026-deadline

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (MTD cluster canonical)
**Source markdown path:** `Property/web/content/blog/making-tax-digital-landlords-april-2026-deadline.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline
**Category route note:** frontmatter `category` is the display label "Making Tax Digital (MTD)"; the live URL path segment is `making-tax-digital-mtd`. All internal links to this page and its siblings use `/blog/making-tax-digital-mtd/<slug>`.
**Stage 1 priority:** H — this is the highest-internal-equity page in the entire MTD cluster (see cannibalisation block) and a load-bearing compliance-deadline page carrying confirmed hard factual errors. Priority is driven by link-equity protection + factual-correctness risk, NOT by current GSC volume (which is near-zero, cluster-wide).
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (GSC + GA4 pulled from Supabase via `pull_page_data.py`; deadlines + grace + SI migration verified live against gov.uk + legislation.gov.uk)
**Cannibalisation status:** REWRITE (forbidden to collapse — see §16.T2 equity-guard note). One downstream FLAG-MANAGER: the near-twin `making-tax-digital-property-income-2026-complete-guide` should later REDIRECT-COLLAPSE INTO this page (twin → this page, never the reverse).

> **This is a gold-reference brief.** Every data field below was pulled or verified at brief-drafting time. The depth match-target is `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`; the city-rewrite F-1 pricing-leak discipline match-target is `briefs/property/track2/trial/birmingham-property-accountant.md`.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `making-tax-digital-landlords-april-2026-deadline`. The slug encodes the broad deadline/eligibility intent and is the de-facto canonical the rest of the site already links to. Changing it would orphan 159 inbound link instances; do not rename.
- **Category:** `Making Tax Digital (MTD)` / route `making-tax-digital-mtd` (kept).
- **Gap-mode tag:** `STALE_FACTS` (primary, load-bearing) + `STRUCTURE` (secondary) + `THIN_DEPTH` (tertiary) + `INVISIBLE` (cluster-wide context, NOT a per-page loser signal).
- **"Why this rewrite" angle:** This page is a compliance-deadline gateway with **confirmed, self-contradictory factual errors** (two different quarterly-deadline schedules in the same file; invented £100/£200/£400 and £3,000 penalty figures; a missing first-four-update penalty grace; a pricing-leak software-cost figure). On a deadline page, wrong dates and wrong penalties are the worst failure mode: a landlord could mis-file and incur real cost relying on us. The rewrite repositions the page as the **deadline-and-timeline-led canonical** for the whole MTD-for-landlords cluster: who is in scope by date, the £50k/£30k/£20k threshold step-down, the 7th-of-month quarterly deadlines, the first-four-update penalty grace, and software requirements at *signpost depth only* (no product names, no prices) — then forward-links the six deep sibling pages that each own a mechanic. This is a deliberate hub-and-spoke restructure, not just a fact patch.

---

## Current page snapshot (Stage 2 — filesystem read; no `page_content_map` row exists, never SERP-parsed)

**Frontmatter:**
- `metaTitle`: "Making Tax Digital for Landlords: April 2026 Deadline Guide" (57 chars)
- `metaDescription`: "MTD for Income Tax starts April 2026 for landlords earning £50k+. Quarterly digital reporting requirements and compatible software options." (138 chars)
- `h1`: "Making Tax Digital for Landlords: April 2026 Deadline Explained"
- `date`: 2026-03-29 (no `dateModified`)
- `faqs:` array length = **7**

**Body (filesystem read):**
- Current word count: **1,519** (target ~3,200).
- 8 H2 sections (`What is MTD for Property Income?`, `Who Must Follow the MTD Rules?`, `MTD Software and Digital Record Keeping Requirements`, `Quarterly Reporting Timeline and Deadlines`, `Impact on Self-Assessment and Tax Planning`, `Penalties and Compliance`, `Impact on Different Types of Landlords` (+3 H3), `Preparing for the April 2026 Deadline` (+3 H3), `Common Concerns and Misconceptions`, `Getting Ready: Next Steps`, `Related Reading`).
- Outbound authority links: **0** (no gov.uk / legislation.gov.uk / HMRC manual citations).
- Internal links: 4 (`mtd-rental-income-threshold-exemptions`, `best-mtd-software-landlords-2026`, `/incorporation` x2, `landlord-tax-return-deadline-2026`). One sibling slot only in "Related Reading".
- Schema present: Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Em-dashes present in body** (e.g. line 58 "requirements — you need", line 127 "Most straightforward cases —"). Violates the no-em-dash rule; sweep mandatory.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` + `bing_query_data` + `ga4_page_data`

**Pulled 2026-05-30 via `python -m optimisation_engine.track2.pull_page_data --slug making-tax-digital-landlords-april-2026-deadline`.**

**Google GSC aggregate:** **1 impression / 0 clicks / position 61.0** in the 90-day window. Single query: `when does making tax digital start for landlords` (1 imp, pos 61, 0 clk).

**Bing:** no rows — INVISIBLE on Bing (or below the GetPageStats cap). Note the usual Track-2 pattern (legacy pages often rank page-1 on Bing) does NOT hold here; this page is invisible on both engines.

**GA4 (`ga4_page_data`, 90d):** path `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`; sessions=2, active_users=2, engaged_sessions=1, engagement_rate=0.500, bounce_rate=0.500, **avg_duration_s=309.5** (~5.2 min), conversions=0.

### Pattern analysis

This is an **INVISIBLE page in an INVISIBLE cluster**, not a CTR-fail. Position 61 means it is not competing on page 1 for anything. Per the diagnosis, the whole MTD cluster sits at positions 40-85 with ~0 clicks — siblings are equally invisible. **Weak GSC here is therefore NOT evidence this page is the cluster loser**; it is the cluster-wide INVISIBLE problem. The single tracked query (`when does making tax digital start for landlords`) is exactly the deadline/eligibility intent this page should own, confirming the repositioning is aimed at real (if currently latent) demand. The ~5.2-minute average session duration on the 2 sessions says the few who arrive read it deeply — content engagement is fine; the limiters are (a) ranking, addressed by depth + freshness + cluster-hub authority, and (b) factual correctness, which is the load-bearing fix regardless of traffic.

**Realistic post-rewrite target:** modest. This is a deepen-and-lift play, not a quick-CTR win. Expect slow ranking accrual as the cluster matures and internal-link equity (143 inbound files) flows through a corrected, authoritative hub. The PRIMARY justification for this rewrite is correctness + link-equity protection, not a near-term clicks forecast.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (load-bearing — this is a compliance-deadline page; wrong facts can cost a reader real money).** Five confirmed defects, all verified at write time:

1. **Quarterly deadline dates wrong AND self-contradictory.** The body table (lines 94-97) and FAQ #3 (frontmatter) say Q1 due **5 Aug**, Q2 5 Nov, Q3 5 Feb, Q4 5 May. But FAQ #5 and FAQ #7 and the body assert a *different* set ("first submission due **5 July 2026**" / "5 July, 5 October, 5 January, 5 April"). Both are wrong, and they contradict each other in the same file. **Verified correct position (gov.uk + FreeAgent, 2026-05-30):** standard quarterly *periods* run 6 Apr-5 Jul, 6 Jul-5 Oct, 6 Oct-5 Jan, 6 Jan-5 Apr; *submission deadlines are the 7th of the following month* — first update (Q1, 2026/27) due **7 August 2026**, then **7 November 2026**, **7 February 2027**, **7 May 2027**. The rewrite uses the 7th-of-month deadlines throughout and removes the internal contradiction. Matches house position §19.6 quarterly-cycle table verbatim.

2. **Penalty grace period MISSING + invented figures.** The page omits the confirmed first-year grace and instead invents "£200 first / £400 subsequent" and "£100" late-update penalties (lines 121, FAQ #7) — contradicting §3 + §19.7 (the regime is points-based: 1 point per missed update, **£200 fixed at the 4-point threshold** within a rolling 24-month window). **Verified (gov.uk send-quarterly-updates page, 2026-05-30, verbatim):** *"HMRC will not apply penalty points for late quarterly updates during the 2026 to 2027 tax year"* — i.e. the April-2026 mandated cohort is not penalised for late submission of their first four quarterly updates (corroborated by FreeAgent: *"sole traders and landlords who are mandated to start using MTD for Income Tax in April 2026 will not face penalties for late submission of their first four quarterly updates"*). The rewrite replaces the invented figures with the points-based regime + the first-four-update grace.

3. **Late-payment figures wrong.** Page implies a flat £100/£200/£400 mirror of "existing self assessment penalties". Correct per §19.7 (Spring Statement 2025 doubling + accelerated trigger days): late-payment is **3% from day 15, +3% from day 30, +10% per annum from day 31** — NOT 2%/2%/4% and NOT the legacy 31/46/91 schedule, which applies only to non-MTD income tax + VAT.

4. **Stale "soft landing" framing.** Line 122 frames year-one leniency as a vague "soft landing approach ... shouldn't be relied upon". Reframe to the *confirmed* first-four-update grace (a definite, citable position), not a hedge.

5. **£3,000 digital-records penalty claim unsupported.** Line 123 asserts "penalties up to £3,000 for failing to keep proper digital records." There is no such headline figure in the MTD ITSA regime (§19.16 digital-records discipline carries no £3,000 penalty). Remove.

**Secondary: STRUCTURE.** 7 FAQs (target 12-14); no rates/deadline table at top (snippet-bait); 0 outbound authority links; one sibling link only. No hub-and-spoke forward-linking despite this being the cluster's natural gateway.

**Tertiary: THIN_DEPTH.** 1,519 words vs ~3,200 target and vs the deep-sibling network. The page tries to cover everything shallowly (software, records, penalties, planning) instead of owning the deadline/eligibility/timeline gateway intent and forward-linking the mechanics.

**Cross-cutting: PRICING-LEAK (Decision E).** Body line 66 states MTD software "cost £10-50 monthly"; the Myth/Reality box (line 145) repeats "£10-20 monthly". Per the lead-gen handoff model + house rule Decision E + §19.6 ("do not hard-code product names *or* prices"), strip every fee figure. Discuss software at signpost depth (functional-compatible software from the HMRC list; spreadsheet-plus-bridging acceptable) with NO numbers and NO product names. This mirrors the birmingham F-1 pricing-leak fix.

**INVISIBLE (context, not a fix target):** see GSC block — cluster-wide, not a per-page loser signal; do not collapse this page on the basis of weak GSC.

**Load-bearing fix sequence (ordered by reader-harm-avoidance, then ROI):**

1. **Correct the quarterly deadlines** to the 7th-of-month schedule (7 Aug / 7 Nov / 7 Feb / 7 May) and remove the internal 5-Aug-vs-5-Jul contradiction. Highest harm-avoidance.
2. **Replace invented penalties** with the points-based regime (§19.7) + the confirmed first-four-update grace + the 3%/3%/10% late-payment schedule. Remove the £3,000 records-penalty claim.
3. **Strip all software prices** (Decision E) and remove product-name hard-coding; software at signpost depth only.
4. **Reposition as the cluster hub:** deadline + eligibility + threshold step-down + timeline; forward-link the six deep siblings (each owns a mechanic).
5. **Body lift to ~3,200 words**; add a deadline/threshold table at top (snippet-bait); add 1-2 worked timeline examples (a landlord in/out of scope by gross-income; a joint-owner share-of-gross example per §19.4).
6. **FAQ count 7 → 12-14**, each targeting a specific deadline/eligibility query verbatim; rewrite the three defective FAQs (#3 deadlines, #5/#7 first-submission date, #7 penalties).
7. **Add 4-6 verified authority links** (gov.uk MTD pages, legislation.gov.uk SI 2026/336, Spring Statement 2025 HTML).
8. **Meta + dateModified refresh** (set `dateModified` to execution date; sharpen meta to the deadline/timeline angle).
9. **Em-dash sweep** to zero.

---

## Competitor / authority targets (Stage 2 — verified live 2026-05-30 via WebFetch)

| URL | Status | What it confirms / what to borrow | What to differentiate |
|---|---|---|---|
| https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax | 200 OK + content verified | Threshold step-down verbatim: £50k (tested on 2024/25 return → from 6 Apr 2026), £30k (2025/26 → 6 Apr 2027), £20k (2026/27 → 6 Apr 2028). Borrow the "tested against which return year" framing. | gov.uk is the source-of-truth for eligibility; we are the specialist application layer (worked scope examples, joint-owner share-of-gross, planning timeline). |
| https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates | 200 OK + content verified | Standard quarterly periods + 7th-of-month deadlines (7 Aug / 7 Nov / 7 Feb / 7 May). Verbatim grace: *"HMRC will not apply penalty points for late quarterly updates during the 2026 to 2027 tax year."* | We package the deadlines into a calendar table + a worked first-year timeline; gov.uk presents them in prose. |
| https://www.freeagent.com/blog/mtd-for-income-tax-first-year-explained/ | 200 OK + content verified | Corroborates 7 Aug 2026 first deadline + the first-four-quarterly-updates grace ("only your first four ... were not subject to late submission penalties"). | FreeAgent is product-led; we are product-neutral (no software names/prices) and statute-anchored. |
| https://www.nrla.org.uk/resources/tax/making-tax-digital | Re-verify at execution (landlord-body authority) | Landlord-specific framing + scope. | We carry the joint-owner §19.4 share-of-gross nuance and the points-based-vs-grace distinction. |
| https://www.xero.com/uk/programme/making-tax-digital/landlords-property-income/ | Re-verify at execution | Software-vendor landlord MTD overview. | Product-neutral; do NOT mirror product-name listing. |

**Competitor depth ceiling for this intent:** gov.uk is authoritative but prose-only and not landlord-applied; vendor pages are product-led and not statute-anchored; landlord-body pages are scope-led. Our ~3,200-word statute-anchored, product-neutral, hub-and-spoke deadline canonical with 12-14 FAQs + verified citations + worked timeline examples is decisively best-in-class, not catch-up.

**What to borrow:** gov.uk's "tested against which return year" threshold framing + the verbatim grace statement. **What to differentiate:** product-neutrality (Decision E), the joint-owner share-of-gross example (§19.4), the points-vs-grace distinction most consumer pages blur, and the hub-and-spoke forward-link architecture.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the live snapshot at execution; refresh the §4 in-flight section per batch).

**Inbound internal-link footprint (measured 2026-05-30):** this slug is linked from **144 distinct files / 159 link instances** across the corpus (incorporation, AIA, 2027-rates, capital-allowances, city pages, and other MTD siblings all route their MTD references here). This is the single largest internal-link magnet in the MTD cluster.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | making-tax-digital-landlords-april-2026-deadline | REWRITE | Self — rewrite in place. **DO NOT collapse.** Per §16.T2 an equity-guard collapse of THIS page is forbidden: it is the strong inbound-link target (144 files); a 301 would point a link-magnet at a weaker page. Collapse direction, if any, is twin → this page, never the reverse. |
| Residual (near-twin) | making-tax-digital-property-income-2026-complete-guide | **FLAG-MANAGER (future redirect-collapse INTO this page)** | The twin (1,532 words) duplicates the broad "everything about MTD for landlords" intent and is itself stale: VAT threshold quoted as £85k not £90k; wrong penalty figures (£100 day-one / £300 / 5% / "four late could exceed £400"); hard-coded software product names (Xero/QuickBooks/FreeAgent/PropertyStream) + "£10-50 monthly" prices, against §19.4/§19.6 + Decision E. **Recommendation: after this rewrite ships, REDIRECT-COLLAPSE the twin into this page** (this page is the stronger inbound-link target). Run `scripts/track2_collapse_guard.py` to confirm equity direction before adding any `DUPLICATE_REDIRECTS` entry (§16.T2). Twin-specific stale facts logged as a separate flag for the manager. |
| Deep sibling (forward-link) | mtd-rental-income-threshold-exemptions | Owns threshold/exemptions mechanics | No collision — this page signposts the threshold at gateway depth + forward-links here for the deep treatment. |
| Deep sibling (forward-link) | mtd-quarterly-deadlines-2026-2027-landlords | Owns the deadline-detail mechanics | No collision — this page carries the headline 7th-of-month deadlines + forward-links here for the full calendar. |
| Deep sibling (forward-link) | mtd-quarterly-reporting-landlords-step-by-step-guide | Owns the how-to-file walkthrough | No collision — signpost + forward-link. |
| Deep sibling (forward-link) | mtd-record-keeping-landlords-digital-requirements | Owns digital-records mechanics | No collision — signpost + forward-link (also the right home for the deleted £3,000-claim correction context). |
| Deep sibling (forward-link) | best-mtd-software-landlords-2026 | Owns the software-selection treatment | No collision — software at signpost depth here (no names/prices), forward-link here for the comparison. Already linked in current body. |
| Deep sibling (forward-link) | mtd-penalties-landlords-miss-deadline | Owns the penalty-detail mechanics | No collision — this page carries the points-regime headline + grace + forward-links here for the full penalty mechanics. |
| Intra-cluster (note, not collision) | mtd-itsa-late-submission-points-late-payment-15-30-31-worked; mtd-itsa-qualifying-income-test-gross-vs-net; mtd-itsa-jointly-owned-property-threshold-split | Deep mechanics siblings (Wave 3/4 net-new) | No collision with the gateway. Candidate secondary forward-links from the relevant gateway sections. |
| Intra-cluster (cluster-hygiene note) | mtd-itsa-jointly-owned-property-threshold-split vs mtd-made-simple-for-landlords-with-jointly-owned-properties; mtd-quarterly-deadlines-2026-2027-landlords vs mtd-itsa-* deadline variants | Possible intra-cluster near-duplication | NOT this page's problem to resolve. Flag for a future MTD cluster-hygiene audit. |

**Distinctness after rewrite:** this page = the deadline / eligibility / timeline GATEWAY (who is in scope by date, threshold step-down, headline quarterly deadlines, penalty headline + grace, software signpost). Deep siblings = the mechanics each owns. The twin is queued for redirect-collapse INTO this page.

**Conclusion:** REWRITE in place. NO collapse of this page (equity-guard forbidden). One downstream FLAG-MANAGER for the twin's redirect-collapse + twin stale-facts.

---

## Closest existing pages (Stage 2) — internal-link plan

**Forward-links FROM this gateway (one per cluster mechanic, placed at the relevant section):**
- Threshold/eligibility section → `/blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions` and `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net`
- Quarterly-deadlines section → `/blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords`
- How-to-file section → `/blog/making-tax-digital-mtd/mtd-quarterly-reporting-landlords-step-by-step-guide`
- Digital-records section → `/blog/making-tax-digital-mtd/mtd-record-keeping-landlords-digital-requirements`
- Software section (signpost only) → `/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026`
- Penalties section → `/blog/making-tax-digital-mtd/mtd-penalties-landlords-miss-deadline` and `/blog/making-tax-digital-mtd/mtd-itsa-late-submission-points-late-payment-15-30-31-worked`
- Joint-owner example → `/blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split`

**Cross-category forward-links (keep, de-duplicated):**
- Incorporation context → `/blog/buy-to-let-limited-company-complete-guide-uk` (preferred over the bare `/incorporation` route; verify the canonical incorporation pillar slug at execution) — note Ltd Cos are OUTSIDE MTD ITSA (§19.3), frame accordingly, do not imply MTD applies to companies.
- Self-assessment context → `/blog/making-tax-digital-mtd/landlord-tax-return-deadline-2026` (kept from current Related Reading).

**Back-link note:** because 144 files already link IN to this page, no aggressive new inbound-link campaign is needed; the rewrite's job is to be worthy of that equity (correct, deep, authoritative), then forward-distribute it to the siblings.

---

## House-position references (Stage 1)

- **§3 MTD for ITSA** [LOCKED]: headline mandate + threshold schedule (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028), Ltd Cos out, GP partnerships deferred (TBC). Penalties: points-based, £200 at 4-point threshold; late-payment 3%/3%/10% on 15/30/31 day-triggers. **Do-not-write list:** no "£10,000 threshold"; no "MTD applies to Ltd companies"; no "MTD applies to GP partnerships from April 2026".
- **§19.1 Mandate timeline** [LOCKED 2026-05-22]: threshold tested against 2024/25 (→ Apr 2026 cohort), 2025/26 (→ Apr 2027), 2026/27 (→ Apr 2028) returns. Verified live against gov.uk 2026-05-30.
- **§19.2 Qualifying income** [LOCKED]: gross self-employment turnover + gross property rental, before deductions; streams aggregated; gross matters (net-low/gross-high landlords in scope).
- **§19.3 Excluded categories** [LOCKED]: Ltd Cos out; GP partnerships + LLPs deferred; trustees out; non-UK-resident individuals in scope where threshold met (NRL scheme runs alongside).
- **§19.4 Joint-property owners** [LOCKED]: each co-owner tests their *share of gross* (default 50/50 absent Form 17). Use the share-of-gross worked example.
- **§19.5 Exit / income-drop** [LOCKED]: exit after 3 consecutive sub-threshold years; voluntary opt-in available.
- **§19.6 Software requirements + quarterly cycle** [LOCKED]: functional-compatible software from the HMRC list; spreadsheet-plus-bridging acceptable; **do not hard-code product names or prices**. Quarterly cycle table = 6 Apr-5 Jul → 7 Aug; 6 Jul-5 Oct → 7 Nov; 6 Oct-5 Jan → 7 Feb; 6 Jan-5 Apr → 7 May; EoPS + final declaration by 31 Jan following year-end. Calendar-quarter election available from 6 Apr 2026.
- **§19.7 Penalty regime** [LOCKED]: points-based late submission (1 point/miss, 4-point threshold → £200 fixed); late-payment 3% day 15, +3% day 30, +10% p.a. day 31. Do NOT use 31/46/91 or 2%/2%/4% (legacy non-MTD).
- **§19.8 / §19.9 Do-not-write** [LOCKED]: no £10k threshold; no immediate-£200 framing; no 2%/2%/4%; no "joint owners test the property's total gross".
- **§19.16 Digital-records evidence discipline** [LOCKED]: 7-year retention (TMA 1970 s.12B); no £3,000 records-penalty headline figure exists — remove the source's claim.
- **§19.18 SI migration** [LOCKED 2026-05-27]: the operative instrument is now **The Income Tax (Digital Obligations) Regulations 2026, SI 2026/336** (in force from 1 April 2026); SI 2021/1076 (The Income Tax (Digital Requirements) Regulations 2021) is **REVOKED**. Any new MTD statute citation MUST use SI 2026/336 (e.g. qualifying income reg 25; threshold reg 27; exclusion notice reg 18; three-year exit reg 24). Verified live against legislation.gov.uk 2026-05-30 (SI 2021/1076 page shows "(revoked)"; SI 2026/336 title + citation confirmed).
- **§19.19 Points reset dual-condition** [LOCKED 2026-05-27]: if citing reset, surface BOTH limbs (12-month compliance period AND all submissions due in the preceding 24 months made). Points-based regime sits at **FA 2021 Schedule 24** (NOT FA 2007 Sch 24, the inaccuracy regime — naming-collision watch).
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts — the published page contradicts locked house positions on five axes. These are the rewrite's first job.**

1. **Quarterly deadlines (§19.6).** Source uses 5-Aug schedule in the table + 5-Jul "first submission" elsewhere; both wrong + self-contradictory. Correct to the 7th-of-month schedule.
2. **Penalty figures (§3 + §19.7 + §19.9).** Source invents £100/£200/£400 late-update penalties; §19.9 explicitly lists "immediate £200" and "2%/2%/4%" framings as do-not-write. Correct to points-based + first-four-update grace + 3%/3%/10%.
3. **£3,000 records penalty (§19.16).** No such figure in the regime. Remove.
4. **Software pricing (§19.6 + §13 + Decision E).** "£10-50 monthly" / "£10-20 monthly" are pricing leaks; product names against §19.6. Strip both.
5. **SI citation currency (§19.18).** Any statute reference must use SI 2026/336, not SI 2021/1076.

**Flags to raise in `track2_site_wide_flags.md` at execution:**
- **F-<next> | 2026-05-30 | HIGH | making-tax-digital-landlords-april-2026-deadline | STALE_FACTS | Self-contradictory quarterly deadlines (5-Aug table vs 5-Jul body) + invented £100/£200/£400 penalties + missing first-four-update grace + unsupported £3,000 records penalty. Verified correct against gov.uk + FreeAgent 2026-05-30. Compliance-deadline page; load-bearing.**
- **F-<next> | 2026-05-30 | HIGH | making-tax-digital-landlords-april-2026-deadline | PRICING-LEAK (Decision E) | "£10-50 monthly" (body) + "£10-20 monthly" (Myth/Reality) software-cost figures + hard-coded product-name pattern in the cluster. Strip per §19.6 + §13.**
- **F-<next> | 2026-05-30 | HIGH | making-tax-digital-property-income-2026-complete-guide (TWIN) | STALE_FACTS + CANNIBAL | VAT threshold £85k not £90k; £100 day-one / £300 / 5% / "exceed £400" penalty figures; hard-coded software names + "£10-50 monthly". Recommend REDIRECT-COLLAPSE INTO this page after this rewrite ships (run `track2_collapse_guard.py` first). Equity direction: twin → this page.**
- **F-<next> | 2026-05-30 | LOW | MTD cluster | CLUSTER-HYGIENE | Possible intra-cluster near-duplication among joint-owner + quarterly-deadline variants. Defer to a future MTD cluster-hygiene audit.**

---

## Authority links worth considering (Stage 2 — verified live 2026-05-30)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax | 200 OK + content verified (threshold step-down + tested-return-year) | Eligibility / threshold step-down cite |
| https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates | 200 OK + content verified (7th-of-month deadlines + verbatim 2026/27 grace) | Quarterly deadlines + first-year grace cite |
| https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax | 200 OK (overview hub) | General MTD ITSA overview cross-reference |
| https://www.legislation.gov.uk/uksi/2026/336/contents/made | 200 OK + title/citation verified (The Income Tax (Digital Obligations) Regulations 2026) | Operative-instrument statute cite (§19.18) |
| https://www.legislation.gov.uk/uksi/2021/1076/contents | 200 OK, shows "(revoked)" | Historical/migration context ONLY (never as live operative instrument) |
| https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html | Verify at execution (cited in §19.7 verification note) | Late-payment 3%/3%/10% on 15/30/31 day-triggers |
| https://www.legislation.gov.uk/ukpga/2021/26/schedule/24 | Verify at execution (FA 2021 Sch 24 — points-based late-submission) | Points regime statute cite (§19.19; watch FA 2007 Sch 24 naming collision) |

**(Execution session selects 4-6 to actually cite in body, as legislation.gov.uk / gov.uk hyperlinks.)**

---

## Universal rules — inherited from parent program (do not restate)

Inherits the §13 pointer block from `TRACK2_PROGRAM.md §4`: voice rules (`NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5`), lead-gen architecture, CSS-in-markdown, FAQs-and-schema, anti-templating, six-check quality bar, statute-citation discipline (F-8), and all §16 lessons (esp. §16.31 URL liveness, §16.22/§16.27/§16.30/§16.35 Bill-vs-enacted, and the F-37 Royal-Assent-date discipline).

**Critical for THIS brief:** NO em-dashes (sweep to zero). NO pricing/fees anywhere (Decision E — strip "£10-50" / "£10-20"). NO product names. Anonymised social proof only (e.g. "a higher-rate landlord with two BTL flats and £58,000 gross rent"). LeadForm auto-injected by `BlogPostRenderer.tsx`; do not duplicate. 1-2 inline `<aside>` CTAs at conversion moments (after the in-scope-or-not example; after the penalties/grace section).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow from `TRACK2_PROGRAM.md §4` section 14 + `NETNEW_PROGRAM.md §7`. Track 2 deltas (Step 9 rewrite-in-place; Step 12 confirm-no-redirect-or-propose; Step 13 update/insert `monitored_pages`). **Brief-specific load-bearing steps:**

1. Read `house_positions.md` §3 + §19 (all sub-sections, esp. §19.6 cycle table, §19.7 penalties, §19.16 records, §19.18 SI migration, §19.19 points reset) in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡).
3. Read this brief end-to-end.
4. **Re-verify at write time (F-37 discipline):** (a) the 7th-of-month quarterly deadlines + the 2026/27 first-four-update grace against gov.uk `send-quarterly-updates`; (b) SI 2026/336 in-force + SI 2021/1076 revoked against legislation.gov.uk; (c) FA 2021 Sch 24 points-regime cite. No Finance Act Royal-Assent is itself load-bearing (the mandate is regulations-driven), but any penalty-regime statute cite must be verified per F-37.
5. Re-fetch the 5 competitor/authority URLs to confirm liveness (httpx + proper User-Agent).
6. Read the current source markdown in full.
7. Read the 6 forward-link sibling pages + the twin (for redirect-collapse framing).
8. Plan outline: 10-12 H2s, ~3,200 body words, 12-14 FAQs, deadline/threshold table at top, 1-2 worked timeline examples, 1-2 inline CTAs.
9. **Rewrite markdown at the existing path.** Preserve `slug` + `canonical`; update `dateModified` to today; sharpen `metaTitle` / `metaDescription` to the deadline/timeline angle; rewrite the 3 defective FAQs.
10. `cd Property/web && npm run build` — must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve; **pricing check: zero `£[0-9]` fee figures in software/cost lines**; **deadline check: zero "5 August"/"5 July" first-submission strings remain**.
12. Confirm no redirect needed for THIS page (none — slug kept; collapse is forbidden inbound). Propose the TWIN redirect-collapse separately (guard-gated).
13. Update/insert `monitored_pages` row (INVISIBLE baseline → 180-day window per F-11 recommendation).
14. Commit on `main`: `Track 2A: rewrite making-tax-digital-landlords-april-2026-deadline (STALE_FACTS deadlines+penalties + cluster-hub restructure + pricing-leak strip)`.
15-19. Tracker ✅; flags log (the 4 flags above); §3 heartbeat; discoveries; next.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §19.1 threshold step-down (£50k/£30k/£20k + tested-return-year): __
- §19.6 quarterly cycle (7 Aug / 7 Nov / 7 Feb / 7 May) — internal contradiction removed: __
- §19.7 penalties (points + £200@4pts + 3%/3%/10%) + first-four-update grace asserted: __
- §19.16 £3,000 records-penalty claim removed: __
- §19.18 SI 2026/336 cited (SI 2021/1076 historical only): __
- Decision E pricing strip ("£10-50" / "£10-20" gone): __

### Comparison: before vs after
- Word count: 1,519 → __
- H2 count: ~8 → __
- FAQ count: 7 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 0 → __ (1-2 expected)
- Deadline/threshold table at top: 0 → __ (1 expected)
- Em-dashes: present → 0
- Forward-links to deep siblings: 1 → __ (6+ expected)

### Verification log (F-37 discipline)
- 7th-of-month deadlines re-verified at write: __
- 2026/27 first-four-update grace re-verified at write: __
- SI 2026/336 in-force + SI 2021/1076 revoked re-verified at write: __

### Flags raised
- STALE_FACTS / PRICING-LEAK / TWIN-redirect / CLUSTER-HYGIENE (carried from brief): __
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
