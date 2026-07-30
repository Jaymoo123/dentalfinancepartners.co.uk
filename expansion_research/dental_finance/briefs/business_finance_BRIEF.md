# Cluster Architecture Brief — Business Finance

**Cluster:** Business Finance · **Host site:** generalist (Holloway Davies, hollowaydavies.co.uk)
**Pages:** 27 (3 pillars · 2 calculators · 12 clusters/supporting · 10 sector segments)
**Route:** `/blog/business-finance/<slug>` (blog is `/blog/[category]/[slug]`; use a NEW `category: "Business Finance"` in frontmatter — the category route auto-resolves, no code change).
**Source of truth:** `staged_72.json` (filter `pillar_topic == "Business Finance"`) + `business_finance_pages.csv`. This brief supersedes the CSV `notes` where they differ.
**Status:** SPEC for per-page Opus writers. No article bodies here. Writers do NOT re-decide angle, links, sources, lead routing, or the company-gate — all fixed below.

---

## 0. QUALITY BAR (LOCKED — restate to every writer)

- **Opus-only, A\* authoritative.** Every page genuinely the best UK resource on its term, never thin/flaggable. Quality is the strategy.
- **NO em-dashes.** Use commas, parentheses, full stops, middle dots (·).
- **Faceless EEAT.** Operator is NOT an accountant and NOT a broker. No named-expert bylines, no "our advisers", no invented quotes. Authority comes from data, statute citations, worked examples, and transparent process. Holloway Davies editorial voice (matches existing generalist frontmatter schema: `author: Holloway Davies Editorial Team`, `reviewedBy` editorial team).
- **Business-to-business throughout.** Never consumer/personal-finance tone. Reader = a UK limited-company director or FD.
- **Lead specificity.** Segment-specific lead qualifiers where noted (turnover band, debtor book size, product needed).
- **Body = raw HTML in frontmatter** (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>`). NOT markdown. Match the existing generalist `.md` frontmatter schema exactly (title, slug, canonical, date, author, category, metaTitle, metaDescription, altText, image, h1, summary, schema JSON-LD graph with AccountingService + Article + BreadcrumbList + FAQPage, `faqs:` list). Canonical pattern: `https://www.hollowaydavies.co.uk/blog/business-finance/<slug>`.
- **UK 2026/27 facts** (embed where relevant, cite source):
  - Corporation tax: 19% small-profits rate (≤£50k), 25% main rate (≥£250k), marginal relief 26.5% effective band between.
  - AIA £1,000,000 + **full expensing** (100% FYA on new/unused main-rate plant, permanent; 50% FYA special-rate).
  - Employer NIC 15% / £5,000 secondary threshold (per-employee cost, from Apr 2025).
  - VAT registration threshold £90,000.
  - Dividend rates 10.75% / 35.75% / 39.35% (2026/27).
  - BADR 18% (from 6 Apr 2026).
  Cross-link the generalist tax pillar for the actual tax mechanics rather than re-explaining them (see §C cross-link map). Finance pages carry the FINANCE angle; tax detail is one hop away.

---

## A. COMPANY-GATE REGULATORY FRAMING (bake into EVERY page)

**The rule.** This cluster is unregulated ONLY because we introduce **limited-company (body corporate) borrowers** to a commercial-finance broker panel. Under the Financial Services and Markets Act 2000 (Regulated Activities) Order 2001, **Article 36A** (credit broking), effecting an introduction of a **body corporate** to a lender/broker is NOT a regulated activity. Sole-trader, partnership (<4 partners) and personal borrowing below the relevant thresholds ARE consumer credit and would need FCA authorisation. So the whole cluster is fenced to companies.

**Every page must, without exception:**
1. Frame the reader as a limited company ("your company", "the business", "directors"), never "you personally".
2. Company-gate the lead form: first field / qualifying question = **"Is your business a limited company?"** If No → do not route to the finance panel; show the sole-trader notice (below) and route to the accountant CTA only.
3. Contain the standing fence paragraph (verbatim intent, writer may lightly reword for flow, must keep the substance):

   > **Company borrowers only.** The finance introductions on this page are for UK limited companies and limited liability partnerships borrowing for business purposes. We introduce your company to a panel of commercial-finance brokers; we are not a lender and do not give regulated credit advice. If you are a sole trader, an individual, or borrowing for personal or household purposes, this service is not for you and you should speak to an FCA-authorised consumer-credit firm.

4. Where a product has a **regulated consumer variant, name it and route away** (do not present it as something we introduce):
   - **Merchant cash advance:** unregulated as an unsecured business cash advance to a company against future card takings. A **sole-trader / individual MCA can be regulated consumer credit.** Page states: company MCA only; sole traders → FCA-authorised provider.
   - **Start Up Loans (British Business Bank scheme):** the government Start Up Loan is a **personal loan to the individual (unsecured, up to £25,000, personal liability), NOT a company loan.** The `startup-business-loans` page must explain the scheme accurately, state that it is a personal borrowing product we do NOT introduce, and route company startups to unsecured/asset-backed **company** facilities on our panel instead.
   - **Sub-£25k / personal-style borrowing:** fence off. Our introductions are for company facilities, typically £25,000+.
5. Strictly B2B copy. No IAR required for this cluster (company borrowers, no s21 qualifying-credit consumer promotion). Do NOT drift into residential mortgage, personal loan, or consumer-credit language anywhere.

**One-liner each writer pastes into their working notes:** *"Limited-company borrowers only; introduce to broker panel (Art 36A, not credit broking); fence sole traders + the SUL personal scheme + sole-trader MCA to FCA-authorised firms; no personal/consumer-credit copy; no IAR."*

---

## B. LEAD-ROUTING SUMMARY

- **Primary CTA (the finance itself):** route to the **multi-buyer commercial-finance broker PANEL** — exclusive B2B leads sold to a panel of commercial-finance brokers. NOT to accountants for the finance.
- **Secondary CTA (tax/structuring angle):** the generalist **accountant** lead (Holloway Davies) — for "how the finance is taxed / structured" (interest deductibility, AIA vs HP, VAT recovery on assets, R&D-advance context). Cross-sell, never the primary path.
- **Lead form:** generalist site form. `lead_source = 'general'` (per estate lead-source enum: dentists/property/medical/solicitors/general/agency). Add cluster tag `business-finance` + product subtype (e.g. `invoice-finance`, `asset-finance`, `unsecured-loan`) so the panel routing knows the product.
- **Company-gate field is mandatory** on the form (see §A.2). Optional segment-specific qualifiers noted per page (turnover band, monthly card takings, debtor book value, asset type/value).
- **Consent checkbox** (mandatory data-sharing consent) as on all estate lead forms.
- Existing lead-email + Sheets sync pipelines apply unchanged; no new infra.

---

## C. CROSS-LINK GRAPH (fixed — writers use these exact root-relative URLs)

### Internal pillars (root-relative, this cluster)
- Invoice pillar: `/blog/business-finance/invoice-finance-guide`
- Asset pillar: `/blog/business-finance/asset-finance-guide`
- Loans pillar: `/blog/business-finance/business-loans-guide`

### Pillar → child map (each child links UP to its pillar; each pillar links DOWN to all its children)
- **invoice-finance-guide** ⊃ invoice-factoring · invoice-discounting · all 10 `invoice-finance-for-<sector>` segments.
- **asset-finance-guide** ⊃ equipment-and-machinery-finance · asset-finance-calculator. (Cross-link, not own: dental-equipment-and-chair-finance on the dentists site, construction plant pages on construction-cis — asset-finance-guide is the business-wide CANONICAL for equipment finance; sector equipment pages link up to it.)
- **business-loans-guide** ⊃ small-business-loans · startup-business-loans · unsecured-business-loans · secured-business-loans · merchant-cash-advance · working-capital-finance · vat-loans · revolving-credit-facility · recovery-and-growth-guarantee-scheme · business-loan-calculator.

### Cross-cluster (siblings in the estate expansion)
- Tax-on-exit / selling → link to Business Exit cluster (`/blog/business-finance/...` no; Exit lives on generalist too: `selling-a-business-tax-cgt-badr`, `business-valuation-guide`).
- Sector segments cross-link their sector site: `invoice-finance-for-dentists` → dentists site dental-practice-finance hub; `invoice-finance-for-construction` → construction-cis CIS pages; equipment finance → dental-equipment (dentists) + plant (construction-cis) as the sector-specific downstream.

### Generalist TAX pillar cross-links (use for the tax-adjacent bit; do NOT re-explain the tax)
| When a finance page touches… | Cross-link to (root-relative) |
|---|---|
| AIA / capital allowances on a financed asset | `/blog/corporation-tax/annual-investment-allowance` |
| Full expensing (100% FYA) on new plant | `/blog/corporation-tax/full-expensing-capital-allowances` |
| Capital allowances 2026/27 rates/rules | `/blog/corporation-tax/capital-allowances-2026-27-guide` |
| Corporation-tax rate / marginal relief (interest deductibility band, CT-bill funding) | `/blog/corporation-tax/corporation-tax-marginal-relief-2025-26` |
| VAT registration threshold (£90k) | `/blog/vat-and-making-tax-digital/vat-threshold-2025-26` |
| When to register for VAT | `/blog/vat-and-making-tax-digital/when-do-you-need-vat-registration-help-uk-business` |
| BADR on sale (exit angle) | `/blog/exit-and-capital-gains/badr-2026-rate-change` |
| Employer NIC true cost (payroll-funding angle) | `/blog/payroll-and-paye/employer-nic-true-cost-of-employee-2026-27` |

**De-cannibalisation rule:** finance-mechanics (products, rates, terms, eligibility) is greenfield on generalist — safe to build. Anything that starts explaining a TAX rule = stop, one paragraph max, cross-link the tax pillar above. Do not create a competing tax explainer. `equipment-and-machinery-finance` is the business-wide canonical; the dental/trade equipment pages cross-link INTO it, not vice-versa duplicated.

---

## D. SHARED AUTHORITY-SOURCE LIST (draw 4-6 per page from here; add product-specific where noted)

1. **British Business Bank** — `british-business-bank.co.uk` (business finance guide; Growth Guarantee Scheme; Start Up Loans scheme terms; Small Business Finance Markets report for data hooks).
2. **gov.uk — Finance and support for your business** / **Get funding for your business** (`gov.uk/business-finance-support`, `gov.uk/browse/business/funding-debt`).
3. **FCA — Regulated Activities Order 2001 (SI 2001/544)**, **Article 36A** (credit broking) + **Article 60C–60H** (exempt agreements: business-purpose exemption, £25,000 threshold) + **PERG 2 / PERG 17** (credit-broking perimeter guidance). Use for the company-gate reg framing on every product page.
4. **legislation.gov.uk** — RAO SI 2001/544 primary text (link for the Art 36A / body-corporate carve-out).
5. **Finance & Leasing Association (FLA)** — `fla.org.uk` (asset finance / lease standards, Business Finance Code) — asset & equipment pages.
6. **UK Finance** — invoice finance & asset-based lending statistics, standards framework — invoice pages.
7. **HMRC manuals** (tax-adjacent only, one hop): **BIM45301+** (interest & finance-cost deductibility), **CTM** loan-relationships (company loan interest), **VAT Notice 700** / VAT guide (VAT-loan & asset VAT), **CA23000** capital allowances. Link the generalist tax pillar first; cite HMRC manual as the primary source behind it.
8. Product-specific: **Start Up Loans (BBB)** for startup page; **Growth Guarantee Scheme (BBB)** for the scheme page; **Bank of England** Bankstats / agents' summary for lending-conditions data hooks.

Every page cites statute/gov/regulator, never a competitor blog. Faceless authority.

---

## E. ANTI-SAMENESS MATRIX — the 10 `invoice-finance-for-<sector>` segments

**Cross-post sameness is the top risk.** These 10 pages share a skeleton (see §G segment template) but each is built around ONE distinguishing axis below. No two may open the same way, use the same worked example, or share FAQ stems. The "honest fit" column is deliberate: several sectors are a POOR fit for invoice finance, and saying so (then routing to the right product) is the differentiator and the EEAT signal.

| # | Slug (`invoice-finance-for-…`) | ONE distinguishing axis (lead the page with this) | Factoring vs discounting fit | Unique worked example / data hook |
|---|---|---|---|---|
| 1 | `-recruitment-agencies` | **Weekly temp payroll vs 30–60 day client terms** — the textbook mismatch. Temp desks bleed cash: pay contractors Friday, invoice the client, wait 45 days. Pay-and-bill / back-office bundled with the facility. Perm placement fees are different (lumpy, clawback). | **Factoring** (with payroll funding + credit control); recruitment-specific "pay & bill" facilities. | Agency billing £2m/yr of temps, 55-day average client payment, weekly wage run of ~£35k — model the funding gap and how 90% advance closes it. |
| 2 | `-construction` | **Retentions, applications-for-payment (not invoices), CIS, pay-when-paid, contra-charges, main-contractor insolvency.** Standard factoring often EXCLUDES construction — you need a specialist construction-finance facility that understands AfP and retention. | Specialist **construction finance** (selective/AfP-aware); vanilla factoring usually declines. | Subcontractor on a £500k contract with 5% retention (£25k) held 12 months + 60-day AfP cycle + 20% CIS deduction at source — show the true cash locked up. Cross-link construction-cis CIS pages. |
| 3 | `-ecommerce` | **Card settlement + marketplace payout holds (Amazon/Shopify rolling reserves, 14-day payouts) + inventory bought before it sells.** B2C ecom has NO debtor book, so classic invoice finance rarely fits; only B2B/wholesale ecom (trade buyers on terms) qualifies. | Discounting/factoring only for the B2B slice; otherwise **route to revenue-based / MCA / stock finance**. | Seller turning over £1.2m, 60% Amazon (14-day reserve), 40% trade wholesale on 30-day terms — only the trade slice is factorable; model it and fence the rest. |
| 4 | `-hospitality` | **Mostly card/cash B2C takings, not invoices — invoice finance is usually the WRONG tool.** Only B2B hospitality qualifies: contract/event catering, corporate hospitality, wholesale-to-venues. Strong seasonality (summer, Christmas). | Factoring only for B2B caterers/event firms; card-led venues → **MCA / revolving credit / working capital**. | Contract caterer invoicing 12 corporate clients on 45-day terms vs a 40-cover restaurant taking card at point of sale — one is factorable, one is not. Honest fence. |
| 5 | `-dentists` | **NHS UDA contract income (monthly BSA payments) + private plan/card income = mostly not a trade-debtor book.** Invoice finance suits dental LABS and B2B dental suppliers, not the patient-facing practice. Most practices actually need practice/asset finance. | Rarely factoring; route practices to dental practice finance. | Dental lab invoicing 30 practices on 30-day terms (factorable) vs a mixed NHS/private practice (income is contract + card, not factorable). Cross-link dentists site practice-finance hub + `invoice-finance-guide`. |
| 6 | `-haulage-and-transport` | **60–90 day shipper terms + huge diesel/fuel outlay upfront + driver wages** = acute cash squeeze. Mature "transport factoring" market with fuel-advance features. Fleet itself is asset-financed separately. | **Factoring** (transport-specialist, often with fuel advances). | Haulier running 8 artics, £18k/week diesel, invoicing 3 large logistics clients at 75 days — model the fuel-to-payment gap. Cross-link asset-finance-guide for the trucks. |
| 7 | `-wholesale` | **Double squeeze: buy stock upfront + sell to retailers on 30–60 day credit + seasonal stock builds + import lead times.** Debtor book spread across many small retailers (ideal for factoring credit control). | **Factoring** + often **trade/stock finance** stacked. | Wholesaler holding £400k stock, selling to 120 independent retailers on 45-day terms, Q4 seasonal build — combine factoring with stock finance. |
| 8 | `-manufacturing` | **Order-to-cash + WIP gap: raw materials paid upfront, long production lead times, WIP not yet invoiceable, 30–90 day B2B order terms, export invoices.** Capital-equipment heavy → pairs with asset finance + full expensing. | **Factoring / CID** (+ export factoring); pair with asset finance for plant. | Manufacturer with a £250k order, 10-week build, materials paid week 1, invoice raised week 10, paid week 20 — model the ~5-month gap. Cross-link full-expensing + asset-finance-guide. |
| 9 | `-cleaning-companies` | **Contract cleaning: labour paid weekly/monthly, facilities-management head-contractors pay 45–60 days, thin margins, TUPE on contract wins, debtor concentration on a few FM primes.** They don't want to chase big clients → factoring with credit control. | **Factoring** (whole-turnover, with credit control). | Commercial cleaner, £1.5m turnover, 70% wage cost, 3 FM primes paying at 55 days — model payroll-vs-receipt gap; note TUPE cash impact on contract wins. |
| 10 | `-security-firms` | **SIA-licensed manned guarding: guards paid weekly/fortnightly on 24/7 rotas, corporate/public-sector clients pay 30–60 days, large single-client concentration, thin margins.** Same-day payroll funding is the hook. | **Factoring** (with payroll funding). | Guarding firm, 60 SIA-licensed officers, weekly wage run ~£48k, one public-sector client = 40% of book at 60 days — model concentration risk + payroll funding. |

Distinctness check: recruitment (weekly-payroll mismatch) ≠ construction (retentions/AfP/CIS) ≠ ecommerce (marketplace payouts, mostly wrong tool) ≠ hospitality (card takings, mostly wrong tool) ≠ dentists (contract/patient income, mostly wrong tool) ≠ haulage (fuel-vs-75-day) ≠ wholesale (stock+debtor double squeeze) ≠ manufacturing (WIP/order-to-cash) ≠ cleaning (FM-prime concentration + TUPE) ≠ security (SIA rota + client concentration). Cleaning/security/recruitment are the closest triplet — force divergence via TUPE (cleaning), SIA + client concentration (security), pay-and-bill back-office (recruitment).

---

## F. PER-PAGE SPECS — pillars, calculators, clusters

Fields: slug | tier | primary kw | secondary kws | intent | volume | UNIQUE ANGLE | H2 outline | worked example/data hook | internal links | tax cross-links | sources | lead-CTA | guardrail one-liner | FAQ stems.

Volumes below are UK monthly (from staged data). All pages: `category: "Business Finance"`, `lead_source='general'`, company-gate mandatory, faceless EEAT, no em-dashes, raw-HTML body.

---

### PILLAR 1 — `invoice-finance-guide`
- **Tier:** pillar · **Primary kw:** invoice finance · **Volume:** 1,900 · **Intent:** informational.
- **Secondary:** factoring vs discounting; what is invoice finance; invoice finance uk; how does invoice finance work; invoice finance rates; confidential invoice discounting.
- **UNIQUE ANGLE:** The definitive UK company guide to turning unpaid B2B invoices into cash. Owns the factoring-vs-discounting decision and hub-routes to every sector segment. Honest on when invoice finance is the WRONG tool (B2C/card businesses).
- **H2 outline (pillar, 8–12):** 1) What invoice finance is (advance against your debtor book) 2) Factoring vs invoice discounting vs selective/spot 3) How it works step by step (advance %, service fee, discount margin) 4) What it costs (service fee, discount margin, real APR worked example) 5) Recourse vs non-recourse (bad-debt protection) 6) Eligibility — who qualifies (B2B invoices, company, turnover, debtor spread) and who does NOT (B2C/card, retention-heavy contracts) 7) Confidential vs disclosed facilities 8) Invoice finance vs a business loan vs overdraft 9) By sector (route to the 10 segments) 10) How to apply / what lenders assess 11) Tax treatment (fees deductible; VAT on fees) — one para, cross-link.
- **Worked example:** Company with a £200k debtor ledger, 60-day terms; 85% advance = £170k released day one; 1.5% service fee + 2.5% over base discount margin — show the total cost of financing a £30k invoice for 45 days as an effective annualised rate.
- **Internal links:** DOWN to invoice-factoring, invoice-discounting, all 10 segments; ACROSS to business-loans-guide, asset-finance-guide, working-capital-finance.
- **Tax cross-links:** VAT-on-fees → `/blog/vat-and-making-tax-digital/vat-threshold-2025-26`.
- **Sources:** UK Finance (ABL stats), British Business Bank, FCA RAO Art 36A (company-borrower framing), gov.uk business finance.
- **Lead-CTA:** broker panel (subtype `invoice-finance`); qualifiers: limited company? turnover band, debtor book value. Secondary: accountant for structuring.
- **Guardrail:** company B2B debtor books only; introduce to panel; fence sole traders/B2C.
- **FAQ stems (5–8):** Is invoice finance regulated? · Factoring or discounting — which is cheaper? · Will my customers know I use invoice finance? · What advance rate can I get? · Can a startup use invoice finance? · What happens if a customer doesn't pay (recourse)? · Invoice finance vs a business loan?

### PILLAR 2 — `asset-finance-guide`
- **Tier:** pillar · **Primary kw:** asset finance · **Volume:** 1,900 · **Intent:** informational.
- **Secondary:** hire purchase vs lease; finance lease vs operating lease; asset finance uk; asset refinance; what is asset finance.
- **UNIQUE ANGLE:** Business-wide CANONICAL for financing plant, machinery, vehicles and equipment — the HP-vs-lease-vs-refinance decision, tied to AIA/full-expensing tax treatment (the reason to buy vs lease). Sector equipment pages (dental, construction plant) link UP here.
- **H2 outline (8–12):** 1) What asset finance is 2) Hire purchase (own at end) vs finance lease vs operating lease vs contract hire 3) Asset refinance / sale-and-leaseback (releasing cash from owned assets) 4) What can be financed (hard vs soft assets) 5) The tax decision — HP + AIA/full expensing vs lease rentals deductible (one para each, cross-link) 6) Costs, deposits, balloon payments, terms 7) Eligibility and what lenders assess 8) Asset finance vs a loan vs paying cash 9) By sector (equipment, vehicles, plant) 10) How to apply.
- **Worked example:** £120k CNC machine: (a) HP with £1m AIA / full expensing → 100% first-year deduction, ~£30k CT saved (25% payer), own the asset; vs (b) 5-year finance lease, rentals deductible over term. Show cash-flow + tax timing difference.
- **Internal links:** DOWN to equipment-and-machinery-finance, asset-finance-calculator; ACROSS to business-loans-guide, invoice-finance-guide. Cross-site DOWN: dental-equipment-and-chair-finance (dentists), construction plant (construction-cis).
- **Tax cross-links:** `/blog/corporation-tax/annual-investment-allowance`, `/blog/corporation-tax/full-expensing-capital-allowances`, `/blog/corporation-tax/capital-allowances-2026-27-guide`.
- **Sources:** FLA (asset finance standards/stats), British Business Bank, HMRC CA23000 (via tax pillar), FCA RAO Art 36A.
- **Lead-CTA:** broker panel (subtype `asset-finance`); qualifiers: limited company? asset type + value, new/used, buy vs refinance. Secondary: accountant for AIA vs lease decision.
- **Guardrail:** company asset purchases only; introduce to panel; not consumer HP.
- **FAQ stems:** HP or lease — which is better for tax? · Can I claim AIA on hire-purchase assets? · What is a balloon payment? · Can I refinance assets I already own? · Does asset finance affect my AIA? · New or used equipment — does it matter for full expensing? · Is asset finance regulated?

### PILLAR 3 — `business-loans-guide`
- **Tier:** pillar · **Primary kw:** business loan · **Volume:** 27,100 (cluster head) · **Intent:** informational.
- **Secondary:** business loan uk; loan for a business; business loan for startup; secured vs unsecured business loan; business loan rates; how to get a business loan.
- **UNIQUE ANGLE:** The top-of-cluster hub for company debt — secured vs unsecured, term vs revolving, bank vs alternative lender, eligibility and what determines rate. Head term is AIO-eaten + bank-held, so win on completeness, the company-gate honesty, and routing depth (never head-on the banks).
- **H2 outline (pillar, 8–12):** 1) Types of business loan (term, revolving, secured, unsecured, asset-backed, cash advance) 2) Secured vs unsecured 3) What a business loan costs (rate drivers, fees, personal guarantees) 4) Eligibility — trading history, turnover, accounts, director creditworthiness 5) Bank vs alternative/fintech lenders vs broker panel 6) How much can a company borrow 7) Government-backed options (Growth Guarantee Scheme, Start Up Loans — note SUL is PERSONAL) 8) Business loan vs invoice finance vs asset finance vs overdraft 9) Personal guarantees explained 10) How to apply / improve approval odds 11) Tax — interest deductibility (one para, cross-link).
- **Worked example:** £75k unsecured term loan over 5 years at a representative rate vs the same via revolving credit facility drawn/repaid — total interest cost comparison + when each fits.
- **Internal links:** DOWN to small-/startup-/unsecured-/secured-business-loans, merchant-cash-advance, working-capital-finance, vat-loans, revolving-credit-facility, recovery-and-growth-guarantee-scheme, business-loan-calculator; ACROSS to invoice-finance-guide, asset-finance-guide.
- **Tax cross-links:** interest deductibility → `/blog/corporation-tax/corporation-tax-marginal-relief-2025-26` (behind it: HMRC BIM45301).
- **Sources:** British Business Bank (Small Business Finance Markets data hook), gov.uk business finance, Bank of England lending conditions, FCA RAO Art 36A + Art 60C business-purpose exemption.
- **Lead-CTA:** broker panel (subtype `business-loan`); qualifiers: limited company? loan amount, secured/unsecured, purpose. Secondary: accountant.
- **Guardrail:** company borrowing only (typically £25k+); introduce to panel; SUL is a personal scheme we don't introduce; fence sole traders.
- **FAQ stems:** Are business loans regulated? · Secured or unsecured — which is right? · Will I need a personal guarantee? · How much can my company borrow? · Can a startup limited company get a loan? · Is loan interest tax-deductible? · Bank or alternative lender? · How fast can funds arrive?

---

### CALCULATOR 1 — `business-loan-calculator`  **[CALCULATOR — BUILD TASK, not an article]**
- **Tier:** cluster/tool · **Primary kw:** business loan calculator · **Volume:** 2,900 · **Intent:** transactional.
- **Secondary:** business loan calculator uk; commercial business loan calculator; calculate business loan.
- **Spec:**
  - **Inputs:** loan amount (£), annual interest rate (%), term (months/years), repayment type (capital+interest amortising | interest-only), optional arrangement fee (£ or %).
  - **Outputs:** monthly repayment, total interest, total repayable, APR-ish total cost incl. fee, amortisation schedule table (per-month balance/interest/principal).
  - **Formula:** standard amortising payment `M = P·r·(1+r)^n / ((1+r)^n − 1)` where `r` = monthly rate = annual/12, `n` = months. Interest-only = `P·r` per month + `P` at end. Total cost incl. fee added on top.
  - **Copy around it:** short intro (what it estimates, "indicative only, not a quote"), company-gate note, the standing fence paragraph, "how rate is decided" mini-section, FAQ (3–4).
  - **CTA:** results panel → broker panel ("Get real quotes for a limited-company loan", subtype `business-loan`). Company-gate on the lead form.
  - **Internal links:** business-loans-guide (parent), unsecured/secured-business-loans.
  - **Sources:** British Business Bank, gov.uk (for indicative-rate context only). No tax detail.
  - **Guardrail:** indicative company-borrowing estimate only; not a credit quote; company borrowers.
  - Build as an interactive component matching the other estate calculators; route separately from the content pipeline.

### CALCULATOR 2 — `asset-finance-calculator`  **[CALCULATOR — BUILD TASK, not an article]**
- **Tier:** cluster/tool · **Primary kw:** asset finance calculator · **Volume:** 210 · **Intent:** transactional.
- **Spec:**
  - **Inputs:** asset cost (£), deposit (£ or %), annual rate (%), term (months), balloon/residual (£, optional), product (HP | finance lease), VAT treatment toggle (finance the VAT or pay upfront).
  - **Outputs:** monthly rental/instalment, total payable, total finance cost, balloon due at end, effective cost. Optional tax-saving hint: "with full expensing / AIA a £X asset on HP could give ~£Y first-year CT deduction" (indicative, links to tax pillar — do NOT compute the tax authoritatively).
  - **Formula:** amortise (cost − deposit − PV of balloon) over `n` months at monthly rate; balloon handled as a final lump. Lease = level rentals over term.
  - **CTA:** results → broker panel (subtype `asset-finance`, "Get real asset-finance quotes for your company"). Company-gate.
  - **Internal links:** asset-finance-guide (parent), equipment-and-machinery-finance; tax cross-link AIA/full-expensing.
  - **Sources:** FLA, British Business Bank.
  - **Guardrail:** indicative company asset-finance estimate; not a quote; tax figure indicative only.

---

### CLUSTER — `invoice-factoring`
- **Tier:** cluster · **Primary kw:** invoice factoring · **Volume:** 1,300 · **Intent:** commercial.
- **UNIQUE ANGLE:** Factoring specifically (disclosed, lender runs credit control) vs the discounting sibling; the trailing-commission / termination-notice traps buyers miss.
- **H2s (6–10):** what factoring is · disclosed nature (customers notified) · advance % + service fee + discount margin · recourse vs non-recourse · credit control outsourced (pro/con) · **termination notices + trailing commission** (the trap) · factoring vs discounting · who it suits (thin credit-control teams). 
- **Worked example:** £30k invoice, 85% advance, 1.8% service fee + margin, 45 days to pay — total cost, then the 90-day termination-notice cost on exit.
- **Internal links:** UP invoice-finance-guide; ACROSS invoice-discounting, segments. **Sources:** UK Finance, British Business Bank, FCA Art 36A. **CTA:** panel `invoice-finance`. **Guardrail:** company debtor books. **FAQ:** Will customers know? · Recourse or non-recourse? · What's trailing commission? · How do I exit a factoring agreement? · Factoring vs discounting cost?

### CLUSTER — `merchant-cash-advance`
- **Tier:** cluster · **Primary kw:** merchant cash advance · **Volume:** 1,300 · **Intent:** commercial.
- **UNIQUE ANGLE:** Advance against future card takings repaid as a % of daily settlement — for card-led companies (retail, hospitality, ecom). **Regulated-variant fence is critical:** company MCA unregulated; sole-trader/individual MCA can be regulated consumer credit → route away.
- **H2s (6–10):** what an MCA is · how repayment works (holdback % of card takings) · factor rate vs APR (why it's expensive) · who it suits (card-heavy company) · **sole-trader MCA can be regulated — company only here** · MCA vs revolving credit vs invoice finance · costs + total-cost worked example · red flags. 
- **Worked example:** £40k advance, 1.3 factor rate → £52k repayable, 15% holdback on £8k/mo card takings — show payback period + effective annualised cost vs a term loan.
- **Internal links:** UP business-loans-guide; ACROSS revolving-credit-facility, invoice-finance-for-hospitality/-ecommerce. **Sources:** BBB, FCA RAO Art 36A + PERG 17. **CTA:** panel `merchant-cash-advance`; qualifier: monthly card takings. **Guardrail:** company MCA only; sole traders → FCA-authorised firm. **FAQ:** Is an MCA regulated? · How is it repaid? · What's a factor rate? · MCA vs business loan cost? · Can a sole trader get one (route)? · Does it need a personal guarantee?

### CLUSTER — `unsecured-business-loans`
- **Tier:** cluster · **Primary kw:** unsecured business loan · **Volume:** 1,600 (KD0) · **Intent:** commercial.
- **UNIQUE ANGLE:** No asset security, so approval rests on trading strength + (usually) a personal guarantee. The PG reality is the honest hook.
- **H2s:** what unsecured means · how lenders price risk without security · **personal guarantees explained** · eligibility (turnover, trading history) · typical amounts/terms/rates · unsecured vs secured vs asset finance · when unsecured is worth the higher rate · how to apply.
- **Worked example:** £50k unsecured vs £50k secured — rate/term/total-cost delta and the PG exposure trade-off.
- **Internal links:** UP business-loans-guide; ACROSS secured-business-loans, small-business-loans, business-loan-calculator. **Sources:** BBB, gov.uk, FCA Art 60C. **CTA:** panel `business-loan`. **Guardrail:** company borrowing £25k+; PG is company-director not consumer. **FAQ:** Do I need a personal guarantee? · How much can I borrow unsecured? · Unsecured vs secured cost? · What credit checks apply? · Can a new company get one?

### CLUSTER — `startup-business-loans`
- **Tier:** cluster · **Primary kw:** start up business loan · **Volume:** 6,600 · **Intent:** commercial.
- **UNIQUE ANGLE:** Funding a NEW company. **Critical fence:** the British Business Bank **Start Up Loan is a PERSONAL loan to the individual (up to £25k, personal liability), NOT a company facility** — explain it accurately, state we do not introduce the personal scheme, and route company startups to unsecured/asset-backed COMPANY finance on the panel.
- **H2s:** funding options for a new limited company · **the government Start Up Loan explained (personal, not company — route)** · unsecured company startup loans · asset finance for startups · why startups struggle to borrow + how to improve odds · directors' personal guarantees · alternatives (invoice finance once trading, grants) · how to apply.
- **Worked example:** New Ltd needs £40k for fit-out + van: SUL personal route (max £25k personal) vs a £40k company facility (asset finance on the van + unsecured for fit-out) — show why the company route scales.
- **Internal links:** UP business-loans-guide; ACROSS unsecured-business-loans, asset-finance-guide, recovery-and-growth-guarantee-scheme. **Sources:** British Business Bank Start Up Loans (scheme terms), gov.uk, FCA Art 36A. **CTA:** panel `business-loan`; secondary accountant (incorporation/structure). **Guardrail:** SUL is a personal scheme we do NOT introduce; company facilities only. **FAQ:** Is a Start Up Loan a company or personal loan? · Can a brand-new Ltd borrow? · How much can a startup get? · Do I need a personal guarantee? · Startup loan vs asset finance?

### CLUSTER — `small-business-loans`
- **Tier:** cluster · **Primary kw:** small business loan · **Volume:** 5,400 · **Intent:** commercial.
- **UNIQUE ANGLE:** The SME-sized company slice — amounts, lenders and eligibility calibrated to small limited companies; the practical "what a small company actually gets approved for" page.
- **H2s:** what counts as a small-business loan · amounts/terms typical for SMEs · secured vs unsecured for small companies · bank vs alternative lenders · eligibility for small companies (accounts, turnover) · government-backed options · cost + worked example · how to apply.
- **Worked example:** £30k over 3 years for a 2-year-old company, £250k turnover — indicative rate band + monthly cost + what strengthens the application.
- **Internal links:** UP business-loans-guide; ACROSS unsecured-business-loans, business-loan-calculator, working-capital-finance. **Sources:** BBB Small Business Finance Markets, gov.uk, FCA Art 60C. **CTA:** panel `business-loan`. **Guardrail:** small limited companies; £25k+; not personal. **FAQ:** How much can a small company borrow? · Best lender for small business loans? · Do I qualify with 1 year's accounts? · Secured or unsecured? · How fast is funding?

### CLUSTER — `secured-business-loans`
- **Tier:** cluster · **Primary kw:** secured business loan · **Volume:** 480 · **Intent:** commercial.
- **UNIQUE ANGLE:** Borrowing against company assets/property for larger sums / lower rates; the security, valuation and debenture mechanics.
- **H2s:** what secured means (charge/debenture) · what can be used as security (property, plant, debtors, all-assets) · why rates are lower + amounts higher · valuation + legal process/timeline · risks if you default · secured vs unsecured vs asset refinance · who it suits · how to apply.
- **Worked example:** £250k secured on commercial premises vs £250k unsecured (likely declined or far pricier) — rate/term/total-cost delta.
- **Internal links:** UP business-loans-guide; ACROSS unsecured-business-loans, asset-finance-guide (refinance). **Sources:** BBB, gov.uk, FCA Art 36A. **CTA:** panel `business-loan`; qualifier: security available. **Guardrail:** company secured lending; business-purpose only (never residential/consumer). **FAQ:** What can I use as security? · What's a debenture? · Secured vs unsecured rates? · How long does a secured loan take? · What happens if my company defaults?

### CLUSTER — `working-capital-finance`
- **Tier:** cluster · **Primary kw:** working capital finance · **Volume:** 70 · **Intent:** commercial.
- **UNIQUE ANGLE:** The umbrella "bridge the cash-flow gap" page — maps a company's working-capital cycle to the right product (overdraft, RCF, invoice finance, MCA, short-term loan). A router page.
- **H2s:** what working capital finance is · the working-capital cycle (stock → debtors → creditors) · product map (RCF, invoice finance, trade finance, MCA, short-term loan) · how to choose by cause of the gap · seasonal vs structural gaps · cost comparison · how to apply.
- **Worked example:** company with a 45-day cash gap on £100k monthly turnover — which product fits and the cost of each.
- **Internal links:** UP business-loans-guide; ACROSS invoice-finance-guide, revolving-credit-facility, vat-loans, merchant-cash-advance. **Sources:** BBB, UK Finance, gov.uk. **CTA:** panel `working-capital`. **Guardrail:** company facilities. **FAQ:** What is working capital finance? · Which product for a seasonal gap? · Overdraft vs RCF? · How much can I get? · Is it regulated?

### CLUSTER — `vat-loans`
- **Tier:** cluster · **Primary kw:** vat loan · **Volume:** 480 (£82 CPC) · **Intent:** commercial.
- **UNIQUE ANGLE:** Short-term facility to spread a quarterly VAT (or CT) bill — seasonal, quarter-end demand spikes. FINANCE angle; the VAT rule itself is one hop to the tax pillar.
- **H2s:** what a VAT loan is · why companies use them (quarterly bill lumpiness) · how they work (short term, 3–12 months) · cost (rate, arrangement fee) · VAT loan vs Time to Pay with HMRC · also for corporation-tax bills · when it makes sense · how to apply.
- **Worked example:** £40k quarterly VAT bill spread over 3 months at a typical rate + arrangement fee vs the cash-flow hit of paying in one go; note HMRC Time to Pay as the alternative.
- **Internal links:** UP business-loans-guide; ACROSS working-capital-finance, revolving-credit-facility. **Tax cross-links:** VAT threshold/registration `/blog/vat-and-making-tax-digital/vat-threshold-2025-26`; CT bill `/blog/corporation-tax/corporation-tax-marginal-relief-2025-26`. **Sources:** BBB, gov.uk VAT payments/Time to Pay, HMRC VAT Notice 700. **CTA:** panel `vat-loan`; seasonal (quarter-end). **Guardrail:** company tax-bill funding; not personal. **FAQ:** What is a VAT loan? · VAT loan vs HMRC Time to Pay? · Can I finance a corporation-tax bill too? · How much does a VAT loan cost? · How quickly can it be arranged?
- **NOTE:** the CSV `corporation-tax-loans` topic (volume 0) was NOT staged — fold CT-bill funding into this page (H2 "also for corporation-tax bills").

### CLUSTER — `invoice-discounting`
- **Tier:** cluster · **Primary kw:** invoice discounting · **Volume:** ~0 (long-tail; CID) · **Intent:** commercial.
- **UNIQUE ANGLE:** Confidential invoice discounting (CID) — you keep your own credit control and customers don't know, vs factoring. For companies with a capable finance team + stronger covenant.
- **H2s:** what invoice discounting is · **confidential nature (customers unaware)** vs factoring · you run your own credit control · eligibility (stronger covenant, turnover, systems) · advance % + margin · CID vs factoring vs selective · supply-chain finance distinction · how to apply.
- **Worked example:** £500k ledger on CID, 90% advance, self-managed credit control — cost vs factoring for the same ledger; what turnover/systems lenders require for CID.
- **Internal links:** UP invoice-finance-guide; ACROSS invoice-factoring, segments. **Sources:** UK Finance, BBB, FCA Art 36A. **CTA:** panel `invoice-finance`; qualifier: turnover (CID needs scale). **Guardrail:** company debtor books. **FAQ:** Will my customers know (no)? · Discounting vs factoring? · What turnover do I need for CID? · Is it cheaper than factoring? · Recourse?

### CLUSTER — `equipment-and-machinery-finance`
- **Tier:** cluster · **Primary kw:** equipment finance · **Volume:** ~0 (long-tail) · **Intent:** commercial.
- **UNIQUE ANGLE:** Business-wide CANONICAL for equipment/machinery finance (HP vs lease vs refinance for kit), tied to AIA/full expensing. Sector equipment pages (dental chairs, construction plant) link INTO this — do not duplicate them here.
- **H2s:** what equipment finance is · HP vs finance lease vs operating lease for equipment · new vs used equipment (full-expensing needs new/unused) · the tax decision (AIA/full expensing vs lease rentals — one para each, cross-link) · refinancing owned equipment · soft vs hard assets · by sector (link out to dental/construction/manufacturing) · how to apply.
- **Worked example:** £80k packaging line on HP with full expensing (100% first-year deduction, ~£20k CT saved at 25%) vs 4-year lease — cash-flow + tax-timing comparison.
- **Internal links:** UP asset-finance-guide; ACROSS asset-finance-calculator, invoice-finance-for-manufacturing. Cross-site: dental-equipment-and-chair-finance (dentists), construction plant (construction-cis). **Tax cross-links:** AIA + full-expensing + capital-allowances-2026-27. **Sources:** FLA, BBB, HMRC CA23000 (via tax pillar). **CTA:** panel `asset-finance`; qualifier: equipment type/value, new/used. **Guardrail:** company equipment purchases. **FAQ:** HP or lease for equipment? · Can I claim full expensing on financed equipment? · New vs used for tax? · Can I refinance machines I own? · What's the typical term?

### SUPPORTING — `recovery-and-growth-guarantee-scheme`
- **Tier:** supporting · **Primary kw:** growth guarantee scheme · **Volume:** ~0 · **Intent:** commercial.
- **UNIQUE ANGLE:** Plain-English guide to the British Business Bank **Growth Guarantee Scheme** (successor to Recovery Loan Scheme) — how the 70% government guarantee to the lender works, what it does and doesn't mean for the borrower, eligibility, accredited lenders.
- **H2s:** what the Growth Guarantee Scheme is · how the guarantee works (backs the LENDER, borrower still fully liable + PG possible) · eligibility (UK SME, turnover cap, viability) · facility types covered (term, overdraft, invoice/asset finance) · amounts + terms · how to access (accredited lenders) · GGS vs a standard commercial loan · how to apply.
- **Worked example:** £150k GGS-backed term loan — clarify the guarantee protects the lender, the company still repays in full and may still give a PG (common misconception).
- **Internal links:** UP business-loans-guide; ACROSS small-business-loans, startup-business-loans. **Sources:** British Business Bank (Growth Guarantee Scheme — primary), gov.uk, FCA Art 36A. **CTA:** panel `business-loan` (via accredited lenders). **Guardrail:** company borrowing; the guarantee does not remove company/PG liability. **FAQ:** Does the guarantee mean I don't repay? · Am I eligible for GGS? · Which lenders offer it? · Will I still need a personal guarantee? · GGS vs a normal loan?

### SUPPORTING — `revolving-credit-facility`
- **Tier:** supporting · **Primary kw:** revolving credit facility · **Volume:** ~0 · **Intent:** commercial.
- **UNIQUE ANGLE:** Flexible drawdown/repay credit line (like a business overdraft alternative) — pay interest only on what's drawn; for lumpy/seasonal cash needs.
- **H2s:** what an RCF is · how it works (facility limit, draw/repay, interest on drawn balance) · RCF vs overdraft vs term loan · costs (non-utilisation fee, arrangement fee, interest) · eligibility · when an RCF beats a term loan · seasonal use cases · how to apply.
- **Worked example:** £100k RCF, average £30k drawn across the year — interest on drawn balance + non-utilisation fee vs a £100k term loan's full interest cost.
- **Internal links:** UP business-loans-guide; ACROSS working-capital-finance, merchant-cash-advance. **Sources:** BBB, gov.uk, FCA Art 60C. **CTA:** panel `revolving-credit`. **Guardrail:** company facilities. **FAQ:** RCF vs overdraft? · Do I pay interest on the whole limit? · What's a non-utilisation fee? · Can a small company get an RCF? · RCF vs term loan?

---

## G. SEGMENT PAGES — shared template + the 10 differentiators (§E matrix)

The 10 `invoice-finance-for-<sector>` pages share this skeleton. Each writer takes their §E matrix row for the ONE distinguishing axis, the fit verdict, and the unique worked example, then fills the skeleton so no two pages read alike. All: tier `supporting`, intent `commercial`, volume ≈0 (long-tail sector intent), category `Business Finance`, company-gate, faceless, no em-dashes.

**Shared H2 skeleton (6–9):**
1. `<Sector>` cash-flow reality — LEAD with the §E distinguishing axis (payment terms, contract structure, seasonality, debtor concentration). This section MUST be unique per sector.
2. Why invoice finance fits (or does NOT — honest fit verdict from §E) for `<sector>` companies.
3. Factoring vs discounting for this sector (per §E fit column).
4. How much you could release (sector-specific worked example from §E).
5. Eligibility for `<sector>` companies (company-gate, B2B debtor book, turnover).
6. What to watch (sector-specific: retentions/CIS for construction, marketplace reserves for ecom, TUPE for cleaning, etc.).
7. Alternatives if invoice finance is the wrong tool (route: MCA/RCF/working-capital for card-led sectors).
8. How to apply.

**Shared internal links:** UP to `invoice-finance-guide`; ACROSS to `invoice-factoring` + `invoice-discounting`; to the relevant OTHER product where the honest-fit verdict routes away (hospitality/ecommerce/dentists → merchant-cash-advance / working-capital-finance / revolving-credit-facility). Cross-site where noted (dentists → dentists practice-finance hub; construction → construction-cis CIS pages; manufacturing → asset-finance-guide + full-expensing).

**Shared sources (4–6):** UK Finance (invoice finance / ABL stats), British Business Bank, gov.uk business finance, FCA RAO Art 36A (company framing) + one sector-specific authority where it exists (e.g. CIS/HMRC for construction, SIA for security context, FLA for haulage asset side).

**Shared lead-CTA:** broker panel, subtype `invoice-finance`, sector tag = the segment. Qualifiers: limited company? turnover band, debtor book value, main customer type (B2B?). Secondary CTA: accountant only for the tax/structuring aside. For "wrong-tool" sectors (hospitality/ecom/dentists) the CTA also offers the routed alternative product.

**Shared guardrail one-liner:** company B2B debtor books only; introduce to panel; fence sole traders and B2C/card-only businesses; no personal/consumer copy; no IAR.

**Per-sector uniqueness is enforced by §E** — the axis, the fit verdict, and the worked example differ for all 10. FAQ stems must also differ; derive 5 per page from the sector axis, e.g.:
- recruitment: Can invoice finance cover my weekly payroll? · Does it work for temp and perm? · What is pay-and-bill? · How much of my invoices can I release? · Will my clients know?
- construction: Does invoice finance work with retentions? · Can I finance applications-for-payment? · How does CIS affect it? · Will factoring cover pay-when-paid contracts? · Why do some lenders decline construction?
- ecommerce: Can I finance Amazon/marketplace payouts? · Does invoice finance suit B2C ecommerce? · What about card settlement gaps? · Do I qualify with wholesale invoices? · Invoice finance vs revenue-based finance?
- hospitality: Does invoice finance work for a restaurant (mostly no)? · Which finance suits card takings? · Can event/contract caterers use factoring? · How does seasonality affect it? · Invoice finance vs MCA?
- dentists: Does invoice finance suit a dental practice (usually no)? · What about dental labs/suppliers? · Is NHS UDA income financeable? · What finance do practices actually use? · Company-gate?
- haulage: Can invoice finance cover diesel costs? · What are transport factoring's fuel advances? · Does it work with 90-day shipper terms? · Should I asset-finance the trucks separately? · Client concentration risk?
- wholesale: Can I combine invoice finance with stock finance? · Does it help with seasonal stock builds? · How does spread of retail customers affect approval? · What advance rate? · Import lead-time funding?
- manufacturing: Can I finance work-in-progress? · Does invoice finance cover export invoices? · How do I fund raw materials before invoicing? · Combine with asset finance + full expensing? · Long production lead times?
- cleaning: Can factoring cover my weekly wage bill? · How does TUPE affect cash on contract wins? · What if a few FM primes dominate my book? · Will they chase my clients for me? · Advance rate for cleaners?
- security: Can it fund my weekly guard payroll? · Does client concentration reduce my advance? · SIA-licensed guarding and finance? · Public-sector clients paying at 60 days? · Same-day payroll funding?

---

## H. BUILD ORDER (publish_priority from staging)

1. Pillars first (priority 10): invoice-finance-guide, asset-finance-guide, business-loans-guide — establish hub + internal-link targets.
2. business-loan-calculator (9), then high-volume clusters: startup-business-loans (6,600), small-business-loans (5,400), unsecured-business-loans (1,600), invoice-factoring (1,300), merchant-cash-advance (1,300).
3. asset-finance-calculator (8), secured/working-capital/vat/discounting/equipment/GGS/RCF.
4. 10 sector segments last (they need the pillars + factoring/discounting live to link up to).

---

**End of brief.** Everything above is fixed; writers do not re-decide angle, links, sources, calculator specs, the company-gate, or lead routing. Questions → escalate, do not improvise the reg framing.
