# Estate fence check: the 612 generic keywords vs the ecommerce site

Date: 2026-09-25. Answers whether the 612 non-ecommerce-topical keywords in the
`ecommerce` gap register can be written on ecommercefinance.co.uk without
hitting a sister site. Content search covered every `*/web/content/blog` and
`*/web/src/app` tree in the estate. Ranking data is a fresh 90-day GSC pull
(query dimension) taken directly from the API on 2026-09-25 for generalist,
Property and ecommerce, not read from the Supabase snapshot table.

## The ruling that already exists

`docs/ecommerce/STATE.md`, "Migrate-vs-fence RULED 2026-07-16: FENCE": the
owner ruled that generalist keeps its six live ecommerce blog posts as-is, and
ecommerce's five competing hub pages (the amazon/shopify/marketplace/
dropshipping/homepage hubs) stay separate with differentiated, seller-specific
depth rather than being merged or redirected into generalist. No 301s, no
migration, reversible later only under the estate's data-gated consolidation
rule (fresh GSC+Bing plus a per-cluster owner approval).

That ruling was scoped to ecommerce-specific topics only. The audit behind it,
`expansion_research/tier1_ecommerce/DEDUP_AUDIT.md`, states the wider
principle directly: "Generic content that MUST stay generalist-owned and be
linked out, not re-explained: £90k VAT registration, VAT scheme comparator,
MTD ITSA mechanics, generic ST-vs-Ltd/incorporation, generic salary-dividend,
generic import PVA/customs. Seller-scoped versions live here with
seller-specific inputs." In other words: the fence already answers this
question for generic tax subjects. They were locked to generalist at launch.
Writing them on ecommerce now would not be opening new ground, it would be
reversing a ruling seven weeks old, on a domain that was never scoped to hold
them.

## Subject-by-subject table

612 keywords grouped into 24 subjects, sorted by combined monthly search
volume. "Estate site covering it" is content-level (a page already exists on
that topic). "Estate site ranking for it" is from the fresh 90-day GSC pull;
"exact match" means the literal query already appears in that site's Search
Console data, "adjacent" means a related query in the same topic family
appears instead.

| Subject | Combined vol/mo | Estate site already covering it | Estate site already ranking for it | Verdict |
|---|---|---|---|---|
| Accounting packages/services (generic, incl. "small business accounting") | 35,580 | generalist — dozens of pages (`accounting-bookkeeping-service-uk-business`, `fixed-fee-accountant-uk-cost-2025-26`, `xero-accountant-uk-guide`, `definitive-guide-online-accountant-uk`) | generalist, adjacent: "xero vs quickbooks uk" 255 imp, "is xero or quickbooks better for a uk business" 120 imp, dozens of "small business accountant [town]" rows | DIRECT CONFLICT |
| VAT rate/threshold (general UK) | 31,870 | generalist — `vat-threshold-2025-26`, `when-to-register-for-vat-*`, `vat-cash-basis-threshold`, `how-to-complete-and-submit-vat-return-uk` | generalist, adjacent: VAT-registration-threshold query variants (small impressions, several rows) | DIRECT CONFLICT |
| Companies House identity verification | 27,000 | Property — 6 dedicated posts (`identity-verification-form`, `companies-house-id-verification-begins-today`, `eccta-2023-id-verification-mandatory-...`, `identity-verification-for-pscs-...`, 2 more) | Property, weak: near-zero impressions on the exact "verify my identity" phrasing; Property does rank on adjacent Companies House reform terms | DIRECT CONFLICT |
| VAT rate by country (Germany, Netherlands, Ireland, Switzerland etc.) | 20,150 | none found anywhere in the estate | none | CLEAR |
| P800 tax refund | 19,640 | generalist — general HMRC refund/rebate cluster (`hmrc-tax-back`, `hm-revenue-customs-tax-refund`, `hmrc-tax-rebate`, `hmrc-claim-tax-refund`, `hmrc-reclaim-tax`, `tax-refund-uk`, `tax-rebate-uk`); none P800-branded specifically | generalist, adjacent: "do hmrc automatically refund overpaid tax" 87 imp | OVERLAP |
| Tax codes (D0, 1257L M1, 500T etc.) | 17,600 | none — no UK PAYE tax-code explainer on any site | none | CLEAR |
| NI contributions/rates | 16,620 | generalist `national-insurance-for-directors`, `employer-ni-calculator` (director-scoped, not generic employee NI); Property/construction-cis have niche NI posts | generalist, adjacent: "national insurance contribution deduction" 18 imp | OVERLAP |
| VAT registration/deregistration process | 15,910 | generalist covers registration well (`when-to-register-for-vat-seasonal-business`, `-zero-rated-goods`, `fundamentals/when-to-register-for-vat-uk`); deregistration only exists niche-scoped (Dentists) | generalist, adjacent: VAT threshold/registration query rows | OVERLAP |
| Small business accountant/accounting (generic head term) | 13,550 | generalist — `fundamentals/small-business-accountant-guide.md`, `what-does-a-small-business-accountant-do-month-to-month` | generalist, adjacent: 15+ "small business accountant [town]" rows, this is generalist's core local/commercial keyword set | DIRECT CONFLICT |
| Salary after-tax calculators ("35k after tax" etc.) | 10,560 | generalist `taxable-income-calculator.md` (adjacent, not a take-home/after-tax salary calculator) | none | OVERLAP |
| UTR | 8,550 | generalist — `unique-taxpayer-reference-utr-uk.md` (exact subject match) | none seen in the 90-day sample | DIRECT CONFLICT |
| Xero accounting packages | 7,200 | generalist — `xero-accountant-uk-guide.md` | generalist, exact-family: "xero accountant uk" 17 imp pos 14.5, large Xero-vs-Quickbooks volume | DIRECT CONFLICT |
| VAT certificate/invoice | 6,360 | none found | none | CLEAR |
| Gross profit/profit calculator | 6,290 | digital-agency, hospitality have niche "gross profit margin" posts, not a generic calculator | none | OVERLAP (weak) |
| HMRC ID/identity verification | 4,120 | none exact (Property's cluster is Companies House, a different agency) | none | OVERLAP |
| Sole trader set up | 4,000 | no direct "how to set up as a sole trader" page, but generalist has deep sole-trader topical authority (`register-as-self-employed-uk-...`) | generalist, adjacent: many "sole trader accountant [town]", "sole trader accounts year end" rows | OVERLAP |
| Pension/payroll | 3,910 | generalist `payroll-services-small-business`, `resources/payroll.md` (payroll: direct); generic pension explainer absent (only NHS-pension niche on Medical/Dentists) | generalist, adjacent: payroll-service query rows | OVERLAP |
| China/Chinese visa Manchester | 3,800 | none — not an accountancy topic, likely pool contamination | none | CLEAR (junk, flag for gap-register hygiene) |
| CIS return | 3,500 | construction-cis owns it fully (`cis-end-of-year-return`, `cis-monthly-return-guide`, `cis-nil-return-explained`) | not matched in this pull (construction-cis wasn't pulled, but content ownership alone settles it) | DIRECT CONFLICT |
| Mileage calculator/rates | 3,440 | generalist — `employee-mileage-45p-tax-free-rules.md` | generalist, exact-family: "mileage claim calculator", "mileage rebate calculator" rows | DIRECT CONFLICT |
| Limited company explainer | 2,920 | generalist `fundamentals/definitive-guide-limited-company-accountant.md` (accountant-framed, not a pure explainer) plus a large "limited company vs X" cluster | generalist, adjacent: none exact | OVERLAP |
| Buying a house tax | 1,300 | Property — whole site is property tax, has stamp duty content though not this exact phrasing | not matched | OVERLAP (Property) |
| Other/long tail (107 distinct keywords) | 35,890 | mixed; not individually checked, mostly generic personal-finance/HMRC-process terms with no obvious estate owner | not checked | mostly CLEAR, spot-check before writing any of these |

## Counts and totals

- **DIRECT CONFLICT: 8 subjects, 130,690 combined vol/mo** (accounting
  packages/services, VAT rate/threshold, Companies House ID verification,
  small business accountant, UTR, Xero, CIS return, mileage)
- **OVERLAP: 10 subjects, 85,270 combined vol/mo** (P800, NI rates, VAT
  registration/deregistration, salary after-tax, gross profit, HMRC ID
  verification, sole trader set up, pension/payroll, limited company
  explainer, buying a house tax)
- **CLEAR: 6 subjects, 121,860 combined vol/mo** (VAT rate by country, tax
  codes, uniform tax rebate, VAT certificate/invoice, China visa noise, other
  long tail)

## What this means for the decision

The owner is choosing between two things: writing a big batch of generic UK
tax content on the ecommerce site to chase volume, or leaving that ground to
the generalist brand and staying narrow on ecommerce.

The numbers say most of that volume is not free to take. Of the 337,820
searches a month across these 612 keywords, about 130,000 sit on subjects
where a sister site, mostly the generalist brand, already has a page written
about exactly that thing: how to register for VAT, what a small business
accountant does, what Xero is, what a UTR is, mileage rates, CIS returns, and
the Companies House ID checks that Property has written six articles about. A
further 85,000 sit on subjects where a sister site is close enough (it covers
the same topic from a slightly different angle) that a new ecommerce page
would sit right next to it rather than filling a real gap. Only around
122,000 of the volume, roughly a third, is genuinely open ground the estate
does not touch anywhere. And a chunk of even that CLEAR bucket is low-value:
VAT rates in other countries and PAYE tax codes are the kind of pages that
bring in a browsing visitor, not someone who needs a UK ecommerce accountant.

There is also a rule already on the books, made seven weeks ago by the owner
himself when this site was built: keep generic UK tax and business content on
the generalist brand, and only put the seller-specific version of a topic on
ecommerce (the DEDUP_AUDIT explicitly names VAT registration, MTD, and
generic company-structure content as things that "must stay generalist-owned
and be linked out, not re-explained"). Writing these 612 keywords on
ecommerce would not be filling a gap, it would be reopening a decision that
was already made, and doing it on the smaller, newer site rather than the one
built to hold this kind of content.

**The generic-tax route looks mostly closed, not open.** Two thirds of the
demand collides with content the estate already owns, most sharply with
generalist, and the one clear win subject in the CLEAR bucket (uniform tax
rebate, 38,060/mo) is a pure personal-tax topic with nothing to do with
running an online shop, so it would not read as credible coming from an
ecommerce accountant's site anyway. The lazier and cheaper move, if the
volume is wanted, is to route it through generalist rather than build a
second, weaker version of it on ecommerce.

---

*Technical note: subjects grouped by shared significant tokens across the
612-keyword filtered set (`uk_relevant=true, we_rank=false,
peer_ranks_top20=true, band=100-5000, ecommerce_topical=false`) from
`docs/ecommerce/gap_register_2026-09-25.json`. GSC pulled live via
`agents/utils/gsc_client_oauth.py` `GSCClient.get_search_analytics`, 90-day
window, query dimension, for `sc-domain:hollowaydavies.co.uk`,
`sc-domain:propertytaxpartners.co.uk`, `sc-domain:ecommercefinance.co.uk`,
read 2026-09-25. Not written to Supabase; the client's own
`gsc_query_client.py` upsert path was not used.*
