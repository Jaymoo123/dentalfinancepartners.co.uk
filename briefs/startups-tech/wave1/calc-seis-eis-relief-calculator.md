---
slug: seis-eis-relief-calculator
tier: calculator
route: /calculators/seis-eis-relief-calculator
intent: DIY. Heavy investor-DIY demand ("eis tax relief" cluster 2,400+1,900+320, low KD 1-8); the tool captures that volume and converts the company-side founder ("raising under SEIS? get advance assurance") into services-seis-eis-advance-assurance. General illustration only, never investment advice.
---
# SEIS/EIS investor relief calculator: landing copy + calculator-logic brief

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site", "we", "investors", "your company". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority: no named experts, no ACA/ICAEW claims, no client names or counts, no pricing figures. This spec feeds a golden-figure vitest; every rate is anchored to a numbered HP and every formula is stated unambiguously.

## Scope + regulated-advice boundary (READ FIRST)

This site gives tax-compliance and company-tax guidance only. It NEVER gives investment advice, price views, or financial promotions, and it does not solicit investment into any scheme (house_positions.md intro; regulated-advice boundary). The calculator is framed as a **general tax illustration**, not personal advice and not a recommendation to invest. Every result carries the "general illustration, not advice" disclaimer. The commercial purpose is company-side: capture the founder who searches investor terms while structuring a round, and convert to advance assurance (HP11).

## Positioning + wedge (dedup #31, UNIQUE)

No estate site has a SEIS/EIS relief calculator (DEDUP_AUDIT #31, UNIQUE). The SEIS/EIS calculator space is occupied by investor platforms (Vestd, SeedLegals content arms), not accountants. The accountant-voiced wedge = the full net-cost / worst-case-loss maths (income tax relief + CGT treatment + loss relief), which platform widgets show only partially, plus the company-side advance-assurance conversion.

## Target queries (evidence: CALCULATORS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary cluster (huge, low KD): "eis tax relief" 2,400 + variants 1,900 + 320, KD 1-8
- "seed eis tax relief" 1,300/mo KD 1
- "eis tax relief calculator" 50/mo KD 0; "how much is eis tax relief" 20/mo KD 0

## Search-intent class + play

DIY tool intent, investor-heavy audience. Searcher (mostly an angel/EIS investor) wants a relief number. Play: tool first, transparent maths, gov.uk citations. Because the audience is non-lead (investors, not our clients), the conversion is the company-side sidebar: "Raising a round under SEIS or EIS? Get HMRC advance assurance before you approach investors" → services-seis-eis-advance-assurance (HP11). Do NOT try to convert the investor; convert the founder reading the same page.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Vestd / SeedLegals** content-arm calculators occupy the tool SERP. Beat with the full net-cost + worst-case-loss maths (loss relief on failure), visible methodology, gov.uk citations, and the accountant-voiced framing platforms avoid.

## Calculator inputs (exact fields)

1. **Amount invested (£)** — numeric, > 0.
2. **Scheme** — select: "SEIS" or "EIS". Drives the relief rate and the annual cap.
3. **Investor income tax band** — select: basic 20%, higher 40%, additional 45% (used only to size the loss-relief benefit; the IT relief rate itself is scheme-fixed, not band-dependent, so do NOT scale the 50%/30% by band). ponytail: band drives loss relief only, not the headline IT relief.
4. **(Optional) Gain being reinvested (£)** — SEIS only, for the 50% CGT reinvestment exemption line (HP8). Numeric, ≥ 0. If scheme = EIS, this input drives the EIS CGT deferral line instead (deferral, not exemption; see logic).

## Calculation logic / formula (figure-by-figure, HP-anchored)

Let `I` = amount invested (input 1), `band` = investor IT band decimal (0.20 / 0.40 / 0.45), `G` = gain reinvested (input 4).

**A. Income tax relief.**
- SEIS: relief = `I × 50%`, subject to the £200,000 annual cap (HP8). Effective invested amount getting relief = `min(I, 200000)`; relief = `min(I, 200000) × 50%`. Flag if `I > 200000` that relief is capped.
  - Golden figure: `I=£10,000` SEIS → relief £5,000. `I=£250,000` SEIS → relief capped at £200,000 × 50% = £100,000, with a cap flag.
- EIS: relief = `I × 30%`, subject to the £1,000,000 annual cap, rising to £2,000,000 where the excess over £1m is in knowledge-intensive companies (HP10). For the base tool, cap at £1,000,000 and surface a note about the £2m KIC extension (do NOT auto-apply the £2m without a KIC input; keep it a flagged note). 
  - Golden figure: `I=£10,000` EIS → relief £3,000. `I=£1,200,000` EIS → relief capped at £1,000,000 × 30% = £300,000, KIC note shown.

**B. Net cash cost after IT relief.**
- Net cost = `I − relief`.
  - SEIS £10,000 → net cost £5,000. EIS £10,000 → net cost £7,000.

**C. CGT treatment.**
- SEIS reinvestment exemption (HP8): if `G` supplied, exempt gain = `min(G, I) × 50%`. This is a 50% exemption on the gain reinvested (up to the amount invested). Display as a separate CGT saving line; do NOT add it to the IT relief as if one number (they are different taxes). State it is a reinvestment exemption, not a deferral.
  - Golden figure: `G=£10,000`, `I=£10,000` SEIS → exempt gain £5,000 (the CGT saved depends on the CGT rate, which this tool does not assume; show the exempt-gain amount, not a £ CGT figure, unless a CGT rate is separately collected — default: show exempt gain amount only).
- EIS: the mechanism is CGT DEFERRAL (defer the gain, not exempt it). If `G` supplied under EIS, deferrable gain = `min(G, I)` and copy states the gain is deferred until the EIS shares are sold, not permanently exempt. Do NOT show an EIS 50% exemption (that is SEIS only).
- SEIS shares held 3 years: disposal is CGT-free (HP8); EIS shares held 3 years: gains on the shares themselves are CGT-free but the deferred gain comes back into charge (HP10 context). State these as copy, not as calculated £ lines unless a growth assumption is collected (it is not).

**D. Loss relief / worst-case net loss.**
- If the company fails and shares become worthless, the investor can claim loss relief on the net cost against income at the marginal band (HP context: loss relief is on the amount invested net of IT relief already given).
- Allowable loss = `I − relief` (the net cost, since IT relief already reduced the effective cost). Loss relief value = `allowableLoss × band`.
- Worst-case net loss (total capital at risk after both reliefs) = `netCost − lossReliefValue` = `(I − relief) − ((I − relief) × band)` = `(I − relief) × (1 − band)`.
  - SEIS golden figure, `I=£10,000`, 45% band: relief £5,000, net cost £5,000, loss relief £5,000 × 45% = £2,250, worst-case net loss = £5,000 × 0.55 = £2,750. So of £10,000 invested, at most £2,750 is truly at risk for a 45% SEIS investor. State the maths, cite HP8 for the 50% relief and the general loss-relief mechanism as gov.uk (see danger zones re loss-relief citation).
  - EIS golden figure, `I=£10,000`, 45% band: relief £3,000, net cost £7,000, loss relief £7,000 × 45% = £3,150, worst-case net loss = £7,000 × 0.55 = £3,850.

## Outputs

1. **Income tax relief** (£ and effective rate), with a cap flag where the annual limit is hit.
2. **Net cash cost** after IT relief.
3. **CGT line**: SEIS reinvestment exemption (exempt-gain amount) OR EIS deferral note, per scheme, when a gain is supplied.
4. **Worst-case net loss** after loss relief (the "capital genuinely at risk" figure), with the full derivation shown.
5. The "general illustration, not investment advice" disclaimer.
6. Company-side conversion block (advance assurance).

## Result-CTA framing

Two audiences, one page:
- Investor (non-lead): "This is a general tax illustration, not investment or financial advice. Your actual relief depends on your circumstances and the company qualifying. Confirm with your own adviser." NO lead push at the investor.
- Founder (the conversion): sidebar/after-result block: "Raising under SEIS or EIS? Investors will want HMRC advance assurance that your round qualifies before they commit. We handle SEIS/EIS advance assurance end to end." CTA → /services/seis-eis-advance-assurance (HP11).

## Landing-page copy H2 skeleton (AROUND the tool)

Each money/methodology H2 opens with a citable 40-60 word BLUF answer.
1. Calculator embed block (tool leads the page): /embed/seis-eis-relief-calculator
2. What this calculator works out (IT relief, net cost, CGT, worst-case loss, BLUF) + the not-advice line
3. The inputs explained (amount, scheme, band, gain reinvested)
4. SEIS vs EIS at a glance (50%/£200k vs 30%/£1m, £2m KIC): BLUF + table. HP8, HP10.
5. Worked example: £10,000 into SEIS for a 45% investor (relief £5,000, net cost £5,000, worst-case loss £2,750) vs £10,000 into EIS (relief £3,000, worst-case loss £3,850). HP8, HP10.
6. How the maths works (methodology + gov.uk citations, figure-by-figure)
7. CGT: SEIS reinvestment exemption vs EIS deferral (do not conflate). HP8, HP10.
8. Loss relief: how the downside is cushioned (the worst-case-loss derivation)
9. What this calculator does NOT do (does not confirm the company qualifies, does not give investment advice, does not model carry-back)
10. For founders: raising a round? Get advance assurance first (conversion). HP11.
11. FAQ

FAQ candidates (questions only): How much SEIS income tax relief can I claim? What is the SEIS annual limit? How much EIS relief on £10,000? What is the difference between the SEIS CGT exemption and EIS deferral? What happens if the company fails, do I get loss relief? Is this investment advice? What is knowledge-intensive company relief? How does a founder get SEIS/EIS advance assurance?

Table/chart opportunities: SEIS vs EIS comparison table (rate, annual cap, CGT mechanism, hold period); a "£10,000 invested" waterfall (invested → IT relief → net cost → loss relief → worst-case loss) for both schemes; each rate cell linking its gov.uk source.

Calculator embed: /embed/seis-eis-relief-calculator

Internal links (launch core): /services/seis-eis-advance-assurance · /for/pre-seed-founders · /for/funded-startups · /blog/seis-and-eis/seis-vs-eis-explained · /blog/seis-and-eis/seis-company-checklist · /blog/seis-and-eis/how-to-apply-for-seis-eis-advance-assurance · /blog/seis-and-eis/seis1-eis1-compliance-statements

## House positions touched

- HP7 (context): SEIS company limits (raise ≤£250k, gross assets ≤£350k, <25 FTE, within 3 yrs of trade). https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme
- HP8: SEIS investor 50% IT relief on ≤£200,000/yr; 50% CGT reinvestment exemption; CGT-free disposal after 3 years. https://www.gov.uk/guidance/seed-enterprise-investment-scheme-background
- HP9 (context): EIS company limits (raise ≤£5m/yr, £12m lifetime, higher for KIC). https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme
- HP10: EIS investor 30% IT relief on ≤£1m/yr (£2m where excess is in KIC), 3-year hold. https://www.gov.uk/guidance/venture-capital-schemes-tax-relief-for-investors
- HP11: advance assurance is HMRC pre-clearance (company-side conversion). https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance

## Hallucination danger zones

- IT relief rates are SCHEME-fixed, not band-scaled: SEIS 50% (HP8), EIS 30% (HP10). Do NOT multiply the relief rate by the investor's band. The band feeds ONLY the loss-relief line.
- Annual caps: SEIS £200,000 (HP8), EIS £1,000,000 / £2,000,000 KIC (HP10). Do NOT confuse these with the company raise limits (SEIS £250,000 HP7, EIS £5m/£12m HP9) - those are per-company, not per-investor. Vitest must separate investor caps from company limits.
- SEIS CGT = 50% reinvestment EXEMPTION; EIS CGT = DEFERRAL. Do NOT give EIS a 50% exemption or SEIS a deferral. Different mechanisms (HP8 vs HP10).
- Worst-case-loss golden figures: SEIS £10k @45% = £2,750 loss; EIS £10k @45% = £3,850 loss. Formula = `(I − relief) × (1 − band)`. Do NOT compute loss relief on the gross `I`; it is on the net cost.
- The £2m EIS relief only applies where the excess over £1m is in KIC (HP10). Do NOT auto-apply £2m without a KIC input; keep it a flagged note.
- NEVER frame the tool or copy as investment advice, a recommendation to invest, or a financial promotion (house intro boundary). Every result carries the not-advice disclaimer.
- Do NOT state a CGT rate to convert the SEIS exempt gain into £ saved unless a CGT rate is separately collected (it is not in the base inputs); show the exempt-gain amount only. If a CGT figure is ever added, cite HP19 (18%/24%) not a made-up rate.
- Do NOT model carry-back, dividend income, or the KIC £2m auto-uplift in the base tool; flag as "speak to us / your adviser".
- No pricing; no client counts.

## Stage 2 TODO

- Confirm the engine input set exactly matches inputs 1-4 and the golden-figure vitest cases (SEIS/EIS £10k relief and worst-case loss at 45%; SEIS £250k and EIS £1.2m cap flags).
- Verify a clean gov.uk citation for the loss-relief mechanism (currently leaning on HP8 general framing); if none exists in the HP set, FLAG and either add an HP or soften the copy to "loss relief may be available, subject to your circumstances" without a hard figure.
- Live-URL verify Vestd/SeedLegals calculator features to confirm the worst-case-loss + accountant-voice wedge holds.
- Confirm answer-box copy blocks are 40-60 words and the not-advice disclaimer is present on every result.
