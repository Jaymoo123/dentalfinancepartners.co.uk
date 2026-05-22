"""Wave 2 brief builder — Property net-new pages (IHT + DTAs + Expat).

Adapted from scripts/property_track1_brief_builder.py. Three changes vs track1:
  (a) Authority-link buckets for IHT (IHTA 1984, IHTM, Pawson, Brander),
      DTAs (OECD Model 2017, INTM, specific treaties),
      Expat (TCGA 1992 s.10A, FA 2013 SRT, NRCGT regime, NRL scheme).
  (b) Brief output dir: briefs/property/wave2/.
  (c) References the Wave 2 house_positions extension sections (§§15-17).

Universal rules (§4.8) are kept verbatim from track1. The 19-step workflow
is also verbatim except references to "track1" → "wave2".
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
BRIEFS_DIR = ROOT / "briefs/property/wave2"


# ===========================================================================
# Per-page assignments — manager pre-decisions for Wave 2 (~30 pages)
# ===========================================================================

ASSIGNMENTS: list[dict] = [
    # ---- Session A: IHT (10 pages) ----
    {
        "slug": "iht-property-investors-decision-framework-2026-onwards",
        "category": "landlord-tax-essentials",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "Decision framework for a UK landlord's IHT exposure given the April 2026 BPR/APR cap + April 2027 pension inclusion + April 2030 NRB/RNRB freeze. Walk through the key questions: how much exposure, which mitigations remain available (lifetime giving without GROB, life cover, FIC share dilution), and the trigger events to reassess. Complementary to our existing rental-property IHT pillar, which is descriptive; this is decision-led.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/tips-for-avoiding-inheritance-tax-in-uk/",
            "https://www.ukpropertyaccountants.co.uk/uk-government-contemplates-inheritance-tax-reform/",
            "https://www.ukpropertyaccountants.co.uk/why-more-families-pay-inheritance-tax-now/",
        ],
    },
    {
        "slug": "iht-gifts-with-reservation-of-benefit-property",
        "category": "landlord-tax-essentials",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "Deep dive on s.102 Finance Act 1986 (gifts with reservation) applied to property. The classic 'gift the house, keep living there' trap, the rent-payment escape route (commercial rent, periodically reviewed, actually paid), POAT as the back-stop, and the limited Sch 20 para 6 co-ownership carve-out. Worked example: parent gifting £600k home to children continuing to occupy.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/gift-with-reservation-of-benefit/",
        ],
    },
    {
        "slug": "iht-lifetime-gifts-7-year-rule-property-taper",
        "category": "landlord-tax-essentials",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "PETs vs CLTs for property: how the 7-year clock works on outright property gifts (PETs) vs gifts into trust (CLTs with immediate 20% IHT). Taper relief mechanics (s.7(4) IHTA 1984) including the 'why taper doesn't help if you stay within the NRB' point that's widely misunderstood. Worked example for a parent gifting a £350k BTL to a child and surviving 5 years.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/inheritance-tax-lifetime-gifts-vs-transfer-at-death/",
            "https://www.ukpropertyaccountants.co.uk/when-does-a-gift-or-transfer-become-chargeable-to-uk-inheritance-tax-iht/",
        ],
    },
    {
        "slug": "iht-april-2026-bpr-apr-cap-property-impact",
        "category": "landlord-tax-essentials",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "The 6 April 2026 reform: £1m combined BPR+APR 100% relief cap, 50% relief above the cap (effective 20% IHT), AIM rate drop to 50%. Who is affected (mixed estates with both trading and farming, property developers with WIP, serviced-accommodation operators meeting Pawson). Who isn't (pure BTL landlords — still don't qualify per Pawson). Frame as a 'what changed, who cares, what to do' update.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/",
            "https://www.ukpropertyaccountants.co.uk/farmland-supply-value-drops-is-iht-reform-to-blame/",
            "https://www.ukpropertyaccountants.co.uk/agricultural-relief-for-inheritance-tax-key-benefits/",
        ],
    },
    {
        "slug": "serviced-accommodation-bpr-eligibility-pawson-test",
        "category": "property-types-and-specialist-tax",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "When a serviced-accommodation business clears the Pawson 'wholly or mainly trading' threshold and qualifies for BPR. The fact-pattern checklist from the line of cases (Pawson, Brander, Personal Representatives of Pawson): managed kitchen, daily cleaning, breakfast, concierge, on-site management. Why most Airbnb-style short-lets fail the test. Worked example for a 6-unit serviced-accommodation operation.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/maximising-business-relief-to-reduce-inheritance-tax/",
            "https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/",
        ],
    },
    {
        "slug": "iht-non-resident-uk-property-april-2025-residence-test",
        "category": "non-resident-landlord-tax",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "The April 2025 IHT residence-based regime for non-UK-domiciled (now non-LTR) individuals owning UK property. 10-of-20-tax-years long-term resident test. Tail period of up to 10 years after departure where worldwide assets remain in IHT scope. Schedule A1 IHTA 1984 look-through to UK residential property held via overseas companies (in force since 6 April 2017) is unaffected.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/uk-inheritance-tax-for-non-residents-rules-and-exemptions/",
            "https://uklandlordtax.co.uk/uk-inheritance-tax-for-non-residents/",
        ],
    },
    {
        "slug": "inheriting-uk-rental-property-executors-step-by-step",
        "category": "capital-gains-tax",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "Executor's-eye view of the practical process when a UK rental property passes through probate: IHT400 valuation, getting the grant, period of administration tax treatment (PRs at 24% CGT), assents to beneficiaries vs sales by PRs, dealing with sitting tenants, and the handover of NRL responsibilities if a beneficiary is non-resident. Complementary to our existing 'CGT on inherited rental' which is purely a calculation page; this is process-oriented.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/how-long-does-probate-take-in-the-uk/",
            "https://www.ukpropertyaccountants.co.uk/inheriting-a-house-in-the-uk/",
        ],
    },
    {
        "slug": "iht-residence-nil-rate-band-2m-taper-property-portfolios",
        "category": "landlord-tax-essentials",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "RNRB mechanics for landlord estates: the £175,000 allowance, the £2m taper threshold, fully extinguished at £2.35m (single) / £2.7m (with transferable RNRB). Worked example showing how a landlord with £1.6m of net BTL equity plus a £700k home loses RNRB entirely. Downsizing addition (IHTA 1984 ss.8FA-8FE) preserving RNRB on downsized residences. Why portfolio-rich landlords often plan against full RNRB loss.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/understanding-residence-nil-rate-band-inheritance-tax-relief/",
            "https://uklandlordtax.co.uk/residence-nil-rate-band-frozen/",
        ],
    },
    {
        "slug": "pension-iht-april-2027-landlord-estate-planning",
        "category": "landlord-tax-essentials",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "The 6 April 2027 reform bringing unused DC pension funds into the deceased's IHT estate. Practical impact on the 'use pension last' decumulation strategy that landlords commonly use. Interaction with the £2m RNRB taper (pensions newly aggregated). Spousal exemption and charity exemption still apply. Action items pre-2027: reconsider decumulation order, review beneficiary nominations, charitable considerations.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/uk-government-contemplates-inheritance-tax-reform/",
        ],
    },
    {
        "slug": "agricultural-property-relief-mixed-estate-1m-cap",
        "category": "property-types-and-specialist-tax",
        "bucket": "IHT and estate planning",
        "session": "A",
        "framing": "APR mechanics for a mixed estate where farmland sits alongside BTL property and a trading business. The £1m combined BPR+APR cap from 6 April 2026 forces a choice: APR on the farm, BPR on the business, or split. Worked example for a landlord with £800k farm + £400k trading business + £1.2m BTL equity. APR-specific tests (5-year occupation, 7-year ownership where let), and the 'farming the let' borderline pattern.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/agricultural-relief-for-inheritance-tax-key-benefits/",
            "https://www.ukpropertyaccountants.co.uk/farmland-supply-value-drops-is-iht-reform-to-blame/",
        ],
    },

    # ---- Session B: DTAs (10 pages) ----
    {
        "slug": "tax-treaties-property-investors-treaty-framework-guide",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "Pillar page for how Double Taxation Agreements (DTAs / tax treaties) interact with UK property ownership by non-residents. OECD Model 2017 framework: Art 4 residence tie-breaker, Art 6 immovable property (situs state has primary taxing rights), Art 13 capital gains (NRCGT applies as statutory override regardless of treaty), Art 23 elimination methods. Critical clarification: treaties don't eliminate UK tax on UK property; they allocate taxing rights and provide credit relief. Distinct from our existing NRL-scheme guide which covers the statutory withholding regime — this is the treaty-framework counterpart.",
        "source_urls": [
            "https://uklandlordtax.co.uk/tax-guide/double-tax-agreements-dtas/",
            "https://www.landlordstax.co.uk/dont-pay-twice-an-introduction-to-tax-treaties/",
        ],
    },
    {
        "slug": "uk-us-dta-property-tax-implications-landlords",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "The 2001/2002 UK-US treaty applied to property scenarios. The saving clause (Art 1(4)) — US citizens UK-resident still file US returns, foreign tax credit reduces double-tax burden. Art 6 (immovable property) and Art 13 (capital gains) — UK retains taxing rights over UK property. Article 24A elimination of double taxation. Worked example: US-citizen UK-resident with a Manchester BTL.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/double-taxation-convention-dta-uk-and-spain/",
        ],
    },
    {
        "slug": "uk-france-dta-property-rental-income-cgt",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "The 2008 UK-France treaty applied to property. UK retains primary taxing rights on UK property income (Art 6) and gains (Art 24A). Where the landlord is French-resident, French tax-credit method gives credit for UK tax paid. Specific French wrinkles: contribution sociale (CSG/CRDS), French wealth tax (IFI) on UK property held by French residents, the UK-France IHT treaty (1963) and its tie-breakers.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/double-taxation-convention-dta-uk-and-spain/",
        ],
    },
    {
        "slug": "uk-spain-dta-property-uk-resident-spanish-holiday-home",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "The 2013 UK-Spain treaty applied two ways: (1) UK landlord with a Spanish holiday let — Spanish IRNR on letting income, UK FTC; (2) Spanish-resident landlord with UK property — UK source taxation under Art 6, Spanish credit relief. Art 13(4) property-rich entity rule. The Spanish impuesto sobre el patrimonio (wealth tax) on UK property and its creditability.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/double-taxation-convention-dta-uk-and-spain/",
        ],
    },
    {
        "slug": "uk-india-dta-property-rental-income-treatment",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "The 1993 UK-India treaty applied to property. Older treaty without Art 13(4) indirect-disposal provisions — UK NRCGT still applies on UK property-rich shares. Indian DTC method for relieving double tax on rental income. Practical scenario: Indian-resident NRI owning UK property, gross-payment NRL1, Indian tax credit on UK rent paid.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/double-taxation-convention-uk-and-india/",
            "https://www.ukpropertyaccountants.co.uk/is-indian-interest-income-taxable-in-the-uk/",
        ],
    },
    {
        "slug": "uk-uae-dta-property-no-tax-jurisdiction-asymmetry",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "The 2016 UK-UAE treaty in a no-personal-income-tax jurisdiction context. UAE has no personal IT, so the credit mechanism is one-way (UK tax paid creditable in UAE = irrelevant). Practical impact: UK tax on UK property is the full cost. Common scenario: Dubai-based UK national landlord, NRCGT on disposal, 60-day return. Why some UAE residents incorrectly assume their UAE residence shields them from UK tax.",
        "source_urls": [
            "https://uklandlordtax.co.uk/moving-to-dubai-from-the-uk/",
            "https://uklandlordtax.co.uk/moving-to-uae-from-uk/",
        ],
    },
    {
        "slug": "uk-italy-dta-tie-breaker-property-residence-disputes",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "Where dual residence under UK SRT and Italian domestic law triggers the Art 4 tie-breaker. The cascade: permanent home, centre of vital interests, habitual abode, nationality. Italian Agenzia delle Entrate competent-authority practice. Worked example: an executive with UK and Italian homes, family in Italy, work primarily in UK — how the test resolves.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/uk-italy-double-taxation-agreement-dual-residence-tie-breaker-rules/",
        ],
    },
    {
        "slug": "dta-tie-breaker-test-dual-residence-property-owners",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "Generic Article 4 OECD tie-breaker mechanics. Four-stage cascade (permanent home, centre of vital interests, habitual abode, nationality), then mutual agreement as final fallback. Why it matters for property: source-state UK taxation is unchanged, but residence-state credit relief depends on which country wins the tie-breaker. Worked example with the SRT failed-on-both-sides scenario.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/uk-italy-double-taxation-agreement-dual-residence-tie-breaker-rules/",
        ],
    },
    {
        "slug": "foreign-tax-credit-uk-property-overseas-landlords",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "UK foreign tax credit (FTC) rules for landlords with overseas property: claim mechanics on the foreign pages of self-assessment, TIOPA 2010 ss.18-25 framework, credit limited to the lower of foreign tax paid and UK tax on the same income. Worked example: UK-resident landlord with a Portuguese rental — Portuguese IRS withholding, UK assessment, FTC offset. The arising-basis treatment post-April-2025 (no more remittance-basis).",
        "source_urls": [
            "https://uklandlordtax.co.uk/tax-guide/double-tax-agreements-dtas/",
        ],
    },
    {
        "slug": "uk-jersey-guernsey-isle-of-man-dtas-property-investors",
        "category": "non-resident-landlord-tax",
        "bucket": "Double Taxation Agreements (DTAs)",
        "session": "B",
        "framing": "Consolidated treatment of the three Crown Dependency DTAs (Jersey 2018, Guernsey 2018, Isle of Man 2016 — all modern OECD form). Practical relevance: company structures historically routed through CDs for UK property held by overseas investors. Art 13(4) indirect-disposal applies, so a CD company holding UK residential property remains in NRCGT and the new IHT residence-based regime. End of historic asset-protection shelter.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/double-taxation-agreement-uk-and-isle-of-man/",
            "https://www.ukpropertyaccountants.co.uk/uk-jersey-double-taxation-agreement-provisions-and-implications/",
            "https://www.ukpropertyaccountants.co.uk/understanding-the-uk-guernsey-double-taxation-agreements/",
        ],
    },

    # ---- Session C: Leaving the UK / Expat (10 pages) ----
    {
        "slug": "leaving-uk-landlord-12-month-pre-departure-checklist",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "Pre-departure 12-month action checklist for a UK landlord moving abroad: SRT planning to nail residence year, NRL1 application timing, agent appointment, tenant notification, mortgage lender consent, split-year qualification, P85 form, last self-assessment timing. Action-led; complementary to our existing expat obligations page which is descriptive.",
        "source_urls": [
            "https://uklandlordtax.co.uk/tax-guide/are-you-leaving-the-uk-permanently/",
            "https://www.landlordstax.co.uk/resources/guide-for-non-resident-landlords/leaving-the-uk/",
        ],
    },
    {
        "slug": "srt-statutory-residence-test-landlord-decision-tree",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "FA 2013 Sch 45 SRT decision tree applied to a landlord scenario: the three automatic overseas tests, three automatic UK tests, then the five sufficient ties test. Decision tree with worked numerical examples for a landlord-emigrant. Specific traps: the 'only home' test misread, day-counting deeming rules, exceptional circumstances cap.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/non-resident-directors-in-a-uk-company/",
        ],
    },
    {
        "slug": "split-year-treatment-cases-1-8-landlord-departure-arrival",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "FA 2013 Sch 45 Part 3 split-year cases 1-8 with property-specific worked examples. Departure cases (1-3): full-time overseas work, partner thereof, ceasing to have any UK home. Arrival cases (4-8): only UK home, full-time UK work, ceasing overseas work, partner thereof, starting to have UK home. Priority rules where multiple cases apply (paras 53-55).",
        "source_urls": [
            "https://uklandlordtax.co.uk/tax-guide/split-year-treatment/",
        ],
    },
    {
        "slug": "temporary-non-residence-5-year-cgt-recapture-property",
        "category": "capital-gains-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "TCGA 1992 s.10A applied to landlord-emigrants: the 5-year-or-less period of non-residence test (verified HMRC CG26540 wording), 4-of-7-years prior-residence pre-condition, deemed return-year accrual. What's caught (assets held at departure + disposed in non-residence period) and what isn't (assets acquired and disposed entirely in the non-residence period). Interaction with NRCGT — UK property gains caught by NRCGT regardless of s.10A.",
        "source_urls": [
            "https://uklandlordtax.co.uk/tax-guide/are-you-leaving-the-uk-permanently/",
        ],
    },
    {
        "slug": "nrl-scheme-letting-agents-quarterly-returns-mechanics",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "Letting-agent side of the NRL scheme: NRL2 quarterly returns, calculation of withholdable rent (gross less allowable deductions), payment to HMRC, NRL6 annual statements to landlords. Agent's personal liability for unwithheld tax under SI 1995/2902. The 'reasonable expenses' test for net-payment basis. Complementary to our existing NRL-approval and NRL-withholding pages, both of which are landlord-facing.",
        "source_urls": [
            "https://uklandlordtax.co.uk/what-we-do/tax-for-landlords/tax-returns-for-non-uk-residents/",
        ],
    },
    {
        "slug": "moving-to-dubai-uk-rental-property-tax-pathway",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "Pathway for a UK landlord relocating to Dubai/UAE with a UK rental retained. UAE has no personal income tax (asymmetric treaty), so UK tax is the full cost on UK rent. SRT planning, NRL1 application, NRCGT on eventual disposal. Common misconceptions about Dubai residence shielding UK tax. Practical worked example with timing.",
        "source_urls": [
            "https://uklandlordtax.co.uk/moving-to-dubai-from-the-uk/",
            "https://uklandlordtax.co.uk/moving-to-uae-from-uk/",
        ],
    },
    {
        "slug": "moving-to-australia-uk-rental-property-tax-pathway",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "Pathway for a UK landlord relocating to Australia with UK rental retained. UK-Australia DTA (2003) framework. Australian Income Tax Assessment Act 1997 inclusion of worldwide income for tax residents; ATO foreign income tax offset (FITO) for UK tax paid. Capital gains: ATO assessment plus UK NRCGT — credit relief. Worked timeline with permanent residency and tax residency under the ATO 'resides' test.",
        "source_urls": [
            "https://uklandlordtax.co.uk/moving-to-australia-from-the-uk/",
        ],
    },
    {
        "slug": "non-dom-reform-april-2025-fig-regime-property-investors",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "The April 2025 abolition of the non-domiciled regime and the 4-year Foreign Income and Gains (FIG) regime that replaces it for new UK arrivals. Eligibility: not UK-resident in any of the preceding 10 tax years. The 12% Temporary Repatriation Facility (TRF) for 2025/26 and 2026/27 to bring pre-April-2025 foreign income onshore. CGT rebasing election to 5 April 2017 for pre-existing remittance-basis users. Implications for property: foreign rental on arising basis from year 5.",
        "source_urls": [
            "https://www.landlordstax.co.uk/reform-of-the-non-dom-regime/",
            "https://www.ukpropertyaccountants.co.uk/remittance-basis-of-taxation-in-the-uk/",
        ],
    },
    {
        "slug": "returning-to-uk-after-non-residence-property-portfolio",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "Return-side of the emigration arc for landlords. SRT arrival-year tests, split-year Cases 4-8, end of NRL withholding (cancel NRL1), CGT recapture under s.10A on assets disposed during temporary non-residence (5-year-or-less test), re-entry to the residence-based IHT regime, and the FIG 4-year window for any newly UK-resident individual with foreign property. Worked example: 4-year Dubai resident returning with portfolio additions.",
        "source_urls": [
            "https://www.landlordstax.co.uk/resources/guide-for-uk-resident-landlords/arriving-in-the-uk/",
        ],
    },
    {
        "slug": "nrcgt-indirect-disposal-property-rich-companies-shares",
        "category": "non-resident-landlord-tax",
        "bucket": "Leaving the UK / expat landlord tax",
        "session": "C",
        "framing": "Indirect-disposal NRCGT under TCGA 1992 ss.14B-14H and Sch 4AA: where a non-resident disposes of shares (≥25% interest) in an entity deriving ≥75% of its value from UK land, the gain is caught even though the asset disposed is shares. 6 April 2019 effective date, rebasing to that date. 60-day reporting requirement. Different from direct disposals: trading-company exemption, related-party look-through, multi-step disposals.",
        "source_urls": [
            "https://www.landlordstax.co.uk/resources/guide-for-non-resident-landlords/leaving-the-uk/",
        ],
    },
]


# ===========================================================================
# Authority links by bucket (Wave 2)
# ===========================================================================

AUTHORITY_LINKS = {
    "IHT and estate planning": [
        ("IHTA 1984 (legislation.gov.uk)", "https://www.legislation.gov.uk/ukpga/1984/51/contents"),
        ("HMRC IHT Manual (IHTM)", "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual"),
        ("HMRC IHT400 guidance", "https://www.gov.uk/guidance/how-to-complete-form-iht400-inheritance-tax-account"),
        ("FA 1986 s.102 (Gifts with Reservation)", "https://www.legislation.gov.uk/ukpga/1986/41/section/102"),
        ("Pawson v HMRC [2013] UKUT 050 (TCC)", "https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc"),
        ("Brander v HMRC [2010] UKUT 300 (TCC)", "https://www.gov.uk/tax-and-chancery-tribunal-decisions/brander-v-hmrc-2010-ukut-300-tcc"),
        ("HMRC IHTM25000 (Business Relief)", "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000"),
        ("HMRC IHTM24000 (Agricultural Relief)", "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm24000"),
        ("APR/BPR reforms from 6 April 2026 (gov.uk)", "https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms"),
    ],
    "Double Taxation Agreements (DTAs)": [
        ("OECD Model Tax Convention 2017", "https://www.oecd.org/tax/treaties/model-tax-convention-on-income-and-on-capital-condensed-version-20745419.htm"),
        ("HMRC INTM (International Manual)", "https://www.gov.uk/hmrc-internal-manuals/international-manual"),
        ("HMRC INTM150000 (Double Taxation Treaties)", "https://www.gov.uk/hmrc-internal-manuals/international-manual/intm150000"),
        ("UK tax treaties hub (gov.uk)", "https://www.gov.uk/government/collections/tax-treaties"),
        ("TIOPA 2010 (Taxation International and Other Provisions Act)", "https://www.legislation.gov.uk/ukpga/2010/8/contents"),
        ("HMRC HS304 (Non-residents — relief under DTAs)", "https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet"),
        ("HMRC Self Assessment Foreign pages (SA106)", "https://www.gov.uk/government/publications/self-assessment-foreign-sa106"),
    ],
    "Leaving the UK / expat landlord tax": [
        ("TCGA 1992 s.10A (Temporary non-residence)", "https://www.legislation.gov.uk/ukpga/1992/12/section/10A"),
        ("FA 2013 Sch 45 (Statutory Residence Test)", "https://www.legislation.gov.uk/ukpga/2013/29/schedule/45"),
        ("HMRC RDR3 (SRT guidance)", "https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt"),
        ("HMRC CG26500+ (s.10A temporary non-residence)", "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg26500"),
        ("HMRC Non-resident landlord scheme (gov.uk)", "https://www.gov.uk/guidance/non-resident-landlord-scheme"),
        ("HMRC P85 (Leaving the UK)", "https://www.gov.uk/tax-right-retire-abroad-return-to-uk"),
        ("HMRC CGT for non-residents on UK property", "https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property"),
        ("HMRC 60-day CGT property reporting", "https://www.gov.uk/guidance/report-and-pay-your-capital-gains-tax"),
        ("Non-dom reform / FIG regime (gov.uk)", "https://www.gov.uk/government/publications/reforming-the-taxation-of-non-uk-domiciled-individuals"),
    ],
}


# ===========================================================================
# Brief assembly (shared logic with track1; only string content differs)
# ===========================================================================

STOP = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025", "with", "on", "from", "this",
}


def tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return {t for t in s.split() if t and t not in STOP and len(t) >= 2}


def load_existing_pages() -> list[dict]:
    out = []
    for md in sorted((ROOT / "Property/web/content/blog").glob("*.md")):
        text = md.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        end = text.find("---", 3)
        if end == -1:
            continue
        try:
            fm = yaml.safe_load(text[3:end]) or {}
        except yaml.YAMLError:
            fm = {}
        out.append({
            "slug": md.stem,
            "category": fm.get("category", ""),
            "title": fm.get("title", ""),
            "tokens": tokenise(md.stem + " " + str(fm.get("title", "")) + " " + str(fm.get("h1", ""))),
        })
    return out


def jaccard(a: set, b: set) -> float:
    return len(a & b) / len(a | b) if a and b else 0.0


def closest_existing(slug: str, existing: list[dict], top_n: int = 5) -> list[dict]:
    gt = tokenise(slug)
    scored = [(jaccard(gt, e["tokens"]), e) for e in existing]
    scored.sort(key=lambda x: -x[0])
    return [{"slug": e["slug"], "category": e["category"], "title": e["title"], "score": round(s, 2)} for s, e in scored[:top_n] if s > 0.10]


def load_redirect_overlaps(slug: str) -> list[dict]:
    overlap_path = ROOT / "briefs/property/_redirect_overlap.json"
    if not overlap_path.exists():
        return []
    data = json.loads(overlap_path.read_text(encoding="utf-8"))
    out = []
    for entry in data:
        if entry["slug"] == slug:
            for ovl in entry.get("overlap_redirects", []):
                out.append(ovl)
    return out


UNIVERSAL_RULES = """\
## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS — you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes** — just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments (match each where relevant in FAQs): Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments. Conversion moments to consider:
  - After the first worked numerical example
  - After a comparison table
  - After explaining a high-cost trap or pitfall
  - At the end of a decision-framework section
- Avoid: opening the page with an aside (let the user trust you first); placing an aside inside a worked example; >3 asides total.
- Don't write the same opening sentence each time. Avoid "Many landlords ask about ...". Vary the opening per page.

### Schema
- FAQs live in frontmatter `faqs:` array. The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.
- If your topic suits HowTo schema (step-by-step process), flag in your work-log and the orchestrator will assess whether to add HowTo schema in the template (NOT in body).

### Cannibalisation
- The "Closest existing pages" section below shows what we already have on related topics. **Read those pages before writing**. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, or angles.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** It is the tie-breaker. For Wave 2, pay particular attention to §§9-10 (headline IHT/DTAs positions) AND §§15-17 (the Wave 2 extensions covering IHT depth, DTA article-level detail, and expat / leaving-the-UK working detail). If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave2_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count** — aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 2 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator** — don't write a generic "complete guide" template.
- Vary your H2 structure per page. IHT-mechanism pages and IHT-event pages should NOT have the same outline. DTA-bilateral pages must each lead with the bilateral-specific wrinkle.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.
"""


WORKFLOW = """\
## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 2, §§9-10 give the headline positions and §§15-17 give the Wave-2 working detail.
2. **Claim the page** in `docs/property/wave2_page_tracker.md` — change Status `⬜ todo` to `🟡 in_progress`, add today's UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide what's worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (paths in the "Closest existing pages" section). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it — don't pattern-match siblings), meta title (lead with the primary query word order, **≤62 chars**), meta description (**≤158 chars**), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required):
   ```python
   import sys; sys.path.insert(0, '.')
   from optimisation_engine.blog_generator.post_processing import fetch_image_for_post
   image = fetch_image_for_post("uk property tax")
   ```
   Pick a query that's visually evocative and topical. If Pexels returns None, leave `image: ''`.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: `title`, `slug`, `canonical`, `date`, `author`, `category`, `metaTitle` (≤62 chars), `metaDescription` (≤158 chars), `altText`, `image`, `imageCredit` (if Pexels), `h1`, `summary`, `schema: ''`, `faqs: [...]` (10-14 entries), `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`, `editorialNote`.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages`:
    ```bash
    python -c "
    import sys; sys.path.insert(0,'.')
    from optimisation_engine.competitor._db import _sql, _esc
    slug = '<your-slug>'
    cat = '<your-category>'
    _sql(f\\"INSERT INTO monitored_pages (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type, notes) VALUES ('property', {_esc(slug)}, '/blog/{cat}/{slug}', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 'rewrite', 'Wave 2 net-new page') ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING\\")
    print('registered')
    "
    ```
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 1 had multiple tracker-ahead-of-branch drift incidents; the orchestrator calibrated mid-wave. For Wave 2 we bake the discipline in: step 14 (commit) MUST happen before step 16 (mark done).
    ```bash
    git add Property/web/content/blog/<slug>.md briefs/property/wave2/<slug>.md docs/property/wave2_page_tracker.md
    git commit -m "Wave 2 (<bucket>): write <slug>"
    ```
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave2_page_tracker.md` (`🟡 in_progress` to `✅ done`) with a 1-line Notes summary. (Step 14 MUST be complete first.)
17. **Append any site-wide flags** to `docs/property/wave2_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave2_discovery_log_session_<X>.md` (append-only).
19. **Next page** — claim ONE more page from the top of your remaining list.

## Session-side watcher pattern (new for Wave 2)

When you append a `STATUS: open` question to your Q&A file, spawn a Monitor task on that file watching for the `STATUS: answered` flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue.

```bash
QFILE="docs/property/wave2_questions_session_<X>.md"
LATEST_Q=$(grep -oE '^## \\[Q-[0-9]+\\]' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. Do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.
"""


WORK_LOG_TEMPLATE = """\
## Per-page work-log (fill in as you go — supports resumability if interrupted)

### Decisions
- **Final slug:** <unchanged from assignment, OR explain override>
- **Final category:** <unchanged from assignment, OR explain override>
- **H1 chosen:** <text>
- **Meta title chosen:** <text>
- **Why these vs other options:** <1-2 lines>

### Competitor URLs fetched
- <URL> — <key takeaway in 1 line>
- <URL> — <key takeaway>
- <URL> — <key takeaway>

### Existing-page review (from "Closest existing pages")
- `<our-slug>` — <how does it overlap? are you writing the applied/local version?>
- `<our-slug>` — <as above>

### Citations added (external authority)
- <citation 1>
- <citation 2>
- <citation 3>
- <citation 4>

### Internal links added (to our existing pages)
- `/blog/<category>/<slug>` — <why>
- `/blog/<category>/<slug>` — <why>

### Inline CTA placements
- After section "<H2 name>" — <reasoning>
- After section "<H2 name>" — <reasoning>

### Build attempts
- Attempt 1 — <pass / fail + reason>

### Verification
- FAQ schema count in built HTML matches frontmatter: <yes / no>
- Em-dashes in markdown: <0 / fixed>
- Tailwind classes in markdown: <0 / fixed>
- Meta title length: <chars>
- Meta description length: <chars>
- Internal links resolve: <yes / no>
- monitored_pages row inserted: <yes / no>
- Body word count: <number>

### Flags raised to wave2_site_wide_flags.md
- <none / one-line summary of each flag>

### 2-3 sentence summary
<freeform>
"""


def build_brief(assignment: dict, existing: list[dict]) -> str:
    slug = assignment["slug"]
    closest = closest_existing(slug, existing)
    redirect_overlaps = load_redirect_overlaps(slug)
    authority = AUTHORITY_LINKS.get(assignment["bucket"], [])

    gsc_block = "*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*"

    closest_block = ""
    if closest:
        for c in closest:
            closest_block += f"- `{c['slug']}` ({c['category']}) — score {c['score']}\n  - title: {c['title'][:120]}\n"
    else:
        closest_block = "*No close matches found on our site. This topic is genuinely new for us.*\n"

    redirect_block = ""
    if redirect_overlaps:
        redirect_block += "**Redirect overlap detected.** When you launch this page, also update `Property/web/src/middleware.ts`:\n\n"
        for r in redirect_overlaps:
            redirect_block += f"- Old slug `{r['old_slug']}` currently redirects to `{r['redirect_target']}` (source: {r['source']}, score {r['score']}).\n"
            redirect_block += f"  - **Decision needed:** if your new page is a more specific fit, repoint the redirect at your new page. Log decision in work-log.\n"
    else:
        redirect_block = "*No redirect overlap. No middleware changes needed at launch.*\n"

    authority_block = ""
    for name, url in authority:
        authority_block += f"- [{name}]({url})\n"

    competitor_block = ""
    for u in assignment.get("source_urls", []):
        competitor_block += f"- {u}\n"

    return f"""# Wave 2 brief: {slug}

**Site:** property
**Bucket:** {assignment['bucket']}
**Session:** {assignment['session']}
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/{slug}.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/{assignment['category']}/{slug}

---

## Manager pre-decisions

- **Suggested slug:** `{slug}`
- **Suggested category:** `{assignment['category']}`
- **Bucket:** {assignment['bucket']}
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> {assignment['framing']}

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

{competitor_block}
> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={{"User-Agent": "Mozilla/5.0"}})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

{gsc_block}

---

## Closest existing pages on our site (cannibalisation context)

{closest_block}
**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response — UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

{redirect_block}

---

## Authority links worth considering for this bucket

{authority_block}
You don't have to use all of these; pick the ones that fit your specific framing. Add others you find during research.

---

{UNIVERSAL_RULES}

---

{WORKFLOW}

---

{WORK_LOG_TEMPLATE}
"""


def main() -> int:
    BRIEFS_DIR.mkdir(parents=True, exist_ok=True)
    existing = load_existing_pages()
    print(f"Loaded {len(existing)} existing Property pages")
    print(f"Building {len(ASSIGNMENTS)} Wave 2 briefs...")

    for a in ASSIGNMENTS:
        brief = build_brief(a, existing)
        out = BRIEFS_DIR / f"{a['slug']}.md"
        out.write_text(brief, encoding="utf-8")
        print(f"  {a['session']} | {a['bucket'][:40]:40} | {a['slug']}")
    print(f"\nWrote {len(ASSIGNMENTS)} briefs to {BRIEFS_DIR}")

    by_session = defaultdict(int)
    by_bucket = defaultdict(int)
    for a in ASSIGNMENTS:
        by_session[a['session']] += 1
        by_bucket[a['bucket']] += 1
    print("\nBy session:")
    for s, n in sorted(by_session.items()):
        print(f"  {s}: {n}")
    print("\nBy bucket:")
    for b, n in sorted(by_bucket.items(), key=lambda kv: -kv[1]):
        print(f"  {n:2d} {b}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
