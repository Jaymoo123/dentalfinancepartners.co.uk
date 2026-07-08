# Gap Discovery 2026-07 — agency

Generated: 2026-07-08  
Triage candidates (WRONG_PAGE + UNSERVED): 26  
Branded excluded: 0  
SERP_SERVED (improve-existing): 0  
Pillar-overlap excluded: 3  
Below impressions floor (<5/28d) omitted: 3  
**New-page candidates: 20**

---

## Recommended for review (new-page candidates)

| # | Query | Impr | Class | SERP | Score | Overlap | Nearest existing | Top competitor |
|---|-------|------|-------|------|-------|---------|-----------------|----------------|
| 1 | pr agency for accountants | 143 | WRONG_PAGE | winnable-likely | 114.4 | 0.2 | selling-agency-tax-implications | raedan.co.uk |
| 2 | cis accountant | 138 | UNSERVED | winnable-likely | 103.5 | 0.25 | how-to-choose-accountant-agency | en.wikipedia.org |
| 3 | annual investment allowance | 62 | UNSERVED | review | 19.38 | 0.375 | annual-investment-allowance-agency-equip | en.wikipedia.org |
| 4 | annual investment allowance calculator | 51 | UNSERVED | review | 17.0 | 0.333 | annual-investment-allowance-agency-equip | ukcalculator.com |
| 5 | accountancy pr agency | 19 | WRONG_PAGE | winnable-likely | 15.2 | 0.2 | selling-agency-tax-implications | limitlesspr.co.uk |
| 6 | aia allowance | 26 | UNSERVED | review | 11.38 | 0.125 | dividend-allowance-2025-26-agency-direct | gov.uk |
| 7 | uae corporate tax 0% up to aed 375,000 | 15 | UNSERVED | winnable-likely | 11.25 | 0.25 | uae-corporate-tax-uk-agency-founders | u.ae |
| 8 | uae corporate tax 9% above aed 375,000 | 15 | UNSERVED | winnable-likely | 11.25 | 0.25 | uae-corporate-tax-uk-agency-founders | cleartax.com |
| 9 | cis accountants | 11 | UNSERVED | winnable-likely | 11.0 | 0.0 | - | rsbc.uk |
| 10 | investment allowance | 27 | UNSERVED | review | 10.12 | 0.25 | annual-investment-allowance-agency-equip | smartcapitalmind.com |
| 11 | accountants for creative agencies | 15 | UNSERVED | winnable-likely | 10.0 | 0.333 | IR35 and Creative Agencies: The Practica | dejongphillips.co.uk |
| 12 | uae corporate tax threshold aed 375,000 | 14 | UNSERVED | winnable-likely | 9.8 | 0.3 | uae-corporate-tax-registration-threshold | pioneergroup.ae |
| 13 | mtd xero | 13 | UNSERVED | winnable-likely | 9.75 | 0.25 | mtd-software-xero-agency-reporting | en.wikipedia.org |
| 14 | xero mtd | 11 | UNSERVED | winnable-likely | 8.25 | 0.25 | mtd-software-xero-agency-reporting | en.wikipedia.org |
| 15 | pr agency accountants | 8 | WRONG_PAGE | winnable-likely | 6.4 | 0.2 | selling-agency-tax-implications | streetsmedia.co.uk |
| 16 | annual investment allowance uk | 14 | UNSERVED | review | 4.38 | 0.375 | annual-investment-allowance-agency-equip | gov.uk |
| 17 | what is annual investment allowance | 13 | UNSERVED | review | 4.06 | 0.375 | annual-investment-allowance-agency-equip | gov.uk |
| 18 | aed 3 million threshold uae | 5 | WRONG_PAGE | winnable-likely | 3.89 | 0.222 | uae-corporate-tax-registration-threshold | alphaequitymc.com |
| 19 | annual investment account investment allowance | 11 | UNSERVED | review | 3.67 | 0.333 | annual-investment-allowance-agency-equip | gov.uk |
| 20 | what is the annual investment allowance | 10 | UNSERVED | review | 3.12 | 0.375 | annual-investment-allowance-agency-equip | gov.uk |

---

## Auto-excluded: SERP_SERVED (improve-existing lane)

We already rank for these — focus on improving the existing page, not creating a new one.

| Query | Impr | Our URL | Our position |
|-------|------|---------|--------------|

---

## Auto-excluded: branded queries

Contain a competitor domain name-stem — not worth targeting.

| Query | Impr |
|-------|------|

---

## Auto-excluded: pillar overlap

Jaccard ≥ 0.3 against a pillar/core page.

| Query | Impr | Nearest pillar |
|-------|------|----------------|
| agency accounting | 18 | agency-tax-compliance-complete-guide |
| agency for finance | 10 | agency-finance-fundamentals |
| agency finance | 7 | agency-finance-fundamentals |

---

## Verdict key
- **winnable-likely**: ≥2 non-authority competitors in top 10, no gov/nhs/wiki wall at 1-3
- **review**: manual judgment needed

## Next steps
1. Sonnet judgment pass (Phase C2) — cluster near-dupes, resolve WRONG_PAGE ambiguity
2. Owner approval
3. `python -m optimisation_engine.discovery.batch_builder --site agency --commit-topics`

---

## Sonnet review (2026-07-08)

All recommendations below are **provisional. Do not ship until watch window closes (~2026-08-05)**. GSC data is thin (310 rows/30d); impression counts are floor estimates, not demand ceilings.

---

### Cluster analysis

**Cluster A: PR agency for accountants** (items 1, 5, 15)
Queries "pr agency for accountants", "accountancy pr agency", "pr agency accountants" are three phrasings of the same commercial intent. The SERP shows accountants-for-agencies firms (raedan, sidekickaccounting, abmcharteredaccountants) at positions 3/6/8 alongside actual PR-for-accountants services. The winning interpretation is ambiguous: roughly half the top 10 are "PR firm targeting accountants" and half are "accountants who serve PR agencies". Our /agencies/pr-agencies page is WRONG_PAGE for the PR-serving-accountants variant but is the correct page for the accountants-for-PR-agencies intent. Action: resolve as a WRONG_PAGE fix for /agencies/pr-agencies rather than a new page (the page exists; it just ranks poorly). Mark as improve-existing, not net-new.

**Cluster B: CIS accountant/accountants** (items 2, 9)
"cis accountant" (138 impr) and "cis accountants" (11 impr) are the same query, singular/plural. SERP shows construction-specialist accountants (perrysaccountants, yorkshireaccountancy, cismadeeasy, taxassist) plus a Wikipedia confusion hit. CIS = Construction Industry Scheme, not an agency-founder concern. Agency founders are digital/creative/marketing, not construction subcontractors. Audience mismatch: REJECT both.

**Cluster C: Annual investment allowance** (items 3, 4, 6, 10, 16, 17, 19, 20)
Eight queries all circling "annual investment allowance" / "aia allowance" / "investment allowance" / "what is annual investment allowance" / "annual investment account investment allowance". These all map to the existing page /blog/tax-and-compliance/annual-investment-allowance-2024-25. The SERP is hard: gov.uk holds positions 1-2 on most variants, plus Wikipedia at #1 for the head term. The existing page already ranks for the dated "2024-25" variant at position 8 (SERVED_WELL at 8.5). The problem is the page title is dated and the generic head term queries are UNSERVED at positions 51-90. Action: this is an improve-existing / page refresh task (update page title to 2025-26 or 2026-27, add calculator section) rather than creating 8 new pages. Mark all 8 as improve-existing. Not net-new candidates.

**Cluster D: UAE corporate tax** (items 7, 8, 12, 18)
"uae corporate tax 0% up to aed 375,000", "uae corporate tax 9% above aed 375,000", "uae corporate tax threshold aed 375,000", "aed 3 million threshold uae" all map to existing page /blog/international-agencies/uae-corporate-tax-registration-threshold-small-agency-founder. Positions 70-90 (UNSERVED). SERP dominated by UAE-based advisory firms (pioneeergroup.ae, cleartax.com, bdo.ae, mof.gov.ae). The existing page covers this topic; the issue is likely crawl/authority, now being addressed by the fix wave. Action: improve-existing (the indexing fix wave should surface this). Not net-new.

**Cluster E: MTD / Xero** (items 13, 14)
"mtd xero" (13 impr) and "xero mtd" (11 impr) are synonyms, mapping to the existing /blog/making-tax-digital/mtd-software-xero-agency-reporting. Position 57 and 54 (UNSERVED). SERP: Wikipedia at #1, then Xero.com and HMRC-linked results. Competing against the software vendor itself is very hard. Audience fit is moderate (agency founders do use Xero for MTD). Both are improve-existing, not net-new.

**Cluster F: Accountants for creative agencies** (item 11)
"accountants for creative agencies" (15 impr), currently UNSERVED hitting the /agencies/creative-agencies page at position 59. SERP shows dejongphillips, weareband, raedan, sidekickaccounting, accountancycloud at positions 1-7, all UK accounting firms serving creative agencies. Strong audience fit. Competitors are accountancy firms (not publishers or authority sites). This is a WRONG_PAGE situation: /agencies/creative-agencies already exists but is not optimised for this intent. Treat as improve-existing (on-page copy update for the /agencies/creative-agencies landing page) rather than a new blog post.

---

### Recommended (provisional. Do not ship until ~2026-08-05)

None of the 20 GSC candidates survive as net-new page recommendations. Every surviving cluster resolves to either:
(a) improve-existing (update an existing page rather than create a new one), or
(b) audience mismatch (CIS = construction, not agency founders).

The highest-priority improve-existing actions, in order:

1. **/agencies/pr-agencies** (Cluster A) -- rewrite on-page copy to match "accountants for PR agencies" intent more precisely. The page exists; it is ranking at position 28-44 for the right queries but missing intent alignment. SERP winnable (raedan, sidekickaccounting, abmcharteredaccountants all rank without being authority sites).
2. **/agencies/creative-agencies** (Cluster F) -- same treatment; position 59-79 on a winnable SERP (dejongphillips, weareband at 1-2).
3. **/blog/tax-and-compliance/annual-investment-allowance-2024-25** (Cluster C) -- rename/update to 2026-27 or "permanent" framing; add inline AIA calculator or worked examples section; the dated slug and title are likely the ranking ceiling.

These are page-update tasks, not new-page tasks. Do not action until ~2026-08-05.

---

### Rejected

| Item | Query | Reason |
|------|-------|--------|
| 2, 9 | cis accountant / cis accountants | CIS = Construction Industry Scheme. Agency founders are digital/creative/marketing, not construction contractors. Audience mismatch, no recovery path. |
| 3, 4, 6, 10, 16, 17, 19, 20 | Annual investment allowance (all variants) | Improve-existing, not net-new. gov.uk owns positions 1-2. Existing page already covers topic; stale title is the blocker. |
| 7, 8, 12, 18 | UAE corporate tax (all variants) | Improve-existing. Existing page covers all these queries. SERP dominated by UAE-based advisory firms. Indexing fix wave should surface existing page. |
| 13, 14 | mtd xero / xero mtd | Improve-existing. Existing page covers topic. Competing against Xero.com itself at position 2 on these queries is not a winnable position for a new page either. |
| 1, 5, 15 | PR agency for accountants (all variants) | Improve-existing /agencies/pr-agencies, not net-new. WRONG_PAGE signal = fix the existing page. |
| 11 | accountants for creative agencies | Improve-existing /agencies/creative-agencies, not net-new. |

---

### Data-quality notes

- All impression counts are floor estimates. GSC had 310 rows across 30 days because most pages were never indexed before the 2026-07-08 fix wave. After indexing normalises, actual demand will be clearer.
- SERP checks sourced from DDG (DuckDuckGo) not Google directly. Position data is directional only; treat as evidence of competitor type, not absolute difficulty scores.
- Zero queries in the 20-candidate set produced a SERP profile where a net-new page from this site would be the right strategic answer. All fall into improve-existing or wrong-audience buckets.
- Revisit this discovery pass after the watch window closes (~2026-08-05) with fresh GSC data; many pages were at position 50-90 not because of content gaps but because of the indexing failure now being corrected.

**Honest count: 0 net-new pages recommended / 20 rejected (resolve as 3 improve-existing clusters + 1 audience-mismatch kill)**