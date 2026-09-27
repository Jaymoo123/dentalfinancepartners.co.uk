# Care Wave 1 posts: writer brief (2026-09-27)

Shared rules for every post in this wave. The spec `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13 S4b wins over this brief; read it first.

Deliver ONLY `docs/care/_wave1/posts/<slug>.md`. No commit, no database, web fetch only gov.uk, legislation.gov.uk, cqc.org.uk, nhs.uk.

Frontmatter (required): slug, title, date "2026-09-27", dateModified "2026-09-27", updatedDate "2026-09-27", category (verbatim from the list below), metaTitle <= 60, metaDescription <= 155, h1, summary 40 to 60 words that answers the question, author "Care Home Tax Editorial Team", canonical `https://www.carehometax.co.uk/blog/<category-slug>/<slug>` (category slug = lowercase, `&` to `and`, brackets and commas stripped, spaces to hyphens), generator "claude-opus", faqs 4 to 6 {question, answer}, keyTakeaways 3 to 5.

Body: raw HTML only (p, h2, h3, ul/ol, table, strong); first paragraph answers the question with the numbers; question-shaped h2s with the answer in the first sentence; 800 to 1,200 body words; at most five internal links as `<a href="/blog/<category-slug>/<slug>">` (verify each target under `care/web/content/blog/` and that its frontmatter category slugifies to the path), `/calculators/<slug>` (verify in `care/web/src/lib/calculators/`), or `/for/<slug>` and `/services/<slug>` from `care/web/src/data/`.

Tie-breaker for every figure: `docs/care/house_positions.md`; primary law where silent; unsourced figures are left out and listed in your report. Voice sample: the two newest posts in `care/web/content/blog/`. Read the map row (`docs/care/coverage_map_2026-09.json`, match working_title) and the rows sharing its situation; grep related posts so you link rather than repeat. England is the default position; flag Scotland, Wales and Northern Ireland only where they change the answer.

Never: em-dashes; pricing; named people or brands; "chartered", "our accountants", "we advise", "advice"; markdown in the body; shortcodes or CTA markup. Always: British English, direct address, one current tax year, literal pound sign, "a specialist reviews", "your accountant prepares". Validate YAML and counts; report word count, meta lengths, category, sources, figures left out.

Categories: Business Structure and Acquisition | CQC and Financial Compliance | Care Home Accounts and Funding | Fees, FNC and Local Authority Rates | Payroll and Workforce Costs | VAT and Welfare Exemption

## Rows (all MISSING)

1. `care-structure-before-cqc` Sole trader, partnership or limited company before you apply to CQC (decision). Query: cqc registration for new providers.
2. `how-to-start-a-domiciliary-care-agency-money-decisions` How to start a domiciliary care agency: the money decisions in order (decision). Query: how to start a domiciliary care agency.
3. `cost-to-set-up-a-care-agency` What it costs to set up a care agency before the first invoice (question). Query: how to set up a care agency. Link `/calculators/cqc-fee-calculator` if it exists. No price figures of our own; only CQC fees and statutory figures that house positions or CQC publishes.
4. `cqc-registration-domiciliary-care-finance` CQC registration for domiciliary care: the finance side (question). Query: cqc registration domiciliary care.
5. `vat-on-domiciliary-care` Do you charge VAT on domiciliary care (decision). Query: is domiciliary care vat exempt.
6. `supported-accommodation-registration-and-tax` Supported accommodation that is not personal care: who registers you and what changes for tax (decision). Query: supported accommodation ofsted registration.
7. `supported-living-contract-forecast` A lender-ready 24 to 36 month forecast for a supported living contract (number). Query: supported living business plan. Describe the model's structure and the inputs a lender expects, with a worked example labelled as an example; no tool exists, do not link one.
8. `supported-living-company-structure-before-framework-bid` How to structure a supported living company before bidding for a framework place (decision). Query: how to start a supported living business.
9. `opening-a-childrens-home-finance` Opening a children's home: the finance decisions Ofsted will test (decision). Query: how to start a childrens home.
10. `care-personal-assistant-vat-registration` Does a care personal assistant have to register for VAT (decision). Query: vat threshold care services. The audience page `docs/care/_wave1/self-employed-carers-and-personal-assistants.json` holds the reviewed position (a directly engaged PA is outside CQC registration, so outside the welfare exemption; fees standard-rated and counting to £90,000). Go deeper, do not restate.
11. `business-asset-disposal-relief-selling-a-care-business` Business Asset Disposal Relief at 18%: what selling a care business costs from April 2026 (decision). Query: business asset disposal relief care home.
12. `nhs-continuing-healthcare-accounts` NHS continuing healthcare: what changes in your accounts when a resident is CHC funded (question). Query: nhs continuing healthcare funding provider.
13. `vat-grouping-care-brief-2-2025` VAT grouping in care after Revenue and Customs Brief 2/2025 (decision). Query: vat grouping care industry hmrc.
