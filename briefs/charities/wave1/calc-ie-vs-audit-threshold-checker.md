---
slug: ie-vs-audit-checker
tier: calculator
route: /calculators/ie-vs-audit-checker
intent: MIXED. Tool-intent slice of the audit-threshold cluster; the answer "you need an IE" is the site's single best HIRE conversion moment.
---
# Independent examination vs audit threshold checker: landing copy brief

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "charity audit threshold" 390/0 — SHARED with pillar-audit-vs-independent-examination. Cannibalisation split: this checker page targets tool-intent modifiers (checker/calculator/do we need phrasings, autocomplete-derived, no separate measured volume); the pillar owns informational intent. Stage 2 confirms the split against live SERPs.
- Secondary: "independent examination threshold" 70/0 (also shared; same split rule).

## Search-intent class + play

MIXED, tool intent. Trustee enters income/assets/company status and gets a scrutiny verdict. Every "IE required" or "audit required" verdict is a capture moment routing to services-independent-examination. Rivals have no interactive equivalent (brochure sites); the tool IS the differentiator.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **iel.org.uk** and **charityexaminers.co.uk** — own the IE funnel with static threshold pages. Beat with the interactive checker plus verdict-specific next steps.
- **charityaccountants.co.uk** — most visible sweep domain; static service copy only.

## Required structure (landing copy AROUND the existing tool)

H2 skeleton:
1. Checker embed block (tool leads the page): /embed/ie-vs-audit-checker
2. What this checker tells you (BLUF: no scrutiny / IE / audit verdicts)
3. The inputs explained (gross income; gross assets; charitable company or not; jurisdiction)
4. The thresholds behind the verdicts (methodology + gov.uk citations)
5. Worked examples (placeholder: one per verdict band)
6. What the checker does not decide (governing-document overrides, funder clauses, Commission-ordered audits)
7. Scotland: why the checker refuses to answer (OSCR route)
8. Got your verdict? What to do next (capture edge → services-independent-examination)
9. FAQ

- FAQ candidates: What income means a charity needs an independent examination? When is a charity audit compulsory? Do gross assets affect the audit threshold? Does a charitable company follow different rules? Can our constitution force an audit below the thresholds? Who can act as our examiner over £250,000? Does the checker work for Scottish charities? What counts as gross income?
- Table/chart opportunities: verdict table (income x assets x company status → outcome); qualified-examiner bodies list.
- Calculator embed: /embed/ie-vs-audit-checker
- Internal links (wave1): pillar-audit-vs-independent-examination, services-independent-examination

## House positions touched

- HP 3: "Once gross income exceeds £25,000, trustees must arrange external scrutiny: an independent examination or an audit. At or below £25,000 the Charities Act requires no external scrutiny (governing document can still impose one)." — https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31
- HP 4: "income over £1m, OR income over £250,000 AND gross assets over £3.26m" makes a statutory audit mandatory; independent examination is not permitted (save exceptional Commission-approved cases). — CC31 full guidance
- HP 5: "Where gross income exceeds £250,000, the independent examiner must be a member of a body listed in the Charities Act: ICAEW, ICAS, ICAI, ACCA, AAPA, AAT, AIA, CIMA, the Chartered Governance Institute, CIPFA, ACIE, IFA, CPAA." — CC31 full guidance
- HP 6: "Non-company charities with gross income of £250,000 or less may prepare receipts and payments accounts. Charitable companies, and all charities over £250,000, must prepare accruals accounts." — CC15d landing + CC31
- HP 26: "the IE-vs-audit checker refuses to answer for Scotland and points to OSCR." — https://www.oscr.org.uk/
- Engine coupling: HP 3, 4 and 5 are hard-coded in charities/web/src/lib/calculators/charity-rules.ts; do not change a figure in either place without changing both. Landing copy must match the engine exactly.

## Hallucination danger zones

- HP open flag 3: Scottish scrutiny rules and thresholds NOT verified; the Scotland section explains the refusal and links OSCR, states no Scottish figures.
- HP open flag 4: CC15d body unreachable; anchor all figures via CC31.
- "Gross income" definition detail beyond the HP doc: link CC31, do not improvise.
- No fee estimates for IE or audit.

## Stage 2 TODO

- Confirm the tool/informational cannibalisation split vs the pillar against live SERPs.
- Verify landing copy figures against charity-rules.ts (must be identical).
- Live-URL check iel.org.uk and charityexaminers.co.uk threshold pages.
