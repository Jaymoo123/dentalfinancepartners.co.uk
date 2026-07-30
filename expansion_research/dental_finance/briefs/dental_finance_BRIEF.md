# Cluster Architecture Brief — Dental Practice Finance

**Host site:** dentists (Dental Finance Partners, dentalfinancepartners.co.uk) · **Cluster:** Dental Practice Finance · **Pages:** 8 (1 pillar, 4 cluster, 3 supporting) · **All content pages, NO calculators.**
**Source:** `expansion_research/dental_finance/dental_pages.csv` + `staged_72.json` (site_key=dentists, pillar_topic="Dental Practice Finance") · **Handoff:** `docs/_engines/FINANCE_TAX_EXPANSION_HANDOFF_2026-07-30.md`
**Date:** 2026-07-30 · This is a SPEC. Per-page Opus writers follow it verbatim; do not re-decide angle, lane, cross-links, sources, or CTA.

---

## 0. Read this first — the ONE thing that makes or breaks this cluster

The dentist site **already has a deep practice-finance + tax blog corpus** (57+ live posts touching finance, capital allowances, goodwill, acquisition, working capital, valuation, exit). Several existing posts sit on almost exactly these topics. **This cluster is the LENDING/PRODUCT layer — "how the money is borrowed" — and nothing else.** The existing posts are the TAX/STRUCTURING layer. Every page below has a named existing sibling it must NOT re-write; it cross-links to it and stays strictly in the lending lane.

If a writer finds themselves explaining capital allowances, goodwill amortisation relief, loss relief, or CGT/BADR in depth, they have drifted out of lane. Summarise in one or two sentences, then link to the existing tax page. The lending lane = products, lenders, criteria, LTV/deposit, term, rate drivers, security/personal guarantees, drawdown mechanics, affordability, the enquiry.

---

## 1. Cluster-level architecture

### (a) The finance-vs-tax lane split (LOCKED)

| This cluster OWNS (LENDING layer) | Existing dental-guides / blog OWNS (TAX layer) — cross-link, never duplicate |
|---|---|
| How a purchase/premises/equipment/startup is **funded**: loan products, lenders, LTV, deposit, term, rate drivers, security, personal guarantees, drawdown, affordability, the broker enquiry | Capital allowances / AIA / full expensing on equipment + fit-out (`/blog/capital-allowances-&-equipment/*`, dentist AIA pages) |
| The commercial-mortgage product for freehold premises (secured lending) | Goodwill as an intangible: valuation methods + 6.5% amortisation relief + apportionment (`goodwill-valuation-and-sale-playbook`, `dental-practice-goodwill-buying-selling`) |
| 100% "professional category" lending criteria, refinance/rate-review mechanics, staged drawdown | Loss relief / ramp tax position, CGT/BADR on exit, incorporation & profit extraction (`practice-profit-extraction-partnership-vs-ltd`, `tax-implications-selling-dental-practice-exit-planning-guide`) |
| Funding the tax/VAT bill (cash-flow product) | The tax/VAT liability itself, POA, quarter mechanics (existing VAT + tax posts) |

**Distinct-but-adjacent pairs (keep separate, cross-link, do NOT merge):**
- **Goodwill (intangible, tax/valuation)** vs **commercial mortgage (freehold premises, secured lending)** — different assets, different pages.
- **Equipment capital allowances (tax)** vs **equipment/asset finance (lending product)** — different pages.
- **`capital-allowances-for-dental-practices`** (planned on the PROPERTY specialist-tax cluster, tax angle) — the equipment-finance page here cross-links to it; it does NOT duplicate it.

### (b) Shared authority-source list (per page: pick 4-6, always cite ≥1 HMRC + ≥1 sector body)

1. **HMRC Capital Allowances Manual (CA)** — AIA £1m, full expensing, plant & machinery, fixtures. (Equipment, squat fit-out, commercial mortgage.)
2. **HMRC Business Income Manual (BIM)** — interest/finance-cost deductibility (BIM45650+), HP vs lease treatment, "wholly & exclusively for the trade". (Every lending page.)
3. **HMRC Corporate Intangibles R&D Manual (CIRD)** — purchased-goodwill amortisation relief (6.5%, post-1 Apr 2019 with qualifying IP). (Buy pillar, 100%, refinance, expansion.)
4. **NHS Business Services Authority (NHS BSA)** — GDS/PDS contract + UDA + NHS pension; the contract-backed income lenders underwrite against. (Buy pillar, commercial mortgage, squat, 100%, working capital.)
5. **Care Quality Commission (CQC)** — dental provider registration; a lender pre-condition to open/complete. (Squat, buy pillar, commercial mortgage.)
6. **General Dental Council (GDC)** — registration; the "professional category" basis lenders price 100% lending on. (100% page, buy pillar.)
7. **FCA Perimeter Guidance (PERG) / RAO** — business-purpose exemption (Art 60C) = why lending to a dental business is outside FCA consumer scope. (Guardrail footing; cite once where relevant, don't over-lawyer.)
8. **British Business Bank — Growth Guarantee Scheme** — govt-backed option for startup/working capital. (Squat, working-capital pages.)

Never cite competitor brokers/lenders as authority. Faceless: no named external experts, no personal accountant claims beyond the site's own "Dental Finance Partners Editorial Team, reviewed against HMRC/legislation.gov.uk" positioning (match existing frontmatter pattern).

### (c) Lead routing (LOCKED)

- **Primary CTA (every page): dental commercial-finance broker enquiry.** Business-purpose commercial finance only. Lead-form segment selector: **Associate (buying first practice) / Practice owner (single site) / Multi-practice group.** Route = the finance-broker enquiry lead (partner principal — see dependency below), tagged source `dentists`, sub-tag `dental-finance`.
- **Secondary CTA (cross-sell): the site's own accounting/tax service** via `/free-practice-health-check` — for the structuring/tax angle (incorporation, capital allowances claim, goodwill apportionment, tax on the deal). The dentist site IS the accounting firm; this is the natural warm cross-sell.
- **Mandatory data-sharing consent checkbox** on every lead form (estate rule, already live on 6 sites).
- **Dependency flag:** no dental commercial-finance broker principal is secured yet (handoff step 5). Until one is, the primary CTA points at a shared finance-enquiry component/placeholder that captures the segment + practice details; the secondary accountant CTA is live now. Writers use the CTA blocks as specified; the wiring is a cluster-level task, not a per-page decision. Do NOT invent a named broker.

### (d) Cross-link graph

**Pillar `how-to-buy-a-dental-practice` is the hub.** It is a buyer-JOURNEY orchestrator (valuation → offer/heads of terms → due diligence → finance → premises → completion). Each stage links DOWN to its money page (this cluster) AND to the existing detail page (tax/decision layer). Every cluster/supporting page links UP to the pillar and ACROSS to its 1-2 nearest siblings. No page is an orphan.

```
                        how-to-buy-a-dental-practice  (PILLAR / hub)
   ┌───────────────┬──────────────┬──────────────┬─────────────┬──────────────┐
   ▼               ▼              ▼              ▼             ▼              ▼
commercial-     100%-dental-   dental-        squat-        refinancing-   dental-practice-
mortgage        finance        equipment-     dental-       a-dental-      working-capital-
(freehold)      (criteria)     and-chair-     practice-     practice-loan  and-tax-loans
   │               │           finance          funding         │              │
   │               │              │              │              │              │
   └──► second-dental-practice-expansion-finance ◄──────────────┴──────────────┘
             (group / multi-site — links to commercial-mortgage + refinance + 100%)

EXISTING pages every page cross-links into (tax / decision / detail layer — root-relative):
  /dental-guides/practice-purchase-financial-due-diligence
  /dental-guides/goodwill-valuation-and-sale-playbook
  /dental-guides/practice-profit-extraction-partnership-vs-ltd
  /dental-guides/associate-tax-survival-guide
  /dental-guides/nhs-contract-essentials-for-dentists
  /blog/buying-a-practice/dental-practice-acquisition-bank-loan-financing-guide   (existing goodwill/loan money page, ranks pos 11)
  /blog/buying-a-practice/dental-practice-acquisition-financing-options-uk
  /blog/buying-a-practice/dental-practice-valuation-methods-uk
  /blog/buying-a-practice/is-buying-a-dental-practice-worth-it
  /blog/buying-a-practice/heads-of-terms-dental-practice-purchase
  /blog/buying-a-practice/dental-practice-due-diligence-buyers-checklist
  /blog/buying-a-practice/dental-practice-lease-vs-freehold-purchase
  /blog/buying-a-practice/associate-to-practice-owner-financial-transition-guide
  /blog/buying-a-practice/squat-dental-practice-working-capital-ramp-finance      (tax/ramp sibling to squat)
  /blog/buying-a-practice/squat-vs-existing-practice-purchase-uk-tax
  /blog/goodwill-&-practice-sale/dental-practice-goodwill-buying-selling
  /blog/capital-allowances-&-equipment/dental-equipment-finance-lease-vs-buy-capital-allowances  (tax sibling to equipment finance)
  /blog/practice-finance/equipment-finance-dental-practices-tax-implications
  /blog/practice-finance/dental-practice-working-capital-overdraft-finance-options (lending sibling — FENCE, see §3.6)
  /blog/practice-finance/vat-loan-dental-practices-uk                             (VAT-loan sibling — FENCE, see §3.6)
  /blog/practice-finance/dental-practice-refinancing-debt-restructure-tax-implications (tax sibling to refinance)
  /blog/practice-finance/dental-practice-financial-kpis-owner-should-track
  /for-associates  /for-principals  /for-practice-buyers  /for-locum-dentists     (segment hubs)
```

**Cross-SITE link (absolute URL, when live):** property specialist-tax page `capital-allowances-for-dental-practices` — from the equipment-finance page only, for the deep tax-treatment angle. If not yet live, link the dentist site's own capital-allowances pages instead.

---

## 2. Global conventions (bake into EVERY page)

- **Body = raw HTML in frontmatter** (`<h2>`, `<p>`, `<ul>`, `<table>`) — NOT markdown. Match the existing blog file structure exactly (see `goodwill-valuation-methods-dental-uk-2026.md`): frontmatter with `title, slug, canonical, date, author: Dental Finance Partners Editorial Team, category, metaTitle, metaDescription, h1, summary, schema (Article + FAQPage + BreadcrumbList + AccountingService), faqs[], reviewedBy, reviewerCredentials`.
- **Routing:** `/blog/<category-slugified>/<slug>`. Category strings below are the canonical ones; the framework slugifies (`Practice Finance` → `practice-finance`, `Buying a Practice` → `buying-a-practice`). Keep casing consistent with the values given here.
- **Quality bar (LOCKED):** Opus-only A* authoritative; genuinely the applied, practitioner-specific version. Never thin — TINY search volume means these earn their place on topical authority + lead capture over the existing dentist audience, NOT head-term traffic. Do not pad; be denser and more specific than any bank/broker page.
- **NO em-dashes.** Use commas, parentheses, full stops, middle dots.
- **Faceless EEAT.** Operator is not an accountant beyond the site's own editorial positioning. No named-expert quotes. No invented case studies with real names; worked examples are illustrative and labelled as such.
- **Business audience + B2B only.** UK associate dentists, practice owners, multi-site groups. Every worked example and CTA is business-purpose.
- **Tax facts 2026/27 (verify at write time, do not restate as advice):** AIA £1m; full expensing (100% FYA main pool / 50% special rate) for companies on new & unused plant; corporation tax 19% (<£50k) / 25% (>£250k) with marginal relief between; associate dentist = self-employed (Sch D, Class 4 NIC) vs limited-company structuring; purchased-goodwill amortisation relief 6.5%/yr (post-1 Apr 2019, qualifying IP); BADR 18% from 6 Apr 2026. Cite the source, keep tax to a summary + cross-link.
- **GUARDRAIL one-liner (put a version on every page, near the CTA):** "This guide covers business-purpose commercial finance for a dental business only. It is not advice on personal or residential lending, which is separately regulated." Never residential/consumer lending. Business-purpose = outside FCA consumer scope (RAO Art 60C), no s21 financial-promotion restriction, no IAR required.

---

## 3. Per-page specifications

### 3.1 PILLAR — `how-to-buy-a-dental-practice`
- **Tier:** pillar · **Category:** Buying a Practice · **Priority:** 9 · **Volume:** 210 (head "buy/buying a dental practice" ~420/mo combined)
- **Primary kw:** buy a dental practice · **Secondary:** buying a dental practice; how to buy a dental practice; cost of buying a dental practice
- **User intent:** informational-commercial (top of buyer journey)
- **UNIQUE ANGLE / lane:** The single end-to-end buyer-JOURNEY map and navigation hub. It does NOT re-explain acquisition financing, due diligence, or valuation in depth (existing pages own those). Its job: sequence the journey, set expectations on timeline/cost, and route each stage to its money page (this cluster) + detail page (existing). This is what makes it distinct from `dental-practice-acquisition-bank-loan-financing-guide` and `is-buying-a-dental-practice-worth-it` — it targets the head "buy a dental practice" navigational intent none of them own.
- **H2 outline (8-12):** 1) Is buying a practice right for you (link `is-buying-a-dental-practice-worth-it`) · 2) The seven stages, at a glance (journey table) · 3) What a practice costs and how the price splits (goodwill vs equipment vs freehold) · 4) Stage 1: Valuation and what drives the number (link valuation) · 5) Stage 2: Offer and heads of terms (link heads-of-terms) · 6) Stage 3: Financial due diligence (link due-diligence guide + dental-guide) · 7) Stage 4: Funding the purchase (link acquisition-financing + 100% + goodwill money page) · 8) Stage 5: Premises, freehold vs leasehold (link commercial-mortgage + lease-vs-freehold) · 9) Stage 6: Legal completion, CQC and NHS contract transfer (link NHS contract guide) · 10) Stage 7: The first 100 days and working capital (link working-capital) · 11) How long it takes and what can go wrong · 12) Where an accountant and a finance broker fit in (dual CTA)
- **Worked example / data hook:** A staged **acquisition timeline + cost stack** for a £500k practice: goodwill ~£375k (75%), equipment ~£75k, working capital ~£50k; illustrate the 100% professional-category funding route (no deposit) vs a deposit route, and a realistic 4-6 month calendar from offer to completion including CQC registration and NHS contract novation.
- **Internal links:** DOWN to all 7 siblings + existing valuation/heads-of-terms/due-diligence/acquisition-financing/lease-vs-freehold/NHS-contract pages; `/for-practice-buyers`, `/for-associates`.
- **Cross-links (tax):** `/dental-guides/practice-purchase-financial-due-diligence`, `/dental-guides/goodwill-valuation-and-sale-playbook`, goodwill amortisation post.
- **Sources (4-6):** NHS BSA, CQC, GDC, HMRC CIRD (goodwill relief), HMRC BIM.
- **Lead-CTA:** broker enquiry (segment: Associate / Practice owner / Multi-practice group) + accountant cross-sell `/free-practice-health-check`.
- **FAQ stems (5-8):** How much does it cost to buy a dental practice in the UK? · How long does it take? · Can I buy with no deposit? · Do I need to be a CQC-registered provider before I buy? · What happens to the NHS contract when I buy? · Should I buy as a sole trader or through a limited company? · Do I need both an accountant and a finance broker? · What is the biggest reason dental purchases fall through?

### 3.2 CLUSTER — `dental-practice-commercial-mortgage`
- **Tier:** cluster · **Category:** Practice Finance · **Priority:** 6 · **Volume:** 0 (topical authority)
- **Primary kw:** dental practice commercial mortgage · **Secondary:** commercial mortgage dental practice; freehold dental practice mortgage; dental surgery commercial mortgage
- **Intent:** commercial
- **UNIQUE ANGLE / lane:** The **secured-lending product for freehold surgery premises.** Distinct from goodwill (intangible) and from the lease-vs-freehold *decision* page (which is the choice, not the product). This page = the mortgage mechanics: LTV, term, rate structure, security, personal guarantees, valuation basis, owner-occupier vs investment.
- **H2 outline (6-10):** 1) What a dental commercial mortgage is (and is not — business-purpose, owner-occupier) · 2) Freehold vs leasehold: when a commercial mortgage is even in play (link lease-vs-freehold) · 3) How much you can borrow: LTV and the covenant · 4) Term, rate structure and what drives the margin · 5) Security: debenture, legal charge, personal guarantees · 6) How lenders value a dental surgery (bricks-and-mortar vs going-concern) · 7) Holding the freehold personally, in the company, or in a SIPP/SSAS (summary + tax cross-link, do not duplicate) · 8) The application and what a broker adds · 9) CTA
- **Worked example / data hook:** A **£400k freehold surgery at 70-80% LTV** worked through: deposit/equity required, 15-20yr term over Bank Rate + margin, monthly cost, debt-service cover from practice EBITDA, and the personal-guarantee position. Contrast owner-occupier commercial mortgage vs SSAS-held freehold (one paragraph, cross-link).
- **Internal links:** UP to pillar; ACROSS to 100%, refinance, expansion; existing `dental-practice-lease-vs-freehold-purchase`.
- **Cross-links (tax):** `/dental-guides/practice-profit-extraction-partnership-vs-ltd` (freehold-holding structure), pension/SSAS angle if a live page exists.
- **Sources (4-6):** HMRC BIM (interest deductibility), NHS BSA (income covenant), CQC, FCA PERG/RAO (business-purpose perimeter).
- **Lead-CTA:** broker enquiry (segment) + accountant cross-sell.
- **Guardrail:** business-purpose commercial mortgage only, never a residential/regulated mortgage.
- **FAQ stems:** What LTV can a dentist get on a freehold surgery? · Is a dental commercial mortgage regulated? · Can I hold my surgery freehold in a pension? · Do I need a personal guarantee? · What term is typical? · Commercial mortgage vs bank loan for the premises — which? · Can I buy the freehold and the goodwill on one facility?

### 3.3 CLUSTER — `dental-equipment-and-chair-finance`
- **Tier:** cluster · **Category:** Practice Finance · **Priority:** 6 · **Volume:** 20
- **Primary kw:** dental equipment finance · **Secondary:** dental chair finance; cbct scanner finance; dental equipment leasing; intraoral scanner finance
- **Intent:** commercial
- **UNIQUE ANGLE / lane:** The **asset-finance PRODUCT** angle by equipment type. HP vs finance lease vs operating lease as FUNDING instruments (deposit, term, rate, who lends, balloon), not as a tax comparison. The existing pages `dental-equipment-finance-lease-vs-buy-capital-allowances` and `equipment-finance-dental-practices-tax-implications` own the TAX comparison — this page summarises the tax in a sentence per product and links out. **Do NOT re-tabulate capital allowances.**
- **H2 outline (6-10):** 1) Why practices finance equipment rather than pay cash · 2) The three products: hire purchase, finance lease, operating lease (what each is, as funding) · 3) Financing by equipment type: chairs, CBCT, intraoral scanners, autoclaves, CAD/CAM · 4) Deposit, term, rate and balloon — what to expect · 5) The tax treatment in brief, and where to read the detail (link the two existing tax pages + property `capital-allowances-for-dental-practices`) · 6) New vs refurbished equipment and vendor finance · 7) When to bundle equipment into the acquisition loan vs finance separately · 8) CTA
- **Worked example / data hook:** A **£45k CBCT scanner: HP vs finance lease vs operating lease** side by side — deposit, monthly cost over 5 years, ownership at end, and a one-line tax pointer per route (HP → asset on balance sheet, AIA/full expensing available; leases → rentals deductible). Emphasis on the FUNDING decision; tax detail cross-links.
- **Internal links:** UP to pillar; ACROSS to working-capital, squat (fit-out); existing equipment tax pages.
- **Cross-links (tax):** `/blog/capital-allowances-&-equipment/dental-equipment-finance-lease-vs-buy-capital-allowances`, `/blog/practice-finance/equipment-finance-dental-practices-tax-implications`, property `capital-allowances-for-dental-practices` (absolute, when live).
- **Sources (4-6):** HMRC CA Manual (AIA/full expensing), HMRC BIM (HP vs lease), NHS BSA (income context), FCA RAO (business-purpose).
- **Lead-CTA:** broker enquiry (segment) + accountant cross-sell (capital-allowances claim).
- **Guardrail:** business asset finance only.
- **FAQ stems:** Can I get finance on a used dental chair? · HP vs lease for a CBCT — which is cheaper? · Do I get capital allowances on financed equipment? · What deposit is needed for dental equipment finance? · Can I finance a full surgery fit-out? · Should equipment go on the acquisition loan or separately? · What term for an intraoral scanner?

### 3.4 CLUSTER — `refinancing-a-dental-practice-loan`
- **Tier:** cluster · **Category:** Practice Finance · **Priority:** 6 · **Volume:** 10
- **Primary kw:** dental practice refinance · **Secondary:** refinance dental practice loan; dental practice loan interest rates; release equity dental practice
- **Intent:** commercial
- **UNIQUE ANGLE / lane:** The **commercial refinance decision + mechanics.** When/why to refinance, rate review, equity release for expansion or a private conversion, moving lender, early-repayment charges. The existing `dental-practice-refinancing-debt-restructure-tax-implications` owns the TAX/debt-restructure angle — summarise tax in a sentence, link out.
- **H2 outline (6-10):** 1) What refinancing a practice loan means · 2) The four triggers: better rate, releasing equity, restructuring term, changing lender · 3) How equity release works as the practice value grows · 4) Using released equity to fund practice #2 or a private conversion (link expansion) · 5) Early-repayment charges and break costs · 6) The tax angle in brief (deductibility of new finance costs; link the tax page) · 7) When NOT to refinance · 8) CTA
- **Worked example / data hook:** A **rate-review + equity-release worked case:** legacy £300k acquisition loan at a high legacy margin, practice now valued higher; refinance to a lower margin AND release £100k of equity to fund a second-surgery fit-out; show the monthly-cost saving and the released cash, with the ERC caveat.
- **Internal links:** UP to pillar; ACROSS to commercial-mortgage, expansion, 100%; existing refinance-tax page, KPIs page.
- **Cross-links (tax):** `/blog/practice-finance/dental-practice-refinancing-debt-restructure-tax-implications`, `/dental-guides/practice-profit-extraction-partnership-vs-ltd`.
- **Sources (4-6):** HMRC BIM (finance-cost deductibility), NHS BSA, FCA RAO (business-purpose).
- **Lead-CTA:** broker enquiry (segment) + accountant cross-sell.
- **Guardrail:** business-purpose refinance only.
- **FAQ stems:** When is it worth refinancing a dental practice loan? · Can I release equity to buy a second practice? · What are typical dental practice loan interest rates? · Will I pay an early-repayment charge? · Can I move lenders mid-term? · Is refinancing interest tax-deductible? · Does refinancing affect my NHS contract?

### 3.5 CLUSTER — `squat-dental-practice-funding`
- **Tier:** cluster · **Category:** Practice Finance · **Priority:** 6 · **Volume:** 0
- **Primary kw:** squat dental practice finance · **Secondary:** start a dental practice; how to open a dental practice; dental practice startup loan; setting up a dental practice cost
- **Intent:** commercial
- **UNIQUE ANGLE / lane:** The **FUNDING/lending angle of a start-from-scratch (squat) practice** — raising the startup loan, the business plan lenders want, staged drawdown against fit-out milestones, and the CQC/NHS-contract conditions. The existing `squat-dental-practice-working-capital-ramp-finance` owns the TAX/loss-relief + ramp position, and `squat-vs-existing-practice-purchase-uk-tax` owns the decision — link both, do not re-cover loss relief.
- **H2 outline (6-10):** 1) What a squat practice is and why funding it is different · 2) What it costs to build a squat (fit-out, equipment, working capital) · 3) The startup loan: how much lenders advance and against what · 4) The business plan lenders expect (patient-acquisition ramp, break-even month) · 5) Staged drawdown: releasing tranches against milestones · 6) CQC registration and (if NHS) contract access as funding conditions · 7) Funding the loss-making ramp months (link the ramp/working-capital tax page) · 8) CTA
- **Worked example / data hook:** A **staged-drawdown timeline** for a £250k squat build: Tranche 1 on lease + CQC application (fit-out), Tranche 2 on equipment install, Tranche 3 working-capital buffer at opening; capital-repayment holiday / interest-only through the ramp to break-even ~month 12-18.
- **Internal links:** UP to pillar; ACROSS to equipment-finance, working-capital, 100%; existing squat ramp + squat-vs-existing pages.
- **Cross-links (tax):** `/blog/buying-a-practice/squat-dental-practice-working-capital-ramp-finance`, `/blog/buying-a-practice/squat-vs-existing-practice-purchase-uk-tax`.
- **Sources (4-6):** CQC (registration), NHS BSA (contract access), British Business Bank (Growth Guarantee/Start Up), HMRC CA Manual (fit-out allowances, brief), HMRC BIM.
- **Lead-CTA:** broker enquiry (segment: Associate is the likely persona) + accountant cross-sell (loss relief / business plan).
- **Guardrail:** business-purpose startup lending only.
- **FAQ stems:** Can you get 100% finance for a squat dental practice? · How much does it cost to open a squat practice? · What business plan do lenders want for a squat? · How does staged drawdown work? · Do I need CQC registration before drawing down? · Can a squat get an NHS contract? · How long until a squat breaks even? · How do I fund the loss-making months?

### 3.6 SUPPORTING — `dental-practice-working-capital-and-tax-loans`
- **Tier:** supporting · **Category:** Practice Finance · **Priority:** 5 · **Volume:** 0
- **Primary kw:** dental practice working capital · **Secondary:** cash flow finance dental practice; vat loan dental practice; dental practice tax loan
- **Intent:** commercial
- **UNIQUE ANGLE / lane — TIGHTEST FENCE IN THE CLUSTER.** Two existing pages already own most of this: `dental-practice-working-capital-overdraft-finance-options` (general working-capital facilities: overdraft, RCF, short-term loan, asset finance) and `vat-loan-dental-practices-uk` (VAT loans). **This page must NOT re-cover general overdraft/RCF/working-capital facilities and must NOT re-write the VAT-loan explainer.** RE-SCOPE it to the **dedicated "funding your tax and VAT bills" node**: the specific job of borrowing to smooth HMRC liabilities (income-tax payments on account, corporation tax, the VAT quarter, NHS clawback), and the accountant cross-sell. It acts as a hub that routes general working-capital queries to the overdraft page and VAT-specific queries to the VAT-loan page.
- **H2 outline (6-9):** 1) Why even a profitable practice needs to fund its tax bills · 2) The three lumpy liabilities: income tax/POA, corporation tax, the VAT quarter (+ NHS clawback) · 3) Tax loans and VAT loans: what they are and when they fit (link `vat-loan-dental-practices-uk`) · 4) When a general working-capital facility is the better tool instead (link overdraft page) · 5) Deductibility of interest on trade-purpose borrowing (brief) · 6) Timing: matching the facility to the bill, not to a loss · 7) CTA (heavy accountant cross-sell)
- **Worked example / data hook:** A **tax-bill smoothing case:** a practice facing a January payment on account in a seasonally quiet month funds it with a short tax loan repaid over the following quarter; contrast with the wrong use (borrowing to mask a profitability gap). One clear table: which facility for which liability.
- **Internal links:** UP to pillar; explicit FENCE links to `/blog/practice-finance/dental-practice-working-capital-overdraft-finance-options` and `/blog/practice-finance/vat-loan-dental-practices-uk`; ACROSS to refinance.
- **Cross-links (tax):** `/dental-guides/associate-tax-survival-guide`, existing VAT posts.
- **Sources (4-6):** HMRC BIM (interest deductibility), HMRC (POA/CT/VAT payment mechanics), NHS BSA (clawback).
- **Lead-CTA:** accountant cross-sell PRIMARY here (`/free-practice-health-check`), broker enquiry secondary.
- **Guardrail:** business-purpose short-term finance only.
- **FAQ stems:** Can I get a loan to pay my tax bill? · What is a VAT loan for a dental practice? · Tax loan vs overdraft — which for the HMRC bill? · Is the interest tax-deductible? · Can I fund NHS clawback? · Should I borrow to pay corporation tax?

### 3.7 SUPPORTING — `second-dental-practice-expansion-finance`
- **Tier:** supporting · **Category:** Practice Finance · **Priority:** 5 · **Volume:** 0
- **Primary kw:** second dental practice finance · **Secondary:** dental practice expansion finance; buying a second dental practice; multi-site dental group finance
- **Intent:** commercial
- **UNIQUE ANGLE / lane:** **Funding practice #2 and building a group** — using equity in practice #1, group-structure lending, higher case value, cross-charging. No existing lending page covers multi-site funding (`inter-company-loans-dividends-dental-groups-uk` is the TAX/structuring sibling). Highest lifetime value in the cluster.
- **H2 outline (6-9):** 1) Buying a second practice is a different funding conversation · 2) Using equity in practice #1: refinance vs standalone facility (link refinance) · 3) How lenders assess a two-site borrower (combined covenant, management capacity) · 4) Group structure: holdco/opco and how lending sits across it (summary; link tax page) · 5) Funding the acquisition: goodwill, premises, equipment across sites · 6) Cross-charging and inter-company funding in brief (link tax page) · 7) The multi-site growth path and where a broker + accountant add value · 8) CTA
- **Worked example / data hook:** A **two-site funding stack:** owner of a £600k practice refinances to release £120k equity, combines it with a new acquisition facility to buy a £450k second practice; show the combined debt-service position and the group-structure note.
- **Internal links:** UP to pillar; ACROSS to refinance, commercial-mortgage, 100%; existing inter-company-loans tax page; `/for-principals`.
- **Cross-links (tax):** `/blog/practice-accounting/inter-company-loans-dividends-dental-groups-uk`, `/dental-guides/practice-profit-extraction-partnership-vs-ltd`.
- **Sources (4-6):** HMRC CIRD (goodwill relief on the second acquisition), HMRC BIM, NHS BSA, Companies House (group structure).
- **Lead-CTA:** broker enquiry (segment: Multi-practice group / Practice owner) + accountant cross-sell (group structuring).
- **Guardrail:** business-purpose expansion finance only.
- **FAQ stems:** Can I use equity in my first practice to buy a second? · How do lenders view a multi-site dental owner? · Should I buy the second practice in the same company or a group? · How much can a group borrow? · Does a second practice get 100% finance? · What is the tax on cross-charging between practices?

### 3.8 SUPPORTING — `100-percent-dental-practice-finance`
- **Tier:** supporting · **Category:** Practice Finance · **Priority:** 5 · **Volume:** 0
- **Primary kw:** 100% dental practice finance · **Secondary:** no deposit dental practice loan; how much can i borrow dental practice
- **Intent:** commercial (high-intent objection page)
- **UNIQUE ANGLE / lane:** The **objection/criteria page** — why dentists uniquely get up to 100% (sometimes 100%+) lending: the "professional category". No existing page covers this. Answers the "can I really buy with no deposit?" question head-on with the criteria.
- **H2 outline (6-9):** 1) Can you really buy a dental practice with no deposit? · 2) The professional category: why lenders back dentists (GDC registration, low default, resilient/NHS-underwritten income) · 3) What 100% actually covers (goodwill + equipment; sometimes working capital) · 4) The criteria: experience, clinical hours, credit, the practice's numbers · 5) Security and personal guarantees when there's no deposit · 6) Affordability: how much you can borrow against practice EBITDA · 7) When 100% is NOT offered (and how to bridge the gap) · 8) CTA
- **Worked example / data hook:** The **100% professional-category criteria checklist + a borrowing-capacity illustration:** £450k practice, 100% goodwill+equipment loan, no cash deposit, 15-year term, personal guarantee, debt-service covered ~1.4x by adjusted EBITDA; the associate-buyer profile lenders approve.
- **Internal links:** UP to pillar; ACROSS to commercial-mortgage, squat, expansion; existing acquisition-financing page, `is-buying-a-dental-practice-worth-it`; `/for-associates`.
- **Cross-links (tax):** `/dental-guides/practice-purchase-financial-due-diligence`, goodwill money page.
- **Sources (4-6):** GDC (registration/professional category), NHS BSA (income covenant), HMRC CIRD (goodwill), FCA RAO (business-purpose).
- **Lead-CTA:** broker enquiry (segment: Associate first-time buyer PRIMARY) + accountant cross-sell.
- **Guardrail:** business-purpose lending only; "no deposit" refers to commercial goodwill lending, not a residential mortgage.
- **FAQ stems:** Can I buy a dental practice with no deposit? · Why do dentists get 100% finance? · What do I need to qualify for 100% lending? · Does 100% include working capital? · Will I need a personal guarantee? · How much can I borrow against a practice? · What if a lender only offers 90%?

---

## 4. Writer checklist (per page, before submit)

- [ ] Stayed in the LENDING lane; every tax topic is a summary + cross-link, never a re-write of an existing tax page.
- [ ] Named existing sibling(s) cross-linked (see §1a table + §3 page spec). No orphan pages; UP-link to pillar present.
- [ ] Primary broker CTA with segment selector + secondary accountant `/free-practice-health-check` cross-sell + consent checkbox.
- [ ] Business-purpose guardrail one-liner near the CTA. Nothing residential/consumer.
- [ ] One unique worked example/data hook as specified (not reused across pages).
- [ ] 4-6 authority sources incl. ≥1 HMRC + ≥1 sector body; faceless, no named experts.
- [ ] Raw-HTML body in frontmatter; schema (Article + FAQPage + BreadcrumbList + AccountingService); 5-8 FAQs; correct category string.
- [ ] No em-dashes. 2026/27 tax facts current. A* density, never thin.

## 5. Open cluster dependencies (not per-page decisions)
1. Dental commercial-finance broker principal not yet secured — primary CTA wiring pending (handoff step 5). Writers use the CTA block as specified; do not name a broker.
2. Property `capital-allowances-for-dental-practices` may not be live — equipment page links dentist's own capital-allowances pages until it is.
3. The CSV EXTEND pages (specialist-dental-finance hub, valuation, goodwill-funding, selling) are separate EXTEND-in-place tasks, NOT part of these 8. This cluster cross-links to them; it does not build or duplicate them.
