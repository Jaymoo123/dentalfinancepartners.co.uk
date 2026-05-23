"""One-shot generator for Wave 4 brief skeletons.
Stage 1 deliverable: 30 brief files at briefs/property/wave4/<slug>.md
Each brief is Stage-1-only (4.1 header, 4.2 manager pre-decisions with DRAFT
framing differentiator, 4.5 closest existing pages computed by Jaccard, 4.6
redirect overlap stub, 4.8 universal rules, 4.9 workflow, 4.10 empty work-log).
4.3 Competitor URLs and 4.7 Authority links are STUBBED for Stage 2.
"""
from __future__ import annotations

import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "Property/web/content/blog"
OUT_DIR = ROOT / "briefs/property/wave4"

STOP = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025", "2024", "2027", "with", "on", "from",
    "do", "does", "as", "be", "or", "if", "at", "this", "that", "it",
    "into", "out", "can", "i", "my", "we", "our", "us", "all", "any",
}


def tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return set(t for t in s.split() if t and t not in STOP and len(t) >= 2)


def load_inventory() -> list[dict]:
    pages = []
    for md in sorted(BLOG_DIR.glob("*.md")):
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
        slug = md.stem
        tokens = tokenise(slug + " " + str(fm.get("title", "")) + " "
                          + str(fm.get("h1", "")))
        pages.append({
            "slug": slug,
            "title": fm.get("title", ""),
            "category": fm.get("category", ""),
            "tokens": tokens,
        })
    return pages


def closest(slug: str, pages: list[dict], n: int = 5) -> list[tuple[float, dict]]:
    ct = tokenise(slug)
    out = []
    for p in pages:
        if not p["tokens"]:
            continue
        inter = ct & p["tokens"]
        union = ct | p["tokens"]
        if union:
            j = len(inter) / len(union)
            if j > 0:
                out.append((j, p))
    out.sort(key=lambda x: -x[0])
    return out[:n]


# ============================================================================
# Wave 4 selections
# ============================================================================

PICKS: list[dict] = [
    # ---------------- BUCKET A: LtdCo mechanics + FIC ----------------
    {
        "id": "A1",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth",
        "slug": "btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction",
        "category": "incorporation-and-company-structures",
        "source_url": "https://uklandlordtax.co.uk/should-i-change-my-btl-limited-company-year-end/",
        "framing": (
            "Director's-loan-account post-incorporation: how a credit balance "
            "built from the s.162 incorporation transfer is repaid tax-free, "
            "the order-of-extraction question (DLA first, dividends, salary, "
            "pension), interest on DLA credit balances at HMRC's official "
            "rate, and the loan-replenishment trap where rent receipts are "
            "drawn early and exhaust the DLA before tax-efficient timing."
        ),
        "notes": "Distinct from existing director-loan-account mechanics page by leading on the strategic extraction sequence rather than the bookkeeping mechanic.",
    },
    {
        "id": "A2",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth",
        "slug": "alphabet-shares-property-spv-dividend-splitting-spouse-children",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.tlpi.co.uk/case-studies/fic-for-income-returns-and-protected-legacy",
        "framing": (
            "Alphabet share-class structures in a property SPV: A / B / C "
            "shares carrying differential dividend rights to spouse and adult "
            "children. The settlements legislation (ITTOIA 2005 s.624) and "
            "the Arctic Systems carve-out, why share-class dividend splitting "
            "between spouses works for outright gifts of ordinary shares "
            "but generates settlement-anti-avoidance risk for child gifts."
        ),
        "notes": "Pure Ltd-Co mechanics page (not FIC); covers the standard property-company alphabet-share design and the s.624 boundary.",
    },
    {
        "id": "A3",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth",
        "slug": "btl-limited-company-year-end-date-changing-tax-planning",
        "category": "incorporation-and-company-structures",
        "source_url": "https://uklandlordtax.co.uk/should-i-change-my-btl-limited-company-year-end/",
        "framing": (
            "Choosing and changing a property SPV year-end: the 31-March-vs-"
            "5-April default, the rules under CA 2006 s.392 on lengthening "
            "(once every five years, 18-month maximum) vs shortening "
            "(unlimited), and the tax-planning use cases (deferring "
            "corporation tax into the post-April-2026 cap reform, aligning "
            "with personal SA tax year for MTD-ITSA cohort landlords with "
            "both personal and corporate property income)."
        ),
        "notes": "Pure Ltd-Co operational mechanics; no FIC angle. Year-end date is a strategic lever that most BTL incorporation pages don't cover.",
    },
    {
        "id": "A4",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth",
        "slug": "charging-market-rent-to-own-property-company-tax-treatment",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.boltburdon.co.uk/blogs/sweet-deal-corporate-wrappers-property-investors-structuring-investments-spv",
        "framing": (
            "The shareholder-director letting personal property to their own "
            "property company at market rent: ITTOIA 2005 s.272 rental "
            "income for the individual, CTA 2009 s.54 deductibility for the "
            "company, the transfer-pricing risk under TIOPA 2010 Pt 4 below "
            "the SME exemption thresholds, and HMRC's connected-party scrutiny "
            "(market-rent evidence pack, lease formality, payment trail)."
        ),
        "notes": "Operational mechanic specific to property SPVs; common question without dedicated coverage on our site.",
    },
    {
        "id": "A5",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth",
        "slug": "salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis",
        "category": "incorporation-and-company-structures",
        "source_url": "https://gorillaaccounting.com/blog/how-to-pay-yourself-tax-efficiently-as-a-company-director-in-the-uk/",
        "framing": (
            "Optimal salary-dividend mix inside a property SPV for 2026/27: "
            "NI-secondary-threshold £5,000 salary floor (or £12,570 PA floor "
            "where employment allowance available), the 25% main CT rate vs "
            "19% small profits rate boundary at £50k profits, dividend rates "
            "8.75% / 33.75% / 39.35% against PA cliff-edges, the £500 "
            "dividend allowance erosion, marginal-rate worked examples at "
            "£30k / £50k / £100k / £125k profit bands."
        ),
        "notes": "Numbers-heavy comparison sibling. Existing property-company-profit-extraction page is older (pre-April-2024 rates); this page rewrites for 2026/27 with the post-Hunt CT structure.",
    },
    {
        "id": "A6",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth (FIC sub-thread)",
        "slug": "fic-articles-of-association-property-control-mechanics",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.tlpi.co.uk/case-studies/protecting-a-late-husbands-property-legacy-with-a-fic",
        "framing": (
            "Articles of Association in a property FIC: bespoke voting / "
            "non-voting class design, retained-control clauses (founder "
            "casting vote, reserved-matters lists, lifetime-controllable "
            "consent regimes), pre-emption rights on share transfer, "
            "drag-along + tag-along for downstream sales, the model-articles "
            "starting point under CA 2006 s.18 and where bespoke drafting is "
            "essential for the FIC's tax + family-governance goals."
        ),
        "notes": "FIC sub-thread, structural / control angle. Distinct from existing FIC-comparison and FIC-pillar pages by focussing on the articles drafting layer.",
    },
    {
        "id": "A7",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth (FIC sub-thread)",
        "slug": "fic-property-corporate-governance-board-meetings-resolutions-discipline",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.tlpi.co.uk/case-studies/hands-off-retirement-income-and-family-legacy-fic",
        "framing": (
            "Running a property FIC well: the board-meeting / written-"
            "resolution discipline that distinguishes a credible family "
            "investment company from a paper structure HMRC can re-characterise. "
            "Mandatory and tax-relevant meetings (dividend declarations, "
            "loan write-offs, share issues, property-acquisition approvals), "
            "minute-book hygiene, the substance-over-form risk where founder "
            "drift erodes the legal/tax separation between FIC and family."
        ),
        "notes": "FIC sub-thread, governance/discipline angle. Net-new framing on our site.",
    },
    {
        "id": "A8",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth (FIC sub-thread)",
        "slug": "fic-property-retirement-decumulation-mechanics-uk",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.tlpi.co.uk/case-studies/hands-off-retirement-income-and-family-legacy-fic",
        "framing": (
            "Using a property FIC for retirement income post-65: how "
            "preference-share dividend coupons, redeemable share "
            "amortisation, and DLA repayment combine to give the founder a "
            "predictable retirement income stream while the underlying "
            "property portfolio's value growth accrues to next-generation "
            "growth shares. Marginal-rate-positioning of the income strands, "
            "interaction with state pension + private pension drawdown."
        ),
        "notes": "FIC sub-thread, retirement angle. Cross-bucket coordination flag: differentiate clearly from C7 (FIC as estate-planning tool).",
    },
    {
        "id": "A9",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth (FIC sub-thread)",
        "slug": "fic-gifting-shares-children-property-7-year-iht-mechanics",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.ukpropertyaccountants.co.uk/how-to-involve-your-family-in-your-property-investment-journey-using-an-fic/",
        "framing": (
            "Gifting growth shares in a property FIC to adult children "
            "(outright or via 18-25 / bare trust): the 7-year PET clock, "
            "associated-operations risk where the FIC is set up shortly "
            "before the gift, share-valuation discount for non-controlling "
            "interests, CGT base cost (TCGA 1992 s.165 holdover relief "
            "denial for investment-FICs vs trading FICs), and the practical "
            "drafting (vesting age, dividend rights pre-gift)."
        ),
        "notes": "FIC sub-thread, gifting mechanics. Distinct from C3 (GROB-letting) and C4 (7-year-clock direct property gift) by being FIC-share-specific.",
    },
    {
        "id": "A10",
        "session": "A",
        "bucket": "LtdCo mechanics + FIC depth (FIC sub-thread)",
        "slug": "fic-blended-family-protected-legacy-property-second-marriage",
        "category": "incorporation-and-company-structures",
        "source_url": "https://www.tlpi.co.uk/case-studies/protecting-a-late-husbands-property-legacy-with-a-fic",
        "framing": (
            "Property FIC as a vehicle for protecting first-marriage children's "
            "inheritance through a second marriage: ring-fenced share classes "
            "settling on first-marriage children, life-interest equivalent "
            "via dividend coupons to surviving spouse, prevention of forced "
            "marital-property re-allocation on second-spouse death. Compares "
            "with the will + trust route (immediate-post-death-interest "
            "trusts, IPDI) and identifies where FIC out-performs (control "
            "during life, fewer trust-tax friction events)."
        ),
        "notes": "FIC sub-thread, blended-family use case. Net-new on our site; closest existing is the FIC-pillar.",
    },

    # ---------------- BUCKET B: MTD ITSA operational ----------------
    {
        "id": "B1",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse",
        "category": "making-tax-digital-mtd",
        "source_url": "https://rentalbux.com/guides/mtd-for-joint-owners-how-separate-filings-work",
        "framing": (
            "How the quarterly cycle actually works for jointly owned "
            "property: each owner files their own quarterly update on their "
            "share of gross income + expenses, no nominated-filer rule, the "
            "mid-year ownership-split-change reporting mechanic, and how to "
            "handle a property where one spouse is in MTD ITSA and the other "
            "is still on Self Assessment. Distinct from Wave 3 B3 (threshold-"
            "split mechanic): B1 was about who's in, this is about how the "
            "quarterly filings operate once they are in."
        ),
        "notes": "Operational deepening of Wave 3 B3 (which covered the threshold-test). This page covers the quarterly-cycle filing mechanics that follow.",
    },
    {
        "id": "B2",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-choosing-software-by-landlord-scenario-decision-tree",
        "category": "making-tax-digital-mtd",
        "source_url": "https://www.ukpropertyaccountants.co.uk/experts-pick-5-mtd-software-for-small-businesses-landlords/",
        "framing": (
            "Software-per-scenario decision tree: single-property landlord "
            "(£10/mo bookkeeping suite vs free-tier vs spreadsheet+bridging), "
            "5-10 property portfolio (full property-specific suite), "
            "HMO/multi-let with split tenancies, jointly owned (separate "
            "logins or shared subscription), foreign-property cohort, mixed "
            "self-employment + property cohort. Anti-recommendation framing "
            "(why we don't name single 'best' products); evaluation criteria "
            "checklist for the reader."
        ),
        "notes": "Decision-tree framing distinguishes from existing 'best MTD software' product-listicle pages. We are a tax firm, not a software reseller; framing matters.",
    },
    {
        "id": "B3",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-agent-services-account-asa-authorisation-walkthrough",
        "category": "making-tax-digital-mtd",
        "source_url": "https://ciot-att.lndo.site/mtd-digital-readiness-agent-services-accounts-tips-agents",
        "framing": (
            "How a landlord authorises an accountant via the Agent Services "
            "Account (ASA) for MTD ITSA filing: the 64-8 vs ASA distinction, "
            "the landlord-side digital-handshake mechanic, joint-owner "
            "authorisation (each spouse must authorise separately), and the "
            "consequences when the agent loses access (mid-year accountant "
            "change, agent firm dissolution). Includes the post-April-2026 "
            "ASA mandatory-use rule for MTD ITSA filings."
        ),
        "notes": "Operational mechanic not covered anywhere on our site; gap from the existing how-to-register page.",
    },
    {
        "id": "B4",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-foreign-property-income-quarterly-reporting-rules",
        "category": "making-tax-digital-mtd",
        "source_url": "https://rentalbux.com/blogs/mtd-compatible-software-that-supports-foreign-income",
        "framing": (
            "Foreign property income inside MTD ITSA: §19.2 confirms foreign "
            "rental income counts as property income for MTD where reported "
            "on the UK return. This page works the operational layer: which "
            "quarterly update box receives foreign-property numbers, the FX-"
            "translation rule per HMRC IM (spot rate on transaction date vs "
            "average rate), foreign-tax-credit interaction at EoPS, software "
            "that supports the SA106 foreign-property fields."
        ),
        "notes": "Cross-cluster bridge: foreign-property income inside MTD. Distinct from the standalone foreign-tax-credit page which covers credit mechanics, not MTD reporting.",
    },
    {
        "id": "B5",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-late-submission-points-late-payment-15-30-31-worked",
        "category": "making-tax-digital-mtd",
        "source_url": "https://www.ukpropertyaccountants.co.uk/mtd-for-income-tax-penalties-waived-for-the-first-year/",
        "framing": (
            "Working examples of the points-based late-submission regime "
            "and the Spring Statement 2025 accelerated 15/30/31-day late-"
            "payment regime. Quarterly-points accumulation (4 points = £200 "
            "penalty, then £200 per missed update at threshold), 24-month "
            "reset rule. Late-payment worked examples at £2k / £10k / £30k "
            "unpaid tax across each trigger band, contrast with legacy non-"
            "MTD 2%/2%/4% on 31/46/91 days."
        ),
        "notes": "House position §19.7 was freshly corrected (F-6) to 15/30/31 + 3%/3%/10%. This page is the worked-example sibling to Wave 3 B6 (HMRC-letter action page) and B8 (overview pillar).",
    },
    {
        "id": "B6",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly",
        "category": "making-tax-digital-mtd",
        "source_url": "https://www.ukpropertyaccountants.co.uk/do-i-need-making-tax-digital-if-i-use-a-letting-agent/",
        "framing": (
            "Who files when the landlord uses a letting agent: the agent "
            "is not the MTD filer, the landlord is. The agent's monthly "
            "statement is the data source. Walks through extracting gross-"
            "vs-net from a typical letting-agent statement, splitting agent "
            "commission and management fees correctly into the expenses "
            "side, and the joint-agent + accountant relationship (agent "
            "produces statement, accountant via ASA does the digital filing)."
        ),
        "notes": "Common-misconception page; the agent isn't the filer. Net-new on our site.",
    },
    {
        "id": "B7",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment",
        "category": "making-tax-digital-mtd",
        "source_url": "https://rentalbux.com/blogs/pension-funds-with-rental-portfolios-are-they-caught-by-making-tax-digital",
        "framing": (
            "SIPP / SSAS property income and MTD ITSA: pension funds are "
            "outside MTD ITSA (§19.3, trustees + pension funds excluded), but "
            "the property income is taxed within the pension wrapper and "
            "reported on the pension return mechanism. Walks through the "
            "common confusion (landlord with personal portfolio + SIPP-held "
            "commercial property: personal in scope, SIPP not), and the "
            "trustee-reporting routes for the SIPP-held element."
        ),
        "notes": "Edge case but high-search-intent for portfolio landlords. Net-new on our site.",
    },
    {
        "id": "B8",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics",
        "category": "making-tax-digital-mtd",
        "source_url": "https://bhp.co.uk/news-events/blog/mtd-what-are-digital-links/",
        "framing": (
            "Spreadsheet plus HMRC-recognised bridging software: §19.6 "
            "confirms this is allowed. This page works the operational layer: "
            "what counts as a 'digital link' from spreadsheet to API "
            "(copy-paste does NOT, cell references / formulae / linked "
            "tables DO), spreadsheet structural requirements (categorised "
            "columns matching the SA105 categories), the bridging-vendor "
            "shortlist on the HMRC list, and the spreadsheet-discipline "
            "checklist (versioning, backup, audit trail)."
        ),
        "notes": "Practical bridge between bookkeeping-as-spreadsheet-power-users and the new MTD reality. Net-new on our site.",
    },
    {
        "id": "B9",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics",
        "category": "making-tax-digital-mtd",
        "source_url": "https://www.ukpropertyaccountants.co.uk/250000-sign-up-for-mtd-but-most-landlords-still-arent-ready/",
        "framing": (
            "Selling the last property mid-year while in MTD ITSA: the "
            "cessation mechanic (final quarterly update, EoPS, final "
            "declaration), the difference between 'stopping letting but "
            "keeping the property' vs disposal, the post-cessation 7-year "
            "expense recovery (s.354 ITTOIA 2005), CGT-completion overlay "
            "(60-day return runs in parallel with the cessation reporting), "
            "and notification to HMRC to come out of MTD obligations."
        ),
        "notes": "Distinct from Wave 3 B4 (3-year sub-threshold exit rule); B9 is the disposal-driven cessation route.",
    },
    {
        "id": "B10",
        "session": "B",
        "bucket": "MTD ITSA operational details",
        "slug": "mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence",
        "category": "making-tax-digital-mtd",
        "source_url": "https://rentalbux.com/blogs/what-gets-sent-to-hmrc-understanding-your-mtd-data",
        "framing": (
            "Digital-record discipline for property landlords under MTD: "
            "what HMRC considers a compliant digital record (receipt photos "
            "via app: yes; spreadsheet category column: yes; cash receipt in "
            "a shoebox: no), bank-feed integrations and the income-side "
            "categorisation question (does a tenant transfer count as gross "
            "rental income for that quarter?), seven-year retention rule, "
            "the audit-trail expectation at enquiry."
        ),
        "notes": "Operational depth beyond existing MTD record-keeping page; net-new framing around evidence/audit trail.",
    },

    # ---------------- BUCKET C: IHT estate planning for landlords ----------------
    {
        "id": "C1",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.djh.co.uk/latest-news/news-insights/iht-planning-review-protecting-your-business-assets-with-br/",
        "framing": (
            "Why pure buy-to-let property fails the BPR test: the Pawson v "
            "HMRC [2013] UKUT 050 (TCC) investment-vs-trading dichotomy, why "
            "passive rent collection is the wrong side of the line, the "
            "'mainly investment' s.105(3) IHTA 1984 trap. Distinct from "
            "Wave 2's serviced-accommodation-BPR-Pawson page (which covered "
            "the SA cohort that occasionally qualifies); this one is the "
            "negative answer for the 90%-of-our-readers pure-BTL cohort."
        ),
        "notes": "Core IHT myth-buster. Distinct from Wave 2 by being the negative case for pure BTL, not the qualifying-case for serviced accommodation.",
    },
    {
        "id": "C2",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "iht-spouse-exemption-second-death-property-portfolio-window-mechanics",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.mytaxaccountant.co.uk/post/does-iht-allowance-pass-to-spouse",
        "framing": (
            "The spouse-exemption + second-death window for landlord "
            "estates: full s.18 IHTA 1984 spouse exemption on first death, "
            "the planning window between first and second death, transferable "
            "NRB and RNRB (IHT402 / IHT436 within 2 years of second death), "
            "and the trap where the surviving spouse retains a large portfolio "
            "until second death and triggers RNRB taper above £2m. Property-"
            "specific worked examples on the consolidation question."
        ),
        "notes": "Net-new on our site; combines spouse exemption + second-death window + RNRB taper in landlord context.",
    },
    {
        "id": "C3",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "iht-gift-with-reservation-letting-children-paying-rent-mechanics",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.boltburdon.co.uk/blogs/a-t-p-avoid-the-pitfall-i-want-to-transfer-my-house-to-my-children-to-avoid-inheritance-tax",
        "framing": (
            "The GROB s.102 FA 1986 mechanics specific to lettings: parent "
            "gifts a let property to adult children. Where the parent retains "
            "any benefit (collecting the rent, occupying the property, "
            "guarantor on the mortgage), GROB applies. Worked examples on "
            "the rent-payment-out test, FA 1986 Sch 20 para 6 carve-out for "
            "donor-occupation-with-cost-sharing, and the POAT election (IHT500). "
            "Distinct from Wave 2 GROB-of-home page by focussing on let-"
            "property gifting."
        ),
        "notes": "Direct deepening of Wave 2 IHT-GROB page; that one focussed on family home, this on let-property.",
    },
    {
        "id": "C4",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "iht-7-year-clock-property-gifting-mid-life-landlord-strategy",
        "category": "landlord-tax-essentials",
        "source_url": "https://hwfisher.co.uk/inheritance-tax-hmrc-and-the-7-year-rule/",
        "framing": (
            "The 7-year PET clock applied to property: how the s.7(4) "
            "IHTA 1984 taper reduces the tax (not the gift value), why "
            "the taper produces no benefit for gifts within the NRB, and "
            "the mid-life landlord-gifting strategy (gifting a low-base-cost "
            "BTL to a 30-year-old child at age 50, surviving 7 years vs "
            "surviving 3-7 with taper). CGT on the gift (TCGA 1992 s.17 "
            "deemed disposal at market value), no holdover for non-business "
            "BTL property."
        ),
        "notes": "Pure 7-year-clock mechanic applied to property. Distinct from Wave 2 IHT-lifetime-gifts page by being landlord-portfolio-specific.",
    },
    {
        "id": "C5",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "deed-of-variation-property-estate-redirecting-inheritance-iht-saving",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.taxaccountant.co.uk/deeds-of-variation-can-reduce-inheritance-tax/",
        "framing": (
            "Post-death deeds of variation under s.142 IHTA 1984: how "
            "beneficiaries of a landlord estate can redirect inheritance "
            "within 2 years of death and have the redirection read back to "
            "the deceased for IHT (and s.62 TCGA 1992 for CGT). Worked "
            "examples: skipping a generation to grandchildren, redirecting "
            "a BTL to a charity (s.23 charity exemption + 36% rate where "
            "≥10% of estate), and the no-consideration rule (consideration "
            "destroys the s.142 read-back)."
        ),
        "notes": "Specific s.142 mechanic for property estates. Net-new on our site.",
    },
    {
        "id": "C6",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "pension-decumulation-property-portfolio-iht-2027-cohort-sequence",
        "category": "landlord-tax-essentials",
        "source_url": "https://bhp.co.uk/news-events/service-insights/financial-planning/changes-to-pension-inheritance-tax-what-you-need-to-know",
        "framing": (
            "The 6 April 2027 pension-IHT change creates a decumulation-"
            "sequence question for landlords. Pre-2027 wisdom: 'use pension "
            "last' to keep it out of estate. Post-2027 reality: pension is "
            "in the estate; the decumulation sequence becomes a marginal-rate "
            "+ portfolio-mix optimisation. Worked sequences for the 65-year-"
            "old landlord with £900k pension + £1.6m BTL portfolio, RNRB "
            "taper at £2m, and the question of selling property first vs "
            "drawing pension first under post-2027 rules."
        ),
        "notes": "Operational deepening of Wave 2 pension-IHT page; that one was rule-mechanics, this is the sequence/decumulation strategy.",
    },
    {
        "id": "C7",
        "session": "C",
        "bucket": "IHT estate planning for landlords (FIC cross-link)",
        "slug": "fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics",
        "category": "landlord-tax-essentials",
        "source_url": "https://uklandlordtax.co.uk/family-investment-company-inheritance-tax-and-freezing-value/",
        "framing": (
            "FIC as an IHT estate-planning tool for a landlord portfolio: "
            "value-freezing through preference-share + growth-share design "
            "(founder keeps £-coupon preferences = frozen value; growth "
            "accrues to children's growth shares = out of estate over 7 "
            "years). Contrast with direct property gifts (GROB risk if "
            "founder retains income), trusts (entry / 10-year / exit charges), "
            "and lifetime gifts of property (no holdover for non-business). "
            "Cross-link to A8 (FIC retirement) and A9 (FIC share gifts)."
        ),
        "notes": "FIC cross-link from Bucket A. Differentiated from A8 (retirement angle) and A9 (gift mechanics) by being the estate-planning value-freeze framing.",
    },
    {
        "id": "C8",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/",
        "framing": (
            "Mixed-estate landlords post-6-April-2026: how the £1m combined "
            "BPR+APR cap allocates across an estate containing both a "
            "qualifying trading element (e.g. property-developer WIP, working "
            "farm) and a non-qualifying BTL portfolio. Worked allocation "
            "examples, the order-of-application question, and the AIM-shares "
            "50% sub-tier (which doesn't consume the £1m). Distinct from "
            "Wave 2 IHT-April-2026-cap page by being the post-cap allocation "
            "+ planning depth."
        ),
        "notes": "Deepening of Wave 2 cap-impact page. The Wave 2 page covered the rule; this page covers the allocation mechanics inside mixed estates.",
    },
    {
        "id": "C9",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "iht-charitable-legacy-property-portfolio-36-percent-reduced-rate",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.boltburdon.co.uk/blogs/charity-begins-at-home-how-including-a-charitable-gift-in-your-will-can-reduce-inheritance-tax",
        "framing": (
            "Reduced 36% IHT rate where ≥10% of net estate goes to charity "
            "(IHTA 1984 Sch 1A): how a landlord with a £2m+ portfolio "
            "engineers the qualifying-charity threshold, the components-of-"
            "the-estate test (general / survivorship / settled), specific-"
            "property charitable bequests vs residue-share bequests, and "
            "the mathematical break-point where the 36% rate plus the "
            "charity gift outperforms a 40% rate on the larger residue."
        ),
        "notes": "Net-new on our site; specific Sch 1A mechanic applied to landlord estates.",
    },
    {
        "id": "C10",
        "session": "C",
        "bucket": "IHT estate planning for landlords",
        "slug": "iht-clt-property-discretionary-trust-20-percent-entry-charge",
        "category": "landlord-tax-essentials",
        "source_url": "https://www.mytaxaccountant.co.uk/post/chargeable-lifetime-transfer-for-iht",
        "framing": (
            "Settling a property (or property-company shares) into a "
            "discretionary trust during lifetime: the 20% IHT entry charge "
            "on value above NRB, the further 20% top-up if the settlor dies "
            "within 7 years, 10-year periodic charges (max 6%), and exit "
            "charges. CGT s.260 holdover IF the trust is non-settlor-"
            "interested. Comparison with FIC (no entry charge but no s.260) "
            "and direct PET gift (no entry charge, full 40% if death within "
            "3 years)."
        ),
        "notes": "Net-new on our site; specific CLT mechanic for property. Cross-link to C7 (FIC value-freeze comparison).",
    },
]


# ============================================================================
# Brief template (Stage-1 only; Stage 2 fills 4.3 and 4.7)
# ============================================================================

def brief_text(pick: dict, neighbours: list[tuple[float, dict]]) -> str:
    nbr_lines = []
    for j, p in neighbours:
        nbr_lines.append(
            f"- `{p['slug']}` (Jaccard {j:.2f}, category: `{p['category'] or 'unknown'}`)"
        )
    nbr_block = "\n".join(nbr_lines)

    return f"""# Wave 4 brief: {pick['slug']}

**Site:** property
**Bucket:** {pick['bucket']}
**Session:** {pick['session']}
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/{pick['slug']}.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/{pick['category']}/{pick['slug']}

---

## Manager pre-decisions

- **Suggested slug:** `{pick['slug']}`
- **Suggested category:** `{pick['category']}`
- **Bucket:** {pick['bucket']}
- **DRAFT framing differentiator (Stage 1 — Stage 2 will deepen to 2-4 sentences):**

> {pick['framing']}

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** {pick['notes']}

---

## Competitor URLs (Stage 2 stub — Stage 2 sub-agent fills 3-5 high-quality URLs from the v2 working set + writes the fetch-and-read instruction)

**Stage 1 seed URL** (the source competitor URL that surfaced this candidate in the topic-gap delta; Stage 2 verifies + may add or replace):

- {pick['source_url']}

**Stage 2 to do:**

1. Fetch the seed URL and 2-4 sibling URLs from the v2 working set (`docs/property/competitor_universe_v2.md` actionable working set, ≥2 SERP appearances).
2. Write the "fetch + read + extract" instruction block, using the Wave 3 brief format (httpx + BeautifulSoup with timeout 30, User-Agent Mozilla/5.0).
3. Note any URLs that failed verification or are stale.
4. Flag where the competitor outline / FAQ density / worked-example pattern is worth borrowing.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

{nbr_block}

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this bucket (Stage 2 STUB)

**Stage 2 to do:** populate the bucket-specific authority-link list (HMRC manuals, legislation.gov.uk, gov.uk technical notes, relevant case law). Use the Wave 3 brief format. Aim for 6-10 links that fit the framing differentiator; the session selects 4-7 to actually cite.

---

## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 4, pay particular attention to:
  - **Bucket A (LtdCo + FIC):** §11 (Companies House / ECCTA) and the Wave 4 LtdCo extension (manager will land §21 ahead of session launch covering FIC mechanics, share-class structures, charging-rent-to-own-co, post-incorporation operational details).
  - **Bucket B (MTD ITSA):** §3 (headline MTD position) + §19 (Wave 3 MTD extension covering the mandate timeline, qualifying-income mechanic, joint-property owner threshold, three-year exit rule, the corrected §19.7 15/30/31 + 3%/3%/10% penalty regime). Wave 4 may add a §19 extension covering agent involvement, foreign income, pension funds, letting-agent who-files mechanics.
  - **Bucket C (IHT):** §9 (headline IHT) + §15 (Wave 2 IHT extension with NRB/RNRB, PETs/CLTs/7-year-clock, GROB s.102 FA 1986, April 2026 BPR/APR cap, pensions in IHT from 2027, non-resident IHT). Wave 4 may add a §22 extension covering landlord-specific BPR-Pawson, deed-of-variation s.142, charitable-legacy s.1A, CLT/discretionary-trust mechanics, FIC-as-estate-planning-tool.

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave4_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count**, aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 4 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 4, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave4_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 2/3 baked this discipline in; Wave 4 carries it forward. Use git add for the content file and brief file only.
    **§16.15 lesson:** do NOT include `docs/property/wave4_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave4_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **§16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave4_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave4_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted:
- Body word count:

### Flags raised to wave4_site_wide_flags.md

### 2-3 sentence summary
"""


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pages = load_inventory()
    print(f"Loaded {len(pages)} existing pages for cannibalisation Jaccard")
    print(f"Writing {len(PICKS)} Wave 4 briefs to {OUT_DIR}/")
    for pick in PICKS:
        nbrs = closest(pick["slug"], pages, n=5)
        text = brief_text(pick, nbrs)
        out = OUT_DIR / f"{pick['slug']}.md"
        out.write_text(text, encoding="utf-8")
        # Print top neighbour for at-a-glance sanity
        top = nbrs[0] if nbrs else (0.0, {"slug": "(none)"})
        print(f"  {pick['id']} {pick['slug'][:60]}... top-neighbour={top[0]:.2f} {top[1]['slug'][:50]}")
    print("Done.")


if __name__ == "__main__":
    main()
