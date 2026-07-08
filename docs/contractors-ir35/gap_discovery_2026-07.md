# Gap Discovery 2026-07 — contractors-ir35

Generated: 2026-07-08  
Triage candidates (WRONG_PAGE + UNSERVED): 36  
Branded excluded: 0  
SERP_SERVED (improve-existing): 0  
Pillar-overlap excluded: 9  
Below impressions floor (<5/28d) omitted: 21  
**New-page candidates: 6**

---

## Recommended for review (new-page candidates)

| # | Query | Impr | Class | SERP | Score | Overlap | Nearest existing | Top competitor |
|---|-------|------|-------|------|-------|---------|-----------------|----------------|
| 1 | accountant for letting agents leicester | 61 | UNSERVED | winnable-likely | 48.8 | 0.2 | Contractor accountant uk | abodeaccounting.co.uk |
| 2 | property tax advisors leicester | 17 | UNSERVED | winnable-likely | 17.0 | 0.0 | - | dnsassociates.co.uk |
| 3 | it contractor accounting | 16 | UNSERVED | winnable-likely | 10.67 | 0.333 | Contractor accountants | rsbc.uk |
| 4 | sipp employer contribution | 10 | UNSERVED | winnable-likely | 8.0 | 0.2 | Deemed employer meaning | ii.co.uk |
| 5 | engineering contractor accountants | 8 | WRONG_PAGE | winnable-likely | 2.67 | 0.667 | Contractor accountants | gorillaaccounting.com |
| 6 | ir35 contract review stoke on trent | 6 | WRONG_PAGE | winnable-likely | 2.4 | 0.6 | ir35-contract-review-checklist | 3esaccountants.co.uk |

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
| ir35 contract review | 84 | ir35 |
| ir35 contractor accountant | 42 | ir35 |
| ir35 specialist accountant | 40 | ir35 |
| ir35 for accountants | 18 | ir35 |
| ir35 contract check | 14 | ir35 |
| statement of work ir35 | 10 | ir35 |
| ir35 compliant contract | 8 | ir35 |
| ir35 tax accountant | 8 | ir35 |
| contract review ir35 | 6 | ir35 |

---

## Verdict key
- **winnable-likely**: ≥2 non-authority competitors in top 10, no gov/nhs/wiki wall at 1-3
- **review**: manual judgment needed

## Next steps
1. ~~Sonnet judgment pass (Phase C2)~~ DONE — see below
2. Owner approval
3. `python -m optimisation_engine.discovery.batch_builder --site contractors-ir35 --commit-topics`

---

## Sonnet review (2026-07-08)

### Summary

6 candidates in. After judgment: **2 approved, 4 killed**.

---

### Killed candidates

**#1 accountant for letting agents leicester** (61 impr) — KILL.
Source: piggyback from property site. The SERP is dominated by letting-agent specialists (abodeaccounting, mneaccounting, lettsaccounting) serving a distinct audience: letting agencies needing client accounting, not IR35 contractors. Zero topic-fit with this site's audience. The impression bleed is a GSC artefact from the sibling property site's geo footprint; this domain has no page, no authority, and no reason to rank for it. Not a gap, a noise signal.

**#2 property tax advisors leicester** (17 impr) — KILL.
Same root cause as #1. Piggyback from property site; property tax advisors serve landlords, not contractors. The SERP is entirely Leicester-area property accountants. No content fit, no audience fit, no ranking lever available on a contractor-focused domain.

**#4 sipp employer contribution** (10 impr) — KILL (for now, not forever).
The SERP is dominated by ii.co.uk, HL, Aviva, AJ Bell, Unbiased, and AJ Bell. These are regulated financial platforms with deep pensions content and full FCA authority. The query is generic (employer pension contributions to a SIPP, not contractor-specific). We already have `contractor-pension-schemes-sipp` and `contractor-pension-employer-contributions` built. The right move is to improve those two pages to cover employer contribution mechanics; a standalone "sipp employer contribution" page would be a duplicate with no differentiating angle and would lose to the financial platforms.

**#6 ir35 contract review stoke on trent** (6 impr) — KILL.
Pure local-intent query (Stoke on Trent). The site is national, not local. We have no physical presence there and no local signals. The SERP shows 3esaccountants.co.uk (local firm) ranking well. Creating a city-page for one low-volume query is speculative; locations pages need systematic deployment, not one-offs driven by a 6-impression signal. Flag for a future locations wave when volume justifies it.

---

### Approved candidates

**#3 it contractor accounting** (16 impr, avg pos 81.7, UNSERVED) — APPROVE.

Rationale: we have `/for/it-contractors` built, but the triage correctly flags this as UNSERVED (our page is not showing for the query at position 81). The existing `/for/it-contractors` page is the right destination but evidently lacks the depth to rank. The SERP shows rsbc.uk, itcontracting.com, techaccounting.co.uk, gorilla, mneaccounting as beatable midsize operators. No gov/wiki wall. The fix is a dedicated "IT contractor accounting guide" blog page (category: `it-and-digital-contractors`) that targets the full informational intent behind the query, then cross-links to `/for/it-contractors`. This creates a content depth that a thin /for/* page cannot. Audience fit is core (IT is likely the biggest contractor segment on this site by SIC data). Topic: "IT contractor accounting: limited company, IR35 and expenses guide".

**#5 engineering contractor accountants** (8 impr, avg pos 28, WRONG_PAGE) — APPROVE (conditional).

Rationale: WRONG_PAGE on `/for/engineering-contractors`. Position 28 with impressions means Google is serving our page but it ranks poorly. Engineering appears in our built for/* set. The SERP shows gorillaaccounting.com (beatable, no brand wall), smithbutler.co.uk and aphaccountants as local firms, itcontracting.com as editorial. This query is informational with a commercial overlay. A dedicated "engineering contractor accountants" blog page (category: `engineering`) deepening accounting specifics for engineering contractors (CIS exposure, project-based billing, IR35 in engineering sectors) would separate from the /for/* landing page and capture informational searchers. Score is low (2.67) due to high Jaccard overlap against the existing page, but WRONG_PAGE means a new supporting article is the correct fix, not tuning the /for/* page which is already serving the head term.

---

### Net approved: 2 topics

| # | Topic | Suggested slug | Category |
|---|-------|----------------|----------|
| 1 | IT contractor accounting guide | `it-contractor-accounting-guide` | it-and-digital-contractors |
| 2 | Engineering contractor accountants guide | `engineering-contractor-accountants-guide` | engineering-contractors |

Both are blog articles. Both map to existing /for/* pages and should cross-link bidirectionally.

## Cross-estate ownership notes (2026-07-08)

- **This site owns the IT contractor audience.** The generalist site (Holloway Davies) had a recommended topic "best accounting software for IT/professional-service contractors" in its 2026-07 discovery run. That topic has been struck from the generalist report because contractors-ir35 owns this audience and this discovery run's approved topic #1 (`it-contractor-accounting-guide`) covers the same ground. When the IT contractor guide is live, the generalist site should link to it rather than compete.
- Estate-wide signal: if "IT contractor accounting" queries appear in any other site's GSC, the correct action is cross-link to contractors-ir35, not brief a new page on the other site.