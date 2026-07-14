---
slug: section-431-elections
tier: guide
route: /blog/share-schemes-and-emi/section-431-elections
category: Share Schemes and EMI
intent: LEARN → HIRE. Founders and early employees who have just acquired restricted securities (common at a funding round or on founder-share issue) and need to make the 14-day election; time-critical advisory-lead intent because the window is short and missing it is a costly trap.
---
# Blog: the section 431 election explained, the 14-day funded-startup trap (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we" / "your company" / "founders". CTA and brand copy flow from site config at write time. Body is authored downstream as RAW HTML (`<p>`, `<h2>`, `<table>`), NOT markdown syntax. No em-dashes anywhere (use commas, parentheses, full stops, middle dot ·).

## Target queries (evidence: TOPICS.md / LAUNCH_CORE.md, DataForSEO UK, fetched 2026-07-11)

- Primary: "section 431 election" / "s431 election" (share-scheme compliance long-tail, KD low)
- Secondary: "431 election restricted securities" / "14 day 431 election"
- Secondary: "do founders need a section 431 election" / "s431 election funding round" (per-term volume-check at Stage 2)
- Secondary: "restricted securities tax uk" (bucket term)

## Search-intent class + play

Founder-DIY → advisory conversion (LEARN → HIRE), time-critical. The reader has acquired or is about to acquire restricted securities (founder shares with leaver provisions, or new shares at a round) and needs to know whether to make the election and by when. Play: own the compliance long-tail with a genuinely clear explanation of what the election does, the 14-day deadline, and the funded-startup trap of not making it, then route to the EMI setup / share-schemes service and the growth-shares guide. UNIQUE to the estate (DEDUP_AUDIT #26).

## Competitors to beat (LAUNCH_CORE rival architecture; live-URL check is Stage 2)

- **Vestd / SeedLegals platform pages**: mention s.431 as a checkbox in a flow; light on the why. Beat by: the tax mechanics and the worked cost of missing it.
- **finerva.com**: ranks on share-scheme company-side terms; the architecture to beat. Beat on the worked before/after example.
- **HMRC ERSM manual**: authoritative but unstructured. Beat by turning ERSM30450 into a founder-usable explainer.

## Required structure / H2 skeleton

Each money/guide H2 opens with a citable 40-60 word BLUF answer.

1. BLUF: what a section 431 election is. State in 40-60 words that a section 431 election is a joint election, made within 14 days of acquiring restricted securities, to be taxed up front on the full unrestricted market value of the shares, so that all future growth is taxed as capital gains rather than employment income (HP16).
2. What restricted securities are and why founders hold them: leaver provisions, vesting, transfer restrictions, all common on founder shares and at funding rounds (HP16 context)
3. What the election does: without it, growth attributable to the lifting of restrictions can be taxed as employment income later; with it, you accept a (usually small) up-front charge on the difference between what you paid and unrestricted market value, and take the rest as CGT (HP16)
4. The 14-day deadline: the joint election must be made within 14 days of acquisition; it is not extendable, which is why it is a trap (HP16)
5. The classic funded-startup trap: founders who paid a nominal price for shares that later grow enormously, and who did not elect, can face an income-tax charge on the growth on exit; the election is cheap insurance early
6. The exit outcome with the election in place: CGT on disposal at 18% within the basic band / 24% above (HP19), and the BADR interaction at 18% from 6 April 2026 on the £1m lifetime limit (HP18); note EMI shares get BADR on the 2-year rule without the 5% test, ordinary shares do not, keep this qualitative
7. Where it fits with growth shares and unapproved options: both fall under general ERS rules and both commonly need the election (HP17; pointer to the growth-shares guide)
8. What to do next: getting the election signed inside 14 days and keeping the record, route to the share-schemes / EMI service

Worked example / table required:
- A worked before/after example: founder acquires shares at a nominal price with restrictions, company grows to an illustrative exit value. Column A (no election): show qualitatively that growth on lifting restrictions risks an income-tax charge. Column B (election made): up-front charge on the paid-vs-unrestricted-value difference at acquisition (illustratively small), then the whole gain taxed as CGT (HP19). Label all figures illustrative; do not assert specific income-tax rates on the no-election path beyond stating it is employment income.
- A one-line deadline strip: acquisition date · plus 14 days · election deadline (HP16).

## FAQ candidates (questions only)

- What is a section 431 election?
- Who needs to make a section 431 election?
- What is the deadline for a section 431 election?
- What happens if you miss the 14-day section 431 deadline?
- Do founders need a section 431 election on their founder shares?
- Does a section 431 election cost anything to make?
- Do EMI option holders need a section 431 election?

## House positions touched

- HP 16: section 431 election, 14-day joint election on restricted securities, taxed on unrestricted market value up front, missing it is a classic funded-startup trap. https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP 17: growth shares and unapproved options under general ERS rules (the "where it fits" pointer). https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP 19: CGT on shares 18% basic band / 24% above (the exit outcome with the election in place). https://www.gov.uk/capital-gains-tax/rates
- HP 18: BADR 18% from 6 Apr 2026, £1m lifetime limit (exit interaction; EMI concession does not extend to ordinary shares). https://www.gov.uk/business-asset-disposal-relief

## Internal links (slug map)

- Service: `/services/share-schemes` (primary CTA target); secondary `/services/emi-scheme-setup`
- Sibling guide (same category): `/blog/share-schemes-and-emi/growth-shares-explained`, `/blog/share-schemes-and-emi/option-pool-basics-uk-founders`, `/blog/share-schemes-and-emi/emi-qualifying-company-rules`
- Hub: `/for/pre-seed-founders`, `/for/funded-startups`

## Hallucination danger zones

- The deadline is 14 days from acquisition (HP16). Do NOT state a different window, and do NOT imply it can be extended.
- Do NOT assert a specific income-tax figure on the no-election path; state only that the growth on lifting restrictions can be taxed as employment income. The worked example must keep the no-election charge qualitative.
- Do NOT extend the EMI-specific BADR concession (2-year rule without 5% test, HP18) to ordinary restricted shares; keep the BADR position for ordinary shares qualitative.
- The election is JOINT (employer and employee/holder); do not describe it as a unilateral filing.
- No pricing, no named experts, no fabricated client examples or claim counts. All worked figures labelled illustrative.
- IR35/off-payroll: not in scope (HP27); do not introduce it.

## Stage 2 TODO

- Re-verify HP16 ERSM30450 phrasing and the 14-day window at build.
- Confirm whether to add a brief note on the standard HMRC s.431 election wording/template without publishing a form URL that may 404 (mirror the VAL231 caution).
- Volume-check "section 431 election" and "s431" long-tail terms and confirm KD.
- Live-URL verify Vestd / SeedLegals / finerva competitor pages.
