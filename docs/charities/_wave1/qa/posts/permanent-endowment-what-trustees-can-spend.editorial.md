# Track B editorial QA: permanent-endowment-what-trustees-can-spend (charities, wave 1)

Date: 2026-09-27. Reviewer: Track B (Opus). Ran after Track A (verdict PASS, 5 factual edits).
Read for comparison: the seven other posts in `docs/charities/_wave1/posts/`, the reviewed audience page `docs/charities/_wave1/grant-making-trusts-and-foundations.json`, and the two newest live posts `charities/web/content/blog/can-charities-claim-back-vat.md` and `do-charities-pay-vat.md`.

## Verdict: PASS after fixes

Edits made: 6 (summary, four FAQ answers, one body sentence added carrying the sibling link). Final body word count: 1,019, inside the 800 to 1,200 band. No figure, rate, date or rule changed, and none of Track A's five factual edits was weakened or removed.

## Defects found and fixed

1. **Frontmatter restated the body near-verbatim.** A trigram Jaccard pass found four pairs at or above 0.25 between the frontmatter and the body: the summary's £25,000 sentence against the intro at 0.53, the section 284A borrowing conditions in FAQ 4 against the borrowing section at 0.53, the ordinary market-value definition in FAQ 2 against the Commission section at 0.32, and the adjusted market value in the same pair at 0.29. The summary and FAQs 2 and 4 were rewritten to carry a distinct angle rather than a second telling. Every figure was carried across unchanged, including both limbs of the adjusted market value and the ordinary definition that Track A added.
2. **FAQ 1 opened near-verbatim to the reviewed audience page.** The post's "Sometimes, and the route depends on the size of the fund rather than the size of the spend" against the audience page FAQ "Can trustees spend permanent endowment?", which opens "Sometimes, and the route depends on the size of the fund rather than the spend". Track A flagged this pair to check. Rewritten to the angle the audience page does not take: the resolution is the trustees' own decision, it does not rewrite the gift and needs no scheme, and spending released capital is a one way step against which the borrowing route should be weighed. The audience page was not touched.
3. **FAQ 3 and the Commission section shared the statutory test wording** at 0.25. FAQ 3's closing sentence was reworded. The test itself, spirit of the gift plus trustee compliance with the Act, is stated in the same terms.
4. **No reciprocal link to the sibling that shares this ground.** `charity-consolidating-legacy-bank-accounts-restricted-funds.md` links here and defers the mechanics to this post, but nothing pointed back, so a reader arriving on the mechanics post had no route to the banking question. One sentence and one link added at the end of the accounts section, worded so it does not repeat the sibling's phrasing. Internal links now 5, at the cap, not over.

## Checks that passed with no edit

Cross-file sentence overlap against the seven siblings and the live blog corpus now has no pair at or above 0.25, and intra-file frontmatter-to-body overlap likewise. No AI tells. No em-dashes or en-dashes anywhere in the file. No markdown in the body; raw HTML throughout, per the site's rendering model. No pipeline leakage. No banned claims: no pricing, no named people, no "chartered", "ICAEW", "our accountants", "we advise" or "advice"; the one soft reference is "A specialist reviews the trust deed against the statutory powers", which is an allowed phrasing. All five H2s are question-shaped and answer-first. The intro answers with the numbers in the first paragraph: sections 281 to 284D, £25,000, 60 days. No thin or padded section; the five sections run 120 to 250 words each. metaTitle 44 chars, metaDescription 149 chars, both inside the caps. Summary 59 words, inside 40 to 60. YAML re-validated after editing: parses, 15 keys, 6 faqs, 5 keyTakeaways, `dateModified` and `updatedDate` both 2026-09-27. Category "Charity Governance" matches the canonical path segment.

## Notes for the manager

- The 25% borrowing figure and the 997 word body Track A reported were left alone, as instructed. The body is now 1,019 after the sibling link sentence, 181 off the ceiling.
- Ownership split held: this post carries the mechanics of ss.281 to 284D, and the bank accounts sibling carries only the consequence for a consolidation. The two now link both ways. Nothing in the sibling needs changing.
- One phrase is interpretation rather than statute and sits outside Track B's remit to change: "Expedient means a clear advantage to the charity, not simply convenience" in the borrowing section. Track A graded the s.284A conditions CORRECT and did not flag the gloss. Worth a decision on whether the wave states glosses like this at all, since it will recur.
- "Permanent endowment is property the charity must keep rather than spend" is the gov.uk definition and appears in this post, the bank accounts sibling and the audience page. It is a term of art rather than a duplication defect, so it was left in the body here and varied only in the summary. Flagging it so a later pass does not re-fix it.
