# Gap Discovery 2026-07 — construction-cis

Generated: 2026-07-08  
Triage candidates (WRONG_PAGE + UNSERVED): 135  
Branded excluded: 0  
SERP_SERVED (improve-existing): 9  
Pillar-overlap excluded: 27  
Below impressions floor (<5/28d) omitted: 92  
**New-page candidates: 7**

---

## Recommended for review (new-page candidates)

| # | Query | Impr | Class | SERP | Score | Overlap | Nearest existing | Top competitor |
|---|-------|------|-------|------|-------|---------|-----------------|----------------|
| 1 | subcontractor accounting software | 27 | UNSERVED | winnable-likely | 19.29 | 0.286 | best-cis-accounting-software | thecfoclub.com |
| 2 | construction industry scheme accountant | 26 | UNSERVED | review | 5.2 | 0.6 | what-is-cis | gov.uk |
| 3 | accounting software for construction subcontractors | 6 | UNSERVED | winnable-likely | 3.43 | 0.429 | best-cis-accounting-software | integrity-software.net |
| 4 | self-assessment for cis subcontractors | 30 | UNSERVED | review | 3.0 | 0.8 | cis-self-assessment-complete-guide | - |
| 5 | cis statement of payment and deduction template | 7 | UNSERVED | review | 2.45 | 0.3 | cis-deduction-rates-explained | assets.publishing.service.gov. |
| 6 | cis payment deduction statement template | 7 | UNSERVED | review | 2.45 | 0.3 | cis-deduction-rates-explained | assets.publishing.service.gov. |
| 7 | best software for construction industry scheme | 9 | UNSERVED | review | 1.8 | 0.6 | what-is-cis | gov.uk |

---

## Auto-excluded: SERP_SERVED (improve-existing lane)

We already rank for these — focus on improving the existing page, not creating a new one.

| Query | Impr | Our URL | Our position |
|-------|------|---------|--------------|
| cis accountant | 365 | https://www.tradetaxspecialists.co.uk/locations/bradford | 6 |
| cis accountants | 19 | https://www.tradetaxspecialists.co.uk/locations/bradford | 6 |
| cis tax specialist near me | 14 | https://www.tradetaxspecialists.co.uk/locations/bradford | 1 |
| cis accountant near me | 10 | (near-duplicate of a served query) | 0 |
| accountant for subcontractors | 7 | https://www.tradetaxspecialists.co.uk/locations/bradford | 4 |
| cis returns sunderland | 2 | https://www.tradetaxspecialists.co.uk/locations/sunderland | 1 |
| cis accountants near me | 2 | https://www.tradetaxspecialists.co.uk/locations/bradford | 2 |
| subcontractor tax accountant | 2 | https://www.tradetaxspecialists.co.uk/locations/bradford | 3 |
| fencing contractor accountant | 1 | https://www.tradetaxspecialists.co.uk/for/fencing-contractors | 5 |

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
| cis tax return accountants | 56 | what-is-cis |
| cis accountant cannock | 46 | what-is-cis |
| cis contractors accountant | 43 | what-is-cis |
| cis refunds service | 40 | what-is-cis |
| accountant for cis contractors | 30 | what-is-cis |
| cis accountants cornwall | 29 | what-is-cis |
| cis reclaim services | 26 | what-is-cis |
| cis accountant peterborough | 26 | what-is-cis |
| cis reclaims and tax | 24 | what-is-cis |
| cis tax refund | 22 | cis-refund |
| claim cis refund | 22 | cis-tax-refund-how-to-claim |
| cis tax return accountant | 22 | what-is-cis |
| cis accountant cornwall | 22 | what-is-cis |
| cis accountant norfolk | 16 | what-is-cis |
| cis returns stoke | 16 | what-is-cis |
| cis accounting software | 16 | what-is-cis |
| reclaim cis | 10 | what-is-cis |
| cis reclaim | 10 | what-is-cis |
| cis tax services near me | 8 | what-is-cis |
| cis accountant leeds | 8 | what-is-cis |
| cis subcontractor accountant | 8 | what-is-cis |
| cis tax bookkeeper | 7 | what-is-cis |
| cis tax specialist wallington | 6 | what-is-cis |
| cis tax specialist wimbledon | 6 | what-is-cis |
| cis accounting | 6 | what-is-cis |
| cis construction | 5 | what-is-cis |
| cis | 5 | what-is-cis |

---

## Verdict key
- **winnable-likely**: ≥2 non-authority competitors in top 10, no gov/nhs/wiki wall at 1-3
- **review**: manual judgment needed

## Next steps
1. Sonnet judgment pass (Phase C2) — cluster near-dupes, resolve WRONG_PAGE ambiguity
2. Owner approval
3. `python -m optimisation_engine.discovery.batch_builder --site construction-cis --commit-topics`

---

## Sonnet review (2026-07-08)

### Cluster summary

| # | Topic | Verdict | Reason | Difficulty |
|---|-------|---------|--------|------------|
| 1 | subcontractor accounting software (27 impr) | KILL | Cannibalises `best-cis-accounting-software.md` (already built); query is software-review, not CIS-specialist advice | N/A |
| 2 | construction industry scheme accountant (26 impr) | KILL | Gov.uk at #1 + CIS accountant service pages at #2-3; cannibalises `what-is-a-cis-accountant.md` (built); this is a commercial transactional query better served by improving that page | Hard |
| 3 | accounting software for construction subcontractors (6 impr) | KILL | Near-duplicate of #1; cannibalises `best-cis-accounting-software.md`; software-vendor SERP (Sage, Integrity, Clearbooks) leaves no wedge for specialist accountant content | N/A |
| 4 | self-assessment for cis subcontractors (30 impr) | KILL | Cannibalises `cis-self-assessment-complete-guide.md` (built); SERP check returned no results (DDG failure, query unreliable); page exists and ranks at position 80, needs improving not duplicating | N/A |
| 5 | cis statement of payment and deduction template (7 impr) | HOLD | Gov.uk PDF at #1-2 (near-impossible to beat for template); however a guide-with-worked-example angle is winnable; does NOT cannibalise `cis-payment-deduction-statements-guide.md` since that covers contractor obligations, not a subcontractor-facing template walkthrough. Low volume (7) limits priority. | Medium |
| 6 | cis payment deduction statement template (7 impr) | HOLD | Exact near-duplicate of #5 (same SERP: gov.uk PDF, pdffiller, BrightPay). Merge into single page targeting both; same verdict as #5. | Medium |
| 7 | best software for construction industry scheme (9 impr) | KILL | Gov.uk "find software suppliers" tool at #1; remainder is project management software SERP (not accounting); misclassified -- query intent is contractor software procurement, not subcontractor tax; cannibalises `best-cis-accounting-software.md` | N/A |

### False positives / leaks killed

- **subcontractor accounting software** (source: piggyback:generalist): piggyback regex matched on "subcontractor" but the SERP is dominated by software vendors (thecfoclub, QuickBooks, zipdo, business.com) with zero CIS-specialist accountant pages; this is a product-comparison SERP, not a CIS advice SERP. Not a topic for a lead-gen specialist site.
- **best software for construction industry scheme** (source: piggyback:generalist): SERP intent is procurement of HMRC-recognised CIS software tools (gov.uk supplier list at #1); adjacent to the site's topic but the query is answered by a government tool. Not winnable or useful as a blog post.
- **accounting software for construction subcontractors** (source: piggyback:generalist): same leak as #1 above, software vendor SERP throughout.

### Cannibalisation kills

- **subcontractor accounting software** and **accounting software for construction subcontractors**: both cannibalize `best-cis-accounting-software.md` (built, UNSERVED at avg position 19 -- improve that page instead).
- **construction industry scheme accountant**: cannibalize `what-is-a-cis-accountant.md` (built). Improve the existing page's commercial signal rather than splitting authority.
- **self-assessment for cis subcontractors**: cannibalize `cis-self-assessment-complete-guide.md` (built, UNSERVED at avg position 80 -- page exists but not ranking; fix the page, do not duplicate it).
- **best software for construction industry scheme**: cannibalize `best-cis-accounting-software.md`.

### Proceeds

- ~~**cis statement of payment and deduction template** + **cis payment deduction statement template**~~: STRUCK (2026-07-08) -- existing page found by title match: `cis-payment-deduction-statements-guide` exists and covers contractor obligations around these statements. The slug-only Jaccard scored this below the cannibalisation threshold because the slug emphasises "statements-guide" rather than "template", but the title and content cover the same topic. Route to improve-existing on `cis-payment-deduction-statements-guide` to add a subcontractor-facing worked-example section and a clear explanation of each field, which is the missing angle. Do not create a separate template page.

~~- Proposed slug: `cis-payment-deduction-statement-template-guide`~~

### Net survivors: 0

All 7 candidates rejected or struck. No net-new pages approved in this run. The improve-existing actions are:
- `best-cis-accounting-software.md`: improve to capture subcontractor software queries
- `cis-self-assessment-complete-guide.md`: improve to lift from avg position 80
- `cis-payment-deduction-statements-guide.md`: add subcontractor-facing worked example and field explanation

## Cross-estate ownership notes (2026-07-08)

- IT contractor queries are owned by contractors-ir35; do not brief CIS-adjacent IT contractor content here.
- The statement guide (struck above) is the only candidate that reached the Sonnet review. Title-match catch confirmed the existing page. No cross-estate conflicts identified in this run beyond that.
