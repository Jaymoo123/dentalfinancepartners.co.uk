---
slug: emi-scheme-setup
tier: money
route: /services/emi-scheme-setup
intent: HIRE. Founders researching EMI move to advisory engagement to set up the scheme, agree the valuation with HMRC, and stay compliant on grant notification. Second money cluster after SEIS/EIS.
---
# Service: EMI scheme setup and valuation

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site", "we", "your company". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority: no named experts, no credential claims, no client names or counts, no pricing figures.

## Positioning + wedge (dedup #8, UNIQUE)

Net-new to the estate. No estate site holds EMI setup/valuation/disqualifying-events content. The SERP is held by platforms (Vestd, SeedLegals), not accountants, so a depth play on the qualifying tests, the HMRC valuation, and the compliance deadlines takes it. Second money cluster (share schemes). Own EMI setup end to end for qualifying software/tech companies.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK, fetched 2026-07-11)

- Primary: "emi share scheme" 1,900/mo KD 0; "emi scheme" 1,900/mo KD 1
- Broad head: "enterprise management incentives" 8,100/mo KD 4
- Secondary: "emi share options" 390/mo KD 7
- Compliance long-tail: EMI valuation, grant notification, disqualifying events (guide spine)

## Search-intent class + play

HIRE, advisory engagement. Founder research on EMI converts to a setup engagement: draw up the scheme, agree the option-grant valuation with HMRC Shares and Assets Valuation, notify the grant on time, and keep it compliant. Win on the three things platforms under-serve: the qualifying-company tests, the HMRC valuation process, and the grant-notification / disqualifying-event compliance discipline.

## Competitors to beat (domains only at seed; live-URL check is Stage 2)

- **Vestd / SeedLegals** — platform tier holds the SERP; beat on accountant-side valuation and compliance depth, not on tooling parity.
- **finerva.com / accountancycloud.com** — accountant rivals with share-scheme pages; match architecture, out-depth on the valuation and 6 July notification discipline.

## Required structure / H2 skeleton

Each money H2 opens with a citable 40-60 word BLUF answer, then depth. Skeleton:
1. Hero: EMI scheme setup and valuation (value prop + primary CTA).
2. Does your company qualify for EMI? (BLUF: gross assets no more than £30m, fewer than 250 FTE, no excluded activities, employees meet the working-time test; up to £250k unexercised value per employee over a rolling 3 years and £3m per company). Qualifying-tests table. HP12.
3. Agreeing the option valuation with HMRC (BLUF: the grant valuation should be agreed with HMRC Shares and Assets Valuation before or at grant). Cite the EMI and ERS manual pages, NOT a VAL231 link. HP14.
4. Grant notification and ERS returns (BLUF: EMI grant notification and the annual ERS return, including nil returns, are due by 6 July after the tax year end). HP13.
5. Founder-share hygiene at grant: the section 431 election (14-day joint election on restricted securities, a classic funded-startup trap). HP16.
6. Worked example: a funded SaaS company granting options within the £250k-per-employee / £3m-per-company headroom, agreeing the valuation, then hitting the 6 July notification. HP12, HP13, HP14.
7. How we help (3 cards).
8. FAQ.
9. Next-step CTA + internal links.

## TS data-entry shape (content workers fill these)

**stats (3)** — figure + HP + gov.uk URL:
- "£250,000 / £3m" EMI unexercised value per employee (rolling 3 years) and per company (HP12).
- "£30m / 250" gross-assets and full-time-equivalent qualifying-company ceilings (HP12).
- "6 July" annual ERS return and EMI grant-notification deadline after the tax year end (HP13).

**challenges (4)**:
1. Granting options before checking the qualifying-company tests (gross assets, FTE, excluded activities, working-time) and breaching EMI (HP12).
2. Setting an option price without agreeing the valuation with HMRC Shares and Assets Valuation (HP14).
3. Missing the 6 July grant-notification or ERS return, including where a nil return is still required (HP13).
4. Founders acquiring restricted securities at a round without the 14-day section 431 election (HP16).

**howWeHelp (3)**:
1. Check EMI qualifying-company and employee tests and design the scheme within the £250k / £3m limits (HP12).
2. Agree the option-grant valuation with HMRC Shares and Assets Valuation, citing the EMI and ERS manual process (HP14).
3. Register the scheme and file the grant notification and ERS returns by 6 July, including nil returns, and flag the section 431 election window at grant (HP13, HP16).

**faqs (2+)** — questions only:
- Does my company qualify to grant EMI options? (HP12)
- How is the EMI option value agreed with HMRC? (HP14)
- When do we have to notify an EMI grant? (HP13)
- What is a section 431 election and when do we need it? (HP16)

## House positions touched

- HP12: EMI up to £250k unexercised value/employee (rolling 3 yrs), £3m/company; gross assets no more than £30m, under 250 FTE, no excluded activities, working-time test. https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis (gross-assets: https://www.gov.uk/hmrc-internal-manuals/employee-tax-advantaged-share-scheme-user-manual/etassum52030)
- HP13: ERS returns (incl. nil) and EMI grant notification due 6 July after tax year end. https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return
- HP14: option grant valued in agreement with HMRC Shares and Assets Valuation; VAL231 URL 404s, do NOT publish it, cite EMI + ERS manual pages, re-verify at build. https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis and https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return
- HP16: section 431 = 14-day joint election on restricted securities. https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- (BADR context, if exit is mentioned) HP18: EMI shares qualify for BADR at 18% from 6 Apr 2026 on the 2-year rule without the 5% personal-company test. https://www.gov.uk/business-asset-disposal-relief

## Hallucination danger zones

- DO NOT publish a VAL231 form link (the URL 404s per HP14); cite the EMI and ERS manual pages instead; re-verify any VAL231 link at build before use.
- Do NOT invent EMI limits other than £250k/employee, £3m/company, £30m gross assets, under 250 FTE (HP12).
- Do NOT state the section 431 window as anything other than 14 days (HP16).
- Do NOT quote fees or a "typical valuation" figure.
- If BADR/exit is referenced, use 18% from 6 Apr 2026 (HP18) and never a stale 14% or 10% as current.
- Frame all outputs as general guidance; route specific facts to "speak to us".

## Internal links (launch core)

- /calculators/emi-vs-unapproved-calculator
- Guides: /blog/share-schemes-and-emi/emi-qualifying-company-rules · /blog/share-schemes-and-emi/emi-option-valuation · /blog/share-schemes-and-emi/emi-disqualifying-events · /blog/share-schemes-and-emi/section-431-elections · /blog/share-schemes-and-emi/option-pool-basics-uk-founders
- Related service: /services/share-schemes (CSOP / growth shares fallback when EMI tests breach)
- Hubs: /for/funded-startups

## Stage 2 TODO

- Re-verify whether a live VAL231 form URL exists at build; if still 404, keep manual-page citations only (HP14).
- Live-URL verify Vestd/SeedLegals EMI page depth to calibrate the depth play.
- Volume-check EMI valuation and disqualifying-events long-tail.
