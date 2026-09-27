# Factual QA (Track A): nhs-pension-scheme-pays-doctors-deadlines

File: `docs/medical/_wave1/posts/nhs-pension-scheme-pays-doctors-deadlines.md`
Extends live post: `Medical/web/content/blog/nhs-pension-scheme-pays-doctors-deadlines.md`
Reviewed 2026-09-27. Tie-breaker: `docs/medical/house_positions.md` §2.B, §2.D; primary law
(FA 2004 s.237B, s.237BA, SI 2011/1793 reg 4) and nhsbsa.nhs.uk where the house doc is silent.

Diff against the live post: the live post is a 14-FAQ "what is Scheme Pays" explainer. The
extension re-cuts it as the decision page (pay from cash versus elect), keeps every load-bearing
figure unchanged, drops the post-retirement voluntary-to-75 FAQ and the "what is Scheme Pays"
definition FAQ, and adds the cash-versus-pension comparison table and the part-mandatory
part-voluntary point. No figure was changed by the extension itself. `generator` moved from
`opus-4.8/netnew-wave` to `claude-opus` and `dateModified` from 2026-08-26 to 2026-09-27 as S4b
requires. The live post's `metaTitle_prev`, `metaDescription_prev` and `editorialNote` keys are
not carried over; they are meta-programme bookkeeping, not content, and S4b does not list them.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | summary, kt2, faq3, intro, body H2.2 | Mandatory Scheme Pays needs BOTH tests at once | FA 2004 s.237B(1)(a)+(b); HP §2.D | CORRECT |
| 2 | summary, kt2, faq3, intro, body H2.2 | The charge must exceed £2,000 | s.237B(1)(a) verbatim "exceeds £2,000"; HP §2.D | CORRECT |
| 3 | kt2, faq3, intro, body H2.2 | It is the charge itself, not the excess over the allowance, that must exceed £2,000 | s.237B(1)(a) (liability to the charge); HP §2.D | CORRECT |
| 4 | summary, kt2, faq3, intro, body H2.2, H2.3 | Pension input amount must exceed the standard £60,000 annual allowance | s.237B(1)(b) (input amount exceeding the s.228(1) annual allowance); HP §2.B (£60,000 for 2026/27, unchanged from 2025/26) | CORRECT |
| 5 | intro | The £60,000 standard allowance is tagged 2026/27 | HP §2.B (verified 2026-08-26 at gov.uk pension-schemes-rates) | CORRECT |
| 6 | kt2, faq3, body H2.2 | The input test runs per registered pension scheme, and NHSBSA counts 1995 or 2008 benefits and 2015 benefits as separate schemes | s.237B(1)(b) and (2) ("in relation to a registered pension scheme"); HP §2.C/§2.D and the live post's 2026-08-26 authorised correction; NHSBSA SPE2 guidance ("counted as separate elections on the SPE2") | CORRECT |
| 7 | body H2.2 | £35,000 of growth in each scheme is £70,000 of NHS growth, a real charge, and no mandatory right | Arithmetic plus assertion 6; HP §2.D | CORRECT |
| 8 | body H2.2 | The McCloud remedy made the split the normal case | HP §2.A (all active members accrue in the 2015 section from 1 Apr 2022, legacy service retained) | CORRECT |
| 9 | kt5, body H2.2 | A taper-driven charge with NHS input below £60,000 is voluntary-only | s.237B(1)(b) tests against the s.228(1) standard allowance, not the tapered one; HP §2.D ("a charge driven only by the taper below £60k is voluntary-only") | CORRECT |
| 10 | body H2.2 | A single year's charge can be part mandatory and part voluntary where input exceeds £60,000 but a lower tapered allowance drives part of the bill | s.237B(3) caps the joint liability at the charge on the excess over the standard allowance in that scheme | CORRECT |
| 11 | body H2.2 | Where both tests are met NHSBSA has no discretion and must accept a valid election for the qualifying part | s.237B(3) (joint and several liability on a valid notice); HP §2.D | CORRECT |
| 12 | summary, kt3, faq4, intro, body H2.3 | A 2026/27 charge must be elected by 31 July 2028 | s.237BA(2) "not later than 31 July in the year following the year in which the tax year ends"; HP §2.D states the 2026/27-to-31-July-2028 pairing explicitly | CORRECT |
| 13 | kt3, faq4, body H2.3 | The reasoning: 2026/27 ends 5 April 2027, the following year ends 5 April 2028, deadline 31 July 2028 | s.237BA(2); HP §2.D | CORRECT |
| 14 | body H2.3 | A 2025/26 charge runs to 31 July 2027 | s.237BA(2); HP §2.D | CORRECT |
| 15 | kt4, faq5, body H2.3 | Where the administrator gives information about a change to the pension input amount on or after 2 May in the year following the tax year, the limit becomes the earlier of three months from that information or six years from the end of the tax year | s.237BA(3) to (5) verbatim (relevant time "on or after 2 May in the year following that in which the tax year in question ends"; "3 months"; "6 years"); HP §2.D; PTM056430 | CORRECT (after edit 1) |
| 16 | kt4, faq5, body H2.3 | Late and revised NHSBSA statements are the normal case, and this limb is what lets McCloud-revised historic charges be settled | HP §2.D ("NHSBSA statements are routinely late and revised", the limb NHS members most often need) | CORRECT |
| 17 | kt5, body H2.3 | Under FA 2004 s.237B(6) a notice may not be given after the member becomes actually entitled to all of their benefits | s.237B(6) verbatim; HP §2.D (citation precision resolved 2026-08-26: cite s.237B(6), not s.237BA) | CORRECT |
| 18 | body H2.3 | Taking everything closes the statutory door and leaves only NHSBSA's discretion | s.237B(6) plus NHSBSA's discretionary voluntary route; HP §2.D | CORRECT (no post-retirement age limit asserted here, so the voluntary-to-75 point is not in scope) |
| 19 | faq6, table, body closing | An election can be amended but never revoked | SI 2011/1793 reg 4 (provides for amendment only); NHSBSA FAQ KA-31017 "you cannot change your mind and pay the charge yourself after it's been accepted" / "You can make changes to your scheme pays election" | CORRECT |
| 20 | faq6, body H2.4 | The charge must still be reported on Self Assessment, showing both the charge and the amount the scheme is settling | FA 2004 Part 4 / SA100 Ai4 pension savings tax charges boxes; HP §2.D leaves it unstated but does not contradict | CORRECT |
| 21 | kt1, faq2, table, intro, body H2.1 | Scheme Pays leaves a permanent debit reduced by actuarial factors set by NHSBSA and GAD, depending on age, section and amount, revised periodically, so no fixed percentage can be quoted | HP §2.D ("the reduction is applied via scheme-set (NHSBSA/GAD) factors"); NHSBSA FAQ KA-31017 ("we're unable to estimate a scheme pays deduction as this will be based on your age and interest gained when you retire") | CORRECT (no percentage asserted, as required) |
| 22 | kt1, faq2, table, body H2.1 | The debit is revalued by the scheme until benefits are drawn, so the reduction that finally bites exceeds the cash the scheme paid | NHSBSA FAQ KA-31017 (interest gained to retirement) | CORRECT (no rate asserted) |
| 23 | body H2.4 | Charge calculated at marginal rate on the excess after carry-forward from the previous three tax years | HP §2.B (carry-forward from the previous three tax years, current year first; charge at marginal rate) | CORRECT |
| 24 | body H2.2 | Voluntary Scheme Pays is at NHSBSA's discretion, on the same election form and by the same 31 July date, and the extended limb is not available as of right | NHSBSA: "complete a scheme pays election (SPE2) and return it to us within HMRC's deadline of 31 July, in the year following the tax year of the annual allowance charge"; s.237BA governs s.237B notices only | CORRECT (after edit 2) |
| 25 | intro, body H2.1 | A DB charge arises on capitalised growth in a promised future pension, not on cash received | HP §2.B ("for DB schemes the measure is the pension input amount (capitalised growth), not contributions paid") | CORRECT |
| 26 | table | Paying yourself is due on the Self Assessment payment date | Generic, no date or figure asserted | CORRECT |

No taper figures (£200,000 / £260,000 / £10,000 floor) are asserted anywhere in the post; the
taper is handled by reference to the linked tapered-allowance guide, so nothing to check there.
No unsourced figure was found, so nothing was removed.

## Edit log

1. keyTakeaway 4: "a changed pension input amount on or after 2 May" changed to "a changed
   pension input amount **on or after 2 May in the year following the tax year**". As written
   the takeaway left 2 May floating across any year, while s.237BA(4) fixes it to the year
   following that in which the tax year ends. The body and FAQ 5 already carried the full form.
   One-clause precision fix, no figure changed.
2. Body, H2 "Do you have a right to Scheme Pays, or only a request?", taper paragraph:
   "Voluntary Scheme Pays is offered at NHSBSA's discretion on its own terms and can carry
   earlier administrative cut-offs than the statutory date, so it needs more lead time, not
   less." replaced with "Voluntary Scheme Pays is offered at NHSBSA's discretion, on the same
   election form and by the same 31 July date, and the statutory extended limb is not yours as
   of right." WRONG as written: NHSBSA asks for voluntary and mandatory on the same SPE2 within
   the same 31 July deadline, so there is no earlier administrative cut-off to point at. The
   real and sourceable asymmetry is that s.237BA's extended limb attaches to mandatory notices,
   not to the discretionary route.

Total edits: 2 (1 precision, 1 WRONG corrected). No STALE findings: every figure re-verified
against the 2026-08-26 currency pass and re-confirmed at primary source today. No UNSOURCED
figures, so nothing removed. Frontmatter re-parsed as YAML after the edits: valid, 18 keys.

## Frontmatter validation (S4b)

- Required keys present: slug, title, date, category, metaDescription, metaTitle, h1, summary,
  author, canonical, dateModified, faqs, keyTakeaways, generator. PASS
- metaTitle 50 chars (limit 60). PASS
- metaDescription 147 chars (limit 155). PASS
- canonical `https://www.medicalaccounts.co.uk/blog/nhs-pension-scheme-pays-doctors-deadlines`,
  Medical flat form, matches the live post. PASS
- author "Medical Accountants UK Editorial Team". PASS
- dateModified 2026-09-27, bumped from the live post's 2026-08-26; date, slug, canonical and
  category unchanged from the live post, as PARTIAL extensions require. PASS
- category "NHS Pension Planning", on the Medical list and backed by the live route
  `src/app/blog/nhs-pension-planning/page.tsx`. PASS
- generator `claude-opus`. PASS
- summary 50 words (band 40 to 60). PASS
- faqs 6 (band 4 to 6), keyTakeaways 5 (band 3 to 5). PASS

## Body validation (S4b shape)

- Raw HTML throughout, no markdown constructs, no shortcodes, no CTA markup. PASS
- 1,194 words after the edits (band 800 to 1,200). PASS
- Five links, the S4b maximum, all verified on disk: four flat `/blog/<slug>`
  (`nhs-pension-annual-allowance-complete-guide`, `mccloud-remedy-nhs-pension-doctors-explained`,
  `nhs-pension-tapered-annual-allowance-calculator`,
  `nhs-pension-partial-retirement-doctors-guide` = four flat blog links) plus
  `/calculators/nhs-pension-scheme-pays`, whose config is
  `Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts` with `slug:
  "nhs-pension-scheme-pays"`, exported as `nhsPensionSchemePaysTool` and registered in
  `src/lib/tools/registry.ts`, served by `src/app/calculators/[slug]`. PASS
- No em-dashes, British English, no pricing, no named people, no firm claims,
  "a specialist reviews" rather than "we advise". PASS

VERDICT: PASS
