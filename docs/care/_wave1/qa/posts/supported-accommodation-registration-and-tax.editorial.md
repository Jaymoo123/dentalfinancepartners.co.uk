# Track B, editorial QA: supported-accommodation-registration-and-tax

Site: care. Reviewed 2026-09-27, after Track A (PASS, 1 edit). Verdict: **PASS** (5 edits).

Read: all 11 sibling drafts in `docs/care/_wave1/posts/`, plus the two newest live posts
`care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and
`cqc-registration-timeline-cash-burn-before-trading.md` for voice.

## Checks run

| Check | Result |
|---|---|
| Body word count | 1,140 (was 1,136), inside 800 to 1,200 |
| metaTitle / metaDescription | 55 / 154, both inside the cap |
| Internal links | 5, at the cap, targets verified by Track A |
| Em-dashes | none |
| Markdown in body | none |
| Pipeline leakage ("verify at build", "(HP", "TODO") | none |
| Banned claims (pricing, named people, chartered, ICAEW, our accountants, we advise, advice) | none; "A specialist reviews" used correctly |
| AI tells (delve, landscape, navigate, crucial, robust, leverage, seamless, furthermore, testament) | none |
| H2s question-shaped and answer-first | now 6 of 6 |
| Intro answers with numbers | yes (section 11 CSA 2000, 20%) |
| Summary / FAQs / takeaways counts | 57 words, 6 FAQs, 5 takeaways |
| YAML | re-validated after editing |
| Cross-post sentence overlap (>= 0.6 Jaccard vs 11 siblings and 2 live posts) | 3 hits fixed, 1 accepted |

## Edits made (5)

1. **Near-verbatim with `how-to-start-a-domiciliary-care-agency-money-decisions`** (0.74). Corporation tax sentence rewritten to name the small profits and main rates rather than mirror the sibling's clause order. Figures unchanged.
2. **Near-verbatim with `vat-on-domiciliary-care`** (0.71). FAQ "Does exempt income count toward the £90,000 VAT registration threshold?" opening rewritten from "Registration is compulsory only once taxable turnover exceeds £90,000 on a rolling twelve month basis" to a turnover-first construction. Figures unchanged.
3. **Duplicate H2 shape with `vat-on-domiciliary-care`** ("Do you have to register for VAT at £90,000?"). Changed "When do you have to register for VAT?" to "At what point does VAT registration become compulsory?", and made its first sentence answer-first ("At £90,000 of taxable turnover...").
4. **H2 not question-shaped.** "The order to work through it" changed to "In what order do you work through it?".
5. **Track A's lengthened Ofsted paragraph tightened** from five sentences to four in effect (shorter clauses), per Track A's note. The 28 October 2023 date, the section 11 Care Standards Act 2000 citation and the point that the complete-application route was transitional are all retained verbatim in substance.

No figure, rate, date or rule was changed.

## Accepted, not a defect

- 0.64 overlap with `supported-living-company-structure-before-framework-bid` on the payroll line (NIC 15% / £5,000, Employment Allowance £10,500, NLW £12.71). Same statutory figures, different sentence construction and different framing (cost floor there, "what does not change" here). Rewriting further would either drop a figure or read as forced.
- Two paragraphs opening with a single word ("Ofsted.", "Payroll."). Deliberate answer-first pattern, consistent with the brief.
- FAQ 2 restates the Ofsted H2's answer. FAQ blocks are schema surface and the wording differs; not treated as internal padding.

## Notes for the manager

- The post is 1,140 words against a 1,200 ceiling and holds 5 of a maximum 5 internal links. Nothing further can be added at deepening or interlink stage without a matching trim or a link swap.
- Track A graded the load-bearing Ofsted-is-state-regulated claim against VAT Notice 701/2 because `docs/care/house_positions.md` is silent on Ofsted and on supported accommodation. Worth an HP row so later posts do not re-derive it.
