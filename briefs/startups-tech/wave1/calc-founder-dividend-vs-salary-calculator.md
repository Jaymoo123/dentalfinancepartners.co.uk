---
slug: founder-dividend-vs-salary-calculator
tier: calculator
route: /calculators/founder-dividend-vs-salary-calculator
intent: DIY. Founders of their own limited company sizing the optimal salary/dividend split for 2026/27; estate-proven pattern. The sharp founder wedge (Employment Allowance solo-director trap, EMI/BADR exit, pre-revenue low-profit split) is what keeps it off the generalist optimiser.
---
# Founder dividend vs salary 2026/27 calculator: landing copy + calculator-logic brief

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site", "we", "founders", "your company". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority: no named experts, no ACA/ICAEW claims, no client names or counts, no pricing figures. This spec feeds a golden-figure vitest; every rate is anchored to a numbered HP and every formula is stated unambiguously.

## Positioning + wedge (dedup #33, DIFFERENTIATE — SHARPEST WEDGE REQUIRED or cede to generalist)

This is the highest-overlap topic in the launch core. Generalist holds `/calculators/salary-dividend-optimiser` and `/calculators/dividend-tax-calculator`; agency holds `salary-dividend-optimiser`; contractors-ir35 holds `contractor-salary-dividend-calculator`. The generic optimiser STAYS generalist. This tool survives ONLY because of a founder-only wedge that the generic optimisers do not carry. The load-bearing wedge (must be enforced or the page is ceded):
1. **Employment Allowance solo-director trap** (HP23): a company whose only employee paid above the secondary threshold is a director is NOT eligible for the £10,500 Employment Allowance. The generic optimisers routinely assume EA is available. This tool asks "are you the sole director/employee?" and switches EA OFF when yes, and shows the extra employer NIC that costs.
2. **EMI / BADR exit interaction**: a founder taking low salary + dividends now while sitting on EMI options / a future BADR exit should not over-optimise current extraction at the cost of the exit. A contextual note links the emi-vs-unapproved calc and the BADR position (HP18).
3. **Pre-revenue / low-profit founder split**: when company profit is low or nil, the "optimal" answer is often salary only (or minimal extraction), and banking losses (HP25) matters more than the split. The tool handles the low-profit case explicitly, which take-home-maximiser optimisers do not.

## Target queries (evidence: CALCULATORS.md; estate-proven pattern, dividend queries dominate generalist GSC)

- No single measured-volume term assigned in CALCULATORS.md (estate-proven pattern). The founder-scoped long-tail ("director salary dividend 2026/27", "founder salary vs dividend") is the target; volume-check at Stage 2. Do NOT compete for the generic "salary dividend calculator" head owned by generalist.

## Search-intent class + play

DIY tool intent, founder audience. Searcher runs their own company and wants the optimal 2026/27 extraction split. Play: tool first, transparent maths, gov.uk citations, then the three founder-specific edges (EA trap, EMI/BADR, low-profit) that convert into core-compliance and fractional-CFO. The Scottish income tax flag appears on THIS founder-salary tool only (HP20/25 boundary; house intro: flag Scottish bands on founder-salary content only).

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- Generalist / agency / contractor salary-dividend optimisers. Beat by being the ONLY one that switches Employment Allowance off for solo directors, handles the low-profit case, and flags the EMI/BADR exit interaction. If this wedge cannot be made load-bearing at draft, cede to generalist (DEDUP_AUDIT #33 is DROP-adjacent).

## Calculator inputs (exact fields)

1. **Target extraction (£)** — how much the founder wants to take out in total for the year. Numeric, ≥ 0.
2. **Company profit before extraction (£)** — used for the CT interaction and the low-profit case. Numeric, ≥ 0.
3. **Sole director/employee?** — toggle: yes/no. Drives the Employment Allowance eligibility (HP23). This is the wedge input.
4. **Other personal income (£)** — optional, to place dividends correctly in the bands. Default 0. Numeric, ≥ 0.
5. **Jurisdiction for income tax** — select: "Rest of UK" or "Scotland" (flag only; see danger zones re Scottish bands not being in the HP set). Drives the Scottish-divergence flag on the salary line ONLY.

## Calculation logic / formula (figure-by-figure, HP-anchored)

Let `T` = target extraction (input 1), `P` = company profit before extraction (input 2), `solo` = sole-director toggle (input 3).

The tool models the standard founder pattern: a salary set at a level that preserves the NIC record and is CT-deductible, then dividends for the balance, and compares total tax vs an all-salary route.

**A. Salary leg.**
- Recommend a salary at least at the level that preserves the NIC qualifying-year record (a salary at or above the Lower Earnings Limit; the LEL figure is NOT in the HP set, so the tool must reference "a salary that preserves your National Insurance record" and NOT hard-code an LEL/secondary-threshold salary figure - see danger zones). HP23 context.
- Salary is CT-deductible: it reduces company profit, saving CT at the marginal CT rate (HP21).
- Employer NIC on salary above the £5,000 secondary threshold at 15% (HP23):
  - IF `solo` = yes → Employment Allowance is NOT available (HP23 solo-director exclusion); employer NIC on `max(0, salary − 5000) × 15%` is a real cost.
  - IF `solo` = no → Employment Allowance up to £10,500 (HP23) may cover the employer NIC; model EA offsetting employer NIC up to £10,500.
- Golden figure (EA trap): sole director on a salary of £12,000, employer NIC = `(12,000 − 5,000) × 15%` = `7,000 × 15%` = £1,050, and with `solo=yes` NONE of it is covered by EA, so £1,050 is a real cost. With `solo=no`, that £1,050 is covered by the £10,500 EA (net £0). This delta is the wedge display.

**B. Dividend leg.**
- Dividends are paid from post-CT profit. Available dividend pool = `(P − salary − employerNIC) × (1 − ctRate)` where ctRate is the marginal CT rate on the company's profit (HP21).
- Dividend tax on the dividend taken, after the £500 dividend allowance (HP22): first £500 tax-free, then 10.75% (ordinary), 35.75% (upper), 39.35% (additional) by band (HP22).
- Golden figure: a founder with £50,000 of dividends, £500 allowance, remainder in the ordinary band → tax = `(50,000 − 500) × 10.75%` = `49,500 × 10.75%` = £5,321.25 (illustration; real band placement depends on salary + other income placing the dividend across ordinary/upper).

**C. All-salary comparison route.**
- Model extracting the full `T` as salary: income tax at the founder's marginal rate (bands not in HP set as percentages - the tool needs the standard UK income tax bands; FLAG that the income tax band percentages/thresholds for salary are NOT in the HP set and must be sourced/added as an HP before build; see danger zones), plus employee NIC (also not in HP set - flag), plus employer NIC at 15% above £5,000 (HP23), minus the CT saving from the salary being deductible (HP21).
- Present total tax (personal + company) for the salary-only route vs the salary+dividend route.

**D. CT interaction.**
- CT on retained/extracted profit at 19% ≤£50k, 25% ≥£250k, marginal relief between (HP21). Salary and employer NIC are deductible (reduce CT); dividends are NOT deductible (paid from post-CT profit). This asymmetry is the core of the split maths and must be shown.
- Golden figure: profit £50,000, small-profits rate 19% (HP21) → CT £9,500 before any salary deduction; a £12,000 salary + £1,050 employer NIC reduces taxable profit to £36,950, CT = £36,950 × 19% = £7,020.50.

**E. Low-profit / pre-revenue case.**
- IF `P` is low (heuristic: `P < salary + employerNIC`, i.e. profit cannot fund the target extraction) → the tool shows that dividends are limited to distributable post-CT profit, that over-extraction is not lawful, and that banking trading losses (HP25) may matter more than the split. Do NOT compute a dividend the company cannot fund. This is a wedge case the generic optimisers ignore.

## Outputs

1. **Recommended salary / dividend split** for the target extraction.
2. **Total tax both routes**: salary+dividend vs all-salary (personal tax + employee NIC flag + employer NIC + CT effect).
3. **The Employment Allowance line**: explicitly shows whether EA applies (and the £1,050-type extra cost when it does not, for solo directors). HP23. THE WEDGE.
4. **Low-profit warning** where profit cannot fund the extraction (HP25).
5. **Scottish flag** on the salary line where Scotland is selected (flag only).
6. **EMI/BADR exit note**: a contextual link, not a calculation.

## Result-CTA framing

After the number: "This is a general illustration for 2026/27 based on the figures you entered, not personal tax advice. Your optimal split depends on your other income, your company's profit, whether you are the sole director, and your longer-term exit plans. Speak to us to set it up correctly." CTA → /services/core-compliance (and /services/fractional-cfo for scaling founders). DIY route: founder-tax guides.

## Landing-page copy H2 skeleton (AROUND the tool)

Each money/methodology H2 opens with a citable 40-60 word BLUF answer.
1. Calculator embed block (tool leads the page): /embed/founder-dividend-vs-salary-calculator
2. What this calculator works out (optimal 2026/27 split, total tax both routes, BLUF)
3. The inputs explained (target extraction, company profit, sole-director toggle, other income, jurisdiction)
4. Salary vs dividends: why the split matters for a founder (BLUF; CT-deductible salary vs post-CT dividends). HP21, HP22.
5. The Employment Allowance solo-director trap (BLUF; the wedge, single-director companies cannot claim the £10,500 EA). HP23.
6. Worked example: a founder extracting from £50k profit, sole director (no EA, £1,050 employer NIC) vs a company with a second employee (EA covers it). HP21, HP22, HP23.
7. The low-profit / pre-revenue case: sometimes the answer is salary only, and bank the losses. HP25.
8. EMI and BADR: do not over-optimise now at the cost of a cheaper exit later. HP18.
9. Scotland: founder salary is taxed at Scottish income tax rates (flag). HP20/25 boundary.
10. How the maths works (methodology + gov.uk citations, figure-by-figure)
11. What this calculator does NOT cover (student loans, pension contributions, benefits in kind, exact NIC/income-tax band figures beyond the HP set)
12. When to get help (capture edge → core-compliance / fractional-cfo)
13. FAQ

FAQ candidates (questions only): What is the best salary/dividend split for a founder in 2026/27? Can a single-director company claim the Employment Allowance? How much is the dividend allowance for 2026/27? What are the 2026/27 dividend tax rates? Is salary or dividend more tax-efficient for a founder? What if my company has no profit yet? Do Scottish founders pay a different rate on salary? How do EMI options affect my extraction plan?

Table/chart opportunities: salary+dividend vs all-salary total-tax comparison; the "sole director vs second employee" EA-trap table showing the £1,050-type delta; each rate cell linking its gov.uk source per the HP consistency rule.

Calculator embed: /embed/founder-dividend-vs-salary-calculator

Internal links (launch core): /services/core-compliance · /services/fractional-cfo · /for/pre-seed-founders · /for/funded-startups · /calculators/emi-vs-unapproved-calculator

## House positions touched

- HP18 (context): BADR 18% from 6 Apr 2026, £1m lifetime; EMI/BADR exit interaction note. https://www.gov.uk/business-asset-disposal-relief
- HP20 (boundary): Scottish income tax divergence flagged on founder-salary content only, never on CGT/CT. https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg52521
- HP21: CT 19% ≤£50k, 25% ≥£250k, marginal relief between; limits ÷ associated companies. Salary/employer-NIC deductible, dividends not. https://www.gov.uk/corporation-tax-rates · https://www.gov.uk/guidance/corporation-tax-marginal-relief
- HP22: dividend rates 2026/27 = 10.75% / 35.75% / 39.35%, £500 dividend allowance. https://www.gov.uk/tax-on-dividends
- HP23: employer NIC 15% above £5,000 secondary threshold; Employment Allowance up to £10,500 but SOLO-director company excluded (THE WEDGE); salary at/above LEL preserves the NIC record. https://www.gov.uk/national-insurance-rates-letters · https://www.gov.uk/claim-employment-allowance
- HP25 (context): trading losses carry forward, file to bank them (low-profit case). https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss

## Hallucination danger zones

- STANDARD UK INCOME TAX bands and rates for salary (personal allowance, basic/higher/additional thresholds and percentages) are NOT in the HP set. Do NOT invent them. FLAG that an income-tax-bands HP must be added before the all-salary comparison and dividend-band placement can be computed exactly. Until then, copy states the mechanism and the dividend/CT figures that ARE anchored (HP21/22/23), and the all-salary column is either gated on the new HP or clearly labelled illustrative.
- EMPLOYEE NIC (primary) rates/thresholds are NOT in the HP set. Do NOT invent a primary NIC percentage; flag "plus employee National Insurance" without a figure.
- The Lower Earnings Limit / the specific NIC-record salary figure is NOT in the HP set. Do NOT hard-code a "£12,570 salary" or "£6,500 salary" figure as the recommended salary; reference "a salary that preserves your NIC record" and flag the specific figure for a Stage-2 HP.
- SCOTTISH income tax band percentages are NOT in the HP set and are explicitly not to be stated (house intro + charity-brief precedent). Flag Scotland, route to "speak to us"; do NOT state Scottish rate bands. And flag Scotland on the SALARY line ONLY, never on CT or CGT (HP20 boundary).
- Employment Allowance solo-director EXCLUSION is the load-bearing wedge (HP23). Do NOT default EA "on" for a sole director; the toggle must switch it OFF and show the resulting employer-NIC cost. Golden figure: sole director, £12,000 salary → £1,050 employer NIC uncovered.
- Dividend rates are 2026/27 FA 2026: 10.75% / 35.75% / 39.35%, £500 allowance (HP22). Do NOT use pre-2026/27 dividend rates (8.75/33.75/39.35) or a £1,000/£2,000 allowance. Vitest: £50,000 dividends, £500 allowance, ordinary band → £49,500 × 10.75% = £5,321.25.
- Employer NIC = 15% above £5,000 (HP23), NOT 13.8%/£9,100 (stale). CT = 19%/25% + marginal relief (HP21).
- Dividends are paid from POST-CT profit and are NOT CT-deductible; salary and employer NIC ARE deductible. Do NOT model dividends as reducing CT. This asymmetry must be correct in the engine.
- Do NOT compute a dividend the company cannot lawfully fund (low-profit case, E); cap at distributable post-CT profit and warn.
- No pricing; no client counts; frame as general illustration, not personal advice.

## Stage 2 TODO

- ADD an income-tax-bands HP (personal allowance + basic/higher/additional thresholds and rates, 2026/27) so the all-salary comparison and dividend band placement can be computed exactly and vitested; until added, the salary-side income tax is illustrative/gated.
- ADD an HP for the NIC-record salary figure (LEL / secondary threshold salary) if the tool is to recommend a specific salary number rather than "a salary that preserves your NIC record".
- Decide employee-NIC handling (flag-only vs new HP); recommend flag-only at launch.
- Volume-check the founder-scoped long-tail; confirm we are NOT competing for the generic "salary dividend calculator" head (dedup #33 integrity) at draft QA, or cede to generalist.
- Confirm the golden-figure vitest cases: EA-trap £1,050 solo-director employer NIC; £50k dividends → £5,321.25; £50k profit CT £9,500 pre-salary / £7,020.50 post-£12k-salary.
- Confirm answer-box copy blocks are 40-60 words and the not-advice disclaimer is present.
