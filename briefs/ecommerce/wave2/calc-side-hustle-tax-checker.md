---
slug: side-hustle-tax-checker
tier: calculator
route: /calculators/side-hustle-tax-checker
intent: SELLER-PROBLEM / query-play. The single largest measured cluster in the niche (side-hustle family 5,910/mo; "hmrc side hustle tax limit change" 3,600/mo, KD 8). This is a CALCULATOR/CHECKER, not the structure explainer that the trading-allowance blog owns: it answers "do I owe tax on this, and roughly how much" from three inputs (side income, costs, employment income) and applies the £1,000 trading allowance and the employment-income interaction. Top gap estate-wide.
new_tool: true
---
# Side-hustle tax calculator / checker: NEW CALCULATOR brief

## DEDUP EVIDENCE (asset-1 mandatory pre-brief gate — DOCUMENTED)

Page-level check run 2026-07-15 against `generalist/web` (READ-ONLY). The generalist side-hustle
surface is entirely STRUCTURE-EXPLAINER prose, never an interactive side-hustle tax tool:

- Generalist blog posts touching side hustle: `limited-company-vs-sole-trader-side-hustle.md`
  ("Should I Set Up a Limited Company or Stay a Sole Trader for My Side Hustle?" — a
  structure-choice explainer), `register-as-self-employed-uk-while-keeping-full-time-job.md`
  and its how-to variant (registration mechanics), `taxable-income-calculator.md` (an
  explainer ABOUT using a generic taxable-income calculator, not a side-hustle tool).
- Generalist interactive tools (`generalist/web/src/lib/tools/configs/`): `take-home-pay-calculator`,
  `salary-dividend-optimiser`, `vat-scheme-comparator`, `employer-ni-calculator`, `badr-cgt-calculator`,
  `pension-contribution-optimiser`, `rd-tax-credit-estimator`. **NONE is a side-hustle checker; none
  models the £1,000 trading allowance or the "second income on top of a salaried job" interaction.**
- This ecommerce site's existing tools: `seller-take-home` (annual sole-trader margin, no employment
  income, no trading allowance), `vat-threshold-tracker`, `sole-trader-vs-ltd-sellers`. **None answers
  the pre-trading "do I owe anything at all" question.**

VERDICT: CLEAN. As predicted (it is a CALCULATOR, not a structure explainer), there is no page-level
collision. The DEDUP_AUDIT adjacency rule still binds: generic incorporation / generic ST-vs-Ltd /
generic take-home optimisation STAY generalist and are linked OUT, never rebuilt here. This tool's
wedge is the side-hustle-specific join the generic take-home calculator has no concept of: trading
allowance + employment-income stacking + a plain "are you even trading (badges of trade) or just
decluttering" gate.

## The wedge

Two things no generic income calculator does, and that the searcher for "hmrc side hustle tax limit
change" actually needs:
1. The **£1,000 trading allowance** applied first (income £1,000 or less: usually no return; above it,
   allowance-instead-of-expenses OR actual expenses, not both — HP 14).
2. The **employment-income interaction**: a side hustle stacks ON TOP of a salaried job, so the very
   first pound of taxable side profit is often taxed at the searcher's marginal rate (20% or 40%),
   NOT tax-free, because the personal allowance is already used by the day job. This is the single
   biggest misconception the "side hustle tax limit" headlines create and the reason the tool exists.

The tool also carries a qualitative **"is this trading?" gate** (badges of trade, HP 15) so a pure
declutterer is told they likely owe nothing before any number is computed. It never reduces trading
to a sales count or a pound figure.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Primary:** "hmrc side hustle tax limit change" 3,600/mo, KD 8 (largest measured cluster).
- **Family:** side-hustle cluster 79 terms summing 5,910/mo — "side hustle tax", "side hustle tax
  free amount", "how much can you earn from a side hustle before paying tax", "do I have to pay tax
  on my side hustle".
- **Trading-allowance intent:** "trading allowance", "£1000 trading allowance", "£1000 side hustle
  tax free" (the £1,000 figure is the literal answer to the "limit" panic).
- The companion blog `/blog/trading-allowance-online-sellers` (wave 1) owns the DIY-informational
  explainer for the same family; this tool is the interactive answer and they cross-link. Do not
  duplicate the blog's badges-of-trade prose in the landing copy; summarise and link.

## Search-intent class + play

SELLER-PROBLEM (assist + capture), with a heavy MISCONCEPTION-CORRECTION load. The searcher believes
a new tax-free "limit" was introduced in 2024. It was not: the 2024 change was platform REPORTING
(HP 12/13), and the actual tax-free figure is the long-standing £1,000 trading allowance. The tool
opens by correcting this (BLUF), gates on "are you trading", then computes an estimate. Capture edge:
a user who finds they owe tax and are trading → Self Assessment pointer (5 Oct deadline, HP 21) and
the `hmrc-letter-online-sales` service if a platform-reporting letter prompted the search.

## Asset type + build

NEW interactive calculator (`GenericTool`), same architecture as the three existing ecommerce tools
(`ecommerce/web/src/lib/calculators/tools/*.ts` + `.test.ts`, registered in `registry.ts`). Landing
copy is the `intro` / `explainer` / `faqs` fields on the tool config plus a `/calculators/<slug>`
page, mirroring `seller-take-home`. Build engine + golden vitest FIRST, then landing copy that matches
the engine exactly. Reuse `gbp` formatter and `GenericTool` type from `@accounting-network/web-shared`.

## URL slug + category

- Route: `/calculators/side-hustle-tax-checker`
- Tool `slug`: `side-hustle-tax-checker` (add to `registry.ts` GENERIC array; keep helpers unchanged).
- Tool `category`: `"Making Tax Digital and Self Assessment"` (existing valid category string; the
  companion blog uses the same, so the category cross-links naturally). slugifyCategory-safe →
  `making-tax-digital-and-self-assessment`.

## H1

"Side Hustle Tax Calculator: Do You Owe Tax on Your Second Income?"

## Full outline (landing copy AROUND the tool)

1. Calculator embed block (tool leads the page): `/embed/side-hustle-tax-checker`.
2. **BLUF answer box (40-60 words):** "There is no new side-hustle tax-free limit. You can earn
   £1,000 of gross trading income a year under the trading allowance before you normally need to
   report it. Above that, your side-hustle profit is taxed on top of your other income, so it is not
   tax-free even if it is small." (48 words; cite gov.uk trading-allowance page.)
3. What changed in 2024, and what did not (reporting, not a tax limit; one paragraph, link
   `/blog/platform-reporting-rules` and `/blog/trading-allowance-online-sellers`).
4. Are you actually trading? (badges of trade gate, HP 15, qualitative; link the trading-allowance
   blog for the full badges treatment; NEVER a sales count).
5. The inputs explained (see input spec).
6. How the estimate is worked out (the three-stage method; every rate cited).
7. Worked examples (see below — two, because the employment interaction is the whole point).
8. What this checker does not do (does not file for you; does not cover VAT — link
   `/calculators/vat-threshold-tracker`; does not model limited-company extraction — link
   `/calculators/sole-trader-vs-ltd-sellers`; does not replace the badges-of-trade judgement).
9. If you owe tax: registering for Self Assessment by 5 October (HP 21) + capture into
   `/services/hmrc-letter-online-sales`.
10. FAQ.

## Input spec (engine inputs; landing copy must match the engine exactly)

- **Side-hustle gross income (annual)** — gross receipts from the side activity (currency).
- **Side-hustle costs (annual)** — actual allowable costs incl. COGS (currency). The engine picks the
  better of (trading allowance £1,000) vs (actual costs) automatically and shows which it used.
- **Employment / other taxed income (annual)** — the day-job salary or other income already taxed,
  used to place the side profit in the correct tax band. Default to a representative salaried figure
  (e.g. £35,000) so the "not tax-free" point lands.
- **National Insurance context toggle (optional):** show Class 4 NIC on side profits — Class 4 applies
  on self-employment profits above the lower profits limit; if the tool shows it, cite it.
- (No VAT input — out of scope; link the VAT threshold tracker. No structure toggle — sole trader
  only; link the ST-vs-Ltd tool.)

## Outputs

- A clear yes/no headline: "You likely owe tax on this" vs "This is within the £1,000 trading
  allowance — you normally have nothing to report" vs "This looks like decluttering, not trading —
  see the badges-of-trade check".
- Allowance-vs-actual-costs decision used (which route the engine chose and why).
- Taxable side profit.
- Estimated income tax on the side profit at the searcher's marginal rate (given employment income).
- Class 4 NIC on side profit (if the toggle is on).
- Total estimated tax on the side hustle + effective rate on side profit.

## Rates (EVERY figure from rates_ledger.json — ledger key named; golden vitest at build)

- `trading_allowance` = £1,000 (HP 14) — gov.uk/guidance/tax-free-allowances-on-property-and-trading-income.
- `personal_allowance` = £12,570 (2026/27) — note it is typically ALREADY consumed by employment
  income; the tool must not silently re-apply a full personal allowance to side profit.
- `income_tax_basic_rate` = 20%, `income_tax_higher_rate` = 40%, `income_tax_additional_rate` = 45%.
- `basic_rate_band_ceiling` = £37,700 (taxable-income ceiling of the basic-rate band).
- `class4_nic_main_rate` = 6%, `class4_nic_upper_rate` = 2%, `class4_lower_profits_limit` = £12,570,
  `class4_upper_profits_limit` = £50,270.
- `self_assessment_registration_deadline` = 5 October (HP 21) — for the "if you owe" section.
- Reuse the exact band constants already coded in `seller-take-home.ts` (PERSONAL_ALLOWANCE,
  BASIC_RATE, etc.) so the estate stays consistent; do not re-derive with different literals.

## Edge cases (engine must handle; golden test cases below)

1. Side income £1,000 or less → "within trading allowance, normally nothing to report" (HP 14 exact:
   "may not be required", not "no return required"; note other income can still pull into SA).
2. Side income above £1,000, actual costs < £1,000 → engine uses the £1,000 allowance (better).
3. Side income above £1,000, actual costs > £1,000 → engine uses actual costs (better); this is the
   goods-seller-with-real-COGS case the trading-allowance blog flags.
4. Employment income already at/above £50,270 → the FIRST pound of side profit is taxed at 40%
   (higher rate). The tool must show this; it is the headline misconception correction.
5. Employment income £0 and side profit below the personal allowance → £0 income tax but flag that
   registration may still be needed and Class 4 can still apply above the lower profits limit.
6. Employment income straddling the basic-rate ceiling → side profit split across 20% and 40%.
7. Negative side profit (costs > income) → £0 tax, "a loss this year" note, no fabricated relief advice.

## Golden test cases (assert in the vitest — the smallest checks that fail if the maths breaks)

- Side income £900, any costs, employment £30,000 → verdict "within trading allowance"; tax £0.
- Side income £5,000, actual costs £500, employment £30,000 → allowance route (£1,000 > £500);
  taxable side profit £4,000; income tax £800 (all at 20%, since £30,000 + £4,000 < £50,270);
  Class 4 as computed by the shared band logic.
- Side income £5,000, actual costs £2,000, employment £30,000 → actual-costs route; taxable side
  profit £3,000; income tax £600 at 20%.
- Side income £10,000, actual costs £1,000, employment £55,000 → higher-rate stacking: taxable side
  profit £9,000 all at 40% → income tax £3,600 (the "not tax-free" case).
- Side income £8,000, actual costs £1,000, employment £45,000 → straddle: £5,270 of side profit at
  20% (fills to £50,270) then remainder at 40%; assert the split explicitly.
(Recompute exact Class 4 figures from the shared engine when writing the test; do not hand-wave them.)

## House positions touched

- HP 14 (`trading_allowance` £1,000): allowance-or-actual-expenses, not both; "may not be required".
- HP 15 (badges of trade): the trading gate; qualitative, cite BIM20205 onward at build, never a count.
- HP 12/13 (platform reporting; €2,000/30-sales exclusion): referenced ONLY to correct the "limit
  change" misconception; the reporting exclusion is not a tax-free amount. Do not restate mechanics.
- HP 21 (`self_assessment_registration_deadline` 5 October): the "if you owe" pointer.
- Income tax bands / Class 4 (ledger keys above): the estimate engine.

## Internal links (real launch-core + wave-1 slugs only)

- `/blog/trading-allowance-online-sellers` (the explainer companion — bidirectional).
- `/blog/platform-reporting-rules` (the "what actually changed in 2024" correction).
- `/calculators/vat-threshold-tracker` (if the side hustle is scaling toward VAT).
- `/calculators/sole-trader-vs-ltd-sellers` (if scaling toward incorporation).
- `/services/hmrc-letter-online-sales` (capture: a platform-reporting letter arrived).
- `/for/marketplace-sellers` (the Vinted/eBay-graduate hub).
- Link OUT to generalist for generic take-home / salary-dividend optimisation and generic
  incorporation — do NOT rebuild them here (DEDUP_AUDIT adjacency rule).

## Meta

- metaTitle (≤60, no brand): "Side Hustle Tax Calculator UK: Do You Owe Tax? 2026/27"
- metaDescription (≤155): "Free UK side hustle tax calculator. See if the £1,000 trading allowance
  covers you, or how much tax your second income owes on top of your job. 2026/27 rates."

## Hallucination / danger zones

- There is NO new side-hustle tax-free limit; the £1,000 trading allowance is not new and is NOT the
  €2,000/30-sales reporting trigger (HP 13). Keep the three numbers distinct.
- Do NOT apply a fresh full personal allowance to side profit when employment income already uses it;
  this is the core correction and the golden tests guard it.
- Badges of trade: qualitative only, cite BIM at build (HP 15 open flag); never a sales count.
- "May not be required" wording (HP 14): do not upgrade to "no return is required".
- Dividend rates do not appear here (sole trader only); if a Ltd comparison is teased, link the
  ST-vs-Ltd tool, do not compute extraction.
- No em-dashes. Faceless: no named adviser, no fabricated volumes.

## Stage 2 TODO

- Build engine + `side-hustle-tax-checker.test.ts` with the golden cases above; run `npx tsc --noEmit`
  and vitest from `ecommerce/web`.
- Confirm the shared band constants imported/reused match `seller-take-home.ts`.
- Fix/verify the BIM20205 badges citation live before publishing the "are you trading" gate.
- Regenerate both worked examples from the engine so copy never diverges.
- All BLUF/answer blocks 40-60 words.
