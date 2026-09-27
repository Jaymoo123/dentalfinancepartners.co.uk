# Track B editorial QA: supported-living-company-structure-before-framework-bid

Date: 2026-09-27. Verdict: **PASS** (10 edits applied in place).
Read first: the Track A factual report for this post, the other 12 posts in `docs/care/_wave1/posts/`, and the two newest live posts `care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and `care/web/content/blog/cqc-registration-timeline-cash-burn-before-trading.md`.

Method for the overlap check: sentence-level similarity sweep of every frontmatter string and body sentence in this post against all 14 comparison files, flagging anything at or above 0.55. No figure, rate, date or rule was changed by any edit.

## Near-verbatim overlap, before and after

| Shared line | Worst sibling before | After |
|---|---|---|
| Payroll figures (NIC 15% / £5,000, EA £10,500, NLW £12.71) | 0.66 `care-structure-before-cqc`, 0.65 `cost-to-set-up-a-care-agency`, 0.65 `opening-a-childrens-home-finance`, **0.64 `supported-accommodation-registration-and-tax`** | no hit at 0.55 |
| £90,000 threshold counts taxable turnover only | 0.74 `supported-accommodation-registration-and-tax`, 0.72 `vat-on-domiciliary-care` | 0.59 |
| Associated companies divide £50,000 / £250,000 (FAQ) | 0.69 `care-structure-before-cqc` | 0.62 |
| Corporation tax 19% / 25% / marginal relief (body) | 0.68 `opening-a-childrens-home-finance` | below 0.55 |
| Associated companies (key takeaway 2) | 0.59 `care-structure-before-cqc` | below 0.55 |
| Personal care unregistered is a criminal offence | 0.65 and 0.63 `cqc-registration-timeline-cash-burn-before-trading` | below 0.55 |
| Closing "a specialist reviews ... your accountant prepares" | 0.64 `cqc-registration-domiciliary-care-finance` | below 0.55 |
| "belongs in the decision rather than in the signature page" | 0.63 `supported-living-contract-forecast` | below 0.55 |
| Exempt welfare / irrecoverable input VAT, FAQ 3 against the body H2 (internal repeat, Track A note) | verbatim stem in both | recast, stems now differ |

Everything still at or above 0.60 is a short interrogative H2 or FAQ question matching a differently-subjected question elsewhere (for example "Does a group structure improve the VAT position?" against "Does a CHC award change the VAT position"). Character-level similarity on question scaffolding, different content, no action.

## Edits made (10)

1. Key takeaway 2, associated companies: recast, and the £125,000 crossover is now stated rather than "half the profit".
2. Key takeaway 5, section 22: was a second recital of the audited-accounts and insurance limits already carried in the body (Track A note). Now points the reader at the statute before they spend, so the two do not read as a repeat.
3. FAQ 3, opening sentence: exempt welfare stem varied against the body H2 and against `vat-on-domiciliary-care`.
4. FAQ 5, holding company: rewritten, opens "Only if it trades" so the answer leads.
5. Body, "Which entity should the bid be submitted in?", third paragraph: trimmed and the guarantee sentence reworded off the shared mould.
6. Body, VAT H2: exempt welfare sentence recast (paired with edit 3).
7. Body, VAT H2: £90,000 sentence rebuilt around the measure rather than the "only taxable turnover counts" stem.
8. Body, corporation tax H2: rate sentence rebuilt; the following sentence trimmed of padding.
9. Body, profit H2: payroll figures rebuilt as a cost stacked on the hour, with the Employment Allowance framed as an annual offset that thins across a rota. All four figures retained.
10. Body, CQC H2: criminal-offence sentence led with the Act.

No AI tells, em-dashes, markdown in the body, pipeline leakage, banned claims (pricing, named people, "chartered", "ICAEW", "our accountants", "we advise", "advice") or thin sections found. Intro answers with numbers. Every H2 is answered in its first clause.

## Checks after editing

- Body word count **1,192** (was 1,175; inside 800 to 1,200).
- YAML re-parses clean, 15 keys; `date`, `dateModified`, `updatedDate` all "2026-09-27".
- metaTitle 56, metaDescription 153.
- 5 internal links, at the maximum, unchanged from Track A's verified list.

## Manager notes

- Body is at 1,192 of 1,200. Any later addition needs a matching trim.
- `care-structure-before-cqc`, `cost-to-set-up-a-care-agency`, `opening-a-childrens-home-finance` and `supported-accommodation-registration-and-tax` all still carry the same payroll figures in a similar list construction to each other. This post is now clear of all four, but the four are not clear of each other. Worth a wave-level sweep of that stack of figures.
- The closing CTA mould ("a specialist reviews ... your accountant prepares") recurs across the wave. Changed here; the pattern is still live in the siblings.
- No factual doubt raised. Track A's two fixes were left exactly as written.
