# Cluster Architecture Brief · SPV / Buy-to-Let Mortgage Finance (Track B · Cluster 1)

**Cluster:** SPV / BTL mortgage finance (lenders, rates, ICR, LTV, SPV lending mechanics) · **Host site:** property (Property Tax Partners) · **Pages:** 15 (1 pillar + 14 spokes) · **Date:** 2026-07-30
**Source rows:** `expansion_research/dental_finance/btl_pages.csv`, `btl_volumes.csv`; post-recon build list `scratchpad/track_b_inventory.md` ("CLUSTER 1 SPV/BTL"); cross-link targets `expansion_research/dental_finance/briefs/TRACK_B_CROSSLINK_REFERENCE.md`; plumbing `WRITER_PLUMBING.md`.
**Audience:** UK landlords buying/refinancing rental property for a BUSINESS purpose · LtdCo/SPV-first, portfolio and professional landlords, developers. NOT owner-occupier consumers.
**Reg status:** UNREG · SPV / limited-company BTL = unregulated business lending. Bare introduction only (RAO 2001 Art 25), company/business-purpose-gated. Consumer BTL and regulated mortgage contracts are FENCED OUT of every page and every form. See §D and every per-page guardrail.

This is a SPEC handed to per-page Opus writers. A writer should never have to re-decide angle, cross-links, sources, lead routing or the compliance fence. Read the six cluster-level sections (0, A to E) first, then your page spec.

---

## 0. Quality bar (estate LOCKED rules · every page must comply)

- **Opus-only, A\* authoritative.** Genuinely the best UK page on this narrow finance topic. Never thin, never flaggable, never a rephrased broker blog. Quality IS the strategy.
- **NO em-dashes.** Use commas, parentheses, full stops, middle dots (·). This brief models the rule. Also avoid "in today's", "delve", "leverage", "landscape", "seamless", "tapestry".
- **Faceless EEAT.** The operator is NOT an accountant and NOT a mortgage broker. No named-expert claims, no "our broker says", no fabricated credentials, no first-person regulated-advice voice. Authority comes from statute/regulator citation (PRA, FCA, RAO), lender-criteria precision, worked ICR/LTV numbers and structured data, not a persona. House byline only ("Property Tax Partners Editorial Team").
- **Business-audience + lead specificity.** Every page speaks to the landlord as a business owner (SPV director, portfolio landlord, developer), never a consumer buying a home. Lead fields are business-purpose specific (see §D).
- **The de-cannib rule (Track B core, §A).** Property ALREADY owns BTL/SPV/HMO/FHL/incorporation **TAX**. This cluster owns **FINANCE MECHANICS** (lenders, rates, LTV, ICR, SPV lending, capital raising). For any topic where a tax page exists: write the FINANCE angle, summarise the tax point in 2 to 4 sentences, and CROSS-LINK UP to the existing tax page. Never duplicate the tax decision. Never 301 or collapse an existing page.
- **The compliance fence (UNREG, §D · baked into every lead-CTA + guardrail).** Company/business-purpose-gated bare introduction only: pass a name plus a business-purpose gate to a business-finance broker, no advising, negotiating, packaging or recommending a specific product (RAO Art 25 introduction, not Art 25(1)/(2) arranging). FENCE OFF consumer BTL, regulated mortgage contracts (borrower or a relative occupies), first-charge residential and second-charge residential: note the distinction and route the consumer AWAY, do not present it as something we introduce. CTA wording is subject to solicitor sign-off before conversion goes live; content publishes now, so frame the CTA softly with the TAX overlay as the property-brand wedge.
- **UK 2026/27 facts (bake in, do not drift):**
  - **ICR (interest coverage ratio, PRA SS13/16):** 125% for basic-rate individuals and for limited-company/SPV borrowers; 145% for higher/additional-rate individual borrowers (reflects the Section 24 finance-cost restriction). Verified against PRA SS13/16 norms.
  - **Stress rate:** lenders typically stress rental cover at circa 5.5% (or product rate + 2%, whichever is higher) for 2-year and variable products. 5-year-plus fixed products and pound-for-pound remortgages (no additional borrowing) are commonly stressed at a lower rate (often circa 5% or the pay rate). State as "typical, lender-specific, verify at write time".
  - **LTV / deposit:** BTL norm is 75% LTV (25% deposit); up to 80% LTV (20% deposit) available at higher rates; SPV/ltd-co lending is usually available at the same LTV bands, sometimes at a small rate premium. Market norm · flag "verify at write time".
  - **Portfolio landlord (PRA):** 4 or more mortgaged BTL properties across all lenders (defined 30 Sep 2017); triggers specialist underwriting, aggregate portfolio ICR and a portfolio questionnaire/business plan.
  - **SIC codes lenders accept for an SPV:** 68209 (other letting and operating of own or leased real estate · the primary, most widely accepted), 68201 (renting/operating of Housing Association real estate), 68320 (management of real estate on a fee/contract basis), 68100 (buying and selling of own real estate · read as trading, several lenders reject if it is the ONLY code). Verified against Companies House SIC list + lender criteria.
  - **Section 24 / finance-cost restriction:** individual landlords get a 20% basic-rate tax credit on mortgage interest, not a deduction; companies/SPVs deduct finance costs in full against profits. This is the single biggest reason SPV BTL demand exists · it is a TAX point, so summarise and cross-link UP to the property tax pages, never re-argue it.
  - **Non-resident landlord (NRL) scheme:** letting agent/tenant deducts basic-rate tax from rent unless the landlord is approved to receive rent gross (HMRC NRL scheme). Relevant to the expat page only · finance angle here, tax detail cross-linked.
- **Body = raw HTML in frontmatter** (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>`, `<aside>`, `<strong>`), NOT markdown. Match the existing property blog frontmatter shape (see WRITER_PLUMBING §1). Do NOT hand-write schema, do NOT put an FAQ section in the body, do NOT embed a second lead form (the template injects LeadForm + JSON-LD from frontmatter).
- **Placement + category.** All 15 pages: dir `Property/web/content/blog/<slug>.md` (FLAT, never a subfolder). Author `Property Tax Partners Editorial Team`. Domain `https://www.propertytaxpartners.co.uk`. **Category = `Property Finance` (slug `property-finance`)** — RESOLVED/authoritative (this is the category live in `niche.config.json` + the built `app/blog/property-finance/` route). Ignore any earlier "Landlord Finance" mention. Writers set frontmatter `category: "Property Finance"`; canonical `https://www.propertytaxpartners.co.uk/blog/property-finance/<slug>`.
- **Word count:** pillar 3,500 to 5,000 (8 to 12 H2s); spokes 1,800 to 3,000 (6 to 10 H2s). Internal links 3+ per page, root-relative, exact slugs only. 4 to 7 external authority links.

---

## A. De-cannibalisation canonical map (READ THIS FIRST · load-bearing)

**The problem.** Property already hosts deep, ranking TAX and some finance pages for almost every SPV/BTL topic here. This cluster must NOT re-argue the tax. Every page writes the FINANCE MECHANICS version, summarises the tax point in 2 to 4 sentences, and cross-links UP. Every SPV/company-finance page carries a STRONG tax cross-link to the ltd-vs-personal decision and a Section 24 page (property owns the tax, this cluster owns the finance).

**Per-page cross-link map (exact existing slugs from TRACK_B_CROSSLINK_REFERENCE.md · slug must be EXACT, category prefix auto-fixed):**

| New cluster page | Primary existing TAX/finance page to cross-link UP to | Mandatory SPV/S24 tax cross-link |
|---|---|---|
| **buy-to-let-mortgages-guide** (PILLAR) | `btl-mortgage` (Section-24 tax-relief angle) · links DOWN to `buy-to-let-limited-company-mortgage-options`, `buy-to-let-limited-company-complete-guide-uk`, `deposit-buy-to-let-2026-mortgage-requirements` | `limited-company-vs-personal-ownership-tax-comparison-2026` + `section-24-tax-relief-complete-guide` |
| spv-mortgages-explained | `spv-property-investment-special-purpose-vehicle-guide` (SPV structure/tax) | `limited-company-vs-personal-ownership-tax-comparison-2026` + `section-24-tax-relief-complete-guide` |
| buy-to-let-mortgage-lenders | `buy-to-let-limited-company-mortgage-options` (ltd-co lender options) · `btl-mortgage` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| buy-to-let-mortgage-rates (GENERAL) | `buy-to-let-limited-company-mortgage-rates-2026-market-guide` (ltd-co RATES · differentiate: this page = general personal+ltd rate DRIVERS) | `mortgage-interest-deductible-landlords-uk-2026` + `section-24-tax-relief-complete-guide` |
| let-to-buy-mortgages | `buy-to-let-refinancing-when-does-it-make-sense` (refi/tax) · `btl-mortgage` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| hmo-mortgages | `hmo-vs-standard-buy-to-let-tax-comparison` · `hmo-tax-guide-rental-income-deductions-multi-tenant` | `incorporating-an-hmo-into-a-limited-company-pros-and-cons` |
| holiday-let-mortgages | `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` · `how-much-tax-holiday-let-property-uk` | `end-of-the-furnished-holiday-letting-regime` + `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` |
| expat-non-resident-landlord-mortgages | `returning-to-uk-after-non-residence-property-portfolio` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| self-employed-buy-to-let-mortgage | `btl-mortgage` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| first-time-landlord-mortgage | `buy-to-let-limited-company-complete-guide-uk` · `should-i-incorporate-buy-to-let-portfolio-2026` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| day-one-remortgage-limited-company | `how-to-transfer-property-into-limited-company-uk` (the incorporation-finance SECTION lives here) | `section-162-incorporation-relief-property-landlords` + `section-24-remortgaging-btl-property-tax-implications` |
| spv-mortgage-no-income-newly-formed | `spv-property-investment-special-purpose-vehicle-guide` · `how-to-set-up-property-investment-company-uk-guide` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| sic-code-for-an-spv-property-company | `spv-property-investment-special-purpose-vehicle-guide` · `how-to-set-up-property-investment-company-uk-guide` | `limited-company-vs-personal-ownership-tax-comparison-2026` |
| portfolio-landlord-mortgages-guide | `portfolio-landlord-tax-planning-strategy-guide` (TAX · differentiate: this page = lender stress-test/aggregation) · `how-to-scale-buy-to-let-portfolio-1-to-10-properties` | `incorporating-property-portfolio-uk-2026` |
| capital-raising-btl-remortgage-equity-release (NEW) | `buy-to-let-refinancing-when-does-it-make-sense` · `section-24-remortgaging-btl-property-tax-implications` | `mortgage-interest-deductible-landlords-uk-2026` + `mortgage-arrangement-fees-deductible-landlord` |

**DROPPED pages (do NOT mint · existing property pages already own them · cross-link only, never 301/collapse):**

1. **ltd-co-BTL pillar** (would have been `limited-company-buy-to-let-mortgages-guide`, CSV row `pillar`, 2,400/mo): DROPPED. Property already owns this with three ranking pages: `buy-to-let-limited-company-mortgage-options`, `buy-to-let-limited-company-mortgage-rates-2026-market-guide` (ranks circa pos-5), and `buy-to-let-limited-company-complete-guide-uk`. The new general `buy-to-let-mortgages-guide` pillar links DOWN to these; it does NOT compete with them. Minting a second ltd-co pillar would cannibalise a page that already ranks.
2. **buy-to-let-mortgage-deposit-and-ltv** (CSV row, 0/mo): DROPPED. Owned by `deposit-buy-to-let-2026-mortgage-requirements`. Deposit/LTV education is cross-linked from the pillar and the rates page, not re-hosted.

**SECTION task (not a page in this cluster):** "financing the incorporation / remortgaging into your SPV" is a SECTION added later to the existing `how-to-transfer-property-into-limited-company-uk` page (owned by whoever edits property incorporation content). The pillar and `day-one-remortgage-limited-company` just cross-link to it. Do NOT mint a standalone `transfer-property-to-limited-company` finance page (cannibalises property's ranking incorporation/SDLT pages).

**Differentiation call-outs (adjacent existing page · keep the new page on a distinct axis):**
- `buy-to-let-mortgage-rates` is GENERAL BTL rate DRIVERS (personal + ltd, ranges not a live table). The existing `buy-to-let-limited-company-mortgage-rates-2026-market-guide` is LTD-CO-specific · cross-link, do not overlap.
- `portfolio-landlord-mortgages-guide` is the mortgage/stress-test angle. `portfolio-landlord-tax-planning-strategy-guide` is TAX · cross-link, do not overlap.
- `spv-mortgages-explained` is SPV *for mortgage purposes* (which SIC codes lenders accept, newly-formed lending). `spv-property-investment-special-purpose-vehicle-guide` is STRUCTURE/TAX · cross-link, do not overlap.

---

## B. Anti-sameness matrix · the 6 criteria long-tail pages

These six pages all answer "can I get a BTL mortgage when [specific applicant problem]". They are the single biggest cross-post-sameness risk in this cluster (all "lender criteria for an edge case"). Each is built around its ONE distinguishing lender-criteria objection and its OWN worked hook. No two share an applicant, a number, or an objection. Reusing another page's example is a QA failure.

| Page | The ONE distinguishing lender-criteria objection (the wedge) | Unique worked hook (its numbers only) |
|---|---|---|
| **spv-mortgage-no-income-newly-formed** | "No trading history and no minimum personal income" · a brand-new SPV incorporated this month with zero accounts, and a director with little or no personal earned income. Answer: SPV BTL lending is underwritten on the RENTAL income and the ICR, not the company's or director's income · many SPV lenders impose no minimum director income (some still want circa £25k). | A newly-incorporated SPV (0 days trading) buys a £200,000 flat renting at £1,100/mo. At 75% LTV the £150,000 loan stress-tested at 5.5% / 125% ICR needs circa £859/mo rent · it clears. Director earns £0 salary from the SPV · the lender lends on the ICR, not the director's income. |
| **sic-code-for-an-spv-property-company** | "Wrong or missing SIC code = declined at DIP" · the company is registered under a code lenders do not accept for SPV BTL (e.g. 68320 or 68100 only), so the case is refused before valuation. | A company registered with SIC 68100 only (buying and selling of own real estate · read as trading) is declined by an SPV lender. Refiling the confirmation statement to make 68209 the primary code (adding 68201/68320) makes it acceptable · £0 cost, avoids a hard decline. |
| **day-one-remortgage-limited-company** | "The standard 6-month ownership rule" · most lenders will not remortgage inside 6 months of purchase, which blocks a landlord who bought with cash/bridging or transferred a property into an SPV and wants to pull the deposit back out on day one. | A landlord transfers a £250,000 rental into an SPV (a sale to the company, triggering the incorporation-relief/SDLT tax point · cross-link, do not re-argue). A day-one remortgage lender advances 75% (£187,500) immediately to release the funds, waiving the 6-month rule. |
| **self-employed-buy-to-let-mortgage** | "Income evidence for the self-employed" · only 1 year's accounts, or income taken as retained profit/dividends, so a high-street affordability model fails. Answer: BTL is rental-income-led, and self-employed-friendly lenders accept 1 year's SA302 or use the latest year rather than a 2-year average. | A sole trader with one year of accounts (SA302 showing £28,000) buys a £180,000 BTL. The lender ignores the thin trading history because the £1,000/mo rent clears the 125% ICR at 5.5%, and accepts the single year's SA302 for the identity/affordability floor. |
| **first-time-landlord-mortgage** | "No prior landlord experience" · many lenders require the applicant to already be a residential homeowner and/or a minimum income (often circa £25k), and price first-time landlords slightly higher or cap LTV. | A first-time landlord who owns their own home and earns £30,000 employed buys a £160,000 BTL at 75% LTV. The lender accepts them because they are an existing homeowner and uses top-slicing (surplus personal income) where the rent alone is marginal on ICR. |
| **expat-non-resident-landlord-mortgages** | "UK residency and currency" · the applicant lives and is paid abroad, so most mainstream BTL lenders decline; a smaller expat/non-resident panel lends, usually at higher deposit and via an SPV, and the NRL scheme governs the tax on rent. Consumer/expat RESIDENTIAL is regulated · fence it. | A UK expat in Dubai buys a £220,000 BTL through an SPV at 70% LTV (30% deposit, £66,000). The expat panel lends without requiring GBP income; rent is received under the HMRC NRL scheme (cross-link the tax). This is INVESTOR framing only · an expat buying a home for a relative is a regulated contract we do not introduce. |

**Enforcement.** The six anchors that keep these apart: no-min-income + newly-formed (spv-no-income), SIC-code decline (sic-code), the 6-month-rule waiver (day-one), the 1-year-SA302/self-employed income floor (self-employed), the homeowner-requirement + top-slicing (first-time), the residency/currency + NRL + SPV + consumer fence (expat). Two of these pages sharing a worked applicant, a loan figure, or an objection is a QA fail.

---

## C. Shared authority-source list (draw 4 to 6 per page from here, plus page-specific)

Cite specific regulator statements, statute and government sources, not "the rules" generically. UK primary only.

**Regulatory perimeter / the consumer fence (use to DEFINE what we do and do not introduce)**
- **FSMA 2000 s.21** (financial promotion restriction · legislation.gov.uk) · why the CTA is a bare introduction, not a promotion of a specific product.
- **RAO 2001 (Financial Services and Markets Act 2000 (Regulated Activities) Order 2001):** Art 25 (arranging deals in investments / making arrangements · and the introduction carve-out), Art 61 (regulated mortgage contracts · defines the CONSUMER perimeter we stay outside), Art 60C (exempt/business buy-to-let and the distinction from a regulated mortgage contract).
- **FCA Handbook PERG 4** (guidance on regulated activities connected to mortgages · PERG 4.4 on regulated mortgage contracts, PERG 4.10A on buy-to-let and the consumer/business distinction) · the authority for the fence.
- **FCA MCOB** (Mortgages and Home Finance: Conduct of Business · referenced only to say consumer/regulated BTL is out of scope, not something we introduce).

**BTL underwriting / ICR / stress (the finance mechanics spine)**
- **PRA Supervisory Statement SS13/16** "Underwriting standards for buy-to-let mortgage contracts" (Bank of England / PRA · ICR, interest-rate affordability stress, the portfolio-landlord specialist-underwriting requirement). This is the anchor source for every ICR/stress/LTV/portfolio claim.
- **PRA PS/SS on portfolio landlords** (4+ mortgaged BTL definition, aggregate portfolio ICR, portfolio questionnaire · from 30 Sep 2017).
- **UK Finance** (BTL lending statistics, mortgage lending trends · sector context, not a rate quote).

**SPV / company / SIC (the SPV-lending spine)**
- **Companies House** SIC condensed list (68209 / 68201 / 68320 / 68100 · gov.uk "Standard industrial classification of economic activities (SIC)") and the confirmation-statement/SIC-amendment guidance.
- **Companies House** guidance on incorporating a company and PSC/registered office (for the SPV set-up finance context).

**Tax overlay (summarise + cross-link UP · do NOT re-derive)**
- **HMRC Property Income Manual (PIM)** PIM2050+ (deductible finance costs), PIM4100+ (FHL, historic · holiday-let page), and the Section 24 finance-cost restriction (ITTOIA 2005 s.272A / the tax-reducer mechanism) · cite the manual, then cross-link the property tax page for the working.
- **HMRC** Non-resident landlords scheme guidance (gov.uk NRL1 / INTM/PIM · expat page only).
- **HMRC** incorporation relief (TCGA 1992 s.162 · day-one-remortgage/incorporation-finance context · cross-link the property tax page, do not re-argue).
- **legislation.gov.uk** for any statute cited above.

---

## D. Lead-routing summary (UNREG · company/business-purpose-gated bare introduction)

**Buyer side (who we introduce the lead to):** a business-purpose SPV/BTL/portfolio **finance broker** (a whole-of-market or specialist BTL broker who handles limited-company and portfolio lending). Leads are **shareable with the Cluster-2 commercial/bridging/development broker** (same business-finance introduction relationship), so the two clusters can pool one broker relationship. **NOT a regulated mortgage adviser for consumers**, and **NOT a general accountant** for the finance side (the accounting/tax side is the property brand's own service · see the wedge below).

**Form:** the property site's EXISTING lead form (lead source `property`). No code change and no new role labels are needed now · the existing `role_options` already cover the business-purpose segments:
- Individual landlord (1 to 3 properties) · Portfolio owner (4 to 10) · Large portfolio (10+) · Property developer · Other.
Segment/qualifier fields to surface (reuse existing fields, no schema change): is the borrower an **SPV / limited company** or personal? · **portfolio size** (feeds the 4+ PRA portfolio flag) · **developer / trading** vs investment · property type where relevant (HMO / holiday let). The consent checkbox (mandatory data-sharing consent, estate standard) is REQUIRED on every form.

**The CTA framing (compliance-aware · wording pending solicitor sign-off, content publishes now):** a soft, business-purpose landlord-finance introduction, LED by the tax overlay as the property-brand wedge. Pattern: "We can review the SPV and tax side of your purchase (Section 24, incorporation, deposit efficiency) and, if useful, introduce you to a business-finance broker who handles limited-company and portfolio buy-to-let lending." This is a bare introduction (a name plus a business-purpose gate), NOT advising, negotiating, packaging or recommending a specific product or lender.

**The consumer fence (every form, every page):** do NOT invite, capture or introduce:
- consumer buy-to-let or a regulated mortgage contract (the borrower, or a person related to the borrower, occupies or will occupy the property · RAO Art 61 / PERG 4.10A);
- first-charge residential or second-charge residential home finance of any kind.
Where a page's topic touches a consumer scenario (let-to-buy onward residential, a first-time landlord who is really buying for a relative, an expat buying a home abroad), NOTE the distinction in the body and route that reader AWAY ("this is a regulated mortgage and not something we introduce · speak to an FCA-authorised mortgage adviser"). Do not present it as a service we offer.

**Guardrail on every form:** mandatory consent checkbox · no consumer/regulated capture · do NOT surface any insurance cross-sell (buildings/landlord/protection insurance is IDD-regulated, out of scope). Introduce only to the business-finance broker; the tax/accounting side is the property brand's own service.

---

## E. Internal cross-link graph (root-relative, property site)

Every link is root-relative (`/blog/...`), exact slug, category prefix auto-fixed by `fix_links`. `[NEW]` = a page in this cluster; `(existing)` = a live property page from §A; `(calc)` = a Track B calculator to build.

```
                         [PILLAR]  buy-to-let-mortgages-guide  [NEW]
                          (how BTL mortgages work · ICR · LTV · lenders · personal vs company finance)
             │ links DOWN to existing ltd-co pages          │ links DOWN to all spokes
             ▼                                               ▼
   (existing) buy-to-let-limited-company-mortgage-options            spv-mortgages-explained [NEW]
   (existing) buy-to-let-limited-company-complete-guide-uk           buy-to-let-mortgage-lenders [NEW]
   (existing) buy-to-let-limited-company-mortgage-rates-2026-market-guide   buy-to-let-mortgage-rates [NEW]
   (existing) deposit-buy-to-let-2026-mortgage-requirements          let-to-buy-mortgages [NEW]
                                                                      hmo-mortgages [NEW]
   TAX OVERLAY (every SPV/company page links UP to BOTH):            holiday-let-mortgages [NEW]
        ▲  limited-company-vs-personal-ownership-tax-comparison-2026 expat-non-resident-landlord-mortgages [NEW]
        ▲  section-24-tax-relief-complete-guide                      self-employed-buy-to-let-mortgage [NEW]
        │  (property owns the tax · this cluster owns the finance)   first-time-landlord-mortgage [NEW]
        │                                                            day-one-remortgage-limited-company [NEW]
   ┌────┴──────── every SPV/company page ─────────────┐             spv-mortgage-no-income-newly-formed [NEW]
   spv-mortgages-explained · day-one-remortgage ·                   sic-code-for-an-spv-property-company [NEW]
   spv-no-income · sic-code · portfolio · pillar                    portfolio-landlord-mortgages-guide [NEW]
                                                                     capital-raising-btl-remortgage-equity-release [NEW]
   SIBLING CLUSTERS (the 6 criteria pages, §B, link sideways to 1 to 2 peers):
     spv-no-income ↔ sic-code ↔ day-one-remortgage   (all SPV-lending criteria)
     self-employed ↔ first-time-landlord             (personal-income criteria)
     expat  → spv-mortgages-explained + portfolio     (non-resident investor)
   SECTION target (cross-link only, not a page here):
     (existing) how-to-transfer-property-into-limited-company-uk  ← pillar + day-one-remortgage link here
   ┌─────────────── every page links to BOTH calculators ───────────────┐
              buy-to-let-mortgage-calculator (calc) · buy-to-let-rental-stress-test-calculator (calc · ICR)
```

Rules: (1) every SPV/company-finance page links UP to `limited-company-vs-personal-ownership-tax-comparison-2026` AND a Section 24 page (the mandatory tax cross-link, §A). (2) every page links to its §A primary existing page (finance/tax mechanics owner). (3) every page links to BOTH calculators (`buy-to-let-mortgage-calculator`, `buy-to-let-rental-stress-test-calculator`). (4) the six criteria pages (§B) link sideways to their 1 to 2 named peers only. (5) the pillar links DOWN to the four existing ltd-co/deposit pages and to all 14 spokes; spokes link UP to the pillar. (6) the pillar and `day-one-remortgage-limited-company` link to `how-to-transfer-property-into-limited-company-uk` (the incorporation-finance SECTION).

---

# PER-PAGE SPECS

Legend: **[UNIQUE ANGLE]** is the wedge · **[HOOK]** is the one worked example only this page uses · guardrail line applies verbatim intent: *UNREG business lending · company/business-purpose-gated bare introduction to a business-finance broker (RAO Art 25 introduction, not arranging) · consumer BTL / regulated mortgage contracts / residential FENCED OUT and routed away · CTA wording pending solicitor sign-off · no insurance cross-sell · tax/accounting is the property brand's own service.* Every page carries the mandatory SPV/S24 tax cross-link per §A where it is an SPV/company page.

---

## 1. buy-to-let-mortgages-guide  ·  PILLAR

- **Tier:** pillar · **Primary kw:** buy to let mortgage / buy to let mortgages · **Volume:** 33,100/mo (head term)
- **Secondary kw:** how buy to let mortgages work; buy to let mortgage explained; personal vs company buy to let mortgage; buy to let mortgage requirements; interest only buy to let mortgage
- **User intent:** informational to commercial (head-term hub)
- **UNIQUE ANGLE:** the plain-English FINANCE-MECHANICS hub · how a BTL mortgage actually works (ICR, LTV, interest-only, stress testing, lender panels, personal vs company/SPV finance), for the landlord deciding how to fund a purchase. It is NOT the tax page (that is `btl-mortgage`) and NOT the ltd-co pillar (property owns that). It summarises the tax in a few sentences and links UP; it links DOWN to the existing ltd-co pages and to every spoke.
- **H2 outline (8 to 12):** (1) What a buy-to-let mortgage is and how it differs from a residential mortgage (business lending, interest-only norm, rental-income-led). (2) How lenders decide how much you can borrow · ICR and the stress test (125% basic/ltd-co, 145% higher-rate, circa 5.5% stress · link the ICR calculator). (3) Deposit and LTV (75% norm, up to 80% · summarise, link `deposit-buy-to-let-2026-mortgage-requirements`). (4) Personal name vs limited company/SPV finance (the Section 24 driver · summarise in 3 to 4 sentences, cross-link the tax pages, link DOWN to the ltd-co pages). (5) Interest-only vs repayment and why landlords use interest-only. (6) The lender landscape · high street vs specialist vs SPV lenders (link `buy-to-let-mortgage-lenders`). (7) Rates and what drives them (link `buy-to-let-mortgage-rates`). (8) Fees, valuations and the application journey. (9) Special cases in one paragraph each with links (HMO, holiday let, portfolio, expat, first-time, self-employed, day-one remortgage, capital raising). (10) When a business-finance broker helps and how the tax and finance sides fit together. (11) FAQ.
- **[HOOK]:** a £200,000 BTL renting at £1,000/mo, 75% LTV (£150,000 loan). At a 5.5% stress and 125% ICR the rent must cover circa £859/mo · it clears, so the £150,000 is affordable. Show the SAME property failing a 145% higher-rate personal test (needs circa £997/mo) and clearing again inside an SPV at 125% · the ICR gap is the reason SPV BTL exists.
- **Internal links:** DOWN to `buy-to-let-limited-company-mortgage-options`, `buy-to-let-limited-company-complete-guide-uk`, `buy-to-let-limited-company-mortgage-rates-2026-market-guide`, `deposit-buy-to-let-2026-mortgage-requirements`, `how-to-transfer-property-into-limited-company-uk` (incorporation-finance section); to all spokes; to `buy-to-let-mortgage-calculator` + `buy-to-let-rental-stress-test-calculator`.
- **Cross-links (de-cannib):** `btl-mortgage` owns the Section-24 tax-relief angle · `limited-company-vs-personal-ownership-tax-comparison-2026` + `section-24-tax-relief-complete-guide` own the tax decision. This pillar defers the tax and owns the finance mechanics.
- **Authority sources:** PRA SS13/16 (ICR/stress/LTV); FCA PERG 4.10A + RAO Art 61 (BTL business vs regulated perimeter); UK Finance (BTL lending context); HMRC PIM2050+ / Section 24 (finance-cost tax, summarised); FSMA 2000 s.21.
- **Lead-CTA:** soft business-purpose landlord-finance introduction, tax-led wedge (review SPV/tax side, introduce a business-finance broker) · property lead form, source `property`, role_options segment · consent mandatory.
- **Guardrail:** UNREG · bare introduction, not arranging · consumer/regulated BTL fenced and routed away · no insurance · tax is the brand's own service.
- **FAQ stems:** How does a buy-to-let mortgage work? · How much can I borrow on a BTL mortgage? · What is ICR and the stress test? · How much deposit do I need for a BTL? · Should I buy in my own name or a limited company? · Are BTL mortgages interest-only? · What rates apply to buy-to-let? · Can a first-time landlord get a BTL mortgage? · What is the difference between a BTL and a residential mortgage? · Do I need a broker for a BTL mortgage? · What fees are involved? · Can I get a BTL mortgage through an SPV?

---

## 2. spv-mortgages-explained  ·  SPOKE (SPV-lending)

- **Tier:** cluster · **Primary kw:** spv mortgage · **Volume:** 320/mo (cluster 1,300)
- **Secondary kw:** spv buy to let mortgage; spv company mortgage; spv for property mortgage; special purpose vehicle mortgage
- **User intent:** commercial
- **UNIQUE ANGLE:** SPV *for mortgage purposes* · what lenders mean by an SPV, why they prefer a clean single-purpose company, which SIC codes they accept, newly-formed vs trading-company lending, and personal guarantees. NOT the SPV structure/tax page (property owns that · cross-link).
- **H2 outline (6 to 10):** (1) What an SPV is to a mortgage lender (a clean, single-purpose property-holding company · why lenders prefer it over a trading company). (2) SIC codes lenders accept (68209 primary · link `sic-code-for-an-spv-property-company`). (3) Newly-formed vs trading company lending (link `spv-mortgage-no-income-newly-formed`). (4) Personal guarantees and director/shareholder requirements. (5) SPV rates and LTV vs personal (small premium, same 75% bands · link `buy-to-let-mortgage-rates`). (6) How SPV lending interacts with the tax decision (Section 24 · 3 to 4 sentences, cross-link). (7) Setting up an SPV to be lender-ready. (8) FAQ.
- **[HOOK]:** a director forms a clean SPV (SIC 68209, no trading, no debt) to buy a £180,000 flat renting at £950/mo. At 75% LTV (£135,000) and 125% ICR / 5.5% stress the rent needs to cover circa £773/mo · it clears, and the lender lends to the day-old company because it underwrites the property and a personal guarantee, not company accounts.
- **Internal links:** UP to pillar; to `sic-code-for-an-spv-property-company`, `spv-mortgage-no-income-newly-formed`, `buy-to-let-mortgage-rates`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `spv-property-investment-special-purpose-vehicle-guide` (structure/tax) · `limited-company-vs-personal-ownership-tax-comparison-2026` + `section-24-tax-relief-complete-guide`.
- **Authority sources:** Companies House SIC list (68209/68201/68320/68100); PRA SS13/16 (ICR/LTV); RAO Art 25 (introduction) + Art 60C (business BTL); HMRC Section 24 (summarised); FSMA s.21.
- **Lead-CTA:** business-purpose SPV-finance introduction, tax-led wedge · consent mandatory.
- **Guardrail:** UNREG · bare introduction · consumer/regulated fenced · no insurance · tax = brand service.
- **FAQ stems:** What is an SPV mortgage? · Which SIC code do lenders want for an SPV? · Can a brand-new SPV get a mortgage? · Do SPV mortgages need a personal guarantee? · Are SPV mortgage rates higher than personal? · Do I need trading accounts to get an SPV mortgage? · Should the SPV be a subsidiary or standalone? · How do I set up an SPV that lenders will accept?

---

## 3. buy-to-let-mortgage-lenders  ·  SPOKE (biggest volume)

- **Tier:** cluster · **Primary kw:** buy to let mortgage lenders · **Volume:** 33,100/mo (the highest informational term in the cluster)
- **Secondary kw:** spv mortgage lenders; limited company buy to let lenders; portfolio mortgage lenders; specialist buy to let lenders; who lends on buy to let
- **User intent:** commercial (directory/education · factual list, NOT a recommendation of a specific product · s.21)
- **UNIQUE ANGLE:** the lender-landscape education page · the TYPES of BTL lender and how their criteria differ (high street, specialist/challenger, SPV/ltd-co, portfolio), a criteria-comparison framework (not a product table), and how to know which category fits your case. Factual and educational · it does NOT recommend a named product.
- **H2 outline (6 to 10):** (1) The three tiers of BTL lender (high street, specialist/challenger, private/portfolio) and who each suits. (2) Which lenders lend to SPVs/limited companies vs personal only. (3) The criteria that vary between lenders (ICR band, min income, SIC codes, portfolio limits, age, first-time-landlord stance) as a comparison FRAMEWORK. (4) Portfolio and professional-landlord lenders (link `portfolio-landlord-mortgages-guide`). (5) Specialist edge-case lenders (expat, self-employed, newly-formed SPV · link those spokes). (6) How a broker accesses lenders you cannot go to directly. (7) FAQ.
- **[HOOK]:** a criteria-comparison worked example · the SAME £160,000 SPV purchase renting at £850/mo is declined by a high-street lender (no SPV lending, wants 2 years' accounts) and accepted by a specialist SPV lender (day-one company, 125% ICR at 5.5%, £120,000 loan at 75% LTV clears on circa £687/mo needed). The point is that "declined" often means "wrong lender tier", not "unaffordable".
- **Internal links:** UP to pillar; to `portfolio-landlord-mortgages-guide`, `expat-non-resident-landlord-mortgages`, `self-employed-buy-to-let-mortgage`, `spv-mortgage-no-income-newly-formed`; to both calculators.
- **Cross-links (de-cannib):** `buy-to-let-limited-company-mortgage-options` (ltd-co lender options) · `btl-mortgage` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** PRA SS13/16 (why criteria differ · ICR/stress); FSMA s.21 (why this is education, not a promotion); FCA PERG 4.10A (business vs regulated lender activity); UK Finance (lender market context).
- **Lead-CTA:** business-purpose introduction to a whole-of-market business-finance broker (softest CTA · this page is mostly authority/traffic) · consent mandatory.
- **Guardrail:** UNREG · educational lender categories, no named-product recommendation · consumer/regulated fenced · no insurance.
- **FAQ stems:** Who lends on buy-to-let mortgages? · Which lenders accept limited-company/SPV borrowers? · What is the difference between high-street and specialist BTL lenders? · Why was I declined by one lender but not another? · Which lenders take portfolio landlords? · Do I need a broker to access specialist lenders? · Which lenders take first-time landlords? · Which lenders accept expat or self-employed applicants?

---

## 4. buy-to-let-mortgage-rates  ·  SPOKE (general rate drivers)

- **Tier:** cluster · **Primary kw:** buy to let mortgage rates · **Volume:** 9,900/mo (cluster 31,000)
- **Secondary kw:** buy to let fixed mortgage rates; buy to let mortgage interest rate; best buy to let mortgages; what drives buy to let rates; 5 year fixed buy to let
- **User intent:** commercial
- **UNIQUE ANGLE:** GENERAL BTL rate DRIVERS (personal AND limited company), explained as ranges and factors, NOT a live rate table (freshness burden · deliberately avoided). Why a rate is what it is · LTV band, fix length, personal vs company, HMO/holiday-let premium, product/arrangement fee trade-off. Differentiate from and cross-link the LTD-CO-specific rates page.
- **H2 outline (6 to 10):** (1) What actually drives a BTL rate (LTV band, fix length, product fee, borrower type). (2) Personal vs limited-company/SPV rates (why SPV is often a small premium · cross-link the ltd-co rates page). (3) The fee-vs-rate trade-off (how a high-fee low-rate product can beat a low-fee product on a small loan · worked). (4) Why HMO and holiday-let rates sit higher (link those spokes). (5) How the ICR/stress interacts with the rate you are offered (a lower rate can raise how much you can borrow · link the ICR calculator). (6) Tax note · finance costs and Section 24 (summarise, cross-link). (7) FAQ.
- **[HOOK]:** the fee-vs-rate trade-off on a £150,000 loan · a 4.5% rate with a £999 fee vs a 5.2% rate with no fee. Over a 2-year fix the higher-fee product costs circa £13,500 + £999 interest+fee vs circa £15,600 · show the crossover and why loan size decides which wins. (Round illustrative numbers · flag "rates change, verify current market at write time".)
- **Internal links:** UP to pillar; to `hmo-mortgages`, `holiday-let-mortgages`, `buy-to-let-mortgage-lenders`; to both calculators.
- **Cross-links (de-cannib):** `buy-to-let-limited-company-mortgage-rates-2026-market-guide` (LTD-CO rates · this page = general drivers) · `mortgage-interest-deductible-landlords-uk-2026` + `section-24-tax-relief-complete-guide`.
- **Authority sources:** PRA SS13/16 (stress/ICR effect on borrowing); Bank of England base-rate context (for rate-driver framing · parent path); UK Finance (rate/market context); HMRC PIM2050+ / Section 24 (summarised); FSMA s.21.
- **Lead-CTA:** soft business-purpose introduction (this page is authority/traffic-led) · consent mandatory.
- **Guardrail:** UNREG · ranges/drivers not a live product table · no named-product recommendation · consumer/regulated fenced · no insurance.
- **FAQ stems:** What drives buy-to-let mortgage rates? · Are limited-company BTL rates higher than personal? · Should I pick a low rate with a high fee or the reverse? · Why are HMO and holiday-let rates higher? · Does a lower rate let me borrow more? · Are BTL rates fixed or variable? · How does Section 24 affect the cost of borrowing? · What is a typical BTL rate right now? (answer as a range with a verify caveat)

---

## 5. let-to-buy-mortgages  ·  SPOKE (consumer-adjacent · FENCE)

- **Tier:** cluster · **Primary kw:** let to buy mortgage · **Volume:** 1,900/mo
- **Secondary kw:** let to buy; let to buy vs buy to let; let to buy mortgage rules
- **User intent:** commercial
- **UNIQUE ANGLE:** the two-mortgage let-to-buy mechanism (BTL remortgage the current home to release deposit, plus a new residential mortgage on the onward home) for an owner-occupier becoming an accidental landlord. THE FENCE PAGE: the onward residential mortgage is a REGULATED contract we do NOT introduce; only the BTL leg on the retained property is a business-purpose introduction.
- **H2 outline (6 to 10):** (1) What let-to-buy is (keep and let your current home, buy a new one). (2) The two moving parts (a BTL remortgage on the old home + a residential purchase mortgage on the new home). (3) THE REGULATED/UNREG split · the residential leg is a regulated mortgage we do not arrange or introduce, the retained-property BTL leg is business lending (route the consumer to an FCA adviser for the residential side). (4) Releasing the deposit from the retained property (LTV/ICR on the BTL leg · link the ICR calculator). (5) The consent-to-let vs full let-to-buy remortgage distinction. (6) Tax note · this often becomes a first rental property and later an incorporation candidate (cross-link). (7) FAQ.
- **[HOOK]:** a homeowner with a £300,000 home (£150,000 mortgage) lets it and buys a £400,000 onward home. The BTL remortgage releases equity to circa 75% (£225,000, freeing circa £75,000 for the new deposit) if the £1,300/mo rent clears the 125% ICR at 5.5% (needs circa £1,289/mo). The onward £400,000 residential purchase is a regulated contract we do not touch.
- **Internal links:** UP to pillar; to `capital-raising-btl-remortgage-equity-release`; to both calculators.
- **Cross-links (de-cannib):** `buy-to-let-refinancing-when-does-it-make-sense` (refi/tax) · `btl-mortgage` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** RAO Art 61 + FCA PERG 4.4/4.10A (the regulated residential leg = the fence); PRA SS13/16 (ICR on the BTL leg); HMRC PIM (the retained property becoming a let); FSMA s.21.
- **Lead-CTA:** business-purpose introduction for the BTL/retained-property leg ONLY · explicitly route the onward-residential reader to an FCA-authorised adviser · consent mandatory.
- **Guardrail:** UNREG for the BTL leg only · the residential leg is a REGULATED contract, fenced and routed away · no insurance.
- **FAQ stems:** What is a let-to-buy mortgage? · How is let-to-buy different from buy-to-let? · Do I need two mortgages for let-to-buy? · Can I release a deposit from my current home? · Is the mortgage on my new home regulated? · Do I need consent to let instead? · What are the tax implications of letting my old home? · Can I let-to-buy into a limited company?

---

## 6. hmo-mortgages  ·  SPOKE

- **Tier:** cluster · **Primary kw:** hmo mortgage · **Volume:** 880/mo (cluster 990)
- **Secondary kw:** hmo buy to let mortgage; hmo limited company mortgage; hmo mortgage lenders; large hmo mortgage
- **User intent:** commercial
- **UNIQUE ANGLE:** HMO *mortgage* mechanics · why HMO lending is a specialist product (higher rents but valuation on investment value or bricks-and-mortar, licensing and Article 4 conditions, room-count thresholds, experience requirements). HMO *tax* stays on property (cross-link).
- **H2 outline (6 to 10):** (1) Why HMO mortgages are a specialist product (higher yield, more lender caution). (2) HMO valuation basis (bricks-and-mortar vs investment/commercial value · why big HMOs value higher and which lenders do which). (3) Licensing, Article 4 and planning conditions lenders check. (4) Landlord-experience requirements (many HMO lenders want prior BTL/HMO experience · cross-link `first-time-landlord-mortgage` for the no-experience route). (5) Limited-company/SPV HMO lending and rates (small premium · cross-link). (6) ICR on HMO rent (link the ICR calculator). (7) Tax note · HMO income/deductions and incorporation (cross-link). (8) FAQ.
- **[HOOK]:** a 6-bed licensed HMO renting at £3,000/mo (£500/room). A specialist lends at 75% LTV on a £400,000 valuation (£300,000 loan) because the £3,000 rent clears the 125% SPV ICR at 5.5% (needs circa £1,719/mo) with wide headroom · the same building as a single-family let at £1,400/mo would fail. The room-count yield is the whole HMO case.
- **Internal links:** UP to pillar; to `first-time-landlord-mortgage`, `buy-to-let-mortgage-lenders`; to both calculators.
- **Cross-links (de-cannib):** `hmo-vs-standard-buy-to-let-tax-comparison` · `hmo-tax-guide-rental-income-deductions-multi-tenant` · `incorporating-an-hmo-into-a-limited-company-pros-and-cons`.
- **Authority sources:** PRA SS13/16 (ICR/stress); relevant HMO licensing framework (Housing Act 2004 mandatory-licensing context · gov.uk HMO licensing); FCA PERG 4.10A (business BTL perimeter); HMRC PIM (HMO income, summarised); FSMA s.21.
- **Lead-CTA:** business-purpose HMO-finance introduction, tax-led wedge · consent mandatory.
- **Guardrail:** UNREG · bare introduction · consumer/regulated fenced · no insurance · tax = brand service.
- **FAQ stems:** What is an HMO mortgage? · How is an HMO valued for a mortgage? · Do I need experience to get an HMO mortgage? · Does the HMO licence affect the mortgage? · What is Article 4 and does it matter to lenders? · Can I get an HMO mortgage through an SPV? · Are HMO mortgage rates higher? · How much can I borrow on an HMO?

---

## 7. holiday-let-mortgages  ·  SPOKE

- **Tier:** cluster · **Primary kw:** holiday let mortgage · **Volume:** 880/mo
- **Secondary kw:** fhl mortgage; airbnb mortgage; holiday let limited company mortgage; short term let mortgage
- **User intent:** commercial
- **UNIQUE ANGLE:** holiday-let *mortgage* mechanics · the seasonal-income affordability basis (low/med/high-season average vs a fixed AST rent), lender caution on short-term/Airbnb lets, and the FHL tax-abolition note (the tax reason to buy one changed · that is a TAX point, cross-link). Finance angle only.
- **H2 outline (6 to 10):** (1) Why holiday-let lending is specialist (variable seasonal income, fewer lenders). (2) The income/affordability basis (lenders use a blended low/mid/high-season figure or a percentage of projected AST-equivalent rent, not nightly headline). (3) Short-term-let and Airbnb lender stance, planning and licensing notes. (4) Limited-company/SPV holiday-let lending. (5) The FHL tax-regime change (abolished 6 Apr 2025 · so the old capital-allowances/pension tax perks ended · 3 to 4 sentences, cross-link the property tax pages). (6) ICR/LTV on holiday-let rent (link the ICR calculator). (7) FAQ.
- **[HOOK]:** a £250,000 coastal cottage projected at £24,000/year gross (circa £2,000/mo blended) but only circa £1,100/mo in the low season. A holiday-let lender advances 70% (£175,000) using a blended seasonal average against a 125% ICR at 5.5% (needs circa £1,002/mo), NOT the peak-season figure · using the peak number would over-borrow. FHL tax status is irrelevant to the loan and abolished for tax from April 2025.
- **Internal links:** UP to pillar; to `buy-to-let-mortgage-rates`, `buy-to-let-mortgage-lenders`; to both calculators.
- **Cross-links (de-cannib):** `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` · `how-much-tax-holiday-let-property-uk` · `end-of-the-furnished-holiday-letting-regime` · `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know`.
- **Authority sources:** PRA SS13/16 (ICR/stress); HMRC PIM4100+ (FHL, historic · and the FA 2025 abolition, summarised); short-term-let planning/registration context (gov.uk); FCA PERG 4.10A; FSMA s.21.
- **Lead-CTA:** business-purpose holiday-let-finance introduction, tax-led wedge (FHL change) · consent mandatory.
- **Guardrail:** UNREG · bare introduction · frame FHL as historic/abolished-for-tax, never a live perk · consumer/regulated fenced · no insurance.
- **FAQ stems:** What is a holiday-let mortgage? · How do lenders assess seasonal holiday-let income? · Can I get an Airbnb/short-term-let mortgage? · Was the furnished holiday let tax regime abolished? · Can I buy a holiday let through a limited company? · Do I need planning permission for short-term letting? · Are holiday-let mortgage rates higher? · How much deposit for a holiday let?

---

## 8. expat-non-resident-landlord-mortgages  ·  SPOKE (criteria · §B · consumer FENCE)

- **Tier:** supporting · **Primary kw:** expat buy to let mortgage · **Volume:** 110/mo (cluster 990)
- **Secondary kw:** non resident landlord mortgage; british expat mortgage; overseas landlord remortgage; non resident buy to let mortgage
- **User intent:** commercial
- **UNIQUE ANGLE (§B axis):** residency and currency · the applicant lives and is paid abroad, so mainstream lenders decline; a specialist expat/non-resident panel lends (usually higher deposit, often SPV) and the HMRC NRL scheme governs tax on the rent. INVESTOR framing only · an expat buying a home (theirs or a relative's) is a regulated contract, fenced.
- **H2 outline (6 to 8):** (1) Why non-UK-resident landlords are harder to place (identity/AML, currency, country of residence). (2) The expat/non-resident lender panel and typical terms (higher deposit, 70 to 75% LTV, SPV common). (3) Country-of-residence factors (approved-country lists, sanctioned/higher-risk jurisdictions). (4) The NRL scheme · basic-rate tax withheld from rent unless approved to receive it gross (3 to 4 sentences, cross-link). (5) Buying via an SPV as an expat (link `spv-mortgages-explained`). (6) THE FENCE · investor BTL only; an expat buying a UK home for themselves or a relative is a regulated mortgage we do not introduce. (7) FAQ.
- **[HOOK]:** a UK expat in Dubai buys a £220,000 BTL through an SPV at 70% LTV (30% deposit, £66,000). The £1,300/mo rent clears the 125% SPV ICR at 5.5% (needs circa £1,289/mo). GBP income is not required because the loan is rental-led; rent is received under the HMRC NRL scheme. An expat buying a Dubai family a UK home is regulated and out of scope.
- **Internal links:** UP to pillar; to `spv-mortgages-explained`, `portfolio-landlord-mortgages-guide`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `returning-to-uk-after-non-residence-property-portfolio` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** HMRC NRL scheme (NRL1 / gov.uk non-resident landlords); RAO Art 61 + FCA PERG 4.10A (consumer/expat-residential fence); PRA SS13/16 (ICR); FSMA s.21.
- **Lead-CTA:** business-purpose expat-investor-finance introduction · route any expat buying a home away as regulated · consent mandatory.
- **Guardrail:** UNREG investor BTL only · expat/consumer residential FENCED and routed away · no insurance · NRL is a tax point, cross-linked.
- **FAQ stems:** Can a UK expat get a buy-to-let mortgage? · Which lenders lend to non-resident landlords? · How much deposit do expats need? · Do I need UK income to get an expat BTL mortgage? · What is the non-resident landlord scheme? · Can I buy through an SPV as an expat? · Which countries do lenders accept? · Can an expat get a mortgage on a UK home to live in? (route away · regulated)

---

## 9. self-employed-buy-to-let-mortgage  ·  SPOKE (criteria · §B)

- **Tier:** supporting · **Primary kw:** buy to let mortgage self employed · **Volume:** 90/mo
- **Secondary kw:** self employed landlord mortgage; 1 year accounts buy to let mortgage; buy to let mortgage sole trader; contractor buy to let mortgage
- **User intent:** commercial
- **UNIQUE ANGLE (§B axis):** income evidence for the self-employed · only 1 year's accounts, or income taken as retained profit/dividends, so a high-street affordability model fails. BTL is rental-income-led, and self-employed-friendly lenders accept 1 year's SA302 or use the latest year not a 2-year average. Strong accounting cross-sell.
- **H2 outline (6 to 8):** (1) Why the self-employed struggle with mainstream affordability (income proof, thin/variable trading history). (2) Why BTL is different · the rent, not the applicant's income, does most of the affordability work. (3) The income evidence lenders accept (1 year's SA302, latest-year vs 2-year-average, accountant's certificate, retained profits). (4) Contractors and directors (day-rate/dividend evidence). (5) The minimum-income floor some lenders still apply (and lenders that waive it · cross-link `spv-mortgage-no-income-newly-formed`). (6) The accounting angle · getting your accounts and SA302s lender-ready (soft cross-sell). (7) FAQ.
- **[HOOK]:** a sole trader with ONE year of accounts (SA302 showing £28,000) buys a £180,000 BTL renting at £1,000/mo. The lender ignores the thin trading history because the £1,000 rent clears the 125% ICR at 5.5% (needs circa £859/mo), and accepts the single year's SA302 for the identity/affordability floor rather than demanding two years.
- **Internal links:** UP to pillar; to `spv-mortgage-no-income-newly-formed`, `first-time-landlord-mortgage`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `btl-mortgage` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** PRA SS13/16 (rental-led affordability); HMRC SA302/self-assessment guidance (gov.uk); RAO Art 25 (introduction); FCA PERG 4.10A (business BTL); FSMA s.21.
- **Lead-CTA:** business-purpose introduction + accounting wedge (lender-ready accounts) · consent mandatory.
- **Guardrail:** UNREG · bare introduction · consumer/regulated fenced · no insurance.
- **FAQ stems:** Can I get a buy-to-let mortgage if I am self-employed? · Do I need 2 years' accounts for a BTL mortgage? · Will one year's SA302 be enough? · How do lenders treat retained profits and dividends? · Is there a minimum income for a self-employed BTL? · Can a contractor get a BTL mortgage? · Does the rent matter more than my income? · How do I get my accounts lender-ready?

---

## 10. first-time-landlord-mortgage  ·  SPOKE (criteria · §B · consumer-adjacent note)

- **Tier:** supporting · **Primary kw:** first time landlord mortgage · **Volume:** 30/mo (cluster 290)
- **Secondary kw:** first time buyer buy to let; buy to let mortgage first time landlord; first time landlord no experience mortgage
- **User intent:** commercial
- **UNIQUE ANGLE (§B axis):** no prior landlord experience · many lenders require the applicant to already be a residential homeowner and/or a minimum income (often circa £25k), price first-time landlords higher or cap LTV, and use top-slicing where rent alone is marginal. Note the first-time-BUYER-buying-BTL consumer-adjacent case.
- **H2 outline (6 to 8):** (1) What lenders mean by a first-time landlord and why it raises caution. (2) The homeowner requirement (most want you to already own your home · lenders that take first-time buyers buying a BTL as their first property, and why that edges toward consumer scrutiny). (3) The minimum-income floor (circa £25k typical) and top-slicing (using surplus personal income where rent is marginal). (4) LTV/rate treatment for first-timers. (5) Going straight into an SPV as a first-time landlord (link `spv-mortgages-explained`, `spv-mortgage-no-income-newly-formed`). (6) FAQ.
- **[HOOK]:** a first-time landlord who OWNS their own home and earns £30,000 employed buys a £160,000 BTL at 75% LTV (£120,000). The £850/mo rent is marginal against the 125% ICR at 5.5% (needs circa £687/mo · it just clears), and the lender accepts them because they are an existing homeowner and can top-slice the £30k income if needed.
- **Internal links:** UP to pillar; to `spv-mortgages-explained`, `spv-mortgage-no-income-newly-formed`, `self-employed-buy-to-let-mortgage`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `buy-to-let-limited-company-complete-guide-uk` · `should-i-incorporate-buy-to-let-portfolio-2026` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** PRA SS13/16 (ICR/top-slicing context); FCA PERG 4.10A + RAO Art 61 (where a first-time buyer scenario tips into regulated); UK Finance (first-time-landlord lending); FSMA s.21.
- **Lead-CTA:** business-purpose introduction, tax-led wedge (start in an SPV) · route any owner-occupier-intent reader away · consent mandatory.
- **Guardrail:** UNREG · bare introduction · consumer/regulated (buying a home) fenced and routed away · no insurance.
- **FAQ stems:** Can a first-time landlord get a buy-to-let mortgage? · Do I need to own my own home first? · Is there a minimum income for a first-time landlord? · What is top-slicing? · Can I buy my first property as a BTL? · Should a first-time landlord use an SPV? · Are first-time-landlord rates higher? · How much deposit do I need as a new landlord?

---

## 11. day-one-remortgage-limited-company  ·  SPOKE (criteria · §B · SPV/incorporation)

- **Tier:** supporting · **Primary kw:** day one remortgage · **Volume:** 30/mo
- **Secondary kw:** day 1 remortgage spv; remortgage into a limited company; day one remortgage limited company; remortgage within 6 months buy to let
- **User intent:** commercial
- **UNIQUE ANGLE (§B axis):** the standard 6-month ownership rule · most lenders will not remortgage within 6 months of purchase, which blocks a landlord who bought with cash/bridging or transferred a property into an SPV and wants to release the deposit on day one. Day-one-remortgage lenders waive the 6-month rule. Heavy incorporation-finance overlap · this is where the incorporation SECTION on property is cross-linked.
- **H2 outline (6 to 8):** (1) The 6-month rule and why it exists (title-seasoning, anti-fraud). (2) When a day-one remortgage is needed (cash/bridging purchase, auction, or a property transferred into an SPV on incorporation). (3) How day-one lenders assess it (purchase price vs current value, ICR at 5.5% / 125%). (4) The incorporation case · transferring a personally-owned rental into your SPV is a SALE to the company (SDLT and incorporation-relief tax points · 3 to 4 sentences, cross-link the property tax pages and the incorporation SECTION). (5) Releasing capital vs pound-for-pound refinancing (link `capital-raising-btl-remortgage-equity-release`). (6) FAQ.
- **[HOOK]:** a landlord transfers a £250,000 personally-held rental into their SPV (a sale to the company · the SDLT and Section 162 incorporation-relief tax points sit on property, cross-linked). A day-one-remortgage lender advances 75% (£187,500) immediately, waiving the 6-month rule, so the incorporation deposit is not stranded. The £1,300/mo rent clears the 125% ICR at 5.5%.
- **Internal links:** UP to pillar; to `capital-raising-btl-remortgage-equity-release`, `spv-mortgages-explained`, `how-to-transfer-property-into-limited-company-uk` (incorporation-finance section); to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `section-162-incorporation-relief-property-landlords` · `section-24-remortgaging-btl-property-tax-implications` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** PRA SS13/16 (ICR/stress on remortgage); HMRC TCGA 1992 s.162 incorporation relief + SDLT on transfer (summarised, cross-linked); RAO Art 25 (introduction); FSMA s.21.
- **Lead-CTA:** business-purpose introduction, tax-led wedge (incorporation + finance together) · consent mandatory.
- **Guardrail:** UNREG · bare introduction · consumer/regulated fenced · no insurance · SDLT/incorporation-relief is tax, cross-linked.
- **FAQ stems:** What is a day-one remortgage? · Can I remortgage within 6 months of buying? · Why do lenders have a 6-month rule? · Can I remortgage a property I transferred into my SPV? · How much can I release on a day-one remortgage? · Does transferring into an SPV trigger SDLT? · What is incorporation relief? · Can I day-one remortgage an auction or bridging purchase?

---

## 12. spv-mortgage-no-income-newly-formed  ·  SPOKE (criteria · §B · SPV lending)

- **Tier:** supporting · **Primary kw:** spv mortgage no income · **Volume:** 0/mo (high-intent, near-zero competition)
- **Secondary kw:** newly formed company btl mortgage; spv mortgage first time landlord; ltd company btl no minimum income; no income spv mortgage
- **User intent:** commercial
- **UNIQUE ANGLE (§B axis):** no trading history and no minimum personal income · a brand-new SPV with zero accounts and a director with little or no earned income. SPV BTL is underwritten on the RENTAL income and the ICR, not company or director income · many SPV lenders impose no minimum director income (some still want circa £25k).
- **H2 outline (6 to 8):** (1) The objection · "my company is brand new and I have no income" and why it is not the blocker it seems. (2) How SPV lending is actually underwritten (property + ICR + personal guarantee, not company accounts). (3) The minimum-income question (lenders that require circa £25k vs lenders that require none · how to place a no-income case). (4) The personal guarantee doing the covenant work. (5) Newly-formed vs dormant vs trading (link `spv-mortgages-explained`, `sic-code-for-an-spv-property-company`). (6) FAQ.
- **[HOOK]:** a newly-incorporated SPV (0 days trading, SIC 68209) buys a £200,000 flat renting at £1,100/mo. At 75% LTV the £150,000 loan stress-tested at 5.5% / 125% ICR needs circa £859/mo rent · it clears. The director draws £0 from the SPV · the lender lends on the ICR and a personal guarantee, not the director's income or the company's (non-existent) accounts.
- **Internal links:** UP to pillar; to `spv-mortgages-explained`, `sic-code-for-an-spv-property-company`, `day-one-remortgage-limited-company`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `spv-property-investment-special-purpose-vehicle-guide` · `how-to-set-up-property-investment-company-uk-guide` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** PRA SS13/16 (rental-led ICR, not income-led); Companies House incorporation guidance; RAO Art 25 (introduction) + Art 60C (business BTL); FSMA s.21.
- **Lead-CTA:** business-purpose SPV-finance introduction, tax-led wedge · consent mandatory.
- **Guardrail:** UNREG · bare introduction · consumer/regulated fenced · no insurance.
- **FAQ stems:** Can a newly-formed SPV get a mortgage? · Do I need income to get an SPV mortgage? · Is there a minimum director income for SPV lending? · Do lenders need company accounts? · What does the personal guarantee do? · Can a dormant company get a BTL mortgage? · How new can the SPV be? · Do I need to be a homeowner?

---

## 13. sic-code-for-an-spv-property-company  ·  SPOKE (criteria · §B · SPV lending)

- **Tier:** supporting · **Primary kw:** sic code for spv · **Volume:** 0/mo (low volume, high relevance + authority · accounting x mortgage seam)
- **Secondary kw:** 68209 sic code; spv sic code mortgage; sic code buy to let company; best sic code for property investment company
- **User intent:** informational
- **UNIQUE ANGLE (§B axis):** wrong or missing SIC code = declined at DIP · the company is registered under a code lenders do not accept for SPV BTL (e.g. 68320 or 68100 only), so the case is refused before valuation. Which SIC codes lenders accept and how to fix a wrong one. This is the accounting-meets-mortgage authority page.
- **H2 outline (6 to 8):** (1) What a SIC code is and why a mortgage lender cares (they use it to confirm the company is a clean property SPV, not a trading business). (2) The accepted codes · 68209 (primary, most accepted), 68201, 68320, and 68100 (trading · rejected by several lenders if it is the ONLY code). (3) Which code to make primary and why 68100-only gets declined. (4) How to add or change a SIC code (confirmation statement · Companies House · £0). (5) Multiple SIC codes and mixed trading/investment companies (why lenders prefer a single-purpose SPV · link `spv-mortgages-explained`). (6) FAQ.
- **[HOOK]:** a company registered with SIC 68100 only (buying and selling of own real estate · read as property trading) is declined by an SPV lender at the decision-in-principle stage. The director refiles the confirmation statement to make 68209 (other letting and operating of own or leased real estate) the primary code, adding 68201/68320 · £0 cost via Companies House, and the case becomes acceptable.
- **Internal links:** UP to pillar; to `spv-mortgages-explained`, `spv-mortgage-no-income-newly-formed`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `spv-property-investment-special-purpose-vehicle-guide` · `how-to-set-up-property-investment-company-uk-guide` · `limited-company-vs-personal-ownership-tax-comparison-2026`.
- **Authority sources:** Companies House SIC condensed list (gov.uk · 68209/68201/68320/68100) + confirmation-statement/SIC-change guidance; PRA SS13/16 (SPV lending context); FSMA s.21.
- **Lead-CTA:** soft business-purpose introduction + accounting wedge (SPV set-up/SIC correctness) · consent mandatory.
- **Guardrail:** UNREG · educational · consumer/regulated fenced · no insurance.
- **FAQ stems:** What SIC code should an SPV property company use? · Which SIC codes do mortgage lenders accept? · Is 68209 or 68100 better for an SPV? · Can the wrong SIC code get my mortgage declined? · How do I change my SIC code? · Can I have more than one SIC code? · Does 68100 mean I am a property trader? · Do I need to change my SIC code before applying?

---

## 14. portfolio-landlord-mortgages-guide  ·  SPOKE (portfolio)

- **Tier:** cluster · **Primary kw:** portfolio landlord mortgage · **Volume:** 90/mo (cluster 120)
- **Secondary kw:** portfolio landlord remortgage; portfolio buy to let mortgage; portfolio landlord stress test; 4 property portfolio mortgage
- **User intent:** commercial
- **UNIQUE ANGLE:** the portfolio-landlord *mortgage/stress-test* angle · the PRA 4+ definition, aggregate portfolio ICR, the portfolio questionnaire and business plan, top-slicing across the portfolio, and refinancing/aggregating a portfolio. Portfolio *tax planning* stays on property (cross-link). High case value.
- **H2 outline (6 to 10):** (1) What makes you a portfolio landlord (PRA · 4+ mortgaged BTL across all lenders, from 30 Sep 2017). (2) What changes at 4 properties (specialist underwriting, the portfolio questionnaire, business plan, cash-flow schedule). (3) Aggregate portfolio ICR (the whole portfolio must clear, not just the new property · worked). (4) Portfolio/limited-company lenders and stress testing (link `buy-to-let-mortgage-lenders`, the ICR calculator). (5) Refinancing and aggregating a portfolio (moving properties onto one lender/facility · link `capital-raising-btl-remortgage-equity-release`). (6) Scaling and incorporation (3 to 4 sentences, cross-link the tax pages). (7) FAQ.
- **[HOOK]:** a landlord with 5 mortgaged BTLs (aggregate £900,000 of loans, £5,600/mo total rent) buys a 6th. The new lender applies aggregate portfolio ICR · the WHOLE portfolio's £5,600 rent must clear 125% at 5.5% on the £900,000 + new loan, not just the new flat in isolation. One weak property can sink the application · the aggregate test is the portfolio-specific mechanic.
- **Internal links:** UP to pillar; to `buy-to-let-mortgage-lenders`, `capital-raising-btl-remortgage-equity-release`, `expat-non-resident-landlord-mortgages`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `portfolio-landlord-tax-planning-strategy-guide` (TAX · this page = stress-test/mortgage) · `how-to-scale-buy-to-let-portfolio-1-to-10-properties` · `incorporating-property-portfolio-uk-2026`.
- **Authority sources:** PRA SS13/16 + the portfolio-landlord supervisory requirements (4+ definition, aggregate ICR, portfolio questionnaire); UK Finance (portfolio lending); HMRC PIM (portfolio income, summarised); FSMA s.21.
- **Lead-CTA:** business-purpose portfolio-finance introduction, tax-led wedge · consent mandatory · portfolio-size field feeds the 4+ flag.
- **Guardrail:** UNREG · bare introduction · consumer/regulated fenced · no insurance · tax = brand service.
- **FAQ stems:** What is a portfolio landlord? · When do the portfolio rules apply (4 properties)? · What is aggregate portfolio ICR? · What is a portfolio questionnaire? · Do I need a business plan for a portfolio mortgage? · Can one weak property block my application? · Should I refinance my portfolio onto one lender? · Are portfolio mortgages limited-company only?

---

## 15. capital-raising-btl-remortgage-equity-release  ·  SPOKE (NEW · capital raising)

- **Tier:** cluster · **Primary kw:** buy to let capital raising remortgage · **Volume:** low (from CSV portfolio/refinance long-tail · no single primary volume, recon gap page)
- **Secondary kw:** buy to let remortgage to release equity; capital raising buy to let; remortgage buy to let for deposit; releasing equity from rental property; buy to let equity release
- **User intent:** commercial
- **UNIQUE ANGLE:** raising capital from existing rental equity to fund the NEXT purchase (a further advance or remortgage to release equity on a rental), and the interest-deductibility catch. NOT lifetime/consumer equity release (that is a regulated later-life product · fence it). Pure landlord-refinance-to-grow mechanics, with the Section 24 interest-relief-on-released-capital tax point cross-linked.
- **H2 outline (6 to 10):** (1) What capital raising means for a landlord (remortgage or further advance to pull equity out of one rental to buy the next). (2) NOT lifetime/consumer equity release · that is a regulated later-life product on your own home, fenced and routed away. (3) How much you can release (LTV headroom vs the ICR ceiling · worked, link the ICR calculator). (4) The tax catch · interest on capital raised is only deductible/relievable to the extent it is used for the property business, and Section 24 restricts relief for individuals (3 to 4 sentences, cross-link the tax pages). (5) Recycling equity to scale (link `portfolio-landlord-mortgages-guide`, `day-one-remortgage-limited-company`). (6) Personal vs SPV capital raising. (7) FAQ.
- **[HOOK]:** a landlord owns a rental worth £250,000 with a £120,000 mortgage (48% LTV). Remortgaging to 75% (£187,500) releases circa £67,500 towards the next deposit, PROVIDED the £1,150/mo rent still clears the 125% ICR at 5.5% on the larger £187,500 loan (needs circa £1,074/mo · it clears with little headroom). The interest on the released capital follows the Section 24 restriction for an individual · the tax detail sits on property, cross-linked.
- **Internal links:** UP to pillar; to `portfolio-landlord-mortgages-guide`, `day-one-remortgage-limited-company`, `let-to-buy-mortgages`; to both calculators.
- **Cross-links (de-cannib / MANDATORY tax):** `buy-to-let-refinancing-when-does-it-make-sense` · `section-24-remortgaging-btl-property-tax-implications` · `mortgage-interest-deductible-landlords-uk-2026` · `mortgage-arrangement-fees-deductible-landlord`.
- **Authority sources:** PRA SS13/16 (ICR ceiling on the release); HMRC PIM2050+ + Section 24 (deductibility of interest on capital raised · summarised, cross-linked); RAO Art 61 (lifetime/consumer equity release = regulated fence); FSMA s.21.
- **Lead-CTA:** business-purpose capital-raising introduction, tax-led wedge (deductibility) · route any consumer/later-life equity-release reader away · consent mandatory.
- **Guardrail:** UNREG landlord refinance only · consumer/lifetime equity release FENCED and routed away · no insurance · interest deductibility is tax, cross-linked.
- **FAQ stems:** Can I remortgage my buy-to-let to release equity? · How much equity can I release from a rental? · Is buy-to-let capital raising the same as equity release? · Can I use released equity as a deposit on the next property? · Is the interest on capital I raise tax-deductible? · Does Section 24 affect released-capital interest? · Can I capital-raise inside an SPV? · Will releasing equity fail the stress test?

---

## Publish checklist (per page, before it ships)

1. No em-dashes anywhere. 2. Faceless voice, house byline, no named expert, no broker persona. 3. Body is raw HTML in frontmatter (no markdown, no hand-written schema, no in-body FAQ, no second form). 4. §A cross-links present and root-relative: the primary existing page AND (for SPV/company pages) the mandatory `limited-company-vs-personal-ownership-tax-comparison-2026` + a Section 24 page. 5. For the 6 criteria pages (§B): the distinguishing objection, worked applicant, and numbers are the page's OWN, not a sibling's. 6. Lead-CTA = business-purpose bare introduction to a business-finance broker, tax-led wedge, wording flagged pending solicitor sign-off, consent checkbox, lead source `property`, existing role_options. 7. Consumer BTL / regulated mortgage contracts / residential / lifetime equity release fenced and routed away (explicit on let-to-buy, first-time-landlord, expat, capital-raising). 8. No insurance cross-sell anywhere. 9. Both calculator links present (`buy-to-let-mortgage-calculator`, `buy-to-let-rental-stress-test-calculator`). 10. 2026/27 facts correct (ICR 125/145, 5.5% stress, 75/80% LTV, portfolio 4+, SIC 68209, FHL abolished 6 Apr 2025). 11. Category slug confirmed (§0 OPEN ITEM: `landlord-finance` vs `property-finance`) before canonical is set.

## Figures flagged for write-time verification (verify against a live UK source before anchoring)
- Typical stress rate (circa 5.5% / product+2%) and the 5-year-fix / pound-for-pound relaxation · lender-specific and moves with the market · state as "typical, verify".
- LTV/deposit norms (75%/25%, up to 80%/20%) and any SPV rate premium · market norm, verify current.
- Named rate examples in the rates-page hook are illustrative round numbers · label as illustrative, not a live quote.
- VERIFIED and safe to anchor: ICR 125%/145% and PRA SS13/16 (Bank of England/PRA); portfolio-landlord 4+ definition (30 Sep 2017); SIC codes 68209/68201/68320/68100 and the 68100-only rejection (Companies House list + lender criteria).
