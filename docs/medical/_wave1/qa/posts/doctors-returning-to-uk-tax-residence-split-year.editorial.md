# Editorial QA (Track B): doctors-returning-to-uk-tax-residence-split-year

Post: `docs/medical/_wave1/posts/doctors-returning-to-uk-tax-residence-split-year.md`
Reviewed: 2026-09-27, after Track A (verdict PASS, 2 edits).
Compared against: the other 9 posts in `docs/medical/_wave1/posts/` and the two newest posts in
`Medical/web/content/blog/` (`selling-private-medical-practice-cgt-badr.md`,
`accountants-for-opticians-optical-practice-vat.md`).

## VERDICT: PASS

2 edits applied, both de-duplication against `salaried-gp-locum-work-tax.md`. No figure, rate, date
or rule changed. Body 1,190 words, inside the 800 to 1,200 band.

## Checks

| Check | Result |
|---|---|
| Verbatim or near-verbatim sentences shared with a sibling (body, FAQs, takeaways) | 2 found, both fixed, see edit log |
| AI tells | None. No "in today's landscape", no "it's important to note", no tricolon padding |
| Em-dashes | 0 |
| Markdown in the body | None, body is raw HTML throughout |
| Thin or padded sections | None. Six H2 sections, each carrying its own rule or list |
| H2s answer-first | PASS. Every H2 is a question and every section opens with the answer ("On 6 April of the tax year in which you meet the test", "Case 6 or case 5", "Only from the split date onwards", "You rejoin through your employer, and nothing is backdated") |
| Intro answers with numbers | PASS. Residence restarts for the whole tax year, case 6 or case 5, paper by 31 October, register by 5 October |
| Pipeline leakage | None. No "verify at build", no "(HP..)", no TODO |
| Banned claims | None. No pricing, no named people, no "chartered", no "ICAEW", no "our accountants", no "we advise", no "advice". The close uses the permitted "A specialist reviews the residence position" framing |
| Word count | 1,190 (1,196 before) |
| `metaTitle` | 48 chars (<= 60) |
| `metaDescription` | 149 chars (<= 155) |
| Internal links | 4 (<= 5), all flat `/blog/<slug>` |
| YAML re-validated after editing | PASS, parses, 14 keys |

## Edit log

1. **"What if private or locum work starts when you get back?"** — "Locum or private profit sits on
   top of your NHS salary rather than starting a fresh allowance, so it is taxed at your marginal
   rate" replaced with "Locum or private profit is stacked on your NHS pay and taxed at your
   marginal rate". Reason: `salaried-gp-locum-work-tax.md` body carries "The profit stacks on top of
   your salary rather than starting a fresh allowance". The shared clause was near-verbatim. The
   Class 4 figure and threshold from the Track A fix are untouched.
2. **Same section, closing line** — "Our locum filing guide walks through the return, and" replaced
   with "Our locum filing guide sets out how the pages are completed, and". Reason:
   `salaried-gp-locum-work-tax.md` carries "The locum filing guide walks through the return boxes".

Nothing else rewritten. No section cut or expanded.

## Notes for the manager

- Overlap with `register-self-employed-locum-doctor.md` and `salaried-gp-locum-work-tax.md` on the
  registration deadline, the £1,000 payments-on-account trigger and the Class 2 position is shared
  fact expressed in different sentences in each post, not duplicated prose. Left as written. If the
  wave wants one canonical home for the locum-registration mechanics, this post is the one that
  should cite rather than restate, because it is the least locum-specific of the three.
- The intro and FAQ 3 both state that earnings for duties performed abroad before the split date
  stay outside the UK charge. This is the intro-plus-FAQ pattern the brief expects, and Track A
  already removed the third instance from the body for the word band, so it was left alone.
- No factual doubts raised. Track A's note stands: the split-year priority rule is FA 2013 Sch 45
  para 55, not para 54. The post states the priority in plain words and cites no paragraph number,
  so nothing needed correcting in the copy.
