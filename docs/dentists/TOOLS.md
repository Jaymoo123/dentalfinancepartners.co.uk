# Dentists site — tools platform documentation

**Adopted:** 2026-06-11 (Phase D, branch `adopt-dentists`)
**Route root:** `/calculators/[slug]`
**Embed root:** `/embed/[slug]`
**Gallery:** `/calculators` (registry-driven via `allTools()`)
**Registry:** `Dentists/web/src/lib/tools/registry.ts`

---

## Architecture

All 5 dental calculators follow the GenericTool pattern from `@accounting-network/web-shared`:

```
compute lib (pure TS, no React)
    ↓
GenericTool config (fields + compute + explainer + faqs)
    ↓
registry (makeRegistryHelpers → allTools / getGenericTool)
    ↓
CalculatorClient ("use client" RSC boundary)
    ↓
/calculators/[slug]/page.tsx  (SSG via generateStaticParams)
/embed/[slug]/page.tsx        (noindex, iframe-ready)
```

The RSC boundary is the site-local `CalculatorClient.tsx` wrapper. Server pages pass the `slug` string; the client component resolves the tool config. This prevents function-bearing configs from crossing the RSC serialisation boundary.

**embed resize message type:** `dfp-embed-height` (site-scoped, not `hd-embed-height`)

---

## Tool inventory

### 1. UDA Value Calculator

**Slug:** `uda-value`
**Category:** Practice accounting
**Route:** `/calculators/uda-value`
**Embed:** `/embed/uda-value`
**Source file:** `src/lib/tools/compute/uda-value.ts`
**Config file:** `src/lib/tools/configs/uda-value.ts`

**Inputs:** Region (England / Wales / Northern Ireland), annual UDA volume, annual contract value (£), year contract last signed or restructured.

**Outputs:** Effective UDA value (£/UDA), position vs 2025/26 regional benchmark (below / within / above), real value per UDA at signing in 2026 pounds, cumulative CPI proxy since signing, years since signed.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| England benchmark range | £26 to £32 per UDA | NHS BSA dental statistics 2025/26 indicative commissioning range |
| Wales benchmark range | £30 to £37 per UDA | NHSW dental contracting guidance 2025/26 |
| Northern Ireland benchmark range | £22 to £28 per UDA | HSC Board NI dental contract 2025/26 |
| CPI proxy | 2.5% annually | Used as a conservative long-run proxy; actual UK CPI has exceeded this in some years |

**Date sensitivity:** `2026 - yearSigned` for elapsed years is hardcoded to 2026 at adoption. The effective UDA and benchmark figures will require review when 2026/27 NHS contract rates are published.

**Limitations:**
- Benchmark ranges are indicative only; actual rates vary by commissioner and individual contract.
- The 2.5% CPI proxy is deliberately conservative; real purchasing-power erosion since 2010 has been greater in several years.
- Does not model the contractual cap mechanism (clawback for underperformance against UDA target).

---

### 2. Associate Take-Home Calculator

**Slug:** `associate-take-home`
**Category:** Associate tax
**Route:** `/calculators/associate-take-home`
**Embed:** `/embed/associate-take-home`
**Source file:** `src/lib/tools/compute/associate-take-home.ts`
**Config file:** `src/lib/tools/configs/associate-take-home.ts`

**Inputs:** Gross fees generated (£/yr), associate fee split (%), lab fee deduction (% of gross), other deductible expenses (£/yr), NHS Pension contribution (£/yr).

**Outputs:** Associate share before lab, lab deduction, taxable profit, income tax, Class 4 NI, Class 2 NI, total tax and NI, estimated net take-home, effective tax rate.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Personal allowance | £12,570 | HMRC — Income Tax rates and allowances 2025/26 |
| Basic rate / higher rate threshold | 20% up to £50,270 | HMRC — Income Tax rates and allowances 2025/26 |
| Higher rate | 40% up to £125,140 | HMRC — Income Tax rates and allowances 2025/26 |
| Additional rate | 45% above £125,140 | HMRC — Income Tax rates and allowances 2025/26 |
| PA taper | Reduces by £1 for every £2 above £100,000 | HMRC — Income Tax rates and allowances 2025/26 |
| Class 4 NI — lower rate | 6% on profits £12,570 to £50,270 | HMRC — National Insurance rates 2025/26 |
| Class 4 NI — upper rate | 2% above £50,270 | HMRC — National Insurance rates 2025/26 |
| Class 2 NI | £3.45/week where profits exceed £6,725 | HMRC — National Insurance rates 2025/26 |

**Limitations:**
- Sole-trader associates only; not valid for limited company associates.
- Excludes student loan repayments (Plan 2 / Plan 5).
- Excludes Marriage Allowance, gift aid, and other personal reliefs.
- NHS Pension contribution is treated as deductible from taxable profit (the practitioner pensions arrangement); not all associate arrangements qualify.

---

### 3. Practice Valuation Calculator

**Slug:** `practice-valuation`
**Category:** Practice accounting
**Route:** `/calculators/practice-valuation`
**Embed:** `/embed/practice-valuation`
**Source file:** `src/lib/tools/compute/practice-valuation.ts`
**Config file:** `src/lib/tools/configs/practice-valuation.ts`

**Inputs:** Normalised EBITDA (£/yr), practice mix (NHS-heavy / mixed / private-heavy), region, buyer demand (low / normal / high), tangible asset value (£).

**Outputs:** Goodwill multiple range (low × to high ×), goodwill value range (£ to £), tangible assets (£), total indicative value range (£ to £).

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| NHS-heavy base multiple | 4.0× to 5.5× EBITDA | UK dental practice transaction data 2025/26 (indicative; varies by deal) |
| Mixed base multiple | 5.0× to 7.0× EBITDA | UK dental practice transaction data 2025/26 |
| Private-heavy base multiple | 6.5× to 9.0× EBITDA | UK dental practice transaction data 2025/26 |
| Regional adjustment | −0.25× to +0.5× | London/South East at top; Wales/NI at bottom |
| Demand adjustment | −0.5× to +0.5× | Applied to midpoint of range |

**Limitations:**
- No UK tax rates — all figures are practice valuation multiples.
- Indicative market ranges only; actual transaction values depend on buyer type (corporate vs independent), specific contract, lease vs freehold, goodwill allocation, and negotiation.
- Does not model corporate buyer premium (typically 10 to 30% above independent buyer multiples).
- Not a formal valuation for sale, tax, or litigation purposes.
- Figures reflect 2025/26 market conditions; the dental M&A market is cyclical.

---

### 4. Locum Structure Comparison

**Slug:** `locum-structure`
**Category:** Associate tax
**Route:** `/calculators/locum-structure`
**Embed:** `/embed/locum-structure`
**Source file:** `src/lib/tools/compute/locum-structure.ts`
**Config file:** `src/lib/tools/configs/locum-structure.ts`

**Inputs:** Day rate (£), days worked per year, annual deductible expenses (£).

**Outputs:** Gross income, sole-trader net and total tax, limited company net and total tax + admin, umbrella net and total deductions, winning structure highlighted.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Income tax bands | Same as Associate Take-Home above | HMRC 2026/27 |
| Class 2 / 4 NI | Same as Associate Take-Home above | HMRC 2026/27 |
| Director salary threshold | £12,570 | HMRC — National Insurance rates 2026/27 |
| Employer NI secondary threshold | £5,000 (from 6 Apr 2025) | HMRC — National Insurance rates; Budget 2024 |
| Employer NI rate | 15% (from 6 Apr 2025, was 13.8%) | HMRC — National Insurance rates; Budget 2024 |
| Corporation tax — small profits rate | 19% on profits up to £50,000 | HMRC — Corporation Tax rates 2026/27 |
| Corporation tax — main rate | 25% on profits above £250,000 | HMRC — Corporation Tax rates 2026/27 |
| CT marginal relief | Applied between £50,000 and £250,000 | Finance Act 2023 |
| Dividend allowance | £500 | HMRC — Dividend Tax 2026/27 |
| Basic-rate dividend tax | 10.75% (from 6 Apr 2026, was 8.75%) | FA 2026 s.4 |
| Higher-rate dividend tax | 35.75% (from 6 Apr 2026, was 33.75%) | FA 2026 s.4 |
| Additional-rate dividend tax | 39.35% | HMRC — Dividend Tax 2026/27 |
| Ltd admin cost (fixed) | £1,800 | Indicative accountancy + filing estimate |
| Umbrella margin | 5% of gross | Indicative; actual umbrella margins vary |

**Limitations:**
- Ltd model assumes £12,570 salary (NI threshold) plus remainder as dividend; does not model salary optimisation above threshold.
- Employment Allowance excluded (most single-director locum companies do not qualify).
- NHS Pension access restrictions by structure not modelled (sole trader can access NHS Pension; Ltd access is more restricted; umbrella typically limited to auto-enrolment).
- IR35 risk not modelled; if inside IR35 for an engagement, the Ltd comparison changes materially.

---

### 5. Principal Extraction Calculator

**Slug:** `principal-extraction`
**Category:** Practice accounting
**Route:** `/calculators/principal-extraction`
**Embed:** `/embed/principal-extraction`
**Source file:** `src/lib/tools/compute/principal-extraction.ts`
**Config file:** `src/lib/tools/configs/principal-extraction.ts`

**Inputs:** Practice profit available for extraction (£), pension contribution (£/yr), NHS Pension Scheme active member (toggle).

**Outputs:** Partnership net (after income tax and NI), partnership total tax, limited company net (after all tax and admin), limited company total tax and admin, difference (£), pension impact flag.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Income tax bands | Same as Associate Take-Home above | HMRC 2026/27 |
| Class 2 / 4 NI | Same as Associate Take-Home above | HMRC 2026/27 |
| CT and dividend rates | Same as Locum Structure above (incl. 2026/27 updates) | FA 2026 s.4 + HMRC |
| Employer NI secondary threshold | £5,000 (from 6 Apr 2025) | HMRC — Budget 2024 |
| Employer NI rate | 15% (from 6 Apr 2025, was 13.8%) | HMRC — Budget 2024 |
| Director salary | £12,570 | HMRC 2026/27 |
| Ltd admin cost (fixed) | £2,500 | Indicative; slightly higher than locum model (practice admin overhead) |

**Limitations:**
- Does NOT value the NHS Pension accrual loss for incorporated principals — this is the most material limitation. For an NHS-active principal with 10+ years of service ahead, the actuarial value of lost pension accrual on the dividend portion can outweigh the headline tax saving.
- Partnership model treats a sole principal as a sole trader for tax purposes.
- Employment Allowance excluded.
- Excludes employer NI cost when extracting above the director salary threshold via salary (dividends modelled instead).

---

## Testing

Golden tests (52 assertions) cover all 5 compute libs:

```
Dentists/web/src/lib/tools/compute/compute.test.ts
```

Run via the shared Vitest config:

```bash
npx vitest run --config packages/web-shared/vitest.config.ts Dentists/web/src/lib/tools/compute/compute.test.ts
```

All tests are pinned to the figures from the original component implementations. Any compute change that breaks a test must be reviewed before merging; silent figure corrections are not permitted (per the Phase D STOP rule).

---

## Adding a new tool

1. Create a pure compute function in `src/lib/tools/compute/<slug>.ts` — no React, no `window`, no `document`, no `fetch` (TL-03).
2. Add golden tests in `compute.test.ts`.
3. Create `src/lib/tools/configs/<slug>.ts` — `GenericTool` object with `kind: "generic"`, all required fields.
4. Import and add the tool to the `tools` array in `src/lib/tools/registry.ts`.
5. The gallery (`/calculators`), sitemap, and embed gallery (`/embed`) all derive from `allTools()` — no other files need editing.
6. Add the tool to this TOOLS.md with figures traced to sources and all limitations documented.

---

## Embed usage (for third parties)

```html
<iframe
  src="https://www.dentalfinancepartners.co.uk/embed/uda-value"
  width="100%"
  height="480"
  frameborder="0"
  id="dfp-uda-value"
></iframe>
<script>
  window.addEventListener("message", function(e) {
    if (e.data && e.data.type === "dfp-embed-height" && e.data.slug === "uda-value") {
      document.getElementById("dfp-uda-value").height = e.data.height + 32;
    }
  });
</script>
```

Replace `uda-value` with the target tool slug. The `embedHeight` value in each tool config is the initial render height; the postMessage auto-resize handles dynamic content.

Embed pages are noindex and carry open CSP (via `embedPrefix: "embed"` in `buildSecurityHeaders`). The main site CSP remains locked.
