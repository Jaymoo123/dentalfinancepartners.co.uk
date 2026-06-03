# Dentists Wave 2 page tracker

**Created:** 2026-06-03. **Status:** PREP done (picks + cannib GREEN, 10 net-new + 5 differentiable partials). Execution: CLUSTER-BY-CLUSTER (sequential), one cluster fully (briefs → HP-lock gate → pages → link-floor + build) before the next. Order: A VAT (§6) → B capital allowances (§7) → C NHS pension (§2). ALL 3 CLUSTERS COMPLETE — 15/15 pages written + verified (link floor 0 HARD 404; build verifying). §6 (VAT), §7 (capital allowances, incl. the 18→14% WDA correction) and §2 (NHS pension, incl. the §2.C provider refinement) all extended/corrected at their gates. Parked uncommitted for the user deploy decision.

Wave 2 = 15 net-new pages, 5 per bucket, distinct from Wave 1 (which was sale/incorporation/extraction). Agent-native execution; manager runs the HP-lock + drift gates and is the single committer (coexisting with the parallel rewrite agent in the main tree). Ground-truth: `docs/dentists/house_positions.md`. NOT deploying without user approval.

**Cannib audit (vs 159 existing, incl. Wave 1):** 10 net-new, 5 partial (0.31-0.36), 0 covered. Report: `wave2_cannibalisation_check.md`. Partials differentiate (distinct intent), not replaced.

**Status legend:** ⬜ todo · 🟦 brief done · 🟩 page written · ✅ verified

| Status | Pos | Slug | HP anchor | Notes |
|---|---|---|---|---|
| 🟩 | A1 | `dental-practice-vat-partial-exemption-input-recovery` | §6 | input VAT apportionment, de minimis, special method |
| 🟩 | A2 | `dental-laboratory-prostheses-vat-treatment-uk` | §6 | lab work / dentures / prostheses VAT |
| 🟩 | A3 | `capital-goods-scheme-dental-practice-refurbishment-vat` | §6 | CGS on property/refurb |
| 🟩 | A4 | `dental-practice-vat-deregistration-mostly-nhs` | §6 | deregistration when income mostly exempt |
| 🟩 | A5 | `cosmetic-vs-therapeutic-dental-vat-principal-purpose` | §6 | principal-purpose test; differentiate vs facial-aesthetics page |
| 🟩 | B1 | `dental-surgery-fit-out-capital-allowances-pool-split` | §7 | 18% vs 6% pool split on fit-out |
| 🟩 | B2 | `s198-election-dental-practice-purchase-fixtures` | §7 | s198 election + value negotiation (farm idea) |
| 🟩 | B3 | `dental-equipment-finance-lease-vs-buy-capital-allowances` | §7 | finance method vs allowances; diff vs equipment guide |
| 🟩 | B4 | `structures-buildings-allowance-dental-practice-premises` | §7 | SBA 3% (NOT AIA); diff vs AIA page |
| 🟩 | B5 | `aia-year-end-timing-dental-equipment-purchase` | §7 | year-end timing; diff vs AIA page |
| 🟩 | C1 | `nhs-pension-scheme-pays-election-dentists` | §2.B | Scheme Pays mechanics; diff vs annual-allowance page |
| 🟩 | C2 | `incorporated-dental-principal-nhs-pension-pensionability` | §2.C | the contested principal case (HP hedge); confirm-with-NHSBSA framing |
| 🟩 | C3 | `nhs-pension-annual-allowance-nhs-plus-private-sipp-aggregation` | §2.B | NHS input + SIPP aggregation; diff vs tapering page |
| 🟩 | C4 | `nhs-pension-partial-retirement-dentists-tax` | §2 | partial retirement / draw-while-working |
| 🟩 | C5 | `taking-nhs-pension-early-dentists-tax-impact` | §2 | actuarial reduction + tax |

## Flags
**§6 HP-lock gate (cluster A, 2026-06-03):** locked §6.A partial exemption, §6.B Capital Goods Scheme, §6.C deregistration, §6 Item 2A prostheses. No BRIEF_DRIFT.
- EXISTING_PAGE_STALE: `facial-aesthetics-vat-uk-dental-practices` states £85k VAT threshold (now £90k) → handed to the rewrite agent (already grepping £85,000).
- Cluster A pages WRITTEN + link floor PASS (0 HARD 404). 5 VAT pages, 2,873-3,077 words, 12-14 FAQs, 0 em-dashes.
- COSMETIC (deferred to a one-pass corpus normalisation): blog `category:` casing is mixed corpus-wide ("VAT & Compliance" vs "VAT & compliance"; both slugify to vat-and-compliance, routing-safe). A1-A3 used capital-C; not patched piecemeal.

**§7 HP-lock gate (cluster B, 2026-06-03) — ground-truth CORRECTION:** §7 had a stale flat 18% main-rate WDA; corrected to 18→14% (FA 2026 s.28) + locked §7.A-E (FA2026 changes, balancing adjustments, s198 conditions, lease-vs-buy, AIA timing).
- EXISTING_PAGE_STALE → rewrite hit-list (add token "18% WDA"): `capital-allowances-dental-equipment-tax-relief-guide-2026` + `capital-allowance-aia-dental-practice` (flat 18% WDA).
- For rewrite/SEO: 2 General-category pages (`annual-investment-allowance-dental-practice`, `full-expensing-capital-allowances-dentists`) carry stale self-canonicals omitting the `/general/` segment.
- Cluster B 5 pages WRITTEN + link floor PASS. Cross-links: B1-B3 interlink + point to B4/B5; B4/B5 link outward only (minor sibling-link gap, acceptable). Cluster C page agents to include sibling links by path.

## Discovery log
(populated from sub-agent returns at close)
