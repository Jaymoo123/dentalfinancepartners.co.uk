# Cluster Architecture Brief · Specialist Tax

**Cluster:** Specialist Tax (capital allowances applied + land remediation relief + R&D) · **Host site:** property (Property Tax Partners) · **Pages:** 17 (1 pillar, 5 cluster, 9 sector segments, 2 calculators) · **Date:** 2026-07-30
**Source rows:** `staged_72.json` (pillar_topic == "Specialist Tax"), `specialist_tax_pages.csv`, handoff `docs/_engines/FINANCE_TAX_EXPANSION_HANDOFF_2026-07-30.md`.
**Audience:** UK commercial-property owners, occupiers, developers and business owners (LtdCo-first). **Reg status:** FULLY UNREGULATED tax services. No s21, no IAR.

This is a SPEC handed to per-page Opus writers. A writer should never have to re-decide angle, cross-links, sources, or lead routing. Read the four cluster-level sections (A to E) first, then your page spec.

---

## 0. Quality bar (estate LOCKED rules · every page must comply)

- **Opus-only, A\* authoritative.** Genuinely the best page on this narrow topic on the UK web. Never thin, never flaggable, never a rephrased competitor. Quality IS the strategy.
- **NO em-dashes.** Use commas, parentheses, full stops, middle dots (·). This reads as AI otherwise. (This brief models the rule.)
- **Faceless EEAT.** The operator is NOT an accountant. No named-expert claims, no "our tax director says", no fabricated author credentials, no first-person professional advice voice. Authority comes from statute citation, HMRC-manual precision, worked numbers and structured data, not from a persona. House author byline only ("Property Tax Partners Editorial Team").
- **Business-audience + lead specificity.** Every page speaks to the business/commercial side (who owns the asset, who can claim, what it is worth), not a consumer. Lead fields are segment-specific (see D).
- **UK 2026/27 tax facts (FA 2026, bake in, do not drift):** AIA £1m permanent, unchanged · full expensing (100% FYA on new/unused main-rate plant, COMPANIES only) permanent from Apr 2023, unchanged · 50% FYA on new special-rate/integral features (companies) · **NEW 40% FYA from 1 Jan 2026** on new/unused main-rate plant, available to BOTH companies AND unincorporated businesses on the accruals basis (NOT cars, NOT second-hand; matters most for unincorporated businesses above the AIA cap) · **main-pool WDA reduced 18% to 14% from 1 Apr 2026 (CT) / 6 Apr 2026 (IT)** with a hybrid/apportioned rate for periods straddling the change (do NOT state 18% as the current main-pool rate) · special-rate pool WDA 6% unchanged · SBA 3% straight-line · R&D merged scheme 20% RDEC-style credit + ERIS (Enhanced R&D Intensive Support) for loss-making R&D-intensive SMEs, from accounting periods beginning on/after 1 Apr 2024 · corporation tax main rate 25% (£250k+), small profits 19%, marginal relief 26.5% effective on the £50k to £250k slice · FYA new/unused zero-emission cars 100% (extended to 31 Mar 2027 CT / 5 Apr 2027 IT, verify at write time).
- **Body = raw HTML in frontmatter** (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>`), NOT markdown. Match the existing property blog frontmatter shape (title, slug, canonical, date, author, category, metaTitle, metaDescription, altText, h1, summary, schema, faqs).
- **Category:** file under the existing property category `property-types-and-specialist-tax` unless a page spec says otherwise. Root-relative URL pattern is `/blog/property-types-and-specialist-tax/{slug}`.

---

## A. De-cannibalisation canonical map (READ THIS FIRST · load-bearing)

**The problem the writers must respect.** The property site ALREADY hosts deep, statute-cited, pos-1-class MECHANICS pages for almost every capital-allowances topic in this cluster. Confirmed live on disk under `/blog/property-types-and-specialist-tax/`:

| Existing property page (the AUTHORITY / mechanics owner) | Overlaps this cluster's new page |
|---|---|
| `land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor` (CTA 2009 Part 14, s.1147/1149/1154 mechanics) | `land-remediation-relief-guide` (new PILLAR) |
| `integral-features-capital-allowances` (s.33A category mechanics) | `embedded-capital-allowances-commercial-property` |
| `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` | `structures-and-buildings-allowance-sba` |
| `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` | `full-expensing-and-first-year-allowances` |
| `writing-down-allowance-cars` | `capital-allowances-on-cars-and-vehicles` |
| `annual-investment-allowance-landlords-uk`, `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010`, `can-you-claim-aia-on-second-hand-assets` | AIA references across the cluster |
| `end-of-the-furnished-holiday-letting-regime`, `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know`, `understanding-the-taxation-of-fhls-in-a-company`, `vat-on-furnished-holiday-lettings-fhl`, `big-tax-changes-ahead-for-furnished-holiday-lettings` | `capital-allowances-furnished-holiday-lets` |
| `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` | disposal references across the cluster |

**The rule (non-negotiable).** No page in this cluster tries to be the comprehensive capital-allowances or R&D pillar. Those already rank pos-1 (property + generalist). Every capital-allowances page here writes the **APPLIED / narrow / commercial-occupier / sector** version and:

1. **Does NOT re-explain the statute mechanics** the existing property page already owns (s.33A categories, the 18%/6% pool arithmetic derivation, the s.1147/1149/1154 LRR stack). Summarise in 2 to 4 sentences, then **cross-link up** to the existing mechanics page as "the full mechanics".
2. **Differentiates on INTENT.** Existing pages = landlord/SPV, "how the relief works" mechanics. New pages = commercial-occupier / business-buyer / developer, "is it worth claiming, what is it worth to my situation/sector, how do I get a specialist survey". Commercial + lead-gen intent, not mechanics.
3. **Self-canonical** (each new page canonicals to itself) but **cross-links up** to the existing mechanics page. Where a new page would be near-identical to an existing one, cut the overlap, not the cross-link.

**The two spines of this cluster:**

- **Land Remediation Relief** is the designated SEO PILLAR (genuine whitespace at head-term level: "land remediation relief" 320/mo, no estate page owns the plain-English head term · the existing property LRR page is a long mechanics slug that targets the mechanics long-tail, not the head). The new `land-remediation-relief-guide` OWNS the head term as a reader-first hub and links DOWN to the existing 150% mechanics page for the statute walk-through.
- **Capital Allowances** is NOT a pillar in this cluster. Its hub role is played by the EXISTING property capital-allowances authority set (above). The new CA cluster + segment + calculator pages orbit that existing authority and cross-link up to it. Inside this cluster, `embedded-capital-allowances-commercial-property` acts as the internal **sub-hub** for the 9 sector segment pages.

**OPEN ITEM for the writer/publisher (flag, do not guess):** the estate's single pos-1 "capital allowances" head-term master page (property or generalist) was not pinned to one exact slug during this brief. Before publishing, confirm the exact canonical target for "the comprehensive capital-allowances guide" so every cluster page's "full guide" cross-link points at the real pos-1 page. Candidate hub = the property integral-features / AIA / full-expensing mechanics set above. Do not create a competing comprehensive CA guide on property.

---

## B. Anti-sameness matrix · the 10 commercial-property capital-allowances pages

The 9 `capital-allowances-for-X` sector segment pages PLUS the `embedded-capital-allowances-commercial-property` sub-hub are the single biggest cross-post-sameness risk in the estate. They all describe "claim fixtures on a commercial property". They must NOT read alike. Each page is built around its ONE distinguishing axis below: the specific plant/integral features that dominate THAT sector's claim, the typical claim-value range (share of purchase price/fit-out that is claimable), and the sector-specific HMRC nuance. Lead every sector page with its own worked number and its own nuance. Do not recycle another sector's example.

> Note on count: the task references "10 sector pages"; the staged rows contain **9** `capital-allowances-for-X` segment pages. The 10th slot in the matrix is `embedded-capital-allowances-commercial-property` (the generic commercial-purchase sub-hub), included here so it does not read like a 10th sector clone.

| Page | Dominant claim items (the wedge) | Typical claimable range | Sector-specific HMRC nuance (the thing only this page says) |
|---|---|---|---|
| **embedded-capital-allowances-commercial-property** (sub-hub) | The unclaimed fixtures inside a SECOND-HAND commercial building bought as a going asset · the due-diligence / apportionment angle, not a sector list | 15% to 40% of purchase price depending on building type | The **fixtures pooling requirement** (from Apr 2014) and the **s.198 CAA 2001 election** on purchase: if the seller pooled and no election is agreed, the buyer can lose the entitlement entirely. Just-and-reasonable apportionment (s.562). This is the "buying commercial property" page, distinct from the existing s.33A mechanics page. |
| **capital-allowances-for-industrial-units** | Shell-and-core warehouses: roller-shutter/dock-leveller doors, cranes and hoists, three-phase power, yard drainage, high-bay and specialist lighting, roof-mounted solar PV | LOW end · often 5% to 15% (mostly structure, little integral fit-out) | Cranes, hoists and dock levellers are **main-pool plant** (18% / AIA / full expensing), not special-rate. The building shell gets SBA (3%) only. The "low embedded %" expectation is itself the nuance. |
| **capital-allowances-for-hotels** | Ensuite sanitaryware repeated across every bedroom, commercial kitchens, passenger lifts, air conditioning, hot/cold water, fire alarm and detection, laundry, decorative/ambience assets | HIGH · 25% to 40% (one of the richest sectors) | Hotel Buildings Allowance is long abolished; structure now SBA only, but the per-room repetition of sanitaryware and soft-fit ambience assets makes hotels a high-yield claim. **JD Wetherspoon** ambience/decorative-asset treatment applies. |
| **capital-allowances-for-dental-practices** | Dental chairs, CBCT/OPG imaging, compressors, suction/aspiration lines, autoclaves and LDU decontamination (HTM 01-05), surgery plumbing/drainage, lead-lined walls, piped gas/nitrous, specialist ventilation | HIGH per surgery · 25% to 45% of fit-out | Most dental kit is **loose/movable main-pool plant** (AIA/full expensing) rather than special-rate integral features · this is the **TAX** page and must stay distinct from the dental **LENDING/finance** content on the dentist site (cross-link, never duplicate). |
| **capital-allowances-for-care-homes** | Nurse-call systems, ceiling-track and mobile hoists, assisted/Parker bathing, passenger and bed lifts, sluice rooms, commercial laundry and kitchen, back-up generators, sprinklers, sanitaryware | HIGH · 25% to 35% | Care-specific plant (nurse-call, hoists, assisted bathing, sluice) is strong, defensible integral/plant. **Cross-link to and acknowledge the `care` site (carehometax), which already ranks this topic** · position as the property-side commercial-buyer view, not a competing pillar. |
| **capital-allowances-for-offices** | Comfort cooling / air conditioning, raised access flooring, data cabling and comms rooms, suspended-ceiling lighting, security and access control, kitchenettes/breakout, lifts | MODERATE · 15% to 25% | The **Cat-A (landlord) vs Cat-B (tenant fit-out)** split and the **who holds the claim** question (lease terms, s.183/184 contribution rules). Raised floors and comfort cooling are the big special-rate items. |
| **capital-allowances-for-gp-surgeries** | Consulting/treatment-room plumbing, clinical hand-wash, minor-ops rooms, disabled access, cold-chain vaccine fridges, clinical IT/networking, nurse/phlebotomy rooms | MODERATE to HIGH | Ownership/entity nuance: surgeries are often held by a **GP partnership or a doctor-owned SPV**, and premises are frequently leased from a third-party developer, so **s.198 fixtures elections on lease/purchase** and NHS premises-funding (notional rent) interaction dominate who-can-claim. |
| **capital-allowances-for-hospitality** (cafes / QSR / bars / leisure, non-hotel non-pub) | Commercial kitchens and extraction, refrigeration and cold rooms, bar and servery fit-out, seating and decorative scheme, POS/AV, franchise fit-out packages | HIGH · 25% to 40% | Fast refit cycles: lead on the **short-life asset election (s.85 to s.86 CAA 2001)** so kit written off before disposal on a 4 to 5 year refresh crystallises relief. Keep scope to cafes/QSR/leisure/franchise to stay distinct from the pubs-and-restaurants page. |
| **capital-allowances-for-student-accommodation** (PBSA) | Communal areas only: reception, gym, common rooms, laundry, lifts, plant rooms · study bedrooms are the problem, not the prize | LOW vs expectation · headline haircut is the point | THE distinguishing nuance in the whole matrix: the **"dwelling-house" restriction (s.35 CAA 2001)** denies plant allowances on the residential cluster-flat/study-bedroom parts · only genuinely communal areas qualify. Show the haircut from a naive 30% assumption down to the real communal-only figure. |
| **capital-allowances-for-pubs-and-restaurants** | Cellar cooling, beer lines and dispense, commercial kitchens and extraction, trade fixtures and bar servery, external/beer-garden works, decorative/ambience assets | HIGH · 25% to 40% | This sector is the SOURCE of the leading case law · cite **JD Wetherspoon plc v HMRC [2012] UKUT 42 (TCC)** on decorative/ambience assets and incidental building alterations (s.25 CAA 2001). Cellar cooling and dispense are pub-unique plant. |

**Enforcement:** two sector pages sharing a worked example, a claim-value range, or a nuance is a QA failure. The named case law (Wetherspoon), the s.35 dwelling-house restriction (student), the s.85 short-life election (hospitality), the Cat-A/Cat-B split (offices), the main-pool cranes point (industrial) and the entity/s.198-election point (GP) are the anchors that keep them apart.

---

## C. Shared authority-source list (draw 4 to 6 per page from here, plus page-specific ones)

Cite specific manuals and sections, not "HMRC guidance" generically. All are UK primary/HMRC sources.

**Capital allowances**
- **CAA 2001** (legislation.gov.uk): s.11 (P&M qualifying expenditure); s.21 to s.23 + List C (buildings/structures exclusion and what survives); **s.33A (integral features)**; **s.35 (dwelling-house restriction)** [student accom]; s.38A/38B + s.51A (AIA); s.104A (special-rate pool 6%); **s.198 and s.199 (fixtures elections on sale)**; s.85 to s.86 (short-life assets) [hospitality]; s.562 (just and reasonable apportionment); Part 2A (SBA).
- **HMRC Capital Allowances Manual (CA):** CA20000 (plant and machinery general); CA21000 to CA22000 (buildings, structures, integral features, CA22300 series); CA23000+ (AIA, FYA, full expensing); CA23084 (special-rate); CA23153 (FYA on cars/CO2) [cars page]; CA26470+ (fixtures and s.198/199 elections); CA90000+ (SBA).
- **gov.uk:** "Claim capital allowances", "Work out your writing down allowances", "Full expensing", "Capital allowances when you sell an asset", company-car CO2 thresholds.
- **Case law (use where the page's nuance calls for it):** JD Wetherspoon plc v HMRC [2012] UKUT 42 (ambience/decorative, incidental alterations) [pubs, hotels, hospitality]; SSE Generation Ltd v HMRC [2023] UKSC (what is plant vs setting); Cheshire Cavity Storage v HMRC [2022] EWCA (structure boundary); Urenco Chemplants v HMRC [2022] EWCA (plant vs building).

**Land Remediation Relief**
- **CTA 2009 Part 14, s.1143 to s.1175** (legislation.gov.uk): s.1144 (qualifying conditions); s.1147 (standard deduction) + s.1149 (additional 50%); s.1150 (polluter-pays exclusion); s.1152 (qualifying land remediation loss); s.1154 (16% payable credit).
- **HMRC CIRD Manual, CIRD60000+** (Land Remediation Relief). gov.uk LRR overview.

**R&D (the two R&D pages/calculator only)**
- **CTA 2009 Part 13** (R&D); HMRC **CIRD Manual CIRD80000+** (definition, qualifying expenditure, the merged scheme, ERIS); the DSIT/BIS **Guidelines on the Meaning of R&D for Tax Purposes**; gov.uk "Research and Development (R&D) tax relief: the merged scheme" and the Additional Information Form requirement; CT600L.

---

## D. Lead-routing summary

**Buyer side (who we sell the lead to):** SPECIALIST capital-allowances firms (surveyor-led fixtures-claim specialists · Catax/Ryan, Six Forward, YesTax-type), and for R&D pages SPECIALIST R&D firms (ForrestBrown-type). **NOT general accountants.** LRR pages route to CA/LRR specialists (most surveyor-led CA firms also handle LRR).

**Form:** the property site's existing lead form (lead source `property`). Service/segment field set to **"Capital allowances / specialist tax review"** for CA and LRR pages, and **"R&D tax relief review"** for the two R&D-flavoured pages. CTA framing = a free, no-obligation specialist claim review / feasibility survey, never "we are your accountant".

**Segment-specific lead fields (business-audience + lead specificity):**
- CA sector/cluster pages: property/building type · purchase price or fit-out spend · ownership vehicle (LtdCo / partnership / individual) · whether capital allowances were previously claimed or pooled · acquisition date.
- LRR pages: LtdCo? (corporate-only relief) · contaminated or long-derelict? · developer trade or property-investment business · did you or a connected party cause the contamination (s.1150 gate).
- R&D pages: LtdCo? · profit or loss-making · approximate qualifying R&D spend · sector.

**Guardrail on every form:** mandatory data-sharing consent checkbox (estate standard). Do NOT surface any fee-protection / tax-investigation INSURANCE cross-sell anywhere (IDD-regulated · out of scope). Route only to unregulated specialist tax firms.

---

## E. Internal cross-link graph (root-relative, property site)

Paths assume category `property-types-and-specialist-tax`; writer confirms category at publish. Every link is root-relative (`/blog/...`), never absolute.

```
                    [LRR PILLAR]  land-remediation-relief-guide
                         │  links down to existing 150% mechanics page
                         ▼
        (existing) /blog/property-types-and-specialist-tax/land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor

   EXISTING property CAPITAL-ALLOWANCES AUTHORITY SET  (pos-1 · confirm master slug · Section A)
        ▲            ▲             ▲              ▲
        │ cross-link up (canonical defer for mechanics)
   ┌────┴─────┬──────┴───────┬──────────┴──────────┬─────────────┐
   cars      SBA        full-expensing        FHL-capital-allowances
   │          │              │                      │
   └──────────┴──────┬───────┴──────────────────────┘
                     │
     [SUB-HUB] embedded-capital-allowances-commercial-property
                     │  links down to all 9 sector pages, they link back up
   ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
 industrial hotels dental care-homes offices GP hospitality student pubs&rest
   │                                                                     │
   └───────────────── every page links to both CALCULATORS ─────────────┘
                 capital-allowances-calculator · rd-tax-credit-calculator
```

Rules: (1) each CA cluster + segment page links up to the existing pos-1 CA authority AND to the `embedded` sub-hub. (2) Each of the 9 sector pages links up to `embedded` and sideways to 2 to 3 sibling sectors that a reader would plausibly compare (e.g. hotels ↔ pubs ↔ hospitality; care-homes ↔ GP-surgeries; industrial ↔ offices). (3) Every CA page links to the `capital-allowances-calculator`; R&D pages link to `rd-tax-credit-calculator`. (4) LRR pillar links down to the existing 150% mechanics page and sideways to `embedded` (brownfield developers claim both). (5) Cross-site: `capital-allowances-for-care-homes` links to the `care` site; `capital-allowances-for-dental-practices` links to the `dentists` site dental-finance content.

---

# PER-PAGE SPECS

Legend: **[UNIQUE ANGLE]** is the wedge · **[HOOK]** is the one worked example only this page uses · guardrail line applies verbatim intent: *Unregulated tax service (no s21/IAR); route to a specialist capital-allowances/R&D firm, never a general accountant; no fee-protection/tax-investigation insurance angle.*

---

## 1. land-remediation-relief-guide  ·  PILLAR

- **Tier:** pillar · **Primary kw:** land remediation relief · **Volume:** 320/mo
- **Secondary kw:** land remediation tax relief; land remediation relief consultation; land remediation relief asbestos; land remediation relief hmrc manuals; remediation of contaminated land tax relief; land remediation relief examples; land remediation relief asbestos hmrc; land remediation relief calculation; land remediation relief hmrc guidance; land remediation relief corporation tax; land remediation relief abolished
- **User intent:** informational (head-term hub)
- **UNIQUE ANGLE:** the plain-English, reader-first HEAD-TERM hub that owns "land remediation relief" for the commercial developer/investor deciding whether they have a claim. It answers who/what/how-much/eligible/how-to-claim and routes to a specialist. It is NOT the statute walk-through (that already exists on property) · it summarises the mechanics in a few sentences and links down.
- **H2 outline (8 to 12):** (1) What Land Remediation Relief is, in one paragraph (150% corporation tax deduction on cleaning contaminated or long-derelict land). (2) Who can claim (corporate-only · LtdCo developers and LtdCo property investors · why sole traders/partnerships/LLPs are excluded). (3) What counts as contamination and dereliction (asbestos, hydrocarbons, Japanese knotweed, buried structures · the derelict-land 1 April 1998 gateway). (4) How much it is worth (the 150% stack and the 16% payable credit for loss-makers · summarise, link to mechanics page). (5) The polluter-pays exclusion (s.1150) in plain terms. (6) Qualifying vs non-qualifying expenditure. (7) Where LRR sits next to capital allowances and SBA on a brownfield scheme (you may claim more than one). (8) Is LRR being abolished? (address the "abolished" search intent directly · state current status, note any consultation). (9) How a claim is made and evidenced. (10) When to bring in a specialist and what a review costs you (nil, contingent). (11) FAQ.
- **[HOOK]:** a brownfield developer SPV spends £400,000 removing asbestos and hydrocarbon-contaminated soil · 150% deduction = £600,000 · at 25% CT that is £150,000 saved · contrast with a loss-making investor LtdCo where the same spend surrenders for a £96,000 cash credit (150% × £400,000 × 16%). Use round, different numbers from the existing mechanics page.
- **Internal links:** down to existing `land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor` (full mechanics); sideways to `embedded-capital-allowances-commercial-property` and `structures-and-buildings-allowance-sba` (brownfield stacking); to `capital-allowances-calculator`.
- **Cross-links (de-cannib):** existing property LRR 150% mechanics page = the authority for the statute detail · this pillar defers to it and does not duplicate s.1147/1149/1154 derivation.
- **Authority sources:** CTA 2009 Part 14 s.1143 to s.1175 (s.1144, s.1147, s.1149, s.1150, s.1152, s.1154); HMRC CIRD60000+ (LRR); gov.uk LRR overview; original FA 2001 Sch 22 origin + FA 2009 derelict-land extension.
- **Lead-CTA:** specialist CA/LRR firm · property lead form · service "Capital allowances / specialist tax review" · LRR-specific fields (LtdCo?, contaminated/derelict?, developer or investor, s.1150 causation).
- **Guardrail:** unregulated tax; route to specialist, not general accountant; no insurance angle.
- **FAQ stems:** What is land remediation relief? · Who can claim LRR? · Is land remediation relief being abolished? · Does asbestos removal qualify? · Can loss-making companies get cash back? · Can I claim LRR and capital allowances on the same building? · How far back can I claim? · Does Japanese knotweed removal qualify?

---

## 2. rd-tax-credit-calculator  ·  CALCULATOR (BUILD TASK, not an article)

- **Tier:** cluster (tool) · **Primary kw:** r&d tax credit calculator · **Volume:** 140/mo
- **This is an interactive component build, not a body. Deliver a calculator spec, a thin supporting intro (150 to 300 words), and FAQ. Do not write a full article.**
- **Calculator spec:**
  - **Inputs:** company profit/loss status (profit-making / loss-making) · R&D-intensive? (loss-making SME with qualifying R&D >= 30% of total expenditure → ERIS path) · qualifying R&D expenditure (£) · optionally split staff / subcontractor / consumables / software.
  - **Outputs:** estimated benefit under the **merged scheme** (20% above-the-line credit · show net cash/CT benefit after the notional-tax adjustment, roughly 15% to 16.2% net depending on CT rate band) · and, where inputs qualify, the **ERIS** loss-making-intensive rate (up to ~27% net). Show "estimated benefit range" not a false-precision single number.
  - **Formula (merged scheme):** credit = 20% × qualifying spend; net benefit = credit × (1 − CT rate applied to the credit) → present as a range across 19% and 25% bands. ERIS: 86% uplift then 14.5% payable credit on the surrenderable loss (state the current statutory figures at build time from CIRD).
  - **Lead-CTA:** "Get a specialist to validate this and prepare the claim" → R&D specialist firm · service "R&D tax relief review" · fields LtdCo?, profit/loss, approx spend, sector.
  - **Guardrail:** estimate only, not advice; merged scheme applies to periods beginning on/after 1 Apr 2024; route to specialist; no insurance angle. Include a "figures are estimates, confirm with a specialist" disclaimer.
- **Authority sources:** CTA 2009 Part 13; HMRC CIRD80000+ (merged scheme, ERIS); gov.uk "R&D tax relief: the merged scheme"; Additional Information Form + CT600L requirement.
- **De-cannib:** do NOT restate the R&D pillar content (property/generalist own it) · this is a tool that links to those existing pos-1 R&D guides for the explainer.
- **FAQ stems:** How is the R&D credit calculated under the merged scheme? · What is ERIS and do I qualify? · Is this the SME or RDEC scheme now? · What counts as qualifying R&D spend? · Do I need the Additional Information Form? · How accurate is this estimate?

---

## 3. capital-allowances-calculator  ·  CALCULATOR (BUILD TASK, not an article)

- **Tier:** cluster (tool) · **Primary kw:** capital allowances calculator · **Volume:** 10/mo (broad "how to calculate" long-tail behind it)
- **Interactive component build. Thin intro (150 to 300 words) + FAQ only.**
- **Calculator spec:**
  - **Inputs:** commercial property purchase price (£) OR fit-out spend · building type (dropdown reusing the 9 sectors + "other") · has anyone claimed/pooled the fixtures before? (yes/no/unknown) · ownership (LtdCo / partnership / individual).
  - **Outputs:** estimated embedded capital-allowances pool = purchase price × sector embedded-% band (use the ranges from the Section B matrix as defaults per building type) · split into main pool (18%) and special-rate pool (6%) · estimated first-year tax saving using AIA £1m / full expensing where eligible · estimated CT saving at the user's rate band. Present as a RANGE per the sector band, with a clear "indicative only, a survey confirms" caveat.
  - **Formula:** pool ≈ price × embedded% (sector) → allocate to main/special per sector default → year-1 relief = min(pool, AIA £1m) at CT rate; residual on WDA. Full expensing note for new plant.
  - **Lead-CTA:** "A specialist survey confirms the real figure" → CA specialist firm · service "Capital allowances / specialist tax review" · fields building type, price, prior claim, ownership.
  - **Guardrail:** estimate only; survey needed; route to specialist; no insurance angle.
- **Authority sources:** CAA 2001 s.33A, s.51A (AIA), s.104A (special rate), s.198 (elections); HMRC CA22300, CA23084, CA26470.
- **De-cannib:** links up to the existing pos-1 CA guide; does not restate mechanics.
- **FAQ stems:** How are capital allowances calculated on a commercial property? · What percentage of a purchase price is usually claimable? · What is the difference between the main and special-rate pool? · Can I still claim on a second-hand building? · Does the AIA cover my whole claim? · How accurate is a calculator estimate vs a survey?

---

## 4. capital-allowances-on-cars-and-vehicles  ·  CLUSTER

- **Tier:** cluster · **Primary kw:** capital allowances cars · **Volume:** 1,600/mo (highest non-pillar in cluster)
- **Secondary kw:** capital allowances motor cars; capital allowances on cars; capital allowances for cars; cars capital allowances; capital allowances and cars; car capital allowances; capital allowances vehicles; electric car capital allowances; capital allowances for electric cars; capital allowances on electric cars; electric cars capital allowances
- **User intent:** commercial
- **UNIQUE ANGLE:** the CO2-band decision page for a business buying cars and vans · which pool a vehicle falls into, and why an electric car gets 100% FYA while a petrol car crawls at 6%. Business-buyer decision framing, not landlord mechanics.
- **H2 outline (6 to 10):** (1) How cars are treated differently from other plant (no AIA on cars). (2) The three routes: 100% FYA (new/unused zero-emission), main pool 18% (<=50g/km historically), special rate 6% (>50g/km) · state current CO2 thresholds at write time. (3) Electric cars and the FYA (extended to Apr 2026, verify). (4) Vans, pickups and lorries (these ARE plant, AIA/full expensing available · the double-cab pickup reclassification point). (5) Cars vs vans: why the distinction matters. (6) Leased vs bought (the lease-rental disallowance for high-emission cars). (7) Disposals and balancing adjustments. (8) FAQ.
- **[HOOK]:** company buys a £45,000 electric car (100% FYA = £45,000 deduction, £11,250 CT saved at 25% in year one) vs a £45,000 petrol car in the special-rate pool (6% WDA = £2,700 year-one deduction, £675 saved). The gap is the whole point.
- **Internal links:** up to existing pos-1 CA guide and existing `writing-down-allowance-cars` (mechanics); to `capital-allowances-calculator`; sideways to `full-expensing-and-first-year-allowances`.
- **Cross-links (de-cannib):** existing `writing-down-allowance-cars` on property owns the WDA-cars mechanics · this page takes the business-buyer CO2-decision angle and defers mechanics to it.
- **Authority sources:** CAA 2001 s.104A (special rate), s.104AA, s.45D (FYA low-emission cars); HMRC CA23153 (cars/CO2), CA23155 (FYA cars); gov.uk company-car CO2 and capital-allowances pages.
- **Lead-CTA:** CA specialist · property lead form · service "Capital allowances / specialist tax review". (Lower lead value · this page is mostly authority/traffic · CTA can be softer, link to fleet/EV-tax specialist.)
- **Guardrail:** unregulated; specialist not general accountant; no insurance angle.
- **FAQ stems:** Can I claim capital allowances on a company car? · Do electric cars get 100% first-year allowance? · Why can't I use AIA on cars? · What CO2 band puts a car in the main pool? · Are vans and pickups treated as cars? · What happens when I sell the car? · Is the electric-car FYA ending?

---

## 5. structures-and-buildings-allowance-sba  ·  CLUSTER

- **Tier:** cluster · **Primary kw:** structures and buildings allowance · **Volume:** low (0 recorded, long-tail)
- **Secondary kw:** sba capital allowances; capital allowances for structures and buildings; claiming capital allowances for structures and buildings
- **User intent:** commercial
- **UNIQUE ANGLE:** what SBA covers that plant/integral features do NOT · the "everything else in the building" 3% straight-line relief and why it is the consolation prize on the structure. Applied to a commercial buyer/developer deciding how to split expenditure.
- **H2 outline (6 to 10):** (1) What SBA is (3% straight-line on qualifying construction/renovation of non-residential structures). (2) What qualifies (construction, some renovation) vs what does not (land, planning, integral features which go to the 6% pool instead). (3) The allowance statement requirement (you cannot claim without it · practical trap). (4) SBA vs capital allowances vs LRR on the same project (how to allocate). (5) Buying a building with existing SBA (the allowance passes to the buyer · continued 3%). (6) Disposals (no balancing adjustment, but the sale proceeds/CGT base-cost interaction). (7) FAQ.
- **[HOOK]:** £2,000,000 new commercial building · £600,000 is integral features/plant (goes to the pools), leaving £1,400,000 of structure qualifying for SBA = £42,000/year for 33.3 years. Show why moving spend into the pools accelerates relief massively.
- **Internal links:** up to existing `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` (mechanics) and pos-1 CA guide; sideways to `embedded-capital-allowances-commercial-property`, `land-remediation-relief-guide`; to `capital-allowances-calculator`.
- **Cross-links (de-cannib):** existing SBA mechanics page owns FA 2018 detail · this page takes the "where SBA fits vs the pools" allocation angle.
- **Authority sources:** CAA 2001 Part 2A; HMRC CA90000+ (SBA); FA 2018/FA 2019 SBA introduction; gov.uk SBA guidance.
- **Lead-CTA:** CA specialist · property lead form · "Capital allowances / specialist tax review" · fields build/renovation spend, allowance statement held?
- **Guardrail:** unregulated; specialist; no insurance angle.
- **FAQ stems:** What is the structures and buildings allowance? · What rate is SBA? · What does SBA not cover? · Do I need an allowance statement? · Can I claim SBA and capital allowances on the same building? · What happens to SBA when I sell?

---

## 6. capital-allowances-furnished-holiday-lets  ·  CLUSTER

- **Tier:** cluster · **Primary kw:** capital allowances furnished holiday lets · **Volume:** 210/mo
- **User intent:** commercial
- **UNIQUE ANGLE:** the HISTORIC-claims-and-transition page. The FHL regime was ABOLISHED from April 2026. Frame entirely as: what happens to capital allowances already claimed, can you still make a late/retrospective claim for pre-abolition periods, and what the transition (pool balances, disposal, no new FHL capital-allowances entitlement) means. Not a live-regime guide.
- **H2 outline (6 to 10):** (1) The headline: FHL abolished from April 2026 · what that means for capital allowances specifically. (2) Why FHLs used to be special (P&M/AIA available where ordinary residential lets get nothing). (3) Can you still claim for pre-abolition periods? (retrospective pooling, the timing window). (4) What happens to existing FHL capital-allowances pools on transition (carry-forward, ongoing WDA, disposal events). (5) The interaction with the general dwelling-house restriction now that FHL status is gone. (6) What replaces it (nothing for capital allowances on residential lets · commercial holiday/serviced units may still qualify · distinguish). (7) FAQ.
- **[HOOK]:** an owner who ran a £500,000 holiday cottage as an FHL and never pooled the fixtures (~£90,000 of qualifying plant): whether a retrospective claim is still possible for the final pre-April-2026 years, and what the disposal/transition does to the pool. Use a transition-specific number.
- **Internal links:** up to pos-1 CA guide; sideways to existing property FHL-abolition pages (see cross-links); to `capital-allowances-calculator`.
- **Cross-links (de-cannib):** property already has several FHL pages (`end-of-the-furnished-holiday-letting-regime`, `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know`, `understanding-the-taxation-of-fhls-in-a-company`, `vat-on-furnished-holiday-lettings-fhl`) · this page owns ONLY the CAPITAL ALLOWANCES slice of the abolition and links to those for the wider regime change · do not re-cover income tax/CGT/VAT of abolition.
- **Authority sources:** CAA 2001 s.35 (dwelling-house restriction), s.17 (FHL as qualifying activity, historic); FA 2025 FHL abolition provisions; HMRC PIM4100+ (FHL, historic) and CA guidance; gov.uk FHL abolition policy paper.
- **Lead-CTA:** CA specialist · property lead form · "Capital allowances / specialist tax review" · fields property, prior claim y/n, pre-2026 period.
- **Guardrail:** unregulated; specialist; no insurance angle · and: frame as historic/transition, never as a live regime.
- **FAQ stems:** Was the furnished holiday let regime abolished? · Can I still claim capital allowances on my former FHL? · What happens to my existing FHL capital-allowances pool? · Can I make a retrospective FHL fixtures claim? · Do serviced/commercial holiday units still qualify? · What replaced FHL capital allowances?

---

## 7. full-expensing-and-first-year-allowances  ·  CLUSTER

- **Tier:** cluster · **Primary kw:** full expensing · **Volume:** low (0 recorded, strong long-tail incl super-deduction legacy)
- **Secondary kw:** full expensing capital allowances; capital allowances writing down allowance; super deduction capital allowances; fya capital allowances; capital allowances fya; capital allowances super deductions; first year allowance capital allowances; capital allowances first year allowance; first year allowances capital allowances; capital allowances full expensing; capital allowances super deduction; capital allowances: full expensing
- **User intent:** commercial
- **UNIQUE ANGLE:** the "which first-year relief applies to my spend" decision page for a LtdCo · full expensing (100% new main-rate plant) vs 50% FYA (special rate) vs AIA vs WDA, and why super-deduction is gone. Company-buyer decision framing.
- **H2 outline (6 to 10):** (1) What full expensing is (100% first-year deduction, new/unused main-rate plant, companies only, permanent from Apr 2023). (2) The 50% FYA for new special-rate/integral features. (3) How this sits next to AIA £1m (why AIA still matters: unincorporated businesses, used/second-hand kit, special-rate up to the cap). (4) Super-deduction: what it was and why it is no longer available (legacy search intent · answer and move on). (5) The disposal clawback on full-expensing assets (100% balancing charge trap). (6) A decision flow: new vs used, main vs special rate, company vs unincorporated. (7) FAQ.
- **[HOOK]:** a company buys £300,000 of new machinery (full expensing = £300,000 deduction, £75,000 CT saved) plus £120,000 of integral features (50% FYA = £60,000 now + 6% WDA on the rest). Contrast the same spend by a sole trader (AIA route). Distinct numbers from the existing full-expensing page.
- **Internal links:** up to existing `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` (mechanics) and pos-1 CA guide; sideways to `embedded-capital-allowances-commercial-property`, `capital-allowances-on-cars-and-vehicles`; to `capital-allowances-calculator`.
- **Cross-links (de-cannib):** existing full-expensing SPV-mechanics page owns FA 2023 detail · this page takes the "which FYA applies to me" decision angle.
- **Authority sources:** CAA 2001 s.9 (full expensing/temporary FYAs codified), s.45S+ (full expensing), s.51A (AIA), s.104A; HMRC CA23000+, CA23162 (full expensing), CA23084; gov.uk full-expensing guidance.
- **Lead-CTA:** CA specialist · property lead form · "Capital allowances / specialist tax review".
- **Guardrail:** unregulated; specialist; no insurance angle.
- **FAQ stems:** What is full expensing? · Is full expensing permanent? · What is the difference between full expensing and AIA? · Can sole traders use full expensing? · What is the 50% first-year allowance? · Is the super-deduction still available? · What is the disposal clawback on full expensing?

---

## 8. embedded-capital-allowances-commercial-property  ·  CLUSTER (sector sub-hub)

- **Tier:** cluster · **Primary kw:** embedded capital allowances · **Volume:** 170/mo
- **Secondary kw:** integral features for capital allowances; capital allowances integral features; capital allowances on integral features; integral features capital allowances; integral feature capital allowances; commercial property capital allowances; capital allowances fixtures and fittings; fixtures and fittings capital allowances; capital allowances on fixtures and fittings; integral features capital allowances rates
- **User intent:** commercial
- **UNIQUE ANGLE:** the BUYING-COMMERCIAL-PROPERTY due-diligence page · the unclaimed fixtures inside a second-hand building, the s.198 election trap, the pooling requirement, and why most commercial buyers miss the claim. This is the sub-hub the 9 sector pages branch from. Distinct from the existing s.33A integral-features MECHANICS page.
- **H2 outline (6 to 10):** (1) What "embedded" / fixtures capital allowances are (the plant hidden in the building fabric). (2) Why buyers miss them (not on the completion statement, solicitor/accountant not surveying). (3) The s.198 election and the pooling requirement since Apr 2014 (the entitlement can be LOST if not handled at purchase). (4) How a claim is valued (just and reasonable apportionment, s.562 · surveyor-led). (5) What a typical claim is worth by building type (short table linking to each of the 9 sector pages). (6) The process and timeline (retrospective claims on buildings you already own). (7) FAQ.
- **[HOOK]:** a buyer pays £1,500,000 for a mixed commercial building, no election agreed at purchase · shows both the ~£350,000 potential fixtures pool (£87,500 CT saving) AND the risk of losing it entirely if the seller had pooled and no s.198 election was made. The election trap is the memorable point.
- **Internal links:** DOWN to all 9 sector segment pages; up to existing `integral-features-capital-allowances` (s.33A mechanics) and pos-1 CA guide; to `capital-allowances-calculator`, `structures-and-buildings-allowance-sba`.
- **Cross-links (de-cannib):** existing integral-features page owns the s.33A category mechanics · this page owns the PURCHASE/due-diligence/election angle · do not re-list the five s.33A categories in depth, summarise and link.
- **Authority sources:** CAA 2001 s.33A (integral features), s.187A/s.198/s.199 (fixtures pooling + elections), s.562 (apportionment); HMRC CA26470+ (fixtures/elections), CA22300 (integral features); gov.uk selling/buying fixtures guidance.
- **Lead-CTA:** CA specialist (surveyor-led fixtures claim) · property lead form · "Capital allowances / specialist tax review" · fields building type, price, prior claim/pooling, acquisition date. HIGH lead value.
- **Guardrail:** unregulated; specialist; no insurance angle.
- **FAQ stems:** What are embedded capital allowances? · Can I still claim on a property I already bought? · What is a section 198 election? · What is the fixtures pooling requirement? · How much of a commercial purchase price is claimable? · Do I need a surveyor? · Can the seller block my claim?

---

## 9 to 17. The 9 sector segment pages  ·  SEGMENT

All nine share this SHELL. The per-page DIFFERENTIATORS come from the Section B anti-sameness matrix and must be applied strictly. Do not write the shell nine times with the noun swapped.

**Shared shell (applies to every sector page):**
- **Tier:** supporting/segment · **User intent:** commercial · **Volume:** 0 to 10/mo each (long-tail · these exist for coverage, GEO, internal-link equity and lead capture, not head traffic).
- **Common H2 skeleton (6 to 8, then diverge):** (1) Why [sector] properties hold significant unclaimed capital allowances. (2) The specific plant and integral features that dominate a [sector] claim [SECTOR-UNIQUE list from matrix]. (3) What a typical [sector] claim is worth [SECTOR-UNIQUE range + worked number]. (4) The [sector]-specific HMRC nuance [the one anchor from the matrix]. (5) Buying vs already owning a [sector] property (s.198 election / retrospective claim). (6) How a specialist survey works and what it costs you (nil/contingent). (7) FAQ.
- **Internal links (every sector page):** UP to `embedded-capital-allowances-commercial-property` (sub-hub) and the pos-1 CA guide; SIDEWAYS to 2 to 3 comparison siblings (per graph in Section E); to `capital-allowances-calculator`.
- **Lead-CTA (every sector page):** CA specialist (surveyor-led) · property lead form · service "Capital allowances / specialist tax review" · fields: [sector] property, purchase price/fit-out spend, ownership vehicle, prior claim y/n, acquisition date.
- **Authority sources (every sector page · pick 4 to 6, at least one SECTOR-specific):** CAA 2001 s.33A, s.198/199, s.11, s.104A; HMRC CA22300, CA26470; plus the sector-specific case law/section from the matrix (Wetherspoon for pubs/hotels/hospitality; s.35 for student; s.85 short-life for hospitality; CA23153 not relevant here).
- **Guardrail (every sector page):** unregulated tax; route to specialist CA firm not general accountant; no fee-protection insurance angle.
- **Anti-sameness enforcement:** each page's items list (H2.2), claim range (H2.3), worked hook (H2.3), and nuance (H2.4) MUST be the sector-unique ones below. Reusing another sector's is a QA fail.

### 9. capital-allowances-for-industrial-units
- Primary kw: capital allowances industrial units · Secondary: industrial buildings capital allowances; capital allowances industrial buildings
- **Wedge (matrix):** roller-shutter/dock-leveller doors, cranes, hoists, three-phase power, yard drainage, high-bay lighting, roof solar PV. **Range:** LOW 5% to 15%. **Nuance:** cranes/hoists/dock levellers are MAIN-pool plant not special-rate; shell gets SBA only; "low embedded %" is the story.
- **[HOOK]:** £1,200,000 warehouse, ~8% embedded = ~£96,000 pool, ~£24,000 CT saved · call out the crane and dock leveller as main-pool items accelerating relief.
- Siblings: offices, embedded sub-hub.
- FAQ stems: Do warehouses have much in capital allowances? · Are cranes and hoists claimable? · Why is the claim lower than for a hotel? · Can I claim on the roller-shutter doors? · Does solar PV on the roof qualify? · What about the yard and drainage?

### 10. capital-allowances-for-hotels
- Primary kw: capital allowances hotels
- **Wedge:** per-room ensuite sanitaryware, commercial kitchens, lifts, air-con, hot/cold water, fire alarm, laundry, decorative/ambience assets. **Range:** HIGH 25% to 40%. **Nuance:** Hotel Buildings Allowance abolished (structure now SBA), per-room repetition + Wetherspoon ambience assets make hotels a top-yield sector.
- **[HOOK]:** £3,000,000 hotel, ~30% = £900,000 pool split across main and special rate; sanitaryware repeated across 40 bedrooms as the volume driver. ~£225,000 CT saved.
- Siblings: pubs-and-restaurants, hospitality.
- FAQ stems: How much can a hotel claim in capital allowances? · Do the bedroom bathrooms count? · What happened to the hotel buildings allowance? · Are decorative and ambience assets claimable? · Can I claim on a hotel I bought years ago? · What about the commercial kitchen?

### 11. capital-allowances-for-dental-practices
- Primary kw: capital allowances dental practices
- **Wedge:** dental chairs, CBCT/OPG imaging, compressors, suction/aspiration, autoclaves/LDU decontamination (HTM 01-05), surgery plumbing, lead-lined walls, piped gas, ventilation. **Range:** HIGH 25% to 45% of fit-out. **Nuance:** most dental kit is LOOSE main-pool plant (AIA/full expensing), not integral features · this is the TAX page, distinct from dental LENDING on the dentist site.
- **[HOOK]:** a 4-surgery practice fit-out at £600,000 · per-surgery chair + CBCT + autoclave stack; ~40% claimable · contrast the loose-plant (AIA-eligible) portion vs the special-rate building services.
- Siblings: gp-surgeries, care-homes; embedded sub-hub.
- **Cross-site cross-link:** link to the `dentists` site dental-practice-finance content (buying/equipping a practice) · this page = the TAX/allowances angle only, never duplicate the lending content.
- FAQ stems: What capital allowances can a dental practice claim? · Is a dental chair claimable and in which pool? · Does CBCT/imaging equipment qualify? · Can I use AIA or full expensing on dental equipment? · Can I claim when buying an existing practice? · Is this different from dental practice finance?

### 12. capital-allowances-for-care-homes
- Primary kw: capital allowances care homes
- **Wedge:** nurse-call, ceiling-track/mobile hoists, assisted/Parker bathing, passenger and bed lifts, sluice rooms, commercial laundry/kitchen, generators, sprinklers, sanitaryware. **Range:** HIGH 25% to 35%. **Nuance:** care-specific plant (nurse-call, hoists, assisted bathing, sluice) is strong defensible plant.
- **[HOOK]:** £2,500,000 care home, ~30% = £750,000 pool; nurse-call + hoists + assisted bathing as the care-unique drivers.
- Siblings: gp-surgeries, dental-practices.
- **Cross-site cross-link:** ACKNOWLEDGE and link to the `care` site (carehometax), which already ranks care-home capital allowances · position this as the property-side commercial-buyer view, NOT a competing pillar · defer the care-operator-specific depth to the care site.
- FAQ stems: What capital allowances can a care home claim? · Are nurse-call systems and hoists claimable? · Does assisted bathing equipment qualify? · How much of a care home purchase is claimable? · Can I claim on a care home I already own? · Where do I get care-sector-specific advice?

### 13. capital-allowances-for-offices
- Primary kw: capital allowances offices
- **Wedge:** comfort cooling/air-con, raised access flooring, data cabling/comms rooms, suspended-ceiling lighting, access control, kitchenettes, lifts. **Range:** MODERATE 15% to 25%. **Nuance:** the Cat-A (landlord) vs Cat-B (tenant fit-out) split and WHO holds the claim (lease terms, contribution rules s.183/184).
- **[HOOK]:** £1,000,000 office Cat-B fit-out; raised floor + comfort cooling as the special-rate drivers; worked split of landlord Cat-A vs tenant Cat-B claim ownership.
- Siblings: industrial-units, embedded sub-hub.
- FAQ stems: What can an office claim in capital allowances? · Do raised floors and air conditioning qualify? · Who claims, the landlord or the tenant? · What is the difference between Cat-A and Cat-B fit-out? · Can I claim on data cabling and comms rooms? · What about a serviced/leased office?

### 14. capital-allowances-for-gp-surgeries
- Primary kw: capital allowances gp surgeries
- **Wedge:** consulting/treatment-room plumbing, clinical wash, minor-ops rooms, disabled access, cold-chain vaccine fridges, clinical IT, nurse/phlebotomy rooms. **Range:** MODERATE to HIGH. **Nuance:** ENTITY/ownership · surgeries held via GP partnership or doctor SPV, premises often leased from a developer → s.198 elections on lease/purchase and NHS notional-rent/premises-funding interaction dominate who-can-claim.
- **[HOOK]:** £800,000 surgery held on a lease from a third-party developer · the s.198 election at grant of lease as the make-or-break for the GP partnership's claim · cold-chain fridge as a clinical-plant example.
- Siblings: dental-practices, care-homes.
- FAQ stems: Can a GP surgery claim capital allowances? · Who claims when the premises are leased? · Does the NHS notional rent affect my claim? · Are vaccine fridges and clinical equipment claimable? · What is a section 198 election on a lease? · Can a GP partnership claim?

### 15. capital-allowances-for-hospitality
- Primary kw: capital allowances hospitality
- **Wedge (kept distinct from pubs and hotels):** cafes/QSR/bars/leisure · commercial kitchens/extraction, refrigeration/cold rooms, bar and servery fit-out, seating/decor, POS/AV, franchise fit-out packages. **Range:** HIGH 25% to 40%. **Nuance:** fast refit cycles → lead on the SHORT-LIFE ASSET ELECTION (s.85 to s.86 CAA 2001) so kit is written off before disposal on a 4 to 5 year refresh.
- **[HOOK]:** a £250,000 cafe/QSR fit-out refreshed every 5 years · short-life asset election crystallising the balance on refit vs leaving it languishing in the pool.
- Siblings: hotels, pubs-and-restaurants.
- FAQ stems: What can a hospitality business claim in capital allowances? · What is a short-life asset election? · Do franchise fit-out costs qualify? · Are kitchens and refrigeration claimable? · How is this different from a pub or restaurant claim? · Can I claim on a fit-out I refresh often?

### 16. capital-allowances-for-student-accommodation
- Primary kw: capital allowances student accommodation
- **Wedge:** PBSA · communal areas ONLY (reception, gym, common rooms, laundry, lifts, plant rooms). **Range:** LOW vs expectation · the haircut IS the content. **Nuance (the standout of the whole matrix):** the DWELLING-HOUSE RESTRICTION s.35 CAA 2001 denies plant allowances on the study-bedroom/cluster-flat residential parts · only genuinely communal areas qualify.
- **[HOOK]:** £5,000,000 PBSA scheme · naive assumption ~30% (£1.5m) vs the reality after the s.35 dwelling-house haircut where only communal areas (~8% to 12%) qualify · show the drop and why a specialist maps the boundary.
- Siblings: offices, embedded sub-hub.
- FAQ stems: Can student accommodation claim capital allowances? · What is the dwelling-house restriction? · Do the study bedrooms qualify? · Which areas of a PBSA can I claim on? · Why is the claim lower than for a hotel? · Do cluster-flat kitchens count?

### 17. capital-allowances-for-pubs-and-restaurants
- Primary kw: capital allowances pubs and restaurants
- **Wedge:** cellar cooling, beer lines/dispense, commercial kitchens/extraction, trade fixtures/bar servery, external/beer-garden works, decorative/ambience assets. **Range:** HIGH 25% to 40%. **Nuance:** the SOURCE of leading case law · cite JD Wetherspoon plc v HMRC [2012] UKUT 42 on decorative/ambience assets and incidental building alterations (s.25 CAA 2001) · cellar cooling and dispense are pub-unique.
- **[HOOK]:** £900,000 pub purchase · cellar cooling + dispense + Wetherspoon-style ambience assets as the drivers; ~35% claimable · use the Wetherspoon incidental-alterations point on the tiling/panelling.
- Siblings: hotels, hospitality.
- FAQ stems: What can a pub or restaurant claim in capital allowances? · Is cellar cooling and beer dispense claimable? · What did the Wetherspoon case decide? · Are decorative and ambience assets claimable? · Can I claim on a pub I bought as a going concern? · What about the beer garden and external works?

---

## Publish checklist (per page, before it ships)

1. No em-dashes anywhere. 2. Faceless voice, house byline, no named-expert claims. 3. Body is raw HTML in frontmatter. 4. Cross-links up to the existing property authority page(s) present and root-relative. 5. For sector pages: the matrix items/range/hook/nuance are the sector-unique ones, not a sibling's. 6. Lead-CTA routes to a SPECIALIST CA/R&D firm via the property lead form with the right segment fields and consent checkbox. 7. No fee-protection/tax-investigation insurance content. 8. 2026/27 tax facts correct. 9. Calculators (2 and 3) shipped as tools with the calculator spec, not article bodies. 10. Canonical CA master slug confirmed (Section A open item) so "full guide" links point at the real pos-1 page.
