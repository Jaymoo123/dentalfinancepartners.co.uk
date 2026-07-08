# Sitemap Gap Discovery 2026-07 — solicitors (accountsforlawyers.co.uk)

Generated: 2026-07-08  
Method: competitor sitemap slugs -> skip-pattern filter -> Jaccard < 0.30 vs 183-page inventory (incl. Wave-1 + Wave-2 draft slugs) -> audience-fit judgment

---

## Universe curation

### Domains retrieved (8 total)

| Domain | URLs | Classification | Verdict |
|--------|------|----------------|---------|
| mmba.co.uk | 169 | Competitor: legal/solicitor accountants | INCLUDED (high signal) |
| thecashroom.co.uk | 476 | Competitor: law firm cashroom/bookkeeping specialist | INCLUDED (high signal, heavy noise in content) |
| armstrongwatson.co.uk | 2181 | Competitor: large regional firm, legal sector division | INCLUDED (filtered to legal-sector slugs only) |
| goodhams.co.uk | 70 | Adjacent: general accountants, some legal | EXCLUDED (no legal-specific content visible in sitemap) |
| coveneynicholls.co.uk | 135 | Adjacent: general accountants | EXCLUDED (no legal-specific content in sitemap) |
| coreadviz.co.uk | 388 | General accountants, no legal specialty evident | EXCLUDED |
| hoa.org.uk | 1049 | Consumer homeowner association | EXCLUDED (consumer audience, not law firm owners) |
| conveyancingcalculator.co.uk | 663 | Consumer conveyancing calculator | EXCLUDED (buyer/seller audience) |

### Failed fetches (7 domains)
thelawfactory.net, rogers-spencer.co.uk, co-oplegalservices.co.uk, sra.org.uk, croneri.co.uk, rpartners.co.uk, braant.co.uk

**Non-competitor flags:**
- sra.org.uk = regulator, not a content competitor; exclusion is correct
- croneri.co.uk = publisher/subscription service (Croner-i legal compliance tools); not a direct lead-gen competitor
- co-oplegalservices.co.uk = consumer legal services (Co-op brand); wrong audience

Coverage note: 3 of the 4 included domains are genuine law-firm-accountancy competitors. thecashroom.co.uk is a bookkeeping/cashiering outsourcer rather than a tax accountant, so its content leans operational rather than tax/compliance; useful for identifying operational topics we lack.

---

## Gap analysis results

Jaccard < 0.30 raw candidates after skip-pattern filter: 578  
After audience-fit filter (legal-sector topics only): ~130  
After removing brand noise (company news, culture posts, awards): ~45 substantive topics  
After clustering and cannibalisation check: **8 recommended clusters, 7 rejected clusters**

---

## Recommended net-new topics

### 1. Outsourced Legal Cashiering — guide for law firms
- **Proposed slug:** `outsourced-legal-cashiering-guide-uk-law-firms`
- **Example competitor URLs:**
  - thecashroom.co.uk/outsource-legal-cashier/
  - thecashroom.co.uk/ultimate-guide-outsourced-legal-cashiering/
  - thecashroom.co.uk/common-questions-outsourcing-cashiering/
  - thecashroom.co.uk/outsourcing-legal-cashiering-save-time-money/
- **Coverage count:** 1 domain (thecashroom.co.uk, 4+ slugs on this topic)
- **Rationale:** thecashroom.co.uk holds this topic entirely. Our inventory has no page on outsourced legal cashiering. The topic is directly adjacent to our audience: a law firm owner deciding whether to outsource the cashroom function vs. keep it in-house and use an accountant for oversight. We can produce an accountant's-perspective guide covering SRA compliance obligations of the outsourced provider, how to evaluate a TPMA-eligible provider, and the tax/cost treatment of cashiering service fees. Differentiates from thecashroom (which sells the service) by being independent advisory.
- **Cannibalisation note:** No existing page covers outsourced cashiering. Nearest are `running-a-law-firm-without-a-client-account-model` and `third-party-managed-accounts-tpma-for-law-firms` (Wave 2 D1/D4). This page should be complementary, not overlapping: frame it as "if you outsource, here is what the SRA expects from the arrangement and what your accountant should check" rather than replicating the TPMA mechanics.

### 2. Legal Cashier Role — what they do and the SRA requirements
- **Proposed slug:** `what-does-a-legal-cashier-do-sra-requirements`
- **Example competitor URLs:**
  - thecashroom.co.uk/what-does-a-legal-cashier-do/
  - thecashroom.co.uk/day-life-legal-cashier/
  - thecashroom.co.uk/legal-cashiering/
- **Coverage count:** 1 domain (thecashroom.co.uk)
- **Rationale:** Law firm owners hiring or managing a legal cashier need to understand the role's SRA-mandated responsibilities (reconciliations, ledger maintenance, authorised withdrawals) and whether their cashier is meeting the standard. This is an operational + compliance question our inventory does not answer. Adjacent to our SRA accounts-rules cluster and to the COFA checklist pages.
- **Cannibalisation note:** `cofa-monthly-checklist-uk-law-firms` covers what the COFA checks; this page covers the cashier role itself. Clear differentiation.

### 3. Law Firm Financial Metrics / KPIs to Track
- **Proposed slug:** `law-firm-financial-metrics-kpis-uk`
- **Example competitor URLs:**
  - thecashroom.co.uk/the-10-financial-metrics-every-law-firm-should-track/
  - thecashroom.co.uk/how-firms-benefit-from-accurate-and-efficient-management-accounts/
  - armstrongwatson.co.uk/sectors/legal-sector/financial-modelling-practice-benchmarking
- **Coverage count:** 2 domains
- **Rationale:** Both thecashroom and armstrongwatson cover this. Our inventory has `law-firm-benchmarking-uk` and `uk-law-firm-management-accounts-monthly` but neither is a standalone KPI reference. A metrics page (lock-up days, realization rate, profit per equity partner, WIP days, debtors days, cash conversion) sits at the intersection of our management-accounts and benchmarking content and would serve a partner wanting to benchmark their firm. Strong lead-gen angle: "see where your firm stands, talk to us."
- **Cannibalisation note:** `law-firm-benchmarking-uk` exists. If that page already covers individual KPI definitions, improve it rather than create a new page. Recommend checking word count and KPI depth of `law-firm-benchmarking-uk` first. If shallow: this is a separate standalone piece. If comprehensive: redirect effort to meta improvement.

### 4. Credit Control for Law Firms
- **Proposed slug:** `credit-control-law-firms-uk-guide`
- **Example competitor URLs:**
  - thecashroom.co.uk/credit-control/
  - thecashroom.co.uk/the-importance-of-effective-credit-control-for-law-firms/
  - thecashroom.co.uk/enhancing-financial-stability-the-crucial-role-of-credit-control-in-law-firms/
- **Coverage count:** 1 domain (thecashroom.co.uk, 4+ slugs)
- **Rationale:** Credit control (chasing unpaid bills, debtor management, SRA client-care letter obligations) is a persistent cash-flow problem for law firms. Our inventory has `law-firm-debt-management` and `law-firm-lock-up-reduction` and `law-firm-cash-flow-management` but no dedicated credit-control guide. thecashroom has strong coverage. For an accountant, the angle is: how poor credit control distorts your management accounts and WIP/lock-up figures, and what the tax implications of bad debts are (VAT on bad debt relief, s.74 ITTOIA bad debt deduction).
- **Cannibalisation note:** Nearest existing pages: `law-firm-lock-up-reduction`, `law-firm-debt-management`, `law-firm-cash-flow-management`. Each is adjacent. A credit-control page can sit as a more operational guide and funnel to these for the tax angles. Jaccard all < 0.25 vs the proposed slug.

### 5. Finance Training for Fee Earners / Partner Financial Literacy
- **Proposed slug:** `finance-training-fee-earners-law-firm-uk`
- **Example competitor URLs:**
  - armstrongwatson.co.uk/sectors/legal-sector/financial-training-partner-progression/finance-training-fee-earners
  - armstrongwatson.co.uk/sectors/legal-sector/financial-training-partner-progression/achieving-success-head-department
  - armstrongwatson.co.uk/sectors/legal-sector/financial-training-partner-progression/financial-training-partner-progression
- **Coverage count:** 1 domain (armstrongwatson.co.uk)
- **Rationale:** armstrongwatson runs a "financial training for partner progression" sub-section. Law firm managing partners regularly face the problem of fee earners who are brilliant lawyers but do not understand WIP, lock-up, billing discipline or profit attribution. An advisory page on this topic positions us as a strategic partner, not just compliance accountants. Audience: managing partners and COFA/COO equivalents at mid-size firms. Linked to our `how-to-set-fee-earner-targets-uk-law-firms` page.
- **Cannibalisation note:** `how-to-set-fee-earner-targets-uk-law-firms` and `billing-discipline-end-of-quarter-uk-law-firms` exist. This page covers the training/educational angle (what to teach fee earners about finance) rather than how to set targets or billing discipline. Complementary.

### 6. Forensic Accounting for Litigation / Expert Witness Services
- **Proposed slug:** `forensic-accounting-litigation-law-firms-uk`
- **Example competitor URLs:**
  - armstrongwatson.co.uk/sectors/legal-sector/forensic-accounting-litigation-working-lawyers
- **Coverage count:** 1 domain (armstrongwatson.co.uk)
- **Rationale:** armstrongwatson has a dedicated forensic-accounting-for-litigation page. We have no forensic accounting content. Law firm solicitors commission forensic accountants in commercial disputes, professional negligence claims, and matrimonial finance (cross-referenced with the "valuations for family lawyers" GSC candidate). The audience is the instructing solicitor. This is a service-area page, not just a blog, and would generate qualified lead-gen enquiries from law firms needing expert witnesses.
- **Cannibalisation note:** No existing forensic accounting page. `business-valuation-for-family-lawyers-uk` (GSC candidate #5) is complementary, not competing. `asset-sale-vs-share-sale-uk-law-firm` and `how-to-value-a-uk-law-firm-2026` are valuation pages for different purposes. Clear gap.

### 7. Restructuring and Financial Distress for Law Firms
- **Proposed slug:** `law-firm-financial-distress-restructuring-uk`
- **Example competitor URLs:**
  - armstrongwatson.co.uk/.../restructuring-insolvency-law-firms-navigating-financial-distress
- **Coverage count:** 1 domain (armstrongwatson.co.uk)
- **Rationale:** A law firm in financial distress faces a distinct set of problems: SRA intervention risk, run-off PII cover triggers, client-account ring-fencing, obligations to refer clients, partner insolvency interaction. Our inventory covers run-off PII (`run-off-cover-cessation-and-tax-treatment`) and succession (`law-firm-succession-planning-guide-uk`) but not the distress scenario. armstrongwatson covers this. A guide aimed at a managing partner whose firm is struggling would generate high-intent referrals.
- **Cannibalisation note:** Nearest: `run-off-cover-cessation-and-tax-treatment`, `law-firm-succession-planning-guide-uk`, `sole-practitioner-succession-planning-uk`. This page is the "firm in distress" scenario — pre-insolvency restructuring, partner capital calls, SRA obligations. Distinct angle.

### 8. SRA Accounts Rules Changes — What Changed and When
- **Proposed slug:** `sra-accounts-rules-changes-history-uk`
- **Example competitor URLs:**
  - thecashroom.co.uk/england-and-wales-new-sra-accounting-rules/
  - thecashroom.co.uk/understanding-the-recent-sra-changes-to-residual-balances-2/
  - thecashroom.co.uk/sra-effective-supervision-guidance/
- **Coverage count:** 1 domain (thecashroom.co.uk)
- **Rationale:** thecashroom has multiple pages on SRA rule changes over time. Our SRA cluster covers the current rules comprehensively but not the change history (useful for COFA and accountants who need to know what changed in the 2019 revision vs the 2011 rules, and what the 2024/25 residual-balance changes mean). An evergreen "what changed and when" reference page attracts traffic from solicitors updating compliance policies after a rule change.
- **Cannibalisation note:** Our `sra-accounts-rules-compliance-guide`, `sra-accounts-rules-essentials`, and `sra-accounts-rules-explained-for-uk-solicitors` cover the current rules. A "changes history" page is a different format and does not duplicate those. Link from existing pages.

---

## Rejected clusters

- **thecashroom brand/company content**: ~180 slugs (celebrating-*, cashroom-recognised-*, asta-la-vista, big-changes-and-new-beginnings, culture-wellbeing, etc.). Company news with no topical value. Kill.
- **General practice management / wellbeing in law**: health-well-being-legal-sector, mental-health-awareness-legal-professional, championing-women-in-law, empowering-next-generation-of-lawyers. Adjacent but not law firm owner finance/tax; not our lane. Kill.
- **Legal technology generics**: ai-use-in-the-legal-industry-pros-and-cons, are-cloud-adopters-taking-over-legal-sector, how-to-make-legal-technology-work-for-you, the-rise-of-legal-tech, transforming-legal-practice-with-ai. Software/tech commentary; no tax/compliance angle for an accountant to own. Kill.
- **Consumer conveyancing content** (from hoa.org.uk, conveyancingcalculator.co.uk, excluded domains): Excluded at universe stage. Correct.
- **General accountancy content from mmba.co.uk**: abta-vs-atol, atol-reporting-accountants, benefit-in-kind-tax, business-asset-disposal-relief, chartered-tax-adviser, avoid-paying-tax-on-rental-income, cryptocurrency-tax-accountant, best-accountants-[city], care-homes-accountants. mmba serves multiple sectors; these slugs are not legal-sector specific. Kill.
- **armstrongwatson case studies / news**: armstrong-watson-legal-sector-team-support-cumbrian-law-firm-sale, legal-sector-corporate-finance-specialists-support-disposal-lupton-fawcett. Case study pages; no topical evergreen value to replicate. Kill.
- **Outsourcing generics**: myths-of-outsourcing, boost-your-business-from-beginner-to-brilliant-with-outsourcing, outsourcing-is-the-solution. Low-specificity. Kill.

---

## Data-quality notes

- thecashroom.co.uk has ~476 URLs but ~40% are company/culture/event noise. The genuine law-firm operational content is valuable but largely covered from a bookkeeping/cashiering angle rather than tax/accountancy.
- armstrongwatson.co.uk's 2181-URL sitemap is dominated by general business content. After keyword filtering to legal-sector paths, ~30 slugs remained. Coverage signal is low but quality is high where present.
- mmba.co.uk is the most directly comparable competitor but has limited legal-specialist content (most of their 169 URLs are general accountancy). Their legal sector section is thin.
- 7 failed sitemap fetches include the three most important law-specific publishers (sra.org.uk, croneri.co.uk). The SRA exclusion is justified (regulator). Croneri is a gated subscription tool, not a content gap source.
- No own-estate domains appeared in the competitor URL file.

---

## Summary counts

Competitor domains included: 3 (mmba.co.uk, thecashroom.co.uk, armstrongwatson.co.uk — filtered)  
Domains excluded at universe stage: 5  
Raw Jaccard < 0.30 candidates: 578  
After audience filter + noise removal: ~45  
Recommended net-new topics: 8  
Rejected clusters: 7
