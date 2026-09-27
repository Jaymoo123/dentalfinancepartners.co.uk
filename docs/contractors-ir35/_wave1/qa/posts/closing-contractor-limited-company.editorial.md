# Track B editorial QA: closing-contractor-limited-company

Site: contractors-ir35. Reviewed 2026-09-27, after Track A. Draft: `docs/contractors-ir35/_wave1/posts/closing-contractor-limited-company.md` (EXTEND of the live post of the same slug).

**Verdict: PASS after 4 in-place edits.** Final body 1,170 words. No figure, rate, date or rule changed.

## Read for comparison

All seven siblings in `docs/contractors-ir35/_wave1/posts/`, and the two newest in `contractors-ir35/web/content/blog/` (`contractor-day-rate-to-take-home.md`, `contractor-pension-carry-forward.md`).

## Cross-post sameness

No verbatim or near-verbatim sentence shared with any sibling. The shared figures (dividend rates 10.75/35.75/39.35, BADR 18%, the £25,000 line, s.455 at 35.75%) recur across `inside-ir35-keep-close-or-umbrella`, `overdrawn-directors-loan-account-s455-contractor`, `alphabet-shares-contractor-company` and `spouse-shareholder-or-employee-contractor-company`, but each states them in its own sentence shapes. No fix needed.

Boundary with the sibling that owns the keep/close/umbrella decision is clean and reciprocal:

- `inside-ir35-keep-close-or-umbrella` names the four routes, when each fits, and states the TAAR in one sentence, then sends the reader here for "the four conditions, the clock and the records to keep".
- This post opens by saying the decision "is not really strike-off against liquidation", covers only the TAAR mechanics, and sends the reader there for the route comparison before the decision to close is taken.
- No route-choice table, no dormant-company section and no umbrella-versus-limited comparison in this post. It does not re-litigate the sibling's decision.

## Defects found and fixed (4)

1. **FAQ 2 duplicated an H2 verbatim in heading and substance.** "When does the two year clock start?" existed as both an FAQ and an H2 with the same answer (distribution date, instalments each carrying their own window, waiting a few months achieves nothing). Replaced with a new FAQ, "Does the TAAR stop me ever going back to the same work?", answered from assertions Track A already graded CORRECT (the two year window in Condition C, all four conditions needed together, Condition D as stated). No new law introduced.
2. **FAQ 3 duplicated an H2.** "What actually happens to the tax if the TAAR bites?" against the H2 "What happens to the tax if the TAAR bites?", same rates, same BADR point, same liquidator-fee closer. Replaced with "Can I close the company with an overdrawn director's loan account?", built only on positions already in the body and the comparison table (loan cleared first, s.455 at 35.75% on loans made on or after 6 April 2026, s.458 relief deferred, the final reserve figure decides the strike-off question).
3. **Near-verbatim triplet between FAQ 1 and the Condition C section.** Both ran "through an umbrella, through agency PAYE, on a client's own payroll". Trimmed the FAQ instance to a single clause; the body keeps the fuller version.
4. **AI tell in the closing paragraph.** "The short version:" removed; the paragraph now starts on the conditional it was already making.

## Checked, no defect

- H2s all answer-first: Condition C, "The continuation of the activity, in any wrapper"; same or similar trade, "Similarity is judged on the substance of the work"; clock, "On the date of the distribution"; tax if it bites, "The amount is taxed as a dividend"; strike-off or MVL, "It changes the mechanics and the ceiling"; evidence, "Contemporaneous records".
- Intro answers with numbers in the first two sentences: two years, s.396B, 5%, Conditions A to D.
- No em-dashes (0 occurrences of U+2014). No en-dashes.
- No markdown in the body; HTML throughout, table well formed.
- No pipeline leakage: no "verify at build", no "(HPnn)", no TODO.
- No banned claims: no pricing, no named people, no "chartered", no "ICAEW", no "our accountants", no "we advise", no use of "advice". The two references to a practitioner are impersonal ("a specialist reviewing a closure", "let a specialist model"), matching the sibling posts.
- Body 1,170 words, inside 800 to 1,200. Six H2s, none thin, none padded; each carries at least one thing the others do not.
- metaTitle 49 chars, metaDescription 148 chars.
- 4 internal links, maximum 5.
- YAML re-parses, 20 keys, 6 FAQs, 5 key takeaways. Extend requirements preserved: `slug`, `date` 2026-06-12, and the `image` / `altText` / `imageCredit` block untouched. `dateModified` and `updatedDate` both 2026-09-27.
- Track A's corrected strike-off wording left exactly as written, in all three places (key takeaway 5, the "Strike-off or MVL" section, the table rows and FAQ 6). It still reads "not a safe harbour", with transactions in securities as the rule in point.

## Notes for the manager

1. **The link to the sibling does not resolve yet.** `/blog/ir35-status/inside-ir35-keep-close-or-umbrella` is a `_wave1` draft, not yet in `content/blog/`. This post and that one link to each other, so they need to ship together or the link is dead on arrival. Track A raised the same point.
2. **This is an extend and the live post is much longer.** The live `contractors-ir35/web/content/blog/closing-contractor-limited-company.md` is a full strike-off versus MVL guide (DS01 mechanics, declaration of solvency, liquidator fee ranges, a BADR rate history table, a worked £80,000 example). The draft is a 1,170-word TAAR-first piece that covers the £25,000 line and the four conditions and assumes the route mechanics are elsewhere. Decide before publishing whether the draft replaces the live body or is merged into it. If it replaces it, the site loses the DS01 and MVL process detail and the worked example, and the live post's liquidator fee figures (£1,500 to £3,000) disappear. If it merges, the combined post will be far over the 1,200 word ceiling and needs a separate length ruling. Not a Track B call.
3. **Track A's house-positions suggestion still stands:** `house_positions.md` §14 is silent on strike-off, so the s.396B scope point can be re-seeded by another writer. A one-line addition there is a manager job.
