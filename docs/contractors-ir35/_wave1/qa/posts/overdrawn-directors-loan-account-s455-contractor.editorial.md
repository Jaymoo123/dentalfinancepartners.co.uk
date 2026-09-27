# Track B editorial QA: overdrawn-directors-loan-account-s455-contractor

Date: 2026-09-27. Reviewer: Opus, Track B of `docs/_engines/WAVE1_POST_QA_BRIEF.md`.
Read against the seven siblings in `docs/contractors-ir35/_wave1/posts/` and the two newest
posts in `contractors-ir35/web/content/blog/` (`contractor-day-rate-to-take-home.md`,
`contractor-pension-carry-forward.md`).

**Verdict: PASS. 2 edits. Body 1,147 words.**

## Edits made

1. **FAQ 6 closer, shared opener/closer pattern.** "A specialist reviews the reserves position
   before anything is voted..." now reads "Check the reserves position before anything is
   voted...". The phrase "A specialist review(s|ing)" closes a section in four other wave posts
   (`alphabet-shares-contractor-company` L106, `closing-contractor-limited-company` L113,
   `contractor-pension-carry-forward` L87, `first-contract-outside-ir35-checklist` L96). This
   post was the fifth. Removing it here breaks the run and loses nothing; the sentence keeps its
   reason clause.
2. **Worked-example closing paragraph, Track A note 1.** "running through 2026/27 and 2027/28
   also produces P11D benefit entries... in both years" now reads "running on until the
   repayment also produces P11D benefit entries... in every tax year it is outstanding". The
   example repays on 30 June 2028, so 2028/29 carries a part-year benefit the old enumeration
   silently dropped. No figure, rate, date or rule changed; the enumeration became a rule.

## Checks that passed, no edit needed

| Check | Result |
|---|---|
| Verbatim or near-verbatim sentences shared with a sibling | None. Three siblings mention s.455 in passing (`closing-contractor-limited-company` L109, `inside-ir35-keep-close-or-umbrella` L48, `first-contract-outside-ir35-checklist` L96); each states the rate in its own sentence and none overlaps this post's wording. The overlap Track A flagged on clearing a loan before distribution is thematic, not verbatim. |
| FAQs and key takeaways against siblings | No shared question wording, no shared answer sentence. |
| AI tells | None. Swept for the usual register markers ("it is worth noting", "crucial", "landscape", "navigate", "leverage", "ultimately", "not just X but Y", "comprehensive") and for hedge-stacking. Clean. |
| Em-dashes | Zero in the whole file. |
| Markdown in the body | None. Body is raw HTML per the site convention; no markdown links, no `*`, no `#`. |
| Thin or padded sections | Seven H2 sections, each carrying its own mechanism. The shortest ("Nothing is due while the balance sits there during the year") is a deliberate two-sentence beat inside a longer section, not a section of its own. |
| H2s answer-first | All seven are questions, which is the house pattern across the wave (`alphabet-shares`, `contractor-pension-carry-forward` both run question H2s); each is answered in the first sentence below it. |
| Intro answers with numbers | Yes: 35.75%, 33.75%, £30,000, £10,725, nine months and one day, all in the opening paragraph. |
| Pipeline leakage | None. No "verify at build", no "(HP12)", no TODO. |
| Banned claims | No pricing, no named people, no "chartered", no "ICAEW", no "our accountants", no "we advise", no "advice". The one "our guides" style phrasing does not appear. Edit 1 also removed the last first-person-adjacent practitioner voice. |
| Word count | 1,147, inside the 800 to 1,200 band. Up 4 from Track A's 1,143 because edit 2's rule form is slightly longer than the enumeration. No trim taken: every remaining number is load-bearing and the band is not breached. |
| Meta lengths | metaTitle 54 chars (limit 60). metaDescription 142 chars (limit 155). |
| Internal links | Four, all in the closing two paragraphs, under the five-link cap. Targets verified on disk by Track A. |
| YAML | Re-parsed after both edits. Valid. `date`, `dateModified`, `updatedDate` all 2026-09-27. |

## Notes for the manager

1. **Estate-wide, not this post.** "A specialist review(s|ing)" opens or closes a section in four
   of the eight wave 1 contractors posts and now none of the others were touched by this review.
   Fixing only the fifth leaves a four-post tic in a single wave. Sweep the pattern by rule
   across `docs/contractors-ir35/_wave1/posts/`, and check care, charities and medical for the
   same phrase before their waves land.
2. **Carried from Track A, still open.** `house_positions.md` §14 cites "s.464A onward" and names
   no bed-and-breakfasting section. It is silent rather than wrong, but any older contractors or
   Property post naming **s.464C** as live law is stale: s.464C was omitted with effect from
   30 October 2024 by Finance Act 2025 s.81(3)(b). This post is correct; the sweep is elsewhere.
3. No doubts on any figure, rate, date or rule. Nothing for the manager to arbitrate in this file.
