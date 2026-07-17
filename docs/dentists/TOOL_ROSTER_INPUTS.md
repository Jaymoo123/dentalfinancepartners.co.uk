# Dentists Tool Roster Inputs
**Site:** Dental Finance Partners (dentalfinancepartners.co.uk)
**Date:** 2026-07-17
**Purpose:** Data inputs to design a ~12-tool calculator fleet (currently 5 free + 5 premium = 10 registered, but only 5 in the public gallery registry)

---

## 1. Current Tool Inventory

### Public gallery tools (`src/lib/tools/registry.ts`)

| Slug | Name | Category | What it computes |
|------|------|----------|-----------------|
| `uda-value` | UDA Value Calculator | Practice accounting | Effective UDA rate vs 2025/26 regional benchmarks; real-terms erosion since contract signing |
| `associate-take-home` | Associate Take-Home Calculator | Associate tax | Net take-home for sole-trader associate: fee split, lab fees, NHS Pension, 2025/26 income tax + NI |
| `practice-valuation` | Practice Valuation Calculator | Practice accounting | EBITDA multiple range by practice mix (NHS/private), region, buyer demand; plus tangible assets |
| `locum-structure` | Locum Structure Comparison | Associate tax | Sole trader vs Ltd vs umbrella on day rate; 2025/26 net comparison |
| `principal-extraction` | Principal Extraction Calculator | Practice accounting | Partnership vs Ltd profit extraction; pension input; NHS Pension impact flag |

### Premium (R2 inline) tools (`src/lib/tools/premium/registry.ts`)

| toolId | Name | What it computes |
|--------|------|-----------------|
| `associate-take-home-premium` | Associate Take-Home (premium) | Enhanced version of public tool |
| `principal-extraction-premium` | Principal Extraction (premium) | Enhanced version of public tool |
| `practice-purchase-premium` | Practice Purchase | Affordability + valuation: deposit, loan, EBITDA cover ratio, purchase price sense-check |
| `practice-sale-premium` | Practice Sale | Valuation + CGT/BADR net proceeds (BADR 18% from 6 Apr 2026, £1m lifetime limit) |
| `uda-nhs-premium` | NHS UDA Planner | UDA effective value, benchmark, real-terms erosion (expanded SDR context) |

**Gap:** No public-gallery tool for practice purchase, practice sale/CGT, or NHS pension annual allowance. These exist only as premium inline tools or not at all.

---

## 2. Query Clusters Table

### GSC data (90-day window, dentists site)

| Cluster | Example queries | Total impressions (GSC) | Tool intent? |
|---------|----------------|------------------------|--------------|
| **Dental accountant — head terms** | "accountants for dentists" (1,300), "dental accountants" (1,050), "specialist dental accountants" (805), "dental accounting" (361), "accountant for dentists" (250), "dentist accountants" (235), "dental accountant" (194) | ~4,200+ | No (brand/service intent) |
| **UDA / NHS contract** | "nhs uda rates" (167), "uda value checker" (91), "uda rate" (20), "what is a uda" (19), "nhs uda" cluster | ~350+ | YES — calculator exists (uda-value) |
| **Practice valuation / goodwill** | "dental practice valuation uk" (103), "how much is my dental practice worth wales/uk/london" (43/35/32), "dental practice goodwill values" (13), "dental practice valuation formula uk" (13), "ebitda dental practices" (2) | ~260 | YES — calculator exists (practice-valuation) |
| **Selling a dental practice / CGT** | "selling a dental practice taxes" (67), "selling a dental practice taxes uk" (52), "selling a dental practice taxes manchester" (47), "selling a dental practice taxes wales/london/leeds/birmingham" (+116) | ~330 | YES — premium only (practice-sale-premium); NO public tool |
| **Buying a dental practice** | "goodwill funding practice purchase" (44), "how much do dental practices sell for uk" (27), "buying a dental practice checklist manchester" (27) | ~100+ | YES — premium only; NO public tool |
| **Accountant location / local** | "specialist dental accountants london" (130), "dental accountants london" (69), "dental accountants manchester" (24), "dental tax accountant london" (30) | ~350+ | No (geo intent) |
| **Software / cloud accounting** | "accounting software for dental clinics" (131), "cloud accounting for dentists" (43), "xero dental accounting" (13), "dental practice xero" (8) | ~200 | No (product intent) |
| **Take-home / salary** | "dental practice owner salary" (18), "how much does a dental practice owner make uk" (12), "dental practice owner salary uk" (7), "clinic owner take home pay uk" (10) | ~60 | YES — partial (principal-extraction) |
| **Associate structure / tax** | "dentist self employed or limited company" (20), "associate dentist accounting" (8), "accountants for associate dentists" (19) | ~60 | YES — covered by locum-structure + associate-take-home |
| **NHS Pension / superannuation** | "ptm044100 tax relief contributions general practitioners and dentists" (14), "pension advice for dentists" (6), "pensions for dentists" (2), "nhs dentist pension calculator" (Bing: 16) | ~40 | YES — no public tool exists |
| **Tax planning / deductions** | "tax planning for dentists" (9), "tax for dentists" (11), "tax tips for dentists" (4), "dentist tax deduction checklist" (1), "cpd allowance for dentists" (7) | ~40 | Partial — no deduction/savings calculator |
| **Locum / day rate** | "locum dentist accountants" (23) | ~25 | YES — locum-structure exists |

### Bing data (dentists site)

| Cluster | Top queries | Total impressions (Bing) | Tool intent? |
|---------|------------|-------------------------|--------------|
| **Scotland SDR / remuneration** | "sdr dental scotland" (73), "sdr scotland" (41), "statement of dental remuneration" (29), "sdr dental scotland 2026" (26) | ~250+ | YES — no tool; Scotland uses SDR not UDAs |
| **NHS bands / patient charges** | "nhs dental charges 2026" (39), "nhs bands for dental treatment" (21), "nhs dentist banding" (15) | ~120 | Partial (patient-facing, not finance tool) |
| **Superannuation / pension calc** | "dentist superannuation uk" (12, 8 clicks), "how to calculate a dentists superannuation earnings" (10), "nhs dentist pension calculator" (16), "how do you calculate the nhs superannuation for dentist" (6) | ~50 | YES — clear calculator gap |
| **Dental tax** | "dental tax calculator" (6, 3 clicks), "superannuation tax bracket dentist" (8) | ~15 | YES — tool gap |
| **Associate pay / structure** | "how does associate dentist pay work in the private sector uk" (8, 4 clicks), "how do i report associate dentist income" (8, 8 clicks) | ~20 | Partial |
| **Pension + annual allowance** | "ca you split pension across nhs and private sipp if annual allowance is not used by nhs pension" (6, 3 clicks), "is a associate dentist nhs pension relief at source or net pay arrangement" (6, 6 clicks) | ~15 | YES — annual allowance / taper tool gap |
| **Goodwill / practice finance** | "dental goodwill lending" (7), "goodwill funding practice purchase" (GSC: 44) | ~10 | YES — buy affordability gap |

**Key observation:** The Bing audience skews toward Scotland SDR queries and NHS pension/superannuation calculation — neither is served by any existing tool.

---

## 3. Competitor Tools Table

**Live-verified via DataForSEO 2026-07-17** (Google Organic /v3/serp/google/organic/live/advanced, location_code 2826 UK, language en, depth 10, 9 API calls, total cost $0.018). Previous Serper-based knowledge section replaced below.

### 3a. Per-query SERP breakdown

#### Q1: "sdr scotland dental calculator"
Zero interactive tools in top 10. All results are government PDFs, official NHS Scotland SDR pages, BDA news articles, and practice websites. One patient-facing NHS cost calculator (nidentalfinder.co.uk #9) is unrelated to SDR remuneration.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | scottishdental.nhs.scot | article | Official SDR index page |
| 2 | publications.scot.nhs.uk | article | SDR amendment PDFs |
| 3 | bda.org | article | SDR news update |
| 4 | news.dentally.com | article | NHS Scotland reform summary |
| 5 | scottishdental.nhs.scot | article | PDF amendment |
| 6 | levenmouthdental.com | article | Practice fee schedule page |
| 7 | publications.scot.nhs.uk | article | Publication |
| 8 | nhsdentistcost.com | article | Patient cost info |
| 9 | nidentalfinder.co.uk | TOOL | NHS patient cost calculator (unrelated) |

**Verdict: CONFIRMED WHITESPACE** -- no SDR remuneration calculator exists anywhere in top 10.

---

#### Q2: "nhs pension annual allowance calculator dentist"
Multiple generic NHS/BMA tools exist, none dental-specific.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | nhsemployers.org | TOOL | Annual allowance ready reckoner (generic NHS, not dental) |
| 2 | nhsbsa.nhs.uk | article | AA guidance page |
| 3 | nhsbsa.nhs.uk | TOOL | Pension Input Amount example calculations |
| 4 | wesleyan.co.uk | article | NHS pension + AA article |
| 5 | bda.org | TOOL | BDA pensions info page (links out, not an interactive calc) |
| 6 | nhspensionaatax.org | article | AA tax ready reckoner (general NHS) |
| 7 | bma.org.uk | TOOL | BMA NHS pension AA tool (GP/hospital doctor focused) |
| 8 | djh.co.uk | TOOL | DJH NHS Pension Annual Allowance 2022-23 (article flagged as tool by title; outdated) |
| 9 | legalandmedical.co.uk | TOOL | Generic overpayment checker |

**Verdict: CONTESTED** -- nhsemployers.org ready reckoner + BMA tool compete, but both are generic NHS (not dental-specific; no SDR/associate earnings input, no dental tier rates). DJH result is an article, not an interactive calculator. A dental-specific taper tool with dentist adjusted-income logic remains unserved.

---

#### Q3: "dentist superannuation calculator"
Multiple tools exist including NHSBSA pension estimator and a niche dental accountant page.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | nhsbsa.nhs.uk | TOOL | NHS pension estimator (generic, not dental-specific input) |
| 2 | bda.org | article | BDA pensions info |
| 3 | wesleyan.co.uk | TOOL | Retirement advice + modeller (general, not dental superannuation formula) |
| 4 | davisllp.co.uk | article | NHS Superannuation for Dentists explained |
| 5 | hscpensions.hscni.net | TOOL | HSC Pension calculators (Northern Ireland, not England/Scotland) |
| 6 | partialretirementcalculator.nhsbsa.nhs.uk | TOOL | NHSBSA partial retirement calculator |
| 7 | nhspensioncalc.datamek.co.uk | TOOL | Generic NHS pension calculator |
| 8 | dentalaccountantsharrow.co.uk | TOOL | NHS Superannuation and Annual Allowance page (dental accountant, but Harrow local; likely article not interactive) |
| 9 | facebook.com | article | Facebook post about estimating NHS pension |

**Verdict: CONTESTED** -- NHSBSA estimator + generic NHS calculators dominate, but none model the dental-specific superannuation earnings formula (practitioner pensionable pay, tier contribution rates, SDR vs UDA distinction). dentalaccountantsharrow.co.uk at #8 is the only dental-specialist result; appears to be an article not an interactive tool. A proper dental superannuation calculator with practitioner-specific tiers remains unserved by any dental accountant.

---

#### Q4: "associate dentist take home pay calculator"
DOMINATED by interactive tools -- at least 6 true calculators in top 10.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | salarydr.com | TOOL | Dental Salary Calculator 2026 |
| 2 | savingtool.co.uk | TOOL | Dentist Pay UK 2026/27 Take-Home Calculator |
| 3 | a2zaccounting.co.uk | TOOL | Associate Dentist Tax Calculator 2026/27 (NHS + Private) -- dental accountant competitor |
| 4 | assets.publishing.service.gov.uk | TOOL | HMRC take-home pay comparisons for medical/dental officers |
| 5 | uktakehomepay.co.uk | article | Dentist salary UK article |
| 6 | bonded-dental.com | TOOL | Associate Dentist Take-Home Calculator |
| 7 | reddit.com | TOOL | Reddit dental associate contract calculator spreadsheet |
| 8 | mintydental.com | TOOL | Dental Associate Pay Calculator (collections + production) |
| 9 | uktaxcalculators.co.uk | TOOL | Generic dentist salary calculator |

**Verdict: DOMINATED** -- at least 6 interactive tools in top 10, including a specialist dental accountant (a2zaccounting.co.uk #3). Our existing associate-take-home tool must compete on quality, dental-specific inputs (NHS Pension tier, lab fee split), and brand.

---

#### Q5: "dental practice purchase calculator uk"
Mixed -- several tools present but mostly generic loan/finance calculators, not dental-specialist affordability tools.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | ftafinance.co.uk | TOOL | Generic dental loan calculator (patient finance, not practice purchase) |
| 2 | pfmdental.co.uk | TOOL | Practice sales guide (article + valuation) |
| 3 | wesleyan.co.uk | article | Buying a dental practice guide |
| 4 | samera.co.uk | TOOL | Dental clinic valuation calculator |
| 5 | highstreetsmiles.co.uk | TOOL | Dental finance calculator (patient payment plans, not practice purchase) |
| 6 | companyvaluationcalculator.com | TOOL | Dental practice valuation UK |
| 7 | hsdeducation.co.uk | TOOL | Practice buyer checklist (article flagged by URL) |
| 8 | cromerhousedentalcare.com | TOOL | Dental finance calculator (patient payment, not practice purchase) |
| 9 | wecovr.com | TOOL | Dental cost estimator (insurance, not practice purchase) |

**Verdict: CONTESTED** -- tools present but 6/9 are patient-facing finance calculators, not practice purchase affordability tools. samera.co.uk (#4) and companyvaluationcalculator.com (#6) are valuation-side, not buy-affordability. No dental accountant-grade practice purchase affordability tool (EBITDA cover ratio, deposit gap, goodwill loan) appears. Gap remains for dental-accountant-specific practice purchase tool.

---

#### Q6: "dental practice valuation calculator"
Well-contested -- multiple dedicated valuation tools including US-based and UK specialists.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | samera.co.uk | TOOL | Dental clinic value calculator (UK) |
| 2 | practicetransitionsgroup.com | TOOL | Dental Practice Valuation Calculator (US) |
| 3 | dentistadvisors.com | TOOL | Free Dental Practice Value Calculator (US) |
| 4 | youtube.com | TOOL | Valuation calculator walkthrough video |
| 5 | bakertilly.com | article | Guide to dental practice valuation methods |
| 6 | companyvaluationcalculator.com | TOOL | Dental practice valuation UK |
| 7 | dentalelite.co.uk | article | Dental practice valuation guide |
| 8 | pfmdental.co.uk | article | Dental practice valuation by experts |
| 9 | exitwise.com | TOOL | Dental practice valuation tool |

**Verdict: DOMINATED** -- 6 interactive tools in top 10, including samera.co.uk (UK dental specialist). Our existing practice-valuation tool competes; differentiation must come from NHS/private mix granularity and regional adjustment inputs that generic tools lack.

---

#### Q7: "dentist incorporation calculator"
Sparse tools; mostly articles. Our own site appears at #5.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | a2zaccounting.co.uk | TOOL | Associate Dentist Tax Calculator 2026/27 (dental accountant competitor) |
| 2 | thorntons-law.co.uk | article | Dental practice incorporation guide |
| 3 | wesleyan.co.uk | article | Incorporating a dental practice |
| 4 | bda.org | TOOL | BDA operating costs tool (not incorporation) |
| 5 | dentalfinancepartners.co.uk | article | Sole Trader vs Ltd Company: Dentist Guide 2026/27 -- OUR SITE |
| 6 | stat.io | TOOL | Dental ROI Calculator (US) |
| 7 | assets.publishing.service.gov.uk | TOOL | HMRC take-home comparisons |
| 8 | smallbizaccounts.co.uk | article | Incorporating a dental practice: tax, goodwill + CGT |
| 9 | djh.co.uk | article | Company incorporation: is this the right choice? |

**Verdict: CONFIRMED WHITESPACE** -- only a2zaccounting.co.uk (#1) has a dental-specific tool, and it is a take-home calculator (not a true incorporation comparison with NHS Pension cost modelled). Our own content ranks at #5 as an article. An interactive incorporation calculator with dental-specific NHS Pension impact would be the first of its kind from a dental accountant.

---

#### Q8: "dental practice sale capital gains tax"
Fully article-dominated. Zero interactive tools.

| # | Domain | Type | Notes |
|---|--------|------|-------|
| 1 | nasdal.org.uk | article | NASDAL taxation of practice sales guide |
| 2 | ft-associates.com | article | CGT change 2026 dental article |
| 3 | dentalpracticesales.co.uk | article | BADR/CGT guide |
| 4 | bda.org | article | Tax guidance for dentists |
| 5 | ddslawyers.com | article | Tax implications of dental practice sale |
| 6 | armstrongwatson.co.uk | article | Retirement + selling a dental practice |
| 7 | library.croneri.co.uk | article | Dental practice purchases and sales |
| 8 | a2zaccounting.co.uk | article | Dental practice financial guide (VAT, tax, profit) |
| 9 | smallbizaccounts.co.uk | article | Incorporating + CGT article |

**Verdict: CONFIRMED WHITESPACE** -- zero interactive tools in top 10. All 9 results are articles or guides. A dental practice sale CGT / net proceeds calculator (BADR 18%, £1m lifetime limit, income tax on held cash) would be the only tool in this SERP.

---

### 3b. Known competitor tool inventory (updated from live SERP)

| Tool name | Owner | Query it ranks on | What it computes | Dental-specific? |
|-----------|-------|------------------|------------------|--------------------|
| **Associate Dentist Tax Calculator 2026/27** | a2zaccounting.co.uk | associate take-home (#3), incorporation (#1) | Take-home for NHS + private associate; tax year 2026/27 | YES -- dental accountant competitor; key threat |
| **Dental Salary Calculator 2026** | salarydr.com | associate take-home (#1) | Generic salary take-home | No |
| **Dentist Pay Take-Home Calculator** | savingtool.co.uk | associate take-home (#2) | Dentist pay 2026/27 | Partial |
| **Associate Dentist Take-Home Calculator** | bonded-dental.com | associate take-home (#6) | Collections + production based | Partial |
| **Dental Associate Pay Calculator** | mintydental.com | associate take-home (#8) | Collections + production | Partial |
| **Clinic Value Calculator** | samera.co.uk | practice purchase (#4), valuation (#1) | Practice valuation (EBITDA × multiple) | YES -- dental specialist |
| **Dental Practice Valuation Calculator** | companyvaluationcalculator.com | valuation (#6), purchase (#6) | EBITDA valuation | Partial (generic company calc) |
| **NHS Pension Estimator** | nhsbsa.nhs.uk | superannuation (#1), AA (#2, #3) | Pension projection + partial retirement | Generic NHS, not dental |
| **Annual Allowance Ready Reckoner** | nhsemployers.org | AA calculator (#1) | AA assessment tool | Generic NHS |
| **BMA NHS Pension AA Tool** | bma.org.uk | AA calculator (#7) | AA tax charge modeller | GP/hospital focused |
| **NHS Pension Calculator** | nhspensioncalc.datamek.co.uk | superannuation (#7) | Generic pension calculation | Generic NHS |

**Gap summary (live-verified 2026-07-17):**

| Claimed gap | Verdict | Key competitors |
|-------------|---------|-----------------|
| Scotland SDR remuneration calculator | CONFIRMED WHITESPACE | None in top 10 |
| NHS pension annual allowance taper (dental-specific) | CONTESTED | nhsemployers.org ready reckoner + BMA tool (both generic NHS; no dental-specific inputs) |
| Superannuation earnings calculator (dental-specific) | CONTESTED | NHSBSA estimator exists but generic; dentalaccountantsharrow.co.uk at #8 is only dental entrant (article-level) |
| Associate take-home calculator | DOMINATED | a2zaccounting.co.uk (#3), bonded-dental.com (#6), salarydr.com (#1) -- at least 6 tools in top 10 |
| Practice purchase affordability (dental accountant-grade) | CONTESTED | Valuation tools present but patient-finance/generic; no EBITDA-cover + goodwill-loan calculator |
| Practice valuation calculator | DOMINATED | samera.co.uk (#1), companyvaluationcalculator.com (#6), plus 4 others -- must differentiate on NHS/private mix + UK regional |
| Incorporation calculator (dental-specific with NHS Pension) | CONFIRMED WHITESPACE | a2zaccounting.co.uk #1 is a take-home calc, not an incorporation comparison; our article already at #5 |
| Practice sale CGT / net proceeds | CONFIRMED WHITESPACE | Zero tools in top 10; all articles |

---

## 4. Seed Verdicts

| Seed idea | Query evidence | Competitor gap | Data complexity | Verdict |
|-----------|---------------|----------------|-----------------|---------|
| **NHS Pension annual allowance taper calculator** | Bing: "nhs dentist pension calculator" (16), "ca you split pension across nhs and private sipp" (6, 3 clicks); GSC: "ptm044100 tax relief" (14), "pension advice for dentists" (6) | No specialist dental AA taper tool exists; Wesleyan/NHSBSA are generic | High — tapering at £260k threshold; dentist-specific adjusted income definition; AA £60k; carry-forward 3 years | **BUILD** — highest gap; converts at query stage |
| **Associate vs principal income comparison** | GSC: "dentist self employed or limited company" (20), "associate dentist accounting" (8); Bing: "superannuation tax bracket dentist" (8) | Partial coverage by lansdellrose; no NHS Pension cost layer | Medium — extend principal-extraction to compare associate sole-trader vs principal partnership/Ltd | **BUILD** — partial overlap, extend existing tool |
| **Practice purchase affordability / goodwill loan** | GSC: "goodwill funding practice purchase" (44), "buying a dental practice checklist manchester" (27) | No interactive affordability tool from dental accountants | Low — arithmetic only (practice-affordability.ts already exists) | **PROMOTE to gallery** — compute lib exists, just needs public registry entry + config |
| **Incorporation calculator: sole trader vs Ltd for associates** | GSC: "dentist self employed or limited company" (20); Bing: "how does associate dentist pay work in private sector" (8, 4 clicks) | Partially served by locum-structure; but no associate-specific Ltd comparison with NHS Pension cost | Medium — extend locum-structure or build dedicated tool | **BUILD** — differentiated from locum-structure by associate (not locum) framing + pension layer |
| **UDA rate benchmark tool** | GSC: "nhs uda rates" (167), "uda value checker" (91), "uda rate" (20); BDA tool is competitor | BDA UDA checker exists but we can differentiate on inflation-adjusted / multi-year trend | Already built (uda-value) | **EXISTS** — focus on ranking improvement, not new build |
| **Equipment capital allowance (40% FYA FA 2026)** | GSC: no direct queries; Bing: none visible | No competitor tool found | Low — straightforward: asset cost × 40% FYA vs 18% WDA comparison | **BUILD** — FA 2026 40% FYA is dated and differentiated; aligns with ground truth memory |
| **Sole trader vs Ltd extraction comparison** | GSC: "dentist self employed or limited company" (20); principal-extraction already exists | principal-extraction covers this | Already built (principal-extraction) | **EXISTS** — promote, don't duplicate |
| **Take-home pay calculator (owner/principal)** | GSC: "dental practice owner salary" (18), "how much does a dental practice owner make uk" (12) | Partial coverage only | Already built (principal-extraction) | **EXISTS** — review framing/meta to capture "owner salary" queries |
| **Scotland SDR remuneration calculator** | Bing: "sdr dental scotland" (73), "sdr scotland" (41), "statement of dental remuneration" (29) — significant Bing volume | No tool anywhere; Scotland SDR uses item-of-service not UDAs | Medium — SDR item codes + fee schedule data needed | **BUILD** — unique gap, high Bing volume |
| **NHS Pension superannuation earnings calculator** | Bing: "dentist superannuation uk" (12, 8 clicks), "how to calculate a dentists superannuation earnings" (10) | No dental-specific superannuation calculator | Medium — practitioner pensions formula; tier contribution rates | **BUILD** — Bing high-intent (8 clicks / 12 impressions = 67% CTR) |
| **Dental practice owner income benchmark** | GSC: "dental practice owner salary" (18), "how much does a dental practice owner make uk" (12), "private practice owner salary uk" (6) | No interactive benchmark | Low — static data display + income range table by size/type | **BUILD** — high-intent "how much do I make" query; lead capture opportunity |
| **VAT partial exemption calculator** | Bing: "vat on dental surgery uk" (6), "if i am a dentist...do i need to register for vat" (10) | No tool | High — partial exemption method; mixed supplies | **DEFER** — low volume, high complexity; article first |

---

## 5. Top 10 New Tool Opportunities (Ranked by Opportunity Score)

Scoring: query evidence (0–3) + competitor gap (0–3) + data complexity inverse (0–2, simpler = higher) + strategic fit (0–2). Max 10.

| Rank | Tool | Opportunity score | Query evidence | Competitor gap | Complexity | Notes |
|------|------|------------------|---------------|----------------|------------|-------|
| **1** | **Scotland SDR Remuneration Calculator** | 9/10 | Bing top cluster: 73+41+29+26 = 169 impressions (no GSC presence yet — entirely unserved) | Zero competition — no tool exists for Scotland SDR | Medium (fee schedule data) | Unique; Bing query leader; Scotland is a natural dental accountant hub |
| **2** | **NHS Pension Annual Allowance Taper Calculator** | 9/10 | GSC: 14+6+2 = ~25; Bing: 16+6+6 = ~28; 3–8 click queries | No dental-specific AA taper tool | High (taper rules, adjusted income, carry-forward) | High intent; converts leads; dental-specific rules differ from GP |
| **3** | **NHS Superannuation Earnings Calculator** | 8/10 | Bing: 12 impressions, 8 clicks (67% CTR — extreme intent) | Nothing built by any competitor | Medium (practitioner pensions tier table) | Very high CTR signals unmet need |
| **4** | **Practice Purchase — Promote to Gallery** | 8/10 | GSC: "goodwill funding practice purchase" (44) + buying queries (~100 total) | Competitors have articles only; no interactive tool | **Zero** — compute lib + premium config already exist | Just needs `registry.ts` entry; fastest win on this list |
| **5** | **Equipment Capital Allowance Calculator (FA 2026)** | 7/10 | GSC: low direct query volume; Bing: low | No competitor has built this post-FA 2026 | Low (40% FYA vs 18% WDA arithmetic) | FA 2026 40% FYA launched Mar 2026 — date-pegged content advantage |
| **6** | **Practice Sale CGT / Net Proceeds — Promote to Gallery** | 7/10 | GSC: "selling a dental practice taxes" cluster = ~330 impressions | Practice-sale-premium exists; no gallery-public version | **Zero** — config exists | Expose practice-sale-premium as a gallery tool; 330-impression cluster currently unconverted |
| **7** | **Dental Practice Owner Income Benchmark Tool** | 7/10 | GSC: "dental practice owner salary" (18), "how much does a dental practice owner make uk" (12), position 4.5–6.3 (ranking!) | No interactive benchmark anywhere | Low (data table + income range display) | Queries are ranking; a tool on the page converts better than an article |
| **8** | **Associate Ltd Incorporation Calculator** | 6/10 | GSC: "dentist self employed or limited company" (20, pos 21.7); Bing: "how does associate dentist pay work" (8, 4 clicks) | Partial coverage (locum-structure); associate-specific with NHS Pension cost not done | Medium (extend associate-take-home) | Distinct from locum-structure: associates not locums; NHS Pension deductibility is the key differentiator |
| **9** | **Dental Tax Deduction Planner** | 5/10 | GSC: "tax planning for dentists" (9), "cpd allowance for dentists" (7), "dentist tax deduction checklist" (1); Bing: "black book of tax deductible expenses dentist" (6) | No structured deduction planner exists | Low (checklist-style with running total) | Lead capture vehicle; low build cost; blog article already ranking on some queries |
| **10** | **NHS Pension Contribution Rate Calculator** | 5/10 | Bing: "nhs dentist pension contributions" (7), "is associate dentist nhs pension relief at source" (6, 6 clicks); GSC: "ptm044100" (14) | NHSBSA has generic tools; no dental-specific rate × earnings × tax relief calculator | Low (tier table lookup) | Complements AA taper tool (#2); high CTR on "relief at source" query |

---

## 6. "Dental Accountant" Head Term Sub-Intent Analysis

The "dental accountant" family drives the top ~4,200 GSC impressions. Sub-intents visible in the data:

| Sub-intent | Signal queries | Approx impressions | Current page serving it? |
|-----------|---------------|-------------------|--------------------------|
| **Generic service — find an accountant** | "accountants for dentists", "dental accountants", "specialist dental accountants" | ~2,400 | Homepage / services pages |
| **London / location-specific** | "specialist dental accountants london" (130), "dental accountants london" (69), "dental tax accountant london" (30), "dental accountants manchester" (24) | ~350+ | Location pages (if any) |
| **Specialty sub-niche** | "accountants for associate dentists" (19), "locum dentist accountants" (23), "dental associate accountant" (16) | ~70 | Associate content |
| **Practice type** | "dental practice accountant" (124), "nhs dental accountants" (10) | ~140 | Practice-focused content |
| **Software / tools** | "accounting software for dental clinics" (131), "cloud accounting for dentists" (43), "xero dental accounting" (13) | ~200 | Xero partnership page / blog |
| **Geographic near-me** | "dentist accountants near me" (161), "dental accountant near me" (4) | ~170 | Local SEO / GMB |

**Key insight for tools strategy:** The head term cluster is a service-search intent — tools don't directly serve it, but tools are the conversion mechanism *for* those visitors. Visitors arriving on "dental accountants" terms need a tool on the page to self-qualify and generate leads. The tools most likely to convert head-term visitors are income/salary benchmarks (#7) and structure comparisons (#8) — they answer "is this worth exploring?" questions.

---

## Data quality notes

- GSC data: 90-day window via `gsc_query_data` table; dentists site is relatively early-stage (most queries at pos 40–70, high impression / low click ratio suggests page-1 potential not yet reached).
- Bing data: `bing_query_data` table; Scotland SDR queries are the dominant Bing cluster (73 impressions top query) — significant given our GSC data shows almost no Scotland SDR coverage, suggesting an SEO gap in Google too.
- Serper competitor sweep: **FAILED** — account out of credits (400 error on 2026-07-17). Competitor tool section is based on known market landscape. Re-run when credits are replenished.
- Premium tools (practice-purchase, practice-sale): compute logic and configs fully built; not in public gallery registry. Promoting these to the gallery requires only adding configs to `src/lib/tools/registry.ts`.
