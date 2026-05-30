# Track 2 brief: property-business-rates-council-tax-landlords

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; WRONG_ADVICE + STALE_FACTS + THIN_DEPTH + INVISIBLE + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/property-business-rates-council-tax-landlords.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/property-business-rates-council-tax-landlords
**Stage 1 priority:** M (no equity to protect — fully invisible — but high strategic value: this becomes the cross-tenure comparison hub none of the siblings occupy, and it corrects a load-bearing WRONG_ADVICE error currently live)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (current source read; siblings + categories verified on filesystem; statute spine drawn from LOCKED §30; gov.uk self-catering test verified per diagnosis 2026-05-30)
**Cannibalisation status:** REWRITE in place (no redirect, no collapse — see §Cannibalisation universe check for the full collapse-direction reasoning)

> **This is a gold-reference data-complete brief.** It matches the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-rewrite discipline of `briefs/property/track2/trial/birmingham-property-accountant.md`. The execution session writes the rewrite at the existing path; it does NOT create a new file and does NOT change the slug or canonical.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `property-business-rates-council-tax-landlords`. The slug is clean, descriptive, and aligns with the comparison intent ("business rates vs council tax for landlords"). No redirect proposed. Canonical preserved exactly.
- **Category:** kept as `Landlord Tax Essentials` (URL path `landlord-tax-essentials`). NOTE FOR EXECUTION: the four deeper siblings this page spoke-links to (HMO reform, commercial, holiday-let, serviced-accommodation) all live in `Property Types & Specialist Tax`. The comparison-hub role arguably fits that category better, but the page is invisible on both engines so there is no link equity or ranking history attached to the current category path. Changing the category changes the URL, which would need a 301 and would discard the (nil) history for no gain. **Decision: keep the category, keep the URL, do not 301.** A category move is a separate, lower-priority cluster-tidy that the manager can batch later if the page starts earning impressions. Log this as a non-blocking observation, not a flag.
- **Gap-mode tag:** `WRONG_ADVICE` (primary — load-bearing, contradicts LOCKED §30.5 and the C3 sibling) + `STALE_FACTS` (secondary — multiplier figure, self-catering test, missing second-home premium) + `THIN_DEPTH` (820 words against a ~3,000 target) + `INVISIBLE` (0 impressions both engines — no equity to protect, which is what UNLOCKS the rewrite-in-place decision) + `STRUCTURE` (no comparison table, no decision tree, no statute citations, 4 FAQs, generic "we" framing, two outbound links only to non-content service pages).
- **"Why this rewrite" angle:** This page is the only page in the corpus that targets the cross-tenure decision question — *"does my property pay business rates or council tax, and who is liable?"* — across residential rentals, HMOs, holiday lets / self-catering, and commercial units. But it currently answers that question **wrongly** for HMOs (it says HMOs "typically become liable for business rates" — false in England since 1 December 2023), uses a **stale 2024/25 multiplier** (51.2p), gives an **incomplete self-catering test** (implies availability alone triggers business rates, omitting the 70-night actually-let limb), and **entirely omits** the LURA 2023 second-home council tax premium that is the single biggest real-world reason owners chase a business-rates reclassification. The rewrite's job is to (1) correct the HMO error and forward-link the canonical C3 explainer, (2) give the full two-limb self-catering test with devolved variations, (3) refresh the 2026/27 multipliers and SBRR, (4) add the second-home premium with the §30.4 commencement nuance, and (5) lift the page into a genuine decision/comparison hub at ~3,000 words that spoke-links to the four deeper siblings without duplicating them. Because the page is invisible, there is nothing to lose and a clean top-of-cluster slot to claim.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

- **Source markdown path:** `Property/web/content/blog/property-business-rates-council-tax-landlords.md`
- **Current word count:** ~820 (body)
- **Current H2 outline (8 H2s):**
  1. When Properties Pay Business Rates Instead of Council Tax (lists HMOs, student lets, serviced accommodation, mixed-use as business-rates triggers)
  2. HMOs and Business Rates Liability — **WRONG_ADVICE.** Asserts HMOs with shared facilities "typically become liable for business rates rather than council tax." False for England post-1-Dec-2023.
  3. Who Pays: Landlord or Tenant Responsibility (void vs occupied; lease-term framing)
  4. Student Accommodation Special Rules (PBSA vs traditional student houses)
  5. Short-Term and Serviced Accommodation (Airbnb / serviced; "average length of stay" framing but no two-limb test)
  6. Challenging Business Rates Assessments (VOA appeal grounds)
  7. Planning and Budgeting Considerations (generic)
  8. Related Reading (3 links)
- **Current meta title:** "Property Business Rates vs Council Tax for UK Landlords" (54 chars; OK length, generic, no differentiator or year)
- **Current meta description:** "Some rental properties pay business rates, not council tax — HMOs, holiday lets, and commercial units trigger different rules for landlords." (138 chars — and note it **contains an em-dash**, which violates the no-em-dash rule and reinforces the HMO error. Must be rewritten.)
- **Current FAQs (frontmatter count):** 4. FAQ #1 repeats the HMO WRONG_ADVICE. FAQ #3 carries the stale "51.2p (2024/25 rate)" multiplier and the "£5,120 / £1,000-£3,000" illustrative figures (PRICING-LEAK CLEARED — these are illustrative TAX figures, not firm fee quotes; refresh the multiplier but no Decision-E trigger).
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / VOA. Internal links: 2 only, and both point to non-content product pages (`/calculators`, `/incorporation`) plus 3 Related-Reading blog links (VAT registration, SDLT surcharge, landlord deductions). No links to the council-tax cluster or the HMO reform canonical.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` array).
- **`reviewedBy`:** absent (the C3 sibling carries `reviewedBy: "ICAEW Qualified Senior Reviewer"`; consider adding for parity — anonymised reviewer byline, no named individual).
- **Last meaningful edit date:** frontmatter `date: "2026-03-31"` (no `dateModified`; add one at execution set to the rewrite date).
- **Em-dash audit:** at least one em-dash present (meta description). Body uses a hyphen-with-spaces at line 65 ("transferred entirely - the landlord..."). Execution must zero out em-dashes and replace stray spaced-hyphen punctuation with full stops, commas, or parentheses.

---

## GSC angle (last 90 days) — REAL DATA from diagnosis pass

**Source:** Track 2 diagnosis pass for this slug (2026-05-30), reading `gsc_query_data` and `bing_query_data`.

**Aggregate:** **0 impressions / 0 clicks on Google (GSC)** across the full window (max GSC date 2026-05-28). **0 impressions / 0 clicks on Bing** across the full window (max Bing date 2026-05-30). **Fully INVISIBLE on both engines.**

### Pattern analysis

There is no query data to pattern-analyse because the page has never surfaced on either engine. This is the load-bearing fact for the cannibalisation decision: **there is zero equity on this URL to protect.** A page that has never earned an impression cannot be "harmed" by a rewrite, and the collapse-direction rule (301 a weaker page into a stronger sibling) cannot be triggered because (a) no sibling owns the cross-tenure "business rates vs council tax" comparison intent, and (b) the one structurally-adjacent commercial sibling (`commercial-property-tax-landlords-rates-reliefs-allowances`) is **itself invisible** (also 0 GSC rows), so collapsing an invisible page into another invisible page gains nothing and deletes the only comparison-intent landing page in the cluster.

**Why invisible:** the page is thin (820 words), carries a factual error a quality-rater would catch, has no comparison table or structured answer block for Google to lift, no statute anchors, and no internal links from authoritative cluster pages pointing in. It is a classic "published but never indexed-with-intent" page. The rewrite is effectively a relaunch.

**Realistic post-rewrite target:** this is a fresh-equity play, not a CTR-recovery play. Target is to begin earning impressions on the comparison query class within the 90-day monitoring window (any non-zero impression count is progress from a zero baseline), with the page positioned as the cluster hub that internally distributes authority to the four deeper siblings. Success metric at +90 days: page earns impressions on "business rates vs council tax" / "do landlords pay business rates" / "holiday let business rates vs council tax" query variants AND no monitored-page regression on the siblings it links to.

### GA4 engagement signal

Not pulled (no traffic to measure on an invisible page). Execution session may confirm 0 sessions in `ga4_page_data` for completeness; do not block on it.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: WRONG_ADVICE (load-bearing, contradicts LOCKED house position).** The current H2 "HMOs and Business Rates Liability" plus FAQ #1 assert that HMOs with shared facilities "typically become liable for business rates rather than council tax." This is **false for England from 1 December 2023** and directly contradicts:
- **LOCKED §30.5** (HMO and owner-liability mechanics) and the broader §30 council-tax framework, and
- the C3 sibling `government-to-end-council-tax-on-hmo-rooms`, which correctly explains that **SI 2023/1175 inserted article 3C into the Council Tax (Chargeable Dwellings) Order 1992 (SI 1992/549)**, requiring an HMO (within the **Housing Act 2004 s.254** meaning) to be banded as a **single dwelling for council tax**, with the **owner liable** (SI 1992/612 / Class C owner-liability regime, aligned to the s.254 meaning by SI 2023/1175 reg 3).

Reality: HMOs in England do **NOT** default to business rates. The per-room council-tax banding that the VOA had been applying (roughly 2020-2023) was ended by the reform; HMOs are now a single council-tax dwelling with the owner billed. The rewrite's **first job** is to correct this, state the post-reform position plainly, and forward-link the C3 page as the canonical deep-dive. This is the single most important change on the page.

**Secondary: STALE_FACTS (three distinct stale items).**
1. **Self-catering / holiday-let test incomplete.** Current page (H2 "Short-Term and Serviced Accommodation") implies availability or "average length of stay" alone drives the business-rates assessment. The correct **England** test (effective 1 April 2023; verified on gov.uk `/introduction-to-business-rates/self-catering-and-holiday-let-accommodation` 2026-05-30) is a **two-limb test**: a property is valued for business rates (and removed from council tax) only if, in the previous 12 months, it was (a) **available** to let commercially as self-catering accommodation for at least **140 nights** AND (b) **actually let** for at least **70 nights**, plus an intention to make it available for 140 nights in the coming year. From **1 April 2026** there is a **2-3 year averaging** allowance where a single year misses the target, and up to **14 charity-donated nights** may count toward the let-nights limb. **Wales** is materially different (**252 available / 182 let**). **Scotland** tracks England (**140/70**). The rewrite must give the full two-limb test plus the devolved variations.
2. **Business-rates multiplier stale.** FAQ #3 cites "51.2p (2024/25 rate)." For **2026/27** the figures are: **small business multiplier 38.2p** (for properties with RV under £51,000) and **standard multiplier 43p**, with a **new higher multiplier (~50.8p)** for properties with RV over £500,000. (VERIFY all three 2026/27 figures and the exact RV bands — RV under £51,000 vs over £500,000 — against gov.uk at write time per the statute-verification mandate.) **SBRR:** 100% relief under £12,000 RV, taper £12,000 to £15,000; and from **2026/27** a business expanding into a **second** property retains SBRR for **3 years** (previously 1 year).
3. **Second-home council tax premium omitted entirely.** The page does not mention the **LURA 2023 s.80 / LGFA 1992 s.11C** second-home premium (up to 100%) — a key reason owners seek a business-rates reclassification of a holiday property (to escape council tax + premium). Must be added with the **§30.4** commencement nuance (statutory floor 1 April 2024; commonly adopted 1 April 2025; the s.11C(3) one-year notice rule explains the split).

**Tertiary: THIN_DEPTH + STRUCTURE.** 820 words vs a ~3,000 target; 4 FAQs vs 12-14; no comparison table at top (the single highest-value snippet-bait asset for a "vs" query); no decision tree; 0 statute citations; 0 authority links; generic "we"/"smart landlords" voice; internal links point to product pages not cluster content. The page reads like a thin AI draft, which is consistent with its invisibility.

**Load-bearing fix sequence (ordered by ROI):**
1. **Correct the HMO error** and forward-link C3 (`government-to-end-council-tax-on-hmo-rooms`). Adopt the C3 conclusion verbatim-in-substance: HMOs in England are a single council-tax dwelling, owner liable, from 1 December 2023. This is the credibility-critical fix.
2. **Add a comparison table at the top** ("Which tax applies, by tenure type") — residential rental / HMO / holiday let meeting the test / holiday let failing the test / commercial unit — columns: which tax, who is liable, key statute / test, where to check. This is the snippet-bait + the page's reason to exist.
3. **Rewrite the self-catering section** with the full England two-limb test (140 available + 70 let), the 1 April 2026 averaging + charity-night additions, and the Wales (252/182) and Scotland (140/70) variations.
4. **Refresh the multiplier + SBRR** to 2026/27 figures (verified at write) and **add the second-home premium** section (LURA 2023 s.80 / LGFA 1992 s.11C, §30.4 commencement nuance).
5. **Body lift to ~3,000 words** with a "who is liable" section (LGFA 1992 s.6 hierarchy for council tax vs occupier/owner for business rates), a "how to check and how to challenge" section (VOA council-tax band check vs rateable-value check; challenge routes), and an anonymised worked scenario.
6. **FAQ count 4 to 12-14**, each targeting a distinct comparison/decision query; correct FAQ #1 (HMO), refresh FAQ #3 (multiplier).
7. **Authority links: 5-6 verified citations** (gov.uk self-catering page, gov.uk business rates / SBRR, LGFA 1992 s.11C, LURA 2023 s.80, SI 2023/1175, HA 2004 s.254) plus internal links to the council-tax cluster.
8. **Meta title + description rewrite** — lead with the comparison + a year anchor; strip the em-dash from the current description.

---

## Competitor URLs (Stage 2 — to be re-fetched + status-checked at execution per §16.31)

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/introduction-to-business-rates/self-catering-and-holiday-let-accommodation | Authority source for the two-limb test (140 available / 70 let) + 1 Apr 2026 averaging + charity nights | The exact test wording (cite + link as the source of truth) | gov.uk states the test but does NOT give the cross-tenure comparison, the HMO single-dwelling correction, or the second-home-premium decision context. Our page is the applied decision layer. |
| https://www.coastandcountry.co.uk/blog/holiday-let-business-rates-council-tax | Holiday-let-operator comparison content | Plain-English framing of the council-tax-vs-business-rates choice for FHL owners | Operator-blog scope (holiday lets only); no HMO reform, no commercial, no devolved depth, no statute. We cover the full tenure spread. |
| https://www.doublepoint.co.uk/articles/holiday-let-taxation-rules-understanding-business-rates-and-council-tax/ | Holiday-let taxation explainer | Structure of the business-rates vs council-tax decision for self-catering | Same narrow scope; verify it carries the post-2023 two-limb test and not the pre-2023 single-limb version (common stale error). |
| https://www.landlordtoday.co.uk/features/2026/02/understanding-the-tax-shift-for-holiday-let-landlords/ | 2026 trade-press feature on the holiday-let tax shift | Currency signal (2026-dated); framing of the policy shift | Trade-press scope; no statute, no devolved comparison, no HMO correction. |

**Competitor depth ceiling for this query class:** the live competitors are holiday-let-only blogs (typically 800-1,500 words, 0 statute citations, 0 FAQs, single-tenure). gov.uk is authoritative but narrow (the test, not the cross-tenure decision). **No competitor occupies the full cross-tenure comparison hub (residential / HMO / holiday-let / commercial) with the HMO single-dwelling correction + devolved variations + second-home premium + statute spine.** Our ~3,000-word hub with a comparison table, 12-14 FAQs, the two-limb test, and 5-6 verified citations is decisively best-in-class, not catch-up.

**What to borrow:** gov.uk's exact two-limb test wording (cite it). Holiday-let blogs' plain "should I switch to business rates?" framing for the FHL decision section.
**What to differentiate against:** every competitor is single-tenure. Our differentiators are the HMO single-dwelling correction (none of them carry it), the second-home premium decision context, the devolved (Wales/Scotland) variations, and the who-is-liable statute spine.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation reasoning protocol (§7, §16.18 — semantic, no Jaccard).** Candidate canonicals scanned and their equity:

| Candidate sibling | Equity / scope | Resolution |
|---|---|---|
| **this page** `property-business-rates-council-tax-landlords` | 0 GSC / 0 Bing impressions (invisible). Cross-tenure comparison intent. | **REWRITE in place.** No equity to protect; becomes the comparison hub. |
| `commercial-property-tax-landlords-rates-reliefs-allowances` | Also 0 GSC rows (invisible). Scoped to COMMERCIAL business rates + corporation tax + capital allowances, NOT the residential/HMO/holiday-let comparison. | **NOT a valid stronger collapse target.** Collapsing invisible-into-invisible gains nothing and deletes the only comparison page. Forward-link to it from the commercial row of the comparison table. |
| `government-to-end-council-tax-on-hmo-rooms` (C3) | GSC 4 impr / pos 44.0 / 2 queries (2026-05-26). Deeply + correctly cited to SI 2023/1175 art 3C + HA 2004 s.254. OWNS the HMO single-dwelling reform sub-topic. | **Do NOT duplicate.** Forward-link as the HMO canonical; adopt its conclusion in one tight paragraph + table row, then point readers there for the full mechanic, owner-liability detail, and retrospective-review route. |
| `hmo-tax-guide-rental-income-deductions-multi-tenant` (20 impr / pos 58.7) + `hmo-vs-standard-buy-to-let-tax-comparison` (5 impr / pos 17.8) | HMO income-tax pages — different intent (income tax, not the council-tax-vs-business-rates question). | No collision. Forward-link from the HMO section as "HMO income tax is covered separately." |
| `how-much-tax-holiday-let-property-uk` + `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` | Cover business-rates-for-FHL in passing only; their primary intent is income/CGT treatment of holiday lets. | No collision. Forward-link from the holiday-let section; this page owns the business-rates-vs-council-tax *classification* decision, those pages own the income/CGT treatment. |
| Council-tax cluster: `reduce-your-council-tax-bill-in-the-uk` (C6 hub), `single-person-council-tax-discount` (C8), `council-tax-for-new-builds` (C2) | Council-tax operational pages; no business-rates comparison. | No collision. Forward-link to C6 (the council-tax reduction hub) from the council-tax side of the comparison. |

**Distinctness statement:** this rewrite is the **cross-tenure DECISION / COMPARISON hub** — when does a residential rental, HMO, holiday let, or commercial unit pay business rates vs council tax; who is liable; how to check; SBRR; the second-home premium — spoke-linking out to the four deeper siblings (C3 HMO reform, commercial, holiday-let income tax, serviced-accommodation comparison). This is the natural top-of-cluster page none of the siblings occupy. **Conclusion: REWRITE in place. No REDIRECT-PROPOSED. No collapse.** The collapse-direction rule is inapplicable because the page is invisible (no equity to redirect) and no sibling owns the comparison intent (so there is no stronger target).

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page). All verified present on filesystem 2026-05-30 with the category-path noted:

- **HMO single-dwelling canonical (MOST IMPORTANT forward-link):** `government-to-end-council-tax-on-hmo-rooms` → `/blog/property-types-and-specialist-tax/government-to-end-council-tax-on-hmo-rooms`. Linked from the HMO row of the table AND the HMO section body. This is the page that proves the corrected HMO position.
- **Commercial sibling:** `commercial-property-tax-landlords-rates-reliefs-allowances` → `/blog/property-types-and-specialist-tax/commercial-property-tax-landlords-rates-reliefs-allowances`. Linked from the commercial row of the table.
- **Holiday-let income tax:** `how-much-tax-holiday-let-property-uk` → `/blog/property-types-and-specialist-tax/how-much-tax-holiday-let-property-uk`. Forward-link from the holiday-let section.
- **Serviced accommodation comparison:** `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` → `/blog/property-types-and-specialist-tax/serviced-accommodation-vs-buy-to-let-tax-comparison-2026`. Forward-link from the serviced-accommodation paragraph.
- **HMO income tax + HMO vs BTL:** `hmo-tax-guide-rental-income-deductions-multi-tenant`, `hmo-vs-standard-buy-to-let-tax-comparison` (both `/blog/property-types-and-specialist-tax/...`). Forward-link from the HMO section ("income tax on HMOs is covered separately").
- **Council-tax reduction hub:** `reduce-your-council-tax-bill-in-the-uk` → `/blog/property-types-and-specialist-tax/reduce-your-council-tax-bill-in-the-uk`. Forward-link from the council-tax side (reliefs, discounts, premiums).
- **Single-person discount:** `single-person-council-tax-discount` → `/blog/property-types-and-specialist-tax/single-person-council-tax-discount`. Optional forward-link where relevant to who-is-liable.
- **Existing Related-Reading links to keep (verify live):** `landlord-vat-registration-when-required`, `stamp-duty-buy-to-let-surcharge` (both `/blog/landlord-tax-essentials/...`). Keep; they are reasonable cluster-adjacent links.

**Reciprocity note (non-blocking):** C3 and the commercial sibling do not currently link back to this hub. A future cluster-tidy can add reciprocal links once this page earns impressions; do not edit those pages in this rewrite (Track 2 single-page discipline).

---

## House-position references (Stage 1)

- **§30 Council tax framework (LGFA 1992 + SI 1992/558 architecture)** [LOCKED 2026-05-26] — the spine. Specify jurisdiction (England / Wales / Scotland; NI uses domestic rates, NOT council tax — see §30.8). Cite the relevant s.11 sub-section for any premium/discount claim.
- **§30.4 Premium powers (post-LURA 2023)** [LOCKED, F-105 refinement 2026-05-28] — second-home premium = **LGFA 1992 s.11C inserted by LURA 2023 s.80**; empty-property premium = **LGFA 1992 s.11B as amended by LURA 2023 s.79**. **Commencement nuance is load-bearing:** the s.11C(3) one-year notice rule means the statutory floor is **1 April 2024** (FY 2024/25 for LAs that determined in 2023) but the **commonly-adopted** date is **1 April 2025** (FY 2025/26 for most tourism-area LAs). Do NOT write "premium in force from 1 April 2024" without the notice-rule caveat, and do NOT write "1 April 2025" as the statutory commencement (per §30.4 do-not-write).
- **§30.5 HMO and owner-liability mechanics** [LOCKED 2026-05-26] — HMO occupancy can shift liability to the owner; the reform is real and current. Verify the current SI 2023/1175 status at write per the §30.5 "verify current status at Stage 2" instruction. The C3 page is the anchored deep-dive.
- **§30.6 Cross-jurisdictional notes** [LOCKED 2026-05-26] — Wales: same primary Act, Welsh Ministers set bands, often more aggressive premiums. Scotland: LGFA 1992 as devolved, SSI variations. **NI: NO council tax; domestic rates apply — do not conflate (§30.8).**
- **§30.8 Do not write** [LOCKED] — do NOT write "council tax applies across the UK" (NI excepted); do NOT write the discount/premium errors listed there.
- **No dedicated non-domestic-rating (business rates) HP section exists.** Business-rates facts (multipliers, SBRR, the self-catering two-limb test, the RV bands) must be sourced from **gov.uk + VOA** and verified at write time. There is no HP lock to cite for business rates; cite gov.uk/VOA as the authority and date-stamp the verification.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — WRONG_ADVICE contradicting LOCKED §30.5 + the C3 sibling.** The current page's H2 "HMOs and Business Rates Liability" (body) and FAQ #1 assert HMOs "typically become liable for business rates rather than council tax." This contradicts:
- **LOCKED §30.5** (HMO owner-liability / reform), and
- the C3 sibling `government-to-end-council-tax-on-hmo-rooms`, which correctly states HMOs in England are banded as a **single council-tax dwelling** (SI 2023/1175 art 3C into SI 1992/549; HA 2004 s.254 meaning; owner liable under the Class C / SI 1992/612 regime) from **1 December 2023**.

This is the rewrite's first job. Flag to `track2_site_wide_flags.md` as:

**F-[next] | 2026-05-30 | HIGH | property-business-rates-council-tax-landlords | WRONG_ADVICE | Live page asserts HMOs "typically become liable for business rates rather than council tax" (body H2 + FAQ #1). False for England from 1 Dec 2023; contradicts LOCKED §30.5 and the C3 sibling government-to-end-council-tax-on-hmo-rooms (SI 2023/1175 art 3C, single-dwelling council tax, owner liable). Corrected at rewrite; C3 forward-linked as canonical. Audit-follow-up: check whether sibling holiday-let/HMO pages repeat the same HMO-business-rates error.**

**Pricing-leak check — CLEARED** (carried from diagnosis). FAQ #3's "£5,120 annually" and "£1,000-£3,000" are illustrative TAX figures (business rates / council tax), not Property Tax Partners fee quotes, so Decision-E (no firm fee comparisons) is NOT triggered. Refresh the multiplier figure but no lead-gen pricing leak exists. **Writer instruction:** do not introduce any "£X for our service" framing; keep illustrative tax figures clearly labelled as council-tax/business-rates amounts, not fees.

---

## Section-by-section content plan (~3,000 words)

Target: 11-13 H2s, ~3,000 body words, 12-14 FAQs, comparison table at top, 1-2 inline `<aside>` CTAs at conversion moments. Body in raw HTML per the markdown-rendering rule (no markdown `##`; use `<h2>`, `<p>`, `<table>`, `<ul>`). No em-dashes.

1. **Intro (~150 words).** Frame the decision question plainly: most rental property pays council tax; a minority pays business rates instead; the classification depends on tenure type and use, and getting it wrong (or missing a relief) costs money. State up front the single biggest correction: **HMOs in England do not default to business rates** (they are a single council-tax dwelling since 1 December 2023). Set expectations that the page covers residential rentals, HMOs, holiday lets / self-catering, and commercial units, England-led with Wales and Scotland flagged, and NI excluded (domestic rates, not council tax).

2. **Comparison table at top — "Which tax applies, by tenure type" (~120 words + table).** The snippet-bait asset. Rows: standard residential rental; HMO (England, post-1-Dec-2023); holiday let / self-catering meeting the test; holiday let failing the test; commercial / mixed-use unit. Columns: which tax applies; who is liable; the key statute or test; where to check / what to do. Each row one tight sentence; the HMO and holiday-let rows link to the deeper siblings.

3. **Council tax: the default, and who is liable (~280 words).** LGFA 1992 framework; the **s.6 liability hierarchy** (resident before owner); when the owner is liable instead of the resident (HMOs, certain arrangements — SI 1992/612). Specify jurisdiction (England/Wales/Scotland; NI uses domestic rates). Forward-link C6 council-tax reduction hub.

4. **Business rates: when non-domestic rules apply (~260 words).** What makes a property non-domestic; the rateable value concept (VOA-set, distinct from council-tax bands); the **2026/27 multipliers** (small business 38.2p RV under £51,000; standard 43p; higher ~50.8p RV over £500,000 — VERIFY at write); SBRR (100% under £12,000 RV, taper to £15,000; the 3-year retention on a second property from 2026/27). Worked illustration of a business-rates bill (refresh the stale 51.2p example to 2026/27).

5. **HMOs: the single-dwelling correction (~280 words) — THE LOAD-BEARING FIX.** State plainly: in England, since **1 December 2023**, an HMO (HA 2004 **s.254** meaning) is banded as a **single council-tax dwelling**, with the **owner liable** (SI 2023/1175 art 3C into SI 1992/549; Class C / SI 1992/612 owner-liability). HMOs do NOT default to business rates. Explain the pre-reform per-room banding that the reform ended, and the retrospective-review route in one sentence. Then forward-link the C3 page as the canonical deep-dive AND the HMO income-tax pages for the separate income question. Do NOT duplicate C3's full mechanic.

6. **Holiday lets and self-catering: the two-limb test (~340 words).** The **England** test (effective 1 April 2023): valued for business rates (and off council tax) only if, in the previous 12 months, the property was **available** to let commercially for at least **140 nights** AND **actually let** for at least **70 nights**, plus intention to make available for 140 nights in the coming year. From **1 April 2026**: **2-3 year averaging** where a single year misses, and up to **14 charity-donated nights** count toward the let limb. **Wales: 252 available / 182 let.** **Scotland: 140/70 (tracks England).** Cite + link the gov.uk self-catering page. Forward-link the holiday-let income-tax sibling and the serviced-accommodation comparison sibling. Note serviced accommodation can be more borderline (hotel-like services).

7. **The second-home premium: why some owners chase business rates (~260 words).** The **LGFA 1992 s.11C** second-home council tax premium (up to 100%, inserted by **LURA 2023 s.80**), with the **§30.4 commencement nuance** (statutory floor 1 April 2024 under the s.11C(3) one-year notice rule; commonly adopted 1 April 2025). Explain that a second/holiday home that does NOT meet the self-catering test stays on council tax AND can attract the premium, which is the real-world driver behind owners trying to qualify for business rates. Note Wales often more aggressive (§30.6). Forward-link C6.

8. **Who pays, and how the liability is set (~220 words).** Council tax: resident-first per s.6, owner where no resident or under SI 1992/612 (HMOs). Business rates: the occupier in occupation, the owner when empty (with empty-property rates relief nuances). Clarify that liability cannot be wholly contracted away to a tenant even where a tenancy says so; the statutory liability sits with the statutory person.

9. **How to check and how to challenge (~220 words).** Council tax: check the band via the VOA council-tax band service; challenge via the VOA. Business rates: check the rateable value via the VOA find-a-business-rates-valuation service; challenge via the VOA Check-Challenge-Appeal route, with time limits. Grounds for challenge (incorrect classification, excessive RV, change of use/condition). Note backdating risk and the value of keeping records of use, occupancy, and let-nights (especially for the 70-night limb).

10. **Anonymised worked scenario (~200 words).** Anonymised, no real client names (e.g. "a landlord with a three-bedroom shared house let to four working tenants who share a kitchen"): walk the HMO single-dwelling outcome (owner billed for one council-tax dwelling, not business rates, not per-room) and contrast with "a coastal cottage available 160 nights and let 90 nights" (meets the England test, moves to business rates, likely SBRR-covered if RV under £12,000). Show the decision logic, not fees.

11. **Planning and budgeting (~160 words).** Factor the correct classification into yield analysis; the SBRR opportunity for qualifying holiday lets; the premium exposure for non-qualifying second homes; the record-keeping discipline for the 70-night limb. Inline `<aside>` CTA to a discovery call (no pricing).

12. **Related reading (links).** C3 HMO reform, commercial sibling, holiday-let income tax, serviced-accommodation comparison, council-tax reduction hub, plus the existing VAT/SDLT links.

**FAQ plan (12-14, frontmatter `faqs:` array):**
1. Do HMO landlords pay business rates or council tax? (CORRECTED — single council-tax dwelling in England, owner liable, since 1 Dec 2023; link C3.)
2. When does a rental property pay business rates instead of council tax? (the classification triggers, tenure by tenure.)
3. What is the holiday-let business-rates test in England? (140 available + 70 let; 1 Apr 2026 averaging + charity nights.)
4. Is the holiday-let test different in Wales and Scotland? (Wales 252/182; Scotland 140/70.)
5. How much are business rates in 2026/27? (REFRESHED multipliers + SBRR; illustrative bill.)
6. Can I get small business rate relief on a holiday let? (100% under £12,000 RV, taper to £15,000; 3-year second-property retention from 2026/27.)
7. What is the second-home council tax premium and when does it apply? (s.11C / LURA 2023 s.80; §30.4 commencement nuance.)
8. Is it better to be on business rates or council tax for a holiday property? (decision framing, no fees; depends on RV, SBRR, premium exposure.)
9. Who is liable for council tax on a let property, the landlord or the tenant? (s.6 hierarchy; SI 1992/612 owner-liability for HMOs.)
10. Who pays business rates on an empty commercial unit? (owner; empty-rates relief nuance.)
11. How do I check whether my property is on council tax or business rates? (VOA band check vs RV check.)
12. Can I challenge a business rates assessment or council tax band? (VOA challenge routes + time limits.)
13. Does any of this apply in Northern Ireland? (No council tax in NI; domestic rates regime; §30.8.)
14. (Optional) Do purpose-built student blocks pay business rates? (PBSA vs traditional student houses; student Class N exemption cross-link.)

---

## Statute spine (every section number with its Act — VERIFY each against legislation.gov.uk at write time)

Per the statute-verification mandate (legislation.gov.uk, including Royal Assent date of any Finance Act per the F-37 Bill-vs-enacted pattern; F-8 content-can-be-removed-even-when-URL-is-live discipline):

- **Local Government Finance Act 1992 c.14, s.6** — council tax liability hierarchy (resident before owner). https://www.legislation.gov.uk/ukpga/1992/14/section/6
- **LGFA 1992 c.14, s.11** — council tax discounts (single-occupant 25%, s.11(1)(a)). https://www.legislation.gov.uk/ukpga/1992/14/section/11
- **LGFA 1992 c.14, s.11B** — long-term empty-property premium (as amended by LURA 2023 s.79). https://www.legislation.gov.uk/ukpga/1992/14/section/11B
- **LGFA 1992 c.14, s.11C** — second-home / periodically-occupied premium (inserted by LURA 2023 s.80); s.11C(2) "no resident + substantially furnished"; s.11C(3) one-year notice rule. https://www.legislation.gov.uk/ukpga/1992/14/section/11C
- **Levelling-up and Regeneration Act 2023 c.55, s.79** — "Long-term empty dwellings: England" (amends LGFA 1992 s.11B). VERIFY Royal Assent date (26 October 2023) + commencement.
- **LURA 2023 c.55, s.80** — "Dwellings occupied periodically: England" (inserts LGFA 1992 s.11C + s.11D). VERIFY commencement.
- **SI 2023/1175 — Council Tax (Chargeable Dwellings and Liability for Owners) (Amendment) (England) Regulations 2023, art 3C** (inserted into SI 1992/549) — HMO single-dwelling council-tax banding from 1 December 2023; reg 3 aligns Class C owner-liability with the s.254 meaning. https://www.legislation.gov.uk/uksi/2023/1175 . VERIFY commencement (1 Dec 2023, reg 1(2)).
- **SI 1992/549 — Council Tax (Chargeable Dwellings) Order 1992** (art 3 standard banding; art 3C HMO single-dwelling; art 6 challenge route). https://www.legislation.gov.uk/uksi/1992/549
- **SI 1992/612 — Council Tax (Liability of Owners) Regulations 1992** — Class C HMO owner-liability. https://www.legislation.gov.uk/uksi/1992/612
- **Housing Act 2004 c.34, s.254** — HMO definition used for the council-tax single-dwelling rule (3+ persons, 2+ households, shared amenity; broader than the s.55/s.61 mandatory-licensing test). https://www.legislation.gov.uk/ukpga/2004/34/section/254
- **SI 1992/558 — Council Tax (Exempt Dwellings) Order 1992, Class N** — all-students exemption (for the student-block FAQ). https://www.legislation.gov.uk/uksi/1992/558
- **Local Government Finance Act 1988 c.41** — the non-domestic rating (business rates) primary Act framework (multipliers, rateable value, SBRR sit under the 1988 Act and subsequent rating Acts). VERIFY the operative current rating provisions + the 2026/27 multiplier/SBRR figures against gov.uk/VOA (no HP lock exists for business rates). https://www.legislation.gov.uk/ukpga/1988/41/contents

**Business-rates figures (no statute lock — gov.uk/VOA sourced, VERIFY at write):** the self-catering two-limb test (140 available / 70 let; Wales 252/182; Scotland 140/70; 1 Apr 2026 averaging + 14 charity nights); 2026/27 multipliers (small business 38.2p RV under £51,000; standard 43p; higher ~50.8p RV over £500,000); SBRR (100% under £12,000, taper to £15,000; 3-year second-property retention from 2026/27).

**Verification note:** there is no Finance Act in this brief's spine (the relevant changes sit under LGFA 1988/1992, LURA 2023, and rating SIs, plus gov.uk-published rating policy). If the execution session finds any 2026/27 multiplier change has been enacted via a Finance Act or rating Act, apply the F-37 Royal-Assent verification before asserting it as enacted.

---

## Authority links worth considering (Stage 2 — verify liveness + content at execution)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/introduction-to-business-rates/self-catering-and-holiday-let-accommodation | Verified per diagnosis 2026-05-30 (the two-limb test source) | Cite + link as the source of the 140/70 test |
| https://www.gov.uk/introduction-to-business-rates | Verify at execution | Business rates overview |
| https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief | Verify at execution | SBRR thresholds + the 3-year second-property retention |
| https://www.gov.uk/correct-your-business-rates (VOA find-a-business-rates-valuation / Check-Challenge-Appeal) | Verify exact current URL at execution | How to check RV + challenge |
| https://www.gov.uk/council-tax-bands (VOA council-tax band check) | Verify at execution | How to check council-tax band + challenge |
| https://www.legislation.gov.uk/uksi/2023/1175 | Per §30.5 verify current status | HMO single-dwelling SI |
| https://www.legislation.gov.uk/ukpga/1992/14/section/11C | Per §30.4 lock | Second-home premium statute |
| https://www.legislation.gov.uk/ukpga/2004/34/section/254 | Verify at execution | HMO s.254 definition |

**(Execution session selects 5-6 to actually cite in body: the gov.uk self-catering page is mandatory; SBRR page; one VOA check/challenge page; LGFA 1992 s.11C; SI 2023/1175; HA 2004 s.254.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4` item 13, the voice rules, lead-gen architecture, CSS-in-markdown, FAQs-and-schema, anti-templating, quality bar, statute-citation discipline (F-8), and §16 lessons (esp §16.31 URL liveness, F-37 Bill-vs-enacted) are inherited from the parent program. **Critical for THIS brief:** NO em-dashes (the current meta description has one — strip it). NO pricing / NO firm fee comparisons (Decision E) — illustrative tax figures are fine but must be labelled as council-tax/business-rates amounts, not fees. NO real client names (anonymised scenario only). LeadForm auto-injected by `BlogPostRenderer.tsx` — do not duplicate; 1-2 inline `<aside>` CTAs only. Body in raw HTML (no markdown `##`).

---

## 19-step workflow — inherited from parent program (Track 2 deltas)

Inherits the full 19-step workflow per `TRACK2_PROGRAM.md §4` item 14. Track 2 deltas for this page:

- **Step 1:** read `docs/property/house_positions.md` §30 in full (esp §30.4, §30.5, §30.6, §30.8) at session start.
- **Step 4 (load-bearing pre-rewrite verification):** verify SI 2023/1175 art 3C + HA 2004 s.254 + LGFA 1992 s.11C + LURA 2023 s.80 against legislation.gov.uk; verify the gov.uk self-catering two-limb test + the 2026/27 multipliers + SBRR figures against gov.uk/VOA. The HMO correction and the multiplier refresh are the two factual must-fixes.
- **Step 5:** re-fetch the 4 competitor URLs to confirm liveness (httpx + proper User-Agent); reject non-200.
- **Step 6:** read the current source file in full (done in this brief).
- **Step 7:** read the C3 sibling (`government-to-end-council-tax-on-hmo-rooms`) end-to-end so the rewrite adopts its conclusion without duplicating it; skim the commercial + holiday-let siblings for forward-link anchors.
- **Step 9 (Track 2 delta — rewrite at existing path):** rewrite the markdown at the existing path. Preserve frontmatter `slug` + `canonical` + `category`. Add `dateModified` = rewrite date. Rewrite `metaTitle`, `metaDescription` (strip em-dash), `h1`, `summary`. Consider adding `reviewedBy: "ICAEW Qualified Senior Reviewer"` for parity with C3.
- **Step 10:** `cd Property/web && npm run build` must pass.
- **Step 11 (six checks):** FAQ schema count = frontmatter `faqs:` length; em-dash count = 0 (run a check on the whole file including frontmatter); no Tailwind classes in body; meta title <= 62 chars; meta description <= 158 chars; all internal links resolve. PLUS a pricing-check: confirm no "£X for our service" framing and that all £ figures are labelled council-tax/business-rates amounts.
- **Step 12:** confirm no redirect needed (none — slug + canonical kept; category kept).
- **Step 13:** insert a `monitored_pages` Supabase row for this slug (90-day window from rewrite date; this page was not previously monitored). Watch the 4 forward-linked siblings for regression.
- **Step 14:** commit on `main` with a message describing the HMO WRONG_ADVICE correction + comparison-hub lift.
- **Step 16:** raise the F-[next] WRONG_ADVICE flag (see House-position conflict flag) + the audit-follow-up to check siblings for the same HMO-business-rates error.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §30 council tax framework (jurisdiction specified; NI excluded): __
- §30.4 second-home premium (s.11C / LURA 2023 s.80; commencement nuance floor 1 Apr 2024 vs common 1 Apr 2025): __
- §30.5 HMO single-dwelling (SI 2023/1175 art 3C; HA 2004 s.254; owner liable; status verified at write): __
- §30.6 Wales (252/182) + Scotland (140/70) + NI domestic rates: __
- §30.8 do-not-write checks clear: __

### Statute verification at write (legislation.gov.uk + gov.uk/VOA)
- SI 2023/1175 art 3C status (1 Dec 2023): __
- HA 2004 s.254 wording: __
- LGFA 1992 s.11C + LURA 2023 s.80 (Royal Assent / commencement): __
- gov.uk self-catering two-limb test (140/70; 1 Apr 2026 averaging + 14 charity nights): __
- 2026/27 multipliers (38.2p / 43p / ~50.8p; RV bands): __
- SBRR (100% under £12k; taper to £15k; 3-year second-property retention): __

### Comparison: before vs after
- Word count: 820 → __ (target ~3,000)
- H2 count: 8 → __ (target 11-13)
- FAQ count: 4 → __ (target 12-14)
- Comparison table at top: 0 → 1
- Authority links: 0 → __ (target 5-6)
- Inline CTAs: 0 → __ (target 1-2)
- Em-dashes: >=1 (meta description) → 0
- HMO WRONG_ADVICE corrected: __ (Y/N)
- Multiplier refreshed 51.2p → 2026/27: __ (Y/N)
- Second-home premium added: __ (Y/N)
- C3 HMO canonical forward-linked: __ (Y/N)

### Flags raised
- F-[next] (WRONG_ADVICE HMO business-rates error — corrected): __
- Audit-follow-up (siblings repeating the HMO error): __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)

---

## metaTitle / metaDescription / h1 plan

**metaTitle (test 2-3 candidates at execution; lead with the comparison + a year anchor; <= 62 chars):**
- "Business Rates vs Council Tax for Landlords (2026/27 Guide)" (58 chars) — preferred
- "Do Landlords Pay Business Rates or Council Tax? 2026/27" (55 chars)
- "Business Rates vs Council Tax: HMOs, Holiday Lets, Commercial" (61 chars)

**metaDescription (<= 158 chars; NO em-dash; lead with the corrected HMO position + the cross-tenure promise + a soft hook):**
- Preferred: "When landlords pay business rates instead of council tax in 2026/27. HMOs, holiday lets and commercial units explained, with the rules for each." (146 chars)
- Alt: "HMOs are now a single council tax dwelling, not business rates. See which tax applies to rentals, holiday lets and commercial units in 2026/27." (143 chars)

**h1 (distinct from metaTitle; comparison-hub framing):**
- "Business Rates or Council Tax: Which Applies to Your Property?" — preferred
- Alt: "Business Rates vs Council Tax for UK Landlords: A 2026/27 Guide"

**summary (frontmatter `summary:` field, rewrite the existing one to reflect the corrected scope):**
- "Most rental property pays council tax, but HMOs, holiday lets and commercial units follow different rules. This guide sets out which tax applies to each property type in 2026/27, who is liable, how the holiday-let business-rates test works, why HMOs in England are now a single council tax dwelling, and how the second-home premium changes the decision."
