# MegaWave 2 discovery log - Session A

Discovery format:

    ## D-N <TYPE> - one-line
    **Surfaced at:** <timestamp + page>
    **Detail:** <what>
    **Recommendation:** <future-wave bucket / back-patch / calculator / component>

Types: ADJACENT_TOPIC / CALCULATOR_IDEA / COMPONENT_IDEA / FUTURE_WAVE_PICK / SITE_WIDE_PATTERN.

---

## D-1 SITE_WIDE_PATTERN — generic-pillar / property-application sibling-pair architecture
**Surfaced at:** 2026-05-26 / Stage 1 batch M2-A-B1 (A5 marginal-relief, A6 DLA, also relevant to A4 CT-planning).
**Detail:** Several MW2 Bucket A picks are generic-UK-titled but the site is property-tax-specific, and existing content already covers the property-specific application of each topic. The seed framing for A5 + A6 lands them as "generic UK pillar / explainer" parent-pages funneling to existing property-specific child pages. This is a reusable pattern for any future MW2 / MW3+ pick whose slug is generic-UK-titled (e.g. "CGT-uk-guide", "MTD-uk-guide", "NRCGT-uk-guide" if they appear). The pattern preserves the existing-page property-focus, captures generic-intent traffic, and architecturally clarifies parent / child relationships in each cluster.
**Recommendation:** Codify in NETNEW_PROGRAM §10 (anti-templating discipline) as a named pattern: "Generic-pillar / property-application sibling pair". Stage 1b reviewer to confirm A4 / A5 / A6 land this framing correctly; if confirmed, replicate for any later picks matching the slug shape.

## D-2 FUTURE_WAVE_PICK — ECCTA Part 2 LP commencement-state tracking page
**Surfaced at:** 2026-05-26 / Stage 1 A3 (companies-house-changes-limited-partnership-requirements).
**Detail:** ECCTA 2023 Part 2 LP-reform commencement is phased + SI-controlled; the campaign page at `https://changestoukcompanylaw.campaign.gov.uk/` is the authoritative live tracker. A standalone "ECCTA Part 2 LP commencement state — current as of [date]" page on our site, refreshed periodically, would be a useful authority signal + a natural top-of-funnel for LP-operator audiences. Distinct from A3 (which explains the reforms substantively) — this would be a tracker / index page pointing at current SIs and current Companies House operational status.
**Recommendation:** consider for MW3+ if LP-traffic signal warrants; depends on GSC data showing LP-search intent.

## D-3 FUTURE_WAVE_PICK — property-LtdCo Day-1-after-incorporation checklist
**Surfaced at:** 2026-05-26 / Stage 1 A1 (a-complete-guide-on-incorporating-a-company-in-uk).
**Detail:** A1's framing as Companies House registration mechanics naturally leaves a Day-1 post-incorporation checklist as a follow-on artefact: open bank account, register for CT with HMRC (3-month window), choose accounting reference date, set up DLA documentation, register for VAT if applicable (over £90k threshold or voluntary), apply for PAYE if employing. A1 references this checklist but doesn't fully walk it. A standalone "property-LtdCo Day-1 checklist" page (or a downloadable PDF) would convert well as a lead-magnet artefact for incorporating-landlord audiences.
**Recommendation:** consider for MW3+ as standalone page OR convert to a `/templates` PDF resource. Forward link from A1.

## D-4 CALCULATOR_IDEA — associated-companies divisor + augmented-profits CT calculator
**Surfaced at:** 2026-05-26 / Stage 1 A4 (corporate-tax-planning-strategies) + A5 (corporation-tax-marginal-relief).
**Detail:** §21.A's associated-companies divisor + augmented-profits test together make CT-rate determination non-trivial for multi-SPV portfolio operators. A purpose-built calculator at `/calculators/multi-spv-corporation-tax/` that takes inputs (number of SPVs, profit per SPV, dividend receipts from non-group sources) and outputs SPV-by-SPV CT rate breakdown + total group CT liability would be a strong tool + a defensible authority signal vs HMRC's calculator (which doesn't handle multi-company groups).
**Recommendation:** consider for MW3+ calculators-cluster; complementary to existing `/calculators` portfolio.

## D-5 SITE_WIDE_PATTERN — §11.A campaign-page F-12 correction propagation
**Surfaced at:** 2026-05-26 / Stage 1 A3 (companies-house-changes-limited-partnership-requirements).
**Detail:** §11.A F-12 corrected the deprecated `https://www.gov.uk/government/news/changes-to-uk-company-law` URL to the correct `https://changestoukcompanylaw.campaign.gov.uk/`. Any earlier-shipped page that cited the deprecated URL is now showing a 404 outbound link — degrades authority signal + UX. A Stage-2b sweep should grep the entire `Property/web/content/blog/` for the deprecated URL and back-patch. Sub-agent did not check at write time (out of scope for Stage 1 seed); flagging for completeness.
**Recommendation:** Stage 2b or pre-deploy hygiene pass: `grep -r "gov.uk/government/news/changes-to-uk-company-law" Property/web/content/blog/` and back-patch any hits to the campaign-page URL.

