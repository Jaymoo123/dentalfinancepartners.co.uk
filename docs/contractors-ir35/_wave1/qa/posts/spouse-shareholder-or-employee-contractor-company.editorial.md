# Track B editorial QA: spouse-shareholder-or-employee-contractor-company

Post: `docs/contractors-ir35/_wave1/posts/spouse-shareholder-or-employee-contractor-company.md`
Reviewed: 2026-09-27 (Opus). Brief: `docs/_engines/WAVE1_POST_QA_BRIEF.md` Track B.
Read against: the seven siblings in `docs/contractors-ir35/_wave1/posts/`, plus `contractor-day-rate-to-take-home.md` and `switching-umbrella-to-limited-company.md` in `contractors-ir35/web/content/blog/`.

VERDICT: PASS. 12 edits. Final body 1,199 words (was 1,266).

## Checks

| Check | Result |
|---|---|
| Body word band 800 to 1,200 | FIXED. 1,266 to 1,199 |
| Duplication with siblings | FIXED x2, see edits 9 and 12 |
| Duplication inside the post (body vs FAQ vs takeaway) | FIXED x2, see edits 8 and 9 |
| AI tells | PASS, none found |
| Em-dashes | PASS, 0 |
| Markdown in the body | PASS, raw HTML throughout |
| Answer-first H2s | PASS, all seven answer in the first sentence |
| Intro answers with numbers | PASS, £12,570, £6,000, £10,500, £4,670 in the opening |
| Pipeline leakage | PASS, none |
| Banned claims (pricing, named people, chartered, ICAEW, our accountants, we advise, advice) | PASS, none. "A specialist" survives as the only practitioner reference |
| metaTitle 54 (<= 60), metaDescription 151 (<= 155) | PASS, untouched |
| Internal links | PASS, 4 (<= 5), untouched |
| YAML re-validated | PASS, 15 keys, parses clean |
| Figures, rates, dates, rules | Unchanged. Two clarifications added, no number moved, see edits 1 and 5 |

## Edits

1. Intro. The £13,070 arrived unexplained (Track A note 1). Named its parts: "the £12,570 personal allowance and the £500 dividend allowance". No figure changed.
2. H2.1. Cut "Follow the same money down two paths." Signposting, the next sentence does the work.
3. H2.1. Closing sentence compressed, "an unused personal allowance being used, plus the deduction a wage attracts and a dividend does not" to "an unused personal allowance plus a deduction a dividend never attracts".
4. H2.2. Cut "That restriction is why so many personal service companies sit at a low salary." The next paragraph explains the same thing with the numbers attached.
5. H2.3. Recast the indefensible-rate example (Track A note 3) so it no longer implies £5,000 is the defensible figure: it now ends "invites the question of what the company bought" rather than "what the other £15,000 was for".
6. H2.4. Added the citation to Jones v Garnett, [2007] UKHL 35 (Track A note 2), and cut the trailing "and it remains the basis on which contractor households hold shares jointly" as padding.
7. H2.4. "which is the usual way out of s.626" read as the taxpayer escaping the section when the sense is the exception failing (Track A note 5). Now "which is the usual way the s.626 exception is lost".
8. H2.4. "reported to Companies House" was loose (Track A note 4). Now "picked up on the next confirmation statement". No rule changed, the route is named correctly.
9. H2.5. Trailing clause was near-verbatim with FAQ 5 ("because their gain is measured from your original cost"). Cut to "which matters on a later sale"; the FAQ keeps the full explanation.
10. Post-table paragraph. 62 words restating FAQ 6 and key takeaway 5 almost sentence for sentence. Replaced with a 30-word answer-first line so the H2 still answers before the table's detail.
11. H2.7. "Test both routes against the lever that often beats them" to "Test both against".
12. H2.7 close. "A specialist reviews the working pattern, the household income and the share structure together, because the three decisions interact" was the same sentence shape as the close of `alphabet-shares-contractor-company.md` ("A specialist reviews the articles, the transfer and the dividend history together, because..."). Rewritten to lead with the subject matter instead.

## Notes for the manager

1. The sibling `alphabet-shares-contractor-company.md` covers ITTOIA 2005 s.624, s.626 and Jones v Garnett at greater length than this post does. The two do not share sentences after edit 12, but they compete on the same query. This post's H2.4 is deliberately the short version and links out to the alphabet-shares post, so the split is defensible; worth a second look at whether the alphabet-shares post should link back.
2. "A specialist reviews..." opens or closes four of the eight wave posts. Two are now different, two are not (`contractor-pension-carry-forward.md`, `overdrawn-directors-loan-account-s455-contractor.md`). Not a defect in this post, but the wave reads formulaic if they all ship as written.
3. The internal link to `alphabet-shares-contractor-company` still resolves only inside `_wave1/posts/`, as Track A flagged. It stays dead until the integrator moves that post into `content/blog/`.
4. No factual doubts raised. Nothing in this pass touched a figure, rate, date or rule.
