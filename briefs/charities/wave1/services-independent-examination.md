---
slug: services-independent-examination
tier: money
route: /services/independent-examination
intent: HIRE-MIXED. Trustees at or past the £25,000 gate need an examiner now; a DIY fringe researches whether they can avoid one.
---
# Service page: independent examination of charity accounts

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "independent examination of charity accounts" 210/0
- Secondary: "charity independent examination" 90/0
- Secondary: "independent examination threshold" 70/0
- Secondary: "cost of independent examination" 20/39
- Secondary: "who can do an independent examination" 30/0

## Search-intent class + play

HIRE-MIXED lead page. The rivals iel.org.uk and charityexaminers.co.uk prove this exact funnel converts (LAUNCH_CORE). Lead capture at the IE-at-threshold compliance-pain edge. DIY fringe (threshold and who-can-examine questions) is served by the embedded checker plus links to the pillar and blog, which build trust and route back here.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **iel.org.uk** (Independent Examiners Ltd, 3 hits). "UK charity specialists since 1996. Independent examination and year-end charity accounts... Fixed fees." The entrenched IE incumbent. Beat by: threshold clarity, the interactive checker, and faster answer-first structure.
- **charityexaminers.co.uk**. IE for <£100k charities, fixed-fee remote. Beat by covering the full IE band including £100k-£250k+ (qualified-examiner territory).
- **charityaccountants.co.uk**. IE listed among services in meta; brochure treatment. Beat on dedicated depth.
- **jacksonandjackson.co.uk**. Charity accountants London with an /independent-examinations service page. Regional; beat on national coverage + tooling.

## Required structure

H2 skeleton:
1. What an independent examination is (and when the law requires one)
2. The thresholds: when IE applies, when audit takes over
3. Who can examine your accounts (the £250,000 qualified-examiner rule)
4. What the examiner will ask for (records, R&P vs accruals context)
5. How the site's IE service works (process, timeline; fees from config)
6. Check what your charity needs (embed checker)
7. Scotland is different (OSCR call-out, no figures)
8. Next step CTA

FAQ candidates (questions only):
- Does my charity need an independent examination or an audit?
- What income level triggers an independent examination?
- Can a trustee or volunteer do the independent examination?
- Who can examine accounts if income is over £250,000?
- What is the difference between an independent examination and an audit?
- Can our governing document require an audit even below the threshold?
- What records does an independent examiner need?
- Does the examination requirement apply to Scottish charities?
- How long does an independent examination take?
- How much does an independent examination cost? (config at write time)

Table/chart opportunities: scrutiny ladder table (income band vs required scrutiny vs examiner qualification), figures per HP 3/4/5 with gov.uk links.

Calculator embed: /embed/ie-vs-audit-checker (primary conversion assist; checker refuses Scotland and points to OSCR per HP 26).

Internal links (launch core): pillar-audit-vs-independent-examination (the comprehensive guide), blog-who-can-do-an-independent-examination (applied version), services-charity-accounts (accounts prep before examination), calc-ie-vs-audit-threshold-checker (landing page).

## House positions touched

- HP 3: "Once gross income exceeds £25,000, trustees must arrange external scrutiny: an independent examination or an audit. At or below £25,000 the Charities Act requires no external scrutiny (governing document can still impose one)." https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31
- HP 4: audit mandatory at "income over £1m, OR income over £250,000 AND gross assets over £3.26m"; "independent examination is not permitted (save exceptional Commission-approved cases). Governing-document or funder audit clauses can force an audit below the statutory thresholds." CC31 full guidance.
- HP 5: "Where gross income exceeds £250,000, the independent examiner must be a member of a body listed in the Charities Act: ICAEW, ICAS, ICAI, ACCA, AAPA, AAT, AIA, CIMA, the Chartered Governance Institute, CIPFA, ACIE, IFA, CPAA. At or below £250,000, any independent person with the requisite ability and practical experience may examine." CC31 full guidance.
- HP 6: "Non-company charities with gross income of £250,000 or less may prepare receipts and payments accounts. Charitable companies, and all charities over £250,000, must prepare accruals accounts." CC15d landing + CC31.
- HP 26: E&W default; ALL-sizes Scottish scrutiny rule is FLAGGED unverified; the checker refuses Scotland and points to OSCR.

Consistency rules: every scrutiny/audit figure links its gov.uk page (HP 1-6 are the single source of truth).

## Hallucination danger zones

- Do not state Scottish thresholds or the "all Scottish charities need external scrutiny" rule as fact (HP open flag 3); describe and point to OSCR.
- No fee figures; "cost of independent examination" demand is answered qualitatively + config CTA.
- Do not soften "audit not permitted above thresholds" into "optional".
- CC32 (examiners' guidance) was not re-parsed (PDF-only); do not quote Direction-level detail from memory.

## Stage 2 TODO

- Live-URL verify iel.org.uk, charityexaminers.co.uk, jacksonandjackson.co.uk service pages.
- Statutory cross-check: Charities Act 2011 scrutiny sections behind CC31 figures.
- Confirm checker embed slug against built calculator config.
