# Cluster Architecture Brief · Commercial Mortgages / Bridging / Development Finance (Track B · Cluster 2)

**Cluster:** Commercial mortgages · Bridging · Development finance · **Host site:** property (Property Tax Partners) · **Pages:** 19 content pages (3 pillars, 8 clusters, 8 bridging use-case segments) + 3 wave calculators (build-task, cross-link only) · **Date:** 2026-07-30
**Source rows:** `landlord_commercial_finance_pages.csv`, `landlord_commercial_finance_universe.csv`, post-recon build list `scratchpad/track_b_inventory.md` (CLUSTER 2), cross-link map `TRACK_B_CROSSLINK_REFERENCE.md`, plumbing `WRITER_PLUMBING.md`.
**Audience:** UK property investors, developers, commercial owner-occupiers and business owners (LtdCo / SPV / partnership first). **Reg status:** IAR-GATED. These are UNREGULATED business-purpose lending products, BUT their financial PROMOTION is restricted by FSMA 2000 s21 (qualifying credit). **This whole cluster is CONTENT-ONLY. No finance-capture CTA anywhere.** See §0.1.

This is a SPEC handed to per-page Opus writers. A writer should never have to re-decide angle, cross-links, sources, lead routing or compliance posture. Read §0 to §E first, then your page spec.

---

## 0. Quality bar (estate LOCKED rules · every page must comply)

- **Opus-only, A\* authoritative.** Genuinely the best educational page on this narrow topic on the UK web. Never thin, never flaggable, never a rephrased competitor. Quality IS the strategy.
- **NO em-dashes.** Use commas, parentheses, full stops, middle dots (·). Avoid "in today's", "delve", "leverage", "landscape", "seamless", "tapestry". (This brief models the rule.)
- **Faceless EEAT.** The operator is NOT an accountant and NOT a mortgage/finance broker. No named-expert claims, no "our broker says", no fabricated author credentials, no first-person advice voice. Authority comes from statute citation (FSMA, CAA/CTA, HMRC manuals), market-structure precision, worked numbers presented as ranges, and structured data. House byline only: `Property Tax Partners Editorial Team`.
- **Business-audience only.** Every page speaks to the investor / developer / commercial owner-occupier / SPV director. Never a consumer buying their own home. See §0.1 consumer exclusion.
- **Rates and figures are RANGES with drivers, never live tables.** Bridging, commercial and development rates move constantly and are lender/deal specific. A page that publishes a "current rate table" ages badly and reads as a promotion. Spec the RANGE, the DRIVERS that move it, and a "verify current pricing with a broker / lender" note. **Freshness burden: every rate figure below carries a `[VERIFY-AT-WRITE]` flag. The writer confirms the live range against a UK primary/market source (Bank of England base rate, a lender product page, Bridging Trends, an FCA-authorised broker's published guide) at write time and states the "as at <month year>" date inline.** Do not hardcode a single headline number as fact.
- **Body = raw HTML in frontmatter** (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>`, `<aside>`, `<strong>`), NOT markdown. Blog template auto-injects the LeadForm and auto-emits Article + FAQPage + Breadcrumb + Organization JSON-LD. Do NOT hand-write schema, do NOT put an FAQ block in the body, do NOT embed a second form.
- **Placement (WRITER_PLUMBING §2, Track B override):** dir `Property/web/content/blog/<slug>.md` (FLAT, never a subfolder). author `Property Tax Partners Editorial Team`. domain `https://www.propertytaxpartners.co.uk`. **Category `Property Finance` (slug `property-finance`)** per TRACK_B_CROSSLINK_REFERENCE (the inventory's provisional "Landlord Finance" label is owner-vetoable at sign-off; use `Property Finance` unless the wave lead says otherwise). canonical `https://www.propertytaxpartners.co.uk/blog/property-finance/<slug>`. The post-write `fix_links.py` / `normalise_links` pass auto-corrects the category segment in internal links, so the exact SLUG is what matters, not the category prefix.
- **Word count:** pillars 3,500 to 5,000 (8 to 12 H2s); clusters and segments 1,800 to 3,000 (6 to 10 H2s).

### 0.1 COMPLIANCE POSTURE (the crux · bake into EVERY page)

This is the single most important rule in the brief. It overrides any instinct to "convert".

1. **Unregulated ACTIVITY, restricted PROMOTION.** Bridging (non-regulated), commercial mortgages and development finance for a business/investment purpose clear the regulated-ACTIVITY line (they are outside the RAO regulated-mortgage-contract and consumer-credit perimeters when genuinely business-purpose). They do NOT clear the financial-PROMOTION line. **FSMA 2000 s21 restricts inviting or inducing someone to enter into a controlled agreement (qualifying credit) unless the promotion is made or approved by an FCA-authorised person.** Business purpose removes the need to be authorised for the ACTIVITY; it does not by itself let us PROMOTE the credit.
2. **Therefore, what we may publish NOW:** purely educational and tax-intersection content. Explaining how a product works, what drives the rate, typical LTV / GDV / LTC / ICR bands, eligibility criteria, the tax treatment of the interest. That is information, not an invitation. It publishes now.
3. **What we may NOT publish (would be a financial promotion of qualifying credit, needs an FCA-authorised person / an Introducer Appointed Representative we do NOT yet have):** "apply", "get a quote", "compare live rates", "we connect you to a lender", "check your eligibility", "get funded", a rate-capture form, a "speak to our broker" capture, an affiliate/lead-sale finance CTA. **None of these appear on any page in this cluster.**
4. **The ONLY CTA on every page is a SOFT TAX / ACCOUNTING placeholder** routed to the property TAX service, framed as "understand the tax treatment", never as arranging finance. The two tax-intersection pages (`is-bridging-loan-interest-tax-deductible`, `financing-a-property-development-tax`) are the cleanest wedge and lead most naturally to the tax service. Rates and lenders pages state ranges and drivers as education and end on the tax angle, never "get a quote".
5. **CONSUMER EXCLUSION (fence, do not introduce):** exclude everywhere · regulated bridging (a bridge secured on the borrower's OWN HOME), regulated first-charge residential mortgages, residential second-charge lending, and consumer buy-to-let (a "back to back" or accidental/family BTL that is a regulated mortgage contract). State the distinction plainly and route those readers AWAY ("if the loan is secured on your own home, this is a regulated product and outside the scope of this guide; speak to an FCA-authorised mortgage adviser"). The `bridging-finance-for-chain-breaks` segment is the most consumer-adjacent and carries the strongest fence (see §B and its spec).
6. **Future state (note, do not build):** once an FCA-authorised person or an IAR arrangement with one broker principal is in place (shareable with the SPV/BTL cluster), these pages may gain a compliant finance CTA and a business-finance broker can buy the leads. Until then, every built CTA is tax-only. **Do NOT scaffold a finance form "for later".**

**Per-page guardrail line (applies verbatim intent to every spec below):** *Education only. No financial promotion of qualifying credit (FSMA s21): no apply/quote/compare/eligibility/lender-capture CTA. Lead-CTA is the property TAX/accounting review ONLY, via the property lead form (source `property`) with mandatory consent checkbox. Exclude regulated bridging (own home), residential second charge and consumer BTL; state the distinction and route those readers away.*

---

## A. De-cannibalisation canonical map (READ FIRST · load-bearing)

**The rule (from TRACK_B_CROSSLINK_REFERENCE):** Property ALREADY owns the TAX authority for commercial property, development, HMO, FHL, Section 24 and BTL. Track B Cluster 2 owns the **FINANCE MECHANICS** (products, rates drivers, LTV, ICR/DSCR, GDV/LTC, bridging, dev finance) PLUS the tax-INTERSECTION wedge. For any topic where a property tax page exists: write the FINANCE / education angle, summarise the tax point in 2 to 4 sentences, and CROSS-LINK UP to the existing tax page. Never duplicate the tax decision. Never 301 or collapse an existing page. **Use only the exact slugs listed below (they are live on disk); never invent a slug.**

| New Cluster-2 page | Existing property TAX page(s) it must cross-link UP to (do NOT duplicate the tax point) |
|---|---|
| `commercial-mortgages-guide` (pillar) | `commercial-property-tax-landlords-rates-reliefs-allowances`; `section-24-commercial-property-complete-guide`; `vat-option-to-tax-commercial-property-mechanics-election-revocation`; `cgt-commercial-property-different-residential`; `buying-commercial-property-through-a-sipp` |
| `commercial-mortgage-rates` | `commercial-property-tax-landlords-rates-reliefs-allowances` |
| `semi-commercial-mortgages` | `commercial-property-tax-landlords-rates-reliefs-allowances`; `vat-option-to-tax-commercial-property-mechanics-election-revocation` (mixed-use VAT nuance) |
| `bridging-finance-for-commercial-property` | `commercial-property-tax-landlords-rates-reliefs-allowances`; `capital-allowances-commercial-property-what-can-claim` |
| `development-finance-guide` (pillar) | `housing-development-finance` (EXISTING THIN page · cross-link + supersede-by-depth, **do NOT 301**); `property-development-tax-trading-vs-investment-income`; `are-you-a-property-investor-or-developer`; `residential-property-developer-tax-uk` |
| `development-exit-finance` | `housing-development-finance`; `property-development-tax-trading-vs-investment-income` |
| `mezzanine-and-jv-finance` | `property-development-tax-trading-vs-investment-income`; `are-you-a-property-investor-or-developer` (JV / profit-share tax treatment lives on the tax side) |
| `financing-a-property-development-tax` (TAX-INTERSECTION) | `property-development-tax-trading-vs-investment-income`; `are-you-a-property-investor-or-developer`; `residential-property-developer-tax-uk`; `condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers` |
| `is-bridging-loan-interest-tax-deductible` (TAX-INTERSECTION) | `finance-costs-section-24-complete-guide`; `section-24-tax-relief-complete-guide`; `mortgage-interest-deductible-landlords-uk-2026`; `mortgage-arrangement-fees-deductible-landlord`; `claim-mortgage-interest-rental-property-uk-section-24` |
| `bridging-loans-guide` (pillar) | `finance-costs-section-24-complete-guide` (interest relief pointer); `are-you-a-property-investor-or-developer` (purpose test) |
| `bridging-finance-for-buy-to-let` | `btl-mortgage`; `deposit-buy-to-let-2026-mortgage-requirements`; `buy-to-let-refinancing-when-does-it-make-sense`; `section-24-remortgaging-btl-property-tax-implications` |
| `bridging-finance-for-hmo-conversions` | `hmo-vs-standard-buy-to-let-tax-comparison`; `hmo-tax-guide-rental-income-deductions-multi-tenant`; `hmo-licensing-fees-tax-deductible-uk-landlords` |
| `bridging-finance-for-land-purchase` / `-below-market-value` / `-refurbishment` / `-auction-purchases` | `are-you-a-property-investor-or-developer`; `property-development-tax-trading-vs-investment-income` (flip = trading, interest treatment differs) |
| `bridging-finance-for-chain-breaks` | `buy-to-let-refinancing-when-does-it-make-sense` (INVESTMENT chain only) |

**The thin `housing-development-finance` page (special handling):** it exists and is thin. `development-finance-guide` becomes the full pillar and SUPERSEDES it BY DEPTH. Cross-link both ways (pillar links down to it as "the short primer", it will later link up). **Do NOT 301, do NOT collapse** without a data-gated approval (per estate rule `feedback_rewrite_only_no_collapse`). Flag it in the publish checklist so the wave lead decides later whether the thin page gets folded.

**Wave-sibling links (Cluster 1 SPV/BTL, being built in the SAME wave, not yet live):** where a Cluster-2 page naturally points at a Cluster-1 finance page (e.g. `bridging-finance-for-buy-to-let` → the BTL-mortgages pillar; `bridging-finance-for-hmo-conversions` → `hmo-mortgages`; `bridging-loans-guide` → `commercial-mortgages-guide` and `development-finance-guide`), use the intended slug and mark it a WAVE-SIBLING link. `normalise_links` flags any not-yet-live slug; the wave QA resolves them once both clusters land. Confirmed Cluster-1 slugs to use: `spv-mortgages-explained`, `hmo-mortgages`, `buy-to-let-mortgage-lenders`, `portfolio-landlord-mortgages-guide`, and the Cluster-1 BTL pillar (slug TBD by the Cluster-1 brief · use `buy-to-let-mortgages-guide` provisionally and flag).

**Calculators (Track B build tasks, cross-link targets only):** `commercial-mortgage-calculator`, `bridging-loan-calculator`, `development-finance-calculator` (GDV/LTC). Every relevant page links to its calculator. These are pure tools (Sonnet build per the CALCULATOR CONTRACT in the inventory) and are SAFE pre-IAR because a calculator that estimates cost is information, not an invitation, PROVIDED it does not end in a "get this deal / apply" capture. The calculator's only CTA is the same soft tax placeholder. **Calculator specs are out of scope for this brief (build-task, not a body); listed here only as link targets.**

---

## B. Anti-sameness matrix · the 8 bridging use-case segments (the single biggest sameness risk)

All eight describe "bridging finance for [use case]". They MUST NOT read alike. Each is built around its ONE distinguishing axis and its ONE unique hook (unique worked number, unique framing). **No two segments may share a worked example, a headline number, a table, or a framing.** Lead every segment with its own axis and its own number.

| Segment | ONE distinguishing axis (the wedge) | Unique hook / worked number (do not reuse) | The one thing only this page says |
|---|---|---|---|
| **bridging-finance-for-land-purchase** | PLANNING RISK · no income from the asset · title/access quality. Land with no consent is the riskiest security. | ~£300k land buy, lender advances a LOW LTV on land value (often ~50% to 65% of land value, lower without planning), interest ROLLED because bare land produces no rent. [VERIFY-AT-WRITE] | Serviced vs strategic vs consented land, the "no planning = lower LTV" haircut, ransom-strip / access / overage title traps, why exit is planning-gain or a build/dev-finance take-out. |
| **bridging-finance-for-buy-to-let** | BRIDGE-TO-LET · the EXIT is a term BTL mortgage. The bridge only exists to make an unmortgageable property mortgageable, then refinance. | Uninhabitable flat (no kitchen/bathroom, sub-6% yield on paper) bought at ~£180k, bridged, made lettable, refinanced onto a term BTL at ~75% LTV. Exit = the BTL redemption. [VERIFY-AT-WRITE] | The "unmortgageable now, mortgageable after works" test, day-one-value vs 6-month-rule refinance, and how the bridge repays FROM the BTL mortgage (cross-link BTL-mortgages sibling + `btl-mortgage` tax). |
| **bridging-finance-for-commercial-property** | VALUATION BASIS + TENANT COVENANT. Commercial security is valued on vacant-possession vs investment (yield) basis; the tenant's covenant strength drives the loan. | ~£500k vacant retail/office unit valued on VP basis at a discount, bridged to ~65% to 70% of VP value while a tenant is found, exit onto a commercial mortgage once let and income-producing. [VERIFY-AT-WRITE] | VP vs investment valuation, why an empty commercial building bridges lower, covenant/lease-length as the underwrite, exit onto a commercial term mortgage (link the pillar). |
| **bridging-finance-for-auction-purchases** | THE 28-DAY COMPLETION CLOCK. Auction contracts exchange on the fall of the hammer with completion typically in 28 days (some 20). Speed is the entire product. | 10% deposit down at the hammer on a ~£150k lot, full completion in 28 days, bridge drawn in days to hit the deadline or lose the deposit. [VERIFY-AT-WRITE] | The legal-pack-before-you-bid discipline, why a term mortgage cannot complete in 28 days, dual legal representation to save time, and the deposit-forfeiture risk that makes speed non-negotiable. **This page ABSORBS the dropped `auction-finance` slug.** |
| **bridging-finance-for-refurbishment** | LIGHT vs HEAVY refurb, and BRRR REFINANCE EXIT. The works themselves define the product (cosmetic vs structural/change-of-use). | Light refurb (~£25k cosmetic) on a ~£200k house vs heavy refurb (structural, ~£90k, may touch permitted development / building control); staged drawdowns against a schedule of works; exit = refinance onto BTL or sale (BRRR: buy, refurbish, rent, refinance). [VERIFY-AT-WRITE] | The light/heavy line (does it need planning/building control), stage-payment drawdowns against a QS/schedule, and the BRRR "pull your money back out" refinance. **This page ABSORBS the dropped `refurbishment-and-brrr-finance` slug** and carries the BRRR-strategy angle inside it. |
| **bridging-finance-for-below-market-value** | DAY-ONE OPEN-MARKET-VALUE LENDING + vendor-gifted deposit. Lending against true OMV, not the discounted price paid. | Property worth ~£200k bought at ~£150k (a genuine 25% BMV, e.g. motivated seller), a lender willing to lend against the ~£200k OMV (not the £150k price) can fund most or all of the purchase; the gifted-equity / vendor-gifted-deposit mechanism. [VERIFY-AT-WRITE] | The OMV-vs-price distinction and the "no money in" myth, why most lenders anchor to the LOWER of price and value for 6 months, the fraud/anti-money-laundering red flags around back-to-back and undervalue sales, genuine-BMV evidence. |
| **bridging-finance-for-chain-breaks** | INVESTMENT chain only + OWN-HOME FENCE (compliance-critical). | An investor whose onward purchase would collapse because a portfolio SALE has not completed uses a bridge on an INVESTMENT property to keep the deal alive; number framed around portfolio units, never a main residence. [VERIFY-AT-WRITE] | **The regulated fence is the lead nuance:** a bridge secured on your OWN HOME to break a residential chain is a REGULATED product, outside this guide; route the consumer to an FCA-authorised adviser. Cover ONLY the investment/business chain-break. Most consumer-adjacent of all eight. |
| **bridging-finance-for-hmo-conversions** | ARTICLE 4 + HMO LICENSING + works-then-refinance. Planning and licensing, not just the loan. | Converting a ~£250k C3 house to a 6-bed HMO: Article 4 direction removing permitted-development rights (so full planning needed), mandatory HMO licence for 5+ occupants, room-size/amenity standards, bridge funds purchase + conversion, exit onto a specialist HMO mortgage. [VERIFY-AT-WRITE] | Article 4 / permitted-development / sui generis (large HMO) planning, mandatory vs additional/selective licensing, why the exit is an HMO mortgage valued on rental (link `hmo-mortgages` sibling + HMO tax pages). |

**Enforcement:** the axis, the worked number and the "one thing only this page says" above are the anchors that keep the eight apart. Two segments sharing a worked example, an LTV figure, or a framing is a QA failure. The 28-day clock (auction), the OMV-vs-price point (BMV), the Article 4 point (HMO), the own-home fence (chain-break), the bridge-to-let exit (BTL), the VP/covenant point (commercial), the planning-haircut (land) and the light/heavy + BRRR line (refurb) are non-transferable.

---

## C. Shared authority-source list (draw 4 to 6 per page, plus page-specific)

Cite specific instruments and manuals, not "the rules" generically. All UK primary / regulator / trade sources.

**Financial promotion + regulated-boundary (cite on EVERY page's compliance/scope paragraph)**
- **FSMA 2000 s21** (legislation.gov.uk) · restriction on financial promotion of controlled activities / qualifying credit.
- **FCA PERG 8** (financial promotions and s21) · what is and is not a promotion; the business-purpose and exemptions territory.
- **FCA PERG 4** (regulated mortgage activities / the regulated-mortgage-contract boundary) · the own-home / land-40%-dwelling-use test.
- **FCA PERG 2** and the **RAO** (Financial Services and Markets Act 2000 (Regulated Activities) Order 2001): **Art 61** (regulated mortgage contract definition), **Art 60C to 60H** (exempt/business-purpose credit agreements, the £25,000 and business-purpose exemptions), **Art 25** (arranging). Use to draw the "business = outside the perimeter, own home = inside" line precisely.
- gov.uk / FCA on regulated vs unregulated bridging; **FCA Handbook MCOB** (referenced only to say what falls under it, i.e. the excluded consumer product).

**Market structure / product education**
- **Bridging & Development Lenders Association (BDLA)** (formerly ASTL) · standards, product definitions, market data.
- **UK Finance** · commercial and BTL lending market data and definitions.
- **NACFB** (National Association of Commercial Finance Brokers) · commercial finance market structure (cite as market body, not as "our broker").
- **Bridging Trends** (quarterly market data) · for the rate/LTV/term RANGES and average completion times [VERIFY-AT-WRITE each quarter].
- **Bank of England** base rate and SONIA · the reference rate that drives commercial and dev margins [VERIFY-AT-WRITE].
- **RICS** Red Book · valuation bases (market value, vacant possession, investment value) for the commercial/land/BMV valuation points.

**Tax (the two tax-intersection pages + every "summarise the tax point" paragraph)**
- **HMRC PIM** (Property Income Manual): **PIM2054 / PIM2058** (interest and finance costs, the residential restriction), PIM2105+ (deductible expenses). 
- **HMRC BIM** (Business Income Manual): **BIM45650+** (interest / incidental costs of loan finance, wholly-and-exclusively), **BIM35000+** (capital vs revenue), **BIM46435** (incidental costs of obtaining finance), **BIM51105+** (property developers, WIP / interest capitalisation).
- **ITTOIA 2005 s272A / s274A** (the residential finance-cost restriction, Section 24) and **CTA 2009** (loan relationships, company finance costs) · legislation.gov.uk.
- Property tax pages named in §A own the detailed tax decision · summarise and link, do not re-derive.

---

## D. Lead-routing summary (NO finance lead captured pre-IAR)

**What we sell / capture now: NOTHING on the finance side.** No finance lead is captured on any Cluster-2 page pre-IAR. There is no "compare rates", no "get funded", no broker capture, no affiliate finance CTA.

**The ONLY built CTA is the property TAX / accounting review**, via the site's existing lead form (lead source `property`). Framing = "understand the tax treatment of this finance / is the interest an allowable finance cost / how is a development taxed", never "arrange finance". 
- **Strongest wedge:** the two tax-intersection pages (`is-bridging-loan-interest-tax-deductible`, `financing-a-property-development-tax`) lead cleanly and honestly to the tax service.
- **Rates / lenders / product pages:** state ranges and drivers as EDUCATION, then end on the soft tax angle ("if you are weighing the cost, the tax treatment of the interest is part of the sum, here is how it works / speak to us about the tax review"). Never "get a quote".
- **Segment / pillar pages:** end on the tax/accounting angle relevant to that use case (developer trading tax, BTL interest relief, HMO tax).

**Form fields (business-audience):** ownership vehicle (LtdCo / SPV / partnership / individual investor / developer trade) · property or scheme type · purpose (investment / development / owner-occupier) · and the estate-standard **mandatory data-sharing consent checkbox**. No finance-specific capture fields (no "loan amount you want", no "when do you need funds"), because that would read as arranging.

**Future state (note only, do not build):** post-IAR (one FCA-authorised broker principal, shareable with the SPV/BTL cluster), a compliant finance CTA can be added and a business-finance broker can buy these leads. Until sign-off, tax-only. Do NOT scaffold the finance form now.

**Consumer routing (compliance):** where a reader is a consumer (own-home bridge, regulated mortgage, residential 2nd charge, consumer BTL), the page does not capture them; it states the product is regulated and out of scope and points them to an FCA-authorised adviser generically. No capture, no onward sale.

---

## E. Internal cross-link graph (root-relative, property site)

Every link root-relative (`/blog/...`), never absolute. `[E]` = existing live property page (from §A, exact slug). `[S]` = wave-sibling (Cluster-1, not yet live, flag). `[C]` = calculator (build-task). `[T]` = tax-intersection page.

```
                         C L U S T E R   2   (education only, tax-only CTA)

   [PILLAR] bridging-loans-guide (18100) ───────────────┐
      │  links UP(tax) → finance-costs-section-24-complete-guide [E]
      │  links → commercial-mortgages-guide, development-finance-guide (sibling pillars)
      │  links → bridging-loan-rates, bridging-loan-lenders, bridging-loan-calculator [C]
      ▼  hub for the 8 use-case segments:
   ┌───────┬────────┬──────────┬─────────┬──────────┬───────────┬────────────┬──────────────┐
  land   buy-to-let commercial auction  refurb    below-mkt   chain-breaks  hmo-conversions
   │        │(→BTL      │(→comm    (absorbs (absorbs   -value       (INVEST only  (→hmo-mortgages[S],
   │        │ pillar)   │ pillar)  auction- refurb-    │            + own-home     HMO tax pages[E])
   │        │           │          finance) and-brrr)  │            FENCE)         │
   └────────┴───────────┴──────────┴─────────┴──────────┴─────────────┴────────────┘
          every segment → bridging-loans-guide (up) + bridging-loan-calculator [C]
          + is-bridging-loan-interest-tax-deductible [T] + its §A tax page(s) [E]

   [PILLAR] commercial-mortgages-guide (3600)
      │  UP(tax) → commercial-property-tax-landlords-rates-reliefs-allowances [E],
      │            section-24-commercial-property-complete-guide [E], vat-option-to-tax... [E]
      ├── commercial-mortgage-rates ─── commercial-mortgage-calculator [C]
      ├── semi-commercial-mortgages ── (mixed-use VAT [E])
      └── bridging-finance-for-commercial-property (segment, shared with bridging pillar)

   [PILLAR] development-finance-guide (1300)
      │  DOWN → housing-development-finance [E, THIN · supersede-by-depth, NO 301]
      │  UP(tax) → property-development-tax-trading-vs-investment-income [E],
      │            are-you-a-property-investor-or-developer [E], residential-property-developer-tax-uk [E]
      ├── development-exit-finance ─── development-finance-calculator [C]
      ├── mezzanine-and-jv-finance ── (JV tax [E])
      └── financing-a-property-development-tax [T] ──► the TAX SERVICE (strongest wedge)

   [T] is-bridging-loan-interest-tax-deductible ──► section-24 / finance-costs tax set [E] ──► TAX SERVICE
```

Rules: (1) every segment links UP to `bridging-loans-guide`, sideways to `is-bridging-loan-interest-tax-deductible` [T], and to `bridging-loan-calculator` [C]. (2) each cluster page links UP to its pillar and to the relevant existing property TAX page [E]. (3) each pillar links to the other two pillars and to its calculator. (4) the two tax-intersection pages bridge to the existing property tax set [E] and are the pages that most cleanly reach the tax service. (5) `development-finance-guide` links DOWN to the thin `housing-development-finance` [E] (no 301). (6) commercial/BTL/HMO segments cross to the Cluster-1 wave-siblings [S] where noted (flag for QA).

---

# PER-PAGE SPECS

Legend: **[ANGLE]** = the wedge · **[HOOK]** = the one worked example only this page uses (ranges, `[VERIFY-AT-WRITE]`) · **[GUARDRAIL]** = the §0.1 line, applies to every page. Rates below are indicative RANGES for spec purposes and MUST be verified against a live UK source at write time.

---

## 1. bridging-loans-guide · PILLAR

- **Tier:** pillar · **Primary kw:** bridging loan · **Volume:** 18,100/mo (largest single volume in all of Track B) · cluster volume ~147,800.
- **Secondary kw:** what is a bridging loan; how does a bridging loan work; bridging finance uk; bridging loan uk; bridging loan explained; bridging loan meaning; what is a bridging loan and how does it work; bridging loan vs mortgage; how does bridging finance work; short term bridging loan; open vs closed bridging loan.
- **User intent:** informational (head-term education hub).
- **[ANGLE]:** the plain-English, reader-first HEAD-TERM hub that owns "bridging loan" for the UK property INVESTOR / DEVELOPER / business. It answers what it is, how it works, what it costs (as ranges + drivers), when it makes sense, and the risks. It is EDUCATION, not a promotion: no "apply", no capture. It fences the regulated (own-home) product explicitly and stays on investment/business bridging.
- **H2 outline (8 to 12):** (1) What a bridging loan is (short-term, interest-first, secured, purpose-driven). (2) Regulated vs unregulated bridging (the own-home line · this guide covers UNREGULATED business/investment bridging only · route consumers away). (3) How it works: first vs second charge, open vs closed, gross vs net loan, retained/rolled/serviced interest. (4) What it costs (monthly rate RANGE ~0.55% to 1% per month first charge investment [VERIFY-AT-WRITE], arrangement fee ~1% to 2%, valuation, legals, exit fee) · what DRIVES the rate (LTV, charge, security quality, exit strength, borrower experience). (5) LTV and how much you can borrow (typically up to ~70% to 75% LTV [VERIFY-AT-WRITE], higher with additional security). (6) The EXIT is everything (sale, refinance, development take-out) · lenders underwrite the exit. (7) Typical uses (links down to the 8 segments). (8) Timescales (why bridging completes in days/weeks not months). (9) Risks (rolled interest compounding, exit failure, default rates, personal guarantees). (10) The tax angle in brief (interest as a finance cost, link to the tax-deductibility page). (11) How bridging differs from a mortgage and from development finance. (12) FAQ.
- **[HOOK]:** a ~£250k first-charge investment bridge at ~0.75%/mo [VERIFY-AT-WRITE] with interest ROLLED for 9 months · show the gross-vs-net loan mechanic (fees + rolled interest deducted from day one) so the reader sees why the "£250k" they draw is less in the hand. Distinct number from every segment.
- **Internal links:** DOWN to all 8 segments; sideways to `commercial-mortgages-guide`, `development-finance-guide`, `bridging-loan-rates`, `bridging-loan-lenders`; to `bridging-loan-calculator` [C]; UP(tax) to `finance-costs-section-24-complete-guide` [E]; to `is-bridging-loan-interest-tax-deductible` [T].
- **Authority sources:** FSMA 2000 s21; FCA PERG 8 + PERG 4 (regulated-mortgage boundary); RAO Art 61 / 60C to 60H; BDLA; Bridging Trends [VERIFY-AT-WRITE]; UK Finance.
- **Lead-CTA (TAX-ONLY):** soft tax placeholder ("if you are costing a bridge, the interest treatment is part of the maths · understand the tax") → property lead form, tax review. NO finance capture.
- **[GUARDRAIL].**
- **FAQ stems (8 to 12):** What is a bridging loan? · How does a bridging loan work? · What is the difference between a regulated and unregulated bridging loan? · How much does a bridging loan cost? · What LTV can I get on a bridging loan? · What is an exit strategy and why does it matter? · How quickly can a bridging loan complete? · What is the difference between open and closed bridging? · Is bridging loan interest tax deductible? · What happens if I cannot repay at the end of the term? · Bridging loan vs mortgage: which is right? · Can a limited company or SPV take a bridging loan?

---

## 2. commercial-mortgages-guide · PILLAR

- **Tier:** pillar · **Primary kw:** commercial mortgage · **Volume:** 3,600/mo · cluster ~31,080.
- **Secondary kw:** what is a commercial mortgage; how does a commercial mortgage work; commercial mortgage uk; owner occupied commercial mortgage; commercial investment mortgage; commercial mortgage deposit; commercial mortgage interest only; commercial property mortgage; buy to let commercial mortgage; limited company commercial mortgage.
- **User intent:** informational / commercial (education hub).
- **[ANGLE]:** the education hub for a business or investor financing commercial property, split cleanly into OWNER-OCCUPIER (trading business buying its own premises) vs INVESTMENT (landlord buying a let commercial asset). Explains structure, deposit, term, rate drivers, and the ICR/DSCR underwrite. Tax point summarised and linked up.
- **H2 outline (8 to 12):** (1) What a commercial mortgage is and who it is for (owner-occupier vs investment). (2) Owner-occupier vs commercial-investment lending (different underwrite: trading affordability vs rental income). (3) Deposit and LTV (typically 25% to 40% deposit, LTV up to ~70% to 75% [VERIFY-AT-WRITE], owner-occupier sometimes higher). (4) How pricing works (margin over Bank of England base / SONIA [VERIFY-AT-WRITE], fixed vs variable, why commercial is priced deal-by-deal not off a rate sheet · link `commercial-mortgage-rates`). (5) The affordability test: DSCR / ICR (lenders typically want debt service cover around 1.25x to 1.4x net income [VERIFY-AT-WRITE]) and covenant strength. (6) Term and repayment (5 to 25 years, capital-and-interest vs interest-only). (7) Semi-commercial and mixed-use in brief (link `semi-commercial-mortgages`). (8) The tax side in brief (SDLT/LBTT/LTT non-residential rates, VAT option to tax, capital allowances, Section 24 does NOT bite commercial) · link the tax pages [E]. (9) How commercial mortgages differ from bridging and development finance. (10) FAQ.
- **[HOOK]:** a trading company buying its ~£600k premises with a 30% deposit (£180k), a ~15-year term, priced on affordability with a DSCR test [VERIFY-AT-WRITE] · contrast an investor buying the same unit let to a tenant, underwritten on rent and covenant. Two-sided worked example unique to this page.
- **Internal links:** DOWN to `commercial-mortgage-rates`, `semi-commercial-mortgages`, `bridging-finance-for-commercial-property`; sideways to `bridging-loans-guide`, `development-finance-guide`; to `commercial-mortgage-calculator` [C]; UP(tax) to `commercial-property-tax-landlords-rates-reliefs-allowances` [E], `section-24-commercial-property-complete-guide` [E], `vat-option-to-tax-commercial-property-mechanics-election-revocation` [E], `buying-commercial-property-through-a-sipp` [E].
- **Authority sources:** FSMA s21; FCA PERG 4 (the 40%-dwelling-use test that keeps mixed-use commercial outside the regulated perimeter); UK Finance; NACFB; Bank of England base rate [VERIFY-AT-WRITE]; RICS (valuation bases).
- **Lead-CTA (TAX-ONLY):** the commercial property TAX review (allowances, VAT option, SDLT) → property lead form. NO finance capture.
- **[GUARDRAIL].**
- **FAQ stems:** What is a commercial mortgage? · How does a commercial mortgage work? · How much deposit do I need for a commercial mortgage? · What is the difference between owner-occupier and investment commercial lending? · What is DSCR / ICR on a commercial mortgage? · Can I get an interest-only commercial mortgage? · Can a limited company or SPV get a commercial mortgage? · How are commercial mortgage rates set? · Do I pay VAT on a commercial property purchase? · Commercial mortgage vs bridging: which do I need? · What term can I get? · Can I hold commercial property in a SIPP/SSAS?

---

## 3. development-finance-guide · PILLAR

- **Tier:** pillar · **Primary kw:** development finance / property development finance · **Volume:** 1,300/mo (primary) · note the 22,200 "housing development finance" head is DFI/corporate-noise (exclude, see below) · cluster ~39,320.
- **Secondary kw:** property development finance; how does development finance work; development finance uk; ground up development finance; residential development finance; commercial development finance; property development finance broker; how to finance a property development; development finance rates; build to rent development finance.
- **User intent:** informational / commercial (education hub).
- **[ANGLE]:** the full ground-up-and-heavy-refurb development finance pillar that SUPERSEDES the thin existing `housing-development-finance` by depth. Owns GDV / LTC / LTGDV, staged drawdowns, day-one land advance, rolled interest, senior vs stretch senior vs mezzanine, and the developer-experience underwrite. **Scope discipline: this is UK PROPERTY development finance. Explicitly exclude the "development finance institution" / DFI / "housing development finance corporation" corporate-noise the keyword set is polluted with** (a one-line disambiguation, then move on).
- **H2 outline (8 to 12):** (1) What development finance is and how it differs from a mortgage or a bridge (funds land + build in stages). (2) The two headline metrics: LTGDV (loan to gross development value, typically up to ~65% to 70% GDV [VERIFY-AT-WRITE]) and LTC (loan to cost, often up to ~85% to 90% of total costs [VERIFY-AT-WRITE]). (3) The day-one land advance (typically ~50% to 70% of land value [VERIFY-AT-WRITE]) and how build funds are drawn in stages against a monitoring surveyor's certificates. (4) How interest works (rolled/retained into the facility, charged on drawn funds, priced as a margin plus fees + exit fee) · rate RANGE [VERIFY-AT-WRITE]. (5) Ground-up vs heavy refurb vs conversion (permitted development / change of use). (6) Senior, stretch senior and mezzanine / JV (link `mezzanine-and-jv-finance`). (7) Experience, GDV appraisal, planning and the exit (sale or refinance / development-exit bridge · link `development-exit-finance`). (8) The tax side in brief (trading vs investment, interest capitalised into WIP vs expensed, developer tax) · link `financing-a-property-development-tax` [T] and the tax pages [E]. (9) FAQ.
- **[HOOK]:** a ~£2m GDV small residential scheme: land ~£500k, build ~£800k, a facility sized to the LOWER of ~65% GDV (£1.3m) and ~90% LTC [VERIFY-AT-WRITE], with a day-one land advance and staged build drawdowns; developer equity fills the gap; exit on sale of the units. Unique appraisal-style worked example.
- **Internal links:** DOWN to `development-exit-finance`, `mezzanine-and-jv-finance`, `financing-a-property-development-tax` [T]; to `housing-development-finance` [E · THIN, supersede-by-depth, NO 301]; sideways to `bridging-loans-guide`, `commercial-mortgages-guide`; to `development-finance-calculator` [C]; UP(tax) to `property-development-tax-trading-vs-investment-income` [E], `are-you-a-property-investor-or-developer` [E], `residential-property-developer-tax-uk` [E].
- **Authority sources:** FSMA s21; FCA PERG 8; BDLA; UK Finance / Homes England (market context); RICS Red Book (GDV appraisal / monitoring); Bank of England base rate [VERIFY-AT-WRITE].
- **Lead-CTA (TAX-ONLY):** developer tax review (trading vs investment, WIP, interest relief) → property lead form. NO finance capture.
- **[GUARDRAIL].**
- **FAQ stems:** What is property development finance? · How does development finance work? · What is loan to GDV and loan to cost? · How much of the land value will a lender advance on day one? · How is interest charged on development finance? · What is the difference between senior, stretch senior and mezzanine? · Do I need development experience? · How does development finance differ from a bridging loan? · What is a monitoring surveyor? · How is the exit funded? · Is development finance interest tax deductible? · (Disambiguation) Is this the same as a development finance institution?

---

## 4. commercial-mortgage-rates · CLUSTER

- **Tier:** cluster · **Primary kw:** commercial mortgage rates · **Volume:** 1,600/mo · cluster ~15,180.
- **Secondary kw:** commercial mortgage interest rates; commercial mortgage lending rates; uk commercial mortgage rates; current commercial mortgage rates uk; best commercial mortgage rates uk; typical commercial mortgage rates; average commercial mortgage rates; commercial property mortgage rates.
- **User intent:** commercial (rate research).
- **[ANGLE]:** a RATE-DRIVERS education page, NOT a live rate table and NOT a comparison-to-capture. Explains what determines a commercial mortgage rate and what a typical RANGE looks like, so the reader understands their own likely pricing. Ends on the tax angle, never "get a quote". **Freshness-critical: state ranges + "as at <month year>", verify at write time.**
- **H2 outline (6 to 10):** (1) Why there is no single "commercial mortgage rate" (priced per deal). (2) The building blocks: reference rate (Bank of England base / SONIA [VERIFY-AT-WRITE]) + lender margin + fees. (3) What DRIVES your margin (LTV, owner-occupier vs investment, property type, lease/covenant, borrower strength, term). (4) Fixed vs variable and typical RANGES [VERIFY-AT-WRITE, state as a band with the "as at" date]. (5) Fees that change the true cost (arrangement ~1% to 2%, valuation, legals, broker, exit). (6) How affordability (DSCR/ICR) interacts with the rate you are offered. (7) How to compare the true cost (APRC-style total cost, not headline rate). (8) The tax point: commercial mortgage interest is a deductible finance cost against rental/trading profit (NOT restricted by Section 24, which is residential) · link [E]. (9) FAQ.
- **[HOOK]:** decompose an illustrative rate: base rate + a ~2% to 4% margin band [VERIFY-AT-WRITE] on a 70% LTV investment loan, plus a 1.5% arrangement fee, showing headline-rate vs true-cost. No lender named, no "best deal" capture.
- **Internal links:** UP to `commercial-mortgages-guide`; to `commercial-mortgage-calculator` [C]; sideways to `semi-commercial-mortgages`, `bridging-finance-for-commercial-property`; UP(tax) to `commercial-property-tax-landlords-rates-reliefs-allowances` [E].
- **Authority sources:** Bank of England base rate / SONIA [VERIFY-AT-WRITE]; FSMA s21; UK Finance; NACFB; FCA PERG 8.
- **Lead-CTA (TAX-ONLY):** "the interest is a deductible cost · understand the tax" → property lead form. NO rate capture, NO compare.
- **[GUARDRAIL] + freshness flag: ranges only, "as at" date, verify at write time.**
- **FAQ stems:** What is the current commercial mortgage rate? (answer as a range + drivers, dated) · Why do commercial mortgage rates vary so much? · What drives my commercial mortgage margin? · Are commercial mortgage rates higher than residential? · Fixed or variable for a commercial mortgage? · What fees come on top of the rate? · How does LTV affect the rate? · Is commercial mortgage interest tax deductible? · How do I compare the true cost? · Are rates different for owner-occupiers?

---

## 5. bridging-loan-rates · CLUSTER

- **Tier:** cluster · **Primary kw:** bridging loan rates · **Volume:** 880/mo · cluster ~9,890.
- **Secondary kw:** bridging loan interest rates; bridging finance rates; bridging loan cost; how much does a bridging loan cost; bridging loan rates uk; typical bridging loan rates; average bridging loan interest rate; bridging loan fees.
- **User intent:** commercial (cost research).
- **[ANGLE]:** the true-COST-of-bridging education page. Monthly rate is only part of the cost; the page teaches gross vs net loan, rolled/retained/serviced interest, and all the fees, as ranges + drivers. NOT a live table, NOT a "compare rates" capture. Distinct from `commercial-mortgage-rates` (monthly not annual; fee-heavy; short-term).
- **H2 outline (6 to 10):** (1) Why bridging is quoted MONTHLY not annually (and why that trips people up). (2) The typical monthly rate RANGE (~0.55% to 1%+ per month first-charge investment [VERIFY-AT-WRITE]) and what moves it (charge, LTV, security, exit, experience). (3) Rolled vs retained vs serviced interest (the three ways interest is paid and what each does to the cash you receive). (4) Gross vs net loan (why fees + rolled interest come off the top). (5) The full fee stack (arrangement ~1% to 2%, valuation, legals, admin, exit fee, broker). (6) Second charge and regulated bridging cost premium (and the fence: regulated own-home bridging is out of scope). (7) A worked total-cost-of-the-bridge over its term. (8) The tax point: is the interest deductible (link `is-bridging-loan-interest-tax-deductible` [T]). (9) FAQ.
- **[HOOK]:** a ~£200k bridge at ~0.8%/mo [VERIFY-AT-WRITE] over 8 months with interest ROLLED: build the total cost (interest + arrangement + valuation + legals + exit) to show the effective cost far exceeds "0.8%". Number distinct from the pillar's £250k example.
- **Internal links:** UP to `bridging-loans-guide`; to `bridging-loan-calculator` [C]; sideways to `bridging-loan-lenders`; to `is-bridging-loan-interest-tax-deductible` [T].
- **Authority sources:** Bridging Trends (average rates/LTV/term [VERIFY-AT-WRITE]); BDLA; FSMA s21; FCA PERG 8; Bank of England base rate [VERIFY-AT-WRITE].
- **Lead-CTA (TAX-ONLY):** interest-deductibility tax angle → property lead form. NO rate capture.
- **[GUARDRAIL] + freshness flag: ranges only, dated, verify at write time.**
- **FAQ stems:** How much does a bridging loan cost? · Why are bridging rates quoted per month? · What is a typical bridging loan interest rate? (range + drivers, dated) · What is the difference between rolled, retained and serviced interest? · What fees come with a bridging loan? · What is the difference between gross and net loan? · Why is my actual cost higher than the headline rate? · Is bridging loan interest tax deductible? · Are second-charge bridging rates higher? · How is the exit fee calculated?

---

## 6. bridging-loan-lenders · CLUSTER

- **Tier:** cluster · **Primary kw:** bridging loan lenders · **Volume:** 170/mo · cluster ~2,940.
- **Secondary kw:** bridging loan lenders uk; bridging finance lenders; bridging loan direct lenders; regulated bridging loan lenders; bridging loan providers; bridging loan companies.
- **User intent:** commercial (lender-landscape research).
- **[ANGLE]:** a FACTUAL lender-MARKET-STRUCTURE education page, NOT a lender directory-to-capture and NOT a recommendation. Explains the TYPES of bridging lender and how to tell a good one apart, so the reader is informed. **No named lenders as recommendations, no "apply", no affiliate links.** (Naming lender TYPES and the trade body is education; endorsing/linking a specific lender to capture is promotion.)
- **H2 outline (6 to 10):** (1) The bridging lender landscape by TYPE (specialist/non-bank, challenger banks, private/family offices, P2P/institutional, brokers-with-funding-lines) · what each is good for. (2) Regulated vs unregulated lenders (and why the own-home product needs an FCA-authorised lender · fence). (3) Direct lender vs broker (and why most investment bridging goes via a broker for whole-of-market access). (4) How to assess a lender (BDLA membership, funding certainty, speed, valuation approach, default-rate small print, redemption terms). (5) Red flags (upfront fees before valuation, non-refundable commitment fees, unclear default rates). (6) Where a specialist FCA-authorised broker fits (as market info, not a capture). (7) FAQ.
- **[HOOK]:** a comparison-style table of lender TYPES (specialist vs challenger bank vs private) across speed / cost / flexibility / LTV appetite [VERIFY-AT-WRITE], illustrating the trade-off. No brand names.
- **Internal links:** UP to `bridging-loans-guide`; sideways to `bridging-loan-rates`; to `bridging-loan-calculator` [C].
- **Authority sources:** BDLA (membership/standards); FCA Financial Services Register (how to check a lender is authorised, cite as a verification tool); FSMA s21; NACFB; Bridging Trends [VERIFY-AT-WRITE].
- **Lead-CTA (TAX-ONLY):** tax review angle → property lead form. NO lender capture, NO "get matched".
- **[GUARDRAIL]. Extra: name lender TYPES only, never endorse or link a specific lender; no affiliate; no "apply".**
- **FAQ stems:** What types of bridging lender are there? · What is the difference between a direct lender and a broker? · How do I check a bridging lender is legitimate? · What is the BDLA? · Should I use a regulated or unregulated bridging lender? · What are the red flags with a bridging lender? · How do I compare bridging lenders? · Do I need a broker for a bridging loan?

---

## 7. semi-commercial-mortgages · CLUSTER

- **Tier:** cluster · **Primary kw:** semi commercial mortgage · **Volume:** 480/mo · cluster ~1,290.
- **Secondary kw:** semi-commercial mortgage; semi commercial mortgage rates; semi commercial mortgage lenders; mixed use mortgage; shop with flat above mortgage.
- **User intent:** commercial.
- **[ANGLE]:** the MIXED-USE page. A property that is part commercial part residential (shop/office with flat above) sits between commercial and BTL lending, with its OWN valuation, VAT, SDLT and regulated-boundary quirks. The unique wedge is the mixed-use treatment across finance AND tax.
- **H2 outline (6 to 10):** (1) What counts as semi-commercial / mixed-use (the classic shop-with-flat, and the "predominant use" question). (2) Why it is financed as commercial not residential (and how LTV/deposit compare, typically up to ~70% to 75% LTV [VERIFY-AT-WRITE]). (3) The regulated-boundary nuance (FCA PERG 4: a loan is a regulated mortgage contract only if 40%+ is used as/with a dwelling · above that threshold it can tip into regulated territory · state the test, fence the consumer case). (4) Valuation (blended commercial + residential, VP vs investment). (5) The tax quirks: SDLT non-residential/mixed rates, VAT option to tax only bites the commercial part, capital allowances on the commercial element · link [E]. (6) Who lends and the ICR/DSCR test. (7) FAQ.
- **[HOOK]:** a ~£400k retail unit with a 2-bed flat above: how a lender blends the commercial and residential values, why it is a commercial (not BTL) mortgage, and the ~40% dwelling-use test that decides whether it is regulated. Unique to this page.
- **Internal links:** UP to `commercial-mortgages-guide`; sideways to `commercial-mortgage-rates`; to `commercial-mortgage-calculator` [C]; UP(tax) to `commercial-property-tax-landlords-rates-reliefs-allowances` [E], `vat-option-to-tax-commercial-property-mechanics-election-revocation` [E].
- **Authority sources:** FCA PERG 4 (the 40% dwelling-use test); FSMA s21; HMRC SDLT mixed-use guidance; UK Finance; RICS.
- **Lead-CTA (TAX-ONLY):** mixed-use SDLT/VAT/allowances review → property lead form.
- **[GUARDRAIL].**
- **FAQ stems:** What is a semi-commercial mortgage? · What counts as mixed-use property? · Is a shop with a flat above a commercial or residential mortgage? · When does a mixed-use loan become a regulated mortgage? · What deposit do I need for a semi-commercial mortgage? · How is a mixed-use property valued? · Do I pay residential or commercial SDLT on mixed-use? · Does the VAT option to tax apply to the flat above?

---

## 8. development-exit-finance · CLUSTER

- **Tier:** cluster · **Primary kw:** development exit finance · **Volume:** 880/mo · cluster ~890.
- **Secondary kw:** property development exit finance; development exit bridge; sales period finance.
- **User intent:** commercial.
- **[ANGLE]:** the "cheaper bridge that replaces your development loan once the scheme is built" page. The wedge is TIMING and COST: as a scheme reaches practical completion, dev finance is expensive and its term is ending; an exit bridge refinances it at a LOWER rate, releases some equity, and buys a longer sales window. Distinct from the dev-finance pillar (that funds the BUILD; this funds the SELL-THROUGH).
- **H2 outline (6 to 10):** (1) What development exit finance is (a bridge that repays the development loan at/near practical completion). (2) Why developers use it (dev finance is costly and time-limited; exit finance is cheaper and extends the sales period · avoids a fire-sale). (3) When you can get it (wind-and-watertight / practical completion, sometimes pre-PC). (4) The cost saving (exit rate typically LOWER than the dev-finance rate, often ~0.4% to 0.75%/mo [VERIFY-AT-WRITE]) and the equity-release element (draw out profit as units sell). (5) LTV/LTGDV on an exit facility (often up to ~70% to 75% of value [VERIFY-AT-WRITE]). (6) How it repays (unit sales or a refinance to BTL/commercial). (7) The tax point (interest through to sale, WIP/trading treatment · link `financing-a-property-development-tax` [T]). (8) FAQ.
- **[HOOK]:** a completed ~£1.8m GDV scheme still ~60% unsold as the dev-finance term expires: refinancing to an exit bridge at a lower monthly rate [VERIFY-AT-WRITE], releasing ~£150k of trapped equity and buying 12 more months to sell without discounting. Unique number.
- **Internal links:** UP to `development-finance-guide`; sideways to `bridging-loans-guide`, `mezzanine-and-jv-finance`; to `development-finance-calculator` [C]; to `financing-a-property-development-tax` [T].
- **Authority sources:** BDLA; FSMA s21; RICS (practical completion / valuation); Bridging Trends [VERIFY-AT-WRITE]; UK Finance.
- **Lead-CTA (TAX-ONLY):** developer tax/WIP review → property lead form.
- **[GUARDRAIL].**
- **FAQ stems:** What is development exit finance? · When can I get a development exit bridge? · How much cheaper is exit finance than development finance? · Can I release equity with development exit finance? · What LTV can I get on an exit bridge? · Do I need practical completion first? · How does exit finance repay? · How is the interest taxed?

---

## 9. is-bridging-loan-interest-tax-deductible · CLUSTER (TAX-INTERSECTION WEDGE)

- **Tier:** cluster · **Primary kw:** is bridging loan interest tax deductible · **Volume:** low (~0 to 20/mo, but the STRONGEST lead wedge in the cluster) · cluster ~20.
- **Secondary kw:** bridging loan tax implications; bridging loan interest tax treatment; bridging loan to pay inheritance tax (NOTE: IHT-bridging is a different estate/consumer context · disambiguate and fence, do not target the consumer-IHT angle).
- **User intent:** informational (tax) · **highest-value lead intent in the cluster.**
- **[ANGLE]:** property's TAX-authority wedge on bridging. The definitive answer to whether bridging interest is deductible, split by SITUATION: company vs individual, investment vs trade/development, residential vs commercial, capital vs revenue. This page leads MOST cleanly to the tax service. It is safe to build now (explaining tax treatment is information, not a financial promotion).
- **H2 outline (6 to 10):** (1) The short answer (it depends on purpose, structure and property type · finance costs are generally deductible where the loan is for the property business, subject to restrictions). (2) Individual landlord + RESIDENTIAL: the Section 24 restriction (finance costs relieved only as a basic-rate 20% tax reducer, not a full deduction) · summarise, link `finance-costs-section-24-complete-guide` [E] and `section-24-tax-relief-complete-guide` [E]. (3) Individual + COMMERCIAL: Section 24 does NOT apply, interest fully deductible against rental profit. (4) Company / SPV: finance costs deductible under the loan-relationship rules (no Section 24). (5) Property TRADER / developer: bridging interest is a trading finance cost, and may be capitalised into WIP vs expensed (link `financing-a-property-development-tax` [T]). (6) Capital vs revenue and the wholly-and-exclusively test (BIM45650+) · arrangement fees and incidental costs of finance (link `mortgage-arrangement-fees-deductible-landlord` [E]). (7) Rolled/retained interest and WHEN relief is given (accruals/paid). (8) Disambiguation: bridging to pay an IHT bill on an estate is a different context, not covered here · route away. (9) FAQ.
- **[HOOK]:** the same ~£10k of bridging interest treated three ways: (a) individual, residential BTL, worth only 20% relief under Section 24 (£2,000 tax reducer); (b) same individual, commercial unit, full deduction at marginal rate; (c) SPV, full corporation-tax deduction. The three-way split is the memorable point and is unique to this page.
- **Internal links:** UP to `bridging-loans-guide`; to `financing-a-property-development-tax` [T]; UP(tax) to `finance-costs-section-24-complete-guide` [E], `section-24-tax-relief-complete-guide` [E], `mortgage-interest-deductible-landlords-uk-2026` [E], `mortgage-arrangement-fees-deductible-landlord` [E], `claim-mortgage-interest-rental-property-uk-section-24` [E].
- **Authority sources:** ITTOIA 2005 s272A/s274A (Section 24); CTA 2009 loan relationships; HMRC PIM2054/PIM2058; HMRC BIM45650+, BIM35000+ (capital vs revenue), BIM46435 (incidental finance costs); gov.uk finance-cost restriction guidance.
- **Lead-CTA (TAX-ONLY · strongest wedge):** "get your bridging interest treated correctly · property tax review" → property lead form. This page is the cleanest tax lead in the cluster.
- **[GUARDRAIL].**
- **FAQ stems:** Is bridging loan interest tax deductible? · Does Section 24 apply to bridging loan interest? · Can a company deduct bridging interest in full? · Is bridging interest on a commercial property deductible? · Are bridging loan arrangement fees deductible? · Is rolled-up interest deductible before it is paid? · How is bridging interest treated for a property developer? · Is interest on a bridge to buy an investment property capital or revenue? · Can I deduct bridging interest against my rental income? · What about a bridging loan to pay inheritance tax?

---

## 10. financing-a-property-development-tax · CLUSTER (TAX-INTERSECTION WEDGE)

- **Tier:** cluster/supporting · **Primary kw:** property development finance tax · **Volume:** ~0 (pure tax wedge · high lead intent) · cluster ~0.
- **Secondary kw:** property development tax; developer finance tax treatment; capitalising interest property development; development finance tax deductible.
- **User intent:** informational (tax) · high-value lead intent.
- **[ANGLE]:** property's TAX-authority wedge on development. How the FINANCE of a development is taxed, gated by the trading-vs-investment question that property already owns. Leads cleanly to the developer tax service. Safe to build now.
- **H2 outline (6 to 10):** (1) Why trading vs investment decides everything (a developer holds trading stock/WIP; an investor holds a capital asset · the tax treatment of finance costs, profit and interest differs entirely) · summarise, link `property-development-tax-trading-vs-investment-income` [E], `are-you-a-property-investor-or-developer` [E]. (2) Development finance interest for a TRADER: a trading expense, capitalised into WIP or expensed, relieved against trading profit (no Section 24). (3) Interest for an INVESTOR holding the completed asset: finance-cost rules (and Section 24 if residential and individually held). (4) Rolled/retained interest and monitoring/arrangement fees (incidental costs of finance, BIM46435). (5) Mezzanine and JV finance tax (profit-share vs interest · thin-cap / distribution risk · link `mezzanine-and-jv-finance`). (6) The condition-D "convert-and-flip" trap (link `condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers` [E]). (7) SDLT, VAT (opted commercial, zero-rated new-build residential) and CGT-vs-income on the exit in brief. (8) FAQ.
- **[HOOK]:** a converter buying a ~£350k commercial building to flats: how the ~£40k of development-finance interest is capitalised into WIP and relieved against the trading profit on sale (a trader), versus the very different picture if HMRC treats the same person as an investor. Trading/WIP framing unique to this page (distinct from page 9's three-way individual/company/commercial split).
- **Internal links:** UP to `development-finance-guide`; sideways to `is-bridging-loan-interest-tax-deductible` [T], `mezzanine-and-jv-finance`; UP(tax) to `property-development-tax-trading-vs-investment-income` [E], `are-you-a-property-investor-or-developer` [E], `residential-property-developer-tax-uk` [E], `condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers` [E].
- **Authority sources:** HMRC BIM51105+ (property developers / WIP), BIM45650+ (interest), BIM46435 (incidental finance costs); CTA 2009 loan relationships; ITTOIA 2005 (trading profit); HMRC CG / BIM on trading-vs-investment; gov.uk.
- **Lead-CTA (TAX-ONLY · strong wedge):** developer tax review (trading status, WIP, interest, VAT) → property lead form.
- **[GUARDRAIL].**
- **FAQ stems:** How is property development finance taxed? · Is development finance interest tax deductible? · Should development interest be capitalised into WIP or expensed? · Am I a property developer or investor for tax? · How is mezzanine or JV finance taxed? · Does Section 24 apply to a property developer? · Is a convert-and-flip trading or investment? · Can I reclaim VAT on a residential development? · How is the profit on a development taxed, income or CGT?

---

## 11. mezzanine-and-jv-finance · CLUSTER (supporting)

- **Tier:** cluster/supporting · **Primary kw:** mezzanine finance · **Volume:** ~0 (topical authority + internal-link equity) · cluster ~40.
- **Secondary kw:** joint venture finance for property development; commercial real estate mezzanine finance; jv development finance; mezzanine development finance.
- **User intent:** commercial / informational.
- **[ANGLE]:** the CAPITAL-STACK page. How mezzanine debt and JV equity fill the gap between senior development debt and the developer's own equity, and the cost/control/profit-share trade-off. The wedge is the STACK (senior + mezz + equity) and the fact these are the most expensive, most-diluting layers.
- **H2 outline (6 to 10):** (1) The development capital stack (senior debt, then mezzanine, then developer equity / JV equity) and where each sits on risk and priority. (2) What mezzanine finance is (second-charge/subordinated debt topping up leverage, often to ~85% to 90% of costs [VERIFY-AT-WRITE]) and why it is expensive (higher coupon, sometimes plus a profit share). (3) What JV finance is (an equity partner funds the gap for a share of PROFIT, not interest · you give up equity/control, not just yield). (4) Mezz vs JV: cost vs dilution vs control (the core decision). (5) Intercreditor / deed of priority with the senior lender (why the senior lender must consent). (6) The tax treatment in brief (interest vs profit-share, distribution/thin-cap risk · link `financing-a-property-development-tax` [T]). (7) FAQ.
- **[HOOK]:** a scheme where senior debt covers 65% of costs and the developer has 15% equity: the 20% gap filled by mezzanine (priced high) VERSUS a JV partner taking a ~50% profit share for the same cash · show the cost-vs-dilution trade. Capital-stack worked example unique to this page.
- **Internal links:** UP to `development-finance-guide`; sideways to `development-exit-finance`; to `financing-a-property-development-tax` [T]; UP(tax) to `are-you-a-property-investor-or-developer` [E].
- **Authority sources:** BDLA; FSMA s21; RICS; UK Finance; HMRC (loan relationships / distributions, for the tax paragraph).
- **Lead-CTA (TAX-ONLY):** JV/mezz tax structuring review → property lead form.
- **[GUARDRAIL].**
- **FAQ stems:** What is mezzanine finance in property development? · What is the difference between mezzanine and JV finance? · How much of the cost can mezzanine cover? · Why is mezzanine finance expensive? · How does a development JV work? · What is a deed of priority / intercreditor agreement? · Is mezzanine interest tax deductible? · How is a JV profit share taxed? · Do I give up control with a JV?

---

## 12 to 19. The 8 bridging use-case segments · SEGMENT

All eight share this SHELL. The per-page DIFFERENTIATORS come from §B and MUST be applied strictly. Do not write the shell eight times with the use case swapped.

**Shared shell (every segment):**
- **Tier:** supporting/segment · **User intent:** commercial · **Volume:** primary near-zero (cluster volume noted per page · these exist for topical authority, internal-link equity, GEO and honest education, not head traffic).
- **Common H2 skeleton (6 to 8, then diverge on the §B axis):** (1) What bridging for [use case] is and why the standard mortgage route does not fit. (2) The [use case]-SPECIFIC mechanics [the §B axis, unique per page]. (3) LTV / cost for THIS use case [§B unique number, ranges, VERIFY-AT-WRITE]. (4) The EXIT for [use case] [unique · sale, BTL refinance, dev take-out, HMO mortgage]. (5) The risks and the fence (regulated/consumer variant excluded and routed away). (6) The tax angle in brief (interest deductibility for THIS use, link `is-bridging-loan-interest-tax-deductible` [T]). (7) FAQ.
- **Internal links (every segment):** UP to `bridging-loans-guide`; sideways to `bridging-loan-rates` and 1 to 2 sibling segments a reader would compare; to `bridging-loan-calculator` [C]; to `is-bridging-loan-interest-tax-deductible` [T]; plus the §A tax/finance page(s) for that use case.
- **Lead-CTA (every segment · TAX-ONLY):** the relevant tax angle (developer/BTL/HMO interest treatment) → property lead form. NO finance capture, NO "apply", NO broker capture.
- **Authority sources (every segment · 4 to 6, at least one use-case-specific):** FSMA s21; FCA PERG 8 + PERG 4 (fence); BDLA; Bridging Trends [VERIFY-AT-WRITE]; plus the use-case-specific source below.
- **[GUARDRAIL] (every segment).**
- **Anti-sameness enforcement:** each page's mechanics (H2.2), cost/LTV (H2.3), exit (H2.4) and worked hook MUST be the §B sector-unique ones. Reusing another segment's is a QA fail.

### 12. bridging-finance-for-land-purchase
- Primary kw: bridging loan for land purchase · cluster ~5,810 · Secondary: bridging loan to buy land; land bridging finance; bridging finance for land; bridging loan scotland/northern ireland (regional intent · note jurisdiction, do not build separate pages).
- **§B axis:** planning risk · no income · title/access. **LTV:** LOW, ~50% to 65% of land value, lower without planning [VERIFY-AT-WRITE]. **Exit:** planning gain sale, or a development-finance take-out. **[HOOK]:** ~£300k land, rolled interest, low LTV without consent (§B).
- Siblings: `bridging-finance-for-below-market-value`, `development-finance-guide`.
- Use-case source: local-authority planning / gov.uk planning permission; Land Registry (title/overage).
- FAQ stems: Can I get a bridging loan to buy land? · How much can I borrow against land without planning permission? · What is the exit on a land bridge? · Does the land need planning permission? · What are ransom strips and overage? · Is land bridging available in Scotland / Northern Ireland? · Is the interest tax deductible? · What are the risks of bridging on bare land?

### 13. bridging-finance-for-buy-to-let
- Primary kw: bridging loan for buy to let · cluster ~2,890 · Secondary: buy to let bridging loan; bridging loan to buy property; bridge to let.
- **§B axis:** BRIDGE-TO-LET, exit onto a term BTL mortgage. **LTV/cost:** bridge then refinance to ~75% LTV BTL [VERIFY-AT-WRITE]. **Exit:** the BTL mortgage redeems the bridge. **[HOOK]:** unmortgageable ~£180k flat made lettable, refinanced (§B). **Consumer fence:** exclude consumer/"accidental" BTL that is a regulated mortgage contract; investment BTL only.
- Siblings: `bridging-finance-for-refurbishment`; WAVE-SIBLING `buy-to-let-mortgages-guide` [S].
- Use-case source: UK Finance BTL data; `btl-mortgage` [E], `deposit-buy-to-let-2026-mortgage-requirements` [E], `buy-to-let-refinancing-when-does-it-make-sense` [E].
- FAQ stems: Can I use a bridging loan to buy a buy-to-let? · What is bridge-to-let? · How do I refinance a bridge onto a BTL mortgage? · Why would a property be unmortgageable? · What LTV can I get on the BTL exit? · Is it a regulated loan if it is buy-to-let? · Is bridging interest deductible against rent? · What is the 6-month rule?

### 14. bridging-finance-for-commercial-property
- Primary kw: bridging loan for commercial property · cluster ~1,940 · Secondary: commercial bridging loan; commercial property bridging finance; commercial bridging loan lenders.
- **§B axis:** valuation basis (VP vs investment) + tenant covenant. **LTV:** ~65% to 70% of VP value while vacant [VERIFY-AT-WRITE]. **Exit:** commercial term mortgage once let/income-producing. **[HOOK]:** ~£500k vacant unit on VP basis, bridged, let, refinanced (§B).
- Siblings: `commercial-mortgages-guide`, `bridging-finance-for-refurbishment`.
- Use-case source: RICS (VP vs investment valuation); `commercial-property-tax-landlords-rates-reliefs-allowances` [E], `capital-allowances-commercial-property-what-can-claim` [E].
- FAQ stems: Can I get a bridging loan on commercial property? · How is a vacant commercial building valued for a bridge? · What is the exit on a commercial bridge? · Does the tenant's covenant affect the loan? · What LTV can I get on commercial bridging? · How does a commercial bridge differ from a commercial mortgage? · Is the interest deductible? · Can I claim capital allowances on the building?

### 15. bridging-finance-for-auction-purchases
- Primary kw: bridging loan for auction purchases · cluster ~1,900 · Secondary: auction bridging loan; bridging loan for auction property; property auction finance. **ABSORBS dropped slug `auction-finance`** (fold, do not mint).
- **§B axis:** the 28-day completion clock. **LTV/cost:** speed-priced bridge [VERIFY-AT-WRITE]. **Exit:** refinance or sale. **[HOOK]:** 10% down at the hammer on a ~£150k lot, complete in 28 days or forfeit (§B).
- Siblings: `bridging-finance-for-below-market-value`, `bridging-finance-for-refurbishment`.
- Use-case source: RICS/auction-house standard conditions (28-day completion); gov.uk (auction buying); Bridging Trends [VERIFY-AT-WRITE].
- FAQ stems: How does bridging finance for auction purchases work? · How fast can a bridge complete for an auction? · What happens if I miss the 28-day completion? · Do I lose my deposit if I cannot complete? · Should I arrange finance before I bid? · Can I buy an unmortgageable auction lot with a bridge? · What is the exit? · Is the interest deductible?

### 16. bridging-finance-for-refurbishment
- Primary kw: bridging loan for refurbishment · cluster ~320 · Secondary: refurbishment bridging loan; light/heavy refurbishment bridging loan; BRRR finance. **ABSORBS dropped slug `refurbishment-and-brrr-finance`** (fold; carry the BRRR-strategy angle here).
- **§B axis:** light vs heavy refurb + BRRR refinance exit. **cost:** staged drawdowns against a schedule of works [VERIFY-AT-WRITE]. **Exit:** refinance to BTL (BRRR) or sale. **[HOOK]:** ~£25k light vs ~£90k heavy refurb on a ~£200k house, staged, then BRRR refinance (§B).
- Siblings: `bridging-finance-for-buy-to-let`, `bridging-finance-for-hmo-conversions`.
- Use-case source: gov.uk building control / permitted development; `property-development-tax-trading-vs-investment-income` [E] (flip = trading).
- FAQ stems: What is refurbishment bridging finance? · What is the difference between light and heavy refurbishment? · How do staged drawdowns work? · What is BRRR and how does the refinance work? · Does heavy refurb need planning or building control? · Can I pull my money back out after refurbishing? · Is a flip taxed as trading? · Is the interest deductible?

### 17. bridging-finance-for-below-market-value
- Primary kw: bridging loan for below market value · cluster ~320 · Secondary: below market value bridging finance; gifted equity bridging; BMV bridging.
- **§B axis:** day-one open-market-value lending + vendor-gifted deposit. **cost/LTV:** lending against OMV not price, the "no money in" scenario and its limits [VERIFY-AT-WRITE]. **Exit:** refinance/sale. **[HOOK]:** ~£200k OMV bought at ~£150k, lending against OMV, gifted-equity mechanism (§B). **Fence:** AML / back-to-back / undervalue-sale red flags stated plainly.
- Siblings: `bridging-finance-for-auction-purchases`, `bridging-finance-for-land-purchase`.
- Use-case source: RICS (market value definition); HMRC/Land Registry (genuine consideration); FCA/AML guidance (undervalue/back-to-back risk).
- FAQ stems: Can I bridge against below-market-value property? · Will a lender lend against the true value or the price I paid? · What is a vendor-gifted deposit / gifted equity? · Can I buy with no money in? · What is the 6-month rule on BMV? · What are the fraud and AML risks? · How do I evidence a genuine BMV? · Is the interest deductible?

### 18. bridging-finance-for-chain-breaks
- Primary kw: bridging loan for chain breaks · cluster ~40 · Secondary: chain break bridging loan.
- **§B axis:** INVESTMENT chain only + OWN-HOME FENCE (compliance-critical · this is the most consumer-adjacent page). **[HOOK]:** an INVESTOR bridging an investment property to keep an onward deal alive when a portfolio sale slips (§B) · never a main-residence example.
- **FENCE (lead nuance, not a footnote):** a bridge secured on your OWN HOME to break a residential chain is a REGULATED mortgage contract, outside this guide; the page states this up front and routes the consumer to an FCA-authorised mortgage adviser. Cover ONLY the business/investment chain-break.
- Siblings: `bridging-finance-for-buy-to-let`; `buy-to-let-refinancing-when-does-it-make-sense` [E].
- Use-case source: FCA PERG 4 (regulated mortgage boundary · the own-home line); FSMA s21.
- FAQ stems: What is a chain-break bridging loan? · Can I use bridging to break a property chain? · Is a chain-break bridge on my own home regulated? · Who should I speak to if it is my main residence? · Can an investor use a chain-break bridge? · What is the exit? · How quickly can it complete? · Is the interest deductible for an investor?

### 19. bridging-finance-for-hmo-conversions
- Primary kw: bridging loan for hmo conversions · cluster ~30 · Secondary: hmo bridging finance; hmo conversion finance.
- **§B axis:** Article 4 + HMO licensing + works-then-refinance. **cost:** funds purchase + conversion, staged [VERIFY-AT-WRITE]. **Exit:** specialist HMO mortgage valued on rental. **[HOOK]:** ~£250k C3 house to a 6-bed HMO, Article 4 planning + mandatory licence, bridge then HMO-mortgage exit (§B).
- Siblings: `bridging-finance-for-refurbishment`; WAVE-SIBLING `hmo-mortgages` [S].
- Use-case source: gov.uk HMO licensing + Article 4 directions; local-authority HMO standards; `hmo-vs-standard-buy-to-let-tax-comparison` [E], `hmo-tax-guide-rental-income-deductions-multi-tenant` [E], `hmo-licensing-fees-tax-deductible-uk-landlords` [E].
- FAQ stems: Can I use bridging finance to convert a house to an HMO? · What is an Article 4 direction? · Do I need planning permission for an HMO conversion? · When do I need an HMO licence? · What is the exit on an HMO conversion bridge? · How is an HMO valued for the exit mortgage? · Are HMO conversion costs and licensing tax deductible? · Is the bridging interest deductible?

---

## Publish checklist (per page, before it ships)

1. **No financial promotion of qualifying credit (FSMA s21):** no apply / quote / compare-rates / check-eligibility / lender-capture / "get funded" / broker-capture / affiliate finance CTA anywhere on the page.
2. **CTA is TAX-ONLY:** the soft property tax/accounting review via the property lead form (source `property`), mandatory consent checkbox, no finance capture fields.
3. **Consumer exclusion stated and routed:** regulated bridging (own home), regulated residential mortgage, residential 2nd charge, consumer BTL excluded and the reader routed to an FCA-authorised adviser (strongest on `bridging-finance-for-chain-breaks` and `semi-commercial-mortgages`).
4. **No em-dashes; faceless house byline; no named expert / broker.**
5. **Body is raw HTML in frontmatter; no hand-written schema; no in-body FAQ block; no second form.**
6. **Rates/figures are RANGES with the "as at <month year>" date and were verified against a live UK source at write time** (`[VERIFY-AT-WRITE]` cleared); no live rate table presented as fact.
7. **Cross-links up to the existing property TAX page(s) present, root-relative, EXACT slugs from §A;** wave-sibling [S] links flagged; NO invented slugs.
8. **`housing-development-finance` handled as cross-link/supersede-by-depth, NOT 301** (page 3).
9. **Segment pages (12 to 19): the §B axis, LTV/cost, exit and worked hook are the sector-unique ones, not a sibling's.**
10. **Dropped slugs confirmed folded:** `auction-finance` → page 15; `refurbishment-and-brrr-finance` → page 16. Neither minted as a standalone.
11. **2026/27 tax facts correct** (Section 24 residential 20% reducer; companies full deduction; developer WIP/trading treatment).
12. **Calculators (build-task, not this brief) are pure tools ending on the tax-only CTA, no finance capture.**
