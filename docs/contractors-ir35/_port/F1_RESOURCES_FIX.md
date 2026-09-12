# F1: wrong-facts fix, `contractors-ir35/web/content/resources/`

Scope: correct false statements only in `ir35.md`, `pay-planning.md`, `structure.md`.
No restructuring, no re-voicing, no expansion. Ground truth =
`docs/contractors-ir35/house_positions.md` (HP). Line numbers are post-edit.

## Changes made

| file:line | before | after | ground truth | how found |
|---|---|---|---|---|
| `ir35.md:20` | "PGMOL v HMRC 2023" | "PGMOL v HMRC [2024] UKSC 29" | HP §2 + Citations index: *PGMOL* [2024] UKSC 29, 16 Sep 2024 | ledger row; confirmed by reading the case list in situ |
| `ir35.md:23` | "HMRC stands behind an accurate CEST result, meaning it will not challenge a status position that was based on an accurate and complete CEST." | "HMRC stands behind a CEST result where the answers are accurate, match the actual working practices, follow its guidance and there is no avoidance." | HP §2 / §17.A: the stand-behind promise is conditional on accuracy, working-practices consistency, guidance compliance and no avoidance | rule sweep (not in ledger): HP §2 requires the promise to be stated WITH its limits every time CEST is mentioned |
| `ir35.md:26` | "it is the fee-payer (typically the agency or end client) that determines your status and operates PAYE" | "it is the end client that determines your status and issues the Status Determination Statement, and the fee-payer (typically the agency closest to your company) that operates PAYE" | HP §1: "Chapter 10 = client decides, fee-payer pays"; HP §3: the client issues the SDS | ledger row (SERIOUS); statement of law |
| `ir35.md:37` | "director salary (typically at the personal allowance of GBP12,570 for a single-director PSC)" | "director salary (commonly GBP6,708, the lower earnings limit, for a single-director PSC that cannot claim the Employment Allowance; there is no single optimal figure)" | HP §8: single-director-no-EA target is between the £5,000 ST and the £6,708 LEL; never publish a universal optimal salary | ledger row + HP §8 writing rule |
| `pay-planning.md:28` | "the Employment Allowance of GBP5,000 per year (2024/25 and 2025/26)" | "the Employment Allowance of GBP10,500 per year (2026/27)" | HP §6 + Citations index: EA £10,500 | ledger row (SERIOUS) |
| `pay-planning.md:28` | "If your company employs more than one employee (or you have multiple companies that together qualify)" | "If your company has at least one employee other than a single director" | HP §6: EA is unavailable where the only employee is a single director; connected companies share one allowance, they do not "together qualify" | rule sweep (not in ledger) |
| `pay-planning.md:28` | "the cost of a salary up to around GBP45,000 is different" | "the allowance covers the employer NIC on a salary up to around GBP75,000, so the cost of salary is different" | ARITHMETIC DERIVED FROM THE FIGURE ABOVE: £10,500 / 15% = £70,000 of salary above the £5,000 secondary threshold, so £75,000 | arithmetic sweep: this ceiling is computed from the EA, so correcting the EA alone would have left the file self-contradictory |
| `pay-planning.md:31` | "A salary of at least GBP6,396 a year (the lower earnings limit for 2026/27)" | "A salary of at least GBP6,708 a year (the lower earnings limit for 2026/27)" | HP §6: LEL £6,708 (£6,396 is the 2022/23 LEL) | ledger row (SERIOUS) |
| `pay-planning.md:31` | "For a single-director company without the Employment Allowance, the typical optimal salary is GBP12,570 to preserve state pension entitlement while limiting the employer NIC charge to GBP1,135 (15% on GBP7,570)." | "...the usual targets sit between GBP5,000 and the GBP6,708 lower earnings limit, which secures the qualifying year for a small slice of employer NIC (15% on the GBP1,708 above GBP5,000); a salary of GBP12,570 instead costs GBP1,135 of employer NIC (15% on GBP7,570). There is no single optimal figure, so model it rather than assuming one." | HP §8 and its writing rule | ledger row (SERIOUS). The £1,135 arithmetic was correct and is retained, re-labelled as the cost of the £12,570 option rather than as the optimum |
| `pay-planning.md:54` | "thresholds are divided by the number of associated companies" | "...divided by the number of associated companies plus one" | HP §7: "the limits are divided by the number of associated companies plus one" | rule sweep (not in ledger). As written, one associated company would divide by 1, ie no change, contradicting the file's own next clause ("the thresholds are halved") |
| `structure.md:25` | "the fee-payer makes the determination and you have limited control" | "the end client makes the determination and issues the Status Determination Statement, and you have limited control" | HP §1 / §3 | ledger row (SERIOUS); second instance of the same statement of law |
| `structure.md:28` | "the liability can transfer to the agency or (as a last resort) the end client in the labour supply chain." | "the agency that contracts with the end client (or the end client itself where there is no agency in the chain) is jointly and severally liable for it. The umbrella remains the legal employer; what changes is that HMRC can pursue the agency or end client for the unpaid PAYE." | HP §12: joint and several liability, agency-that-contracts-with-the-client or the client where there is no agency, umbrella stays the employer. HP §12 writing rule forbids framing PAYE responsibility as "moving to" the agency | ledger row (SERIOUS) |
| `structure.md:29` | "compliant FCSA or APSCo member umbrellas" | "compliant FCSA or Professional Passport accredited umbrellas" | HP §12: "FCSA/Professional Passport accredited". APSCo is a recruitment trade body, not an umbrella accreditation scheme | ledger row |
| `structure.md:38` | "director salary (GBP12,570 is typical for a single-director PSC to avoid NIC while retaining state pension entitlement)" | "director salary (GBP6,708, the lower earnings limit, is the usual target for a single-director PSC that cannot claim the Employment Allowance, retaining state pension entitlement for a small slice of employer NIC)" | HP §6 / §8 | ledger row. Two defects in one parenthetical: the wrong target salary, and the claim that £12,570 "avoids NIC" when £1,135.50 of employer NIC is due |

## Made, then reverted on the coordinator's correction

| file:line | what | why reverted |
|---|---|---|
| `ir35.md:12`, `structure.md:21` | The "GBP1,900 to GBP2,000" outside-vs-umbrella gap was briefly changed to "GBP4,300 to GBP4,900" on the P0-C1 ledger row, and `structure.md`'s dependent sentence ("At GBP2,000 fees the net benefit ... is roughly neutral") was recomputed with it | `P0C3_PUBLIC_ASSETS.md` recomputed the workbook's own default scenario (outside £71,821, inside £69,890, gap £1,931) and VERIFIED the published figure. The ledger's recompute assumed zero company expenses, which is not the model's default. Both files are back to their original wording, byte for byte |

## Found and NOT changed

| file:line | what | why left |
|---|---|---|
| `ir35.md:29` | umbrella margin "typically GBP1,000 to GBP2,000 a year" | Unsourced in HP, and conflicts with the site's own calculators (£20–£30/wk = £1,040–£1,560). Not a false statement against ground truth, and the range contains the calculators' range. Out of a wrong-facts-only scope |
| `structure.md:21` | accountant fees "GBP1,000 to GBP3,000 a year" | HP is silent on fees. Unsourced, not false. One of five different ranges across the site: an estate-level consistency decision, not an F1 fix |
| `ir35.md:16` | "lower effective tax on dividend income in the basic band (10.75% versus up to 40% income tax)" | Loose (the basic-band income tax rate is 20%; the 40% is a cross-band comparison) but not false. Rewording is prose improvement, out of scope |
| `ir35.md:23` | CEST's MOO treatment "has been narrower than the case law in some decisions" | HP §2 states it as a standing property of the tool, not a per-decision observation. Hedge is weaker than HP, but the sentence is not false, and the page does carry the "not a guarantee" line HP requires |
| `ir35.md:37`, `pay-planning.md:54,57`, `structure.md:15` | the "spreadsheet model" and "rates tab" claims | Per brief, not mine to verify. The coordinator has since confirmed the workbooks exist, are linked, and their `Rates` sheets match HP exactly, so these claims stand as true |
| `pay-planning.md:48` | pension contribution of GBP10,000 saves "around GBP1,900 in corporation tax at the 19% small profits rate" | Arithmetic checks out (19% × £10,000) and the rate is correctly tagged to the small profits band |
| `pay-planning.md:21` | dividend allowance "reduced from GBP1,000 in April 2024" | Correct history (£1,000 for 2023/24, £500 from 2024/25) |
| `ir35.md:26` | "no 5% allowance for expenses (removed from April 2017 for public sector, April 2021 for private sector)" | Already carries BOTH dates, so the workbook-only defect the coordinator flagged does not appear here. Matches HP §4 |

## Coordinator's new sweep items: result in these three files

- **"HMRC list" / "HMRC-supervised compliant list" of umbrellas: NOT PRESENT** in any of the three files. Swept case-insensitively for `HMRC.{0,40}list`, `approved list`, `supervised`, `accredit`. The only accreditation claim in the prose was `structure.md:29`, which named FCSA/APSCo and is now FCSA/Professional Passport per HP §12. No edit needed for the no-such-list defect; it is workbook-only.
- **Loan Charge as the current personal-liability route: NOT PRESENT.** No occurrence of "loan charge", "Part 7A" or any loan-scheme liability route in the three files. `structure.md:29` refers to disguised remuneration generically, without dating it to the Loan Charge.
- **5% allowance dated to April 2017 only: NOT PRESENT.** `ir35.md:26` already carries April 2017 (public) and April 2021 (private).

## Method

- Read all three files end to end (135 lines total) rather than jumping to the ledger's line numbers.
- Frontmatter checked by value on every key: these three files carry only `title`, `slug`, `summary`, `version`, `lastReviewed`, `noindex`. No `faqs`, `keyTakeaways`, `metaTitle`, `metaDescription` or `schema:` block exists in any of them, so there is no JSON-LD surface here to drift. (`noindex: true` is set on all three, which is worth a separate note: see receipt.)
- Money searched in BOTH representations. These files are ASCII-only (`GBP12,570`), so a `£` grep returns nothing; every figure was read in context instead.
- Arithmetic swept as well as wording. The one derived value found was the EA absorption ceiling in `pay-planning.md:28`, corrected alongside the EA itself.
