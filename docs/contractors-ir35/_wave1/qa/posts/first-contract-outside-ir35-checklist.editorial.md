# Track B editorial and claims QA: first-contract-outside-ir35-checklist

Post: `docs/contractors-ir35/_wave1/posts/first-contract-outside-ir35-checklist.md`
Type: PARTIAL, extension of the live post `contractors-ir35/web/content/blog/first-contract-outside-ir35-checklist.md`
Spec: LEADS_250_PROGRAMME_2026-09-27 §13 S4b and the S4a "QA" paragraph
Track A: PASSED with 5 edits (`.factual.md`), all 5 kept intact
Reviewed: 2026-09-27

## The ten checks

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Answer-first opening | PASS | First paragraph gives the three hard deadlines and the reason the order starts with the slow items, before any scene setting. Every H2 is answered in its first sentence ("Four dates matter in the first month", "Start the two things you cannot rush", "In the first week, before any invoice", "Salary once the PAYE reference has arrived", "Three things"). |
| 2 | Body 800 to 1,200 words | PASS | 1,140 words, HTML stripped. |
| 3 | Question-shaped H2s | PASS | 7 of 7: hard deadlines, day 0, VAT decision, before the first invoice, taking money out, the day 0 to 30 order, what goes wrong. No noun-phrase headings. |
| 4 | AI tells | PASS | Zero hits across the usual set (in today's, delve, landscape, it's worth noting, crucially, moreover, furthermore, additionally, robust, seamless, navigate, unlock, leverage, ensure that, when it comes to, not only, comprehensive, holistic, tapestry, realm). No hedge-stacking, no "it is important to note", no closing summary paragraph that repeats the body. |
| 5 | Verbatim overlap with siblings | PASS | Sentence-level overlap with the 5 other `_wave1` posts and the 5 newest live posts: none. 9-gram sweep: one hit, "guide to setting up a limited company for contracting", which is anchor text for an internal link and shared with `switching-umbrella-to-limited-company.md`. Anchor text, not prose reuse, left alone. |
| 6 | FAQ answers 40 to 120, summary 40 to 60 | PASS | 6 FAQs at 87, 80, 87, 82, 80, 77 words. Summary 52 words. Key takeaways 5, all one sentence (30, 29, 22, 25, 34 words). |
| 7 | Banned claims | PASS | No "chartered", ICAEW, ACCA, CIOT, "our accountants", "our team", "award", "regulated", no named people or firms, no own prices, no "advice"/"advise", no turnaround promise. The one first-person-adjacent sentence uses the house form, "A specialist reviews the sequence with you before the first invoice". No named banks or software brands (Track A confirmed the live post's brand names were dropped). |
| 8 | No em-dashes, British English | PASS | 0 em-dashes, 0 en-dashes. No -ize/-yze spellings, no American vocabulary. "Self assessment", "personal service company", "corporation tax" all lower case and consistent with the site. |
| 9 | Frontmatter per S4b | PASS after edit 1 | 20 keys, YAML parses. `slug`, `title`, `date`, `category`, `metaDescription` present. metaTitle 51 chars (limit 60), metaDescription 152 (limit 155). `h1` matches `title`. `summary` 52 words. `author` = "Contractor Tax Accountants Editorial Team", the site string. `canonical` nested and matching `slugifyCategory("Contractor Accounting Basics")`. `category` on the contractors list, verbatim. `faqs` 6 (band 4 to 6), `keyTakeaways` 5 (band 3 to 5). `generator: claude-opus`. `dateModified` 2026-09-27. PARTIAL rule holds: `date` 2026-06-12, `slug`, `category` and `canonical` unchanged from the live post. `updatedDate` was present but still 2026-06-12 while the body had been rewritten; the loader (`contractors-ir35/web/src/lib/blog.ts:23`) reads `updatedDate`, so it was bumped. See edit 1. |
| 10 | Raw HTML, links, pipeline leakage | PASS | Body is raw HTML throughout (`<p>`, `<h2>`, `<ol>`, `<li>`, `<a>`); no markdown syntax, no shortcodes, no CTA markup. 5 internal links, the cap, all nested `/blog/<category-slug>/<slug>` and all verified on disk with the category slug matching the target's own frontmatter (re-checked independently of Track A). No external links. No pipeline leakage: no TODO, placeholder, bracketed instruction, word count, brief reference, model name in the body, or QA artefact. |

## Edit log

| # | Location | Before | After | Reason |
|---|---|---|---|---|
| 1 | Frontmatter, line 5 | `updatedDate: '2026-06-12'` | `updatedDate: "2026-09-27"` | The post is a PARTIAL extension with a rewritten body and `dateModified: "2026-09-27"`. The loader reads `updatedDate`, so leaving it at the original publication date would have shown the page as unrevised. No figure, rate, date-of-rule or rule changed; this is the revision stamp only. |

1 edit. All 5 Track A edits left in place and re-read in context; none introduced an editorial problem.

YAML re-validated after the edit: parses, 20 keys, metaTitle 51, metaDescription 152, summary 52 words, faqs 6, keyTakeaways 5, `updatedDate` and `dateModified` both 2026-09-27, `date` 2026-06-12.

Final body word count: 1,140.
metaTitle: 51 characters. metaDescription: 152 characters.

VERDICT: PASS
