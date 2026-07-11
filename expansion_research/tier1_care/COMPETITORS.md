# Care-sector accountancy — verified competitor landscape (R3)

Date: 2026-07-11. Niche: UK accounting for care homes + domiciliary care providers
(incl. supported living, children's homes). Method: 36 UK SERP queries
(`s1_serp_collect.py`, raw in `raw/serp_raw.json`), script-filtered against
`own_estate_exclusion.json` (hard assert: **0 estate domains survived**) and a
directory/info blocklist (27 dropped). 207 domains seen, 180 survivors (175 fetchable
domain strings; 5 were SERP-redirect junk). **Every survivor was fetch-verified**
(`s2_verify_fetch.py` → `raw/verify_evidence.json`); strategically important
bot-blocked domains re-verified via live web search 2026-07-11, marked below.

**Anomaly**: Serper returned 400 "Not enough credits" on all 36 queries, so the SERP
evidence this run is **DDG (uk-en) only**. Serper/Google re-sweep is queued in
DOSSIER.md TODO — paid pulls; position/hit counts below therefore understate Google
visibility and should not be compared to the hospitality sweep's numbers.

Verdict tiers: **DEDICATED** = whole brand is care-sector (or a care-only service line);
**SECTION** = real multi-sector firm with a dedicated care/health-and-social-care page.
Machine-readable list with evidence quotes: `competitors.json` (**41 rivals: 12 DEDICATED
+ 29 SECTION**).

## Headline read

This is a **CONTESTED field with a genuine dedicated tier**, but thinner and younger than
hospitality's: the dedicated firms are mostly small/new brands (CareAxis, Marele, The
Healthcare Accountant, Supported Living Financials) rather than 30-year institutions, and
several sub-fields are owned by **non-accountant adjacents** (CQC consultants for
registration queries, capital-allowances houses for care-home CA queries, brokers for
purchase/valuation queries). The accountancy gap is widest on **domiciliary-care-specific
finance** (sleep-ins, travel time, hourly-rate economics) and on **interactive tools**
(only one calculator site surfaced in the whole sweep, and it is not an accountancy firm).

## DEDICATED specialists (12, all verified)

| Domain | Sub-segment | Evidence (quoted from fetched page unless noted) |
|---|---|---|
| costcare.co.uk | Care home tax/capital allowances | H1 "Cost Care Tax - Care Home Tax and Capital Allowances Specialists"; "since 1995"; "Over £900m in successful claims"; Kingscrest 2 historic-VAT reclaim offer |
| mareleaccountancy.co.uk | Domiciliary care | "We work only with domiciliary care providers. We are care sector specialists."; positions as "The Care FD" |
| careaxisaccountancy.co.uk | Domiciliary/supported living/residential | "Where Care Meets Compliance"; service H1 "Accountants for Domiciliary Care Agencies" |
| supportedlivingfinancials.co.uk | Supported living | H1 "The financial partner for supported living" (RDA Accountants brand); pitch: "Not a generic firm with a sector page"; runs a Substack |
| healthcareaccountant.uk | Domiciliary/supported living/children's homes | "The Healthcare Accountant"; homepage segments are exactly Domiciliary Care / Supported Living / Children's Homes |
| cqcfinancialviability.com | CQC financial viability statements | "CQC Qualified Accountants Ltd"; sells the FVS as an online product |
| carebooks.co.uk | Care payroll | Title "CareBooks Payroll Services \| Payroll for UK Care Providers" |
| carepayrollgroup.co.uk | Care payroll | "Your caring payroll department"; sector nav: domiciliary, nursing homes, residential, respite, retirement |
| taxcare.org.uk | Care homes + agencies | Fetch 403 → search-verified: Birmingham "Tax Care Accountant", digital timesheets/payroll for care agencies, claims 40+ care recruiter clients |
| heightenaccountants.co.uk | Care homes | Fetch 403 → search-verified: "Heighten Care Homes Accountants" + dedicated /carehome-insights/ blog hub |
| carehomeaccountant.co.uk | Care homes (exact-match domain) | Search-verified: "Care Home Accountant \| UKcarehomes"; VAT, payroll, buy/sell support |
| carehome-accountants.co.uk | Care homes (exact-match domain) | Search-verified: "Appleby Mall Carehome Accountants" — "Accountants For Care Homes" |

## SECTION rivals (29) — the ones that shape strategy

Chartered/regional firms with real care pages: **MMBA** (7 queries hit; "MMBA Specialist
Care Home Accountants"), **Morris Crocker** (Portsmouth; care-homes specialism, 6 queries),
**Hawsons** (12 queries — top hit-count; healthcare sector + care-homes subpage),
**James Todd & Co**, **Forrester Boyd** ("Health & Social Care Specialist Accounting Firm"),
**AAB**, **SKN** (residential care & supported living page), **Everest & Co**,
**Mitchells** (/care-home/), **Sterling Grove**, **BTB/LDF**. SEO-led online firms:
**AccounTax Zone** (9 queries; care-homes + residential + foster-carer pages),
**Auditox** (/accountants-for-carehomes/; also in the hospitality sweep — multi-niche
programmatic player), **Account-Ease** ("#1 Care Home Accountants in the UK"),
**Loyals** ("Care Home, Domiciliary & Live-in Care Accountants London"; also in
hospitality sweep), **Clearcut** ("Care Home Accountants UK | CQC-Compliant Finance"),
**Ratiobox**, **AccountingIN**, **RA Accountants**, **Elevate** (/care-businesses/),
**Amanah**, plus search-surfaced McGinty Demack, GM Professional, taxaccountant.co.uk,
Ryans. Payroll bureaus with care pages: DH Payroll, Payroll Hub, Excel Payroll
Solutions, Be Payroll.

## Adjacent (not accountancy rivals, but own key SERPs)

- **CQC consultants own registration/compliance queries**: QMADS, 360Compliance, Care Sync
  Experts, Care Quality Support (106 care mentions on homepage), Team Care Compliance,
  My Care Business, Elberra, Cura Compliance. An accountancy site competes here only on the
  financial slice (FVS, start-up accounts, projections).
- **Capital-allowances houses own care-home CA queries**: Cost Care (also DEDICATED above),
  Eureka Capital Allowances, Sponjem, CARS (propertycapitalallowance.com), BSE Group.
- **Brokers/M&A own buy/sell/valuation queries**: Rangewell, Blue Sky Brokers, Florence
  Legacy ("Sell Your Care Home"), DealFlowAgent, Carterwood (advisory), plus Christie/
  Knight Frank (blocklisted as brokers at s1).
- **One calculator precedent**: care-calculator.co.uk ("Care Agency Rate Calculator |
  Estimate Home Care Hourly Costs (UK)") — a standalone tool site, not a firm. Proof the
  tool intent exists and is winnable.
- Care software (Birdie, Care Control), law firms (VWV, Hempsons, Leathes Prior, Clyde &
  Co), insurers (Surewise), and actual care providers (Home Instead, Care UK, Elder,
  A1 Care, Serene) — dropped at judgment.

## Dropped at judgment (sample)

bing.com + 2 startpage redirect strings (SERP junk), charitytaxgroup.org.uk,
forum.alzheimers.org.uk, payingforcare.org (consumer), media (Guardian, BBC, City AM,
Caring Times, Care Industry News), granny-annexe builders (grannexe.co.uk, anxspace.com —
query drift from "care home business"), big-4-adjacent with no care-dedicated page
surfaced (BDO, Grant Thornton healthcare page is public-sector-framed, Price Bailey 403,
Bishop Fleming healthcare page is clinician-framed — kept out of rivals on judgment),
plus 60+ one-hit generic accountancy homepages with zero care evidence (cm=0, no care
page found).

## Fetch failures not search-recovered

morriscrocker.co.uk, taxcare.org.uk, heightenaccountants.co.uk, accountaxzone.com,
curacompliance.co.uk, franksaccountants.co.uk (202), bluehectare.co.uk (202),
jamesdixey.co.uk (429), quilliammarr.co.uk (403) — the first four were search-verified
(above); Cura turned out to be a CQC consultant (adjacent); the rest stayed unverified
and are excluded from competitors.json rather than guessed at.
