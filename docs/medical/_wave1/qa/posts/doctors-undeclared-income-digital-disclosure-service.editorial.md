# Editorial and claims QA (Track B): doctors-undeclared-income-digital-disclosure-service

File: `docs/medical/_wave1/posts/doctors-undeclared-income-digital-disclosure-service.md`
Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b and the
S4a "QA" paragraph. Track A (factual) already PASSED with 0 edits.

Sameness set: the nine other files in `docs/medical/_wave1/posts/` and the five newest posts in
`Medical/web/content/blog/` (selling-private-medical-practice-cgt-badr,
accountants-for-opticians-optical-practice-vat, accountants-for-physiotherapists-and-therapists,
accountants-for-vets-veterinary-practice-tax, locum-doctor-ir35-what-you-need-to-know).

## Findings

| # | Check | Result |
|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS. Sentence 1 gives the decision ("come forward now through HMRC's Digital Disclosure Service rather than wait"); 0% / 15% / 20% / 35% and the 4, 6, 20 year figures all land inside the first 150 words |
| 2 | Body 800 to 1,200 words | PASS. 1,191 (text of the HTML body, tags stripped, headings and table cells counted) |
| 3 | Question-shaped `<h2>`s, answer first | PASS. All seven H2s end in a question mark; each opening sentence is the answer ("Four, six or twenty", "A percentage of the tax", "You notify first, then you disclose", "Interest runs daily", "Where the behaviour amounts to tax fraud", "Rarely with anything dramatic", "Work out, roughly, which years are affected") |
| 4 | AI tells | PASS. Scanned for delve, moreover, furthermore, "in today's", landscape, "navigate the", "it's worth noting", crucial, robust, leverage, "comprehensive guide", "in conclusion", "when it comes to". Zero hits |
| 5 | Sentences shared verbatim with a sibling | PASS. Sentence-level set intersection (tags stripped, sentences over 45 chars) against all 14 sibling files: zero shared sentences. Openers and closers are distinct from the wave 1 set |
| 6 | Thin or padded sections | PASS. Shortest section (H2.5, wrong-route) is 72 words and carries the CDF / CoP 9 / CDF1 fork, which is the whole point of the section; no section restates another. The table under H2.2 carries the nine penalty figures rather than repeating them in prose |
| 7 | FAQ answers 40 to 120 words, not restating the question | PASS. 96, 83, 83, 78, 100, 87. Each opens with the answer ("Yes, and", "It depends on your behaviour", "It runs in two steps", "Say so before you submit", "That is a failure to notify", "Not where the behaviour amounts to tax fraud"); none echoes its question |
| 8 | `summary` 40 to 60 words | PASS. 44 |
| 9 | Banned claims, case-insensitive | PASS. Zero hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, "advice", "advis*" (so no advise/adviser/advisory), guarantee, turnaround promises, own pricing, personal names. H2.5 uses the sanctioned "a specialist reviews the history and the classification". No HMRC outcome is promised: the post states statutory penalty ranges and the quality-of-disclosure reductions, never an acceptance, settlement or immunity |
| 10 | No em-dashes, British English | PASS. No em-dash or en-dash in the file. No American spellings (organiz/recogniz/realiz/analyz/color/favor/center); "penalised", "practice" as the noun throughout |
| 11 | Frontmatter per S4b | PASS. All 14 required keys present. metaTitle 51 (limit 60), metaDescription 137 (limit 155), h1 present and equal to title, summary 44 words, author "Medical Accountants UK Editorial Team" matching the live posts, canonical in Medical's flat `/blog/<slug>` form, date = dateModified = 2026-09-27 (new post), faqs 6 (band 4 to 6), keyTakeaways 5 (band 3 to 5) each one sentence, category "Private Practice" verbatim on the Medical list, generator `claude-opus` |
| 12 | Raw HTML body, no markdown, links flat and on disk | PASS. Only `<p>`, `<h2>`, `<table>`, `<tr>`, `<th>`, `<td>`, `<a>`. No markdown headings, bullets, bold or link syntax below the frontmatter. Four internal links (limit 5), all flat `/blog/<slug>`, all four verified present in `Medical/web/content/blog/`: accountant-self-assessment, private-practice-tax-nhs-and-private-income, locum-doctor-self-assessment-filing-guide, locum-doctor-expenses-what-you-can-claim. No calculator links, no shortcodes, no CTA markup |
| 13 | Pipeline leakage | PASS. No wave, brief, TODO, placeholder, house_positions, sources array or model-voice text in the file. The `generator` key is required by S4b, not leakage |

## Edit log

Total edits: **0**. No finding required a change, so the file was not modified. No figure, rate,
date or rule was touched.

## Final measurements

- Body word count: **1,191** (band 800 to 1,200)
- metaTitle: **51** characters (limit 60)
- metaDescription: **137** characters (limit 155)
- summary: **44** words (band 40 to 60)
- FAQ answers: 96, 83, 83, 78, 100, 87 words (band 40 to 120)
- Internal links: 4 (limit 5), all resolving on disk
- Frontmatter re-parsed as YAML after review: valid, 14 keys, unchanged

VERDICT: PASS
