# FACTUAL QA — Phase B tools batch (adversarial, REFUTE)

Reviewer stance: every number guilty until re-derived from the compute function in the
file itself. No file edited. Re-derivation script run in the session scratchpad
(`qa.js`, deleted after use); golden suite run as an independent check.

Sources used: `docs/property/house_positions.md` §4, §7, §24, §34, §41;
`briefs/property/tools/DOSSIER.md` §7; `briefs/property/tools/_language_spec.md` rules 2,
3, 7, 8; `Property/web/src/lib/calculators/registry.ts`; `packages/web-shared/tools/format.ts`
(`gbp` = `Math.round` + en-GB, `pct` = `toFixed(1)`);
`packages/web-shared/tools/types.ts`; `packages/web-shared/tools/components/Field.tsx`.

## Verdicts

- VERDICT Property/web/src/lib/calculators/tools/buy-to-let-mortgage-calculator.ts: must_fix
- VERDICT Property/web/src/lib/calculators/tools/rental-yield-calculator.ts: all_clear
- VERDICT Property/web/src/lib/calculators/tools/rental-income-tax-calculator.ts: all_clear
- VERDICT Property/web/src/lib/calculators/tools/buy-to-let-cashflow-calculator.ts: all_clear
- VERDICT Property/web/content/blog/rental-income-tax-calculator.md: all_clear

## Findings

[BLOCKER] buy-to-let-mortgage-calculator.ts: "Over 25 years interest-only costs £196,875 and repayment costs £269,661, of which £119,662 is interest" - re-derived from `compute`: factor = 0.005992477, repayment = £898.8715728, x300 = 269,661.4718, less the £150,000 loan = 119,661.47, and `gbp()` renders that as £119,661, not £119,662; the file's own derivation comment above the example says "(interest 119,661.47)", so the prose contradicts its own working and the row the tool prints - drop-in fix: `"Over 25 years interest-only costs £196,875 and repayment costs £269,661, of which £119,661 is interest"`.

[BLOCKER] buy-to-let-mortgage-calculator.ts: "Then run it a full point above today's, because that is roughly what you face when the fix ends." - a forward mortgage-rate claim asserted as fact, with no source, no data-through date and no check-it-yourself qualifier; DOSSIER §7 ("Mortgage-rate assumptions are NOT house positions: every rate input is a USER KNOB with a stated default and source note, never a hardcoded claim") and language-spec rule 8 both bite, and unlike the 4.5-6% band this sentence carries no hedge at all - drop-in fix: `"Then run it a point or two above the rate you have been offered and see whether the deal still works, because nobody can tell you where rates sit on the day your fix ends."`

[ADVISORY] buy-to-let-mortgage-calculator.ts: "Typical buy-to-let fixed rates through mid-2026 sit somewhere around 4.5% to 6%" (deposit-field help text and again in `note`) - it satisfies the editable-assumption test (both instances are paired with "check current deals and enter the rate you have actually been offered", and the 5.25% default sits inside the band), but it is an unsourced market percentage, which language-spec rule 8 forbids ("Every headline percentage or average carries a named source and a data-through date in the same sentence"); it also date-stamps the page and will go stale - drop-in fix (either): name the source in-sentence, e.g. `"Typical buy-to-let fixed rates sit somewhere around 4.5% to 6% (source: Moneyfacts BTL fixed averages, data to July 2026)"`, or drop the numbers: `"This one is a knob, not a quote. Rates move with the fix length, the LTV and the fee, so check current deals and enter the rate you have actually been offered."`

[ADVISORY] buy-to-let-mortgage-calculator.ts: "Rental cover = £1,250 / £656.25 = 190%" (worked example 2) and "which is 152% cover" (explainer) - the tool's rows print 190.5% and 152.4% (`pct` is 1dp); the prose roundings are arithmetically honest but a reader comparing prose to row sees two different numbers - drop-in fix: use `190.5%` and `152.4%` in both places.

[ADVISORY] buy-to-let-mortgage-calculator.ts: `embedHeight: 780` - 5 fields plus 13 result rows at the defaults (rent > 0 adds the three cover rows). The nearest precedent in the fleet, `lease-extension-premium-calculator` at 6 fields / 10 rows, is 860. Impact is cosmetic only (the type comment records that the iframe auto-resizes after load) - drop-in fix: `embedHeight: 900`.

[ADVISORY] rental-yield-calculator.ts: `advanced: true` on five fields (lettingAgentPct, maintenancePct, insurance, serviceCharge, mortgageInterest) - the shared renderer ignores the flag: `advanced` is read only by `PremiumCalculator.tsx` (lines 553-555); `packages/web-shared/tools/components/Field.tsx` and `Calculator.tsx` never reference it, so all seven fields render inline and the page has no "Advanced options" collapse - drop-in fix: none needed for correctness (bridging/commercial carry the same dead flag); if the copy assumes a collapse, remove the assumption rather than the flags.

[ADVISORY] rental-yield-calculator.ts: `embedHeight: 760` - 7 fields plus 8 rows at the defaults, up to 12 rows once service charge and mortgage interest are entered. Same auto-resize caveat as above - drop-in fix: `embedHeight: 860`.

[ADVISORY] rental-income-tax-calculator.ts: "Section 24 swapped that for a flat credit worth 20% of the interest, whatever rate you pay." - house_positions §4 caps the credit at the LOWER of 20% of finance costs, 20% of rental profit before finance costs, and 20% of income above the personal allowance, with the un-credited part carried forward; "flat" overstates it where interest approaches or exceeds profit. No figure quoted anywhere in this batch breaches the cap (defaults 6,000 vs 15,000; wex1 4,200 vs 9,600; wex2 14,000 vs 20,000; cashflow cross-example 8,640 vs 13,440), and `compute` is out of scope this round, so this is copy-only - drop-in fix: append to `note`: `"The credit cannot exceed 20% of your rental profit, so a very large mortgage can leave part of it unused and carried forward."`

[ADVISORY] rental-income-tax-calculator.ts: "(rising to 22% from 2027/28)" - correct and correctly forward-dated per §4/§7, but it is the only thing in the copy that moves in 2027/28: the band select still offers "Higher rate (40%)" and the property rates themselves become 22/42/47 for England, Wales and NI in that same year, so a 2027/28 reader is half-warned - drop-in fix: `"...(rising to 22% from 2027/28, when the property rates themselves change too, so this tool answers 2026/27)."`

[ADVISORY] rental-income-tax-calculator.ts: "Rent from a property you own jointly with a husband, wife or civil partner is split 50/50 for tax by default, however the deeds read." - §24.1 limits the ITA 2007 s.836 presumption to joint LEGAL title plus joint beneficial ownership (sole-legal-title cases fall outside it entirely), and §24.2 records that joint tenants cannot use Form 17 at all without first severing to tenants in common. The 60-day window, the deed-then-Form-17 order and the no-retrospection point are all correct - drop-in fix: after "within 60 days" add `"If you hold as joint tenants you have to sever to tenants in common before Form 17 is available at all."`

[ADVISORY] buy-to-let-cashflow-calculator.ts: "£4,200 divided by £80,000 is 5.25%" (explainer) and "£4,200 divided by £80,000, or 5.25%" (FAQ 1) - arithmetically right, but the ROI row is `((annual / invested) * 100).toFixed(1)`, so a reader who enters 80,000 sees 5.3% on the same page - drop-in fix: `"5.3%"` in both places (or "about 5.3%").

[ADVISORY] buy-to-let-cashflow-calculator.ts: "For an interest-only mortgage, the full payment; for repayment, the interest portion is what affects tax." (monthlyMortgage help) - reads as an instruction to enter the interest portion for a repayment mortgage, which contradicts the new FAQ 3 ("Use whatever actually leaves your account, because that is what cashflow means") and would under-state the cash cost - drop-in fix: `"Whatever actually leaves your account. On a repayment mortgage only the interest half matters for tax, and the tax calculator handles that."`

[ADVISORY] buy-to-let-cashflow-calculator.ts: "Monthly cashflow = £950 - £700 - £300 = minus £50" - `gbp(-50)` renders "£-50" and `gbp(-600)` renders "£-600", so the headline and the annual row do not read as the example describes them - drop-in fix: prose is the cheaper side; leave it, or say `"minus £50 (the calculator shows £-50)"`. A real fix belongs in the shared `gbp` helper and is out of scope here.

[ADVISORY] buy-to-let-cashflow-calculator.ts: "A higher-rate landlord clearing £4,800 a year in cash can hand £3,648 of it straight back." - true only for the specific split in worked example 2 (rent 17,400 / costs 3,960 / interest 8,640); another landlord with the same £4,800 of cash but more interest and less profit pays less - drop-in fix: `"...can hand £3,648 of it straight back on the figures in the second example below."`

[ADVISORY] buy-to-let-cashflow-calculator.ts: `embedHeight: 560` unchanged after the batch added a fifth field and a fifth row - drop-in fix: `embedHeight: 660`.

[ADVISORY] content/blog/rental-income-tax-calculator.md: the differentiation edits are clean, but the body still opens "The phrase **rental income tax calculator** hides the part landlords actually get wrong", and the slug/canonical keep the calculator term, so the head-term handoff to the tool is only partial. Cannot be fixed without moving the canonical, so this is a note, not a fix - no change recommended this round.

## Cross-tool chain (specifically re-derived, per instruction)

The cashflow tool's second worked example applies `rental-income-tax-calculator.ts`'s
compute at the higher rate. That compute is `rate = RATES[band]` (flat 0.4), `profit =
max(0, income - expenses)`, `taxBeforeCredit = profit * rate`, `s24Credit = interest *
0.2`, `tax = max(0, taxBeforeCredit - s24Credit)`. It applies **no personal allowance, no
band split and no property-allowance logic**, so the worked example's flat 40% is exactly
what the tool does. Re-derived: 17,400 - 3,960 = 13,440 profit; 13,440 x 0.4 = 5,376;
8,640 x 0.2 = 1,728 credit; 5,376 - 1,728 = 3,648 tax; 13,440 - 8,640 - 3,648 = 1,152
take-home, which ties to 4,800 - 3,648. Every step matches the file. **NOT a blocker.**
Confirmed independently that `compute` in the rental-income tool is byte-unchanged this
batch (`git diff` touches copy fields and `note` only).

## ARITHMETIC

- ARITHMETIC buy-to-let-mortgage-calculator.ts: 34 quoted figures re-derived, 33 agree, 1 disagrees (£119,662 -> £119,661). Defaults verified against the annuity formula computed from scratch: loan 187,500, LTV 75.0%, deposit share 25.0%, interest-only 820.3125 -> £820, repayment 1,123.5895 -> £1,124, extra £303, IO total 246,093.75 -> £246,094, repayment total 337,076.84 -> £337,077, repayment interest 149,576.84 -> £149,577, cover 152.38% -> 152.4%, 125% rent £1,025, 145% rent £1,189. Second example (deposit 100,000): loan 150,000, LTV 60.0%, IO £656, repayment £899, IO total £196,875, repayment total £269,661, interest saved £164.06 -> £164, cover 190.48%. FAQ stress figures 1,250/1.25 = £1,000 and 1,250/1.45 = £862.07 both correct.
- ARITHMETIC rental-yield-calculator.ts: 24 quoted figures re-derived, all agree. Defaults: 15,000 rent, 1,500 agent, 1,500 maintenance, 3,300 costs, 11,700 net, gross 6.0%, net 4.68% -> 4.7%, payback 21.37 -> 21.4 ("a little over 21 years"), warn flag correctly OFF (3,300 / 15,000 = 22% < 50%). "Fell by more than a fifth" = 22.0%. Fortnight void = 14/365 = 3.84% ("about 4%"). wex1: 10,200 / 180,000 = 5.667% -> 5.7%. wex2: 19,200 rent, 1,920 + 1,920 + 350 + 1,400 = 5,590 costs, 13,610 net, gross 6.0%, net 4.253% -> 4.3%, payback 23.51 -> 23.5, warn OFF at 29.1%.
- ARITHMETIC rental-income-tax-calculator.ts: 21 quoted figures re-derived, all agree. Defaults: 15,000 profit, 6,000 tax before credit, 1,200 credit, 4,800 tax, 4,200 take-home. wex1 (basic): 9,600 / 1,920 / 840 / 1,080 / 4,320, and the "credit is neutral at basic rate" cross-check holds ((9,600 - 4,200) x 0.2 = 1,080). wex2 (higher): 20,000 / 8,000 / 2,800 / 5,200 / 800, cash before tax 6,000, 5,200/6,000 = 86.7% ("roughly 87%"), cost of the credit rule 2,800 = 20% of 14,000.
- ARITHMETIC buy-to-let-cashflow-calculator.ts: 17 quoted figures re-derived, all agree except the 1dp rounding flagged above. Defaults 1,200 - 600 - 250 = 350/month, 4,200/year; 130,000 at 5.5% / 12 = 595.83 ("about £600"); 1% of 130,000 = 1,300 = 31.0% of 4,200 ("a third"); 4,200 / 80,000 = 5.25% (tool prints 5.3%). wex1: -50/month, -600/year, tone warn; 150,000 at 5.6% / 12 = 700.00 exactly ("roughly 5.6%"); 1% = 1,500, 600 -> 2,100. wex2: 400/month, 4,800/year, 4,800 / 75,000 = 6.4%, after-tax 1,152 / 75,000 = 1.5%.
- ARITHMETIC independent check: `npx vitest run src/tests/calculator-goldens.test.ts` -> 158 tests, all pass (the test file is itself modified in this batch, so it corroborates rather than proves; the figures above were derived from the formulas, not from the goldens).

## STATUTE COUNTS (prose = intro + explainer + faqs + note; row labels and related-link labels excluded)

- STATUTE buy-to-let-mortgage-calculator.ts: 1 (explainer para 4, "It earns a basic-rate credit instead under Section 24"). Cap = 1. PASS.
- STATUTE rental-yield-calculator.ts: 0. Cap = 0. PASS. (The only "Section 24" string is a `related[]` link label, excluded.)
- STATUTE rental-income-tax-calculator.ts: 1 (explainer para 2, "Section 24 swapped that for a flat credit"). Cap = 1. PASS. The "Section 24 credit (20% of interest)" string is a result-row label, excluded; "HMRC" and "Form 17" in the spouse FAQ are a body and a form name, not statute references. Note: the `note`'s "2027/28" is a tax-year label, which language-spec rule 7 discourages, but the QA brief mandates that forward-date, so it is recorded as a deliberate call and not counted.
- STATUTE buy-to-let-cashflow-calculator.ts: 0. Cap = 0. PASS. The batch removed the old note's "Because of Section 24..." and the two explainer mentions; only the `related[]` label survives.

## LINKS

Every `related[]` href checked against `registry.ts` (BESPOKE + GENERIC slugs) and
`src/app/calculators/`:

- buy-to-let-rental-stress-test-calculator, buy-to-let-cashflow-calculator,
  rental-yield-calculator, rental-income-tax-calculator, buy-to-let-mortgage-calculator,
  property-allowance-checker - all in `GENERIC`, served by `/calculators/[slug]`
  (`dynamicParams = false`, `generateStaticParams` from `genericTools()`). RESOLVE.
- section-24-calculator, stamp-duty-calculator - `BESPOKE`, and both have their own
  `src/app/calculators/<slug>/page.tsx`. RESOLVE.
- /blog/portfolio-management/property-investment-benchmarks-uk-2026-good-yield -
  `content/blog/property-investment-benchmarks-uk-2026-good-yield.md` exists, category
  "Portfolio Management", and its own canonical is that exact path. RESOLVES.
- Blog edit's new /calculators/rental-income-tax-calculator - RESOLVES (registry GENERIC).

Total 22 `related[]` hrefs + 1 blog href checked, 0 broken.

## OTHER CHECKS RUN

- Meta lengths against the estate's 60/155 CI limits: mortgage 58/148, yield 49/148,
  rental-income 49/154, cashflow 52/150; blog title 50, metaTitle 50, h1 55. All PASS
  (rental-income's description at 154 has one character of headroom).
- Prose word floor (language-spec rule 2, 450 words): mortgage ~1,025, yield ~1,018,
  rental-income ~848, cashflow ~707. All PASS.
- Rule 3 (one line of literal arithmetic on the page's own defaults, in the explainer):
  present in all four. PASS.
- Em-dashes in user-facing copy: none in the four tools; none in the blog diff. The "−"
  in row values is U+2212 (minus), which is correct.
- Blog diff scope: exactly the three frontmatter fields (title, metaTitle, h1) and one
  added sentence carrying one tool link. No other body change. PASS.
- Divide-by-zero / degenerate inputs: cashflow ROI row guarded by `invested > 0`; yield
  payback guarded by `netIncome > 0` and `yieldOn` guarded by `value > 0`; mortgage cover
  guarded by `interestOnly > 0` and `repaymentMonthly` guards `n <= 0`, `loan <= 0` and
  `mr === 0`; deposit above price clamps the loan to 0. No NaN or Infinity path found.

## CALLS RECORDED

1. Graded the "£119,662" one-pound rounding error a BLOCKER rather than an advisory
   because it disagrees with the row the tool prints AND with the file's own derivation
   comment, so it fails the batch's stated standard (worked examples reproduce compute).
2. Graded the 4.5-6% rate band an ADVISORY, not a BLOCKER: both instances carry the
   check-it-yourself note DOSSIER §7 demands, so it does not breach the rate-knob rule;
   it breaches only the weaker source-and-date rule (language spec 8).
3. Graded "a full point above today's ... is roughly what you face when the fix ends" a
   BLOCKER: it is the one rate statement in the batch with no hedge, no source and no
   editable-assumption framing.
4. Did not count "HMRC" or "Form 17" toward the statute cap; the cap is stated as a
   statute cap and the language spec's own measurement column is "Statute cites/1k".
5. Did not treat the rental-income tool's missing credit cap or its flat-band model as
   blockers: the brief fixes compute as untouched this round, and no quoted example in
   the batch crosses either simplification.
6. Ran the golden suite as corroboration only; it is modified in the same batch, so it
   cannot independently validate the figures. All arithmetic above was derived from the
   formulas in the files.
