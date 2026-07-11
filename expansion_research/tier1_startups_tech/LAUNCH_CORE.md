# Launch core — Startups & tech/SaaS site (R3, Tier-1 #4)

Date: 2026-07-11. Evidence = DataForSEO ranked_keywords (3 specialist rivals, 995 unique
volumed keywords) + keyword_suggestions (446 rows) + rival sitemaps (8 domains, 2,097 URLs) +
autocomplete (2,818 suggestions). Positioning locked by R2/redteam: **funded/scaling companies
(R&D, SEIS/EIS, share schemes), not the £10-24/mo commodity searcher.**

## Clusters (demand-evidenced)

| Cluster | Head evidence (vol/mo, KD) | Intent read | Role |
|---|---|---|---|
| Startup accountant head | "accountant(s) for startups" 720+720 **KD 0**; "startup accountant" 260 KD 0, CPC £35-78 | accountant-seeking but commodity-skewed SERP | Homepage + /for/* pages take it; win on specialist depth, don't price-war |
| R&D relief (merged + ERIS) | "r&d tax credits" 2,400×3 KD 24-37 CPC £34-51; "additional information form r&d" 390 **KD 0**; "r and d tax credits calculator" 170 KD 0 | mixed founder-DIY + accountant-seeking; head owned by R&D mills (ForrestBrown tier) | Attack the compliance long-tail (AIF, claim notification, merged vs ERIS, software-project eligibility), not the head |
| SEIS/EIS company-side | "seis advance assurance" 480 **KD 2** CPC £27; "seis" 3,600 KD 11; "seis/eis scheme" 480 KD 20 | company-side = high lead intent (founders raising) | Core money cluster: advance assurance service page + compliance-statement (SEIS1/EIS1) guides |
| SEIS/EIS investor-side | "eis tax relief" family 2,400+1,900+1,300 KD 1-8 | investor-DIY, near-zero lead value for us | Calculator + guide capture for links/authority; explicit non-target for leads |
| EMI & share schemes | "emi share scheme" 1,900 **KD 0**; "emi scheme" 1,900 KD 1; "enterprise management incentives" 8,100 KD 4; "emi share options" 390 KD 7 | founder research → advisory engagement; SERP held by platforms (Vestd/SeedLegals), not accountants | Second money cluster: qualifying tests, valuations, disqualifying events, EMI vs CSOP vs growth shares, s.431 |
| Founder pay & extraction | dividend/salary queries live mostly on generalist estate GSC; founder-specific angles ("founder salary", EA solo-director trap) | accountant-seeking | Thin but distinctive founder-scoped pages; generic dividend content STAYS on generalist (dedup gate) |
| Funding-stage ops | "startup cfo services" (CPC £12+), fractional CFO SERPs; revenue recognition, deferred revenue, burn/runway (low measured volume) | scaling companies, VC-backed | /for/funded-startups + SaaS metrics content; differentiation vs commodity tier |
| Startup grants/funding (DIY) | "startup grants" family 590-3,600 KD 20-32 | founder-DIY, low lead value | Selective: 2-3 authority pages only (grant landscape + R&D interaction); resist pool-stuffing |

## Launch core (~40 pages)

1. **Homepage** — "Accountants for funded & scaling UK startups" (explicitly not cheapest-filing).
2. **/for/ hub (audience architecture)** — mirrors estate /for/* convention:
   - /for/pre-seed-founders — formation done right, pre-trading expenditure (7-yr rule), SEIS
     readiness, founder shares day-one hygiene (s.431).
   - /for/funded-startups — post-raise compliance stack: EMI pool, R&D claim, investor
     reporting, payroll scaling; VC-backed angle (EmergeOne tier is the rival here).
   - /for/saas-companies — recurring-revenue accounting: revenue recognition, deferred revenue,
     MRR/ARR reporting, SaaS VAT place-of-supply.
   - /for/software-development-companies — services/consultancy-model tech firms (SIC 62012/62020)
     — R&D boundary honesty, project accounting.
   - /for/fintech-startups — regulated-adjacent nuance (evidence: fintech queries in SERP set).
   - **Agencies excluded**: no /for/agencies or marketing/creative-agency page — that audience
     belongs to the estate agency site (agencyfounderfinance). A one-line referral note only.
   - **Contractor boundary**: solo contractors routed to contractors-ir35 sibling; no IR35 depth here.
3. **Service pages (6)** — R&D claims (merged+ERIS), SEIS/EIS advance assurance, EMI scheme setup
   & valuation, share schemes (CSOP/growth shares/unapproved), fractional CFO/management
   accounts, core compliance (accounts/CT/VAT/payroll) as supporting page not lead line.
4. **Calculators (4 at launch)** — per CALCULATORS.md: R&D estimator, SEIS/EIS relief,
   EMI vs unapproved, founder dividend-vs-salary 2026/27.
5. **Guide spine (~18 pages)** from the KD-0-5 evidence: merged scheme explained; ERIS
   eligibility + 30% intensity; claim notification 6-month trap; AIF walkthrough (390/mo KD 0);
   software R&D eligibility honesty guide; SEIS company checklist; SEIS vs EIS (480 KD 2-5);
   advance assurance application; compliance statements SEIS1/EIS1; EMI qualifying company;
   EMI valuation/VAL231; EMI disqualifying events; EMI vs CSOP; growth shares; s.431 elections;
   option-pool basics for UK founders; startup grants landscape + R&D interaction; VAT for SaaS
   (place of supply/threshold timing).
6. **Research asset** — UK Startup Formation & Survival Index (DATA_ASSET.md) at /research/.

## Rival-architecture evidence

- accountancycloud.com (863 URLs): services + big blog + resources — the depth benchmark.
- finerva.com (325 URLs): SEIS advance assurance / share schemes / CFO service pages ranking on
  exactly our target money terms — the architecture to beat, page for page.
- acctek.co.uk: guides/checklists/calculators hubs — validates the estate tool-fleet playbook in
  this niche.
- saasaccountants.co.uk (113 URLs, thin): the SaaS head term is held by a brochure site —
  a depth play takes it.

## Estate collision rules (hard)

- contractors-ir35: IR35/off-payroll, umbrella, contractor take-home → sibling site. Boundary
  note only (house position 27).
- generalist (Holloway Davies): generic dividend-vs-salary, VAT threshold, CT rates explainers
  stay generalist; this site only publishes founder/SaaS-scoped versions with distinct intent.
- agency site: agencies excluded from /for/* entirely.
- Every launch page passes the page-level dedup gate (topic_pool.json exact+fuzzy vs all 8
  estate sitemaps + 2,035 blog_topics rows) before briefing — 47% cumulative estate dupe rate in
  gap discovery makes this mandatory.
