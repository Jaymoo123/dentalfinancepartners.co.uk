# Dedup audit — Startups & tech/SaaS launch core (site_key `startups-tech`)

Date: 2026-07-14. MANDATORY pre-brief gate (estate cumulative dupe rate 47%). READ-ONLY.
Method: page-level check of all 34 launch-core topics against the full estate dupe surface —
8 estate sitemaps (`expansion_research/own_estate_exclusion.json`, 2,760 URLs) + the Supabase
`blog_topics` dump (`raw/estate_blog_topics.json`, 2,035 rows). Primary collision risks:
generalist (Holloway Davies), agency (Agency Founder Finance), contractors-ir35.

## blog_topics SQL leg — RAN (via committed dump, not live SQL)

The SQL leg is **complete**, not skipped. The 2,035-row `blog_topics` snapshot used by the
Stage-5 dedup script (`s5_pool_build.py` → `raw/estate_blog_topics.json`) is the same 2,035-row
figure TOPICS.md quotes, so no live re-query was needed. I queried it directly per cluster.
Headline result: **EMI, SEIS/EIS advance-assurance, SEIS1/EIS1 compliance statements, growth
shares, CSOP, s.431, option pool, merged-scheme, ERIS 30%-intensity, AIF, claim-notification and
startup-grants all have ZERO estate blog_topics coverage.** The only R&D-intensive / share-option
rows in the estate are agency-founder-scoped (agency site), not generic. This is the load-bearing
finding: the money clusters are genuinely net-new to the estate; the collisions are concentrated
in (a) startup-head "accountant for X" pages and (b) generic dividend / VAT / CT / R&D-explained
content, all on generalist.

Note: estate `blog_topics` does NOT hold calculator or `/for/*` hub rows — those live only in
sitemaps, which is why the calculator + hub verdicts below are driven off `own_estate_exclusion.json`.

## Estate collision surface (what actually exists)

**generalist** (biggest risk) holds, live:
- Startup-head blog posts: `/blog/incorporation-and-structure/accountant-for-startup`
  (+ pre-incorporation-expenses, pre-revenue-investor-funding variants),
  `/blog/randd-tax-credits/accountant-for-saas-startups-uk`, `.../accountant-for-tech-startups-uk`,
  `.../accountant-for-ai-startups`, `/blog/limited-company-tax/accountant-for-software-companies`,
  `.../accountant-for-software-engineers`.
- R&D hub + generic guides: `/r-and-d-credits`, `/fundamentals/r-and-d-tax-credits-explained`,
  `/fundamentals/r-and-d-tax-credit-specialist`, a whole `/blog/randd-tax-credits/*` category
  (software companies, one-person software co, failed project, RDEC-vs-SME, eligibility checklist).
- Generic pay/tax: `/blog/director-pay-and-dividends/*` (tax-efficient split 2025-26, spouse
  dividends, DLA), `/calculators/salary-dividend-optimiser`, `/calculators/dividend-tax-calculator`.
- Generic VAT/CT: `/blog/vat-and-making-tax-digital/vat-threshold-2025-26`,
  `/fundamentals/when-to-register-for-vat-uk`, `/calculators/vat-scheme-comparator`,
  `/fundamentals/how-does-corporation-tax-work`, `/glossary/{vat-threshold,corporation-tax,eis-seis,r-and-d-tax-credits}`.
- Calculators: `/calculators/rd-tax-credit-estimator`, `/calculators/salary-dividend-optimiser`.
- Management accounts: `/blog/.../management-accounting-services-uk-business`.

**agency** holds agency-SCOPED R&D depth (merged scheme, R&D-intensive 27% test, custom-software
R&D line, SaaS-agency bespoke-software R&D) + `/agencies/saas-agencies` + `/calculators/rd-tax-credit-estimator`
+ `/calculators/salary-dividend-optimiser` + `/calculators/agency-valuation`. All agency-audience,
not founder/SaaS-product audience.

**contractors-ir35** owns IR35 / off-payroll / umbrella / contractor take-home wholesale
(`/blog/ir35-status/*`, `/blog/umbrella-vs-limited-company/*`, contractor salary-dividend calc).
No R&D / SEIS / EMI depth.

**No estate site** has: SEIS/EIS advance assurance, SEIS1/EIS1, EMI qualifying/valuation/VAL231/
disqualifying-events/EMI-vs-CSOP, growth shares, s.431, option pool, merged-scheme-explained,
ERIS 30%-intensity, AIF walkthrough, claim-notification 6-month trap, startup grants, SaaS
place-of-supply VAT, revenue recognition / deferred revenue / MRR-ARR, SEIS/EIS relief calc,
EMI-vs-unapproved calc.

## Verdict table (34 topics)

| # | Topic | Verdict | Overlaps (estate page/slug) | Required wedge if DIFFERENTIATE | Conf |
|---|---|---|---|---|---|
| **HUBS (5)** | | | | | |
| 1 | /for/pre-seed-founders | UNIQUE | none (generalist has no pre-seed hub; only generic `accountant-for-startup` blog) | — | High |
| 2 | /for/funded-startups | UNIQUE | none | — | High |
| 3 | /for/saas-companies | DIFFERENTIATE | generalist `randd-tax-credits/accountant-for-saas-startups-uk`; agency `/agencies/saas-agencies` | Product-SaaS company hub (recurring-rev accounting, rev-rec, deferred rev, MRR/ARR, SaaS VAT place-of-supply), NOT the head "accountant for saas" blog and NOT a marketing-agency; agency SaaS page is agency-audience | High |
| 4 | /for/software-development-companies | DIFFERENTIATE | generalist `accountant-for-software-companies`, `accountant-for-software-engineers`, `r-and-d-tax-credits-for-software-companies` | Services/consultancy tech firms (SIC 62012/62020) with R&D-boundary-honesty + project accounting; generalist versions are single generic blog posts, this is a scoped audience hub | Med |
| 5 | /for/fintech-startups | UNIQUE | none | — | High |
| **SERVICES (6)** | | | | | |
| 6 | R&D claims service (merged+ERIS) | DIFFERENTIATE | generalist `/r-and-d-credits` hub + `randd-tax-credits/*`; agency merged-scheme/R&D-intensive posts | Founder/software-company R&D *service* page scoped to software-project eligibility + merged/ERIS compliance; generalist = generic explainer hub, agency = agency-audience. Distinct = SaaS/software claimant + funded-startup lead intent | High |
| 7 | SEIS/EIS advance assurance service | UNIQUE | none (generalist only has `/glossary/eis-seis`, a definition stub) | — | High |
| 8 | EMI scheme setup & valuation service | UNIQUE | none | — | High |
| 9 | Share schemes service (CSOP/growth/unapproved) | UNIQUE | none | — | High |
| 10 | Fractional CFO / management accounts service | DIFFERENTIATE | generalist `Management Accounting Service(s)` pages | Startup/VC-backed fractional-CFO framing (board packs, burn/runway, investor reporting, SaaS metrics); generalist mgmt-accounts is generic SME. Distinct audience + metrics | Med |
| 11 | Core compliance (accounts/CT/VAT/payroll) | DIFFERENTIATE | generalist CT/VAT/payroll fundamentals + calculators | Explicitly a *supporting* page (LAUNCH_CORE says "not lead line"); must be startup-lifecycle-scoped (first accounts post-raise, payroll scaling with EMI) and link generic mechanics to generalist rather than re-explain them | Med |
| **GUIDES (18)** | | | | | |
| 12 | Merged scheme explained | DIFFERENTIATE | agency `merged-r-and-d-scheme-agency-2023` (agency-scoped) | Software/SaaS-founder framing of the merged scheme; agency version is agency-audience. Low overlap, but name it | High |
| 13 | ERIS eligibility + 30% intensity | DIFFERENTIATE | agency `r-and-d-intensive-sme-test-agencies` | Loss-making software-startup intensity maths (R&D-heavy pre-revenue co); agency version is agency-audience | High |
| 14 | Claim notification 6-month trap | UNIQUE | none | — | High |
| 15 | AIF walkthrough | UNIQUE | none | — | High |
| 16 | Software R&D eligibility honesty | DIFFERENTIATE | generalist `can-small-software-company-claim-rd-tax-credits-bug-fixes-testing`, `r-and-d-tax-credits-for-software-companies`, `one-person-software-company-rd-tax-credits`; agency `custom-software-vs-off-the-shelf-rd-line` | Positive-and-negative eligibility honesty guide for funded software teams (what does NOT qualify); generalist posts are one-person/small-co Q&A, agency is agency-projects. Distinct = scaling-team scope + honesty angle | Med |
| 17 | SEIS company checklist | UNIQUE | none | — | High |
| 18 | SEIS vs EIS | UNIQUE | none (generalist `/glossary/eis-seis` is a stub definition, not a comparison guide) | — | High |
| 19 | Advance assurance application | UNIQUE | none | — | High |
| 20 | Compliance statements SEIS1/EIS1 | UNIQUE | none | — | High |
| 21 | EMI qualifying company | UNIQUE | none | — | High |
| 22 | EMI valuation / VAL231 | UNIQUE | none | — | High |
| 23 | EMI disqualifying events | UNIQUE | none | — | High |
| 24 | EMI vs CSOP | UNIQUE | none | — | High |
| 25 | Growth shares | UNIQUE | none | — | High |
| 26 | s.431 elections | UNIQUE | none | — | High |
| 27 | Option-pool basics | UNIQUE | none | — | High |
| 28 | Startup grants landscape + R&D interaction | UNIQUE | none | — | High |
| 29 | VAT for SaaS (place of supply / threshold timing) | DIFFERENTIATE | generalist `vat-threshold-2025-26`, `when-to-register-for-vat-uk`, `/glossary/vat-threshold`, `/calculators/vat-scheme-comparator` | SaaS-specific place-of-supply (B2B/B2C digital services, MOSS/post-Brexit, reverse charge) + threshold-timing for scaling ARR. Generic £90k VAT-registration page STAYS generalist; place-of-supply is the wedge | High |
| **CALCULATORS (4)** | | | | | |
| 30 | R&D estimator | DIFFERENTIATE | generalist `/calculators/rd-tax-credit-estimator`; agency same slug | SaaS/software-scoped: merged-scheme + ERIS 30%-intensity toggle, staff-time apportionment, subcontractor rules; generic estimator stays generalist. Must not duplicate generic RDEC-vs-SME maths | High |
| 31 | SEIS/EIS relief calc | UNIQUE | none (no estate SEIS/EIS calculator exists) | — | High |
| 32 | EMI vs unapproved calc | UNIQUE | none | — | High |
| 33 | Founder dividend-vs-salary 2026/27 | DIFFERENTIATE | generalist `/calculators/salary-dividend-optimiser` + `/calculators/dividend-tax-calculator`; agency `salary-dividend-optimiser`; contractors `contractor-salary-dividend-calculator` | Founder-scoped ONLY: Employment Allowance solo-director trap (single-director co can't claim EA), EMI/BADR interaction on exit, low-profit pre-revenue founder split. Generic optimiser STAYS generalist. This is the highest-overlap topic in the core — wedge must be sharp or DROP | High |
| **RESEARCH ASSET (1)** | | | | | |
| 34 | UK Startup Formation & Survival Index | UNIQUE | none | — | High |

## Counts per verdict

- **UNIQUE: 21** (topics 1, 2, 5, 7, 8, 9, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 34)
- **DIFFERENTIATE: 13** (topics 3, 4, 6, 10, 11, 12, 13, 16, 29, 30, 33)
- **DROP: 0**

(21 + 13 = 34. Note topic 33 is a *borderline* DIFFERENTIATE — closest to DROP; the founder wedge
must be genuinely load-bearing or cede to generalist.)

## DROP list (cede to sibling)

**None.** No launch-core topic is a clean exact-duplicate that must be ceded. The estate holds
generic/agency-scoped versions of ~11 of these topics, but the founder/SaaS scope on each gives a
distinct-intent wedge (DIFFERENTIATE) rather than a straight cede. The pages to WATCH for
cede-instead-of-differentiate if the wedge proves thin at brief time: #33 (founder dividend-vs-salary),
#11 (core compliance), #16 (software R&D honesty). If any of those cannot be made
distinct-intent, cede to **generalist**.

Separately, three topics are DROP-adjacent by house rule (already excluded from the core, so not
scored above): any IR35 / off-payroll depth → DROP to **contractors-ir35** (boundary note only,
house position 27); any agency / marketing-agency scoping → DROP to **agency** (agencies excluded
from /for/* entirely).

## DIFFERENTIATE list with required wedges (13)

| Topic | Overlap owner | Required wedge (distinct intent) |
|---|---|---|
| /for/saas-companies (#3) | generalist blog + agency | Product-SaaS company hub: rev-rec, deferred revenue, MRR/ARR, SaaS place-of-supply VAT — not the head "accountant for saas" blog, not agency-audience |
| /for/software-development-companies (#4) | generalist blog | SIC 62012/62020 consultancy tech firms: R&D-boundary honesty + project accounting; scoped audience hub vs generalist single posts |
| R&D claims service (#6) | generalist R&D hub + agency | Software-company R&D service (funded-startup lead intent) scoped to merged/ERIS compliance + software-project eligibility |
| Fractional CFO / mgmt accounts (#10) | generalist mgmt-accounts | VC-backed fractional-CFO framing: board packs, burn/runway, investor reporting, SaaS metrics |
| Core compliance (#11) | generalist CT/VAT/payroll | Supporting page only; startup-lifecycle-scoped (first accounts post-raise, payroll scaling w/ EMI); link out generic mechanics |
| Merged scheme explained (#12) | agency post | Software/SaaS-founder framing vs agency-audience |
| ERIS + 30% intensity (#13) | agency post | Loss-making software-startup intensity maths vs agency-audience |
| Software R&D eligibility honesty (#16) | generalist + agency | Scaling-team scope + honesty (what does NOT qualify) vs one-person/agency-project versions |
| VAT for SaaS (#29) | generalist VAT threshold/registration | SaaS place-of-supply (B2B/B2C digital services, reverse charge, ARR threshold-timing); generic £90k page stays generalist |
| R&D estimator calc (#30) | generalist + agency calc | Merged + ERIS-intensity toggle, staff-time apportionment, subcontractor rules; generic estimator stays generalist |
| Founder dividend-vs-salary calc (#33) | generalist + agency + contractors calcs | Founder-only: EA solo-director trap, EMI/BADR exit interaction, pre-revenue low-profit split; **sharpest wedge required or DROP to generalist** |

## Bottom line

- **21 UNIQUE / 13 DIFFERENTIATE / 0 DROP.** The two money clusters (SEIS/EIS company-side + EMI/
  share schemes) are entirely net-new to the estate — this validates the launch positioning.
- The dupe risk is concentrated in **generalist** (startup-head "accountant for X" blogs, generic
  dividend/VAT/CT content, and two overlapping calculators) plus **agency** (agency-scoped R&D +
  two overlapping calculators). Every collision has a founder/SaaS wedge, so none is a forced cede,
  but the wedges on #33, #11, #16 must be enforced at brief time or ceded.
- **Open owner ruling (unchanged, from TOPICS.md / EXPANSION_TRACKER):** generalist holds ~11–37
  startup/R&D URLs on overlapping queries. This audit picks option (c) controlled overlap with
  distinct intent for the launch core; option (a) 301-migrating the generalist startup-head pages
  to the new site still needs GSC evidence per the data-gated-consolidation rule and is out of
  scope for this gate.
- blog_topics SQL leg: **RAN** (via the committed 2,035-row dump; live re-query unnecessary).
