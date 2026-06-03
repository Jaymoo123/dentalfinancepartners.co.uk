# Dentists Wave 1 page tracker (proving wave)

**Created:** 2026-06-03. **Status:** WRAP COMPLETE — all 9 pages written + verified (six-check floor, 0 HARD 404 repo-wide link floor, `npm run build` exit 0, 208/208 static pages incl. the 9 new). PENDING USER DEPLOY APPROVAL (no commit/deploy yet).

Wave 1 = 9 net-new pages across 3 buckets, the small end-to-end proving run for the dentists net-new pipeline (Property "Wave 9" model). Agent-native execution: sub-agents write briefs + pages; the manager runs the HP-lock and drift gates and the build/deploy gate. Ground-truth: `docs/dentists/house_positions.md`.

**Cannibalisation audit (vs 150 existing posts):** 7 net-new, 2 differentiable partials, 0 covered. Report: `wave1_cannibalisation_check.md`.
- A2 (0.33) differentiates vs `how-much-of-dental-practice-price-is-goodwill` (valuation % vs the TAX of the apportionment).
- C3 (0.31) differentiates vs `dental-practice-profit-extraction-uk` (general guide vs the employer-pension-contribution route).

**Status legend:** ⬜ todo · 🟦 brief done · 🟩 page written · ✅ verified+committed · ⚠ blocked

| Status | Pos | Slug | HP anchor | Notes |
|---|---|---|---|---|
| 🟦 | A1 | `selling-dental-practice-badr-rate-rise-2026-timing` | §4 | BADR 14→18% 6 Apr 2026 timing. Brief: writer must state s.28 disposal-date rule correctly (unconditional=exchange date, conditional=condition met), NOT "completion governs" |
| 🟦 | A2 | `dental-practice-sale-goodwill-equipment-price-apportionment` | §4, §7 | goodwill (BADR/CGT) vs equipment (s198 balancing charges); differentiates vs how-much-of-...goodwill |
| 🟦 | A3 | `dental-practice-sale-earn-out-deferred-consideration-cgt` | §4, §4.A | Marren v Ingles two-disposal; BADR usually doesn't reach 2nd disposal; s280 instalment relief |
| 🟦 | B1 | `dental-incorporation-still-worth-it-2026-dividend-rise` | §5 | dividend rise 10.75/35.75%; breakeven modelling |
| 🟦 | B2 | `dental-company-salary-dividend-split-2026-27` | §5 | optimal 2026/27 split; employer NIC + EA now locked in §5 |
| 🟦 | B3 | `nhs-pension-incorporation-trap-dentists-lost-accrual` | §2.C, §5 | trap = default for associates; principal case hedged per §2.C |
| 🟦 | C1 | `employing-spouse-dental-practice-market-rate-tax` | §5 | spouse market-rate rule; EA single-director flip |
| 🟦 | C2 | `directors-loan-account-dental-company-overdrawn-tax` | §5.A | s455 33.75→35.75% now LOCKED as HP §5.A |
| 🟦 | C3 | `employer-pension-contributions-dental-company-profit-extraction` | §5, §2.B | differentiates vs profit-extraction guide; FA2004 s196 locked in §5 |

## Flags (sub-agents report; manager actions at gates)

**HP-lock gate (2026-06-03) — HP extensions locked from the briefs:** §4.A (disposal timing + earn-out CGT), §5 employer-cost block (employer NIC 15% / £5,000 ST / EA £10,500 / FA2004 s196), §5.A (s455 director's loan 33.75→35.75%), §2.B carry-forward, §2.C contract-holder hedge. All anchors verified at primary source by the brief agents; conductor reconciled + locked. No BRIEF_DRIFT raised.

**EXISTING_PAGE_STALE (deferred to a rewrite-engine sweep, NOT this wave):**
- F-1 RATE-CURRENCY: `business-asset-disposal-relief-dentists-what-qualifies` + `capital-gains-tax-selling-dental-practice-uk` (both 2026-03-28) still quote BADR at 10% (stale vs current 14%/18%). A newer correct page `badr-on-dental-practice-sale-2026-uk` (14%/18%) also exists, so this is BOTH a rate-currency fix AND a consolidation candidate (two BADR pages). New wave pages were told NOT to cite the stale pages as the BADR authority.
- F-2 (low): `dentist-pension-contributions-tax-relief-uk` carries a 2024/25 year-tag on figures still correct for 2025/26 (year-tag refresh only).
- F-3 (low): the 4 incorporation/extraction differentiation targets predate FA 2026 and cite correct CT but not the new 10.75%/35.75% dividend rates (factual back-patch, manager-direct, at the rewrite run).
- F-4 RATE-CURRENCY (from B-page modelling): `sole-trader-vs-limited-company-dentists-uk` metaDescription claims "saves over £5,000 in tax at £100k" — pre-FA-2026 full-extraction; at 2026/27 rates (dividends 10.75/35.75%, employer NIC 15%) full-extraction incorporation is roughly neutral-to-negative. Rewrite-engine candidate.
- F-5 (brief-quality, FYI): the C2 brief listed two internal links under /blog/practice-finance/ that actually live under /blog/practice-accounting/; the page agent verified + used the correct paths. Brief link-category paths should be route-verified.

## Discovery log (adjacent net-new ideas for future waves)
- CALCULATOR: BADR-timing calculator (gain + disposal date → CGT at correct band, surfaces the 5-vs-6-Apr-2026 delta); earn-out two-disposal CGT model.
- ADJACENT_TOPIC: s.198 election value negotiation (buyer balancing-allowance vs seller balancing-charge tension); employment-linked earn-outs recharacterised as earnings (disguised remuneration); "modelling your annual allowance with NHS growth + a company SIPP"; a dedicated page disambiguating NHS dividend-pensionability for contract-holding principals (contested in the wild, high-value, low-competition); a "sole director cannot claim Employment Allowance" dental angle (spouse flips it).
- SITE_WIDE: corpus carries FA-2026 rate-currency staleness (BADR 10%, pre-FA2026 dividend rates) → schedule a rewrite-engine pass + the rates/facts ledger (cross-engine floor).
