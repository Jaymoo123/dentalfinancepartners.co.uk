# Track B editorial QA: inside-ir35-keep-close-or-umbrella

Post: `docs/contractors-ir35/_wave1/posts/inside-ir35-keep-close-or-umbrella.md`
Brief: `docs/_engines/WAVE1_POST_QA_BRIEF.md` Track B
Track A: PASS, 0 edits, 1,199 words (`qa/posts/inside-ir35-keep-close-or-umbrella.factual.md`)
Reviewed: 2026-09-27

Corpus read: all 7 siblings in `_wave1/posts/`, plus the two newest live posts
`contractors-ir35/web/content/blog/contractor-day-rate-to-take-home.md` and
`switching-umbrella-to-limited-company.md`.

## Checks

| Check | Result |
|---|---|
| Verbatim / near-verbatim sentences shared with a sibling (body, FAQs, takeaways) | PASS. Jaccard sweep of every body and FAQ sentence against all 9 other posts: top match 0.46, and that match is a statutory sentence (BADR 18%, 6 Apr 2026, £1m limit) with different construction. No shared sentence. |
| AI tells | PASS. None of the stock set present; no list-of-three cadence, no "it is important to note", no summary-of-the-summary close. |
| Em-dashes / en-dashes | PASS, zero. |
| Markdown in body | PASS, raw HTML only. |
| Thin or padded sections | PASS. Seven H2s, shortest 92 words, each carries a distinct decision. |
| H2s answer-first | PASS. All seven are questions and each opening clause answers before qualifying ("It changes who calculates the tax", "Yes, if any part of your work is still outside IR35", "On admin, always"). |
| Intro answers with numbers | PASS. 15% employer NIC, 5% allowance, £25,000, 18% BADR, 6 Apr 2026 in the first paragraph. |
| Pipeline leakage | PASS. No "verify at build", no "(HP..)", no TODO. |
| Banned claims | PASS. No pricing, no named people, no "chartered"/"ICAEW"/"our accountants"/"we advise"/"advice". "let a specialist model the routes" matches sibling house voice. |
| Body word count 800 to 1,200 | PASS, 1,199 after edits (was 1,199). |
| metaTitle <= 60 / metaDescription <= 155 | PASS, 40 / 152. |
| Internal links <= 5 | PASS, 5 total (4 blog, 1 calculator). |
| YAML re-validated after edits | PASS (`yaml.safe_load`). |

## Boundary against `closing-contractor-limited-company`

The sibling owns the TAAR mechanics (Conditions A to D, what Condition C
catches, when the two year clock starts, the evidence file). This post owns the
keep / dormant / umbrella / close decision.

The boundary was leaking in one place: H2 "When does closing the company win?"
enumerated all four TAAR conditions, which is the sibling's owned material
restated. Rewritten to state only the consequence a decider needs and hand the
mechanics to the sibling. The two posts now link to each other once, in the
opposite directions, and the sibling's own cross-link ("look at the wider route
comparison ... before the decision to close is taken at all") reads correctly
against the trimmed text.

FAQ 4 ("Can I take my reserves out at 18% ...") still touches Conditions C and
D. Kept: the question is a BADR decision question the sibling does not ask, the
wording is independent, and an unqualified "yes, 18%" would be a factual defect.

## Edits (2)

1. Frontmatter: added `updatedDate: '2026-09-27'`. **Track A miss.** Its report
   marked frontmatter PASS, but `contractors-ir35/web/src/lib/blog.ts:23` reads
   `fm.updatedDate` and never reads `dateModified`, and every sibling carries
   `updatedDate`. Without it the post would have shipped with no updated date on
   the loader. Brief requires both keys set.
2. H2 "When does closing the company win?": replaced the four-condition
   enumeration with the consequence plus a handoff to the sibling, and folded
   the strike-off / MVL sequencing pointer into the same sentence. No figure,
   rate, date or rule changed.

Word count held at 1,199 by trimming nine words of connective from the rewritten
sentence, not by cutting facts.

## Manager notes

1. **Sweep `updatedDate` across the whole wave, do not just fix this post.**
   This was the only one of the eight `_wave1/posts/` files missing it (checked,
   the other seven carry it). Track A still passed frontmatter on it, so the
   per-post frontmatter check is not catching a key the loader actually reads.
   Worth one rule-based sweep across care, charities and medical before the wave
   lands rather than trusting per-post Track A verdicts.
2. No factual doubts raised. Nothing changed that Track A graded.

VERDICT: PASS (after 2 edits)
