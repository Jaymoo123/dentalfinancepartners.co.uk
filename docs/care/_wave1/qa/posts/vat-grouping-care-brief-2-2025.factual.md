# Track A factual QA: vat-grouping-care-brief-2-2025

Verdict: **PASS** (5 precision edits applied in place). Body 1,090 words. Sources: gov.uk RCB 2/2025 (publication page + HTML guidance), legislation.gov.uk VATA 1994 ss.43, 43A, 43C, `docs/care/house_positions.md` positions 1 and 2.

## Assertions

| # | Assertion | Grade | Source |
|---|---|---|---|
| 1 | RCB 2/2025 published 24 April 2025 | CORRECT | gov.uk publication page |
| 2 | Brief targets a state-regulated provider VAT-grouped with a non-state-regulated welfare provider, unlocking input VAT on otherwise exempt supplies | CORRECT | RCB 2/2025; HP position 2 |
| 3 | Brief does not outlaw VAT grouping in care generally | CORRECT | RCB 2/2025 scope is the described structure only |
| 4 | HMRC will refuse new group registration applications designed to implement these structures | CORRECT after edit | Brief says "where necessary, refuse". Post stated it unqualified in 3 places; "where necessary" added |
| 5 | HMRC will request further information, consider cases individually, and begin investigations immediately | CORRECT | RCB 2/2025 |
| 6 | HMRC will use Protection of the Revenue powers under s.43C(1) to remove parties | CORRECT | RCB 2/2025 names s.43C(1) expressly |
| 7 | **Load-bearing:** protection of the revenue termination takes effect from the notice date or later; ineligibility termination can be backdated | CORRECT | s.43C(1) "a date which is, or falls after, the date on which the notice is given"; s.43C(2) protection of the revenue test; s.43C(3) mandatory termination where not eligible under s.43A; s.43C(4) that date may be earlier than the notice but not earlier than the first date the person was not eligible, or the date it ceased to be eligible |
| 8 | s.43A control test: one controls the others / one person controls all / two or more individuals in partnership control all | CORRECT | s.43A(1) |
| 9 | Individuals and partnerships eligible in their own right since 1 November 2019 | CORRECT | s.43A(4)-(7), FA 2019, in force 1 Nov 2019 |
| 10 | s.43: intra-group supplies disregarded, business treated as carried on by the representative member | CORRECT | s.43(1)(a),(b) |
| 11 | Every member jointly and severally liable for VAT due from the representative member | CORRECT | s.43(1)(c) |
| 12 | Welfare supplies by a CQC-registered provider are exempt, so input VAT is lost | CORRECT | HP position 1 (Group 7 Sch 9 VATA 1994; VAT Notice 701/2) |
| 13 | Contact route CAGetHelpOutOfTaxAvoidance@hmrc.gov.uk, "VAT grouping" in the subject line | CORRECT | RCB 2/2025 |
| 14 | HMRC asks providers to review their VAT accounting and have the position professionally reviewed | CORRECT | RCB 2/2025 |
| 15 | Earlier periods under a protection-of-revenue notice are corrected by assessment, not by the notice | CORRECT (inference from s.43C(1) forward-only effect; no figure attached) | s.43C(1) |

No rates, thresholds or monetary figures are asserted anywhere in the post, so nothing was removed as UNSOURCED. No WRONG or STALE findings.

## Edits made (5)

1. Intro: "will refuse new registrations" to "will, where necessary, refuse new registrations and that it is beginning investigations into existing arrangements immediately".
2. keyTakeaways[3]: added "where necessary".
3. faqs[3] answer: added "where necessary" and "consider existing cases individually".
4. faqs[1] answer: s.43C narrowed to s.43C(1).
5. Removal section: added the subsection map, (1) and (2) for protection of the revenue, (3) and (4) for ineligibility.

## Checks

- Frontmatter: all required keys present; `date`, `dateModified`, `updatedDate` all "2026-09-27" (care loader reads `updatedDate`); category "VAT and Welfare Exemption" verbatim; canonical path matches the category slug; metaTitle 39 chars, metaDescription 147 chars; summary 49 words; 5 keyTakeaways, 6 FAQs. YAML re-parsed clean after editing.
- Internal links, 4 of a permitted 5, all targets exist: `care/web/content/blog/care-home-vat-exemption-edge-cases.md` (category slugifies to `vat-and-welfare-exemption`, matches the href); `src/data/care-hubs.ts` slugs `supported-living` and `care-homes`; `src/data/care-services.ts` slug `care-vat-review`.
- No em-dashes, no pricing, no named people, no banned claims spotted on the factual pass.

## Notes for Track B

- The two removal routes are the spine of the post; do not compress the table or the subsection references out.
- "where necessary" now appears in three places, close together in the FAQs and takeaways. It is load-bearing accuracy, keep the qualifier, but the phrasing could be varied.
- Nothing for the manager to fix elsewhere.
