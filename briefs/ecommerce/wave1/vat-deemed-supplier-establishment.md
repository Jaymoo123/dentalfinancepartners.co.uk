---
slug: vat-deemed-supplier-establishment
tier: vat-depth
route: /vat/deemed-supplier-establishment
intent: SELLER-PROBLEM. Marketplace sellers untangling who accounts for the UK VAT on their sales, and overseas businesses (or UK-incorporated shells) checking their establishment status. HIRE prospects for ecommerce-vat-compliance and selling-into-the-eu when the answer is "it depends on establishment".
---
# Marketplace deemed supplier and UK establishment status for sellers

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK loc 2826, joined 2026-07-12)

- Primary: no clean head term; "amazon seller vat" measured 10/mo (demand lives in long-tail variants, not the head — LAUNCH_CORE). This is a UNIQUE depth page, service-led not traffic-led: it earns citations and captures the seller who has hit an establishment/deemed-supplier problem.
- Long-tail intent to cover: "who pays vat amazon marketplace", "marketplace deemed supplier uk", "am i uk established for vat", "overseas seller uk vat marketplace", "amazon collecting vat on my behalf".
- Competitive note (COMPETITORS.md): the SaaS/tool layer owns the informational SERP but cannot credibly own tax-position pages (they sell software, not establishment analysis). This is exactly the layer the SaaS arms cannot own — build depth here.

## Search-intent class + play

SELLER-PROBLEM (assist + capture). The page resolves the single most consequential VAT fact for a marketplace seller: is the seller UK-established or overseas, because that decides whether the marketplace or the seller accounts for the UK VAT. Play: a plain-English decision framework (establishment tests, deemed-supplier mechanism, the "UK shell" challenge) that no rival states cleanly, with capture at the point where the reader realises their status is genuinely uncertain and needs an adviser to defend it to HMRC.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **A2X / Link My Books content arms** (868-URL breadth arm, 1,157 UK ranked keywords but shallow top-10 penetration per LAUNCH_CORE): they own the "how to reconcile" and "how VAT works in software" angle. Beat on the tax-position depth they structurally avoid.
- **14 dedicated ecommerce accountancy firms**: most carry a generic "marketplace VAT" paragraph; none owns deemed-supplier + establishment edge cases end to end. Beat on comprehensiveness and worked establishment scenarios.
- **gov.uk overseas-goods-via-marketplace guidance**: authoritative but fragmentary and written for the overseas seller, not the UK seller trying to work out which side of the line they sit. Beat on a single consolidated decision page.

## Required structure

H2 skeleton:
1. The short answer: who accounts for the UK VAT on a marketplace sale (BLUF, cited) — turns entirely on establishment
2. What "the marketplace is the deemed supplier" actually means (HP 2)
3. UK-established vs overseas-established: the test that decides everything (HP 2)
4. If you are UK-established: you remain liable, the marketplace does not collect for you (HP 2)
5. If you are overseas-established: the marketplace accounts for UK VAT and there is no registration threshold (HP 2)
6. The "UK shell" trap: why HMRC challenges thin UK-establishment claims (HP 2)
7. Where the £135 rule interacts with this (marketplace vs direct sale) (HP 3, cross-link to /vat/135-import-rule)
8. What this changes on your VAT return and reconciliation
9. When to get help (capture)
10. FAQ

FAQ candidates:
- Who pays the VAT when I sell on Amazon or eBay to a UK customer?
- Am I UK-established for VAT if my company is registered at Companies House?
- Does the marketplace collect VAT if I am a UK seller?
- Do overseas sellers have a UK VAT registration threshold?
- What is a deemed supplier?
- Why is Amazon collecting UK VAT on some of my sales but not others?
- Can HMRC challenge my UK establishment status?
- Does the deemed-supplier rule apply to my own website sales? (No — marketplace only; direct sales follow the £135 rule, HP 3)

Table/chart opportunities:
- Establishment status decision table: UK-established seller vs overseas-established seller, columns for "who accounts for UK VAT", "registration threshold", "what appears on your return".
- Sale-route matrix: (UK-established / overseas-established) x (marketplace sale / direct sale) → who accounts for VAT.

Calculator embed: none (no VAT establishment tool in launch fleet). Cross-link /calculators/vat-threshold-tracker for the registration question and /calculators/seller-take-home for margin impact.

Internal links (launch core only):
- /for/amazon-sellers, /for/marketplace-sellers (segment hubs this page serves)
- /vat/135-import-rule (the £135 interaction in section 7)
- /vat/vat-on-marketplace-fees (companion depth page)
- /services/ecommerce-vat-compliance (primary capture)
- /services/selling-into-the-eu (for the overseas/cross-border reader)
- /calculators/vat-threshold-tracker
- /research/online-seller-index
- /blog/platform-reporting-rules (HMRC visibility context)
Link OUT to generalist for generic £90k registration and MTD mechanics: hollowaydavies.co.uk (do not re-explain the generic registration threshold here beyond the marketplace-specific point).

## House positions touched

- **HP 2:** "Overseas-established sellers have no registration threshold: on an online marketplace the marketplace is the deemed supplier and collects UK VAT; UK-established sellers on the same marketplace remain liable themselves. Where a seller is not established in the UK and sells through an online marketplace to UK customers, the marketplace is liable to account for the UK VAT on those sales. UK-established sellers are outside this deemed-supply mechanism and remain responsible for their own VAT. Establishment status is therefore the single most consequential VAT fact for a marketplace seller, and HMRC actively challenges 'UK shell' establishment claims by overseas businesses." — https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces (verified 2026-07-15)
- **HP 3** (interaction, section 7): "Imports of £135 or less sold directly to UK consumers: supply VAT is due at the point of sale, not import VAT at the border... Where the same sale goes through an online marketplace, the marketplace accounts for the VAT instead (see position 2)." — https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk (verified 2026-07-15). Cover only the marketplace-vs-direct distinction; the full £135 mechanics live on /vat/135-import-rule.
- **HP 1** (context only, do not re-explain): the £90,000 gross-turnover threshold — link OUT to generalist for the generic mechanics; the point here is that overseas sellers have NO threshold (HP 2). — https://www.gov.uk/vat-registration

## Hallucination danger zones

- NEVER blur UK-established and overseas-established treatment (HP 2 consistency rule). The whole page turns on this line; state establishment first, then the consequence.
- Do NOT invent an establishment "test checklist" with legal thresholds HMRC has not published. Describe establishment in principle (fixed place of business / human and technical resources in the UK) and flag as a fact-specific question for advice; do NOT assert bright-line day counts, staff counts or premises rules that are not in the cited source.
- Do NOT state that a Companies House registration alone makes a business UK-established — HP 2's "UK shell" point is precisely that HMRC challenges this. Frame carefully, do not give the reader a false safe harbour.
- The deemed-supplier rule is MARKETPLACE-only. Never imply a marketplace accounts for VAT on the seller's own-website (direct) sales — those follow HP 3.
- Do NOT state the £135 figure's downstream EU/IOSS equivalents here (that is /vat/ioss-vs-oss, and the €150 figure is FLAGGED — do not state).
- No em-dashes.

## Stage 2 TODO

- WebFetch the gov.uk overseas-goods-via-marketplace guidance; confirm the deemed-supplier and no-threshold-for-overseas positions are live and unchanged 2026-07.
- Decide with the conductor whether an "am I UK-established?" principle box needs an HP extension (raise HOUSE_POSITION_EXTENSION flag) or stays deliberately figure-free with an "advice-needed" CTA. HP GAP: HP 2 asserts the deemed-supplier mechanism and the UK-shell challenge but fixes NO establishment-test criteria — the page must describe establishment without inventing thresholds. Flag if the writer needs criteria.
- Live-URL check the top 3 dedicated-firm "marketplace VAT" pages to set the depth bar.
