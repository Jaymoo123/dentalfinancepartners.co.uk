/**
 * Per-category CTA copy for the blog post renderer.
 *
 * Keyed on the category SLUG (`slugifyCategory()` output), never the raw
 * frontmatter label. Property learned that the expensive way: keying on the
 * label put 57 posts on the generic CTA because three categories carry a
 * two-way spelling split that slugifies to one hub. The key set is pinned by
 * `src/tests/blog-category-copy.test.ts`, which fails on a missing key and on
 * an orphan key.
 *
 * One object feeds three surfaces: the `#enquiry-form` panel heading and body,
 * the sidebar card, and the lead form's submit label. They cannot drift.
 *
 * COPY RULES (locked): no fee for our services and no comparative fee claim,
 * no turnaround promise, no client-count or aggregate-performance claim, no
 * "most firms qualify" framing, British English, no em-dashes. Every figure is
 * re-derivable from docs/solicitors/house_positions.md and used inside its
 * stated scope and date band.
 */

export type BlogCategoryCopy = { heading: string; body: string; button: string };

export const BLOG_CATEGORY_COPY: Record<string, BlogCategoryCopy> = {
  "practice-finance-cash-flow": {
    heading: "Want your lock-up and cash position reviewed?",
    body: "Work in progress and debtor days are the working capital lever a law firm can actually move, and WIP is recognised under FRS 102 as the firm earns the right to consideration, not when it bills. Ask a specialist accountant to look at your billing cycle and where the cash is sitting.",
    button: "Request a cash flow review",
  },
  "vat-compliance": {
    heading: "Unsure which costs are genuine disbursements?",
    body: "A payment is outside the scope of VAT only if all eight conditions in VAT Notice 700 section 25.1.1 are met, and since Brabners and Revenue and Customs Brief 6 (2020) a search fee you interpret in your own advice is part of your taxable supply. Ask a specialist to test your recharges.",
    button: "Request a VAT review",
  },
  "sra-compliance-trust-accounting": {
    heading: "Want your client account reconciliations checked?",
    body: "The SRA Accounts Rules 2019 require the client account to be reconciled at least every five weeks and signed off by the COFA or a manager. Ask a specialist accountant to review the controls behind that signature before your reporting accountant does.",
    button: "Request a client account review",
  },
  "partnership-llp-structure": {
    heading: "Deciding how to structure the partnership?",
    body: "The structure choice is a tax decision and an SRA authorisation decision at the same time: a general partnership and an LLP are tax-transparent, a company is not, and non-lawyer ownership needs an ABS licence. Ask a specialist to model the routes on your own profit shares.",
    button: "Request a structure review",
  },
  "practice-succession-sale": {
    heading: "Planning your exit from the practice?",
    body: "A partnership or LLP has no shares, so it changes hands as a business and asset sale, and the agreement has to split capital goodwill from income WIP and debtors. Business Asset Disposal Relief moves to 18% for disposals from 6 April 2026, so timing is a live question.",
    button: "Request a succession review",
  },
  "partnership-llp-accounting": {
    heading: "Want a second pair of eyes on the partnership accounts?",
    body: "Members are taxed on their allocated profit share and not on their drawings, so the allocation and the reserving policy do most of the work. Ask a specialist accountant to review your accounts, your allocation and your partner tax reserves.",
    button: "Request an accounts review",
  },
  "sra-accounts-rules": {
    heading: "Need your Accounts Rules position checked?",
    body: "Rule 3.3 bars using a client account to provide banking facilities, and the Rule 12.2 report exemption applies only where client money held averaged no more than £10,000 and never exceeded £250,000. Ask a specialist whether your firm sits where you think it does.",
    button: "Request an Accounts Rules review",
  },
  "conveyancing-compliance": {
    heading: "Running a conveyancing department?",
    body: "Search fees, CHAPS charges and the property transaction taxes each carry a different VAT answer, and the SDLT higher rate for additional dwellings has been 5% for effective dates from 31 October 2024. Ask a specialist to review your recharges and your client account handling.",
    button: "Request a conveyancing review",
  },
  "compliance-risk-colp-cofa": {
    heading: "Carrying the COFA role on your own?",
    body: "The COFA answers for the firm's finance compliance and signs off the five-weekly client account reconciliation. Ask a specialist accountant to review the monthly controls that sit behind it.",
    button: "Request a compliance review",
  },
  "practice-accounting": {
    heading: "Want your practice accounts reviewed?",
    body: "Billing discipline, work in progress recognition and the year end all sit on the same set of numbers, and unincorporated firms have been on the tax-year basis since 2024/25. Ask an accountant who works with law firms to look at yours.",
    button: "Request a practice review",
  },
  "structure-incorporation": {
    heading: "Thinking about incorporating the firm?",
    body: "Incorporation swaps tax transparency for corporation tax plus extraction by salary and dividend, and dividend rates rise to 10.75% ordinary and 35.75% upper from 6 April 2026. Ask a specialist to model it on your own figures before you commit.",
    button: "Request an incorporation review",
  },
  "fee-earner-tax-compensation": {
    heading: "Fixed-share partner and unsure of your tax status?",
    body: "The salaried member rules re-classify a member as an employee for tax only where all three conditions in ITTOIA 2005 ss.863A to 863G are met, including at least 80% disguised salary and capital of less than 25% of it. Ask a specialist to test your own position.",
    button: "Request a status review",
  },
  "professional-indemnity": {
    heading: "Want your PII cover and its tax treatment checked?",
    body: "The SRA minimum terms require £3 million per claim for recognised and licensed bodies and £2 million in other cases, with six years of run-off on cessation. Premiums are a deductible trading expense and exempt from VAT, so there is no input tax to reclaim.",
    button: "Request a PII review",
  },
  "firm-acquisition-merger": {
    heading: "Buying or merging with another firm?",
    body: "Goodwill is a capital asset while work in progress and debtors are trading income, and the buyer's relief on acquired goodwill turns on when it was bought and from whom. Ask a specialist to review the split and the exposure before heads of terms are signed.",
    button: "Request an acquisition review",
  },
  "locum-solicitor-tax": {
    heading: "Working as a locum through your own company?",
    body: "Since 6 April 2021 a medium or large engaging firm determines your status and issues the status determination statement, while a small client leaves that decision with your company. Ask a specialist to review your contracts against the way you actually work.",
    button: "Request an IR35 review",
  },
  "sole-practitioner-tax": {
    heading: "Running the firm and the bookkeeping on your own?",
    body: "Making Tax Digital for Income Tax starts at qualifying income above £50,000 from 6 April 2026, which reaches most full-time sole practitioners. Ask a specialist accountant to get your records and your software ready for it.",
    button: "Request a sole practitioner review",
  },
  "trainee-paralegal-tax": {
    heading: "Starting out and unsure what you should be paying?",
    body: "Income tax, National Insurance and student loan deductions all land on the same payslip, and the picture changes again where training is funded through an apprenticeship. Ask a specialist accountant for a plain explanation of your own position.",
    button: "Request a tax review",
  },
};

/**
 * The three proof points on every closing lead panel across the blog subsystem.
 * Lifted VERBATIM out of `src/app/blog/page.tsx` so `/blog`, the ten derived
 * hubs and the seven hand-built hubs read one source and cannot drift, and so
 * the hub work packages do not contend for the same file. Not one character of
 * this copy changed in the move.
 *
 * The third is Property's own house line
 * (`packages/web-shared/design/blog/BlogCategoryHub.tsx:22`); the owner
 * confirmed 2026-09-11 that Property is the reference for this site.
 */
export const LEAD_PROOF_POINTS = [
  {
    title: "SRA Accounts Rules 2019",
    detail:
      "Client account, five-weekly reconciliations under Rule 8.3, and the Rule 12 accountant's report",
  },
  {
    title: "Partnership, LLP and incorporated",
    detail:
      "Profit shares, the salaried member rules and the tax that follows each structure",
  },
  {
    title: "Same accountant every time",
    detail: "You are not passed around a team",
  },
];
