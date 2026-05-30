# Track 2 brief: landlord-insurance-guide-types-costs-tax-deductible

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; INVISIBLE + PRICING_LEAK + THIN_DEPTH + CTR_FAIL + STRUCTURE; load-bearing pricing-leak strip + re-scope onto coverage/selection intent)
**Source markdown path:** `Property/web/content/blog/landlord-insurance-guide-types-costs-tax-deductible.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/landlord-insurance-guide-types-costs-tax-deductible
**Middleware category mapping:** `middleware.ts` line 320 → `landlord-tax-essentials` (kept; this is the buyer/coverage family, NOT the section-24-and-tax-relief deductibility family)
**Stage 1 priority:** **M** — zero direct GSC/Bing signal on its own slug (genuinely INVISIBLE), so there is no CTR multiple to chase. The reason it is worth rewriting (rather than collapsing) is that it is the ONLY page on the site serving the "which landlord insurance policy types do I need / how do I choose cover for HMO / commercial / serviced-accommodation" intent. The lift is about (a) stripping a hard-rule pricing-leak violation that is live in production, and (b) re-scoping the page firmly onto coverage/selection so it is cleanly distinct from the stronger deductibility canonical and can begin earning long-tail impressions.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (data from diagnosis payload + filesystem source read + house_positions cross-check + corpus internal-link verification + middleware redirect map read; competitor URL liveness deferred to execution per §16.31)
**Cannibalisation status:** **REWRITE** (NOT collapse). This page serves a distinct primary intent (policy-type selection / coverage by property type) for which it is the only page on the site. The deductibility/payout-tax intent is owned by the stronger ICAEW-reviewed canonical `landlord-insurance-tax-deductible`; this page cuts its tax-mechanics material down to a short signpost that internal-links to that canonical, eliminating overlap. Equity-direction rule satisfied: this page has zero ranking equity and a different query universe, so it is NOT 301'd anywhere; and the stronger canonical must NOT be allowed to absorb this different intent.

> This brief is drafted to the gold-reference depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-rewrite reference `briefs/property/track2/trial/birmingham-property-accountant.md`. Unlike the CGT gold reference (dominant lever = meta + snippet repositioning) and unlike the deductibility canonical sibling (dominant lever = factual remediation), THIS page's dominant lever is **(1) pricing-leak removal (hard-rule compliance, non-negotiable, first job)** and **(2) intent re-scoping** so the page is a clean, distinct coverage/selection guide rather than a half-duplicate of the deductibility canonical. Depth lift (1,301 → ~3,200 words) comes third, riding on top of those two structural moves.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `landlord-insurance-guide-types-costs-tax-deductible`. The slug literally names the intent (types + costs + tax-deductible) and the page sits in `landlord-tax-essentials`. No redirect of this slug, in either direction. The diagnosis is explicit: equity-direction rule says we do NOT 301 a zero-equity page with a distinct intent, and we do NOT let the stronger deductibility canonical absorb a different query universe. The slug stays; the page is re-scoped, not retired.
- **Category:** `landlord-tax-essentials` (kept; canonical path segment `/blog/landlord-tax-essentials/`). The page is a buyer/coverage essentials guide. It must NOT drift into the `section-24-and-tax-relief` family — that is the canonical sibling's territory and the source of the cannibalisation risk.
- **Gap-mode tag:** `PRICING_LEAK` (PRIMARY — Decision-E hard-rule violation live in production; first job) + `INVISIBLE` (0 impressions on own slug, Google AND Bing) + `THIN_DEPTH` (1,301 words vs 3,200 target) + `CTR_FAIL` (no impressions to convert, so the meta is rebuilt for the SERP it should be entering, not an existing one) + `STRUCTURE` (no reviewer block, no top-of-page coverage-selector table, FAQs not yet at the gold-reference floor, tax-mechanics overlap with canonical needs cutting to a signpost).
- **"Why this rewrite" angle:** This is the only "which policy types do I need + how do I choose cover by property type" page on the site. The rewrite (1) strips every general-market premium/fee figure (Decision E hard rule), replacing each with qualitative, non-numeric framing (lender-required, location-driven, percentage-of-rent basis without quoting the band); (2) re-scopes the body firmly onto coverage selection — buildings vs contents vs liability vs rent guarantee vs legal expenses vs emergency, then HMO vs commercial vs serviced-accommodation vs standard BTL, then a selection framework by ownership structure and portfolio size; (3) replaces the on-page tax-deductibility sections with a tight signpost block that forward-links to the canonical `landlord-insurance-tax-deductible` for premium deductibility and payout taxation, so the two pages do not compete; (4) adds an anonymised social-proof scenario, an ICAEW reviewer block, a top-of-page coverage-selector summary, and lifts to ~3,200 words; (5) softens the advice-y "company ownership may qualify for better commercial rates" line into a neutral structural observation.

---

## Current page snapshot (Stage 2 — filesystem source read 2026-05-30)

**Frontmatter:**
- `title`: "What Types of Landlord Insurance Do You Need and Are They Tax Deductible?"
- `metaTitle`: "Landlord Insurance Guide: Types, Costs & Tax Deductibility" (57 chars — no year, no CTR hook, generic)
- `metaDescription`: "Complete guide to landlord insurance types, costs and tax deductibility. Essential BTL insurance comparison for UK property investors in 2026." (140 chars; the word "costs" sets a pricing expectation the rewrite must NOT meet on-page)
- `category`: "Landlord Tax Essentials"
- `h1`: "What Types of Landlord Insurance Do You Need and Are They Tax Deductible?"
- `faqs`: **4 entries** (below the 12-14 gold-reference floor; and FAQ #2 is a pricing-leak — quotes £150-£400 / £100-£300 / £50-£150 / £240-£720 / 2-6% bands and must be cut/rewritten).
- **No `reviewedBy` / `reviewerCredentials` / `dateModified` / `reviewedAt` block** (unlike the canonical sibling). Add an anonymised ICAEW reviewer block at rewrite.
- No `metaTitle_prev` / `metaDescription_prev` — no prior meta-rewrite attempted; the meta is original and weak.

**Body:**
- Word count: **1,301** (diagnosis) → target **3,200**.
- H2 outline (6 H2s): Essential Types of Landlord Insurance (H3s: Buildings / Contents / Liability / Rent Guarantee / Legal Expenses) / Specialist Insurance for Different Property and Ownership Types (H3s: HMO / Commercial / Serviced Accommodation / Insurance by Ownership Structure) / Landlord Insurance Tax Deductibility (H3s: Fully Deductible Types / Tax Relief Calculations and Timing) / Cost Comparison and Shopping Tips (H3s: Key Factors / Money-Saving Strategies) / Claims Management and Documentation / Future Considerations and Professional Advice.
- Worked examples present: 0 numeric coverage examples; 1 pricing-leak worked figure ("save £320, 40% of £800") in the tax section — must be cut.
- Inline `<aside>` CTAs: **0** (add 1-2 at conversion moments; do NOT duplicate the auto-injected LeadForm).
- Outbound authority links: **0** to gov.uk / legislation.gov.uk / HMRC manuals.
- Internal links: 5 in body (rental-income guide, BTL ltd-co guide, landlord-tax-deductions list, MTD deadline page, what-does-a-property-accountant-do). Note: it does NOT currently link to the canonical deductibility sibling `landlord-insurance-tax-deductible` — the rewrite MUST add that forward-link as the load-bearing distinctiveness move.
- Inbound internal links: **1** (from the pet-rights page) — almost no equity at stake, confirming REWRITE-not-collapse.
- `date`: 2026-04-10; no `dateModified` (add, set to write date).

**Pricing-leak inventory (every on-page general-market fee/cost figure — ALL must be stripped):**
1. FAQ #2 answer: "£150-£400 ... £100-£300 ... £50-£150 ... £240-£720 (2-6% of annual rent) ... HMO and commercial 20-50% more".
2. Buildings H3 body: "£150-£400 for a standard two-bedroom BTL property".
3. Contents H3 body: "£100-£300 for a fully furnished two-bedroom property".
4. Liability H3 body: "£1-2 million coverage and cost around £50-£150 annually".
5. Rent Guarantee H3 body: "2-6% of your annual rental income ... £12,000 annual rent, expect to pay £240-£720".
6. Legal Expenses H3 body: "£75-£200".
7. HMO H3 body: "20-50% more than standard BTL insurance".
8. Commercial H3 body: "£200-£500 annually for small commercial units".
9. Tax-relief section: "£800 annually ... save £320 (40% of £800)".
10. Money-Saving Strategies: "annual typically costs 10-15% less than monthly".

**Note on coverage-limit figures:** £1-2m / £5-10m liability limits and "6-12 months of rent" loss-of-rent durations are *cover specifications*, not *general-market prices/fees*, so they are not Decision-E pricing-leaks. They may be retained as factual coverage descriptions (qualitatively framed: "commonly carry liability limits of several million pounds", "loss-of-rent cover typically runs for a fixed number of months"). The execution session should keep them descriptive and avoid implying a quoted product. The £30-£80 pet-damage-insurance uplift referenced in house_positions §20.7/§20.11 is a house-position figure about a *cover type's existence*, not a fee we are quoting; the rewrite should describe pet-damage cover qualitatively and signpost the canonical for deductibility rather than restate the £30-£80 band.

---

## GSC angle (last 90 days) — from diagnosis payload

- **Current slug GSC:** **0 impressions** for its own slug on Google AND **0 on Bing**. Fully INVISIBLE.
- **Sibling cluster (for context, not this page's equity):** the canonical `landlord-insurance-tax-deductible` carries the cluster signal ("is landlord insurance tax deductible" 11 impr pos 47; "income tax on landlord insurance claims" 25 impr pos 25.2; predecessor slug 30 impr). The third page `landlord-insurance-tax-deductible-what-can-you-claim` is already 301'd into the canonical (middleware line 382; 37 impr pos 30.2 historically).
- **Primary query target (this page):** "what types of landlord insurance do I need (UK)" — a coverage/selection intent, distinct from the deductibility cluster.
- **Secondary query targets:** "do I need HMO insurance / hmo landlord insurance requirements", "what insurance do I need for a commercial rental property", "serviced accommodation insurance vs buy-to-let insurance", "do I need rent guarantee insurance", "landlord legal expenses insurance Section 21", "buildings vs contents insurance landlord", "is landlord insurance a legal requirement", "what landlord insurance do I need for a limited company portfolio".
- **Read:** classic INVISIBLE page on a clean, distinct intent. The lever is not a meta tweak on an existing SERP position (there is none); it is to become the genuinely deepest coverage-selection answer on the site, cleanly differentiated from the deductibility canonical, so it begins earning long-tail impressions on policy-type-selection queries that gov.uk and the canonical sibling do not target. Frame success as cluster differentiation + first impressions, not a CTR multiple.

**GA4:** not separately pulled at brief time; expected near-zero sessions given the 0-impression floor. Execution pulls `ga4_page_data` for the current slug to confirm.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: PRICING_LEAK (Decision-E hard-rule violation live in production; first job, non-negotiable).**

The page is saturated with general-market premium/fee figures (10 distinct instances catalogued in the snapshot above), including a worked "save £320 (40% of £800)" figure and an "annual is 10-15% cheaper than monthly" comparison. Per the memory-locked lead-gen handoff model (`agency_lead_gen_model.md`) and house_positions §13, the five niche sites carry **no pricing/fees on-page, no real client names, anonymised social proof only**. Decision E is explicit that even soft "£800-£1,500 general-market" style fee comparisons are a pricing-leak. **Every general-market premium/fee figure must be removed and replaced with non-numeric qualitative framing** (e.g. buildings insurance is "usually required by your buy-to-let lender and priced on rebuild cost, location and claims history"; rent guarantee is "typically priced as a percentage of the annual rent" without quoting the band; HMO/commercial cover is "generally more expensive than standard BTL cover, reflecting the higher risk" without the 20-50% figure). This is the same F-1 pricing-leak pattern caught on the Birmingham city page; here it is denser and includes a worked tax-saving figure. A rewrite that lifts depth on top of a live hard-rule violation is worse than no rewrite, so the strip comes first.

**Secondary: INVISIBLE.** 0 impressions on its own slug (Google + Bing). The page is not surfacing for the coverage-selection intent it should own. The route out of invisibility is to become the most complete, clearly-scoped coverage-selection guide on the site (the only page targeting this intent) while pointing the deductibility/payout questions to the canonical so the two pages stop diluting each other's topical signal.

**Tertiary: THIN_DEPTH + CTR_FAIL + STRUCTURE.** 1,301 words vs 3,200 floor. No reviewer block (unlike the canonical sibling). No top-of-page coverage-selector summary table. 4 FAQs vs the 12-14 floor. The current "Landlord Insurance Tax Deductibility" + "Tax Relief Calculations and Timing" sections overlap directly with the canonical sibling's territory — this is the cannibalisation surface and must be cut down to a signpost. Meta title has no year and no CTR hook.

**Borderline advice-y framing to soften (carry-over from diagnosis risk notes):**
- "Company ownership often provides more flexibility in insurance arrangements and **may qualify for better commercial rates** on portfolio policies" — soften to a neutral structural observation (e.g. "Insurers offer portfolio and multi-property policies; the right structure for cover depends on how the properties are held and managed") with no implied recommendation and no rate claim.
- The "19% small profits rate / 25% main rate" loose framing in the ownership-structure paragraph: tighten to the marginal-relief banding per house_positions §21 (19% small profits up to £50,000, 25% main rate above £250,000, marginal relief between), OR — preferably — move the corporation-tax-deductibility point entirely into the canonical signpost so this page does not carry tax-rate mechanics at all (cleaner distinctiveness).

**Load-bearing fix sequence (ordered by ROI):**

1. **Strip every general-market pricing/fee figure** (all 10 instances + the FAQ #2 figures + the £320 worked saving + the 10-15% monthly-vs-annual figure). Replace with qualitative framing. This is non-negotiable and comes first. Execution runs a `grep -E '£[0-9]|[0-9]+%'` sweep over the body + FAQs and confirms zero general-market price/fee matches remain (coverage-limit specifications and statutory percentages such as the Section 24 reducer rate are not pricing-leaks; the sweep is for *premium/fee* figures).
2. **Cut the tax-mechanics sections to a signpost.** Replace "Landlord Insurance Tax Deductibility", "Tax Relief Calculations and Timing", and the per-type deductibility list with a short "Are landlord insurance premiums tax deductible?" block (3-4 sentences: yes, most are allowable revenue expenses against rental income under the wholly-and-exclusively rule; payouts are not automatically tax-free) that forward-links to the canonical `landlord-insurance-tax-deductible` for the full premium-deductibility + payout-taxation treatment. This is the load-bearing distinctiveness move.
3. **Re-scope and deepen the coverage/selection body to ~3,200 words.** Expand each policy type with what it covers, what it excludes, when it is required (lender / HMO licence / mortgage condition) vs optional, and how to judge adequacy. Deepen the property-type sections (HMO, commercial, serviced accommodation, standard BTL) and add a selection framework by portfolio size and ownership structure. Add an anonymised scenario (e.g. "a landlord converting a single let into a three-tenant HMO finds their standard BTL policy will not respond...").
4. **Add a top-of-page coverage-selector summary** (answer-shaped: a compact table mapping property/situation → which cover types are typically essential vs optional, with NO prices). Snippet-bait for "what insurance do I need for [HMO / commercial / serviced accommodation]".
5. **FAQ count 4 → 12-14**, each targeting a coverage-selection secondary query verbatim, with the pricing FAQ replaced by a "what drives the cost of landlord insurance?" explainer FAQ that lists qualitative cost-drivers (rebuild cost, location, property age, tenant type, claims history, security) WITHOUT quoting figures, and points cost-conscious readers to a discovery call.
6. **Add ICAEW reviewer block** (anonymised: `reviewedBy: ICAEW Qualified Senior Reviewer`, matching the canonical sibling's style) + `dateModified` + `reviewedAt`.
7. **Verify the regulatory/statute spine at write time** (RRA 2025 s.2 / s.21 abolition in force 1 May 2026 per SI 2026/421; FHL abolition 6 April 2025; April 2027 22/42/47 per FA 2026 ss.6-7; MTD thresholds). All verified correct at diagnose time; re-verify per §16.31 + the F-37 Royal-Assent discipline.
8. **Meta title rewrite #1** — add a year + a coverage-selection CTR hook, lead with the selection intent not "costs" (which sets a pricing expectation we will not meet on-page). Candidates in the meta plan below.

---

## Competitor URLs (Stage 2 — pending live verification at execution per §16.31)

**For execution session — fetch each with httpx + proper User-Agent, confirm 200, date-stamp, replace any non-200:**

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.money.co.uk/landlord-insurance/what-type-of-landlord-insurance-do-i-need | Clean "which type do I need" coverage-selector structure; consumer-readable cover-type breakdown | It is a comparison/affiliate page leading with price; we lead with selection logic and tax-signpost, NO prices |
| https://letcompliance.com/blog/landlord-insurance-uk-2026-complete-guide | 2026 regulatory framing (RRA 2025, EPC); HMO/licensing tie-in | Verify their RRA/commencement framing against house_positions §20; we cite the enacted Act + SI 2026/421 precisely |
| https://www.which.co.uk/money/mortgages-and-property/buy-to-let/landlord-insurance-aWKKd8M9Ni74 | Authority-grade plain-English cover-type explanations; "is it a legal requirement" framing | Which? is consumer-generalist; our differentiator is the property-type-specific selection (HMO/commercial/SA) + the tax-deductibility signpost to a specialist canonical |
| https://www.nrla.org.uk/news/rentguards-guide-to-insurance-for-landlords | Landlord-association credibility; rent guarantee + legal expenses framing in a post-Section-21 world | Association content is product-partner-led; we stay product-neutral and tax-led |
| https://www.alanboswell.com/landlord-insurance/landlord-cover/hmo-insurance/ | Deep HMO-specific cover detail (occupancy, licensing-compliant cover, communal-area cover) | Insurer product page; we generalise to HMO selection criteria without endorsing a product and tie to HMO licensing (Housing Act 2004) |

**Competitor depth ceiling for this query class:** consumer comparison/insurer pages, typically 1,200-2,000 words, 0-2 FAQs, 0 statute citations, price-led. Our ~3,200-word target with 12-14 FAQs, qualitative (price-free) cost framing, a property-type coverage-selector, a clean tax-deductibility signpost to a specialist canonical, and verified regulatory citations puts us decisively best-in-class for the selection intent — and uniquely tax-credible without becoming a price-comparison page.

**What to borrow overall:** the money.co.uk / Which? coverage-selector structure (which type for which situation).
**What to differentiate against overall:** all five competitors are price-led and/or product-partner-led. Our moat is (a) property-type-specific selection logic (HMO / commercial / serviced accommodation / standard BTL), (b) a price-free, lead-gen-compliant treatment, and (c) the tax-deductibility/payout signpost to the specialist canonical — a combination no competitor offers.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest refresh per program §3 heartbeat).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own page) | landlord-insurance-guide-types-costs-tax-deductible | self | **REWRITE in place** — re-scope onto coverage/selection |
| Direct pair — stronger canonical (Track 2 rewrite, ICAEW-reviewed, dated 2026-05-21) | landlord-insurance-tax-deductible (`section-24-and-tax-relief`) | Premium deductibility + payout taxation | **No cannibal after re-scope.** This page CUTS its tax-mechanics to a signpost and forward-links to the canonical. The canonical owns deductibility/payout; this page owns types/coverage/selection. The forward-link is the load-bearing distinctiveness device. |
| Already 301'd (middleware line 382) | landlord-insurance-tax-deductible-what-can-you-claim | Historical deductibility variant | Already redirected into the canonical; no action. Confirms the deductibility intent is consolidated, leaving the coverage/selection intent free for THIS page. |
| Excluded (rewritten) | hmo-vs-standard-buy-to-let-tax-comparison | HMO vs BTL (tax angle) | No cannibal — that page is a tax comparison; this page references HMO *insurance* selection and forward-links. |
| Residual / corpus | hmo-licensing-fees-tax-deductible-uk-landlords (rewritten) | HMO licensing cost (tax) | No cannibal — licensing fees, not insurance. Cross-link from the HMO insurance section (licence-compliant cover). |
| Corpus | serviced-accommodation-tax-fhl-abolition-april-2025 / serviced-accommodation-vs-buy-to-let-tax-comparison-2026 | Serviced accommodation (tax) | No cannibal — tax pages; this page references SA *insurance* selection and forward-links. |
| Corpus | commercial-property-tax-landlords-rates-reliefs-allowances | Commercial property (tax) | No cannibal — tax page; this page references commercial *insurance* selection and forward-links. |
| Corpus | landlord-tax-deductions-uk-2026-complete-list (rewritten) | Allowable-expense list | No cannibal — insurance is one line item there; this page's tax signpost links to it + the canonical. |

**Conclusion:** **REWRITE in place. No REDIRECT-PROPOSED in either direction.** The equity-direction rule is satisfied: this page has zero ranking equity and a distinct query universe, so it is not collapsed into the stronger canonical (which would bury a different intent), and the stronger canonical is not allowed to absorb that intent. Distinctiveness is enforced mechanically by (a) re-scoping onto types/coverage/selection and (b) cutting tax-mechanics to a forward-linking signpost.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page). **The first link is load-bearing for distinctiveness and MUST be added:**

- **Deductibility/payout canonical (LOAD-BEARING SIGNPOST):** `landlord-insurance-tax-deductible` (`/blog/section-24-and-tax-relief/landlord-insurance-tax-deductible`) — the tax-mechanics signpost block forward-links here for "are premiums deductible / are payouts taxable". This is the device that makes the two pages distinct rather than competing.
- **Allowable-expense list:** `landlord-tax-deductions-uk-2026-complete-list` (`/blog/section-24-and-tax-relief/...`) — secondary tax forward-link from the signpost block.
- **HMO insurance section partners:**
  - `hmo-licensing-fees-tax-deductible-uk-landlords` (rewritten) — licence-compliant cover tie-in.
  - `hmo-vs-standard-buy-to-let-tax-comparison` (rewritten) — HMO vs BTL context.
  - `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` — licensing regime context for HMO cover requirements.
- **Commercial insurance section partner:** `commercial-property-tax-landlords-rates-reliefs-allowances`.
- **Serviced-accommodation section partners:** `serviced-accommodation-tax-fhl-abolition-april-2025`; `serviced-accommodation-vs-buy-to-let-tax-comparison-2026`.
- **Ownership-structure section partner:** `buy-to-let-limited-company-complete-guide-uk` (rewritten) — for the company-vs-personal framing (keep insurance-structure-only; tax goes via the signpost).
- **Legal-expenses-insurance / RRA context:** `landlord-tax-changes-2026-complete-guide` (residual) and any RRA 2025 / Section 21 page in the corpus — link the legal-expenses cover rationale to the post-Section-21 possession landscape.
- **MTD record-keeping:** `making-tax-digital-landlords-april-2026-deadline` — keep ONE MTD forward-link in the records section (do not over-weight tax).
- **Service page:** `what-does-a-property-accountant-do` — soft forward-link at the closing CTA.

---

## House-position references (Stage 1)

- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only. This is the PRIMARY governing position for this rewrite (pricing-leak strip). Verify the exact wording at execution and confirm the body + FAQ sweep returns zero general-market fee figures.
- **§34 Landlord allowable expenses architecture** [LOCKED 2026-05-27]: for the tax signpost block only — premiums are allowable revenue expenses via ITTOIA 2005 s.272 (import gateway) applying s.34 (wholly-and-exclusively). Do NOT cite s.34 standalone; cite "s.34 ITTOIA 2005 as applied to property businesses by s.272". Keep this to a sentence or two — the canonical owns the depth.
- **§4 Section 24** [LOCKED]: insurance premiums are NOT finance costs and are not restricted by Section 24; relief is at the landlord's marginal rate. Keep to one clarifying sentence in the signpost (the canonical covers it fully). The reducer rises to 22% for 2027/28 (§7) — do not over-explain here.
- **§6 FHL abolition** [LOCKED]: FHL regime abolished 6 April 2025 — for the serviced-accommodation insurance section framing (operators reassessing cover alongside tax position). Do NOT write "FHL still applies".
- **§7 April 2027 property income rates** [LOCKED 2026-05-30]: 22/42/47 enacted via FA 2026 ss.6-7 (Royal Assent 18 March 2026), effective 6 April 2027, England + Wales + NI (only Scotland carved out). If the page mentions deduction value changing in 2027/28, state as enacted law (no Bill-vs-enacted hedge), but verify §7 lock + Royal Assent at write time per F-37. **Do NOT write "England + NI only".** Prefer to route this entirely into the canonical signpost rather than restate rate mechanics here.
- **§19 / §3 MTD ITSA** [LOCKED]: thresholds £50,000 (6 April 2026), £30,000 (6 April 2027), £20,000 (6 April 2028); insurance is a standard MTD expense category — for the one-line records/MTD point only.
- **§20 Renters' Rights Act 2025** [LOCKED 2026-05-22, commencement table 2026-05-24]: Section 21 abolition is via RRA 2025 **s.2** (NOT s.4), in force **1 May 2026** per **SI 2026/421** reg.2. This underpins the legal-expenses-insurance rationale (possession now runs through reformed Section 8 grounds, not Section 21). Cite s.2 and SI 2026/421 precisely; do NOT write "Section 21 is still available" or "the Bill is in passage".
- **§20.7 / §20.11 pet-damage insurance** [LOCKED]: landlord's own pet-damage cover is a normal deductible landlord insurance operating expense; it CANNOT lawfully be required as a tenant consent condition. If the rewrite mentions pet-damage cover (relevant post-RRA), state it qualitatively and route deductibility to the signpost; do NOT imply it can be charged to the tenant.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — F-(next) PRICING_LEAK (house_positions §13 / Decision-E hard rule).** The live page carries 10 distinct general-market premium/fee figures plus a worked "save £320" tax figure and a "10-15% cheaper" payment-frequency figure (full inventory in the snapshot). This is a denser instance of the F-1 Birmingham pattern and includes a worked tax-saving figure.

Execution session MUST:
- Strip every general-market premium/fee figure from body + FAQs; replace with qualitative framing.
- Replace the pricing FAQ with a qualitative cost-drivers explainer FAQ.
- Confirm via sweep that zero general-market fee figures remain.

Flag to `track2_site_wide_flags.md` as **F-(next) | 2026-05-30 | HIGH | landlord-insurance-guide-types-costs-tax-deductible | HOUSE_POSITION_CONFLICT (PRICING_LEAK) | 10 general-market premium/fee figures + worked £320 tax-saving + 10-15% payment-frequency figure live on-page; Decision-E hard-rule violation; strip all and re-frame qualitatively at rewrite.**

**Secondary soft flag — ADVICE-Y FRAMING.** "Company ownership ... may qualify for better commercial rates" and the loose "19% / 25%" corporation-tax framing should be softened/tightened (or routed to the canonical) per the diagnosis risk notes. Not a separate F-flag unless execution finds it recurs across the cluster.

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2025/26/section/2 | Verify in force per SI 2026/421 | Renters' Rights Act 2025 s.2 (Section 21 abolition) — legal-expenses-cover rationale |
| https://www.legislation.gov.uk/uksi/2026/421 | Verify at execution | SI 2026/421 (Commencement No.2) — 1 May 2026 appointed day |
| https://www.legislation.gov.uk/ukpga/2004/34/contents | Verify at execution | Housing Act 2004 Part 2 (HMO licensing) — HMO insurance / licence-compliant cover |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | Verify at execution | ITTOIA 2005 s.272 import gateway — one-line tax signpost only |
| https://www.legislation.gov.uk/ukpga/2005/5/section/34 | Verify at execution | ITTOIA 2005 s.34 wholly-and-exclusively (as applied via s.272) — one-line signpost |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2110 | Verify content + URL at execution (PIM2110 = "Insurance premiums and recoveries"; NOT PIM2068 per canonical-sibling F-correction) | If the signpost cites a manual, use PIM2110, not PIM2068 |
| https://www.gov.uk/government/publications/abolition-of-the-furnished-holiday-lettings-tax-regime | Verify at execution | FHL abolition 6 April 2025 — serviced-accommodation framing |
| https://www.gov.uk/guidance/check-if-you-need-a-licence-to-rent-out-your-property (or current HMO-licensing gov.uk page) | Verify exact path at execution | HMO licensing requirement context |

**(Execution session selects 4-7 to actually cite in body. Keep tax-statute citations minimal here — depth belongs to the canonical.)**

---

## metaTitle / metaDescription / h1 plan (Stage 2)

The current meta leads with "costs", which sets a pricing expectation the lead-gen model forbids on-page. Re-lead with the SELECTION intent + a year hook. Keep ≤ 60 chars (title) / ≤ 158 chars (description).

**metaTitle candidates (execution picks one; ≤ 60 chars):**
1. "Landlord Insurance Types Explained: What Cover You Need 2026"
2. "What Landlord Insurance Do You Need? Types & Cover Guide 2026"
3. "Landlord Insurance Guide 2026: Types, Cover & What You Need"

(Lead with "types / what cover you need", NOT "costs". The word "costs" stays out of the title to avoid the pricing expectation.)

**metaDescription candidate (≤ 158 chars; selection-led, no price promise):**
- "Which landlord insurance do you need? Buildings, contents, liability, rent guarantee, legal and HMO or commercial cover explained for UK landlords in 2026."

**h1 candidate:** "What Types of Landlord Insurance Do You Need? A UK Coverage Guide" (drops the "Are They Tax Deductible?" tail from the current h1 — that intent now lives in the canonical; the h1 should signal coverage/selection, with the tax question handled by a clearly-labelled signpost section).

---

## Proposed section-by-section content plan (~3,200 words)

H2/H3 outline (execution refines; target 11-13 H2-level sections, 12-14 FAQs, 1-2 inline CTAs, rates/price-free throughout):

1. **Intro (no H2)** — landlord insurance is about matching cover to how the property is let; brief promise (which types, which property-types, how to choose) + one line that premium deductibility/payout-tax is covered in the linked specialist guide. (~120 words)
2. **Coverage selector (top-of-page answer-shaped table, NO prices)** — property/situation → typically essential vs optional cover types (standard BTL, furnished let, HMO, commercial, serviced accommodation, leasehold flat). Snippet-bait. (~180 words + table)
3. **Is landlord insurance a legal requirement?** — not statutorily compulsory in general, but buildings cover is almost always a BTL mortgage condition; some cover types are de-facto required by HMO licence conditions or leases. (~220 words)
4. **The core cover types** (H3 each: Buildings / Contents / Public liability / Rent guarantee / Legal expenses / Landlord emergency) — what each covers, common exclusions, when required vs optional, how to judge adequacy. Qualitative cost-driver notes, NO figures. Legal-expenses H3 ties to RRA 2025 s.2 / reformed Section 8 possession (post-1 May 2026). (~900 words)
5. **Cover by property and let type** (H3 each: Standard BTL / HMO / Commercial and mixed-use / Serviced accommodation and short-term lets / Leasehold flats and the freeholder's policy) — selection criteria per type; HMO ties to Housing Act 2004 licensing; SA ties to FHL abolition (§6); commercial differs fundamentally from BTL cover. (~700 words)
6. **Cover by ownership structure** — personal vs limited-company vs partnership: how the holding structure affects policy arrangement (portfolio/multi-property policies), framed neutrally (no "better rates" claim). Tax point deferred to signpost. (~250 words)
7. **Are landlord insurance premiums tax deductible? (SIGNPOST BLOCK — kept short)** — 3-4 sentences: yes, most premiums are allowable revenue expenses against rental income (wholly-and-exclusively, ITTOIA 2005 s.34 via s.272); not restricted by Section 24; payouts are not automatically tax-free. Forward-link to canonical `landlord-insurance-tax-deductible` for the full premium + payout treatment, and to `landlord-tax-deductions-uk-2026-complete-list`. (~150 words)
8. **What drives the cost of cover (qualitative, NO figures)** — rebuild cost, location/flood/subsidence, property age, tenant type, claims history, security, excess level, single vs portfolio policy. Cost-conscious readers pointed to a discovery call, not a number. (~280 words)
9. **Anonymised scenario** — e.g. a landlord converting a single let to a three-tenant HMO discovers the standard BTL policy will not respond; walks through the cover-selection decision (HMO policy, higher liability limit, licence-compliant cover). No names, no prices. (~220 words)
10. **Claims and documentation** — records to keep, prompt notification, capital-vs-revenue note for the records angle only (full tax in canonical). (~200 words)
11. **Regulatory changes affecting cover (2026-2028)** — RRA 2025 (Section 21 abolition via s.2, in force 1 May 2026, SI 2026/421 → legal-expenses cover value); FHL abolition (SA reassessment); MTD record-keeping (insurance is a standard expense category). All verified at write time. (~280 words)
12. **Working with a specialist (closing CTA)** — soft handoff; forward-link to `what-does-a-property-accountant-do`. Inline `<aside>` CTA (do not duplicate auto-injected LeadForm). (~120 words)
13. **FAQs (12-14)** — see plan below.

**FAQ plan (12-14, each targeting a secondary query verbatim; pricing FAQ removed):**
1. What types of landlord insurance do I actually need? (primary-query verbatim)
2. Is landlord insurance a legal requirement in the UK?
3. Do I need different insurance for an HMO?
4. What insurance do I need for a commercial rental property?
5. Is serviced-accommodation insurance different from buy-to-let insurance?
6. Do I need rent guarantee insurance?
7. What does landlord legal expenses insurance cover after Section 21 abolition?
8. Buildings vs contents insurance — which do I need as a landlord?
9. What insurance do I need for a leasehold flat I let out?
10. What drives the cost of landlord insurance? (qualitative cost-drivers, NO figures — replaces the stripped pricing FAQ)
11. Are landlord insurance premiums tax deductible? (short answer + link to canonical)
12. Can I claim a premium I paid in advance? (timing — keep brief, route detail to canonical)
13. Does the holding structure (personal vs company) change the insurance I need?
14. Do I need landlord insurance during void periods or renovation?

---

## Statute / regulatory spine (every citation to be VERIFIED at write time per §16.31 + F-37)

| Citation | Act / instrument | House position | Use on page |
|---|---|---|---|
| Renters' Rights Act 2025 s.2 | 2025 c. 26 | §20.2 / §20.12 [LOCKED] | Section 21 abolition (legal-expenses cover rationale) — cite s.2, NOT s.4 |
| SI 2026/421 reg.2 | Commencement No.2 Order 2026 | §20.12 [LOCKED] | 1 May 2026 appointed day for s.21 abolition / reformed Section 8 |
| Housing Act 2004 Part 2 | 2004 c. 34 | §20 context / HMO cluster | HMO licensing → HMO insurance / licence-compliant cover |
| ITTOIA 2005 s.272 | 2005 c. 5 | §34.1 [LOCKED] | Import gateway — one-line tax signpost only |
| ITTOIA 2005 s.34 (as applied via s.272) | 2005 c. 5 | §34 [LOCKED] | Wholly-and-exclusively test — signpost only; never cite s.34 standalone |
| Income Tax Act 2007 s.272A / Section 24 mechanics | 2007 c. 3 | §4 [LOCKED] | Premiums are NOT finance costs / not S24-restricted — one clarifying sentence |
| Finance Act 2026 ss.6-7 | FA 2026 (RA 18 Mar 2026) | §7 [LOCKED 2026-05-30] | April 2027 22/42/47 (if deduction-value mentioned) — enacted, no hedge; verify RA; NOT "England + NI only" |
| FHL abolition (from 6 April 2025) | F(No.2)A 2024 / FA 2025 abolition measure | §6 [LOCKED] | Serviced-accommodation cover reassessment framing — verify the enacting provision at write time |
| MTD-ITSA thresholds (£50k/£30k/£20k) | SI 2026/336 (and predecessor) | §19.1 / §19.18 [LOCKED] | Insurance is a standard MTD expense category — one-line records point |
| PIM2110 (if a manual is cited) | HMRC Property Income Manual | canonical-sibling F-correction | Insurance premiums and recoveries — use PIM2110, NOT PIM2068; verify URL + content |

**Verification discipline:** RRA 2025 s.2 + SI 2026/421 commencement, FA 2026 ss.6-7 Royal Assent (18 March 2026), the FHL-abolition enacting provision, and the current MTD threshold SI must all be re-checked against legislation.gov.uk / gov.uk at write time. The Bill-vs-enacted (F-37) pattern applies to any Finance Act citation. Keep the tax-statute footprint deliberately thin on this page — the depth belongs to the canonical, and over-citing tax statutes here re-opens the cannibalisation surface.

---

## Universal rules (do not skip)

(Same as Wave 5 brief / `competitor_rewrite_playbook.md §5`. **CRITICAL for this brief:** NO pricing or fee figures anywhere in body or FAQs (Decision-E hard rule — this is the page's primary defect). NO em-dashes (use commas, parentheses, full stops, middle dots). Anonymised social proof only; no real client names. LeadForm auto-injected by `BlogPostRenderer.tsx` — do not duplicate; 1-2 inline `<aside>` CTAs at conversion moments only. Body in raw HTML (`<p>`, `<h2>`, `<table>`), not markdown syntax, per the blog-rendering rule. FAQs in frontmatter `faqs:` array (12-14); never hand-add FAQ schema in body. No Tailwind utility classes in markdown body.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `docs/property/house_positions.md` §13, §34, §4, §6, §7, §19, §20 (esp. §20.2 + §20.12) in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → execution marks 🔵 then ✅).
3. Read this brief end-to-end.
4. Read the canonical sibling `Property/web/content/blog/landlord-insurance-tax-deductible.md` in full — the rewrite must NOT duplicate its deductibility/payout material; it must signpost to it.
5. **Verify the statute/regulatory spine** against legislation.gov.uk / gov.uk (RRA 2025 s.2 + SI 2026/421; FA 2026 ss.6-7 Royal Assent; FHL-abolition provision; MTD threshold SI; PIM2110 if cited). Load-bearing pre-rewrite step.
6. Re-fetch the 5 competitor URLs to confirm liveness at execution (httpx + proper User-Agent; replace any non-200).
7. Read the current source file in full + the 6-8 closest sibling pages (HMO/commercial/SA insurance partners) for cross-link accuracy.
8. Plan rewrite outline per the section plan above: ~3,200 body words, 12-14 FAQs, top-of-page coverage selector, tax-mechanics cut to a signpost.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + category (`Landlord Tax Essentials`) + original `date`. Add `dateModified` (today), `reviewedBy: ICAEW Qualified Senior Reviewer`, `reviewerCredentials`, `reviewedAt`. Rewrite metaTitle (selection-led, no "costs", year hook) + metaDescription + h1 per the meta plan.
9b. **STRIP every general-market premium/fee figure** (10 body instances + FAQ #2 + £320 worked saving + 10-15% payment figure); replace with qualitative framing.
9c. **CUT tax-deductibility sections to a short signpost** forward-linking the canonical `landlord-insurance-tax-deductible`.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Run six checks PLUS pricing sweep: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 60 chars; meta description ≤ 158 chars; all internal links resolve; **pricing sweep `grep -E '£[0-9]' Property/web/content/blog/landlord-insurance-guide-types-costs-tax-deductible.md` returns 0 general-market fee matches** (coverage-limit specs / statutory rates excepted, but ideally zero `£` in body).
12. Confirm no redirect needed (none — slug kept; distinct intent; equity-direction rule says do not 301).
13. Insert/confirm `monitored_pages` Supabase row for this slug; INVISIBLE-baseline → 180-day window per the F-11 recommendation (no pre-rewrite impressions to baseline against).
14. Commit on `main`: `git commit -m "Track 2: rewrite landlord-insurance-guide-types-costs-tax-deductible (pricing-leak strip + coverage/selection re-scope)"`. Tracker edits to main repo file via absolute paths only.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the pricing-leak flag resolution + any new discoveries.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness (esp. whether the advice-y "better commercial rates" framing recurs across the cluster).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §13 do-not-write (pricing rule): __ confirmed all general-market fee figures removed (sweep result: __)
- §34 s.34-via-s.272 (signpost only): __
- §4 Section 24 (premiums not finance costs): __
- §6 FHL abolition (SA framing): __
- §7 April 2027 — lock + RA verified, "England + NI only" avoided: __
- §19 MTD thresholds: __
- §20.2 / §20.12 RRA 2025 s.2 + SI 2026/421 (legal-expenses rationale): __

### Comparison: before vs after
- Word count: 1,301 → __
- H2 count: 6 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Coverage-selector table at top: 0 → __ (1 expected)
- Reviewer block added: __ (Y/N)
- Tax-mechanics cut to signpost + canonical forward-link added: __ (Y/N)
- General-market fee figures removed: __ (count removed; residual __ )
- metaTitle: "Landlord Insurance Guide: Types, Costs & Tax Deductibility" → __
- metaDescription: __
- h1: "What Types of Landlord Insurance Do You Need and Are They Tax Deductible?" → __

### Flags raised
- F-(next) carried from brief (PRICING_LEAK — confirmed stripped): __
- Advice-y framing softened ("better commercial rates" / loose 19/25 CT): __
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
