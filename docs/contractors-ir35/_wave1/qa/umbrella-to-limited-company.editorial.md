# Track B editorial and claims QA: umbrella-to-limited-company (contractors-ir35, wave 1)

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("Row shape", "Writers", "QA"), the four sibling wave 1 JSON pages and the 10 live rows in `contractors-ir35/web/src/data/contractor-types.ts`. Track A's two edits were kept as written.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered in the first 150 words of `intro` | PASS. The whole intro is 114 words and the first sentence names the situation (paid through an umbrella, outside IR35 contract in hand, wants the switch handled). |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included | PASS at 1,184 after edits. Was 1,190 on this counter (Track A recorded 1,195 on its own tokenisation); the JSL clause added 37 words, so 43 were trimmed to hold the band. |
| 3 | AI tells and sameness | PASS after edit 4. No stock opener, no "You get A, B and C" closer, no listicle rhythm. Intro openers, challenge titles, howWeHelp titles and FAQ questions were compared against the four sibling wave 1 pages and the 10 live rows: no repeated opener, no repeated title, no shared FAQ phrasing. One flourish removed ("rather than copied from a forum", edit 3) as the only writerly tic on the page. |
| 4 | Thin or padded sections, FAQ answers restating the question, answers 40 to 120 words | PASS after edits. Final FAQ answer lengths 40, 46, 59, 42, 51, 60. Section bodies 51 to 105 words, none thin. Two near-verbatim duplications found and fixed: faqs[0] restated the agency/client chain sentence from challenges[0], and faqs[3] restated the limited cost trader arithmetic from challenges[2]. Both rewritten to answer rather than repeat. No answer restates its question. |
| 5 | Banned claims (case-insensitive) | PASS. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices, fees, "advice"/"advise", turnaround promises. Copy consistently says "a specialist reviews" / "your accountant prepares". |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spellings throughout (modelled, specialised usage). The intro closes "Figures here are 2026/27" and every rate cited is on the 2026/27 footing. |
| 7 | `metaTitle` ≤ 60, `metaDescription` ≤ 160 | PASS. 54 and 152 characters, unchanged. |
| 8 | Internal links: at most five, relative, each exists on disk, all `<a href="...">text</a>` | PASS. Exactly five, all relative, 5 opening anchors and 5 closing tags. Verified on disk: `contractors-ir35/web/content/blog/{switching-umbrella-to-limited-company, umbrella-company-deductions-explained, flat-rate-vat-limited-cost-trader, set-up-limited-company-contractor}.md` and `umbrella-vs-limited-calculator` in `src/lib/calculators/registry.ts`. |
| 9 | Pipeline leakage | PASS. No wave, map, house-positions, model or agent references in any rendered field. The `sources` array is not rendered by the template. |

Track A note A (JSL stat unexplained) closed by edit 1. Track A note B (ECCTA source missing) closed by edit 5.

No figure, rate, date or rule was changed. No suspected factual errors found beyond the one Track A already corrected.

## Edit log

| # | Where | Before | After | Why |
|---|---|---|---|---|
| 1 | challenges[1].body | (no JSL sentence) | added "From 6 April 2026 the agency that contracts with the end client, or the client where there is no agency, is jointly and severally liable for PAYE the umbrella fails to remit; the umbrella stays the employer." | Track A note A: the 6 April 2026 JSL stat had no body explanation. Wording follows the house positions §12 writing rule verbatim in substance (agency or client becomes jointly liable, umbrella stays the employer, no suggestion PAYE responsibility "moves"). +37 words. |
| 2 | challenges[3].body | "paid from profit after corporation tax, supported by a board minute and voucher, taxed at" | "paid from profit after corporation tax, taxed at" | Board minute and voucher are already stated in howWeHelp[2]. Duplication, and the trim funds edit 1. -6 words. |
| 3 | howWeHelp[2].body | "Salary is modelled against Employment Allowance eligibility rather than copied from a forum." | "Salary is modelled against Employment Allowance eligibility." | AI-tell flourish, adds no information. -6 words. |
| 4 | faqs[0].answer | "...usually the chain: the agency has to agree to contract with your company, and the end client has to accept a personal service company. Some agencies move you only at renewal, others novate mid-assignment. Ask before you resign, so the employment ending and the contract starting line up." | "...usually the chain, and some agencies will move you only at renewal while others novate mid-assignment. Ask before you resign, so the umbrella employment ending and the company contract starting line up." | The removed sentence repeated challenges[0] almost word for word. Answer now adds the renewal/novation point rather than restating the challenge. 56 to 40 words, still inside the 40 to 120 band. |
| 5 | faqs[3].answer | "Where a company spends under 2% of turnover, or under £1,000 a year, on goods, it is a limited cost trader and must use the 16.5% flat rate, which removes almost all of the benefit for labour only work..." | "Labour only contracting almost always fails the goods test, which forces the 16.5% rate and removes nearly all of the gain. Genuine, regular goods spend changes that, so both methods are modelled on your own figures before either is picked." | The 2% / £1,000 arithmetic is already spelled out in challenges[2]. No figure changed, the retained 16.5% is unaltered. 56 to 42 words. |
| 6 | sources[] | (no ECCTA entry) | added "Economic Crime and Corporate Transparency Act 2023, Companies House identity verification compulsory for new directors and PSCs from 18 November 2025 (house positions is silent; assertion in howWeHelp 2)" | Track A note B. |

Edits: 6. JSON re-parsed clean after all six.

Final word count 1,184 (band 800 to 1,200, counting section titles and FAQ questions).
metaTitle 54 characters. metaDescription 152 characters.

VERDICT: PASS
