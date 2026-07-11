# Charities pilot — wave 1 launch core, seed-brief index (Stage 1, PREP)

Date: 2026-07-11. 29 assets per `expansion_research/pilot_charities/LAUNCH_CORE.md`.
Brand: BRAND_TBD (all briefs brand-agnostic; CTA/brand copy flows from site config at write time).
Volume/KD source: DataForSEO UK (2826), fetched 2026-07-11 (dossier raw files). HP = `docs/charities/house_positions.md` (locked 2026-07-11).
Calculator embeds available: `/embed/gift-aid-calculator`, `/embed/ie-vs-audit-checker`, `/embed/gasds-calculator`.

## Index

| Brief file | Tier | Primary query | Vol/KD | Intent | HP positions touched |
|---|---|---|---|---|---|
| home.md | money | charity accountant | 590/27 (near-me 720/0) | HIRE | 3, 4, 5, 7, 26 |
| services-independent-examination.md | money | independent examination of charity accounts | 210/0 | HIRE-MIXED | 3, 4, 5, 6, 26 |
| services-charity-accounts.md | money | charity accounts preparation (no direct vol; SORP cluster: sorp frs 102 320/0) | n/a | HIRE | 2, 6, 7 |
| services-charity-bookkeeping.md | money | charity bookkeeping (autocomplete cluster, no measured vol) | n/a | HIRE (DIY edge) | 2, 6 |
| services-gift-aid.md | money | claiming gift aid (service edge) | 1,900/14 | HIRE edge of DIY | 10, 14, 15, 16, 17, 18 |
| services-charity-vat.md | money | charity vat | 480/2 | DIY-MIXED | 20, 21 |
| for-cics.md | money | cic accountant | 90/0 | MIXED | 12, 13, 22, 23, 24 |
| for-social-enterprises.md | money | social enterprise accountants (no measured vol in dossier) | n/a | MIXED | 12, 13, 22, 23, 25 |
| pillar-audit-vs-independent-examination.md | pillar | charity audit threshold | 390/0 | MIXED | 3, 4, 5, 6, 26 |
| pillar-charity-sorp-2026.md | pillar | charity sorp | 1,900/20 (sorp 2026 480/6) | MIXED (timely) | 6, 7 (flag 1) |
| pillar-gift-aid-complete-guide.md | pillar | claiming gift aid (head 8,100/30 = answer-box only) | 1,900/14 | DIY / BLUF | 14, 15, 16, 17, 18, 19 |
| pillar-cic-complete-guide.md | pillar | cic | 12,100/10 | MIXED | 22, 23, 24 (flag 2), 25 |
| pillar-charity-vat-guide.md | pillar | do charity pay vat | 1,000/0 | DIY-MIXED | 20, 21 |
| pillar-set-up-a-charity-cio.md | pillar | charitable incorporated organisation | 6,600/11 (registration 4,400/38 = BLUF) | DIY / BLUF | 1, 2, 10, 25, 26 |
| calc-gift-aid-calculator.md | calculator | gift aid calculator | 720/0 | DIY (tool) | 14, 15, 19 |
| calc-ie-vs-audit-threshold-checker.md | calculator | charity audit threshold (tool-intent split vs pillar) | 390/0 | MIXED (tool) | 3, 4, 5, 6, 26 (flag 3) |
| calc-gasds-calculator.md | calculator | gift aid small donations scheme | 390/0 | DIY (tool) | 17 |
| charity-sorp-2026-changes.md | blog | charity sorp 2026 | 480/6 | MIXED (timely) | 7 (flag 1) |
| cic34-form-guide.md | blog | cic34 form | 480/0 | DIY-MIXED | 22, 24 (flag 2) |
| do-charities-pay-vat.md | blog | do charities pay vat | 1,000/0 | DIY / BLUF | 11, 20 |
| can-charities-claim-back-vat.md | blog | can charity claim back vat | 480/0 | DIY / BLUF | 20 |
| charity-commission-annual-return-guide.md | blog | charity commission annual return | 1,000/0 | DIY-MIXED | 2, 9 |
| who-can-do-an-independent-examination.md | blog | who can do an independent examination | 30/0 (cost 20/39) | HIRE-adjacent | 3, 5, 26 |
| charity-trading-subsidiary-gift-aid.md | blog | charity trading subsidiary | 50/0 | MIXED (high lead quality) | 12, 13 |
| cic-vs-charity.md | blog | cic vs charity | 170/0 | MIXED | 14, 22, 23, 25 |
| charity-accounting-software-compared.md | blog | charity accounting software | 390/0 | DIY / BLUF | 6, 7 (flag 1) |
| gift-aid-declaration-wording.md | blog | gift aid declaration | 720/9 | DIY / BLUF | 14, 15 |
| gasds-rules.md | blog | gift aid small donations scheme | 390/0 | DIY | 17 |
| trustees-annual-report-guide.md | blog | trustees annual report | 140/0 | DIY (authority) | 2, 6, 7 (flag 1) |

## Internal-linking map (within the 29)

Hub-and-spoke per cluster. Every money page links to its pillar; every pillar links to its money page, calculator(s) and blogs; blogs link up to pillar + service, sideways within cluster.

**Home** → all 7 other money pages; pillars audit-vs-IE, gift-aid, cic, vat, sorp, set-up.

**IE / audit / accounts cluster**
- services-independent-examination ↔ pillar-audit-vs-independent-examination ↔ calc-ie-vs-audit-threshold-checker
- who-can-do-an-independent-examination → services-independent-examination, pillar-audit-vs-independent-examination, calc-ie-vs-audit-threshold-checker
- services-charity-accounts ↔ pillar-charity-sorp-2026; services-charity-accounts → services-independent-examination, trustees-annual-report-guide
- charity-sorp-2026-changes → pillar-charity-sorp-2026, services-charity-accounts
- charity-commission-annual-return-guide ↔ trustees-annual-report-guide; both → services-charity-accounts
- services-charity-bookkeeping → charity-accounting-software-compared, services-charity-accounts; charity-accounting-software-compared → services-charity-bookkeeping

**Gift Aid / GASDS cluster**
- services-gift-aid ↔ pillar-gift-aid-complete-guide ↔ calc-gift-aid-calculator
- gasds-rules ↔ calc-gasds-calculator; both → pillar-gift-aid-complete-guide, services-gift-aid
- gift-aid-declaration-wording → services-gift-aid, pillar-gift-aid-complete-guide, calc-gift-aid-calculator
- charity-trading-subsidiary-gift-aid → pillar-gift-aid-complete-guide, for-social-enterprises, services-charity-accounts

**VAT cluster**
- services-charity-vat ↔ pillar-charity-vat-guide
- do-charities-pay-vat ↔ can-charities-claim-back-vat; both → pillar-charity-vat-guide, services-charity-vat

**CIC / structures cluster**
- for-cics ↔ pillar-cic-complete-guide; for-cics → cic34-form-guide, cic-vs-charity
- cic34-form-guide → for-cics, pillar-cic-complete-guide
- cic-vs-charity → pillar-cic-complete-guide, for-cics, pillar-set-up-a-charity-cio
- pillar-set-up-a-charity-cio → pillar-cic-complete-guide, cic-vs-charity, services-charity-accounts, charity-commission-annual-return-guide
- for-social-enterprises → for-cics, pillar-cic-complete-guide, charity-trading-subsidiary-gift-aid

## Cannibalisation splits locked at seed stage
- "charity audit threshold" 390/0: pillar (informational) vs checker page (tool intent). Stage 2 confirms modifiers.
- "charity sorp" head: pillar owns; blog charity-sorp-2026-changes takes the what-changed angle only.
- "gift aid small donations scheme" 390/0: gasds-rules (rules explainer) vs calc-gasds-calculator (tool intent).
- VAT: do-charities-pay-vat (output/liability) vs can-charities-claim-back-vat (input recovery/apportionment).
- Estate-level: hollowaydavies.co.uk live pages `accountant-for-charities-uk` / `accountant-for-churches-uk` target the head term; owner decision (migrate/301 vs de-optimise vs coexist) pending per TOPICS.md; wall needed at S-brand stage.

## HP open flags carried into briefs (do not assert on-site until cleared)
1. SORP 2026 tier thresholds (HP 7) — sorp pillar/blog, software blog, trustees report blog.
2. CIC34 filing fee (HP 24) — cic34 blog, cic pillar, for-cics.
3. OSCR universal-scrutiny detail (HP 26) — IE checker + IE pages (tool refuses Scotland regardless).
4. CC15d body text (HP 4/6) — figures anchored via CC31.

## HP gaps discovered at seed stage (positions needed but not locked; listed, NOT invented)
- Social-enterprise definition/legal-form scope (for-social-enterprises).
- Companies House filing deadline for charitable companies (trustees-annual-report-guide, annual-return blog).
- Gift Aid claim time limit for charities (services-gift-aid, declaration blog; GASDS 2-year deadline IS locked in HP 17, the Gift Aid equivalent is not).
