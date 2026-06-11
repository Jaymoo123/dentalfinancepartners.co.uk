# Solicitors site — tools platform documentation

**Adopted:** 2026-06-11 (Phase D, branch `adopt-solicitors`)
**Route root:** `/calculators/[slug]`
**Embed root:** `/embed/[slug]`
**Gallery:** `/calculators` (registry-driven via `allTools()`)
**Registry:** `Solicitors/web/src/lib/tools/registry.ts`

---

## Architecture

All 6 solicitors calculators follow the GenericTool pattern from `@accounting-network/web-shared`:

```
compute lib (pure TS, no React)
    |
GenericTool config (fields + compute + explainer + faqs)
    |
registry (makeRegistryHelpers -> allTools / getGenericTool)
    |
CalculatorClient ("use client" RSC boundary)
    |
/calculators/[slug]/page.tsx  (SSG via generateStaticParams)
/embed/[slug]/page.tsx        (noindex, iframe-ready)
```

The RSC boundary is the site-local `CalculatorClient.tsx` wrapper. Server pages pass the `slug` string; the client component resolves the tool config. This prevents function-bearing configs from crossing the RSC serialisation boundary.

**embed resize message type:** `afl-embed-height` (site-scoped, FROZEN — matches storagePrefix `afl`)

---

## Tool inventory

### 1. Solicitor Take-Home Calculator

**Slug:** `solicitor-take-home`
**Category:** Tax structures
**Route:** `/calculators/solicitor-take-home`
**Embed:** `/embed/solicitor-take-home`
**Source file:** `src/lib/tools/compute/solicitor-take-home.ts`
**Config file:** `src/lib/tools/configs/solicitor-take-home.ts`

**Inputs:** Gross profit (£/yr), pension contribution (£/yr), structure (sole trader / partnership / LLP / limited company).

**Outputs:** Net take-home, total tax and NI (partnership/sole trader: income tax + Class 4 NI; limited company: salary tax, employee NI, employer NI, corporation tax, dividend tax, £2,500 admin), winning structure highlighted.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Personal allowance | £12,570 | HMRC — Income Tax rates and allowances 2025/26 |
| Basic rate / higher rate threshold | 20% up to £50,270 | HMRC — Income Tax rates and allowances 2025/26 |
| Higher rate | 40% up to £125,140 | HMRC — Income Tax rates and allowances 2025/26 |
| Additional rate | 45% above £125,140 | HMRC — Income Tax rates and allowances 2025/26 |
| PA taper | Reduces by £1 per £2 above £100,000 | HMRC 2025/26 |
| Class 4 NI lower rate | 6% on profits £12,570 to £50,270 | HMRC — National Insurance rates 2025/26 |
| Class 4 NI upper rate | 2% above £50,270 | HMRC — National Insurance rates 2025/26 |
| Employee NI basic | 8% above £12,570 | FA 2025 (from April 2025) |
| Employer NI | 15% above £9,100 | FA 2025 (from April 2025) |
| Dividend allowance | £500 | HMRC — Dividend Tax 2024/25 onwards |
| Dividend tax basic | 8.75% | HMRC — Dividend Tax 2023/24 onwards |
| Dividend tax higher | 33.75% | HMRC — Dividend Tax 2023/24 onwards |
| Dividend tax additional | 39.35% | HMRC — Dividend Tax 2023/24 onwards |
| CT small profits rate | 19% on profits up to £50,000 | FA 2023 |
| CT main rate | 25% on profits above £250,000 | FA 2023 |
| CT marginal rate | 26.5% between £50,000 and £250,000 | FA 2023 |
| Ltd director salary | £12,570 | HMRC 2025/26 (NI primary threshold) |
| Ltd admin cost | £2,500/yr | Indicative accountancy + filing estimate |

**Limitations:**
- Partnership and LLP are treated as tax-transparent (same computation as sole trader). This is accurate for income tax purposes but does not model LLP-specific provisions (e.g. FA 2014 salaried member rules — use the FA 2014 tool for that).
- Ltd model assumes minimum salary (£12,570) plus remainder as dividend; does not model salary optimisation above threshold.
- Employment Allowance excluded (most single-director LLP-to-Ltd conversions do not qualify initially).
- Excludes student loan repayments, Marriage Allowance, gift aid.
- Pension contribution is deducted from taxable profit (salary sacrifice / personal pension); not all arrangements have the same tax treatment.

---

### 2. FA 2014 Salaried Member Rules Test

**Slug:** `fa2014-salaried-member`
**Category:** LLP compliance
**Route:** `/calculators/fa2014-salaried-member`
**Embed:** `/embed/fa2014-salaried-member`
**Source file:** `src/lib/tools/compute/fa2014-salaried-member.ts`
**Config file:** `src/lib/tools/configs/fa2014-salaried-member.ts`

**Inputs:** Total reward (£/yr), fixed reward (£/yr), capital contribution (£), significant influence over LLP affairs (yes/no).

**Outputs:** Condition A result (fixed reward as % of total; threshold 80%), Condition B result (no significant influence), Condition C result (capital as % of fixed reward; threshold 25%), overall verdict (employee-for-tax / partner-for-tax), capital injection needed to fix Condition C.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Condition A threshold | 80% of total reward must be fixed / non-profit-dependent | Finance Act 2014 s.863A ITTOIA (salaried members legislation) |
| Condition B | No significant influence over LLP affairs | Finance Act 2014 s.863B ITTOIA |
| Condition C threshold | Capital contribution < 25% of disguised salary (fixed reward) | Finance Act 2014 s.863C-863G ITTOIA |

**Date sensitivity:** None. These thresholds are fixed in primary legislation (Finance Act 2014) and have not been amended.

**Limitations:**
- Directional model only. Real audits consider bonus classification, deferred compensation, capital account interest, and specific management influence facts.
- The "significant influence" question (Condition B) is a legal judgment that cannot be determined by a calculator alone.
- Interaction with PAYE settlement and grossed-up employment income calculations not modelled.

---

### 3. LLP Profit Share Allocation

**Slug:** `llp-profit-share`
**Category:** Partnership tax
**Route:** `/calculators/llp-profit-share`
**Embed:** `/embed/llp-profit-share`
**Source file:** `src/lib/tools/compute/llp-profit-share.ts`
**Config file:** `src/lib/tools/configs/llp-profit-share.ts`

**Inputs:** Total distributable profit (£), allocation method (equal / points / two-tier / fixed-share-plus-equity), number of senior and junior partners, fixed-share partner count, fixed share each (£), senior multiplier (for points method).

**Outputs:** Per-partner profit allocation (£ and %) for each method. Two-tier: senior 1.5x junior. Fixed-share-plus-equity: fixed shares ring-fenced first, remainder on points.

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Two-tier senior multiplier | 1.5x junior | Standard market convention; not statutory |
| Points method | User-configurable senior multiplier | Partnership agreement; calculator defaults to 1.5x |

**Date sensitivity:** None. Profit allocation is a partnership-agreement matter; no time-sensitive tax rates are used in this tool.

**Limitations:**
- Excludes capital interest, lock-in schedules, deferred compensation, and partner-specific adjustments that real LLP agreements contain.
- Does not model the tax computation for each partner's share (use the Take-Home tool for that).
- Fixed-share method assumes all fixed-share amounts are identical; real agreements may have varied amounts.

---

### 4. Law Firm Valuation Calculator

**Slug:** `law-firm-valuation`
**Category:** Practice finance
**Route:** `/calculators/law-firm-valuation`
**Embed:** `/embed/law-firm-valuation`
**Source file:** `src/lib/tools/compute/law-firm-valuation.ts`
**Config file:** `src/lib/tools/configs/law-firm-valuation.ts`

**Inputs:** Normalised EBITDA / profit (£/yr), firm type (sole practitioner / partnership-LLP / specialist / high-volume), region, buyer demand (low / normal / high), WIP (£), tangible assets (£).

**Outputs:** Goodwill multiple range (low to high), goodwill value range (£), total indicative value range (WIP + tangibles included).

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Sole practitioner goodwill | 0.6x to 1.1x profit | UK law firm transaction data 2025/26 (indicative) |
| Partnership / LLP goodwill | 1.0x to 2.0x profit | UK law firm transaction data 2025/26 |
| Specialist firm goodwill | 1.8x to 3.5x profit | UK law firm transaction data 2025/26 |
| High-volume firm goodwill | 0.8x to 1.5x profit | UK law firm transaction data 2025/26 |
| London region adjustment | +0.15x | Market convention |
| South England adjustment | +0.05x | Market convention |
| Midlands / base | 0 | No adjustment |
| North / Wales / Scotland / NI | -0.05x | Market convention |
| Low demand adjustment | -0.15x | Market convention |
| High demand adjustment | +0.10x | Market convention |

**Limitations:**
- Corporate acquirer premium not modelled (typically 10 to 40% above independent-buyer multiples for consolidators).
- Add-backs not applied; normalised profit is the user's input.
- Specialist criteria require practitioner judgment; the calculator cannot verify whether a firm genuinely qualifies as "specialist" in the acquirer's view.
- Figures reflect 2025/26 market conditions; the legal M&A market is cyclical and acquirer appetite varies.
- Not a formal valuation for sale, tax, or litigation purposes.

---

### 5. SRA Client Account Reserve Calculator

**Slug:** `sra-client-account-reserve`
**Category:** SRA compliance
**Route:** `/calculators/sra-client-account-reserve`
**Embed:** `/embed/sra-client-account-reserve`
**Source file:** `src/lib/tools/compute/sra-client-account-reserve.ts`
**Config file:** `src/lib/tools/configs/sra-client-account-reserve.ts`

**Inputs:** Open matter count, transaction volume (low / moderate / high / very-high), matter type (conveyancing / litigation / private client / commercial / mixed).

**Outputs:** Estimated peak client money (£), suggested firm-side reserve (£), range (£ low to £ high), de minimis exemption flag (SRA Accounts Rules Rule 12.2).

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| De minimis exemption — peak | Peak client money up to £10,000 | SRA Accounts Rules Rule 12.2 |
| De minimis exemption — average | Average balance up to £250 | SRA Accounts Rules Rule 12.2 |
| Volume average balance — low | £2,500/matter | Indicative operational figure |
| Volume average balance — moderate | £8,000/matter | Indicative operational figure |
| Volume average balance — high | £25,000/matter | Indicative operational figure |
| Volume average balance — very-high | £75,000/matter | Indicative operational figure |
| Conveyancing risk factor | 2.5% of peak balance | Indicative operational risk convention |
| Litigation risk factor | 1.0% | Indicative |
| Private client risk factor | 0.5% | Indicative |
| Commercial risk factor | 0.8% | Indicative |
| Mixed risk factor | 1.2% | Indicative |
| Reserve range | 70% to 150% of suggested | Indicative band |

**Limitations:**
- Not a regulatory requirement. The SRA Accounts Rules do not mandate a specific firm-side reserve; this is an operational risk-management sizing tool.
- Actual reserve decisions should involve the firm's COFA and external accountant.
- Volume average balances are indicative; real figures depend on the specific client base and matter mix.

---

### 6. PII Premium Estimator

**Slug:** `indemnity-premium`
**Category:** SRA compliance
**Route:** `/calculators/indemnity-premium`
**Embed:** `/embed/indemnity-premium`
**Source file:** `src/lib/tools/compute/indemnity-premium.ts`
**Config file:** `src/lib/tools/configs/indemnity-premium.ts`

**Inputs:** Gross fees (£/yr), practice area focus (conveyancing-heavy / mixed / commercial / private client / litigation / criminal), claims history (none in 5 years / minor / moderate / major), fee-earner count, cover level (£m).

**Outputs:** Indicative annual PII premium (£), range (low to high, ±20/40% around central).

**Key figures and sources:**

| Figure | Value | Source |
|---|---|---|
| Conveyancing-heavy base rate | 2.5% of gross fees | Indicative UK PII market 2025/26 |
| Mixed base rate | 1.5% | Indicative UK PII market 2025/26 |
| Commercial base rate | 0.8% | Indicative UK PII market 2025/26 |
| Private client base rate | 0.7% | Indicative UK PII market 2025/26 |
| Litigation base rate | 1.2% | Indicative UK PII market 2025/26 |
| Criminal base rate | 1.0% | Indicative UK PII market 2025/26 |
| Claims multiplier — no claim 5y | 1.0x | Market convention |
| Claims multiplier — minor | 1.25x | Market convention |
| Claims multiplier — moderate | 1.75x | Market convention |
| Claims multiplier — major | 3.0x | Market convention |
| Cover multiplier — £2m | 1.0x | Indicative; MTC minimum for unincorporated firms |
| Cover multiplier — £3-5m | 1.2x | Indicative; MTC minimum for incorporated firms = £3m |
| Cover multiplier — up to £10m | 1.5x | Indicative |
| Cover multiplier — £20m+ | 2.0x | Indicative |
| Size penalty | 1.1x for firms with 20+ fee-earners | Market convention |
| SRA MTC minimums | £2m unincorporated, £3m incorporated | SRA Minimum Terms and Conditions 2013 |
| Output range | +/-20% / +40% of central | Indicative market spread |

**Limitations:**
- Real premiums depend on underwriter appetite, AML controls, file management quality, and current claims experience.
- Specialist brokers typically deliver 10 to 25% improvement over generalist estimates; this tool uses generalist-market rates.
- Panel membership, SIF top-up, and run-off cover not modelled.
- Rates reflect 2025/26 market conditions; the PII market is cyclical (hard/soft market cycles affect rates materially).

---

## Testing

Golden tests (30 assertions) cover all 6 compute libs:

```
Solicitors/web/src/lib/tools/compute/solicitors-tools.test.ts
```

Run via the site's Vitest config:

```bash
cd Solicitors/web && npx vitest run
```

All tests are pinned to the figures from the original component implementations. Any compute change that breaks a test must be reviewed before merging; silent figure corrections are not permitted (per the Phase D STOP rule).

---

## Adding a new tool

1. Create a pure compute function in `src/lib/tools/compute/<slug>.ts` — no React, no `window`, no `document`, no `fetch` (TL-03).
2. Add golden tests in `solicitors-tools.test.ts`.
3. Create `src/lib/tools/configs/<slug>.ts` — `GenericTool` object with `kind: "generic"`, all required fields.
4. Import and add the tool to the `tools` array in `src/lib/tools/registry.ts`.
5. The gallery (`/calculators`), sitemap, and embed gallery (`/embed`) all derive from `allTools()` — no other files need editing.
6. Add the tool to this TOOLS.md with figures traced to sources and all limitations documented.

---

## Embed usage (for third parties)

```html
<iframe
  src="https://www.accountsforlawyers.co.uk/embed/solicitor-take-home"
  width="100%"
  height="480"
  frameborder="0"
  id="afl-solicitor-take-home"
></iframe>
<script>
  window.addEventListener("message", function(e) {
    if (e.data && e.data.type === "afl-embed-height" && e.data.slug === "solicitor-take-home") {
      document.getElementById("afl-solicitor-take-home").height = e.data.height + 32;
    }
  });
</script>
```

Replace `solicitor-take-home` with the target tool slug. The `embedHeight` value in each tool config is the initial render height; the postMessage auto-resize handles dynamic content.

Message type `afl-embed-height` is FROZEN and tied to the site's analytics storage prefix. Third-party integrators must use this exact string.

Embed pages are noindex and carry open CSP (via `embedPrefix: "embed"` in `buildSecurityHeaders`). The main site CSP remains locked.
