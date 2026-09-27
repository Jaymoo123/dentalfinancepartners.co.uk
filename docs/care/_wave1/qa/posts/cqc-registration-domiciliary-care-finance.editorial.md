# Track B editorial QA: cqc-registration-domiciliary-care-finance

Date: 2026-09-27. Reviewer: Opus. Verdict: **PASS**. Edits made: 5. Final body word count: 1,143.

## Scope read
All 11 sibling posts in `docs/care/_wave1/posts/`, plus the two newest posts in `care/web/content/blog/` (`cqc-registration-costs-and-finance-guide.md`, `cqc-registration-timeline-cash-burn-before-trading.md`). Track A report read first; its three flagged overlaps are the basis of this pass.

## Duplication
This post owns the CQC community fee formula in full. A parallel Track B is trimming `cost-to-set-up-a-care-agency.md`; that file was not touched here. The three overlapping clauses Track A flagged were varied on this side only.

| # | Where | Was | Now |
|---|---|---|---|
| 1 | summary | "capped at £92,558, so the regulator's charge grows with your client list" | "a location's charge stops rising at £92,558, so the regulator's bill grows with your client list" |
| 2 | keyTakeaways[0] | "capped at £92,558, so the fee is variable" | "its charge stops rising at £92,558, so the fee is variable" |
| 3 | faqs[0] | opened "Community social care providers are charged per registered location at ..."; closed "CQC's own invoice is the definitive figure, and the scheme should be checked before each budget cycle." | opens "There is no band to look up. Each registered location is billed ..."; closes "Treat the amount on CQC's own invoice as the one that governs, and re-check the scheme before each budget cycle." |
| 4 | intro | "capped at £92,558 at 1,700 service users or more." | "and the location's charge stops rising at £92,558 once it carries 1,700 service users or more." |
| 5 | body, calculator anchor | "Our CQC fee calculator runs the calculation for a given service type and size, and CQC's invoice to you is the definitive figure." | "Model the line against the caseload you are forecasting with our CQC fee calculator, then reconcile it to the amount CQC actually bills, which is the one that governs." |

No figure, rate, date or rule was changed. All five verified amounts (£239, £54.305, £92,558, 1,700, 2024/25) survive unaltered in every location Track A checked them.

No other verbatim or near-verbatim sentence found against any sibling. The shared statements on the Health and Social Care Act 2008 offence, the welfare exemption and the devolved regulators recur across the wave by subject, but each post words them differently; checked line by line against `care-structure-before-cqc`, `how-to-start-a-domiciliary-care-agency-money-decisions`, `vat-on-domiciliary-care`, `care-personal-assistant-vat-registration`, `supported-living-company-structure-before-framework-bid` and `opening-a-childrens-home-finance`. The two live blog posts overlap on the market oversight regime and the fee calculator but share no sentence; they also decline to publish the fee figures, so this post does not contradict them, it supplies what they defer.

## Other Track B checks
| Check | Result |
|---|---|
| AI tells, hedging filler, listicle padding | none found |
| Em-dashes | none, file re-scanned after editing |
| Markdown in body | none, raw HTML only (p, h2, a) |
| Thin or padded sections | none; six H2s, each 2 to 3 substantive paragraphs |
| H2s answer-first | all six question-shaped, answer in the first sentence ("It charges per registered location", "The same statement every new provider produces", "Everything except revenue starts before approval", "Three things", "Growth touches the registration itself") |
| Intro answers with numbers | yes, formula and cap in sentence two |
| Pipeline leakage | none; no HP codes, no TODO, no build notes |
| Banned claims | none; no pricing, no names, no "chartered", "ICAEW", "our accountants", "we advise", "advice". Uses "a specialist reviews" and "your accountant prepares" as required |
| Body word count | 1,143, inside 800 to 1,200 |
| metaTitle | 55 chars |
| metaDescription | 149 chars |
| Internal links | 5, at the cap, none added |
| YAML | re-parsed clean after editing, 15 keys, summary 60 words (at the upper bound of 40 to 60) |

## Notes for the manager
- The summary sits exactly on the 60-word limit after the rewording. Any further addition to it breaks the brief.
- The sibling `cost-to-set-up-a-care-agency.md` still holds the full formula as of this pass. Once its Track B trim lands, re-check that the surviving cross-link points here, since this post is now the owner.
- Both posts carry the 2024/25 scheme label. When CQC publishes a new scheme, this post and the calculator's `CQC_FEE_SCHEME_NOTE` change together; the sibling will then only need its cross-link checked.
