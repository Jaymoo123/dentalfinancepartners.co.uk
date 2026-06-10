# Solicitors Wave 2 page tracker (first full wave)

**Created:** 2026-06-03. **Status:** WRAP COMPLETE — all 24 pages WRITTEN + VERIFIED across 6 clusters. `npm run build` exit 0 (all 24 prerender as static HTML; corpus now 183 posts). Six-check floor passed on every page (0 em-dashes, 0 class=, 14 FAQs each, metaTitle <=60, metaDescription <=158, bodies ~2,685-3,074 words). Internal-link floor: **0 broken links from the 24 new pages in production** (verified vs `.next`). Frontmatter HARD gate: all blog YAML valid. PENDING USER DEPLOY APPROVAL (no commit/deploy). 24 net-new pages across 6 clusters, scaling up from the 9-page proving wave (Wave 1). Same engine: sub-agents write briefs + pages; conductor runs HP-lock gates + build/.next-linkcheck gate. Ground-truth: `docs/solicitors/house_positions.md`. Not committed/deployed (human single committer; parallel dentists + solicitors-rewrite + medical sessions share the tree).

**Cannibalisation (vs corpus):** 24 net-new, 0 partial, 0 covered (`wave2_cannibalisation_check.md`). Picks curated from a 30-pick sub-agent proposal; 6 likely-twins dropped up front (current-vs-capital, IHT-boundary, trust-accounting twin, completion/CHAPS, Rule-3.3-breach, status-test, buy-in-funding).

**Link rule (route truth, NOT the buggy auditor):** post renders at `/blog/<slugifyCategory(category)>/<slug>` where slugify REMOVES "&". Category slugs this wave: A+D `sra-compliance-trust-accounting`; B `vat-compliance`; C `conveyancing-compliance`; E `practice-finance-cash-flow`; F `structure-incorporation`. Verify links vs `.next` via `.cache/sol_linkcheck.py`.

**Status legend:** ⬜ todo · 🟦 brief done · 🟩 page written · ✅ verified (six-check + .next link + build) · ⚠ blocked

| Status | Pos | Slug | Category | HP anchor / gap |
|---|---|---|---|---|
| ✅ | A1 | `probate-estate-administration-client-account-sra` | SRA Compliance & Trust Accounting | §5 + LOCK PR/estate money as client money |
| ✅ | A2 | `vat-on-probate-and-estate-administration-fees` | SRA Compliance & Trust Accounting | §6 (eight-condition test, probate outlays) |
| ✅ | A3 | `residual-client-balances-clearing-unclaimed-money-sra` | SRA Compliance & Trust Accounting | §5 + LOCK residual-balance withdrawal route |
| ✅ | A4 | `attorney-and-deputyship-receipts-accounting-solicitors` | SRA Compliance & Trust Accounting | §5, §6 + LOCK attorney/deputy receipts |
| ✅ | A5 | `solicitor-acting-as-executor-or-trustee-fees-tax` | SRA Compliance & Trust Accounting | §5, §6 + LOCK professional executor/trustee remuneration |
| ✅ | B1 | `legal-aid-laa-work-vat-and-cash-flow` | VAT & Compliance | §6, §6.D, §4 + LOCK legal-aid VAT/billing |
| ✅ | B2 | `inter-partes-costs-recovery-vat-treatment-law-firms` | VAT & Compliance | §6, §6.D + LOCK inter-partes/recovered-costs VAT |
| ✅ | B3 | `conditional-fee-agreement-cfa-success-fee-accounting-tax` | VAT & Compliance | §6.D, §4 + LOCK CFA contingent revenue recognition |
| ✅ | B4 | `damages-based-agreement-dba-accounting-tax-law-firms` | VAT & Compliance | §6.D, §4 + LOCK DBA revenue recognition |
| ✅ | B5 | `disbursement-and-litigation-funding-cash-flow-tax` | VAT & Compliance | §4, §6 |
| ✅ | C1 | `abortive-conveyancing-transactions-vat-and-wip` | Conveyancing Compliance | §6, §6.D, §4 |
| ✅ | C2 | `sdlt-refund-and-overpayment-claims-conveyancers` | Conveyancing Compliance | §7, §6 |
| ✅ | C3 | `conveyancing-referral-fees-sra-transparency-and-vat` | Conveyancing Compliance | §6, §1 + LOCK referral fees + SRA Transparency Rules |
| ✅ | C4 | `non-resident-and-corporate-buyer-sdlt-for-conveyancers` | Conveyancing Compliance | §7, §6 |
| ✅ | D1 | `third-party-managed-accounts-tpma-for-law-firms` | SRA Compliance & Trust Accounting | §5 + LOCK TPMA / SRA Rule 4.2 |
| ✅ | D2 | `mixed-money-receipts-splitting-office-and-client` | SRA Compliance & Trust Accounting | §5 (mixed receipts, 14-day split) |
| ✅ | D3 | `dormant-and-suspense-client-ledger-balances-management` | SRA Compliance & Trust Accounting | §5 (suspense, reconciliation) |
| ✅ | D4 | `running-a-law-firm-without-a-client-account-model` | SRA Compliance & Trust Accounting | §5 Rule 12.2, §6 (differentiate from D1) |
| ✅ | E1 | `tax-loans-for-law-firm-partners-funding-the-bill` | Practice Finance & Cash Flow | §4, §3, §2 |
| ✅ | E2 | `apprenticeship-levy-and-solicitor-apprenticeships-law-firms` | Practice Finance & Cash Flow | §3, §10 + LOCK apprenticeship levy figures |
| ✅ | E3 | `secondment-of-solicitors-vat-and-tax-treatment` | Practice Finance & Cash Flow | §6, §3 + LOCK secondment/supply-of-staff VAT |
| ✅ | E4 | `financing-pii-premiums-tax-treatment-of-premium-finance` | Practice Finance & Cash Flow | §10, §4 |
| ✅ | F1 | `law-firm-demerger-and-partner-team-moves-tax-sra` | Structure & Incorporation | §9, §5, §2 |
| ✅ | F2 | `service-company-structure-for-law-firms-tax-vat` | Structure & Incorporation | §2.B, §6, §3 |

## Flags (sub-agents report; conductor actions at gates)

**HP-lock gates (2026-06-03) — 16 new sub-sections locked, each anchor brief-verified at primary source and the most page-defining/novel ones conductor-re-verified:**
- Cluster A: **§5.A** estate/PR/attorney/deputy money as client money (Rule 2.1(c)); **§5.B** residual/unclaimed balances (£500/matter to charity without SRA authority, over £500 needs SRA authorisation, Rule 5.1(c)) [conductor-verified at sra.org.uk]; **§5.C** professional executor/trustee remuneration (Trustee Act 2000 s.28/s.29).
- Cluster B: **§6.F** legal-aid VAT + tax point (VATTOS8560/8570); **§6.G** inter-partes/recovered-costs VAT (VATSC11534); **§4.A** contingent-fee revenue recognition + CFA/DBA caps [conductor-verified DBA Regs 2013 reg 4: 25% PI / 50% other / 35% employment, including VAT].
- Cluster D: **§5.D** TPMA = SRA Rule 11 [conductor-verified; brief corrected picks.yaml which wrongly said Rule 4.2]; **§5.E** mixed money = Rule 4.2 "promptly" (no fixed day-count; the picks.yaml "14-day" was the VAT concept, corrected); **§5.F** suspense/dormant; **§5.G** no-client-account model (Rule 12.1 trigger vs Rule 12.2 exemption).
- Cluster C: **§7.A** SDLT refund/overpayment windows; **§7.B** corporate/non-natural-person SDLT flat **17%** from 31 Oct 2024 (NOT 15%) + ATED [conductor-verified at gov.uk]; **§6.H** referral fees (SRA Code 5.1/5.2 + LASPO s.56 PI-only ban + standard-rated VAT).
- Cluster E: **§3.A** apprenticeship levy (0.5% / £15,000 / £3m / 50% transfer from 22 Apr 2024) [conductor-verified 0.5/£15k/£3m at gov.uk] + tax-bill-funding note (interest on a loan for PERSONAL tax is NOT deductible, BIM45690); **§6.I** supply-of-staff/secondment VAT (staff-hire concession withdrawn 1 Apr 2009).
- Cluster F: **§6.J** VAT grouping (VATA s.43/s.43A; FA 2019 non-corporate/LLP extension from 1 Nov 2019; service-company recharge standard-rated without a group) + the §2.B service-company-vs-corporate-member boundary.

**EXISTING_PAGE_STALE (NEW catches this wave, for the rewrite/link-sweep track; NOT fixed here):**
- W2-S1 (HIGH): `client-money-accounting-solicitors` carries an INVENTED interest rule ("interest on client money over £500 held > 8 weeks, base rate minus 2%") and "monthly reconciliation" / "daily checks" — wrong. Correct: Rule 7 fairness test (no fixed £/rate) + Rule 8.3 five-weekly. 
- W2-S2 (HIGH): sweep the corpus for any stale corporate SDLT "15%" flat-rate reference -> 17% from 31 October 2024 (`sdlt-calculation-uk-conveyancing-solicitors` omits the corporate rate + the higher-rate refund-claim deadline).
- (Re-confirmed, already on the HP stale list: PII £2m/£3m reversal; SRA report £250 error across the report cluster; Brabners/search-fee gaps; SDLT surcharge date; LBTT/LTT slab errors; basis-period meta wrong year.)

**Link-tooling note:** verified all pages against the `.next` prerender (route truth), NOT `predeploy_gate`'s link count (the `&`->`and` auditor bug, see Wave 1 tracker + [[engine_link_audit_slugify_bug]]). The legacy corpus mixes route-form and literal-"and" category strings, so some existing pages genuinely render at `...-and-...` paths (their category contains the word "and"); page agents linked only to confirmed-resolving targets.
