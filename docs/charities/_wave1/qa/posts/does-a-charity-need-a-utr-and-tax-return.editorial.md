# Track B editorial QA: does-a-charity-need-a-utr-and-tax-return

Date: 2026-09-27. Reviewer: Track B (Opus). Ran after Track A (verdict PASS, 5 edits, body 1,167).

**Verdict: PASS after fixes** (14 edits). Final body word count 1,193, inside the 800 to 1,200 band. No figure, rate, date or rule changed.

## Corpus read

All seven siblings in `docs/charities/_wave1/posts/`, plus the two newest posts in `charities/web/content/blog/` by frontmatter date, `which-charitable-causes-earn-the-most.md` and `how-much-should-a-charity-hold-in-reserves.md` (both 2026-07-20). Duplication measured as trigram Jaccard on sentences of eight words or more, cross-post and frontmatter-to-body.

## Defects found and fixed

1. **Small trading tiers near-verbatim with `charity-income-from-charitable-activities-vs-donations`.** That post carries the tiers twice, in its H2 5 and its FAQ 5, and this post's body bullet shared both the ordering and the consequence clause with them ("tax falls on all the profits of that trade, not just the amount over" against "tax is due on all the profits of that trade, not just the part above the line"; "a trading subsidiary is the usual answer" against "the answer is usually a subsidiary"). Rewritten as a third, distinct wording: the ceiling framing, "the trade's whole profit falls into charge, not merely the slice above it", and "where the trade is never going back under, a subsidiary is the structure that fixes it". All three tier figures, both boundaries and the all-profits rule carried across untouched.
2. **FAQ 5 was a second telling of the same tiers.** It restated the small trading limit and the all-profits rule already in the body, which duplicated the post with itself and with the sibling. Rewritten onto the angle the question actually asks about a grant maker: approved-category investment and loan activity first, non charitable expenditure second, exposure surfacing in an investment review rather than a trading page. The tier figures are gone from the FAQ and remain in the body once.
3. **Scotland clause.** The post had none. HMRC direct tax is UK-wide, so the OSCR scrutiny contrast the siblings run does not apply here and importing it would have been wrong as well as duplicative. Added a single line of its own construction to the closing scope section: the regulator changes across the border, the tax does not, with recognition, the UTR and the return running through HMRC on identical terms. No trigram overlap with the four sibling Scotland passages, which are all about scrutiny thresholds.
4. **Four sentences shared frontmatter with the body.** `summary` against the intro opener (0.26), FAQ 4 against the CT600E paragraph (0.48), FAQ 4 again against the no-computation sentence (0.26), FAQ 3 against step 4 of the closing list (0.27). The `summary` opener, FAQ 4 and step 4 were reworded; the body kept its wording in each pair.
5. **keyTakeaway 1 and the body's opening sentence on what triggers a UTR were near-verbatim.** Body rewritten to "the trigger for a UTR is setting up a limited company or registering for Self Assessment, not being a charity"; the takeaway is unchanged.
6. **Intro did not answer with numbers.** Added the two deadlines already asserted and graded in Track A, 12 months from the accounting period end and the following 31 January. Also removed the near-verbatim restatement of `summary` in the same paragraph.
7. **Four of seven H2s were questions, not answer-first.** Rewritten as claims: "A charitable company has a UTR from day one, the others usually do not"; "No, the HMRC charity reference number is a different number"; "A return is due when HMRC asks, or when the trustees think tax may be owed"; "Trusts file an SA900, every other charity files a CT600"; "A late return brings a penalty even where no tax was owed"; "A UTR and a return are the direct tax picture only". "The order to work in" kept, it labels a procedure rather than answering a question.
8. **"a common cause of a claim being rejected rather than refused"** is not a distinction that means anything. Replaced with "a common reason a claim comes back unprocessed".
9. **Padding trimmed to make room** without losing a fact: the trust and unincorporated association bullets merged (they made the same point twice), the second sentence of the "holding a UTR is not an obligation" paragraph, "your accountant prepares them on the basis the charity's income already requires", "the supplementary pages are not optional extras", the orphan line "The structure decides this too.", and the tail of the nil-return sentence.

## Checks that passed with no edit

| Check | Result |
|---|---|
| Cross-post overlap | 0 sentence pairs above 0.25 trigram Jaccard against the seven siblings and the two newest live posts, after the fixes |
| Frontmatter to body overlap | 0 pairs above 0.25 after the fixes |
| AI tells | None found |
| Em-dashes | 0 in the whole file |
| Markdown in body | None, raw HTML throughout per the site's rendering model |
| Pipeline leakage | No "verify at build", no "(HP12)", no TODO |
| Banned claims | No pricing, no named people, no "chartered", "ICAEW", "our accountants", "we advise", "advice". "A specialist reads the portfolio and the grant list" and "your accountant" were the only soft references and "your accountant" was cut as padding |
| Internal links | 5, at the cap, unchanged from Track A. No link added, removed or repointed |
| Meta lengths | metaTitle 43 (<= 60), metaDescription 145 (<= 155) |
| Thin or padded sections | Every H2 carries at least two blocks of distinct content after the trims |
| YAML | Re-parsed clean after every edit: 15 keys, 6 faqs, 5 keyTakeaways, `date` / `dateModified` / `updatedDate` all 2026-09-27, category "Trustee Compliance" matching the canonical path |

## Notes for the manager

1. **Headroom is gone.** The body finished at 1,193 of 1,200. Track A flagged 33 words of headroom and the required work (numbers in the intro, the Scotland line) spent more than that, so roughly 60 words of genuine padding were cut to pay for it. Anything added later needs a matching cut named in the same pass.
2. **The tiers are now written three different ways across the wave**, here, in `charity-income-from-charitable-activities-vs-donations` H2 5, and in that post's FAQ 5. That is fine for duplication but it is three surfaces to keep in step if HP12 ever moves. Worth holding one canonical tier sentence in `house_positions.md` and treating rewordings as deliberate, per-post variants of it.
3. **The Scotland decision was mine and is worth confirming.** Four wave 1 posts flag Scotland because the scrutiny regime changes the answer; this post flags it to say the answer does not change. If the wave standard is to stay silent where nothing changes, delete that one sentence and the post gains 33 words of headroom.
4. **No factual doubts.** Nothing in Track A's protected set (the three tier figures, the four-year window, the two filing deadlines, the CIO correction) was touched, and no new assertion was introduced. The two deadlines added to the intro are both already in the body and already graded CORRECT.
