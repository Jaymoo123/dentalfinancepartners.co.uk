"""Track 1 brief builder — Property net-new pages.

Generates a research-package brief per proposed new page. The brief is
deliberately INPUT-only (data + references + rules), NOT output (no
prescribed outline / FAQ count / word count). Opus reasons over the inputs
and decides the page shape per topic — anti-templating measure.

Each brief contains:
  - Page assignment: pre-decided slug, category, bucket, framing
    differentiator (manager-set so two sessions can't accidentally
    duplicate a topic with a different slug)
  - Competitor URLs (already in the topic gap analysis output)
  - GSC primary query (from gsc_query_data if present)
  - Cannibalisation context (closest existing pages on related topics)
  - Redirect overlap (if any) with the exact middleware.ts edit on launch
  - Authority links worth considering for this bucket (HMRC manuals,
    legislation.gov.uk, gov.uk hubs relevant to the topic)
  - Internal links worth considering (pre-computed from token similarity
    against our 285 existing pages)
  - CTA placement guidance (WHERE in body, not styling — styling is global)
  - Universal rules + house positions reference + workflow + per-page
    work-log section (filled by the session as they work — resumability)
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
BRIEFS_DIR = ROOT / "briefs/property/track1"


# ===========================================================================
# Per-page assignments — manager pre-decisions for first wave (~32 pages)
# ===========================================================================
# Each tuple is:
#   (slug, category, bucket, session, framing_differentiator, source_urls)
#
# Bucket: high-level theme — used for cross-session cannibalisation discipline.
# Session: A/B/C — controls load + ensures pillar pages route to right session.
# Framing differentiator: ONE LINE on what makes this page distinct from
#   siblings in the same bucket. Anti-templating measure — keeps the Opus
#   reasoning focused on the differentiator, not on filling a template.
# Source URLs: 1-3 competitor URLs that prompted this gap (for verification).
# ===========================================================================

ASSIGNMENTS: list[dict] = [
    # ---- Session A: SDLT depth (10 pages) ----
    {
        "slug": "sdlt-5-percent-surcharge-refund-claim-process",
        "category": "landlord-tax-essentials",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "Step-by-step process for reclaiming the 5% additional dwellings surcharge when the old main residence sells within the 3-year window. Practical claim mechanics + common failure modes + worked timeline; complementary to our SDLT-bands pillar which covers rates.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-5-sdlt-surcharge-refund-claims/",
            "https://www.ukpropertyaccountants.co.uk/reclaim-sdlt-surcharge-if-old-home-selling-is-delayed/",
        ],
    },
    {
        "slug": "sdlt-six-dwellings-non-residential-election",
        "category": "incorporation-and-company-structures",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "Mechanics of the Schedule 6B paragraph 7 FA 2003 election that survives the MDR abolition. Where six or more dwellings are acquired in a single transaction, the buyer can elect non-residential SDLT rates and no surcharge. Worked example for a portfolio incorporation; cannot be split across two transactions.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/purchase-of-six-or-more-dwellings-at-non-residential-rates/",
        ],
    },
    {
        "slug": "sdlt-sub-sale-relief-mechanics",
        "category": "incorporation-and-company-structures",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "Narrow application of section 45 FA 2003 — pre-completion contract transfer to a connected entity. Useful only for genuine pre-completion onward sales; common misunderstanding is that it can be used to retrofit a portfolio into a company SDLT-free (it cannot). Frame as a clarification piece.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/sdlt-navigating-sub-sale-relief-and-other-transfer-of-rights/",
        ],
    },
    {
        "slug": "sdlt-shared-ownership-staircasing",
        "category": "landlord-tax-essentials",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "How SDLT works on shared-ownership purchases AND each subsequent staircasing increment. Specific HMRC rules: market-value election vs sequential payment, the 80% trigger point, interaction with additional dwellings surcharge. Worked example through a 25/50/80% acquisition.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/sdlt-on-shared-ownership/",
        ],
    },
    {
        "slug": "sdlt-group-relief-for-corporate-landlord-portfolios",
        "category": "incorporation-and-company-structures",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "Schedule 7 FA 2003 group relief mechanics for transfers between 75%-owned group companies. When intra-group property transfers can be SDLT-free, the 3-year claw-back rule, and the anti-avoidance carve-outs. Practical for landlords restructuring multi-company holdings.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/sdlt-group-relief-claims/",
        ],
    },
    {
        "slug": "sdlt-on-probate-property-transfers",
        "category": "capital-gains-tax",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "When SDLT does and doesn't apply on inheritance-related property transfers. Assents from personal representatives to beneficiaries (no SDLT), variations of will (Sch 4 para 8 FA 2003), transfers to discharge legacies (chargeable). Interaction with the additional dwellings surcharge where a beneficiary already owns property.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-stamp-duty-relief-for-probate-properties/",
        ],
    },
    {
        "slug": "sdlt-non-resident-2-percent-surcharge",
        "category": "non-resident-landlord-tax",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "The 2% non-resident purchaser surcharge mechanics: who counts as non-resident under the SDLT residence test (different from income tax residence), how it stacks with the 5% additional dwellings surcharge, and the refund route if you become UK-resident within a year. Crown employees and certain treaty residents excluded.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/how-owning-property-abroad-leads-higher-stamp-duty-rates/",
        ],
    },
    {
        "slug": "sdlt-refund-scams-how-to-avoid",
        "category": "landlord-tax-essentials",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "Consumer-protection piece. Cold-call SDLT refund firms claim to find money HMRC owes you — most claims are speculative or wrong, and the landlord ends up with HMRC enquiry + the firm's cut. Real refund routes vs scam patterns. SRA guidance reference.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/sdlt-refund-scams-be-very-careful-who-you-trust/",
        ],
    },
    {
        "slug": "sdlt-mixed-use-property-classification",
        "category": "landlord-tax-essentials",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "When a property qualifies as mixed-use (non-residential SDLT rates, no surcharge) vs purely residential. Walk through the leading FTT cases: Horton Hall (paddock + house), the Goodfellow / trout-stream cases, granny-annexes, fields used for grazing under licence. The 'grounds' question and HMRC's published view at SDLTM00390.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/horton-hall-sdlt-case-residential-vs-non-residential-dispute/",
            "https://www.ukpropertyaccountants.co.uk/sdlt-and-the-grounds-question-when-does-a-trout-stream-divide-residential-from-non-residential-land/",
        ],
    },
    {
        "slug": "sdlt-leasehold-extension-vs-fresh-purchase",
        "category": "landlord-tax-essentials",
        "bucket": "SDLT — surcharges and reliefs",
        "session": "A",
        "framing": "SDLT on lease extensions: chargeable consideration calculation when the premium plus net present value of rent crosses bands. When statutory lease extensions (Leasehold Reform Acts) interact with SDLT. Why a buy-to-let landlord extending a flat lease may face an unexpected SDLT bill.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt/",
        ],
    },
    # ---- Session B: Limited company / BTL operation depth (8 pages) ----
    {
        "slug": "director-loan-account-property-company-mechanics",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "How a director's loan account (DLA) works in a property company: bringing in deposit funds, drawing down equity, the s.455 corporation tax charge (33.75% from April 2022) if overdrawn at year-end, and the benefit-in-kind interest rate on cheap director loans. Worked example: incorporating with a £200k DLA balance and extracting £30k/year.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/directors-loan-accountsdla-uk-guide/",
        ],
    },
    {
        "slug": "property-company-group-relief-corporation-tax",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "Where a landlord runs multiple property limited companies (SPV per property is common), how corporation tax group relief lets a loss-making company surrender losses to a profitable sister company. The 75% direct-or-indirect ownership test, the consortium rules, and the practical setup for a typical 3-5 SPV portfolio.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/eligible-groups-for-group-relief-under-uk-corporation-tax/",
        ],
    },
    {
        "slug": "substantial-shareholding-exemption-property-companies",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "When SSE (s.192A TCGA 1992) applies on a company's disposal of shares in a property-trading subsidiary. The 12-month minimum holding, 10% minimum stake, and the trading-company test. Why most property INVESTMENT companies don't qualify (Pawson reasoning) but property TRADING / development subsidiaries can.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/substantial-shareholding-exemption-sse/",
        ],
    },
    {
        "slug": "corporation-tax-marginal-relief-property-companies",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "Mechanics of corporation tax marginal relief for property companies in the £50k–£250k augmented profits band. The associated-companies rule and how an SPV-per-property structure can push you into the 25% main rate prematurely. Worked example showing the effective marginal rate at £100k profits.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/corporation-tax-marginal-relief-uk-guide/",
        ],
    },
    {
        "slug": "transferring-fhl-portfolio-to-limited-company",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "Post-FHL-abolition (April 2025) decision: should former FHL owners incorporate? Loss of BADR on disposal, gain of S24 protection, ATED implications for high-value FHL stock, anti-forestalling rules during the transition. Worked example for a 3-property FHL portfolio.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/transferring-fhl-to-a-limited-company-benefits-and-drawbacks/",
        ],
    },
    {
        "slug": "incorporating-hmo-portfolio-to-limited-company",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "HMO-specific incorporation factors: capital allowances on fixtures (cannot be claimed by individuals on residential lets but CAN by companies in some scenarios — see CAA 2001), mortgage market for ltd-co HMO (fewer lenders), licensing obligations transfer, and the practical sequence for moving a 5-bed HMO portfolio into a company.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/incorporating-an-hmo-into-a-limited-company-pros-and-cons/",
        ],
    },
    {
        "slug": "extracting-money-from-property-limited-company",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "Comparison of extraction routes from a property company: salary + employer pension contribution (efficient up to NI thresholds), dividends (after 2024/25 dividend allowance £500), director loan repayment (no further tax once balance settled), share buyback (rarely advantageous), liquidation under s.110 reorganisation (specialist). Worked example: extracting £40k/year from a £150k profits property company.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/transferring-money-out-of-a-limited-company/",
        ],
    },
    {
        "slug": "close-investment-holding-company-property",
        "category": "incorporation-and-company-structures",
        "bucket": "Limited company / BTL operation",
        "session": "B",
        "framing": "What a Close Investment-Holding Company (CIHC) is, and why most pure-investment BTL companies do NOT fall into the special category that previously applied higher CT rates. The 'close company' status mechanics, the consequences for s.455 loan to participators charge, and IHT implications for shareholders.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-guide-for-shareholders-in-the-uk/",
        ],
    },
    # ---- Session C: VAT + FIC + ATED depth (14 pages) ----
    {
        "slug": "domestic-reverse-charge-construction-vat-landlords",
        "category": "landlord-tax-essentials",
        "bucket": "VAT for landlords",
        "session": "C",
        "framing": "How the construction industry domestic reverse charge (CIS-related, in force since March 2021) affects property developers and refurbishing landlords. When the landlord is the 'end user' (no DRC applies) vs when they're in a CIS chain (DRC applies, contractor doesn't charge VAT). Common cash-flow trap for property developers.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/domestic-reverse-charge/",
        ],
    },
    {
        "slug": "toms-vat-serviced-accommodation",
        "category": "property-types-and-specialist-tax",
        "bucket": "VAT for landlords",
        "session": "C",
        "framing": "Tour Operators' Margin Scheme (TOMS) and when a serviced-accommodation operator qualifies. The Sonder case (Upper Tribunal reversal of FTT, 2024) and what it means for short-let providers buying-in and on-selling room-nights. Implications for VAT registration threshold and cash flow.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/tour-operators-margin-scheme-toms-and-serviced-accommodation/",
            "https://www.ukpropertyaccountants.co.uk/upper-tribunal-reverses-sonder-europes-toms-vat-wins/",
        ],
    },
    {
        "slug": "vat-on-new-builds-residential-property",
        "category": "property-types-and-specialist-tax",
        "bucket": "VAT for landlords",
        "session": "C",
        "framing": "The zero-rated new-build regime for first grant of a major interest in new residential property (Sch 8 Group 5 VATA 1994). When the 5% conversion rate applies (residential-to-residential conversions, empty-home conversion). When 20% applies (substantial reconstructions). Worked example for a property developer building from greenfield.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/vat-on-new-builds-a-complete-guide/",
        ],
    },
    {
        "slug": "togc-vat-property-letting-business",
        "category": "incorporation-and-company-structures",
        "bucket": "VAT for landlords",
        "session": "C",
        "framing": "Transfer of a business as a going concern (TOGC) under article 5 of the VAT Special Provisions Order 1995: when a property letting business transfer escapes VAT. The buyer must be VAT-registered (or required to be), continue the same kind of business, and (for opted-to-tax commercial property) opt-to-tax themselves before completion. Common pitfalls.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/transfer-of-business-as-a-going-concern-togc/",
        ],
    },
    {
        "slug": "diy-housebuilders-vat-refund-scheme",
        "category": "property-types-and-specialist-tax",
        "bucket": "VAT for landlords",
        "session": "C",
        "framing": "The DIY housebuilders' refund scheme (VAT Notice 719): how a self-builder constructing their own dwelling can recover VAT on materials, when professional fees can be recovered, the 6-month claim window from completion, and the typical claim size. Not available for buy-to-let; aimed at owner-occupiers.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/the-diy-vat-refund-scheme-a-comprehensive-guide/",
        ],
    },
    {
        "slug": "fic-complete-guide-property-wealth-transfer",
        "category": "incorporation-and-company-structures",
        "bucket": "Family Investment Companies",
        "session": "C",
        "framing": "Comprehensive reference on Family Investment Companies for property wealth transfer. Setup mechanics, share class design, governance, control retention, and tax treatment in life and on death. PARTIAL OVERLAP with our existing /family-investment-company-property-worth-it (which is decision-focused 'should I?'); this is the comprehensive reference for someone who's already decided. Link bidirectionally.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-family-investment-companies-fics/",
        ],
    },
    {
        "slug": "fic-vs-discretionary-trust-property-comparison",
        "category": "incorporation-and-company-structures",
        "bucket": "Family Investment Companies",
        "session": "C",
        "framing": "Side-by-side comparison of FIC vs discretionary trust for transferring rental property wealth to the next generation. Control retention, IHT treatment (the trust 10-year and exit charges vs FIC share dilution mechanics), corporation tax inside the FIC vs 45% income tax inside a trust, settlor's rights, and the practical setup costs. Worked example for £1.5m of BTL equity.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-family-investment-companies-fics/",
        ],
    },
    {
        "slug": "fic-growth-shares-and-freezer-shares-design",
        "category": "incorporation-and-company-structures",
        "bucket": "Family Investment Companies",
        "session": "C",
        "framing": "Share class architecture inside a FIC. Growth shares (issued to children at low/nil value to capture future appreciation outside the founder's estate), freezer shares (founder retains, value fixed at current company NAV), alphabet shares for differential dividends. HMRC's anti-avoidance view, the Employee-Related Securities risk, and current valuation methodology.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-family-investment-companies-fics/",
        ],
    },
    {
        "slug": "fic-iht-treatment-bpr-myth",
        "category": "landlord-tax-essentials",
        "bucket": "Family Investment Companies",
        "session": "C",
        "framing": "Common misconception: setting up a FIC does NOT automatically secure Business Property Relief. Pawson reasoning applies — investment activity (collecting rent) is not 'wholly or mainly trading'. The FIC's IHT benefit comes from share-value dilution through growth-share issuance to younger generations, NOT from BPR. Worked example.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-family-investment-companies-fics/",
        ],
    },
    {
        "slug": "ated-complete-guide-2026-27",
        "category": "incorporation-and-company-structures",
        "bucket": "ATED",
        "session": "C",
        "framing": "Comprehensive ATED reference for 2026/27. Who's caught (non-natural persons with single dwellings over £500k), the 2026/27 bands with annual charges, all available reliefs (rental, dev, public-access, etc), the 30 April annual return deadline, and the late-filing penalty cascade. Pillar page for everything ATED.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-annual-tax-on-enveloped-dwellings/",
            "https://www.ukpropertyaccountants.co.uk/annual-tax-on-enveloped-dwellings-pro-and-cons/",
        ],
    },
    {
        "slug": "ated-rental-property-relief-mechanics",
        "category": "incorporation-and-company-structures",
        "bucket": "ATED",
        "session": "C",
        "framing": "Specific deep-dive on the rental property relief (let on commercial terms to an unconnected tenant). The 'connected person' test (s.1122 CTA 2010), the 'commercial terms' test, periods of vacancy that still qualify, and how the claim is made on the ATED return. Worked example: a £1.5m London BTL company.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-annual-tax-on-enveloped-dwellings/",
        ],
    },
    {
        "slug": "ated-15-percent-flat-rate-sdlt-interaction",
        "category": "incorporation-and-company-structures",
        "bucket": "ATED",
        "session": "C",
        "framing": "Sch 4A FA 2003 imposes a flat 15% SDLT rate on residential property worth over £500,000 purchased by a non-natural person. How this interacts with the ATED-relief framework (rental business relief, dev relief). Why missing the relief claim on the SDLT return triggers the full 15%, and the practical sequence: SDLT relief claim first, ATED relief claim annually thereafter.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-annual-tax-on-enveloped-dwellings/",
        ],
    },
    {
        "slug": "ated-late-filing-penalties-mechanics",
        "category": "landlord-tax-essentials",
        "bucket": "ATED",
        "session": "C",
        "framing": "Penalty cascade for missing ATED returns: £100 / £200 / £300 fixed penalties + £10/day from 91 days late + tax-geared penalties (5% / 10% / 100%). The £15,700-case widely cited (cumulative penalty on a £1m flat where the relief-claim return was missed for a year). Why even relief-only returns are mandatory.",
        "source_urls": [
            "https://www.ukpropertyaccountants.co.uk/15700-in-penalties-for-a-missed-ated-filing-could-your-company-be-next/",
        ],
    },
]


# ===========================================================================
# Authority links by bucket
# ===========================================================================

AUTHORITY_LINKS = {
    "SDLT — surcharges and reliefs": [
        ("HMRC SDLT Manual (SDLTM)", "https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual"),
        ("FA 2003 (legislation.gov.uk)", "https://www.legislation.gov.uk/ukpga/2003/14/contents"),
        ("HMRC SDLT calculator", "https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/"),
        ("HMRC SDLTM00390 — grounds and gardens", "https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm00390"),
        ("FA (No.2) 2024 (MDR abolition)", "https://www.legislation.gov.uk/ukpga/2024/12/contents"),
    ],
    "Limited company / BTL operation": [
        ("HMRC CTM (Company Taxation Manual)", "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual"),
        ("HMRC GIM (Group Relief)", "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm80100"),
        ("HMRC BIM (Business Income Manual)", "https://www.gov.uk/hmrc-internal-manuals/business-income-manual"),
        ("CTA 2010 (legislation.gov.uk)", "https://www.legislation.gov.uk/ukpga/2010/4/contents"),
        ("Pawson v HMRC [2013] UKUT 050", "https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc"),
    ],
    "VAT for landlords": [
        ("HMRC VAT Notice 708 (Buildings and Construction)", "https://www.gov.uk/guidance/buildings-and-construction-vat-notice-708"),
        ("HMRC VAT Notice 700/9 (TOGCs)", "https://www.gov.uk/guidance/transfer-a-business-as-a-going-concern-and-vat-notice-7009"),
        ("HMRC VAT Notice 709/5 (TOMS)", "https://www.gov.uk/guidance/tour-operators-margin-scheme-vat-notice-7095"),
        ("VATA 1994 Schedule 8 (Zero-rate)", "https://www.legislation.gov.uk/ukpga/1994/23/schedule/8"),
        ("HMRC VAT Notice 719 (DIY housebuilders)", "https://www.gov.uk/guidance/vat-refunds-for-diy-housebuilders-claim-form-and-notes-for-new-houses-vat431nb"),
    ],
    "Family Investment Companies": [
        ("HMRC FIC Unit (gov.uk)", "https://www.gov.uk/government/publications/family-investment-companies"),
        ("HMRC SAIM (Savings and Investment Manual)", "https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual"),
        ("HMRC IHTM (Inheritance Tax Manual)", "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual"),
        ("Pawson v HMRC [2013] (BPR test)", "https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc"),
        ("HMRC ERSM (Employment-Related Securities Manual)", "https://www.gov.uk/hmrc-internal-manuals/employment-related-securities"),
    ],
    "ATED": [
        ("HMRC ATED Technical Guidance", "https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings-technical-guidance"),
        ("HMRC ATED Return (gov.uk)", "https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-returns"),
        ("FA 2013 Part 3 (ATED)", "https://www.legislation.gov.uk/ukpga/2013/29/part/3"),
        ("HMRC ATED rates and bands 2025-26", "https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings-ated-returns-notice"),
        ("FA 2003 Sch 4A (15% flat-rate SDLT)", "https://www.legislation.gov.uk/ukpga/2003/14/schedule/4A"),
    ],
}


# ===========================================================================
# Brief assembly
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
- **Read `docs/property/house_positions.md` once at the start.** It is the tie-breaker. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/track1_site_wide_flags.md`.

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
- Each Track 1 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator** — don't write a generic "complete guide" template.
- Vary your H2 structure per page. SDLT mechanics pages and SDLT case-law pages should NOT have the same outline.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.
"""


WORKFLOW = """\
## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases).
2. **Claim the page** in `docs/property/track1_page_tracker.md` — change Status `⬜ todo` to `🟡 in_progress`, add today's UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide what's worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (paths in the "Closest existing pages" section). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it — don't pattern-match siblings), meta title (lead with the primary query word order, **≤62 chars**), meta description (**≤158 chars**), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required):
   ```python
   import sys; sys.path.insert(0, '.')
   from optimisation_engine.blog_generator.post_processing import fetch_image_for_post
   # Use a 2-4 word visual query, NOT the whole meta title
   image = fetch_image_for_post("uk property tax")
   # Returns: {'url': 'https://images.pexels.com/...', 'photographer': 'Jane Doe',
   #           'photographer_url': '...', 'pexels_url': '...', 'alt': '...'} or None
   ```
   Pick a query that's visually evocative and topical (eg "uk house keys", "stamp duty paperwork", "london terraced houses"). If Pexels returns None, leave `image: ''` (template falls back to auto-generated OG image at `/api/og?title=...&category=...`).
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields:
   - `title`, `slug`, `canonical: https://www.propertytaxpartners.co.uk/blog/<category>/<slug>`
   - `date: <today>`, `author: 'Property Tax Partners Editorial Team'`
   - `category: <category>` (use the assigned one)
   - `metaTitle` (≤62 chars), `metaDescription` (≤158 chars)
   - `altText` (descriptive — re-use the Pexels `alt` field if it fits, otherwise write your own)
   - `image: '<pexels url>'` (full Pexels URL from `fetch_image_for_post`, OR `''` if Pexels returned None)
   - When `image` is a Pexels URL, also add (REQUIRED for attribution):
     ```yaml
     imageCredit:
       photographer: <Pexels photographer name>
       photographer_url: <Pexels photographer profile URL>
       source: Pexels
       source_url: <pexels_url returned by API>
     ```
   - `h1`, `summary` (1-2 sentences)
   - `schema: ''` (template handles JSON-LD), `faqs: [...]` (10-14 entries)
   - `dateModified: <today>`, `reviewedBy: ICAEW Qualified Senior Reviewer`
   - `reviewerCredentials: Chartered Accountant (ACA, ICAEW), Property Tax Specialist`
   - `reviewedAt: <today>`, `editorialNote: <1-line>`
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):**
    - FAQ schema count: `grep -c '"@type":"Question"' Property/web/.next/server/app/blog/<category>/<slug>.html` equals your `faqs:` array length
    - Em-dashes: `grep -c "—" Property/web/content/blog/<slug>.md` is 0
    - Tailwind classes: `grep -cE 'class="[a-z]' Property/web/content/blog/<slug>.md` is 0
    - Meta title length: ≤62 chars
    - Meta description length: ≤158 chars
    - Internal links resolve: every `/blog/category/slug` link you added points at an existing markdown file under `Property/web/content/blog/`
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page (changes are in the brief; apply them precisely). Log your decision in the work-log.
13. **Register the new page for GSC monitoring**: insert a row into the `monitored_pages` Supabase table so the regression detector picks it up. Run from your worktree:
    ```bash
    python -c "
    import sys; sys.path.insert(0,'.')
    from optimisation_engine.competitor._db import _sql, _esc
    slug = '<your-slug>'
    cat = '<your-category>'
    _sql(f\\"INSERT INTO monitored_pages (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type, notes) VALUES ('property', {_esc(slug)}, '/blog/{cat}/{slug}', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 'rewrite', 'Track 1 net-new page') ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING\\")
    print('registered')
    "
    ```
14. **Commit on your branch.** Per-page commit (do NOT merge to main — orchestrator merges after review):
    ```bash
    git add Property/web/content/blog/<slug>.md briefs/property/track1/<slug>.md docs/property/track1_page_tracker.md
    # if you applied a redirect repointing:
    git add Property/web/src/middleware.ts
    git commit -m "Track 1 (<bucket>): write <slug>"
    ```
15. **Fill in the per-page work-log** at the bottom of this brief (URLs fetched, decisions made, citations added, internal links, build status, flags raised).
16. **Mark done** in `docs/property/track1_page_tracker.md` (`🟡 in_progress` to `✅ done`) with a 1-line Notes summary.
17. **Append any site-wide flags** to `docs/property/track1_site_wide_flags.md` (append-only — never pause).
18. **Log discoveries** to `docs/property/track1_discovery_log_session_<X>.md` (append-only) — adjacent topics, calculator ideas, components competitors use, authority gaps, existing pages that need updating, cross-niche linking opportunities. This is how future waves get smarter.
19. **Next page** — claim ONE more page from the top of your remaining list. Repeat.

## At the end of your shift / session

- Verify all your assigned pages either show ✅ done OR have a clear in_progress claim with work-log decisions logged.
- Push your branch to a remote IF the orchestrator has set one up (default: don't push; orchestrator handles).
- Leave a clean commit history on your branch.
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
- Attempt 2 (if needed) — <pass / fail>

### Verification
- FAQ schema count in built HTML matches frontmatter: <yes / no>
- Em-dashes in markdown: <0 / fixed>
- Tailwind classes in markdown: <0 / fixed>

### Flags raised to track1_site_wide_flags.md
- <none / one-line summary of each flag>

### 2-3 sentence summary
<freeform>
"""


def build_brief(assignment: dict, existing: list[dict]) -> str:
    slug = assignment["slug"]
    closest = closest_existing(slug, existing)
    redirect_overlaps = load_redirect_overlaps(slug)
    authority = AUTHORITY_LINKS.get(assignment["bucket"], [])

    # Try to find GSC primary query for this slug — but the slug is net-new so
    # it likely won't have GSC. Document this honestly.
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
            redirect_block += f"  - **Decision needed:** if your new page is a more specific fit than the current redirect target, repoint the redirect at your new page (`/blog/{assignment['category']}/{slug}`). If the existing target is broader/better, leave it.\n"
            redirect_block += f"  - Log your decision in the work-log below.\n"
    else:
        redirect_block = "*No redirect overlap. No middleware changes needed at launch.*\n"

    authority_block = ""
    for name, url in authority:
        authority_block += f"- [{name}]({url})\n"

    competitor_block = ""
    for u in assignment.get("source_urls", []):
        competitor_block += f"- {u}\n"

    return f"""# Track 1 brief: {slug}

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
> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={{"User-Agent": "Mozilla/5.0"}})` then `BeautifulSoup(html, "lxml")`. Read what they actually have — outline, FAQs, worked examples, citation density, component patterns. The competitor list is a starting set, not exhaustive — if a competitor URL is poor quality or off-topic, do your own targeted search and document what you used in the work log.

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
    print(f"Building {len(ASSIGNMENTS)} Track 1 briefs...")

    for a in ASSIGNMENTS:
        brief = build_brief(a, existing)
        out = BRIEFS_DIR / f"{a['slug']}.md"
        out.write_text(brief, encoding="utf-8")
        print(f"  {a['session']} | {a['bucket'][:40]:40} | {a['slug']}")
    print(f"\nWrote {len(ASSIGNMENTS)} briefs to {BRIEFS_DIR}")

    # Summary by session
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
