# Property: architecture recommendations, 2026-08-05

Final deliverable of the Property SEO audit programme. It supersedes the architecture and
sequencing sections of `PROPERTY_COMMERCIAL_PLAN_2026-08-05.md` and carries the eight
amendments (A1 to A8) from `PROPERTY_ANALYSIS_AUDIT_2026-08-05.md`.

Inputs, all verified 2026-08-05: `PROPERTY_ANALYSIS_AUDIT_2026-08-05.md` (verdicts and
corrected fact base), `PROPERTY_SEO_SURFACE_MAP_2026-08-05.md` (15 Tier-1 clusters),
`expansion_research/_prop_audit_2026_08_05/waterfall_matrix.md` (page-to-term matrix),
`.../skeptic_verdicts.md`, `.../dfs/serp_composition.json` (live UK SERPs, 25 terms),
`docs/_engines/property_frozen_pages.md`, and direct reads of `Property/web/src/app/*` and
`Property/niche.config.json`.

Every figure below carries its source in brackets. Where a figure disagrees with an earlier
Property document, the audit's corrected fact base wins and the earlier document is stale.

---

## 1. Executive summary: the corrected strategy in ten lines

1. Property is not at its ceiling. Impressions grew 11,521 to 77,466 between April and July
   while average position improved 13.8 to 10.1, and 870 pages now earn at least one
   impression (GSC 90d to 2026-08-05, `gsc_monthly.json`, `gsc_pages.json`).
2. The gap is commercial capture. The commercial query bucket earns 326 queries, 4,856
   impressions and 5 clicks in 90 days, roughly 6,080 impressions once the classifier's
   0.80 recall is corrected for (audit §4).
3. Nothing owns the money terms. Across the 20 highest-impression head queries, zero of the
   roughly 40 page slots point at a core commercial page. Every impression lands on a blog
   post or a `/locations/*` page (`waterfall_matrix.md` §2.3).
4. The head term is served by a careers article. `how-to-become-property-accountant` takes
   195 of 278 impressions on "property accountant" at position 24.8, and the term splits
   across 11 URLs with no page in the top 10 (`gsc_headterm_pages.json`).
5. The homepage should not be the ranking target. On the 13 commercial terms with live SERP
   data, 96 of 117 ranked slots (82%) are non-homepage service, specialism or equivalent
   business pages and only 21 (18%) are homepages, and every ranking homepage belongs to an
   exact-match domain (`serp_composition.json`). Ours is not one.
6. The fix is a nav-linked `/services/*` money tier. New pages need no frozen-page sign-off,
   inherit sitewide equity through the nav (a config entry each, plus a one-off `SiteHeader`
   change if they are nested rather than added flat), and each owns exactly one cluster.
7. The largest single miss is `landlord tax` at 2,900/mo: zero Google impressions on exact
   match, 897 on contains variants and zero clicks, while Bing serves the same term 1,064
   impressions and 121 clicks at 11.4% CTR (audit §5). That is a serving failure, not an
   authority ceiling.
8. The largest single volume pool is the stamp duty calculator family at 246,000/mo on the
   bare term, where we sit at position 65.2 with 46 impressions. It is a rescue, not a build.
9. City pages are consolidated within each city, never into national pages. City queries hold
   our best commercial positions at 9.2 to 14.8 against national heads at 25 to 34, so the
   original 301 direction would have destroyed the only page-1-adjacent rankings we hold
   (amendment A1).
10. The no-GBP rule now caps more than was thought. A local pack sits on 11 of 25 tracked
    commercial terms including `property accountant` itself, so six of the fifteen Tier-1
    clusters are permanently capped at the organic block beneath the pack (amendment A8).

---

## 2. Homepage adjudication

**The question.** Should the homepage rank for the main money terms, with specialist pages
owning sub-terms in a waterfall beneath it? The surface map instead recommends new
`/services/*` pages as the cluster owners.

**Verdict: build the money tier at `/services/*`. The homepage stays frozen, keeps its brand
and conversion role, and becomes the top of the link waterfall rather than the ranking target
for any money term.**

### What the owner instinct gets right

Two things, and both are load-bearing.

Concentration is correct and it is the single biggest defect measured. "property accountant"
(278 impressions, 90 days) splits across 11 URLs at an average position of 25.2 with zero
clicks, and "property accountants" (83 impressions) splits across 9
(`gsc_headterm_pages.json`). Neither cluster has a page in the top 10. The diagnosis that one
URL must own one money term is exactly right, and it drives most of the page plan below.

The waterfall is correct as an architecture. There is currently no tier structure at all:
`/property-tax-rates` has zero internal links from nav, footer, homepage body or any of the
roughly 6,150 counted blog in-body hrefs, and the `/calculators` hub route is not linked from
the homepage body either (`waterfall_matrix.md` §2.7 and §2.9). A deliberate homepage to money
tier to hub tier to blog tier link architecture is the right target state, and section 3b
specifies it.

### What the evidence changes

Only one thing: which URL does the concentrating.

**Evidence 1: the SERPs are won by dedicated service pages, not homepages.** Across the 13
commercial terms with live UK SERP data in `serp_composition.json`, the ranked slots break
down as follows. Read the label carefully: the pull records ranks 1 to 16, not ranks 1 to 10,
and roughly a third of the 117 slots sit at rank 11 or below. The 96 are every non-homepage
result, of which 25 carry the explicit `service` page type and the rest are specialism,
sector or client-type pages classed as `other`. None is a blog post.

| Page type in the ranked block (ranks 1 to 16) | Slots | Share |
|---|---:|---:|
| Non-homepage service, specialism or sector page | 96 | 82% |
| Homepage | 21 | 18% |
| Blog post | 0 | 0% |
| **Total slots, 13 commercial terms** | **117** | **100%** |

The winning shape is consistent across the set: `hwfisher.co.uk/specialisms/property/`,
`djh.co.uk/specialisms/property/`, `taxassist.co.uk/who-we-help/landlords`,
`gorillaaccounting.com/accountants-for-buy-to-let-landlords/`,
`geraldedelman.com/services/property-tax-advisers/`,
`mccaccountants.co.uk/property-accountants/`. These are precisely the pages the surface map
recommends we build and do not have.

**Evidence 2: the homepages that do rank are exact-match domains.** All six distinct domains
holding a ranked homepage slot across those 13 terms are single-niche firms whose domain is
the search term: `thepropertyaccountant.co.uk`, `ukpropertyaccountants.co.uk`,
`uklandlordtax.co.uk`, `property-tax-advice.co.uk`, `thebuytoletaccountant.co.uk`,
`buytolettaxaccountants.co.uk` (`serp_composition.json`). Their homepage ranks because their
homepage *is* the service page. `propertytaxpartners.co.uk` is not an exact match for
"property accountant", "landlord accountant" or "property investment accountant". Copying the
mechanism without the domain copies the form and not the cause.

**Evidence 3: the homepage has already run this experiment and lost.** The metaTitle already
targets the head term ("Property Accountants UK"). The homepage earns 42 impressions, 1 click
and 10 queries in 90 days, ranks for brand only, and appears in zero of the 11 server slots
for "property accountant" and zero of the 9 for "property accountants"
(`waterfall_matrix.md` §1, `gsc_headterm_pages.json`). Targeting is not the binding
constraint. A page with no cluster-specific depth and no supporting link tier is, and that is
a body problem the homepage cannot solve without becoming a service page, which is the same
work with a worse gate attached.

**Evidence 4: the cost asymmetry is one-sided.** The homepage is a frozen conversion surface
carrying 32 of 116 all-time leads and requires an explicit per-page sign-off line in
`docs/_engines/property_frozen_pages.md` before any edit, plus the DJH gate (amendment A3),
plus preview-gate and manual-walk QA on live lead machinery. A new `/services/*` page requires
none of that: it removes nothing, redirects nothing and touches no conversion surface. It is
also reversible by deletion, which the homepage is not.

**Evidence 5: nav inheritance is close to free.** Site navigation is config-driven from
`Property/niche.config.json` (`navigation` and `footer_links`, consumed via
`siteConfig.nav`/`siteConfig.footer` in `src/config/site.ts`), and putting the money pages in
the nav puts them on every page of the site, which is the sitewide equity the homepage would
otherwise be needed to supply. One caveat the plan must carry: `navigation` is a flat array of
`{label, href}` and `SiteHeader.tsx` maps it flat in both the desktop nav and the mobile
drawer, with no child or dropdown rendering anywhere. So either the four money pages go in as
flat top-level entries (config only, but a six-item nav becomes ten), or `SiteHeader` gains
child rendering once, in both nav surfaces, with keyboard and mobile handling. Recommended:
nest under Services and pay the one-off component change, and treat it as code with a preview
gate and manual walk, not as a config edit.

### The recommendation stated plainly

The waterfall is built, and it starts one tier lower than the instinct assumed. `/services`
becomes the commercial hub, each money term gets one nav-linked `/services/*` child that owns
it, hubs and calculators sit beneath, and the blog tier links up into them. The homepage sits
above the waterfall as the brand and conversion surface, links down into the money tier, and
is deliberately not asked to rank for "property accountant".

The homepage question is deferred, not closed. If the 90-day read on the money tier shows
`/services/property-accountant` established inside the top 20 and the DJH question is
resolved, revisiting a homepage commercial rewrite becomes a live option with evidence behind
it. Doing it first spends the highest-cost gate on the lowest-confidence bet.

One consequence to be explicit about: `/services` currently carries the metaTitle "Property
Accountant Services UK | Specialist Tax Advice for Landlords"
(`src/app/services/page.tsx:10`), which targets the same head term as the homepage. Under this
recommendation `/services` narrows to hub framing and the head term moves to
`/services/property-accountant`. That resolves the homepage-versus-`/services` conflict in
plan item 2.2 without touching a frozen page.

---

## 3. Page plan by Tier-1 cluster

Dispositions: **KEEP** (page exists and is correctly aimed, add depth only), **REASSIGN**
(page exists, change what it targets), **NEW** (build), **DEMOTE** (stop competing),
**FOLD** (absorb into another page, no separate URL).

### 3.0 Cluster dispositions at a glance

| Cluster | Volume/mo | Disposition | URL |
|---|---:|---|---|
| T1-01 Property accountant family | 720 | NEW | `/services/property-accountant` |
| T1-02 Landlord accountant family | 390 | NEW | `/services/landlord-accountant` |
| T1-03 Property tax advisor / specialist | 210 | NEW | `/services/property-tax-advice` |
| T1-04 Landlord tax (informational head) | 2,900 | NEW pillar + REASSIGN | `/landlord-tax` + `/property-tax-rates` |
| T1-05 Buy-to-let accountant | 110 | FOLD (wave 2 review) | into `/services/landlord-accountant` |
| T1-06 Property investment accountant | 320 | NEW (wave 2) | `/services/property-investment-accountant` |
| T1-07 Property management accounting | 210 | NEW (wave 2) | `/services/property-management-accounting` |
| T1-08 Rental property accountant | 110 | FOLD | into `/services/landlord-accountant` |
| T1-09 Non-resident landlord | 880 | NEW | `/services/non-resident-landlord` |
| T1-10 Incorporation | 480 | KEEP + extend | `/incorporation` |
| T1-11 Section 24 | 590 | NEW explainer above existing calculator | `/section-24` |
| T1-12 Making Tax Digital for landlords | 1,900 | NEW hub, calculator stays a tool | `/making-tax-digital-landlords` |
| T1-13 Stamp duty calculator family | 246,000 | REASSIGN (SEO rescue, frozen page) | `/calculators/stamp-duty-calculator` |
| T1-14 CGT on property | 14,800 | KEEP + rescue-lite | `/calculators/capital-gains-tax-calculator` |
| T1-15 Landlord / rental income tax calculator | 880 | REASSIGN (rename-facing) | `/calculators/rental-income-tax-calculator` |
| Careers cluster | 90 (jobs) | DEMOTE (quarantine) | 3 core posts plus 2 related |
| 50 head-term blog metaTitles | n/a | DEMOTE (retitle, keep content) | blog tier |

Volumes are DataForSEO Google Ads UK, pulled 2026-08-05, from the surface map; they are
cluster representatives and are never summed.

All content on every NEW page is written by Opus under the locked voice standard. The
metaTitle and H1 lines below are **direction only**, to fix the target term and the intent.
They are not copy and they are not to be pasted.

---

### 3.1 The money tier: `/services/*`

Four pages in wave 1, three more considered in wave 2. Each owns one cluster and only one.

#### NEW: `/services/property-accountant` (T1-01)

| Field | Spec |
|---|---|
| Target cluster | Bare head "property accountant" / "property accountants" (720/mo, CPC GBP 17.55), "specialist property accountant" (170), "property accountant near me" (170), "property accounting services" (140) |
| Current state | 278 impressions across 11 URLs at position 25.2, zero clicks; top server is a careers post at position 24.8 |
| SERP shape | AI overview, local pack, PAA. NO-GBP applies: pack holders are UK Property Accountants, Tax Space Ltd, Optimise Accountants |
| metaTitle direction | Head term first, UK qualifier, specialism proof, no superlatives. Illustrative: "Property Accountants for UK Landlords and Investors" |
| H1 direction | The head term as a plain noun phrase, matched to the metaTitle, not a slogan |
| Body requirement | Answers what a property accountant does, who it is for, what the engagement covers, what it costs in ranges, and how it differs from a general accountant. Fees and cost is one of only two Tier-3 themes with no owning page anywhere on the site, so the pricing section is a real gap being closed, not filler |
| Feeding posts (link in, none merged in wave 1) | `how-much-does-a-property-accountant-cost` (23 clicks/90d, frozen, link only), `property-accountant-services` category hub, `what-does-a-property-accountant-do` style posts in that category |
| Internal links in | Nav (child of `/services`), `/services` hub body, homepage body link down (single link, no layout change, still requires the frozen-page sign-off, so it is a wave-2 item and not a launch blocker), blog generator up-tier rule (see 3b) |
| Schema | `Service` with `provider` referencing the existing `Organization` node, plus `FAQPage` on the genuine questions answered. No `LocalBusiness`, no address-based schema, no aggregate rating |
| QA gate before ship | `voice_scan.py` band clean or minor; factual pass against ground-truth memories; cannibalisation pre-flight against the 50 head-term blog metaTitles (the DEMOTE work in 3.5 must ship first or simultaneously); preview-gate plus manual walk; no phone number, no named individual, no credential claim |

#### NEW: `/services/landlord-accountant` (T1-02, absorbing T1-08 and T1-05)

| Field | Spec |
|---|---|
| Target cluster | "landlord accountant" / "accountant for landlords" (390, CPC GBP 11.87), "landlord tax accountant" (70, CPC GBP 22.02), "landlord accountant near me" (70), plus folded sections for "rental property accountant" (110, T1-08) and "buy to let accountant" (110, T1-05) |
| Current state | Position 31.6 on 9 impressions; no page owns it |
| SERP shape | Local pack, PAA, no AI overview on the bare head. NO-GBP applies |
| Merge decision | T1-08 folds in as a section, as the surface map recommends: the SERP for "rental property accountant" is served by the same domains as "landlord accountant" (TaxAssist, Gorilla, FHP), so intent is not distinct. T1-05 folds in for wave 1 at 110/mo and is reviewed for promotion to its own page at the 90-day read |
| metaTitle / H1 direction | "Accountants for Landlords" phrasing, since "accountant for landlords" and "landlord accountant" share the SERP and the plural-possessive form reads naturally |
| Feeding posts | `landlord-tax-essentials` category hub, `landlord-tax-return-complete-guide-2026`, `first-time-landlord-tax-guide`, `landlord-accounting-spreadsheet-template-free-excel-guide` (96 clicks/90d, frozen, link only) |
| Internal links in | Nav child, `/services` hub, `/landlord-tax` pillar (3.2), blog up-tier rule |
| Schema | `Service` plus `FAQPage` |
| QA gate | As above, plus explicit check that no section duplicates `/services/property-accountant` copy. Sameness across the money tier is the failure mode that created the current mess |

#### NEW: `/services/property-tax-advice` (T1-03)

| Field | Spec |
|---|---|
| Target cluster | "property tax advisor" (210, CPC GBP 17.44), "property tax specialist" (210), "property tax accountant" (210, currently position 34.0 on 72 impressions), "property tax advice" / "property tax consultant" (320), near-me variants (140, CPC GBP 17.31) |
| Current state | Best position in the family is 18.2 on near-me variants; nothing owns the cluster |
| SERP shape | Local pack, PAA on advisor and specialist. NO-GBP applies |
| Notable | This is the advisory-intent page, distinct from the compliance framing of the two above. Highest CPC concentration in the Tier-1 set outside property management |
| metaTitle / H1 direction | "Property Tax Advice" as the head, with advisor and specialist as natural body phrasings rather than three stuffed variants |
| Feeding posts | The London specialist blog duplicates listed in `waterfall_matrix.md` are the natural merge candidates, but they are city-intent and therefore governed by amendment A1: they consolidate within London, not into this national page. Link only |
| Internal links in | Nav child, `/services` hub, `/property-tax-rates`, blog up-tier rule |
| Schema | `Service` plus `FAQPage` |
| QA gate | As above, plus a slug and keyword pre-flight against `/services/property-accountant`, which is the nearest neighbour and the highest cannibalisation risk in the new tier |

#### NEW: `/services/non-resident-landlord` (T1-09)

| Field | Spec |
|---|---|
| Target cluster | "non resident landlord scheme" (880), "non-resident landlord tax" (90), overseas and abroad phrasings (110), NRL returns and forms (30) |
| Current state | Positions 55 to 62 across the family on 77 impressions combined |
| SERP shape | AI overview, PAA, no local pack. This is the only high-volume Tier-1 commercial cluster with no pack, so the no-GBP cap does not bite |
| Notable | The surface map records that NRL form queries already rank 7 to 9 on blog posts, so page-level authority exists in the cluster and is fragmented rather than absent. The SERP is gov.uk-heavy at ranks 1 and 2, which caps the realistic prize at the block beneath |
| metaTitle / H1 direction | Scheme name first, since "non resident landlord scheme" is the volume, with the tax and returns intent handled in body sections |
| Feeding posts | `non-resident-landlord-tax` category hub and the NRL form posts already ranking 7 to 9. Those posts are performing, so they are linked and not merged |
| Internal links in | Nav child, `/services` hub, `/landlord-tax` pillar, NRL category hub |
| Schema | `Service` plus `FAQPage` |
| QA gate | As above. Factual pass is heavier here: NRL6, NRL1 and the 20% deduction mechanics must be checked against current HMRC guidance, not against our own older posts |

#### Wave 2, gated on the 90-day read

`/services/property-investment-accountant` (T1-06, 320/mo, pack present) and
`/services/property-management-accounting` (T1-07, 210/mo, CPC GBP 26.15, the highest in the
set, pack present). Both are real, both are capped by the no-GBP rule, and neither is worth
building before the wave-1 four have demonstrated whether a nav-linked `/services/*` page can
reach page 1 on a packed SERP. Building all seven at once would repeat exactly the mistake
that created the current cannibalisation, at a larger scale.

---

### 3.2 The hub tier

#### NEW: `/landlord-tax` pillar (T1-04)

The single largest addressable miss on the site.

| Field | Spec |
|---|---|
| Target cluster | "landlord tax" (2,900/mo), plus the sub-themes: changes and budget (720), HMRC angle (320), tax return (260), relief and expenses (110), how much do I pay (170) |
| Baseline, corrected | Google exact match zero impressions; contains variants 46 queries, 897 impressions, zero clicks; Bing 1,064 impressions, 121 clicks, 11.4% CTR (audit correction 6). The post-launch read is measured against 897 Google impressions, not against zero, or the page will appear to succeed by measuring a footprint that already existed |
| SERP shape | AI overview and PAA, no local pack. Ranks 2 and 5 to 8 are gov.uk, Propertymark, LITRG, Simply Business and Alan Boswell, so this is an informational SERP won on completeness and citability, not on commercial framing |
| metaTitle / H1 direction | The bare term as the subject, UK-qualified, with the answer promised in the title rather than a service pitch |
| Feeding posts (link, do not merge) | `landlord-tax-changes-2026-complete-guide`, `landlord-tax-deductions-uk-2026-complete-list`, `landlord-tax-return-complete-guide-2026`, `landlord-tax-calendar-2026-27-key-dates`, `hmrc-penalties-late-landlord-tax-returns-2026`, `first-time-landlord-tax-guide`. Thirty-three blog metaTitles already contain "landlord tax" (`repo_counts.json`), so the pre-flight cannibalisation check on this page is mandatory and the DEMOTE sweep in 3.5 should extend to the worst of those 33 |
| Internal links in | Nav (top-level, not a `/services` child, because the intent is informational), `/property-tax-rates`, `/calculators/rental-income-tax-calculator`, `/section-24`, `/services/landlord-accountant`, blog up-tier rule from the `landlord-tax-essentials` category |
| Links out (the waterfall down) | The rental income tax calculator, the Section 24 explainer, the MTD hub, and one money-tier link to `/services/landlord-accountant` |
| Schema | `FAQPage` on the question-formed H2s. Not `Service`: this page answers, it does not sell |
| QA gate | Standard gates plus arithmetic check on every worked example and rate table, against the ground-truth memories listed in §6 |

#### REASSIGN and rescue: `/property-tax-rates`

Fully orphaned on every axis measured: zero internal links from nav, footer, homepage body or
the roughly 6,150 counted blog in-body hrefs, and zero head-term GSC presence
(`waterfall_matrix.md` §2.7). It is a rates reference that already exists and costs nothing to
connect.

Actions: add to nav or to the footer quick links (footer is the lower-risk option and is a
one-line change in `Property/niche.config.json`); link from `/landlord-tax`, from
`/calculators/capital-gains-tax-calculator` for the rates intent the surface map pairs it
with (T1-14), and from the `landlord-tax-essentials` category hub. Schema stays as is. QA gate
is the factual pass only, since no copy rewrite is proposed in this phase.

#### NEW: `/section-24` explainer (T1-11)

`/calculators/section-24-calculator` exists and is a frozen conversion surface
(`property_frozen_pages.md`). The cluster needs an explainer above the tool, not a change to
the tool.

| Field | Spec |
|---|---|
| Target cluster | "section 24 tax" (590), "what is section 24" (320), landlord framing (210), mortgage interest relief (110). Currently position ~46.3 on 3 impressions |
| SERP shape | AI overview and PAA, no pack. Top-10 is Axa, TaxQube, gov.uk, legislation.gov.uk, Alan Boswell, Goodlord: an explainer SERP with no accountancy incumbent holding it |
| Suppression requirement | 26 Indian-law "section 24" terms (Income Tax Act 1961 and others) are in the corpus and are the wrong jurisdiction entirely. The page must be unambiguously UK-scoped in title, H1 and opening sentence, and the term must never appear unqualified in the metaTitle |
| Factual anchor | The finance-cost reducer rises to 22% from April 2027 (FA 2026, enacted 18 March 2026). This is the ground-truth position and it is what differentiates the page from every incumbent above, all of which state 20% |
| Feeding posts | `section-24-and-tax-relief` category, `mortgage-arrangement-fees-deductible-landlord` (35 clicks/90d, frozen, link only) |
| Internal links in | `/landlord-tax`, the Section 24 calculator page, the category hub, blog up-tier rule |
| Schema | `FAQPage` |
| QA gate | Standard, plus a jurisdiction check and an arithmetic check on the reducer worked example at both 20% and 22% |

#### NEW: `/making-tax-digital-landlords` hub (T1-12)

| Field | Spec |
|---|---|
| Target cluster | "making tax digital for landlords" (1,900, CPC GBP 10.89), deadline and start (480), software (210, CPC GBP 37.91), penalties (110), threshold (50), quarterly returns (70). Currently position 47.5 on 2 impressions |
| Why a new hub and not a promoted calculator | `/calculators/mtd-checker` is a frozen conversion surface. Promoting it means editing a frozen page for a gate we do not need to spend: a new hub carries the deadline, threshold, software and penalty answers, links down to the checker as its tool, and needs no sign-off |
| SERP shape | AI overview and PAA, no pack. Top-10 is gov.uk, NRLA, LITRG, Sage, FreeAgent, ATT. Another explainer SERP with no accountancy incumbent |
| metaTitle / H1 direction | "Making Tax Digital for Landlords" as the exact head, with the year or start date carried in the description rather than the title, so the title does not go stale |
| Feeding posts | `making-tax-digital-mtd` category hub and its posts |
| Internal links in | Nav (top-level informational), `/landlord-tax`, the MTD checker page, category hub, blog up-tier rule |
| Schema | `FAQPage` |
| QA gate | Standard, plus a dated-threshold factual check. Every threshold and start date on this page needs a stated source and a review date |

#### KEEP and extend: `/incorporation` (T1-10)

Already exists, already in nav, and the cluster is our strongest commercial performer:
"transfer property to limited company" (480/mo) sits at position ~8.6 on 582 impressions and
"property incorporation" (480) at ~42.9 on 225 (`gsc_headterm_pages.json` and surface map
T1-10). Add the SDLT-on-incorporation and connected-party sections that are currently winning
those impressions on blog posts, and link the incorporation cost calculator. No redirects, no
merges, no gate. This is the cheapest measurable win in the plan.

---

### 3.3 Calculator tier

#### The stamp duty calculator SEO rescue (T1-13)

246,000/mo on the bare calculator term where we hold position 65.2 on 46 impressions, 60,500
on the UK-qualified variant at position 77.0 on 1 impression, and 40,500 on the SDLT phrasing
at position 62.7 on 48 impressions (surface map T1-13 sub-rows; 62.7 is the SDLT row, not the
bare term, and the cluster header row reuses it). This is the largest
single volume pool touching the site and the largest gap between demand and position anywhere
in the audit.

**Gate note that the plan missed:** `/calculators/stamp-duty` is on the frozen conversion
surface list (`property_frozen_pages.md` line 30). The live route is
`/calculators/stamp-duty-calculator`, so the frozen list holds a stale slug for this and for
three of the other four registry calculators (`section-24`, `incorporation-cost` and
`portfolio-profitability` are all short by `-calculator`; only `mtd-checker` is correct).
Fix the four slugs in the frozen list first, then treat the
page as frozen and obtain sign-off. The rescue is a metaTitle, H1, schema and internal-linking
change, not a change to the calculator logic or the lead form, and the sign-off request should
say so.

What would actually move it, in order of expected effect:

1. **Title and H1 to demand phrasing.** Current metaTitle is "Stamp Duty Calculator | SDLT
   incl. Buy-to-Let Surcharge (England & NI)" and the H1 is "Stamp Duty (SDLT) Calculator"
   (`src/app/calculators/stamp-duty-calculator/page.tsx:11` and `:52`). The head term is
   present but buried behind qualifiers and a parenthetical. The demand phrasing is the bare
   "stamp duty calculator" (246,000) and "stamp duty calculator uk" (60,500). Lead with those
   and move the surcharge detail into the description and the body.
2. **Internal links from the top of the site.** The `/calculators` hub route is not linked
   from the homepage body at all; the homepage has an on-page anchor section only
   (`waterfall_matrix.md` §2.9). Add `/calculators` to the nav (it is already there) and add a
   direct homepage-body link to the stamp duty calculator specifically. The homepage link is a
   frozen-page change and rides the same sign-off as the homepage work in wave 2.
3. **Schema.** `buildCalculatorJsonLd` already emits a calculator node. Add `FAQPage` covering
   the surcharge, first-time-buyer relief and the non-resident surcharge questions, which is
   what the PAA block on this SERP is asking.
4. **Hub integration.** Link it from `/property-tax-rates`, from `/incorporation` (the
   SDLT-on-incorporation section), and from the devolved calculators
   (`lbtt-calculator-scotland`, `ltt-calculator-wales`), which already hold position 2 on
   "stamp duty wales" with 75 impressions.

Realistic expectation, stated for the owner: a rescue of a position-63 page on a 246,000/mo
generic tool term does not reach page 1. Moving from position 63 to the low twenties on the
SDLT-phrasing variant (40,500/mo, where we already sit at 62.7 with 48 impressions) is the
plausible outcome, and it is worth doing because the work is a few hours and the pool is two
orders of magnitude larger than any other term on the site.

#### CGT calculator (T1-14): KEEP with rescue-lite

"property gains tax calculator" family at 14,800/mo, and we hold ~21.2 on 50 impressions for
the rates intent. Pair with `/property-tax-rates` as the surface map recommends, add the
`FAQPage` schema, and link from `/landlord-tax`. Served from `/calculators/[slug]`, not one of
the five registry routes, so it is not on the frozen list and needs no sign-off.

#### Calculator renames (T1-15 and the naming rule)

`/calculators/rental-income-tax-calculator` targets "rental income tax calculator" while the
demand phrasing is "landlord tax calculator" (880/mo, plain organic SERP with no pack and no
AI overview, the cleanest calculator SERP in the set). Change the facing H1 and metaTitle to
the demand phrasing and keep the slug, so no redirect is created. This route is served from
`/calculators/[slug]` and is not on the frozen list, so it needs no sign-off.

The general rule for the calculator tier: **the facing name follows the demand phrasing, the
slug never changes.** Renaming a slug creates a redirect and a consolidation decision, which
is gated; renaming the facing title is a metadata change and is not. Apply the same check to
`property-allowance-checker` and `rent-a-room-relief-calculator` when each is next touched,
and never as a sweep. `portfolio-profitability-calculator` gets the same check but not the
same freedom: it is one of the five static registry routes and therefore a frozen conversion
surface, so even a facing rename there needs the scoped sign-off in Phase 4.

---

### 3.4 Local tier: the amended city playbook

Amendment A1 reverses the consolidation direction from the original plan. This is the single
most important correction in the programme, because the original direction would have
destroyed value.

The evidence: city queries hold our best commercial positions, 9.2 to 14.8, while the national
head terms sit at 25 to 34. `/locations/birmingham` is the sole server for four distinct local
queries at positions 6.9 to 22.6. `manchester-property-accountant` holds 9.2 and 11.4 on both
Manchester variants. Redirecting those into national pages at position 25 to 34 throws away
the only page-1-adjacent commercial rankings the site has (`waterfall_matrix.md` §1, audit §3).

**The amended playbook, in order:**

1. **Canonicalisation first, and let it settle.** `/locations/leeds` is split across hosts,
   805 impressions at position 24.1 on www and 140 at 24.7 on non-www; `/locations/london` and
   `/locations/manchester` appear only under non-www (`gsc_pages.json`). No consolidation
   decision is made on host-split data. Fix the host, re-submit via IndexNow, wait for the
   split to close in GSC.
2. **Consolidate within each city, never into a national page.** The survivor is always
   `/locations/[slug]`, which is config-driven and carries correct `AccountingService` schema.
3. **London first**, as the original plan had it: six posts plus `/locations/london`, 814
   impressions and zero clicks over 90 days, and at least six distinct URLs targeting
   overlapping London intent including two literal slug and path duplicates.
4. **Re-size against the real denominator: 24 city assets** (19 city blog posts plus 5
   `/locations` routes), not 40 or 55 (`repo_counts.json`, audit correction 1).
5. **The Bing veto is moot here and must be stated as such.** Zero of 191 Bing-indexed pages
   match a city name or `/locations/` (`bing_veto_citypages.json`). Do not present the veto as
   protection it is not providing on this cluster, and note that its input, `GetPageStats`,
   under-counts impressions by 36.1% against the site total (amendment A6).
6. **Per-cluster owner approval, one city at a time**, with the 90-day read before the next.
7. **Do not expand the location layer.** The demand is long-tail scatter at roughly one click
   per 90 days, which is what the site-wide CTR curve predicts at position 12 to 24 and cannot
   be used to indict the city pages specifically.

Also in scope for this tier, and not gated: the two confirmed category-frontmatter duplicate
pairs (`property-accountant-jobs-uk` at two paths, `london-property-accountant` at two paths).
Each splits equity for identical content across two URLs. These are duplicate-resolution
fixes, not consolidations of distinct pages, and they ride Phase 1.

---

### 3.5 Demotions

#### Careers cluster quarantine

`how-to-become-property-accountant` takes 195 of 278 impressions on the commercial head term
at position 24.8, out-ranking every commercial-intent page on the site.
`property-accountant-jobs-uk` (both paths) and `property-accountant-job-description` add more.
The cluster is 3 core posts plus 2 related (`repo_counts.json`).

Action: `noindex` all five, and move them out of the `property-accountant-services` category
so they stop absorbing category relevance. They are not deleted and no redirect is created, so
this needs no consolidation approval. It should ship in Phase 1, before the money tier, so
that the head-term picture is clean when `/services/property-accountant` launches.

Expect a measured impression drop. Losing 195 impressions at position 24.8 with zero clicks
and zero leads is the intended outcome, and the Phase 6 read must be told to expect it or the
programme will read its own success as a regression.

#### The 50 head-term blog metaTitles

Fifty blog metaTitles contain "property accountant" (`repo_counts.json`, the earlier claim of
51 is stale). Zero blog posts rank top-10 on any of the 13 commercial terms with live SERP
data (`serp_composition.json`), so these titles are competing for a term they cannot win while
diluting the page that could.

Action: **retitle away from the head term, keep the content.** This is a metaTitle and H1
change only. No body rewrite, no merge, no redirect, no deletion. Each post keeps whatever
long-tail it actually earns and stops claiming the commercial head.

Sequencing: the retitle sweep ships before or with `/services/property-accountant`. Shipping
the money page into an unchanged field of 50 competing titles reproduces the current defect
with one more page in it.

Prioritisation within the 50: the measured servers first, from `gsc_headterm_pages.json`
(`property-specialist-accountant-london`, `manchester-property-accountant`,
`property-tax-accountant-manchester`, `property-accountant-northampton-expert-services`, and
the London set), then the remainder by impressions. Anything on the frozen list, notably
`how-much-does-a-property-accountant-cost` at 23 clicks per 90 days, is excluded from the
sweep entirely and left alone.

Apply the same treatment to the worst of the 33 metaTitles containing "landlord tax" before
`/landlord-tax` ships.

---

## 3b. Waterfall specification

The target link architecture, stated as rules rather than as a diagram, so it can be enforced
in the generator and checked in QA.

### The four tiers

| Tier | Pages | Role |
|---|---|---|
| Brand and conversion | `/`, `/contact`, `/book`, `/thank-you`, `/complete` | Convert. Rank for brand only. Links down into the money tier. Never a money-term ranking target |
| Money | `/services` hub and its `/services/*` children, `/incorporation` | One page owns one commercial cluster. Nav-linked. Carries the lead form |
| Hub | `/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`, `/property-tax-rates`, `/calculators` and its children, `/locations` and its children, the 10 blog category hubs | Answers a topic completely. Links up to one money page and down to its blog posts |
| Blog | 746 posts | Answers one question. Links up to its hub and, where genuinely relevant, to one money page |

### The rules

1. **One cluster, one owner.** No two pages target the same head term in metaTitle or H1. The
   existing cannibalisation pre-flight in the protection layer enforces this at apply time and
   must be run before every new page and every retitle.
2. **Every blog post links up.** The blog generator brief gains a mandatory up-tier rule: each
   post carries at least one contextual link to its hub and, where the topic warrants it, one
   to the money page that owns its commercial neighbour. Links are written into the prose as
   real cross-references, never as a "related" block and never using pillar or cluster
   language in the copy (voice standard rule 4).
3. **Every hub links up and down.** Up to exactly one money page. Down to its calculators and
   its strongest posts.
4. **The money tier links sideways sparingly.** Money pages link to each other only where a
   reader genuinely needs the other service, because dense sideways linking between four pages
   targeting adjacent terms is how cannibalisation re-forms.
5. **Footer changes are config; nested nav is config plus one component change.** Both lists
   come from `Property/niche.config.json` (`navigation`, `footer_links`), but `navigation` is
   flat and `SiteHeader.tsx` renders it flat in the desktop nav and the mobile drawer, so
   children need a one-off component change in both. Required changes: add the four
   wave-1 `/services/*` children under the existing Services entry; add `/landlord-tax` and
   `/making-tax-digital-landlords` as top-level informational entries or as children of a
   Guides entry; add `/property-tax-rates` and `/research` to the footer quick links.
6. **Orphan rescues.** Three routes have no inbound internal links at all:
   `/property-tax-rates` (zero from nav, footer, homepage body and roughly 6,150 blog in-body
   hrefs), `/research` and its `landlord-tax-index` child, and `/resources/[topic]`. Rescue
   each with a footer link plus at least two contextual links from the hub tier.
   `/research/landlord-tax-index` is a data asset and belongs linked from `/landlord-tax`,
   where it supports the pillar's authority directly.
7. **`/embed` hygiene.** The individual embed calculator pages are noindexed; the `/embed`
   gallery route is not. Noindex the gallery. One line, no gate.
8. **Homepage body links are frozen work.** Adding the money-tier and calculator links from
   the homepage body is the right architecture and requires the frozen-page sign-off. It is a
   wave-2 item. The money tier launches without it, because nav inheritance already supplies
   sitewide equity.

---

## 4. Amended phase sequencing

Six phases, rebuilt to carry amendments A1 to A8 and the page plan above. Gates are stated
per phase and none of them are optional.

### Phase 0: instrument (half a day, no gate)

Freeze a dated baseline JSON: commercial bucket impressions, clicks and CTR by intent bucket;
Bing totals via `GetRankAndTrafficStats` only, never by summing `GetQueryStats`
(`bing_query_stats_topn_trap`); per-page Bing via `GetPageStats` with its 36.1% under-count
recorded alongside; AI-referrer sessions and leads; leads by entry path and referrer host,
labelled all-time or windowed, never mixed (amendment A2, audit correction 7).

Pin the classifier. Apply the A7 fixes to `scripts/property_commercial_baseline.py` before any
bucket figure is quoted again: add `revenue scotland|lbtt|ated|\brates?\b.*20\d\d|annual
exempt|allowance` to `FORMCODE_RE`, pluralise the commercial tokens, add `software`, and test
`FORMCODE_RE` first. Until that lands, quote commercial as approximately 6,080 and do not
quote the informational total at all.

Record the corrected `landlord tax` baseline explicitly: 897 Google contains-variant
impressions, not zero (audit correction 6).

Re-size the Bing veto pull to 24 city assets, not 55 (amendment A6, audit correction 1).

Define the Bing veto threshold, which A6 requires and no document has yet stated. Proposed:
a page vetoes its own consolidation if `GetPageStats` records 50 or more Bing impressions or
any Bing click in the API window, with the 36.1% under-count meaning the bar is met more
rarely than it should be, so absence never vetoes and only presence protects. Owner sets the
number; the point is that a veto with no bar cannot be applied to a non-city cluster.

**Gate: baseline committed. No content or redirect work starts before it exists.**

### Phase 1: technical fixes and demotions (no owner gate)

1.1 Canonicalisation. Force one hostname across canonical tags, `siteConfig.url`, sitemap and
absolute links; confirm the non-www 301 at the edge; re-submit via IndexNow.

1.2 Careers quarantine. Noindex the five careers posts and move them out of the
`property-accountant-services` category.

1.3 Duplicate-path resolution. Resolve the two confirmed category-frontmatter duplicate pairs.

1.4 Head-term retitle sweep. The 50 "property accountant" metaTitles and the worst of the 33
"landlord tax" metaTitles, measured servers first, frozen pages excluded.

1.5 Orphan rescues and nav or footer config changes per rule 5 and rule 6 above, plus the
`/embed` gallery noindex.

**Gate: Phase 1 deployed and verified live before Phase 2 starts, so Phase 2's measurement is
not confounded. Preview-gate and manual walk on the nav change.**

### Phase 2: the money tier (new pages, no frozen-surface gate)

2.1 `/services/property-accountant`, `/services/landlord-accountant`,
`/services/property-tax-advice`, `/services/non-resident-landlord`. One Opus sub-agent per
page, in parallel (wave batch size 1 per topic).

2.2 `/services` hub narrows from the head term to hub framing, resolving the
homepage-versus-`/services` conflict without touching a frozen page.

2.3 `/incorporation` extension: SDLT-on-incorporation and connected-party sections, calculator
link.

**Gate: per-page QA regime in §6. No owner sign-off required, because nothing is removed,
redirected or changed on a conversion surface.**

### Phase 3: the hub tier (new pages, staggered)

3.1 `/landlord-tax` pillar. **Staggered from Phase 2 by a clear interval, not run in parallel
(amendment A4).** Both change the head-term picture, and running them together makes neither
attributable. If the owner prefers speed over attribution, that trade is stated explicitly and
the per-phase success criteria are dropped.

3.2 `/section-24` explainer and `/making-tax-digital-landlords` hub.

3.3 CGT calculator rescue-lite and the T1-15 facing rename. Neither is on the frozen list.

### Phase 4: frozen-surface work (owner sign-off required, DJH gate first)

4.1 **DJH gate. Nothing in this phase starts until it is answered.** DJH is the lead buyer and
holds rank 11 on `property accountant` with `djh.co.uk/specialisms/property/`
(`serp_composition.json`; the earlier "rank 6" figure is from a different pull and DJH does
hold rank 6 on the plural "property accountants"). Optimising hard against the buyer is a
commercial question, not an SEO one (amendment A3).

4.2 Frozen-page slug correction in `property_frozen_pages.md`. Four of the five calculator
entries carry stale slugs: the file says `/calculators/stamp-duty`, the live route is
`/calculators/stamp-duty-calculator`, and the same missing `-calculator` suffix affects
`section-24`, `incorporation-cost` and `portfolio-profitability`. `mtd-checker` is already
correct. Fix before requesting any calculator sign-off.

4.3 Stamp duty calculator SEO rescue, per 3.3. Sign-off request scoped explicitly to metaTitle,
H1, schema and links, with no change to calculator logic or the lead form.

4.4 Homepage body links down into the money tier and to `/calculators`. Sign-off line required.

4.5 Homepage commercial rewrite: **deferred to the Phase 6 decision, not scheduled here.**

### Phase 5: local tier and channels (owner sign-off per city cluster)

5.1 City consolidation per the amended playbook in 3.4. London first. Only after
canonicalisation has settled. Per-cluster owner approval. 90-day read between clusters.

5.2 Commissioning rule into the blog generator brief and the content QA checklist:
"commission more decision-stage content" as a stated bet, with per-page judgment retained and
**no categorical ban on reference content** (amendment A2). The bet rests on one n=8 outlier
with every other named winner at n=2 and no denominators anywhere, so it is presented to the
owner as a bet and not as a finding.

5.3 Answerability rule: question-formed H2s and direct answer blocks, which serve Bing,
Copilot and the assistants at once.

5.4 Bing and GEO instrumentation. Bing earns equal billing, not priority: the claimed
under-performance rested on a 6 to 9% benchmark that does not exist and on an average position
the API does not return, so the Bing programme is justified by its click volume and lead
count, not by a CTR deficit (amendments A6, audit corrections 4 and 5). Carry the
`GetAiPerformance` assumption flag into the risk register.

### Phase 6: read and decide

**Decision reads at 90 days after each release, segmented by intervention date, never as a raw
before-and-after (amendment A5).** The 28-day read is a regression tripwire only and carries no
decision authority.

Metrics: commercial-bucket impressions, clicks and CTR against the pinned corrected classifier;
position on the four wave-1 money clusters; `landlord tax` against the 897-impression baseline,
not against zero; Bing clicks and leads; AI-referrer sessions and leads; leads by entry path.

The decisions this phase settles: whether the money tier reached page 1 on a packed SERP, which
determines whether wave 2 (T1-06 and T1-07) is built; whether a homepage commercial rewrite is
worth the frozen-page gate; and whether this playbook is worth applying to the seven other
sites rather than to a new country.

### Standing gates that apply across all phases

Owner sign-off for any frozen surface. Per-cluster owner approval for any consolidation, with
fresh GSC and Bing pulled first. Preview-gate plus manual walk before every deploy. Rewrite
only, never collapse, with one carve-out: the within-city duplicate consolidations in 3.4 and
the two duplicate-path pairs in 1.3 are the only redirects in this programme, and each still
needs its own per-cluster approval under the data-gated consolidation rule. Nothing else
collapses. Opus writes all content. No auto-commit.

### The no-GBP cap, restated with corrected stakes

A local pack sits on 11 of 25 tracked commercial terms, including `property accountant` itself,
which the earlier scope document recorded as pack-free (amendment A8). Six of the fifteen
Tier-1 clusters are affected: T1-01, T1-02, T1-03, T1-06, T1-07, T1-08. In each, the pack holds
the top of the fold and we cannot enter it, because the estate rule is that we never create a
Google Business Profile. The prize on those six is the organic block beneath the pack, won on
depth and on AI-overview citation rather than on proximity. Every volume figure for those six
clusters should be read as discounted, and the phasing above reflects it: the two wave-2 money
pages are precisely the two smallest packed clusters, and they are gated on whether wave 1 can
win beneath a pack at all.

---

## 5. Owner decisions

**ALL SIX ANSWERED by the owner, 2026-08-05 (this session):**

1. Money tier at `/services/*`: APPROVED. Owner note: be comprehensive, build as many money pages as demand warrants (not capped at four), with zero bleed between them. Homepage stays frozen.
2. `/services` narrows to hub: APPROVED.
3. City consolidation: APPROVED for ALL cities in one comprehensive release, no London-first 90-day gate. Owner reasoning: locations produce ~1 click and ~0 leads today, nothing material to protect, so the staged read buys nothing. Canonicalisation fix remains a prerequisite. Title/meta quality is folded into each merged survivor rather than run as a separate prior test.
4. DJH: compete openly on the head terms.
5. No-GBP rule HOLDS; accept the organic-block cap on the six packed clusters.
6. Stamp duty calculator rescue: APPROVED both halves (fix the four stale slugs in `property_frozen_pages.md`, scoped sign-off for the metaTitle/H1/schema/internal-link change on the stamp duty calculator; calculator logic and lead form untouched).

Original decision briefs kept below for the record. Restated with corrected numbers. Decision 6 is new and follows from amendment A8.

**Decision 1: the money tier at `/services/*`, and the homepage stays frozen for now.**
Recommended. Four new nav-linked pages own the four largest commercial clusters. The homepage
keeps its brand and conversion role. Evidence: 96 of 117 ranked slots on 13 commercial terms
are non-homepage service or specialism pages and only 21 are homepages, all six of those on
exact-match domains
that we do not have; the homepage already carries the head term in its title and earns 42
impressions and 1 click in 90 days. *Changed from the original plan, which put a homepage
rewrite first.*

**Decision 2: `/services` disposition.** Recommended: `/services` narrows to hub framing and
`/services/property-accountant` takes the head term. This resolves the homepage-versus-
`/services` conflict without a redirect and without touching a frozen page. *Unchanged in
substance; the resolution is now cheaper.*

**Decision 3: city consolidation, London first, consolidating within the city.** The direction
is reversed from the original plan. Survivor is `/locations/[slug]`. Scope is 24 city assets,
not 40. Six London posts plus `/locations/london` carry 814 impressions and zero clicks in 90
days. Only after canonicalisation settles, and one cluster at a time with a 90-day read
between. *Corrected: the original 301 direction would have redirected pages at position 9.2 to
14.8 into targets at position 25 to 34.*

**Decision 4: DJH.** DJH holds rank 11 on `property accountant` and rank 6 on the plural
`property accountants`, with `djh.co.uk/specialisms/property/`. Acceptable to compete on the
head term, or shape targeting around the buyer? This now gates only the Phase 4 frozen-surface
work rather than the whole programme, because the money tier targets pages DJH does not hold.
*Corrected rank, and moved into the sequencing block as a formal gate.*

**Decision 5: the no-GBP rule, with materially larger stakes.** Confirmed to still hold? A
local pack is present on 11 of 25 tracked commercial terms including `property accountant`,
which was previously recorded as pack-free. Six of the fifteen Tier-1 clusters are capped at
the organic block beneath the pack. *Corrected and enlarged: this was previously presented as
capping only `landlord accountant`.*

**Decision 6 (new): the stamp duty calculator is a frozen page, and the frozen list holds
stale slugs.** 246,000/mo on the head term, position 62.7. The rescue is a metaTitle, H1,
schema and internal-link change with no touch to the calculator logic or the lead form. Two
approvals are needed: correct the four stale calculator slugs in `property_frozen_pages.md`,
and add a scoped sign-off line for this page. Without both, the largest volume pool on the
site stays untouched. *New: the original plan did not identify the calculator routes as frozen
or the frozen list as carrying wrong slugs.*

---

## 6. QA regime for execution

Every page shipped under this plan clears all seven gates. A page that fails any one of them
does not ship, and the gate is not waived for schedule.

**1. Voice.** `voice_scan.py` band `clean` or `minor` is the floor. Second person, no
meta-commentary, no SEO-architecture talk in prose, no signposting filler, no em-dashes
anywhere, British English throughout. No pillar, cluster, hub or funnel language in reader-
facing copy.

**2. Factual, against the ground-truth memories.** Every rate, threshold and date checked
against the locked ground truth, not against our own older posts:

| Fact | Ground truth |
|---|---|
| Section 24 finance-cost reducer | Rises to 22% from April 2027; FA 2026 enacted 18 March 2026 |
| Capital allowances | WDA 18% to 14% (FA 2026 s.28), new 40% FYA (s.29), special rate stays 6% |
| BADR | 18% from 6 April 2026 (was 14% in 2025-26, 10% before) |
| Dividend rates 2026/27 | 10.75% / 35.75% / 39.35% from 6 April 2026 (FA 2026 s.4) |
| AMAP mileage | Car and van 45p to 55p for the first 10,000 miles from 6 April 2026 |
| Employer NIC | 15%, secondary threshold GBP 5,000; LEL 2026/27 GBP 6,708 |
| IHT freeze | NRB, RNRB and the GBP 2m taper frozen to 5 April 2031; the gov.uk rates table's RNRB row is wrong and is never cited |
| BR and APR cap | Combined 100%-relief allowance GBP 2.5m from April 2026, 50% above, GBP 5m transferable; AIM 100% to 50% |

Any figure not on this list carries a stated source and a review date in the page's frontmatter
or in the working notes.

**3. Arithmetic.** Every table and every worked example is recomputed independently, not
checked by eye. Section 24 examples are computed at both 20% and 22% and the effective dates
stated. Stamp duty and CGT bands are checked band by band.

**4. Cannibalisation pre-flight.** Slug and keyword audit against the existing corpus before
apply, using the protection layer already in place. No new page ships until the DEMOTE retitle
sweep has cleared the head term it targets. Specific high-risk pairs to check by hand, all
verified live in the repo on 2026-08-05:

- `/services/property-accountant` against `/services/property-tax-advice`, the nearest
  neighbour in the new tier.
- `/landlord-tax` against the 33 blog metaTitles containing that phrase, and against two live
  routes the retitle sweep does not cover: `/property-tax-rates` ("UK Property Tax Rates
  2026/27 | Landlord Tax Reference") and `/research/landlord-tax-index` ("UK Landlord Tax
  Index"). Neither is frozen, so both can be retitled if the pillar needs the phrase clear.
- `/landlord-tax` against `/calculators/rental-income-tax-calculator` once that page is
  renamed to the "landlord tax calculator" demand phrasing. Different intent, adjacent title,
  so the pair is checked rather than assumed safe.
- `/section-24` against `/calculators/section-24-calculator`, whose metaTitle is "Section 24
  Tax Calculator | Mortgage Interest Relief Impact (UK)" and therefore already leads with the
  590/mo head term "section 24 tax". The calculator is frozen and cannot be retitled without
  sign-off, so the explainer must differentiate on the question-form and relief intent, not
  on the bare term, or the two pages split the cluster the plan is trying to concentrate.
- `/services/non-resident-landlord` against the `/blog/non-resident-landlord-tax` category
  hub, whose title renders as the bare category name and so claims the same phrase. The hub
  is not frozen; retitle it to the category-index framing before the service page ships.
- `/making-tax-digital-landlords` against `/calculators/mtd-checker` ("Making Tax Digital
  (MTD) Checker | Do Landlords Need to Comply?"). Frozen, and close enough that the hub title
  must not open on "Making Tax Digital (MTD) Checker" phrasing.

**5. Preview-gate and manual walk.** Preview deploy, then a human walk of the page on desktop
and mobile: every internal link followed, the lead form submitted end to end on any page that
carries one, schema validated, breadcrumb correct, no layout break at 320px.

**6. Bing check per page.** After indexation, confirm the page appears in `bing_query_data` and
record its impressions. `GetPageStats` under-counts impressions by 36.1% against the site
total, so absence there is weak evidence and is never treated as proof a page is dead on Bing.
IndexNow submission confirmed on publish.

**7. Compliance sweep.** No phone number displayed. No named individual, no quote, no
credential or qualification claim, no years-of-experience claim. No Google Business Profile
reference and no local-business or address schema. No pricing that implies a fee quote rather
than a range. Lead-form consent checkbox present and unmodified on any page carrying a form.
Nothing thin: a page that exists to hold a keyword is a failure of the A* bar regardless of how
well it scores on the other six gates.

---

## Appendix: what this document changes

| Item | Original plan (2026-08-05) | This document |
|---|---|---|
| Money-term owner | Homepage rewrite, first item | Nav-linked `/services/*` tier; homepage frozen and deferred |
| City consolidation | 301 city assets into national pages | Consolidate within each city, `/locations/[slug]` survives |
| City scope | 40 or 55 assets | 24 assets |
| Reference content | Categorical ban | Bet on decision-stage, per-page judgment retained |
| Decision read | 28 days | 90 days; 28 days is a tripwire only |
| 2.1 and 3.1 | In parallel | Staggered, or the confound is recorded |
| DJH | A risk-register line | A formal gate on frozen-surface work |
| No-GBP cap | `landlord accountant` only | Six of fifteen Tier-1 clusters, including the head term |
| Stamp duty calculator | Not identified as gated | Frozen page; frozen list also carries four stale slugs |
| Bing programme | Justified by a CTR deficit | Justified by clicks and leads; the deficit claim is withdrawn |
