---
slug: home
tier: money
route: /
intent: HIRE. Head-term searchers are trustees/finance leads actively selecting a specialist accountant; the homepage is the primary lead page.
---
# Homepage: specialist charity accountants (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "charity accountant" 590/27
- Secondary: "charity accountants near me" 720/0
- Secondary: "specialist charity accountants" 170/0
- Secondary: "charity accountants fees" + city terms (cluster named in LAUNCH_CORE; no per-term figures in dossier, volume-check at Stage 2)

## Search-intent class + play

Accountant-seeking lead page (HIRE). This is the head of the money funnel: the visitor is choosing a firm, not learning a rule. The page must establish specialist depth (IE, SORP accounts, Gift Aid, CIC filings) fast and route each service intent to its money page. Capture edges per the LAUNCH_CORE intent lens: IE at threshold, SORP-2026 transition, Gift Aid gone wrong, CIC filings.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **charityaccountants.co.uk** (14 SERP hits, most visible domain in the sweep; the closest model to our play). H1 "Expert Accountants for Small Charities Across the UK"; meta lists annual accounts, independent examination, payroll, Gift Aid, Commission compliance. Beat by: deeper service architecture (dedicated money pages per service vs their brochure), calculators, and SORP-2026 timeliness.
- **accountantsforcharities.uk** (Serper #1 for "charity accountant"; WAF 403 to both fetchers, fetch-unverified. FLAG: manual browser check queued as dossier open question). Snippet claims "leading UK-based accountants dedicated to the non-profit sector". Treat as primary-lane rival on SERP evidence.
- **charityaccountant.co.uk** (8 hits). ACCA firm; "accounting, bookkeeping and independent examination services at reasonable price to charities and social enterprises". Beat on depth + tooling.
- **charityaccountingpartners.co.uk** (8 hits). SORP-ready accounts, named ACA founder, ICAEW, London; targets £100k-£250k+ charities. Beat by owning the sub-£100k and IE-band segment they price above. Note: estate rule, no named-expert authority on our side; authority must be faceless (tools, data, citations).

## Required structure

H2 skeleton:
1. Hero: specialist charity accountants (value prop + primary CTA)
2. Who the site helps (small/medium charities, CIOs, CICs, social enterprises; explicitly below the audit tier)
3. Services (card grid routing to the 7 service/for money pages)
4. The compliance moments that bring trustees here (IE at £25,000, SORP 2026 transition, Gift Aid problems, CIC filings)
5. Free tools (calculator fleet teaser)
6. Why a specialist, not a generalist
7. Anonymised social proof (estate rule: no client names, no pricing claims beyond config)
8. How engagement works / next step CTA

FAQ candidates (questions only):
- Do small charities need an accountant?
- What does a charity accountant do that a general accountant does not?
- When does a charity need an independent examination?
- When does a charity need a full audit?
- Do you work with CICs as well as charities?
- Can you prepare SORP-compliant accounts?
- Do you handle Gift Aid claims?
- Do you cover Scottish charities?
- How much do charity accountants cost? (answer from config at write time; no figures in brief)

Table/chart opportunities: scrutiny-threshold summary strip (registration £5,000 / IE £25,000 / audit £1m) as a visual, each figure linking its gov.uk source per HP consistency rule.

Calculator embeds: none inline on the homepage; link the three calculator landing pages (calc-gift-aid-calculator, calc-ie-vs-audit-threshold-checker, calc-gasds-calculator).

Internal links (launch core): all 7 other money pages (services-independent-examination, services-charity-accounts, services-charity-bookkeeping, services-gift-aid, services-charity-vat, for-cics, for-social-enterprises) + all 6 pillars.

## House positions touched

- HP 3: "Once gross income exceeds £25,000, trustees must arrange external scrutiny: an independent examination or an audit." https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31
- HP 4: "A statutory audit is mandatory above these gates" at "income over £1m, OR income over £250,000 AND gross assets over £3.26m." CC31 full guidance + https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d
- HP 5: "Where gross income exceeds £250,000, the independent examiner must be a member of a body listed in the Charities Act." CC31 full guidance.
- HP 7: "SORP 2026 applies to accounting periods starting on or after 1 January 2026" so the site launches INTO the transition; date every SORP statement to the accounting period, never "the new rules". https://www.charitysorp.org/
- HP 26: E&W default (Charity Commission); Scottish charities are regulated by OSCR; Scotland flagged explicitly, never silently mixed.

Consistency rules: thresholds link their gov.uk pages; never imply a CIC can claim Gift Aid or charity rate relief (HP 22-23); anonymised social proof only.

## Hallucination danger zones

- No fee figures anywhere (config decides; competitor pricing not to be quoted).
- Do not state SORP 2026 tier thresholds (HP open flag 1 uncleared).
- Do not state Scottish scrutiny thresholds (HP open flag 3); flag to OSCR instead.
- Audit-tier services are NOT the offer (R2 lead-value correction); content references audits but funnels IE-band clients.
- accountantsforcharities.uk claims are SERP-snippet-only until manually verified.

## Stage 2 TODO

- Live-URL verify all rival homepages; manual browser check of accountantsforcharities.uk (WAF).
- Volume-check "charity accountants fees" + city terms; locations architecture decision pending (dossier open question re accountantsforcharities.org.uk doorway strategy).
- Cannibalisation wall vs hollowaydavies.co.uk `accountant-for-charities-uk` (TOPICS.md: launch decision needed, migrate/301 vs de-optimise vs coexist; data-gated consolidation rules).
