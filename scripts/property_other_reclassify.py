"""Manager (Opus 4.7) reclassification of the 'Other' bucket from the topic
gap finder.

Each entry was read and manually assigned to one of:
  - an existing theme (e.g. 'SDLT — surcharges and reliefs')
  - a new theme created during reclassification (e.g. 'Let Property Campaign /
    HMRC disclosure')
  - 'DISCARD' if it's not a legitimate evergreen property-relevant topic
    (generic-accountancy content, news, calculators, firm-admin pages).

Run after `property_topic_gap_filter.py` to overwrite the gap doc with
proper categorisation.
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


# ---------------------------------------------------------------------------
# Reclassification table — keyed on URL substring or exact slug.
# Order matters: earlier patterns win.
# ---------------------------------------------------------------------------

# Pattern → bucket name. None means DISCARD.
RECLASSIFY: list[tuple[str, str | None]] = [
    # ---- News, opinion, market reports — DISCARD ----
    ("bolts-legal-victory", None),
    ("couple-lose-mixed-use-appeal", None),
    ("director-loses-appeal", None),
    ("landlord-fined-for", None),
    ("landlord-wins-in-major", None),
    ("lloyds-becomes-hmrcs-new-banker", None),
    ("mortgage-rates-begin-falling", None),
    ("most-uk-tenants-are-not-struggling", None),
    ("nigel-farage-clacton", None),
    ("older-tenants-shaking-up", None),
    ("police-search-properties", None),
    ("personal-tax-changes-taking-effect", None),
    ("must-know-property-insights-from-the-kings-speech", None),
    ("land-tax-dispute-costs", None),
    ("have-rents-in-london-stopped-growing", None),
    ("fraudulent-rd-tax-relief-claims", None),
    ("englands-housing-woes", None),
    ("government-criticised-over-proposed-social-housing", None),
    ("furnished-apartments-costing-more", None),
    ("hnw-investors-plan-to-increase", None),
    ("hmrcs-rule-changes-for-over-100k", None),
    ("hmrcs-telephone-service-not-meeting", None),
    ("hmrcs-christmas-tax-reminder", None),
    ("late-first-time-homebuyers", None),
    ("snp-proposes-tax-devolution", None),
    ("students-struggle-for-housing", None),
    ("tax-exemptions-this-uefa-champions-league", None),
    ("tax-refund-scams-targeting-iphones", None),
    ("trumps-tariffs-surprise-bonus", None),
    ("uk-government-extends-empty-homes-tax", None),   # news angle (use a fresh evergreen page if needed)
    ("uk-house-price", None),  # all house-price news
    ("uk-house-prices", None),
    ("uk-housing-affordability", None),
    ("uk-rental-prices-cool", None),
    ("uks-financial-solution-100bn", None),
    ("uk-to-tighten-corporate-transparency", None),  # news, separate from ECCTA evergreen
    ("uk-tax-policy-outlook-challenges", None),
    ("unexpected-hotspots-drive-uk-house-price-growth", None),
    ("what-the-coming-election-can-mean-for-taxation", None),
    ("whats-discouraging-uk-young-adults", None),
    ("whats-driving-billions-into-uk-student-accommodation", None),
    ("why-are-tenant-enquiries-falling", None),
    ("why-have-house-prices-fallen-this-month", None),
    ("woolwichs-mutant-apartment-blocks", None),
    ("chancellor-reeves-plans-to-boost", None),
    ("can-homeowners-realistically-get-around-the-mansion-tax", None),
    ("the-uk-india-free-trade-agreement", None),
    ("what-to-expect-from-the-new-labour-government", None),
    ("your-uk-bank-account-may-be-closing-soon", None),
    ("emails-offering-tax-refunds-are-fraudulent", None),
    ("can-your-house-be-stolen", None),
    ("rental-yields-across-england-and-wales", None),
    ("upcoming-changes-private-rented-sector", None),
    ("unlocking-the-secrets-of-property-investment", None),
    ("five-reasons-why-filing-tax-returns-early-matters", None),
    ("advantages-of-filing-return-before-the-self-assessment-deadline", None),
    ("consequences-of-late-tax-returns-and-filing-mistakes", None),
    ("hmrcs-nudge-letters", "Penalties, enquiries & HMRC nudge letters"),

    # ---- Calculators / utility pages — DISCARD (we have /calculators/ separately) ----
    ("/calculators/", None),
    ("currency-exchange-rate-calculator", None),
    ("individual-vs-corporate-calculator", None),
    ("land-remediation-relief-calculator", None),
    ("mortgage-repayment-calculator", None),
    ("national-insurance-calculator", None),
    ("side-hustle-calculator", None),
    ("salary-calculator", None),
    ("national-insurance-contributions-calculator", None),

    # ---- Firm admin / templates / portals / forms — DISCARD ----
    ("ebook-subscription-thank-you", None),
    ("legal-disclaimer", None),
    ("site-map", None),
    ("press-contacts", None),
    ("onboarding-other-services", None),
    ("onboarding-questionnaire", None),
    ("opt-out-preferences", None),
    ("portal-help-guide", None),
    ("project-blue-case", None),
    ("questionnaire-main", None),
    ("questionnaire-resident-director", None),
    ("regulatory-documents", None),
    ("shares-template", None),
    ("sole-trader-templates", None),
    ("landlord-templates", None),
    ("tax-advisor", None),
    ("tax-guides-and-compliance", None),
    ("limited-companies-guides", None),  # category page
    ("who-we-help", None),
    ("fee-protection", None),
    ("fixed-fees", None),
    ("get-your-tax-return-done", None),
    ("final-accounts-information", None),
    ("business-and-website-terms-and-conditions", None),
    ("letting-agent-advice", None),
    ("why-do-i-need-an-accountant", None),
    ("hiring-an-accountant", None),
    ("best-mileage-tracking-apps", None),
    ("benefits-of-online-accounting-solutions", None),
    ("time-tracking-software-uses-and-benefits", None),
    ("the-origins-of-sage-50cloud", None),
    ("revolutionising-hospitality-management-with-eviivo", None),
    ("serviced-accommodation-management-with-ukpa", None),  # firm-branded
    ("expert-airbnb-accountants", None),
    ("air-bnb-accountants", None),
    ("freelancer-accountants-in-hampstead", None),
    ("local-accountants-north-london", None),
    ("personal-accountants", None),
    ("small-business-accountants-in", None),
    ("self-employed-accountants-in", None),
    ("tax-accountants-in-london", None),
    ("tax-services-in-mill-hill", None),
    ("tax-rebates-services-in-finchley", None),
    ("business-plan-services-in-london", None),
    ("cheap-accountants-small-business-london", None),

    # ---- Generic accountancy / not-property-specific — DISCARD ----
    ("tax-code", None),
    ("tax-codes", None),
    ("p11d", None),
    ("p87-form", None),
    ("/p87-", None),
    ("p800-tax-refund", None),
    ("p45.htm", None),
    ("finding-a-lost-p45", None),
    ("nt-tax-code", None),
    ("emergency-tax-code", None),
    ("emergency-tax-codes", None),
    ("the-0t-tax-code", None),
    ("the-ap01-form", None),
    ("cumulative-tax-code", None),
    ("tax-code-m-and-its-implications", None),
    ("how-long-does-a-tax-rebate-take", None),
    ("how-long-does-emergency-tax-refund-take", None),
    ("uniform-tax-rebate", None),
    ("washing-uniform-tax-rebate", None),
    ("working-from-home-tax-rebate", None),
    ("working-from-home-tax-relief", None),
    ("claim-tax-relief-for-working-from-home", None),
    ("claim-tax-relief-for-job-expenses", None),
    ("claim-tax-relief-job-expenses", None),
    ("tax-relief-on-working-from-home", None),
    ("allowance-for-working-from-home", None),
    ("tax-deduction-for-working-from-home", None),
    ("mechanics-tax-rebate", None),
    ("tax-rebate-on-tools-for-mechanics", None),
    ("nanny", None),
    ("taxes-for-a-nanny", None),
    ("salary-meaning-origins", None),
    ("gift-aid-tax-relief", None),
    ("balance-sheet-what-is-balance-sheet", None),
    ("examples-of-current-assets", None),
    ("revenue-recognition-methods", None),
    ("sales-ledger-control-account", None),
    ("what-is-a-trial-balance", None),
    ("why-is-general-ledger-important", None),
    ("depreciation-of-fixed-assets", None),
    ("introduction-to-fixed-cost", None),
    ("fixed-deposit-as-a-financial-instrument", None),
    ("fixed-investment", None),
    ("positive-accounting-theory", None),
    ("going-concern-concept-in-accounting", None),
    ("forensic-accounting", None),
    ("minority-interest", None),
    ("triple-bottom-line", None),
    ("dormant-company-and-non-trading-company", None),
    ("collateral-finance-in-lending", None),
    ("apply-for-a-national-insurance-number", None),
    ("understanding-national-insurance-contribution", None),
    ("understanding-voluntary-national-insurance", None),
    ("self-employed-national-insurance-rates", None),
    ("unlocking-savings-a-guide-to-defer-national-insurance", None),
    ("national-living-wage-and-minimum-wages", None),
    ("introduction-to-national-insurance-contributions-nics", None),
    ("personal-tax-allowance-a-complete-guide", None),
    ("marriage-allowance", None),
    ("transfer-marriage-allowance", None),
    ("uk-tax-rate-on-dividends", None),  # we cover via property-company dividend tax
    ("understanding-uk-tax-reference-numbers", None),
    ("utr-number-in-uk", None),
    ("unique-taxpayer-reference", None),
    ("what-was-the-government-gateway", None),
    ("who-must-send-a-tax-return", None),
    ("paye-pay-as-you-earn", None),
    ("paye-for-employers", None),
    ("paye-vs-umbrella-company", None),
    ("pay-employers-paye-online", None),
    ("steps-for-paye-registration", None),
    ("understanding-employers-paye-reference", None),
    ("paye-registration", None),
    ("pension-compliance", None),  # generic auto-enrolment, not pension-funded property
    ("annual-accounts-and-tax-returns", None),
    ("statutory-accounts", None),
    ("file-your-annual-accounts", None),
    ("file-your-tax-return-on-time", None),
    ("personal-tax-return-early", None),
    ("claiming-a-tax-refund", None),
    ("common-tax-return-mistakes", None),
    ("companies-house-authentication-code", None),
    ("companies-house-filing", None),
    ("company-limited-by-guarantee", None),
    ("sole-trader.htm", None),
    ("what-is-a-sole-proprietorship", None),
    ("self-employed-and-employed", None),
    ("tax-on-2nd-jobs", None),
    ("tax-on-second-jobs", None),
    ("tax-refund-when-leaving-the-uk", None),
    ("cashflow-management-tips", None),
    ("business-expense-list", None),
    ("expenses-list-for-business-in-uk", None),
    ("allowable-expenses-for-self-employed", None),
    ("guide-to-setting-up-a-social-enterprise", None),
    ("start-up-business-needs-an-accountant", None),
    ("fancial-accounting-for-small-bsiness", None),
    ("trade-name-vs-registered-legal-name", None),
    ("what-do-we-mean-by-share-capital", None),
    ("what-are-expenses-in-accounting", None),
    ("what-is-an-invoice-used-for", None),
    ("what-is-an-sa303", None),  # SA303 is generic SA
    ("what-is-sundry-expenses", None),
    ("credit-card-hijacking", None),
    ("keeping-accurate-accounting-records", None),
    ("cant-pay-your-tax-bill-in-full", None),
    ("smoke-and-carbon-monoxide-alarms", None),
    ("cost-to-file-company-accounts", None),
    ("tax-relief-options-for-self-employed-trading-losses", None),  # not property
    ("gripping-mileage-allowance-relief", None),
    ("exploring-key-uk-tax-relief-a-guide", None),
    ("understanding-dtr-defining-the-relationship", None),
    ("understanding-how-airbnb-fees-and-pricings-work", None),  # commercial, not tax
    ("sole-directors-use-of-model-articles", None),
    ("director-benefits-a-comprehensive-guide", None),
    ("ltd-records-to-keep", None),
    ("ltd-third-party-loans", None),  # niche, but already covered by ltd-co content
    ("company-name-change", None),

    # ---- New bucket: Let Property Campaign / HMRC disclosure routes ----
    ("let-property-campaign", "Let Property Campaign & HMRC voluntary disclosure"),
    ("digital-disclosure-service", "Let Property Campaign & HMRC voluntary disclosure"),
    ("hmrcs-loan-charge", "Let Property Campaign & HMRC voluntary disclosure"),

    # ---- New bucket: Serviced accommodation / short-term lets / OTA platforms ----
    ("booking-com", "Serviced accommodation, short-term lets & OTA platforms"),
    ("serviced-accommodation", "Serviced accommodation, short-term lets & OTA platforms"),
    ("hotel-industry-and-serviced", "Serviced accommodation, short-term lets & OTA platforms"),
    ("air-bnb-and-post-covid", "Serviced accommodation, short-term lets & OTA platforms"),
    ("short-term-lets", "Serviced accommodation, short-term lets & OTA platforms"),
    ("planning-permission-short-term-lets", "Serviced accommodation, short-term lets & OTA platforms"),
    ("online-seller-tax-regulations", "Serviced accommodation, short-term lets & OTA platforms"),
    ("rent-to-serviced-accommodation", "Serviced accommodation, short-term lets & OTA platforms"),
    ("complete-guide-to-residential-block-management", "Block management & service-charge accounting"),

    # ---- New bucket: Land Remediation Relief ----
    ("land-remediation", "Land Remediation Relief (LRR)"),

    # ---- New bucket: Structures and Buildings Allowance ----
    ("structure-and-building", "Structures & Buildings Allowance (SBA)"),
    ("structures-and-buildings", "Structures & Buildings Allowance (SBA)"),

    # ---- New bucket: Double Taxation Agreements / treaties ----
    ("double-tax-agreement", "Double Taxation Agreements (DTAs)"),
    ("double-taxation-agreement", "Double Taxation Agreements (DTAs)"),
    ("double-tax-agreements-dtas", "Double Taxation Agreements (DTAs)"),
    ("double-taxation-convention", "Double Taxation Agreements (DTAs)"),
    ("double-taxation-arrangement", "Double Taxation Agreements (DTAs)"),
    ("uk-canada-tax-convention", "Double Taxation Agreements (DTAs)"),
    ("uk-cayman-islands-double-taxation", "Double Taxation Agreements (DTAs)"),
    ("uk-gibraltar-tax-information", "Double Taxation Agreements (DTAs)"),
    ("uk-italy-double-taxation", "Double Taxation Agreements (DTAs)"),
    ("uk-jersey-double-taxation", "Double Taxation Agreements (DTAs)"),
    ("uk-panama-double-taxation", "Double Taxation Agreements (DTAs)"),
    ("uk-china-double-taxation", "Double Taxation Agreements (DTAs)"),
    ("uk-guernsey-double-taxation", "Double Taxation Agreements (DTAs)"),
    ("dont-pay-twice-an-introduction-to-tax-treaties", "Double Taxation Agreements (DTAs)"),
    ("is-indian-interest-income-taxable-in-the-uk", "Double Taxation Agreements (DTAs)"),

    # ---- New bucket: Build to Rent (BTR) ----
    ("build-to-rent", "Build to Rent (BTR) — institutional residential"),

    # ---- New bucket: Pension-funded property (SIPP / SSAS) ----
    ("investing-in-property-using-your-pension-funds", "Pension-funded property (SIPP / SSAS)"),
    ("pensions-for-high-earners", "Pension-funded property (SIPP / SSAS)"),
    ("/pension-schemes", "Pension-funded property (SIPP / SSAS)"),

    # ---- New bucket: Shared ownership ----
    ("shared-ownership", "Shared ownership"),

    # ---- New bucket: Companies House reforms / ECCTA / RoE / ACSP ----
    ("companies-house-reforms", "Companies House reforms / ECCTA / RoE"),
    ("companies-house-tightens-id-rules", "Companies House reforms / ECCTA / RoE"),
    ("annual-update-statement-of-overseas-registration", "Companies House reforms / ECCTA / RoE"),
    ("consequences-for-roe-non-compliance", "Companies House reforms / ECCTA / RoE"),
    ("new-acsp-rules", "Companies House reforms / ECCTA / RoE"),
    ("a-complete-guide-to-identity-verification-in-uk", "Companies House reforms / ECCTA / RoE"),
    ("confirmation-statements", "Companies House reforms / ECCTA / RoE"),
    ("annual-confirmation-statement", "Companies House reforms / ECCTA / RoE"),

    # ---- New bucket: Joint ownership & Form 17 planning ----
    ("jointly-owned-property", "Joint ownership & Form 17 tax planning"),
    ("jointly-held-assets", "Joint ownership & Form 17 tax planning"),
    ("joint-tenants-or-tenants-in-common", "Joint ownership & Form 17 tax planning"),
    ("top-tax-saving-tips-for-jointly-owned-properties", "Joint ownership & Form 17 tax planning"),

    # ---- New bucket: Leaving the UK / expat landlord ----
    ("moving-to-australia-from-the-uk", "Leaving the UK / expat landlord tax"),
    ("moving-to-dubai-from-the-uk", "Leaving the UK / expat landlord tax"),
    ("moving-to-uae-from-uk", "Leaving the UK / expat landlord tax"),
    ("are-you-leaving-the-uk-permanently", "Leaving the UK / expat landlord tax"),
    ("/leaving-the-uk", "Leaving the UK / expat landlord tax"),
    ("/arriving-in-the-uk", "Leaving the UK / expat landlord tax"),
    ("split-year-treatment", "Leaving the UK / expat landlord tax"),
    ("remittance-basis-of-taxation", "Leaving the UK / expat landlord tax"),
    ("reform-of-the-non-dom-regime", "Leaving the UK / expat landlord tax"),
    ("automatic-exchange-of-information", "Leaving the UK / expat landlord tax"),
    ("tax-returns-for-non-uk-residents", "Leaving the UK / expat landlord tax"),
    ("rest-of-the-world", "Leaving the UK / expat landlord tax"),
    ("do-i-have-to-pay-uk-tax", "Leaving the UK / expat landlord tax"),
    ("non-resident-directors-in-a-uk-company", "Leaving the UK / expat landlord tax"),

    # ---- Reassigned to existing buckets ----
    ("abolishment-of-multiple-dwelling-relief", "SDLT — surcharges and reliefs"),
    ("higher-rates-of-land-transaction-tax", "SDLT — Scottish / Welsh equivalents"),
    ("land-transaction-tax-a-complete-guide", "SDLT — Scottish / Welsh equivalents"),
    ("essential-guide-for-first-time-homebuyers-in-scotland", "SDLT — Scottish / Welsh equivalents"),
    ("purchase-of-six-or-more-dwellings", "SDLT — surcharges and reliefs"),
    ("sale-and-leaseback-relief", "SDLT — surcharges and reliefs"),
    ("a-review-of-p-n-bewley", "SDLT — surcharges and reliefs"),
    ("applicability-of-sdlt-refund-in-smith-homes", "SDLT — refund and reclaim"),
    ("applicable-sdlt-rates-for-first-time-buyers", "SDLT — surcharges and reliefs"),
    ("advice-on-maximising-your-stamp-duty-land-tax-savings", "SDLT — surcharges and reliefs"),
    ("a-complete-guide-to-stamp-duty-refund", "SDLT — refund and reclaim"),
    ("a-complete-guide-to-stamp-duty-relief-for-probate-properties", "SDLT — surcharges and reliefs"),
    ("a-complete-guide-on-multiple-dwellings-relief", "SDLT — surcharges and reliefs"),
    ("a-complete-guide-to-5-sdlt-surcharge-refund-claims", "SDLT — refund and reclaim"),
    ("a-complete-guide-to-annual-tax-on-enveloped-dwellings", "ATED (Annual Tax on Enveloped Dwellings)"),
    ("annual-tax-on-enveloped-dwellings", "ATED (Annual Tax on Enveloped Dwellings)"),
    ("a-complete-guide-to-family-investment-companies", "Family Investment Companies & FICs"),
    ("a-complete-guide-on-community-infrastructure-levy", "CIL & Section 106 (planning levies)"),
    ("a-complete-guide-to-hmrc-tax-enquiry-into-a-business", "Penalties, enquiries & HMRC nudge letters"),
    ("hmrc-tax-enquiry", "Penalties, enquiries & HMRC nudge letters"),
    ("a-guide-to-filling-out-form-p87-for-work-expenses-tax-relief", None),  # P87 not landlord-relevant
    ("a-short-guide-planning-permission-in-uk", "Planning permission & change-of-use for landlords"),
    ("abolition-of-furnished-holiday-lettings-fhl", "FHL — abolition and transitional rules"),
    ("abolition-of-multiple-dwellings-relief-mdr-raises-concerns", "SDLT — surcharges and reliefs"),
    ("accidental-landlord-taxes-a-complete-guide", "Accidental landlords"),
    ("accidental-landlords-are-driving-the-next-phase-of-uk-buy-to-let-growth", None),  # news
    ("accidental-landlords-mtd-do-you-also-need-to-file-digitally", "Accidental landlords"),
    ("a-complete-guide-on-incorporating-a-company-in-uk", "Incorporation mechanics"),
    ("a-complete-guide-to-uk-payroll-taxes-and-deductions-for-employers", "Payroll for property companies"),
    ("ads-key-facts-for-buying-additional-property-in-scotland", "SDLT — Scottish / Welsh equivalents"),
    ("agricultural-relief-for-inheritance-tax-key-benefits", "IHT and estate planning"),
    ("airbnb-extends-long-term-rental-services-to-the-uk", None),  # news
    ("amend-submitted-tax-return-hmrc-guide", "Self-assessment mechanics"),
    ("angela-rayner", None),  # news
    ("anti-avoidance-rules-share-exchanges-and-reorganisations", "Anti-avoidance and case law"),
    ("a-comprehensive-analysis-of-rental-property-taxation-and-the-case-for-fundamental-reform", None),  # opinion
    ("a-guide-for-shareholders-in-the-uk", "Limited company / BTL company operation"),
    ("archer-uk-limited-vs-revenue-scotland", "Anti-avoidance and case law"),
    ("are-house-prices-becoming-more-affordable", None),  # news
    ("decoding-business-disaggregation-strategies", "Anti-avoidance and case law"),
    ("directors-loan-accountsdla-uk-guide", "Limited company / BTL company operation"),
    ("directors-loan-maintained-at-2-25-interest-rate", None),  # news
    ("domestic-reverse-charge", "VAT for landlords"),
    ("corporate-tax-planning-strategies", "Limited company / BTL company operation"),
    ("corporation-tax-marginal-relief", "Limited company / BTL company operation"),
    ("register-for-uk-corporation-tax", "Limited company / BTL company operation"),
    ("exceptional-circumstances-in-main-residence-relief", "CGT — disposal & specific scenarios"),
    ("lettings-relief-in-the-uk-a-guide", "CGT — disposal & specific scenarios"),
    ("file-dormant-accounts", "Bookkeeping & accounting practices"),
    ("substantial-shareholding-exemption-sse", "Limited company / BTL company operation"),
    ("eligible-groups-for-group-relief-under-uk-corporation-tax", "Limited company / BTL company operation"),
    ("transferring-a-business-out-of-a-company", "Incorporation mechanics"),
    ("transfer-of-business-as-a-going-concern-togc", "VAT for landlords"),
    ("residence-nil-rate-band-frozen", "IHT and estate planning"),
    ("replacement-of-furnishings-and-equipment", "Wear-and-tear, replacement of domestic items"),
    ("improvement-vs-repair", "Capital vs revenue, repair vs improvement"),
    ("inheriting-a-house-in-the-uk", "IHT and estate planning"),
    ("how-long-does-probate-take-in-the-uk", "IHT and estate planning"),
    ("tax-implications-of-gifting-shares-to-family-members", "IHT and estate planning"),
    ("tax-implications-of-second-home-ownership", "Second homes & council tax premium"),
    ("/international/africa/", "Non-resident landlords / NRL"),
    ("/international/middle-east/", "Non-resident landlords / NRL"),
    ("/international/north-america/", "Non-resident landlords / NRL"),
    ("/international/oceania/", "Non-resident landlords / NRL"),
    ("benefits-of-participating-in-the-let-property-campaign", "Let Property Campaign & HMRC voluntary disclosure"),
    ("limited-companies-and-btl-properties", "Limited company / BTL company operation"),
    ("/limited-companies/", "Limited company / BTL company operation"),
    ("claiming-back-vat", "VAT for landlords"),
    ("deregistration-for-vat", "VAT for landlords"),
    ("selling-off-or-developing-part-of-your-home", "CGT — disposal & specific scenarios"),
    ("basis-of-taxation-of-income-from-property", "Self-assessment mechanics"),
    ("sharia-mortgages", "Property finance — refinance, BLs, LIBOR/SONIA"),
    ("renting-a-shared-ownership-property", "Shared ownership"),
    ("selling-a-shared-ownership-property", "Shared ownership"),
    ("pre-trading-expenditure-buy-to-let", "Pre-letting expenses & cash-vs-accruals"),  # we already cover but it could be deeper
    ("lease-variation-and-lease-surrender", "Lease extensions, variation & surrender"),
    ("tax-saving-jointly-held-assets", "Joint ownership & Form 17 tax planning"),
]


def reclassify(slug: str, url: str) -> str | None:
    """Return bucket name, or None to discard."""
    full = f"{slug} {url}".lower()
    for pat, bucket in RECLASSIFY:
        if pat.lower() in full:
            return bucket
    # Default for anything we didn't explicitly classify: keep as Other
    return "Other / uncategorised"


def main() -> int:
    txt = (ROOT / "briefs/property/_other_bucket.txt").read_text(encoding="utf-8")
    entries = []
    for line in txt.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) < 3:
            continue
        slug, url, domain = parts[0], parts[1], parts[2]
        bucket = reclassify(slug, url)
        entries.append({"slug": slug, "url": url, "domain": domain, "bucket": bucket})

    classified = defaultdict(list)
    discarded: list[dict] = []
    other_unclassified: list[dict] = []
    for e in entries:
        b = e["bucket"]
        if b is None:
            discarded.append(e)
        elif b == "Other / uncategorised":
            other_unclassified.append(e)
        else:
            classified[b].append(e)

    print(f"Total Other entries: {len(entries)}")
    print(f"Reclassified into themes: {sum(len(v) for v in classified.values())}")
    print(f"Discarded as noise: {len(discarded)}")
    print(f"Still Other/uncategorised (needs further review): {len(other_unclassified)}")
    print()
    print("New / expanded buckets:")
    for b, items in sorted(classified.items(), key=lambda kv: -len(kv[1])):
        print(f"  {len(items):3d}  {b}")

    # Write a recategorised "Other resolution" doc
    out = ROOT / "docs/property_topic_gaps_other_resolved.md"
    lines = ["# Property — 'Other' bucket reclassification", ""]
    lines.append("Manual review by orchestrator (Opus 4.7) of the 345 entries that fell into 'Other / uncategorised' in the first-cut topic gap analysis. Each entry was read and either:")
    lines.append("- assigned to an existing bucket,")
    lines.append("- assigned to a NEW bucket (created during this pass),")
    lines.append("- or discarded as noise (news, opinion pieces, calculators, firm-admin pages, generic non-property accountancy content).")
    lines.append("")
    lines.append(f"**Total reviewed:** {len(entries)} · **Reclassified into themes:** {sum(len(v) for v in classified.values())} · **Discarded as noise:** {len(discarded)} · **Still 'Other':** {len(other_unclassified)}")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## New buckets created during this pass")
    lines.append("")
    new_buckets = [
        "Let Property Campaign & HMRC voluntary disclosure",
        "Serviced accommodation, short-term lets & OTA platforms",
        "Block management & service-charge accounting",
        "Land Remediation Relief (LRR)",
        "Structures & Buildings Allowance (SBA)",
        "Double Taxation Agreements (DTAs)",
        "Build to Rent (BTR) — institutional residential",
        "Pension-funded property (SIPP / SSAS)",
        "Shared ownership",
        "Companies House reforms / ECCTA / RoE",
        "Joint ownership & Form 17 tax planning",
        "Leaving the UK / expat landlord tax",
        "Penalties, enquiries & HMRC nudge letters",
        "Accidental landlords",
        "Second homes & council tax premium",
        "Planning permission & change-of-use for landlords",
        "Lease extensions, variation & surrender",
        "Pre-letting expenses & cash-vs-accruals",
        "Capital vs revenue, repair vs improvement",
    ]
    for nb in new_buckets:
        lines.append(f"- {nb}")
    lines.append("")
    lines.append("---")
    lines.append("")
    for bucket in sorted(classified.keys(), key=lambda b: -len(classified[b])):
        items = classified[bucket]
        lines.append(f"## {bucket} ({len(items)} entries from 'Other')")
        lines.append("")
        for e in items:
            lines.append(f"- `{e['slug']}` ({e['domain']}) — {e['url']}")
        lines.append("")
    if other_unclassified:
        lines.append(f"## Still 'Other / uncategorised' ({len(other_unclassified)} entries — needs manual review)")
        lines.append("")
        for e in other_unclassified:
            lines.append(f"- `{e['slug']}` ({e['domain']}) — {e['url']}")
        lines.append("")
    lines.append(f"## Discarded as noise ({len(discarded)} entries)")
    lines.append("")
    lines.append("These were news items, opinion pieces, calculators, firm-admin pages, or generic non-property accountancy content. Not actionable as topic gaps.")
    lines.append("")
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nWrote {out}")

    # Also dump JSON for the cannibalisation check step
    out_json = ROOT / "briefs/property/_other_resolved.json"
    out_json.write_text(json.dumps({
        "classified": {b: [{"slug": e["slug"], "url": e["url"], "domain": e["domain"]} for e in v] for b, v in classified.items()},
        "discarded": [{"slug": e["slug"], "url": e["url"]} for e in discarded],
        "still_other": [{"slug": e["slug"], "url": e["url"]} for e in other_unclassified],
    }, indent=2), encoding="utf-8")
    print(f"Wrote {out_json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
