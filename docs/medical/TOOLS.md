# Medical Finance Partners: Calculator Tools

Deployed under Phase D standardisation (2026-06-11).
Tool platform: shared `@accounting-network/web-shared` GenericTool renderer.
Registry entry point: `Medical/web/src/lib/tools/registry.ts`

---

## Tool inventory

| Slug | Title | Route | Embed |
|------|-------|-------|-------|
| `nhs-pension-annual-allowance` | NHS Pension Annual Allowance Calculator | `/calculators/nhs-pension-annual-allowance` | `/embed/nhs-pension-annual-allowance` |
| `locum-tax-calculator` | Locum Doctor Tax Calculator | `/calculators/locum-tax-calculator` | `/embed/locum-tax-calculator` |
| `private-practice-incorporation` | Private Practice Incorporation Calculator | `/calculators/private-practice-incorporation` | `/embed/private-practice-incorporation` |

---

## Figures and sources

### NHS Pension Annual Allowance Calculator

Compute lib: `Medical/web/src/lib/tools/compute/nhs-pension.ts`

| Figure | Value | Source |
|--------|-------|--------|
| Standard annual allowance | £60,000 | Finance Act 2023, s.18: raised from £40k to £60k from 2023/24 |
| Minimum tapered allowance | £10,000 | Finance Act 2023, s.18: floor raised from £4k to £10k |
| Threshold income limit | £200,000 | Finance Act 2023, s.18: limit raised from £200k (unchanged) |
| Adjusted income limit | £260,000 | Finance Act 2023, s.18: limit raised from £240k to £260k |
| Taper rate | 50p reduction per £1 over | Income Tax Act 2007, s.228ZA |
| Basic rate band | 20% | FA 2025, standard 2025/26 rate |
| Higher rate | 40% | FA 2025, standard 2025/26 rate |
| Additional rate | 45% | FA 2025, standard 2025/26 rate |

### Locum Doctor Tax Calculator

Compute lib: `Medical/web/src/lib/tools/compute/locum-tax.ts`

| Figure | Value | Source |
|--------|-------|--------|
| Personal allowance | £12,570 | ITEPA 2003, s.35 / FA 2021 (frozen to 2028) |
| Basic rate band limit | £50,270 | FA 2021 (frozen to 2028) |
| Higher rate threshold | £125,140 | FA 2022, s.5 (where PA is tapered to zero) |
| Income tax: basic rate | 20% | 2025/26 |
| Income tax: higher rate | 40% | 2025/26 |
| Income tax: additional rate | 45% | 2025/26 |
| Class 4 NI lower threshold | £12,570 | NIC Regulations 2025/26 |
| Class 4 NI upper threshold | £50,270 | NIC Regulations 2025/26 |
| Class 4 NI main rate | 6% | FA 2024, s.2 (reduced from 9% from 6 Apr 2024) |
| Class 4 NI upper rate | 2% | NIC Regulations 2025/26 |

**STALE-FIGURE NOTICE: student loan thresholds: RESOLVED 2026-06-11.**
The old inline component carried 2024/25 thresholds; the extraction pinned them
first (golden-test STOP rule), then the deliberate user-approved correction to
2025/26 values landed with golden tests intentionally updated:

| Plan | Old (2024/25) | Current (2025/26) | Source |
|------|---------------|-------------------|--------|
| Plan 1 | £24,990 | £26,065 | SLC threshold notice 2025 |
| Plan 2 | £27,295 | £28,470 | SLC threshold notice 2025 |
| Plan 4 (Scotland) | £31,395 | £32,745 | SLC threshold notice 2025 |
| Postgrad (PGL) | £21,000 (not offered as an option) | £21,000 | Unchanged |

### Private Practice Incorporation Calculator

Compute lib: `Medical/web/src/lib/tools/compute/incorporation.ts`

| Figure | Value | Source |
|--------|-------|--------|
| Personal allowance | £12,570 | ITEPA 2003 (frozen) |
| Basic rate limit | £50,270 | FA 2021 (frozen) |
| Corporation tax (main) | 25% | FA 2023, s.6 (profits over £250k) |
| CT small profits rate | 19% | FA 2023, s.6 (profits under £50k) |
| CT marginal relief | Yes | FA 2023, s.6 |
| Dividend allowance | £500 | FA 2024 (reduced from £1,000) |
| Dividend basic rate | 10.75% | FA 2026, s.4 (raised from 8.75%; applies from 6 Apr 2026) |
| Dividend higher rate | 35.75% | FA 2026, s.4 (raised from 33.75%; applies from 6 Apr 2026) |
| Dividend additional rate | 39.35% | FA 2026, s.4 (unchanged from 2025/26) |
| NI employer threshold | £5,000 (secondary) | FA 2025, s.1 (reduced from £9,100 from 6 Apr 2025) |
| Employer NI rate | 15% | FA 2025, s.1 (raised from 13.8% from Apr 2025) |
| NOTE | The compute libs do NOT model employer NI (all three tools are employee/self-employed focused). This row is doc-only. Do not add employer NI to compute libs without a new tool brief. |

---

## Architecture

```
Medical/web/src/lib/tools/
  registry.ts                       # makeRegistryHelpers: allTools, getGenericTool, toolPath
  compute/
    nhs-pension.ts                  # TL-03 pure compute (no React/DOM/fetch)
    locum-tax.ts                    # TL-03 pure compute
    incorporation.ts                # TL-03 pure compute
    medical-tools.test.ts           # Golden tests (19), pinned to OLD component outputs
  configs/
    nhs-pension-calculator.ts       # GenericTool config
    locum-tax-calculator.ts         # GenericTool config
    incorporation-calculator.ts     # GenericTool config

Medical/web/src/components/tools/
  CalculatorClient.tsx              # "use client" RSC boundary: resolves tool from slug client-side

Medical/web/src/app/
  calculators/page.tsx              # Gallery from allTools()
  calculators/[slug]/page.tsx       # Per-tool page, dynamicParams=false
  embed/page.tsx                    # Embed gallery (noindex)
  embed/[slug]/page.tsx             # Embed iframe (noindex), ma-embed-height postMessage
```

### RSC boundary pattern

Server components pass only the `slug` string (serializable). `CalculatorClient`
is a `"use client"` component that resolves the full tool config (which contains
the compute function) client-side via `getGenericTool(slug)`. This is the only
pattern that avoids `next build` failures from non-serializable function props
crossing the server/client boundary.

### Embed CSP

`next.config.ts` passes `embedPrefix: "embed"` to `buildSecurityHeaders`. This
adds a scoped Content-Security-Policy exception for the `/embed/` path, allowing
the framed calculator pages to be embedded by third parties.

---

## Golden tests

Run: `npx vitest run "Medical/web/src/lib/tools/compute/medical-tools.test.ts"` from the monorepo root.

19 tests, all GREEN at adoption. Tests are pinned to the OLD inline component outputs.
See STALE-FIGURE NOTICE above for the deliberate deferred corrections.
