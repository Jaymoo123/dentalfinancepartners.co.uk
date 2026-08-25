# Lead classification: rubric and rationale

Canonical tiering rubric for every enquiry across the Ashfield portfolio. Prices and decay rules live in `config/tiers.json`; this document defines how an enquiry earns its tier. The philosophy block below is quoted verbatim in the price sheet and in every buyer proposal.

<!-- philosophy:start -->
## How leads are tiered

A lead's tier is determined by the type of professional work the enquiry describes, in the enquirer's own words. It is never based on the Supplier's estimate of what the client might be worth, and it is never adjusted to suit a price.

Four rules make the grading checkable:

1. **Case type, not opinion.** Each tier is a fixed, published list of case types. An enquiry is graded by matching what it asks for against those lists. Any delivered lead can be checked against the list for its tier.
2. **When in doubt, grade down.** An enquiry that sits between two tiers, or is too vague to place confidently, takes the lower tier. Ambiguity always resolves in the claiming firm's favour, never the Supplier's.
3. **Verification is separate from tier.** Tiering never rewards a lead for being verified. Unverified enquiries are not tiered or sold individually at all; they are only eligible for the Raw batch after the nurture window ends.
4. **One rubric, applied everywhere.** The same rubric grades every enquiry from every site for every receiving firm, and the classification is recorded against the lead at the time it is graded.
<!-- philosophy:end -->

<!-- rubric:start -->
## Tier signals

A lead is graded by the work the enquiry asks for. The lists below are the published case-type lists referred to in the rules above.

### Advisory
Structural or planning work where the adviser's judgement is the product:
- Incorporation of a business or property portfolio
- Ownership restructuring (partnerships, transfers between spouses or companies, Form 17 arrangements)
- Capital Gains Tax planning (disposals, reliefs, timing)
- Stamp Duty Land Tax questions (surcharges, reliefs, mixed use)
- Non-resident or expat tax position
- Charity or CIO formation and structuring
- Reconstruction of historic records or multi-year filings
- Multi-property or multi-entity portfolios

### Standard
Recurring compliance with genuine complexity, or compliance mixed with advice:
- Landlord self assessment with any complicating factor (multiple properties, finance-cost restriction, jointly held income, first year letting)
- SME year-end accounts and company filings
- A compliance need bundled with an advice question that does not itself reach an Advisory case type

### Essential
Straightforward, single-issue compliance:
- A single uncomplicated tax return
- Basic bookkeeping or filing needs
- Verified enquiries too vague to evidence anything more (grade-down destination)

### Grey-zone rule
If an enquiry could be read as either of two tiers, the lower tier applies. Examples: "I have a rental property and need my return done" mentions no complicating factor, so it is Essential, not Standard. "Should I put my two rentals in a company?" asks a structural question, so it is Advisory; but "I have two rentals and need help with my taxes" evidences only multiple-property compliance, so it is Standard, not Advisory.

### Out of scope for tiering
- **Adjacent** is a delivery lane (the same lead offered to non-competing professions), not a grade; it never changes the accounting tier.
- **Raw** is an eligibility state (unverified after the 7-day nurture window), not a grade.
<!-- rubric:end -->

## Classification prompt

Use verbatim. Input: the enquiry message plus form fields (source site, name withheld, any case-type select value, area or postcode fragment if given).

```
You grade enquiries for a UK lead distribution service. Given an enquiry
(message plus form fields), assign exactly one tier by matching the work the
enquirer describes against these case-type lists:

advisory: incorporation; ownership restructuring; CGT planning; SDLT;
non-resident or expat; charity or CIO formation or structuring; historic
records reconstruction; multi-property or multi-entity portfolio structuring.

standard: landlord self assessment with any complicating factor; SME accounts
and company filings; compliance mixed with advice that does not itself reach
an advisory case type.

essential: single straightforward return; basic compliance; verified but too
vague to evidence more.

Rules:
- Grade only on what the enquiry evidences, never on inferred client value.
- When in doubt between two tiers, output the lower tier.
- intent_line: one sentence, max 15 words, stating what the enquirer wants.
  No names, no contact details, no company names, no exact addresses.
- case_type: one short tag from the lists above (e.g. "incorporation",
  "landlord_sa_complex", "basic_return").
- area: rough geographic area if stated (e.g. "Greater Manchester"), else "".

Output strict JSON only, no prose, matching:
{"tier": "advisory" | "standard" | "essential",
 "intent_line": "<string>",
 "case_type": "<string>",
 "area": "<string>"}
```

## Worked examples

| Enquiry (abridged) | Output |
|---|---|
| "I own 6 buy-to-lets in a partnership with my brother and want to know if moving them into a limited company makes sense before April." | `{"tier": "advisory", "intent_line": "Wants advice on incorporating a six-property partnership portfolio.", "case_type": "incorporation", "area": ""}` |
| "Landlord with 2 properties, one jointly owned with my wife. Need this year's self assessment done, last accountant retired." | `{"tier": "standard", "intent_line": "Needs self assessment for two properties including jointly owned income.", "case_type": "landlord_sa_complex", "area": ""}` |
| "Need my tax return sorted, self employed, nothing complicated. Based in Leeds." | `{"tier": "essential", "intent_line": "Wants a straightforward self-employed tax return prepared.", "case_type": "basic_return", "area": "Leeds"}` |
| Grade-down: "I have a rental property, need help with my taxes." | `{"tier": "essential", "intent_line": "Landlord with one property wants help with tax affairs.", "case_type": "basic_return", "area": ""}` (no complicating factor evidenced, so not Standard) |

## Operational notes

- The classifier's JSON is stored with the lead (`case_tier` plus intent line) at grading time; the tier on the ping, the delivery and the invoice line are all read from that record, never re-derived.
- The internal value score (`est_value_gbp`) remains an internal quality signal only. It never sets or adjusts a tier and never appears in buyer-facing pricing.
- Misgrade found after delivery: an enquiry materially different from its description is a credit ground under the standard terms (`config/standard_terms.md`); the rubric plus the stored classification is the reference for "materially different".
