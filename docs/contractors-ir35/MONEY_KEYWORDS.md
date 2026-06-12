# Money keyword map — Contractor Finance Partners (contractors-ir35)

Drafted 2026-06-12. **Status: LOCKED by manager 2026-06-12** (three corrections at lock: #24 retitled off the stale 45p AMAP rate, oil-and-gas slug fixed, hard boundary added for the #12/#13/#14 test trio). The §0 ground-truth findings were actioned at lock time: all 7 stale-figure spots (3 static pages, contractor-types.ts, 3 blog-config hallucination-zone/system-prompt lines) corrected to 2026/27 figures; the wave-1 blog corpus was verified already-correct.

Purpose: fix exactly what the business converts on, map every commercial term to ONE owning page (zero cannibalisation), give the core pages a concrete metaTitle/H1 brief (this becomes the W2-B implementation brief), and slice the next 35 blog pages (wave 2) tightly around the map.

Niche economics (from STATE.md): CPC £28.12, the highest of all seven estate sites, all-specialist SERP. Quality is the strategy. Every money page must out-resolve the SERP incumbents on specificity, not match them on volume.

---

## 0. SERP intelligence (live UK SERPs, June 2026)

Checked the candidate head terms. Two findings drive everything below.

| Term | Page type that ranks | Who ranks | How we win |
|---|---|---|---|
| `contractor accountant` / `contractor accountants uk` | Service / firm landing page (NOT a guide) | SG Accounting, Gorilla, GoForma, No Worries, Brookson, Danbro, ContractorUK directory | A genuine specialist service page (homepage + /services). We win on plain-English IR35 depth and "contractors only", not price. Directories (ContractorUK, itcontracting) own the comparison intent; we do not fight those, we funnel from our "how to choose / cost" guides. |
| `IR35 accountant` / `IR35 contract review` | Dedicated service page (`/ir35-contract-review/`) | 3E's, Fusion, AMS, Makesworth, Zmartly, plus generalist firms | /ir35-status is the owning page. The incumbents have thin service pages; we win with the three-tests substance + the SDS disagreement process + a clear review offer. This is our single strongest commercial differentiator. |
| `accountant for IT contractors` (and the other vertical "accountant for X" terms) | Sector landing page | Leon & Co, CoreAdviz, ICS, Accrue, Brookson, Path | Already built: the 10 /for/[slug] pages. They are strong; they need metaTitle tightening only (below). |
| `umbrella vs limited company` | Long guide + comparison calculator | Unbiased, GoForma, Parasol, Accounting Wise, itcontractorsuk; calculator tools rank alongside | Owned by the wave-1 pillar `limited-company-vs-umbrella-contractor`. Informational, funnels to /services. The calculator slot is owned by tools (deferred); we cover it editorially for now. |
| `best contractor accountant` / `contractor accountant cost / fees` | Listicle / directory / "how to choose" guide | itcontractorsuk top-10 lists, ContractorCalculator tips, itcontracting fee-comparison | Owned by wave-1 `how-to-choose-contractor-accountant`. We cannot be the "top 10 list" (faceless, no self-ranking). We win the *cost/fees* and *how to choose* informational variants and funnel to /services. |
| `inside / outside IR35 take home` + day-rate calculators | Interactive calculator tool | PayStream, ContractorCalculator, GoForma, uksalarycalculator, Caroola | Tool-owned SERP. Our calculators are DEFERRED post-launch (STATE.md). For wave 2 we cover the *explainer* intent ("how inside IR35 take-home is worked out", "what £500/day inside IR35 leaves you") editorially and link to /ir35-status. When the signature IR35 calculator ships it becomes the owning asset. |
| `switching / changing contractor accountant` | "How to switch" process guide | ContractorEye, itcontractorsuk, itcontracting, ContractorCalculator, Sleek | NOT in the seeded pool (autocomplete gap). Net-new wave-2 cluster. High commercial value (the switcher market is the warmest contractor-acquisition channel). Funnels to /services. |

### SERP surprises (flag to manager)

1. **GROUND-TRUTH BREAK — dividend tax rose from 6 April 2026.** Basic rate `8.75% -> 10.75%`, higher `33.75% -> 35.75%` (additional rate unchanged at 39.35%; dividend allowance still £500). Confirmed across multiple 2026/27 sources. **The entire contractors-ir35 corpus (homepage, /services, /ir35-status, the blog generator config `_HALLUCINATION_ZONES`, the system prompt, and every wave-1 page that quotes dividend rates) currently states the superseded 2024/25 rates (8.75%/33.75%).** This is a corpus-wide stale-figure sweep, not a money-keyword issue, but it is the highest-priority finding here: do not ship any new money/blog content on the old rates, and back-patch the existing pages. Mirrors the estate pattern in `property_2027_rates_ground_truth` / `amap_mileage_55p_2026_ground_truth`. Recommend a dedicated ground-truth memory + hit-list before wave 2 writes.
2. **Stale small-company thresholds still live in two TSX files.** `/ir35-status` page.tsx (line ~140) and the `marketing-contractors` vertical in `contractor-types.ts` still cite the OLD exemption thresholds (turnover £10.2m / balance sheet £5.1m). HP §1.A ground truth is £15m / £7.5m (the same defect the wave-1 flagship fixed in the blog fixture). Fix in the W2-B core-page pass.
3. **Contractor accountant fee benchmark is public and tight: £60–£150/month (2026).** We do not publish pricing (lead-gen model), but the "cost/fees" informational guide is high-demand and we can discuss the market range without quoting our own fee. Strong funnel page.
4. **The head term `contractor accountant` is a pure service-page SERP, not a guide SERP.** This validates targeting it on the homepage/services rather than trying to rank a blog post for it. Blog "accountant" intent is the cost/how-to-choose/switching tail only.

---

## 1. Money keywords, tiered

Rule enforced throughout: **every money term has EXACTLY ONE owning page.** Where blog and service intent overlap (e.g. IR35 review), the service page owns the commercial term and the blog owns the informational variant, and they cross-link.

### Tier 1 — the terms the business converts on (homepage + /services)

| Keyword | Assumed intent | SERP finding | Owning page |
|---|---|---|---|
| `specialist contractor accountant` / `contractor accountant` / `contractor accountants uk` | Commercial: find a firm to engage | Service-page SERP, specialist firms only | **Homepage** (`/`) |
| `accountant for contractors` / `limited company accountant contractor` | Commercial: contractor-specific accounting | Service / sector pages | **Homepage** (primary) + /services (secondary) |
| `contractor accountancy services` / `contractor accounting services` | Commercial: the service bundle | Service page, feature lists | **/services** |
| `IR35 accountant` / `IR35 contract review` / `IR35 status review` | Commercial: pay someone to assess my status | Dedicated service pages, thin incumbents | **/ir35-status** |

Rationale: these four are where money changes hands. The homepage carries the brand head term ("specialist contractor accountant"), /services carries the service-bundle term, /ir35-status carries the single highest-differentiation commercial term (IR35 review). Nothing in the blog competes for these.

### Tier 2 — service-adjacent (own the /for/* verticals + the review/switch service intents)

| Keyword | Assumed intent | SERP finding | Owning page |
|---|---|---|---|
| `accountant for IT contractors` | Commercial, sector | Sector landing pages | /for/it-contractors |
| `accountant for engineering contractors` | Commercial, sector | Sector landing pages | /for/engineering-contractors |
| `accountant for finance / interim contractors` | Commercial, sector | Sector landing pages | /for/finance-contractors |
| `accountant for management consultants` | Commercial, sector | Sector landing pages | /for/management-consultants |
| `accountant for contract project managers` | Commercial, sector | Sector landing pages | /for/project-managers |
| `accountant for locum doctors / NHS contractors` | Commercial, sector | Sector landing pages | /for/nhs-locum-doctors |
| `accountant for oil and gas contractors` | Commercial, sector | Sector landing pages | /for/oil-and-gas-contractors |
| `accountant for locum solicitors / legal contractors` | Commercial, sector | Sector landing pages | /for/legal-contractors |
| `accountant for marketing / creative contractors` | Commercial, sector | Sector landing pages | /for/marketing-contractors |
| `accountant for construction contractors / architects` | Commercial, sector | Sector landing pages, CIS angle | /for/construction-contractors |
| `IR35 contract review before signing` (informational variant) | Mixed: understand the review then book | Guide + service mix | /ir35-status owns commercial; blog `ir35-contract-review-checklist` (wave 2) owns informational, links to /ir35-status |
| `switching / changing contractor accountant` | Commercial-warm: ready to move | "How to switch" guides | blog `how-to-switch-contractor-accountant` (wave 2) -> funnels to /services |

### Tier 3 — commercial-informational that funnels (blog-owned, points at a money page)

| Keyword | Assumed intent | SERP finding | Owning page |
|---|---|---|---|
| `umbrella vs limited company` | Decision research | Long guide + calculator | wave-1 pillar `limited-company-vs-umbrella-contractor` -> /services |
| `best contractor accountant` / `how to choose a contractor accountant` | Commercial research | Listicles + how-to guides | wave-1 pillar `how-to-choose-contractor-accountant` -> /services |
| `contractor accountant cost / fees / how much` | Price research | "How much" guides, £60–150/mo benchmark | wave-2 cluster `contractor-accountant-fees-cost` -> /services |
| `inside IR35 take home / how much is £X/day inside IR35` | Money-impact research | Calculator tools | wave-2 cluster `inside-ir35-take-home-explained` -> /ir35-status (and future calculator) |
| `outside IR35 take home` | Money-impact research | Calculator tools | wave-2 cluster `outside-ir35-take-home-explained` -> /ir35-status |
| `setting up a limited company for contracting` | Pre-commercial: about to go limited | Setup guides | wave-2 pillar `set-up-limited-company-contractor` -> /services |
| `umbrella vs limited company calculator` (editorial) | Decision research | Calculator tools | covered by wave-1 umbrella pillar; do NOT build a duplicate page |

---

## 2. Core-page mapping table (the W2-B implementation brief)

Concrete metaTitle recommendations: max 62 chars, no em-dashes, primary keyword front-loaded. H1 emphasis given where the current H1 buries or omits the money term. Where the current metaTitle is already sound, marked KEEP.

| Page | Owned keyword(s) | Current metaTitle (chars) | Recommended metaTitle (chars) | H1 / on-page emphasis |
|---|---|---|---|---|
| `/` (homepage) | specialist contractor accountant; contractor accountants UK; accountant for contractors | "Specialist Contractor Accountants \| IR35 Advice UK" (50) | KEEP (50) — already front-loads the head term and is on-brand. Optional tighten: "Specialist Contractor Accountants UK \| IR35 Experts" (52) | H1 currently "IR35, limited company tax, and contractor finances." — strong topically but the brand head term "contractor accountant(s)" only appears in the section label. Recommend the H1 retains the benefit framing but the hero sub-line and first H2 explicitly use "specialist contractor accountants" (it does in the section label and intro paragraph — adequate). No structural change needed; this page already targets Tier 1 well. |
| `/services` | contractor accountancy services; contractor accounting services | "Contractor Accountant Services \| IR35, Ltd Company Tax, Expenses" (63 — over) | "Contractor Accountancy Services \| IR35 & Ltd Co Tax" (51) | H1 "Specialist services for UK contractors." -> change to "Contractor accountancy services" as the H1 noun phrase, keep the descriptor as the sub-line. Adds the exact service-bundle keyword to the H1. |
| `/ir35-status` | IR35 status review; IR35 contract review; IR35 accountant | "IR35 Status Review \| Inside vs Outside IR35 Explained" (53) | "IR35 Contract Review & Status Service \| UK" (43) OR keep current if "status review" is preferred. Recommend adding "contract review" — it is the higher-commercial query and the incumbent SERP term. | H1 "Inside or outside IR35? Understand your position." -> add a service-intent line: keep the question H1 but ensure the CTA and an H2 use "IR35 contract review" verbatim (currently the page is framed informationally; it must read as a *service* page to win the commercial term). FIX: stale small-company thresholds at line ~140 (£10.2m/£5.1m -> £15m/£7.5m per HP §1.A). FIX: dividend rates in the inside/outside table (8.75%/33.75% -> 10.75%/35.75% from 6 Apr 2026, year-labelled). |
| `/for/it-contractors` | accountant for IT contractors | "Accountants for IT Contractors \| IR35 & Limited Company Tax" (59) | KEEP (59) — exact-match, within limit. |
| `/for/engineering-contractors` | accountant for engineering contractors | "Accountants for Engineering Contractors \| IR35 & Tax Advice" (59) | KEEP (59). |
| `/for/finance-contractors` | accountant for finance / interim contractors | "Accountants for Finance Contractors \| Interim CFO, FD & Analyst Tax Advice" (74 — over) | "Accountants for Finance & Interim Contractors \| IR35" (52) | H1 KEEP. |
| `/for/management-consultants` | accountant for management consultants | "Accountants for Management Consultants \| IR35 & PSC Tax" (55) | KEEP (55). |
| `/for/project-managers` | accountant for contract project managers | "Accountants for Contract Project Managers \| IR35 Tax Advice" (59) | KEEP (59). |
| `/for/nhs-locum-doctors` | accountant for locum doctors / NHS | "Accountants for Locum Doctors \| NHS IR35 & PSC Tax Planning" (58) | KEEP (58). |
| `/for/oil-gas-contractors` | accountant for oil and gas contractors | "Accountants for Oil and Gas Contractors \| IR35 & Offshore Tax" (61) | KEEP (61). |
| `/for/legal-contractors` | accountant for locum solicitors / legal | "Accountants for Locum Solicitors & Legal Contractors \| IR35 Advice" (66 — over) | "Accountants for Locum Solicitors \| Legal Contractor IR35" (57) | H1 KEEP. |
| `/for/marketing-contractors` | accountant for marketing / creative | "Accountants for Marketing & Creative Contractors \| IR35 Advice" (62) | KEEP (62, at limit). FIX: stale small-company thresholds in the `marketing-contractors` challenge text (£10.2m/£5.1m -> £15m/£7.5m). |
| `/for/construction-contractors` | accountant for construction / architects; CIS | "Accountants for Construction Contractors & Architects \| IR35 & CIS" (66 — over) | "Accountants for Construction Contractors \| IR35 & CIS" (54) | H1 KEEP. |
| `/for` (index) | contractor accountants by sector | "Contractor Types We Work With \| Specialist IR35 Accountants" (59) | KEEP (59). |

Cross-link rule for W2-B: every /for/* page links once to /ir35-status (its review CTA) and once to /services; /services and /ir35-status link to /for; homepage already links to all three. No page targets a sibling's exact keyword.

---

## 3. Wave-2 slice — exactly 35 blog topics

Discipline applied:
- **Cannibalisation:** checked against the 16 static routes (`/`, /services, /ir35-status, /for + 10 verticals, /about, /contact) AND the 15 live wave-1 blog slugs (listed below). ZERO intent overlap. Where a topic is adjacent to a wave-1 pillar it takes a narrower sub-intent and links UP to that pillar.
- **Funnel role:** every row names the money keyword it supports and its primary internal-link target (a money page or a wave-1 pillar that itself points at a money page).
- **Pool grounding:** most picks are real autocomplete queries from the 644-row seeded pool; rows the pool lacks are marked NET-NEW (switching-accountant and company-setup/close intents were absent from the autocomplete expansion).
- **Tier:** 5 pillars (Opus-written), 30 clusters (Sonnet, per the bake-off verdict; Haiku disqualified from content).
- **Category:** one of the site's 7.

Wave-1 live slugs (do NOT overlap): what-is-ir35, inside-ir35, outside-ir35, off-payroll-working-rules-private-sector, sds-status-determination-statement, ir35-small-company-exemption, limited-company-vs-umbrella-contractor, umbrella-company-holiday-pay, psc-limited-company-contractor-tax, contractor-expenses-allowable-guide, travel-expenses-inside-ir35, flat-rate-vat-limited-cost-trader, contractor-pension-employer-contributions, contractor-pension-carry-forward, how-to-choose-contractor-accountant.

| # | slug | working title | category | tier | money keyword supported | primary internal-link target |
|---|---|---|---|---|---|---|
| 1 | set-up-limited-company-contractor | How to set up a limited company for contracting | Contractor Accounting Basics | pillar | setting up a limited company for contracting | /services |
| 2 | inside-ir35-take-home-explained | Inside IR35 take-home pay: how the deductions actually work | IR35 Status | pillar | inside IR35 take home; how much is £X/day inside IR35 | /ir35-status |
| 3 | director-salary-dividend-split-guide | The optimal director salary and dividend split for contractors | Limited Company Tax | pillar | director salary dividends; optimal split | /services |
| 4 | contractor-tax-planning-guide | Contractor tax planning: how to reduce your bill legally | Limited Company Tax | pillar | contractor tax planning | /services |
| 5 | mtd-income-tax-contractors-guide | Making Tax Digital for income tax: a contractor's guide | MTD and Compliance | pillar | MTD for contractors; making tax digital self-employed | /services |
| 6 | how-to-switch-contractor-accountant | How to switch contractor accountant: the step-by-step process | Contractor Accounting Basics | cluster | switching / changing contractor accountant (NET-NEW) | /services |
| 7 | contractor-accountant-fees-cost | What does a contractor accountant cost? UK fees explained | Contractor Accounting Basics | cluster | contractor accountant fees / cost / how much | how-to-choose-contractor-accountant |
| 8 | what-is-a-contractor-accountant | What is a contractor accountant and do you need one? | Contractor Accounting Basics | cluster | what is a contractor accountant | /services |
| 9 | outside-ir35-take-home-explained | Outside IR35 take-home pay: what your day rate really leaves you | IR35 Status | cluster | outside IR35 take home | inside-ir35-take-home-explained |
| 10 | ir35-contract-review-checklist | IR35 contract review: what to check before you sign | IR35 Status | cluster | IR35 contract review (informational) | /ir35-status |
| 11 | how-to-use-cest-tool | How to use HMRC's CEST tool and what the result means | IR35 Status | cluster | CEST tool | what-is-ir35 |
| 12 | ir35-status-tests-explained | The IR35 status tests: control, substitution and mutuality | IR35 Status | cluster | IR35 status test | what-is-ir35 |
| 13 | substitution-clause-ir35 | The substitution clause and IR35: what it proves and what it does not | IR35 Status | cluster | substitution clause IR35 | outside-ir35 |
| 14 | mutuality-of-obligation-ir35 | Mutuality of obligation: the IR35 test clients get wrong | IR35 Status | cluster | mutuality of obligation IR35 | what-is-ir35 |
| 15 | fee-payer-liability-ir35 | Fee-payer liability under IR35: who pays if the status is wrong | IR35 Status | cluster | fee payer IR35 | off-payroll-working-rules-private-sector |
| 16 | deemed-employment-payment-explained | Deemed employment payment: how your tax works inside IR35 | IR35 Status | cluster | deemed employment | inside-ir35 |
| 17 | challenge-ir35-determination-sds | How to challenge an inside IR35 determination | IR35 Status | cluster | SDS disagreement; challenge IR35 status | sds-status-determination-statement |
| 18 | dividend-tax-rates-contractors-2026 | Dividend tax for contractors: 2026/27 rates and planning | Pension and Dividends | cluster | dividend tax contractor; how does dividend tax work | director-salary-dividend-split-guide |
| 19 | corporation-tax-contractor-limited-company | Corporation tax for a contractor limited company: rates and relief | Limited Company Tax | cluster | corporation tax limited company | psc-limited-company-contractor-tax |
| 20 | contractor-self-assessment-guide | Contractor self assessment: deadlines, payments and what to include | MTD and Compliance | cluster | contractor self assessment | /services |
| 21 | vat-flat-rate-scheme-contractors | The VAT flat rate scheme for contractors: is it still worth it? | MTD and Compliance | cluster | flat rate VAT contractor | flat-rate-vat-limited-cost-trader |
| 22 | contractor-vat-registration-guide | VAT registration for contractors: when and how to register | MTD and Compliance | cluster | contractor VAT registration | corporation-tax-contractor-limited-company |
| 23 | home-office-expenses-contractor | Claiming home office costs as a limited company contractor | Expenses and Deductions | cluster | home office expenses contractor (NET-NEW) | contractor-expenses-allowable-guide |
| 24 | mileage-claims-contractor-limited-company | Contractor mileage claims: the 55p rule from April 2026 | Expenses and Deductions | cluster | contractor mileage claim (NET-NEW) | contractor-expenses-allowable-guide |
| 25 | training-subscriptions-expenses-contractor | Training, subscriptions and equipment: allowable contractor expenses | Expenses and Deductions | cluster | contractor training / subscription expenses (NET-NEW) | contractor-expenses-allowable-guide |
| 26 | contractor-pension-tax-relief | Contractor pension tax relief: how PSC contributions cut your tax | Pension and Dividends | cluster | contractor pension tax relief | contractor-pension-employer-contributions |
| 27 | contractor-pension-schemes-sipp | SIPPs and pension schemes for contractors: choosing the right one | Pension and Dividends | cluster | contractor pension schemes; SIPP | contractor-pension-employer-contributions |
| 28 | msc-legislation-contractors | MSC legislation: does it affect your limited company? | Contractor Accounting Basics | cluster | MSC legislation | psc-limited-company-contractor-tax |
| 29 | umbrella-company-explained | Umbrella companies explained: how they work and what they cost | Umbrella vs Limited Company | cluster | umbrella company; how much does an umbrella company cost | limited-company-vs-umbrella-contractor |
| 30 | best-umbrella-company-how-to-choose | How to choose a compliant umbrella company in the UK | Umbrella vs Limited Company | cluster | best umbrella company uk; which umbrella is best | limited-company-vs-umbrella-contractor |
| 31 | switching-umbrella-to-limited-company | Moving from umbrella to limited company: when it makes sense | Umbrella vs Limited Company | cluster | going limited; umbrella to limited (NET-NEW) | limited-company-vs-umbrella-contractor |
| 32 | umbrella-company-deductions-explained | Umbrella company deductions and pay: reading your payslip | Umbrella vs Limited Company | cluster | umbrella company deductions/fees | umbrella-company-explained |
| 33 | closing-contractor-limited-company | Closing your contractor limited company: MVL and strike-off | Limited Company Tax | cluster | close / strike off limited company (NET-NEW) | /services |
| 34 | first-contract-outside-ir35-checklist | Your first outside IR35 contract: a financial setup checklist | Contractor Accounting Basics | cluster | first contract outside IR35 (NET-NEW) | set-up-limited-company-contractor |
| 35 | contractor-day-rate-to-take-home | Day rate to take-home: how to work out what you actually keep | Limited Company Tax | cluster | day rate take home; how much will I earn | inside-ir35-take-home-explained |

Wave-2 category spread: IR35 Status 9, Limited Company Tax 6, Umbrella vs Limited Company 4, Expenses and Deductions 3, Pension and Dividends 3, MTD and Compliance 4, Contractor Accounting Basics 6. Pillars 5 (#1–5), clusters 30. Net-new (not in seeded pool) = 7 of 35; all are money-map gaps the autocomplete expansion missed (switching, company setup/close, expense specifics, umbrella-to-limited).

Pre-write notes for the wave-2 conductor:
- Topics #2, #9, #18, #35 quote tax figures — they MUST use 2026/27 dividend rates (10.75% / 35.75%), year-labelled. Block these until the ground-truth dividend sweep is locked (see §0 surprise 1).
- #11, #12, #13, #14, #16 are the "what is IR35" cluster tail. They take narrow sub-intents only and link UP to the `what-is-ir35` flagship; they must not restate its core (same boundary discipline as the wave-1 audit). HARD BOUNDARY for the three-test trio: #13 owns substitution in depth, #14 owns MOO in depth, #12 owns the CONTROL test in depth and acts as the framework hub (RMC three-limb structure + whole-picture stage) linking to #13/#14 for their limbs; #12 must not restate substitution or MOO beyond a linking paragraph, and none of the three restates outside-ir35's working-practices/evidence ground.
- #21 vs wave-1 `flat-rate-vat-limited-cost-trader`: #21 is the broad "is FRS worth it" decision page; the wave-1 page is the narrow limited-cost-trader mechanics. #21 links DOWN to it. Confirm the boundary holds at brief time.
- #29 `umbrella-company-explained` is referenced as a target by #30 and #32, so write #29 first in the wave.
- Mark the matching seeded-pool rows `used` at wave close (and the same-intent autocomplete variants), per the wave-1 dedupe pattern.

---

## 4. What we deliberately do NOT chase

- **"Top 10 contractor accountants" / "best contractor accountant" listicles.** The faceless-authority constraint (user is not a named expert; no self-ranking) means we cannot credibly own the listicle SERP. We take the *how-to-choose* and *cost* informational variants instead and funnel to /services.
- **`contractor accountant jobs` / `contractor accountant salary` / `how to become a contractor accountant`.** Off-mission (job-seeker / career intent, not client intent). In the pool but never write.
- **`contractor accountants ireland` / `... india` / `which umbrella company is best in india`.** Out of geo (UK only). Never write.
- **Pure day-rate take-home calculator terms as standalone pages** (`inside ir35 calculator`, `umbrella vs limited company calculator`, `£500 inside ir35`). Tool-owned SERP; our calculators are deferred. We cover the *explainer* intent editorially (#2, #9, #35) and will point them at the signature IR35 calculator when it ships. Do not build thin calculator-imitation pages.
- **MTD construction-noise tail** (`mtd building contractors`, `mtd meaning in construction`, `mtd pay meaning`, `mtd jobs`). Autocomplete dragged in unrelated "MTD" senses; off-topic. One clean MTD pillar (#5) + self-assessment (#20) + FRS (#21) covers the genuine MTD/compliance demand.
- **Generic SME / sole-trader accounting terms.** The whole brand is "contractors only, not generalist". Anything that reads as general small-business accounting dilutes the positioning and is off-mission.
