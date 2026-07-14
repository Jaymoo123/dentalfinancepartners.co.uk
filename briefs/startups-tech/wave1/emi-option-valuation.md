---
slug: emi-option-valuation
tier: guide
route: /blog/share-schemes-and-emi/emi-option-valuation
category: Share Schemes and EMI
intent: LEARN → HIRE. Founders setting up EMI who need the option valuation agreed with HMRC before grant, and the annual notification obligation; high advisory-conversion intent.
---
# Blog: EMI option valuation and grant notification (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we" / "your company". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Company-side compliance content; NO investment advice, no financial promotion.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK, fetched 2026-07-11)

- Primary: "emi valuation" / "emi option valuation" (EMI-cluster long-tail; DEDUP verdict UNIQUE, zero estate coverage)
- Secondary: "emi share options" 390 / KD 7
- Secondary: "emi amv umv" / "actual market value unrestricted market value emi"
- Secondary: "emi grant notification" / "emi 6 july deadline" / "ers nil return emi"

## Search-intent class + play

Founder-DIY → advisory engagement (LEARN → HIRE). Valuation is the technical step founders cannot self-serve well: the option grant should be valued in agreement with HMRC Shares and Assets Valuation (SAV), and there is an annual notification/reporting obligation with a hard 6 July deadline including nil returns. Play: explain AMV vs UMV, the SAV agreement, and the annual ERS/EMI notification (6 July after tax-year end, nil returns included), positioning the compliance risk as the hook to the EMI setup service. CAUTION: the VAL231 form URL 404s, so this guide must NOT publish a VAL231 link and cites the EMI + ERS manual pages instead.

## Competitors to beat (LAUNCH_CORE rival architecture; live-URL check is Stage 2)

- **Vestd / SeedLegals** — hold the EMI head; many still link the dead VAL231 form. Beat by being accurate on the SAV agreement route and the AMV/UMV distinction they oversimplify, and by NOT publishing a dead form link.
- **finerva.com** — share-schemes service pages ranking on EMI terms; the architecture to beat.
- **HMRC EMI + ERS manuals** — authoritative but dense; beat by turning the valuation-then-notify sequence into a founder-usable process.

## Required structure

Each money/guide H2 opens with a citable 40-60 word BLUF answer.

H2 skeleton:
1. BLUF: how EMI options are valued and why it matters (the grant valuation should be agreed with HMRC Shares and Assets Valuation before/at grant; AMV sets the tax-free exercise, UMV drives the reporting; 40-60 words; HP14)
2. Actual market value vs unrestricted market value (AMV = restricted-share value the employee can exercise at without income tax; UMV = value ignoring restrictions; why both are agreed; qualitative, cite HP14)
3. Agreeing the valuation with HMRC Shares and Assets Valuation (the SAV agreement route; what it fixes and for how long; CAUTION: do NOT publish a VAL231 link, cite the EMI + ERS manual pages; HP14)
4. Why the valuation is the compliance linchpin (a wrong/undocumented valuation risks the tax-advantaged treatment; the founder-value hook)
5. Registering the scheme and the annual ERS return (the scheme must be registered; an annual ERS return is due, including a nil return where nothing happened; HP13)
6. The 6 July grant-notification deadline (EMI grant notification runs on the same 6 July after tax-year end deadline; nil returns still required; HP13)
7. What happens if you miss notification or use a stale valuation (the risk; the honest edge cases; qualitative)
8. Getting valuation and notification handled (route to EMI setup service; forward-link qualifying-company + disqualifying-events guides)

Worked examples / tables required:
- An AMV vs UMV worked example: a share with growth restrictions showing AMV (lower, sets the exercise price for no-income-tax treatment) vs UMV (higher, used for reporting), qualitative and cited to HP14.
- A compliance TIMELINE table: grant date → agree valuation with SAV (HP14) → register scheme → notify grant / file annual ERS return by 6 July after tax-year end, nil returns included (HP13).
- A "what you file and when" table: event, obligation, deadline (6 July per HP13), nil-return rule.

FAQ candidates (questions only):
- How are EMI options valued?
- What is the difference between AMV and UMV for EMI?
- Do I have to agree the EMI valuation with HMRC?
- What is the VAL231 form? (answer: the standalone VAL231 URL currently 404s; do not link it; see danger zones)
- When is the EMI grant notification deadline?
- Do I need to file a nil ERS return if nothing happened?
- How long is an EMI valuation valid for? (flag: verify at build; no HP gives a fixed period)
- What happens if I miss the 6 July deadline?

## House positions touched

- HP 13: ERS returns (including nil returns) and EMI grant notifications are due by 6 July after the tax year end; the scheme must be registered. https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return
- HP 14: EMI option grants should be valued in agreement with HMRC Shares and Assets Valuation. The standalone VAL231 form URL 404s and is NOT cited; cite the EMI + ERS manual pages and re-verify the VAL231 link at build. https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis and https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return

Consistency rule: the 6 July deadline and nil-return rule come from HP13; the SAV-agreement/valuation framing from HP14.

## Internal links (launch core slug map)

- Service: /services/emi-scheme-setup (primary CTA)
- Sibling guide: /blog/share-schemes-and-emi/emi-qualifying-company-rules
- Sibling guide: /blog/share-schemes-and-emi/emi-disqualifying-events
- Sibling guide: /blog/share-schemes-and-emi/section-431-elections (restricted securities link)
- Calculator: /calculators/emi-vs-unapproved-calculator
- Hub: /for/funded-startups

## Hallucination danger zones

- CRITICAL (HP14): do NOT publish a VAL231 form link; the standalone VAL231 URL 404s. Cite the EMI + ERS manual pages (HP14 sources) only. Re-verify at build whether a working VAL231 URL exists before ever adding one.
- Do NOT state a fixed EMI valuation validity period (e.g. "valid for 90 days") from memory; no HP gives it. State qualitatively and flag for build.
- The AMV/UMV mechanics must stay qualitative and cited to HP14; do NOT invent a formula or a specific discount percentage.
- Do NOT state a grant-notification deadline other than 6 July after the tax-year end (HP13); nil returns are required (HP13).
- Do NOT restate EMI company/value limits here (they live in HP12 / the qualifying-company guide); link out instead of re-quoting.
- No pricing for the valuation or setup service (config only).

## Stage 2 TODO

- BUILD-VERIFY: re-check whether a live VAL231 URL exists; if still 404, keep citing EMI + ERS manuals only (HP14).
- Verify HP13 ERS return / 6 July / nil-return phrasing at build (expected unchanged).
- Confirm whether an EMI valuation validity period can be sourced; do not invent otherwise.
- Confirm EMI setup service slug live before hard-linking.
