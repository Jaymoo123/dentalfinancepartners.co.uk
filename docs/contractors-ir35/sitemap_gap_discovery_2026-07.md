# Sitemap Gap Discovery 2026-07 — contractors-ir35

Generated: 2026-07-08  
Method: competitor sitemap crawl (DDG-seeded universe) cross-referenced against built 153-page inventory  
Domains crawled: 13 (see universe flags below)  
Evergreen candidate pool after news/nav filter: ~2,300 norms  
After contractor-relevance filter: ~180 distinct topics  
After built-inventory dedup: **31 recommended topics**

---

## Universe flags

These domains are in the config but their content should be weighted or treated with caution for gap mining:

| Domain | Flag | Reason |
|--------|------|--------|
| `no-worries.co.uk` | Exclude from topic mining | Expat/international tax specialist (Aus/NZ focus). Minimal IR35/contractor content. Signals are geography-skewed. |
| `hillierhopkins.co.uk` | Exclude from topic mining | Large generalist accountancy firm (1,150 URLs). Topics span audit, charity, property, agriculture. Contractor content is a small subset; pulling the full sitemap adds noise not signal. |
| `brookson.co.uk` | Use selectively | Contractor specialist (896 URLs) but much content predates 2021 IR35 reform and is dated. Filter to evergreen structural topics only. |
| `goforma.com` | Use selectively | Good contractor content (432 URLs) but mixed in with insurance and small business articles outside our core audience. |
| `accountantsforcontractors.co.uk` | Low-value signal | Only 10 URLs, minimal content depth. Thin site. |
| `rockstaraccountants.co.uk` | Low-value signal | 47 URLs, mostly service pages. Little editorial depth. |
| `ontax.co.uk` | Low-value signal | 34 URLs, thin. Skip for gap mining. |

**Net usable universe**: goforma.com, qaccounting.com, freestyleaccounting.com, ams-accountancy.co.uk, ir35shield.co.uk, bauerandcottrell.co.uk, blue-shore.co.uk, brookson.co.uk (evergreen only)

---

## Built inventory (153 pages, snapshot 2026-07-08)

**Blog (50 pages)**: best-umbrella-company-how-to-choose, challenge-ir35-determination-sds, closing-contractor-limited-company, contractor-accountant-fees-cost, contractor-day-rate-to-take-home, contractor-expenses-allowable-guide, contractor-pension-carry-forward, contractor-pension-employer-contributions, contractor-pension-schemes-sipp, contractor-pension-tax-relief, contractor-self-assessment-guide, contractor-tax-planning-guide, contractor-vat-registration-guide, corporation-tax-contractor-limited-company, deemed-employment-payment-explained, director-salary-dividend-split-guide, dividend-tax-rates-contractors-2026, fee-payer-liability-ir35, first-contract-outside-ir35-checklist, flat-rate-vat-limited-cost-trader, home-office-expenses-contractor, how-to-choose-contractor-accountant, how-to-switch-contractor-accountant, how-to-use-cest-tool, inside-ir35-take-home-explained, inside-ir35, ir35-contract-review-checklist, ir35-small-company-exemption, ir35-status-tests-explained, limited-company-vs-umbrella-contractor, mileage-claims-contractor-limited-company, msc-legislation-contractors, mtd-income-tax-contractors-guide, mutuality-of-obligation-ir35, off-payroll-working-rules-private-sector, outside-ir35-take-home-explained, outside-ir35, psc-limited-company-contractor-tax, sds-status-determination-statement, set-up-limited-company-contractor, substitution-clause-ir35, switching-umbrella-to-limited-company, training-subscriptions-expenses-contractor, travel-expenses-inside-ir35, umbrella-company-deductions-explained, umbrella-company-explained, umbrella-company-holiday-pay, vat-flat-rate-scheme-contractors, what-is-a-contractor-accountant, what-is-ir35

**Glossary (37 terms)**: ir35, chapter-8, chapter-10, personal-service-company, inside-ir35, outside-ir35, cest, status-determination-statement, mutuality-of-obligation, control, substitution, reasonable-care, client-led-disagreement-process, blanket-determination, deemed-employment-payment, fee-payer, end-client, small-company-exemption, off-payroll-set-off, dividend, corporation-tax-marginal-relief, directors-loan-s455, business-asset-disposal-relief, members-voluntary-liquidation, taar, umbrella-company, assignment-rate, apprenticeship-levy, key-information-document, umbrella-jsl, managed-service-company, employment-allowance, 24-month-rule, amap-mileage, flat-rate-scheme, limited-cost-trader, vat-registration-threshold, day-rate

**For/* pages (10)**: it-contractors, engineering-contractors, finance-contractors, management-consultants, project-managers, nhs-locum-doctors, oil-gas-contractors, legal-contractors, marketing-contractors, construction-contractors

**Calculators (6)**: contractor-salary-dividend-calculator, corporation-tax-calculator, dividend-tax-calculator, inside-ir35-take-home-calculator, outside-ir35-take-home-calculator, umbrella-vs-limited-calculator

**Other**: ir35-status (pillar), research/uk-contractor-index (data asset), resources (ir35, pay-planning, structure), locations (dynamic), about, services

---

## Recommended topics (31)

Grouped by content category. Each entry lists: suggested blog slug, supporting rationale, competitor evidence.

### Group A: IR35 status and contract mechanics (high priority)

**1. ir35-status-review-service-explained**
Topic: What an IR35 review service does, when a contractor needs one, and how to read the output. Distinct from `ir35-contract-review-checklist` (which covers what to look for in a contract); this covers the professional review process itself.
Competitor evidence: bauerandcottrell.co.uk has dedicated IR35 review service content; ir35shield.co.uk structures its whole offering around this. The built checklist page is informational, not explanatory of the service type.

**2. ir35-working-practices-review**
Topic: Working practices reviews as a separate step from contract review: what HMRC actually investigates, how working practices can override a written contract.
Competitor evidence: "working practices review" appears in the triage.json as a WRONG_PAGE signal pointing at /ir35-status; the topic deserves its own blog page. The existing `ir35-contract-review-checklist` only covers the contract document, not actual practice.

**3. statement-of-work-ir35-guide**
Topic: How Statements of Work (SoW) affect IR35 status; when SoW-based contracts provide outside-IR35 protection, and when they do not.
Competitor evidence: contractoruk.com, qdos, parasol, bauerandcottrell all have SoW/IR35 content. Appeared in the triage.json at 10 impressions (WRONG_PAGE on /ir35-status). Not covered in built inventory.

**4. ir35-blanket-determination-guide**
Topic: What blanket inside-IR35 determinations are, whether they are lawful, and how contractors can challenge them.
Competitor evidence: "blanket determination" is a glossary term already built; a full explainer article with practical steps would answer the query intent more fully. The glossary term page will not rank for navigational queries like "my client gave me a blanket determination".

**5. chapter-10-vs-chapter-8-ir35**
Topic: The difference between Chapter 8 (legacy IR35, contractor-assessed) and Chapter 10 (off-payroll, client-assessed); when each applies and what it means for liability.
Competitor evidence: Both are glossary entries. A comparison article is a distinct piece that several competitor blogs cover. Contractors switching from public to private sector work regularly search this.

### Group B: Limited company operations (high priority)

**6. how-to-pay-yourself-as-contractor-limited-company**
Topic: The full mechanics of paying yourself from a limited company: salary, dividends, director's loan, timing, paperwork. Broader than the existing `director-salary-dividend-split-guide` (which focuses on the optimal split ratio).
Competitor evidence: "paying yourself a wage limited company dividends" and "how much salary should i pay myself as a limited company contractor" appear across 3-4 competitor domains. This is the most common onboarding question for new limited company contractors.

**7. limited-company-tax-deadlines-calendar**
Topic: A complete tax deadline calendar for limited company contractors: corporation tax, self-assessment, VAT, annual accounts, confirmation statement.
Competitor evidence: "a guide to limited company tax deadlines" appears in qaccounting; "a year end checklist for limited company accounting" across 2 domains. Not in built inventory. High utility, link magnet.

**8. do-i-need-an-accountant-for-my-limited-company**
Topic: Whether a limited company contractor needs an accountant (vs. DIY), what tasks require professional input, and how to evaluate cost vs. benefit.
Competitor evidence: Appears across 2 competitor domains. A classic top-of-funnel question with conversion intent. Not in built inventory.

**9. dormant-limited-company-contractor**
Topic: What a dormant company means, when contractors make their company dormant (between contracts), and the filing obligations while dormant.
Competitor evidence: "what does it mean when you have a dormant limited company" appears in blue-shore competitor content. Not in built inventory.

**10. closing-vs-dormant-contractor-limited-company**
Topic: Decision framework: should a contractor close their limited company (MVL or strike-off) or put it dormant between contracts?
Competitor evidence: We have `closing-contractor-limited-company` and the glossary has `members-voluntary-liquidation`. A comparison/decision piece is a distinct gap: "cessation of contracting what to do when its time to close your limited company" and "capital idea company dissolutions" appear in competitor blogs. High value for contractors winding down.

**11. contractor-limited-company-annual-accounts-explained**
Topic: What annual accounts contain, the Companies House filing deadline, the penalty structure, and what the accountant produces.
Competitor evidence: "annual accounts" page exists across 3 competitor domains. Not covered in built blog inventory (there is a services page reference but no explainer article).

**12. company-formation-for-contractors**
Topic: Step-by-step: setting up a limited company as a contractor. Covers Companies House registration, SIC codes (62020 etc.), share structure, bank account.
Competitor evidence: "how to set up a limited company" across 2 competitor domains; `set-up-limited-company-contractor` is in the built inventory -- CHECK: this slug exists, so this topic is covered. SKIP this one.

**Note on #12**: `set-up-limited-company-contractor` is already built. Skip.

### Group C: Umbrella company depth (medium priority)

**13. umbrella-company-employer-ni-explained**
Topic: Why umbrella workers pay both employee and employer NI; how the employer NI is deducted from the assignment rate before the worker sees any money.
Competitor evidence: "umbrella company avoiding national insurance" (brookson) and `umbrella-company-deductions-explained` exists in the built inventory. BUT the built page covers general deductions; a focused piece on the NI mechanics (employer NI from assignment rate, not from gross pay) is a distinct high-value topic that generates repeated confusion and complaints.

**14. umbrella-company-key-information-document-guide**
Topic: What the Key Information Document (KID) is, what it must show by law, and how to use it to compare umbrella companies.
Competitor evidence: `key-information-document` is a glossary term. A full guide article explaining the KID in practice is a separate content need -- especially useful as a comparison/selection tool for contractors. Not in built inventory.

**15. rogue-umbrella-company-warning-signs**
Topic: How to identify non-compliant umbrella companies: mini-umbrella schemes, disguised remuneration, loan charge exposure.
Competitor evidence: "avoid tax avoidance schemes through umbrella companies" (ir35shield), "beware of managed service company legislation" (brookson). Not in built inventory. Significant ongoing enforcement activity makes this timely and evergreen.

**16. umbrella-vs-limited-after-inside-ir35**
Topic: What a contractor should do after being placed inside IR35: umbrella vs. staying in limited company and taking all income as salary.
Competitor evidence: "being outside or inside ir35" (ams-accountancy). Not explicitly covered in built inventory. The built `inside-ir35` and `limited-company-vs-umbrella-contractor` pages approach this separately; a joined-up decision guide is a distinct gap.

### Group D: Contractor expenses depth (medium priority)

**17. subsistence-expenses-contractor-guide**
Topic: Daily subsistence: what a contractor can claim for meals and accommodation when working away from home, the 24-month rule interaction, benchmarked rates.
Competitor evidence: "staying away from home for contractors travel and accommodation expenses" and "travel expenses 2 subsistence expenses" (brookson). `travel-expenses-inside-ir35` exists in the built inventory but covers the IR35 angle. A general subsistence/away-from-home guide for outside-IR35 contractors is absent.

**18. christmas-party-expenses-limited-company**
Topic: What the trivial benefits/annual events exemption allows a contractor director to claim for a Christmas party or team event.
Competitor evidence: "christmas party expenses" appears in 3 competitor domains including across qaccounting and brookson. Not in built inventory. High search intent every Q4; also evergreen as a tax planning reference.

**19. can-i-expense-a-laptop-contractor**
Topic: Whether a contractor can claim a laptop or home computer as a limited company expense; what conditions apply; HMRC's view.
Competitor evidence: "can i expense a laptop" appears in freestyleaccounting. Not in built inventory. Very common practical question, often the first expense query a new contractor has.

**20. professional-indemnity-insurance-contractor**
Topic: What professional indemnity (PI) insurance is, why contractors need it, how much it costs, and whether it is tax-deductible.
Competitor evidence: "a handy guide to contractor insurance" (blue-shore), "five reasons why you need professional indemnity insurance" (brookson). Not in built inventory. Insurance is a key buy-decision trigger; also links to the commercial model.

**21. cycle-to-work-scheme-contractor-limited-company**
Topic: Whether limited company contractor directors can use the cycle-to-work scheme via their own company; the rules and process.
Competitor evidence: "cycle to work scheme" (brookson). Not in built inventory. Niche but high-engagement topic with clear search intent.

### Group E: Self-assessment and compliance depth (medium priority)

**22. payments-on-account-contractor-guide**
Topic: How payments on account work, why contractors are caught by them in year 2, and how to manage cash flow around them.
Competitor evidence: `contractor-self-assessment-guide` is built; "personal tax calculations and payments on account" and "new contractors guide to tax return deadlines" appear in competitor blogs. The existing guide covers the self-assessment process broadly; payments on account is a specific pain point that warrants its own page.

**23. contractor-tax-return-what-to-include**
Topic: A practical guide to completing the self-assessment return for a limited company contractor director: the SA100, supplementary pages, dividend income, employment income if inside IR35.
Competitor evidence: "personal service company tax returns" (brookson), "all you need to know about submitting your self assessment tax return" (qaccounting). The built `contractor-self-assessment-guide` covers the process; a "what to include" guide is more tactical and targets a distinct intent.

**24. ir35-hmrc-investigation-what-happens**
Topic: What an HMRC IR35 compliance check actually looks like: the process, timeline, evidence HMRC requests, how to respond.
Competitor evidence: "all you need to know about hmrc investigations" (ir35shield), "another hmrc compliance check resolved" (ir35shield), "avoiding hmrc horrors" (qaccounting). Not explicitly in built inventory. High anxiety topic; clear informational intent.

### Group F: Take-home pay and financial planning (medium priority)

**25. contractor-take-home-pay-guide**
Topic: A written explainer of how take-home pay is calculated for contractors (outside IR35 via limited company): the mechanics, not just a calculator. Covers day-rate conversion, corporation tax, salary, dividends, personal tax.
Competitor evidence: "take home pay guide" (freestyleaccounting), "take home pay" (brookson, ams-accountancy). The built inventory has take-home calculators and `contractor-day-rate-to-take-home` but the latter is calculator-focused. A long-form written explainer is a distinct piece that ranks for "how is contractor take home calculated" type queries.

**26. contractor-mortgage-guide**
Topic: How contractors can get a mortgage when self-employed or operating through a limited company; which lenders accommodate contractor day-rate income.
Competitor evidence: "contractor mortgages" and "can i get a mortgage as a contractor" appear across 2+ competitor domains. Not in built inventory. High-value lead topic (contractors with a limited company and day-rate income are mortgage-underserved by default lenders).

**27. dividend-voucher-and-board-minutes-guide**
Topic: What a dividend voucher is, why a contractor needs board minutes to support a dividend declaration, and what the paperwork must contain.
Competitor evidence: "declaring dividend vouchers" (brookson), "dividend declarations and vouchers" (brookson), "dividends when can you pay what paperwork" (brookson). Not in built inventory. Common compliance gap for new limited company contractors; low-effort, high-utility article.

### Group G: Contractor-type depth (medium priority -- tied to /for/* pages)

**28. finance-contractor-accounting-guide**
Topic: Finance/banking contractors: IR35 exposure in financial services, expenses specific to the sector, limited company vs. umbrella decision.
Competitor evidence: `/for/finance-contractors` exists but needs a supporting blog article with depth. Finance sector contractors are the second-largest segment after IT; GoForma and qaccounting both cover this.

**29. nhs-locum-doctor-tax-guide**
Topic: Tax for NHS locum doctors working through a PSC or umbrella; IR35 in the public sector, pension annual allowance, expenses.
Competitor evidence: `/for/nhs-locum-doctors` exists. "Healthcare worker tax relief expenses" appears in competitor content. NHS locums are an unusually high-value lead segment (high day rates, complex tax). A dedicated tax guide positions this properly.

**30. construction-contractor-cis-and-ir35**
Topic: The interaction of CIS (Construction Industry Scheme) and IR35 for construction contractors; when CIS applies, when IR35 applies, and how they overlap.
Competitor evidence: "a guide to cis reclaims and tax" (qaccounting), "vat reverse charge for building and construction services" appears in 2 domains. `/for/construction-contractors` is built. CIS is a distinct compliance layer that no current blog page covers. A high-priority gap given the built /for/* page.

**31. legal-contractor-barrister-tax-guide**
Topic: Tax for legal contractors including barristers and solicitors contracting through chambers or a PSC; IR35 position, expenses, VAT for barristers.
Competitor evidence: `/for/legal-contractors` is built. Legal professionals contracting have distinct issues (VAT basis, chambers status). Not covered in competitor sitemap content either, meaning early-mover advantage.

---

## Rejected clusters

The following competitor content categories were reviewed and rejected:

| Cluster | Reason for rejection |
|---------|----------------------|
| Business insurance guides (PI, PL, EL how-much-does-X-cost) | Insurance broker content, not accountancy. Goforma covers heavily. Out of scope for a contractor tax accountant site; no buy-decision fit. |
| Recruitment, finding contracts, CV and LinkedIn advice | HR/jobs content. Out of audience. Goforma and qaccounting include this as top-of-funnel content; we do not need it (no recruitment services offered). |
| Property/landlord topics from goforma/qaccounting | Cross-site content. Not the audience. |
| AUS/NZ/expat tax (from no-worries) | Entirely off-audience. |
| Generalist SME topics (business bank accounts, payroll for employees, hiring first employee) | Goforma covers heavily. Our audience is contractors, not small business employers. |
| News/budget/HMRC announcements | Not evergreen. Excluded by filter. |
| Named court cases and HMRC decisions (Autoclenz, atholl house, etc.) | Legal analysis content. High competition from specialist IR35 advisory firms (bauerandcottrell, ir35shield, ir35update). These are authority signals for established brands, not launch content. Add post-launch only if targeted specifically. |
| Dentist/GP/healthcare employer topics | Off-niche. From hillierhopkins/brookson general client base. |
| eCommerce/retail accounting | Off-niche entirely. |
| Crypto/NFT tax | Tangential. Low contractor-specificity. |

---

## Prioritised launch topic pool (31 topics, ranked)

Tier 1 -- ship first (high commercial intent + search volume floor):

1. `ir35-working-practices-review` -- IR35 status (GSC signal: WRONG_PAGE on /ir35-status)
2. `statement-of-work-ir35-guide` -- IR35 mechanics (GSC signal: 10 impr WRONG_PAGE)
3. `how-to-pay-yourself-as-contractor-limited-company` -- Limited company (highest onboarding query)
4. `do-i-need-an-accountant-for-my-limited-company` -- Conversion intent
5. `it-contractor-accounting-guide` -- IT sector depth (GSC: 16 impr UNSERVED; from GSC lane, approved above)
6. `contractor-take-home-pay-guide` -- Financial planning (supports calculators)
7. `umbrella-company-employer-ni-explained` -- High confusion, unique angle
8. `payments-on-account-contractor-guide` -- Self-assessment gap
9. `rogue-umbrella-company-warning-signs` -- Trust signal + enforcement relevance
10. `construction-contractor-cis-and-ir35` -- Supports /for/construction-contractors

Tier 2 -- second wave:

11. `chapter-10-vs-chapter-8-ir35`
12. `ir35-blanket-determination-guide`
13. `limited-company-tax-deadlines-calendar`
14. `ir35-status-review-service-explained`
15. `professional-indemnity-insurance-contractor`
16. `contractor-mortgage-guide`
17. `subsistence-expenses-contractor-guide`
18. `dividend-voucher-and-board-minutes-guide`
19. `nhs-locum-doctor-tax-guide`
20. `finance-contractor-accounting-guide`
21. `contractor-limited-company-annual-accounts-explained`
22. `engineering-contractor-accountants-guide` (from GSC lane, approved above)
23. `ir35-hmrc-investigation-what-happens`
24. `umbrella-vs-limited-after-inside-ir35`
25. `dormant-limited-company-contractor`

Tier 3 -- later (niche but complete):

26. `closing-vs-dormant-contractor-limited-company`
27. `umbrella-company-key-information-document-guide`
28. `contractor-tax-return-what-to-include`
29. `christmas-party-expenses-limited-company`
30. `can-i-expense-a-laptop-contractor`
31. `cycle-to-work-scheme-contractor-limited-company`
32. `legal-contractor-barrister-tax-guide`

---

## Next step

Owner approval, then:
```
python -m optimisation_engine.discovery.batch_builder --site contractors-ir35 --commit-topics
```
Seed with Tier 1 topics first. Tier 2+ can be batched monthly post-launch.
