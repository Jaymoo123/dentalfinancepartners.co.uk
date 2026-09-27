# Track A factual QA: vat-on-domiciliary-care

Date: 2026-09-27. Grader: Opus, adversarial. Sources: `docs/care/house_positions.md` (positions 1, 3, 4, 21), VAT Notice 701/2 on gov.uk, VATA 1994 Sch 9 Group 7, Health and Social Care Act 2008.

**Verdict: PASS.** 0 edits. Body 1,158 words.

## Assertions

| # | Assertion | Source | Grade |
|---|---|---|---|
| 1 | Domiciliary personal care by a CQC registered agency is exempt welfare under Group 7 of Schedule 9 to VATA 1994 | HP1 | CORRECT |
| 2 | CQC registration is what makes an English domiciliary agency state regulated | HP1, Notice 701/2 (CQC named for England) | CORRECT |
| 3 | Payer identity (private, local authority, direct payment, NHS) does not change the exemption | HP1, Notice 701/2 (LA-contracted care by a regulated provider stays exempt welfare) | CORRECT |
| 4 | Exemption starts on the date the regulator approves registration; not state regulated while the application is under consideration; no back-dating | Notice 701/2 verbatim: "A welfare provider becomes state regulated when the relevant regulatory body approves its application to register"; "The provider is not state regulated whilst its application is under consideration". Matches HP1 parenthetical | CORRECT |
| 5 | Carrying on a regulated activity before registration is a criminal offence under HSCA 2008 | HP21 | CORRECT |
| 6 | Exempt suppliers cannot recover input VAT on purchases used to make exempt supplies; exemption is a cost not a perk | HP1 and the HP consistency rule on position 1 | CORRECT |
| 7 | Modelling on VAT exclusive cost lines understates the cost base by up to a fifth on affected lines | Standard rate 20%; a fifth of the modelled net line. Arithmetically sound, no rate asserted in the copy | CORRECT |
| 8 | Registration compulsory once taxable turnover in a rolling twelve months exceeds £90,000; exempt fees are not taxable turnover; a wholly exempt agency billing several million never registers | HP3 (same framing, same illustration) | CORRECT |
| 9 | Training to other providers, consultancy, opted-to-tax rent and staff supplied to third parties can be taxable and aggregate against the threshold | HP3 (mixed providers monitor taxable supplies separately); HP1 on option to tax; Notice 701/2 on staff supply | CORRECT |
| 10 | Supplying carers to a third party legally responsible for the onward supply of care is a standard rated supply of staff, not exempt welfare | Notice 701/2 verbatim: taxable "where the third party is legally responsible for the onward supply of providing care to the final recipient" | CORRECT |
| 11 | The exempt/taxable line turns on who holds the regulated responsibility, not on the tasks the workers perform | Notice 701/2, same passage | CORRECT |
| 12 | Mixed supplies trigger partial exemption; standard method or an approved special method | HP4 | CORRECT |
| 13 | De minimis requires exempt input tax to average no more than £625 a month AND to be less than half of total input tax for the period | HP4 (both limbs, same figures) | CORRECT |
| 14 | An overwhelmingly exempt agency fails the 50% limb before the £625 limb | Follows from HP4; HP4 states such providers "will rarely meet the de minimis threshold" | CORRECT |
| 15 | VAT is a UK tax; the regulator differs by nation; HMRC guidance names the Scottish, Welsh and Northern Irish care regulators alongside CQC | Notice 701/2 names the Care Commission (Scotland), CSSIW (Wales), RQIA (Northern Ireland) alongside CQC and OFSTED. The post names no regulator, so no naming drift risk | CORRECT |
| 16 | Exemption for each nation's supplies follows that nation's approval date | Extension of the Notice 701/2 approval-date rule to the named regulators. Reasonable, no figure asserted | CORRECT |

No WRONG, no STALE, no UNSOURCED. Nothing removed.

## Internal links (all 5 verified on disk)

| Link | Target | Status |
|---|---|---|
| `/blog/cqc-and-financial-compliance/cqc-registration-timeline-cash-burn-before-trading` | `care/web/content/blog/cqc-registration-timeline-cash-burn-before-trading.md`, category "CQC and Financial Compliance" | OK, category slugifies to the path |
| `/calculators/true-cost-care-hour-calculator` | `care/web/src/lib/calculators/tools/true-cost-care-hour.ts`, `slug: "true-cost-care-hour-calculator"`, exported in `registry.ts` | OK |
| `/for/domiciliary-care` | `care/web/src/data/care-hubs.ts`, slug `domiciliary-care` | OK |
| `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` | `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, category "VAT and Welfare Exemption" | OK |
| `/services/care-vat-review` | `care/web/src/data/care-services.ts`, slug `care-vat-review` | OK |

At the five-link cap, not over it.

## Frontmatter

YAML parses. `date`, `dateModified`, `updatedDate` all "2026-09-27" (care loader reads `updatedDate`; both set). metaTitle 38 chars, metaDescription 145 chars, summary 54 words, 6 FAQs, 5 key takeaways, category "VAT and Welfare Exemption" verbatim from the brief, canonical path matches the category slug. No em-dashes anywhere in the file.

## Notes for Track B

- Overlap risk with the live sibling `care-home-vat-exemption-edge-cases` and with the wave sibling `care-personal-assistant-vat-registration` (not yet drafted): all three cover the £90,000 threshold and the "exemption is a cost" framing. Check for verbatim sentences, especially in the FAQs and takeaways.
- The takeaways restate the summary and the intro closely by design. Check they are not word-for-word.
- Word count 1,158, near the 1,200 ceiling. Any Track B addition needs an offsetting trim, and the trim must not touch a figure.
- "A specialist reviews the contract chain rather than the job descriptions" is the required house phrasing, leave it.
